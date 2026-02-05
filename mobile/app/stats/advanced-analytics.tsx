import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LineChart, BarChart, PieChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

interface AnalyticsMetric {
  id: string;
  name: string;
  value: string;
  change: number;
  icon: string;
  color: string;
}

const METRICS: AnalyticsMetric[] = [
  {
    id: 'volume',
    name: 'Volumen Semanal',
    value: '68 series',
    change: 12,
    icon: 'barbell',
    color: '#9D12DE',
  },
  {
    id: 'frequency',
    name: 'Frecuencia',
    value: '5 dÃ­as/sem',
    change: 0,
    icon: 'calendar',
    color: '#9D12DE',
  },
  {
    id: 'intensity',
    name: 'Intensidad Media',
    value: '78% 1RM',
    change: 3,
    icon: 'flash',
    color: '#FFEA00',
  },
  {
    id: 'tonnage',
    name: 'Tonelaje Total',
    value: '12,450 kg',
    change: 8,
    icon: 'trending-up',
    color: '#8B5CF6',
  },
];

export default function AdvancedAnalytics() {
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('month');
  const [selectedMetric, setSelectedMetric] = useState('volume');

  const periods = [
    { id: 'week' as const, label: 'Semana' },
    { id: 'month' as const, label: 'Mes' },
    { id: 'year' as const, label: 'AÃ±o' },
  ];

  // Volume trend data
  const volumeData = {
    labels: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4'],
    datasets: [
      {
        data: [52, 58, 62, 68],
        color: (opacity = 1) => `rgba(16, 185, 129, ${opacity})`,
        strokeWidth: 3,
      },
    ],
  };

  // Exercise distribution
  const exerciseDistribution = [
    {
      name: 'TracciÃ³n',
      population: 35,
      color: '#9D12DE',
      legendFontColor: '#71717A',
      legendFontSize: 12,
    },
    {
      name: 'Empuje',
      population: 32,
      color: '#9D12DE',
      legendFontColor: '#71717A',
      legendFontSize: 12,
    },
    {
      name: 'Piernas',
      population: 25,
      color: '#FFEA00',
      legendFontColor: '#71717A',
      legendFontSize: 12,
    },
    {
      name: 'Core',
      population: 8,
      color: '#8B5CF6',
      legendFontColor: '#71717A',
      legendFontSize: 12,
    },
  ];

  // Tonnage by muscle group
  const tonnageData = {
    labels: ['Pecho', 'Espalda', 'Piernas', 'Hombros'],
    datasets: [
      {
        data: [3200, 4100, 3800, 1350],
      },
    ],
  };

  // Performance score over time
  const performanceData = {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
    datasets: [
      {
        data: [68, 72, 74, 76, 78, 82],
        color: (opacity = 1) => `rgba(139, 92, 246, ${opacity})`,
        strokeWidth: 3,
      },
    ],
  };

  const chartConfig = {
    backgroundColor: '#18181B',
    backgroundGradientFrom: '#18181B',
    backgroundGradientTo: '#18181B',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(16, 185, 129, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(161, 161, 170, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#9D12DE',
    },
  };

  return (
    <View className="flex-1 bg-zinc-950">
      {/* Header */}
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center justify-between mb-3">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1 ml-3">
            Analytics Avanzado
          </Text>
          <TouchableOpacity>
            <Ionicons name="share-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Period Selector */}
        <View className="flex-row gap-2">
          {periods.map((period) => (
            <TouchableOpacity
              key={period.id}
              onPress={() => setSelectedPeriod(period.id)}
              className={`flex-1 py-2 rounded-lg ${
                selectedPeriod === period.id ? 'bg-primary' : 'bg-zinc-900'
              }`}
            >
              <Text
                className={`text-center font-semibold ${
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
        {/* Key Metrics */}
        <View className="px-6 pt-6">
          <Text className="text-white font-bold text-lg mb-3">
            MÃ©tricas Clave
          </Text>
          <View className="flex-row flex-wrap gap-3">
            {METRICS.map((metric) => (
              <View
                key={metric.id}
                className="bg-zinc-900 rounded-xl p-4 border border-zinc-800"
                style={{ width: (screenWidth - 60) / 2 }}
              >
                <View
                  className="w-10 h-10 rounded-lg items-center justify-center mb-2"
                  style={{ backgroundColor: metric.color + '20' }}
                >
                  <Ionicons
                    name={metric.icon as any}
                    size={20}
                    color={metric.color}
                  />
                </View>
                <Text className="text-zinc-400 text-xs mb-1">{metric.name}</Text>
                <Text className="text-white font-bold text-xl">{metric.value}</Text>
                {metric.change !== 0 && (
                  <View className="flex-row items-center mt-1">
                    <Ionicons
                      name={metric.change > 0 ? 'trending-up' : 'trending-down'}
                      size={14}
                      color={metric.change > 0 ? '#9D12DE' : '#EF4444'}
                    />
                    <Text
                      className={`text-xs ml-1 ${
                        metric.change > 0 ? 'text-primary' : 'text-red-500'
                      }`}
                    >
                      {metric.change > 0 ? '+' : ''}
                      {metric.change}%
                    </Text>
                  </View>
                )}
              </View>
            ))}
          </View>
        </View>

        {/* Volume Trend */}
        <View className="px-6 pt-6">
          <Text className="text-white font-bold text-lg mb-3">
            Tendencia de Volumen
          </Text>
          <View className="bg-zinc-900 rounded-xl p-4 border border-zinc-800">
            <LineChart
              data={volumeData}
              width={screenWidth - 80}
              height={200}
              chartConfig={chartConfig}
              bezier
              style={{
                borderRadius: 16,
              }}
            />
            <Text className="text-zinc-400 text-sm text-center mt-3">
              Series totales por semana
            </Text>
          </View>
        </View>

        {/* Exercise Distribution */}
        <View className="px-6 pt-6">
          <Text className="text-white font-bold text-lg mb-3">
            DistribuciÃ³n de Ejercicios
          </Text>
          <View className="bg-zinc-900 rounded-xl p-4 border border-zinc-800">
            <PieChart
              data={exerciseDistribution}
              width={screenWidth - 80}
              height={200}
              chartConfig={chartConfig}
              accessor="population"
              backgroundColor="transparent"
              paddingLeft="15"
              absolute
            />
          </View>
        </View>

        {/* Tonnage by Muscle Group */}
        <View className="px-6 pt-6">
          <Text className="text-white font-bold text-lg mb-3">
            Tonelaje por Grupo Muscular
          </Text>
          <View className="bg-zinc-900 rounded-xl p-4 border border-zinc-800">
            <BarChart
              data={tonnageData}
              width={screenWidth - 80}
              height={200}
              chartConfig={{
                ...chartConfig,
                color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
              }}
              yAxisLabel=""
              yAxisSuffix="kg"
              style={{
                borderRadius: 16,
              }}
            />
            <Text className="text-zinc-400 text-sm text-center mt-3">
              Peso total levantado este mes
            </Text>
          </View>
        </View>

        {/* Performance Score */}
        <View className="px-6 pt-6">
          <Text className="text-white font-bold text-lg mb-3">
            EvoluciÃ³n de Performance
          </Text>
          <View className="bg-zinc-900 rounded-xl p-4 border border-zinc-800">
            <LineChart
              data={performanceData}
              width={screenWidth - 80}
              height={200}
              chartConfig={{
                ...chartConfig,
                color: (opacity = 1) => `rgba(139, 92, 246, ${opacity})`,
                propsForDots: {
                  r: '6',
                  strokeWidth: '2',
                  stroke: '#8B5CF6',
                },
              }}
              bezier
              style={{
                borderRadius: 16,
              }}
            />
            <Text className="text-zinc-400 text-sm text-center mt-3">
              Score de rendimiento (0-100)
            </Text>
          </View>
        </View>

        {/* Training Insights */}
        <View className="px-6 pt-6 pb-6">
          <Text className="text-white font-bold text-lg mb-3">
            Insights de Entrenamiento
          </Text>

          <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-3">
            <View className="flex-row items-start">
              <Ionicons name="checkmark-circle" size={24} color="#9D12DE" />
              <View className="flex-1 ml-3">
                <Text className="text-primary font-bold mb-1">
                  Progreso Consistente
                </Text>
                <Text className="text-primary/80 text-sm leading-5">
                  Has incrementado tu volumen un 12% este mes. MantÃ©n este ritmo
                  para seguir progresando.
                </Text>
              </View>
            </View>
          </View>

          <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-3">
            <View className="flex-row items-start">
              <Ionicons name="information-circle" size={24} color="#9D12DE" />
              <View className="flex-1 ml-3">
                <Text className="text-primary font-bold mb-1">
                  Balance Muscular
                </Text>
                <Text className="text-primary/60 text-sm leading-5">
                  Tu ratio tracciÃ³n/empuje estÃ¡ equilibrado (1.09:1). Ideal para
                  desarrollo simÃ©trico.
                </Text>
              </View>
            </View>
          </View>

          <View className="bg-amber-500/10 rounded-xl p-4 border border-amber-500/30">
            <View className="flex-row items-start">
              <Ionicons name="bulb" size={24} color="#FFEA00" />
              <View className="flex-1 ml-3">
                <Text className="text-amber-500 font-bold mb-1">
                  Oportunidad de Mejora
                </Text>
                <Text className="text-amber-300 text-sm leading-5">
                  Tu volumen de core (8%) estÃ¡ por debajo del Ã³ptimo (15-20%).
                  Considera agregar 2-3 ejercicios de core por semana.
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Export Options */}
        <View className="px-6 pb-6">
          <TouchableOpacity className="bg-zinc-900 rounded-xl p-4 border border-zinc-800 flex-row items-center justify-center">
            <Ionicons name="download-outline" size={20} color="#9D12DE" />
            <Text className="text-white font-semibold ml-2">
              Exportar Reporte PDF
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}


