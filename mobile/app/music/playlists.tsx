import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  Switch,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface Playlist {
  id: string;
  name: string;
  description: string;
  genre: 'rock' | 'edm' | 'hip-hop' | 'latin' | 'pop' | 'metal' | 'mixed';
  bpm: number;
  duration: number;
  tracks: number;
  workoutType: string[];
  coverColor: string;
  isPlaying: boolean;
}

interface MusicSettings {
  autoPlay: boolean;
  bpmSync: boolean;
  fadeInOut: boolean;
  motivationalAudio: boolean;
}

const PLAYLISTS: Playlist[] = [
  {
    id: '1',
    name: 'Beast Mode Activated',
    description: 'Heavy metal y rock para PRs de fuerza',
    genre: 'metal',
    bpm: 140,
    duration: 60,
    tracks: 15,
    workoutType: ['Fuerza', 'Powerlifting', 'Leg Day'],
    coverColor: '#EF4444',
    isPlaying: false,
  },
  {
    id: '2',
    name: 'HIIT Energy',
    description: 'EDM alto BPM para máxima intensidad',
    genre: 'edm',
    bpm: 160,
    duration: 30,
    tracks: 10,
    workoutType: ['HIIT', 'Cardio', 'Tabata'],
    coverColor: '#F59E0B',
    isPlaying: true,
  },
  {
    id: '3',
    name: 'Pump & Grind',
    description: 'Hip-hop y trap para hipertrofia',
    genre: 'hip-hop',
    bpm: 95,
    duration: 75,
    tracks: 20,
    workoutType: ['Hipertrofia', 'Push/Pull/Legs', 'Volumen'],
    coverColor: '#8B5CF6',
    isPlaying: false,
  },
  {
    id: '4',
    name: 'Latin Fire',
    description: 'Reggaetón y latin para cardio energético',
    genre: 'latin',
    bpm: 105,
    duration: 45,
    tracks: 12,
    workoutType: ['Cardio', 'Zumba', 'Dance'],
    coverColor: '#EC4899',
    isPlaying: false,
  },
  {
    id: '5',
    name: 'Morning Motivation',
    description: 'Pop y rock suave para warm-up',
    genre: 'pop',
    bpm: 120,
    duration: 20,
    tracks: 8,
    workoutType: ['Calentamiento', 'Movilidad', 'Yoga'],
    coverColor: '#10B981',
    isPlaying: false,
  },
  {
    id: '6',
    name: 'Endurance Zone',
    description: 'Ritmos constantes para running largo',
    genre: 'mixed',
    bpm: 135,
    duration: 90,
    tracks: 25,
    workoutType: ['Running', 'Ciclismo', 'Resistencia'],
    coverColor: '#3B82F6',
    isPlaying: false,
  },
];

export default function WorkoutPlaylists() {
  const [playlists, setPlaylists] = useState(PLAYLISTS);
  const [selectedGenre, setSelectedGenre] = useState<string>('all');
  const [settings, setSettings] = useState<MusicSettings>({
    autoPlay: true,
    bpmSync: false,
    fadeInOut: true,
    motivationalAudio: true,
  });

  const genres = [
    { id: 'all', label: 'Todos', icon: 'grid' },
    { id: 'metal', label: 'Metal', icon: 'flame' },
    { id: 'edm', label: 'EDM', icon: 'flash' },
    { id: 'hip-hop', label: 'Hip-Hop', icon: 'musical-notes' },
    { id: 'latin', label: 'Latino', icon: 'heart' },
    { id: 'pop', label: 'Pop', icon: 'star' },
  ];

  const togglePlaylist = (id: string) => {
    setPlaylists(
      playlists.map((playlist) => ({
        ...playlist,
        isPlaying: playlist.id === id ? !playlist.isPlaying : false,
      }))
    );
  };

  const playPlaylist = (playlist: Playlist) => {
    togglePlaylist(playlist.id);
    Alert.alert(
      `🎵 ${playlist.name}`,
      `${playlist.tracks} canciones • ${playlist.duration} min\nBPM promedio: ${playlist.bpm}\n\n${playlist.description}`,
      [
        { text: 'Reproducir' },
        { text: 'Agregar a Cola' },
        { text: 'Compartir' },
        { text: 'Cerrar', style: 'cancel' },
      ]
    );
  };

  const createPlaylist = () => {
    Alert.alert(
      'Nueva Playlist',
      '¿Cómo quieres crear tu playlist?',
      [
        { text: 'Por Tipo de Entrenamiento' },
        { text: 'Por BPM Target' },
        { text: 'Manual (Seleccionar Canciones)' },
        { text: 'Generar con IA' },
        { text: 'Cancelar', style: 'cancel' },
      ]
    );
  };

  const connectSpotify = () => {
    Alert.alert(
      'Conectar Spotify',
      'Sincroniza tus playlists de Spotify para controlarlas desde la app',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Conectar', onPress: () => Alert.alert('Conectado', 'OAuth flow simulado') },
      ]
    );
  };

  const filteredPlaylists = selectedGenre === 'all'
    ? playlists
    : playlists.filter((p) => p.genre === selectedGenre);

  const nowPlaying = playlists.find((p) => p.isPlaying);

  return (
    <View className="flex-1 bg-zinc-950">
      {/* Header */}
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1 ml-3">
            Música de Entrenamiento
          </Text>
          <TouchableOpacity onPress={createPlaylist}>
            <Ionicons name="add-circle-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Now Playing */}
        {nowPlaying && (
          <View className="bg-gradient-to-br from-emerald-500 to-blue-500 rounded-xl p-4 mb-4">
            <View className="flex-row items-center justify-between mb-2">
              <View className="flex-1">
                <Text className="text-white/80 text-xs mb-1">REPRODUCIENDO AHORA</Text>
                <Text className="text-white font-bold text-xl mb-1">
                  {nowPlaying.name}
                </Text>
                <Text className="text-white/80 text-sm">
                  {nowPlaying.tracks} canciones • {nowPlaying.bpm} BPM
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => togglePlaylist(nowPlaying.id)}
                className="bg-white/20 rounded-full p-3"
              >
                <Ionicons name="pause" size={28} color="white" />
              </TouchableOpacity>
            </View>
            <View className="bg-white/20 h-1.5 rounded-full overflow-hidden">
              <View className="h-full bg-white rounded-full w-3/4" />
            </View>
          </View>
        )}

        {/* Spotify Connect */}
        <TouchableOpacity
          onPress={connectSpotify}
          className="bg-emerald-500 rounded-xl p-3 mb-4"
        >
          <View className="flex-row items-center justify-center">
            <Ionicons name="musical-notes" size={20} color="white" />
            <Text className="text-white font-bold ml-2">
              Conectar Spotify / Apple Music
            </Text>
          </View>
        </TouchableOpacity>

        {/* Genre Filter */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row gap-2">
            {genres.map((genre) => (
              <TouchableOpacity
                key={genre.id}
                onPress={() => setSelectedGenre(genre.id)}
                className={`flex-row items-center px-4 py-2 rounded-lg ${
                  selectedGenre === genre.id
                    ? 'bg-emerald-500'
                    : 'bg-zinc-900 border border-zinc-800'
                }`}
              >
                <Ionicons
                  name={genre.icon as any}
                  size={18}
                  color={selectedGenre === genre.id ? 'white' : '#71717A'}
                />
                <Text
                  className={`ml-2 font-semibold text-sm ${
                    selectedGenre === genre.id ? 'text-white' : 'text-zinc-400'
                  }`}
                >
                  {genre.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          <Text className="text-white font-bold text-lg mb-3">
            Playlists ({filteredPlaylists.length})
          </Text>

          {filteredPlaylists.map((playlist) => (
            <TouchableOpacity
              key={playlist.id}
              onPress={() => playPlaylist(playlist)}
              className={`bg-zinc-900 rounded-xl p-4 mb-3 border-2 ${
                playlist.isPlaying ? 'border-emerald-500' : 'border-zinc-800'
              }`}
            >
              <View className="flex-row items-center mb-3">
                <View
                  className="w-20 h-20 rounded-lg items-center justify-center"
                  style={{ backgroundColor: playlist.coverColor }}
                >
                  <Ionicons name="musical-notes" size={32} color="white" />
                </View>
                <View className="ml-3 flex-1">
                  <Text className="text-white font-bold text-lg mb-1">
                    {playlist.name}
                  </Text>
                  <Text className="text-zinc-400 text-sm mb-2">
                    {playlist.description}
                  </Text>
                  <View className="flex-row gap-2">
                    <View
                      className="px-3 py-1 rounded-full"
                      style={{ backgroundColor: playlist.coverColor + '30' }}
                    >
                      <Text
                        className="text-xs font-bold uppercase"
                        style={{ color: playlist.coverColor }}
                      >
                        {playlist.genre}
                      </Text>
                    </View>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={(e) => {
                    e.stopPropagation();
                    togglePlaylist(playlist.id);
                  }}
                  className={`${
                    playlist.isPlaying ? 'bg-emerald-500' : 'bg-zinc-800'
                  } rounded-full p-3`}
                >
                  <Ionicons
                    name={playlist.isPlaying ? 'pause' : 'play'}
                    size={24}
                    color="white"
                  />
                </TouchableOpacity>
              </View>

              <View className="flex-row gap-2 mb-3">
                <View className="flex-1 bg-zinc-800 rounded-lg p-2">
                  <Text className="text-zinc-400 text-xs">Canciones</Text>
                  <Text className="text-white font-bold">{playlist.tracks}</Text>
                </View>
                <View className="flex-1 bg-zinc-800 rounded-lg p-2">
                  <Text className="text-zinc-400 text-xs">Duración</Text>
                  <Text className="text-white font-bold">{playlist.duration} min</Text>
                </View>
                <View className="flex-1 bg-zinc-800 rounded-lg p-2">
                  <Text className="text-zinc-400 text-xs">BPM</Text>
                  <Text className="text-white font-bold">{playlist.bpm}</Text>
                </View>
              </View>

              <View className="bg-zinc-800 rounded-lg p-3">
                <Text className="text-zinc-400 text-xs mb-2">
                  Recomendado para:
                </Text>
                <View className="flex-row flex-wrap gap-2">
                  {playlist.workoutType.map((type, index) => (
                    <View key={index} className="bg-zinc-700 px-3 py-1 rounded-full">
                      <Text className="text-zinc-300 text-xs">{type}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Music Settings */}
        <View className="px-6 pt-4">
          <Text className="text-white font-bold text-lg mb-3">
            Configuración de Música
          </Text>

          <View className="bg-zinc-900 rounded-xl p-4 border border-zinc-800 mb-4">
            <View className="flex-row items-center justify-between mb-4">
              <View className="flex-1">
                <Text className="text-white font-bold mb-1">Auto-Play</Text>
                <Text className="text-zinc-400 text-sm">
                  Inicia música al comenzar workout
                </Text>
              </View>
              <Switch
                value={settings.autoPlay}
                onValueChange={(value) =>
                  setSettings({ ...settings, autoPlay: value })
                }
                trackColor={{ false: '#3F3F46', true: '#10B981' }}
                thumbColor={settings.autoPlay ? '#fff' : '#D4D4D8'}
              />
            </View>

            <View className="flex-row items-center justify-between mb-4 border-t border-zinc-800 pt-4">
              <View className="flex-1">
                <Text className="text-white font-bold mb-1">BPM Sync</Text>
                <Text className="text-zinc-400 text-sm">
                  Adapta tempo a tu ritmo de ejercicio
                </Text>
              </View>
              <Switch
                value={settings.bpmSync}
                onValueChange={(value) =>
                  setSettings({ ...settings, bpmSync: value })
                }
                trackColor={{ false: '#3F3F46', true: '#10B981' }}
                thumbColor={settings.bpmSync ? '#fff' : '#D4D4D8'}
              />
            </View>

            <View className="flex-row items-center justify-between mb-4 border-t border-zinc-800 pt-4">
              <View className="flex-1">
                <Text className="text-white font-bold mb-1">Fade In/Out</Text>
                <Text className="text-zinc-400 text-sm">
                  Transiciones suaves entre canciones
                </Text>
              </View>
              <Switch
                value={settings.fadeInOut}
                onValueChange={(value) =>
                  setSettings({ ...settings, fadeInOut: value })
                }
                trackColor={{ false: '#3F3F46', true: '#10B981' }}
                thumbColor={settings.fadeInOut ? '#fff' : '#D4D4D8'}
              />
            </View>

            <View className="flex-row items-center justify-between border-t border-zinc-800 pt-4">
              <View className="flex-1">
                <Text className="text-white font-bold mb-1">Audio Motivacional</Text>
                <Text className="text-zinc-400 text-sm">
                  Mensajes de ánimo durante el workout
                </Text>
              </View>
              <Switch
                value={settings.motivationalAudio}
                onValueChange={(value) =>
                  setSettings({ ...settings, motivationalAudio: value })
                }
                trackColor={{ false: '#3F3F46', true: '#10B981' }}
                thumbColor={settings.motivationalAudio ? '#fff' : '#D4D4D8'}
              />
            </View>
          </View>
        </View>

        {/* Info Card */}
        <View className="px-6 pb-6">
          <View className="bg-blue-500/10 rounded-xl p-4 border border-blue-500/30">
            <View className="flex-row items-start">
              <Ionicons name="information-circle" size={20} color="#3B82F6" />
              <View className="flex-1 ml-3">
                <Text className="text-blue-400 font-bold mb-2">
                  Música = Rendimiento
                </Text>
                <Text className="text-blue-300 text-sm">
                  Estudios muestran que la música con BPM adecuado puede mejorar tu rendimiento hasta 15%. Selecciona playlists según tu tipo de entrenamiento.
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
