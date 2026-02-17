# Fuentes RIZE

Esta carpeta contiene las fuentes personalizadas para la aplicación RIZE.

## Fuentes Incluidas

### Poppins (Headings)
- **Poppins-Bold** - Peso 700 (títulos principales)
- **Poppins-SemiBold** - Peso 600 (subtítulos)

### Inter (Body Text)
- **Inter-Regular** - Peso 400 (texto normal)
- **Inter-Medium** - Peso 500 (texto destacado)
- **Inter-SemiBold** - Peso 600 (énfasis)

### Montserrat (Labels)
- **Montserrat-Medium** - Peso 500 (etiquetas)
- **Montserrat-SemiBold** - Peso 600 (etiquetas destacadas)

## Carga de Fuentes

La app usa `@expo-google-fonts` en `app/_layout.tsx`:
- `@expo-google-fonts/poppins`
- `@expo-google-fonts/inter`
- `@expo-google-fonts/montserrat`

## Uso con NativeWind

Las fuentes están configuradas en `tailwind.config.js`:

```javascript
fontFamily: {
  'heading': ['Poppins_700Bold'],
  'heading-semibold': ['Poppins_600SemiBold'],
  'body': ['Inter_400Regular'],
  'label': ['Montserrat_500Medium'],
}
```

Úsalas con clases Tailwind:

```tsx
<Text className="font-heading text-3xl">Título</Text>
<Text className="font-body text-base">Texto normal</Text>
<Text className="font-label text-xs uppercase">Label</Text>
```
