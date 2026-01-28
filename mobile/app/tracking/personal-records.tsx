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
  category: 'strength' | 'volume' | 'endurance' | 'bodyweight';
  type: '1RM' | '3RM' | '5RM' | 'maxReps' | 'maxWeight' | 'maxVolume';
  value: number;
  unit: string;
  date: Date;
  previousRecord?: number;
  notes?: string;
}

const CATEGORIES = [
  { value: 'strength', label: 'Fuerza', icon: 'barbell', color: 'red' },
  { value: 'volume', label: 'Volumen', icon: 'fitness', color: 'blue' },
  { value: 'endurance', label: 'Resistencia', icon: 'pulse', color: 'emerald' },
  { value: 'bodyweight', label: 'Corporal', icon: 'body', color: 'purple' },
];

const MOCK_RECORDS: PersonalRecord[] = [
  {
    id: '1',
    exercise: 'Press Banca',
    category: 'strength',
    type: '1RM',
    value: 120,
    unit: 'kg',
    date: new Date(2026, 0, 27),
    previousRecord: 115,
    notes: 'Nueva marca personal! Técnica perfecta',
  },
  {
    id: '2',
    exercise: 'Sentadilla',
    category: 'strength',
    type: '1RM',
    value: 160,
    unit: 'kg',
    date: new Date(2026, 0, 20),
    previousRecord: 155,
  },
  {
    id: '3',
    exercise: 'Peso Muerto',
    category: 'strength',
    type: '5RM',
    value: 180,
    unit: 'kg',
    date: new Date(2026, 0, 15),
    previousRecord: 175,
  },
  {
    id: '4',
    exercise: 'Dominadas',
    category: 'bodyweight',
    type: 'maxReps',
    value: 18,
    unit: 'reps',
    date: new Date(2026, 0, 10),
    previousRecord: 15,
  },
  {
    id: '5',
    exercise: 'Push Day',
    category: 'volume',
    type: 'maxVolume',
    value: 12500,
    unit: 'kg',
    date: new Date(2026, 0, 5),
    notes: 'Volumen total de la sesión',
  },
];

export default function PersonalRecords() {
  const [records, setRecords] = useState(MOCK_RECORDS);
  const [selectedCategory, setSelectedCategory] = useState<string>('strength');

  const deleteRecord = (id: string) => {
    Alert.alert(
      'Eliminar Récord',
      '¿Estás seguro?',
      [
        { text: 'Cancelar' },
        { text: 'Eliminar', style: 'destructive', onPress: () => setRecords(records.filter((r) => r.id !== id)) },
      ]
    );
  };

  const addNewRecord = () => {
    Alert.alert('Próximamente', 'Formulario para añadir nuevo PR en desarrollo');
  };

  const getTypeLabel = (type: string): string => {
    const labels: { [key: string]: string } = {
      '1RM': '1 Rep Max',
      '3RM': '3 Reps Max',
      '5RM': '5 Reps Max',
      'maxReps': 'Máx Repeticiones',
      'maxWeight': 'Máximo Peso',
      'maxVolume': 'Máximo Volumen',
    };
    return labels[type] || type;
  };

  const getCategoryInfo = (category: string) => {
    return CATEGORIES.find((c) => c.value === category) || CATEGORIES[0];
  };

  const filteredRecords = records.filter((r) => r.category === selectedCategory);

  const getTotalPRs = () => records.length;
  const getPRsThisMonth = () => {
    const now = new Date();
    return records.filter((r) => 
      r.date.getMonth() === now.getMonth() && r.date.getFullYear() === now.getFullYear()
    ).length;
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
          <TouchableOpacity onPress={addNewRecord}>
            <Ionicons name="add-circle" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          {/* Stats */}
          <View className="flex-row gap-3 mb-6">
            <View className="flex-1 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-xl p-4">
              <Text className="text-white opacity-90 text-sm mb-1">Total PRs</Text>
              <Text className="text-white text-4xl font-bold">{getTotalPRs()}</Text>
            </View>
            <View className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-4">
              <Text className="text-white opacity-90 text-sm mb-1">Este Mes</Text>
              <Text className="text-white text-4xl font-bold">{getPRsThisMonth()}</Text>
            </View>
          </View>

          {/* Categories */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6">
            <View className="flex-row gap-2">
              {CATEGORIES.map((category) => (
                <TouchableOpacity
                  key={category.value}
                  onPress={() => setSelectedCategory(category.value)}
                  className={`px-5 py-3 rounded-xl flex-row items-center ${
                    selectedCategory === category.value
                      ? `bg-${category.color}-500`
                      : 'bg-zinc-900 border border-zinc-800'
                  }`}
                >
                  <Ionicons
                    name={category.icon as any}
                    size={18}
                    color={selectedCategory === category.value ? 'white' : '#71717A'}
                  />
                  <Text
                    className={`ml-2 font-bold ${
                      selectedCategory === category.value ? 'text-white' : 'text-zinc-400'
                    }`}
                  >
                    {category.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          {/* Records List */}
          {filteredRecords.length === 0 ? (
            <View className="bg-zinc-900 rounded-xl p-8 items-center border border-zinc-800">
              <Text className="text-6xl mb-3">🏆</Text>
              <Text className="text-white font-bold text-lg mb-2">Sin Récords</Text>
              <Text className="text-zinc-400 text-center">
                Empieza a registrar tus logros personales
              </Text>
            </View>
          ) : (
            filteredRecords
              .sort((a, b) => b.date.getTime() - a.date.getTime())
              .map((record) => {
                const categoryInfo = getCategoryInfo(record.category);
                const improvement = record.previousRecord
                  ? ((record.value - record.previousRecord) / record.previousRecord * 100).toFixed(1)
                  : null;

                return (
                  <View key={record.id} className="bg-zinc-900 rounded-xl p-5 mb-4 border border-zinc-800">
                    <View className="flex-row items-start justify-between mb-4">
                      <View className="flex-row items-start flex-1">
                        <View className={`w-14 h-14 bg-${categoryInfo.color}-500 rounded-xl items-center justify-center mr-4`}>
                          <Ionicons name={categoryInfo.icon as any} size={28} color="white" />
                        </View>
                        <View className="flex-1">
                          <Text className="text-white font-bold text-xl mb-1">
                            {record.exercise}
                          </Text>
                          <Text className="text-zinc-400 text-sm mb-2">
                            {getTypeLabel(record.type)}
                          </Text>
                          <Text className="text-zinc-500 text-xs">
                            {record.date.toLocaleDateString('es-ES', { 
                              day: 'numeric', 
                              month: 'long', 
                              year: 'numeric' 
                            })}
                          </Text>
                        </View>
                      </View>
                      <TouchableOpacity onPress={() => deleteRecord(record.id)}>
                        <Ionicons name="trash" size={20} color="#EF4444" />
                      </TouchableOpacity>
                    </View>

                    {/* Value */}
                    <View className={`bg-${categoryInfo.color}-500 rounded-xl p-4 mb-3`}>
                      <Text className="text-white opacity-90 text-sm mb-1">Récord Personal</Text>
                      <View className="flex-row items-baseline">
                        <Text className="text-white text-5xl font-bold mr-2">
                          {record.value}
                        </Text>
                        <Text className="text-white text-2xl opacity-90">
                          {record.unit}
                        </Text>
                      </View>
                    </View>

                    {/* Improvement */}
                    {improvement && (
                      <View className="bg-emerald-500/10 rounded-lg p-3 mb-3 border border-emerald-500/30">
                        <View className="flex-row items-center justify-between">
                          <View className="flex-row items-center">
                            <Ionicons name="trending-up" size={20} color="#10B981" />
                            <Text className="text-emerald-400 font-bold ml-2">
                              +{improvement}% mejora
                            </Text>
                          </View>
                          <Text className="text-emerald-300 text-sm">
                            Anterior: {record.previousRecord} {record.unit}
                          </Text>
                        </View>
                      </View>
                    )}

                    {/* Notes */}
                    {record.notes && (
                      <View className="bg-zinc-800 rounded-lg p-3">
                        <Text className="text-zinc-300 text-sm">{record.notes}</Text>
                      </View>
                    )}
                  </View>
                );
              })
          )}

          {/* Tips */}
          <View className="bg-amber-500/10 rounded-xl p-4 border border-amber-500/30 mb-6 mt-4">
            <View className="flex-row items-start">
              <Ionicons name="trophy" size={20} color="#F59E0B" />
              <View className="flex-1 ml-3">
                <Text className="text-amber-400 font-bold mb-2">
                  Tips para Nuevos PRs
                </Text>
                <Text className="text-amber-300 text-sm">
                  • No intentes PRs cuando estés fatigado{'\n'}
                  • Calentamiento específico es crucial{'\n'}
                  • Siempre con spotter en ejercicios pesados{'\n'}
                  • Técnica perfecta > ego lifting{'\n'}
                  • Descansa bien la noche anterior{'\n'}
                  • Celebra cada logro, por pequeño que sea!
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
