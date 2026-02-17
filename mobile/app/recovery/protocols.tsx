import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface RecoveryProtocol {
  id: string;
  name: string;
  type: 'foam-rolling' | 'stretching' | 'mobility' | 'massage' | 'cold-therapy' | 'breathing';
  duration: number;
  difficulty: 'principiante' | 'intermedio' | 'avanzado';
  targetArea: string[];
  exercises: RecoveryExercise[];
  benefits: string[];
  bestFor: string;
}

interface RecoveryExercise {
  id: string;
  name: string;
  duration: number;
  sets?: number;
  notes: string;
  videoUrl?: string;
}

const RECOVERY_PROTOCOLS: RecoveryProtocol[] = [
  {
    id: '1',
    name: 'Liberación Miofascial Completa',
    type: 'foam-rolling',
    duration: 25,
    difficulty: 'intermedio',
    targetArea: ['espalda', 'piernas', 'glúteos', 'cuádriceps'],
    bestFor: 'Post-entrenamiento de pierna o espalda',
    benefits: [
      'Reduce tensión muscular',
      'Mejora circulación',
      'Previene lesiones',
      'Acelera recuperación',
    ],
    exercises: [
      {
        id: '1',
        name: 'Roll de Cuádriceps',
        duration: 60,
        sets: 2,
        notes: 'Movimiento lento, detente en puntos tensos 20-30 segundos',
      },
      {
        id: '2',
        name: 'Roll de IT Band',
        duration: 45,
        sets: 2,
        notes: 'Lateral del muslo, evita rodar directamente sobre la rodilla',
      },
      {
        id: '3',
        name: 'Roll de Glúteos',
        duration: 45,
        sets: 2,
        notes: 'Cruza pierna sobre rodilla, busca trigger points',
      },
      {
        id: '4',
        name: 'Roll de Espalda Alta',
        duration: 60,
        sets: 2,
        notes: 'Evita zona lumbar, enfócate en dorsales',
      },
      {
        id: '5',
        name: 'Roll de Pantorrillas',
        duration: 45,
        sets: 2,
        notes: 'Ambas piernas o una por vez para más presión',
      },
    ],
  },
  {
    id: '2',
    name: 'Movilidad Matutina',
    type: 'mobility',
    duration: 15,
    difficulty: 'principiante',
    targetArea: ['cadera', 'hombros', 'columna', 'tobillos'],
    bestFor: 'Al despertar o antes de entrenar',
    benefits: [
      'Mejora rango de movimiento',
      'Reduce rigidez matutina',
      'Previene lesiones',
      'Activa articulaciones',
    ],
    exercises: [
      {
        id: '1',
        name: 'Cat-Cow',
        duration: 60,
        sets: 3,
        notes: 'Inhala en cow, exhala en cat, movimiento fluido',
      },
      {
        id: '2',
        name: 'World\'s Greatest Stretch',
        duration: 90,
        sets: 2,
        notes: 'Mantén cada posición 3-5 segundos',
      },
      {
        id: '3',
        name: 'Círculos de Cadera',
        duration: 45,
        sets: 2,
        notes: '10 círculos en cada dirección',
      },
      {
        id: '4',
        name: 'Dislocaciones de Hombro',
        duration: 45,
        sets: 2,
        notes: 'Usa banda o palo, movimiento lento y controlado',
      },
      {
        id: '5',
        name: 'Movilidad de Tobillo',
        duration: 45,
        sets: 2,
        notes: 'Rodilla hacia adelante sin despegar talón',
      },
    ],
  },
  {
    id: '3',
    name: 'Estiramiento Post-Entrenamiento',
    type: 'stretching',
    duration: 20,
    difficulty: 'principiante',
    targetArea: ['todo el cuerpo'],
    bestFor: 'Después de cualquier entrenamiento',
    benefits: [
      'Reduce dolor muscular',
      'Mejora flexibilidad',
      'Acelera recuperación',
      'Relaja el sistema nervioso',
    ],
    exercises: [
      {
        id: '1',
        name: 'Estiramiento de Cuádriceps',
        duration: 60,
        notes: 'Mantén 30 segundos por pierna',
      },
      {
        id: '2',
        name: 'Estiramiento de Isquios',
        duration: 60,
        notes: 'Punta del pie hacia ti, espalda recta',
      },
      {
        id: '3',
        name: 'Mariposa',
        duration: 60,
        notes: 'Presiona suavemente rodillas hacia el suelo',
      },
      {
        id: '4',
        name: 'Estiramiento de Pecho',
        duration: 45,
        notes: 'En esquina o marco de puerta',
      },
      {
        id: '5',
        name: 'Child\'s Pose',
        duration: 90,
        notes: 'Respira profundamente, relaja completamente',
      },
    ],
  },
  {
    id: '4',
    name: 'Respiración y Relajación',
    type: 'breathing',
    duration: 10,
    difficulty: 'principiante',
    targetArea: ['sistema nervioso'],
    bestFor: 'Antes de dormir o reducir estrés',
    benefits: [
      'Reduce estrés',
      'Mejora calidad de sueño',
      'Activa sistema parasimpático',
      'Mejora concentración',
    ],
    exercises: [
      {
        id: '1',
        name: 'Respiración 4-7-8',
        duration: 180,
        notes: 'Inhala 4 seg, sostén 7 seg, exhala 8 seg. Repite 4 veces',
      },
      {
        id: '2',
        name: 'Box Breathing',
        duration: 180,
        notes: 'Inhala 4, sostén 4, exhala 4, sostén 4. Repite',
      },
      {
        id: '3',
        name: 'Respiración Diafragmática',
        duration: 240,
        notes: 'Mano en abdomen, respira expandiendo solo el abdomen',
      },
    ],
  },
];

export default function RecoveryProtocols() {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [activeProtocol, setActiveProtocol] = useState<string | null>(null);

  const types = [
    { id: 'all', label: 'Todos', icon: 'grid' },
    { id: 'foam-rolling', label: 'Foam Rolling', icon: 'ellipse' },
    { id: 'mobility', label: 'Movilidad', icon: 'fitness' },
    { id: 'stretching', label: 'Estiramientos', icon: 'hand-left' },
    { id: 'breathing', label: 'Respiración', icon: 'water' },
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'foam-rolling':
        return '#EF4444';
      case 'mobility':
        return '#FFEA00';
      case 'stretching':
        return '#9D12DE';
      case 'breathing':
        return '#9D12DE';
      case 'massage':
        return '#8B5CF6';
      case 'cold-therapy':
        return '#06B6D4';
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

  const startProtocol = (protocol: RecoveryProtocol) => {
    setActiveProtocol(protocol.id);
    Alert.alert(
      'Iniciar Protocolo',
      `${protocol.name}\n\n${protocol.duration} minutos\n${protocol.exercises.length} ejercicios\n\n¿Listo para comenzar?`,
      [
        { text: 'Cancelar', onPress: () => setActiveProtocol(null), style: 'cancel' },
        {
          text: 'Comenzar',
          onPress: () => {
            Alert.alert('¡En marcha!', 'Sigue las instrucciones de cada ejercicio');
          },
        },
      ]
    );
  };

  const filteredProtocols = selectedType === 'all'
    ? RECOVERY_PROTOCOLS
    : RECOVERY_PROTOCOLS.filter((p) => p.type === selectedType);

  return (
    <View className="flex-1 bg-zinc-950">
      {/* Header */}
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1 ml-3">
            Protocolos de Recuperación
          </Text>
          <TouchableOpacity>
            <Ionicons name="bookmark-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View className="bg-gradient-to-br from-primary to-[#7D0EBE] rounded-xl p-4 mb-4">
          <View className="flex-row items-center justify-between">
            <View className="flex-1">
              <Text className="text-white/80 text-sm mb-1">Sesiones Este Mes</Text>
              <Text className="text-white font-bold text-4xl mb-1">
                18
              </Text>
              <Text className="text-white/80 text-sm">
                6.2 horas de recuperación
              </Text>
            </View>
            <View className="bg-white/20 rounded-full p-4">
              <Ionicons name="heart" size={32} color="white" />
            </View>
          </View>
        </View>

        {/* Type Filter */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row gap-2">
            {types.map((type) => (
              <TouchableOpacity
                key={type.id}
                onPress={() => setSelectedType(type.id)}
                className={`flex-row items-center px-4 py-2 rounded-lg ${
                  selectedType === type.id
                    ? 'bg-primary'
                    : 'bg-zinc-900 border border-zinc-800'
                }`}
              >
                <Ionicons
                  name={type.icon as any}
                  size={18}
                  color={selectedType === type.id ? 'white' : '#71717A'}
                />
                <Text
                  className={`ml-2 font-semibold text-sm ${
                    selectedType === type.id ? 'text-white' : 'text-zinc-400'
                  }`}
                >
                  {type.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          <Text className="text-white font-bold text-lg mb-3">
            Protocolos Disponibles ({filteredProtocols.length})
          </Text>

          {filteredProtocols.map((protocol) => (
            <View
              key={protocol.id}
              className={`bg-zinc-900 rounded-xl p-4 mb-4 border-2 ${
                activeProtocol === protocol.id ? 'border-primary' : 'border-zinc-800'
              }`}
            >
              <View className="flex-row items-start justify-between mb-3">
                <View className="flex-1">
                  <View className="flex-row items-center mb-2">
                    <View
                      className="w-10 h-10 rounded-full items-center justify-center"
                      style={{ backgroundColor: getTypeColor(protocol.type) + '20' }}
                    >
                      <Ionicons
                        name="heart"
                        size={20}
                        color={getTypeColor(protocol.type)}
                      />
                    </View>
                    <View className="ml-3 flex-1">
                      <Text className="text-white font-bold text-lg">
                        {protocol.name}
                      </Text>
                      <Text className="text-zinc-400 text-sm">
                        {protocol.bestFor}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

              <View className="flex-row gap-2 mb-3">
                <View
                  className="px-3 py-1 rounded-full"
                  style={{ backgroundColor: getTypeColor(protocol.type) + '20' }}
                >
                  <Text
                    className="text-xs font-bold capitalize"
                    style={{ color: getTypeColor(protocol.type) }}
                  >
                    {protocol.type.replace('-', ' ')}
                  </Text>
                </View>
                <View
                  className="px-3 py-1 rounded-full"
                  style={{ backgroundColor: getDifficultyColor(protocol.difficulty) + '20' }}
                >
                  <Text
                    className="text-xs font-bold capitalize"
                    style={{ color: getDifficultyColor(protocol.difficulty) }}
                  >
                    {protocol.difficulty}
                  </Text>
                </View>
                <View className="bg-zinc-800 px-3 py-1 rounded-full">
                  <Text className="text-zinc-400 text-xs">
                    {protocol.duration} min
                  </Text>
                </View>
                <View className="bg-zinc-800 px-3 py-1 rounded-full">
                  <Text className="text-zinc-400 text-xs">
                    {protocol.exercises.length} ejercicios
                  </Text>
                </View>
              </View>

              {/* Benefits */}
              <View className="bg-zinc-800 rounded-lg p-3 mb-3">
                <Text className="text-white font-bold text-sm mb-2">Beneficios</Text>
                {protocol.benefits.map((benefit, index) => (
                  <View key={index} className="flex-row items-center mb-1">
                    <Ionicons name="checkmark-circle" size={14} color="#9D12DE" />
                    <Text className="text-zinc-300 text-sm ml-2">{benefit}</Text>
                  </View>
                ))}
              </View>

              {/* Exercises Preview */}
              <View className="bg-zinc-800 rounded-lg p-3 mb-3">
                <Text className="text-white font-bold text-sm mb-2">
                  Ejercicios ({protocol.exercises.length})
                </Text>
                {protocol.exercises.slice(0, 3).map((exercise, index) => (
                  <View
                    key={exercise.id}
                    className={`flex-row items-center justify-between py-2 ${
                      index < 2 ? 'border-b border-zinc-700' : ''
                    }`}
                  >
                    <View className="flex-1">
                      <Text className="text-zinc-300 text-sm">{exercise.name}</Text>
                      <Text className="text-zinc-500 text-xs">{exercise.notes}</Text>
                    </View>
                    <Text className="text-zinc-400 text-xs">
                      {exercise.duration}s
                    </Text>
                  </View>
                ))}
                {protocol.exercises.length > 3 && (
                  <Text className="text-zinc-500 text-xs mt-2">
                    +{protocol.exercises.length - 3} más...
                  </Text>
                )}
              </View>

              {/* Target Areas */}
              <View className="flex-row flex-wrap gap-2 mb-3">
                {protocol.targetArea.map((area, index) => (
                  <View key={index} className="bg-zinc-800 px-3 py-1 rounded-full">
                    <Text className="text-zinc-400 text-xs capitalize">{area}</Text>
                  </View>
                ))}
              </View>

              <TouchableOpacity
                onPress={() => startProtocol(protocol)}
                className={`${
                  activeProtocol === protocol.id ? 'bg-primary' : 'bg-zinc-800'
                } rounded-lg p-3`}
              >
                <View className="flex-row items-center justify-center">
                  <Ionicons
                    name={activeProtocol === protocol.id ? 'checkmark-circle' : 'play'}
                    size={18}
                    color="white"
                  />
                  <Text className="text-white font-bold ml-2">
                    {activeProtocol === protocol.id ? 'En Curso' : 'Iniciar Protocolo'}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Info Card */}
        <View className="px-6 pb-6 pt-4">
          <View className="bg-primary/10 rounded-xl p-4 border border-primary/30">
            <View className="flex-row items-start">
              <Ionicons name="information-circle" size={20} color="#9D12DE" />
              <View className="flex-1 ml-3">
                <Text className="text-primary/80 font-bold mb-2">
                  Recuperación Activa
                </Text>
                <Text className="text-primary/60 text-sm">
                  La recuperación es tan importante como el entrenamiento. Dedica 15-30 minutos diarios a estos protocolos para maximizar resultados y prevenir lesiones.
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

