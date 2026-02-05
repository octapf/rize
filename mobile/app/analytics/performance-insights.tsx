import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface PerformanceInsight {
  id: string;
  category: 'strength' | 'volume' | 'frequency' | 'recovery' | 'nutrition';
  title: string;
  description: string;
  severity: 'positive' | 'neutral' | 'warning' | 'critical';
  recommendation: string;
  impact: number;
  icon: string;
}

export default function PerformanceInsights() {
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const categories = [
    { key: 'all', label: 'Todos', icon: 'apps', color: 'blue' },
    { key: 'strength', label: 'Fuerza', icon: 'barbell', color: 'red' },
    { key: 'volume', label: 'Volumen', icon: 'fitness', color: 'purple' },
    { key: 'recovery', label: 'Recovery', icon: 'moon', color: 'emerald' },
    { key: 'nutrition', label: 'NutriciÃ³n', icon: 'nutrition', color: 'amber' },
  ];

  const insights: PerformanceInsight[] = [
    {
      id: '1',
      category: 'strength',
      title: 'Squat PR Inminente',
      description: 'Basado en tu progresiÃ³n lineal de las Ãºltimas 6 semanas (+2.5kg/semana), estÃ¡s cerca de un PR.',
      severity: 'positive',
      recommendation: 'Intenta 1RM de 140kg en tu prÃ³xima sesiÃ³n de pierna. Probabilidad de Ã©xito: 87%',
      impact: 95,
      icon: 'trending-up',
    },
    {
      id: '2',
      category: 'volume',
      title: 'Volumen de Pecho Bajo',
      description: 'Tu volumen semanal de pecho (12 sets) estÃ¡ 40% por debajo del rango Ã³ptimo para hypertrophy.',
      severity: 'warning',
      recommendation: 'Incrementa a 18-20 sets/semana. Agrega 2 sets de incline press y 2 sets de flies.',
      impact: 78,
      icon: 'warning',
    },
    {
      id: '3',
      category: 'recovery',
      title: 'Excelente RecuperaciÃ³n',
      description: 'Tus mÃ©tricas de recovery (sueÃ±o 8h, frecuencia cardÃ­aca 58 bpm) estÃ¡n Ã³ptimas.',
      severity: 'positive',
      recommendation: 'MantÃ©n tu rutina actual de sueÃ±o y nutriciÃ³n. Considera aumentar intensidad.',
      impact: 92,
      icon: 'checkmark-circle',
    },
    {
      id: '4',
      category: 'frequency',
      title: 'Frecuencia de Pierna SubÃ³ptima',
      description: 'Entrenas pierna solo 1x/semana. Para tus objetivos de hypertrophy, esto es insuficiente.',
      severity: 'critical',
      recommendation: 'Cambia a split de pierna 2x/semana (pesado + volumen). MejorarÃ¡ crecimiento 30-40%.',
      impact: 85,
      icon: 'alert-circle',
    },
    {
      id: '5',
      category: 'nutrition',
      title: 'ProteÃ­na Post-Workout Baja',
      description: 'Consumes solo 15g de proteÃ­na post-entrenamiento. Ã“ptimo es 25-40g.',
      severity: 'warning',
      recommendation: 'Agrega un scoop adicional de whey (25g) o equivalente en comida sÃ³lida.',
      impact: 68,
      icon: 'nutrition',
    },
    {
      id: '6',
      category: 'strength',
      title: 'Desbalance Push/Pull',
      description: 'Ratio de volumen Push:Pull es 1.8:1. Ideal es 1:1 o 1:1.2 para prevenir lesiones de hombro.',
      severity: 'warning',
      recommendation: 'Incrementa rows y pull-ups. Reduce press overhead en 10%.',
      impact: 72,
      icon: 'warning',
    },
    {
      id: '7',
      category: 'volume',
      title: 'Superando Rango de Volumen',
      description: 'Volumen total semanal de 32 sets estÃ¡ en el lÃ­mite superior. Riesgo de overtraining.',
      severity: 'warning',
      recommendation: 'MantÃ©n o reduce ligeramente. Monitorea fatiga y performance.',
      impact: 65,
      icon: 'alert',
    },
    {
      id: '8',
      category: 'recovery',
      title: 'Deload Recomendado',
      description: 'Llevas 8 semanas de progresiÃ³n lineal sin deload. Indicadores de fatiga acumulada detectados.',
      severity: 'critical',
      recommendation: 'Planea deload week prÃ³xima semana: reduce volumen 40-50%, mantÃ©n intensidad.',
      impact: 88,
      icon: 'moon',
    },
    {
      id: '9',
      category: 'nutrition',
      title: 'DÃ©ficit CalÃ³rico Muy Agresivo',
      description: 'Tu dÃ©ficit actual (-800 cal/dÃ­a) es muy alto para tu nivel de actividad.',
      severity: 'critical',
      recommendation: 'Reduce dÃ©ficit a -500 cal/dÃ­a para preservar mÃºsculo. PÃ©rdida mÃ¡s lenta pero sostenible.',
      impact: 80,
      icon: 'flame',
    },
    {
      id: '10',
      category: 'strength',
      title: 'ProgresiÃ³n Lineal Perfecta',
      description: 'Bench press aumentando 2.5kg cada 2 semanas. PatrÃ³n Ã³ptimo de progresiÃ³n.',
      severity: 'positive',
      recommendation: 'ContinÃºa con este protocolo hasta estancarte. Luego cambia a periodizaciÃ³n ondulante.',
      impact: 90,
      icon: 'trophy',
    },
  ];

  const filteredInsights = filterCategory === 'all'
    ? insights
    : insights.filter(i => i.category === filterCategory);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'positive': return 'emerald';
      case 'neutral': return 'blue';
      case 'warning': return 'amber';
      case 'critical': return 'red';
      default: return 'zinc';
    }
  };

  const getSeverityLabel = (severity: string) => {
    switch (severity) {
      case 'positive': return 'POSITIVO';
      case 'neutral': return 'INFO';
      case 'warning': return 'ALERTA';
      case 'critical': return 'CRÃTICO';
      default: return '';
    }
  };

  const stats = {
    total: insights.length,
    positive: insights.filter(i => i.severity === 'positive').length,
    warnings: insights.filter(i => i.severity === 'warning').length,
    critical: insights.filter(i => i.severity === 'critical').length,
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
            Performance Insights
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          {/* Info */}
          <View className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-6 mb-6">
            <Text className="text-white text-2xl font-bold mb-2">
              AI Performance Coach
            </Text>
            <Text className="text-white opacity-90 mb-4">
              Recomendaciones personalizadas basadas en tus datos
            </Text>
            <View className="flex-row items-center">
              <Ionicons name="bulb" size={20} color="white" />
              <Text className="text-white ml-2">
                {stats.total} insights generados
              </Text>
            </View>
          </View>

          {/* Stats Cards */}
          <View className="flex-row gap-3 mb-6">
            <View className="flex-1 bg-primary/10 rounded-xl p-4 border border-primary/30">
              <Ionicons name="checkmark-circle" size={24} color="#9D12DE" />
              <Text className="text-primary font-bold text-2xl mt-2">{stats.positive}</Text>
              <Text className="text-primary/80 text-sm">Positivos</Text>
            </View>

            <View className="flex-1 bg-amber-500/10 rounded-xl p-4 border border-amber-500/30">
              <Ionicons name="warning" size={24} color="#FFEA00" />
              <Text className="text-amber-400 font-bold text-2xl mt-2">{stats.warnings}</Text>
              <Text className="text-amber-300 text-sm">Alertas</Text>
            </View>

            <View className="flex-1 bg-red-500/10 rounded-xl p-4 border border-red-500/30">
              <Ionicons name="alert-circle" size={24} color="#EF4444" />
              <Text className="text-red-400 font-bold text-2xl mt-2">{stats.critical}</Text>
              <Text className="text-red-300 text-sm">CrÃ­ticos</Text>
            </View>
          </View>

          {/* Category Filter */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mb-6"
          >
            <View className="flex-row gap-2">
              {categories.map((cat) => (
                <TouchableOpacity
                  key={cat.key}
                  onPress={() => setFilterCategory(cat.key)}
                  className={`rounded-xl px-4 py-3 flex-row items-center ${
                    filterCategory === cat.key
                      ? `bg-${cat.color}-500`
                      : 'bg-zinc-900 border border-zinc-800'
                  }`}
                >
                  <Ionicons
                    name={cat.icon as any}
                    size={18}
                    color={filterCategory === cat.key ? 'white' : '#71717A'}
                  />
                  <Text className={`ml-2 font-bold ${
                    filterCategory === cat.key ? 'text-white' : 'text-zinc-400'
                  }`}>
                    {cat.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          {/* Insights List */}
          {filteredInsights.map((insight) => {
            const color = getSeverityColor(insight.severity);

            return (
              <View
                key={insight.id}
                className={`bg-${color}-500/10 rounded-xl p-5 mb-4 border border-${color}-500/30`}
              >
                <View className="flex-row items-start mb-3">
                  <View className={`w-12 h-12 bg-${color}-500 rounded-xl items-center justify-center mr-4`}>
                    <Ionicons name={insight.icon as any} size={24} color="white" />
                  </View>

                  <View className="flex-1">
                    <View className="flex-row items-center mb-2">
                      <Text className="text-white font-bold text-lg flex-1">
                        {insight.title}
                      </Text>
                      <View className={`bg-${color}-500 rounded-full px-3 py-1`}>
                        <Text className="text-white text-xs font-bold">
                          {getSeverityLabel(insight.severity)}
                        </Text>
                      </View>
                    </View>

                    <Text className="text-zinc-400 text-sm mb-3">
                      {insight.description}
                    </Text>

                    <View className={`bg-${color}-500/20 rounded-lg p-3`}>
                      <Text className={`text-${color}-400 font-bold text-sm mb-1`}>
                        RecomendaciÃ³n:
                      </Text>
                      <Text className={`text-${color}-300 text-sm`}>
                        {insight.recommendation}
                      </Text>
                    </View>

                    {/* Impact Score */}
                    <View className="mt-3">
                      <View className="flex-row items-center justify-between mb-1">
                        <Text className={`text-${color}-400 text-xs font-bold`}>
                          Impacto Potencial
                        </Text>
                        <Text className={`text-${color}-400 text-xs font-bold`}>
                          {insight.impact}%
                        </Text>
                      </View>
                      <View className={`h-2 bg-${color}-500/20 rounded-full overflow-hidden`}>
                        <View
                          className={`h-full bg-${color}-500 rounded-full`}
                          style={{ width: `${insight.impact}%` }}
                        />
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            );
          })}

          {/* Tips */}
          <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-6">
            <View className="flex-row items-start">
              <Ionicons name="information-circle" size={20} color="#9D12DE" />
              <View className="flex-1 ml-3">
                <Text className="text-primary/80 font-bold mb-2">
                  Sobre Performance Insights
                </Text>
                <Text className="text-primary/60 text-sm">
                  â€¢ Actualizados diariamente basado en tus datos{'\n'}
                  â€¢ Algoritmos ML detectan patrones y oportunidades{'\n'}
                  â€¢ Prioriza insights crÃ­ticos primero{'\n'}
                  â€¢ Implementa 1-2 recomendaciones a la vez{'\n'}
                  â€¢ Insights positivos = sigue haciendo lo mismo{'\n'}
                  â€¢ Re-evalÃºa cada 2 semanas despuÃ©s de cambios
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}


