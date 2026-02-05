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
import { format, startOfWeek, addDays } from 'date-fns';
import { es } from 'date-fns/locale';

interface WorkoutSchedule {
  dayOfWeek: number; // 0-6, 0 = Monday
  workoutType: string;
  time?: string;
  duration?: number; // minutes
  notes?: string;
}

const DAYS_OF_WEEK = ['Lun', 'Mar', 'MiÃ©', 'Jue', 'Vie', 'SÃ¡b', 'Dom'];
const FULL_DAYS = ['Lunes', 'Martes', 'MiÃ©rcoles', 'Jueves', 'Viernes', 'SÃ¡bado', 'Domingo'];

const WORKOUT_TYPES = [
  { id: 'push', label: 'Push', icon: 'arrow-up', color: 'blue' },
  { id: 'pull', label: 'Pull', icon: 'arrow-down', color: 'emerald' },
  { id: 'legs', label: 'Piernas', icon: 'walk', color: 'red' },
  { id: 'upper', label: 'Superior', icon: 'body', color: 'purple' },
  { id: 'lower', label: 'Inferior', icon: 'fitness', color: 'amber' },
  { id: 'fullbody', label: 'Full Body', icon: 'barbell', color: 'cyan' },
  { id: 'cardio', label: 'Cardio', icon: 'bicycle', color: 'orange' },
  { id: 'rest', label: 'Descanso', icon: 'bed', color: 'zinc' },
];

const MOCK_SCHEDULE: WorkoutSchedule[] = [
  { dayOfWeek: 0, workoutType: 'push', time: '18:00', duration: 75, notes: 'Push A - Fuerza' },
  { dayOfWeek: 1, workoutType: 'pull', time: '18:00', duration: 70, notes: 'Pull A - Volumen' },
  { dayOfWeek: 2, workoutType: 'legs', time: '18:00', duration: 80, notes: 'Leg Day A' },
  { dayOfWeek: 3, workoutType: 'rest', notes: 'Descanso activo' },
  { dayOfWeek: 4, workoutType: 'push', time: '18:00', duration: 70, notes: 'Push B - Hipertrofia' },
  { dayOfWeek: 5, workoutType: 'pull', time: '18:00', duration: 70, notes: 'Pull B - Fuerza' },
  { dayOfWeek: 6, workoutType: 'rest', notes: 'Descanso total' },
];

export default function WeeklySchedule() {
  const [schedule, setSchedule] = useState(MOCK_SCHEDULE);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const getWeekDates = () => {
    const today = new Date();
    const start = startOfWeek(today, { weekStartsOn: 1 }); // Monday
    return Array.from({ length: 7 }, (_, i) => addDays(start, i));
  };

  const getWorkoutForDay = (day: number) => {
    return schedule.find((s) => s.dayOfWeek === day);
  };

  const getTypeInfo = (type: string) => {
    return WORKOUT_TYPES.find((t) => t.id === type) || WORKOUT_TYPES[0];
  };

  const updateWorkout = (day: number, type: string) => {
    const existing = schedule.find((s) => s.dayOfWeek === day);
    if (existing) {
      setSchedule(schedule.map((s) => (s.dayOfWeek === day ? { ...s, workoutType: type } : s)));
    } else {
      setSchedule([...schedule, { dayOfWeek: day, workoutType: type }]);
    }
    setSelectedDay(null);
    Alert.alert('Actualizado', `${FULL_DAYS[day]} configurado como ${getTypeInfo(type).label}`);
  };

  const clearDay = (day: number) => {
    setSchedule(schedule.filter((s) => s.dayOfWeek !== day));
    Alert.alert('Eliminado', 'DÃ­a limpiado del calendario');
  };

  const weekDates = getWeekDates();
  const today = new Date().getDay();
  const todayAdjusted = today === 0 ? 6 : today - 1; // Convert Sunday (0) to 6, others -1

  return (
    <View className="flex-1 bg-zinc-950">
      {/* Header */}
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1 ml-3">
            Weekly Schedule
          </Text>
          <TouchableOpacity onPress={() => Alert.alert('Plantillas', 'Cargar plantilla de semana prÃ³ximamente')}>
            <Ionicons name="calendar" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          {/* Week Overview */}
          <View className="bg-zinc-900 rounded-xl p-4 mb-6 border border-zinc-800">
            <Text className="text-white font-bold text-lg mb-3">Esta Semana</Text>
            <View className="flex-row justify-between">
              {DAYS_OF_WEEK.map((day, index) => {
                const workout = getWorkoutForDay(index);
                const typeInfo = workout ? getTypeInfo(workout.workoutType) : null;
                const isToday = index === todayAdjusted;

                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => setSelectedDay(index)}
                    className={`flex-1 items-center mx-0.5 rounded-lg p-2 ${
                      isToday ? 'bg-primary/20 border border-primary' : 'bg-zinc-800'
                    }`}
                  >
                    <Text className={`text-xs mb-2 ${isToday ? 'text-primary font-bold' : 'text-zinc-400'}`}>
                      {day}
                    </Text>
                    {typeInfo ? (
                      <View className={`w-10 h-10 bg-${typeInfo.color}-500 rounded-full items-center justify-center`}>
                        <Ionicons name={typeInfo.icon as any} size={20} color="white" />
                      </View>
                    ) : (
                      <View className="w-10 h-10 bg-zinc-700 rounded-full items-center justify-center">
                        <Ionicons name="add" size={20} color="#71717A" />
                      </View>
                    )}
                    <Text className="text-zinc-400 text-xs mt-1">
                      {format(weekDates[index], 'd')}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Day Selection Modal */}
          {selectedDay !== null && (
            <View className="bg-zinc-900 rounded-xl p-6 mb-6 border border-zinc-800">
              <View className="flex-row items-center justify-between mb-4">
                <Text className="text-white font-bold text-lg">{FULL_DAYS[selectedDay]}</Text>
                <TouchableOpacity onPress={() => setSelectedDay(null)}>
                  <Ionicons name="close" size={24} color="white" />
                </TouchableOpacity>
              </View>

              <Text className="text-zinc-400 text-sm mb-3">Selecciona tipo de entrenamiento:</Text>
              <View className="flex-row flex-wrap gap-2">
                {WORKOUT_TYPES.map((type) => (
                  <TouchableOpacity
                    key={type.id}
                    onPress={() => updateWorkout(selectedDay, type.id)}
                    className={`px-4 py-3 rounded-lg bg-${type.color}-500/10 border border-${type.color}-500/30`}
                  >
                    <View className="flex-row items-center">
                      <Ionicons name={type.icon as any} size={18} color="white" />
                      <Text className="text-white font-bold ml-2">{type.label}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>

              {getWorkoutForDay(selectedDay) && (
                <TouchableOpacity
                  onPress={() => {
                    clearDay(selectedDay);
                    setSelectedDay(null);
                  }}
                  className="bg-red-500/10 rounded-lg p-3 border border-red-500/30 mt-3"
                >
                  <Text className="text-red-400 font-bold text-center">Limpiar DÃ­a</Text>
                </TouchableOpacity>
              )}
            </View>
          )}

          {/* Detailed Schedule */}
          <Text className="text-white font-bold text-lg mb-4">PlanificaciÃ³n Detallada</Text>
          {FULL_DAYS.map((dayName, index) => {
            const workout = getWorkoutForDay(index);
            const typeInfo = workout ? getTypeInfo(workout.workoutType) : null;
            const isToday = index === todayAdjusted;

            return (
              <View key={index} className={`bg-zinc-900 rounded-xl p-4 mb-3 border ${isToday ? 'border-primary' : 'border-zinc-800'}`}>
                <View className="flex-row items-center justify-between mb-2">
                  <View className="flex-row items-center flex-1">
                    <Text className={`text-lg font-bold mr-2 ${isToday ? 'text-primary' : 'text-white'}`}>
                      {dayName}
                    </Text>
                    {isToday && (
                      <View className="bg-primary rounded px-2 py-0.5">
                        <Text className="text-white text-xs font-bold">HOY</Text>
                      </View>
                    )}
                  </View>
                  <TouchableOpacity onPress={() => setSelectedDay(index)}>
                    <Ionicons name="create" size={20} color="#71717A" />
                  </TouchableOpacity>
                </View>

                {workout ? (
                  <View>
                    <View className="flex-row items-center mb-2">
                      <View className={`w-10 h-10 bg-${typeInfo!.color}-500 rounded-lg items-center justify-center mr-3`}>
                        <Ionicons name={typeInfo!.icon as any} size={20} color="white" />
                      </View>
                      <View className="flex-1">
                        <Text className="text-white font-bold text-lg">{typeInfo!.label}</Text>
                        {workout.time && (
                          <Text className="text-zinc-400 text-sm">â° {workout.time}</Text>
                        )}
                      </View>
                      {workout.duration && (
                        <View className="bg-primary/10 rounded px-2 py-1 border border-primary/30">
                          <Text className="text-primary/80 text-xs font-bold">
                            {workout.duration} min
                          </Text>
                        </View>
                      )}
                    </View>
                    {workout.notes && (
                      <View className="bg-zinc-800 rounded-lg p-2">
                        <Text className="text-zinc-300 text-sm">{workout.notes}</Text>
                      </View>
                    )}
                  </View>
                ) : (
                  <View className="items-center py-4">
                    <Ionicons name="calendar-outline" size={32} color="#3F3F46" />
                    <Text className="text-zinc-500 text-sm mt-2">Sin planificar</Text>
                  </View>
                )}
              </View>
            );
          })}

          {/* Stats */}
          <View className="bg-zinc-900 rounded-xl p-4 mb-6 border border-zinc-800">
            <Text className="text-white font-bold text-lg mb-3">Resumen Semanal</Text>
            <View className="flex-row flex-wrap gap-3">
              <View className="flex-1 min-w-[45%] bg-primary/10 rounded-lg p-3 border border-primary/30">
                <Text className="text-primary text-xs mb-1">DÃ­as de Entrenamiento</Text>
                <Text className="text-white text-2xl font-bold">
                  {schedule.filter((s) => s.workoutType !== 'rest').length}
                </Text>
              </View>
              <View className="flex-1 min-w-[45%] bg-primary/10 rounded-lg p-3 border border-primary/30">
                <Text className="text-primary/80 text-xs mb-1">Volumen Estimado</Text>
                <Text className="text-white text-2xl font-bold">
                  {schedule.reduce((sum, s) => sum + (s.duration || 0), 0)} min
                </Text>
              </View>
              <View className="flex-1 min-w-[45%] bg-amber-500/10 rounded-lg p-3 border border-amber-500/30">
                <Text className="text-amber-400 text-xs mb-1">DÃ­as de Descanso</Text>
                <Text className="text-white text-2xl font-bold">
                  {schedule.filter((s) => s.workoutType === 'rest').length + (7 - schedule.length)}
                </Text>
              </View>
              <View className="flex-1 min-w-[45%] bg-purple-500/10 rounded-lg p-3 border border-purple-500/30">
                <Text className="text-purple-400 text-xs mb-1">Frecuencia</Text>
                <Text className="text-white text-2xl font-bold">
                  {schedule.filter((s) => s.workoutType !== 'rest').length}x/semana
                </Text>
              </View>
            </View>
          </View>

          {/* Tips */}
          <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-6">
            <View className="flex-row items-start">
              <Ionicons name="calendar" size={20} color="#9D12DE" />
              <View className="flex-1 ml-3">
                <Text className="text-primary/80 font-bold mb-2">
                  Tips de PlanificaciÃ³n
                </Text>
                <Text className="text-primary/60 text-sm">
                  â€¢ MÃ­nimo 1 dÃ­a descanso entre grupos{'\n'}
                  â€¢ Push/Pull/Legs es muy efectivo{'\n'}
                  â€¢ Planifica segÃºn tu horario real{'\n'}
                  â€¢ SÃ© consistente con los horarios{'\n'}
                  â€¢ Ajusta segÃºn recuperaciÃ³n
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

