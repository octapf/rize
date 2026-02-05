import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface Goal {
  id: string;
  title: string;
  category: 'strength' | 'body' | 'habit' | 'performance';
  targetValue: number;
  currentValue: number;
  unit: string;
  deadline?: Date;
  status: 'active' | 'completed' | 'paused';
  notes?: string;
}

const GOAL_CATEGORIES = [
  { value: 'strength', label: 'Fuerza', icon: 'barbell', color: 'red' },
  { value: 'body', label: 'FÃ­sico', icon: 'body', color: 'blue' },
  { value: 'habit', label: 'HÃ¡bito', icon: 'checkmark-circle', color: 'emerald' },
  { value: 'performance', label: 'Rendimiento', icon: 'speedometer', color: 'purple' },
];

const MOCK_GOALS: Goal[] = [
  {
    id: '1',
    title: 'Press Banca 120kg',
    category: 'strength',
    targetValue: 120,
    currentValue: 100,
    unit: 'kg',
    deadline: new Date(2026, 5, 1),
    status: 'active',
    notes: '1RM actual: 100kg, progresiÃ³n lineal',
  },
  {
    id: '2',
    title: 'Bajar a 12% grasa corporal',
    category: 'body',
    targetValue: 12,
    currentValue: 15.2,
    unit: '%',
    deadline: new Date(2026, 3, 15),
    status: 'active',
    notes: 'Mini cut de 8 semanas',
  },
  {
    id: '3',
    title: 'Entrenar 5x por semana',
    category: 'habit',
    targetValue: 20,
    currentValue: 12,
    unit: 'semanas',
    status: 'active',
    notes: 'Consistencia es clave',
  },
  {
    id: '4',
    title: 'Correr 5km en menos de 25min',
    category: 'performance',
    targetValue: 25,
    currentValue: 28,
    unit: 'min',
    deadline: new Date(2026, 2, 31),
    status: 'active',
  },
  {
    id: '5',
    title: '10 Dominadas estrictas',
    category: 'strength',
    targetValue: 10,
    currentValue: 10,
    unit: 'reps',
    status: 'completed',
    notes: 'Â¡Logrado el 20 de enero!',
  },
];

export default function GoalTracker() {
  const [goals, setGoals] = useState(MOCK_GOALS);
  const [filter, setFilter] = useState<string>('active');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: '',
    category: 'strength',
    targetValue: '',
    currentValue: '',
    unit: 'kg',
    notes: '',
  });

  const filteredGoals = goals.filter((g) => {
    if (filter === 'all') return true;
    return g.status === filter;
  });

  const getCategoryInfo = (category: string) => {
    return GOAL_CATEGORIES.find((c) => c.value === category) || GOAL_CATEGORIES[0];
  };

  const getProgress = (goal: Goal): number => {
    // For goals where lower is better (e.g., bodyfat, time)
    if (goal.unit === '%' || goal.unit === 'min') {
      if (goal.currentValue <= goal.targetValue) return 100;
      const range = goal.currentValue - goal.targetValue;
      const progress = ((goal.currentValue - goal.currentValue) / range) * 100;
      return Math.max(0, Math.min(100, progress));
    }
    // For goals where higher is better (e.g., weight, reps, weeks)
    return Math.min(100, (goal.currentValue / goal.targetValue) * 100);
  };

  const getDaysUntilDeadline = (deadline?: Date): number | null => {
    if (!deadline) return null;
    const now = new Date();
    const diff = deadline.getTime() - now.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const addGoal = () => {
    if (!newGoal.title || !newGoal.targetValue || !newGoal.currentValue) {
      Alert.alert('Error', 'Completa tÃ­tulo, meta actual y objetivo');
      return;
    }

    const goal: Goal = {
      id: Date.now().toString(),
      title: newGoal.title,
      category: newGoal.category as any,
      targetValue: parseFloat(newGoal.targetValue),
      currentValue: parseFloat(newGoal.currentValue),
      unit: newGoal.unit,
      status: 'active',
      notes: newGoal.notes,
    };

    setGoals([goal, ...goals]);
    setNewGoal({ title: '', category: 'strength', targetValue: '', currentValue: '', unit: 'kg', notes: '' });
    setShowAddForm(false);
    Alert.alert('Meta Creada! ðŸŽ¯', 'Ahora a trabajar para lograrla');
  };

  const updateProgress = (id: string, newValue: number) => {
    setGoals(goals.map((g) => {
      if (g.id !== id) return g;
      const updated = { ...g, currentValue: newValue };
      // Auto-complete if target reached
      if (
        (g.unit === 'kg' || g.unit === 'reps' || g.unit === 'semanas') && newValue >= g.targetValue ||
        (g.unit === '%' || g.unit === 'min') && newValue <= g.targetValue
      ) {
        updated.status = 'completed';
        Alert.alert('Â¡Meta Lograda! ðŸŽ‰', `Completaste: ${g.title}`);
      }
      return updated;
    }));
  };

  const deleteGoal = (id: string) => {
    Alert.alert(
      'Eliminar Meta',
      'Â¿EstÃ¡s seguro?',
      [
        { text: 'Cancelar' },
        { text: 'Eliminar', style: 'destructive', onPress: () => setGoals(goals.filter((g) => g.id !== id)) },
      ]
    );
  };

  const toggleStatus = (id: string, newStatus: 'active' | 'completed' | 'paused') => {
    setGoals(goals.map((g) => (g.id === id ? { ...g, status: newStatus } : g)));
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
            Goals
          </Text>
          <TouchableOpacity onPress={() => setShowAddForm(!showAddForm)}>
            <Ionicons name={showAddForm ? 'close' : 'add-circle'} size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Status Filters */}
        <View className="flex-row gap-2">
          {['active', 'completed', 'paused', 'all'].map((status) => (
            <TouchableOpacity
              key={status}
              onPress={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg ${
                filter === status ? 'bg-primary' : 'bg-zinc-900 border border-zinc-800'
              }`}
            >
              <Text className={`font-semibold text-sm ${filter === status ? 'text-white' : 'text-zinc-400'}`}>
                {status === 'active' ? 'Activas' : status === 'completed' ? 'Completadas' : status === 'paused' ? 'Pausadas' : 'Todas'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          {showAddForm ? (
            <View className="bg-zinc-900 rounded-xl p-6 mb-6 border border-zinc-800">
              <Text className="text-white font-bold text-lg mb-4">Nueva Meta</Text>

              {/* Title */}
              <View className="mb-4">
                <Text className="text-zinc-400 text-sm mb-2">TÃ­tulo</Text>
                <TextInput
                  className="bg-zinc-800 rounded-xl px-4 py-3 text-white text-lg font-bold"
                  placeholder="Ej: Sentadilla 150kg, Bajar a 10% grasa..."
                  placeholderTextColor="#71717A"
                  value={newGoal.title}
                  onChangeText={(text) => setNewGoal({ ...newGoal, title: text })}
                />
              </View>

              {/* Category */}
              <View className="mb-4">
                <Text className="text-zinc-400 text-sm mb-2">CategorÃ­a</Text>
                <View className="flex-row flex-wrap gap-2">
                  {GOAL_CATEGORIES.map((cat) => (
                    <TouchableOpacity
                      key={cat.value}
                      onPress={() => setNewGoal({ ...newGoal, category: cat.value })}
                      className={`px-3 py-2 rounded-lg ${
                        newGoal.category === cat.value ? `bg-${cat.color}-500` : 'bg-zinc-800'
                      }`}
                    >
                      <View className="flex-row items-center">
                        <Ionicons
                          name={cat.icon as any}
                          size={16}
                          color={newGoal.category === cat.value ? 'white' : '#71717A'}
                        />
                        <Text className={`ml-1 font-bold ${newGoal.category === cat.value ? 'text-white' : 'text-zinc-400'}`}>
                          {cat.label}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Current & Target */}
              <View className="flex-row gap-4 mb-4">
                <View className="flex-1">
                  <Text className="text-zinc-400 text-sm mb-2">Valor Actual</Text>
                  <TextInput
                    className="bg-zinc-800 rounded-xl px-4 py-3 text-white text-lg font-bold"
                    placeholder="100"
                    placeholderTextColor="#71717A"
                    keyboardType="decimal-pad"
                    value={newGoal.currentValue}
                    onChangeText={(text) => setNewGoal({ ...newGoal, currentValue: text })}
                  />
                </View>
                <View className="flex-1">
                  <Text className="text-zinc-400 text-sm mb-2">Meta Objetivo</Text>
                  <TextInput
                    className="bg-zinc-800 rounded-xl px-4 py-3 text-white text-lg font-bold"
                    placeholder="120"
                    placeholderTextColor="#71717A"
                    keyboardType="decimal-pad"
                    value={newGoal.targetValue}
                    onChangeText={(text) => setNewGoal({ ...newGoal, targetValue: text })}
                  />
                </View>
              </View>

              {/* Unit */}
              <View className="mb-4">
                <Text className="text-zinc-400 text-sm mb-2">Unidad</Text>
                <View className="flex-row flex-wrap gap-2">
                  {['kg', 'reps', '%', 'min', 'semanas', 'dÃ­as'].map((unit) => (
                    <TouchableOpacity
                      key={unit}
                      onPress={() => setNewGoal({ ...newGoal, unit })}
                      className={`px-3 py-2 rounded-lg ${
                        newGoal.unit === unit ? 'bg-primary' : 'bg-zinc-800'
                      }`}
                    >
                      <Text className={newGoal.unit === unit ? 'text-white font-bold' : 'text-zinc-400'}>
                        {unit}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Notes */}
              <View className="mb-4">
                <Text className="text-zinc-400 text-sm mb-2">Notas (opcional)</Text>
                <TextInput
                  className="bg-zinc-800 rounded-xl px-4 py-3 text-white"
                  placeholder="Plan, estrategia, etc."
                  placeholderTextColor="#71717A"
                  multiline
                  numberOfLines={2}
                  value={newGoal.notes}
                  onChangeText={(text) => setNewGoal({ ...newGoal, notes: text })}
                />
              </View>

              <TouchableOpacity
                onPress={addGoal}
                className="bg-primary rounded-xl p-4 flex-row items-center justify-center"
              >
                <Ionicons name="checkmark-circle" size={20} color="white" />
                <Text className="text-white font-bold ml-2">Crear Meta</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              {/* Goals List */}
              {filteredGoals.length === 0 ? (
                <View className="bg-zinc-900 rounded-xl p-8 items-center border border-zinc-800">
                  <Text className="text-6xl mb-3">ðŸŽ¯</Text>
                  <Text className="text-white font-bold text-lg mb-2">Sin Metas</Text>
                  <Text className="text-zinc-400 text-center">
                    Define metas para mantenerte enfocado
                  </Text>
                </View>
              ) : (
                filteredGoals.map((goal) => {
                  const categoryInfo = getCategoryInfo(goal.category);
                  const progress = getProgress(goal);
                  const daysLeft = getDaysUntilDeadline(goal.deadline);

                  return (
                    <View key={goal.id} className="bg-zinc-900 rounded-xl p-4 mb-4 border border-zinc-800">
                      <View className="flex-row items-start justify-between mb-3">
                        <View className="flex-row items-start flex-1">
                          <View className={`w-12 h-12 bg-${categoryInfo.color}-500 rounded-xl items-center justify-center mr-3`}>
                            <Ionicons name={categoryInfo.icon as any} size={24} color="white" />
                          </View>
                          <View className="flex-1">
                            <Text className="text-white font-bold text-lg mb-1">
                              {goal.title}
                            </Text>
                            <View className="flex-row gap-2">
                              <View className={`bg-${goal.status === 'completed' ? 'emerald' : goal.status === 'paused' ? 'amber' : 'blue'}-500/10 rounded px-2 py-0.5 border border-${goal.status === 'completed' ? 'emerald' : goal.status === 'paused' ? 'amber' : 'blue'}-500/30`}>
                                <Text className={`text-${goal.status === 'completed' ? 'emerald' : goal.status === 'paused' ? 'amber' : 'blue'}-400 text-xs font-bold`}>
                                  {goal.status === 'completed' ? 'âœ“ Completada' : goal.status === 'paused' ? 'â¸ Pausada' : 'ðŸ”¥ Activa'}
                                </Text>
                              </View>
                            </View>
                          </View>
                        </View>
                        <TouchableOpacity onPress={() => deleteGoal(goal.id)}>
                          <Ionicons name="trash" size={20} color="#EF4444" />
                        </TouchableOpacity>
                      </View>

                      {/* Progress */}
                      <View className="mb-3">
                        <View className="flex-row items-center justify-between mb-2">
                          <Text className="text-zinc-400 text-sm">Progreso</Text>
                          <Text className="text-white font-bold">
                            {goal.currentValue} / {goal.targetValue} {goal.unit}
                          </Text>
                        </View>
                        <View className="h-3 bg-zinc-800 rounded-full overflow-hidden">
                          <View
                            className={`h-full bg-${categoryInfo.color}-500 rounded-full`}
                            style={{ width: `${progress}%` }}
                          />
                        </View>
                        <Text className="text-zinc-500 text-xs mt-1">{progress.toFixed(0)}% completado</Text>
                      </View>

                      {/* Deadline */}
                      {daysLeft !== null && (
                        <View className={`bg-${daysLeft < 7 ? 'red' : daysLeft < 30 ? 'amber' : 'blue'}-500/10 rounded-lg p-2 border border-${daysLeft < 7 ? 'red' : daysLeft < 30 ? 'amber' : 'blue'}-500/30 mb-3`}>
                          <Text className={`text-${daysLeft < 7 ? 'red' : daysLeft < 30 ? 'amber' : 'blue'}-400 text-sm`}>
                            â° {daysLeft > 0 ? `${daysLeft} dÃ­as restantes` : daysLeft === 0 ? 'Â¡Hoy es el deadline!' : `VenciÃ³ hace ${Math.abs(daysLeft)} dÃ­as`}
                          </Text>
                        </View>
                      )}

                      {/* Notes */}
                      {goal.notes && (
                        <View className="bg-zinc-800 rounded-lg p-3 mb-3">
                          <Text className="text-zinc-300 text-sm">{goal.notes}</Text>
                        </View>
                      )}

                      {/* Update Progress */}
                      {goal.status === 'active' && (
                        <View className="flex-row items-center gap-2">
                          <Text className="text-zinc-400 text-sm">Actualizar:</Text>
                          <TouchableOpacity
                            onPress={() => {
                              const increment = goal.unit === 'kg' ? 2.5 : goal.unit === 'reps' ? 1 : goal.unit === '%' ? -0.5 : goal.unit === 'min' ? -0.5 : 1;
                              updateProgress(goal.id, goal.currentValue + increment);
                            }}
                            className="bg-primary rounded-lg px-4 py-2"
                          >
                            <Text className="text-white font-bold">+</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() => toggleStatus(goal.id, 'completed')}
                            className="flex-1 bg-primary rounded-lg p-2"
                          >
                            <Text className="text-white text-sm font-bold text-center">Marcar Completada</Text>
                          </TouchableOpacity>
                        </View>
                      )}
                    </View>
                  );
                })
              )}
            </>
          )}

          {/* Tips */}
          <View className="bg-amber-500/10 rounded-xl p-4 border border-amber-500/30 mb-6">
            <View className="flex-row items-start">
              <Ionicons name="trophy" size={20} color="#FFEA00" />
              <View className="flex-1 ml-3">
                <Text className="text-amber-400 font-bold mb-2">
                  Tips para Lograr Metas
                </Text>
                <Text className="text-amber-300 text-sm">
                  â€¢ Metas SMART: especÃ­ficas y medibles{'\n'}
                  â€¢ Deadline realista pero desafiante{'\n'}
                  â€¢ Divide en mini-metas semanales{'\n'}
                  â€¢ Trackea progreso constantemente{'\n'}
                  â€¢ Ajusta estrategia si es necesario
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

