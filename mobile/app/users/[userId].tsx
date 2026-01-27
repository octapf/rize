import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { socialApi } from '@/services/api/social.api';
import { usersApi } from '@/services/api/users.api';
import { useAuthStore } from '@/stores/authStore';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export default function UserProfileScreen() {
  const { userId } = useLocalSearchParams<{ userId: string }>();
  const { user: currentUser } = useAuthStore();
  const queryClient = useQueryClient();

  // Fetch user profile
  const { data: profileData, isLoading: profileLoading } = useQuery({
    queryKey: ['user-profile', userId],
    queryFn: () => usersApi.getUserProfile(userId!),
    enabled: !!userId,
  });

  // Fetch friendship status
  const { data: friendsData } = useQuery({
    queryKey: ['friends'],
    queryFn: () => socialApi.getFriends(),
  });

  const sendFriendRequest = useMutation({
    mutationFn: (targetUserId: string) => socialApi.sendFriendRequest(targetUserId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-profile', userId] });
      queryClient.invalidateQueries({ queryKey: ['friends'] });
      Alert.alert('Éxito', 'Solicitud enviada correctamente');
    },
    onError: () => {
      Alert.alert('Error', 'No se pudo enviar la solicitud');
    },
  });

  const handleChallengeUser = () => {
    if (!profileData?.data) return;
    
    Alert.alert(
      'Crear Reto',
      `¿Quieres retar a @${profileData.data.user.username}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Crear Reto',
          onPress: () => {
            router.push({
              pathname: '/challenges/create',
              params: { preSelectedFriend: userId },
            });
          },
        },
      ]
    );
  };

  if (profileLoading) {
    return (
      <View className="flex-1 bg-gray-50 items-center justify-center">
        <ActivityIndicator size="large" color="#10B981" />
      </View>
    );
  }
profileData?.data) {
    return (
      <View className="flex-1 bg-gray-50">
        <LinearGradient colors={['#10B981', '#059669']} className="px-6 pt-12 pb-6">
          <View className="flex-row items-center justify-between">
            <TouchableOpacity onPress={() => router.back()} className="p-2">
              <Ionicons name="arrow-back" size={28} color="white" />
            </TouchableOpacity>
            <Text className="text-2xl font-bold text-white">Perfil</Text>
            <View className="w-10" />
          </View>
        </LinearGradient>
        
        <View className="flex-1 items-center justify-center p-6">
          <Ionicons name="person-outline" size={64} color="#9CA3AF" />
          <Text className="text-gray-500 mt-4">Usuario no encontrado</Text>
        </View>
      </View>
    );
  }

  const profile = profileData.data;
  const user = profile.user;
  const stats = profile.stats;
  const recentWorkouts = profile.recentWorkouts;

  // Check friendship status
  const friends = friendsData?.data.friends || [];
  const isFriend = friends.some((f: any) => f._id === userId);
  const hasPendingRequest = false; // TODO: Check pending requests properly
  const hasPendingRequest = false; // TODO: Check pending requests

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <LinearGradient colors={['#10B981', '#059669']} className="px-6 pt-12 pb-6">
        <View className="flex-row items-center justify-between mb-6">
          <TouchableOpacity onPress={() => router.back()} className="p-2">
            <Ionicons name="arrow-back" size={28} color="white" />
          </TouchableOpacity>
          <Text className="text-2xl font-bold text-white">Perfil</Text>
          <View className="w-10" />
        </View>

        {/* User Info */}
        <View className="items-center">
          <View className="bg-white w-24 h-24 rounded-full items-center justify-center mb-4">
            <Text className="text-emerald-600 text-4xl font-bold">
              {user.username?.[0]?.toUpperCase() || 'U'}
            </Text>
          </View>
          <Text className="text-white text-2xl font-bold">@{user.username}</Text>
          <View className="bg-white/20 px-4 py-2 rounded-full mt-3">
            <Text className="text-white font-semibold">
              Nivel {Math.floor((user.xp || 0) / 100) + 1} • {user.xp || 0} XP
            </Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView className="flex-1" contentContainerClassName="p-6 gap-4">
        {/* Action Buttons */}
        <View className="flex-row gap-3">
          {!isFriend && !hasPendingRequest && (
            <Button
              onPress={() => sendFriendRequest.mutate(userId!)}
              variant="primary"
              className="flex-1"
            >
              <View className="flex-row items-center gap-2">
                <Ionicons name="person-add" size={20} color="white" />
                <Text className="text-white font-bold">Seguir</Text>
              </View>
            </Button>
          )}

          {hasPendingRequest && (
            <Button variant="secondary" className="flex-1" disabled>
              <Text className="text-gray-600 font-bold">Solicitud Enviada</Text>
            </Button>
          )}

          {isFriend && (
            <Button
              onPress={handleChallengeUser}
              className="flex-1 bg-red-500"
            >
              <View className="flex-row items-center gap-2">
                <Ionicons name="flash" size={20} color="white" />
                <Text className="text-white font-bold">Retar</Text>
              </View>
            </Button>
          )}
        </View>

        {/* Stats */}
        <Card clastats.workoutCount}
              </Text>
              <Text className="text-sm text-gray-600">Entrenamientos</Text>
            </View>

            <View className="flex-1 items-center bg-amber-50 py-4 rounded-xl">
              <Text className="text-3xl font-bold text-amber-600 mb-1">
                {user.streak}
              </Text>
              <Text className="text-sm text-gray-600">Días Racha</Text>
            </View>

            <View className="flex-1 items-center bg-blue-50 py-4 rounded-xl">
              <Text className="text-3xl font-bold text-blue-600 mb-1">
                {stats.achievementCount}
              </Text>
              <Text className="text-sm text-gray-600">Logros</Text>
            </View>
          </View>

          {/* Additional Stats */}
          <View className="mt-4 pt-4 border-t border-gray-200 gap-3">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center gap-2">
                <Ionicons name="trophy-outline" size={20} color="#6B7280" />
                <Text className="text-gray-700">Nivel</Text>
              </View>
              <Text className="text-gray-900 font-bold">
                {user.level}
              </Text>
            </View>

            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center gap-2">
                <Ionicons name="speedometer-outline" size={20} color="#6B7280" />
                <Text className="text-gray-700">Volumen Total</Text>
              </View>
              <Text className="text-gray-900 font-bold">
                {stats.totalVolume.toLocaleString()} kg
              </Text>
            </View>

            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center gap-2">
                <Ionicons name="trending-up-outline" size={20} color="#6B7280" />
                <Text className="text-gray-700">Records</Text>
              </View>
              <Text className="text-gray-900 font-bold">
                {stats.recordsCount}
              </Text>
            </Entrenamientos Recientes
            </Text>
          </View>

          {recentWorkouts.length === 0 ? (
            <View className="py-6 items-center">
              <Ionicons name="barbell-outline" size={48} color="#D1D5DB" />
              <Text className="text-gray-400 mt-2">Sin actividad reciente</Text>
            </View>
          ) : (
            <View className="gap-3">
              {recentWorkouts.map((workout) => (
                <View
                  key={workout._id}
                  className="bg-gray-50 p-3 rounded-lg"
                >
                  <Text className="text-gray-900 font-bold mb-1">
                    {workout.name}
                  </Text>
                  <Text className="text-gray-500 text-sm">
                    {format(new Date(workout.completedAt), "d 'de' MMMM", {
                      locale: es,
                    })} • {workout.exercises.length} ejercicio
                    {workout.exercises.length !== 1 ? 's' : ''}
                  </Text>
                </View>
              ))}
        </Card>

        {/* Recent Activity */}
        <Card className="p-6">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-lg font-bold text-gray-900">
              Actividad Reciente
            </Text>
            <TouchableOpacity>
              <Text className="text-emerald-600 font-semibold">Ver Todo</Text>
            </TouchableOpacity>
          </View>

          {workoutsData?.data.workouts.length === 0 ? (
            <View className="py-6 items-center">
              <Ionicons name="barbell-outline" size={48} color="#D1D5DB" />
              <Text className="text-gray-400 mt-2">Sin actividad reciente</Text>
            </View>
          ) : (
            <View className="gap-3">
              {/* TODO: Map user's recent workouts */}
              <Text className="text-gray-500 text-center py-4">
                Próximamente
              </Text>
            </View>
          )}
        </Card>

        {/* Achievements Preview */}
        {isFriend && (
          <Card className="p-6">
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-lg font-bold text-gray-900">Logros</Text>
              <TouchableOpacity>
                <Text className="text-emerald-600 font-semibold">Ver Todo</Text>
              </TouchableOpacity>
            </View>

            <View className="flex-row flex-wrap gap-3">
              {[1, 2, 3, 4].map((_, idx) => (
                <View
                  key={idx}
                  className="w-16 h-16 bg-gray-100 rounded-xl items-center justify-center"
                >
                  <Ionicons name="lock-closed" size={24} color="#D1D5DB" />
                </View>
              ))}
            </View>
          </Card>
        )}
      </ScrollView>
    </View>
  );
}
