import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function WorkoutTimer() {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [sets, setSets] = useState<{ exercise: string; duration: number }[]>([]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (hrs > 0) {
      return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
    setSets([]);
  };

  const logSet = (exercise: string) => {
    setSets([...sets, { exercise, duration: time }]);
  };

  return (
    <View className="flex-1 bg-zinc-950">
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1 ml-3">
            Workout Timer
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          <View className="bg-gradient-to-r from-primary to-[#7D0EBE] rounded-xl p-6 mb-6">
            <Text className="text-white text-2xl font-bold mb-2">Track Your Session</Text>
            <Text className="text-white opacity-90">
              Monitor workout duration
            </Text>
          </View>

          <View className="bg-zinc-900 rounded-xl p-8 mb-6 border border-zinc-800">
            <Text className="text-center text-zinc-400 text-sm mb-2">Session Duration</Text>
            <Text className="text-center text-white font-bold text-7xl mb-6">
              {formatTime(time)}
            </Text>

            <View className="flex-row gap-3">
              {!isRunning ? (
                <TouchableOpacity
                  onPress={handleStart}
                  className="flex-1 bg-primary rounded-xl py-4 border border-primary"
                >
                  <View className="flex-row items-center justify-center">
                    <Ionicons name="play" size={24} color="white" />
                    <Text className="text-white font-bold text-lg ml-2">Start</Text>
                  </View>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={handlePause}
                  className="flex-1 bg-amber-500 rounded-xl py-4 border border-amber-400"
                >
                  <View className="flex-row items-center justify-center">
                    <Ionicons name="pause" size={24} color="white" />
                    <Text className="text-white font-bold text-lg ml-2">Pause</Text>
                  </View>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                onPress={handleReset}
                className="flex-1 bg-red-500 rounded-xl py-4 border border-red-400"
              >
                <View className="flex-row items-center justify-center">
                  <Ionicons name="refresh" size={24} color="white" />
                  <Text className="text-white font-bold text-lg ml-2">Reset</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
            <Text className="text-white font-bold text-lg mb-4">Quick Log</Text>
            <View className="flex-row flex-wrap gap-2">
              {['Bench', 'Squat', 'Deadlift', 'OHP', 'Rows', 'Pullups'].map((ex) => (
                <TouchableOpacity
                  key={ex}
                  onPress={() => logSet(ex)}
                  className="bg-primary/20 rounded-lg px-4 py-2 border border-primary/40"
                >
                  <Text className="text-primary/80 font-bold">{ex}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {sets.length > 0 && (
            <View className="bg-zinc-900 rounded-xl p-5 border border-zinc-800 mb-6">
              <Text className="text-white font-bold text-lg mb-4">
                Sets Logged ({sets.length})
              </Text>
              {sets.slice(-10).reverse().map((set, idx) => (
                <View
                  key={idx}
                  className="flex-row justify-between items-center py-2 border-b border-zinc-800 last:border-0"
                >
                  <Text className="text-white font-bold">{set.exercise}</Text>
                  <Text className="text-zinc-400">{formatTime(set.duration)}</Text>
                </View>
              ))}
            </View>
          )}

          <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-6">
            <Text className="text-primary/80 font-bold mb-2">Timer Tips</Text>
            <Text className="text-primary/60 text-sm">
              â€¢ Keep workouts 45-75 min{'\n'}
              â€¢ Log sets for tracking{'\n'}
              â€¢ Shorter = often better{'\n'}
              â€¢ Quality &gt; quantity
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

