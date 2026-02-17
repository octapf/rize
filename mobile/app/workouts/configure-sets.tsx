import React, { useState, useEffect } from 'react';
import { Text } from '@/components/ui/Text';
import { View, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';;
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useWorkoutDraft } from '@/stores/workoutDraftStore';
import { useQuery } from '@tanstack/react-query';
import { exercisesApi } from '@/services/api/exercises.api';

interface Set {
  reps?: string;
  weight?: string;
  duration?: string;
  distance?: string;
  completed: boolean;
}

export default function ConfigureSetsScreen() {
  const params = useLocalSearchParams<{ exerciseName?: string; exerciseId?: string }>();
  const { exercises, configureSets } = useWorkoutDraft();
  const [sets, setSets] = useState<Set[]>([
    { reps: '', weight: '', completed: false },
  ]);

  // Fetch exercise details to get type
  const { data: exerciseData } = useQuery({
    queryKey: ['exercise', params.exerciseId],
    queryFn: async () => {
      if (!params.exerciseId) return null;
      const response = await exercisesApi.getExercises({ limit: 1 });
      // Try to find in cached list or make individual request
      return null; // Simplified for now
    },
    enabled: false, // We'll determine type from draft store
  });

  // Get exercise type from draft store
  const currentExercise = exercises.find((e) => e.exercise._id === params.exerciseId);
  const exerciseType = currentExercise?.exercise.type || 'reps';
  const exerciseUnit = currentExercise?.exercise.unit;

  // Cargar sets existentes si los hay
  useEffect(() => {
    if (params.exerciseId) {
      const exercise = exercises.find((e) => e.exercise._id === params.exerciseId);
      if (exercise && exercise.sets.length > 0) {
        setSets(
          exercise.sets.map((s) => ({
            reps: s.reps?.toString() || '',
            weight: s.weight?.toString() || '',
            duration: s.duration?.toString() || '',
            distance: s.distance?.toString() || '',
            completed: s.completed,
          }))
        );
      } else {
        // Initialize based on exercise type
        setSets([
          {
            ...(exerciseType === 'reps' && { reps: '', weight: '' }),
            ...(exerciseType === 'time' && { duration: '' }),
            ...(exerciseType === 'distance' && { distance: '' }),
            completed: false,
          },
        ]);
      }
    }
  }, [params.exerciseId, exercises, exerciseType]);

  const addSet = () => {
    setSets([
      ...sets,
      {
        ...(exerciseType === 'reps' && { reps: '', weight: '' }),
        ...(exerciseType === 'time' && { duration: '' }),
        ...(exerciseType === 'distance' && { distance: '' }),
        completed: false,
      },
    ]);
  };

  const removeSet = (index: number) => {
    if (sets.length === 1) {
      Alert.alert('Error', 'Debe haber al menos 1 serie');
      return;
    }
    setSets(sets.filter((_, i) => i !== index));
  };

  const updateSet = (
    index: number,
    field: 'reps' | 'weight' | 'duration' | 'distance',
    value: string
  ) => {
    const newSets = [...sets];
    newSets[index][field] = value;
    setSets(newSets);
  };

  const handleConfirm = () => {
    // Validar según tipo
    let allValid = false;

    if (exerciseType === 'reps') {
      allValid = sets.every((set) => set.reps && parseInt(set.reps) > 0);
      if (!allValid) {
        Alert.alert('Error', 'Todas las series deben tener al menos 1 repetición');
        return;
      }
    } else if (exerciseType === 'time') {
      allValid = sets.every((set) => set.duration && parseFloat(set.duration) > 0);
      if (!allValid) {
        Alert.alert('Error', 'Todas las series deben tener duración mayor a 0');
        return;
      }
    } else if (exerciseType === 'distance') {
      allValid = sets.every((set) => set.distance && parseFloat(set.distance) > 0);
      if (!allValid) {
        Alert.alert('Error', 'Todas las series deben tener distancia mayor a 0');
        return;
      }
    }

    // Convertir y guardar en el store
    if (params.exerciseId) {
      const convertedSets = sets.map((set) => ({
        ...(set.reps && { reps: parseInt(set.reps) }),
        ...(set.weight && { weight: parseFloat(set.weight) }),
        ...(set.duration && { duration: parseFloat(set.duration) }),
        ...(set.distance && { distance: parseFloat(set.distance) }),
        completed: set.completed,
      }));
      configureSets(params.exerciseId, convertedSets as any);
    }

    router.back();
  };

  const getUnitLabel = () => {
    if (exerciseType === 'time') {
      return exerciseUnit === 'minutes' ? 'min' : 'seg';
    }
    if (exerciseType === 'distance') {
      if (exerciseUnit === 'kilometers') return 'km';
      if (exerciseUnit === 'miles') return 'mi';
      return 'm';
    }
    return '';
  };

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <LinearGradient colors={['#9D12DE', '#7C3AED']} className="px-6 pt-12 pb-6">
        <View className="flex-row items-center gap-4 mb-4">
          <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2">
            <Ionicons name="arrow-back" size={28} color="white" />
          </TouchableOpacity>
          <View className="flex-1">
            <Text className="text-3xl font-bold text-white mb-1">
              Configurar Series
            </Text>
            <Text className="text-primary/50 text-sm">
              {params.exerciseName || 'Ejercicio'}
            </Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView className="flex-1" contentContainerClassName="p-6 gap-4">
        {/* Info */}
        <Card className="p-4 bg-primary/5 border border-primary/20">
          <View className="flex-row gap-3">
            <View className="bg-primary p-2 rounded-lg h-fit">
              <Ionicons name="information-circle" size={24} color="white" />
            </View>
            <View className="flex-1">
              <Text className="text-text font-semibold mb-1">
                Configura tus series
              </Text>
              <Text className="text-text/70 text-sm">
                {exerciseType === 'reps' &&
                  'Agrega las series que planeas hacer. El peso es opcional.'}
                {exerciseType === 'time' &&
                  `Configura la duración de cada serie en ${getUnitLabel()}.`}
                {exerciseType === 'distance' &&
                  `Configura la distancia de cada serie en ${getUnitLabel()}.`}
              </Text>
            </View>
          </View>
        </Card>

        {/* Sets List */}
        {sets.map((set, index) => (
          <Card key={index} className="p-4">
            <View className="flex-row items-center justify-between mb-3">
              <Text className="text-lg font-bold text-gray-900">
                Serie {index + 1}
              </Text>
              {sets.length > 1 && (
                <TouchableOpacity
                  onPress={() => removeSet(index)}
                  className="p-2 bg-red-100 rounded-lg"
                >
                  <Ionicons name="trash" size={20} color="#EF4444" />
                </TouchableOpacity>
              )}
            </View>

            <View className="flex-row gap-3">
              {/* Reps Type */}
              {exerciseType === 'reps' && (
                <>
                  <View className="flex-1">
                    <Text className="text-sm font-semibold text-gray-700 mb-2">
                      Repeticiones *
                    </Text>
                    <TextInput
                      value={set.reps}
                      onChangeText={(value) => updateSet(index, 'reps', value)}
                      placeholder="0"
                      keyboardType="number-pad"
                      className="bg-white border-2 border-gray-200 rounded-xl px-4 py-3 text-base"
                    />
                  </View>

                  <View className="flex-1">
                    <Text className="text-sm font-semibold text-gray-700 mb-2">
                      Peso (kg)
                    </Text>
                    <TextInput
                      value={set.weight}
                      onChangeText={(value) => updateSet(index, 'weight', value)}
                      placeholder="0"
                      keyboardType="decimal-pad"
                      className="bg-white border-2 border-gray-200 rounded-xl px-4 py-3 text-base"
                    />
                  </View>
                </>
              )}

              {/* Time Type */}
              {exerciseType === 'time' && (
                <View className="flex-1">
                  <Text className="text-sm font-semibold text-gray-700 mb-2">
                    Duración ({getUnitLabel()}) *
                  </Text>
                  <TextInput
                    value={set.duration}
                    onChangeText={(value) => updateSet(index, 'duration', value)}
                    placeholder="0"
                    keyboardType="decimal-pad"
                    className="bg-white border-2 border-gray-200 rounded-xl px-4 py-3 text-base"
                  />
                </View>
              )}

              {/* Distance Type */}
              {exerciseType === 'distance' && (
                <View className="flex-1">
                  <Text className="text-sm font-semibold text-gray-700 mb-2">
                    Distancia ({getUnitLabel()}) *
                  </Text>
                  <TextInput
                    value={set.distance}
                    onChangeText={(value) => updateSet(index, 'distance', value)}
                    placeholder="0"
                    keyboardType="decimal-pad"
                    className="bg-white border-2 border-gray-200 rounded-xl px-4 py-3 text-base"
                  />
                </View>
              )}
            </View>
          </Card>
        ))}

        {/* Add Set Button */}
        <TouchableOpacity onPress={addSet} activeOpacity={0.7}>
          <Card className="p-4 border-2 border-dashed border-primary/30 bg-primary/10">
            <View className="flex-row items-center justify-center gap-2">
              <Ionicons name="add-circle" size={24} color="#9D12DE" />
              <Text className="text-primary font-bold text-base">
                Agregar Serie
              </Text>
            </View>
          </Card>
        </TouchableOpacity>

        {/* Summary */}
        <Card className="p-4 bg-gray-100">
          <View className="flex-row items-center justify-between">
            <Text className="text-gray-700 font-semibold">Total Series:</Text>
            <Text className="text-2xl font-bold text-primary">
              {sets.length}
            </Text>
          </View>
        </Card>
      </ScrollView>

      {/* Footer with Confirm Button */}
      <View className="p-4 bg-white border-t border-gray-200">
        <Button onPress={handleConfirm} variant="primary">
          Confirmar Series
        </Button>
      </View>
    </View>
  );
}

