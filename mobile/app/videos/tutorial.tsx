import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Alert,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Video, ResizeMode } from 'expo-av';

const screenWidth = Dimensions.get('window').width;

interface VideoTutorial {
  id: string;
  title: string;
  duration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  description: string;
  keyPoints: string[];
  commonMistakes: string[];
  videoUrl: string;
  thumbnailUrl: string;
}

const TUTORIAL_DATA: { [key: string]: VideoTutorial } = {
  'pull-ups': {
    id: 'pull-ups',
    title: 'Dominadas - TÃ©cnica Perfecta',
    duration: '8:45',
    difficulty: 'intermediate',
    description: 'Aprende la tÃ©cnica correcta para realizar dominadas estrictas, maximizando la activaciÃ³n muscular y minimizando el riesgo de lesiones.',
    keyPoints: [
      'Agarre prono (palmas hacia adelante) ligeramente mÃ¡s ancho que los hombros',
      'Iniciar el movimiento con retracciÃ³n escapular (juntar omÃ³platos)',
      'Tirar con los codos, no con los bÃ­ceps como mÃºsculo principal',
      'Barbilla sobre la barra en la posiciÃ³n superior',
      'Descenso controlado hasta extensiÃ³n completa',
      'Evitar balanceo y kipping (movimiento estricto)',
    ],
    commonMistakes: [
      'No extender completamente los brazos en la posiciÃ³n inferior',
      'Usar impulso de piernas (kipping) en lugar de fuerza pura',
      'Hombros encogidos durante todo el movimiento',
      'No activar el core, causando arqueamiento de espalda',
      'Descenso rÃ¡pido sin control',
    ],
    videoUrl: 'https://example.com/videos/pull-ups-tutorial.mp4',
    thumbnailUrl: 'https://example.com/thumbnails/pull-ups.jpg',
  },
  'muscle-up': {
    id: 'muscle-up',
    title: 'Muscle-Up - ProgresiÃ³n Completa',
    duration: '12:30',
    difficulty: 'advanced',
    description: 'Domina el muscle-up con esta progresiÃ³n paso a paso, desde los pre-requisitos hasta la ejecuciÃ³n perfecta.',
    keyPoints: [
      'Requisito: 15+ dominadas estrictas y 20+ fondos en paralelas',
      'Fase 1: Pull-up explosivo con pecho a la barra',
      'Fase 2: TransiciÃ³n rÃ¡pida llevando hombros sobre la barra',
      'Fase 3: Press-out como un dip hasta extensiÃ³n completa',
      'False grip opcional pero recomendado para principiantes',
      'Timing explosivo en el tirÃ³n inicial',
    ],
    commonMistakes: [
      'Intentar el muscle-up sin fuerza base suficiente',
      'Separar mucho los codos durante la transiciÃ³n',
      'No generar suficiente impulso en el pull inicial',
      'Perder tensiÃ³n durante la transiciÃ³n',
      'PosiciÃ³n de muÃ±ecas incorrecta',
    ],
    videoUrl: 'https://example.com/videos/muscle-up-tutorial.mp4',
    thumbnailUrl: 'https://example.com/thumbnails/muscle-up.jpg',
  },
};

export default function VideoTutorial() {
  const { exerciseId } = useLocalSearchParams();
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const videoRef = useRef<Video>(null);

  const tutorial = TUTORIAL_DATA[exerciseId as string] || TUTORIAL_DATA['pull-ups'];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return '#9D12DE';
      case 'intermediate':
        return '#FFEA00';
      case 'advanced':
        return '#EF4444';
      default:
        return '#71717A';
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'Principiante';
      case 'intermediate':
        return 'Intermedio';
      case 'advanced':
        return 'Avanzado';
      default:
        return difficulty;
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePlayPause = async () => {
    if (videoRef.current) {
      if (isPlaying) {
        await videoRef.current.pauseAsync();
      } else {
        await videoRef.current.playAsync();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSeek = async (seconds: number) => {
    if (videoRef.current) {
      await videoRef.current.setPositionAsync(seconds * 1000);
    }
  };

  const difficultyColor = getDifficultyColor(tutorial.difficulty);

  return (
    <View className="flex-1 bg-zinc-950">
      {/* Header */}
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800 absolute top-0 left-0 right-0 z-10 bg-zinc-950/95">
        <View className="flex-row items-center justify-between">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <View className="flex-row gap-3">
            <TouchableOpacity>
              <Ionicons name="bookmark-outline" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="share-outline" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Video Player */}
        <View className="mt-16 bg-black" style={{ height: (screenWidth * 9) / 16 }}>
          <Video
            ref={videoRef}
            source={{ uri: tutorial.videoUrl }}
            style={{ width: screenWidth, height: (screenWidth * 9) / 16 }}
            useNativeControls
            resizeMode={ResizeMode.CONTAIN}
            isLooping
            onPlaybackStatusUpdate={(status) => {
              if (status.isLoaded) {
                setCurrentTime(status.positionMillis / 1000);
                setDuration(status.durationMillis ? status.durationMillis / 1000 : 0);
                setIsPlaying(status.isPlaying);
              }
            }}
          />
        </View>

        {/* Video Info */}
        <View className="px-6 py-4 border-b border-zinc-800">
          <View className="flex-row items-start justify-between mb-2">
            <View className="flex-1">
              <Text className="text-white text-xl font-bold mb-2">
                {tutorial.title}
              </Text>
              <View className="flex-row items-center gap-2">
                <View
                  className="px-3 py-1 rounded-full"
                  style={{ backgroundColor: difficultyColor + '20' }}
                >
                  <Text className="text-xs font-bold" style={{ color: difficultyColor }}>
                    {getDifficultyLabel(tutorial.difficulty)}
                  </Text>
                </View>
                <View className="flex-row items-center">
                  <Ionicons name="time-outline" size={16} color="#71717A" />
                  <Text className="text-zinc-400 text-sm ml-1">
                    {tutorial.duration}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <Text className="text-zinc-400 leading-6">{tutorial.description}</Text>
        </View>

        {/* Quick Actions */}
        <View className="flex-row px-6 py-3 gap-3 border-b border-zinc-800">
          <TouchableOpacity className="flex-1 bg-zinc-900 rounded-xl p-3 flex-row items-center justify-center border border-zinc-800">
            <Ionicons name="download-outline" size={20} color="white" />
            <Text className="text-white font-semibold ml-2">Descargar</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-1 bg-zinc-900 rounded-xl p-3 flex-row items-center justify-center border border-zinc-800">
            <Ionicons name="bookmark-outline" size={20} color="white" />
            <Text className="text-white font-semibold ml-2">Guardar</Text>
          </TouchableOpacity>
        </View>

        {/* Key Points */}
        <View className="px-6 py-4 border-b border-zinc-800">
          <Text className="text-white font-bold text-lg mb-3">
            Puntos Clave
          </Text>
          {tutorial.keyPoints.map((point, index) => (
            <View key={index} className="flex-row mb-3">
              <View className="w-6 h-6 rounded-full bg-primary/20 items-center justify-center mr-3 mt-0.5">
                <Ionicons name="checkmark" size={16} color="#9D12DE" />
              </View>
              <Text className="text-zinc-300 flex-1 leading-6">{point}</Text>
            </View>
          ))}
        </View>

        {/* Common Mistakes */}
        <View className="px-6 py-4 border-b border-zinc-800">
          <Text className="text-white font-bold text-lg mb-3">
            Errores Comunes
          </Text>
          {tutorial.commonMistakes.map((mistake, index) => (
            <View key={index} className="flex-row mb-3">
              <View className="w-6 h-6 rounded-full bg-red-500/20 items-center justify-center mr-3 mt-0.5">
                <Ionicons name="close" size={16} color="#EF4444" />
              </View>
              <Text className="text-zinc-300 flex-1 leading-6">{mistake}</Text>
            </View>
          ))}
        </View>

        {/* Video Chapters */}
        <View className="px-6 py-4 border-b border-zinc-800">
          <Text className="text-white font-bold text-lg mb-3">CapÃ­tulos</Text>
          {[
            { time: 0, title: 'IntroducciÃ³n', duration: '0:45' },
            { time: 45, title: 'PosiciÃ³n Inicial', duration: '1:30' },
            { time: 135, title: 'Fase ConcÃ©ntrica', duration: '2:15' },
            { time: 270, title: 'Fase ExcÃ©ntrica', duration: '1:45' },
            { time: 375, title: 'Errores Comunes', duration: '2:30' },
          ].map((chapter, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleSeek(chapter.time)}
              className="bg-zinc-900 rounded-xl p-3 mb-2 flex-row items-center justify-between border border-zinc-800"
            >
              <View className="flex-row items-center flex-1">
                <View className="w-10 h-10 rounded-lg bg-primary/20 items-center justify-center mr-3">
                  <Text className="text-primary font-bold">
                    {index + 1}
                  </Text>
                </View>
                <View className="flex-1">
                  <Text className="text-white font-semibold">
                    {chapter.title}
                  </Text>
                  <Text className="text-zinc-500 text-sm">
                    {formatTime(chapter.time)}
                  </Text>
                </View>
              </View>
              <Text className="text-zinc-400 text-sm">{chapter.duration}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Related Videos */}
        <View className="px-6 py-4">
          <Text className="text-white font-bold text-lg mb-3">
            Videos Relacionados
          </Text>
          {Object.values(TUTORIAL_DATA)
            .filter((t) => t.id !== tutorial.id)
            .map((relatedVideo) => (
              <TouchableOpacity
                key={relatedVideo.id}
                onPress={() =>
                  router.push(`/videos/tutorial?exerciseId=${relatedVideo.id}` as any)
                }
                className="bg-zinc-900 rounded-xl p-3 mb-3 flex-row border border-zinc-800"
              >
                <View className="w-24 h-16 bg-zinc-800 rounded-lg mr-3">
                  <View className="flex-1 items-center justify-center">
                    <Ionicons name="play-circle" size={32} color="#9D12DE" />
                  </View>
                </View>
                <View className="flex-1">
                  <Text className="text-white font-semibold mb-1">
                    {relatedVideo.title}
                  </Text>
                  <View className="flex-row items-center gap-2">
                    <Text className="text-zinc-500 text-xs">
                      {relatedVideo.duration}
                    </Text>
                    <View className="w-1 h-1 bg-zinc-600 rounded-full" />
                    <Text
                      className="text-xs font-semibold"
                      style={{ color: getDifficultyColor(relatedVideo.difficulty) }}
                    >
                      {getDifficultyLabel(relatedVideo.difficulty)}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
        </View>

        <View className="h-24" />
      </ScrollView>

      {/* Bottom Action */}
      <View className="absolute bottom-0 left-0 right-0 p-6 bg-zinc-950 border-t border-zinc-800">
        <TouchableOpacity
          onPress={() => router.push('/workout/active' as any)}
          className="bg-primary rounded-xl p-4 flex-row items-center justify-center"
        >
          <Ionicons name="fitness" size={24} color="white" />
          <Text className="text-white font-bold text-lg ml-2">
            Practicar Ahora
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

