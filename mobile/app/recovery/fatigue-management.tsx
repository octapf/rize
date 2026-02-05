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

export default function FatigueManagement() {
  const [sleepHours, setSleepHours] = useState('7');
  const [stressLevel, setStressLevel] = useState('5');
  const [trainingLoad, setTrainingLoad] = useState('7');

  const fatigueScore = () => {
    const sleep = parseFloat(sleepHours) || 7;
    const stress = parseFloat(stressLevel) || 5;
    const load = parseFloat(trainingLoad) || 7;

    const sleepScore = Math.min((sleep / 8) * 100, 100);
    const stressScore = ((10 - stress) / 10) * 100;
    const loadScore = ((10 - load) / 10) * 100;

    return Math.round((sleepScore * 0.4 + stressScore * 0.3 + loadScore * 0.3));
  };

  const score = fatigueScore();

  const getScoreColor = () => {
    if (score >= 70) return 'emerald';
    if (score >= 50) return 'blue';
    if (score >= 30) return 'amber';
    return 'red';
  };

  const getRecommendation = () => {
    if (score >= 70) {
      return {
        level: 'Low Fatigue',
        action: 'Train normally',
        color: 'emerald',
        details: [
          'Continue current program',
          'Can push intensity',
          'Good time for PRs',
          'Maintain recovery habits',
        ],
      };
    } else if (score >= 50) {
      return {
        level: 'Moderate Fatigue',
        action: 'Moderate training',
        color: 'blue',
        details: [
          'Reduce volume 10-20%',
          'Avoid max efforts',
          'Focus on technique',
          'Extra sleep tonight',
        ],
      };
    } else if (score >= 30) {
      return {
        level: 'High Fatigue',
        action: 'Light training only',
        color: 'amber',
        details: [
          'Cut volume by 50%',
          'No heavy lifting',
          'Active recovery focus',
          'Address sleep/stress',
        ],
      };
    } else {
      return {
        level: 'Extreme Fatigue',
        action: 'Rest day required',
        color: 'red',
        details: [
          'Take the day off',
          'Light walk maximum',
          'Prioritize sleep',
          'Consider deload week',
        ],
      };
    }
  };

  const recommendation = getRecommendation();
  const scoreColor = getScoreColor();

  const fatigueStrategies = [
    {
      category: 'Sleep Optimization',
      icon: 'moon' as const,
      color: 'purple',
      strategies: [
        { tip: 'Aim for 7-9 hours nightly', priority: 'Critical' },
        { tip: 'Same sleep/wake schedule', priority: 'High' },
        { tip: 'Dark, cool room (65-68°F)', priority: 'High' },
        { tip: 'No screens 1hr before bed', priority: 'Medium' },
        { tip: 'Magnesium supplement', priority: 'Medium' },
      ],
    },
    {
      category: 'Training Management',
      icon: 'barbell' as const,
      color: 'blue',
      strategies: [
        { tip: 'Periodize volume/intensity', priority: 'Critical' },
        { tip: 'Deload every 4-6 weeks', priority: 'Critical' },
        { tip: 'Track session RPE', priority: 'High' },
        { tip: 'Reduce junk volume', priority: 'High' },
        { tip: 'Autoregulate based on feel', priority: 'Medium' },
      ],
    },
    {
      category: 'Nutrition',
      icon: 'nutrition' as const,
      color: 'emerald',
      strategies: [
        { tip: 'Adequate calories (not deficit)', priority: 'Critical' },
        { tip: 'Protein 1.6-2.2g/kg', priority: 'Critical' },
        { tip: 'Carbs around training', priority: 'High' },
        { tip: 'Hydration: 3-4L daily', priority: 'High' },
        { tip: 'Micronutrient coverage', priority: 'Medium' },
      ],
    },
    {
      category: 'Stress Reduction',
      icon: 'heart' as const,
      color: 'red',
      strategies: [
        { tip: 'Daily 10min meditation', priority: 'High' },
        { tip: 'Breathing exercises', priority: 'High' },
        { tip: 'Limit caffeine intake', priority: 'Medium' },
        { tip: 'Time in nature/sunlight', priority: 'Medium' },
        { tip: 'Social connection', priority: 'Medium' },
      ],
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
            Fatigue Management
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          <View className="bg-gradient-to-r from-purple-500 to-red-500 rounded-xl p-6 mb-6">
            <Text className="text-white text-2xl font-bold mb-2">Recovery Score</Text>
            <Text className="text-white opacity-90">
              Assess and manage fatigue
            </Text>
          </View>

          <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
            <Text className="text-white font-bold text-lg mb-4">Quick Assessment</Text>

            <View className="space-y-4">
              <View>
                <Text className="text-zinc-400 mb-2">Hours of Sleep</Text>
                <TextInput
                  className="bg-zinc-800 text-white rounded-xl px-4 py-3 border border-zinc-700 text-lg"
                  value={sleepHours}
                  onChangeText={setSleepHours}
                  keyboardType="numeric"
                  placeholder="7"
                  placeholderTextColor="#71717a"
                />
              </View>

              <View>
                <Text className="text-zinc-400 mb-2">Stress Level (1-10)</Text>
                <TextInput
                  className="bg-zinc-800 text-white rounded-xl px-4 py-3 border border-zinc-700 text-lg"
                  value={stressLevel}
                  onChangeText={setStressLevel}
                  keyboardType="numeric"
                  placeholder="5"
                  placeholderTextColor="#71717a"
                />
              </View>

              <View>
                <Text className="text-zinc-400 mb-2">Training Load (1-10)</Text>
                <TextInput
                  className="bg-zinc-800 text-white rounded-xl px-4 py-3 border border-zinc-700 text-lg"
                  value={trainingLoad}
                  onChangeText={setTrainingLoad}
                  keyboardType="numeric"
                  placeholder="7"
                  placeholderTextColor="#71717a"
                />
              </View>
            </View>
          </View>

          <View className={`bg-${scoreColor}-500/10 rounded-xl p-6 mb-6 border border-${scoreColor}-500/30`}>
            <Text className="text-zinc-400 text-center mb-2">Recovery Score</Text>
            <Text className={`text-${scoreColor}-400 font-bold text-6xl text-center mb-4`}>
              {score}
            </Text>
            <View className="bg-zinc-900 rounded-full h-3 mb-4">
              <View
                className={`bg-${scoreColor}-500 rounded-full h-3`}
                style={{ width: `${score}%` }}
              />
            </View>

            <View className="bg-zinc-900 rounded-xl p-4">
              <Text className={`text-${scoreColor}-400 font-bold text-xl mb-1`}>
                {recommendation.level}
              </Text>
              <Text className="text-white text-lg font-bold mb-3">
                â†’ {recommendation.action}
              </Text>
              {recommendation.details.map((detail, idx) => (
                <View key={idx} className="flex-row items-center mb-1">
                  <Ionicons name="checkmark" size={16} color={`#${scoreColor === 'emerald' ? '10b981' : scoreColor === 'blue' ? '3b82f6' : scoreColor === 'amber' ? 'f59e0b' : 'ef4444'}`} />
                  <Text className="text-zinc-300 ml-2 text-sm">{detail}</Text>
                </View>
              ))}
            </View>
          </View>

          {fatigueStrategies.map((strategy, idx) => (
            <View
              key={idx}
              className={`bg-${strategy.color}-500/10 rounded-xl p-5 mb-6 border border-${strategy.color}-500/30`}
            >
              <View className="flex-row items-center mb-4">
                <Ionicons name={strategy.icon} size={24} color={`#${strategy.color === 'purple' ? 'a855f7' : strategy.color === 'blue' ? '3b82f6' : strategy.color === 'emerald' ? '10b981' : 'ef4444'}`} />
                <Text className={`text-${strategy.color}-400 font-bold text-lg ml-2`}>
                  {strategy.category}
                </Text>
              </View>

              {strategy.strategies.map((item, itemIdx) => (
                <View
                  key={itemIdx}
                  className="flex-row items-center justify-between py-2 border-b border-zinc-800 last:border-0"
                >
                  <Text className="text-white flex-1">{item.tip}</Text>
                  <View className={`bg-${strategy.color}-500/20 rounded-full px-2 py-1 border border-${strategy.color}-500/40 ml-2`}>
                    <Text className={`text-${strategy.color}-400 text-xs font-bold`}>
                      {item.priority}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          ))}

          <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-6">
            <Text className="text-primary/80 font-bold mb-2">Remember</Text>
            <Text className="text-primary/60 text-sm">
              Fatigue is cumulative. Small daily habits compound over time. Recovery IS training.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

