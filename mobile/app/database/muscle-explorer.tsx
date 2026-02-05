import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function MuscleGroupExplorer() {
  const [selectedMuscle, setSelectedMuscle] = useState<string>('chest');

  const muscleGroups = [
    {
      key: 'chest',
      name: 'Chest',
      icon: 'fitness',
      color: 'red',
      mainMuscles: ['Pectoralis Major', 'Pectoralis Minor'],
      functions: ['Horizontal Adduction', 'Internal Rotation', 'Flexion'],
      bestExercises: [
        { name: 'Bench Press', effectiveness: 95 },
        { name: 'Incline DB Press', effectiveness: 92 },
        { name: 'Cable Flyes', effectiveness: 88 },
        { name: 'Dips', effectiveness: 90 },
      ],
      weeklyVolume: '12-20 sets',
      frequency: '2-3x per week',
    },
    {
      key: 'back',
      name: 'Back',
      icon: 'barbell',
      color: 'blue',
      mainMuscles: ['Latissimus Dorsi', 'Rhomboids', 'Trapezius', 'Erector Spinae'],
      functions: ['Pulling', 'Extension', 'Retraction', 'Depression'],
      bestExercises: [
        { name: 'Deadlift', effectiveness: 98 },
        { name: 'Pull-ups', effectiveness: 95 },
        { name: 'Barbell Row', effectiveness: 93 },
        { name: 'Lat Pulldown', effectiveness: 88 },
      ],
      weeklyVolume: '15-25 sets',
      frequency: '2-3x per week',
    },
    {
      key: 'legs',
      name: 'Legs',
      icon: 'fitness',
      color: 'emerald',
      mainMuscles: ['Quadriceps', 'Hamstrings', 'Glutes', 'Calves'],
      functions: ['Extension', 'Flexion', 'Hip Extension', 'Plantar Flexion'],
      bestExercises: [
        { name: 'Squat', effectiveness: 98 },
        { name: 'Romanian DL', effectiveness: 95 },
        { name: 'Leg Press', effectiveness: 90 },
        { name: 'Leg Curl', effectiveness: 87 },
      ],
      weeklyVolume: '15-25 sets',
      frequency: '2x per week',
    },
    {
      key: 'shoulders',
      name: 'Shoulders',
      icon: 'fitness',
      color: 'amber',
      mainMuscles: ['Anterior Delt', 'Lateral Delt', 'Posterior Delt'],
      functions: ['Abduction', 'Flexion', 'Extension', 'Rotation'],
      bestExercises: [
        { name: 'Overhead Press', effectiveness: 95 },
        { name: 'Lateral Raises', effectiveness: 92 },
        { name: 'Face Pulls', effectiveness: 90 },
        { name: 'Arnold Press', effectiveness: 88 },
      ],
      weeklyVolume: '12-18 sets',
      frequency: '2-3x per week',
    },
    {
      key: 'arms',
      name: 'Arms',
      icon: 'barbell',
      color: 'purple',
      mainMuscles: ['Biceps Brachii', 'Triceps Brachii', 'Forearms'],
      functions: ['Elbow Flexion', 'Elbow Extension', 'Supination'],
      bestExercises: [
        { name: 'Barbell Curl', effectiveness: 92 },
        { name: 'Close Grip Bench', effectiveness: 95 },
        { name: 'Hammer Curls', effectiveness: 88 },
        { name: 'Tricep Dips', effectiveness: 93 },
      ],
      weeklyVolume: '12-16 sets',
      frequency: '2x per week',
    },
  ];

  const currentMuscle = muscleGroups.find((m) => m.key === selectedMuscle)!;

  return (
    <View className="flex-1 bg-zinc-950">
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1 ml-3">
            Muscle Explorer
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          <View className={`bg-gradient-to-r from-${currentMuscle.color}-500 to-${currentMuscle.color}-600 rounded-xl p-6 mb-6`}>
            <Text className="text-white text-2xl font-bold mb-2">{currentMuscle.name}</Text>
            <Text className="text-white opacity-90 mb-4">
              Complete muscle group guide
            </Text>
            <View className="flex-row items-center">
              <Ionicons name={currentMuscle.icon as any} size={20} color="white" />
              <Text className="text-white ml-2">{currentMuscle.bestExercises.length} best exercises</Text>
            </View>
          </View>

          <Text className="text-white font-bold mb-3">Muscle Groups</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6">
            <View className="flex-row gap-3">
              {muscleGroups.map((muscle) => (
                <TouchableOpacity
                  key={muscle.key}
                  onPress={() => setSelectedMuscle(muscle.key)}
                  className={`${
                    selectedMuscle === muscle.key ? `bg-${muscle.color}-500` : 'bg-zinc-900'
                  } rounded-xl px-6 py-3 border ${
                    selectedMuscle === muscle.key ? `border-${muscle.color}-400` : 'border-zinc-800'
                  }`}
                >
                  <Text
                    className={`${
                      selectedMuscle === muscle.key ? 'text-white' : 'text-zinc-400'
                    } font-bold`}
                  >
                    {muscle.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          <View className="bg-zinc-900 rounded-xl p-5 mb-4 border border-zinc-800">
            <Text className="text-white font-bold text-lg mb-3">Anatomy</Text>
            {currentMuscle.mainMuscles.map((muscle, idx) => (
              <View key={idx} className="flex-row items-center mb-2">
                <Ionicons name="ellipse" size={8} color="#9D12DE" />
                <Text className="text-zinc-300 ml-3">{muscle}</Text>
              </View>
            ))}
          </View>

          <View className="bg-zinc-900 rounded-xl p-5 mb-4 border border-zinc-800">
            <Text className="text-white font-bold text-lg mb-3">Functions</Text>
            {currentMuscle.functions.map((func, idx) => (
              <View key={idx} className="flex-row items-center mb-2">
                <Ionicons name="checkmark-circle" size={20} color="#9D12DE" />
                <Text className="text-zinc-300 ml-3">{func}</Text>
              </View>
            ))}
          </View>

          <View className="flex-row gap-3 mb-6">
            <View className="flex-1 bg-primary/10 rounded-xl p-4 border border-primary/30">
              <Text className="text-primary/80 text-sm mb-1">Weekly Volume</Text>
              <Text className="text-white font-bold text-lg">{currentMuscle.weeklyVolume}</Text>
            </View>
            <View className="flex-1 bg-primary/10 rounded-xl p-4 border border-primary/30">
              <Text className="text-primary text-sm mb-1">Frequency</Text>
              <Text className="text-white font-bold text-lg">{currentMuscle.frequency}</Text>
            </View>
          </View>

          <Text className="text-white font-bold text-lg mb-4">Best Exercises</Text>

          {currentMuscle.bestExercises.map((exercise, idx) => (
            <View key={idx} className={`bg-${currentMuscle.color}-500/10 rounded-xl p-5 mb-4 border border-${currentMuscle.color}-500/30`}>
              <View className="flex-row items-center justify-between mb-3">
                <Text className="text-white font-bold text-lg flex-1">{exercise.name}</Text>
                <View className={`bg-${currentMuscle.color}-500 rounded-full px-3 py-1`}>
                  <Text className="text-white text-sm font-bold">{exercise.effectiveness}%</Text>
                </View>
              </View>

              <View className="flex-row items-center mb-2">
                <Text className="text-zinc-400 text-sm mr-2">Effectiveness:</Text>
                <View className="flex-1 bg-zinc-800 rounded-full h-2">
                  <View
                    className={`h-2 rounded-full bg-${currentMuscle.color}-500`}
                    style={{ width: `${exercise.effectiveness}%` }}
                  />
                </View>
              </View>
            </View>
          ))}

          <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-6">
            <Text className="text-primary/80 font-bold mb-2">Training Tips</Text>
            <Text className="text-primary/60 text-sm">
              • Progressive overload cada semana{'\n'}
              • Full ROM en cada rep{'\n'}
              • Mind-muscle connection{'\n'}
              • Frequency &gt; volume en beginners{'\n'}
              • Recovery 48h entre sesiones
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

