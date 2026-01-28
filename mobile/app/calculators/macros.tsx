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
type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active' | 'veryActive';
type Goal = 'cutting' | 'maintenance' | 'bulking';

export default function MacroCalculator() {
  const [gender, setGender] = useState<Gender>('male');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>('moderate');
  const [goal, setGoal] = useState<Goal>('maintenance');
  const [result, setResult] = useState<any>(null);

  const activityMultipliers = {
    sedentary: { value: 1.2, label: 'Sedentario', description: 'Poco o ningún ejercicio' },
    light: { value: 1.375, label: 'Ligero', description: '1-3 días/semana' },
    moderate: { value: 1.55, label: 'Moderado', description: '3-5 días/semana' },
    active: { value: 1.725, label: 'Activo', description: '6-7 días/semana' },
    veryActive: { value: 1.9, label: 'Muy Activo', description: 'Entrenamiento 2x/día' },
  };

  const goalAdjustments = {
    cutting: { label: 'Definición', cals: -500, protein: 2.2, desc: 'Perder grasa' },
    maintenance: { label: 'Mantenimiento', cals: 0, protein: 1.8, desc: 'Mantener peso' },
    bulking: { label: 'Volumen', cals: 300, protein: 2.0, desc: 'Ganar músculo' },
  };

  const calculateMacros = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    const a = parseInt(age);

    if (!w || w <= 0) {
      Alert.alert('Error', 'Ingresa un peso válido');
      return;
    }
    if (!h || h <= 0) {
      Alert.alert('Error', 'Ingresa una altura válida');
      return;
    }
    if (!a || a <= 0 || a > 120) {
      Alert.alert('Error', 'Ingresa una edad válida');
      return;
    }

    // Calculate BMR using Mifflin-St Jeor Equation
    let bmr: number;
    if (gender === 'male') {
      bmr = 10 * w + 6.25 * h - 5 * a + 5;
    } else {
      bmr = 10 * w + 6.25 * h - 5 * a - 161;
    }

    // Calculate TDEE (Total Daily Energy Expenditure)
    const tdee = bmr * activityMultipliers[activityLevel].value;

    // Adjust for goal
    const calories = Math.round(tdee + goalAdjustments[goal].cals);

    // Calculate macros
    const proteinGrams = Math.round(w * goalAdjustments[goal].protein);
    const proteinCals = proteinGrams * 4;

    const fatGrams = Math.round(w * 0.8); // 0.8g per kg bodyweight
    const fatCals = fatGrams * 9;

    const remainingCals = calories - proteinCals - fatCals;
    const carbGrams = Math.round(remainingCals / 4);

    setResult({
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      calories,
      protein: proteinGrams,
      carbs: carbGrams,
      fats: fatGrams,
      proteinCals,
      carbCals: carbGrams * 4,
      fatCals,
    });
  };

  const resetCalculator = () => {
    setGender('male');
    setAge('');
    setWeight('');
    setHeight('');
    setActivityLevel('moderate');
    setGoal('maintenance');
    setResult(null);
  };

  const getMacroPercentage = (calories: number, totalCals: number) => {
    return Math.round((calories / totalCals) * 100);
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
            Calculadora de Macros
          </Text>
          <TouchableOpacity onPress={resetCalculator}>
            <Ionicons name="refresh" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          {/* Personal Info */}
          <View className="bg-zinc-900 rounded-xl p-6 mb-6 border border-zinc-800">
            <Text className="text-white text-lg font-bold mb-4">Información Personal</Text>

            {/* Gender */}
            <View className="mb-4">
              <Text className="text-zinc-400 text-sm mb-2">Sexo</Text>
              <View className="flex-row gap-2">
                <TouchableOpacity
                  onPress={() => setGender('male')}
                  className={`flex-1 rounded-lg p-3 ${
                    gender === 'male' ? 'bg-blue-500' : 'bg-zinc-800'
                  }`}
                >
                  <Text className={`text-center font-bold ${
                    gender === 'male' ? 'text-white' : 'text-zinc-400'
                  }`}>
                    Hombre
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setGender('female')}
                  className={`flex-1 rounded-lg p-3 ${
                    gender === 'female' ? 'bg-pink-500' : 'bg-zinc-800'
                  }`}
                >
                  <Text className={`text-center font-bold ${
                    gender === 'female' ? 'text-white' : 'text-zinc-400'
                  }`}>
                    Mujer
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Age */}
            <View className="mb-4">
              <Text className="text-zinc-400 text-sm mb-2">Edad</Text>
              <View className="bg-zinc-800 rounded-xl px-4 py-4">
                <TextInput
                  className="text-white text-lg"
                  placeholder="Ej: 25"
                  placeholderTextColor="#71717A"
                  value={age}
                  onChangeText={setAge}
                  keyboardType="number-pad"
                />
              </View>
            </View>

            {/* Weight */}
            <View className="mb-4">
              <Text className="text-zinc-400 text-sm mb-2">Peso (kg)</Text>
              <View className="bg-zinc-800 rounded-xl px-4 py-4">
                <TextInput
                  className="text-white text-lg"
                  placeholder="Ej: 75"
                  placeholderTextColor="#71717A"
                  value={weight}
                  onChangeText={setWeight}
                  keyboardType="decimal-pad"
                />
              </View>
            </View>

            {/* Height */}
            <View className="mb-0">
              <Text className="text-zinc-400 text-sm mb-2">Altura (cm)</Text>
              <View className="bg-zinc-800 rounded-xl px-4 py-4">
                <TextInput
                  className="text-white text-lg"
                  placeholder="Ej: 175"
                  placeholderTextColor="#71717A"
                  value={height}
                  onChangeText={setHeight}
                  keyboardType="number-pad"
                />
              </View>
            </View>
          </View>

          {/* Activity Level */}
          <View className="bg-zinc-900 rounded-xl p-6 mb-6 border border-zinc-800">
            <Text className="text-white text-lg font-bold mb-4">Nivel de Actividad</Text>
            {(Object.keys(activityMultipliers) as ActivityLevel[]).map((level) => (
              <TouchableOpacity
                key={level}
                onPress={() => setActivityLevel(level)}
                className={`rounded-lg p-3 mb-2 flex-row items-center justify-between ${
                  activityLevel === level ? 'bg-emerald-500' : 'bg-zinc-800'
                }`}
              >
                <View>
                  <Text className={`font-bold ${
                    activityLevel === level ? 'text-white' : 'text-zinc-300'
                  }`}>
                    {activityMultipliers[level].label}
                  </Text>
                  <Text className={`text-sm ${
                    activityLevel === level ? 'text-emerald-100' : 'text-zinc-400'
                  }`}>
                    {activityMultipliers[level].description}
                  </Text>
                </View>
                {activityLevel === level && (
                  <Ionicons name="checkmark-circle" size={24} color="white" />
                )}
              </TouchableOpacity>
            ))}
          </View>

          {/* Goal */}
          <View className="bg-zinc-900 rounded-xl p-6 mb-6 border border-zinc-800">
            <Text className="text-white text-lg font-bold mb-4">Objetivo</Text>
            {(Object.keys(goalAdjustments) as Goal[]).map((g) => (
              <TouchableOpacity
                key={g}
                onPress={() => setGoal(g)}
                className={`rounded-lg p-3 mb-2 flex-row items-center justify-between ${
                  goal === g
                    ? g === 'cutting'
                      ? 'bg-red-500'
                      : g === 'bulking'
                      ? 'bg-blue-500'
                      : 'bg-emerald-500'
                    : 'bg-zinc-800'
                }`}
              >
                <View>
                  <Text className={`font-bold ${
                    goal === g ? 'text-white' : 'text-zinc-300'
                  }`}>
                    {goalAdjustments[g].label}
                  </Text>
                  <Text className={`text-sm ${
                    goal === g ? 'text-white/80' : 'text-zinc-400'
                  }`}>
                    {goalAdjustments[g].desc} ({goalAdjustments[g].cals > 0 ? '+' : ''}{goalAdjustments[g].cals} kcal)
                  </Text>
                </View>
                {goal === g && (
                  <Ionicons name="checkmark-circle" size={24} color="white" />
                )}
              </TouchableOpacity>
            ))}
          </View>

          {/* Calculate Button */}
          <TouchableOpacity
            onPress={calculateMacros}
            className="bg-emerald-500 rounded-xl p-4 mb-6 flex-row items-center justify-center"
          >
            <Ionicons name="calculator" size={20} color="white" />
            <Text className="text-white font-bold ml-2">Calcular Macros</Text>
          </TouchableOpacity>

          {/* Results */}
          {result && (
            <>
              {/* BMR & TDEE */}
              <View className="flex-row gap-2 mb-6">
                <View className="flex-1 bg-zinc-900 rounded-xl p-4 border border-zinc-800">
                  <Text className="text-zinc-400 text-xs mb-2">BMR (Metabolismo Basal)</Text>
                  <Text className="text-white text-2xl font-bold">{result.bmr}</Text>
                  <Text className="text-zinc-400 text-xs">kcal/día</Text>
                </View>
                <View className="flex-1 bg-zinc-900 rounded-xl p-4 border border-zinc-800">
                  <Text className="text-zinc-400 text-xs mb-2">TDEE (Gasto Total)</Text>
                  <Text className="text-emerald-400 text-2xl font-bold">{result.tdee}</Text>
                  <Text className="text-zinc-400 text-xs">kcal/día</Text>
                </View>
              </View>

              {/* Daily Calories */}
              <View className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl p-6 mb-6">
                <Text className="text-emerald-200 text-sm mb-2">CALORÍAS DIARIAS</Text>
                <View className="flex-row items-baseline mb-2">
                  <Text className="text-white text-5xl font-bold">{result.calories}</Text>
                  <Text className="text-emerald-200 text-xl ml-2">kcal</Text>
                </View>
                <Text className="text-emerald-100 text-sm">
                  {goalAdjustments[goal].label} · {activityMultipliers[activityLevel].label}
                </Text>
              </View>

              {/* Macros Breakdown */}
              <View className="bg-zinc-900 rounded-xl p-6 mb-6 border border-zinc-800">
                <Text className="text-white text-lg font-bold mb-4">Distribución de Macros</Text>

                {/* Protein */}
                <View className="mb-4">
                  <View className="flex-row items-center justify-between mb-2">
                    <View className="flex-row items-center">
                      <View className="w-3 h-3 bg-blue-500 rounded-full mr-2" />
                      <Text className="text-white font-bold">Proteína</Text>
                    </View>
                    <View className="flex-row items-baseline">
                      <Text className="text-blue-400 text-2xl font-bold">{result.protein}</Text>
                      <Text className="text-zinc-400 ml-1">g</Text>
                      <Text className="text-zinc-500 ml-2 text-sm">
                        ({getMacroPercentage(result.proteinCals, result.calories)}%)
                      </Text>
                    </View>
                  </View>
                  <View className="bg-zinc-800 h-3 rounded-full overflow-hidden">
                    <View
                      className="bg-blue-500 h-full"
                      style={{ width: `${getMacroPercentage(result.proteinCals, result.calories)}%` }}
                    />
                  </View>
                </View>

                {/* Carbs */}
                <View className="mb-4">
                  <View className="flex-row items-center justify-between mb-2">
                    <View className="flex-row items-center">
                      <View className="w-3 h-3 bg-emerald-500 rounded-full mr-2" />
                      <Text className="text-white font-bold">Carbohidratos</Text>
                    </View>
                    <View className="flex-row items-baseline">
                      <Text className="text-emerald-400 text-2xl font-bold">{result.carbs}</Text>
                      <Text className="text-zinc-400 ml-1">g</Text>
                      <Text className="text-zinc-500 ml-2 text-sm">
                        ({getMacroPercentage(result.carbCals, result.calories)}%)
                      </Text>
                    </View>
                  </View>
                  <View className="bg-zinc-800 h-3 rounded-full overflow-hidden">
                    <View
                      className="bg-emerald-500 h-full"
                      style={{ width: `${getMacroPercentage(result.carbCals, result.calories)}%` }}
                    />
                  </View>
                </View>

                {/* Fats */}
                <View>
                  <View className="flex-row items-center justify-between mb-2">
                    <View className="flex-row items-center">
                      <View className="w-3 h-3 bg-amber-500 rounded-full mr-2" />
                      <Text className="text-white font-bold">Grasas</Text>
                    </View>
                    <View className="flex-row items-baseline">
                      <Text className="text-amber-400 text-2xl font-bold">{result.fats}</Text>
                      <Text className="text-zinc-400 ml-1">g</Text>
                      <Text className="text-zinc-500 ml-2 text-sm">
                        ({getMacroPercentage(result.fatCals, result.calories)}%)
                      </Text>
                    </View>
                  </View>
                  <View className="bg-zinc-800 h-3 rounded-full overflow-hidden">
                    <View
                      className="bg-amber-500 h-full"
                      style={{ width: `${getMacroPercentage(result.fatCals, result.calories)}%` }}
                    />
                  </View>
                </View>
              </View>

              {/* Per Meal Breakdown */}
              <View className="bg-zinc-900 rounded-xl p-6 mb-6 border border-zinc-800">
                <Text className="text-white text-lg font-bold mb-3">Por Comida (5 comidas)</Text>
                <View className="flex-row justify-between">
                  <View className="flex-1 items-center">
                    <Text className="text-zinc-400 text-xs mb-1">Calorías</Text>
                    <Text className="text-white font-bold text-lg">{Math.round(result.calories / 5)}</Text>
                  </View>
                  <View className="flex-1 items-center">
                    <Text className="text-zinc-400 text-xs mb-1">Proteína</Text>
                    <Text className="text-blue-400 font-bold text-lg">{Math.round(result.protein / 5)}g</Text>
                  </View>
                  <View className="flex-1 items-center">
                    <Text className="text-zinc-400 text-xs mb-1">Carbos</Text>
                    <Text className="text-emerald-400 font-bold text-lg">{Math.round(result.carbs / 5)}g</Text>
                  </View>
                  <View className="flex-1 items-center">
                    <Text className="text-zinc-400 text-xs mb-1">Grasas</Text>
                    <Text className="text-amber-400 font-bold text-lg">{Math.round(result.fats / 5)}g</Text>
                  </View>
                </View>
              </View>
            </>
          )}

          {/* Info Cards */}
          <View className="bg-blue-500/10 rounded-xl p-4 border border-blue-500/30 mb-3">
            <View className="flex-row items-start">
              <Ionicons name="information-circle" size={20} color="#3B82F6" />
              <View className="flex-1 ml-3">
                <Text className="text-blue-400 font-bold mb-2">
                  Macronutrientes Explicados
                </Text>
                <Text className="text-blue-300 text-sm">
                  • Proteína: 4 kcal/g - Construcción muscular{'\n'}
                  • Carbohidratos: 4 kcal/g - Energía{'\n'}
                  • Grasas: 9 kcal/g - Hormonas y salud
                </Text>
              </View>
            </View>
          </View>

          <View className="bg-emerald-500/10 rounded-xl p-4 border border-emerald-500/30 mb-6">
            <View className="flex-row items-start">
              <Ionicons name="checkmark-circle" size={20} color="#10B981" />
              <View className="flex-1 ml-3">
                <Text className="text-emerald-400 font-bold mb-2">
                  Consistencia es Clave
                </Text>
                <Text className="text-emerald-300 text-sm">
                  Ajusta según resultados después de 2-4 semanas. Pésate en las mismas condiciones diariamente.
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
