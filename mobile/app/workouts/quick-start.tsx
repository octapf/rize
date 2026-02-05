import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { workoutsApi } from '@/services/api/workouts.api';
import { Card } from '@/components/ui/Card';

export default function QuickStartScreen() {
  const queryClient = useQueryClient();
  const [workoutName, setWorkoutName] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  // Mock templates - Replace with real API
  const { data: templatesData } = useQuery({
    queryKey: ['workout-templates'],
    queryFn: async () => {
      return {
        data: {
          templates: [
            {
              _id: '1',
              name: 'Push Day',
              exercises: 5,
              icon: 'ðŸ’ª',
              estimatedTime: 60,
            },
            {
              _id: '2',
              name: 'Pull Day',
              exercises: 6,
              icon: 'ðŸ‹ï¸',
              estimatedTime: 70,
            },
            {
              _id: '3',
              name: 'Leg Day',
              exercises: 5,
              icon: 'ðŸ¦µ',
              estimatedTime: 75,
            },
            {
              _id: '4',
              name: 'Full Body',
              exercises: 8,
              icon: 'ðŸ”¥',
              estimatedTime: 90,
            },
          ],
        },
      };
    },
  });

  const templates = templatesData?.data.templates || [];

  const startWorkoutMutation = useMutation({
    mutationFn: async (data: { name: string; templateId?: string }) => {
      // Here you would call the real API to start a workout
      return workoutsApi.createWorkout({ name: data.name });
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['workouts'] });
      router.replace('/workouts/active');
    },
    onError: (error: any) => {
      Alert.alert('Error', error.response?.data?.message || 'Error al iniciar workout');
    },
  });

  const handleQuickStart = () => {
    if (!workoutName.trim() && !selectedTemplate) {
      Alert.alert('Error', 'Ingresa un nombre o selecciona una plantilla');
      return;
    }

    const name = workoutName.trim() || templates.find(t => t._id === selectedTemplate)?.name || 'Workout';
    
    startWorkoutMutation.mutate({
      name,
      templateId: selectedTemplate || undefined,
    });
  };

  const handleEmptyWorkout = () => {
    const name = workoutName.trim() || `Entrenamiento ${new Date().toLocaleDateString()}`;
    startWorkoutMutation.mutate({ name });
  };

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <LinearGradient colors={['#9D12DE', '#7C3AED']} className="px-6 pt-12 pb-6">
        <View className="flex-row items-center justify-between mb-4">
          <TouchableOpacity onPress={() => router.back()} className="p-2">
            <Ionicons name="arrow-back" size={28} color="white" />
          </TouchableOpacity>
          <Text className="text-2xl font-bold text-white">Inicio RÃ¡pido</Text>
          <View className="w-10" />
        </View>

        <Text className="text-primary/50 text-center">
          Comienza tu entrenamiento en segundos
        </Text>
      </LinearGradient>

      <ScrollView className="flex-1" contentContainerClassName="p-6 gap-6">
        {/* Workout Name Input */}
        <Card className="p-4">
          <Text className="text-gray-700 font-semibold mb-2">
            Nombre del Entrenamiento (Opcional)
          </Text>
          <TextInput
            value={workoutName}
            onChangeText={setWorkoutName}
            placeholder="Ej: Pecho y TrÃ­ceps"
            className="bg-gray-50 rounded-lg px-4 py-3 text-gray-900"
            placeholderTextColor="#9CA3AF"
          />
        </Card>

        {/* Quick Templates */}
        <View>
          <Text className="text-lg font-bold text-gray-900 mb-3">
            Plantillas RÃ¡pidas
          </Text>
          <View className="gap-3">
            {templates.map((template) => (
              <TouchableOpacity
                key={template._id}
                onPress={() => setSelectedTemplate(template._id)}
                activeOpacity={0.7}
              >
                <Card
                  className={`p-4 ${
                    selectedTemplate === template._id
                      ? 'border-2 border-primary bg-primary/10'
                      : ''
                  }`}
                >
                  <View className="flex-row items-center gap-4">
                    <Text className="text-4xl">{template.icon}</Text>
                    <View className="flex-1">
                      <Text
                        className={`font-bold text-lg ${
                          selectedTemplate === template._id
                            ? 'text-primary'
                            : 'text-gray-900'
                        }`}
                      >
                        {template.name}
                      </Text>
                      <View className="flex-row items-center gap-3 mt-1">
                        <View className="flex-row items-center gap-1">
                          <Ionicons name="barbell" size={14} color="#6B7280" />
                          <Text className="text-gray-600 text-sm">
                            {template.exercises} ejercicios
                          </Text>
                        </View>
                        <View className="flex-row items-center gap-1">
                          <Ionicons name="time" size={14} color="#6B7280" />
                          <Text className="text-gray-600 text-sm">
                            ~{template.estimatedTime}m
                          </Text>
                        </View>
                      </View>
                    </View>
                    {selectedTemplate === template._id && (
                      <Ionicons
                        name="checkmark-circle"
                        size={28}
                        color="#9D12DE"
                      />
                    )}
                  </View>
                </Card>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Quick Actions */}
        <View>
          <Text className="text-lg font-bold text-gray-900 mb-3">
            Acciones RÃ¡pidas
          </Text>

          <View className="gap-3">
            {/* Start with Template */}
            <TouchableOpacity
              onPress={handleQuickStart}
              disabled={startWorkoutMutation.isPending}
            >
              <LinearGradient
                colors={['#9D12DE', '#7C3AED']}
                className="rounded-xl p-4 flex-row items-center justify-between"
              >
                {startWorkoutMutation.isPending ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <>
                    <View className="flex-row items-center gap-3">
                      <View className="bg-white/20 w-12 h-12 rounded-full items-center justify-center">
                        <Ionicons name="play" size={24} color="white" />
                      </View>
                      <View>
                        <Text className="text-white font-bold text-lg">
                          Comenzar Ahora
                        </Text>
                        <Text className="text-primary/50 text-sm">
                          {selectedTemplate
                            ? 'Con plantilla seleccionada'
                            : 'Workout personalizado'}
                        </Text>
                      </View>
                    </View>
                    <Ionicons name="chevron-forward" size={24} color="white" />
                  </>
                )}
              </LinearGradient>
            </TouchableOpacity>

            {/* Empty Workout */}
            <TouchableOpacity
              onPress={handleEmptyWorkout}
              disabled={startWorkoutMutation.isPending}
            >
              <Card className="p-4 border-2 border-gray-200">
                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center gap-3">
                    <View className="bg-gray-100 w-12 h-12 rounded-full items-center justify-center">
                      <Ionicons name="add-circle" size={24} color="#6B7280" />
                    </View>
                    <View>
                      <Text className="text-gray-900 font-bold">
                        Workout VacÃ­o
                      </Text>
                      <Text className="text-gray-600 text-sm">
                        Agregar ejercicios manualmente
                      </Text>
                    </View>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
                </View>
              </Card>
            </TouchableOpacity>

            {/* Browse Library */}
            <TouchableOpacity onPress={() => router.push('/exercises/library')}>
              <Card className="p-4 border-2 border-gray-200">
                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center gap-3">
                    <View className="bg-primary/10 w-12 h-12 rounded-full items-center justify-center">
                      <Ionicons name="library" size={24} color="#9D12DE" />
                    </View>
                    <View>
                      <Text className="text-gray-900 font-bold">
                        Biblioteca de Ejercicios
                      </Text>
                      <Text className="text-gray-600 text-sm">
                        Explorar ejercicios disponibles
                      </Text>
                    </View>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
                </View>
              </Card>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}


