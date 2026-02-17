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

export default function SupplementGuide() {
  const [selectedCategory, setSelectedCategory] = useState('essential');

  const categories = ['essential', 'performance', 'recovery', 'optional'];

  const supplements = {
    essential: [
      {
        name: 'Protein Powder',
        icon: 'nutrition' as const,
        tier: 'Must Have',
        color: 'primary',
        dosage: '20-40g per serving',
        timing: 'Post-workout or to hit daily protein target',
        benefits: [
          'Convenient protein source',
          'Supports muscle growth and recovery',
          'Cost-effective vs whole foods',
        ],
        notes: 'Whey for fast absorption, casein for slow, plant-based for vegans',
        priority: 1,
      },
      {
        name: 'Creatine Monohydrate',
        icon: 'flash' as const,
        tier: 'Must Have',
        color: 'primary',
        dosage: '5g daily',
        timing: 'Any time (consistency matters, timing doesn\'t)',
        benefits: [
          'Increases strength and power output',
          'Supports muscle growth',
          'Improves high-intensity performance',
          'One of most researched supplements',
        ],
        notes: 'No loading phase needed. Very safe, well-studied. May cause water retention.',
        priority: 1,
      },
      {
        name: 'Vitamin D3',
        icon: 'sunny' as const,
        tier: 'Essential',
        color: 'amber',
        dosage: '2000-4000 IU daily',
        timing: 'With food (fat-soluble)',
        benefits: [
          'Bone health',
          'Immune function',
          'Testosterone production',
          'Mood regulation',
        ],
        notes: 'Most people are deficient, especially in winter. Get blood work to check levels.',
        priority: 2,
      },
    ],
    performance: [
      {
        name: 'Caffeine',
        icon: 'cafe' as const,
        tier: 'Performance',
        color: 'red',
        dosage: '3-6mg per kg bodyweight',
        timing: '30-60 min pre-workout',
        benefits: [
          'Increases alertness and focus',
          'Reduces perceived exertion',
          'Improves power output',
          'Enhances endurance',
        ],
        notes: 'Tolerance builds. Cycle off periodically. Avoid late in day for sleep quality.',
        priority: 3,
      },
      {
        name: 'Beta-Alanine',
        icon: 'battery-charging' as const,
        tier: 'Performance',
        color: 'purple',
        dosage: '3.2-6.4g daily',
        timing: 'Split doses or pre-workout',
        benefits: [
          'Increases muscular endurance',
          'Buffers lactic acid',
          'Delays fatigue in 60-240s efforts',
        ],
        notes: 'May cause harmless tingling. Takes 2-4 weeks to saturate muscles.',
        priority: 4,
      },
      {
        name: 'Citrulline Malate',
        icon: 'pulse' as const,
        tier: 'Performance',
        color: 'blue',
        dosage: '6-8g',
        timing: '30-60 min pre-workout',
        benefits: [
          'Increases nitric oxide production',
          'Improves blood flow and pump',
          'Reduces fatigue',
          'Enhances recovery',
        ],
        notes: 'More effective than arginine for NO production.',
        priority: 4,
      },
    ],
    recovery: [
      {
        name: 'Omega-3 Fish Oil',
        icon: 'water' as const,
        tier: 'Recovery',
        color: 'blue',
        dosage: '2-3g EPA+DHA daily',
        timing: 'With meals',
        benefits: [
          'Reduces inflammation',
          'Supports joint health',
          'Heart health',
          'May reduce DOMS',
        ],
        notes: 'Look for high EPA/DHA content. Store in fridge to prevent oxidation.',
        priority: 2,
      },
      {
        name: 'Magnesium',
        icon: 'moon' as const,
        tier: 'Recovery',
        color: 'purple',
        dosage: '200-400mg',
        timing: 'Before bed',
        benefits: [
          'Improves sleep quality',
          'Muscle relaxation',
          'Reduces cramps',
          'Supports recovery',
        ],
        notes: 'Glycinate or threonate forms best absorbed. Can help with sleep.',
        priority: 3,
      },
      {
        name: 'Zinc',
        icon: 'shield' as const,
        tier: 'Recovery',
        color: 'primary',
        dosage: '15-30mg daily',
        timing: 'With food',
        benefits: [
          'Immune function',
          'Testosterone production',
          'Protein synthesis',
          'Recovery',
        ],
        notes: 'Don\'t exceed 40mg. Take with food to avoid nausea. Often combined with magnesium (ZMA).',
        priority: 3,
      },
    ],
    optional: [
      {
        name: 'BCAAs',
        icon: 'fitness' as const,
        tier: 'Optional',
        color: 'zinc',
        dosage: '5-10g',
        timing: 'Intra-workout (fasted training)',
        benefits: [
          'May reduce muscle breakdown',
          'Useful if training fasted',
          'Pleasant taste for hydration',
        ],
        notes: 'Redundant if eating adequate protein. Only useful for fasted training.',
        priority: 5,
      },
      {
        name: 'Glutamine',
        icon: 'body' as const,
        tier: 'Optional',
        color: 'zinc',
        dosage: '5-10g',
        timing: 'Post-workout',
        benefits: [
          'May support gut health',
          'Immune function (in extreme volume)',
          'Minimal direct muscle benefits',
        ],
        notes: 'Limited evidence for muscle growth. Save your money.',
        priority: 5,
      },
    ],
  };

  const currentSupps = supplements[selectedCategory as keyof typeof supplements];

  return (
    <View className="flex-1 bg-zinc-950">
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1 ml-3">
            Supplement Guide
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          <View className="bg-gradient-to-r from-primary to-[#7D0EBE] rounded-xl p-6 mb-6">
            <Text className="text-white text-2xl font-bold mb-2">Supplements</Text>
            <Text className="text-white opacity-90">
              Evidence-based recommendations
            </Text>
          </View>

          <View className="mb-6">
            <View className="flex-row flex-wrap gap-2">
              {categories.map((cat) => (
                <TouchableOpacity
                  key={cat}
                  onPress={() => setSelectedCategory(cat)}
                  className={`${
                    selectedCategory === cat ? 'bg-primary' : 'bg-zinc-800'
                  } rounded-xl px-4 py-2 border ${
                    selectedCategory === cat ? 'border-primary' : 'border-zinc-700'
                  }`}
                >
                  <Text className="text-white font-bold capitalize">{cat}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {currentSupps.map((supp, idx) => (
            <View key={idx} className={`bg-${supp.color}-500/10 rounded-xl p-5 mb-6 border border-${supp.color}-500/30`}>
              <View className="flex-row items-center justify-between mb-3">
                <View className="flex-row items-center flex-1">
                  <Ionicons name={supp.icon} size={28} color={`#${supp.color === 'primary' ? '9D12DE' : supp.color === 'red' ? 'ef4444' : supp.color === 'purple' ? 'a855f7' : supp.color === 'blue' ? '3b82f6' : supp.color === 'amber' ? 'f59e0b' : '71717a'}`} />
                  <Text className={`text-${supp.color}-400 font-bold text-xl ml-3`}>
                    {supp.name}
                  </Text>
                </View>
                <View className={`px-3 py-1 rounded-full bg-${supp.color}-500/20`}>
                  <Text className={`text-${supp.color}-400 font-bold text-xs`}>
                    Priority {supp.priority}
                  </Text>
                </View>
              </View>

              <View className="bg-zinc-900 rounded-xl p-4 mb-4">
                <View className="flex-row justify-between items-center mb-2">
                  <Text className="text-zinc-400 text-sm">Dosage:</Text>
                  <Text className="text-white font-bold">{supp.dosage}</Text>
                </View>
                <View className="flex-row justify-between items-center">
                  <Text className="text-zinc-400 text-sm">Timing:</Text>
                  <Text className="text-white font-bold flex-1 text-right ml-2">
                    {supp.timing}
                  </Text>
                </View>
              </View>

              <View className="bg-zinc-900 rounded-xl p-4 mb-4">
                <Text className="text-white font-bold mb-2">Benefits</Text>
                {supp.benefits.map((benefit, bidx) => (
                  <View key={bidx} className="flex-row items-start mb-1 last:mb-0">
                    <Ionicons name="checkmark-circle" size={16} color="#9D12DE" />
                    <Text className="text-zinc-300 text-sm ml-2 flex-1">{benefit}</Text>
                  </View>
                ))}
              </View>

              <View className="bg-primary/10 rounded-xl p-3 border border-primary/30">
                <Text className="text-primary/80 text-sm">{supp.notes}</Text>
              </View>
            </View>
          ))}

          <View className="bg-amber-500/10 rounded-xl p-4 border border-amber-500/30 mb-6">
            <Text className="text-amber-400 font-bold mb-2">Supplement Hierarchy</Text>
            <Text className="text-amber-300 text-sm mb-2">
              1. Protein, Creatine, Vitamin D (99% of results)
            </Text>
            <Text className="text-amber-300 text-sm mb-2">
              2. Omega-3, Magnesium, Zinc (health support)
            </Text>
            <Text className="text-amber-300 text-sm mb-2">
              3. Caffeine, Beta-Alanine, Citrulline (marginal gains)
            </Text>
            <Text className="text-amber-300 text-sm">
              4. Everything else (save your money)
            </Text>
          </View>

          <View className="bg-red-500/10 rounded-xl p-4 border border-red-500/30 mb-6">
            <Text className="text-red-400 font-bold mb-2">Harsh Truth</Text>
            <Text className="text-red-300 text-sm">
              No supplement will fix a bad diet, inconsistent training, or poor sleep. Supplements are 5-10% of results. Focus on the fundamentals first.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

