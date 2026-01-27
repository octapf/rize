import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '@/stores/authStore';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { notificationsApi } from '@/services/api/notifications.api';

export default function ProfileScreen() {
  const { user, logout } = useAuthStore();

  const { data: unreadData } = useQuery({
    queryKey: ['notifications-unread-count'],
    queryFn: notificationsApi.getUnreadCount,
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  const unreadCount = unreadData?.data.count || 0;

  const handleLogout = () => {
    logout();
    router.replace('/login');
  };

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <LinearGradient colors={['#10B981', '#059669']} className="px-6 pt-12 pb-6">
        <View className="flex-row items-center justify-between mb-4">
          <View className="w-10" />
          <Text className="text-white text-xl font-bold">Perfil</Text>
          <TouchableOpacity
            onPress={() => router.push('/settings')}
            className="bg-white/20 p-2 rounded-lg"
          >
            <Ionicons name="settings-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>
        
        <View className="items-center">
          <View className="bg-white w-24 h-24 rounded-full items-center justify-center mb-4">
            <Text className="text-emerald-600 text-4xl font-bold">
              {user?.username?.[0]?.toUpperCase() || 'U'}
            </Text>
          </View>
          <Text className="text-white text-2xl font-bold">{user?.username}</Text>
          <Text className="text-emerald-100">{user?.email}</Text>
          <View className="bg-white/20 px-4 py-2 rounded-full mt-3">
            <Text className="text-white font-semibold">
              Nivel {Math.floor((user?.xp || 0) / 100) + 1} • {user?.xp || 0} XP
            </Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView className="flex-1" contentContainerClassName="p-6 gap-4">
        {/* Notifications Button */}
        <TouchableOpacity onPress={() => router.push('/notifications')}>
          <Card className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50">
            <View className="flex-row items-center gap-4">
              <View className="bg-blue-500 w-12 h-12 rounded-xl items-center justify-center relative">
                <Ionicons name="notifications" size={28} color="white" />
                {unreadCount > 0 && (
                  <View className="absolute -top-1 -right-1 bg-red-500 rounded-full min-w-[20px] h-5 items-center justify-center px-1">
                    <Text className="text-white text-xs font-bold">
                      {unreadCount > 99 ? '99+' : unreadCount}
                    </Text>
                  </View>
                )}
              </View>
              <View className="flex-1">
                <Text className="text-lg font-bold text-gray-900">
                  Notificaciones
                </Text>
                <Text className="text-sm text-gray-600">
                  {unreadCount > 0 ? `${unreadCount} sin leer` : 'Sin notificaciones nuevas'}
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color="#9CA3AF" />
            </View>
          </Card>
        </TouchableOpacity>

        {/* Challenges Button */}
        <TouchableOpacity onPress={() => router.push('/challenges')}>
          <Card className="p-4 bg-gradient-to-r from-red-50 to-orange-50">
            <View className="flex-row items-center gap-4">
              <View className="bg-red-500 w-12 h-12 rounded-xl items-center justify-center">
                <Ionicons name="flash" size={28} color="white" />
              </View>
              <View className="flex-1">
                <Text className="text-lg font-bold text-gray-900">
                  Mis Retos
                </Text>
                <Text className="text-sm text-gray-600">
                  Desafía a tus amigos
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color="#9CA3AF" />
            </View>
          </Card>
        </TouchableOpacity>

        {/* Achievements Button */}
        <TouchableOpacity onPress={() => router.push('/achievements')}>
          <Card className="p-4 bg-gradient-to-r from-purple-50 to-pink-50">
            <View className="flex-row items-center gap-4">
              <View className="bg-purple-500 w-12 h-12 rounded-xl items-center justify-center">
                <Ionicons name="trophy" size={28} color="white" />
              </View>
              <View className="flex-1">
                <Text className="text-lg font-bold text-gray-900">
                  Mis Logros
                </Text>
                <Text className="text-sm text-gray-600">
                  Ver todos tus logros y progreso
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color="#9CA3AF" />
            </View>
          </Card>
        </TouchableOpacity>

        {/* Settings Section */}
        <Card className="p-4">
          <Text className="text-lg font-bold text-gray-900 mb-4">
            Configuración
          </Text>

          <TouchableOpacity className="flex-row items-center justify-between py-3 border-b border-gray-200">
            <View className="flex-row items-center gap-3">
              <Ionicons name="person-outline" size={24} color="#6B7280" />
              <Text className="text-gray-900">Editar Perfil</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push('/notifications')}
            className="flex-row items-center justify-between py-3 border-b border-gray-200"
          >
            <View className="flex-row items-center gap-3">
              <Ionicons name="notifications-outline" size={24} color="#6B7280" />
              <Text className="text-gray-900">Configurar Notificaciones</Text>
            </View>
            <View className="flex-row items-center gap-2">
              {unreadCount > 0 && (
                <View className="bg-red-500 rounded-full min-w-[20px] h-5 items-center justify-center px-1.5">
                  <Text className="text-white text-xs font-bold">
                    {unreadCount > 99 ? '99+' : unreadCount}
                  </Text>
                </View>
              )}
              <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center justify-between py-3 border-b border-gray-200">
            <View className="flex-row items-center gap-3">
              <Ionicons name="shield-outline" size={24} color="#6B7280" />
              <Text className="text-gray-900">Privacidad</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center justify-between py-3">
            <View className="flex-row items-center gap-3">
              <Ionicons name="help-circle-outline" size={24} color="#6B7280" />
              <Text className="text-gray-900">Ayuda y Soporte</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>
        </Card>

        {/* Logout Button */}
        <Button variant="secondary" onPress={handleLogout}>
          Cerrar Sesión
        </Button>
      </ScrollView>
    </View>
  );
}
