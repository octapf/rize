import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  Modal,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface WorkoutSet {
  id: string;
  reps: string;
  weight: string;
  completed: boolean;
}

interface WorkoutExercise {
  id: string;
  name: string;
  targetSets: number;
  targetReps: string;
  sets: WorkoutSet[];
  notes: string;
}

const INITIAL_WORKOUT: WorkoutExercise[] = [
  {
    id: '1',
    name: 'Pull-ups',
    targetSets: 4,
    targetReps: '8-12',
    sets: [
      { id: '1', reps: '', weight: '', completed: false },
      { id: '2', reps: '', weight: '', completed: false },
      { id: '3', reps: '', weight: '', completed: false },
      { id: '4', reps: '', weight: '', completed: false },
    ],
    notes: '',
  },
  {
    id: '2',
    name: 'Dips',
    targetSets: 4,
    targetReps: '10-15',
    sets: [
      { id: '1', reps: '', weight: '', completed: false },
      { id: '2', reps: '', weight: '', completed: false },
      { id: '3', reps: '', weight: '', completed: false },
      { id: '4', reps: '', weight: '', completed: false },
    ],
    notes: '',
  },
  {
    id: '3',
    name: 'Push-ups',
    targetSets: 3,
    targetReps: '15-20',
    sets: [
      { id: '1', reps: '', weight: '', completed: false },
      { id: '2', reps: '', weight: '', completed: false },
      { id: '3', reps: '', weight: '', completed: false },
    ],
    notes: '',
  },
];

export default function ActiveWorkout() {
  const [exercises, setExercises] = useState<WorkoutExercise[]>(INITIAL_WORKOUT);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [workoutStartTime, setWorkoutStartTime] = useState(Date.now());
  const [elapsedTime, setElapsedTime] = useState(0);
  const [showRestTimer, setShowRestTimer] = useState(false);
  const [restTime, setRestTime] = useState(90);
  const [showNotesModal, setShowNotesModal] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - workoutStartTime) / 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, [workoutStartTime]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const currentExercise = exercises[currentExerciseIndex];
  const totalSetsCompleted = exercises.reduce(
    (acc, ex) => acc + ex.sets.filter((s) => s.completed).length,
    0
  );
  const totalSets = exercises.reduce((acc, ex) => acc + ex.sets.length, 0);
  const progressPercentage = (totalSetsCompleted / totalSets) * 100;

  const updateSet = (exerciseId: string, setId: string, field: 'reps' | 'weight', value: string) => {
    setExercises((prev) =>
      prev.map((ex) =>
        ex.id === exerciseId
          ? {
              ...ex,
              sets: ex.sets.map((s) =>
                s.id === setId ? { ...s, [field]: value } : s
              ),
            }
          : ex
      )
    );
  };

  const toggleSetCompleted = (exerciseId: string, setId: string) => {
    setExercises((prev) =>
      prev.map((ex) =>
        ex.id === exerciseId
          ? {
              ...ex,
              sets: ex.sets.map((s) =>
                s.id === setId ? { ...s, completed: !s.completed } : s
              ),
            }
          : ex
      )
    );

    // Start rest timer after completing a set
    const exercise = exercises.find((e) => e.id === exerciseId);
    const set = exercise?.sets.find((s) => s.id === setId);
    if (set && !set.completed) {
      setShowRestTimer(true);
    }
  };

  const finishWorkout = () => {
    Alert.alert(
      'Â¿Finalizar Entrenamiento?',
      `Has completado ${totalSetsCompleted} de ${totalSets} series.\n\nTiempo total: ${formatTime(elapsedTime)}`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Finalizar',
          style: 'destructive',
          onPress: () => {
            Alert.alert('Â¡Entrenamiento guardado!', 'Excelente trabajo hoy ðŸ’ª', [
              { text: 'OK', onPress: () => router.back() },
            ]);
          },
        },
      ]
    );
  };

  const addSet = () => {
    setExercises((prev) =>
      prev.map((ex, idx) =>
        idx === currentExerciseIndex
          ? {
              ...ex,
              sets: [
                ...ex.sets,
                {
                  id: (ex.sets.length + 1).toString(),
                  reps: '',
                  weight: '',
                  completed: false,
                },
              ],
            }
          : ex
      )
    );
  };

  const saveNotes = (notes: string) => {
    setExercises((prev) =>
      prev.map((ex, idx) =>
        idx === currentExerciseIndex ? { ...ex, notes } : ex
      )
    );
    setShowNotesModal(false);
  };

  return (
    <View className="flex-1 bg-zinc-950">
      {/* Header */}
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center justify-between mb-3">
          <TouchableOpacity
            onPress={() => {
              Alert.alert(
                'Â¿Salir del entrenamiento?',
                'PerderÃ¡s todo el progreso no guardado',
                [
                  { text: 'Cancelar', style: 'cancel' },
                  {
                    text: 'Salir',
                    style: 'destructive',
                    onPress: () => router.back(),
                  },
                ]
              );
            }}
          >
            <Ionicons name="close" size={28} color="white" />
          </TouchableOpacity>

          <View className="items-center">
            <Text className="text-white text-lg font-bold">Push Day</Text>
            <Text className="text-zinc-400 text-sm">{formatTime(elapsedTime)}</Text>
          </View>

          <TouchableOpacity onPress={finishWorkout}>
            <Ionicons name="checkmark-circle" size={28} color="#9D12DE" />
          </TouchableOpacity>
        </View>

        {/* Progress */}
        <View className="mb-2">
          <View className="flex-row justify-between mb-1">
            <Text className="text-zinc-400 text-sm">
              {totalSetsCompleted} de {totalSets} series
            </Text>
            <Text className="text-zinc-400 text-sm">
              {Math.round(progressPercentage)}%
            </Text>
          </View>
          <View className="h-2 bg-zinc-800 rounded-full overflow-hidden">
            <View
              className="h-full bg-primary"
              style={{ width: `${progressPercentage}%` }}
            />
          </View>
        </View>
      </View>

      {/* Exercise Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="border-b border-zinc-800"
        contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 12 }}
      >
        {exercises.map((exercise, index) => {
          const completedSets = exercise.sets.filter((s) => s.completed).length;
          const isActive = index === currentExerciseIndex;

          return (
            <TouchableOpacity
              key={exercise.id}
              onPress={() => setCurrentExerciseIndex(index)}
              className={`mr-3 px-4 py-3 rounded-xl ${
                isActive
                  ? 'bg-primary/20 border-2 border-primary'
                  : 'bg-zinc-900'
              }`}
            >
              <Text
                className={`font-bold ${
                  isActive ? 'text-primary' : 'text-white'
                }`}
              >
                {exercise.name}
              </Text>
              <Text className="text-zinc-400 text-xs mt-1">
                {completedSets}/{exercise.sets.length} series
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <ScrollView className="flex-1" contentContainerStyle={{ padding: 24 }}>
        {/* Exercise Info */}
        <View className="bg-zinc-900 rounded-xl p-4 mb-4 border border-zinc-800">
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-white text-xl font-bold">
              {currentExercise.name}
            </Text>
            <TouchableOpacity onPress={() => setShowNotesModal(true)}>
              <Ionicons name="create-outline" size={24} color="#9D12DE" />
            </TouchableOpacity>
          </View>

          <View className="flex-row items-center mb-2">
            <Ionicons name="barbell-outline" size={16} color="#71717A" />
            <Text className="text-zinc-400 text-sm ml-2">
              {currentExercise.targetSets} series Ã— {currentExercise.targetReps} reps
            </Text>
          </View>

          {currentExercise.notes && (
            <View className="mt-2 pt-2 border-t border-zinc-800">
              <Text className="text-zinc-500 text-sm italic">
                {currentExercise.notes}
              </Text>
            </View>
          )}
        </View>

        {/* Sets */}
        <Text className="text-white font-bold text-lg mb-3">Series</Text>

        {currentExercise.sets.map((set, index) => (
          <View
            key={set.id}
            className={`bg-zinc-900 rounded-xl p-4 mb-3 border ${
              set.completed ? 'border-primary' : 'border-zinc-800'
            }`}
          >
            <View className="flex-row items-center justify-between mb-3">
              <Text
                className={`font-bold ${
                  set.completed ? 'text-primary' : 'text-white'
                }`}
              >
                Serie {index + 1}
              </Text>
              <TouchableOpacity
                onPress={() =>
                  toggleSetCompleted(currentExercise.id, set.id)
                }
                className={`w-8 h-8 rounded-full items-center justify-center ${
                  set.completed ? 'bg-primary' : 'bg-zinc-800'
                }`}
              >
                {set.completed && (
                  <Ionicons name="checkmark" size={20} color="white" />
                )}
              </TouchableOpacity>
            </View>

            <View className="flex-row gap-3">
              <View className="flex-1">
                <Text className="text-zinc-400 text-xs mb-1">
                  Repeticiones
                </Text>
                <TextInput
                  value={set.reps}
                  onChangeText={(value) =>
                    updateSet(currentExercise.id, set.id, 'reps', value)
                  }
                  placeholder={currentExercise.targetReps}
                  placeholderTextColor="#52525B"
                  keyboardType="numeric"
                  className="bg-zinc-800 rounded-lg px-4 py-3 text-white"
                  editable={!set.completed}
                />
              </View>

              <View className="flex-1">
                <Text className="text-zinc-400 text-xs mb-1">Peso (kg)</Text>
                <TextInput
                  value={set.weight}
                  onChangeText={(value) =>
                    updateSet(currentExercise.id, set.id, 'weight', value)
                  }
                  placeholder="0"
                  placeholderTextColor="#52525B"
                  keyboardType="decimal-pad"
                  className="bg-zinc-800 rounded-lg px-4 py-3 text-white"
                  editable={!set.completed}
                />
              </View>
            </View>
          </View>
        ))}

        {/* Add Set Button */}
        <TouchableOpacity
          onPress={addSet}
          className="bg-zinc-900 rounded-xl p-4 mb-4 border border-zinc-800 border-dashed flex-row items-center justify-center"
        >
          <Ionicons name="add-circle-outline" size={24} color="#9D12DE" />
          <Text className="text-primary font-bold ml-2">
            Agregar Serie
          </Text>
        </TouchableOpacity>

        {/* Navigation */}
        <View className="flex-row gap-3">
          {currentExerciseIndex > 0 && (
            <TouchableOpacity
              onPress={() => setCurrentExerciseIndex((prev) => prev - 1)}
              className="flex-1 bg-zinc-900 rounded-xl p-4 flex-row items-center justify-center"
            >
              <Ionicons name="arrow-back" size={20} color="white" />
              <Text className="text-white font-bold ml-2">Anterior</Text>
            </TouchableOpacity>
          )}

          {currentExerciseIndex < exercises.length - 1 && (
            <TouchableOpacity
              onPress={() => setCurrentExerciseIndex((prev) => prev + 1)}
              className="flex-1 bg-primary rounded-xl p-4 flex-row items-center justify-center"
            >
              <Text className="text-white font-bold mr-2">Siguiente</Text>
              <Ionicons name="arrow-forward" size={20} color="white" />
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>

      {/* Notes Modal */}
      <Modal
        visible={showNotesModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <View className="flex-1 bg-zinc-950 pt-12 px-6">
          <View className="flex-row items-center justify-between mb-6">
            <Text className="text-white text-xl font-bold">
              Notas del Ejercicio
            </Text>
            <TouchableOpacity onPress={() => setShowNotesModal(false)}>
              <Ionicons name="close" size={28} color="white" />
            </TouchableOpacity>
          </View>

          <TextInput
            value={currentExercise.notes}
            onChangeText={(text) => saveNotes(text)}
            placeholder="Escribe tus notas aquÃ­..."
            placeholderTextColor="#52525B"
            multiline
            textAlignVertical="top"
            className="bg-zinc-900 rounded-xl p-4 text-white flex-1 mb-6 border border-zinc-800"
          />

          <TouchableOpacity
            onPress={() => setShowNotesModal(false)}
            className="bg-primary rounded-xl p-4 items-center"
          >
            <Text className="text-white font-bold text-lg">Guardar</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Rest Timer Banner */}
      {showRestTimer && (
        <View className="absolute bottom-0 left-0 right-0 bg-amber-500 p-4">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <Ionicons name="time" size={24} color="white" />
              <Text className="text-white font-bold text-lg ml-2">
                Descanso: {formatTime(restTime)}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => setShowRestTimer(false)}
              className="bg-white/20 rounded-lg px-4 py-2"
            >
              <Text className="text-white font-bold">Omitir</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

