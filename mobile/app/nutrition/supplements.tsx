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

interface Supplement {
  id: string;
  name: string;
  dosage: string;
  timing: 'morning' | 'preworkout' | 'postworkout' | 'evening' | 'bedtime';
  purpose: string;
  taken: boolean;
}

interface SupplementLog {
  date: string; // YYYY-MM-DD
  supplements: Supplement[];
  compliance: number; // percentage
}

const TIMING_OPTIONS = [
  { value: 'morning', label: 'Mañana', icon: 'sunny', color: 'amber' },
  { value: 'preworkout', label: 'Pre-Workout', icon: 'fitness', color: 'blue' },
  { value: 'postworkout', label: 'Post-Workout', icon: 'barbell', color: 'emerald' },
  { value: 'evening', label: 'Tarde', icon: 'partly-sunny', color: 'orange' },
  { value: 'bedtime', label: 'Antes de Dormir', icon: 'moon', color: 'purple' },
];

const MOCK_SUPPLEMENTS: Supplement[] = [
  { id: '1', name: 'Proteína Whey', dosage: '30g', timing: 'postworkout', purpose: 'Síntesis proteica', taken: true },
  { id: '2', name: 'Creatina', dosage: '5g', timing: 'postworkout', purpose: 'Fuerza y volumen', taken: true },
  { id: '3', name: 'Vitamina D3', dosage: '2000 IU', timing: 'morning', purpose: 'Salud ósea', taken: true },
  { id: '4', name: 'Omega-3', dosage: '1000mg', timing: 'morning', purpose: 'Salud cardiovascular', taken: false },
  { id: '5', name: 'Magnesio', dosage: '400mg', timing: 'bedtime', purpose: 'Recuperación y sueño', taken: false },
  { id: '6', name: 'Cafeína', dosage: '200mg', timing: 'preworkout', purpose: 'Energía y foco', taken: true },
];

export default function SupplementTracker() {
  const [supplements, setSupplements] = useState(MOCK_SUPPLEMENTS);
  const [filter, setFilter] = useState<string>('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newSupplement, setNewSupplement] = useState({
    name: '',
    dosage: '',
    timing: 'morning',
    purpose: '',
  });

  const toggleTaken = (id: string) => {
    setSupplements(supplements.map((s) => (s.id === id ? { ...s, taken: !s.taken } : s)));
  };

  const filteredSupplements = filter === 'all'
    ? supplements
    : supplements.filter((s) => s.timing === filter);

  const getTimingInfo = (timing: string) => {
    return TIMING_OPTIONS.find((t) => t.value === timing) || TIMING_OPTIONS[0];
  };

  const addSupplement = () => {
    if (!newSupplement.name || !newSupplement.dosage) {
      Alert.alert('Error', 'Ingresa nombre y dosaje');
      return;
    }

    const supplement: Supplement = {
      id: Date.now().toString(),
      name: newSupplement.name,
      dosage: newSupplement.dosage,
      timing: newSupplement.timing as any,
      purpose: newSupplement.purpose,
      taken: false,
    };

    setSupplements([...supplements, supplement]);
    setNewSupplement({ name: '', dosage: '', timing: 'morning', purpose: '' });
    setShowAddForm(false);
    Alert.alert('Suplemento Añadido! 💊', 'Suplemento agregado a tu lista');
  };

  const deleteSupplement = (id: string) => {
    Alert.alert(
      'Eliminar Suplemento',
      '¿Estás seguro?',
      [
        { text: 'Cancelar' },
        { text: 'Eliminar', style: 'destructive', onPress: () => setSupplements(supplements.filter((s) => s.id !== id)) },
      ]
    );
  };

  const getCompliance = () => {
    if (supplements.length === 0) return 0;
    return (supplements.filter((s) => s.taken).length / supplements.length) * 100;
  };

  const compliance = getCompliance();

  return (
    <View className="flex-1 bg-zinc-950">
      {/* Header */}
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1 ml-3">
            Supplements
          </Text>
          <TouchableOpacity onPress={() => setShowAddForm(!showAddForm)}>
            <Ionicons name={showAddForm ? 'close' : 'add-circle'} size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Timing Filters */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row gap-2">
            <TouchableOpacity
              onPress={() => setFilter('all')}
              className={`flex-row items-center px-4 py-2 rounded-lg ${
                filter === 'all' ? 'bg-emerald-500' : 'bg-zinc-900 border border-zinc-800'
              }`}
            >
              <Ionicons name="apps" size={18} color={filter === 'all' ? 'white' : '#71717A'} />
              <Text className={`ml-2 font-semibold text-sm ${filter === 'all' ? 'text-white' : 'text-zinc-400'}`}>
                Todos
              </Text>
            </TouchableOpacity>
            {TIMING_OPTIONS.map((timing) => (
              <TouchableOpacity
                key={timing.value}
                onPress={() => setFilter(timing.value)}
                className={`flex-row items-center px-4 py-2 rounded-lg ${
                  filter === timing.value ? 'bg-emerald-500' : 'bg-zinc-900 border border-zinc-800'
                }`}
              >
                <Ionicons
                  name={timing.icon as any}
                  size={18}
                  color={filter === timing.value ? 'white' : '#71717A'}
                />
                <Text className={`ml-2 font-semibold text-sm ${filter === timing.value ? 'text-white' : 'text-zinc-400'}`}>
                  {timing.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          {showAddForm ? (
            <View className="bg-zinc-900 rounded-xl p-6 mb-6 border border-zinc-800">
              <Text className="text-white font-bold text-lg mb-4">Nuevo Suplemento</Text>

              {/* Name */}
              <View className="mb-4">
                <Text className="text-zinc-400 text-sm mb-2">Nombre</Text>
                <TextInput
                  className="bg-zinc-800 rounded-xl px-4 py-3 text-white text-lg font-bold"
                  placeholder="Ej: Proteína Whey, Creatina, etc."
                  placeholderTextColor="#71717A"
                  value={newSupplement.name}
                  onChangeText={(text) => setNewSupplement({ ...newSupplement, name: text })}
                />
              </View>

              {/* Dosage */}
              <View className="mb-4">
                <Text className="text-zinc-400 text-sm mb-2">Dosaje</Text>
                <TextInput
                  className="bg-zinc-800 rounded-xl px-4 py-3 text-white text-lg font-bold"
                  placeholder="Ej: 30g, 5g, 200mg, etc."
                  placeholderTextColor="#71717A"
                  value={newSupplement.dosage}
                  onChangeText={(text) => setNewSupplement({ ...newSupplement, dosage: text })}
                />
              </View>

              {/* Timing */}
              <View className="mb-4">
                <Text className="text-zinc-400 text-sm mb-2">Momento del Día</Text>
                <View className="flex-row flex-wrap gap-2">
                  {TIMING_OPTIONS.map((timing) => (
                    <TouchableOpacity
                      key={timing.value}
                      onPress={() => setNewSupplement({ ...newSupplement, timing: timing.value })}
                      className={`px-3 py-2 rounded-lg ${
                        newSupplement.timing === timing.value ? `bg-${timing.color}-500` : 'bg-zinc-800'
                      }`}
                    >
                      <View className="flex-row items-center">
                        <Ionicons
                          name={timing.icon as any}
                          size={16}
                          color={newSupplement.timing === timing.value ? 'white' : '#71717A'}
                        />
                        <Text className={`ml-1 font-bold ${newSupplement.timing === timing.value ? 'text-white' : 'text-zinc-400'}`}>
                          {timing.label}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Purpose */}
              <View className="mb-4">
                <Text className="text-zinc-400 text-sm mb-2">Propósito (opcional)</Text>
                <TextInput
                  className="bg-zinc-800 rounded-xl px-4 py-3 text-white"
                  placeholder="Para qué lo tomas..."
                  placeholderTextColor="#71717A"
                  value={newSupplement.purpose}
                  onChangeText={(text) => setNewSupplement({ ...newSupplement, purpose: text })}
                />
              </View>

              <TouchableOpacity
                onPress={addSupplement}
                className="bg-emerald-500 rounded-xl p-4 flex-row items-center justify-center"
              >
                <Ionicons name="checkmark-circle" size={20} color="white" />
                <Text className="text-white font-bold ml-2">Añadir Suplemento</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              {/* Compliance Card */}
              <View className="bg-zinc-900 rounded-xl p-4 mb-6 border border-zinc-800">
                <View className="flex-row items-center justify-between mb-3">
                  <Text className="text-white font-bold text-lg">Hoy</Text>
                  <View className="bg-emerald-500 rounded-lg px-3 py-1">
                    <Text className="text-white font-bold">{compliance.toFixed(0)}% Completado</Text>
                  </View>
                </View>
                <View className="h-3 bg-zinc-800 rounded-full overflow-hidden">
                  <View
                    className="h-full bg-emerald-500 rounded-full"
                    style={{ width: `${compliance}%` }}
                  />
                </View>
                <Text className="text-zinc-400 text-sm mt-2">
                  {supplements.filter((s) => s.taken).length} de {supplements.length} tomados
                </Text>
              </View>

              {/* Supplements by Timing */}
              {TIMING_OPTIONS.map((timingOption) => {
                const timingSupps = filteredSupplements.filter((s) => s.timing === timingOption.value);
                if (filter !== 'all' && filter !== timingOption.value) return null;
                if (timingSupps.length === 0) return null;

                return (
                  <View key={timingOption.value} className="mb-6">
                    <View className="flex-row items-center mb-3">
                      <Ionicons name={timingOption.icon as any} size={20} color={`#${timingOption.color === 'amber' ? 'F59E0B' : timingOption.color === 'blue' ? '3B82F6' : timingOption.color === 'emerald' ? '10B981' : timingOption.color === 'orange' ? 'F97316' : 'A855F7'}`} />
                      <Text className="text-white font-bold text-lg ml-2">{timingOption.label}</Text>
                      <View className="flex-1 h-0.5 bg-zinc-800 ml-3" />
                    </View>

                    {timingSupps.map((supplement) => (
                      <View key={supplement.id} className="bg-zinc-900 rounded-xl p-4 mb-3 border border-zinc-800">
                        <View className="flex-row items-start justify-between">
                          <View className="flex-1">
                            <Text className="text-white font-bold text-lg mb-1">{supplement.name}</Text>
                            <Text className="text-emerald-400 font-bold mb-2">{supplement.dosage}</Text>
                            {supplement.purpose && (
                              <View className="bg-blue-500/10 rounded-lg p-2 border border-blue-500/30">
                                <Text className="text-blue-400 text-sm">{supplement.purpose}</Text>
                              </View>
                            )}
                          </View>
                          <View className="flex-row gap-2 ml-3">
                            <TouchableOpacity
                              onPress={() => toggleTaken(supplement.id)}
                              className={`w-12 h-12 rounded-xl items-center justify-center ${
                                supplement.taken ? 'bg-emerald-500' : 'bg-zinc-800'
                              }`}
                            >
                              <Ionicons
                                name={supplement.taken ? 'checkmark' : 'close'}
                                size={24}
                                color="white"
                              />
                            </TouchableOpacity>
                            <TouchableOpacity
                              onPress={() => deleteSupplement(supplement.id)}
                              className="w-12 h-12 rounded-xl bg-zinc-800 items-center justify-center"
                            >
                              <Ionicons name="trash" size={20} color="#EF4444" />
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    ))}
                  </View>
                );
              })}

              {filteredSupplements.length === 0 && (
                <View className="bg-zinc-900 rounded-xl p-8 items-center border border-zinc-800">
                  <Text className="text-6xl mb-3">💊</Text>
                  <Text className="text-white font-bold text-lg mb-2">Sin Suplementos</Text>
                  <Text className="text-zinc-400 text-center">
                    Añade suplementos para trackear tu ingesta
                  </Text>
                </View>
              )}
            </>
          )}

          {/* Tips */}
          <View className="bg-blue-500/10 rounded-xl p-4 border border-blue-500/30 mb-6">
            <View className="flex-row items-start">
              <Ionicons name="information-circle" size={20} color="#3B82F6" />
              <View className="flex-1 ml-3">
                <Text className="text-blue-400 font-bold mb-2">
                  Tips de Suplementación
                </Text>
                <Text className="text-blue-300 text-sm">
                  • Prioriza comida real primero{'\n'}
                  • Creatina: 5g diario, cualquier momento{'\n'}
                  • Proteína: cuando no llegues a meta{'\n'}
                  • Cafeína pre-workout: 3-6mg/kg peso{'\n'}
                  • Consulta médico antes de nuevos supps
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
