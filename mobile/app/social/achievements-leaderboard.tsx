import React, { useState } from 'react';
import { Text } from '@/components/ui/Text';
import { View, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';;
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  category: 'strength' | 'volume' | 'consistency' | 'milestone';
  achieved: boolean;
  progress: number;
  target: number;
  unit: string;
  dateAchieved?: Date;
}

const ACHIEVEMENTS: Achievement[] = [
  {
    id: '1',
    name: '1000 Club',
    description: 'Suma 1000 lbs en sentadilla, press banca y peso muerto',
    icon: 'trophy',
    color: 'amber',
    category: 'strength',
    achieved: true,
    progress: 1050,
    target: 1000,
    unit: 'lbs',
    dateAchieved: new Date(2026, 0, 15),
  },
  {
    id: '2',
    name: 'Centurión',
    description: 'Entrena 100 días seguidos',
    icon: 'flame',
    color: 'red',
    category: 'consistency',
    achieved: false,
    progress: 67,
    target: 100,
    unit: 'días',
  },
  {
    id: '3',
    name: '2• BW Bench',
    description: 'Press banca con 2• tu peso corporal',
    icon: 'barbell',
    color: 'primary',
    category: 'strength',
    achieved: false,
    progress: 145,
    target: 160,
    unit: 'kg',
  },
  {
    id: '4',
    name: '100k Volumen',
    description: 'Levanta 100,000 kg en un mes',
    icon: 'trending-up',
    color: 'blue',
    category: 'volume',
    achieved: false,
    progress: 78500,
    target: 100000,
    unit: 'kg',
  },
  {
    id: '5',
    name: '30 Días Streak',
    description: 'Entrena 30 días consecutivos',
    icon: 'calendar',
    color: 'purple',
    category: 'consistency',
    achieved: true,
    progress: 30,
    target: 30,
    unit: 'días',
    dateAchieved: new Date(2026, 0, 10),
  },
  {
    id: '6',
    name: 'Primera Dominada',
    description: 'Completa tu primera dominada',
    icon: 'fitness',
    color: 'cyan',
    category: 'milestone',
    achieved: true,
    progress: 1,
    target: 1,
    unit: 'rep',
    dateAchieved: new Date(2025, 11, 5),
  },
];

interface LeaderboardEntry {
  rank: number;
  name: string;
  value: number;
  unit: string;
  avatar?: string;
  isCurrentUser?: boolean;
}

const MOCK_LEADERBOARD: LeaderboardEntry[] = [
  { rank: 1, name: 'Carlos M.', value: 200, unit: 'kg' },
  { rank: 2, name: 'Miguel R.', value: 195, unit: 'kg' },
  { rank: 3, name: 'Tú', value: 185, unit: 'kg', isCurrentUser: true },
  { rank: 4, name: 'David L.', value: 180, unit: 'kg' },
  { rank: 5, name: 'Pablo S.', value: 175, unit: 'kg' },
];

export default function AchievementsLeaderboard() {
  const [activeTab, setActiveTab] = useState<'achievements' | 'leaderboard'>('achievements');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [leaderboardType, setLeaderboardType] = useState<'bench' | 'squat' | 'deadlift' | 'total'>('bench');

  const categories = [
    { key: 'all', label: 'Todos', icon: 'apps' },
    { key: 'strength', label: 'Fuerza', icon: 'barbell' },
    { key: 'volume', label: 'Volumen', icon: 'trending-up' },
    { key: 'consistency', label: 'Consistencia', icon: 'flame' },
    { key: 'milestone', label: 'Hitos', icon: 'star' },
  ];

  const leaderboardTypes = [
    { key: 'bench', label: 'Press Banca', icon: 'barbell' },
    { key: 'squat', label: 'Sentadilla', icon: 'fitness' },
    { key: 'deadlift', label: 'Peso Muerto', icon: 'body' },
    { key: 'total', label: 'Total', icon: 'trophy' },
  ];

  const filteredAchievements = selectedCategory === 'all'
    ? ACHIEVEMENTS
    : ACHIEVEMENTS.filter(a => a.category === selectedCategory);

  const achievedCount = ACHIEVEMENTS.filter(a => a.achieved).length;
  const achievementPoints = ACHIEVEMENTS.filter(a => a.achieved).length * 100;

  return (
    <View className="flex-1 bg-zinc-950">
      {/* Header */}
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1 ml-3">
            Social
          </Text>
        </View>
      </View>

      {/* Tabs */}
      <View className="px-6 pt-4">
        <View className="flex-row gap-3 mb-6">
          <TouchableOpacity
            onPress={() => setActiveTab('achievements')}
            className={`flex-1 rounded-xl p-4 ${
              activeTab === 'achievements' ? 'bg-purple-500' : 'bg-zinc-900 border border-zinc-800'
            }`}
          >
            <View className="flex-row items-center justify-center">
              <Ionicons
                name="trophy"
                size={20}
                color={activeTab === 'achievements' ? 'white' : '#71717A'}
              />
              <Text className={`font-bold ml-2 ${activeTab === 'achievements' ? 'text-white' : 'text-zinc-400'}`}>
                Logros
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setActiveTab('leaderboard')}
            className={`flex-1 rounded-xl p-4 ${
              activeTab === 'leaderboard' ? 'bg-primary' : 'bg-zinc-900 border border-zinc-800'
            }`}
          >
            <View className="flex-row items-center justify-center">
              <Ionicons
                name="podium"
                size={20}
                color={activeTab === 'leaderboard' ? 'white' : '#71717A'}
              />
              <Text className={`font-bold ml-2 ${activeTab === 'leaderboard' ? 'text-white' : 'text-zinc-400'}`}>
                Ranking
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {activeTab === 'achievements' ? (
          <View className="px-6">
            {/* Stats */}
            <View className="flex-row gap-3 mb-6">
              <View className="flex-1 bg-gradient-to-r from-amber-500 to-red-500 rounded-xl p-4">
                <Text className="text-white opacity-90 text-xs mb-1">Logros</Text>
                <Text className="text-white text-3xl font-bold">
                  {achievedCount}/{ACHIEVEMENTS.length}
                </Text>
              </View>
              <View className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl p-4">
                <Text className="text-white opacity-90 text-xs mb-1">Puntos</Text>
                <Text className="text-white text-3xl font-bold">{achievementPoints}</Text>
              </View>
            </View>

            {/* Category Filter */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-4">
              <View className="flex-row gap-2">
                {categories.map((cat) => (
                  <TouchableOpacity
                    key={cat.key}
                    onPress={() => setSelectedCategory(cat.key)}
                    className={`rounded-xl px-4 py-2 flex-row items-center ${
                      selectedCategory === cat.key
                        ? 'bg-purple-500'
                        : 'bg-zinc-900 border border-zinc-800'
                    }`}
                  >
                    <Ionicons
                      name={cat.icon as any}
                      size={18}
                      color={selectedCategory === cat.key ? 'white' : '#71717A'}
                    />
                    <Text className={`ml-2 font-bold ${selectedCategory === cat.key ? 'text-white' : 'text-zinc-400'}`}>
                      {cat.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>

            {/* Achievements List */}
            {filteredAchievements.map((achievement) => {
              const progressPercent = Math.min(Math.round((achievement.progress / achievement.target) * 100), 100);

              return (
                <View
                  key={achievement.id}
                  className={`rounded-xl p-5 mb-4 ${
                    achievement.achieved
                      ? `bg-${achievement.color}-500/10 border border-${achievement.color}-500/30`
                      : 'bg-zinc-900 border border-zinc-800'
                  }`}
                >
                  <View className="flex-row items-start justify-between mb-3">
                    <View className="flex-row items-start flex-1">
                      <View className={`w-14 h-14 bg-${achievement.color}-500 rounded-xl items-center justify-center`}>
                        <Ionicons name={achievement.icon as any} size={28} color="white" />
                      </View>
                      <View className="flex-1 ml-3">
                        <Text className="text-white font-bold text-lg mb-1">{achievement.name}</Text>
                        <Text className="text-zinc-400 text-sm">{achievement.description}</Text>
                      </View>
                    </View>
                    {achievement.achieved && (
                      <View className="bg-primary rounded-full p-2">
                        <Ionicons name="checkmark" size={20} color="white" />
                      </View>
                    )}
                  </View>

                  {/* Progress */}
                  {!achievement.achieved && (
                    <>
                      <View className="mb-2">
                        <View className="flex-row items-center justify-between mb-2">
                          <Text className="text-zinc-400 text-sm">Progreso</Text>
                          <Text className={`text-${achievement.color}-400 font-bold`}>
                            {achievement.progress}/{achievement.target} {achievement.unit}
                          </Text>
                        </View>
                        <View className="h-3 bg-zinc-800 rounded-full overflow-hidden">
                          <View 
                            className={`h-full bg-${achievement.color}-500 rounded-full`}
                            style={{ width: `${progressPercent}%` }}
                          />
                        </View>
                      </View>
                      <Text className="text-zinc-500 text-xs">
                        Faltan {achievement.target - achievement.progress} {achievement.unit}
                      </Text>
                    </>
                  )}

                  {achievement.achieved && achievement.dateAchieved && (
                    <View className={`bg-${achievement.color}-500/20 rounded-lg p-2 mt-2`}>
                      <Text className={`text-${achievement.color}-400 text-xs font-bold`}>
                        ? Desbloqueado: {achievement.dateAchieved.toLocaleDateString('es-ES')}
                      </Text>
                    </View>
                  )}
                </View>
              );
            })}

            {filteredAchievements.length === 0 && (
              <View className="bg-zinc-900 rounded-xl p-8 border border-zinc-800 items-center">
                <Ionicons name="trophy-outline" size={64} color="#52525B" />
                <Text className="text-zinc-400 text-center mt-4">
                  No hay logros en esta categoría
                </Text>
              </View>
            )}
          </View>
        ) : (
          <View className="px-6">
            {/* Leaderboard Type Selector */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6">
              <View className="flex-row gap-2">
                {leaderboardTypes.map((type) => (
                  <TouchableOpacity
                    key={type.key}
                    onPress={() => setLeaderboardType(type.key as any)}
                    className={`rounded-xl px-4 py-3 flex-row items-center ${
                      leaderboardType === type.key
                        ? 'bg-primary'
                        : 'bg-zinc-900 border border-zinc-800'
                    }`}
                  >
                    <Ionicons
                      name={type.icon as any}
                      size={18}
                      color={leaderboardType === type.key ? 'white' : '#71717A'}
                    />
                    <Text className={`ml-2 font-bold ${leaderboardType === type.key ? 'text-white' : 'text-zinc-400'}`}>
                      {type.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>

            {/* Podium */}
            <View className="mb-6">
              <View className="flex-row items-end justify-center gap-2 mb-4">
                {/* 2nd Place */}
                <View className="flex-1 items-center">
                  <View className="w-16 h-16 bg-zinc-600 rounded-full items-center justify-center mb-2">
                    <Text className="text-white text-2xl font-bold">2</Text>
                  </View>
                  <View className="w-full bg-zinc-800 rounded-t-xl p-4 h-32 items-center justify-center">
                    <Text className="text-white font-bold text-sm text-center">{MOCK_LEADERBOARD[1].name}</Text>
                    <Text className="text-primary font-bold text-xl mt-1">
                      {MOCK_LEADERBOARD[1].value} {MOCK_LEADERBOARD[1].unit}
                    </Text>
                  </View>
                </View>

                {/* 1st Place */}
                <View className="flex-1 items-center">
                  <View className="w-20 h-20 bg-amber-500 rounded-full items-center justify-center mb-2">
                    <Ionicons name="trophy" size={32} color="white" />
                  </View>
                  <View className="w-full bg-gradient-to-b from-amber-500 to-amber-600 rounded-t-xl p-4 h-40 items-center justify-center">
                    <Text className="text-white font-bold text-center">{MOCK_LEADERBOARD[0].name}</Text>
                    <Text className="text-white font-bold text-2xl mt-1">
                      {MOCK_LEADERBOARD[0].value} {MOCK_LEADERBOARD[0].unit}
                    </Text>
                  </View>
                </View>

                {/* 3rd Place */}
                <View className="flex-1 items-center">
                  <View className="w-16 h-16 bg-amber-700 rounded-full items-center justify-center mb-2">
                    <Text className="text-white text-2xl font-bold">3</Text>
                  </View>
                  <View className="w-full bg-zinc-800 rounded-t-xl p-4 h-24 items-center justify-center">
                    <Text className="text-white font-bold text-sm text-center">{MOCK_LEADERBOARD[2].name}</Text>
                    <Text className="text-primary font-bold text-lg mt-1">
                      {MOCK_LEADERBOARD[2].value} {MOCK_LEADERBOARD[2].unit}
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Full Leaderboard */}
            <Text className="text-white font-bold text-lg mb-4">Rankings Completos</Text>
            {MOCK_LEADERBOARD.map((entry) => (
              <View
                key={entry.rank}
                className={`rounded-xl p-4 mb-3 flex-row items-center ${
                  entry.isCurrentUser
                    ? 'bg-primary/10 border-2 border-primary/30'
                    : 'bg-zinc-900 border border-zinc-800'
                }`}
              >
                <View className={`w-10 h-10 rounded-full items-center justify-center mr-3 ${
                  entry.rank === 1 ? 'bg-amber-500' :
                  entry.rank === 2 ? 'bg-zinc-600' :
                  entry.rank === 3 ? 'bg-amber-700' : 'bg-zinc-700'
                }`}>
                  <Text className="text-white font-bold">#{entry.rank}</Text>
                </View>

                <View className="flex-1">
                  <Text className={`font-bold ${entry.isCurrentUser ? 'text-primary/80' : 'text-white'}`}>
                    {entry.name}
                  </Text>
                </View>

                <Text className="text-primary font-bold text-xl">
                  {entry.value} {entry.unit}
                </Text>
              </View>
            ))}

            {/* Share Button */}
            <TouchableOpacity
              onPress={() => Alert.alert('Compartir', 'Compartir ranking en redes sociales')}
              className="bg-primary rounded-xl p-4 flex-row items-center justify-center mb-6 mt-4"
            >
              <Ionicons name="share-social" size={24} color="white" />
              <Text className="text-white font-bold text-lg ml-2">Compartir Ranking</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Info */}
        <View className="px-6 mb-6">
          <View className="bg-primary/10 rounded-xl p-4 border border-primary/30">
            <View className="flex-row items-start">
              <Ionicons name="information-circle" size={20} color="#9D12DE" />
              <View className="flex-1 ml-3">
                <Text className="text-primary/80 font-bold mb-2">
                  {activeTab === 'achievements' ? 'Sobre los Logros' : 'Sobre los Rankings'}
                </Text>
                <Text className="text-primary/60 text-sm">
                  {activeTab === 'achievements' 
                    ? '• Desbloquea logros entrenando consistente\n• Cada logro = 100 puntos\n• Comparte tus logros con amigos\n• Nuevos logros cada mes'
                    : '• Rankings actualizados diariamente\n• Compite con amigos del gym\n• Crea grupos privados\n• Filtra por peso corporal'}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

