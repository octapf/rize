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

interface Program {
  id: string;
  name: string;
  duration: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  goal: string;
  workoutsPerWeek: number;
  description: string;
  weeks: Week[];
}

interface Week {
  weekNumber: number;
  workouts: WorkoutDay[];
}

interface WorkoutDay {
  day: number;
  name: string;
  exercises: number;
  duration: string;
  type: string;
}

const PROGRAMS: Program[] = [
  {
    id: '1',
    name: 'Calistenia para Principiantes',
    duration: '8 semanas',
    level: 'beginner',
    goal: 'Fuerza base',
    workoutsPerWeek: 3,
    description: 'Programa diseñado para construir una base sólida de fuerza y técnica en ejercicios fundamentales de calistenia.',
    weeks: [
      {
        weekNumber: 1,
        workouts: [
          { day: 1, name: 'Full Body A', exercises: 6, duration: '45min', type: 'Fuerza' },
          { day: 3, name: 'Full Body B', exercises: 6, duration: '45min', type: 'Fuerza' },
          { day: 5, name: 'Full Body C', exercises: 6, duration: '45min', type: 'Fuerza' },
        ],
      },
    ],
  },
  {
    id: '2',
    name: 'Push Pull Legs',
    duration: '12 semanas',
    level: 'intermediate',
    goal: 'Hipertrofia',
    workoutsPerWeek: 6,
    description: 'Rutina clásica dividida en empuje, tracción y piernas para maximizar el crecimiento muscular.',
    weeks: [
      {
        weekNumber: 1,
        workouts: [
          { day: 1, name: 'Push A', exercises: 7, duration: '60min', type: 'Hipertrofia' },
          { day: 2, name: 'Pull A', exercises: 7, duration: '55min', type: 'Hipertrofia' },
          { day: 3, name: 'Legs A', exercises: 6, duration: '50min', type: 'Hipertrofia' },
          { day: 4, name: 'Push B', exercises: 7, duration: '60min', type: 'Hipertrofia' },
          { day: 5, name: 'Pull B', exercises: 7, duration: '55min', type: 'Hipertrofia' },
          { day: 6, name: 'Legs B', exercises: 6, duration: '50min', type: 'Hipertrofia' },
        ],
      },
    ],
  },
  {
    id: '3',
    name: 'Skills Avanzados',
    duration: '16 semanas',
    level: 'advanced',
    goal: 'Habilidades',
    workoutsPerWeek: 5,
    description: 'Programa enfocado en dominar movimientos avanzados como planche, front lever y muscle-up.',
    weeks: [
      {
        weekNumber: 1,
        workouts: [
          { day: 1, name: 'Planche Training', exercises: 8, duration: '75min', type: 'Skills' },
          { day: 2, name: 'Pull Strength', exercises: 7, duration: '60min', type: 'Fuerza' },
          { day: 3, name: 'Front Lever', exercises: 8, duration: '70min', type: 'Skills' },
          { day: 4, name: 'Push Strength', exercises: 7, duration: '60min', type: 'Fuerza' },
          { day: 5, name: 'Muscle-up Focus', exercises: 6, duration: '65min', type: 'Skills' },
        ],
      },
    ],
  },
  {
    id: '4',
    name: 'Pérdida de Grasa',
    duration: '10 semanas',
    level: 'intermediate',
    goal: 'Definición',
    workoutsPerWeek: 4,
    description: 'Combinación de fuerza y cardio metabólico para maximizar la quema de grasa mientras preservas músculo.',
    weeks: [
      {
        weekNumber: 1,
        workouts: [
          { day: 1, name: 'Upper Body HIIT', exercises: 8, duration: '40min', type: 'Metabólico' },
          { day: 2, name: 'Lower Body HIIT', exercises: 8, duration: '40min', type: 'Metabólico' },
          { day: 4, name: 'Full Body Circuit', exercises: 10, duration: '45min', type: 'Circuito' },
          { day: 6, name: 'HIIT Cardio', exercises: 6, duration: '35min', type: 'Cardio' },
        ],
      },
    ],
  },
];

export default function TrainingPrograms() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('all');

  const filteredPrograms = PROGRAMS.filter((program) => {
    const matchesSearch = program.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      program.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLevel = selectedLevel === 'all' || program.level === selectedLevel;
    return matchesSearch && matchesLevel;
  });

  const getLevelColor = (level: string) => {
    switch (level) {
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

  const getLevelLabel = (level: string) => {
    switch (level) {
      case 'beginner':
        return 'Principiante';
      case 'intermediate':
        return 'Intermedio';
      case 'advanced':
        return 'Avanzado';
      default:
        return level;
    }
  };

  const startProgram = (program: Program) => {
    Alert.alert(
      'Iniciar Programa',
      `¿Quieres comenzar "${program.name}"?\n\nDuración: ${program.duration}\nEntrenos por semana: ${program.workoutsPerWeek}`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Comenzar',
          onPress: () => {
            Alert.alert('¡Programa Iniciado!', 'Ahora puedes ver tu progreso en la sección de rutinas.');
          },
        },
      ]
    );
  };

  return (
    <View className="flex-1 bg-zinc-950">
      {/* Header */}
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center justify-between mb-3">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1 ml-3">
            Programas de Entrenamiento
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
            placeholder="Buscar programas..."
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

      {/* Level Filters */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="border-b border-zinc-800"
        contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 12 }}
      >
        {['all', 'beginner', 'intermediate', 'advanced'].map((level) => (
          <TouchableOpacity
            key={level}
            onPress={() => setSelectedLevel(level)}
            className={`mr-3 px-4 py-2 rounded-xl ${
              selectedLevel === level
                ? 'bg-primary'
                : 'bg-zinc-900'
            }`}
          >
            <Text
              className={`font-semibold ${
                selectedLevel === level ? 'text-white' : 'text-zinc-400'
              }`}
            >
              {level === 'all' ? 'Todos' : getLevelLabel(level)}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Programs List */}
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 py-4">
          {filteredPrograms.map((program) => {
            const levelColor = getLevelColor(program.level);

            return (
              <TouchableOpacity
                key={program.id}
                onPress={() => startProgram(program)}
                className="bg-zinc-900 rounded-xl p-4 mb-4 border border-zinc-800"
              >
                {/* Header */}
                <View className="flex-row items-start justify-between mb-3">
                  <View className="flex-1">
                    <Text className="text-white font-bold text-lg mb-1">
                      {program.name}
                    </Text>
                    <View className="flex-row items-center gap-2">
                      <View
                        className="px-2 py-1 rounded-lg"
                        style={{ backgroundColor: levelColor + '20' }}
                      >
                        <Text className="text-xs font-bold" style={{ color: levelColor }}>
                          {getLevelLabel(program.level)}
                        </Text>
                      </View>
                      <Text className="text-zinc-500 text-sm">{program.duration}</Text>
                    </View>
                  </View>
                  <Ionicons name="chevron-forward" size={24} color="#71717A" />
                </View>

                {/* Description */}
                <Text className="text-zinc-400 text-sm leading-5 mb-3">
                  {program.description}
                </Text>

                {/* Stats */}
                <View className="flex-row gap-3 mb-3">
                  <View className="flex-1 bg-zinc-800 rounded-lg p-2">
                    <View className="flex-row items-center">
                      <Ionicons name="calendar" size={16} color="#71717A" />
                      <Text className="text-white font-bold ml-2">
                        {program.workoutsPerWeek}x
                      </Text>
                    </View>
                    <Text className="text-zinc-500 text-xs">por semana</Text>
                  </View>

                  <View className="flex-1 bg-zinc-800 rounded-lg p-2">
                    <View className="flex-row items-center">
                      <Ionicons name="flag" size={16} color="#71717A" />
                      <Text className="text-white font-bold ml-2 capitalize">
                        {program.goal}
                      </Text>
                    </View>
                    <Text className="text-zinc-500 text-xs">objetivo</Text>
                  </View>
                </View>

                {/* Week Preview */}
                <View className="pt-3 border-t border-zinc-800">
                  <Text className="text-zinc-400 text-xs mb-2">
                    Semana {program.weeks[0].weekNumber}:
                  </Text>
                  <View className="flex-row flex-wrap gap-2">
                    {program.weeks[0].workouts.slice(0, 3).map((workout, index) => (
                      <View
                        key={index}
                        className="bg-primary/10 px-3 py-1 rounded-lg"
                      >
                        <Text className="text-primary text-xs font-semibold">
                          {workout.name}
                        </Text>
                      </View>
                    ))}
                    {program.weeks[0].workouts.length > 3 && (
                      <View className="bg-zinc-800 px-3 py-1 rounded-lg">
                        <Text className="text-zinc-400 text-xs font-semibold">
                          +{program.weeks[0].workouts.length - 3} más
                        </Text>
                      </View>
                    )}
                  </View>
                </View>

                {/* CTA */}
                <TouchableOpacity
                  onPress={() => startProgram(program)}
                  className="bg-primary rounded-lg p-3 mt-3 flex-row items-center justify-center"
                >
                  <Ionicons name="play" size={20} color="white" />
                  <Text className="text-white font-bold ml-2">Comenzar Programa</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            );
          })}

          {filteredPrograms.length === 0 && (
            <View className="items-center justify-center py-20">
              <Ionicons name="search-outline" size={64} color="#52525B" />
              <Text className="text-zinc-500 text-lg mt-4">
                No se encontraron programas
              </Text>
              <Text className="text-zinc-600 text-sm mt-2 text-center">
                Intenta cambiar los filtros o buscar otro término
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

