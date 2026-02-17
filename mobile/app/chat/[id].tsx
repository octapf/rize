import React, { useState, useRef, useEffect } from 'react';
import { Text } from '@/components/ui/Text';
import { View, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform, Alert } from 'react-native';;
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: Date;
  read: boolean;
  type: 'text' | 'workout' | 'challenge';
  workoutId?: string;
  challengeId?: string;
}

const mockUser = {
  id: '1',
  name: 'Carlos García',
  avatar: 'C',
  isOnline: true,
  lastSeen: new Date(),
};

const mockMessages: Message[] = [
  {
    id: '1',
    senderId: '1',
    text: '¡Hola! ¿Cómo te fue en el gym hoy?',
    timestamp: new Date(2026, 0, 26, 10, 30),
    read: true,
    type: 'text',
  },
  {
    id: '2',
    senderId: 'me',
    text: '¡Muy bien! Hice un PR en bench press ðŸ’ª',
    timestamp: new Date(2026, 0, 26, 10, 32),
    read: true,
    type: 'text',
  },
  {
    id: '3',
    senderId: '1',
    text: '¡Felicidades! ¿Cuánto levantaste?',
    timestamp: new Date(2026, 0, 26, 10, 33),
    read: true,
    type: 'text',
  },
  {
    id: '4',
    senderId: 'me',
    text: '100kg x 5 reps, mi 1RM calculado es 112.5kg',
    timestamp: new Date(2026, 0, 26, 10, 35),
    read: true,
    type: 'text',
  },
  {
    id: '5',
    senderId: '1',
    text: '¡Increíble! ¿Vamos juntos mañana?',
    timestamp: new Date(2026, 0, 26, 10, 40),
    read: true,
    type: 'text',
  },
  {
    id: '6',
    senderId: 'me',
    text: 'Dale, a las 7am como siempre',
    timestamp: new Date(2026, 0, 26, 10, 42),
    read: true,
    type: 'text',
  },
  {
    id: '7',
    senderId: '1',
    text: 'Perfecto, te mando mi rutina de hoy',
    timestamp: new Date(2026, 0, 26, 14, 15),
    read: false,
    type: 'text',
  },
];

export default function ChatScreen() {
  const params = useLocalSearchParams();
  const userId = params.id as string;

  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [inputText, setInputText] = useState('');
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    // Mark messages as read
    setTimeout(() => {
      setMessages(prev => prev.map(m => ({ ...m, read: true })));
    }, 1000);
  }, []);

  const handleSend = () => {
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: 'me',
      text: inputText.trim(),
      timestamp: new Date(),
      read: true,
      type: 'text',
    };

    setMessages([...messages, newMessage]);
    setInputText('');

    // Scroll to bottom
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);

    // Simulate response
    setTimeout(() => {
      const response: Message = {
        id: (Date.now() + 1).toString(),
        senderId: userId,
        text: '¡Genial! ðŸ‘',
        timestamp: new Date(),
        read: false,
        type: 'text',
      };
      setMessages(prev => [...prev, response]);
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }, 2000);
  };

  const handleShareWorkout = () => {
    // Get last workout or let user select one
    router.push('/workouts/share/last' as any);
  };

  const handleSendChallenge = () => {
    Alert.alert('Enviar Desafío', 'Función en desarrollo');
  };

  const formatMessageTime = (date: Date) => {
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();

    if (isToday) {
      return format(date, 'HH:mm');
    }
    return format(date, "dd MMM 'a las' HH:mm", { locale: es });
  };

  const renderMessage = ({ item, index }: { item: Message; index: number }) => {
    const isMe = item.senderId === 'me';
    const prevMessage = index > 0 ? messages[index - 1] : null;
    const showAvatar = !prevMessage || prevMessage.senderId !== item.senderId;
    const showTime = !prevMessage || 
      new Date(item.timestamp).getTime() - new Date(prevMessage.timestamp).getTime() > 60000;

    return (
      <View className={`px-4 mb-2 ${isMe ? 'items-end' : 'items-start'}`}>
        {showTime && (
          <Text className="text-gray-500 text-xs mb-2 self-center">
            {formatMessageTime(item.timestamp)}
          </Text>
        )}

        <View className={`flex-row items-end gap-2 max-w-[80%] ${isMe ? 'flex-row-reverse' : ''}`}>
          {!isMe && (
            <View className="w-8 h-8">
              {showAvatar && (
                <View className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full items-center justify-center">
                  <Text className="text-white font-bold text-sm">
                    {mockUser.avatar}
                  </Text>
                </View>
              )}
            </View>
          )}

          <View>
            <View
              className={`px-4 py-3 rounded-2xl ${
                isMe
                  ? 'bg-primary rounded-br-sm'
                  : 'bg-gray-200 rounded-bl-sm'
              }`}
            >
              <Text className={`${isMe ? 'text-white' : 'text-gray-900'} text-base`}>
                {item.text}
              </Text>
            </View>

            {isMe && (
              <View className="flex-row items-center justify-end gap-1 mt-1">
                {item.read ? (
                  <Ionicons name="checkmark-done" size={14} color="#9D12DE" />
                ) : (
                  <Ionicons name="checkmark" size={14} color="#9CA3AF" />
                )}
              </View>
            )}
          </View>
        </View>
      </View>
    );
  };

  return (
    <View className="flex-1 bg-background">
      {/* Header */}
      <LinearGradient colors={['#9D12DE', '#7D0EBE']} className="px-4 pt-12 pb-4">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-3 flex-1">
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={28} color="white" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.push(`/users/${userId}` as any)}
              className="flex-row items-center gap-3 flex-1"
            >
              <View className="relative">
                <View className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full items-center justify-center">
                  <Text className="text-white font-bold text-lg">
                    {mockUser.avatar}
                  </Text>
                </View>
                {mockUser.isOnline && (
                  <View className="absolute bottom-0 right-0 w-3 h-3 bg-primary/100 border-2 border-blue-600 rounded-full" />
                )}
              </View>

              <View className="flex-1">
                <Text className="text-white font-bold text-lg">
                  {mockUser.name}
                </Text>
                <Text className="text-blue-100 text-xs">
                  {mockUser.isOnline ? 'En línea' : `Visto ${format(mockUser.lastSeen, 'HH:mm')}`}
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          <TouchableOpacity className="p-2">
            <Ionicons name="ellipsis-vertical" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Messages */}
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        contentContainerClassName="py-4"
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: false })}
      />

      {/* Quick Actions */}
      <View className="px-4 py-2 bg-white border-t border-gray-200">
        <View className="flex-row gap-2">
          <TouchableOpacity
            onPress={handleShareWorkout}
            className="bg-purple-100 px-4 py-2 rounded-lg flex-row items-center gap-2"
          >
            <Ionicons name="fitness" size={16} color="#8B5CF6" />
            <Text className="text-purple-700 font-semibold text-sm">
              Compartir Workout
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleSendChallenge}
            className="bg-red-100 px-4 py-2 rounded-lg flex-row items-center gap-2"
          >
            <Ionicons name="flash" size={16} color="#EF4444" />
            <Text className="text-red-700 font-semibold text-sm">
              Desafío
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Input */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <View className="px-4 py-3 bg-white border-t border-gray-200 flex-row items-center gap-3">
          <TouchableOpacity className="p-2">
            <Ionicons name="add-circle" size={28} color="#3B82F6" />
          </TouchableOpacity>

          <View className="flex-1 flex-row items-center bg-gray-100 rounded-full px-4 py-2">
            <TextInput
              value={inputText}
              onChangeText={setInputText}
              placeholder="Escribe un mensaje..."
              multiline
              maxLength={500}
              className="flex-1 text-gray-900 text-base max-h-24"
            />
            <TouchableOpacity className="p-1">
              <Ionicons name="happy-outline" size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={handleSend}
            disabled={!inputText.trim()}
            className={`p-2 rounded-full ${
              inputText.trim() ? 'bg-primary' : 'bg-gray-300'
            }`}
          >
            <Ionicons
              name="send"
              size={20}
              color="white"
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

