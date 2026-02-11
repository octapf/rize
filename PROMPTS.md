# Common Prompts - Copy/Paste Ready

> **Prompts optimizados para IA**: Templates pre-escritos para tareas comunes. Copia, adapta y úsalos.

---

## 📋 Table of Contents

- [Backend Prompts](#backend-prompts)
- [Frontend Prompts](#frontend-prompts)
- [Database Prompts](#database-prompts)
- [Testing Prompts](#testing-prompts)
- [Debugging Prompts](#debugging-prompts)
- [Refactoring Prompts](#refactoring-prompts)

---

## Backend Prompts

### Crear Feature CRUD Completo

```
Implementa un feature CRUD completo para "[EntityName]" siguiendo:

**Backend**:
- Modelo en `backend/src/models/[Entity].ts` con campos:
  - userId (ObjectId ref User, required, indexed)
  - [field1] (string, required)
  - [field2] (number, default 0)
  - isActive (boolean, default true)
  - timestamps

- Service en `backend/src/features/[entity]/[entity].service.ts`:
  - create(userId, data)
  - getAll(userId, query) con paginación
  - getById(id, userId)
  - update(id, userId, data)
  - delete(id, userId)

- Controller en `backend/src/features/[entity]/[entity].controller.ts`
- Routes en `backend/src/features/[entity]/[entity].routes.ts`
- Validation con Zod en `backend/src/features/[entity]/[entity].validation.ts`

**Patrones**:
- Sigue CODE_PATTERNS.md
- Usa asyncHandler y custom errors
- Todas las rutas requieren authMiddleware
- Response format: { success: true, data: ... }

**Tests**:
- Unit tests en [entity].test.ts
- Integration tests en __tests__/[entity].integration.test.ts
```

### Agregar Endpoint Simple

```
Crea un endpoint [METHOD] /api/v1/[path] que:
- [Descripción de funcionalidad]
- Reciba en body: { [field1], [field2] }
- Valide con Zod: [validaciones específicas]
- Requiera autenticación
- Retorne status [code] con { success: true, data: [...] }
- Siga los patrones de BACKEND_STANDARDS.md
```

### Agregar Campo a Modelo Existente

```
Agrega el campo "[fieldName]" al modelo [Entity] en backend/src/models/[Entity].ts:
- Tipo: [type]
- Required: [yes/no]
- Default: [value]
- Index: [yes/no]
- Validation: [reglas]

También actualiza:
- TypeScript interface I[Entity]
- Validation schema en [entity].validation.ts
- Service methods si es necesario
```

### Implementar Relación entre Modelos

```
Implementa una relación entre [Model1] y [Model2]:
- [Model1] tiene [relationship type] con [Model2]
- Campo en [Model1]: [field] (ObjectId ref '[Model2]')
- Populate en queries que necesiten datos de [Model2]
- Actualiza interfaces TypeScript
```

### Agregar Middleware Personalizado

```
Crea un middleware en backend/src/middleware/[name].middleware.ts que:
- [Descripción de funcionalidad]
- Valide [condición]
- Lance [ErrorType] si falla
- Adjunte [data] a req.[field]
- Siga el patrón de asyncHandler
```

---

## Frontend Prompts

### Crear Pantalla con Lista

```
Crea la pantalla mobile/app/[folder]/[screen].tsx que:
- Use el hook use[Entities]() para cargar datos con query { limit: 20 }
- Muestre un FlatList con:
  - renderItem usando <[Entity]Card />
  - onRefresh y refreshing states
  - LoadingSpinner mientras isLoading
  - ErrorView si hay error
  - EmptyState si no hay datos
- Use SafeAreaView con className "flex-1 bg-white dark:bg-gray-900"
- Siga FRONTEND_STANDARDS.md
```

### Crear Formulario CRUD

```
Crea un formulario en mobile/app/[folder]/[action].tsx con:
- Campos: [field1], [field2], [field3]
- Validación local antes de submit
- useMutation para llamar a [entity]Api.[method]()
- onSuccess: invalidate queries, mostrar toast, router.back()
- onError: mostrar toast, setear errors en campos
- Componentes Input y Button de @/components/ui/
- Loading state en botón submit
```

### Agregar Hook de React Query

```
Crea un hook en mobile/src/hooks/use[Entity].ts:
- use[Entities](query): lista con paginación
- use[Entity](id): detalle por ID
- useCreate[Entity](): mutation para crear
- useUpdate[Entity](): mutation para actualizar
- useDelete[Entity](): mutation para eliminar

Todos deben:
- Invalidar queries correctas en onSuccess
- Usar queryKeys consistentes: ['[entities]', query]
- Seguir patrones de CODE_PATTERNS.md
```

### Crear Componente Reutilizable

```
Crea un componente en mobile/src/components/[folder]/[Component].tsx:
- Props: [list props and types]
- Muestre: [descripción UI]
- Use: Tailwind classes según DESIGN_SYSTEM.md
- Manejo de estados: loading, error, empty
- TypeScript: export interface [Component]Props
```

### Implementar Navegación

```
Configura navegación para [feature]:
- Crea carpeta mobile/app/[feature]/
- _layout.tsx con Stack navigator
- index.tsx: lista principal
- [id].tsx: detalle (dynamic route)
- create.tsx: formulario crear
- Link desde [existing screen] a nueva ruta
```

---

## Database Prompts

### Crear Índice Compuesto

```
Agrega un índice compuesto al modelo [Entity]:
- Campos: [field1], [field2]
- Orden: [1 o -1 para cada campo]
- Unique: [yes/no]
- Sparse: [yes/no]
- Razón: [por qué este índice]
```

### Agregar Virtual Field

```
Agrega un campo virtual "[virtualName]" al modelo [Entity]:
- Referencia: [ref Model]
- localField: [field]
- foreignField: [field]
- justOne: [true/false]
- Uso: para popular [data] en queries
```

### Implementar Soft Delete

```
Implementa soft delete en modelo [Entity]:
- Agrega campo isDeleted (boolean, default false, indexed)
- Modifica métodos delete para hacer update en lugar de deleteOne
- Actualiza queries para filtrar { isDeleted: false }
- Agrega método restore() si es necesario
```

---

## Testing Prompts

### Crear Test Unitario

```
Crea unit test para [entity]Service en backend/src/features/[entity]/[entity].test.ts:
- Mock del modelo [Entity]
- Test para método create: datos válidos retornan entity
- Test para método getAll: retorna paginación correcta
- Test para método getById: lanza NotFoundError si no existe
- Test para validaciones de negocio
- Cobertura > 80%
```

### Crear Test de Integración

```
Crea integration test en backend/src/__tests__/[entity].integration.test.ts:
- Setup: crear usuario de prueba y auth token
- Test POST /api/v1/[entity]: crea con 201
- Test GET /api/v1/[entity]: lista con 200
- Test GET sin auth: retorna 401
- Test validación: retorna 400 con datos inválidos
- Cleanup: limpiar datos de test
```

### Crear Test E2E (Cypress)

```
Crea test E2E en mobile/cypress/e2e/[feature].cy.ts:
- Login de usuario
- Navegar a [screen]
- Crear nuevo [entity]
- Verificar aparece en lista
- Editar [entity]
- Verificar cambios
- Eliminar [entity]
- Verificar desaparece de lista
```

---

## Debugging Prompts

### Investigar Error 401

```
Investiga por qué [endpoint] está retornando 401:
1. Verifica que el endpoint requiera authMiddleware
2. Revisa si el token se está enviando en header Authorization
3. Chequea que el token no esté expirado
4. Valida que apiClient.setAuthToken() se llama en initAuth
5. Muestra los logs relevantes
```

### Investigar Query Lenta

```
Optimiza la query lenta en [Service].[method]:
1. Muestra la query actual
2. Verifica índices en los campos filtrados
3. Revisa si hay populate innecesarios
4. Analiza el explain() de la query
5. Sugiere índices o cambios
```

### Debugging de Estado

```
Debug el estado de [feature] que no se actualiza:
1. Verifica que queryClient.invalidateQueries se llame
2. Chequea queryKeys coincidan entre hook y invalidate
3. Revisa si hay errores silenciosos en onError
4. Valida que mutation.onSuccess ejecute
5. Muestra el flujo completo de datos
```

---

## Refactoring Prompts

### Extraer Lógica a Service

```
Refactoriza [Controller].[method]:
- Mueve lógica de negocio a [Service].[newMethod]
- Deja solo manejo HTTP en controller
- Extrae validaciones complejas a funciones helper
- Mejora legibilidad y testabilidad
- Mantén backward compatibility
```

### Consolidar Hooks Duplicados

```
Refactoriza hooks duplicados en [feature]:
- Identifica hooks similares: [list]
- Crea hook genérico: use[Entity]Query(params)
- Migra componentes a nuevo hook
- Elimina hooks antiguos
- Actualiza tests
```

### Mejorar Performance

```
Optimiza performance de [Screen]:
- Identifica re-renders innecesarios
- Memoiza componentes pesados con React.memo
- Usa useCallback para funciones en props
- Implementa virtualización si lista > 50 items
- Lazy load componentes pesados
```

---

## 🎯 How to Use

1. **Copia el prompt** que necesites
2. **Reemplaza** `[placeholders]` con tus valores
3. **Pega** en chat con IA
4. **Revisa** el código generado

**Pro tip**: Combina prompts para tareas complejas:
```
[Prompt: Crear Feature CRUD] + [Prompt: Crear Test Unitario] + [Prompt: Crear Test de Integración]
```

La IA generará feature completo con tests en una sola iteración.
