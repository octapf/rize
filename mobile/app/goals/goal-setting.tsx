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

export default function GoalSetting() {
  const [goal, setGoal] = useState('');
  const [deadline, setDeadline] = useState('');

  const [smartGoal, setSmartGoal] = useState({
    specific: '',
    measurable: '',
    achievable: '',
    relevant: '',
    timeBound: '',
  });

  const goalExamples = [
    {
      category: 'Strength Goals',
      icon: 'barbell' as const,
      color: 'blue',
      examples: [
        { bad: 'Get stronger', good: 'Squat 150kg for 1 rep by Dec 31, 2024', why: 'Specific weight, specific date' },
        { bad: 'Bench more', good: 'Bench 100kg for 5 reps within 12 weeks', why: 'Clear target and timeline' },
        { bad: 'Increase deadlift', good: 'Pull 180kg conventional deadlift by March 1st', why: 'Exact weight and deadline' },
      ],
    },
    {
      category: 'Body Composition',
      icon: 'body' as const,
      color: 'emerald',
      examples: [
        { bad: 'Lose weight', good: 'Reduce body fat from 20% to 15% in 16 weeks', why: 'Measurable metric and timeframe' },
        { bad: 'Get shredded', good: 'Maintain 75kg at 12% body fat by summer', why: 'Specific numbers and season' },
        { bad: 'Build muscle', good: 'Gain 5kg lean mass while staying under 15% BF in 6 months', why: 'Dual metrics with constraint' },
      ],
    },
    {
      category: 'Performance Goals',
      icon: 'flash' as const,
      color: 'purple',
      examples: [
        { bad: 'Run faster', good: '5K in under 22 minutes by next race (10 weeks)', why: 'Specific time and event' },
        { bad: 'More pullups', good: '15 strict pullups in one set by end of quarter', why: 'Exact number and timeline' },
        { bad: 'Better cardio', good: 'Row 2000m in under 7:30 within 8 weeks', why: 'Precise target and duration' },
      ],
    },
    {
      category: 'Habit Goals',
      icon: 'checkmark-circle' as const,
      color: 'amber',
      examples: [
        { bad: 'Train more', good: 'Train 4x per week for 12 consecutive weeks', why: 'Specific frequency and duration' },
        { bad: 'Eat better', good: 'Hit 180g protein daily for 30 days', why: 'Exact macro and time period' },
        { bad: 'Sleep more', good: 'Get 7.5+ hours sleep 6 nights per week for 8 weeks', why: 'Clear metric and frequency' },
      ],
    },
  ];

  const smartFramework = [
    {
      letter: 'S',
      word: 'Specific',
      question: 'What exactly do you want to achieve?',
      example: 'Squat 140kg for 1 rep (not just "get stronger")',
      color: 'blue',
    },
    {
      letter: 'M',
      word: 'Measurable',
      question: 'How will you track progress?',
      example: 'Test 1RM monthly, track all working sets',
      color: 'emerald',
    },
    {
      letter: 'A',
      word: 'Achievable',
      question: 'Is this realistic given your starting point?',
      example: 'Current 1RM is 120kg, +20kg in 16 weeks = realistic',
      color: 'purple',
    },
    {
      letter: 'R',
      word: 'Relevant',
      question: 'Why does this goal matter to you?',
      example: 'Hitting this strengthens legs for sports performance',
      color: 'amber',
    },
    {
      letter: 'T',
      word: 'Time-bound',
      question: 'When will you achieve this by?',
      example: 'By December 31st, 2024 (16 weeks from now)',
      color: 'red',
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
            Goal Setting
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          <View className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl p-6 mb-6">
            <Text className="text-white text-2xl font-bold mb-2">SMART Goals</Text>
            <Text className="text-white opacity-90">
              Set goals that you'll actually achieve
            </Text>
          </View>

          <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
            <Text className="text-white font-bold text-lg mb-4">SMART Framework</Text>
            {smartFramework.map((item, idx) => (
              <View
                key={idx}
                className={`bg-${item.color}-500/10 rounded-xl p-4 mb-3 last:mb-0 border border-${item.color}-500/30`}
              >
                <View className="flex-row items-center mb-2">
                  <View className={`w-10 h-10 rounded-full bg-${item.color}-500 items-center justify-center`}>
                    <Text className="text-white font-bold text-xl">{item.letter}</Text>
                  </View>
                  <Text className={`text-${item.color}-400 font-bold text-xl ml-3`}>
                    {item.word}
                  </Text>
                </View>
                <Text className="text-white font-bold mb-1">{item.question}</Text>
                <Text className="text-zinc-400 text-sm italic">{item.example}</Text>
              </View>
            ))}
          </View>

          {goalExamples.map((category, idx) => (
            <View
              key={idx}
              className={`bg-${category.color}-500/10 rounded-xl p-5 mb-6 border border-${category.color}-500/30`}
            >
              <View className="flex-row items-center mb-4">
                <Ionicons name={category.icon} size={24} color={`#${category.color === 'blue' ? '3b82f6' : category.color === 'emerald' ? '10b981' : category.color === 'purple' ? 'a855f7' : 'f59e0b'}`} />
                <Text className={`text-${category.color}-400 font-bold text-lg ml-2`}>
                  {category.category}
                </Text>
              </View>

              {category.examples.map((example, exIdx) => (
                <View
                  key={exIdx}
                  className="bg-zinc-900 rounded-xl p-4 mb-3 last:mb-0"
                >
                  <View className="flex-row items-start mb-2">
                    <Ionicons name="close-circle" size={18} color="#ef4444" />
                    <Text className="text-red-400 ml-2 flex-1 line-through">{example.bad}</Text>
                  </View>
                  <View className="flex-row items-start mb-2">
                    <Ionicons name="checkmark-circle" size={18} color="#10b981" />
                    <Text className="text-emerald-400 ml-2 flex-1 font-bold">{example.good}</Text>
                  </View>
                  <View className={`bg-${category.color}-500/20 rounded-lg p-2 border border-${category.color}-500/40`}>
                    <Text className={`text-${category.color}-300 text-xs`}>
                      ✓ {example.why}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          ))}

          <View className="bg-blue-500/10 rounded-xl p-4 border border-blue-500/30 mb-6">
            <Text className="text-blue-400 font-bold mb-2">Goal-Setting Tips</Text>
            <Text className="text-blue-300 text-sm">
              • Write goals down physically{'\n'}
              • Share with accountability partner{'\n'}
              • Review weekly{'\n'}
              • Celebrate milestones{'\n'}
              • Adjust if needed, don't quit{'\n'}
              • One major goal at a time
            </Text>
          </View>

          <View className="bg-emerald-500/10 rounded-xl p-4 border border-emerald-500/30 mb-6">
            <Text className="text-emerald-400 font-bold mb-2">Breaking Down Goals</Text>
            <Text className="text-emerald-300 text-sm mb-3">
              Example: Squat 150kg by Dec 31 (16 weeks)
            </Text>
            <View className="space-y-2">
              <View className="bg-zinc-900 rounded-lg p-2">
                <Text className="text-white text-sm">
                  <Text className="font-bold">Weekly:</Text> Add 1.25kg to working sets each week
                </Text>
              </View>
              <View className="bg-zinc-900 rounded-lg p-2">
                <Text className="text-white text-sm">
                  <Text className="font-bold">Monthly:</Text> Test estimated 1RM (should be +5kg/month)
                </Text>
              </View>
              <View className="bg-zinc-900 rounded-lg p-2">
                <Text className="text-white text-sm">
                  <Text className="font-bold">Daily:</Text> Train legs 2x/week, protein 2g/kg
                </Text>
              </View>
            </View>
          </View>

          <View className="bg-amber-500/10 rounded-xl p-4 border border-amber-500/30 mb-6">
            <Text className="text-amber-400 font-bold mb-2">Common Mistakes</Text>
            <View className="space-y-2">
              <Text className="text-amber-300 text-sm">
                ❌ Too many goals at once{'\n'}
                ❌ Unrealistic timelines{'\n'}
                ❌ Vague/unmeasurable targets{'\n'}
                ❌ No plan to achieve them{'\n'}
                ❌ Not tracking progress
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
