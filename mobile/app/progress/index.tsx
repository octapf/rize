import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useQuery } from '@tanstack/react-query';
import { usersApi } from '@/services/api/users.api';
import { workoutsApi } from '@/services/api/workouts.api';
import { Card } from '@/components/ui/Card';
import { LineChart, BarChart } from 'react-native-chart-kit';
import { format, subDays, startOfWeek, endOfWeek } from 'date-fns';
import { es } from 'date-fns/locale';

const screenWidth = Dimensions.get('window').width;

type TimeRange = '7d' | '30d' | '90d' | 'year';

export default function ProgressScreen() {
  const [timeRange, setTimeRange] = useState<TimeRange>('30d');

  const { data: statsData, isLoading: statsLoading } = useQuery({
    queryKey: ['user-stats'],
    queryFn: () => usersApi.getMyStats(),
  });

  const { data: workoutsData, isLoading: workoutsLoading } = useQuery({
    queryKey: ['workouts-all'],
    queryFn: () => workoutsApi.getUserWorkouts(),
  });

  const workouts = workoutsData?.data.workouts || [];
  const stats = statsData?.data;

  // Calculate date range
  const getDaysBack = () => {
    switch (timeRange) {
      case '7d': return 7;
      case '30d': return 30;
      case '90d': return 90;
      case 'year': return 365;
      default: return 30;
    }
  };

  const daysBack = getDaysBack();
  const startDate = subDays(new Date(), daysBack);

  // Filter workouts by date range
  const filteredWorkouts = workouts.filter((w: any) => 
    w.completedAt && new Date(w.completedAt) >= startDate
  );

  // Prepare data for charts
  const prepareWorkoutFrequencyData = () => {
    const labels: string[] = [];
    const data: number[] = [];

    if (timeRange === '7d') {
      // Last 7 days
      for (let i = 6; i >= 0; i--) {
        const date = subDays(new Date(), i);
        const dayWorkouts = filteredWorkouts.filter((w: any) => {
          const workoutDate = new Date(w.completedAt);
          return workoutDate.toDateString() === date.toDateString();
        });
        labels.push(format(date, 'EEE', { locale: es }));
        data.push(dayWorkouts.length);
      }
    } else if (timeRange === '30d') {
      // Last 4 weeks
      for (let i = 3; i >= 0; i--) {
        const weekStart = startOfWeek(subDays(new Date(), i * 7));
        const weekEnd = endOfWeek(weekStart);
        const weekWorkouts = filteredWorkouts.filter((w: any) => {
          const workoutDate = new Date(w.completedAt);
          return workoutDate >= weekStart && workoutDate <= weekEnd;
        });
        labels.push(`S${4 - i}`);
        data.push(weekWorkouts.length);
      }
    } else {
      // Group by month
      const months = Math.min(Math.ceil(daysBack / 30), 6);
      for (let i = months - 1; i >= 0; i--) {
        const monthDate = subDays(new Date(), i * 30);
        const monthWorkouts = filteredWorkouts.filter((w: any) => {
          const workoutDate = new Date(w.completedAt);
          return Math.abs(workoutDate.getTime() - monthDate.getTime()) < 30 * 24 * 60 * 60 * 1000;
        });
        labels.push(format(monthDate, 'MMM', { locale: es }));
        data.push(monthWorkouts.length);
      }
    }

    return { labels, data };
  };

  const prepareVolumeData = () => {
    const labels: string[] = [];
    const data: number[] = [];

    const groupSize = timeRange === '7d' ? 1 : timeRange === '30d' ? 7 : 30;
    const points = timeRange === '7d' ? 7 : timeRange === '30d' ? 4 : 6;

    for (let i = points - 1; i >= 0; i--) {
      const date = subDays(new Date(), i * groupSize);
      const periodWorkouts = filteredWorkouts.filter((w: any) => {
        const workoutDate = new Date(w.completedAt);
        const daysDiff = Math.floor((new Date().getTime() - workoutDate.getTime()) / (1000 * 60 * 60 * 24));
        return daysDiff >= i * groupSize && daysDiff < (i + 1) * groupSize;
      });

      let totalVolume = 0;
      periodWorkouts.forEach((workout: any) => {
        workout.exercises.forEach((exercise: any) => {
          exercise.sets.forEach((set: any) => {
            if (set.completed && set.weight && set.reps) {
              totalVolume += set.weight * set.reps;
            }
          });
        });
      });

      if (timeRange === '7d') {
        labels.push(format(date, 'EEE', { locale: es }));
      } else if (timeRange === '30d') {
        labels.push(`S${points - i}`);
      } else {
        labels.push(format(date, 'MMM', { locale: es }));
      }
      data.push(Math.round(totalVolume));
    }

    return { labels, data };
  };

  const workoutFrequency = prepareWorkoutFrequencyData();
  const volumeData = prepareVolumeData();

  const timeRanges = [
    { id: '7d' as const, label: '7 dÃ­as' },
    { id: '30d' as const, label: '30 dÃ­as' },
    { id: '90d' as const, label: '90 dÃ­as' },
    { id: 'year' as const, label: '1 aÃ±o' },
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
      stroke: '#9D12DE',
    },
  };

  if (statsLoading || workoutsLoading) {
    return (
      <View className="flex-1 bg-gray-50 items-center justify-center">
        <ActivityIndicator size="large" color="#9D12DE" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <LinearGradient colors={['#9D12DE', '#7C3AED']} className="px-6 pt-12 pb-6">
        <View className="flex-row items-center justify-between mb-4">
          <TouchableOpacity onPress={() => router.back()} className="p-2">
            <Ionicons name="arrow-back" size={28} color="white" />
          </TouchableOpacity>
          <Text className="text-2xl font-bold text-white">Mi Progreso</Text>
          <View className="w-10" />
        </View>

        {/* Stats Summary */}
        <View className="flex-row gap-3">
          <Card className="flex-1 p-3 bg-white/20 border-0">
            <Text className="text-white/80 text-xs mb-1">Total Workouts</Text>
            <Text className="text-white text-2xl font-bold">
              {stats?.workouts.total || 0}
            </Text>
          </Card>
          <Card className="flex-1 p-3 bg-white/20 border-0">
            <Text className="text-white/80 text-xs mb-1">Racha Actual</Text>
            <Text className="text-white text-2xl font-bold">
              {stats?.user.streak || 0}
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
                  ? 'bg-primary'
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

        {/* Workout Frequency Chart */}
        <Card className="p-4">
          <View className="flex-row items-center gap-2 mb-4">
            <Ionicons name="bar-chart" size={24} color="#9D12DE" />
            <Text className="text-lg font-bold text-gray-900">
              Frecuencia de Entrenamientos
            </Text>
          </View>
          
          {workoutFrequency.data.every(d => d === 0) ? (
            <View className="py-8 items-center">
              <Text className="text-gray-400">No hay datos en este perÃ­odo</Text>
            </View>
          ) : (
            <BarChart
              data={{
                labels: workoutFrequency.labels,
                datasets: [{ data: workoutFrequency.data }],
              }}
              width={screenWidth - 80}
              height={220}
              chartConfig={chartConfig}
              style={{ marginLeft: -16 }}
              showValuesOnTopOfBars
            />
          )}
        </Card>

        {/* Volume Progress Chart */}
        <Card className="p-4">
          <View className="flex-row items-center gap-2 mb-4">
            <Ionicons name="trending-up" size={24} color="#8B5CF6" />
            <Text className="text-lg font-bold text-gray-900">
              Volumen Total (kg)
            </Text>
          </View>

          {volumeData.data.every(d => d === 0) ? (
            <View className="py-8 items-center">
              <Text className="text-gray-400">No hay datos en este perÃ­odo</Text>
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
                  stroke: '#8B5CF6',
                },
              }}
              bezier
              style={{ marginLeft: -16 }}
            />
          )}
        </Card>

        {/* Personal Bests */}
        <Card className="p-4">
          <View className="flex-row items-center justify-between mb-4">
            <View className="flex-row items-center gap-2">
              <Ionicons name="trophy" size={24} color="#FFEA00" />
              <Text className="text-lg font-bold text-gray-900">
                Mejores Marcas
              </Text>
            </View>
            <TouchableOpacity>
              <Text className="text-primary font-semibold">Ver Todas</Text>
            </TouchableOpacity>
          </View>

          <View className="gap-3">
            <View className="flex-row items-center justify-between py-3 border-b border-gray-200">
              <Text className="text-gray-700">Volumen en un dÃ­a</Text>
              <Text className="text-gray-900 font-bold">
                {Math.max(...volumeData.data, 0).toLocaleString()} kg
              </Text>
            </View>
            <View className="flex-row items-center justify-between py-3 border-b border-gray-200">
              <Text className="text-gray-700">Workouts en una semana</Text>
              <Text className="text-gray-900 font-bold">
                {Math.max(...workoutFrequency.data, 0)}
              </Text>
            </View>
            <View className="flex-row items-center justify-between py-3">
              <Text className="text-gray-700">Racha mÃ¡s larga</Text>
              <Text className="text-gray-900 font-bold">
                {stats?.user.streak || 0} dÃ­as
              </Text>
            </View>
          </View>
        </Card>

        {/* Training Time */}
        <Card className="p-4">
          <View className="flex-row items-center gap-2 mb-4">
            <Ionicons name="time" size={24} color="#9D12DE" />
            <Text className="text-lg font-bold text-gray-900">
              Tiempo de Entrenamiento
            </Text>
          </View>

          <View className="gap-3">
            <View className="flex-row items-center justify-between">
              <Text className="text-gray-700">Total</Text>
              <Text className="text-gray-900 font-bold">
                {Math.round((stats?.time.total || 0) / 60)} horas
              </Text>
            </View>
            <View className="flex-row items-center justify-between">
              <Text className="text-gray-700">Promedio por sesiÃ³n</Text>
              <Text className="text-gray-900 font-bold">
                {stats?.workouts.total
                  ? Math.round((stats.time.total || 0) / stats.workouts.total)
                  : 0}{' '}
                min
              </Text>
            </View>
          </View>
        </Card>
      </ScrollView>
    </View>
  );
}

