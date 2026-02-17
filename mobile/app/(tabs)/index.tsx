import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '@/stores/authStore';
import { workoutsApi } from '@/services/api/workouts.api';
import { usersApi } from '@/services/api/users.api';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { QuickStats } from '@/components/QuickStats';
import { useToastError } from '@/hooks/useToastError';

export default function HomeScreen() {
  const { user, isAuthenticated } = useAuthStore();
  const { toast } = useToastError();

  // Fetch user stats
  const { data: statsData, isLoading: statsLoading, isError: statsError } = useQuery({
    queryKey: ['user-stats'],
    queryFn: () => usersApi.getMyStats(),
    enabled: isAuthenticated,
  });

  // Fetch recent workouts
  const { data: workoutsData, isLoading: workoutsLoading, isError: workoutsError } = useQuery({
    queryKey: ['workouts-recent'],
    queryFn: () => workoutsApi.getUserWorkouts(),
    enabled: isAuthenticated,
  });

  const workouts = workoutsData?.data.workouts || [];
  const userStats = statsData?.data;

  React.useEffect(() => {
    if (statsError) {
      toast.error('No pudimos cargar tus estadísticas');
    }
  }, [statsError]);

  React.useEffect(() => {
    if (workoutsError) {
      toast.error('Error al cargar tus entrenamientos');
    }
  }, [workoutsError]);

  const stats = userStats
    ? {
        workoutsThisWeek: userStats.workouts.thisWeek,
        totalVolume: userStats.volume.total,
        currentStreak: userStats.user.streak,
        level: userStats.user.level,
        xp: userStats.user.xp,
        recordsThisMonth: userStats.records.thisMonth,
      }
    : undefined;

  return (
    <SafeAreaView className="flex-1 bg-[#262626]">
      {/* Header */}
      <View className="px-6 py-6 border-b border-white/5 bg-[#262626]">
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-[#FFEA00] text-sm font-medium">Bienvenido</Text>
            <Text className="text-white text-2xl font-bold">
              @{user?.username || 'Usuario'}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => router.push('/social/friends')}
            className="bg-white/10 p-3 rounded-xl border border-white/10"
          >
            <Ionicons name="people" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1" contentContainerClassName="p-6 gap-6">
        {/* Quick Actions */}
        {stats && (
          <Animated.View entering={FadeInDown.delay(100)} className="mb-6">
            <Text className="text-lg font-bold text-white mb-3">
              Acciones Rápidas
            </Text>

            <View className="flex-row flex-wrap gap-2">
              <TouchableOpacity
                onPress={() => router.push('/workouts/quick-start')}
                className="bg-[#9D12DE] px-4 py-2 rounded-full flex-row items-center gap-2 shadow-lg shadow-purple-500/20"
              >
                <Ionicons name="flash" size={16} color="#FFEA00" />
                <Text className="text-white font-semibold">
                  Inicio Rápido
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => router.push('/progress')}
                className="bg-[#9D12DE]/80 px-4 py-2 rounded-full flex-row items-center gap-2"
              >
                <Ionicons name="analytics" size={16} color="#FFEA00" />
                <Text className="text-white font-semibold">
                  Mi Progreso
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => router.push('/settings/shortcuts')}
                className="bg-[#333333] px-4 py-2 rounded-full flex-row items-center gap-2 border border-white/10"
              >
                <Ionicons name="settings" size={16} color="white" />
                <Text className="text-white font-semibold">
                  Personalizar
                </Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        )}

        {/* Quick Stats */}
        <Animated.View entering={FadeInDown.delay(200)}>
          <Text className="text-xl font-bold text-white mb-3">
            Tu Progreso
          </Text>
          <QuickStats stats={stats} isLoading={statsLoading} />
        </Animated.View>

        {/* Quick Actions */}
        <Animated.View entering={FadeInDown.delay(300)}>
          <Text className="text-xl font-bold text-white mb-3">
            Acciones Rápidas
          </Text>

          <View className="gap-3">
            <TouchableOpacity onPress={() => router.push('/workouts/create')}>
              <Card className="p-0 overflow-hidden bg-[#9D12DE] border-white/10">
                <View className="p-4 bg-[#9D12DE]">
                  <View className="flex-row items-center justify-between">
                    <View className="flex-row items-center gap-3 flex-1">
                      <View className="bg-white/20 p-3 rounded-xl">
                        <Ionicons name="add-circle" size={32} color="#FFEA00" />
                      </View>
                      <View className="flex-1">
                        <Text className="text-white text-lg font-bold">
                          Nuevo Entrenamiento
                        </Text>
                        <Text className="text-white/80 text-sm">
                          Comienza tu sesión ahora
                        </Text>
                      </View>
                    </View>
                    <Ionicons name="chevron-forward" size={24} color="#FFEA00" />
                  </View>
                </View>
              </Card>
            </TouchableOpacity>

            <View className="flex-row gap-3">
              <TouchableOpacity
                onPress={() => router.push('/exercises/library')}
                className="flex-1"
              >
                <Card className="p-4 bg-[#333333] border-white/10">
                  <View className="items-center gap-2">
                    <View className="bg-[#9D12DE]/20 p-3 rounded-xl">
                      <Ionicons name="library" size={28} color="#9D12DE" />
                    </View>
                    <Text className="text-white font-bold text-center">
                      Biblioteca
                    </Text>
                  </View>
                </Card>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => router.push('/rankings')}
                className="flex-1"
              >
                <Card className="p-4 bg-[#333333] border-white/10">
                  <View className="items-center gap-2">
                    <View className="bg-highlight/20 p-3 rounded-xl">
                      <Ionicons name="trophy" size={28} color="#FFEA00" />
                    </View>
                    <Text className="text-white font-bold text-center">
                      Rankings
                    </Text>
                  </View>
                </Card>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>

        {/* Recent Activity */}
        <Animated.View entering={FadeInDown.delay(400)}>
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-xl font-bold text-white">
              Actividad Reciente
            </Text>
            <TouchableOpacity onPress={() => router.push('/workouts/history')}>
              <Text className="text-[#9D12DE] font-semibold">Ver Todo</Text>
            </TouchableOpacity>
          </View>

          {workouts.slice(0, 3).map((workout: any) => (
            <TouchableOpacity
              key={workout._id}
              onPress={() => router.push(`/workouts/${workout._id}`)}
            >
              <Card className="p-4 mb-3 bg-[#333333] border-white/10">
                <View className="flex-row items-center justify-between">
                  <View className="flex-1">
                    <Text className="text-white font-bold mb-1">
                      {workout.name}
                    </Text>
                    <Text className="text-gray-400 text-sm">
                      {workout.exercises.length} ejercicio
                      {workout.exercises.length !== 1 ? 's' : ''}
                    </Text>
                  </View>
                  <View
                    className={`px-3 py-1 rounded-full ${
                      workout.status === 'completed'
                        ? 'bg-[#9D12DE]/20'
                        : workout.status === 'in-progress'
                        ? 'bg-[#FFEA00]/20'
                        : 'bg-white/10'
                    }`}
                  >
                    <Text
                      className={`text-xs font-semibold ${
                        workout.status === 'completed'
                          ? 'text-[#9D12DE]'
                          : workout.status === 'in-progress'
                          ? 'text-[#FFEA00]'
                          : 'text-gray-400'
                      }`}
                    >
                      {workout.status === 'completed'
                        ? 'Completado'
                        : workout.status === 'in-progress'
                        ? 'En Progreso'
                        : 'Planeado'}
                    </Text>
                  </View>
                </View>
              </Card>
            </TouchableOpacity>
          ))}

          {workouts.length === 0 && !workoutsLoading && (
            <Card className="p-8 bg-[#333333] border-white/10">
              <View className="items-center gap-3">
                <Ionicons name="barbell-outline" size={48} color="#9D12DE" />
                <Text className="text-gray-400 text-center">
                  Aún no tienes entrenamientos
                </Text>
                <Button
                  onPress={() => router.push('/workouts/create')}
                  variant="primary"
                  className="mt-2"
                >
                  Crear Primer Entrenamiento
                </Button>
              </View>
            </Card>
          )}
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}


