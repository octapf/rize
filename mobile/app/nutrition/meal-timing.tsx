import React, { useState } from 'react';
import { Text } from '@/components/ui/Text';
import { View, TouchableOpacity, ScrollView } from 'react-native';;
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function MealTiming() {
  const [trainingTime, setTrainingTime] = useState<string>('morning');
  const [goal, setGoal] = useState<string>('muscle');

  const times = [
    { key: 'morning', label: 'Morning (6-9 AM)', icon: 'sunny' },
    { key: 'midday', label: 'Midday (12-2 PM)', icon: 'partly-sunny' },
    { key: 'evening', label: 'Evening (5-7 PM)', icon: 'moon' },
  ];

  const goals = [
    { key: 'muscle', label: 'Muscle Gain', color: 'primary' },
    { key: 'fat', label: 'Fat Loss', color: 'red' },
    { key: 'performance', label: 'Performance', color: 'blue' },
  ];

  const timingProtocols = {
    morning_muscle: {
      preWorkout: {
        timing: '60-90 min before',
        meal: 'Moderate carbs + protein',
        example: 'Oatmeal (50g) + whey (30g) + banana',
        macros: '60g carbs, 35g protein, 10g fat',
        why: 'Fuel workout without feeling heavy',
      },
      intraWorkout: {
        timing: 'During (optional)',
        meal: 'EAAs or carbs for long sessions',
        example: '10g EAAs in water OR 30g carbs if 90+ min',
        macros: '10g EAAs OR 30g carbs',
        why: 'Prevent muscle breakdown, sustain energy',
      },
      postWorkout: {
        timing: 'Within 2-3 hours',
        meal: 'High carbs + protein',
        example: 'Rice (100g) + chicken (200g) + veggies',
        macros: '80g carbs, 50g protein, 15g fat',
        why: 'Replenish glycogen, maximize protein synthesis',
      },
      restOfDay: {
        timing: 'Evening meals',
        meal: 'Moderate carbs, high protein',
        example: '2-3 more meals hitting protein targets',
        macros: 'Distribute remaining daily macros',
        why: 'Meet daily totals, evening carbs help sleep',
      },
    },
    morning_fat: {
      preWorkout: {
        timing: '30-60 min before',
        meal: 'Low carb, moderate protein',
        example: 'Black coffee + 1 scoop whey',
        macros: '5g carbs, 25g protein, 3g fat',
        why: 'Fasted training boosts fat oxidation',
      },
      intraWorkout: {
        timing: 'During',
        meal: 'Water + electrolytes + EAAs',
        example: '10g EAAs, salt, water',
        macros: '10g EAAs, 0 carbs',
        why: 'Preserve muscle without breaking fast',
      },
      postWorkout: {
        timing: 'Break fast after workout',
        meal: 'High protein, moderate carbs',
        example: 'Eggs (4) + sweet potato (150g)',
        macros: '40g carbs, 30g protein, 20g fat',
        why: 'First meal after training, nutrient timing window',
      },
      restOfDay: {
        timing: '8-hour eating window',
        meal: 'High protein, moderate fat, low carb',
        example: 'Lean meats, veggies, healthy fats',
        macros: 'Hit protein (2.5g/kg), moderate fat',
        why: 'Calorie deficit while preserving muscle',
      },
    },
    midday_muscle: {
      preWorkout: {
        timing: '90-120 min before',
        meal: 'Large carb + protein meal',
        example: 'Pasta (120g) + ground beef (150g)',
        macros: '90g carbs, 40g protein, 20g fat',
        why: 'Time to digest, maximum fuel for training',
      },
      intraWorkout: {
        timing: 'During',
        meal: 'Carbs + EAAs',
        example: '40g highly branched cyclic dextrin + 10g EAAs',
        macros: '40g carbs, 10g EAAs',
        why: 'Sustain performance, prevent catabolism',
      },
      postWorkout: {
        timing: 'Immediately after',
        meal: 'Fast carbs + protein',
        example: 'White rice (100g) + whey (40g)',
        macros: '80g carbs, 40g protein, 5g fat',
        why: 'Optimize anabolic window',
      },
      restOfDay: {
        timing: 'Dinner + evening',
        meal: 'Balanced macros',
        example: 'Salmon + rice + veggies',
        macros: 'Meet remaining daily targets',
        why: 'Complete nutrition for recovery',
      },
    },
    evening_muscle: {
      preWorkout: {
        timing: '2-3 hours before',
        meal: 'Moderate meal',
        example: 'Chicken (150g) + rice (80g) + veggies',
        macros: '60g carbs, 40g protein, 10g fat',
        why: 'Adequate digestion time',
      },
      intraWorkout: {
        timing: 'During',
        meal: 'Carbs for energy',
        example: '30-50g carbs (Gatorade or dextrose)',
        macros: '40g carbs',
        why: 'Energy after full workday',
      },
      postWorkout: {
        timing: 'Post-workout dinner',
        meal: 'Large protein + carb meal',
        example: 'Steak (200g) + potato (200g) + veggies',
        macros: '80g carbs, 50g protein, 25g fat',
        why: 'Biggest meal post-training, aids sleep & recovery',
      },
      restOfDay: {
        timing: 'Late evening (optional)',
        meal: 'Casein protein or cottage cheese',
        example: 'Casein shake (30g) OR Greek yogurt',
        macros: '30g protein, slow-digesting',
        why: 'Sustained amino acids overnight',
      },
    },
  };

  const key = `${trainingTime}_${goal}` as keyof typeof timingProtocols;
  const protocol = timingProtocols[key] || timingProtocols.morning_muscle;

  return (
    <View className="flex-1 bg-zinc-950">
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1 ml-3">
            Meal Timing
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          <View className="bg-gradient-to-r from-amber-500 to-primary rounded-xl p-6 mb-6">
            <Text className="text-white text-2xl font-bold mb-2">Nutrient Timing</Text>
            <Text className="text-white opacity-90 mb-4">
              When to eat for best results
            </Text>
            <View className="flex-row items-center">
              <Ionicons name="time" size={20} color="white" />
              <Text className="text-white ml-2">Optimize around training</Text>
            </View>
          </View>

          <Text className="text-white font-bold mb-3">Training Time</Text>
          {times.map((time) => (
            <TouchableOpacity
              key={time.key}
              onPress={() => setTrainingTime(time.key)}
              className={`${
                trainingTime === time.key ? 'bg-primary' : 'bg-zinc-900'
              } rounded-xl p-4 mb-3 border ${
                trainingTime === time.key ? 'border-blue-400' : 'border-zinc-800'
              }`}
            >
              <View className="flex-row items-center">
                <Ionicons
                  name={time.icon as any}
                  size={24}
                  color={trainingTime === time.key ? 'white' : '#71717a'}
                />
                <Text
                  className={`${
                    trainingTime === time.key ? 'text-white' : 'text-zinc-400'
                  } font-bold ml-3`}
                >
                  {time.label}
                </Text>
              </View>
            </TouchableOpacity>
          ))}

          <Text className="text-white font-bold mb-3 mt-6">Goal</Text>
          <View className="flex-row gap-3 mb-6">
            {goals.map((g) => (
              <TouchableOpacity
                key={g.key}
                onPress={() => setGoal(g.key)}
                className={`flex-1 ${
                  goal === g.key ? `bg-${g.color}-500` : 'bg-zinc-900'
                } rounded-xl py-4 border ${
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
              </TouchableOpacity>
            ))}
          </View>

          <View className="bg-primary/10 rounded-xl p-4 mb-4 border border-primary/30">
            <View className="flex-row items-center mb-2">
              <Ionicons name="timer" size={20} color="#9D12DE" />
              <Text className="text-primary/80 font-bold ml-2">Pre-Workout</Text>
            </View>
            <Text className="text-zinc-400 text-sm mb-3">{protocol.preWorkout.timing}</Text>
            
            <View className="bg-zinc-900 rounded-lg p-3 mb-2">
              <Text className="text-white font-bold mb-1">{protocol.preWorkout.meal}</Text>
              <Text className="text-primary text-sm mb-1">{protocol.preWorkout.example}</Text>
              <Text className="text-zinc-500 text-xs">{protocol.preWorkout.macros}</Text>
            </View>
            <Text className="text-primary/60 text-sm italic">💡 {protocol.preWorkout.why}</Text>
          </View>

          <View className="bg-primary/10 rounded-xl p-4 mb-4 border border-primary/30">
            <View className="flex-row items-center mb-2">
              <Ionicons name="fitness" size={20} color="#9D12DE" />
              <Text className="text-primary font-bold ml-2">Intra-Workout</Text>
            </View>
            <Text className="text-zinc-400 text-sm mb-3">{protocol.intraWorkout.timing}</Text>
            
            <View className="bg-zinc-900 rounded-lg p-3 mb-2">
              <Text className="text-white font-bold mb-1">{protocol.intraWorkout.meal}</Text>
              <Text className="text-primary text-sm mb-1">{protocol.intraWorkout.example}</Text>
              <Text className="text-zinc-500 text-xs">{protocol.intraWorkout.macros}</Text>
            </View>
            <Text className="text-primary/80 text-sm italic">💡 {protocol.intraWorkout.why}</Text>
          </View>

          <View className="bg-purple-500/10 rounded-xl p-4 mb-4 border border-purple-500/30">
            <View className="flex-row items-center mb-2">
              <Ionicons name="restaurant" size={20} color="#a855f7" />
              <Text className="text-purple-400 font-bold ml-2">Post-Workout</Text>
            </View>
            <Text className="text-zinc-400 text-sm mb-3">{protocol.postWorkout.timing}</Text>
            
            <View className="bg-zinc-900 rounded-lg p-3 mb-2">
              <Text className="text-white font-bold mb-1">{protocol.postWorkout.meal}</Text>
              <Text className="text-primary text-sm mb-1">{protocol.postWorkout.example}</Text>
              <Text className="text-zinc-500 text-xs">{protocol.postWorkout.macros}</Text>
            </View>
            <Text className="text-purple-300 text-sm italic">💡 {protocol.postWorkout.why}</Text>
          </View>

          <View className="bg-amber-500/10 rounded-xl p-4 mb-6 border border-amber-500/30">
            <View className="flex-row items-center mb-2">
              <Ionicons name="moon" size={20} color="#FFEA00" />
              <Text className="text-amber-400 font-bold ml-2">Rest of Day</Text>
            </View>
            <Text className="text-zinc-400 text-sm mb-3">{protocol.restOfDay.timing}</Text>
            
            <View className="bg-zinc-900 rounded-lg p-3 mb-2">
              <Text className="text-white font-bold mb-1">{protocol.restOfDay.meal}</Text>
              <Text className="text-primary text-sm mb-1">{protocol.restOfDay.example}</Text>
              <Text className="text-zinc-500 text-xs">{protocol.restOfDay.macros}</Text>
            </View>
            <Text className="text-amber-300 text-sm italic">💡 {protocol.restOfDay.why}</Text>
          </View>

          <View className="bg-red-500/10 rounded-xl p-4 border border-red-500/30 mb-6">
            <Text className="text-red-400 font-bold mb-2">Meal Timing Reality Check</Text>
            <Text className="text-red-300 text-sm">
              • Total daily macros &gt; meal timing{'\n'}
              • 2-4h "anabolic window" not 30 min{'\n'}
              • Pre-workout more important than post{'\n'}
              • Consistency beats perfect timing{'\n'}
              • Listen to your body{'\n'}
              • Find what works for YOUR schedule
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}


