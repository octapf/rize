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

type Gender = 'male' | 'female';
type Experience = 'beginner' | 'intermediate' | 'advanced' | 'elite';

export default function StrengthStandards() {
  const [weight, setWeight] = useState('75');
  const [gender, setGender] = useState<Gender>('male');
  const [selectedExercise, setSelectedExercise] = useState('squat');

  const exercises = [
    { id: 'squat', name: 'Squat', icon: 'barbell' as const },
    { id: 'bench', name: 'Bench Press', icon: 'fitness' as const },
    { id: 'deadlift', name: 'Deadlift', icon: 'barbell' as const },
    { id: 'ohp', name: 'OHP', icon: 'arrow-up' as const },
  ];

  // Standards as multipliers of bodyweight
  const standards: Record<string, Record<Gender, Record<Experience, number>>> = {
    squat: {
      male: { beginner: 0.8, intermediate: 1.4, advanced: 2.0, elite: 2.5 },
      female: { beginner: 0.5, intermediate: 0.9, advanced: 1.4, elite: 1.9 },
    },
    bench: {
      male: { beginner: 0.5, intermediate: 1.0, advanced: 1.5, elite: 2.0 },
      female: { beginner: 0.3, intermediate: 0.6, advanced: 0.9, elite: 1.3 },
    },
    deadlift: {
      male: { beginner: 1.0, intermediate: 1.75, advanced: 2.5, elite: 3.0 },
      female: { beginner: 0.6, intermediate: 1.2, advanced: 1.8, elite: 2.4 },
    },
    ohp: {
      male: { beginner: 0.4, intermediate: 0.75, advanced: 1.1, elite: 1.5 },
      female: { beginner: 0.2, intermediate: 0.5, advanced: 0.8, elite: 1.1 },
    },
  };

  const getStandard = (exercise: string, level: Experience) => {
    const w = parseFloat(weight) || 75;
    return Math.round(standards[exercise][gender][level] * w);
  };

  const levels: Experience[] = ['beginner', 'intermediate', 'advanced', 'elite'];

  return (
    <View className="flex-1 bg-zinc-950">
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1 ml-3">
            Strength Standards
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          <View className="bg-gradient-to-r from-primary to-[#7D0EBE] rounded-xl p-6 mb-6">
            <Text className="text-white text-2xl font-bold mb-2">Compare Your Lifts</Text>
            <Text className="text-white opacity-90">
              See where you stand
            </Text>
          </View>

          <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
            <Text className="text-white font-bold text-lg mb-4">Your Info</Text>
            
            <View className="mb-4">
              <Text className="text-zinc-400 mb-2">Bodyweight (kg)</Text>
              <TextInput
                className="bg-zinc-800 text-white rounded-xl px-4 py-3 border border-zinc-700 text-lg"
                value={weight}
                onChangeText={setWeight}
                keyboardType="numeric"
                placeholder="75"
                placeholderTextColor="#71717a"
              />
            </View>

            <View>
              <Text className="text-zinc-400 mb-2">Gender</Text>
              <View className="flex-row gap-3">
                <TouchableOpacity
                  onPress={() => setGender('male')}
                  className={`flex-1 ${
                    gender === 'male' ? 'bg-primary' : 'bg-zinc-800'
                  } rounded-xl py-3 border ${
                    gender === 'male' ? 'border-blue-400' : 'border-zinc-700'
                  }`}
                >
                  <Text className="text-white font-bold text-center">Male</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setGender('female')}
                  className={`flex-1 ${
                    gender === 'female' ? 'bg-purple-500' : 'bg-zinc-800'
                  } rounded-xl py-3 border ${
                    gender === 'female' ? 'border-purple-400' : 'border-zinc-700'
                  }`}
                >
                  <Text className="text-white font-bold text-center">Female</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
            <Text className="text-white font-bold text-lg mb-4">Select Exercise</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View className="flex-row gap-3">
                {exercises.map((ex) => (
                  <TouchableOpacity
                    key={ex.id}
                    onPress={() => setSelectedExercise(ex.id)}
                    className={`${
                      selectedExercise === ex.id ? 'bg-primary' : 'bg-zinc-800'
                    } rounded-xl px-4 py-3 border ${
                      selectedExercise === ex.id ? 'border-primary' : 'border-zinc-700'
                    }`}
                  >
                    <View className="flex-row items-center">
                      <Ionicons
                        name={ex.icon}
                        size={20}
                        color="white"
                      />
                      <Text className="text-white font-bold ml-2">{ex.name}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>

          <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
            <Text className="text-white font-bold text-lg mb-4">Standards (1RM)</Text>
            
            {levels.map((level, idx) => {
              const colors = ['emerald', 'blue', 'purple', 'amber'];
              const color = colors[idx];
              const standardWeight = getStandard(selectedExercise, level);
              
              return (
                <View
                  key={level}
                  className={`bg-${color}-500/10 rounded-xl p-4 mb-3 border border-${color}-500/30`}
                >
                  <View className="flex-row justify-between items-center mb-2">
                    <Text className={`text-${color}-400 font-bold text-lg capitalize`}>
                      {level}
                    </Text>
                    <Text className="text-white font-bold text-2xl">
                      {standardWeight}kg
                    </Text>
                  </View>
                  <View className="bg-zinc-900 rounded-full h-2">
                    <View
                      className={`bg-${color}-500 rounded-full h-2`}
                      style={{ width: `${(idx + 1) * 25}%` }}
                    />
                  </View>
                </View>
              );
            })}
          </View>

          <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-6">
            <Text className="text-primary/80 font-bold mb-2">What the Levels Mean</Text>
            <View className="space-y-2">
              <Text className="text-primary/60 text-sm">
                <Text className="font-bold">Beginner:</Text> First 6 months training
              </Text>
              <Text className="text-primary/60 text-sm">
                <Text className="font-bold">Intermediate:</Text> 1-2 years consistent training
              </Text>
              <Text className="text-primary/60 text-sm">
                <Text className="font-bold">Advanced:</Text> 3-5 years dedicated training
              </Text>
              <Text className="text-primary/60 text-sm">
                <Text className="font-bold">Elite:</Text> 5+ years, competitive level
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}


