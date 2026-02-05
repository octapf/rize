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
import { format, startOfWeek, addDays, isToday } from 'date-fns';
import { es } from 'date-fns/locale';

interface Habit {
  id: string;
  name: string;
  icon: string;
  color: string;
  goal: number;
  unit: string;
  currentValue: number;
  streak: number;
  bestStreak: number;
  category: 'fitness' | 'nutrition' | 'wellness';
}

interface DayProgress {
  date: Date;
  completed: string[]; // habit IDs
}

const HABITS: Habit[] = [
  {
    id: '1',
    name: 'Agua',
    icon: 'ðŸ’§',
    color: 'blue',
    goal: 3000,
    unit: 'ml',
    currentValue: 2100,
    streak: 7,
    bestStreak: 12,
    category: 'wellness',
  },
  {
    id: '2',
    name: 'Entrenamiento',
    icon: 'ðŸ‹ï¸',
    color: 'emerald',
    goal: 1,
    unit: 'sesiÃ³n',
    currentValue: 1,
    streak: 4,
    bestStreak: 15,
    category: 'fitness',
  },
  {
    id: '3',
    name: 'ProteÃ­na',
    icon: 'ðŸ¥©',
    color: 'red',
    goal: 150,
    unit: 'g',
    currentValue: 120,
    streak: 5,
    bestStreak: 10,
    category: 'nutrition',
  },
  {
    id: '4',
    name: 'Pasos',
    icon: 'ðŸ‘Ÿ',
    color: 'amber',
    goal: 10000,
    unit: 'pasos',
    currentValue: 7842,
    streak: 3,
    bestStreak: 8,
    category: 'fitness',
  },
  {
    id: '5',
    name: 'SueÃ±o',
    icon: 'ðŸ˜´',
    color: 'purple',
    goal: 8,
    unit: 'horas',
    currentValue: 7.5,
    streak: 6,
    bestStreak: 14,
    category: 'wellness',
  },
  {
    id: '6',
    name: 'Comidas',
    icon: 'ðŸ½ï¸',
    color: 'orange',
    goal: 4,
    unit: 'comidas',
    currentValue: 3,
    streak: 8,
    bestStreak: 20,
    category: 'nutrition',
  },
  {
    id: '7',
    name: 'MeditaciÃ³n',
    icon: 'ðŸ§˜',
    color: 'indigo',
    goal: 10,
    unit: 'min',
    currentValue: 0,
    streak: 0,
    bestStreak: 5,
    category: 'wellness',
  },
  {
    id: '8',
    name: 'Stretching',
    icon: 'ðŸ¤¸',
    color: 'pink',
    goal: 15,
    unit: 'min',
    currentValue: 15,
    streak: 2,
    bestStreak: 7,
    category: 'fitness',
  },
];

export default function HabitTracker() {
  const [habits, setHabits] = useState(HABITS);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'fitness' | 'nutrition' | 'wellness'>('all');

  const categories = [
    { id: 'all', label: 'Todos', icon: 'apps' },
    { id: 'fitness', label: 'Fitness', icon: 'barbell' },
    { id: 'nutrition', label: 'NutriciÃ³n', icon: 'restaurant' },
    { id: 'wellness', label: 'Bienestar', icon: 'heart' },
  ];

  const filteredHabits = selectedCategory === 'all'
    ? habits
    : habits.filter((h) => h.category === selectedCategory);

  const getWeekDays = () => {
    const start = startOfWeek(new Date(), { weekStartsOn: 1 });
    return Array.from({ length: 7 }, (_, i) => addDays(start, i));
  };

  const incrementHabit = (habitId: string, amount: number) => {
    setHabits((prev) =>
      prev.map((h) =>
        h.id === habitId
          ? { ...h, currentValue: Math.min(h.goal, h.currentValue + amount) }
          : h
      )
    );
  };

  const decrementHabit = (habitId: string, amount: number) => {
    setHabits((prev) =>
      prev.map((h) =>
        h.id === habitId
          ? { ...h, currentValue: Math.max(0, h.currentValue - amount) }
          : h
      )
    );
  };

  const markComplete = (habitId: string) => {
    setHabits((prev) =>
      prev.map((h) => {
        if (h.id === habitId) {
          const isComplete = h.currentValue >= h.goal;
          if (isComplete) {
            return {
              ...h,
              streak: h.streak + 1,
              bestStreak: Math.max(h.bestStreak, h.streak + 1),
            };
          }
        }
        return h;
      })
    );
    Alert.alert('HÃ¡bito Completado! ðŸŽ‰', 'Sigue asÃ­, la consistencia es clave.');
  };

  const getProgress = (habit: Habit) => {
    return Math.min(100, (habit.currentValue / habit.goal) * 100);
  };

  const getTotalCompleted = () => {
    return habits.filter((h) => h.currentValue >= h.goal).length;
  };

  const getStreakEmoji = (streak: number) => {
    if (streak >= 30) return 'ðŸ”¥ðŸ”¥ðŸ”¥';
    if (streak >= 14) return 'ðŸ”¥ðŸ”¥';
    if (streak >= 7) return 'ðŸ”¥';
    return 'ðŸ’ª';
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
            Habit Tracker
          </Text>
          <TouchableOpacity>
            <Ionicons name="add-circle" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Category Filters */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row gap-2">
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat.id}
                onPress={() => setSelectedCategory(cat.id as any)}
                className={`flex-row items-center px-4 py-2 rounded-lg ${
                  selectedCategory === cat.id
                    ? 'bg-primary'
                    : 'bg-zinc-900 border border-zinc-800'
                }`}
              >
                <Ionicons
                  name={cat.icon as any}
                  size={18}
                  color={selectedCategory === cat.id ? 'white' : '#71717A'}
                />
                <Text
                  className={`ml-2 font-semibold text-sm ${
                    selectedCategory === cat.id ? 'text-white' : 'text-zinc-400'
                  }`}
                >
                  {cat.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          {/* Summary Card */}
          <View className="bg-gradient-to-br from-primary to-[#7D0EBE] rounded-xl p-6 mb-6">
            <View className="flex-row items-center justify-between mb-4">
              <View>
                <Text className="text-white text-sm mb-1">Hoy</Text>
                <Text className="text-white text-3xl font-bold">
                  {getTotalCompleted()}/{habits.length}
                </Text>
                <Text className="text-white text-sm">HÃ¡bitos completados</Text>
              </View>
              <View className="items-center">
                <Text className="text-6xl">{getTotalCompleted() === habits.length ? 'ðŸ†' : 'ðŸ’ª'}</Text>
              </View>
            </View>
            <View className="h-2 bg-white/20 rounded-full overflow-hidden">
              <View
                className="h-full bg-white rounded-full"
                style={{ width: `${(getTotalCompleted() / habits.length) * 100}%` }}
              />
            </View>
          </View>

          {/* Week Calendar */}
          <View className="bg-zinc-900 rounded-xl p-4 mb-6 border border-zinc-800">
            <Text className="text-white font-bold mb-3">Esta Semana</Text>
            <View className="flex-row justify-between">
              {getWeekDays().map((day, index) => {
                const today = isToday(day);
                return (
                  <View key={index} className="items-center">
                    <Text className={`text-xs mb-2 ${today ? 'text-primary font-bold' : 'text-zinc-500'}`}>
                      {format(day, 'EEE', { locale: es }).toUpperCase()}
                    </Text>
                    <View className={`w-10 h-10 rounded-full items-center justify-center ${
                      today ? 'bg-primary' : 'bg-zinc-800'
                    }`}>
                      <Text className={`font-bold ${today ? 'text-white' : 'text-zinc-400'}`}>
                        {format(day, 'd')}
                      </Text>
                    </View>
                    {/* Mock completion dots */}
                    <View className="flex-row gap-0.5 mt-1">
                      {[0, 1, 2].map((i) => (
                        <View
                          key={i}
                          className={`w-1 h-1 rounded-full ${
                            index < 5 ? 'bg-primary' : 'bg-zinc-700'
                          }`}
                        />
                      ))}
                    </View>
                  </View>
                );
              })}
            </View>
          </View>

          {/* Habits List */}
          {filteredHabits.map((habit) => {
            const progress = getProgress(habit);
            const isComplete = progress >= 100;

            return (
              <View
                key={habit.id}
                className={`bg-zinc-900 rounded-xl p-4 mb-4 border ${
                  isComplete ? `border-${habit.color}-500` : 'border-zinc-800'
                }`}
              >
                <View className="flex-row items-start justify-between mb-3">
                  <View className="flex-row items-start flex-1">
                    <View className={`w-12 h-12 bg-${habit.color}-500 rounded-xl items-center justify-center mr-3`}>
                      <Text className="text-2xl">{habit.icon}</Text>
                    </View>
                    <View className="flex-1">
                      <Text className="text-white font-bold text-lg mb-1">
                        {habit.name}
                      </Text>
                      <View className="flex-row items-center">
                        <Text className={`text-${habit.color}-400 font-bold text-sm mr-2`}>
                          {habit.currentValue}/{habit.goal} {habit.unit}
                        </Text>
                        {habit.streak > 0 && (
                          <View className="flex-row items-center bg-amber-500/10 rounded px-2 py-0.5 border border-amber-500/30">
                            <Text className="text-amber-400 text-xs font-bold">
                              {habit.streak} dÃ­as {getStreakEmoji(habit.streak)}
                            </Text>
                          </View>
                        )}
                      </View>
                    </View>
                  </View>
                  {isComplete && (
                    <Ionicons name="checkmark-circle" size={28} color="#9D12DE" />
                  )}
                </View>

                {/* Progress Bar */}
                <View className="h-2 bg-zinc-800 rounded-full overflow-hidden mb-3">
                  <View
                    className={`h-full bg-${habit.color}-500 rounded-full`}
                    style={{ width: `${progress}%` }}
                  />
                </View>

                {/* Controls */}
                <View className="flex-row gap-2">
                  <TouchableOpacity
                    onPress={() => decrementHabit(habit.id, habit.id === '1' ? 250 : habit.id === '4' ? 1000 : 1)}
                    className="bg-zinc-800 rounded-lg p-2 items-center justify-center"
                    disabled={habit.currentValue === 0}
                  >
                    <Ionicons name="remove" size={20} color={habit.currentValue === 0 ? '#3f3f46' : 'white'} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => incrementHabit(habit.id, habit.id === '1' ? 250 : habit.id === '4' ? 1000 : 1)}
                    className={`flex-1 bg-${habit.color}-500 rounded-lg p-2 items-center justify-center`}
                    disabled={isComplete}
                  >
                    <Text className="text-white font-bold">
                      +{habit.id === '1' ? '250ml' : habit.id === '4' ? '1000' : `1 ${habit.unit}`}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => markComplete(habit.id)}
                    className={`bg-primary rounded-lg p-2 items-center justify-center ${
                      !isComplete ? 'opacity-50' : ''
                    }`}
                    disabled={!isComplete}
                  >
                    <Ionicons name="checkmark" size={20} color="white" />
                  </TouchableOpacity>
                </View>

                {/* Best Streak */}
                {habit.bestStreak > habit.streak && (
                  <View className="mt-2 flex-row items-center">
                    <Ionicons name="trophy" size={14} color="#71717A" />
                    <Text className="text-zinc-500 text-xs ml-1">
                      Mejor racha: {habit.bestStreak} dÃ­as
                    </Text>
                  </View>
                )}
              </View>
            );
          })}

          {/* Tips */}
          <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-6">
            <View className="flex-row items-start">
              <Ionicons name="bulb" size={20} color="#9D12DE" />
              <View className="flex-1 ml-3">
                <Text className="text-primary/80 font-bold mb-2">
                  Consejos para HÃ¡bitos
                </Text>
                <Text className="text-primary/60 text-sm">
                  â€¢ Empieza con 2-3 hÃ¡bitos clave{'\n'}
                  â€¢ Consistencia &gt; PerfecciÃ³n{'\n'}
                  â€¢ Celebra rachas pequeÃ±as{'\n'}
                  â€¢ Si fallas 1 dÃ­a, retoma inmediatamente
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

