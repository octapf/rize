import React, { useState } from 'react';
import { Text } from '@/components/ui/Text';
import { View, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';;
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface WorkoutTemplate {
  id: string;
  name: string;
  type: 'push' | 'pull' | 'legs' | 'upper' | 'lower' | 'fullbody';
  exercises: {
    name: string;
    sets: number;
    reps: string;
    restSeconds: number;
    notes?: string;
  }[];
  estimatedDuration: number; // minutes
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

const WORKOUT_TYPES = [
  { id: 'push', label: 'Push', icon: 'arrow-up', color: 'blue' },
  { id: 'pull', label: 'Pull', icon: 'arrow-down', color: 'primary' },
  { id: 'legs', label: 'Piernas', icon: 'walk', color: 'red' },
  { id: 'upper', label: 'Superior', icon: 'body', color: 'purple' },
  { id: 'lower', label: 'Inferior', icon: 'fitness', color: 'amber' },
  { id: 'fullbody', label: 'Full Body', icon: 'barbell', color: 'cyan' },
];

const MOCK_TEMPLATES: WorkoutTemplate[] = [
  {
    id: '1',
    name: 'Push Day A - Fuerza',
    type: 'push',
    difficulty: 'intermediate',
    estimatedDuration: 75,
    exercises: [
      { name: 'Press Banca', sets: 4, reps: '6-8', restSeconds: 180, notes: 'Peso progresivo' },
      { name: 'Press Inclinado DB', sets: 3, reps: '8-10', restSeconds: 120 },
      { name: 'Press Militar', sets: 4, reps: '6-8', restSeconds: 150 },
      { name: 'Elevaciones Laterales', sets: 3, reps: '12-15', restSeconds: 60 },
      { name: 'Tríceps Polea', sets: 3, reps: '10-12', restSeconds: 60 },
      { name: 'Fondos', sets: 3, reps: 'Al fallo', restSeconds: 90 },
    ],
  },
  {
    id: '2',
    name: 'Pull Day A - Volumen',
    type: 'pull',
    difficulty: 'intermediate',
    estimatedDuration: 70,
    exercises: [
      { name: 'Peso Muerto', sets: 3, reps: '5', restSeconds: 180, notes: 'Técnica perfecta' },
      { name: 'Dominadas', sets: 4, reps: '8-10', restSeconds: 120 },
      { name: 'Remo Barra', sets: 4, reps: '8-10', restSeconds: 120 },
      { name: 'Remo DB', sets: 3, reps: '10-12', restSeconds: 90 },
      { name: 'Face Pulls', sets: 3, reps: '15-20', restSeconds: 60 },
      { name: 'Curl Bíceps', sets: 3, reps: '10-12', restSeconds: 60 },
    ],
  },
  {
    id: '3',
    name: 'Leg Day A - Hipertrofia',
    type: 'legs',
    difficulty: 'advanced',
    estimatedDuration: 80,
    exercises: [
      { name: 'Sentadilla', sets: 4, reps: '8-10', restSeconds: 180 },
      { name: 'Prensa', sets: 3, reps: '12-15', restSeconds: 120 },
      { name: 'Zancadas Búlgaras', sets: 3, reps: '10-12/lado', restSeconds: 90 },
      { name: 'Curl Femoral', sets: 3, reps: '12-15', restSeconds: 90 },
      { name: 'Extensiones Cuádriceps', sets: 3, reps: '12-15', restSeconds: 60 },
      { name: 'Pantorrillas', sets: 4, reps: '15-20', restSeconds: 60 },
    ],
  },
  {
    id: '4',
    name: 'Upper Body - Full',
    type: 'upper',
    difficulty: 'beginner',
    estimatedDuration: 60,
    exercises: [
      { name: 'Press Banca', sets: 3, reps: '10-12', restSeconds: 120 },
      { name: 'Remo DB', sets: 3, reps: '10-12', restSeconds: 90 },
      { name: 'Press Militar DB', sets: 3, reps: '10-12', restSeconds: 90 },
      { name: 'Dominadas Asistidas', sets: 3, reps: '8-10', restSeconds: 90 },
      { name: 'Curl Bíceps', sets: 2, reps: '12-15', restSeconds: 60 },
      { name: 'Tríceps Fondos', sets: 2, reps: '12-15', restSeconds: 60 },
    ],
  },
];

export default function WorkoutTemplates() {
  const [templates, setTemplates] = useState(MOCK_TEMPLATES);
  const [filter, setFilter] = useState<string>('all');
  const [expandedTemplate, setExpandedTemplate] = useState<string | null>(null);

  const filteredTemplates = filter === 'all'
    ? templates
    : templates.filter((t) => t.type === filter);

  const getTypeInfo = (type: string) => {
    return WORKOUT_TYPES.find((t) => t.id === type) || WORKOUT_TYPES[0];
  };

  const getDifficultyColor = (difficulty: string): string => {
    const colors: Record<string, string> = {
      beginner: 'primary',
      intermediate: 'amber',
      advanced: 'red',
    };
    return colors[difficulty] || 'zinc';
  };

  const getDifficultyLabel = (difficulty: string): string => {
    const labels: Record<string, string> = {
      beginner: 'Principiante',
      intermediate: 'Intermedio',
      advanced: 'Avanzado',
    };
    return labels[difficulty] || 'N/A';
  };

  const startWorkout = (template: WorkoutTemplate) => {
    Alert.alert(
      'Iniciar Workout',
      `¿Empezar "${template.name}"?`,
      [
        { text: 'Cancelar' },
        { text: 'Iniciar', onPress: () => Alert.alert('Workout Iniciado! 🏋️', 'Timer y tracking activados') },
      ]
    );
  };

  const duplicateTemplate = (template: WorkoutTemplate) => {
    const newTemplate: WorkoutTemplate = {
      ...template,
      id: Date.now().toString(),
      name: `${template.name} (Copia)`,
    };
    setTemplates([...templates, newTemplate]);
    Alert.alert('Plantilla Duplicada', 'Puedes editarla ahora');
  };

  const deleteTemplate = (id: string) => {
    Alert.alert(
      'Eliminar Plantilla',
      '¿Estás seguro?',
      [
        { text: 'Cancelar' },
        { text: 'Eliminar', style: 'destructive', onPress: () => setTemplates(templates.filter((t) => t.id !== id)) },
      ]
    );
  };

  return (
    <View className="flex-1 bg-zinc-950">
      {/* Header */}
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1 ml-3">
            Workout Templates
          </Text>
          <TouchableOpacity>
            <Ionicons name="add-circle" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Type Filters */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row gap-2">
            <TouchableOpacity
              onPress={() => setFilter('all')}
              className={`flex-row items-center px-4 py-2 rounded-lg ${
                filter === 'all' ? 'bg-primary' : 'bg-zinc-900 border border-zinc-800'
              }`}
            >
              <Ionicons name="apps" size={18} color={filter === 'all' ? 'white' : '#71717A'} />
              <Text className={`ml-2 font-semibold text-sm ${filter === 'all' ? 'text-white' : 'text-zinc-400'}`}>
                Todos
              </Text>
            </TouchableOpacity>
            {WORKOUT_TYPES.map((type) => (
              <TouchableOpacity
                key={type.id}
                onPress={() => setFilter(type.id)}
                className={`flex-row items-center px-4 py-2 rounded-lg ${
                  filter === type.id ? 'bg-primary' : 'bg-zinc-900 border border-zinc-800'
                }`}
              >
                <Ionicons
                  name={type.icon as any}
                  size={18}
                  color={filter === type.id ? 'white' : '#71717A'}
                />
                <Text className={`ml-2 font-semibold text-sm ${filter === type.id ? 'text-white' : 'text-zinc-400'}`}>
                  {type.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          {/* Templates List */}
          {filteredTemplates.length === 0 ? (
            <View className="bg-zinc-900 rounded-xl p-8 items-center border border-zinc-800">
              <Text className="text-6xl mb-3">📋</Text>
              <Text className="text-white font-bold text-lg mb-2">Sin Plantillas</Text>
              <Text className="text-zinc-400 text-center">
                Crea plantillas para workouts más rápidos
              </Text>
            </View>
          ) : (
            filteredTemplates.map((template) => {
              const typeInfo = getTypeInfo(template.type);
              const difficultyColor = getDifficultyColor(template.difficulty);
              const isExpanded = expandedTemplate === template.id;

              return (
                <View key={template.id} className="bg-zinc-900 rounded-xl p-4 mb-4 border border-zinc-800">
                  {/* Header */}
                  <TouchableOpacity
                    onPress={() => setExpandedTemplate(isExpanded ? null : template.id)}
                    activeOpacity={0.7}
                  >
                    <View className="flex-row items-start justify-between mb-3">
                      <View className="flex-row items-start flex-1">
                        <View className={`w-12 h-12 bg-${typeInfo.color}-500 rounded-xl items-center justify-center mr-3`}>
                          <Ionicons name={typeInfo.icon as any} size={24} color="white" />
                        </View>
                        <View className="flex-1">
                          <Text className="text-white font-bold text-lg mb-1">
                            {template.name}
                          </Text>
                          <View className="flex-row gap-2">
                            <View className={`bg-${difficultyColor}-500/10 rounded px-2 py-0.5 border border-${difficultyColor}-500/30`}>
                              <Text className={`text-${difficultyColor}-400 text-xs font-bold`}>
                                {getDifficultyLabel(template.difficulty)}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>
                      <Ionicons
                        name={isExpanded ? 'chevron-up' : 'chevron-down'}
                        size={24}
                        color="#71717A"
                      />
                    </View>

                    {/* Quick Info */}
                    <View className="flex-row flex-wrap gap-2">
                      <View className="bg-zinc-800 rounded px-3 py-1">
                        <Text className="text-primary/80 text-xs font-bold">
                          ⏱️ {template.estimatedDuration} min
                        </Text>
                      </View>
                      <View className="bg-zinc-800 rounded px-3 py-1">
                        <Text className="text-primary text-xs font-bold">
                          💪 {template.exercises.length} ejercicios
                        </Text>
                      </View>
                      <View className="bg-zinc-800 rounded px-3 py-1">
                        <Text className="text-purple-400 text-xs font-bold">
                          📊 {template.exercises.reduce((sum, ex) => sum + ex.sets, 0)} series
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>

                  {/* Expanded Details */}
                  {isExpanded && (
                    <View className="mt-4">
                      <View className="border-t border-zinc-800 pt-4 mb-4">
                        <Text className="text-white font-bold mb-3">Ejercicios</Text>
                        {template.exercises.map((ex, idx) => (
                          <View key={idx} className="bg-zinc-800 rounded-lg p-3 mb-2">
                            <View className="flex-row items-start justify-between mb-1">
                              <Text className="text-white font-bold flex-1">{ex.name}</Text>
                              <Text className="text-primary font-bold ml-2">
                                {ex.sets} • {ex.reps}
                              </Text>
                            </View>
                            <View className="flex-row items-center gap-3">
                              <Text className="text-zinc-400 text-sm">
                                ⏱️ Descanso: {ex.restSeconds}s
                              </Text>
                            </View>
                            {ex.notes && (
                              <Text className="text-zinc-500 text-xs mt-1">💡 {ex.notes}</Text>
                            )}
                          </View>
                        ))}
                      </View>

                      {/* Actions */}
                      <View className="flex-row gap-2">
                        <TouchableOpacity
                          onPress={() => startWorkout(template)}
                          className="flex-1 bg-primary rounded-lg p-3 flex-row items-center justify-center"
                        >
                          <Ionicons name="play" size={18} color="white" />
                          <Text className="text-white font-bold ml-2">Iniciar Workout</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => duplicateTemplate(template)}
                          className="bg-zinc-800 rounded-lg p-3 items-center justify-center px-4"
                        >
                          <Ionicons name="copy" size={18} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => Alert.alert('Editar', 'Función de edición próximamente')}
                          className="bg-zinc-800 rounded-lg p-3 items-center justify-center px-4"
                        >
                          <Ionicons name="create" size={18} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => deleteTemplate(template.id)}
                          className="bg-zinc-800 rounded-lg p-3 items-center justify-center px-4"
                        >
                          <Ionicons name="trash" size={18} color="#EF4444" />
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}
                </View>
              );
            })
          )}

          {/* Tips */}
          <View className="bg-purple-500/10 rounded-xl p-4 border border-purple-500/30 mb-6">
            <View className="flex-row items-start">
              <Ionicons name="bulb" size={20} color="#A855F7" />
              <View className="flex-1 ml-3">
                <Text className="text-purple-400 font-bold mb-2">
                  Tips para Plantillas
                </Text>
                <Text className="text-purple-300 text-sm">
                  • Crea variaciones A/B para cada tipo{'\n'}
                  • Incluye descansos apropiados{'\n'}
                  • Orden: compuestos primero{'\n'}
                  • Anota RPE o carga objetivo{'\n'}
                  • Revisa y ajusta según progreso
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

