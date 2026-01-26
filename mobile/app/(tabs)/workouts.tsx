import React from 'react';
import { View, Text, ScrollView, RefreshControl, TouchableOpacity, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useWorkouts } from '@/hooks/useWorkouts';
import { Card } from '@/components/ui/Card';
import { LinearGradient } from 'expo-linear-gradient';

export default function WorkoutsScreen() {
  const { data, isLoading, refetch } = useWorkouts({ limit: 20 });

  const formatDate = (date: string) => {
    const d = new Date(date);
    return d.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  const formatDuration = (seconds?: number) => {
    if (!seconds) return 'N/A';
    const mins = Math.floor(seconds / 60);
    return `${mins} min`;
  };

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header con gradiente */}
      <LinearGradient
        colors={['#10B981', '#059669']}
        className="px-6 pt-12 pb-6"
      >
        <View className="flex-row items-center justify-between">
          <View className="flex-1">
            <Text className="text-3xl font-bold text-white mb-1">Entrenamientos</Text>
            <Text className="text-emerald-100 text-sm">
              {data?.pagination.total || 0} entrenamientos registrados
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => router.push('/workouts/create')}
            className="bg-white/20 backdrop-blur-sm rounded-full p-4 border border-white/30"
            style={{ elevation: 5 }}
          >
            <Ionicons name="add" size={28} color="white" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView
        className="flex-1"
        contentContainerClassName="p-4 gap-4"
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={refetch} />
        }
      >
        {isLoading && (
          <View className="items-center justify-center py-20">
            <ActivityIndicator size="large" color="#10B981" />
            <Text className="text-gray-500 mt-4">Cargando entrenamientos...</Text>
          </View>
        )}

        {!isLoading && data?.data.length === 0 && (
          <Card className="items-center py-16 mx-4 mt-8">
            <View className="bg-emerald-100 rounded-full p-6 mb-4">
              <Ionicons name="barbell-outline" size={64} color="#10B981" />
            </View>
            <Text className="text-gray-900 text-xl font-bold mb-2">
              ¡Comienza tu viaje!
            </Text>
            <Text className="text-gray-500 text-base text-center px-8 mb-6">
              No hay entrenamientos registrados aún.
              Crea tu primer entrenamiento y empieza a ganar XP.
            </Text>
            <TouchableOpacity
              onPress={() => router.push('/workouts/create')}
              className="bg-emerald-500 px-6 py-3 rounded-full flex-row items-center gap-2"
            >
              <Ionicons name="add-circle" size={20} color="white" />
              <Text className="text-white font-semibold">Crear Entrenamiento</Text>
            </TouchableOpacity>
          </Card>
        )}

        {!isLoading && data?.data.map((workout) => (
          <TouchableOpacity
            key={workout._id}
            onPress={() => router.push(`/workouts/${workout._id}`)}
            activeOpacity={0.7}
          >
            <Card className="p-5 mx-4">
              <View className="flex-row items-start justify-between mb-3">
                <View className="flex-1 pr-3">
                  <Text className="text-xl font-bold text-gray-900 mb-1">
                    {workout.name}
                  </Text>
                  <View className="flex-row items-center gap-1">
                    <Ionicons name="calendar-outline" size={14} color="#6B7280" />
                    <Text className="text-sm text-gray-500">
                      {formatDate(workout.date)}
                    </Text>
                  </View>
                </View>
                <View className="bg-gradient-to-br from-emerald-400 to-emerald-600 px-4 py-2 rounded-full">
                  <Text className="text-white font-bold text-base">
                    +{workout.xpEarned} XP
                  </Text>
                </View>
              </View>

              <View className="flex-row items-center gap-6 py-3 border-t border-gray-100">
                <View className="flex-row items-center gap-2">
                  <View className="bg-emerald-100 p-2 rounded-lg">
                    <Ionicons name="barbell" size={18} color="#10B981" />
                  </View>
                  <View>
                    <Text className="text-xs text-gray-500">Ejercicios</Text>
                    <Text className="text-sm font-semibold text-gray-900">
                      {workout.exercises.length}
                    </Text>
                  </View>
                </View>
                <View className="flex-row items-center gap-2">
                  <View className="bg-blue-100 p-2 rounded-lg">
                    <Ionicons name="time" size={18} color="#3B82F6" />
                  </View>
                  <View>
                    <Text className="text-xs text-gray-500">Duración</Text>
                    <Text className="text-sm font-semibold text-gray-900">
                      {formatDuration(workout.duration)}
                    </Text>
                  </View>
                </View>
              </View>

              {workout.notes && (
                <View className="mt-3 bg-gray-50 p-3 rounded-lg">
                  <Text className="text-gray-700 text-sm" numberOfLines={2}>
                    💭 {workout.notes}
                  </Text>
                </View>
              )}
              
              <View className="flex-row items-center justify-end mt-3">
                <Ionicons name="chevron-forward" size={20} color="#10B981" />
              </View>
            </Card>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
