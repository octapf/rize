# Design System - RIZE

> **Sistema de diseño completo**: Este documento define todos los tokens visuales, componentes UI, animaciones y patrones de interacción.
>
> **Fuente de verdad**: `mobile/tailwind.config.js` — Cualquier cambio visual debe reflejarse primero allí y luego en este documento.

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

- **Primary mark**: Wordmark en Poppins Bold
- **Icono**: R estilizada con flecha ascendente integrada
- **Uso**: Logo completo en splash screen, icono solo en app icon

---

## 🎨 Colores

> **Definido en**: `mobile/tailwind.config.js`

### Paleta Principal (Dark-First)

```typescript
// Tokens en tailwind.config.js
export const colors = {
  background: '#262626',   // ← FONDO PRINCIPAL
  text: '#E3E3E3',        // ← TEXTO PRINCIPAL
  primary: '#9D12DE',     // ← PURPLE (acciones, CTAs)
  highlight: '#FFEA00',   // ← YELLOW (acento, destacados)

  // Aliases
  surface: '#262626',     // = background
  accent: '#FFEA00',      // = highlight

  // Glass (overlays, modales)
  glass: {
    10: 'rgba(255, 255, 255, 0.1)',
    20: 'rgba(255, 255, 255, 0.2)',
    30: 'rgba(255, 255, 255, 0.3)',
  },

  // Functional (semantic)
  success: '#10B981',  // verde success
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',
};
```

### Uso de Colores

```tsx
// ✅ CORRECTO: Usar tokens de Tailwind
<View className="bg-background">
  <Text className="text-text">Title</Text>
  <View className="bg-primary">
    <Text className="text-highlight">Destacado</Text>
  </View>
</View>

// Glass (modales, overlays)
<View className="bg-glass-20" />

// ❌ INCORRECTO: Hardcodear valores hex
<View style={{ backgroundColor: '#FFFFFF' }}>
  <Text style={{ color: '#000000' }}>Title</Text>
</View>
```

---

## ✍️ Tipografía

> **Definido en**: `mobile/tailwind.config.js` → `fontFamily`

### Fuentes

```typescript
export const fonts = {
  // Headings (Poppins)
  heading: 'Poppins_700Bold',
  headingSemibold: 'Poppins_600SemiBold',

  // Body (Inter)
  body: 'Inter_400Regular',
  bodyMedium: 'Inter_500Medium',
  bodySemibold: 'Inter_600SemiBold',

  // Labels (Montserrat)
  label: 'Montserrat_500Medium',
  labelBold: 'Montserrat_600SemiBold',
};
```

### Escala Tipográfica

Usar las fuentes anteriores con tamaños estándar (`text-2xl`, `text-lg`, `text-base`, etc.) según `tailwind.config.js`.

### Uso en NativeWind

```tsx
// ✅ CORRECTO: Usar clases predefinidas
<Text className="font-heading text-2xl">Título</Text>
<Text className="font-body text-base">Cuerpo</Text>
<Text className="font-label text-xs uppercase">Label</Text>

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
- Focus: Border `primary`, ring `4px` `primary/30`
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
- Background: `bg-surface` / `bg-background` (dark-first)
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
- Placeholder: Iniciales en bg `primary`, texto `white`

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
- Success: bg `primary/20`, text `primary`
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
      tintColor="#9D12DE"
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
className="focus:ring-2 focus:ring-primary"

// Disabled state
className="disabled:opacity-50 disabled:cursor-not-allowed"
```

### Loading States

#### Spinner

```tsx
import { ActivityIndicator } from 'react-native';

<ActivityIndicator size="large" color="#9D12DE" />
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
    className="h-full bg-primary"
    style={{ width: `${progress}%` }}
  />
</View>
```

### Empty States

```tsx
<View className="flex-1 items-center justify-center p-8">
  <Ionicons name="barbell-outline" size={64} color="#9CA3AF" />
  <Text className="font-heading-semibold text-xl text-text mt-4">
    Sin workouts aún
  </Text>
  <Text className="font-body text-base text-text/80 text-center mt-2">
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
  <Text className="font-heading-semibold text-xl text-text mt-4">
    Sin conexión
  </Text>
  <Text className="font-body text-base text-text/80 text-center mt-2">
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
