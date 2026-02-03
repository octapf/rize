import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import ConfettiCannon from 'react-native-confetti-cannon';

const { width } = Dimensions.get('window');

interface RecordCelebrationProps {
  visible: boolean;
  recordType: string;
  value: number;
  unit?: string;
  exerciseName: string;
  improvement?: number;
  onComplete?: () => void;
}

const RECORD_TYPES: Record<string, { label: string; icon: string; color: string }> = {
  weight: { label: 'Peso Máximo', icon: 'barbell', color: '#f59e0b' },
  reps: { label: 'Repeticiones', icon: 'repeat', color: '#3b82f6' },
  volume: { label: 'Volumen Total', icon: 'speedometer', color: '#8b5cf6' },
  duration: { label: 'Duración', icon: 'time', color: '#10b981' },
  distance: { label: 'Distancia', icon: 'navigate', color: '#ef4444' },
};

export const RecordCelebration: React.FC<RecordCelebrationProps> = ({
  visible,
  recordType,
  value,
  unit,
  exerciseName,
  improvement,
  onComplete,
}) => {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const confettiRef = useRef<any>(null);

  const recordInfo = RECORD_TYPES[recordType] || RECORD_TYPES.weight;

  useEffect(() => {
    if (visible) {
      // Trigger confetti
      confettiRef.current?.start();

      // Animations
      Animated.sequence([
        Animated.parallel([
          Animated.spring(scaleAnim, {
            toValue: 1,
            tension: 50,
            friction: 7,
            useNativeDriver: true,
          }),
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
        ]),
        Animated.loop(
          Animated.sequence([
            Animated.timing(rotateAnim, {
              toValue: 1,
              duration: 200,
              useNativeDriver: true,
            }),
            Animated.timing(rotateAnim, {
              toValue: 0,
              duration: 200,
              useNativeDriver: true,
            }),
          ]),
          { iterations: 3 }
        ),
      ]).start();

      // Auto dismiss after 4 seconds
      const timer = setTimeout(() => {
        Animated.parallel([
          Animated.timing(scaleAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
        ]).start(() => {
          onComplete?.();
        });
      }, 4000);

      return () => clearTimeout(timer);
    } else {
      scaleAnim.setValue(0);
      fadeAnim.setValue(0);
      rotateAnim.setValue(0);
    }
  }, [visible]);

  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['-10deg', '10deg'],
  });

  const formatValue = () => {
    if (recordType === 'duration') {
      const mins = Math.floor(value / 60);
      const secs = Math.floor(value % 60);
      return `${mins}:${secs.toString().padStart(2, '0')}`;
    }
    if (recordType === 'distance') {
      return value.toFixed(2);
    }
    return value.toString();
  };

  if (!visible) return null;

  return (
    <>
      <ConfettiCannon
        ref={confettiRef}
        count={150}
        origin={{ x: width / 2, y: -10 }}
        autoStart={false}
        fadeOut={true}
        explosionSpeed={350}
        fallSpeed={2000}
      />

      <View style={styles.overlay}>
        <Animated.View
          style={[
            styles.container,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <LinearGradient
            colors={[recordInfo.color, `${recordInfo.color}CC`]}
            style={styles.gradient}
          >
            {/* Trophy Icon */}
            <Animated.View
              style={[
                styles.trophyContainer,
                {
                  transform: [{ rotate: rotation }],
                },
              ]}
            >
              <View style={styles.trophyGlow}>
                <Ionicons name="trophy" size={80} color="#FFD700" />
              </View>
            </Animated.View>

            {/* Title */}
            <Text style={styles.title}>¡NUEVO RECORD!</Text>

            {/* Record Type */}
            <View style={styles.recordTypeContainer}>
              <Ionicons name={recordInfo.icon as any} size={24} color="#fff" />
              <Text style={styles.recordType}>{recordInfo.label}</Text>
            </View>

            {/* Exercise Name */}
            <Text style={styles.exerciseName}>{exerciseName}</Text>

            {/* Value */}
            <View style={styles.valueContainer}>
              <Text style={styles.value}>{formatValue()}</Text>
              {unit && <Text style={styles.unit}>{unit}</Text>}
            </View>

            {/* Improvement */}
            {improvement && improvement > 0 && (
              <View style={styles.improvementContainer}>
                <Ionicons name="trending-up" size={20} color="#10b981" />
                <Text style={styles.improvement}>
                  +{improvement.toFixed(1)}% de mejora
                </Text>
              </View>
            )}

            {/* Celebration Text */}
            <Text style={styles.celebration}>🎉 ¡Sigue así, campeón! 🎉</Text>
          </LinearGradient>
        </Animated.View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  container: {
    width: '90%',
    maxWidth: 400,
    borderRadius: 24,
    overflow: 'hidden',
  },
  gradient: {
    padding: 32,
    alignItems: 'center',
  },
  trophyContainer: {
    marginBottom: 20,
  },
  trophyGlow: {
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 30,
    elevation: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    color: '#fff',
    marginBottom: 16,
    textAlign: 'center',
    letterSpacing: 2,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  recordTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 12,
  },
  recordType: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
  exerciseName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
    marginBottom: 16,
  },
  value: {
    fontSize: 56,
    fontWeight: '900',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  unit: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    opacity: 0.9,
  },
  improvementContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(16, 185, 129, 0.3)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 16,
  },
  improvement: {
    fontSize: 16,
    fontWeight: '700',
    color: '#10b981',
  },
  celebration: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
    opacity: 0.9,
  },
});
