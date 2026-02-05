import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabataTimer() {
  const [rounds, setRounds] = useState(8);
  const [workTime] = useState(20);
  const [restTime] = useState(10);
  const [currentRound, setCurrentRound] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  const [isWorking, setIsWorking] = useState(true);
  const [isRunning, setIsRunning] = useState(false);

  const presets = [
    { name: 'Classic Tabata', work: 20, rest: 10, rounds: 8 },
    { name: 'Extended', work: 30, rest: 15, rounds: 8 },
    { name: 'Brutal', work: 40, rest: 20, rounds: 10 },
  ];

  const start = () => setIsRunning(true);
  const pause = () => setIsRunning(false);
  const reset = () => {
    setIsRunning(false);
    setCurrentRound(0);
    setTimeLeft(20);
    setIsWorking(true);
  };

  return (
    <View className="flex-1 bg-zinc-950">
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1 ml-3">
            Tabata Timer
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          <View className="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl p-6 mb-6">
            <Text className="text-white text-2xl font-bold mb-2">High Intensity Intervals</Text>
            <Text className="text-white opacity-90">
              20s trabajo / 10s descanso
            </Text>
          </View>

          <View className={`rounded-xl p-8 mb-6 items-center border-2 ${
            isWorking ? 'bg-red-500 border-red-600' : 'bg-primary border-emerald-600'
          }`}>
            <Text className="text-white text-xl mb-2">Round {currentRound + 1}/{rounds}</Text>
            <Text className="text-white text-8xl font-bold mb-4">{timeLeft}</Text>
            <Text className="text-white text-2xl font-bold">
              {isWorking ? 'WORK!' : 'REST'}
            </Text>
          </View>

          <Text className="text-white font-bold text-lg mb-4">Presets</Text>

          {presets.map((preset, idx) => (
            <TouchableOpacity
              key={idx}
              className="bg-zinc-900 rounded-xl p-4 mb-3 border border-zinc-800"
            >
              <Text className="text-white font-bold text-lg mb-2">{preset.name}</Text>
              <Text className="text-zinc-400 text-sm">
                {preset.work}s work • {preset.rest}s rest • {preset.rounds} rounds
              </Text>
            </TouchableOpacity>
          ))}

          <View className="flex-row gap-3 mb-6 mt-4">
            <TouchableOpacity
              onPress={isRunning ? pause : start}
              className="flex-1 bg-red-500 rounded-xl p-4 flex-row items-center justify-center"
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
        </View>
      </ScrollView>
    </View>
  );
}

