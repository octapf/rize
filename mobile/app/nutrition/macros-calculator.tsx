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

export default function MacrosCalculator() {
  const [weight, setWeight] = useState('80');
  const [bodyFat, setBodyFat] = useState('15');
  const [activityLevel, setActivityLevel] = useState<string>('moderate');
  const [goal, setGoal] = useState<string>('maintain');

  const activities = [
    { key: 'sedentary', label: 'Sedentary', multiplier: 1.2, desc: '< 3k steps/day' },
    { key: 'light', label: 'Light', multiplier: 1.375, desc: '3-5k steps + 2-3 workouts' },
    { key: 'moderate', label: 'Moderate', multiplier: 1.55, desc: '7-10k steps + 3-5 workouts' },
    { key: 'very', label: 'Very Active', multiplier: 1.725, desc: '10k+ steps + 5-6 workouts' },
    { key: 'extreme', label: 'Extreme', multiplier: 1.9, desc: 'Athlete/manual labor' },
  ];

  const goals = [
    { key: 'cut', label: 'Cut', modifier: -500, color: 'red' },
    { key: 'maintain', label: 'Maintain', modifier: 0, color: 'blue' },
    { key: 'lean', label: 'Lean Bulk', modifier: 300, color: 'emerald' },
    { key: 'bulk', label: 'Bulk', modifier: 500, color: 'purple' },
  ];

  const w = parseFloat(weight) || 0;
  const bf = parseFloat(bodyFat) || 0;
  const leanMass = w * (1 - bf / 100);

  const currentActivity = activities.find((a) => a.key === activityLevel) || activities[2];
  const currentGoal = goals.find((g) => g.key === goal) || goals[1];

  // Mifflin-St Jeor (using lean mass for accuracy)
  const bmr = 370 + (21.6 * leanMass);
  const tdee = Math.round(bmr * currentActivity.multiplier);
  const targetCalories = tdee + currentGoal.modifier;

  // Macros
  const proteinPerKg = goal === 'cut' ? 2.5 : goal === 'maintain' ? 2.0 : 2.2;
  const fatPerKg = goal === 'cut' ? 0.7 : 0.9;

  const protein = Math.round(w * proteinPerKg);
  const fat = Math.round(w * fatPerKg);
  const proteinCals = protein * 4;
  const fatCals = fat * 9;
  const carbCals = targetCalories - proteinCals - fatCals;
  const carbs = Math.round(carbCals / 4);

  const macroSplit = {
    proteinPercent: Math.round((proteinCals / targetCalories) * 100),
    carbPercent: Math.round((carbCals / targetCalories) * 100),
    fatPercent: Math.round((fatCals / targetCalories) * 100),
  };

  return (
    <View className="flex-1 bg-zinc-950">
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1 ml-3">
            Macros Calculator
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          <View className="bg-gradient-to-r from-primary to-[#7D0EBE] rounded-xl p-6 mb-6">
            <Text className="text-white text-2xl font-bold mb-2">Calculate Macros</Text>
            <Text className="text-white opacity-90 mb-4">
              Personalized nutrition targets
            </Text>
            <View className="flex-row items-center">
              <Ionicons name="nutrition" size={20} color="white" />
              <Text className="text-white ml-2">Science-based formulas</Text>
            </View>
          </View>

          <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
            <Text className="text-white font-bold text-lg mb-4">Your Stats</Text>

            <View className="mb-4">
              <Text className="text-zinc-400 mb-2">Body Weight (kg)</Text>
              <TextInput
                className="bg-zinc-800 text-white rounded-xl px-4 py-3 border border-zinc-700"
                value={weight}
                onChangeText={setWeight}
                keyboardType="numeric"
                placeholder="80"
                placeholderTextColor="#71717a"
              />
            </View>

            <View className="mb-4">
              <Text className="text-zinc-400 mb-2">Body Fat %</Text>
              <TextInput
                className="bg-zinc-800 text-white rounded-xl px-4 py-3 border border-zinc-700"
                value={bodyFat}
                onChangeText={setBodyFat}
                keyboardType="numeric"
                placeholder="15"
                placeholderTextColor="#71717a"
              />
            </View>
          </View>

          <Text className="text-white font-bold mb-3">Activity Level</Text>
          {activities.map((activity) => (
            <TouchableOpacity
              key={activity.key}
              onPress={() => setActivityLevel(activity.key)}
              className={`${
                activityLevel === activity.key ? 'bg-primary' : 'bg-zinc-900'
              } rounded-xl p-4 mb-3 border ${
                activityLevel === activity.key ? 'border-blue-400' : 'border-zinc-800'
              }`}
            >
              <View className="flex-row items-center justify-between">
                <View className="flex-1">
                  <Text
                    className={`${
                      activityLevel === activity.key ? 'text-white' : 'text-zinc-400'
                    } font-bold`}
                  >
                    {activity.label}
                  </Text>
                  <Text
                    className={`${
                      activityLevel === activity.key ? 'text-highlight' : 'text-zinc-500'
                    } text-sm`}
                  >
                    {activity.desc}
                  </Text>
                </View>
                {activityLevel === activity.key && (
                  <Ionicons name="checkmark-circle" size={24} color="white" />
                )}
              </View>
            </TouchableOpacity>
          ))}

          <Text className="text-white font-bold mb-3 mt-6">Goal</Text>
          <View className="flex-row flex-wrap gap-3 mb-6">
            {goals.map((g) => (
              <TouchableOpacity
                key={g.key}
                onPress={() => setGoal(g.key)}
                className={`flex-1 min-w-[45%] ${
                  goal === g.key ? `bg-${g.color}-500` : 'bg-zinc-900'
                } rounded-xl p-4 border ${
                  goal === g.key ? `border-${g.color}-400` : 'border-zinc-800'
                }`}
              >
                <Text
                  className={`${
                    goal === g.key ? 'text-white' : 'text-zinc-400'
                  } font-bold text-center`}
                >
                  {g.label}
                </Text>
                <Text
                  className={`${
                    goal === g.key ? 'text-white' : 'text-zinc-500'
                  } text-xs text-center mt-1`}
                >
                  {g.modifier >= 0 ? '+' : ''}{g.modifier} cal
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View className="bg-primary/10 rounded-xl p-5 mb-6 border-2 border-primary">
            <Text className="text-primary font-bold text-lg mb-4">Your Daily Targets</Text>

            <View className="bg-zinc-900 rounded-lg p-4 mb-4">
              <View className="flex-row justify-between items-center mb-2">
                <Text className="text-zinc-400">TDEE (Maintenance)</Text>
                <Text className="text-white font-bold text-xl">{tdee} cal</Text>
              </View>
              <View className="flex-row justify-between items-center">
                <Text className="text-zinc-400">Target Calories</Text>
                <Text className="text-primary font-bold text-2xl">{targetCalories} cal</Text>
              </View>
            </View>

            <Text className="text-zinc-400 font-bold mb-3">MACROS</Text>

            <View className="bg-primary/20 rounded-lg p-4 mb-3 border border-primary/40">
              <View className="flex-row justify-between items-center mb-2">
                <View className="flex-1">
                  <Text className="text-primary/80 font-bold text-lg">Protein</Text>
                  <Text className="text-primary/60 text-xs">{macroSplit.proteinPercent}% of calories</Text>
                </View>
                <View className="items-end">
                  <Text className="text-white font-bold text-2xl">{protein}g</Text>
                  <Text className="text-zinc-400 text-sm">{proteinCals} cal</Text>
                </View>
              </View>
              <View className="bg-zinc-900 rounded-full h-2">
                <View
                  className="bg-primary rounded-full h-2"
                  style={{ width: `${macroSplit.proteinPercent}%` }}
                />
              </View>
            </View>

            <View className="bg-amber-500/20 rounded-lg p-4 mb-3 border border-amber-500/40">
              <View className="flex-row justify-between items-center mb-2">
                <View className="flex-1">
                  <Text className="text-amber-400 font-bold text-lg">Carbs</Text>
                  <Text className="text-amber-300 text-xs">{macroSplit.carbPercent}% of calories</Text>
                </View>
                <View className="items-end">
                  <Text className="text-white font-bold text-2xl">{carbs}g</Text>
                  <Text className="text-zinc-400 text-sm">{carbCals} cal</Text>
                </View>
              </View>
              <View className="bg-zinc-900 rounded-full h-2">
                <View
                  className="bg-amber-500 rounded-full h-2"
                  style={{ width: `${macroSplit.carbPercent}%` }}
                />
              </View>
            </View>

            <View className="bg-purple-500/20 rounded-lg p-4 border border-purple-500/40">
              <View className="flex-row justify-between items-center mb-2">
                <View className="flex-1">
                  <Text className="text-purple-400 font-bold text-lg">Fat</Text>
                  <Text className="text-purple-300 text-xs">{macroSplit.fatPercent}% of calories</Text>
                </View>
                <View className="items-end">
                  <Text className="text-white font-bold text-2xl">{fat}g</Text>
                  <Text className="text-zinc-400 text-sm">{fatCals} cal</Text>
                </View>
              </View>
              <View className="bg-zinc-900 rounded-full h-2">
                <View
                  className="bg-purple-500 rounded-full h-2"
                  style={{ width: `${macroSplit.fatPercent}%` }}
                />
              </View>
            </View>
          </View>

          <View className="bg-zinc-900 rounded-xl p-4 mb-6 border border-zinc-800">
            <Text className="text-white font-bold mb-3">Meal Distribution Example</Text>
            
            <View className="space-y-2">
              <View className="flex-row justify-between py-2 border-b border-zinc-800">
                <Text className="text-zinc-400">Breakfast</Text>
                <Text className="text-white font-bold">{Math.round(targetCalories * 0.25)} cal</Text>
              </View>
              <View className="flex-row justify-between py-2 border-b border-zinc-800">
                <Text className="text-zinc-400">Lunch</Text>
                <Text className="text-white font-bold">{Math.round(targetCalories * 0.35)} cal</Text>
              </View>
              <View className="flex-row justify-between py-2 border-b border-zinc-800">
                <Text className="text-zinc-400">Dinner</Text>
                <Text className="text-white font-bold">{Math.round(targetCalories * 0.30)} cal</Text>
              </View>
              <View className="flex-row justify-between py-2">
                <Text className="text-zinc-400">Snacks</Text>
                <Text className="text-white font-bold">{Math.round(targetCalories * 0.10)} cal</Text>
              </View>
            </View>
          </View>

          <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-6">
            <Text className="text-primary/80 font-bold mb-2">Macro Tips</Text>
            <Text className="text-primary/60 text-sm">
              â€¢ Hit protein target daily (most important){'\n'}
              â€¢ Carbs & fats are flexible{'\n'}
              â€¢ Track weekly averages, not daily{'\n'}
              â€¢ Adjust based on 2-week results{'\n'}
              â€¢ Fiber: 25-35g per day{'\n'}
              â€¢ Water: 3-4 liters daily
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}


