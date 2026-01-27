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

interface Friend {
  id: string;
  name: string;
  username: string;
  level: number;
  xp: number;
  streak: number;
  workouts: number;
  status: 'online' | 'offline';
  lastActive?: string;
  avatar?: string;
}

const mockFriends: Friend[] = [
  {
    id: '1',
    name: 'Carlos García',
    username: '@carlosfit',
    level: 15,
    xp: 3450,
    streak: 12,
    workouts: 156,
    status: 'online',
  },
  {
    id: '2',
    name: 'María López',
    username: '@mariastrong',
    level: 18,
    xp: 4200,
    streak: 25,
    workouts: 203,
    status: 'online',
  },
  {
    id: '3',
    name: 'Juan Pérez',
    username: '@juanfitness',
    level: 12,
    xp: 2890,
    streak: 7,
    workouts: 128,
    status: 'offline',
    lastActive: 'hace 2h',
  },
  {
    id: '4',
    name: 'Ana Martínez',
    username: '@anagym',
    level: 20,
    xp: 5100,
    streak: 30,
    workouts: 245,
    status: 'offline',
    lastActive: 'hace 1d',
  },
  {
    id: '5',
    name: 'Pedro Sánchez',
    username: '@pedrolift',
    level: 14,
    xp: 3200,
    streak: 5,
    workouts: 142,
    status: 'online',
  },
];

export default function FriendsScreen() {
  const [friends, setFriends] = useState<Friend[]>(mockFriends);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'online'>('all');

  const filteredFriends = friends.filter(f => {
    const matchesSearch =
      !searchQuery ||
      f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.username.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter = filter === 'all' || f.status === 'online';

    return matchesSearch && matchesFilter;
  });

  const onlineFriends = friends.filter(f => f.status === 'online').length;

  const renderFriend = (friend: Friend) => {
    return (
      <TouchableOpacity
        key={friend.id}
        onPress={() => router.push(`/users/${friend.id}` as any)}
        activeOpacity={0.7}
      >
        <Card className="p-4 mb-3">
          <View className="flex-row items-center gap-3">
            {/* Avatar */}
            <View className="relative">
              <View className="w-14 h-14 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full items-center justify-center">
                <Text className="text-white font-bold text-xl">
                  {friend.name.charAt(0)}
                </Text>
              </View>
              {friend.status === 'online' && (
                <View className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full" />
              )}
            </View>

            {/* Info */}
            <View className="flex-1">
              <View className="flex-row items-center gap-2 mb-1">
                <Text className="text-gray-900 font-bold text-base">
                  {friend.name}
                </Text>
                <View className="bg-blue-100 px-2 py-0.5 rounded-full">
                  <Text className="text-blue-700 font-bold text-xs">
                    Lvl {friend.level}
                  </Text>
                </View>
              </View>

              <Text className="text-gray-600 text-sm mb-2">
                {friend.username}
              </Text>

              <View className="flex-row items-center gap-3">
                <View className="flex-row items-center gap-1">
                  <Ionicons name="flame" size={14} color="#F59E0B" />
                  <Text className="text-gray-700 text-xs font-semibold">
                    {friend.streak}
                  </Text>
                </View>
                <View className="flex-row items-center gap-1">
                  <Ionicons name="fitness" size={14} color="#10B981" />
                  <Text className="text-gray-700 text-xs font-semibold">
                    {friend.workouts}
                  </Text>
                </View>
                <View className="flex-row items-center gap-1">
                  <Ionicons name="star" size={14} color="#3B82F6" />
                  <Text className="text-gray-700 text-xs font-semibold">
                    {friend.xp}
                  </Text>
                </View>
              </View>

              {friend.status === 'offline' && friend.lastActive && (
                <Text className="text-gray-500 text-xs mt-1">
                  {friend.lastActive}
                </Text>
              )}
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
      <LinearGradient colors={['#EC4899', '#DB2777']} className="px-6 pt-12 pb-6">
        <View className="flex-row items-center justify-between mb-4">
          <TouchableOpacity onPress={() => router.back()} className="p-2">
            <Ionicons name="arrow-back" size={28} color="white" />
          </TouchableOpacity>
          <Text className="text-2xl font-bold text-white">Amigos</Text>
          <TouchableOpacity
            onPress={() => router.push('/friends/add' as any)}
            className="bg-white/20 p-2 rounded-full"
          >
            <Ionicons name="person-add" size={28} color="white" />
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View className="flex-row gap-3">
          <Card className="flex-1 p-3 bg-white/20 border-0">
            <Text className="text-white/80 text-xs mb-1">Total</Text>
            <Text className="text-white text-2xl font-bold">{friends.length}</Text>
          </Card>
          <Card className="flex-1 p-3 bg-white/20 border-0">
            <Text className="text-white/80 text-xs mb-1">En línea</Text>
            <Text className="text-white text-2xl font-bold">{onlineFriends}</Text>
          </Card>
        </View>
      </LinearGradient>

      {/* Search & Filters */}
      <View className="bg-white px-6 py-3 border-b border-gray-200">
        <View className="flex-row items-center bg-gray-100 rounded-lg px-3 py-2 mb-3">
          <Ionicons name="search" size={20} color="#6B7280" />
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Buscar amigos..."
            className="flex-1 ml-2 text-gray-900"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color="#6B7280" />
            </TouchableOpacity>
          )}
        </View>

        <View className="flex-row gap-2">
          {(['all', 'online'] as const).map(f => (
            <TouchableOpacity
              key={f}
              onPress={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg ${
                filter === f ? 'bg-pink-500' : 'bg-gray-200'
              }`}
            >
              <Text
                className={`font-semibold ${
                  filter === f ? 'text-white' : 'text-gray-700'
                }`}
              >
                {f === 'all' ? 'Todos' : 'En línea'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <ScrollView className="flex-1" contentContainerClassName="p-6">
        {filteredFriends.length === 0 ? (
          <Card className="p-8 items-center">
            <Ionicons name="people-outline" size={64} color="#D1D5DB" />
            <Text className="text-gray-900 text-xl font-bold mt-4 text-center">
              No hay amigos
            </Text>
            <Text className="text-gray-600 text-center mt-2">
              {searchQuery
                ? 'Intenta con otra búsqueda'
                : 'Agrega amigos para ver su actividad'}
            </Text>
            <TouchableOpacity
              onPress={() => router.push('/friends/add' as any)}
              className="mt-4 bg-pink-500 px-6 py-3 rounded-lg"
            >
              <Text className="text-white font-semibold">Buscar Amigos</Text>
            </TouchableOpacity>
          </Card>
        ) : (
          filteredFriends.map(renderFriend)
        )}
      </ScrollView>
    </View>
  );
}
