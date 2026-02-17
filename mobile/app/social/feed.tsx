import React, { useState } from 'react';
import { Text } from '@/components/ui/Text';
import { View, TouchableOpacity, FlatList, Image, TextInput, RefreshControl, Alert } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Card } from '@/components/ui/Card';
import { format, formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { socialApi, FeedPost } from '@/lib/api';

const mockPosts: FeedPost[] = [
  {
    _id: '1',
    userId: 'user1',
    user: {
      _id: 'user1',
      name: 'Carlos García',
      username: 'carlosg',
      avatar: undefined,
    },
    type: 'workout',
    content: '¡Terminé mi rutina de piernas! 💪 Nuevo PR en sentadillas',
    workoutId: 'w1',
    likes: ['me', 'user2'],
    comments: [
      {
        _id: 'c1',
        userId: 'user2',
        user: { _id: 'user2', name: 'Ana López', username: 'ana', avatar: undefined },
        text: '¡Felicidades! 🎉',
        createdAt: new Date(2026, 0, 27, 10, 35).toISOString(),
      },
    ],
    createdAt: new Date(2026, 0, 27, 10, 30).toISOString(),
  },
  {
    _id: '2',
    userId: 'user2',
    user: {
      _id: 'user2',
      name: 'Ana López',
      username: 'ana',
      avatar: undefined,
    },
    type: 'achievement',
    content: '¡Desbloqueé el logro "100 Workouts"! 🏆',
    achievementId: 'a1',
    likes: ['user1', 'user3'],
    comments: [],
    createdAt: new Date(2026, 0, 27, 9, 15).toISOString(),
  },
  {
    _id: '3',
    userId: 'user3',
    user: {
      _id: 'user3',
      name: 'Pedro Martínez',
      username: 'pedro',
      avatar: undefined,
    },
    type: 'pr',
    content: 'Nuevo PR en Bench Press: 120kg! 🔥',
    exerciseId: 'e1',
    likes: ['me'],
    comments: [],
    createdAt: new Date(2026, 0, 26, 18, 45).toISOString(),
  },
];

export default function FeedScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [activeCommentPost, setActiveCommentPost] = useState<string | null>(null);
  const queryClient = useQueryClient();

  // Use real API when ready
  const { data, isLoading } = useQuery({
    queryKey: ['feed'],
    queryFn: () => socialApi.getFeed(),
    // Use mock data for now
    enabled: false,
  });

  const posts = data?.posts || mockPosts;

  const likeMutation = useMutation({
    mutationFn: (postId: string) => socialApi.likePost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feed'] });
    },
  });

  const commentMutation = useMutation({
    mutationFn: ({ postId, text }: { postId: string; text: string }) =>
      socialApi.addComment(postId, text),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feed'] });
      setCommentText('');
      setActiveCommentPost(null);
    },
  });

  const handleLike = (postId: string) => {
    // Mock toggle for now
    Alert.alert('Like', 'Función en desarrollo');
  };

  const handleComment = (postId: string) => {
    if (!commentText.trim()) return;
    // commentMutation.mutate({ postId, text: commentText });
    Alert.alert('Comentar', 'Función en desarrollo');
    setCommentText('');
    setActiveCommentPost(null);
  };

  const handleShare = (postId: string) => {
    Alert.alert('Compartir', 'Función en desarrollo');
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await queryClient.invalidateQueries({ queryKey: ['feed'] });
    setRefreshing(false);
  };

  const getPostIcon = (type: string) => {
    switch (type) {
      case 'workout':
        return { name: 'fitness', color: '#9D12DE' };
      case 'achievement':
        return { name: 'trophy', color: '#FFEA00' };
      case 'pr':
        return { name: 'trending-up', color: '#EF4444' };
      case 'challenge':
        return { name: 'flash', color: '#8B5CF6' };
      default:
        return { name: 'chatbubble', color: '#6B7280' };
    }
  };

  const renderPost = ({ item }: { item: FeedPost }) => {
    const icon = getPostIcon(item.type);
    const isLiked = item.likes.includes('me');
    const showComments = activeCommentPost === item._id;

    return (
      <Card className="p-4 mb-4">
        {/* Header */}
        <TouchableOpacity
          onPress={() => router.push(`/users/${item.userId}` as any)}
          className="flex-row items-center gap-3 mb-3"
        >
          <View className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full items-center justify-center">
            <Text className="text-white font-bold text-lg">
              {item.user.name[0]}
            </Text>
          </View>

          <View className="flex-1">
            <Text className="text-gray-900 font-bold text-base">
              {item.user.name}
            </Text>
            <Text className="text-gray-500 text-sm">
              @{item.user.username} • {formatDistanceToNow(new Date(item.createdAt), { 
                addSuffix: true, 
                locale: es 
              })}
            </Text>
          </View>

          <View
            className="p-2 rounded-full"
            style={{ backgroundColor: `${icon.color}20` }}
          >
            <Ionicons name={icon.name as any} size={20} color={icon.color} />
          </View>
        </TouchableOpacity>

        {/* Content */}
        <Text className="text-gray-900 text-base mb-3">
          {item.content}
        </Text>

        {/* Actions */}
        <View className="flex-row items-center gap-6 pt-3 border-t border-gray-200">
          <TouchableOpacity
            onPress={() => handleLike(item._id)}
            className="flex-row items-center gap-2"
          >
            <Ionicons
              name={isLiked ? 'heart' : 'heart-outline'}
              size={24}
              color={isLiked ? '#EF4444' : '#6B7280'}
            />
            <Text className={`font-semibold ${isLiked ? 'text-red-500' : 'text-gray-600'}`}>
              {item.likes.length}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setActiveCommentPost(showComments ? null : item._id)}
            className="flex-row items-center gap-2"
          >
            <Ionicons name="chatbubble-outline" size={22} color="#6B7280" />
            <Text className="text-gray-600 font-semibold">
              {item.comments.length}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleShare(item._id)}
            className="flex-row items-center gap-2"
          >
            <Ionicons name="share-outline" size={22} color="#6B7280" />
          </TouchableOpacity>
        </View>

        {/* Comments */}
        {item.comments.length > 0 && (
          <View className="mt-3 pt-3 border-t border-gray-200">
            {item.comments.map((comment) => (
              <View key={comment._id} className="flex-row gap-2 mb-2">
                <View className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full items-center justify-center">
                  <Text className="text-white font-bold text-xs">
                    {comment.user.name[0]}
                  </Text>
                </View>
                <View className="flex-1">
                  <Text className="text-gray-900 text-sm">
                    <Text className="font-bold">{comment.user.name}</Text>{' '}
                    {comment.text}
                  </Text>
                  <Text className="text-gray-500 text-xs mt-1">
                    {formatDistanceToNow(new Date(comment.createdAt), { 
                      addSuffix: true, 
                      locale: es 
                    })}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Comment Input */}
        {showComments && (
          <View className="mt-3 pt-3 border-t border-gray-200 flex-row items-center gap-2">
            <TextInput
              value={commentText}
              onChangeText={setCommentText}
              placeholder="Escribe un comentario..."
              className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-gray-900"
            />
            <TouchableOpacity
              onPress={() => handleComment(item._id)}
              disabled={!commentText.trim()}
              className={`p-2 rounded-full ${
                commentText.trim() ? 'bg-primary' : 'bg-gray-300'
              }`}
            >
              <Ionicons name="send" size={18} color="white" />
            </TouchableOpacity>
          </View>
        )}
      </Card>
    );
  };

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <LinearGradient colors={['#9D12DE', '#7C3AED']} className="px-6 pt-12 pb-6">
        <View className="flex-row items-center justify-between">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={28} color="white" />
          </TouchableOpacity>
          <Text className="text-2xl font-bold text-white">Feed Social</Text>
          <TouchableOpacity>
            <Ionicons name="add-circle" size={28} color="white" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={(item) => item._id}
        contentContainerClassName="p-4"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View className="items-center py-12">
            <Ionicons name="people" size={64} color="#9CA3AF" />
            <Text className="text-gray-900 font-bold text-lg mt-4">
              No hay publicaciones
            </Text>
            <Text className="text-gray-600 text-center mt-2">
              Sigue a más amigos para ver su actividad
            </Text>
          </View>
        }
      />
    </View>
  );
}

