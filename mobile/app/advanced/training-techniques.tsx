import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function AdvancedTechniques() {
  const [selectedTechnique, setSelectedTechnique] = useState('dropsets');

  const techniques = [
    {
      id: 'dropsets',
      name: 'Drop Sets',
      icon: 'trending-down' as const,
      color: 'red',
      description: 'Reduce weight and continue past failure',
      intensity: 'Very High',
      fatigue: 'High',
      howTo: [
        'Complete set to failure',
        'Immediately reduce weight 20-30%',
        'Continue to failure again',
        'Optional: drop 1-2 more times',
        'Total set: 3-4 mini-sets without rest',
      ],
      bestFor: ['Hypertrophy', 'Metabolic stress', 'Time-efficient training'],
      cautions: [
        'Very fatiguing - use sparingly (1-2 sets per workout)',
        'Best on last set of exercise',
        'Works better on machines/cables than free weights',
        'Not for compound movements under heavy load',
      ],
      example: 'Bicep curls: 15kg×8 â†’ 12kg×6 â†’ 10kg×4',
    },
    {
      id: 'restpause',
      name: 'Rest-Pause',
      icon: 'pause' as const,
      color: 'blue',
      description: 'Mini rests to extend set past failure',
      intensity: 'Very High',
      fatigue: 'Very High',
      howTo: [
        'Load weight for 6-10RM',
        'Perform to failure',
        'Rack weight, rest 15-20 seconds',
        'Perform as many reps as possible (usually 2-4)',
        'Repeat rest-pause 1-2 more times',
      ],
      bestFor: ['Strength-endurance', 'Hypertrophy', 'Breaking plateaus'],
      cautions: [
        'Extremely fatiguing - 1 set per exercise max',
        'Need spotter for safety on big lifts',
        'Can accumulate significant fatigue',
        'Not for beginners',
      ],
      example: 'Bench press: 80kg×8 â†’ rest 20s â†’ ×3 â†’ rest 20s â†’ ×2',
    },
    {
      id: 'cluster',
      name: 'Cluster Sets',
      icon: 'albums' as const,
      color: 'purple',
      description: 'Intra-set rest to maintain quality',
      intensity: 'High',
      fatigue: 'Moderate',
      howTo: [
        'Choose heavy weight (85-90% 1RM)',
        'Perform 1-3 reps',
        'Rest 10-20 seconds',
        'Repeat for 4-6 clusters',
        'Total: 6-12 high-quality reps',
      ],
      bestFor: ['Strength', 'Power', 'Quality over quantity'],
      cautions: [
        'Best for compound lifts',
        'Requires focus on technique',
        'Don\'t go to failure on clusters',
        'Keep reps explosive',
      ],
      example: '90kg squat: 3 reps, rest 15s, 3 reps, rest 15s, 3 reps (9 total)',
    },
    {
      id: 'supersets',
      name: 'Supersets',
      icon: 'git-merge' as const,
      color: 'primary',
      description: 'Two exercises back-to-back',
      intensity: 'Moderate-High',
      fatigue: 'Moderate',
      howTo: [
        'Exercise A to completion',
        'Immediately perform Exercise B',
        'Rest after both exercises',
        'Repeat for desired sets',
      ],
      types: [
        {
          type: 'Antagonist',
          example: 'Biceps â†’ Triceps',
          benefit: 'Reciprocal innervation, time-efficient',
        },
        {
          type: 'Agonist',
          example: 'Barbell row â†’ Lat pulldown',
          benefit: 'Increased metabolic stress',
        },
        {
          type: 'Unrelated',
          example: 'Bench press â†’ Calf raises',
          benefit: 'Time-saving only',
        },
      ],
      bestFor: ['Time-efficiency', 'Hypertrophy', 'Work capacity'],
      cautions: [
        'Don\'t superset two heavy compounds (squat+deadlift = bad)',
        'Antagonist supersets best for recovery',
        'Equipment availability can be issue in busy gyms',
      ],
    },
    {
      id: 'occlusion',
      name: 'Blood Flow Restriction (BFR)',
      icon: 'fitness' as const,
      color: 'amber',
      description: 'Restricting venous blood flow with light loads',
      intensity: 'Low weight, High metabolic',
      fatigue: 'Moderate',
      howTo: [
        'Apply cuffs/wraps to upper arm or thigh',
        'Tighness: 7/10 (not numb, should feel pulse)',
        'Use 20-30% of 1RM',
        'Perform 75 reps: 30-15-15-15 with 30s rest',
        'Keep cuffs on during rest periods',
        'Remove cuffs after final set',
      ],
      bestFor: ['Injury rehab', 'Hypertrophy with low load', 'Joint-sparing'],
      cautions: [
        'Use PROPER BFR cuffs (not random bands)',
        'Don\'t restrict arterial flow',
        'Not for people with circulatory issues',
        'Consult doctor if unsure',
        'Uncomfortable but effective',
      ],
      example: 'Leg extensions: 20kg (30% 1RM) for 30-15-15-15 with wraps',
    },
    {
      id: 'eccentric',
      name: 'Tempo Training (Eccentric Focus)',
      icon: 'time' as const,
      color: 'red',
      description: 'Slow negatives for increased time under tension',
      intensity: 'Moderate weight, High TUT',
      fatigue: 'High (severe DOMS)',
      howTo: [
        'Use 60-80% of normal working weight',
        'Concentric: 1-2 seconds (lift)',
        'Eccentric: 3-5 seconds (lower)',
        'Optional pause at bottom',
        '6-10 reps per set',
      ],
      bestFor: ['Hypertrophy', 'Tendon strength', 'Breaking plateaus'],
      cautions: [
        'EXTREME muscle damage = severe DOMS',
        'Use sparingly (every 3-4 weeks)',
        'Need to reduce volume significantly',
        'Recovery takes longer than normal training',
      ],
      example: 'Romanian deadlift: 5-second lower, 2-second lift, 8 reps',
    },
  ];

  const currentTech = techniques.find((t) => t.id === selectedTechnique)!;

  return (
    <View className="flex-1 bg-zinc-950">
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1 ml-3">
            Advanced Techniques
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          <View className="bg-gradient-to-r from-red-500 to-purple-500 rounded-xl p-6 mb-6">
            <Text className="text-white text-2xl font-bold mb-2">Intensity Methods</Text>
            <Text className="text-white opacity-90">
              Break through plateaus
            </Text>
          </View>

          <View className="mb-6">
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View className="flex-row gap-3">
                {techniques.map((tech) => (
                  <TouchableOpacity
                    key={tech.id}
                    onPress={() => setSelectedTechnique(tech.id)}
                    className={`${
                      selectedTechnique === tech.id
                        ? `bg-${tech.color}-500`
                        : 'bg-zinc-800'
                    } rounded-xl px-4 py-3 border ${
                      selectedTechnique === tech.id
                        ? `border-${tech.color}-400`
                        : 'border-zinc-700'
                    }`}
                  >
                    <View className="flex-row items-center">
                      <Ionicons name={tech.icon} size={20} color="white" />
                      <Text className="text-white font-bold ml-2 text-sm">{tech.name}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>

          <View className={`bg-${currentTech.color}-500/10 rounded-xl p-5 mb-6 border border-${currentTech.color}-500/30`}>
            <View className="flex-row items-center mb-3">
              <Ionicons name={currentTech.icon} size={28} color={`#${currentTech.color === 'red' ? 'ef4444' : currentTech.color === 'blue' ? '3b82f6' : currentTech.color === 'purple' ? 'a855f7' : currentTech.color === 'primary' ? '9D12DE' : 'f59e0b'}`} />
              <Text className={`text-${currentTech.color}-400 font-bold text-2xl ml-3`}>
                {currentTech.name}
              </Text>
            </View>
            <Text className="text-zinc-300 text-lg mb-4">{currentTech.description}</Text>

            <View className="flex-row gap-3">
              <View className="flex-1 bg-zinc-900 rounded-xl p-3">
                <Text className="text-zinc-400 text-xs mb-1">Intensity</Text>
                <Text className="text-white font-bold text-sm">{currentTech.intensity}</Text>
              </View>
              <View className="flex-1 bg-zinc-900 rounded-xl p-3">
                <Text className="text-zinc-400 text-xs mb-1">Fatigue</Text>
                <Text className="text-white font-bold text-sm">{currentTech.fatigue}</Text>
              </View>
            </View>
          </View>

          <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
            <Text className="text-white font-bold text-lg mb-4">How To Execute</Text>
            {currentTech.howTo.map((step, idx) => (
              <View key={idx} className="flex-row items-start mb-2 last:mb-0">
                <View className={`w-6 h-6 rounded-full bg-${currentTech.color}-500/20 items-center justify-center mt-0.5 border border-${currentTech.color}-500/40`}>
                  <Text className={`text-${currentTech.color}-400 font-bold text-xs`}>
                    {idx + 1}
                  </Text>
                </View>
                <Text className="text-zinc-300 ml-2 flex-1">{step}</Text>
              </View>
            ))}
          </View>

          {'types' in currentTech && (
            <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
              <Text className="text-white font-bold text-lg mb-3">Types</Text>
              {currentTech.types.map((type, idx) => (
                <View key={idx} className={`bg-${currentTech.color}-500/10 rounded-xl p-3 mb-2 last:mb-0 border border-${currentTech.color}-500/30`}>
                  <Text className={`text-${currentTech.color}-400 font-bold mb-1`}>
                    {type.type}
                  </Text>
                  <Text className="text-zinc-400 text-sm mb-1">Example: {type.example}</Text>
                  <Text className="text-zinc-300 text-sm">{type.benefit}</Text>
                </View>
              ))}
            </View>
          )}

          <View className={`bg-${currentTech.color}-500/10 rounded-xl p-5 mb-6 border border-${currentTech.color}-500/30`}>
            <Text className={`text-${currentTech.color}-400 font-bold text-lg mb-3`}>
              Best For
            </Text>
            {currentTech.bestFor.map((use, idx) => (
              <View key={idx} className="flex-row items-start mb-1 last:mb-0">
                <Ionicons name="checkmark-circle" size={16} color={`#${currentTech.color === 'red' ? 'ef4444' : currentTech.color === 'blue' ? '3b82f6' : currentTech.color === 'purple' ? 'a855f7' : currentTech.color === 'primary' ? '9D12DE' : 'f59e0b'}`} />
                <Text className="text-zinc-300 ml-2">{use}</Text>
              </View>
            ))}
          </View>

          <View className="bg-red-500/10 rounded-xl p-5 mb-6 border border-red-500/30">
            <Text className="text-red-400 font-bold text-lg mb-3">Cautions</Text>
            {currentTech.cautions.map((caution, idx) => (
              <View key={idx} className="flex-row items-start mb-2 last:mb-0">
                <Ionicons name="warning" size={16} color="#ef4444" />
                <Text className="text-red-300 text-sm ml-2 flex-1">{caution}</Text>
              </View>
            ))}
          </View>

          {'example' in currentTech && (
            <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-6">
              <Text className="text-primary font-bold mb-2">Example</Text>
              <Text className="text-primary/80 text-sm">{currentTech.example}</Text>
            </View>
          )}

          <View className="bg-amber-500/10 rounded-xl p-4 border border-amber-500/30 mb-6">
            <Text className="text-amber-400 font-bold mb-2">When to Use Advanced Techniques</Text>
            <Text className="text-amber-300 text-sm mb-2">
              • You've been training consistently for 1+ years
            </Text>
            <Text className="text-amber-300 text-sm mb-2">
              • You've hit a plateau with standard training
            </Text>
            <Text className="text-amber-300 text-sm mb-2">
              • Use 1-2 per workout MAX (not every exercise)
            </Text>
            <Text className="text-amber-300 text-sm">
              • Cycle in/out every 3-4 weeks to prevent burnout
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}


