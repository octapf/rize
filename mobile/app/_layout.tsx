import { Stack, useRouter, useSegments } from 'expo-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { useAuthStore } from '@/stores/authStore';

// Prevent splash screen from hiding automatically
SplashScreen.preventAutoHideAsync();

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments();
  const { isAuthenticated, isLoading, initAuth } = useAuthStore();

  // Comentado temporalmente hasta descargar fuentes
  const fontsLoaded = true;
  /*
  const [fontsLoaded] = useFonts({
    'Barlow-Bold': require('../assets/fonts/Barlow-Bold.ttf'),
    'Barlow-SemiBold': require('../assets/fonts/Barlow-SemiBold.ttf'),
    'Barlow-Medium': require('../assets/fonts/Barlow-Medium.ttf'),
    'Inter-Regular': require('../assets/fonts/Inter-Regular.ttf'),
    'Inter-Medium': require('../assets/fonts/Inter-Medium.ttf'),
    'Inter-SemiBold': require('../assets/fonts/Inter-SemiBold.ttf'),
  });
  */

  // Initialize auth on mount
  useEffect(() => {
    initAuth();
  }, []);

  useEffect(() => {
    if (fontsLoaded && !isLoading) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, isLoading]);

  // Handle auth routing
  useEffect(() => {
    if (isLoading || !fontsLoaded) return;

    const inAuthGroup = segments[0] === '(tabs)';

    if (!isAuthenticated && inAuthGroup) {
      router.replace('/login');
    } else if (isAuthenticated && !inAuthGroup) {
      router.replace('/(tabs)');
    }
  }, [isAuthenticated, segments, isLoading, fontsLoaded]);

  if (!fontsLoaded || isLoading) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="login" />
          <Stack.Screen name="register" />
          <Stack.Screen name="workouts/create" />
          <Stack.Screen name="workouts/[id]" />
          <Stack.Screen name="workouts/active" />
          <Stack.Screen name="workouts/configure-sets" />
          <Stack.Screen name="exercises/library" />
          <Stack.Screen name="achievements/index" />
        </Stack>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
