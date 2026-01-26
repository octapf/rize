# Testing Standards - RIZE

> **Protocolo de Testing**: OBLIGATORIO seguir metodología TDD (Test-Driven Development). Cobertura mínima: **>90%**. Este documento define cómo escribir tests efectivos y mantenibles.

## 📋 Tabla de Contenidos

- [Filosofía de Testing](#filosofía-de-testing)
- [Protocolo TDD](#protocolo-tdd)
- [Estructura de Tests](#estructura-de-tests)
- [Unit Testing](#unit-testing)
- [Integration Testing](#integration-testing)
- [E2E Testing](#e2e-testing)
- [Mocking](#mocking)
- [Coverage](#coverage)
- [CI/CD](#cicd)

---

## 🎯 Filosofía de Testing

### Pirámide de Testing

```
      /\
     /E2E\        ← Pocos (10%)
    /──────\
   /Integr.\     ← Moderados (30%)
  /──────────\
 /Unit Tests \   ← Muchos (60%)
/──────────────\
```

**Distribución ideal**:
- **60% Unit tests**: Funciones puras, utils, services
- **30% Integration tests**: Controllers + DB, API endpoints
- **10% E2E tests**: Flujos críticos de usuario

### Principios

1. **Tests son documentación**: Deben explicar qué hace el código
2. **Fast**: Tests unitarios <1s, integration <5s
3. **Isolated**: Un test no depende de otro
4. **Repeatable**: Mismo resultado cada vez
5. **Self-validating**: Pass/fail automático, no inspección manual

---

## 🔴 Protocolo TDD

### Red-Green-Refactor

```
1. 🔴 RED:    Escribir test que falla
2. 🟢 GREEN:  Escribir código mínimo para que pase
3. 🔵 REFACTOR: Limpiar código manteniendo tests verdes
```

### Ejemplo Completo

```typescript
// 🔴 RED: Escribir test primero
describe('calculateWorkoutXP', () => {
  it('should calculate XP based on exercises difficulty', () => {
    const exercises = [
      { exerciseId: 'pull-ups', sets: 3, reps: 8, difficulty: 1.5 },
      { exerciseId: 'push-ups', sets: 3, reps: 15, difficulty: 0.8 }
    ];
    
    const xp = calculateWorkoutXP(exercises);
    
    expect(xp).toBe(72); // (3*8*1.5) + (3*15*0.8) = 36 + 36
  });
});

// Test corre → ❌ FALLA (función no existe)

// 🟢 GREEN: Implementar mínimo
export function calculateWorkoutXP(exercises: Exercise[]): number {
  return exercises.reduce((total, ex) => {
    return total + (ex.sets * ex.reps * ex.difficulty);
  }, 0);
}

// Test corre → ✅ PASA

// 🔵 REFACTOR: Mejorar (si necesario)
export function calculateWorkoutXP(exercises: Exercise[]): number {
  return exercises.reduce(
    (total, { sets, reps, difficulty }) => 
      total + sets * reps * difficulty,
    0
  );
}

// Test corre → ✅ SIGUE PASANDO
```

---

## 🧪 Estructura de Tests

### Naming Conventions

```typescript
// ✅ CORRECTO: Descriptivo, en español si el equipo prefiere
describe('WorkoutService', () => {
  describe('create', () => {
    it('debería crear workout con XP calculado correctamente', () => {});
    it('debería incrementar stats del usuario', () => {});
    it('debería lanzar error si ejercicios vacíos', () => {});
  });
  
  describe('delete', () => {
    it('debería marcar workout como eliminado (soft delete)', () => {});
    it('debería fallar si workout no pertenece al usuario', () => {});
  });
});

// ❌ INCORRECTO: Genérico, no descriptivo
describe('WorkoutService', () => {
  it('test1', () => {});
  it('should work', () => {});
});
```

### Patrón AAA (Arrange-Act-Assert)

```typescript
it('debería seguir a un usuario correctamente', async () => {
  // ARRANGE: Preparar datos y mocks
  const followerId = 'user1';
  const followedId = 'user2';
  const mockUser = { id: followedId, followers: [] };
  
  jest.spyOn(User, 'findById').mockResolvedValue(mockUser);
  jest.spyOn(User, 'findByIdAndUpdate').mockResolvedValue({});

  // ACT: Ejecutar función a testear
  await socialService.followUser(followerId, followedId);

  // ASSERT: Verificar resultado
  expect(User.findByIdAndUpdate).toHaveBeenCalledWith(
    followedId,
    { $addToSet: { followers: followerId } }
  );
});
```

---

## 🔬 Unit Testing

### Testing Services (Business Logic)

```typescript
// features/workouts/__tests__/workout.service.test.ts
import { workoutService } from '../workout.service';
import { Workout } from '@/models/Workout';
import { User } from '@/models/User';

// Mock de modelos
jest.mock('@/models/Workout');
jest.mock('@/models/User');

describe('WorkoutService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('debería crear workout con datos válidos', async () => {
      const userId = 'user123';
      const workoutData = {
        exercises: [
          { exerciseId: 'ex1', sets: 3, reps: 10 }
        ],
        visibility: 'public'
      };

      const mockWorkout = { id: 'workout123', ...workoutData, xp: 30 };
      (Workout.create as jest.Mock).mockResolvedValue(mockWorkout);

      const result = await workoutService.create(userId, workoutData);

      expect(Workout.create).toHaveBeenCalledWith(
        expect.objectContaining({
          userId,
          exercises: workoutData.exercises,
          xp: expect.any(Number)
        })
      );
      expect(result).toEqual(mockWorkout);
    });

    it('debería actualizar stats del usuario', async () => {
      const userId = 'user123';
      const workoutData = {
        exercises: [{ exerciseId: 'ex1', sets: 3, reps: 10 }]
      };

      (Workout.create as jest.Mock).mockResolvedValue({ xp: 30 });
      (User.findByIdAndUpdate as jest.Mock).mockResolvedValue({});

      await workoutService.create(userId, workoutData);

      expect(User.findByIdAndUpdate).toHaveBeenCalledWith(
        userId,
        {
          $inc: {
            'stats.totalWorkouts': 1,
            'stats.totalXP': 30
          }
        }
      );
    });

    it('debería lanzar ValidationError si ejercicios vacíos', async () => {
      const userId = 'user123';
      const workoutData = { exercises: [] };

      await expect(
        workoutService.create(userId, workoutData)
      ).rejects.toThrow(ValidationError);
    });
  });
});
```

### Testing Utils

```typescript
// utils/__tests__/jwt.util.test.ts
import { generateAccessToken, verifyAccessToken } from '../jwt.util';
import jwt from 'jsonwebtoken';

describe('JWT Utils', () => {
  describe('generateAccessToken', () => {
    it('debería generar token válido con userId', () => {
      const userId = 'user123';
      const token = generateAccessToken(userId);

      const decoded = jwt.decode(token) as any;
      expect(decoded.userId).toBe(userId);
      expect(decoded.type).toBe('access');
    });

    it('debería expirar en 15 minutos', () => {
      const token = generateAccessToken('user123');
      const decoded = jwt.decode(token) as any;
      
      const expiresIn = decoded.exp - decoded.iat;
      expect(expiresIn).toBe(15 * 60); // 900 segundos
    });
  });

  describe('verifyAccessToken', () => {
    it('debería verificar token válido', () => {
      const userId = 'user123';
      const token = generateAccessToken(userId);

      const result = verifyAccessToken(token);
      expect(result.userId).toBe(userId);
    });

    it('debería lanzar error si token expirado', () => {
      const expiredToken = jwt.sign(
        { userId: 'user123' },
        process.env.JWT_SECRET!,
        { expiresIn: '-1s' } // Ya expirado
      );

      expect(() => verifyAccessToken(expiredToken)).toThrow();
    });
  });
});
```

---

## 🔗 Integration Testing

### Testing Controllers + DB

```typescript
// features/workouts/__tests__/workout.integration.test.ts
import request from 'supertest';
import { app } from '@/server';
import { connectDB, disconnectDB } from '@/config/database';
import { User } from '@/models/User';
import { Workout } from '@/models/Workout';
import { generateAccessToken } from '@/utils/jwt.util';

describe('Workout API Integration', () => {
  let token: string;
  let userId: string;

  beforeAll(async () => {
    await connectDB();
  });

  afterAll(async () => {
    await disconnectDB();
  });

  beforeEach(async () => {
    // Limpiar DB antes de cada test
    await User.deleteMany({});
    await Workout.deleteMany({});

    // Crear usuario de prueba
    const user = await User.create({
      email: 'test@example.com',
      username: 'testuser',
      password: 'hashedpassword'
    });
    userId = user.id;
    token = generateAccessToken(userId);
  });

  describe('POST /api/v1/workouts', () => {
    it('debería crear workout con autenticación válida', async () => {
      const workoutData = {
        exercises: [
          { exerciseId: 'ex1', sets: 3, reps: 10 }
        ],
        visibility: 'public'
      };

      const response = await request(app)
        .post('/api/v1/workouts')
        .set('Authorization', `Bearer ${token}`)
        .send(workoutData)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toMatchObject({
        exercises: workoutData.exercises,
        visibility: 'public',
        xp: expect.any(Number)
      });

      // Verificar que se guardó en DB
      const workout = await Workout.findById(response.body.data.id);
      expect(workout).toBeTruthy();
      expect(workout!.userId.toString()).toBe(userId);
    });

    it('debería retornar 401 sin token', async () => {
      const response = await request(app)
        .post('/api/v1/workouts')
        .send({ exercises: [] })
        .expect(401);

      expect(response.body.success).toBe(false);
      expect(response.body.error.code).toBe('UNAUTHORIZED');
    });

    it('debería retornar 400 con ejercicios vacíos', async () => {
      const response = await request(app)
        .post('/api/v1/workouts')
        .set('Authorization', `Bearer ${token}`)
        .send({ exercises: [] })
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.error.code).toBe('VALIDATION_ERROR');
    });
  });

  describe('GET /api/v1/workouts', () => {
    it('debería listar workouts del usuario con paginación', async () => {
      // Crear 25 workouts de prueba
      const workouts = Array.from({ length: 25 }, (_, i) => ({
        userId,
        exercises: [{ exerciseId: 'ex1', sets: 3, reps: 10 }],
        xp: 30,
        visibility: 'public'
      }));
      await Workout.insertMany(workouts);

      const response = await request(app)
        .get('/api/v1/workouts?page=1&limit=20')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(response.body.data).toHaveLength(20);
      expect(response.body.pagination).toEqual({
        page: 1,
        limit: 20,
        total: 25,
        totalPages: 2,
        hasMore: true
      });
    });
  });
});
```

---

## 🌐 E2E Testing

### Detox (React Native E2E)

```typescript
// mobile/e2e/workout.e2e.ts
import { by, element, expect as detoxExpect, waitFor } from 'detox';

describe('Workout Flow', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('debería permitir crear un workout completo', async () => {
    // Login
    await element(by.id('email-input')).typeText('test@example.com');
    await element(by.id('password-input')).typeText('password123');
    await element(by.id('login-button')).tap();

    // Esperar a que cargue home
    await waitFor(element(by.id('home-screen')))
      .toBeVisible()
      .withTimeout(3000);

    // Abrir creación de workout
    await element(by.id('fab-create-workout')).tap();

    // Añadir ejercicio
    await element(by.id('add-exercise-button')).tap();
    await element(by.text('Pull-ups')).tap();
    
    // Ingresar sets y reps
    await element(by.id('sets-input')).typeText('3');
    await element(by.id('reps-input')).typeText('10');
    await element(by.id('confirm-exercise')).tap();

    // Guardar workout
    await element(by.id('save-workout')).tap();

    // Verificar que aparece en lista
    await waitFor(element(by.text('Pull-ups')))
      .toBeVisible()
      .withTimeout(2000);
  });
});
```

---

## 🎭 Mocking

### Mocking Mongoose Models

```typescript
// ✅ CORRECTO: Mock completo de modelo
jest.mock('@/models/User', () => ({
  User: {
    findById: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    findByIdAndUpdate: jest.fn()
  }
}));

// Uso en test
(User.findById as jest.Mock).mockResolvedValue({
  id: 'user123',
  username: 'testuser'
});
```

### Mocking External APIs

```typescript
// Mock de Cloudinary
jest.mock('cloudinary', () => ({
  v2: {
    uploader: {
      upload: jest.fn().mockResolvedValue({
        url: 'https://cloudinary.com/photo.jpg',
        public_id: 'abc123'
      })
    }
  }
}));
```

### Spying on Functions

```typescript
// Espiar función sin reemplazarla completamente
const calculateXPSpy = jest.spyOn(utils, 'calculateWorkoutXP');

await workoutService.create(userId, data);

expect(calculateXPSpy).toHaveBeenCalledWith(data.exercises);
calculateXPSpy.mockRestore(); // Restaurar implementación original
```

---

## 📊 Coverage

### Configuración Jest

```javascript
// jest.config.js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.test.{ts,tsx}',
    '!src/server.ts' // Entry point, difícil de testear
  ],
  coverageThresholds: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90
    }
  },
  testMatch: [
    '**/__tests__/**/*.test.{ts,tsx}',
    '**/*.test.{ts,tsx}'
  ]
};
```

### Comando

```bash
# Generar reporte de coverage
npm test -- --coverage

# Ver reporte HTML
open coverage/lcov-report/index.html
```

### Excepciones

```typescript
/* istanbul ignore next */
if (process.env.NODE_ENV === 'development') {
  // Código solo de dev, no necesita coverage
}
```

---

## 🚀 CI/CD

### GitHub Actions Workflow

```yaml
# .github/workflows/test.yml
name: Tests

on:
  push:
    branches: [develop, main]
  pull_request:
    branches: [develop, main]

jobs:
  test-backend:
    runs-on: ubuntu-latest
    
    services:
      mongodb:
        image: mongo:6
        ports:
          - 27017:27017

    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        working-directory: ./backend
        run: npm ci
        
      - name: Run tests
        working-directory: ./backend
        run: npm test -- --coverage
        env:
          MONGODB_URI: mongodb://localhost:27017/test
          JWT_SECRET: test-secret-32-chars-minimum
          
      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./backend/coverage/lcov.info

  test-mobile:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        working-directory: ./mobile
        run: npm ci
        
      - name: Run tests
        working-directory: ./mobile
        run: npm test -- --coverage
```

---

## ✅ Checklist Pre-Commit

Antes de hacer commit, verificar:

- [ ] Todos los tests pasan (`npm test`)
- [ ] Coverage >90% (`npm test -- --coverage`)
- [ ] No hay warnings de TypeScript (`npm run type-check`)
- [ ] Linter pasa (`npm run lint`)
- [ ] Tests nuevos para features nuevas
- [ ] Tests actualizados para cambios en features existentes

---

## 📚 Recursos

- [Jest Documentation](https://jestjs.io/)
- [Supertest](https://github.com/visionmedia/supertest)
- [Detox E2E Testing](https://wix.github.io/Detox/)
- [Testing Best Practices](https://github.com/goldbergyoni/javascript-testing-best-practices)

---

**Última actualización**: Enero 23, 2026  
**Versión**: 1.0.0
