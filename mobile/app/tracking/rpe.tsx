import React, { useState } from 'react';
import { Text } from '@/components/ui/Text';
import { View, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';;
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface RPEEntry {
  id: string;
  date: Date;
  exercise: string;
  sets: number;
  reps: number;
  weight: number;
  rpe: number; // 1-10
  notes?: string;
}

const RPE_SCALE = [
  { value: 10, label: 'Max Esfuerzo', description: 'Imposible hacer otra rep', color: 'red', reps: '0 RIR' },
  { value: 9.5, label: 'Casi Max', description: 'Quizás 1 rep más', color: 'red', reps: '0-1 RIR' },
  { value: 9, label: 'Muy Duro', description: '1 rep más seguro', color: 'orange', reps: '1 RIR' },
  { value: 8.5, label: 'Duro+', description: '1-2 reps más', color: 'orange', reps: '1-2 RIR' },
  { value: 8, label: 'Duro', description: '2 reps más', color: 'amber', reps: '2 RIR' },
  { value: 7.5, label: 'Moderado+', description: '2-3 reps más', color: 'amber', reps: '2-3 RIR' },
  { value: 7, label: 'Moderado', description: '3 reps más', color: 'yellow', reps: '3 RIR' },
  { value: 6, label: 'Moderado-', description: '4 reps más', color: 'lime', reps: '4 RIR' },
  { value: 5, label: 'Fácil', description: '5+ reps más', color: 'primary', reps: '5+ RIR' },
  { value: 4, label: 'Muy Fácil', description: 'Calentamiento', color: 'blue', reps: 'Warmup' },
];

const COMMON_EXERCISES = [
  'Press Banca',
  'Sentadilla',
  'Peso Muerto',
  'Press Militar',
  'Dominadas',
  'Remo',
];

const MOCK_ENTRIES: RPEEntry[] = [
  {
    id: '1',
    date: new Date(2026, 0, 27),
    exercise: 'Press Banca',
    sets: 4,
    reps: 6,
    weight: 100,
    rpe: 8.5,
    notes: 'Última serie muy dura',
  },
  {
    id: '2',
    date: new Date(2026, 0, 25),
    exercise: 'Sentadilla',
    sets: 3,
    reps: 8,
    weight: 120,
    rpe: 9,
  },
  {
    id: '3',
    date: new Date(2026, 0, 23),
    exercise: 'Press Banca',
    sets: 4,
    reps: 6,
    weight: 97.5,
    rpe: 8,
  },
];

export default function RPETracker() {
  const [entries, setEntries] = useState(MOCK_ENTRIES);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newEntry, setNewEntry] = useState({
    exercise: '',
    sets: '',
    reps: '',
    weight: '',
    rpe: 8,
    notes: '',
  });

  const addEntry = () => {
    if (!newEntry.exercise || !newEntry.sets || !newEntry.reps || !newEntry.weight) {
      Alert.alert('Error', 'Completa todos los campos requeridos');
      return;
    }

    const entry: RPEEntry = {
      id: Date.now().toString(),
      date: new Date(),
      exercise: newEntry.exercise,
      sets: parseInt(newEntry.sets),
      reps: parseInt(newEntry.reps),
      weight: parseFloat(newEntry.weight),
      rpe: newEntry.rpe,
      notes: newEntry.notes || undefined,
    };

    setEntries([entry, ...entries]);
    setNewEntry({ exercise: '', sets: '', reps: '', weight: '', rpe: 8, notes: '' });
    setShowAddForm(false);
    Alert.alert('Entrada Guardada! 📊', 'RPE registrado');
  };

  const deleteEntry = (id: string) => {
    Alert.alert(
      'Eliminar Entrada',
      '¿Estás seguro?',
      [
        { text: 'Cancelar' },
        { text: 'Eliminar', style: 'destructive', onPress: () => setEntries(entries.filter((e) => e.id !== id)) },
      ]
    );
  };

  const getRPEInfo = (rpe: number) => {
    return RPE_SCALE.find((r) => r.value === rpe) || RPE_SCALE[5];
  };

  const getAverageRPE = (exercise?: string) => {
    const filtered = exercise
      ? entries.filter((e) => e.exercise === exercise)
      : entries;

    if (filtered.length === 0) return null;

    const avg = filtered.reduce((sum, e) => sum + e.rpe, 0) / filtered.length;
    return avg.toFixed(1);
  };

  const getProgressSuggestion = (exercise: string) => {
    const exerciseEntries = entries
      .filter((e) => e.exercise === exercise)
      .sort((a, b) => b.date.getTime() - a.date.getTime())
      .slice(0, 3);

    if (exerciseEntries.length < 2) return null;

    const avgRPE = exerciseEntries.reduce((sum, e) => sum + e.rpe, 0) / exerciseEntries.length;

    if (avgRPE <= 7.5) {
      return {
        message: 'Puedes aumentar peso o volumen',
        color: 'primary',
        icon: 'trending-up',
      };
    } else if (avgRPE >= 9) {
      return {
        message: 'Considera reducir peso o volumen',
        color: 'amber',
        icon: 'warning',
      };
    }

    return {
      message: 'Mantén peso actual, progresando bien',
      color: 'blue',
      icon: 'checkmark-circle',
    };
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
            RPE Tracker
          </Text>
          <TouchableOpacity onPress={() => setShowAddForm(!showAddForm)}>
            <Ionicons name={showAddForm ? 'close' : 'add-circle'} size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          {/* Add Form */}
          {showAddForm ? (
            <View className="bg-zinc-900 rounded-xl p-6 mb-6 border border-zinc-800">
              <Text className="text-white font-bold text-lg mb-4">Registrar RPE</Text>

              {/* Exercise */}
              <View className="mb-4">
                <Text className="text-zinc-400 text-sm mb-2">Ejercicio</Text>
                <View className="flex-row flex-wrap gap-2 mb-2">
                  {COMMON_EXERCISES.map((ex) => (
                    <TouchableOpacity
                      key={ex}
                      onPress={() => setNewEntry({ ...newEntry, exercise: ex })}
                      className={`px-3 py-2 rounded-lg ${
                        newEntry.exercise === ex ? 'bg-primary' : 'bg-zinc-800'
                      }`}
                    >
                      <Text className={`text-sm font-bold ${newEntry.exercise === ex ? 'text-white' : 'text-zinc-400'}`}>
                        {ex}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
                <TextInput
                  className="bg-zinc-800 rounded-lg px-4 py-3 text-white"
                  placeholder="O escribe otro ejercicio..."
                  placeholderTextColor="#71717A"
                  value={newEntry.exercise}
                  onChangeText={(text) => setNewEntry({ ...newEntry, exercise: text })}
                />
              </View>

              {/* Sets, Reps, Weight */}
              <View className="flex-row gap-3 mb-4">
                <View className="flex-1">
                  <Text className="text-zinc-400 text-sm mb-2">Series</Text>
                  <TextInput
                    className="bg-zinc-800 rounded-lg px-4 py-3 text-white font-bold"
                    placeholder="4"
                    placeholderTextColor="#71717A"
                    keyboardType="numeric"
                    value={newEntry.sets}
                    onChangeText={(text) => setNewEntry({ ...newEntry, sets: text })}
                  />
                </View>
                <View className="flex-1">
                  <Text className="text-zinc-400 text-sm mb-2">Reps</Text>
                  <TextInput
                    className="bg-zinc-800 rounded-lg px-4 py-3 text-white font-bold"
                    placeholder="6"
                    placeholderTextColor="#71717A"
                    keyboardType="numeric"
                    value={newEntry.reps}
                    onChangeText={(text) => setNewEntry({ ...newEntry, reps: text })}
                  />
                </View>
                <View className="flex-1">
                  <Text className="text-zinc-400 text-sm mb-2">Peso (kg)</Text>
                  <TextInput
                    className="bg-zinc-800 rounded-lg px-4 py-3 text-white font-bold"
                    placeholder="100"
                    placeholderTextColor="#71717A"
                    keyboardType="decimal-pad"
                    value={newEntry.weight}
                    onChangeText={(text) => setNewEntry({ ...newEntry, weight: text })}
                  />
                </View>
              </View>

              {/* RPE Scale */}
              <Text className="text-zinc-400 text-sm mb-3">RPE (Esfuerzo Percibido)</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-4">
                <View className="flex-row gap-2">
                  {RPE_SCALE.map((scale) => (
                    <TouchableOpacity
                      key={scale.value}
                      onPress={() => setNewEntry({ ...newEntry, rpe: scale.value })}
                      className={`w-20 rounded-xl p-3 ${
                        newEntry.rpe === scale.value
                          ? `bg-${scale.color}-500`
                          : 'bg-zinc-800'
                      }`}
                    >
                      <Text className={`text-center font-bold text-2xl mb-1 ${newEntry.rpe === scale.value ? 'text-white' : 'text-zinc-400'}`}>
                        {scale.value}
                      </Text>
                      <Text className={`text-center text-xs ${newEntry.rpe === scale.value ? 'text-white' : 'text-zinc-500'}`}>
                        {scale.reps}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>

              {/* Selected RPE Info */}
              {newEntry.rpe && (
                <View className={`bg-${getRPEInfo(newEntry.rpe).color}-500/10 rounded-lg p-3 mb-4 border border-${getRPEInfo(newEntry.rpe).color}-500/30`}>
                  <Text className={`text-${getRPEInfo(newEntry.rpe).color}-400 font-bold mb-1`}>
                    {getRPEInfo(newEntry.rpe).label}
                  </Text>
                  <Text className={`text-${getRPEInfo(newEntry.rpe).color}-300 text-sm`}>
                    {getRPEInfo(newEntry.rpe).description}
                  </Text>
                </View>
              )}

              {/* Notes */}
              <View className="mb-4">
                <Text className="text-zinc-400 text-sm mb-2">Notas (opcional)</Text>
                <TextInput
                  className="bg-zinc-800 rounded-lg px-4 py-3 text-white"
                  placeholder="Ej: Última serie muy dura..."
                  placeholderTextColor="#71717A"
                  multiline
                  value={newEntry.notes}
                  onChangeText={(text) => setNewEntry({ ...newEntry, notes: text })}
                />
              </View>

              <TouchableOpacity
                onPress={addEntry}
                className="bg-primary rounded-xl p-4 flex-row items-center justify-center"
              >
                <Ionicons name="checkmark-circle" size={20} color="white" />
                <Text className="text-white font-bold ml-2">Guardar RPE</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              {/* Average RPE */}
              <View className="bg-gradient-to-r from-primary to-[#7D0EBE] rounded-xl p-6 mb-6">
                <Text className="text-white opacity-90 text-sm mb-1">RPE Promedio</Text>
                <Text className="text-white text-6xl font-bold mb-2">
                  {getAverageRPE() || '-'}
                </Text>
                <Text className="text-white opacity-90">
                  Últimas {entries.length} sesiones registradas
                </Text>
              </View>

              {/* Entries */}
              <Text className="text-white font-bold text-lg mb-4">Historial</Text>
              {entries.length === 0 ? (
                <View className="bg-zinc-900 rounded-xl p-8 items-center border border-zinc-800">
                  <Text className="text-6xl mb-3">📊</Text>
                  <Text className="text-white font-bold text-lg mb-2">Sin Entradas</Text>
                  <Text className="text-zinc-400 text-center">
                    Empieza a trackear tu esfuerzo percibido
                  </Text>
                </View>
              ) : (
                entries
                  .sort((a, b) => b.date.getTime() - a.date.getTime())
                  .map((entry) => {
                    const rpeInfo = getRPEInfo(entry.rpe);
                    const suggestion = getProgressSuggestion(entry.exercise);

                    return (
                      <View key={entry.id} className="bg-zinc-900 rounded-xl p-4 mb-4 border border-zinc-800">
                        <View className="flex-row items-start justify-between mb-3">
                          <View className="flex-1">
                            <Text className="text-white font-bold text-lg mb-1">
                              {entry.exercise}
                            </Text>
                            <Text className="text-zinc-400 text-sm">
                              {format(entry.date, "d 'de' MMMM", { locale: es })}
                            </Text>
                          </View>
                          <TouchableOpacity onPress={() => deleteEntry(entry.id)}>
                            <Ionicons name="trash" size={20} color="#EF4444" />
                          </TouchableOpacity>
                        </View>

                        {/* Stats */}
                        <View className="flex-row gap-2 mb-3">
                          <View className="bg-zinc-800 rounded-lg px-3 py-2">
                            <Text className="text-zinc-400 text-xs">Series</Text>
                            <Text className="text-white font-bold">{entry.sets}</Text>
                          </View>
                          <View className="bg-zinc-800 rounded-lg px-3 py-2">
                            <Text className="text-zinc-400 text-xs">Reps</Text>
                            <Text className="text-white font-bold">{entry.reps}</Text>
                          </View>
                          <View className="bg-zinc-800 rounded-lg px-3 py-2">
                            <Text className="text-zinc-400 text-xs">Peso</Text>
                            <Text className="text-white font-bold">{entry.weight}kg</Text>
                          </View>
                          <View className={`bg-${rpeInfo.color}-500/10 rounded-lg px-3 py-2 border border-${rpeInfo.color}-500/30`}>
                            <Text className={`text-${rpeInfo.color}-400 text-xs`}>RPE</Text>
                            <Text className={`text-${rpeInfo.color}-400 font-bold`}>{entry.rpe}</Text>
                          </View>
                        </View>

                        {/* RPE Info */}
                        <View className={`bg-${rpeInfo.color}-500/10 rounded-lg p-3 mb-3 border border-${rpeInfo.color}-500/30`}>
                          <Text className={`text-${rpeInfo.color}-400 font-bold text-sm mb-1`}>
                            {rpeInfo.label} • {rpeInfo.reps}
                          </Text>
                          <Text className={`text-${rpeInfo.color}-300 text-xs`}>
                            {rpeInfo.description}
                          </Text>
                        </View>

                        {/* Suggestion */}
                        {suggestion && (
                          <View className={`bg-${suggestion.color}-500/10 rounded-lg p-3 mb-2 border border-${suggestion.color}-500/30`}>
                            <View className="flex-row items-center">
                              <Ionicons name={suggestion.icon as any} size={16} color={`#${getColorHex(suggestion.color)}`} />
                              <Text className={`text-${suggestion.color}-400 text-sm ml-2`}>
                                {suggestion.message}
                              </Text>
                            </View>
                          </View>
                        )}

                        {/* Notes */}
                        {entry.notes && (
                          <View className="bg-zinc-800 rounded-lg p-3">
                            <Text className="text-zinc-300 text-sm">{entry.notes}</Text>
                          </View>
                        )}
                      </View>
                    );
                  })
              )}
            </>
          )}

          {/* RPE Scale Reference */}
          <View className="bg-zinc-900 rounded-xl p-4 mb-6 border border-zinc-800">
            <Text className="text-white font-bold text-lg mb-3">Escala RPE</Text>
            {RPE_SCALE.slice().reverse().map((scale) => (
              <View key={scale.value} className="flex-row items-center mb-3 pb-3 border-b border-zinc-800 last:border-b-0">
                <View className={`w-12 h-12 bg-${scale.color}-500 rounded-xl items-center justify-center mr-3`}>
                  <Text className="text-white font-bold text-lg">{scale.value}</Text>
                </View>
                <View className="flex-1">
                  <Text className="text-white font-bold mb-1">{scale.label}</Text>
                  <Text className="text-zinc-400 text-sm">{scale.description}</Text>
                  <Text className={`text-${scale.color}-400 text-xs mt-1`}>{scale.reps}</Text>
                </View>
              </View>
            ))}
          </View>

          {/* Tips */}
          <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-6">
            <View className="flex-row items-start">
              <Ionicons name="bulb" size={20} color="#9D12DE" />
              <View className="flex-1 ml-3">
                <Text className="text-primary/80 font-bold mb-2">
                  Cómo Usar RPE
                </Text>
                <Text className="text-primary/60 text-sm">
                  • Objetivo hipertrofia: RPE 7-9{'\n'}
                  • Objetivo fuerza: RPE 7-8.5{'\n'}
                  • Siempre deja 1-2 reps en reserva{'\n'}
                  • RPE 10 solo en tests de max{'\n'}
                  • Trackea para ajustar peso/volumen{'\n'}
                  • Aprende a ser honesto contigo mismo
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

function getColorHex(color: string): string {
  const colors: { [key: string]: string } = {
    primary: '9D12DE',
    blue: '3B82F6',
    amber: 'F59E0B',
    red: 'EF4444',
    orange: 'F97316',
    yellow: 'FDE047',
    lime: '84CC16',
  };
  return colors[color] || '3B82F6';
}

