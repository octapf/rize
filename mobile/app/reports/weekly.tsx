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

interface DailyReport {
  date: string;
  workouts: number;
  totalVolume: number;
  calories: number;
  sleep: number;
  nutrition: number;
  topExercise: string;
}

interface WeeklyReport {
  weekNumber: number;
  startDate: string;
  endDate: string;
  workoutsCompleted: number;
  workoutsMissed: number;
  totalVolume: number;
  totalCalories: number;
  avgSleep: number;
  consistency: number;
  prs: number;
  topMuscleGroups: string[];
  achievements: string[];
  improvements: {
    metric: string;
    value: number;
    trend: 'up' | 'down' | 'stable';
  }[];
}

const CURRENT_WEEK: WeeklyReport = {
  weekNumber: 4,
  startDate: '2025-01-20',
  endDate: '2025-01-26',
  workoutsCompleted: 6,
  workoutsMissed: 0,
  totalVolume: 48240,
  totalCalories: 2340,
  avgSleep: 7.8,
  consistency: 100,
  prs: 3,
  topMuscleGroups: ['Pecho', 'Espalda', 'Cu·driceps'],
  achievements: ['Racha 7 dÌas', 'Nuevo PR Sentadilla', '25 workouts en Enero'],
  improvements: [
    { metric: 'Volumen Total', value: 12.5, trend: 'up' },
    { metric: 'Fuerza M·xima', value: 8.3, trend: 'up' },
    { metric: 'Consistencia', value: 15, trend: 'up' },
    { metric: 'Grasa Corporal', value: -2.1, trend: 'down' },
  ],
};

const DAILY_BREAKDOWN: DailyReport[] = [
  {
    date: '2025-01-26',
    workouts: 1,
    totalVolume: 8650,
    calories: 420,
    sleep: 8.25,
    nutrition: 92,
    topExercise: 'Sentadilla 160kg PR',
  },
  {
    date: '2025-01-25',
    workouts: 1,
    totalVolume: 7240,
    calories: 385,
    sleep: 7.75,
    nutrition: 88,
    topExercise: 'Peso Muerto 180kg',
  },
  {
    date: '2025-01-24',
    workouts: 1,
    totalVolume: 12450,
    calories: 520,
    sleep: 8.5,
    nutrition: 95,
    topExercise: 'Leg Day Volume',
  },
  {
    date: '2025-01-23',
    workouts: 1,
    totalVolume: 6890,
    calories: 360,
    sleep: 7.5,
    nutrition: 85,
    topExercise: 'Upper Hypertrophy',
  },
  {
    date: '2025-01-22',
    workouts: 1,
    totalVolume: 10240,
    calories: 465,
    sleep: 6.5,
    nutrition: 78,
    topExercise: 'Lower Strength',
  },
  {
    date: '2025-01-21',
    workouts: 1,
    totalVolume: 7140,
    calories: 340,
    sleep: 8.5,
    nutrition: 90,
    topExercise: 'Push Volume',
  },
  {
    date: '2025-01-20',
    workouts: 0,
    totalVolume: 0,
    calories: 0,
    sleep: 9.0,
    nutrition: 82,
    topExercise: 'Rest Day',
  },
];

export default function WeeklyReports() {
  const [currentWeek] = useState(CURRENT_WEEK);
  const [dailyBreakdown] = useState(DAILY_BREAKDOWN);

  const shareReport = () => {
    Alert.alert(
      'Compartir Reporte',
      `Semana ${currentWeek.weekNumber}: ${currentWeek.workoutsCompleted} workouts, ${currentWeek.consistency}% consistencia`,
      [
        { text: 'Instagram Stories' },
        { text: 'WhatsApp' },
        { text: 'Twitter' },
        { text: 'Cancelar', style: 'cancel' },
      ]
    );
  };

  const downloadPDF = () => {
    Alert.alert('Exportar PDF', 'Generando reporte completo...', [
      { text: 'OK', onPress: () => Alert.alert('PDF guardado en Descargas') },
    ]);
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return 'trending-up';
      case 'down':
        return 'trending-down';
      default:
        return 'remove';
    }
  };

  const getTrendColor = (trend: string, isNegativeGood: boolean = false) => {
    if (trend === 'stable') return 'text-zinc-400';
    if ((trend === 'up' && !isNegativeGood) || (trend === 'down' && isNegativeGood)) {
      return 'text-primary';
    }
    return 'text-red-400';
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
            Reporte Semanal
          </Text>
          <TouchableOpacity onPress={downloadPDF}>
            <Ionicons name="download" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Week Info */}
        <View className="bg-zinc-900 rounded-xl p-4 border border-zinc-800">
          <View className="flex-row items-center justify-between mb-2">
            <Text className="text-white font-bold text-xl">
              Semana {currentWeek.weekNumber}
            </Text>
            <View className={`px-3 py-1 rounded-lg ${
              currentWeek.consistency >= 90
                ? 'bg-primary/10 border border-primary/30'
                : 'bg-amber-500/10 border border-amber-500/30'
            }`}>
              <Text className={`text-xs font-bold ${
                currentWeek.consistency >= 90 ? 'text-primary' : 'text-amber-400'
              }`}>
                {currentWeek.consistency}% CONSISTENCIA
              </Text>
            </View>
          </View>
          <Text className="text-zinc-400 text-sm">
            {new Date(currentWeek.startDate).toLocaleDateString('es-ES', {
              day: '2-digit',
              month: 'short',
            })}{' '}
            -{' '}
            {new Date(currentWeek.endDate).toLocaleDateString('es-ES', {
              day: '2-digit',
              month: 'short',
            })}
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Quick Stats */}
        <View className="px-6 pt-6">
          <Text className="text-white font-bold text-lg mb-3">Resumen</Text>
          
          <View className="flex-row gap-3 mb-4">
            <View className="flex-1 bg-zinc-900 rounded-xl p-3 border border-zinc-800">
              <Text className="text-zinc-400 text-xs mb-1">WORKOUTS</Text>
              <Text className="text-white text-2xl font-bold">
                {currentWeek.workoutsCompleted}
              </Text>
              <Text className="text-primary text-xs">
                {currentWeek.workoutsMissed} perdidos
              </Text>
            </View>
            <View className="flex-1 bg-zinc-900 rounded-xl p-3 border border-zinc-800">
              <Text className="text-zinc-400 text-xs mb-1">VOLUMEN</Text>
              <Text className="text-primary text-2xl font-bold">
                {(currentWeek.totalVolume / 1000).toFixed(1)}k
              </Text>
              <Text className="text-zinc-400 text-xs">kg levantados</Text>
            </View>
          </View>

          <View className="flex-row gap-3 mb-6">
            <View className="flex-1 bg-zinc-900 rounded-xl p-3 border border-zinc-800">
              <Text className="text-zinc-400 text-xs mb-1">CALOR√çAS</Text>
              <Text className="text-red-400 text-2xl font-bold">
                {currentWeek.totalCalories}
              </Text>
              <Text className="text-zinc-400 text-xs">quemadas</Text>
            </View>
            <View className="flex-1 bg-zinc-900 rounded-xl p-3 border border-zinc-800">
              <Text className="text-zinc-400 text-xs mb-1">SUE√ëO AVG</Text>
              <Text className="text-primary/80 text-2xl font-bold">
                {currentWeek.avgSleep}h
              </Text>
              <Text className="text-zinc-400 text-xs">por noche</Text>
            </View>
          </View>

          {/* Improvements */}
          <Text className="text-white font-bold text-lg mb-3">Mejoras</Text>
          <View className="bg-zinc-900 rounded-xl p-4 border border-zinc-800 mb-6">
            {currentWeek.improvements.map((improvement, index) => (
              <View
                key={index}
                className={`flex-row items-center justify-between py-3 ${
                  index < currentWeek.improvements.length - 1 ? 'border-b border-zinc-800' : ''
                }`}
              >
                <Text className="text-white flex-1">{improvement.metric}</Text>
                <View className="flex-row items-center">
                  <Ionicons
                    name={getTrendIcon(improvement.trend) as any}
                    size={20}
                    color={
                      improvement.value < 0
                        ? '#9D12DE'
                        : improvement.value > 0
                        ? '#9D12DE'
                        : '#71717A'
                    }
                  />
                  <Text
                    className={`ml-2 font-bold text-lg ${
                      improvement.value < 0 && improvement.metric === 'Grasa Corporal'
                        ? 'text-primary'
                        : improvement.value > 0
                        ? 'text-primary'
                        : 'text-zinc-400'
                    }`}
                  >
                    {improvement.value > 0 ? '+' : ''}
                    {improvement.value}%
                  </Text>
                </View>
              </View>
            ))}
          </View>

          {/* Achievements */}
          <Text className="text-white font-bold text-lg mb-3">Logros Desbloqueados</Text>
          <View className="bg-zinc-900 rounded-xl p-4 border border-zinc-800 mb-6">
            {currentWeek.achievements.map((achievement, index) => (
              <View key={index} className="flex-row items-center mb-3 last:mb-0">
                <View className="w-10 h-10 bg-amber-500/20 rounded-full items-center justify-center mr-3">
                  <Ionicons name="trophy" size={20} color="#FFEA00" />
                </View>
                <Text className="text-white flex-1">{achievement}</Text>
                <Ionicons name="checkmark-circle" size={24} color="#9D12DE" />
              </View>
            ))}
          </View>

          {/* Top Muscle Groups */}
          <Text className="text-white font-bold text-lg mb-3">Top Grupos Musculares</Text>
          <View className="bg-zinc-900 rounded-xl p-4 border border-zinc-800 mb-6">
            <View className="flex-row flex-wrap gap-2">
              {currentWeek.topMuscleGroups.map((muscle, index) => (
                <View
                  key={index}
                  className="bg-primary/10 rounded-lg px-4 py-2 border border-primary/30"
                >
                  <Text className="text-primary font-bold">{muscle}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* PRs Broken */}
          {currentWeek.prs > 0 && (
            <>
              <Text className="text-white font-bold text-lg mb-3">
                RÈcords Personales
              </Text>
              <View className="bg-zinc-900 rounded-xl p-4 border border-zinc-800 mb-6">
                <View className="flex-row items-center">
                  <View className="w-16 h-16 bg-amber-500/20 rounded-full items-center justify-center mr-4">
                    <Text className="text-amber-400 text-3xl font-bold">
                      {currentWeek.prs}
                    </Text>
                  </View>
                  <View className="flex-1">
                    <Text className="text-white font-bold text-lg mb-1">
                      °PRs Rotos Esta Semana!
                    </Text>
                    <Text className="text-zinc-400 text-sm">
                      Sigue super·ndote cada dÌa
                    </Text>
                  </View>
                </View>
              </View>
            </>
          )}

          {/* Daily Breakdown */}
          <Text className="text-white font-bold text-lg mb-3">Desglose Diario</Text>
          {dailyBreakdown.map((day, index) => (
            <View
              key={index}
              className="bg-zinc-900 rounded-xl p-4 mb-3 border border-zinc-800"
            >
              <View className="flex-row items-center justify-between mb-3">
                <Text className="text-white font-bold">
                  {new Date(day.date).toLocaleDateString('es-ES', {
                    weekday: 'short',
                    day: '2-digit',
                    month: 'short',
                  })}
                </Text>
                {day.workouts > 0 ? (
                  <View className="bg-primary/10 rounded-lg px-2 py-1">
                    <Text className="text-primary text-xs font-bold">
                      ENTRENADO
                    </Text>
                  </View>
                ) : (
                  <View className="bg-primary/10 rounded-lg px-2 py-1">
                    <Text className="text-primary/80 text-xs font-bold">DESCANSO</Text>
                  </View>
                )}
              </View>

              {day.workouts > 0 ? (
                <>
                  <View className="flex-row gap-2 mb-2">
                    <View className="flex-1 bg-zinc-800 rounded-lg p-2">
                      <Text className="text-zinc-400 text-xs">Volumen</Text>
                      <Text className="text-white font-bold">
                        {day.totalVolume.toLocaleString()} kg
                      </Text>
                    </View>
                    <View className="flex-1 bg-zinc-800 rounded-lg p-2">
                      <Text className="text-zinc-400 text-xs">CalorÌas</Text>
                      <Text className="text-red-400 font-bold">{day.calories}</Text>
                    </View>
                  </View>
                  <View className="bg-zinc-800 rounded-lg p-2 mb-2">
                    <Text className="text-zinc-400 text-xs mb-1">Top Ejercicio</Text>
                    <Text className="text-primary font-bold">{day.topExercise}</Text>
                  </View>
                </>
              ) : null}

              <View className="flex-row gap-2">
                <View className="flex-1 bg-zinc-800 rounded-lg p-2">
                  <Text className="text-zinc-400 text-xs">SueÒo</Text>
                  <Text className="text-primary/80 font-bold">{day.sleep}h</Text>
                </View>
                <View className="flex-1 bg-zinc-800 rounded-lg p-2">
                  <Text className="text-zinc-400 text-xs">NutriciÛn</Text>
                  <Text className="text-primary font-bold">{day.nutrition}%</Text>
                </View>
              </View>
            </View>
          ))}

          {/* Share Report */}
          <TouchableOpacity
            onPress={shareReport}
            className="bg-primary rounded-xl p-4 mb-4 flex-row items-center justify-center"
          >
            <Ionicons name="share-social" size={20} color="white" />
            <Text className="text-white font-bold ml-2">Compartir Reporte</Text>
          </TouchableOpacity>
        </View>

        {/* Info Card */}
        <View className="px-6 pb-6 pt-2">
          <View className="bg-primary/10 rounded-xl p-4 border border-primary/30">
            <View className="flex-row items-start">
              <Ionicons name="analytics" size={20} color="#9D12DE" />
              <View className="flex-1 ml-3">
                <Text className="text-primary/80 font-bold mb-2">
                  Reflexiona y Mejora
                </Text>
                <Text className="text-primary/60 text-sm">
                  Revisa tu semana cada domingo para identificar oportunidades de mejora
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

