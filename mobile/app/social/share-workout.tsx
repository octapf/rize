import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  Share,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface Friend {
  id: string;
  name: string;
  avatar: string;
  isOnline: boolean;
  mutualFriends?: number;
}

interface WorkoutToShare {
  name: string;
  exercises: number;
  duration: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  calories?: number;
}

export default function ShareWorkout() {
  const [selectedFriends, setSelectedFriends] = useState<string[]>([]);
  const [message, setMessage] = useState('');
  const [visibility, setVisibility] = useState<'friends' | 'public' | 'private'>('friends');
  const [allowComments, setAllowComments] = useState(true);

  // Mock workout data
  const workout: WorkoutToShare = {
    name: 'Push Day - Chest & Triceps',
    exercises: 8,
    duration: 75,
    difficulty: 'intermediate',
    calories: 420,
  };

  // Mock friends data
  const friends: Friend[] = [
    { id: '1', name: 'Carlos MÃ©ndez', avatar: 'ðŸ‹ï¸', isOnline: true, mutualFriends: 12 },
    { id: '2', name: 'Ana GarcÃ­a', avatar: 'ðŸ’ª', isOnline: true, mutualFriends: 8 },
    { id: '3', name: 'Luis RodrÃ­guez', avatar: 'ðŸ”¥', isOnline: false, mutualFriends: 15 },
    { id: '4', name: 'MarÃ­a LÃ³pez', avatar: 'âš¡', isOnline: true, mutualFriends: 6 },
    { id: '5', name: 'Pedro SÃ¡nchez', avatar: 'ðŸŽ¯', isOnline: false, mutualFriends: 10 },
    { id: '6', name: 'Laura MartÃ­nez', avatar: 'ðŸŒŸ', isOnline: true, mutualFriends: 9 },
    { id: '7', name: 'Diego Torres', avatar: 'ðŸ’¯', isOnline: false, mutualFriends: 7 },
    { id: '8', name: 'Sofia RamÃ­rez', avatar: 'ðŸš€', isOnline: true, mutualFriends: 11 },
  ];

  const toggleFriend = (friendId: string) => {
    if (selectedFriends.includes(friendId)) {
      setSelectedFriends(selectedFriends.filter(id => id !== friendId));
    } else {
      setSelectedFriends([...selectedFriends, friendId]);
    }
  };

  const selectAll = () => {
    if (selectedFriends.length === friends.length) {
      setSelectedFriends([]);
    } else {
      setSelectedFriends(friends.map(f => f.id));
    }
  };

  const shareWorkout = async () => {
    if (visibility !== 'private' && selectedFriends.length === 0) {
      Alert.alert(
        'Sin destinatarios',
        'Â¿Quieres compartir este workout pÃºblicamente?',
        [
          { text: 'Cancelar', style: 'cancel' },
          { 
            text: 'Compartir PÃºblico',
            onPress: () => processShare()
          }
        ]
      );
      return;
    }

    processShare();
  };

  const processShare = () => {
    const friendNames = selectedFriends
      .map(id => friends.find(f => f.id === id)?.name)
      .filter(Boolean)
      .join(', ');

    Alert.alert(
      'âœ… Workout Compartido!',
      `${workout.name}\n\nCompartido con: ${friendNames || 'PÃºblico'}\n\nVisibilidad: ${visibility}\nComentarios: ${allowComments ? 'Activados' : 'Desactivados'}`,
      [{ text: 'OK', onPress: () => router.back() }]
    );
  };

  const shareExternal = async () => {
    try {
      const result = await Share.share({
        message: `Â¡Mira mi workout! ðŸ’ª\n\n${workout.name}\n${workout.exercises} ejercicios â€¢ ${workout.duration} min\n${workout.calories} calorÃ­as quemadas\n\n#Fitness #Workout #GymLife`,
        title: workout.name,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log('Shared with activity type:', result.activityType);
        } else {
          console.log('Shared');
        }
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo compartir');
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'emerald';
      case 'intermediate': return 'amber';
      case 'advanced': return 'red';
      default: return 'zinc';
    }
  };

  return (
    <View className="flex-1 bg-zinc-950">
      {/* Header */}
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1 ml-3">
            Compartir Workout
          </Text>
          <TouchableOpacity onPress={shareWorkout}>
            <View className="bg-primary rounded-xl px-4 py-2">
              <Text className="text-white font-bold">Enviar</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          {/* Workout Preview */}
          <View className="bg-gradient-to-r from-primary to-[#7D0EBE] rounded-xl p-6 mb-6">
            <Text className="text-white text-2xl font-bold mb-3">{workout.name}</Text>
            
            <View className="flex-row items-center mb-3">
              <View className="flex-row items-center flex-1">
                <Ionicons name="barbell" size={16} color="white" />
                <Text className="text-white ml-2">{workout.exercises} ejercicios</Text>
              </View>
              <View className="flex-row items-center flex-1">
                <Ionicons name="time" size={16} color="white" />
                <Text className="text-white ml-2">{workout.duration} min</Text>
              </View>
            </View>

            <View className="flex-row items-center">
              <View className={`bg-${getDifficultyColor(workout.difficulty)}-500 rounded-full px-3 py-1 mr-3`}>
                <Text className="text-white text-xs font-bold uppercase">{workout.difficulty}</Text>
              </View>
              {workout.calories && (
                <View className="flex-row items-center">
                  <Ionicons name="flame" size={16} color="#F97316" />
                  <Text className="text-white ml-1">{workout.calories} cal</Text>
                </View>
              )}
            </View>
          </View>

          {/* Message */}
          <View className="mb-6">
            <Text className="text-white font-bold mb-3">Mensaje (Opcional)</Text>
            <TextInput
              value={message}
              onChangeText={setMessage}
              placeholder="Agrega un mensaje motivacional..."
              placeholderTextColor="#71717A"
              multiline
              numberOfLines={3}
              className="bg-zinc-900 rounded-xl p-4 text-white border border-zinc-800"
              style={{ textAlignVertical: 'top' }}
            />
          </View>

          {/* Visibility */}
          <View className="mb-6">
            <Text className="text-white font-bold mb-3">Visibilidad</Text>
            
            <View className="flex-row gap-2">
              <TouchableOpacity
                onPress={() => setVisibility('friends')}
                className={`flex-1 rounded-xl p-4 border ${
                  visibility === 'friends'
                    ? 'bg-primary border-primary'
                    : 'bg-zinc-900 border-zinc-800'
                }`}
              >
                <Ionicons
                  name="people"
                  size={24}
                  color={visibility === 'friends' ? 'white' : '#71717A'}
                />
                <Text className={`font-bold mt-2 ${
                  visibility === 'friends' ? 'text-white' : 'text-zinc-400'
                }`}>
                  Amigos
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setVisibility('public')}
                className={`flex-1 rounded-xl p-4 border ${
                  visibility === 'public'
                    ? 'bg-primary border-primary'
                    : 'bg-zinc-900 border-zinc-800'
                }`}
              >
                <Ionicons
                  name="globe"
                  size={24}
                  color={visibility === 'public' ? 'white' : '#71717A'}
                />
                <Text className={`font-bold mt-2 ${
                  visibility === 'public' ? 'text-white' : 'text-zinc-400'
                }`}>
                  PÃºblico
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setVisibility('private')}
                className={`flex-1 rounded-xl p-4 border ${
                  visibility === 'private'
                    ? 'bg-purple-500 border-purple-500'
                    : 'bg-zinc-900 border-zinc-800'
                }`}
              >
                <Ionicons
                  name="lock-closed"
                  size={24}
                  color={visibility === 'private' ? 'white' : '#71717A'}
                />
                <Text className={`font-bold mt-2 ${
                  visibility === 'private' ? 'text-white' : 'text-zinc-400'
                }`}>
                  Privado
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Comments Toggle */}
          <TouchableOpacity
            onPress={() => setAllowComments(!allowComments)}
            className="bg-zinc-900 rounded-xl p-4 flex-row items-center justify-between mb-6 border border-zinc-800"
          >
            <View className="flex-row items-center flex-1">
              <Ionicons name="chatbubbles" size={24} color="#9D12DE" />
              <View className="ml-3 flex-1">
                <Text className="text-white font-bold">Permitir Comentarios</Text>
                <Text className="text-zinc-400 text-sm">Amigos pueden comentar</Text>
              </View>
            </View>
            <View className={`w-12 h-6 rounded-full ${allowComments ? 'bg-primary' : 'bg-zinc-700'}`}>
              <View className={`w-5 h-5 bg-white rounded-full mt-0.5 ${allowComments ? 'ml-6' : 'ml-1'}`} />
            </View>
          </TouchableOpacity>

          {/* Friends Selection */}
          <View className="mb-6">
            <View className="flex-row items-center justify-between mb-3">
              <Text className="text-white font-bold">
                Compartir con Amigos ({selectedFriends.length})
              </Text>
              <TouchableOpacity onPress={selectAll}>
                <Text className="text-primary/80 font-bold">
                  {selectedFriends.length === friends.length ? 'Deseleccionar' : 'Todos'}
                </Text>
              </TouchableOpacity>
            </View>

            {friends.map((friend) => {
              const isSelected = selectedFriends.includes(friend.id);

              return (
                <TouchableOpacity
                  key={friend.id}
                  onPress={() => toggleFriend(friend.id)}
                  className={`bg-zinc-900 rounded-xl p-4 mb-3 flex-row items-center border ${
                    isSelected ? 'border-primary' : 'border-zinc-800'
                  }`}
                >
                  <View className="w-12 h-12 bg-zinc-800 rounded-full items-center justify-center mr-3">
                    <Text className="text-2xl">{friend.avatar}</Text>
                  </View>

                  <View className="flex-1">
                    <View className="flex-row items-center">
                      <Text className="text-white font-bold mr-2">{friend.name}</Text>
                      {friend.isOnline && (
                        <View className="w-2 h-2 bg-primary rounded-full" />
                      )}
                    </View>
                    <Text className="text-zinc-400 text-sm">
                      {friend.mutualFriends} amigos en comÃºn
                    </Text>
                  </View>

                  <View className={`w-6 h-6 rounded-full border-2 ${
                    isSelected
                      ? 'bg-primary border-primary'
                      : 'border-zinc-600'
                  } items-center justify-center`}>
                    {isSelected && <Ionicons name="checkmark" size={16} color="white" />}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* External Share */}
          <TouchableOpacity
            onPress={shareExternal}
            className="bg-zinc-900 rounded-xl p-4 flex-row items-center justify-center mb-6 border border-zinc-800"
          >
            <Ionicons name="share-outline" size={24} color="white" />
            <Text className="text-white font-bold ml-2">
              Compartir en Redes Sociales
            </Text>
          </TouchableOpacity>

          {/* Tips */}
          <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-6">
            <View className="flex-row items-start">
              <Ionicons name="information-circle" size={20} color="#9D12DE" />
              <View className="flex-1 ml-3">
                <Text className="text-primary/80 font-bold mb-2">
                  Tips para Compartir
                </Text>
                <Text className="text-primary/60 text-sm">
                  â€¢ Inspira a otros con tus logros{'\n'}
                  â€¢ AÃ±ade mensaje motivacional{'\n'}
                  â€¢ Etiqueta amigos para accountability{'\n'}
                  â€¢ Comparte pÃºblicamente para comunidad{'\n'}
                  â€¢ Activa comentarios para feedback
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

