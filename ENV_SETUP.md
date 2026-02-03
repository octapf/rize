# Environment Setup Guide

This guide helps you set up the environment variables for both backend and mobile apps.

## 📋 Quick Setup

### 1. Backend (.env)

Navigate to the `backend/` directory and create a `.env` file:

```bash
cd backend
cp .env.example .env
```

Then edit `.env` with your actual values:

```dotenv
# Server Configuration
PORT=5000
NODE_ENV=development

# Database - Get from MongoDB Atlas (https://cloud.mongodb.com)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/rize?retryWrites=true&w=majority

# JWT Secrets - Generate strong random strings (min 32 chars)
JWT_SECRET=your-super-secret-jwt-key-min-32-chars-here-change-this
JWT_REFRESH_SECRET=your-refresh-token-secret-min-32-chars-here-change-this

# Cloudinary - Get from https://cloudinary.com (free tier available)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Optional: Error tracking
# SENTRY_DSN=https://your-sentry-dsn

# Optional: Analytics
# MIXPANEL_TOKEN=your-mixpanel-token
```

### 2. Mobile (.env)

Navigate to the `mobile/` directory and create a `.env` file:

```bash
cd mobile
cp .env.example .env
```

Edit `.env` with your API URL:

```dotenv
# API URL - Points to your backend
# Development (local):
EXPO_PUBLIC_API_URL=http://localhost:5000/api
EXPO_PUBLIC_ENV=development

# Production:
# EXPO_PUBLIC_API_URL=https://api.rize.app/api
# EXPO_PUBLIC_ENV=production
```

**Important for mobile testing:**
- **iOS Simulator**: Use `http://localhost:5000/api`
- **Android Emulator**: Use `http://10.0.2.2:5000/api`
- **Physical Device**: Use your computer's IP address, e.g., `http://192.168.1.10:5000/api`

---

## 🔧 Detailed Configuration

### MongoDB Setup

1. **Create a free cluster** at [MongoDB Atlas](https://cloud.mongodb.com)
2. **Create a database user** with read/write permissions
3. **Whitelist your IP** (or use `0.0.0.0/0` for development)
4. **Get connection string**: 
   - Click "Connect" → "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your actual password
   - Replace `<dbname>` with `rize` (or your preferred name)

Example:
```
mongodb+srv://myuser:mypassword@cluster0.abc123.mongodb.net/rize?retryWrites=true&w=majority
```

### JWT Secrets Generation

Generate strong secrets using one of these methods:

**Node.js:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**OpenSSL:**
```bash
openssl rand -hex 32
```

**Online:**
- https://generate-secret.vercel.app/32

### Cloudinary Setup

1. **Sign up** at [Cloudinary](https://cloudinary.com) (free tier available)
2. **Get credentials** from Dashboard:
   - Cloud name
   - API Key
   - API Secret
3. **Add to `.env`**

**Note:** Cloudinary is used for uploading profile pictures and workout photos.

### Finding Your Local IP (for mobile testing)

**Windows:**
```powershell
ipconfig
# Look for "IPv4 Address" under your active network adapter
```

**macOS/Linux:**
```bash
ifconfig
# Look for "inet" address (usually starts with 192.168 or 10.0)
```

---

## ✅ Verification

### Test Backend

```bash
cd backend
npm run dev
```

You should see:
```
✅ Server running on http://localhost:5000
✅ MongoDB connected successfully
✅ Environment: development
```

### Test Mobile

```bash
cd mobile
npm start
```

Then press:
- `i` for iOS simulator
- `a` for Android emulator
- Scan QR code with Expo Go for physical device

---

## 🔒 Security Best Practices

### Development
- ✅ Use `.env` files (already in `.gitignore`)
- ✅ Never commit secrets to Git
- ✅ Use different secrets for each environment

### Production
- 🔐 Use strong, unique JWT secrets (64+ characters)
- 🔐 Restrict MongoDB network access
- 🔐 Use environment variables from your hosting platform
- 🔐 Enable CORS only for your frontend domain
- 🔐 Set `NODE_ENV=production`

---

## 🚨 Troubleshooting

### "Cannot connect to MongoDB"
- ✅ Check your MongoDB URI is correct
- ✅ Verify your IP is whitelisted in MongoDB Atlas
- ✅ Ensure database user has correct permissions
- ✅ Check network connection

### "Network request failed" (Mobile)
- ✅ Backend server must be running
- ✅ Use correct IP address for physical devices
- ✅ Android emulator uses `10.0.2.2` instead of `localhost`
- ✅ Check firewall/antivirus isn't blocking connections
- ✅ Ensure you're on the same WiFi network (physical devices)

### "Invalid token" / Auth errors
- ✅ Check JWT secrets match between environments
- ✅ Verify secrets are at least 32 characters
- ✅ Clear app data and login again

### "Cloudinary upload failed"
- ✅ Verify credentials in `.env`
- ✅ Check Cloudinary account is active
- ✅ Ensure you haven't exceeded free tier limits

---

## 📱 Mobile Development Tips

### iOS (requires macOS)
```bash
# Start with iOS simulator
npm run ios
```

### Android
```bash
# Start with Android emulator (requires Android Studio)
npm run android
```

### Physical Device
1. Install **Expo Go** app
2. Connect to same WiFi as your computer
3. Scan QR code from terminal
4. Update `EXPO_PUBLIC_API_URL` with your computer's IP

---

## 🔄 Environment Switching

### Development → Production

**Backend:**
```dotenv
NODE_ENV=production
MONGODB_URI=<production-mongodb-uri>
# Use production Cloudinary account
```

**Mobile:**
```dotenv
EXPO_PUBLIC_API_URL=https://api.yourdomain.com/api
EXPO_PUBLIC_ENV=production
```

---

## 📚 Additional Resources

- [MongoDB Atlas Docs](https://docs.atlas.mongodb.com/)
- [Cloudinary Docs](https://cloudinary.com/documentation)
- [Expo Environment Variables](https://docs.expo.dev/guides/environment-variables/)
- [JWT.io](https://jwt.io/) - Debug JWT tokens

---

**Need help?** Check [QUICKSTART.md](QUICKSTART.md) or [SETUP.md](SETUP.md) for step-by-step instructions.
