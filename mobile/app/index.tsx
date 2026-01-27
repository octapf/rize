import { useEffect } from 'react';
import { router } from 'expo-router';
import { View, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '@/stores/authStore';

export default function SplashScreen() {
  const { user, isLoading, checkAuth } = useAuthStore();

  useEffect(() => {
    const initialize = async () => {
      await checkAuth();
      
      // Wait a bit for splash effect
      await new Promise(resolve => setTimeout(resolve, 1500));

      if (user) {
        if (!user.onboardingCompleted) {
          router.replace('/auth/onboarding');
        } else {
          router.replace('/(tabs)');
        }
      } else {
        router.replace('/auth/login');
      }
    };

    initialize();
  }, []);

  return (
    <LinearGradient
      colors={['#3B82F6', '#2563EB']}
      className="flex-1 items-center justify-center"
    >
      <View className="items-center">
        <View className="w-32 h-32 bg-white rounded-3xl items-center justify-center mb-6 shadow-lg">
          <Ionicons name="fitness" size={64} color="#3B82F6" />
        </View>
        <View className="items-center mb-8">
          <View className="text-white text-5xl font-bold mb-2">
            <Ionicons name="fitness" size={0} color="transparent" />
          </View>
        </View>
        <ActivityIndicator size="large" color="white" />
      </View>
    </LinearGradient>
  );
}
