import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

type Phase = 'accumulation' | 'intensification' | 'realization' | 'deload';

export default function PeriodizationPlans() {
  const [selectedPlan, setSelectedPlan] = useState('linear');

  const plans = [
    {
      id: 'linear',
      name: 'Linear Periodization',
      bestFor: 'Beginners, general strength',
      duration: '12 weeks',
      color: 'blue',
      icon: 'trending-up' as const,
      phases: [
        { name: 'Hypertrophy', weeks: '1-4', sets: '3-5', reps: '8-12', intensity: '65-75%', rest: '60-90s' },
        { name: 'Strength', weeks: '5-8', sets: '4-6', reps: '4-6', intensity: '80-85%', rest: '2-3min' },
        { name: 'Power/Peak', weeks: '9-11', sets: '3-5', reps: '1-3', intensity: '90-95%', rest: '3-5min' },
        { name: 'Deload', weeks: '12', sets: '2-3', reps: '5-8', intensity: '60%', rest: '90s' },
      ],
      pros: [
        'Simple to follow',
        'Clear progression',
        'Good for beginners',
        'Easy to track',
      ],
      cons: [
        'Neglects qualities for weeks',
        'Detraining in early phases',
        'Not optimal for advanced',
      ],
    },
    {
      id: 'block',
      name: 'Block Periodization',
      bestFor: 'Intermediate/Advanced lifters',
      duration: '12 weeks',
      color: 'purple',
      icon: 'apps' as const,
      phases: [
        { name: 'Accumulation', weeks: '1-3', sets: '4-6', reps: '6-10', intensity: '70-75%', rest: '90s' },
        { name: 'Intensification', weeks: '4-6', sets: '3-5', reps: '3-5', intensity: '80-87%', rest: '2-3min' },
        { name: 'Realization', weeks: '7-9', sets: '3-4', reps: '1-3', intensity: '90-95%', rest: '3-5min' },
        { name: 'Deload', weeks: '10', sets: '2-3', reps: '6-8', intensity: '65%', rest: '90s' },
        { name: 'Repeat', weeks: '11-12', sets: '-', reps: '-', intensity: 'Cycle repeats', rest: '-' },
      ],
      pros: [
        'Maintains all qualities',
        'Better for advanced',
        'Sport-specific',
        'Prevents detraining',
      ],
      cons: [
        'More complex',
        'Requires experience',
        'Harder to program',
      ],
    },
    {
      id: 'dups',
      name: 'Daily Undulating (DUP)',
      bestFor: 'Variety, frequent practice',
      duration: 'Ongoing',
      color: 'emerald',
      icon: 'sync' as const,
      phases: [
        { name: 'Day 1: Hypertrophy', weeks: 'Every week', sets: '4x10', reps: '10', intensity: '70%', rest: '90s' },
        { name: 'Day 2: Strength', weeks: 'Every week', sets: '5x5', reps: '5', intensity: '85%', rest: '3min' },
        { name: 'Day 3: Power', weeks: 'Every week', sets: '6x3', reps: '3', intensity: '80%', rest: '3min' },
      ],
      pros: [
        'Frequent practice',
        'Less boring',
        'All qualities trained weekly',
        'Good for natural lifters',
      ],
      cons: [
        'Can be fatiguing',
        'Requires good recovery',
        'Not for rank beginners',
      ],
    },
    {
      id: 'conjugate',
      name: 'Conjugate Method',
      bestFor: 'Powerlifters, advanced',
      duration: 'Ongoing',
      color: 'amber',
      icon: 'flash' as const,
      phases: [
        { name: 'Max Effort Day', weeks: 'Weekly', sets: 'Work to 1-3RM', reps: '1-3', intensity: '90-100%', rest: '3-5min' },
        { name: 'Dynamic Effort Day', weeks: 'Weekly', sets: '8-12x3', reps: '3', intensity: '50-70%', rest: '45-60s' },
        { name: 'Repetition Method', weeks: 'Both days', sets: '3-5x8-12', reps: '8-12', intensity: '60-80%', rest: '90s' },
      ],
      pros: [
        'Addresses all qualities',
        'Prevents accommodation',
        'Used by elite lifters',
        'Constant variation',
      ],
      cons: [
        'Very complex',
        'Requires deep knowledge',
        'Easy to mess up',
        'Advanced only',
      ],
    },
  ];

  const currentPlan = plans.find((p) => p.id === selectedPlan)!;

  return (
    <View className="flex-1 bg-zinc-950">
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1 ml-3">
            Periodization Plans
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          <View className="bg-gradient-to-r from-primary to-[#7D0EBE] rounded-xl p-6 mb-6">
            <Text className="text-white text-2xl font-bold mb-2">Training Cycles</Text>
            <Text className="text-white opacity-90">
              Structure long-term progress
            </Text>
          </View>

          <View className="mb-6">
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View className="flex-row gap-3">
                {plans.map((plan) => (
                  <TouchableOpacity
                    key={plan.id}
                    onPress={() => setSelectedPlan(plan.id)}
                    className={`${
                      selectedPlan === plan.id
                        ? `bg-${plan.color}-500`
                        : 'bg-zinc-800'
                    } rounded-xl px-4 py-3 border ${
                      selectedPlan === plan.id
                        ? `border-${plan.color}-400`
                        : 'border-zinc-700'
                    }`}
                  >
                    <View className="flex-row items-center">
                      <Ionicons name={plan.icon} size={20} color="white" />
                      <Text className="text-white font-bold ml-2 text-sm">{plan.name}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>

          <View className={`bg-${currentPlan.color}-500/10 rounded-xl p-5 mb-6 border border-${currentPlan.color}-500/30`}>
            <View className="flex-row items-center mb-3">
              <Ionicons name={currentPlan.icon} size={28} color={`#${currentPlan.color === 'blue' ? '3b82f6' : currentPlan.color === 'purple' ? 'a855f7' : currentPlan.color === 'emerald' ? '10b981' : 'f59e0b'}`} />
              <Text className={`text-${currentPlan.color}-400 font-bold text-2xl ml-3`}>
                {currentPlan.name}
              </Text>
            </View>

            <View className="flex-row gap-3 mb-3">
              <View className="flex-1 bg-zinc-900 rounded-xl p-3">
                <Text className="text-zinc-400 text-xs mb-1">Best For</Text>
                <Text className="text-white font-bold text-sm">{currentPlan.bestFor}</Text>
              </View>
              <View className="bg-zinc-900 rounded-xl px-4 py-3">
                <Text className="text-zinc-400 text-xs mb-1">Duration</Text>
                <Text className="text-white font-bold">{currentPlan.duration}</Text>
              </View>
            </View>
          </View>

          <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
            <Text className="text-white font-bold text-lg mb-4">Phase Structure</Text>
            {currentPlan.phases.map((phase, idx) => (
              <View
                key={idx}
                className={`bg-${currentPlan.color}-500/10 rounded-xl p-4 mb-3 last:mb-0 border border-${currentPlan.color}-500/30`}
              >
                <Text className={`text-${currentPlan.color}-400 font-bold text-lg mb-2`}>
                  {phase.name}
                </Text>
                <View className="space-y-1.5">
                  <View className="flex-row justify-between">
                    <Text className="text-zinc-400 text-sm">Weeks:</Text>
                    <Text className="text-white font-bold">{phase.weeks}</Text>
                  </View>
                  <View className="flex-row justify-between">
                    <Text className="text-zinc-400 text-sm">Sets Ã— Reps:</Text>
                    <Text className="text-white font-bold">{phase.sets} Ã— {phase.reps}</Text>
                  </View>
                  <View className="flex-row justify-between">
                    <Text className="text-zinc-400 text-sm">Intensity:</Text>
                    <Text className={`text-${currentPlan.color}-400 font-bold`}>{phase.intensity}</Text>
                  </View>
                  <View className="flex-row justify-between">
                    <Text className="text-zinc-400 text-sm">Rest:</Text>
                    <Text className="text-white font-bold">{phase.rest}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>

          <View className="bg-primary/10 rounded-xl p-5 mb-4 border border-primary/30">
            <Text className="text-primary font-bold mb-3">Pros</Text>
            {currentPlan.pros.map((pro, idx) => (
              <View key={idx} className="flex-row items-center mb-2 last:mb-0">
                <Ionicons name="checkmark-circle" size={18} color="#9D12DE" />
                <Text className="text-primary/80 ml-2">{pro}</Text>
              </View>
            ))}
          </View>

          <View className="bg-red-500/10 rounded-xl p-5 mb-6 border border-red-500/30">
            <Text className="text-red-400 font-bold mb-3">Cons</Text>
            {currentPlan.cons.map((con, idx) => (
              <View key={idx} className="flex-row items-center mb-2 last:mb-0">
                <Ionicons name="close-circle" size={18} color="#ef4444" />
                <Text className="text-red-300 ml-2">{con}</Text>
              </View>
            ))}
          </View>

          <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-6">
            <Text className="text-primary/80 font-bold mb-2">Key Principles</Text>
            <Text className="text-primary/60 text-sm">
              â€¢ Progressive overload is mandatory{'\n'}
              â€¢ Deload every 3-6 weeks{'\n'}
              â€¢ Track all lifts meticulously{'\n'}
              â€¢ Adjust based on feedback{'\n'}
              â€¢ Consistency &gt; perfection
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}



