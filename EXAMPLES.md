# Examples - Implementaciones Completas

> **Casos de uso reales**: Features completos implementados end-to-end como referencia.

---

## 📋 Table of Contents

- [Example 1: Workouts (CRUD Completo)](#example-1-workouts-crud-completo)
- [Example 2: Auth (Login/Register)](#example-2-auth-loginregister)
- [Example 3: Social (Likes/Comments)](#example-3-social-likescomments)
- [Example 4: Real-time (Notifications)](#example-4-real-time-notifications)

---

## Example 1: Workouts (CRUD Completo)

### Backend

**Model** (`backend/src/models/Workout.ts`):
```typescript
import { Schema, model, Document } from 'mongoose';

export interface IWorkout extends Document {
  userId: Schema.Types.ObjectId;
  name: string;
  date: Date;
  exercises: Array<{
    exerciseId: Schema.Types.ObjectId;
    sets: Array<{
      reps?: number;
      weight?: number;
      completed: boolean;
    }>;
  }>;
  duration?: number;
  xpEarned: number;
  visibility: 'private' | 'friends' | 'public';
  status: 'planned' | 'in-progress' | 'completed';
  createdAt: Date;
  updatedAt: Date;
}

const workoutSchema = new Schema<IWorkout>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  name: { type: String, required: true, trim: true },
  date: { type: Date, default: Date.now, index: true },
  exercises: [{
    exerciseId: { type: Schema.Types.ObjectId, ref: 'Exercise', required: true },
    sets: [{
      reps: Number,
      weight: Number,
      completed: { type: Boolean, default: false }
    }]
  }],
  duration: Number,
  xpEarned: { type: Number, default: 0 },
  visibility: { type: String, enum: ['private', 'friends', 'public'], default: 'private' },
  status: { type: String, enum: ['planned', 'in-progress', 'completed'], default: 'planned' }
}, { timestamps: true });

workoutSchema.index({ userId: 1, date: -1 });
workoutSchema.index({ visibility: 1, createdAt: -1 });

export const Workout = model<IWorkout>('Workout', workoutSchema);
```

**Service** (`backend/src/features/workouts/workout.service.ts`):
```typescript
import { Workout } from '@/models/Workout';
import { User } from '@/models/User';
import { NotFoundError, ForbiddenError } from '@/utils/errors';

export class WorkoutService {
  async create(userId: string, data: CreateWorkoutDTO) {
    const xp = this.calculateXP(data.exercises);
    
    const workout = await Workout.create({
      userId,
      ...data,
      xpEarned: xp,
      status: 'completed'
    });
    
    // Update user stats
    await User.findByIdAndUpdate(userId, {
      $inc: {
        'stats.totalWorkouts': 1,
        'stats.totalXP': xp,
        xp: xp
      }
    });
    
    return workout;
  }

  async getAll(userId: string, query: WorkoutQuery) {
    const { page = 1, limit = 20, startDate, endDate } = query;
    
    const filter: any = { userId };
    if (startDate || endDate) {
      filter.date = {};
      if (startDate) filter.date.$gte = new Date(startDate);
      if (endDate) filter.date.$lte = new Date(endDate);
    }
    
    const workouts = await Workout.find(filter)
      .populate('exercises.exerciseId', 'name category')
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ date: -1 });
    
    const total = await Workout.countDocuments(filter);
    
    return {
      data: workouts,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
        limit
      }
    };
  }

  async getById(id: string, userId: string) {
    const workout = await Workout.findById(id)
      .populate('exercises.exerciseId', 'name category muscleGroup');
    
    if (!workout) {
      throw new NotFoundError('Workout no encontrado');
    }
    
    if (workout.userId.toString() !== userId && workout.visibility === 'private') {
      throw new ForbiddenError('No tienes permiso para ver este workout');
    }
    
    return workout;
  }

  private calculateXP(exercises: any[]): number {
    return exercises.reduce((total, ex) => {
      const setsXP = ex.sets.length * 10;
      return total + setsXP;
    }, 0);
  }
}

export const workoutService = new WorkoutService();
```

**Controller** (`backend/src/features/workouts/workout.controller.ts`):
```typescript
import { Request, Response } from 'express';
import { asyncHandler } from '@/utils/asyncHandler';
import { workoutService } from './workout.service';
import { createWorkoutSchema } from './workout.validation';
import { ValidationError } from '@/utils/errors';

export class WorkoutController {
  create = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!._id.toString();
    
    const parseResult = createWorkoutSchema.safeParse(req.body);
    if (!parseResult.success) {
      throw new ValidationError('Validación fallida', parseResult.error.flatten().fieldErrors);
    }
    
    const workout = await workoutService.create(userId, parseResult.data);
    
    res.status(201).json({
      success: true,
      data: workout
    });
  });

  getAll = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!._id.toString();
    const result = await workoutService.getAll(userId, req.query);
    
    res.status(200).json({
      success: true,
      data: result.data,
      pagination: result.pagination
    });
  });

  getById = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!._id.toString();
    const workout = await workoutService.getById(req.params.id, userId);
    
    res.status(200).json({
      success: true,
      data: workout
    });
  });
}

export const workoutController = new WorkoutController();
```

**Routes** (`backend/src/features/workouts/workout.routes.ts`):
```typescript
import { Router } from 'express';
import { authMiddleware } from '@/middleware/auth';
import { workoutController } from './workout.controller';

const router = Router();

router.use(authMiddleware);

router.post('/', workoutController.create);
router.get('/', workoutController.getAll);
router.get('/:id', workoutController.getById);

export default router;
```

### Frontend

**API Client** (`mobile/src/services/api/workouts.api.ts`):
```typescript
import { apiClient } from './client';

export interface WorkoutsQuery {
  page?: number;
  limit?: number;
  startDate?: string;
  endDate?: string;
}

export const workoutsApi = {
  getAll: async (query?: WorkoutsQuery) => {
    const params = new URLSearchParams();
    if (query?.page) params.append('page', query.page.toString());
    if (query?.limit) params.append('limit', query.limit.toString());
    if (query?.startDate) params.append('startDate', query.startDate);
    if (query?.endDate) params.append('endDate', query.endDate);

    const response = await apiClient.get(`/workouts?${params.toString()}`);
    return response.data;
  },

  getById: async (id: string) => {
    const response = await apiClient.get(`/workouts/${id}`);
    return response.data;
  },

  create: async (data: CreateWorkoutData) => {
    const response = await apiClient.post('/workouts', data);
    return response.data;
  }
};
```

**Hook** (`mobile/src/hooks/useWorkouts.ts`):
```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { workoutsApi, WorkoutsQuery } from '@/services/api/workouts.api';

export const useWorkouts = (query?: WorkoutsQuery) => {
  return useQuery({
    queryKey: ['workouts', query],
    queryFn: () => workoutsApi.getAll(query)
  });
};

export const useWorkout = (id: string) => {
  return useQuery({
    queryKey: ['workout', id],
    queryFn: () => workoutsApi.getById(id),
    enabled: !!id
  });
};

export const useCreateWorkout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: workoutsApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workouts'] });
      queryClient.invalidateQueries({ queryKey: ['stats'] });
    }
  });
};
```

**Screen** (`mobile/app/(tabs)/workouts.tsx`):
```typescript
import { FlatList, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useWorkouts } from '@/hooks/useWorkouts';
import { WorkoutCard } from '@/components/workouts/WorkoutCard';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

export default function WorkoutsScreen() {
  const { data, isLoading, error, refetch } = useWorkouts({ limit: 20 });

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <LoadingSpinner />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 items-center justify-center p-4">
        <Text className="text-red-500">Error al cargar workouts</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-gray-900">
      <FlatList
        data={data?.data || []}
        renderItem={({ item }) => <WorkoutCard workout={item} />}
        keyExtractor={(item) => item._id}
        contentContainerClassName="p-4 gap-3"
        onRefresh={refetch}
        refreshing={isLoading}
      />
    </SafeAreaView>
  );
}
```

---

## Example 2: Auth (Login/Register)

### Backend

**Service** (`backend/src/features/auth/auth.service.ts`):
```typescript
import { User } from '@/models/User';
import { ConflictError, UnauthorizedError } from '@/utils/errors';
import { generateAccessToken, generateRefreshToken } from '@/utils/jwt';

export class AuthService {
  async register(data: RegisterData) {
    const { email, username, password } = data;

    const existingUser = await User.findOne({
      $or: [{ email }, { username }]
    });

    if (existingUser) {
      if (existingUser.email === email) {
        throw new ConflictError('El email ya está registrado');
      }
      throw new ConflictError('El usuario ya está en uso');
    }

    const user = await User.create({
      email,
      username,
      password // Will be hashed by pre-save hook
    });

    const accessToken = generateAccessToken(user._id.toString());
    const refreshToken = generateRefreshToken(user._id.toString());

    return {
      user: {
        id: user._id.toString(),
        email: user.email,
        username: user.username,
        xp: user.xp,
        level: user.level
      },
      accessToken,
      refreshToken
    };
  }

  async login(data: LoginData) {
    const { emailOrUsername, password } = data;

    const user = await User.findOne({
      $or: [{ email: emailOrUsername }, { username: emailOrUsername }]
    }).select('+password');

    if (!user) {
      throw new UnauthorizedError('Credenciales inválidas');
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      throw new UnauthorizedError('Credenciales inválidas');
    }

    const accessToken = generateAccessToken(user._id.toString());
    const refreshToken = generateRefreshToken(user._id.toString());

    return {
      user: {
        id: user._id.toString(),
        email: user.email,
        username: user.username,
        xp: user.xp,
        level: user.level
      },
      accessToken,
      refreshToken
    };
  }
}

export const authService = new AuthService();
```

### Frontend

**Store** (`mobile/src/stores/authStore.ts`):
```typescript
import { create } from 'zustand';
import { storage } from '@/services/storage/mmkv';
import { authApi } from '@/services/api/auth.api';
import { apiClient } from '@/services/api/client';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  
  login: (emailOrUsername: string, password: string) => Promise<void>;
  logout: () => void;
  initAuth: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,

  login: async (emailOrUsername, password) => {
    set({ isLoading: true });
    try {
      const data = await authApi.login({ emailOrUsername, password });
      await get().setAuth(data);
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  setAuth: async (data: AuthResponse) => {
    await storage.set('accessToken', data.accessToken);
    await storage.set('refreshToken', data.refreshToken);
    await storage.set('user', JSON.stringify(data.user));
    
    apiClient.setAuthToken(data.accessToken);

    set({
      user: data.user,
      isAuthenticated: true,
      isLoading: false
    });
  },

  logout: async () => {
    await storage.delete('accessToken');
    await storage.delete('refreshToken');
    await storage.delete('user');
    
    set({
      user: null,
      isAuthenticated: false,
      isLoading: false
    });
  },

  initAuth: async () => {
    const userStr = await storage.getString('user');
    const accessToken = await storage.getString('accessToken');

    if (userStr && accessToken) {
      try {
        const user = JSON.parse(userStr);
        apiClient.setAuthToken(accessToken);
        set({
          user,
          isAuthenticated: true,
          isLoading: false
        });
      } catch (error) {
        set({ isLoading: false });
      }
    } else {
      set({ isLoading: false });
    }
  }
}));
```

**Login Screen** (`mobile/app/login.tsx`):
```typescript
import { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAuthStore } from '@/stores/authStore';
import { useToast } from '@/contexts/ToastContext';

export default function LoginScreen() {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const login = useAuthStore((state) => state.login);
  const toast = useToast();

  const loginMutation = useMutation({
    mutationFn: () => login(emailOrUsername, password),
    onSuccess: () => {
      toast.success('¡Bienvenido de nuevo!');
      router.replace('/(tabs)');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Error al iniciar sesión');
    }
  });

  const handleLogin = () => {
    if (!emailOrUsername.trim() || !password) {
      toast.error('Completa todos los campos');
      return;
    }
    loginMutation.mutate();
  };

  return (
    <ScrollView className="flex-1 bg-white p-6">
      <Text className="font-heading-bold text-4xl text-primary mb-8">
        Iniciar Sesión
      </Text>
      
      <Input
        label="Email o Usuario"
        value={emailOrUsername}
        onChangeText={setEmailOrUsername}
        autoCapitalize="none"
      />
      
      <Input
        label="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
      />
      
      <Button
        onPress={handleLogin}
        loading={loginMutation.isPending}
      >
        Entrar
      </Button>
    </ScrollView>
  );
}
```

---

## 🎯 Key Takeaways

1. **Separación de responsabilidades**: Controller → Service → Model
2. **Validación consistente**: Zod en backend y frontend
3. **Error handling**: Try-catch + custom errors + toast feedback
4. **State management**: Zustand para auth, React Query para server state
5. **Type safety**: TypeScript interfaces compartidas
6. **Testing**: Unit + Integration + E2E

Usa estos ejemplos como referencia cuando implementes nuevas features.
