import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  Share,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface Workout {
  id: string;
  name: string;
  type: 'fuerza' | 'hipertrofia' | 'cardio' | 'funcional';
  duration: number;
  exercises: number;
  difficulty: 'principiante' | 'intermedio' | 'avanzado';
  isPublic: boolean;
  likes: number;
  downloads: number;
  creator: string;
  description: string;
  tags: string[];
}

const MY_WORKOUTS: Workout[] = [
  {
    id: '1',
    name: 'Push Day Hipertrofia',
    type: 'hipertrofia',
    duration: 75,
    exercises: 8,
    difficulty: 'intermedio',
    isPublic: true,
    likes: 142,
    downloads: 89,
    creator: 'TÃº',
    description: 'Rutina de empuje con enfoque en volumen para pecho, hombros y trÃ­ceps',
    tags: ['pecho', 'hombros', 'triceps', 'volumen'],
  },
  {
    id: '2',
    name: 'Leg Day Intenso',
    type: 'fuerza',
    duration: 90,
    exercises: 6,
    difficulty: 'avanzado',
    isPublic: true,
    likes: 98,
    downloads: 54,
    creator: 'TÃº',
    description: 'Pierna completa con Ã©nfasis en sentadilla y peso muerto',
    tags: ['piernas', 'fuerza', 'compuestos'],
  },
  {
    id: '3',
    name: 'HIIT 20 Minutos',
    type: 'cardio',
    duration: 20,
    exercises: 5,
    difficulty: 'principiante',
    isPublic: false,
    likes: 0,
    downloads: 0,
    creator: 'TÃº',
    description: 'Cardio de alta intensidad para quemar calorÃ­as',
    tags: ['cardio', 'hiit', 'rapido'],
  },
];

const COMMUNITY_WORKOUTS: Workout[] = [
  {
    id: '4',
    name: 'Full Body PPL',
    type: 'fuerza',
    duration: 60,
    exercises: 7,
    difficulty: 'intermedio',
    isPublic: true,
    likes: 324,
    downloads: 187,
    creator: 'Carlos Fitness',
    description: 'Rutina completa para todo el cuerpo 3 veces por semana',
    tags: ['fullbody', 'principiante', 'gym'],
  },
  {
    id: '5',
    name: 'Calistenia Avanzada',
    type: 'funcional',
    duration: 45,
    exercises: 10,
    difficulty: 'avanzado',
    isPublic: true,
    likes: 256,
    downloads: 132,
    creator: 'Ana Street Workout',
    description: 'Movimientos avanzados de calistenia y control corporal',
    tags: ['calistenia', 'bodyweight', 'skills'],
  },
  {
    id: '6',
    name: 'Powerlifting 5x5',
    type: 'fuerza',
    duration: 70,
    exercises: 5,
    difficulty: 'avanzado',
    isPublic: true,
    likes: 412,
    downloads: 298,
    creator: 'Pedro Strong',
    description: 'Programa clÃ¡sico de fuerza con los 3 grandes',
    tags: ['powerlifting', 'fuerza', '5x5'],
  },
];

export default function WorkoutSharing() {
  const [selectedTab, setSelectedTab] = useState<'my' | 'community' | 'saved'>('my');

  const tabs = [
    { id: 'my' as const, label: 'Mis Rutinas', icon: 'barbell' },
    { id: 'community' as const, label: 'Comunidad', icon: 'people' },
    { id: 'saved' as const, label: 'Guardadas', icon: 'bookmark' },
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'fuerza':
        return '#EF4444';
      case 'hipertrofia':
        return '#9D12DE';
      case 'cardio':
        return '#9D12DE';
      case 'funcional':
        return '#FFEA00';
      default:
        return '#71717A';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'principiante':
        return '#9D12DE';
      case 'intermedio':
        return '#FFEA00';
      case 'avanzado':
        return '#EF4444';
      default:
        return '#71717A';
    }
  };

  const shareWorkout = async (workout: Workout) => {
    try {
      await Share.share({
        message: `ðŸ‹ï¸ ${workout.name}\n\n${workout.description}\n\n${workout.exercises} ejercicios â€¢ ${workout.duration} min\n\nÂ¡Descarga en Rize App!`,
      });
    } catch (error) {
      Alert.alert('Error', 'No se pudo compartir la rutina');
    }
  };

  const togglePublic = (workoutId: string) => {
    Alert.alert(
      'Cambiar Visibilidad',
      'Â¿Deseas hacer esta rutina pÃºblica para que otros la descarguen?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Hacer PÃºblica',
          onPress: () => {
            Alert.alert('Â¡Publicada!', 'Tu rutina ahora es visible para todos');
          },
        },
      ]
    );
  };

  const downloadWorkout = (workout: Workout) => {
    Alert.alert(
      'Descargar Rutina',
      `${workout.name}\n\nCreada por: ${workout.creator}\n\nÂ¿Deseas agregar esta rutina a tu biblioteca?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Descargar',
          onPress: () => {
            Alert.alert('Â¡Descargada!', 'La rutina estÃ¡ ahora en "Mis Rutinas"');
          },
        },
      ]
    );
  };

  const likeWorkout = (workoutId: string) => {
    Alert.alert('â¤ï¸', 'Te gusta esta rutina');
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
            Compartir Rutinas
          </Text>
          <TouchableOpacity>
            <Ionicons name="add-circle" size={24} color="#9D12DE" />
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View className="bg-gradient-to-br from-primary to-[#7D0EBE] rounded-xl p-4 mb-4">
          <View className="flex-row items-center justify-between">
            <View className="flex-1">
              <Text className="text-white/80 text-sm mb-1">Tus Rutinas PÃºblicas</Text>
              <Text className="text-white font-bold text-4xl mb-1">
                {MY_WORKOUTS.filter((w) => w.isPublic).length}
              </Text>
              <Text className="text-white/80 text-sm">
                {MY_WORKOUTS.reduce((sum, w) => sum + w.downloads, 0)} descargas totales
              </Text>
            </View>
            <View className="bg-white/20 rounded-full p-4">
              <Ionicons name="share-social" size={32} color="white" />
            </View>
          </View>
        </View>

        {/* Tabs */}
        <View className="flex-row gap-2">
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.id}
              onPress={() => setSelectedTab(tab.id)}
              className={`flex-1 flex-row items-center justify-center py-3 rounded-lg ${
                selectedTab === tab.id ? 'bg-primary' : 'bg-zinc-900 border border-zinc-800'
              }`}
            >
              <Ionicons
                name={tab.icon as any}
                size={18}
                color={selectedTab === tab.id ? 'white' : '#71717A'}
              />
              <Text
                className={`ml-2 font-semibold text-sm ${
                  selectedTab === tab.id ? 'text-white' : 'text-zinc-400'
                }`}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* My Workouts Tab */}
        {selectedTab === 'my' && (
          <View className="px-6 pt-6">
            <Text className="text-white font-bold text-lg mb-3">
              Mis Rutinas ({MY_WORKOUTS.length})
            </Text>

            {MY_WORKOUTS.map((workout) => (
              <View
                key={workout.id}
                className="bg-zinc-900 rounded-xl p-4 mb-3 border border-zinc-800"
              >
                <View className="flex-row items-start justify-between mb-3">
                  <View className="flex-1">
                    <Text className="text-white font-bold text-xl mb-2">
                      {workout.name}
                    </Text>
                    <Text className="text-zinc-400 text-sm mb-3">
                      {workout.description}
                    </Text>
                  </View>
                </View>

                <View className="flex-row flex-wrap gap-2 mb-3">
                  <View
                    className="px-3 py-1 rounded-full"
                    style={{ backgroundColor: getTypeColor(workout.type) + '20' }}
                  >
                    <Text
                      className="text-xs font-bold capitalize"
                      style={{ color: getTypeColor(workout.type) }}
                    >
                      {workout.type}
                    </Text>
                  </View>
                  <View
                    className="px-3 py-1 rounded-full"
                    style={{ backgroundColor: getDifficultyColor(workout.difficulty) + '20' }}
                  >
                    <Text
                      className="text-xs font-bold capitalize"
                      style={{ color: getDifficultyColor(workout.difficulty) }}
                    >
                      {workout.difficulty}
                    </Text>
                  </View>
                  <View className="bg-zinc-800 px-3 py-1 rounded-full">
                    <Text className="text-zinc-400 text-xs">
                      {workout.exercises} ejercicios
                    </Text>
                  </View>
                  <View className="bg-zinc-800 px-3 py-1 rounded-full">
                    <Text className="text-zinc-400 text-xs">
                      {workout.duration} min
                    </Text>
                  </View>
                  {workout.isPublic && (
                    <View className="bg-primary/20 px-3 py-1 rounded-full">
                      <Text className="text-primary text-xs font-bold">
                        PÃºblica
                      </Text>
                    </View>
                  )}
                </View>

                {workout.isPublic && (
                  <View className="flex-row gap-3 mb-3">
                    <View className="flex-1 bg-zinc-800 rounded-lg p-3">
                      <Text className="text-zinc-400 text-xs">Me gusta</Text>
                      <View className="flex-row items-center">
                        <Ionicons name="heart" size={16} color="#EF4444" />
                        <Text className="text-white font-bold ml-1">
                          {workout.likes}
                        </Text>
                      </View>
                    </View>
                    <View className="flex-1 bg-zinc-800 rounded-lg p-3">
                      <Text className="text-zinc-400 text-xs">Descargas</Text>
                      <View className="flex-row items-center">
                        <Ionicons name="download" size={16} color="#9D12DE" />
                        <Text className="text-white font-bold ml-1">
                          {workout.downloads}
                        </Text>
                      </View>
                    </View>
                  </View>
                )}

                <View className="flex-row gap-2">
                  <TouchableOpacity
                    onPress={() => shareWorkout(workout)}
                    className="flex-1 bg-primary rounded-lg p-3"
                  >
                    <View className="flex-row items-center justify-center">
                      <Ionicons name="share-social" size={16} color="white" />
                      <Text className="text-white font-bold ml-2">Compartir</Text>
                    </View>
                  </TouchableOpacity>
                  {!workout.isPublic && (
                    <TouchableOpacity
                      onPress={() => togglePublic(workout.id)}
                      className="flex-1 bg-zinc-800 rounded-lg p-3"
                    >
                      <View className="flex-row items-center justify-center">
                        <Ionicons name="globe-outline" size={16} color="white" />
                        <Text className="text-white font-bold ml-2">Publicar</Text>
                      </View>
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity className="bg-zinc-800 rounded-lg p-3 px-4">
                    <Ionicons name="create-outline" size={20} color="white" />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Community Tab */}
        {selectedTab === 'community' && (
          <View className="px-6 pt-6">
            <Text className="text-white font-bold text-lg mb-3">
              Populares en la Comunidad ({COMMUNITY_WORKOUTS.length})
            </Text>

            {COMMUNITY_WORKOUTS.map((workout) => (
              <View
                key={workout.id}
                className="bg-zinc-900 rounded-xl p-4 mb-3 border border-zinc-800"
              >
                <View className="flex-row items-start justify-between mb-3">
                  <View className="flex-1">
                    <Text className="text-white font-bold text-xl mb-1">
                      {workout.name}
                    </Text>
                    <View className="flex-row items-center mb-2">
                      <Ionicons name="person-circle" size={16} color="#71717A" />
                      <Text className="text-zinc-400 text-sm ml-1">
                        {workout.creator}
                      </Text>
                    </View>
                    <Text className="text-zinc-400 text-sm mb-3">
                      {workout.description}
                    </Text>
                  </View>
                </View>

                <View className="flex-row flex-wrap gap-2 mb-3">
                  {workout.tags.map((tag, index) => (
                    <View key={index} className="bg-zinc-800 px-3 py-1 rounded-full">
                      <Text className="text-zinc-400 text-xs">#{tag}</Text>
                    </View>
                  ))}
                </View>

                <View className="flex-row items-center gap-4 mb-3">
                  <View className="flex-row items-center">
                    <Ionicons name="heart" size={18} color="#EF4444" />
                    <Text className="text-white font-bold ml-1">{workout.likes}</Text>
                  </View>
                  <View className="flex-row items-center">
                    <Ionicons name="download" size={18} color="#9D12DE" />
                    <Text className="text-white font-bold ml-1">{workout.downloads}</Text>
                  </View>
                  <View className="flex-row items-center">
                    <Ionicons name="time" size={18} color="#71717A" />
                    <Text className="text-zinc-400 ml-1">{workout.duration} min</Text>
                  </View>
                  <View className="flex-row items-center">
                    <Ionicons name="fitness" size={18} color="#71717A" />
                    <Text className="text-zinc-400 ml-1">{workout.exercises}</Text>
                  </View>
                </View>

                <View className="flex-row gap-2">
                  <TouchableOpacity
                    onPress={() => downloadWorkout(workout)}
                    className="flex-1 bg-primary rounded-lg p-3"
                  >
                    <View className="flex-row items-center justify-center">
                      <Ionicons name="download" size={16} color="white" />
                      <Text className="text-white font-bold ml-2">Descargar</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => likeWorkout(workout.id)}
                    className="bg-zinc-800 rounded-lg p-3 px-4"
                  >
                    <Ionicons name="heart-outline" size={20} color="white" />
                  </TouchableOpacity>
                  <TouchableOpacity className="bg-zinc-800 rounded-lg p-3 px-4">
                    <Ionicons name="eye-outline" size={20} color="white" />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Saved Tab */}
        {selectedTab === 'saved' && (
          <View className="px-6 pt-6">
            <View className="bg-zinc-900 rounded-xl p-8 border border-zinc-800 items-center">
              <Ionicons name="bookmark-outline" size={64} color="#71717A" />
              <Text className="text-zinc-400 font-bold mt-4">
                No hay rutinas guardadas
              </Text>
              <Text className="text-zinc-500 text-sm mt-2 text-center">
                Las rutinas que descargues aparecerÃ¡n aquÃ­
              </Text>
            </View>
          </View>
        )}

        {/* Info Card */}
        <View className="px-6 pb-6 pt-4">
          <View className="bg-primary/10 rounded-xl p-4 border border-primary/30">
            <View className="flex-row items-start">
              <Ionicons name="information-circle" size={20} color="#9D12DE" />
              <View className="flex-1 ml-3">
                <Text className="text-primary/80 font-bold mb-2">
                  Comparte tu Conocimiento
                </Text>
                <Text className="text-primary/60 text-sm">
                  Cuando publicas una rutina, ayudas a miles de personas a mejorar su entrenamiento. Â¡SÃ© parte de la comunidad Rize!
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

