import React, { useState } from 'react';
import { Text } from '@/components/ui/Text';
import { View, TouchableOpacity, ScrollView, TextInput } from 'react-native';;
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function WorkoutPlanner() {
  const [selectedGoal, setSelectedGoal] = useState('strength');
  const [experienceLevel, setExperienceLevel] = useState('intermediate');
  const [daysPerWeek, setDaysPerWeek] = useState(4);

  const goals = ['strength', 'hypertrophy', 'powerlifting', 'general'];
  const experiences = ['beginner', 'intermediate', 'advanced'];

  const splitTemplates = {
    strength: {
      3: {
        name: 'Full Body 3x',
        days: ['Full Body A', 'Full Body B', 'Full Body C'],
        description: 'Hit all major lifts 3x per week',
      },
      4: {
        name: 'Upper/Lower',
        days: ['Upper Power', 'Lower Power', 'Upper Hypertrophy', 'Lower Hypertrophy'],
        description: 'PHAT-style power/hypertrophy split',
      },
      5: {
        name: 'Texas Method',
        days: ['Volume Day', 'Recovery Day', 'Intensity Day', 'Accessories', 'Active Recovery'],
        description: 'Classic intermediate strength program',
      },
    },
    hypertrophy: {
      3: {
        name: 'Push/Pull/Legs',
        days: ['Push', 'Pull', 'Legs'],
        description: 'Classic bodybuilding split',
      },
      4: {
        name: 'Upper/Lower',
        days: ['Upper A', 'Lower A', 'Upper B', 'Lower B'],
        description: 'Frequency and volume balance',
      },
      5: {
        name: 'Bro Split',
        days: ['Chest/Shoulders', 'Back', 'Arms', 'Legs', 'Shoulders/Abs'],
        description: 'High volume per muscle',
      },
      6: {
        name: 'PPL 2x',
        days: ['Push', 'Pull', 'Legs', 'Push', 'Pull', 'Legs'],
        description: 'Hit each muscle 2x per week',
      },
    },
    powerlifting: {
      3: {
        name: 'Squat/Bench/Deadlift',
        days: ['Squat Focus', 'Bench Focus', 'Deadlift Focus'],
        description: 'One main lift per day',
      },
      4: {
        name: 'Upper/Lower PL',
        days: ['Squat + Accessories', 'Bench + Accessories', 'Deadlift + Accessories', 'Volume Bench'],
        description: 'Focus on the big 3',
      },
    },
    general: {
      3: {
        name: 'Full Body',
        days: ['Full Body A', 'Full Body B', 'Full Body C'],
        description: 'Balanced training',
      },
      4: {
        name: 'Upper/Lower',
        days: ['Upper', 'Lower', 'Upper', 'Lower'],
        description: 'Simple and effective',
      },
    },
  };

  const workoutStructures = {
    beginner: {
      setsPerExercise: '3-4',
      exercisesPerMuscle: '1-2',
      repRange: '8-12',
      restTime: '2-3 min',
      notes: 'Focus on learning movement patterns, progressive overload',
    },
    intermediate: {
      setsPerExercise: '3-5',
      exercisesPerMuscle: '2-3',
      repRange: '6-15',
      restTime: '2-4 min',
      notes: 'Periodize volume and intensity, track all lifts',
    },
    advanced: {
      setsPerExercise: '4-6',
      exercisesPerMuscle: '3-4',
      repRange: '4-20',
      restTime: '2-5 min',
      notes: 'Autoregulation, advanced techniques (drop sets, rest-pause)',
    },
  };

  const weeklyVolume = {
    beginner: {
      chest: '6-10 sets',
      back: '8-12 sets',
      shoulders: '6-10 sets',
      arms: '6-10 sets',
      legs: '8-12 sets',
    },
    intermediate: {
      chest: '10-16 sets',
      back: '12-18 sets',
      shoulders: '10-16 sets',
      arms: '10-16 sets',
      legs: '12-18 sets',
    },
    advanced: {
      chest: '14-22 sets',
      back: '16-25 sets',
      shoulders: '14-22 sets',
      arms: '14-20 sets',
      legs: '16-25 sets',
    },
  };

  const template = splitTemplates[selectedGoal as keyof typeof splitTemplates]?.[daysPerWeek as keyof typeof splitTemplates.strength];
  const structure = workoutStructures[experienceLevel as keyof typeof workoutStructures];
  const volume = weeklyVolume[experienceLevel as keyof typeof weeklyVolume];

  return (
    <View className="flex-1 bg-zinc-950">
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1 ml-3">
            Workout Planner
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          <View className="bg-gradient-to-r from-primary to-[#7D0EBE] rounded-xl p-6 mb-6">
            <Text className="text-white text-2xl font-bold mb-2">Plan Your Training</Text>
            <Text className="text-white opacity-90">
              Customized split recommendations
            </Text>
          </View>

          <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
            <Text className="text-white font-bold text-lg mb-3">Training Goal</Text>
            <View className="flex-row flex-wrap gap-2">
              {goals.map((goal) => (
                <TouchableOpacity
                  key={goal}
                  onPress={() => setSelectedGoal(goal)}
                  className={`${
                    selectedGoal === goal ? 'bg-primary' : 'bg-zinc-800'
                  } rounded-xl px-4 py-2 border ${
                    selectedGoal === goal ? 'border-primary' : 'border-zinc-700'
                  }`}
                >
                  <Text className="text-white font-bold capitalize">{goal}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
            <Text className="text-white font-bold text-lg mb-3">Experience Level</Text>
            <View className="flex-row gap-2">
              {experiences.map((exp) => (
                <TouchableOpacity
                  key={exp}
                  onPress={() => setExperienceLevel(exp)}
                  className={`flex-1 ${
                    experienceLevel === exp ? 'bg-primary' : 'bg-zinc-800'
                  } rounded-xl px-3 py-2 border ${
                    experienceLevel === exp ? 'border-blue-400' : 'border-zinc-700'
                  }`}
                >
                  <Text className="text-white font-bold text-center capitalize text-sm">{exp}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
            <Text className="text-white font-bold text-lg mb-3">Days Per Week: {daysPerWeek}</Text>
            <View className="flex-row gap-2">
              {[3, 4, 5, 6].map((days) => (
                <TouchableOpacity
                  key={days}
                  onPress={() => setDaysPerWeek(days)}
                  className={`flex-1 ${
                    daysPerWeek === days ? 'bg-purple-500' : 'bg-zinc-800'
                  } rounded-xl px-3 py-3 border ${
                    daysPerWeek === days ? 'border-purple-400' : 'border-zinc-700'
                  }`}
                >
                  <Text className="text-white font-bold text-center text-lg">{days}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {template && (
            <>
              <View className="bg-primary/10 rounded-xl p-5 mb-6 border border-primary/30">
                <Text className="text-primary font-bold text-xl mb-2">
                  {template.name}
                </Text>
                <Text className="text-zinc-300 mb-4">{template.description}</Text>
                
                <View className="space-y-2">
                  {template.days.map((day, idx) => (
                    <View key={idx} className="bg-zinc-900 rounded-xl p-3 flex-row items-center">
                      <View className="w-8 h-8 rounded-full bg-primary/20 items-center justify-center border border-primary/40">
                        <Text className="text-primary font-bold">{idx + 1}</Text>
                      </View>
                      <Text className="text-white font-bold ml-3">{day}</Text>
                    </View>
                  ))}
                </View>
              </View>

              <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
                <Text className="text-white font-bold text-lg mb-4">
                  {experienceLevel.charAt(0).toUpperCase() + experienceLevel.slice(1)} Structure
                </Text>
                
                <View className="bg-zinc-800 rounded-xl p-3 mb-2">
                  <Text className="text-zinc-400 text-sm">Sets per Exercise</Text>
                  <Text className="text-white font-bold">{structure.setsPerExercise}</Text>
                </View>

                <View className="bg-zinc-800 rounded-xl p-3 mb-2">
                  <Text className="text-zinc-400 text-sm">Exercises per Muscle</Text>
                  <Text className="text-white font-bold">{structure.exercisesPerMuscle}</Text>
                </View>

                <View className="bg-zinc-800 rounded-xl p-3 mb-2">
                  <Text className="text-zinc-400 text-sm">Rep Range</Text>
                  <Text className="text-white font-bold">{structure.repRange}</Text>
                </View>

                <View className="bg-zinc-800 rounded-xl p-3 mb-3">
                  <Text className="text-zinc-400 text-sm">Rest Between Sets</Text>
                  <Text className="text-white font-bold">{structure.restTime}</Text>
                </View>

                <View className="bg-primary/10 rounded-lg p-3 border border-primary/30">
                  <Text className="text-primary/80 text-sm">{structure.notes}</Text>
                </View>
              </View>

              <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
                <Text className="text-white font-bold text-lg mb-4">Weekly Volume Targets</Text>
                {Object.entries(volume).map(([muscle, sets]) => (
                  <View key={muscle} className="flex-row justify-between items-center mb-2 last:mb-0">
                    <Text className="text-zinc-300 capitalize">{muscle}</Text>
                    <Text className="text-primary font-bold">{sets}</Text>
                  </View>
                ))}
              </View>
            </>
          )}

          {!template && (
            <View className="bg-amber-500/10 rounded-xl p-4 border border-amber-500/30 mb-6">
              <Text className="text-amber-400 font-bold mb-2">No Template Available</Text>
              <Text className="text-amber-300 text-sm">
                Try selecting {daysPerWeek === 6 ? 'a different number of days' : 'hypertrophy goal for more day options'}
              </Text>
            </View>
          )}

          <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-6">
            <Text className="text-primary/80 font-bold mb-2">Program Design Tips</Text>
            <Text className="text-primary/60 text-sm mb-2">
              • Start with minimum effective volume
            </Text>
            <Text className="text-primary/60 text-sm mb-2">
              • Progress by adding weight, reps, or sets
            </Text>
            <Text className="text-primary/60 text-sm mb-2">
              • Deload every 4-6 weeks
            </Text>
            <Text className="text-primary/60 text-sm">
              • Track all workouts to monitor progress
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}


