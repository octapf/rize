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
import { LinearGradient } from 'expo-linear-gradient';
import { Card } from '@/components/ui/Card';

export default function OneRepMaxCalculatorScreen() {
  const [weight, setWeight] = useState('');
  const [reps, setReps] = useState('');
  const [result, setResult] = useState<number | null>(null);
  const [formula, setFormula] = useState<'epley' | 'brzycki' | 'lander'>('epley');

  const calculate = () => {
    const w = parseFloat(weight);
    const r = parseInt(reps);

    if (!w || !r || w <= 0 || r <= 0 || r > 20) {
      Alert.alert('Error', 'Ingresa valores vÃ¡lidos (1-20 reps)');
      return;
    }

    let oneRM = 0;

    switch (formula) {
      case 'epley':
        // Epley formula: weight Ã— (1 + 0.0333 Ã— reps)
        oneRM = w * (1 + 0.0333 * r);
        break;
      case 'brzycki':
        // Brzycki formula: weight Ã— (36 / (37 - reps))
        oneRM = w * (36 / (37 - r));
        break;
      case 'lander':
        // Lander formula: (100 Ã— weight) / (101.3 - 2.67123 Ã— reps)
        oneRM = (100 * w) / (101.3 - 2.67123 * r);
        break;
    }

    setResult(Math.round(oneRM * 10) / 10);
  };

  const getPercentages = () => {
    if (!result) return [];
    return [
      { percent: 95, weight: Math.round(result * 0.95 * 10) / 10, reps: '1-2' },
      { percent: 90, weight: Math.round(result * 0.9 * 10) / 10, reps: '2-4' },
      { percent: 85, weight: Math.round(result * 0.85 * 10) / 10, reps: '4-6' },
      { percent: 80, weight: Math.round(result * 0.8 * 10) / 10, reps: '6-8' },
      { percent: 75, weight: Math.round(result * 0.75 * 10) / 10, reps: '8-10' },
      { percent: 70, weight: Math.round(result * 0.7 * 10) / 10, reps: '10-12' },
      { percent: 65, weight: Math.round(result * 0.65 * 10) / 10, reps: '12-15' },
    ];
  };

  return (
    <View className="flex-1 bg-gray-50">
      <LinearGradient colors={['#EF4444', '#DC2626']} className="px-6 pt-12 pb-6">
        <View className="flex-row items-center justify-between mb-2">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={28} color="white" />
          </TouchableOpacity>
          <Text className="text-2xl font-bold text-white">Calculadora 1RM</Text>
          <TouchableOpacity onPress={() => setResult(null)}>
            <Ionicons name="refresh" size={28} color="white" />
          </TouchableOpacity>
        </View>
        <Text className="text-red-100 text-center">
          Calcula tu mÃ¡ximo de una repeticiÃ³n
        </Text>
      </LinearGradient>

      <ScrollView className="flex-1" contentContainerClassName="p-4">
        <Card className="p-4 mb-4">
          <Text className="text-gray-900 font-bold mb-3">FÃ³rmula</Text>
          <View className="gap-2">
            {[
              { id: 'epley', name: 'Epley', desc: 'MÃ¡s popular, precisa para 1-10 reps' },
              { id: 'brzycki', name: 'Brzycki', desc: 'Precisa para reps mÃ¡s altas' },
              { id: 'lander', name: 'Lander', desc: 'Conservadora, segura' },
            ].map((f) => (
              <TouchableOpacity
                key={f.id}
                onPress={() => setFormula(f.id as any)}
                className={`p-3 rounded-lg ${
                  formula === f.id ? 'bg-red-100 border-2 border-red-500' : 'bg-gray-100'
                }`}
              >
                <Text className={`font-bold ${formula === f.id ? 'text-red-700' : 'text-gray-700'}`}>
                  {f.name}
                </Text>
                <Text className={`text-sm ${formula === f.id ? 'text-red-600' : 'text-gray-600'}`}>
                  {f.desc}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Card>

        <Card className="p-4 mb-4">
          <Text className="text-gray-900 font-bold mb-3">Datos</Text>
          <View className="gap-3">
            <View>
              <Text className="text-gray-700 font-semibold mb-2">Peso levantado (kg)</Text>
              <TextInput
                value={weight}
                onChangeText={setWeight}
                placeholder="Ej: 100"
                keyboardType="decimal-pad"
                className="bg-gray-100 border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-900 text-xl font-bold"
              />
            </View>
            <View>
              <Text className="text-gray-700 font-semibold mb-2">Repeticiones realizadas</Text>
              <TextInput
                value={reps}
                onChangeText={setReps}
                placeholder="Ej: 5"
                keyboardType="number-pad"
                className="bg-gray-100 border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-900 text-xl font-bold"
              />
            </View>
          </View>

          <TouchableOpacity onPress={calculate} className="mt-4">
            <LinearGradient colors={['#EF4444', '#DC2626']} className="py-3 rounded-lg">
              <Text className="text-white text-center font-bold text-lg">Calcular</Text>
            </LinearGradient>
          </TouchableOpacity>
        </Card>

        {result !== null && (
          <>
            <Card className="p-6 mb-4 bg-gradient-to-r from-red-50 to-orange-50">
              <View className="items-center">
                <Text className="text-red-900 font-bold text-lg mb-2">Tu 1RM Estimado</Text>
                <Text className="text-red-600 font-bold text-5xl">{result} kg</Text>
                <Text className="text-gray-600 text-sm mt-2">FÃ³rmula: {formula.charAt(0).toUpperCase() + formula.slice(1)}</Text>
              </View>
            </Card>

            <Card className="p-4 mb-4">
              <Text className="text-gray-900 font-bold text-lg mb-4">
                Tabla de Entrenamiento
              </Text>
              <View className="gap-2">
                {getPercentages().map((item, i) => (
                  <View
                    key={i}
                    className="flex-row items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <View className="flex-row items-center gap-3">
                      <View className="bg-red-100 px-3 py-1 rounded">
                        <Text className="text-red-700 font-bold">{item.percent}%</Text>
                      </View>
                      <Text className="text-gray-900 font-bold text-lg">{item.weight} kg</Text>
                    </View>
                    <Text className="text-gray-600">{item.reps} reps</Text>
                  </View>
                ))}
              </View>
            </Card>
          </>
        )}

        <Card className="p-4 bg-primary/5 border-primary/20">
          <View className="flex-row gap-3">
            <Ionicons name="information-circle" size={24} color="#9D12DE" />
            <View className="flex-1">
              <Text className="text-text font-semibold mb-1">Importante</Text>
              <Text className="text-text/70 text-sm">
                â€¢ Este cÃ¡lculo es una estimaciÃ³n{'\n'}
                â€¢ Siempre usa un spotter para mÃ¡ximos{'\n'}
                â€¢ Calienta adecuadamente antes{'\n'}
                â€¢ No intentes tu 1RM sin experiencia
              </Text>
            </View>
          </View>
        </Card>
      </ScrollView>
    </View>
  );
}

