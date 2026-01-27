import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useQuery } from '@tanstack/react-query';
import { workoutsApi, Workout } from '@/services/api/workouts.api';
import { Card } from '@/components/ui/Card';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export default function WorkoutHistoryScreen() {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'week' | 'month'>('all');

  const { data, isLoading } = useQuery({
    queryKey: ['workouts-history'],
    queryFn: () => workoutsApi.getUserWorkouts(),
  });

  const workouts = data?.data.workouts || [];

  // Filter workouts by date
  const filteredWorkouts = workouts.filter((workout: Workout) => {
    if (!workout.completedAt) return false;
    
    const completedDate = new Date(workout.completedAt);
    const now = new Date();

    if (selectedFilter === 'week') {
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      return completedDate >= weekAgo;
    } else if (selectedFilter === 'month') {
      const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      return completedDate >= monthAgo;
    }
    
    return true;
  });

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  const calculateTotalVolume = (workout: Workout) => {
    let total = 0;
    workout.exercises.forEach((exercise) => {
      exercise.sets.forEach((set) => {
        if (set.completed && set.weight && set.reps) {
          total += set.weight * set.reps;
        }
      });
    });
    return total;
  };

  const calculateCompletedSets = (workout: Workout) => {
    let completed = 0;
    let total = 0;
    workout.exercises.forEach((exercise) => {
      exercise.sets.forEach((set) => {
        total++;
        if (set.completed) completed++;
      });
    });
    return { completed, total };
  };

  const filters = [
    { label: 'Todos', value: 'all' as const },
    { label: 'Última Semana', value: 'week' as const },
    { label: 'Último Mes', value: 'month' as const },
  ];

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <LinearGradient colors={['#10B981', '#059669']} className="px-6 pt-12 pb-6">
        <View className="flex-row items-center justify-between mb-4">
          <TouchableOpacity onPress={() => router.back()} className="p-2">
            <Ionicons name="arrow-back" size={28} color="white" />
          </TouchableOpacity>
          <Text className="text-2xl font-bold text-white">Historial</Text>
          <View className="w-10" />
        </View>

        {/* Filters */}
        <View className="flex-row gap-2">
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter.value}
              onPress={() => setSelectedFilter(filter.value)}
              className={`px-4 py-2 rounded-lg ${
                selectedFilter === filter.value
                  ? 'bg-white'
                  : 'bg-white/20'
              }`}
            >
              <Text
                className={`font-semibold ${
                  selectedFilter === filter.value
                    ? 'text-emerald-600'
                    : 'text-white'
                }`}
              >
                {filter.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </LinearGradient>

      <ScrollView className="flex-1" contentContainerClassName="p-6 gap-4">
        {isLoading ? (
          <View className="py-12">
            <ActivityIndicator size="large" color="#10B981" />
          </View>
        ) : filteredWorkouts.length === 0 ? (
          <Card className="p-8">
            <View className="items-center gap-3">
              <Ionicons name="fitness-outline" size={48} color="#9CA3AF" />
              <Text className="text-center text-gray-500 font-medium">
                No hay entrenamientos en este período
              </Text>
            </View>
          </Card>
        ) : (
          filteredWorkouts.map((workout: Workout) => {
            const volume = calculateTotalVolume(workout);
            const sets = calculateCompletedSets(workout);
            const duration = workout.completedAt && workout.startedAt
              ? Math.floor(
                  (new Date(workout.completedAt).getTime() -
                    new Date(workout.startedAt).getTime()) /
                    1000
                )
              : 0;

            return (
              <TouchableOpacity
                key={workout._id}
                onPress={() => router.push(`/workouts/${workout._id}`)}
              >
                <Card className="p-4">
                  {/* Header */}
                  <View className="flex-row items-start justify-between mb-3">
                    <View className="flex-1">
                      <Text className="text-lg font-bold text-gray-900 mb-1">
                        {workout.name}
                      </Text>
                      <Text className="text-sm text-gray-500">
                        {workout.completedAt &&
                          format(new Date(workout.completedAt), "d 'de' MMMM, yyyy", {
                            locale: es,
                          })}
                      </Text>
                      <Text className="text-xs text-gray-400">
                        {workout.completedAt &&
                          format(new Date(workout.completedAt), 'HH:mm', {
                            locale: es,
                          })}
                      </Text>
                    </View>

                    <View className="bg-emerald-100 p-2 rounded-lg">
                      <Ionicons name="checkmark-circle" size={24} color="#10B981" />
                    </View>
                  </View>

                  {/* Stats */}
                  <View className="flex-row gap-3 py-3 border-t border-gray-200">
                    <View className="flex-1 items-center">
                      <Text className="text-gray-500 text-xs mb-1">Duración</Text>
                      <View className="flex-row items-center gap-1">
                        <Ionicons name="time-outline" size={16} color="#6B7280" />
                        <Text className="text-gray-900 font-bold">
                          {formatDuration(duration)}
                        </Text>
                      </View>
                    </View>

                    <View className="flex-1 items-center">
                      <Text className="text-gray-500 text-xs mb-1">Series</Text>
                      <View className="flex-row items-center gap-1">
                        <Ionicons name="barbell-outline" size={16} color="#6B7280" />
                        <Text className="text-gray-900 font-bold">
                          {sets.completed}/{sets.total}
                        </Text>
                      </View>
                    </View>

                    <View className="flex-1 items-center">
                      <Text className="text-gray-500 text-xs mb-1">Volumen</Text>
                      <View className="flex-row items-center gap-1">
                        <Ionicons name="speedometer-outline" size={16} color="#6B7280" />
                        <Text className="text-gray-900 font-bold">
                          {volume.toLocaleString()} kg
                        </Text>
                      </View>
                    </View>
                  </View>

                  {/* Exercises Summary */}
                  <View className="pt-3 border-t border-gray-200">
                    <Text className="text-xs text-gray-500 mb-2">
                      {workout.exercises.length} ejercicio
                      {workout.exercises.length !== 1 ? 's' : ''}:
                    </Text>
                    <View className="flex-row flex-wrap gap-2">
                      {workout.exercises.slice(0, 3).map((exercise, idx) => (
                        <View
                          key={idx}
                          className="bg-gray-100 px-3 py-1 rounded-full"
                        >
                          <Text className="text-xs text-gray-700 font-medium">
                            {exercise.exercise.name}
                          </Text>
                        </View>
                      ))}
                      {workout.exercises.length > 3 && (
                        <View className="bg-gray-100 px-3 py-1 rounded-full">
                          <Text className="text-xs text-gray-700 font-medium">
                            +{workout.exercises.length - 3} más
                          </Text>
                        </View>
                      )}
                    </View>
                  </View>

                  {/* Notes */}
                  {workout.notes && (
                    <View className="pt-3 border-t border-gray-200 mt-3">
                      <View className="flex-row items-start gap-2">
                        <Ionicons name="document-text-outline" size={16} color="#9CA3AF" />
                        <Text className="text-sm text-gray-600 flex-1" numberOfLines={2}>
                          {workout.notes}
                        </Text>
                      </View>
                    </View>
                  )}
                </Card>
              </TouchableOpacity>
            );
          })
        )}
      </ScrollView>
    </View>
  );
}
