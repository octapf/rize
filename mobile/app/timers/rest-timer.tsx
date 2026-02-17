import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function RestTimer() {
  const [restTime, setRestTime] = useState(90);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const presets = [
    { label: '60s', value: 60, color: 'primary' },
    { label: '90s', value: 90, color: 'blue' },
    { label: '2min', value: 120, color: 'purple' },
    { label: '3min', value: 180, color: 'amber' },
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const startTimer = (seconds?: number) => {
    const time = seconds || restTime;
    setTimeLeft(time);
    setIsRunning(true);
  };

  const stopTimer = () => {
    setIsRunning(false);
    setTimeLeft(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const percentage = timeLeft > 0 ? (timeLeft / restTime) * 100 : 0;

  return (
    <View className="flex-1 bg-zinc-950">
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1 ml-3">
            Rest Timer
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          <View className="bg-gradient-to-r from-primary to-[#7D0EBE] rounded-xl p-6 mb-6">
            <Text className="text-white text-2xl font-bold mb-2">Rest Periods</Text>
            <Text className="text-white opacity-90">
              Control recovery between sets
            </Text>
          </View>

          <View className="bg-zinc-900 rounded-xl p-8 mb-6 border border-zinc-800 items-center">
            <View className="w-64 h-64 items-center justify-center mb-6">
              <View className="absolute w-64 h-64 rounded-full border-8 border-zinc-800" />
              <View
                className={`absolute w-64 h-64 rounded-full border-8 ${
                  isRunning ? 'border-primary' : 'border-zinc-700'
                }`}
                style={{
                  transform: [{ rotate: `${(percentage / 100) * 360}deg` }],
                }}
              />
              <Text className="text-white font-bold text-6xl">
                {isRunning ? formatTime(timeLeft) : formatTime(restTime)}
              </Text>
            </View>

            {!isRunning ? (
              <TouchableOpacity
                onPress={() => startTimer()}
                className="bg-primary rounded-xl px-8 py-4 border border-primary"
              >
                <View className="flex-row items-center">
                  <Ionicons name="play" size={28} color="white" />
                  <Text className="text-white font-bold text-xl ml-2">Start Rest</Text>
                </View>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={stopTimer}
                className="bg-red-500 rounded-xl px-8 py-4 border border-red-400"
              >
                <View className="flex-row items-center">
                  <Ionicons name="stop" size={28} color="white" />
                  <Text className="text-white font-bold text-xl ml-2">Stop</Text>
                </View>
              </TouchableOpacity>
            )}
          </View>

          <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
            <Text className="text-white font-bold text-lg mb-4">Quick Start</Text>
            <View className="flex-row gap-3">
              {presets.map((preset) => (
                <TouchableOpacity
                  key={preset.value}
                  onPress={() => startTimer(preset.value)}
                  className={`flex-1 bg-${preset.color}-500 rounded-xl py-4 border border-${preset.color}-400`}
                >
                  <Text className="text-white font-bold text-center text-lg">
                    {preset.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
            <Text className="text-white font-bold text-lg mb-4">Custom Rest Time</Text>
            <TextInput
              className="bg-zinc-800 text-white rounded-xl px-4 py-3 border border-zinc-700 text-center text-2xl"
              value={restTime.toString()}
              onChangeText={(val) => setRestTime(parseInt(val) || 90)}
              keyboardType="numeric"
              placeholder="90"
              placeholderTextColor="#71717a"
            />
            <Text className="text-zinc-400 text-center text-sm mt-2">seconds</Text>
          </View>

          <View className="bg-primary/10 rounded-xl p-4 mb-6 border border-primary/30">
            <Text className="text-primary/80 font-bold mb-3">Rest Guidelines</Text>
            <View className="space-y-2">
              <View className="flex-row justify-between py-2 border-b border-primary/20">
                <Text className="text-primary/60">Strength (1-5 reps)</Text>
                <Text className="text-primary/80 font-bold">3-5 min</Text>
              </View>
              <View className="flex-row justify-between py-2 border-b border-primary/20">
                <Text className="text-primary/60">Hypertrophy (6-12 reps)</Text>
                <Text className="text-primary/80 font-bold">60-90s</Text>
              </View>
              <View className="flex-row justify-between py-2 border-b border-primary/20">
                <Text className="text-primary/60">Endurance (12+ reps)</Text>
                <Text className="text-primary/80 font-bold">30-60s</Text>
              </View>
              <View className="flex-row justify-between py-2">
                <Text className="text-primary/60">Isolation exercises</Text>
                <Text className="text-primary/80 font-bold">45-60s</Text>
              </View>
            </View>
          </View>

          <View className="bg-amber-500/10 rounded-xl p-4 border border-amber-500/30 mb-6">
            <Text className="text-amber-400 font-bold mb-2">Rest Tips</Text>
            <Text className="text-amber-300 text-sm">
              • Rest enough to recover{'\n'}
              • Not so long that you cool down{'\n'}
              • Compounds need more rest{'\n'}
              • Stay active during rest{'\n'}
              • Consistency matters
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

