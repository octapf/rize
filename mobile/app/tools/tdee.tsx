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

export default function TDEECalculatorScreen() {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [activity, setActivity] = useState<number>(1.2);
  const [result, setResult] = useState<{ bmr: number; tdee: number } | null>(null);

  const activityLevels = [
    { value: 1.2, label: 'Sedentario', desc: 'Poco o ningún ejercicio' },
    { value: 1.375, label: 'Ligero', desc: '1-3 días/semana' },
    { value: 1.55, label: 'Moderado', desc: '3-5 días/semana' },
    { value: 1.725, label: 'Activo', desc: '6-7 días/semana' },
    { value: 1.9, label: 'Muy Activo', desc: 'Ejercicio intenso diario' },
  ];

  const calculate = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    const a = parseInt(age);

    if (!w || !h || !a || w <= 0 || h <= 0 || a <= 0) {
      Alert.alert('Error', 'Ingresa valores válidos');
      return;
    }

    // Mifflin-St Jeor Equation
    let bmr = 0;
    if (gender === 'male') {
      bmr = 10 * w + 6.25 * h - 5 * a + 5;
    } else {
      bmr = 10 * w + 6.25 * h - 5 * a - 161;
    }

    const tdee = bmr * activity;

    setResult({
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
    });
  };

  const getGoalCalories = () => {
    if (!result) return [];
    return [
      { goal: 'Pérdida Extrema', calories: Math.round(result.tdee - 1000), desc: '-1000 cal/día' },
      { goal: 'Pérdida Rápida', calories: Math.round(result.tdee - 750), desc: '-750 cal/día' },
      { goal: 'Pérdida Moderada', calories: Math.round(result.tdee - 500), desc: '-500 cal/día' },
      { goal: 'Pérdida Lenta', calories: Math.round(result.tdee - 250), desc: '-250 cal/día' },
      { goal: 'Mantenimiento', calories: result.tdee, desc: 'Mantener peso' },
      { goal: 'Ganancia Lenta', calories: Math.round(result.tdee + 250), desc: '+250 cal/día' },
      { goal: 'Ganancia Moderada', calories: Math.round(result.tdee + 500), desc: '+500 cal/día' },
    ];
  };

  return (
    <View className="flex-1 bg-gray-50">
      <LinearGradient colors={['#FFEA00', '#D97706']} className="px-6 pt-12 pb-6">
        <View className="flex-row items-center justify-between mb-2">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={28} color="white" />
          </TouchableOpacity>
          <Text className="text-2xl font-bold text-white">Calculadora TDEE</Text>
          <TouchableOpacity onPress={() => setResult(null)}>
            <Ionicons name="refresh" size={28} color="white" />
          </TouchableOpacity>
        </View>
        <Text className="text-amber-100 text-center">
          Gasto energético total diario
        </Text>
      </LinearGradient>

      <ScrollView className="flex-1" contentContainerClassName="p-4">
        <Card className="p-4 mb-4">
          <Text className="text-gray-900 font-bold mb-3">Género</Text>
          <View className="flex-row gap-2">
            {[
              { id: 'male', label: 'Hombre', icon: 'male' },
              { id: 'female', label: 'Mujer', icon: 'female' },
            ].map((g) => (
              <TouchableOpacity
                key={g.id}
                onPress={() => setGender(g.id as any)}
                className={`flex-1 flex-row items-center justify-center gap-2 py-3 rounded-lg ${
                  gender === g.id ? 'bg-amber-500' : 'bg-gray-200'
                }`}
              >
                <Ionicons name={g.icon as any} size={24} color={gender === g.id ? 'white' : '#6B7280'} />
                <Text className={`font-bold ${gender === g.id ? 'text-white' : 'text-gray-700'}`}>
                  {g.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Card>

        <Card className="p-4 mb-4">
          <Text className="text-gray-900 font-bold mb-3">Datos Personales</Text>
          <View className="gap-3">
            <View>
              <Text className="text-gray-700 font-semibold mb-2">Edad (años)</Text>
              <TextInput
                value={age}
                onChangeText={setAge}
                placeholder="Ej: 25"
                keyboardType="number-pad"
                className="bg-gray-100 border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-900"
              />
            </View>
            <View>
              <Text className="text-gray-700 font-semibold mb-2">Peso (kg)</Text>
              <TextInput
                value={weight}
                onChangeText={setWeight}
                placeholder="Ej: 75"
                keyboardType="decimal-pad"
                className="bg-gray-100 border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-900"
              />
            </View>
            <View>
              <Text className="text-gray-700 font-semibold mb-2">Altura (cm)</Text>
              <TextInput
                value={height}
                onChangeText={setHeight}
                placeholder="Ej: 175"
                keyboardType="number-pad"
                className="bg-gray-100 border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-900"
              />
            </View>
          </View>
        </Card>

        <Card className="p-4 mb-4">
          <Text className="text-gray-900 font-bold mb-3">Nivel de Actividad</Text>
          <View className="gap-2">
            {activityLevels.map((level) => (
              <TouchableOpacity
                key={level.value}
                onPress={() => setActivity(level.value)}
                className={`p-3 rounded-lg ${
                  activity === level.value ? 'bg-amber-100 border-2 border-amber-500' : 'bg-gray-100'
                }`}
              >
                <Text className={`font-bold ${activity === level.value ? 'text-amber-700' : 'text-gray-700'}`}>
                  {level.label}
                </Text>
                <Text className={`text-sm ${activity === level.value ? 'text-amber-600' : 'text-gray-600'}`}>
                  {level.desc}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Card>

        <TouchableOpacity onPress={calculate} className="mb-4">
          <LinearGradient colors={['#FFEA00', '#D97706']} className="py-4 rounded-lg">
            <Text className="text-white text-center font-bold text-lg">Calcular</Text>
          </LinearGradient>
        </TouchableOpacity>

        {result && (
          <>
            <Card className="p-6 mb-4 bg-gradient-to-r from-amber-50 to-orange-50">
              <View className="gap-4">
                <View>
                  <Text className="text-gray-600 text-sm mb-1">BMR (Metabolismo Basal)</Text>
                  <Text className="text-amber-600 font-bold text-3xl">{result.bmr} cal/día</Text>
                </View>
                <View>
                  <Text className="text-gray-600 text-sm mb-1">TDEE (Gasto Total)</Text>
                  <Text className="text-amber-600 font-bold text-4xl">{result.tdee} cal/día</Text>
                </View>
              </View>
            </Card>

            <Card className="p-4 mb-4">
              <Text className="text-gray-900 font-bold text-lg mb-4">
                Calorías según tu Objetivo
              </Text>
              <View className="gap-2">
                {getGoalCalories().map((item, i) => (
                  <View
                    key={i}
                    className="flex-row items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <View className="flex-1">
                      <Text className="text-gray-900 font-bold">{item.goal}</Text>
                      <Text className="text-gray-600 text-sm">{item.desc}</Text>
                    </View>
                    <Text className="text-amber-600 font-bold text-xl">{item.calories}</Text>
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
              <Text className="text-text font-semibold mb-1">Nota</Text>
              <Text className="text-text/70 text-sm">
                El TDEE es una estimación. Ajusta según tus resultados reales. Para pérdida de grasa, empieza con -300 a -500 calorías.
              </Text>
            </View>
          </View>
        </Card>
      </ScrollView>
    </View>
  );
}

