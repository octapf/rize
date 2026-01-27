import { useEffect, ReactNode } from 'react';
import { router, useSegments, useRootNavigationState } from 'expo-router';
import { useAuthStore } from '@/stores/authStore';

export function AuthProvider({ children }: { children: ReactNode }) {
  const segments = useSegments();
  const navigationState = useRootNavigationState();
  const { user, isLoading } = useAuthStore();

  useEffect(() => {
    if (!navigationState?.key || isLoading) return;

    const inAuthGroup = segments[0] === 'auth';
    const inTabsGroup = segments[0] === '(tabs)';

    // User is not signed in
    if (!user && !inAuthGroup) {
      router.replace('/auth/login');
    }
    
    // User is signed in but in auth screens
    if (user && inAuthGroup) {
      router.replace('/(tabs)');
    }
  }, [user, segments, navigationState, isLoading]);

  return <>{children}</>;
}
