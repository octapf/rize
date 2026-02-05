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

interface Plate {
  weight: number;
  color: string;
  count: number;
}

const AVAILABLE_PLATES = [
  { weight: 25, color: 'bg-red-500', label: '25kg', emoji: 'ðŸ”´' },
  { weight: 20, color: 'bg-primary', label: '20kg', emoji: 'ðŸ”µ' },
  { weight: 15, color: 'bg-amber-500', label: '15kg', emoji: 'ðŸŸ¡' },
  { weight: 10, color: 'bg-primary', label: '10kg', emoji: 'ðŸŸ¢' },
  { weight: 5, color: 'bg-white', label: '5kg', emoji: 'âšª' },
  { weight: 2.5, color: 'bg-zinc-400', label: '2.5kg', emoji: 'âš«' },
  { weight: 1.25, color: 'bg-purple-500', label: '1.25kg', emoji: 'ðŸŸ£' },
  { weight: 0.5, color: 'bg-pink-500', label: '0.5kg', emoji: 'ðŸ”´' },
];

export default function PlateCalculator() {
  const [targetWeight, setTargetWeight] = useState('');
  const [barWeight, setBarWeight] = useState('20');
  const [result, setResult] = useState<Plate[] | null>(null);

  const calculatePlates = () => {
    const target = parseFloat(targetWeight);
    const bar = parseFloat(barWeight);

    if (!target || target <= 0) {
      Alert.alert('Error', 'Ingresa un peso objetivo válido');
      return;
    }
    if (!bar || bar <= 0) {
      Alert.alert('Error', 'Ingresa un peso de barra válido');
      return;
    }
    if (target < bar) {
      Alert.alert('Error', 'El peso objetivo debe ser mayor que la barra');
      return;
    }

    // Weight to distribute on each side
    let remainingWeight = (target - bar) / 2;
    
    if (remainingWeight < 0) {
      Alert.alert('Error', 'No se puede lograr ese peso con esta barra');
      return;
    }

    const plates: Plate[] = [];

    // Greedy algorithm: use largest plates first
    for (const plate of AVAILABLE_PLATES) {
      const count = Math.floor(remainingWeight / plate.weight);
      if (count > 0) {
        plates.push({
          weight: plate.weight,
          color: plate.color,
          count,
        });
        remainingWeight -= count * plate.weight;
      }
    }

    // Check if we can achieve exact weight
    if (remainingWeight > 0.01) {
      Alert.alert(
        'Peso Aproximado',
        `No se puede lograr exactamente ${target}kg.\nMás cercano: ${(target - remainingWeight * 2).toFixed(2)}kg\n\n¿Continuar con esta configuración?`,
        [
          { text: 'Cancelar', style: 'cancel' },
          { text: 'Aceptar', onPress: () => setResult(plates) },
        ]
      );
      return;
    }

    setResult(plates);
  };

  const getTotalWeight = () => {
    if (!result) return 0;
    const platesWeight = result.reduce((sum, p) => sum + p.weight * p.count, 0);
    return parseFloat(barWeight) + platesWeight * 2;
  };

  const resetCalculator = () => {
    setTargetWeight('');
    setBarWeight('20');
    setResult(null);
  };

  const quickWeights = [60, 80, 100, 120, 140, 160, 180, 200];

  return (
    <View className="flex-1 bg-zinc-950">
      {/* Header */}
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1 ml-3">
            Calculadora de Discos
          </Text>
          <TouchableOpacity onPress={resetCalculator}>
            <Ionicons name="refresh" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          {/* Input Section */}
          <View className="bg-zinc-900 rounded-xl p-6 mb-6 border border-zinc-800">
            <Text className="text-white text-lg font-bold mb-4">Configuración</Text>

            {/* Target Weight */}
            <View className="mb-4">
              <Text className="text-zinc-400 text-sm mb-2">Peso Total Objetivo</Text>
              <View className="bg-zinc-800 rounded-xl px-4 py-4 flex-row items-center">
                <TextInput
                  className="flex-1 text-white text-3xl font-bold"
                  placeholder="100"
                  placeholderTextColor="#71717A"
                  value={targetWeight}
                  onChangeText={setTargetWeight}
                  keyboardType="decimal-pad"
                />
                <Text className="text-zinc-400 text-xl ml-2">kg</Text>
              </View>
            </View>

            {/* Quick Weights */}
            <View className="mb-4">
              <Text className="text-zinc-400 text-sm mb-2">Pesos Rápidos</Text>
              <View className="flex-row flex-wrap gap-2">
                {quickWeights.map((weight) => (
                  <TouchableOpacity
                    key={weight}
                    onPress={() => setTargetWeight(weight.toString())}
                    className="bg-zinc-800 rounded-lg px-4 py-2"
                  >
                    <Text className="text-white font-bold">{weight}kg</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Bar Weight */}
            <View className="mb-0">
              <Text className="text-zinc-400 text-sm mb-2">Peso de la Barra</Text>
              <View className="flex-row gap-2">
                {[20, 15, 10, 7].map((weight) => (
                  <TouchableOpacity
                    key={weight}
                    onPress={() => setBarWeight(weight.toString())}
                    className={`flex-1 rounded-lg p-3 ${
                      barWeight === weight.toString() ? 'bg-primary' : 'bg-zinc-800'
                    }`}
                  >
                    <Text
                      className={`text-center font-bold ${
                        barWeight === weight.toString() ? 'text-white' : 'text-zinc-400'
                      }`}
                    >
                      {weight}kg
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>

          {/* Calculate Button */}
          <TouchableOpacity
            onPress={calculatePlates}
            className="bg-primary rounded-xl p-4 mb-6 flex-row items-center justify-center"
          >
            <Ionicons name="calculator" size={20} color="white" />
            <Text className="text-white font-bold ml-2">Calcular Discos</Text>
          </TouchableOpacity>

          {/* Results */}
          {result && (
            <>
              {/* Total Weight */}
              <View className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl p-6 mb-6">
                <Text className="text-white/70 text-sm mb-2">PESO TOTAL</Text>
                <View className="flex-row items-baseline">
                  <Text className="text-white text-6xl font-bold">{getTotalWeight()}</Text>
                  <Text className="text-white/70 text-2xl ml-2">kg</Text>
                </View>
                <Text className="text-primary/50 text-sm mt-2">
                  Barra: {barWeight}kg + Discos: {(getTotalWeight() - parseFloat(barWeight)).toFixed(2)}kg
                </Text>
              </View>

              {/* Plate Configuration */}
              <View className="bg-zinc-900 rounded-xl p-6 mb-6 border border-zinc-800">
                <Text className="text-white text-lg font-bold mb-4">
                  Por Lado (Cada Extremo)
                </Text>

                {result.length === 0 ? (
                  <View className="items-center py-6">
                    <Text className="text-zinc-400">Solo la barra, sin discos</Text>
                  </View>
                ) : (
                  result.map((plate, index) => (
                    <View
                      key={index}
                      className={`flex-row items-center justify-between p-4 rounded-lg ${
                        index < result.length - 1 ? 'mb-3' : ''
                      } bg-zinc-800`}
                    >
                      <View className="flex-row items-center">
                        <View className={`w-12 h-12 ${plate.color} rounded-full items-center justify-center mr-3`}>
                          <Text className="text-white font-bold">{plate.weight}</Text>
                        </View>
                        <View>
                          <Text className="text-white font-bold">
                            {plate.weight}kg × {plate.count}
                          </Text>
                          <Text className="text-zinc-400 text-sm">
                            {(plate.weight * plate.count).toFixed(2)}kg por lado
                          </Text>
                        </View>
                      </View>
                      <Text className="text-primary font-bold text-xl">
                        {plate.count}
                      </Text>
                    </View>
                  ))
                )}
              </View>

              {/* Visual Representation */}
              <View className="bg-zinc-900 rounded-xl p-6 mb-6 border border-zinc-800">
                <Text className="text-white text-lg font-bold mb-4">
                  Visualización
                </Text>
                
                <View className="items-center">
                  {/* Left plates */}
                  <View className="flex-row items-center">
                    <View className="flex-row">
                      {result.map((plate, index) => (
                        <View key={`left-${index}`} className="flex-row">
                          {[...Array(plate.count)].map((_, i) => (
                            <View
                              key={i}
                              className={`w-3 h-16 ${plate.color} rounded mr-0.5`}
                            />
                          ))}
                        </View>
                      ))}
                    </View>

                    {/* Bar */}
                    <View className="bg-zinc-600 h-4 w-24 mx-2 rounded items-center justify-center">
                      <Text className="text-white text-xs font-bold">{barWeight}kg</Text>
                    </View>

                    {/* Right plates */}
                    <View className="flex-row">
                      {result.map((plate, index) => (
                        <View key={`right-${index}`} className="flex-row">
                          {[...Array(plate.count)].map((_, i) => (
                            <View
                              key={i}
                              className={`w-3 h-16 ${plate.color} rounded ml-0.5`}
                            />
                          ))}
                        </View>
                      ))}
                    </View>
                  </View>

                  <Text className="text-zinc-400 text-sm mt-4">
                    Vista lateral de la barra cargada
                  </Text>
                </View>
              </View>

              {/* Summary */}
              <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-6">
                <View className="flex-row items-start">
                  <Ionicons name="checkmark-circle" size={20} color="#9D12DE" />
                  <View className="flex-1 ml-3">
                    <Text className="text-primary/80 font-bold mb-2">
                      Resumen de Carga
                    </Text>
                    <Text className="text-primary/60 text-sm">
                      • Total de discos: {result.reduce((sum, p) => sum + p.count * 2, 0)} unidades
                      {'\n'}
                      • Discos por lado: {result.reduce((sum, p) => sum + p.count, 0)} unidades
                      {'\n'}
                      • Peso en discos: {(getTotalWeight() - parseFloat(barWeight)).toFixed(2)}kg
                    </Text>
                  </View>
                </View>
              </View>
            </>
          )}

          {/* Available Plates Reference */}
          <View className="bg-zinc-900 rounded-xl p-6 mb-6 border border-zinc-800">
            <Text className="text-white text-lg font-bold mb-4">
              Discos Disponibles
            </Text>
            <View className="flex-row flex-wrap gap-2">
              {AVAILABLE_PLATES.map((plate) => (
                <View
                  key={plate.weight}
                  className={`${plate.color} rounded-lg px-3 py-2`}
                >
                  <Text className="text-white font-bold">{plate.label}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Tips */}
          <View className="bg-amber-500/10 rounded-xl p-4 border border-amber-500/30 mb-6">
            <View className="flex-row items-start">
              <Ionicons name="bulb" size={20} color="#FFEA00" />
              <View className="flex-1 ml-3">
                <Text className="text-amber-400 font-bold mb-2">
                  Tips de Carga
                </Text>
                <Text className="text-amber-300 text-sm">
                  • Carga discos grandes primero (25kg, 20kg)
                  {'\n'}
                  • Usa collares para asegurar discos
                  {'\n'}
                  • Carga ambos lados uniformemente
                  {'\n'}
                  • Micro-discos (0.5kg) para ajustes finos
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}


