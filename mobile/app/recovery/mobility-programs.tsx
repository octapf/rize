import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function MobilityPrograms() {
  const [selectedProgram, setSelectedProgram] = useState<string>('daily');

  const programs = [
    { key: 'daily', label: 'Daily Routine', duration: '10 min', color: 'blue' },
    { key: 'pre-workout', label: 'Pre-Workout', duration: '8 min', color: 'emerald' },
    { key: 'hip-mobility', label: 'Hip Mobility', duration: '15 min', color: 'purple' },
    { key: 'shoulder-health', label: 'Shoulder Health', duration: '12 min', color: 'amber' },
  ];

  const programDetails = {
    'daily': [
      { exercise: 'Cat-Cow Stretch', sets: '2', reps: '10', rest: '-', target: 'Spinal mobility', icon: 'body' },
      { exercise: 'World\'s Greatest Stretch', sets: '2', reps: '5/side', rest: '30s', target: 'Full body', icon: 'fitness' },
      { exercise: 'Deep Squat Hold', sets: '3', reps: '30s', rest: '20s', target: 'Hip/ankle', icon: 'fitness' },
      { exercise: 'Shoulder Dislocations', sets: '2', reps: '12', rest: '30s', target: 'Shoulder', icon: 'fitness' },
      { exercise: 'Leg Swings', sets: '2', reps: '10/leg', rest: '20s', target: 'Hip flexors', icon: 'body' },
    ],
    'pre-workout': [
      { exercise: 'Arm Circles', sets: '2', reps: '10/dir', rest: '-', target: 'Shoulder warm-up', icon: 'fitness' },
      { exercise: 'Leg Swings', sets: '2', reps: '10/leg', rest: '-', target: 'Hip mobility', icon: 'body' },
      { exercise: 'Torso Twists', sets: '2', reps: '15', rest: '-', target: 'Spinal rotation', icon: 'body' },
      { exercise: 'High Knees', sets: '2', reps: '20', rest: '30s', target: 'Dynamic warm-up', icon: 'walk' },
      { exercise: 'Bodyweight Squats', sets: '2', reps: '15', rest: '30s', target: 'Lower body prep', icon: 'fitness' },
    ],
    'hip-mobility': [
      { exercise: '90/90 Hip Stretch', sets: '3', reps: '60s/side', rest: '30s', target: 'Hip internal rotation', icon: 'body' },
      { exercise: 'Cossack Squats', sets: '3', reps: '8/side', rest: '45s', target: 'Hip adductors', icon: 'fitness' },
      { exercise: 'Pigeon Pose', sets: '2', reps: '90s/side', rest: '30s', target: 'Hip external rotation', icon: 'body' },
      { exercise: 'Hip Circles', sets: '2', reps: '10/dir', rest: '30s', target: 'Hip joint', icon: 'ellipse' },
      { exercise: 'Frog Stretch', sets: '3', reps: '60s', rest: '30s', target: 'Hip flexors/adductors', icon: 'body' },
    ],
    'shoulder-health': [
      { exercise: 'Band Pull-Aparts', sets: '3', reps: '15', rest: '30s', target: 'Rear delts', icon: 'barbell' },
      { exercise: 'Face Pulls', sets: '3', reps: '12', rest: '45s', target: 'Rotator cuff', icon: 'barbell' },
      { exercise: 'Wall Slides', sets: '3', reps: '10', rest: '30s', target: 'Scapular control', icon: 'fitness' },
      { exercise: 'Doorway Stretch', sets: '2', reps: '60s', rest: '30s', target: 'Chest/front delt', icon: 'body' },
      { exercise: 'YTWs', sets: '2', reps: '10 each', rest: '45s', target: 'Upper back', icon: 'fitness' },
    ],
  };

  const benefits = [
    { title: 'Injury Prevention', desc: 'Reduce risk 60%', icon: 'shield', color: 'emerald' },
    { title: 'Better Range of Motion', desc: 'Improved performance', icon: 'fitness', color: 'blue' },
    { title: 'Joint Health', desc: 'Long-term mobility', icon: 'pulse', color: 'purple' },
    { title: 'Pain Reduction', desc: 'Less chronic pain', icon: 'fitness', color: 'amber' },
  ];

  const assessments = [
    { test: 'Overhead Squat', score: 7, max: 10, status: 'good' },
    { test: 'Shoulder Flexion', score: 6, max: 10, status: 'warning' },
    { test: 'Hip Internal Rotation', score: 5, max: 10, status: 'warning' },
    { test: 'Ankle Dorsiflexion', score: 8, max: 10, status: 'good' },
  ];

  const currentExercises = programDetails[selectedProgram as keyof typeof programDetails];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'emerald';
      case 'warning': return 'amber';
      case 'critical': return 'red';
      default: return 'zinc';
    }
  };

  return (
    <View className="flex-1 bg-zinc-950">
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1 ml-3">
            Mobility Programs
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          <View className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-6 mb-6">
            <Text className="text-white text-2xl font-bold mb-2">Mobility Training</Text>
            <Text className="text-white opacity-90 mb-4">
              Improve flexibility and joint health
            </Text>
            <View className="flex-row items-center">
              <Ionicons name="body" size={20} color="white" />
              <Text className="text-white ml-2">28 day mobility program</Text>
            </View>
          </View>

          <Text className="text-white font-bold text-lg mb-4">Programs</Text>

          <View className="flex-row flex-wrap gap-3 mb-6">
            {programs.map((program) => (
              <TouchableOpacity
                key={program.key}
                onPress={() => setSelectedProgram(program.key)}
                className={`flex-1 min-w-[45%] ${
                  selectedProgram === program.key ? `bg-${program.color}-500` : 'bg-zinc-900'
                } rounded-xl p-4 border ${
                  selectedProgram === program.key ? `border-${program.color}-400` : 'border-zinc-800'
                }`}
              >
                <Text
                  className={`${
                    selectedProgram === program.key ? 'text-white' : 'text-zinc-400'
                  } font-bold mb-1`}
                >
                  {program.label}
                </Text>
                <Text
                  className={`${
                    selectedProgram === program.key ? 'text-white' : 'text-zinc-500'
                  } text-sm`}
                >
                  {program.duration}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text className="text-white font-bold text-lg mb-4">Exercises</Text>

          {currentExercises.map((exercise, idx) => (
            <View key={idx} className="bg-zinc-900 rounded-xl p-4 mb-3 border border-zinc-800">
              <View className="flex-row items-start justify-between mb-2">
                <View className="flex-row items-center flex-1">
                  <Ionicons name={exercise.icon as any} size={20} color="#3b82f6" />
                  <Text className="text-white font-bold ml-2 flex-1">{exercise.exercise}</Text>
                </View>
              </View>

              <View className="flex-row gap-2 mb-2">
                <View className="bg-blue-500/20 rounded-lg px-3 py-1">
                  <Text className="text-blue-400 text-sm">Sets: {exercise.sets}</Text>
                </View>
                <View className="bg-emerald-500/20 rounded-lg px-3 py-1">
                  <Text className="text-emerald-400 text-sm">Reps: {exercise.reps}</Text>
                </View>
                {exercise.rest !== '-' && (
                  <View className="bg-amber-500/20 rounded-lg px-3 py-1">
                    <Text className="text-amber-400 text-sm">Rest: {exercise.rest}</Text>
                  </View>
                )}
              </View>

              <Text className="text-zinc-400 text-sm">{exercise.target}</Text>
            </View>
          ))}

          <Text className="text-white font-bold text-lg mb-4 mt-6">Benefits</Text>

          <View className="flex-row flex-wrap gap-3 mb-6">
            {benefits.map((benefit, idx) => (
              <View
                key={idx}
                className={`flex-1 min-w-[45%] bg-${benefit.color}-500/10 rounded-xl p-4 border border-${benefit.color}-500/30`}
              >
                <Ionicons name={benefit.icon as any} size={24} color={
                  benefit.color === 'emerald' ? '#10b981' :
                  benefit.color === 'blue' ? '#3b82f6' :
                  benefit.color === 'purple' ? '#a855f7' : '#f59e0b'
                } />
                <Text className="text-white font-bold mt-2 mb-1">{benefit.title}</Text>
                <Text className={`text-${benefit.color}-400 text-sm`}>{benefit.desc}</Text>
              </View>
            ))}
          </View>

          <Text className="text-white font-bold text-lg mb-4 mt-6">Mobility Assessment</Text>

          {assessments.map((assessment, idx) => (
            <View key={idx} className="bg-zinc-900 rounded-xl p-4 mb-3 border border-zinc-800">
              <View className="flex-row items-center justify-between mb-2">
                <Text className="text-white font-bold">{assessment.test}</Text>
                <Text className={`text-${getStatusColor(assessment.status)}-400 font-bold`}>
                  {assessment.score}/{assessment.max}
                </Text>
              </View>
              <View className="bg-zinc-800 rounded-full h-2">
                <View
                  className={`h-2 rounded-full bg-${getStatusColor(assessment.status)}-500`}
                  style={{ width: `${(assessment.score / assessment.max) * 100}%` }}
                />
              </View>
            </View>
          ))}

          <View className="bg-blue-500/10 rounded-xl p-4 border border-blue-500/30 mb-6">
            <Text className="text-blue-400 font-bold mb-2">Mobility Tips</Text>
            <Text className="text-blue-300 text-sm">
              • 10 min daily > 1h weekly{'\n'}
              • Consistency is key{'\n'}
              • Hold stretches 30-90s{'\n'}
              • Breathe deeply during holds{'\n'}
              • Progressive overload applies to mobility
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
