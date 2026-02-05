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
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

interface Metric {
  id: string;
  name: string;
  value: number;
  unit: string;
  change: number;
  trend: 'up' | 'down' | 'stable';
  category: 'fuerza' | 'volumen' | 'cardio' | 'composicion';
  icon: string;
}

const METRICS: Metric[] = [
  { id: '1', name: '1RM Sentadilla', value: 140, unit: 'kg', change: 5, trend: 'up', category: 'fuerza', icon: 'barbell' },
  { id: '2', name: '1RM Press Banca', value: 100, unit: 'kg', change: 2.5, trend: 'up', category: 'fuerza', icon: 'fitness' },
  { id: '3', name: '1RM Peso Muerto', value: 160, unit: 'kg', change: 0, trend: 'stable', category: 'fuerza', icon: 'trending-up' },
  { id: '4', name: 'Volumen Semanal', value: 68, unit: 'series', change: 12, trend: 'up', category: 'volumen', icon: 'stats-chart' },
  { id: '5', name: 'Tonelaje Total', value: 12450, unit: 'kg', change: 850, trend: 'up', category: 'volumen', icon: 'speedometer' },
  { id: '6', name: 'VO2 Max', value: 48, unit: 'ml/kg/min', change: -2, trend: 'down', category: 'cardio', icon: 'pulse' },
  { id: '7', name: 'Peso Corporal', value: 78.5, unit: 'kg', change: 1.2, trend: 'up', category: 'composicion', icon: 'body' },
  { id: '8', name: '% Grasa Corporal', value: 14.5, unit: '%', change: -0.8, trend: 'down', category: 'composicion', icon: 'water' },
];

const SQUAT_HISTORY = {
  labels: ['Ene 1', 'Ene 8', 'Ene 15', 'Ene 22'],
  datasets: [
    {
      data: [130, 132.5, 135, 140],
    },
  ],
};

export default function AdvancedProgress() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'Todo' },
    { id: 'fuerza', label: 'Fuerza' },
    { id: 'volumen', label: 'Volumen' },
    { id: 'cardio', label: 'Cardio' },
    { id: 'composicion', label: 'Composición' },
  ];

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up':
        return '#9D12DE';
      case 'down':
        return '#EF4444';
      case 'stable':
        return '#FFEA00';
      default:
        return '#71717A';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return 'trending-up';
      case 'down':
        return 'trending-down';
      case 'stable':
        return 'remove';
      default:
        return 'help';
    }
  };

  const viewMetricDetails = (metric: Metric) => {
    Alert.alert(
      metric.name,
      `Valor Actual: ${metric.value} ${metric.unit}\nCambio: ${metric.change > 0 ? '+' : ''}${metric.change} ${metric.unit}\n\nTendencia: ${
        metric.trend === 'up' ? 'Mejorando ✅' : metric.trend === 'down' ? 'Bajando â¬‡ï¸' : 'Estable âž¡ï¸'
      }`,
      [{ text: 'Ver Histórico' }, { text: 'Cerrar' }]
    );
  };

  const filteredMetrics = METRICS.filter((m) => selectedCategory === 'all' || m.category === selectedCategory);

  const bestImprovement = METRICS.reduce((best, current) => {
    return current.change > best.change ? current : best;
  }, METRICS[0]);

  return (
    <View className="flex-1 bg-zinc-950">
      {/* Header */}
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1 ml-3">
            Progreso Avanzado
          </Text>
          <TouchableOpacity>
            <Ionicons name="download-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Best Improvement Highlight */}
        <View className="bg-gradient-to-br from-primary to-[#7D0EBE] rounded-xl p-4 mb-4">
          <View className="flex-row items-center justify-between">
            <View className="flex-1">
              <Text className="text-white/80 text-sm mb-1">Mayor Mejora</Text>
              <Text className="text-white font-bold text-2xl mb-1">
                {bestImprovement.name}
              </Text>
              <Text className="text-white/90 text-lg">
                +{bestImprovement.change} {bestImprovement.unit}
              </Text>
            </View>
            <View className="bg-white/20 rounded-full p-4">
              <Ionicons name="trophy" size={32} color="white" />
            </View>
          </View>
        </View>

        {/* Category Filter */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row gap-2">
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                onPress={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg ${
                  selectedCategory === category.id
                    ? 'bg-primary'
                    : 'bg-zinc-900 border border-zinc-800'
                }`}
              >
                <Text
                  className={`font-semibold text-sm ${
                    selectedCategory === category.id ? 'text-white' : 'text-zinc-400'
                  }`}
                >
                  {category.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Chart Section */}
        <View className="px-6 pt-6">
          <Text className="text-white font-bold text-lg mb-3">
            Progresión 1RM Sentadilla
          </Text>

          <View className="bg-zinc-900 rounded-xl p-4 mb-6 border border-zinc-800">
            <LineChart
              data={SQUAT_HISTORY}
              width={screenWidth - 80}
              height={200}
              chartConfig={{
                backgroundColor: '#18181B',
                backgroundGradientFrom: '#18181B',
                backgroundGradientTo: '#18181B',
                decimalPlaces: 1,
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
              }}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
            />
            <View className="flex-row items-center justify-between mt-2">
              <Text className="text-zinc-400 text-sm">Inicio: 130 kg</Text>
              <Text className="text-primary font-bold">Actual: 140 kg (+10 kg)</Text>
            </View>
          </View>

          {/* Metrics Grid */}
          <Text className="text-white font-bold text-lg mb-3">
            Todas las Métricas
          </Text>

          <View className="mb-6">
            {filteredMetrics.map((metric) => (
              <TouchableOpacity
                key={metric.id}
                onPress={() => viewMetricDetails(metric)}
                className="bg-zinc-900 rounded-xl p-4 mb-3 border border-zinc-800"
              >
                <View className="flex-row items-center justify-between">
                  <View className="flex-1">
                    <View className="flex-row items-center mb-2">
                      <View className="w-10 h-10 bg-primary/20 rounded-full items-center justify-center">
                        <Ionicons name={metric.icon as any} size={20} color="#9D12DE" />
                      </View>
                      <View className="ml-3 flex-1">
                        <Text className="text-white font-bold">{metric.name}</Text>
                        <Text className="text-zinc-400 text-sm capitalize">
                          {metric.category}
                        </Text>
                      </View>
                    </View>

                    <View className="flex-row items-center justify-between">
                      <View>
                        <Text className="text-white font-bold text-2xl">
                          {metric.value} {metric.unit}
                        </Text>
                      </View>
                      <View
                        className="flex-row items-center px-3 py-1 rounded-full"
                        style={{ backgroundColor: getTrendColor(metric.trend) + '20' }}
                      >
                        <Ionicons
                          name={getTrendIcon(metric.trend) as any}
                          size={16}
                          color={getTrendColor(metric.trend)}
                        />
                        <Text
                          className="font-bold ml-1"
                          style={{ color: getTrendColor(metric.trend) }}
                        >
                          {metric.change > 0 ? '+' : ''}
                          {metric.change} {metric.unit}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* AI Insights */}
        <View className="px-6 pb-6">
          <Text className="text-white font-bold text-lg mb-3">
            Insights de IA
          </Text>

          <View className="bg-primary/10 rounded-xl p-4 mb-3 border border-primary/30">
            <View className="flex-row items-start">
              <Ionicons name="bulb" size={20} color="#9D12DE" />
              <View className="flex-1 ml-3">
                <Text className="text-primary font-bold mb-1">
                  Progreso Excelente en Fuerza
                </Text>
                <Text className="text-primary/80 text-sm">
                  Tu 1RM en sentadilla ha aumentado 10kg en 3 semanas. Continúa con este ritmo.
                </Text>
              </View>
            </View>
          </View>

          <View className="bg-amber-500/10 rounded-xl p-4 mb-3 border border-amber-500/30">
            <View className="flex-row items-start">
              <Ionicons name="warning" size={20} color="#FFEA00" />
              <View className="flex-1 ml-3">
                <Text className="text-amber-400 font-bold mb-1">
                  Atención al Cardio
                </Text>
                <Text className="text-amber-300 text-sm">
                  Tu VO2 Max ha bajado 2 puntos. Considera agregar más trabajo cardiovascular.
                </Text>
              </View>
            </View>
          </View>

          <View className="bg-primary/10 rounded-xl p-4 border border-primary/30">
            <View className="flex-row items-start">
              <Ionicons name="information-circle" size={20} color="#9D12DE" />
              <View className="flex-1 ml-3">
                <Text className="text-primary/80 font-bold mb-1">
                  Balance Muscular Ã“ptimo
                </Text>
                <Text className="text-primary/60 text-sm">
                  Tu composición corporal está mejorando. -0.8% grasa con +1.2kg masa muscular.
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}



