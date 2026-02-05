import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface Playlist {
  id: string;
  name: string;
  description: string;
  trackCount: number;
  duration: number;
  genre: string;
  intensity: 'low' | 'medium' | 'high';
  color: string;
  isCustom: boolean;
}

const BUILT_IN_PLAYLISTS: Playlist[] = [
  {
    id: '1',
    name: 'Beast Mode',
    description: 'Heavy metal y rock para PR días',
    trackCount: 45,
    duration: 180,
    genre: 'Metal/Rock',
    intensity: 'high',
    color: 'red',
    isCustom: false,
  },
  {
    id: '2',
    name: 'Cardio Vibes',
    description: 'EDM y electrónica para cardio constante',
    trackCount: 60,
    duration: 240,
    genre: 'EDM/Electronic',
    intensity: 'high',
    color: 'purple',
    isCustom: false,
  },
  {
    id: '3',
    name: 'Power Hour',
    description: 'Hip-hop y trap para fuerza',
    trackCount: 50,
    duration: 200,
    genre: 'Hip-Hop/Trap',
    intensity: 'high',
    color: 'amber',
    isCustom: false,
  },
  {
    id: '4',
    name: 'Warm-Up Flow',
    description: 'Música chill para calentamiento',
    trackCount: 20,
    duration: 60,
    genre: 'Chill/Pop',
    intensity: 'low',
    color: 'blue',
    isCustom: false,
  },
  {
    id: '5',
    name: 'Pump & Grind',
    description: 'Hipertrofia y volumen alto',
    trackCount: 40,
    duration: 150,
    genre: 'Mix',
    intensity: 'medium',
    color: 'emerald',
    isCustom: false,
  },
];

const GENRE_SUGGESTIONS = [
  { genre: 'Metal/Rock', icon: 'musical-notes', color: 'red', description: 'Para PRs y máxima intensidad' },
  { genre: 'EDM/Electronic', icon: 'pulse', color: 'purple', description: 'Cardio y resistencia' },
  { genre: 'Hip-Hop/Trap', icon: 'logo-soundcloud', color: 'amber', description: 'Fuerza y potencia' },
  { genre: 'Reggaeton/Latin', icon: 'musical-note', color: 'pink', description: 'Energía y ritmo' },
  { genre: 'Dubstep/Bass', icon: 'analytics', color: 'cyan', description: 'HIIT y explosividad' },
  { genre: 'Pop/Mainstream', icon: 'radio', color: 'blue', description: 'General y accesible' },
];

export default function WorkoutMusic() {
  const [playlists, setPlaylists] = useState<Playlist[]>(BUILT_IN_PLAYLISTS);
  const [selectedGenre, setSelectedGenre] = useState<string>('all');
  const [showCreateForm, setShowCreateForm] = useState(false);

  const genres = [
    { key: 'all', label: 'Todos', color: 'blue' },
    { key: 'Metal/Rock', label: 'Metal/Rock', color: 'red' },
    { key: 'EDM/Electronic', label: 'EDM', color: 'purple' },
    { key: 'Hip-Hop/Trap', label: 'Hip-Hop', color: 'amber' },
    { key: 'Mix', label: 'Mix', color: 'emerald' },
  ];

  const filteredPlaylists = selectedGenre === 'all'
    ? playlists
    : playlists.filter(p => p.genre === selectedGenre);

  const playPlaylist = (playlist: Playlist) => {
    Alert.alert(
      `🎯µ ${playlist.name}`,
      `${playlist.trackCount} canciones • ${Math.round(playlist.duration / 60)} min\n\nAbriendo en tu app de música...`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Reproducir',
          onPress: () => {
            // Integration with music app would go here
            console.log('Playing playlist:', playlist.id);
          }
        }
      ]
    );
  };

  const deletePlaylist = (id: string) => {
    Alert.alert(
      'Eliminar Playlist',
      '¿Estás seguro?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => setPlaylists(playlists.filter(p => p.id !== id))
        }
      ]
    );
  };

  const getIntensityIcon = (intensity: string) => {
    switch (intensity) {
      case 'low': return 'walk';
      case 'medium': return 'fitness';
      case 'high': return 'flash';
      default: return 'musical-note';
    }
  };

  const getIntensityLabel = (intensity: string) => {
    switch (intensity) {
      case 'low': return 'Baja';
      case 'medium': return 'Media';
      case 'high': return 'Alta';
      default: return '';
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
            Workout Music
          </Text>
          <TouchableOpacity onPress={() => setShowCreateForm(true)}>
            <View className="bg-purple-500 rounded-full p-2">
              <Ionicons name="add" size={24} color="white" />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          {/* Info */}
          <View className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-6 mb-6">
            <Text className="text-white text-2xl font-bold mb-2">Tu Soundtrack</Text>
            <Text className="text-white opacity-90 mb-4">
              La música perfecta mejora rendimiento 15-20%
            </Text>
            <View className="flex-row items-center">
              <Ionicons name="musical-notes" size={20} color="white" />
              <Text className="text-white ml-2">{playlists.length} playlists disponibles</Text>
            </View>
          </View>

          {/* Stats */}
          <View className="flex-row gap-3 mb-6">
            <View className="flex-1 bg-zinc-900 rounded-xl p-4 border border-zinc-800">
              <Text className="text-zinc-400 text-xs mb-1">Total Tracks</Text>
              <Text className="text-white font-bold text-2xl">
                {playlists.reduce((sum, p) => sum + p.trackCount, 0)}
              </Text>
            </View>
            <View className="flex-1 bg-zinc-900 rounded-xl p-4 border border-zinc-800">
              <Text className="text-zinc-400 text-xs mb-1">Total Horas</Text>
              <Text className="text-purple-400 font-bold text-2xl">
                {Math.round(playlists.reduce((sum, p) => sum + p.duration, 0) / 60)}h
              </Text>
            </View>
          </View>

          {/* Genre Filter */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6">
            <View className="flex-row gap-2">
              {genres.map((genre) => (
                <TouchableOpacity
                  key={genre.key}
                  onPress={() => setSelectedGenre(genre.key)}
                  className={`rounded-xl px-4 py-2 ${
                    selectedGenre === genre.key
                      ? `bg-${genre.color}-500`
                      : 'bg-zinc-900 border border-zinc-800'
                  }`}
                >
                  <Text className={`font-bold ${selectedGenre === genre.key ? 'text-white' : 'text-zinc-400'}`}>
                    {genre.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          {/* Playlists */}
          {filteredPlaylists.length === 0 ? (
            <View className="bg-zinc-900 rounded-xl p-8 border border-zinc-800 items-center">
              <Ionicons name="musical-notes-outline" size={64} color="#52525B" />
              <Text className="text-zinc-400 text-center mt-4">
                No hay playlists en este género
              </Text>
            </View>
          ) : (
            filteredPlaylists.map((playlist) => (
              <View 
                key={playlist.id}
                className={`bg-${playlist.color}-500/10 rounded-xl p-5 mb-4 border border-${playlist.color}-500/30`}
              >
                {/* Header */}
                <View className="flex-row items-start justify-between mb-3">
                  <View className="flex-row items-start flex-1">
                    <View className={`w-14 h-14 bg-${playlist.color}-500 rounded-xl items-center justify-center mr-3`}>
                      <Ionicons name="musical-notes" size={28} color="white" />
                    </View>
                    <View className="flex-1">
                      <Text className="text-white font-bold text-lg mb-1">{playlist.name}</Text>
                      <Text className="text-zinc-400 text-sm mb-2">{playlist.description}</Text>
                      <View className="flex-row items-center gap-3">
                        <Text className={`text-${playlist.color}-400 text-xs`}>
                          {playlist.trackCount} tracks
                        </Text>
                        <Text className="text-zinc-500 text-xs">•</Text>
                        <Text className={`text-${playlist.color}-400 text-xs`}>
                          {Math.round(playlist.duration / 60)} min
                        </Text>
                        <Text className="text-zinc-500 text-xs">•</Text>
                        <Text className={`text-${playlist.color}-400 text-xs`}>
                          {playlist.genre}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>

                {/* Intensity Badge */}
                <View className="flex-row items-center gap-2 mb-4">
                  <View className={`bg-${playlist.color}-500 rounded-full px-3 py-1 flex-row items-center`}>
                    <Ionicons name={getIntensityIcon(playlist.intensity) as any} size={14} color="white" />
                    <Text className="text-white text-xs font-bold ml-1">
                      Intensidad {getIntensityLabel(playlist.intensity)}
                    </Text>
                  </View>
                  {!playlist.isCustom && (
                    <View className="bg-zinc-800 rounded-full px-3 py-1">
                      <Text className="text-zinc-400 text-xs font-bold">Built-in</Text>
                    </View>
                  )}
                </View>

                {/* Actions */}
                <View className="flex-row gap-2">
                  <TouchableOpacity
                    onPress={() => playPlaylist(playlist)}
                    className={`flex-1 bg-${playlist.color}-500 rounded-lg py-3 flex-row items-center justify-center`}
                  >
                    <Ionicons name="play" size={18} color="white" />
                    <Text className="text-white font-bold ml-2">Reproducir</Text>
                  </TouchableOpacity>
                  
                  {playlist.isCustom && (
                    <TouchableOpacity
                      onPress={() => deletePlaylist(playlist.id)}
                      className="bg-zinc-800 rounded-lg px-4 py-3 items-center justify-center"
                    >
                      <Ionicons name="trash" size={18} color="#EF4444" />
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            ))
          )}

          {/* Genre Suggestions */}
          <Text className="text-white font-bold text-lg mb-4 mt-6">Guía de Géneros</Text>
          
          {GENRE_SUGGESTIONS.map((suggestion, idx) => (
            <View key={idx} className="bg-zinc-900 rounded-xl p-4 mb-3 border border-zinc-800">
              <View className="flex-row items-center mb-2">
                <View className={`w-10 h-10 bg-${suggestion.color}-500 rounded-xl items-center justify-center mr-3`}>
                  <Ionicons name={suggestion.icon as any} size={20} color="white" />
                </View>
                <View className="flex-1">
                  <Text className="text-white font-bold">{suggestion.genre}</Text>
                  <Text className="text-zinc-400 text-sm">{suggestion.description}</Text>
                </View>
              </View>
            </View>
          ))}

          {/* Tips */}
          <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-6 mt-4">
            <View className="flex-row items-start">
              <Ionicons name="bulb" size={20} color="#9D12DE" />
              <View className="flex-1 ml-3">
                <Text className="text-primary/80 font-bold mb-2">
                  Tips de Música para Entrenar
                </Text>
                <Text className="text-primary/60 text-sm">
                  • 130-150 BPM = ideal para cardio{'\n'}
                  • Música rápida = más reps/mejor rendimiento{'\n'}
                  • Crea playlists por tipo de workout{'\n'}
                  • Canciones favoritas para series difíciles{'\n'}
                  • Silencio también es válido (mindfulness){'\n'}
                  • Actualiza playlists cada mes
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Create Form Modal */}
      {showCreateForm && (
        <View className="absolute inset-0 bg-black/80 items-center justify-center">
          <View className="bg-zinc-900 rounded-xl p-6 m-6 w-4/5">
            <Text className="text-white font-bold text-xl mb-4">Crear Playlist</Text>
            <Text className="text-zinc-400 mb-4">
              Conecta tu cuenta de Spotify o Apple Music para crear playlists personalizadas
            </Text>
            <TouchableOpacity
              onPress={() => setShowCreateForm(false)}
              className="bg-purple-500 rounded-lg py-3"
            >
              <Text className="text-white font-bold text-center">Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

