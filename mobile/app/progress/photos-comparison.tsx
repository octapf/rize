import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Card } from '@/components/ui/Card';
import { format, differenceInDays } from 'date-fns';
import { es } from 'date-fns/locale';
import { showImageSourceOptions, ImagePickerResult } from '@/lib/camera';

interface ProgressPhoto {
  id: string;
  uri: string;
  date: Date;
  weight?: number;
  notes?: string;
}

export default function ProgressPhotosComparisonScreen() {
  const [photos, setPhotos] = useState<ProgressPhoto[]>([
    {
      id: '1',
      uri: 'https://via.placeholder.com/300x400',
      date: new Date(2025, 11, 1),
      weight: 85,
      notes: 'Inicio del viaje',
    },
    {
      id: '2',
      uri: 'https://via.placeholder.com/300x400',
      date: new Date(2026, 0, 1),
      weight: 82,
      notes: '1 mes de progreso',
    },
  ]);
  const [selectedPhotos, setSelectedPhotos] = useState<string[]>([]);
  const [compareMode, setCompareMode] = useState(false);

  const handleAddPhoto = async () => {
    const result = await showImageSourceOptions({ aspect: [3, 4] });
    if (result) {
      const newPhoto: ProgressPhoto = {
        id: Date.now().toString(),
        uri: result.uri,
        date: new Date(),
      };
      setPhotos([newPhoto, ...photos]);
      Alert.alert('Éxito', 'Foto agregada correctamente');
    }
  };

  const togglePhotoSelection = (id: string) => {
    if (selectedPhotos.includes(id)) {
      setSelectedPhotos(selectedPhotos.filter((p) => p !== id));
    } else {
      if (selectedPhotos.length >= 4) {
        Alert.alert('Límite', 'Máximo 4 fotos para comparar');
        return;
      }
      setSelectedPhotos([...selectedPhotos, id]);
    }
  };

  const handleCompare = () => {
    if (selectedPhotos.length < 2) {
      Alert.alert('Error', 'Selecciona al menos 2 fotos para comparar');
      return;
    }
    setCompareMode(true);
  };

  const getSelectedPhotos = () => {
    return photos.filter((p) => selectedPhotos.includes(p.id));
  };

  const getDaysDifference = (date1: Date, date2: Date) => {
    return Math.abs(differenceInDays(date1, date2));
  };

  const renderPhoto = ({ item }: { item: ProgressPhoto }) => {
    const isSelected = selectedPhotos.includes(item.id);

    return (
      <TouchableOpacity
        onPress={() => togglePhotoSelection(item.id)}
        className="w-1/2 p-2"
      >
        <Card className={`overflow-hidden ${isSelected ? 'border-4 border-primary' : ''}`}>
          <View className="relative">
            <Image
              source={{ uri: item.uri }}
              className="w-full h-48"
              resizeMode="cover"
            />
            {isSelected && (
              <View className="absolute top-2 right-2 bg-primary rounded-full p-1">
                <Ionicons name="checkmark" size={20} color="white" />
              </View>
            )}
          </View>
          <View className="p-3">
            <Text className="text-gray-900 font-bold text-sm">
              {format(item.date, 'dd MMM yyyy', { locale: es })}
            </Text>
            {item.weight && (
              <Text className="text-gray-600 text-xs">{item.weight} kg</Text>
            )}
            {item.notes && (
              <Text className="text-gray-500 text-xs mt-1" numberOfLines={2}>
                {item.notes}
              </Text>
            )}
          </View>
        </Card>
      </TouchableOpacity>
    );
  };

  if (compareMode) {
    const selected = getSelectedPhotos();
    const oldest = selected[selected.length - 1];
    const newest = selected[0];
    const daysDiff = oldest && newest ? getDaysDifference(oldest.date, newest.date) : 0;
    const weightDiff = oldest?.weight && newest?.weight ? newest.weight - oldest.weight : null;

    return (
      <View className="flex-1 bg-gray-50">
        <LinearGradient colors={['#9D12DE', '#7C3AED']} className="px-6 pt-12 pb-6">
          <View className="flex-row items-center justify-between">
            <TouchableOpacity onPress={() => setCompareMode(false)}>
              <Ionicons name="arrow-back" size={28} color="white" />
            </TouchableOpacity>
            <Text className="text-2xl font-bold text-white">Comparación</Text>
            <TouchableOpacity onPress={() => Alert.alert('Compartir', 'Función en desarrollo')}>
              <Ionicons name="share-outline" size={28} color="white" />
            </TouchableOpacity>
          </View>
        </LinearGradient>

        <View className="flex-1 p-4">
          <Card className="p-4 mb-4 bg-gradient-to-r from-primary/10 to-primary/10">
            <View className="flex-row justify-around">
              <View className="items-center">
                <Text className="text-gray-600 text-sm">Tiempo</Text>
                <Text className="text-primary font-bold text-2xl">{daysDiff}</Text>
                <Text className="text-gray-600 text-xs">días</Text>
              </View>
              {weightDiff !== null && (
                <View className="items-center">
                  <Text className="text-gray-600 text-sm">Peso</Text>
                  <Text className={`font-bold text-2xl ${weightDiff < 0 ? 'text-primary' : 'text-amber-600'}`}>
                    {weightDiff > 0 ? '+' : ''}{weightDiff} kg
                  </Text>
                  <Text className="text-gray-600 text-xs">diferencia</Text>
                </View>
              )}
            </View>
          </Card>

          <View className={`flex-1 ${selected.length === 2 ? 'flex-row' : 'flex-row flex-wrap'}`}>
            {selected.map((photo, index) => (
              <View key={photo.id} className={`${selected.length === 2 ? 'flex-1' : 'w-1/2'} p-1`}>
                <Card className="h-full">
                  <Image
                    source={{ uri: photo.uri }}
                    className="w-full flex-1"
                    resizeMode="cover"
                  />
                  <View className="p-3 bg-white">
                    <Text className="text-gray-900 font-bold text-sm">
                      {format(photo.date, 'dd MMM yyyy', { locale: es })}
                    </Text>
                    {photo.weight && (
                      <Text className="text-gray-600 text-xs">{photo.weight} kg</Text>
                    )}
                  </View>
                </Card>
              </View>
            ))}
          </View>
        </View>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-50">
      <LinearGradient colors={['#9D12DE', '#7C3AED']} className="px-6 pt-12 pb-6">
        <View className="flex-row items-center justify-between mb-2">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={28} color="white" />
          </TouchableOpacity>
          <Text className="text-2xl font-bold text-white">Fotos de Progreso</Text>
          <TouchableOpacity onPress={handleAddPhoto}>
            <Ionicons name="add-circle" size={28} color="white" />
          </TouchableOpacity>
        </View>
        {selectedPhotos.length > 0 && (
          <Text className="text-primary/50 text-center">
            {selectedPhotos.length} foto{selectedPhotos.length !== 1 ? 's' : ''} seleccionada{selectedPhotos.length !== 1 ? 's' : ''}
          </Text>
        )}
      </LinearGradient>

      <FlatList
        data={photos}
        renderItem={renderPhoto}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerClassName="p-2"
        ListEmptyComponent={
          <View className="items-center py-12">
            <Ionicons name="images" size={64} color="#9CA3AF" />
            <Text className="text-gray-900 font-bold text-lg mt-4">
              No hay fotos
            </Text>
            <Text className="text-gray-600 text-center mt-2">
              Agrega fotos para seguir tu transformación
            </Text>
          </View>
        }
      />

      {selectedPhotos.length >= 2 && (
        <View className="p-4 bg-white border-t border-gray-200">
          <TouchableOpacity onPress={handleCompare}>
            <LinearGradient colors={['#9D12DE', '#7C3AED']} className="py-4 rounded-lg">
              <View className="flex-row items-center justify-center gap-2">
                <Ionicons name="git-compare" size={24} color="white" />
                <Text className="text-white font-bold text-lg">
                  Comparar {selectedPhotos.length} Fotos
                </Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}


