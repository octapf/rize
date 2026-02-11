# Decision Log - Architectural Decisions

> **Registro de decisiones**: Documenta por qué elegimos cada tecnología, patrón o arquitectura. Ayuda a la IA a entender el contexto y mantener consistencia.

---

## ADR Format

Cada decisión sigue este formato:
```
## ADR-XXX: [Título de la Decisión]
**Date**: YYYY-MM-DD
**Status**: Accepted | Deprecated | Superseded
**Decision**: [Qué decidimos]
**Context**: [Por qué era necesario decidir]
**Reasoning**: [Por qué elegimos esta opción]
**Alternatives**: [Qué más consideramos]
**Consequences**: [Implicaciones de la decisión]
```

---

## ADR-001: Feature-Based Backend Structure

**Date**: 2026-01-15  
**Status**: ✅ Accepted  

**Decision**: Organizamos el backend por features en lugar de capas técnicas.

**Context**: 
Necesitábamos una estructura que escalara bien a medida que agreguemos más funcionalidades. La estructura típica de MVC (models/, controllers/, services/) se vuelve difícil de mantener en proyectos grandes.

**Reasoning**:
- **Cohesión**: Todo lo relacionado a una feature está junto (controller + service + routes + tests)
- **Escalabilidad**: Agregar features nuevas no afecta código existente
- **Mantenibilidad**: Más fácil encontrar y modificar código relacionado
- **Testing**: Features aisladas son más fáciles de testear
- **Equipos**: Diferentes developers pueden trabajar en features sin conflictos

**Alternatives**:
1. MVC tradicional (models/, controllers/, services/)
2. Layered architecture (presentation/, business/, data/)

**Consequences**:
- ✅ Código más organizado y escalable
- ✅ Onboarding más fácil para nuevos developers
- ⚠️ Requiere disciplina para no crear dependencias entre features
- ⚠️ Algunos archivos (models) se duplican conceptualmente

**Implementation**:
```
backend/src/features/
├── auth/
├── workouts/
├── exercises/
└── social/
```

---

## ADR-002: React Query para Server State

**Date**: 2026-01-15  
**Status**: ✅ Accepted  

**Decision**: Usamos React Query (@tanstack/react-query) en lugar de Redux o Context API para manejar estado del servidor.

**Context**:
Necesitábamos una solución para manejar datos del backend (workouts, exercises, user stats) con cache, refetch automático y sincronización.

**Reasoning**:
- **Cache inteligente**: Automático, configurable, con invalidación granular
- **Refetch strategies**: Automático en focus, reconexión, interval
- **Loading/Error states**: Built-in, menos boilerplate
- **Optimistic updates**: Soporte nativo
- **DevTools**: Excelente debugging
- **Type safety**: TypeScript first-class support
- **Menos código**: ~70% menos boilerplate vs Redux

**Alternatives**:
1. Redux Toolkit + RTK Query
2. Context API + useReducer + fetch
3. SWR
4. Apollo Client (si usáramos GraphQL)

**Consequences**:
- ✅ Desarrollo más rápido (menos boilerplate)
- ✅ Mejor UX (loading/error states consistentes)
- ✅ Performance mejorada (cache automático)
- ⚠️ Curva de aprendizaje para conceptos de cache
- ⚠️ No apto para estado global complejo (usamos Zustand para eso)

**Example**:
```typescript
const { data, isLoading } = useQuery({
  queryKey: ['workouts', { limit: 20 }],
  queryFn: () => workoutsApi.getAll({ limit: 20 })
});
```

---

## ADR-003: Zod para Validation

**Date**: 2026-01-15  
**Status**: ✅ Accepted  

**Decision**: Usamos Zod para validación en backend y frontend.

**Context**:
Necesitábamos validar datos de entrada tanto en API (backend) como en formularios (frontend). Queríamos compartir lógica y tener type safety.

**Reasoning**:
- **Type inference**: Genera TypeScript types automáticamente
- **Schema sharing**: Mismo código en backend y frontend
- **Errores descriptivos**: Mensajes claros para usuarios
- **Composabilidad**: Schemas reutilizables y componibles
- **Runtime safety**: Validación en tiempo de ejecución

**Alternatives**:
1. Joi (solo backend)
2. Yup (más usado en frontend)
3. Class-validator + class-transformer
4. Manual validation

**Consequences**:
- ✅ Type safety end-to-end
- ✅ Menos duplicación de código
- ✅ Errores consistentes
- ⚠️ Bundle size ligeramente mayor en frontend
- ⚠️ Requiere aprender sintaxis de Zod

**Example**:
```typescript
const createWorkoutSchema = z.object({
  name: z.string().min(1, 'Nombre requerido'),
  exercises: z.array(exerciseSchema).min(1, 'Agrega al menos un ejercicio')
});

type CreateWorkoutInput = z.infer<typeof createWorkoutSchema>;
```

---

## ADR-004: Zustand para Client State

**Date**: 2026-01-15  
**Status**: ✅ Accepted  

**Decision**: Usamos Zustand para estado global del cliente (auth, theme, preferences).

**Context**:
React Query maneja server state, pero necesitamos algo ligero para estado que NO viene del servidor (usuario logueado, tema, settings).

**Reasoning**:
- **Minimalista**: ~1KB, API super simple
- **No boilerplate**: Sin actions, reducers, providers
- **Type safe**: TypeScript nativo
- **DevTools**: Soporte para debugging
- **Performance**: Re-renders mínimos, selectores eficientes
- **Persistence**: Fácil integración con AsyncStorage

**Alternatives**:
1. Context API (más verbose, re-renders)
2. Redux Toolkit (overkill para client state)
3. Jotai / Recoil (más complejos)

**Consequences**:
- ✅ Desarrollo rápido
- ✅ Menos bugs por simplicidad
- ✅ Performance óptima
- ⚠️ No tiene time-travel debugging como Redux
- ⚠️ Menos estructurado (requiere disciplina)

**Example**:
```typescript
const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: async (credentials) => {
    const data = await authApi.login(credentials);
    set({ user: data.user, isAuthenticated: true });
  }
}));
```

---

## ADR-005: Expo + React Native Web

**Date**: 2026-01-15  
**Status**: ✅ Accepted  

**Decision**: Usamos Expo como framework principal con soporte para web vía React Native Web.

**Context**:
Queríamos app mobile (iOS + Android) con posibilidad de web. Necesitábamos desarrollo rápido sin sacrificar native features.

**Reasoning**:
- **Cross-platform**: iOS + Android + Web con mismo código
- **Developer Experience**: Fast Refresh, DevTools, EAS
- **Native APIs**: Notificaciones, cámara, biometrics via Expo modules
- **OTA Updates**: Deploy sin app store
- **Build cloud**: EAS Build, no necesitamos Xcode/Android Studio local
- **Community**: Gran ecosistema, muchos packages

**Alternatives**:
1. React Native bare workflow (más control, más complejo)
2. Flutter (diferente lenguaje)
3. Ionic/Capacitor (web-first)
4. Apps nativas separadas (más trabajo)

**Consequences**:
- ✅ Desarrollo 3x más rápido
- ✅ Single codebase para 3 plataformas
- ✅ Hot reload, mejor DX
- ⚠️ Bundle size mayor que native puro
- ⚠️ Algunas native features requieren custom modules
- ⚠️ Web no tiene todas las features mobile (ej: useNativeDriver)

---

## ADR-006: Tailwind CSS (NativeWind)

**Date**: 2026-01-15  
**Status**: ✅ Accepted  

**Decision**: Usamos Tailwind CSS via NativeWind para estilos en React Native.

**Context**:
Necesitábamos sistema de estilos consistente, rápido de escribir, con dark mode y responsive.

**Reasoning**:
- **Velocity**: Estilos inline super rápidos
- **Consistency**: Design system via tailwind.config.js
- **Dark mode**: Built-in con `dark:` prefix
- **Responsive**: Breakpoints consistentes
- **No CSS-in-JS runtime**: Compilado en build time
- **Intellisense**: Autocompletado en VSCode

**Alternatives**:
1. StyleSheet nativo de RN
2. Styled Components
3. Emotion
4. Tamagui

**Consequences**:
- ✅ Desarrollo de UI 5x más rápido
- ✅ Menos archivos de estilos
- ✅ Dark mode trivial
- ⚠️ Clases largas pueden ser difíciles de leer
- ⚠️ Tailwind no cubre 100% de RN styles (ej: transforms complejos)

**Example**:
```tsx
<View className="flex-1 bg-white dark:bg-gray-900 p-4">
  <Text className="font-heading-bold text-2xl text-primary">
    Hello
  </Text>
</View>
```

---

## ADR-007: Mongoose para MongoDB ODM

**Date**: 2026-01-15  
**Status**: ✅ Accepted  

**Decision**: Usamos Mongoose como ODM para MongoDB.

**Context**:
Necesitábamos interactuar con MongoDB de forma estructurada, con validaciones y type safety.

**Reasoning**:
- **Schema validation**: Validación a nivel de DB
- **Type safety**: TypeScript interfaces
- **Middleware**: Hooks pre/post save
- **Virtuals**: Campos computados
- **Population**: Joins simplificados
- **Plugins**: Extensibilidad (ej: timestamps, soft delete)

**Alternatives**:
1. MongoDB driver nativo (menos features)
2. Prisma (mejor DX pero menos flexible)
3. TypeORM (más SQL-oriented)

**Consequences**:
- ✅ Código más seguro con validaciones
- ✅ Queries más expresivas
- ✅ Ecosystem maduro
- ⚠️ Overhead ligero vs driver nativo
- ⚠️ Algunos edge cases complejos

---

## ADR-008: JWT para Autenticación

**Date**: 2026-01-15  
**Status**: ✅ Accepted  

**Decision**: Usamos JWT (JSON Web Tokens) para autenticación stateless.

**Context**:
Necesitábamos autenticar requests a la API de forma escalable y sin estado en servidor.

**Reasoning**:
- **Stateless**: No necesitamos sessions en DB
- **Scalable**: Fácil balanceo de carga
- **Mobile-friendly**: Token se guarda en AsyncStorage
- **Expiration**: Control de tiempo de vida
- **Refresh tokens**: Para renovar acceso sin re-login

**Alternatives**:
1. Sessions en DB (más seguro pero menos escalable)
2. OAuth (overkill para MVP)
3. Cookies (menos flexible en mobile)

**Consequences**:
- ✅ Arquitectura simple y escalable
- ✅ Funciona bien en mobile
- ⚠️ Tokens no se pueden revocar fácilmente (usamos refresh token rotation)
- ⚠️ Payload visible (no almacenar datos sensibles)

**Implementation**:
```typescript
// Access token: 15 minutos
// Refresh token: 7 días
// Rotation en cada refresh
```

---

## ADR-009: Async/Await sobre Promises

**Date**: 2026-01-15  
**Status**: ✅ Accepted  

**Decision**: Usamos async/await en lugar de .then() chains.

**Context**:
Necesitábamos manejar código asíncrono de forma legible y mantenible.

**Reasoning**:
- **Legibilidad**: Código se lee como síncrono
- **Error handling**: try/catch más intuitivo que .catch()
- **Debugging**: Stack traces más claros
- **Type safety**: Mejor inferencia de tipos

**Alternatives**:
1. Promise chains (.then/.catch)
2. Callbacks (callback hell)

**Consequences**:
- ✅ Código más limpio
- ✅ Menos bugs por manejo de errores
- ⚠️ Requiere funciones async (no siempre conveniente)

---

## ADR-010: Feature Flags (Future)

**Date**: TBD  
**Status**: 🔄 Proposed  

**Decision**: Implementar feature flags para releases graduales.

**Context**:
Queremos poder desplegar features en producción sin activarlas para todos los usuarios inmediatamente.

**Reasoning**:
- **Safe rollouts**: Activar features para % de usuarios
- **A/B testing**: Probar diferentes versiones
- **Kill switch**: Desactivar features con bugs sin deploy
- **Development**: Desarrollar features sin afectar producción

**Alternatives**:
1. Branch-based releases (más lento)
2. Manual feature toggles en DB (menos flexible)

**Implementation Plan**:
```typescript
// Servicio: LaunchDarkly, Unleash, o custom
if (featureFlags.isEnabled('new-workout-builder', userId)) {
  return <NewWorkoutBuilder />;
}
return <OldWorkoutBuilder />;
```

---

## How to Use This Log

**Para developers**:
- Lee este doc para entender **por qué** elegimos cada tech
- Consulta antes de proponer cambios arquitectónicos
- Actualiza cuando hagas decisiones importantes

**Para IA**:
- Usa este contexto para generar código consistente
- Respeta las decisiones tomadas
- Sugiere mejoras basadas en estos principios

**Template para nueva decisión**:
```markdown
## ADR-XXX: [Título]
**Date**: YYYY-MM-DD
**Status**: 🔄 Proposed | ✅ Accepted | ❌ Rejected | ⏸️ Deprecated
**Decision**: [Qué]
**Context**: [Por qué necesario]
**Reasoning**: [Por qué esta opción]
**Alternatives**: [Qué más consideramos]
**Consequences**: [Pros/Cons]
```
