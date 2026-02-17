import React, { useState } from 'react';
import { Text } from '@/components/ui/Text';
import { View, TouchableOpacity, ScrollView, Alert, Image } from 'react-native';;
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface TransformationPhoto {
  id: string;
  user: string;
  duration: number;
  weightLoss?: number;
  muscleGain?: number;
  beforePhoto: string;
  afterPhoto: string;
  date: string;
  story: string;
  stats: {
    workouts: number;
    diet: string;
    program: string;
  };
  metrics: {
    startWeight: number;
    endWeight: number;
    startBodyFat?: number;
    endBodyFat?: number;
  };
}

interface MyProgress {
  photos: {
    date: string;
    weight: number;
    bodyFat: number;
    photo: string;
  }[];
  totalDays: number;
  startDate: string;
}

const TRANSFORMATIONS: TransformationPhoto[] = [
  {
    id: '1',
    user: 'Carlos Beast',
    duration: 90,
    weightLoss: 18,
    beforePhoto: '📸',
    afterPhoto: '💪',
    date: '2025-01-15',
    story: 'De 98kg a 80kg en 90 días. Deficit 500 kcal + 6x semana gym. Sentadilla pas• de 80kg a 140kg.',
    stats: {
      workouts: 72,
      diet: 'Flexible IIFYM',
      program: 'Upper/Lower 6x',
    },
    metrics: {
      startWeight: 98,
      endWeight: 80,
      startBodyFat: 28,
      endBodyFat: 15,
    },
  },
  {
    id: '2',
    user: 'Ana Strong',
    duration: 120,
    muscleGain: 8,
    beforePhoto: '👤',
    afterPhoto: '🏋️',
    date: '2025-01-10',
    story: 'De 52kg a 60kg en 4 meses. Surplus 300 kcal + PPL 5x semana. Primera dominada en semana 6.',
    stats: {
      workouts: 80,
      diet: 'High Protein 2g/kg',
      program: 'PPL Hipertrofia',
    },
    metrics: {
      startWeight: 52,
      endWeight: 60,
      startBodyFat: 22,
      endBodyFat: 19,
    },
  },
  {
    id: '3',
    user: 'Miguel Fitness',
    duration: 180,
    weightLoss: 25,
    beforePhoto: '📝',
    afterPhoto: '📝',
    date: '2025-01-05',
    story: '6 meses que cambiaron mi vida. De sedentario a maratonista. Perd• 25kg y gan• confianza.',
    stats: {
      workouts: 108,
      diet: 'Mediterránea + Cardio',
      program: 'Cardio + Fuerza',
    },
    metrics: {
      startWeight: 105,
      endWeight: 80,
      startBodyFat: 35,
      endBodyFat: 18,
    },
  },
  {
    id: '4',
    user: 'Laura Warrior',
    duration: 60,
    muscleGain: 5,
    beforePhoto: '??',
    afterPhoto: '💃',
    date: '2024-12-28',
    story: 'Recomposición corporal perfecta. Mismo peso pero -8% grasa corporal. Fuerza máxima +40%.',
    stats: {
      workouts: 48,
      diet: 'Carb Cycling',
      program: 'Full Body 4x',
    },
    metrics: {
      startWeight: 65,
      endWeight: 65,
      startBodyFat: 26,
      endBodyFat: 18,
    },
  },
];

const MY_PROGRESS: MyProgress = {
  photos: [
    { date: '2024-11-01', weight: 85, bodyFat: 20, photo: '📸' },
    { date: '2024-12-01', weight: 83, bodyFat: 18.5, photo: '📸' },
    { date: '2025-01-01', weight: 81, bodyFat: 17, photo: '📸' },
    { date: '2025-01-27', weight: 79.5, bodyFat: 16, photo: '📸' },
  ],
  totalDays: 87,
  startDate: '2024-11-01',
};

export default function TransformationGallery() {
  const [transformations] = useState(TRANSFORMATIONS);
  const [myProgress] = useState(MY_PROGRESS);
  const [activeTab, setActiveTab] = useState<'community' | 'mine'>('community');

  const addProgress = () => {
    Alert.alert(
      'Nueva Foto de Progreso',
      'Captura tu transformación',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Tomar Foto',
          onPress: () => Alert.alert('Foto capturada', 'Progreso guardado'),
        },
      ]
    );
  };

  const shareTransformation = (transformation: TransformationPhoto) => {
    Alert.alert(
      'Compartir Transformación',
      `${transformation.user}: -${transformation.weightLoss || transformation.muscleGain}kg`,
      [
        { text: 'Instagram Stories' },
        { text: 'WhatsApp' },
        { text: 'Twitter' },
        { text: 'Cancelar', style: 'cancel' },
      ]
    );
  };

  const viewTimeline = () => {
    Alert.alert(
      'Timeline Completo',
      `${myProgress.photos.length} fotos en ${myProgress.totalDays} días`,
      [{ text: 'OK' }]
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
            Transformaciones
          </Text>
          {activeTab === 'mine' && (
            <TouchableOpacity onPress={addProgress}>
              <Ionicons name="camera" size={28} color="#9D12DE" />
            </TouchableOpacity>
          )}
        </View>

        {/* Tabs */}
        <View className="flex-row gap-2">
          <TouchableOpacity
            onPress={() => setActiveTab('community')}
            className={`flex-1 py-3 rounded-lg ${
              activeTab === 'community' ? 'bg-primary' : 'bg-zinc-900 border border-zinc-800'
            }`}
          >
            <Text
              className={`text-center font-bold ${
                activeTab === 'community' ? 'text-white' : 'text-zinc-400'
              }`}
            >
              Comunidad
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveTab('mine')}
            className={`flex-1 py-3 rounded-lg ${
              activeTab === 'mine' ? 'bg-primary' : 'bg-zinc-900 border border-zinc-800'
            }`}
          >
            <Text
              className={`text-center font-bold ${
                activeTab === 'mine' ? 'text-white' : 'text-zinc-400'
              }`}
            >
              Mi Progreso
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Community Tab */}
        {activeTab === 'community' && (
          <View className="px-6 pt-6">
            {transformations.map((transformation) => (
              <View
                key={transformation.id}
                className="bg-zinc-900 rounded-xl p-4 mb-4 border border-zinc-800"
              >
                {/* User & Duration */}
                <View className="flex-row items-center justify-between mb-4">
                  <View>
                    <Text className="text-white font-bold text-lg">
                      {transformation.user}
                    </Text>
                    <Text className="text-zinc-400 text-sm">
                      {transformation.duration} días de transformación
                    </Text>
                  </View>
                  <View className="items-end">
                    {transformation.weightLoss && (
                      <Text className="text-red-400 text-2xl font-bold">
                        -{transformation.weightLoss}kg
                      </Text>
                    )}
                    {transformation.muscleGain && (
                      <Text className="text-primary text-2xl font-bold">
                        +{transformation.muscleGain}kg
                      </Text>
                    )}
                  </View>
                </View>

                {/* Before/After Photos */}
                <View className="flex-row gap-3 mb-4">
                  <View className="flex-1">
                    <View className="bg-zinc-800 rounded-lg aspect-square items-center justify-center mb-2">
                      <Text className="text-6xl">{transformation.beforePhoto}</Text>
                    </View>
                    <View className="bg-red-500/10 rounded-lg px-2 py-1">
                      <Text className="text-red-400 text-xs font-bold text-center">
                        ANTES
                      </Text>
                    </View>
                  </View>
                  <View className="flex-1">
                    <View className="bg-zinc-800 rounded-lg aspect-square items-center justify-center mb-2">
                      <Text className="text-6xl">{transformation.afterPhoto}</Text>
                    </View>
                    <View className="bg-primary/10 rounded-lg px-2 py-1">
                      <Text className="text-primary text-xs font-bold text-center">
                        DESPUÉS
                      </Text>
                    </View>
                  </View>
                </View>

                {/* Metrics Comparison */}
                <View className="bg-zinc-800 rounded-lg p-3 mb-3">
                  <View className="flex-row items-center justify-between mb-2">
                    <Text className="text-zinc-400 text-sm">Peso</Text>
                    <View className="flex-row items-center">
                      <Text className="text-zinc-400 line-through mr-2">
                        {transformation.metrics.startWeight}kg
                      </Text>
                      <Ionicons name="arrow-forward" size={16} color="#71717A" />
                      <Text className="text-white font-bold ml-2">
                        {transformation.metrics.endWeight}kg
                      </Text>
                    </View>
                  </View>
                  {transformation.metrics.startBodyFat && (
                    <View className="flex-row items-center justify-between">
                      <Text className="text-zinc-400 text-sm">Grasa Corporal</Text>
                      <View className="flex-row items-center">
                        <Text className="text-zinc-400 line-through mr-2">
                          {transformation.metrics.startBodyFat}%
                        </Text>
                        <Ionicons name="arrow-forward" size={16} color="#71717A" />
                        <Text className="text-primary font-bold ml-2">
                          {transformation.metrics.endBodyFat}%
                        </Text>
                      </View>
                    </View>
                  )}
                </View>

                {/* Story */}
                <View className="bg-zinc-800/50 rounded-lg p-3 mb-3">
                  <Text className="text-zinc-300 text-sm">{transformation.story}</Text>
                </View>

                {/* Stats */}
                <View className="mb-3">
                  <Text className="text-zinc-400 text-xs mb-2">ESTADÍSTICAS</Text>
                  <View className="flex-row gap-2">
                    <View className="flex-1 bg-zinc-800 rounded-lg p-2">
                      <Text className="text-zinc-400 text-xs">Workouts</Text>
                      <Text className="text-white font-bold">
                        {transformation.stats.workouts}
                      </Text>
                    </View>
                    <View className="flex-1 bg-zinc-800 rounded-lg p-2">
                      <Text className="text-zinc-400 text-xs">Dieta</Text>
                      <Text className="text-white font-bold text-xs">
                        {transformation.stats.diet}
                      </Text>
                    </View>
                    <View className="flex-1 bg-zinc-800 rounded-lg p-2">
                      <Text className="text-zinc-400 text-xs">Programa</Text>
                      <Text className="text-white font-bold text-xs">
                        {transformation.stats.program}
                      </Text>
                    </View>
                  </View>
                </View>

                {/* Actions */}
                <View className="flex-row gap-2">
                  <TouchableOpacity className="flex-1 bg-primary/10 rounded-lg p-3 border border-primary/30 flex-row items-center justify-center">
                    <Ionicons name="heart" size={18} color="#9D12DE" />
                    <Text className="text-primary font-bold ml-2">Inspirador</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => shareTransformation(transformation)}
                    className="flex-1 bg-primary/10 rounded-lg p-3 border border-primary/30 flex-row items-center justify-center"
                  >
                    <Ionicons name="share-social" size={18} color="#9D12DE" />
                    <Text className="text-primary/80 font-bold ml-2">Compartir</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* My Progress Tab */}
        {activeTab === 'mine' && (
          <View className="px-6 pt-6">
            {/* Summary Card */}
            <View className="bg-zinc-900 rounded-xl p-4 border border-zinc-800 mb-6">
              <Text className="text-zinc-400 text-sm mb-3">TU TRANSFORMACIÓN</Text>
              <View className="flex-row items-center justify-between mb-4">
                <View className="flex-1">
                  <Text className="text-zinc-400 text-xs mb-1">DÍAS</Text>
                  <Text className="text-white text-3xl font-bold">
                    {myProgress.totalDays}
                  </Text>
                </View>
                <View className="flex-1">
                  <Text className="text-zinc-400 text-xs mb-1">PESO PERDIDO</Text>
                  <Text className="text-red-400 text-3xl font-bold">
                    -{myProgress.photos[0].weight - myProgress.photos[myProgress.photos.length - 1].weight}kg
                  </Text>
                </View>
                <View className="flex-1">
                  <Text className="text-zinc-400 text-xs mb-1">GRASA</Text>
                  <Text className="text-primary text-3xl font-bold">
                    -{myProgress.photos[0].bodyFat - myProgress.photos[myProgress.photos.length - 1].bodyFat}%
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                onPress={viewTimeline}
                className="bg-primary rounded-lg p-3"
              >
                <Text className="text-white font-bold text-center">
                  Ver Timeline Completo
                </Text>
              </TouchableOpacity>
            </View>

            {/* Progress Photos Grid */}
            <Text className="text-white font-bold text-lg mb-3">Fotos de Progreso</Text>
            <View className="flex-row flex-wrap gap-3 mb-4">
              {myProgress.photos.map((photo, index) => (
                <View key={index} className="w-[48%] bg-zinc-900 rounded-xl p-3 border border-zinc-800">
                  {/* Photo */}
                  <View className="bg-zinc-800 rounded-lg aspect-square items-center justify-center mb-3">
                    <Text className="text-5xl">{photo.photo}</Text>
                  </View>

                  {/* Date */}
                  <Text className="text-zinc-400 text-xs mb-2">
                    {new Date(photo.date).toLocaleDateString('es-ES', {
                      day: '2-digit',
                      month: 'short',
                    })}
                  </Text>

                  {/* Stats */}
                  <View className="flex-row items-center justify-between mb-1">
                    <Text className="text-zinc-400 text-xs">Peso</Text>
                    <Text className="text-white text-sm font-bold">{photo.weight}kg</Text>
                  </View>
                  <View className="flex-row items-center justify-between">
                    <Text className="text-zinc-400 text-xs">Grasa</Text>
                    <Text className="text-primary text-sm font-bold">
                      {photo.bodyFat}%
                    </Text>
                  </View>

                  {/* Progress Indicator */}
                  {index > 0 && (
                    <View className="mt-2 pt-2 border-t border-zinc-800">
                      <Text className="text-primary text-xs text-center">
                        -{(myProgress.photos[index - 1].weight - photo.weight).toFixed(1)}kg
                      </Text>
                    </View>
                  )}
                </View>
              ))}
            </View>

            {/* Comparison Tool */}
            <View className="bg-zinc-900 rounded-xl p-4 border border-zinc-800 mb-4">
              <Text className="text-white font-bold text-lg mb-3">
                Comparación Antes/Después
              </Text>
              <View className="flex-row gap-3 mb-4">
                <View className="flex-1">
                  <View className="bg-zinc-800 rounded-lg aspect-square items-center justify-center mb-2">
                    <Text className="text-6xl">{myProgress.photos[0].photo}</Text>
                  </View>
                  <View className="bg-red-500/10 rounded-lg px-2 py-1 mb-2">
                    <Text className="text-red-400 text-xs font-bold text-center">
                      INICIO
                    </Text>
                  </View>
                  <Text className="text-zinc-400 text-xs text-center">
                    {myProgress.photos[0].weight}kg • {myProgress.photos[0].bodyFat}%
                  </Text>
                </View>
                <View className="flex-1">
                  <View className="bg-zinc-800 rounded-lg aspect-square items-center justify-center mb-2">
                    <Text className="text-6xl">
                      {myProgress.photos[myProgress.photos.length - 1].photo}
                    </Text>
                  </View>
                  <View className="bg-primary/10 rounded-lg px-2 py-1 mb-2">
                    <Text className="text-primary text-xs font-bold text-center">
                      ACTUAL
                    </Text>
                  </View>
                  <Text className="text-white text-xs text-center font-bold">
                    {myProgress.photos[myProgress.photos.length - 1].weight}kg ×{' '}
                    {myProgress.photos[myProgress.photos.length - 1].bodyFat}%
                  </Text>
                </View>
              </View>
              <TouchableOpacity className="bg-primary/10 rounded-lg p-3 border border-primary/30">
                <Text className="text-primary/80 font-bold text-center">
                  Compartir Mi Transformación
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Info Card */}
        <View className="px-6 pb-6 pt-2">
          <View className="bg-amber-500/10 rounded-xl p-4 border border-amber-500/30">
            <View className="flex-row items-start">
              <Ionicons name="camera" size={20} color="#FFEA00" />
              <View className="flex-1 ml-3">
                <Text className="text-amber-400 font-bold mb-2">
                  Documenta Tu Viaje
                </Text>
                <Text className="text-amber-300 text-sm">
                  Fotos semanales bajo mismas condiciones (luz, pose, ropa). El progreso es evidente.
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

