import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface Exercise {
  id: string;
  name: string;
  category: string;
  muscleGroup: string;
  equipment: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  instructions: string[];
  tips: string[];
  commonMistakes: string[];
  variations?: string[];
}

const MUSCLE_GROUPS = [
  { name: 'Todos', icon: 'body', color: 'zinc' },
  { name: 'Pecho', icon: 'body', color: 'blue' },
  { name: 'Espalda', icon: 'person', color: 'emerald' },
  { name: 'Hombros', icon: 'fitness', color: 'purple' },
  { name: 'Piernas', icon: 'walk', color: 'red' },
  { name: 'Brazos', icon: 'barbell', color: 'amber' },
  { name: 'Core', icon: 'ellipse', color: 'cyan' },
];

const EXERCISE_DATABASE: Exercise[] = [
  {
    id: '1',
    name: 'Press Banca',
    category: 'Compuesto',
    muscleGroup: 'Pecho',
    equipment: 'Barra',
    difficulty: 'intermediate',
    instructions: [
      'Acuéstate en banco plano con pies firmes en el suelo',
      'Agarre ligeramente más ancho que hombros',
      'Baja barra a la línea del pezón controladamente',
      'Empuja explosivamente mientras exhalas',
      'Mantén escápulas retraídas todo el movimiento',
    ],
    tips: [
      'Arco lumbar natural, no excesivo',
      'Codos a 45° del torso, no 90°',
      'Toca pecho en cada rep',
      'Muñecas alineadas con antebrazo',
    ],
    commonMistakes: [
      'Rebotar la barra en el pecho',
      'Despegar glúteos del banco',
      'Codos muy abiertos (lesión hombro)',
      'No tocar pecho (ROM incompleto)',
    ],
    variations: ['Press Inclinado', 'Press Declinado', 'Press con Mancuernas'],
  },
  {
    id: '2',
    name: 'Sentadilla',
    category: 'Compuesto',
    muscleGroup: 'Piernas',
    equipment: 'Barra',
    difficulty: 'intermediate',
    instructions: [
      'Barra en traps (high bar) o deltoides posteriores (low bar)',
      'Pies ancho de hombros, puntas ligeramente hacia fuera',
      'Inhala profundo, mantén core apretado',
      'Desciende rompiendo cadera primero',
      'Baja hasta paralelo o más (caderas bajo rodillas)',
      'Empuja a través de talones manteniendo pecho arriba',
    ],
    tips: [
      'Rodillas en línea con pies (no hacia dentro)',
      'Mantén peso en talones y mediopié',
      'Mira al frente, no abajo ni arriba',
      'Core apretado todo el movimiento',
    ],
    commonMistakes: [
      'No bajar a paralelo',
      'Rodillas colapsando hacia dentro',
      'Subir glúteos más rápido que el torso',
      'Redondear espalda baja',
    ],
    variations: ['Front Squat', 'Bulgarian Split Squat', 'Squat con Pausa'],
  },
  {
    id: '3',
    name: 'Peso Muerto',
    category: 'Compuesto',
    muscleGroup: 'Espalda',
    equipment: 'Barra',
    difficulty: 'advanced',
    instructions: [
      'Pies debajo de barra, ancho de cadera',
      'Agarre afuera de piernas, espalda neutral',
      'Inhala, aprieta lats, tensa todo el cuerpo',
      'Empuja suelo con piernas (no "tires" con espalda)',
      'Extiende cadera y rodillas simultáneamente',
      'Termina con glúteos apretados, no hiperextensión lumbar',
    ],
    tips: [
      'La barra sube en línea recta, pegada a tibias',
      'Hombros ligeramente adelante de la barra al inicio',
      'Mantén cuello neutral (no mires arriba)',
      'Aprieta glúteos al finalizar, no arco excesivo',
    ],
    commonMistakes: [
      'Redondear espalda baja',
      'Barra lejos del cuerpo',
      'Empezar con caderas muy altas o muy bajas',
      'Hiperextender espalda al terminar',
    ],
    variations: ['Romanian Deadlift', 'Sumo Deadlift', 'Trap Bar Deadlift'],
  },
  {
    id: '4',
    name: 'Dominadas',
    category: 'Compuesto',
    muscleGroup: 'Espalda',
    equipment: 'Barra fija',
    difficulty: 'intermediate',
    instructions: [
      'Cuelga de barra con agarre prono, ancho de hombros o más',
      'Retrae escápulas antes de empezar a subir',
      'Tira codos hacia abajo y atrás',
      'Sube hasta barbilla sobre barra',
      'Desciende controladamente hasta brazos extendidos',
    ],
    tips: [
      'Inicia el movimiento con escápulas, no brazos',
      'Piensa "codos al piso" no "manos a la cara"',
      'Evita kipping (usar impulso)',
      'Full ROM: brazos extendidos abajo',
    ],
    commonMistakes: [
      'No bajar hasta brazos extendidos',
      'Usar impulso excesivo',
      'Hombros elevados (no retraer escápulas)',
      'Hiperextender cuello para subir',
    ],
    variations: ['Chin-ups', 'Dominadas Neutras', 'Dominadas Asistidas'],
  },
  {
    id: '5',
    name: 'Press Militar',
    category: 'Compuesto',
    muscleGroup: 'Hombros',
    equipment: 'Barra',
    difficulty: 'intermediate',
    instructions: [
      'De pie, barra en clavículas, agarre ancho de hombros',
      'Codos ligeramente adelante de la barra',
      'Aprieta glúteos y core para estabilidad',
      'Empuja barra verticalmente sobre la cabeza',
      'Mueve cabeza ligeramente atrás al subir',
      'Finaliza con biceps junto a orejas, barra sobre mediopié',
    ],
    tips: [
      'No hiperextender espalda baja',
      'Barra sube y baja en línea recta',
      'Full lockout arriba con escápulas elevadas',
      'Respira arriba, no abajo',
    ],
    commonMistakes: [
      'Arquear espalda excesivamente',
      'Empujar barra hacia adelante',
      'No alcanzar lockout completo',
      'Usar piernas (push press vs strict press)',
    ],
    variations: ['Press con Mancuernas', 'Arnold Press', 'Push Press'],
  },
  {
    id: '6',
    name: 'Remo con Barra',
    category: 'Compuesto',
    muscleGroup: 'Espalda',
    equipment: 'Barra',
    difficulty: 'intermediate',
    instructions: [
      'Bisagra de cadera, torso ~45° del suelo',
      'Agarre prono, ligeramente más ancho que hombros',
      'Brazos extendidos, escápulas protraídas al inicio',
      'Tira codos hacia arriba y atrás',
      'Toca barra en parte baja del pecho/abdomen superior',
      'Desciende controladamente',
    ],
    tips: [
      'Mantén espalda neutral, no redondees',
      'Aprieta dorsales y retrae escápulas arriba',
      'No uses demasiado impulso',
      'Piensa en "separar la barra"',
    ],
    commonMistakes: [
      'Pararse demasiado (usar impulso)',
      'Tirar con brazos en vez de espalda',
      'Redondear espalda baja',
      'No alcanzar full ROM',
    ],
    variations: ['Pendlay Row', 'Yates Row', 'T-Bar Row'],
  },
];

export default function ExerciseDatabase() {
  const [selectedGroup, setSelectedGroup] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);

  const filteredExercises = EXERCISE_DATABASE.filter((ex) => {
    const matchesGroup = selectedGroup === 'Todos' || ex.muscleGroup === selectedGroup;
    const matchesSearch = ex.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesGroup && matchesSearch;
  });

  if (selectedExercise) {
    return (
      <View className="flex-1 bg-zinc-950">
        {/* Header */}
        <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
          <View className="flex-row items-center mb-4">
            <TouchableOpacity onPress={() => setSelectedExercise(null)}>
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <Text className="text-white text-2xl font-bold flex-1 ml-3">
              {selectedExercise.name}
            </Text>
          </View>
        </View>

        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          <View className="px-6 pt-6">
            {/* Info Card */}
            <View className="bg-zinc-900 rounded-xl p-4 mb-6 border border-zinc-800">
              <View className="flex-row flex-wrap gap-2 mb-3">
                <View className="bg-blue-500/10 rounded px-3 py-1 border border-blue-500/30">
                  <Text className="text-blue-400 text-xs font-bold">{selectedExercise.muscleGroup}</Text>
                </View>
                <View className="bg-emerald-500/10 rounded px-3 py-1 border border-emerald-500/30">
                  <Text className="text-emerald-400 text-xs font-bold">{selectedExercise.category}</Text>
                </View>
                <View className="bg-purple-500/10 rounded px-3 py-1 border border-purple-500/30">
                  <Text className="text-purple-400 text-xs font-bold">{selectedExercise.equipment}</Text>
                </View>
                <View
                  className={`bg-${
                    selectedExercise.difficulty === 'beginner'
                      ? 'emerald'
                      : selectedExercise.difficulty === 'intermediate'
                      ? 'amber'
                      : 'red'
                  }-500/10 rounded px-3 py-1 border border-${
                    selectedExercise.difficulty === 'beginner'
                      ? 'emerald'
                      : selectedExercise.difficulty === 'intermediate'
                      ? 'amber'
                      : 'red'
                  }-500/30`}
                >
                  <Text
                    className={`text-${
                      selectedExercise.difficulty === 'beginner'
                        ? 'emerald'
                        : selectedExercise.difficulty === 'intermediate'
                        ? 'amber'
                        : 'red'
                    }-400 text-xs font-bold`}
                  >
                    {selectedExercise.difficulty === 'beginner'
                      ? 'Principiante'
                      : selectedExercise.difficulty === 'intermediate'
                      ? 'Intermedio'
                      : 'Avanzado'}
                  </Text>
                </View>
              </View>
            </View>

            {/* Instructions */}
            <View className="bg-emerald-500/10 rounded-xl p-4 mb-6 border border-emerald-500/30">
              <Text className="text-emerald-400 font-bold text-lg mb-3">
                Ejecución Paso a Paso
              </Text>
              {selectedExercise.instructions.map((instruction, idx) => (
                <View key={idx} className="flex-row items-start mb-3">
                  <View className="w-6 h-6 bg-emerald-500 rounded-full items-center justify-center mr-3 mt-0.5">
                    <Text className="text-white text-xs font-bold">{idx + 1}</Text>
                  </View>
                  <Text className="text-emerald-300 flex-1">{instruction}</Text>
                </View>
              ))}
            </View>

            {/* Tips */}
            <View className="bg-blue-500/10 rounded-xl p-4 mb-6 border border-blue-500/30">
              <Text className="text-blue-400 font-bold text-lg mb-3">
                Consejos Clave
              </Text>
              {selectedExercise.tips.map((tip, idx) => (
                <View key={idx} className="flex-row items-start mb-2">
                  <Ionicons name="checkmark-circle" size={20} color="#3B82F6" />
                  <Text className="text-blue-300 flex-1 ml-2">{tip}</Text>
                </View>
              ))}
            </View>

            {/* Common Mistakes */}
            <View className="bg-red-500/10 rounded-xl p-4 mb-6 border border-red-500/30">
              <Text className="text-red-400 font-bold text-lg mb-3">
                Errores Comunes
              </Text>
              {selectedExercise.commonMistakes.map((mistake, idx) => (
                <View key={idx} className="flex-row items-start mb-2">
                  <Ionicons name="close-circle" size={20} color="#EF4444" />
                  <Text className="text-red-300 flex-1 ml-2">{mistake}</Text>
                </View>
              ))}
            </View>

            {/* Variations */}
            {selectedExercise.variations && selectedExercise.variations.length > 0 && (
              <View className="bg-purple-500/10 rounded-xl p-4 mb-6 border border-purple-500/30">
                <Text className="text-purple-400 font-bold text-lg mb-3">
                  Variaciones
                </Text>
                {selectedExercise.variations.map((variation, idx) => (
                  <View key={idx} className="bg-zinc-800 rounded-lg p-3 mb-2">
                    <Text className="text-white font-bold">{variation}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-zinc-950">
      {/* Header */}
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1 ml-3">
            Exercise Database
          </Text>
        </View>

        {/* Search */}
        <View className="bg-zinc-900 rounded-xl px-4 py-3 flex-row items-center border border-zinc-800">
          <Ionicons name="search" size={20} color="#71717A" />
          <TextInput
            className="flex-1 ml-2 text-white"
            placeholder="Buscar ejercicio..."
            placeholderTextColor="#71717A"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          {/* Muscle Groups */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6">
            <View className="flex-row gap-2">
              {MUSCLE_GROUPS.map((group) => (
                <TouchableOpacity
                  key={group.name}
                  onPress={() => setSelectedGroup(group.name)}
                  className={`px-4 py-2 rounded-lg flex-row items-center ${
                    selectedGroup === group.name
                      ? `bg-${group.color === 'zinc' ? 'white' : group.color + '-500'}`
                      : 'bg-zinc-900 border border-zinc-800'
                  }`}
                >
                  <Ionicons
                    name={group.icon as any}
                    size={16}
                    color={selectedGroup === group.name ? (group.color === 'zinc' ? 'black' : 'white') : '#71717A'}
                  />
                  <Text
                    className={`ml-2 font-bold ${
                      selectedGroup === group.name
                        ? group.color === 'zinc'
                          ? 'text-black'
                          : 'text-white'
                        : 'text-zinc-400'
                    }`}
                  >
                    {group.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          {/* Exercises */}
          {filteredExercises.length === 0 ? (
            <View className="bg-zinc-900 rounded-xl p-8 items-center border border-zinc-800">
              <Text className="text-6xl mb-3">💪</Text>
              <Text className="text-white font-bold text-lg mb-2">Sin Resultados</Text>
              <Text className="text-zinc-400 text-center">
                No se encontraron ejercicios
              </Text>
            </View>
          ) : (
            filteredExercises.map((exercise) => (
              <TouchableOpacity
                key={exercise.id}
                onPress={() => setSelectedExercise(exercise)}
                className="bg-zinc-900 rounded-xl p-4 mb-3 border border-zinc-800"
              >
                <View className="flex-row items-center justify-between mb-2">
                  <Text className="text-white font-bold text-lg flex-1">
                    {exercise.name}
                  </Text>
                  <Ionicons name="chevron-forward" size={20} color="#71717A" />
                </View>
                <View className="flex-row flex-wrap gap-2">
                  <View className="bg-blue-500/10 rounded px-2 py-1 border border-blue-500/30">
                    <Text className="text-blue-400 text-xs font-bold">{exercise.muscleGroup}</Text>
                  </View>
                  <View className="bg-emerald-500/10 rounded px-2 py-1 border border-emerald-500/30">
                    <Text className="text-emerald-400 text-xs font-bold">{exercise.category}</Text>
                  </View>
                  <View className="bg-purple-500/10 rounded px-2 py-1 border border-purple-500/30">
                    <Text className="text-purple-400 text-xs font-bold">{exercise.equipment}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          )}

          {/* Note */}
          <View className="bg-amber-500/10 rounded-xl p-4 border border-amber-500/30 mb-6 mt-4">
            <View className="flex-row items-start">
              <Ionicons name="information-circle" size={20} color="#F59E0B" />
              <View className="flex-1 ml-3">
                <Text className="text-amber-400 font-bold mb-2">
                  Base de Datos en Expansión
                </Text>
                <Text className="text-amber-300 text-sm">
                  Esta es una selección de ejercicios fundamentales. Más ejercicios serán añadidos próximamente.
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
