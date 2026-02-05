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

export default function ExerciseLibrary() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['all', 'chest', 'back', 'shoulders', 'legs', 'arms', 'core'];

  const exercises = [
    // CHEST
    {
      id: 1,
      name: 'Barbell Bench Press',
      category: 'chest',
      difficulty: 'Intermediate',
      equipment: 'Barbell, Bench',
      primary: ['Pectoralis Major', 'Anterior Deltoid', 'Triceps'],
      secondary: ['Serratus Anterior', 'Lats'],
      cues: ['Retract scapulae', 'Arch upper back', 'Bar to lower chest', 'Elbows 45-75°', 'Drive feet into ground'],
      sets_reps: '4-5 sets × 5-8 reps',
      notes: 'King of chest exercises. Master this first.',
    },
    {
      id: 2,
      name: 'Incline Dumbbell Press',
      category: 'chest',
      difficulty: 'Beginner',
      equipment: 'Dumbbells, Incline Bench',
      primary: ['Upper Pectoralis', 'Anterior Deltoid'],
      secondary: ['Triceps'],
      cues: ['30-45° bench angle', 'Dumbbells at chest level', 'Press up and slightly together', 'Full ROM', 'Control descent'],
      sets_reps: '3-4 sets × 8-12 reps',
      notes: 'Best for upper chest development.',
    },
    {
      id: 3,
      name: 'Dips (Chest Focus)',
      category: 'chest',
      difficulty: 'Intermediate',
      equipment: 'Dip bars',
      primary: ['Lower Pectoralis', 'Triceps'],
      secondary: ['Anterior Deltoid'],
      cues: ['Lean forward 20-30°', 'Elbows out', 'Lower until stretch', 'Don\'t go too deep', 'Explosive concentric'],
      sets_reps: '3 sets × 8-15 reps',
      notes: 'Great for lower chest. Add weight when bodyweight is easy.',
    },
    // BACK
    {
      id: 4,
      name: 'Conventional Deadlift',
      category: 'back',
      difficulty: 'Advanced',
      equipment: 'Barbell',
      primary: ['Erector Spinae', 'Glutes', 'Hamstrings'],
      secondary: ['Lats', 'Traps', 'Forearms'],
      cues: ['Bar over mid-foot', 'Neutral spine', 'Push floor away', 'Bar against shins', 'Lock out hips'],
      sets_reps: '3-5 sets × 3-8 reps',
      notes: 'King of posterior chain. High CNS demand.',
    },
    {
      id: 5,
      name: 'Pull-Ups',
      category: 'back',
      difficulty: 'Intermediate',
      equipment: 'Pull-up bar',
      primary: ['Lats', 'Teres Major'],
      secondary: ['Biceps', 'Rhomboids', 'Rear Delts'],
      cues: ['Full hang', 'Pull elbows down', 'Chest to bar', 'Control descent', 'No kipping'],
      sets_reps: '4 sets × 6-12 reps',
      notes: 'Best lat builder. Use assistance or weight as needed.',
    },
    {
      id: 6,
      name: 'Barbell Row',
      category: 'back',
      difficulty: 'Intermediate',
      equipment: 'Barbell',
      primary: ['Rhomboids', 'Lats', 'Traps'],
      secondary: ['Erector Spinae', 'Biceps'],
      cues: ['Hip hinge position', 'Row to sternum', 'Squeeze scapulae', 'Control eccentric', 'Don\'t use momentum'],
      sets_reps: '4 sets × 6-10 reps',
      notes: 'Classic back thickness builder.',
    },
    // SHOULDERS
    {
      id: 7,
      name: 'Overhead Press',
      category: 'shoulders',
      difficulty: 'Intermediate',
      equipment: 'Barbell',
      primary: ['Anterior Deltoid', 'Lateral Deltoid', 'Triceps'],
      secondary: ['Upper Chest', 'Core'],
      cues: ['Bar on front delts', 'Press up and back', 'Head through at top', 'Lock elbows', 'Brace core'],
      sets_reps: '4 sets × 5-8 reps',
      notes: 'Best shoulder mass builder. Strict form essential.',
    },
    {
      id: 8,
      name: 'Lateral Raises',
      category: 'shoulders',
      difficulty: 'Beginner',
      equipment: 'Dumbbells',
      primary: ['Lateral Deltoid'],
      secondary: ['Anterior Deltoid'],
      cues: ['Slight elbow bend', 'Raise to shoulder height', 'Lead with elbows', 'Control descent', 'Don\'t swing'],
      sets_reps: '3-4 sets × 12-20 reps',
      notes: 'Best lateral delt isolation. High volume works well.',
    },
    {
      id: 9,
      name: 'Face Pulls',
      category: 'shoulders',
      difficulty: 'Beginner',
      equipment: 'Cable machine',
      primary: ['Posterior Deltoid', 'Rhomboids'],
      secondary: ['Rotator Cuff'],
      cues: ['Pull to face level', 'Externally rotate', 'Squeeze rear delts', 'High reps', 'Focus on feel'],
      sets_reps: '3 sets × 15-25 reps',
      notes: 'Shoulder health essential. Do these often.',
    },
    // LEGS
    {
      id: 10,
      name: 'Back Squat',
      category: 'legs',
      difficulty: 'Advanced',
      equipment: 'Barbell, Squat Rack',
      primary: ['Quadriceps', 'Glutes', 'Hamstrings'],
      secondary: ['Erector Spinae', 'Core'],
      cues: ['Bar on traps', 'Brace hard', 'Hip crease below knee', 'Knees out', 'Drive through mid-foot'],
      sets_reps: '4-5 sets × 4-8 reps',
      notes: 'King of leg exercises. Build your base here.',
    },
    {
      id: 11,
      name: 'Romanian Deadlift',
      category: 'legs',
      difficulty: 'Intermediate',
      equipment: 'Barbell',
      primary: ['Hamstrings', 'Glutes'],
      secondary: ['Erector Spinae', 'Lats'],
      cues: ['Slight knee bend', 'Hip hinge', 'Bar down shins', 'Feel hamstring stretch', 'Squeeze glutes at top'],
      sets_reps: '3-4 sets × 8-12 reps',
      notes: 'Best hamstring builder. Great for deadlift strength.',
    },
    {
      id: 12,
      name: 'Bulgarian Split Squat',
      category: 'legs',
      difficulty: 'Intermediate',
      equipment: 'Dumbbells, Bench',
      primary: ['Quadriceps', 'Glutes'],
      secondary: ['Hamstrings', 'Core'],
      cues: ['Back foot elevated', 'Torso upright', 'Front knee tracks over toe', 'Lower under control', 'Drive through heel'],
      sets_reps: '3 sets × 8-12 reps per leg',
      notes: 'Excellent unilateral exercise. Fixes imbalances.',
    },
    // ARMS
    {
      id: 13,
      name: 'Barbell Curl',
      category: 'arms',
      difficulty: 'Beginner',
      equipment: 'Barbell',
      primary: ['Biceps Brachii'],
      secondary: ['Brachialis', 'Brachioradialis'],
      cues: ['Elbows fixed', 'Full supination', 'Squeeze at top', 'Control descent', 'No swinging'],
      sets_reps: '3-4 sets × 8-12 reps',
      notes: 'Classic bicep builder. Master the basics.',
    },
    {
      id: 14,
      name: 'Close-Grip Bench Press',
      category: 'arms',
      difficulty: 'Intermediate',
      equipment: 'Barbell, Bench',
      primary: ['Triceps'],
      secondary: ['Pectoralis Major', 'Anterior Deltoid'],
      cues: ['Hands shoulder-width', 'Elbows close to body', 'Touch lower chest', 'Lock out fully', 'Control descent'],
      sets_reps: '3-4 sets × 6-10 reps',
      notes: 'Best tricep mass builder. Heavy loading possible.',
    },
    // CORE
    {
      id: 15,
      name: 'Plank',
      category: 'core',
      difficulty: 'Beginner',
      equipment: 'None',
      primary: ['Rectus Abdominis', 'Transverse Abdominis'],
      secondary: ['Obliques', 'Erector Spinae'],
      cues: ['Forearms down', 'Body straight', 'Squeeze glutes', 'Brace hard', 'Breathe'],
      sets_reps: '3-4 sets × 30-60 seconds',
      notes: 'Core stability fundamental. Progress to harder variations.',
    },
  ];

  const filteredExercises = exercises.filter(ex => {
    const matchesCategory = selectedCategory === 'all' || ex.category === selectedCategory;
    const matchesSearch = ex.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          ex.primary.some(m => m.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'emerald';
      case 'Intermediate': return 'amber';
      case 'Advanced': return 'red';
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
            Exercise Library
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          <View className="bg-gradient-to-r from-primary to-[#7D0EBE] rounded-xl p-6 mb-6">
            <Text className="text-white text-2xl font-bold mb-2">Exercise Database</Text>
            <Text className="text-white opacity-90">
              Complete guide to effective exercises
            </Text>
          </View>

          <View className="mb-4">
            <TextInput
              className="bg-zinc-900 text-white rounded-xl px-4 py-3 border border-zinc-800"
              placeholder="Search exercises..."
              placeholderTextColor="#52525b"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6">
            <View className="flex-row gap-2">
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
                  <Text className="text-white font-bold capitalize">
                    {cat}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          <Text className="text-zinc-400 mb-4">
            Found {filteredExercises.length} exercise{filteredExercises.length !== 1 ? 's' : ''}
          </Text>

          {filteredExercises.map((exercise) => {
            const diffColor = getDifficultyColor(exercise.difficulty);
            return (
              <View key={exercise.id} className="bg-zinc-900 rounded-xl p-5 mb-4 border border-zinc-800">
                <View className="flex-row justify-between items-start mb-3">
                  <Text className="text-white font-bold text-lg flex-1">{exercise.name}</Text>
                  <View className={`bg-${diffColor}-500/20 px-3 py-1 rounded-full border border-${diffColor}-500/30`}>
                    <Text className={`text-${diffColor}-400 text-xs font-bold`}>
                      {exercise.difficulty}
                    </Text>
                  </View>
                </View>

                <View className="bg-zinc-800 rounded-xl p-3 mb-3">
                  <Text className="text-zinc-400 text-sm mb-1">Equipment</Text>
                  <Text className="text-white">{exercise.equipment}</Text>
                </View>

                <View className="mb-3">
                  <Text className="text-primary font-bold mb-2">Primary Muscles</Text>
                  <View className="flex-row flex-wrap gap-2">
                    {exercise.primary.map((muscle, idx) => (
                      <View key={idx} className="bg-primary/20 px-3 py-1 rounded-full border border-primary/30">
                        <Text className="text-primary/80 text-xs">{muscle}</Text>
                      </View>
                    ))}
                  </View>
                </View>

                <View className="mb-3">
                  <Text className="text-primary/80 font-bold mb-2">Form Cues</Text>
                  {exercise.cues.map((cue, idx) => (
                    <View key={idx} className="flex-row items-start mb-1">
                      <Text className="text-primary/80 mr-2">•</Text>
                      <Text className="text-zinc-300 text-sm flex-1">{cue}</Text>
                    </View>
                  ))}
                </View>

                <View className="bg-purple-500/10 rounded-xl p-3 mb-3 border border-purple-500/30">
                  <Text className="text-purple-400 font-bold text-sm mb-1">Recommended Volume</Text>
                  <Text className="text-purple-300">{exercise.sets_reps}</Text>
                </View>

                <View className="bg-amber-500/10 rounded-xl p-3 border border-amber-500/30">
                  <Text className="text-amber-400 text-sm italic">{exercise.notes}</Text>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}



