import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TrainingCycles() {
  const [selectedCycle, setSelectedCycle] = useState('beginner');

  const cycles = [
    {
      id: 'beginner',
      name: 'Beginner Cycle',
      experience: '0-6 months training',
      goal: 'Build foundation, learn movements',
      duration: '12 weeks',
      color: 'emerald',
      icon: 'leaf' as const,
      weeks: [
        {
          week: '1-3',
          focus: 'Movement Pattern Learning',
          volume: 'Low-Moderate',
          intensity: '50-60% 1RM',
          exercises: '6-8 per workout',
          frequency: '3-4x per week',
          notes: 'Perfect form above all else',
        },
        {
          week: '4-6',
          focus: 'Volume Accumulation',
          volume: 'Moderate',
          intensity: '60-70% 1RM',
          exercises: '6-8 per workout',
          frequency: '3-4x per week',
          notes: 'Increase sets, maintain form',
        },
        {
          week: '7-9',
          focus: 'Progressive Overload',
          volume: 'Moderate-High',
          intensity: '70-75% 1RM',
          exercises: '6-8 per workout',
          frequency: '4x per week',
          notes: 'Add weight when form perfect',
        },
        {
          week: '10-11',
          focus: 'Consolidation',
          volume: 'Moderate',
          intensity: '75-80% 1RM',
          exercises: '6-8 per workout',
          frequency: '4x per week',
          notes: 'Solidify strength gains',
        },
        {
          week: '12',
          focus: 'Deload',
          volume: 'Low',
          intensity: '50-60% 1RM',
          exercises: '4-6 per workout',
          frequency: '3x per week',
          notes: 'Recovery and assessment',
        },
      ],
    },
    {
      id: 'intermediate',
      name: 'Intermediate Cycle',
      experience: '6-24 months training',
      goal: 'Build strength and size',
      duration: '16 weeks',
      color: 'blue',
      icon: 'fitness' as const,
      weeks: [
        {
          week: '1-4',
          focus: 'Hypertrophy Block',
          volume: 'High',
          intensity: '65-75% 1RM',
          exercises: '8-10 per workout',
          frequency: '4-5x per week',
          notes: 'Sets of 8-12, build work capacity',
        },
        {
          week: '5',
          focus: 'Mini Deload',
          volume: 'Low',
          intensity: '60% 1RM',
          volume: 'Low',
          exercises: '6 per workout',
          frequency: '3-4x per week',
          notes: 'Active recovery week',
        },
        {
          week: '6-10',
          focus: 'Strength Block',
          volume: 'Moderate',
          intensity: '80-87% 1RM',
          exercises: '6-8 per workout',
          frequency: '4-5x per week',
          notes: 'Sets of 4-6, increase load',
        },
        {
          week: '11',
          focus: 'Mini Deload',
          volume: 'Low',
          intensity: '60% 1RM',
          exercises: '6 per workout',
          frequency: '3-4x per week',
          notes: 'Prepare for peaking',
        },
        {
          week: '12-15',
          focus: 'Peaking Block',
          volume: 'Low-Moderate',
          intensity: '87-95% 1RM',
          exercises: '5-6 per workout',
          frequency: '4x per week',
          notes: 'Sets of 1-3, peak strength',
        },
        {
          week: '16',
          focus: 'Deload/Test',
          volume: 'Minimal',
          intensity: 'Test 1RMs',
          exercises: 'Main lifts only',
          frequency: '2-3x per week',
          notes: 'Test new maxes, full recovery',
        },
      ],
    },
    {
      id: 'advanced',
      name: 'Advanced Cycle',
      experience: '2+ years consistent training',
      goal: 'Peak performance, competition prep',
      duration: '20 weeks',
      color: 'purple',
      icon: 'trophy' as const,
      weeks: [
        {
          week: '1-6',
          focus: 'Accumulation Phase',
          volume: 'Very High',
          intensity: '65-75% 1RM',
          exercises: '10-12 per workout',
          frequency: '5-6x per week',
          notes: 'Max sustainable volume, build capacity',
        },
        {
          week: '7',
          focus: 'Deload',
          volume: 'Low',
          intensity: '60% 1RM',
          exercises: '6 per workout',
          frequency: '4x per week',
          notes: 'Recovery from accumulation',
        },
        {
          week: '8-13',
          focus: 'Intensification Phase',
          volume: 'Moderate',
          intensity: '80-90% 1RM',
          exercises: '7-9 per workout',
          frequency: '5x per week',
          notes: 'Increase load, decrease volume',
        },
        {
          week: '14',
          focus: 'Deload',
          volume: 'Low',
          intensity: '65% 1RM',
          exercises: '6 per workout',
          frequency: '4x per week',
          notes: 'Prepare for realization',
        },
        {
          week: '15-18',
          focus: 'Realization Phase',
          volume: 'Low',
          intensity: '90-97% 1RM',
          exercises: '5-7 per workout',
          frequency: '4-5x per week',
          notes: 'Express strength gains',
        },
        {
          week: '19',
          focus: 'Taper',
          volume: 'Minimal',
          intensity: '70-85% 1RM',
          exercises: '4-5 per workout',
          frequency: '3-4x per week',
          notes: 'Reduce fatigue, maintain strength',
        },
        {
          week: '20',
          focus: 'Competition/Test',
          volume: 'Minimal',
          intensity: 'Max attempts',
          exercises: 'Competition lifts',
          frequency: '1-2x per week',
          notes: 'Peak performance, new PRs',
        },
      ],
    },
  ];

  const currentCycle = cycles.find((c) => c.id === selectedCycle)!;

  return (
    <View className="flex-1 bg-zinc-950">
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1 ml-3">
            Training Cycles
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          <View className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl p-6 mb-6">
            <Text className="text-white text-2xl font-bold mb-2">Complete Programs</Text>
            <Text className="text-white opacity-90">
              Week-by-week training cycles
            </Text>
          </View>

          <View className="mb-6">
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View className="flex-row gap-3">
                {cycles.map((cycle) => (
                  <TouchableOpacity
                    key={cycle.id}
                    onPress={() => setSelectedCycle(cycle.id)}
                    className={`${
                      selectedCycle === cycle.id
                        ? `bg-${cycle.color}-500`
                        : 'bg-zinc-800'
                    } rounded-xl px-4 py-3 border ${
                      selectedCycle === cycle.id
                        ? `border-${cycle.color}-400`
                        : 'border-zinc-700'
                    }`}
                  >
                    <View className="flex-row items-center">
                      <Ionicons name={cycle.icon} size={20} color="white" />
                      <Text className="text-white font-bold ml-2">{cycle.name}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>

          <View className={`bg-${currentCycle.color}-500/10 rounded-xl p-5 mb-6 border border-${currentCycle.color}-500/30`}>
            <View className="flex-row items-center mb-4">
              <Ionicons name={currentCycle.icon} size={28} color={`#${currentCycle.color === 'emerald' ? '10b981' : currentCycle.color === 'blue' ? '3b82f6' : 'a855f7'}`} />
              <Text className={`text-${currentCycle.color}-400 font-bold text-2xl ml-3`}>
                {currentCycle.name}
              </Text>
            </View>

            <View className="space-y-2">
              <View className="flex-row justify-between">
                <Text className="text-zinc-400">Experience Level:</Text>
                <Text className="text-white font-bold">{currentCycle.experience}</Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-zinc-400">Primary Goal:</Text>
                <Text className="text-white font-bold">{currentCycle.goal}</Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-zinc-400">Total Duration:</Text>
                <Text className={`text-${currentCycle.color}-400 font-bold`}>{currentCycle.duration}</Text>
              </View>
            </View>
          </View>

          <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
            <Text className="text-white font-bold text-lg mb-4">Week-by-Week Breakdown</Text>
            {currentCycle.weeks.map((block, idx) => (
              <View
                key={idx}
                className={`bg-${currentCycle.color}-500/10 rounded-xl p-4 mb-4 last:mb-0 border border-${currentCycle.color}-500/30`}
              >
                <View className="flex-row items-center justify-between mb-3">
                  <Text className={`text-${currentCycle.color}-400 font-bold text-lg`}>
                    Week {block.week}
                  </Text>
                  <View className={`bg-${currentCycle.color}-500/20 rounded-full px-3 py-1 border border-${currentCycle.color}-500/40`}>
                    <Text className={`text-${currentCycle.color}-400 text-xs font-bold`}>
                      {block.focus}
                    </Text>
                  </View>
                </View>

                <View className="bg-zinc-900 rounded-xl p-3 space-y-2">
                  <View className="flex-row justify-between">
                    <Text className="text-zinc-400 text-sm">Volume:</Text>
                    <Text className="text-white font-bold text-sm">{block.volume}</Text>
                  </View>
                  <View className="flex-row justify-between">
                    <Text className="text-zinc-400 text-sm">Intensity:</Text>
                    <Text className={`text-${currentCycle.color}-400 font-bold text-sm`}>{block.intensity}</Text>
                  </View>
                  <View className="flex-row justify-between">
                    <Text className="text-zinc-400 text-sm">Exercises:</Text>
                    <Text className="text-white font-bold text-sm">{block.exercises}</Text>
                  </View>
                  <View className="flex-row justify-between">
                    <Text className="text-zinc-400 text-sm">Frequency:</Text>
                    <Text className="text-white font-bold text-sm">{block.frequency}</Text>
                  </View>
                </View>

                <View className="mt-3 pt-3 border-t border-zinc-800">
                  <Text className="text-zinc-300 text-sm italic">{block.notes}</Text>
                </View>
              </View>
            ))}
          </View>

          <View className="bg-amber-500/10 rounded-xl p-4 border border-amber-500/30 mb-6">
            <Text className="text-amber-400 font-bold mb-2">Success Tips</Text>
            <Text className="text-amber-300 text-sm">
              • Follow the plan as written{'\n'}
              • Don't skip deload weeks{'\n'}
              • Track every workout{'\n'}
              • Adjust if needed, but sparingly{'\n'}
              • Trust the process
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
