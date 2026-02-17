import React, { useState } from 'react';
import { Text } from '@/components/ui/Text';
import { View, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';;
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useAchievements } from '@/hooks/useAchievements';
import { Card } from '@/components/ui/Card';

const rarityColors = {
  common: {
    bg: 'from-gray-400 to-gray-500',
    border: 'border-gray-400',
    text: 'text-gray-700',
  },
  rare: {
    bg: 'from-primary to-[#7D0EBE]',
    border: 'border-primary',
    text: 'text-primary',
  },
  epic: {
    bg: 'from-purple-400 to-purple-600',
    border: 'border-purple-400',
    text: 'text-purple-700',
  },
  legendary: {
    bg: 'from-yellow-400 to-orange-500',
    border: 'border-yellow-400',
    text: 'text-yellow-700',
  },
};

export default function AchievementsScreen() {
  const { data, isLoading } = useAchievements();
  const [filter, setFilter] = useState<'all' | 'unlocked' | 'locked'>('all');

  const getIconName = (icon: string): any => {
    const iconMap: Record<string, any> = {
      fitness: 'fitness',
      barbell: 'barbell',
      trophy: 'trophy',
      medal: 'medal',
      flame: 'flame',
      people: 'people',
      repeat: 'repeat',
      star: 'star',
    };
    return iconMap[icon] || 'trophy';
  };

  if (isLoading) {
    return (
      <View className="flex-1 bg-gray-50 items-center justify-center">
        <ActivityIndicator size="large" color="#9D12DE" />
      </View>
    );
  }

  const achievements = data?.data?.achievements || [];
  const totalUnlocked = data?.data?.totalUnlocked || 0;
  const totalAchievements = data?.data?.totalAchievements || 0;

  const filteredAchievements = achievements.filter((achievement) => {
    if (filter === 'unlocked') return achievement.unlocked;
    if (filter === 'locked') return !achievement.unlocked;
    return true;
  });

  const groupedByCategory = filteredAchievements.reduce((acc, achievement) => {
    if (!acc[achievement.category]) {
      acc[achievement.category] = [];
    }
    acc[achievement.category].push(achievement);
    return acc;
  }, {} as Record<string, typeof achievements>);

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <LinearGradient colors={['#9D12DE', '#7C3AED']} className="px-6 pt-12 pb-6">
        <Text className="text-3xl font-bold text-white mb-2">Logros</Text>
        <Text className="text-primary/50 mb-4">
          {totalUnlocked}/{totalAchievements} desbloqueados
        </Text>

        {/* Progress Bar */}
        <View className="mb-4">
          <View className="h-3 bg-white/20 rounded-full overflow-hidden">
            <View
              className="h-full bg-white rounded-full"
              style={{
                width: `${(totalUnlocked / totalAchievements) * 100}%`,
              }}
            />
          </View>
        </View>

        {/* Filters */}
        <View className="flex-row gap-2">
          <TouchableOpacity
            onPress={() => setFilter('all')}
            className={`flex-1 py-2 rounded-lg ${
              filter === 'all' ? 'bg-white' : 'bg-white/20'
            }`}
          >
            <Text
              className={`text-center font-semibold ${
                filter === 'all' ? 'text-primary' : 'text-white'
              }`}
            >
              Todos
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setFilter('unlocked')}
            className={`flex-1 py-2 rounded-lg ${
              filter === 'unlocked' ? 'bg-white' : 'bg-white/20'
            }`}
          >
            <Text
              className={`text-center font-semibold ${
                filter === 'unlocked' ? 'text-primary' : 'text-white'
              }`}
            >
              Desbloqueados
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setFilter('locked')}
            className={`flex-1 py-2 rounded-lg ${
              filter === 'locked' ? 'bg-white' : 'bg-white/20'
            }`}
          >
            <Text
              className={`text-center font-semibold ${
                filter === 'locked' ? 'text-primary' : 'text-white'
              }`}
            >
              Bloqueados
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView className="flex-1" contentContainerClassName="p-6 gap-6">
        {Object.entries(groupedByCategory).map(([category, categoryAchievements]) => (
          <View key={category}>
            <Text className="text-lg font-bold text-gray-900 mb-3 capitalize">
              {category === 'workout'
                ? 'Entrenamientos'
                : category === 'streak'
                ? 'Rachas'
                : category === 'social'
                ? 'Social'
                : category === 'exercise'
                ? 'Ejercicios'
                : 'XP'}
            </Text>
            <View className="gap-3">
              {categoryAchievements.map((achievement) => {
                const colors = rarityColors[achievement.rarity];
                return (
                  <Card
                    key={achievement._id}
                    className={`p-4 ${
                      achievement.unlocked
                        ? 'bg-white'
                        : 'bg-gray-100 opacity-60'
                    }`}
                  >
                    <View className="flex-row items-start gap-4">
                      {/* Icon */}
                      <View
                        className={`w-16 h-16 rounded-2xl items-center justify-center ${
                          achievement.unlocked
                            ? `border-2 ${colors.border}`
                            : 'bg-gray-300'
                        }`}
                      >
                        {achievement.unlocked ? (
                          <LinearGradient
                            colors={
                              achievement.rarity === 'common'
                                ? ['#9CA3AF', '#6B7280']
                                : achievement.rarity === 'rare'
                                ? ['#C084FC', '#7C3AED']
                                : achievement.rarity === 'epic'
                                ? ['#A78BFA', '#7C3AED']
                                : ['#FBBF24', '#F97316']
                            }
                            className="w-full h-full rounded-xl items-center justify-center"
                          >
                            <Ionicons
                              name={getIconName(achievement.icon)}
                              size={32}
                              color="white"
                            />
                          </LinearGradient>
                        ) : (
                          <Ionicons
                            name="lock-closed"
                            size={32}
                            color="#9CA3AF"
                          />
                        )}
                      </View>

                      {/* Info */}
                      <View className="flex-1">
                        <Text
                          className={`font-bold text-lg ${
                            achievement.unlocked
                              ? 'text-gray-900'
                              : 'text-gray-500'
                          }`}
                        >
                          {achievement.name.es}
                        </Text>
                        <Text className="text-sm text-gray-600 mt-1">
                          {achievement.description.es}
                        </Text>

                        {/* Rarity Badge */}
                        <View className="flex-row items-center gap-2 mt-2">
                          <View
                            className={`px-2 py-1 rounded-full ${
                              achievement.rarity === 'common'
                                ? 'bg-gray-100'
                                : achievement.rarity === 'rare'
                                ? 'bg-primary/10'
                                : achievement.rarity === 'epic'
                                ? 'bg-purple-100'
                                : 'bg-yellow-100'
                            }`}
                          >
                            <Text
                              className={`text-xs font-semibold ${colors.text}`}
                            >
                              {achievement.rarity === 'common'
                                ? 'Común'
                                : achievement.rarity === 'rare'
                                ? 'Raro'
                                : achievement.rarity === 'epic'
                                ? 'épico'
                                : 'Legendario'}
                            </Text>
                          </View>
                          <View className="bg-primary/10 px-2 py-1 rounded-full">
                            <Text className="text-xs font-semibold text-primary">
                              +{achievement.xpReward} XP
                            </Text>
                          </View>
                        </View>

                        {/* Progress Bar */}
                        {!achievement.unlocked && (
                          <View className="mt-3">
                            <View className="flex-row justify-between mb-1">
                              <Text className="text-xs text-gray-500">
                                Progreso
                              </Text>
                              <Text className="text-xs text-gray-500">
                                {achievement.progress}/{achievement.requirement}
                              </Text>
                            </View>
                            <View className="h-2 bg-gray-200 rounded-full overflow-hidden">
                              <View
                                className="h-full bg-primary rounded-full"
                                style={{
                                  width: `${achievement.percentage || 0}%`,
                                }}
                              />
                            </View>
                          </View>
                        )}

                        {/* Unlocked Date */}
                        {achievement.unlocked && achievement.unlockedAt && (
                          <Text className="text-xs text-gray-500 mt-2">
                            Desbloqueado:{' '}
                            {new Date(achievement.unlockedAt).toLocaleDateString(
                              'es-ES',
                              { day: '2-digit', month: 'short', year: 'numeric' }
                            )}
                          </Text>
                        )}
                      </View>
                    </View>
                  </Card>
                );
              })}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}


