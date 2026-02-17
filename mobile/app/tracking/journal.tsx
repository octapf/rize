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

interface JournalEntry {
  id: string;
  date: Date;
  workoutType: string;
  mood: 'bad' | 'ok' | 'good' | 'great';
  energy: 1 | 2 | 3 | 4 | 5;
  sleep: number; // hours
  bodyWeight?: number;
  notes: string;
  achievements?: string[];
  challenges?: string[];
}

const MOOD_OPTIONS = [
  { value: 'bad', emoji: '??', label: 'Mal', color: 'red' },
  { value: 'ok', emoji: '??ê', label: 'OK', color: 'amber' },
  { value: 'good', emoji: '??', label: 'Bien', color: 'blue' },
  { value: 'great', emoji: '??É', label: 'Genial', color: 'primary' },
];

const MOCK_ENTRIES: JournalEntry[] = [
  {
    id: '1',
    date: new Date(2026, 0, 27),
    workoutType: 'Push Day A',
    mood: 'great',
    energy: 5,
    sleep: 7.5,
    bodyWeight: 78.5,
    notes: 'Excelente sesiÛn! Nuevo PR en press banca 100kg x6. Me sentÌ muy fuerte hoy.',
    achievements: ['PR en press banca', 'TÈcnica perfecta'],
    challenges: ['Press militar un poco pesado'],
  },
  {
    id: '2',
    date: new Date(2026, 0, 25),
    workoutType: 'Pull Day A',
    mood: 'good',
    energy: 4,
    sleep: 8,
    bodyWeight: 78.2,
    notes: 'Peso muerto se sintiÛ bien, dominadas mejorando.',
    achievements: ['10 dominadas limpias'],
  },
  {
    id: '3',
    date: new Date(2026, 0, 23),
    workoutType: 'Leg Day A',
    mood: 'ok',
    energy: 3,
    sleep: 6,
    notes: 'Poco sueÒo, energÌa baja. CompletÈ el workout pero difÌcil.',
    challenges: ['Fatiga general', 'Bajo en energÌa'],
  },
];

export default function WorkoutJournal() {
  const [entries, setEntries] = useState(MOCK_ENTRIES);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newEntry, setNewEntry] = useState({
    workoutType: '',
    mood: 'good',
    energy: 4,
    sleep: '',
    bodyWeight: '',
    notes: '',
  });

  const addEntry = () => {
    if (!newEntry.workoutType || !newEntry.notes) {
      Alert.alert('Error', 'Ingresa tipo de workout y notas');
      return;
    }

    const entry: JournalEntry = {
      id: Date.now().toString(),
      date: new Date(),
      workoutType: newEntry.workoutType,
      mood: newEntry.mood as any,
      energy: newEntry.energy as any,
      sleep: parseFloat(newEntry.sleep) || 0,
      bodyWeight: newEntry.bodyWeight ? parseFloat(newEntry.bodyWeight) : undefined,
      notes: newEntry.notes,
    };

    setEntries([entry, ...entries]);
    setNewEntry({ workoutType: '', mood: 'good', energy: 4, sleep: '', bodyWeight: '', notes: '' });
    setShowAddForm(false);
    Alert.alert('Entrada Guardada! üìù', 'Registro aÒadido al diario');
  };

  const deleteEntry = (id: string) => {
    Alert.alert(
      'Eliminar Entrada',
      'øEst·s seguro?',
      [
        { text: 'Cancelar' },
        { text: 'Eliminar', style: 'destructive', onPress: () => setEntries(entries.filter((e) => e.id !== id)) },
      ]
    );
  };

  const getMoodInfo = (mood: string) => {
    return MOOD_OPTIONS.find((m) => m.value === mood) || MOOD_OPTIONS[0];
  };

  const getWeeklyAverage = () => {
    const lastWeek = entries.filter((e) => {
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return e.date >= weekAgo;
    });

    if (lastWeek.length === 0) return null;

    return {
      energy: (lastWeek.reduce((sum, e) => sum + e.energy, 0) / lastWeek.length).toFixed(1),
      sleep: (lastWeek.reduce((sum, e) => sum + e.sleep, 0) / lastWeek.length).toFixed(1),
    };
  };

  const stats = getWeeklyAverage();

  return (
    <View className="flex-1 bg-zinc-950">
      {/* Header */}
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1 ml-3">
            Workout Journal
          </Text>
          <TouchableOpacity onPress={() => setShowAddForm(!showAddForm)}>
            <Ionicons name={showAddForm ? 'close' : 'add-circle'} size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          {showAddForm ? (
            <View className="bg-zinc-900 rounded-xl p-6 mb-6 border border-zinc-800">
              <Text className="text-white font-bold text-lg mb-4">Nueva Entrada</Text>

              {/* Workout Type */}
              <View className="mb-4">
                <Text className="text-zinc-400 text-sm mb-2">Tipo de Workout</Text>
                <TextInput
                  className="bg-zinc-800 rounded-xl px-4 py-3 text-white text-lg font-bold"
                  placeholder="Push Day A, Pull Day B, etc."
                  placeholderTextColor="#71717A"
                  value={newEntry.workoutType}
                  onChangeText={(text) => setNewEntry({ ...newEntry, workoutType: text })}
                />
              </View>

              {/* Mood */}
              <View className="mb-4">
                <Text className="text-zinc-400 text-sm mb-2">Estado de √Ånimo</Text>
                <View className="flex-row gap-2">
                  {MOOD_OPTIONS.map((mood) => (
                    <TouchableOpacity
                      key={mood.value}
                      onPress={() => setNewEntry({ ...newEntry, mood: mood.value })}
                      className={`flex-1 py-3 rounded-lg ${
                        newEntry.mood === mood.value ? `bg-${mood.color}-500` : 'bg-zinc-800'
                      }`}
                    >
                      <Text className="text-center text-2xl mb-1">{mood.emoji}</Text>
                      <Text className={`text-center text-xs font-bold ${newEntry.mood === mood.value ? 'text-white' : 'text-zinc-400'}`}>
                        {mood.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Energy */}
              <View className="mb-4">
                <Text className="text-zinc-400 text-sm mb-2">EnergÌa (1-5)</Text>
                <View className="flex-row gap-2">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <TouchableOpacity
                      key={level}
                      onPress={() => setNewEntry({ ...newEntry, energy: level })}
                      className={`flex-1 py-3 rounded-lg ${
                        newEntry.energy === level ? 'bg-amber-500' : 'bg-zinc-800'
                      }`}
                    >
                      <Text className={`text-center text-xl font-bold ${newEntry.energy === level ? 'text-white' : 'text-zinc-400'}`}>
                        {level}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Sleep & Weight */}
              <View className="flex-row gap-4 mb-4">
                <View className="flex-1">
                  <Text className="text-zinc-400 text-sm mb-2">SueÒo (horas)</Text>
                  <TextInput
                    className="bg-zinc-800 rounded-xl px-4 py-3 text-white text-lg font-bold"
                    placeholder="7.5"
                    placeholderTextColor="#71717A"
                    keyboardType="decimal-pad"
                    value={newEntry.sleep}
                    onChangeText={(text) => setNewEntry({ ...newEntry, sleep: text })}
                  />
                </View>
                <View className="flex-1">
                  <Text className="text-zinc-400 text-sm mb-2">Peso (kg)</Text>
                  <TextInput
                    className="bg-zinc-800 rounded-xl px-4 py-3 text-white text-lg font-bold"
                    placeholder="75.0"
                    placeholderTextColor="#71717A"
                    keyboardType="decimal-pad"
                    value={newEntry.bodyWeight}
                    onChangeText={(text) => setNewEntry({ ...newEntry, bodyWeight: text })}
                  />
                </View>
              </View>

              {/* Notes */}
              <View className="mb-4">
                <Text className="text-zinc-400 text-sm mb-2">Notas</Text>
                <TextInput
                  className="bg-zinc-800 rounded-xl px-4 py-3 text-white"
                  placeholder="øCÛmo fue el workout? PRs, sensaciones, etc."
                  placeholderTextColor="#71717A"
                  multiline
                  numberOfLines={4}
                  value={newEntry.notes}
                  onChangeText={(text) => setNewEntry({ ...newEntry, notes: text })}
                />
              </View>

              <TouchableOpacity
                onPress={addEntry}
                className="bg-primary rounded-xl p-4 flex-row items-center justify-center"
              >
                <Ionicons name="checkmark-circle" size={20} color="white" />
                <Text className="text-white font-bold ml-2">Guardar Entrada</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              {/* Weekly Stats */}
              {stats && (
                <View className="bg-zinc-900 rounded-xl p-4 mb-6 border border-zinc-800">
                  <Text className="text-white font-bold text-lg mb-3">Esta Semana</Text>
                  <View className="flex-row gap-3">
                    <View className="flex-1 bg-amber-500/10 rounded-lg p-3 border border-amber-500/30">
                      <Text className="text-amber-400 text-xs mb-1">EnergÌa Promedio</Text>
                      <Text className="text-white text-2xl font-bold">{stats.energy}/5</Text>
                    </View>
                    <View className="flex-1 bg-purple-500/10 rounded-lg p-3 border border-purple-500/30">
                      <Text className="text-purple-400 text-xs mb-1">SueÒo Promedio</Text>
                      <Text className="text-white text-2xl font-bold">{stats.sleep}h</Text>
                    </View>
                    <View className="flex-1 bg-primary/10 rounded-lg p-3 border border-primary/30">
                      <Text className="text-primary/80 text-xs mb-1">Entradas</Text>
                      <Text className="text-white text-2xl font-bold">{entries.length}</Text>
                    </View>
                  </View>
                </View>
              )}

              {/* Entries List */}
              <Text className="text-white font-bold text-lg mb-4">Entradas</Text>
              {entries.length === 0 ? (
                <View className="bg-zinc-900 rounded-xl p-8 items-center border border-zinc-800">
                  <Text className="text-6xl mb-3">üìù</Text>
                  <Text className="text-white font-bold text-lg mb-2">Sin Entradas</Text>
                  <Text className="text-zinc-400 text-center">
                    Empieza a llevar un diario de tus entrenamientos
                  </Text>
                </View>
              ) : (
                entries.sort((a, b) => b.date.getTime() - a.date.getTime()).map((entry) => {
                  const moodInfo = getMoodInfo(entry.mood);

                  return (
                    <View key={entry.id} className="bg-zinc-900 rounded-xl p-4 mb-4 border border-zinc-800">
                      <View className="flex-row items-start justify-between mb-3">
                        <View className="flex-1">
                          <Text className="text-white font-bold text-lg mb-1">
                            {entry.workoutType}
                          </Text>
                          <Text className="text-zinc-400 text-sm">
                            {format(entry.date, "EEEE, d 'de' MMMM", { locale: es })}
                          </Text>
                        </View>
                        <TouchableOpacity onPress={() => deleteEntry(entry.id)}>
                          <Ionicons name="trash" size={20} color="#EF4444" />
                        </TouchableOpacity>
                      </View>

                      {/* Metrics */}
                      <View className="flex-row flex-wrap gap-2 mb-3">
                        <View className={`bg-${moodInfo.color}-500/10 rounded px-3 py-1 border border-${moodInfo.color}-500/30`}>
                          <Text className={`text-${moodInfo.color}-400 text-xs font-bold`}>
                            {moodInfo.emoji} {moodInfo.label}
                          </Text>
                        </View>
                        <View className="bg-amber-500/10 rounded px-3 py-1 border border-amber-500/30">
                          <Text className="text-amber-400 text-xs font-bold">
                            ? EnergÌa {entry.energy}/5
                          </Text>
                        </View>
                        <View className="bg-purple-500/10 rounded px-3 py-1 border border-purple-500/30">
                          <Text className="text-purple-400 text-xs font-bold">
                            ??¥ {entry.sleep}h sueÒo
                          </Text>
                        </View>
                        {entry.bodyWeight && (
                          <View className="bg-primary/10 rounded px-3 py-1 border border-primary/30">
                            <Text className="text-primary/80 text-xs font-bold">
                              ??è {entry.bodyWeight}kg
                            </Text>
                          </View>
                        )}
                      </View>

                      {/* Notes */}
                      <View className="bg-zinc-800 rounded-lg p-3 mb-3">
                        <Text className="text-zinc-300 text-sm">{entry.notes}</Text>
                      </View>

                      {/* Achievements */}
                      {entry.achievements && entry.achievements.length > 0 && (
                        <View className="mb-2">
                          <Text className="text-primary text-xs font-bold mb-1">LOGROS</Text>
                          {entry.achievements.map((achievement, idx) => (
                            <View key={idx} className="flex-row items-center mb-1">
                              <Ionicons name="trophy" size={12} color="#9D12DE" />
                              <Text className="text-primary/80 text-sm ml-2">{achievement}</Text>
                            </View>
                          ))}
                        </View>
                      )}

                      {/* Challenges */}
                      {entry.challenges && entry.challenges.length > 0 && (
                        <View>
                          <Text className="text-amber-400 text-xs font-bold mb-1">DESAF√çOS</Text>
                          {entry.challenges.map((challenge, idx) => (
                            <View key={idx} className="flex-row items-center mb-1">
                              <Ionicons name="warning" size={12} color="#FFEA00" />
                              <Text className="text-amber-300 text-sm ml-2">{challenge}</Text>
                            </View>
                          ))}
                        </View>
                      )}
                    </View>
                  );
                })
              )}
            </>
          )}

          {/* Tips */}
          <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-6">
            <View className="flex-row items-start">
              <Ionicons name="book" size={20} color="#9D12DE" />
              <View className="flex-1 ml-3">
                <Text className="text-primary/80 font-bold mb-2">
                  Por QuÈ Llevar un Diario
                </Text>
                <Text className="text-primary/60 text-sm">
                  ï Identifica patrones (sueÒo, energÌa, rendimiento){'\n'}
                  ï Documenta progreso a largo plazo{'\n'}
                  ï Detecta quÈ funciona y quÈ no{'\n'}
                  ï MotivaciÛn al ver mejoras{'\n'}
                  ï Ajusta plan seg˙n data real
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}


