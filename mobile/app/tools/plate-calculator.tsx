import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Card } from '@/components/ui/Card';

interface Plate {
  weight: number;
  count: number;
  color: string;
}

const PLATES_KG = [
  { weight: 25, color: '#EF4444' },
  { weight: 20, color: '#9D12DE' },
  { weight: 15, color: '#FFEA00' },
  { weight: 10, color: '#9D12DE' },
  { weight: 5, color: '#FFFFFF' },
  { weight: 2.5, color: '#6B7280' },
  { weight: 1.25, color: '#9CA3AF' },
];

const PLATES_LBS = [
  { weight: 45, color: '#EF4444' },
  { weight: 35, color: '#9D12DE' },
  { weight: 25, color: '#9D12DE' },
  { weight: 10, color: '#FFFFFF' },
  { weight: 5, color: '#6B7280' },
  { weight: 2.5, color: '#9CA3AF' },
];

const BAR_WEIGHTS = {
  kg: { standard: 20, women: 15, ez: 10 },
  lbs: { standard: 45, women: 35, ez: 20 },
};

export default function PlateCalculatorScreen() {
  const [targetWeight, setTargetWeight] = useState('');
  const [unit, setUnit] = useState<'kg' | 'lbs'>('kg');
  const [barType, setBarType] = useState<'standard' | 'women' | 'ez'>('standard');
  const [result, setResult] = useState<Plate[] | null>(null);

  const plates = unit === 'kg' ? PLATES_KG : PLATES_LBS;
  const barWeight = BAR_WEIGHTS[unit][barType];

  const calculatePlates = () => {
    const target = parseFloat(targetWeight);

    if (!target || target <= 0) {
      Alert.alert('Error', 'Ingresa un peso válido');
      return;
    }

    if (target < barWeight) {
      Alert.alert('Error', `El peso debe ser mayor a ${barWeight}${unit}`);
      return;
    }

    if (target === barWeight) {
      setResult([]);
      return;
    }

    let remaining = (target - barWeight) / 2; // Weight per side
    const platesNeeded: Plate[] = [];

    for (const plate of plates) {
      const count = Math.floor(remaining / plate.weight);
      if (count > 0) {
        platesNeeded.push({
          weight: plate.weight,
          count,
          color: plate.color,
        });
        remaining -= count * plate.weight;
      }
    }

    if (remaining > 0.1) {
      Alert.alert(
        'Aproximación',
        `No se puede lograr el peso exacto con los discos disponibles.\nDiferencia: ${(remaining * 2).toFixed(2)}${unit}`
      );
    }

    setResult(platesNeeded);
  };

  const getTotalWeight = () => {
    if (!result) return 0;
    const platesWeight = result.reduce((sum, p) => sum + (p.weight * p.count * 2), 0);
    return barWeight + platesWeight;
  };

  const resetCalculator = () => {
    setTargetWeight('');
    setResult(null);
  };

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <LinearGradient colors={['#8B5CF6', '#7C3AED']} className="px-6 pt-12 pb-6">
        <View className="flex-row items-center justify-between mb-4">
          <TouchableOpacity onPress={() => router.back()} className="p-2">
            <Ionicons name="arrow-back" size={28} color="white" />
          </TouchableOpacity>
          <Text className="text-2xl font-bold text-white">Calculadora de Discos</Text>
          <TouchableOpacity onPress={resetCalculator} className="p-2">
            <Ionicons name="refresh" size={28} color="white" />
          </TouchableOpacity>
        </View>

        <Text className="text-purple-100 text-center">
          Calcula qué discos usar para tu peso objetivo
        </Text>
      </LinearGradient>

      <ScrollView className="flex-1" contentContainerClassName="p-6">
        {/* Units Toggle */}
        <Card className="p-4 mb-4">
          <Text className="text-gray-900 font-bold mb-3">Unidad</Text>
          <View className="flex-row gap-2">
            {(['kg', 'lbs'] as const).map((u) => (
              <TouchableOpacity
                key={u}
                onPress={() => setUnit(u)}
                className={`flex-1 py-3 rounded-lg ${
                  unit === u ? 'bg-purple-500' : 'bg-gray-200'
                }`}
              >
                <Text className={`text-center font-bold ${
                  unit === u ? 'text-white' : 'text-gray-700'
                }`}>
                  {u.toUpperCase()}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Card>

        {/* Bar Type */}
        <Card className="p-4 mb-4">
          <Text className="text-gray-900 font-bold mb-3">Tipo de Barra</Text>
          <View className="gap-2">
            {[
              { id: 'standard', label: `Olímpica (${BAR_WEIGHTS[unit].standard}${unit})`, icon: 'barbell' },
              { id: 'women', label: `Mujer (${BAR_WEIGHTS[unit].women}${unit})`, icon: 'barbell' },
              { id: 'ez', label: `EZ Bar (${BAR_WEIGHTS[unit].ez}${unit})`, icon: 'barbell' },
            ].map((type) => (
              <TouchableOpacity
                key={type.id}
                onPress={() => setBarType(type.id as any)}
                className={`flex-row items-center gap-3 p-3 rounded-lg ${
                  barType === type.id ? 'bg-purple-100 border-2 border-purple-500' : 'bg-gray-100'
                }`}
              >
                <Ionicons
                  name={type.icon as any}
                  size={24}
                  color={barType === type.id ? '#8B5CF6' : '#6B7280'}
                />
                <Text className={`font-semibold ${
                  barType === type.id ? 'text-purple-700' : 'text-gray-700'
                }`}>
                  {type.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Card>

        {/* Target Weight Input */}
        <Card className="p-4 mb-4">
          <Text className="text-gray-900 font-bold mb-3">Peso Objetivo</Text>
          <View className="flex-row items-center gap-3">
            <View className="flex-1">
              <TextInput
                value={targetWeight}
                onChangeText={setTargetWeight}
                placeholder={`Ej: ${unit === 'kg' ? '100' : '225'}`}
                keyboardType="decimal-pad"
                className="bg-gray-100 border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-900 text-2xl font-bold text-center"
              />
            </View>
            <Text className="text-gray-600 text-xl font-bold">{unit}</Text>
          </View>

          <TouchableOpacity
            onPress={calculatePlates}
            className="mt-4"
          >
            <LinearGradient
              colors={['#8B5CF6', '#7C3AED']}
              className="py-3 rounded-lg"
            >
              <Text className="text-white text-center font-bold text-lg">
                Calcular
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </Card>

        {/* Result */}
        {result !== null && (
          <Card className="p-4 mb-4 bg-gradient-to-r from-purple-50 to-pink-50">
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-purple-900 font-bold text-xl">
                Resultado
              </Text>
              <Text className="text-purple-700 font-bold text-2xl">
                {getTotalWeight()}{unit}
              </Text>
            </View>

            {result.length === 0 ? (
              <View className="items-center py-4">
                <Ionicons name="checkmark-circle" size={48} color="#9D12DE" />
                <Text className="text-gray-900 font-bold text-lg mt-2">
                  Solo la barra
                </Text>
                <Text className="text-gray-600">
                  {barWeight}{unit}
                </Text>
              </View>
            ) : (
              <>
                <Text className="text-purple-700 font-semibold mb-3">
                  Por cada lado:
                </Text>

                <View className="gap-2 mb-4">
                  {result.map((plate, i) => (
                    <View
                      key={i}
                      className="flex-row items-center justify-between p-3 bg-white rounded-lg"
                    >
                      <View className="flex-row items-center gap-3">
                        <View
                          className="w-12 h-12 rounded-full items-center justify-center border-4"
                          style={{
                            backgroundColor: plate.color,
                            borderColor: plate.color === '#FFFFFF' ? '#D1D5DB' : plate.color,
                          }}
                        >
                          <Text
                            className="font-bold"
                            style={{ color: plate.color === '#FFFFFF' ? '#1F2937' : '#fff' }}
                          >
                            {plate.weight}
                          </Text>
                        </View>
                        <Text className="text-gray-900 font-semibold text-lg">
                          {plate.weight}{unit}
                        </Text>
                      </View>
                      <View className="bg-purple-100 px-3 py-1 rounded-full">
                        <Text className="text-purple-700 font-bold">
                          ×{plate.count}
                        </Text>
                      </View>
                    </View>
                  ))}
                </View>

                {/* Visual Bar */}
                <View className="bg-white p-4 rounded-lg">
                  <Text className="text-gray-700 font-semibold mb-2 text-center">
                    Vista de Barra
                  </Text>
                  <View className="flex-row items-center justify-center gap-1">
                    {/* Left side */}
                    {[...result].reverse().map((plate, i) => (
                      <View
                        key={`left-${i}`}
                        className="items-center justify-center"
                        style={{
                          width: 8 + plate.weight / 2,
                          height: 40 + plate.weight,
                          backgroundColor: plate.color,
                          borderWidth: 2,
                          borderColor: plate.color === '#FFFFFF' ? '#D1D5DB' : plate.color,
                          borderRadius: 4,
                        }}
                      />
                    ))}

                    {/* Bar */}
                    <View className="bg-gray-800 h-3" style={{ width: 80 }} />

                    {/* Right side */}
                    {[...result].reverse().map((plate, i) => (
                      <View
                        key={`right-${i}`}
                        className="items-center justify-center"
                        style={{
                          width: 8 + plate.weight / 2,
                          height: 40 + plate.weight,
                          backgroundColor: plate.color,
                          borderWidth: 2,
                          borderColor: plate.color === '#FFFFFF' ? '#D1D5DB' : plate.color,
                          borderRadius: 4,
                        }}
                      />
                    ))}
                  </View>
                </View>
              </>
            )}
          </Card>
        )}

        {/* Info */}
        <Card className="p-4 bg-primary/5 border-primary/20">
          <View className="flex-row gap-3">
            <Ionicons name="information-circle" size={24} color="#9D12DE" />
            <View className="flex-1">
              <Text className="text-text font-semibold mb-1">
                Consejos
              </Text>
              <Text className="text-text/70 text-sm">
                • Los discos se colocan simétricos en ambos lados{'\n'}
                • Empieza siempre con los discos más pesados{'\n'}
                • Usa collares para asegurar los discos{'\n'}
                • Verifica el peso total antes de levantar
              </Text>
            </View>
          </View>
        </Card>
      </ScrollView>
    </View>
  );
}

