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

interface Exercise {
  name: string;
  sets: number;
  reps: string;
  rest: number;
  notes?: string;
}

interface WorkoutTemplate {
  id: string;
  name: string;
  description: string;
  muscleGroup: string;
  exercises: Exercise[];
  estimatedDuration: number;
  difficulty: 'principiante' | 'intermedio' | 'avanzado';
  category: 'strength' | 'hypertrophy' | 'endurance' | 'custom';
  isCustom: boolean;
  usageCount: number;
  lastUsed?: Date;
}

const PRE_BUILT_TEMPLATES: WorkoutTemplate[] = [
  {
    id: '1',
    name: 'Push Day (Hipertrofia)',
    description: 'Enfoque en pecho, hombros y tríceps con volumen alto',
    muscleGroup: 'Pecho/Hombros/Tríceps',
    exercises: [
      { name: 'Press Banca Barra', sets: 4, reps: '8-10', rest: 120 },
      { name: 'Press Inclinado Mancuernas', sets: 4, reps: '10-12', rest: 90 },
      { name: 'Aperturas en Polea', sets: 3, reps: '12-15', rest: 60 },
      { name: 'Press Militar', sets: 4, reps: '8-10', rest: 90 },
      { name: 'Elevaciones Laterales', sets: 3, reps: '12-15', rest: 60 },
      { name: 'Extensiones Tríceps', sets: 3, reps: '12-15', rest: 60 },
    ],
    estimatedDuration: 75,
    difficulty: 'intermedio',
    category: 'hypertrophy',
    isCustom: false,
    usageCount: 12,
    lastUsed: new Date(2026, 0, 25),
  },
  {
    id: '2',
    name: 'Pull Day (Fuerza)',
    description: 'Ejercicios de espalda y bíceps enfocados en fuerza',
    muscleGroup: 'Espalda/Bíceps',
    exercises: [
      { name: 'Peso Muerto', sets: 5, reps: '5', rest: 180 },
      { name: 'Dominadas', sets: 4, reps: '6-8', rest: 120 },
      { name: 'Remo con Barra', sets: 4, reps: '6-8', rest: 120 },
      { name: 'Remo en Polea', sets: 3, reps: '10-12', rest: 90 },
      { name: 'Curl con Barra', sets: 3, reps: '8-10', rest: 90 },
      { name: 'Curl Martillo', sets: 3, reps: '10-12', rest: 60 },
    ],
    estimatedDuration: 80,
    difficulty: 'avanzado',
    category: 'strength',
    isCustom: false,
    usageCount: 8,
    lastUsed: new Date(2026, 0, 23),
  },
  {
    id: '3',
    name: 'Leg Day (Mixto)',
    description: 'Piernas completas combinando fuerza e hipertrofia',
    muscleGroup: 'Piernas',
    exercises: [
      { name: 'Sentadilla Barra', sets: 5, reps: '5-8', rest: 180 },
      { name: 'Prensa de Piernas', sets: 4, reps: '10-12', rest: 120 },
      { name: 'Peso Muerto Rumano', sets: 4, reps: '8-10', rest: 120 },
      { name: 'Zancadas con Mancuernas', sets: 3, reps: '12/pierna', rest: 90 },
      { name: 'Extensiones de Cuádriceps', sets: 3, reps: '12-15', rest: 60 },
      { name: 'Curl Femoral', sets: 3, reps: '12-15', rest: 60 },
      { name: 'Elevaciones de Gemelos', sets: 4, reps: '15-20', rest: 60 },
    ],
    estimatedDuration: 90,
    difficulty: 'intermedio',
    category: 'hypertrophy',
    isCustom: false,
    usageCount: 15,
    lastUsed: new Date(2026, 0, 27),
  },
  {
    id: '4',
    name: 'Full Body (Principiante)',
    description: 'Rutina completa para comenzar con los básicos',
    muscleGroup: 'Cuerpo Completo',
    exercises: [
      { name: 'Sentadilla Goblet', sets: 3, reps: '10-12', rest: 90 },
      { name: 'Press Banca con Mancuernas', sets: 3, reps: '10-12', rest: 90 },
      { name: 'Remo en Polea', sets: 3, reps: '12-15', rest: 60 },
      { name: 'Press de Hombros', sets: 3, reps: '10-12', rest: 90 },
      { name: 'Plancha', sets: 3, reps: '45-60s', rest: 60 },
    ],
    estimatedDuration: 50,
    difficulty: 'principiante',
    category: 'strength',
    isCustom: false,
    usageCount: 5,
  },
];

export default function WorkoutTemplates() {
  const [templates, setTemplates] = useState<WorkoutTemplate[]>(PRE_BUILT_TEMPLATES);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);

  const categories = [
    { key: 'all', label: 'Todos', icon: 'apps', color: 'blue' },
    { key: 'strength', label: 'Fuerza', icon: 'barbell', color: 'red' },
    { key: 'hypertrophy', label: 'Hipertrofia', icon: 'fitness', color: 'emerald' },
    { key: 'endurance', label: 'Resistencia', icon: 'timer', color: 'purple' },
    { key: 'custom', label: 'Personalizados', icon: 'create', color: 'amber' },
  ];

  const filteredTemplates = templates
    .filter(t => selectedCategory === 'all' || t.category === selectedCategory)
    .filter(t => 
      searchQuery === '' || 
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.muscleGroup.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const startWorkout = (template: WorkoutTemplate) => {
    const updatedTemplates = templates.map(t => 
      t.id === template.id 
        ? { ...t, usageCount: t.usageCount + 1, lastUsed: new Date() }
        : t
    );
    setTemplates(updatedTemplates);
    
    Alert.alert(
      'Workout Iniciado! ðŸ‹ï¸',
      `${template.name}\n${template.exercises.length} ejercicios • ~${template.estimatedDuration} min`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Empezar',
          onPress: () => {
            // Navigate to workout screen with template
            console.log('Starting workout with template:', template.id);
          }
        }
      ]
    );
  };

  const duplicateTemplate = (template: WorkoutTemplate) => {
    const newTemplate: WorkoutTemplate = {
      ...template,
      id: String(Date.now()),
      name: `${template.name} (Copia)`,
      isCustom: true,
      category: 'custom',
      usageCount: 0,
      lastUsed: undefined,
    };
    
    setTemplates([newTemplate, ...templates]);
    Alert.alert('Template Duplicado ✓', 'Ahora puedes editarlo');
  };

  const deleteTemplate = (id: string) => {
    Alert.alert(
      'Eliminar Template',
      '¿Estás seguro? Esta acción no se puede deshacer.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => {
            setTemplates(templates.filter(t => t.id !== id));
          }
        }
      ]
    );
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'principiante': return 'emerald';
      case 'intermedio': return 'blue';
      case 'avanzado': return 'red';
      default: return 'zinc';
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'principiante': return 'P';
      case 'intermedio': return 'I';
      case 'avanzado': return 'A';
      default: return '';
    }
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
            Templates
          </Text>
          <TouchableOpacity onPress={() => setShowCreateForm(true)}>
            <View className="bg-purple-500 rounded-full p-2">
              <Ionicons name="add" size={24} color="white" />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          {/* Info */}
          <View className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl p-6 mb-6">
            <Text className="text-white text-2xl font-bold mb-2">Workout Templates</Text>
            <Text className="text-white opacity-90 mb-4">
              Guarda tus workouts favoritos y empieza rápido
            </Text>
            <View className="flex-row items-center">
              <Ionicons name="flash" size={20} color="white" />
              <Text className="text-white ml-2">{templates.length} templates disponibles</Text>
            </View>
          </View>

          {/* Search */}
          <View className="bg-zinc-900 rounded-xl p-4 flex-row items-center mb-4 border border-zinc-800">
            <Ionicons name="search" size={20} color="#71717A" />
            <TextInput
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Buscar templates..."
              placeholderTextColor="#71717A"
              className="flex-1 ml-3 text-white"
            />
            {searchQuery !== '' && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Ionicons name="close-circle" size={20} color="#71717A" />
              </TouchableOpacity>
            )}
          </View>

          {/* Category Filter */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6">
            <View className="flex-row gap-2">
              {categories.map((cat) => (
                <TouchableOpacity
                  key={cat.key}
                  onPress={() => setSelectedCategory(cat.key)}
                  className={`rounded-xl px-4 py-2 flex-row items-center ${
                    selectedCategory === cat.key
                      ? `bg-${cat.color}-500`
                      : 'bg-zinc-900 border border-zinc-800'
                  }`}
                >
                  <Ionicons
                    name={cat.icon as any}
                    size={18}
                    color={selectedCategory === cat.key ? 'white' : '#71717A'}
                  />
                  <Text className={`ml-2 font-bold ${selectedCategory === cat.key ? 'text-white' : 'text-zinc-400'}`}>
                    {cat.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          {/* Templates List */}
          {filteredTemplates.length === 0 ? (
            <View className="bg-zinc-900 rounded-xl p-8 border border-zinc-800 items-center">
              <Ionicons name="document-text-outline" size={64} color="#52525B" />
              <Text className="text-zinc-400 text-center mt-4">
                {searchQuery ? 'No se encontraron templates' : 'No hay templates en esta categoría'}
              </Text>
            </View>
          ) : (
            filteredTemplates.map((template) => {
              const difficultyColor = getDifficultyColor(template.difficulty);
              const difficultyLabel = getDifficultyLabel(template.difficulty);

              return (
                <View key={template.id} className="bg-zinc-900 rounded-xl p-5 mb-4 border border-zinc-800">
                  {/* Header */}
                  <View className="flex-row items-start justify-between mb-3">
                    <View className="flex-1">
                      <View className="flex-row items-center gap-2 mb-2">
                        <Text className="text-white font-bold text-lg flex-1">{template.name}</Text>
                        <View className={`bg-${difficultyColor}-500 rounded-full w-7 h-7 items-center justify-center`}>
                          <Text className="text-white font-bold text-xs">{difficultyLabel}</Text>
                        </View>
                      </View>
                      <Text className="text-zinc-400 text-sm mb-2">{template.description}</Text>
                      <View className="flex-row items-center gap-3">
                        <View className="flex-row items-center">
                          <Ionicons name="body" size={14} color="#9D12DE" />
                          <Text className="text-primary text-xs ml-1">{template.muscleGroup}</Text>
                        </View>
                        <View className="flex-row items-center">
                          <Ionicons name="list" size={14} color="#9D12DE" />
                          <Text className="text-primary/80 text-xs ml-1">{template.exercises.length} ejercicios</Text>
                        </View>
                        <View className="flex-row items-center">
                          <Ionicons name="time" size={14} color="#A855F7" />
                          <Text className="text-purple-400 text-xs ml-1">~{template.estimatedDuration} min</Text>
                        </View>
                      </View>
                    </View>
                  </View>

                  {/* Exercises Preview */}
                  <View className="bg-zinc-800 rounded-lg p-3 mb-3">
                    {template.exercises.slice(0, 3).map((exercise, idx) => (
                      <View key={idx} className="flex-row items-center justify-between mb-2 last:mb-0">
                        <Text className="text-zinc-300 text-sm flex-1">{exercise.name}</Text>
                        <Text className="text-zinc-500 text-xs">
                          {exercise.sets}×{exercise.reps}
                        </Text>
                      </View>
                    ))}
                    {template.exercises.length > 3 && (
                      <Text className="text-zinc-500 text-xs text-center mt-2">
                        +{template.exercises.length - 3} más
                      </Text>
                    )}
                  </View>

                  {/* Usage Stats */}
                  {template.usageCount > 0 && (
                    <View className="flex-row items-center gap-3 mb-3">
                      <View className="flex-row items-center">
                        <Ionicons name="checkmark-circle" size={14} color="#9D12DE" />
                        <Text className="text-primary text-xs ml-1">
                          Usado {template.usageCount} {template.usageCount === 1 ? 'vez' : 'veces'}
                        </Text>
                      </View>
                      {template.lastUsed && (
                        <Text className="text-zinc-500 text-xs">
                          Última vez: {template.lastUsed.toLocaleDateString('es-ES')}
                        </Text>
                      )}
                    </View>
                  )}

                  {/* Actions */}
                  <View className="flex-row gap-2">
                    <TouchableOpacity
                      onPress={() => startWorkout(template)}
                      className="flex-1 bg-purple-500 rounded-lg py-3 flex-row items-center justify-center"
                    >
                      <Ionicons name="play" size={18} color="white" />
                      <Text className="text-white font-bold ml-2">Empezar</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity
                      onPress={() => duplicateTemplate(template)}
                      className="bg-zinc-800 rounded-lg px-4 py-3 items-center justify-center"
                    >
                      <Ionicons name="copy" size={18} color="#71717A" />
                    </TouchableOpacity>
                    
                    {template.isCustom && (
                      <TouchableOpacity
                        onPress={() => deleteTemplate(template.id)}
                        className="bg-zinc-800 rounded-lg px-4 py-3 items-center justify-center"
                      >
                        <Ionicons name="trash" size={18} color="#EF4444" />
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              );
            })
          )}

          {/* Tips */}
          <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-6 mt-2">
            <View className="flex-row items-start">
              <Ionicons name="bulb" size={20} color="#9D12DE" />
              <View className="flex-1 ml-3">
                <Text className="text-primary/80 font-bold mb-2">
                  Tips para Templates
                </Text>
                <Text className="text-primary/60 text-sm">
                  • Duplica pre-built templates para personalizarlos{'\n'}
                  • Guarda tus workouts favoritos como templates{'\n'}
                  • Ajusta sets/reps según tu nivel{'\n'}
                  • Templates = menos tiempo planificando{'\n'}
                  • Usa "Empezar" para quick-start workout
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Create Template Modal Placeholder */}
      {showCreateForm && (
        <View className="absolute inset-0 bg-black/80 items-center justify-center">
          <View className="bg-zinc-900 rounded-xl p-6 m-6 w-4/5">
            <Text className="text-white font-bold text-xl mb-4">Crear Template</Text>
            <Text className="text-zinc-400 mb-4">
              Función disponible próximamente
            </Text>
            <TouchableOpacity
              onPress={() => setShowCreateForm(false)}
              className="bg-purple-500 rounded-lg py-3"
            >
              <Text className="text-white font-bold text-center">Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

