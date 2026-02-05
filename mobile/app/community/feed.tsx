import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  Image,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Card } from '@/components/ui/Card';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

interface FeedItem {
  id: string;
  type: 'workout' | 'achievement' | 'record' | 'challenge';
  user: {
    _id: string;
    username: string;
    avatar: string;
  };
  timestamp: Date;
  data: any;
  likes: number;
  comments: number;
  isLiked: boolean;
}

// Mock data
const mockFeed: FeedItem[] = [
  {
    id: '1',
    type: 'workout',
    user: { _id: '1', username: 'FitnessKing', avatar: 'F' },
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    data: {
      name: 'DÃ­a de Pecho',
      exercises: 5,
      volume: 3200,
      duration: 65,
    },
    likes: 24,
    comments: 3,
    isLiked: false,
  },
  {
    id: '2',
    type: 'achievement',
    user: { _id: '2', username: 'IronWarrior', avatar: 'I' },
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    data: {
      name: 'Racha Semanal',
      icon: 'ðŸ”¥',
      tier: 'silver',
    },
    likes: 45,
    comments: 8,
    isLiked: true,
  },
  {
    id: '3',
    type: 'record',
    user: { _id: '3', username: 'MuscleQueen', avatar: 'M' },
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
    data: {
      exercise: 'Sentadilla',
      weight: 120,
      reps: 8,
      improvement: 10,
    },
    likes: 67,
    comments: 12,
    isLiked: true,
  },
  {
    id: '4',
    type: 'challenge',
    user: { _id: '4', username: 'BeastMode', avatar: 'B' },
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8),
    data: {
      name: 'Volumen Challenge',
      status: 'won',
      opponent: 'GymRat',
    },
    likes: 89,
    comments: 15,
    isLiked: false,
  },
  {
    id: '5',
    type: 'workout',
    user: { _id: '5', username: 'PowerLifter', avatar: 'P' },
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12),
    data: {
      name: 'Fuerza de Espalda',
      exercises: 6,
      volume: 4100,
      duration: 75,
    },
    likes: 34,
    comments: 5,
    isLiked: false,
  },
];

export default function CommunityFeedScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [feed, setFeed] = useState<FeedItem[]>(mockFeed);

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  const handleLike = (itemId: string) => {
    setFeed(feed.map(item => {
      if (item.id === itemId) {
        return {
          ...item,
          isLiked: !item.isLiked,
          likes: item.isLiked ? item.likes - 1 : item.likes + 1,
        };
      }
      return item;
    }));
  };

  const renderFeedItem = (item: FeedItem) => {
    const renderContent = () => {
      switch (item.type) {
        case 'workout':
          return (
            <View className="bg-emerald-50 p-4 rounded-xl mt-3">
              <View className="flex-row items-center gap-2 mb-2">
                <Ionicons name="barbell" size={20} color="#9D12DE" />
                <Text className="text-primary font-bold text-lg">
                  {item.data.name}
                </Text>
              </View>
              <View className="flex-row gap-4">
                <View>
                  <Text className="text-primary text-sm">Ejercicios</Text>
                  <Text className="text-primary font-bold">{item.data.exercises}</Text>
                </View>
                <View>
                  <Text className="text-primary text-sm">Volumen</Text>
                  <Text className="text-primary font-bold">{item.data.volume} kg</Text>
                </View>
                <View>
                  <Text className="text-primary text-sm">DuraciÃ³n</Text>
                  <Text className="text-primary font-bold">{item.data.duration}m</Text>
                </View>
              </View>
            </View>
          );

        case 'achievement':
          return (
            <View className="bg-amber-50 p-4 rounded-xl mt-3">
              <View className="flex-row items-center gap-3">
                <Text className="text-5xl">{item.data.icon}</Text>
                <View className="flex-1">
                  <Text className="text-amber-900 font-bold text-lg">
                    {item.data.name}
                  </Text>
                  <View className="bg-amber-200 px-3 py-1 rounded-full self-start mt-1">
                    <Text className="text-amber-900 text-xs font-semibold uppercase">
                      {item.data.tier}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          );

        case 'record':
          return (
            <View className="bg-purple-50 p-4 rounded-xl mt-3">
              <View className="flex-row items-center gap-2 mb-2">
                <Ionicons name="trending-up" size={20} color="#8B5CF6" />
                <Text className="text-purple-900 font-bold text-lg">
                  Â¡Nuevo RÃ©cord Personal!
                </Text>
              </View>
              <Text className="text-purple-800 text-base">
                <Text className="font-bold">{item.data.exercise}</Text>: {item.data.weight} kg Ã— {item.data.reps} reps
              </Text>
              <Text className="text-purple-600 text-sm mt-1">
                +{item.data.improvement} kg mÃ¡s que el rÃ©cord anterior
              </Text>
            </View>
          );

        case 'challenge':
          return (
            <View className="bg-red-50 p-4 rounded-xl mt-3">
              <View className="flex-row items-center gap-2 mb-2">
                <Ionicons name="trophy" size={20} color="#EF4444" />
                <Text className="text-red-900 font-bold text-lg">
                  {item.data.name}
                </Text>
              </View>
              <Text className="text-red-800">
                {item.data.status === 'won' ? 'ðŸ† Victoria' : 'En progreso'} contra{' '}
                <Text className="font-bold">{item.data.opponent}</Text>
              </Text>
            </View>
          );

        default:
          return null;
      }
    };

    return (
      <Card key={item.id} className="p-4 mb-4">
        {/* User Header */}
        <TouchableOpacity
          onPress={() => router.push(`/users/${item.user._id}`)}
          className="flex-row items-center gap-3 mb-3"
        >
          <View className="bg-primary w-12 h-12 rounded-full items-center justify-center">
            <Text className="text-white text-xl font-bold">
              {item.user.avatar}
            </Text>
          </View>
          <View className="flex-1">
            <Text className="text-gray-900 font-bold">{item.user.username}</Text>
            <Text className="text-gray-500 text-sm">
              {formatDistanceToNow(item.timestamp, { addSuffix: true, locale: es })}
            </Text>
          </View>
        </TouchableOpacity>

        {/* Content */}
        {renderContent()}

        {/* Actions */}
        <View className="flex-row items-center gap-6 mt-4 pt-3 border-t border-gray-200">
          <TouchableOpacity
            onPress={() => handleLike(item.id)}
            className="flex-row items-center gap-2"
          >
            <Ionicons
              name={item.isLiked ? 'heart' : 'heart-outline'}
              size={22}
              color={item.isLiked ? '#EF4444' : '#6B7280'}
            />
            <Text className={item.isLiked ? 'text-red-500 font-semibold' : 'text-gray-600'}>
              {item.likes}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center gap-2">
            <Ionicons name="chatbubble-outline" size={20} color="#6B7280" />
            <Text className="text-gray-600">{item.comments}</Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center gap-2 ml-auto">
            <Ionicons name="share-outline" size={20} color="#6B7280" />
          </TouchableOpacity>
        </View>
      </Card>
    );
  };

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <LinearGradient colors={['#9D12DE', '#7C3AED']} className="px-6 pt-12 pb-6">
        <View className="flex-row items-center justify-between">
          <TouchableOpacity onPress={() => router.back()} className="p-2">
            <Ionicons name="arrow-back" size={28} color="white" />
          </TouchableOpacity>
          <Text className="text-2xl font-bold text-white">Comunidad</Text>
          <View className="w-10" />
        </View>
      </LinearGradient>

      <ScrollView
        className="flex-1"
        contentContainerClassName="p-6"
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor="#9D12DE"
          />
        }
      >
        {feed.map(renderFeedItem)}
      </ScrollView>
    </View>
  );
}


