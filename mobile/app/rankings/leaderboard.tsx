import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Card } from '@/components/ui/Card';

interface LeaderboardUser {
  rank: number;
  userId: string;
  name: string;
  username: string;
  avatar?: string;
  score: number;
  change: number;
}

const mockLeaderboard: LeaderboardUser[] = [
  { rank: 1, userId: '1', name: 'Carlos García', username: 'carlosg', score: 12540, change: 2 },
  { rank: 2, userId: '2', name: 'Ana López', username: 'ana', score: 11230, change: -1 },
  { rank: 3, userId: '3', name: 'Pedro Martínez', username: 'pedro', score: 10890, change: 1 },
  { rank: 4, userId: '4', name: 'María Sánchez', username: 'maria', score: 9750, change: 0 },
  { rank: 5, userId: 'me', name: 'Tú', username: 'tuuser', score: 8920, change: 3 },
  { rank: 6, userId: '6', name: 'Luis Rodríguez', username: 'luis', score: 8450, change: -2 },
  { rank: 7, userId: '7', name: 'Sofia Torres', username: 'sofia', score: 7890, change: 1 },
  { rank: 8, userId: '8', name: 'Diego Ruiz', username: 'diego', score: 7320, change: -1 },
];

export default function LeaderboardScreen() {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'allTime'>('month');
  const [category, setCategory] = useState<'volume' | 'workouts' | 'streak'>('volume');
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  const getCategoryLabel = () => {
    switch (category) {
      case 'volume':
        return 'Volumen Total';
      case 'workouts':
        return 'Entrenamientos';
      case 'streak':
        return 'Racha';
      default:
        return '';
    }
  };

  const getCategoryUnit = () => {
    switch (category) {
      case 'volume':
        return 'kg';
      case 'workouts':
        return 'workouts';
      case 'streak':
        return 'días';
      default:
        return '';
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return '#F59E0B';
      case 2:
        return '#9CA3AF';
      case 3:
        return '#CD7F32';
      default:
        return '#6B7280';
    }
  };

  const getRankIcon = (rank: number) => {
    if (rank <= 3) return 'trophy';
    return 'medal';
  };

  const renderUser = ({ item }: { item: LeaderboardUser }) => {
    const isMe = item.userId === 'me';
    const rankColor = getRankColor(item.rank);

    return (
      <TouchableOpacity
        onPress={() => !isMe && router.push(`/users/${item.userId}` as any)}
        disabled={isMe}
      >
        <Card className={`p-4 mb-3 ${isMe ? 'bg-blue-50 border-2 border-blue-500' : ''}`}>
          <View className="flex-row items-center gap-4">
            {/* Rank */}
            <View
              className="w-12 h-12 rounded-full items-center justify-center"
              style={{ backgroundColor: `${rankColor}20` }}
            >
              {item.rank <= 3 ? (
                <Ionicons name={getRankIcon(item.rank)} size={24} color={rankColor} />
              ) : (
                <Text className="text-gray-700 font-bold text-lg">#{item.rank}</Text>
              )}
            </View>

            {/* Avatar */}
            <View className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full items-center justify-center">
              <Text className="text-white font-bold text-lg">
                {item.name[0]}
              </Text>
            </View>

            {/* Info */}
            <View className="flex-1">
              <Text className={`text-base ${isMe ? 'font-bold text-blue-900' : 'font-semibold text-gray-900'}`}>
                {item.name}
              </Text>
              <Text className="text-gray-600 text-sm">@{item.username}</Text>
            </View>

            {/* Score */}
            <View className="items-end">
              <Text className="text-gray-900 font-bold text-xl">
                {item.score.toLocaleString()}
              </Text>
              <View className="flex-row items-center gap-1">
                {item.change !== 0 && (
                  <>
                    <Ionicons
                      name={item.change > 0 ? 'trending-up' : 'trending-down'}
                      size={16}
                      color={item.change > 0 ? '#10B981' : '#EF4444'}
                    />
                    <Text className={`text-xs font-bold ${item.change > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                      {Math.abs(item.change)}
                    </Text>
                  </>
                )}
              </View>
            </View>
          </View>
        </Card>
      </TouchableOpacity>
    );
  };

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <LinearGradient colors={['#F59E0B', '#D97706']} className="px-6 pt-12 pb-6">
        <View className="flex-row items-center justify-between mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={28} color="white" />
          </TouchableOpacity>
          <Text className="text-2xl font-bold text-white">Rankings</Text>
          <TouchableOpacity>
            <Ionicons name="filter" size={28} color="white" />
          </TouchableOpacity>
        </View>

        {/* Time Range */}
        <View className="flex-row gap-2 mb-3">
          {(['week', 'month', 'allTime'] as const).map((range) => (
            <TouchableOpacity
              key={range}
              onPress={() => setTimeRange(range)}
              className={`flex-1 py-2 rounded-lg ${
                timeRange === range ? 'bg-white' : 'bg-white/20'
              }`}
            >
              <Text
                className={`text-center font-bold text-sm ${
                  timeRange === range ? 'text-amber-600' : 'text-white'
                }`}
              >
                {range === 'week' ? 'Semana' : range === 'month' ? 'Mes' : 'Histórico'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Category */}
        <View className="flex-row gap-2">
          {(['volume', 'workouts', 'streak'] as const).map((cat) => (
            <TouchableOpacity
              key={cat}
              onPress={() => setCategory(cat)}
              className={`flex-1 py-2 rounded-lg ${
                category === cat ? 'bg-white' : 'bg-white/20'
              }`}
            >
              <Text
                className={`text-center font-bold text-sm ${
                  category === cat ? 'text-amber-600' : 'text-white'
                }`}
              >
                {cat === 'volume' ? 'Volumen' : cat === 'workouts' ? 'Workouts' : 'Racha'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </LinearGradient>

      {/* Top 3 Podium */}
      <View className="p-4">
        <Card className="p-4 bg-gradient-to-r from-amber-50 to-orange-50">
          <Text className="text-gray-900 font-bold text-lg mb-4 text-center">
            🏆 Top 3 - {getCategoryLabel()}
          </Text>
          <View className="flex-row justify-around items-end">
            {/* 2nd Place */}
            {mockLeaderboard[1] && (
              <View className="items-center">
                <View className="w-16 h-16 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full items-center justify-center mb-2">
                  <Text className="text-white font-bold text-2xl">2</Text>
                </View>
                <Text className="text-gray-900 font-bold text-sm">{mockLeaderboard[1].name.split(' ')[0]}</Text>
                <Text className="text-gray-600 text-xs">{mockLeaderboard[1].score.toLocaleString()}</Text>
              </View>
            )}

            {/* 1st Place */}
            {mockLeaderboard[0] && (
              <View className="items-center -mt-4">
                <Ionicons name="trophy" size={32} color="#F59E0B" />
                <View className="w-20 h-20 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full items-center justify-center mb-2">
                  <Text className="text-white font-bold text-3xl">1</Text>
                </View>
                <Text className="text-gray-900 font-bold">{mockLeaderboard[0].name.split(' ')[0]}</Text>
                <Text className="text-amber-600 font-bold">{mockLeaderboard[0].score.toLocaleString()}</Text>
              </View>
            )}

            {/* 3rd Place */}
            {mockLeaderboard[2] && (
              <View className="items-center">
                <View className="w-16 h-16 bg-gradient-to-br from-amber-700 to-amber-900 rounded-full items-center justify-center mb-2">
                  <Text className="text-white font-bold text-2xl">3</Text>
                </View>
                <Text className="text-gray-900 font-bold text-sm">{mockLeaderboard[2].name.split(' ')[0]}</Text>
                <Text className="text-gray-600 text-xs">{mockLeaderboard[2].score.toLocaleString()}</Text>
              </View>
            )}
          </View>
        </Card>
      </View>

      {/* Full Leaderboard */}
      <View className="flex-1 px-4">
        <Text className="text-gray-900 font-bold text-lg mb-3">
          Rankings Completos
        </Text>
        <FlatList
          data={mockLeaderboard}
          renderItem={renderUser}
          keyExtractor={(item) => item.userId}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </View>
    </View>
  );
}
