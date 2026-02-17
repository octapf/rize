import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TrainingPhilosophy() {
  const [selectedPhilosophy, setSelectedPhilosophy] = useState('progressive-overload');

  const philosophies = [
    'progressive-overload',
    'autoregulation',
    'specificity',
    'variation',
    'recovery',
  ];

  const philosophyData = {
    'progressive-overload': {
      name: 'Progressive Overload',
      icon: 'trending-up' as const,
      color: 'primary',
      principle: 'Gradually increase training stimulus over time',
      importance: 'The fundamental principle of all strength and hypertrophy gains',
      methods: [
        {
          method: 'Add Weight',
          description: 'Most common form of progression',
          example: 'Bench 100kg × 5 â†’ 102.5kg × 5',
          frequency: 'Weekly for beginners, monthly for advanced',
          notes: 'Smallest increments possible (2.5kg for upper, 5kg for lower)',
        },
        {
          method: 'Add Reps',
          description: 'Increase volume at same weight',
          example: '100kg × 5 reps â†’ 100kg × 6 reps',
          frequency: 'Session to session',
          notes: 'Once you hit top of rep range, add weight and drop reps',
        },
        {
          method: 'Add Sets',
          description: 'Increase total training volume',
          example: '3 sets × 8 reps â†’ 4 sets × 8 reps',
          frequency: 'Weekly or bi-weekly',
          notes: 'Be careful of excessive volume accumulation',
        },
        {
          method: 'Improve Form',
          description: 'Better technique = more muscle tension',
          example: 'Half reps â†’ full ROM, tempo control',
          frequency: 'Constantly',
          notes: 'Often overlooked but crucial for long-term progress',
        },
        {
          method: 'Increase Frequency',
          description: 'Train muscle groups more often',
          example: 'Chest 1x/week â†’ 2x/week',
          frequency: 'Every mesocycle',
          notes: 'More frequent stimulus can drive more growth',
        },
      ],
      application: [
        'Track all lifts in a logbook or app',
        'Aim to beat previous session (weight, reps, or sets)',
        'If you can\'t progress, you\'re not recovering',
        'Deload when progress stalls despite effort',
        'Long-term: small increments compound massively',
      ],
      mistakes: [
        'Adding weight too aggressively (sacrificing form)',
        'Not tracking workouts (can\'t measure progress)',
        'Expecting linear progress forever (it slows down)',
        'Chasing PRs when fatigued or injured',
      ],
    },
    autoregulation: {
      name: 'Autoregulation',
      icon: 'analytics' as const,
      color: 'blue',
      principle: 'Adjust training based on daily performance and recovery',
      importance: 'Prevents overtraining and optimizes gains by listening to your body',
      methods: [
        {
          method: 'RPE (Rate of Perceived Exertion)',
          description: 'Subjective difficulty rating 1-10',
          example: 'RPE 8 = 2 reps in reserve (RIR)',
          frequency: 'Every working set',
          notes: 'Most accessible method, requires honesty',
        },
        {
          method: 'RIR (Reps in Reserve)',
          description: 'How many more reps could you do',
          example: '3 RIR = could do 3 more reps',
          frequency: 'Every set',
          notes: 'Easier for beginners than RPE',
        },
        {
          method: 'Velocity-Based Training (VBT)',
          description: 'Measure bar speed to gauge fatigue',
          example: 'Stop set when velocity drops 20%',
          frequency: 'Every rep (requires equipment)',
          notes: 'Most objective but needs tools',
        },
        {
          method: 'AMRAP Testing',
          description: 'Max reps at given weight',
          example: 'Squat 100kg AMRAP every 4 weeks',
          frequency: 'Every 3-4 weeks',
          notes: 'Good for estimating 1RM progress',
        },
        {
          method: 'Daily Max',
          description: 'Work up to daily capability',
          example: 'Today\'s RPE 9 single might be different than last week',
          frequency: 'Main lift only',
          notes: 'Common in powerlifting, accounts for daily fluctuation',
        },
      ],
      application: [
        'If planned 5×5 @ 80% feels RPE 9, reduce load',
        'If everything feels easy, push a bit harder',
        'Bad sleep/stress = reduce volume or intensity',
        'Feeling great = optional backoff sets',
        'Adjust plan based on how you ACTUALLY feel, not calendar',
      ],
      mistakes: [
        'Being dishonest with RPE ratings',
        'Constantly going to RPE 10 (grinding)',
        'Ignoring clear signs of fatigue',
        'Changing plan every session (some structure needed)',
      ],
    },
    specificity: {
      name: 'Specificity (SAID Principle)',
      icon: 'target' as const,
      color: 'red',
      principle: 'Specific Adaptation to Imposed Demands',
      importance: 'Your body adapts specifically to the stress you give it',
      methods: [
        {
          method: 'Exercise Selection',
          description: 'Choose exercises that match your goal',
          example: 'Want big squat? Squat often. Want big arms? Curl.',
          frequency: 'Program design',
          notes: 'Compounds for strength, isolation for hypertrophy',
        },
        {
          method: 'Rep Ranges',
          description: 'Different ranges drive different adaptations',
          example: '1-5 reps = strength, 8-15 = hypertrophy, 15+ = endurance',
          frequency: 'Varies by phase',
          notes: 'Some overlap exists, but specificity matters',
        },
        {
          method: 'Loading Patterns',
          description: 'Load type determines adaptation',
          example: 'Heavy 3s = neural, moderate 10s = muscle',
          frequency: 'Based on goals',
          notes: 'Powerlifters need heavy singles, bodybuilders don\'t',
        },
        {
          method: 'Movement Patterns',
          description: 'Specific movements improve specific movements',
          example: 'Leg press doesn\'t transfer perfectly to squat',
          frequency: 'Always',
          notes: 'Variations help, but main lift must be trained',
        },
        {
          method: 'Competition Prep',
          description: 'Train how you compete',
          example: 'Powerlifters: competition lift variations',
          frequency: 'Increases near comp',
          notes: 'Peak specificity in final weeks',
        },
      ],
      application: [
        'Prioritize exercises that match goals',
        'If competing, train competition movements frequently',
        'General fitness? More variety is fine',
        'Periodize specificity: general â†’ specific â†’ peak',
        'Test what you train (don\'t test random exercises)',
      ],
      mistakes: [
        'Only doing favorite exercises (ignoring weaknesses)',
        'Too much variety (exercise ADD)',
        'Training like bodybuilder for powerlifting meet',
        'Neglecting main lifts for accessories',
      ],
    },
    variation: {
      name: 'Variation & Periodization',
      icon: 'shuffle' as const,
      color: 'purple',
      principle: 'Strategic variation prevents adaptation staleness and overuse injury',
      importance: 'Balances specificity with avoiding repetitive strain',
      methods: [
        {
          method: 'Exercise Variation',
          description: 'Rotate similar movement patterns',
          example: 'Back squat â†’ front squat â†’ safety bar squat',
          frequency: 'Every 4-6 weeks',
          notes: 'Keep main lift, vary accessories',
        },
        {
          method: 'Loading Schemes',
          description: 'Change sets, reps, intensity',
          example: 'Strength block (5×5) â†’ hypertrophy (4×10)',
          frequency: 'Every mesocycle (4-6 weeks)',
          notes: 'Classic periodization approach',
        },
        {
          method: 'Volume Cycling',
          description: 'Accumulation and intensification phases',
          example: 'High volume, low intensity â†’ low volume, high intensity',
          frequency: 'Mesocycle to mesocycle',
          notes: 'Prevents burnout and overreaching',
        },
        {
          method: 'Deload Weeks',
          description: 'Planned reduction in volume/intensity',
          example: 'Every 4th week: 50% volume at same weights',
          frequency: 'Every 3-6 weeks',
          notes: 'Allows for supercompensation',
        },
        {
          method: 'Movement Complexity',
          description: 'Vary technical demand',
          example: 'Week 1: paused squats, Week 4: regular squats',
          frequency: 'Within mesocycle',
          notes: 'Harder variations build weak points',
        },
      ],
      application: [
        'Block 1: High volume, moderate intensity (hypertrophy)',
        'Block 2: Moderate volume, high intensity (strength)',
        'Block 3: Low volume, peak intensity (peaking)',
        'Deload every 4-6 weeks',
        'Rotate accessories every 4-8 weeks',
      ],
      mistakes: [
        'Changing everything every workout (no consistency)',
        'Never deloading (constant fatigue)',
        'Random variation without purpose',
        'Not giving variations enough time to work',
      ],
    },
    recovery: {
      name: 'Recovery & Adaptation',
      icon: 'bed' as const,
      color: 'amber',
      principle: 'Growth happens during recovery, not in the gym',
      importance: 'Training is stimulus, recovery is where adaptation occurs',
      methods: [
        {
          method: 'Sleep Optimization',
          description: 'Primary recovery tool',
          example: '7-9 hours quality sleep',
          frequency: 'Every night',
          notes: 'Most important factor. Non-negotiable.',
        },
        {
          method: 'Nutrition for Recovery',
          description: 'Fuel repair and growth',
          example: 'Protein 1.6-2.2g/kg, surplus for muscle gain',
          frequency: 'Daily',
          notes: 'Can\'t out-train poor nutrition',
        },
        {
          method: 'Deload Protocols',
          description: 'Planned recovery periods',
          example: '50% volume, same weights, or take week off',
          frequency: 'Every 4-6 weeks',
          notes: 'You don\'t lose gains in one week',
        },
        {
          method: 'Active Recovery',
          description: 'Low-intensity movement',
          example: 'Walking, swimming, yoga on off days',
          frequency: '2-3x per week',
          notes: 'Aids recovery without adding fatigue',
        },
        {
          method: 'Stress Management',
          description: 'Life stress impacts training recovery',
          example: 'High work stress = need more recovery',
          frequency: 'Ongoing awareness',
          notes: 'Training is stress. Total stress matters.',
        },
      ],
      application: [
        'Prioritize 7-9h sleep above all else',
        'Eat enough to support training demands',
        'Take deloads even when you "feel fine"',
        'Monitor recovery markers (sleep quality, mood, performance)',
        'Reduce training if life stress is high',
      ],
      mistakes: [
        'Skipping sleep to train early',
        'Under-eating while trying to gain strength/muscle',
        'Never taking planned rest weeks',
        'Training hard despite poor recovery markers',
      ],
    },
  };

  const currentPhilosophy = philosophyData[selectedPhilosophy as keyof typeof philosophyData];

  return (
    <View className="flex-1 bg-zinc-950">
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1 ml-3">
            Training Philosophy
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          <View className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-6 mb-6">
            <Text className="text-white text-2xl font-bold mb-2">Core Principles</Text>
            <Text className="text-white opacity-90">
              Fundamental training concepts
            </Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6">
            <View className="flex-row gap-2">
              {philosophies.map((phil) => (
                <TouchableOpacity
                  key={phil}
                  onPress={() => setSelectedPhilosophy(phil)}
                  className={`${
                    selectedPhilosophy === phil ? 'bg-purple-500' : 'bg-zinc-800'
                  } rounded-xl px-4 py-3 border ${
                    selectedPhilosophy === phil ? 'border-purple-400' : 'border-zinc-700'
                  }`}
                >
                  <Text className="text-white font-bold capitalize text-sm">
                    {phil.replace('-', ' ')}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          <View className={`bg-${currentPhilosophy.color}-500/10 rounded-xl p-5 mb-6 border border-${currentPhilosophy.color}-500/30`}>
            <View className="flex-row items-center mb-3">
              <Ionicons name={currentPhilosophy.icon} size={28} color={`#${
                currentPhilosophy.color === 'primary' ? '9D12DE' :
                currentPhilosophy.color === 'blue' ? '3b82f6' :
                currentPhilosophy.color === 'red' ? 'ef4444' :
                currentPhilosophy.color === 'purple' ? 'a855f7' :
                'f59e0b'
              }`} />
              <Text className={`text-${currentPhilosophy.color}-400 font-bold text-xl ml-3`}>
                {currentPhilosophy.name}
              </Text>
            </View>
            
            <View className="bg-zinc-900 rounded-xl p-4 mb-3">
              <Text className="text-zinc-400 text-sm mb-1">Core Principle</Text>
              <Text className="text-white font-bold">{currentPhilosophy.principle}</Text>
            </View>

            <View className="bg-zinc-900 rounded-xl p-4">
              <Text className="text-zinc-400 text-sm mb-1">Why It Matters</Text>
              <Text className="text-white">{currentPhilosophy.importance}</Text>
            </View>
          </View>

          <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
            <Text className="text-white font-bold text-lg mb-4">Methods & Application</Text>
            {currentPhilosophy.methods.map((method, idx) => (
              <View key={idx} className={`bg-${currentPhilosophy.color}-500/10 rounded-xl p-4 mb-4 last:mb-0 border border-${currentPhilosophy.color}-500/30`}>
                <Text className={`text-${currentPhilosophy.color}-400 font-bold text-lg mb-2`}>
                  {method.method}
                </Text>
                <Text className="text-zinc-300 mb-3">{method.description}</Text>

                <View className="bg-zinc-900 rounded-xl p-3 mb-2">
                  <Text className="text-primary/80 text-sm font-bold mb-1">Example</Text>
                  <Text className="text-primary/60 text-sm">{method.example}</Text>
                </View>

                <View className="flex-row justify-between mb-2">
                  <Text className="text-zinc-400 text-sm">Frequency:</Text>
                  <Text className="text-white text-sm font-bold">{method.frequency}</Text>
                </View>

                <View className="bg-amber-500/10 rounded-xl p-2 border border-amber-500/30">
                  <Text className="text-amber-300 text-xs italic">{method.notes}</Text>
                </View>
              </View>
            ))}
          </View>

          <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
            <Text className="text-white font-bold text-lg mb-3">Practical Application</Text>
            {currentPhilosophy.application.map((app, idx) => (
              <View key={idx} className="flex-row items-start mb-2 last:mb-0">
                <Ionicons name="checkmark-circle" size={18} color="#9D12DE" />
                <Text className="text-zinc-300 ml-2 flex-1">{app}</Text>
              </View>
            ))}
          </View>

          <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
            <Text className="text-white font-bold text-lg mb-3">Common Mistakes</Text>
            {currentPhilosophy.mistakes.map((mistake, idx) => (
              <View key={idx} className="flex-row items-start mb-2 last:mb-0">
                <Ionicons name="close-circle" size={18} color="#ef4444" />
                <Text className="text-red-300 ml-2 flex-1">{mistake}</Text>
              </View>
            ))}
          </View>

          <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-6">
            <Text className="text-primary/80 font-bold mb-2">Integration</Text>
            <Text className="text-primary/60 text-sm">
              All these principles work together. Progressive overload drives gains,
              autoregulation prevents burnout, specificity ensures gains transfer,
              variation prevents staleness, and recovery enables adaptation. Master
              all five for optimal long-term progress.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}


