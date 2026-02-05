import React from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useDashboardStats, useStreak } from '@/hooks/useStats';
import { Card } from '@/components/ui/Card';

export default function StatsScreen() {
  const { data: dashboardData, isLoading } = useDashboardStats();
  const { data: streakData } = useStreak();

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    if (hours > 0) return `${hours}h ${mins}m`;
    return `${mins}m`;
  };

  if (isLoading) {
    return (
      <View className="flex-1 bg-gray-50 items-center justify-center">
        <ActivityIndicator size="large" color="#9D12DE" />
      </View>
    );
  }

  const stats = dashboardData?.data;
  const streak = streakData?.data?.streak || 0;

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <LinearGradient colors={['#9D12DE', '#7C3AED']} className="px-6 pt-12 pb-6">
        <Text className="text-3xl font-bold text-white mb-2">Estadísticas</Text>
        <Text className="text-primary/50">Tu progreso y logros</Text>
      </LinearGradient>

      <ScrollView className="flex-1" contentContainerClassName="p-6 gap-6">
        {/* Level & XP */}
        <Card className="p-6 bg-gradient-to-br from-purple-500 to-purple-700">
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-white/80 text-sm mb-1">Nivel Actual</Text>
              <Text className="text-white text-5xl font-bold">
                {stats?.user.level || 1}
              </Text>
              <Text className="text-purple-200 text-sm mt-1">
                {stats?.user.xp || 0} XP total
              </Text>
            </View>
            <View className="bg-white/20 p-4 rounded-2xl">
              <Ionicons name="trophy" size={48} color="white" />
            </View>
          </View>
          
          {/* XP Progress to next level */}
          <View className="mt-4">
            <View className="flex-row justify-between mb-2">
              <Text className="text-white/80 text-xs">Próximo nivel</Text>
              <Text className="text-white text-xs font-semibold">
                {((stats?.user.xp || 0) % 100)}/100 XP
              </Text>
            </View>
            <View className="h-2 bg-white/20 rounded-full overflow-hidden">
              <View
                className="h-full bg-white rounded-full"
                style={{ width: `${((stats?.user.xp || 0) % 100)}%` }}
              />
            </View>
          </View>
        </Card>

        {/* Streak */}
        <Card className="p-6 bg-gradient-to-br from-orange-400 to-red-500">
          <View className="flex-row items-center justify-between">
            <View className="flex-1">
              <Text className="text-white/90 text-sm mb-1">Racha Actual</Text>
              <Text className="text-white text-4xl font-bold">{streak} días</Text>
              <Text className="text-orange-100 text-sm mt-1">
                ¡Sigue así! 🔥
              </Text>
            </View>
            <View className="bg-white/20 p-4 rounded-2xl">
              <Ionicons name="flame" size={40} color="white" />
            </View>
          </View>
        </Card>

        {/* Weekly Stats */}
        <View>
          <Text className="text-xl font-bold text-gray-900 mb-4">
            Esta Semana
          </Text>
          <View className="flex-row gap-3">
            <Card className="flex-1 p-4 bg-primary/10">
              <View className="bg-primary w-12 h-12 rounded-xl items-center justify-center mb-3">
                <Ionicons name="barbell" size={24} color="white" />
              </View>
              <Text className="text-2xl font-bold text-text">
                {stats?.weekly.workouts || 0}
              </Text>
              <Text className="text-sm text-text/70">Entrenamientos</Text>
            </Card>

            <Card className="flex-1 p-4 bg-primary/10">
              <View className="bg-primary w-12 h-12 rounded-xl items-center justify-center mb-3">
                <Ionicons name="flash" size={24} color="white" />
              </View>
              <Text className="text-2xl font-bold text-text">
                {stats?.weekly.xpEarned || 0}
              </Text>
              <Text className="text-sm text-text/70">XP ganado</Text>
            </Card>
          </View>
        </View>

        {/* Overall Stats */}
        <View>
          <Text className="text-xl font-bold text-gray-900 mb-4">
            Estadísticas Totales
          </Text>
          <Card className="p-4">
            <View className="gap-4">
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center gap-3">
                  <View className="bg-primary/10 p-3 rounded-xl">
                    <Ionicons name="fitness" size={24} color="#9D12DE" />
                  </View>
                  <View>
                    <Text className="text-sm text-gray-600">Entrenamientos Totales</Text>
                    <Text className="text-xl font-bold text-gray-900">
                      {stats?.overall.totalWorkouts || 0}
                    </Text>
                  </View>
                </View>
              </View>

              <View className="h-px bg-gray-200" />

              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center gap-3">
                  <View className="bg-purple-100 p-3 rounded-xl">
                    <Ionicons name="layers" size={24} color="#9333EA" />
                  </View>
                  <View>
                    <Text className="text-sm text-gray-600">Series Totales</Text>
                    <Text className="text-xl font-bold text-gray-900">
                      {stats?.overall.totalSets || 0}
                    </Text>
                  </View>
                </View>
              </View>

              <View className="h-px bg-gray-200" />

              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center gap-3">
                  <View className="bg-primary/10 p-3 rounded-xl">
                    <Ionicons name="time" size={24} color="#9D12DE" />
                  </View>
                  <View>
                    <Text className="text-sm text-gray-600">Tiempo Total</Text>
                    <Text className="text-xl font-bold text-gray-900">
                      {formatDuration(stats?.overall.totalDuration || 0)}
                    </Text>
                  </View>
                </View>
              </View>

              <View className="h-px bg-gray-200" />

              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center gap-3">
                  <View className="bg-orange-100 p-3 rounded-xl">
                    <Ionicons name="star" size={24} color="#F97316" />
                  </View>
                  <View>
                    <Text className="text-sm text-gray-600">XP Total</Text>
                    <Text className="text-xl font-bold text-gray-900">
                      {stats?.overall.totalXP || 0}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </Card>
        </View>

        {/* Activity Chart (Simplified) */}
        {stats?.chart && stats.chart.length > 0 && (
          <View>
            <Text className="text-xl font-bold text-gray-900 mb-4">
              Últimos 30 Días
            </Text>
            <Card className="p-4">
              <View className="flex-row justify-around items-end h-32">
                {stats.chart.slice(-14).map((day, index) => (
                  <View key={index} className="items-center gap-2">
                    <View
                      className="bg-primary rounded-t"
                      style={{
                        width: 12,
                        height: Math.max((day.count / 3) * 100, 4),
                      }}
                    />
                    <Text className="text-xs text-gray-500">
                      {new Date(day.date).getDate()}
                    </Text>
                  </View>
                ))}
              </View>
            </Card>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

