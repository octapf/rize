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
import { LinearGradient } from 'expo-linear-gradient';
import { Card } from '@/components/ui/Card';
import { LineChart, BarChart, PieChart } from 'react-native-chart-kit';
import { format, subDays } from 'date-fns';
import { es } from 'date-fns/locale';

const screenWidth = Dimensions.get('window').width;

export default function StatsDashboardScreen() {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('month');

  // Mock data
  const volumeData = {
    labels: ['Lun', 'Mar', 'MiÃ©', 'Jue', 'Vie', 'SÃ¡b', 'Dom'],
    datasets: [
      {
        data: [3200, 4100, 0, 5200, 4800, 0, 6100],
        color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
        strokeWidth: 3,
      },
    ],
  };

  const muscleGroupData = {
    labels: ['Pecho', 'Espalda', 'Piernas', 'Hombros', 'Brazos'],
    datasets: [{ data: [25, 22, 30, 12, 11] }],
  };

  const workoutDistribution = [
    { name: 'Fuerza', population: 45, color: '#9D12DE', legendFontColor: '#1F2937' },
    { name: 'Cardio', population: 15, color: '#9D12DE', legendFontColor: '#1F2937' },
    { name: 'HIIT', population: 20, color: '#FFEA00', legendFontColor: '#1F2937' },
    { name: 'Flexibilidad', population: 10, color: '#8B5CF6', legendFontColor: '#1F2937' },
    { name: 'Otros', population: 10, color: '#6B7280', legendFontColor: '#1F2937' },
  ];

  const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(107, 114, 128, ${opacity})`,
    style: { borderRadius: 16 },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#9D12DE',
    },
  };

  const stats = [
    { label: 'Total Entrenamientos', value: '124', icon: 'fitness', color: '#9D12DE', change: '+12%' },
    { label: 'Volumen Total', value: '85.2K kg', icon: 'barbell', color: '#9D12DE', change: '+8%' },
    { label: 'Tiempo Total', value: '62h', icon: 'time', color: '#FFEA00', change: '+5%' },
    { label: 'Racha Actual', value: '15 dÃ­as', icon: 'flame', color: '#EF4444', change: '+3' },
  ];

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <LinearGradient colors={['#9D12DE', '#7C3AED']} className="px-6 pt-12 pb-6">
        <View className="flex-row items-center justify-between mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={28} color="white" />
          </TouchableOpacity>
          <Text className="text-2xl font-bold text-white">EstadÃ­sticas</Text>
          <TouchableOpacity>
            <Ionicons name="share-outline" size={28} color="white" />
          </TouchableOpacity>
        </View>

        {/* Time Range */}
        <View className="flex-row gap-2">
          {(['week', 'month', 'year'] as const).map((range) => (
            <TouchableOpacity
              key={range}
              onPress={() => setTimeRange(range)}
              className={`flex-1 py-2 rounded-lg ${
                timeRange === range ? 'bg-white' : 'bg-white/20'
              }`}
            >
              <Text
                className={`text-center font-bold ${
                  timeRange === range ? 'text-primary' : 'text-white'
                }`}
              >
                {range === 'week' ? 'Semana' : range === 'month' ? 'Mes' : 'AÃ±o'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </LinearGradient>

      <ScrollView className="flex-1" contentContainerClassName="p-4">
        {/* Key Stats */}
        <View className="flex-row flex-wrap gap-3 mb-4">
          {stats.map((stat, index) => (
            <Card key={index} className="flex-1 min-w-[48%] p-4">
              <View className="flex-row items-center justify-between mb-2">
                <View
                  className="w-10 h-10 rounded-full items-center justify-center"
                  style={{ backgroundColor: `${stat.color}20` }}
                >
                  <Ionicons name={stat.icon as any} size={22} color={stat.color} />
                </View>
                <View className="bg-primary/10 px-2 py-1 rounded">
                  <Text className="text-primary font-bold text-xs">
                    {stat.change}
                  </Text>
                </View>
              </View>
              <Text className="text-gray-600 text-xs">{stat.label}</Text>
              <Text className="text-gray-900 font-bold text-2xl mt-1">
                {stat.value}
              </Text>
            </Card>
          ))}
        </View>

        {/* Volume Chart */}
        <Card className="p-4 mb-4">
          <Text className="text-gray-900 font-bold text-lg mb-4">
            Volumen Semanal
          </Text>
          <LineChart
            data={volumeData}
            width={screenWidth - 64}
            height={220}
            chartConfig={chartConfig}
            bezier
            style={{ borderRadius: 16 }}
            yAxisSuffix="kg"
          />
        </Card>

        {/* Muscle Group Distribution */}
        <Card className="p-4 mb-4">
          <Text className="text-gray-900 font-bold text-lg mb-4">
            DistribuciÃ³n por Grupo Muscular
          </Text>
          <BarChart
            data={muscleGroupData}
            width={screenWidth - 64}
            height={220}
            chartConfig={chartConfig}
            style={{ borderRadius: 16 }}
            yAxisSuffix="%"
            showValuesOnTopOfBars
          />
        </Card>

        {/* Workout Type Distribution */}
        <Card className="p-4 mb-4">
          <Text className="text-gray-900 font-bold text-lg mb-4">
            Tipos de Entrenamiento
          </Text>
          <PieChart
            data={workoutDistribution}
            width={screenWidth - 64}
            height={200}
            chartConfig={chartConfig}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            style={{ borderRadius: 16 }}
          />
        </Card>

        {/* Progress Insights */}
        <Card className="p-4 mb-4">
          <View className="flex-row items-center gap-3 mb-4">
            <View className="bg-primary w-10 h-10 rounded-full items-center justify-center">
              <Ionicons name="bulb" size={24} color="white" />
            </View>
            <Text className="flex-1 text-gray-900 font-bold text-lg">
              Insights de Progreso
            </Text>
          </View>

          <View className="gap-3">
            <View className="flex-row items-start gap-3">
              <View className="bg-primary/10 p-2 rounded-full">
                <Ionicons name="trending-up" size={20} color="#9D12DE" />
              </View>
              <View className="flex-1">
                <Text className="text-gray-900 font-semibold">
                  Volumen en aumento
                </Text>
                <Text className="text-gray-600 text-sm">
                  Tu volumen total ha aumentado un 12% este mes
                </Text>
              </View>
            </View>

            <View className="flex-row items-start gap-3">
              <View className="bg-primary/10 p-2 rounded-full">
                <Ionicons name="flame" size={20} color="#9D12DE" />
              </View>
              <View className="flex-1">
                <Text className="text-gray-900 font-semibold">
                  Racha impresionante
                </Text>
                <Text className="text-gray-600 text-sm">
                  15 dÃ­as consecutivos entrenando. Â¡Sigue asÃ­!
                </Text>
              </View>
            </View>

            <View className="flex-row items-start gap-3">
              <View className="bg-amber-100 p-2 rounded-full">
                <Ionicons name="alert-circle" size={20} color="#FFEA00" />
              </View>
              <View className="flex-1">
                <Text className="text-gray-900 font-semibold">
                  DÃ­a de descanso recomendado
                </Text>
                <Text className="text-gray-600 text-sm">
                  Has entrenado piernas 3 veces esta semana
                </Text>
              </View>
            </View>
          </View>
        </Card>

        {/* Personal Records */}
        <Card className="p-4 mb-4">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-gray-900 font-bold text-lg">
              RÃ©cords Personales Recientes
            </Text>
            <TouchableOpacity onPress={() => router.push('/records')}>
              <Text className="text-primary font-semibold">Ver todos</Text>
            </TouchableOpacity>
          </View>

          <View className="gap-3">
            {[
              { exercise: 'Bench Press', weight: '100kg', date: '3 dÃ­as atrÃ¡s' },
              { exercise: 'Sentadilla', weight: '140kg', date: '1 semana atrÃ¡s' },
              { exercise: 'Peso Muerto', weight: '160kg', date: '2 semanas atrÃ¡s' },
            ].map((pr, index) => (
              <View
                key={index}
                className="flex-row items-center justify-between p-3 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg"
              >
                <View className="flex-1">
                  <Text className="text-gray-900 font-bold">
                    {pr.exercise}
                  </Text>
                  <Text className="text-gray-600 text-sm">
                    {pr.date}
                  </Text>
                </View>
                <View className="items-end">
                  <Text className="text-orange-600 font-bold text-xl">
                    {pr.weight}
                  </Text>
                  <View className="bg-orange-100 px-2 py-1 rounded">
                    <Text className="text-orange-700 font-bold text-xs">
                      PR
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </Card>
      </ScrollView>
    </View>
  );
}


