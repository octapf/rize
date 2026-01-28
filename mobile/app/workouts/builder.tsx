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

interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: string;
  rest: number;
  notes: string;
  category: string;
}

interface WorkoutTemplate {
  id: string;
  name: string;
  exercises: Exercise[];
  totalExercises: number;
  estimatedTime: number;
  targetMuscles: string[];
}

const QUICK_TEMPLATES: WorkoutTemplate[] = [
  {
    id: '1',
    name: 'Push Day',
    exercises: [
      { id: '1', name: 'Press Banca', sets: 4, reps: '6-8', rest: 180, notes: '', category: 'Pecho' },
      { id: '2', name: 'Press Inclinado', sets: 3, reps: '8-10', rest: 120, notes: '', category: 'Pecho' },
      { id: '3', name: 'Press Militar', sets: 4, reps: '6-8', rest: 120, notes: '', category: 'Hombros' },
      { id: '4', name: 'Elevaciones Laterales', sets: 3, reps: '12-15', rest: 60, notes: '', category: 'Hombros' },
      { id: '5', name: 'Tríceps en Polea', sets: 3, reps: '10-12', rest: 60, notes: '', category: 'Tríceps' },
    ],
    totalExercises: 5,
    estimatedTime: 75,
    targetMuscles: ['Pecho', 'Hombros', 'Tríceps'],
  },
  {
    id: '2',
    name: 'Pull Day',
    exercises: [
      { id: '1', name: 'Peso Muerto', sets: 4, reps: '5-6', rest: 180, notes: '', category: 'Espalda' },
      { id: '2', name: 'Dominadas', sets: 4, reps: '8-10', rest: 120, notes: '', category: 'Espalda' },
      { id: '3', name: 'Remo con Barra', sets: 4, reps: '8-10', rest: 120, notes: '', category: 'Espalda' },
      { id: '4', name: 'Face Pulls', sets: 3, reps: '15-20', rest: 60, notes: '', category: 'Hombros' },
      { id: '5', name: 'Curl con Barra', sets: 3, reps: '10-12', rest: 60, notes: '', category: 'Bíceps' },
    ],
    totalExercises: 5,
    estimatedTime: 75,
    targetMuscles: ['Espalda', 'Bíceps', 'Hombros'],
  },
  {
    id: '3',
    name: 'Leg Day',
    exercises: [
      { id: '1', name: 'Sentadilla', sets: 4, reps: '6-8', rest: 180, notes: '', category: 'Cuádriceps' },
      { id: '2', name: 'Prensa', sets: 3, reps: '10-12', rest: 120, notes: '', category: 'Cuádriceps' },
      { id: '3', name: 'Peso Muerto Rumano', sets: 4, reps: '8-10', rest: 120, notes: '', category: 'Isquios' },
      { id: '4', name: 'Curl Femoral', sets: 3, reps: '12-15', rest: 90, notes: '', category: 'Isquios' },
      { id: '5', name: 'Elevaciones de Gemelos', sets: 4, reps: '15-20', rest: 60, notes: '', category: 'Gemelos' },
    ],
    totalExercises: 5,
    estimatedTime: 75,
    targetMuscles: ['Cuádriceps', 'Isquios', 'Gemelos'],
  },
];

export default function WorkoutBuilder() {
  const [workoutName, setWorkoutName] = useState('');
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [showTemplates, setShowTemplates] = useState(true);

  const addExercise = () => {
    Alert.prompt(
      'Agregar Ejercicio',
      'Nombre del ejercicio',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Agregar',
          onPress: (exerciseName) => {
            if (exerciseName && exerciseName.trim()) {
              const newExercise: Exercise = {
                id: Date.now().toString(),
                name: exerciseName.trim(),
                sets: 3,
                reps: '8-12',
                rest: 90,
                notes: '',
                category: 'General',
              };
              setExercises([...exercises, newExercise]);
              setShowTemplates(false);
            }
          },
        },
      ],
      'plain-text'
    );
  };

  const removeExercise = (id: string) => {
    Alert.alert(
      'Eliminar Ejercicio',
      '¿Seguro que quieres eliminar este ejercicio?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => setExercises(exercises.filter((e) => e.id !== id)),
        },
      ]
    );
  };

  const updateExercise = (id: string, field: keyof Exercise, value: any) => {
    setExercises(
      exercises.map((ex) => (ex.id === id ? { ...ex, [field]: value } : ex))
    );
  };

  const loadTemplate = (template: WorkoutTemplate) => {
    setWorkoutName(template.name);
    setExercises(template.exercises);
    setShowTemplates(false);
    Alert.alert('Template Cargado', `${template.name} con ${template.totalExercises} ejercicios`);
  };

  const saveWorkout = () => {
    if (!workoutName.trim()) {
      Alert.alert('Error', 'Ingresa un nombre para el workout');
      return;
    }
    if (exercises.length === 0) {
      Alert.alert('Error', 'Agrega al menos un ejercicio');
      return;
    }

    const totalTime = exercises.reduce((sum, ex) => {
      const exerciseTime = ex.sets * (60 + ex.rest); // 60 seg por serie + descanso
      return sum + exerciseTime;
    }, 0);

    Alert.alert(
      'Workout Guardado',
      `${workoutName}\n${exercises.length} ejercicios\n~${Math.round(totalTime / 60)} min estimados`,
      [
        { text: 'Ver Mis Workouts' },
        { text: 'Crear Otro', onPress: () => resetBuilder() },
      ]
    );
  };

  const startWorkout = () => {
    if (exercises.length === 0) {
      Alert.alert('Error', 'Agrega ejercicios primero');
      return;
    }
    Alert.alert('Iniciar Workout', 'Esto iniciará el tracker de workout en vivo', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Comenzar', onPress: () => Alert.alert('¡A entrenar!') },
    ]);
  };

  const resetBuilder = () => {
    setWorkoutName('');
    setExercises([]);
    setShowTemplates(true);
  };

  const calculateEstimatedTime = () => {
    const totalTime = exercises.reduce((sum, ex) => {
      const exerciseTime = ex.sets * (60 + ex.rest);
      return sum + exerciseTime;
    }, 0);
    return Math.round(totalTime / 60);
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
            Crear Workout
          </Text>
          <TouchableOpacity onPress={resetBuilder}>
            <Ionicons name="refresh" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Workout Name */}
        <View className="bg-zinc-900 rounded-xl px-4 py-3 border border-zinc-800">
          <TextInput
            className="text-white text-lg"
            placeholder="Nombre del Workout..."
            placeholderTextColor="#71717A"
            value={workoutName}
            onChangeText={setWorkoutName}
          />
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          {/* Quick Templates */}
          {showTemplates && exercises.length === 0 && (
            <View className="mb-6">
              <Text className="text-white text-lg font-bold mb-3">Templates Rápidos</Text>
              {QUICK_TEMPLATES.map((template) => (
                <TouchableOpacity
                  key={template.id}
                  onPress={() => loadTemplate(template)}
                  className="bg-zinc-900 rounded-xl p-4 mb-3 border border-zinc-800"
                  activeOpacity={0.7}
                >
                  <View className="flex-row items-start justify-between mb-2">
                    <View className="flex-1">
                      <Text className="text-white font-bold text-lg mb-1">
                        {template.name}
                      </Text>
                      <Text className="text-zinc-400 text-sm">
                        {template.totalExercises} ejercicios · ~{template.estimatedTime} min
                      </Text>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color="#71717A" />
                  </View>
                  <View className="flex-row flex-wrap gap-2 mt-2">
                    {template.targetMuscles.map((muscle, index) => (
                      <View key={index} className="bg-emerald-500/10 rounded px-2 py-1">
                        <Text className="text-emerald-400 text-xs">{muscle}</Text>
                      </View>
                    ))}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Stats */}
          {exercises.length > 0 && (
            <View className="flex-row gap-2 mb-4">
              <View className="flex-1 bg-zinc-900 rounded-xl p-3 border border-zinc-800">
                <Text className="text-zinc-400 text-xs mb-1">EJERCICIOS</Text>
                <Text className="text-white font-bold text-xl">{exercises.length}</Text>
              </View>
              <View className="flex-1 bg-zinc-900 rounded-xl p-3 border border-zinc-800">
                <Text className="text-zinc-400 text-xs mb-1">TIEMPO EST.</Text>
                <Text className="text-emerald-400 font-bold text-xl">
                  {calculateEstimatedTime()} min
                </Text>
              </View>
              <View className="flex-1 bg-zinc-900 rounded-xl p-3 border border-zinc-800">
                <Text className="text-zinc-400 text-xs mb-1">SERIES</Text>
                <Text className="text-blue-400 font-bold text-xl">
                  {exercises.reduce((sum, ex) => sum + ex.sets, 0)}
                </Text>
              </View>
            </View>
          )}

          {/* Exercises List */}
          {exercises.length > 0 && (
            <View className="mb-4">
              <Text className="text-white text-lg font-bold mb-3">Ejercicios</Text>
              {exercises.map((exercise, index) => (
                <View
                  key={exercise.id}
                  className="bg-zinc-900 rounded-xl p-4 mb-3 border border-zinc-800"
                >
                  <View className="flex-row items-start justify-between mb-3">
                    <View className="flex-1">
                      <View className="flex-row items-center mb-1">
                        <View className="w-6 h-6 bg-emerald-500 rounded-full items-center justify-center mr-2">
                          <Text className="text-white text-xs font-bold">{index + 1}</Text>
                        </View>
                        <Text className="text-white font-bold text-lg">{exercise.name}</Text>
                      </View>
                      <Text className="text-zinc-400 text-sm">{exercise.category}</Text>
                    </View>
                    <TouchableOpacity onPress={() => removeExercise(exercise.id)}>
                      <Ionicons name="trash" size={20} color="#EF4444" />
                    </TouchableOpacity>
                  </View>

                  {/* Sets/Reps/Rest */}
                  <View className="flex-row gap-2">
                    <View className="flex-1 bg-zinc-800 rounded-lg p-2">
                      <Text className="text-zinc-400 text-xs mb-1">Series</Text>
                      <View className="flex-row items-center">
                        <TouchableOpacity
                          onPress={() => updateExercise(exercise.id, 'sets', Math.max(1, exercise.sets - 1))}
                        >
                          <Ionicons name="remove-circle" size={20} color="#71717A" />
                        </TouchableOpacity>
                        <Text className="text-white font-bold mx-3">{exercise.sets}</Text>
                        <TouchableOpacity
                          onPress={() => updateExercise(exercise.id, 'sets', exercise.sets + 1)}
                        >
                          <Ionicons name="add-circle" size={20} color="#10B981" />
                        </TouchableOpacity>
                      </View>
                    </View>

                    <View className="flex-1 bg-zinc-800 rounded-lg p-2">
                      <Text className="text-zinc-400 text-xs mb-1">Reps</Text>
                      <TextInput
                        className="text-white font-bold text-center"
                        value={exercise.reps}
                        onChangeText={(text) => updateExercise(exercise.id, 'reps', text)}
                        keyboardType="default"
                      />
                    </View>

                    <View className="flex-1 bg-zinc-800 rounded-lg p-2">
                      <Text className="text-zinc-400 text-xs mb-1">Descanso</Text>
                      <Text className="text-white font-bold text-center">{exercise.rest}s</Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          )}

          {/* Add Exercise Button */}
          <TouchableOpacity
            onPress={addExercise}
            className="bg-zinc-900 rounded-xl p-4 mb-6 border-2 border-dashed border-zinc-700 flex-row items-center justify-center"
          >
            <Ionicons name="add-circle" size={24} color="#10B981" />
            <Text className="text-emerald-400 font-bold ml-2">Agregar Ejercicio</Text>
          </TouchableOpacity>

          {/* Info Card */}
          <View className="bg-blue-500/10 rounded-xl p-4 border border-blue-500/30 mb-6">
            <View className="flex-row items-start">
              <Ionicons name="information-circle" size={20} color="#3B82F6" />
              <View className="flex-1 ml-3">
                <Text className="text-blue-400 font-bold mb-2">
                  Crea Workouts Personalizados
                </Text>
                <Text className="text-blue-300 text-sm">
                  Diseña entrenamientos según tus objetivos. Guárdalos como templates para reutilizar.
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Actions */}
      {exercises.length > 0 && (
        <View className="px-6 pb-6 pt-4 border-t border-zinc-800">
          <View className="flex-row gap-2">
            <TouchableOpacity
              onPress={saveWorkout}
              className="flex-1 bg-blue-500 rounded-xl p-4 flex-row items-center justify-center"
            >
              <Ionicons name="save" size={20} color="white" />
              <Text className="text-white font-bold ml-2">Guardar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={startWorkout}
              className="flex-1 bg-emerald-500 rounded-xl p-4 flex-row items-center justify-center"
            >
              <Ionicons name="play" size={20} color="white" />
              <Text className="text-white font-bold ml-2">Iniciar</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}
