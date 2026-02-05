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
import { format, differenceInDays } from 'date-fns';
import { es } from 'date-fns/locale';

interface Challenge {
  id: string;
  name: string;
  description: string;
  duration: number;
  startDate: Date | null;
  endDate: Date | null;
  type: 'fitness' | 'nutrition' | 'recovery' | 'mindset';
  icon: string;
  color: string;
  dailyTasks: string[];
  completedDays: number[];
  status: 'not-started' | 'active' | 'completed' | 'failed';
  reward: string;
}

const CHALLENGE_TEMPLATES: Omit<Challenge, 'id' | 'startDate' | 'endDate' | 'completedDays' | 'status'>[] = [
  {
    name: '30 Días de Entrenamiento',
    description: 'Entrena al menos 30 minutos cada día durante 30 días',
    duration: 30,
    type: 'fitness',
    icon: 'barbell',
    color: 'red',
    dailyTasks: [
      'Completar sesión de entrenamiento (30+ min)',
      'Calentar adecuadamente',
      'Registrar el workout',
    ],
    reward: 'ðŸ’ª Fuerza ganada, hábito consolidado',
  },
  {
    name: 'Proteína en Cada Comida',
    description: '30g+ proteína en cada comida durante 30 días',
    duration: 30,
    type: 'nutrition',
    icon: 'nutrition',
    color: 'emerald',
    dailyTasks: [
      '30g+ proteína en desayuno',
      '40g+ proteína en comida',
      '40g+ proteína en cena',
      'Trackear macros',
    ],
    reward: '🥩 Mejor composición corporal, saciedad',
  },
  {
    name: '10k Pasos Diarios',
    description: 'Camina mínimo 10,000 pasos cada día',
    duration: 30,
    type: 'fitness',
    icon: 'walk',
    color: 'blue',
    dailyTasks: [
      'Alcanzar 10,000 pasos',
      'Caminar después de comidas',
      'Revisar contador al final del día',
    ],
    reward: 'ðŸš¶ Mejor salud cardiovascular, recuperación activa',
  },
  {
    name: '8 Horas de Sueño',
    description: 'Dormir 8 horas completas cada noche durante 30 días',
    duration: 30,
    type: 'recovery',
    icon: 'moon',
    color: 'purple',
    dailyTasks: [
      'Acostarse antes de las 11 PM',
      'Dormir 8 horas seguidas',
      'Sin pantallas 1h antes de dormir',
      'Habitación oscura y fresca',
    ],
    reward: '😐´ Mejor recuperación, hormona de crecimiento óptima',
  },
  {
    name: 'Sin Alcohol',
    description: 'Cero alcohol durante 30 días',
    duration: 30,
    type: 'mindset',
    icon: 'close-circle',
    color: 'amber',
    dailyTasks: [
      'No consumir alcohol',
      'Beber 3L+ de agua',
      'Elegir alternativas saludables',
    ],
    reward: 'ðŸ§  Mejor sueño, recuperación y composición corporal',
  },
  {
    name: 'Movilidad Diaria',
    description: '15 minutos de movilidad cada mañana',
    duration: 30,
    type: 'recovery',
    icon: 'body',
    color: 'cyan',
    dailyTasks: [
      '15 min de movilidad matutina',
      'Enfocarse en áreas tensas',
      'Respiración profunda',
    ],
    reward: '🧘 Mejor ROM, menos dolor, mejor postura',
  },
];

const MOCK_CHALLENGES: Challenge[] = [
  {
    id: '1',
    ...CHALLENGE_TEMPLATES[0],
    startDate: new Date(2026, 0, 10),
    endDate: new Date(2026, 1, 9),
    completedDays: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
    status: 'active',
  },
];

export default function Challenges() {
  const [challenges, setChallenges] = useState<Challenge[]>(MOCK_CHALLENGES);
  const [selectedType, setSelectedType] = useState<string>('all');

  const types = [
    { key: 'all', label: 'Todos', icon: 'apps' },
    { key: 'fitness', label: 'Fitness', icon: 'barbell' },
    { key: 'nutrition', label: 'Nutrición', icon: 'nutrition' },
    { key: 'recovery', label: 'Recuperación', icon: 'moon' },
    { key: 'mindset', label: 'Mindset', icon: 'bulb' },
  ];

  const filteredChallenges = selectedType === 'all'
    ? challenges
    : challenges.filter(c => c.type === selectedType);

  const startChallenge = (template: typeof CHALLENGE_TEMPLATES[0]) => {
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + template.duration);

    const newChallenge: Challenge = {
      ...template,
      id: String(Date.now()),
      startDate,
      endDate,
      completedDays: [],
      status: 'active',
    };

    setChallenges([...challenges, newChallenge]);
    Alert.alert('Challenge Iniciado! 🚀', `${template.name} - ${template.duration} días`);
  };

  const getDaysRemaining = (challenge: Challenge) => {
    if (!challenge.endDate) return 0;
    return Math.max(0, differenceInDays(challenge.endDate, new Date()));
  };

  const getCurrentDay = (challenge: Challenge) => {
    if (!challenge.startDate) return 0;
    return Math.min(
      challenge.duration,
      differenceInDays(new Date(), challenge.startDate) + 1
    );
  };

  const getCompletionRate = (challenge: Challenge) => {
    return Math.round((challenge.completedDays.length / challenge.duration) * 100);
  };

  const markDayComplete = (challengeId: string) => {
    setChallenges(challenges.map(challenge => {
      if (challenge.id !== challengeId) return challenge;

      const currentDay = getCurrentDay(challenge);
      const alreadyCompleted = challenge.completedDays.includes(currentDay);

      if (alreadyCompleted) {
        return {
          ...challenge,
          completedDays: challenge.completedDays.filter(d => d !== currentDay),
        };
      } else {
        const newCompletedDays = [...challenge.completedDays, currentDay].sort((a, b) => a - b);
        const isComplete = newCompletedDays.length === challenge.duration;

        return {
          ...challenge,
          completedDays: newCompletedDays,
          status: isComplete ? 'completed' : 'active',
        };
      }
    }));

    const challenge = challenges.find(c => c.id === challengeId)!;
    const currentDay = getCurrentDay(challenge);
    const wasCompleted = challenge.completedDays.includes(currentDay);

    if (!wasCompleted) {
      const newTotal = challenge.completedDays.length + 1;
      if (newTotal === challenge.duration) {
        Alert.alert('🎉 CHALLENGE COMPLETADO! 🎉', `Has completado ${challenge.name}!\n\n${challenge.reward}`);
      } else {
        Alert.alert('Día Completado! ✓', `Día ${currentDay}/${challenge.duration}`);
      }
    }
  };

  const abandonChallenge = (challengeId: string) => {
    Alert.alert(
      'Abandonar Challenge',
      '¿Seguro? Se perderá todo el progreso',
      [
        { text: 'Cancelar' },
        {
          text: 'Abandonar',
          onPress: () => setChallenges(challenges.filter(c => c.id !== challengeId)),
          style: 'destructive',
        },
      ]
    );
  };

  const activeChallenges = challenges.filter(c => c.status === 'active');
  const completedChallenges = challenges.filter(c => c.status === 'completed');

  return (
    <View className="flex-1 bg-zinc-950">
      {/* Header */}
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1 ml-3">
            30-Day Challenges
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          {/* Stats */}
          <View className="flex-row gap-3 mb-6">
            <View className="flex-1 bg-gradient-to-r from-primary to-[#7D0EBE] rounded-xl p-4">
              <Text className="text-white opacity-90 text-xs mb-1">Activos</Text>
              <Text className="text-white text-3xl font-bold">{activeChallenges.length}</Text>
            </View>
            <View className="flex-1 bg-gradient-to-r from-primary to-[#7D0EBE] rounded-xl p-4">
              <Text className="text-white opacity-90 text-xs mb-1">Completados</Text>
              <Text className="text-white text-3xl font-bold">{completedChallenges.length}</Text>
            </View>
          </View>

          {/* Active Challenges */}
          {activeChallenges.length > 0 && (
            <>
              <Text className="text-white font-bold text-lg mb-4">Challenges Activos</Text>
              {activeChallenges.map((challenge) => {
                const currentDay = getCurrentDay(challenge);
                const daysRemaining = getDaysRemaining(challenge);
                const completionRate = getCompletionRate(challenge);
                const isDayComplete = challenge.completedDays.includes(currentDay);

                return (
                  <View key={challenge.id} className="bg-zinc-900 rounded-xl p-5 mb-4 border border-zinc-800">
                    {/* Header */}
                    <View className="flex-row items-center justify-between mb-4">
                      <View className="flex-row items-center flex-1">
                        <View className={`w-14 h-14 bg-${challenge.color}-500 rounded-xl items-center justify-center`}>
                          <Ionicons name={challenge.icon as any} size={28} color="white" />
                        </View>
                        <View className="flex-1 ml-3">
                          <Text className="text-white font-bold text-lg">{challenge.name}</Text>
                          <Text className="text-zinc-400 text-sm">{challenge.description}</Text>
                        </View>
                      </View>
                    </View>

                    {/* Progress */}
                    <View className="flex-row gap-2 mb-4">
                      <View className="flex-1 bg-primary/10 rounded-lg p-3 border border-primary/30">
                        <Text className="text-primary/80 text-xs mb-1">Día Actual</Text>
                        <Text className="text-primary/80 font-bold text-2xl">
                          {currentDay}/{challenge.duration}
                        </Text>
                      </View>
                      <View className="flex-1 bg-primary/10 rounded-lg p-3 border border-primary/30">
                        <Text className="text-primary text-xs mb-1">Completado</Text>
                        <Text className="text-primary font-bold text-2xl">
                          {completionRate}%
                        </Text>
                      </View>
                      <View className="flex-1 bg-amber-500/10 rounded-lg p-3 border border-amber-500/30">
                        <Text className="text-amber-400 text-xs mb-1">Restantes</Text>
                        <Text className="text-amber-400 font-bold text-2xl">
                          {daysRemaining}
                        </Text>
                      </View>
                    </View>

                    {/* Progress Bar */}
                    <View className="mb-4">
                      <View className="h-3 bg-zinc-800 rounded-full overflow-hidden">
                        <View 
                          className={`h-full bg-${challenge.color}-500 rounded-full`}
                          style={{ width: `${completionRate}%` }}
                        />
                      </View>
                    </View>

                    {/* Daily Tasks */}
                    <View className="bg-zinc-800 rounded-lg p-3 mb-4">
                      <Text className="text-white font-bold mb-2">Tareas del Día</Text>
                      {challenge.dailyTasks.map((task, idx) => (
                        <View key={idx} className="flex-row items-start mb-1 last:mb-0">
                          <Ionicons name="checkmark-circle" size={16} color="#9D12DE" />
                          <Text className="text-zinc-300 text-sm ml-2 flex-1">{task}</Text>
                        </View>
                      ))}
                    </View>

                    {/* Complete Day Button */}
                    <View className="flex-row gap-2">
                      <TouchableOpacity
                        onPress={() => markDayComplete(challenge.id)}
                        className={`flex-1 rounded-xl p-4 flex-row items-center justify-center ${
                          isDayComplete
                            ? 'bg-primary'
                            : `bg-${challenge.color}-500/10 border-2 border-${challenge.color}-500/30`
                        }`}
                      >
                        <Ionicons
                          name={isDayComplete ? 'checkmark-circle' : 'checkbox-outline'}
                          size={20}
                          color={isDayComplete ? 'white' : '#71717A'}
                        />
                        <Text className={`font-bold ml-2 ${isDayComplete ? 'text-white' : 'text-zinc-400'}`}>
                          {isDayComplete ? 'Completado ✓' : 'Completar Hoy'}
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => abandonChallenge(challenge.id)}
                        className="bg-zinc-800 rounded-xl p-4"
                      >
                        <Ionicons name="trash" size={20} color="#EF4444" />
                      </TouchableOpacity>
                    </View>

                    {/* Reward */}
                    <View className="mt-3 bg-amber-500/10 rounded-lg p-3 border border-amber-500/30">
                      <Text className="text-amber-400 text-xs mb-1">ðŸ† Recompensa al Completar:</Text>
                      <Text className="text-amber-300 text-sm">{challenge.reward}</Text>
                    </View>
                  </View>
                );
              })}
            </>
          )}

          {/* Available Challenges */}
          <Text className="text-white font-bold text-lg mb-4 mt-4">
            Challenges Disponibles
          </Text>

          {CHALLENGE_TEMPLATES.map((template, index) => (
            <View key={index} className="bg-zinc-900 rounded-xl p-5 mb-4 border border-zinc-800">
              <View className="flex-row items-center mb-3">
                <View className={`w-12 h-12 bg-${template.color}-500 rounded-xl items-center justify-center`}>
                  <Ionicons name={template.icon as any} size={24} color="white" />
                </View>
                <View className="flex-1 ml-3">
                  <Text className="text-white font-bold text-lg">{template.name}</Text>
                  <Text className="text-zinc-400 text-sm">{template.description}</Text>
                </View>
              </View>

              <View className="flex-row items-center mb-3">
                <Ionicons name="calendar" size={16} color="#71717A" />
                <Text className="text-zinc-400 text-sm ml-2">{template.duration} días</Text>
                <Ionicons name="trophy" size={16} color="#FFEA00" className="ml-4" />
                <Text className="text-zinc-400 text-sm ml-2 flex-1" numberOfLines={1}>
                  {template.reward}
                </Text>
              </View>

              <TouchableOpacity
                onPress={() => startChallenge(template)}
                className={`bg-${template.color}-500 rounded-xl p-4 flex-row items-center justify-center`}
              >
                <Ionicons name="flash" size={20} color="white" />
                <Text className="text-white font-bold ml-2">Iniciar Challenge</Text>
              </TouchableOpacity>
            </View>
          ))}

          {/* Tips */}
          <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-6 mt-4">
            <View className="flex-row items-start">
              <Ionicons name="bulb" size={20} color="#9D12DE" />
              <View className="flex-1 ml-3">
                <Text className="text-primary/80 font-bold mb-2">
                  Tips para Challenges
                </Text>
                <Text className="text-primary/60 text-sm">
                  • Empieza con 1 challenge a la vez{'\n'}
                  • Prepara todo la noche anterior{'\n'}
                  • Comparte con amigos para accountability{'\n'}
                  • Si fallas 1 día, continúa al siguiente{'\n'}
                  • Celebra hitos: día 7, 14, 21, 30{'\n'}
                  • 30 días = nuevo hábito consolidado
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

