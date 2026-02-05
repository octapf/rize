import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface LeaderboardEntry {
  rank: number;
  userId: string;
  name: string;
  avatar: string;
  score: number;
  change: number;
  isCurrentUser?: boolean;
}

interface Leaderboard {
  id: string;
  title: string;
  metric: string;
  period: 'daily' | 'weekly' | 'monthly' | 'alltime';
  entries: LeaderboardEntry[];
  userRank?: number;
  icon: string;
  color: string;
}

export default function Leaderboards() {
  const [selectedPeriod, setSelectedPeriod] = useState<'daily' | 'weekly' | 'monthly' | 'alltime'>('weekly');
  const [selectedCategory, setSelectedCategory] = useState<string>('volume');

  const categories = [
    { key: 'volume', label: 'Total Volume', icon: 'barbell', color: 'blue' },
    { key: 'workouts', label: 'Workouts', icon: 'fitness', color: 'emerald' },
    { key: 'streak', label: 'Streak', icon: 'flame', color: 'orange' },
    { key: 'prs', label: 'PRs', icon: 'trophy', color: 'amber' },
  ];

  const leaderboards: { [key: string]: Leaderboard } = {
    volume: {
      id: 'volume',
      title: 'Total Volume Lifted',
      metric: 'kg',
      period: selectedPeriod,
      userRank: 42,
      icon: 'barbell',
      color: 'blue',
      entries: [
        { rank: 1, userId: '1', name: 'Carlos Méndez', avatar: 'ðŸ‹ï¸', score: 125420, change: 0, isCurrentUser: false },
        { rank: 2, userId: '2', name: 'Ana García', avatar: 'ðŸ’ª', score: 118950, change: 1, isCurrentUser: false },
        { rank: 3, userId: '3', name: 'Luis Rodríguez', avatar: 'ðŸ”¥', score: 112340, change: -1, isCurrentUser: false },
        { rank: 4, userId: '4', name: 'María López', avatar: '⚡', score: 108765, change: 2, isCurrentUser: false },
        { rank: 5, userId: '5', name: 'Pedro Sánchez', avatar: '🎯', score: 105230, change: 0, isCurrentUser: false },
        { rank: 6, userId: '6', name: 'Laura Martínez', avatar: 'ðŸŒŸ', score: 102890, change: -2, isCurrentUser: false },
        { rank: 7, userId: '7', name: 'Diego Torres', avatar: 'ðŸ’¯', score: 98450, change: 3, isCurrentUser: false },
        { rank: 8, userId: '8', name: 'Sofia Ramírez', avatar: '🚀', score: 95670, change: 1, isCurrentUser: false },
        { rank: 9, userId: '9', name: 'Miguel Flores', avatar: 'â­', score: 92340, change: -2, isCurrentUser: false },
        { rank: 10, userId: '10', name: 'Carmen Ruiz', avatar: 'ðŸ†', score: 89120, change: 0, isCurrentUser: false },
        { rank: 42, userId: 'me', name: 'Tú', avatar: '😐Ž', score: 45680, change: 5, isCurrentUser: true },
      ],
    },
    workouts: {
      id: 'workouts',
      title: 'Total Workouts',
      metric: 'workouts',
      period: selectedPeriod,
      userRank: 28,
      icon: 'fitness',
      color: 'emerald',
      entries: [
        { rank: 1, userId: '1', name: 'Ana García', avatar: 'ðŸ’ª', score: 45, change: 0, isCurrentUser: false },
        { rank: 2, userId: '2', name: 'Carlos Méndez', avatar: 'ðŸ‹ï¸', score: 42, change: 2, isCurrentUser: false },
        { rank: 3, userId: '3', name: 'María López', avatar: '⚡', score: 41, change: -1, isCurrentUser: false },
        { rank: 4, userId: '4', name: 'Luis Rodríguez', avatar: 'ðŸ”¥', score: 39, change: 1, isCurrentUser: false },
        { rank: 5, userId: '5', name: 'Sofia Ramírez', avatar: '🚀', score: 38, change: -2, isCurrentUser: false },
        { rank: 6, userId: '6', name: 'Pedro Sánchez', avatar: '🎯', score: 37, change: 0, isCurrentUser: false },
        { rank: 7, userId: '7', name: 'Laura Martínez', avatar: 'ðŸŒŸ', score: 36, change: 3, isCurrentUser: false },
        { rank: 8, userId: '8', name: 'Diego Torres', avatar: 'ðŸ’¯', score: 35, change: 1, isCurrentUser: false },
        { rank: 9, userId: '9', name: 'Miguel Flores', avatar: 'â­', score: 34, change: -1, isCurrentUser: false },
        { rank: 10, userId: '10', name: 'Carmen Ruiz', avatar: 'ðŸ†', score: 33, change: 0, isCurrentUser: false },
        { rank: 28, userId: 'me', name: 'Tú', avatar: '😐Ž', score: 24, change: 2, isCurrentUser: true },
      ],
    },
    streak: {
      id: 'streak',
      title: 'Longest Streak',
      metric: 'days',
      period: 'alltime',
      userRank: 15,
      icon: 'flame',
      color: 'orange',
      entries: [
        { rank: 1, userId: '1', name: 'María López', avatar: '⚡', score: 287, change: 0, isCurrentUser: false },
        { rank: 2, userId: '2', name: 'Carlos Méndez', avatar: 'ðŸ‹ï¸', score: 245, change: 0, isCurrentUser: false },
        { rank: 3, userId: '3', name: 'Ana García', avatar: 'ðŸ’ª', score: 198, change: 1, isCurrentUser: false },
        { rank: 4, userId: '4', name: 'Luis Rodríguez', avatar: 'ðŸ”¥', score: 176, change: -1, isCurrentUser: false },
        { rank: 5, userId: '5', name: 'Pedro Sánchez', avatar: '🎯', score: 165, change: 0, isCurrentUser: false },
        { rank: 6, userId: '6', name: 'Sofia Ramírez', avatar: '🚀', score: 154, change: 2, isCurrentUser: false },
        { rank: 7, userId: '7', name: 'Laura Martínez', avatar: 'ðŸŒŸ', score: 142, change: -1, isCurrentUser: false },
        { rank: 8, userId: '8', name: 'Diego Torres', avatar: 'ðŸ’¯', score: 128, change: 1, isCurrentUser: false },
        { rank: 9, userId: '9', name: 'Miguel Flores', avatar: 'â­', score: 115, change: -2, isCurrentUser: false },
        { rank: 10, userId: '10', name: 'Carmen Ruiz', avatar: 'ðŸ†', score: 103, change: 0, isCurrentUser: false },
        { rank: 15, userId: 'me', name: 'Tú', avatar: '😐Ž', score: 89, change: 3, isCurrentUser: true },
      ],
    },
    prs: {
      id: 'prs',
      title: 'Personal Records',
      metric: 'PRs',
      period: selectedPeriod,
      userRank: 19,
      icon: 'trophy',
      color: 'amber',
      entries: [
        { rank: 1, userId: '1', name: 'Luis Rodríguez', avatar: 'ðŸ”¥', score: 28, change: 0, isCurrentUser: false },
        { rank: 2, userId: '2', name: 'Carlos Méndez', avatar: 'ðŸ‹ï¸', score: 24, change: 1, isCurrentUser: false },
        { rank: 3, userId: '3', name: 'Pedro Sánchez', avatar: '🎯', score: 22, change: -1, isCurrentUser: false },
        { rank: 4, userId: '4', name: 'Ana García', avatar: 'ðŸ’ª', score: 21, change: 0, isCurrentUser: false },
        { rank: 5, userId: '5', name: 'Diego Torres', avatar: 'ðŸ’¯', score: 19, change: 2, isCurrentUser: false },
        { rank: 6, userId: '6', name: 'María López', avatar: '⚡', score: 18, change: -1, isCurrentUser: false },
        { rank: 7, userId: '7', name: 'Sofia Ramírez', avatar: '🚀', score: 17, change: 1, isCurrentUser: false },
        { rank: 8, userId: '8', name: 'Laura Martínez', avatar: 'ðŸŒŸ', score: 16, change: -2, isCurrentUser: false },
        { rank: 9, userId: '9', name: 'Miguel Flores', avatar: 'â­', score: 15, change: 0, isCurrentUser: false },
        { rank: 10, userId: '10', name: 'Carmen Ruiz', avatar: 'ðŸ†', score: 14, change: 0, isCurrentUser: false },
        { rank: 19, userId: 'me', name: 'Tú', avatar: '😐Ž', score: 8, change: 4, isCurrentUser: true },
      ],
    },
  };

  const currentLeaderboard = leaderboards[selectedCategory];

  const getRankMedal = (rank: number) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return null;
  };

  const getChangeIcon = (change: number) => {
    if (change > 0) return { icon: 'trending-up', color: '#9D12DE' };
    if (change < 0) return { icon: 'trending-down', color: '#EF4444' };
    return { icon: 'remove', color: '#71717A' };
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
            Leaderboards
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          {/* Info */}
          <View className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-6 mb-6">
            <Text className="text-white text-2xl font-bold mb-2">
              Compite con la Comunidad
            </Text>
            <Text className="text-white opacity-90 mb-4">
              Rankings globales y locales en tiempo real
            </Text>
            <View className="flex-row items-center">
              <Ionicons name="stats-chart" size={20} color="white" />
              <Text className="text-white ml-2">
                Tu ranking: #{currentLeaderboard.userRank}
              </Text>
            </View>
          </View>

          {/* Category Selection */}
          <Text className="text-white font-bold text-lg mb-3">Categoría</Text>
          <View className="flex-row flex-wrap gap-2 mb-6">
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat.key}
                onPress={() => setSelectedCategory(cat.key)}
                className={`flex-1 min-w-[45%] rounded-xl p-4 border ${
                  selectedCategory === cat.key
                    ? `bg-${cat.color}-500 border-${cat.color}-500`
                    : 'bg-zinc-900 border-zinc-800'
                }`}
              >
                <Ionicons
                  name={cat.icon as any}
                  size={28}
                  color={selectedCategory === cat.key ? 'white' : '#71717A'}
                />
                <Text className={`font-bold mt-2 ${
                  selectedCategory === cat.key ? 'text-white' : 'text-zinc-400'
                }`}>
                  {cat.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Period Selection */}
          {selectedCategory !== 'streak' && (
            <>
              <Text className="text-white font-bold text-lg mb-3">Periodo</Text>
              <View className="flex-row gap-2 mb-6">
                {['daily', 'weekly', 'monthly', 'alltime'].map((period) => (
                  <TouchableOpacity
                    key={period}
                    onPress={() => setSelectedPeriod(period as any)}
                    className={`flex-1 rounded-xl py-3 ${
                      selectedPeriod === period
                        ? 'bg-primary'
                        : 'bg-zinc-900 border border-zinc-800'
                    }`}
                  >
                    <Text className={`text-center font-bold text-xs ${
                      selectedPeriod === period ? 'text-white' : 'text-zinc-400'
                    }`}>
                      {period === 'daily' ? 'Hoy' : period === 'weekly' ? 'Semana' : period === 'monthly' ? 'Mes' : 'Histórico'}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </>
          )}

          {/* Leaderboard Title */}
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-white font-bold text-lg">
              {currentLeaderboard.title}
            </Text>
            <View className={`bg-${currentLeaderboard.color}-500 rounded-full px-3 py-1`}>
              <Text className="text-white text-xs font-bold">
                {currentLeaderboard.entries.length} participantes
              </Text>
            </View>
          </View>

          {/* Top 3 Podium */}
          <View className="flex-row items-end justify-center gap-3 mb-6">
            {/* 2nd Place */}
            {currentLeaderboard.entries[1] && (
              <View className="flex-1 items-center">
                <View className="w-16 h-16 bg-zinc-800 rounded-full items-center justify-center mb-2">
                  <Text className="text-3xl">{currentLeaderboard.entries[1].avatar}</Text>
                </View>
                <Text className="text-4xl mb-2">🥈</Text>
                <View className="w-full bg-zinc-800 rounded-t-xl p-3 h-24 items-center justify-center border-t-4 border-zinc-400">
                  <Text className="text-white font-bold text-center text-sm">
                    {currentLeaderboard.entries[1].name}
                  </Text>
                  <Text className={`text-${currentLeaderboard.color}-400 font-bold text-lg`}>
                    {currentLeaderboard.entries[1].score.toLocaleString()}
                  </Text>
                </View>
              </View>
            )}

            {/* 1st Place */}
            {currentLeaderboard.entries[0] && (
              <View className="flex-1 items-center">
                <View className="w-20 h-20 bg-zinc-800 rounded-full items-center justify-center mb-2 border-4 border-amber-500">
                  <Text className="text-4xl">{currentLeaderboard.entries[0].avatar}</Text>
                </View>
                <Text className="text-4xl mb-2">🥇</Text>
                <View className="w-full bg-amber-500 rounded-t-xl p-3 h-32 items-center justify-center">
                  <Text className="text-white font-bold text-center">
                    {currentLeaderboard.entries[0].name}
                  </Text>
                  <Text className="text-white font-bold text-2xl">
                    {currentLeaderboard.entries[0].score.toLocaleString()}
                  </Text>
                </View>
              </View>
            )}

            {/* 3rd Place */}
            {currentLeaderboard.entries[2] && (
              <View className="flex-1 items-center">
                <View className="w-16 h-16 bg-zinc-800 rounded-full items-center justify-center mb-2">
                  <Text className="text-3xl">{currentLeaderboard.entries[2].avatar}</Text>
                </View>
                <Text className="text-4xl mb-2">🥉</Text>
                <View className="w-full bg-zinc-800 rounded-t-xl p-3 h-20 items-center justify-center border-t-4 border-orange-700">
                  <Text className="text-white font-bold text-center text-sm">
                    {currentLeaderboard.entries[2].name}
                  </Text>
                  <Text className={`text-${currentLeaderboard.color}-400 font-bold`}>
                    {currentLeaderboard.entries[2].score.toLocaleString()}
                  </Text>
                </View>
              </View>
            )}
          </View>

          {/* Rest of Leaderboard */}
          <Text className="text-white font-bold text-lg mb-3">Ranking Completo</Text>
          {currentLeaderboard.entries.slice(3).map((entry) => {
            const changeInfo = getChangeIcon(entry.change);
            const medal = getRankMedal(entry.rank);

            return (
              <View
                key={entry.userId}
                className={`rounded-xl p-4 mb-3 flex-row items-center ${
                  entry.isCurrentUser
                    ? 'bg-primary/20 border-2 border-primary'
                    : 'bg-zinc-900 border border-zinc-800'
                }`}
              >
                <View className="w-12 items-center mr-3">
                  {medal ? (
                    <Text className="text-2xl">{medal}</Text>
                  ) : (
                    <Text className={`font-bold text-lg ${
                      entry.isCurrentUser ? 'text-primary/80' : 'text-zinc-400'
                    }`}>
                      #{entry.rank}
                    </Text>
                  )}
                </View>

                <View className="w-12 h-12 bg-zinc-800 rounded-full items-center justify-center mr-3">
                  <Text className="text-2xl">{entry.avatar}</Text>
                </View>

                <View className="flex-1">
                  <Text className={`font-bold ${
                    entry.isCurrentUser ? 'text-primary/80' : 'text-white'
                  }`}>
                    {entry.name}
                  </Text>
                  <View className="flex-row items-center">
                    <Text className={`text-${currentLeaderboard.color}-400 font-bold mr-2`}>
                      {entry.score.toLocaleString()} {currentLeaderboard.metric}
                    </Text>
                    {entry.change !== 0 && (
                      <View className="flex-row items-center">
                        <Ionicons name={changeInfo.icon as any} size={14} color={changeInfo.color} />
                        <Text className="text-zinc-400 text-xs ml-1">
                          {Math.abs(entry.change)}
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
              </View>
            );
          })}

          {/* Tips */}
          <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-6 mt-4">
            <View className="flex-row items-start">
              <Ionicons name="information-circle" size={20} color="#9D12DE" />
              <View className="flex-1 ml-3">
                <Text className="text-primary/80 font-bold mb-2">
                  Sobre los Leaderboards
                </Text>
                <Text className="text-primary/60 text-sm">
                  • Rankings actualizados en tiempo real{'\n'}
                  • Competencia sana motiva progreso{'\n'}
                  • Filtros por periodo y categoría{'\n'}
                  • Tu ranking se muestra destacado{'\n'}
                  • Flechas indican cambios de posición{'\n'}
                  • Sigue subiendo posiciones! ðŸ“ˆ
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

