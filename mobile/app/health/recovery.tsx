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

interface RecoveryFactor {
  name: string;
  score: number;
  weight: number;
  icon: string;
}

interface RecoveryHistory {
  date: string;
  score: number;
  sleep: number;
  soreness: number;
  mood: number;
  energy: number;
  recommendation: string;
}

export default function RecoveryScore() {
  const [currentScore] = useState(78);
  const [hrv] = useState(62); // Heart Rate Variability (higher = better recovery)
  const [factors] = useState<RecoveryFactor[]>([
    { name: 'Calidad de SueÒo', score: 85, weight: 30, icon: 'bed' },
    { name: 'Dolor Muscular', score: 70, weight: 25, icon: 'fitness' },
    { name: 'Estado de √Ånimo', score: 80, weight: 15, icon: 'happy' },
    { name: 'Nivel de EnergÌa', score: 75, weight: 20, icon: 'battery-charging' },
    { name: 'HRV (Variabilidad)', score: 72, weight: 10, icon: 'pulse' },
  ]);

  const [history] = useState<RecoveryHistory[]>([
    {
      date: 'Hoy',
      score: 78,
      sleep: 85,
      soreness: 70,
      mood: 80,
      energy: 75,
      recommendation: 'Intensidad moderada-alta. Puedes entrenar fuerza.',
    },
    {
      date: 'Ayer',
      score: 68,
      sleep: 75,
      soreness: 60,
      mood: 70,
      energy: 65,
      recommendation: 'Intensidad moderada. Preferir ejercicios tÈcnicos.',
    },
    {
      date: 'Hace 2 dÌas',
      score: 82,
      sleep: 90,
      soreness: 80,
      mood: 85,
      energy: 80,
      recommendation: '√ìptimo para PR attempts. M·xima intensidad.',
    },
    {
      date: 'Hace 3 dÌas',
      score: 55,
      sleep: 60,
      soreness: 50,
      mood: 55,
      energy: 55,
      recommendation: 'Baja recuperaciÛn. DÌa de movilidad o descanso.',
    },
    {
      date: 'Hace 4 dÌas',
      score: 72,
      sleep: 80,
      soreness: 65,
      mood: 75,
      energy: 70,
      recommendation: 'Buena recuperaciÛn. Entrenamiento normal.',
    },
    {
      date: 'Hace 5 dÌas',
      score: 88,
      sleep: 95,
      soreness: 85,
      mood: 90,
      energy: 85,
      recommendation: 'Excelente. Ideal para volume training.',
    },
    {
      date: 'Hace 6 dÌas',
      score: 75,
      sleep: 80,
      soreness: 70,
      mood: 75,
      energy: 75,
      recommendation: 'SÛlido. Entrenamientos de fuerza recomendados.',
    },
  ]);

  const getScoreColor = (score: number) => {
    if (score >= 80) return { bg: 'bg-primary', text: 'text-primary' };
    if (score >= 65) return { bg: 'bg-primary', text: 'text-primary/80' };
    if (score >= 50) return { bg: 'bg-amber-500', text: 'text-amber-400' };
    return { bg: 'bg-red-500', text: 'text-red-400' };
  };

  const getReadinessStatus = (score: number) => {
    if (score >= 80) return { text: '√ìptima', emoji: 'üí™' };
    if (score >= 65) return { text: 'Buena', emoji: 'üëç' };
    if (score >= 50) return { text: 'Regular', emoji: '‚ö†Ô∏è' };
    return { text: 'Baja', emoji: 'üõë' };
  };

  const getWorkoutRecommendation = (score: number) => {
    if (score >= 80) {
      return {
        title: 'M·xima Intensidad',
        description: 'Ideal para PRs, volume alto, entrenamientos largos',
        intensity: 'ALTA',
        color: 'primary',
      };
    }
    if (score >= 65) {
      return {
        title: 'Intensidad Moderada-Alta',
        description: 'Entrena normal. Evita PRs si no te sientes 100%',
        intensity: 'MODERADA',
        color: 'blue',
      };
    }
    if (score >= 50) {
      return {
        title: 'Intensidad Baja-Moderada',
        description: 'TÈcnica, cardio ligero, movilidad. Escucha tu cuerpo',
        intensity: 'BAJA',
        color: 'amber',
      };
    }
    return {
      title: 'Descanso Activo',
      description: 'Caminata, yoga, stretching. Prioriza recuperaciÛn',
      intensity: 'DESCANSO',
      color: 'red',
    };
  };

  const updateFactor = (factorName: string) => {
    Alert.alert(
      `Actualizar: ${factorName}`,
      'Esta funciÛn abrir· un formulario para registrar tu estado actual',
      [{ text: 'Entendido' }]
    );
  };

  const scoreColors = getScoreColor(currentScore);
  const readiness = getReadinessStatus(currentScore);
  const recommendation = getWorkoutRecommendation(currentScore);

  return (
    <View className="flex-1 bg-zinc-950">
      {/* Header */}
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1 ml-3">
            PuntuaciÛn de RecuperaciÛn
          </Text>
          <TouchableOpacity>
            <Ionicons name="settings" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          {/* Current Score */}
          <View className="bg-zinc-900 rounded-xl p-6 mb-6 border border-zinc-800">
            <Text className="text-zinc-400 text-sm mb-2">RECUPERACI√ìN HOY</Text>
            <View className="flex-row items-end justify-between mb-4">
              <View className="flex-row items-baseline">
                <Text className={`text-6xl font-bold ${scoreColors.text}`}>
                  {currentScore}
                </Text>
                <Text className="text-zinc-400 text-2xl ml-2">/100</Text>
              </View>
              <View className="items-end">
                <Text className="text-3xl mb-1">{readiness.emoji}</Text>
                <Text className={`${scoreColors.text} font-bold text-lg`}>
                  {readiness.text}
                </Text>
              </View>
            </View>

            {/* Progress Bar */}
            <View className="bg-zinc-800 h-3 rounded-full overflow-hidden mb-4">
              <View
                className={`${scoreColors.bg} h-full rounded-full`}
                style={{ width: `${currentScore}%` }}
              />
            </View>

            {/* HRV */}
            <View className="flex-row items-center justify-between bg-zinc-800 rounded-lg p-3">
              <View className="flex-row items-center">
                <Ionicons name="pulse" size={20} color="#71717A" />
                <Text className="text-zinc-400 ml-2">HRV (Variabilidad CardÌaca)</Text>
              </View>
              <Text className="text-white font-bold">{hrv} ms</Text>
            </View>
          </View>

          {/* Workout Recommendation */}
          <View className={`bg-${recommendation.color}-500/10 rounded-xl p-4 mb-6 border border-${recommendation.color}-500/30`}>
            <View className="flex-row items-start justify-between mb-3">
              <View className="flex-1">
                <Text className={`text-${recommendation.color}-400 font-bold text-lg mb-1`}>
                  {recommendation.title}
                </Text>
                <Text className={`text-${recommendation.color}-300 text-sm`}>
                  {recommendation.description}
                </Text>
              </View>
              <View className={`bg-${recommendation.color}-500 rounded-lg px-3 py-1`}>
                <Text className="text-white text-xs font-bold">
                  {recommendation.intensity}
                </Text>
              </View>
            </View>
          </View>

          {/* Recovery Factors */}
          <View className="mb-6">
            <Text className="text-white text-lg font-bold mb-3">Factores de RecuperaciÛn</Text>
            {factors.map((factor) => {
              const factorColors = getScoreColor(factor.score);
              return (
                <TouchableOpacity
                  key={factor.name}
                  onPress={() => updateFactor(factor.name)}
                  className="bg-zinc-900 rounded-xl p-4 mb-3 border border-zinc-800"
                  activeOpacity={0.7}
                >
                  <View className="flex-row items-center justify-between mb-2">
                    <View className="flex-row items-center flex-1">
                      <View className="w-10 h-10 bg-zinc-800 rounded-lg items-center justify-center mr-3">
                        <Ionicons name={factor.icon as any} size={20} color="white" />
                      </View>
                      <View className="flex-1">
                        <Text className="text-white font-bold">{factor.name}</Text>
                        <Text className="text-zinc-400 text-xs">
                          Peso: {factor.weight}% del total
                        </Text>
                      </View>
                    </View>
                    <Text className={`${factorColors.text} font-bold text-lg`}>
                      {factor.score}
                    </Text>
                  </View>
                  <View className="bg-zinc-800 h-2 rounded-full overflow-hidden">
                    <View
                      className={`${factorColors.bg} h-full rounded-full`}
                      style={{ width: `${factor.score}%` }}
                    />
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* History */}
          <View className="mb-6">
            <Text className="text-white text-lg font-bold mb-3">Historial (7 dÌas)</Text>
            {history.map((day, index) => {
              const dayColors = getScoreColor(day.score);
              return (
                <View
                  key={index}
                  className="bg-zinc-900 rounded-xl p-4 mb-3 border border-zinc-800"
                >
                  <View className="flex-row items-center justify-between mb-3">
                    <View>
                      <Text className="text-white font-bold">{day.date}</Text>
                      <Text className="text-zinc-400 text-xs">PuntuaciÛn general</Text>
                    </View>
                    <View className="flex-row items-baseline">
                      <Text className={`${dayColors.text} font-bold text-2xl`}>
                        {day.score}
                      </Text>
                      <Text className="text-zinc-400 ml-1">/100</Text>
                    </View>
                  </View>

                  {/* Mini Factors */}
                  <View className="flex-row gap-2 mb-3">
                    <View className="flex-1 bg-zinc-800 rounded-lg p-2">
                      <Text className="text-zinc-400 text-xs mb-1">üí§ SueÒo</Text>
                      <Text className="text-white font-bold text-sm">{day.sleep}</Text>
                    </View>
                    <View className="flex-1 bg-zinc-800 rounded-lg p-2">
                      <Text className="text-zinc-400 text-xs mb-1">üí™ Dolor</Text>
                      <Text className="text-white font-bold text-sm">{day.soreness}</Text>
                    </View>
                    <View className="flex-1 bg-zinc-800 rounded-lg p-2">
                      <Text className="text-zinc-400 text-xs mb-1">??ä √Ånimo</Text>
                      <Text className="text-white font-bold text-sm">{day.mood}</Text>
                    </View>
                    <View className="flex-1 bg-zinc-800 rounded-lg p-2">
                      <Text className="text-zinc-400 text-xs mb-1">? EnergÌa</Text>
                      <Text className="text-white font-bold text-sm">{day.energy}</Text>
                    </View>
                  </View>

                  {/* Recommendation */}
                  <View className="bg-zinc-800 rounded-lg p-3">
                    <Text className="text-zinc-400 text-xs mb-1">RECOMENDACI√ìN</Text>
                    <Text className="text-zinc-200 text-sm">{day.recommendation}</Text>
                  </View>
                </View>
              );
            })}
          </View>

          {/* Info Cards */}
          <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-3">
            <View className="flex-row items-start">
              <Ionicons name="information-circle" size={20} color="#9D12DE" />
              <View className="flex-1 ml-3">
                <Text className="text-primary/80 font-bold mb-2">
                  øQuÈ es HRV?
                </Text>
                <Text className="text-primary/60 text-sm">
                  Variabilidad de frecuencia cardÌaca. Mayor HRV = mejor recuperaciÛn del sistema nervioso. Valores normales: 50-80ms.
                </Text>
              </View>
            </View>
          </View>

          <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-6">
            <View className="flex-row items-start">
              <Ionicons name="checkmark-circle" size={20} color="#9D12DE" />
              <View className="flex-1 ml-3">
                <Text className="text-primary font-bold mb-2">
                  Mejora Tu RecuperaciÛn
                </Text>
                <Text className="text-primary/80 text-sm">
                  7-9h sueÒo, hidrataciÛn, nutriciÛn adecuada, manejo de estrÈs, dÌas de descanso programados.
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Update Button */}
      <View className="px-6 pb-6 pt-4 border-t border-zinc-800">
        <TouchableOpacity
          onPress={() => Alert.alert('Actualizar Datos', 'Formulario para registrar estado actual')}
          className="bg-primary rounded-xl p-4 flex-row items-center justify-center"
        >
          <Ionicons name="refresh" size={20} color="white" />
          <Text className="text-white font-bold ml-2">Actualizar RecuperaciÛn</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}


