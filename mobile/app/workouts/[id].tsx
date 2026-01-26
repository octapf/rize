import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useWorkout, useDeleteWorkout } from '@/hooks/useWorkouts';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function WorkoutDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data, isLoading } = useWorkout(id);
  const deleteWorkout = useDeleteWorkout();

  const formatDate = (date: string) => {
    const d = new Date(date);
    return d.toLocaleDateString('es-ES', {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  const formatDuration = (seconds?: number) => {
    if (!seconds) return 'N/A';
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    if (hours > 0) return `${hours}h ${mins}m`;
    return `${mins} min`;
  };

  const handleDelete = () => {
    Alert.alert(
      'Eliminar entrenamiento',
      '¿Estás seguro de que quieres eliminar este entrenamiento?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteWorkout.mutateAsync(id);
              Alert.alert('Éxito', 'Entrenamiento eliminado');
              router.back();
            } catch (error: any) {
              Alert.alert('Error', 'No se pudo eliminar el entrenamiento');
            }
          },
        },
      ]
    );
  };

  if (isLoading) {
    return (
      <View className="flex-1 bg-gray-50 items-center justify-center">
        <ActivityIndicator size="large" color="#10B981" />
      </View>
    );
  }

  if (!data?.data) {
    return (
      <View className="flex-1 bg-gray-50 items-center justify-center">
        <Text className="text-gray-500">Entrenamiento no encontrado</Text>
      </View>
    );
  }

  const workout = data.data;

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header con gradiente */}
      <LinearGradient
        colors={['#10B981', '#059669']}
        className="px-6 pt-12 pb-6"
      >
        <View className="flex-row items-center justify-between">
          <TouchableOpacity onPress={() => router.back()} className="p-2">
            <Ionicons name="arrow-back" size={28} color="white" />
          </TouchableOpacity>
          <Text className="text-2xl font-bold text-white">Detalle</Text>
          <TouchableOpacity onPress={handleDelete} className="p-2">
            <Ionicons name="trash-outline" size={28} color="white" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView className="flex-1" contentContainerClassName="p-6 gap-6">
        {/* Título y XP */}
        <Card className="p-6 bg-gradient-to-br from-white to-emerald-50">
          <View className="flex-row items-start justify-between mb-4">
            <View className="flex-1 pr-4">
              <Text className="text-3xl font-bold text-gray-900 mb-2">
                {workout.name}
              </Text>
              <View className="flex-row items-center gap-2">
                <Ionicons name="calendar" size={16} color="#6B7280" />
                <Text className="text-sm text-gray-600 capitalize">
                  {formatDate(workout.date)}
                </Text>
              </View>
            </View>
            <LinearGradient
              colors={['#10B981', '#059669']}
              className="px-5 py-3 rounded-2xl"
              style={{ elevation: 3 }}
            >
              <View className="items-center">
                <Ionicons name="flash" size={24} color="white" />
                <Text className="text-white font-bold text-xl mt-1">
                  {workout.xpEarned}
                </Text>
                <Text className="text-emerald-100 text-xs font-semibold">XP</Text>
              </View>
            </LinearGradient>
          </View>
        </Card>

        {/* Estadísticas */}
        <Card className="p-6">
          <Text className="text-xl font-bold text-gray-900 mb-5">
            Estadísticas
          </Text>
          <View className="gap-4">
            <View className="flex-row items-center gap-4">
              <LinearGradient
                colors={['#10B981', '#059669']}
                className="p-4 rounded-2xl"
                style={{ elevation: 2 }}
              >
                <Ionicons name="barbell" size={28} color="white" />
              </LinearGradient>
              <View className="flex-1">
                <Text className="text-sm text-gray-500 mb-1">Ejercicios</Text>
                <Text className="text-2xl font-bold text-gray-900">
                  {workout.exercises.length}
                </Text>
              </View>
            </View>
            <View className="flex-row items-center gap-4">
              <LinearGradient
                colors={['#3B82F6', '#2563EB']}
                className="p-4 rounded-2xl"
                style={{ elevation: 2 }}
              >
                <Ionicons name="time" size={28} color="white" />
              </LinearGradient>
              <View className="flex-1">
                <Text className="text-sm text-gray-500 mb-1">Duración</Text>
                <Text className="text-2xl font-bold text-gray-900">
                  {formatDuration(workout.duration)}
                </Text>
              </View>
            </View>
            <View className="flex-row items-center gap-4">
              <LinearGradient
                colors={['#A855F7', '#9333EA']}
                className="p-4 rounded-2xl"
                style={{ elevation: 2 }}
              >
                <Ionicons name="eye" size={28} color="white" />
              </LinearGradient>
              <View className="flex-1">
                <Text className="text-sm text-gray-500 mb-1">Visibilidad</Text>
                <Text className="text-2xl font-bold text-gray-900 capitalize">
                  {workout.visibility === 'private'
                    ? 'Privado'
                    : workout.visibility === 'friends'
                    ? 'Amigos'
                    : 'Público'}
                </Text>
              </View>
            </View>
          </View>
        </Card>

        {/* Notas */}
        {workout.notes && (
          <Card className="p-6 bg-gradient-to-br from-amber-50 to-orange-50">
            <View className="flex-row items-center gap-2 mb-3">
              <View className="bg-amber-500 p-2 rounded-lg">
                <Ionicons name="document-text" size={20} color="white" />
              </View>
              <Text className="text-xl font-bold text-gray-900">Notas</Text>
            </View>
            <Text className="text-gray-700 leading-6 text-base">{workout.notes}</Text>
          </Card>
        )}

        {/* Ejercicios */}
        {workout.exercises.length > 0 && (
          <Card className="p-6">
            <View className="flex-row items-center gap-2 mb-4">
              <LinearGradient
                colors={['#10B981', '#059669']}
                className="p-2 rounded-lg"
              >
                <Ionicons name="barbell" size={20} color="white" />
              </LinearGradient>
              <Text className="text-xl font-bold text-gray-900">Ejercicios</Text>
            </View>
            <View className="gap-4">
              {workout.exercises.map((exercise, index) => {
                const exerciseData = typeof exercise.exerciseId === 'string' 
                  ? null 
                  : exercise.exerciseId;
                
                if (!exerciseData) return null;
                
                // Calculate total sets and reps info
                const totalSets = exercise.sets.length;
                const repsInfo = exercise.sets
                  .map(set => set.reps || 0)
                  .join(' - ');
                const hasWeight = exercise.sets.some(set => set.weight);
                const avgWeight = hasWeight
                  ? (exercise.sets.reduce((sum, set) => sum + (set.weight || 0), 0) / totalSets).toFixed(1)
                  : null;
                
                return (
                  <View
                    key={index}
                    className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-xl border border-gray-200"
                  >
                    <View className="flex-row items-center justify-between mb-3">
                      <Text className="text-lg font-bold text-gray-900 flex-1">
                        {exerciseData.name.es}
                      </Text>
                      <View className="bg-emerald-100 px-3 py-1 rounded-full">
                        <Text className="text-emerald-700 font-semibold text-xs uppercase">
                          {exerciseData.category}
                        </Text>
                      </View>
                    </View>
                    
                    <View className="flex-row items-center gap-4 flex-wrap">
                      <View className="flex-row items-center gap-2">
                        <Ionicons name="layers" size={16} color="#6B7280" />
                        <Text className="text-sm text-gray-600">
                          {totalSets} {totalSets === 1 ? 'serie' : 'series'}
                        </Text>
                      </View>
                      
                      <View className="flex-row items-center gap-2">
                        <Ionicons name="repeat" size={16} color="#6B7280" />
                        <Text className="text-sm text-gray-600">
                          {repsInfo} reps
                        </Text>
                      </View>
                      
                      {avgWeight && (
                        <View className="flex-row items-center gap-2">
                          <Ionicons name="barbell" size={16} color="#6B7280" />
                          <Text className="text-sm text-gray-600">
                            {avgWeight} kg avg
                          </Text>
                        </View>
                      )}
                    </View>
                    
                    {exercise.notes && (
                      <View className="mt-3 pt-3 border-t border-gray-300">
                        <Text className="text-sm text-gray-600 italic">
                          {exercise.notes}
                        </Text>
                      </View>
                    )}
                  </View>
                );
              })}
            </View>
          </Card>
        )}
      </ScrollView>
    </View>
  );
}
