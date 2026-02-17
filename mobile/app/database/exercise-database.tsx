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

export default function ExerciseDatabase() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMuscle, setSelectedMuscle] = useState<string>('all');
  const [selectedEquipment, setSelectedEquipment] = useState<string>('all');

  const muscles = [
    { key: 'all', label: 'All' },
    { key: 'chest', label: 'Chest' },
    { key: 'back', label: 'Back' },
    { key: 'legs', label: 'Legs' },
    { key: 'shoulders', label: 'Shoulders' },
    { key: 'arms', label: 'Arms' },
  ];

  const equipment = [
    { key: 'all', label: 'All' },
    { key: 'barbell', label: 'Barbell' },
    { key: 'dumbbell', label: 'Dumbbell' },
    { key: 'cable', label: 'Cable' },
    { key: 'bodyweight', label: 'Bodyweight' },
  ];

  const exercises = [
    {
      id: '1',
      name: 'Barbell Bench Press',
      muscle: 'chest',
      secondary: ['Triceps', 'Front Delts'],
      equipment: 'barbell',
      difficulty: 'Intermediate',
      variations: 8,
      videoUrl: 'tutorial',
    },
    {
      id: '2',
      name: 'Deadlift',
      muscle: 'back',
      secondary: ['Hamstrings', 'Glutes', 'Traps'],
      equipment: 'barbell',
      difficulty: 'Advanced',
      variations: 12,
      videoUrl: 'tutorial',
    },
    {
      id: '3',
      name: 'Squat',
      muscle: 'legs',
      secondary: ['Glutes', 'Core'],
      equipment: 'barbell',
      difficulty: 'Intermediate',
      variations: 15,
      videoUrl: 'tutorial',
    },
    {
      id: '4',
      name: 'Pull-ups',
      muscle: 'back',
      secondary: ['Biceps', 'Core'],
      equipment: 'bodyweight',
      difficulty: 'Intermediate',
      variations: 6,
      videoUrl: 'tutorial',
    },
    {
      id: '5',
      name: 'Dumbbell Shoulder Press',
      muscle: 'shoulders',
      secondary: ['Triceps', 'Upper Chest'],
      equipment: 'dumbbell',
      difficulty: 'Beginner',
      variations: 5,
      videoUrl: 'tutorial',
    },
    {
      id: '6',
      name: 'Cable Flyes',
      muscle: 'chest',
      secondary: ['Front Delts'],
      equipment: 'cable',
      difficulty: 'Beginner',
      variations: 4,
      videoUrl: 'tutorial',
    },
    {
      id: '7',
      name: 'Barbell Curl',
      muscle: 'arms',
      secondary: ['Forearms'],
      equipment: 'barbell',
      difficulty: 'Beginner',
      variations: 7,
      videoUrl: 'tutorial',
    },
  ];

  const filteredExercises = exercises.filter((exercise) => {
    const matchesSearch = exercise.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMuscle = selectedMuscle === 'all' || exercise.muscle === selectedMuscle;
    const matchesEquipment = selectedEquipment === 'all' || exercise.equipment === selectedEquipment;
    return matchesSearch && matchesMuscle && matchesEquipment;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'primary';
      case 'Intermediate': return 'amber';
      case 'Advanced': return 'red';
      default: return 'zinc';
    }
  };

  const stats = {
    total: exercises.length,
    withVideo: exercises.filter(e => e.videoUrl).length,
    variations: exercises.reduce((sum, e) => sum + e.variations, 0),
  };

  return (
    <View className="flex-1 bg-zinc-950">
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1 ml-3">
            Exercise Database
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          <View className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-6 mb-6">
            <Text className="text-white text-2xl font-bold mb-2">Exercise Library</Text>
            <Text className="text-white opacity-90 mb-4">
              Comprehensive exercise database
            </Text>
            <View className="flex-row items-center">
              <Ionicons name="barbell" size={20} color="white" />
              <Text className="text-white ml-2">{stats.total} exercises • {stats.variations} variations</Text>
            </View>
          </View>

          <View className="flex-row gap-3 mb-6">
            <View className="flex-1 bg-zinc-900 rounded-xl p-3 border border-zinc-800">
              <Ionicons name="fitness" size={24} color="#9D12DE" />
              <Text className="text-2xl font-bold text-white mt-2">{stats.total}</Text>
              <Text className="text-zinc-400 text-sm">Exercises</Text>
            </View>
            <View className="flex-1 bg-zinc-900 rounded-xl p-3 border border-zinc-800">
              <Ionicons name="videocam" size={24} color="#9D12DE" />
              <Text className="text-2xl font-bold text-white mt-2">{stats.withVideo}</Text>
              <Text className="text-zinc-400 text-sm">With Video</Text>
            </View>
            <View className="flex-1 bg-zinc-900 rounded-xl p-3 border border-zinc-800">
              <Ionicons name="copy" size={24} color="#FFEA00" />
              <Text className="text-2xl font-bold text-white mt-2">{stats.variations}</Text>
              <Text className="text-zinc-400 text-sm">Variations</Text>
            </View>
          </View>

          <View className="bg-zinc-900 rounded-xl p-4 mb-4 border border-zinc-800">
            <View className="flex-row items-center">
              <Ionicons name="search" size={20} color="#71717a" />
              <TextInput
                placeholder="Search exercises..."
                placeholderTextColor="#71717a"
                value={searchQuery}
                onChangeText={setSearchQuery}
                className="flex-1 text-white ml-3"
              />
            </View>
          </View>

          <Text className="text-white font-bold mb-3">Muscle Group</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-4">
            <View className="flex-row gap-3">
              {muscles.map((muscle) => (
                <TouchableOpacity
                  key={muscle.key}
                  onPress={() => setSelectedMuscle(muscle.key)}
                  className={`${
                    selectedMuscle === muscle.key ? 'bg-primary' : 'bg-zinc-900'
                  } rounded-xl px-6 py-3 border ${
                    selectedMuscle === muscle.key ? 'border-blue-400' : 'border-zinc-800'
                  }`}
                >
                  <Text
                    className={`${
                      selectedMuscle === muscle.key ? 'text-white' : 'text-zinc-400'
                    } font-bold`}
                  >
                    {muscle.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          <Text className="text-white font-bold mb-3">Equipment</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6">
            <View className="flex-row gap-3">
              {equipment.map((eq) => (
                <TouchableOpacity
                  key={eq.key}
                  onPress={() => setSelectedEquipment(eq.key)}
                  className={`${
                    selectedEquipment === eq.key ? 'bg-primary' : 'bg-zinc-900'
                  } rounded-xl px-6 py-3 border ${
                    selectedEquipment === eq.key ? 'border-primary' : 'border-zinc-800'
                  }`}
                >
                  <Text
                    className={`${
                      selectedEquipment === eq.key ? 'text-white' : 'text-zinc-400'
                    } font-bold`}
                  >
                    {eq.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          <Text className="text-white font-bold text-lg mb-4">Results ({filteredExercises.length})</Text>

          {filteredExercises.map((exercise) => (
            <TouchableOpacity
              key={exercise.id}
              className="bg-zinc-900 rounded-xl p-5 mb-4 border border-zinc-800"
            >
              <View className="flex-row items-start justify-between mb-3">
                <View className="flex-1">
                  <Text className="text-white font-bold text-lg mb-1">{exercise.name}</Text>
                  <View className="flex-row items-center flex-wrap gap-2">
                    <View className={`bg-${getDifficultyColor(exercise.difficulty)}-500 rounded-full px-3 py-1`}>
                      <Text className="text-white text-xs font-bold">{exercise.difficulty}</Text>
                    </View>
                    <View className="bg-primary/20 rounded-full px-3 py-1">
                      <Text className="text-primary/80 text-xs font-bold">{exercise.equipment}</Text>
                    </View>
                  </View>
                </View>
                {exercise.videoUrl && (
                  <Ionicons name="play-circle" size={32} color="#9D12DE" />
                )}
              </View>

              <Text className="text-zinc-400 text-sm mb-2">
                Target: <Text className="text-white font-bold capitalize">{exercise.muscle}</Text>
              </Text>

              <Text className="text-zinc-400 text-sm mb-3">
                Secondary: {exercise.secondary.join(', ')}
              </Text>

              <View className="flex-row items-center justify-between pt-3 border-t border-zinc-800">
                <Text className="text-primary text-sm font-bold">
                  {exercise.variations} variations available
                </Text>
                <Ionicons name="chevron-forward" size={20} color="#71717a" />
              </View>
            </TouchableOpacity>
          ))}

          <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-6">
            <Text className="text-primary/80 font-bold mb-2">Exercise Database Tips</Text>
            <Text className="text-primary/60 text-sm">
              • Watch form videos antes de intentar{'\n'}
              • Start con light weight para learn technique{'\n'}
              • Explore variations para variety{'\n'}
              • Check secondary muscles trabajados{'\n'}
              • Save favorites para quick access
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}


