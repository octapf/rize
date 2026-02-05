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

interface PersonalRecord {
  id: string;
  exercise: string;
  category: 'squat' | 'bench' | 'deadlift' | 'press' | 'other';
  weight: number;
  reps: number;
  date: Date;
  notes?: string;
  videoUrl?: string;
  icon: string;
}

interface PRHistory {
  exerciseId: string;
  records: PersonalRecord[];
}

const EXERCISE_CATEGORIES = [
  { id: 'all', label: 'Todos', icon: 'apps' },
  { id: 'squat', label: 'Squat', icon: 'fitness' },
  { id: 'bench', label: 'Bench', icon: 'barbell' },
  { id: 'deadlift', label: 'Deadlift', icon: 'barbell-outline' },
  { id: 'press', label: 'Press', icon: 'trending-up' },
  { id: 'other', label: 'Otros', icon: 'add-circle' },
];

const MOCK_PRS: PersonalRecord[] = [
  {
    id: '1',
    exercise: 'Sentadilla',
    category: 'squat',
    weight: 140,
    reps: 1,
    date: new Date(2025, 11, 15),
    notes: 'Profundidad perfecta, sin rebote',
    icon: 'ðŸ‹ï¸',
  },
  {
    id: '2',
    exercise: 'Press de Banca',
    category: 'bench',
    weight: 100,
    reps: 1,
    date: new Date(2025, 11, 10),
    notes: 'Con pausa en pecho',
    icon: 'ðŸ’ª',
  },
  {
    id: '3',
    exercise: 'Peso Muerto',
    category: 'deadlift',
    weight: 180,
    reps: 1,
    date: new Date(2025, 11, 20),
    notes: 'Convencional, sin straps',
    icon: 'ðŸ‹ï¸â€â™‚ï¸',
  },
  {
    id: '4',
    exercise: 'Press Militar',
    category: 'press',
    weight: 70,
    reps: 1,
    date: new Date(2025, 11, 5),
    notes: 'Estricto, sin leg drive',
    icon: 'ðŸ¦¾',
  },
  {
    id: '5',
    exercise: 'Dominadas',
    category: 'other',
    weight: 20,
    reps: 8,
    date: new Date(2025, 11, 12),
    notes: 'Con +20kg, rango completo',
    icon: 'ðŸ’ª',
  },
  {
    id: '6',
    exercise: 'Sentadilla Frontal',
    category: 'squat',
    weight: 110,
    reps: 1,
    date: new Date(2025, 11, 8),
    notes: 'Sin rebote, clean grip',
    icon: 'ðŸ‹ï¸',
  },
  {
    id: '7',
    exercise: 'Remo con Barra',
    category: 'other',
    weight: 90,
    reps: 5,
    date: new Date(2025, 11, 18),
    notes: 'Pendlay row, desde suelo',
    icon: 'ðŸ’ª',
  },
];

export default function PersonalRecords() {
  const [prs, setPrs] = useState(MOCK_PRS);
  const [filter, setFilter] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newPR, setNewPR] = useState({
    exercise: '',
    category: 'other' as const,
    weight: '',
    reps: '1',
    notes: '',
  });

  const filteredPRs = filter === 'all'
    ? prs
    : prs.filter((pr) => pr.category === filter);

  const sortedPRs = [...filteredPRs].sort((a, b) => b.date.getTime() - a.date.getTime());

  const addPR = () => {
    if (!newPR.exercise || !newPR.weight) {
      Alert.alert('Error', 'Ingresa ejercicio y peso');
      return;
    }

    const pr: PersonalRecord = {
      id: Date.now().toString(),
      exercise: newPR.exercise,
      category: newPR.category,
      weight: parseFloat(newPR.weight),
      reps: parseInt(newPR.reps) || 1,
      date: new Date(),
      notes: newPR.notes,
      icon: getCategoryIcon(newPR.category),
    };

    setPrs([pr, ...prs]);
    setNewPR({ exercise: '', category: 'other', weight: '', reps: '1', notes: '' });
    setShowAddModal(false);
    Alert.alert('PR Guardado! 🎉', `Nuevo récord en ${pr.exercise}: ${pr.weight}kg x${pr.reps}`);
  };

  const deletePR = (id: string) => {
    Alert.alert(
      'Eliminar PR',
      '¿Estás seguro?',
      [
        { text: 'Cancelar' },
        { text: 'Eliminar', style: 'destructive', onPress: () => setPrs(prs.filter((pr) => pr.id !== id)) },
      ]
    );
  };

  const getCategoryIcon = (category: string): string => {
    const icons: Record<string, string> = {
      squat: 'ðŸ‹ï¸',
      bench: 'ðŸ’ª',
      deadlift: 'ðŸ‹ï¸â€â™‚ï¸',
      press: 'ðŸ¦¾',
      other: 'ðŸ’ª',
    };
    return icons[category] || 'ðŸ’ª';
  };

  const getCategoryColor = (category: string): string => {
    const colors: Record<string, string> = {
      squat: 'emerald',
      bench: 'blue',
      deadlift: 'red',
      press: 'amber',
      other: 'purple',
    };
    return colors[category] || 'zinc';
  };

  const calculate1RM = (weight: number, reps: number): number => {
    if (reps === 1) return weight;
    return Math.round(weight * (1 + reps / 30));
  };

  const getTopLifts = () => {
    const categories = ['squat', 'bench', 'deadlift', 'press'];
    return categories.map((cat) => {
      const categoryPRs = prs.filter((pr) => pr.category === cat);
      if (categoryPRs.length === 0) return null;
      
      const top = categoryPRs.reduce((max, pr) => {
        const current1RM = calculate1RM(pr.weight, pr.reps);
        const max1RM = calculate1RM(max.weight, max.reps);
        return current1RM > max1RM ? pr : max;
      });

      return {
        category: cat,
        pr: top,
        estimated1RM: calculate1RM(top.weight, top.reps),
      };
    }).filter(Boolean);
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
            Personal Records
          </Text>
          <TouchableOpacity onPress={() => setShowAddModal(!showAddModal)}>
            <Ionicons name={showAddModal ? 'close' : 'add-circle'} size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Category Filters */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row gap-2">
            {EXERCISE_CATEGORIES.map((cat) => (
              <TouchableOpacity
                key={cat.id}
                onPress={() => setFilter(cat.id)}
                className={`flex-row items-center px-4 py-2 rounded-lg ${
                  filter === cat.id
                    ? 'bg-primary'
                    : 'bg-zinc-900 border border-zinc-800'
                }`}
              >
                <Ionicons
                  name={cat.icon as any}
                  size={18}
                  color={filter === cat.id ? 'white' : '#71717A'}
                />
                <Text
                  className={`ml-2 font-semibold text-sm ${
                    filter === cat.id ? 'text-white' : 'text-zinc-400'
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
          {showAddModal ? (
            <View className="bg-zinc-900 rounded-xl p-6 mb-6 border border-zinc-800">
              <Text className="text-white font-bold text-lg mb-4">Nuevo PR</Text>

              <View className="mb-4">
                <Text className="text-zinc-400 text-sm mb-2">Ejercicio</Text>
                <TextInput
                  className="bg-zinc-800 rounded-xl px-4 py-3 text-white"
                  placeholder="Sentadilla, Press Banca..."
                  placeholderTextColor="#71717A"
                  value={newPR.exercise}
                  onChangeText={(text) => setNewPR({ ...newPR, exercise: text })}
                />
              </View>

              <View className="mb-4">
                <Text className="text-zinc-400 text-sm mb-2">Categoría</Text>
                <View className="flex-row flex-wrap gap-2">
                  {EXERCISE_CATEGORIES.filter((c) => c.id !== 'all').map((cat) => (
                    <TouchableOpacity
                      key={cat.id}
                      onPress={() => setNewPR({ ...newPR, category: cat.id as any })}
                      className={`px-3 py-2 rounded-lg ${
                        newPR.category === cat.id ? 'bg-primary' : 'bg-zinc-800'
                      }`}
                    >
                      <Text className={newPR.category === cat.id ? 'text-white font-bold' : 'text-zinc-400'}>
                        {cat.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <View className="flex-row gap-4 mb-4">
                <View className="flex-1">
                  <Text className="text-zinc-400 text-sm mb-2">Peso (kg)</Text>
                  <TextInput
                    className="bg-zinc-800 rounded-xl px-4 py-3 text-white text-lg font-bold"
                    placeholder="100"
                    placeholderTextColor="#71717A"
                    keyboardType="numeric"
                    value={newPR.weight}
                    onChangeText={(text) => setNewPR({ ...newPR, weight: text })}
                  />
                </View>
                <View className="flex-1">
                  <Text className="text-zinc-400 text-sm mb-2">Reps</Text>
                  <TextInput
                    className="bg-zinc-800 rounded-xl px-4 py-3 text-white text-lg font-bold"
                    placeholder="1"
                    placeholderTextColor="#71717A"
                    keyboardType="numeric"
                    value={newPR.reps}
                    onChangeText={(text) => setNewPR({ ...newPR, reps: text })}
                  />
                </View>
              </View>

              <View className="mb-4">
                <Text className="text-zinc-400 text-sm mb-2">Notas (opcional)</Text>
                <TextInput
                  className="bg-zinc-800 rounded-xl px-4 py-3 text-white"
                  placeholder="Detalles del lift..."
                  placeholderTextColor="#71717A"
                  multiline
                  numberOfLines={2}
                  value={newPR.notes}
                  onChangeText={(text) => setNewPR({ ...newPR, notes: text })}
                />
              </View>

              <TouchableOpacity
                onPress={addPR}
                className="bg-primary rounded-xl p-4 flex-row items-center justify-center"
              >
                <Ionicons name="checkmark-circle" size={20} color="white" />
                <Text className="text-white font-bold ml-2">Guardar PR</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              {/* Top Lifts Summary */}
              <View className="bg-zinc-900 rounded-xl p-6 mb-6 border border-zinc-800">
                <Text className="text-white font-bold text-lg mb-4">Top Lifts (1RM est.)</Text>
                <View className="flex-row flex-wrap gap-3">
                  {getTopLifts().map((item) => {
                    if (!item) return null;
                    const color = getCategoryColor(item.category);
                    return (
                      <View key={item.category} className={`flex-1 min-w-[45%] bg-${color}-500/10 rounded-lg p-3 border border-${color}-500/30`}>
                        <View className="flex-row items-center mb-2">
                          <Text className="text-2xl mr-2">{item.pr.icon}</Text>
                          <Text className={`text-${color}-400 text-xs font-bold`}>
                            {item.pr.exercise}
                          </Text>
                        </View>
                        <Text className="text-white text-2xl font-bold">
                          {item.estimated1RM} kg
                        </Text>
                        <Text className="text-zinc-400 text-xs mt-1">
                          {item.pr.weight}kg x{item.pr.reps}
                        </Text>
                      </View>
                    );
                  })}
                </View>
              </View>

              {/* PR History */}
              <View className="mb-4">
                <Text className="text-white font-bold text-lg mb-3">Historial de PRs</Text>
                {sortedPRs.length === 0 ? (
                  <View className="bg-zinc-900 rounded-xl p-8 items-center border border-zinc-800">
                    <Text className="text-6xl mb-3">ðŸ†</Text>
                    <Text className="text-white font-bold text-lg mb-2">Sin PRs Registrados</Text>
                    <Text className="text-zinc-400 text-center">
                      Agrega tus récords personales para trackear tu progreso
                    </Text>
                  </View>
                ) : (
                  sortedPRs.map((pr) => {
                    const color = getCategoryColor(pr.category);
                    const estimated1RM = calculate1RM(pr.weight, pr.reps);

                    return (
                      <View
                        key={pr.id}
                        className="bg-zinc-900 rounded-xl p-4 mb-3 border border-zinc-800"
                      >
                        <View className="flex-row items-start justify-between mb-3">
                          <View className="flex-row items-start flex-1">
                            <View className={`w-12 h-12 bg-${color}-500 rounded-xl items-center justify-center mr-3`}>
                              <Text className="text-2xl">{pr.icon}</Text>
                            </View>
                            <View className="flex-1">
                              <Text className="text-white font-bold text-lg mb-1">
                                {pr.exercise}
                              </Text>
                              <Text className="text-zinc-400 text-sm">
                                {format(pr.date, "d 'de' MMMM, yyyy", { locale: es })}
                              </Text>
                            </View>
                          </View>
                          <TouchableOpacity onPress={() => deletePR(pr.id)}>
                            <Ionicons name="trash" size={20} color="#EF4444" />
                          </TouchableOpacity>
                        </View>

                        <View className="flex-row gap-2 mb-3">
                          <View className={`flex-1 bg-${color}-500/10 rounded-lg p-3 border border-${color}-500/30`}>
                            <Text className="text-zinc-400 text-xs mb-1">Peso x Reps</Text>
                            <Text className="text-white font-bold text-xl">
                              {pr.weight}kg × {pr.reps}
                            </Text>
                          </View>
                          {pr.reps > 1 && (
                            <View className="flex-1 bg-primary/10 rounded-lg p-3 border border-primary/30">
                              <Text className="text-zinc-400 text-xs mb-1">1RM Estimado</Text>
                              <Text className="text-primary font-bold text-xl">
                                {estimated1RM} kg
                              </Text>
                            </View>
                          )}
                        </View>

                        {pr.notes && (
                          <View className="bg-zinc-800 rounded-lg p-3">
                            <Text className="text-zinc-300 text-sm">{pr.notes}</Text>
                          </View>
                        )}
                      </View>
                    );
                  })
                )}
              </View>
            </>
          )}

          {/* Tips */}
          <View className="bg-purple-500/10 rounded-xl p-4 border border-purple-500/30 mb-6">
            <View className="flex-row items-start">
              <Ionicons name="trophy" size={20} color="#A855F7" />
              <View className="flex-1 ml-3">
                <Text className="text-purple-400 font-bold mb-2">
                  Tips para PRs
                </Text>
                <Text className="text-purple-300 text-sm">
                  • Solo cuenta con técnica perfecta{'\n'}
                  • Graba tus PRs para verificar forma{'\n'}
                  • Descansa bien antes de intentos{'\n'}
                  • Progreso consistente &gt; PRs constantes
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

