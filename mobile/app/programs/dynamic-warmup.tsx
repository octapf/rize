import React, { useState } from 'react';
import { Text } from '@/components/ui/Text';
import { View, TouchableOpacity, ScrollView, Alert } from 'react-native';;
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface WarmupExercise {
  name: string;
  duration: number;
  reps?: string;
  instructions: string;
}

interface WarmupRoutine {
  workoutType: string;
  totalDuration: number;
  phases: {
    phase: string;
    duration: number;
    exercises: WarmupExercise[];
  }[];
}

export default function DynamicWarmup() {
  const [selectedWorkout, setSelectedWorkout] = useState<string>('upper');

  const workoutTypes = [
    { key: 'upper', label: 'Upper Body', icon: 'hand-left', color: 'blue' },
    { key: 'lower', label: 'Lower Body', icon: 'walk', color: 'primary' },
    { key: 'full', label: 'Full Body', icon: 'body', color: 'purple' },
    { key: 'cardio', label: 'Cardio', icon: 'pulse', color: 'red' },
  ];

  const getWarmupRoutine = (type: string): WarmupRoutine => {
    const routines: { [key: string]: WarmupRoutine } = {
      upper: {
        workoutType: 'Upper Body',
        totalDuration: 12,
        phases: [
          {
            phase: 'Activación Cardiovascular',
            duration: 3,
            exercises: [
              {
                name: 'Jumping Jacks',
                duration: 60,
                instructions: 'Ritmo moderado, activa todo el cuerpo',
              },
              {
                name: 'Arm Circles',
                duration: 60,
                reps: '30 forward + 30 backward',
                instructions: 'Círculos amplios con brazos extendidos',
              },
              {
                name: 'High Knees',
                duration: 60,
                instructions: 'Elevar rodillas al pecho, brazos activos',
              },
            ],
          },
          {
            phase: 'Movilidad Articular',
            duration: 4,
            exercises: [
              {
                name: 'Shoulder Circles',
                duration: 60,
                reps: '10 forward + 10 backward cada brazo',
                instructions: 'Rotación completa de hombro',
              },
              {
                name: 'Scapular Retractions',
                duration: 60,
                reps: '15 reps',
                instructions: 'Juntar omóplatos, mantener 2s',
              },
              {
                name: 'Thread the Needle',
                duration: 60,
                reps: '10 por lado',
                instructions: 'Rotación torácica en cuadrupedia',
              },
              {
                name: 'Band Pull-Aparts',
                duration: 60,
                reps: '15 reps',
                instructions: 'Con banda elástica, activar deltoides posteriores',
              },
            ],
          },
          {
            phase: 'Activación Muscular',
            duration: 5,
            exercises: [
              {
                name: 'Push-ups (Light)',
                duration: 60,
                reps: '10 reps',
                instructions: 'Técnica perfecta, tempo controlado',
              },
              {
                name: 'Band Face Pulls',
                duration: 60,
                reps: '15 reps',
                instructions: 'Activar manguito rotador',
              },
              {
                name: 'Scapular Push-ups',
                duration: 60,
                reps: '12 reps',
                instructions: 'Solo retracción escapular, brazos extendidos',
              },
              {
                name: 'Cuban Rotations',
                duration: 60,
                reps: '10 reps',
                instructions: 'Con mancuernas ligeras 2-3kg',
              },
              {
                name: 'Inchworms',
                duration: 60,
                reps: '8 reps',
                instructions: 'Caminar con manos hacia plancha y volver',
              },
            ],
          },
        ],
      },
      lower: {
        workoutType: 'Lower Body',
        totalDuration: 12,
        phases: [
          {
            phase: 'Activación Cardiovascular',
            duration: 3,
            exercises: [
              {
                name: 'Light Jogging',
                duration: 90,
                instructions: 'Trote suave en el lugar',
              },
              {
                name: 'Butt Kicks',
                duration: 60,
                instructions: 'Talones a glúteos, ritmo moderado',
              },
              {
                name: 'High Knees',
                duration: 30,
                instructions: 'Rodillas al pecho, máxima altura',
              },
            ],
          },
          {
            phase: 'Movilidad Articular',
            duration: 4,
            exercises: [
              {
                name: 'Leg Swings (Front-Back)',
                duration: 60,
                reps: '15 por pierna',
                instructions: 'Sosteníndote, balanceo controlado',
              },
              {
                name: 'Leg Swings (Side-Side)',
                duration: 60,
                reps: '15 por pierna',
                instructions: 'Cruzar pierna adelante del cuerpo',
              },
              {
                name: 'Hip Circles',
                duration: 60,
                reps: '10 por dirección',
                instructions: 'Círculos amplios de cadera',
              },
              {
                name: 'Ankle Circles',
                duration: 60,
                reps: '10 por tobillo',
                instructions: 'Rotación completa de tobillo',
              },
            ],
          },
          {
            phase: 'Activación Muscular',
            duration: 5,
            exercises: [
              {
                name: 'Glute Bridges',
                duration: 60,
                reps: '15 reps',
                instructions: 'Apretar glúteos arriba, 2s hold',
              },
              {
                name: 'Bodyweight Squats',
                duration: 60,
                reps: '12 reps',
                instructions: 'ATG si es posible, tempo controlado',
              },
              {
                name: 'Walking Lunges',
                duration: 60,
                reps: '10 por pierna',
                instructions: 'Rodilla trasera casi toca suelo',
              },
              {
                name: 'Monster Walks (Band)',
                duration: 60,
                reps: '10 pasos cada dirección',
                instructions: 'Con banda en rodillas, activar glúteo medio',
              },
              {
                name: 'Single-Leg RDL',
                duration: 60,
                reps: '8 por pierna',
                instructions: 'Sin peso, enfoque en balance y activación',
              },
            ],
          },
        ],
      },
      full: {
        workoutType: 'Full Body',
        totalDuration: 10,
        phases: [
          {
            phase: 'Activación General',
            duration: 3,
            exercises: [
              {
                name: 'Jumping Jacks',
                duration: 60,
                instructions: 'Ritmo constante',
              },
              {
                name: 'Arm & Leg Swings',
                duration: 60,
                instructions: 'Alterna brazos y piernas',
              },
              {
                name: 'Torso Twists',
                duration: 60,
                instructions: 'Rotación de torso, brazos extendidos',
              },
            ],
          },
          {
            phase: 'Movilidad Dinámica',
            duration: 4,
            exercises: [
              {
                name: 'World\'s Greatest Stretch',
                duration: 120,
                reps: '5 por lado',
                instructions: 'Zancada + rotación + alcance hacia arriba',
              },
              {
                name: 'Cat-Cow',
                duration: 60,
                reps: '12 reps',
                instructions: 'Movilidad de columna',
              },
              {
                name: 'Downward Dog to Cobra',
                duration: 60,
                reps: '8 transitions',
                instructions: 'Flujo de yoga para movilidad total',
              },
            ],
          },
          {
            phase: 'Activación Total',
            duration: 3,
            exercises: [
              {
                name: 'Burpees (Light)',
                duration: 60,
                reps: '8 reps',
                instructions: 'Ritmo controlado, no máximo esfuerzo',
              },
              {
                name: 'Inchworms',
                duration: 60,
                reps: '6 reps',
                instructions: 'Caminar hacia plancha',
              },
              {
                name: 'Mountain Climbers',
                duration: 60,
                instructions: 'Ritmo moderado, core activado',
              },
            ],
          },
        ],
      },
      cardio: {
        workoutType: 'Cardio',
        totalDuration: 8,
        phases: [
          {
            phase: 'Activación Progresiva',
            duration: 5,
            exercises: [
              {
                name: 'Walking',
                duration: 120,
                instructions: 'Caminar normal, activar cuerpo',
              },
              {
                name: 'Light Jogging',
                duration: 120,
                instructions: 'Trote suave, 50-60% esfuerzo',
              },
              {
                name: 'Dynamic Stretching',
                duration: 60,
                instructions: 'Leg swings, arm circles',
              },
            ],
          },
          {
            phase: 'Intensidad Gradual',
            duration: 3,
            exercises: [
              {
                name: 'Tempo Runs',
                duration: 90,
                reps: '3x30s @ 70%',
                instructions: 'Intervalos incrementando intensidad',
              },
              {
                name: 'High Knees',
                duration: 30,
                instructions: 'Preparar para intensidad máxima',
              },
              {
                name: 'Butt Kicks',
                duration: 30,
                instructions: 'Activar posterior de piernas',
              },
              {
                name: 'Strides',
                duration: 30,
                reps: '2x80m @ 80-85%',
                instructions: 'Aceleraciones controladas',
              },
            ],
          },
        ],
      },
    };

    return routines[type] || routines.upper;
  };

  const routine = getWarmupRoutine(selectedWorkout);

  const startWarmup = () => {
    Alert.alert(
      'Warmup Iniciado! 🔥',
      `${routine.totalDuration} minutos • ${routine.phases.length} fases`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Empezar Timer',
          onPress: () => {
            // Timer functionality would go here
            console.log('Starting warmup timer');
          }
        }
      ]
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
            Dynamic Warmup
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          {/* Info */}
          <View className="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl p-6 mb-6">
            <Text className="text-white text-2xl font-bold mb-2">Warmup Inteligente</Text>
            <Text className="text-white opacity-90 mb-4">
              Calentamiento dinámico personalizado según tu workout
            </Text>
            <View className="flex-row items-center">
              <Ionicons name="timer" size={20} color="white" />
              <Text className="text-white ml-2">{routine.totalDuration} minutos</Text>
            </View>
          </View>

          {/* Workout Type Selection */}
          <Text className="text-white font-bold text-lg mb-4">Tipo de Workout</Text>
          
          <View className="flex-row flex-wrap gap-3 mb-6">
            {workoutTypes.map((type) => (
              <TouchableOpacity
                key={type.key}
                onPress={() => setSelectedWorkout(type.key)}
                className={`flex-1 min-w-[45%] rounded-xl p-4 ${
                  selectedWorkout === type.key
                    ? `bg-${type.color}-500`
                    : 'bg-zinc-900 border border-zinc-800'
                }`}
              >
                <View className="items-center">
                  <Ionicons
                    name={type.icon as any}
                    size={32}
                    color={selectedWorkout === type.key ? 'white' : '#71717A'}
                  />
                  <Text className={`font-bold mt-2 text-center ${
                    selectedWorkout === type.key ? 'text-white' : 'text-zinc-400'
                  }`}>
                    {type.label}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Routine Phases */}
          <Text className="text-white font-bold text-lg mb-4">Rutina Completa</Text>

          {routine.phases.map((phase, phaseIdx) => {
            const phaseColors = ['blue', 'primary', 'purple'];
            const color = phaseColors[phaseIdx % phaseColors.length];

            return (
              <View key={phaseIdx} className="mb-6">
                <View className="flex-row items-center mb-3">
                  <View className={`w-10 h-10 bg-${color}-500 rounded-xl items-center justify-center mr-3`}>
                    <Text className="text-white font-bold">{phaseIdx + 1}</Text>
                  </View>
                  <View className="flex-1">
                    <Text className="text-white font-bold text-lg">{phase.phase}</Text>
                    <Text className={`text-${color}-400 text-sm`}>~{phase.duration} minutos</Text>
                  </View>
                </View>

                {phase.exercises.map((exercise, exerciseIdx) => (
                  <View 
                    key={exerciseIdx}
                    className={`bg-${color}-500/10 rounded-xl p-4 mb-3 border border-${color}-500/30 ml-13`}
                  >
                    <View className="flex-row items-start justify-between mb-2">
                      <Text className="text-white font-bold flex-1">{exercise.name}</Text>
                      <View className={`bg-${color}-500 rounded-full px-3 py-1`}>
                        <Text className="text-white text-xs font-bold">
                          {exercise.reps || `${exercise.duration}s`}
                        </Text>
                      </View>
                    </View>
                    <Text className="text-zinc-400 text-sm">{exercise.instructions}</Text>
                  </View>
                ))}
              </View>
            );
          })}

          {/* Start Button */}
          <TouchableOpacity
            onPress={startWarmup}
            className="bg-orange-500 rounded-xl p-5 flex-row items-center justify-center mb-6"
          >
            <Ionicons name="play-circle" size={28} color="white" />
            <Text className="text-white font-bold text-lg ml-2">
              Empezar Warmup ({routine.totalDuration} min)
            </Text>
          </TouchableOpacity>

          {/* Tips */}
          <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-6">
            <View className="flex-row items-start">
              <Ionicons name="bulb" size={20} color="#9D12DE" />
              <View className="flex-1 ml-3">
                <Text className="text-primary/80 font-bold mb-2">
                  Por Qué Calentar Dinámicamente
                </Text>
                <Text className="text-primary/60 text-sm">
                  • Reduce lesiones hasta 50%{'\n'}
                  • Mejora rendimiento 10-15%{'\n'}
                  • Aumenta rango de movimiento{'\n'}
                  • Activa sistema nervioso{'\n'}
                  • Prepara mentalmente para entrenar{'\n'}
                  • Nunca estires estático en frío
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

