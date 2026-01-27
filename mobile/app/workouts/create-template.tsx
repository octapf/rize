import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { exercisesApi } from '@/services/api/exercises.api';
import { workoutsApi } from '@/services/api/workouts.api';
import { Card } from '@/components/ui/Card';

interface ExerciseItem {
  exerciseId: string;
  exerciseName: string;
  sets: number;
  reps: number;
  restTime: number;
  notes?: string;
}

export default function CreateWorkoutTemplateScreen() {
  const queryClient = useQueryClient();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [exercises, setExercises] = useState<ExerciseItem[]>([]);
  const [selectedExercises, setSelectedExercises] = useState<any[]>([]);
  const [showExercisePicker, setShowExercisePicker] = useState(false);

  const createTemplateMutation = useMutation({
    mutationFn: (data: any) => workoutsApi.createWorkoutTemplate(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workout-templates'] });
      Alert.alert('Éxito', 'Plantilla creada correctamente', [
        {
          text: 'OK',
          onPress: () => router.back(),
        },
      ]);
    },
    onError: (error: any) => {
      Alert.alert('Error', error.response?.data?.message || 'Error al crear la plantilla');
    },
  });

  const handleAddExercise = () => {
    router.push('/exercises/library?mode=select');
  };

  const handleRemoveExercise = (index: number) => {
    setExercises(exercises.filter((_, i) => i !== index));
  };

  const handleUpdateSets = (index: number, sets: string) => {
    const newExercises = [...exercises];
    newExercises[index].sets = parseInt(sets) || 0;
    setExercises(newExercises);
  };

  const handleUpdateReps = (index: number, reps: string) => {
    const newExercises = [...exercises];
    newExercises[index].reps = parseInt(reps) || 0;
    setExercises(newExercises);
  };

  const handleUpdateRest = (index: number, rest: string) => {
    const newExercises = [...exercises];
    newExercises[index].restTime = parseInt(rest) || 60;
    setExercises(newExercises);
  };

  const handleCreate = () => {
    if (!name.trim()) {
      Alert.alert('Error', 'El nombre de la plantilla es requerido');
      return;
    }

    if (exercises.length === 0) {
      Alert.alert('Error', 'Debes agregar al menos un ejercicio');
      return;
    }

    createTemplateMutation.mutate({
      name: name.trim(),
      description: description.trim() || undefined,
      exercises: exercises.map((ex) => ({
        exercise: ex.exerciseId,
        sets: Array(ex.sets).fill({
          reps: ex.reps,
          weight: null,
        }),
        restTime: ex.restTime,
        notes: ex.notes,
      })),
    });
  };

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <LinearGradient colors={['#8B5CF6', '#7C3AED']} className="px-6 pt-12 pb-6">
        <View className="flex-row items-center justify-between">
          <TouchableOpacity onPress={() => router.back()} className="p-2">
            <Ionicons name="arrow-back" size={28} color="white" />
          </TouchableOpacity>
          <Text className="text-2xl font-bold text-white">Nueva Plantilla</Text>
          <View className="w-10" />
        </View>
      </LinearGradient>

      <ScrollView className="flex-1" contentContainerClassName="p-6 gap-4">
        {/* Name Input */}
        <Card className="p-4">
          <Text className="text-gray-700 font-semibold mb-2">
            Nombre de la Plantilla *
          </Text>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Ej: Día de Pecho y Tríceps"
            className="bg-gray-50 rounded-lg px-4 py-3 text-gray-900"
            placeholderTextColor="#9CA3AF"
          />
        </Card>

        {/* Description */}
        <Card className="p-4">
          <Text className="text-gray-700 font-semibold mb-2">
            Descripción
          </Text>
          <TextInput
            value={description}
            onChangeText={setDescription}
            placeholder="Descripción de la plantilla"
            className="bg-gray-50 rounded-lg px-4 py-3 text-gray-900"
            placeholderTextColor="#9CA3AF"
            multiline
            numberOfLines={3}
            textAlignVertical="top"
          />
        </Card>

        {/* Exercises Section */}
        <View>
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-lg font-bold text-gray-900">
              Ejercicios ({exercises.length})
            </Text>
            <TouchableOpacity
              onPress={handleAddExercise}
              className="bg-purple-600 px-4 py-2 rounded-full flex-row items-center gap-2"
            >
              <Ionicons name="add" size={20} color="white" />
              <Text className="text-white font-semibold">Agregar</Text>
            </TouchableOpacity>
          </View>

          {exercises.length === 0 ? (
            <Card className="p-8 items-center">
              <Ionicons name="barbell-outline" size={48} color="#D1D5DB" />
              <Text className="text-gray-400 mt-3 text-center">
                No hay ejercicios agregados
              </Text>
              <Text className="text-gray-400 text-sm text-center mt-1">
                Toca "Agregar" para empezar
              </Text>
            </Card>
          ) : (
            <View className="gap-3">
              {exercises.map((exercise, index) => (
                <Card key={index} className="p-4">
                  <View className="flex-row items-start justify-between mb-3">
                    <Text className="text-gray-900 font-bold flex-1">
                      {index + 1}. {exercise.exerciseName}
                    </Text>
                    <TouchableOpacity
                      onPress={() => handleRemoveExercise(index)}
                      className="ml-2"
                    >
                      <Ionicons name="close-circle" size={24} color="#EF4444" />
                    </TouchableOpacity>
                  </View>

                  <View className="flex-row gap-2">
                    <View className="flex-1">
                      <Text className="text-gray-600 text-sm mb-1">Series</Text>
                      <TextInput
                        value={exercise.sets.toString()}
                        onChangeText={(text) => handleUpdateSets(index, text)}
                        placeholder="0"
                        keyboardType="number-pad"
                        className="bg-gray-50 rounded-lg px-3 py-2 text-gray-900"
                      />
                    </View>

                    <View className="flex-1">
                      <Text className="text-gray-600 text-sm mb-1">Reps</Text>
                      <TextInput
                        value={exercise.reps.toString()}
                        onChangeText={(text) => handleUpdateReps(index, text)}
                        placeholder="0"
                        keyboardType="number-pad"
                        className="bg-gray-50 rounded-lg px-3 py-2 text-gray-900"
                      />
                    </View>

                    <View className="flex-1">
                      <Text className="text-gray-600 text-sm mb-1">Descanso (s)</Text>
                      <TextInput
                        value={exercise.restTime.toString()}
                        onChangeText={(text) => handleUpdateRest(index, text)}
                        placeholder="60"
                        keyboardType="number-pad"
                        className="bg-gray-50 rounded-lg px-3 py-2 text-gray-900"
                      />
                    </View>
                  </View>
                </Card>
              ))}
            </View>
          )}
        </View>

        {/* Create Button */}
        <TouchableOpacity
          onPress={handleCreate}
          disabled={createTemplateMutation.isPending}
          className="mt-4"
        >
          <LinearGradient
            colors={['#8B5CF6', '#7C3AED']}
            className="rounded-xl py-4 items-center"
          >
            {createTemplateMutation.isPending ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-white text-lg font-bold">
                Crear Plantilla
              </Text>
            )}
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
