# E2E Tests - Guía de Ejecución

> Tests end-to-end para validar los flujos críticos de la app RIZE

---

## 📋 Tests Disponibles

### `workout-flow.cy.ts` - Flujo Completo de Crear Workout
Valida el flujo principal de la app:

1. **Login Flow**
   - ✅ Navegar a login si no está autenticado
   - ✅ Login exitoso con credenciales válidas
   - ✅ Error con credenciales inválidas

2. **Navegación a Workouts**
   - ✅ Mostrar tab de Workouts
   - ✅ Navegar a pantalla de Workouts

3. **Crear Nuevo Workout**
   - ✅ Mostrar botón para crear
   - ✅ Abrir formulario al hacer click
   - ✅ Validar campo requerido
   - ✅ Crear workout con nombre válido

4. **Verificar en Lista**
   - ✅ Mostrar workout creado en lista
   - ✅ Mostrar información en card
   - ✅ Hacer click para ver detalles

5. **Stats**
   - ✅ Actualizar total de workouts
   - ✅ Incrementar streak

6. **Manejo de Errores**
   - ✅ Error de conexión al crear
   - ✅ Timeout

7. **Validación de Seguridad**
   - ✅ Redirigir a login sin token
   - ✅ Error 401 sin autenticación

---

## 🚀 Cómo Ejecutar

### Prerequisitos
- Backend corriendo en `localhost:5000`
- Expo corriendo en `localhost:8081`
- Usuario de test creado en DB: `test@test.com` / `Admin123`

### Comando para ejecutar tests

```bash
cd mobile

# Abrir Cypress Test Runner (interfaz interactiva)
npm run cypress:open

# Ejecutar tests en headless (sin interfaz)
npm run cypress:run

# Ejecutar solo tests de workout
npm run cypress:run -- --spec cypress/e2e/workout-flow.cy.ts

# Ejecutar un test específico
npm run cypress:run -- --spec cypress/e2e/workout-flow.cy.ts -g "Debe loguearse exitosamente"
```

---

## 📊 Scripts Disponibles

En `mobile/package.json`:

```json
{
  "scripts": {
    "cypress:open": "cypress open",
    "cypress:run": "cypress run",
    "test:e2e": "cypress run --headless",
    "test:e2e:watch": "cypress open --e2e"
  }
}
```

---

## 🔍 Cómo Leer los Resultados

### ✅ Test Pasado
```
✓ Debe loguearse exitosamente con credenciales válidas (1.234s)
```

### ❌ Test Fallido
```
✗ Debe mostrar error con credenciales inválidas (3.456s)
  Error: expected <...> to exist
```

### ⏸️ Test Skipped
```
⊝ Debe crear workout con nombre válido (skipped)
```

---

## 🐛 Debugging

### Ver logs detallados
```bash
npm run cypress:run -- --spec cypress/e2e/workout-flow.cy.ts --verbose
```

### Parar en un punto específico
En el test, añade:
```typescript
cy.debug(); // Pausa aquí
```

### Ver lo que hace Cypress
```bash
npm run cypress:open
// Luego haz click en el test y verás cada paso en tiempo real
```

### Inspeccionar elementos
En Cypress abierto:
1. Click en el ícono de debug (inspector)
2. Mueve el mouse sobre elementos
3. Verás selectores en la consola

---

## 📝 Estructura de un Test

```typescript
describe('Suite de Tests', () => {
  beforeEach(() => {
    // Se ejecuta antes de cada test
    cy.visit('/login');
  });

  it('Debe hacer algo específico', () => {
    // Arrange - Preparar datos
    cy.get('input').first().type('value');
    
    // Act - Ejecutar acción
    cy.contains('Botón').click();
    
    // Assert - Verificar resultado
    cy.contains('Éxito').should('be.visible');
  });

  it('Otro test', () => {
    // ...
  });
});
```

---

## ✍️ Agregar Nuevos Tests

### Template para nuevo test
```typescript
describe('E2E: Nueva Funcionalidad', () => {
  beforeEach(() => {
    cy.visit('/auth/login');
    // Login
    cy.get('input').first().type('test@test.com');
    cy.get('input').last().type('Admin123');
    cy.contains('Entrar').click();
  });

  it('Debe hacer X', () => {
    // Tu test aquí
    cy.contains('Algo').should('be.visible');
  });
});
```

### Comandos Útiles de Cypress
```typescript
// Navegación
cy.visit('/url');
cy.url().should('include', '/path');

// Buscar elementos
cy.get('selector');
cy.contains('text');
cy.get('input[placeholder*="Email"]');

// Interacción
cy.click();
cy.type('text');
cy.clear();

// Verificación
cy.should('be.visible');
cy.should('have.value', 'algo');
cy.should('contain', 'texto');
cy.should('exist');

// Esperas
cy.wait(2000); // 2 segundos
cy.url({ timeout: 5000 }).should(...);

// Mocks
cy.intercept('GET', '/api/url', { data: 'mock' });
cy.intercept('POST', '**/workouts', { statusCode: 500 });
```

---

## 📊 CI/CD Integration

### GitHub Actions
En `.github/workflows/mobile-ci.yml`:

```yaml
- name: Run E2E Tests
  run: |
    cd mobile
    npm ci
    npm run cypress:run
```

---

## 🎯 Checklist para Antes de Hacer Push

- [ ] Todos los tests pasan localmente
- [ ] Los tests validan el flujo crítico (Login → Crear Workout → Ver en Lista)
- [ ] No hay hardcoded delays (usar `wait()` con selectores)
- [ ] Se cubren casos de error
- [ ] Los selectores son robustos (no basados en posición)

---

## 📚 Recursos

- [Cypress Documentation](https://docs.cypress.io)
- [Best Practices](https://docs.cypress.io/guides/references/best-practices)
- [Selector Playground](https://docs.cypress.io/guides/core-concepts/interacting-with-elements)

---

## ⚠️ Troubleshooting

### "Element not found" (Timeout)
```
✗ Timeout: cy.get() did not find element
```
**Solución**: El elemento no existe o tardó más de 4s
- Aumenta timeout: `cy.get('selector', { timeout: 10000 })`
- Verifica selector: Usa Cypress Inspector
- Espera a que cargue: `cy.url().should('not.include', 'loading')`

### "ECONNREFUSED" - Backend no responde
```
✗ Error: connect ECONNREFUSED 127.0.0.1:5000
```
**Solución**: Backend no está corriendo
```bash
cd backend
npm run dev
```

### Tests muy lentos
- Reduce esperas innecesarias
- Usa `cy.intercept()` para mockear requests lentas
- Ejecuta tests en paralelo: `npm run cypress:run -- --parallel`

### Tests flaky (pasan/fallan inconsistentemente)
- No uses `cy.wait(1000)`
- Espera elementos: `cy.contains('Texto').should('be.visible')`
- Re-intenta queries: `cy.get('selector', { timeout: 10000 })`

---

## 📞 Soporte

Si los tests fallan, reporta con:
1. Mensaje de error exacto
2. Screenshot/video (Cypress guarda automáticamente)
3. Navegador (Chrome, Firefox, Edge)
4. Sistema operativo
