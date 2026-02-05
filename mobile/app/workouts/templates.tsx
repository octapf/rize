import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Card } from '@/components/ui/Card';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface WorkoutTemplate {
  id: string;
  name: string;
  description: string;
  exercises: number;
  estimatedDuration: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  muscleGroups: string[];
  isPublic: boolean;
  usageCount: number;
  createdAt: Date;
}

const mockTemplates: WorkoutTemplate[] = [
  {
    id: '1',
    name: 'Push Day',
    description: 'Entrenamiento de empuje enfocado en pecho, hombros y trÃ­ceps',
    exercises: 5,
    estimatedDuration: 60,
    difficulty: 'intermediate',
    muscleGroups: ['Pecho', 'Hombros', 'TrÃ­ceps'],
    isPublic: true,
    usageCount: 45,
    createdAt: new Date(2025, 11, 1),
  },
  {
    id: '2',
    name: 'Pull Day',
    description: 'Entrenamiento de jalÃ³n para espalda y bÃ­ceps',
    exercises: 5,
    estimatedDuration: 60,
    difficulty: 'intermediate',
    muscleGroups: ['Espalda', 'BÃ­ceps'],
    isPublic: true,
    usageCount: 38,
    createdAt: new Date(2025, 11, 1),
  },
  {
    id: '3',
    name: 'Leg Day',
    description: 'DÃ­a de pierna completo con Ã©nfasis en cuÃ¡driceps y glÃºteos',
    exercises: 6,
    estimatedDuration: 75,
    difficulty: 'advanced',
    muscleGroups: ['Piernas', 'GlÃºteos'],
    isPublic: true,
    usageCount: 52,
    createdAt: new Date(2025, 11, 5),
  },
  {
    id: '4',
    name: 'Upper Body',
    description: 'Tren superior completo para dÃ­as de cuerpo dividido',
    exercises: 7,
    estimatedDuration: 80,
    difficulty: 'intermediate',
    muscleGroups: ['Pecho', 'Espalda', 'Hombros', 'Brazos'],
    isPublic: true,
    usageCount: 31,
    createdAt: new Date(2025, 10, 20),
  },
  {
    id: '5',
    name: 'Full Body Beginner',
    description: 'Rutina de cuerpo completo para principiantes',
    exercises: 5,
    estimatedDuration: 45,
    difficulty: 'beginner',
    muscleGroups: ['Todo el cuerpo'],
    isPublic: true,
    usageCount: 67,
    createdAt: new Date(2025, 10, 10),
  },
];

export default function WorkoutTemplatesScreen() {
  const [templates, setTemplates] = useState<WorkoutTemplate[]>(mockTemplates);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'mine' | 'community'>('all');

  const filteredTemplates = templates.filter(t => {
    const matchesSearch =
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    // For now, all templates are community templates
    const matchesFilter = filter === 'all' || filter === 'community';
    
    return matchesSearch && matchesFilter;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return '#9D12DE';
      case 'intermediate': return '#FFEA00';
      case 'advanced': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'Principiante';
      case 'intermediate': return 'Intermedio';
      case 'advanced': return 'Avanzado';
      default: return difficulty;
    }
  };

  const handleUseTemplate = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    Alert.alert(
      'Usar Template',
      `Â¿Iniciar entrenamiento con "${template?.name}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Iniciar',
          onPress: () => {
            router.push(`/workouts/active?templateId=${templateId}` as any);
          }
        }
      ]
    );
  };

  const handleSaveTemplate = (templateId: string) => {
    Alert.alert('Â¡Guardado!', 'Template aÃ±adido a tus favoritos');
  };

  const renderTemplate = (template: WorkoutTemplate) => {
    return (
      <Card key={template.id} className="p-4 mb-4">
        <View className="flex-row items-start justify-between mb-2">
          <View className="flex-1">
            <Text className="text-gray-900 font-bold text-lg mb-1">
              {template.name}
            </Text>
            <Text className="text-gray-600 text-sm mb-3">
              {template.description}
            </Text>

            {/* Muscle Groups */}
            <View className="flex-row flex-wrap gap-1 mb-3">
              {template.muscleGroups.map((muscle, i) => (
                <View key={i} className="bg-primary/10 px-2 py-1 rounded-full">
                  <Text className="text-primary text-xs font-semibold">
                    {muscle}
                  </Text>
                </View>
              ))}
            </View>

            {/* Metadata */}
            <View className="flex-row items-center flex-wrap gap-2 mb-3">
              <View
                className="px-2 py-1 rounded-full"
                style={{ backgroundColor: getDifficultyColor(template.difficulty) + '20' }}
              >
                <Text
                  className="text-xs font-semibold"
                  style={{ color: getDifficultyColor(template.difficulty) }}
                >
                  {getDifficultyLabel(template.difficulty)}
                </Text>
              </View>

              <View className="flex-row items-center gap-1">
                <Ionicons name="barbell" size={14} color="#6B7280" />
                <Text className="text-gray-600 text-xs">
                  {template.exercises} ejercicios
                </Text>
              </View>

              <View className="flex-row items-center gap-1">
                <Ionicons name="time" size={14} color="#6B7280" />
                <Text className="text-gray-600 text-xs">
                  ~{template.estimatedDuration} min
                </Text>
              </View>

              {template.isPublic && (
                <View className="flex-row items-center gap-1">
                  <Ionicons name="people" size={14} color="#9D12DE" />
                  <Text className="text-primary text-xs font-semibold">
                    {template.usageCount} usos
                  </Text>
                </View>
              )}
            </View>
          </View>
        </View>

        {/* Actions */}
        <View className="flex-row gap-2">
          <TouchableOpacity
            onPress={() => handleUseTemplate(template.id)}
            className="flex-1 bg-primary py-2.5 rounded-lg"
          >
            <Text className="text-white font-semibold text-center">
              Usar Ahora
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push(`/workouts/templates/${template.id}` as any)}
            className="bg-gray-200 px-4 py-2.5 rounded-lg"
          >
            <Ionicons name="eye" size={20} color="#6B7280" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleSaveTemplate(template.id)}
            className="bg-gray-200 px-4 py-2.5 rounded-lg"
          >
            <Ionicons name="bookmark-outline" size={20} color="#6B7280" />
          </TouchableOpacity>
        </View>
      </Card>
    );
  };

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <LinearGradient colors={['#6366F1', '#4F46E5']} className="px-6 pt-12 pb-6">
        <View className="flex-row items-center justify-between mb-4">
          <TouchableOpacity onPress={() => router.back()} className="p-2">
            <Ionicons name="arrow-back" size={28} color="white" />
          </TouchableOpacity>
          <Text className="text-2xl font-bold text-white">Templates</Text>
          <TouchableOpacity
            onPress={() => router.push('/workouts/templates/create' as any)}
            className="bg-white/20 p-2 rounded-full"
          >
            <Ionicons name="add" size={28} color="white" />
          </TouchableOpacity>
        </View>

        {/* Search */}
        <View className="flex-row items-center bg-white rounded-lg px-3 py-2 mb-3">
          <Ionicons name="search" size={20} color="#6B7280" />
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Buscar templates..."
            className="flex-1 ml-2 text-gray-900"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color="#6B7280" />
            </TouchableOpacity>
          )}
        </View>

        {/* Stats */}
        <View className="flex-row gap-3">
          <Card className="flex-1 p-3 bg-white/20 border-0">
            <Text className="text-white/80 text-xs mb-1">Disponibles</Text>
            <Text className="text-white text-2xl font-bold">{templates.length}</Text>
          </Card>
          <Card className="flex-1 p-3 bg-white/20 border-0">
            <Text className="text-white/80 text-xs mb-1">Guardados</Text>
            <Text className="text-white text-2xl font-bold">0</Text>
          </Card>
        </View>
      </LinearGradient>

      {/* Filters */}
      <View className="flex-row bg-white px-6 py-3 border-b border-gray-200 gap-2">
        {(['all', 'mine', 'community'] as const).map(f => (
          <TouchableOpacity
            key={f}
            onPress={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg ${filter === f ? 'bg-indigo-500' : 'bg-gray-200'}`}
          >
            <Text className={`font-semibold ${filter === f ? 'text-white' : 'text-gray-700'}`}>
              {f === 'all' ? 'Todos' : f === 'mine' ? 'MÃ­os' : 'Comunidad'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView className="flex-1" contentContainerClassName="p-6">
        {filteredTemplates.length === 0 ? (
          <Card className="p-8 items-center">
            <Ionicons name="fitness-outline" size={64} color="#D1D5DB" />
            <Text className="text-gray-900 text-xl font-bold mt-4 text-center">
              No se encontraron templates
            </Text>
            <Text className="text-gray-600 text-center mt-2">
              Intenta con otros tÃ©rminos de bÃºsqueda
            </Text>
          </Card>
        ) : (
          <>
            <Text className="text-gray-600 text-sm mb-3">
              {filteredTemplates.length} template{filteredTemplates.length !== 1 ? 's' : ''}
            </Text>
            {filteredTemplates.map(renderTemplate)}
          </>
        )}
      </ScrollView>
    </View>
  );
}

