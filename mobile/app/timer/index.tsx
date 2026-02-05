import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Vibration,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Card } from '@/components/ui/Card';

export default function RestTimerScreen() {
  const [seconds, setSeconds] = useState(90);
  const [initialSeconds, setInitialSeconds] = useState(90);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const presetTimes = [30, 60, 90, 120, 180, 240, 300];

  useEffect(() => {
    if (isRunning && !isPaused) {
      intervalRef.current = setInterval(() => {
        setSeconds(prev => {
          if (prev <= 1) {
            // Timer completed
            Vibration.vibrate([0, 500, 200, 500]);
            setIsRunning(false);
            setIsPaused(false);
            Alert.alert('Â¡Descanso Terminado!', 'Es hora de volver a entrenar ðŸ’ª', [
              { text: 'OK', onPress: () => resetTimer() }
            ]);
            return 0;
          }
          
          // Vibrate at 3, 2, 1 seconds
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
    }
  }, [isRunning, isPaused]);

  const startTimer = () => {
    setIsRunning(true);
    setIsPaused(false);
  };

  const pauseTimer = () => {
    setIsPaused(true);
  };

  const resumeTimer = () => {
    setIsPaused(false);
  };

  const resetTimer = () => {
    setSeconds(initialSeconds);
    setIsRunning(false);
    setIsPaused(false);
  };

  const stopTimer = () => {
    setIsRunning(false);
    setIsPaused(false);
    setSeconds(initialSeconds);
  };

  const addTime = (amount: number) => {
    setSeconds(prev => prev + amount);
    if (!isRunning && seconds === 0) {
      setSeconds(amount);
    }
  };

  const setPreset = (time: number) => {
    setSeconds(time);
    setInitialSeconds(time);
    setIsRunning(false);
    setIsPaused(false);
  };

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = initialSeconds > 0 ? (seconds / initialSeconds) * 100 : 0;

  // Color based on remaining time
  const getTimerColor = () => {
    if (seconds <= 10) return '#EF4444'; // Red
    if (seconds <= 30) return '#FFEA00'; // Orange
    return '#9D12DE'; // Green
  };

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <LinearGradient colors={['#9D12DE', '#7C3AED']} className="px-6 pt-12 pb-6">
        <View className="flex-row items-center justify-between">
          <TouchableOpacity onPress={() => router.back()} className="p-2">
            <Ionicons name="arrow-back" size={28} color="white" />
          </TouchableOpacity>
          <Text className="text-2xl font-bold text-white">CronÃ³metro de Descanso</Text>
          <View className="w-10" />
        </View>
      </LinearGradient>

      <View className="flex-1 p-6 justify-center items-center">
        {/* Timer Display */}
        <Card className="w-full p-8 items-center mb-6">
          {/* Circular Progress */}
          <View className="relative items-center justify-center mb-6">
            {/* Background Circle */}
            <View className="w-64 h-64 rounded-full border-8 border-gray-200" />
            
            {/* Progress Circle (simplified - use SVG for real implementation) */}
            <View
              className="absolute w-64 h-64 rounded-full border-8"
              style={{
                borderColor: getTimerColor(),
                opacity: 0.3,
              }}
            />

            {/* Time Display */}
            <View className="absolute items-center">
              <Text
                className="font-bold"
                style={{
                  fontSize: 72,
                  color: getTimerColor(),
                }}
              >
                {formatTime(seconds)}
              </Text>
              <Text className="text-gray-600 text-lg mt-2">
                {isRunning ? (isPaused ? 'Pausado' : 'Descansando...') : 'Listo'}
              </Text>
            </View>
          </View>

          {/* Progress Bar */}
          <View className="w-full bg-gray-200 h-2 rounded-full overflow-hidden mb-4">
            <View
              className="h-full rounded-full"
              style={{
                width: `${progress}%`,
                backgroundColor: getTimerColor(),
              }}
            />
          </View>

          {/* Main Controls */}
          <View className="flex-row gap-4 mb-4">
            {!isRunning ? (
              <TouchableOpacity
                onPress={startTimer}
                className="bg-primary px-12 py-4 rounded-xl flex-row items-center gap-2"
              >
                <Ionicons name="play" size={24} color="white" />
                <Text className="text-white font-bold text-lg">Iniciar</Text>
              </TouchableOpacity>
            ) : (
              <>
                {isPaused ? (
                  <TouchableOpacity
                    onPress={resumeTimer}
                    className="bg-primary px-8 py-4 rounded-xl flex-row items-center gap-2"
                  >
                    <Ionicons name="play" size={24} color="white" />
                    <Text className="text-white font-bold text-lg">Reanudar</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={pauseTimer}
                    className="bg-amber-500 px-8 py-4 rounded-xl flex-row items-center gap-2"
                  >
                    <Ionicons name="pause" size={24} color="white" />
                    <Text className="text-white font-bold text-lg">Pausar</Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  onPress={stopTimer}
                  className="bg-red-500 px-8 py-4 rounded-xl flex-row items-center gap-2"
                >
                  <Ionicons name="stop" size={24} color="white" />
                  <Text className="text-white font-bold text-lg">Detener</Text>
                </TouchableOpacity>
              </>
            )}
          </View>

          {/* Quick Add Time */}
          {isRunning && (
            <View className="flex-row gap-3">
              <TouchableOpacity
                onPress={() => addTime(15)}
                className="bg-gray-200 px-4 py-2 rounded-lg"
              >
                <Text className="text-gray-700 font-semibold">+15s</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => addTime(30)}
                className="bg-gray-200 px-4 py-2 rounded-lg"
              >
                <Text className="text-gray-700 font-semibold">+30s</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => addTime(60)}
                className="bg-gray-200 px-4 py-2 rounded-lg"
              >
                <Text className="text-gray-700 font-semibold">+1m</Text>
              </TouchableOpacity>
            </View>
          )}
        </Card>

        {/* Preset Times */}
        <Card className="w-full p-4">
          <Text className="text-gray-900 font-bold text-lg mb-3">
            Tiempos Predefinidos
          </Text>
          <View className="flex-row flex-wrap gap-2">
            {presetTimes.map(time => (
              <TouchableOpacity
                key={time}
                onPress={() => setPreset(time)}
                className={`px-6 py-3 rounded-lg ${
                  initialSeconds === time ? 'bg-primary' : 'bg-gray-200'
                }`}
              >
                <Text
                  className={`font-semibold ${
                    initialSeconds === time ? 'text-white' : 'text-gray-700'
                  }`}
                >
                  {time < 60 ? `${time}s` : `${Math.floor(time / 60)}m`}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Card>

        {/* Tips */}
        <Card className="w-full p-4 mt-4 bg-primary/5 border-primary/20">
          <View className="flex-row gap-3">
            <Ionicons name="information-circle" size={24} color="#9D12DE" />
            <View className="flex-1">
              <Text className="text-text font-semibold mb-1">
                RecomendaciÃ³n
              </Text>
              <Text className="text-text/70 text-sm">
                Descansa 1-2 min para hipertrofia, 3-5 min para fuerza
              </Text>
            </View>
          </View>
        </Card>
      </View>
    </View>
  );
}

