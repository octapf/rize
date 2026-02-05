import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Share,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useQuery } from '@tanstack/react-query';
import { Card } from '@/components/ui/Card';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

// Mock achievement data - Replace with real API
const mockAchievements = {
  '1': {
    _id: '1',
    name: 'Primer Paso',
    description: 'Completa tu primer entrenamiento',
    icon: '🎯',
    tier: 'bronze',
    category: 'workouts',
    unlocked: true,
    unlockedAt: new Date('2025-01-15'),
    progress: { current: 1, target: 1 },
    xpReward: 50,
    rarity: 'Común',
    usersUnlocked: 12543,
  },
  '2': {
    _id: '2',
    name: 'Racha Semanal',
    description: 'Entrena 7 días seguidos',
    icon: '🔥',
    tier: 'silver',
    category: 'streak',
    unlocked: true,
    unlockedAt: new Date('2025-01-20'),
    progress: { current: 7, target: 7 },
    xpReward: 100,
    rarity: 'Raro',
    usersUnlocked: 5421,
  },
  '3': {
    _id: '3',
    name: 'Centurión',
    description: 'Completa 100 entrenamientos',
    icon: '💯',
    tier: 'gold',
    category: 'workouts',
    unlocked: false,
    progress: { current: 45, target: 100 },
    xpReward: 500,
    rarity: 'Épico',
    usersUnlocked: 892,
  },
};

const fetchAchievementDetails = async (id: string) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return { data: mockAchievements[id as keyof typeof mockAchievements] };
};

export default function AchievementDetailsScreen() {
  const { achievementId } = useLocalSearchParams();

  const { data, isLoading } = useQuery({
    queryKey: ['achievement', achievementId],
    queryFn: () => fetchAchievementDetails(achievementId as string),
  });

  const achievement = data?.data;

  const handleShare = async () => {
    if (!achievement || !achievement.unlocked) return;

    const message = `🏆 ¡Desbloqueé el logro "${achievement.name}" en Rize!\n${achievement.description}\n+${achievement.xpReward} XP`;

    try {
      await Share.share({ message });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  if (isLoading) {
    return (
      <View className="flex-1 bg-gray-50 items-center justify-center">
        <ActivityIndicator size="large" color="#10B981" />
      </View>
    );
  }

  if (!achievement) {
    return (
      <View className="flex-1 bg-gray-50 items-center justify-center p-6">
        <Ionicons name="alert-circle" size={64} color="#EF4444" />
        <Text className="text-gray-900 text-xl font-bold mt-4">
          Logro no encontrado
        </Text>
      </View>
    );
  }

  const getTierColor = () => {
    switch (achievement.tier) {
      case 'bronze': return ['#CD7F32', '#A0522D'];
      case 'silver': return ['#C0C0C0', '#A8A8A8'];
      case 'gold': return ['#FFD700', '#FFA500'];
      case 'platinum': return ['#E5E4E2', '#C0C0C0'];
      case 'diamond': return ['#B9F2FF', '#00CED1'];
      default: return ['#6B7280', '#4B5563'];
    }
  };

  const progressPercentage = achievement.unlocked
    ? 100
    : (achievement.progress.current / achievement.progress.target) * 100;

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <LinearGradient colors={getTierColor()} className="px-6 pt-12 pb-8">
        <View className="flex-row items-center justify-between mb-6">
          <TouchableOpacity onPress={() => router.back()} className="p-2">
            <Ionicons name="arrow-back" size={28} color="white" />
          </TouchableOpacity>
          {achievement.unlocked && (
            <TouchableOpacity onPress={handleShare} className="p-2">
              <Ionicons name="share-outline" size={24} color="white" />
            </TouchableOpacity>
          )}
        </View>

        {/* Achievement Icon */}
        <View className="items-center">
          <View
            className={`w-32 h-32 rounded-full items-center justify-center mb-4 ${
              achievement.unlocked ? 'bg-white/20' : 'bg-gray-900/20'
            }`}
          >
            <Text className="text-7xl">{achievement.icon}</Text>
          </View>
          
          <Text className="text-white text-3xl font-bold text-center mb-2">
            {achievement.name}
          </Text>
          
          <View className="bg-white/20 px-4 py-1.5 rounded-full">
            <Text className="text-white font-semibold">
              {achievement.rarity}
            </Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView className="flex-1" contentContainerClassName="p-6 gap-6">
        {/* Description */}
        <Card className="p-6">
          <Text className="text-gray-900 text-lg text-center leading-6">
            {achievement.description}
          </Text>
        </Card>

        {/* Progress */}
        <Card className="p-6">
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-gray-900 font-bold text-lg">Progreso</Text>
            <Text className="text-gray-600 font-semibold">
              {achievement.progress.current} / {achievement.progress.target}
            </Text>
          </View>

          <View className="bg-gray-200 h-4 rounded-full overflow-hidden mb-2">
            <View
              className={`h-full rounded-full ${
                achievement.unlocked ? 'bg-primary' : 'bg-primary/60'
              }`}
              style={{ width: `${progressPercentage}%` }}
            />
          </View>

          <Text className="text-gray-600 text-sm text-center">
            {achievement.unlocked
              ? '¡Logro completado!'
              : `${Math.round(progressPercentage)}% completado`}
          </Text>
        </Card>

        {/* Stats */}
        <View className="flex-row gap-3">
          <Card className="flex-1 p-4">
            <View className="items-center">
              <Ionicons name="star" size={24} color="#F59E0B" />
              <Text className="text-gray-600 text-xs mt-2">Recompensa XP</Text>
              <Text className="text-gray-900 text-xl font-bold mt-1">
                +{achievement.xpReward}
              </Text>
            </View>
          </Card>

          <Card className="flex-1 p-4">
            <View className="items-center">
              <Ionicons name="people" size={24} color="#9D12DE" />
              <Text className="text-gray-600 text-xs mt-2">Desbloqueado</Text>
              <Text className="text-gray-900 text-xl font-bold mt-1">
                {achievement.usersUnlocked.toLocaleString()}
              </Text>
            </View>
          </Card>
        </View>

        {/* Unlocked Info */}
        {achievement.unlocked && achievement.unlockedAt && (
          <Card className="p-6 bg-emerald-50 border-emerald-200">
            <View className="flex-row items-center gap-3 mb-3">
              <View className="bg-emerald-500 w-12 h-12 rounded-full items-center justify-center">
                <Ionicons name="checkmark" size={28} color="white" />
              </View>
              <Text className="flex-1 text-emerald-900 font-bold text-lg">
                ¡Logro Desbloqueado!
              </Text>
            </View>
            <Text className="text-emerald-700 text-center">
              Desbloqueado el{' '}
              {format(achievement.unlockedAt, "dd 'de' MMMM 'de' yyyy", {
                locale: es,
              })}
            </Text>
          </Card>
        )}

        {/* Tips */}
        {!achievement.unlocked && (
          <Card className="p-6 bg-primary/10 border-primary/20">
            <View className="flex-row items-start gap-3">
              <Ionicons name="information-circle" size={24} color="#9D12DE" />
              <View className="flex-1">
                <Text className="text-text font-bold mb-2">
                  Consejos para desbloquear
                </Text>
                <Text className="text-text/70">
                  {achievement.category === 'workouts'
                    ? 'Mantén una rutina constante de entrenamientos para alcanzar este logro.'
                    : achievement.category === 'streak'
                    ? 'Entrena todos los días sin fallar para mantener tu racha.'
                    : 'Sigue trabajando duro y alcanzarás este logro pronto.'}
                </Text>
              </View>
            </View>
          </Card>
        )}

        {/* Category Info */}
        <Card className="p-4">
          <View className="flex-row items-center justify-between">
            <Text className="text-gray-600">Categoría</Text>
            <View className="flex-row items-center gap-2">
              <Ionicons
                name={
                  achievement.category === 'workouts'
                    ? 'barbell'
                    : achievement.category === 'streak'
                    ? 'flame'
                    : 'trophy'
                }
                size={18}
                color="#6B7280"
              />
              <Text className="text-gray-900 font-semibold capitalize">
                {achievement.category}
              </Text>
            </View>
          </View>
        </Card>
      </ScrollView>
    </View>
  );
}
