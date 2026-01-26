# Fuentes RIZE

Esta carpeta contiene las fuentes personalizadas para la aplicación RIZE.

## Fuentes Incluidas

### Barlow (Headings)
- **Barlow-Bold.ttf** - Peso 700 (títulos principales)
- **Barlow-SemiBold.ttf** - Peso 600 (subtítulos)
- **Barlow-Medium.ttf** - Peso 500 (encabezados secundarios)

### Inter (Body Text)
- **Inter-Regular.ttf** - Peso 400 (texto normal)
- **Inter-Medium.ttf** - Peso 500 (texto destacado)
- **Inter-SemiBold.ttf** - Peso 600 (énfasis)

## Descarga de Fuentes

Si las fuentes no están presentes, descárgalas de:

**Barlow:**
- Google Fonts: https://fonts.google.com/specimen/Barlow
- Selecciona pesos: Medium (500), SemiBold (600), Bold (700)

**Inter:**
- Google Fonts: https://fonts.google.com/specimen/Inter
- Selecciona pesos: Regular (400), Medium (500), SemiBold (600)

## Instalación Manual

1. Descarga las fuentes desde Google Fonts
2. Coloca los archivos `.ttf` en esta carpeta (`mobile/assets/fonts/`)
3. Asegúrate de que los nombres coincidan exactamente:
   ```
   Barlow-Bold.ttf
   Barlow-SemiBold.ttf
   Barlow-Medium.ttf
   Inter-Regular.ttf
   Inter-Medium.ttf
   Inter-SemiBold.ttf
   ```

## Uso en la App

Las fuentes se cargan automáticamente en `app/_layout.tsx` usando `expo-font`:

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

## Uso con NativeWind

Las fuentes están configuradas en `tailwind.config.js`:

```javascript
fontFamily: {
  'barlow-bold': ['Barlow-Bold'],
  'barlow-semibold': ['Barlow-SemiBold'],
  'barlow-medium': ['Barlow-Medium'],
  'inter-regular': ['Inter-Regular'],
  'inter-medium': ['Inter-Medium'],
  'inter-semibold': ['Inter-SemiBold'],
}
```

Úsalas con clases Tailwind:

```tsx
<Text className="font-barlow-bold text-3xl">Título</Text>
<Text className="font-inter-regular text-base">Texto normal</Text>
```
