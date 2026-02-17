import React, { useState } from 'react';
import { Text } from '@/components/ui/Text';
import { View, TouchableOpacity, ScrollView, Alert } from 'react-native';;
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

interface SleepData {
  date: string;
  hours: number;
  quality: 'mala' | 'regular' | 'buena' | 'excelente';
  deepSleep: number;
  remSleep: number;
  awakeDuration: number;
}

interface RecoveryMetric {
  id: string;
  name: string;
  value: number;
  max: number;
  status: 'critico' | 'bajo' | 'normal' | 'optimo';
  recommendation: string;
  icon: string;
}

const SLEEP_HISTORY: SleepData[] = [
  { date: '2025-01-20', hours: 7.5, quality: 'buena', deepSleep: 1.8, remSleep: 1.5, awakeDuration: 15 },
  { date: '2025-01-21', hours: 6.2, quality: 'regular', deepSleep: 1.2, remSleep: 1.0, awakeDuration: 25 },
  { date: '2025-01-22', hours: 8.1, quality: 'excelente', deepSleep: 2.2, remSleep: 1.8, awakeDuration: 10 },
  { date: '2025-01-23', hours: 7.8, quality: 'buena', deepSleep: 2.0, remSleep: 1.6, awakeDuration: 12 },
  { date: '2025-01-24', hours: 5.5, quality: 'mala', deepSleep: 0.8, remSleep: 0.6, awakeDuration: 35 },
  { date: '2025-01-25', hours: 7.2, quality: 'buena', deepSleep: 1.7, remSleep: 1.4, awakeDuration: 18 },
  { date: '2025-01-26', hours: 8.5, quality: 'excelente', deepSleep: 2.4, remSleep: 2.0, awakeDuration: 8 },
];

const RECOVERY_METRICS: RecoveryMetric[] = [
  {
    id: '1',
    name: 'Calidad de Sueño',
    value: 82,
    max: 100,
    status: 'optimo',
    recommendation: 'Excelente recuperación. Continúa así.',
    icon: 'moon',
  },
  {
    id: '2',
    name: 'Variabilidad Cardíaca',
    value: 65,
    max: 100,
    status: 'normal',
    recommendation: 'HRV dentro del rango normal.',
    icon: 'pulse',
  },
  {
    id: '3',
    name: 'Nivel de Fatiga',
    value: 35,
    max: 100,
    status: 'bajo',
    recommendation: 'Fatiga elevada. Considera un día de descanso.',
    icon: 'battery-charging',
  },
  {
    id: '4',
    name: 'Estado Muscular',
    value: 75,
    max: 100,
    status: 'normal',
    recommendation: 'Músculos recuperados. Listo para entrenar.',
    icon: 'fitness',
  },
];

const SLEEP_CHART_DATA = {
  labels: ['L', 'M', 'X', 'J', 'V', 'S', 'D'],
  datasets: [
    {
      data: [7.5, 6.2, 8.1, 7.8, 5.5, 7.2, 8.5],
    },
  ],
};

export default function RecoveryTracking() {
  const [selectedTab, setSelectedTab] = useState<'overview' | 'sleep' | 'hrv'>('overview');

  const tabs = [
    { id: 'overview' as const, label: 'General', icon: 'stats-chart' },
    { id: 'sleep' as const, label: 'Sueño', icon: 'moon' },
    { id: 'hrv' as const, label: 'HRV', icon: 'pulse' },
  ];

  const getQualityColor = (quality: string) => {
    switch (quality) {
      case 'excelente':
        return '#9D12DE';
      case 'buena':
        return '#9D12DE';
      case 'regular':
        return '#FFEA00';
      case 'mala':
        return '#EF4444';
      default:
        return '#71717A';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'optimo':
        return '#9D12DE';
      case 'normal':
        return '#9D12DE';
      case 'bajo':
        return '#FFEA00';
      case 'critico':
        return '#EF4444';
      default:
        return '#71717A';
    }
  };

  const logSleep = () => {
    Alert.alert(
      'Registrar Sueño',
      'Selecciona las horas de sueño',
      [
        { text: '< 6 horas', onPress: () => saveSleep(5) },
        { text: '6-7 horas', onPress: () => saveSleep(6.5) },
        { text: '7-8 horas', onPress: () => saveSleep(7.5) },
        { text: '8+ horas', onPress: () => saveSleep(8.5) },
        { text: 'Cancelar', style: 'cancel' },
      ]
    );
  };

  const saveSleep = (hours: number) => {
    Alert.alert('¡Registrado!', `${hours} horas de sueño registradas`);
  };

  const averageSleep = (SLEEP_HISTORY.reduce((sum, day) => sum + day.hours, 0) / SLEEP_HISTORY.length).toFixed(1);
  const lastNightSleep = SLEEP_HISTORY[SLEEP_HISTORY.length - 1];
  const recoveryScore = Math.round(RECOVERY_METRICS.reduce((sum, m) => sum + m.value, 0) / RECOVERY_METRICS.length);

  return (
    <View className="flex-1 bg-zinc-950">
      {/* Header */}
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1 ml-3">
            Recuperación
          </Text>
          <TouchableOpacity onPress={logSleep}>
            <Ionicons name="add-circle" size={24} color="#9D12DE" />
          </TouchableOpacity>
        </View>

        {/* Recovery Score */}
        <View className="bg-gradient-to-br from-primary to-[#7D0EBE] rounded-xl p-4 mb-4">
          <View className="flex-row items-center justify-between">
            <View className="flex-1">
              <Text className="text-white/80 text-sm mb-1">Puntuación de Recuperación</Text>
              <Text className="text-white font-bold text-4xl mb-1">
                {recoveryScore}/100
              </Text>
              <Text className="text-white/80 text-sm">
                {recoveryScore >= 80 ? '¡Excelente!' : recoveryScore >= 60 ? 'Buena recuperación' : 'Necesitas descanso'}
              </Text>
            </View>
            <View className="bg-white/20 rounded-full p-4">
              <Ionicons name="shield-checkmark" size={32} color="white" />
            </View>
          </View>
        </View>

        {/* Tabs */}
        <View className="flex-row gap-2">
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.id}
              onPress={() => setSelectedTab(tab.id)}
              className={`flex-1 flex-row items-center justify-center py-3 rounded-lg ${
                selectedTab === tab.id ? 'bg-primary' : 'bg-zinc-900 border border-zinc-800'
              }`}
            >
              <Ionicons
                name={tab.icon as any}
                size={18}
                color={selectedTab === tab.id ? 'white' : '#71717A'}
              />
              <Text
                className={`ml-2 font-semibold text-sm ${
                  selectedTab === tab.id ? 'text-white' : 'text-zinc-400'
                }`}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Overview Tab */}
        {selectedTab === 'overview' && (
          <View className="px-6 pt-6">
            <Text className="text-white font-bold text-lg mb-3">
              Métricas de Recuperación
            </Text>

            {RECOVERY_METRICS.map((metric) => (
              <View
                key={metric.id}
                className="bg-zinc-900 rounded-xl p-4 mb-3 border border-zinc-800"
              >
                <View className="flex-row items-center justify-between mb-3">
                  <View className="flex-1">
                    <View className="flex-row items-center mb-2">
                      <View
                        className="w-10 h-10 rounded-full items-center justify-center"
                        style={{ backgroundColor: getStatusColor(metric.status) + '20' }}
                      >
                        <Ionicons
                          name={metric.icon as any}
                          size={20}
                          color={getStatusColor(metric.status)}
                        />
                      </View>
                      <View className="ml-3 flex-1">
                        <Text className="text-white font-bold">{metric.name}</Text>
                        <Text className="text-zinc-400 text-sm">{metric.recommendation}</Text>
                      </View>
                    </View>
                  </View>
                  <Text className="text-white font-bold text-2xl">
                    {metric.value}
                  </Text>
                </View>

                <View className="bg-zinc-800 h-2 rounded-full overflow-hidden">
                  <View
                    className="h-full rounded-full"
                    style={{
                      width: `${(metric.value / metric.max) * 100}%`,
                      backgroundColor: getStatusColor(metric.status),
                    }}
                  />
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Sleep Tab */}
        {selectedTab === 'sleep' && (
          <View className="px-6 pt-6">
            <Text className="text-white font-bold text-lg mb-3">
              Análisis de Sueño
            </Text>

            {/* Stats Cards */}
            <View className="flex-row gap-3 mb-4">
              <View className="flex-1 bg-zinc-900 rounded-xl p-3 border border-zinc-800">
                <Text className="text-zinc-400 text-xs">Promedio</Text>
                <Text className="text-white text-2xl font-bold">{averageSleep}h</Text>
              </View>
              <View className="flex-1 bg-zinc-900 rounded-xl p-3 border border-zinc-800">
                <Text className="text-zinc-400 text-xs">Última Noche</Text>
                <Text className="text-primary text-2xl font-bold">
                  {lastNightSleep.hours}h
                </Text>
              </View>
              <View className="flex-1 bg-zinc-900 rounded-xl p-3 border border-zinc-800">
                <Text className="text-zinc-400 text-xs">Calidad</Text>
                <Text
                  className="text-xl font-bold capitalize"
                  style={{ color: getQualityColor(lastNightSleep.quality) }}
                >
                  {lastNightSleep.quality}
                </Text>
              </View>
            </View>

            {/* Sleep Chart */}
            <View className="bg-zinc-900 rounded-xl p-4 mb-4 border border-zinc-800">
              <Text className="text-white font-bold mb-3">Últimos 7 Días</Text>
              <LineChart
                data={SLEEP_CHART_DATA}
                width={screenWidth - 80}
                height={200}
                chartConfig={{
                  backgroundColor: '#18181B',
                  backgroundGradientFrom: '#18181B',
                  backgroundGradientTo: '#18181B',
                  decimalPlaces: 1,
                  color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
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

            {/* Sleep Breakdown */}
            <Text className="text-white font-bold text-lg mb-3">
              Fases de Sueño (Última Noche)
            </Text>

            <View className="bg-zinc-900 rounded-xl p-4 mb-4 border border-zinc-800">
              <View className="mb-3">
                <View className="flex-row items-center justify-between mb-2">
                  <Text className="text-zinc-400">Sueño Profundo</Text>
                  <Text className="text-white font-bold">{lastNightSleep.deepSleep}h</Text>
                </View>
                <View className="bg-zinc-800 h-2 rounded-full overflow-hidden">
                  <View
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${(lastNightSleep.deepSleep / lastNightSleep.hours) * 100}%` }}
                  />
                </View>
              </View>

              <View className="mb-3">
                <View className="flex-row items-center justify-between mb-2">
                  <Text className="text-zinc-400">Sueño REM</Text>
                  <Text className="text-white font-bold">{lastNightSleep.remSleep}h</Text>
                </View>
                <View className="bg-zinc-800 h-2 rounded-full overflow-hidden">
                  <View
                    className="h-full bg-purple-500 rounded-full"
                    style={{ width: `${(lastNightSleep.remSleep / lastNightSleep.hours) * 100}%` }}
                  />
                </View>
              </View>

              <View>
                <View className="flex-row items-center justify-between mb-2">
                  <Text className="text-zinc-400">Tiempo Despierto</Text>
                  <Text className="text-white font-bold">{lastNightSleep.awakeDuration} min</Text>
                </View>
                <View className="bg-zinc-800 h-2 rounded-full overflow-hidden">
                  <View
                    className="h-full bg-amber-500 rounded-full"
                    style={{ width: `${Math.min((lastNightSleep.awakeDuration / 60) * 100, 100)}%` }}
                  />
                </View>
              </View>
            </View>
          </View>
        )}

        {/* HRV Tab */}
        {selectedTab === 'hrv' && (
          <View className="px-6 pt-6">
            <View className="bg-zinc-900 rounded-xl p-8 border border-zinc-800 items-center">
              <Ionicons name="pulse" size={48} color="#71717A" />
              <Text className="text-zinc-400 font-bold mt-4">
                Integración con Wearables Próximamente
              </Text>
              <Text className="text-zinc-500 text-sm mt-2 text-center">
                Conecta tu Apple Watch o Garmin para ver datos de HRV
              </Text>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

