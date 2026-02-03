import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  TextInput,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface Tutorial {
  id: string;
  title: string;
  category: string;
  duration: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  instructor: string;
  views: number;
  rating: number;
  thumbnail: string;
  description: string;
  equipmentNeeded: string[];
  musclesTargeted: string[];
  keyPoints: string[];
}

const TUTORIALS: Tutorial[] = [
  {
    id: '1',
    title: 'Técnica Perfecta: Sentadilla',
    category: 'Técnica de Ejercicios',
    duration: 12,
    difficulty: 'intermediate',
    instructor: 'Carlos Fitness Pro',
    views: 12450,
    rating: 4.8,
    thumbnail: '🏋️',
    description: 'Domina la sentadilla con barra. Posición de pies, profundidad, core, respiración.',
    equipmentNeeded: ['Barra', 'Rack', 'Discos'],
    musclesTargeted: ['Cuádriceps', 'Glúteos', 'Isquiotibiales', 'Core'],
    keyPoints: [
      'Pies ancho de hombros, dedos ligeramente hacia afuera',
      'Descender hasta romper paralelo',
      'Mantener core apretado y espalda neutra',
      'Empujar con talones en la subida',
    ],
  },
  {
    id: '2',
    title: 'Press de Banca: Evita Lesiones',
    category: 'Técnica de Ejercicios',
    duration: 10,
    difficulty: 'beginner',
    instructor: 'Ana Strong',
    views: 18920,
    rating: 4.9,
    thumbnail: '💪',
    description: 'Protocolo completo de press banca seguro y efectivo. Agarre, arco, trayectoria.',
    equipmentNeeded: ['Banco plano', 'Barra', 'Discos'],
    musclesTargeted: ['Pectorales', 'Tríceps', 'Deltoides anterior'],
    keyPoints: [
      'Agarre ligeramente más ancho que hombros',
      'Crear arco natural en espalda baja',
      'Descender barra a medio pecho',
      'Empujar con trayectoria diagonal',
    ],
  },
  {
    id: '3',
    title: 'Peso Muerto Convencional',
    category: 'Técnica de Ejercicios',
    duration: 15,
    difficulty: 'advanced',
    instructor: 'Miguel Beast',
    views: 9840,
    rating: 4.7,
    thumbnail: '⚡',
    description: 'El rey de todos los ejercicios. Setup perfecto, pull explosivo, lockout controlado.',
    equipmentNeeded: ['Barra', 'Discos', 'Correas (opcional)', 'Tiza'],
    musclesTargeted: ['Espalda completa', 'Glúteos', 'Isquiotibiales', 'Trapecios'],
    keyPoints: [
      'Barra sobre medio pie, shins verticales',
      'Grip shoulder-width, espalda plana',
      'Pull con piernas primero, luego cadera',
      'Lockout completo con glúteos apretados',
    ],
  },
  {
    id: '4',
    title: 'Movilidad Matutina 15 Min',
    category: 'Movilidad & Stretching',
    duration: 15,
    difficulty: 'beginner',
    instructor: 'Laura Mobility',
    views: 24350,
    rating: 4.9,
    thumbnail: '🧘',
    description: 'Rutina de movilidad para despertar el cuerpo. Perfecto pre-entreno o mañanas.',
    equipmentNeeded: ['Esterilla', 'Banda elástica (opcional)'],
    musclesTargeted: ['Caderas', 'Hombros', 'Columna', 'Tobillos'],
    keyPoints: [
      'Cat-Cow 10 reps para columna',
      '90/90 hip stretch 60 seg cada lado',
      'Shoulder dislocations con banda 15 reps',
      'World\'s greatest stretch 5 reps/lado',
    ],
  },
  {
    id: '5',
    title: 'HIIT 20 Minutos Sin Equipo',
    category: 'Cardio & Conditioning',
    duration: 20,
    difficulty: 'intermediate',
    instructor: 'Pedro Cardio',
    views: 31240,
    rating: 4.6,
    thumbnail: '🔥',
    description: 'Quema calorías desde casa. Intervalos 40 seg trabajo / 20 seg descanso.',
    equipmentNeeded: ['Ninguno'],
    musclesTargeted: ['Cuerpo completo', 'Sistema cardiovascular'],
    keyPoints: [
      'Burpees 40 seg',
      'Mountain climbers 40 seg',
      'Jump squats 40 seg',
      'High knees 40 seg',
    ],
  },
  {
    id: '6',
    title: 'Dominadas: De 0 a 10',
    category: 'Progresiones',
    duration: 18,
    difficulty: 'beginner',
    instructor: 'Carlos Fitness Pro',
    views: 15680,
    rating: 4.8,
    thumbnail: '🎯',
    description: 'Progresión completa para lograr tus primeras 10 dominadas seguidas.',
    equipmentNeeded: ['Barra fija', 'Banda de resistencia'],
    musclesTargeted: ['Dorsales', 'Bíceps', 'Core'],
    keyPoints: [
      'Fase 1: Dominadas negativas (excéntricas)',
      'Fase 2: Asistidas con banda',
      'Fase 3: Singles con descanso',
      'Fase 4: Sets de múltiples reps',
    ],
  },
  {
    id: '7',
    title: 'Foam Rolling Completo',
    category: 'Recuperación',
    duration: 25,
    difficulty: 'beginner',
    instructor: 'Ana Recovery',
    views: 8920,
    rating: 4.7,
    thumbnail: '🎾',
    description: 'Sesión completa de liberación miofascial. Reduce tensión y mejora movilidad.',
    equipmentNeeded: ['Foam roller', 'Lacrosse ball (opcional)'],
    musclesTargeted: ['IT band', 'Glúteos', 'Espalda baja', 'Cuádriceps'],
    keyPoints: [
      'IT band 60 seg cada lado',
      'Glúteos con pelota 90 seg',
      'Espalda baja con roller 120 seg',
      'Cuádriceps y pantorrillas 60 seg/lado',
    ],
  },
  {
    id: '8',
    title: 'Nutrición Pre y Post Entreno',
    category: 'Nutrición',
    duration: 22,
    difficulty: 'beginner',
    instructor: 'Miguel Nutrition',
    views: 19340,
    rating: 4.9,
    thumbnail: '🍎',
    description: 'Optimiza tu alimentación alrededor del entrenamiento para máximos resultados.',
    equipmentNeeded: ['Ninguno'],
    musclesTargeted: ['N/A - Nutrición'],
    keyPoints: [
      'Pre: Carbos 1-2h antes (avena, plátano)',
      'Intra: Aminoácidos si sesión >90 min',
      'Post: Proteína + carbos en ventana 2h',
      'Hidratación: 500ml agua pre y post',
    ],
  },
];

export default function VideoTutorials() {
  const [tutorials, setTutorials] = useState(TUTORIALS);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<string>('all');

  const categories = [
    'all',
    'Técnica de Ejercicios',
    'Movilidad & Stretching',
    'Cardio & Conditioning',
    'Progresiones',
    'Recuperación',
    'Nutrición',
  ];

  const filteredTutorials = tutorials.filter((tutorial) => {
    const matchesSearch = tutorial.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === 'all' || tutorial.category === filter;
    return matchesSearch && matchesFilter;
  });

  const playVideo = (tutorial: Tutorial) => {
    Alert.alert(
      `▶️ ${tutorial.title}`,
      `Por: ${tutorial.instructor}\nDuración: ${tutorial.duration} min\n\n${tutorial.description}`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Reproducir', onPress: () => Alert.alert('Reproduciendo video...') },
      ]
    );
  };

  const saveTutorial = (tutorial: Tutorial) => {
    Alert.alert('Guardado', `${tutorial.title} agregado a tus favoritos`);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'text-emerald-400';
      case 'intermediate':
        return 'text-amber-400';
      case 'advanced':
        return 'text-red-400';
      default:
        return 'text-zinc-400';
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

  return (
    <View className="flex-1 bg-zinc-950">
      {/* Header */}
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1 ml-3">
            Tutoriales en Video
          </Text>
          <TouchableOpacity>
            <Ionicons name="bookmark" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Search */}
        <View className="bg-zinc-900 rounded-xl p-3 border border-zinc-800 flex-row items-center mb-4">
          <Ionicons name="search" size={20} color="#71717A" />
          <TextInput
            placeholder="Buscar tutoriales..."
            placeholderTextColor="#71717A"
            value={searchQuery}
            onChangeText={setSearchQuery}
            className="text-white text-base ml-3 flex-1"
          />
        </View>

        {/* Category Filters */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row gap-2">
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                onPress={() => setFilter(category)}
                className={`px-4 py-2 rounded-lg ${
                  filter === category
                    ? 'bg-emerald-500'
                    : 'bg-zinc-900 border border-zinc-800'
                }`}
              >
                <Text
                  className={`font-semibold text-sm ${
                    filter === category ? 'text-white' : 'text-zinc-400'
                  }`}
                >
                  {category === 'all' ? 'Todos' : category}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          {filteredTutorials.map((tutorial) => (
            <TouchableOpacity
              key={tutorial.id}
              onPress={() => playVideo(tutorial)}
              activeOpacity={0.7}
              className="bg-zinc-900 rounded-xl p-4 mb-4 border border-zinc-800"
            >
              {/* Thumbnail & Title */}
              <View className="flex-row items-start mb-3">
                <View className="w-20 h-20 bg-zinc-800 rounded-lg items-center justify-center mr-3">
                  <Text className="text-4xl">{tutorial.thumbnail}</Text>
                  <View className="absolute top-1 right-1 bg-black/70 rounded px-1">
                    <Text className="text-white text-xs">{tutorial.duration} min</Text>
                  </View>
                </View>
                <View className="flex-1">
                  <View className="flex-row items-start justify-between mb-1">
                    <Text className="text-white font-bold text-base flex-1 mr-2">
                      {tutorial.title}
                    </Text>
                    <TouchableOpacity onPress={() => saveTutorial(tutorial)}>
                      <Ionicons name="bookmark-outline" size={20} color="#71717A" />
                    </TouchableOpacity>
                  </View>
                  <Text className="text-zinc-400 text-sm mb-1">{tutorial.instructor}</Text>
                  <View className="flex-row items-center">
                    <View className="flex-row items-center mr-3">
                      <Ionicons name="star" size={14} color="#F59E0B" />
                      <Text className="text-amber-400 text-sm ml-1">{tutorial.rating}</Text>
                    </View>
                    <View className="flex-row items-center">
                      <Ionicons name="eye" size={14} color="#71717A" />
                      <Text className="text-zinc-400 text-sm ml-1">
                        {tutorial.views.toLocaleString()}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

              {/* Difficulty & Category */}
              <View className="flex-row items-center mb-3">
                <View className="bg-zinc-800 rounded-lg px-2 py-1 mr-2">
                  <Text className={`text-xs font-bold ${getDifficultyColor(tutorial.difficulty)}`}>
                    {getDifficultyLabel(tutorial.difficulty).toUpperCase()}
                  </Text>
                </View>
                <View className="bg-blue-500/10 rounded-lg px-2 py-1">
                  <Text className="text-blue-400 text-xs">{tutorial.category}</Text>
                </View>
              </View>

              {/* Description */}
              <Text className="text-zinc-300 text-sm mb-3">{tutorial.description}</Text>

              {/* Equipment */}
              <View className="mb-3">
                <Text className="text-zinc-400 text-xs mb-2">EQUIPO NECESARIO</Text>
                <View className="flex-row flex-wrap gap-2">
                  {tutorial.equipmentNeeded.map((equipment, index) => (
                    <View key={index} className="bg-zinc-800 rounded-lg px-2 py-1">
                      <Text className="text-zinc-400 text-xs">{equipment}</Text>
                    </View>
                  ))}
                </View>
              </View>

              {/* Muscles Targeted */}
              {tutorial.musclesTargeted[0] !== 'N/A - Nutrición' && (
                <View className="mb-3">
                  <Text className="text-zinc-400 text-xs mb-2">MÚSCULOS OBJETIVO</Text>
                  <View className="flex-row flex-wrap gap-2">
                    {tutorial.musclesTargeted.map((muscle, index) => (
                      <View key={index} className="bg-red-500/10 rounded-lg px-2 py-1">
                        <Text className="text-red-400 text-xs">{muscle}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              )}

              {/* Key Points */}
              <View className="bg-zinc-800 rounded-lg p-3">
                <Text className="text-zinc-400 text-xs mb-2">PUNTOS CLAVE</Text>
                {tutorial.keyPoints.map((point, index) => (
                  <View key={index} className="flex-row items-start mb-1 last:mb-0">
                    <Text className="text-emerald-400 mr-2">•</Text>
                    <Text className="text-zinc-300 text-sm flex-1">{point}</Text>
                  </View>
                ))}
              </View>

              {/* Play Button */}
              <View className="flex-row gap-2 mt-3">
                <TouchableOpacity
                  onPress={() => playVideo(tutorial)}
                  className="flex-1 bg-emerald-500 rounded-lg p-3 flex-row items-center justify-center"
                >
                  <Ionicons name="play" size={20} color="white" />
                  <Text className="text-white font-bold ml-2">Reproducir</Text>
                </TouchableOpacity>
                <TouchableOpacity className="bg-blue-500/10 rounded-lg p-3 border border-blue-500/30">
                  <Ionicons name="share-social" size={20} color="#3B82F6" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Info Card */}
        <View className="px-6 pb-6 pt-2">
          <View className="bg-blue-500/10 rounded-xl p-4 border border-blue-500/30">
            <View className="flex-row items-start">
              <Ionicons name="play-circle" size={20} color="#3B82F6" />
              <View className="flex-1 ml-3">
                <Text className="text-blue-400 font-bold mb-2">
                  Aprende de los Mejores
                </Text>
                <Text className="text-blue-300 text-sm">
                  Técnica perfecta = resultados máximos + cero lesiones
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
