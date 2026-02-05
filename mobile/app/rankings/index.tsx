import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useQuery } from '@tanstack/react-query';
import { Card } from '@/components/ui/Card';
import { useAuthStore } from '@/stores/authStore';

type LeaderboardType = 'xp' | 'workouts' | 'volume' | 'streak';

const leaderboardTypes = [
  { id: 'xp' as const, label: 'XP', icon: 'trophy' as const, color: '#FFEA00' },
  { id: 'workouts' as const, label: 'Entrenamientos', icon: 'barbell' as const, color: '#9D12DE' },
  { id: 'volume' as const, label: 'Volumen', icon: 'speedometer' as const, color: '#8B5CF6' },
  { id: 'streak' as const, label: 'Racha', icon: 'flame' as const, color: '#EF4444' },
];

// Mock API - Replace with real API call
const fetchLeaderboard = async (type: LeaderboardType) => {
  // Simulated data
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const mockUsers = [
    { _id: '1', username: 'FitnessKing', avatar: 'F', xp: 5420, workouts: 145, volume: 125000, streak: 87 },
    { _id: '2', username: 'IronWarrior', avatar: 'I', xp: 5100, workouts: 138, volume: 118000, streak: 65 },
    { _id: '3', username: 'MuscleQueen', avatar: 'M', xp: 4890, workouts: 132, volume: 112000, streak: 52 },
    { _id: '4', username: 'BeastMode', avatar: 'B', xp: 4650, workouts: 125, volume: 105000, streak: 48 },
    { _id: '5', username: 'GymRat', avatar: 'G', xp: 4320, workouts: 118, volume: 98000, streak: 42 },
    { _id: '6', username: 'PowerLifter', avatar: 'P', xp: 4100, workouts: 112, volume: 92000, streak: 38 },
    { _id: '7', username: 'FitFreak', avatar: 'F', xp: 3890, workouts: 105, volume: 87000, streak: 35 },
    { _id: '8', username: 'Shredded', avatar: 'S', xp: 3650, workouts: 98, volume: 82000, streak: 31 },
    { _id: '9', username: 'BulkBoss', avatar: 'B', xp: 3420, workouts: 92, volume: 78000, streak: 28 },
    { _id: '10', username: 'LiftMaster', avatar: 'L', xp: 3200, workouts: 87, volume: 73000, streak: 25 },
  ];

  // Sort by selected type
  const sorted = [...mockUsers].sort((a, b) => {
    switch (type) {
      case 'xp': return b.xp - a.xp;
      case 'workouts': return b.workouts - a.workouts;
      case 'volume': return b.volume - a.volume;
      case 'streak': return b.streak - a.streak;
      default: return 0;
    }
  });

  return { data: { leaderboard: sorted } };
};

export default function RankingsScreen() {
  const { user } = useAuthStore();
  const [selectedType, setSelectedType] = useState<LeaderboardType>('xp');
  const [refreshing, setRefreshing] = useState(false);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['leaderboard', selectedType],
    queryFn: () => fetchLeaderboard(selectedType),
  });

  const leaderboard = data?.data.leaderboard || [];

  const handleRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1: return '#FFD700'; // Gold
      case 2: return '#C0C0C0'; // Silver
      case 3: return '#CD7F32'; // Bronze
      default: return '#6B7280'; // Gray
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return '🥇';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return `#${rank}`;
    }
  };

  const getStatValue = (user: any) => {
    switch (selectedType) {
      case 'xp': return `${user.xp.toLocaleString()} XP`;
      case 'workouts': return `${user.workouts} workouts`;
      case 'volume': return `${(user.volume / 1000).toFixed(1)}k kg`;
      case 'streak': return `${user.streak} días`;
      default: return '';
    }
  };

  const currentCategory = leaderboardTypes.find(t => t.id === selectedType);

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <LinearGradient
        colors={[currentCategory?.color || '#FFEA00', '#D97706']}
        className="px-6 pt-12 pb-6"
      >
        <View className="flex-row items-center justify-between mb-4">
          <TouchableOpacity onPress={() => router.back()} className="p-2">
            <Ionicons name="arrow-back" size={28} color="white" />
          </TouchableOpacity>
          <Text className="text-2xl font-bold text-white">Rankings</Text>
          <View className="w-10" />
        </View>

        {/* Category Selector */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="gap-2 -mx-6 px-6"
        >
          {leaderboardTypes.map((type) => (
            <TouchableOpacity
              key={type.id}
              onPress={() => setSelectedType(type.id)}
              className={`px-4 py-2.5 rounded-full flex-row items-center gap-2 ${
                selectedType === type.id
                  ? 'bg-white'
                  : 'bg-white/20'
              }`}
            >
              <Ionicons
                name={type.icon}
                size={18}
                color={selectedType === type.id ? type.color : 'white'}
              />
              <Text
                className={`font-semibold ${
                  selectedType === type.id
                    ? 'text-gray-900'
                    : 'text-white'
                }`}
              >
                {type.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </LinearGradient>

      {isLoading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color={currentCategory?.color} />
        </View>
      ) : (
        <ScrollView
          className="flex-1"
          contentContainerClassName="p-6 gap-4"
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              tintColor={currentCategory?.color}
            />
          }
        >
          {/* Top 3 Podium */}
          {leaderboard.length >= 3 && (
            <View className="mb-4">
              <View className="flex-row items-end justify-center gap-2 mb-6">
                {/* 2nd Place */}
                <View className="flex-1 items-center">
                  <View className="bg-gray-200 w-16 h-16 rounded-full items-center justify-center mb-2 border-4 border-gray-300">
                    <Text className="text-gray-700 text-2xl font-bold">
                      {leaderboard[1].avatar}
                    </Text>
                  </View>
                  <Text className="text-4xl mb-1">🥈</Text>
                  <View className="bg-gray-200 w-full h-24 rounded-t-xl items-center justify-center">
                    <Text className="text-gray-900 font-bold text-center" numberOfLines={1}>
                      {leaderboard[1].username}
                    </Text>
                    <Text className="text-gray-600 text-sm">
                      {getStatValue(leaderboard[1])}
                    </Text>
                  </View>
                </View>

                {/* 1st Place */}
                <View className="flex-1 items-center">
                  <View className="bg-highlight w-20 h-20 rounded-full items-center justify-center mb-2 border-4 border-yellow-500 -mt-8">
                    <Text className="text-yellow-900 text-3xl font-bold">
                      {leaderboard[0].avatar}
                    </Text>
                  </View>
                  <Text className="text-5xl mb-1">🥇</Text>
                  <View className="bg-highlight w-full h-32 rounded-t-xl items-center justify-center">
                    <Text className="text-yellow-900 font-bold text-center" numberOfLines={1}>
                      {leaderboard[0].username}
                    </Text>
                    <Text className="text-yellow-800 text-sm font-semibold">
                      {getStatValue(leaderboard[0])}
                    </Text>
                  </View>
                </View>

                {/* 3rd Place */}
                <View className="flex-1 items-center">
                  <View className="bg-orange-300 w-16 h-16 rounded-full items-center justify-center mb-2 border-4 border-orange-400">
                    <Text className="text-orange-900 text-2xl font-bold">
                      {leaderboard[2].avatar}
                    </Text>
                  </View>
                  <Text className="text-4xl mb-1">🥉</Text>
                  <View className="bg-orange-300 w-full h-20 rounded-t-xl items-center justify-center">
                    <Text className="text-orange-900 font-bold text-center" numberOfLines={1}>
                      {leaderboard[2].username}
                    </Text>
                    <Text className="text-orange-800 text-sm">
                      {getStatValue(leaderboard[2])}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          )}

          {/* Rest of Rankings */}
          <View className="gap-2">
            {leaderboard.slice(3).map((userItem, index) => {
              const rank = index + 4;
              const isCurrentUser = userItem._id === user?._id;

              return (
                <TouchableOpacity
                  key={userItem._id}
                  onPress={() => router.push(`/users/${userItem._id}`)}
                  activeOpacity={0.7}
                >
                  <Card
                    className={`p-4 ${
                      isCurrentUser ? 'border-2 border-primary bg-emerald-50' : ''
                    }`}
                  >
                    <View className="flex-row items-center gap-4">
                      {/* Rank */}
                      <View
                        className="w-12 h-12 rounded-full items-center justify-center"
                        style={{ backgroundColor: getRankColor(rank) + '20' }}
                      >
                        <Text
                          className="font-bold text-lg"
                          style={{ color: getRankColor(rank) }}
                        >
                          {rank}
                        </Text>
                      </View>

                      {/* Avatar */}
                      <View
                        className={`w-12 h-12 rounded-full items-center justify-center ${
                          isCurrentUser ? 'bg-primary' : 'bg-gray-200'
                        }`}
                      >
                        <Text
                          className={`text-xl font-bold ${
                            isCurrentUser ? 'text-white' : 'text-gray-700'
                          }`}
                        >
                          {userItem.avatar}
                        </Text>
                      </View>

                      {/* User Info */}
                      <View className="flex-1">
                        <Text
                          className={`font-bold ${
                            isCurrentUser ? 'text-primary' : 'text-gray-900'
                          }`}
                        >
                          {userItem.username}
                          {isCurrentUser && ' (Tú)'}
                        </Text>
                        <Text className="text-gray-600 text-sm">
                          {getStatValue(userItem)}
                        </Text>
                      </View>

                      {/* Arrow */}
                      <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
                    </View>
                  </Card>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Current User Position (if not in top 10) */}
          {user && !leaderboard.some(u => u._id === user._id) && (
            <View className="mt-4">
              <Text className="text-gray-600 text-sm text-center mb-2">
                Tu posición
              </Text>
              <Card className="p-4 border-2 border-primary bg-emerald-50">
                <View className="flex-row items-center gap-4">
                  <View className="w-12 h-12 rounded-full items-center justify-center bg-primary/20">
                    <Text className="font-bold text-lg text-primary">
                      #24
                    </Text>
                  </View>
                  <View className="w-12 h-12 rounded-full items-center justify-center bg-primary">
                    <Text className="text-xl font-bold text-white">
                      {user.username[0].toUpperCase()}
                    </Text>
                  </View>
                  <View className="flex-1">
                    <Text className="font-bold text-primary">
                      {user.username} (Tú)
                    </Text>
                    <Text className="text-primary text-sm">
                      {user.xp.toLocaleString()} XP
                    </Text>
                  </View>
                </View>
              </Card>
            </View>
          )}
        </ScrollView>
      )}
    </View>
  );
}


