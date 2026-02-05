import { Stack, useRouter, useSegments } from 'expo-router';
import '../global.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuthStore } from '@/stores/authStore';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { ToastProvider } from '@/contexts/ToastContext';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { AuthProvider } from '@/components/AuthProvider';
import { NotificationProvider } from '@/components/NotificationProvider';
import { SocketProvider } from '@/components/SocketProvider';
import { SyncProvider } from '@/components/SyncProvider';

import { 
  useFonts, 
  Inter_400Regular, 
  Inter_500Medium, 
  Inter_600SemiBold 
} from '@expo-google-fonts/inter';
import { 
  Poppins_400Regular, 
  Poppins_600SemiBold, 
  Poppins_700Bold 
} from '@expo-google-fonts/poppins';
import { 
  Montserrat_400Regular, 
  Montserrat_500Medium, 
  Montserrat_600SemiBold 
} from '@expo-google-fonts/montserrat';

// Prevent splash screen from hiding automatically
SplashScreen.preventAutoHideAsync();

const ONBOARDING_KEY = '@rize_onboarding_completed';

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
  const [onboardingCompleted, setOnboardingCompleted] = useState<boolean | null>(null);

  // Load new standard fonts: Poppins (Heading), Inter (Body), Montserrat (Accent)
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
  });

  // Initialize auth and check onboarding on mount
  useEffect(() => {
    const init = async () => {
      initAuth();
      const completed = await AsyncStorage.getItem(ONBOARDING_KEY);
      setOnboardingCompleted(completed === 'true');
    };
    init();
  }, [initAuth]);

  useEffect(() => {
    if (fontsLoaded && !isLoading && onboardingCompleted !== null) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, isLoading, onboardingCompleted]);

  // Handle auth routing
  useEffect(() => {
    if (isLoading || !fontsLoaded) return;

    const inTabsGroup = segments[0] === '(tabs)';
    // Also consider the root index as effectively an auth route check point, usually handled by index.tsx, 
    // but we want to prevent accessing auth screens if logged in.
    const inAuthRoute = segments[0] === 'login' || segments[0] === 'register' || (segments[0] === 'auth');

    if (isAuthenticated && inAuthRoute) {
      router.replace('/(tabs)');
    } else if (!isAuthenticated && inTabsGroup) {
      router.replace('/login');
    }
  }, [isAuthenticated, segments, isLoading, fontsLoaded]);

  if (!fontsLoaded || isLoading || onboardingCompleted === null) {
    return null;
  }

  return (
    <ErrorBoundary>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>
            <ToastProvider>
              <AuthProvider>
                <NotificationProvider>
                  <SocketProvider>
                    <SyncProvider>
                    <Stack screenOptions={{ headerShown: false }}>
                      <Stack.Screen name="(tabs)" />
                      <Stack.Screen name="onboarding" />
                      <Stack.Screen name="login" />
                      <Stack.Screen name="register" />
                      <Stack.Screen name="auth/login" options={{ headerShown: false }} />
                      <Stack.Screen name="auth/register" options={{ headerShown: false }} />
                      <Stack.Screen name="auth/forgot-password" options={{ headerShown: false }} />
                      <Stack.Screen name="auth/onboarding" options={{ headerShown: false }} />
                      <Stack.Screen name="index" options={{ headerShown: false }} />
                    </Stack>
                    </SyncProvider>
              </SocketProvider>
              </NotificationProvider>
              </AuthProvider>
            </ToastProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </GestureHandlerRootView>
    </ErrorBoundary>
  );
}
