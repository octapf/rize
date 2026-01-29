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

export default function AutoRegulation() {
  const [selectedMethod, setSelectedMethod] = useState('rpe');

  const methods = [
    {
      id: 'rpe',
      name: 'RPE (Rate of Perceived Exertion)',
      icon: 'speedometer' as const,
      color: 'blue',
      description: 'Subjective intensity scale from 1-10',
      scale: {
        10: 'Maximal effort, could not do another rep',
        9.5: 'Could not add weight, maybe 1 more rep',
        9: '1 rep left in tank',
        8.5: '1-2 reps left, could maybe add small weight',
        8: '2 reps left in tank',
        7.5: '2-3 reps left, definitely could go heavier',
        7: '3 reps left in tank',
        6: '4+ reps left, warm-up/moderate weight',
      },
      usage: [
        'Judge AFTER completing set',
        'Be honest - ego will inflate RPE',
        'Track RPE alongside weight/reps',
        'Adjust next set based on RPE',
      ],
      example: {
        scenario: 'Programmed: 4 sets of 5 @ RPE 8',
        execution: [
          'Set 1: 100kg × 5 @ RPE 7 → too easy, add weight',
          'Set 2: 105kg × 5 @ RPE 8 → perfect, maintain',
          'Set 3: 105kg × 5 @ RPE 8.5 → slightly harder, fatigue accumulating',
          'Set 4: 105kg × 5 @ RPE 9 → harder but completed, good session',
        ],
      },
    },
    {
      id: 'rir',
      name: 'RIR (Reps in Reserve)',
      icon: 'battery-half' as const,
      color: 'emerald',
      description: 'How many reps left before failure',
      scale: {
        0: 'Failure - no reps left',
        1: 'Could do 1 more rep',
        2: 'Could do 2 more reps',
        3: 'Could do 3 more reps',
        4: '4+ reps left (submaximal)',
      },
      usage: [
        'Easier to understand than RPE for beginners',
        'Stop X reps before failure',
        'More concrete than "perceived effort"',
        'Track to ensure progressive overload',
      ],
      programming: [
        { week: 'Week 1-3', rir: '3 RIR', intensity: 'Moderate' },
        { week: 'Week 4-6', rir: '2 RIR', intensity: 'Hard' },
        { week: 'Week 7-8', rir: '1 RIR', intensity: 'Very Hard' },
        { week: 'Week 9 (Deload)', rir: '4-5 RIR', intensity: 'Easy' },
      ],
    },
    {
      id: 'velocity',
      name: 'Velocity-Based Training (VBT)',
      icon: 'flash' as const,
      color: 'purple',
      description: 'Track bar speed to determine intensity',
      zones: {
        'Speed (>1.0 m/s)': 'Light weight, explosive intent (40-60% 1RM)',
        'Speed-Strength (0.75-1.0 m/s)': 'Moderate weight, fast (60-80% 1RM)',
        'Strength-Speed (0.5-0.75 m/s)': 'Heavy weight (80-90% 1RM)',
        'Absolute Strength (<0.5 m/s)': 'Max effort (90%+ 1RM)',
      },
      tools: [
        'Expensive: GymAware, PUSH band',
        'Budget: Barbell tracking apps',
        'DIY: Video analysis with apps',
      ],
      usage: [
        'Stop set when velocity drops 20% from first rep',
        'Ensures quality reps, prevents junk volume',
        'Objective measure (no guessing RPE)',
        'Detects fatigue/readiness',
      ],
      example: 'Squat: First rep 0.6 m/s → stop set when rep hits 0.48 m/s (20% drop)',
    },
    {
      id: 'amrap',
      name: 'AMRAP (As Many Reps As Possible)',
      icon: 'infinite' as const,
      color: 'red',
      description: 'Test sets to gauge strength',
      protocol: [
        'Pick target weight (usually 80-90% estimated 1RM)',
        'Perform as many reps as possible',
        'Track reps achieved',
        'Use to estimate 1RM or adjust program',
      ],
      formulas: [
        'Epley: 1RM = weight × (1 + reps/30)',
        'Brzycki: 1RM = weight × (36 / (37 - reps))',
        'Wathan: 1RM = weight × (48.8 + 53.8×e^(-0.075×reps))',
      ],
      frequency: 'Test AMRAP every 3-4 weeks max',
      cautions: [
        'Very fatiguing - use sparingly',
        'Need spotter for safety',
        'Not good for technique-sensitive lifts',
        'Can accumulate fatigue over time',
      ],
    },
    {
      id: 'daily',
      name: 'Daily Max (Reactive Training)',
      icon: 'today' as const,
      color: 'amber',
      description: 'Work up to daily max based on feel',
      protocol: [
        'Start with empty bar, warm up',
        'Add weight in moderate jumps',
        'Work up to "today\'s max" - heavy single @ RPE 9',
        'Back off sets at 80-90% of daily max',
        'Adjust based on how you feel',
      ],
      benefits: [
        'Accounts for daily fluctuations',
        'Prevents overtraining on bad days',
        'Allows pushing harder on good days',
        'Teaches listening to your body',
      ],
      bestFor: 'Experienced lifters who know their bodies well',
      example: {
        goodDay: 'Feel great → hit 140kg squat daily max → back off at 120kg',
        badDay: 'Feel weak → only 125kg squat feels heavy → back off at 105kg',
      },
    },
  ];

  const currentMethod = methods.find((m) => m.id === selectedMethod)!;

  return (
    <View className="flex-1 bg-zinc-950">
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1 ml-3">
            Auto-Regulation
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          <View className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl p-6 mb-6">
            <Text className="text-white text-2xl font-bold mb-2">Smart Training</Text>
            <Text className="text-white opacity-90">
              Adjust based on readiness
            </Text>
          </View>

          <View className="mb-6">
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View className="flex-row gap-3">
                {methods.map((method) => (
                  <TouchableOpacity
                    key={method.id}
                    onPress={() => setSelectedMethod(method.id)}
                    className={`${
                      selectedMethod === method.id
                        ? `bg-${method.color}-500`
                        : 'bg-zinc-800'
                    } rounded-xl px-4 py-3 border ${
                      selectedMethod === method.id
                        ? `border-${method.color}-400`
                        : 'border-zinc-700'
                    }`}
                  >
                    <View className="flex-row items-center">
                      <Ionicons name={method.icon} size={20} color="white" />
                      <Text className="text-white font-bold ml-2 text-sm">{method.name}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>

          <View className={`bg-${currentMethod.color}-500/10 rounded-xl p-5 mb-6 border border-${currentMethod.color}-500/30`}>
            <View className="flex-row items-center mb-3">
              <Ionicons name={currentMethod.icon} size={28} color={`#${currentMethod.color === 'blue' ? '3b82f6' : currentMethod.color === 'emerald' ? '10b981' : currentMethod.color === 'purple' ? 'a855f7' : currentMethod.color === 'red' ? 'ef4444' : 'f59e0b'}`} />
              <Text className={`text-${currentMethod.color}-400 font-bold text-xl ml-3 flex-1`}>
                {currentMethod.name}
              </Text>
            </View>
            <Text className="text-zinc-300">{currentMethod.description}</Text>
          </View>

          {'scale' in currentMethod && (
            <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
              <Text className="text-white font-bold text-lg mb-4">Scale</Text>
              {Object.entries(currentMethod.scale).reverse().map(([level, desc]) => (
                <View key={level} className={`bg-${currentMethod.color}-500/10 rounded-xl p-3 mb-2 last:mb-0 border border-${currentMethod.color}-500/30`}>
                  <View className="flex-row items-center justify-between mb-1">
                    <Text className={`text-${currentMethod.color}-400 font-bold text-xl`}>
                      {level}
                    </Text>
                  </View>
                  <Text className="text-zinc-300 text-sm">{desc}</Text>
                </View>
              ))}
            </View>
          )}

          {'zones' in currentMethod && (
            <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
              <Text className="text-white font-bold text-lg mb-4">Velocity Zones</Text>
              {Object.entries(currentMethod.zones).map(([zone, desc]) => (
                <View key={zone} className={`bg-${currentMethod.color}-500/10 rounded-xl p-3 mb-2 last:mb-0 border border-${currentMethod.color}-500/30`}>
                  <Text className={`text-${currentMethod.color}-400 font-bold mb-1`}>{zone}</Text>
                  <Text className="text-zinc-300 text-sm">{desc}</Text>
                </View>
              ))}
            </View>
          )}

          {'protocol' in currentMethod && (
            <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
              <Text className="text-white font-bold text-lg mb-4">Protocol</Text>
              {currentMethod.protocol.map((step, idx) => (
                <View key={idx} className="flex-row items-start mb-2 last:mb-0">
                  <View className={`w-6 h-6 rounded-full bg-${currentMethod.color}-500/20 items-center justify-center mt-0.5 border border-${currentMethod.color}-500/40`}>
                    <Text className={`text-${currentMethod.color}-400 font-bold text-xs`}>
                      {idx + 1}
                    </Text>
                  </View>
                  <Text className="text-zinc-300 ml-2 flex-1">{step}</Text>
                </View>
              ))}
            </View>
          )}

          {'usage' in currentMethod && (
            <View className={`bg-${currentMethod.color}-500/10 rounded-xl p-5 mb-6 border border-${currentMethod.color}-500/30`}>
              <Text className={`text-${currentMethod.color}-400 font-bold text-lg mb-3`}>
                How to Use
              </Text>
              {currentMethod.usage.map((tip, idx) => (
                <View key={idx} className="flex-row items-start mb-2 last:mb-0">
                  <Ionicons name="checkmark-circle" size={16} color={`#${currentMethod.color === 'blue' ? '3b82f6' : currentMethod.color === 'emerald' ? '10b981' : currentMethod.color === 'purple' ? 'a855f7' : currentMethod.color === 'red' ? 'ef4444' : 'f59e0b'}`} />
                  <Text className="text-zinc-300 ml-2 flex-1">{tip}</Text>
                </View>
              ))}
            </View>
          )}

          {'example' in currentMethod && 'execution' in currentMethod.example && (
            <View className="bg-emerald-500/10 rounded-xl p-5 mb-6 border border-emerald-500/30">
              <Text className="text-emerald-400 font-bold text-lg mb-3">Example</Text>
              <Text className="text-zinc-300 mb-3">{currentMethod.example.scenario}</Text>
              {currentMethod.example.execution.map((step, idx) => (
                <Text key={idx} className="text-zinc-300 text-sm mb-1 last:mb-0">
                  {step}
                </Text>
              ))}
            </View>
          )}

          {'programming' in currentMethod && (
            <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
              <Text className="text-white font-bold text-lg mb-4">Programming Example</Text>
              {currentMethod.programming.map((phase, idx) => (
                <View key={idx} className="flex-row justify-between items-center bg-zinc-800 rounded-xl p-3 mb-2 last:mb-0">
                  <Text className="text-zinc-300">{phase.week}</Text>
                  <Text className={`text-${currentMethod.color}-400 font-bold`}>{phase.rir}</Text>
                </View>
              ))}
            </View>
          )}

          <View className="bg-blue-500/10 rounded-xl p-4 border border-blue-500/30 mb-6">
            <Text className="text-blue-400 font-bold mb-2">Why Auto-Regulate?</Text>
            <Text className="text-blue-300 text-sm mb-2">
              • Not every day is the same - sleep, stress, nutrition vary
            </Text>
            <Text className="text-blue-300 text-sm mb-2">
              • Prevents overtraining on bad days
            </Text>
            <Text className="text-blue-300 text-sm mb-2">
              • Allows pushing harder on good days
            </Text>
            <Text className="text-blue-300 text-sm">
              • More sustainable long-term than rigid programming
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
