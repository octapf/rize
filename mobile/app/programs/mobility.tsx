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

interface MobilityExercise {
  id: string;
  name: string;
  bodyPart: string;
  duration: number; // seconds
  sets: number;
  demonstration: string;
  benefits: string[];
}

interface MobilityRoutine {
  id: string;
  name: string;
  targetArea: string;
  duration: number; // minutes
  exercises: MobilityExercise[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  icon: string;
  color: string;
}

const MOBILITY_ROUTINES: MobilityRoutine[] = [
  {
    id: '1',
    name: 'Movilidad Matutina',
    targetArea: 'Cuerpo Completo',
    duration: 10,
    difficulty: 'beginner',
    icon: 'sunny',
    color: 'amber',
    exercises: [
      {
        id: '1-1',
        name: 'Cat-Cow',
        bodyPart: 'Columna',
        duration: 60,
        sets: 1,
        demonstration: 'Cuatro patas, arquea y redondea espalda alternadamente',
        benefits: ['Movilidad espinal', 'Calentamiento columna'],
      },
      {
        id: '1-2',
        name: 'World\'s Greatest Stretch',
        bodyPart: 'Caderas/Hombros',
        duration: 30,
        sets: 2,
        demonstration: 'Estocada profunda + rotación torso',
        benefits: ['Apertura caderas', 'Rotación torácica'],
      },
      {
        id: '1-3',
        name: 'Scapular Circles',
        bodyPart: 'Hombros',
        duration: 45,
        sets: 1,
        demonstration: 'Círculos grandes con los brazos',
        benefits: ['Movilidad hombro', 'Activación escapular'],
      },
    ],
  },
  {
    id: '2',
    name: 'Pre-Entrenamiento',
    targetArea: 'Calentamiento Dinámico',
    duration: 15,
    difficulty: 'intermediate',
    icon: 'fitness',
    color: 'blue',
    exercises: [
      {
        id: '2-1',
        name: 'Leg Swings',
        bodyPart: 'Caderas',
        duration: 30,
        sets: 2,
        demonstration: 'Balancea pierna adelante/atrás y lado a lado',
        benefits: ['ROM cadera', 'Preparación tren inferior'],
      },
      {
        id: '2-2',
        name: 'Band Pull-Aparts',
        bodyPart: 'Hombros',
        duration: 45,
        sets: 2,
        demonstration: 'Separa banda elástica a la altura del pecho',
        benefits: ['Activación dorsales', 'Salud hombro'],
      },
      {
        id: '2-3',
        name: 'Deep Squat Hold',
        bodyPart: 'Tobillos/Caderas',
        duration: 60,
        sets: 1,
        demonstration: 'Mantén sentadilla profunda',
        benefits: ['Movilidad tobillo', 'Apertura caderas'],
      },
      {
        id: '2-4',
        name: 'Inch Worms',
        bodyPart: 'Isquios/Core',
        duration: 45,
        sets: 2,
        demonstration: 'Camina manos hacia delante y vuelve',
        benefits: ['Flexibilidad isquios', 'Activación core'],
      },
    ],
  },
  {
    id: '3',
    name: 'Hombros & Torácico',
    targetArea: 'Tren Superior',
    duration: 12,
    difficulty: 'intermediate',
    icon: 'body',
    color: 'emerald',
    exercises: [
      {
        id: '3-1',
        name: 'Thread the Needle',
        bodyPart: 'Rotación torácica',
        duration: 45,
        sets: 2,
        demonstration: 'Cuatro patas, pasa brazo por debajo rotando',
        benefits: ['Rotación torácica', 'Movilidad hombro'],
      },
      {
        id: '3-2',
        name: 'Shoulder Dislocations',
        bodyPart: 'Hombros',
        duration: 60,
        sets: 1,
        demonstration: 'Pasa palo/banda por encima de la cabeza',
        benefits: ['ROM hombro', 'Flexibilidad cápsula'],
      },
      {
        id: '3-3',
        name: 'Wall Slides',
        bodyPart: 'Escapular',
        duration: 45,
        sets: 2,
        demonstration: 'Desliza brazos arriba/abajo contra pared',
        benefits: ['Control escapular', 'Postura'],
      },
    ],
  },
  {
    id: '4',
    name: 'Caderas & Tobillos',
    targetArea: 'Tren Inferior',
    duration: 15,
    difficulty: 'beginner',
    icon: 'walk',
    color: 'purple',
    exercises: [
      {
        id: '4-1',
        name: '90/90 Hip Stretch',
        bodyPart: 'Caderas',
        duration: 90,
        sets: 1,
        demonstration: 'Sentado, ambas piernas en 90°, alterna',
        benefits: ['Rotación interna/externa cadera'],
      },
      {
        id: '4-2',
        name: 'Ankle Rocks',
        bodyPart: 'Tobillos',
        duration: 60,
        sets: 2,
        demonstration: 'Rodilla al frente pasando punta del pie',
        benefits: ['Dorsiflexión tobillo', 'Preparación sentadilla'],
      },
      {
        id: '4-3',
        name: 'Frog Stretch',
        bodyPart: 'Aductores',
        duration: 90,
        sets: 1,
        demonstration: 'Cuatro patas, rodillas bien abiertas',
        benefits: ['Apertura caderas', 'Flexibilidad aductores'],
      },
    ],
  },
  {
    id: '5',
    name: 'Post-Entrenamiento',
    targetArea: 'Recuperación',
    duration: 10,
    difficulty: 'beginner',
    icon: 'bed',
    color: 'cyan',
    exercises: [
      {
        id: '5-1',
        name: 'Child\'s Pose',
        bodyPart: 'Espalda/Hombros',
        duration: 90,
        sets: 1,
        demonstration: 'Sentado sobre talones, brazos estirados al frente',
        benefits: ['Relajación espalda', 'Estiramiento hombros'],
      },
      {
        id: '5-2',
        name: 'Pigeon Stretch',
        bodyPart: 'Caderas',
        duration: 60,
        sets: 2,
        demonstration: 'Pierna adelante doblada, otra estirada atrás',
        benefits: ['Apertura caderas', 'Flexibilidad glúteos'],
      },
      {
        id: '5-3',
        name: 'Cobra Stretch',
        bodyPart: 'Abdominales/Psoas',
        duration: 45,
        sets: 2,
        demonstration: 'Boca abajo, levanta torso con brazos',
        benefits: ['Extensión lumbar', 'Flexibilidad psoas'],
      },
    ],
  },
];

export default function MobilityRoutines() {
  const [selectedRoutine, setSelectedRoutine] = useState<MobilityRoutine | null>(null);
  const [currentExerciseIdx, setCurrentExerciseIdx] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const startRoutine = (routine: MobilityRoutine) => {
    setSelectedRoutine(routine);
    setCurrentExerciseIdx(0);
    setIsRunning(true);
  };

  const nextExercise = () => {
    if (!selectedRoutine) return;
    
    if (currentExerciseIdx < selectedRoutine.exercises.length - 1) {
      setCurrentExerciseIdx(currentExerciseIdx + 1);
    } else {
      Alert.alert('¡Rutina Completada! 🎉', 'Excelente trabajo con tu movilidad');
      setIsRunning(false);
      setSelectedRoutine(null);
      setCurrentExerciseIdx(0);
    }
  };

  const stopRoutine = () => {
    Alert.alert(
      'Detener Rutina',
      '¿Estás seguro?',
      [
        { text: 'Continuar' },
        {
          text: 'Detener',
          style: 'destructive',
          onPress: () => {
            setIsRunning(false);
            setSelectedRoutine(null);
            setCurrentExerciseIdx(0);
          },
        },
      ]
    );
  };

  if (isRunning && selectedRoutine) {
    const currentExercise = selectedRoutine.exercises[currentExerciseIdx];
    const progress = ((currentExerciseIdx + 1) / selectedRoutine.exercises.length) * 100;

    return (
      <View className="flex-1 bg-zinc-950">
        {/* Header */}
        <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
          <View className="flex-row items-center justify-between mb-4">
            <TouchableOpacity onPress={stopRoutine}>
              <Ionicons name="close" size={28} color="white" />
            </TouchableOpacity>
            <Text className="text-white text-xl font-bold">
              {selectedRoutine.name}
            </Text>
            <View className="w-7" />
          </View>
          
          {/* Progress */}
          <View className="mb-2">
            <View className="h-2 bg-zinc-800 rounded-full overflow-hidden">
              <View className="h-full bg-primary rounded-full" style={{ width: `${progress}%` }} />
            </View>
          </View>
          <Text className="text-zinc-400 text-sm text-center">
            Ejercicio {currentExerciseIdx + 1} de {selectedRoutine.exercises.length}
          </Text>
        </View>

        <ScrollView className="flex-1 px-6 pt-8" showsVerticalScrollIndicator={false}>
          {/* Exercise Card */}
          <View className={`bg-${selectedRoutine.color}-500 rounded-2xl p-8 mb-6`}>
            <Text className="text-white text-4xl font-bold mb-4">
              {currentExercise.name}
            </Text>
            <View className="flex-row items-center mb-2">
              <Ionicons name="body" size={20} color="white" />
              <Text className="text-white opacity-90 text-lg ml-2">
                {currentExercise.bodyPart}
              </Text>
            </View>
            <View className="flex-row items-center">
              <Ionicons name="time" size={20} color="white" />
              <Text className="text-white opacity-90 text-lg ml-2">
                {currentExercise.duration}s × {currentExercise.sets} series
              </Text>
            </View>
          </View>

          {/* Demonstration */}
          <View className="bg-zinc-900 rounded-xl p-6 mb-6 border border-zinc-800">
            <Text className="text-white font-bold text-lg mb-3">Ejecución</Text>
            <Text className="text-zinc-300 text-base leading-6">
              {currentExercise.demonstration}
            </Text>
          </View>

          {/* Benefits */}
          <View className="bg-primary/10 rounded-xl p-6 mb-6 border border-primary/30">
            <Text className="text-primary font-bold text-lg mb-3">Beneficios</Text>
            {currentExercise.benefits.map((benefit, idx) => (
              <View key={idx} className="flex-row items-center mb-2">
                <Ionicons name="checkmark-circle" size={20} color="#9D12DE" />
                <Text className="text-primary/80 ml-2">{benefit}</Text>
              </View>
            ))}
          </View>

          {/* Next Button */}
          <TouchableOpacity
            onPress={nextExercise}
            className="bg-primary rounded-xl p-5 flex-row items-center justify-center mb-6"
          >
            <Text className="text-white font-bold text-xl mr-2">
              {currentExerciseIdx < selectedRoutine.exercises.length - 1 ? 'Siguiente Ejercicio' : 'Finalizar'}
            </Text>
            <Ionicons name="arrow-forward" size={24} color="white" />
          </TouchableOpacity>
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
            Mobility Routines
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          {/* Routines */}
          {MOBILITY_ROUTINES.map((routine) => (
            <View key={routine.id} className="bg-zinc-900 rounded-xl p-5 mb-4 border border-zinc-800">
              <View className="flex-row items-start mb-4">
                <View className={`w-14 h-14 bg-${routine.color}-500 rounded-xl items-center justify-center mr-4`}>
                  <Ionicons name={routine.icon as any} size={28} color="white" />
                </View>
                <View className="flex-1">
                  <Text className="text-white font-bold text-xl mb-1">
                    {routine.name}
                  </Text>
                  <Text className="text-zinc-400 text-sm mb-2">
                    {routine.targetArea}
                  </Text>
                  <View className="flex-row items-center gap-3">
                    <View className={`bg-${routine.difficulty === 'beginner' ? 'emerald' : routine.difficulty === 'intermediate' ? 'amber' : 'red'}-500/10 rounded px-2 py-1 border border-${routine.difficulty === 'beginner' ? 'emerald' : routine.difficulty === 'intermediate' ? 'amber' : 'red'}-500/30`}>
                      <Text className={`text-${routine.difficulty === 'beginner' ? 'emerald' : routine.difficulty === 'intermediate' ? 'amber' : 'red'}-400 text-xs font-bold`}>
                        {routine.difficulty === 'beginner' ? 'Principiante' : routine.difficulty === 'intermediate' ? 'Intermedio' : 'Avanzado'}
                      </Text>
                    </View>
                    <View className="flex-row items-center">
                      <Ionicons name="time" size={14} color="#71717A" />
                      <Text className="text-zinc-400 text-sm ml-1">{routine.duration} min</Text>
                    </View>
                    <View className="flex-row items-center">
                      <Ionicons name="list" size={14} color="#71717A" />
                      <Text className="text-zinc-400 text-sm ml-1">{routine.exercises.length} ejercicios</Text>
                    </View>
                  </View>
                </View>
              </View>

              {/* Exercises Preview */}
              <View className="bg-zinc-800 rounded-lg p-3 mb-4">
                {routine.exercises.map((exercise, idx) => (
                  <View key={exercise.id} className="flex-row items-center py-2">
                    <View className="w-6 h-6 bg-zinc-700 rounded-full items-center justify-center mr-3">
                      <Text className="text-white text-xs font-bold">{idx + 1}</Text>
                    </View>
                    <Text className="text-zinc-300 flex-1">{exercise.name}</Text>
                    <Text className="text-zinc-500 text-sm">{exercise.duration}s</Text>
                  </View>
                ))}
              </View>

              {/* Start Button */}
              <TouchableOpacity
                onPress={() => startRoutine(routine)}
                className={`bg-${routine.color}-500 rounded-xl p-4 flex-row items-center justify-center`}
              >
                <Ionicons name="play" size={20} color="white" />
                <Text className="text-white font-bold text-lg ml-2">Iniciar Rutina</Text>
              </TouchableOpacity>
            </View>
          ))}

          {/* Tips */}
          <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-6">
            <View className="flex-row items-start">
              <Ionicons name="bulb" size={20} color="#9D12DE" />
              <View className="flex-1 ml-3">
                <Text className="text-primary/80 font-bold mb-2">
                  Importancia de la Movilidad
                </Text>
                <Text className="text-primary/60 text-sm">
                  • Previene lesiones y dolores{'\n'}
                  • Mejora rango de movimiento en ejercicios{'\n'}
                  • Recuperación más rápida{'\n'}
                  • Mejor postura y calidad de vida{'\n'}
                  • 10-15 min diarios hacen gran diferencia{'\n'}
                  • Hazlo antes Y después de entrenar
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}


