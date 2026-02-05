import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function EMOMTimer() {
  const [rounds, setRounds] = useState(10);
  const [workTime, setWorkTime] = useState(40);
  const [currentRound, setCurrentRound] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isRunning, setIsRunning] = useState(false);

  const exercises = [
    '10 Burpees',
    '15 Push-ups',
    '20 Air Squats',
    '10 Pull-ups',
  ];

  const start = () => setIsRunning(true);
  const pause = () => setIsRunning(false);
  const reset = () => {
    setIsRunning(false);
    setCurrentRound(0);
    setTimeLeft(60);
  };

  return (
    <View className="flex-1 bg-zinc-950">
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1 ml-3">
            EMOM Timer
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          <View className="bg-gradient-to-r from-red-500 to-orange-500 rounded-xl p-6 mb-6">
            <Text className="text-white text-2xl font-bold mb-2">Every Minute On the Minute</Text>
            <Text className="text-white opacity-90">
              Completa el trabajo cada minuto
            </Text>
          </View>

          <View className="bg-zinc-900 rounded-xl p-8 mb-6 items-center border border-zinc-800">
            <Text className="text-zinc-400 text-sm mb-2">Round</Text>
            <Text className="text-white text-6xl font-bold mb-6">
              {currentRound}/{rounds}
            </Text>

            <View className="w-48 h-48 bg-primary rounded-full items-center justify-center mb-6">
              <Text className="text-white text-7xl font-bold">{timeLeft}</Text>
            </View>

            <Text className="text-zinc-400 text-lg mb-2">Próximo ejercicio:</Text>
            <Text className="text-white text-2xl font-bold text-center">
              {exercises[currentRound % exercises.length]}
            </Text>
          </View>

          <View className="flex-row gap-3 mb-6">
            <TouchableOpacity
              onPress={isRunning ? pause : start}
              className="flex-1 bg-primary rounded-xl p-4 flex-row items-center justify-center"
            >
              <Ionicons name={isRunning ? 'pause' : 'play'} size={24} color="white" />
              <Text className="text-white font-bold ml-2">
                {isRunning ? 'Pause' : 'Start'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={reset}
              className="flex-1 bg-zinc-800 rounded-xl p-4 flex-row items-center justify-center"
            >
              <Ionicons name="refresh" size={24} color="white" />
              <Text className="text-white font-bold ml-2">Reset</Text>
            </TouchableOpacity>
          </View>

          <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-6">
            <Text className="text-primary/80 font-bold mb-2">Cómo Funciona EMOM</Text>
            <Text className="text-primary/60 text-sm">
              • Cada minuto haz el ejercicio asignado{'\n'}
              • Lo que sobre del minuto = descanso{'\n'}
              • Trabaja rápido para más rest{'\n'}
              • Mejora velocidad y resistencia
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

