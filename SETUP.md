# RIZE - Setup Guide

Este documento explica cómo configurar y ejecutar RIZE desde cero.

## 📋 Prerrequisitos

### Backend
- **Node.js** 18.x o superior (LTS recomendado)
- **MongoDB** 6.x o superior (local o Atlas)
- **npm** o **yarn**

### Mobile
- **Node.js** 18.x o superior
- **Expo CLI** (se instala automáticamente)
- **Expo Go app** en tu dispositivo móvil (iOS/Android)
- Para desarrollo iOS: macOS con Xcode
- Para desarrollo Android: Android Studio

## 🚀 Instalación

### 1. Backend Setup

```bash
# Navegar a la carpeta backend
cd backend

# Instalar dependencias
npm install

# Crear archivo .env desde template
cp .env.example .env
```

### 2. Configurar Variables de Entorno (Backend)

Edita el archivo `backend/.env` con tus credenciales:

```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/rize
# O usa MongoDB Atlas:
# MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/rize?retryWrites=true&w=majority

# JWT Secrets (genera strings aleatorios de 32+ caracteres)
JWT_ACCESS_SECRET=tu_secret_de_access_token_muy_seguro
JWT_REFRESH_SECRET=tu_secret_de_refresh_token_muy_seguro

# Cloudinary (opcional para desarrollo)
CLOUDINARY_CLOUD_NAME=tu_cloud_name
CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret
```

**Generar JWT secrets seguros:**

```bash
# En Linux/Mac
openssl rand -base64 32

# O en Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### 3. Mobile Setup

```bash
# Navegar a la carpeta mobile
cd mobile

# Instalar dependencias
npm install

# Crear archivo .env
cp .env.example .env
```

### 4. Configurar Variables de Entorno (Mobile)

Edita el archivo `mobile/.env`:

```env
# API URL
# Para desarrollo local:
EXPO_PUBLIC_API_URL=http://localhost:5000

# Para desarrollo con dispositivo físico, usa tu IP local:
# EXPO_PUBLIC_API_URL=http://192.168.1.100:5000
```

**Nota:** Para encontrar tu IP local:
- **Windows:** `ipconfig` (busca IPv4 Address)
- **Mac/Linux:** `ifconfig` o `ip addr`

## 🏃 Ejecutar la Aplicación

### Iniciar Backend

```bash
cd backend

# Modo desarrollo (con hot reload)
npm run dev

# Modo producción
npm start
```

El servidor debería iniciar en `http://localhost:5000`

**Verificar que funciona:**
```bash
curl http://localhost:5000/health
# Debería responder: {"status":"ok","timestamp":"..."}
```

### Iniciar Mobile

```bash
cd mobile

# Iniciar Expo dev server
npm start

# O directamente en plataforma específica:
npm run android  # Abre en Android
npm run ios      # Abre en iOS (solo Mac)
```

Esto abrirá Expo DevTools en tu navegador. Opciones:

1. **Escanear QR con Expo Go:**
   - Instala Expo Go desde App Store/Play Store
   - Escanea el QR code
   
2. **Emulador Android:**
   - Presiona `a` en la terminal
   
3. **Simulador iOS:**
   - Presiona `i` en la terminal (solo macOS)

## 📱 Usar la App

1. **Primera vez:** Verás la pantalla de login
2. **Registrarse:** Toca "Regístrate" y crea una cuenta
   - Email válido
   - Usuario de 3+ caracteres
   - Contraseña de 8+ caracteres (1 mayúscula, 1 minúscula, 1 número)
3. **Iniciar sesión:** Una vez registrado, inicia sesión
4. **Explorar:** Navega por las 4 pestañas principales

## 🧪 Ejecutar Tests

### Backend Tests

```bash
cd backend

# Ejecutar todos los tests
npm test

# Tests en modo watch
npm run test:watch

# Coverage report
npm run test:coverage
```

### Mobile Tests

```bash
cd mobile

# Ejecutar todos los tests
npm test

# Tests en modo watch
npm run test:watch
```

## 🛠️ Scripts Disponibles

### Backend

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Inicia servidor con hot reload (nodemon) |
| `npm start` | Inicia servidor en producción |
| `npm test` | Ejecuta tests con Jest |
| `npm run type-check` | Verifica tipos TypeScript |
| `npm run lint` | Ejecuta ESLint |

### Mobile

| Script | Descripción |
|--------|-------------|
| `npm start` | Inicia Expo dev server |
| `npm run android` | Abre en Android |
| `npm run ios` | Abre en iOS |
| `npm test` | Ejecuta tests |
| `npm run type-check` | Verifica tipos TypeScript |

## 🐛 Troubleshooting

### Backend no conecta a MongoDB

**Error:** `MongooseServerSelectionError`

**Solución:**
1. Verifica que MongoDB esté corriendo: `mongod --version`
2. Si usas MongoDB local, inicia el servicio:
   - **Windows:** `net start MongoDB`
   - **Mac:** `brew services start mongodb-community`
   - **Linux:** `sudo systemctl start mongod`
3. Verifica que `MONGODB_URI` en `.env` sea correcto

### Mobile no puede conectar al backend

**Error:** `Network Error` o `Request failed`

**Solución:**
1. Verifica que el backend esté corriendo (`http://localhost:5000/health`)
2. Si usas dispositivo físico:
   - Usa tu IP local en `EXPO_PUBLIC_API_URL`
   - Asegúrate de estar en la misma red WiFi
3. Si usas emulador:
   - Android: usa `http://10.0.2.2:5000`
   - iOS: usa `http://localhost:5000`

### Fonts no cargan en mobile

**Error:** `Unable to load fonts`

**Solución:**
1. Verifica que las fuentes estén en `mobile/assets/fonts/`
2. Limpia caché: `expo start -c`
3. Reinstala dependencias: `npm install`

### TypeScript errors después de crear archivos

**Solución:**
1. Reinicia el servidor de TypeScript en VS Code: `Cmd/Ctrl + Shift + P` → "TypeScript: Restart TS Server"
2. Verifica que `tsconfig.json` tenga los path aliases correctos

### Puerto 5000 ya en uso

**Error:** `EADDRINUSE: address already in use :::5000`

**Solución:**
1. Mata el proceso en el puerto:
   - **Windows:** `netstat -ano | findstr :5000` → `taskkill /PID <PID> /F`
   - **Mac/Linux:** `lsof -ti:5000 | xargs kill -9`
2. O cambia el puerto en `backend/.env`: `PORT=3000`

## 📁 Estructura de Archivos

```
rize/
├── backend/
│   ├── src/
│   │   ├── config/          # Configuración (DB, env, cloudinary)
│   │   ├── features/        # Módulos por feature
│   │   │   └── auth/        # Autenticación (routes, controller, service)
│   │   ├── middleware/      # Middleware (auth, errors, validator)
│   │   ├── models/          # Modelos Mongoose (User, Workout, Exercise)
│   │   ├── utils/           # Utilidades (logger, errors, jwt)
│   │   └── server.ts        # Entry point
│   ├── .env                 # Variables de entorno
│   └── package.json
│
├── mobile/
│   ├── app/
│   │   ├── (tabs)/          # Rutas principales (Home, Stats, Social, Profile)
│   │   ├── _layout.tsx      # Root layout con auth routing
│   │   ├── login.tsx        # Pantalla login
│   │   └── register.tsx     # Pantalla registro
│   ├── src/
│   │   ├── components/ui/   # Componentes UI (Button, Input, Card, etc.)
│   │   ├── services/        # API client, storage
│   │   ├── stores/          # Zustand stores (authStore)
│   │   └── lib/             # Utilidades (utils.ts)
│   ├── assets/fonts/        # Fuentes (Barlow, Inter)
│   ├── .env                 # Variables de entorno
│   └── package.json
│
└── docs/                    # Documentación (README, standards, etc.)
```

## 🎯 Próximos Pasos

1. **Implementar Workouts Feature:**
   - Crear CRUD de entrenamientos en backend
   - Pantallas de creación/visualización en mobile

2. **Ejercicios Predefinidos:**
   - Seed de 50+ ejercicios iniciales
   - Búsqueda y filtrado

3. **Sistema de XP/Niveles:**
   - Cálculo automático de XP por workout
   - Animaciones de level up

4. **Social Features:**
   - Feed de entrenamientos
   - Seguir usuarios
   - Likes y comentarios

Ver [README.md](./README.md) para más información sobre la arquitectura y roadmap completo.

## 📞 Soporte

Si encuentras problemas:

1. Revisa la sección **Troubleshooting**
2. Verifica los logs del backend (consola del servidor)
3. Revisa los logs de Expo (terminal donde corre `npm start`)
4. Asegúrate de tener las versiones correctas de Node.js y dependencias

---

**¡Listo para RIZE! 💪🚀**
