import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TemplateBuilder() {
  const [templateName, setTemplateName] = useState('');
  const [selectedDays, setSelectedDays] = useState<number>(4);
  const [selectedExercises, setSelectedExercises] = useState<string[]>([]);

  const dayOptions = [3, 4, 5, 6];

  const exerciseCategories = [
    {
      category: 'Chest',
      exercises: ['Bench Press', 'Incline DB Press', 'Cable Flyes', 'Push-ups'],
      icon: 'fitness',
    },
    {
      category: 'Back',
      exercises: ['Deadlift', 'Pull-ups', 'Barbell Row', 'Lat Pulldown'],
      icon: 'barbell',
    },
    {
      category: 'Legs',
      exercises: ['Squat', 'Leg Press', 'Romanian DL', 'Leg Curl'],
      icon: 'fitness',
    },
    {
      category: 'Shoulders',
      exercises: ['OHP', 'Lateral Raises', 'Face Pulls', 'Arnold Press'],
      icon: 'fitness',
    },
    {
      category: 'Arms',
      exercises: ['Barbell Curl', 'Tricep Dips', 'Hammer Curls', 'Skull Crushers'],
      icon: 'barbell',
    },
  ];

  const splitPresets = [
    {
      name: 'Push Pull Legs',
      days: 6,
      splits: ['Push', 'Pull', 'Legs', 'Push', 'Pull', 'Legs'],
    },
    {
      name: 'Upper Lower',
      days: 4,
      splits: ['Upper', 'Lower', 'Upper', 'Lower'],
    },
    {
      name: 'Full Body',
      days: 3,
      splits: ['Full Body', 'Full Body', 'Full Body'],
    },
    {
      name: 'Bro Split',
      days: 5,
      splits: ['Chest', 'Back', 'Legs', 'Shoulders', 'Arms'],
    },
  ];

  const toggleExercise = (exercise: string) => {
    if (selectedExercises.includes(exercise)) {
      setSelectedExercises(selectedExercises.filter((e) => e !== exercise));
    } else {
      setSelectedExercises([...selectedExercises, exercise]);
    }
  };

  const saveTemplate = () => {
    if (!templateName) {
      Alert.alert('Error', 'Please enter a template name');
      return;
    }
    if (selectedExercises.length === 0) {
      Alert.alert('Error', 'Please select at least one exercise');
      return;
    }
    Alert.alert(
      'Template Created',
      `"${templateName}" with ${selectedExercises.length} exercises saved!`
    );
  };

  const loadPreset = (preset: typeof splitPresets[0]) => {
    setTemplateName(preset.name);
    setSelectedDays(preset.days);
    Alert.alert('Preset Loaded', `${preset.name} structure loaded`);
  };

  return (
    <View className="flex-1 bg-zinc-950">
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1 ml-3">
            Template Builder
          </Text>
          <TouchableOpacity onPress={saveTemplate}>
            <Text className="text-blue-400 font-bold">Save</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          <View className="bg-gradient-to-r from-emerald-500 to-green-500 rounded-xl p-6 mb-6">
            <Text className="text-white text-2xl font-bold mb-2">Create Template</Text>
            <Text className="text-white opacity-90 mb-4">
              Build your custom program
            </Text>
            <View className="flex-row items-center">
              <Ionicons name="create" size={20} color="white" />
              <Text className="text-white ml-2">{selectedExercises.length} exercises selected</Text>
            </View>
          </View>

          <Text className="text-white font-bold mb-3">Template Name</Text>
          <View className="bg-zinc-900 rounded-xl p-4 mb-6 border border-zinc-800">
            <TextInput
              placeholder="e.g., My PPL Program"
              placeholderTextColor="#71717a"
              value={templateName}
              onChangeText={setTemplateName}
              className="text-white text-lg"
            />
          </View>

          <Text className="text-white font-bold mb-3">Training Days Per Week</Text>
          <View className="flex-row gap-3 mb-6">
            {dayOptions.map((days) => (
              <TouchableOpacity
                key={days}
                onPress={() => setSelectedDays(days)}
                className={`flex-1 ${
                  selectedDays === days ? 'bg-blue-500' : 'bg-zinc-900'
                } rounded-xl py-4 border ${
                  selectedDays === days ? 'border-blue-400' : 'border-zinc-800'
                }`}
              >
                <Text
                  className={`${
                    selectedDays === days ? 'text-white' : 'text-zinc-400'
                  } font-bold text-center text-lg`}
                >
                  {days}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text className="text-white font-bold mb-3">Split Presets</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6">
            <View className="flex-row gap-3">
              {splitPresets.map((preset) => (
                <TouchableOpacity
                  key={preset.name}
                  onPress={() => loadPreset(preset)}
                  className="bg-zinc-900 rounded-xl p-4 border border-zinc-800"
                  style={{ width: 160 }}
                >
                  <Text className="text-white font-bold mb-2">{preset.name}</Text>
                  <Text className="text-zinc-400 text-sm">{preset.days} days/week</Text>
                  <View className="mt-2">
                    <Text className="text-blue-400 text-xs font-bold">TAP TO LOAD</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          <Text className="text-white font-bold text-lg mb-4">Select Exercises</Text>

          {exerciseCategories.map((category, catIdx) => (
            <View key={catIdx} className="mb-6">
              <View className="flex-row items-center mb-3">
                <Ionicons name={category.icon as any} size={20} color="#3b82f6" />
                <Text className="text-zinc-400 font-bold ml-2">{category.category}</Text>
              </View>

              {category.exercises.map((exercise, exIdx) => (
                <TouchableOpacity
                  key={exIdx}
                  onPress={() => toggleExercise(exercise)}
                  className={`${
                    selectedExercises.includes(exercise)
                      ? 'bg-blue-500/20 border-blue-500'
                      : 'bg-zinc-900 border-zinc-800'
                  } rounded-xl p-4 mb-2 border flex-row items-center justify-between`}
                >
                  <Text
                    className={`${
                      selectedExercises.includes(exercise) ? 'text-white' : 'text-zinc-400'
                    } font-bold`}
                  >
                    {exercise}
                  </Text>
                  {selectedExercises.includes(exercise) && (
                    <Ionicons name="checkmark-circle" size={24} color="#3b82f6" />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          ))}

          <View className="bg-blue-500/10 rounded-xl p-4 border border-blue-500/30 mb-6">
            <Text className="text-blue-400 font-bold mb-2">Template Builder Tips</Text>
            <Text className="text-blue-300 text-sm">
              • Include compound lifts first{'\n'}
              • 4-6 exercises per session{'\n'}
              • Balance push/pull ratio{'\n'}
              • Progressive overload cada semana{'\n'}
              • Save templates para reutilizar
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
