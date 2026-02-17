import React, { useState } from 'react';
import { Text } from '@/components/ui/Text';
import { View, ScrollView, RefreshControl, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';;
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useFeed, useLikeWorkout, useUnlikeWorkout, useFriends, usePendingRequests } from '@/hooks/useSocial';
import { useLeaderboard } from '@/hooks/useStats';
import { Card } from '@/components/ui/Card';

export default function SocialScreen() {
  const [activeTab, setActiveTab] = useState<'feed' | 'friends' | 'leaderboard'>('feed');
  const [refreshing, setRefreshing] = useState(false);

  const { data: feedData, isLoading: feedLoading, refetch: refetchFeed } = useFeed();
  const { data: friendsData } = useFriends();
  const { data: requestsData } = usePendingRequests();
  const { data: leaderboardData } = useLeaderboard(50);
  const likeWorkout = useLikeWorkout();
  const unlikeWorkout = useUnlikeWorkout();

  const onRefresh = async () => {
    setRefreshing(true);
    await refetchFeed();
    setRefreshing(false);
  };

  const handleLike = async (workoutId: string, isLiked: boolean) => {
    try {
      if (isLiked) {
        await unlikeWorkout.mutateAsync(workoutId);
      } else {
        await likeWorkout.mutateAsync(workoutId);
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo actualizar el like');
    }
  };

  const formatDate = (date: string) => {
    const d = new Date(date);
    const now = new Date();
    const diff = now.getTime() - d.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    if (hours < 24) return `Hace ${hours}h`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `Hace ${days}d`;
    return d.toLocaleDateString('es-ES', { day: '2-digit', month: 'short' });
  };

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <LinearGradient colors={['#9D12DE', '#7C3AED']} className="px-6 pt-12 pb-6">
        <Text className="text-3xl font-bold text-white mb-4">Social</Text>
        
        {/* Tabs */}
        <View className="flex-row gap-2">
          <TouchableOpacity
            onPress={() => setActiveTab('feed')}
            className={`flex-1 py-3 rounded-xl ${
              activeTab === 'feed' ? 'bg-white' : 'bg-white/20'
            }`}
          >
            <Text
              className={`text-center font-semibold ${
                activeTab === 'feed' ? 'text-primary' : 'text-white'
              }`}
            >
              Feed
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveTab('friends')}
            className={`flex-1 py-3 rounded-xl ${
              activeTab === 'friends' ? 'bg-white' : 'bg-white/20'
            }`}
          >
            <Text
              className={`text-center font-semibold ${
                activeTab === 'friends' ? 'text-primary' : 'text-white'
              }`}
            >
              Amigos
              {(requestsData?.data?.length || 0) > 0 && (
                <Text className="text-red-500"> ({requestsData?.data?.length})</Text>
              )}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveTab('leaderboard')}
            className={`flex-1 py-3 rounded-xl ${
              activeTab === 'leaderboard' ? 'bg-white' : 'bg-white/20'
            }`}
          >
            <Text
              className={`text-center font-semibold ${
                activeTab === 'leaderboard' ? 'text-primary' : 'text-white'
              }`}
            >
              Ranking
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Content */}
      {activeTab === 'feed' && (
        <ScrollView
          className="flex-1"
          contentContainerClassName="p-6 gap-4"
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {feedLoading && !feedData ? (
            <View className="py-20">
              <ActivityIndicator size="large" color="#9D12DE" />
            </View>
          ) : feedData?.data && feedData.data.length > 0 ? (
            feedData.data.map((workout) => (
              <Card key={workout._id} className="p-4">
                {/* User Info */}
                <View className="flex-row items-center gap-3 mb-3">
                  <View className="bg-primary/10 w-12 h-12 rounded-full items-center justify-center">
                    <Text className="text-primary font-bold text-lg">
                      {workout.userId.username[0].toUpperCase()}
                    </Text>
                  </View>
                  <View className="flex-1">
                    <Text className="font-bold text-gray-900">
                      {workout.userId.username}
                    </Text>
                    <Text className="text-xs text-gray-500">
                      {formatDate(workout.date)}
                    </Text>
                  </View>
                  <View className="bg-purple-100 px-3 py-1 rounded-full">
                    <Text className="text-purple-700 text-xs font-semibold">
                      Lvl {Math.floor(workout.userId.xp / 100) + 1}
                    </Text>
                  </View>
                </View>

                {/* Workout Content */}
                <Text className="text-lg font-bold text-gray-900 mb-2">
                  {workout.name}
                </Text>
                <View className="flex-row gap-4 mb-3">
                  <View className="flex-row items-center gap-1">
                    <Ionicons name="barbell" size={16} color="#6B7280" />
                    <Text className="text-sm text-gray-600">
                      {workout.exercises.length} ejercicios
                    </Text>
                  </View>
                  <View className="flex-row items-center gap-1">
                    <Ionicons name="flash" size={16} color="#6B7280" />
                    <Text className="text-sm text-gray-600">
                      {workout.xpEarned} XP
                    </Text>
                  </View>
                </View>

                {/* Actions */}
                <View className="flex-row items-center justify-between pt-3 border-t border-gray-200">
                  <TouchableOpacity
                    onPress={() => handleLike(workout._id, workout.isLikedByUser)}
                    className="flex-row items-center gap-2"
                  >
                    <Ionicons
                      name={workout.isLikedByUser ? 'heart' : 'heart-outline'}
                      size={24}
                      color={workout.isLikedByUser ? '#EF4444' : '#6B7280'}
                    />
                    <Text className="text-sm text-gray-600">
                      {workout.likesCount}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity className="flex-row items-center gap-2">
                    <Ionicons name="chatbubble-outline" size={22} color="#6B7280" />
                    <Text className="text-sm text-gray-600">
                      {workout.commentsCount}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Ionicons name="share-outline" size={22} color="#6B7280" />
                  </TouchableOpacity>
                </View>
              </Card>
            ))
          ) : (
            <Card className="p-8 items-center">
              <Ionicons name="people-outline" size={48} color="#9CA3AF" />
              <Text className="text-gray-500 mt-4 text-center">
                No hay entrenamientos recientes{'\n'}Agrega amigos para ver su actividad
              </Text>
            </Card>
          )}
        </ScrollView>
      )}

      {activeTab === 'friends' && (
        <ScrollView className="flex-1" contentContainerClassName="p-6 gap-4">
          {/* Pending Requests */}
          {requestsData?.data && requestsData.data.length > 0 && (
            <View>
              <Text className="text-lg font-bold text-gray-900 mb-3">
                Solicitudes Pendientes
              </Text>
              {requestsData.data.map((request) => (
                <Card key={request.requestId} className="p-4 mb-3">
                  <View className="flex-row items-center justify-between">
                    <View className="flex-row items-center gap-3">
                      <View className="bg-primary/10 w-12 h-12 rounded-full items-center justify-center">
                        <Text className="text-primary font-bold text-lg">
                          {request.user.username[0].toUpperCase()}
                        </Text>
                      </View>
                      <View>
                        <Text className="font-bold text-gray-900">
                          {request.user.username}
                        </Text>
                        <Text className="text-xs text-gray-500">
                          {request.user.xp} XP
                        </Text>
                      </View>
                    </View>
                    <View className="flex-row gap-2">
                      <TouchableOpacity className="bg-primary px-4 py-2 rounded-lg">
                        <Text className="text-white font-semibold">Aceptar</Text>
                      </TouchableOpacity>
                      <TouchableOpacity className="bg-gray-200 px-4 py-2 rounded-lg">
                        <Text className="text-gray-700 font-semibold">Rechazar</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </Card>
              ))}
            </View>
          )}

          {/* Friends List */}
          <Text className="text-lg font-bold text-gray-900 mb-3">
            Mis Amigos ({friendsData?.data?.length || 0})
          </Text>
          {friendsData?.data && friendsData.data.length > 0 ? (
            friendsData.data.map((friend) => (
              <Card key={friend.friendshipId} className="p-4 mb-3">
                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center gap-3">
                    <View className="bg-primary/10 w-12 h-12 rounded-full items-center justify-center">
                      <Text className="text-primary font-bold text-lg">
                        {friend.username[0].toUpperCase()}
                      </Text>
                    </View>
                    <View>
                      <Text className="font-bold text-gray-900">
                        {friend.username}
                      </Text>
                      <Text className="text-xs text-gray-500">
                        Nivel {Math.floor(friend.xp / 100) + 1} • {friend.xp} XP
                      </Text>
                    </View>
                  </View>
                </View>
              </Card>
            ))
          ) : (
            <Card className="p-8 items-center">
              <Ionicons name="person-add-outline" size={48} color="#9CA3AF" />
              <Text className="text-gray-500 mt-4 text-center">
                Aún no tienes amigos{'\n'}Busca usuarios para agregar
              </Text>
            </Card>
          )}
        </ScrollView>
      )}

      {activeTab === 'leaderboard' && (
        <ScrollView className="flex-1" contentContainerClassName="p-6 gap-3">
          <Text className="text-lg font-bold text-gray-900 mb-3">
            Top 50 Atletas
          </Text>
          {leaderboardData?.data?.map((entry, index) => (
            <Card
              key={entry.userId}
              className={`p-4 ${index < 3 ? 'bg-gradient-to-r from-yellow-50 to-orange-50' : ''}`}
            >
              <View className="flex-row items-center gap-3">
                <View
                  className={`w-10 h-10 rounded-full items-center justify-center ${
                    index === 0
                      ? 'bg-highlight'
                      : index === 1
                      ? 'bg-gray-300'
                      : index === 2
                      ? 'bg-orange-400'
                      : 'bg-gray-200'
                  }`}
                >
                  <Text className="font-bold text-white">#{entry.rank}</Text>
                </View>
                <View className="flex-1">
                  <Text className="font-bold text-gray-900">
                    {entry.username}
                  </Text>
                  <Text className="text-xs text-gray-500">
                    {entry.totalWorkouts} entrenamientos
                  </Text>
                </View>
                <View className="items-end">
                  <Text className="font-bold text-purple-600 text-lg">
                    Lvl {entry.level}
                  </Text>
                  <Text className="text-xs text-gray-500">{entry.xp} XP</Text>
                </View>
              </View>
            </Card>
          ))}
        </ScrollView>
      )}
    </View>
  );
}


