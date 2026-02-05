import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  FlatList,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface VideoLibraryItem {
  id: string;
  title: string;
  category: string;
  duration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  views: number;
  thumbnailUrl: string;
  exerciseId: string;
  isPremium: boolean;
}

const VIDEO_LIBRARY: VideoLibraryItem[] = [
  {
    id: '1',
    title: 'Dominadas - TÃ©cnica Perfecta',
    category: 'TracciÃ³n',
    duration: '8:45',
    difficulty: 'intermediate',
    views: 12500,
    thumbnailUrl: 'https://example.com/thumbnails/pull-ups.jpg',
    exerciseId: 'pull-ups',
    isPremium: false,
  },
  {
    id: '2',
    title: 'Muscle-Up - ProgresiÃ³n Completa',
    category: 'Avanzado',
    duration: '12:30',
    difficulty: 'advanced',
    views: 8900,
    thumbnailUrl: 'https://example.com/thumbnails/muscle-up.jpg',
    exerciseId: 'muscle-up',
    isPremium: true,
  },
  {
    id: '3',
    title: 'Push-ups - Variaciones y Progresiones',
    category: 'Empuje',
    duration: '10:15',
    difficulty: 'beginner',
    views: 15200,
    thumbnailUrl: 'https://example.com/thumbnails/pushups.jpg',
    exerciseId: 'push-ups',
    isPremium: false,
  },
  {
    id: '4',
    title: 'Planche - Fundamentos y PreparaciÃ³n',
    category: 'EstÃ¡ticos',
    duration: '15:45',
    difficulty: 'advanced',
    views: 6700,
    thumbnailUrl: 'https://example.com/thumbnails/planche.jpg',
    exerciseId: 'planche',
    isPremium: true,
  },
  {
    id: '5',
    title: 'Front Lever - GuÃ­a Paso a Paso',
    category: 'EstÃ¡ticos',
    duration: '11:20',
    difficulty: 'advanced',
    views: 7300,
    thumbnailUrl: 'https://example.com/thumbnails/front-lever.jpg',
    exerciseId: 'front-lever',
    isPremium: true,
  },
  {
    id: '6',
    title: 'Dips - Forma Correcta',
    category: 'Empuje',
    duration: '7:30',
    difficulty: 'intermediate',
    views: 10800,
    thumbnailUrl: 'https://example.com/thumbnails/dips.jpg',
    exerciseId: 'dips',
    isPremium: false,
  },
  {
    id: '7',
    title: 'Handstand - Equilibrio y Control',
    category: 'EstÃ¡ticos',
    duration: '14:00',
    difficulty: 'intermediate',
    views: 9200,
    thumbnailUrl: 'https://example.com/thumbnails/handstand.jpg',
    exerciseId: 'handstand',
    isPremium: false,
  },
  {
    id: '8',
    title: 'Pistol Squats - Fuerza Unilateral',
    category: 'Piernas',
    duration: '9:50',
    difficulty: 'intermediate',
    views: 5600,
    thumbnailUrl: 'https://example.com/thumbnails/pistol-squat.jpg',
    exerciseId: 'pistol-squat',
    isPremium: false,
  },
];

const CATEGORIES = ['Todos', 'TracciÃ³n', 'Empuje', 'Piernas', 'EstÃ¡ticos', 'Avanzado'];
const DIFFICULTY_FILTERS = ['Todos', 'beginner', 'intermediate', 'advanced'];

export default function VideoLibrary() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [selectedDifficulty, setSelectedDifficulty] = useState('Todos');
  const [showPremiumOnly, setShowPremiumOnly] = useState(false);

  const filteredVideos = VIDEO_LIBRARY.filter((video) => {
    const matchesSearch =
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'Todos' || video.category === selectedCategory;
    const matchesDifficulty =
      selectedDifficulty === 'Todos' || video.difficulty === selectedDifficulty;
    const matchesPremium = !showPremiumOnly || video.isPremium;

    return matchesSearch && matchesCategory && matchesDifficulty && matchesPremium;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return '#9D12DE';
      case 'intermediate':
        return '#FFEA00';
      case 'advanced':
        return '#EF4444';
      default:
        return '#71717A';
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'Principiante';
      case 'intermediate':
        return 'Intermedio';
      case 'advanced':
        return 'Avanzado';
      default:
        return difficulty;
    }
  };

  const formatViews = (views: number) => {
    if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`;
    }
    return views.toString();
  };

  const renderVideoCard = ({ item }: { item: VideoLibraryItem }) => {
    const difficultyColor = getDifficultyColor(item.difficulty);

    return (
      <TouchableOpacity
        onPress={() =>
          router.push(`/videos/tutorial?exerciseId=${item.exerciseId}` as any)
        }
        className="bg-zinc-900 rounded-xl mb-3 overflow-hidden border border-zinc-800"
      >
        {/* Thumbnail */}
        <View className="w-full bg-zinc-800" style={{ height: 180 }}>
          <View className="flex-1 items-center justify-center">
            <Ionicons name="play-circle" size={64} color="#9D12DE" />
          </View>
          {item.isPremium && (
            <View className="absolute top-3 right-3 bg-amber-500 px-3 py-1 rounded-full">
              <Text className="text-white text-xs font-bold">PREMIUM</Text>
            </View>
          )}
          <View className="absolute bottom-3 right-3 bg-black/70 px-2 py-1 rounded">
            <Text className="text-white text-xs font-bold">{item.duration}</Text>
          </View>
        </View>

        {/* Info */}
        <View className="p-4">
          <Text className="text-white font-bold text-lg mb-2">
            {item.title}
          </Text>

          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-2">
              <View
                className="px-2 py-1 rounded-lg"
                style={{ backgroundColor: difficultyColor + '20' }}
              >
                <Text className="text-xs font-bold" style={{ color: difficultyColor }}>
                  {getDifficultyLabel(item.difficulty)}
                </Text>
              </View>
              <Text className="text-zinc-500 text-sm">{item.category}</Text>
            </View>

            <View className="flex-row items-center">
              <Ionicons name="eye-outline" size={16} color="#71717A" />
              <Text className="text-zinc-400 text-sm ml-1">
                {formatViews(item.views)}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View className="flex-1 bg-zinc-950">
      {/* Header */}
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center justify-between mb-3">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1 ml-3">
            Biblioteca de Videos
          </Text>
          <TouchableOpacity>
            <Ionicons name="filter" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Search */}
        <View className="bg-zinc-900 rounded-xl px-4 py-3 flex-row items-center border border-zinc-800">
          <Ionicons name="search" size={20} color="#71717A" />
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Buscar tutoriales..."
            placeholderTextColor="#52525B"
            className="flex-1 ml-2 text-white"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color="#71717A" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Stats */}
      <View className="flex-row px-6 py-3 border-b border-zinc-800">
        <View className="flex-1 items-center">
          <Text className="text-white text-2xl font-bold">
            {VIDEO_LIBRARY.length}
          </Text>
          <Text className="text-zinc-400 text-xs">Videos</Text>
        </View>
        <View className="flex-1 items-center border-l border-zinc-800">
          <Text className="text-primary text-2xl font-bold">
            {VIDEO_LIBRARY.filter((v) => v.isPremium).length}
          </Text>
          <Text className="text-zinc-400 text-xs">Premium</Text>
        </View>
        <View className="flex-1 items-center border-l border-zinc-800">
          <Text className="text-white text-2xl font-bold">
            {filteredVideos.length}
          </Text>
          <Text className="text-zinc-400 text-xs">Resultados</Text>
        </View>
      </View>

      {/* Category Filter */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="border-b border-zinc-800"
        contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 12 }}
      >
        {CATEGORIES.map((category) => (
          <TouchableOpacity
            key={category}
            onPress={() => setSelectedCategory(category)}
            className={`mr-3 px-4 py-2 rounded-xl ${
              selectedCategory === category
                ? 'bg-primary'
                : 'bg-zinc-900'
            }`}
          >
            <Text
              className={`font-semibold ${
                selectedCategory === category ? 'text-white' : 'text-zinc-400'
              }`}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Difficulty Filter */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="border-b border-zinc-800"
        contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 12 }}
      >
        {DIFFICULTY_FILTERS.map((difficulty) => (
          <TouchableOpacity
            key={difficulty}
            onPress={() => setSelectedDifficulty(difficulty)}
            className={`mr-3 px-4 py-2 rounded-xl ${
              selectedDifficulty === difficulty
                ? 'bg-primary/20 border-2 border-primary'
                : 'bg-zinc-900'
            }`}
          >
            <Text
              className={`font-semibold ${
                selectedDifficulty === difficulty ? 'text-primary' : 'text-zinc-400'
              }`}
            >
              {difficulty === 'Todos'
                ? 'Todos'
                : getDifficultyLabel(difficulty)}
            </Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          onPress={() => setShowPremiumOnly(!showPremiumOnly)}
          className={`mr-3 px-4 py-2 rounded-xl ${
            showPremiumOnly
              ? 'bg-amber-500/20 border-2 border-amber-500'
              : 'bg-zinc-900'
          }`}
        >
          <View className="flex-row items-center">
            <Ionicons
              name="star"
              size={16}
              color={showPremiumOnly ? '#FFEA00' : '#71717A'}
            />
            <Text
              className={`font-semibold ml-1 ${
                showPremiumOnly ? 'text-amber-500' : 'text-zinc-400'
              }`}
            >
              Premium
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>

      {/* Video List */}
      <FlatList
        data={filteredVideos}
        renderItem={renderVideoCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 24 }}
        ListEmptyComponent={
          <View className="items-center justify-center py-20">
            <Ionicons name="videocam-outline" size={64} color="#52525B" />
            <Text className="text-zinc-500 text-lg mt-4">
              No se encontraron videos
            </Text>
            <Text className="text-zinc-600 text-sm mt-2 text-center">
              Intenta cambiar los filtros o buscar otro tÃ©rmino
            </Text>
          </View>
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

