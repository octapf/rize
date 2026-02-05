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

interface Workout {
  id: string;
  name: string;
  type: string;
  duration: number;
  exercises: number;
  volume: number;
  rating?: number;
}

interface ComparisonMetric {
  label: string;
  workoutA: number | string;
  workoutB: number | string;
  unit: string;
  better: 'A' | 'B' | 'equal';
  icon: string;
  color: string;
}

const MOCK_WORKOUTS: Workout[] = [
  {
    id: '1',
    name: 'Push Day A - Semana 12',
    type: 'Push',
    duration: 75,
    exercises: 6,
    volume: 8500,
    rating: 9,
  },
  {
    id: '2',
    name: 'Push Day A - Semana 8',
    type: 'Push',
    duration: 70,
    exercises: 6,
    volume: 7800,
    rating: 8,
  },
  {
    id: '3',
    name: 'Pull Day B - Semana 12',
    type: 'Pull',
    duration: 80,
    exercises: 7,
    volume: 9200,
    rating: 9,
  },
  {
    id: '4',
    name: 'Pull Day B - Semana 9',
    type: 'Pull',
    duration: 75,
    exercises: 7,
    volume: 8600,
    rating: 8,
  },
];

export default function WorkoutComparison() {
  const [workoutA, setWorkoutA] = useState<Workout | null>(null);
  const [workoutB, setWorkoutB] = useState<Workout | null>(null);
  const [showComparison, setShowComparison] = useState(false);

  const selectWorkout = (workout: Workout, slot: 'A' | 'B') => {
    if (slot === 'A') {
      setWorkoutA(workout);
    } else {
      setWorkoutB(workout);
    }
  };

  const compareWorkouts = () => {
    if (!workoutA || !workoutB) {
      Alert.alert('Error', 'Selecciona dos workouts para comparar');
      return;
    }
    setShowComparison(true);
  };

  const getComparisons = (): ComparisonMetric[] => {
    if (!workoutA || !workoutB) return [];

    return [
      {
        label: 'Volumen Total',
        workoutA: workoutA.volume,
        workoutB: workoutB.volume,
        unit: 'kg',
        better: workoutA.volume > workoutB.volume ? 'A' : workoutA.volume < workoutB.volume ? 'B' : 'equal',
        icon: 'barbell',
        color: 'blue',
      },
      {
        label: 'Duración',
        workoutA: workoutA.duration,
        workoutB: workoutB.duration,
        unit: 'min',
        better: workoutA.duration < workoutB.duration ? 'A' : workoutA.duration > workoutB.duration ? 'B' : 'equal',
        icon: 'time',
        color: 'purple',
      },
      {
        label: 'Ejercicios',
        workoutA: workoutA.exercises,
        workoutB: workoutB.exercises,
        unit: '',
        better: 'equal',
        icon: 'list',
        color: 'emerald',
      },
      {
        label: 'Rating',
        workoutA: workoutA.rating || 0,
        workoutB: workoutB.rating || 0,
        unit: '/10',
        better: (workoutA.rating || 0) > (workoutB.rating || 0) ? 'A' : (workoutA.rating || 0) < (workoutB.rating || 0) ? 'B' : 'equal',
        icon: 'star',
        color: 'amber',
      },
      {
        label: 'Volumen/Min',
        workoutA: Math.round(workoutA.volume / workoutA.duration),
        workoutB: Math.round(workoutB.volume / workoutB.duration),
        unit: 'kg/min',
        better: (workoutA.volume / workoutA.duration) > (workoutB.volume / workoutB.duration) ? 'A' : (workoutA.volume / workoutA.duration) < (workoutB.volume / workoutB.duration) ? 'B' : 'equal',
        icon: 'speedometer',
        color: 'red',
      },
    ];
  };

  const reset = () => {
    setWorkoutA(null);
    setWorkoutB(null);
    setShowComparison(false);
  };

  if (showComparison && workoutA && workoutB) {
    const comparisons = getComparisons();
    const workoutAWins = comparisons.filter((c) => c.better === 'A').length;
    const workoutBWins = comparisons.filter((c) => c.better === 'B').length;

    return (
      <View className="flex-1 bg-zinc-950">
        {/* Header */}
        <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
          <View className="flex-row items-center mb-4">
            <TouchableOpacity onPress={reset}>
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <Text className="text-white text-2xl font-bold flex-1 ml-3">
              Comparación
            </Text>
            <TouchableOpacity onPress={() => Alert.alert('Guardado', 'Comparación guardada')}>
              <Ionicons name="bookmark" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          <View className="px-6 pt-6">
            {/* Winner */}
            <View className="bg-gradient-to-r from-primary to-[#7D0EBE] rounded-xl p-6 mb-6">
              <Text className="text-white opacity-90 text-sm mb-2">Mejor Workout</Text>
              <Text className="text-white text-3xl font-bold mb-4">
                {workoutAWins > workoutBWins ? workoutA.name : workoutBWins > workoutAWins ? workoutB.name : 'Empate'}
              </Text>
              <View className="flex-row gap-4">
                <View className="flex-1 bg-white/20 rounded-lg p-3">
                  <Text className="text-white opacity-90 text-xs mb-1">Workout A</Text>
                  <Text className="text-white font-bold text-2xl">{workoutAWins}</Text>
                  <Text className="text-white opacity-90 text-xs">ventajas</Text>
                </View>
                <View className="flex-1 bg-white/20 rounded-lg p-3">
                  <Text className="text-white opacity-90 text-xs mb-1">Workout B</Text>
                  <Text className="text-white font-bold text-2xl">{workoutBWins}</Text>
                  <Text className="text-white opacity-90 text-xs">ventajas</Text>
                </View>
              </View>
            </View>

            {/* Workouts Info */}
            <View className="flex-row gap-3 mb-6">
              <View className="flex-1 bg-primary/10 rounded-xl p-4 border border-primary/30">
                <Text className="text-primary/80 font-bold text-sm mb-2">Workout A</Text>
                <Text className="text-white font-bold mb-1">{workoutA.name}</Text>
                <Text className="text-primary/60 text-xs">{workoutA.type}</Text>
              </View>
              <View className="flex-1 bg-purple-500/10 rounded-xl p-4 border border-purple-500/30">
                <Text className="text-purple-400 font-bold text-sm mb-2">Workout B</Text>
                <Text className="text-white font-bold mb-1">{workoutB.name}</Text>
                <Text className="text-purple-300 text-xs">{workoutB.type}</Text>
              </View>
            </View>

            {/* Comparisons */}
            <Text className="text-white font-bold text-lg mb-4">Métricas</Text>
            {comparisons.map((comparison, index) => (
              <View key={index} className="bg-zinc-900 rounded-xl p-4 mb-3 border border-zinc-800">
                <View className="flex-row items-center mb-3">
                  <View className={`w-10 h-10 bg-${comparison.color}-500 rounded-xl items-center justify-center mr-3`}>
                    <Ionicons name={comparison.icon as any} size={20} color="white" />
                  </View>
                  <Text className="text-white font-bold text-lg flex-1">{comparison.label}</Text>
                </View>

                <View className="flex-row gap-3">
                  <View className={`flex-1 rounded-lg p-3 ${comparison.better === 'A' ? 'bg-primary/20 border-2 border-primary' : 'bg-zinc-800'}`}>
                    <Text className={`text-xs mb-1 ${comparison.better === 'A' ? 'text-primary' : 'text-zinc-400'}`}>
                      Workout A
                    </Text>
                    <Text className={`font-bold text-2xl ${comparison.better === 'A' ? 'text-primary' : 'text-white'}`}>
                      {comparison.workoutA}
                      <Text className="text-sm"> {comparison.unit}</Text>
                    </Text>
                    {comparison.better === 'A' && (
                      <View className="flex-row items-center mt-1">
                        <Ionicons name="checkmark-circle" size={16} color="#9D12DE" />
                        <Text className="text-primary text-xs ml-1 font-bold">Mejor</Text>
                      </View>
                    )}
                  </View>

                  <View className={`flex-1 rounded-lg p-3 ${comparison.better === 'B' ? 'bg-primary/20 border-2 border-primary' : 'bg-zinc-800'}`}>
                    <Text className={`text-xs mb-1 ${comparison.better === 'B' ? 'text-primary' : 'text-zinc-400'}`}>
                      Workout B
                    </Text>
                    <Text className={`font-bold text-2xl ${comparison.better === 'B' ? 'text-primary' : 'text-white'}`}>
                      {comparison.workoutB}
                      <Text className="text-sm"> {comparison.unit}</Text>
                    </Text>
                    {comparison.better === 'B' && (
                      <View className="flex-row items-center mt-1">
                        <Ionicons name="checkmark-circle" size={16} color="#9D12DE" />
                        <Text className="text-primary text-xs ml-1 font-bold">Mejor</Text>
                      </View>
                    )}
                  </View>
                </View>

                {/* Difference */}
                {comparison.better !== 'equal' && (
                  <View className="mt-3 bg-zinc-800 rounded-lg p-2">
                    <Text className="text-zinc-400 text-xs text-center">
                      Diferencia: {Math.abs(Number(comparison.workoutA) - Number(comparison.workoutB)).toFixed(0)} {comparison.unit}
                    </Text>
                  </View>
                )}
              </View>
            ))}

            {/* Insights */}
            <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-6">
              <View className="flex-row items-start">
                <Ionicons name="bulb" size={20} color="#9D12DE" />
                <View className="flex-1 ml-3">
                  <Text className="text-primary/80 font-bold mb-2">Insights</Text>
                  <Text className="text-primary/60 text-sm">
                    {workoutAWins > workoutBWins
                      ? `${workoutA.name} tuvo mejor rendimiento general. Considera qué factores contribuyeron (sueño, nutrición, descanso).`
                      : workoutBWins > workoutAWins
                      ? `${workoutB.name} fue superior. Analiza qué cambió entre sesiones para replicar el éxito.`
                      : 'Workouts muy parejos. Mantén la consistencia y progresa gradualmente.'}
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
            Workout Comparison
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          {/* Selection Status */}
          <View className="flex-row gap-3 mb-6">
            <View className={`flex-1 rounded-xl p-4 ${workoutA ? 'bg-primary' : 'bg-zinc-900 border border-zinc-800'}`}>
              <Text className={`font-bold mb-1 ${workoutA ? 'text-white' : 'text-zinc-400'}`}>
                Workout A
              </Text>
              <Text className={`text-sm ${workoutA ? 'text-white opacity-90' : 'text-zinc-500'}`}>
                {workoutA ? workoutA.name : 'Selecciona...'}
              </Text>
            </View>
            <View className={`flex-1 rounded-xl p-4 ${workoutB ? 'bg-purple-500' : 'bg-zinc-900 border border-zinc-800'}`}>
              <Text className={`font-bold mb-1 ${workoutB ? 'text-white' : 'text-zinc-400'}`}>
                Workout B
              </Text>
              <Text className={`text-sm ${workoutB ? 'text-white opacity-90' : 'text-zinc-500'}`}>
                {workoutB ? workoutB.name : 'Selecciona...'}
              </Text>
            </View>
          </View>

          {/* Workout Selection */}
          <Text className="text-white font-bold text-lg mb-3">
            {!workoutA ? 'Selecciona Workout A' : !workoutB ? 'Selecciona Workout B' : 'Workouts Listos'}
          </Text>

          {MOCK_WORKOUTS.map((workout) => (
            <TouchableOpacity
              key={workout.id}
              onPress={() => {
                if (!workoutA) {
                  selectWorkout(workout, 'A');
                } else if (!workoutB && workout.id !== workoutA.id) {
                  selectWorkout(workout, 'B');
                } else if (workoutA && workoutB) {
                  Alert.alert('Info', 'Ya seleccionaste ambos workouts. Compáralos o resetea.');
                }
              }}
              disabled={workoutA?.id === workout.id || workoutB?.id === workout.id}
              className={`mb-3 rounded-xl p-4 ${
                workoutA?.id === workout.id
                  ? 'bg-primary/20 border-2 border-primary'
                  : workoutB?.id === workout.id
                  ? 'bg-purple-500/20 border-2 border-purple-500'
                  : 'bg-zinc-900 border border-zinc-800'
              }`}
            >
              <View className="flex-row items-center justify-between mb-2">
                <Text className="text-white font-bold text-lg flex-1">{workout.name}</Text>
                {(workoutA?.id === workout.id || workoutB?.id === workout.id) && (
                  <Ionicons name="checkmark-circle" size={24} color={workoutA?.id === workout.id ? '#9D12DE' : '#A855F7'} />
                )}
              </View>

              <View className="flex-row flex-wrap gap-2">
                <View className="bg-zinc-800 rounded px-2 py-1">
                  <Text className="text-zinc-400 text-xs">{workout.type}</Text>
                </View>
                <View className="bg-zinc-800 rounded px-2 py-1">
                  <Text className="text-zinc-400 text-xs">{workout.duration} min</Text>
                </View>
                <View className="bg-zinc-800 rounded px-2 py-1">
                  <Text className="text-zinc-400 text-xs">{workout.volume} kg</Text>
                </View>
                {workout.rating && (
                  <View className="bg-amber-500/10 rounded px-2 py-1 border border-amber-500/30">
                    <Text className="text-amber-400 text-xs font-bold">â­ {workout.rating}/10</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          ))}

          {/* Compare Button */}
          {workoutA && workoutB && (
            <TouchableOpacity
              onPress={compareWorkouts}
              className="bg-primary rounded-xl p-5 flex-row items-center justify-center mb-4"
            >
              <Ionicons name="git-compare" size={24} color="white" />
              <Text className="text-white font-bold text-xl ml-2">Comparar Workouts</Text>
            </TouchableOpacity>
          )}

          {/* Reset Button */}
          {(workoutA || workoutB) && (
            <TouchableOpacity
              onPress={reset}
              className="bg-zinc-900 rounded-xl p-4 flex-row items-center justify-center mb-6 border border-zinc-800"
            >
              <Ionicons name="refresh" size={20} color="white" />
              <Text className="text-white font-bold ml-2">Resetear Selección</Text>
            </TouchableOpacity>
          )}

          {/* Info */}
          <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-6">
            <View className="flex-row items-start">
              <Ionicons name="information-circle" size={20} color="#9D12DE" />
              <View className="flex-1 ml-3">
                <Text className="text-primary/80 font-bold mb-2">
                  Por Qué Comparar
                </Text>
                <Text className="text-primary/60 text-sm">
                  • Identifica qué workouts son más efectivos{'\n'}
                  • Analiza progreso entre sesiones{'\n'}
                  • Optimiza volumen y duración{'\n'}
                  • Replica sesiones exitosas{'\n'}
                  • Toma decisiones basadas en data
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

