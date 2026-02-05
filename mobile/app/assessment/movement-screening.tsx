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

export default function MovementScreening() {
  const [selectedMovement, setSelectedMovement] = useState('squat');

  const movements = [
    {
      id: 'squat',
      name: 'Deep Squat',
      icon: 'fitness' as const,
      color: 'blue',
      description: 'Bilateral, symmetrical mobility and stability',
      setup: [
        'Feet shoulder-width apart',
        'Toes straight ahead or slightly out',
        'Arms overhead, elbows locked',
        'Hold dowel/PVC pipe overhead',
      ],
      execution: [
        'Descend as deep as possible',
        'Keep heels down',
        'Maintain upright torso',
        'Keep arms overhead',
      ],
      scoring: {
        3: {
          criteria: 'Full depth squat, torso upright, arms overhead, heels down',
          label: 'Perfect',
          color: 'emerald',
        },
        2: {
          criteria: 'Needs 2x4 under heels to achieve criteria above',
          label: 'Acceptable',
          color: 'amber',
        },
        1: {
          criteria: 'Cannot achieve depth even with heel lift',
          label: 'Limited',
          color: 'red',
        },
      },
      corrections: [
        { issue: 'Heels lift', fix: 'Ankle mobility drills, calf stretches' },
        { issue: 'Torso leans', fix: 'Hip flexor stretches, goblet squats' },
        { issue: 'Arms fall', fix: 'Lat stretches, wall slides' },
        { issue: 'Knees cave', fix: 'Glute activation, banded walks' },
      ],
    },
    {
      id: 'hurdle',
      name: 'Hurdle Step',
      icon: 'walk' as const,
      color: 'purple',
      description: 'Single-leg balance and mobility',
      setup: [
        'Stand tall, dowel across shoulders',
        'Hurdle at tibial tuberosity height',
        'Maintain upright posture',
      ],
      execution: [
        'Lift leg over hurdle',
        'Touch heel on other side',
        'Return to start',
        'No wobbling or torso lean',
      ],
      scoring: {
        3: {
          criteria: 'Hips, knees, ankles aligned; dowel stays level; no loss of balance',
          label: 'Perfect',
          color: 'emerald',
        },
        2: {
          criteria: 'Minimal movement in dowel, slight alignment loss',
          label: 'Acceptable',
          color: 'amber',
        },
        1: {
          criteria: 'Dowel moves significantly, loss of balance, alignment issues',
          label: 'Limited',
          color: 'red',
        },
      },
      corrections: [
        { issue: 'Balance loss', fix: 'Single-leg balance drills, proprioception work' },
        { issue: 'Hip hikes', fix: 'Hip abductor strengthening, lateral band walks' },
        { issue: 'Knee valgus', fix: 'VMO strengthening, glute med work' },
      ],
    },
    {
      id: 'lunge',
      name: 'In-Line Lunge',
      icon: 'arrow-forward' as const,
      color: 'emerald',
      description: 'Dynamic stability and deceleration',
      setup: [
        'Stand on line, dowel behind back',
        'Opposite hand/foot (R hand to L shoulder, vice versa)',
        'Dowel touches head, spine, sacrum',
      ],
      execution: [
        'Step forward on line',
        'Lower back knee to touch heel of front foot',
        'Return to start',
        'Maintain dowel contact',
      ],
      scoring: {
        3: {
          criteria: 'Dowel maintains contact, no torso movement, knee touches',
          label: 'Perfect',
          color: 'emerald',
        },
        2: {
          criteria: 'Minor dowel loss, completes movement',
          label: 'Acceptable',
          color: 'amber',
        },
        1: {
          criteria: 'Cannot complete or major dowel loss',
          label: 'Limited',
          color: 'red',
        },
      },
      corrections: [
        { issue: 'Torso rotation', fix: 'Anti-rotation exercises, Pallof press' },
        { issue: 'Loss of balance', fix: 'Split squat progressions' },
        { issue: 'Limited depth', fix: 'Hip flexor stretches, mobility work' },
      ],
    },
    {
      id: 'shoulder',
      name: 'Shoulder Mobility',
      icon: 'resize' as const,
      color: 'amber',
      description: 'Bilateral shoulder range of motion',
      setup: [
        'Stand tall, fists made',
        'One hand overhead, one at lower back',
      ],
      execution: [
        'Reach hands toward each other',
        'Measure distance between fists',
        'Test both sides',
      ],
      scoring: {
        3: {
          criteria: 'Fists within one hand length',
          label: 'Perfect',
          color: 'emerald',
        },
        2: {
          criteria: 'Fists within 1.5 hand lengths',
          label: 'Acceptable',
          color: 'amber',
        },
        1: {
          criteria: 'Fists more than 1.5 hand lengths apart',
          label: 'Limited',
          color: 'red',
        },
      },
      corrections: [
        { issue: 'Top arm limited', fix: 'Lat stretches, doorway stretches' },
        { issue: 'Bottom arm limited', fix: 'Internal rotation drills, sleeper stretch' },
        { issue: 'Asymmetry', fix: 'Focus on limited side, 2:1 ratio' },
      ],
    },
    {
      id: 'leg-raise',
      name: 'Active Straight Leg Raise',
      icon: 'arrow-up' as const,
      color: 'red',
      description: 'Hamstring flexibility and core stability',
      setup: [
        'Lie on back',
        'Dowel across ASIS (hip bones)',
        'One leg straight on ground',
      ],
      execution: [
        'Raise other leg, keep knee straight',
        'Opposite leg stays flat',
        'Raise as high as possible',
      ],
      scoring: {
        3: {
          criteria: 'Malleolus (ankle) passes mid-thigh of down leg',
          label: 'Perfect',
          color: 'emerald',
        },
        2: {
          criteria: 'Malleolus reaches mid-thigh',
          label: 'Acceptable',
          color: 'amber',
        },
        1: {
          criteria: 'Malleolus does not reach mid-thigh',
          label: 'Limited',
          color: 'red',
        },
      },
      corrections: [
        { issue: 'Limited ROM', fix: 'Hamstring stretches, neural flossing' },
        { issue: 'Down leg lifts', fix: 'Core bracing, dead bug progressions' },
        { issue: 'Asymmetry', fix: 'Prioritize limited side' },
      ],
    },
  ];

  const currentMovement = movements.find((m) => m.id === selectedMovement)!;

  return (
    <View className="flex-1 bg-zinc-950">
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1 ml-3">
            Movement Screening
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          <View className="bg-gradient-to-r from-blue-500 to-emerald-500 rounded-xl p-6 mb-6">
            <Text className="text-white text-2xl font-bold mb-2">Screen Movement</Text>
            <Text className="text-white opacity-90">
              Identify limitations and asymmetries
            </Text>
          </View>

          <View className="mb-6">
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View className="flex-row gap-3">
                {movements.map((mov) => (
                  <TouchableOpacity
                    key={mov.id}
                    onPress={() => setSelectedMovement(mov.id)}
                    className={`${
                      selectedMovement === mov.id
                        ? `bg-${mov.color}-500`
                        : 'bg-zinc-800'
                    } rounded-xl px-4 py-3 border ${
                      selectedMovement === mov.id
                        ? `border-${mov.color}-400`
                        : 'border-zinc-700'
                    }`}
                  >
                    <View className="flex-row items-center">
                      <Ionicons name={mov.icon} size={20} color="white" />
                      <Text className="text-white font-bold ml-2 text-sm">{mov.name}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>

          <View className={`bg-${currentMovement.color}-500/10 rounded-xl p-5 mb-6 border border-${currentMovement.color}-500/30`}>
            <View className="flex-row items-center mb-3">
              <Ionicons name={currentMovement.icon} size={28} color={`#${currentMovement.color === 'blue' ? '3b82f6' : currentMovement.color === 'purple' ? 'a855f7' : currentMovement.color === 'emerald' ? '10b981' : currentMovement.color === 'amber' ? 'f59e0b' : 'ef4444'}`} />
              <Text className={`text-${currentMovement.color}-400 font-bold text-xl ml-3 flex-1`}>
                {currentMovement.name}
              </Text>
            </View>
            <Text className="text-zinc-300">{currentMovement.description}</Text>
          </View>

          <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
            <Text className="text-white font-bold text-lg mb-3">Setup</Text>
            {currentMovement.setup.map((step, idx) => (
              <View key={idx} className="flex-row items-start mb-2 last:mb-0">
                <Ionicons name="checkmark-circle" size={18} color="#9D12DE" />
                <Text className="text-zinc-300 ml-2 flex-1">{step}</Text>
              </View>
            ))}
          </View>

          <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
            <Text className="text-white font-bold text-lg mb-3">Execution</Text>
            {currentMovement.execution.map((step, idx) => (
              <View key={idx} className="flex-row items-start mb-2 last:mb-0">
                <View className={`w-6 h-6 rounded-full bg-${currentMovement.color}-500/20 items-center justify-center mt-0.5 border border-${currentMovement.color}-500/40`}>
                  <Text className={`text-${currentMovement.color}-400 font-bold text-xs`}>
                    {idx + 1}
                  </Text>
                </View>
                <Text className="text-zinc-300 ml-2 flex-1">{step}</Text>
              </View>
            ))}
          </View>

          <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
            <Text className="text-white font-bold text-lg mb-4">Scoring System</Text>
            {Object.entries(currentMovement.scoring).reverse().map(([score, data]) => (
              <View key={score} className={`bg-${data.color}-500/10 rounded-xl p-4 mb-3 last:mb-0 border border-${data.color}-500/30`}>
                <View className="flex-row items-center justify-between mb-2">
                  <Text className={`text-${data.color}-400 font-bold text-2xl`}>{score}</Text>
                  <View className={`px-3 py-1 rounded-full bg-${data.color}-500/20`}>
                    <Text className={`text-${data.color}-400 font-bold text-sm`}>{data.label}</Text>
                  </View>
                </View>
                <Text className="text-zinc-300 text-sm">{data.criteria}</Text>
              </View>
            ))}
          </View>

          <View className={`bg-${currentMovement.color}-500/10 rounded-xl p-5 mb-6 border border-${currentMovement.color}-500/30`}>
            <Text className={`text-${currentMovement.color}-400 font-bold text-lg mb-4`}>
              Common Issues & Fixes
            </Text>
            {currentMovement.corrections.map((corr, idx) => (
              <View key={idx} className="bg-zinc-900 rounded-xl p-3 mb-3 last:mb-0">
                <Text className="text-red-400 font-bold mb-1">{corr.issue}</Text>
                <Text className="text-primary text-sm">{corr.fix}</Text>
              </View>
            ))}
          </View>

          <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-6">
            <Text className="text-primary/80 font-bold mb-2">Screening Tips</Text>
            <Text className="text-primary/60 text-sm mb-2">
              â€¢ Record video to review form
            </Text>
            <Text className="text-primary/60 text-sm mb-2">
              â€¢ Test both sides for asymmetries
            </Text>
            <Text className="text-primary/60 text-sm mb-2">
              â€¢ Re-screen every 4-6 weeks to track improvements
            </Text>
            <Text className="text-primary/60 text-sm">
              â€¢ Score of 1 = address limitation before heavy loading
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

