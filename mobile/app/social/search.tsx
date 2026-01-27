import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useQuery } from '@tanstack/react-query';
import { usersApi, UserSearchResult } from '@/services/api/users.api';
import { Card } from '@/components/ui/Card';

export default function SearchUsersScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  // Debounce search query
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const { data, isLoading } = useQuery({
    queryKey: ['search-users', debouncedQuery],
    queryFn: () => usersApi.searchUsers(debouncedQuery),
    enabled: debouncedQuery.length >= 2,
  });

  const users = data?.data.users || [];

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <LinearGradient colors={['#10B981', '#059669']} className="px-6 pt-12 pb-6">
        <View className="flex-row items-center justify-between mb-4">
          <TouchableOpacity onPress={() => router.back()} className="p-2">
            <Ionicons name="arrow-back" size={28} color="white" />
          </TouchableOpacity>
          <Text className="text-2xl font-bold text-white">Buscar Usuarios</Text>
          <View className="w-10" />
        </View>

        {/* Search Bar */}
        <View className="bg-white rounded-xl px-4 py-3 flex-row items-center gap-3">
          <Ionicons name="search" size={20} color="#6B7280" />
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Buscar por nombre de usuario..."
            placeholderTextColor="#9CA3AF"
            className="flex-1 text-gray-900"
            autoFocus
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color="#9CA3AF" />
            </TouchableOpacity>
          )}
        </View>
      </LinearGradient>

      <ScrollView className="flex-1" contentContainerClassName="p-6">
        {/* Search Info */}
        {searchQuery.length === 0 && (
          <Card className="p-8">
            <View className="items-center gap-3">
              <Ionicons name="search-outline" size={48} color="#9CA3AF" />
              <Text className="text-center text-gray-500 font-medium">
                Escribe al menos 2 caracteres para buscar
              </Text>
            </View>
          </Card>
        )}

        {searchQuery.length > 0 && searchQuery.length < 2 && (
          <Card className="p-6">
            <Text className="text-center text-gray-500">
              Escribe al menos 2 caracteres...
            </Text>
          </Card>
        )}

        {/* Loading */}
        {isLoading && debouncedQuery.length >= 2 && (
          <View className="py-12">
            <ActivityIndicator size="large" color="#10B981" />
          </View>
        )}

        {/* Results */}
        {!isLoading && debouncedQuery.length >= 2 && (
          <>
            {users.length === 0 ? (
              <Card className="p-8">
                <View className="items-center gap-3">
                  <Ionicons name="person-outline" size={48} color="#9CA3AF" />
                  <Text className="text-center text-gray-500 font-medium">
                    No se encontraron usuarios
                  </Text>
                  <Text className="text-center text-gray-400 text-sm">
                    Intenta con otro término de búsqueda
                  </Text>
                </View>
              </Card>
            ) : (
              <View className="gap-3">
                <Text className="text-gray-600 mb-2">
                  {users.length} resultado{users.length !== 1 ? 's' : ''}
                </Text>

                {users.map((user: UserSearchResult) => (
                  <TouchableOpacity
                    key={user._id}
                    onPress={() => router.push(`/users/${user._id}`)}
                  >
                    <Card className="p-4">
                      <View className="flex-row items-center gap-4">
                        {/* Avatar */}
                        <View className="bg-emerald-100 w-14 h-14 rounded-full items-center justify-center">
                          <Text className="text-emerald-600 text-2xl font-bold">
                            {user.username[0].toUpperCase()}
                          </Text>
                        </View>

                        {/* User Info */}
                        <View className="flex-1">
                          <Text className="text-gray-900 font-bold text-lg">
                            @{user.username}
                          </Text>
                          <View className="flex-row items-center gap-2 mt-1">
                            <View className="flex-row items-center gap-1">
                              <Ionicons name="trophy" size={14} color="#F59E0B" />
                              <Text className="text-gray-600 text-sm">
                                Nivel {user.level}
                              </Text>
                            </View>
                            <Text className="text-gray-400">•</Text>
                            <View className="flex-row items-center gap-1">
                              <Ionicons name="flame" size={14} color="#EF4444" />
                              <Text className="text-gray-600 text-sm">
                                {user.streak} días
                              </Text>
                            </View>
                          </View>
                        </View>

                        {/* Chevron */}
                        <Ionicons name="chevron-forward" size={24} color="#9CA3AF" />
                      </View>

                      {/* Quick Stats */}
                      <View className="flex-row gap-4 mt-3 pt-3 border-t border-gray-200">
                        <View className="flex-1 items-center">
                          <Text className="text-gray-500 text-xs">Workouts</Text>
                          <Text className="text-gray-900 font-bold">
                            {user.workoutCount}
                          </Text>
                        </View>
                        <View className="flex-1 items-center">
                          <Text className="text-gray-500 text-xs">XP</Text>
                          <Text className="text-gray-900 font-bold">
                            {user.xp}
                          </Text>
                        </View>
                        <View className="flex-1 items-center">
                          <Text className="text-gray-500 text-xs">Logros</Text>
                          <Text className="text-gray-900 font-bold">
                            {user.achievementCount}
                          </Text>
                        </View>
                      </View>
                    </Card>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </>
        )}
      </ScrollView>
    </View>
  );
}
