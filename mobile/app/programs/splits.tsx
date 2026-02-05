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

interface TrainingSplit {
  id: string;
  name: string;
  description: string;
  frequency: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  goal: string;
  schedule: {
    day: string;
    focus: string;
    exercises: string[];
  }[];
  pros: string[];
  cons: string[];
  icon: string;
}

const TRAINING_SPLITS: TrainingSplit[] = [
  {
    id: '1',
    name: 'Push / Pull / Legs (PPL)',
    description: 'División clásica de 6 días por semana',
    frequency: '6 días/semana',
    level: 'intermediate',
    goal: 'Hipertrofia + Fuerza',
    schedule: [
      {
        day: 'Lunes - Push',
        focus: 'Pecho, Hombros, Tríceps',
        exercises: ['Press Banca', 'Press Inclinado', 'Press Militar', 'Elevaciones Laterales', 'Tríceps Polea'],
      },
      {
        day: 'Martes - Pull',
        focus: 'Espalda, Bíceps',
        exercises: ['Peso Muerto', 'Dominadas', 'Remo con Barra', 'Face Pulls', 'Curl con Barra'],
      },
      {
        day: 'Miércoles - Legs',
        focus: 'Piernas completas',
        exercises: ['Sentadilla', 'Prensa', 'RDL', 'Curl Femoral', 'Elevaciones Gemelos'],
      },
      {
        day: 'Jueves - Push',
        focus: 'Pecho, Hombros, Tríceps',
        exercises: ['Press Inclinado con Mancuernas', 'Aperturas', 'Arnold Press', 'Pájaros', 'Fondos'],
      },
      {
        day: 'Viernes - Pull',
        focus: 'Espalda, Bíceps',
        exercises: ['Remo con Mancuernas', 'Pulldowns', 'Remo en Polea', 'Curl Martillo', 'Curl Concentrado'],
      },
      {
        day: 'Sábado - Legs',
        focus: 'Piernas completas',
        exercises: ['Sentadilla Frontal', 'Zancadas', 'Peso Muerto Sumo', 'Extensiones', 'Gemelos Sentado'],
      },
    ],
    pros: [
      'Alta frecuencia (2x semana por grupo)',
      'Ã“ptimo para hipertrofia',
      'Buena recuperación entre grupos',
      'Flexible y adaptable',
    ],
    cons: [
      'Requiere 6 días/semana',
      'Sesiones largas',
      'Puede ser demandante',
    ],
    icon: 'ðŸ’ª',
  },
  {
    id: '2',
    name: 'Upper / Lower',
    description: 'División de 4 días alternando tren superior e inferior',
    frequency: '4 días/semana',
    level: 'beginner',
    goal: 'Fuerza + Hipertrofia',
    schedule: [
      {
        day: 'Lunes - Upper',
        focus: 'Tren superior completo',
        exercises: ['Press Banca', 'Remo con Barra', 'Press Militar', 'Dominadas', 'Curl + Tríceps'],
      },
      {
        day: 'Martes - Lower',
        focus: 'Tren inferior completo',
        exercises: ['Sentadilla', 'Peso Muerto Rumano', 'Prensa', 'Curl Femoral', 'Gemelos'],
      },
      {
        day: 'Jueves - Upper',
        focus: 'Tren superior (variación)',
        exercises: ['Press Inclinado', 'Remo con Mancuernas', 'Aperturas', 'Pulldowns', 'Trabajo Brazos'],
      },
      {
        day: 'Viernes - Lower',
        focus: 'Tren inferior (variación)',
        exercises: ['Sentadilla Frontal', 'Peso Muerto', 'Zancadas', 'Extensiones', 'Gemelos'],
      },
    ],
    pros: [
      'Solo 4 días/semana',
      'Alta frecuencia (2x grupo)',
      'Ideal principiantes',
      'Balance fuerza/hipertrofia',
    ],
    cons: [
      'Sesiones muy largas',
      'Fatiga en lower days',
      'Menos enfoque por grupo',
    ],
    icon: 'â¬†ï¸â¬‡ï¸',
  },
  {
    id: '3',
    name: 'Bro Split (5 días)',
    description: 'Un grupo muscular por día',
    frequency: '5 días/semana',
    level: 'intermediate',
    goal: 'Hipertrofia',
    schedule: [
      {
        day: 'Lunes - Pecho',
        focus: 'Pectorales',
        exercises: ['Press Banca', 'Press Inclinado', 'Aperturas', 'Press con Mancuernas', 'Cable Flyes'],
      },
      {
        day: 'Martes - Espalda',
        focus: 'Dorsales',
        exercises: ['Peso Muerto', 'Dominadas', 'Remo con Barra', 'Remo con Mancuernas', 'Pulldowns'],
      },
      {
        day: 'Miércoles - Piernas',
        focus: 'Cuádriceps + Isquios',
        exercises: ['Sentadilla', 'Prensa', 'RDL', 'Curl Femoral', 'Extensiones', 'Gemelos'],
      },
      {
        day: 'Jueves - Hombros',
        focus: 'Deltoides',
        exercises: ['Press Militar', 'Elevaciones Laterales', 'Pájaros', 'Arnold Press', 'Face Pulls'],
      },
      {
        day: 'Viernes - Brazos',
        focus: 'Bíceps + Tríceps',
        exercises: ['Curl con Barra', 'Curl Martillo', 'Tríceps Polea', 'Fondos', 'Curl Concentrado'],
      },
    ],
    pros: [
      'Enfoque total en un músculo',
      'Alto volumen por grupo',
      'Buena congestión muscular',
      'Simple de seguir',
    ],
    cons: [
      'Baja frecuencia (1x semana)',
      'Subóptimo para fuerza',
      'Largo tiempo de recuperación',
    ],
    icon: 'ðŸ’ªðŸ”¥',
  },
  {
    id: '4',
    name: 'Full Body (3 días)',
    description: 'Cuerpo completo cada sesión',
    frequency: '3 días/semana',
    level: 'beginner',
    goal: 'Fuerza + Principiantes',
    schedule: [
      {
        day: 'Lunes - Full Body A',
        focus: 'Cuerpo completo',
        exercises: ['Sentadilla', 'Press Banca', 'Remo con Barra', 'Press Militar', 'Curl + Tríceps'],
      },
      {
        day: 'Miércoles - Full Body B',
        focus: 'Cuerpo completo',
        exercises: ['Peso Muerto', 'Press Inclinado', 'Dominadas', 'Zancadas', 'Work Hombros'],
      },
      {
        day: 'Viernes - Full Body C',
        focus: 'Cuerpo completo',
        exercises: ['Sentadilla Frontal', 'Press con Mancuernas', 'Peso Muerto Rumano', 'Pulldowns', 'Core'],
      },
    ],
    pros: [
      'Alta frecuencia (3x semana)',
      'Ideal principiantes',
      'Maximiza síntesis proteica',
      'Flexible horarios',
    ],
    cons: [
      'Volumen limitado por grupo',
      'Fatiga central alta',
      'Sesiones largas',
    ],
    icon: 'ðŸ‹ï¸',
  },
  {
    id: '5',
    name: 'Arnold Split',
    description: 'División de Arnold Schwarzenegger',
    frequency: '6 días/semana',
    level: 'advanced',
    goal: 'Hipertrofia Extrema',
    schedule: [
      {
        day: 'Lunes - Pecho + Espalda',
        focus: 'Torso completo',
        exercises: ['Press Banca', 'Dominadas', 'Press Inclinado', 'Remo con Barra', 'Aperturas', 'Pulldowns'],
      },
      {
        day: 'Martes - Hombros + Brazos',
        focus: 'Deltoides + Bíceps/Tríceps',
        exercises: ['Press Militar', 'Curl con Barra', 'Elevaciones Laterales', 'Tríceps Polea', 'Face Pulls'],
      },
      {
        day: 'Miércoles - Piernas',
        focus: 'Piernas completas',
        exercises: ['Sentadilla', 'Peso Muerto Rumano', 'Prensa', 'Curl Femoral', 'Gemelos'],
      },
      {
        day: 'Jueves - Pecho + Espalda',
        focus: 'Torso (variación)',
        exercises: ['Press Inclinado', 'Remo con Mancuernas', 'Aperturas', 'Peso Muerto', 'Cable Flyes'],
      },
      {
        day: 'Viernes - Hombros + Brazos',
        focus: 'Deltoides + Bíceps/Tríceps',
        exercises: ['Arnold Press', 'Curl Martillo', 'Pájaros', 'Fondos', 'Elevaciones Frontales'],
      },
      {
        day: 'Sábado - Piernas',
        focus: 'Piernas (variación)',
        exercises: ['Sentadilla Frontal', 'Peso Muerto Sumo', 'Zancadas', 'Extensiones', 'Gemelos Sentado'],
      },
    ],
    pros: [
      'Volumen extremo',
      'Frecuencia alta',
      'Pump constante',
      'Probado por campeones',
    ],
    cons: [
      'Solo para avanzados',
      'Muy demandante',
      'Requiere mucho tiempo',
      'Alto riesgo sobreentrenamiento',
    ],
    icon: 'ðŸ‘‘',
  },
];

export default function TrainingSplits() {
  const [splits] = useState(TRAINING_SPLITS);
  const [filter, setFilter] = useState<'all' | 'beginner' | 'intermediate' | 'advanced'>('all');

  const levels = [
    { id: 'all', label: 'Todos', icon: 'apps' },
    { id: 'beginner', label: 'Principiante', icon: 'leaf' },
    { id: 'intermediate', label: 'Intermedio', icon: 'flash' },
    { id: 'advanced', label: 'Avanzado', icon: 'rocket' },
  ];

  const filteredSplits = filter === 'all'
    ? splits
    : splits.filter((s) => s.level === filter);

  const viewSplitDetails = (split: TrainingSplit) => {
    const scheduleText = split.schedule.map(
      (day) => `${day.day}\n${day.focus}\n• ${day.exercises.join('\n• ')}`
    ).join('\n\n');

    Alert.alert(
      split.name,
      scheduleText,
      [{ text: 'Cerrar' }]
    );
  };

  const adoptSplit = (splitName: string) => {
    Alert.alert(
      'Adoptar Programa',
      `¿Quieres usar "${splitName}" como tu programa de entrenamiento?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Adoptar',
          onPress: () => Alert.alert('✓ Programa Guardado', 'Ahora puedes seguir este split en tus workouts'),
        },
      ]
    );
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner':
        return 'emerald';
      case 'intermediate':
        return 'blue';
      case 'advanced':
        return 'red';
      default:
        return 'zinc';
    }
  };

  const getLevelLabel = (level: string) => {
    switch (level) {
      case 'beginner':
        return 'PRINCIPIANTE';
      case 'intermediate':
        return 'INTERMEDIO';
      case 'advanced':
        return 'AVANZADO';
      default:
        return level.toUpperCase();
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
            Programas de Entrenamiento
          </Text>
          <TouchableOpacity>
            <Ionicons name="add-circle" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Filters */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row gap-2">
            {levels.map((l) => (
              <TouchableOpacity
                key={l.id}
                onPress={() => setFilter(l.id as any)}
                className={`flex-row items-center px-4 py-2 rounded-lg ${
                  filter === l.id
                    ? 'bg-primary'
                    : 'bg-zinc-900 border border-zinc-800'
                }`}
              >
                <Ionicons
                  name={l.icon as any}
                  size={18}
                  color={filter === l.id ? 'white' : '#71717A'}
                />
                <Text
                  className={`ml-2 font-semibold text-sm ${
                    filter === l.id ? 'text-white' : 'text-zinc-400'
                  }`}
                >
                  {l.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          {/* Info Card */}
          <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-6">
            <View className="flex-row items-start">
              <Ionicons name="information-circle" size={20} color="#9D12DE" />
              <View className="flex-1 ml-3">
                <Text className="text-primary/80 font-bold mb-2">
                  Elige Tu Split
                </Text>
                <Text className="text-primary/60 text-sm">
                  Selecciona según tu nivel, disponibilidad y objetivos. Consistencia &gt; Perfección.
                </Text>
              </View>
            </View>
          </View>

          {/* Splits */}
          {filteredSplits.map((split) => {
            const levelColor = getLevelColor(split.level);
            return (
              <View
                key={split.id}
                className="bg-zinc-900 rounded-xl p-4 mb-4 border border-zinc-800"
              >
                {/* Header */}
                <View className="flex-row items-start justify-between mb-3">
                  <View className="flex-row items-start flex-1">
                    <View className="w-14 h-14 bg-primary rounded-xl items-center justify-center mr-3">
                      <Text className="text-3xl">{split.icon}</Text>
                    </View>
                    <View className="flex-1">
                      <Text className="text-white font-bold text-lg mb-1">
                        {split.name}
                      </Text>
                      <Text className="text-zinc-400 text-sm">{split.description}</Text>
                    </View>
                  </View>
                  <View className={`bg-${levelColor}-500/10 rounded-lg px-2 py-1 border border-${levelColor}-500/30`}>
                    <Text className={`text-${levelColor}-400 text-xs font-bold`}>
                      {getLevelLabel(split.level)}
                    </Text>
                  </View>
                </View>

                {/* Stats */}
                <View className="flex-row gap-2 mb-3">
                  <View className="flex-1 bg-zinc-800 rounded-lg p-2">
                    <View className="flex-row items-center mb-1">
                      <Ionicons name="calendar" size={14} color="#71717A" />
                      <Text className="text-zinc-400 text-xs ml-1">Frecuencia</Text>
                    </View>
                    <Text className="text-white font-bold text-sm">{split.frequency}</Text>
                  </View>
                  <View className="flex-1 bg-zinc-800 rounded-lg p-2">
                    <View className="flex-row items-center mb-1">
                      <Ionicons name="trophy" size={14} color="#71717A" />
                      <Text className="text-zinc-400 text-xs ml-1">Objetivo</Text>
                    </View>
                    <Text className="text-primary font-bold text-sm">{split.goal}</Text>
                  </View>
                </View>

                {/* Schedule Preview */}
                <View className="mb-3">
                  <Text className="text-zinc-400 text-xs mb-2">SEMANA TÃPICA</Text>
                  {split.schedule.slice(0, 3).map((day, index) => (
                    <View key={index} className="flex-row items-center mb-1">
                      <View className="w-2 h-2 bg-primary rounded-full mr-2" />
                      <Text className="text-zinc-300 text-sm flex-1">
                        {day.day}: <Text className="text-zinc-400">{day.focus}</Text>
                      </Text>
                    </View>
                  ))}
                  {split.schedule.length > 3 && (
                    <TouchableOpacity onPress={() => viewSplitDetails(split)}>
                      <Text className="text-primary/80 text-sm ml-4">
                        Ver {split.schedule.length - 3} días más â†’
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>

                {/* Pros & Cons */}
                <View className="flex-row gap-2 mb-3">
                  <View className="flex-1">
                    <Text className="text-primary text-xs font-bold mb-2">✓ PROS</Text>
                    {split.pros.slice(0, 2).map((pro, index) => (
                      <Text key={index} className="text-primary/80 text-xs mb-1">
                        • {pro}
                      </Text>
                    ))}
                  </View>
                  <View className="flex-1">
                    <Text className="text-red-400 text-xs font-bold mb-2">✓ CONTRAS</Text>
                    {split.cons.slice(0, 2).map((con, index) => (
                      <Text key={index} className="text-red-300 text-xs mb-1">
                        • {con}
                      </Text>
                    ))}
                  </View>
                </View>

                {/* Actions */}
                <View className="flex-row gap-2">
                  <TouchableOpacity
                    onPress={() => viewSplitDetails(split)}
                    className="flex-1 bg-primary/10 rounded-lg p-3 border border-primary/30 flex-row items-center justify-center"
                  >
                    <Ionicons name="list" size={16} color="#9D12DE" />
                    <Text className="text-primary/80 font-bold ml-2">Ver Detalles</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => adoptSplit(split.name)}
                    className="flex-1 bg-primary rounded-lg p-3 flex-row items-center justify-center"
                  >
                    <Ionicons name="checkmark-circle" size={16} color="white" />
                    <Text className="text-white font-bold ml-2">Adoptar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}

          {/* Bottom Tip */}
          <View className="bg-amber-500/10 rounded-xl p-4 border border-amber-500/30 mb-6">
            <View className="flex-row items-start">
              <Ionicons name="bulb" size={20} color="#FFEA00" />
              <View className="flex-1 ml-3">
                <Text className="text-amber-400 font-bold mb-2">
                  Consejo Pro
                </Text>
                <Text className="text-amber-300 text-sm">
                  El mejor programa es el que puedes seguir consistentemente. Elige según tu horario, no por lo que hacen influencers.
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}


