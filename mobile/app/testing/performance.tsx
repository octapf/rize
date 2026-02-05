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
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

interface StrengthTest {
  id: string;
  exercise: string;
  type: '1RM' | '3RM' | '5RM' | 'AMRAP';
  date: string;
  result: number;
  reps?: number;
  bodyweight?: number;
  notes?: string;
}

interface MaxCalculation {
  weight: number;
  reps: number;
  estimated1RM: number;
  estimated3RM: number;
  estimated5RM: number;
  estimated10RM: number;
}

const STRENGTH_TESTS: StrengthTest[] = [
  {
    id: '1',
    exercise: 'Sentadilla',
    type: '1RM',
    date: '2025-01-27',
    result: 145,
    bodyweight: 82,
    notes: 'Nuevo PR personal',
  },
  {
    id: '2',
    exercise: 'Press Banca',
    type: '1RM',
    date: '2025-01-27',
    result: 105,
    bodyweight: 82,
  },
  {
    id: '3',
    exercise: 'Peso Muerto',
    type: '1RM',
    date: '2025-01-20',
    result: 180,
    bodyweight: 81.5,
  },
  {
    id: '4',
    exercise: 'Press Militar',
    type: '3RM',
    date: '2025-01-15',
    result: 65,
    reps: 3,
    bodyweight: 81,
  },
];

const SQUAT_HISTORY = {
  labels: ['Oct', 'Nov', 'Dic', 'Ene'],
  datasets: [
    {
      data: [130, 135, 140, 145],
    },
  ],
};

export default function PerformanceTesting() {
  const [selectedTab, setSelectedTab] = useState<'tests' | 'calculator' | 'history'>('tests');
  const [calcWeight, setCalcWeight] = useState('100');
  const [calcReps, setCalcReps] = useState('8');
  const [calculation, setCalculation] = useState<MaxCalculation | null>(null);

  const tabs = [
    { id: 'tests' as const, label: 'Tests', icon: 'fitness' },
    { id: 'calculator' as const, label: 'Calculadora', icon: 'calculator' },
    { id: 'history' as const, label: 'Historial', icon: 'trending-up' },
  ];

  const testTypes = [
    { id: '1RM', label: '1RM', description: '1 repeticiÃ³n mÃ¡xima' },
    { id: '3RM', label: '3RM', description: '3 repeticiones mÃ¡ximas' },
    { id: '5RM', label: '5RM', description: '5 repeticiones mÃ¡ximas' },
    { id: 'AMRAP', label: 'AMRAP', description: 'MÃ¡x reps posibles' },
  ];

  const calculate1RM = () => {
    const weight = parseFloat(calcWeight);
    const reps = parseInt(calcReps);

    if (isNaN(weight) || isNaN(reps) || weight <= 0 || reps <= 0) {
      Alert.alert('Error', 'Ingresa valores vÃ¡lidos');
      return;
    }

    // Brzycki formula: 1RM = weight Ã— (36 / (37 - reps))
    const estimated1RM = Math.round(weight * (36 / (37 - reps)));
    const estimated3RM = Math.round(estimated1RM * 0.93);
    const estimated5RM = Math.round(estimated1RM * 0.87);
    const estimated10RM = Math.round(estimated1RM * 0.75);

    setCalculation({
      weight,
      reps,
      estimated1RM,
      estimated3RM,
      estimated5RM,
      estimated10RM,
    });
  };

  const logTest = () => {
    Alert.alert(
      'Nuevo Test de Fuerza',
      'Selecciona el tipo de test',
      [
        { text: '1RM', onPress: () => createTest('1RM') },
        { text: '3RM', onPress: () => createTest('3RM') },
        { text: '5RM', onPress: () => createTest('5RM') },
        { text: 'AMRAP', onPress: () => createTest('AMRAP') },
        { text: 'Cancelar', style: 'cancel' },
      ]
    );
  };

  const createTest = (type: string) => {
    Alert.prompt(
      `Test ${type}`,
      'Ejercicio:',
      (exercise) => {
        if (exercise) {
          Alert.prompt(
            `Test ${type}`,
            'Peso levantado (kg):',
            (weight) => {
              if (weight) {
                Alert.alert('Â¡Test Registrado!', `${type} de ${exercise}: ${weight} kg`);
              }
            }
          );
        }
      }
    );
  };

  const getTestTypeColor = (type: string) => {
    switch (type) {
      case '1RM':
        return '#EF4444';
      case '3RM':
        return '#FFEA00';
      case '5RM':
        return '#9D12DE';
      case 'AMRAP':
        return '#9D12DE';
      default:
        return '#71717A';
    }
  };

  const totalStrength = STRENGTH_TESTS
    .filter((t) => t.type === '1RM')
    .reduce((sum, t) => sum + t.result, 0);

  const bodyweightRatio = (totalStrength / (STRENGTH_TESTS[0]?.bodyweight || 1)).toFixed(2);

  return (
    <View className="flex-1 bg-zinc-950">
      {/* Header */}
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1 ml-3">
            Tests de Rendimiento
          </Text>
          <TouchableOpacity onPress={logTest}>
            <Ionicons name="add-circle" size={24} color="#9D12DE" />
          </TouchableOpacity>
        </View>

        {/* Strength Summary */}
        <View className="bg-gradient-to-br from-primary to-[#7D0EBE] rounded-xl p-4 mb-4">
          <View className="flex-row items-center justify-between">
            <View className="flex-1">
              <Text className="text-white/80 text-sm mb-1">Fuerza Total (1RM)</Text>
              <Text className="text-white font-bold text-4xl mb-1">
                {totalStrength} kg
              </Text>
              <Text className="text-white/80 text-sm">
                {bodyweightRatio}x peso corporal
              </Text>
            </View>
            <View className="bg-white/20 rounded-full p-4">
              <Ionicons name="barbell" size={32} color="white" />
            </View>
          </View>
        </View>

        {/* Tabs */}
        <View className="flex-row gap-2">
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.id}
              onPress={() => setSelectedTab(tab.id)}
              className={`flex-1 flex-row items-center justify-center py-3 rounded-lg ${
                selectedTab === tab.id ? 'bg-primary' : 'bg-zinc-900 border border-zinc-800'
              }`}
            >
              <Ionicons
                name={tab.icon as any}
                size={18}
                color={selectedTab === tab.id ? 'white' : '#71717A'}
              />
              <Text
                className={`ml-2 font-semibold text-sm ${
                  selectedTab === tab.id ? 'text-white' : 'text-zinc-400'
                }`}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Tests Tab */}
        {selectedTab === 'tests' && (
          <View className="px-6 pt-6">
            <Text className="text-white font-bold text-lg mb-3">
              Tests Recientes ({STRENGTH_TESTS.length})
            </Text>

            {STRENGTH_TESTS.map((test) => (
              <View
                key={test.id}
                className="bg-zinc-900 rounded-xl p-4 mb-3 border-l-4"
                style={{ borderLeftColor: getTestTypeColor(test.type) }}
              >
                <View className="flex-row items-start justify-between mb-3">
                  <View className="flex-1">
                    <View className="flex-row items-center mb-2">
                      <View
                        className="px-3 py-1 rounded-full"
                        style={{ backgroundColor: getTestTypeColor(test.type) + '20' }}
                      >
                        <Text
                          className="text-xs font-bold"
                          style={{ color: getTestTypeColor(test.type) }}
                        >
                          {test.type}
                        </Text>
                      </View>
                      <Text className="text-zinc-400 text-xs ml-2">
                        {new Date(test.date).toLocaleDateString('es-ES', {
                          day: 'numeric',
                          month: 'short',
                        })}
                      </Text>
                    </View>
                    <Text className="text-white font-bold text-xl mb-1">
                      {test.exercise}
                    </Text>
                  </View>
                </View>

                <View className="flex-row gap-3 mb-3">
                  <View className="flex-1 bg-zinc-800 rounded-lg p-3">
                    <Text className="text-zinc-400 text-xs mb-1">Resultado</Text>
                    <Text className="text-primary font-bold text-2xl">
                      {test.result} kg
                    </Text>
                  </View>
                  {test.bodyweight && (
                    <View className="flex-1 bg-zinc-800 rounded-lg p-3">
                      <Text className="text-zinc-400 text-xs mb-1">Ratio</Text>
                      <Text className="text-primary font-bold text-2xl">
                        {(test.result / test.bodyweight).toFixed(2)}x
                      </Text>
                    </View>
                  )}
                  {test.reps && (
                    <View className="flex-1 bg-zinc-800 rounded-lg p-3">
                      <Text className="text-zinc-400 text-xs mb-1">Reps</Text>
                      <Text className="text-amber-500 font-bold text-2xl">
                        {test.reps}
                      </Text>
                    </View>
                  )}
                </View>

                {test.notes && (
                  <View className="bg-primary/10 rounded-lg p-3 border border-primary/30">
                    <View className="flex-row items-center">
                      <Ionicons name="trophy" size={16} color="#9D12DE" />
                      <Text className="text-primary text-sm ml-2">{test.notes}</Text>
                    </View>
                  </View>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Calculator Tab */}
        {selectedTab === 'calculator' && (
          <View className="px-6 pt-6">
            <Text className="text-white font-bold text-lg mb-3">
              Calculadora de 1RM
            </Text>

            <View className="bg-zinc-900 rounded-xl p-4 mb-4 border border-zinc-800">
              <Text className="text-white font-bold mb-3">Datos del Levantamiento</Text>

              <View className="mb-4">
                <Text className="text-zinc-400 text-sm mb-2">Peso Levantado (kg)</Text>
                <TextInput
                  value={calcWeight}
                  onChangeText={setCalcWeight}
                  keyboardType="numeric"
                  placeholder="100"
                  placeholderTextColor="#71717A"
                  className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white text-lg font-bold"
                />
              </View>

              <View className="mb-4">
                <Text className="text-zinc-400 text-sm mb-2">Repeticiones Completadas</Text>
                <TextInput
                  value={calcReps}
                  onChangeText={setCalcReps}
                  keyboardType="numeric"
                  placeholder="8"
                  placeholderTextColor="#71717A"
                  className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white text-lg font-bold"
                />
              </View>

              <TouchableOpacity
                onPress={calculate1RM}
                className="bg-primary rounded-lg p-4"
              >
                <Text className="text-white font-bold text-center text-lg">
                  Calcular MÃ¡ximos
                </Text>
              </TouchableOpacity>
            </View>

            {calculation && (
              <View className="bg-zinc-900 rounded-xl p-4 mb-4 border border-primary">
                <View className="flex-row items-center mb-4">
                  <Ionicons name="analytics" size={24} color="#9D12DE" />
                  <Text className="text-white font-bold text-lg ml-2">
                    Resultados Estimados
                  </Text>
                </View>

                <View className="bg-zinc-800 rounded-lg p-4 mb-3">
                  <Text className="text-zinc-400 text-sm mb-2">
                    Levantaste {calculation.weight} kg x {calculation.reps} reps
                  </Text>
                  <View className="h-px bg-zinc-700 my-2" />
                  <View className="flex-row items-baseline">
                    <Text className="text-white/60 text-sm">EstimaciÃ³n usando </Text>
                    <Text className="text-primary text-sm font-bold">
                      FÃ³rmula Brzycki
                    </Text>
                  </View>
                </View>

                <View className="gap-3">
                  <View className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                    <Text className="text-red-500/60 text-xs mb-1">1 REP MÃXIMA</Text>
                    <Text className="text-red-500 font-bold text-3xl">
                      {calculation.estimated1RM} kg
                    </Text>
                  </View>

                  <View className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
                    <Text className="text-amber-500/60 text-xs mb-1">3 REPS MÃXIMAS</Text>
                    <Text className="text-amber-500 font-bold text-2xl">
                      {calculation.estimated3RM} kg
                    </Text>
                  </View>

                  <View className="bg-primary/10 border border-primary/30 rounded-lg p-4">
                    <Text className="text-primary/60 text-xs mb-1">5 REPS MÃXIMAS</Text>
                    <Text className="text-primary font-bold text-2xl">
                      {calculation.estimated5RM} kg
                    </Text>
                  </View>

                  <View className="bg-primary/10 border border-primary/30 rounded-lg p-4">
                    <Text className="text-primary/60 text-xs mb-1">10 REPS MÃXIMAS</Text>
                    <Text className="text-primary font-bold text-2xl">
                      {calculation.estimated10RM} kg
                    </Text>
                  </View>
                </View>
              </View>
            )}

            {/* Info Card */}
            <View className="bg-primary/10 rounded-xl p-4 border border-primary/30">
              <View className="flex-row items-start">
                <Ionicons name="information-circle" size={20} color="#9D12DE" />
                <View className="flex-1 ml-3">
                  <Text className="text-primary/80 font-bold mb-2">
                    Sobre el CÃ¡lculo
                  </Text>
                  <Text className="text-primary/60 text-sm">
                    Esta calculadora usa la fÃ³rmula Brzycki para estimar tu 1RM. Los resultados son aproximaciones y pueden variar segÃºn tu experiencia y tÃ©cnica.
                  </Text>
                </View>
              </View>
            </View>
          </View>
        )}

        {/* History Tab */}
        {selectedTab === 'history' && (
          <View className="px-6 pt-6">
            <Text className="text-white font-bold text-lg mb-3">
              Progreso de Sentadilla
            </Text>

            <View className="bg-zinc-900 rounded-xl p-4 mb-4 border border-zinc-800">
              <LineChart
                data={SQUAT_HISTORY}
                width={screenWidth - 80}
                height={220}
                chartConfig={{
                  backgroundColor: '#18181B',
                  backgroundGradientFrom: '#18181B',
                  backgroundGradientTo: '#18181B',
                  decimalPlaces: 0,
                  color: (opacity = 1) => `rgba(16, 185, 129, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(161, 161, 170, ${opacity})`,
                  style: {
                    borderRadius: 16,
                  },
                  propsForDots: {
                    r: '6',
                    strokeWidth: '2',
                    stroke: '#9D12DE',
                  },
                }}
                bezier
                style={{
                  marginVertical: 8,
                  borderRadius: 16,
                }}
              />

              <View className="flex-row items-center justify-between mt-3">
                <View className="flex-1">
                  <Text className="text-zinc-400 text-xs">Mejora Total</Text>
                  <Text className="text-primary font-bold text-2xl">+15 kg</Text>
                </View>
                <View className="flex-1">
                  <Text className="text-zinc-400 text-xs">Ganancia Mensual</Text>
                  <Text className="text-primary font-bold text-2xl">+3.8 kg</Text>
                </View>
              </View>
            </View>

            {/* Other Lifts */}
            <Text className="text-white font-bold text-lg mb-3">
              Resumen de Levantamientos
            </Text>

            {['Press Banca', 'Peso Muerto', 'Press Militar'].map((exercise, index) => (
              <View
                key={index}
                className="bg-zinc-900 rounded-xl p-4 mb-3 border border-zinc-800"
              >
                <View className="flex-row items-center justify-between">
                  <Text className="text-white font-bold text-lg">{exercise}</Text>
                  <View className="flex-row items-center">
                    <Ionicons name="trending-up" size={16} color="#9D12DE" />
                    <Text className="text-primary font-bold ml-1">
                      {index === 0 ? '+8' : index === 1 ? '+12' : '+5'} kg
                    </Text>
                  </View>
                </View>
                <Text className="text-zinc-400 text-sm mt-1">
                  Ãšltimos 4 meses
                </Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

