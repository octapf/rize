import React, { useEffect } from 'react';
import { Text } from '@/components/ui/Text';
import { Modal, View, TouchableOpacity } from 'react-native';;
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
  withTiming,
  withRepeat,
  Easing,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';

interface AchievementCelebrationProps {
  visible: boolean;
  title: string;
  description: string;
  xpReward?: number;
  icon?: keyof typeof Ionicons.glyphMap;
  onClose: () => void;
}

export default function AchievementCelebration({
  visible,
  title,
  description,
  xpReward,
  icon = 'trophy',
  onClose,
}: AchievementCelebrationProps) {
  const scale = useSharedValue(0);
  const rotate = useSharedValue(0);
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      // Haptic feedback
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

      // Animations
      scale.value = withSequence(
        withSpring(1.2, { damping: 2, stiffness: 80 }),
        withSpring(1, { damping: 10, stiffness: 100 })
      );

      rotate.value = withRepeat(
        withTiming(360, { duration: 2000, easing: Easing.linear }),
        -1,
        false
      );

      opacity.value = withTiming(1, { duration: 300 });
    } else {
      scale.value = 0;
      opacity.value = 0;
    }
  }, [visible]);

  const animatedContainerStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const animatedIconStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotate.value}deg` }],
  }));

  if (!visible) return null;

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View className="flex-1 bg-black/70 items-center justify-center p-6">
        <Animated.View style={animatedContainerStyle} className="w-full max-w-sm">
          <LinearGradient
            colors={['#F59E0B', '#D97706']}
            className="rounded-3xl p-8 items-center"
          >
            {/* Animated Icon */}
            <Animated.View
              style={animatedIconStyle}
              className="w-24 h-24 bg-white rounded-full items-center justify-center mb-6"
            >
              <Ionicons name={icon} size={48} color="#F59E0B" />
            </Animated.View>

            {/* Title */}
            <Text className="text-white text-2xl font-bold text-center mb-3">
              {title}
            </Text>

            {/* Description */}
            <Text className="text-amber-100 text-base text-center mb-6">
              {description}
            </Text>

            {/* XP Reward */}
            {xpReward && (
              <View className="bg-white/20 px-6 py-3 rounded-full mb-6">
                <View className="flex-row items-center gap-2">
                  <Ionicons name="flash" size={20} color="white" />
                  <Text className="text-white font-bold text-lg">
                    +{xpReward} XP
                  </Text>
                </View>
              </View>
            )}

            {/* Close Button */}
            <TouchableOpacity
              onPress={onClose}
              className="bg-white px-8 py-3 rounded-full"
            >
              <Text className="text-amber-600 font-bold text-base">
                ¡Genial!
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        </Animated.View>

        {/* Confetti Effect (simplified) */}
        {[...Array(12)].map((_, i) => (
          <ConfettiPiece key={i} index={i} />
        ))}
      </View>
    </Modal>
  );
}

function ConfettiPiece({ index }: { index: number }) {
  const translateY = useSharedValue(-100);
  const translateX = useSharedValue(0);
  const rotate = useSharedValue(0);
  const opacity = useSharedValue(1);

  useEffect(() => {
    const delay = index * 50;
    const endX = (Math.random() - 0.5) * 300;

    translateY.value = withDelay(
      delay,
      withTiming(800, { duration: 2000, easing: Easing.bezier(0.25, 0.1, 0.25, 1) })
    );
    translateX.value = withDelay(delay, withTiming(endX, { duration: 2000 }));
    rotate.value = withDelay(
      delay,
      withRepeat(withTiming(360, { duration: 1000 }), -1, false)
    );
    opacity.value = withDelay(
      delay,
      withSequence(withTiming(1, { duration: 100 }), withTiming(0, { duration: 500, delay: 1500 }))
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: translateY.value },
      { translateX: translateX.value },
      { rotate: `${rotate.value}deg` },
    ],
    opacity: opacity.value,
  }));

  const colors = ['#EF4444', '#F59E0B', '#9D12DE', '#3B82F6', '#8B5CF6', '#EC4899'];
  const color = colors[index % colors.length];

  return (
    <Animated.View
      style={[animatedStyle, { position: 'absolute', top: '30%' }]}
      className="w-3 h-3 rounded-full"
      pointerEvents="none"
    >
      <View className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
    </Animated.View>
  );
}

function withDelay(delay: number, animation: any) {
  'worklet';
  return withTiming(0, { duration: delay }, () => {
    'worklet';
    return animation;
  });
}
