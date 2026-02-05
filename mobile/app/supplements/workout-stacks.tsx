import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function WorkoutStacks() {
  const [selectedType, setSelectedType] = useState<string>('preworkout');

  const types = [
    { key: 'preworkout', label: 'Pre-Workout', icon: 'flash', color: 'amber' },
    { key: 'postworkout', label: 'Post-Workout', icon: 'nutrition', color: 'blue' },
  ];

  const preWorkoutStacks = [
    {
      name: 'The Pump Stack',
      goal: 'Maximum muscle pumps',
      totalCost: '$1.20/serving',
      supplements: [
        { name: 'Citrulline Malate', dose: '8g', cost: '$0.40' },
        { name: 'Beta-Alanine', dose: '5g', cost: '$0.25' },
        { name: 'Caffeine', dose: '300mg', cost: '$0.10' },
        { name: 'Taurine', dose: '2g', cost: '$0.20' },
        { name: 'Sodium (Pink Salt)', dose: '500mg', cost: '$0.05' },
      ],
      timing: '30-45 min pre-workout on empty stomach',
      benefits: ['Insane pumps', 'Increased endurance', 'Better focus'],
      color: 'emerald',
    },
    {
      name: 'The Focus Stack',
      goal: 'Mental clarity & concentration',
      totalCost: '$1.80/serving',
      supplements: [
        { name: 'Caffeine', dose: '200mg', cost: '$0.10' },
        { name: 'L-Theanine', dose: '200mg', cost: '$0.30' },
        { name: 'Alpha-GPC', dose: '300mg', cost: '$0.80' },
        { name: 'Tyrosine', dose: '1.5g', cost: '$0.40' },
        { name: 'Rhodiola Rosea', dose: '500mg', cost: '$0.20' },
      ],
      timing: '45-60 min pre-workout',
      benefits: ['Laser focus', 'No jitters', 'Mind-muscle connection'],
      color: 'purple',
    },
    {
      name: 'The Performance Stack',
      goal: 'All-around performance',
      totalCost: '$1.50/serving',
      supplements: [
        { name: 'Caffeine', dose: '300mg', cost: '$0.10' },
        { name: 'Citrulline', dose: '6g', cost: '$0.30' },
        { name: 'Beta-Alanine', dose: '3g', cost: '$0.15' },
        { name: 'Creatine', dose: '5g', cost: '$0.20' },
        { name: 'Betaine', dose: '2.5g', cost: '$0.30' },
        { name: 'Electrolytes', dose: '1g', cost: '$0.15' },
      ],
      timing: '30 min pre-workout',
      benefits: ['Strength gains', 'Endurance', 'Hydration'],
      color: 'blue',
    },
    {
      name: 'The Budget Stack',
      goal: 'Effective & affordable',
      totalCost: '$0.50/serving',
      supplements: [
        { name: 'Caffeine', dose: '200mg', cost: '$0.10' },
        { name: 'Citrulline', dose: '6g', cost: '$0.30' },
        { name: 'Salt', dose: '500mg', cost: '$0.05' },
        { name: 'Carbs (Dextrose)', dose: '20g', cost: '$0.05' },
      ],
      timing: '30 min pre-workout',
      benefits: ['Essential ingredients only', 'Great value', 'Proven effective'],
      color: 'amber',
    },
  ];

  const postWorkoutStacks = [
    {
      name: 'The Recovery Stack',
      goal: 'Optimal muscle recovery',
      totalCost: '$2.50/serving',
      supplements: [
        { name: 'Whey Protein', dose: '30g', cost: '$1.20' },
        { name: 'Creatine', dose: '5g', cost: '$0.20' },
        { name: 'Carbs (Maltodextrin)', dose: '40g', cost: '$0.40' },
        { name: 'Glutamine', dose: '5g', cost: '$0.50' },
        { name: 'Vitamin C', dose: '1000mg', cost: '$0.10' },
        { name: 'Tart Cherry', dose: '500mg', cost: '$0.10' },
      ],
      timing: 'Within 2 hours post-workout',
      benefits: ['Fast recovery', 'Muscle growth', 'Reduced soreness'],
      color: 'blue',
    },
    {
      name: 'The Muscle Builder',
      goal: 'Maximum anabolism',
      totalCost: '$3.00/serving',
      supplements: [
        { name: 'Whey Protein', dose: '40g', cost: '$1.60' },
        { name: 'Creatine', dose: '5g', cost: '$0.20' },
        { name: 'EAAs', dose: '15g', cost: '$0.80' },
        { name: 'HMB', dose: '3g', cost: '$0.60' },
        { name: 'Carbs', dose: '50g', cost: '$0.50' },
      ],
      timing: 'Immediately post-workout',
      benefits: ['Maximize protein synthesis', 'Prevent breakdown', 'Glycogen replenishment'],
      color: 'emerald',
    },
    {
      name: 'The Lean Stack',
      goal: 'Recovery while cutting',
      totalCost: '$1.80/serving',
      supplements: [
        { name: 'Whey Isolate', dose: '30g', cost: '$1.50' },
        { name: 'EAAs', dose: '10g', cost: '$0.50' },
        { name: 'Glutamine', dose: '5g', cost: '$0.30' },
        { name: 'L-Carnitine', dose: '2g', cost: '$0.40' },
      ],
      timing: 'Post-workout',
      benefits: ['Muscle preservation', 'Fat metabolism', 'Low carb option'],
      color: 'red',
    },
    {
      name: 'The Budget Recovery',
      goal: 'Essential post-workout',
      totalCost: '$1.50/serving',
      supplements: [
        { name: 'Whey Protein', dose: '30g', cost: '$1.20' },
        { name: 'Creatine', dose: '5g', cost: '$0.20' },
        { name: 'Carbs (Banana)', dose: '30g', cost: '$0.10' },
      ],
      timing: 'Within 2 hours',
      benefits: ['All essentials covered', 'Great value', 'Simple & effective'],
      color: 'amber',
    },
  ];

  const currentStacks = selectedType === 'preworkout' ? preWorkoutStacks : postWorkoutStacks;

  return (
    <View className="flex-1 bg-zinc-950">
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1 ml-3">
            Workout Stacks
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          <View className="bg-gradient-to-r from-amber-500 to-emerald-500 rounded-xl p-6 mb-6">
            <Text className="text-white text-2xl font-bold mb-2">Complete Stacks</Text>
            <Text className="text-white opacity-90 mb-4">
              Pre & post-workout formulas
            </Text>
            <View className="flex-row items-center">
              <Ionicons name="flask" size={20} color="white" />
              <Text className="text-white ml-2">Science-based combinations</Text>
            </View>
          </View>

          <Text className="text-white font-bold mb-3">Stack Type</Text>
          <View className="flex-row gap-3 mb-6">
            {types.map((type) => (
              <TouchableOpacity
                key={type.key}
                onPress={() => setSelectedType(type.key)}
                className={`flex-1 ${
                  selectedType === type.key ? `bg-${type.color}-500` : 'bg-zinc-900'
                } rounded-xl p-4 border ${
                  selectedType === type.key ? `border-${type.color}-400` : 'border-zinc-800'
                }`}
              >
                <Ionicons
                  name={type.icon as any}
                  size={28}
                  color={selectedType === type.key ? 'white' : '#71717a'}
                />
                <Text
                  className={`${
                    selectedType === type.key ? 'text-white' : 'text-zinc-400'
                  } font-bold mt-2`}
                >
                  {type.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {currentStacks.map((stack, idx) => (
            <View key={idx} className={`bg-${stack.color}-500/10 rounded-xl p-5 mb-4 border border-${stack.color}-500/30`}>
              <View className="flex-row items-center justify-between mb-3">
                <View className="flex-1">
                  <Text className="text-white font-bold text-xl mb-1">{stack.name}</Text>
                  <Text className="text-zinc-400 text-sm">{stack.goal}</Text>
                </View>
                <View className="bg-primary rounded-lg px-3 py-2">
                  <Text className="text-white font-bold">{stack.totalCost}</Text>
                </View>
              </View>

              <View className="bg-zinc-900 rounded-lg p-3 mb-3">
                <Text className="text-zinc-400 font-bold text-xs mb-2">INGREDIENTS</Text>
                {stack.supplements.map((supp, suppIdx) => (
                  <View key={suppIdx} className="flex-row justify-between items-center py-1.5 border-b border-zinc-800 last:border-0">
                    <View className="flex-1">
                      <Text className="text-white font-bold">{supp.name}</Text>
                      <Text className="text-zinc-500 text-xs">{supp.dose}</Text>
                    </View>
                    <Text className="text-primary text-sm">{supp.cost}</Text>
                  </View>
                ))}
              </View>

              <View className={`bg-${stack.color}-500/20 rounded-lg p-3 mb-3`}>
                <Text className={`text-${stack.color}-400 font-bold text-xs mb-1`}>TIMING</Text>
                <Text className={`text-${stack.color}-300 text-sm`}>{stack.timing}</Text>
              </View>

              <Text className="text-zinc-400 font-bold text-xs mb-2">BENEFITS</Text>
              <View className="flex-row flex-wrap gap-2">
                {stack.benefits.map((benefit, benIdx) => (
                  <View key={benIdx} className="bg-zinc-900 rounded-full px-3 py-1.5">
                    <Text className="text-zinc-300 text-xs">✓ {benefit}</Text>
                  </View>
                ))}
              </View>
            </View>
          ))}

          <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-6">
            <Text className="text-primary/80 font-bold mb-2">Stack Tips</Text>
            <Text className="text-primary/60 text-sm">
              • Start with lower doses{'\n'}
              • Assess tolerance before combining{'\n'}
              • Buy in bulk to save money{'\n'}
              • DIY stacks &gt; pre-made formulas{'\n'}
              • Cycle stimulants (caffeine){'\n'}
              • Quality &gt; quantity of ingredients
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

