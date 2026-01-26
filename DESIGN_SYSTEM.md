# Design System - RIZE

> **Sistema de diseño completo**: Este documento define todos los tokens visuales, componentes UI, animaciones y patrones de interacción. Basado en las 50 rondas de decisiones UI/UX (rondas 151-200).

## 📋 Tabla de Contenidos

- [Branding](#branding)
- [Colores](#colores)
- [Tipografía](#tipografía)
- [Espaciado](#espaciado)
- [Componentes UI](#componentes-ui)
- [Animaciones](#animaciones)
- [Iconografía](#iconografía)
- [Patrones de Interacción](#patrones-de-interacción)

---

## 🎨 Branding

### Identidad

- **Nombre**: RIZE
- **Concepto**: Levántate, sube de nivel, elévate
- **Personalidad**: Motivacional, auténtico, accesible, sin intimidación
- **Tono de voz**: Directo, alentador, técnico cuando necesario

### Logo

```
 ██████╗ ██╗███████╗███████╗
 ██╔══██╗██║╚══███╔╝██╔════╝
 ██████╔╝██║  ███╔╝ █████╗  
 ██╔══██╗██║ ███╔╝  ██╔══╝  
 ██║  ██║██║███████╗███████╗
 ╚═╝  ╚═╝╚═╝╚══════╝╚══════╝
```

- **Primary mark**: Wordmark en Barlow Bold
- **Icono**: R estilizada con flecha ascendente integrada
- **Uso**: Logo completo en splash screen, icono solo en app icon

---

## 🎨 Colores

### Paleta Principal

```typescript
export const colors = {
  // Primary (Emerald)
  primary: {
    50: '#ECFDF5',
    100: '#D1FAE5',
    200: '#A7F3D0',
    300: '#6EE7B7',
    400: '#34D399',
    500: '#10B981', // ← PRIMARIO
    600: '#059669',
    700: '#047857',
    800: '#065F46',
    900: '#064E3B',
  },

  // Functional Colors
  success: '#10B981', // Mismo que primary
  warning: '#F59E0B', // Amber 500
  error: '#EF4444',   // Red 500
  info: '#3B82F6',    // Blue 500

  // Neutrals (Gray)
  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },

  // Semantic Tokens
  background: {
    light: '#FFFFFF',
    lightAlt: '#F9FAFB', // gray-50
    dark: '#111827',     // gray-900
    darkAlt: '#1F2937',  // gray-800
  },

  text: {
    light: {
      primary: '#111827',   // gray-900
      secondary: '#6B7280', // gray-500
      tertiary: '#9CA3AF',  // gray-400
    },
    dark: {
      primary: '#F9FAFB',   // gray-50
      secondary: '#9CA3AF', // gray-400
      tertiary: '#6B7280',  // gray-500
    }
  }
};
```

### Dark Mode Adaptaciones

```typescript
// Ajustes automáticos en dark mode
export const darkModeAdjustments = {
  // Primary más brillante en dark
  primary: '#34D399', // emerald-400 (vs 500 en light)
  
  // Reducir saturación de funcionales
  warning: '#FBBF24', // amber-400 (vs 500 en light)
  
  // Sombras más pronunciadas
  shadow: {
    sm: '0 2px 8px rgba(0, 0, 0, 0.5)',
    md: '0 4px 16px rgba(0, 0, 0, 0.6)',
    lg: '0 8px 24px rgba(0, 0, 0, 0.7)',
  }
};
```

### Uso de Colores

```tsx
// ✅ CORRECTO: Usar semantic tokens
<View className="bg-background-light dark:bg-background-dark">
  <Text className="text-text-light-primary dark:text-text-dark-primary">
    Title
  </Text>
</View>

// ❌ INCORRECTO: Hardcodear valores hex
<View style={{ backgroundColor: '#FFFFFF' }}>
  <Text style={{ color: '#000000' }}>Title</Text>
</View>
```

---

## ✍️ Tipografía

### Fuentes

```typescript
export const fonts = {
  // Headings
  barlow: {
    bold: 'Barlow-Bold',        // 700 - Títulos principales
    semibold: 'Barlow-SemiBold', // 600 - Subtítulos
    medium: 'Barlow-Medium',     // 500 - Labels destacados
  },

  // Body
  inter: {
    semibold: 'Inter-SemiBold',  // 600 - Énfasis
    medium: 'Inter-Medium',      // 500 - Labels
    regular: 'Inter-Regular',    // 400 - Texto general
  }
};
```

### Escala Tipográfica

```typescript
// Escala modular 1.25 (Major Third)
export const typography = {
  display: {
    fontSize: 40,
    lineHeight: 48,    // 1.2
    fontFamily: fonts.barlow.bold,
    letterSpacing: -0.5,
  },

  h1: {
    fontSize: 32,
    lineHeight: 38,
    fontFamily: fonts.barlow.bold,
    letterSpacing: -0.5,
  },

  h2: {
    fontSize: 25,
    lineHeight: 30,
    fontFamily: fonts.barlow.semibold,
    letterSpacing: -0.3,
  },

  h3: {
    fontSize: 20,
    lineHeight: 24,
    fontFamily: fonts.barlow.medium,
    letterSpacing: 0,
  },

  body: {
    fontSize: 16,
    lineHeight: 24,    // 1.5
    fontFamily: fonts.inter.regular,
    letterSpacing: 0,
  },

  small: {
    fontSize: 14,
    lineHeight: 20,    // 1.4
    fontFamily: fonts.inter.regular,
    letterSpacing: 0.1,
  },

  tiny: {
    fontSize: 12,
    lineHeight: 16,
    fontFamily: fonts.inter.medium,
    letterSpacing: 0.2,
  },

  label: {
    fontSize: 12,
    lineHeight: 16,
    fontFamily: fonts.inter.medium,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  }
};
```

### Uso en NativeWind

```tsx
// ✅ CORRECTO: Usar clases predefinidas
<Text className="font-barlow-bold text-2xl">Título</Text>
<Text className="font-inter-regular text-base">Cuerpo</Text>

// Configurar en tailwind.config.js:
module.exports = {
  theme: {
    extend: {
      fontSize: {
        'display': '40px',
        '2xl': '32px',
        'xl': '25px',
        'lg': '20px',
        'base': '16px',
        'sm': '14px',
        'xs': '12px',
      }
    }
  }
};
```

---

## 📏 Espaciado

### Sistema Base-8

```typescript
// Todos los espacios son múltiplos de 4px
export const spacing = {
  0: 0,
  1: 4,   // xs
  2: 8,   // sm
  3: 12,
  4: 16,  // md (base)
  5: 20,
  6: 24,  // lg
  7: 28,
  8: 32,  // xl
  10: 40,
  12: 48, // 2xl
  16: 64,
  20: 80,
  24: 96,
};
```

### Grid System

```typescript
// 4 columnas con gaps de 16px
export const grid = {
  columns: 4,
  gutter: 16,
  margin: 16,
};

// Ejemplo: Card ocupa 4 columnas (full-width)
// Button ocupa 2 columnas (50%)
```

### Uso

```tsx
// ✅ Padding y margin con sistema base-8
<View className="p-4">        {/* 16px */}
  <Text className="mb-6">    {/* 24px */}
    Title
  </Text>
  <View className="gap-2">   {/* 8px entre hijos */}
    <Button />
    <Button />
  </View>
</View>

// ❌ INCORRECTO: Valores arbitrarios
<View style={{ padding: 13, margin: 19 }}>
```

---

## 🧩 Componentes UI

### Button

```tsx
// Variantes
<Button variant="primary">Guardar</Button>
<Button variant="secondary">Cancelar</Button>
<Button variant="destructive">Eliminar</Button>
<Button variant="ghost">Más</Button>

// Tamaños
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>  {/* Default */}
<Button size="lg">Large</Button>

// Estados
<Button loading>Guardando...</Button>
<Button disabled>No disponible</Button>
```

**Specs**:
- Border radius: `12px` (rounded-xl)
- Padding SM: `8px 16px`
- Padding MD: `12px 24px`
- Padding LG: `16px 32px`
- Shadow: `shadow-md` solo en primary
- Pressed state: Opacity `0.9` + scale `0.95`

### Input

```tsx
<Input
  label="Email"
  placeholder="tu@email.com"
  error="Email inválido"
  leftIcon={<Ionicons name="mail-outline" />}
/>
```

**Specs**:
- Border: `1px` solid `gray-300`
- Border radius: `12px`
- Padding: `12px 16px`
- Focus: Border `emerald-500`, ring `4px` `emerald-200`
- Error: Border `red-500`, ring `red-200`

### Card

```tsx
<Card>
  <CardHeader>
    <CardTitle>Título</CardTitle>
    <CardSubtitle>Subtítulo</CardSubtitle>
  </CardHeader>
  <CardContent>
    Contenido
  </CardContent>
  <CardActions>
    <Button>Acción</Button>
  </CardActions>
</Card>
```

**Specs**:
- Background: `white` / `gray-800` (dark)
- Border radius: `16px` (rounded-2xl)
- Padding: `16px`
- Shadow: `shadow-sm`
- Hover: `shadow-md` (web)

### Avatar

```tsx
<Avatar size="xs" src={url} />    {/* 24px */}
<Avatar size="sm" src={url} />    {/* 32px */}
<Avatar size="md" src={url} />    {/* 48px */}
<Avatar size="lg" src={url} />    {/* 80px */}
<Avatar size="xl" src={url} />    {/* 120px */}

{/* Fallback con iniciales */}
<Avatar size="md" fallback="JD" />
```

**Specs**:
- Shape: `rounded-full`
- Border: `2px` `white` / `gray-800` (dark)
- Placeholder: Iniciales en bg `emerald-500`, texto `white`

### Badge

```tsx
<Badge variant="success">+120 XP</Badge>
<Badge variant="warning">Pendiente</Badge>
<Badge variant="error">Error</Badge>
<Badge variant="info">Nuevo</Badge>
<Badge variant="neutral">Draft</Badge>
```

**Specs**:
- Shape: `rounded-full`
- Padding: `4px 12px`
- Font size: `12px` medium
- Success: bg `emerald-100`, text `emerald-700`
- Warning: bg `amber-100`, text `amber-700`

### Modal

```tsx
<Modal visible={isOpen} onClose={close}>
  <ModalHeader>
    <ModalTitle>Título</ModalTitle>
    <ModalClose />
  </ModalHeader>
  <ModalContent>
    Contenido
  </ModalContent>
</Modal>
```

**Specs**:
- Backdrop: `bg-black/50` con blur
- Modal: Slide up from bottom con bounce
- Border radius: `24px` solo top (rounded-t-3xl)
- Gesture: Swipe down para cerrar (threshold 100px)
- Animation: `300ms` easeOutCubic

---

## ✨ Animaciones

### Duraciones

```typescript
export const durations = {
  instant: 100,   // Feedback inmediato
  fast: 200,      // Transiciones rápidas
  base: 300,      // Duración estándar
  slow: 500,      // Animaciones complejas
  slower: 700,    // Efectos dramáticos
};
```

### Easings

```typescript
export const easings = {
  easeIn: [0.4, 0, 1, 1],
  easeOut: [0, 0, 0.2, 1],      // ← Default para exits
  easeInOut: [0.4, 0, 0.2, 1],  // ← Default para movements
  spring: { friction: 3, tension: 40 }
};
```

### Patrones de Animación

#### Button Press

```tsx
const scale = useRef(new Animated.Value(1)).current;

const handlePressIn = () => {
  Animated.spring(scale, {
    toValue: 0.95,
    useNativeDriver: true
  }).start();
};

const handlePressOut = () => {
  Animated.spring(scale, {
    toValue: 1,
    friction: 3,
    useNativeDriver: true
  }).start();
};
```

#### Modal Slide Up

```tsx
const translateY = useSharedValue(500);

useEffect(() => {
  if (visible) {
    translateY.value = withSpring(0, { damping: 15 });
  }
}, [visible]);
```

#### Like Animation

```tsx
// 1. Scale heart 1 → 1.3 → 1
// 2. Color gray → red
// 3. Particle burst (3-4 mini hearts)
// 4. Haptic medium impact
// 5. Counter increment con roll animation
```

#### Loading Skeleton

```tsx
// Shimmer effect: Gradient animado
const shimmer = useRef(new Animated.Value(0)).current;

useEffect(() => {
  Animated.loop(
    Animated.timing(shimmer, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true
    })
  ).start();
}, []);

const translateX = shimmer.interpolate({
  inputRange: [0, 1],
  outputRange: [-200, 200]
});
```

### Micro-interacciones

| Acción | Animación | Duración | Haptic |
|--------|-----------|----------|--------|
| Button tap | Scale 0.95 | 200ms | Light |
| Like | Scale 1.3 + particles | 400ms | Medium |
| Success | Checkmark draw | 500ms | Success |
| Error | Shake horizontal | 300ms | Error |
| Pull refresh | Spinner rotate | Continuo | None |
| Tab switch | Icon scale 1.2 | 300ms | Selection |

---

## 🎯 Iconografía

### Sistema de Iconos

**Librería exclusiva**: `@expo/vector-icons` (Ionicons)

```tsx
import { Ionicons } from '@expo/vector-icons';

// ✅ CORRECTO: Usar Ionicons
<Ionicons name="heart-outline" size={24} color="#EF4444" />

// ❌ INCORRECTO: Mezclar librerías
<MaterialIcons name="favorite" />
```

### Tamaños

```typescript
export const iconSizes = {
  xs: 16,  // Inline con texto
  sm: 20,  // Botones pequeños
  md: 24,  // Estándar (botones, inputs)
  lg: 32,  // Feature icons
  xl: 48,  // Ilustraciones, empty states
};
```

### Estilo

- **Default**: `outline` (más limpio)
- **Active state**: `filled` (tab seleccionado, toggle on)
- **Color**: Heredar del padre cuando sea posible

### Iconos por Feature

```typescript
export const icons = {
  // Navigation
  home: 'home-outline',
  stats: 'stats-chart-outline',
  social: 'people-outline',
  profile: 'person-outline',

  // Actions
  add: 'add',
  edit: 'create-outline',
  delete: 'trash-outline',
  share: 'share-social-outline',
  like: 'heart-outline',
  liked: 'heart', // filled
  comment: 'chatbubble-outline',

  // Categories
  push: '🔴', // Emoji como fallback
  pull: '🔵',
  legs: '🟢',
  core: '🟡',
  skills: '🟣',
};
```

---

## 🖱️ Patrones de Interacción

### Gestos

#### Swipe

```tsx
// Swipe left en workout card → Eliminar
<GestureDetector gesture={swipeGesture}>
  <Animated.View>
    <WorkoutCard />
  </Animated.View>
</GestureDetector>

// Reveal: Fondo rojo con icono basura
// Threshold: 50% del ancho para confirmar
// Feedback: Haptic warning
```

#### Long Press

```tsx
// Long press en workout card → Menú contextual
<Pressable
  onLongPress={showContextMenu}
  delayLongPress={500}
>
  <WorkoutCard />
</Pressable>

// Menu: Bottom sheet con opciones (Editar, Eliminar, Compartir)
```

#### Pull to Refresh

```tsx
<ScrollView
  refreshControl={
    <RefreshControl
      refreshing={isLoading}
      onRefresh={refetch}
      tintColor="#10B981"
    />
  }
>
```

#### Pinch to Zoom (Fotos)

```tsx
import { GestureDetector, Gesture } from 'react-native-gesture-handler';

const pinchGesture = Gesture.Pinch()
  .onUpdate((e) => {
    scale.value = e.scale;
  });
```

### Feedback

#### Haptic

```tsx
import * as Haptics from 'expo-haptics';

// Light: Button tap, selección
Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

// Medium: Like, follow
Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

// Heavy: Completar workout, logro desbloqueado
Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);

// Success: Guardado exitoso
Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

// Error: Validación fallida
Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
```

#### Visual

```tsx
// Pressed state
style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}

// Focus state (accesibilidad)
className="focus:ring-2 focus:ring-emerald-500"

// Disabled state
className="disabled:opacity-50 disabled:cursor-not-allowed"
```

### Loading States

#### Spinner

```tsx
import { ActivityIndicator } from 'react-native';

<ActivityIndicator size="large" color="#10B981" />
```

#### Skeleton Screen

```tsx
<View className="bg-gray-200 rounded-xl h-20 w-full animate-pulse" />
```

#### Progress Bar

```tsx
// Para uploads
<View className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
  <View
    className="h-full bg-emerald-500"
    style={{ width: `${progress}%` }}
  />
</View>
```

### Empty States

```tsx
<View className="flex-1 items-center justify-center p-8">
  <Ionicons name="barbell-outline" size={64} color="#9CA3AF" />
  <Text className="font-barlow-semibold text-xl text-gray-900 mt-4">
    Sin workouts aún
  </Text>
  <Text className="font-inter-regular text-base text-gray-500 text-center mt-2">
    ¡Registra tu primer entrenamiento y comienza a subir de nivel!
  </Text>
  <Button className="mt-6" onPress={navigateToCreate}>
    Crear Workout
  </Button>
</View>
```

### Error States

```tsx
<View className="flex-1 items-center justify-center p-8">
  <Ionicons name="cloud-offline-outline" size={64} color="#EF4444" />
  <Text className="font-barlow-semibold text-xl text-gray-900 mt-4">
    Sin conexión
  </Text>
  <Text className="font-inter-regular text-base text-gray-500 text-center mt-2">
    Verifica tu conexión a internet e intenta de nuevo
  </Text>
  <Button className="mt-6" onPress={retry}>
    Reintentar
  </Button>
</View>
```

---

## 📱 Responsive Patterns

### Breakpoints (para tablet/web futuro)

```typescript
export const breakpoints = {
  sm: 640,   // Mobile landscape
  md: 768,   // Tablet portrait
  lg: 1024,  // Tablet landscape
  xl: 1280,  // Desktop
};
```

### Safe Areas

```tsx
import { SafeAreaView } from 'react-native-safe-area-context';

// ✅ CORRECTO: Usar SafeAreaView
<SafeAreaView className="flex-1">
  <Content />
</SafeAreaView>

// ❌ INCORRECTO: View normal (contenido bajo notch)
<View className="flex-1">
```

---

## ♿ Accesibilidad

### Contraste

- **Texto normal**: Mínimo 4.5:1 (WCAG AA)
- **Texto grande**: Mínimo 3:1
- **UI components**: Mínimo 3:1

### Touch Targets

- **Mínimo**: 44×44px (iOS HIG)
- **Óptimo**: 48×48px

### Labels

```tsx
// ✅ CORRECTO: Accessibility labels
<Pressable
  accessible={true}
  accessibilityLabel="Dar me gusta"
  accessibilityRole="button"
  accessibilityState={{ checked: isLiked }}
>
  <Ionicons name={isLiked ? 'heart' : 'heart-outline'} />
</Pressable>

// ✅ Imágenes
<Image
  source={{ uri }}
  accessible={true}
  accessibilityLabel="Foto de workout de usuario"
/>
```

---

**Última actualización**: Enero 23, 2026  
**Versión**: 1.0.0
