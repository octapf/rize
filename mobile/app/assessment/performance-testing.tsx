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

export default function PerformanceTesting() {
  const [selectedTest, setSelectedTest] = useState('strength');

  const testCategories = ['strength', 'power', 'endurance', 'mobility'];

  const tests = {
    strength: [
      {
        name: '1RM Testing Protocol',
        icon: 'barbell' as const,
        color: 'red',
        description: 'Find your one-rep max safely',
        protocol: [
          'Warm-up: 5-10 min general cardio',
          'Set 1: 8-10 reps @ 50% estimated 1RM',
          'Rest 1 min',
          'Set 2: 3-5 reps @ 70% estimated 1RM',
          'Rest 2 min',
          'Set 3: 2-3 reps @ 85% estimated 1RM',
          'Rest 2-3 min',
          'Set 4: 1 rep @ 93% estimated 1RM',
          'Rest 3-5 min',
          'Attempt 1RM (increase 2.5-5kg from set 4)',
          'If successful, rest 3-5 min and attempt +2.5kg',
          'Continue until failure',
        ],
        safety: [
          'Use spotter for bench/squat',
          'Perfect form only - stop if breaks down',
          'Don\'t test 1RM more than once per month',
          'Be conservative with jumps',
        ],
      },
      {
        name: 'Rep Max Testing',
        icon: 'fitness' as const,
        color: 'blue',
        description: 'Estimate 1RM from submaximal reps',
        protocol: [
          'Warm-up as usual',
          'Choose weight you can do 3-8 reps',
          'Perform AMRAP (as many reps as possible)',
          'Use Epley formula: 1RM = weight × (1 + reps/30)',
          'Or Brzycki: 1RM = weight × (36 / (37 - reps))',
        ],
        safety: [
          'Safer than true 1RM testing',
          'Stop 1-2 reps before failure',
          'Use for injury-prone lifts',
          'Re-test every 4-6 weeks',
        ],
      },
    ],
    power: [
      {
        name: 'Vertical Jump Test',
        icon: 'arrow-up' as const,
        color: 'purple',
        description: 'Lower body explosive power',
        protocol: [
          'Warm-up: dynamic stretching, practice jumps',
          'Stand beside wall, reach up with hand',
          'Mark standing reach height',
          'Jump as high as possible, touch wall at peak',
          'Measure jump height (touch - standing reach)',
          'Take best of 3 attempts',
        ],
        standards: {
          male: 'Excellent: >26", Good: 20-26", Average: 16-20", Poor: <16"',
          female: 'Excellent: >20", Good: 16-20", Average: 12-16", Poor: <12"',
        },
      },
      {
        name: 'Broad Jump Test',
        icon: 'resize' as const,
        color: 'amber',
        description: 'Horizontal power output',
        protocol: [
          'Warm-up thoroughly',
          'Stand behind line, feet shoulder-width',
          'Swing arms, jump forward as far as possible',
          'Land on both feet',
          'Measure from toe line to heel',
          'Best of 3 attempts',
        ],
        standards: {
          male: 'Excellent: >8ft, Good: 7-8ft, Average: 6-7ft, Poor: <6ft',
          female: 'Excellent: >6.5ft, Good: 5.5-6.5ft, Average: 4.5-5.5ft, Poor: <4.5ft',
        },
      },
    ],
    endurance: [
      {
        name: 'Beep Test (20m Shuttle)',
        icon: 'timer' as const,
        color: 'emerald',
        description: 'VO2 max estimation',
        protocol: [
          'Run 20m before beep',
          'Turn and run back before next beep',
          'Beeps get progressively faster',
          'Continue until you can\'t keep pace',
          'Record level and shuttle number',
        ],
        standards: {
          male: 'Excellent: >12, Good: 10-12, Average: 7-10, Poor: <7',
          female: 'Excellent: >10, Good: 8-10, Average: 5-8, Poor: <5',
        },
      },
      {
        name: 'Plank Hold Test',
        icon: 'body' as const,
        color: 'blue',
        description: 'Core endurance capacity',
        protocol: [
          'Forearm plank position',
          'Body straight line (no sag/pike)',
          'Hold as long as possible',
          'Stop when form breaks',
          'Record time in seconds',
        ],
        standards: {
          male: 'Excellent: >3min, Good: 2-3min, Average: 1-2min, Poor: <1min',
          female: 'Excellent: >2.5min, Good: 1.5-2.5min, Average: 1-1.5min, Poor: <1min',
        },
      },
    ],
    mobility: [
      {
        name: 'Sit and Reach Test',
        icon: 'expand' as const,
        color: 'purple',
        description: 'Hamstring and lower back flexibility',
        protocol: [
          'Warm-up lightly (don\'t overstretch)',
          'Sit with legs straight, feet against box',
          'Reach forward slowly as far as possible',
          'Hold for 2 seconds',
          'Measure distance past/before toes',
          'Best of 3 attempts',
        ],
        standards: {
          male: 'Excellent: >+5", Good: 0-+5", Average: -5-0", Poor: <-5"',
          female: 'Excellent: >+7", Good: +2-+7", Average: -3-+2", Poor: <-3"',
        },
      },
      {
        name: 'Overhead Squat Assessment',
        icon: 'analytics' as const,
        color: 'red',
        description: 'Movement quality and limitations',
        protocol: [
          'Hold PVC pipe overhead, arms locked',
          'Feet shoulder-width, toes slightly out',
          'Squat as deep as possible',
          'Keep arms overhead, chest up',
          'Observe: knees, heels, torso, arms',
          'Note any compensation patterns',
        ],
        limitations: {
          'Knees cave in': 'Weak glutes, tight adductors',
          'Heels lift': 'Tight calves/ankles',
          'Torso leans forward': 'Tight hip flexors, weak core',
          'Arms fall forward': 'Tight lats/chest, weak rotator cuff',
        },
      },
    ],
  };

  const currentTests = tests[selectedTest as keyof typeof tests];

  return (
    <View className="flex-1 bg-zinc-950">
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1 ml-3">
            Performance Testing
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          <View className="bg-gradient-to-r from-red-500 to-purple-500 rounded-xl p-6 mb-6">
            <Text className="text-white text-2xl font-bold mb-2">Test Yourself</Text>
            <Text className="text-white opacity-90">
              Standardized performance protocols
            </Text>
          </View>

          <View className="mb-6">
            <View className="flex-row flex-wrap gap-2">
              {testCategories.map((cat) => (
                <TouchableOpacity
                  key={cat}
                  onPress={() => setSelectedTest(cat)}
                  className={`${
                    selectedTest === cat ? 'bg-red-500' : 'bg-zinc-800'
                  } rounded-xl px-4 py-2 border ${
                    selectedTest === cat ? 'border-red-400' : 'border-zinc-700'
                  }`}
                >
                  <Text className="text-white font-bold capitalize">{cat}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {currentTests.map((test, idx) => (
            <View key={idx} className={`bg-${test.color}-500/10 rounded-xl p-5 mb-6 border border-${test.color}-500/30`}>
              <View className="flex-row items-center mb-3">
                <Ionicons name={test.icon} size={28} color={`#${test.color === 'red' ? 'ef4444' : test.color === 'blue' ? '3b82f6' : test.color === 'emerald' ? '10b981' : test.color === 'purple' ? 'a855f7' : 'f59e0b'}`} />
                <Text className={`text-${test.color}-400 font-bold text-xl ml-3 flex-1`}>
                  {test.name}
                </Text>
              </View>
              <Text className="text-zinc-300 mb-4">{test.description}</Text>

              <View className="bg-zinc-900 rounded-xl p-4 mb-4">
                <Text className="text-white font-bold mb-3">Testing Protocol</Text>
                {test.protocol.map((step, sidx) => (
                  <View key={sidx} className="flex-row items-start mb-2 last:mb-0">
                    <View className={`w-6 h-6 rounded-full bg-${test.color}-500/20 items-center justify-center mt-0.5 border border-${test.color}-500/40`}>
                      <Text className={`text-${test.color}-400 font-bold text-xs`}>
                        {sidx + 1}
                      </Text>
                    </View>
                    <Text className="text-zinc-300 ml-2 flex-1">{step}</Text>
                  </View>
                ))}
              </View>

              {'safety' in test && (
                <View className="bg-red-500/10 rounded-xl p-4 mb-4 border border-red-500/30">
                  <Text className="text-red-400 font-bold mb-2">Safety Guidelines</Text>
                  {test.safety.map((tip, tidx) => (
                    <View key={tidx} className="flex-row items-start mb-1 last:mb-0">
                      <Ionicons name="shield-checkmark" size={16} color="#ef4444" />
                      <Text className="text-red-300 text-sm ml-2 flex-1">{tip}</Text>
                    </View>
                  ))}
                </View>
              )}

              {'standards' in test && (
                <View className="bg-zinc-900 rounded-xl p-4">
                  <Text className="text-white font-bold mb-3">Performance Standards</Text>
                  {Object.entries(test.standards).map(([gender, standard]) => (
                    <View key={gender} className="mb-2 last:mb-0">
                      <Text className={`text-${test.color}-400 font-bold capitalize mb-1`}>
                        {gender}:
                      </Text>
                      <Text className="text-zinc-300 text-sm">{standard}</Text>
                    </View>
                  ))}
                </View>
              )}

              {'limitations' in test && (
                <View className="bg-zinc-900 rounded-xl p-4">
                  <Text className="text-white font-bold mb-3">Common Limitations</Text>
                  {Object.entries(test.limitations).map(([issue, cause]) => (
                    <View key={issue} className="bg-zinc-800 rounded-lg p-2 mb-2 last:mb-0">
                      <Text className="text-red-400 font-bold text-sm mb-1">{issue}</Text>
                      <Text className="text-zinc-400 text-xs">{cause}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          ))}

          <View className="bg-blue-500/10 rounded-xl p-4 border border-blue-500/30 mb-6">
            <Text className="text-blue-400 font-bold mb-2">Testing Best Practices</Text>
            <Text className="text-blue-300 text-sm mb-2">
              • Test in same conditions each time (time of day, pre-test meal)
            </Text>
            <Text className="text-blue-300 text-sm mb-2">
              • Warm-up adequately but don't fatigue
            </Text>
            <Text className="text-blue-300 text-sm mb-2">
              • Record ALL results for future comparison
            </Text>
            <Text className="text-blue-300 text-sm">
              • Re-test every 4-8 weeks to track progress
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
