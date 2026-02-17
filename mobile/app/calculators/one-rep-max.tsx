import React, { useState } from 'react';
import { Text } from '@/components/ui/Text';
import { View, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';;
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface MaxCalculation {
  exercise: string;
  weight: number;
  reps: number;
  oneRepMax: number;
  percentages: {
    percent: number;
    weight: number;
    reps: string;
  }[];
}

const COMMON_EXERCISES = [
  { name: 'Press Banca', icon: 'barbell' },
  { name: 'Sentadilla', icon: 'fitness' },
  { name: 'Peso Muerto', icon: 'body' },
  { name: 'Press Militar', icon: 'rocket' },
  { name: 'Dominadas', icon: 'arrow-up-circle' },
  { name: 'Remo con Barra', icon: 'rowing' },
];

const PERCENTAGE_CHART = [
  { percent: 100, reps: '1', description: 'Máximo absoluto' },
  { percent: 95, reps: '2', description: 'Fuerza pura' },
  { percent: 90, reps: '3-4', description: 'Fuerza' },
  { percent: 85, reps: '5-6', description: 'Fuerza-Hipertrofia' },
  { percent: 80, reps: '7-8', description: 'Hipertrofia' },
  { percent: 75, reps: '9-10', description: 'Hipertrofia' },
  { percent: 70, reps: '11-12', description: 'Resistencia muscular' },
  { percent: 65, reps: '13-15', description: 'Resistencia' },
  { percent: 60, reps: '15+', description: 'Calentamiento/Técnica' },
];

export default function MaxCalculator() {
  const [exercise, setExercise] = useState('');
  const [weight, setWeight] = useState('');
  const [reps, setReps] = useState('');
  const [result, setResult] = useState<MaxCalculation | null>(null);

  const calculateOneRepMax = () => {
    const w = parseFloat(weight);
    const r = parseInt(reps);

    if (!exercise) {
      Alert.alert('Error', 'Selecciona o ingresa un ejercicio');
      return;
    }
    if (!w || w <= 0) {
      Alert.alert('Error', 'Ingresa un peso válido');
      return;
    }
    if (!r || r <= 0 || r > 20) {
      Alert.alert('Error', 'Ingresa repeticiones (1-20)');
      return;
    }

    // Epley Formula: 1RM = weight • (1 + reps/30)
    const oneRepMax = w * (1 + r / 30);

    const percentages = PERCENTAGE_CHART.map((p) => ({
      percent: p.percent,
      weight: Math.round((oneRepMax * p.percent) / 100 / 2.5) * 2.5, // Round to nearest 2.5kg
      reps: p.reps,
    }));

    setResult({
      exercise,
      weight: w,
      reps: r,
      oneRepMax: Math.round(oneRepMax / 2.5) * 2.5,
      percentages,
    });
  };

  const selectExercise = (name: string) => {
    setExercise(name);
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
            1RM Calculator
          </Text>
          <TouchableOpacity onPress={() => Alert.alert('Info', 'Fórmula de Epley para calcular tu máximo')}>
            <Ionicons name="information-circle" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          {/* Exercise Selection */}
          <View className="mb-6">
            <Text className="text-zinc-400 text-sm mb-3">Ejercicio Común</Text>
            <View className="flex-row flex-wrap gap-2 mb-4">
              {COMMON_EXERCISES.map((ex) => (
                <TouchableOpacity
                  key={ex.name}
                  onPress={() => selectExercise(ex.name)}
                  className={`px-4 py-3 rounded-lg flex-row items-center ${
                    exercise === ex.name ? 'bg-primary' : 'bg-zinc-900 border border-zinc-800'
                  }`}
                >
                  <Ionicons
                    name={ex.icon as any}
                    size={16}
                    color={exercise === ex.name ? 'white' : '#71717A'}
                  />
                  <Text className={`ml-2 font-bold ${exercise === ex.name ? 'text-white' : 'text-zinc-400'}`}>
                    {ex.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text className="text-zinc-400 text-sm mb-2">O ingresa otro ejercicio</Text>
            <TextInput
              className="bg-zinc-900 rounded-xl px-4 py-3 text-white text-lg font-bold border border-zinc-800"
              placeholder="Ej: Press Inclinado"
              placeholderTextColor="#71717A"
              value={exercise}
              onChangeText={setExercise}
            />
          </View>

          {/* Weight & Reps Input */}
          <View className="bg-zinc-900 rounded-xl p-6 mb-6 border border-zinc-800">
            <Text className="text-white font-bold text-lg mb-4">Tu Levantamiento</Text>
            
            <View className="mb-4">
              <Text className="text-zinc-400 text-sm mb-2">Peso Levantado (kg)</Text>
              <TextInput
                className="bg-zinc-800 rounded-xl px-4 py-4 text-white text-2xl font-bold"
                placeholder="100"
                placeholderTextColor="#71717A"
                keyboardType="decimal-pad"
                value={weight}
                onChangeText={setWeight}
              />
            </View>

            <View className="mb-4">
              <Text className="text-zinc-400 text-sm mb-2">Repeticiones Completadas</Text>
              <TextInput
                className="bg-zinc-800 rounded-xl px-4 py-4 text-white text-2xl font-bold"
                placeholder="5"
                placeholderTextColor="#71717A"
                keyboardType="numeric"
                value={reps}
                onChangeText={setReps}
              />
              <Text className="text-zinc-500 text-xs mt-2">
                Máximo 20 reps para cálculo preciso
              </Text>
            </View>

            <TouchableOpacity
              onPress={calculateOneRepMax}
              className="bg-primary rounded-xl p-4 flex-row items-center justify-center"
            >
              <Ionicons name="calculator" size={20} color="white" />
              <Text className="text-white font-bold text-lg ml-2">Calcular 1RM</Text>
            </TouchableOpacity>
          </View>

          {/* Result */}
          {result && (
            <View className="mb-6">
              <View className="bg-gradient-to-r from-primary to-[#7D0EBE] rounded-xl p-6 mb-6">
                <Text className="text-white opacity-90 text-sm mb-1">Tu 1RM Estimado</Text>
                <Text className="text-white text-6xl font-bold mb-2">{result.oneRepMax}kg</Text>
                <Text className="text-white opacity-90">
                  {result.exercise}
                </Text>
                <View className="bg-white/20 rounded-lg p-3 mt-4">
                  <Text className="text-white text-sm">
                    Basado en {result.weight}kg • {result.reps} reps
                  </Text>
                </View>
              </View>

              {/* Percentage Chart */}
              <Text className="text-white font-bold text-xl mb-4">
                Pesos de Entrenamiento
              </Text>

              {result.percentages.map((p, idx) => {
                const chartInfo = PERCENTAGE_CHART[idx];
                return (
                  <View
                    key={p.percent}
                    className={`mb-3 rounded-xl p-4 ${
                      p.percent >= 90
                        ? 'bg-red-500/10 border border-red-500/30'
                        : p.percent >= 75
                        ? 'bg-primary/10 border border-primary/30'
                        : 'bg-primary/10 border border-primary/30'
                    }`}
                  >
                    <View className="flex-row items-center justify-between mb-2">
                      <View className="flex-row items-center flex-1">
                        <View
                          className={`w-12 h-12 rounded-xl items-center justify-center ${
                            p.percent >= 90
                              ? 'bg-red-500'
                              : p.percent >= 75
                              ? 'bg-primary'
                              : 'bg-primary'
                          }`}
                        >
                          <Text className="text-white font-bold text-lg">{p.percent}%</Text>
                        </View>
                        <View className="ml-4 flex-1">
                          <Text className="text-white font-bold text-2xl">
                            {p.weight}kg
                          </Text>
                          <Text className="text-zinc-400 text-sm">
                            {p.reps} reps • {chartInfo.description}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                );
              })}

              {/* Save Button */}
              <TouchableOpacity
                onPress={() => Alert.alert('Guardado', 'Máximos guardados en tu perfil')}
                className="bg-primary rounded-xl p-4 flex-row items-center justify-center mt-4"
              >
                <Ionicons name="save" size={20} color="white" />
                <Text className="text-white font-bold ml-2">Guardar Máximos</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Tips */}
          <View className="bg-amber-500/10 rounded-xl p-4 border border-amber-500/30 mb-6">
            <View className="flex-row items-start">
              <Ionicons name="warning" size={20} color="#FFEA00" />
              <View className="flex-1 ml-3">
                <Text className="text-amber-400 font-bold mb-2">
                  Importante sobre 1RM
                </Text>
                <Text className="text-amber-300 text-sm">
                  • Esto es una ESTIMACIÓN, no tu máximo real{'\n'}
                  • Menos preciso con más de 10 reps{'\n'}
                  • Siempre haz calentamiento antes de maxear{'\n'}
                  • Ten spotter para levantamientos pesados{'\n'}
                  • No pruebes 1RM real muy seguido{'\n'}
                  • Usa para programar entrenamientos, no ego lifting
                </Text>
              </View>
            </View>
          </View>

          {/* Formula Info */}
          <View className="bg-zinc-900 rounded-xl p-4 border border-zinc-800 mb-6">
            <Text className="text-white font-bold text-lg mb-3">
              Fórmulas 1RM
            </Text>
            <View className="space-y-2">
              <View className="bg-zinc-800 rounded-lg p-3">
                <Text className="text-primary font-bold mb-1">Epley (Usada Aquí)</Text>
                <Text className="text-zinc-300 text-sm">
                  1RM = Peso • (1 + Reps/30)
                </Text>
              </View>
              <View className="bg-zinc-800 rounded-lg p-3">
                <Text className="text-primary/80 font-bold mb-1">Brzycki</Text>
                <Text className="text-zinc-300 text-sm">
                  1RM = Peso • (36 / (37 - Reps))
                </Text>
              </View>
              <View className="bg-zinc-800 rounded-lg p-3">
                <Text className="text-purple-400 font-bold mb-1">Lombardi</Text>
                <Text className="text-zinc-300 text-sm">
                  1RM = Peso • Reps^0.1
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}


