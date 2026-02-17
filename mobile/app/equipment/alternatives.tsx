import React, { useState } from 'react';
import { Text } from '@/components/ui/Text';
import { View, TouchableOpacity, ScrollView, Alert } from 'react-native';;
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface EquipmentAlternative {
  exercise: string;
  equipment: string;
  alternatives: {
    name: string;
    equipment: string;
    difficulty: 'easier' | 'same' | 'harder';
    instructions: string;
    targetMuscles: string[];
  }[];
}

const ALTERNATIVES: EquipmentAlternative[] = [
  {
    exercise: 'Sentadilla con Barra',
    equipment: 'Barra + Rack',
    alternatives: [
      {
        name: 'Sentadilla Goblet con Mancuerna',
        equipment: 'Mancuerna única',
        difficulty: 'easier',
        instructions: 'Sostén mancuerna vertical frente al pecho. Sentadilla profunda manteniendo torso erguido.',
        targetMuscles: ['Cuádriceps', 'Glúteos', 'Core'],
      },
      {
        name: 'Sentadilla Búlgara',
        equipment: 'Banco + Mancuernas',
        difficulty: 'same',
        instructions: 'Pie trasero elevado en banco. Descender hasta rodilla casi toca suelo. Unilateral.',
        targetMuscles: ['Cuádriceps', 'Glúteos'],
      },
      {
        name: 'Pistol Squats',
        equipment: 'Peso corporal',
        difficulty: 'harder',
        instructions: 'Sentadilla a una pierna. Pierna libre extendida al frente. Balance crítico.',
        targetMuscles: ['Cuádriceps', 'Glúteos', 'Core', 'Balance'],
      },
      {
        name: 'Sentadilla con Bandas',
        equipment: 'Banda de resistencia',
        difficulty: 'easier',
        instructions: 'Banda bajo pies, agarres en hombros. Tensión progresiva en todo el rango.',
        targetMuscles: ['Cuádriceps', 'Glúteos'],
      },
    ],
  },
  {
    exercise: 'Press de Banca',
    equipment: 'Banco + Barra',
    alternatives: [
      {
        name: 'Push-ups con Lastre',
        equipment: 'Peso corporal + Chaleco',
        difficulty: 'same',
        instructions: 'Flexiones tradicionales con peso adicional en espalda. Rango completo.',
        targetMuscles: ['Pectorales', 'Tríceps', 'Hombros'],
      },
      {
        name: 'Floor Press con Mancuernas',
        equipment: 'Mancuernas',
        difficulty: 'easier',
        instructions: 'Acostado en suelo, press con mancuernas. Rango limitado protege hombros.',
        targetMuscles: ['Pectorales', 'Tríceps'],
      },
      {
        name: 'Dips en Paralelas',
        equipment: 'Barras paralelas',
        difficulty: 'harder',
        instructions: 'Torso inclinado hacia adelante para énfasis pectoral. Descender profundo.',
        targetMuscles: ['Pectorales', 'Tríceps', 'Hombros'],
      },
      {
        name: 'Press con Bandas',
        equipment: 'Bandas elásticas',
        difficulty: 'easier',
        instructions: 'Banda anclada atrás, press hacia adelante. Tensión progresiva.',
        targetMuscles: ['Pectorales', 'Tríceps'],
      },
    ],
  },
  {
    exercise: 'Peso Muerto',
    equipment: 'Barra + Discos',
    alternatives: [
      {
        name: 'Romanian DL con Mancuernas',
        equipment: 'Mancuernas',
        difficulty: 'easier',
        instructions: 'Bisagra de cadera, mancuernas pegadas a piernas. énfasis isquiotibiales.',
        targetMuscles: ['Isquiotibiales', 'Glúteos', 'Espalda baja'],
      },
      {
        name: 'Good Mornings',
        equipment: 'Barra ligera o peso corporal',
        difficulty: 'easier',
        instructions: 'Barra en hombros, bisagra de cadera manteniendo rodillas semi-flexionadas.',
        targetMuscles: ['Isquiotibiales', 'Glúteos', 'Erectores'],
      },
      {
        name: 'Single Leg RDL',
        equipment: 'Mancuerna única',
        difficulty: 'harder',
        instructions: 'Unilateral, pierna libre extendida atrás. Balance y activación glúteo.',
        targetMuscles: ['Isquiotibiales', 'Glúteos', 'Core'],
      },
      {
        name: 'Kettlebell Swings',
        equipment: 'Kettlebell',
        difficulty: 'same',
        instructions: 'Bisagra explosiva de cadera. Proyectar KB hasta hombros. Power training.',
        targetMuscles: ['Glúteos', 'Isquiotibiales', 'Core'],
      },
    ],
  },
  {
    exercise: 'Dominadas',
    equipment: 'Barra fija',
    alternatives: [
      {
        name: 'Australian Pull-ups',
        equipment: 'Barra baja o anillas',
        difficulty: 'easier',
        instructions: 'Cuerpo inclinado bajo barra. Pull horizontal manteniendo cuerpo rígido.',
        targetMuscles: ['Dorsales', 'Bíceps', 'Core'],
      },
      {
        name: 'Lat Pulldown con Banda',
        equipment: 'Banda elástica',
        difficulty: 'easier',
        instructions: 'Banda anclada arriba. Pull vertical hacia pecho. Squeeze escapular.',
        targetMuscles: ['Dorsales', 'Bíceps'],
      },
      {
        name: 'Dominadas Negativas',
        equipment: 'Barra fija',
        difficulty: 'easier',
        instructions: 'Saltar a posición superior. Descender controlado 5-10 seg. Solo excéntrico.',
        targetMuscles: ['Dorsales', 'Bíceps'],
      },
      {
        name: 'Remo con Mancuernas',
        equipment: 'Mancuernas + Banco',
        difficulty: 'easier',
        instructions: 'Torso paralelo a suelo, pull hacia cadera. Retracción escapular.',
        targetMuscles: ['Dorsales', 'Romboides', 'Bíceps'],
      },
    ],
  },
  {
    exercise: 'Press Militar',
    equipment: 'Barra + Rack',
    alternatives: [
      {
        name: 'Pike Push-ups',
        equipment: 'Peso corporal',
        difficulty: 'easier',
        instructions: 'V invertida, caderas arriba. Flexión vertical. Progresión hacia handstand pushups.',
        targetMuscles: ['Deltoides', 'Tríceps'],
      },
      {
        name: 'Arnold Press',
        equipment: 'Mancuernas',
        difficulty: 'same',
        instructions: 'Rotación de palmas durante el press. Mayor ROM y activación deltoides.',
        targetMuscles: ['Deltoides', 'Tríceps'],
      },
      {
        name: 'Handstand Push-ups',
        equipment: 'Pared',
        difficulty: 'harder',
        instructions: 'Invertido contra pared. Press completo vertical. Máxima dificultad.',
        targetMuscles: ['Deltoides', 'Tríceps', 'Core'],
      },
      {
        name: 'Press con Bandas',
        equipment: 'Bandas elásticas',
        difficulty: 'easier',
        instructions: 'Banda bajo pies, press vertical. Tensión progresiva máxima arriba.',
        targetMuscles: ['Deltoides', 'Tríceps'],
      },
    ],
  },
];

export default function EquipmentAlternatives() {
  const [alternatives] = useState(ALTERNATIVES);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (exercise: string) => {
    setExpandedId(expandedId === exercise ? null : exercise);
  };

  const viewAlternativeDetails = (exercise: string, alternative: any) => {
    Alert.alert(
      alternative.name,
      `Equipo: ${alternative.equipment}\n\n${alternative.instructions}\n\nMúsculos: ${alternative.targetMuscles.join(', ')}`,
      [{ text: 'Entendido' }]
    );
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easier':
        return 'text-primary';
      case 'same':
        return 'text-primary/80';
      case 'harder':
        return 'text-red-400';
      default:
        return 'text-zinc-400';
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'easier':
        return 'MÁS FÁCIL';
      case 'same':
        return 'SIMILAR';
      case 'harder':
        return 'MÁS DIFÍCIL';
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
            Alternativas de Equipo
          </Text>
          <TouchableOpacity>
            <Ionicons name="search" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Info Card */}
        <View className="bg-primary/10 rounded-xl p-4 border border-primary/30">
          <View className="flex-row items-start">
            <Ionicons name="information-circle" size={20} color="#9D12DE" />
            <View className="flex-1 ml-3">
              <Text className="text-primary/80 font-bold mb-2">
                Adapta Tu Entrenamiento
              </Text>
              <Text className="text-primary/60 text-sm">
                Sin equipo específico? Encuentra alternativas efectivas para cada ejercicio
              </Text>
            </View>
          </View>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          {alternatives.map((item) => (
            <View
              key={item.exercise}
              className="bg-zinc-900 rounded-xl p-4 mb-4 border border-zinc-800"
            >
              {/* Exercise Header */}
              <TouchableOpacity
                onPress={() => toggleExpand(item.exercise)}
                activeOpacity={0.7}
              >
                <View className="flex-row items-center justify-between mb-2">
                  <View className="flex-1">
                    <Text className="text-white font-bold text-lg mb-1">
                      {item.exercise}
                    </Text>
                    <View className="flex-row items-center">
                      <Ionicons name="barbell" size={14} color="#71717A" />
                      <Text className="text-zinc-400 text-sm ml-1">
                        {item.equipment}
                      </Text>
                    </View>
                  </View>
                  <View className="flex-row items-center">
                    <View className="bg-primary/10 rounded-lg px-2 py-1 mr-2">
                      <Text className="text-primary text-xs font-bold">
                        {item.alternatives.length} ALT
                      </Text>
                    </View>
                    <Ionicons
                      name={expandedId === item.exercise ? 'chevron-up' : 'chevron-down'}
                      size={20}
                      color="#71717A"
                    />
                  </View>
                </View>
              </TouchableOpacity>

              {/* Alternatives List */}
              {expandedId === item.exercise && (
                <View className="mt-3 pt-3 border-t border-zinc-800">
                  {item.alternatives.map((alt, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => viewAlternativeDetails(item.exercise, alt)}
                      activeOpacity={0.7}
                      className="bg-zinc-800 rounded-lg p-3 mb-3 last:mb-0"
                    >
                      {/* Alt Header */}
                      <View className="flex-row items-start justify-between mb-2">
                        <View className="flex-1">
                          <Text className="text-white font-bold mb-1">{alt.name}</Text>
                          <View className="flex-row items-center">
                            <Ionicons name="construct" size={12} color="#71717A" />
                            <Text className="text-zinc-400 text-xs ml-1">
                              {alt.equipment}
                            </Text>
                          </View>
                        </View>
                        <View className={`px-2 py-1 rounded-lg ${
                          alt.difficulty === 'easier'
                            ? 'bg-primary/10 border border-primary/30'
                            : alt.difficulty === 'same'
                            ? 'bg-primary/10 border border-primary/30'
                            : 'bg-red-500/10 border border-red-500/30'
                        }`}>
                          <Text className={`text-xs font-bold ${getDifficultyColor(alt.difficulty)}`}>
                            {getDifficultyLabel(alt.difficulty)}
                          </Text>
                        </View>
                      </View>

                      {/* Instructions */}
                      <Text className="text-zinc-300 text-sm mb-2">
                        {alt.instructions}
                      </Text>

                      {/* Target Muscles */}
                      <View>
                        <Text className="text-zinc-400 text-xs mb-1">MÚSCULOS</Text>
                        <View className="flex-row flex-wrap gap-1">
                          {alt.targetMuscles.map((muscle, i) => (
                            <View key={i} className="bg-zinc-700 rounded px-2 py-1">
                              <Text className="text-zinc-300 text-xs">{muscle}</Text>
                            </View>
                          ))}
                        </View>
                      </View>

                      {/* View Details Arrow */}
                      <View className="flex-row items-center justify-end mt-2">
                        <Text className="text-primary/80 text-xs mr-1">Ver detalles</Text>
                        <Ionicons name="arrow-forward" size={12} color="#9D12DE" />
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          ))}
        </View>

        {/* Bottom Tips */}
        <View className="px-6 pb-6 pt-2">
          <View className="bg-amber-500/10 rounded-xl p-4 border border-amber-500/30 mb-3">
            <View className="flex-row items-start">
              <Ionicons name="bulb" size={20} color="#FFEA00" />
              <View className="flex-1 ml-3">
                <Text className="text-amber-400 font-bold mb-2">
                  Variación = Progreso
                </Text>
                <Text className="text-amber-300 text-sm">
                  Rotar entre variaciones previene adaptación y plateaus. Cambia ejercicios cada 4-6 semanas.
                </Text>
              </View>
            </View>
          </View>

          <View className="bg-primary/10 rounded-xl p-4 border border-primary/30">
            <View className="flex-row items-start">
              <Ionicons name="home" size={20} color="#9D12DE" />
              <View className="flex-1 ml-3">
                <Text className="text-primary font-bold mb-2">
                  Home Gym Friendly
                </Text>
                <Text className="text-primary/80 text-sm">
                  Mancuernas ajustables + barra fija = 90% de ejercicios cubiertos
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}


