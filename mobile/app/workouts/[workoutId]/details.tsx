import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
  Share,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { workoutsApi } from '@/services/api/workouts.api';
import { Card } from '@/components/ui/Card';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export default function WorkoutDetailsScreen() {
  const { workoutId } = useLocalSearchParams();
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [notes, setNotes] = useState('');

  const { data: workoutData, isLoading } = useQuery({
    queryKey: ['workout', workoutId],
    queryFn: () => workoutsApi.getWorkoutById(workoutId as string),
  });

  const updateNotesMutation = useMutation({
    mutationFn: ({ id, notes }: { id: string; notes: string }) =>
      workoutsApi.updateWorkout(id, { notes }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workout', workoutId] });
      setIsEditing(false);
      Alert.alert('Éxito', 'Notas actualizadas');
    },
  });

  const deleteWorkoutMutation = useMutation({
    mutationFn: (id: string) => workoutsApi.deleteWorkout(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workouts'] });
      router.back();
    },
  });

  const workout = workoutData?.data;

  React.useEffect(() => {
    if (workout?.notes) {
      setNotes(workout.notes);
    }
  }, [workout]);

  const handleDelete = () => {
    Alert.alert(
      'Eliminar Entrenamiento',
      '¿Estás seguro de que quieres eliminar este entrenamiento? Esta acción no se puede deshacer.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => deleteWorkoutMutation.mutate(workoutId as string),
        },
      ]
    );
  };

  const handleShare = async () => {
    if (!workout) return;

    const totalSets = workout.exercises.reduce(
      (sum: number, ex: any) => sum + ex.sets.length,
      0
    );
    const totalVolume = workout.exercises.reduce(
      (sum: number, ex: any) =>
        sum +
        ex.sets.reduce(
          (setSum: number, set: any) =>
            setSum + (set.completed ? (set.weight || 0) * (set.reps || 0) : 0),
          0
        ),
      0
    );

    const message = `🏋️ ${workout.name}
📅 ${format(new Date(workout.completedAt), "dd 'de' MMMM", { locale: es })}
💪 ${workout.exercises.length} ejercicios, ${totalSets} series
⚡ ${totalVolume.toLocaleString()} kg de volumen total

¡Entrena conmigo en Rize!`;

    try {
      await Share.share({
        message,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleSaveNotes = () => {
    updateNotesMutation.mutate({
      id: workoutId as string,
      notes,
    });
  };

  if (isLoading) {
    return (
      <View className="flex-1 bg-gray-50 items-center justify-center">
        <ActivityIndicator size="large" color="#10B981" />
      </View>
    );
  }

  if (!workout) {
    return (
      <View className="flex-1 bg-gray-50 items-center justify-center p-6">
        <Ionicons name="alert-circle" size={64} color="#EF4444" />
        <Text className="text-gray-900 text-xl font-bold mt-4">
          Entrenamiento no encontrado
        </Text>
        <TouchableOpacity
          onPress={() => router.back()}
          className="mt-6 bg-emerald-600 px-6 py-3 rounded-full"
        >
          <Text className="text-white font-semibold">Volver</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const totalSets = workout.exercises.reduce(
    (sum: number, ex: any) => sum + ex.sets.length,
    0
  );
  const completedSets = workout.exercises.reduce(
    (sum: number, ex: any) => sum + ex.sets.filter((s: any) => s.completed).length,
    0
  );
  const totalVolume = workout.exercises.reduce(
    (sum: number, ex: any) =>
      sum +
      ex.sets.reduce(
        (setSum: number, set: any) =>
          setSum + (set.completed ? (set.weight || 0) * (set.reps || 0) : 0),
        0
      ),
    0
  );

  const duration = workout.duration || 0;
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;
  const durationText =
    hours > 0 ? `${hours}h ${minutes}m` : `${minutes} minutos`;

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <LinearGradient colors={['#10B981', '#059669']} className="px-6 pt-12 pb-6">
        <View className="flex-row items-center justify-between mb-4">
          <TouchableOpacity onPress={() => router.back()} className="p-2">
            <Ionicons name="arrow-back" size={28} color="white" />
          </TouchableOpacity>
          <Text className="text-xl font-bold text-white flex-1 text-center" numberOfLines={1}>
            {workout.name}
          </Text>
          <TouchableOpacity onPress={handleShare} className="p-2">
            <Ionicons name="share-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Date */}
        <Text className="text-emerald-100 text-center">
          {workout.completedAt
            ? format(new Date(workout.completedAt), "dd 'de' MMMM 'de' yyyy", {
                locale: es,
              })
            : 'En progreso'}
        </Text>
      </LinearGradient>

      <ScrollView className="flex-1" contentContainerClassName="p-6 gap-6">
        {/* Stats */}
        <View className="flex-row gap-3">
          <Card className="flex-1 p-4">
            <View className="items-center">
              <Ionicons name="checkmark-circle" size={24} color="#10B981" />
              <Text className="text-gray-600 text-xs mt-2">Completadas</Text>
              <Text className="text-gray-900 text-xl font-bold mt-1">
                {completedSets}/{totalSets}
              </Text>
            </View>
          </Card>

          <Card className="flex-1 p-4">
            <View className="items-center">
              <Ionicons name="barbell" size={24} color="#8B5CF6" />
              <Text className="text-gray-600 text-xs mt-2">Volumen</Text>
              <Text className="text-gray-900 text-xl font-bold mt-1">
                {totalVolume.toLocaleString()} kg
              </Text>
            </View>
          </Card>

          <Card className="flex-1 p-4">
            <View className="items-center">
              <Ionicons name="time" size={24} color="#FFEA00" />
              <Text className="text-gray-600 text-xs mt-2">Duración</Text>
              <Text className="text-gray-900 text-lg font-bold mt-1">
                {durationText}
              </Text>
            </View>
          </Card>
        </View>

        {/* Exercises */}
        <View>
          <Text className="text-lg font-bold text-gray-900 mb-3">
            Ejercicios ({workout.exercises.length})
          </Text>

          <View className="gap-3">
            {workout.exercises.map((exercise: any, index: number) => (
              <Card key={index} className="p-4">
                <View className="flex-row items-center justify-between mb-3">
                  <TouchableOpacity
                    onPress={() =>
                      router.push(`/exercises/${exercise.exercise._id}/progress`)
                    }
                    className="flex-1"
                  >
                    <Text className="text-gray-900 font-bold text-base">
                      {index + 1}. {exercise.exercise.name}
                    </Text>
                    {exercise.exercise.muscleGroup && (
                      <Text className="text-gray-600 text-sm capitalize">
                        {exercise.exercise.muscleGroup}
                      </Text>
                    )}
                  </TouchableOpacity>
                  <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
                </View>

                {/* Sets */}
                <View className="border-t border-gray-200 pt-3">
                  {exercise.sets.map((set: any, setIndex: number) => (
                    <View
                      key={setIndex}
                      className={`flex-row items-center justify-between py-2 ${
                        setIndex < exercise.sets.length - 1
                          ? 'border-b border-gray-100'
                          : ''
                      }`}
                    >
                      <View className="flex-row items-center gap-3">
                        <View
                          className={`w-8 h-8 rounded-full items-center justify-center ${
                            set.completed ? 'bg-emerald-500' : 'bg-gray-200'
                          }`}
                        >
                          <Text
                            className={`font-bold ${
                              set.completed ? 'text-white' : 'text-gray-600'
                            }`}
                          >
                            {setIndex + 1}
                          </Text>
                        </View>
                        <View>
                          <View className="flex-row items-center gap-2">
                            <Text className="text-gray-900 font-semibold">
                              {set.weight || 0} kg
                            </Text>
                            <Text className="text-gray-400">×</Text>
                            <Text className="text-gray-900 font-semibold">
                              {set.reps || 0} reps
                            </Text>
                          </View>
                          {set.notes && (
                            <Text className="text-gray-600 text-xs mt-1">
                              {set.notes}
                            </Text>
                          )}
                        </View>
                      </View>
                      {set.completed && (
                        <Ionicons
                          name="checkmark-circle"
                          size={20}
                          color="#10B981"
                        />
                      )}
                    </View>
                  ))}
                </View>

                {exercise.notes && (
                  <View className="mt-3 bg-amber-50 p-3 rounded-lg">
                    <Text className="text-amber-900 text-sm">
                      📝 {exercise.notes}
                    </Text>
                  </View>
                )}
              </Card>
            ))}
          </View>
        </View>

        {/* Notes */}
        <Card className="p-4">
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-gray-900 font-bold text-base">
              Notas del Entrenamiento
            </Text>
            {!isEditing && (
              <TouchableOpacity onPress={() => setIsEditing(true)}>
                <Ionicons name="create-outline" size={20} color="#10B981" />
              </TouchableOpacity>
            )}
          </View>

          {isEditing ? (
            <View>
              <TextInput
                value={notes}
                onChangeText={setNotes}
                placeholder="Agrega notas sobre este entrenamiento..."
                className="bg-gray-50 rounded-lg px-4 py-3 text-gray-900 mb-3"
                placeholderTextColor="#9CA3AF"
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
              <View className="flex-row gap-2">
                <TouchableOpacity
                  onPress={handleSaveNotes}
                  disabled={updateNotesMutation.isPending}
                  className="flex-1 bg-emerald-500 py-2.5 rounded-lg"
                >
                  {updateNotesMutation.isPending ? (
                    <ActivityIndicator color="white" size="small" />
                  ) : (
                    <Text className="text-white font-semibold text-center">
                      Guardar
                    </Text>
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setNotes(workout.notes || '');
                    setIsEditing(false);
                  }}
                  className="flex-1 bg-gray-200 py-2.5 rounded-lg"
                >
                  <Text className="text-gray-700 font-semibold text-center">
                    Cancelar
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <Text className="text-gray-600">
              {notes || 'Sin notas'}
            </Text>
          )}
        </Card>

        {/* Delete Button */}
        <TouchableOpacity
          onPress={handleDelete}
          disabled={deleteWorkoutMutation.isPending}
          className="bg-red-50 border border-red-200 rounded-xl py-4 items-center"
        >
          {deleteWorkoutMutation.isPending ? (
            <ActivityIndicator color="#EF4444" />
          ) : (
            <View className="flex-row items-center gap-2">
              <Ionicons name="trash-outline" size={20} color="#EF4444" />
              <Text className="text-red-600 font-bold">
                Eliminar Entrenamiento
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
