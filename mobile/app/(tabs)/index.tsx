import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '@/stores/authStore';
import { workoutsApi } from '@/services/api/workouts.api';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { QuickStats } from '@/components/QuickStats';

export default function HomeScreen() {
  const { user } = useAuthStore();

  // Fetch user's workouts for stats
  const { data: workoutsData, isLoading } = useQuery({
    queryKey: ['workouts-stats'],
    queryFn: () => workoutsApi.getUserWorkouts(),
  });

  const workouts = workoutsData?.data.workouts || [];

  // Calculate stats
  const now = new Date();
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  const workoutsThisWeek = workouts.filter((w: any) => 
    w.completedAt && new Date(w.completedAt) >= weekAgo
  ).length;

  const totalVolume = workouts.reduce((sum: number, workout: any) => {
    if (!workout.completedAt) return sum;
    return sum + workout.exercises.reduce((exSum: number, ex: any) => {
      return exSum + ex.sets.reduce((setSum: number, set: any) => {
        if (set.completed && set.weight && set.reps) {
          return setSum + (set.weight * set.reps);
        }
        return setSum;
      }, 0);
    }, 0);
  }, 0);

  const stats = {
    workoutsThisWeek,
    totalVolume: Math.round(totalVolume),
    currentStreak: user?.streak || 0,
    level: Math.floor((user?.xp || 0) / 100) + 1,
    xp: user?.xp || 0,
    recordsThisMonth: 0, // TODO: Calculate from records API
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <LinearGradient colors={['#10B981', '#059669']} className="px-6 py-6">
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-emerald-100 text-sm">Bienvenido</Text>
            <Text className="text-white text-2xl font-bold">
              @{user?.username || 'Usuario'}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => router.push('/social/friends')}
            className="bg-white/20 p-3 rounded-xl"
          >
            <Ionicons name="people" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView className="flex-1" contentContainerClassName="p-6 gap-6">
        {/* Quick Stats */}
        <View>
          <Text className="text-xl font-bold text-gray-900 mb-3">
            Tu Progreso
          </Text>
          <QuickStats stats={stats} isLoading={isLoading} />
        </View>

        {/* Quick Actions */}
        <View>
          <Text className="text-xl font-bold text-gray-900 mb-3">
            Acciones Rápidas
          </Text>

          <View className="gap-3">
            <TouchableOpacity onPress={() => router.push('/workouts/create')}>
              <Card className="p-0 overflow-hidden">
                <LinearGradient
                  colors={['#10B981', '#059669']}
                  className="p-4"
                >
                  <View className="flex-row items-center justify-between">
                    <View className="flex-row items-center gap-3 flex-1">
                      <View className="bg-white/20 p-3 rounded-xl">
                        <Ionicons name="add-circle" size={32} color="white" />
                      </View>
                      <View className="flex-1">
                        <Text className="text-white text-lg font-bold">
                          Nuevo Entrenamiento
                        </Text>
                        <Text className="text-emerald-100 text-sm">
                          Comienza tu sesión ahora
                        </Text>
                      </View>
                    </View>
                    <Ionicons name="chevron-forward" size={24} color="white" />
                  </View>
                </LinearGradient>
              </Card>
            </TouchableOpacity>

            <View className="flex-row gap-3">
              <TouchableOpacity
                onPress={() => router.push('/exercises/library')}
                className="flex-1"
              >
                <Card className="p-4 bg-blue-50">
                  <View className="items-center gap-2">
                    <View className="bg-blue-500 p-3 rounded-xl">
                      <Ionicons name="library" size={28} color="white" />
                    </View>
                    <Text className="text-gray-900 font-bold text-center">
                      Biblioteca
                    </Text>
                  </View>
                </Card>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => router.push('/leaderboard')}
                className="flex-1"
              >
                <Card className="p-4 bg-amber-50">
                  <View className="items-center gap-2">
                    <View className="bg-amber-500 p-3 rounded-xl">
                      <Ionicons name="trophy" size={28} color="white" />
                    </View>
                    <Text className="text-gray-900 font-bold text-center">
                      Rankings
                    </Text>
                  </View>
                </Card>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Recent Activity */}
        <View>
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-xl font-bold text-gray-900">
              Actividad Reciente
            </Text>
            <TouchableOpacity onPress={() => router.push('/workouts/history')}>
              <Text className="text-emerald-600 font-semibold">Ver Todo</Text>
            </TouchableOpacity>
          </View>

          {workouts.slice(0, 3).map((workout: any) => (
            <TouchableOpacity
              key={workout._id}
              onPress={() => router.push(`/workouts/${workout._id}`)}
            >
              <Card className="p-4 mb-3">
                <View className="flex-row items-center justify-between">
                  <View className="flex-1">
                    <Text className="text-gray-900 font-bold mb-1">
                      {workout.name}
                    </Text>
                    <Text className="text-gray-500 text-sm">
                      {workout.exercises.length} ejercicio
                      {workout.exercises.length !== 1 ? 's' : ''}
                    </Text>
                  </View>
                  <View
                    className={`px-3 py-1 rounded-full ${
                      workout.status === 'completed'
                        ? 'bg-emerald-100'
                        : workout.status === 'in-progress'
                        ? 'bg-blue-100'
                        : 'bg-gray-100'
                    }`}
                  >
                    <Text
                      className={`text-xs font-semibold ${
                        workout.status === 'completed'
                          ? 'text-emerald-700'
                          : workout.status === 'in-progress'
                          ? 'text-blue-700'
                          : 'text-gray-700'
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

          {workouts.length === 0 && !isLoading && (
            <Card className="p-8">
              <View className="items-center gap-3">
                <Ionicons name="barbell-outline" size={48} color="#D1D5DB" />
                <Text className="text-gray-500 text-center">
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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

