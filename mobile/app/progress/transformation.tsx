import React, { useState } from 'react';
import { Text } from '@/components/ui/Text';
import { View, TouchableOpacity, ScrollView, Image, Alert, Dimensions } from 'react-native';;
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const screenWidth = Dimensions.get('window').width;

interface ProgressPhoto {
  id: string;
  date: string;
  weight: number;
  bodyFat?: number;
  angle: 'frontal' | 'lateral' | 'posterior';
  notes?: string;
  thumbnail: string;
}

interface Comparison {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  startWeight: number;
  endWeight: number;
  weightChange: number;
  bodyFatChange?: number;
  photos: {
    before: string;
    after: string;
  };
}

const PROGRESS_PHOTOS: ProgressPhoto[] = [
  {
    id: '1',
    date: '2025-01-01',
    weight: 78.5,
    bodyFat: 18.2,
    angle: 'frontal',
    notes: 'Inicio de volumen',
    thumbnail: 'https://via.placeholder.com/200x300/18181B/FFFFFF?text=Ene+1',
  },
  {
    id: '2',
    date: '2025-01-15',
    weight: 80.2,
    bodyFat: 17.8,
    angle: 'frontal',
    notes: 'Semana 2 - buen progreso',
    thumbnail: 'https://via.placeholder.com/200x300/18181B/FFFFFF?text=Ene+15',
  },
  {
    id: '3',
    date: '2025-01-27',
    weight: 82.1,
    bodyFat: 17.5,
    angle: 'frontal',
    notes: 'Mes 1 completado',
    thumbnail: 'https://via.placeholder.com/200x300/18181B/FFFFFF?text=Ene+27',
  },
  {
    id: '4',
    date: '2025-01-01',
    weight: 78.5,
    bodyFat: 18.2,
    angle: 'lateral',
    thumbnail: 'https://via.placeholder.com/200x300/18181B/FFFFFF?text=Lateral',
  },
  {
    id: '5',
    date: '2025-01-01',
    weight: 78.5,
    bodyFat: 18.2,
    angle: 'posterior',
    thumbnail: 'https://via.placeholder.com/200x300/18181B/FFFFFF?text=Espalda',
  },
];

const COMPARISONS: Comparison[] = [
  {
    id: '1',
    name: 'Transformación 90 Días',
    startDate: '2024-10-01',
    endDate: '2025-01-01',
    startWeight: 85.0,
    endWeight: 78.5,
    weightChange: -6.5,
    bodyFatChange: -4.2,
    photos: {
      before: 'https://via.placeholder.com/200x300/18181B/FFFFFF?text=Antes',
      after: 'https://via.placeholder.com/200x300/18181B/FFFFFF?text=Despues',
    },
  },
  {
    id: '2',
    name: 'Volumen Enero',
    startDate: '2025-01-01',
    endDate: '2025-01-27',
    startWeight: 78.5,
    endWeight: 82.1,
    weightChange: +3.6,
    bodyFatChange: -0.7,
    photos: {
      before: 'https://via.placeholder.com/200x300/18181B/FFFFFF?text=Ene+1',
      after: 'https://via.placeholder.com/200x300/18181B/FFFFFF?text=Ene+27',
    },
  },
];

export default function BodyTransformation() {
  const [selectedTab, setSelectedTab] = useState<'timeline' | 'comparisons' | 'angles'>('timeline');
  const [selectedAngle, setSelectedAngle] = useState<'frontal' | 'lateral' | 'posterior'>('frontal');

  const tabs = [
    { id: 'timeline' as const, label: 'Timeline', icon: 'time' },
    { id: 'comparisons' as const, label: 'Comparaciones', icon: 'git-compare' },
    { id: 'angles' as const, label: 'Ángulos', icon: 'camera' },
  ];

  const angles = [
    { id: 'frontal' as const, label: 'Frontal', icon: 'person' },
    { id: 'lateral' as const, label: 'Lateral', icon: 'swap-horizontal' },
    { id: 'posterior' as const, label: 'Posterior', icon: 'person-outline' },
  ];

  const takePhoto = () => {
    Alert.alert(
      'Nueva Foto de Progreso',
      'Selecciona el ángulo para la foto',
      [
        { text: 'Frontal', onPress: () => capturePhoto('frontal') },
        { text: 'Lateral', onPress: () => capturePhoto('lateral') },
        { text: 'Posterior', onPress: () => capturePhoto('posterior') },
        { text: 'Cancelar', style: 'cancel' },
      ]
    );
  };

  const capturePhoto = (angle: string) => {
    Alert.alert(
      'Capturar Foto',
      `Ángulo: ${angle}\n\nConsejos:\n• Usa la misma iluminación\n• Misma posición de cámara\n• Misma hora del día`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Tomar Foto',
          onPress: () => {
            Alert.alert('¡Foto Guardada!', 'Tu foto de progreso ha sido registrada');
          },
        },
      ]
    );
  };

  const createComparison = () => {
    Alert.alert(
      'Nueva Comparación',
      'Selecciona las fotos de antes y después para crear una comparación',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Seleccionar Fotos',
          onPress: () => {
            Alert.alert('¡Comparación Creada!', 'Las fotos han sido comparadas');
          },
        },
      ]
    );
  };

  const shareComparison = (comparison: Comparison) => {
    Alert.alert(
      'Compartir Transformación',
      `${comparison.name}\n\n${Math.abs(comparison.weightChange)} kg ${comparison.weightChange > 0 ? 'ganados' : 'perdidos'}`,
      [
        { text: 'Instagram Stories' },
        { text: 'WhatsApp' },
        { text: 'Guardar Imagen' },
        { text: 'Cancelar', style: 'cancel' },
      ]
    );
  };

  const filteredPhotosByAngle = PROGRESS_PHOTOS.filter((p) => p.angle === selectedAngle);

  return (
    <View className="flex-1 bg-zinc-950">
      {/* Header */}
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1 ml-3">
            Transformación Corporal
          </Text>
          <TouchableOpacity onPress={takePhoto}>
            <Ionicons name="camera" size={24} color="#9D12DE" />
          </TouchableOpacity>
        </View>

        {/* Stats Summary */}
        <View className="bg-gradient-to-br from-primary to-[#7D0EBE] rounded-xl p-4 mb-4">
          <View className="flex-row items-center justify-between">
            <View className="flex-1">
              <Text className="text-white/80 text-sm mb-1">Progreso Total</Text>
              <Text className="text-white font-bold text-3xl mb-1">
                +3.6 kg
              </Text>
              <Text className="text-white/80 text-sm">
                Últimos 27 días • -0.7% grasa
              </Text>
            </View>
            <View className="bg-white/20 rounded-full p-4">
              <Ionicons name="trending-up" size={32} color="white" />
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
        {/* Timeline Tab */}
        {selectedTab === 'timeline' && (
          <View className="px-6 pt-6">
            <Text className="text-white font-bold text-lg mb-3">
              Historial de Fotos ({PROGRESS_PHOTOS.length})
            </Text>

            {PROGRESS_PHOTOS.map((photo) => (
              <View
                key={photo.id}
                className="bg-zinc-900 rounded-xl overflow-hidden mb-4 border border-zinc-800"
              >
                <Image
                  source={{ uri: photo.thumbnail }}
                  style={{ width: '100%', height: 300 }}
                  resizeMode="cover"
                />
                
                <View className="p-4">
                  <View className="flex-row items-center justify-between mb-2">
                    <View className="flex-1">
                      <Text className="text-white font-bold text-lg mb-1">
                        {new Date(photo.date).toLocaleDateString('es-ES', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </Text>
                      <View className="flex-row items-center gap-3">
                        <View className="bg-primary/20 px-3 py-1 rounded-full">
                          <Text className="text-primary/80 text-xs font-bold capitalize">
                            {photo.angle}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>

                  <View className="flex-row gap-3 mb-3">
                    <View className="flex-1 bg-zinc-800 rounded-lg p-3">
                      <Text className="text-zinc-400 text-xs mb-1">Peso</Text>
                      <Text className="text-white font-bold text-lg">
                        {photo.weight} kg
                      </Text>
                    </View>
                    {photo.bodyFat && (
                      <View className="flex-1 bg-zinc-800 rounded-lg p-3">
                        <Text className="text-zinc-400 text-xs mb-1">Grasa Corporal</Text>
                        <Text className="text-amber-500 font-bold text-lg">
                          {photo.bodyFat}%
                        </Text>
                      </View>
                    )}
                  </View>

                  {photo.notes && (
                    <View className="bg-zinc-800 rounded-lg p-3">
                      <Text className="text-zinc-300 text-sm">{photo.notes}</Text>
                    </View>
                  )}
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Comparisons Tab */}
        {selectedTab === 'comparisons' && (
          <View className="px-6 pt-6">
            <View className="flex-row items-center justify-between mb-3">
              <Text className="text-white font-bold text-lg">
                Mis Comparaciones ({COMPARISONS.length})
              </Text>
              <TouchableOpacity onPress={createComparison}>
                <Ionicons name="add-circle" size={24} color="#9D12DE" />
              </TouchableOpacity>
            </View>

            {COMPARISONS.map((comparison) => (
              <View
                key={comparison.id}
                className="bg-zinc-900 rounded-xl overflow-hidden mb-4 border border-zinc-800"
              >
                {/* Photos Side by Side */}
                <View className="flex-row">
                  <View className="flex-1 relative">
                    <Image
                      source={{ uri: comparison.photos.before }}
                      style={{ width: '100%', height: 280 }}
                      resizeMode="cover"
                    />
                    <View className="absolute top-3 left-3 bg-black/60 px-3 py-1 rounded-full">
                      <Text className="text-white text-xs font-bold">ANTES</Text>
                    </View>
                  </View>
                  <View className="flex-1 relative">
                    <Image
                      source={{ uri: comparison.photos.after }}
                      style={{ width: '100%', height: 280 }}
                      resizeMode="cover"
                    />
                    <View className="absolute top-3 right-3 bg-primary px-3 py-1 rounded-full">
                      <Text className="text-white text-xs font-bold">DESPUÉS</Text>
                    </View>
                  </View>
                </View>

                <View className="p-4">
                  <Text className="text-white font-bold text-xl mb-2">
                    {comparison.name}
                  </Text>
                  
                  <View className="flex-row items-center gap-2 mb-3">
                    <Ionicons name="calendar-outline" size={14} color="#71717A" />
                    <Text className="text-zinc-400 text-sm">
                      {new Date(comparison.startDate).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}
                      {' → '}
                      {new Date(comparison.endDate).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}
                    </Text>
                  </View>

                  <View className="flex-row gap-3 mb-3">
                    <View className="flex-1 bg-zinc-800 rounded-lg p-3">
                      <Text className="text-zinc-400 text-xs mb-1">Cambio de Peso</Text>
                      <Text
                        className={`font-bold text-xl ${
                          comparison.weightChange > 0 ? 'text-primary' : 'text-primary'
                        }`}
                      >
                        {comparison.weightChange > 0 ? '+' : ''}
                        {comparison.weightChange} kg
                      </Text>
                    </View>
                    {comparison.bodyFatChange && (
                      <View className="flex-1 bg-zinc-800 rounded-lg p-3">
                        <Text className="text-zinc-400 text-xs mb-1">Cambio Grasa</Text>
                        <Text
                          className={`font-bold text-xl ${
                            comparison.bodyFatChange < 0 ? 'text-primary' : 'text-amber-500'
                          }`}
                        >
                          {comparison.bodyFatChange > 0 ? '+' : ''}
                          {comparison.bodyFatChange}%
                        </Text>
                      </View>
                    )}
                  </View>

                  <TouchableOpacity
                    onPress={() => shareComparison(comparison)}
                    className="bg-primary rounded-lg p-3"
                  >
                    <View className="flex-row items-center justify-center">
                      <Ionicons name="share-social" size={18} color="white" />
                      <Text className="text-white font-bold ml-2">
                        Compartir Transformación
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Angles Tab */}
        {selectedTab === 'angles' && (
          <View className="px-6 pt-6">
            {/* Angle Selector */}
            <View className="flex-row gap-2 mb-4">
              {angles.map((angle) => (
                <TouchableOpacity
                  key={angle.id}
                  onPress={() => setSelectedAngle(angle.id)}
                  className={`flex-1 flex-row items-center justify-center py-3 rounded-lg ${
                    selectedAngle === angle.id
                      ? 'bg-primary'
                      : 'bg-zinc-900 border border-zinc-800'
                  }`}
                >
                  <Ionicons
                    name={angle.icon as any}
                    size={18}
                    color={selectedAngle === angle.id ? 'white' : '#71717A'}
                  />
                  <Text
                    className={`ml-2 font-semibold text-sm ${
                      selectedAngle === angle.id ? 'text-white' : 'text-zinc-400'
                    }`}
                  >
                    {angle.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text className="text-white font-bold text-lg mb-3 capitalize">
              Vista {selectedAngle} ({filteredPhotosByAngle.length})
            </Text>

            <View className="flex-row flex-wrap gap-2">
              {filteredPhotosByAngle.map((photo) => (
                <View
                  key={photo.id}
                  className="bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800"
                  style={{ width: (screenWidth - 56) / 3 }}
                >
                  <Image
                    source={{ uri: photo.thumbnail }}
                    style={{ width: '100%', height: 150 }}
                    resizeMode="cover"
                  />
                  <View className="p-2">
                    <Text className="text-white text-xs font-bold mb-1">
                      {new Date(photo.date).toLocaleDateString('es-ES', {
                        day: 'numeric',
                        month: 'short',
                      })}
                    </Text>
                    <Text className="text-zinc-400 text-xs">
                      {photo.weight} kg
                    </Text>
                  </View>
                </View>
              ))}
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
                  Tips para Mejores Fotos
                </Text>
                <Text className="text-primary/60 text-sm mb-1">
                  • Toma fotos a la misma hora cada semana
                </Text>
                <Text className="text-primary/60 text-sm mb-1">
                  • Usa la misma iluminación y posición
                </Text>
                <Text className="text-primary/60 text-sm">
                  • Fotos cada 2 semanas para ver cambios reales
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}


