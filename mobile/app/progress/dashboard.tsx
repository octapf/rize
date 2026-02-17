import React, { useState } from 'react';
import { Text } from '@/components/ui/Text';
import { View, TouchableOpacity, ScrollView, Alert } from 'react-native';;
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LineChart } from 'react-native-chart-kit';

interface ProgressMetric {
  name: string;
  current: number;
  start: number;
  goal: number;
  unit: string;
  icon: string;
  color: string;
  trend: 'up' | 'down' | 'stable';
}

interface WeeklyStats {
  week: string;
  workouts: number;
  volume: number;
  calories: number;
  avgDuration: number;
}

const METRICS: ProgressMetric[] = [
  {
    name: 'Peso Corporal',
    current: 82.1,
    start: 78.5,
    goal: 85.0,
    unit: 'kg',
    icon: 'scale',
    color: '#9D12DE',
    trend: 'up',
  },
  {
    name: '% Grasa Corporal',
    current: 17.5,
    start: 18.2,
    goal: 15.0,
    unit: '%',
    icon: 'analytics',
    color: '#EF4444',
    trend: 'down',
  },
  {
    name: 'Masa Muscular',
    current: 67.8,
    start: 64.2,
    goal: 72.0,
    unit: 'kg',
    icon: 'barbell',
    color: '#9D12DE',
    trend: 'up',
  },
  {
    name: 'Fuerza Total (1RM)',
    current: 430,
    start: 385,
    goal: 500,
    unit: 'kg',
    icon: 'trophy',
    color: '#FFEA00',
    trend: 'up',
  },
];

const WEEKLY_STATS: WeeklyStats[] = [
  { week: 'Sem 1', workouts: 4, volume: 28500, calories: 12400, avgDuration: 75 },
  { week: 'Sem 2', workouts: 5, volume: 32400, calories: 14200, avgDuration: 78 },
  { week: 'Sem 3', workouts: 4, volume: 30100, calories: 13100, avgDuration: 72 },
  { week: 'Sem 4', workouts: 6, volume: 38200, calories: 16800, avgDuration: 82 },
];

export default function ProgressDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('month');

  const periods = [
    { id: 'week', label: 'Semana' },
    { id: 'month', label: 'Mes' },
    { id: 'year', label: 'Año' },
  ];

  const calculateProgress = (current: number, start: number, goal: number) => {
    const progress = ((current - start) / (goal - start)) * 100;
    return Math.max(0, Math.min(100, progress));
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

  const getTrendColor = (trend: string, isPositive: boolean) => {
    if (trend === 'stable') return '#71717A';
    return (trend === 'up' && isPositive) || (trend === 'down' && !isPositive)
      ? '#9D12DE'
      : '#EF4444';
  };

  const viewMetricDetail = (metric: ProgressMetric) => {
    const change = metric.current - metric.start;
    const changePercent = ((change / metric.start) * 100).toFixed(1);
    
    Alert.alert(
      `📊 ${metric.name}`,
      `Inicio: ${metric.start} ${metric.unit}\nActual: ${metric.current} ${metric.unit}\nMeta: ${metric.goal} ${metric.unit}\n\nCambio: ${change > 0 ? '+' : ''}${change.toFixed(1)} ${metric.unit} (${changePercent}%)\n\nProgreso: ${calculateProgress(metric.current, metric.start, metric.goal).toFixed(0)}%`,
      [
        { text: 'Ver Historial' },
        { text: 'Actualizar Meta' },
        { text: 'Cerrar' },
      ]
    );
  };

  const totalWorkouts = WEEKLY_STATS.reduce((sum, week) => sum + week.workouts, 0);
  const totalVolume = WEEKLY_STATS.reduce((sum, week) => sum + week.volume, 0);
  const avgWorkoutsPerWeek = (totalWorkouts / WEEKLY_STATS.length).toFixed(1);

  return (
    <View className="flex-1 bg-zinc-950">
      {/* Header */}
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1 ml-3">
            Dashboard de Progreso
          </Text>
          <TouchableOpacity>
            <Ionicons name="download-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Summary Card */}
        <View className="bg-gradient-to-br from-primary to-[#7D0EBE] rounded-xl p-4 mb-4">
          <View className="flex-row items-center justify-between mb-3">
            <View className="flex-1">
              <Text className="text-white/80 text-sm mb-1">Entrenamientos Este Mes</Text>
              <Text className="text-white font-bold text-4xl mb-1">
                {totalWorkouts}
              </Text>
              <Text className="text-white/80 text-sm">
                {avgWorkoutsPerWeek} promedio/semana
              </Text>
            </View>
            <View className="bg-white/20 rounded-full p-4">
              <Ionicons name="stats-chart" size={32} color="white" />
            </View>
          </View>
          <View className="flex-row gap-2">
            <View className="flex-1 bg-white/20 rounded-lg p-2">
              <Text className="text-white/80 text-xs">Volumen Total</Text>
              <Text className="text-white font-bold">{(totalVolume / 1000).toFixed(0)}k kg</Text>
            </View>
            <View className="flex-1 bg-white/20 rounded-lg p-2">
              <Text className="text-white/80 text-xs">Duración Avg</Text>
              <Text className="text-white font-bold">
                {Math.round(
                  WEEKLY_STATS.reduce((sum, w) => sum + w.avgDuration, 0) / WEEKLY_STATS.length
                )}{' '}
                min
              </Text>
            </View>
          </View>
        </View>

        {/* Period Selector */}
        <View className="flex-row gap-2">
          {periods.map((period) => (
            <TouchableOpacity
              key={period.id}
              onPress={() => setSelectedPeriod(period.id as any)}
              className={`flex-1 px-4 py-2 rounded-lg ${
                selectedPeriod === period.id
                  ? 'bg-primary'
                  : 'bg-zinc-900 border border-zinc-800'
              }`}
            >
              <Text
                className={`font-semibold text-sm text-center ${
                  selectedPeriod === period.id ? 'text-white' : 'text-zinc-400'
                }`}
              >
                {period.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          {/* Key Metrics */}
          <Text className="text-white font-bold text-lg mb-3">
            Métricas Clave
          </Text>

          {METRICS.map((metric) => {
            const isPositiveTrend = metric.name === '% Grasa Corporal' ? false : true;
            const change = metric.current - metric.start;
            const progress = calculateProgress(metric.current, metric.start, metric.goal);

            return (
              <TouchableOpacity
                key={metric.name}
                onPress={() => viewMetricDetail(metric)}
                className="bg-zinc-900 rounded-xl p-4 mb-3 border border-zinc-800"
              >
                <View className="flex-row items-start justify-between mb-3">
                  <View className="flex-1">
                    <View className="flex-row items-center mb-2">
                      <View
                        className="w-10 h-10 rounded-full items-center justify-center"
                        style={{ backgroundColor: metric.color + '20' }}
                      >
                        <Ionicons name={metric.icon as any} size={20} color={metric.color} />
                      </View>
                      <Text className="text-white font-bold text-base ml-3">
                        {metric.name}
                      </Text>
                    </View>
                    <View className="flex-row items-baseline">
                      <Text className="text-white font-bold text-3xl">
                        {metric.current}
                      </Text>
                      <Text className="text-zinc-400 text-lg ml-1">{metric.unit}</Text>
                    </View>
                  </View>
                  <View className="items-end">
                    <View
                      className="flex-row items-center px-3 py-1 rounded-full"
                      style={{
                        backgroundColor:
                          getTrendColor(metric.trend, isPositiveTrend) + '20',
                      }}
                    >
                      <Ionicons
                        name={getTrendIcon(metric.trend)}
                        size={14}
                        color={getTrendColor(metric.trend, isPositiveTrend)}
                      />
                      <Text
                        className="ml-1 text-sm font-bold"
                        style={{ color: getTrendColor(metric.trend, isPositiveTrend) }}
                      >
                        {change > 0 ? '+' : ''}
                        {change.toFixed(1)}
                      </Text>
                    </View>
                  </View>
                </View>

                <View className="mb-2">
                  <View className="flex-row items-center justify-between mb-1">
                    <Text className="text-zinc-400 text-sm">
                      Meta: {metric.goal} {metric.unit}
                    </Text>
                    <Text className="text-primary font-bold text-sm">
                      {progress.toFixed(0)}%
                    </Text>
                  </View>
                  <View className="bg-zinc-800 h-2 rounded-full overflow-hidden">
                    <View
                      className="h-full rounded-full"
                      style={{
                        width: `${progress}%`,
                        backgroundColor: metric.color,
                      }}
                    />
                  </View>
                </View>

                <View className="flex-row items-center justify-between">
                  <Text className="text-zinc-500 text-xs">
                    Inicio: {metric.start} {metric.unit}
                  </Text>
                  <Text className="text-zinc-500 text-xs">
                    Faltan: {(metric.goal - metric.current).toFixed(1)} {metric.unit}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}

          {/* Weekly Trend */}
          <View className="mt-4 mb-4">
            <Text className="text-white font-bold text-lg mb-3">
              Tendencia Semanal
            </Text>
            <View className="bg-zinc-900 rounded-xl p-4 border border-zinc-800">
              <Text className="text-white font-bold mb-3">
                Entrenamientos por Semana
              </Text>
              <LineChart
                data={{
                  labels: WEEKLY_STATS.map((w) => w.week),
                  datasets: [
                    {
                      data: WEEKLY_STATS.map((w) => w.workouts),
                    },
                  ],
                }}
                width={320}
                height={200}
                chartConfig={{
                  backgroundColor: '#18181B',
                  backgroundGradientFrom: '#18181B',
                  backgroundGradientTo: '#18181B',
                  decimalPlaces: 0,
                  color: (opacity = 1) => `rgba(157, 18, 222, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(161, 161, 170, ${opacity})`,
                  style: {
                    borderRadius: 16,
                  },
                  propsForDots: {
                    r: '6',
                    strokeWidth: '2',
                    stroke: '#9D12DE',
                  },
                }}
                bezier
                style={{
                  marginVertical: 8,
                  borderRadius: 16,
                }}
              />
            </View>
          </View>

          {/* Stats Cards */}
          <View className="flex-row gap-2 mb-4">
            <View className="flex-1 bg-zinc-900 rounded-xl p-4 border border-zinc-800">
              <View className="flex-row items-center justify-between mb-2">
                <Ionicons name="flame" size={20} color="#EF4444" />
                <Text className="text-zinc-400 text-xs">Total</Text>
              </View>
              <Text className="text-white font-bold text-2xl mb-1">
                {(WEEKLY_STATS.reduce((sum, w) => sum + w.calories, 0) / 1000).toFixed(1)}k
              </Text>
              <Text className="text-zinc-400 text-xs">Calorías quemadas</Text>
            </View>

            <View className="flex-1 bg-zinc-900 rounded-xl p-4 border border-zinc-800">
              <View className="flex-row items-center justify-between mb-2">
                <Ionicons name="barbell" size={20} color="#8B5CF6" />
                <Text className="text-zinc-400 text-xs">Total</Text>
              </View>
              <Text className="text-white font-bold text-2xl mb-1">
                {(totalVolume / 1000).toFixed(0)}k
              </Text>
              <Text className="text-zinc-400 text-xs">kg levantados</Text>
            </View>
          </View>
        </View>

        {/* Export / Share */}
        <View className="px-6 pb-6">
          <TouchableOpacity className="bg-primary rounded-xl p-4 mb-4">
            <View className="flex-row items-center justify-center">
              <Ionicons name="share-social" size={20} color="white" />
              <Text className="text-white font-bold ml-2">
                Compartir Progreso
              </Text>
            </View>
          </TouchableOpacity>

          <View className="bg-primary/10 rounded-xl p-4 border border-primary/30">
            <View className="flex-row items-start">
              <Ionicons name="information-circle" size={20} color="#9D12DE" />
              <View className="flex-1 ml-3">
                <Text className="text-primary/80 font-bold mb-2">
                  Seguimiento Automático
                </Text>
                <Text className="text-primary/60 text-sm">
                  Todas tus métricas se actualizan automáticamente. Revisa tu progreso semanalmente para mantener la motivación.
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}


