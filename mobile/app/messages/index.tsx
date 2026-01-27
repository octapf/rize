import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Card } from '@/components/ui/Card';

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: Date;
  read: boolean;
}

interface Conversation {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  lastMessage: string;
  timestamp: Date;
  unreadCount: number;
  isOnline: boolean;
}

const mockConversations: Conversation[] = [
  {
    id: '1',
    userId: '1',
    userName: 'Carlos García',
    userAvatar: 'C',
    lastMessage: '¡Excelente entrenamiento hoy! 💪',
    timestamp: new Date(2026, 0, 26, 14, 30),
    unreadCount: 2,
    isOnline: true,
  },
  {
    id: '2',
    userId: '2',
    userName: 'María López',
    userAvatar: 'M',
    lastMessage: '¿Vamos al gym mañana?',
    timestamp: new Date(2026, 0, 26, 10, 15),
    unreadCount: 0,
    isOnline: true,
  },
  {
    id: '3',
    userId: '3',
    userName: 'Juan Pérez',
    userAvatar: 'J',
    lastMessage: 'Gracias por los consejos',
    timestamp: new Date(2026, 0, 25, 18, 45),
    unreadCount: 0,
    isOnline: false,
  },
];

export default function MessagesScreen() {
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);

  const totalUnread = conversations.reduce((sum, c) => sum + c.unreadCount, 0);

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Ahora';
    if (minutes < 60) return `${minutes}m`;
    if (hours < 24) return `${hours}h`;
    if (days < 7) return `${days}d`;
    return date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit' });
  };

  const handleConversationPress = (conversation: Conversation) => {
    router.push(`/chat/${conversation.userId}` as any);
  };

  const handleDeleteConversation = (conversationId: string) => {
    Alert.alert(
      'Eliminar Conversación',
      '¿Estás seguro? No podrás recuperar los mensajes.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => setConversations(conversations.filter(c => c.id !== conversationId))
        }
      ]
    );
  };

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <LinearGradient colors={['#3B82F6', '#2563EB']} className="px-6 pt-12 pb-6">
        <View className="flex-row items-center justify-between mb-4">
          <TouchableOpacity onPress={() => router.back()} className="p-2">
            <Ionicons name="arrow-back" size={28} color="white" />
          </TouchableOpacity>
          <Text className="text-2xl font-bold text-white">Mensajes</Text>
          <TouchableOpacity className="p-2">
            <Ionicons name="create-outline" size={28} color="white" />
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View className="flex-row gap-3">
          <Card className="flex-1 p-3 bg-white/20 border-0">
            <Text className="text-white/80 text-xs mb-1">Conversaciones</Text>
            <Text className="text-white text-2xl font-bold">{conversations.length}</Text>
          </Card>
          <Card className="flex-1 p-3 bg-white/20 border-0">
            <Text className="text-white/80 text-xs mb-1">Sin Leer</Text>
            <Text className="text-white text-2xl font-bold">{totalUnread}</Text>
          </Card>
        </View>
      </LinearGradient>

      <ScrollView className="flex-1">
        {conversations.length === 0 ? (
          <Card className="m-6 p-8 items-center">
            <Ionicons name="chatbubbles-outline" size={64} color="#D1D5DB" />
            <Text className="text-gray-900 text-xl font-bold mt-4 text-center">
              No hay conversaciones
            </Text>
            <Text className="text-gray-600 text-center mt-2">
              Inicia una conversación con tus amigos
            </Text>
          </Card>
        ) : (
          <View className="gap-0">
            {conversations.map((conversation, index) => (
              <TouchableOpacity
                key={conversation.id}
                onPress={() => handleConversationPress(conversation)}
                activeOpacity={0.7}
                className={`${index > 0 ? 'border-t border-gray-200' : ''}`}
              >
                <View className="flex-row items-center gap-3 p-4 bg-white">
                  {/* Avatar */}
                  <View className="relative">
                    <View className="w-14 h-14 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full items-center justify-center">
                      <Text className="text-white font-bold text-xl">
                        {conversation.userAvatar}
                      </Text>
                    </View>
                    {conversation.isOnline && (
                      <View className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full" />
                    )}
                    {conversation.unreadCount > 0 && (
                      <View className="absolute -top-1 -right-1 bg-red-500 rounded-full min-w-[20px] h-5 items-center justify-center px-1">
                        <Text className="text-white text-xs font-bold">
                          {conversation.unreadCount}
                        </Text>
                      </View>
                    )}
                  </View>

                  {/* Content */}
                  <View className="flex-1">
                    <View className="flex-row items-center justify-between mb-1">
                      <Text className="text-gray-900 font-bold text-base">
                        {conversation.userName}
                      </Text>
                      <Text className="text-gray-500 text-xs">
                        {formatTimestamp(conversation.timestamp)}
                      </Text>
                    </View>
                    <Text
                      className={`text-sm ${
                        conversation.unreadCount > 0 ? 'text-gray-900 font-semibold' : 'text-gray-600'
                      }`}
                      numberOfLines={1}
                    >
                      {conversation.lastMessage}
                    </Text>
                  </View>

                  {/* Actions */}
                  <TouchableOpacity
                    onPress={() => handleDeleteConversation(conversation.id)}
                    className="p-2"
                  >
                    <Ionicons name="trash-outline" size={20} color="#EF4444" />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}
