import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface ProgressPhoto {
  id: string;
  date: Date;
  weight: number;
  bodyFat?: number;
  notes?: string;
  photos: {
    front?: string;
    side?: string;
    back?: string;
  };
}

interface Measurement {
  chest: number;
  waist: number;
  hips: number;
  bicep: number;
  thigh: number;
}

const MOCK_PHOTOS: ProgressPhoto[] = [
  {
    id: '1',
    date: new Date(2026, 0, 27),
    weight: 75,
    bodyFat: 15,
    notes: 'DespuÃ©s de 8 semanas de cut',
    photos: {
      front: 'https://via.placeholder.com/300x400/10b981/ffffff?text=Front',
      side: 'https://via.placeholder.com/300x400/3b82f6/ffffff?text=Side',
      back: 'https://via.placeholder.com/300x400/ef4444/ffffff?text=Back',
    },
  },
  {
    id: '2',
    date: new Date(2025, 11, 1),
    weight: 78,
    bodyFat: 17,
    notes: 'Inicio de cut, peso mÃ¡ximo',
    photos: {
      front: 'https://via.placeholder.com/300x400/71717a/ffffff?text=Front',
      side: 'https://via.placeholder.com/300x400/71717a/ffffff?text=Side',
    },
  },
  {
    id: '3',
    date: new Date(2025, 9, 15),
    weight: 72,
    bodyFat: 18,
    notes: 'Fin de mantenimiento',
    photos: {
      front: 'https://via.placeholder.com/300x400/71717a/ffffff?text=Front',
    },
  },
];

export default function ProgressPhotos() {
  const [photos, setPhotos] = useState(MOCK_PHOTOS);
  const [selectedPhoto, setSelectedPhoto] = useState<ProgressPhoto | null>(null);
  const [compareMode, setCompareMode] = useState(false);
  const [comparePhotos, setComparePhotos] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'timeline'>('timeline');

  const addPhoto = () => {
    Alert.alert(
      'AÃ±adir Foto de Progreso',
      'Esta funciÃ³n abrirÃ­a la cÃ¡mara o galerÃ­a',
      [
        { text: 'CÃ¡mara' },
        { text: 'GalerÃ­a' },
        { text: 'Cancelar' },
      ]
    );
  };

  const deletePhoto = (id: string) => {
    Alert.alert(
      'Eliminar Foto',
      'Â¿EstÃ¡s seguro? Esta acciÃ³n no se puede deshacer.',
      [
        { text: 'Cancelar' },
        { text: 'Eliminar', style: 'destructive', onPress: () => setPhotos(photos.filter((p) => p.id !== id)) },
      ]
    );
  };

  const toggleCompare = (photoId: string) => {
    if (comparePhotos.includes(photoId)) {
      setComparePhotos(comparePhotos.filter((id) => id !== photoId));
    } else {
      if (comparePhotos.length < 2) {
        setComparePhotos([...comparePhotos, photoId]);
      } else {
        Alert.alert('MÃ¡ximo 2 fotos', 'Solo puedes comparar 2 fotos a la vez');
      }
    }
  };

  const getWeightChange = (): { value: number; isGain: boolean } | null => {
    if (photos.length < 2) return null;
    const sorted = [...photos].sort((a, b) => b.date.getTime() - a.date.getTime());
    const latest = sorted[0];
    const oldest = sorted[sorted.length - 1];
    const change = latest.weight - oldest.weight;
    return { value: Math.abs(change), isGain: change > 0 };
  };

  const getBodyFatChange = (): { value: number; isGain: boolean } | null => {
    const photosWithBF = photos.filter((p) => p.bodyFat !== undefined);
    if (photosWithBF.length < 2) return null;
    const sorted = [...photosWithBF].sort((a, b) => b.date.getTime() - a.date.getTime());
    const latest = sorted[0];
    const oldest = sorted[sorted.length - 1];
    const change = latest.bodyFat! - oldest.bodyFat!;
    return { value: Math.abs(change), isGain: change > 0 };
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
            Progress Photos
          </Text>
          <TouchableOpacity onPress={addPhoto}>
            <Ionicons name="camera" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* View Mode Toggle */}
        <View className="flex-row gap-2 mb-3">
          <TouchableOpacity
            onPress={() => setViewMode('timeline')}
            className={`flex-1 rounded-lg p-2 ${viewMode === 'timeline' ? 'bg-primary' : 'bg-zinc-900 border border-zinc-800'}`}
          >
            <Text className={`text-center font-bold ${viewMode === 'timeline' ? 'text-white' : 'text-zinc-400'}`}>
              Timeline
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setViewMode('grid')}
            className={`flex-1 rounded-lg p-2 ${viewMode === 'grid' ? 'bg-primary' : 'bg-zinc-900 border border-zinc-800'}`}
          >
            <Text className={`text-center font-bold ${viewMode === 'grid' ? 'text-white' : 'text-zinc-400'}`}>
              Grid
            </Text>
          </TouchableOpacity>
        </View>

        {/* Compare Mode Toggle */}
        <TouchableOpacity
          onPress={() => { setCompareMode(!compareMode); setComparePhotos([]); }}
          className={`rounded-lg p-3 ${compareMode ? 'bg-primary' : 'bg-zinc-900 border border-zinc-800'}`}
        >
          <View className="flex-row items-center justify-center">
            <Ionicons name="git-compare" size={20} color={compareMode ? 'white' : '#71717A'} />
            <Text className={`ml-2 font-bold ${compareMode ? 'text-white' : 'text-zinc-400'}`}>
              {compareMode ? `Comparar (${comparePhotos.length}/2)` : 'Modo ComparaciÃ³n'}
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          {/* Stats Summary */}
          <View className="bg-zinc-900 rounded-xl p-4 mb-6 border border-zinc-800">
            <Text className="text-white font-bold text-lg mb-3">Progreso Total</Text>
            <View className="flex-row justify-between">
              <View className="items-center">
                <Text className="text-zinc-400 text-xs mb-1">Fotos</Text>
                <Text className="text-white text-2xl font-bold">{photos.length}</Text>
              </View>
              {getWeightChange() && (
                <View className="items-center">
                  <Text className="text-zinc-400 text-xs mb-1">Peso</Text>
                  <View className="flex-row items-center">
                    <Ionicons
                      name={getWeightChange()!.isGain ? 'arrow-up' : 'arrow-down'}
                      size={20}
                      color={getWeightChange()!.isGain ? '#EF4444' : '#9D12DE'}
                    />
                    <Text className={`text-2xl font-bold ${getWeightChange()!.isGain ? 'text-red-400' : 'text-primary'}`}>
                      {getWeightChange()!.value.toFixed(1)}kg
                    </Text>
                  </View>
                </View>
              )}
              {getBodyFatChange() && (
                <View className="items-center">
                  <Text className="text-zinc-400 text-xs mb-1">Grasa</Text>
                  <View className="flex-row items-center">
                    <Ionicons
                      name={getBodyFatChange()!.isGain ? 'arrow-up' : 'arrow-down'}
                      size={20}
                      color={getBodyFatChange()!.isGain ? '#EF4444' : '#9D12DE'}
                    />
                    <Text className={`text-2xl font-bold ${getBodyFatChange()!.isGain ? 'text-red-400' : 'text-primary'}`}>
                      {getBodyFatChange()!.value.toFixed(1)}%
                    </Text>
                  </View>
                </View>
              )}
            </View>
          </View>

          {/* Compare View */}
          {compareMode && comparePhotos.length === 2 && (
            <View className="bg-zinc-900 rounded-xl p-4 mb-6 border border-primary">
              <Text className="text-white font-bold text-lg mb-3">ComparaciÃ³n</Text>
              <View className="flex-row gap-2">
                {comparePhotos.map((photoId) => {
                  const photo = photos.find((p) => p.id === photoId);
                  if (!photo) return null;
                  return (
                    <View key={photoId} className="flex-1">
                      <Image
                        source={{ uri: photo.photos.front || 'https://via.placeholder.com/150x200' }}
                        className="w-full h-60 rounded-lg mb-2"
                        resizeMode="cover"
                      />
                      <Text className="text-white font-bold text-center">
                        {format(photo.date, "d MMM yyyy", { locale: es })}
                      </Text>
                      <Text className="text-zinc-400 text-sm text-center">
                        {photo.weight}kg {photo.bodyFat && `â€¢ ${photo.bodyFat}% BF`}
                      </Text>
                    </View>
                  );
                })}
              </View>
            </View>
          )}

          {/* Photos List/Grid */}
          {viewMode === 'timeline' ? (
            photos.sort((a, b) => b.date.getTime() - a.date.getTime()).map((photo) => (
              <View
                key={photo.id}
                className={`bg-zinc-900 rounded-xl p-4 mb-4 border ${
                  compareMode && comparePhotos.includes(photo.id)
                    ? 'border-primary'
                    : 'border-zinc-800'
                }`}
              >
                <View className="flex-row items-center justify-between mb-3">
                  <View>
                    <Text className="text-white font-bold text-lg">
                      {format(photo.date, "d 'de' MMMM, yyyy", { locale: es })}
                    </Text>
                    <View className="flex-row items-center mt-1">
                      <Text className="text-primary font-bold mr-3">{photo.weight} kg</Text>
                      {photo.bodyFat && (
                        <Text className="text-primary/80 font-bold">{photo.bodyFat}% BF</Text>
                      )}
                    </View>
                  </View>
                  <View className="flex-row gap-2">
                    {compareMode && (
                      <TouchableOpacity
                        onPress={() => toggleCompare(photo.id)}
                        className={`w-10 h-10 rounded-full items-center justify-center ${
                          comparePhotos.includes(photo.id) ? 'bg-primary' : 'bg-zinc-800'
                        }`}
                      >
                        <Ionicons
                          name={comparePhotos.includes(photo.id) ? 'checkmark' : 'add'}
                          size={20}
                          color="white"
                        />
                      </TouchableOpacity>
                    )}
                    <TouchableOpacity onPress={() => deletePhoto(photo.id)}>
                      <Ionicons name="trash" size={20} color="#EF4444" />
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Photo Grid */}
                <View className="flex-row gap-2 mb-3">
                  {photo.photos.front && (
                    <Image
                      source={{ uri: photo.photos.front }}
                      className="flex-1 h-48 rounded-lg"
                      resizeMode="cover"
                    />
                  )}
                  {photo.photos.side && (
                    <Image
                      source={{ uri: photo.photos.side }}
                      className="flex-1 h-48 rounded-lg"
                      resizeMode="cover"
                    />
                  )}
                  {photo.photos.back && (
                    <Image
                      source={{ uri: photo.photos.back }}
                      className="flex-1 h-48 rounded-lg"
                      resizeMode="cover"
                    />
                  )}
                </View>

                {/* Notes */}
                {photo.notes && (
                  <View className="bg-zinc-800 rounded-lg p-3">
                    <Text className="text-zinc-300 text-sm">{photo.notes}</Text>
                  </View>
                )}
              </View>
            ))
          ) : (
            <View className="flex-row flex-wrap gap-2 mb-6">
              {photos.map((photo) => (
                <TouchableOpacity
                  key={photo.id}
                  onPress={() => compareMode ? toggleCompare(photo.id) : setSelectedPhoto(photo)}
                  className={`w-[49%] border ${
                    compareMode && comparePhotos.includes(photo.id)
                      ? 'border-primary'
                      : 'border-zinc-800'
                  } rounded-lg overflow-hidden`}
                >
                  <Image
                    source={{ uri: photo.photos.front || 'https://via.placeholder.com/150x200' }}
                    className="w-full h-48"
                    resizeMode="cover"
                  />
                  <View className="bg-zinc-900 p-2">
                    <Text className="text-white font-bold text-sm">
                      {format(photo.date, "d MMM", { locale: es })}
                    </Text>
                    <Text className="text-zinc-400 text-xs">{photo.weight}kg</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Tips */}
          <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-6">
            <View className="flex-row items-start">
              <Ionicons name="camera" size={20} color="#9D12DE" />
              <View className="flex-1 ml-3">
                <Text className="text-primary/80 font-bold mb-2">
                  Tips para Fotos de Progreso
                </Text>
                <Text className="text-primary/60 text-sm">
                  â€¢ Misma iluminaciÃ³n cada vez{'\n'}
                  â€¢ Misma hora del dÃ­a (maÃ±ana en ayunas){'\n'}
                  â€¢ Misma postura y Ã¡ngulos{'\n'}
                  â€¢ Cada 2-4 semanas es suficiente{'\n'}
                  â€¢ RelÃ¡jate, no poses
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

