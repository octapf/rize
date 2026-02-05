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

type Gender = 'male' | 'female';

export default function BodyFatCalculator() {
  const [gender, setGender] = useState<Gender>('male');
  const [height, setHeight] = useState('');
  const [waist, setWaist] = useState('');
  const [neck, setNeck] = useState('');
  const [hip, setHip] = useState(''); // Solo para mujeres
  const [bodyFat, setBodyFat] = useState<number | null>(null);

  const calculateBodyFat = () => {
    const heightCm = parseFloat(height);
    const waistCm = parseFloat(waist);
    const neckCm = parseFloat(neck);
    const hipCm = parseFloat(hip);

    if (!heightCm || !waistCm || !neckCm) {
      Alert.alert('Error', 'Por favor completa todos los campos requeridos');
      return;
    }

    if (gender === 'female' && !hipCm) {
      Alert.alert('Error', 'Para mujeres, la medida de cadera es requerida');
      return;
    }

    // Navy Method (U.S. Navy Body Fat Formula)
    let bf: number;

    if (gender === 'male') {
      // Male: 495 / (1.0324 - 0.19077 * log10(waist - neck) + 0.15456 * log10(height)) - 450
      const log10WaistNeck = Math.log10(waistCm - neckCm);
      const log10Height = Math.log10(heightCm);
      bf = 495 / (1.0324 - 0.19077 * log10WaistNeck + 0.15456 * log10Height) - 450;
    } else {
      // Female: 495 / (1.29579 - 0.35004 * log10(waist + hip - neck) + 0.22100 * log10(height)) - 450
      const log10WaistHipNeck = Math.log10(waistCm + hipCm - neckCm);
      const log10Height = Math.log10(heightCm);
      bf = 495 / (1.29579 - 0.35004 * log10WaistHipNeck + 0.221 * log10Height) - 450;
    }

    setBodyFat(Math.round(bf * 10) / 10);
  };

  const getBodyFatCategory = (bf: number, isMale: boolean): { category: string; color: string; description: string } => {
    if (isMale) {
      if (bf < 6) return { category: 'Esencial', color: '#EF4444', description: 'Peligrosamente bajo' };
      if (bf < 14) return { category: 'AtlÃ©tico', color: '#10B981', description: 'Ã“ptimo para deportistas' };
      if (bf < 18) return { category: 'Fitness', color: '#3B82F6', description: 'Saludable y tonificado' };
      if (bf < 25) return { category: 'Promedio', color: '#F59E0B', description: 'Dentro del rango normal' };
      return { category: 'Alto', color: '#EF4444', description: 'Considera reducir grasa corporal' };
    } else {
      if (bf < 14) return { category: 'Esencial', color: '#EF4444', description: 'Peligrosamente bajo' };
      if (bf < 21) return { category: 'AtlÃ©tico', color: '#10B981', description: 'Ã“ptimo para deportistas' };
      if (bf < 25) return { category: 'Fitness', color: '#3B82F6', description: 'Saludable y tonificado' };
      if (bf < 32) return { category: 'Promedio', color: '#F59E0B', description: 'Dentro del rango normal' };
      return { category: 'Alto', color: '#EF4444', description: 'Considera reducir grasa corporal' };
    }
  };

  const reset = () => {
    setHeight('');
    setWaist('');
    setNeck('');
    setHip('');
    setBodyFat(null);
  };

  const category = bodyFat ? getBodyFatCategory(bodyFat, gender === 'male') : null;

  return (
    <View className="flex-1 bg-zinc-950">
      {/* Header */}
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center mb-2">
          <TouchableOpacity onPress={() => router.back()} className="mr-3">
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1">
            Calculadora de Grasa Corporal
          </Text>
        </View>
        <Text className="text-zinc-400 text-sm">
          MÃ©todo Navy - Basado en medidas corporales
        </Text>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="p-6 space-y-6">
          {/* Gender Selection */}
          <View>
            <Text className="text-white text-base font-semibold mb-3">Sexo BiolÃ³gico</Text>
            <View className="flex-row gap-3">
              <TouchableOpacity
                onPress={() => setGender('male')}
                className={`flex-1 p-4 rounded-xl border-2 ${
                  gender === 'male'
                    ? 'bg-primary/20 border-primary'
                    : 'bg-zinc-900 border-zinc-800'
                }`}
              >
                <Ionicons
                  name="male"
                  size={32}
                  color={gender === 'male' ? '#9D12DE' : '#71717A'}
                  style={{ alignSelf: 'center' }}
                />
                <Text
                  className={`text-center mt-2 font-semibold ${
                    gender === 'male' ? 'text-primary' : 'text-zinc-500'
                  }`}
                >
                  Hombre
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setGender('female')}
                className={`flex-1 p-4 rounded-xl border-2 ${
                  gender === 'female'
                    ? 'bg-pink-500/20 border-pink-500'
                    : 'bg-zinc-900 border-zinc-800'
                }`}
              >
                <Ionicons
                  name="female"
                  size={32}
                  color={gender === 'female' ? '#EC4899' : '#71717A'}
                  style={{ alignSelf: 'center' }}
                />
                <Text
                  className={`text-center mt-2 font-semibold ${
                    gender === 'female' ? 'text-pink-500' : 'text-zinc-500'
                  }`}
                >
                  Mujer
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Measurements */}
          <View>
            <Text className="text-white text-base font-semibold mb-3">Medidas (cm)</Text>
            
            <View className="space-y-3">
              <View>
                <Text className="text-zinc-400 text-sm mb-2">Altura</Text>
                <TextInput
                  value={height}
                  onChangeText={setHeight}
                  keyboardType="decimal-pad"
                  placeholder="170"
                  placeholderTextColor="#52525B"
                  className="bg-zinc-900 text-white px-4 py-3 rounded-xl border border-zinc-800"
                />
              </View>

              <View>
                <Text className="text-zinc-400 text-sm mb-2">Cintura (a nivel del ombligo)</Text>
                <TextInput
                  value={waist}
                  onChangeText={setWaist}
                  keyboardType="decimal-pad"
                  placeholder="80"
                  placeholderTextColor="#52525B"
                  className="bg-zinc-900 text-white px-4 py-3 rounded-xl border border-zinc-800"
                />
              </View>

              <View>
                <Text className="text-zinc-400 text-sm mb-2">Cuello (justo debajo de la laringe)</Text>
                <TextInput
                  value={neck}
                  onChangeText={setNeck}
                  keyboardType="decimal-pad"
                  placeholder="38"
                  placeholderTextColor="#52525B"
                  className="bg-zinc-900 text-white px-4 py-3 rounded-xl border border-zinc-800"
                />
              </View>

              {gender === 'female' && (
                <View>
                  <Text className="text-zinc-400 text-sm mb-2">Cadera (parte mÃ¡s ancha)</Text>
                  <TextInput
                    value={hip}
                    onChangeText={setHip}
                    keyboardType="decimal-pad"
                    placeholder="95"
                    placeholderTextColor="#52525B"
                    className="bg-zinc-900 text-white px-4 py-3 rounded-xl border border-zinc-800"
                  />
                </View>
              )}
            </View>
          </View>

          {/* Info Card */}
          <View className="bg-primary/10 border border-primary/30 rounded-xl p-4">
            <View className="flex-row items-start">
              <Ionicons name="information-circle" size={20} color="#9D12DE" style={{ marginRight: 8 }} />
              <View className="flex-1">
                <Text className="text-primary text-sm font-semibold mb-1">
                  CÃ³mo medir correctamente
                </Text>
                <Text className="text-text/70 text-xs leading-5">
                  â€¢ Usa una cinta mÃ©trica flexible{'\n'}
                  â€¢ Mide en la maÃ±ana antes de desayunar{'\n'}
                  â€¢ MantÃ©n la cinta ajustada pero no apretada{'\n'}
                  â€¢ Repite 2-3 veces para asegurar precisiÃ³n
                </Text>
              </View>
            </View>
          </View>

          {/* Calculate Button */}
          <TouchableOpacity
            onPress={calculateBodyFat}
            className="bg-gradient-to-r from-primary to-[#7D0EBE] py-4 rounded-xl active:opacity-80"
            style={{
              shadowColor: '#9D12DE',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
            }}
          >
            <Text className="text-white text-center font-bold text-lg">Calcular Grasa Corporal</Text>
          </TouchableOpacity>

          {/* Results */}
          {bodyFat !== null && category && (
            <View className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
              <Text className="text-zinc-400 text-sm text-center mb-2">Tu Grasa Corporal</Text>
              <Text className="text-white text-5xl font-bold text-center mb-1">
                {bodyFat}%
              </Text>
              
              <View
                className="mt-4 px-4 py-3 rounded-lg"
                style={{ backgroundColor: category.color + '20' }}
              >
                <Text
                  className="text-center font-bold text-lg mb-1"
                  style={{ color: category.color }}
                >
                  {category.category}
                </Text>
                <Text className="text-center text-sm text-zinc-400">
                  {category.description}
                </Text>
              </View>

              {/* Reference Chart */}
              <View className="mt-6">
                <Text className="text-white font-semibold mb-3">Rangos de Referencia</Text>
                {gender === 'male' ? (
                  <View className="space-y-2">
                    <View className="flex-row justify-between py-2 border-b border-zinc-800">
                      <Text className="text-zinc-400">Esencial</Text>
                      <Text className="text-zinc-300">2-5%</Text>
                    </View>
                    <View className="flex-row justify-between py-2 border-b border-zinc-800">
                      <Text className="text-zinc-400">AtlÃ©tico</Text>
                      <Text className="text-zinc-300">6-13%</Text>
                    </View>
                    <View className="flex-row justify-between py-2 border-b border-zinc-800">
                      <Text className="text-zinc-400">Fitness</Text>
                      <Text className="text-zinc-300">14-17%</Text>
                    </View>
                    <View className="flex-row justify-between py-2 border-b border-zinc-800">
                      <Text className="text-zinc-400">Promedio</Text>
                      <Text className="text-zinc-300">18-24%</Text>
                    </View>
                    <View className="flex-row justify-between py-2">
                      <Text className="text-zinc-400">Alto</Text>
                      <Text className="text-zinc-300">&gt;25%</Text>
                    </View>
                  </View>
                ) : (
                  <View className="space-y-2">
                    <View className="flex-row justify-between py-2 border-b border-zinc-800">
                      <Text className="text-zinc-400">Esencial</Text>
                      <Text className="text-zinc-300">10-13%</Text>
                    </View>
                    <View className="flex-row justify-between py-2 border-b border-zinc-800">
                      <Text className="text-zinc-400">AtlÃ©tico</Text>
                      <Text className="text-zinc-300">14-20%</Text>
                    </View>
                    <View className="flex-row justify-between py-2 border-b border-zinc-800">
                      <Text className="text-zinc-400">Fitness</Text>
                      <Text className="text-zinc-300">21-24%</Text>
                    </View>
                    <View className="flex-row justify-between py-2 border-b border-zinc-800">
                      <Text className="text-zinc-400">Promedio</Text>
                      <Text className="text-zinc-300">25-31%</Text>
                    </View>
                    <View className="flex-row justify-between py-2">
                      <Text className="text-zinc-400">Alto</Text>
                      <Text className="text-zinc-300">&gt;32%</Text>
                    </View>
                  </View>
                )}
              </View>
            </View>
          )}

          {/* Reset Button */}
          {bodyFat !== null && (
            <TouchableOpacity
              onPress={reset}
              className="border-2 border-zinc-700 py-3 rounded-xl active:opacity-70"
            >
              <Text className="text-zinc-300 text-center font-semibold">
                Calcular Nuevamente
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

