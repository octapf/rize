import React, { useState, useEffect } from 'react';
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

type Goal = 'cut' | 'maintain' | 'bulk';
type MacroSplit = 'balanced' | 'high-protein' | 'low-carb' | 'keto';

interface MacroSplitConfig {
  name: string;
  protein: number; // % of total calories
  carbs: number;
  fats: number;
  description: string;
}

const MACRO_SPLITS: Record<MacroSplit, MacroSplitConfig> = {
  balanced: {
    name: 'Balanceado',
    protein: 30,
    carbs: 40,
    fats: 30,
    description: 'Distribución equilibrada para mantenimiento general',
  },
  'high-protein': {
    name: 'Alto en Proteína',
    protein: 40,
    carbs: 30,
    fats: 30,
    description: 'Ideal para ganar músculo o perder grasa',
  },
  'low-carb': {
    name: 'Bajo en Carbos',
    protein: 35,
    carbs: 20,
    fats: 45,
    description: 'Reduce carbohidratos para pérdida de grasa',
  },
  keto: {
    name: 'Cetogénica',
    protein: 25,
    carbs: 5,
    fats: 70,
    description: 'Muy bajo en carbos, alto en grasas',
  },
};

export default function MacrosCalculator() {
  const [tdee, setTdee] = useState('');
  const [goal, setGoal] = useState<Goal>('maintain');
  const [macroSplit, setMacroSplit] = useState<MacroSplit>('balanced');
  const [targetCalories, setTargetCalories] = useState<number | null>(null);
  const [macros, setMacros] = useState<{
    protein: { grams: number; calories: number };
    carbs: { grams: number; calories: number };
    fats: { grams: number; calories: number };
  } | null>(null);

  // Auto-calculate when TDEE or goal changes
  useEffect(() => {
    const tdeeNum = parseFloat(tdee);
    if (!tdeeNum || tdeeNum < 1000 || tdeeNum > 5000) {
      setTargetCalories(null);
      setMacros(null);
      return;
    }

    let calories = tdeeNum;
    switch (goal) {
      case 'cut':
        calories = tdeeNum - 500; // 500 cal deficit
        break;
      case 'maintain':
        calories = tdeeNum;
        break;
      case 'bulk':
        calories = tdeeNum + 300; // 300 cal surplus
        break;
    }

    setTargetCalories(Math.round(calories));
    calculateMacros(calories);
  }, [tdee, goal, macroSplit]);

  const calculateMacros = (calories: number) => {
    const split = MACRO_SPLITS[macroSplit];

    // Calculate calories per macro
    const proteinCals = (calories * split.protein) / 100;
    const carbsCals = (calories * split.carbs) / 100;
    const fatsCals = (calories * split.fats) / 100;

    // Convert to grams (protein: 4 cal/g, carbs: 4 cal/g, fats: 9 cal/g)
    const proteinGrams = Math.round(proteinCals / 4);
    const carbsGrams = Math.round(carbsCals / 4);
    const fatsGrams = Math.round(fatsCals / 9);

    setMacros({
      protein: { grams: proteinGrams, calories: Math.round(proteinCals) },
      carbs: { grams: carbsGrams, calories: Math.round(carbsCals) },
      fats: { grams: fatsGrams, calories: Math.round(fatsCals) },
    });
  };

  const getMealPlanSuggestion = () => {
    if (!macros) return null;

    const mealsCount = 3; // 3 comidas principales
    return {
      protein: Math.round(macros.protein.grams / mealsCount),
      carbs: Math.round(macros.carbs.grams / mealsCount),
      fats: Math.round(macros.fats.grams / mealsCount),
    };
  };

  const mealPlan = getMealPlanSuggestion();

  return (
    <View className="flex-1 bg-zinc-950">
      {/* Header */}
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center mb-2">
          <TouchableOpacity onPress={() => router.back()} className="mr-3">
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1">
            Calculadora de Macros
          </Text>
        </View>
        <Text className="text-zinc-400 text-sm">
          Personaliza tu distribución de macronutrientes
        </Text>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="p-6 space-y-6">
          {/* TDEE Input */}
          <View>
            <Text className="text-white text-base font-semibold mb-2">
              Tu TDEE (Calorías de Mantenimiento)
            </Text>
            <Text className="text-zinc-400 text-sm mb-3">
              Si no conoces tu TDEE, usa la calculadora TDEE primero
            </Text>
            <TextInput
              value={tdee}
              onChangeText={setTdee}
              keyboardType="numeric"
              placeholder="2500"
              placeholderTextColor="#52525B"
              className="bg-zinc-900 text-white px-4 py-3 rounded-xl border border-zinc-800 text-lg"
            />
          </View>

          {/* Goal Selection */}
          <View>
            <Text className="text-white text-base font-semibold mb-3">Objetivo</Text>
            <View className="space-y-3">
              <TouchableOpacity
                onPress={() => setGoal('cut')}
                className={`p-4 rounded-xl border-2 flex-row items-center ${
                  goal === 'cut'
                    ? 'bg-red-500/20 border-red-500'
                    : 'bg-zinc-900 border-zinc-800'
                }`}
              >
                <Ionicons
                  name="trending-down"
                  size={24}
                  color={goal === 'cut' ? '#EF4444' : '#71717A'}
                />
                <View className="ml-3 flex-1">
                  <Text
                    className={`font-semibold ${
                      goal === 'cut' ? 'text-red-500' : 'text-zinc-300'
                    }`}
                  >
                    Definición (Cut)
                  </Text>
                  <Text className="text-zinc-500 text-xs">-500 cal del TDEE</Text>
                </View>
                {goal === 'cut' && (
                  <Ionicons name="checkmark-circle" size={24} color="#EF4444" />
                )}
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setGoal('maintain')}
                className={`p-4 rounded-xl border-2 flex-row items-center ${
                  goal === 'maintain'
                    ? 'bg-blue-500/20 border-blue-500'
                    : 'bg-zinc-900 border-zinc-800'
                }`}
              >
                <Ionicons
                  name="remove"
                  size={24}
                  color={goal === 'maintain' ? '#3B82F6' : '#71717A'}
                />
                <View className="ml-3 flex-1">
                  <Text
                    className={`font-semibold ${
                      goal === 'maintain' ? 'text-blue-500' : 'text-zinc-300'
                    }`}
                  >
                    Mantenimiento
                  </Text>
                  <Text className="text-zinc-500 text-xs">Igual al TDEE</Text>
                </View>
                {goal === 'maintain' && (
                  <Ionicons name="checkmark-circle" size={24} color="#3B82F6" />
                )}
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setGoal('bulk')}
                className={`p-4 rounded-xl border-2 flex-row items-center ${
                  goal === 'bulk'
                    ? 'bg-green-500/20 border-green-500'
                    : 'bg-zinc-900 border-zinc-800'
                }`}
              >
                <Ionicons
                  name="trending-up"
                  size={24}
                  color={goal === 'bulk' ? '#10B981' : '#71717A'}
                />
                <View className="ml-3 flex-1">
                  <Text
                    className={`font-semibold ${
                      goal === 'bulk' ? 'text-green-500' : 'text-zinc-300'
                    }`}
                  >
                    Volumen (Bulk)
                  </Text>
                  <Text className="text-zinc-500 text-xs">+300 cal del TDEE</Text>
                </View>
                {goal === 'bulk' && (
                  <Ionicons name="checkmark-circle" size={24} color="#10B981" />
                )}
              </TouchableOpacity>
            </View>
          </View>

          {/* Macro Split Selection */}
          <View>
            <Text className="text-white text-base font-semibold mb-3">
              Distribución de Macros
            </Text>
            <View className="space-y-3">
              {(Object.keys(MACRO_SPLITS) as MacroSplit[]).map((split) => {
                const config = MACRO_SPLITS[split];
                const isSelected = macroSplit === split;
                return (
                  <TouchableOpacity
                    key={split}
                    onPress={() => setMacroSplit(split)}
                    className={`p-4 rounded-xl border-2 ${
                      isSelected
                        ? 'bg-emerald-500/20 border-emerald-500'
                        : 'bg-zinc-900 border-zinc-800'
                    }`}
                  >
                    <View className="flex-row items-center justify-between mb-2">
                      <Text
                        className={`font-semibold ${
                          isSelected ? 'text-emerald-500' : 'text-zinc-300'
                        }`}
                      >
                        {config.name}
                      </Text>
                      {isSelected && (
                        <Ionicons name="checkmark-circle" size={20} color="#10B981" />
                      )}
                    </View>
                    <Text className="text-zinc-500 text-xs mb-2">
                      {config.description}
                    </Text>
                    <View className="flex-row justify-between">
                      <Text className="text-zinc-400 text-xs">
                        P: {config.protein}%
                      </Text>
                      <Text className="text-zinc-400 text-xs">
                        C: {config.carbs}%
                      </Text>
                      <Text className="text-zinc-400 text-xs">
                        G: {config.fats}%
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Results */}
          {targetCalories && macros && (
            <View className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
              {/* Target Calories */}
              <View className="items-center mb-6 pb-6 border-b border-zinc-800">
                <Text className="text-zinc-400 text-sm mb-1">Calorías Objetivo</Text>
                <Text className="text-white text-4xl font-bold">
                  {targetCalories.toLocaleString()}
                </Text>
                <Text className="text-zinc-500 text-sm mt-1">kcal/día</Text>
              </View>

              {/* Macros Breakdown */}
              <View className="space-y-4">
                {/* Protein */}
                <View>
                  <View className="flex-row justify-between items-center mb-2">
                    <View className="flex-row items-center">
                      <View className="w-3 h-3 rounded-full bg-red-500 mr-2" />
                      <Text className="text-white font-semibold">Proteína</Text>
                    </View>
                    <Text className="text-white font-bold text-lg">
                      {macros.protein.grams}g
                    </Text>
                  </View>
                  <View className="bg-zinc-800 h-2 rounded-full overflow-hidden">
                    <View
                      className="bg-red-500 h-full"
                      style={{
                        width: `${MACRO_SPLITS[macroSplit].protein}%`,
                      }}
                    />
                  </View>
                  <Text className="text-zinc-500 text-xs mt-1">
                    {macros.protein.calories} kcal ({MACRO_SPLITS[macroSplit].protein}%)
                  </Text>
                </View>

                {/* Carbs */}
                <View>
                  <View className="flex-row justify-between items-center mb-2">
                    <View className="flex-row items-center">
                      <View className="w-3 h-3 rounded-full bg-blue-500 mr-2" />
                      <Text className="text-white font-semibold">Carbohidratos</Text>
                    </View>
                    <Text className="text-white font-bold text-lg">
                      {macros.carbs.grams}g
                    </Text>
                  </View>
                  <View className="bg-zinc-800 h-2 rounded-full overflow-hidden">
                    <View
                      className="bg-blue-500 h-full"
                      style={{
                        width: `${MACRO_SPLITS[macroSplit].carbs}%`,
                      }}
                    />
                  </View>
                  <Text className="text-zinc-500 text-xs mt-1">
                    {macros.carbs.calories} kcal ({MACRO_SPLITS[macroSplit].carbs}%)
                  </Text>
                </View>

                {/* Fats */}
                <View>
                  <View className="flex-row justify-between items-center mb-2">
                    <View className="flex-row items-center">
                      <View className="w-3 h-3 rounded-full bg-amber-500 mr-2" />
                      <Text className="text-white font-semibold">Grasas</Text>
                    </View>
                    <Text className="text-white font-bold text-lg">
                      {macros.fats.grams}g
                    </Text>
                  </View>
                  <View className="bg-zinc-800 h-2 rounded-full overflow-hidden">
                    <View
                      className="bg-amber-500 h-full"
                      style={{
                        width: `${MACRO_SPLITS[macroSplit].fats}%`,
                      }}
                    />
                  </View>
                  <Text className="text-zinc-500 text-xs mt-1">
                    {macros.fats.calories} kcal ({MACRO_SPLITS[macroSplit].fats}%)
                  </Text>
                </View>
              </View>

              {/* Meal Plan Suggestion */}
              {mealPlan && (
                <View className="mt-6 pt-6 border-t border-zinc-800">
                  <Text className="text-white font-semibold mb-3">
                    Por Comida (3 comidas/día)
                  </Text>
                  <View className="flex-row justify-around">
                    <View className="items-center">
                      <Text className="text-red-500 font-bold text-xl">
                        {mealPlan.protein}g
                      </Text>
                      <Text className="text-zinc-500 text-xs">Proteína</Text>
                    </View>
                    <View className="items-center">
                      <Text className="text-blue-500 font-bold text-xl">
                        {mealPlan.carbs}g
                      </Text>
                      <Text className="text-zinc-500 text-xs">Carbos</Text>
                    </View>
                    <View className="items-center">
                      <Text className="text-amber-500 font-bold text-xl">
                        {mealPlan.fats}g
                      </Text>
                      <Text className="text-zinc-500 text-xs">Grasas</Text>
                    </View>
                  </View>
                </View>
              )}
            </View>
          )}

          {/* Info Card */}
          <View className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4">
            <View className="flex-row items-start">
              <Ionicons name="bulb" size={20} color="#10B981" style={{ marginRight: 8 }} />
              <View className="flex-1">
                <Text className="text-emerald-400 text-sm font-semibold mb-1">
                  Consejos
                </Text>
                <Text className="text-emerald-300/80 text-xs leading-5">
                  • Ajusta basado en tus resultados semanales{'\n'}
                  • Mantén la proteína alta para preservar músculo{'\n'}
                  • Las grasas ayudan con hormonas y saciedad{'\n'}
                  • Los carbos dan energía para entrenar
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
