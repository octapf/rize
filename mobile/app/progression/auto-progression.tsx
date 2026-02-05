import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function AutoProgression() {
  const [selectedMode, setSelectedMode] = useState<string>('linear');

  const progressionModes = [
    {
      key: 'linear',
      name: 'Linear Progression',
      desc: 'Best for beginners',
      icon: 'trending-up',
      color: 'blue',
      rules: [
        'Add 2.5kg upper body each week',
        'Add 5kg lower body each week',
        'Maintain same reps',
        'Deload at -10% if fail 3x',
      ],
    },
    {
      key: 'doubleProgression',
      name: 'Double Progression',
      desc: 'Intermediate lifters',
      icon: 'swap-horizontal',
      color: 'emerald',
      rules: [
        'Hit top rep range? Add weight',
        'Example: 3x8-12 reps',
        'Hit 3x12? Add 2.5kg',
        'Start back at 3x8',
      ],
    },
    {
      key: 'periodized',
      name: 'Periodized',
      desc: 'Advanced programming',
      icon: 'layers',
      color: 'purple',
      rules: [
        'Wave loading across weeks',
        'Week 1: 3x10 @ 70%',
        'Week 2: 3x8 @ 75%',
        'Week 3: 3x6 @ 80%',
        'Week 4: Deload @ 60%',
      ],
    },
    {
      key: 'autoregulated',
      name: 'Autoregulated',
      desc: 'Based on daily performance',
      icon: 'stats-chart',
      color: 'amber',
      rules: [
        'Hit RPE target? Progress',
        'RPE too high? Reduce load',
        'Listen to daily readiness',
        'Adjust based on recovery',
      ],
    },
  ];

  const exercises = [
    {
      name: 'Bench Press',
      current: { weight: 100, sets: 3, reps: 8 },
      nextWeek: { weight: 102.5, sets: 3, reps: 8 },
      mode: 'linear',
    },
    {
      name: 'Squat',
      current: { weight: 140, sets: 4, reps: 5 },
      nextWeek: { weight: 145, sets: 4, reps: 5 },
      mode: 'linear',
    },
    {
      name: 'Overhead Press',
      current: { weight: 60, sets: 3, reps: 10 },
      nextWeek: { weight: 60, sets: 3, reps: 12 },
      mode: 'doubleProgression',
    },
    {
      name: 'Deadlift',
      current: { weight: 180, sets: 3, reps: 5 },
      nextWeek: { weight: 175, sets: 4, reps: 6 },
      mode: 'periodized',
    },
  ];

  const currentMode = progressionModes.find((m) => m.key === selectedMode)!;

  const applyProgression = () => {
    Alert.alert(
      'Auto Progression Applied',
      `${currentMode.name} rules applied to all exercises. Next workout targets updated!`
    );
  };

  return (
    <View className="flex-1 bg-zinc-950">
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1 ml-3">
            Auto Progression
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          <View className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl p-6 mb-6">
            <Text className="text-white text-2xl font-bold mb-2">Smart Progression</Text>
            <Text className="text-white opacity-90 mb-4">
              Automatic workout progression
            </Text>
            <View className="flex-row items-center">
              <Ionicons name="analytics" size={20} color="white" />
              <Text className="text-white ml-2">4 progression methods</Text>
            </View>
          </View>

          <Text className="text-white font-bold text-lg mb-4">Progression Mode</Text>

          {progressionModes.map((mode) => (
            <TouchableOpacity
              key={mode.key}
              onPress={() => setSelectedMode(mode.key)}
              className={`${
                selectedMode === mode.key ? `bg-${mode.color}-500/20 border-${mode.color}-500` : 'bg-zinc-900 border-zinc-800'
              } rounded-xl p-5 mb-4 border`}
            >
              <View className="flex-row items-start mb-3">
                <View className={`w-12 h-12 bg-${mode.color}-500 rounded-xl items-center justify-center mr-4`}>
                  <Ionicons name={mode.icon as any} size={24} color="white" />
                </View>
                <View className="flex-1">
                  <Text className="text-white font-bold text-lg mb-1">{mode.name}</Text>
                  <Text className="text-zinc-400 text-sm">{mode.desc}</Text>
                </View>
                {selectedMode === mode.key && (
                  <Ionicons name="checkmark-circle" size={24} color={
                    mode.color === 'blue' ? '#9D12DE' :
                    mode.color === 'emerald' ? '#9D12DE' :
                    mode.color === 'purple' ? '#a855f7' : '#FFEA00'
                  } />
                )}
              </View>

              <View className={`bg-${mode.color}-500/10 rounded-lg p-3 border border-${mode.color}-500/30`}>
                <Text className={`text-${mode.color}-400 font-bold mb-2`}>Rules:</Text>
                {mode.rules.map((rule, idx) => (
                  <View key={idx} className="flex-row items-start mb-1">
                    <Text className={`text-${mode.color}-400 mr-2`}>â€¢</Text>
                    <Text className={`text-${mode.color}-300 text-sm flex-1`}>{rule}</Text>
                  </View>
                ))}
              </View>
            </TouchableOpacity>
          ))}

          <Text className="text-white font-bold text-lg mb-4 mt-6">Exercise Progression Plan</Text>

          {exercises.map((exercise, idx) => (
            <View key={idx} className="bg-zinc-900 rounded-xl p-5 mb-4 border border-zinc-800">
              <Text className="text-white font-bold text-lg mb-3">{exercise.name}</Text>

              <View className="flex-row gap-3 mb-3">
                <View className="flex-1 bg-zinc-800 rounded-lg p-3">
                  <Text className="text-zinc-400 text-xs mb-1">THIS WEEK</Text>
                  <Text className="text-white font-bold">
                    {exercise.current.sets} x {exercise.current.reps}
                  </Text>
                  <Text className="text-primary/80 font-bold text-lg">
                    {exercise.current.weight}kg
                  </Text>
                </View>

                <View className="items-center justify-center">
                  <Ionicons name="arrow-forward" size={24} color="#9D12DE" />
                </View>

                <View className="flex-1 bg-primary/10 rounded-lg p-3 border border-primary/30">
                  <Text className="text-primary text-xs mb-1 font-bold">NEXT WEEK</Text>
                  <Text className="text-white font-bold">
                    {exercise.nextWeek.sets} x {exercise.nextWeek.reps}
                  </Text>
                  <Text className="text-primary font-bold text-lg">
                    {exercise.nextWeek.weight}kg
                  </Text>
                </View>
              </View>

              <View className="bg-primary/10 rounded-lg px-3 py-2 border border-primary/30">
                <Text className="text-primary/80 text-sm">
                  Mode: <Text className="font-bold">{exercise.mode}</Text>
                </Text>
              </View>
            </View>
          ))}

          <TouchableOpacity
            onPress={applyProgression}
            className="bg-primary rounded-xl py-4 mb-6 flex-row items-center justify-center"
          >
            <Ionicons name="flash" size={24} color="white" />
            <Text className="text-white font-bold ml-2 text-lg">Apply Auto Progression</Text>
          </TouchableOpacity>

          <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-6">
            <Text className="text-primary/80 font-bold mb-2">Auto Progression Benefits</Text>
            <Text className="text-primary/60 text-sm">
              â€¢ No guessing next workout{'\n'}
              â€¢ Consistent progressive overload{'\n'}
              â€¢ Automatic deload cuando needed{'\n'}
              â€¢ Adapts to tu nivel{'\n'}
              â€¢ Focus on lifting, not planning
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

