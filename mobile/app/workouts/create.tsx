import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useCreateWorkout } from '@/hooks/useWorkouts';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { useWorkoutDraft } from '@/stores/workoutDraftStore';

export default function CreateWorkoutScreen() {
  const [name, setName] = useState('');
  const [notes, setNotes] = useState('');
  const [duration, setDuration] = useState('');
  const { exercises, removeExercise, clear } = useWorkoutDraft();
  const createWorkout = useCreateWorkout();

  // Limpiar el draft cuando se desmonta el componente
  useEffect(() => {
    return () => {
      // Solo limpiar si el workout fue creado exitosamente
    };
  }, []);

  const handleCreate = async () => {
    if (!name.trim()) {
      Alert.alert('Error', 'El nombre del entrenamiento es requerido');
      return;
    }

    // Convertir ejercicios al formato del backend
    const exercisesData = exercises.map((e) => ({
      exerciseId: e.exercise._id,
      sets: e.sets.map((set) => ({
        reps: set.reps,
        weight: set.weight,
        completed: set.completed,
      })),
    }));

    try {
      await createWorkout.mutateAsync({
        name: name.trim(),
        notes: notes.trim() || undefined,
        duration: duration ? parseInt(duration) * 60 : undefined,
        exercises: exercisesData.length > 0 ? exercisesData : undefined,
      });

      Alert.alert('Éxito', 'Entrenamiento creado correctamente');
      clear(); // Limpiar el draft
      router.back();
    } catch (error: any) {
      Alert.alert(
        'Error',
        error.response?.data?.error?.message || 'Error al crear el entrenamiento'
      );
    }
  };

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header con gradiente */}
      <LinearGradient
        colors={['#9D12DE', '#7C3AED']}
        className="px-6 pt-12 pb-6"
      >
        <View className="flex-row items-center justify-between">
          <TouchableOpacity onPress={() => router.back()} className="p-2">
            <Ionicons name="close" size={28} color="white" />
          </TouchableOpacity>
          <Text className="text-2xl font-bold text-white">
            Nuevo Entrenamiento
          </Text>
          <View style={{ width: 32 }} />
        </View>
      </LinearGradient>

      <ScrollView className="flex-1" contentContainerClassName="p-6 gap-6">
        {/* Nombre */}
        <View>
          <View className="flex-row items-center gap-2 mb-3">
            <View className="bg-primary/10 p-2 rounded-lg">
              <Ionicons name="create" size={20} color="#9D12DE" />
            </View>
            <Text className="text-base font-bold text-gray-900">
              Nombre del entrenamiento *
            </Text>
          </View>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Ej: Rutina de espalda"
            className="bg-white border-2 border-gray-200 rounded-xl px-4 py-4 text-base focus:border-primary"
            maxLength={100}
            placeholderTextColor="#9CA3AF"
          />
          <Text className="text-xs text-gray-500 mt-2">
            {name.length}/100 caracteres
          </Text>
        </View>

        {/* Duración */}
        <View>
          <View className="flex-row items-center gap-2 mb-3">
            <View className="bg-primary/10 p-2 rounded-lg">
              <Ionicons name="time" size={20} color="#9D12DE" />
            </View>
            <Text className="text-base font-bold text-gray-900">
              Duración (minutos)
            </Text>
          </View>
          <TextInput
            value={duration}
            onChangeText={setDuration}
            placeholder="30"
            keyboardType="number-pad"
            className="bg-white border-2 border-gray-200 rounded-xl px-4 py-4 text-base focus:border-primary"
            placeholderTextColor="#9CA3AF"
          />
        </View>

        {/* Ejercicios */}
        <View>
          <View className="flex-row items-center justify-between mb-3">
            <View className="flex-row items-center gap-2">
              <View className="bg-primary/10 p-2 rounded-lg">
                <Ionicons name="barbell" size={20} color="#9D12DE" />
              </View>
              <Text className="text-base font-bold text-gray-900">
                Ejercicios ({exercises.length})
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => router.push('/exercises/library?mode=select')}
              className="bg-primary px-4 py-2 rounded-full flex-row items-center gap-2"
            >
              <Ionicons name="add" size={20} color="white" />
              <Text className="text-white font-semibold">Agregar</Text>
            </TouchableOpacity>
          </View>

          {exercises.length === 0 ? (
            <Card className="items-center py-8 bg-gray-50">
              <View className="bg-gray-200 rounded-full p-6 mb-3">
                <Ionicons name="barbell-outline" size={48} color="#9CA3AF" />
              </View>
              <Text className="text-gray-900 text-base font-semibold mb-1">
                Sin ejercicios
              </Text>
              <Text className="text-gray-500 text-sm text-center px-8">
                Agrega ejercicios desde la biblioteca
              </Text>
            </Card>
          ) : (
            exercises.map((item, index) => (
              <Card key={item.exercise._id} className="p-4 flex-row items-center gap-3 mb-3">
                <View className="bg-primary/10 p-3 rounded-xl">
                  <Ionicons name="barbell" size={24} color="#9D12DE" />
                </View>
                <View className="flex-1">
                  <Text className="text-base font-bold text-gray-900 mb-1">
                    {item.exercise.name.es}
                  </Text>
                  <Text className="text-sm text-gray-600">
                    {item.sets.length} serie{item.sets.length > 1 ? 's' : ''} •{' '}
                    {item.sets.map((s) => s.reps).join('-')} reps
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() =>
                    router.push(
                      `/workouts/configure-sets?exerciseId=${item.exercise._id}&exerciseName=${item.exercise.name.es}`
                    )
                  }
                  className="p-2 bg-gray-100 rounded-lg"
                >
                  <Ionicons name="settings" size={20} color="#6B7280" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => removeExercise(item.exercise._id)}
                  className="p-2 bg-red-100 rounded-lg"
                >
                  <Ionicons name="trash" size={20} color="#EF4444" />
                </TouchableOpacity>
              </Card>
            ))
          )}
        </View>

        {/* Notas */}
        <View>
          <View className="flex-row items-center gap-2 mb-3">
            <View className="bg-purple-100 p-2 rounded-lg">
              <Ionicons name="document-text" size={20} color="#A855F7" />
            </View>
            <Text className="text-base font-bold text-gray-900">Notas</Text>
          </View>
          <TextInput
            value={notes}
            onChangeText={setNotes}
            placeholder="Añade notas sobre tu entrenamiento..."
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            className="bg-white border-2 border-gray-200 rounded-xl px-4 py-4 text-base min-h-[120px] focus:border-purple-500"
            maxLength={1000}
            placeholderTextColor="#9CA3AF"
          />
          <Text className="text-xs text-gray-500 mt-2">
            {notes.length}/1000 caracteres
          </Text>
        </View>

        {/* Info */}
        <View className="bg-primary/10 p-5 rounded-2xl border border-primary/20">
          <View className="flex-row items-start gap-3">
            <View className="bg-primary p-2 rounded-full mt-1">
              <Ionicons name="information" size={20} color="white" />
            </View>
            <View className="flex-1">
              <Text className="text-base font-bold text-text mb-1">
                Versión Simplificada
              </Text>
              <Text className="text-sm text-text/70 leading-5">
                Por ahora solo registra el entrenamiento básico. En la próxima actualización podrás añadir series, repeticiones y peso para cada ejercicio.
              </Text>
            </View>
          </View>
        </View>

        {/* Botón crear */}
        <TouchableOpacity
          onPress={handleCreate}
          disabled={createWorkout.isPending || !name.trim()}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={createWorkout.isPending || !name.trim() ? ['#9CA3AF', '#6B7280'] : ['#9D12DE', '#7C3AED']}
            className="py-4 rounded-2xl items-center justify-center flex-row gap-2"
            style={{ elevation: 3 }}
          >
            {createWorkout.isPending ? (
              <>
                <Ionicons name="hourglass-outline" size={24} color="white" />
                <Text className="text-white font-bold text-lg">Creando...</Text>
              </>
            ) : (
              <>
                <Ionicons name="checkmark-circle" size={24} color="white" />
                <Text className="text-white font-bold text-lg">Crear Entrenamiento</Text>
              </>
            )}
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

