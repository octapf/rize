import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function PeakWeek() {
  const [goal, setGoal] = useState('powerlifting');

  const goals = ['powerlifting', 'bodybuilding', 'performance'];

  const peakWeekPlans = {
    powerlifting: {
      name: 'Powerlifting Peak Week',
      icon: 'barbell' as const,
      color: 'red',
      objective: 'Maximize CNS recovery while maintaining strength',
      days: [
        {
          day: 'Monday (7 days out)',
          training: 'Last heavy session',
          volume: 'Low (3-5 sets total per lift)',
          intensity: 'High (90-95% singles)',
          focus: 'Practice openers, test commands',
          nutrition: 'Normal calories, high protein',
          recovery: 'Quality sleep 8+ hours',
        },
        {
          day: 'Tuesday',
          training: 'Optional light session',
          volume: 'Very low (2-3 sets)',
          intensity: 'Light (60-70%)',
          focus: 'Movement quality, technique',
          nutrition: 'Normal calories',
          recovery: 'Active recovery, walk/stretch',
        },
        {
          day: 'Wednesday',
          training: 'Rest or very light technique',
          volume: 'Minimal (1-2 sets)',
          intensity: 'Very light (50-60%)',
          focus: 'Bar speed, groove pattern',
          nutrition: 'Normal calories, reduce volume of food',
          recovery: 'Foam roll, massage if available',
        },
        {
          day: 'Thursday',
          training: 'Openers practice',
          volume: 'Minimal (1 single per lift)',
          intensity: 'Moderate (opener weight 90%)',
          focus: 'Commands, walkout practice',
          nutrition: 'Start reducing fiber, increase simple carbs',
          recovery: 'Sleep, reduce activity outside gym',
        },
        {
          day: 'Friday',
          training: 'Complete rest',
          volume: 'None',
          intensity: 'N/A',
          focus: 'Mental preparation, visualize',
          nutrition: 'Light meals, easily digestible',
          recovery: 'Early bedtime, minimize stress',
        },
        {
          day: 'Saturday (meet day)',
          training: 'COMPETE',
          volume: 'N/A',
          intensity: 'Max',
          focus: 'Execute your plan',
          nutrition: 'Simple carbs between flights, caffeine pre-flight',
          recovery: 'Stay warm, move between attempts',
        },
      ],
      tips: [
        'Cut training volume by 50-70% during peak week',
        'Last heavy session should be 7 days before meet',
        'Practice opener weights only after Monday',
        'Reduce fiber 2-3 days out for easier weight cut',
        'Avoid trying new foods or supplements',
        'Get extra sleep - 8-9 hours minimum',
      ],
    },
    bodybuilding: {
      name: 'Bodybuilding Peak Week',
      icon: 'body' as const,
      color: 'purple',
      objective: 'Maximize muscle fullness while minimizing water retention',
      days: [
        {
          day: 'Sunday (7 days out)',
          training: 'Last full workout',
          volume: 'Normal',
          intensity: 'Moderate (pump work)',
          focus: 'Depletion workout (high reps)',
          nutrition: 'Carb depletion starts (very low carb)',
          recovery: 'Normal',
        },
        {
          day: 'Monday-Wednesday',
          training: 'Light depletion workouts',
          volume: 'Low (1-2 sets per muscle)',
          intensity: 'Light (pump focus)',
          focus: 'Deplete glycogen',
          nutrition: 'Very low carb (<50g), high protein, moderate fat',
          recovery: 'Sauna sessions optional',
        },
        {
          day: 'Thursday',
          training: 'Final light pump',
          volume: 'Minimal',
          intensity: 'Very light',
          focus: 'Last glycogen depletion',
          nutrition: 'Start carb load (moderate carbs)',
          recovery: 'Begin water manipulation',
        },
        {
          day: 'Friday',
          training: 'Posing practice only',
          volume: 'None',
          intensity: 'N/A',
          focus: 'Posing, breathing',
          nutrition: 'High carb (300-400g), low sodium',
          recovery: 'Reduce water intake',
        },
        {
          day: 'Saturday (show day)',
          training: 'Backstage pump',
          volume: 'Minimal (pump sets)',
          intensity: 'Light',
          focus: 'Fill muscles, stay pumped',
          nutrition: 'Simple carbs (gummy bears, rice cakes)',
          recovery: 'Stay warm, minimal water',
        },
      ],
      tips: [
        'Water manipulation: 10L Mon â†’ 8L Tue â†’ 6L Wed â†’ 4L Thu â†’ 2L Fri â†’ sips Sat',
        'Sodium manipulation: High Mon-Wed â†’ Low Thu-Sat',
        'Carb depletion first 3 days, then load last 2-3 days',
        'Practice peak week 4-6 weeks before show',
        'Every body responds differently - adjust based on practice',
        'Avoid new supplements or diuretics without experience',
      ],
    },
    performance: {
      name: 'Athletic Performance Peak',
      icon: 'fitness' as const,
      color: 'blue',
      objective: 'Maximize power, speed, and readiness for competition',
      days: [
        {
          day: 'Monday (7 days out)',
          training: 'Last hard training',
          volume: 'Moderate',
          intensity: 'High',
          focus: 'Speed/power work',
          nutrition: 'Normal calories',
          recovery: 'Standard',
        },
        {
          day: 'Tuesday-Wednesday',
          training: 'Light technical work',
          volume: 'Low (40-50% normal)',
          intensity: 'Moderate (70-80%)',
          focus: 'Skill refinement, speed',
          nutrition: 'Normal calories, high carb',
          recovery: 'Extra sleep, reduce volume',
        },
        {
          day: 'Thursday',
          training: 'Very light activation',
          volume: 'Minimal (20-30% normal)',
          intensity: 'Light-moderate (60-70%)',
          focus: 'Movement quality, fast reps',
          nutrition: 'High carb (load glycogen)',
          recovery: 'Massage, foam roll',
        },
        {
          day: 'Friday',
          training: 'Optional light movement',
          volume: 'Very minimal',
          intensity: 'Light (50-60%)',
          focus: 'Neural activation only',
          nutrition: 'High carb, moderate protein',
          recovery: 'Complete rest, visualization',
        },
        {
          day: 'Saturday (comp day)',
          training: 'COMPETE',
          volume: 'N/A',
          intensity: 'Max',
          focus: 'Execute performance',
          nutrition: 'Pre-comp meal 2-3h before, simple carbs 30min before',
          recovery: 'Dynamic warm-up, stay loose',
        },
      ],
      tips: [
        'Taper training volume but maintain some intensity',
        'Last high-intensity session 7 days out',
        'Reduce volume by 40-60% during taper',
        'Keep some fast/explosive work to maintain CNS',
        'Increase carb intake as volume decreases',
        'Prioritize sleep quality over quantity if nervous',
      ],
    },
  };

  const currentPlan = peakWeekPlans[goal as keyof typeof peakWeekPlans];

  const commonMistakes = [
    {
      mistake: 'Training too hard too late',
      fix: 'Last hard session should be 7+ days before comp',
      icon: 'close-circle' as const,
    },
    {
      mistake: 'Trying new supplements/foods',
      fix: 'Only use what you\'ve tested in training',
      icon: 'nutrition' as const,
    },
    {
      mistake: 'Sleeping poorly due to nerves',
      fix: 'Go to bed early, use relaxation techniques',
      icon: 'bed' as const,
    },
    {
      mistake: 'Cutting calories during taper',
      fix: 'Maintain calories as volume drops',
      icon: 'restaurant' as const,
    },
  ];

  return (
    <View className="flex-1 bg-zinc-950">
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1 ml-3">
            Peak Week
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          <View className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-6 mb-6">
            <Text className="text-white text-2xl font-bold mb-2">Peak Week</Text>
            <Text className="text-white opacity-90">
              Final week before competition
            </Text>
          </View>

          <View className="mb-6">
            <Text className="text-white font-bold mb-3">Competition Type</Text>
            <View className="flex-row gap-2">
              {goals.map((g) => (
                <TouchableOpacity
                  key={g}
                  onPress={() => setGoal(g)}
                  className={`flex-1 ${
                    goal === g ? 'bg-purple-500' : 'bg-zinc-800'
                  } rounded-xl px-3 py-3 border ${
                    goal === g ? 'border-purple-400' : 'border-zinc-700'
                  }`}
                >
                  <Text className="text-white font-bold text-center capitalize text-sm">
                    {g}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View className={`bg-${currentPlan.color}-500/10 rounded-xl p-5 mb-6 border border-${currentPlan.color}-500/30`}>
            <View className="flex-row items-center mb-3">
              <Ionicons name={currentPlan.icon} size={28} color={`#${currentPlan.color === 'red' ? 'ef4444' : currentPlan.color === 'purple' ? 'a855f7' : '3b82f6'}`} />
              <Text className={`text-${currentPlan.color}-400 font-bold text-xl ml-3`}>
                {currentPlan.name}
              </Text>
            </View>
            <View className="bg-zinc-900 rounded-xl p-3">
              <Text className="text-zinc-400 text-sm mb-1">Objective</Text>
              <Text className="text-white font-bold">{currentPlan.objective}</Text>
            </View>
          </View>

          <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
            <Text className="text-white font-bold text-lg mb-4">Daily Breakdown</Text>
            {currentPlan.days.map((day, idx) => (
              <View key={idx} className={`bg-${currentPlan.color}-500/10 rounded-xl p-4 mb-4 last:mb-0 border border-${currentPlan.color}-500/30`}>
                <Text className={`text-${currentPlan.color}-400 font-bold text-lg mb-3`}>
                  {day.day}
                </Text>

                <View className="bg-zinc-900 rounded-xl p-3 mb-2">
                  <Text className="text-white font-bold mb-2">Training</Text>
                  <Text className="text-zinc-300 mb-1">{day.training}</Text>
                  <View className="flex-row justify-between mt-2">
                    <View>
                      <Text className="text-zinc-400 text-xs">Volume</Text>
                      <Text className="text-white text-sm">{day.volume}</Text>
                    </View>
                    <View>
                      <Text className="text-zinc-400 text-xs">Intensity</Text>
                      <Text className="text-white text-sm">{day.intensity}</Text>
                    </View>
                  </View>
                  <Text className="text-primary/80 text-sm mt-2">Focus: {day.focus}</Text>
                </View>

                <View className="bg-primary/10 rounded-xl p-3 mb-2 border border-primary/30">
                  <Text className="text-primary font-bold text-sm mb-1">Nutrition</Text>
                  <Text className="text-primary/80 text-sm">{day.nutrition}</Text>
                </View>

                <View className="bg-purple-500/10 rounded-xl p-3 border border-purple-500/30">
                  <Text className="text-purple-400 font-bold text-sm mb-1">Recovery</Text>
                  <Text className="text-purple-300 text-sm">{day.recovery}</Text>
                </View>
              </View>
            ))}
          </View>

          <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
            <Text className="text-white font-bold text-lg mb-3">Peak Week Tips</Text>
            {currentPlan.tips.map((tip, idx) => (
              <View key={idx} className="flex-row items-start mb-2 last:mb-0">
                <Ionicons name="checkmark-circle" size={18} color="#9D12DE" />
                <Text className="text-zinc-300 ml-2 flex-1">{tip}</Text>
              </View>
            ))}
          </View>

          <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
            <Text className="text-white font-bold text-lg mb-4">Common Mistakes</Text>
            {commonMistakes.map((item, idx) => (
              <View key={idx} className="bg-zinc-800 rounded-xl p-4 mb-3 last:mb-0">
                <View className="flex-row items-center mb-2">
                  <Ionicons name={item.icon} size={20} color="#ef4444" />
                  <Text className="text-red-400 font-bold ml-2 flex-1">{item.mistake}</Text>
                </View>
                <Text className="text-primary text-sm">âœ“ {item.fix}</Text>
              </View>
            ))}
          </View>

          <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-6">
            <Text className="text-primary/80 font-bold mb-2">Remember</Text>
            <Text className="text-primary/60 text-sm mb-2">
              â€¢ Peak week can't fix poor preparation
            </Text>
            <Text className="text-primary/60 text-sm mb-2">
              â€¢ The work is done - now you just recover
            </Text>
            <Text className="text-primary/60 text-sm mb-2">
              â€¢ Trust your training and your plan
            </Text>
            <Text className="text-primary/60 text-sm">
              â€¢ When in doubt, do LESS not more
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}


