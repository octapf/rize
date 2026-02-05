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

interface WorkoutSession {
  id: string;
  date: string;
  name: string;
  duration: number;
  exercises: number;
  totalVolume: number;
  calories: number;
  intensity: 'low' | 'medium' | 'high';
  muscle_groups: string[];
  notes?: string;
}

interface WeeklyStats {
  week: string;
  workouts: number;
  totalVolume: number;
  totalCalories: number;
  avgDuration: number;
  topMuscleGroups: string[];
}

interface MonthlyTrends {
  month: string;
  workoutsCompleted: number;
  missedWorkouts: number;
  consistency: number;
  volumeIncrease: number;
  prsBroken: number;
}

const WORKOUT_HISTORY: WorkoutSession[] = [
  {
    id: '1',
    date: '2025-01-27T18:00:00',
    name: 'Push Day Heavy',
    duration: 85,
    exercises: 8,
    totalVolume: 8650,
    calories: 420,
    intensity: 'high',
    muscle_groups: ['Pecho', 'Hombros', 'Tríceps'],
    notes: 'Nuevo PR en press banca: 120kg x 3',
  },
  {
    id: '2',
    date: '2025-01-26T17:30:00',
    name: 'Pull Day Volume',
    duration: 78,
    exercises: 7,
    totalVolume: 7240,
    calories: 385,
    intensity: 'medium',
    muscle_groups: ['Espalda', 'Bíceps'],
  },
  {
    id: '3',
    date: '2025-01-25T18:30:00',
    name: 'Leg Day Killer',
    duration: 95,
    exercises: 9,
    totalVolume: 12450,
    calories: 520,
    intensity: 'high',
    muscle_groups: ['Cuádriceps', 'Glúteos', 'Isquiotibiales'],
    notes: 'Sentadilla profunda sintiéndose fuerte',
  },
  {
    id: '4',
    date: '2025-01-24T17:00:00',
    name: 'Upper Hypertrophy',
    duration: 72,
    exercises: 8,
    totalVolume: 6890,
    calories: 360,
    intensity: 'medium',
    muscle_groups: ['Pecho', 'Espalda', 'Hombros'],
  },
  {
    id: '5',
    date: '2025-01-22T18:00:00',
    name: 'Lower Strength',
    duration: 88,
    exercises: 6,
    totalVolume: 10240,
    calories: 465,
    intensity: 'high',
    muscle_groups: ['Cuádriceps', 'Glúteos'],
  },
  {
    id: '6',
    date: '2025-01-21T16:30:00',
    name: 'Push Volume',
    duration: 68,
    exercises: 7,
    totalVolume: 7140,
    calories: 340,
    intensity: 'medium',
    muscle_groups: ['Pecho', 'Tríceps'],
  },
  {
    id: '7',
    date: '2025-01-20T19:00:00',
    name: 'Pull Strength',
    duration: 82,
    exercises: 6,
    totalVolume: 8920,
    calories: 410,
    intensity: 'high',
    muscle_groups: ['Espalda', 'Trapecios'],
    notes: 'Peso muerto 180kg x 1 PR!',
  },
];

const WEEKLY_STATS: WeeklyStats[] = [
  {
    week: 'Semana 4 Enero',
    workouts: 5,
    totalVolume: 43570,
    totalCalories: 2095,
    avgDuration: 81,
    topMuscleGroups: ['Pecho', 'Espalda', 'Cuádriceps'],
  },
  {
    week: 'Semana 3 Enero',
    workouts: 6,
    totalVolume: 48240,
    totalCalories: 2340,
    avgDuration: 76,
    topMuscleGroups: ['Espalda', 'Glúteos', 'Hombros'],
  },
  {
    week: 'Semana 2 Enero',
    workouts: 5,
    totalVolume: 41890,
    totalCalories: 2010,
    avgDuration: 79,
    topMuscleGroups: ['Pecho', 'Cuádriceps', 'Bíceps'],
  },
];

const MONTHLY_TRENDS: MonthlyTrends = {
  month: 'Enero 2025',
  workoutsCompleted: 22,
  missedWorkouts: 2,
  consistency: 91.7,
  volumeIncrease: 12.4,
  prsBroken: 4,
};

export default function WorkoutHistory() {
  const [history] = useState(WORKOUT_HISTORY);
  const [weeklyStats] = useState(WEEKLY_STATS);
  const [monthlyTrends] = useState(MONTHLY_TRENDS);
  const [activeTab, setActiveTab] = useState<'sessions' | 'weekly' | 'monthly'>('sessions');

  const tabs = [
    { id: 'sessions', label: 'Sesiones', icon: 'fitness' },
    { id: 'weekly', label: 'Semanal', icon: 'calendar' },
    { id: 'monthly', label: 'Mensual', icon: 'trending-up' },
  ];

  const viewWorkoutDetails = (workout: WorkoutSession) => {
    Alert.alert(
      workout.name,
      `${workout.exercises} ejercicios • ${workout.duration} min\n${workout.totalVolume.toLocaleString()}kg volumen\n\n${workout.notes || 'Sin notas'}`,
      [{ text: 'OK' }]
    );
  };

  const getIntensityColor = (intensity: string) => {
    switch (intensity) {
      case 'high':
        return 'text-red-400';
      case 'medium':
        return 'text-amber-400';
      case 'low':
        return 'text-primary';
      default:
        return 'text-zinc-400';
    }
  };

  const getIntensityLabel = (intensity: string) => {
    switch (intensity) {
      case 'high':
        return 'ALTA';
      case 'medium':
        return 'MEDIA';
      case 'low':
        return 'BAJA';
      default:
        return intensity;
    }
  };

  const formatDate = (date: string) => {
    const d = new Date(date);
    return d.toLocaleDateString('es-ES', {
      weekday: 'short',
      day: '2-digit',
      month: 'short',
    });
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
            Historial de Workouts
          </Text>
          <TouchableOpacity>
            <Ionicons name="download" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Tabs */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row gap-2">
            {tabs.map((tab) => (
              <TouchableOpacity
                key={tab.id}
                onPress={() => setActiveTab(tab.id as any)}
                className={`flex-row items-center px-4 py-2 rounded-lg ${
                  activeTab === tab.id
                    ? 'bg-primary'
                    : 'bg-zinc-900 border border-zinc-800'
                }`}
              >
                <Ionicons
                  name={tab.icon as any}
                  size={18}
                  color={activeTab === tab.id ? 'white' : '#71717A'}
                />
                <Text
                  className={`ml-2 font-semibold text-sm ${
                    activeTab === tab.id ? 'text-white' : 'text-zinc-400'
                  }`}
                >
                  {tab.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Sessions Tab */}
        {activeTab === 'sessions' && (
          <View className="px-6 pt-6">
            {/* Quick Stats */}
            <View className="bg-zinc-900 rounded-xl p-4 border border-zinc-800 mb-6">
              <View className="flex-row items-center justify-between">
                <View className="flex-1">
                  <Text className="text-zinc-400 text-xs mb-1">ÚLTIMO WORKOUT</Text>
                  <Text className="text-white text-lg font-bold">
                    Hace {Math.floor((Date.now() - new Date(history[0].date).getTime()) / (1000 * 60 * 60))}h
                  </Text>
                </View>
                <View className="flex-1">
                  <Text className="text-zinc-400 text-xs mb-1">ESTA SEMANA</Text>
                  <Text className="text-primary text-lg font-bold">
                    {weeklyStats[0].workouts} workouts
                  </Text>
                </View>
                <View className="flex-1">
                  <Text className="text-zinc-400 text-xs mb-1">TOTAL MES</Text>
                  <Text className="text-amber-400 text-lg font-bold">
                    {monthlyTrends.workoutsCompleted}
                  </Text>
                </View>
              </View>
            </View>

            {/* Workout Sessions */}
            {history.map((workout) => (
              <TouchableOpacity
                key={workout.id}
                onPress={() => viewWorkoutDetails(workout)}
                activeOpacity={0.7}
                className="bg-zinc-900 rounded-xl p-4 mb-4 border border-zinc-800"
              >
                {/* Header */}
                <View className="flex-row items-start justify-between mb-3">
                  <View className="flex-1">
                    <Text className="text-white font-bold text-lg mb-1">
                      {workout.name}
                    </Text>
                    <Text className="text-zinc-400 text-sm">{formatDate(workout.date)}</Text>
                  </View>
                  <View className={`px-3 py-1 rounded-lg ${
                    workout.intensity === 'high'
                      ? 'bg-red-500/10 border border-red-500/30'
                      : workout.intensity === 'medium'
                      ? 'bg-amber-500/10 border border-amber-500/30'
                      : 'bg-primary/10 border border-primary/30'
                  }`}>
                    <Text className={`text-xs font-bold ${getIntensityColor(workout.intensity)}`}>
                      {getIntensityLabel(workout.intensity)}
                    </Text>
                  </View>
                </View>

                {/* Stats Grid */}
                <View className="flex-row gap-2 mb-3">
                  <View className="flex-1 bg-zinc-800 rounded-lg p-2">
                    <View className="flex-row items-center mb-1">
                      <Ionicons name="time" size={14} color="#71717A" />
                      <Text className="text-zinc-400 text-xs ml-1">Duración</Text>
                    </View>
                    <Text className="text-white font-bold">{workout.duration} min</Text>
                  </View>
                  <View className="flex-1 bg-zinc-800 rounded-lg p-2">
                    <View className="flex-row items-center mb-1">
                      <Ionicons name="barbell" size={14} color="#71717A" />
                      <Text className="text-zinc-400 text-xs ml-1">Ejercicios</Text>
                    </View>
                    <Text className="text-white font-bold">{workout.exercises}</Text>
                  </View>
                </View>

                <View className="flex-row gap-2 mb-3">
                  <View className="flex-1 bg-zinc-800 rounded-lg p-2">
                    <View className="flex-row items-center mb-1">
                      <Ionicons name="trending-up" size={14} color="#71717A" />
                      <Text className="text-zinc-400 text-xs ml-1">Volumen</Text>
                    </View>
                    <Text className="text-primary font-bold">
                      {workout.totalVolume.toLocaleString()} kg
                    </Text>
                  </View>
                  <View className="flex-1 bg-zinc-800 rounded-lg p-2">
                    <View className="flex-row items-center mb-1">
                      <Ionicons name="flame" size={14} color="#71717A" />
                      <Text className="text-zinc-400 text-xs ml-1">Calorías</Text>
                    </View>
                    <Text className="text-red-400 font-bold">{workout.calories} kcal</Text>
                  </View>
                </View>

                {/* Muscle Groups */}
                <View className="mb-3">
                  <Text className="text-zinc-400 text-xs mb-2">GRUPOS MUSCULARES</Text>
                  <View className="flex-row flex-wrap gap-2">
                    {workout.muscle_groups.map((muscle, index) => (
                      <View key={index} className="bg-primary/10 rounded-lg px-2 py-1">
                        <Text className="text-primary/80 text-xs">{muscle}</Text>
                      </View>
                    ))}
                  </View>
                </View>

                {/* Notes */}
                {workout.notes && (
                  <View className="bg-amber-500/10 rounded-lg p-2 border border-amber-500/30">
                    <View className="flex-row items-start">
                      <Ionicons name="star" size={14} color="#FFEA00" />
                      <Text className="text-amber-300 text-xs ml-2 flex-1">
                        {workout.notes}
                      </Text>
                    </View>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Weekly Tab */}
        {activeTab === 'weekly' && (
          <View className="px-6 pt-6">
            {weeklyStats.map((week, index) => (
              <View
                key={index}
                className="bg-zinc-900 rounded-xl p-4 mb-4 border border-zinc-800"
              >
                <Text className="text-white font-bold text-xl mb-4">{week.week}</Text>

                {/* Stats Grid */}
                <View className="flex-row gap-2 mb-4">
                  <View className="flex-1 bg-zinc-800 rounded-lg p-3">
                    <Text className="text-zinc-400 text-xs mb-1">WORKOUTS</Text>
                    <Text className="text-white text-2xl font-bold">{week.workouts}</Text>
                  </View>
                  <View className="flex-1 bg-zinc-800 rounded-lg p-3">
                    <Text className="text-zinc-400 text-xs mb-1">AVG DURACIÃ“N</Text>
                    <Text className="text-primary text-2xl font-bold">
                      {week.avgDuration}m
                    </Text>
                  </View>
                </View>

                <View className="flex-row gap-2 mb-4">
                  <View className="flex-1 bg-zinc-800 rounded-lg p-3">
                    <Text className="text-zinc-400 text-xs mb-1">VOLUMEN TOTAL</Text>
                    <Text className="text-amber-400 text-lg font-bold">
                      {(week.totalVolume / 1000).toFixed(1)}k kg
                    </Text>
                  </View>
                  <View className="flex-1 bg-zinc-800 rounded-lg p-3">
                    <Text className="text-zinc-400 text-xs mb-1">CALORÃAS</Text>
                    <Text className="text-red-400 text-lg font-bold">
                      {week.totalCalories}
                    </Text>
                  </View>
                </View>

                {/* Top Muscle Groups */}
                <View>
                  <Text className="text-zinc-400 text-xs mb-2">TOP GRUPOS MUSCULARES</Text>
                  <View className="flex-row flex-wrap gap-2">
                    {week.topMuscleGroups.map((muscle, i) => (
                      <View key={i} className="bg-primary/10 rounded-lg px-3 py-1">
                        <Text className="text-primary text-sm">{muscle}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Monthly Tab */}
        {activeTab === 'monthly' && (
          <View className="px-6 pt-6">
            <View className="bg-zinc-900 rounded-xl p-4 border border-zinc-800 mb-4">
              <Text className="text-white font-bold text-2xl mb-6">
                {monthlyTrends.month}
              </Text>

              {/* Key Metrics */}
              <View className="mb-6">
                <View className="flex-row items-center justify-between mb-4 pb-4 border-b border-zinc-800">
                  <Text className="text-zinc-400">Workouts Completados</Text>
                  <Text className="text-white text-2xl font-bold">
                    {monthlyTrends.workoutsCompleted}
                  </Text>
                </View>

                <View className="flex-row items-center justify-between mb-4 pb-4 border-b border-zinc-800">
                  <Text className="text-zinc-400">Workouts Perdidos</Text>
                  <Text className="text-red-400 text-2xl font-bold">
                    {monthlyTrends.missedWorkouts}
                  </Text>
                </View>

                <View className="flex-row items-center justify-between mb-4 pb-4 border-b border-zinc-800">
                  <View className="flex-1">
                    <Text className="text-zinc-400 mb-2">Consistencia</Text>
                    <View className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                      <View
                        className="h-full bg-primary rounded-full"
                        style={{ width: `${monthlyTrends.consistency}%` }}
                      />
                    </View>
                  </View>
                  <Text className="text-primary text-2xl font-bold ml-4">
                    {monthlyTrends.consistency}%
                  </Text>
                </View>

                <View className="flex-row items-center justify-between mb-4 pb-4 border-b border-zinc-800">
                  <Text className="text-zinc-400">Aumento de Volumen</Text>
                  <View className="flex-row items-center">
                    <Ionicons name="trending-up" size={20} color="#9D12DE" />
                    <Text className="text-primary text-2xl font-bold ml-2">
                      +{monthlyTrends.volumeIncrease}%
                    </Text>
                  </View>
                </View>

                <View className="flex-row items-center justify-between">
                  <Text className="text-zinc-400">PRs Rotos</Text>
                  <View className="flex-row items-center">
                    <Ionicons name="trophy" size={20} color="#FFEA00" />
                    <Text className="text-amber-400 text-2xl font-bold ml-2">
                      {monthlyTrends.prsBroken}
                    </Text>
                  </View>
                </View>
              </View>

              {/* Insights */}
              <View className="bg-primary/10 rounded-lg p-3 border border-primary/30">
                <View className="flex-row items-start">
                  <Ionicons name="checkmark-circle" size={20} color="#9D12DE" />
                  <View className="flex-1 ml-3">
                    <Text className="text-primary font-bold mb-1">
                      Excelente Mes
                    </Text>
                    <Text className="text-primary/80 text-sm">
                      Tu consistencia está por encima del 90%. Sigue así para resultados óptimos.
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Recommendations */}
            <View className="bg-zinc-900 rounded-xl p-4 border border-zinc-800">
              <Text className="text-white font-bold text-lg mb-3">
                Recomendaciones para Febrero
              </Text>
              
              <View className="mb-3">
                <View className="flex-row items-start mb-2">
                  <Ionicons name="arrow-forward" size={16} color="#9D12DE" />
                  <Text className="text-zinc-300 text-sm ml-2 flex-1">
                    Mantén tu consistencia del 91.7% o mejor
                  </Text>
                </View>
                <View className="flex-row items-start mb-2">
                  <Ionicons name="arrow-forward" size={16} color="#9D12DE" />
                  <Text className="text-zinc-300 text-sm ml-2 flex-1">
                    Objetivo: 24 workouts completados (vs 22 este mes)
                  </Text>
                </View>
                <View className="flex-row items-start mb-2">
                  <Ionicons name="arrow-forward" size={16} color="#9D12DE" />
                  <Text className="text-zinc-300 text-sm ml-2 flex-1">
                    Aumenta volumen progresivamente (+5-8%)
                  </Text>
                </View>
                <View className="flex-row items-start">
                  <Ionicons name="arrow-forward" size={16} color="#9D12DE" />
                  <Text className="text-zinc-300 text-sm ml-2 flex-1">
                    Rompe al menos 5 PRs nuevos
                  </Text>
                </View>
              </View>
            </View>
          </View>
        )}

        {/* Info Card */}
        <View className="px-6 pb-6 pt-2">
          <View className="bg-primary/10 rounded-xl p-4 border border-primary/30">
            <View className="flex-row items-start">
              <Ionicons name="analytics" size={20} color="#9D12DE" />
              <View className="flex-1 ml-3">
                <Text className="text-primary/80 font-bold mb-2">
                  Datos = Resultados
                </Text>
                <Text className="text-primary/60 text-sm">
                  Analiza tu historial para identificar patrones y optimizar tu progreso
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}


