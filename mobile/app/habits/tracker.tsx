import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  Switch,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface HabitTemplate {
  id: string;
  name: string;
  description: string;
  frequency: 'diario' | 'semanal' | 'mensual';
  category: 'salud' | 'nutricion' | 'entrenamiento' | 'recuperacion';
  difficulty: 'facil' | 'media' | 'dificil';
  xpReward: number;
}

interface ActiveHabit {
  id: string;
  templateId: string;
  name: string;
  currentStreak: number;
  bestStreak: number;
  completedDays: number;
  totalDays: number;
  completedToday: boolean;
  category: string;
}

const HABIT_TEMPLATES: HabitTemplate[] = [
  {
    id: '1',
    name: 'Beber 8 Vasos de Agua',
    description: 'Mantente hidratado durante el día',
    frequency: 'diario',
    category: 'salud',
    difficulty: 'facil',
    xpReward: 50,
  },
  {
    id: '2',
    name: 'Dormir 8 Horas',
    description: 'Descanso óptimo para recuperación',
    frequency: 'diario',
    category: 'recuperacion',
    difficulty: 'media',
    xpReward: 100,
  },
  {
    id: '3',
    name: 'Entrenar 5 Días',
    description: 'Consistencia en el gimnasio',
    frequency: 'semanal',
    category: 'entrenamiento',
    difficulty: 'media',
    xpReward: 250,
  },
  {
    id: '4',
    name: 'Cumplir Macros Diarios',
    description: 'Proteína, carbohidratos y grasas balanceadas',
    frequency: 'diario',
    category: 'nutricion',
    difficulty: 'dificil',
    xpReward: 150,
  },
];

const ACTIVE_HABITS: ActiveHabit[] = [
  {
    id: '1',
    templateId: '1',
    name: 'Beber 8 Vasos de Agua',
    currentStreak: 12,
    bestStreak: 23,
    completedDays: 18,
    totalDays: 21,
    completedToday: true,
    category: 'salud',
  },
  {
    id: '2',
    templateId: '2',
    name: 'Dormir 8 Horas',
    currentStreak: 5,
    bestStreak: 14,
    completedDays: 15,
    totalDays: 21,
    completedToday: false,
    category: 'recuperacion',
  },
  {
    id: '3',
    templateId: '3',
    name: 'Entrenar 5 Días',
    currentStreak: 3,
    bestStreak: 8,
    completedDays: 3,
    totalDays: 3,
    completedToday: true,
    category: 'entrenamiento',
  },
];

export default function HabitTracker() {
  const [showTemplates, setShowTemplates] = useState(false);
  const [remindersEnabled, setRemindersEnabled] = useState(true);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'salud':
        return '#9D12DE';
      case 'nutricion':
        return '#FFEA00';
      case 'entrenamiento':
        return '#EF4444';
      case 'recuperacion':
        return '#9D12DE';
      default:
        return '#71717A';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'salud':
        return 'heart';
      case 'nutricion':
        return 'restaurant';
      case 'entrenamiento':
        return 'barbell';
      case 'recuperacion':
        return 'bed';
      default:
        return 'checkbox';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'facil':
        return '#9D12DE';
      case 'media':
        return '#FFEA00';
      case 'dificil':
        return '#EF4444';
      default:
        return '#71717A';
    }
  };

  const completeHabit = (habit: ActiveHabit) => {
    if (habit.completedToday) {
      Alert.alert('Ya Completado', 'Este hábito ya fue marcado como completado hoy');
      return;
    }

    Alert.alert(
      '¡Hábito Completado!',
      `+50 XP\n\nRacha actual: ${habit.currentStreak + 1} días`,
      [{ text: 'OK' }]
    );
  };

  const addHabitFromTemplate = (template: HabitTemplate) => {
    Alert.alert(
      'Agregar Hábito',
      `${template.name}\n\nRecompensa: ${template.xpReward} XP\nDificultad: ${template.difficulty}\n\n¿Agregar a tus hábitos activos?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Agregar',
          onPress: () => {
            Alert.alert('¡Agregado!', 'Nuevo hábito en seguimiento');
            setShowTemplates(false);
          },
        },
      ]
    );
  };

  const viewHabitDetails = (habit: ActiveHabit) => {
    const completionRate = ((habit.completedDays / habit.totalDays) * 100).toFixed(0);

    Alert.alert(
      habit.name,
      `Racha actual: ${habit.currentStreak} días\nMejor racha: ${habit.bestStreak} días\n\nCompletado: ${habit.completedDays}/${habit.totalDays} días\nTasa de éxito: ${completionRate}%`,
      [
        { text: 'Ver Estadísticas' },
        { text: 'Cerrar' },
      ]
    );
  };

  const totalActiveHabits = ACTIVE_HABITS.length;
  const completedToday = ACTIVE_HABITS.filter((h) => h.completedToday).length;
  const totalXP = ACTIVE_HABITS.filter((h) => h.completedToday).length * 50;

  return (
    <View className="flex-1 bg-zinc-950">
      {/* Header */}
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1 ml-3">
            Rastreador de Hábitos
          </Text>
          <TouchableOpacity onPress={() => setShowTemplates(!showTemplates)}>
            <Ionicons name="add-circle" size={24} color="#9D12DE" />
          </TouchableOpacity>
        </View>

        {/* Daily Progress */}
        <View className="bg-gradient-to-br from-primary to-[#7D0EBE] rounded-xl p-4 mb-4">
          <View className="flex-row items-center justify-between mb-3">
            <View className="flex-1">
              <Text className="text-white/80 text-sm mb-1">Progreso de Hoy</Text>
              <Text className="text-white font-bold text-3xl">
                {completedToday}/{totalActiveHabits}
              </Text>
              <Text className="text-white/80 text-sm mt-1">
                +{totalXP} XP ganados
              </Text>
            </View>
            <View className="bg-white/20 rounded-full p-4">
              <Ionicons name="checkmark-done" size={32} color="white" />
            </View>
          </View>

          <View className="bg-white/20 h-2 rounded-full overflow-hidden">
            <View
              className="h-full bg-white rounded-full"
              style={{ width: `${(completedToday / totalActiveHabits) * 100}%` }}
            />
          </View>
        </View>

        {/* Stats */}
        <View className="flex-row gap-3">
          <View className="flex-1 bg-zinc-900 rounded-xl p-3 border border-zinc-800">
            <Text className="text-zinc-400 text-xs">Hábitos Activos</Text>
            <Text className="text-white text-2xl font-bold">{totalActiveHabits}</Text>
          </View>
          <View className="flex-1 bg-zinc-900 rounded-xl p-3 border border-zinc-800">
            <Text className="text-zinc-400 text-xs">Completados Hoy</Text>
            <Text className="text-primary text-2xl font-bold">{completedToday}</Text>
          </View>
          <View className="flex-1 bg-zinc-900 rounded-xl p-3 border border-zinc-800">
            <Text className="text-zinc-400 text-xs">XP Total</Text>
            <Text className="text-amber-500 text-2xl font-bold">{totalXP}</Text>
          </View>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {showTemplates ? (
          /* Habit Templates */
          <View className="px-6 pt-6">
            <View className="flex-row items-center justify-between mb-3">
              <Text className="text-white font-bold text-lg">
                Plantillas de Hábitos
              </Text>
              <TouchableOpacity onPress={() => setShowTemplates(false)}>
                <Text className="text-primary font-semibold">Cerrar</Text>
              </TouchableOpacity>
            </View>

            {HABIT_TEMPLATES.map((template) => (
              <TouchableOpacity
                key={template.id}
                onPress={() => addHabitFromTemplate(template)}
                className="bg-zinc-900 rounded-xl p-4 mb-3 border border-zinc-800"
              >
                <View className="flex-row items-start justify-between mb-2">
                  <View className="flex-1">
                    <View className="flex-row items-center mb-2">
                      <View
                        className="w-10 h-10 rounded-full items-center justify-center"
                        style={{ backgroundColor: getCategoryColor(template.category) + '20' }}
                      >
                        <Ionicons
                          name={getCategoryIcon(template.category) as any}
                          size={20}
                          color={getCategoryColor(template.category)}
                        />
                      </View>
                      <View className="ml-3 flex-1">
                        <Text className="text-white font-bold">{template.name}</Text>
                        <Text className="text-zinc-400 text-sm">{template.description}</Text>
                      </View>
                    </View>
                  </View>
                </View>

                <View className="flex-row gap-2">
                  <View
                    className="px-3 py-1 rounded-full"
                    style={{ backgroundColor: getDifficultyColor(template.difficulty) + '20' }}
                  >
                    <Text
                      className="text-xs font-bold capitalize"
                      style={{ color: getDifficultyColor(template.difficulty) }}
                    >
                      {template.difficulty}
                    </Text>
                  </View>
                  <View className="bg-primary/20 px-3 py-1 rounded-full">
                    <Text className="text-primary/80 text-xs font-bold capitalize">
                      {template.frequency}
                    </Text>
                  </View>
                  <View className="bg-amber-500/20 px-3 py-1 rounded-full">
                    <Text className="text-amber-500 text-xs font-bold">
                      +{template.xpReward} XP
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          /* Active Habits */
          <View className="px-6 pt-6">
            <Text className="text-white font-bold text-lg mb-3">
              Mis Hábitos
            </Text>

            {ACTIVE_HABITS.map((habit) => (
              <TouchableOpacity
                key={habit.id}
                onLongPress={() => viewHabitDetails(habit)}
                className={`rounded-xl p-4 mb-3 border ${
                  habit.completedToday
                    ? 'bg-primary/10 border-primary/30'
                    : 'bg-zinc-900 border-zinc-800'
                }`}
              >
                <View className="flex-row items-center justify-between mb-3">
                  <View className="flex-1">
                    <View className="flex-row items-center mb-2">
                      <View
                        className="w-10 h-10 rounded-full items-center justify-center"
                        style={{ backgroundColor: getCategoryColor(habit.category) + '20' }}
                      >
                        <Ionicons
                          name={getCategoryIcon(habit.category) as any}
                          size={20}
                          color={getCategoryColor(habit.category)}
                        />
                      </View>
                      <View className="ml-3 flex-1">
                        <Text className={`font-bold ${habit.completedToday ? 'text-primary' : 'text-white'}`}>
                          {habit.name}
                        </Text>
                        <Text className="text-zinc-400 text-sm">
                          Racha: {habit.currentStreak} días ðŸ”¥
                        </Text>
                      </View>
                    </View>
                  </View>
                  {habit.completedToday ? (
                    <View className="bg-primary rounded-full p-2">
                      <Ionicons name="checkmark" size={20} color="white" />
                    </View>
                  ) : (
                    <TouchableOpacity
                      onPress={() => completeHabit(habit)}
                      className="bg-zinc-800 rounded-full p-2 border-2 border-zinc-700"
                    >
                      <View className="w-5 h-5" />
                    </TouchableOpacity>
                  )}
                </View>

                <View className="bg-zinc-800 rounded-lg p-2 mb-2">
                  <View className="flex-row items-center justify-between mb-1">
                    <Text className="text-zinc-400 text-xs">Progreso</Text>
                    <Text className="text-white text-xs font-bold">
                      {habit.completedDays}/{habit.totalDays} días
                    </Text>
                  </View>
                  <View className="bg-zinc-900 h-1.5 rounded-full overflow-hidden">
                    <View
                      className="h-full rounded-full"
                      style={{
                        width: `${(habit.completedDays / habit.totalDays) * 100}%`,
                        backgroundColor: getCategoryColor(habit.category),
                      }}
                    />
                  </View>
                </View>

                <View className="flex-row items-center justify-between">
                  <Text className="text-zinc-500 text-xs">
                    Mejor racha: {habit.bestStreak} días
                  </Text>
                  <Text className="text-zinc-400 text-xs">
                    {((habit.completedDays / habit.totalDays) * 100).toFixed(0)}% completado
                  </Text>
                </View>
              </TouchableOpacity>
            ))}

            {/* Settings */}
            <View className="mt-4">
              <Text className="text-white font-bold text-lg mb-3">
                Configuración
              </Text>

              <View className="bg-zinc-900 rounded-xl p-4 border border-zinc-800">
                <View className="flex-row items-center justify-between">
                  <View className="flex-1">
                    <Text className="text-white font-semibold">Recordatorios Diarios</Text>
                    <Text className="text-zinc-400 text-sm mt-1">
                      Recibe notificaciones para tus hábitos
                    </Text>
                  </View>
                  <Switch
                    value={remindersEnabled}
                    onValueChange={setRemindersEnabled}
                    trackColor={{ false: '#27272A', true: '#9D12DE' }}
                    thumbColor="white"
                  />
                </View>
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}


