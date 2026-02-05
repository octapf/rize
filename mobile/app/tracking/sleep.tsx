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

interface SleepEntry {
  id: string;
  date: Date;
  bedtime: string; // HH:MM
  wakeTime: string; // HH:MM
  totalHours: number;
  quality: 'poor' | 'fair' | 'good' | 'excellent';
  mood: 'bad' | 'ok' | 'good' | 'great';
  notes?: string;
  interruptions?: number;
  dreamRecall?: boolean;
}

const QUALITY_OPTIONS = [
  { value: 'poor', label: 'Mala', icon: '😐«', color: 'red' },
  { value: 'fair', label: 'Regular', icon: '😐', color: 'amber' },
  { value: 'good', label: 'Buena', icon: '😐Š', color: 'blue' },
  { value: 'excellent', label: 'Excelente', icon: '😐´', color: 'emerald' },
];

const MOOD_OPTIONS = [
  { value: 'bad', label: 'Mal', icon: '😞', color: 'red' },
  { value: 'ok', label: 'OK', icon: '😐', color: 'amber' },
  { value: 'good', label: 'Bien', icon: '🙂', color: 'blue' },
  { value: 'great', label: 'Genial', icon: '😐ƒ', color: 'emerald' },
];

const MOCK_ENTRIES: SleepEntry[] = [
  {
    id: '1',
    date: new Date(2026, 0, 27),
    bedtime: '23:30',
    wakeTime: '07:00',
    totalHours: 7.5,
    quality: 'good',
    mood: 'good',
    interruptions: 1,
    notes: 'Buen descanso, solo una interrupción',
  },
  {
    id: '2',
    date: new Date(2026, 0, 26),
    bedtime: '00:15',
    wakeTime: '07:30',
    totalHours: 7.25,
    quality: 'fair',
    mood: 'ok',
    interruptions: 2,
    notes: 'Me desperté un par de veces',
  },
  {
    id: '3',
    date: new Date(2026, 0, 25),
    bedtime: '22:45',
    wakeTime: '06:45',
    totalHours: 8,
    quality: 'excellent',
    mood: 'great',
    interruptions: 0,
    dreamRecall: true,
    notes: 'Perfecto, 8 horas seguidas',
  },
  {
    id: '4',
    date: new Date(2026, 0, 24),
    bedtime: '01:00',
    wakeTime: '07:00',
    totalHours: 6,
    quality: 'poor',
    mood: 'bad',
    interruptions: 3,
    notes: 'Muy poco sueño, día difícil',
  },
];

export default function SleepTracker() {
  const [entries, setEntries] = useState(MOCK_ENTRIES);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newEntry, setNewEntry] = useState({
    bedtime: '',
    wakeTime: '',
    quality: 'good',
    mood: 'good',
    interruptions: '',
    notes: '',
  });

  const calculateHours = (bedtime: string, wakeTime: string): number => {
    if (!bedtime || !wakeTime) return 0;
    const [bedH, bedM] = bedtime.split(':').map(Number);
    const [wakeH, wakeM] = wakeTime.split(':').map(Number);
    
    const bedMinutes = bedH * 60 + bedM;
    let wakeMinutes = wakeH * 60 + wakeM;
    
    // If wake time is earlier than bed time, add 24 hours
    if (wakeMinutes < bedMinutes) {
      wakeMinutes += 24 * 60;
    }
    
    return (wakeMinutes - bedMinutes) / 60;
  };

  const addEntry = () => {
    if (!newEntry.bedtime || !newEntry.wakeTime) {
      Alert.alert('Error', 'Ingresa hora de dormir y despertar');
      return;
    }

    const totalHours = calculateHours(newEntry.bedtime, newEntry.wakeTime);

    const entry: SleepEntry = {
      id: Date.now().toString(),
      date: new Date(),
      bedtime: newEntry.bedtime,
      wakeTime: newEntry.wakeTime,
      totalHours,
      quality: newEntry.quality as any,
      mood: newEntry.mood as any,
      interruptions: newEntry.interruptions ? parseInt(newEntry.interruptions) : undefined,
      notes: newEntry.notes,
    };

    setEntries([entry, ...entries]);
    setNewEntry({ bedtime: '', wakeTime: '', quality: 'good', mood: 'good', interruptions: '', notes: '' });
    setShowAddForm(false);
    Alert.alert('Sueño Registrado! 😐´', 'Entrada guardada correctamente');
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

  const getWeeklyStats = () => {
    const lastWeek = entries.filter((e) => {
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return e.date >= weekAgo;
    });

    const avgHours = lastWeek.length > 0
      ? lastWeek.reduce((sum, e) => sum + e.totalHours, 0) / lastWeek.length
      : 0;

    const totalInterruptions = lastWeek.reduce((sum, e) => sum + (e.interruptions || 0), 0);

    const excellentNights = lastWeek.filter((e) => e.quality === 'excellent').length;

    return {
      entries: lastWeek.length,
      avgHours,
      totalInterruptions,
      excellentNights,
    };
  };

  const getQualityInfo = (quality: string) => {
    return QUALITY_OPTIONS.find((q) => q.value === quality) || QUALITY_OPTIONS[0];
  };

  const getMoodInfo = (mood: string) => {
    return MOOD_OPTIONS.find((m) => m.value === mood) || MOOD_OPTIONS[0];
  };

  const stats = getWeeklyStats();

  return (
    <View className="flex-1 bg-zinc-950">
      {/* Header */}
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1 ml-3">
            Sleep Tracker
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
              <Text className="text-white font-bold text-lg mb-4">Registrar Sueño</Text>

              {/* Times */}
              <View className="flex-row gap-4 mb-4">
                <View className="flex-1">
                  <Text className="text-zinc-400 text-sm mb-2">Hora de Dormir</Text>
                  <TextInput
                    className="bg-zinc-800 rounded-xl px-4 py-3 text-white text-lg font-bold"
                    placeholder="23:00"
                    placeholderTextColor="#71717A"
                    value={newEntry.bedtime}
                    onChangeText={(text) => setNewEntry({ ...newEntry, bedtime: text })}
                  />
                </View>
                <View className="flex-1">
                  <Text className="text-zinc-400 text-sm mb-2">Hora de Despertar</Text>
                  <TextInput
                    className="bg-zinc-800 rounded-xl px-4 py-3 text-white text-lg font-bold"
                    placeholder="07:00"
                    placeholderTextColor="#71717A"
                    value={newEntry.wakeTime}
                    onChangeText={(text) => setNewEntry({ ...newEntry, wakeTime: text })}
                  />
                </View>
              </View>

              {/* Calculated Hours */}
              {newEntry.bedtime && newEntry.wakeTime && (
                <View className="bg-primary/10 rounded-lg p-3 border border-primary/30 mb-4">
                  <Text className="text-primary font-bold text-center">
                    Total: {calculateHours(newEntry.bedtime, newEntry.wakeTime).toFixed(1)} horas
                  </Text>
                </View>
              )}

              {/* Quality */}
              <View className="mb-4">
                <Text className="text-zinc-400 text-sm mb-2">Calidad del Sueño</Text>
                <View className="flex-row gap-2">
                  {QUALITY_OPTIONS.map((q) => (
                    <TouchableOpacity
                      key={q.value}
                      onPress={() => setNewEntry({ ...newEntry, quality: q.value })}
                      className={`flex-1 py-2 rounded-lg ${
                        newEntry.quality === q.value ? `bg-${q.color}-500` : 'bg-zinc-800'
                      }`}
                    >
                      <Text className="text-center text-2xl mb-1">{q.icon}</Text>
                      <Text className={`text-center text-xs font-bold ${newEntry.quality === q.value ? 'text-white' : 'text-zinc-400'}`}>
                        {q.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Mood */}
              <View className="mb-4">
                <Text className="text-zinc-400 text-sm mb-2">¿Cómo te Sientes?</Text>
                <View className="flex-row gap-2">
                  {MOOD_OPTIONS.map((m) => (
                    <TouchableOpacity
                      key={m.value}
                      onPress={() => setNewEntry({ ...newEntry, mood: m.value })}
                      className={`flex-1 py-2 rounded-lg ${
                        newEntry.mood === m.value ? `bg-${m.color}-500` : 'bg-zinc-800'
                      }`}
                    >
                      <Text className="text-center text-2xl mb-1">{m.icon}</Text>
                      <Text className={`text-center text-xs font-bold ${newEntry.mood === m.value ? 'text-white' : 'text-zinc-400'}`}>
                        {m.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Interruptions */}
              <View className="mb-4">
                <Text className="text-zinc-400 text-sm mb-2">Interrupciones</Text>
                <TextInput
                  className="bg-zinc-800 rounded-xl px-4 py-3 text-white text-lg font-bold"
                  placeholder="0"
                  placeholderTextColor="#71717A"
                  keyboardType="numeric"
                  value={newEntry.interruptions}
                  onChangeText={(text) => setNewEntry({ ...newEntry, interruptions: text })}
                />
              </View>

              {/* Notes */}
              <View className="mb-4">
                <Text className="text-zinc-400 text-sm mb-2">Notas (opcional)</Text>
                <TextInput
                  className="bg-zinc-800 rounded-xl px-4 py-3 text-white"
                  placeholder="¿Cómo dormiste? ¿Sueños? ¿Estrés?"
                  placeholderTextColor="#71717A"
                  multiline
                  numberOfLines={2}
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
              <View className="bg-zinc-900 rounded-xl p-4 mb-6 border border-zinc-800">
                <Text className="text-white font-bold text-lg mb-3">Esta Semana</Text>
                <View className="flex-row flex-wrap gap-3">
                  <View className="flex-1 min-w-[45%] bg-primary/10 rounded-lg p-3 border border-primary/30">
                    <Text className="text-primary text-xs mb-1">Promedio de Sueño</Text>
                    <Text className="text-white text-2xl font-bold">{stats.avgHours.toFixed(1)}h</Text>
                  </View>
                  <View className="flex-1 min-w-[45%] bg-primary/10 rounded-lg p-3 border border-primary/30">
                    <Text className="text-primary/80 text-xs mb-1">Noches Registradas</Text>
                    <Text className="text-white text-2xl font-bold">{stats.entries}</Text>
                  </View>
                  <View className="flex-1 min-w-[45%] bg-amber-500/10 rounded-lg p-3 border border-amber-500/30">
                    <Text className="text-amber-400 text-xs mb-1">Interrupciones</Text>
                    <Text className="text-white text-2xl font-bold">{stats.totalInterruptions}</Text>
                  </View>
                  <View className="flex-1 min-w-[45%] bg-purple-500/10 rounded-lg p-3 border border-purple-500/30">
                    <Text className="text-purple-400 text-xs mb-1">Noches Excelentes</Text>
                    <Text className="text-white text-2xl font-bold">{stats.excellentNights}</Text>
                  </View>
                </View>
              </View>

              {/* Sleep Quality Trend */}
              <View className="bg-zinc-900 rounded-xl p-4 mb-6 border border-zinc-800">
                <Text className="text-white font-bold mb-3">Últimas 7 Noches</Text>
                <View className="flex-row items-end justify-between h-24">
                  {entries.slice(0, 7).reverse().map((entry, idx) => {
                    const qualityInfo = getQualityInfo(entry.quality);
                    const height = (entry.totalHours / 10) * 100; // 10 hours = 100%
                    return (
                      <View key={entry.id} className="flex-1 items-center justify-end mx-0.5">
                        <View
                          className={`w-full bg-${qualityInfo.color}-500 rounded-t`}
                          style={{ height: `${height}%` }}
                        />
                        <Text className="text-zinc-400 text-xs mt-1">{entry.totalHours.toFixed(1)}h</Text>
                      </View>
                    );
                  })}
                </View>
              </View>

              {/* Entries List */}
              <Text className="text-white font-bold text-lg mb-4">Historial</Text>
              {entries.length === 0 ? (
                <View className="bg-zinc-900 rounded-xl p-8 items-center border border-zinc-800">
                  <Text className="text-6xl mb-3">😐´</Text>
                  <Text className="text-white font-bold text-lg mb-2">Sin Registros</Text>
                  <Text className="text-zinc-400 text-center">
                    Empieza a trackear tu sueño
                  </Text>
                </View>
              ) : (
                entries.sort((a, b) => b.date.getTime() - a.date.getTime()).map((entry) => {
                  const qualityInfo = getQualityInfo(entry.quality);
                  const moodInfo = getMoodInfo(entry.mood);

                  return (
                    <View key={entry.id} className="bg-zinc-900 rounded-xl p-4 mb-4 border border-zinc-800">
                      <View className="flex-row items-start justify-between mb-3">
                        <View className="flex-1">
                          <Text className="text-white font-bold text-lg mb-1">
                            {format(entry.date, "EEEE, d 'de' MMMM", { locale: es })}
                          </Text>
                          <View className="flex-row items-center gap-2">
                            <View className={`bg-${qualityInfo.color}-500/10 rounded px-2 py-1 border border-${qualityInfo.color}-500/30`}>
                              <Text className={`text-${qualityInfo.color}-400 text-xs font-bold`}>
                                {qualityInfo.icon} {qualityInfo.label}
                              </Text>
                            </View>
                            <View className={`bg-${moodInfo.color}-500/10 rounded px-2 py-1 border border-${moodInfo.color}-500/30`}>
                              <Text className={`text-${moodInfo.color}-400 text-xs font-bold`}>
                                {moodInfo.icon} {moodInfo.label}
                              </Text>
                            </View>
                          </View>
                        </View>
                        <TouchableOpacity onPress={() => deleteEntry(entry.id)}>
                          <Ionicons name="trash" size={20} color="#EF4444" />
                        </TouchableOpacity>
                      </View>

                      {/* Sleep Info */}
                      <View className="bg-zinc-800 rounded-lg p-3 mb-3">
                        <View className="flex-row items-center justify-between mb-2">
                          <View className="flex-row items-center">
                            <Ionicons name="moon" size={16} color="#71717A" />
                            <Text className="text-zinc-300 text-sm ml-2">Dormiste a las {entry.bedtime}</Text>
                          </View>
                          <View className="flex-row items-center">
                            <Ionicons name="sunny" size={16} color="#71717A" />
                            <Text className="text-zinc-300 text-sm ml-2">Despertaste a las {entry.wakeTime}</Text>
                          </View>
                        </View>
                        <View className="flex-row items-center justify-center bg-primary/10 rounded p-2 border border-primary/30">
                          <Text className="text-primary font-bold text-lg">
                            Total: {entry.totalHours.toFixed(1)} horas
                          </Text>
                        </View>
                      </View>

                      {/* Additional Info */}
                      {entry.interruptions !== undefined && entry.interruptions > 0 && (
                        <View className="bg-amber-500/10 rounded-lg p-2 border border-amber-500/30 mb-2">
                          <Text className="text-amber-400 text-sm">
                            âš ï¸ {entry.interruptions} interrupción{entry.interruptions > 1 ? 'es' : ''}
                          </Text>
                        </View>
                      )}

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

          {/* Tips */}
          <View className="bg-purple-500/10 rounded-xl p-4 border border-purple-500/30 mb-6">
            <View className="flex-row items-start">
              <Ionicons name="moon" size={20} color="#A855F7" />
              <View className="flex-1 ml-3">
                <Text className="text-purple-400 font-bold mb-2">
                  Tips para Mejor Sueño
                </Text>
                <Text className="text-purple-300 text-sm">
                  • Duerme 7-9 horas consistentemente{'\n'}
                  • Mantén horarios regulares{'\n'}
                  • Evita pantallas 1h antes de dormir{'\n'}
                  • Cuarto oscuro y fresco (18-20°C){'\n'}
                  • Evita cafeína 6h antes de dormir
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

