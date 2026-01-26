# Frontend Standards - RIZE Mobile App

> **Documento de estándares frontend**: Toda implementación mobile DEBE seguir estos patrones. Este documento garantiza consistencia visual, rendimiento y mantenibilidad.

## 📋 Tabla de Contenidos

- [Estructura de Proyecto](#estructura-de-proyecto)
- [Navegación con Expo Router](#navegación-con-expo-router)
- [Arquitectura de Componentes](#arquitectura-de-componentes)
- [Manejo de Estado](#manejo-de-estado)
- [Data Fetching](#data-fetching)
- [Styling con NativeWind](#styling-con-nativewind)
- [Animaciones](#animaciones)
- [Offline-First](#offline-first)
- [Performance](#performance)
- [Naming Conventions](#naming-conventions)

---

## 🏗️ Estructura de Proyecto

```
mobile/src/
├── app/                        # Expo Router (file-based routing)
│   ├── (auth)/                # Auth stack (sin tabs)
│   │   ├── login.tsx
│   │   ├── register.tsx
│   │   └── _layout.tsx
│   ├── (tabs)/                # Main app (con bottom tabs)
│   │   ├── index.tsx          # Home
│   │   ├── stats.tsx
│   │   ├── social.tsx
│   │   ├── profile.tsx
│   │   └── _layout.tsx
│   ├── workout/
│   │   ├── [id].tsx           # Workout detail
│   │   └── create.tsx
│   ├── user/
│   │   └── [username].tsx     # User profile
│   └── _layout.tsx            # Root layout
│
├── components/
│   ├── ui/                    # Design system components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Card.tsx
│   │   ├── Avatar.tsx
│   │   └── Badge.tsx
│   └── features/              # Feature-specific components
│       ├── WorkoutCard.tsx
│       ├── ExerciseListItem.tsx
│       ├── StatCard.tsx
│       └── AchievementCard.tsx
│
├── hooks/
│   ├── useAuth.ts
│   ├── useWorkouts.ts
│   ├── useExercises.ts
│   └── useInfiniteScroll.ts
│
├── services/
│   ├── api/
│   │   ├── client.ts          # Axios instance
│   │   ├── auth.api.ts
│   │   ├── workout.api.ts
│   │   └── social.api.ts
│   └── storage/
│       └── mmkv.ts            # Local storage
│
├── stores/
│   ├── authStore.ts           # Zustand: Auth state
│   ├── syncStore.ts           # Zustand: Offline queue
│   └── uiStore.ts             # Zustand: UI state (theme, etc)
│
├── lib/
│   ├── utils.ts               # Utility functions
│   ├── constants.ts           # App constants
│   └── types.ts               # TypeScript types
│
└── assets/
    ├── fonts/
    ├── images/
    └── animations/            # Lottie JSON files
```

---

## 🧭 Navegación con Expo Router

### File-Based Routing

```tsx
// app/(tabs)/_layout.tsx - Bottom Tab Navigator
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#10B981', // emerald-500
        tabBarInactiveTintColor: '#9CA3AF', // gray-400
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen name="stats" options={{ title: 'Stats' }} />
      <Tabs.Screen name="social" options={{ title: 'Social' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
    </Tabs>
  );
}
```

### Navigation Patterns

```tsx
// ✅ CORRECTO: Usar hooks de Expo Router
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function WorkoutDetail() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  
  const handleEdit = () => {
    router.push(`/workout/edit/${id}`);
  };
  
  const handleBack = () => {
    router.back();
  };

  return (
    <View>
      <Button onPress={handleEdit}>Edit</Button>
    </View>
  );
}

// ✅ Pasar params con type-safety
router.push({
  pathname: '/workout/[id]',
  params: { id: workout.id }
});

// ❌ INCORRECTO: String navigation sin type-safety
router.push('/workout/' + workout.id);
```

### Deep Linking

```tsx
// app.json - Configurar deep links
{
  "expo": {
    "scheme": "rize",
    "ios": {
      "bundleIdentifier": "com.rize.app",
      "associatedDomains": ["applinks:rize.app"]
    },
    "android": {
      "package": "com.rize.app",
      "intentFilters": [
        {
          "action": "VIEW",
          "data": [{ "scheme": "rize" }]
        }
      ]
    }
  }
}

// Ejemplos de deep links:
// rize://workout/123
// rize://user/johndoe
// https://rize.app/workout/123 (universal link)
```

---

## 🧩 Arquitectura de Componentes

### Component Hierarchy

```
Screen (app/*.tsx)
  └─ Feature Component (components/features/*.tsx)
      └─ UI Component (components/ui/*.tsx)
```

### UI Components (Design System)

```tsx
// components/ui/Button.tsx
import { Pressable, Text, ActivityIndicator } from 'react-native';
import { cn } from '@/lib/utils'; // className merge utility

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'destructive' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  onPress: () => void;
  children: string;
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading,
  disabled,
  onPress,
  children
}: ButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      className={cn(
        'rounded-xl items-center justify-center',
        // Variants
        variant === 'primary' && 'bg-emerald-500 shadow-md',
        variant === 'secondary' && 'border-2 border-emerald-500',
        variant === 'destructive' && 'bg-red-500',
        variant === 'ghost' && 'bg-transparent',
        // Sizes
        size === 'sm' && 'px-4 py-2',
        size === 'md' && 'px-6 py-3',
        size === 'lg' && 'px-8 py-4',
        // States
        disabled && 'opacity-50'
      )}
      style={({ pressed }) => ({ opacity: pressed ? 0.9 : 1 })}
    >
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <Text
          className={cn(
            'font-inter-semibold',
            variant === 'primary' && 'text-white',
            variant === 'secondary' && 'text-emerald-500',
            size === 'sm' && 'text-sm',
            size === 'md' && 'text-base',
            size === 'lg' && 'text-lg'
          )}
        >
          {children}
        </Text>
      )}
    </Pressable>
  );
}
```

### Feature Components

```tsx
// components/features/WorkoutCard.tsx
import { View, Text, Pressable } from 'react-native';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Ionicons } from '@expo/vector-icons';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import { useRouter } from 'expo-router';

interface WorkoutCardProps {
  workout: {
    id: string;
    user: { username: string; avatar?: string };
    exercises: { name: string }[];
    xp: number;
    duration?: number;
    createdAt: string;
    likesCount: number;
    commentsCount: number;
  };
  onLike?: () => void;
}

export function WorkoutCard({ workout, onLike }: WorkoutCardProps) {
  const router = useRouter();

  return (
    <Pressable
      onPress={() => router.push(`/workout/${workout.id}`)}
      className="bg-white rounded-xl shadow-sm p-4 mb-3"
    >
      {/* Header */}
      <View className="flex-row items-center justify-between mb-3">
        <View className="flex-row items-center gap-2">
          <Avatar size="sm" src={workout.user.avatar} />
          <Text className="font-inter-semibold text-gray-900">
            @{workout.user.username}
          </Text>
        </View>
        <Text className="text-gray-500 text-sm">
          {formatDistanceToNow(new Date(workout.createdAt), {
            locale: es,
            addSuffix: true
          })}
        </Text>
      </View>

      {/* Content */}
      <View className="mb-3">
        <Text className="text-gray-700 mb-1">
          💪 {workout.exercises.length} ejercicios
          {workout.duration && ` • ${workout.duration} min`}
        </Text>
        <Badge variant="success">+{workout.xp} XP</Badge>
      </View>

      {/* Actions */}
      <View className="flex-row items-center gap-4">
        <Pressable onPress={onLike} className="flex-row items-center gap-1">
          <Ionicons name="heart-outline" size={20} color="#EF4444" />
          <Text className="text-gray-600 text-sm">{workout.likesCount}</Text>
        </Pressable>
        <View className="flex-row items-center gap-1">
          <Ionicons name="chatbubble-outline" size={20} color="#6B7280" />
          <Text className="text-gray-600 text-sm">{workout.commentsCount}</Text>
        </View>
      </View>
    </Pressable>
  );
}
```

### Screen Components

```tsx
// app/(tabs)/index.tsx - Home Screen
import { ScrollView, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WorkoutCard } from '@/components/features/WorkoutCard';
import { useWorkouts } from '@/hooks/useWorkouts';
import { FloatingActionButton } from '@/components/ui/FAB';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();
  const { workouts, isLoading, refetch } = useWorkouts();

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView
        className="flex-1 px-4"
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={refetch}
            tintColor="#10B981"
          />
        }
      >
        {workouts.map((workout) => (
          <WorkoutCard key={workout.id} workout={workout} />
        ))}
      </ScrollView>

      <FloatingActionButton
        icon="add"
        onPress={() => router.push('/workout/create')}
      />
    </SafeAreaView>
  );
}
```

---

## 🗄️ Manejo de Estado

### Zustand Stores

```typescript
// stores/authStore.ts
import { create } from 'zustand';
import { storage } from '@/services/storage/mmkv';

interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  xp: number;
  level: number;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  
  // Actions
  setAuth: (user: User, token: string) => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: storage.getString('accessToken') || null,
  isAuthenticated: false,

  setAuth: (user, token) => {
    storage.set('accessToken', token);
    storage.set('user', JSON.stringify(user));
    set({ user, accessToken: token, isAuthenticated: true });
  },

  logout: () => {
    storage.delete('accessToken');
    storage.delete('user');
    set({ user: null, accessToken: null, isAuthenticated: false });
  },

  updateUser: (updates) =>
    set((state) => ({
      user: state.user ? { ...state.user, ...updates } : null
    }))
}));
```

### Local State (React Hooks)

```tsx
// ✅ CORRECTO: useState para estado local de componente
const [isOpen, setIsOpen] = useState(false);
const [searchQuery, setSearchQuery] = useState('');

// ✅ CORRECTO: useReducer para estado complejo
const [state, dispatch] = useReducer(workoutFormReducer, initialState);

// ❌ INCORRECTO: Zustand para estado efímero de UI
const useModalStore = create((set) => ({ // NO hacer esto
  isOpen: false,
  toggle: () => set((s) => ({ isOpen: !s.isOpen }))
}));
```

---

## 🌐 Data Fetching

### React Query (TanStack Query)

```typescript
// hooks/useWorkouts.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { workoutAPI } from '@/services/api/workout.api';

export function useWorkouts() {
  return useQuery({
    queryKey: ['workouts'],
    queryFn: () => workoutAPI.list(),
    staleTime: 5 * 60 * 1000, // 5 minutos
  });
}

export function useWorkout(id: string) {
  return useQuery({
    queryKey: ['workout', id],
    queryFn: () => workoutAPI.getById(id),
    enabled: !!id
  });
}

export function useCreateWorkout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: workoutAPI.create,
    onSuccess: () => {
      // Invalidar cache para refetch
      queryClient.invalidateQueries({ queryKey: ['workouts'] });
    },
    onError: (error) => {
      // Manejo de errores
      console.error('Failed to create workout:', error);
    }
  });
}

// Uso en componente
export default function WorkoutList() {
  const { data: workouts, isLoading, error } = useWorkouts();
  const createMutation = useCreateWorkout();

  const handleCreate = (data: CreateWorkoutDTO) => {
    createMutation.mutate(data);
  };

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorView error={error} />;

  return <FlatList data={workouts} renderItem={...} />;
}
```

### API Client

```typescript
// services/api/client.ts
import axios from 'axios';
import { useAuthStore } from '@/stores/authStore';
import { storage } from '@/services/storage/mmkv';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor: añadir token
apiClient.interceptors.request.use((config) => {
  const token = storage.getString('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor: manejar errores
apiClient.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    if (error.response?.status === 401) {
      // Token expirado, intentar refresh
      try {
        const refreshToken = storage.getString('refreshToken');
        const { data } = await axios.post(`${API_URL}/auth/refresh`, {
          refreshToken
        });
        
        storage.set('accessToken', data.accessToken);
        
        // Reintentar request original
        error.config.headers.Authorization = `Bearer ${data.accessToken}`;
        return apiClient.request(error.config);
      } catch (refreshError) {
        // Refresh falló, logout
        useAuthStore.getState().logout();
        throw refreshError;
      }
    }
    
    throw error.response?.data || error;
  }
);
```

---

## 🎨 Styling con NativeWind

### Tailwind Config

```javascript
// tailwind.config.js
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        emerald: {
          50: '#ECFDF5',
          100: '#D1FAE5',
          200: '#A7F3D0',
          300: '#6EE7B7',
          400: '#34D399',
          500: '#10B981', // Primary
          600: '#059669',
          700: '#047857',
          800: '#065F46',
          900: '#064E3B'
        }
      },
      fontFamily: {
        'barlow-bold': ['Barlow-Bold'],
        'barlow-semibold': ['Barlow-SemiBold'],
        'barlow-medium': ['Barlow-Medium'],
        'inter-regular': ['Inter-Regular'],
        'inter-medium': ['Inter-Medium'],
        'inter-semibold': ['Inter-SemiBold']
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem'
      }
    }
  },
  plugins: []
};
```

### Styling Patterns

```tsx
// ✅ CORRECTO: Usar NativeWind classes
<View className="flex-1 bg-gray-50 px-4 py-6">
  <Text className="font-barlow-bold text-2xl text-gray-900 mb-4">
    Title
  </Text>
  <Button className="bg-emerald-500 px-6 py-3 rounded-xl shadow-md">
    Submit
  </Button>
</View>

// ✅ CORRECTO: Conditional classes con cn() utility
<View
  className={cn(
    'rounded-xl p-4',
    isActive ? 'bg-emerald-100' : 'bg-gray-100',
    hasError && 'border-2 border-red-500'
  )}
/>

// ✅ CORRECTO: Responsive (no muy común en mobile)
<Text className="text-base sm:text-lg md:text-xl">Text</Text>

// ❌ INCORRECTO: StyleSheet.create (solo para casos muy específicos)
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 } // Usar className en su lugar
});
```

### Dark Mode

```tsx
// Usar variant dark:
<View className="bg-white dark:bg-gray-900">
  <Text className="text-gray-900 dark:text-gray-50">
    Text
  </Text>
</View>

// Detectar tema del sistema
import { useColorScheme } from 'nativewind';

export default function App() {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  
  return (
    <View>
      <Text>Current theme: {colorScheme}</Text>
      <Button onPress={toggleColorScheme}>Toggle</Button>
    </View>
  );
}
```

---

## ✨ Animaciones

### Animated API

```tsx
import { Animated, Pressable } from 'react-native';
import { useRef } from 'react';

export function ScaleButton({ onPress, children }) {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.95,
      useNativeDriver: true // SIEMPRE true para transform
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true
    }).start();
  };

  return (
    <Pressable onPressIn={handlePressIn} onPressOut={handlePressOut} onPress={onPress}>
      <Animated.View style={{ transform: [{ scale }] }}>
        {children}
      </Animated.View>
    </Pressable>
  );
}
```

### Reanimated (para animaciones complejas)

```tsx
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

export function DraggableCard() {
  const translateX = useSharedValue(0);

  const gesture = Gesture.Pan()
    .onChange((event) => {
      translateX.value = event.translationX;
    })
    .onEnd(() => {
      translateX.value = withSpring(0);
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }]
  }));

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={animatedStyle}>
        <Text>Drag me!</Text>
      </Animated.View>
    </GestureDetector>
  );
}
```

### Lottie Animations

```tsx
import LottieView from 'lottie-react-native';

export function SuccessAnimation() {
  return (
    <LottieView
      source={require('@/assets/animations/success.json')}
      autoPlay
      loop={false}
      style={{ width: 200, height: 200 }}
    />
  );
}
```

---

## 📴 Offline-First

### MMKV Storage

```typescript
// services/storage/mmkv.ts
import { MMKV } from 'react-native-mmkv';

export const storage = new MMKV();

// Helpers
export const storageUtils = {
  setObject: (key: string, value: any) => {
    storage.set(key, JSON.stringify(value));
  },
  getObject: <T>(key: string): T | null => {
    const value = storage.getString(key);
    return value ? JSON.parse(value) : null;
  }
};
```

### Sync Queue

```typescript
// stores/syncStore.ts
import { create } from 'zustand';
import { storage } from '@/services/storage/mmkv';

interface PendingAction {
  id: string;
  type: 'CREATE_WORKOUT' | 'UPDATE_WORKOUT' | 'DELETE_WORKOUT';
  payload: any;
  timestamp: number;
}

interface SyncState {
  queue: PendingAction[];
  addToQueue: (action: Omit<PendingAction, 'id' | 'timestamp'>) => void;
  processSyncQueue: () => Promise<void>;
}

export const useSyncStore = create<SyncState>((set, get) => ({
  queue: [],

  addToQueue: (action) => {
    const newAction: PendingAction = {
      ...action,
      id: Date.now().toString(),
      timestamp: Date.now()
    };
    
    set((state) => ({ queue: [...state.queue, newAction] }));
    
    // Persist to MMKV
    const queue = get().queue;
    storage.set('syncQueue', JSON.stringify(queue));
  },

  processSyncQueue: async () => {
    const { queue } = get();
    
    for (const action of queue) {
      try {
        // Procesar según tipo
        if (action.type === 'CREATE_WORKOUT') {
          await workoutAPI.create(action.payload);
        }
        // Remover de queue si exitoso
        set((state) => ({
          queue: state.queue.filter((a) => a.id !== action.id)
        }));
      } catch (error) {
        console.error('Sync failed:', error);
        // Mantener en queue para reintentar
      }
    }
  }
}));

// Hook para detectar conexión y sincronizar
import NetInfo from '@react-native-community/netinfo';

export function useSyncOnConnection() {
  const processSyncQueue = useSyncStore((s) => s.processSyncQueue);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (state.isConnected) {
        processSyncQueue();
      }
    });

    return unsubscribe;
  }, []);
}
```

---

## ⚡ Performance

### Optimización de Listas

```tsx
import { FlashList } from '@shopify/flash-list';

// ✅ CORRECTO: Usar FlashList para listas largas
export function WorkoutList({ workouts }) {
  return (
    <FlashList
      data={workouts}
      renderItem={({ item }) => <WorkoutCard workout={item} />}
      estimatedItemSize={120} // Importante para performance
      keyExtractor={(item) => item.id}
    />
  );
}

// ❌ INCORRECTO: FlatList para listas muy largas (>100 items)
<FlatList data={workouts} renderItem={...} />
```

### Memoization

```tsx
import { memo, useMemo, useCallback } from 'react';

// ✅ Memoizar componentes pesados
export const WorkoutCard = memo(({ workout }) => {
  // ...
}, (prevProps, nextProps) => {
  return prevProps.workout.id === nextProps.workout.id;
});

// ✅ useMemo para cálculos costosos
const sortedWorkouts = useMemo(() => {
  return workouts.sort((a, b) => b.xp - a.xp);
}, [workouts]);

// ✅ useCallback para funciones pasadas como props
const handleLike = useCallback((id: string) => {
  likeMutation.mutate(id);
}, [likeMutation]);
```

### Image Optimization

```tsx
// ✅ CORRECTO: Lazy load con placeholder
import { Image } from 'expo-image';

<Image
  source={{ uri: workout.photo?.url }}
  placeholder={workout.photo?.blurhash}
  contentFit="cover"
  transition={300}
  style={{ width: '100%', height: 200 }}
/>

// ✅ Cache de imágenes
import { Image } from 'expo-image';

Image.clearDiskCache(); // Limpiar cache si es necesario
```

---

## 📛 Naming Conventions

### Files

```
// ✅ PascalCase para componentes
Button.tsx
WorkoutCard.tsx
AchievementsList.tsx

// ✅ camelCase para utils, hooks, services
useWorkouts.ts
formatDate.ts
workout.api.ts

// ✅ kebab-case para pantallas Expo Router
[id].tsx
create-workout.tsx
```

### Components

```tsx
// ✅ PascalCase, descriptivo
export function WorkoutCard() {}
export function UserProfileHeader() {}

// ❌ INCORRECTO
export function Card() {} // Demasiado genérico
export function workout_card() {} // snake_case
```

### Hooks

```tsx
// ✅ Prefijo "use"
export function useWorkouts() {}
export function useAuth() {}
export function useInfiniteScroll() {}
```

### Props

```tsx
// ✅ Sufijo "Props"
interface ButtonProps {}
interface WorkoutCardProps {}

// ✅ Handlers con prefijo "on"
onPress, onClick, onSubmit, onChange
```

---

## 🔒 Security Best Practices

- ✅ **Nunca almacenar passwords** en AsyncStorage/MMKV
- ✅ **Tokens en MMKV** (más seguro que AsyncStorage)
- ✅ **Validar inputs** antes de enviar al backend
- ✅ **HTTPS only** en producción
- ✅ **No logs de datos sensibles** en producción
- ✅ **Sanitizar URLs** de deep links
- ✅ **Verificar permisos** antes de acceder a cámara, fotos, etc.

---

**Última actualización**: Enero 23, 2026  
**Versión**: 1.0.0
