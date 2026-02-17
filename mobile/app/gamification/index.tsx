import React, { useState } from 'react';
import { Text } from '@/components/ui/Text';
import { View, TouchableOpacity, ScrollView, Dimensions } from 'react-native';;
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LineChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

interface Quest {
  id: string;
  title: string;
  description: string;
  progress: number;
  target: number;
  xp: number;
  type: 'daily' | 'weekly' | 'special';
  icon: string;
  completed: boolean;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
  unlocked: boolean;
  unlockedAt?: string;
  icon: string;
  xp: number;
}

const QUESTS: Quest[] = [
  {
    id: '1',
    title: 'Racha Semanal',
    description: 'Entrena 5 días esta semana',
    progress: 3,
    target: 5,
    xp: 250,
    type: 'weekly',
    icon: 'flame',
    completed: false,
  },
  {
    id: '2',
    title: 'Maestro de Macros',
    description: 'Cumple tus macros hoy',
    progress: 1,
    target: 1,
    xp: 100,
    type: 'daily',
    icon: 'nutrition',
    completed: true,
  },
  {
    id: '3',
    title: 'Síper Serie',
    description: 'Completa un workout de 60+ min',
    progress: 45,
    target: 60,
    xp: 150,
    type: 'daily',
    icon: 'timer',
    completed: false,
  },
  {
    id: '4',
    title: 'Desafío Premium',
    description: 'Completa 10 ejercicios avanzados',
    progress: 6,
    target: 10,
    xp: 500,
    type: 'special',
    icon: 'trophy',
    completed: false,
  },
];

const ACHIEVEMENTS: Achievement[] = [
  {
    id: '1',
    title: 'Primera Vez',
    description: 'Completa tu primer workout',
    tier: 'bronze',
    unlocked: true,
    unlockedAt: '2025-01-10',
    icon: 'star',
    xp: 50,
  },
  {
    id: '2',
    title: 'Racha de Fuego',
    description: 'Entrena 7 días seguidos',
    tier: 'silver',
    unlocked: true,
    unlockedAt: '2025-01-20',
    icon: 'flame',
    xp: 200,
  },
  {
    id: '3',
    title: 'Fuerza Titúnica',
    description: 'Levanta 10,000 kg totales',
    tier: 'gold',
    unlocked: false,
    icon: 'barbell',
    xp: 500,
  },
  {
    id: '4',
    title: 'Leyenda',
    description: 'Alcanza nivel 50',
    tier: 'platinum',
    unlocked: false,
    icon: 'trophy',
    xp: 1000,
  },
];

export default function Gamification() {
  const [currentLevel, setCurrentLevel] = useState(12);
  const [currentXP, setCurrentXP] = useState(2340);
  const [nextLevelXP] = useState(3000);
  const [totalXP] = useState(15840);

  const xpProgress = (currentXP / nextLevelXP) * 100;

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'bronze':
        return '#CD7F32';
      case 'silver':
        return '#C0C0C0';
      case 'gold':
        return '#FFD700';
      case 'platinum':
        return '#E5E4E2';
      default:
        return '#71717A';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'daily':
        return '#9D12DE';
      case 'weekly':
        return '#9D12DE';
      case 'special':
        return '#8B5CF6';
      default:
        return '#71717A';
    }
  };

  // XP history for chart
  const xpData = {
    labels: ['L', 'M', 'X', 'J', 'V', 'S', 'D'],
    datasets: [
      {
        data: [320, 450, 380, 520, 410, 390, 870],
        color: (opacity = 1) => `rgba(139, 92, 246, ${opacity})`,
        strokeWidth: 3,
      },
    ],
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
            Progreso y Logros
          </Text>
          <TouchableOpacity>
            <Ionicons name="gift-outline" size={24} color="#8B5CF6" />
          </TouchableOpacity>
        </View>

        {/* Level Card */}
        <View className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl p-4 border border-purple-500/30">
          <View className="flex-row items-center justify-between mb-3">
            <View className="flex-row items-center">
              <View className="bg-purple-500 w-14 h-14 rounded-full items-center justify-center">
                <Text className="text-white text-xl font-bold">{currentLevel}</Text>
              </View>
              <View className="ml-3">
                <Text className="text-white font-bold text-lg">Nivel {currentLevel}</Text>
                <Text className="text-purple-300 text-sm">
                  {totalXP.toLocaleString()} XP Total
                </Text>
              </View>
            </View>
            <View className="items-end">
              <Text className="text-white font-bold text-lg">{currentXP}</Text>
              <Text className="text-purple-300 text-sm">/ {nextLevelXP} XP</Text>
            </View>
          </View>

          {/* XP Progress Bar */}
          <View className="bg-zinc-900 h-3 rounded-full overflow-hidden">
            <View
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
              style={{ width: `${xpProgress}%` }}
            />
          </View>
          <Text className="text-purple-300 text-xs text-center mt-2">
            {Math.round(xpProgress)}% hasta el nivel {currentLevel + 1}
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Daily Quests */}
        <View className="px-6 pt-6">
          <Text className="text-white font-bold text-lg mb-3">Misiones Diarias</Text>

          {QUESTS.filter((q) => q.type === 'daily').map((quest) => (
            <View
              key={quest.id}
              className={`rounded-xl p-4 mb-3 border ${
                quest.completed
                  ? 'bg-primary/10 border-primary/30'
                  : 'bg-zinc-900 border-zinc-800'
              }`}
            >
              <View className="flex-row items-start justify-between mb-3">
                <View className="flex-1">
                  <View className="flex-row items-center mb-2">
                    <View
                      className="w-10 h-10 rounded-lg items-center justify-center"
                      style={{ backgroundColor: getTypeColor(quest.type) + '20' }}
                    >
                      <Ionicons
                        name={quest.icon as any}
                        size={20}
                        color={getTypeColor(quest.type)}
                      />
                    </View>
                    <View className="flex-1 ml-3">
                      <Text className="text-white font-bold">{quest.title}</Text>
                      <Text className="text-zinc-400 text-sm mt-0.5">
                        {quest.description}
                      </Text>
                    </View>
                  </View>
                </View>
                <View className="bg-purple-500/20 px-3 py-1 rounded-full">
                  <Text className="text-purple-400 font-bold text-sm">
                    +{quest.xp} XP
                  </Text>
                </View>
              </View>

              {/* Progress */}
              <View className="mb-2">
                <View className="flex-row items-center justify-between mb-1">
                  <Text className="text-zinc-400 text-xs">Progreso</Text>
                  <Text className="text-white text-xs font-bold">
                    {quest.progress}/{quest.target}
                  </Text>
                </View>
                <View className="bg-zinc-800 h-2 rounded-full overflow-hidden">
                  <View
                    className={`h-full rounded-full ${
                      quest.completed ? 'bg-primary' : 'bg-primary'
                    }`}
                    style={{ width: `${(quest.progress / quest.target) * 100}%` }}
                  />
                </View>
              </View>

              {quest.completed && (
                <View className="flex-row items-center justify-center mt-2">
                  <Ionicons name="checkmark-circle" size={16} color="#9D12DE" />
                  <Text className="text-primary font-semibold text-sm ml-2">
                    ¡Completado!
                  </Text>
                </View>
              )}
            </View>
          ))}
        </View>

        {/* Weekly Quests */}
        <View className="px-6 pt-6">
          <Text className="text-white font-bold text-lg mb-3">Misiones Semanales</Text>

          {QUESTS.filter((q) => q.type === 'weekly').map((quest) => (
            <View
              key={quest.id}
              className="bg-zinc-900 rounded-xl p-4 mb-3 border border-zinc-800"
            >
              <View className="flex-row items-start justify-between mb-3">
                <View className="flex-1">
                  <View className="flex-row items-center mb-2">
                    <View
                      className="w-10 h-10 rounded-lg items-center justify-center"
                      style={{ backgroundColor: getTypeColor(quest.type) + '20' }}
                    >
                      <Ionicons
                        name={quest.icon as any}
                        size={20}
                        color={getTypeColor(quest.type)}
                      />
                    </View>
                    <View className="flex-1 ml-3">
                      <Text className="text-white font-bold">{quest.title}</Text>
                      <Text className="text-zinc-400 text-sm mt-0.5">
                        {quest.description}
                      </Text>
                    </View>
                  </View>
                </View>
                <View className="bg-purple-500/20 px-3 py-1 rounded-full">
                  <Text className="text-purple-400 font-bold text-sm">
                    +{quest.xp} XP
                  </Text>
                </View>
              </View>

              <View className="mb-2">
                <View className="flex-row items-center justify-between mb-1">
                  <Text className="text-zinc-400 text-xs">Progreso</Text>
                  <Text className="text-white text-xs font-bold">
                    {quest.progress}/{quest.target}
                  </Text>
                </View>
                <View className="bg-zinc-800 h-2 rounded-full overflow-hidden">
                  <View
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${(quest.progress / quest.target) * 100}%` }}
                  />
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* XP History */}
        <View className="px-6 pt-6">
          <Text className="text-white font-bold text-lg mb-3">
            XP Esta Semana
          </Text>
          <View className="bg-zinc-900 rounded-xl p-4 border border-zinc-800">
            <LineChart
              data={xpData}
              width={screenWidth - 80}
              height={180}
              chartConfig={{
                backgroundColor: '#18181B',
                backgroundGradientFrom: '#18181B',
                backgroundGradientTo: '#18181B',
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(139, 92, 246, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(161, 161, 170, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: '6',
                  strokeWidth: '2',
                  stroke: '#8B5CF6',
                },
              }}
              bezier
              style={{
                borderRadius: 16,
              }}
            />
            <Text className="text-zinc-400 text-sm text-center mt-3">
              Total: 3,340 XP esta semana
            </Text>
          </View>
        </View>

        {/* Achievements */}
        <View className="px-6 pt-6 pb-6">
          <Text className="text-white font-bold text-lg mb-3">Logros</Text>

          {ACHIEVEMENTS.map((achievement) => (
            <View
              key={achievement.id}
              className={`rounded-xl p-4 mb-3 border ${
                achievement.unlocked
                  ? 'bg-zinc-900 border-zinc-800'
                  : 'bg-zinc-900/50 border-zinc-800/50'
              }`}
            >
              <View className="flex-row items-start">
                <View
                  className={`w-14 h-14 rounded-xl items-center justify-center ${
                    achievement.unlocked ? '' : 'opacity-30'
                  }`}
                  style={{
                    backgroundColor: getTierColor(achievement.tier) + '20',
                  }}
                >
                  <Ionicons
                    name={achievement.icon as any}
                    size={28}
                    color={getTierColor(achievement.tier)}
                  />
                </View>

                <View className="flex-1 ml-3">
                  <View className="flex-row items-center mb-1">
                    <Text
                      className={`font-bold ${
                        achievement.unlocked ? 'text-white' : 'text-zinc-600'
                      }`}
                    >
                      {achievement.title}
                    </Text>
                    <View
                      className="ml-2 px-2 py-0.5 rounded"
                      style={{
                        backgroundColor: getTierColor(achievement.tier) + '20',
                      }}
                    >
                      <Text
                        className="text-xs font-bold"
                        style={{ color: getTierColor(achievement.tier) }}
                      >
                        {achievement.tier.toUpperCase()}
                      </Text>
                    </View>
                  </View>
                  <Text
                    className={`text-sm mb-2 ${
                      achievement.unlocked ? 'text-zinc-400' : 'text-zinc-600'
                    }`}
                  >
                    {achievement.description}
                  </Text>

                  {achievement.unlocked ? (
                    <View className="flex-row items-center">
                      <Ionicons name="checkmark-circle" size={14} color="#9D12DE" />
                      <Text className="text-primary text-xs ml-1">
                        Desbloqueado el {achievement.unlockedAt}
                      </Text>
                    </View>
                  ) : (
                    <View className="flex-row items-center">
                      <Ionicons name="lock-closed" size={14} color="#71717A" />
                      <Text className="text-zinc-600 text-xs ml-1">Bloqueado</Text>
                    </View>
                  )}
                </View>

                <View className="items-end">
                  <Text
                    className={`font-bold ${
                      achievement.unlocked ? 'text-purple-400' : 'text-zinc-600'
                    }`}
                  >
                    +{achievement.xp}
                  </Text>
                  <Text className="text-zinc-600 text-xs">XP</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

