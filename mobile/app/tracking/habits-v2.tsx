import React, { useState } from 'react';
import { Text } from '@/components/ui/Text';
import { View, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';;
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface Habit {
  id: string;
  name: string;
  icon: string;
  color: string;
  targetDays: number;
  frequency: 'daily' | 'weekly';
  category: 'fitness' | 'nutrition' | 'recovery' | 'mindset';
  completedDates: Date[];
  currentStreak: number;
  longestStreak: number;
}

const HABIT_TEMPLATES = [
  { name: '8h de Sueño', icon: 'moon', color: 'blue', category: 'recovery' },
  { name: '3L de Agua', icon: 'water', color: 'cyan', category: 'nutrition' },
  { name: 'Proteína en Cada Comida', icon: 'restaurant', color: 'primary', category: 'nutrition' },
  { name: 'Entrenamiento', icon: 'barbell', color: 'red', category: 'fitness' },
  { name: '10k Pasos', icon: 'walk', color: 'purple', category: 'fitness' },
  { name: 'Movilidad 15min', icon: 'body', color: 'amber', category: 'recovery' },
  { name: 'Sin Alcohol', icon: 'close-circle', color: 'red', category: 'mindset' },
  { name: 'Journaling', icon: 'book', color: 'indigo', category: 'mindset' },
];

const MOCK_HABITS: Habit[] = [
  {
    id: '1',
    name: '8h de Sueño',
    icon: 'moon',
    color: 'blue',
    targetDays: 7,
    frequency: 'daily',
    category: 'recovery',
    completedDates: [
      new Date(2026, 0, 27),
      new Date(2026, 0, 26),
      new Date(2026, 0, 25),
      new Date(2026, 0, 24),
      new Date(2026, 0, 23),
    ],
    currentStreak: 5,
    longestStreak: 12,
  },
  {
    id: '2',
    name: 'Entrenamiento',
    icon: 'barbell',
    color: 'red',
    targetDays: 5,
    frequency: 'weekly',
    category: 'fitness',
    completedDates: [
      new Date(2026, 0, 27),
      new Date(2026, 0, 25),
      new Date(2026, 0, 23),
      new Date(2026, 0, 21),
    ],
    currentStreak: 4,
    longestStreak: 8,
  },
  {
    id: '3',
    name: '3L de Agua',
    icon: 'water',
    color: 'cyan',
    targetDays: 7,
    frequency: 'daily',
    category: 'nutrition',
    completedDates: [
      new Date(2026, 0, 27),
      new Date(2026, 0, 26),
    ],
    currentStreak: 2,
    longestStreak: 5,
  },
];

export default function HabitTracker() {
  const [habits, setHabits] = useState<Habit[]>(MOCK_HABITS);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { key: 'all', label: 'Todos', icon: 'apps', color: 'white' },
    { key: 'fitness', label: 'Fitness', icon: 'barbell', color: '#EF4444' },
    { key: 'nutrition', label: 'Nutrición', icon: 'nutrition', color: '#9D12DE' },
    { key: 'recovery', label: 'Recuperación', icon: 'moon', color: '#9D12DE' },
    { key: 'mindset', label: 'Mindset', icon: 'bulb', color: '#A855F7' },
  ];

  const filteredHabits = selectedCategory === 'all'
    ? habits
    : habits.filter(h => h.category === selectedCategory);

  const isCompletedToday = (habit: Habit) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return habit.completedDates.some(date => {
      const completedDate = new Date(date);
      completedDate.setHours(0, 0, 0, 0);
      return completedDate.getTime() === today.getTime();
    });
  };

  const toggleHabit = (habitId: string) => {
    setHabits(habits.map(habit => {
      if (habit.id !== habitId) return habit;

      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const completedToday = isCompletedToday(habit);

      if (completedToday) {
        // Unmark today
        return {
          ...habit,
          completedDates: habit.completedDates.filter(date => {
            const d = new Date(date);
            d.setHours(0, 0, 0, 0);
            return d.getTime() !== today.getTime();
          }),
          currentStreak: Math.max(0, habit.currentStreak - 1),
        };
      } else {
        // Mark today
        const newStreak = habit.currentStreak + 1;
        return {
          ...habit,
          completedDates: [...habit.completedDates, today],
          currentStreak: newStreak,
          longestStreak: Math.max(habit.longestStreak, newStreak),
        };
      }
    }));

    if (!isCompletedToday(habits.find(h => h.id === habitId)!)) {
      Alert.alert('Hábito Completado! 🎉', 'Sigue así, la consistencia es clave');
    }
  };

  const addHabitFromTemplate = (template: typeof HABIT_TEMPLATES[0]) => {
    const newHabit: Habit = {
      id: String(Date.now()),
      name: template.name,
      icon: template.icon,
      color: template.color,
      targetDays: 7,
      frequency: 'daily',
      category: template.category as Habit['category'],
      completedDates: [],
      currentStreak: 0,
      longestStreak: 0,
    };
    setHabits([...habits, newHabit]);
    setShowAddForm(false);
    Alert.alert('Hábito Agregado! 💪', `${template.name} agregado a tu tracker`);
  };

  const deleteHabit = (habitId: string) => {
    Alert.alert(
      'Eliminar Hábito',
      '¿Seguro? Se perderá todo el historial',
      [
        { text: 'Cancelar' },
        {
          text: 'Eliminar',
          onPress: () => setHabits(habits.filter(h => h.id !== habitId)),
          style: 'destructive',
        },
      ]
    );
  };

  const getWeekCompletion = (habit: Habit) => {
    const today = new Date();
    const weekAgo = new Date(today);
    weekAgo.setDate(weekAgo.getDate() - 7);

    const completedThisWeek = habit.completedDates.filter(date => 
      date >= weekAgo && date <= today
    ).length;

    return Math.round((completedThisWeek / 7) * 100);
  };

  const getTotalStats = () => {
    const totalCompleted = habits.reduce((sum, habit) => sum + habit.completedDates.length, 0);
    const totalStreaks = habits.reduce((sum, habit) => sum + habit.currentStreak, 0);
    const longestStreak = Math.max(...habits.map(h => h.longestStreak), 0);

    return { totalCompleted, totalStreaks, longestStreak };
  };

  const stats = getTotalStats();

  if (showAddForm) {
    return (
      <View className="flex-1 bg-zinc-950">
        {/* Header */}
        <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
          <View className="flex-row items-center mb-4">
            <TouchableOpacity onPress={() => setShowAddForm(false)}>
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <Text className="text-white text-2xl font-bold flex-1 ml-3">
              Agregar Hábito
            </Text>
          </View>
        </View>

        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          <View className="px-6 pt-6">
            <Text className="text-white font-bold text-lg mb-4">Plantillas Populares</Text>
            
            {HABIT_TEMPLATES.map((template, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => addHabitFromTemplate(template)}
                className="bg-zinc-900 rounded-xl p-4 mb-3 border border-zinc-800 flex-row items-center"
              >
                <View className={`w-12 h-12 bg-${template.color}-500 rounded-xl items-center justify-center`}>
                  <Ionicons name={template.icon as any} size={24} color="white" />
                </View>
                <View className="flex-1 ml-4">
                  <Text className="text-white font-bold text-lg">{template.name}</Text>
                  <Text className="text-zinc-400 text-sm capitalize">{template.category}</Text>
                </View>
                <Ionicons name="add-circle" size={28} color="#9D12DE" />
              </TouchableOpacity>
            ))}

            {/* Custom Habit */}
            <TouchableOpacity
              onPress={() => Alert.alert('Próximamente', 'Crear hábito personalizado')}
              className="bg-purple-500/10 rounded-xl p-5 border-2 border-purple-500/30 flex-row items-center justify-center mt-4"
            >
              <Ionicons name="add" size={24} color="#A855F7" />
              <Text className="text-purple-400 font-bold text-lg ml-2">Hábito Personalizado</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }

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
          <TouchableOpacity onPress={() => setShowAddForm(true)}>
            <Ionicons name="add-circle" size={28} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          {/* Stats */}
          <View className="flex-row gap-3 mb-6">
            <View className="flex-1 bg-gradient-to-r from-primary to-[#7D0EBE] rounded-xl p-4">
              <Text className="text-white opacity-90 text-xs mb-1">Completados</Text>
              <Text className="text-white text-3xl font-bold">{stats.totalCompleted}</Text>
            </View>
            <View className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-4">
              <Text className="text-white opacity-90 text-xs mb-1">Streak Activo</Text>
              <Text className="text-white text-3xl font-bold">{stats.totalStreaks}</Text>
            </View>
            <View className="flex-1 bg-gradient-to-r from-amber-500 to-red-500 rounded-xl p-4">
              <Text className="text-white opacity-90 text-xs mb-1">Récord</Text>
              <Text className="text-white text-3xl font-bold">{stats.longestStreak}</Text>
            </View>
          </View>

          {/* Category Filter */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-4">
            <View className="flex-row gap-2">
              {categories.map((cat) => (
                <TouchableOpacity
                  key={cat.key}
                  onPress={() => setSelectedCategory(cat.key)}
                  className={`rounded-xl px-4 py-2 flex-row items-center ${
                    selectedCategory === cat.key
                      ? 'bg-primary'
                      : 'bg-zinc-900 border border-zinc-800'
                  }`}
                >
                  <Ionicons
                    name={cat.icon as any}
                    size={18}
                    color={selectedCategory === cat.key ? 'white' : cat.color}
                  />
                  <Text className={`ml-2 font-bold ${selectedCategory === cat.key ? 'text-white' : 'text-zinc-400'}`}>
                    {cat.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          {/* Habits List */}
          <Text className="text-white font-bold text-lg mb-3">
            Mis Hábitos ({filteredHabits.length})
          </Text>

          {filteredHabits.map((habit) => {
            const completedToday = isCompletedToday(habit);
            const weekCompletion = getWeekCompletion(habit);

            return (
              <View key={habit.id} className="bg-zinc-900 rounded-xl p-5 mb-4 border border-zinc-800">
                {/* Header */}
                <View className="flex-row items-center justify-between mb-4">
                  <View className="flex-row items-center flex-1">
                    <View className={`w-14 h-14 bg-${habit.color}-500 rounded-xl items-center justify-center`}>
                      <Ionicons name={habit.icon as any} size={28} color="white" />
                    </View>
                    <View className="flex-1 ml-3">
                      <Text className="text-white font-bold text-lg">{habit.name}</Text>
                      <Text className="text-zinc-400 text-sm capitalize">{habit.category}</Text>
                    </View>
                  </View>
                  <TouchableOpacity onPress={() => deleteHabit(habit.id)}>
                    <Ionicons name="trash" size={20} color="#EF4444" />
                  </TouchableOpacity>
                </View>

                {/* Streaks */}
                <View className="flex-row gap-2 mb-4">
                  <View className="flex-1 bg-primary/10 rounded-lg p-3 border border-primary/30">
                    <Text className="text-primary text-xs mb-1">Streak Actual</Text>
                    <Text className="text-primary font-bold text-2xl">
                      {habit.currentStreak} 🔥
                    </Text>
                  </View>
                  <View className="flex-1 bg-amber-500/10 rounded-lg p-3 border border-amber-500/30">
                    <Text className="text-amber-400 text-xs mb-1">Récord</Text>
                    <Text className="text-amber-400 font-bold text-2xl">
                      {habit.longestStreak} 🏆
                    </Text>
                  </View>
                  <View className="flex-1 bg-primary/10 rounded-lg p-3 border border-primary/30">
                    <Text className="text-primary/80 text-xs mb-1">Esta Semana</Text>
                    <Text className="text-primary/80 font-bold text-2xl">
                      {weekCompletion}%
                    </Text>
                  </View>
                </View>

                {/* Progress Bar */}
                <View className="mb-4">
                  <View className="flex-row items-center justify-between mb-2">
                    <Text className="text-zinc-400 text-sm">Progreso Semanal</Text>
                    <Text className="text-white font-bold text-sm">
                      {habit.completedDates.filter(d => {
                        const weekAgo = new Date();
                        weekAgo.setDate(weekAgo.getDate() - 7);
                        return d >= weekAgo;
                      }).length}/{habit.targetDays}
                    </Text>
                  </View>
                  <View className="h-3 bg-zinc-800 rounded-full overflow-hidden">
                    <View 
                      className={`h-full bg-${habit.color}-500 rounded-full`}
                      style={{ width: `${Math.min(weekCompletion, 100)}%` }}
                    />
                  </View>
                </View>

                {/* Complete Button */}
                <TouchableOpacity
                  onPress={() => toggleHabit(habit.id)}
                  className={`rounded-xl p-4 flex-row items-center justify-center ${
                    completedToday
                      ? 'bg-primary'
                      : `bg-${habit.color}-500/10 border-2 border-${habit.color}-500/30`
                  }`}
                >
                  <Ionicons
                    name={completedToday ? 'checkmark-circle' : 'checkbox-outline'}
                    size={24}
                    color={completedToday ? 'white' : '#71717A'}
                  />
                  <Text className={`font-bold text-lg ml-2 ${completedToday ? 'text-white' : 'text-zinc-400'}`}>
                    {completedToday ? 'Completado Hoy! ?' : 'Marcar como Completado'}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })}

          {filteredHabits.length === 0 && (
            <View className="bg-zinc-900 rounded-xl p-8 border border-zinc-800 items-center">
              <Ionicons name="add-circle-outline" size={64} color="#52525B" />
              <Text className="text-zinc-400 text-center mt-4 mb-2">
                No tienes hábitos en esta categoría
              </Text>
              <TouchableOpacity onPress={() => setShowAddForm(true)}>
                <Text className="text-primary font-bold">Agregar Hábito</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Tips */}
          <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-6 mt-4">
            <View className="flex-row items-start">
              <Ionicons name="bulb" size={20} color="#9D12DE" />
              <View className="flex-1 ml-3">
                <Text className="text-primary/80 font-bold mb-2">
                  Tips para Construir Hábitos
                </Text>
                <Text className="text-primary/60 text-sm">
                  • Empieza con 1-3 hábitos máximo{'\n'}
                  • Sé específico (3L agua vs "beber agua"){'\n'}
                  • Enlaza hábitos (café → journaling){'\n'}
                  • Celebra streaks pequeños (3, 7, 14 días){'\n'}
                  • No rompas la cadena 2 días seguidos{'\n'}
                  • 21 días = hábito, 90 días = lifestyle
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

