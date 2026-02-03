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

export default function BodyRecomposition() {
  const [currentWeight, setCurrentWeight] = useState('80');
  const [bodyFat, setBodyFat] = useState('18');
  const [targetBodyFat, setTargetBodyFat] = useState('12');
  const [selectedGoal, setSelectedGoal] = useState<string>('recomp');

  const goals = [
    { key: 'recomp', label: 'Recomposition', icon: 'swap-horizontal', color: 'blue' },
    { key: 'cut', label: 'Cut (Fat Loss)', icon: 'trending-down', color: 'red' },
    { key: 'lean', label: 'Lean Bulk', icon: 'trending-up', color: 'emerald' },
    { key: 'maintain', label: 'Maintain', icon: 'remove', color: 'amber' },
  ];

  const weight = parseFloat(currentWeight) || 0;
  const bf = parseFloat(bodyFat) || 0;
  const targetBf = parseFloat(targetBodyFat) || 0;

  const leanMass = weight * (1 - bf / 100);
  const fatMass = weight - leanMass;
  const targetWeight = leanMass / (1 - targetBf / 100);
  const fatToLose = weight - targetWeight;
  const weeksNeeded = Math.max(1, Math.abs(fatToLose) / 0.5);

  const getCalorieRecommendation = () => {
    const maintenanceCalories = weight * 33; // rough estimate
    
    switch (selectedGoal) {
      case 'recomp':
        return {
          daily: maintenanceCalories,
          desc: 'Maintenance calories',
          protein: weight * 2.2,
          carbs: weight * 3,
          fat: weight * 0.8,
        };
      case 'cut':
        return {
          daily: maintenanceCalories - 500,
          desc: '500 cal deficit',
          protein: weight * 2.5,
          carbs: weight * 2,
          fat: weight * 0.7,
        };
      case 'lean':
        return {
          daily: maintenanceCalories + 300,
          desc: '300 cal surplus',
          protein: weight * 2.0,
          carbs: weight * 4,
          fat: weight * 0.9,
        };
      case 'maintain':
        return {
          daily: maintenanceCalories,
          desc: 'Maintenance',
          protein: weight * 2.0,
          carbs: weight * 3,
          fat: weight * 0.8,
        };
      default:
        return { daily: 2000, desc: 'Calculate your needs', protein: 150, carbs: 200, fat: 60 };
    }
  };

  const nutrition = getCalorieRecommendation();

  const trainingAdjustments = {
    recomp: {
      cardio: 'Moderate (2-3x per week)',
      strength: 'High volume (4-5x per week)',
      intensity: 'Progressive overload focus',
      rest: '7-9 hours sleep crucial',
    },
    cut: {
      cardio: 'Increased (3-4x per week)',
      strength: 'Maintain volume (3-4x per week)',
      intensity: 'Maintain strength, reduce volume if needed',
      rest: '8-9 hours for recovery',
    },
    lean: {
      cardio: 'Minimal (1-2x per week)',
      strength: 'High volume (4-6x per week)',
      intensity: 'Progressive overload + volume',
      rest: '8-10 hours, more food',
    },
    maintain: {
      cardio: 'Moderate (2-3x per week)',
      strength: 'Consistent (3-4x per week)',
      intensity: 'Maintain current loads',
      rest: '7-9 hours',
    },
  };

  const currentTraining = trainingAdjustments[selectedGoal as keyof typeof trainingAdjustments];

  return (
    <View className="flex-1 bg-zinc-950">
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1 ml-3">
            Body Recomposition
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          <View className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl p-6 mb-6">
            <Text className="text-white text-2xl font-bold mb-2">Transform Your Body</Text>
            <Text className="text-white opacity-90 mb-4">
              Science-based recomp planning
            </Text>
            <View className="flex-row items-center">
              <Ionicons name="body" size={20} color="white" />
              <Text className="text-white ml-2">Optimal nutrition + training</Text>
            </View>
          </View>

          <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
            <Text className="text-white font-bold text-lg mb-4">Your Stats</Text>

            <View className="mb-4">
              <Text className="text-zinc-400 mb-2">Current Weight (kg)</Text>
              <TextInput
                className="bg-zinc-800 text-white rounded-xl px-4 py-3 border border-zinc-700"
                value={currentWeight}
                onChangeText={setCurrentWeight}
                keyboardType="numeric"
                placeholder="80"
                placeholderTextColor="#71717a"
              />
            </View>

            <View className="mb-4">
              <Text className="text-zinc-400 mb-2">Current Body Fat %</Text>
              <TextInput
                className="bg-zinc-800 text-white rounded-xl px-4 py-3 border border-zinc-700"
                value={bodyFat}
                onChangeText={setBodyFat}
                keyboardType="numeric"
                placeholder="18"
                placeholderTextColor="#71717a"
              />
            </View>

            <View className="mb-4">
              <Text className="text-zinc-400 mb-2">Target Body Fat %</Text>
              <TextInput
                className="bg-zinc-800 text-white rounded-xl px-4 py-3 border border-zinc-700"
                value={targetBodyFat}
                onChangeText={setTargetBodyFat}
                keyboardType="numeric"
                placeholder="12"
                placeholderTextColor="#71717a"
              />
            </View>

            <View className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/30">
              <View className="flex-row justify-between mb-2">
                <Text className="text-blue-400">Lean Mass:</Text>
                <Text className="text-white font-bold">{leanMass.toFixed(1)} kg</Text>
              </View>
              <View className="flex-row justify-between mb-2">
                <Text className="text-blue-400">Fat Mass:</Text>
                <Text className="text-white font-bold">{fatMass.toFixed(1)} kg</Text>
              </View>
              <View className="flex-row justify-between mb-2">
                <Text className="text-blue-400">Target Weight:</Text>
                <Text className="text-white font-bold">{targetWeight.toFixed(1)} kg</Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-blue-400">Fat to Lose:</Text>
                <Text className="text-emerald-400 font-bold">{fatToLose.toFixed(1)} kg</Text>
              </View>
            </View>
          </View>

          <Text className="text-white font-bold text-lg mb-3">Select Goal</Text>
          <View className="flex-row flex-wrap gap-3 mb-6">
            {goals.map((goal) => (
              <TouchableOpacity
                key={goal.key}
                onPress={() => setSelectedGoal(goal.key)}
                className={`flex-1 min-w-[45%] ${
                  selectedGoal === goal.key ? `bg-${goal.color}-500` : 'bg-zinc-900'
                } rounded-xl p-4 border ${
                  selectedGoal === goal.key ? `border-${goal.color}-400` : 'border-zinc-800'
                }`}
              >
                <Ionicons
                  name={goal.icon as any}
                  size={28}
                  color={selectedGoal === goal.key ? 'white' : '#71717a'}
                />
                <Text
                  className={`${
                    selectedGoal === goal.key ? 'text-white' : 'text-zinc-400'
                  } font-bold mt-2`}
                >
                  {goal.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
            <Text className="text-white font-bold text-lg mb-4">Nutrition Plan</Text>

            <View className="bg-emerald-500/10 rounded-lg p-4 mb-4 border border-emerald-500/30">
              <Text className="text-emerald-400 font-bold text-2xl mb-1">
                {nutrition.daily.toFixed(0)} cal/day
              </Text>
              <Text className="text-zinc-400">{nutrition.desc}</Text>
            </View>

            <Text className="text-zinc-400 font-bold mb-3">Macro Split</Text>
            <View className="space-y-3">
              <View className="bg-blue-500/10 rounded-lg p-3 border border-blue-500/30">
                <View className="flex-row justify-between mb-1">
                  <Text className="text-blue-400 font-bold">Protein</Text>
                  <Text className="text-white font-bold">{nutrition.protein.toFixed(0)}g</Text>
                </View>
                <Text className="text-zinc-500 text-xs">{(nutrition.protein * 4).toFixed(0)} cal</Text>
              </View>

              <View className="bg-amber-500/10 rounded-lg p-3 border border-amber-500/30">
                <View className="flex-row justify-between mb-1">
                  <Text className="text-amber-400 font-bold">Carbs</Text>
                  <Text className="text-white font-bold">{nutrition.carbs.toFixed(0)}g</Text>
                </View>
                <Text className="text-zinc-500 text-xs">{(nutrition.carbs * 4).toFixed(0)} cal</Text>
              </View>

              <View className="bg-purple-500/10 rounded-lg p-3 border border-purple-500/30">
                <View className="flex-row justify-between mb-1">
                  <Text className="text-purple-400 font-bold">Fat</Text>
                  <Text className="text-white font-bold">{nutrition.fat.toFixed(0)}g</Text>
                </View>
                <Text className="text-zinc-500 text-xs">{(nutrition.fat * 9).toFixed(0)} cal</Text>
              </View>
            </View>
          </View>

          <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
            <Text className="text-white font-bold text-lg mb-4">Training Adjustments</Text>

            <View className="space-y-3">
              <View className="bg-zinc-800 rounded-lg p-3">
                <Text className="text-zinc-400 text-sm mb-1">Cardio</Text>
                <Text className="text-white font-bold">{currentTraining.cardio}</Text>
              </View>

              <View className="bg-zinc-800 rounded-lg p-3">
                <Text className="text-zinc-400 text-sm mb-1">Strength Training</Text>
                <Text className="text-white font-bold">{currentTraining.strength}</Text>
              </View>

              <View className="bg-zinc-800 rounded-lg p-3">
                <Text className="text-zinc-400 text-sm mb-1">Intensity</Text>
                <Text className="text-white font-bold">{currentTraining.intensity}</Text>
              </View>

              <View className="bg-zinc-800 rounded-lg p-3">
                <Text className="text-zinc-400 text-sm mb-1">Recovery</Text>
                <Text className="text-white font-bold">{currentTraining.rest}</Text>
              </View>
            </View>
          </View>

          <View className="bg-amber-500/10 rounded-xl p-4 border border-amber-500/30 mb-6">
            <View className="flex-row items-center mb-2">
              <Ionicons name="time" size={20} color="#f59e0b" />
              <Text className="text-amber-400 font-bold ml-2">Timeline</Text>
            </View>
            <Text className="text-amber-300">
              Estimated: {weeksNeeded.toFixed(0)} weeks (~{(weeksNeeded / 4).toFixed(1)} months)
            </Text>
            <Text className="text-zinc-400 text-sm mt-2">
              At 0.5-1kg fat loss per week (healthy pace)
            </Text>
          </View>

          <View className="bg-blue-500/10 rounded-xl p-4 border border-blue-500/30 mb-6">
            <Text className="text-blue-400 font-bold mb-2">Recomp Tips</Text>
            <Text className="text-blue-300 text-sm">
              • Track weight weekly, not daily{'\n'}
              • Photos &gt; scale weight{'\n'}
              • Prioritize protein intake{'\n'}
              • Sleep is non-negotiable{'\n'}
              • Patience = 12-16 weeks minimum{'\n'}
              • Adjust based on 2-week averages
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
