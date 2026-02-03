# Font Installation Guide for RIZE Mobile

This guide helps you install the required fonts (Barlow and Inter) for the RIZE mobile app.

## 📋 Required Fonts

### Barlow (Headings)
- **Barlow-Bold.ttf** - Weight 700 (main titles)
- **Barlow-SemiBold.ttf** - Weight 600 (subtitles)
- **Barlow-Medium.ttf** - Weight 500 (secondary headings)

### Inter (Body Text)
- **Inter-Regular.ttf** - Weight 400 (normal text)
- **Inter-Medium.ttf** - Weight 500 (emphasized text)
- **Inter-SemiBold.ttf** - Weight 600 (strong emphasis)

---

## 🚀 Quick Install

### Option 1: Automatic Download (Recommended)

Run the font installer script:

```bash
cd mobile
npm run install-fonts
```

This will automatically download the required fonts from Google Fonts and place them in `assets/fonts/`.

### Option 2: Manual Download

#### Download Barlow
1. Visit: https://fonts.google.com/specimen/Barlow
2. Click "Download family"
3. Extract the ZIP file
4. Copy these files to `mobile/assets/fonts/`:
   - `static/Barlow-Medium.ttf`
   - `static/Barlow-SemiBold.ttf`
   - `static/Barlow-Bold.ttf`

#### Download Inter
1. Visit: https://fonts.google.com/specimen/Inter
2. Click "Download family"
3. Extract the ZIP file
4. Copy these files to `mobile/assets/fonts/`:
   - `static/Inter-Regular.ttf`
   - `static/Inter-Medium.ttf`
   - `static/Inter-SemiBold.ttf`

### Option 3: Direct Download Links

You can download individual fonts directly:

**Barlow:**
- [Barlow-Medium.ttf](https://github.com/JulietaUla/Barlow/raw/master/fonts/ttf/Barlow-Medium.ttf)
- [Barlow-SemiBold.ttf](https://github.com/JulietaUla/Barlow/raw/master/fonts/ttf/Barlow-SemiBold.ttf)
- [Barlow-Bold.ttf](https://github.com/JulietaUla/Barlow/raw/master/fonts/ttf/Barlow-Bold.ttf)

**Inter:**
- [Inter Variable Font](https://github.com/rsms/inter/releases/latest) - Download and extract the TTF files

---

## 📁 File Structure

After installation, your `mobile/assets/fonts/` directory should look like this:

```
mobile/assets/fonts/
├── Barlow-Bold.ttf
├── Barlow-SemiBold.ttf
├── Barlow-Medium.ttf
├── Inter-Regular.ttf
├── Inter-Medium.ttf
├── Inter-SemiBold.ttf
└── README.md
```

---

## ✅ Verification

### Check Files Exist

**Windows PowerShell:**
```powershell
cd mobile\assets\fonts
dir *.ttf
```

**macOS/Linux:**
```bash
cd mobile/assets/fonts
ls -la *.ttf
```

You should see all 6 font files listed.

### Enable Font Loading

Once fonts are installed, uncomment the font loading code in `mobile/app/_layout.tsx`:

**Before:**
```tsx
// Temporarily disabled
const fontsLoaded = true;
/*
const [fontsLoaded] = useFonts({
  'Barlow-Bold': require('../assets/fonts/Barlow-Bold.ttf'),
  ...
*/
```

**After:**
```tsx
const [fontsLoaded] = useFonts({
  'Barlow-Bold': require('../assets/fonts/Barlow-Bold.ttf'),
  'Barlow-SemiBold': require('../assets/fonts/Barlow-SemiBold.ttf'),
  'Barlow-Medium': require('../assets/fonts/Barlow-Medium.ttf'),
  'Inter-Regular': require('../assets/fonts/Inter-Regular.ttf'),
  'Inter-Medium': require('../assets/fonts/Inter-Medium.ttf'),
  'Inter-SemiBold': require('../assets/fonts/Inter-SemiBold.ttf'),
});
```

### Test the App

```bash
cd mobile
npm start
```

If fonts are properly installed, the app should start without errors. If you see font loading errors, double-check the file names match exactly.

---

## 🎨 Font Usage in Code

### Using Fonts with NativeWind

The fonts are configured in `tailwind.config.js` with custom font families:

```jsx
import { Text } from 'react-native';

// Headings (Barlow)
<Text className="font-heading-bold text-2xl">Main Title</Text>
<Text className="font-heading-semibold text-xl">Subtitle</Text>
<Text className="font-heading-medium text-lg">Section Header</Text>

// Body text (Inter)
<Text className="font-body">Regular text</Text>
<Text className="font-body-medium">Emphasized text</Text>
<Text className="font-body-semibold">Strong emphasis</Text>
```

### Custom Font Weights

Alternatively, use the `fontFamily` style directly:

```jsx
<Text style={{ fontFamily: 'Barlow-Bold', fontSize: 24 }}>
  Custom Heading
</Text>
```

---

## 🔧 Troubleshooting

### "Unable to resolve module" error

**Problem:** Metro bundler can't find font files.

**Solutions:**
1. Verify files are in `mobile/assets/fonts/` with exact names
2. Clear Metro cache: `npm start -- --clear`
3. Restart development server

### Fonts not loading on iOS

**Problem:** Fonts show as system default.

**Solutions:**
1. Ensure font files are .ttf format (not .otf)
2. Rebuild app: `npm run ios`
3. Check Xcode console for font loading errors

### Fonts not loading on Android

**Problem:** Fonts display incorrectly on Android.

**Solutions:**
1. Clear app data and cache
2. Rebuild app: `npm run android`
3. Check file names don't have spaces or special characters

### Wrong font weights displaying

**Problem:** Bold text shows as regular weight.

**Solutions:**
1. Ensure you have all 3 weights for each font family
2. Use specific font files instead of relying on fontWeight
3. Example: Use `fontFamily: 'Barlow-Bold'` not `fontFamily: 'Barlow', fontWeight: '700'`

---

## 🎯 Development Without Fonts (Temporary)

If you want to test the app before installing fonts, the code currently has a temporary fallback that uses system fonts:

```tsx
// In app/_layout.tsx
const fontsLoaded = true; // <-- This bypasses font loading
```

This lets you develop and test functionality while you download fonts later.

To use custom fonts, change this to:

```tsx
const [fontsLoaded] = useFonts({
  // ... font configuration
});
```

---

## 📚 Additional Resources

- [Google Fonts](https://fonts.google.com) - Download fonts
- [Expo Font Documentation](https://docs.expo.dev/versions/latest/sdk/font/) - Font loading guide
- [Barlow Font GitHub](https://github.com/JulietaUla/Barlow) - Source repository
- [Inter Font GitHub](https://github.com/rsms/inter) - Source repository

---

## 🤝 Font License Information

Both Barlow and Inter are **open source fonts** with permissive licenses:

- **Barlow**: [SIL Open Font License 1.1](https://scripts.sil.org/OFL)
- **Inter**: [SIL Open Font License 1.1](https://scripts.sil.org/OFL)

You can freely use them in commercial and personal projects.

---

**Next Steps:** After installing fonts, see [QUICKSTART.md](../QUICKSTART.md) to continue setup.
