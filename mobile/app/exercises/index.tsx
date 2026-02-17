import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  FlatList,
  Image,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface Exercise {
  id: string;
  name: string;
  category: string;
  muscleGroup: string[];
  equipment: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  description: string;
  instructions: string[];
  isCustom: boolean;
}

const EXERCISES: Exercise[] = [
  {
    id: '1',
    name: 'Pull-ups',
    category: 'Tracción',
    muscleGroup: ['Espalda', 'Bíceps'],
    equipment: 'Barra',
    difficulty: 'intermediate',
    description: 'Ejercicio fundamental de calistenia para la espalda',
    instructions: [
      'Agarra la barra con las palmas hacia adelante',
      'Cuelga con los brazos completamente extendidos',
      'Tira hacia arriba hasta que tu barbilla pase la barra',
      'Baja de forma controlada hasta la posición inicial',
    ],
    isCustom: false,
  },
  {
    id: '2',
    name: 'Push-ups',
    category: 'Empuje',
    muscleGroup: ['Pecho', 'Tríceps', 'Hombros'],
    equipment: 'Sin equipo',
    difficulty: 'beginner',
    description: 'Ejercicio básico de empuje para el tren superior',
    instructions: [
      'Colócate en posición de plancha con manos al ancho de hombros',
      'Baja el cuerpo manteniendo el core activo',
      'Empuja hacia arriba hasta extender los brazos',
      'Mantén el cuerpo recto durante todo el movimiento',
    ],
    isCustom: false,
  },
  {
    id: '3',
    name: 'Squats',
    category: 'Piernas',
    muscleGroup: ['Cuádriceps', 'Glúteos'],
    equipment: 'Sin equipo',
    difficulty: 'beginner',
    description: 'Ejercicio fundamental para piernas',
    instructions: [
      'Párate con los pies al ancho de hombros',
      'Baja como si te sentaras en una silla',
      'Mantén el pecho hacia arriba y las rodillas sobre los pies',
      'Empuja a través de los talones para volver',
    ],
    isCustom: false,
  },
  {
    id: '4',
    name: 'Dips',
    category: 'Empuje',
    muscleGroup: ['Tríceps', 'Pecho', 'Hombros'],
    equipment: 'Paralelas',
    difficulty: 'intermediate',
    description: 'Ejercicio compuesto para el tren superior',
    instructions: [
      'Sujétate en las barras paralelas',
      'Baja flexionando los codos',
      'Mantén el pecho ligeramente hacia adelante',
      'Empuja hacia arriba hasta extender los brazos',
    ],
    isCustom: false,
  },
  {
    id: '5',
    name: 'Muscle-up',
    category: 'Combinado',
    muscleGroup: ['Espalda', 'Pecho', 'Brazos'],
    equipment: 'Barra',
    difficulty: 'advanced',
    description: 'Ejercicio avanzado que combina pull-up y dip',
    instructions: [
      'Comienza con un pull-up explosivo',
      'En el punto más alto, lleva el pecho sobre la barra',
      'Transiciona a un dip empujando hacia arriba',
      'Extiende completamente los brazos en la parte superior',
    ],
    isCustom: false,
  },
  {
    id: '6',
    name: 'Pistol Squats',
    category: 'Piernas',
    muscleGroup: ['Cuádriceps', 'Glúteos'],
    equipment: 'Sin equipo',
    difficulty: 'advanced',
    description: 'Sentadilla a una pierna',
    instructions: [
      'Párate en una pierna',
      'Extiende la otra pierna hacia adelante',
      'Baja lentamente manteniendo el equilibrio',
      'Empuja hacia arriba con la pierna de apoyo',
    ],
    isCustom: false,
  },
  {
    id: '7',
    name: 'Planche',
    category: 'Estáticos',
    muscleGroup: ['Hombros', 'Core', 'Brazos'],
    equipment: 'Sin equipo',
    difficulty: 'advanced',
    description: 'Ejercicio estático avanzado de equilibrio',
    instructions: [
      'Colócate en posición de plancha',
      'Inclina el peso hacia adelante',
      'Levanta los pies del suelo',
      'Mantén el cuerpo paralelo al suelo',
    ],
    isCustom: false,
  },
  {
    id: '8',
    name: 'Front Lever',
    category: 'Estáticos',
    muscleGroup: ['Espalda', 'Core'],
    equipment: 'Barra',
    difficulty: 'advanced',
    description: 'Ejercicio estático de suspensión horizontal',
    instructions: [
      'Cuelga de la barra',
      'Activa la espalda y el core',
      'Levanta el cuerpo hasta quedar horizontal',
      'Mantén la posición con el cuerpo recto',
    ],
    isCustom: false,
  },
];

const MUSCLE_GROUPS = ['Todos', 'Pecho', 'Espalda', 'Piernas', 'Hombros', 'Brazos', 'Core'];
const EQUIPMENT_TYPES = ['Todos', 'Sin equipo', 'Barra', 'Paralelas', 'Anillas'];
const DIFFICULTY_LEVELS = ['Todos', 'beginner', 'intermediate', 'advanced'];

export default function ExerciseLibrary() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMuscle, setSelectedMuscle] = useState('Todos');
  const [selectedEquipment, setSelectedEquipment] = useState('Todos');
  const [selectedDifficulty, setSelectedDifficulty] = useState('Todos');

  const filteredExercises = EXERCISES.filter((exercise) => {
    const matchesSearch =
      exercise.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exercise.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMuscle =
      selectedMuscle === 'Todos' || exercise.muscleGroup.includes(selectedMuscle);
    const matchesEquipment =
      selectedEquipment === 'Todos' || exercise.equipment === selectedEquipment;
    const matchesDifficulty =
      selectedDifficulty === 'Todos' || exercise.difficulty === selectedDifficulty;

    return matchesSearch && matchesMuscle && matchesEquipment && matchesDifficulty;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return '#9D12DE';
      case 'intermediate':
        return '#FFEA00';
      case 'advanced':
        return '#EF4444';
      default:
        return '#71717A';
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

  const renderExercise = ({ item }: { item: Exercise }) => {
    const difficultyColor = getDifficultyColor(item.difficulty);

    return (
      <TouchableOpacity
        onPress={() => router.push(`/exercises/${item.id}` as any)}
        className="bg-zinc-900 rounded-xl p-4 mb-3 border border-zinc-800"
      >
        <View className="flex-row items-start justify-between mb-2">
          <View className="flex-1">
            <Text className="text-white font-bold text-lg">{item.name}</Text>
            <Text className="text-zinc-400 text-sm">{item.category}</Text>
          </View>
          <View
            className="px-3 py-1 rounded-full"
            style={{ backgroundColor: difficultyColor + '20' }}
          >
            <Text className="text-xs font-bold" style={{ color: difficultyColor }}>
              {getDifficultyLabel(item.difficulty)}
            </Text>
          </View>
        </View>

        <Text className="text-zinc-500 text-sm mb-3">{item.description}</Text>

        <View className="flex-row flex-wrap gap-2 mb-3">
          {item.muscleGroup.map((muscle, index) => (
            <View
              key={index}
              className="bg-primary/20 px-3 py-1 rounded-lg"
            >
              <Text className="text-primary text-xs font-semibold">{muscle}</Text>
            </View>
          ))}
        </View>

        <View className="flex-row items-center">
          <Ionicons name="barbell-outline" size={16} color="#71717A" />
          <Text className="text-zinc-500 text-sm ml-1">{item.equipment}</Text>
        </View>
      </TouchableOpacity>
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
            Biblioteca de Ejercicios
          </Text>
          <TouchableOpacity>
            <Ionicons name="add-circle" size={28} color="#9D12DE" />
          </TouchableOpacity>
        </View>

        {/* Search */}
        <View className="bg-zinc-900 rounded-xl px-4 py-3 flex-row items-center border border-zinc-800">
          <Ionicons name="search" size={20} color="#71717A" />
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Buscar ejercicios..."
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

      {/* Stats */}
      <View className="flex-row px-6 py-3 border-b border-zinc-800">
        <View className="flex-1 items-center">
          <Text className="text-white text-2xl font-bold">{EXERCISES.length}</Text>
          <Text className="text-zinc-400 text-xs">Total</Text>
        </View>
        <View className="flex-1 items-center border-l border-zinc-800">
          <Text className="text-white text-2xl font-bold">{filteredExercises.length}</Text>
          <Text className="text-zinc-400 text-xs">Resultados</Text>
        </View>
        <View className="flex-1 items-center border-l border-zinc-800">
          <Text className="text-white text-2xl font-bold">
            {EXERCISES.filter((e) => e.isCustom).length}
          </Text>
          <Text className="text-zinc-400 text-xs">Personalizados</Text>
        </View>
      </View>

      {/* Filters */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="border-b border-zinc-800"
        contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 12 }}
      >
        {/* Muscle Groups */}
        {MUSCLE_GROUPS.map((muscle) => (
          <TouchableOpacity
            key={muscle}
            onPress={() => setSelectedMuscle(muscle)}
            className={`mr-3 px-4 py-2 rounded-xl ${
              selectedMuscle === muscle
                ? 'bg-primary/20 border-2 border-primary'
                : 'bg-zinc-900'
            }`}
          >
            <Text
              className={`font-semibold ${
                selectedMuscle === muscle ? 'text-primary' : 'text-zinc-400'
              }`}
            >
              {muscle}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="border-b border-zinc-800"
        contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 12 }}
      >
        {/* Equipment */}
        {EQUIPMENT_TYPES.map((equipment) => (
          <TouchableOpacity
            key={equipment}
            onPress={() => setSelectedEquipment(equipment)}
            className={`mr-3 px-4 py-2 rounded-xl ${
              selectedEquipment === equipment
                ? 'bg-primary/20 border-2 border-primary'
                : 'bg-zinc-900'
            }`}
          >
            <Text
              className={`font-semibold ${
                selectedEquipment === equipment ? 'text-primary' : 'text-zinc-400'
              }`}
            >
              {equipment}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Exercise List */}
      <FlatList
        data={filteredExercises}
        renderItem={renderExercise}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 24 }}
        ListEmptyComponent={
          <View className="items-center justify-center py-20">
            <Ionicons name="barbell-outline" size={64} color="#52525B" />
            <Text className="text-zinc-500 text-lg mt-4">
              No se encontraron ejercicios
            </Text>
            <Text className="text-zinc-600 text-sm mt-2 text-center">
              Intenta cambiar los filtros o buscar otro término
            </Text>
          </View>
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

