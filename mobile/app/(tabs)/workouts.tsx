import React from 'react';
import { View, Text, ScrollView, RefreshControl, TouchableOpacity, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
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
    <View className="flex-1 bg-[#262626]">
      {/* Header con gradiente */}
      <View className="px-6 pt-12 pb-6 border-b border-white/5">
        <View className="flex-row items-center justify-between">
          <View className="flex-1">
            <Text className="text-3xl font-bold text-white mb-1">Entrenamientos</Text>
            <Text className="text-[#FFEA00] text-sm font-medium">
              {data?.pagination.total || 0} entrenamientos registrados
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => router.push('/workouts/create')}
            className="bg-[#9D12DE] rounded-full p-4 border border-white/10 shadow-lg shadow-purple-500/30"
            style={{ elevation: 5 }}
          >
            <Ionicons name="add" size={28} color="#FFF" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerClassName="p-4 gap-4"
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={refetch} tintColor="#9D12DE" />
        }
      >
        {isLoading && (
          <View className="items-center justify-center py-20">
            <ActivityIndicator size="large" color="#9D12DE" />
            <Text className="text-gray-400 mt-4">Cargando entrenamientos...</Text>
          </View>
        )}

        {!isLoading && data?.data.length === 0 && (
          <Animated.View entering={FadeInDown.delay(200)}>
            <Card className="items-center py-16 mx-4 mt-8 bg-[#333333] border-white/10">
              <View className="bg-[#9D12DE]/20 rounded-full p-6 mb-4">
                <Ionicons name="barbell-outline" size={64} color="#9D12DE" />
              </View>
              <Text className="text-white text-xl font-bold mb-2">
                ¡Comienza tu viaje!
              </Text>
              <Text className="text-gray-400 text-base text-center px-8 mb-6">
                No hay entrenamientos registrados aún.
                Crea tu primer entrenamiento y empieza a ganar XP.
              </Text>
              <TouchableOpacity
                onPress={() => router.push('/workouts/create')}
                className="bg-[#9D12DE] px-6 py-3 rounded-full flex-row items-center gap-2"
              >
                <Ionicons name="add-circle" size={20} color="white" />
                <Text className="text-white font-semibold">Crear Entrenamiento</Text>
              </TouchableOpacity>
            </Card>
          </Animated.View>
        )}

        {!isLoading && data?.data.map((workout, index) => (
          <Animated.View key={workout._id} entering={FadeInDown.delay(index * 100).springify()}>
            <TouchableOpacity
              onPress={() => router.push(`/workouts/${workout._id}`)}
              activeOpacity={0.7}
            >
              <Card className="p-5 mx-4 bg-[#333333] border-white/10 shadow-lg">
                <View className="flex-row items-start justify-between mb-3">
                  <View className="flex-1 pr-3">
                    <Text className="text-xl font-bold text-white mb-1">
                      {workout.name}
                    </Text>
                    <View className="flex-row items-center gap-1">
                      <Ionicons name="calendar-outline" size={14} color="#9CA3AF" />
                      <Text className="text-sm text-gray-400">
                        {formatDate(workout.date)}
                      </Text>
                    </View>
                  </View>
                  <View className="bg-[#9D12DE] px-4 py-2 rounded-full border border-white/10">
                    <Text className="text-[#FFEA00] font-bold text-base">
                      +{workout.xpEarned} XP
                    </Text>
                  </View>
                </View>

                <View className="flex-row items-center gap-6 py-3 border-t border-white/10">
                  <View className="flex-row items-center gap-2">
                    <View className="bg-[#9D12DE]/20 p-2 rounded-lg">
                      <Ionicons name="barbell" size={18} color="#9D12DE" />
                    </View>
                    <View>
                      <Text className="text-xs text-gray-400">Ejercicios</Text>
                      <Text className="text-sm font-semibold text-white">
                        {workout.exercises.length}
                      </Text>
                    </View>
                  </View>
                  <View className="flex-row items-center gap-2">
                    <View className="bg-highlight/20 p-2 rounded-lg">
                      <Ionicons name="time" size={18} color="#FFEA00" />
                    </View>
                    <View>
                      <Text className="text-xs text-gray-400">Duración</Text>
                      <Text className="text-sm font-semibold text-white">
                        {formatDuration(workout.duration)}
                      </Text>
                    </View>
                  </View>
                </View>

                {workout.notes && (
                  <View className="mt-3 bg-white/5 p-3 rounded-lg">
                    <Text className="text-gray-300 text-sm" numberOfLines={2}>
                      ðŸ’­ {workout.notes}
                    </Text>
                  </View>
                )}
                
                <View className="flex-row items-center justify-end mt-3">
                  <Ionicons name="chevron-forward" size={20} color="#9D12DE" />
                </View>
              </Card>
            </TouchableOpacity>
          </Animated.View>
        ))}
      </ScrollView>
    </View>
  );
}

