# RIZE - Quick Reference Card 🚀

## 📋 Setup Checklist

- [ ] **1. Install Dependencies**
  ```bash
  # Backend
  cd backend && npm install
  
  # Mobile
  cd mobile && npm install
  ```

- [ ] **2. Configure Environment**
  ```bash
  # Backend
  cd backend
  cp .env.example .env
  # Edit .env (MongoDB, JWT secrets, Cloudinary)
  
  # Mobile  
  cd mobile
  cp .env.example .env
  # Edit .env (API URL)
  ```
  📖 See [ENV_SETUP.md](ENV_SETUP.md)

- [ ] **3. Install Fonts**
  ```bash
  cd mobile
  npm run install-fonts
  ```
  📖 See [FONTS_SETUP.md](FONTS_SETUP.md)

- [ ] **4. Generate Assets** (optional)
  ```bash
  cd mobile
  npm run generate-assets
  ```

- [ ] **5. Start Backend**
  ```bash
  cd backend
  npm run dev
  ```

- [ ] **6. Seed Data** (first time only)
  ```bash
  cd backend
  npm run seed
  ```

- [ ] **7. Start Mobile**
  ```bash
  cd mobile
  npm start
  # Press 'i' for iOS or 'a' for Android
  ```

---

## 🤖 Prompt-Driven Development (PDD)

Desarrollar con IA: especificá **qué** querés, la IA propone **cómo**. Ver **[PDD_GUIDE.md](PDD_GUIDE.md)** para plantillas y flujo.

**Reglas Cursor:** `.cursor/rules/` – la IA usa contexto automático (rize-pdd, backend-features, mobile-features).

---

## 🔧 Common Commands

### Backend
```bash
npm run dev          # Start development server
npm run build        # Compile TypeScript
npm run seed         # Seed database with exercises
npm test             # Run tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Run tests with coverage report
```

### Mobile
```bash
npm start              # Start Expo dev server
npm run ios            # Start iOS simulator
npm run android        # Start Android emulator
npm run generate-assets # Generate placeholder icons
npm run install-fonts  # Download and install fonts
npm test               # Run tests
npm run lint           # Run ESLint
npm run type-check     # Run TypeScript type checking
```

---

## 📱 Mobile Testing

### Local Development
- **iOS Simulator:** `http://localhost:5000/api`
- **Android Emulator:** `http://10.0.2.2:5000/api`
- **Physical Device:** `http://YOUR_IP:5000/api`

### Find Your IP
```bash
# Windows
ipconfig

# macOS/Linux
ifconfig
```

---

## 🧪 Testing

### Run Backend Tests
```bash
cd backend
npm test

# With coverage
npm run test:coverage
```

### Test Files
- `auth.integration.test.ts` - Authentication flow
- `workouts.integration.test.ts` - Workout CRUD
- `exercises.integration.test.ts` - Exercise search & filtering
- `social.integration.test.ts` - Social features
- `stats.integration.test.ts` - Statistics & analytics

---

## 📁 Project Structure

```
rize/
├── backend/              # Node.js + Express API
│   ├── src/
│   │   ├── features/     # Feature modules
│   │   ├── models/       # Mongoose models
│   │   ├── middleware/   # Express middleware
│   │   └── __tests__/    # Integration tests
│   └── package.json
│
├── mobile/               # React Native + Expo
│   ├── app/             # Expo Router screens
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── services/    # API clients
│   │   ├── stores/      # Zustand stores
│   │   └── hooks/       # Custom hooks
│   ├── assets/          # Images, fonts, icons
│   └── package.json
│
└── docs/                # Documentation
```

---

## 🔐 Environment Variables

### Backend (.env)
```dotenv
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your-secret-here
JWT_REFRESH_SECRET=your-refresh-secret
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
```

### Mobile (.env)
```dotenv
EXPO_PUBLIC_API_URL=http://localhost:5000/api
EXPO_PUBLIC_ENV=development
```

---

## 🐛 Troubleshooting

### "Cannot connect to MongoDB"
- ✅ Check MongoDB URI in backend/.env
- ✅ Whitelist IP in MongoDB Atlas
- ✅ Verify network connection

### "Network request failed" (Mobile)
- ✅ Backend must be running
- ✅ Check API URL in mobile/.env
- ✅ Use `10.0.2.2` for Android emulator
- ✅ Use local IP for physical devices
- ✅ Same WiFi network for physical devices

### "Font loading error"
- ✅ Run `npm run install-fonts` in mobile/
- ✅ Verify 6 .ttf files in mobile/assets/fonts/
- ✅ Uncomment font loading in app/_layout.tsx

### "Invalid token" / Auth errors
- ✅ Check JWT secrets are set (min 32 chars)
- ✅ Clear app data and login again
- ✅ Verify backend is running

---

## 📖 Documentation

- [README.md](README.md) - Project overview
- [PROJECT_STATUS.md](PROJECT_STATUS.md) - Current status
- [QUICKSTART.md](QUICKSTART.md) - Fast setup
- [SETUP.md](SETUP.md) - Detailed setup
- [ENV_SETUP.md](ENV_SETUP.md) - Environment config
- [FONTS_SETUP.md](FONTS_SETUP.md) - Font installation
- [BACKEND_STANDARDS.md](BACKEND_STANDARDS.md) - Backend patterns
- [FRONTEND_STANDARDS.md](FRONTEND_STANDARDS.md) - Mobile patterns
- [TESTING_STANDARDS.md](TESTING_STANDARDS.md) - Testing protocols
- [DATA_MODEL.md](DATA_MODEL.md) - Database schemas
- [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) - UI design system

---

## 🎯 Default Test Credentials

After seeding, you can use these test users:

```
Email: test@rize.dev
Password: Test1234
```

Or register a new account through the mobile app.

---

## 📊 API Endpoints

### Base URL
`http://localhost:5000/api/v1`

### Main Routes
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login
- `GET /auth/me` - Get current user
- `GET /workouts` - List workouts
- `POST /workouts` - Create workout
- `GET /exercises` - List exercises
- `GET /stats/overview` - User statistics
- `GET /social/feed` - Friends' workouts feed
- `POST /social/follow/:userId` - Follow user

📖 See [BACKEND_STANDARDS.md](BACKEND_STANDARDS.md) for complete API documentation

---

## 🚀 Deployment

### Backend
- Recommended: Railway, Render, or Heroku
- Set environment variables in platform
- Set `NODE_ENV=production`

### Mobile
- iOS: TestFlight (requires macOS + Xcode)
- Android: Google Play Internal Testing
- Use EAS Build: `eas build`

---

**Version:** 0.2.0-alpha  
**Last Updated:** February 3, 2026  
**Progress:** ~85% complete
