import React from 'react';
import { View, Platform, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';
import { clsx } from 'clsx';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  tint?: 'light' | 'dark' | 'default';
}

export function GlassCard({ 
  children, 
  className, 
  intensity = 50, 
  tint = 'dark' 
}: GlassCardProps) {
  
  const containerClasses = clsx(
    'overflow-hidden rounded-2xl border border-glass-20',
    className
  );

  if (Platform.OS === 'android') {
    // Android has limited Blur support in some versions, often better to fallback to translucent background
    // or use specific libraries. For Expo, BlurView works but can be expensive.
    // We'll add a semi-transparent background fallback logic via classes if needed.
    return (
      <View className={clsx('bg-zinc-900/70', containerClasses)}>
        {children}
      </View>
    );
  }

  return (
    <BlurView 
        intensity={intensity} 
        tint={tint} 
        className={containerClasses}
        style={styles.blur}
    >
      {/* Container for inner content spacing/overlay if needed */}
      <View className="bg-transparent"> 
        {children}
      </View>
    </BlurView>
  );
}

const styles = StyleSheet.create({
    blur: {
        // Enforce consistent overflow handling
        overflow: 'hidden',
    }
});
