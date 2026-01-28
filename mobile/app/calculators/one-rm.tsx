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

interface RMResult {
  percentage: number;
  weight: number;
  reps: string;
}

export default function OneRMCalculator() {
  const [weight, setWeight] = useState('');
  const [reps, setReps] = useState('');
  const [oneRM, setOneRM] = useState<number | null>(null);
  const [formula, setFormula] = useState<'epley' | 'brzycki' | 'lander'>('epley');

  const formulas = {
    epley: (w: number, r: number) => w * (1 + r / 30),
    brzycki: (w: number, r: number) => w * (36 / (37 - r)),
    lander: (w: number, r: number) => (100 * w) / (101.3 - 2.67123 * r),
  };

  const formulaNames = {
    epley: 'Epley',
    brzycki: 'Brzycki',
    lander: 'Lander',
  };

  const calculate1RM = () => {
    const w = parseFloat(weight);
    const r = parseInt(reps);

    if (!w || w <= 0) {
      Alert.alert('Error', 'Ingresa un peso válido');
      return;
    }
    if (!r || r <= 0 || r > 15) {
      Alert.alert('Error', 'Ingresa reps entre 1-15');
      return;
    }

    if (r === 1) {
      setOneRM(w);
      return;
    }

    const calculated = formulas[formula](w, r);
    setOneRM(Math.round(calculated * 10) / 10);
  };

  const generatePercentages = (): RMResult[] => {
    if (!oneRM) return [];

    const percentages = [
      { percentage: 100, reps: '1' },
      { percentage: 95, reps: '2' },
      { percentage: 93, reps: '3' },
      { percentage: 90, reps: '4' },
      { percentage: 87, reps: '5' },
      { percentage: 85, reps: '6' },
      { percentage: 83, reps: '7' },
      { percentage: 80, reps: '8' },
      { percentage: 77, reps: '9' },
      { percentage: 75, reps: '10' },
      { percentage: 70, reps: '11-12' },
      { percentage: 67, reps: '12-15' },
      { percentage: 65, reps: '15+' },
    ];

    return percentages.map((p) => ({
      percentage: p.percentage,
      weight: Math.round((oneRM * p.percentage) / 100 * 10) / 10,
      reps: p.reps,
    }));
  };

  const trainingZones = [
    {
      name: 'Fuerza Máxima',
      range: '90-100%',
      reps: '1-3',
      color: 'red',
      description: 'Desarrollo de fuerza pura',
    },
    {
      name: 'Fuerza',
      range: '85-90%',
      reps: '4-6',
      color: 'orange',
      description: 'Balance fuerza/hipertrofia',
    },
    {
      name: 'Hipertrofia',
      range: '70-85%',
      reps: '6-12',
      color: 'emerald',
      description: 'Máximo crecimiento muscular',
    },
    {
      name: 'Resistencia Muscular',
      range: '60-70%',
      reps: '12-20',
      color: 'blue',
      description: 'Resistencia y definición',
    },
  ];

  const resetCalculator = () => {
    setWeight('');
    setReps('');
    setOneRM(null);
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
            Calculadora 1RM
          </Text>
          <TouchableOpacity onPress={resetCalculator}>
            <Ionicons name="refresh" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          {/* Calculator Inputs */}
          <View className="bg-zinc-900 rounded-xl p-6 mb-6 border border-zinc-800">
            <Text className="text-white text-lg font-bold mb-4">Datos del Levantamiento</Text>

            {/* Weight Input */}
            <View className="mb-4">
              <Text className="text-zinc-400 text-sm mb-2">Peso Levantado (kg)</Text>
              <View className="bg-zinc-800 rounded-xl px-4 py-4 flex-row items-center">
                <TextInput
                  className="flex-1 text-white text-2xl font-bold"
                  placeholder="0"
                  placeholderTextColor="#71717A"
                  value={weight}
                  onChangeText={setWeight}
                  keyboardType="decimal-pad"
                />
                <Text className="text-zinc-400 text-xl ml-2">kg</Text>
              </View>
            </View>

            {/* Reps Input */}
            <View className="mb-4">
              <Text className="text-zinc-400 text-sm mb-2">Repeticiones Completadas</Text>
              <View className="bg-zinc-800 rounded-xl px-4 py-4 flex-row items-center">
                <TextInput
                  className="flex-1 text-white text-2xl font-bold"
                  placeholder="0"
                  placeholderTextColor="#71717A"
                  value={reps}
                  onChangeText={setReps}
                  keyboardType="number-pad"
                  maxLength={2}
                />
                <Text className="text-zinc-400 text-xl ml-2">reps</Text>
              </View>
            </View>

            {/* Formula Selection */}
            <View className="mb-4">
              <Text className="text-zinc-400 text-sm mb-2">Fórmula</Text>
              <View className="flex-row gap-2">
                {(Object.keys(formulas) as Array<keyof typeof formulas>).map((f) => (
                  <TouchableOpacity
                    key={f}
                    onPress={() => setFormula(f)}
                    className={`flex-1 rounded-lg p-3 ${
                      formula === f
                        ? 'bg-emerald-500'
                        : 'bg-zinc-800'
                    }`}
                  >
                    <Text
                      className={`text-center font-bold ${
                        formula === f ? 'text-white' : 'text-zinc-400'
                      }`}
                    >
                      {formulaNames[f]}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Calculate Button */}
            <TouchableOpacity
              onPress={calculate1RM}
              className="bg-emerald-500 rounded-xl p-4 flex-row items-center justify-center"
            >
              <Ionicons name="calculator" size={20} color="white" />
              <Text className="text-white font-bold ml-2">Calcular 1RM</Text>
            </TouchableOpacity>
          </View>

          {/* 1RM Result */}
          {oneRM !== null && (
            <View className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl p-6 mb-6">
              <Text className="text-emerald-200 text-sm mb-2">TU 1RM ESTIMADO</Text>
              <View className="flex-row items-baseline">
                <Text className="text-white text-6xl font-bold">{oneRM}</Text>
                <Text className="text-emerald-200 text-2xl ml-2">kg</Text>
              </View>
              <Text className="text-emerald-100 text-sm mt-2">
                Fórmula: {formulaNames[formula]}
              </Text>
            </View>
          )}

          {/* Training Zones */}
          {oneRM !== null && (
            <View className="mb-6">
              <Text className="text-white text-lg font-bold mb-3">Zonas de Entrenamiento</Text>
              {trainingZones.map((zone, index) => {
                const minPercent = parseInt(zone.range.split('-')[0]);
                const maxPercent = parseInt(zone.range.split('-')[1].replace('%', ''));
                const minWeight = Math.round((oneRM * minPercent) / 100 * 10) / 10;
                const maxWeight = Math.round((oneRM * maxPercent) / 100 * 10) / 10;

                return (
                  <View
                    key={index}
                    className={`bg-${zone.color}-500/10 rounded-xl p-4 mb-3 border border-${zone.color}-500/30`}
                  >
                    <View className="flex-row items-start justify-between mb-2">
                      <View className="flex-1">
                        <Text className={`text-${zone.color}-400 font-bold text-lg mb-1`}>
                          {zone.name}
                        </Text>
                        <Text className={`text-${zone.color}-300 text-sm`}>
                          {zone.description}
                        </Text>
                      </View>
                      <View className={`bg-${zone.color}-500 rounded-lg px-3 py-1`}>
                        <Text className="text-white text-xs font-bold">{zone.reps} REPS</Text>
                      </View>
                    </View>
                    <View className="flex-row items-center justify-between mt-2">
                      <Text className={`text-${zone.color}-400 text-sm`}>{zone.range}</Text>
                      <Text className={`text-${zone.color}-400 font-bold text-lg`}>
                        {minWeight} - {maxWeight} kg
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>
          )}

          {/* Percentage Table */}
          {oneRM !== null && (
            <View className="mb-6">
              <Text className="text-white text-lg font-bold mb-3">Tabla de Porcentajes</Text>
              <View className="bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800">
                {/* Header */}
                <View className="bg-zinc-800 flex-row p-3">
                  <Text className="text-zinc-400 font-bold flex-1">%</Text>
                  <Text className="text-zinc-400 font-bold flex-1 text-center">Peso</Text>
                  <Text className="text-zinc-400 font-bold flex-1 text-right">Reps</Text>
                </View>

                {/* Rows */}
                {generatePercentages().map((result, index) => (
                  <View
                    key={index}
                    className={`flex-row p-3 ${
                      index !== generatePercentages().length - 1 ? 'border-b border-zinc-800' : ''
                    }`}
                  >
                    <Text className="text-white font-bold flex-1">{result.percentage}%</Text>
                    <Text className="text-emerald-400 font-bold flex-1 text-center">
                      {result.weight} kg
                    </Text>
                    <Text className="text-zinc-400 flex-1 text-right">{result.reps}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Info Cards */}
          <View className="bg-blue-500/10 rounded-xl p-4 border border-blue-500/30 mb-3">
            <View className="flex-row items-start">
              <Ionicons name="information-circle" size={20} color="#3B82F6" />
              <View className="flex-1 ml-3">
                <Text className="text-blue-400 font-bold mb-2">
                  ¿Qué es el 1RM?
                </Text>
                <Text className="text-blue-300 text-sm">
                  1 Rep Max: el peso máximo que puedes levantar por 1 repetición con buena técnica. Útil para programar entrenamientos basados en porcentajes.
                </Text>
              </View>
            </View>
          </View>

          <View className="bg-amber-500/10 rounded-xl p-4 border border-amber-500/30 mb-6">
            <View className="flex-row items-start">
              <Ionicons name="warning" size={20} color="#F59E0B" />
              <View className="flex-1 ml-3">
                <Text className="text-amber-400 font-bold mb-2">
                  Nota Importante
                </Text>
                <Text className="text-amber-300 text-sm">
                  Estas son estimaciones. Tu 1RM real puede variar según técnica, experiencia y condiciones. Usa para planificar, no para maxear sin preparación.
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
