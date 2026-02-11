# Feature Template

> **Plantilla para nuevas features**: Usa esta estructura cuando pidas implementar una nueva funcionalidad.

## Feature: [NOMBRE]

**Status**: 🟡 Planned | 🔵 In Progress | 🟢 Completed  
**Priority**: P0 (Critical) | P1 (High) | P2 (Medium) | P3 (Low)  
**Estimated**: [Xh]  
**Assigned**: [Developer/AI]

---

## 📝 Specification

### User Story
```
Como [tipo de usuario]
Quiero [acción/funcionalidad]
Para [beneficio/objetivo]
```

### Acceptance Criteria
- [ ] Criterio 1: Descripción clara y testeable
- [ ] Criterio 2: Descripción clara y testeable
- [ ] Criterio 3: Descripción clara y testeable

### Business Rules
- Regla 1: Condiciones y restricciones
- Regla 2: Validaciones necesarias
- Regla 3: Límites y permisos

---

## 🏗️ Technical Design

### Backend Implementation

**Endpoints**:
```
POST   /api/v1/[resource]          - Crear
GET    /api/v1/[resource]          - Listar (con paginación)
GET    /api/v1/[resource]/:id      - Obtener uno
PATCH  /api/v1/[resource]/:id      - Actualizar
DELETE /api/v1/[resource]/:id      - Eliminar
```

**Files to Create/Modify**:
```
backend/src/features/[feature]/
├── [feature].controller.ts     - HTTP handlers
├── [feature].service.ts        - Business logic
├── [feature].routes.ts         - Route definitions
├── [feature].validation.ts     - Zod schemas
└── [feature].test.ts           - Unit tests

backend/src/models/
└── [Model].ts                  - Mongoose model

backend/src/__tests__/
└── [feature].integration.test.ts
```

**Service Methods**:
```typescript
export const [feature]Service = {
  async create(userId: string, data: Create[Feature]DTO): Promise<[Feature]> {
    // Implementation
  },
  
  async getAll(userId: string, query: [Feature]Query): Promise<Paginated<[Feature]>> {
    // Implementation
  },
  
  async getById(id: string, userId: string): Promise<[Feature]> {
    // Implementation
  },
  
  async update(id: string, userId: string, data: Update[Feature]DTO): Promise<[Feature]> {
    // Implementation
  },
  
  async delete(id: string, userId: string): Promise<void> {
    // Implementation
  }
};
```

**Model Schema**:
```typescript
interface I[Feature] extends Document {
  userId: Schema.Types.ObjectId;
  field1: string;
  field2: number;
  // ... más campos
  createdAt: Date;
  updatedAt: Date;
}

const [feature]Schema = new Schema<I[Feature]>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  field1: { type: String, required: true },
  field2: { type: Number, default: 0 },
  // ... más campos
}, { timestamps: true });
```

### Frontend Implementation

**Files to Create/Modify**:
```
mobile/src/services/api/
└── [feature].api.ts            - API client methods

mobile/src/hooks/
└── use[Feature].ts             - React Query hooks

mobile/app/[feature]/
├── index.tsx                   - Lista principal
├── [id].tsx                    - Detalle (dynamic route)
├── create.tsx                  - Crear nuevo
└── edit.tsx                    - Editar existente

mobile/src/components/[feature]/
└── [Feature]Card.tsx           - Componente de card
```

**API Client**:
```typescript
export const [feature]Api = {
  getAll: async (query?: [Feature]Query): Promise<[Feature]Response> => {
    const params = new URLSearchParams(query as any);
    const res = await apiClient.get(`/[feature]?${params}`);
    return res.data;
  },
  
  getById: async (id: string): Promise<[Feature]DetailResponse> => {
    const res = await apiClient.get(`/[feature]/${id}`);
    return res.data;
  },
  
  create: async (data: Create[Feature]Data): Promise<[Feature]Response> => {
    const res = await apiClient.post('/[feature]', data);
    return res.data;
  },
  
  update: async (id: string, data: Update[Feature]Data): Promise<[Feature]Response> => {
    const res = await apiClient.patch(`/[feature]/${id}`, data);
    return res.data;
  },
  
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/[feature]/${id}`);
  }
};
```

**Hooks**:
```typescript
// Lista
export const use[Features] = (query?: [Feature]Query) => {
  return useQuery({
    queryKey: ['[features]', query],
    queryFn: () => [feature]Api.getAll(query)
  });
};

// Detalle
export const use[Feature] = (id: string) => {
  return useQuery({
    queryKey: ['[feature]', id],
    queryFn: () => [feature]Api.getById(id),
    enabled: !!id
  });
};

// Crear
export const useCreate[Feature] = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: [feature]Api.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['[features]'] });
    }
  });
};

// Actualizar
export const useUpdate[Feature] = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Update[Feature]Data }) =>
      [feature]Api.update(id, data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['[features]'] });
      queryClient.invalidateQueries({ queryKey: ['[feature]', variables.id] });
    }
  });
};
```

**Screen Example**:
```typescript
export default function [Feature]ListScreen() {
  const { data, isLoading, error } = use[Features]({ limit: 20 });
  
  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorView error={error} />;
  
  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-gray-900">
      <FlatList
        data={data?.data || []}
        renderItem={({ item }) => <[Feature]Card [feature]={item} />}
        keyExtractor={(item) => item._id}
        contentContainerClassName="p-4"
      />
    </SafeAreaView>
  );
}
```

---

## 🧪 Testing Strategy

### Backend Tests

**Unit Tests** (`[feature].test.ts`):
```typescript
describe('[Feature]Service', () => {
  it('should create [feature]', async () => {
    // Test implementation
  });
  
  it('should validate required fields', async () => {
    // Test implementation
  });
});
```

**Integration Tests** (`[feature].integration.test.ts`):
```typescript
describe('POST /api/v1/[feature]', () => {
  it('should create [feature] with valid data', async () => {
    const res = await request(app)
      .post('/api/v1/[feature]')
      .set('Authorization', `Bearer ${authToken}`)
      .send(validData);
    
    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
  });
  
  it('should return 401 without auth', async () => {
    const res = await request(app)
      .post('/api/v1/[feature]')
      .send(validData);
    
    expect(res.status).toBe(401);
  });
});
```

### Frontend Tests

**Hook Tests**:
```typescript
describe('use[Feature]', () => {
  it('should fetch [features]', async () => {
    const { result } = renderHook(() => use[Features]());
    
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toBeDefined();
  });
});
```

**E2E Tests** (Cypress):
```typescript
describe('[Feature] Flow', () => {
  it('should create new [feature]', () => {
    cy.login();
    cy.visit('/[feature]/create');
    cy.get('[data-testid="field1"]').type('value');
    cy.get('[data-testid="submit"]').click();
    cy.url().should('include', '/[feature]');
  });
});
```

---

## 📋 Checklist

### Backend
- [ ] Controller creado con todos los métodos
- [ ] Service implementado con lógica de negocio
- [ ] Routes configuradas con auth middleware
- [ ] Validation schemas con Zod
- [ ] Modelo Mongoose con schema completo
- [ ] Índices agregados a MongoDB
- [ ] Unit tests pasando
- [ ] Integration tests pasando
- [ ] Documentación Swagger/JSDoc

### Frontend
- [ ] API client implementado
- [ ] Hooks de React Query creados
- [ ] Pantallas principales creadas
- [ ] Componentes reutilizables
- [ ] Manejo de errores implementado
- [ ] Loading states manejados
- [ ] TypeScript types definidos
- [ ] UI/UX según DESIGN_SYSTEM.md

### General
- [ ] Feature funciona end-to-end
- [ ] No hay errores en consola
- [ ] Performance aceptable
- [ ] Documentación actualizada
- [ ] Commit con mensaje descriptivo

---

## 📚 Related Documentation

- [BACKEND_STANDARDS.md](./BACKEND_STANDARDS.md) - Patrones backend
- [FRONTEND_STANDARDS.md](./FRONTEND_STANDARDS.md) - Patrones frontend
- [DATA_MODEL.md](./DATA_MODEL.md) - Modelos de datos
- [TESTING_STANDARDS.md](./TESTING_STANDARDS.md) - Estrategias de testing
- [CODE_PATTERNS.md](./CODE_PATTERNS.md) - Snippets reutilizables

---

## 🎯 Example Usage

**Prompt para IA**:
```
Implementa el feature "Meal Plans" siguiendo FEATURE_TEMPLATE.md:

- User Story: Como usuario, quiero crear planes de comidas para seguir mi nutrición
- Endpoints: CRUD completo en /api/v1/meal-plans
- Modelo: MealPlan con campos { name, userId, meals[], dailyCalories, active }
- Frontend: Pantalla de lista, crear y editar
- Tests: Unit + Integration según TESTING_STANDARDS.md
```

**Resultado esperado**: Feature completo con backend + frontend + tests en una sola iteración.
