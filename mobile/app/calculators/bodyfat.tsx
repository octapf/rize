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

type Gender = 'male' | 'female';
type Method = 'navy' | 'jackson3' | 'jackson7';

export default function BodyFatCalculator() {
  const [gender, setGender] = useState<Gender>('male');
  const [method, setMethod] = useState<Method>('navy');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  
  // Navy Method
  const [neck, setNeck] = useState('');
  const [waist, setWaist] = useState('');
  const [hip, setHip] = useState('');
  
  // Jackson-Pollock 3 & 7
  const [chest, setChest] = useState('');
  const [abdomen, setAbdomen] = useState('');
  const [thigh, setThigh] = useState('');
  const [tricep, setTricep] = useState('');
  const [suprailiac, setSuprailiac] = useState('');
  const [midaxillary, setMidaxillary] = useState('');
  const [subscapular, setSubscapular] = useState('');
  
  const [result, setResult] = useState<any>(null);

  const calculateNavy = () => {
    const h = parseFloat(height);
    const n = parseFloat(neck);
    const w = parseFloat(waist);
    const hi = parseFloat(hip);

    if (!h || !n || !w || (gender === 'female' && !hi)) {
      Alert.alert('Error', 'Completa todas las medidas requeridas');
      return;
    }

    let bodyFat: number;
    if (gender === 'male') {
      bodyFat = 495 / (1.0324 - 0.19077 * Math.log10(w - n) + 0.15456 * Math.log10(h)) - 450;
    } else {
      bodyFat = 495 / (1.29579 - 0.35004 * Math.log10(w + hi - n) + 0.22100 * Math.log10(h)) - 450;
    }

    return Math.max(0, Math.min(100, bodyFat));
  };

  const calculateJackson3 = () => {
    const c = parseFloat(chest);
    const a = parseFloat(abdomen);
    const t = parseFloat(thigh);
    const tri = parseFloat(tricep);
    const sup = parseFloat(suprailiac);
    const ag = parseInt(age);

    if (gender === 'male') {
      if (!c || !a || !t || !ag) {
        Alert.alert('Error', 'Completa todas las medidas requeridas');
        return;
      }
      const sum = c + a + t;
      const density = 1.10938 - 0.0008267 * sum + 0.0000016 * sum * sum - 0.0002574 * ag;
      return (495 / density) - 450;
    } else {
      if (!tri || !sup || !t || !ag) {
        Alert.alert('Error', 'Completa todas las medidas requeridas');
        return;
      }
      const sum = tri + sup + t;
      const density = 1.0994921 - 0.0009929 * sum + 0.0000023 * sum * sum - 0.0001392 * ag;
      return (495 / density) - 450;
    }
  };

  const calculateJackson7 = () => {
    const c = parseFloat(chest);
    const a = parseFloat(abdomen);
    const t = parseFloat(thigh);
    const tri = parseFloat(tricep);
    const sup = parseFloat(suprailiac);
    const mid = parseFloat(midaxillary);
    const sub = parseFloat(subscapular);
    const ag = parseInt(age);

    if (!c || !a || !t || !tri || !sup || !mid || !sub || !ag) {
      Alert.alert('Error', 'Completa todas las 7 medidas de pliegues');
      return;
    }

    const sum = c + a + t + tri + sup + mid + sub;
    let density: number;
    
    if (gender === 'male') {
      density = 1.112 - 0.00043499 * sum + 0.00000055 * sum * sum - 0.00028826 * ag;
    } else {
      density = 1.097 - 0.00046971 * sum + 0.00000056 * sum * sum - 0.00012828 * ag;
    }
    
    return (495 / density) - 450;
  };

  const calculate = () => {
    const w = parseFloat(weight);
    const ag = parseInt(age);

    if (!w || !ag) {
      Alert.alert('Error', 'Ingresa peso y edad');
      return;
    }

    let bodyFat: number | undefined;

    switch (method) {
      case 'navy':
        bodyFat = calculateNavy();
        break;
      case 'jackson3':
        bodyFat = calculateJackson3();
        break;
      case 'jackson7':
        bodyFat = calculateJackson7();
        break;
    }

    if (bodyFat === undefined) return;

    const fatMass = (w * bodyFat) / 100;
    const leanMass = w - fatMass;
    const category = getCategory(bodyFat, gender);

    setResult({
      bodyFat: Math.round(bodyFat * 10) / 10,
      fatMass: Math.round(fatMass * 10) / 10,
      leanMass: Math.round(leanMass * 10) / 10,
      category,
    });
  };

  const getCategory = (bf: number, g: Gender) => {
    if (g === 'male') {
      if (bf < 6) return { label: 'Esencial', color: 'blue', range: '2-5%' };
      if (bf < 14) return { label: 'Atlético', color: 'emerald', range: '6-13%' };
      if (bf < 18) return { label: 'Fitness', color: 'green', range: '14-17%' };
      if (bf < 25) return { label: 'Promedio', color: 'amber', range: '18-24%' };
      return { label: 'Obesidad', color: 'red', range: '25%+' };
    } else {
      if (bf < 14) return { label: 'Esencial', color: 'blue', range: '10-13%' };
      if (bf < 21) return { label: 'Atlético', color: 'emerald', range: '14-20%' };
      if (bf < 25) return { label: 'Fitness', color: 'green', range: '21-24%' };
      if (bf < 32) return { label: 'Promedio', color: 'amber', range: '25-31%' };
      return { label: 'Obesidad', color: 'red', range: '32%+' };
    }
  };

  const resetCalculator = () => {
    setGender('male');
    setMethod('navy');
    setAge('');
    setWeight('');
    setHeight('');
    setNeck('');
    setWaist('');
    setHip('');
    setChest('');
    setAbdomen('');
    setThigh('');
    setTricep('');
    setSuprailiac('');
    setMidaxillary('');
    setSubscapular('');
    setResult(null);
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
            % Grasa Corporal
          </Text>
          <TouchableOpacity onPress={resetCalculator}>
            <Ionicons name="refresh" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          {/* Method Selection */}
          <View className="bg-zinc-900 rounded-xl p-6 mb-6 border border-zinc-800">
            <Text className="text-white text-lg font-bold mb-4">Método de Cálculo</Text>
            
            <TouchableOpacity
              onPress={() => setMethod('navy')}
              className={`rounded-lg p-3 mb-2 ${method === 'navy' ? 'bg-blue-500' : 'bg-zinc-800'}`}
            >
              <View className="flex-row items-center justify-between">
                <View className="flex-1">
                  <Text className={`font-bold ${method === 'navy' ? 'text-white' : 'text-zinc-300'}`}>
                    Navy Method (US Navy)
                  </Text>
                  <Text className={`text-sm ${method === 'navy' ? 'text-blue-100' : 'text-zinc-400'}`}>
                    Circunferencias: Cuello, Cintura{gender === 'female' ? ', Cadera' : ''}
                  </Text>
                </View>
                {method === 'navy' && <Ionicons name="checkmark-circle" size={24} color="white" />}
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setMethod('jackson3')}
              className={`rounded-lg p-3 mb-2 ${method === 'jackson3' ? 'bg-emerald-500' : 'bg-zinc-800'}`}
            >
              <View className="flex-row items-center justify-between">
                <View className="flex-1">
                  <Text className={`font-bold ${method === 'jackson3' ? 'text-white' : 'text-zinc-300'}`}>
                    Jackson-Pollock 3 Pliegues
                  </Text>
                  <Text className={`text-sm ${method === 'jackson3' ? 'text-emerald-100' : 'text-zinc-400'}`}>
                    Requiere calibrador de pliegues (3 sitios)
                  </Text>
                </View>
                {method === 'jackson3' && <Ionicons name="checkmark-circle" size={24} color="white" />}
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setMethod('jackson7')}
              className={`rounded-lg p-3 ${method === 'jackson7' ? 'bg-amber-500' : 'bg-zinc-800'}`}
            >
              <View className="flex-row items-center justify-between">
                <View className="flex-1">
                  <Text className={`font-bold ${method === 'jackson7' ? 'text-white' : 'text-zinc-300'}`}>
                    Jackson-Pollock 7 Pliegues
                  </Text>
                  <Text className={`text-sm ${method === 'jackson7' ? 'text-amber-100' : 'text-zinc-400'}`}>
                    Más preciso, requiere calibrador (7 sitios)
                  </Text>
                </View>
                {method === 'jackson7' && <Ionicons name="checkmark-circle" size={24} color="white" />}
              </View>
            </TouchableOpacity>
          </View>

          {/* Basic Info */}
          <View className="bg-zinc-900 rounded-xl p-6 mb-6 border border-zinc-800">
            <Text className="text-white text-lg font-bold mb-4">Información Básica</Text>

            {/* Gender */}
            <View className="mb-4">
              <Text className="text-zinc-400 text-sm mb-2">Sexo</Text>
              <View className="flex-row gap-2">
                <TouchableOpacity
                  onPress={() => setGender('male')}
                  className={`flex-1 rounded-lg p-3 ${gender === 'male' ? 'bg-blue-500' : 'bg-zinc-800'}`}
                >
                  <Text className={`text-center font-bold ${gender === 'male' ? 'text-white' : 'text-zinc-400'}`}>
                    Hombre
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setGender('female')}
                  className={`flex-1 rounded-lg p-3 ${gender === 'female' ? 'bg-pink-500' : 'bg-zinc-800'}`}
                >
                  <Text className={`text-center font-bold ${gender === 'female' ? 'text-white' : 'text-zinc-400'}`}>
                    Mujer
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View className="flex-row gap-2 mb-4">
              <View className="flex-1">
                <Text className="text-zinc-400 text-sm mb-2">Edad</Text>
                <TextInput
                  className="bg-zinc-800 rounded-lg px-4 py-3 text-white"
                  placeholder="25"
                  placeholderTextColor="#71717A"
                  value={age}
                  onChangeText={setAge}
                  keyboardType="number-pad"
                />
              </View>
              <View className="flex-1">
                <Text className="text-zinc-400 text-sm mb-2">Peso (kg)</Text>
                <TextInput
                  className="bg-zinc-800 rounded-lg px-4 py-3 text-white"
                  placeholder="75"
                  placeholderTextColor="#71717A"
                  value={weight}
                  onChangeText={setWeight}
                  keyboardType="decimal-pad"
                />
              </View>
            </View>

            {method === 'navy' && (
              <View className="mb-0">
                <Text className="text-zinc-400 text-sm mb-2">Altura (cm)</Text>
                <TextInput
                  className="bg-zinc-800 rounded-lg px-4 py-3 text-white"
                  placeholder="175"
                  placeholderTextColor="#71717A"
                  value={height}
                  onChangeText={setHeight}
                  keyboardType="number-pad"
                />
              </View>
            )}
          </View>

          {/* Method-specific measurements */}
          {method === 'navy' && (
            <View className="bg-zinc-900 rounded-xl p-6 mb-6 border border-zinc-800">
              <Text className="text-white text-lg font-bold mb-4">Circunferencias (cm)</Text>
              
              <View className="mb-4">
                <Text className="text-zinc-400 text-sm mb-2">Cuello</Text>
                <TextInput
                  className="bg-zinc-800 rounded-lg px-4 py-3 text-white"
                  placeholder="38"
                  placeholderTextColor="#71717A"
                  value={neck}
                  onChangeText={setNeck}
                  keyboardType="decimal-pad"
                />
              </View>

              <View className="mb-4">
                <Text className="text-zinc-400 text-sm mb-2">Cintura (ombligo)</Text>
                <TextInput
                  className="bg-zinc-800 rounded-lg px-4 py-3 text-white"
                  placeholder="85"
                  placeholderTextColor="#71717A"
                  value={waist}
                  onChangeText={setWaist}
                  keyboardType="decimal-pad"
                />
              </View>

              {gender === 'female' && (
                <View>
                  <Text className="text-zinc-400 text-sm mb-2">Cadera (punto más ancho)</Text>
                  <TextInput
                    className="bg-zinc-800 rounded-lg px-4 py-3 text-white"
                    placeholder="95"
                    placeholderTextColor="#71717A"
                    value={hip}
                    onChangeText={setHip}
                    keyboardType="decimal-pad"
                  />
                </View>
              )}
            </View>
          )}

          {method === 'jackson3' && (
            <View className="bg-zinc-900 rounded-xl p-6 mb-6 border border-zinc-800">
              <Text className="text-white text-lg font-bold mb-4">
                Pliegues Cutáneos (mm) - 3 Sitios
              </Text>
              
              {gender === 'male' ? (
                <>
                  <View className="mb-4">
                    <Text className="text-zinc-400 text-sm mb-2">Pecho</Text>
                    <TextInput
                      className="bg-zinc-800 rounded-lg px-4 py-3 text-white"
                      placeholder="10"
                      placeholderTextColor="#71717A"
                      value={chest}
                      onChangeText={setChest}
                      keyboardType="decimal-pad"
                    />
                  </View>
                  <View className="mb-4">
                    <Text className="text-zinc-400 text-sm mb-2">Abdomen</Text>
                    <TextInput
                      className="bg-zinc-800 rounded-lg px-4 py-3 text-white"
                      placeholder="20"
                      placeholderTextColor="#71717A"
                      value={abdomen}
                      onChangeText={setAbdomen}
                      keyboardType="decimal-pad"
                    />
                  </View>
                </>
              ) : (
                <>
                  <View className="mb-4">
                    <Text className="text-zinc-400 text-sm mb-2">Tríceps</Text>
                    <TextInput
                      className="bg-zinc-800 rounded-lg px-4 py-3 text-white"
                      placeholder="15"
                      placeholderTextColor="#71717A"
                      value={tricep}
                      onChangeText={setTricep}
                      keyboardType="decimal-pad"
                    />
                  </View>
                  <View className="mb-4">
                    <Text className="text-zinc-400 text-sm mb-2">Suprailiaco</Text>
                    <TextInput
                      className="bg-zinc-800 rounded-lg px-4 py-3 text-white"
                      placeholder="12"
                      placeholderTextColor="#71717A"
                      value={suprailiac}
                      onChangeText={setSuprailiac}
                      keyboardType="decimal-pad"
                    />
                  </View>
                </>
              )}
              <View>
                <Text className="text-zinc-400 text-sm mb-2">Muslo</Text>
                <TextInput
                  className="bg-zinc-800 rounded-lg px-4 py-3 text-white"
                  placeholder="18"
                  placeholderTextColor="#71717A"
                  value={thigh}
                  onChangeText={setThigh}
                  keyboardType="decimal-pad"
                />
              </View>
            </View>
          )}

          {method === 'jackson7' && (
            <View className="bg-zinc-900 rounded-xl p-6 mb-6 border border-zinc-800">
              <Text className="text-white text-lg font-bold mb-4">
                Pliegues Cutáneos (mm) - 7 Sitios
              </Text>
              
              {['Pecho', 'Abdomen', 'Muslo', 'Tríceps', 'Suprailiaco', 'Midaxilar', 'Subescapular'].map((name, index) => {
                const fields = [chest, abdomen, thigh, tricep, suprailiac, midaxillary, subscapular];
                const setters = [setChest, setAbdomen, setThigh, setTricep, setSuprailiac, setMidaxillary, setSubscapular];
                
                return (
                  <View key={name} className={index < 6 ? 'mb-4' : ''}>
                    <Text className="text-zinc-400 text-sm mb-2">{name}</Text>
                    <TextInput
                      className="bg-zinc-800 rounded-lg px-4 py-3 text-white"
                      placeholder="10"
                      placeholderTextColor="#71717A"
                      value={fields[index]}
                      onChangeText={setters[index]}
                      keyboardType="decimal-pad"
                    />
                  </View>
                );
              })}
            </View>
          )}

          {/* Calculate Button */}
          <TouchableOpacity
            onPress={calculate}
            className="bg-emerald-500 rounded-xl p-4 mb-6 flex-row items-center justify-center"
          >
            <Ionicons name="calculator" size={20} color="white" />
            <Text className="text-white font-bold ml-2">Calcular % Grasa</Text>
          </TouchableOpacity>

          {/* Results */}
          {result && (
            <>
              <View className={`bg-${result.category.color}-500/10 rounded-xl p-6 mb-6 border border-${result.category.color}-500/30`}>
                <Text className={`text-${result.category.color}-400 text-sm mb-2`}>
                  TU % DE GRASA CORPORAL
                </Text>
                <View className="flex-row items-baseline mb-2">
                  <Text className={`text-${result.category.color}-400 text-6xl font-bold`}>
                    {result.bodyFat}
                  </Text>
                  <Text className={`text-${result.category.color}-300 text-2xl ml-2`}>%</Text>
                </View>
                <View className={`bg-${result.category.color}-500 rounded-lg px-3 py-1 self-start`}>
                  <Text className="text-white font-bold">{result.category.label}</Text>
                </View>
                <Text className={`text-${result.category.color}-300 text-sm mt-2`}>
                  Rango: {result.category.range}
                </Text>
              </View>

              <View className="flex-row gap-2 mb-6">
                <View className="flex-1 bg-red-500/10 rounded-xl p-4 border border-red-500/30">
                  <Text className="text-red-400 text-xs mb-1">MASA GRASA</Text>
                  <Text className="text-red-400 font-bold text-2xl">{result.fatMass} kg</Text>
                </View>
                <View className="flex-1 bg-emerald-500/10 rounded-xl p-4 border border-emerald-500/30">
                  <Text className="text-emerald-400 text-xs mb-1">MASA MAGRA</Text>
                  <Text className="text-emerald-400 font-bold text-2xl">{result.leanMass} kg</Text>
                </View>
              </View>
            </>
          )}

          {/* Info Card */}
          <View className="bg-blue-500/10 rounded-xl p-4 border border-blue-500/30 mb-6">
            <View className="flex-row items-start">
              <Ionicons name="information-circle" size={20} color="#3B82F6" />
              <View className="flex-1 ml-3">
                <Text className="text-blue-400 font-bold mb-2">
                  Precisión de Métodos
                </Text>
                <Text className="text-blue-300 text-sm">
                  • Navy: Fácil, ~±3-4% error{'\n'}
                  • Jackson-Pollock 3: Preciso, ~±2-3%{'\n'}
                  • Jackson-Pollock 7: Muy preciso, ~±1-2%{'\n\n'}
                  DEXA scan es el gold standard (~±1%)
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
