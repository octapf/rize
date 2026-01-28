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
import { format, differenceInMinutes } from 'date-fns';
import { es } from 'date-fns/locale';

interface MealTiming {
  id: string;
  name: string;
  timeBeforeWorkout?: number; // minutes before workout
  timeAfterWorkout?: number; // minutes after workout
  protein: number;
  carbs: number;
  fats: number;
  calories: number;
  description: string;
  isOptimal: boolean;
}

interface WorkoutWindow {
  workoutTime: Date;
  preWorkoutOptimal: Date;
  preWorkoutEarliest: Date;
  postWorkoutOptimal: Date;
  postWorkoutLatest: Date;
}

const MEAL_TIMING_TEMPLATES: MealTiming[] = [
  {
    id: '1',
    name: 'Pre-Workout (2-3h antes)',
    timeBeforeWorkout: 150,
    protein: 30,
    carbs: 60,
    fats: 10,
    calories: 430,
    description: 'Comida completa: proteína magra + carbos complejos + grasas bajas',
    isOptimal: true,
  },
  {
    id: '2',
    name: 'Pre-Workout (30-60 min antes)',
    timeBeforeWorkout: 45,
    protein: 20,
    carbs: 40,
    fats: 5,
    calories: 270,
    description: 'Snack ligero: proteína rápida + carbos simples',
    isOptimal: true,
  },
  {
    id: '3',
    name: 'Intra-Workout',
    timeBeforeWorkout: 0,
    protein: 10,
    carbs: 30,
    fats: 0,
    calories: 160,
    description: 'Durante: BCAAs + carbos rápidos (solo workouts >90 min)',
    isOptimal: false,
  },
  {
    id: '4',
    name: 'Post-Workout (0-30 min)',
    timeAfterWorkout: 15,
    protein: 25,
    carbs: 50,
    fats: 5,
    calories: 330,
    description: 'Ventana anabólica: proteína rápida + carbos alto GI',
    isOptimal: true,
  },
  {
    id: '5',
    name: 'Post-Workout (1-2h después)',
    timeAfterWorkout: 90,
    protein: 40,
    carbs: 60,
    fats: 15,
    calories: 515,
    description: 'Comida completa: recarga glucógeno + síntesis proteica',
    isOptimal: true,
  },
];

const MEAL_EXAMPLES = {
  'pre-workout-early': [
    { name: 'Pollo + arroz + verduras', macros: '35p/60c/8f' },
    { name: 'Avena + proteína + banana', macros: '30p/55c/12f' },
    { name: 'Atún + pasta + aceite oliva', macros: '32p/65c/10f' },
  ],
  'pre-workout-close': [
    { name: 'Batido proteína + banana', macros: '25p/35c/3f' },
    { name: 'Yogurt griego + miel + frutos', macros: '20p/40c/5f' },
    { name: 'Tostadas + mermelada + whey', macros: '22p/42c/4f' },
  ],
  'post-workout-immediate': [
    { name: 'Whey + maltodextrina', macros: '30p/50c/2f' },
    { name: 'Batido: whey + banana + avena', macros: '28p/48c/6f' },
    { name: 'Arroz blanco + proteína en polvo', macros: '25p/52c/3f' },
  ],
  'post-workout-later': [
    { name: 'Salmón + batata + brócoli', macros: '40p/55c/18f' },
    { name: 'Carne + arroz + aguacate', macros: '45p/60c/15f' },
    { name: 'Huevos + tostadas + fruta', macros: '35p/58c/14f' },
  ],
};

export default function NutritionTiming() {
  const [workoutTime, setWorkoutTime] = useState<Date>(new Date());
  const [showWorkoutPicker, setShowWorkoutPicker] = useState(false);
  const [selectedMealType, setSelectedMealType] = useState<string>('pre-workout-early');

  // Mock workout time at 6 PM
  const mockWorkoutTime = new Date();
  mockWorkoutTime.setHours(18, 0, 0, 0);

  const calculateOptimalWindows = (): WorkoutWindow => {
    const workout = mockWorkoutTime;
    
    const preOptimal = new Date(workout);
    preOptimal.setMinutes(workout.getMinutes() - 150); // 2.5h before
    
    const preEarliest = new Date(workout);
    preEarliest.setMinutes(workout.getMinutes() - 180); // 3h before
    
    const postOptimal = new Date(workout);
    postOptimal.setMinutes(workout.getMinutes() + 30); // 30 min after
    
    const postLatest = new Date(workout);
    postLatest.setMinutes(workout.getMinutes() + 120); // 2h after
    
    return {
      workoutTime: workout,
      preWorkoutOptimal: preOptimal,
      preWorkoutEarliest: preEarliest,
      postWorkoutOptimal: postOptimal,
      postWorkoutLatest: postLatest,
    };
  };

  const windows = calculateOptimalWindows();

  const mealTypes = [
    { key: 'pre-workout-early', label: 'Pre (2-3h)', icon: 'restaurant', color: 'blue' },
    { key: 'pre-workout-close', label: 'Pre (30-60m)', icon: 'flash', color: 'purple' },
    { key: 'post-workout-immediate', label: 'Post (0-30m)', icon: 'fitness', color: 'emerald' },
    { key: 'post-workout-later', label: 'Post (1-2h)', icon: 'restaurant', color: 'amber' },
  ];

  const getCurrentMealExamples = () => {
    return MEAL_EXAMPLES[selectedMealType as keyof typeof MEAL_EXAMPLES] || [];
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
            Nutrient Timing
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          {/* Info */}
          <View className="bg-gradient-to-r from-emerald-500 to-green-500 rounded-xl p-6 mb-6">
            <Text className="text-white text-2xl font-bold mb-2">Timing Nutricional</Text>
            <Text className="text-white opacity-90 mb-4">
              Optimiza tu nutrición alrededor del workout
            </Text>
            <View className="flex-row items-center">
              <Ionicons name="time" size={20} color="white" />
              <Text className="text-white ml-2">El timing puede mejorar rendimiento 10-15%</Text>
            </View>
          </View>

          {/* Workout Time Selector */}
          <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
            <Text className="text-white font-bold text-lg mb-3">Tu Workout</Text>
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <View className="w-12 h-12 bg-purple-500 rounded-xl items-center justify-center mr-3">
                  <Ionicons name="barbell" size={24} color="white" />
                </View>
                <View>
                  <Text className="text-zinc-400 text-xs">Hora de Entrenamiento</Text>
                  <Text className="text-white font-bold text-xl">
                    {format(windows.workoutTime, 'HH:mm')}
                  </Text>
                </View>
              </View>
              <TouchableOpacity className="bg-zinc-800 rounded-lg px-4 py-2">
                <Text className="text-purple-400 font-bold">Cambiar</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Optimal Windows Timeline */}
          <View className="mb-6">
            <Text className="text-white font-bold text-lg mb-4">Ventanas Óptimas</Text>
            
            {/* Pre-Workout Early */}
            <View className="mb-4">
              <View className="flex-row items-center mb-2">
                <View className="w-10 h-10 bg-blue-500 rounded-xl items-center justify-center mr-3">
                  <Ionicons name="restaurant" size={20} color="white" />
                </View>
                <View className="flex-1">
                  <Text className="text-white font-bold">Pre-Workout (2-3h antes)</Text>
                  <Text className="text-blue-400 text-sm">
                    {format(windows.preWorkoutEarliest, 'HH:mm')} - {format(windows.preWorkoutOptimal, 'HH:mm')}
                  </Text>
                </View>
                <View className="bg-blue-500/20 rounded-lg px-3 py-1">
                  <Text className="text-blue-400 text-xs font-bold">ÓPTIMO</Text>
                </View>
              </View>
              <View className="bg-blue-500/10 rounded-lg p-3 ml-13 border border-blue-500/30">
                <Text className="text-blue-300 text-sm">
                  • Comida completa balanceada{'\n'}
                  • 30-40g proteína + 50-70g carbos{'\n'}
                  • Tiempo para digestión completa
                </Text>
              </View>
            </View>

            {/* Pre-Workout Close */}
            <View className="mb-4">
              <View className="flex-row items-center mb-2">
                <View className="w-10 h-10 bg-purple-500 rounded-xl items-center justify-center mr-3">
                  <Ionicons name="flash" size={20} color="white" />
                </View>
                <View className="flex-1">
                  <Text className="text-white font-bold">Pre-Workout (30-60 min antes)</Text>
                  <Text className="text-purple-400 text-sm">
                    {format(new Date(windows.workoutTime.getTime() - 60 * 60 * 1000), 'HH:mm')} - {format(new Date(windows.workoutTime.getTime() - 30 * 60 * 1000), 'HH:mm')}
                  </Text>
                </View>
                <View className="bg-purple-500/20 rounded-lg px-3 py-1">
                  <Text className="text-purple-400 text-xs font-bold">RÁPIDO</Text>
                </View>
              </View>
              <View className="bg-purple-500/10 rounded-lg p-3 ml-13 border border-purple-500/30">
                <Text className="text-purple-300 text-sm">
                  • Snack ligero de fácil digestión{'\n'}
                  • 20-25g proteína + 30-40g carbos{'\n'}
                  • Evita grasas y fibra
                </Text>
              </View>
            </View>

            {/* Post-Workout Immediate */}
            <View className="mb-4">
              <View className="flex-row items-center mb-2">
                <View className="w-10 h-10 bg-emerald-500 rounded-xl items-center justify-center mr-3">
                  <Ionicons name="fitness" size={20} color="white" />
                </View>
                <View className="flex-1">
                  <Text className="text-white font-bold">Post-Workout (0-30 min)</Text>
                  <Text className="text-emerald-400 text-sm">
                    {format(windows.workoutTime, 'HH:mm')} - {format(windows.postWorkoutOptimal, 'HH:mm')}
                  </Text>
                </View>
                <View className="bg-emerald-500/20 rounded-lg px-3 py-1">
                  <Text className="text-emerald-400 text-xs font-bold">CRÍTICO</Text>
                </View>
              </View>
              <View className="bg-emerald-500/10 rounded-lg p-3 ml-13 border border-emerald-500/30">
                <Text className="text-emerald-300 text-sm">
                  • Ventana anabólica máxima{'\n'}
                  • 25-30g proteína rápida (whey){'\n'}
                  • 40-60g carbos alto GI (maltodextrina)
                </Text>
              </View>
            </View>

            {/* Post-Workout Later */}
            <View className="mb-4">
              <View className="flex-row items-center mb-2">
                <View className="w-10 h-10 bg-amber-500 rounded-xl items-center justify-center mr-3">
                  <Ionicons name="restaurant" size={20} color="white" />
                </View>
                <View className="flex-1">
                  <Text className="text-white font-bold">Post-Workout (1-2h después)</Text>
                  <Text className="text-amber-400 text-sm">
                    {format(new Date(windows.workoutTime.getTime() + 60 * 60 * 1000), 'HH:mm')} - {format(windows.postWorkoutLatest, 'HH:mm')}
                  </Text>
                </View>
                <View className="bg-amber-500/20 rounded-lg px-3 py-1">
                  <Text className="text-amber-400 text-xs font-bold">IMPORTANTE</Text>
                </View>
              </View>
              <View className="bg-amber-500/10 rounded-lg p-3 ml-13 border border-amber-500/30">
                <Text className="text-amber-300 text-sm">
                  • Comida completa post-workout{'\n'}
                  • 40-50g proteína + 60-80g carbos{'\n'}
                  • Recarga glucógeno muscular
                </Text>
              </View>
            </View>
          </View>

          {/* Meal Type Selector */}
          <Text className="text-white font-bold text-lg mb-4">Ejemplos de Comidas</Text>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-4">
            <View className="flex-row gap-2">
              {mealTypes.map((type) => (
                <TouchableOpacity
                  key={type.key}
                  onPress={() => setSelectedMealType(type.key)}
                  className={`rounded-xl px-4 py-3 flex-row items-center ${
                    selectedMealType === type.key
                      ? `bg-${type.color}-500`
                      : 'bg-zinc-900 border border-zinc-800'
                  }`}
                >
                  <Ionicons
                    name={type.icon as any}
                    size={18}
                    color={selectedMealType === type.key ? 'white' : '#71717A'}
                  />
                  <Text className={`ml-2 font-bold ${selectedMealType === type.key ? 'text-white' : 'text-zinc-400'}`}>
                    {type.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          {/* Meal Examples */}
          {getCurrentMealExamples().map((meal, idx) => (
            <View key={idx} className="bg-zinc-900 rounded-xl p-4 mb-3 border border-zinc-800">
              <View className="flex-row items-center justify-between">
                <Text className="text-white font-bold flex-1">{meal.name}</Text>
                <View className="bg-zinc-800 rounded-lg px-3 py-1">
                  <Text className="text-emerald-400 text-xs font-bold">{meal.macros}</Text>
                </View>
              </View>
            </View>
          ))}

          {/* Tips */}
          <View className="bg-blue-500/10 rounded-xl p-4 border border-blue-500/30 mb-6 mt-4">
            <View className="flex-row items-start">
              <Ionicons name="bulb" size={20} color="#3B82F6" />
              <View className="flex-1 ml-3">
                <Text className="text-blue-400 font-bold mb-2">
                  Reglas de Nutrient Timing
                </Text>
                <Text className="text-blue-300 text-sm">
                  • Pre-workout: carbos para energía{'\n'}
                  • Post-workout: proteína para recuperación{'\n'}
                  • 0-2h post = ventana anabólica{'\n'}
                  • Si entrenas AM en ayunas: BCAAs pre{'\n'}
                  • Timing &gt; tipo de comida{'\n'}
                  • Hidratación constante 500ml/hora
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
