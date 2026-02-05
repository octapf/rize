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

interface Meal {
  id: string;
  name: string;
  time: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  foods: string[];
  isLogged: boolean;
}

interface MealPlan {
  id: string;
  name: string;
  targetCalories: number;
  targetProtein: number;
  targetCarbs: number;
  targetFats: number;
  meals: Meal[];
}

const MOCK_MEAL_PLAN: MealPlan = {
  id: '1',
  name: 'Plan de Volumen',
  targetCalories: 3000,
  targetProtein: 180,
  targetCarbs: 375,
  targetFats: 83,
  meals: [
    {
      id: '1',
      name: 'Desayuno',
      time: '08:00',
      calories: 650,
      protein: 40,
      carbs: 75,
      fats: 18,
      foods: ['Avena 100g', 'Huevos 4', 'PlÃ¡tano 2', 'Mantequilla de manÃ­ 20g'],
      isLogged: true,
    },
    {
      id: '2',
      name: 'Snack Media MaÃ±ana',
      time: '11:00',
      calories: 400,
      protein: 35,
      carbs: 40,
      fats: 8,
      foods: ['Batido de proteÃ­na', 'Arroz con leche 150g'],
      isLogged: true,
    },
    {
      id: '3',
      name: 'Almuerzo',
      time: '14:00',
      calories: 800,
      protein: 50,
      carbs: 90,
      fats: 22,
      foods: ['Pechuga de pollo 200g', 'Arroz integral 150g', 'Verduras', 'Aceite de oliva 10ml'],
      isLogged: false,
    },
    {
      id: '4',
      name: 'Pre-Workout',
      time: '17:00',
      calories: 350,
      protein: 20,
      carbs: 60,
      fats: 5,
      foods: ['Batido pre-workout', 'Pan integral 2 rebanadas', 'Mermelada'],
      isLogged: false,
    },
    {
      id: '5',
      name: 'Post-Workout',
      time: '19:30',
      calories: 450,
      protein: 40,
      carbs: 55,
      fats: 8,
      foods: ['Batido proteÃ­na 2 scoops', 'PlÃ¡tano', 'Avena 50g'],
      isLogged: false,
    },
    {
      id: '6',
      name: 'Cena',
      time: '21:00',
      calories: 350,
      protein: 35,
      carbs: 25,
      fats: 12,
      foods: ['SalmÃ³n 150g', 'Ensalada grande', 'Batata 100g'],
      isLogged: false,
    },
  ],
};

const QUICK_FOODS = [
  { name: 'Huevo', protein: 6, carbs: 0, fats: 5, calories: 70 },
  { name: 'Pechuga de Pollo (100g)', protein: 30, carbs: 0, fats: 3, calories: 165 },
  { name: 'Arroz Blanco (100g)', protein: 3, carbs: 28, fats: 0, calories: 130 },
  { name: 'Avena (100g)', protein: 13, carbs: 67, fats: 7, calories: 389 },
  { name: 'PlÃ¡tano', protein: 1, carbs: 27, fats: 0, calories: 105 },
  { name: 'Batido ProteÃ­na', protein: 25, carbs: 3, fats: 2, calories: 130 },
];

export default function MealPlanner() {
  const [mealPlan, setMealPlan] = useState(MOCK_MEAL_PLAN);
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);

  const toggleMealLogged = (mealId: string) => {
    setMealPlan({
      ...mealPlan,
      meals: mealPlan.meals.map((m) =>
        m.id === mealId ? { ...m, isLogged: !m.isLogged } : m
      ),
    });
  };

  const getTotalLogged = () => {
    const logged = mealPlan.meals.filter((m) => m.isLogged);
    return {
      calories: logged.reduce((sum, m) => sum + m.calories, 0),
      protein: logged.reduce((sum, m) => sum + m.protein, 0),
      carbs: logged.reduce((sum, m) => sum + m.carbs, 0),
      fats: logged.reduce((sum, m) => sum + m.fats, 0),
    };
  };

  const getProgress = (current: number, target: number) => {
    return Math.min(100, (current / target) * 100);
  };

  const totals = getTotalLogged();

  return (
    <View className="flex-1 bg-zinc-950">
      {/* Header */}
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1 ml-3">
            Meal Planner
          </Text>
          <TouchableOpacity>
            <Ionicons name="add-circle" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          {/* Daily Summary */}
          <View className="bg-zinc-900 rounded-xl p-6 mb-6 border border-zinc-800">
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-white font-bold text-xl">{mealPlan.name}</Text>
              <View className="bg-primary rounded-lg px-3 py-1">
                <Text className="text-white font-bold">
                  {totals.calories}/{mealPlan.targetCalories} kcal
                </Text>
              </View>
            </View>

            {/* Macros Progress */}
            <View className="space-y-3">
              {/* Protein */}
              <View>
                <View className="flex-row items-center justify-between mb-2">
                  <Text className="text-primary/80 font-bold">ProteÃ­na</Text>
                  <Text className="text-white font-bold">
                    {totals.protein}g / {mealPlan.targetProtein}g
                  </Text>
                </View>
                <View className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                  <View
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${getProgress(totals.protein, mealPlan.targetProtein)}%` }}
                  />
                </View>
              </View>

              {/* Carbs */}
              <View>
                <View className="flex-row items-center justify-between mb-2">
                  <Text className="text-primary font-bold">Carbohidratos</Text>
                  <Text className="text-white font-bold">
                    {totals.carbs}g / {mealPlan.targetCarbs}g
                  </Text>
                </View>
                <View className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                  <View
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${getProgress(totals.carbs, mealPlan.targetCarbs)}%` }}
                  />
                </View>
              </View>

              {/* Fats */}
              <View>
                <View className="flex-row items-center justify-between mb-2">
                  <Text className="text-amber-400 font-bold">Grasas</Text>
                  <Text className="text-white font-bold">
                    {totals.fats}g / {mealPlan.targetFats}g
                  </Text>
                </View>
                <View className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                  <View
                    className="h-full bg-amber-500 rounded-full"
                    style={{ width: `${getProgress(totals.fats, mealPlan.targetFats)}%` }}
                  />
                </View>
              </View>
            </View>
          </View>

          {/* Meals Timeline */}
          <Text className="text-white font-bold text-lg mb-4">Comidas de Hoy</Text>
          {mealPlan.meals.map((meal, index) => (
            <View key={meal.id} className="mb-4">
              <View
                className={`bg-zinc-900 rounded-xl p-4 border ${
                  meal.isLogged ? 'border-primary' : 'border-zinc-800'
                }`}
              >
                <View className="flex-row items-start justify-between mb-3">
                  <View className="flex-1">
                    <View className="flex-row items-center mb-1">
                      <Text className="text-zinc-400 text-sm mr-2">{meal.time}</Text>
                      <Text className="text-white font-bold text-lg">{meal.name}</Text>
                    </View>
                    <View className="flex-row gap-2 mt-1">
                      <View className="bg-zinc-800 rounded px-2 py-1">
                        <Text className="text-primary text-xs font-bold">
                          {meal.calories} kcal
                        </Text>
                      </View>
                      <View className="bg-zinc-800 rounded px-2 py-1">
                        <Text className="text-primary/80 text-xs font-bold">P: {meal.protein}g</Text>
                      </View>
                      <View className="bg-zinc-800 rounded px-2 py-1">
                        <Text className="text-primary text-xs font-bold">C: {meal.carbs}g</Text>
                      </View>
                      <View className="bg-zinc-800 rounded px-2 py-1">
                        <Text className="text-amber-400 text-xs font-bold">F: {meal.fats}g</Text>
                      </View>
                    </View>
                  </View>
                  <TouchableOpacity
                    onPress={() => toggleMealLogged(meal.id)}
                    className={`w-10 h-10 rounded-full items-center justify-center ${
                      meal.isLogged ? 'bg-primary' : 'bg-zinc-800'
                    }`}
                  >
                    <Ionicons
                      name={meal.isLogged ? 'checkmark' : 'add'}
                      size={20}
                      color="white"
                    />
                  </TouchableOpacity>
                </View>

                {/* Foods List */}
                <View className="bg-zinc-800 rounded-lg p-3">
                  {meal.foods.map((food, idx) => (
                    <View key={idx} className="flex-row items-center mb-1">
                      <View className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
                      <Text className="text-zinc-300 text-sm">{food}</Text>
                    </View>
                  ))}
                </View>

                {/* Quick Actions */}
                <View className="flex-row gap-2 mt-3">
                  <TouchableOpacity
                    onPress={() => setSelectedMeal(meal)}
                    className="flex-1 bg-zinc-800 rounded-lg p-2 flex-row items-center justify-center"
                  >
                    <Ionicons name="create" size={16} color="white" />
                    <Text className="text-white text-sm font-bold ml-1">Editar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => Alert.alert('Copiar', 'Comida copiada al portapapeles')}
                    className="flex-1 bg-zinc-800 rounded-lg p-2 flex-row items-center justify-center"
                  >
                    <Ionicons name="copy" size={16} color="white" />
                    <Text className="text-white text-sm font-bold ml-1">Copiar</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Connector Line */}
              {index < mealPlan.meals.length - 1 && (
                <View className="flex-row items-center ml-6 my-2">
                  <View className="w-0.5 h-8 bg-zinc-800" />
                </View>
              )}
            </View>
          ))}

          {/* Quick Add Foods */}
          <View className="bg-zinc-900 rounded-xl p-4 mb-6 border border-zinc-800">
            <Text className="text-white font-bold mb-3">Alimentos RÃ¡pidos</Text>
            <View className="flex-row flex-wrap gap-2">
              {QUICK_FOODS.map((food, idx) => (
                <TouchableOpacity
                  key={idx}
                  onPress={() => Alert.alert('AÃ±adir', `${food.name} aÃ±adido`)}
                  className="bg-zinc-800 rounded-lg px-3 py-2"
                >
                  <Text className="text-white text-sm font-bold mb-1">{food.name}</Text>
                  <Text className="text-zinc-400 text-xs">
                    {food.calories} kcal â€¢ P:{food.protein}g
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Tips */}
          <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-6">
            <View className="flex-row items-start">
              <Ionicons name="restaurant" size={20} color="#9D12DE" />
              <View className="flex-1 ml-3">
                <Text className="text-primary font-bold mb-2">
                  Tips de NutriciÃ³n
                </Text>
                <Text className="text-primary/80 text-sm">
                  â€¢ Prepara comidas con anticipaciÃ³n{'\n'}
                  â€¢ Pesa alimentos para precisiÃ³n{'\n'}
                  â€¢ ProteÃ­na en cada comida{'\n'}
                  â€¢ Ajusta segÃºn progreso semanal
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}


