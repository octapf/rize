import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function SplitOptimizer() {
  const [workoutsPerWeek, setWorkoutsPerWeek] = useState<number>(4);
  const [experienceLevel, setExperienceLevel] = useState<string>('intermediate');
  const [primaryGoal, setPrimaryGoal] = useState<string>('muscle');

  const frequencies = [3, 4, 5, 6];
  const levels = [
    { key: 'beginner', label: 'Beginner', color: 'emerald' },
    { key: 'intermediate', label: 'Intermediate', color: 'blue' },
    { key: 'advanced', label: 'Advanced', color: 'purple' },
  ];
  const goals = [
    { key: 'strength', label: 'Strength', icon: 'barbell' },
    { key: 'muscle', label: 'Muscle Growth', icon: 'fitness' },
    { key: 'endurance', label: 'Endurance', icon: 'time' },
  ];

  const splits = {
    3: [
      {
        name: 'Full Body (3x)',
        structure: ['Full Body A', 'Full Body B', 'Full Body C'],
        bestFor: 'Beginners, busy schedules',
        frequency: { chest: 3, back: 3, legs: 3, shoulders: 3, arms: 3 },
        pros: ['High frequency per muscle', 'Miss a day? No big deal', 'Time efficient'],
        cons: ['Long sessions', 'Hard to add volume', 'Limited exercise variety'],
        rating: experienceLevel === 'beginner' ? 95 : 70,
      },
      {
        name: 'Upper/Lower/Full',
        structure: ['Upper', 'Lower', 'Full Body'],
        bestFor: 'Intermediate lifters',
        frequency: { chest: 2, back: 2, legs: 2, shoulders: 2, arms: 2 },
        pros: ['Good frequency', 'Flexible', 'Balanced'],
        cons: ['Unconventional', 'Planning needed'],
        rating: experienceLevel === 'intermediate' ? 85 : 65,
      },
    ],
    4: [
      {
        name: 'Upper/Lower Split',
        structure: ['Upper', 'Lower', 'Upper', 'Lower'],
        bestFor: 'All levels, balanced approach',
        frequency: { chest: 2, back: 2, legs: 2, shoulders: 2, arms: 2 },
        pros: ['2x frequency all muscles', 'Simple to follow', 'Great recovery', 'Proven effective'],
        cons: ['Long upper sessions', 'Legs only 2x'],
        rating: 90,
      },
      {
        name: 'Push/Pull/Legs/Upper',
        structure: ['Push', 'Pull', 'Legs', 'Upper'],
        bestFor: 'Intermediate+, variety seekers',
        frequency: { chest: 2, back: 2, legs: 1, shoulders: 2, arms: 2 },
        pros: ['High upper frequency', 'Variety', 'Synergistic muscle groups'],
        cons: ['Legs only 1x', 'Complex planning'],
        rating: experienceLevel !== 'beginner' ? 85 : 70,
      },
    ],
    5: [
      {
        name: 'Push/Pull/Legs/Upper/Lower',
        structure: ['Push', 'Pull', 'Legs', 'Upper', 'Lower'],
        bestFor: 'Intermediate/Advanced hypertrophy',
        frequency: { chest: 2, back: 2, legs: 2, shoulders: 2, arms: 2 },
        pros: ['High volume capacity', '2x frequency everything', 'Excellent for muscle growth'],
        cons: ['Requires commitment', 'Hard to sustain long-term'],
        rating: primaryGoal === 'muscle' && experienceLevel !== 'beginner' ? 95 : 80,
      },
      {
        name: 'Bro Split + 2 Compounds',
        structure: ['Chest', 'Back', 'Legs', 'Shoulders', 'Arms'],
        bestFor: 'Advanced, bodybuilding focus',
        frequency: { chest: 1, back: 1, legs: 1, shoulders: 1, arms: 1 },
        pros: ['Maximum exercise variety', 'Laser focus per session', 'Great for weak points'],
        cons: ['Low frequency (not optimal)', 'Miss a day = miss muscle group'],
        rating: experienceLevel === 'advanced' && primaryGoal === 'muscle' ? 75 : 60,
      },
    ],
    6: [
      {
        name: 'Push/Pull/Legs (2x)',
        structure: ['Push', 'Pull', 'Legs', 'Push', 'Pull', 'Legs'],
        bestFor: 'Advanced lifters, PPL lovers',
        frequency: { chest: 2, back: 2, legs: 2, shoulders: 2, arms: 2 },
        pros: ['Optimal 2x frequency', 'Synergistic muscle pairing', 'High volume', 'Proven for hypertrophy'],
        cons: ['Requires 6 days commitment', 'Fatigue management crucial'],
        rating: experienceLevel === 'advanced' && primaryGoal === 'muscle' ? 95 : 85,
      },
      {
        name: 'Arnold Split',
        structure: ['Chest/Back', 'Shoulders/Arms', 'Legs', 'Chest/Back', 'Shoulders/Arms', 'Legs'],
        bestFor: 'Advanced, Golden Era fans',
        frequency: { chest: 2, back: 2, legs: 2, shoulders: 2, arms: 2 },
        pros: ['2x frequency', 'Antagonist supersets', 'Time efficient', 'Historic track record'],
        cons: ['Long sessions', 'Taxing on CNS', 'Advanced only'],
        rating: experienceLevel === 'advanced' ? 90 : 70,
      },
    ],
  };

  const currentSplits = splits[workoutsPerWeek as keyof typeof splits];
  const topSplit = currentSplits.sort((a, b) => b.rating - a.rating)[0];

  return (
    <View className="flex-1 bg-zinc-950">
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1 ml-3">
            Split Optimizer
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          <View className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-6 mb-6">
            <Text className="text-white text-2xl font-bold mb-2">Find Your Split</Text>
            <Text className="text-white opacity-90 mb-4">
              Optimize training frequency & recovery
            </Text>
            <View className="flex-row items-center">
              <Ionicons name="calendar" size={20} color="white" />
              <Text className="text-white ml-2">Science-based recommendations</Text>
            </View>
          </View>

          <Text className="text-white font-bold mb-3">Workouts Per Week</Text>
          <View className="flex-row gap-3 mb-6">
            {frequencies.map((freq) => (
              <TouchableOpacity
                key={freq}
                onPress={() => setWorkoutsPerWeek(freq)}
                className={`flex-1 ${
                  workoutsPerWeek === freq ? 'bg-primary' : 'bg-zinc-900'
                } rounded-xl py-4 border ${
                  workoutsPerWeek === freq ? 'border-blue-400' : 'border-zinc-800'
                }`}
              >
                <Text
                  className={`${
                    workoutsPerWeek === freq ? 'text-white' : 'text-zinc-400'
                  } font-bold text-center text-lg`}
                >
                  {freq}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text className="text-white font-bold mb-3">Experience Level</Text>
          <View className="flex-row gap-3 mb-6">
            {levels.map((level) => (
              <TouchableOpacity
                key={level.key}
                onPress={() => setExperienceLevel(level.key)}
                className={`flex-1 ${
                  experienceLevel === level.key ? `bg-${level.color}-500` : 'bg-zinc-900'
                } rounded-xl py-3 border ${
                  experienceLevel === level.key ? `border-${level.color}-400` : 'border-zinc-800'
                }`}
              >
                <Text
                  className={`${
                    experienceLevel === level.key ? 'text-white' : 'text-zinc-400'
                  } font-bold text-center`}
                >
                  {level.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text className="text-white font-bold mb-3">Primary Goal</Text>
          <View className="flex-row gap-3 mb-6">
            {goals.map((goal) => (
              <TouchableOpacity
                key={goal.key}
                onPress={() => setPrimaryGoal(goal.key)}
                className={`flex-1 ${
                  primaryGoal === goal.key ? 'bg-primary' : 'bg-zinc-900'
                } rounded-xl p-3 border ${
                  primaryGoal === goal.key ? 'border-primary' : 'border-zinc-800'
                }`}
              >
                <Ionicons
                  name={goal.icon as any}
                  size={24}
                  color={primaryGoal === goal.key ? 'white' : '#71717a'}
                />
                <Text
                  className={`${
                    primaryGoal === goal.key ? 'text-white' : 'text-zinc-400'
                  } font-bold mt-1 text-sm`}
                >
                  {goal.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View className="bg-primary/10 rounded-xl p-5 mb-6 border-2 border-primary">
            <View className="flex-row items-center mb-3">
              <Ionicons name="star" size={24} color="#9D12DE" />
              <Text className="text-primary font-bold text-lg ml-2">TOP RECOMMENDATION</Text>
            </View>
            <Text className="text-white font-bold text-2xl mb-2">{topSplit.name}</Text>
            <Text className="text-zinc-400 mb-4">{topSplit.bestFor}</Text>

            <View className="bg-primary rounded-full px-4 py-2 self-start mb-4">
              <Text className="text-white font-bold">{topSplit.rating}% Match</Text>
            </View>

            <Text className="text-zinc-400 font-bold text-xs mb-2">WEEKLY STRUCTURE</Text>
            <View className="flex-row flex-wrap gap-2 mb-4">
              {topSplit.structure.map((day, idx) => (
                <View key={idx} className="bg-zinc-900 rounded-lg px-3 py-2">
                  <Text className="text-primary text-xs font-bold">Day {idx + 1}</Text>
                  <Text className="text-white font-bold">{day}</Text>
                </View>
              ))}
            </View>

            <Text className="text-zinc-400 font-bold text-xs mb-2">MUSCLE FREQUENCY</Text>
            <View className="space-y-2 mb-4">
              {Object.entries(topSplit.frequency).map(([muscle, freq]) => (
                <View key={muscle} className="flex-row items-center justify-between">
                  <Text className="text-zinc-300 capitalize">{muscle}</Text>
                  <Text className="text-primary font-bold">{freq}x per week</Text>
                </View>
              ))}
            </View>

            <View className="flex-row gap-3">
              <View className="flex-1">
                <Text className="text-primary font-bold text-xs mb-2">PROS</Text>
                {topSplit.pros.map((pro, idx) => (
                  <Text key={idx} className="text-primary/80 text-sm mb-1">✓ {pro}</Text>
                ))}
              </View>
              <View className="flex-1">
                <Text className="text-amber-400 font-bold text-xs mb-2">CONS</Text>
                {topSplit.cons.map((con, idx) => (
                  <Text key={idx} className="text-amber-300 text-sm mb-1">! {con}</Text>
                ))}
              </View>
            </View>
          </View>

          <Text className="text-white font-bold text-lg mb-4">Alternative Splits</Text>

          {currentSplits
            .filter((split) => split.name !== topSplit.name)
            .map((split, idx) => (
              <View key={idx} className="bg-zinc-900 rounded-xl p-4 mb-3 border border-zinc-800">
                <View className="flex-row items-center justify-between mb-3">
                  <View className="flex-1">
                    <Text className="text-white font-bold text-lg">{split.name}</Text>
                    <Text className="text-zinc-400 text-sm">{split.bestFor}</Text>
                  </View>
                  <View className="bg-primary rounded-lg px-3 py-1">
                    <Text className="text-white font-bold">{split.rating}%</Text>
                  </View>
                </View>

                <View className="flex-row flex-wrap gap-2 mb-3">
                  {split.structure.map((day, dayIdx) => (
                    <View key={dayIdx} className="bg-zinc-800 rounded px-2 py-1">
                      <Text className="text-zinc-400 text-xs">{day}</Text>
                    </View>
                  ))}
                </View>

                <View className="flex-row gap-2">
                  <View className="flex-1 bg-primary/10 rounded p-2 border border-primary/30">
                    <Text className="text-primary text-xs font-bold mb-1">PROS</Text>
                    {split.pros.slice(0, 2).map((pro, proIdx) => (
                      <Text key={proIdx} className="text-primary/80 text-xs">• {pro}</Text>
                    ))}
                  </View>
                  <View className="flex-1 bg-amber-500/10 rounded p-2 border border-amber-500/30">
                    <Text className="text-amber-400 text-xs font-bold mb-1">CONS</Text>
                    {split.cons.slice(0, 2).map((con, conIdx) => (
                      <Text key={conIdx} className="text-amber-300 text-xs">• {con}</Text>
                    ))}
                  </View>
                </View>
              </View>
            ))}

          <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-6">
            <Text className="text-primary/80 font-bold mb-2">Split Selection Tips</Text>
            <Text className="text-primary/60 text-sm">
              • Frequency &gt; volume for naturals{'\n'}
              • 2x per week per muscle = optimal{'\n'}
              • Choose split you can sustain{'\n'}
              • 4-6 days ideal for intermediates{'\n'}
              • Beginners: start with 3-4 days{'\n'}
              • Advanced: 5-6 days with proper recovery
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}



