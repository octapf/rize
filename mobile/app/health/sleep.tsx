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

interface SleepSession {
  id: string;
  date: string;
  bedTime: string;
  wakeTime: string;
  totalHours: number;
  quality: 'poor' | 'fair' | 'good' | 'excellent';
  deepSleep: number;
  lightSleep: number;
  remSleep: number;
  awakenings: number;
  sleepScore: number;
  notes?: string;
}

interface WeeklySleepStats {
  avgHours: number;
  avgQuality: number;
  bestNight: string;
  worstNight: string;
  consistency: number;
}

const SLEEP_HISTORY: SleepSession[] = [
  {
    id: '1',
    date: '2025-01-27',
    bedTime: '22:30',
    wakeTime: '06:45',
    totalHours: 8.25,
    quality: 'excellent',
    deepSleep: 2.5,
    lightSleep: 4.5,
    remSleep: 1.25,
    awakenings: 1,
    sleepScore: 92,
    notes: 'Excelente recuperaciÃ³n post leg day',
  },
  {
    id: '2',
    date: '2025-01-26',
    bedTime: '23:15',
    wakeTime: '07:00',
    totalHours: 7.75,
    quality: 'good',
    deepSleep: 2.2,
    lightSleep: 4.3,
    remSleep: 1.25,
    awakenings: 2,
    sleepScore: 85,
  },
  {
    id: '3',
    date: '2025-01-25',
    bedTime: '22:00',
    wakeTime: '06:30',
    totalHours: 8.5,
    quality: 'excellent',
    deepSleep: 2.8,
    lightSleep: 4.4,
    remSleep: 1.3,
    awakenings: 0,
    sleepScore: 95,
  },
  {
    id: '4',
    date: '2025-01-24',
    bedTime: '23:45',
    wakeTime: '07:15',
    totalHours: 7.5,
    quality: 'fair',
    deepSleep: 1.8,
    lightSleep: 4.5,
    remSleep: 1.2,
    awakenings: 3,
    sleepScore: 72,
    notes: 'DormÃ­ tarde, muchas interrupciones',
  },
  {
    id: '5',
    date: '2025-01-23',
    bedTime: '22:30',
    wakeTime: '06:00',
    totalHours: 7.5,
    quality: 'good',
    deepSleep: 2.1,
    lightSleep: 4.2,
    remSleep: 1.2,
    awakenings: 1,
    sleepScore: 82,
  },
  {
    id: '6',
    date: '2025-01-22',
    bedTime: '23:00',
    wakeTime: '05:30',
    totalHours: 6.5,
    quality: 'poor',
    deepSleep: 1.5,
    lightSleep: 4.0,
    remSleep: 1.0,
    awakenings: 4,
    sleepScore: 58,
    notes: 'Poco sueÃ±o profundo, me sentÃ­ cansado',
  },
  {
    id: '7',
    date: '2025-01-21',
    bedTime: '22:15',
    wakeTime: '06:45',
    totalHours: 8.5,
    quality: 'excellent',
    deepSleep: 2.7,
    lightSleep: 4.5,
    remSleep: 1.3,
    awakenings: 1,
    sleepScore: 93,
  },
];

const WEEKLY_STATS: WeeklySleepStats = {
  avgHours: 7.8,
  avgQuality: 83,
  bestNight: '2025-01-25',
  worstNight: '2025-01-22',
  consistency: 78,
};

export default function SleepTracker() {
  const [sleepHistory] = useState(SLEEP_HISTORY);
  const [weeklyStats] = useState(WEEKLY_STATS);
  const [activeTab, setActiveTab] = useState<'log' | 'insights'>('log');

  const logSleep = () => {
    Alert.alert(
      'Registrar SueÃ±o',
      'Ingresa tus horas de sueÃ±o de anoche',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Registrar',
          onPress: () => Alert.alert('SueÃ±o registrado'),
        },
      ]
    );
  };

  const getQualityColor = (quality: string) => {
    switch (quality) {
      case 'excellent':
        return 'text-primary';
      case 'good':
        return 'text-primary/80';
      case 'fair':
        return 'text-amber-400';
      case 'poor':
        return 'text-red-400';
      default:
        return 'text-zinc-400';
    }
  };

  const getQualityLabel = (quality: string) => {
    switch (quality) {
      case 'excellent':
        return 'Excelente';
      case 'good':
        return 'Bueno';
      case 'fair':
        return 'Regular';
      case 'poor':
        return 'Pobre';
      default:
        return quality;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-primary';
    if (score >= 70) return 'text-primary/80';
    if (score >= 60) return 'text-amber-400';
    return 'text-red-400';
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
            Seguimiento de SueÃ±o
          </Text>
          <TouchableOpacity onPress={logSleep}>
            <Ionicons name="bed" size={28} color="#9D12DE" />
          </TouchableOpacity>
        </View>

        {/* Summary Card */}
        <View className="bg-zinc-900 rounded-xl p-4 border border-zinc-800 mb-4">
          <View className="flex-row items-center justify-between">
            <View className="flex-1">
              <Text className="text-zinc-400 text-xs mb-1">ÃšLTIMA NOCHE</Text>
              <Text className="text-white text-3xl font-bold">
                {sleepHistory[0].totalHours}h
              </Text>
            </View>
            <View className="flex-1">
              <Text className="text-zinc-400 text-xs mb-1">PROMEDIO 7D</Text>
              <Text className="text-primary text-3xl font-bold">
                {weeklyStats.avgHours}h
              </Text>
            </View>
            <View className="flex-1">
              <Text className="text-zinc-400 text-xs mb-1">SCORE</Text>
              <Text className={`text-3xl font-bold ${getScoreColor(sleepHistory[0].sleepScore)}`}>
                {sleepHistory[0].sleepScore}
              </Text>
            </View>
          </View>
        </View>

        {/* Tabs */}
        <View className="flex-row gap-2">
          <TouchableOpacity
            onPress={() => setActiveTab('log')}
            className={`flex-1 py-3 rounded-lg ${
              activeTab === 'log' ? 'bg-primary' : 'bg-zinc-900 border border-zinc-800'
            }`}
          >
            <Text
              className={`text-center font-bold ${
                activeTab === 'log' ? 'text-white' : 'text-zinc-400'
              }`}
            >
              Historial
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveTab('insights')}
            className={`flex-1 py-3 rounded-lg ${
              activeTab === 'insights' ? 'bg-primary' : 'bg-zinc-900 border border-zinc-800'
            }`}
          >
            <Text
              className={`text-center font-bold ${
                activeTab === 'insights' ? 'text-white' : 'text-zinc-400'
              }`}
            >
              Insights
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Log Tab */}
        {activeTab === 'log' && (
          <View className="px-6 pt-6">
            {sleepHistory.map((session) => (
              <View
                key={session.id}
                className="bg-zinc-900 rounded-xl p-4 mb-4 border border-zinc-800"
              >
                {/* Header */}
                <View className="flex-row items-start justify-between mb-3">
                  <View className="flex-1">
                    <Text className="text-white font-bold text-lg mb-1">
                      {new Date(session.date).toLocaleDateString('es-ES', {
                        weekday: 'long',
                        day: '2-digit',
                        month: 'short',
                      })}
                    </Text>
                    <Text className="text-zinc-400 text-sm">
                      {session.bedTime} â†’ {session.wakeTime}
                    </Text>
                  </View>
                  <View className="items-end">
                    <Text className={`text-3xl font-bold ${getScoreColor(session.sleepScore)}`}>
                      {session.sleepScore}
                    </Text>
                    <Text className="text-zinc-400 text-xs">SCORE</Text>
                  </View>
                </View>

                {/* Duration & Quality */}
                <View className="bg-zinc-800 rounded-lg p-3 mb-3">
                  <View className="flex-row items-center justify-between mb-2">
                    <View className="flex-row items-center">
                      <Ionicons name="moon" size={16} color="#71717A" />
                      <Text className="text-zinc-400 text-sm ml-2">DuraciÃ³n Total</Text>
                    </View>
                    <Text className="text-white text-xl font-bold">
                      {session.totalHours}h
                    </Text>
                  </View>
                  <View className="flex-row items-center justify-between">
                    <View className="flex-row items-center">
                      <Ionicons name="star" size={16} color="#71717A" />
                      <Text className="text-zinc-400 text-sm ml-2">Calidad</Text>
                    </View>
                    <Text className={`text-lg font-bold ${getQualityColor(session.quality)}`}>
                      {getQualityLabel(session.quality)}
                    </Text>
                  </View>
                </View>

                {/* Sleep Phases */}
                <View className="mb-3">
                  <Text className="text-zinc-400 text-xs mb-2">FASES DEL SUEÃ‘O</Text>
                  <View className="flex-row gap-2">
                    <View className="flex-1 bg-indigo-500/10 rounded-lg p-2 border border-indigo-500/30">
                      <Text className="text-indigo-400 text-xs">Profundo</Text>
                      <Text className="text-white font-bold">{session.deepSleep}h</Text>
                    </View>
                    <View className="flex-1 bg-primary/10 rounded-lg p-2 border border-primary/30">
                      <Text className="text-primary/80 text-xs">Ligero</Text>
                      <Text className="text-white font-bold">{session.lightSleep}h</Text>
                    </View>
                    <View className="flex-1 bg-purple-500/10 rounded-lg p-2 border border-purple-500/30">
                      <Text className="text-purple-400 text-xs">REM</Text>
                      <Text className="text-white font-bold">{session.remSleep}h</Text>
                    </View>
                  </View>
                </View>

                {/* Sleep Stages Bar */}
                <View className="mb-3">
                  <View className="h-4 bg-zinc-800 rounded-full overflow-hidden flex-row">
                    <View
                      className="bg-indigo-500"
                      style={{
                        width: `${(session.deepSleep / session.totalHours) * 100}%`,
                      }}
                    />
                    <View
                      className="bg-primary"
                      style={{
                        width: `${(session.lightSleep / session.totalHours) * 100}%`,
                      }}
                    />
                    <View
                      className="bg-purple-500"
                      style={{
                        width: `${(session.remSleep / session.totalHours) * 100}%`,
                      }}
                    />
                  </View>
                </View>

                {/* Awakenings */}
                <View className="bg-zinc-800 rounded-lg p-2 mb-3">
                  <View className="flex-row items-center justify-between">
                    <View className="flex-row items-center">
                      <Ionicons name="alert-circle" size={16} color="#71717A" />
                      <Text className="text-zinc-400 text-sm ml-2">Interrupciones</Text>
                    </View>
                    <Text className={`font-bold ${session.awakenings <= 1 ? 'text-primary' : 'text-amber-400'}`}>
                      {session.awakenings}
                    </Text>
                  </View>
                </View>

                {/* Notes */}
                {session.notes && (
                  <View className="bg-amber-500/10 rounded-lg p-3 border border-amber-500/30">
                    <Text className="text-amber-300 text-sm">{session.notes}</Text>
                  </View>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Insights Tab */}
        {activeTab === 'insights' && (
          <View className="px-6 pt-6">
            {/* Weekly Overview */}
            <View className="bg-zinc-900 rounded-xl p-4 border border-zinc-800 mb-4">
              <Text className="text-white font-bold text-xl mb-4">Resumen Semanal</Text>

              <View className="mb-4">
                <View className="flex-row items-center justify-between mb-2">
                  <Text className="text-zinc-400">Promedio de SueÃ±o</Text>
                  <Text className="text-primary text-2xl font-bold">
                    {weeklyStats.avgHours}h
                  </Text>
                </View>
                <View className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                  <View
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${(weeklyStats.avgHours / 10) * 100}%` }}
                  />
                </View>
              </View>

              <View className="mb-4">
                <View className="flex-row items-center justify-between mb-2">
                  <Text className="text-zinc-400">Calidad Promedio</Text>
                  <Text className={`text-2xl font-bold ${getScoreColor(weeklyStats.avgQuality)}`}>
                    {weeklyStats.avgQuality}
                  </Text>
                </View>
                <View className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                  <View
                    className={`h-full rounded-full ${
                      weeklyStats.avgQuality >= 85 ? 'bg-primary' : 'bg-amber-500'
                    }`}
                    style={{ width: `${weeklyStats.avgQuality}%` }}
                  />
                </View>
              </View>

              <View className="mb-4">
                <View className="flex-row items-center justify-between mb-2">
                  <Text className="text-zinc-400">Consistencia</Text>
                  <Text className="text-primary/80 text-2xl font-bold">
                    {weeklyStats.consistency}%
                  </Text>
                </View>
                <View className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                  <View
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${weeklyStats.consistency}%` }}
                  />
                </View>
              </View>

              <View className="flex-row gap-2">
                <View className="flex-1 bg-zinc-800 rounded-lg p-2">
                  <Text className="text-zinc-400 text-xs mb-1">MEJOR NOCHE</Text>
                  <Text className="text-primary text-sm font-bold">
                    {new Date(weeklyStats.bestNight).toLocaleDateString('es-ES', {
                      day: '2-digit',
                      month: 'short',
                    })}
                  </Text>
                </View>
                <View className="flex-1 bg-zinc-800 rounded-lg p-2">
                  <Text className="text-zinc-400 text-xs mb-1">PEOR NOCHE</Text>
                  <Text className="text-red-400 text-sm font-bold">
                    {new Date(weeklyStats.worstNight).toLocaleDateString('es-ES', {
                      day: '2-digit',
                      month: 'short',
                    })}
                  </Text>
                </View>
              </View>
            </View>

            {/* Recommendations */}
            <View className="bg-zinc-900 rounded-xl p-4 border border-zinc-800 mb-4">
              <Text className="text-white font-bold text-lg mb-3">
                Recomendaciones
              </Text>

              <View className="mb-3">
                <View className="flex-row items-start mb-2">
                  <Ionicons name="checkmark-circle" size={18} color="#9D12DE" />
                  <Text className="text-zinc-300 text-sm ml-2 flex-1">
                    Tu promedio de {weeklyStats.avgHours}h estÃ¡ cerca del Ã³ptimo (7-9h)
                  </Text>
                </View>
                <View className="flex-row items-start mb-2">
                  <Ionicons name="moon" size={18} color="#6366F1" />
                  <Text className="text-zinc-300 text-sm ml-2 flex-1">
                    Aumenta sueÃ±o profundo con magnesio antes de dormir
                  </Text>
                </View>
                <View className="flex-row items-start mb-2">
                  <Ionicons name="time" size={18} color="#FFEA00" />
                  <Text className="text-zinc-300 text-sm ml-2 flex-1">
                    Intenta acostarte a la misma hora para mejor consistencia
                  </Text>
                </View>
                <View className="flex-row items-start">
                  <Ionicons name="phone-portrait" size={18} color="#EF4444" />
                  <Text className="text-zinc-300 text-sm ml-2 flex-1">
                    Evita pantallas 1h antes de dormir (luz azul reduce melatonina)
                  </Text>
                </View>
              </View>
            </View>

            {/* Sleep & Recovery Correlation */}
            <View className="bg-zinc-900 rounded-xl p-4 border border-zinc-800">
              <Text className="text-white font-bold text-lg mb-3">
                SueÃ±o & RecuperaciÃ³n
              </Text>

              <View className="bg-primary/10 rounded-lg p-3 border border-primary/30 mb-3">
                <Text className="text-primary font-bold mb-1">
                  CorrelaciÃ³n Positiva
                </Text>
                <Text className="text-primary/80 text-sm">
                  Tus mejores entrenamientos ocurren despuÃ©s de 8+ horas de sueÃ±o
                </Text>
              </View>

              <View className="mb-2">
                <View className="flex-row items-center justify-between mb-1">
                  <Text className="text-zinc-400 text-sm">8h+ sueÃ±o</Text>
                  <Text className="text-primary font-bold">+15% rendimiento</Text>
                </View>
                <View className="flex-row items-center justify-between mb-1">
                  <Text className="text-zinc-400 text-sm">7-8h sueÃ±o</Text>
                  <Text className="text-primary/80 font-bold">Rendimiento normal</Text>
                </View>
                <View className="flex-row items-center justify-between">
                  <Text className="text-zinc-400 text-sm">&lt;7h sueÃ±o</Text>
                  <Text className="text-red-400 font-bold">-12% rendimiento</Text>
                </View>
              </View>
            </View>
          </View>
        )}

        {/* Info Card */}
        <View className="px-6 pb-6 pt-2">
          <View className="bg-indigo-500/10 rounded-xl p-4 border border-indigo-500/30">
            <View className="flex-row items-start">
              <Ionicons name="bulb" size={20} color="#6366F1" />
              <View className="flex-1 ml-3">
                <Text className="text-indigo-400 font-bold mb-2">
                  SueÃ±o = RecuperaciÃ³n
                </Text>
                <Text className="text-indigo-300 text-sm">
                  El sueÃ±o profundo libera HGH (hormona de crecimiento). Prioriza 7-9h para mÃ¡xima hipertrofia.
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}


