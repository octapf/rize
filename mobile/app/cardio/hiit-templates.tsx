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

export default function HIITTemplates() {
  const [selectedTemplate, setSelectedTemplate] = useState('tabata');

  const templates = [
    {
      id: 'tabata',
      name: 'Tabata',
      work: 20,
      rest: 10,
      rounds: 8,
      sets: 1,
      setRest: 0,
      totalTime: 4,
      description: 'Classic 4-minute protocol',
      exercises: ['Burpees', 'Jump Squats', 'Mountain Climbers', 'High Knees'],
      color: 'red',
      icon: 'flash' as const,
    },
    {
      id: 'emom',
      name: 'EMOM',
      work: 40,
      rest: 20,
      rounds: 15,
      sets: 1,
      setRest: 0,
      totalTime: 15,
      description: 'Every minute on the minute',
      exercises: ['Kettlebell Swings', 'Push-ups', 'Box Jumps', 'Rows'],
      color: 'blue',
      icon: 'time' as const,
    },
    {
      id: 'pyramid',
      name: 'Pyramid',
      work: 0,
      rest: 0,
      rounds: 10,
      sets: 1,
      setRest: 60,
      totalTime: 20,
      description: '30-60-90-60-30s intervals',
      exercises: ['Sprints', 'Bike', 'Rower', 'Battle Ropes'],
      color: 'purple',
      icon: 'triangle' as const,
    },
    {
      id: 'circuit',
      name: 'Circuit',
      work: 45,
      rest: 15,
      rounds: 4,
      sets: 3,
      setRest: 120,
      totalTime: 24,
      description: 'Multi-exercise rounds',
      exercises: ['Push-ups', 'Squats', 'Planks', 'Lunges', 'Burpees'],
      color: 'emerald',
      icon: 'sync' as const,
    },
    {
      id: 'intervals',
      name: 'Sprint Intervals',
      work: 30,
      rest: 90,
      rounds: 10,
      sets: 1,
      setRest: 0,
      totalTime: 20,
      description: 'High-intensity sprints',
      exercises: ['Sprint', 'Bike Sprint', 'Sled Push', 'Prowler'],
      color: 'amber',
      icon: 'speedometer' as const,
    },
  ];

  const currentTemplate = templates.find((t) => t.id === selectedTemplate)!;

  return (
    <View className="flex-1 bg-zinc-950">
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1 ml-3">
            HIIT Templates
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          <View className="bg-gradient-to-r from-red-500 to-amber-500 rounded-xl p-6 mb-6">
            <Text className="text-white text-2xl font-bold mb-2">High-Intensity Training</Text>
            <Text className="text-white opacity-90">
              Pre-built HIIT protocols
            </Text>
          </View>

          <View className="mb-6">
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View className="flex-row gap-3">
                {templates.map((template) => (
                  <TouchableOpacity
                    key={template.id}
                    onPress={() => setSelectedTemplate(template.id)}
                    className={`${
                      selectedTemplate === template.id
                        ? `bg-${template.color}-500`
                        : 'bg-zinc-800'
                    } rounded-xl px-4 py-3 border ${
                      selectedTemplate === template.id
                        ? `border-${template.color}-400`
                        : 'border-zinc-700'
                    }`}
                  >
                    <View className="flex-row items-center">
                      <Ionicons name={template.icon} size={20} color="white" />
                      <Text className="text-white font-bold ml-2">{template.name}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>

          <View className={`bg-${currentTemplate.color}-500/10 rounded-xl p-6 mb-6 border border-${currentTemplate.color}-500/30`}>
            <View className="flex-row items-center mb-2">
              <Ionicons name={currentTemplate.icon} size={28} color={`#${currentTemplate.color === 'red' ? 'ef4444' : currentTemplate.color === 'blue' ? '3b82f6' : currentTemplate.color === 'purple' ? 'a855f7' : currentTemplate.color === 'emerald' ? '10b981' : 'f59e0b'}`} />
              <Text className={`text-${currentTemplate.color}-400 font-bold text-2xl ml-3`}>
                {currentTemplate.name}
              </Text>
            </View>
            <Text className="text-zinc-300 text-lg mb-4">{currentTemplate.description}</Text>

            <View className="bg-zinc-900 rounded-xl p-4 space-y-3">
              <View className="flex-row justify-between items-center">
                <Text className="text-zinc-400">Work Period:</Text>
                <Text className={`text-${currentTemplate.color}-400 font-bold text-xl`}>
                  {currentTemplate.work > 0 ? `${currentTemplate.work}s` : 'Variable'}
                </Text>
              </View>
              <View className="flex-row justify-between items-center">
                <Text className="text-zinc-400">Rest Period:</Text>
                <Text className="text-white font-bold text-xl">
                  {currentTemplate.rest > 0 ? `${currentTemplate.rest}s` : 'Variable'}
                </Text>
              </View>
              <View className="flex-row justify-between items-center">
                <Text className="text-zinc-400">Rounds:</Text>
                <Text className="text-white font-bold text-xl">{currentTemplate.rounds}</Text>
              </View>
              {currentTemplate.sets > 1 && (
                <>
                  <View className="flex-row justify-between items-center">
                    <Text className="text-zinc-400">Sets:</Text>
                    <Text className="text-white font-bold text-xl">{currentTemplate.sets}</Text>
                  </View>
                  <View className="flex-row justify-between items-center">
                    <Text className="text-zinc-400">Set Rest:</Text>
                    <Text className="text-white font-bold text-xl">{currentTemplate.setRest}s</Text>
                  </View>
                </>
              )}
              <View className="flex-row justify-between items-center pt-3 border-t border-zinc-800">
                <Text className="text-zinc-400">Total Time:</Text>
                <Text className={`text-${currentTemplate.color}-400 font-bold text-2xl`}>
                  {currentTemplate.totalTime} min
                </Text>
              </View>
            </View>
          </View>

          <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
            <Text className="text-white font-bold text-lg mb-4">
              Recommended Exercises
            </Text>
            {currentTemplate.exercises.map((exercise, idx) => (
              <View
                key={idx}
                className="flex-row items-center py-3 border-b border-zinc-800 last:border-0"
              >
                <View className={`w-8 h-8 rounded-full bg-${currentTemplate.color}-500/20 items-center justify-center border border-${currentTemplate.color}-500/40`}>
                  <Text className={`text-${currentTemplate.color}-400 font-bold`}>{idx + 1}</Text>
                </View>
                <Text className="text-white font-bold text-lg ml-3">{exercise}</Text>
              </View>
            ))}
          </View>

          <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-6">
            <Text className="text-primary font-bold mb-2">HIIT Benefits</Text>
            <Text className="text-primary/80 text-sm">
              âœ“ Burns calories fast{'\n'}
              âœ“ Improves VO2 max{'\n'}
              âœ“ Time-efficient{'\n'}
              âœ“ EPOC effect (afterburn){'\n'}
              âœ“ Preserves muscle mass
            </Text>
          </View>

          <View className="bg-red-500/10 rounded-xl p-4 border border-red-500/30 mb-6">
            <Text className="text-red-400 font-bold mb-2">Safety Guidelines</Text>
            <Text className="text-red-300 text-sm">
              â€¢ Warm up 5-10 minutes{'\n'}
              â€¢ Start with 2-3 sessions/week{'\n'}
              â€¢ Don't do HIIT on leg days{'\n'}
              â€¢ Recovery is critical{'\n'}
              â€¢ Stop if form breaks down
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}


