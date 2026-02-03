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

interface WarmupRoutine {
  id: string;
  name: string;
  duration: number;
  focus: string;
  level: 'general' | 'upper' | 'lower' | 'specific';
  exercises: {
    name: string;
    duration: string;
    reps?: string;
    notes: string;
  }[];
  benefits: string[];
  icon: string;
}

const WARMUP_ROUTINES: WarmupRoutine[] = [
  {
    id: '1',
    name: 'Calentamiento General (10 min)',
    duration: 10,
    focus: 'Preparación cardiovascular y articular',
    level: 'general',
    exercises: [
      { name: 'Jumping Jacks', duration: '2 min', notes: 'Ritmo moderado, subir temperatura corporal' },
      { name: 'Arm Circles', duration: '1 min', reps: '20 adelante + 20 atrás', notes: 'Círculos amplios, hombros relajados' },
      { name: 'Hip Circles', duration: '1 min', reps: '10 cada dirección', notes: 'Manos en cadera, círculos grandes' },
      { name: 'Leg Swings', duration: '2 min', reps: '15 cada lado', notes: 'Adelante-atrás y lateral' },
      { name: 'Torso Twists', duration: '1 min', reps: '20 total', notes: 'Rotación suave de tronco' },
      { name: 'Light Jog', duration: '3 min', notes: 'Trotar suave en sitio o cinta' },
    ],
    benefits: ['Aumenta temperatura corporal', 'Prepara articulaciones', 'Activa sistema cardiovascular', 'Reduce riesgo lesiones'],
    icon: '🔥',
  },
  {
    id: '2',
    name: 'Warm-up Tren Superior',
    duration: 12,
    focus: 'Hombros, pecho, espalda y brazos',
    level: 'upper',
    exercises: [
      { name: 'Band Pull-Aparts', duration: '2 min', reps: '3x15', notes: 'Con banda elástica, retracción escapular' },
      { name: 'Scapular Push-ups', duration: '2 min', reps: '2x10', notes: 'Solo movimiento escapular, brazos rectos' },
      { name: 'Wall Slides', duration: '2 min', reps: '3x12', notes: 'Espalda contra pared, brazos en W' },
      { name: 'Cat-Cow', duration: '2 min', reps: '15 reps', notes: 'Movilidad de columna' },
      { name: 'Shoulder Dislocations', duration: '2 min', reps: '10 reps', notes: 'Con banda o palo, rango completo' },
      { name: 'Light DB Press', duration: '2 min', reps: '2x12', notes: 'Peso muy ligero, activación' },
    ],
    benefits: ['Moviliza hombros', 'Activa escapulares', 'Previene lesiones', 'Mejora rango de movimiento'],
    icon: '💪',
  },
  {
    id: '3',
    name: 'Warm-up Tren Inferior',
    duration: 12,
    focus: 'Caderas, glúteos, cuádriceps e isquios',
    level: 'lower',
    exercises: [
      { name: 'Glute Bridges', duration: '2 min', reps: '2x15', notes: 'Contracción glúteos, hold 1 seg arriba' },
      { name: 'Bodyweight Squats', duration: '2 min', reps: '20 reps', notes: 'Profundidad completa, tempo lento' },
      { name: 'Walking Lunges', duration: '2 min', reps: '10 cada pierna', notes: 'Activación glúteos y cuádriceps' },
      { name: '90/90 Hip Stretch', duration: '2 min', reps: '30 seg/lado', notes: 'Movilidad interna/externa cadera' },
      { name: 'Cossack Squats', duration: '2 min', reps: '8 cada lado', notes: 'Movilidad lateral de cadera' },
      { name: 'Leg Swings', duration: '2 min', reps: '15 cada dirección', notes: 'Preparación dinámica' },
    ],
    benefits: ['Activa glúteos', 'Moviliza caderas', 'Prepara rodillas', 'Previene dolor lumbar'],
    icon: '🦵',
  },
  {
    id: '4',
    name: 'Warm-up Sentadilla Pesada',
    duration: 15,
    focus: 'Preparación específica para squat heavy',
    level: 'specific',
    exercises: [
      { name: 'Foam Roll IT Band + Quads', duration: '3 min', notes: 'Liberación miofascial' },
      { name: 'Goblet Squats', duration: '2 min', reps: '2x10', notes: 'Con kettlebell o mancuerna' },
      { name: 'Box Squats', duration: '2 min', reps: '2x8', notes: 'Profundidad progresiva' },
      { name: 'Pause Squats', duration: '3 min', reps: '3x5', notes: 'Solo barra, pause 3 seg abajo' },
      { name: 'Empty Bar Squats', duration: '2 min', reps: '2x8', notes: 'Técnica perfecta' },
      { name: 'Ramp-up Sets', duration: '3 min', reps: '50%, 70%, 85% x3', notes: 'Acercarse al peso de trabajo' },
    ],
    benefits: ['Grooving técnica', 'Preparación neuromuscular', 'Gradiente de carga', 'Confianza mental'],
    icon: '🏋️',
  },
  {
    id: '5',
    name: 'Warm-up Press de Banca',
    duration: 15,
    focus: 'Preparación específica para bench press',
    level: 'specific',
    exercises: [
      { name: 'Band Pull-Aparts', duration: '2 min', reps: '3x20', notes: 'Activación escapular' },
      { name: 'Push-ups', duration: '2 min', reps: '2x12', notes: 'Activación pectorales' },
      { name: 'Empty Bar Bench', duration: '2 min', reps: '2x10', notes: 'Groove patrón de movimiento' },
      { name: 'Scapular Retractions', duration: '2 min', reps: '15 reps', notes: 'En banco, solo escapulares' },
      { name: 'Light DB Press', duration: '2 min', reps: '2x10', notes: 'Mancuernas ligeras' },
      { name: 'Ramp-up Sets', duration: '5 min', reps: '50%, 60%, 70%, 80% x5-3', notes: 'Aproximación al peso de trabajo' },
    ],
    benefits: ['Estabilidad escapular', 'Activación arco torácico', 'Preparación neurológica', 'Prevención lesiones hombro'],
    icon: '💪',
  },
  {
    id: '6',
    name: 'Warm-up Peso Muerto',
    duration: 15,
    focus: 'Preparación específica para deadlift',
    level: 'specific',
    exercises: [
      { name: 'Cat-Cow', duration: '2 min', reps: '15 reps', notes: 'Movilidad columna' },
      { name: 'Romanian Deadlifts', duration: '2 min', reps: '2x10', notes: 'Solo barra, bisagra cadera' },
      { name: 'Glute Bridges', duration: '2 min', reps: '2x15', notes: 'Activación glúteos y core' },
      { name: 'Dead Bugs', duration: '2 min', reps: '10 cada lado', notes: 'Estabilidad core' },
      { name: 'Light Deadlifts', duration: '2 min', reps: '2x5', notes: 'Técnica con peso ligero' },
      { name: 'Ramp-up Sets', duration: '5 min', reps: '40%, 60%, 75%, 85% x5-3', notes: 'Build up al peso de trabajo' },
    ],
    benefits: ['Patrón bisagra cadera', 'Activación posterior chain', 'Setup mental', 'Agarre preparado'],
    icon: '🏋️',
  },
];

export default function WarmupRoutines() {
  const [routines] = useState(WARMUP_ROUTINES);
  const [filter, setFilter] = useState<'all' | 'general' | 'upper' | 'lower' | 'specific'>('all');
  const [selectedRoutine, setSelectedRoutine] = useState<WarmupRoutine | null>(null);

  const filters = [
    { id: 'all', label: 'Todas', icon: 'apps' },
    { id: 'general', label: 'General', icon: 'flame' },
    { id: 'upper', label: 'Tren Superior', icon: 'body' },
    { id: 'lower', label: 'Tren Inferior', icon: 'walk' },
    { id: 'specific', label: 'Específico', icon: 'fitness' },
  ];

  const filteredRoutines = filter === 'all'
    ? routines
    : routines.filter((r) => r.level === filter);

  const startRoutine = (routine: WarmupRoutine) => {
    setSelectedRoutine(routine);
  };

  const startTimer = () => {
    Alert.alert(
      'Timer Iniciado',
      `${selectedRoutine?.duration} minutos de calentamiento`,
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
            Calentamientos
          </Text>
          <TouchableOpacity>
            <Ionicons name="timer" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Filters */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row gap-2">
            {filters.map((f) => (
              <TouchableOpacity
                key={f.id}
                onPress={() => setFilter(f.id as any)}
                className={`flex-row items-center px-4 py-2 rounded-lg ${
                  filter === f.id
                    ? 'bg-emerald-500'
                    : 'bg-zinc-900 border border-zinc-800'
                }`}
              >
                <Ionicons
                  name={f.icon as any}
                  size={18}
                  color={filter === f.id ? 'white' : '#71717A'}
                />
                <Text
                  className={`ml-2 font-semibold text-sm ${
                    filter === f.id ? 'text-white' : 'text-zinc-400'
                  }`}
                >
                  {f.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          {!selectedRoutine ? (
            <>
              {/* Info Card */}
              <View className="bg-red-500/10 rounded-xl p-4 border border-red-500/30 mb-6">
                <View className="flex-row items-start">
                  <Ionicons name="warning" size={20} color="#EF4444" />
                  <View className="flex-1 ml-3">
                    <Text className="text-red-400 font-bold mb-2">
                      No Saltees el Warm-up
                    </Text>
                    <Text className="text-red-300 text-sm">
                      5-15 minutos de calentamiento adecuado puede prevenir lesiones y mejorar rendimiento hasta 20%.
                    </Text>
                  </View>
                </View>
              </View>

              {/* Routines List */}
              {filteredRoutines.map((routine) => (
                <TouchableOpacity
                  key={routine.id}
                  onPress={() => startRoutine(routine)}
                  className="bg-zinc-900 rounded-xl p-4 mb-4 border border-zinc-800"
                  activeOpacity={0.7}
                >
                  <View className="flex-row items-start justify-between mb-3">
                    <View className="flex-row items-start flex-1">
                      <View className="w-14 h-14 bg-red-500 rounded-xl items-center justify-center mr-3">
                        <Text className="text-3xl">{routine.icon}</Text>
                      </View>
                      <View className="flex-1">
                        <Text className="text-white font-bold text-lg mb-1">
                          {routine.name}
                        </Text>
                        <Text className="text-zinc-400 text-sm">{routine.focus}</Text>
                      </View>
                    </View>
                    <View className="bg-emerald-500/10 rounded-lg px-3 py-1 border border-emerald-500/30">
                      <Text className="text-emerald-400 text-xs font-bold">{routine.duration} MIN</Text>
                    </View>
                  </View>

                  {/* Exercises Preview */}
                  <View className="mb-3">
                    <Text className="text-zinc-400 text-xs mb-2">EJERCICIOS ({routine.exercises.length})</Text>
                    {routine.exercises.slice(0, 3).map((ex, index) => (
                      <View key={index} className="flex-row items-center mb-1">
                        <View className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-2" />
                        <Text className="text-zinc-300 text-sm">{ex.name}</Text>
                      </View>
                    ))}
                    {routine.exercises.length > 3 && (
                      <Text className="text-blue-400 text-sm ml-3.5">
                        +{routine.exercises.length - 3} más
                      </Text>
                    )}
                  </View>

                  {/* Benefits */}
                  <View className="flex-row flex-wrap gap-2">
                    {routine.benefits.slice(0, 2).map((benefit, index) => (
                      <View key={index} className="bg-emerald-500/10 rounded px-2 py-1">
                        <Text className="text-emerald-400 text-xs">{benefit}</Text>
                      </View>
                    ))}
                  </View>
                </TouchableOpacity>
              ))}
            </>
          ) : (
            <>
              {/* Routine Detail */}
              <View className="bg-zinc-900 rounded-xl p-6 mb-6 border border-zinc-800">
                <View className="flex-row items-center mb-4">
                  <View className="w-16 h-16 bg-red-500 rounded-xl items-center justify-center mr-4">
                    <Text className="text-4xl">{selectedRoutine.icon}</Text>
                  </View>
                  <View className="flex-1">
                    <Text className="text-white font-bold text-xl mb-1">
                      {selectedRoutine.name}
                    </Text>
                    <Text className="text-zinc-400">{selectedRoutine.focus}</Text>
                  </View>
                  <View className="bg-emerald-500 rounded-lg px-4 py-2">
                    <Text className="text-white font-bold">{selectedRoutine.duration} min</Text>
                  </View>
                </View>

                {/* Exercises */}
                <Text className="text-white font-bold text-lg mb-3">Secuencia de Ejercicios</Text>
                {selectedRoutine.exercises.map((exercise, index) => (
                  <View
                    key={index}
                    className={`bg-zinc-800 rounded-lg p-3 ${
                      index < selectedRoutine.exercises.length - 1 ? 'mb-3' : ''
                    }`}
                  >
                    <View className="flex-row items-start justify-between mb-2">
                      <View className="flex-row items-start flex-1">
                        <View className="w-7 h-7 bg-emerald-500 rounded-full items-center justify-center mr-3 mt-0.5">
                          <Text className="text-white font-bold text-sm">{index + 1}</Text>
                        </View>
                        <View className="flex-1">
                          <Text className="text-white font-bold mb-1">{exercise.name}</Text>
                          <Text className="text-zinc-400 text-sm">{exercise.notes}</Text>
                        </View>
                      </View>
                    </View>
                    <View className="flex-row gap-2 ml-10">
                      <View className="bg-zinc-700 rounded px-2 py-1">
                        <Text className="text-emerald-400 text-xs font-bold">{exercise.duration}</Text>
                      </View>
                      {exercise.reps && (
                        <View className="bg-zinc-700 rounded px-2 py-1">
                          <Text className="text-blue-400 text-xs font-bold">{exercise.reps}</Text>
                        </View>
                      )}
                    </View>
                  </View>
                ))}

                {/* Benefits */}
                <View className="mt-4">
                  <Text className="text-white font-bold mb-2">Beneficios</Text>
                  <View className="flex-row flex-wrap gap-2">
                    {selectedRoutine.benefits.map((benefit, index) => (
                      <View key={index} className="bg-emerald-500/10 rounded-lg px-3 py-2 border border-emerald-500/30">
                        <Text className="text-emerald-400 text-sm">{benefit}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              </View>

              {/* Actions */}
              <View className="flex-row gap-2 mb-6">
                <TouchableOpacity
                  onPress={() => setSelectedRoutine(null)}
                  className="flex-1 bg-zinc-900 rounded-xl p-4 flex-row items-center justify-center border border-zinc-800"
                >
                  <Ionicons name="arrow-back" size={20} color="white" />
                  <Text className="text-white font-bold ml-2">Volver</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={startTimer}
                  className="flex-1 bg-emerald-500 rounded-xl p-4 flex-row items-center justify-center"
                >
                  <Ionicons name="play" size={20} color="white" />
                  <Text className="text-white font-bold ml-2">Iniciar</Text>
                </TouchableOpacity>
              </View>

              {/* Tips */}
              <View className="bg-blue-500/10 rounded-xl p-4 border border-blue-500/30 mb-6">
                <View className="flex-row items-start">
                  <Ionicons name="information-circle" size={20} color="#3B82F6" />
                  <View className="flex-1 ml-3">
                    <Text className="text-blue-400 font-bold mb-2">
                      Consejos de Calentamiento
                    </Text>
                    <Text className="text-blue-300 text-sm">
                      • Progresión: general → específico{'\n'}
                      • Mayor intensidad = más warm-up{'\n'}
                      • En frío: +5 min extra{'\n'}
                      • No fatigues antes de entrenar
                    </Text>
                  </View>
                </View>
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
