import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useExercises } from '@/hooks/useExercises';
import { Card } from '@/components/ui/Card';
import { useWorkoutDraft } from '@/stores/workoutDraftStore';
import type { Exercise } from '@/services/api/exercises.api';

const categories = [
  { id: 'all', label: 'Todos', icon: 'apps', color: '#6B7280' },
  { id: 'push', label: 'Empuje', icon: 'arrow-up', color: '#EF4444' },
  { id: 'pull', label: 'JalÃ³n', icon: 'arrow-down', color: '#9D12DE' },
  { id: 'legs', label: 'Piernas', icon: 'walk', color: '#FFEA00' },
  { id: 'core', label: 'Core', icon: 'body', color: '#9D12DE' },
  { id: 'skills', label: 'Skills', icon: 'trophy', color: '#A855F7' },
  { id: 'cardio', label: 'Cardio', icon: 'heart', color: '#EC4899' },
  { id: 'flexibility', label: 'Flexibilidad', icon: 'flower', color: '#8B5CF6' },
];

export default function ExerciseLibraryScreen() {
  const params = useLocalSearchParams<{ mode?: string }>();
  const isSelectMode = params.mode === 'select';
  const { addExercises } = useWorkoutDraft();
  
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [selectedExercises, setSelectedExercises] = useState<Exercise[]>([]);

  const { data, isLoading } = useExercises({
    category: selectedCategory !== 'all' ? selectedCategory as any : undefined,
    search: search || undefined,
    limit: 100,
  });

  const getDifficultyColor = (difficulty: number) => {
    if (difficulty <= 3) return '#9D12DE';
    if (difficulty <= 6) return '#FFEA00';
    return '#EF4444';
  };

  const getDifficultyLabel = (difficulty: number) => {
    if (difficulty <= 3) return 'Principiante';
    if (difficulty <= 6) return 'Intermedio';
    return 'Avanzado';
  };

  const handleExercisePress = (exercise: Exercise) => {
    if (isSelectMode) {
      const isSelected = selectedExercises.some((e) => e._id === exercise._id);
      if (isSelected) {
        setSelectedExercises(selectedExercises.filter((e) => e._id !== exercise._id));
      } else {
        setSelectedExercises([...selectedExercises, exercise]);
      }
    } else {
      // Navigate to detail (TODO: create detail screen)
      router.push(`/exercises/${exercise._id}`);
    }
  };

  const handleConfirmSelection = () => {
    // Agregar ejercicios al draft del workout
    addExercises(selectedExercises);
    // Navigate back to create screen
    router.back();
  };

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <LinearGradient colors={['#9D12DE', '#7C3AED']} className="px-6 pt-12 pb-6">
        <View className="flex-row items-center justify-between mb-4">
          {isSelectMode && (
            <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2">
              <Ionicons name="arrow-back" size={28} color="white" />
            </TouchableOpacity>
          )}
          <View className="flex-1">
            <Text className="text-3xl font-bold text-white mb-1">
              {isSelectMode ? 'Seleccionar Ejercicios' : 'Biblioteca'}
            </Text>
            <Text className="text-primary/50 text-sm">
              {isSelectMode && selectedExercises.length > 0
                ? `${selectedExercises.length} seleccionado${
                    selectedExercises.length > 1 ? 's' : ''
                  }`
                : `${data?.data.length || 0} ejercicios disponibles`}
            </Text>
          </View>
          
          {!isSelectMode && (
            <TouchableOpacity
              onPress={() => router.push('/exercises/my')}
              className="bg-white/20 p-2 rounded-lg border border-white/30"
            >
              <Ionicons name="person" size={24} color="white" />
            </TouchableOpacity>
          )}
        </View>

        {/* Search */}
        <View className="bg-white/20 backdrop-blur-sm rounded-2xl px-4 py-3 flex-row items-center border border-white/30">
          <Ionicons name="search" size={20} color="white" />
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Buscar ejercicio..."
            placeholderTextColor="rgba(255,255,255,0.6)"
            className="flex-1 ml-2 text-white text-base"
          />
        </View>
      </LinearGradient>

      {/* Categories */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="border-b border-gray-200 bg-white"
        contentContainerClassName="px-4 py-3 gap-2"
      >
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat.id}
            onPress={() => setSelectedCategory(cat.id)}
            activeOpacity={0.7}
          >
            <View
              className={`px-4 py-2 rounded-full flex-row items-center gap-2 ${
                selectedCategory === cat.id
                  ? 'bg-primary'
                  : 'bg-gray-100 border border-gray-300'
              }`}
            >
              <Ionicons
                name={cat.icon as any}
                size={18}
                color={selectedCategory === cat.id ? 'white' : cat.color}
              />
              <Text
                className={`font-semibold ${
                  selectedCategory === cat.id ? 'text-white' : 'text-gray-700'
                }`}
              >
                {cat.label}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Exercises List */}
      <ScrollView className="flex-1" contentContainerClassName="p-4 gap-3">
        {isLoading && (
          <View className="py-20">
            <ActivityIndicator size="large" color="#9D12DE" />
          </View>
        )}

        {!isLoading && data?.data.length === 0 && (
          <Card className="items-center py-16">
            <View className="bg-gray-100 rounded-full p-6 mb-4">
              <Ionicons name="search-outline" size={64} color="#9CA3AF" />
            </View>
            <Text className="text-gray-900 text-xl font-bold mb-2">
              Sin resultados
            </Text>
            <Text className="text-gray-500 text-center px-8">
              No se encontraron ejercicios con esos filtros
            </Text>
          </Card>
        )}

        {!isLoading &&
          data?.data.map((exercise) => {
            const isSelected = selectedExercises.some((e) => e._id === exercise._id);
            
            return (
              <TouchableOpacity
                key={exercise._id}
                onPress={() => handleExercisePress(exercise)}
                activeOpacity={0.7}
              >
                <Card className={`p-4 ${isSelected ? 'border-2 border-primary' : ''}`}>
                  <View className="flex-row items-start gap-3">
                    {/* Icon */}
                    <View
                      className="p-3 rounded-2xl"
                      style={{
                        backgroundColor:
                          categories.find((c) => c.id === exercise.category)
                            ?.color + '20' || '#9D12DE20',
                      }}
                    >
                      <Ionicons
                        name={
                          categories.find((c) => c.id === exercise.category)
                            ?.icon as any
                        }
                        size={24}
                        color={
                          categories.find((c) => c.id === exercise.category)
                            ?.color || '#9D12DE'
                        }
                      />
                    </View>

                    {/* Content */}
                    <View className="flex-1">
                      <Text className="text-lg font-bold text-gray-900 mb-1">
                        {exercise.name.es}
                      </Text>
                      {exercise.description && (
                        <Text className="text-sm text-gray-600 mb-2" numberOfLines={2}>
                          {exercise.description.es}
                        </Text>
                      )}
                      <View className="flex-row items-center gap-3">
                        <View
                          className="px-3 py-1 rounded-full"
                          style={{
                            backgroundColor:
                              getDifficultyColor(exercise.difficulty) + '20',
                          }}
                        >
                          <Text
                            className="text-xs font-semibold"
                            style={{
                              color: getDifficultyColor(exercise.difficulty),
                            }}
                          >
                            {getDifficultyLabel(exercise.difficulty)}
                          </Text>
                        </View>
                        <View className="flex-row items-center gap-1">
                          <Ionicons name="star" size={14} color="#FFEA00" />
                          <Text className="text-sm text-gray-600">
                            {exercise.difficulty.toFixed(1)}
                          </Text>
                        </View>
                      </View>
                    </View>

                    {/* Arrow or Checkmark */}
                    {isSelectMode ? (
                      <View
                        className={`w-8 h-8 rounded-full items-center justify-center ${
                          isSelected ? 'bg-primary' : 'bg-gray-200'
                        }`}
                      >
                        {isSelected && (
                          <Ionicons name="checkmark" size={20} color="white" />
                        )}
                      </View>
                    ) : (
                      <Ionicons name="chevron-forward" size={24} color="#9D12DE" />
                    )}
                  </View>
                </Card>
              </TouchableOpacity>
            );
          })}
      </ScrollView>

      {/* Confirm Button - Only in select mode */}
      {isSelectMode && selectedExercises.length > 0 && (
        <View className="p-4 bg-white border-t border-gray-200">
          <TouchableOpacity onPress={handleConfirmSelection} activeOpacity={0.8}>
            <LinearGradient
              colors={['#9D12DE', '#7C3AED']}
              className="py-4 rounded-2xl items-center"
            >
              <Text className="text-white text-lg font-bold">
                Agregar {selectedExercises.length} ejercicio
                {selectedExercises.length > 1 ? 's' : ''}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

