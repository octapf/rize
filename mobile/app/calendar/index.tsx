import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Card } from '@/components/ui/Card';
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  format,
  isSameDay,
  isToday,
  isBefore,
  startOfWeek,
  endOfWeek,
} from 'date-fns';
import { es } from 'date-fns/locale';

interface WorkoutDay {
  date: Date;
  completed: boolean;
  workoutCount: number;
}

// Mock workout data
const mockWorkoutDays: WorkoutDay[] = [
  { date: new Date(2026, 0, 5), completed: true, workoutCount: 1 },
  { date: new Date(2026, 0, 7), completed: true, workoutCount: 2 },
  { date: new Date(2026, 0, 10), completed: true, workoutCount: 1 },
  { date: new Date(2026, 0, 12), completed: true, workoutCount: 1 },
  { date: new Date(2026, 0, 15), completed: true, workoutCount: 1 },
  { date: new Date(2026, 0, 17), completed: true, workoutCount: 1 },
  { date: new Date(2026, 0, 20), completed: true, workoutCount: 3 },
  { date: new Date(2026, 0, 22), completed: true, workoutCount: 1 },
  { date: new Date(2026, 0, 24), completed: true, workoutCount: 2 },
];

export default function CalendarScreen() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1 });
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });

  const calendarDays = eachDayOfInterval({
    start: calendarStart,
    end: calendarEnd,
  });

  const getWorkoutForDay = (date: Date) => {
    return mockWorkoutDays.find(w => isSameDay(w.date, date));
  };

  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const renderDayCell = (date: Date) => {
    const workout = getWorkoutForDay(date);
    const isCurrentMonth = date.getMonth() === currentMonth.getMonth();
    const isSelected = selectedDate && isSameDay(date, selectedDate);
    const isPast = isBefore(date, new Date()) && !isToday(date);

    return (
      <TouchableOpacity
        key={date.toString()}
        onPress={() => setSelectedDate(date)}
        className={`aspect-square items-center justify-center ${
          isSelected ? 'bg-primary rounded-lg' : ''
        }`}
      >
        <Text
          className={`text-sm font-semibold ${
            isSelected
              ? 'text-white'
              : !isCurrentMonth
              ? 'text-gray-300'
              : isToday(date)
              ? 'text-primary'
              : 'text-gray-900'
          }`}
        >
          {format(date, 'd')}
        </Text>

        {workout && (
          <View className="flex-row gap-0.5 mt-1">
            {[...Array(Math.min(workout.workoutCount, 3))].map((_, i) => (
              <View
                key={i}
                className={`w-1.5 h-1.5 rounded-full ${
                  isSelected ? 'bg-white' : 'bg-primary'
                }`}
              />
            ))}
          </View>
        )}
      </TouchableOpacity>
    );
  };

  const workoutsThisMonth = mockWorkoutDays.filter(
    w => w.date.getMonth() === currentMonth.getMonth()
  ).length;

  const selectedDayWorkout = selectedDate ? getWorkoutForDay(selectedDate) : null;

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <LinearGradient colors={['#9D12DE', '#7C3AED']} className="px-6 pt-12 pb-6">
        <View className="flex-row items-center justify-between mb-4">
          <TouchableOpacity onPress={() => router.back()} className="p-2">
            <Ionicons name="arrow-back" size={28} color="white" />
          </TouchableOpacity>
          <Text className="text-2xl font-bold text-white">Calendario</Text>
          <View className="w-10" />
        </View>

        {/* Month Navigation */}
        <View className="flex-row items-center justify-between bg-white/20 rounded-xl p-3">
          <TouchableOpacity onPress={previousMonth} className="p-2">
            <Ionicons name="chevron-back" size={24} color="white" />
          </TouchableOpacity>

          <Text className="text-white text-lg font-bold capitalize">
            {format(currentMonth, 'MMMM yyyy', { locale: es })}
          </Text>

          <TouchableOpacity onPress={nextMonth} className="p-2">
            <Ionicons name="chevron-forward" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Monthly Stats */}
        <View className="flex-row gap-3 mt-3">
          <Card className="flex-1 p-3 bg-white/20 border-0">
            <Text className="text-white/80 text-xs mb-1">Este mes</Text>
            <Text className="text-white text-2xl font-bold">
              {workoutsThisMonth}
            </Text>
            <Text className="text-white/80 text-xs">entrenamientos</Text>
          </Card>
          <Card className="flex-1 p-3 bg-white/20 border-0">
            <Text className="text-white/80 text-xs mb-1">Promedio</Text>
            <Text className="text-white text-2xl font-bold">
              {Math.round(workoutsThisMonth / (new Date().getDate() || 1))}
            </Text>
            <Text className="text-white/80 text-xs">por semana</Text>
          </Card>
        </View>
      </LinearGradient>

      <ScrollView className="flex-1" contentContainerClassName="p-6 gap-6">
        {/* Calendar */}
        <Card className="p-4">
          {/* Week Days Header */}
          <View className="flex-row mb-3">
            {['L', 'M', 'X', 'J', 'V', 'S', 'D'].map((day, i) => (
              <View key={i} className="flex-1 items-center">
                <Text className="text-gray-600 font-semibold text-xs">
                  {day}
                </Text>
              </View>
            ))}
          </View>

          {/* Calendar Grid */}
          <View className="gap-1">
            {Array.from({ length: Math.ceil(calendarDays.length / 7) }).map((_, weekIndex) => (
              <View key={weekIndex} className="flex-row">
                {calendarDays.slice(weekIndex * 7, (weekIndex + 1) * 7).map(renderDayCell)}
              </View>
            ))}
          </View>

          {/* Legend */}
          <View className="flex-row items-center justify-center gap-4 mt-4 pt-4 border-t border-gray-200">
            <View className="flex-row items-center gap-2">
              <View className="w-3 h-3 rounded-full bg-primary" />
              <Text className="text-gray-600 text-xs">Con entrenamiento</Text>
            </View>
            <View className="flex-row items-center gap-2">
              <View className="w-3 h-3 rounded-full bg-primary" />
              <Text className="text-gray-600 text-xs">Seleccionado</Text>
            </View>
          </View>
        </Card>

        {/* Selected Day Details */}
        {selectedDate && (
          <Card className="p-4">
            <Text className="text-gray-900 font-bold text-lg mb-3">
              {format(selectedDate, "EEEE, dd 'de' MMMM", { locale: es })}
            </Text>

            {selectedDayWorkout ? (
              <View>
                <View className="flex-row items-center gap-2 mb-3">
                  <View className="bg-primary w-10 h-10 rounded-full items-center justify-center">
                    <Ionicons name="checkmark" size={24} color="white" />
                  </View>
                  <View>
                    <Text className="text-primary font-bold">
                      Día completado
                    </Text>
                    <Text className="text-primary text-sm">
                      {selectedDayWorkout.workoutCount}{' '}
                      {selectedDayWorkout.workoutCount === 1
                        ? 'entrenamiento'
                        : 'entrenamientos'}
                    </Text>
                  </View>
                </View>

                <TouchableOpacity
                  onPress={() => router.push('/workouts/history')}
                  className="bg-primary/10 border border-primary/20 rounded-lg py-3"
                >
                  <Text className="text-primary font-semibold text-center">
                    Ver Entrenamientos
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View>
                <View className="flex-row items-center gap-2 mb-3">
                  <View className="bg-gray-200 w-10 h-10 rounded-full items-center justify-center">
                    <Ionicons name="close" size={24} color="#6B7280" />
                  </View>
                  <Text className="text-gray-600">
                    Sin entrenamientos registrados
                  </Text>
                </View>

                {!isBefore(selectedDate, new Date()) && (
                  <TouchableOpacity
                    onPress={() => router.push('/workouts/quick-start')}
                    className="bg-primary rounded-lg py-3"
                  >
                    <Text className="text-white font-semibold text-center">
                      Iniciar Entrenamiento
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            )}
          </Card>
        )}

        {/* Streak Info */}
        <Card className="p-4 bg-amber-50 border-amber-200">
          <View className="flex-row items-center gap-3">
            <View className="bg-amber-500 w-12 h-12 rounded-xl items-center justify-center">
              <Ionicons name="flame" size={28} color="white" />
            </View>
            <View className="flex-1">
              <Text className="text-amber-900 font-bold text-lg">
                Racha Actual: 7 días
              </Text>
              <Text className="text-amber-700 text-sm">
                ¡Sigue así! No pierdas tu racha
              </Text>
            </View>
          </View>
        </Card>
      </ScrollView>
    </View>
  );
}


