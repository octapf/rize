import React from 'react';
import { Text } from '@/components/ui/Text';
import { View, TouchableOpacity, ScrollView, Share } from 'react-native';;
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface CompletedSet {
  exerciseName: string;
  sets: number;
  reps: number;
  weight: number;
}

const WORKOUT_SUMMARY = {
  workoutName: 'Push Day',
  date: new Date(),
  duration: 3720, // seconds (62 minutes)
  totalSets: 15,
  completedSets: 14,
  totalVolume: 2450, // kg
  exercises: [
    {
      exerciseName: 'Pull-ups',
      sets: 4,
      reps: 10,
      weight: 20,
    },
    {
      exerciseName: 'Dips',
      sets: 4,
      reps: 12,
      weight: 15,
    },
    {
      exerciseName: 'Push-ups',
      sets: 3,
      reps: 20,
      weight: 0,
    },
    {
      exerciseName: 'Rows',
      sets: 3,
      reps: 15,
      weight: 25,
    },
  ] as CompletedSet[],
  achievements: [
    { icon: 'trophy', text: 'Nuevo récord personal', color: '#FFEA00' },
    { icon: 'flame', text: 'Racha de 7 días', color: '#9D12DE' },
    { icon: 'star', text: '+50 XP ganados', color: '#9D12DE' },
  ],
  personalRecords: [
    { exercise: 'Pull-ups', type: 'Peso', value: '20kg', improvement: '+2.5kg' },
    { exercise: 'Dips', type: 'Volumen', value: '720kg', improvement: '+80kg' },
  ],
};

export default function WorkoutSummary() {
  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m ${secs}s`;
  };

  const completionRate = (
    (WORKOUT_SUMMARY.completedSets / WORKOUT_SUMMARY.totalSets) *
    100
  ).toFixed(0);

  const shareWorkout = async () => {
    try {
      const message = `💪 ${WORKOUT_SUMMARY.workoutName}\n\n` +
        `⏱️ Duración: ${formatDuration(WORKOUT_SUMMARY.duration)}\n` +
        `? Series: ${WORKOUT_SUMMARY.completedSets}/${WORKOUT_SUMMARY.totalSets}\n` +
        `📊 Volumen: ${(WORKOUT_SUMMARY.totalVolume / 1000).toFixed(1)}T\n\n` +
        `Ejercicios:\n${WORKOUT_SUMMARY.exercises
          .map((ex) => `• ${ex.exerciseName}: ${ex.sets}x${ex.reps}${ex.weight > 0 ? ` @ ${ex.weight}kg` : ''}`)
          .join('\n')}\n\n` +
        `#Rize #Calistenia`;

      await Share.share({
        message,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <View className="flex-1 bg-zinc-950">
      {/* Header with Animation Space */}
      <View className="pt-12 pb-6 px-6 items-center border-b border-zinc-800">
        <View className="w-24 h-24 bg-[#9D12DE]/20 rounded-full items-center justify-center mb-4">
          <Ionicons name="checkmark-circle" size={64} color="#9D12DE" />
        </View>
        <Text className="text-white text-3xl font-bold mb-2">
          ¡Excelente Trabajo!
        </Text>
        <Text className="text-zinc-400 text-center">
          Has completado tu entrenamiento de {WORKOUT_SUMMARY.workoutName}
        </Text>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Main Stats */}
        <View className="px-6 py-4">
          <View className="bg-[#9D12DE] rounded-2xl p-6 mb-4">
            <View className="flex-row justify-between mb-6">
              <View>
                <Text className="text-purple-100 text-sm mb-1">Duración</Text>
                <Text className="text-white text-3xl font-bold">
                  {formatDuration(WORKOUT_SUMMARY.duration)}
                </Text>
              </View>
              <View>
                <Text className="text-purple-100 text-sm mb-1 text-right">
                  Completado
                </Text>
                <Text className="text-white text-3xl font-bold text-right">
                  {completionRate}%
                </Text>
              </View>
            </View>

            <View className="flex-row justify-between">
              <View className="flex-1 items-center bg-white/10 rounded-xl p-3 mr-2">
                <Text className="text-white text-2xl font-bold">
                  {WORKOUT_SUMMARY.completedSets}
                </Text>
                <Text className="text-purple-100 text-xs">Series</Text>
              </View>
              <View className="flex-1 items-center bg-white/10 rounded-xl p-3 ml-2">
                <Text className="text-white text-2xl font-bold">
                  {(WORKOUT_SUMMARY.totalVolume / 1000).toFixed(1)}T
                </Text>
                <Text className="text-purple-100 text-xs">Volumen</Text>
              </View>
            </View>
          </View>

          {/* Achievements */}
          {WORKOUT_SUMMARY.achievements.length > 0 && (
            <View className="mb-4">
              <Text className="text-white font-bold text-lg mb-3">Logros</Text>
              {WORKOUT_SUMMARY.achievements.map((achievement, index) => (
                <View
                  key={index}
                  className="bg-zinc-900 rounded-xl p-4 mb-2 flex-row items-center border border-zinc-800"
                >
                  <View
                    className="w-10 h-10 rounded-full items-center justify-center mr-3"
                    style={{ backgroundColor: achievement.color + '20' }}
                  >
                    <Ionicons
                      name={achievement.icon as any}
                      size={24}
                      color={achievement.color}
                    />
                  </View>
                  <Text className="text-white font-semibold flex-1">
                    {achievement.text}
                  </Text>
                </View>
              ))}
            </View>
          )}

          {/* Personal Records */}
          {WORKOUT_SUMMARY.personalRecords.length > 0 && (
            <View className="mb-4">
              <Text className="text-white font-bold text-lg mb-3">
                🏆 Nuevos Récords
              </Text>
              {WORKOUT_SUMMARY.personalRecords.map((pr, index) => (
                <View
                  key={index}
                  className="bg-zinc-900 rounded-xl p-4 mb-2 border border-amber-500/30"
                >
                  <View className="flex-row items-center justify-between mb-2">
                    <Text className="text-white font-bold">{pr.exercise}</Text>
                    <View className="bg-amber-500/20 px-3 py-1 rounded-lg">
                      <Text className="text-amber-500 text-xs font-bold">
                        {pr.type}
                      </Text>
                    </View>
                  </View>
                  <View className="flex-row items-end">
                    <Text className="text-primary text-2xl font-bold">
                      {pr.value}
                    </Text>
                    <Text className="text-zinc-400 text-sm ml-2 mb-1">
                      {pr.improvement}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          )}

          {/* Exercises Breakdown */}
          <View className="mb-4">
            <Text className="text-white font-bold text-lg mb-3">
              Ejercicios Completados
            </Text>
            {WORKOUT_SUMMARY.exercises.map((exercise, index) => (
              <View
                key={index}
                className="bg-zinc-900 rounded-xl p-4 mb-2 border border-zinc-800"
              >
                <Text className="text-white font-bold mb-2">
                  {exercise.exerciseName}
                </Text>
                <View className="flex-row items-center">
                  <View className="flex-row items-center mr-4">
                    <Ionicons name="repeat" size={16} color="#71717A" />
                    <Text className="text-zinc-400 text-sm ml-1">
                      {exercise.sets} series
                    </Text>
                  </View>
                  <View className="flex-row items-center mr-4">
                    <Ionicons name="fitness" size={16} color="#71717A" />
                    <Text className="text-zinc-400 text-sm ml-1">
                      {exercise.reps} reps
                    </Text>
                  </View>
                  {exercise.weight > 0 && (
                    <View className="flex-row items-center">
                      <Ionicons name="barbell" size={16} color="#71717A" />
                      <Text className="text-zinc-400 text-sm ml-1">
                        {exercise.weight}kg
                      </Text>
                    </View>
                  )}
                </View>
                <View className="mt-2 pt-2 border-t border-zinc-800">
                  <Text className="text-primary text-sm font-semibold">
                    Volumen: {(exercise.sets * exercise.reps * exercise.weight).toLocaleString()}kg
                  </Text>
                </View>
              </View>
            ))}
          </View>

          {/* Workout Notes Section */}
          <View className="mb-4">
            <Text className="text-white font-bold text-lg mb-3">
              Resumen del Entrenamiento
            </Text>
            <View className="bg-zinc-900 rounded-xl p-4 border border-zinc-800">
              <View className="flex-row items-center mb-2">
                <Ionicons name="calendar" size={16} color="#71717A" />
                <Text className="text-zinc-400 text-sm ml-2">
                  {WORKOUT_SUMMARY.date.toLocaleDateString('es-ES', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </Text>
              </View>
              <View className="flex-row items-center">
                <Ionicons name="time" size={16} color="#71717A" />
                <Text className="text-zinc-400 text-sm ml-2">
                  {WORKOUT_SUMMARY.date.toLocaleTimeString('es-ES', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View className="h-32" />
      </ScrollView>

      {/* Bottom Actions */}
      <View className="absolute bottom-0 left-0 right-0 px-6 pb-6 pt-4 bg-zinc-950 border-t border-zinc-800">
        <View className="flex-row gap-3 mb-3">
          <TouchableOpacity
            onPress={shareWorkout}
            className="flex-1 bg-zinc-900 rounded-xl p-4 flex-row items-center justify-center border border-zinc-800"
          >
            <Ionicons name="share-social" size={20} color="white" />
            <Text className="text-white font-bold ml-2">Compartir</Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex-1 bg-zinc-900 rounded-xl p-4 flex-row items-center justify-center border border-zinc-800">
            <Ionicons name="camera" size={20} color="white" />
            <Text className="text-white font-bold ml-2">Foto</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => router.replace('/(tabs)')}
          className="bg-[#9D12DE] rounded-xl p-4 items-center"
        >
          <Text className="text-white font-bold text-lg">Finalizar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

