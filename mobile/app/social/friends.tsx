import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useQuery } from '@tanstack/react-query';
import { socialApi } from '@/services/api/social.api';
import { useAuthStore } from '@/stores/authStore';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function FriendsScreen() {
  const { user } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState('');

  const { data: friendsData, isLoading: friendsLoading } = useQuery({
    queryKey: ['friends'],
    queryFn: () => socialApi.getFriends(),
  });

  const { data: pendingData } = useQuery({
    queryKey: ['pending-requests'],
    queryFn: () => socialApi.getPendingRequests(),
  });

  const friends = friendsData?.data.friends || [];
  const pendingRequests = pendingData?.data.requests || [];

  const filteredFriends = friends.filter((friend: any) =>
    friend.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleChallengeUser = (friendId: string, username: string) => {
    Alert.alert(
      'Crear Reto',
      `Â¿Quieres retar a @${username}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Crear Reto',
          onPress: () => {
            // Navigate to create challenge with pre-selected friend
            router.push({
              pathname: '/challenges/create',
              params: { preSelectedFriend: friendId },
            });
          },
        },
      ]
    );
  };

  const handleViewProfile = (friendId: string) => {
    router.push(`/users/${friendId}`);
  };

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <LinearGradient colors={['#9D12DE', '#7C3AED']} className="px-6 pt-12 pb-6">
        <View className="flex-row items-center justify-between mb-4">
          <TouchableOpacity onPress={() => router.back()} className="p-2">
            <Ionicons name="arrow-back" size={28} color="white" />
          </TouchableOpacity>
          <Text className="text-2xl font-bold text-white">Amigos</Text>
          <TouchableOpacity
            onPress={() => router.push('/social/search')}
            className="p-2"
          >
            <Ionicons name="person-add" size={28} color="white" />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View className="bg-white/20 rounded-xl px-4 py-3 flex-row items-center gap-3">
          <Ionicons name="search" size={20} color="white" />
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Buscar amigos..."
            placeholderTextColor="rgba(255,255,255,0.6)"
            className="flex-1 text-white"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color="white" />
            </TouchableOpacity>
          )}
        </View>
      </LinearGradient>

      <ScrollView className="flex-1" contentContainerClassName="p-6 gap-4">
        {/* Pending Requests */}
        {pendingRequests.length > 0 && (
          <View>
            <Text className="text-lg font-bold text-gray-900 mb-3">
              Solicitudes Pendientes ({pendingRequests.length})
            </Text>
            {pendingRequests.map((request: any) => (
              <Card key={request._id} className="p-4 mb-3">
                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center gap-3 flex-1">
                    <View className="bg-primary/10 w-12 h-12 rounded-full items-center justify-center">
                      <Text className="text-primary text-xl font-bold">
                        {request.requester.username[0].toUpperCase()}
                      </Text>
                    </View>
                    <View className="flex-1">
                      <Text className="text-gray-900 font-bold">
                        @{request.requester.username}
                      </Text>
                      <Text className="text-gray-500 text-sm">
                        {request.requester.email}
                      </Text>
                    </View>
                  </View>
                  <View className="flex-row gap-2">
                    <TouchableOpacity className="bg-primary p-2 rounded-lg">
                      <Ionicons name="checkmark" size={20} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity className="bg-red-500 p-2 rounded-lg">
                      <Ionicons name="close" size={20} color="white" />
                    </TouchableOpacity>
                  </View>
                </View>
              </Card>
            ))}
          </View>
        )}

        {/* Friends List */}
        <View>
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-lg font-bold text-gray-900">
              Mis Amigos ({filteredFriends.length})
            </Text>
            {filteredFriends.length > 0 && (
              <TouchableOpacity>
                <Text className="text-primary font-semibold">
                  Ver Todos
                </Text>
              </TouchableOpacity>
            )}
          </View>

          {friendsLoading ? (
            <Card className="p-8">
              <Text className="text-center text-gray-500">Cargando...</Text>
            </Card>
          ) : filteredFriends.length === 0 ? (
            <Card className="p-8">
              <View className="items-center gap-3">
                <Ionicons name="people-outline" size={48} color="#9CA3AF" />
                <Text className="text-center text-gray-500 font-medium">
                  {searchQuery
                    ? 'No se encontraron amigos'
                    : 'AÃºn no tienes amigos'}
                </Text>
                {!searchQuery && (
                  <Button
                    onPress={() => router.push('/social/search')}
                    variant="primary"
                    className="mt-2"
                  >
                    Buscar Amigos
                  </Button>
                )}
              </View>
            </Card>
          ) : (
            filteredFriends.map((friend: any) => (
              <Card key={friend._id} className="p-4 mb-3">
                <View className="flex-row items-center justify-between">
                  <TouchableOpacity
                    onPress={() => handleViewProfile(friend._id)}
                    className="flex-row items-center gap-3 flex-1"
                  >
                    <View className="bg-primary/10 w-14 h-14 rounded-full items-center justify-center">
                      <Text className="text-primary text-2xl font-bold">
                        {friend.username[0].toUpperCase()}
                      </Text>
                    </View>
                    <View className="flex-1">
                      <Text className="text-gray-900 font-bold text-lg">
                        @{friend.username}
                      </Text>
                      <Text className="text-gray-500 text-sm">
                        Nivel {Math.floor((friend.xp || 0) / 100) + 1} â€¢ {friend.xp || 0} XP
                      </Text>
                    </View>
                  </TouchableOpacity>

                  <View className="flex-row gap-2">
                    <TouchableOpacity
                      onPress={() => handleChallengeUser(friend._id, friend.username)}
                      className="bg-red-500 px-4 py-2 rounded-lg"
                    >
                      <View className="flex-row items-center gap-2">
                        <Ionicons name="flash" size={18} color="white" />
                        <Text className="text-white font-semibold">Retar</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Quick Stats */}
                <View className="flex-row gap-3 mt-3 pt-3 border-t border-gray-200">
                  <View className="flex-1 items-center">
                    <Text className="text-gray-500 text-xs">Entrenamientos</Text>
                    <Text className="text-gray-900 font-bold text-lg">
                      {friend.workoutCount || 0}
                    </Text>
                  </View>
                  <View className="flex-1 items-center">
                    <Text className="text-gray-500 text-xs">Racha</Text>
                    <Text className="text-gray-900 font-bold text-lg">
                      {friend.streak || 0}
                    </Text>
                  </View>
                  <View className="flex-1 items-center">
                    <Text className="text-gray-500 text-xs">Logros</Text>
                    <Text className="text-gray-900 font-bold text-lg">
                      {friend.achievementCount || 0}
                    </Text>
                  </View>
                </View>
              </Card>
            ))
          )}
        </View>

        {/* Quick Actions */}
        <View className="gap-3 mt-2">
          <TouchableOpacity onPress={() => router.push('/social/search')}>
            <Card className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50">
              <View className="flex-row items-center gap-4">
                <View className="bg-primary w-12 h-12 rounded-xl items-center justify-center">
                  <Ionicons name="search" size={28} color="white" />
                </View>
                <View className="flex-1">
                  <Text className="text-lg font-bold text-gray-900">
                    Buscar Usuarios
                  </Text>
                  <Text className="text-sm text-gray-600">
                    Encuentra y sigue a otros atletas
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={24} color="#9CA3AF" />
              </View>
            </Card>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push('/leaderboard')}>
            <Card className="p-4 bg-gradient-to-r from-amber-50 to-orange-50">
              <View className="flex-row items-center gap-4">
                <View className="bg-amber-500 w-12 h-12 rounded-xl items-center justify-center">
                  <Ionicons name="trophy" size={28} color="white" />
                </View>
                <View className="flex-1">
                  <Text className="text-lg font-bold text-gray-900">
                    Rankings
                  </Text>
                  <Text className="text-sm text-gray-600">
                    Compite con tus amigos
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={24} color="#9CA3AF" />
              </View>
            </Card>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

