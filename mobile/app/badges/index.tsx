import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/Badge';
import { BADGES, BadgeId, BADGE_TIERS, BadgeTier } from '@/constants/badges';

export default function BadgesScreen() {
  const [selectedBadge, setSelectedBadge] = useState<BadgeId | null>(null);
  const [filterTier, setFilterTier] = useState<BadgeTier | 'all'>('all');

  // TODO: Get from backend which badges are unlocked
  const unlockedBadges: BadgeId[] = [
    'FIRST_WORKOUT',
    'WORKOUTS_10',
    'STREAK_7',
    'FIRST_RECORD',
    'FIRST_FRIEND',
  ];

  const badgeEntries = Object.entries(BADGES) as [BadgeId, typeof BADGES[BadgeId]][];

  // Filter badges by tier
  const filteredBadges = badgeEntries.filter(([_, badge]) => 
    filterTier === 'all' || badge.tier === filterTier
  );

  // Group badges by category
  const categories = {
    workouts: filteredBadges.filter(([id]) => id.startsWith('WORKOUTS_') || id === 'FIRST_WORKOUT'),
    streak: filteredBadges.filter(([id]) => id.startsWith('STREAK_')),
    volume: filteredBadges.filter(([id]) => id.startsWith('VOLUME_')),
    level: filteredBadges.filter(([id]) => id.startsWith('LEVEL_')),
    records: filteredBadges.filter(([id]) => id.startsWith('RECORDS_') || id === 'FIRST_RECORD'),
    social: filteredBadges.filter(([id]) => id.includes('FRIEND') || id.includes('CHALLENGE')),
    special: filteredBadges.filter(([id]) => 
      ['EARLY_BIRD', 'NIGHT_OWL', 'MARATHON', 'PERFECT_WEEK'].includes(id)
    ),
  };

  const stats = {
    total: badgeEntries.length,
    unlocked: unlockedBadges.length,
    percentage: Math.round((unlockedBadges.length / badgeEntries.length) * 100),
  };

  const tiers = [
    { id: 'all' as const, name: 'Todos' },
    { id: 'bronze' as const, name: 'Bronce' },
    { id: 'silver' as const, name: 'Plata' },
    { id: 'gold' as const, name: 'Oro' },
    { id: 'platinum' as const, name: 'Platino' },
    { id: 'diamond' as const, name: 'Diamante' },
  ];

  const selectedBadgeData = selectedBadge ? BADGES[selectedBadge] : null;

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <LinearGradient colors={['#FFEA00', '#D97706']} className="px-6 pt-12 pb-6">
        <View className="flex-row items-center justify-between mb-4">
          <TouchableOpacity onPress={() => router.back()} className="p-2">
            <Ionicons name="arrow-back" size={28} color="white" />
          </TouchableOpacity>
          <Text className="text-2xl font-bold text-white">Medallas</Text>
          <View className="w-10" />
        </View>

        {/* Progress */}
        <Card className="p-4 bg-white/10 border-0">
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-white font-semibold">
              {stats.unlocked} / {stats.total} Desbloqueadas
            </Text>
            <Text className="text-white font-bold">{stats.percentage}%</Text>
          </View>
          <View className="h-3 bg-white/20 rounded-full overflow-hidden">
            <View
              className="h-full bg-white rounded-full"
              style={{ width: `${stats.percentage}%` }}
            />
          </View>
        </Card>
      </LinearGradient>

      <ScrollView className="flex-1" contentContainerClassName="p-6 gap-6">
        {/* Tier Filter */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="gap-2 -mx-6 px-6">
          {tiers.map((tier) => (
            <TouchableOpacity
              key={tier.id}
              onPress={() => setFilterTier(tier.id)}
              className={`px-4 py-2 rounded-full ${
                filterTier === tier.id
                  ? 'bg-amber-500'
                  : 'bg-white border border-gray-200'
              }`}
            >
              <Text
                className={`font-semibold ${
                  filterTier === tier.id ? 'text-white' : 'text-gray-700'
                }`}
              >
                {tier.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Categories */}
        {Object.entries(categories).map(([category, badges]) => {
          if (badges.length === 0) return null;

          const categoryNames: Record<string, string> = {
            workouts: 'Entrenamientos',
            streak: 'Racha',
            volume: 'Volumen',
            level: 'Nivel',
            records: 'Récords',
            social: 'Social',
            special: 'Especiales',
          };

          const categoryIcons: Record<string, keyof typeof Ionicons.glyphMap> = {
            workouts: 'barbell',
            streak: 'flame',
            volume: 'speedometer',
            level: 'trophy',
            records: 'trending-up',
            social: 'people',
            special: 'star',
          };

          return (
            <View key={category}>
              {/* Category Header */}
              <View className="flex-row items-center gap-2 mb-3">
                <Ionicons name={categoryIcons[category]} size={24} color="#FFEA00" />
                <Text className="text-lg font-bold text-gray-900">
                  {categoryNames[category]}
                </Text>
                <View className="bg-gray-200 px-2 py-0.5 rounded-full ml-auto">
                  <Text className="text-xs font-semibold text-gray-700">
                    {badges.filter(([id]) => unlockedBadges.includes(id)).length} /{' '}
                    {badges.length}
                  </Text>
                </View>
              </View>

              {/* Badges Grid */}
              <View className="flex-row flex-wrap gap-4">
                {badges.map(([badgeId]) => (
                  <View key={badgeId} className="w-[30%]">
                    <Badge
                      badgeId={badgeId}
                      unlocked={unlockedBadges.includes(badgeId)}
                      size="medium"
                      showName
                      onPress={() => setSelectedBadge(badgeId)}
                    />
                  </View>
                ))}
              </View>
            </View>
          );
        })}
      </ScrollView>

      {/* Badge Detail Modal */}
      <Modal
        visible={selectedBadge !== null}
        transparent
        animationType="fade"
        onRequestClose={() => setSelectedBadge(null)}
      >
        <View className="flex-1 bg-black/70 items-center justify-center p-6">
          <Card className="w-full max-w-md p-6">
            {selectedBadgeData && (
              <>
                <View className="items-center mb-6">
                  <Badge
                    badgeId={selectedBadge!}
                    unlocked={unlockedBadges.includes(selectedBadge!)}
                    size="large"
                  />
                </View>

                <Text className="text-2xl font-bold text-gray-900 text-center mb-2">
                  {selectedBadgeData.name}
                </Text>

                <Text className="text-gray-600 text-center mb-4">
                  {selectedBadgeData.description}
                </Text>

                {/* Tier Badge */}
                <View className="items-center mb-6">
                  <View
                    className="px-4 py-2 rounded-full"
                    style={{
                      backgroundColor:
                        BADGE_TIERS[selectedBadgeData.tier].color + '20',
                    }}
                  >
                    <Text
                      className="font-bold"
                      style={{ color: BADGE_TIERS[selectedBadgeData.tier].color }}
                    >
                      {BADGE_TIERS[selectedBadgeData.tier].name}
                    </Text>
                  </View>
                </View>

                {/* Status */}
                {unlockedBadges.includes(selectedBadge!) ? (
                  <View className="bg-emerald-50 p-4 rounded-xl mb-4">
                    <View className="flex-row items-center justify-center gap-2">
                      <Ionicons name="checkmark-circle" size={24} color="#9D12DE" />
                      <Text className="text-primary font-bold">
                        ¡Desbloqueada!
                      </Text>
                    </View>
                  </View>
                ) : (
                  <View className="bg-gray-100 p-4 rounded-xl mb-4">
                    <View className="flex-row items-center justify-center gap-2">
                      <Ionicons name="lock-closed" size={24} color="#6B7280" />
                      <Text className="text-gray-700 font-bold">Bloqueada</Text>
                    </View>
                  </View>
                )}

                <TouchableOpacity
                  onPress={() => setSelectedBadge(null)}
                  className="bg-amber-500 py-3 rounded-xl"
                >
                  <Text className="text-white font-bold text-center">Cerrar</Text>
                </TouchableOpacity>
              </>
            )}
          </Card>
        </View>
      </Modal>
    </View>
  );
}


