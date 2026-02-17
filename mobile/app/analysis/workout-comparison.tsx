import React, { useState } from 'react';
import { Text } from '@/components/ui/Text';
import { View, TouchableOpacity, ScrollView } from 'react-native';;
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function WorkoutComparison() {
  const [workout1, setWorkout1] = useState('today');
  const [workout2, setWorkout2] = useState('lastWeek');

  const workouts = [
    { key: 'today', label: 'Today', date: '28 Ene 2026' },
    { key: 'lastWeek', label: 'Last Week', date: '21 Ene 2026' },
    { key: 'twoWeeks', label: '2 Weeks Ago', date: '14 Ene 2026' },
    { key: 'lastMonth', label: 'Last Month', date: '28 Dic 2025' },
  ];

  const comparisonData = {
    today_lastWeek: {
      workout1: {
        name: 'Push Day - Today',
        date: '28 Ene 2026',
        duration: 75,
        totalVolume: 15420,
        exercises: [
          { name: 'Bench Press', weight: 120, sets: 3, reps: 8, volume: 2880 },
          { name: 'Incline DB', weight: 40, sets: 3, reps: 10, volume: 1200 },
          { name: 'Cable Flyes', weight: 25, sets: 3, reps: 12, volume: 900 },
          { name: 'OHP', weight: 65, sets: 3, reps: 8, volume: 1560 },
          { name: 'Lateral Raises', weight: 15, sets: 3, reps: 12, volume: 540 },
          { name: 'Tricep Dips', weight: 0, sets: 3, reps: 10, volume: 30 },
        ],
      },
      workout2: {
        name: 'Push Day - Last Week',
        date: '21 Ene 2026',
        duration: 78,
        totalVolume: 14650,
        exercises: [
          { name: 'Bench Press', weight: 117.5, sets: 3, reps: 8, volume: 2820 },
          { name: 'Incline DB', weight: 40, sets: 3, reps: 9, volume: 1080 },
          { name: 'Cable Flyes', weight: 25, sets: 3, reps: 12, volume: 900 },
          { name: 'OHP', weight: 62.5, sets: 3, reps: 8, volume: 1500 },
          { name: 'Lateral Raises', weight: 15, sets: 3, reps: 10, volume: 450 },
          { name: 'Tricep Dips', weight: 0, sets: 3, reps: 10, volume: 30 },
        ],
      },
    },
  };

  const comparison = comparisonData.today_lastWeek;
  const volumeDiff = comparison.workout1.totalVolume - comparison.workout2.totalVolume;
  const volumePercent = ((volumeDiff / comparison.workout2.totalVolume) * 100).toFixed(1);
  const durationDiff = comparison.workout1.duration - comparison.workout2.duration;

  return (
    <View className="flex-1 bg-zinc-950">
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1 ml-3">
            Workout Comparison
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          <View className="bg-gradient-to-r from-primary to-[#7D0EBE] rounded-xl p-6 mb-6">
            <Text className="text-white text-2xl font-bold mb-2">Compare Workouts</Text>
            <Text className="text-white opacity-90 mb-4">
              Track improvements over time
            </Text>
            <View className="flex-row items-center">
              <Ionicons name="analytics" size={20} color="white" />
              <Text className="text-white ml-2">{volumePercent > 0 ? '+' : ''}{volumePercent}% volume change</Text>
            </View>
          </View>

          <View className="flex-row gap-3 mb-6">
            <View className="flex-1">
              <Text className="text-zinc-400 font-bold mb-2">Workout 1</Text>
              <ScrollView showsVerticalScrollIndicator={false}>
                {workouts.map((w) => (
                  <TouchableOpacity
                    key={w.key}
                    onPress={() => setWorkout1(w.key)}
                    className={`${
                      workout1 === w.key ? 'bg-primary' : 'bg-zinc-900'
                    } rounded-xl p-3 mb-2 border ${
                      workout1 === w.key ? 'border-blue-400' : 'border-zinc-800'
                    }`}
                  >
                    <Text className={`${workout1 === w.key ? 'text-white' : 'text-zinc-400'} font-bold`}>
                      {w.label}
                    </Text>
                    <Text className={`${workout1 === w.key ? 'text-highlight' : 'text-zinc-500'} text-xs`}>
                      {w.date}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            <View className="flex-1">
              <Text className="text-zinc-400 font-bold mb-2">Workout 2</Text>
              <ScrollView showsVerticalScrollIndicator={false}>
                {workouts.map((w) => (
                  <TouchableOpacity
                    key={w.key}
                    onPress={() => setWorkout2(w.key)}
                    className={`${
                      workout2 === w.key ? 'bg-primary' : 'bg-zinc-900'
                    } rounded-xl p-3 mb-2 border ${
                      workout2 === w.key ? 'border-primary' : 'border-zinc-800'
                    }`}
                  >
                    <Text className={`${workout2 === w.key ? 'text-white' : 'text-zinc-400'} font-bold`}>
                      {w.label}
                    </Text>
                    <Text className={`${workout2 === w.key ? 'text-primary/50' : 'text-zinc-500'} text-xs`}>
                      {w.date}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>

          <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
            <Text className="text-white font-bold text-lg mb-4">Overall Comparison</Text>

            <View className="flex-row gap-3 mb-4">
              <View className="flex-1 bg-primary/10 rounded-lg p-3 border border-primary/30">
                <Text className="text-primary/80 text-xs mb-1">{comparison.workout1.name}</Text>
                <Text className="text-white font-bold text-2xl">
                  {comparison.workout1.totalVolume.toLocaleString()}
                </Text>
                <Text className="text-zinc-400 text-xs">Total Volume (kg)</Text>
              </View>
              <View className="flex-1 bg-primary/10 rounded-lg p-3 border border-primary/30">
                <Text className="text-primary text-xs mb-1">{comparison.workout2.name}</Text>
                <Text className="text-white font-bold text-2xl">
                  {comparison.workout2.totalVolume.toLocaleString()}
                </Text>
                <Text className="text-zinc-400 text-xs">Total Volume (kg)</Text>
              </View>
            </View>

            <View className={`${volumeDiff >= 0 ? 'bg-primary/10 border-primary/30' : 'bg-red-500/10 border-red-500/30'} rounded-lg p-3 mb-3 border`}>
              <View className="flex-row items-center justify-between">
                <Text className={`${volumeDiff >= 0 ? 'text-primary' : 'text-red-400'} font-bold`}>
                  Volume Difference
                </Text>
                <View className="flex-row items-center">
                  <Ionicons
                    name={volumeDiff >= 0 ? 'trending-up' : 'trending-down'}
                    size={20}
                    color={volumeDiff >= 0 ? '#9D12DE' : '#ef4444'}
                  />
                  <Text className={`${volumeDiff >= 0 ? 'text-primary' : 'text-red-400'} font-bold text-lg ml-2`}>
                    {volumeDiff >= 0 ? '+' : ''}{volumeDiff}kg ({volumeDiff >= 0 ? '+' : ''}{volumePercent}%)
                  </Text>
                </View>
              </View>
            </View>

            <View className="flex-row gap-3">
              <View className="flex-1 bg-zinc-800 rounded-lg p-3">
                <Text className="text-zinc-400 text-xs mb-1">Duration</Text>
                <Text className="text-white font-bold">{comparison.workout1.duration} min</Text>
              </View>
              <View className="flex-1 bg-zinc-800 rounded-lg p-3">
                <Text className="text-zinc-400 text-xs mb-1">Duration</Text>
                <Text className="text-white font-bold">{comparison.workout2.duration} min</Text>
              </View>
            </View>
          </View>

          <Text className="text-white font-bold text-lg mb-4">Exercise by Exercise</Text>

          {comparison.workout1.exercises.map((ex1, idx) => {
            const ex2 = comparison.workout2.exercises[idx];
            const weightDiff = ex1.weight - ex2.weight;
            const volumeDiff = ex1.volume - ex2.volume;

            return (
              <View key={idx} className="bg-zinc-900 rounded-xl p-4 mb-3 border border-zinc-800">
                <Text className="text-white font-bold mb-3">{ex1.name}</Text>

                <View className="flex-row gap-3 mb-2">
                  <View className="flex-1 bg-primary/10 rounded-lg p-2 border border-primary/30">
                    <Text className="text-primary/80 text-xs">Today</Text>
                    <Text className="text-white font-bold">
                      {ex1.sets}x{ex1.reps} @ {ex1.weight > 0 ? `${ex1.weight}kg` : 'BW'}
                    </Text>
                  </View>
                  <View className="flex-1 bg-primary/10 rounded-lg p-2 border border-primary/30">
                    <Text className="text-primary text-xs">Last Week</Text>
                    <Text className="text-white font-bold">
                      {ex2.sets}x{ex2.reps} @ {ex2.weight > 0 ? `${ex2.weight}kg` : 'BW'}
                    </Text>
                  </View>
                </View>

                <View className="flex-row items-center justify-between pt-2 border-t border-zinc-800">
                  <Text className="text-zinc-400 text-sm">Changes:</Text>
                  <View className="flex-row items-center">
                    {weightDiff > 0 && (
                      <View className="bg-primary/20 rounded px-2 py-1 mr-2">
                        <Text className="text-primary text-xs font-bold">+{weightDiff}kg</Text>
                      </View>
                    )}
                    {volumeDiff > 0 && (
                      <View className="bg-primary/20 rounded px-2 py-1">
                        <Text className="text-primary/80 text-xs font-bold">+{volumeDiff}kg vol</Text>
                      </View>
                    )}
                    {weightDiff === 0 && volumeDiff === 0 && (
                      <Text className="text-zinc-500 text-xs">No change</Text>
                    )}
                  </View>
                </View>
              </View>
            );
          })}

          <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-6">
            <Text className="text-primary/80 font-bold mb-2">Comparison Insights</Text>
            <Text className="text-primary/60 text-sm">
              • Green = improvement{'\n'}
              • Compare same workout types{'\n'}
              • Look for consistent progress{'\n'}
              • Stagnant? Time para deload{'\n'}
              • Track trends, not individual sessions
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}


