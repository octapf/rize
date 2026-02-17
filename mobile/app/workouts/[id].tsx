import React, { useState } from 'react';
import { Text } from '@/components/ui/Text';
import { View, ScrollView, TouchableOpacity, Alert, ActivityIndicator, TextInput, Modal } from 'react-native';;
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useWorkout, useDeleteWorkout } from '@/hooks/useWorkouts';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { templatesApi } from '@/services/api/templates.api';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/contexts/ToastContext';

export default function WorkoutDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data, isLoading } = useWorkout(id);
  const deleteWorkout = useDeleteWorkout();
  const queryClient = useQueryClient();
  const toast = useToast();
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [templateName, setTemplateName] = useState('');

  const saveAsTemplateMutation = useMutation({
    mutationFn: (name: string) =>
      templatesApi.createFromWorkout(id, { name }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['templates'] });
      toast.success('Plantilla creada exitosamente');
      setShowSaveModal(false);
      setTemplateName('');
    },
    onError: () => {
      toast.error('Error al crear plantilla');
    },
  });

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
      <View className="flex-1 bg-background items-center justify-center">
        <ActivityIndicator size="large" color="#9D12DE" />
      </View>
    );
  }

  if (!data?.data) {
    return (
      <View className="flex-1 bg-background items-center justify-center">
        <Text className="text-text/60">Entrenamiento no encontrado</Text>
      </View>
    );
  }

  const workout = data.data;

  const handleStartWorkout = () => {
    router.push(`/workouts/active?id=${id}`);
  };

  const handleSaveAsTemplate = () => {
    if (!data?.data) return;
    setTemplateName(data.data.name);
    setShowSaveModal(true);
  };

  const handleConfirmSaveTemplate = () => {
    if (!templateName.trim()) {
      toast.error('Por favor ingresa un nombre para la plantilla');
      return;
    }
    saveAsTemplateMutation.mutate(templateName);
  };

  return (
    <View className="flex-1 bg-background">
      {/* Header con gradiente */}
      <LinearGradient
        colors={['#9D12DE', '#7D0EBE']}
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

        {/* Start Workout Button */}
        {workout.status !== 'completed' && (
          <TouchableOpacity
            onPress={handleStartWorkout}
            className="bg-[#2A2A2A] mt-4 py-3 rounded-xl flex-row items-center justify-center gap-2"
          >
            <Ionicons name="play-circle" size={24} color="#FFEA00" />
            <Text className="text-highlight font-bold text-lg">
              {workout.status === 'in-progress' ? 'Continuar Entrenamiento' : 'Empezar Entrenamiento'}
            </Text>
          </TouchableOpacity>
        )}
      </LinearGradient>

      <ScrollView className="flex-1" contentContainerClassName="p-6 gap-6">
        {/* Título y XP */}
        <Card className="p-6 bg-[#2A2A2A]">
          <View className="flex-row items-start justify-between mb-4">
            <View className="flex-1 pr-4">
              <Text className="text-3xl font-bold text-text mb-2">
                {workout.name}
              </Text>
              <View className="flex-row items-center gap-2">
                <Ionicons name="calendar" size={16} color="#9D12DE" />
                <Text className="text-sm text-text/80 capitalize">
                  {formatDate(workout.date)}
                </Text>
              </View>
            </View>
            <LinearGradient
              colors={['#9D12DE', '#7D0EBE']}
              className="px-5 py-3 rounded-2xl"
              style={{ elevation: 3 }}
            >
              <View className="items-center">
                <Ionicons name="flash" size={24} color="#FFEA00" />
                <Text className="text-highlight font-bold text-xl mt-1">
                  {workout.xpEarned}
                </Text>
                <Text className="text-white/80 text-xs font-semibold">XP</Text>
              </View>
            </LinearGradient>
          </View>
        </Card>

        {/* Estadísticas */}
        <Card className="p-6">
          <Text className="text-xl font-bold text-text mb-5">
            Estadísticas
          </Text>
          <View className="gap-4">
            <View className="flex-row items-center gap-4">
              <LinearGradient
                colors={['#9D12DE', '#7D0EBE']}
                className="p-4 rounded-2xl"
                style={{ elevation: 2 }}
              >
                <Ionicons name="barbell" size={28} color="white" />
              </LinearGradient>
              <View className="flex-1">
                <Text className="text-sm text-text/60 mb-1">Ejercicios</Text>
                <Text className="text-2xl font-bold text-text">
                  {workout.exercises.length}
                </Text>
              </View>
            </View>
            <View className="flex-row items-center gap-4">
              <LinearGradient
                colors={['#FFEA00', '#FFD700']}
                className="p-4 rounded-2xl"
                style={{ elevation: 2 }}
              >
                <Ionicons name="time" size={28} color="#262626" />
              </LinearGradient>
              <View className="flex-1">
                <Text className="text-sm text-text/60 mb-1">Duración</Text>
                <Text className="text-2xl font-bold text-text">
                  {formatDuration(workout.duration)}
                </Text>
              </View>
            </View>
            <View className="flex-row items-center gap-4">
              <LinearGradient
                colors={['#9D12DE', '#7D0EBE']}
                className="p-4 rounded-2xl"
                style={{ elevation: 2 }}
              >
                <Ionicons name="eye" size={28} color="white" />
              </LinearGradient>
              <View className="flex-1">
                <Text className="text-sm text-text/60 mb-1">Visibilidad</Text>
                <Text className="text-2xl font-bold text-text capitalize">
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
          <Card className="p-6 bg-[#2A2A2A]">
            <View className="flex-row items-center gap-2 mb-3">
              <View className="bg-highlight p-2 rounded-lg">
                <Ionicons name="document-text" size={20} color="#262626" />
              </View>
              <Text className="text-xl font-bold text-text">Notas</Text>
            </View>
            <Text className="text-text/80 leading-6 text-base">{workout.notes}</Text>
          </Card>
        )}

        {/* Ejercicios */}
        {workout.exercises.length > 0 && (
          <Card className="p-6">
            <View className="flex-row items-center gap-2 mb-4">
              <LinearGradient
                colors={['#9D12DE', '#7D0EBE']}
                className="p-2 rounded-lg"
              >
                <Ionicons name="barbell" size={20} color="white" />
              </LinearGradient>
              <Text className="text-xl font-bold text-text">Ejercicios</Text>
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
                    className="bg-[#2A2A2A] p-4 rounded-xl border border-[#404040]"
                  >
                    <View className="flex-row items-center justify-between mb-3">
                      <Text className="text-lg font-bold text-text flex-1">
                        {exerciseData.name.es}
                      </Text>
                      <View className="bg-primary/20 px-3 py-1 rounded-full">
                        <Text className="text-primary font-semibold text-xs uppercase">
                          {exerciseData.category}
                        </Text>
                      </View>
                    </View>
                    
                    <View className="flex-row items-center gap-4 flex-wrap">
                      <View className="flex-row items-center gap-2">
                        <Ionicons name="layers" size={16} color="#9D12DE" />
                        <Text className="text-sm text-text/70">
                          {totalSets} {totalSets === 1 ? 'serie' : 'series'}
                        </Text>
                      </View>
                      
                      <View className="flex-row items-center gap-2">
                        <Ionicons name="repeat" size={16} color="#9D12DE" />
                        <Text className="text-sm text-text/70">
                          {repsInfo} reps
                        </Text>
                      </View>
                      
                      {avgWeight && (
                        <View className="flex-row items-center gap-2">
                          <Ionicons name="barbell" size={16} color="#FFEA00" />
                          <Text className="text-sm text-text/70">
                            {avgWeight} kg avg
                          </Text>
                        </View>
                      )}
                    </View>
                    
                    {exercise.notes && (
                      <View className="mt-3 pt-3 border-t border-[#404040]">
                        <Text className="text-sm text-text/60 italic">
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

        {/* Save as Template Button */}
        {workout.status === 'completed' && (
          <TouchableOpacity
            onPress={handleSaveAsTemplate}
            className="bg-primary p-4 rounded-xl flex-row items-center justify-center gap-2 mb-4"
            style={{ elevation: 2 }}
          >
            <Ionicons name="bookmark" size={24} color="white" />
            <Text className="text-white font-bold text-lg">
              Guardar como Plantilla
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>

      {/* Save Template Modal */}
      <Modal
        visible={showSaveModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowSaveModal(false)}
      >
        <View className="flex-1 bg-black/50 justify-center items-center p-6">
          <View className="bg-[#2A2A2A] rounded-2xl p-6 w-full max-w-md">
            <Text className="text-2xl font-bold text-text mb-4">
              Guardar como Plantilla
            </Text>
            <Text className="text-text/70 mb-4">
              Dale un nombre a esta plantilla para reutilizarla en futuros entrenamientos
            </Text>
            <TextInput
              value={templateName}
              onChangeText={setTemplateName}
              placeholder="Nombre de la plantilla"
              className="border border-[#404040] bg-background rounded-xl px-4 py-3 mb-4 text-text"
              placeholderTextColor="#9CA3AF"
              autoFocus
            />
            <View className="flex-row gap-3">
              <TouchableOpacity
                onPress={() => setShowSaveModal(false)}
                className="flex-1 bg-[#404040] py-3 rounded-xl"
              >
                <Text className="text-text font-bold text-center">
                  Cancelar
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleConfirmSaveTemplate}
                disabled={saveAsTemplateMutation.isPending}
                className="flex-1 bg-primary py-3 rounded-xl"
              >
                <Text className="text-white font-bold text-center">
                  {saveAsTemplateMutation.isPending ? 'Guardando...' : 'Guardar'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
