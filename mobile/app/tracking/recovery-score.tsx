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
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface RecoveryEntry {
  date: Date;
  sleepHours: number;
  sleepQuality: number;
  soreness: number;
  stress: number;
  nutrition: number;
  hydration: number;
  recoveryScore: number;
  recommendation: string;
}

const MOCK_ENTRIES: RecoveryEntry[] = [
  {
    date: new Date(2026, 0, 27),
    sleepHours: 7.5,
    sleepQuality: 4,
    soreness: 3,
    stress: 2,
    nutrition: 5,
    hydration: 4,
    recoveryScore: 85,
    recommendation: 'high-intensity',
  },
  {
    date: new Date(2026, 0, 26),
    sleepHours: 6,
    sleepQuality: 3,
    soreness: 4,
    stress: 4,
    nutrition: 3,
    hydration: 3,
    recoveryScore: 62,
    recommendation: 'moderate',
  },
];

export default function RecoveryScore() {
  const [entries, setEntries] = useState<RecoveryEntry[]>(MOCK_ENTRIES);
  const [sleepHours, setSleepHours] = useState(7);
  const [sleepQuality, setSleepQuality] = useState(4);
  const [soreness, setSoreness] = useState(2);
  const [stress, setStress] = useState(2);
  const [nutrition, setNutrition] = useState(4);
  const [hydration, setHydration] = useState(4);

  const calculateRecoveryScore = () => {
    // Weighted calculation
    const sleepScore = (sleepHours / 9) * 25 + (sleepQuality / 5) * 15; // 40% weight
    const sorenessScore = ((5 - soreness) / 5) * 20; // 20% weight (inverted)
    const stressScore = ((5 - stress) / 5) * 15; // 15% weight (inverted)
    const nutritionScore = (nutrition / 5) * 15; // 15% weight
    const hydrationScore = (hydration / 5) * 10; // 10% weight

    return Math.round(sleepScore + sorenessScore + stressScore + nutritionScore + hydrationScore);
  };

  const getRecommendation = (score: number): string => {
    if (score >= 85) return 'high-intensity';
    if (score >= 70) return 'moderate';
    if (score >= 50) return 'light';
    return 'rest';
  };

  const getRecommendationDetails = (recommendation: string) => {
    switch (recommendation) {
      case 'high-intensity':
        return {
          title: 'Alta Intensidad',
          description: 'Perfecto para PRs y entrenamientos pesados',
          color: 'emerald',
          icon: 'flash',
          suggestions: [
            'Intenta nuevos PRs',
            'Volumen alto permitido',
            'Técnica perfecta, ve pesado',
            'Aprovecha este pico de recuperación',
          ],
        };
      case 'moderate':
        return {
          title: 'Intensidad Moderada',
          description: 'Entrena normal, evita PRs',
          color: 'blue',
          icon: 'trending-up',
          suggestions: [
            'Entrena con pesos submáximos',
            'Enfócate en técnica',
            'Volumen moderado',
            'No fuerces PRs hoy',
          ],
        };
      case 'light':
        return {
          title: 'Intensidad Ligera',
          description: 'Workout liviano o cardio suave',
          color: 'amber',
          icon: 'walk',
          suggestions: [
            'Cardio ligero o caminata',
            'Movilidad extendida',
            'Pesos muy ligeros',
            'Considera día de descanso activo',
          ],
        };
      default:
        return {
          title: 'Día de Descanso',
          description: 'Tu cuerpo necesita recuperación',
          color: 'red',
          icon: 'bed',
          suggestions: [
            'Descanso completo hoy',
            'Sueño extra si es posible',
            'Caminata suave máximo',
            'Enfócate en nutrición',
          ],
        };
    }
  };

  const addEntry = () => {
    const score = calculateRecoveryScore();
    const recommendation = getRecommendation(score);

    const newEntry: RecoveryEntry = {
      date: new Date(),
      sleepHours,
      sleepQuality,
      soreness,
      stress,
      nutrition,
      hydration,
      recoveryScore: score,
      recommendation,
    };

    setEntries([newEntry, ...entries]);

    const details = getRecommendationDetails(recommendation);
    Alert.alert(
      `Recovery Score: ${score}/100`,
      `${details.title}\n\n${details.description}`
    );
  };

  const getAverageScore = () => {
    if (entries.length === 0) return 0;
    const sum = entries.reduce((acc, entry) => acc + entry.recoveryScore, 0);
    return Math.round(sum / entries.length);
  };

  const getWeeklyTrend = () => {
    if (entries.length < 2) return 'neutral';
    const recent = entries.slice(0, 3);
    const older = entries.slice(3, 6);
    
    if (recent.length === 0 || older.length === 0) return 'neutral';
    
    const recentAvg = recent.reduce((acc, e) => acc + e.recoveryScore, 0) / recent.length;
    const olderAvg = older.reduce((acc, e) => acc + e.recoveryScore, 0) / older.length;
    
    if (recentAvg > olderAvg + 5) return 'improving';
    if (recentAvg < olderAvg - 5) return 'declining';
    return 'stable';
  };

  const currentScore = calculateRecoveryScore();
  const currentRecommendation = getRecommendation(currentScore);
  const recommendationDetails = getRecommendationDetails(currentRecommendation);
  const averageScore = getAverageScore();
  const trend = getWeeklyTrend();

  return (
    <View className="flex-1 bg-zinc-950">
      {/* Header */}
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1 ml-3">
            Recovery Score
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          {/* Current Score Preview */}
          <View className={`bg-gradient-to-r from-${recommendationDetails.color}-500 to-blue-500 rounded-xl p-6 mb-6`}>
            <View className="flex-row items-center justify-between mb-4">
              <View className="flex-1">
                <Text className="text-white opacity-90 text-sm mb-1">Score Actual</Text>
                <Text className="text-white text-5xl font-bold">{currentScore}</Text>
                <Text className="text-white opacity-90 text-lg">/100</Text>
              </View>
              <View className="w-20 h-20 bg-white/20 rounded-full items-center justify-center">
                <Ionicons name={recommendationDetails.icon as any} size={40} color="white" />
              </View>
            </View>
            <Text className="text-white font-bold text-xl mb-1">{recommendationDetails.title}</Text>
            <Text className="text-white opacity-90">{recommendationDetails.description}</Text>
          </View>

          {/* Input Form */}
          <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
            <Text className="text-white font-bold text-lg mb-4">Evalúa Tu Recuperación</Text>

            {/* Sleep Hours */}
            <View className="mb-4">
              <View className="flex-row items-center justify-between mb-2">
                <View className="flex-row items-center">
                  <Ionicons name="moon" size={20} color="#3B82F6" />
                  <Text className="text-white font-bold ml-2">Horas de Sueño</Text>
                </View>
                <Text className="text-blue-400 font-bold text-xl">{sleepHours}h</Text>
              </View>
              <View className="flex-row gap-2">
                {[5, 6, 7, 8, 9].map((hours) => (
                  <TouchableOpacity
                    key={hours}
                    onPress={() => setSleepHours(hours)}
                    className={`flex-1 rounded-lg p-3 ${
                      sleepHours === hours ? 'bg-blue-500' : 'bg-zinc-800'
                    }`}
                  >
                    <Text className={`text-center font-bold ${sleepHours === hours ? 'text-white' : 'text-zinc-400'}`}>
                      {hours}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Sleep Quality */}
            <View className="mb-4">
              <View className="flex-row items-center justify-between mb-2">
                <View className="flex-row items-center">
                  <Ionicons name="star" size={20} color="#A855F7" />
                  <Text className="text-white font-bold ml-2">Calidad del Sueño</Text>
                </View>
                <Text className="text-purple-400 font-bold text-xl">{sleepQuality}/5</Text>
              </View>
              <View className="flex-row gap-2">
                {[1, 2, 3, 4, 5].map((quality) => (
                  <TouchableOpacity
                    key={quality}
                    onPress={() => setSleepQuality(quality)}
                    className={`flex-1 rounded-lg p-3 ${
                      sleepQuality === quality ? 'bg-purple-500' : 'bg-zinc-800'
                    }`}
                  >
                    <Text className={`text-center font-bold ${sleepQuality === quality ? 'text-white' : 'text-zinc-400'}`}>
                      {quality}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Soreness */}
            <View className="mb-4">
              <View className="flex-row items-center justify-between mb-2">
                <View className="flex-row items-center">
                  <Ionicons name="body" size={20} color="#EF4444" />
                  <Text className="text-white font-bold ml-2">Dolor Muscular</Text>
                </View>
                <Text className="text-red-400 font-bold text-xl">{soreness}/5</Text>
              </View>
              <View className="flex-row gap-2">
                {[1, 2, 3, 4, 5].map((level) => (
                  <TouchableOpacity
                    key={level}
                    onPress={() => setSoreness(level)}
                    className={`flex-1 rounded-lg p-3 ${
                      soreness === level ? 'bg-red-500' : 'bg-zinc-800'
                    }`}
                  >
                    <Text className={`text-center font-bold ${soreness === level ? 'text-white' : 'text-zinc-400'}`}>
                      {level}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              <Text className="text-zinc-500 text-xs mt-1">1 = Sin dolor, 5 = Muy adolorido</Text>
            </View>

            {/* Stress */}
            <View className="mb-4">
              <View className="flex-row items-center justify-between mb-2">
                <View className="flex-row items-center">
                  <Ionicons name="warning" size={20} color="#F59E0B" />
                  <Text className="text-white font-bold ml-2">Nivel de Estrés</Text>
                </View>
                <Text className="text-amber-400 font-bold text-xl">{stress}/5</Text>
              </View>
              <View className="flex-row gap-2">
                {[1, 2, 3, 4, 5].map((level) => (
                  <TouchableOpacity
                    key={level}
                    onPress={() => setStress(level)}
                    className={`flex-1 rounded-lg p-3 ${
                      stress === level ? 'bg-amber-500' : 'bg-zinc-800'
                    }`}
                  >
                    <Text className={`text-center font-bold ${stress === level ? 'text-white' : 'text-zinc-400'}`}>
                      {level}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Nutrition */}
            <View className="mb-4">
              <View className="flex-row items-center justify-between mb-2">
                <View className="flex-row items-center">
                  <Ionicons name="nutrition" size={20} color="#10B981" />
                  <Text className="text-white font-bold ml-2">Calidad Nutricional</Text>
                </View>
                <Text className="text-emerald-400 font-bold text-xl">{nutrition}/5</Text>
              </View>
              <View className="flex-row gap-2">
                {[1, 2, 3, 4, 5].map((level) => (
                  <TouchableOpacity
                    key={level}
                    onPress={() => setNutrition(level)}
                    className={`flex-1 rounded-lg p-3 ${
                      nutrition === level ? 'bg-emerald-500' : 'bg-zinc-800'
                    }`}
                  >
                    <Text className={`text-center font-bold ${nutrition === level ? 'text-white' : 'text-zinc-400'}`}>
                      {level}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Hydration */}
            <View className="mb-4">
              <View className="flex-row items-center justify-between mb-2">
                <View className="flex-row items-center">
                  <Ionicons name="water" size={20} color="#06B6D4" />
                  <Text className="text-white font-bold ml-2">Hidratación</Text>
                </View>
                <Text className="text-cyan-400 font-bold text-xl">{hydration}/5</Text>
              </View>
              <View className="flex-row gap-2">
                {[1, 2, 3, 4, 5].map((level) => (
                  <TouchableOpacity
                    key={level}
                    onPress={() => setHydration(level)}
                    className={`flex-1 rounded-lg p-3 ${
                      hydration === level ? 'bg-cyan-500' : 'bg-zinc-800'
                    }`}
                  >
                    <Text className={`text-center font-bold ${hydration === level ? 'text-white' : 'text-zinc-400'}`}>
                      {level}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Calculate Button */}
            <TouchableOpacity
              onPress={addEntry}
              className={`bg-${recommendationDetails.color}-500 rounded-xl p-4 flex-row items-center justify-center`}
            >
              <Ionicons name="calculator" size={24} color="white" />
              <Text className="text-white font-bold text-lg ml-2">Calcular Recovery Score</Text>
            </TouchableOpacity>
          </View>

          {/* Recommendation */}
          <View className={`bg-${recommendationDetails.color}-500/10 rounded-xl p-4 border border-${recommendationDetails.color}-500/30 mb-6`}>
            <View className="flex-row items-start">
              <Ionicons name="bulb" size={20} color={`#${recommendationDetails.color === 'emerald' ? '10B981' : recommendationDetails.color === 'blue' ? '3B82F6' : recommendationDetails.color === 'amber' ? 'F59E0B' : 'EF4444'}`} />
              <View className="flex-1 ml-3">
                <Text className={`text-${recommendationDetails.color}-400 font-bold mb-2`}>
                  Recomendaciones para Hoy
                </Text>
                {recommendationDetails.suggestions.map((suggestion, idx) => (
                  <Text key={idx} className={`text-${recommendationDetails.color}-300 text-sm mb-1`}>
                    • {suggestion}
                  </Text>
                ))}
              </View>
            </View>
          </View>

          {/* Stats */}
          <View className="flex-row gap-3 mb-6">
            <View className="flex-1 bg-zinc-900 rounded-xl p-4 border border-zinc-800">
              <Text className="text-zinc-400 text-xs mb-1">Promedio</Text>
              <Text className="text-white text-2xl font-bold">{averageScore}</Text>
              <Text className="text-zinc-500 text-xs">últimos {entries.length} días</Text>
            </View>
            <View className="flex-1 bg-zinc-900 rounded-xl p-4 border border-zinc-800">
              <Text className="text-zinc-400 text-xs mb-1">Tendencia</Text>
              <View className="flex-row items-center">
                <Ionicons
                  name={trend === 'improving' ? 'trending-up' : trend === 'declining' ? 'trending-down' : 'remove'}
                  size={24}
                  color={trend === 'improving' ? '#10B981' : trend === 'declining' ? '#EF4444' : '#71717A'}
                />
                <Text className={`font-bold ml-2 ${
                  trend === 'improving' ? 'text-emerald-400' : trend === 'declining' ? 'text-red-400' : 'text-zinc-400'
                }`}>
                  {trend === 'improving' ? 'Mejorando' : trend === 'declining' ? 'Bajando' : 'Estable'}
                </Text>
              </View>
            </View>
          </View>

          {/* History */}
          <Text className="text-white font-bold text-lg mb-4">Historial</Text>
          {entries.map((entry, index) => {
            const details = getRecommendationDetails(entry.recommendation);
            return (
              <View key={index} className="bg-zinc-900 rounded-xl p-4 mb-3 border border-zinc-800">
                <View className="flex-row items-center justify-between mb-3">
                  <Text className="text-white font-bold">
                    {format(entry.date, "d 'de' MMMM", { locale: es })}
                  </Text>
                  <View className={`bg-${details.color}-500/20 rounded-full px-3 py-1 border border-${details.color}-500/30`}>
                    <Text className={`text-${details.color}-400 font-bold text-lg`}>
                      {entry.recoveryScore}
                    </Text>
                  </View>
                </View>

                <View className="flex-row gap-2 mb-2">
                  <View className="bg-zinc-800 rounded px-2 py-1">
                    <Text className="text-zinc-400 text-xs">😴 {entry.sleepHours}h</Text>
                  </View>
                  <View className="bg-zinc-800 rounded px-2 py-1">
                    <Text className="text-zinc-400 text-xs">⭐ {entry.sleepQuality}/5</Text>
                  </View>
                  <View className="bg-zinc-800 rounded px-2 py-1">
                    <Text className="text-zinc-400 text-xs">💪 {entry.soreness}/5</Text>
                  </View>
                  <View className="bg-zinc-800 rounded px-2 py-1">
                    <Text className="text-zinc-400 text-xs">😰 {entry.stress}/5</Text>
                  </View>
                </View>

                <Text className={`text-${details.color}-400 text-sm font-bold`}>
                  → {details.title}
                </Text>
              </View>
            );
          })}

          {/* Info */}
          <View className="bg-blue-500/10 rounded-xl p-4 border border-blue-500/30 mb-6">
            <View className="flex-row items-start">
              <Ionicons name="information-circle" size={20} color="#3B82F6" />
              <View className="flex-1 ml-3">
                <Text className="text-blue-400 font-bold mb-2">
                  Cómo Interpretar el Score
                </Text>
                <Text className="text-blue-300 text-sm">
                  <Text className="font-bold">85-100:</Text> Alta intensidad OK{'\n'}
                  <Text className="font-bold">70-84:</Text> Entrena moderado{'\n'}
                  <Text className="font-bold">50-69:</Text> Intensidad ligera{'\n'}
                  <Text className="font-bold">&lt;50:</Text> Descanso necesario{'\n\n'}
                  El score considera: sueño (40%), dolor (20%), estrés (15%), nutrición (15%), hidratación (10%)
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
