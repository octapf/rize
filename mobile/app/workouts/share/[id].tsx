import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Card } from '@/components/ui/Card';

export default function ShareWorkoutScreen() {
  const params = useLocalSearchParams();
  const workoutId = params.id as string;

  const [message, setMessage] = useState('');
  const [selectedFriends, setSelectedFriends] = useState<string[]>([]);
  const [shareToFeed, setShareToFeed] = useState(true);

  const mockWorkout = {
    id: workoutId,
    name: 'Push Day - Pecho y Tríceps',
    duration: 62,
    exercises: 6,
    volume: 5420,
    date: new Date(),
  };

  const mockFriends = [
    { id: '1', name: 'Carlos García', username: 'carlosg', avatar: 'C' },
    { id: '2', name: 'Ana López', username: 'ana', avatar: 'A' },
    { id: '3', name: 'Pedro Martínez', username: 'pedro', avatar: 'P' },
    { id: '4', name: 'María Sánchez', username: 'maria', avatar: 'M' },
    { id: '5', name: 'Luis Rodríguez', username: 'luis', avatar: 'L' },
  ];

  const toggleFriend = (friendId: string) => {
    setSelectedFriends((prev) =>
      prev.includes(friendId)
        ? prev.filter((id) => id !== friendId)
        : [...prev, friendId]
    );
  };

  const handleShare = () => {
    if (selectedFriends.length === 0 && !shareToFeed) {
      Alert.alert('Error', 'Selecciona al menos un amigo o comparte en el feed');
      return;
    }

    Alert.alert(
      'Compartido',
      `Workout compartido ${shareToFeed ? 'en el feed' : ''}${
        selectedFriends.length > 0 ? ` y con ${selectedFriends.length} amigo(s)` : ''
      }`,
      [{ text: 'OK', onPress: () => router.back() }]
    );
  };

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <LinearGradient colors={['#8B5CF6', '#7C3AED']} className="px-6 pt-12 pb-6">
        <View className="flex-row items-center justify-between mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="close" size={28} color="white" />
          </TouchableOpacity>
          <Text className="text-2xl font-bold text-white">Compartir Workout</Text>
          <View style={{ width: 28 }} />
        </View>
      </LinearGradient>

      <ScrollView className="flex-1" contentContainerClassName="p-4">
        {/* Workout Preview */}
        <Card className="p-4 mb-4 bg-gradient-to-r from-purple-50 to-pink-50">
          <View className="flex-row items-center gap-3 mb-3">
            <View className="bg-purple-500 w-12 h-12 rounded-xl items-center justify-center">
              <Ionicons name="fitness" size={28} color="white" />
            </View>
            <View className="flex-1">
              <Text className="text-gray-900 font-bold text-lg">
                {mockWorkout.name}
              </Text>
              <Text className="text-gray-600 text-sm">
                {mockWorkout.exercises} ejercicios • {mockWorkout.duration} min
              </Text>
            </View>
          </View>

          <View className="flex-row gap-4">
            <View className="flex-1 bg-white p-3 rounded-lg">
              <Text className="text-gray-600 text-xs">Volumen</Text>
              <Text className="text-purple-700 font-bold text-lg">
                {mockWorkout.volume} kg
              </Text>
            </View>
            <View className="flex-1 bg-white p-3 rounded-lg">
              <Text className="text-gray-600 text-xs">Duración</Text>
              <Text className="text-purple-700 font-bold text-lg">
                {mockWorkout.duration} min
              </Text>
            </View>
          </View>
        </Card>

        {/* Message */}
        <Card className="p-4 mb-4">
          <Text className="text-gray-900 font-bold mb-3">Mensaje (Opcional)</Text>
          <TextInput
            value={message}
            onChangeText={setMessage}
            placeholder="Agrega un mensaje..."
            multiline
            maxLength={280}
            className="bg-gray-100 rounded-lg p-3 text-gray-900 min-h-[80px]"
          />
          <Text className="text-gray-500 text-xs text-right mt-2">
            {message.length}/280
          </Text>
        </Card>

        {/* Share to Feed */}
        <TouchableOpacity
          onPress={() => setShareToFeed(!shareToFeed)}
          className="mb-4"
        >
          <Card className="p-4">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center gap-3">
                <View className="bg-blue-500 w-12 h-12 rounded-full items-center justify-center">
                  <Ionicons name="globe" size={24} color="white" />
                </View>
                <View>
                  <Text className="text-gray-900 font-bold">
                    Compartir en el Feed
                  </Text>
                  <Text className="text-gray-600 text-sm">
                    Visible para todos tus amigos
                  </Text>
                </View>
              </View>
              <View
                className={`w-12 h-7 rounded-full items-center ${
                  shareToFeed ? 'bg-blue-500 justify-end' : 'bg-gray-300 justify-start'
                } px-1 flex-row`}
              >
                <View className="w-5 h-5 bg-white rounded-full" />
              </View>
            </View>
          </Card>
        </TouchableOpacity>

        {/* Select Friends */}
        <Card className="p-4 mb-4">
          <Text className="text-gray-900 font-bold mb-3">
            Enviar a Amigos ({selectedFriends.length})
          </Text>

          <View className="gap-2">
            {mockFriends.map((friend) => {
              const isSelected = selectedFriends.includes(friend.id);
              return (
                <TouchableOpacity
                  key={friend.id}
                  onPress={() => toggleFriend(friend.id)}
                  className={`flex-row items-center gap-3 p-3 rounded-lg ${
                    isSelected ? 'bg-purple-100 border-2 border-purple-500' : 'bg-gray-100'
                  }`}
                >
                  <View className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full items-center justify-center">
                    <Text className="text-white font-bold">
                      {friend.avatar}
                    </Text>
                  </View>
                  <View className="flex-1">
                    <Text className="text-gray-900 font-bold">
                      {friend.name}
                    </Text>
                    <Text className="text-gray-600 text-sm">
                      @{friend.username}
                    </Text>
                  </View>
                  {isSelected && (
                    <Ionicons name="checkmark-circle" size={24} color="#8B5CF6" />
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </Card>

        {/* Share Button */}
        <TouchableOpacity onPress={handleShare} className="mb-8">
          <LinearGradient
            colors={['#8B5CF6', '#7C3AED']}
            className="py-4 rounded-lg"
          >
            <View className="flex-row items-center justify-center gap-2">
              <Ionicons name="share" size={24} color="white" />
              <Text className="text-white font-bold text-lg">
                Compartir Workout
              </Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
