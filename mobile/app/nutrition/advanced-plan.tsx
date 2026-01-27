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

interface NutritionGoal {
  id: string;
  type: 'cut' | 'bulk' | 'maintain' | 'recomp';
  label: string;
  description: string;
  calorieAdjustment: number;
  macroSplit: {
    protein: number;
    carbs: number;
    fats: number;
  };
}

interface MealTemplate {
  id: string;
  name: string;
  time: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  foods: string[];
  category: string;
}

const NUTRITION_GOALS: NutritionGoal[] = [
  {
    id: 'cut',
    type: 'cut',
    label: 'Definición',
    description: 'Déficit calórico moderado para perder grasa',
    calorieAdjustment: -500,
    macroSplit: { protein: 40, carbs: 30, fats: 30 },
  },
  {
    id: 'bulk',
    type: 'bulk',
    label: 'Volumen',
    description: 'Superávit calórico para ganar masa muscular',
    calorieAdjustment: 300,
    macroSplit: { protein: 30, carbs: 45, fats: 25 },
  },
  {
    id: 'maintain',
    type: 'maintain',
    label: 'Mantenimiento',
    description: 'Calorías de mantenimiento',
    calorieAdjustment: 0,
    macroSplit: { protein: 30, carbs: 40, fats: 30 },
  },
  {
    id: 'recomp',
    type: 'recomp',
    label: 'Recomposición',
    description: 'Ganar músculo y perder grasa simultáneamente',
    calorieAdjustment: -100,
    macroSplit: { protein: 40, carbs: 35, fats: 25 },
  },
];

const MEAL_TEMPLATES: MealTemplate[] = [
  {
    id: '1',
    name: 'Desayuno Alto en Proteína',
    time: '08:00',
    calories: 450,
    protein: 35,
    carbs: 40,
    fats: 12,
    foods: ['3 huevos', '100g avena', '1 plátano', 'Café'],
    category: 'Desayuno',
  },
  {
    id: '2',
    name: 'Almuerzo Balanceado',
    time: '13:00',
    calories: 650,
    protein: 45,
    carbs: 60,
    fats: 18,
    foods: ['200g pechuga pollo', '150g arroz', 'Ensalada', 'Aguacate'],
    category: 'Almuerzo',
  },
  {
    id: '3',
    name: 'Pre-Workout Energético',
    time: '16:30',
    calories: 300,
    protein: 25,
    carbs: 35,
    fats: 6,
    foods: ['1 scoop whey', '1 plátano', 'Café', '30g avena'],
    category: 'Snack',
  },
  {
    id: '4',
    name: 'Post-Workout Recuperación',
    time: '19:00',
    calories: 550,
    protein: 40,
    carbs: 55,
    fats: 10,
    foods: ['150g carne magra', '200g papa', 'Verduras', '1 scoop whey'],
    category: 'Cena',
  },
  {
    id: '5',
    name: 'Cena Ligera',
    time: '21:00',
    calories: 400,
    protein: 35,
    carbs: 25,
    fats: 15,
    foods: ['150g salmón', 'Ensalada', 'Brócoli', 'Aceite oliva'],
    category: 'Cena',
  },
];

export default function AdvancedNutrition() {
  const [selectedGoal, setSelectedGoal] = useState<NutritionGoal>(NUTRITION_GOALS[0]);
  const [tdee, setTdee] = useState(2500);
  const [selectedMeals, setSelectedMeals] = useState<MealTemplate[]>([
    MEAL_TEMPLATES[0],
    MEAL_TEMPLATES[1],
    MEAL_TEMPLATES[4],
  ]);

  const targetCalories = tdee + selectedGoal.calorieAdjustment;
  const proteinGrams = Math.round((targetCalories * (selectedGoal.macroSplit.protein / 100)) / 4);
  const carbsGrams = Math.round((targetCalories * (selectedGoal.macroSplit.carbs / 100)) / 4);
  const fatsGrams = Math.round((targetCalories * (selectedGoal.macroSplit.fats / 100)) / 9);

  const currentCalories = selectedMeals.reduce((sum, meal) => sum + meal.calories, 0);
  const currentProtein = selectedMeals.reduce((sum, meal) => sum + meal.protein, 0);
  const currentCarbs = selectedMeals.reduce((sum, meal) => sum + meal.carbs, 0);
  const currentFats = selectedMeals.reduce((sum, meal) => sum + meal.fats, 0);

  const addMeal = (meal: MealTemplate) => {
    setSelectedMeals((prev) => [...prev, meal]);
  };

  const removeMeal = (mealId: string) => {
    setSelectedMeals((prev) => prev.filter((m) => m.id !== mealId));
  };

  const generatePlan = () => {
    Alert.alert(
      'Generar Plan Semanal',
      `Se generará un plan de 7 días basado en tu objetivo de ${selectedGoal.label} con ${targetCalories} kcal/día`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Generar',
          onPress: () => {
            Alert.alert(
              '¡Plan Generado!',
              'Tu plan nutricional de 7 días está listo. Se ha sincronizado con tu calendario.'
            );
          },
        },
      ]
    );
  };

  return (
    <View className="flex-1 bg-zinc-950">
      {/* Header */}
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center justify-between mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1 ml-3">
            Plan Nutricional
          </Text>
          <TouchableOpacity onPress={generatePlan}>
            <Ionicons name="sync-outline" size={24} color="#10B981" />
          </TouchableOpacity>
        </View>

        {/* Current Stats */}
        <View className="bg-zinc-900 rounded-xl p-4 border border-zinc-800">
          <View className="flex-row items-center justify-between mb-2">
            <Text className="text-zinc-400 text-sm">Objetivo Diario</Text>
            <Text className="text-white font-bold">{targetCalories} kcal</Text>
          </View>
          <View className="flex-row gap-2">
            <View className="flex-1 bg-blue-500/20 rounded-lg p-2">
              <Text className="text-blue-400 text-xs">P: {proteinGrams}g</Text>
            </View>
            <View className="flex-1 bg-amber-500/20 rounded-lg p-2">
              <Text className="text-amber-400 text-xs">C: {carbsGrams}g</Text>
            </View>
            <View className="flex-1 bg-red-500/20 rounded-lg p-2">
              <Text className="text-red-400 text-xs">G: {fatsGrams}g</Text>
            </View>
          </View>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Nutrition Goals */}
        <View className="px-6 pt-6">
          <Text className="text-white font-bold text-lg mb-3">
            Objetivo Nutricional
          </Text>
          <View className="flex-row flex-wrap gap-3">
            {NUTRITION_GOALS.map((goal) => (
              <TouchableOpacity
                key={goal.id}
                onPress={() => setSelectedGoal(goal)}
                className={`flex-1 min-w-[45%] rounded-xl p-4 border ${
                  selectedGoal.id === goal.id
                    ? 'bg-emerald-500/20 border-emerald-500'
                    : 'bg-zinc-900 border-zinc-800'
                }`}
              >
                <Text
                  className={`font-bold mb-1 ${
                    selectedGoal.id === goal.id ? 'text-emerald-500' : 'text-white'
                  }`}
                >
                  {goal.label}
                </Text>
                <Text className="text-zinc-400 text-xs mb-2">
                  {goal.description}
                </Text>
                <View className="flex-row items-center">
                  <Ionicons
                    name={
                      goal.calorieAdjustment > 0
                        ? 'trending-up'
                        : goal.calorieAdjustment < 0
                        ? 'trending-down'
                        : 'remove'
                    }
                    size={14}
                    color={selectedGoal.id === goal.id ? '#10B981' : '#71717A'}
                  />
                  <Text
                    className={`text-xs ml-1 ${
                      selectedGoal.id === goal.id ? 'text-emerald-500' : 'text-zinc-500'
                    }`}
                  >
                    {goal.calorieAdjustment > 0 ? '+' : ''}
                    {goal.calorieAdjustment} kcal
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* TDEE Calculator */}
        <View className="px-6 pt-6">
          <View className="bg-blue-500/10 rounded-xl p-4 border border-blue-500/30">
            <View className="flex-row items-center justify-between mb-3">
              <View className="flex-1">
                <Text className="text-blue-400 font-bold">TDEE Estimado</Text>
                <Text className="text-blue-300 text-sm mt-1">
                  Gasto energético total diario
                </Text>
              </View>
              <View className="flex-row items-center">
                <TextInput
                  value={tdee.toString()}
                  onChangeText={(text) => {
                    const val = parseInt(text);
                    if (!isNaN(val)) setTdee(val);
                  }}
                  keyboardType="numeric"
                  className="text-white text-2xl font-bold bg-blue-500/20 rounded-lg px-3 py-1 w-24 text-center"
                />
                <Text className="text-blue-400 ml-2">kcal</Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => router.push('/tools/tdee')}
              className="bg-blue-500 rounded-lg p-2"
            >
              <Text className="text-white text-center font-semibold text-sm">
                Calcular TDEE Preciso
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Macro Split */}
        <View className="px-6 pt-6">
          <Text className="text-white font-bold text-lg mb-3">
            Distribución de Macros
          </Text>
          <View className="bg-zinc-900 rounded-xl p-4 border border-zinc-800">
            <View className="mb-3">
              <View className="flex-row items-center justify-between mb-2">
                <Text className="text-blue-400 font-semibold">Proteína</Text>
                <Text className="text-white font-bold">
                  {selectedGoal.macroSplit.protein}% ({proteinGrams}g)
                </Text>
              </View>
              <View className="bg-zinc-800 h-2 rounded-full overflow-hidden">
                <View
                  className="h-full bg-blue-500 rounded-full"
                  style={{ width: `${selectedGoal.macroSplit.protein}%` }}
                />
              </View>
            </View>

            <View className="mb-3">
              <View className="flex-row items-center justify-between mb-2">
                <Text className="text-amber-400 font-semibold">Carbohidratos</Text>
                <Text className="text-white font-bold">
                  {selectedGoal.macroSplit.carbs}% ({carbsGrams}g)
                </Text>
              </View>
              <View className="bg-zinc-800 h-2 rounded-full overflow-hidden">
                <View
                  className="h-full bg-amber-500 rounded-full"
                  style={{ width: `${selectedGoal.macroSplit.carbs}%` }}
                />
              </View>
            </View>

            <View>
              <View className="flex-row items-center justify-between mb-2">
                <Text className="text-red-400 font-semibold">Grasas</Text>
                <Text className="text-white font-bold">
                  {selectedGoal.macroSplit.fats}% ({fatsGrams}g)
                </Text>
              </View>
              <View className="bg-zinc-800 h-2 rounded-full overflow-hidden">
                <View
                  className="h-full bg-red-500 rounded-full"
                  style={{ width: `${selectedGoal.macroSplit.fats}%` }}
                />
              </View>
            </View>
          </View>
        </View>

        {/* Today's Meals */}
        <View className="px-6 pt-6">
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-white font-bold text-lg">Comidas de Hoy</Text>
            <View className="bg-emerald-500/20 px-3 py-1 rounded-full">
              <Text className="text-emerald-500 text-sm font-bold">
                {currentCalories}/{targetCalories} kcal
              </Text>
            </View>
          </View>

          {selectedMeals.map((meal) => (
            <View
              key={meal.id}
              className="bg-zinc-900 rounded-xl p-4 mb-3 border border-zinc-800"
            >
              <View className="flex-row items-start justify-between mb-3">
                <View className="flex-1">
                  <View className="flex-row items-center mb-1">
                    <View className="bg-emerald-500/20 px-2 py-0.5 rounded">
                      <Text className="text-emerald-500 text-xs font-bold">
                        {meal.category}
                      </Text>
                    </View>
                    <Text className="text-zinc-400 text-xs ml-2">{meal.time}</Text>
                  </View>
                  <Text className="text-white font-bold">{meal.name}</Text>
                </View>
                <TouchableOpacity onPress={() => removeMeal(meal.id)}>
                  <Ionicons name="close-circle" size={24} color="#EF4444" />
                </TouchableOpacity>
              </View>

              {/* Foods */}
              <View className="bg-zinc-800 rounded-lg p-3 mb-3">
                {meal.foods.map((food, index) => (
                  <View key={index} className="flex-row items-center mb-1 last:mb-0">
                    <Ionicons name="checkmark" size={14} color="#10B981" />
                    <Text className="text-zinc-300 text-sm ml-2">{food}</Text>
                  </View>
                ))}
              </View>

              {/* Macros */}
              <View className="flex-row gap-3">
                <View className="flex-1 bg-blue-500/10 rounded-lg p-2">
                  <Text className="text-blue-400 text-xs">Proteína</Text>
                  <Text className="text-white text-sm font-bold">{meal.protein}g</Text>
                </View>
                <View className="flex-1 bg-amber-500/10 rounded-lg p-2">
                  <Text className="text-amber-400 text-xs">Carbos</Text>
                  <Text className="text-white text-sm font-bold">{meal.carbs}g</Text>
                </View>
                <View className="flex-1 bg-red-500/10 rounded-lg p-2">
                  <Text className="text-red-400 text-xs">Grasas</Text>
                  <Text className="text-white text-sm font-bold">{meal.fats}g</Text>
                </View>
                <View className="flex-1 bg-zinc-800 rounded-lg p-2">
                  <Text className="text-zinc-400 text-xs">Total</Text>
                  <Text className="text-white text-sm font-bold">{meal.calories}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Meal Templates */}
        <View className="px-6 pt-6 pb-6">
          <Text className="text-white font-bold text-lg mb-3">
            Plantillas de Comidas
          </Text>

          {MEAL_TEMPLATES.filter(
            (t) => !selectedMeals.find((m) => m.id === t.id)
          ).map((template) => (
            <TouchableOpacity
              key={template.id}
              onPress={() => addMeal(template)}
              className="bg-zinc-900 rounded-xl p-4 mb-3 border border-zinc-800"
            >
              <View className="flex-row items-center justify-between mb-2">
                <View className="flex-1">
                  <Text className="text-white font-bold">{template.name}</Text>
                  <Text className="text-zinc-400 text-sm mt-1">
                    {template.category} • {template.time}
                  </Text>
                </View>
                <View className="flex-row items-center">
                  <Text className="text-emerald-500 font-bold text-lg">
                    {template.calories}
                  </Text>
                  <Text className="text-zinc-500 text-xs ml-1">kcal</Text>
                  <Ionicons
                    name="add-circle"
                    size={24}
                    color="#10B981"
                    style={{ marginLeft: 8 }}
                  />
                </View>
              </View>

              <View className="flex-row gap-2">
                <View className="bg-blue-500/10 px-2 py-1 rounded">
                  <Text className="text-blue-400 text-xs">P: {template.protein}g</Text>
                </View>
                <View className="bg-amber-500/10 px-2 py-1 rounded">
                  <Text className="text-amber-400 text-xs">C: {template.carbs}g</Text>
                </View>
                <View className="bg-red-500/10 px-2 py-1 rounded">
                  <Text className="text-red-400 text-xs">G: {template.fats}g</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Summary */}
        <View className="px-6 pb-6">
          <View
            className={`rounded-xl p-4 border ${
              Math.abs(currentCalories - targetCalories) < 100
                ? 'bg-emerald-500/10 border-emerald-500/30'
                : 'bg-amber-500/10 border-amber-500/30'
            }`}
          >
            <View className="flex-row items-start">
              <Ionicons
                name={
                  Math.abs(currentCalories - targetCalories) < 100
                    ? 'checkmark-circle'
                    : 'warning'
                }
                size={24}
                color={
                  Math.abs(currentCalories - targetCalories) < 100
                    ? '#10B981'
                    : '#F59E0B'
                }
              />
              <View className="flex-1 ml-3">
                <Text
                  className={`font-bold mb-2 ${
                    Math.abs(currentCalories - targetCalories) < 100
                      ? 'text-emerald-500'
                      : 'text-amber-500'
                  }`}
                >
                  {Math.abs(currentCalories - targetCalories) < 100
                    ? '¡Plan Óptimo!'
                    : 'Ajusta tu Plan'}
                </Text>
                <Text
                  className={`text-sm leading-5 ${
                    Math.abs(currentCalories - targetCalories) < 100
                      ? 'text-emerald-300'
                      : 'text-amber-300'
                  }`}
                >
                  {Math.abs(currentCalories - targetCalories) < 100
                    ? `Estás dentro del rango objetivo. Macros: P ${currentProtein}g, C ${currentCarbs}g, G ${currentFats}g`
                    : `Te ${
                        currentCalories > targetCalories ? 'sobran' : 'faltan'
                      } ${Math.abs(
                        currentCalories - targetCalories
                      )} kcal. Ajusta tus comidas.`}
                </Text>
              </View>
            </View>
          </View>

          <TouchableOpacity
            onPress={generatePlan}
            className="bg-emerald-500 rounded-xl p-4 mt-3"
          >
            <Text className="text-white text-center font-bold text-lg">
              Generar Plan de 7 Días
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
