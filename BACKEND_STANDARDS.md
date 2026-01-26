# Backend Standards - RIZE API

> **Documento de estándares técnicos**: Toda implementación backend DEBE seguir estos patrones. Este documento es la única fuente de verdad para arquitectura de servidor.

## 📋 Tabla de Contenidos

- [Estructura de Proyecto](#estructura-de-proyecto)
- [Patrones de API](#patrones-de-api)
- [Manejo de Errores](#manejo-de-errores)
- [Validación de Datos](#validación-de-datos)
- [Autenticación y Autorización](#autenticación-y-autorización)
- [Base de Datos](#base-de-datos)
- [Logging](#logging)
- [Testing](#testing)
- [Naming Conventions](#naming-conventions)

---

## 🏗️ Estructura de Proyecto

### Feature-Based Organization

```
backend/src/
├── features/
│   ├── auth/
│   │   ├── auth.controller.ts      # Express handlers
│   │   ├── auth.service.ts         # Business logic
│   │   ├── auth.routes.ts          # Route definitions
│   │   ├── auth.validation.ts      # Zod/Joi schemas
│   │   └── auth.test.ts            # Unit tests
│   ├── workouts/
│   ├── exercises/
│   ├── social/
│   └── achievements/
├── models/
│   ├── User.ts
│   ├── Workout.ts
│   └── ...
├── middleware/
│   ├── auth.middleware.ts
│   ├── errorHandler.middleware.ts
│   ├── validator.middleware.ts
│   └── rateLimiter.middleware.ts
├── utils/
│   ├── jwt.util.ts
│   ├── bcrypt.util.ts
│   └── response.util.ts
├── config/
│   ├── database.ts
│   ├── cloudinary.ts
│   └── env.ts
├── types/
│   ├── express.d.ts
│   └── api.types.ts
└── server.ts
```

### Principio de Separación

**Controller → Service → Repository (Modelo)**

```typescript
// ✅ CORRECTO: Separación clara de responsabilidades
// Controller: maneja HTTP, valida input, llama service
export const createWorkout = async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const workoutData = req.body;
  
  const workout = await workoutService.create(userId, workoutData);
  
  return res.status(201).json({
    success: true,
    data: workout
  });
};

// Service: lógica de negocio, orquestación
export const create = async (userId: string, data: CreateWorkoutDTO) => {
  // Calcular XP basado en ejercicios
  const xp = calculateWorkoutXP(data.exercises);
  
  // Crear workout
  const workout = await Workout.create({
    userId,
    exercises: data.exercises,
    xp,
    visibility: data.visibility || 'private'
  });
  
  // Actualizar user stats
  await User.findByIdAndUpdate(userId, {
    $inc: { 'stats.totalWorkouts': 1, 'stats.totalXP': xp }
  });
  
  // Emit event para achievements
  eventEmitter.emit('workout:created', { userId, workout });
  
  return workout;
};

// ❌ INCORRECTO: Todo en el controller
export const createWorkout = async (req: Request, res: Response) => {
  const workout = await Workout.create(req.body); // Sin validación ni lógica
  res.json(workout);
};
```

---

## 🔌 Patrones de API

### RESTful Endpoints

```typescript
// Recursos en plural, verbos HTTP semánticos
POST   /api/v1/workouts          # Crear
GET    /api/v1/workouts          # Listar (con pagination)
GET    /api/v1/workouts/:id      # Obtener uno
PUT    /api/v1/workouts/:id      # Actualizar completo
PATCH  /api/v1/workouts/:id      # Actualizar parcial
DELETE /api/v1/workouts/:id      # Eliminar

// Sub-recursos
GET    /api/v1/workouts/:id/comments
POST   /api/v1/workouts/:id/like
DELETE /api/v1/workouts/:id/like

// Acciones especiales (excepciones al patrón REST)
POST   /api/v1/auth/login
POST   /api/v1/auth/refresh
POST   /api/v1/users/:id/follow
```

### Response Format Consistente

```typescript
// ✅ Success Response
{
  "success": true,
  "data": {
    "id": "64a1b2c3d4e5f6g7h8i9j0k1",
    "name": "Morning Workout",
    "xp": 120
  },
  "message": "Workout created successfully" // Opcional
}

// ✅ Success con Pagination
{
  "success": true,
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "totalPages": 8,
    "hasMore": true
  }
}

// ✅ Error Response
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "field": "email",
    "details": [
      { "field": "email", "message": "Email already exists" }
    ]
  }
}
```

### Status Codes

```typescript
// Success
200 OK              // GET, PUT, PATCH exitoso
201 Created         // POST exitoso
204 No Content      // DELETE exitoso

// Client Errors
400 Bad Request     // Validación falla
401 Unauthorized    // No autenticado
403 Forbidden       // No tiene permisos
404 Not Found       // Recurso no existe
409 Conflict        // Conflicto (ej: email duplicado)
422 Unprocessable   // Input válido pero lógica falla
429 Too Many Req    // Rate limit excedido

// Server Errors
500 Internal Error  // Error no manejado
503 Service Unavail // DB down, servicio externo falla
```

### Pagination Pattern

```typescript
// Query params
GET /api/v1/workouts?page=2&limit=20&sort=-createdAt&visibility=public

// Service implementation
export const list = async (
  userId: string,
  options: PaginationOptions
) => {
  const {
    page = 1,
    limit = 20,
    sort = '-createdAt',
    ...filters
  } = options;

  const skip = (page - 1) * limit;

  const [workouts, total] = await Promise.all([
    Workout.find({ userId, ...filters })
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .lean(),
    Workout.countDocuments({ userId, ...filters })
  ]);

  return {
    data: workouts,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      hasMore: page * limit < total
    }
  };
};
```

---

## ⚠️ Manejo de Errores

### Custom Error Classes

```typescript
// utils/errors.ts
export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number,
    public code: string,
    public field?: string
  ) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  constructor(message: string, field?: string) {
    super(message, 400, 'VALIDATION_ERROR', field);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = 'Unauthorized') {
    super(message, 401, 'UNAUTHORIZED');
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string) {
    super(`${resource} not found`, 404, 'NOT_FOUND');
  }
}

export class ConflictError extends AppError {
  constructor(message: string, field?: string) {
    super(message, 409, 'CONFLICT', field);
  }
}
```

### Error Handler Middleware

```typescript
// middleware/errorHandler.middleware.ts
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Log error
  logger.error({
    message: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    userId: req.user?.id
  });

  // AppError (errores controlados)
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      error: {
        code: err.code,
        message: err.message,
        field: err.field
      }
    });
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Validation failed',
        details: Object.values(err.errors).map((e: any) => ({
          field: e.path,
          message: e.message
        }))
      }
    });
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0];
    return res.status(409).json({
      success: false,
      error: {
        code: 'DUPLICATE_KEY',
        message: `${field} already exists`,
        field
      }
    });
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      success: false,
      error: {
        code: 'INVALID_TOKEN',
        message: 'Invalid token'
      }
    });
  }

  // Default 500
  res.status(500).json({
    success: false,
    error: {
      code: 'INTERNAL_ERROR',
      message: process.env.NODE_ENV === 'production' 
        ? 'Internal server error' 
        : err.message
    }
  });
};
```

### Try-Catch Wrapper

```typescript
// utils/asyncHandler.ts
export const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

// Uso en controllers
export const createWorkout = asyncHandler(async (req, res) => {
  const workout = await workoutService.create(req.user!.id, req.body);
  res.status(201).json({ success: true, data: workout });
});
```

---

## ✅ Validación de Datos

### Zod Schemas

```typescript
// features/workouts/workout.validation.ts
import { z } from 'zod';

export const createWorkoutSchema = z.object({
  body: z.object({
    exercises: z.array(
      z.object({
        exerciseId: z.string().min(1, 'Exercise ID required'),
        sets: z.number().int().min(1).max(99),
        reps: z.number().int().min(1).max(999)
      })
    ).min(1, 'At least one exercise required'),
    
    duration: z.number().int().min(1).optional(),
    
    visibility: z.enum(['private', 'followers', 'public']).default('private'),
    
    photo: z.object({
      url: z.string().url(),
      publicId: z.string()
    }).optional()
  })
});

export const getWorkoutsSchema = z.object({
  query: z.object({
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(100).default(20),
    sort: z.enum(['createdAt', '-createdAt', 'xp', '-xp']).default('-createdAt'),
    visibility: z.enum(['private', 'followers', 'public']).optional()
  })
});
```

### Validation Middleware

```typescript
// middleware/validator.middleware.ts
import { z } from 'zod';

export const validate = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const validated = schema.parse({
        body: req.body,
        query: req.query,
        params: req.params
      });
      
      req.body = validated.body || req.body;
      req.query = validated.query || req.query;
      req.params = validated.params || req.params;
      
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Invalid input',
            details: error.errors.map(e => ({
              field: e.path.join('.'),
              message: e.message
            }))
          }
        });
      }
      next(error);
    }
  };
};

// Uso
router.post(
  '/workouts',
  authMiddleware,
  validate(createWorkoutSchema),
  workoutController.create
);
```

---

## 🔐 Autenticación y Autorización

### JWT Utilities

```typescript
// utils/jwt.util.ts
import jwt from 'jsonwebtoken';

const ACCESS_SECRET = process.env.JWT_SECRET!;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!;

export const generateAccessToken = (userId: string) => {
  return jwt.sign(
    { userId, type: 'access' },
    ACCESS_SECRET,
    { expiresIn: '15m' }
  );
};

export const generateRefreshToken = (userId: string) => {
  return jwt.sign(
    { userId, type: 'refresh' },
    REFRESH_SECRET,
    { expiresIn: '7d' }
  );
};

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, ACCESS_SECRET) as { userId: string };
};

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, REFRESH_SECRET) as { userId: string };
};
```

### Auth Middleware

```typescript
// middleware/auth.middleware.ts
export const authMiddleware = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnauthorizedError('No token provided');
  }
  
  const token = authHeader.split(' ')[1];
  
  try {
    const decoded = verifyAccessToken(token);
    
    const user = await User.findById(decoded.userId).select('-password');
    if (!user) {
      throw new UnauthorizedError('User not found');
    }
    
    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      throw new UnauthorizedError('Token expired');
    }
    throw new UnauthorizedError('Invalid token');
  }
});
```

### Authorization (Ownership)

```typescript
// Middleware para verificar que el recurso pertenece al usuario
export const isWorkoutOwner = asyncHandler(async (req, res, next) => {
  const workoutId = req.params.id;
  const userId = req.user!.id;
  
  const workout = await Workout.findById(workoutId);
  if (!workout) {
    throw new NotFoundError('Workout');
  }
  
  if (workout.userId.toString() !== userId) {
    throw new ForbiddenError('Not authorized to modify this workout');
  }
  
  req.workout = workout; // Adjuntar al request para evitar re-query
  next();
});

// Uso
router.delete(
  '/workouts/:id',
  authMiddleware,
  isWorkoutOwner,
  workoutController.delete
);
```

---

## 💾 Base de Datos

### Mongoose Schema Best Practices

```typescript
// models/Workout.ts
import { Schema, model, Document } from 'mongoose';

export interface IWorkout extends Document {
  userId: Schema.Types.ObjectId;
  exercises: {
    exerciseId: Schema.Types.ObjectId;
    sets: number;
    reps: number;
  }[];
  duration?: number;
  xp: number;
  visibility: 'private' | 'followers' | 'public';
  photo?: {
    url: string;
    publicId: string;
  };
  isDeleted: boolean;
  createdAt: Date;
  lastEditedAt: Date;
}

const workoutSchema = new Schema<IWorkout>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  exercises: [{
    exerciseId: {
      type: Schema.Types.ObjectId,
      ref: 'Exercise',
      required: true
    },
    sets: { type: Number, required: true, min: 1, max: 99 },
    reps: { type: Number, required: true, min: 1, max: 999 }
  }],
  duration: { type: Number, min: 1 },
  xp: { type: Number, required: true, default: 0 },
  visibility: {
    type: String,
    enum: ['private', 'followers', 'public'],
    default: 'private'
  },
  photo: {
    url: String,
    publicId: String
  },
  isDeleted: { type: Boolean, default: false },
  lastEditedAt: { type: Date, default: Date.now }
}, {
  timestamps: true, // Crea createdAt y updatedAt automáticamente
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Índices compuestos para queries frecuentes
workoutSchema.index({ userId: 1, createdAt: -1 });
workoutSchema.index({ visibility: 1, createdAt: -1 });
workoutSchema.index({ userId: 1, isDeleted: 1, createdAt: -1 });

// Virtual populate
workoutSchema.virtual('user', {
  ref: 'User',
  localField: 'userId',
  foreignField: '_id',
  justOne: true
});

// Middleware pre-save
workoutSchema.pre('save', function(next) {
  if (this.isModified()) {
    this.lastEditedAt = new Date();
  }
  next();
});

export const Workout = model<IWorkout>('Workout', workoutSchema);
```

### Query Optimization

```typescript
// ✅ CORRECTO: Usar lean() para queries de solo lectura
const workouts = await Workout.find({ userId })
  .lean() // Retorna plain objects, 50% más rápido
  .select('exercises xp createdAt') // Solo campos necesarios
  .limit(20);

// ✅ CORRECTO: Populate selectivo
const workout = await Workout.findById(id)
  .populate('userId', 'username avatar') // Solo username y avatar
  .lean();

// ❌ INCORRECTO: Populate sin limitar campos
const workout = await Workout.findById(id)
  .populate('userId'); // Trae todo el user (password incluido!)
```

---

## 📝 Logging

### Winston Configuration

```typescript
// config/logger.ts
import winston from 'winston';

const level = process.env.NODE_ENV === 'production' ? 'info' : 'debug';

export const logger = winston.createLogger({
  level,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: 'rize-api' },
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    })
  ]
});

// En producción, logs van a stdout (Render los captura)
if (process.env.NODE_ENV === 'production') {
  logger.add(new winston.transports.File({ 
    filename: 'error.log', 
    level: 'error' 
  }));
}
```

### Logging Patterns

```typescript
// ✅ CORRECTO: Logs estructurados
logger.info('Workout created', {
  userId: user.id,
  workoutId: workout.id,
  xp: workout.xp
});

logger.error('Failed to upload photo', {
  userId: user.id,
  error: error.message,
  stack: error.stack
});

// ❌ INCORRECTO: Logs sin estructura
logger.info('Workout created by user ' + user.id);
logger.error(error); // Sin contexto
```

---

## 🧪 Testing

Ver [TESTING_STANDARDS.md](./TESTING_STANDARDS.md) para detalles completos.

**Resumen**:
- **Unit tests**: Servicios y utils
- **Integration tests**: Controllers + DB
- **Coverage mínimo**: >90%
- **Framework**: Jest + Supertest

---

## 📛 Naming Conventions

### Files

```
// ✅ CORRECTO
auth.controller.ts
workout.service.ts
user.model.ts
errorHandler.middleware.ts
jwt.util.ts
api.types.ts

// ❌ INCORRECTO
AuthController.ts
WorkoutService.ts
userModel.ts
error-handler.ts
```

### Variables y Funciones

```typescript
// ✅ camelCase para variables, funciones
const userId = '123';
const isActive = true;
const calculateXP = () => {};

// ✅ PascalCase para clases, tipos
class UserService {}
interface IUser {}
type WorkoutDTO = {};

// ✅ UPPER_SNAKE_CASE para constantes
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const JWT_SECRET = process.env.JWT_SECRET;
```

### Routes y Endpoints

```typescript
// ✅ Plural, lowercase, kebab-case para palabras compuestas
/api/v1/workouts
/api/v1/user-profiles
/api/v1/achievements

// ❌ INCORRECTO
/api/v1/Workout
/api/v1/userProfile
/api/v1/get_achievements
```

### Database Fields

```typescript
// ✅ camelCase
{
  userId: ObjectId,
  createdAt: Date,
  isDeleted: boolean
}

// ❌ INCORRECTO
{
  user_id: ObjectId,
  created_at: Date,
  is_deleted: boolean
}
```

---

## 🔒 Security Checklist

- ✅ **Passwords**: Siempre bcrypt con cost 10
- ✅ **JWT secrets**: Mínimo 32 caracteres, nunca hardcoded
- ✅ **Input sanitization**: `express-mongo-sanitize` para prevenir NoSQL injection
- ✅ **Rate limiting**: 100 req/min global, 5 req/min auth endpoints
- ✅ **CORS**: Configurado sin wildcard `*` en producción
- ✅ **Helmet**: Headers de seguridad HTTP
- ✅ **HTTPS only**: En producción, no aceptar HTTP
- ✅ **Environment variables**: Validar al startup con `envalid`
- ✅ **Error messages**: No revelar stack traces en producción
- ✅ **Dependencies**: Audit mensual con `npm audit`

---

**Última actualización**: Enero 23, 2026  
**Versión**: 1.0.0
