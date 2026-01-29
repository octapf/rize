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
import { SocketProvider } from '@/components/SocketProvider';

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
                  <SocketProvider>
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
                <Stack.Screen name="social/share-workout" />
                <Stack.Screen name="social/training-partners" />
                <Stack.Screen name="stats/dashboard" />
                <Stack.Screen name="notifications/list" />
                <Stack.Screen name="tools/index" />
                <Stack.Screen name="tools/one-rep-max" />
                <Stack.Screen name="tools/tdee" />
                <Stack.Screen name="tools/body-fat" />
                <Stack.Screen name="tools/macros" />
                <Stack.Screen name="tools/rest-timer" />
                <Stack.Screen name="workouts/templates" />
                <Stack.Screen name="profile/index" />
                <Stack.Screen name="progress/photos-comparison" />
                <Stack.Screen name="rankings/leaderboard" />
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
                <Stack.Screen name="exercises/index" />
                <Stack.Screen name="workout/active" />
                <Stack.Screen name="workout/summary" />
                <Stack.Screen name="nutrition/meal-plan" />
                <Stack.Screen name="programs/index" />
                <Stack.Screen name="stats/body-measurements" />
                <Stack.Screen name="videos/tutorial" />
                <Stack.Screen name="videos/library" />
                <Stack.Screen name="videos/form-check" />
                <Stack.Screen name="features/gym-finder" />
                <Stack.Screen name="features/voice-commands" />
                <Stack.Screen name="integrations/index" />
                <Stack.Screen name="integrations/data-export" />
                <Stack.Screen name="coaching/index" />
                <Stack.Screen name="nutrition/calorie-counter" />
                <Stack.Screen name="nutrition/barcode-scanner" />
                <Stack.Screen name="nutrition/photo-analyzer" />
                <Stack.Screen name="stats/advanced-analytics" />
                <Stack.Screen name="recovery/injuries" />
                <Stack.Screen name="nutrition/advanced-plan" />
                <Stack.Screen name="settings/backup" />
                <Stack.Screen name="settings/premium" />
                <Stack.Screen name="gamification/index" />
                <Stack.Screen name="competitions/index" />
                <Stack.Screen name="marketplace/routines" />
                <Stack.Screen name="referrals/index" />
                <Stack.Screen name="offline/index" />
                <Stack.Screen name="tools/plate-calculator" />
                <Stack.Screen name="tools/training-max" />
                <Stack.Screen name="templates/workout-library" />
                <Stack.Screen name="templates/template-builder" />
                <Stack.Screen name="database/exercise-database" />
                <Stack.Screen name="database/muscle-explorer" />
                <Stack.Screen name="journal/training-notes" />
                <Stack.Screen name="journal/workout-journal" />
                <Stack.Screen name="progression/overload-tracker" />
                <Stack.Screen name="progression/auto-progression" />
                <Stack.Screen name="analysis/workout-comparison" />
                <Stack.Screen name="analysis/historical-analysis" />
                <Stack.Screen name="recomp/body-recomposition" />
                <Stack.Screen name="recomp/cutting-bulking" />
                <Stack.Screen name="supplements/timing-guide" />
                <Stack.Screen name="supplements/workout-stacks" />
                <Stack.Screen name="warmup/dynamic-warmup" />
                <Stack.Screen name="warmup/cooldown-routines" />
                <Stack.Screen name="optimizer/split-optimizer" />
                <Stack.Screen name="optimizer/recovery-balance" />
                <Stack.Screen name="injury/prevention-guide" />
                <Stack.Screen name="injury/mobility-assessment" />
                <Stack.Screen name="nutrition/macros-calculator" />
                <Stack.Screen name="nutrition/meal-timing" />
                <Stack.Screen name="timers/workout-timer" />
                <Stack.Screen name="timers/rest-timer" />
                <Stack.Screen name="benchmarks/strength-standards" />
                <Stack.Screen name="benchmarks/performance-benchmarks" />
                <Stack.Screen name="cardio/cardio-protocols" />
                <Stack.Screen name="cardio/hiit-templates" />
                <Stack.Screen name="recovery/deload-protocol" />
                <Stack.Screen name="recovery/fatigue-management" />
                <Stack.Screen name="technique/form-cues" />
                <Stack.Screen name="technique/common-mistakes" />
                <Stack.Screen name="technique/video-analysis" />
                <Stack.Screen name="technique/self-coaching" />
                <Stack.Screen name="programming/periodization-plans" />
                <Stack.Screen name="programming/training-cycles" />
                <Stack.Screen name="goals/goal-setting" />
                <Stack.Screen name="goals/progress-milestones" />
                <Stack.Screen name="habits/habit-tracker" />
                <Stack.Screen name="habits/consistency-metrics" />
                <Stack.Screen name="mindset/mental-training" />
                <Stack.Screen name="mindset/motivation-strategies" />
                <Stack.Screen name="physique/body-composition" />
                <Stack.Screen name="physique/muscle-building" />
                <Stack.Screen name="planning/workout-planner" />
                <Stack.Screen name="planning/exercise-substitutions" />
                <Stack.Screen name="assessment/performance-testing" />
                <Stack.Screen name="assessment/movement-screening" />
                <Stack.Screen name="supplements/guide" />
                <Stack.Screen name="supplements/timing" />
                <Stack.Screen name="advanced/training-techniques" />
                <Stack.Screen name="advanced/auto-regulation" />
                <Stack.Screen name="advanced/accommodating-resistance" />
                <Stack.Screen name="tracking/pr-tracker" />
                <Stack.Screen name="tracking/volume-tracker" />
                <Stack.Screen name="compete/competition-prep" />
                <Stack.Screen name="compete/attempt-selection" />
                <Stack.Screen name="compete/weigh-in-strategy" />
                <Stack.Screen name="compete/peak-week" />
                <Stack.Screen name="compete/meet-day-checklist" />
                <Stack.Screen name="compete/post-comp-recovery" />
                <Stack.Screen name="education/biomechanics" />
                <Stack.Screen name="education/exercise-library" />
                <Stack.Screen name="education/training-philosophy" />
                <Stack.Screen name="education/common-mistakes" />
                <Stack.Screen name="coaching/personal" />
                <Stack.Screen name="ai/recommendations" />
                <Stack.Screen name="social/challenges" />
                <Stack.Screen name="social/leaderboards" />
                <Stack.Screen name="music/integration" />
                <Stack.Screen name="equipment/tracker" />
                <Stack.Screen name="progress/advanced" />
                <Stack.Screen name="habits/tracker" />
                <Stack.Screen name="supplements/tracker" />
                <Stack.Screen name="training/splits" />
                <Stack.Screen name="training/periodization" />
                <Stack.Screen name="training/deload" />
                <Stack.Screen name="training/warmup" />
                <Stack.Screen name="training/mobility" />
                <Stack.Screen name="recovery/tracking" />
                <Stack.Screen name="recovery/injury-prevention" />
                <Stack.Screen name="recovery/techniques" />
                <Stack.Screen name="competition/powerlifting-guide" />
                <Stack.Screen name="competition/peaking-protocol" />
                <Stack.Screen name="equipment/lifting-gear" />
                <Stack.Screen name="equipment/gym-setup" />
                <Stack.Screen name="integrations/wearables" />
                <Stack.Screen name="integrations/healthkit" />
                <Stack.Screen name="workouts/advanced-builder" />
                <Stack.Screen name="nutrition/meal-planning" />
                <Stack.Screen name="progress/transformation" />
                <Stack.Screen name="testing/performance" />
                <Stack.Screen name="programs/custom" />
                <Stack.Screen name="classes/virtual" />
                <Stack.Screen name="workouts/sharing" />
                <Stack.Screen name="recovery/protocols" />
                <Stack.Screen name="recovery/mobility-programs" />
                <Stack.Screen name="achievements/badges" />
                <Stack.Screen name="measurements/body" />
                <Stack.Screen name="analysis/form" />
                <Stack.Screen name="reminders/workouts" />
                <Stack.Screen name="library/exercises" />
                <Stack.Screen name="nutrition/macros" />
                <Stack.Screen name="templates/goals" />
                <Stack.Screen name="challenges/group" />
                <Stack.Screen name="music/playlists" />
                <Stack.Screen name="progress/dashboard" />
                <Stack.Screen name="settings/app" />
                <Stack.Screen name="health/injuries" />
                <Stack.Screen name="health/injury-prevention" />
                <Stack.Screen name="supplements/stacks" />
                <Stack.Screen name="records/personal" />
                <Stack.Screen name="tutorials/videos" />
                <Stack.Screen name="scheduling/smart" />
                <Stack.Screen name="quests/daily" />
                <Stack.Screen name="community/forum" />
                <Stack.Screen name="exercises/variations" />
                <Stack.Screen name="nutrition/hydration" />
                <Stack.Screen name="nutrition/planning" />
                <Stack.Screen name="gallery/transformation" />
                <Stack.Screen name="analytics/history" />
                <Stack.Screen name="analytics/form-analysis" />
                <Stack.Screen name="analytics/pr-dashboard" />
                <Stack.Screen name="analytics/trend-analysis" />
                <Stack.Screen name="analytics/performance-insights" />
                <Stack.Screen name="health/sleep" />
                <Stack.Screen name="reports/weekly" />
                <Stack.Screen name="rest/activities" />
                <Stack.Screen name="equipment/alternatives" />
                <Stack.Screen name="health/recovery" />
                <Stack.Screen name="location/gyms" />
                <Stack.Screen name="data/export-import" />
                <Stack.Screen name="data/cloud-backup" />
                <Stack.Screen name="workouts/builder" />
                <Stack.Screen name="calculators/one-rm" />
                <Stack.Screen name="calculators/macros" />
                <Stack.Screen name="calculators/bodyfat" />
                <Stack.Screen name="calculators/plates" />
                <Stack.Screen name="calculators/macros" />
                <Stack.Screen name="calculators/one-rep-max" />
                <Stack.Screen name="programs/splits" />
                <Stack.Screen name="programs/split-generator" />
                <Stack.Screen name="programs/deload" />
                <Stack.Screen name="programs/periodization" />
                <Stack.Screen name="programs/deload-planner" />
                <Stack.Screen name="programs/mobility" />
                <Stack.Screen name="timers/emom" />
                <Stack.Screen name="timers/tabata" />
                <Stack.Screen name="tests/fitness" />
                <Stack.Screen name="routines/warmup" />
                <Stack.Screen name="routines/cooldown" />
                <Stack.Screen name="tools/strength-standards" />
                <Stack.Screen name="tools/timer" />
                <Stack.Screen name="tracking/measurements" />
                <Stack.Screen name="tracking/habits" />
                <Stack.Screen name="tracking/prs" />
                <Stack.Screen name="tracking/progress-photos" />
                <Stack.Screen name="tracking/cardio" />
                <Stack.Screen name="tracking/injuries" />
                <Stack.Screen name="tracking/workout-history" />
                <Stack.Screen name="tracking/sleep" />
                <Stack.Screen name="tracking/body-composition" />
                <Stack.Screen name="tracking/journal" />
                <Stack.Screen name="tracking/measurements" />
                <Stack.Screen name="tracking/rpe" />
                <Stack.Screen name="tracking/personal-records" />
                <Stack.Screen name="tracking/progress-photos" />
                <Stack.Screen name="tracking/habits-v2" />
                <Stack.Screen name="tracking/challenges" />
                <Stack.Screen name="tracking/recovery-score" />
                <Stack.Screen name="nutrition/meal-planner" />
                <Stack.Screen name="nutrition/meal-prep" />
                <Stack.Screen name="nutrition/supplements" />
                <Stack.Screen name="nutrition/water" />
                <Stack.Screen name="nutrition/nutrient-timing" />
                <Stack.Screen name="nutrition/supplement-tracker" />
                <Stack.Screen name="programs/templates" />
                <Stack.Screen name="programs/schedule" />
                <Stack.Screen name="programs/warmup-generator" />
                <Stack.Screen name="programs/workout-templates" />
                <Stack.Screen name="programs/dynamic-warmup" />
                <Stack.Screen name="tools/goals" />
                <Stack.Screen name="tools/rest-timer" />
                <Stack.Screen name="tools/exercise-database" />
                <Stack.Screen name="tools/transformation-goals" />
                <Stack.Screen name="tools/workout-comparison" />
                <Stack.Screen name="tools/exercise-substitutions" />
                <Stack.Screen name="tools/form-check" />
                <Stack.Screen name="tools/pre-workout-checklist" />
                <Stack.Screen name="tools/body-composition" />
                <Stack.Screen name="tools/cardio-zones" />
                <Stack.Screen name="tools/workout-music" />
                <Stack.Screen name="tools/motivation-quotes" />
                <Stack.Screen name="library/exercises" />
                <Stack.Screen name="social/achievements-leaderboard" />
              </Stack>
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
