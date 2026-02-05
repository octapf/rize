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

interface ExerciseVariation {
  name: string;
  difficulty: 'easier' | 'same' | 'harder';
  equipmentNeeded: string[];
  muscleEmphasis: string;
  description: string;
}

interface ExerciseSubstitution {
  id: string;
  originalExercise: string;
  category: string;
  reason: string;
  variations: ExerciseVariation[];
}

const SUBSTITUTIONS: ExerciseSubstitution[] = [
  {
    id: '1',
    originalExercise: 'Sentadilla con Barra',
    category: 'Piernas',
    reason: 'Dolor de rodilla / Sin rack disponible / Movilidad limitada',
    variations: [
      {
        name: 'Sentadilla Goblet',
        difficulty: 'easier',
        equipmentNeeded: ['Mancuerna', 'Kettlebell'],
        muscleEmphasis: 'Enfoque en cuÃ¡driceps, menos carga en espalda',
        description: 'SostÃ©n peso frente al pecho. Perfecto para principiantes y trabajo de movilidad.',
      },
      {
        name: 'Prensa de Piernas',
        difficulty: 'easier',
        equipmentNeeded: ['MÃ¡quina de prensa'],
        muscleEmphasis: 'CuÃ¡driceps y glÃºteos, sin carga axial',
        description: 'Elimina componente de estabilizaciÃ³n. Ideal si hay dolor de espalda baja.',
      },
      {
        name: 'Sentadilla BÃºlgara',
        difficulty: 'harder',
        equipmentNeeded: ['Banco', 'Mancuernas'],
        muscleEmphasis: 'Unilateral - mayor activaciÃ³n glÃºteos',
        description: 'Exige mÃ¡s balance. Excelente para corregir asimetrÃ­as.',
      },
      {
        name: 'Hack Squat',
        difficulty: 'same',
        equipmentNeeded: ['MÃ¡quina hack squat'],
        muscleEmphasis: 'CuÃ¡driceps dominante, trayectoria fija',
        description: 'PatrÃ³n similar pero guiado. Permite cargar pesado con seguridad.',
      },
    ],
  },
  {
    id: '2',
    originalExercise: 'Press de Banca',
    category: 'Pecho',
    reason: 'Dolor de hombro / Sin banco disponible / Plateu',
    variations: [
      {
        name: 'Press con Mancuernas',
        difficulty: 'same',
        equipmentNeeded: ['Mancuernas', 'Banco'],
        muscleEmphasis: 'Mayor rango de movimiento, menos estrÃ©s en hombros',
        description: 'ROM completo. Requiere mÃ¡s estabilizaciÃ³n que barra.',
      },
      {
        name: 'Flexiones',
        difficulty: 'easier',
        equipmentNeeded: ['Ninguno'],
        muscleEmphasis: 'Bodyweight, mÃ¡s activaciÃ³n core',
        description: 'Sin equipo necesario. Escala con elevaciÃ³n/peso.',
      },
      {
        name: 'Press Inclinado con Mancuernas',
        difficulty: 'same',
        equipmentNeeded: ['Mancuernas', 'Banco inclinado'],
        muscleEmphasis: 'Pectoral superior y deltoides anterior',
        description: 'Cambia Ã¡ngulo de presiÃ³n. Menos estrÃ©s en hombro.',
      },
      {
        name: 'Press en MÃ¡quina',
        difficulty: 'easier',
        equipmentNeeded: ['MÃ¡quina chest press'],
        muscleEmphasis: 'Aislamiento pectoral, trayectoria fija',
        description: 'Perfecto para trabajo de volumen sin fatiga neural.',
      },
    ],
  },
  {
    id: '3',
    originalExercise: 'Peso Muerto Convencional',
    category: 'Espalda / Posterior',
    reason: 'Dolor de espalda baja / Movilidad cadera / Sin barra',
    variations: [
      {
        name: 'Peso Muerto Rumano',
        difficulty: 'easier',
        equipmentNeeded: ['Barra', 'Mancuernas'],
        muscleEmphasis: 'Isquiotibiales y glÃºteos, menos espalda baja',
        description: 'ROM mÃ¡s corto. Excelente para hipertrofia de femoral.',
      },
      {
        name: 'Peso Muerto Sumo',
        difficulty: 'same',
        equipmentNeeded: ['Barra'],
        muscleEmphasis: 'MÃ¡s glÃºteos y aductores, menos espalda',
        description: 'Stance amplio. Reduce recorrido y estrÃ©s lumbar.',
      },
      {
        name: 'Trap Bar Deadlift',
        difficulty: 'easier',
        equipmentNeeded: ['Trap bar'],
        muscleEmphasis: 'MÃ¡s cuÃ¡driceps, posiciÃ³n mÃ¡s natural',
        description: 'Centro de gravedad mejor. Ideal para principiantes.',
      },
      {
        name: 'Deficit Deadlift',
        difficulty: 'harder',
        equipmentNeeded: ['Barra', 'Plataforma elevada'],
        muscleEmphasis: 'Mayor ROM, mÃ¡s fuerza del piso',
        description: 'Parado sobre plataforma. Para avanzados.',
      },
    ],
  },
  {
    id: '4',
    originalExercise: 'Dominadas',
    category: 'Espalda',
    reason: 'Insuficiente fuerza / Sin barra / Dolor de codo',
    variations: [
      {
        name: 'Dominadas Asistidas',
        difficulty: 'easier',
        equipmentNeeded: ['MÃ¡quina asistida', 'Banda elÃ¡stica'],
        muscleEmphasis: 'Mismo patrÃ³n, carga reducida',
        description: 'ProgresiÃ³n hacia dominadas completas.',
      },
      {
        name: 'Dominadas Negativas',
        difficulty: 'easier',
        equipmentNeeded: ['Barra fija'],
        muscleEmphasis: 'Fase excÃ©ntrica, construye fuerza',
        description: 'Solo bajar lentamente. Muy efectivo.',
      },
      {
        name: 'Lat Pulldown',
        difficulty: 'easier',
        equipmentNeeded: ['MÃ¡quina lat pulldown'],
        muscleEmphasis: 'Dorsales, carga ajustable',
        description: 'PatrÃ³n similar en mÃ¡quina.',
      },
      {
        name: 'Dominadas con Peso',
        difficulty: 'harder',
        equipmentNeeded: ['Barra', 'CinturÃ³n de lastre', 'Discos'],
        muscleEmphasis: 'MÃ¡xima fuerza y masa',
        description: 'Para avanzados. Carga progresiva.',
      },
    ],
  },
];

export default function ExerciseVariations() {
  const [substitutions, setSubstitutions] = useState(SUBSTITUTIONS);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSubs = substitutions.filter((sub) =>
    sub.originalExercise.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectVariation = (original: string, variation: ExerciseVariation) => {
    Alert.alert(
      `Sustituir con ${variation.name}`,
      `${variation.description}\n\nEquipo: ${variation.equipmentNeeded.join(', ')}`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Usar Esta',
          onPress: () =>
            Alert.alert(
              'SustituciÃ³n Aplicada',
              `${original} â†’ ${variation.name} en tu prÃ³ximo workout`
            ),
        },
      ]
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
        return 'MÃ¡s FÃ¡cil';
      case 'same':
        return 'Similar';
      case 'harder':
        return 'MÃ¡s DifÃ­cil';
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
            Variaciones de Ejercicios
          </Text>
          <TouchableOpacity>
            <Ionicons name="help-circle-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Search */}
        <View className="bg-zinc-900 rounded-xl p-3 border border-zinc-800 flex-row items-center">
          <Ionicons name="search" size={20} color="#71717A" />
          <TextInput
            placeholder="Buscar ejercicio..."
            placeholderTextColor="#71717A"
            value={searchQuery}
            onChangeText={setSearchQuery}
            className="text-white text-base ml-3 flex-1"
          />
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          {/* Info Card */}
          <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-6">
            <View className="flex-row items-start">
              <Ionicons name="information-circle" size={20} color="#9D12DE" />
              <View className="flex-1 ml-3">
                <Text className="text-primary/80 font-bold mb-2">
                  Encuentra Alternativas
                </Text>
                <Text className="text-primary/60 text-sm">
                  Â¿LesiÃ³n? Â¿Sin equipo? Â¿Estancado? Descubre variaciones efectivas para
                  cada ejercicio.
                </Text>
              </View>
            </View>
          </View>

          {/* Substitutions */}
          {filteredSubs.map((sub) => (
            <View
              key={sub.id}
              className="bg-zinc-900 rounded-xl p-4 mb-6 border border-zinc-800"
            >
              {/* Original Exercise */}
              <View className="mb-4 pb-4 border-b border-zinc-800">
                <View className="flex-row items-center mb-2">
                  <Ionicons name="fitness" size={20} color="#9D12DE" />
                  <Text className="text-primary text-xs font-bold ml-2">
                    EJERCICIO ORIGINAL
                  </Text>
                </View>
                <Text className="text-white font-bold text-xl mb-1">
                  {sub.originalExercise}
                </Text>
                <Text className="text-zinc-400 text-sm mb-2">{sub.category}</Text>
                <View className="bg-amber-500/10 rounded-lg p-2 border border-amber-500/30">
                  <Text className="text-amber-300 text-xs">
                    Razones para sustituir: {sub.reason}
                  </Text>
                </View>
              </View>

              {/* Variations */}
              <Text className="text-white font-bold mb-3">Alternativas ({sub.variations.length})</Text>
              {sub.variations.map((variation, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => selectVariation(sub.originalExercise, variation)}
                  activeOpacity={0.7}
                  className="bg-zinc-800 rounded-lg p-4 mb-3 last:mb-0"
                >
                  {/* Variation Header */}
                  <View className="flex-row items-start justify-between mb-3">
                    <View className="flex-1">
                      <Text className="text-white font-bold text-lg mb-1">
                        {variation.name}
                      </Text>
                      <View
                        className={`inline-flex px-2 py-1 rounded-lg ${
                          variation.difficulty === 'easier'
                            ? 'bg-primary/10'
                            : variation.difficulty === 'same'
                            ? 'bg-primary/10'
                            : 'bg-red-500/10'
                        }`}
                      >
                        <Text
                          className={`text-xs font-bold ${getDifficultyColor(
                            variation.difficulty
                          )}`}
                        >
                          {getDifficultyLabel(variation.difficulty).toUpperCase()}
                        </Text>
                      </View>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color="#71717A" />
                  </View>

                  {/* Description */}
                  <Text className="text-zinc-300 text-sm mb-3">
                    {variation.description}
                  </Text>

                  {/* Muscle Emphasis */}
                  <View className="bg-zinc-900 rounded-lg p-2 mb-2">
                    <Text className="text-zinc-400 text-xs mb-1">ENFOQUE MUSCULAR</Text>
                    <Text className="text-white text-sm">{variation.muscleEmphasis}</Text>
                  </View>

                  {/* Equipment */}
                  <View>
                    <Text className="text-zinc-400 text-xs mb-2">EQUIPO NECESARIO</Text>
                    <View className="flex-row flex-wrap gap-2">
                      {variation.equipmentNeeded.map((equipment, i) => (
                        <View key={i} className="bg-zinc-900 rounded-lg px-3 py-1">
                          <Text className="text-zinc-400 text-xs">{equipment}</Text>
                        </View>
                      ))}
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          ))}

          {filteredSubs.length === 0 && (
            <View className="items-center py-12">
              <Ionicons name="search-outline" size={48} color="#3F3F46" />
              <Text className="text-zinc-400 text-center mt-4">
                No se encontraron ejercicios
              </Text>
            </View>
          )}
        </View>

        {/* Tip Card */}
        <View className="px-6 pb-6 pt-2">
          <View className="bg-primary/10 rounded-xl p-4 border border-primary/30">
            <View className="flex-row items-start">
              <Ionicons name="bulb" size={20} color="#9D12DE" />
              <View className="flex-1 ml-3">
                <Text className="text-primary font-bold mb-2">Progreso Continuo</Text>
                <Text className="text-primary/80 text-sm">
                  Las variaciones mantienen el progreso cuando el ejercicio principal no es
                  viable. Â¡No hay excusas para no entrenar!
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}


