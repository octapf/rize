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

interface DailyQuest {
  id: string;
  title: string;
  description: string;
  xp: number;
  category: 'workout' | 'nutrition' | 'recovery' | 'social' | 'challenge';
  completed: boolean;
  icon: string;
  color: string;
}

interface Streak {
  name: string;
  current: number;
  best: number;
  active: boolean;
  icon: string;
  color: string;
}

interface LevelProgress {
  currentLevel: number;
  currentXP: number;
  xpToNextLevel: number;
  totalXP: number;
}

const DAILY_QUESTS: DailyQuest[] = [
  {
    id: '1',
    title: 'Completa tu Workout',
    description: 'Finaliza tu entrenamiento programado del día',
    xp: 100,
    category: 'workout',
    completed: true,
    icon: 'ðŸ’ª',
    color: 'bg-red-500',
  },
  {
    id: '2',
    title: 'Alcanza tus Macros',
    description: 'Cumple con proteínas, carbos y grasas del día',
    xp: 75,
    category: 'nutrition',
    completed: true,
    icon: 'ðŸŽ',
    color: 'bg-primary',
  },
  {
    id: '3',
    title: 'Duerme 8 Horas',
    description: 'Registra al menos 8 horas de sueño',
    xp: 50,
    category: 'recovery',
    completed: false,
    icon: '😐´',
    color: 'bg-primary',
  },
  {
    id: '4',
    title: 'Comparte tu Progreso',
    description: 'Publica en el feed social',
    xp: 25,
    category: 'social',
    completed: false,
    icon: 'ðŸ“¸',
    color: 'bg-purple-500',
  },
  {
    id: '5',
    title: 'Supera un PR',
    description: 'Establece un nuevo récord personal',
    xp: 150,
    category: 'challenge',
    completed: false,
    icon: 'ðŸ†',
    color: 'bg-amber-500',
  },
];

const STREAKS: Streak[] = [
  {
    name: 'Racha de Entrenamientos',
    current: 12,
    best: 28,
    active: true,
    icon: 'ðŸ”¥',
    color: 'bg-orange-500',
  },
  {
    name: 'Nutrición Perfecta',
    current: 5,
    best: 14,
    active: true,
    icon: 'ðŸ¥—',
    color: 'bg-primary',
  },
  {
    name: 'Sueño Ã“ptimo',
    current: 3,
    best: 9,
    active: true,
    icon: 'ðŸŒ™',
    color: 'bg-indigo-500',
  },
  {
    name: 'Compromiso Total',
    current: 0,
    best: 7,
    active: false,
    icon: 'ðŸ’¯',
    color: 'bg-purple-500',
  },
];

const LEVEL_PROGRESS: LevelProgress = {
  currentLevel: 18,
  currentXP: 3450,
  xpToNextLevel: 4000,
  totalXP: 24850,
};

const WEEKLY_BONUS = [
  { day: 'Lun', completed: true },
  { day: 'Mar', completed: true },
  { day: 'Mié', completed: true },
  { day: 'Jue', completed: false },
  { day: 'Vie', completed: false },
  { day: 'Sáb', completed: false },
  { day: 'Dom', completed: false },
];

export default function DailyQuests() {
  const [quests, setQuests] = useState(DAILY_QUESTS);

  const completeQuest = (id: string) => {
    const quest = quests.find((q) => q.id === id);
    if (quest && !quest.completed) {
      setQuests(
        quests.map((q) =>
          q.id === id ? { ...q, completed: true } : q
        )
      );
      Alert.alert(
        `✅ Quest Completada!`,
        `+${quest.xp} XP ganados\n\n"${quest.title}"`,
        [{ text: 'Awesome!' }]
      );
    }
  };

  const completedQuests = quests.filter((q) => q.completed).length;
  const totalXPToday = quests
    .filter((q) => q.completed)
    .reduce((sum, q) => sum + q.xp, 0);

  const progressPercent = (LEVEL_PROGRESS.currentXP / LEVEL_PROGRESS.xpToNextLevel) * 100;

  return (
    <View className="flex-1 bg-zinc-950">
      {/* Header */}
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1 ml-3">
            Quests Diarias
          </Text>
          <TouchableOpacity>
            <Ionicons name="trophy" size={24} color="#FFEA00" />
          </TouchableOpacity>
        </View>

        {/* Level Progress */}
        <View className="bg-zinc-900 rounded-xl p-4 border border-zinc-800 mb-4">
          <View className="flex-row items-center justify-between mb-3">
            <View className="flex-row items-center">
              <View className="w-14 h-14 bg-amber-500 rounded-full items-center justify-center mr-3">
                <Text className="text-white text-xl font-bold">
                  {LEVEL_PROGRESS.currentLevel}
                </Text>
              </View>
              <View>
                <Text className="text-zinc-400 text-xs">NIVEL</Text>
                <Text className="text-white text-2xl font-bold">
                  {LEVEL_PROGRESS.currentLevel}
                </Text>
              </View>
            </View>
            <View className="items-end">
              <Text className="text-zinc-400 text-xs">TOTAL XP</Text>
              <Text className="text-white text-xl font-bold">
                {LEVEL_PROGRESS.totalXP.toLocaleString()}
              </Text>
            </View>
          </View>

          <View className="mb-2">
            <View className="flex-row items-center justify-between mb-1">
              <Text className="text-zinc-400 text-sm">
                {LEVEL_PROGRESS.currentXP} / {LEVEL_PROGRESS.xpToNextLevel} XP
              </Text>
              <Text className="text-primary text-sm font-bold">
                {LEVEL_PROGRESS.xpToNextLevel - LEVEL_PROGRESS.currentXP} restante
              </Text>
            </View>
            <View className="h-3 bg-zinc-800 rounded-full overflow-hidden">
              <View
                className="h-full bg-gradient-to-r from-primary to-[#7D0EBE] rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </View>
          </View>

          <Text className="text-zinc-400 text-xs text-center">
            ¡{Math.round(progressPercent)}% hacia el Nivel {LEVEL_PROGRESS.currentLevel + 1}!
          </Text>
        </View>

        {/* Daily Summary */}
        <View className="bg-zinc-900 rounded-xl p-4 border border-zinc-800">
          <View className="flex-row items-center justify-between">
            <View className="flex-1">
              <Text className="text-zinc-400 text-xs mb-1">QUESTS HOY</Text>
              <Text className="text-white text-3xl font-bold">
                {completedQuests}/{quests.length}
              </Text>
            </View>
            <View className="flex-1 items-center">
              <Text className="text-zinc-400 text-xs mb-1">XP GANADO</Text>
              <Text className="text-primary text-3xl font-bold">+{totalXPToday}</Text>
            </View>
            <View className="flex-1 items-end">
              <Text className="text-zinc-400 text-xs mb-1">RACHA</Text>
              <Text className="text-amber-400 text-3xl font-bold">12ðŸ”¥</Text>
            </View>
          </View>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Daily Quests */}
        <View className="px-6 pt-6">
          <Text className="text-white font-bold text-lg mb-3">Hoy</Text>
          {quests.map((quest) => (
            <TouchableOpacity
              key={quest.id}
              onPress={() => completeQuest(quest.id)}
              activeOpacity={0.7}
              className={`bg-zinc-900 rounded-xl p-4 mb-3 border ${
                quest.completed ? 'border-primary/30' : 'border-zinc-800'
              }`}
            >
              <View className="flex-row items-start">
                <View
                  className={`w-12 h-12 ${quest.color} rounded-xl items-center justify-center mr-3 ${
                    quest.completed ? 'opacity-50' : ''
                  }`}
                >
                  <Text className="text-3xl">{quest.icon}</Text>
                </View>

                <View className="flex-1">
                  <View className="flex-row items-start justify-between mb-1">
                    <Text
                      className={`text-white font-bold text-base flex-1 ${
                        quest.completed ? 'line-through opacity-50' : ''
                      }`}
                    >
                      {quest.title}
                    </Text>
                    {quest.completed ? (
                      <Ionicons name="checkmark-circle" size={24} color="#9D12DE" />
                    ) : (
                      <View className="bg-zinc-800 rounded-lg px-2 py-1">
                        <Text className="text-amber-400 text-xs font-bold">+{quest.xp} XP</Text>
                      </View>
                    )}
                  </View>

                  <Text
                    className={`text-zinc-400 text-sm mb-2 ${
                      quest.completed ? 'opacity-50' : ''
                    }`}
                  >
                    {quest.description}
                  </Text>

                  <View className="flex-row items-center">
                    <View
                      className={`px-2 py-1 rounded-lg ${
                        quest.category === 'workout'
                          ? 'bg-red-500/10'
                          : quest.category === 'nutrition'
                          ? 'bg-primary/10'
                          : quest.category === 'recovery'
                          ? 'bg-primary/10'
                          : quest.category === 'social'
                          ? 'bg-purple-500/10'
                          : 'bg-amber-500/10'
                      }`}
                    >
                      <Text
                        className={`text-xs ${
                          quest.category === 'workout'
                            ? 'text-red-400'
                            : quest.category === 'nutrition'
                            ? 'text-primary'
                            : quest.category === 'recovery'
                            ? 'text-primary/80'
                            : quest.category === 'social'
                            ? 'text-purple-400'
                            : 'text-amber-400'
                        }`}
                      >
                        {quest.category.toUpperCase()}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}

          {/* Weekly Bonus */}
          <View className="bg-zinc-900 rounded-xl p-4 border border-zinc-800 mb-6 mt-3">
            <Text className="text-white font-bold text-lg mb-3">Bonus Semanal</Text>
            <Text className="text-zinc-400 text-sm mb-4">
              Completa todas las quests 7 días seguidos para ganar 500 XP bonus
            </Text>
            <View className="flex-row items-center justify-between">
              {WEEKLY_BONUS.map((day, index) => (
                <View key={index} className="items-center">
                  <View
                    className={`w-10 h-10 rounded-full items-center justify-center mb-1 ${
                      day.completed ? 'bg-primary' : 'bg-zinc-800'
                    }`}
                  >
                    {day.completed ? (
                      <Ionicons name="checkmark" size={20} color="white" />
                    ) : (
                      <Text className="text-zinc-400 text-sm">{day.day[0]}</Text>
                    )}
                  </View>
                  <Text className="text-zinc-500 text-xs">{day.day}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Streaks */}
          <Text className="text-white font-bold text-lg mb-3">Rachas</Text>
          {STREAKS.map((streak, index) => (
            <View
              key={index}
              className="bg-zinc-900 rounded-xl p-4 mb-3 border border-zinc-800"
            >
              <View className="flex-row items-center justify-between mb-2">
                <View className="flex-row items-center flex-1">
                  <View className={`w-10 h-10 ${streak.color} rounded-full items-center justify-center mr-3`}>
                    <Text className="text-2xl">{streak.icon}</Text>
                  </View>
                  <View className="flex-1">
                    <Text className="text-white font-bold">{streak.name}</Text>
                    <Text className="text-zinc-400 text-sm">
                      Mejor: {streak.best} días
                    </Text>
                  </View>
                </View>
                <View className="items-end">
                  <Text
                    className={`text-3xl font-bold ${
                      streak.active ? 'text-amber-400' : 'text-zinc-600'
                    }`}
                  >
                    {streak.current}
                  </Text>
                  <Text className="text-zinc-400 text-xs">días</Text>
                </View>
              </View>

              {streak.active && (
                <View className="bg-primary/10 rounded-lg p-2 border border-primary/30">
                  <Text className="text-primary text-xs text-center">
                    ✓ ¡Racha Activa! ¡No la rompas!
                  </Text>
                </View>
              )}

              {!streak.active && (
                <View className="bg-zinc-800 rounded-lg p-2">
                  <Text className="text-zinc-400 text-xs text-center">
                    Racha perdida. ¡Empieza de nuevo hoy!
                  </Text>
                </View>
              )}
            </View>
          ))}
        </View>

        {/* Info Card */}
        <View className="px-6 pb-6 pt-2">
          <View className="bg-amber-500/10 rounded-xl p-4 border border-amber-500/30">
            <View className="flex-row items-start">
              <Ionicons name="game-controller" size={20} color="#FFEA00" />
              <View className="flex-1 ml-3">
                <Text className="text-amber-400 font-bold mb-2">
                  Gamifica tu Progreso
                </Text>
                <Text className="text-amber-300 text-sm">
                  Completa quests, mantén rachas y sube de nivel. Convierte cada
                  entrenamiento en una victoria épica.
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

