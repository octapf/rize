import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  TextInput,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface ForumPost {
  id: string;
  author: {
    name: string;
    avatar: string;
    level: number;
    verified: boolean;
  };
  title: string;
  content: string;
  category: string;
  replies: number;
  views: number;
  likes: number;
  timestamp: string;
  solved?: boolean;
  pinned?: boolean;
}

const FORUM_POSTS: ForumPost[] = [
  {
    id: '1',
    author: { name: 'Carlos Pro', avatar: 'ðŸ’ª', level: 24, verified: true },
    title: '¿Cómo romper plateau en sentadilla?',
    content: 'Llevo 3 semanas estancado en 140kg x 5. ¿Algún tip para superar esto?',
    category: 'Fuerza',
    replies: 18,
    views: 342,
    likes: 23,
    timestamp: '2026-01-27T14:30:00',
    solved: true,
    pinned: false,
  },
  {
    id: '2',
    author: { name: 'Ana Fitness', avatar: 'ðŸ‹ï¸', level: 18, verified: false },
    title: 'Mejor protocolo para definición',
    content: 'Empezando corte. ¿Deficit 300 o 500 kcal? ¿Cardio o solo pesas?',
    category: 'Nutrición',
    replies: 31,
    views: 589,
    likes: 45,
    timestamp: '2026-01-27T12:15:00',
    solved: false,
    pinned: true,
  },
  {
    id: '3',
    author: { name: 'Miguel Beast', avatar: 'ðŸ¦', level: 32, verified: true },
    title: 'Creatina: ¿Fase de carga necesaria?',
    content: 'Debate: ¿5g diarios desde día 1 o loading phase de 20g x 5 días?',
    category: 'Suplementación',
    replies: 24,
    views: 456,
    likes: 38,
    timestamp: '2026-01-27T10:00:00',
    solved: true,
    pinned: false,
  },
  {
    id: '4',
    author: { name: 'Laura Recovery', avatar: '🧘', level: 15, verified: false },
    title: 'Dolor de hombro en press banca',
    content: 'Molestia frontal del hombro al bajar barra. ¿Técnica o lesión?',
    category: 'Salud',
    replies: 12,
    views: 234,
    likes: 19,
    timestamp: '2026-01-26T18:45:00',
    solved: false,
    pinned: false,
  },
  {
    id: '5',
    author: { name: 'Pedro Iron', avatar: '⚡', level: 28, verified: true },
    title: '[GUÃA] 5/3/1 para principiantes',
    content: 'Tutorial completo del programa Wendler 5/3/1. Setup, progresión, deload.',
    category: 'Programación',
    replies: 67,
    views: 1248,
    likes: 142,
    timestamp: '2026-01-26T15:20:00',
    solved: false,
    pinned: true,
  },
  {
    id: '6',
    author: { name: 'Sofia Cardio', avatar: 'ðŸƒ', level: 12, verified: false },
    title: 'Combinar pesas y running',
    content: '¿Cómo estructurar semana para no perder músculo entrenando maratón?',
    category: 'Programación',
    replies: 9,
    views: 167,
    likes: 14,
    timestamp: '2026-01-26T11:30:00',
    solved: false,
    pinned: false,
  },
];

const CATEGORIES = [
  { id: 'all', name: 'Todos', icon: 'apps', color: 'text-zinc-400' },
  { id: 'Fuerza', name: 'Fuerza', icon: 'barbell', color: 'text-red-400' },
  { id: 'Nutrición', name: 'Nutrición', icon: 'restaurant', color: 'text-primary' },
  { id: 'Suplementación', name: 'Suplementos', icon: 'flask', color: 'text-purple-400' },
  { id: 'Salud', name: 'Salud', icon: 'medical', color: 'text-primary/80' },
  { id: 'Programación', name: 'Programación', icon: 'calendar', color: 'text-amber-400' },
];

export default function CommunityForum() {
  const [posts, setPosts] = useState(FORUM_POSTS);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = posts.filter((post) => {
    const matchesCategory = filter === 'all' || post.category === filter;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const sortedPosts = filteredPosts.sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
  });

  const openPost = (post: ForumPost) => {
    Alert.alert(
      post.title,
      `${post.content}\n\nPor: ${post.author.name}\n${post.replies} respuestas • ${post.views} vistas`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Ver Completo' },
      ]
    );
  };

  const createPost = () => {
    Alert.alert(
      'Nuevo Post',
      'Crea una pregunta o comparte conocimiento',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Crear', onPress: () => Alert.alert('Post creado') },
      ]
    );
  };

  const likePost = (id: string) => {
    setPosts(
      posts.map((post) =>
        post.id === id
          ? { ...post, likes: post.likes + 1 }
          : post
      )
    );
  };

  const getTimeSince = (timestamp: string) => {
    const now = new Date();
    const then = new Date(timestamp);
    const diffHours = Math.floor((now.getTime() - then.getTime()) / (1000 * 60 * 60));
    
    if (diffHours < 1) return 'Hace unos minutos';
    if (diffHours < 24) return `Hace ${diffHours}h`;
    const diffDays = Math.floor(diffHours / 24);
    return `Hace ${diffDays}d`;
  };

  return (
    <View className="flex-1 bg-zinc-950">
      {/* Header */}
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1 ml-3">
            Foro Comunitario
          </Text>
          <TouchableOpacity onPress={createPost}>
            <Ionicons name="add-circle" size={28} color="#9D12DE" />
          </TouchableOpacity>
        </View>

        {/* Search */}
        <View className="bg-zinc-900 rounded-xl p-3 border border-zinc-800 flex-row items-center mb-4">
          <Ionicons name="search" size={20} color="#71717A" />
          <TextInput
            placeholder="Buscar posts..."
            placeholderTextColor="#71717A"
            value={searchQuery}
            onChangeText={setSearchQuery}
            className="text-white text-base ml-3 flex-1"
          />
        </View>

        {/* Category Filters */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row gap-2">
            {CATEGORIES.map((category) => (
              <TouchableOpacity
                key={category.id}
                onPress={() => setFilter(category.id)}
                className={`flex-row items-center px-4 py-2 rounded-lg ${
                  filter === category.id
                    ? 'bg-primary'
                    : 'bg-zinc-900 border border-zinc-800'
                }`}
              >
                <Ionicons
                  name={category.icon as any}
                  size={16}
                  color={filter === category.id ? 'white' : '#71717A'}
                />
                <Text
                  className={`ml-2 font-semibold text-sm ${
                    filter === category.id ? 'text-white' : 'text-zinc-400'
                  }`}
                >
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          {sortedPosts.map((post) => (
            <TouchableOpacity
              key={post.id}
              onPress={() => openPost(post)}
              activeOpacity={0.7}
              className="bg-zinc-900 rounded-xl p-4 mb-4 border border-zinc-800"
            >
              {/* Pinned Badge */}
              {post.pinned && (
                <View className="flex-row items-center mb-2">
                  <Ionicons name="pin" size={14} color="#FFEA00" />
                  <Text className="text-amber-400 text-xs font-bold ml-1">FIJADO</Text>
                </View>
              )}

              {/* Author */}
              <View className="flex-row items-center justify-between mb-3">
                <View className="flex-row items-center flex-1">
                  <View className="w-10 h-10 bg-primary/20 rounded-full items-center justify-center">
                    <Text className="text-2xl">{post.author.avatar}</Text>
                  </View>
                  <View className="ml-3 flex-1">
                    <View className="flex-row items-center">
                      <Text className="text-white font-bold">{post.author.name}</Text>
                      {post.author.verified && (
                        <Ionicons name="checkmark-circle" size={14} color="#9D12DE" className="ml-1" />
                      )}
                      <View className="bg-zinc-800 rounded px-2 py-0.5 ml-2">
                        <Text className="text-zinc-400 text-xs">Lvl {post.author.level}</Text>
                      </View>
                    </View>
                    <Text className="text-zinc-400 text-xs">{getTimeSince(post.timestamp)}</Text>
                  </View>
                </View>
                <View
                  className={`px-2 py-1 rounded-lg ${
                    post.category === 'Fuerza'
                      ? 'bg-red-500/10'
                      : post.category === 'Nutrición'
                      ? 'bg-primary/10'
                      : post.category === 'Suplementación'
                      ? 'bg-purple-500/10'
                      : post.category === 'Salud'
                      ? 'bg-primary/10'
                      : 'bg-amber-500/10'
                  }`}
                >
                  <Text
                    className={`text-xs ${
                      post.category === 'Fuerza'
                        ? 'text-red-400'
                        : post.category === 'Nutrición'
                        ? 'text-primary'
                        : post.category === 'Suplementación'
                        ? 'text-purple-400'
                        : post.category === 'Salud'
                        ? 'text-primary/80'
                        : 'text-amber-400'
                    }`}
                  >
                    {post.category}
                  </Text>
                </View>
              </View>

              {/* Title */}
              <Text className="text-white font-bold text-lg mb-2">
                {post.title}
                {post.solved && (
                  <View className="inline-flex ml-2">
                    <Ionicons name="checkmark-done-circle" size={18} color="#9D12DE" />
                  </View>
                )}
              </Text>

              {/* Content Preview */}
              <Text className="text-zinc-300 text-sm mb-3" numberOfLines={2}>
                {post.content}
              </Text>

              {/* Stats */}
              <View className="flex-row items-center justify-between pt-3 border-t border-zinc-800">
                <View className="flex-row items-center gap-4">
                  <View className="flex-row items-center">
                    <Ionicons name="chatbubble-outline" size={16} color="#71717A" />
                    <Text className="text-zinc-400 text-sm ml-1">{post.replies}</Text>
                  </View>
                  <View className="flex-row items-center">
                    <Ionicons name="eye-outline" size={16} color="#71717A" />
                    <Text className="text-zinc-400 text-sm ml-1">{post.views}</Text>
                  </View>
                </View>

                <TouchableOpacity
                  onPress={() => likePost(post.id)}
                  className="flex-row items-center"
                >
                  <Ionicons name="heart-outline" size={16} color="#EF4444" />
                  <Text className="text-red-400 text-sm ml-1">{post.likes}</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Community Guidelines */}
        <View className="px-6 pb-6 pt-2">
          <View className="bg-primary/10 rounded-xl p-4 border border-primary/30">
            <View className="flex-row items-start">
              <Ionicons name="people" size={20} color="#9D12DE" />
              <View className="flex-1 ml-3">
                <Text className="text-primary/80 font-bold mb-2">
                  Comunidad de Respeto
                </Text>
                <Text className="text-primary/60 text-sm">
                  Comparte conocimiento, haz preguntas y ayuda a otros. Juntos somos más fuertes.
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

