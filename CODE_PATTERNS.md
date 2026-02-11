# Code Patterns - Quick Reference

> **Snippets reutilizables**: Patrones de código probados y listos para copiar/adaptar. La IA usa estos templates automáticamente.

---

## 📋 Table of Contents

- [Backend Patterns](#backend-patterns)
  - [CRUD Completo](#crud-completo)
  - [Autenticación Requerida](#autenticación-requerida)
  - [Paginación](#paginación)
  - [Validación con Zod](#validación-con-zod)
- [Frontend Patterns](#frontend-patterns)
  - [Lista con Query](#lista-con-query)
  - [Formulario CRUD](#formulario-crud)
  - [Loading States](#loading-states)
- [Database Patterns](#database-patterns)
- [Testing Patterns](#testing-patterns)

---

## Backend Patterns

### CRUD Completo

#### Controller (`[feature].controller.ts`)

```typescript
import { Request, Response } from 'express';
import { asyncHandler } from '@/utils/asyncHandler';
import { [feature]Service } from './[feature].service';
import { ValidationError } from '@/utils/errors';
import { create[Feature]Schema, update[Feature]Schema } from './[feature].validation';

export class [Feature]Controller {
  create = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!._id.toString();
    const parseResult = create[Feature]Schema.safeParse(req.body);
    
    if (!parseResult.success) {
      throw new ValidationError('Validación fallida', parseResult.error.flatten().fieldErrors);
    }
    
    const result = await [feature]Service.create(userId, parseResult.data);
    
    res.status(201).json({
      success: true,
      data: result
    });
  });

  getAll = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!._id.toString();
    const query = req.query;
    
    const result = await [feature]Service.getAll(userId, query);
    
    res.status(200).json({
      success: true,
      data: result.data,
      pagination: result.pagination
    });
  });

  getById = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!._id.toString();
    const { id } = req.params;
    
    const result = await [feature]Service.getById(id, userId);
    
    res.status(200).json({
      success: true,
      data: result
    });
  });

  update = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!._id.toString();
    const { id } = req.params;
    const parseResult = update[Feature]Schema.safeParse(req.body);
    
    if (!parseResult.success) {
      throw new ValidationError('Validación fallida', parseResult.error.flatten().fieldErrors);
    }
    
    const result = await [feature]Service.update(id, userId, parseResult.data);
    
    res.status(200).json({
      success: true,
      data: result
    });
  });

  delete = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!._id.toString();
    const { id } = req.params;
    
    await [feature]Service.delete(id, userId);
    
    res.status(200).json({
      success: true,
      message: '[Feature] eliminado exitosamente'
    });
  });
}

export const [feature]Controller = new [Feature]Controller();
```

#### Service (`[feature].service.ts`)

```typescript
import { [Feature] } from '@/models/[Feature]';
import { NotFoundError, ForbiddenError } from '@/utils/errors';
import { logger } from '@/utils/logger';

export interface Create[Feature]DTO {
  field1: string;
  field2: number;
  // ... más campos
}

export interface Update[Feature]DTO {
  field1?: string;
  field2?: number;
  // ... más campos
}

export interface [Feature]Query {
  page?: number;
  limit?: number;
  sortBy?: string;
  // ... más filtros
}

export class [Feature]Service {
  async create(userId: string, data: Create[Feature]DTO) {
    logger.info(`Creating [feature] for user ${userId}`);
    
    const [feature] = await [Feature].create({
      userId,
      ...data
    });
    
    logger.info(`[Feature] created: ${[feature]._id}`);
    return [feature];
  }

  async getAll(userId: string, query: [Feature]Query) {
    const { page = 1, limit = 20, sortBy = '-createdAt' } = query;
    
    const [features] = await [Feature].find({ userId })
      .limit(limit)
      .skip((page - 1) * limit)
      .sort(sortBy);
    
    const total = await [Feature].countDocuments({ userId });
    
    return {
      data: [features],
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
        limit
      }
    };
  }

  async getById(id: string, userId: string) {
    const [feature] = await [Feature].findById(id);
    
    if (![feature]) {
      throw new NotFoundError('[Feature] no encontrado');
    }
    
    if ([feature].userId.toString() !== userId) {
      throw new ForbiddenError('No tienes permiso para ver este [feature]');
    }
    
    return [feature];
  }

  async update(id: string, userId: string, data: Update[Feature]DTO) {
    const [feature] = await this.getById(id, userId);
    
    Object.assign([feature], data);
    await [feature].save();
    
    logger.info(`[Feature] updated: ${id}`);
    return [feature];
  }

  async delete(id: string, userId: string) {
    const [feature] = await this.getById(id, userId);
    
    await [feature].deleteOne();
    
    logger.info(`[Feature] deleted: ${id}`);
  }
}

export const [feature]Service = new [Feature]Service();
```

#### Routes (`[feature].routes.ts`)

```typescript
import { Router } from 'express';
import { authMiddleware } from '@/middleware/auth';
import { [feature]Controller } from './[feature].controller';

const router = Router();

// Todas las rutas requieren autenticación
router.use(authMiddleware);

router.post('/', [feature]Controller.create);
router.get('/', [feature]Controller.getAll);
router.get('/:id', [feature]Controller.getById);
router.patch('/:id', [feature]Controller.update);
router.delete('/:id', [feature]Controller.delete);

export default router;
```

#### Validation (`[feature].validation.ts`)

```typescript
import { z } from 'zod';

export const create[Feature]Schema = z.object({
  field1: z.string().min(1, 'Campo requerido'),
  field2: z.number().min(0, 'Debe ser positivo'),
  // ... más validaciones
});

export const update[Feature]Schema = z.object({
  field1: z.string().min(1).optional(),
  field2: z.number().min(0).optional(),
  // ... más validaciones
}).refine(data => Object.keys(data).length > 0, {
  message: 'Debe proporcionar al menos un campo para actualizar'
});

export type Create[Feature]Input = z.infer<typeof create[Feature]Schema>;
export type Update[Feature]Input = z.infer<typeof update[Feature]Schema>;
```

### Autenticación Requerida

```typescript
// En routes
import { authMiddleware } from '@/middleware/auth';

router.use(authMiddleware); // Aplica a todas las rutas
// o
router.get('/', authMiddleware, controller.method); // Aplica a una ruta específica

// En controller, acceder al usuario
const userId = req.user!._id.toString();
const userEmail = req.user!.email;
```

### Paginación

```typescript
// Service
async getAll(query: QueryParams) {
  const { page = 1, limit = 20, sortBy = '-createdAt' } = query;
  
  const items = await Model.find(filter)
    .limit(limit)
    .skip((page - 1) * limit)
    .sort(sortBy)
    .populate('userId', 'username avatar');
  
  const total = await Model.countDocuments(filter);
  
  return {
    data: items,
    pagination: {
      total,
      page,
      pages: Math.ceil(total / limit),
      limit,
      hasMore: page * limit < total
    }
  };
}
```

### Validación con Zod

```typescript
// Schema reutilizable
const emailSchema = z.string().email('Email inválido').toLowerCase();
const passwordSchema = z.string()
  .min(8, 'Mínimo 8 caracteres')
  .regex(/[A-Z]/, 'Debe contener mayúscula')
  .regex(/[a-z]/, 'Debe contener minúscula')
  .regex(/[0-9]/, 'Debe contener número');

// En controller
const parseResult = schema.safeParse(req.body);
if (!parseResult.success) {
  throw new ValidationError('Validación fallida', parseResult.error.flatten().fieldErrors);
}
```

---

## Frontend Patterns

### Lista con Query

```typescript
import { useQuery } from '@tanstack/react-query';
import { FlatList } from 'react-native';
import { [feature]Api } from '@/services/api/[feature].api';

export default function [Feature]ListScreen() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['[features]', { page: 1, limit: 20 }],
    queryFn: () => [feature]Api.getAll({ page: 1, limit: 20 })
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorView error={error} onRetry={refetch} />;
  }

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-gray-900">
      <FlatList
        data={data?.data || []}
        renderItem={({ item }) => <[Feature]Card [feature]={item} />}
        keyExtractor={(item) => item._id}
        contentContainerClassName="p-4 gap-3"
        onRefresh={refetch}
        refreshing={isLoading}
      />
    </SafeAreaView>
  );
}
```

### Formulario CRUD

```typescript
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { router } from 'expo-router';
import { [feature]Api } from '@/services/api/[feature].api';
import { useToast } from '@/contexts/ToastContext';

export default function Create[Feature]Screen() {
  const [field1, setField1] = useState('');
  const [field2, setField2] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const toast = useToast();
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: [feature]Api.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['[features]'] });
      toast.success('[Feature] creado exitosamente');
      router.back();
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Error al crear [feature]';
      toast.error(message);
      if (error.response?.data?.error?.errors) {
        setErrors(error.response.data.error.errors);
      }
    }
  });

  const handleSubmit = () => {
    setErrors({});
    
    // Validación local
    if (!field1.trim()) {
      setErrors({ field1: 'Campo requerido' });
      return;
    }
    
    createMutation.mutate({ field1, field2 });
  };

  return (
    <ScrollView className="flex-1 bg-white dark:bg-gray-900 p-4">
      <Input
        label="Field 1"
        value={field1}
        onChangeText={setField1}
        error={errors.field1}
      />
      
      <Input
        label="Field 2"
        value={field2.toString()}
        onChangeText={(val) => setField2(Number(val))}
        keyboardType="numeric"
        error={errors.field2}
      />
      
      <Button
        onPress={handleSubmit}
        loading={createMutation.isPending}
      >
        Crear
      </Button>
    </ScrollView>
  );
}
```

### Loading States

```typescript
// Pattern: Loading, Error, Empty, Success
function Component() {
  const { data, isLoading, error } = useQuery(...);
  
  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#F97316" />
      </View>
    );
  }
  
  if (error) {
    return (
      <View className="flex-1 items-center justify-center p-4">
        <Text className="text-red-500 mb-4">Error al cargar datos</Text>
        <Button onPress={() => refetch()}>Reintentar</Button>
      </View>
    );
  }
  
  if (!data || data.length === 0) {
    return (
      <View className="flex-1 items-center justify-center p-4">
        <Text className="text-gray-500">No hay datos disponibles</Text>
      </View>
    );
  }
  
  return <SuccessView data={data} />;
}
```

---

## Database Patterns

### Modelo Mongoose Completo

```typescript
import { Schema, model, Document } from 'mongoose';

export interface I[Feature] extends Document {
  userId: Schema.Types.ObjectId;
  field1: string;
  field2: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const [feature]Schema = new Schema<I[Feature]>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    field1: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100
    },
    field2: {
      type: Number,
      default: 0,
      min: 0
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Índices
[feature]Schema.index({ userId: 1, createdAt: -1 });
[feature]Schema.index({ field1: 'text' });

// Virtuals
[feature]Schema.virtual('user', {
  ref: 'User',
  localField: 'userId',
  foreignField: '_id',
  justOne: true
});

// Methods
[feature]Schema.methods.customMethod = function() {
  // Implementation
};

// Statics
[feature]Schema.statics.findActive = function() {
  return this.find({ isActive: true });
};

export const [Feature] = model<I[Feature]>('[Feature]', [feature]Schema);
```

---

## Testing Patterns

### Backend Unit Test

```typescript
import { [feature]Service } from './[feature].service';
import { [Feature] } from '@/models/[Feature]';

jest.mock('@/models/[Feature]');

describe('[Feature]Service', () => {
  const mockUserId = '507f1f77bcf86cd799439011';
  
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  describe('create', () => {
    it('should create [feature] successfully', async () => {
      const mockData = { field1: 'test', field2: 10 };
      const mockResult = { _id: 'abc123', userId: mockUserId, ...mockData };
      
      ([Feature].create as jest.Mock).mockResolvedValue(mockResult);
      
      const result = await [feature]Service.create(mockUserId, mockData);
      
      expect([Feature].create).toHaveBeenCalledWith({
        userId: mockUserId,
        ...mockData
      });
      expect(result).toEqual(mockResult);
    });
  });
});
```

### Frontend Hook Test

```typescript
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { use[Features] } from './use[Features]';

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } }
  });
  
  return ({ children }: any) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

describe('use[Features]', () => {
  it('should fetch [features]', async () => {
    const { result } = renderHook(() => use[Features](), {
      wrapper: createWrapper()
    });
    
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    
    expect(result.current.data).toBeDefined();
    expect(Array.isArray(result.current.data?.data)).toBe(true);
  });
});
```

---

## 🎯 Usage

**Prompt para IA**:
```
Crea un CRUD completo para "Progress Photos" usando los patterns de CODE_PATTERNS.md:
- Backend: Controller + Service + Routes + Validation
- Frontend: Lista + Crear + Editar
- Modelo: { userId, photoUrl, date, bodyWeight, notes }
```

La IA usará estos snippets automáticamente para generar código consistente.
