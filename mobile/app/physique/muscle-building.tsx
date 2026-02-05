import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function MuscleBuilding() {
  const [selectedMuscle, setSelectedMuscle] = useState('chest');

  const muscleGroups = [
    {
      id: 'chest',
      name: 'Chest',
      icon: 'body' as const,
      color: 'red',
      primaryExercises: [
        { name: 'Barbell Bench Press', sets: '4x6-8', focus: 'Overall mass' },
        { name: 'Incline Dumbbell Press', sets: '3x8-10', focus: 'Upper chest' },
        { name: 'Dips', sets: '3x8-12', focus: 'Lower chest' },
        { name: 'Cable Flyes', sets: '3x12-15', focus: 'Stretch & contraction' },
      ],
      anatomy: {
        upper: 'Clavicular head (upper chest)',
        mid: 'Sternal head (mid chest)',
        lower: 'Costal head (lower chest)',
      },
      tips: [
        'Retract scapula for stability',
        'Full ROM for chest stretch',
        'Squeeze at top of movements',
        'Hit all angles (flat/incline/decline)',
      ],
      frequency: '2x per week',
      volumeLandmark: '12-18 sets per week',
    },
    {
      id: 'back',
      name: 'Back',
      icon: 'fitness' as const,
      color: 'blue',
      primaryExercises: [
        { name: 'Deadlifts', sets: '3x5-8', focus: 'Overall back thickness' },
        { name: 'Pull-ups/Chin-ups', sets: '4x6-10', focus: 'Lats width' },
        { name: 'Barbell Rows', sets: '4x8-10', focus: 'Mid-back thickness' },
        { name: 'Face Pulls', sets: '3x15-20', focus: 'Rear delts & upper back' },
      ],
      anatomy: {
        upper: 'Traps, rhomboids',
        mid: 'Lats, teres major',
        lower: 'Erector spinae, lats',
      },
      tips: [
        'Pull with elbows, not hands',
        'Squeeze scapula together',
        'Horizontal pulls for thickness',
        'Vertical pulls for width',
      ],
      frequency: '2x per week',
      volumeLandmark: '15-20 sets per week',
    },
    {
      id: 'shoulders',
      name: 'Shoulders',
      icon: 'arrow-up' as const,
      color: 'amber',
      primaryExercises: [
        { name: 'Overhead Press', sets: '4x6-8', focus: 'Overall delt mass' },
        { name: 'Lateral Raises', sets: '4x12-15', focus: 'Side delt width' },
        { name: 'Rear Delt Flyes', sets: '3x15-20', focus: 'Rear delt development' },
        { name: 'Front Raises', sets: '3x10-12', focus: 'Front delt emphasis' },
      ],
      anatomy: {
        front: 'Anterior deltoid',
        side: 'Lateral deltoid (width)',
        rear: 'Posterior deltoid',
      },
      tips: [
        'Don\'t let traps take over',
        'Controlled eccentrics',
        'Side delts need highest volume',
        'Don\'t neglect rear delts',
      ],
      frequency: '2x per week',
      volumeLandmark: '15-20 sets per week',
    },
    {
      id: 'arms',
      name: 'Arms',
      icon: 'barbell' as const,
      color: 'purple',
      primaryExercises: [
        { name: 'Barbell Curls', sets: '3x8-10', focus: 'Bicep mass' },
        { name: 'Hammer Curls', sets: '3x10-12', focus: 'Brachialis & forearms' },
        { name: 'Close-Grip Bench', sets: '3x8-10', focus: 'Tricep mass' },
        { name: 'Overhead Extensions', sets: '3x10-12', focus: 'Long head triceps' },
      ],
      anatomy: {
        biceps: 'Biceps brachii (long & short head)',
        triceps: 'Triceps (long, lateral, medial head)',
        forearms: 'Brachialis, brachioradialis',
      },
      tips: [
        'Full ROM for biceps',
        'Lock out triceps fully',
        'Don\'t swing/cheat reps',
        'Triceps 2/3 of arm mass',
      ],
      frequency: '2x per week',
      volumeLandmark: 'Biceps: 10-15 sets, Triceps: 12-18 sets',
    },
    {
      id: 'legs',
      name: 'Legs',
      icon: 'walk' as const,
      color: 'emerald',
      primaryExercises: [
        { name: 'Squats', sets: '4x6-8', focus: 'Overall leg mass' },
        { name: 'Romanian Deadlifts', sets: '3x8-10', focus: 'Hamstrings & glutes' },
        { name: 'Leg Press', sets: '3x10-12', focus: 'Quad volume' },
        { name: 'Leg Curls', sets: '3x12-15', focus: 'Hamstring isolation' },
      ],
      anatomy: {
        quads: 'Quadriceps (4 heads)',
        hamstrings: 'Biceps femoris, semitendinosus, semimembranosus',
        glutes: 'Gluteus maximus, medius, minimus',
        calves: 'Gastrocnemius, soleus',
      },
      tips: [
        'Full depth on squats',
        'Hip hinge for hamstrings',
        'Train calves 3-4x per week',
        'High volume for legs',
      ],
      frequency: '2x per week',
      volumeLandmark: '15-20 sets quads, 10-15 sets hamstrings',
    },
  ];

  const principles = [
    {
      principle: 'Progressive Overload',
      icon: 'trending-up' as const,
      description: 'Gradually increase weight, reps, or volume over time',
      howTo: 'Add 2.5-5kg when you hit top of rep range for all sets',
    },
    {
      principle: 'Mind-Muscle Connection',
      icon: 'flash' as const,
      description: 'Focus on feeling the target muscle work',
      howTo: 'Slower tempo, squeeze peak contraction, visualize muscle',
    },
    {
      principle: 'Time Under Tension',
      icon: 'time' as const,
      description: '30-60 seconds per set optimal for hypertrophy',
      howTo: '2-3 second eccentrics, 1 second pause, 1 second concentric',
    },
    {
      principle: 'Volume Landmarks',
      icon: 'bar-chart' as const,
      description: '10-20 sets per muscle per week',
      howTo: 'Start at 10 sets, add volume if not growing',
    },
  ];

  const currentMuscle = muscleGroups.find((m) => m.id === selectedMuscle)!;

  return (
    <View className="flex-1 bg-zinc-950">
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1 ml-3">
            Muscle Building
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          <View className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-6 mb-6">
            <Text className="text-white text-2xl font-bold mb-2">Build Muscle</Text>
            <Text className="text-white opacity-90">
              Science-based hypertrophy guide
            </Text>
          </View>

          <View className="mb-6">
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View className="flex-row gap-3">
                {muscleGroups.map((muscle) => (
                  <TouchableOpacity
                    key={muscle.id}
                    onPress={() => setSelectedMuscle(muscle.id)}
                    className={`${
                      selectedMuscle === muscle.id
                        ? `bg-${muscle.color}-500`
                        : 'bg-zinc-800'
                    } rounded-xl px-4 py-3 border ${
                      selectedMuscle === muscle.id
                        ? `border-${muscle.color}-400`
                        : 'border-zinc-700'
                    }`}
                  >
                    <View className="flex-row items-center">
                      <Ionicons name={muscle.icon} size={20} color="white" />
                      <Text className="text-white font-bold ml-2">{muscle.name}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>

          <View className={`bg-${currentMuscle.color}-500/10 rounded-xl p-5 mb-6 border border-${currentMuscle.color}-500/30`}>
            <View className="flex-row items-center mb-3">
              <Ionicons name={currentMuscle.icon} size={28} color={`#${currentMuscle.color === 'red' ? 'ef4444' : currentMuscle.color === 'blue' ? '3b82f6' : currentMuscle.color === 'emerald' ? '10b981' : currentMuscle.color === 'purple' ? 'a855f7' : 'f59e0b'}`} />
              <Text className={`text-${currentMuscle.color}-400 font-bold text-2xl ml-3`}>
                {currentMuscle.name}
              </Text>
            </View>

            <View className="bg-zinc-900 rounded-xl p-3 mb-3">
              <Text className="text-zinc-400 text-sm mb-1">Training Frequency</Text>
              <Text className="text-white font-bold">{currentMuscle.frequency}</Text>
            </View>

            <View className="bg-zinc-900 rounded-xl p-3">
              <Text className="text-zinc-400 text-sm mb-1">Weekly Volume</Text>
              <Text className="text-white font-bold">{currentMuscle.volumeLandmark}</Text>
            </View>
          </View>

          <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
            <Text className="text-white font-bold text-lg mb-4">Anatomy Breakdown</Text>
            {Object.entries(currentMuscle.anatomy).map(([region, desc]) => (
              <View key={region} className="flex-row items-start mb-2 last:mb-0">
                <View className={`w-2 h-2 rounded-full bg-${currentMuscle.color}-500 mt-1.5`} />
                <Text className="text-zinc-300 ml-2 flex-1">
                  <Text className="font-bold capitalize">{region}:</Text> {desc}
                </Text>
              </View>
            ))}
          </View>

          <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
            <Text className="text-white font-bold text-lg mb-4">Primary Exercises</Text>
            {currentMuscle.primaryExercises.map((exercise, idx) => (
              <View
                key={idx}
                className={`bg-${currentMuscle.color}-500/10 rounded-xl p-4 mb-3 last:mb-0 border border-${currentMuscle.color}-500/30`}
              >
                <Text className="text-white font-bold text-lg mb-1">{exercise.name}</Text>
                <View className="flex-row justify-between items-center">
                  <Text className={`text-${currentMuscle.color}-400 font-bold`}>{exercise.sets}</Text>
                  <Text className="text-zinc-400 text-sm">{exercise.focus}</Text>
                </View>
              </View>
            ))}
          </View>

          <View className={`bg-${currentMuscle.color}-500/10 rounded-xl p-5 mb-6 border border-${currentMuscle.color}-500/30`}>
            <Text className={`text-${currentMuscle.color}-400 font-bold text-lg mb-3`}>
              Training Tips
            </Text>
            {currentMuscle.tips.map((tip, idx) => (
              <View key={idx} className="flex-row items-start mb-2 last:mb-0">
                <Ionicons name="checkmark-circle" size={18} color={`#${currentMuscle.color === 'red' ? 'ef4444' : currentMuscle.color === 'blue' ? '3b82f6' : currentMuscle.color === 'emerald' ? '10b981' : currentMuscle.color === 'purple' ? 'a855f7' : 'f59e0b'}`} />
                <Text className="text-zinc-300 ml-2 flex-1">{tip}</Text>
              </View>
            ))}
          </View>

          <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
            <Text className="text-white font-bold text-lg mb-4">Hypertrophy Principles</Text>
            {principles.map((p, idx) => (
              <View key={idx} className="bg-zinc-800 rounded-xl p-4 mb-3 last:mb-0 border border-zinc-700">
                <View className="flex-row items-center mb-2">
                  <Ionicons name={p.icon} size={20} color="#9D12DE" />
                  <Text className="text-white font-bold text-lg ml-2">{p.principle}</Text>
                </View>
                <Text className="text-zinc-300 mb-2">{p.description}</Text>
                <View className="bg-primary/10 rounded-lg p-2 border border-primary/30">
                  <Text className="text-primary text-sm">{p.howTo}</Text>
                </View>
              </View>
            ))}
          </View>

          <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-6">
            <Text className="text-primary/80 font-bold mb-2">Growth Formula</Text>
            <Text className="text-primary/60 text-sm">
              Muscle growth = Progressive overload + Sufficient volume + Adequate protein (1.6-2.2g/kg) + Sleep (7-9h) + Consistency over months/years
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

