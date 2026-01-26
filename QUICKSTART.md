# 🚀 RIZE - Inicio Rápido

## ⚡ Setup en 5 Minutos

### 1️⃣ Instalar Dependencias

```bash
# Opción A: Script automático (Windows)
.\install.ps1

# Opción B: Manual
cd backend && npm install
cd ../mobile && npm install
```

### 2️⃣ Configurar Backend

```bash
cd backend
cp .env.example .env
# Edita .env con tus datos
```

**Mínimo requerido en `.env`:**
```env
MONGODB_URI=mongodb://localhost:27017/rize
JWT_ACCESS_SECRET=minimo-32-caracteres-secretos-aqui
JWT_REFRESH_SECRET=otro-string-diferente-de-32-chars
```

### 3️⃣ Configurar Mobile

```bash
cd mobile
cp .env.example .env
```

**En `.env`:**
```env
# Localhost (emulador)
EXPO_PUBLIC_API_URL=http://localhost:5000

# Dispositivo físico (usa tu IP)
# EXPO_PUBLIC_API_URL=http://192.168.1.100:5000
```

### 4️⃣ Descargar Fuentes

1. Ve a [Google Fonts - Barlow](https://fonts.google.com/specimen/Barlow)
2. Descarga pesos: Medium (500), SemiBold (600), Bold (700)
3. Ve a [Google Fonts - Inter](https://fonts.google.com/specimen/Inter)
4. Descarga pesos: Regular (400), Medium (500), SemiBold (600)
5. Coloca todos los `.ttf` en `mobile/assets/fonts/`

### 5️⃣ Ejecutar

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Mobile:**
```bash
cd mobile
npm start
```

**Escanea el QR con Expo Go** o presiona:
- `a` para Android
- `i` para iOS (solo Mac)

---

## 📱 Primeros Pasos en la App

1. **Pantalla de Login** aparecerá al inicio
2. Toca **"Regístrate"**
3. Completa el formulario:
   - Email válido
   - Usuario (3+ chars)
   - Contraseña (8+ chars, 1 mayúscula, 1 número)
4. **Iniciar sesión** con tus credenciales
5. **Explora las 4 pestañas:**
   - 🏠 Inicio
   - 📊 Stats
   - 👥 Social
   - 👤 Perfil

---

## 🛠️ Comandos Útiles

### Backend
```bash
npm run dev          # Desarrollo con hot reload
npm test             # Ejecutar tests
npm run type-check   # Verificar TypeScript
```

### Mobile
```bash
npm start            # Iniciar Expo
npm run android      # Abrir en Android
npm run ios          # Abrir en iOS
npm test             # Ejecutar tests
```

---

## ❌ Si Algo Falla

### Backend no inicia
```bash
# Verifica MongoDB
mongod --version

# Inicia MongoDB (si es local)
# Windows: net start MongoDB
# Mac: brew services start mongodb-community
```

### Mobile no conecta
```bash
# Verifica que backend esté corriendo
curl http://localhost:5000/health

# Debería responder: {"status":"ok",...}
```

### Fuentes no cargan
```bash
# Limpia caché de Expo
npm start -- --clear
```

---

## 📚 Documentación Completa

- **SETUP.md** - Guía detallada de instalación
- **README.md** - Visión general del proyecto
- **PROJECT_STATUS.md** - Estado actual y roadmap
- **docs/** - Standards y especificaciones técnicas

---

## ✅ Checklist Pre-Ejecución

- [ ] Node.js 18+ instalado
- [ ] MongoDB corriendo (local o Atlas)
- [ ] `backend/.env` configurado
- [ ] `mobile/.env` configurado
- [ ] Fuentes descargadas en `mobile/assets/fonts/`
- [ ] Dependencias instaladas (`npm install` en ambos)
- [ ] Expo Go instalado en tu móvil (opcional)

---

**¿Listo? ¡Ejecuta los comandos del paso 5 y empieza a RIZE! 💪**
