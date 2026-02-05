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

interface WorkoutSplit {
  id: string;
  name: string;
  description: string;
  days: number;
  difficulty: 'principiante' | 'intermedio' | 'avanzado';
  goal: 'fuerza' | 'hipertrofia' | 'resistencia' | 'general';
  popularity: number;
  schedule: {
    day: string;
    focus: string;
    exercises: number;
  }[];
}

const SPLITS: WorkoutSplit[] = [
  {
    id: '1',
    name: 'Push/Pull/Legs',
    description: 'DivisiÃ³n clÃ¡sica de 3 dÃ­as con enfoque en patrones de movimiento',
    days: 6,
    difficulty: 'intermedio',
    goal: 'hipertrofia',
    popularity: 95,
    schedule: [
      { day: 'Lunes', focus: 'Push (Pecho/Hombros/TrÃ­ceps)', exercises: 8 },
      { day: 'Martes', focus: 'Pull (Espalda/BÃ­ceps)', exercises: 7 },
      { day: 'MiÃ©rcoles', focus: 'Legs (Piernas)', exercises: 6 },
      { day: 'Jueves', focus: 'Push', exercises: 8 },
      { day: 'Viernes', focus: 'Pull', exercises: 7 },
      { day: 'SÃ¡bado', focus: 'Legs', exercises: 6 },
    ],
  },
  {
    id: '2',
    name: 'Full Body 3x',
    description: 'Entrenamiento de cuerpo completo 3 veces por semana',
    days: 3,
    difficulty: 'principiante',
    goal: 'general',
    popularity: 88,
    schedule: [
      { day: 'Lunes', focus: 'Full Body A', exercises: 6 },
      { day: 'MiÃ©rcoles', focus: 'Full Body B', exercises: 6 },
      { day: 'Viernes', focus: 'Full Body C', exercises: 6 },
    ],
  },
  {
    id: '3',
    name: 'Upper/Lower 4x',
    description: 'Alternancia entre tren superior e inferior',
    days: 4,
    difficulty: 'intermedio',
    goal: 'fuerza',
    popularity: 82,
    schedule: [
      { day: 'Lunes', focus: 'Upper (Tren Superior)', exercises: 8 },
      { day: 'Martes', focus: 'Lower (Tren Inferior)', exercises: 7 },
      { day: 'Jueves', focus: 'Upper', exercises: 8 },
      { day: 'Viernes', focus: 'Lower', exercises: 7 },
    ],
  },
  {
    id: '4',
    name: 'Bro Split 5x',
    description: 'Un grupo muscular por dÃ­a, ideal para volumen',
    days: 5,
    difficulty: 'avanzado',
    goal: 'hipertrofia',
    popularity: 75,
    schedule: [
      { day: 'Lunes', focus: 'Pecho', exercises: 7 },
      { day: 'Martes', focus: 'Espalda', exercises: 7 },
      { day: 'MiÃ©rcoles', focus: 'Hombros', exercises: 6 },
      { day: 'Jueves', focus: 'Piernas', exercises: 8 },
      { day: 'Viernes', focus: 'Brazos', exercises: 6 },
    ],
  },
];

export default function WorkoutSplits() {
  const [selectedGoal, setSelectedGoal] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');

  const goals = [
    { id: 'all', label: 'Todos' },
    { id: 'fuerza', label: 'Fuerza' },
    { id: 'hipertrofia', label: 'Hipertrofia' },
    { id: 'resistencia', label: 'Resistencia' },
    { id: 'general', label: 'General' },
  ];

  const difficulties = [
    { id: 'all', label: 'Todos' },
    { id: 'principiante', label: 'Principiante' },
    { id: 'intermedio', label: 'Intermedio' },
    { id: 'avanzado', label: 'Avanzado' },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'principiante':
        return '#9D12DE';
      case 'intermedio':
        return '#FFEA00';
      case 'avanzado':
        return '#EF4444';
      default:
        return '#71717A';
    }
  };

  const getGoalColor = (goal: string) => {
    switch (goal) {
      case 'fuerza':
        return '#EF4444';
      case 'hipertrofia':
        return '#9D12DE';
      case 'resistencia':
        return '#9D12DE';
      case 'general':
        return '#FFEA00';
      default:
        return '#71717A';
    }
  };

  const selectSplit = (split: WorkoutSplit) => {
    Alert.alert(
      'Aplicar Rutina',
      `${split.name}\n\n${split.days} dÃ­as por semana\n\nÂ¿Deseas aplicar esta rutina a tu programa?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Aplicar',
          onPress: () => {
            Alert.alert('Â¡Rutina Aplicada!', 'Tu nueva rutina estÃ¡ lista para comenzar');
          },
        },
      ]
    );
  };

  const viewSplitDetails = (split: WorkoutSplit) => {
    const scheduleText = split.schedule.map((s) => `${s.day}: ${s.focus}`).join('\n');
    
    Alert.alert(
      split.name,
      `${split.description}\n\n${scheduleText}`,
      [
        { text: 'Aplicar Rutina', onPress: () => selectSplit(split) },
        { text: 'Cerrar' },
      ]
    );
  };

  const filteredSplits = SPLITS.filter((split) => {
    const matchesGoal = selectedGoal === 'all' || split.goal === selectedGoal;
    const matchesDifficulty = selectedDifficulty === 'all' || split.difficulty === selectedDifficulty;
    return matchesGoal && matchesDifficulty;
  });

  return (
    <View className="flex-1 bg-zinc-950">
      {/* Header */}
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1 ml-3">
            Rutinas de Entrenamiento
          </Text>
          <TouchableOpacity>
            <Ionicons name="information-circle-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Filters */}
        <Text className="text-white font-bold mb-2">Objetivo</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-3">
          <View className="flex-row gap-2">
            {goals.map((goal) => (
              <TouchableOpacity
                key={goal.id}
                onPress={() => setSelectedGoal(goal.id)}
                className={`px-4 py-2 rounded-lg ${
                  selectedGoal === goal.id
                    ? 'bg-primary'
                    : 'bg-zinc-900 border border-zinc-800'
                }`}
              >
                <Text
                  className={`font-semibold text-sm ${
                    selectedGoal === goal.id ? 'text-white' : 'text-zinc-400'
                  }`}
                >
                  {goal.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        <Text className="text-white font-bold mb-2">Dificultad</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row gap-2">
            {difficulties.map((difficulty) => (
              <TouchableOpacity
                key={difficulty.id}
                onPress={() => setSelectedDifficulty(difficulty.id)}
                className={`px-4 py-2 rounded-lg ${
                  selectedDifficulty === difficulty.id
                    ? 'bg-primary'
                    : 'bg-zinc-900 border border-zinc-800'
                }`}
              >
                <Text
                  className={`font-semibold text-sm ${
                    selectedDifficulty === difficulty.id ? 'text-white' : 'text-zinc-400'
                  }`}
                >
                  {difficulty.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          {filteredSplits.map((split) => (
            <TouchableOpacity
              key={split.id}
              onPress={() => viewSplitDetails(split)}
              className="bg-zinc-900 rounded-xl p-4 mb-4 border border-zinc-800"
            >
              {/* Header */}
              <View className="flex-row items-start justify-between mb-3">
                <View className="flex-1">
                  <Text className="text-white font-bold text-xl mb-1">
                    {split.name}
                  </Text>
                  <Text className="text-zinc-400 text-sm mb-2">
                    {split.description}
                  </Text>
                </View>
              </View>

              {/* Badges */}
              <View className="flex-row flex-wrap gap-2 mb-3">
                <View
                  className="px-3 py-1 rounded-full"
                  style={{ backgroundColor: getDifficultyColor(split.difficulty) + '20' }}
                >
                  <Text
                    className="text-xs font-bold capitalize"
                    style={{ color: getDifficultyColor(split.difficulty) }}
                  >
                    {split.difficulty}
                  </Text>
                </View>
                <View
                  className="px-3 py-1 rounded-full"
                  style={{ backgroundColor: getGoalColor(split.goal) + '20' }}
                >
                  <Text
                    className="text-xs font-bold capitalize"
                    style={{ color: getGoalColor(split.goal) }}
                  >
                    {split.goal}
                  </Text>
                </View>
                <View className="bg-purple-500/20 px-3 py-1 rounded-full">
                  <Text className="text-purple-400 text-xs font-bold">
                    {split.days} dÃ­as/semana
                  </Text>
                </View>
                <View className="bg-amber-500/20 px-3 py-1 rounded-full">
                  <Text className="text-amber-500 text-xs font-bold">
                    {split.popularity}% popularidad
                  </Text>
                </View>
              </View>

              {/* Schedule */}
              <View className="bg-zinc-800 rounded-lg p-3 mb-3">
                <Text className="text-white font-semibold mb-2">Calendario Semanal</Text>
                {split.schedule.map((day, index) => (
                  <View
                    key={index}
                    className="flex-row items-center justify-between py-2 border-b border-zinc-700 last:border-b-0"
                  >
                    <View className="flex-1">
                      <Text className="text-primary font-semibold text-sm">
                        {day.day}
                      </Text>
                      <Text className="text-zinc-300 text-xs">{day.focus}</Text>
                    </View>
                    <Text className="text-zinc-400 text-xs">
                      {day.exercises} ejercicios
                    </Text>
                  </View>
                ))}
              </View>

              {/* Actions */}
              <TouchableOpacity
                onPress={() => selectSplit(split)}
                className="bg-primary rounded-lg p-3"
              >
                <Text className="text-white font-bold text-center">
                  Aplicar Esta Rutina
                </Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}

          {filteredSplits.length === 0 && (
            <View className="bg-zinc-900 rounded-xl p-8 border border-zinc-800 items-center">
              <Ionicons name="calendar-outline" size={48} color="#71717A" />
              <Text className="text-zinc-400 font-bold mt-4">
                No hay rutinas disponibles
              </Text>
              <Text className="text-zinc-500 text-sm mt-2 text-center">
                Prueba con otros filtros
              </Text>
            </View>
          )}
        </View>

        {/* Info Card */}
        <View className="px-6 pb-6 pt-4">
          <View className="bg-primary/10 rounded-xl p-4 border border-primary/30">
            <View className="flex-row items-start">
              <Ionicons name="information-circle" size={20} color="#9D12DE" />
              <View className="flex-1 ml-3">
                <Text className="text-primary/80 font-bold mb-2">
                  Â¿QuÃ© rutina elegir?
                </Text>
                <Text className="text-primary/60 text-sm mb-2">
                  â€¢ Principiante: Full Body 3x semana
                </Text>
                <Text className="text-primary/60 text-sm mb-2">
                  â€¢ Intermedio: Push/Pull/Legs o Upper/Lower
                </Text>
                <Text className="text-primary/60 text-sm">
                  â€¢ Avanzado: Bro Split con alto volumen
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

