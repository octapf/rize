import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Card } from '@/components/ui/Card';

type SearchCategory = 'all' | 'users' | 'workouts' | 'exercises' | 'challenges';

interface SearchResult {
  id: string;
  type: 'user' | 'workout' | 'exercise' | 'challenge';
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  route: string;
}

const mockResults: SearchResult[] = [
  {
    id: '1',
    type: 'user',
    title: 'Carlos García',
    subtitle: '@carlosfit • Nivel 15',
    icon: 'person',
    color: '#9D12DE',
    route: '/users/1',
  },
  {
    id: '2',
    type: 'exercise',
    title: 'Bench Press',
    subtitle: 'Pecho • Barra',
    icon: 'barbell',
    color: '#9D12DE',
    route: '/exercises/bench-press',
  },
  {
    id: '3',
    type: 'workout',
    title: 'Push Day Template',
    subtitle: '5 ejercicios • 60 min',
    icon: 'fitness',
    color: '#8B5CF6',
    route: '/workouts/templates/1',
  },
  {
    id: '4',
    type: 'challenge',
    title: '30 Days Streak',
    subtitle: 'Racha • 500 XP',
    icon: 'flame',
    color: '#EF4444',
    route: '/challenges/1',
  },
  {
    id: '5',
    type: 'user',
    title: 'María López',
    subtitle: '@mariastrong • Nivel 18',
    icon: 'person',
    color: '#9D12DE',
    route: '/users/2',
  },
];

const recentSearches = [
  'Bench Press',
  'Push Day',
  'Carlos García',
  '30 Days Streak',
];

const popularSearches = [
  { text: 'Squat', icon: 'barbell', color: '#9D12DE' },
  { text: 'Leg Day', icon: 'fitness', color: '#8B5CF6' },
  { text: 'Pull-ups', icon: 'barbell', color: '#9D12DE' },
  { text: 'Volume Challenge', icon: 'trophy', color: '#FFEA00' },
];

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState<SearchCategory>('all');

  const filteredResults = searchQuery
    ? mockResults.filter(r => {
        const matchesQuery =
          r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          r.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = category === 'all' || r.type === category.slice(0, -1);
        return matchesQuery && matchesCategory;
      })
    : [];

  const handleResultPress = (result: SearchResult) => {
    router.push(result.route as any);
  };

  const renderResult = (result: SearchResult) => {
    return (
      <TouchableOpacity
        key={result.id}
        onPress={() => handleResultPress(result)}
        activeOpacity={0.7}
      >
        <Card className="p-4 mb-2">
          <View className="flex-row items-center gap-3">
            <View
              className="w-12 h-12 rounded-full items-center justify-center"
              style={{ backgroundColor: result.color + '20' }}
            >
              <Ionicons
                name={result.icon as any}
                size={24}
                style={{ color: result.color }}
              />
            </View>

            <View className="flex-1">
              <Text className="text-gray-900 font-bold text-base">
                {result.title}
              </Text>
              <Text className="text-gray-600 text-sm">{result.subtitle}</Text>
            </View>

            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </View>
        </Card>
      </TouchableOpacity>
    );
  };

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <LinearGradient colors={['#6366F1', '#4F46E5']} className="px-6 pt-12 pb-6">
        <View className="flex-row items-center gap-3 mb-4">
          <TouchableOpacity onPress={() => router.back()} className="p-2">
            <Ionicons name="arrow-back" size={28} color="white" />
          </TouchableOpacity>

          <View className="flex-1 flex-row items-center bg-white rounded-lg px-3 py-2">
            <Ionicons name="search" size={20} color="#6B7280" />
            <TextInput
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Buscar usuarios, ejercicios, desafíos..."
              className="flex-1 ml-2 text-gray-900"
              autoFocus
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Ionicons name="close-circle" size={20} color="#6B7280" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Category Filters */}
        {searchQuery.length > 0 && (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerClassName="gap-2"
          >
            {(['all', 'users', 'exercises', 'workouts', 'challenges'] as const).map(cat => (
              <TouchableOpacity
                key={cat}
                onPress={() => setCategory(cat)}
                className={`px-4 py-2 rounded-lg ${
                  category === cat ? 'bg-white' : 'bg-white/20'
                }`}
              >
                <Text
                  className={`font-semibold capitalize ${
                    category === cat ? 'text-indigo-600' : 'text-white'
                  }`}
                >
                  {cat === 'all' ? 'Todos' : cat === 'users' ? 'Usuarios' : cat === 'exercises' ? 'Ejercicios' : cat === 'workouts' ? 'Entrenamientos' : 'Desafíos'}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </LinearGradient>

      <ScrollView className="flex-1" contentContainerClassName="p-6">
        {searchQuery.length === 0 ? (
          <>
            {/* Recent Searches */}
            {recentSearches.length > 0 && (
              <View className="mb-6">
                <Text className="text-gray-900 font-bold text-lg mb-3">
                  Búsquedas Recientes
                </Text>
                <View className="gap-2">
                  {recentSearches.map((search, i) => (
                    <TouchableOpacity
                      key={i}
                      onPress={() => setSearchQuery(search)}
                      className="flex-row items-center justify-between p-3 bg-white rounded-lg"
                    >
                      <View className="flex-row items-center gap-3">
                        <Ionicons name="time-outline" size={20} color="#6B7280" />
                        <Text className="text-gray-900">{search}</Text>
                      </View>
                      <Ionicons name="arrow-up-outline" size={20} color="#6B7280" />
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}

            {/* Popular Searches */}
            <View className="mb-6">
              <Text className="text-gray-900 font-bold text-lg mb-3">
                Búsquedas Populares
              </Text>
              <View className="flex-row flex-wrap gap-2">
                {popularSearches.map((search, i) => (
                  <TouchableOpacity
                    key={i}
                    onPress={() => setSearchQuery(search.text)}
                    className="px-4 py-2 rounded-full flex-row items-center gap-2"
                    style={{ backgroundColor: search.color + '20' }}
                  >
                    <Ionicons
                      name={search.icon as any}
                      size={16}
                      style={{ color: search.color }}
                    />
                    <Text
                      className="font-semibold"
                      style={{ color: search.color }}
                    >
                      {search.text}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Quick Access */}
            <View>
              <Text className="text-gray-900 font-bold text-lg mb-3">
                Acceso Rápido
              </Text>
              <View className="gap-2">
                <TouchableOpacity
                  onPress={() => router.push('/exercises/library')}
                  className="bg-white p-4 rounded-lg flex-row items-center gap-3"
                >
                  <View className="bg-primary/10 w-10 h-10 rounded-full items-center justify-center">
                    <Ionicons name="barbell" size={20} color="#9D12DE" />
                  </View>
                  <Text className="text-gray-900 font-semibold flex-1">
                    Biblioteca de Ejercicios
                  </Text>
                  <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => router.push('/challenges')}
                  className="bg-white p-4 rounded-lg flex-row items-center gap-3"
                >
                  <View className="bg-red-100 w-10 h-10 rounded-full items-center justify-center">
                    <Ionicons name="trophy" size={20} color="#EF4444" />
                  </View>
                  <Text className="text-gray-900 font-semibold flex-1">
                    Desafíos Activos
                  </Text>
                  <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => router.push('/friends')}
                  className="bg-white p-4 rounded-lg flex-row items-center gap-3"
                >
                  <View className="bg-pink-100 w-10 h-10 rounded-full items-center justify-center">
                    <Ionicons name="people" size={20} color="#EC4899" />
                  </View>
                  <Text className="text-gray-900 font-semibold flex-1">
                    Buscar Amigos
                  </Text>
                  <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
                </TouchableOpacity>
              </View>
            </View>
          </>
        ) : (
          <>
            {/* Search Results */}
            {filteredResults.length === 0 ? (
              <Card className="p-8 items-center">
                <Ionicons name="search-outline" size={64} color="#D1D5DB" />
                <Text className="text-gray-900 text-xl font-bold mt-4 text-center">
                  No hay resultados
                </Text>
                <Text className="text-gray-600 text-center mt-2">
                  Intenta con otros términos de búsqueda
                </Text>
              </Card>
            ) : (
              <>
                <Text className="text-gray-600 text-sm mb-3">
                  {filteredResults.length} resultado{filteredResults.length !== 1 ? 's' : ''}
                </Text>
                {filteredResults.map(renderResult)}
              </>
            )}
          </>
        )}
      </ScrollView>
    </View>
  );
}

