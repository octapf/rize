# RIZE Deployment Guide 🚀

Complete guide for deploying RIZE backend and mobile apps to production.

---

## 📋 Table of Contents

1. [Backend Deployment](#backend-deployment)
   - [Railway](#option-1-railway-recommended)
   - [Render](#option-2-render)
   - [Heroku](#option-3-heroku)
2. [Mobile Deployment](#mobile-deployment)
   - [iOS (TestFlight)](#ios-testflight)
   - [Android (Play Store)](#android-play-store-internal-testing)
3. [Database Setup](#database-setup)
4. [Environment Variables](#environment-variables)
5. [Post-Deployment](#post-deployment)

---

## Backend Deployment

### Prerequisites
- MongoDB Atlas account (free tier available)
- Cloudinary account (free tier available)
- GitHub repository

### Option 1: Railway (Recommended)

**Why Railway?**
- ✅ Free tier with $5 monthly credit
- ✅ Automatic deploys from GitHub
- ✅ Easy environment variable management
- ✅ Built-in SSL certificates

**Steps:**

1. **Create Railway account**
   - Go to [railway.app](https://railway.app)
   - Sign in with GitHub

2. **Create new project**
   ```
   New Project → Deploy from GitHub repo → Select rize repo
   ```

3. **Configure service**
   - Select `backend` as root directory
   - Build command: `npm install && npm run build`
   - Start command: `npm start`

4. **Set environment variables**
   ```env
   NODE_ENV=production
   PORT=5000
   MONGODB_URI=<your-mongodb-atlas-uri>
   JWT_SECRET=<strong-secret-64-chars>
   JWT_REFRESH_SECRET=<strong-secret-64-chars>
   CLOUDINARY_CLOUD_NAME=<your-cloudinary-name>
   CLOUDINARY_API_KEY=<your-key>
   CLOUDINARY_API_SECRET=<your-secret>
   ```

5. **Deploy**
   - Railway auto-deploys on push to main
   - Get your URL: `https://your-app.railway.app`

6. **Custom domain (optional)**
   - Settings → Domains → Add custom domain
   - Update DNS records as shown

**Cost:** Free tier ($5/month credit) sufficient for early stage

---

### Option 2: Render

**Steps:**

1. **Create Render account**
   - Go to [render.com](https://render.com)
   - Sign in with GitHub

2. **Create new Web Service**
   ```
   New → Web Service → Connect repository
   ```

3. **Configure**
   - Name: `rize-api`
   - Root Directory: `backend`
   - Environment: `Node`
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`

4. **Environment variables**
   - Add same variables as Railway (see above)

5. **Deploy**
   - Click "Create Web Service"
   - Auto-deploys on git push

**Cost:** Free tier available (sleeps after inactivity)

---

### Option 3: Heroku

**Steps:**

1. **Install Heroku CLI**
   ```bash
   # Windows (PowerShell as Admin)
   winget install Heroku.HerokuCLI
   
   # Verify
   heroku --version
   ```

2. **Login and create app**
   ```bash
   heroku login
   heroku create rize-api
   ```

3. **Set environment variables**
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set MONGODB_URI=<your-uri>
   heroku config:set JWT_SECRET=<secret>
   heroku config:set JWT_REFRESH_SECRET=<secret>
   heroku config:set CLOUDINARY_CLOUD_NAME=<name>
   heroku config:set CLOUDINARY_API_KEY=<key>
   heroku config:set CLOUDINARY_API_SECRET=<secret>
   ```

4. **Deploy**
   ```bash
   git subtree push --prefix backend heroku main
   ```

**Cost:** ~$7/month for Eco dynos

---

## Mobile Deployment

### iOS (TestFlight)

**Prerequisites:**
- macOS with Xcode installed
- Apple Developer account ($99/year)
- EAS CLI installed

**Steps:**

1. **Install EAS CLI**
   ```bash
   npm install -g eas-cli
   ```

2. **Login to Expo**
   ```bash
   cd mobile
   eas login
   ```

3. **Configure EAS**
   ```bash
   eas build:configure
   ```

   This creates `eas.json`:
   ```json
   {
     "build": {
       "production": {
         "ios": {
           "distribution": "store",
           "autoIncrement": true
         }
       }
     }
   }
   ```

4. **Update app.json**
   ```json
   {
     "expo": {
       "ios": {
         "bundleIdentifier": "com.rize.app",
         "buildNumber": "1.0.0"
       }
     }
   }
   ```

5. **Build for TestFlight**
   ```bash
   eas build --platform ios --profile production
   ```

6. **Submit to TestFlight**
   ```bash
   eas submit --platform ios
   ```

7. **Configure in App Store Connect**
   - Go to [appstoreconnect.apple.com](https://appstoreconnect.apple.com)
   - Select your app → TestFlight
   - Add testers and distribute

**Cost:** $99/year (Apple Developer Program)

---

### Android (Play Store Internal Testing)

**Prerequisites:**
- Google Play Console account ($25 one-time fee)
- EAS CLI installed

**Steps:**

1. **Configure Android build**
   
   Update `eas.json`:
   ```json
   {
     "build": {
       "production": {
         "android": {
           "buildType": "apk",
           "gradleCommand": ":app:assembleRelease"
         }
       }
     }
   }
   ```

2. **Update app.json**
   ```json
   {
     "expo": {
       "android": {
         "package": "com.rize.app",
         "versionCode": 1
       }
     }
   }
   ```

3. **Build APK/AAB**
   ```bash
   cd mobile
   eas build --platform android --profile production
   ```

4. **Create app in Play Console**
   - Go to [play.google.com/console](https://play.google.com/console)
   - Create Application → Fill in details

5. **Upload to Internal Testing**
   ```bash
   eas submit --platform android
   ```

   Or manually:
   - Download APK/AAB from EAS
   - Upload to Play Console → Internal Testing

6. **Add testers**
   - Release → Internal Testing → Create release
   - Add tester emails
   - Send invite link

**Cost:** $25 one-time (Google Play Developer fee)

---

## Database Setup

### MongoDB Atlas (Production)

1. **Create production cluster**
   - Separate from development cluster
   - Choose region closest to your backend server

2. **Configure security**
   ```
   Security → Network Access → Add IP Address
   - Add backend server IP (or 0.0.0.0/0 temporarily)
   
   Security → Database Access → Add User
   - Create production user with read/write access
   - Use strong password (64+ chars)
   ```

3. **Get connection string**
   ```
   Deployment → Database → Connect → Connect your application
   
   Copy URI:
   mongodb+srv://prod_user:STRONG_PASSWORD@cluster.xxx.mongodb.net/rize_prod?retryWrites=true&w=majority
   ```

4. **Backup strategy**
   - Atlas free tier includes basic backups
   - For M10+: Configure automated snapshots

---

## Environment Variables

### Backend Production Variables

```env
# Server
NODE_ENV=production
PORT=5000

# Database
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/rize_prod

# JWT - MUST be different from development
JWT_SECRET=<generate-new-64-char-secret>
JWT_REFRESH_SECRET=<generate-new-64-char-secret>

# Cloudinary - Production account
CLOUDINARY_CLOUD_NAME=<prod-cloud-name>
CLOUDINARY_API_KEY=<prod-key>
CLOUDINARY_API_SECRET=<prod-secret>

# Optional
SENTRY_DSN=<your-sentry-dsn>
MIXPANEL_TOKEN=<your-token>
```

**Generate production secrets:**
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### Mobile Production Variables

Update `.env` or use EAS secrets:

```env
EXPO_PUBLIC_API_URL=https://your-api.railway.app/api
EXPO_PUBLIC_ENV=production
```

**EAS Secrets:**
```bash
eas secret:create --name EXPO_PUBLIC_API_URL --value https://your-api.railway.app/api
eas secret:create --name EXPO_PUBLIC_ENV --value production
```

---

## Post-Deployment

### 1. Seed Production Database

```bash
# SSH into backend or run locally pointing to prod DB
npm run seed
```

### 2. Test API

```bash
# Health check
curl https://your-api.railway.app/health

# Create user
curl -X POST https://your-api.railway.app/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@prod.com","username":"testuser","password":"Test1234"}'
```

### 3. Test Mobile App

1. Update mobile `.env` to point to production API
2. Test full flow: register → login → create workout
3. Verify data appears in MongoDB Atlas

### 4. Monitor

**Backend:**
- Railway/Render dashboard for logs
- Setup Sentry for error tracking
- Monitor MongoDB Atlas metrics

**Mobile:**
- Expo dashboard for crash reports
- TestFlight/Play Console analytics

### 5. CI/CD

GitHub Actions are already configured (see `.github/workflows/`):
- Automatic tests on PR
- Type checking and linting
- Coverage reports

**Optional: Auto-deploy**

Railway and Render auto-deploy on push to `main`.

For manual control:
```bash
# Only deploy on specific branch
git push production main:main
```

---

## Troubleshooting

### Backend won't start
- ✅ Check environment variables are set
- ✅ Verify MongoDB URI is correct
- ✅ Check logs in Railway/Render dashboard
- ✅ Ensure PORT is correct (Railway auto-sets)

### Database connection fails
- ✅ Whitelist server IP in MongoDB Atlas
- ✅ Check database user permissions
- ✅ Verify connection string format
- ✅ Test connection locally with production URI

### Mobile app can't connect to API
- ✅ Verify API URL in mobile .env
- ✅ Check API is actually running (health endpoint)
- ✅ Ensure CORS is enabled for production domain
- ✅ Check SSL certificate (use https://)

### Build fails on EAS
- ✅ Check eas.json configuration
- ✅ Verify app.json bundle identifiers
- ✅ Ensure all dependencies are in package.json
- ✅ Check EAS build logs for specific errors

---

## Cost Summary

### Minimal Setup (Free/Low Cost)
- MongoDB Atlas: **Free** (M0 cluster)
- Cloudinary: **Free** (25 GB storage)
- Railway: **Free** ($5/month credit)
- **Total: $0/month** (within free tiers)

### Full Production
- MongoDB Atlas M10: **$57/month**
- Cloudinary Pro: **$89/month**
- Railway: **~$20/month** (depending on usage)
- Apple Developer: **$99/year**
- Google Play: **$25 one-time**
- **Total: ~$166/month + $99/year**

### Recommended Start
- Use free tiers for MVP
- Scale up as user base grows
- Monitor costs in each platform's dashboard

---

## Next Steps

1. ✅ Deploy backend to Railway/Render
2. ✅ Configure production MongoDB
3. ✅ Update mobile app with production API URL
4. ✅ Build and submit to TestFlight/Play Store
5. ✅ Invite beta testers
6. ✅ Gather feedback and iterate
7. 🚀 Public launch!

---

## Additional Resources

- [Railway Docs](https://docs.railway.app/)
- [Render Docs](https://render.com/docs)
- [EAS Build](https://docs.expo.dev/build/introduction/)
- [MongoDB Atlas](https://docs.atlas.mongodb.com/)
- [App Store Connect](https://developer.apple.com/app-store-connect/)
- [Google Play Console](https://support.google.com/googleplay/android-developer)

---

**Need help?** Check existing docs or create an issue in the GitHub repo.
