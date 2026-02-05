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

interface BodyCompositionResult {
  bodyFat: number;
  leanMass: number;
  fatMass: number;
  category: string;
  health: 'excellent' | 'good' | 'fair' | 'poor';
}

export default function BodyCompositionCalculator() {
  const [method, setMethod] = useState<'navy' | 'jp3' | 'jp7'>('navy');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [age, setAge] = useState('25');
  const [weight, setWeight] = useState('80');
  const [height, setHeight] = useState('180');
  
  // Navy Method measurements
  const [neck, setNeck] = useState('38');
  const [waist, setWaist] = useState('85');
  const [hip, setHip] = useState('100');
  
  // Jackson-Pollock 3-site
  const [chest, setChest] = useState('10');
  const [abdomen, setAbdomen] = useState('20');
  const [thigh, setThigh] = useState('15');
  
  // Jackson-Pollock 7-site (additional)
  const [tricep, setTricep] = useState('12');
  const [subscapular, setSubscapular] = useState('15');
  const [suprailiac, setSuprailiac] = useState('18');
  const [midaxillary, setMidaxillary] = useState('14');

  const [result, setResult] = useState<BodyCompositionResult | null>(null);

  const calculateNavyMethod = (): number => {
    const h = parseFloat(height);
    const n = parseFloat(neck);
    const w = parseFloat(waist);
    const hp = parseFloat(hip);

    if (gender === 'male') {
      // Male formula: 495 / (1.0324 - 0.19077 * log10(waist - neck) + 0.15456 * log10(height)) - 450
      const bodyFat = 495 / (1.0324 - 0.19077 * Math.log10(w - n) + 0.15456 * Math.log10(h)) - 450;
      return Math.max(0, Math.min(100, bodyFat));
    } else {
      // Female formula: 495 / (1.29579 - 0.35004 * log10(waist + hip - neck) + 0.22100 * log10(height)) - 450
      const bodyFat = 495 / (1.29579 - 0.35004 * Math.log10(w + hp - n) + 0.22100 * Math.log10(h)) - 450;
      return Math.max(0, Math.min(100, bodyFat));
    }
  };

  const calculateJP3 = (): number => {
    const ageNum = parseFloat(age);
    const chestMM = parseFloat(chest);
    const abdomenMM = parseFloat(abdomen);
    const thighMM = parseFloat(thigh);

    if (gender === 'male') {
      const sum = chestMM + abdomenMM + thighMM;
      const bodyDensity = 1.10938 - (0.0008267 * sum) + (0.0000016 * sum * sum) - (0.0002574 * ageNum);
      const bodyFat = ((4.95 / bodyDensity) - 4.50) * 100;
      return Math.max(0, Math.min(100, bodyFat));
    } else {
      const tricepMM = parseFloat(tricep);
      const sum = tricepMM + abdomenMM + thighMM;
      const bodyDensity = 1.0994921 - (0.0009929 * sum) + (0.0000023 * sum * sum) - (0.0001392 * ageNum);
      const bodyFat = ((4.95 / bodyDensity) - 4.50) * 100;
      return Math.max(0, Math.min(100, bodyFat));
    }
  };

  const calculateJP7 = (): number => {
    const ageNum = parseFloat(age);
    const chestMM = parseFloat(chest);
    const abdomenMM = parseFloat(abdomen);
    const thighMM = parseFloat(thigh);
    const tricepMM = parseFloat(tricep);
    const subscapularMM = parseFloat(subscapular);
    const suprailiacMM = parseFloat(suprailiac);
    const midaxillaryMM = parseFloat(midaxillary);

    const sum = chestMM + abdomenMM + thighMM + tricepMM + subscapularMM + suprailiacMM + midaxillaryMM;

    if (gender === 'male') {
      const bodyDensity = 1.112 - (0.00043499 * sum) + (0.00000055 * sum * sum) - (0.00028826 * ageNum);
      const bodyFat = ((4.95 / bodyDensity) - 4.50) * 100;
      return Math.max(0, Math.min(100, bodyFat));
    } else {
      const bodyDensity = 1.097 - (0.00046971 * sum) + (0.00000056 * sum * sum) - (0.00012828 * ageNum);
      const bodyFat = ((4.95 / bodyDensity) - 4.50) * 100;
      return Math.max(0, Math.min(100, bodyFat));
    }
  };

  const getBodyFatCategory = (bf: number, isMale: boolean): { category: string; health: 'excellent' | 'good' | 'fair' | 'poor' } => {
    if (isMale) {
      if (bf < 6) return { category: 'Esencial', health: 'poor' };
      if (bf < 14) return { category: 'Atleta', health: 'excellent' };
      if (bf < 18) return { category: 'Fitness', health: 'good' };
      if (bf < 25) return { category: 'Promedio', health: 'fair' };
      return { category: 'Obesidad', health: 'poor' };
    } else {
      if (bf < 14) return { category: 'Esencial', health: 'poor' };
      if (bf < 21) return { category: 'Atleta', health: 'excellent' };
      if (bf < 25) return { category: 'Fitness', health: 'good' };
      if (bf < 32) return { category: 'Promedio', health: 'fair' };
      return { category: 'Obesidad', health: 'poor' };
    }
  };

  const calculateBodyComposition = () => {
    let bodyFat = 0;

    try {
      if (method === 'navy') {
        bodyFat = calculateNavyMethod();
      } else if (method === 'jp3') {
        bodyFat = calculateJP3();
      } else {
        bodyFat = calculateJP7();
      }

      const weightNum = parseFloat(weight);
      const fatMass = (bodyFat / 100) * weightNum;
      const leanMass = weightNum - fatMass;
      const { category, health } = getBodyFatCategory(bodyFat, gender === 'male');

      setResult({
        bodyFat: Math.round(bodyFat * 10) / 10,
        leanMass: Math.round(leanMass * 10) / 10,
        fatMass: Math.round(fatMass * 10) / 10,
        category,
        health,
      });
    } catch (error) {
      Alert.alert('Error', 'Verifica que todos los campos estÃ©n completos');
    }
  };

  const methods = [
    { key: 'navy', label: 'Navy Method', description: 'Mide circunferencias (mÃ¡s fÃ¡cil)', icon: 'analytics' },
    { key: 'jp3', label: 'Jackson-Pollock 3', description: '3 pliegues cutÃ¡neos (preciso)', icon: 'fitness' },
    { key: 'jp7', label: 'Jackson-Pollock 7', description: '7 pliegues (muy preciso)', icon: 'medal' },
  ];

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
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          {/* Info */}
          <View className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl p-6 mb-6">
            <Text className="text-white text-2xl font-bold mb-2">Calcula Tu % Grasa</Text>
            <Text className="text-white opacity-90">
              MÃ©todos cientÃ­ficamente validados para estimar tu composiciÃ³n corporal
            </Text>
          </View>

          {/* Method Selection */}
          <Text className="text-white font-bold text-lg mb-4">MÃ©todo de CÃ¡lculo</Text>
          {methods.map((m) => (
            <TouchableOpacity
              key={m.key}
              onPress={() => setMethod(m.key as any)}
              className={`rounded-xl p-4 mb-3 ${
                method === m.key
                  ? 'bg-primary/10 border-2 border-primary/30'
                  : 'bg-zinc-900 border border-zinc-800'
              }`}
            >
              <View className="flex-row items-center mb-2">
                <View className={`w-10 h-10 rounded-xl items-center justify-center mr-3 ${
                  method === m.key ? 'bg-primary' : 'bg-zinc-800'
                }`}>
                  <Ionicons name={m.icon as any} size={20} color="white" />
                </View>
                <View className="flex-1">
                  <Text className={`font-bold ${method === m.key ? 'text-white' : 'text-zinc-400'}`}>
                    {m.label}
                  </Text>
                  <Text className="text-zinc-500 text-sm">{m.description}</Text>
                </View>
                {method === m.key && (
                  <Ionicons name="checkmark-circle" size={24} color="#9D12DE" />
                )}
              </View>
            </TouchableOpacity>
          ))}

          {/* Gender & Basic Info */}
          <Text className="text-white font-bold text-lg mb-4 mt-6">InformaciÃ³n BÃ¡sica</Text>
          
          <View className="flex-row gap-3 mb-4">
            <TouchableOpacity
              onPress={() => setGender('male')}
              className={`flex-1 rounded-xl p-4 ${
                gender === 'male' ? 'bg-primary' : 'bg-zinc-900 border border-zinc-800'
              }`}
            >
              <Text className={`font-bold text-center ${gender === 'male' ? 'text-white' : 'text-zinc-400'}`}>
                Hombre
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setGender('female')}
              className={`flex-1 rounded-xl p-4 ${
                gender === 'female' ? 'bg-pink-500' : 'bg-zinc-900 border border-zinc-800'
              }`}
            >
              <Text className={`font-bold text-center ${gender === 'female' ? 'text-white' : 'text-zinc-400'}`}>
                Mujer
              </Text>
            </TouchableOpacity>
          </View>

          <View className="flex-row gap-3 mb-4">
            <View className="flex-1">
              <Text className="text-zinc-400 text-sm mb-2">Edad (aÃ±os)</Text>
              <TextInput
                value={age}
                onChangeText={setAge}
                keyboardType="numeric"
                className="bg-zinc-900 rounded-xl p-4 text-white border border-zinc-800"
                placeholder="25"
                placeholderTextColor="#71717A"
              />
            </View>
            <View className="flex-1">
              <Text className="text-zinc-400 text-sm mb-2">Peso (kg)</Text>
              <TextInput
                value={weight}
                onChangeText={setWeight}
                keyboardType="numeric"
                className="bg-zinc-900 rounded-xl p-4 text-white border border-zinc-800"
                placeholder="80"
                placeholderTextColor="#71717A"
              />
            </View>
            <View className="flex-1">
              <Text className="text-zinc-400 text-sm mb-2">Altura (cm)</Text>
              <TextInput
                value={height}
                onChangeText={setHeight}
                keyboardType="numeric"
                className="bg-zinc-900 rounded-xl p-4 text-white border border-zinc-800"
                placeholder="180"
                placeholderTextColor="#71717A"
              />
            </View>
          </View>

          {/* Method-specific measurements */}
          {method === 'navy' && (
            <>
              <Text className="text-white font-bold text-lg mb-4 mt-4">Mediciones (cm)</Text>
              <View className="bg-primary/10 rounded-xl p-4 mb-4 border border-primary/30">
                <Text className="text-primary/80 text-sm mb-2">
                  ðŸ’¡ Mide con cinta mÃ©trica en la parte mÃ¡s ancha/estrecha de cada zona
                </Text>
              </View>
              
              <View className="flex-row gap-3 mb-4">
                <View className="flex-1">
                  <Text className="text-zinc-400 text-sm mb-2">Cuello</Text>
                  <TextInput
                    value={neck}
                    onChangeText={setNeck}
                    keyboardType="numeric"
                    className="bg-zinc-900 rounded-xl p-4 text-white border border-zinc-800"
                  />
                </View>
                <View className="flex-1">
                  <Text className="text-zinc-400 text-sm mb-2">Cintura</Text>
                  <TextInput
                    value={waist}
                    onChangeText={setWaist}
                    keyboardType="numeric"
                    className="bg-zinc-900 rounded-xl p-4 text-white border border-zinc-800"
                  />
                </View>
                {gender === 'female' && (
                  <View className="flex-1">
                    <Text className="text-zinc-400 text-sm mb-2">Cadera</Text>
                    <TextInput
                      value={hip}
                      onChangeText={setHip}
                      keyboardType="numeric"
                      className="bg-zinc-900 rounded-xl p-4 text-white border border-zinc-800"
                    />
                  </View>
                )}
              </View>
            </>
          )}

          {(method === 'jp3' || method === 'jp7') && (
            <>
              <Text className="text-white font-bold text-lg mb-4 mt-4">Pliegues CutÃ¡neos (mm)</Text>
              <View className="bg-purple-500/10 rounded-xl p-4 mb-4 border border-purple-500/30">
                <Text className="text-purple-400 text-sm mb-2">
                  ðŸ’¡ Usa calibrador de pliegues (caliper) - pellizca piel sin mÃºsculo
                </Text>
              </View>

              <View className="flex-row gap-3 mb-4">
                <View className="flex-1">
                  <Text className="text-zinc-400 text-sm mb-2">Pecho</Text>
                  <TextInput
                    value={chest}
                    onChangeText={setChest}
                    keyboardType="numeric"
                    className="bg-zinc-900 rounded-xl p-4 text-white border border-zinc-800"
                  />
                </View>
                <View className="flex-1">
                  <Text className="text-zinc-400 text-sm mb-2">Abdomen</Text>
                  <TextInput
                    value={abdomen}
                    onChangeText={setAbdomen}
                    keyboardType="numeric"
                    className="bg-zinc-900 rounded-xl p-4 text-white border border-zinc-800"
                  />
                </View>
                <View className="flex-1">
                  <Text className="text-zinc-400 text-sm mb-2">Muslo</Text>
                  <TextInput
                    value={thigh}
                    onChangeText={setThigh}
                    keyboardType="numeric"
                    className="bg-zinc-900 rounded-xl p-4 text-white border border-zinc-800"
                  />
                </View>
              </View>

              {method === 'jp7' && (
                <View className="flex-row gap-3 mb-4">
                  <View className="flex-1">
                    <Text className="text-zinc-400 text-sm mb-2">TrÃ­ceps</Text>
                    <TextInput
                      value={tricep}
                      onChangeText={setTricep}
                      keyboardType="numeric"
                      className="bg-zinc-900 rounded-xl p-4 text-white border border-zinc-800"
                    />
                  </View>
                  <View className="flex-1">
                    <Text className="text-zinc-400 text-sm mb-2">Subescapular</Text>
                    <TextInput
                      value={subscapular}
                      onChangeText={setSubscapular}
                      keyboardType="numeric"
                      className="bg-zinc-900 rounded-xl p-4 text-white border border-zinc-800"
                    />
                  </View>
                </View>
              )}

              {method === 'jp7' && (
                <View className="flex-row gap-3 mb-4">
                  <View className="flex-1">
                    <Text className="text-zinc-400 text-sm mb-2">Suprailiaco</Text>
                    <TextInput
                      value={suprailiac}
                      onChangeText={setSuprailiac}
                      keyboardType="numeric"
                      className="bg-zinc-900 rounded-xl p-4 text-white border border-zinc-800"
                    />
                  </View>
                  <View className="flex-1">
                    <Text className="text-zinc-400 text-sm mb-2">Axilar Medio</Text>
                    <TextInput
                      value={midaxillary}
                      onChangeText={setMidaxillary}
                      keyboardType="numeric"
                      className="bg-zinc-900 rounded-xl p-4 text-white border border-zinc-800"
                    />
                  </View>
                </View>
              )}
            </>
          )}

          {/* Calculate Button */}
          <TouchableOpacity
            onPress={calculateBodyComposition}
            className="bg-primary rounded-xl p-5 flex-row items-center justify-center mb-6"
          >
            <Ionicons name="calculator" size={24} color="white" />
            <Text className="text-white font-bold text-lg ml-2">Calcular</Text>
          </TouchableOpacity>

          {/* Results */}
          {result && (
            <View className="mb-6">
              <Text className="text-white font-bold text-lg mb-4">Resultados</Text>
              
              <View className={`bg-gradient-to-r rounded-xl p-6 mb-4 ${
                result.health === 'excellent' ? 'from-emerald-500 to-green-500' :
                result.health === 'good' ? 'from-blue-500 to-cyan-500' :
                result.health === 'fair' ? 'from-amber-500 to-orange-500' :
                'from-red-500 to-pink-500'
              }`}>
                <Text className="text-white opacity-90 text-sm mb-2">% Grasa Corporal</Text>
                <View className="flex-row items-end justify-between mb-3">
                  <Text className="text-white text-5xl font-bold">{result.bodyFat}%</Text>
                  <View className="items-end mb-2">
                    <Text className="text-white font-bold text-xl">{result.category}</Text>
                  </View>
                </View>
              </View>

              <View className="flex-row gap-3 mb-4">
                <View className="flex-1 bg-primary/10 rounded-xl p-4 border border-primary/30">
                  <Text className="text-primary text-xs mb-1">Masa Magra</Text>
                  <Text className="text-white font-bold text-2xl">{result.leanMass} kg</Text>
                </View>
                <View className="flex-1 bg-red-500/10 rounded-xl p-4 border border-red-500/30">
                  <Text className="text-red-400 text-xs mb-1">Masa Grasa</Text>
                  <Text className="text-white font-bold text-2xl">{result.fatMass} kg</Text>
                </View>
              </View>

              {/* Ranges Guide */}
              <View className="bg-zinc-900 rounded-xl p-4 border border-zinc-800">
                <Text className="text-white font-bold mb-3">Rangos de Referencia ({gender === 'male' ? 'Hombre' : 'Mujer'})</Text>
                {gender === 'male' ? (
                  <>
                    <Text className="text-zinc-400 text-sm mb-1">â€¢ 2-5%: Esencial (mÃ­nimo)</Text>
                    <Text className="text-primary text-sm mb-1">â€¢ 6-13%: Atleta</Text>
                    <Text className="text-primary/80 text-sm mb-1">â€¢ 14-17%: Fitness</Text>
                    <Text className="text-amber-400 text-sm mb-1">â€¢ 18-24%: Promedio</Text>
                    <Text className="text-red-400 text-sm">â€¢ 25%+: Obesidad</Text>
                  </>
                ) : (
                  <>
                    <Text className="text-zinc-400 text-sm mb-1">â€¢ 10-13%: Esencial (mÃ­nimo)</Text>
                    <Text className="text-primary text-sm mb-1">â€¢ 14-20%: Atleta</Text>
                    <Text className="text-primary/80 text-sm mb-1">â€¢ 21-24%: Fitness</Text>
                    <Text className="text-amber-400 text-sm mb-1">â€¢ 25-31%: Promedio</Text>
                    <Text className="text-red-400 text-sm">â€¢ 32%+: Obesidad</Text>
                  </>
                )}
              </View>
            </View>
          )}

          {/* Tips */}
          <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-6">
            <View className="flex-row items-start">
              <Ionicons name="information-circle" size={20} color="#9D12DE" />
              <View className="flex-1 ml-3">
                <Text className="text-primary/80 font-bold mb-2">Tips Importantes</Text>
                <Text className="text-primary/60 text-sm">
                  â€¢ Navy Method: Â±4% error (mÃ¡s fÃ¡cil){'\n'}
                  â€¢ JP3: Â±3% error (buena precisiÃ³n){'\n'}
                  â€¢ JP7: Â±2% error (mÃ¡xima precisiÃ³n){'\n'}
                  â€¢ Mide siempre a la misma hora{'\n'}
                  â€¢ Re-mide cada 2-4 semanas{'\n'}
                  â€¢ % grasa &gt; bÃ¡scula para progreso
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

