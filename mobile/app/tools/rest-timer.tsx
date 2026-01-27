import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface RestTimer {
  duration: number; // seconds
  label: string;
}

const PRESET_TIMERS: RestTimer[] = [
  { duration: 30, label: '30s' },
  { duration: 45, label: '45s' },
  { duration: 60, label: '1m' },
  { duration: 90, label: '1m 30s' },
  { duration: 120, label: '2m' },
  { duration: 180, label: '3m' },
];

export default function RestTimerScreen() {
  const [timeRemaining, setTimeRemaining] = useState(60);
  const [selectedDuration, setSelectedDuration] = useState(60);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            // TODO: Play notification sound
            Alert.alert('¡Tiempo!', 'Descanso terminado. ¡A entrenar!');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, timeRemaining]);

  const startTimer = () => {
    if (timeRemaining === 0) {
      setTimeRemaining(selectedDuration);
    }
    setIsRunning(true);
    setIsPaused(false);
  };

  const pauseTimer = () => {
    setIsRunning(false);
    setIsPaused(true);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setIsPaused(false);
    setTimeRemaining(selectedDuration);
  };

  const selectDuration = (duration: number) => {
    setSelectedDuration(duration);
    setTimeRemaining(duration);
    setIsRunning(false);
    setIsPaused(false);
  };

  const addTime = (seconds: number) => {
    setTimeRemaining((prev) => prev + seconds);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((selectedDuration - timeRemaining) / selectedDuration) * 100;

  return (
    <View className="flex-1 bg-zinc-950">
      {/* Header */}
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center">
          <TouchableOpacity onPress={() => router.back()} className="mr-3">
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold">Temporizador</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 items-center justify-center px-6">
          {/* Circular Timer */}
          <View className="relative items-center justify-center mb-12">
            {/* Outer circle (background) */}
            <View className="w-80 h-80 rounded-full border-8 border-zinc-800 items-center justify-center">
              {/* Inner circle (progress) - This is simplified, for real circular progress use SVG */}
              <View
                className="w-72 h-72 rounded-full items-center justify-center"
                style={{
                  backgroundColor: isRunning
                    ? '#10B98120'
                    : isPaused
                    ? '#F59E0B20'
                    : '#27272A',
                  borderWidth: 8,
                  borderColor: isRunning
                    ? '#10B981'
                    : isPaused
                    ? '#F59E0B'
                    : '#3F3F46',
                }}
              >
                <Text className="text-white text-7xl font-bold">
                  {formatTime(timeRemaining)}
                </Text>
                <Text className="text-zinc-400 text-lg mt-2">
                  {isRunning ? 'Descansando...' : isPaused ? 'Pausado' : 'Listo'}
                </Text>
              </View>
            </View>

            {/* Progress indicator */}
            {(isRunning || isPaused) && (
              <View className="absolute -bottom-4">
                <Text className="text-zinc-500 text-sm">
                  {Math.round(progress)}% completado
                </Text>
              </View>
            )}
          </View>

          {/* Quick Add Time Buttons */}
          {(isRunning || isPaused) && (
            <View className="flex-row gap-3 mb-8">
              <TouchableOpacity
                onPress={() => addTime(15)}
                className="bg-zinc-900 px-6 py-3 rounded-xl border border-zinc-800"
              >
                <Text className="text-white font-semibold">+15s</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => addTime(30)}
                className="bg-zinc-900 px-6 py-3 rounded-xl border border-zinc-800"
              >
                <Text className="text-white font-semibold">+30s</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => addTime(60)}
                className="bg-zinc-900 px-6 py-3 rounded-xl border border-zinc-800"
              >
                <Text className="text-white font-semibold">+1m</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Control Buttons */}
          <View className="flex-row gap-4 mb-8">
            {!isRunning && !isPaused && (
              <TouchableOpacity
                onPress={startTimer}
                className="bg-emerald-500 px-12 py-4 rounded-2xl items-center flex-1"
                style={{
                  shadowColor: '#10B981',
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.3,
                  shadowRadius: 8,
                }}
              >
                <Ionicons name="play" size={32} color="white" />
                <Text className="text-white font-bold text-lg mt-1">Iniciar</Text>
              </TouchableOpacity>
            )}

            {isRunning && (
              <TouchableOpacity
                onPress={pauseTimer}
                className="bg-amber-500 px-12 py-4 rounded-2xl items-center flex-1"
              >
                <Ionicons name="pause" size={32} color="white" />
                <Text className="text-white font-bold text-lg mt-1">Pausar</Text>
              </TouchableOpacity>
            )}

            {isPaused && (
              <TouchableOpacity
                onPress={startTimer}
                className="bg-emerald-500 px-12 py-4 rounded-2xl items-center flex-1"
              >
                <Ionicons name="play" size={32} color="white" />
                <Text className="text-white font-bold text-lg mt-1">Reanudar</Text>
              </TouchableOpacity>
            )}

            {(isRunning || isPaused) && (
              <TouchableOpacity
                onPress={resetTimer}
                className="bg-zinc-800 px-8 py-4 rounded-2xl items-center"
              >
                <Ionicons name="refresh" size={32} color="white" />
                <Text className="text-white font-bold text-lg mt-1">Reset</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Preset Durations */}
          {!isRunning && !isPaused && (
            <View className="w-full">
              <Text className="text-white font-semibold mb-3 text-center">
                Duraciones Predefinidas
              </Text>
              <View className="flex-row flex-wrap justify-center gap-3">
                {PRESET_TIMERS.map((timer) => (
                  <TouchableOpacity
                    key={timer.duration}
                    onPress={() => selectDuration(timer.duration)}
                    className={`px-6 py-3 rounded-xl ${
                      selectedDuration === timer.duration
                        ? 'bg-emerald-500'
                        : 'bg-zinc-900 border border-zinc-800'
                    }`}
                  >
                    <Text
                      className={`font-bold ${
                        selectedDuration === timer.duration ? 'text-white' : 'text-zinc-400'
                      }`}
                    >
                      {timer.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {/* Tips */}
          {!isRunning && !isPaused && (
            <View className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 mt-8">
              <View className="flex-row items-start">
                <Ionicons name="information-circle" size={20} color="#3B82F6" style={{ marginRight: 8 }} />
                <View className="flex-1">
                  <Text className="text-blue-400 text-sm font-semibold mb-1">
                    Consejos de Descanso
                  </Text>
                  <Text className="text-blue-300/80 text-xs leading-5">
                    • Fuerza: 2-3 minutos{'\n'}
                    • Hipertrofia: 60-90 segundos{'\n'}
                    • Resistencia: 30-60 segundos{'\n'}
                    • Mantente hidratado durante los descansos
                  </Text>
                </View>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
