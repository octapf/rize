# Fix para Error 401 en Workouts

## Problema
Al navegar a la página de workouts después de loguearse, se recibía el error:
```
GET http://localhost:5000/api/v1/workouts?limit=20 401 (Unauthorized)
```

El error se repetía 3 veces, indicando que el cliente no estaba enviando un token válido.

## Causa Raíz
Había dos problemas sincronizados:

### 1. Token no restaurado al recargar la app
En `mobile/src/stores/authStore.ts`, el método `initAuth()` restauraba el usuario desde el almacenamiento, pero **NO restauraba el token en el cliente API**. 

Esto significaba:
- Si el usuario recargaba la app (hard refresh)
- El usuario se guardaba en memoria correctamente
- Pero el cliente Axios no tenía el token en su memoria
- Las primeras solicitudes fallaban porque el interceptor de request no encontraba el token
- El cliente intentaba buscarlo en el almacenamiento cada vez (lento y propenso a race conditions)

### 2. initAuth() no se esperaba correctamente
En `mobile/app/_layout.tsx`, se llamaba a `initAuth()` sin `await`, causando que las solicitudes se hicieran antes de que el token fuera restaurado.

## Soluciones Implementadas

### 1. Restaurar Token en initAuth()
**Archivo**: [mobile/src/stores/authStore.ts](mobile/src/stores/authStore.ts#L111-L126)

```typescript
initAuth: async () => {
  const userStr = await storage.getString('user');
  const accessToken = await storage.getString('accessToken');

  if (userStr && accessToken) {
    try {
      const user = JSON.parse(userStr) as User;
      
      // ✅ NUEVO: Restaurar token en API client para evitar 401 en reload
      apiClient.setAuthToken(accessToken);
      
      set({
        user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      console.error('Failed to parse stored user:', error);
      set({ isLoading: false });
    }
  } else {
    set({ isLoading: false });
  }
},
```

### 2. Esperar initAuth() Correctamente
**Archivo**: [mobile/app/_layout.tsx](mobile/app/_layout.tsx#L68-L71)

```typescript
useEffect(() => {
  const init = async () => {
    await initAuth();  // ✅ Agregado await
    const completed = await AsyncStorage.getItem(ONBOARDING_KEY);
    setOnboardingCompleted(completed === 'true');
  };
  init();
}, [initAuth]);
```

## Testing

### Credenciales de Prueba
```
Email: test@test.com
Contraseña: Admin123
```

Estos credentials fueron creados ejecutando:
```bash
cd backend
node create-test-user.js
```

### Pasos para Verificar
1. **Recargar la app** en el navegador (Ctrl+R)
2. **Loguearse** con:
   - Email: `test@test.com`
   - Contraseña: `Admin123`
3. **Navegar a Workouts** - debería mostrar la lista sin errores 401
4. **Verificar en consola** - no debería haber errores GET 401

### ¿Qué Debería Pasar?
- ✅ Usuario logueado correctamente
- ✅ Token guardado en AsyncStorage
- ✅ Token restaurado en memor al recargar
- ✅ Todas las solicitudes incluyen `Authorization: Bearer {token}`
- ✅ GET /api/v1/workouts?limit=20 retorna 200 con datos

## Código Relacionado

### Client API
El cliente Axios **ya tiene lógica correcta** para enviar tokens:

[mobile/src/services/api/client.ts](mobile/src/services/api/client.ts#L34-L45)
```typescript
this.client.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    // Prefer memory token first (fastest/sync), then storage
    let token = this.token;
    if (!token) {
      token = await storage.getString('accessToken');
    }

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }
);
```

**El fix asegura que `this.token` esté poblado desde el inicio**, evitando las búsquedas en storage.

### Rutas Protegidas
Todas las rutas de workouts requieren autenticación:

[backend/src/features/workouts/workout.routes.ts](backend/src/features/workouts/workout.routes.ts#L28)
```typescript
// All routes require authentication
router.use(authMiddleware);
```

## Estado del Sistema

### ✅ Backend
- Servidor corriendo en `localhost:5000`
- Health check: 200 OK
- MongoDB conectado con usuario de prueba creado

### ✅ Frontend
- Cliente API configurado correctamente
- Almacenamiento sincronizado
- Token restored on app initialization

### ✅ Autenticación
- Test user creado: `test@test.com` / `Admin123`
- Tokens guardados correctamente en AsyncStorage
- Token restaurado en API client memory en inicialización

---

**Próximos pasos**:
1. Probar login y navegación a Workouts
2. Verificar que no hay errores 401 en consola
3. Si hay otros errores, revisar la respuesta del servidor en Network tab
