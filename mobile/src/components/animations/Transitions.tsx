import React, { useEffect, useRef } from 'react';
import { Animated, ViewStyle } from 'react-native';

interface FadeInProps {
  children: React.ReactNode;
  duration?: number;
  delay?: number;
  style?: ViewStyle;
}

export function FadeIn({ children, duration = 300, delay = 0, style }: FadeInProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration,
      delay,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={[{ opacity: fadeAnim }, style]}>
      {children}
    </Animated.View>
  );
}

interface SlideInProps {
  children: React.ReactNode;
  from?: 'left' | 'right' | 'top' | 'bottom';
  duration?: number;
  delay?: number;
  distance?: number;
  style?: ViewStyle;
}

export function SlideIn({
  children,
  from = 'bottom',
  duration = 300,
  delay = 0,
  distance = 50,
  style,
}: SlideInProps) {
  const slideAnim = useRef(new Animated.Value(distance)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration,
        delay,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration,
        delay,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const getTransform = () => {
    switch (from) {
      case 'left':
        return [{ translateX: slideAnim.interpolate({ inputRange: [-distance, 0], outputRange: [-distance, 0] }) }];
      case 'right':
        return [{ translateX: slideAnim }];
      case 'top':
        return [{ translateY: slideAnim.interpolate({ inputRange: [-distance, 0], outputRange: [-distance, 0] }) }];
      case 'bottom':
      default:
        return [{ translateY: slideAnim }];
    }
  };

  return (
    <Animated.View
      style={[
        {
          opacity: fadeAnim,
          transform: getTransform(),
        },
        style,
      ]}
    >
      {children}
    </Animated.View>
  );
}

interface ScaleInProps {
  children: React.ReactNode;
  duration?: number;
  delay?: number;
  initialScale?: number;
  style?: ViewStyle;
}

export function ScaleIn({
  children,
  duration = 300,
  delay = 0,
  initialScale = 0.9,
  style,
}: ScaleInProps) {
  const scaleAnim = useRef(new Animated.Value(initialScale)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 5,
        delay,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration,
        delay,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={[
        {
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }],
        },
        style,
      ]}
    >
      {children}
    </Animated.View>
  );
}
