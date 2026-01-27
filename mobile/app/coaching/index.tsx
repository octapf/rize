import React, { useState, useEffect } from 'react';
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

interface WorkoutRecommendation {
  id: string;
  title: string;
  reason: string;
  type: 'increase' | 'decrease' | 'deload' | 'maintain';
  priority: 'high' | 'medium' | 'low';
  action: string;
  icon: string;
  color: string;
}

interface RecoveryMetric {
  name: string;
  value: number;
  maxValue: number;
  status: 'good' | 'moderate' | 'poor';
  icon: string;
}

interface CoachingInsight {
  id: string;
  category: string;
  message: string;
  impact: 'positive' | 'negative' | 'neutral';
  icon: string;
}

const RECOMMENDATIONS: WorkoutRecommendation[] = [
  {
    id: '1',
    title: 'Aumentar volumen de tracción',
    reason: 'Has progresado consistentemente en dominadas las últimas 4 semanas',
    type: 'increase',
    priority: 'high',
    action: '+2 series de pull-ups',
    icon: 'trending-up',
    color: '#10B981',
  },
  {
    id: '2',
    title: 'Considera un deload',
    reason: 'Tu RIR promedio ha bajado de 3 a 1 en ejercicios de empuje',
    type: 'deload',
    priority: 'high',
    action: 'Reducir 20-30% volumen esta semana',
    icon: 'warning',
    color: '#F59E0B',
  },
  {
    id: '3',
    title: 'Mantén intensidad actual',
    reason: 'Estás progresando a un ritmo sostenible en piernas',
    type: 'maintain',
    priority: 'medium',
    action: 'Continuar con el plan actual',
    icon: 'checkmark-circle',
    color: '#3B82F6',
  },
  {
    id: '4',
    title: 'Reducir frecuencia de press',
    reason: 'No has recuperado fuerza en press desde hace 2 semanas',
    type: 'decrease',
    priority: 'medium',
    action: '2 sesiones semanales → 1 sesión',
    icon: 'trending-down',
    color: '#EF4444',
  },
];

const RECOVERY_METRICS: RecoveryMetric[] = [
  {
    name: 'Calidad de sueño',
    value: 7.2,
    maxValue: 10,
    status: 'good',
    icon: 'moon',
  },
  {
    name: 'Dolor muscular',
    value: 4.5,
    maxValue: 10,
    status: 'moderate',
    icon: 'body',
  },
  {
    name: 'Energía general',
    value: 6.8,
    maxValue: 10,
    status: 'good',
    icon: 'flash',
  },
  {
    name: 'Estrés percibido',
    value: 6.2,
    maxValue: 10,
    status: 'moderate',
    icon: 'pulse',
  },
];

const INSIGHTS: CoachingInsight[] = [
  {
    id: '1',
    category: 'Volumen',
    message: 'Tu volumen semanal (68 series) está dentro del rango óptimo para hipertrofia',
    impact: 'positive',
    icon: 'analytics',
  },
  {
    id: '2',
    category: 'Recuperación',
    message: 'Descansaste solo 6h promedio esta semana. Intenta 7-9h para mejor recuperación',
    impact: 'negative',
    icon: 'bed',
  },
  {
    id: '3',
    category: 'Progresión',
    message: 'Has aumentado el peso en 3 ejercicios clave este mes. ¡Excelente progreso!',
    impact: 'positive',
    icon: 'trophy',
  },
  {
    id: '4',
    category: 'Balance',
    message: 'Ratio tracción/empuje está equilibrado (1.1:1)',
    impact: 'positive',
    icon: 'scale',
  },
];

export default function VirtualCoach() {
  const [selectedTab, setSelectedTab] = useState<'recommendations' | 'recovery' | 'insights'>('recommendations');
  const [performanceScore, setPerformanceScore] = useState(78);

  const tabs = [
    { id: 'recommendations' as const, label: 'Recomendaciones', icon: 'bulb' },
    { id: 'recovery' as const, label: 'Recuperación', icon: 'heart' },
    { id: 'insights' as const, label: 'Insights', icon: 'analytics' },
  ];

  // Mock performance data
  const performanceData = {
    labels: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4'],
    datasets: [
      {
        data: [72, 75, 76, 78],
        color: (opacity = 1) => `rgba(16, 185, 129, ${opacity})`,
        strokeWidth: 3,
      },
    ],
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good':
        return '#10B981';
      case 'moderate':
        return '#F59E0B';
      case 'poor':
        return '#EF4444';
      default:
        return '#71717A';
    }
  };

  const getPriorityBadgeColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500/20';
      case 'medium':
        return 'bg-amber-500/20';
      case 'low':
        return 'bg-blue-500/20';
      default:
        return 'bg-zinc-500/20';
    }
  };

  const getPriorityTextColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-500';
      case 'medium':
        return 'text-amber-500';
      case 'low':
        return 'text-blue-500';
      default:
        return 'text-zinc-500';
    }
  };

  return (
    <View className="flex-1 bg-zinc-950">
      {/* Header */}
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center justify-between mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1 ml-3">
            Entrenador Virtual
          </Text>
          <TouchableOpacity>
            <Ionicons name="settings-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Performance Score */}
        <View className="bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-xl p-4 border border-emerald-500/30">
          <View className="flex-row items-center justify-between mb-2">
            <View>
              <Text className="text-zinc-400 text-sm">Performance Score</Text>
              <View className="flex-row items-end">
                <Text className="text-white text-4xl font-bold">{performanceScore}</Text>
                <Text className="text-emerald-500 text-lg font-bold mb-1 ml-2">
                  /100
                </Text>
              </View>
            </View>
            <View className="bg-emerald-500 w-16 h-16 rounded-full items-center justify-center">
              <Ionicons name="trophy" size={32} color="white" />
            </View>
          </View>
          <Text className="text-zinc-300 text-sm">
            +6 puntos respecto a la semana pasada
          </Text>
        </View>
      </View>

      {/* Tabs */}
      <View className="flex-row px-6 pt-4 border-b border-zinc-800">
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            onPress={() => setSelectedTab(tab.id)}
            className={`flex-1 pb-3 border-b-2 ${
              selectedTab === tab.id ? 'border-emerald-500' : 'border-transparent'
            }`}
          >
            <View className="flex-row items-center justify-center">
              <Ionicons
                name={tab.icon as any}
                size={18}
                color={selectedTab === tab.id ? '#10B981' : '#71717A'}
              />
              <Text
                className={`ml-2 font-semibold ${
                  selectedTab === tab.id ? 'text-emerald-500' : 'text-zinc-400'
                }`}
              >
                {tab.label}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Recommendations Tab */}
        {selectedTab === 'recommendations' && (
          <View className="px-6 py-4">
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-white font-bold text-lg">
                Ajustes Recomendados
              </Text>
              <View className="bg-emerald-500/20 px-3 py-1 rounded-full">
                <Text className="text-emerald-500 text-sm font-bold">
                  {RECOMMENDATIONS.length} nuevas
                </Text>
              </View>
            </View>

            {RECOMMENDATIONS.map((rec) => (
              <View
                key={rec.id}
                className="bg-zinc-900 rounded-xl p-4 mb-3 border border-zinc-800"
              >
                <View className="flex-row items-start justify-between mb-2">
                  <View className="flex-1">
                    <View className="flex-row items-center mb-2">
                      <View
                        className="w-8 h-8 rounded-lg items-center justify-center"
                        style={{ backgroundColor: rec.color + '20' }}
                      >
                        <Ionicons name={rec.icon as any} size={18} color={rec.color} />
                      </View>
                      <Text className="text-white font-bold ml-2 flex-1">
                        {rec.title}
                      </Text>
                    </View>
                    <Text className="text-zinc-400 text-sm leading-5 mb-3">
                      {rec.reason}
                    </Text>
                    <View className="bg-zinc-800 rounded-lg p-3">
                      <Text className="text-zinc-300 text-sm font-semibold">
                        Acción sugerida:
                      </Text>
                      <Text className="text-white text-sm mt-1">{rec.action}</Text>
                    </View>
                  </View>
                </View>

                <View className="flex-row items-center justify-between mt-3 pt-3 border-t border-zinc-800">
                  <View className={`px-2 py-1 rounded ${getPriorityBadgeColor(rec.priority)}`}>
                    <Text className={`text-xs font-bold ${getPriorityTextColor(rec.priority)}`}>
                      {rec.priority === 'high' ? 'Prioridad Alta' : rec.priority === 'medium' ? 'Prioridad Media' : 'Prioridad Baja'}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() =>
                      Alert.alert('Aplicar cambio', `¿Aplicar "${rec.action}"?`, [
                        { text: 'Cancelar', style: 'cancel' },
                        {
                          text: 'Aplicar',
                          onPress: () =>
                            Alert.alert('¡Listo!', 'Cambio aplicado a tu plan'),
                        },
                      ])
                    }
                    className="bg-emerald-500 px-4 py-2 rounded-lg"
                  >
                    <Text className="text-white font-semibold text-sm">Aplicar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Recovery Tab */}
        {selectedTab === 'recovery' && (
          <View className="px-6 py-4">
            <Text className="text-white font-bold text-lg mb-4">
              Estado de Recuperación
            </Text>

            {/* Recovery Metrics */}
            {RECOVERY_METRICS.map((metric, index) => (
              <View
                key={index}
                className="bg-zinc-900 rounded-xl p-4 mb-3 border border-zinc-800"
              >
                <View className="flex-row items-center justify-between mb-3">
                  <View className="flex-row items-center flex-1">
                    <Ionicons
                      name={metric.icon as any}
                      size={24}
                      color={getStatusColor(metric.status)}
                    />
                    <Text className="text-white font-semibold ml-3">
                      {metric.name}
                    </Text>
                  </View>
                  <Text className="text-white font-bold text-lg">
                    {metric.value.toFixed(1)}/{metric.maxValue}
                  </Text>
                </View>

                {/* Progress Bar */}
                <View className="bg-zinc-800 h-2 rounded-full overflow-hidden">
                  <View
                    className="h-full rounded-full"
                    style={{
                      width: `${(metric.value / metric.maxValue) * 100}%`,
                      backgroundColor: getStatusColor(metric.status),
                    }}
                  />
                </View>
              </View>
            ))}

            {/* Deload Suggestion */}
            <View className="bg-amber-500/10 rounded-xl p-4 border border-amber-500/30 mt-3">
              <View className="flex-row items-start">
                <Ionicons name="warning" size={24} color="#F59E0B" />
                <View className="flex-1 ml-3">
                  <Text className="text-amber-500 font-bold mb-2">
                    Considera un Deload
                  </Text>
                  <Text className="text-amber-300 text-sm leading-5">
                    Tu puntuación de recuperación está por debajo del 70%. Un deload
                    de una semana te ayudará a volver más fuerte.
                  </Text>
                  <TouchableOpacity className="bg-amber-500 rounded-lg p-3 mt-3">
                    <Text className="text-white font-semibold text-center">
                      Generar Semana de Deload
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* Sleep Tracker */}
            <View className="bg-zinc-900 rounded-xl p-4 border border-zinc-800 mt-3">
              <View className="flex-row items-center justify-between mb-3">
                <Text className="text-white font-bold">Tendencia de Sueño</Text>
                <Text className="text-zinc-400 text-sm">Últimos 7 días</Text>
              </View>
              <View className="flex-row items-end justify-between">
                {[6.5, 7, 6, 7.5, 8, 6.5, 7.2].map((hours, index) => (
                  <View key={index} className="items-center">
                    <View
                      className={`w-8 rounded-t ${
                        hours >= 7 ? 'bg-emerald-500' : 'bg-red-500'
                      }`}
                      style={{ height: hours * 10 }}
                    />
                    <Text className="text-zinc-500 text-xs mt-1">
                      {['L', 'M', 'X', 'J', 'V', 'S', 'D'][index]}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        )}

        {/* Insights Tab */}
        {selectedTab === 'insights' && (
          <View className="px-6 py-4">
            <Text className="text-white font-bold text-lg mb-4">
              Análisis Inteligente
            </Text>

            {/* Performance Chart */}
            <View className="bg-zinc-900 rounded-xl p-4 mb-4 border border-zinc-800">
              <Text className="text-white font-bold mb-3">
                Evolución de Performance
              </Text>
              <LineChart
                data={performanceData}
                width={screenWidth - 80}
                height={180}
                chartConfig={{
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
                    stroke: '#10B981',
                  },
                }}
                bezier
                style={{
                  marginVertical: 8,
                  borderRadius: 16,
                }}
              />
            </View>

            {/* Insights */}
            {INSIGHTS.map((insight) => (
              <View
                key={insight.id}
                className={`rounded-xl p-4 mb-3 border ${
                  insight.impact === 'positive'
                    ? 'bg-emerald-500/10 border-emerald-500/30'
                    : insight.impact === 'negative'
                    ? 'bg-red-500/10 border-red-500/30'
                    : 'bg-blue-500/10 border-blue-500/30'
                }`}
              >
                <View className="flex-row items-start">
                  <Ionicons
                    name={insight.icon as any}
                    size={24}
                    color={
                      insight.impact === 'positive'
                        ? '#10B981'
                        : insight.impact === 'negative'
                        ? '#EF4444'
                        : '#3B82F6'
                    }
                  />
                  <View className="flex-1 ml-3">
                    <Text
                      className={`font-bold mb-1 ${
                        insight.impact === 'positive'
                          ? 'text-emerald-500'
                          : insight.impact === 'negative'
                          ? 'text-red-500'
                          : 'text-blue-500'
                      }`}
                    >
                      {insight.category}
                    </Text>
                    <Text
                      className={`text-sm leading-5 ${
                        insight.impact === 'positive'
                          ? 'text-emerald-300'
                          : insight.impact === 'negative'
                          ? 'text-red-300'
                          : 'text-blue-300'
                      }`}
                    >
                      {insight.message}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}
