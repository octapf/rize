# RIZE - Guía de Prompt-Driven Development (PDD)

> Desarrollar con IA como copiloto: vos especificás **qué** querés, la IA propone **cómo** implementarlo. Este documento define el flujo de trabajo PDD para RIZE.

---

## 📋 Flujo de trabajo

```
1. ESPECIFICAR  →  Escribir qué necesitás (prompt)
2. REVISAR      →  La IA genera código
3. VALIDAR      →  Correr tests, probar
4. REFINAR      →  Ajustar con prompts si hace falta
```

---

## ✅ Prompts efectivos

### Regla de oro
Incluí **qué** querés (la acción). Los STANDARDS se aplican automáticamente vía `.cursor/rules/`.

### Plantillas

#### Nueva feature backend
```
Agregar endpoint [VERBO] /api/v1/[recurso] que [descripción].

Requisitos: [lista de requisitos específicos]
```

*(BACKEND_STANDARDS se aplica automáticamente al editar backend/*.ts)*

#### Nueva feature mobile
```
Crear pantalla [nombre] en mobile/app/[ruta] que [descripción].

Requisitos: [qué debe mostrar/hacer]
```

*(FRONTEND_STANDARDS y DESIGN_SYSTEM se aplican automáticamente al editar mobile/*.tsx)*

#### Bugfix
```
Hay un error en [archivo/ruta]: [qué pasa].

Comportamiento esperado: [qué debería pasar].

Revisar también: [archivos relacionados].
```

#### Refactor
```
Refactorizar [módulo/función] para [objetivo].

Mantener: [qué no debe cambiar]
Mejorar: [qué sí]
No romper tests existentes.
```

---

## 📁 Contexto que la IA usa

El proyecto tiene reglas en `.cursor/rules/` que Cursor lee automáticamente:

| Regla | Cuándo aplica |
|-------|----------------|
| `rize-pdd.mdc` | Siempre – overview, convenciones PDD |
| `backend-features.mdc` | Al editar `backend/**/*.ts` |
| `mobile-features.mdc` | Al editar `mobile/**/*.tsx` |

---

## 📖 Docs de referencia

Antes de pedir una feature, conviene que la IA (o vos) consulte:

| Doc | Para qué |
|-----|----------|
| **README.md** | Visión, stack, arquitectura |
| **BACKEND_STANDARDS.md** | Patrones de API, errores, validación |
| **FRONTEND_STANDARDS.md** | Componentes, estado, navegación |
| **DATA_MODEL.md** | Schemas MongoDB, relaciones |
| **DESIGN_SYSTEM.md** | Colores, tipografía, componentes UI |
| **TESTING_STANDARDS.md** | TDD, estructura de tests |

Podés citarlos en el prompt: *"Según DATA_MODEL, Workout tiene..."*

---

## 🎯 Ejemplos reales

### Ejemplo 1: Nuevo endpoint
```
Agregar GET /api/v1/workouts/streak que devuelva el streak actual del usuario (días consecutivos con al menos 1 workout).

- Requiere auth (authMiddleware)
- Calcular desde Workout.find({ userId, status: 'completed' }) ordenado por completedAt
- Respuesta: { success: true, data: { currentStreak: number, longestStreak: number } }
- Seguir patrón de stats.routes.ts
```

### Ejemplo 2: Nueva pantalla
```
Crear pantalla mobile/app/streaks/index.tsx que muestre el streak actual y un mini calendario/heap map de los últimos 30 días (días con workout = verde).

- Usar useStats o crear hook si no existe
- Card con el número de streak grande
- Lista/grid de días (verde si tiene workout, gris si no)
- Seguir diseño de stats.tsx como base
```

### Ejemplo 3: Fix
```
En mobile/app/auth/login.tsx, cuando el login falla por credenciales incorrectas, no se muestra mensaje al usuario. Debería mostrar un toast de error.

Revisar auth.api.ts y ToastContext para ver cómo mostrar errores.
```

---

## ⚠️ Después de que la IA genere código

1. **Revisar** – Que siga los estándares del proyecto.
2. **Tests** – `npm test` en backend y mobile.
3. **Probar** – Flujo manual si es UI o endpoint crítico.
4. **Refinar** – Si algo no cuadra: "Cambiá X para que haga Y" en un nuevo prompt.

---

## 🔄 Iteración

Si el primer resultado no es el esperado:

- Sé específico: "Usá Zod para validar el body, no manual"
- Citá archivos: "Como en workout.validation.ts"
- Describí el error: "El tipo de retorno debería ser X, no Y"

---

## 📌 Resumen

| Paso | Acción |
|------|--------|
| 1 | Escribir prompt con especificación clara |
| 2 | Mencionar estándares (BACKEND, FRONTEND, DATA_MODEL) |
| 3 | Pedir que siga patrones existentes |
| 4 | Revisar y validar con tests |
| 5 | Refinar con prompts de corrección si hace falta |

**RIZE está preparado para PDD**: documentación, reglas en `.cursor/rules/` y convenciones definidas. El éxito depende de prompts claros y revisión humana del código generado.
