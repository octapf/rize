import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function PerformanceBenchmarks() {
  const [selectedCategory, setSelectedCategory] = useState('cardio');

  const categories = [
    { id: 'cardio', name: 'Cardio', icon: 'heart' as const, color: 'red' },
    { id: 'strength', name: 'Strength', icon: 'barbell' as const, color: 'blue' },
    { id: 'power', name: 'Power', icon: 'flash' as const, color: 'amber' },
    { id: 'endurance', name: 'Endurance', icon: 'time' as const, color: 'emerald' },
  ];

  const benchmarks = {
    cardio: [
      {
        name: 'VO2 Max',
        description: 'Cardiovascular fitness',
        tests: [
          { method: '1.5 Mile Run', target: 'Sub 12 min (male), Sub 14 min (female)', difficulty: 'medium' },
          { method: 'Cooper Test', target: '2800m in 12min (male), 2300m (female)', difficulty: 'hard' },
          { method: 'Beep Test', target: 'Level 12+ (male), Level 10+ (female)', difficulty: 'hard' },
        ],
      },
      {
        name: 'Resting Heart Rate',
        description: 'Recovery indicator',
        tests: [
          { method: 'Morning RHR', target: 'Under 60 bpm (very good)', difficulty: 'easy' },
          { method: 'Recovery Rate', target: 'Drop 30+ bpm in 1 min post-exercise', difficulty: 'medium' },
        ],
      },
    ],
    strength: [
      {
        name: 'Relative Strength',
        description: 'Strength per bodyweight',
        tests: [
          { method: 'Pull-ups', target: '15+ reps (male), 5+ (female)', difficulty: 'medium' },
          { method: 'Push-ups', target: '40+ reps (male), 20+ (female)', difficulty: 'easy' },
          { method: 'Bodyweight Squat', target: '50+ reps continuous', difficulty: 'easy' },
        ],
      },
      {
        name: 'Absolute Strength',
        description: 'Max weight lifted',
        tests: [
          { method: 'Squat 1RM', target: '2x bodyweight (intermediate)', difficulty: 'hard' },
          { method: 'Deadlift 1RM', target: '2.5x bodyweight (intermediate)', difficulty: 'hard' },
          { method: 'Bench 1RM', target: '1.5x bodyweight (intermediate)', difficulty: 'hard' },
        ],
      },
    ],
    power: [
      {
        name: 'Explosive Power',
        description: 'Speed and force',
        tests: [
          { method: 'Vertical Jump', target: '24+ inches (male), 18+ (female)', difficulty: 'medium' },
          { method: 'Broad Jump', target: '8+ feet (male), 6+ (female)', difficulty: 'medium' },
          { method: 'Medicine Ball Throw', target: '15+ feet (20lb ball)', difficulty: 'medium' },
        ],
      },
      {
        name: 'Speed',
        description: 'Sprint capability',
        tests: [
          { method: '40-Yard Dash', target: 'Sub 5.5s (male), Sub 6.5s (female)', difficulty: 'hard' },
          { method: '100m Sprint', target: 'Sub 14s (male), Sub 16s (female)', difficulty: 'hard' },
        ],
      },
    ],
    endurance: [
      {
        name: 'Muscular Endurance',
        description: 'Sustained effort',
        tests: [
          { method: 'Plank Hold', target: '3+ minutes', difficulty: 'medium' },
          { method: 'Wall Sit', target: '2+ minutes', difficulty: 'medium' },
          { method: 'Dead Hang', target: '90+ seconds', difficulty: 'hard' },
        ],
      },
      {
        name: 'Work Capacity',
        description: 'Total volume tolerance',
        tests: [
          { method: 'Burpees (5 min)', target: '60+ reps', difficulty: 'hard' },
          { method: 'Rowing (2000m)', target: 'Sub 8 min (male), Sub 9 min (female)', difficulty: 'hard' },
        ],
      },
    ],
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'emerald';
      case 'medium': return 'blue';
      case 'hard': return 'red';
      default: return 'zinc';
    }
  };

  const currentBenchmarks = benchmarks[selectedCategory as keyof typeof benchmarks];

  return (
    <View className="flex-1 bg-zinc-950">
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1 ml-3">
            Performance Benchmarks
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          <View className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl p-6 mb-6">
            <Text className="text-white text-2xl font-bold mb-2">Test Your Fitness</Text>
            <Text className="text-white opacity-90">
              Measure performance across domains
            </Text>
          </View>

          <View className="mb-6">
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View className="flex-row gap-3">
                {categories.map((cat) => (
                  <TouchableOpacity
                    key={cat.id}
                    onPress={() => setSelectedCategory(cat.id)}
                    className={`${
                      selectedCategory === cat.id
                        ? `bg-${cat.color}-500`
                        : 'bg-zinc-800'
                    } rounded-xl px-4 py-3 border ${
                      selectedCategory === cat.id
                        ? `border-${cat.color}-400`
                        : 'border-zinc-700'
                    }`}
                  >
                    <View className="flex-row items-center">
                      <Ionicons name={cat.icon} size={20} color="white" />
                      <Text className="text-white font-bold ml-2">{cat.name}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>

          {currentBenchmarks.map((benchmark, idx) => (
            <View
              key={idx}
              className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800"
            >
              <Text className="text-white font-bold text-xl mb-1">{benchmark.name}</Text>
              <Text className="text-zinc-400 mb-4">{benchmark.description}</Text>

              {benchmark.tests.map((test, testIdx) => {
                const diffColor = getDifficultyColor(test.difficulty);
                return (
                  <View
                    key={testIdx}
                    className="bg-zinc-800 rounded-xl p-4 mb-3 last:mb-0 border border-zinc-700"
                  >
                    <View className="flex-row justify-between items-start mb-2">
                      <Text className="text-white font-bold text-lg flex-1">
                        {test.method}
                      </Text>
                      <View className={`bg-${diffColor}-500/20 rounded-full px-3 py-1 border border-${diffColor}-500/40`}>
                        <Text className={`text-${diffColor}-400 text-xs font-bold capitalize`}>
                          {test.difficulty}
                        </Text>
                      </View>
                    </View>
                    <View className="flex-row items-center">
                      <Ionicons name="trophy" size={16} color="#9D12DE" />
                      <Text className="text-primary/80 ml-2">{test.target}</Text>
                    </View>
                  </View>
                );
              })}
            </View>
          ))}

          <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-6">
            <Text className="text-primary font-bold mb-2">Testing Tips</Text>
            <Text className="text-primary/80 text-sm">
              â€¢ Warm up properly before tests{'\n'}
              â€¢ Test when fresh (early week){'\n'}
              â€¢ Retest every 8-12 weeks{'\n'}
              â€¢ Track progress over time{'\n'}
              â€¢ Don't test all at once
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}


