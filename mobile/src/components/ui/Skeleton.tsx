import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, ViewStyle } from 'react-native';

interface SkeletonProps {
  width?: number | string;
  height?: number | string;
  borderRadius?: number;
  style?: ViewStyle;
}

export function Skeleton({ width = '100%', height = 16, borderRadius = 4, style }: SkeletonProps) {
  const pulseAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, []);

  const opacity = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.6],
  });

  return (
    <Animated.View
      style={[
        styles.skeleton,
        {
          width,
          height,
          borderRadius,
          opacity,
        },
        style,
      ]}
    />
  );
}

export function SkeletonWorkoutCard() {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Skeleton width={120} height={20} />
        <Skeleton width={60} height={16} />
      </View>
      <View style={{ marginVertical: 12 }}>
        <Skeleton width="100%" height={14} style={{ marginBottom: 8 }} />
        <Skeleton width="80%" height={14} />
      </View>
      <View style={styles.cardFooter}>
        <Skeleton width={80} height={32} borderRadius={16} />
        <Skeleton width={80} height={32} borderRadius={16} />
      </View>
    </View>
  );
}

export function SkeletonExerciseCard() {
  return (
    <View style={styles.exerciseCard}>
      <Skeleton width={48} height={48} borderRadius={24} />
      <View style={{ flex: 1, marginLeft: 12 }}>
        <Skeleton width="60%" height={16} style={{ marginBottom: 6 }} />
        <Skeleton width="40%" height={12} />
      </View>
      <Skeleton width={40} height={40} borderRadius={8} />
    </View>
  );
}

export function SkeletonStatCard() {
  return (
    <View style={styles.statCard}>
      <Skeleton width={40} height={40} borderRadius={12} style={{ marginBottom: 12 }} />
      <Skeleton width={60} height={24} style={{ marginBottom: 6 }} />
      <Skeleton width="80%" height={14} />
    </View>
  );
}

export function SkeletonList({ count = 3, ItemComponent = SkeletonWorkoutCard }: { count?: number; ItemComponent?: React.ComponentType }) {
  return (
    <View style={styles.list}>
      {Array.from({ length: count }).map((_, index) => (
        <ItemComponent key={index} />
      ))}
    </View>
  );
}

// Convenience exports for specific lists
export function SkeletonWorkoutList({ count = 3 }: { count?: number }) {
  return <SkeletonList count={count} ItemComponent={SkeletonWorkoutCard} />;
}

export function SkeletonExerciseList({ count = 3 }: { count?: number }) {
  return <SkeletonList count={count} ItemComponent={SkeletonExerciseCard} />;
}

export function SkeletonStatList({ count = 3 }: { count?: number }) {
  return <SkeletonList count={count} ItemComponent={SkeletonStatCard} />;
}

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: '#E4E4E7',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardFooter: {
    flexDirection: 'row',
    gap: 8,
  },
  exerciseCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
  },
  statCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  list: {
    padding: 16,
  },
});
