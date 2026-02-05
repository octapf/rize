import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useQuery } from '@tanstack/react-query';
import { exercisesApi } from '@/services/api/exercises.api';
import { workoutsApi } from '@/services/api/workouts.api';
import { Card } from '@/components/ui/Card';
import { LineChart } from 'react-native-chart-kit';
import { format, subDays } from 'date-fns';
import { es } from 'date-fns/locale';

const screenWidth = Dimensions.get('window').width;

type TimeRange = '30d' | '90d' | '6m' | 'year' | 'all';

export default function ExerciseProgressScreen() {
  const { exerciseId } = useLocalSearchParams();
  const [timeRange, setTimeRange] = useState<TimeRange>('90d');

  const { data: exerciseData, isLoading: exerciseLoading } = useQuery({
    queryKey: ['exercise', exerciseId],
    queryFn: () => exercisesApi.getExerciseById(exerciseId as string),
  });

  const { data: workoutsData, isLoading: workoutsLoading } = useQuery({
    queryKey: ['workouts-all'],
    queryFn: () => workoutsApi.getUserWorkouts(),
  });

  const exercise = exerciseData?.data;
  const workouts = workoutsData?.data.workouts || [];

  // Calculate date range
  const getDaysBack = () => {
    switch (timeRange) {
      case '30d': return 30;
      case '90d': return 90;
      case '6m': return 180;
      case 'year': return 365;
      case 'all': return 36500; // 100 years
      default: return 90;
    }
  };

  const daysBack = getDaysBack();
  const startDate = subDays(new Date(), daysBack);

  // Filter workouts that contain this exercise
  const exerciseHistory = workouts
    .filter((w: any) => w.completedAt && new Date(w.completedAt) >= startDate)
    .map((w: any) => {
      const ex = w.exercises.find((e: any) => e.exercise._id === exerciseId);
      if (!ex) return null;

      const completedSets = ex.sets.filter((s: any) => s.completed);
      if (completedSets.length === 0) return null;

      // Calculate max weight, max reps, and total volume
      const maxWeight = Math.max(...completedSets.map((s: any) => s.weight || 0));
      const maxReps = Math.max(...completedSets.map((s: any) => s.reps || 0));
      const totalVolume = completedSets.reduce(
        (sum: number, s: any) => sum + (s.weight || 0) * (s.reps || 0),
        0
      );
      const oneRepMax = Math.max(
        ...completedSets.map((s: any) => {
          if (!s.weight || !s.reps) return 0;
          // Epley formula: 1RM = w(1 + r/30)
          return s.weight * (1 + s.reps / 30);
        })
      );

      return {
        date: new Date(w.completedAt),
        maxWeight,
        maxReps,
        totalVolume,
        oneRepMax,
        sets: completedSets,
        workoutName: w.name,
      };
    })
    .filter((h: any) => h !== null)
    .sort((a: any, b: any) => a.date.getTime() - b.date.getTime());

  // Prepare chart data
  const prepareChartData = (metric: 'maxWeight' | 'totalVolume' | 'oneRepMax') => {
    if (exerciseHistory.length === 0) {
      return { labels: [''], data: [0] };
    }

    const maxPoints = 10;
    const step = Math.max(1, Math.floor(exerciseHistory.length / maxPoints));
    
    const labels: string[] = [];
    const data: number[] = [];

    for (let i = 0; i < exerciseHistory.length; i += step) {
      const point = exerciseHistory[i];
      labels.push(format(point.date, 'dd MMM', { locale: es }));
      data.push(Math.round(point[metric]));
    }

    return { labels, data };
  };

  const maxWeightData = prepareChartData('maxWeight');
  const volumeData = prepareChartData('totalVolume');
  const oneRepMaxData = prepareChartData('oneRepMax');

  // Calculate stats
  const currentMax = exerciseHistory.length > 0 
    ? exerciseHistory[exerciseHistory.length - 1].maxWeight 
    : 0;
  const allTimeMax = Math.max(...exerciseHistory.map((h: any) => h.maxWeight), 0);
  const totalSessions = exerciseHistory.length;
  const totalVolume = exerciseHistory.reduce((sum: number, h: any) => sum + h.totalVolume, 0);
  const avgVolume = totalSessions > 0 ? totalVolume / totalSessions : 0;
  const current1RM = exerciseHistory.length > 0
    ? exerciseHistory[exerciseHistory.length - 1].oneRepMax
    : 0;

  const timeRanges = [
    { id: '30d' as const, label: '30d' },
    { id: '90d' as const, label: '90d' },
    { id: '6m' as const, label: '6m' },
    { id: 'year' as const, label: '1 año' },
    { id: 'all' as const, label: 'Todo' },
  ];

  const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(16, 185, 129, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(107, 114, 128, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '4',
      strokeWidth: '2',
      stroke: '#10B981',
    },
  };

  if (exerciseLoading || workoutsLoading) {
    return (
      <View className="flex-1 bg-gray-50 items-center justify-center">
        <ActivityIndicator size="large" color="#10B981" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <LinearGradient colors={['#10B981', '#059669']} className="px-6 pt-12 pb-6">
        <View className="flex-row items-center justify-between mb-4">
          <TouchableOpacity onPress={() => router.back()} className="p-2">
            <Ionicons name="arrow-back" size={28} color="white" />
          </TouchableOpacity>
          <Text className="text-xl font-bold text-white flex-1 text-center">
            {exercise?.name}
          </Text>
          <View className="w-10" />
        </View>

        {/* Quick Stats */}
        <View className="flex-row gap-3">
          <Card className="flex-1 p-3 bg-white/20 border-0">
            <Text className="text-white/80 text-xs mb-1">Peso Actual</Text>
            <Text className="text-white text-2xl font-bold">
              {currentMax} kg
            </Text>
          </Card>
          <Card className="flex-1 p-3 bg-white/20 border-0">
            <Text className="text-white/80 text-xs mb-1">1RM Est.</Text>
            <Text className="text-white text-2xl font-bold">
              {Math.round(current1RM)} kg
            </Text>
          </Card>
        </View>
      </LinearGradient>

      <ScrollView className="flex-1" contentContainerClassName="p-6 gap-6">
        {/* Time Range Filter */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="gap-2 -mx-6 px-6">
          {timeRanges.map((range) => (
            <TouchableOpacity
              key={range.id}
              onPress={() => setTimeRange(range.id)}
              className={`px-4 py-2 rounded-full ${
                timeRange === range.id
                  ? 'bg-emerald-500'
                  : 'bg-white border border-gray-200'
              }`}
            >
              <Text
                className={`font-semibold ${
                  timeRange === range.id ? 'text-white' : 'text-gray-700'
                }`}
              >
                {range.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Stats Cards */}
        <View className="flex-row gap-3">
          <Card className="flex-1 p-4">
            <View className="items-center">
              <Ionicons name="trending-up" size={24} color="#10B981" />
              <Text className="text-gray-600 text-xs mt-2">Máximo</Text>
              <Text className="text-gray-900 text-xl font-bold mt-1">
                {allTimeMax} kg
              </Text>
            </View>
          </Card>
          <Card className="flex-1 p-4">
            <View className="items-center">
              <Ionicons name="calendar" size={24} color="#3B82F6" />
              <Text className="text-gray-600 text-xs mt-2">Sesiones</Text>
              <Text className="text-gray-900 text-xl font-bold mt-1">
                {totalSessions}
              </Text>
            </View>
          </Card>
        </View>

        {/* Max Weight Progress Chart */}
        <Card className="p-4">
          <View className="flex-row items-center gap-2 mb-4">
            <Ionicons name="barbell" size={24} color="#10B981" />
            <Text className="text-lg font-bold text-gray-900">
              Progreso de Peso Máximo
            </Text>
          </View>

          {exerciseHistory.length === 0 ? (
            <View className="py-8 items-center">
              <Text className="text-gray-400">No hay datos en este período</Text>
            </View>
          ) : (
            <LineChart
              data={{
                labels: maxWeightData.labels,
                datasets: [{ data: maxWeightData.data.map(d => d || 0.1) }],
              }}
              width={screenWidth - 80}
              height={220}
              chartConfig={chartConfig}
              bezier
              style={{ marginLeft: -16 }}
            />
          )}
        </Card>

        {/* Volume Chart */}
        <Card className="p-4">
          <View className="flex-row items-center gap-2 mb-4">
            <Ionicons name="stats-chart" size={24} color="#8B5CF6" />
            <Text className="text-lg font-bold text-gray-900">
              Volumen por Sesión (kg)
            </Text>
          </View>

          {exerciseHistory.length === 0 ? (
            <View className="py-8 items-center">
              <Text className="text-gray-400">No hay datos en este período</Text>
            </View>
          ) : (
            <LineChart
              data={{
                labels: volumeData.labels,
                datasets: [{ data: volumeData.data.map(d => d || 0.1) }],
              }}
              width={screenWidth - 80}
              height={220}
              chartConfig={{
                ...chartConfig,
                color: (opacity = 1) => `rgba(139, 92, 246, ${opacity})`,
                propsForDots: {
                  r: '4',
                  strokeWidth: '2',
                   stroke: '#9D12DE',
                },
              }}
              bezier
              style={{ marginLeft: -16 }}
            />
          )}
        </Card>

        {/* 1RM Estimation Chart */}
        <Card className="p-4">
          <View className="flex-row items-center gap-2 mb-4">
            <Ionicons name="trophy" size={24} color="#F59E0B" />
            <Text className="text-lg font-bold text-gray-900">
              Estimación 1RM
            </Text>
            <Ionicons name="trending-up" size={24} color="#FFEA00" />
          </View>

          {exerciseHistory.length === 0 ? (
            <View className="py-8 items-center">
              <Ionicons name="barbell" size={24} color="#9D12DE" />
              <Text className="text-gray-400">No hay datos en este período</Text>
            </View>
          ) : (
            <LineChart
              data={{
                labels: oneRepMaxData.labels,
                datasets: [{ data: oneRepMaxData.data.map(d => d || 0.1) }],
              }}
              width={screenWidth - 80}
              height={220}
              chartConfig={{
                ...chartConfig,
                color: (opacity = 1) => `rgba(245, 158, 11, ${opacity})`,
                propsForDots: {
                  r: '4',
                  strokeWidth: '2',
                  stroke: '#F59E0B',
                },
              }}
              bezier
              style={{ marginLeft: -16 }}
            />
          )}
        </Card>

        {/* Volume Stats */}
        <Card className="p-4">
          <View className="flex-row items-center gap-2 mb-4">
            <Ionicons name="analytics" size={24} color="#6366F1" />
            <Text className="text-lg font-bold text-gray-900">
              Estadísticas de Volumen
            </Text>
          </View>

          <View className="gap-3">
            <View className="flex-row items-center justify-between py-3 border-b border-gray-200">
              <Text className="text-gray-700">Volumen Total</Text>
              <Text className="text-gray-900 font-bold">
                {totalVolume.toLocaleString()} kg
              </Text>
            </View>
            <View className="flex-row items-center justify-between py-3 border-b border-gray-200">
              <Text className="text-gray-700">Promedio por Sesión</Text>
              <Text className="text-gray-900 font-bold">
                {Math.round(avgVolume).toLocaleString()} kg
              </Text>
            </View>
            <View className="flex-row items-center justify-between py-3">
              <Text className="text-gray-700">Mejor Sesión</Text>
              <Text className="text-gray-900 font-bold">
                {Math.max(...exerciseHistory.map((h: any) => h.totalVolume), 0).toLocaleString()} kg
              </Text>
            </View>
          </View>
        </Card>

        {/* Recent Sessions */}
        <Card className="p-4">
          <View className="flex-row items-center justify-between mb-4">
            <View className="flex-row items-center gap-2">
              <Ionicons name="time" size={24} color="#EC4899" />
              <Text className="text-lg font-bold text-gray-900">
                Sesiones Recientes
              </Text>
            </View>
          </View>

          {exerciseHistory.length === 0 ? (
            <Text className="text-gray-400 text-center py-4">
              No hay sesiones registradas
            </Text>
          ) : (
            <View className="gap-3">
              {exerciseHistory.slice(-5).reverse().map((session: any, index: number) => (
                <View
                  key={index}
                  className="flex-row items-center justify-between py-3 border-b border-gray-200 last:border-0"
                >
                  <View>
                    <Text className="text-gray-900 font-semibold">
                      {session.workoutName}
                    </Text>
                    <Text className="text-gray-600 text-sm">
                      {format(session.date, "dd 'de' MMMM", { locale: es })}
                    </Text>
                  </View>
                  <View className="items-end">
                    <Text className="text-gray-900 font-bold">
                      {session.maxWeight} kg × {session.maxReps}
                    </Text>
                    <Text className="text-gray-600 text-sm">
                      {session.sets.length} series
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          )}
        </Card>
      </ScrollView>
    </View>
  );
}
