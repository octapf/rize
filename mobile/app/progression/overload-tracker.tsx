import React, { useState } from 'react';
import { Text } from '@/components/ui/Text';
import { View, TouchableOpacity, ScrollView } from 'react-native';;
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function ProgressiveOverload() {
  const [selectedExercise, setSelectedExercise] = useState('bench');

  const exercises = [
    {
      key: 'bench',
      name: 'Bench Press',
      progression: [
        { week: 'Week 1', weight: 100, sets: 3, reps: 8, volume: 2400 },
        { week: 'Week 2', weight: 102.5, sets: 3, reps: 8, volume: 2460 },
        { week: 'Week 3', weight: 105, sets: 3, reps: 8, volume: 2520 },
        { week: 'Week 4', weight: 107.5, sets: 3, reps: 8, volume: 2580 },
        { week: 'Week 5', weight: 110, sets: 3, reps: 8, volume: 2640 },
        { week: 'Week 6', weight: 112.5, sets: 3, reps: 8, volume: 2700 },
      ],
      nextTarget: { weight: 115, sets: 3, reps: 8 },
      method: 'Linear Weight',
      increment: '+2.5kg/week',
    },
    {
      key: 'squat',
      name: 'Squat',
      progression: [
        { week: 'Week 1', weight: 140, sets: 4, reps: 5, volume: 2800 },
        { week: 'Week 2', weight: 145, sets: 4, reps: 5, volume: 2900 },
        { week: 'Week 3', weight: 150, sets: 4, reps: 5, volume: 3000 },
        { week: 'Week 4', weight: 155, sets: 4, reps: 5, volume: 3100 },
        { week: 'Week 5', weight: 160, sets: 4, reps: 5, volume: 3200 },
        { week: 'Week 6', weight: 165, sets: 4, reps: 5, volume: 3300 },
      ],
      nextTarget: { weight: 170, sets: 4, reps: 5 },
      method: 'Linear Weight',
      increment: '+5kg/week',
    },
    {
      key: 'pullups',
      name: 'Pull-ups',
      progression: [
        { week: 'Week 1', weight: 0, sets: 3, reps: 8, volume: 24 },
        { week: 'Week 2', weight: 0, sets: 3, reps: 9, volume: 27 },
        { week: 'Week 3', weight: 0, sets: 3, reps: 10, volume: 30 },
        { week: 'Week 4', weight: 0, sets: 4, reps: 8, volume: 32 },
        { week: 'Week 5', weight: 0, sets: 4, reps: 9, volume: 36 },
        { week: 'Week 6', weight: 0, sets: 4, reps: 10, volume: 40 },
      ],
      nextTarget: { weight: 5, sets: 4, reps: 8 },
      method: 'Volume Progression',
      increment: '+1 rep or +1 set',
    },
  ];

  const overloadMethods = [
    {
      name: 'Linear Weight',
      desc: 'Add weight consistently',
      example: '+2.5kg each week',
      icon: 'barbell',
      color: 'blue',
    },
    {
      name: 'Volume Progression',
      desc: 'Increase sets or reps',
      example: '3x8 → 3x9 → 3x10',
      icon: 'add-circle',
      color: 'primary',
    },
    {
      name: 'Density',
      desc: 'Same work, less rest',
      example: '90s rest → 60s rest',
      icon: 'time',
      color: 'purple',
    },
    {
      name: 'Frequency',
      desc: 'Train more often',
      example: '2x/week → 3x/week',
      icon: 'calendar',
      color: 'amber',
    },
  ];

  const currentExercise = exercises.find((e) => e.key === selectedExercise)!;
  const totalVolumeGain = currentExercise.progression[currentExercise.progression.length - 1].volume - currentExercise.progression[0].volume;
  const percentGain = ((totalVolumeGain / currentExercise.progression[0].volume) * 100).toFixed(1);

  return (
    <View className="flex-1 bg-zinc-950">
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1 ml-3">
            Progressive Overload
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          <View className="bg-gradient-to-r from-primary to-primary/100 rounded-xl p-6 mb-6">
            <Text className="text-white text-2xl font-bold mb-2">Overload Tracker</Text>
            <Text className="text-white opacity-90 mb-4">
              Progressive improvement tracking
            </Text>
            <View className="flex-row items-center">
              <Ionicons name="trending-up" size={20} color="white" />
              <Text className="text-white ml-2">+{percentGain}% volume gain</Text>
            </View>
          </View>

          <Text className="text-white font-bold mb-3">Select Exercise</Text>
          <View className="flex-row gap-3 mb-6">
            {exercises.map((exercise) => (
              <TouchableOpacity
                key={exercise.key}
                onPress={() => setSelectedExercise(exercise.key)}
                className={`flex-1 ${
                  selectedExercise === exercise.key ? 'bg-primary' : 'bg-zinc-900'
                } rounded-xl p-3 border ${
                  selectedExercise === exercise.key ? 'border-blue-400' : 'border-zinc-800'
                }`}
              >
                <Text
                  className={`${
                    selectedExercise === exercise.key ? 'text-white' : 'text-zinc-400'
                  } font-bold text-center`}
                >
                  {exercise.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
            <View className="flex-row items-center justify-between mb-4">
              <View>
                <Text className="text-white font-bold text-xl">{currentExercise.name}</Text>
                <Text className="text-zinc-400 text-sm">{currentExercise.method}</Text>
              </View>
              <View className="bg-primary rounded-full px-4 py-2">
                <Text className="text-white font-bold">{currentExercise.increment}</Text>
              </View>
            </View>

            <View className="bg-primary/10 rounded-lg p-3 mb-4 border border-primary/30">
              <Text className="text-primary/80 font-bold mb-1">Next Target</Text>
              <Text className="text-white text-lg">
                {currentExercise.nextTarget.sets} x {currentExercise.nextTarget.reps} @ {currentExercise.nextTarget.weight > 0 ? `${currentExercise.nextTarget.weight}kg` : 'BW'}
              </Text>
            </View>
          </View>

          <Text className="text-white font-bold text-lg mb-4">6-Week Progression</Text>

          {currentExercise.progression.map((week, idx) => (
            <View
              key={idx}
              className="bg-zinc-900 rounded-xl p-4 mb-3 border border-zinc-800"
            >
              <View className="flex-row items-center justify-between mb-3">
                <View className="flex-row items-center">
                  <View className="w-8 h-8 bg-primary rounded-full items-center justify-center mr-3">
                    <Text className="text-white font-bold">{idx + 1}</Text>
                  </View>
                  <View>
                    <Text className="text-white font-bold">{week.week}</Text>
                    <Text className="text-zinc-400 text-sm">
                      {week.sets} x {week.reps} @ {week.weight > 0 ? `${week.weight}kg` : 'BW'}
                    </Text>
                  </View>
                </View>
                <View>
                  <Text className="text-primary font-bold text-right">{week.volume}</Text>
                  <Text className="text-zinc-500 text-xs text-right">
                    {week.weight > 0 ? 'kg' : 'reps'}
                  </Text>
                </View>
              </View>

              {idx > 0 && (
                <View className="flex-row items-center pt-3 border-t border-zinc-800">
                  <Ionicons name="trending-up" size={16} color="#9D12DE" />
                  <Text className="text-primary text-sm ml-2">
                    +{week.volume - currentExercise.progression[idx - 1].volume} {week.weight > 0 ? 'kg' : 'reps'} from last week
                  </Text>
                </View>
              )}
            </View>
          ))}

          <View className="bg-primary rounded-xl p-4 mb-6">
            <View className="flex-row items-center justify-between">
              <View>
                <Text className="text-white text-sm opacity-80 mb-1">Total Volume Gain</Text>
                <Text className="text-white text-3xl font-bold">+{totalVolumeGain}</Text>
              </View>
              <View>
                <Text className="text-white text-5xl font-bold">+{percentGain}%</Text>
              </View>
            </View>
          </View>

          <Text className="text-white font-bold text-lg mb-4">Overload Methods</Text>

          {overloadMethods.map((method) => (
            <View
              key={method.name}
              className={`bg-${method.color}-500/10 rounded-xl p-5 mb-4 border border-${method.color}-500/30`}
            >
              <View className="flex-row items-start mb-2">
                <View className={`w-12 h-12 bg-${method.color}-500 rounded-xl items-center justify-center mr-4`}>
                  <Ionicons name={method.icon as any} size={24} color="white" />
                </View>
                <View className="flex-1">
                  <Text className="text-white font-bold text-lg mb-1">{method.name}</Text>
                  <Text className="text-zinc-400 text-sm mb-2">{method.desc}</Text>
                  <View className={`bg-${method.color}-500/20 rounded-lg px-3 py-1 self-start`}>
                    <Text className={`text-${method.color}-400 text-sm font-bold`}>
                      {method.example}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          ))}

          <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-6">
            <Text className="text-primary/80 font-bold mb-2">Progressive Overload Tips</Text>
            <Text className="text-primary/60 text-sm">
              • Small consistent increases &gt; big jumps{'\n'}
              • Track ALL variables (weight/sets/reps/rest){'\n'}
              • Deload every 6-8 weeks{'\n'}
              • Can't progress? Check recovery{'\n'}
              • Progressive overload = muscle growth
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

