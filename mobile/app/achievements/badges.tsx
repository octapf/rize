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

interface Achievement {
  id: string;
  name: string;
  description: string;
  category: 'fuerza' | 'resistencia' | 'consistencia' | 'social' | 'especial';
  tier: 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';
  icon: string;
  unlocked: boolean;
  progress?: number;
  maxProgress?: number;
  unlockedDate?: string;
  reward: {
    xp: number;
    badge?: string;
  };
}

const ACHIEVEMENTS: Achievement[] = [
  {
    id: '1',
    name: 'Primera Sangre',
    description: 'Completa tu primer entrenamiento',
    category: 'consistencia',
    tier: 'bronze',
    icon: 'fitness',
    unlocked: true,
    unlockedDate: '2025-01-01',
    reward: { xp: 100, badge: '🥉' },
  },
  {
    id: '2',
    name: 'Racha de Fuego',
    description: 'Entrena 7 días seguidos',
    category: 'consistencia',
    tier: 'silver',
    icon: 'flame',
    unlocked: true,
    progress: 7,
    maxProgress: 7,
    unlockedDate: '2025-01-15',
    reward: { xp: 500, badge: '🔥' },
  },
  {
    id: '3',
    name: 'Centurión',
    description: 'Alcanza 100kg en press de banca',
    category: 'fuerza',
    tier: 'gold',
    icon: 'barbell',
    unlocked: true,
    unlockedDate: '2025-01-20',
    reward: { xp: 1000, badge: '🏆' },
  },
  {
    id: '4',
    name: 'Maratonista',
    description: 'Corre 42km en un mes',
    category: 'resistencia',
    tier: 'gold',
    icon: 'walk',
    unlocked: false,
    progress: 28,
    maxProgress: 42,
    reward: { xp: 1000, badge: '🏃' },
  },
  {
    id: '5',
    name: 'Influencer Fitness',
    description: 'Tus rutinas tienen 500 descargas',
    category: 'social',
    tier: 'platinum',
    icon: 'people',
    unlocked: false,
    progress: 143,
    maxProgress: 500,
    reward: { xp: 2500, badge: '⭐' },
  },
  {
    id: '6',
    name: 'Bestia de Hierro',
    description: 'Levanta 3x tu peso corporal en peso muerto',
    category: 'fuerza',
    tier: 'platinum',
    icon: 'trophy',
    unlocked: false,
    progress: 2.2,
    maxProgress: 3.0,
    reward: { xp: 2500, badge: '💪' },
  },
  {
    id: '7',
    name: 'Leyenda Viviente',
    description: 'Alcanza nivel 50',
    category: 'especial',
    tier: 'diamond',
    icon: 'diamond',
    unlocked: false,
    progress: 12,
    maxProgress: 50,
    reward: { xp: 10000, badge: '💎' },
  },
  {
    id: '8',
    name: 'Mentor',
    description: 'Ayuda a 10 personas con tus rutinas',
    category: 'social',
    tier: 'gold',
    icon: 'school',
    unlocked: false,
    progress: 6,
    maxProgress: 10,
    reward: { xp: 1000, badge: '🎓' },
  },
];

export default function AchievementBadges() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTier, setSelectedTier] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'Todos', icon: 'grid' },
    { id: 'fuerza', label: 'Fuerza', icon: 'barbell' },
    { id: 'resistencia', label: 'Resistencia', icon: 'walk' },
    { id: 'consistencia', label: 'Consistencia', icon: 'flame' },
    { id: 'social', label: 'Social', icon: 'people' },
    { id: 'especial', label: 'Especial', icon: 'star' },
  ];

  const tiers = [
    { id: 'all', label: 'Todos' },
    { id: 'bronze', label: 'Bronce' },
    { id: 'silver', label: 'Plata' },
    { id: 'gold', label: 'Oro' },
    { id: 'platinum', label: 'Platino' },
    { id: 'diamond', label: 'Diamante' },
  ];

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
      case 'diamond':
        return '#B9F2FF';
      default:
        return '#71717A';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'fuerza':
        return '#EF4444';
      case 'resistencia':
        return '#10B981';
      case 'consistencia':
        return '#F59E0B';
      case 'social':
        return '#3B82F6';
      case 'especial':
        return '#8B5CF6';
      default:
        return '#71717A';
    }
  };

  const viewAchievement = (achievement: Achievement) => {
    const progressText = achievement.maxProgress
      ? `\n\nProgreso: ${achievement.progress}/${achievement.maxProgress}`
      : '';
    
    Alert.alert(
      `${achievement.reward.badge} ${achievement.name}`,
      `${achievement.description}${progressText}\n\nRecompensa: ${achievement.reward.xp} XP${
        achievement.unlocked
          ? `\n\nDesbloqueado: ${new Date(achievement.unlockedDate!).toLocaleDateString('es-ES')}`
          : ''
      }`,
      [{ text: 'Cerrar' }]
    );
  };

  const shareAchievement = (achievement: Achievement) => {
    if (!achievement.unlocked) {
      Alert.alert('Bloqueado', 'Debes desbloquear este logro primero');
      return;
    }

    Alert.alert(
      'Compartir Logro',
      `${achievement.reward.badge} ${achievement.name}`,
      [
        { text: 'Instagram Stories' },
        { text: 'WhatsApp' },
        { text: 'Twitter' },
        { text: 'Cancelar', style: 'cancel' },
      ]
    );
  };

  const filteredAchievements = ACHIEVEMENTS.filter((achievement) => {
    const matchesCategory = selectedCategory === 'all' || achievement.category === selectedCategory;
    const matchesTier = selectedTier === 'all' || achievement.tier === selectedTier;
    return matchesCategory && matchesTier;
  });

  const unlockedCount = ACHIEVEMENTS.filter((a) => a.unlocked).length;
  const totalCount = ACHIEVEMENTS.length;
  const completionPercentage = Math.round((unlockedCount / totalCount) * 100);

  const totalXP = ACHIEVEMENTS.filter((a) => a.unlocked).reduce(
    (sum, a) => sum + a.reward.xp,
    0
  );

  return (
    <View className="flex-1 bg-zinc-950">
      {/* Header */}
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1 ml-3">
            Logros y Trofeos
          </Text>
          <TouchableOpacity>
            <Ionicons name="share-social-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Progress Summary */}
        <View className="bg-gradient-to-br from-emerald-500 to-blue-500 rounded-xl p-4 mb-4">
          <View className="flex-row items-center justify-between mb-3">
            <View className="flex-1">
              <Text className="text-white/80 text-sm mb-1">Logros Desbloqueados</Text>
              <Text className="text-white font-bold text-4xl mb-1">
                {unlockedCount}/{totalCount}
              </Text>
              <Text className="text-white/80 text-sm">
                {totalXP.toLocaleString()} XP ganado
              </Text>
            </View>
            <View className="bg-white/20 rounded-full p-4">
              <Text className="text-white font-bold text-2xl">{completionPercentage}%</Text>
            </View>
          </View>
          <View className="bg-white/20 h-2 rounded-full overflow-hidden">
            <View
              className="h-full bg-white rounded-full"
              style={{ width: `${completionPercentage}%` }}
            />
          </View>
        </View>

        {/* Category Filter */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-3">
          <View className="flex-row gap-2">
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                onPress={() => setSelectedCategory(category.id)}
                className={`flex-row items-center px-4 py-2 rounded-lg ${
                  selectedCategory === category.id
                    ? 'bg-emerald-500'
                    : 'bg-zinc-900 border border-zinc-800'
                }`}
              >
                <Ionicons
                  name={category.icon as any}
                  size={18}
                  color={selectedCategory === category.id ? 'white' : '#71717A'}
                />
                <Text
                  className={`ml-2 font-semibold text-sm ${
                    selectedCategory === category.id ? 'text-white' : 'text-zinc-400'
                  }`}
                >
                  {category.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {/* Tier Filter */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row gap-2">
            {tiers.map((tier) => (
              <TouchableOpacity
                key={tier.id}
                onPress={() => setSelectedTier(tier.id)}
                className={`px-4 py-2 rounded-lg ${
                  selectedTier === tier.id
                    ? 'bg-emerald-500'
                    : 'bg-zinc-900 border border-zinc-800'
                }`}
              >
                <Text
                  className={`font-semibold text-sm ${
                    selectedTier === tier.id ? 'text-white' : 'text-zinc-400'
                  }`}
                >
                  {tier.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          <Text className="text-white font-bold text-lg mb-3">
            {selectedCategory === 'all' ? 'Todos los Logros' : categories.find((c) => c.id === selectedCategory)?.label}
            {' '}({filteredAchievements.length})
          </Text>

          {filteredAchievements.map((achievement) => (
            <TouchableOpacity
              key={achievement.id}
              onPress={() => viewAchievement(achievement)}
              className={`bg-zinc-900 rounded-xl p-4 mb-3 border-2 ${
                achievement.unlocked ? 'border-emerald-500' : 'border-zinc-800'
              }`}
            >
              <View className="flex-row items-start justify-between mb-3">
                <View className="flex-row items-center flex-1">
                  <View
                    className={`w-16 h-16 rounded-full items-center justify-center ${
                      achievement.unlocked ? '' : 'opacity-30'
                    }`}
                    style={{ backgroundColor: getTierColor(achievement.tier) + '30' }}
                  >
                    {achievement.unlocked ? (
                      <Text className="text-4xl">{achievement.reward.badge}</Text>
                    ) : (
                      <Ionicons
                        name="lock-closed"
                        size={24}
                        color={getTierColor(achievement.tier)}
                      />
                    )}
                  </View>
                  <View className="ml-4 flex-1">
                    <View className="flex-row items-center mb-1">
                      <View
                        className="px-2 py-1 rounded-full"
                        style={{ backgroundColor: getTierColor(achievement.tier) + '30' }}
                      >
                        <Text
                          className="text-xs font-bold uppercase"
                          style={{ color: getTierColor(achievement.tier) }}
                        >
                          {achievement.tier}
                        </Text>
                      </View>
                    </View>
                    <Text
                      className={`font-bold text-lg mb-1 ${
                        achievement.unlocked ? 'text-white' : 'text-zinc-500'
                      }`}
                    >
                      {achievement.name}
                    </Text>
                    <Text
                      className={`text-sm ${
                        achievement.unlocked ? 'text-zinc-400' : 'text-zinc-600'
                      }`}
                    >
                      {achievement.description}
                    </Text>
                  </View>
                </View>
              </View>

              {/* Progress Bar */}
              {achievement.maxProgress && (
                <View className="mb-3">
                  <View className="flex-row items-center justify-between mb-2">
                    <Text className="text-zinc-400 text-sm">
                      Progreso: {achievement.progress}/{achievement.maxProgress}
                    </Text>
                    <Text className="text-emerald-500 font-bold text-sm">
                      {Math.round(((achievement.progress || 0) / achievement.maxProgress) * 100)}%
                    </Text>
                  </View>
                  <View className="bg-zinc-800 h-2 rounded-full overflow-hidden">
                    <View
                      className={`h-full rounded-full ${
                        achievement.unlocked ? 'bg-emerald-500' : 'bg-zinc-600'
                      }`}
                      style={{
                        width: `${((achievement.progress || 0) / achievement.maxProgress) * 100}%`,
                      }}
                    />
                  </View>
                </View>
              )}

              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center gap-3">
                  <View
                    className="px-3 py-1 rounded-full"
                    style={{ backgroundColor: getCategoryColor(achievement.category) + '20' }}
                  >
                    <Text
                      className="text-xs font-bold capitalize"
                      style={{ color: getCategoryColor(achievement.category) }}
                    >
                      {achievement.category}
                    </Text>
                  </View>
                  <View className="bg-amber-500/20 px-3 py-1 rounded-full">
                    <Text className="text-amber-500 text-xs font-bold">
                      +{achievement.reward.xp} XP
                    </Text>
                  </View>
                </View>

                {achievement.unlocked && (
                  <TouchableOpacity
                    onPress={() => shareAchievement(achievement)}
                    className="bg-zinc-800 rounded-lg p-2"
                  >
                    <Ionicons name="share-social" size={16} color="#10B981" />
                  </TouchableOpacity>
                )}
              </View>

              {achievement.unlocked && achievement.unlockedDate && (
                <View className="bg-emerald-500/10 rounded-lg p-3 mt-3 border border-emerald-500/30">
                  <View className="flex-row items-center">
                    <Ionicons name="checkmark-circle" size={16} color="#10B981" />
                    <Text className="text-emerald-400 text-sm ml-2">
                      Desbloqueado el{' '}
                      {new Date(achievement.unlockedDate).toLocaleDateString('es-ES')}
                    </Text>
                  </View>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Info Card */}
        <View className="px-6 pb-6 pt-4">
          <View className="bg-blue-500/10 rounded-xl p-4 border border-blue-500/30">
            <View className="flex-row items-start">
              <Ionicons name="information-circle" size={20} color="#3B82F6" />
              <View className="flex-1 ml-3">
                <Text className="text-blue-400 font-bold mb-2">
                  Sistema de Logros
                </Text>
                <Text className="text-blue-300 text-sm">
                  Desbloquea logros completando desafíos en diferentes categorías. Cada logro otorga XP y badges para mostrar tus logros.
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
