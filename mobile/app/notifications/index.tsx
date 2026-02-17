import React, { useState } from 'react';
import { Text } from '@/components/ui/Text';
import { View, ScrollView, TouchableOpacity, RefreshControl, ActivityIndicator } from 'react-native';;
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { notificationsApi, Notification } from '@/services/api/notifications.api';
import { Card } from '@/components/ui/Card';
import Animated, { FadeInDown } from 'react-native-reanimated';

const AnimatedCard = Animated.createAnimatedComponent(Card);

export default function NotificationsScreen() {
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const { data, isLoading, refetch, isRefetching } = useQuery({
    queryKey: ['notifications', filter],
    queryFn: () => notificationsApi.getNotifications({
      read: filter === 'unread' ? false : undefined,
      limit: 50,
    }),
  });

  const markAsReadMutation = useMutation({
    mutationFn: notificationsApi.markAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      queryClient.invalidateQueries({ queryKey: ['notifications-unread-count'] });
    },
  });

  const markAllAsReadMutation = useMutation({
    mutationFn: notificationsApi.markAllAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      queryClient.invalidateQueries({ queryKey: ['notifications-unread-count'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: notificationsApi.deleteNotification,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      queryClient.invalidateQueries({ queryKey: ['notifications-unread-count'] });
    },
  });

  const handleNotificationPress = (notification: Notification) => {
    if (!notification.read) {
      markAsReadMutation.mutate(notification._id);
    }

    // Navigate to action URL if exists
    if (notification.actionUrl) {
      router.push(notification.actionUrl as any);
    }
  };

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'achievement':
        return { name: 'trophy' as const, color: '#FFEA00' };
      case 'record':
        return { name: 'trending-up' as const, color: '#9D12DE' };
      case 'challenge':
        return { name: 'flash' as const, color: '#ef4444' };
      case 'social':
        return { name: 'people' as const, color: '#9D12DE' };
      case 'reminder':
        return { name: 'time' as const, color: '#8b5cf6' };
      case 'system':
        return { name: 'information-circle' as const, color: '#6b7280' };
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Ahora';
    if (diffMins < 60) return `Hace ${diffMins}m`;
    if (diffHours < 24) return `Hace ${diffHours}h`;
    if (diffDays < 7) return `Hace ${diffDays}d`;
    return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
  };

  const notifications = data?.data || [];
  const unreadCount = data?.meta.unreadCount || 0;

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <LinearGradient colors={['#9D12DE', '#7C3AED']} className="px-6 pt-12 pb-6">
        <View className="flex-row items-center justify-between mb-4">
          <TouchableOpacity onPress={() => router.back()} className="p-2">
            <Ionicons name="arrow-back" size={28} color="white" />
          </TouchableOpacity>
          <Text className="text-2xl font-bold text-white">Notificaciones</Text>
          {unreadCount > 0 && (
            <TouchableOpacity
              onPress={() => markAllAsReadMutation.mutate()}
              disabled={markAllAsReadMutation.isPending}
              className="px-3 py-1.5 bg-white/20 rounded-full"
            >
              <Text className="text-white text-xs font-semibold">
                Marcar todas
              </Text>
            </TouchableOpacity>
          )}
          {unreadCount === 0 && <View className="w-20" />}
        </View>

        {/* Unread Count */}
        {unreadCount > 0 && (
          <View className="bg-white/10 rounded-lg p-3">
            <Text className="text-white text-sm text-center">
              Tienes <Text className="font-bold">{unreadCount}</Text> notificación{unreadCount !== 1 ? 'es' : ''} sin leer
            </Text>
          </View>
        )}
      </LinearGradient>

      {/* Filter Tabs */}
      <View className="flex-row bg-white border-b border-gray-200 px-6 py-3">
        <TouchableOpacity
          onPress={() => setFilter('all')}
          className={`flex-1 py-2 border-b-2 ${
            filter === 'all' ? 'border-primary' : 'border-transparent'
          }`}
        >
          <Text
            className={`text-center font-semibold ${
              filter === 'all' ? 'text-primary' : 'text-gray-500'
            }`}
          >
            Todas
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setFilter('unread')}
          className={`flex-1 py-2 border-b-2 ${
            filter === 'unread' ? 'border-primary' : 'border-transparent'
          }`}
        >
          <Text
            className={`text-center font-semibold ${
              filter === 'unread' ? 'text-primary' : 'text-gray-500'
            }`}
          >
            No leídas {unreadCount > 0 && `(${unreadCount})`}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Notifications List */}
      <ScrollView
        className="flex-1"
        contentContainerClassName="p-6 gap-3"
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
        }
      >
        {isLoading && (
          <View className="items-center justify-center py-12">
            <ActivityIndicator size="large" color="#9D12DE" />
          </View>
        )}

        {!isLoading && notifications.length === 0 && (
          <View className="items-center justify-center py-12">
            <Ionicons name="notifications-off-outline" size={64} color="#D1D5DB" />
            <Text className="text-gray-500 text-lg mt-4">
              {filter === 'unread' ? 'No tienes notificaciones sin leer' : 'No tienes notificaciones'}
            </Text>
          </View>
        )}

        {notifications.map((notification, index) => {
          const icon = getNotificationIcon(notification.type);

          return (
            <AnimatedCard
              key={notification._id}
              entering={FadeInDown.delay(index * 50)}
              className={`p-4 ${!notification.read ? 'bg-primary/10 border-l-4 border-primary' : ''}`}
            >
              <TouchableOpacity
                onPress={() => handleNotificationPress(notification)}
                className="flex-row gap-3"
              >
                {/* Icon */}
                <View
                  className="w-12 h-12 rounded-full items-center justify-center"
                  style={{ backgroundColor: `${icon.color}20` }}
                >
                  <Ionicons name={icon.name} size={24} color={icon.color} />
                </View>

                {/* Content */}
                <View className="flex-1">
                  <View className="flex-row items-start justify-between mb-1">
                    <Text className="text-base font-bold text-gray-900 flex-1">
                      {notification.title}
                    </Text>
                    {!notification.read && (
                      <View className="w-2 h-2 bg-primary rounded-full ml-2 mt-1.5" />
                    )}
                  </View>
                  <Text className="text-sm text-gray-600 mb-2">
                    {notification.body}
                  </Text>
                  <View className="flex-row items-center justify-between">
                    <Text className="text-xs text-gray-400">
                      {formatTime(notification.createdAt)}
                    </Text>
                    <TouchableOpacity
                      onPress={() => handleDelete(notification._id)}
                      className="p-1"
                    >
                      <Ionicons name="trash-outline" size={18} color="#9CA3AF" />
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            </AnimatedCard>
          );
        })}
      </ScrollView>
    </View>
  );
}

