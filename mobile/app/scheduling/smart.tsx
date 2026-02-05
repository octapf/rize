import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  Switch,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface WorkoutSchedule {
  id: string;
  day: string;
  date: string;
  workout: {
    name: string;
    type: string;
    duration: number;
    intensity: 'light' | 'moderate' | 'hard' | 'extreme';
    exercises: number;
  } | null;
  restDay: boolean;
  reason?: string;
}

interface RecoveryMetrics {
  sleepQuality: number;
  muscularSoreness: number;
  energyLevel: number;
  stressLevel: number;
  overallReadiness: number;
}

interface SmartRecommendation {
  type: 'deload' | 'rest' | 'intensity-up' | 'intensity-down' | 'switch-focus';
  title: string;
  reason: string;
  action: string;
}

const WEEKLY_SCHEDULE: WorkoutSchedule[] = [
  {
    id: '1',
    day: 'Lunes',
    date: '2026-01-27',
    workout: {
      name: 'Push Day - Fuerza',
      type: 'Fuerza',
      duration: 75,
      intensity: 'hard',
      exercises: 6,
    },
    restDay: false,
  },
  {
    id: '2',
    day: 'Martes',
    date: '2026-01-28',
    workout: {
      name: 'Pull Day - Hipertrofia',
      type: 'Hipertrofia',
      duration: 80,
      intensity: 'moderate',
      exercises: 7,
    },
    restDay: false,
  },
  {
    id: '3',
    day: 'MiÃ©rcoles',
    date: '2026-01-29',
    workout: null,
    restDay: true,
    reason: 'RecuperaciÃ³n activa - IA detectÃ³ fatiga acumulada',
  },
  {
    id: '4',
    day: 'Jueves',
    date: '2026-01-30',
    workout: {
      name: 'Legs Day - Fuerza',
      type: 'Fuerza',
      duration: 90,
      intensity: 'extreme',
      exercises: 5,
    },
    restDay: false,
  },
  {
    id: '5',
    day: 'Viernes',
    date: '2026-01-31',
    workout: {
      name: 'Upper Body - Volumen',
      type: 'Hipertrofia',
      duration: 70,
      intensity: 'moderate',
      exercises: 8,
    },
    restDay: false,
  },
  {
    id: '6',
    day: 'SÃ¡bado',
    date: '2026-02-01',
    workout: {
      name: 'Full Body - Conditioning',
      type: 'Conditioning',
      duration: 45,
      intensity: 'hard',
      exercises: 6,
    },
    restDay: false,
  },
  {
    id: '7',
    day: 'Domingo',
    date: '2026-02-02',
    workout: null,
    restDay: true,
    reason: 'Descanso completo programado',
  },
];

const RECOVERY_METRICS: RecoveryMetrics = {
  sleepQuality: 7.5,
  muscularSoreness: 4.2,
  energyLevel: 8.1,
  stressLevel: 3.5,
  overallReadiness: 82,
};

const RECOMMENDATIONS: SmartRecommendation[] = [
  {
    type: 'deload',
    title: 'Semana de Deload Recomendada',
    reason: '4 semanas de entrenamiento intenso. Volumen acumulativo alto (425k kg).',
    action: 'Reducir volumen 40% prÃ³xima semana. Mantener intensidad, bajar series.',
  },
  {
    type: 'rest',
    title: 'Descanso Extra Sugerido',
    reason: 'SueÃ±o promedio 6.2h Ãºltimos 3 dÃ­as. Recovery score bajo (68%).',
    action: 'Agregar dÃ­a de descanso activo el miÃ©rcoles. Priorizar sueÃ±o 8h.',
  },
  {
    type: 'switch-focus',
    title: 'Cambiar Enfoque a Hipertrofia',
    reason: 'PRs estancados Ãºltimas 2 semanas. Cuerpo adaptado a fuerza mÃ¡xima.',
    action: 'Block de hipertrofia 4 semanas: 8-12 reps, tempo controlado, volumen alto.',
  },
];

export default function SmartScheduling() {
  const [schedule, setSchedule] = useState(WEEKLY_SCHEDULE);
  const [autoSchedule, setAutoSchedule] = useState(true);
  const [adaptToRecovery, setAdaptToRecovery] = useState(true);
  const [preventOvertraining, setPreventOvertraining] = useState(true);

  const getIntensityColor = (intensity: string) => {
    switch (intensity) {
      case 'light':
        return 'bg-primary';
      case 'moderate':
        return 'bg-primary';
      case 'hard':
        return 'bg-amber-500';
      case 'extreme':
        return 'bg-red-500';
      default:
        return 'bg-zinc-500';
    }
  };

  const getIntensityLabel = (intensity: string) => {
    switch (intensity) {
      case 'light':
        return 'Ligero';
      case 'moderate':
        return 'Moderado';
      case 'hard':
        return 'Intenso';
      case 'extreme':
        return 'Extremo';
      default:
        return intensity;
    }
  };

  const editWorkout = (id: string) => {
    Alert.alert(
      'Editar Entrenamiento',
      'Modificar manualmente o dejar que IA programe',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Editar Manual' },
        { text: 'IA Auto-Programa' },
      ]
    );
  };

  const applyRecommendation = (rec: SmartRecommendation) => {
    Alert.alert(
      `Aplicar RecomendaciÃ³n`,
      `${rec.title}\n\n${rec.action}`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Aplicar',
          onPress: () => Alert.alert('Aplicado', 'Calendario actualizado segÃºn IA'),
        },
      ]
    );
  };

  const regenerateWeek = () => {
    Alert.alert(
      'Re-generar Semana',
      'Â¿Permitir que IA cree nuevo calendario basado en tu progreso y recuperaciÃ³n?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Re-generar',
          onPress: () => Alert.alert('Generando...', 'IA optimizando tu semana'),
        },
      ]
    );
  };

  const getReadinessColor = (score: number) => {
    if (score >= 80) return 'text-primary';
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
            ProgramaciÃ³n Inteligente
          </Text>
          <TouchableOpacity onPress={regenerateWeek}>
            <Ionicons name="refresh" size={24} color="#9D12DE" />
          </TouchableOpacity>
        </View>

        {/* Recovery Score */}
        <View className="bg-zinc-900 rounded-xl p-4 border border-zinc-800">
          <View className="flex-row items-center justify-between mb-3">
            <View>
              <Text className="text-zinc-400 text-xs mb-1">READINESS SCORE</Text>
              <Text className={`text-5xl font-bold ${getReadinessColor(RECOVERY_METRICS.overallReadiness)}`}>
                {RECOVERY_METRICS.overallReadiness}
              </Text>
            </View>
            <View className="items-end">
              <Ionicons
                name={RECOVERY_METRICS.overallReadiness >= 80 ? 'checkmark-circle' : 'alert-circle'}
                size={48}
                color={RECOVERY_METRICS.overallReadiness >= 80 ? '#9D12DE' : '#FFEA00'}
              />
              <Text className="text-zinc-400 text-xs mt-1">
                {RECOVERY_METRICS.overallReadiness >= 80 ? 'Ã“ptimo' : 'PrecauciÃ³n'}
              </Text>
            </View>
          </View>

          <View className="space-y-2">
            <View className="flex-row items-center justify-between">
              <Text className="text-zinc-400 text-sm">Calidad de SueÃ±o</Text>
              <View className="flex-row items-center">
                <View className="flex-row">
                  {[...Array(10)].map((_, i) => (
                    <View
                      key={i}
                      className={`w-2 h-2 rounded-full mr-1 ${
                        i < RECOVERY_METRICS.sleepQuality ? 'bg-primary' : 'bg-zinc-700'
                      }`}
                    />
                  ))}
                </View>
                <Text className="text-white text-sm ml-2">{RECOVERY_METRICS.sleepQuality}/10</Text>
              </View>
            </View>

            <View className="flex-row items-center justify-between">
              <Text className="text-zinc-400 text-sm">Nivel de EnergÃ­a</Text>
              <View className="flex-row items-center">
                <View className="flex-row">
                  {[...Array(10)].map((_, i) => (
                    <View
                      key={i}
                      className={`w-2 h-2 rounded-full mr-1 ${
                        i < RECOVERY_METRICS.energyLevel ? 'bg-primary' : 'bg-zinc-700'
                      }`}
                    />
                  ))}
                </View>
                <Text className="text-white text-sm ml-2">{RECOVERY_METRICS.energyLevel}/10</Text>
              </View>
            </View>

            <View className="flex-row items-center justify-between">
              <Text className="text-zinc-400 text-sm">Dolor Muscular</Text>
              <View className="flex-row items-center">
                <View className="flex-row">
                  {[...Array(10)].map((_, i) => (
                    <View
                      key={i}
                      className={`w-2 h-2 rounded-full mr-1 ${
                        i < RECOVERY_METRICS.muscularSoreness ? 'bg-amber-500' : 'bg-zinc-700'
                      }`}
                    />
                  ))}
                </View>
                <Text className="text-white text-sm ml-2">{RECOVERY_METRICS.muscularSoreness}/10</Text>
              </View>
            </View>

            <View className="flex-row items-center justify-between">
              <Text className="text-zinc-400 text-sm">Nivel de EstrÃ©s</Text>
              <View className="flex-row items-center">
                <View className="flex-row">
                  {[...Array(10)].map((_, i) => (
                    <View
                      key={i}
                      className={`w-2 h-2 rounded-full mr-1 ${
                        i < RECOVERY_METRICS.stressLevel ? 'bg-red-500' : 'bg-zinc-700'
                      }`}
                    />
                  ))}
                </View>
                <Text className="text-white text-sm ml-2">{RECOVERY_METRICS.stressLevel}/10</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Settings */}
        <View className="px-6 pt-6">
          <Text className="text-white font-bold text-lg mb-3">ConfiguraciÃ³n IA</Text>
          <View className="bg-zinc-900 rounded-xl p-4 border border-zinc-800 mb-6">
            <View className="flex-row items-center justify-between mb-3 pb-3 border-b border-zinc-800">
              <View className="flex-1">
                <Text className="text-white font-bold mb-1">Auto-ProgramaciÃ³n</Text>
                <Text className="text-zinc-400 text-sm">
                  IA genera entrenamientos automÃ¡ticamente
                </Text>
              </View>
              <Switch
                value={autoSchedule}
                onValueChange={setAutoSchedule}
                trackColor={{ false: '#3F3F46', true: '#9D12DE' }}
                thumbColor={autoSchedule ? '#fff' : '#D4D4D8'}
              />
            </View>

            <View className="flex-row items-center justify-between mb-3 pb-3 border-b border-zinc-800">
              <View className="flex-1">
                <Text className="text-white font-bold mb-1">Adaptar a RecuperaciÃ³n</Text>
                <Text className="text-zinc-400 text-sm">
                  Ajusta intensidad segÃºn readiness
                </Text>
              </View>
              <Switch
                value={adaptToRecovery}
                onValueChange={setAdaptToRecovery}
                trackColor={{ false: '#3F3F46', true: '#9D12DE' }}
                thumbColor={adaptToRecovery ? '#fff' : '#D4D4D8'}
              />
            </View>

            <View className="flex-row items-center justify-between">
              <View className="flex-1">
                <Text className="text-white font-bold mb-1">Prevenir Overtraining</Text>
                <Text className="text-zinc-400 text-sm">
                  Forzar descansos cuando sea necesario
                </Text>
              </View>
              <Switch
                value={preventOvertraining}
                onValueChange={setPreventOvertraining}
                trackColor={{ false: '#3F3F46', true: '#9D12DE' }}
                thumbColor={preventOvertraining ? '#fff' : '#D4D4D8'}
              />
            </View>
          </View>

          {/* Weekly Schedule */}
          <Text className="text-white font-bold text-lg mb-3">Esta Semana</Text>
          {schedule.map((day) => (
            <View
              key={day.id}
              className="bg-zinc-900 rounded-xl p-4 mb-3 border border-zinc-800"
            >
              <View className="flex-row items-center justify-between mb-2">
                <View className="flex-1">
                  <Text className="text-white font-bold text-lg">{day.day}</Text>
                  <Text className="text-zinc-400 text-sm">
                    {new Date(day.date).toLocaleDateString('es-ES', {
                      day: '2-digit',
                      month: 'short',
                    })}
                  </Text>
                </View>
                {!day.restDay && (
                  <TouchableOpacity onPress={() => editWorkout(day.id)}>
                    <Ionicons name="create-outline" size={20} color="#71717A" />
                  </TouchableOpacity>
                )}
              </View>

              {day.restDay ? (
                <View className="bg-primary/10 rounded-lg p-3 border border-primary/30">
                  <View className="flex-row items-center mb-2">
                    <Ionicons name="bed" size={20} color="#9D12DE" />
                    <Text className="text-primary font-bold ml-2">DÃ­a de Descanso</Text>
                  </View>
                  {day.reason && (
                    <Text className="text-primary/80 text-sm">{day.reason}</Text>
                  )}
                </View>
              ) : (
                day.workout && (
                  <>
                    <View className="bg-zinc-800 rounded-lg p-3 mb-3">
                      <Text className="text-white font-bold text-base mb-2">
                        {day.workout.name}
                      </Text>
                      <View className="flex-row items-center gap-3">
                        <View className="flex-row items-center">
                          <Ionicons name="time" size={14} color="#71717A" />
                          <Text className="text-zinc-400 text-sm ml-1">
                            {day.workout.duration} min
                          </Text>
                        </View>
                        <View className="flex-row items-center">
                          <Ionicons name="barbell" size={14} color="#71717A" />
                          <Text className="text-zinc-400 text-sm ml-1">
                            {day.workout.exercises} ejercicios
                          </Text>
                        </View>
                      </View>
                    </View>

                    <View className="flex-row items-center">
                      <View className="flex-1">
                        <View className="flex-row items-center">
                          <View
                            className={`w-3 h-3 rounded-full ${getIntensityColor(
                              day.workout.intensity
                            )} mr-2`}
                          />
                          <Text className="text-zinc-400 text-sm">
                            {getIntensityLabel(day.workout.intensity)}
                          </Text>
                        </View>
                      </View>
                      <View className="bg-primary/10 rounded-lg px-3 py-1">
                        <Text className="text-primary/80 text-xs">{day.workout.type}</Text>
                      </View>
                    </View>
                  </>
                )
              )}
            </View>
          ))}

          {/* Smart Recommendations */}
          <Text className="text-white font-bold text-lg mb-3 mt-4">
            Recomendaciones IA
          </Text>
          {RECOMMENDATIONS.map((rec, index) => (
            <View
              key={index}
              className="bg-zinc-900 rounded-xl p-4 mb-4 border border-zinc-800"
            >
              <View className="flex-row items-start mb-3">
                <Ionicons
                  name={
                    rec.type === 'deload'
                      ? 'fitness'
                      : rec.type === 'rest'
                      ? 'bed'
                      : rec.type === 'intensity-up'
                      ? 'trending-up'
                      : rec.type === 'intensity-down'
                      ? 'trending-down'
                      : 'swap-horizontal'
                  }
                  size={24}
                  color="#9D12DE"
                />
                <View className="flex-1 ml-3">
                  <Text className="text-white font-bold text-base mb-1">{rec.title}</Text>
                  <Text className="text-zinc-400 text-sm mb-2">{rec.reason}</Text>
                  <View className="bg-primary/10 rounded-lg p-3 border border-primary/30">
                    <Text className="text-primary/60 text-sm">{rec.action}</Text>
                  </View>
                </View>
              </View>

              <TouchableOpacity
                onPress={() => applyRecommendation(rec)}
                className="bg-primary rounded-lg p-3"
              >
                <Text className="text-white font-bold text-center">Aplicar</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Info Card */}
        <View className="px-6 pb-6 pt-2">
          <View className="bg-purple-500/10 rounded-xl p-4 border border-purple-500/30">
            <View className="flex-row items-start">
              <Ionicons name="bulb" size={20} color="#A855F7" />
              <View className="flex-1 ml-3">
                <Text className="text-purple-400 font-bold mb-2">IA Adaptativa</Text>
                <Text className="text-purple-300 text-sm">
                  La IA analiza tu progreso, recuperaciÃ³n y rendimiento para optimizar cada
                  entrenamiento. Deja que la ciencia guÃ­e tu camino.
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}


