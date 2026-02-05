import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

interface TrendData {
  metric: string;
  current: number;
  previous: number;
  change: number;
  trend: 'up' | 'down' | 'stable';
  prediction: number;
}

export default function TrendAnalysis() {
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'quarter' | 'year'>('month');
  const [selectedMetric, setSelectedMetric] = useState<string>('volume');

  const screenWidth = Dimensions.get('window').width;

  const metrics = [
    { key: 'volume', label: 'Volume', icon: 'barbell', color: 'blue', unit: 'kg' },
    { key: 'strength', label: 'Strength', icon: 'fitness', color: 'red', unit: 'kg' },
    { key: 'bodyweight', label: 'Weight', icon: 'scale', color: 'emerald', unit: 'kg' },
    { key: 'bodyfat', label: 'Body Fat', icon: 'analytics', color: 'amber', unit: '%' },
  ];

  // Mock trend data
  const trends: { [key: string]: TrendData } = {
    volume: {
      metric: 'Total Volume',
      current: 48520,
      previous: 42380,
      change: 14.5,
      trend: 'up',
      prediction: 52340,
    },
    strength: {
      metric: 'Average Weight',
      current: 87.5,
      previous: 82.3,
      change: 6.3,
      trend: 'up',
      prediction: 91.2,
    },
    bodyweight: {
      metric: 'Body Weight',
      current: 78.2,
      previous: 76.8,
      change: 1.8,
      trend: 'up',
      prediction: 79.1,
    },
    bodyfat: {
      metric: 'Body Fat %',
      current: 14.2,
      previous: 15.8,
      change: -10.1,
      trend: 'down',
      prediction: 13.5,
    },
  };

  // Mock chart data
  const chartData = {
    week: {
      volume: [42000, 43500, 45200, 47100, 48520, 52340, 52340],
      strength: [82.3, 83.5, 85.2, 86.8, 87.5, 91.2, 91.2],
      bodyweight: [76.8, 77.1, 77.5, 77.9, 78.2, 79.1, 79.1],
      bodyfat: [15.8, 15.5, 15.1, 14.7, 14.2, 13.5, 13.5],
    },
    month: {
      volume: [38000, 40500, 42000, 45200, 48520, 52340],
      strength: [78.5, 80.2, 82.3, 85.2, 87.5, 91.2],
      bodyweight: [75.2, 75.8, 76.8, 77.5, 78.2, 79.1],
      bodyfat: [17.2, 16.5, 15.8, 15.1, 14.2, 13.5],
    },
    quarter: {
      volume: [32000, 35000, 38000, 42000, 45200, 48520, 52340],
      strength: [72.5, 75.0, 78.5, 82.3, 85.2, 87.5, 91.2],
      bodyweight: [73.5, 74.2, 75.2, 76.8, 77.5, 78.2, 79.1],
      bodyfat: [19.5, 18.5, 17.2, 15.8, 15.1, 14.2, 13.5],
    },
    year: {
      volume: [28000, 30000, 32000, 35000, 38000, 42000, 45200, 48520, 52340],
      strength: [68.0, 70.5, 72.5, 75.0, 78.5, 82.3, 85.2, 87.5, 91.2],
      bodyweight: [71.5, 72.2, 73.5, 74.2, 75.2, 76.8, 77.5, 78.2, 79.1],
      bodyfat: [22.0, 21.0, 19.5, 18.5, 17.2, 15.8, 15.1, 14.2, 13.5],
    },
  };

  const currentTrend = trends[selectedMetric];
  const currentMetric = metrics.find(m => m.key === selectedMetric)!;
  const data = chartData[selectedPeriod][selectedMetric];

  const getTrendIcon = (trend: string) => {
    if (trend === 'up') return selectedMetric === 'bodyfat' ? 'trending-down' : 'trending-up';
    if (trend === 'down') return selectedMetric === 'bodyfat' ? 'trending-up' : 'trending-down';
    return 'remove';
  };

  const getTrendColor = (trend: string) => {
    if (selectedMetric === 'bodyfat') {
      return trend === 'down' ? '#9D12DE' : trend === 'up' ? '#EF4444' : '#71717A';
    }
    return trend === 'up' ? '#9D12DE' : trend === 'down' ? '#EF4444' : '#71717A';
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
            Trend Analysis
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          {/* Info */}
          <View className="bg-gradient-to-r from-primary to-[#7D0EBE] rounded-xl p-6 mb-6">
            <Text className="text-white text-2xl font-bold mb-2">
              AnÃ¡lisis Predictivo
            </Text>
            <Text className="text-white opacity-90 mb-4">
              Tendencias y predicciones basadas en tu progreso
            </Text>
            <View className="flex-row items-center">
              <Ionicons name="trending-up" size={20} color="white" />
              <Text className="text-white ml-2">
                AI-powered insights
              </Text>
            </View>
          </View>

          {/* Metric Selection */}
          <Text className="text-white font-bold text-lg mb-3">MÃ©trica</Text>
          <View className="flex-row flex-wrap gap-2 mb-6">
            {metrics.map((metric) => (
              <TouchableOpacity
                key={metric.key}
                onPress={() => setSelectedMetric(metric.key)}
                className={`flex-1 min-w-[45%] rounded-xl p-4 border ${
                  selectedMetric === metric.key
                    ? `bg-${metric.color}-500 border-${metric.color}-500`
                    : 'bg-zinc-900 border-zinc-800'
                }`}
              >
                <Ionicons
                  name={metric.icon as any}
                  size={28}
                  color={selectedMetric === metric.key ? 'white' : '#71717A'}
                />
                <Text className={`font-bold mt-2 ${
                  selectedMetric === metric.key ? 'text-white' : 'text-zinc-400'
                }`}>
                  {metric.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Period Selection */}
          <Text className="text-white font-bold text-lg mb-3">Periodo</Text>
          <View className="flex-row gap-2 mb-6">
            {(['week', 'month', 'quarter', 'year'] as const).map((period) => (
              <TouchableOpacity
                key={period}
                onPress={() => setSelectedPeriod(period)}
                className={`flex-1 rounded-xl py-3 ${
                  selectedPeriod === period
                    ? 'bg-primary'
                    : 'bg-zinc-900 border border-zinc-800'
                }`}
              >
                <Text className={`text-center font-bold text-xs ${
                  selectedPeriod === period ? 'text-white' : 'text-zinc-400'
                }`}>
                  {period === 'week' ? 'Semana' : period === 'month' ? 'Mes' : period === 'quarter' ? 'Trimestre' : 'AÃ±o'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Current Stats */}
          <View className={`bg-${currentMetric.color}-500/10 rounded-xl p-5 mb-6 border border-${currentMetric.color}-500/30`}>
            <Text className={`text-${currentMetric.color}-400 font-bold mb-4`}>
              {currentTrend.metric}
            </Text>

            <View className="flex-row items-center justify-between mb-4">
              <View>
                <Text className="text-zinc-400 text-sm mb-1">Actual</Text>
                <Text className="text-white text-3xl font-bold">
                  {currentTrend.current.toLocaleString()} {currentMetric.unit}
                </Text>
              </View>

              <View className="items-end">
                <Text className="text-zinc-400 text-sm mb-1">Cambio</Text>
                <View className="flex-row items-center">
                  <Ionicons
                    name={getTrendIcon(currentTrend.trend) as any}
                    size={24}
                    color={getTrendColor(currentTrend.trend)}
                  />
                  <Text
                    className="text-2xl font-bold ml-1"
                    style={{ color: getTrendColor(currentTrend.trend) }}
                  >
                    {currentTrend.change > 0 ? '+' : ''}{currentTrend.change.toFixed(1)}%
                  </Text>
                </View>
              </View>
            </View>

            <View className={`bg-${currentMetric.color}-500/20 rounded-lg p-3`}>
              <Text className={`text-${currentMetric.color}-400 text-sm mb-1`}>
                PredicciÃ³n prÃ³ximo periodo
              </Text>
              <Text className={`text-${currentMetric.color}-300 text-xl font-bold`}>
                {currentTrend.prediction.toLocaleString()} {currentMetric.unit}
              </Text>
            </View>
          </View>

          {/* Chart */}
          <View className="bg-zinc-900 rounded-xl p-4 mb-6 border border-zinc-800">
            <Text className="text-white font-bold mb-4">Tendencia HistÃ³rica</Text>
            
            <LineChart
              data={{
                labels: selectedPeriod === 'week' 
                  ? ['L', 'M', 'X', 'J', 'V', 'S', 'D']
                  : selectedPeriod === 'month'
                  ? ['S1', 'S2', 'S3', 'S4', 'S5', 'S6']
                  : selectedPeriod === 'quarter'
                  ? ['M1', 'M2', 'M3']
                  : ['E', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S'],
                datasets: [
                  {
                    data: data,
                    color: (opacity = 1) => {
                      const colors = {
                        blue: `rgba(59, 130, 246, ${opacity})`,
                        red: `rgba(239, 68, 68, ${opacity})`,
                        emerald: `rgba(16, 185, 129, ${opacity})`,
                        amber: `rgba(245, 158, 11, ${opacity})`,
                      };
                      return colors[currentMetric.color] || colors.blue;
                    },
                    strokeWidth: 3,
                  },
                ],
              }}
              width={screenWidth - 80}
              height={220}
              chartConfig={{
                backgroundColor: '#18181B',
                backgroundGradientFrom: '#18181B',
                backgroundGradientTo: '#18181B',
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(161, 161, 170, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: '4',
                  strokeWidth: '2',
                },
              }}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
            />

            <View className="flex-row items-center justify-between mt-3">
              <View className="flex-row items-center">
                <View className={`w-3 h-3 bg-${currentMetric.color}-500 rounded-full mr-2`} />
                <Text className="text-zinc-400 text-sm">HistÃ³rico</Text>
              </View>
              <View className="flex-row items-center">
                <View className={`w-3 h-3 bg-${currentMetric.color}-500 rounded-full mr-2 opacity-50`} />
                <Text className="text-zinc-400 text-sm">PredicciÃ³n</Text>
              </View>
            </View>
          </View>

          {/* Insights */}
          <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
            <Text className="text-white font-bold text-lg mb-4">
              Insights & Recomendaciones
            </Text>

            {selectedMetric === 'volume' && (
              <>
                <View className="bg-primary/10 rounded-lg p-3 mb-3">
                  <View className="flex-row items-start">
                    <Ionicons name="checkmark-circle" size={20} color="#9D12DE" />
                    <Text className="text-primary ml-2 flex-1">
                      Volumen incrementando consistentemente (+14.5% este mes)
                    </Text>
                  </View>
                </View>

                <View className="bg-primary/10 rounded-lg p-3 mb-3">
                  <View className="flex-row items-start">
                    <Ionicons name="information-circle" size={20} color="#9D12DE" />
                    <Text className="text-primary/80 ml-2 flex-1">
                      Ritmo ideal para hypertrophy. MantÃ©n este progreso.
                    </Text>
                  </View>
                </View>

                <View className="bg-amber-500/10 rounded-lg p-3">
                  <View className="flex-row items-start">
                    <Ionicons name="warning" size={20} color="#FFEA00" />
                    <Text className="text-amber-400 ml-2 flex-1">
                      Considera deload week en 2-3 semanas para recovery.
                    </Text>
                  </View>
                </View>
              </>
            )}

            {selectedMetric === 'strength' && (
              <>
                <View className="bg-primary/10 rounded-lg p-3 mb-3">
                  <View className="flex-row items-start">
                    <Ionicons name="checkmark-circle" size={20} color="#9D12DE" />
                    <Text className="text-primary ml-2 flex-1">
                      Fuerza aumentando +6.3%. Excelente progresiÃ³n lineal.
                    </Text>
                  </View>
                </View>

                <View className="bg-primary/10 rounded-lg p-3">
                  <View className="flex-row items-start">
                    <Ionicons name="bulb" size={20} color="#9D12DE" />
                    <Text className="text-primary/80 ml-2 flex-1">
                      PrÃ³ximo objetivo: 95kg promedio. Alcanzable en 6-8 semanas.
                    </Text>
                  </View>
                </View>
              </>
            )}

            {selectedMetric === 'bodyweight' && (
              <>
                <View className="bg-primary/10 rounded-lg p-3 mb-3">
                  <View className="flex-row items-start">
                    <Ionicons name="checkmark-circle" size={20} color="#9D12DE" />
                    <Text className="text-primary ml-2 flex-1">
                      Ganancia de peso controlada +1.8%. Ideal para lean bulk.
                    </Text>
                  </View>
                </View>

                <View className="bg-primary/10 rounded-lg p-3">
                  <View className="flex-row items-start">
                    <Ionicons name="information-circle" size={20} color="#9D12DE" />
                    <Text className="text-primary/80 ml-2 flex-1">
                      Ritmo de 0.5-0.7kg/mes minimiza grasa. Perfecto.
                    </Text>
                  </View>
                </View>
              </>
            )}

            {selectedMetric === 'bodyfat' && (
              <>
                <View className="bg-primary/10 rounded-lg p-3 mb-3">
                  <View className="flex-row items-start">
                    <Ionicons name="checkmark-circle" size={20} color="#9D12DE" />
                    <Text className="text-primary ml-2 flex-1">
                      Grasa corporal bajando -10.1%. Excelente composiciÃ³n.
                    </Text>
                  </View>
                </View>

                <View className="bg-primary/10 rounded-lg p-3 mb-3">
                  <View className="flex-row items-start">
                    <Ionicons name="bulb" size={20} color="#9D12DE" />
                    <Text className="text-primary/80 ml-2 flex-1">
                      14.2% estÃ¡ en rango fitness. Meta 12-13% para definiciÃ³n.
                    </Text>
                  </View>
                </View>

                <View className="bg-amber-500/10 rounded-lg p-3">
                  <View className="flex-row items-start">
                    <Ionicons name="warning" size={20} color="#FFEA00" />
                    <Text className="text-amber-400 ml-2 flex-1">
                      No bajes mÃ¡s de 1% por mes para preservar mÃºsculo.
                    </Text>
                  </View>
                </View>
              </>
            )}
          </View>

          {/* Tips */}
          <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-6">
            <View className="flex-row items-start">
              <Ionicons name="analytics" size={20} color="#9D12DE" />
              <View className="flex-1 ml-3">
                <Text className="text-primary/80 font-bold mb-2">
                  Sobre el AnÃ¡lisis de Tendencias
                </Text>
                <Text className="text-primary/60 text-sm">
                  â€¢ Predicciones basadas en algoritmos ML{'\n'}
                  â€¢ Requiere mÃ­nimo 4 semanas de datos{'\n'}
                  â€¢ Tendencias ajustan por outliers{'\n'}
                  â€¢ MÃ¡s datos = predicciones mÃ¡s precisas{'\n'}
                  â€¢ Revisa insights semanalmente{'\n'}
                  â€¢ Ajusta plan segÃºn recomendaciones
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}


