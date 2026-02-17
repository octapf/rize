import React, { useState } from 'react';
import { Text } from '@/components/ui/Text';
import { View, TouchableOpacity, ScrollView, TextInput } from 'react-native';;
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function AttemptSelection() {
  const [lift, setLift] = useState('squat');
  const [oneRM, setOneRM] = useState('140');
  const [targetTotal, setTargetTotal] = useState('400');

  const lifts = ['squat', 'bench', 'deadlift'];

  const calculateAttempts = (rm: number) => {
    return {
      opener: Math.round(rm * 0.9 * 2) / 2, // 90%, rounded to nearest 0.5kg
      second: Math.round(rm * 0.95 * 2) / 2, // 95%
      third: Math.round(rm * 1.025 * 2) / 2, // 102.5% (PR attempt)
    };
  };

  const attempts = oneRM ? calculateAttempts(parseFloat(oneRM)) : null;

  const strategies = [
    {
      name: 'Conservative (9/9 Strategy)',
      icon: 'shield-checkmark' as const,
      color: 'primary',
      description: 'Maximize total, minimize risk',
      attempts: oneRM ? {
        opener: Math.round(parseFloat(oneRM) * 0.92 * 2) / 2,
        second: Math.round(parseFloat(oneRM) * 0.97 * 2) / 2,
        third: Math.round(parseFloat(oneRM) * 1.01 * 2) / 2,
      } : null,
      bestFor: 'First meet, qualifying total needed, team competition',
    },
    {
      name: 'Aggressive (PR Hunt)',
      icon: 'trophy' as const,
      color: 'red',
      description: 'Go for max PRs, higher risk',
      attempts: oneRM ? {
        opener: Math.round(parseFloat(oneRM) * 0.9 * 2) / 2,
        second: Math.round(parseFloat(oneRM) * 0.98 * 2) / 2,
        third: Math.round(parseFloat(oneRM) * 1.05 * 2) / 2,
      } : null,
      bestFor: 'Experienced lifter, training went well, feeling strong',
    },
    {
      name: 'Balanced (Standard)',
      icon: 'analytics' as const,
      color: 'blue',
      description: 'Conservative opener, push on 2nd/3rd',
      attempts: oneRM ? {
        opener: Math.round(parseFloat(oneRM) * 0.9 * 2) / 2,
        second: Math.round(parseFloat(oneRM) * 0.95 * 2) / 2,
        third: Math.round(parseFloat(oneRM) * 1.025 * 2) / 2,
      } : null,
      bestFor: 'Most lifters, standard approach',
    },
  ];

  const attemptRules = [
    {
      rule: 'Opener = Confidence Builder',
      explanation: 'Should hit 90-92.5% even on worst day',
      icon: 'checkmark-circle' as const,
    },
    {
      rule: 'Second Attempt = Build Total',
      explanation: 'Either match PR or small jump (2.5-5kg)',
      icon: 'trending-up' as const,
    },
    {
      rule: 'Third Attempt = Go for Glory',
      explanation: 'New PR if first two felt good. Safe total if not.',
      icon: 'trophy' as const,
    },
  ];

  const jumpGuidelines = {
    opener_to_second: '2.5-5kg if opener was perfect, 5-7.5kg if easy',
    second_to_third: '2.5-5kg typically, up to 10kg if feeling amazing',
    emergency: 'Can take minimal jump (2.5kg) if struggling',
  };

  return (
    <View className="flex-1 bg-zinc-950">
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1 ml-3">
            Attempt Selection
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          <View className="bg-gradient-to-r from-red-500 to-amber-500 rounded-xl p-6 mb-6">
            <Text className="text-white text-2xl font-bold mb-2">Plan Attempts</Text>
            <Text className="text-white opacity-90">
              Powerlifting meet strategy
            </Text>
          </View>

          <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
            <Text className="text-white font-bold text-lg mb-3">Select Lift</Text>
            <View className="flex-row gap-2">
              {lifts.map((l) => (
                <TouchableOpacity
                  key={l}
                  onPress={() => setLift(l)}
                  className={`flex-1 ${
                    lift === l ? 'bg-red-500' : 'bg-zinc-800'
                  } rounded-xl px-3 py-3 border ${
                    lift === l ? 'border-red-400' : 'border-zinc-700'
                  }`}
                >
                  <Text className="text-white font-bold text-center capitalize">
                    {l}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
            <Text className="text-white font-bold text-lg mb-3">
              Current {lift.charAt(0).toUpperCase() + lift.slice(1)} 1RM (kg)
            </Text>
            <TextInput
              className="bg-zinc-800 text-white text-2xl font-bold rounded-xl px-4 py-3 border border-zinc-700 text-center"
              keyboardType="numeric"
              value={oneRM}
              onChangeText={setOneRM}
              placeholder="140"
              placeholderTextColor="#52525b"
            />
          </View>

          {attempts && (
            <View className="bg-primary/10 rounded-xl p-6 mb-6 border border-primary/30">
              <Text className="text-primary/80 font-bold text-lg mb-4">Recommended Attempts</Text>
              
              <View className="bg-zinc-900 rounded-xl p-4 mb-3">
                <View className="flex-row justify-between items-center">
                  <View>
                    <Text className="text-primary font-bold mb-1">Opener (90%)</Text>
                    <Text className="text-zinc-400 text-sm">Confidence builder</Text>
                  </View>
                  <Text className="text-white text-3xl font-bold">{attempts.opener}kg</Text>
                </View>
              </View>

              <View className="bg-zinc-900 rounded-xl p-4 mb-3">
                <View className="flex-row justify-between items-center">
                  <View>
                    <Text className="text-primary/80 font-bold mb-1">Second (95%)</Text>
                    <Text className="text-zinc-400 text-sm">Build your total</Text>
                  </View>
                  <Text className="text-white text-3xl font-bold">{attempts.second}kg</Text>
                </View>
              </View>

              <View className="bg-zinc-900 rounded-xl p-4">
                <View className="flex-row justify-between items-center">
                  <View>
                    <Text className="text-red-400 font-bold mb-1">Third (102.5%)</Text>
                    <Text className="text-zinc-400 text-sm">New PR attempt</Text>
                  </View>
                  <Text className="text-white text-3xl font-bold">{attempts.third}kg</Text>
                </View>
              </View>
            </View>
          )}

          <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
            <Text className="text-white font-bold text-lg mb-4">Strategy Options</Text>
            {strategies.map((strategy, idx) => (
              <View key={idx} className={`bg-${strategy.color}-500/10 rounded-xl p-4 mb-3 last:mb-0 border border-${strategy.color}-500/30`}>
                <View className="flex-row items-center mb-2">
                  <Ionicons name={strategy.icon} size={24} color={`#${strategy.color === 'primary' ? '9D12DE' : strategy.color === 'red' ? 'ef4444' : '3b82f6'}`} />
                  <Text className={`text-${strategy.color}-400 font-bold text-lg ml-2`}>
                    {strategy.name}
                  </Text>
                </View>
                <Text className="text-zinc-300 mb-3">{strategy.description}</Text>
                
                {strategy.attempts && (
                  <View className="bg-zinc-900 rounded-xl p-3 mb-2">
                    <View className="flex-row justify-between mb-1">
                      <Text className="text-zinc-400 text-sm">Opener:</Text>
                      <Text className="text-white font-bold">{strategy.attempts.opener}kg</Text>
                    </View>
                    <View className="flex-row justify-between mb-1">
                      <Text className="text-zinc-400 text-sm">Second:</Text>
                      <Text className="text-white font-bold">{strategy.attempts.second}kg</Text>
                    </View>
                    <View className="flex-row justify-between">
                      <Text className="text-zinc-400 text-sm">Third:</Text>
                      <Text className="text-white font-bold">{strategy.attempts.third}kg</Text>
                    </View>
                  </View>
                )}

                <Text className="text-zinc-400 text-sm">Best for: {strategy.bestFor}</Text>
              </View>
            ))}
          </View>

          <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
            <Text className="text-white font-bold text-lg mb-4">The 3 Attempt Rules</Text>
            {attemptRules.map((rule, idx) => (
              <View key={idx} className="bg-zinc-800 rounded-xl p-4 mb-3 last:mb-0">
                <View className="flex-row items-center mb-2">
                  <Ionicons name={rule.icon} size={20} color="#9D12DE" />
                  <Text className="text-primary font-bold ml-2">{rule.rule}</Text>
                </View>
                <Text className="text-zinc-300 text-sm">{rule.explanation}</Text>
              </View>
            ))}
          </View>

          <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
            <Text className="text-white font-bold text-lg mb-4">Jump Guidelines</Text>
            {Object.entries(jumpGuidelines).map(([key, value]) => (
              <View key={key} className="mb-3 last:mb-0">
                <Text className="text-primary/80 font-bold capitalize mb-1">
                  {key.replace(/_/g, ' → ').replace('to', 'to')}
                </Text>
                <Text className="text-zinc-300 text-sm">{value}</Text>
              </View>
            ))}
          </View>

          <View className="bg-red-500/10 rounded-xl p-4 border border-red-500/30 mb-6">
            <Text className="text-red-400 font-bold mb-2">Critical Meet Day Rules</Text>
            <Text className="text-red-300 text-sm mb-2">
              • Never change attempt in warm-up room due to nerves
            </Text>
            <Text className="text-red-300 text-sm mb-2">
              • Have coach/handler make attempt selections
            </Text>
            <Text className="text-red-300 text-sm mb-2">
              • If opener feels hard, your 1RM estimate was wrong
            </Text>
            <Text className="text-red-300 text-sm">
              • 9/9 is better than bombing out chasing PRs
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

