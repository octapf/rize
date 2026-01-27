import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Vibration,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Audio } from 'expo-av';

interface RestTimerProps {
  visible: boolean;
  duration: number; // seconds
  onComplete?: () => void;
  onSkip?: () => void;
  onAddTime?: (seconds: number) => void;
}

export const RestTimer: React.FC<RestTimerProps> = ({
  visible,
  duration,
  onComplete,
  onSkip,
  onAddTime,
}) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isPaused, setIsPaused] = useState(false);
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (visible) {
      setTimeLeft(duration);
      setIsPaused(false);
    }
  }, [visible, duration]);

  useEffect(() => {
    if (!visible || isPaused) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Timer completed
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
          playCompletionSound();
          Vibration.vibrate([0, 500, 200, 500]);
          onComplete?.();
          return 0;
        }

        // Pulse animation every second
        Animated.sequence([
          Animated.timing(scaleAnim, {
            toValue: 1.05,
            duration: 100,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 100,
            useNativeDriver: true,
          }),
        ]).start();

        // Vibrate in last 3 seconds
        if (prev <= 3) {
          Vibration.vibrate(100);
        }

        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [visible, isPaused]);

  const playCompletionSound = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require('@/assets/sounds/timer-complete.mp3'),
        { shouldPlay: true }
      );
      await sound.playAsync();
    } catch (error) {
      console.log('Error playing sound:', error);
    }
  };

  const handleAddTime = (seconds: number) => {
    setTimeLeft((prev) => prev + seconds);
    onAddTime?.(seconds);
  };

  const handleTogglePause = () => {
    setIsPaused((prev) => !prev);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = duration > 0 ? (timeLeft / duration) * 100 : 0;
  const isWarning = timeLeft <= 10;

  if (!visible) return null;

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <LinearGradient
            colors={isWarning ? ['#ef4444', '#dc2626'] : ['#10b981', '#059669']}
            style={styles.gradient}
          >
            {/* Close Button */}
            <TouchableOpacity style={styles.closeButton} onPress={onSkip}>
              <Ionicons name="close" size={24} color="#fff" />
            </TouchableOpacity>

            {/* Title */}
            <Text style={styles.title}>Tiempo de Descanso</Text>

            {/* Timer Display */}
            <Animated.View
              style={[
                styles.timerContainer,
                {
                  transform: [{ scale: scaleAnim }],
                },
              ]}
            >
              <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
            </Animated.View>

            {/* Progress Ring */}
            <View style={styles.progressContainer}>
              <View
                style={[
                  styles.progressBar,
                  {
                    width: `${progress}%`,
                    backgroundColor: isWarning ? '#fef3c7' : '#d1fae5',
                  },
                ]}
              />
            </View>

            {/* Controls */}
            <View style={styles.controls}>
              {/* Pause/Resume */}
              <TouchableOpacity
                style={styles.controlButton}
                onPress={handleTogglePause}
              >
                <Ionicons
                  name={isPaused ? 'play' : 'pause'}
                  size={28}
                  color="#fff"
                />
                <Text style={styles.controlLabel}>
                  {isPaused ? 'Reanudar' : 'Pausar'}
                </Text>
              </TouchableOpacity>

              {/* Add 30s */}
              <TouchableOpacity
                style={styles.controlButton}
                onPress={() => handleAddTime(30)}
              >
                <Ionicons name="add" size={28} color="#fff" />
                <Text style={styles.controlLabel}>+30s</Text>
              </TouchableOpacity>

              {/* Skip */}
              <TouchableOpacity style={styles.controlButton} onPress={onSkip}>
                <Ionicons name="play-forward" size={28} color="#fff" />
                <Text style={styles.controlLabel}>Omitir</Text>
              </TouchableOpacity>
            </View>

            {/* Quick Add Buttons */}
            <View style={styles.quickAdd}>
              <TouchableOpacity
                style={styles.quickAddButton}
                onPress={() => handleAddTime(15)}
              >
                <Text style={styles.quickAddText}>+15s</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.quickAddButton}
                onPress={() => handleAddTime(60)}
              >
                <Text style={styles.quickAddText}>+1m</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '85%',
    maxWidth: 400,
    borderRadius: 24,
    overflow: 'hidden',
  },
  gradient: {
    padding: 32,
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    padding: 8,
    zIndex: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 24,
    opacity: 0.9,
  },
  timerContainer: {
    marginBottom: 24,
  },
  timerText: {
    fontSize: 72,
    fontWeight: '900',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  progressContainer: {
    width: '100%',
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 4,
    marginBottom: 32,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 4,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 16,
  },
  controlButton: {
    alignItems: 'center',
    gap: 4,
  },
  controlLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
    opacity: 0.9,
  },
  quickAdd: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  quickAddButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 12,
  },
  quickAddText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
});
