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

export default function WorkoutTemplates() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { key: 'all', label: 'All' },
    { key: 'strength', label: 'Strength' },
    { key: 'hypertrophy', label: 'Hypertrophy' },
    { key: 'powerlifting', label: 'Powerlifting' },
    { key: 'bodybuilding', label: 'Bodybuilding' },
  ];

  const templates = [
    {
      id: '1',
      name: 'Push Pull Legs',
      category: 'hypertrophy',
      duration: '6 days/week',
      exercises: 18,
      downloads: 12543,
      rating: 4.9,
      author: 'Jeff Nippard',
      difficulty: 'Intermediate',
    },
    {
      id: '2',
      name: 'Starting Strength',
      category: 'strength',
      duration: '3 days/week',
      exercises: 9,
      downloads: 8920,
      rating: 4.8,
      author: 'Mark Rippetoe',
      difficulty: 'Beginner',
    },
    {
      id: '3',
      name: 'Wendler 5/3/1',
      category: 'powerlifting',
      duration: '4 days/week',
      exercises: 12,
      downloads: 15234,
      rating: 4.9,
      author: 'Jim Wendler',
      difficulty: 'Intermediate',
    },
    {
      id: '4',
      name: 'Arnold Split',
      category: 'bodybuilding',
      duration: '6 days/week',
      exercises: 24,
      downloads: 9876,
      rating: 4.7,
      author: 'Arnold Schwarzenegger',
      difficulty: 'Advanced',
    },
    {
      id: '5',
      name: 'nSuns 531',
      category: 'powerlifting',
      duration: '5 days/week',
      exercises: 15,
      downloads: 11234,
      rating: 4.8,
      author: 'nSuns',
      difficulty: 'Advanced',
    },
    {
      id: '6',
      name: 'Upper Lower',
      category: 'hypertrophy',
      duration: '4 days/week',
      exercises: 16,
      downloads: 10456,
      rating: 4.8,
      author: 'Various',
      difficulty: 'Beginner',
    },
  ];

  const filteredTemplates = templates.filter((template) => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
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
            Workout Templates
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          <View className="bg-gradient-to-r from-primary to-[#7D0EBE] rounded-xl p-6 mb-6">
            <Text className="text-white text-2xl font-bold mb-2">Template Library</Text>
            <Text className="text-white opacity-90 mb-4">
              Proven workout programs
            </Text>
            <View className="flex-row items-center">
              <Ionicons name="library" size={20} color="white" />
              <Text className="text-white ml-2">{templates.length} programs disponibles</Text>
            </View>
          </View>

          <View className="bg-zinc-900 rounded-xl p-4 mb-6 border border-zinc-800">
            <View className="flex-row items-center">
              <Ionicons name="search" size={20} color="#71717a" />
              <TextInput
                placeholder="Search templates..."
                placeholderTextColor="#71717a"
                value={searchQuery}
                onChangeText={setSearchQuery}
                className="flex-1 text-white ml-3"
              />
            </View>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6">
            <View className="flex-row gap-3">
              {categories.map((cat) => (
                <TouchableOpacity
                  key={cat.key}
                  onPress={() => setSelectedCategory(cat.key)}
                  className={`${
                    selectedCategory === cat.key ? 'bg-primary' : 'bg-zinc-900'
                  } rounded-xl px-6 py-3 border ${
                    selectedCategory === cat.key ? 'border-blue-400' : 'border-zinc-800'
                  }`}
                >
                  <Text
                    className={`${
                      selectedCategory === cat.key ? 'text-white' : 'text-zinc-400'
                    } font-bold`}
                  >
                    {cat.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          {filteredTemplates.map((template) => (
            <View key={template.id} className="bg-zinc-900 rounded-xl p-5 mb-4 border border-zinc-800">
              <View className="flex-row items-start justify-between mb-3">
                <View className="flex-1">
                  <Text className="text-white font-bold text-lg mb-1">{template.name}</Text>
                  <Text className="text-zinc-400 text-sm">by {template.author}</Text>
                </View>
                <View className={`bg-${getDifficultyColor(template.difficulty)}-500 rounded-full px-3 py-1`}>
                  <Text className="text-white text-xs font-bold">{template.difficulty}</Text>
                </View>
              </View>

              <View className="flex-row items-center mb-3">
                <Ionicons name="star" size={16} color="#FFEA00" />
                <Text className="text-amber-400 ml-1 font-bold">{template.rating}</Text>
                <Text className="text-zinc-500 ml-1">• {template.downloads.toLocaleString()} downloads</Text>
              </View>

              <View className="flex-row gap-2 mb-4">
                <View className="bg-primary/20 rounded-lg px-3 py-2">
                  <Text className="text-primary/80 text-sm font-bold">{template.duration}</Text>
                </View>
                <View className="bg-primary/20 rounded-lg px-3 py-2">
                  <Text className="text-primary text-sm font-bold">{template.exercises} exercises</Text>
                </View>
              </View>

              <View className="flex-row gap-2">
                <TouchableOpacity className="flex-1 bg-primary rounded-xl py-3 flex-row items-center justify-center">
                  <Ionicons name="download" size={18} color="white" />
                  <Text className="text-white font-bold ml-2">Use Template</Text>
                </TouchableOpacity>
                <TouchableOpacity className="bg-zinc-800 rounded-xl px-4 py-3">
                  <Ionicons name="eye" size={18} color="white" />
                </TouchableOpacity>
              </View>
            </View>
          ))}

          <TouchableOpacity className="bg-primary rounded-xl py-4 flex-row items-center justify-center mb-6">
            <Ionicons name="add-circle" size={24} color="white" />
            <Text className="text-white font-bold ml-2 text-lg">Create Custom Template</Text>
          </TouchableOpacity>

          <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-6">
            <Text className="text-primary/80 font-bold mb-2">Template Tips</Text>
            <Text className="text-primary/60 text-sm">
              • Follow program 8-12 semanas mínimo{'\n'}
              • No mezcles templates diferentes{'\n'}
              • Track progress cada semana{'\n'}
              • Adjust pesos con linear progression{'\n'}
              • Deload cuando sea necesario
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

