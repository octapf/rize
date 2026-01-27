import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface WorkoutTemplate {
  id: string;
  name: string;
  description: string;
  category: 'strength' | 'hypertrophy' | 'endurance' | 'custom';
  exercises: Array<{
    id: string;
    name: string;
    sets: number;
    reps: string;
    rest: number; // seconds
  }>;
  duration: number; // estimated minutes
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  isCustom: boolean;
}

const PREDEFINED_TEMPLATES: WorkoutTemplate[] = [
  {
    id: '1',
    name: 'Push Day',
    description: 'Pecho, hombros y tríceps',
    category: 'hypertrophy',
    difficulty: 'intermediate',
    duration: 60,
    isCustom: false,
    exercises: [
      { id: '1', name: 'Fondos en Paralelas', sets: 4, reps: '8-12', rest: 120 },
      { id: '2', name: 'Pike Push-ups', sets: 3, reps: '10-15', rest: 90 },
      { id: '3', name: 'Diamond Push-ups', sets: 3, reps: '12-15', rest: 60 },
      { id: '4', name: 'Archer Push-ups', sets: 3, reps: '6-10', rest: 90 },
      { id: '5', name: 'Dips Bench', sets: 3, reps: '15-20', rest: 60 },
    ],
  },
  {
    id: '2',
    name: 'Pull Day',
    description: 'Espalda y bíceps',
    category: 'hypertrophy',
    difficulty: 'intermediate',
    duration: 55,
    isCustom: false,
    exercises: [
      { id: '1', name: 'Pull-ups', sets: 4, reps: '6-10', rest: 120 },
      { id: '2', name: 'Chin-ups', sets: 3, reps: '8-12', rest: 90 },
      { id: '3', name: 'Australian Pull-ups', sets: 3, reps: '12-15', rest: 60 },
      { id: '4', name: 'Typewriter Pull-ups', sets: 3, reps: '4-8', rest: 90 },
      { id: '5', name: 'Dead Hang', sets: 3, reps: '30-60s', rest: 60 },
    ],
  },
  {
    id: '3',
    name: 'Leg Day',
    description: 'Piernas y core',
    category: 'hypertrophy',
    difficulty: 'beginner',
    duration: 45,
    isCustom: false,
    exercises: [
      { id: '1', name: 'Pistol Squats', sets: 4, reps: '5-8', rest: 120 },
      { id: '2', name: 'Bulgarian Split Squats', sets: 3, reps: '10-12', rest: 90 },
      { id: '3', name: 'Nordic Curls', sets: 3, reps: '6-10', rest: 90 },
      { id: '4', name: 'Calf Raises', sets: 4, reps: '15-20', rest: 45 },
      { id: '5', name: 'Plank', sets: 3, reps: '60s', rest: 60 },
    ],
  },
  {
    id: '4',
    name: 'Full Body',
    description: 'Rutina completa para todo el cuerpo',
    category: 'strength',
    difficulty: 'beginner',
    duration: 50,
    isCustom: false,
    exercises: [
      { id: '1', name: 'Push-ups', sets: 3, reps: '12-15', rest: 90 },
      { id: '2', name: 'Pull-ups', sets: 3, reps: '6-10', rest: 90 },
      { id: '3', name: 'Squats', sets: 3, reps: '15-20', rest: 60 },
      { id: '4', name: 'Dips', sets: 3, reps: '10-12', rest: 90 },
      { id: '5', name: 'Hanging Leg Raises', sets: 3, reps: '10-15', rest: 60 },
    ],
  },
  {
    id: '5',
    name: 'Upper Body',
    description: 'Enfoque en tren superior',
    category: 'hypertrophy',
    difficulty: 'intermediate',
    duration: 65,
    isCustom: false,
    exercises: [
      { id: '1', name: 'Muscle-ups', sets: 4, reps: '3-6', rest: 180 },
      { id: '2', name: 'Weighted Pull-ups', sets: 4, reps: '6-8', rest: 120 },
      { id: '3', name: 'Weighted Dips', sets: 4, reps: '8-10', rest: 120 },
      { id: '4', name: 'Front Lever Hold', sets: 3, reps: '10-20s', rest: 90 },
      { id: '5', name: 'L-sit', sets: 3, reps: '15-30s', rest: 60 },
    ],
  },
  {
    id: '6',
    name: 'Lower Body',
    description: 'Enfoque en tren inferior',
    category: 'strength',
    difficulty: 'advanced',
    duration: 55,
    isCustom: false,
    exercises: [
      { id: '1', name: 'Weighted Pistol Squats', sets: 4, reps: '6-8', rest: 120 },
      { id: '2', name: 'Shrimp Squats', sets: 3, reps: '8-10', rest: 90 },
      { id: '3', name: 'Nordic Curls', sets: 4, reps: '6-10', rest: 120 },
      { id: '4', name: 'Single Leg Glute Bridge', sets: 3, reps: '12-15', rest: 60 },
      { id: '5', name: 'Dragon Flag', sets: 3, reps: '5-8', rest: 90 },
    ],
  },
];

export default function WorkoutTemplates() {
  const [activeTab, setActiveTab] = useState<'all' | 'custom'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [customTemplates] = useState<WorkoutTemplate[]>([]); // TODO: Load from storage

  const allTemplates = [...PREDEFINED_TEMPLATES, ...customTemplates];
  const filteredTemplates = allTemplates.filter((template) => {
    if (activeTab === 'custom' && !template.isCustom) return false;
    if (searchQuery) {
      return template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.description.toLowerCase().includes(searchQuery.toLowerCase());
    }
    return true;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'text-green-500';
      case 'intermediate':
        return 'text-amber-500';
      case 'advanced':
        return 'text-red-500';
      default:
        return 'text-zinc-500';
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'Principiante';
      case 'intermediate':
        return 'Intermedio';
      case 'advanced':
        return 'Avanzado';
      default:
        return difficulty;
    }
  };

  const startWorkout = (template: WorkoutTemplate) => {
    Alert.alert(
      'Iniciar Entrenamiento',
      `¿Iniciar "${template.name}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Iniciar',
          onPress: () => {
            // TODO: Navigate to active workout with template
            Alert.alert('Éxito', 'Entrenamiento iniciado');
          },
        },
      ]
    );
  };

  const createCustomTemplate = () => {
    Alert.alert(
      'Próximamente',
      'La creación de plantillas personalizadas estará disponible pronto'
    );
  };

  return (
    <View className="flex-1 bg-zinc-950">
      {/* Header */}
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center mb-3">
          <TouchableOpacity onPress={() => router.back()} className="mr-3">
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1">
            Plantillas de Entrenamiento
          </Text>
          <TouchableOpacity onPress={createCustomTemplate}>
            <Ionicons name="add-circle" size={28} color="#10B981" />
          </TouchableOpacity>
        </View>

        {/* Search */}
        <View className="bg-zinc-900 rounded-xl px-4 py-3 flex-row items-center border border-zinc-800">
          <Ionicons name="search" size={20} color="#71717A" />
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Buscar plantillas..."
            placeholderTextColor="#52525B"
            className="flex-1 ml-2 text-white"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color="#71717A" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Tabs */}
      <View className="flex-row px-6 py-3 border-b border-zinc-800">
        <TouchableOpacity
          onPress={() => setActiveTab('all')}
          className={`flex-1 py-2 mr-2 rounded-lg ${
            activeTab === 'all' ? 'bg-emerald-500/20' : 'bg-zinc-900'
          }`}
        >
          <Text
            className={`text-center font-semibold ${
              activeTab === 'all' ? 'text-emerald-500' : 'text-zinc-400'
            }`}
          >
            Todas ({allTemplates.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveTab('custom')}
          className={`flex-1 py-2 ml-2 rounded-lg ${
            activeTab === 'custom' ? 'bg-emerald-500/20' : 'bg-zinc-900'
          }`}
        >
          <Text
            className={`text-center font-semibold ${
              activeTab === 'custom' ? 'text-emerald-500' : 'text-zinc-400'
            }`}
          >
            Personalizadas ({customTemplates.length})
          </Text>
        </TouchableOpacity>
      </View>

      {/* Templates List */}
      <ScrollView className="flex-1 px-6 pt-4" showsVerticalScrollIndicator={false}>
        {filteredTemplates.length === 0 ? (
          <View className="items-center justify-center py-20">
            <Ionicons name="document-text-outline" size={64} color="#52525B" />
            <Text className="text-zinc-500 text-lg mt-4">
              {activeTab === 'custom'
                ? 'No tienes plantillas personalizadas'
                : 'No se encontraron plantillas'}
            </Text>
            {activeTab === 'custom' && (
              <TouchableOpacity
                onPress={createCustomTemplate}
                className="mt-4 bg-emerald-500 px-6 py-3 rounded-xl"
              >
                <Text className="text-white font-semibold">Crear Primera Plantilla</Text>
              </TouchableOpacity>
            )}
          </View>
        ) : (
          <View className="space-y-4 pb-6">
            {filteredTemplates.map((template) => (
              <TouchableOpacity
                key={template.id}
                onPress={() => startWorkout(template)}
                className="bg-zinc-900 rounded-xl p-4 border border-zinc-800 active:opacity-70"
              >
                {/* Header */}
                <View className="flex-row items-start justify-between mb-3">
                  <View className="flex-1">
                    <View className="flex-row items-center mb-1">
                      <Text className="text-white text-lg font-bold flex-1">
                        {template.name}
                      </Text>
                      {template.isCustom && (
                        <View className="bg-purple-500/20 px-2 py-1 rounded">
                          <Text className="text-purple-500 text-xs font-semibold">
                            CUSTOM
                          </Text>
                        </View>
                      )}
                    </View>
                    <Text className="text-zinc-400 text-sm">
                      {template.description}
                    </Text>
                  </View>
                </View>

                {/* Meta Info */}
                <View className="flex-row items-center mb-3">
                  <View className="flex-row items-center mr-4">
                    <Ionicons name="time-outline" size={16} color="#71717A" />
                    <Text className="text-zinc-500 text-xs ml-1">
                      ~{template.duration} min
                    </Text>
                  </View>
                  <View className="flex-row items-center mr-4">
                    <Ionicons name="barbell-outline" size={16} color="#71717A" />
                    <Text className="text-zinc-500 text-xs ml-1">
                      {template.exercises.length} ejercicios
                    </Text>
                  </View>
                  <View className="flex-row items-center">
                    <Ionicons name="flash-outline" size={16} color="#71717A" />
                    <Text className={`text-xs ml-1 font-semibold ${getDifficultyColor(template.difficulty)}`}>
                      {getDifficultyLabel(template.difficulty)}
                    </Text>
                  </View>
                </View>

                {/* Exercises Preview */}
                <View className="bg-zinc-800/50 rounded-lg p-3 mb-3">
                  {template.exercises.slice(0, 3).map((exercise, index) => (
                    <View
                      key={exercise.id}
                      className={`flex-row items-center ${
                        index < 2 ? 'mb-2' : ''
                      }`}
                    >
                      <View className="w-6 h-6 rounded-full bg-emerald-500/20 items-center justify-center mr-2">
                        <Text className="text-emerald-500 text-xs font-bold">
                          {index + 1}
                        </Text>
                      </View>
                      <Text className="text-zinc-300 text-sm flex-1">
                        {exercise.name}
                      </Text>
                      <Text className="text-zinc-500 text-xs">
                        {exercise.sets} × {exercise.reps}
                      </Text>
                    </View>
                  ))}
                  {template.exercises.length > 3 && (
                    <Text className="text-zinc-500 text-xs text-center mt-2">
                      +{template.exercises.length - 3} más...
                    </Text>
                  )}
                </View>

                {/* Start Button */}
                <View className="flex-row gap-2">
                  <TouchableOpacity
                    onPress={() => startWorkout(template)}
                    className="flex-1 bg-emerald-500 py-3 rounded-lg items-center flex-row justify-center"
                  >
                    <Ionicons name="play" size={18} color="white" />
                    <Text className="text-white font-semibold ml-2">
                      Iniciar Workout
                    </Text>
                  </TouchableOpacity>
                  {template.isCustom && (
                    <TouchableOpacity
                      className="bg-zinc-800 px-4 py-3 rounded-lg items-center justify-center"
                      onPress={() => Alert.alert('Editar', 'Editar plantilla personalizada')}
                    >
                      <Ionicons name="create-outline" size={20} color="white" />
                    </TouchableOpacity>
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}
