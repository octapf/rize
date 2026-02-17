import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface WarmupExercise {
  name: string;
  sets: number;
  reps: string;
  weight?: string;
  notes?: string;
}

interface WarmupPlan {
  phase: string;
  duration: string;
  exercises: WarmupExercise[];
  color: string;
}

const WORKOUT_TYPES = [
  { value: 'upper', label: 'Tren Superior', icon: 'fitness', color: 'blue' },
  { value: 'lower', label: 'Tren Inferior', icon: 'walk', color: 'red' },
  { value: 'push', label: 'Push Day', icon: 'arrow-up', color: 'purple' },
  { value: 'pull', label: 'Pull Day', icon: 'arrow-down', color: 'primary' },
  { value: 'fullbody', label: 'Full Body', icon: 'body', color: 'amber' },
];

const MAIN_LIFTS = [
  'Press Banca',
  'Sentadilla',
  'Peso Muerto',
  'Press Militar',
  'Dominadas',
  'Remo con Barra',
];

export default function WarmupGenerator() {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedLift, setSelectedLift] = useState<string | null>(null);
  const [workingWeight, setWorkingWeight] = useState<number | null>(null);
  const [generatedPlan, setGeneratedPlan] = useState<WarmupPlan[] | null>(null);

  const generateWarmup = () => {
    if (!selectedType) {
      Alert.alert('Error', 'Selecciona tipo de entrenamiento');
      return;
    }

    const plan: WarmupPlan[] = [
      // Phase 1: General Movement
      {
        phase: 'Activaci�n General',
        duration: '3-5 min',
        color: 'primary',
        exercises: getGeneralMovement(selectedType),
      },
      // Phase 2: Dynamic Stretching
      {
        phase: 'Movilidad Din�mica',
        duration: '3-4 min',
        color: 'blue',
        exercises: getDynamicStretches(selectedType),
      },
      // Phase 3: Activation
      {
        phase: 'Activaci�n Muscular',
        duration: '2-3 min',
        color: 'purple',
        exercises: getActivation(selectedType),
      },
    ];

    // Phase 4: Specific Warmup (if main lift selected)
    if (selectedLift && workingWeight) {
      plan.push({
        phase: 'Calentamiento Espec�fico',
        duration: '5-7 min',
        color: 'amber',
        exercises: getSpecificWarmup(selectedLift, workingWeight),
      });
    }

    setGeneratedPlan(plan);
  };

  const getGeneralMovement = (type: string): WarmupExercise[] => {
    const common = [
      { name: 'Jumping Jacks', sets: 1, reps: '30 seg' },
      { name: 'High Knees', sets: 1, reps: '20 seg' },
    ];

    if (type === 'lower' || type === 'fullbody') {
      return [
        ...common,
        { name: 'Bodyweight Squats', sets: 1, reps: '15' },
        { name: 'Leg Swings', sets: 1, reps: '10 cada lado' },
      ];
    }

    return [
      ...common,
      { name: 'Arm Circles', sets: 1, reps: '10 adelante/atr�s' },
      { name: 'Torso Twists', sets: 1, reps: '15' },
    ];
  };

  const getDynamicStretches = (type: string): WarmupExercise[] => {
    if (type === 'lower' || type === 'fullbody') {
      return [
        { name: 'World\'s Greatest Stretch', sets: 1, reps: '5 cada lado', notes: 'Mant�n 2 seg' },
        { name: 'Walking Lunges', sets: 1, reps: '10 cada pierna' },
        { name: 'Leg Swings (frontal y lateral)', sets: 1, reps: '10 cada direcci�n' },
        { name: '90/90 Hip Rotations', sets: 1, reps: '8 cada lado' },
      ];
    }

    if (type === 'push') {
      return [
        { name: 'Band Pull-Aparts', sets: 2, reps: '15' },
        { name: 'Scapular Push-ups', sets: 1, reps: '10' },
        { name: 'Shoulder Dislocations', sets: 1, reps: '10', notes: 'Con palo/banda' },
        { name: 'Wall Slides', sets: 1, reps: '12' },
      ];
    }

    return [
      { name: 'Cat-Cow', sets: 1, reps: '10' },
      { name: 'Thread the Needle', sets: 1, reps: '6 cada lado' },
      { name: 'Band Pull-Aparts', sets: 2, reps: '15' },
      { name: 'Dead Hangs', sets: 1, reps: '20 seg', notes: 'Activa esc�pulas' },
    ];
  };

  const getActivation = (type: string): WarmupExercise[] => {
    if (type === 'lower' || type === 'fullbody') {
      return [
        { name: 'Glute Bridges', sets: 2, reps: '15', notes: 'Pausa arriba 2 seg' },
        { name: 'Clamshells', sets: 2, reps: '12 cada lado', notes: 'Con banda si tienes' },
        { name: 'Monster Walks', sets: 2, reps: '10 pasos cada direcci�n', notes: 'Banda en rodillas' },
      ];
    }

    if (type === 'push') {
      return [
        { name: 'Push-ups', sets: 2, reps: '8-10', notes: 'Tempo lento' },
        { name: 'Band Face Pulls', sets: 2, reps: '15' },
        { name: 'Plate Raises', sets: 2, reps: '10', weight: '2.5-5 kg' },
      ];
    }

    return [
      { name: 'Band Rows', sets: 2, reps: '15' },
      { name: 'Scapular Retractions', sets: 2, reps: '12', notes: 'Enf�cate en apretar' },
      { name: 'Y-T-W Raises', sets: 1, reps: '8 cada posici�n' },
    ];
  };

  const getSpecificWarmup = (lift: string, working: number): WarmupExercise[] => {
    // Progressive loading: bar -> 50% -> 70% -> 85% -> working weight
    const bar = 20;
    const set1 = Math.round(working * 0.5 / 2.5) * 2.5;
    const set2 = Math.round(working * 0.7 / 2.5) * 2.5;
    const set3 = Math.round(working * 0.85 / 2.5) * 2.5;

    return [
      { name: lift, sets: 1, reps: '10', weight: `${bar}kg (barra sola)`, notes: 'Enf�cate en t�cnica' },
      { name: lift, sets: 1, reps: '8', weight: `${set1}kg`, notes: '50% del peso de trabajo' },
      { name: lift, sets: 1, reps: '5', weight: `${set2}kg`, notes: '70% del peso de trabajo' },
      { name: lift, sets: 1, reps: '3', weight: `${set3}kg`, notes: '85% del peso de trabajo' },
      { name: lift, sets: 1, reps: '1', weight: `${working}kg`, notes: 'Peso de trabajo - �Listo!' },
    ];
  };

  const reset = () => {
    setSelectedType(null);
    setSelectedLift(null);
    setWorkingWeight(null);
    setGeneratedPlan(null);
  };

  if (generatedPlan) {
    return (
      <View className="flex-1 bg-zinc-950">
        {/* Header */}
        <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
          <View className="flex-row items-center mb-4">
            <TouchableOpacity onPress={reset}>
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <Text className="text-white text-2xl font-bold flex-1 ml-3">
              Tu Calentamiento
            </Text>
            <TouchableOpacity onPress={() => Alert.alert('Guardado', 'Calentamiento guardado')}>
              <Ionicons name="bookmark" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          <View className="px-6 pt-6">
            {/* Total Duration */}
            <View className="bg-gradient-to-r from-primary to-[#7D0EBE] rounded-xl p-6 mb-6">
              <Text className="text-white opacity-90 text-sm mb-1">Duraci�n Total</Text>
              <Text className="text-white text-5xl font-bold mb-2">
                {selectedLift ? '18-20' : '10-12'} min
              </Text>
              <Text className="text-white opacity-90">
                {generatedPlan.length} fases de calentamiento
              </Text>
            </View>

            {/* Phases */}
            {generatedPlan.map((phase, phaseIdx) => (
              <View key={phaseIdx} className="mb-6">
                <View className={`bg-${phase.color}-500 rounded-t-xl p-4`}>
                  <View className="flex-row items-center justify-between">
                    <View>
                      <Text className="text-white font-bold text-lg">
                        Fase {phaseIdx + 1}: {phase.phase}
                      </Text>
                      <Text className="text-white opacity-90 text-sm">
                        {phase.duration}
                      </Text>
                    </View>
                    <View className="w-10 h-10 bg-white/20 rounded-full items-center justify-center">
                      <Text className="text-white font-bold text-lg">{phaseIdx + 1}</Text>
                    </View>
                  </View>
                </View>

                <View className="bg-zinc-900 rounded-b-xl border-x border-b border-zinc-800">
                  {phase.exercises.map((exercise, exIdx) => (
                    <View
                      key={exIdx}
                      className={`p-4 ${exIdx < phase.exercises.length - 1 ? 'border-b border-zinc-800' : ''}`}
                    >
                      <View className="flex-row items-start justify-between mb-2">
                        <Text className="text-white font-bold text-base flex-1">
                          {exercise.name}
                        </Text>
                        <Text className={`text-${phase.color}-400 font-bold`}>
                          {exercise.sets} � {exercise.reps}
                        </Text>
                      </View>
                      {exercise.weight && (
                        <Text className="text-zinc-400 text-sm mb-1">
                          Peso: {exercise.weight}
                        </Text>
                      )}
                      {exercise.notes && (
                        <Text className="text-zinc-500 text-sm italic">
                          💡 {exercise.notes}
                        </Text>
                      )}
                    </View>
                  ))}
                </View>
              </View>
            ))}

            {/* Start Workout */}
            <TouchableOpacity
              onPress={() => Alert.alert('Workout Iniciado! 💪', 'Calentamiento completado')}
              className="bg-primary rounded-xl p-5 flex-row items-center justify-center mb-6"
            >
              <Ionicons name="play-circle" size={24} color="white" />
              <Text className="text-white font-bold text-xl ml-2">Comenzar Entrenamiento</Text>
            </TouchableOpacity>
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
            Warmup Generator
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          {/* Workout Type */}
          <Text className="text-white font-bold text-lg mb-3">Tipo de Entrenamiento</Text>
          <View className="mb-6">
            {WORKOUT_TYPES.map((type) => (
              <TouchableOpacity
                key={type.value}
                onPress={() => setSelectedType(type.value)}
                className={`mb-3 rounded-xl p-4 ${
                  selectedType === type.value
                    ? `bg-${type.color}-500`
                    : 'bg-zinc-900 border border-zinc-800'
                }`}
              >
                <View className="flex-row items-center">
                  <View className={`w-12 h-12 ${selectedType === type.value ? 'bg-white/20' : `bg-${type.color}-500/10`} rounded-xl items-center justify-center mr-4`}>
                    <Ionicons
                      name={type.icon as any}
                      size={24}
                      color={selectedType === type.value ? 'white' : `#${getColorHex(type.color)}`}
                    />
                  </View>
                  <Text className={`font-bold text-lg ${selectedType === type.value ? 'text-white' : 'text-zinc-300'}`}>
                    {type.label}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Main Lift (Optional) */}
          <Text className="text-white font-bold text-lg mb-2">
            Levantamiento Principal (Opcional)
          </Text>
          <Text className="text-zinc-400 text-sm mb-3">
            Para generar series de aproximaci�n espec�ficas
          </Text>
          <View className="flex-row flex-wrap gap-2 mb-4">
            {MAIN_LIFTS.map((lift) => (
              <TouchableOpacity
                key={lift}
                onPress={() => setSelectedLift(selectedLift === lift ? null : lift)}
                className={`px-4 py-2 rounded-lg ${
                  selectedLift === lift
                    ? 'bg-primary'
                    : 'bg-zinc-900 border border-zinc-800'
                }`}
              >
                <Text className={`font-bold ${selectedLift === lift ? 'text-white' : 'text-zinc-400'}`}>
                  {lift}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Working Weight */}
          {selectedLift && (
            <View className="bg-zinc-900 rounded-xl p-4 mb-6 border border-zinc-800">
              <Text className="text-white font-bold mb-3">Peso de Trabajo</Text>
              <View className="flex-row flex-wrap gap-2">
                {[40, 60, 80, 100, 120, 140].map((weight) => (
                  <TouchableOpacity
                    key={weight}
                    onPress={() => setWorkingWeight(weight)}
                    className={`px-4 py-2 rounded-lg ${
                      workingWeight === weight
                        ? 'bg-primary'
                        : 'bg-zinc-800'
                    }`}
                  >
                    <Text className={`font-bold ${workingWeight === weight ? 'text-white' : 'text-zinc-400'}`}>
                      {weight}kg
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {/* Generate Button */}
          <TouchableOpacity
            onPress={generateWarmup}
            disabled={!selectedType}
            className={`rounded-xl p-5 flex-row items-center justify-center mb-6 ${
              selectedType ? 'bg-primary' : 'bg-zinc-800'
            }`}
          >
            <Ionicons name="flame" size={24} color="white" />
            <Text className="text-white font-bold text-xl ml-2">
              Generar Calentamiento
            </Text>
          </TouchableOpacity>

          {/* Info */}
          <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-6">
            <View className="flex-row items-start">
              <Ionicons name="information-circle" size={20} color="#9D12DE" />
              <View className="flex-1 ml-3">
                <Text className="text-primary/80 font-bold mb-2">
                  Por Qu� Calentar
                </Text>
                <Text className="text-primary/60 text-sm">
                  � Previene lesiones (↓90% riesgo){'\n'}
                  � Mejor rendimiento en el workout{'\n'}
                  � Activa sistema nervioso{'\n'}
                  � Aumenta flujo sangu�neo{'\n'}
                  � Prepara articulaciones y tendones{'\n'}
                  � Tiempo invertido: 10-15 min
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

function getColorHex(color: string): string {
  const colors: { [key: string]: string } = {
    blue: '3B82F6',
    red: 'EF4444',
    purple: 'A855F7',
    primary: '9D12DE',
    amber: 'F59E0B',
  };
  return colors[color] || '3B82F6';
}


