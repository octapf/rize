import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Card } from '@/components/ui/Card';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { notificationsApi, Notification } from '@/lib/api';
import { setBadgeCount } from '@/lib/notifications';

const mockNotifications: Notification[] = [
  {
    _id: '1',
    userId: 'me',
    type: 'friend_request',
    title: 'Nueva solicitud de amistad',
    body: 'Carlos GarcÃ­a quiere ser tu amigo',
    data: { userId: 'user1' },
    read: false,
    createdAt: new Date(2026, 0, 27, 11, 30).toISOString(),
  },
  {
    _id: '2',
    userId: 'me',
    type: 'workout_like',
    title: 'Le gustÃ³ tu entrenamiento',
    body: 'Ana LÃ³pez le dio like a tu workout "Push Day"',
    data: { workoutId: 'w1', userId: 'user2' },
    read: false,
    createdAt: new Date(2026, 0, 27, 10, 15).toISOString(),
  },
  {
    _id: '3',
    userId: 'me',
    type: 'comment',
    title: 'Nuevo comentario',
    body: 'Pedro comentÃ³ en tu publicaciÃ³n: "Â¡Excelente trabajo!"',
    data: { postId: 'p1', userId: 'user3' },
    read: false,
    createdAt: new Date(2026, 0, 27, 9, 45).toISOString(),
  },
  {
    _id: '4',
    userId: 'me',
    type: 'achievement',
    title: 'Â¡Nuevo logro desbloqueado!',
    body: 'Has completado 100 entrenamientos',
    data: { achievementId: 'a1' },
    read: true,
    createdAt: new Date(2026, 0, 26, 20, 0).toISOString(),
  },
  {
    _id: '5',
    userId: 'me',
    type: 'challenge',
    title: 'Nuevo desafÃ­o',
    body: 'MarÃ­a te retÃ³ a "30 dÃ­as de ejercicio"',
    data: { challengeId: 'ch1', userId: 'user4' },
    read: true,
    createdAt: new Date(2026, 0, 26, 15, 30).toISOString(),
  },
];

export default function NotificationsScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const queryClient = useQueryClient();

  // Use real API when ready
  const { data, isLoading } = useQuery({
    queryKey: ['notifications'],
    queryFn: () => notificationsApi.getNotifications(),
    enabled: false,
  });

  const notifications = data?.notifications || mockNotifications;
  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    // Update badge count
    setBadgeCount(unreadCount);
  }, [unreadCount]);

  const markAsReadMutation = useMutation({
    mutationFn: (id: string) => notificationsApi.markAsRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });

  const markAllAsReadMutation = useMutation({
    mutationFn: () => notificationsApi.markAllAsRead(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });

  const handleNotificationPress = (notification: Notification) => {
    // Mark as read
    if (!notification.read) {
      // markAsReadMutation.mutate(notification._id);
    }

    // Navigate based on type
    switch (notification.type) {
      case 'friend_request':
        router.push('/friends' as any);
        break;
      case 'workout_like':
      case 'comment':
        router.push('/social/feed');
        break;
      case 'achievement':
        router.push('/achievements');
        break;
      case 'challenge':
        router.push('/challenges');
        break;
      case 'message':
        if (notification.data?.userId) {
          router.push(`/chat/${notification.data.userId}` as any);
        }
        break;
    }
  };

  const handleMarkAllRead = () => {
    // markAllAsReadMutation.mutate();
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await queryClient.invalidateQueries({ queryKey: ['notifications'] });
    setRefreshing(false);
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'friend_request':
        return { name: 'person-add', color: '#9D12DE' };
      case 'workout_like':
        return { name: 'heart', color: '#EF4444' };
      case 'comment':
        return { name: 'chatbubble', color: '#9D12DE' };
      case 'achievement':
        return { name: 'trophy', color: '#FFEA00' };
      case 'challenge':
        return { name: 'flash', color: '#8B5CF6' };
      case 'message':
        return { name: 'mail', color: '#06B6D4' };
      default:
        return { name: 'notifications', color: '#6B7280' };
    }
  };

  const renderNotification = ({ item }: { item: Notification }) => {
    const icon = getNotificationIcon(item.type);

    return (
      <TouchableOpacity onPress={() => handleNotificationPress(item)}>
        <Card
          className={`p-4 mb-3 ${
            !item.read ? 'bg-primary/5 border-l-4 border-primary' : ''
          }`}
        >
          <View className="flex-row items-start gap-3">
            <View
              className="w-12 h-12 rounded-full items-center justify-center"
              style={{ backgroundColor: `${icon.color}20` }}
            >
              <Ionicons name={icon.name as any} size={24} color={icon.color} />
            </View>

            <View className="flex-1">
              <Text className={`text-base ${!item.read ? 'font-bold' : 'font-semibold'} text-gray-900`}>
                {item.title}
              </Text>
              <Text className="text-gray-600 text-sm mt-1">
                {item.body}
              </Text>
              <Text className="text-gray-500 text-xs mt-2">
                {formatDistanceToNow(new Date(item.createdAt), {
                  addSuffix: true,
                  locale: es,
                })}
              </Text>
            </View>

            {!item.read && (
              <View className="w-3 h-3 bg-primary rounded-full" />
            )}
          </View>
        </Card>
      </TouchableOpacity>
    );
  };

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <LinearGradient colors={['#9D12DE', '#7C3AED']} className="px-6 pt-12 pb-6">
        <View className="flex-row items-center justify-between mb-2">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={28} color="white" />
          </TouchableOpacity>
          <Text className="text-2xl font-bold text-white">Notificaciones</Text>
          {unreadCount > 0 && (
            <TouchableOpacity
              onPress={handleMarkAllRead}
              className="bg-white/20 px-3 py-1 rounded-full"
            >
              <Text className="text-white font-semibold text-sm">
                Marcar todas
              </Text>
            </TouchableOpacity>
          )}
          {unreadCount === 0 && <View style={{ width: 28 }} />}
        </View>

        {unreadCount > 0 && (
          <Text className="text-highlight text-center">
            {unreadCount} notificaciÃ³n{unreadCount !== 1 ? 'es' : ''} sin leer
          </Text>
        )}
      </LinearGradient>

      <FlatList
        data={notifications}
        renderItem={renderNotification}
        keyExtractor={(item) => item._id}
        contentContainerClassName="p-4"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View className="items-center py-12">
            <Ionicons name="notifications-off" size={64} color="#9CA3AF" />
            <Text className="text-gray-900 font-bold text-lg mt-4">
              No hay notificaciones
            </Text>
            <Text className="text-gray-600 text-center mt-2">
              Te notificaremos sobre actividad importante
            </Text>
          </View>
        }
      />
    </View>
  );
}

