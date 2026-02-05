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
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { exercisesApi } from '@/services/api/exercises.api';
import { Card } from '@/components/ui/Card';

type MuscleGroup = 'chest' | 'back' | 'legs' | 'shoulders' | 'arms' | 'core' | 'cardio' | 'other';

const muscleGroups: { id: MuscleGroup; name: string; icon: string; color: string }[] = [
  { id: 'chest', name: 'Pecho', icon: 'ðŸ’ª', color: '#EF4444' },
  { id: 'back', name: 'Espalda', icon: 'ðŸ‹ï¸', color: '#9D12DE' },
  { id: 'legs', name: 'Piernas', icon: 'ðŸ¦µ', color: '#9D12DE' },
  { id: 'shoulders', name: 'Hombros', icon: 'ðŸ‘', color: '#FFEA00' },
  { id: 'arms', name: 'Brazos', icon: 'ðŸ’ª', color: '#8B5CF6' },
  { id: 'core', name: 'Core', icon: 'ðŸŽ¯', color: '#EC4899' },
  { id: 'cardio', name: 'Cardio', icon: 'â¤ï¸', color: '#EF4444' },
  { id: 'other', name: 'Otro', icon: 'ðŸ”¥', color: '#6B7280' },
];

export default function CreateExerciseScreen() {
  const queryClient = useQueryClient();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [muscleGroup, setMuscleGroup] = useState<MuscleGroup>('chest');
  const [equipment, setEquipment] = useState('');
  const [instructions, setInstructions] = useState('');
  const [videoUrl, setVideoUrl] = useState('');

  const createExerciseMutation = useMutation({
    mutationFn: (data: any) => exercisesApi.createExercise(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['exercises'] });
      Alert.alert('Ã‰xito', 'Ejercicio creado correctamente', [
        {
          text: 'OK',
          onPress: () => router.back(),
        },
      ]);
    },
    onError: (error: any) => {
      Alert.alert('Error', error.response?.data?.message || 'Error al crear el ejercicio');
    },
  });

  const handleCreate = () => {
    if (!name.trim()) {
      Alert.alert('Error', 'El nombre del ejercicio es requerido');
      return;
    }

    createExerciseMutation.mutate({
      name: name.trim(),
      description: description.trim() || undefined,
      muscleGroup,
      equipment: equipment.trim() || undefined,
      instructions: instructions.trim() || undefined,
      videoUrl: videoUrl.trim() || undefined,
    });
  };

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <LinearGradient colors={['#9D12DE', '#7C3AED']} className="px-6 pt-12 pb-6">
        <View className="flex-row items-center justify-between">
          <TouchableOpacity onPress={() => router.back()} className="p-2">
            <Ionicons name="arrow-back" size={28} color="white" />
          </TouchableOpacity>
          <Text className="text-2xl font-bold text-white">Crear Ejercicio</Text>
          <View className="w-10" />
        </View>
      </LinearGradient>

      <ScrollView className="flex-1" contentContainerClassName="p-6 gap-4">
        {/* Name Input */}
        <Card className="p-4">
          <Text className="text-gray-700 font-semibold mb-2">
            Nombre del Ejercicio *
          </Text>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Ej: Press de Banca"
            className="bg-gray-50 rounded-lg px-4 py-3 text-gray-900"
            placeholderTextColor="#9CA3AF"
          />
        </Card>

        {/* Muscle Group Selection */}
        <Card className="p-4">
          <Text className="text-gray-700 font-semibold mb-3">
            Grupo Muscular *
          </Text>
          <View className="flex-row flex-wrap gap-2">
            {muscleGroups.map((group) => (
              <TouchableOpacity
                key={group.id}
                onPress={() => setMuscleGroup(group.id)}
                className={`px-4 py-2 rounded-full flex-row items-center gap-2 ${
                  muscleGroup === group.id
                    ? 'bg-primary'
                    : 'bg-gray-100 border border-gray-300'
                }`}
              >
                <Text>{group.icon}</Text>
                <Text
                  className={`font-semibold ${
                    muscleGroup === group.id ? 'text-white' : 'text-gray-700'
                  }`}
                >
                  {group.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Card>

        {/* Description */}
        <Card className="p-4">
          <Text className="text-gray-700 font-semibold mb-2">
            DescripciÃ³n
          </Text>
          <TextInput
            value={description}
            onChangeText={setDescription}
            placeholder="DescripciÃ³n breve del ejercicio"
            className="bg-gray-50 rounded-lg px-4 py-3 text-gray-900"
            placeholderTextColor="#9CA3AF"
            multiline
            numberOfLines={3}
            textAlignVertical="top"
          />
        </Card>

        {/* Equipment */}
        <Card className="p-4">
          <Text className="text-gray-700 font-semibold mb-2">
            Equipamiento
          </Text>
          <TextInput
            value={equipment}
            onChangeText={setEquipment}
            placeholder="Ej: Barra, Mancuernas, MÃ¡quina"
            className="bg-gray-50 rounded-lg px-4 py-3 text-gray-900"
            placeholderTextColor="#9CA3AF"
          />
        </Card>

        {/* Instructions */}
        <Card className="p-4">
          <Text className="text-gray-700 font-semibold mb-2">
            Instrucciones
          </Text>
          <TextInput
            value={instructions}
            onChangeText={setInstructions}
            placeholder="Pasos detallados para ejecutar el ejercicio..."
            className="bg-gray-50 rounded-lg px-4 py-3 text-gray-900"
            placeholderTextColor="#9CA3AF"
            multiline
            numberOfLines={5}
            textAlignVertical="top"
          />
        </Card>

        {/* Video URL */}
        <Card className="p-4">
          <Text className="text-gray-700 font-semibold mb-2">
            URL del Video (YouTube)
          </Text>
          <TextInput
            value={videoUrl}
            onChangeText={setVideoUrl}
            placeholder="https://youtube.com/watch?v=..."
            className="bg-gray-50 rounded-lg px-4 py-3 text-gray-900"
            placeholderTextColor="#9CA3AF"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="url"
          />
        </Card>

        {/* Create Button */}
        <TouchableOpacity
          onPress={handleCreate}
          disabled={createExerciseMutation.isPending}
          className="mt-4"
        >
          <LinearGradient
            colors={['#9D12DE', '#7C3AED']}
            className="rounded-xl py-4 items-center"
          >
            {createExerciseMutation.isPending ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-white text-lg font-bold">
                Crear Ejercicio
              </Text>
            )}
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

