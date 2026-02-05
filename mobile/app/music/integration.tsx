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
  source: 'spotify' | 'apple' | 'youtube' | 'local';
  songs: number;
  duration: number;
  genre: string;
  recommended: boolean;
}

interface WorkoutMusicPreset {
  id: string;
  name: string;
  description: string;
  intensity: 'baja' | 'media' | 'alta';
  bpm: number;
  icon: string;
}

const PLAYLISTS: Playlist[] = [
  {
    id: '1',
    name: 'Beast Mode ðŸ”¥',
    source: 'spotify',
    songs: 45,
    duration: 180,
    genre: 'Rock/Metal',
    recommended: true,
  },
  {
    id: '2',
    name: 'Cardio Hits',
    source: 'spotify',
    songs: 32,
    duration: 120,
    genre: 'EDM',
    recommended: true,
  },
  {
    id: '3',
    name: 'Power Lifting',
    source: 'apple',
    songs: 28,
    duration: 95,
    genre: 'Hip Hop',
    recommended: false,
  },
];

const PRESETS: WorkoutMusicPreset[] = [
  {
    id: '1',
    name: 'Fuerza MÃ¡xima',
    description: 'Metal y Rock pesado para levantamientos intensos',
    intensity: 'alta',
    bpm: 140,
    icon: 'âš¡',
  },
  {
    id: '2',
    name: 'Hipertrofia',
    description: 'Ritmo constante para series de volumen',
    intensity: 'media',
    bpm: 125,
    icon: 'ðŸ’ª',
  },
  {
    id: '3',
    name: 'Cardio HIIT',
    description: 'EDM energÃ©tico para intervalos',
    intensity: 'alta',
    bpm: 150,
    icon: 'ðŸ”¥',
  },
  {
    id: '4',
    name: 'Movilidad',
    description: 'MÃºsica relajante para estiramientos',
    intensity: 'baja',
    bpm: 80,
    icon: 'ðŸ§˜',
  },
];

export default function WorkoutMusic() {
  const [musicEnabled, setMusicEnabled] = useState(true);
  const [autoPlay, setAutoPlay] = useState(true);
  const [adaptiveBPM, setAdaptiveBPM] = useState(false);
  const [selectedPlaylist, setSelectedPlaylist] = useState<string | null>(null);

  const getSourceColor = (source: string) => {
    switch (source) {
      case 'spotify':
        return '#1DB954';
      case 'apple':
        return '#FC3C44';
      case 'youtube':
        return '#FF0000';
      case 'local':
        return '#71717A';
      default:
        return '#71717A';
    }
  };

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'spotify':
        return 'logo-spotify';
      case 'apple':
        return 'logo-apple';
      case 'youtube':
        return 'logo-youtube';
      case 'local':
        return 'phone-portrait';
      default:
        return 'musical-notes';
    }
  };

  const getIntensityColor = (intensity: string) => {
    switch (intensity) {
      case 'baja':
        return '#9D12DE';
      case 'media':
        return '#FFEA00';
      case 'alta':
        return '#EF4444';
      default:
        return '#71717A';
    }
  };

  const connectService = (service: string) => {
    Alert.alert(
      `Conectar ${service}`,
      'Esta funciÃ³n requiere autenticaciÃ³n con el servicio',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Conectar',
          onPress: () => {
            Alert.alert('Â¡Conectado!', `${service} vinculado exitosamente`);
          },
        },
      ]
    );
  };

  const playPlaylist = (playlist: Playlist) => {
    Alert.alert(
      'Reproducir Playlist',
      `${playlist.name}\n\n${playlist.songs} canciones â€¢ ${playlist.duration} min`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Reproducir',
          onPress: () => {
            setSelectedPlaylist(playlist.id);
            Alert.alert('Reproduciendo', `ðŸŽµ ${playlist.name}`);
          },
        },
      ]
    );
  };

  const applyPreset = (preset: WorkoutMusicPreset) => {
    Alert.alert(
      preset.name,
      `${preset.description}\n\nBPM: ${preset.bpm}\nIntensidad: ${preset.intensity}`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Aplicar',
          onPress: () => {
            Alert.alert('Preset Aplicado', `La mÃºsica se adaptarÃ¡ a ${preset.name}`);
          },
        },
      ]
    );
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
            MÃºsica de Entrenamiento
          </Text>
          <TouchableOpacity>
            <Ionicons name="settings-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Music Toggle */}
        <View className="bg-zinc-900 rounded-xl p-4 border border-zinc-800">
          <View className="flex-row items-center justify-between">
            <View className="flex-1">
              <Text className="text-white font-bold">MÃºsica AutomÃ¡tica</Text>
              <Text className="text-zinc-400 text-sm mt-1">
                Reproduce mÃºsica durante entrenamientos
              </Text>
            </View>
            <Switch
              value={musicEnabled}
              onValueChange={setMusicEnabled}
              trackColor={{ false: '#27272A', true: '#9D12DE' }}
              thumbColor="white"
            />
          </View>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Music Services */}
        <View className="px-6 pt-6">
          <Text className="text-white font-bold text-lg mb-3">
            Servicios de MÃºsica
          </Text>

          <View className="flex-row gap-3 mb-6">
            <TouchableOpacity
              onPress={() => connectService('Spotify')}
              className="flex-1 bg-zinc-900 rounded-xl p-4 border border-zinc-800"
            >
              <View className="items-center">
                <View className="bg-primary/20 rounded-full p-3 mb-2">
                  <Ionicons name="logo-spotify" size={24} color="#1DB954" />
                </View>
                <Text className="text-white font-semibold text-sm">Spotify</Text>
                <Text className="text-primary text-xs mt-1">Conectado</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => connectService('Apple Music')}
              className="flex-1 bg-zinc-900 rounded-xl p-4 border border-zinc-800"
            >
              <View className="items-center">
                <View className="bg-red-500/20 rounded-full p-3 mb-2">
                  <Ionicons name="logo-apple" size={24} color="#FC3C44" />
                </View>
                <Text className="text-white font-semibold text-sm">Apple</Text>
                <Text className="text-zinc-500 text-xs mt-1">Conectar</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => connectService('YouTube Music')}
              className="flex-1 bg-zinc-900 rounded-xl p-4 border border-zinc-800"
            >
              <View className="items-center">
                <View className="bg-red-500/20 rounded-full p-3 mb-2">
                  <Ionicons name="logo-youtube" size={24} color="#FF0000" />
                </View>
                <Text className="text-white font-semibold text-sm">YouTube</Text>
                <Text className="text-zinc-500 text-xs mt-1">Conectar</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Presets */}
          <Text className="text-white font-bold text-lg mb-3">
            Presets de Entrenamiento
          </Text>

          <View className="grid grid-cols-2 gap-3 mb-6">
            {PRESETS.map((preset) => (
              <TouchableOpacity
                key={preset.id}
                onPress={() => applyPreset(preset)}
                className="bg-zinc-900 rounded-xl p-4 border border-zinc-800 mb-3"
              >
                <View className="flex-row items-center mb-2">
                  <Text className="text-3xl mr-2">{preset.icon}</Text>
                  <View
                    className="px-2 py-1 rounded"
                    style={{ backgroundColor: getIntensityColor(preset.intensity) + '20' }}
                  >
                    <Text
                      className="text-xs font-bold capitalize"
                      style={{ color: getIntensityColor(preset.intensity) }}
                    >
                      {preset.intensity}
                    </Text>
                  </View>
                </View>
                <Text className="text-white font-bold mb-1">{preset.name}</Text>
                <Text className="text-zinc-400 text-xs mb-2">
                  {preset.description}
                </Text>
                <View className="flex-row items-center">
                  <Ionicons name="pulse" size={14} color="#71717A" />
                  <Text className="text-zinc-500 text-xs ml-1">
                    {preset.bpm} BPM
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Playlists */}
          <Text className="text-white font-bold text-lg mb-3">
            Mis Playlists
          </Text>

          {PLAYLISTS.map((playlist) => (
            <TouchableOpacity
              key={playlist.id}
              onPress={() => playPlaylist(playlist)}
              className={`bg-zinc-900 rounded-xl p-4 mb-3 border ${
                selectedPlaylist === playlist.id
                  ? 'border-primary'
                  : 'border-zinc-800'
              }`}
            >
              <View className="flex-row items-center justify-between mb-2">
                <View className="flex-1">
                  <View className="flex-row items-center mb-2">
                    <Ionicons
                      name={getSourceIcon(playlist.source) as any}
                      size={20}
                      color={getSourceColor(playlist.source)}
                    />
                    <Text className="text-white font-bold ml-2 flex-1">
                      {playlist.name}
                    </Text>
                  </View>
                  <Text className="text-zinc-400 text-sm">{playlist.genre}</Text>
                </View>
                {playlist.recommended && (
                  <View className="bg-amber-500/20 px-3 py-1 rounded-full">
                    <Text className="text-amber-500 text-xs font-bold">
                      RECOMENDADA
                    </Text>
                  </View>
                )}
              </View>

              <View className="flex-row items-center justify-between pt-3 border-t border-zinc-800">
                <View className="flex-row gap-4">
                  <View className="flex-row items-center">
                    <Ionicons name="musical-notes" size={14} color="#71717A" />
                    <Text className="text-zinc-400 text-sm ml-1">
                      {playlist.songs} canciones
                    </Text>
                  </View>
                  <View className="flex-row items-center">
                    <Ionicons name="time" size={14} color="#71717A" />
                    <Text className="text-zinc-400 text-sm ml-1">
                      {playlist.duration} min
                    </Text>
                  </View>
                </View>
                {selectedPlaylist === playlist.id ? (
                  <Ionicons name="pause-circle" size={24} color="#9D12DE" />
                ) : (
                  <Ionicons name="play-circle" size={24} color="white" />
                )}
              </View>
            </TouchableOpacity>
          ))}

          {/* Settings */}
          <Text className="text-white font-bold text-lg mb-3 mt-4">
            ConfiguraciÃ³n
          </Text>

          <View className="bg-zinc-900 rounded-xl p-4 mb-3 border border-zinc-800">
            <View className="flex-row items-center justify-between">
              <View className="flex-1">
                <Text className="text-white font-semibold">ReproducciÃ³n AutomÃ¡tica</Text>
                <Text className="text-zinc-400 text-sm mt-1">
                  Inicia mÃºsica al comenzar entrenamiento
                </Text>
              </View>
              <Switch
                value={autoPlay}
                onValueChange={setAutoPlay}
                trackColor={{ false: '#27272A', true: '#9D12DE' }}
                thumbColor="white"
              />
            </View>
          </View>

          <View className="bg-zinc-900 rounded-xl p-4 mb-3 border border-zinc-800">
            <View className="flex-row items-center justify-between">
              <View className="flex-1">
                <Text className="text-white font-semibold">BPM Adaptativo</Text>
                <Text className="text-zinc-400 text-sm mt-1">
                  Ajusta el tempo segÃºn ejercicio actual
                </Text>
              </View>
              <Switch
                value={adaptiveBPM}
                onValueChange={setAdaptiveBPM}
                trackColor={{ false: '#27272A', true: '#9D12DE' }}
                thumbColor="white"
              />
            </View>
          </View>

          {/* Info */}
          <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-6">
            <View className="flex-row items-start">
              <Ionicons name="information-circle" size={20} color="#9D12DE" />
              <View className="flex-1 ml-3">
                <Text className="text-primary/80 font-bold mb-2">
                  Â¿CÃ³mo funciona?
                </Text>
                <Text className="text-primary/60 text-sm mb-2">
                  â€¢ La mÃºsica se sincroniza con tus entrenamientos
                </Text>
                <Text className="text-primary/60 text-sm mb-2">
                  â€¢ Presets optimizados para cada tipo de ejercicio
                </Text>
                <Text className="text-primary/60 text-sm">
                  â€¢ IntegraciÃ³n con Spotify, Apple Music y YouTube Music
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

