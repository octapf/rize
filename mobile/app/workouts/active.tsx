import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useWorkout } from '@/hooks/useWorkouts';
import { workoutsApi } from '@/services/api/workouts.api';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import RestTimer from '@/components/RestTimer';
import PlateCalculator from '@/components/PlateCalculator';
import { settingsService } from '@/services/settings.service';
import type { Workout } from '@/services/api/workouts.api';

export default function ActiveWorkoutScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data, isLoading, refetch } = useWorkout(id);
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  
  // Rest timer state
  const [showRestTimer, setShowRestTimer] = useState(false);
  const [restDuration, setRestDuration] = useState(90); // Default, will be loaded from settings
  
  // Plate calculator state
  const [showPlateCalculator, setShowPlateCalculator] = useState(false);

  // Load settings on mount
  useEffect(() => {
    const loadSettings = async () => {
      const defaultDuration = await settingsService.getSetting('restTimerDefault');
      setRestDuration(defaultDuration);
    };
    loadSettings();
  }, []);

  useEffect(() => {
    if (data?.data) {
      setWorkout(data.data);
      if (data.data.status === 'in-progress' && data.data.startedAt) {
        const elapsed = Math.floor(
          (Date.now() - new Date(data.data.startedAt).getTime()) / 1000
        );
        setTimer(elapsed);
        setIsRunning(true);
      }
    }
  }, [data]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setTimer((t) => t + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const handleStart = async () => {
    try {
      const response = await workoutsApi.startWorkout(id);
      setWorkout(response.data);
      setIsRunning(true);
      setTimer(0);
    } catch (error) {
      Alert.alert('Error', 'No se pudo iniciar el entrenamiento');
    }
  };

  const handleToggleSet = async (exerciseIndex: number, setIndex: number) => {
    if (!workout) return;

    const currentCompleted = workout.exercises[exerciseIndex].sets[setIndex].completed;

    try {
      const response = await workoutsApi.completeSet(
        id,
        exerciseIndex,
        setIndex,
        !currentCompleted
      );
      setWorkout(response.data);
      
      // Si se completÃ³ la serie, verificar auto-start rest timer
      if (!currentCompleted) {
        const autoStart = await settingsService.getSetting('autoStartRestTimer');
        if (autoStart) {
          setShowRestTimer(true);
        }
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo actualizar');
    }
  };

  const handleFinish = () => {
    Alert.alert(
      'Finalizar Entrenamiento',
      'Â¿Seguro que quieres finalizar?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Finalizar',
          style: 'destructive',
          onPress: async () => {
            try {
              await workoutsApi.finishWorkout(id, timer);
              Alert.alert('Â¡Ã‰xito!', 'Entrenamiento completado', [
                { text: 'OK', onPress: () => router.back() },
              ]);
            } catch (error) {
              Alert.alert('Error', 'No se pudo finalizar');
            }
          },
        },
      ]
    );
  };

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const calculateProgress = () => {
    if (!workout) return 0;
    const totalSets = workout.exercises.reduce(
      (sum, ex) => sum + ex.sets.length,
      0
    );
    const completedSets = workout.exercises.reduce(
      (sum, ex) => sum + ex.sets.filter((s) => s.completed).length,
      0
    );
    return totalSets > 0 ? (completedSets / totalSets) * 100 : 0;
  };

  if (isLoading) {
    return (
      <View className="flex-1 bg-gray-50 items-center justify-center">
        <ActivityIndicator size="large" color="#9D12DE" />
      </View>
    );
  }

  if (!workout) {
    return (
      <View className="flex-1 bg-gray-50 items-center justify-center">
        <Text className="text-gray-500">Entrenamiento no encontrado</Text>
      </View>
    );
  }

  const progress = calculateProgress();
  const totalSets = workout.exercises.reduce(
    (sum, ex) => sum + ex.sets.length,
    0
  );
  const completedSets = workout.exercises.reduce(
    (sum, ex) => sum + ex.sets.filter((s) => s.completed).length,
    0
  );

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <LinearGradient colors={['#9D12DE', '#7C3AED']} className="px-6 pt-12 pb-6">
        <View className="flex-row items-center justify-between mb-4">
          <TouchableOpacity onPress={() => router.back()} className="p-2">
            <Ionicons name="arrow-back" size={28} color="white" />
          </TouchableOpacity>
          <Text className="text-2xl font-bold text-white">{workout.name}</Text>
          <TouchableOpacity 
            onPress={() => setShowPlateCalculator(true)} 
            className="p-2 bg-white/20 rounded-full"
          >
            <Ionicons name="calculator-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Timer */}
        <View className="items-center py-4">
          <Text className="text-white text-6xl font-bold mb-2">
            {formatTime(timer)}
          </Text>
          {workout.status === 'planned' ? (
            <Button
              variant="secondary"
              onPress={handleStart}
              className="mt-4"
            >
              Iniciar Entrenamiento
            </Button>
          ) : (
            <Text className="text-primary/50 text-sm">En progreso...</Text>
          )}
        </View>

        {/* Progress Bar */}
        <View className="mt-4">
          <View className="flex-row justify-between mb-2">
            <Text className="text-white text-sm font-semibold">
              Progreso: {completedSets}/{totalSets} series
            </Text>
            <Text className="text-white text-sm font-semibold">
              {Math.round(progress)}%
            </Text>
          </View>
          <View className="h-3 bg-white/20 rounded-full overflow-hidden">
            <View
              className="h-full bg-white rounded-full"
              style={{ width: `${progress}%` }}
            />
          </View>
        </View>
      </LinearGradient>

      {/* Exercises List */}
      <ScrollView className="flex-1" contentContainerClassName="p-6 gap-4">
        {workout.exercises.map((exercise, exerciseIndex) => {
          const exerciseData =
            typeof exercise.exerciseId === 'string'
              ? null
              : exercise.exerciseId;

          if (!exerciseData) return null;

          const exerciseSets = exercise.sets.length;
          const exerciseCompleted = exercise.sets.filter((s) => s.completed)
            .length;

          return (
            <Card key={exerciseIndex} className="p-4">
              <View className="flex-row items-center justify-between mb-3">
                <View className="flex-1">
                  <Text className="text-lg font-bold text-gray-900">
                    {exerciseData.name.es}
                  </Text>
                  <Text className="text-sm text-gray-600">
                    {exerciseCompleted}/{exerciseSets} series completadas
                  </Text>
                </View>
                <View
                  className={`px-3 py-1 rounded-full ${
                    exerciseCompleted === exerciseSets
                      ? 'bg-primary/10'
                      : 'bg-gray-100'
                  }`}
                >
                  <Text
                    className={`text-xs font-semibold ${
                      exerciseCompleted === exerciseSets
                        ? 'text-primary'
                        : 'text-gray-600'
                    }`}
                  >
                    {Math.round((exerciseCompleted / exerciseSets) * 100)}%
                  </Text>
                </View>
              </View>

              {/* Sets */}
              <View className="gap-2">
                {exercise.sets.map((set, setIndex) => (
                  <TouchableOpacity
                    key={setIndex}
                    onPress={() =>
                      workout.status === 'in-progress' &&
                      handleToggleSet(exerciseIndex, setIndex)
                    }
                    disabled={workout.status !== 'in-progress'}
                    className={`flex-row items-center justify-between p-3 rounded-lg border-2 ${
                      set.completed
                        ? 'bg-primary/10 border-primary'
                        : 'bg-white border-gray-200'
                    }`}
                  >
                    <View className="flex-row items-center gap-3">
                      <View
                        className={`w-8 h-8 rounded-full items-center justify-center ${
                          set.completed ? 'bg-primary' : 'bg-gray-200'
                        }`}
                      >
                        {set.completed ? (
                          <Ionicons name="checkmark" size={20} color="white" />
                        ) : (
                          <Text className="text-gray-600 font-bold">
                            {setIndex + 1}
                          </Text>
                        )}
                      </View>
                      <View>
                        <Text className="text-sm font-semibold text-gray-900">
                          Serie {setIndex + 1}
                        </Text>
                        <Text className="text-xs text-gray-600">
                          {set.reps} reps
                          {set.weight && ` â€¢ ${set.weight} kg`}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </Card>
          );
        })}

        {workout.status === 'in-progress' && (
          <Button
            variant="primary"
            onPress={handleFinish}
            className="mt-4"
          >
            Finalizar Entrenamiento
          </Button>
        )}
      </ScrollView>
      
      {/* Rest Timer */}
      <RestTimer
        visible={showRestTimer}
        duration={restDuration}
        onComplete={() => setShowRestTimer(false)}
        onSkip={() => setShowRestTimer(false)}
        onAddTime={(seconds) => setRestDuration(prev => prev + seconds)}
      />
      
      {/* Plate Calculator */}
      <PlateCalculator
        visible={showPlateCalculator}
        onClose={() => setShowPlateCalculator(false)}
      />
    </View>
  );
}


