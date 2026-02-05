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
  muscleGroup: string[];
  equipment: string[];
  difficulty: 'principiante' | 'intermedio' | 'avanzado';
  description: string;
  videoUrl?: string;
  instructions: string[];
  tips: string[];
  variations: string[];
  commonMistakes: string[];
}

const EXERCISES: Exercise[] = [
  {
    id: '1',
    name: 'Sentadilla con Barra',
    category: 'Compuesto',
    muscleGroup: ['Cuádriceps', 'Glúteos', 'Isquios', 'Core'],
    equipment: ['Barra', 'Rack', 'Discos'],
    difficulty: 'intermedio',
    description: 'Rey de los ejercicios de pierna. Desarrolla fuerza y masa en tren inferior.',
    videoUrl: 'squat.mp4',
    instructions: [
      'Coloca la barra en trapecios, no en el cuello',
      'Pies a ancho de hombros, puntas ligeramente hacia afuera',
      'Inhala profundo y activa el core',
      'Desciende empujando las rodillas hacia afuera',
      'Baja hasta romper paralelo (cadera bajo rodillas)',
      'Empuja con los talones para subir explosivamente',
    ],
    tips: [
      'Mira un punto fijo adelante, no hacia arriba',
      'Mantén pecho alto durante todo el movimiento',
      'No dejes que las rodillas colapsen hacia adentro',
      'El movimiento inicia en la cadera, no en las rodillas',
    ],
    variations: [
      'Front Squat',
      'Box Squat',
      'Paused Squat',
      'Tempo Squat 3-0-1',
      'Squat con Bandas',
      'Squat con Cadenas',
    ],
    commonMistakes: [
      'Inclinar demasiado el torso hacia adelante',
      'No bajar lo suficiente (quarter squats)',
      'Rodillas colapsando hacia adentro (valgus)',
      'Despegar talones del suelo',
      'Perder neutralidad de columna',
    ],
  },
  {
    id: '2',
    name: 'Press de Banca',
    category: 'Compuesto',
    muscleGroup: ['Pecho', 'Tríceps', 'Hombros Anteriores'],
    equipment: ['Barra', 'Banco Plano', 'Discos'],
    difficulty: 'intermedio',
    description: 'Ejercicio fundamental para desarrollo de pecho y fuerza de empuje.',
    videoUrl: 'bench.mp4',
    instructions: [
      'Acuéstate en el banco, ojos bajo la barra',
      'Retrae y deprime escápulas (juntas y hacia abajo)',
      'Agarre ligeramente más ancho que hombros',
      'Crea un arco natural en la espalda baja',
      'Baja la barra controlada hasta pecho (línea pezones)',
      'Presiona explosivamente hasta lockout',
    ],
    tips: [
      'Mantén glúteos en el banco todo el tiempo',
      'Usa leg drive: empuja el suelo con los pies',
      'La barra debe moverse en línea diagonal',
      'No rebotes la barra en el pecho',
    ],
    variations: [
      'Press Inclinado 30°',
      'Press Declinado',
      'Close Grip Bench',
      'Paused Bench',
      'Tempo Bench 3-1-0',
      'Floor Press',
    ],
    commonMistakes: [
      'Perder retracción escapular durante el press',
      'Bajar la barra muy alta (hacia el cuello)',
      'Aleteo de codos (flare excesivo)',
      'No usar leg drive',
      'Despegar glúteos del banco',
    ],
  },
  {
    id: '3',
    name: 'Peso Muerto Convencional',
    category: 'Compuesto',
    muscleGroup: ['Espalda Baja', 'Glúteos', 'Isquios', 'Trapecios'],
    equipment: ['Barra', 'Discos'],
    difficulty: 'avanzado',
    description: 'Ejercicio de cadena posterior por excelencia. Desarrolla fuerza total del cuerpo.',
    videoUrl: 'deadlift.mp4',
    instructions: [
      'Pies bajo la barra, ancho de cadera',
      'Agarre justo fuera de las piernas',
      'Cadera más alta que rodillas, hombros sobre barra',
      'Espalda neutral, pecho alto',
      'Empuja el suelo con las piernas (leg drive)',
      'Extiende cadera y rodillas simultáneamente',
      'Lockout: aprieta glúteos al final',
    ],
    tips: [
      'La barra debe estar pegada al cuerpo todo el tiempo',
      'No inicies el pull con la espalda',
      'Piensa en "empujar el suelo" no "tirar la barra"',
      'Usa cinturón en sets pesados (>85% 1RM)',
    ],
    variations: [
      'Sumo Deadlift',
      'Romanian Deadlift (RDL)',
      'Deficit Deadlift',
      'Paused Deadlift',
      'Trap Bar Deadlift',
      'Snatch Grip Deadlift',
    ],
    commonMistakes: [
      'Redondear la espalda baja (flexión lumbar)',
      'Iniciar con cadera muy baja (squat deadlift)',
      'Separar la barra del cuerpo',
      'Hiperextender la espalda en lockout',
      'No activar los lats antes del pull',
    ],
  },
  {
    id: '4',
    name: 'Dominadas',
    category: 'Compuesto',
    muscleGroup: ['Dorsales', 'Bíceps', 'Core'],
    equipment: ['Barra de Dominadas'],
    difficulty: 'intermedio',
    description: 'Mejor ejercicio de tracción vertical para espalda y desarrollo de fuerza relativa.',
    videoUrl: 'pullups.mp4',
    instructions: [
      'Agarre prono (palmas hacia adelante), ancho de hombros',
      'Cuelga con brazos extendidos (dead hang)',
      'Retrae escápulas antes de iniciar',
      'Tira de los codos hacia el suelo',
      'Sube hasta que barbilla pase la barra',
      'Desciende controlado hasta dead hang',
    ],
    tips: [
      'No uses swing o kipping (crossfit style)',
      'Piensa en tirar codos hacia bolsillos traseros',
      'Mantén core activado todo el tiempo',
      'Si no puedes hacer una, usa bandas de asistencia',
    ],
    variations: [
      'Chin-ups (agarre supino)',
      'Neutral Grip Pull-ups',
      'Wide Grip Pull-ups',
      'Weighted Pull-ups',
      'L-sit Pull-ups',
      'Archer Pull-ups',
    ],
    commonMistakes: [
      'No hacer rango completo (dead hang a barbilla sobre barra)',
      'Usar momentum excesivo',
      'Encoger hombros hacia las orejas',
      'No retraer escápulas al inicio',
      'Cruzar las piernas innecesariamente',
    ],
  },
  {
    id: '5',
    name: 'Press Militar (OHP)',
    category: 'Compuesto',
    muscleGroup: ['Hombros', 'Tríceps', 'Core'],
    equipment: ['Barra', 'Discos'],
    difficulty: 'avanzado',
    description: 'Ejercicio rey de hombros. Desarrolla fuerza de empuje vertical y estabilidad.',
    videoUrl: 'ohp.mp4',
    instructions: [
      'Pies a ancho de cadera',
      'Barra en clavículas, codos ligeramente adelante',
      'Agarre justo fuera de hombros',
      'Activa glúteos y core fuertemente',
      'Presiona barra verticalmente, mete cabeza hacia adelante',
      'Lockout con bíceps junto a orejas',
    ],
    tips: [
      'No hiperextender la espalda baja',
      'La trayectoria es vertical, no hacia adelante',
      'Aprieta glúteos para prevenir arco excesivo',
      'Usa valsalva (respiración intra-abdominal)',
    ],
    variations: [
      'Push Press',
      'Seated OHP',
      'Dumbbell OHP',
      'Behind the Neck Press',
      'Bradford Press',
      'Z Press',
    ],
    commonMistakes: [
      'Convertirlo en incline bench (lean back excesivo)',
      'No meter la cabeza bajo la barra en lockout',
      'Presionar hacia adelante en vez de arriba',
      'Perder tensión en core y glúteos',
      'Grip demasiado ancho',
    ],
  },
];

export default function ExerciseLibrary() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedMuscle, setSelectedMuscle] = useState<string>('all');
  const [selectedExercise, setSelectedExercise] = useState<string | null>(null);

  const categories = ['all', 'Compuesto', 'Aislamiento', 'Olímpico', 'Calistenia'];
  const muscleGroups = [
    'all',
    'Pecho',
    'Espalda',
    'Hombros',
    'Piernas',
    'Brazos',
    'Core',
  ];

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

  const viewExerciseDetails = (exercise: Exercise) => {
    setSelectedExercise(exercise.id);
    Alert.alert(
      exercise.name,
      exercise.description,
      [
        { text: 'Ver Video Tutorial' },
        { text: 'Agregar a Rutina' },
        { text: 'Cerrar', onPress: () => setSelectedExercise(null) },
      ]
    );
  };

  const filteredExercises = EXERCISES.filter((exercise) => {
    const matchesSearch =
      searchQuery === '' ||
      exercise.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exercise.muscleGroup.some((m) =>
        m.toLowerCase().includes(searchQuery.toLowerCase())
      );
    const matchesCategory =
      selectedCategory === 'all' || exercise.category === selectedCategory;
    const matchesMuscle =
      selectedMuscle === 'all' ||
      exercise.muscleGroup.some((m) => m.includes(selectedMuscle));

    return matchesSearch && matchesCategory && matchesMuscle;
  });

  return (
    <View className="flex-1 bg-zinc-950">
      {/* Header */}
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1 ml-3">
            Biblioteca de Ejercicios
          </Text>
          <TouchableOpacity>
            <Ionicons name="bookmark-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Search */}
        <View className="bg-zinc-900 rounded-xl px-4 py-3 mb-4 flex-row items-center border border-zinc-800">
          <Ionicons name="search" size={20} color="#71717A" />
          <TextInput
            placeholder="Buscar ejercicios..."
            placeholderTextColor="#71717A"
            value={searchQuery}
            onChangeText={setSearchQuery}
            className="flex-1 ml-3 text-white"
          />
        </View>

        {/* Category Filter */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-3">
          <View className="flex-row gap-2">
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                onPress={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg ${
                  selectedCategory === category
                    ? 'bg-primary'
                    : 'bg-zinc-900 border border-zinc-800'
                }`}
              >
                <Text
                  className={`font-semibold text-sm ${
                    selectedCategory === category ? 'text-white' : 'text-zinc-400'
                  }`}
                >
                  {category === 'all' ? 'Todos' : category}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {/* Muscle Filter */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row gap-2">
            {muscleGroups.map((muscle) => (
              <TouchableOpacity
                key={muscle}
                onPress={() => setSelectedMuscle(muscle)}
                className={`px-4 py-2 rounded-lg ${
                  selectedMuscle === muscle
                    ? 'bg-primary'
                    : 'bg-zinc-900 border border-zinc-800'
                }`}
              >
                <Text
                  className={`font-semibold text-sm ${
                    selectedMuscle === muscle ? 'text-white' : 'text-zinc-400'
                  }`}
                >
                  {muscle === 'all' ? 'Todos' : muscle}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          <Text className="text-white font-bold text-lg mb-3">
            Ejercicios ({filteredExercises.length})
          </Text>

          {filteredExercises.map((exercise) => (
            <TouchableOpacity
              key={exercise.id}
              onPress={() => viewExerciseDetails(exercise)}
              className={`bg-zinc-900 rounded-xl p-4 mb-4 border-2 ${
                selectedExercise === exercise.id ? 'border-primary' : 'border-zinc-800'
              }`}
            >
              {/* Header */}
              <View className="flex-row items-start justify-between mb-3">
                <View className="flex-1">
                  <Text className="text-white font-bold text-xl mb-1">
                    {exercise.name}
                  </Text>
                  <Text className="text-zinc-400 text-sm mb-2">
                    {exercise.description}
                  </Text>
                  <View className="flex-row gap-2">
                    <View className="bg-primary/20 px-3 py-1 rounded-full">
                      <Text className="text-primary/80 text-xs font-bold">
                        {exercise.category}
                      </Text>
                    </View>
                    <View
                      className="px-3 py-1 rounded-full"
                      style={{ backgroundColor: getDifficultyColor(exercise.difficulty) + '20' }}
                    >
                      <Text
                        className="text-xs font-bold capitalize"
                        style={{ color: getDifficultyColor(exercise.difficulty) }}
                      >
                        {exercise.difficulty}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

              {/* Muscle Groups */}
              <View className="bg-zinc-800 rounded-lg p-3 mb-3">
                <Text className="text-white font-bold text-sm mb-2">
                  Músculos Trabajados
                </Text>
                <View className="flex-row flex-wrap gap-2">
                  {exercise.muscleGroup.map((muscle, index) => (
                    <View key={index} className="bg-primary/20 px-3 py-1 rounded-full">
                      <Text className="text-primary text-xs font-bold">{muscle}</Text>
                    </View>
                  ))}
                </View>
              </View>

              {/* Equipment */}
              <View className="bg-zinc-800 rounded-lg p-3 mb-3">
                <Text className="text-white font-bold text-sm mb-2">
                  Equipo Necesario
                </Text>
                <View className="flex-row flex-wrap gap-2">
                  {exercise.equipment.map((item, index) => (
                    <View key={index} className="bg-zinc-700 px-3 py-1 rounded-full">
                      <Text className="text-zinc-300 text-xs">{item}</Text>
                    </View>
                  ))}
                </View>
              </View>

              {/* Instructions Preview */}
              <View className="bg-primary/10 rounded-lg p-3 border border-primary/30 mb-3">
                <Text className="text-primary/80 font-bold text-sm mb-2">
                  Instrucciones ({exercise.instructions.length} pasos)
                </Text>
                {exercise.instructions.slice(0, 3).map((instruction, index) => (
                  <View key={index} className="flex-row items-start mb-1">
                    <Text className="text-primary/80 mr-2">{index + 1}.</Text>
                    <Text className="text-primary/60 text-sm flex-1">{instruction}</Text>
                  </View>
                ))}
                {exercise.instructions.length > 3 && (
                  <Text className="text-primary/80 text-xs mt-2">
                    +{exercise.instructions.length - 3} pasos más...
                  </Text>
                )}
              </View>

              {/* Actions */}
              <View className="flex-row gap-2">
                <TouchableOpacity className="flex-1 bg-primary rounded-lg p-3">
                  <View className="flex-row items-center justify-center">
                    <Ionicons name="play-circle" size={18} color="white" />
                    <Text className="text-white font-bold ml-2 text-sm">Ver Tutorial</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity className="flex-1 bg-zinc-800 rounded-lg p-3">
                  <View className="flex-row items-center justify-center">
                    <Ionicons name="add-circle" size={18} color="white" />
                    <Text className="text-white font-bold ml-2 text-sm">Agregar</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Info */}
        <View className="px-6 pb-6 pt-4">
          <View className="bg-amber-500/10 rounded-xl p-4 border border-amber-500/30">
            <View className="flex-row items-start">
              <Ionicons name="information-circle" size={20} color="#FFEA00" />
              <View className="flex-1 ml-3">
                <Text className="text-amber-400 font-bold mb-2">
                  {EXERCISES.length}+ Ejercicios con Video
                </Text>
                <Text className="text-amber-300 text-sm">
                  Cada ejercicio incluye video tutorial, instrucciones paso a paso, variaciones y errores comunes a evitar.
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

