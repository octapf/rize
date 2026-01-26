import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useWorkoutDraft } from '@/stores/workoutDraftStore';

interface Set {
  reps: string;
  weight: string;
  completed: boolean;
}

export default function ConfigureSetsScreen() {
  const params = useLocalSearchParams<{ exerciseName?: string; exerciseId?: string }>();
  const { exercises, configureSets } = useWorkoutDraft();
  const [sets, setSets] = useState<Set[]>([
    { reps: '', weight: '', completed: false },
  ]);

  // Cargar sets existentes si los hay
  useEffect(() => {
    if (params.exerciseId) {
      const exercise = exercises.find((e) => e.exercise._id === params.exerciseId);
      if (exercise && exercise.sets.length > 0) {
        setSets(
          exercise.sets.map((s) => ({
            reps: s.reps.toString(),
            weight: s.weight?.toString() || '',
            completed: s.completed,
          }))
        );
      }
    }
  }, [params.exerciseId, exercises]);

  const addSet = () => {
    setSets([...sets, { reps: '', weight: '', completed: false }]);
  };

  const removeSet = (index: number) => {
    if (sets.length === 1) {
      Alert.alert('Error', 'Debe haber al menos 1 serie');
      return;
    }
    setSets(sets.filter((_, i) => i !== index));
  };

  const updateSet = (index: number, field: 'reps' | 'weight', value: string) => {
    const newSets = [...sets];
    newSets[index][field] = value;
    setSets(newSets);
  };

  const handleConfirm = () => {
    // Validar que todas las series tengan reps
    const allValid = sets.every((set) => set.reps && parseInt(set.reps) > 0);
    if (!allValid) {
      Alert.alert('Error', 'Todas las series deben tener al menos 1 repetición');
      return;
    }

    // Convertir y guardar en el store
    if (params.exerciseId) {
      const convertedSets = sets.map((set) => ({
        reps: parseInt(set.reps),
        weight: set.weight ? parseFloat(set.weight) : undefined,
        completed: set.completed,
      }));
      configureSets(params.exerciseId, convertedSets);
    }

    router.back();
  };

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <LinearGradient colors={['#10B981', '#059669']} className="px-6 pt-12 pb-6">
        <View className="flex-row items-center gap-4 mb-4">
          <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2">
            <Ionicons name="arrow-back" size={28} color="white" />
          </TouchableOpacity>
          <View className="flex-1">
            <Text className="text-3xl font-bold text-white mb-1">
              Configurar Series
            </Text>
            <Text className="text-emerald-100 text-sm">
              {params.exerciseName || 'Ejercicio'}
            </Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView className="flex-1" contentContainerClassName="p-6 gap-4">
        {/* Info */}
        <Card className="p-4 bg-blue-50 border border-blue-200">
          <View className="flex-row gap-3">
            <View className="bg-blue-500 p-2 rounded-lg h-fit">
              <Ionicons name="information-circle" size={24} color="white" />
            </View>
            <View className="flex-1">
              <Text className="text-blue-900 font-semibold mb-1">
                Configura tus series
              </Text>
              <Text className="text-blue-700 text-sm">
                Agrega las series que planeas hacer. El peso es opcional.
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
              {/* Reps */}
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

              {/* Weight */}
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
            </View>
          </Card>
        ))}

        {/* Add Set Button */}
        <TouchableOpacity onPress={addSet} activeOpacity={0.7}>
          <Card className="p-4 border-2 border-dashed border-emerald-300 bg-emerald-50">
            <View className="flex-row items-center justify-center gap-2">
              <Ionicons name="add-circle" size={24} color="#10B981" />
              <Text className="text-emerald-600 font-bold text-base">
                Agregar Serie
              </Text>
            </View>
          </Card>
        </TouchableOpacity>

        {/* Summary */}
        <Card className="p-4 bg-gray-100">
          <View className="flex-row items-center justify-between">
            <Text className="text-gray-700 font-semibold">Total Series:</Text>
            <Text className="text-2xl font-bold text-emerald-600">
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
