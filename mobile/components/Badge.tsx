import React from 'react';
import { Text } from '@/components/ui/Text';
import { View, TouchableOpacity } from 'react-native';;
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BADGES, BADGE_TIERS, BadgeId } from '@/constants/badges';

interface BadgeProps {
  badgeId: BadgeId;
  unlocked?: boolean;
  size?: 'small' | 'medium' | 'large';
  showName?: boolean;
  showDescription?: boolean;
  onPress?: () => void;
}

export const Badge: React.FC<BadgeProps> = ({
  badgeId,
  unlocked = false,
  size = 'medium',
  showName = false,
  showDescription = false,
  onPress,
}) => {
  const badge = BADGES[badgeId];
  const tierColors = BADGE_TIERS[badge.tier];

  const sizeMap = {
    small: {
      container: 'w-16 h-16',
      icon: 24,
      nameText: 'text-xs',
      descText: 'text-xs',
    },
    medium: {
      container: 'w-20 h-20',
      icon: 32,
      nameText: 'text-sm',
      descText: 'text-xs',
    },
    large: {
      container: 'w-28 h-28',
      icon: 48,
      nameText: 'text-base',
      descText: 'text-sm',
    },
  };

  const sizes = sizeMap[size];

  const BadgeContent = () => (
    <View className={`items-center ${onPress ? '' : 'gap-2'}`}>
      {/* Badge Circle */}
      <View
        className={`${sizes.container} rounded-full items-center justify-center ${
          unlocked ? '' : 'opacity-40'
        }`}
      >
        {unlocked ? (
          <LinearGradient
            colors={tierColors.gradient}
            className={`${sizes.container} rounded-full items-center justify-center`}
          >
            <Ionicons
              name={badge.icon as any}
              size={sizes.icon}
              color="white"
            />
          </LinearGradient>
        ) : (
          <View
            className={`${sizes.container} rounded-full items-center justify-center bg-gray-300`}
          >
            <Ionicons name="lock-closed" size={sizes.icon} color="#9CA3AF" />
          </View>
        )}
      </View>

      {/* Badge Name */}
      {showName && (
        <Text
          className={`${sizes.nameText} font-bold text-gray-900 text-center ${
            unlocked ? '' : 'text-gray-400'
          }`}
        >
          {badge.name}
        </Text>
      )}

      {/* Badge Description */}
      {showDescription && (
        <Text
          className={`${sizes.descText} text-gray-600 text-center max-w-[120px] ${
            unlocked ? '' : 'text-gray-400'
          }`}
        >
          {badge.description}
        </Text>
      )}

      {/* Tier Badge */}
      {unlocked && (showName || showDescription) && (
        <View
          className="px-2 py-0.5 rounded-full mt-1"
          style={{ backgroundColor: tierColors.color + '20' }}
        >
          <Text
            className="text-xs font-semibold"
            style={{ color: tierColors.color }}
          >
            {tierColors.name}
          </Text>
        </View>
      )}
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        <BadgeContent />
      </TouchableOpacity>
    );
  }

  return <BadgeContent />;
};
