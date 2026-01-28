import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface Exercise {
  name: string;
  muscleGroup: string;
  equipment: string;
  difficulty: string;
}

interface Substitution {
  original: Exercise;
  alternatives: Exercise[];
  reason: string;
}

const EXERCISE_DATABASE: { [key: string]: Substitution } = {
  'press-banca': {
    original: {
      name: 'Press de Banca con Barra',
      muscleGroup: 'Pecho',
      equipment: 'Barra',
      difficulty: 'Intermedio',
    },
    alternatives: [
      { name: 'Press con Mancuernas', muscleGroup: 'Pecho', equipment: 'Mancuernas', difficulty: 'Intermedio' },
      { name: 'Flexiones', muscleGroup: 'Pecho', equipment: 'Peso Corporal', difficulty: 'Principiante' },
      { name: 'Press en Máquina', muscleGroup: 'Pecho', equipment: 'Máquina', difficulty: 'Principiante' },
      { name: 'Aperturas con Mancuernas', muscleGroup: 'Pecho', equipment: 'Mancuernas', difficulty: 'Intermedio' },
    ],
    reason: 'Misma activación pectoral, diferentes estabilizadores',
  },
  'sentadilla': {
    original: {
      name: 'Sentadilla con Barra',
      muscleGroup: 'Piernas',
      equipment: 'Barra',
      difficulty: 'Intermedio',
    },
    alternatives: [
      { name: 'Sentadilla Goblet', muscleGroup: 'Piernas', equipment: 'Mancuerna', difficulty: 'Principiante' },
      { name: 'Sentadilla Búlgara', muscleGroup: 'Piernas', equipment: 'Mancuernas', difficulty: 'Intermedio' },
      { name: 'Prensa de Piernas', muscleGroup: 'Piernas', equipment: 'Máquina', difficulty: 'Principiante' },
      { name: 'Zancadas', muscleGroup: 'Piernas', equipment: 'Mancuernas', difficulty: 'Intermedio' },
    ],
    reason: 'Patrón de sentadilla manteniendo activación cuádriceps',
  },
  'peso-muerto': {
    original: {
      name: 'Peso Muerto con Barra',
      muscleGroup: 'Espalda/Piernas',
      equipment: 'Barra',
      difficulty: 'Avanzado',
    },
    alternatives: [
      { name: 'Peso Muerto Rumano', muscleGroup: 'Espalda/Piernas', equipment: 'Barra/Mancuernas', difficulty: 'Intermedio' },
      { name: 'Buenos Días', muscleGroup: 'Espalda/Piernas', equipment: 'Barra', difficulty: 'Intermedio' },
      { name: 'Hip Thrusts', muscleGroup: 'Glúteos', equipment: 'Barra', difficulty: 'Intermedio' },
      { name: 'Hiperextensiones', muscleGroup: 'Espalda Baja', equipment: 'Peso Corporal', difficulty: 'Principiante' },
    ],
    reason: 'Patrón de bisagra de cadera, cadena posterior',
  },
  'dominadas': {
    original: {
      name: 'Dominadas',
      muscleGroup: 'Espalda',
      equipment: 'Barra Fija',
      difficulty: 'Intermedio',
    },
    alternatives: [
      { name: 'Pulldowns en Polea', muscleGroup: 'Espalda', equipment: 'Máquina', difficulty: 'Principiante' },
      { name: 'Dominadas Asistidas', muscleGroup: 'Espalda', equipment: 'Banda/Máquina', difficulty: 'Principiante' },
      { name: 'Remo Invertido', muscleGroup: 'Espalda', equipment: 'Barra', difficulty: 'Intermedio' },
      { name: 'Chin-ups', muscleGroup: 'Espalda', equipment: 'Barra Fija', difficulty: 'Intermedio' },
    ],
    reason: 'Patrón de tracción vertical para dorsales',
  },
  'press-militar': {
    original: {
      name: 'Press Militar con Barra',
      muscleGroup: 'Hombros',
      equipment: 'Barra',
      difficulty: 'Intermedio',
    },
    alternatives: [
      { name: 'Press con Mancuernas', muscleGroup: 'Hombros', equipment: 'Mancuernas', difficulty: 'Intermedio' },
      { name: 'Press Arnold', muscleGroup: 'Hombros', equipment: 'Mancuernas', difficulty: 'Avanzado' },
      { name: 'Pike Push-ups', muscleGroup: 'Hombros', equipment: 'Peso Corporal', difficulty: 'Intermedio' },
      { name: 'Press en Máquina', muscleGroup: 'Hombros', equipment: 'Máquina', difficulty: 'Principiante' },
    ],
    reason: 'Presión vertical para deltoides',
  },
  'remo-barra': {
    original: {
      name: 'Remo con Barra',
      muscleGroup: 'Espalda',
      equipment: 'Barra',
      difficulty: 'Intermedio',
    },
    alternatives: [
      { name: 'Remo con Mancuernas', muscleGroup: 'Espalda', equipment: 'Mancuernas', difficulty: 'Intermedio' },
      { name: 'Remo en Polea', muscleGroup: 'Espalda', equipment: 'Máquina', difficulty: 'Principiante' },
      { name: 'Remo T-Bar', muscleGroup: 'Espalda', equipment: 'Barra', difficulty: 'Intermedio' },
      { name: 'Remo Pendlay', muscleGroup: 'Espalda', equipment: 'Barra', difficulty: 'Avanzado' },
    ],
    reason: 'Tracción horizontal para espalda media',
  },
};

const INJURY_SUBSTITUTIONS: { [key: string]: string[] } = {
  'hombro': [
    'Evita: Press militar, press banca, elevaciones laterales',
    'Sustituye con: Press neutro, flexiones con manos juntas, face pulls',
  ],
  'espalda-baja': [
    'Evita: Peso muerto, sentadilla pesada, buenos días',
    'Sustituye con: Goblet squat, prensa piernas, hip thrusts',
  ],
  'rodilla': [
    'Evita: Sentadilla profunda, zancadas, extensiones',
    'Sustituye con: Sentadilla parcial, step-ups bajos, bicicleta',
  ],
  'muñeca': [
    'Evita: Press banca, flexiones normales, curl de bíceps',
    'Sustituye con: Press neutro, flexiones en barras paralelas, curl martillo',
  ],
};

export default function ExerciseSubstitutions() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExercise, setSelectedExercise] = useState<string | null>(null);
  const [selectedReason, setSelectedReason] = useState<'equipment' | 'injury' | 'preference'>('equipment');

  const exercises = Object.keys(EXERCISE_DATABASE);
  const filteredExercises = exercises.filter(key =>
    EXERCISE_DATABASE[key].original.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const reasons = [
    { key: 'equipment', label: 'Sin Equipo', icon: 'close-circle', color: 'red' },
    { key: 'injury', label: 'Lesión', icon: 'bandage', color: 'amber' },
    { key: 'preference', label: 'Preferencia', icon: 'heart', color: 'emerald' },
  ];

  if (selectedExercise && EXERCISE_DATABASE[selectedExercise]) {
    const substitution = EXERCISE_DATABASE[selectedExercise];

    return (
      <View className="flex-1 bg-zinc-950">
        {/* Header */}
        <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
          <View className="flex-row items-center mb-4">
            <TouchableOpacity onPress={() => setSelectedExercise(null)}>
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <Text className="text-white text-2xl font-bold flex-1 ml-3">
              Alternativas
            </Text>
          </View>
        </View>

        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          <View className="px-6 pt-6">
            {/* Original Exercise */}
            <View className="bg-gradient-to-r from-red-500 to-pink-500 rounded-xl p-5 mb-6">
              <Text className="text-white opacity-90 text-sm mb-2">Ejercicio Original</Text>
              <Text className="text-white text-2xl font-bold mb-3">{substitution.original.name}</Text>
              <View className="flex-row gap-2">
                <View className="bg-white/20 rounded-full px-3 py-1">
                  <Text className="text-white text-xs font-bold">{substitution.original.muscleGroup}</Text>
                </View>
                <View className="bg-white/20 rounded-full px-3 py-1">
                  <Text className="text-white text-xs font-bold">{substitution.original.equipment}</Text>
                </View>
                <View className="bg-white/20 rounded-full px-3 py-1">
                  <Text className="text-white text-xs font-bold">{substitution.original.difficulty}</Text>
                </View>
              </View>
            </View>

            {/* Reason */}
            <View className="bg-blue-500/10 rounded-xl p-4 border border-blue-500/30 mb-6">
              <View className="flex-row items-start">
                <Ionicons name="information-circle" size={20} color="#3B82F6" />
                <View className="flex-1 ml-3">
                  <Text className="text-blue-400 font-bold mb-2">Por Qué Estas Alternativas</Text>
                  <Text className="text-blue-300 text-sm">{substitution.reason}</Text>
                </View>
              </View>
            </View>

            {/* Alternatives */}
            <Text className="text-white font-bold text-lg mb-4">
              {substitution.alternatives.length} Alternativas
            </Text>

            {substitution.alternatives.map((alt, index) => (
              <View key={index} className="bg-zinc-900 rounded-xl p-5 mb-3 border border-zinc-800">
                <View className="flex-row items-center justify-between mb-3">
                  <View className="flex-1">
                    <Text className="text-white font-bold text-lg mb-1">{alt.name}</Text>
                    <Text className="text-zinc-400 text-sm">{alt.muscleGroup}</Text>
                  </View>
                  <View className={`w-10 h-10 rounded-full items-center justify-center ${
                    alt.difficulty === 'Principiante' ? 'bg-emerald-500' :
                    alt.difficulty === 'Intermedio' ? 'bg-blue-500' : 'bg-red-500'
                  }`}>
                    <Text className="text-white font-bold text-xs">
                      {alt.difficulty === 'Principiante' ? 'P' : alt.difficulty === 'Intermedio' ? 'I' : 'A'}
                    </Text>
                  </View>
                </View>

                <View className="flex-row gap-2">
                  <View className="bg-zinc-800 rounded px-3 py-1">
                    <Text className="text-zinc-400 text-xs">🏋️ {alt.equipment}</Text>
                  </View>
                  <View className={`rounded px-3 py-1 ${
                    alt.difficulty === 'Principiante' ? 'bg-emerald-500/10 border border-emerald-500/30' :
                    alt.difficulty === 'Intermedio' ? 'bg-blue-500/10 border border-blue-500/30' :
                    'bg-red-500/10 border border-red-500/30'
                  }`}>
                    <Text className={`text-xs font-bold ${
                      alt.difficulty === 'Principiante' ? 'text-emerald-400' :
                      alt.difficulty === 'Intermedio' ? 'text-blue-400' : 'text-red-400'
                    }`}>
                      {alt.difficulty}
                    </Text>
                  </View>
                </View>
              </View>
            ))}

            {/* Tips */}
            <View className="bg-amber-500/10 rounded-xl p-4 border border-amber-500/30 mb-6">
              <View className="flex-row items-start">
                <Ionicons name="bulb" size={20} color="#F59E0B" />
                <View className="flex-1 ml-3">
                  <Text className="text-amber-400 font-bold mb-2">Tips de Sustitución</Text>
                  <Text className="text-amber-300 text-sm">
                    • Mantén el mismo rango de reps{'\n'}
                    • Ajusta peso según dificultad{'\n'}
                    • Prioriza técnica perfecta{'\n'}
                    • Si es por lesión, consulta médico
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-zinc-950">
      {/* Header */}
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1 ml-3">
            Exercise Substitutions
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          {/* Search */}
          <View className="bg-zinc-900 rounded-xl p-4 mb-6 border border-zinc-800">
            <View className="flex-row items-center">
              <Ionicons name="search" size={20} color="#71717A" />
              <TextInput
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholder="Buscar ejercicio..."
                placeholderTextColor="#71717A"
                className="flex-1 text-white ml-3 text-base"
              />
            </View>
          </View>

          {/* Reason Selector */}
          <Text className="text-white font-bold text-lg mb-3">¿Por Qué Sustituir?</Text>
          <View className="flex-row gap-3 mb-6">
            {reasons.map((reason) => (
              <TouchableOpacity
                key={reason.key}
                onPress={() => setSelectedReason(reason.key as any)}
                className={`flex-1 rounded-xl p-4 ${
                  selectedReason === reason.key
                    ? `bg-${reason.color}-500`
                    : 'bg-zinc-900 border border-zinc-800'
                }`}
              >
                <Ionicons
                  name={reason.icon as any}
                  size={24}
                  color={selectedReason === reason.key ? 'white' : '#71717A'}
                />
                <Text className={`font-bold text-sm mt-2 ${
                  selectedReason === reason.key ? 'text-white' : 'text-zinc-400'
                }`}>
                  {reason.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Injury Guide */}
          {selectedReason === 'injury' && (
            <View className="bg-amber-500/10 rounded-xl p-4 border border-amber-500/30 mb-6">
              <View className="flex-row items-start mb-3">
                <Ionicons name="warning" size={20} color="#F59E0B" />
                <Text className="text-amber-400 font-bold ml-2 flex-1">
                  Sustituciones por Lesión
                </Text>
              </View>
              
              {Object.entries(INJURY_SUBSTITUTIONS).map(([injury, tips]) => (
                <View key={injury} className="mb-3 last:mb-0">
                  <Text className="text-amber-400 font-bold mb-1 capitalize">
                    {injury.replace('-', ' ')}
                  </Text>
                  {tips.map((tip, idx) => (
                    <Text key={idx} className="text-amber-300 text-sm mb-1">
                      {tip}
                    </Text>
                  ))}
                </View>
              ))}
            </View>
          )}

          {/* Exercise List */}
          <Text className="text-white font-bold text-lg mb-4">
            Ejercicios ({filteredExercises.length})
          </Text>

          {filteredExercises.map((key) => {
            const exercise = EXERCISE_DATABASE[key].original;
            const altCount = EXERCISE_DATABASE[key].alternatives.length;

            return (
              <TouchableOpacity
                key={key}
                onPress={() => setSelectedExercise(key)}
                className="bg-zinc-900 rounded-xl p-4 mb-3 border border-zinc-800"
              >
                <View className="flex-row items-center justify-between mb-2">
                  <Text className="text-white font-bold text-lg flex-1">{exercise.name}</Text>
                  <Ionicons name="chevron-forward" size={20} color="#71717A" />
                </View>

                <View className="flex-row items-center justify-between">
                  <View className="flex-row gap-2">
                    <View className="bg-zinc-800 rounded px-2 py-1">
                      <Text className="text-zinc-400 text-xs">{exercise.muscleGroup}</Text>
                    </View>
                    <View className="bg-zinc-800 rounded px-2 py-1">
                      <Text className="text-zinc-400 text-xs">{exercise.equipment}</Text>
                    </View>
                  </View>
                  <View className="bg-emerald-500/10 rounded px-3 py-1 border border-emerald-500/30">
                    <Text className="text-emerald-400 font-bold text-xs">
                      {altCount} alternativas
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}

          {filteredExercises.length === 0 && (
            <View className="bg-zinc-900 rounded-xl p-8 border border-zinc-800 items-center">
              <Ionicons name="search-outline" size={64} color="#52525B" />
              <Text className="text-zinc-400 text-center mt-4">
                No se encontraron ejercicios
              </Text>
            </View>
          )}

          {/* Info */}
          <View className="bg-blue-500/10 rounded-xl p-4 border border-blue-500/30 mb-6 mt-4">
            <View className="flex-row items-start">
              <Ionicons name="information-circle" size={20} color="#3B82F6" />
              <View className="flex-1 ml-3">
                <Text className="text-blue-400 font-bold mb-2">
                  Cuándo Sustituir Ejercicios
                </Text>
                <Text className="text-blue-300 text-sm">
                  • Sin equipo disponible{'\n'}
                  • Lesión o molestia{'\n'}
                  • Preferencia personal{'\n'}
                  • Variación del programa{'\n'}
                  • Adaptación para principiantes{'\n'}
                  • Progresión hacia ejercicios avanzados
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
