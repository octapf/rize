import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Card } from '@/components/ui/Card';
import { LineChart } from 'react-native-chart-kit';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface UserStats {
  level: number;
  xp: number;
  nextLevelXP: number;
  totalWorkouts: number;
  currentStreak: number;
  longestStreak: number;
  totalVolume: number;
  achievements: number;
  friends: number;
  rank: number;
}

const mockUser = {
  id: '1',
  name: 'Carlos García',
  username: '@carlosfit',
  bio: 'Fitness enthusiast 💪 | Natural bodybuilder | Sharing my journey',
  joinDate: new Date(2025, 5, 15),
  isFollowing: false,
  stats: {
    level: 15,
    xp: 3450,
    nextLevelXP: 4000,
    totalWorkouts: 156,
    currentStreak: 12,
    longestStreak: 25,
    totalVolume: 245600,
    achievements: 23,
    friends: 45,
    rank: 8,
  } as UserStats,
};

export default function UserProfileScreen() {
  const params = useLocalSearchParams();
  const userId = params.id as string;

  const [user, setUser] = useState(mockUser);
  const [isFollowing, setIsFollowing] = useState(user.isFollowing);
  const [activeTab, setActiveTab] = useState<'stats' | 'workouts' | 'achievements'>('stats');

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    Alert.alert(isFollowing ? 'Dejaste de seguir' : 'Siguiendo', `${isFollowing ? 'Ya no sigues' : 'Ahora sigues'} a ${user.name}`);
  };

  const handleChallenge = () => {
    Alert.alert('Desafío Enviado', `Desafiaste a ${user.name} a "30 Days Streak"`);
  };

  const handleMessage = () => {
    router.push(`/chat/${userId}` as any);
  };

  const xpProgress = (user.stats.xp / user.stats.nextLevelXP) * 100;

  const chartData = {
    labels: ['L', 'M', 'X', 'J', 'V', 'S', 'D'],
    datasets: [{
      data: [4200, 3800, 4500, 4100, 4800, 3900, 4600]
    }]
  };

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <LinearGradient colors={['#3B82F6', '#2563EB']} className="px-6 pt-12 pb-6">
        <View className="flex-row items-center justify-between mb-4">
          <TouchableOpacity onPress={() => router.back()} className="p-2">
            <Ionicons name="arrow-back" size={28} color="white" />
          </TouchableOpacity>
          <Text className="text-xl font-bold text-white">Perfil</Text>
          <TouchableOpacity className="p-2">
            <Ionicons name="ellipsis-horizontal" size={28} color="white" />
          </TouchableOpacity>
        </View>

        {/* Profile Info */}
        <View className="items-center mb-4">
          <View className="w-24 h-24 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full items-center justify-center mb-3">
            <Text className="text-white font-bold text-4xl">
              {user.name.charAt(0)}
            </Text>
          </View>

          <Text className="text-white text-2xl font-bold">{user.name}</Text>
          <Text className="text-white/80 text-base mb-1">{user.username}</Text>
          <Text className="text-white/90 text-sm text-center px-8 mb-3">{user.bio}</Text>

          {/* Level Badge */}
          <View className="bg-white/20 px-4 py-2 rounded-full flex-row items-center gap-2">
            <Ionicons name="trophy" size={20} color="#FCD34D" />
            <Text className="text-white font-bold">Nivel {user.stats.level}</Text>
          </View>
        </View>

        {/* XP Progress */}
        <View className="mb-3">
          <View className="flex-row items-center justify-between mb-1">
            <Text className="text-white/80 text-xs">XP hasta nivel {user.stats.level + 1}</Text>
            <Text className="text-white/80 text-xs">{user.stats.xp} / {user.stats.nextLevelXP}</Text>
          </View>
          <View className="bg-white/20 h-2 rounded-full overflow-hidden">
            <View className="h-full bg-yellow-400 rounded-full" style={{ width: `${xpProgress}%` }} />
          </View>
        </View>

        {/* Action Buttons */}
        <View className="flex-row gap-2">
          <TouchableOpacity
            onPress={handleFollow}
            className={`flex-1 py-3 rounded-lg ${isFollowing ? 'bg-white/20' : 'bg-white'}`}
          >
            <Text className={`text-center font-bold ${isFollowing ? 'text-white' : 'text-blue-600'}`}>
              {isFollowing ? 'Siguiendo' : 'Seguir'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleMessage} className="flex-1 bg-white/20 py-3 rounded-lg">
            <Text className="text-white text-center font-bold">Mensaje</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleChallenge} className="bg-white/20 p-3 rounded-lg">
            <Ionicons name="flash" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Stats Grid */}
      <View className="px-6 py-4 bg-white border-b border-gray-200">
        <View className="flex-row flex-wrap gap-3">
          <View className="flex-1 min-w-[30%] bg-gray-50 p-3 rounded-lg items-center">
            <Text className="text-2xl font-bold text-gray-900">{user.stats.totalWorkouts}</Text>
            <Text className="text-gray-600 text-xs">Entrenamientos</Text>
          </View>
          <View className="flex-1 min-w-[30%] bg-gray-50 p-3 rounded-lg items-center">
            <Text className="text-2xl font-bold text-gray-900">{user.stats.currentStreak}</Text>
            <Text className="text-gray-600 text-xs">Racha</Text>
          </View>
          <View className="flex-1 min-w-[30%] bg-gray-50 p-3 rounded-lg items-center">
            <Text className="text-2xl font-bold text-gray-900">#{user.stats.rank}</Text>
            <Text className="text-gray-600 text-xs">Ranking</Text>
          </View>
          <View className="flex-1 min-w-[30%] bg-gray-50 p-3 rounded-lg items-center">
            <Text className="text-2xl font-bold text-gray-900">{(user.stats.totalVolume/1000).toFixed(0)}k</Text>
            <Text className="text-gray-600 text-xs">Volumen Total</Text>
          </View>
          <View className="flex-1 min-w-[30%] bg-gray-50 p-3 rounded-lg items-center">
            <Text className="text-2xl font-bold text-gray-900">{user.stats.achievements}</Text>
            <Text className="text-gray-600 text-xs">Logros</Text>
          </View>
          <View className="flex-1 min-w-[30%] bg-gray-50 p-3 rounded-lg items-center">
            <Text className="text-2xl font-bold text-gray-900">{user.stats.friends}</Text>
            <Text className="text-gray-600 text-xs">Amigos</Text>
          </View>
        </View>
      </View>

      {/* Tabs */}
      <View className="flex-row bg-white border-b border-gray-200 px-6">
        {(['stats', 'workouts', 'achievements'] as const).map(tab => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab)}
            className={`flex-1 py-3 ${activeTab === tab ? 'border-b-2 border-blue-500' : ''}`}
          >
            <Text className={`text-center font-semibold capitalize ${activeTab === tab ? 'text-blue-600' : 'text-gray-600'}`}>
              {tab === 'stats' ? 'Estadísticas' : tab === 'workouts' ? 'Entrenamientos' : 'Logros'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView className="flex-1" contentContainerClassName="p-6">
        {activeTab === 'stats' && (
          <>
            <Card className="p-4 mb-4">
              <Text className="text-gray-900 font-bold text-lg mb-3">Volumen Semanal</Text>
              <LineChart
                data={chartData}
                width={320}
                height={200}
                chartConfig={{
                  backgroundColor: '#ffffff',
                  backgroundGradientFrom: '#ffffff',
                  backgroundGradientTo: '#ffffff',
                  decimalPlaces: 0,
                  color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(107, 114, 128, ${opacity})`,
                }}
                bezier
                style={{ borderRadius: 16 }}
              />
            </Card>

            <Card className="p-4 mb-4">
              <Text className="text-gray-900 font-bold text-lg mb-3">Récords Recientes</Text>
              <View className="gap-2">
                {['Bench Press: 100kg', 'Squat: 140kg', 'Deadlift: 160kg'].map((record, i) => (
                  <View key={i} className="flex-row items-center justify-between p-3 bg-purple-50 rounded-lg">
                    <Text className="text-gray-900 font-semibold">{record}</Text>
                    <Ionicons name="trophy" size={20} color="#8B5CF6" />
                  </View>
                ))}
              </View>
            </Card>
          </>
        )}

        {activeTab === 'workouts' && (
          <Card className="p-4">
            <Text className="text-gray-900 font-bold text-lg mb-3">Entrenamientos Recientes</Text>
            <View className="gap-3">
              {[1, 2, 3].map(i => (
                <View key={i} className="p-3 bg-gray-50 rounded-lg">
                  <Text className="text-gray-900 font-bold">Push Day</Text>
                  <Text className="text-gray-600 text-sm">Hace {i} días • 75 min • 4.2k kg</Text>
                </View>
              ))}
            </View>
          </Card>
        )}

        {activeTab === 'achievements' && (
          <View className="flex-row flex-wrap gap-3">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <Card key={i} className="w-[48%] p-4 items-center">
                <Text className="text-4xl mb-2">🏆</Text>
                <Text className="text-gray-900 font-bold text-sm text-center">Logro {i}</Text>
                <Text className="text-gray-600 text-xs text-center">Completado</Text>
              </Card>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}
