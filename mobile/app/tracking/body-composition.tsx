import React, { useState } from 'react';
import { Text } from '@/components/ui/Text';
import { View, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';;
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface BodyCompositionEntry {
  id: string;
  date: Date;
  weight: number; // kg
  bodyFat: number; // %
  muscleMass: number; // kg
  visceralFat?: number; // level 1-59
  bmr?: number; // basal metabolic rate kcal/day
  notes?: string;
}

const MOCK_ENTRIES: BodyCompositionEntry[] = [
  {
    id: '1',
    date: new Date(2026, 0, 27),
    weight: 78.5,
    bodyFat: 15.2,
    muscleMass: 64.3,
    visceralFat: 8,
    bmr: 1820,
    notes: 'Semana de volumen',
  },
  {
    id: '2',
    date: new Date(2026, 0, 20),
    weight: 78.0,
    bodyFat: 15.5,
    muscleMass: 63.8,
    visceralFat: 8,
    bmr: 1810,
  },
  {
    id: '3',
    date: new Date(2026, 0, 13),
    weight: 77.5,
    bodyFat: 15.8,
    muscleMass: 63.2,
    visceralFat: 8,
    bmr: 1800,
  },
  {
    id: '4',
    date: new Date(2026, 0, 6),
    weight: 77.0,
    bodyFat: 16.0,
    muscleMass: 62.7,
    visceralFat: 9,
    bmr: 1790,
    notes: 'Inicio de volumen',
  },
  {
    id: '5',
    date: new Date(2025, 11, 30),
    weight: 76.5,
    bodyFat: 16.3,
    muscleMass: 62.0,
    visceralFat: 9,
    bmr: 1780,
  },
];

export default function BodyComposition() {
  const [entries, setEntries] = useState(MOCK_ENTRIES);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newEntry, setNewEntry] = useState({
    weight: '',
    bodyFat: '',
    muscleMass: '',
    visceralFat: '',
    bmr: '',
    notes: '',
  });

  const addEntry = () => {
    if (!newEntry.weight || !newEntry.bodyFat) {
      Alert.alert('Error', 'Ingresa al menos peso y % de grasa');
      return;
    }

    const weight = parseFloat(newEntry.weight);
    const bodyFat = parseFloat(newEntry.bodyFat);
    const fatMass = (weight * bodyFat) / 100;
    const leanMass = weight - fatMass;

    const entry: BodyCompositionEntry = {
      id: Date.now().toString(),
      date: new Date(),
      weight,
      bodyFat,
      muscleMass: newEntry.muscleMass ? parseFloat(newEntry.muscleMass) : leanMass,
      visceralFat: newEntry.visceralFat ? parseInt(newEntry.visceralFat) : undefined,
      bmr: newEntry.bmr ? parseInt(newEntry.bmr) : undefined,
      notes: newEntry.notes,
    };

    setEntries([entry, ...entries]);
    setNewEntry({ weight: '', bodyFat: '', muscleMass: '', visceralFat: '', bmr: '', notes: '' });
    setShowAddForm(false);
    Alert.alert('Entrada Guardada! 📊', 'Composición corporal registrada');
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

  const getProgress = () => {
    if (entries.length < 2) return null;

    const latest = entries[0];
    const oldest = entries[entries.length - 1];

    return {
      weightChange: latest.weight - oldest.weight,
      bodyFatChange: latest.bodyFat - oldest.bodyFat,
      muscleMassChange: latest.muscleMass - oldest.muscleMass,
      days: Math.floor((latest.date.getTime() - oldest.date.getTime()) / (1000 * 60 * 60 * 24)),
    };
  };

  const getFatMass = (weight: number, bodyFat: number) => {
    return (weight * bodyFat) / 100;
  };

  const getLeanMass = (weight: number, bodyFat: number) => {
    return weight - getFatMass(weight, bodyFat);
  };

  const progress = getProgress();

  return (
    <View className="flex-1 bg-zinc-950">
      {/* Header */}
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1 ml-3">
            Body Composition
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
              <Text className="text-white font-bold text-lg mb-4">Nueva Medición</Text>

              {/* Weight & Body Fat */}
              <View className="flex-row gap-4 mb-4">
                <View className="flex-1">
                  <Text className="text-zinc-400 text-sm mb-2">Peso (kg)</Text>
                  <TextInput
                    className="bg-zinc-800 rounded-xl px-4 py-3 text-white text-lg font-bold"
                    placeholder="75.0"
                    placeholderTextColor="#71717A"
                    keyboardType="decimal-pad"
                    value={newEntry.weight}
                    onChangeText={(text) => setNewEntry({ ...newEntry, weight: text })}
                  />
                </View>
                <View className="flex-1">
                  <Text className="text-zinc-400 text-sm mb-2">% Grasa</Text>
                  <TextInput
                    className="bg-zinc-800 rounded-xl px-4 py-3 text-white text-lg font-bold"
                    placeholder="15.0"
                    placeholderTextColor="#71717A"
                    keyboardType="decimal-pad"
                    value={newEntry.bodyFat}
                    onChangeText={(text) => setNewEntry({ ...newEntry, bodyFat: text })}
                  />
                </View>
              </View>

              {/* Calculated Values */}
              {newEntry.weight && newEntry.bodyFat && (
                <View className="bg-primary/10 rounded-lg p-3 border border-primary/30 mb-4">
                  <View className="flex-row justify-between mb-1">
                    <Text className="text-primary/80 text-sm">Masa Grasa:</Text>
                    <Text className="text-primary/60 font-bold">
                      {getFatMass(parseFloat(newEntry.weight), parseFloat(newEntry.bodyFat)).toFixed(1)} kg
                    </Text>
                  </View>
                  <View className="flex-row justify-between">
                    <Text className="text-primary/80 text-sm">Masa Magra:</Text>
                    <Text className="text-primary/60 font-bold">
                      {getLeanMass(parseFloat(newEntry.weight), parseFloat(newEntry.bodyFat)).toFixed(1)} kg
                    </Text>
                  </View>
                </View>
              )}

              {/* Muscle Mass (optional override) */}
              <View className="mb-4">
                <Text className="text-zinc-400 text-sm mb-2">Masa Muscular (kg) - opcional</Text>
                <TextInput
                  className="bg-zinc-800 rounded-xl px-4 py-3 text-white text-lg font-bold"
                  placeholder="Autodetectado si vacío"
                  placeholderTextColor="#71717A"
                  keyboardType="decimal-pad"
                  value={newEntry.muscleMass}
                  onChangeText={(text) => setNewEntry({ ...newEntry, muscleMass: text })}
                />
              </View>

              {/* Visceral Fat & BMR */}
              <View className="flex-row gap-4 mb-4">
                <View className="flex-1">
                  <Text className="text-zinc-400 text-sm mb-2">Grasa Visceral (1-59)</Text>
                  <TextInput
                    className="bg-zinc-800 rounded-xl px-4 py-3 text-white text-lg font-bold"
                    placeholder="8"
                    placeholderTextColor="#71717A"
                    keyboardType="numeric"
                    value={newEntry.visceralFat}
                    onChangeText={(text) => setNewEntry({ ...newEntry, visceralFat: text })}
                  />
                </View>
                <View className="flex-1">
                  <Text className="text-zinc-400 text-sm mb-2">TMB (kcal/día)</Text>
                  <TextInput
                    className="bg-zinc-800 rounded-xl px-4 py-3 text-white text-lg font-bold"
                    placeholder="1800"
                    placeholderTextColor="#71717A"
                    keyboardType="numeric"
                    value={newEntry.bmr}
                    onChangeText={(text) => setNewEntry({ ...newEntry, bmr: text })}
                  />
                </View>
              </View>

              {/* Notes */}
              <View className="mb-4">
                <Text className="text-zinc-400 text-sm mb-2">Notas (opcional)</Text>
                <TextInput
                  className="bg-zinc-800 rounded-xl px-4 py-3 text-white"
                  placeholder="Condiciones, fase de dieta, etc."
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
                <Text className="text-white font-bold ml-2">Guardar Medición</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              {/* Latest Stats */}
              {entries.length > 0 && (
                <View className="bg-zinc-900 rounded-xl p-4 mb-6 border border-zinc-800">
                  <Text className="text-white font-bold text-lg mb-3">Última Medición</Text>
                  <Text className="text-zinc-400 text-sm mb-3">
                    {format(entries[0].date, "d 'de' MMMM, yyyy", { locale: es })}
                  </Text>
                  <View className="flex-row flex-wrap gap-3">
                    <View className="flex-1 min-w-[45%] bg-primary/10 rounded-lg p-3 border border-primary/30">
                      <Text className="text-primary/80 text-xs mb-1">Peso</Text>
                      <Text className="text-white text-2xl font-bold">{entries[0].weight} kg</Text>
                    </View>
                    <View className="flex-1 min-w-[45%] bg-red-500/10 rounded-lg p-3 border border-red-500/30">
                      <Text className="text-red-400 text-xs mb-1">% Grasa</Text>
                      <Text className="text-white text-2xl font-bold">{entries[0].bodyFat}%</Text>
                    </View>
                    <View className="flex-1 min-w-[45%] bg-primary/10 rounded-lg p-3 border border-primary/30">
                      <Text className="text-primary text-xs mb-1">Masa Muscular</Text>
                      <Text className="text-white text-2xl font-bold">{entries[0].muscleMass.toFixed(1)} kg</Text>
                    </View>
                    <View className="flex-1 min-w-[45%] bg-purple-500/10 rounded-lg p-3 border border-purple-500/30">
                      <Text className="text-purple-400 text-xs mb-1">Masa Grasa</Text>
                      <Text className="text-white text-2xl font-bold">
                        {getFatMass(entries[0].weight, entries[0].bodyFat).toFixed(1)} kg
                      </Text>
                    </View>
                  </View>
                </View>
              )}

              {/* Progress */}
              {progress && (
                <View className="bg-zinc-900 rounded-xl p-4 mb-6 border border-zinc-800">
                  <Text className="text-white font-bold text-lg mb-3">
                    Progreso ({progress.days} días)
                  </Text>
                  <View className="space-y-3">
                    <View className="flex-row items-center justify-between">
                      <Text className="text-zinc-400">Peso</Text>
                      <View className="flex-row items-center">
                        <Ionicons
                          name={progress.weightChange >= 0 ? 'arrow-up' : 'arrow-down'}
                          size={16}
                          color={progress.weightChange >= 0 ? '#9D12DE' : '#EF4444'}
                        />
                        <Text className={`font-bold ml-1 ${progress.weightChange >= 0 ? 'text-primary' : 'text-red-400'}`}>
                          {Math.abs(progress.weightChange).toFixed(1)} kg
                        </Text>
                      </View>
                    </View>
                    <View className="flex-row items-center justify-between">
                      <Text className="text-zinc-400">% Grasa</Text>
                      <View className="flex-row items-center">
                        <Ionicons
                          name={progress.bodyFatChange <= 0 ? 'arrow-down' : 'arrow-up'}
                          size={16}
                          color={progress.bodyFatChange <= 0 ? '#9D12DE' : '#EF4444'}
                        />
                        <Text className={`font-bold ml-1 ${progress.bodyFatChange <= 0 ? 'text-primary' : 'text-red-400'}`}>
                          {Math.abs(progress.bodyFatChange).toFixed(1)}%
                        </Text>
                      </View>
                    </View>
                    <View className="flex-row items-center justify-between">
                      <Text className="text-zinc-400">Masa Muscular</Text>
                      <View className="flex-row items-center">
                        <Ionicons
                          name={progress.muscleMassChange >= 0 ? 'arrow-up' : 'arrow-down'}
                          size={16}
                          color={progress.muscleMassChange >= 0 ? '#9D12DE' : '#EF4444'}
                        />
                        <Text className={`font-bold ml-1 ${progress.muscleMassChange >= 0 ? 'text-primary' : 'text-red-400'}`}>
                          {Math.abs(progress.muscleMassChange).toFixed(1)} kg
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              )}

              {/* Chart */}
              <View className="bg-zinc-900 rounded-xl p-4 mb-6 border border-zinc-800">
                <Text className="text-white font-bold mb-3">Tendencia de Peso y Grasa</Text>
                <View className="flex-row items-end justify-between h-32">
                  {entries.slice(0, 10).reverse().map((entry, idx) => {
                    const maxWeight = Math.max(...entries.map((e) => e.weight));
                    const heightPercent = (entry.weight / maxWeight) * 100;
                    return (
                      <View key={entry.id} className="flex-1 items-center justify-end mx-0.5">
                        <Text className="text-zinc-500 text-xs mb-1">{entry.bodyFat.toFixed(1)}%</Text>
                        <View
                          className="w-full bg-primary rounded-t"
                          style={{ height: `${heightPercent}%` }}
                        />
                        <Text className="text-zinc-400 text-xs mt-1">{entry.weight}kg</Text>
                      </View>
                    );
                  })}
                </View>
              </View>

              {/* Entries List */}
              <Text className="text-white font-bold text-lg mb-4">Historial</Text>
              {entries.length === 0 ? (
                <View className="bg-zinc-900 rounded-xl p-8 items-center border border-zinc-800">
                  <Text className="text-6xl mb-3">📊</Text>
                  <Text className="text-white font-bold text-lg mb-2">Sin Mediciones</Text>
                  <Text className="text-zinc-400 text-center">
                    Registra tu composición corporal
                  </Text>
                </View>
              ) : (
                entries.sort((a, b) => b.date.getTime() - a.date.getTime()).map((entry) => (
                  <View key={entry.id} className="bg-zinc-900 rounded-xl p-4 mb-4 border border-zinc-800">
                    <View className="flex-row items-start justify-between mb-3">
                      <View className="flex-1">
                        <Text className="text-white font-bold text-lg mb-1">
                          {format(entry.date, "d 'de' MMMM, yyyy", { locale: es })}
                        </Text>
                      </View>
                      <TouchableOpacity onPress={() => deleteEntry(entry.id)}>
                        <Ionicons name="trash" size={20} color="#EF4444" />
                      </TouchableOpacity>
                    </View>

                    {/* Main Stats */}
                    <View className="bg-zinc-800 rounded-lg p-3 mb-3">
                      <View className="flex-row justify-between mb-2">
                        <Text className="text-zinc-400">Peso</Text>
                        <Text className="text-white font-bold">{entry.weight} kg</Text>
                      </View>
                      <View className="flex-row justify-between mb-2">
                        <Text className="text-zinc-400">% Grasa Corporal</Text>
                        <Text className="text-white font-bold">{entry.bodyFat}%</Text>
                      </View>
                      <View className="flex-row justify-between mb-2">
                        <Text className="text-zinc-400">Masa Muscular</Text>
                        <Text className="text-white font-bold">{entry.muscleMass.toFixed(1)} kg</Text>
                      </View>
                      <View className="flex-row justify-between mb-2">
                        <Text className="text-zinc-400">Masa Grasa</Text>
                        <Text className="text-white font-bold">
                          {getFatMass(entry.weight, entry.bodyFat).toFixed(1)} kg
                        </Text>
                      </View>
                      {entry.visceralFat && (
                        <View className="flex-row justify-between mb-2">
                          <Text className="text-zinc-400">Grasa Visceral</Text>
                          <Text className="text-white font-bold">Nivel {entry.visceralFat}</Text>
                        </View>
                      )}
                      {entry.bmr && (
                        <View className="flex-row justify-between">
                          <Text className="text-zinc-400">TMB</Text>
                          <Text className="text-white font-bold">{entry.bmr} kcal/día</Text>
                        </View>
                      )}
                    </View>

                    {/* Notes */}
                    {entry.notes && (
                      <View className="bg-primary/10 rounded-lg p-3 border border-primary/30">
                        <Text className="text-primary/60 text-sm">{entry.notes}</Text>
                      </View>
                    )}
                  </View>
                ))
              )}
            </>
          )}

          {/* Tips */}
          <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-6">
            <View className="flex-row items-start">
              <Ionicons name="analytics" size={20} color="#9D12DE" />
              <View className="flex-1 ml-3">
                <Text className="text-primary font-bold mb-2">
                  Tips para Mediciones Precisas
                </Text>
                <Text className="text-primary/80 text-sm">
                  • Mide siempre a la misma hora (AM en ayunas){'\n'}
                  • Después de ir al baño{'\n'}
                  • Antes de entrenar{'\n'}
                  • Mismas condiciones semanales{'\n'}
                  • Usa báscula de bioimpedancia confiable
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}


