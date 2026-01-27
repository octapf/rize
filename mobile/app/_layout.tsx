import { Stack, useRouter, useSegments } from 'expo-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuthStore } from '@/stores/authStore';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { ToastProvider } from '@/contexts/ToastContext';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { AuthProvider } from '@/components/AuthProvider';
import { NotificationProvider } from '@/components/NotificationProvider';

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

  // Initialize auth and check onboarding on mount
  useEffect(() => {
    const init = async () => {
      initAuth();
      const completed = await AsyncStorage.getItem(ONBOARDING_KEY);
      setOnboardingCompleted(completed === 'true');
    };
    init();
  }, []);

  useEffect(() => {
    if (fontsLoaded && !isLoading && onboardingCompleted !== null) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, isLoading, onboardingCompleted]);

  // Handle auth routing with onboarding
  useEffect(() => {
    if (isLoading || !fontsLoaded || onboardingCompleted === null) return;

    const inAuthGroup = segments[0] === '(tabs)';
    const inOnboarding = segments[0] === 'onboarding';

    // Show onboarding if not completed and not authenticated
    if (!onboardingCompleted && !isAuthenticated && !inOnboarding) {
      router.replace('/onboarding');
      return;
    }

    if (!isAuthenticated && inAuthGroup) {
      router.replace('/login');
    } else if (isAuthenticated && !inAuthGroup && !inOnboarding) {
      router.replace('/(tabs)');
    }
  }, [isAuthenticated, segments, isLoading, fontsLoaded, onboardingCompleted]);

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
                  <Stack screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="(tabs)" />
                <Stack.Screen name="onboarding" />
                <Stack.Screen name="login" />
                <Stack.Screen name="register" />
                <Stack.Screen name="workouts/create" />
                <Stack.Screen name="workouts/[id]" />
                <Stack.Screen name="workouts/active" />
                <Stack.Screen name="workouts/configure-sets" />
                <Stack.Screen name="exercises/library" />
                <Stack.Screen name="exercises/create" />
                <Stack.Screen name="exercises/my" />
                <Stack.Screen name="achievements/index" />
                <Stack.Screen name="badges/index" />
                <Stack.Screen name="progress/index" />
                <Stack.Screen name="routines/index" />
                <Stack.Screen name="exercises/[exerciseId]/progress" />
                <Stack.Screen name="exercises/create-custom" />
                <Stack.Screen name="workouts/create-template" />
                <Stack.Screen name="workouts/[workoutId]/details" />
                <Stack.Screen name="rankings/index" />
                <Stack.Screen name="achievements/[achievementId]/details" />
                <Stack.Screen name="community/feed" />
                <Stack.Screen name="workouts/quick-start" />
                <Stack.Screen name="settings/shortcuts" />
                <Stack.Screen name="settings/index" />
                <Stack.Screen name="timer/index" />
                <Stack.Screen name="stats/log-weight" />
                <Stack.Screen name="challenges/index" />
                <Stack.Screen name="exercises/library" />
                <Stack.Screen name="records/index" />
                <Stack.Screen name="workouts/history" />
                <Stack.Screen name="workouts/active" />
                <Stack.Screen name="friends/index" />
                <Stack.Screen name="users/[id]" />
                <Stack.Screen name="routines/index" />
                <Stack.Screen name="stats/measurements" />
                <Stack.Screen name="search/index" />
                <Stack.Screen name="profile/edit" />
                <Stack.Screen name="exercises/[id]" />
                <Stack.Screen name="workouts/templates" />
                <Stack.Screen name="achievements/index" />
                <Stack.Screen name="nutrition/index" />
                <Stack.Screen name="messages/index" />
                <Stack.Screen name="auth/login" options={{ headerShown: false }} />
                <Stack.Screen name="auth/register" options={{ headerShown: false }} />
                <Stack.Screen name="auth/forgot-password" options={{ headerShown: false }} />
                <Stack.Screen name="auth/onboarding" options={{ headerShown: false }} />
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="chat/[id]" />
                <Stack.Screen name="tools/plate-calculator" />
                <Stack.Screen name="workouts/share/[id]" />
                <Stack.Screen name="social/feed" />
                <Stack.Screen name="stats/dashboard" />
                <Stack.Screen name="notifications/list" />
                <Stack.Screen name="tools/index" />
                <Stack.Screen name="goals/index" />
                <Stack.Screen name="calendar/index" />
                <Stack.Screen name="notifications/index" />
                <Stack.Screen name="challenges/index" />
                <Stack.Screen name="challenges/create" />
                <Stack.Screen name="settings/index" />
                <Stack.Screen name="social/friends" />
                <Stack.Screen name="social/search" />
                <Stack.Screen name="workouts/history" />
                <Stack.Screen name="users/[userId]" />
              </Stack>
              </NotificationProvider>
              </AuthProvider>
            </ToastProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </GestureHandlerRootView>
    </ErrorBoundary>
  );
}
