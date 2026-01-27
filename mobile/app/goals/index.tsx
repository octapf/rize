import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Card } from '@/components/ui/Card';

interface Goal {
  id: string;
  title: string;
  description: string;
  type: 'weight' | 'workouts' | 'volume' | 'streak' | 'custom';
  target: number;
  current: number;
  deadline?: Date;
  icon: string;
  color: string;
  completed: boolean;
}

const mockGoals: Goal[] = [
  {
    id: '1',
    title: 'Alcanzar 100 Entrenamientos',
    description: 'Completa 100 sesiones de entrenamiento',
    type: 'workouts',
    target: 100,
    current: 45,
    icon: 'barbell',
    color: '#10B981',
    completed: false,
  },
  {
    id: '2',
    title: 'Racha de 30 Días',
    description: 'Entrena 30 días consecutivos',
    type: 'streak',
    target: 30,
    current: 12,
    deadline: new Date('2026-02-25'),
    icon: 'flame',
    color: '#EF4444',
    completed: false,
  },
  {
    id: '3',
    title: 'Volumen de 50,000 kg',
    description: 'Levanta un total de 50,000 kg',
    type: 'volume',
    target: 50000,
    current: 28500,
    icon: 'speedometer',
    color: '#8B5CF6',
    completed: false,
  },
  {
    id: '4',
    title: 'Peso Corporal: 75 kg',
    description: 'Alcanzar peso objetivo',
    type: 'weight',
    target: 75,
    current: 78,
    deadline: new Date('2026-06-01'),
    icon: 'scale',
    color: '#3B82F6',
    completed: false,
  },
];

export default function GoalsScreen() {
  const [goals, setGoals] = useState<Goal[]>(mockGoals);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const getProgressPercentage = (goal: Goal) => {
    return Math.min((goal.current / goal.target) * 100, 100);
  };

  const getDaysRemaining = (deadline?: Date) => {
    if (!deadline) return null;
    const days = Math.ceil((deadline.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    return days;
  };

  const handleDeleteGoal = (id: string) => {
    Alert.alert(
      'Eliminar Objetivo',
      '¿Estás seguro de que quieres eliminar este objetivo?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => setGoals(goals.filter(g => g.id !== id)),
        },
      ]
    );
  };

  const renderGoalCard = (goal: Goal) => {
    const progress = getProgressPercentage(goal);
    const daysRemaining = getDaysRemaining(goal.deadline);

    return (
      <Card key={goal.id} className="p-4 mb-4">
        <View className="flex-row items-start justify-between mb-3">
          <View className="flex-row items-start gap-3 flex-1">
            <View
              className="w-12 h-12 rounded-xl items-center justify-center"
              style={{ backgroundColor: goal.color + '20' }}
            >
              <Ionicons
                name={goal.icon as any}
                size={24}
                style={{ color: goal.color }}
              />
            </View>

            <View className="flex-1">
              <Text className="text-gray-900 font-bold text-base">
                {goal.title}
              </Text>
              <Text className="text-gray-600 text-sm mt-1">
                {goal.description}
              </Text>

              {daysRemaining !== null && (
                <View className="flex-row items-center gap-1 mt-2">
                  <Ionicons name="calendar" size={14} color="#6B7280" />
                  <Text className="text-gray-600 text-xs">
                    {daysRemaining > 0
                      ? `${daysRemaining} días restantes`
                      : 'Vencido'}
                  </Text>
                </View>
              )}
            </View>
          </View>

          <TouchableOpacity
            onPress={() => handleDeleteGoal(goal.id)}
            className="p-2"
          >
            <Ionicons name="close-circle" size={24} color="#EF4444" />
          </TouchableOpacity>
        </View>

        {/* Progress Bar */}
        <View className="mb-2">
          <View className="flex-row items-center justify-between mb-1">
            <Text className="text-gray-700 text-sm font-semibold">
              Progreso
            </Text>
            <Text className="text-gray-600 text-sm">
              {goal.current.toLocaleString()} / {goal.target.toLocaleString()}
              {goal.type === 'weight' && ' kg'}
              {goal.type === 'volume' && ' kg'}
            </Text>
          </View>

          <View className="bg-gray-200 h-3 rounded-full overflow-hidden">
            <View
              className="h-full rounded-full"
              style={{
                width: `${progress}%`,
                backgroundColor: goal.color,
              }}
            />
          </View>

          <Text className="text-gray-600 text-xs mt-1 text-right">
            {Math.round(progress)}% completado
          </Text>
        </View>

        {/* Quick Stats */}
        {goal.type !== 'weight' && (
          <View className="flex-row items-center justify-between mt-2 pt-3 border-t border-gray-200">
            <Text className="text-gray-600 text-sm">
              Restante: {(goal.target - goal.current).toLocaleString()}
            </Text>
            {goal.type === 'workouts' && goal.deadline && daysRemaining && daysRemaining > 0 && (
              <Text className="text-gray-600 text-sm">
                ~{Math.ceil((goal.target - goal.current) / daysRemaining)} por día
              </Text>
            )}
          </View>
        )}
      </Card>
    );
  };

  const activeGoals = goals.filter(g => !g.completed);
  const completedGoals = goals.filter(g => g.completed);

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <LinearGradient colors={['#3B82F6', '#2563EB']} className="px-6 pt-12 pb-6">
        <View className="flex-row items-center justify-between mb-4">
          <TouchableOpacity onPress={() => router.back()} className="p-2">
            <Ionicons name="arrow-back" size={28} color="white" />
          </TouchableOpacity>
          <Text className="text-2xl font-bold text-white">Mis Objetivos</Text>
          <TouchableOpacity
            onPress={() => setShowCreateModal(true)}
            className="bg-white/20 p-2 rounded-full"
          >
            <Ionicons name="add" size={28} color="white" />
          </TouchableOpacity>
        </View>

        {/* Summary */}
        <View className="flex-row gap-3">
          <Card className="flex-1 p-3 bg-white/20 border-0">
            <Text className="text-white/80 text-xs mb-1">Activos</Text>
            <Text className="text-white text-2xl font-bold">
              {activeGoals.length}
            </Text>
          </Card>
          <Card className="flex-1 p-3 bg-white/20 border-0">
            <Text className="text-white/80 text-xs mb-1">Completados</Text>
            <Text className="text-white text-2xl font-bold">
              {completedGoals.length}
            </Text>
          </Card>
        </View>
      </LinearGradient>

      <ScrollView className="flex-1" contentContainerClassName="p-6">
        {/* Active Goals */}
        {activeGoals.length > 0 ? (
          <View>
            <Text className="text-lg font-bold text-gray-900 mb-3">
              Objetivos Activos
            </Text>
            {activeGoals.map(renderGoalCard)}
          </View>
        ) : (
          <Card className="p-8 items-center">
            <Ionicons name="flag-outline" size={64} color="#D1D5DB" />
            <Text className="text-gray-900 text-xl font-bold mt-4 text-center">
              No tienes objetivos activos
            </Text>
            <Text className="text-gray-600 text-center mt-2">
              Crea tu primer objetivo para mantenerte motivado
            </Text>
            <TouchableOpacity
              onPress={() => setShowCreateModal(true)}
              className="mt-6 bg-blue-600 px-6 py-3 rounded-full"
            >
              <Text className="text-white font-semibold">Crear Objetivo</Text>
            </TouchableOpacity>
          </Card>
        )}

        {/* Completed Goals */}
        {completedGoals.length > 0 && (
          <View className="mt-6">
            <Text className="text-lg font-bold text-gray-900 mb-3">
              Completados 🎉
            </Text>
            {completedGoals.map(renderGoalCard)}
          </View>
        )}
      </ScrollView>
    </View>
  );
}
