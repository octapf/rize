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

interface PersonalRecord {
  id: string;
  exercise: string;
  category: 'strength' | 'endurance' | 'power' | 'cardio';
  weight?: number;
  reps?: number;
  time?: number;
  distance?: number;
  date: string;
  previousPR?: {
    weight?: number;
    reps?: number;
    time?: number;
    date: string;
  };
  improvement: number;
  icon: string;
  color: string;
}

interface MonthlyBest {
  month: string;
  totalPRs: number;
  topExercises: string[];
}

const PERSONAL_RECORDS: PersonalRecord[] = [
  {
    id: '1',
    exercise: 'Sentadilla',
    category: 'strength',
    weight: 160,
    reps: 1,
    date: '2025-01-25T18:00:00',
    previousPR: { weight: 155, reps: 1, date: '2025-01-10T18:00:00' },
    improvement: 3.2,
    icon: '🏋️',
    color: 'bg-red-500',
  },
  {
    id: '2',
    exercise: 'Press Banca',
    category: 'strength',
    weight: 120,
    reps: 1,
    date: '2025-01-22T17:00:00',
    previousPR: { weight: 115, reps: 1, date: '2024-12-28T17:00:00' },
    improvement: 4.3,
    icon: '💪',
    color: 'bg-blue-500',
  },
  {
    id: '3',
    exercise: 'Peso Muerto',
    category: 'strength',
    weight: 180,
    reps: 1,
    date: '2025-01-20T19:00:00',
    previousPR: { weight: 175, reps: 1, date: '2025-01-05T19:00:00' },
    improvement: 2.9,
    icon: '⚡',
    color: 'bg-amber-500',
  },
  {
    id: '4',
    exercise: 'Dominadas',
    category: 'endurance',
    weight: 0,
    reps: 22,
    date: '2025-01-18T16:00:00',
    previousPR: { weight: 0, reps: 18, date: '2024-12-20T16:00:00' },
    improvement: 22.2,
    icon: '🔥',
    color: 'bg-emerald-500',
  },
  {
    id: '5',
    exercise: '5K Running',
    category: 'cardio',
    time: 1260,
    distance: 5,
    date: '2025-01-15T07:00:00',
    previousPR: { time: 1320, date: '2024-12-05T07:00:00' },
    improvement: 4.5,
    icon: '🏃',
    color: 'bg-purple-500',
  },
  {
    id: '6',
    exercise: 'Press Militar',
    category: 'strength',
    weight: 75,
    reps: 1,
    date: '2025-01-12T18:30:00',
    previousPR: { weight: 72.5, reps: 1, date: '2024-11-25T18:30:00' },
    improvement: 3.4,
    icon: '🎯',
    color: 'bg-cyan-500',
  },
  {
    id: '7',
    exercise: 'Box Jump',
    category: 'power',
    weight: 0,
    reps: 1,
    date: '2025-01-10T15:00:00',
    previousPR: { weight: 0, reps: 1, date: '2024-10-15T15:00:00' },
    improvement: 15.4,
    icon: '⬆️',
    color: 'bg-orange-500',
  },
  {
    id: '8',
    exercise: 'Burpees (1 min)',
    category: 'endurance',
    reps: 32,
    date: '2025-01-08T10:00:00',
    previousPR: { reps: 28, date: '2024-12-01T10:00:00' },
    improvement: 14.3,
    icon: '💥',
    color: 'bg-pink-500',
  },
];

const MONTHLY_BESTS: MonthlyBest[] = [
  {
    month: 'Enero 2025',
    totalPRs: 8,
    topExercises: ['Sentadilla', 'Press Banca', 'Peso Muerto'],
  },
  {
    month: 'Diciembre 2024',
    totalPRs: 5,
    topExercises: ['Dominadas', 'Press Militar', '5K Running'],
  },
  {
    month: 'Noviembre 2024',
    totalPRs: 3,
    topExercises: ['Press Banca', 'Box Jump', 'Burpees'],
  },
];

export default function PersonalRecords() {
  const [records, setRecords] = useState(PERSONAL_RECORDS);
  const [filter, setFilter] = useState<'all' | 'strength' | 'endurance' | 'power' | 'cardio'>('all');

  const filters = [
    { id: 'all', label: 'Todos', icon: 'trophy' },
    { id: 'strength', label: 'Fuerza', icon: 'barbell' },
    { id: 'endurance', label: 'Resistencia', icon: 'fitness' },
    { id: 'power', label: 'Potencia', icon: 'flash' },
    { id: 'cardio', label: 'Cardio', icon: 'heart' },
  ];

  const filteredRecords = filter === 'all'
    ? records
    : records.filter((r) => r.category === filter);

  const addPR = () => {
    Alert.alert(
      'Nuevo PR',
      '¡Felicitaciones! Registra tu nuevo récord personal',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Registrar', onPress: () => Alert.alert('PR registrado') },
      ]
    );
  };

  const viewHistory = (record: PersonalRecord) => {
    Alert.alert(
      `Historial - ${record.exercise}`,
      `Todos los PRs de ${record.exercise}`,
      [{ text: 'OK' }]
    );
  };

  const shareRecord = (record: PersonalRecord) => {
    Alert.alert(
      'Compartir PR',
      `${record.exercise}: ${record.weight}kg x ${record.reps}`,
      [
        { text: 'Instagram Stories' },
        { text: 'WhatsApp' },
        { text: 'Twitter' },
        { text: 'Cancelar', style: 'cancel' },
      ]
    );
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatDate = (date: string) => {
    const d = new Date(date);
    return d.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'strength':
        return 'text-red-400';
      case 'endurance':
        return 'text-emerald-400';
      case 'power':
        return 'text-amber-400';
      case 'cardio':
        return 'text-purple-400';
      default:
        return 'text-zinc-400';
    }
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
            Récords Personales
          </Text>
          <TouchableOpacity onPress={addPR}>
            <Ionicons name="add-circle" size={28} color="#10B981" />
          </TouchableOpacity>
        </View>

        {/* Summary Card */}
        <View className="bg-zinc-900 rounded-xl p-4 border border-zinc-800 mb-4">
          <View className="flex-row items-center justify-between">
            <View className="flex-1">
              <Text className="text-zinc-400 text-xs mb-1">TOTAL PRs</Text>
              <Text className="text-white text-3xl font-bold">{records.length}</Text>
            </View>
            <View className="flex-1">
              <Text className="text-zinc-400 text-xs mb-1">ESTE MES</Text>
              <Text className="text-emerald-400 text-3xl font-bold">
                {MONTHLY_BESTS[0].totalPRs}
              </Text>
            </View>
            <View className="flex-1">
              <Text className="text-zinc-400 text-xs mb-1">MEJORA AVG</Text>
              <Text className="text-amber-400 text-3xl font-bold">
                {(records.reduce((sum, r) => sum + r.improvement, 0) / records.length).toFixed(1)}%
              </Text>
            </View>
          </View>
        </View>

        {/* Filters */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row gap-2">
            {filters.map((f) => (
              <TouchableOpacity
                key={f.id}
                onPress={() => setFilter(f.id as any)}
                className={`flex-row items-center px-4 py-2 rounded-lg ${
                  filter === f.id
                    ? 'bg-emerald-500'
                    : 'bg-zinc-900 border border-zinc-800'
                }`}
              >
                <Ionicons
                  name={f.icon as any}
                  size={18}
                  color={filter === f.id ? 'white' : '#71717A'}
                />
                <Text
                  className={`ml-2 font-semibold text-sm ${
                    filter === f.id ? 'text-white' : 'text-zinc-400'
                  }`}
                >
                  {f.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          {/* Personal Records */}
          {filteredRecords.map((record) => (
            <View
              key={record.id}
              className="bg-zinc-900 rounded-xl p-4 mb-4 border border-zinc-800"
            >
              {/* Header */}
              <View className="flex-row items-start justify-between mb-3">
                <View className="flex-row items-start flex-1">
                  <View className={`w-12 h-12 ${record.color} rounded-xl items-center justify-center mr-3`}>
                    <Text className="text-3xl">{record.icon}</Text>
                  </View>
                  <View className="flex-1">
                    <Text className="text-white font-bold text-lg mb-1">
                      {record.exercise}
                    </Text>
                    <Text className={`text-xs font-bold ${getCategoryColor(record.category)}`}>
                      {record.category.toUpperCase()}
                    </Text>
                  </View>
                </View>
                <View className="items-end">
                  <Text className="text-emerald-400 text-xs font-bold mb-1">
                    +{record.improvement.toFixed(1)}%
                  </Text>
                  <Ionicons name="trending-up" size={20} color="#10B981" />
                </View>
              </View>

              {/* Current PR */}
              <View className="bg-zinc-800 rounded-lg p-4 mb-3">
                <Text className="text-zinc-400 text-xs mb-2">RÉCORD ACTUAL</Text>
                <View className="flex-row items-center justify-between">
                  {record.weight !== undefined && (
                    <View className="flex-1">
                      <Text className="text-white text-3xl font-bold">
                        {record.weight}
                        <Text className="text-zinc-400 text-xl"> kg</Text>
                      </Text>
                      {record.reps && record.reps > 1 && (
                        <Text className="text-zinc-400 text-sm mt-1">
                          x {record.reps} reps
                        </Text>
                      )}
                    </View>
                  )}
                  {record.time !== undefined && (
                    <View className="flex-1">
                      <Text className="text-white text-3xl font-bold">
                        {formatTime(record.time)}
                      </Text>
                      {record.distance && (
                        <Text className="text-zinc-400 text-sm mt-1">
                          {record.distance} km
                        </Text>
                      )}
                    </View>
                  )}
                  {record.weight === undefined && record.time === undefined && record.reps && (
                    <View className="flex-1">
                      <Text className="text-white text-3xl font-bold">
                        {record.reps}
                        <Text className="text-zinc-400 text-xl"> reps</Text>
                      </Text>
                    </View>
                  )}
                  <View className="items-end">
                    <Text className="text-zinc-400 text-xs">FECHA</Text>
                    <Text className="text-white text-sm font-bold">
                      {formatDate(record.date)}
                    </Text>
                  </View>
                </View>
              </View>

              {/* Previous PR Comparison */}
              {record.previousPR && (
                <View className="bg-zinc-800/50 rounded-lg p-3 mb-3">
                  <Text className="text-zinc-400 text-xs mb-2">PR ANTERIOR</Text>
                  <View className="flex-row items-center justify-between">
                    <View>
                      {record.previousPR.weight !== undefined && (
                        <Text className="text-zinc-400 text-lg">
                          {record.previousPR.weight} kg
                          {record.previousPR.reps && record.previousPR.reps > 1
                            ? ` x ${record.previousPR.reps}`
                            : ''}
                        </Text>
                      )}
                      {record.previousPR.time !== undefined && (
                        <Text className="text-zinc-400 text-lg">
                          {formatTime(record.previousPR.time)}
                        </Text>
                      )}
                      {record.previousPR.weight === undefined &&
                        record.previousPR.time === undefined &&
                        record.previousPR.reps && (
                          <Text className="text-zinc-400 text-lg">
                            {record.previousPR.reps} reps
                          </Text>
                        )}
                    </View>
                    <Text className="text-zinc-500 text-xs">
                      {formatDate(record.previousPR.date)}
                    </Text>
                  </View>
                </View>
              )}

              {/* Actions */}
              <View className="flex-row gap-2">
                <TouchableOpacity
                  onPress={() => viewHistory(record)}
                  className="flex-1 bg-blue-500/10 rounded-lg p-3 border border-blue-500/30"
                >
                  <Text className="text-blue-400 text-sm font-bold text-center">
                    Ver Historial
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => shareRecord(record)}
                  className="flex-1 bg-emerald-500/10 rounded-lg p-3 border border-emerald-500/30"
                >
                  <Text className="text-emerald-400 text-sm font-bold text-center">
                    Compartir
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}

          {/* Monthly Bests */}
          <Text className="text-white font-bold text-xl mb-4">Mejores Meses</Text>
          {MONTHLY_BESTS.map((monthly, index) => (
            <View
              key={index}
              className="bg-zinc-900 rounded-xl p-4 mb-4 border border-zinc-800"
            >
              <View className="flex-row items-center justify-between mb-3">
                <View className="flex-1">
                  <Text className="text-white font-bold text-lg">{monthly.month}</Text>
                  <Text className="text-zinc-400 text-sm">
                    {monthly.totalPRs} récords nuevos
                  </Text>
                </View>
                <Ionicons name="trophy" size={28} color="#F59E0B" />
              </View>

              <View>
                <Text className="text-zinc-400 text-xs mb-2">TOP EJERCICIOS</Text>
                <View className="flex-row flex-wrap gap-2">
                  {monthly.topExercises.map((exercise, i) => (
                    <View key={i} className="bg-amber-500/10 rounded-lg px-3 py-1">
                      <Text className="text-amber-400 text-sm">{exercise}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Info Card */}
        <View className="px-6 pb-6 pt-2">
          <View className="bg-emerald-500/10 rounded-xl p-4 border border-emerald-500/30">
            <View className="flex-row items-start">
              <Ionicons name="trophy" size={20} color="#10B981" />
              <View className="flex-1 ml-3">
                <Text className="text-emerald-400 font-bold mb-2">
                  Progresión Sistemática
                </Text>
                <Text className="text-emerald-300 text-sm">
                  Cada PR es un hito. Celebra tus victorias y sigue superándote.
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
