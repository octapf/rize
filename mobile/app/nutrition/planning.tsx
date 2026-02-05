import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
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
  prepTime: number;
  difficulty: 'easy' | 'medium' | 'hard';
}

interface MealPlan {
  id: string;
  name: string;
  goal: string;
  dailyCalories: number;
  meals: Meal[];
}

const MEAL_PLANS: MealPlan[] = [
  {
    id: '1',
    name: 'Plan DefiniciÃ³n 2800 kcal',
    goal: 'Fat Loss',
    dailyCalories: 2800,
    meals: [
      {
        id: 'm1',
        name: 'Desayuno Power',
        time: '07:30',
        calories: 650,
        protein: 45,
        carbs: 75,
        fats: 18,
        foods: ['Avena 80g', 'ProteÃ­na whey 1 scoop', 'PlÃ¡tano', 'Mantequilla de manÃ­ 15g'],
        prepTime: 10,
        difficulty: 'easy',
      },
      {
        id: 'm2',
        name: 'Snack Pre-Entreno',
        time: '11:00',
        calories: 350,
        protein: 25,
        carbs: 45,
        fats: 8,
        foods: ['Arroz blanco 100g cocido', 'Pechuga pollo 100g', 'Aceite oliva 5ml'],
        prepTime: 15,
        difficulty: 'easy',
      },
      {
        id: 'm3',
        name: 'Almuerzo Fuerte',
        time: '13:30',
        calories: 750,
        protein: 55,
        carbs: 85,
        fats: 18,
        foods: [
          'Arroz integral 150g',
          'Carne res magra 180g',
          'BrÃ³coli 200g',
          'Aguacate 30g',
        ],
        prepTime: 30,
        difficulty: 'medium',
      },
      {
        id: 'm4',
        name: 'Post-Entreno',
        time: '18:00',
        calories: 450,
        protein: 40,
        carbs: 50,
        fats: 8,
        foods: ['ProteÃ­na whey 1.5 scoops', 'Avena 60g', 'Fresas 100g'],
        prepTime: 5,
        difficulty: 'easy',
      },
      {
        id: 'm5',
        name: 'Cena Ligera',
        time: '20:30',
        calories: 550,
        protein: 50,
        carbs: 35,
        fats: 22,
        foods: [
          'SalmÃ³n 180g',
          'Batata 150g',
          'Espinacas 100g',
          'Aceite oliva 10ml',
        ],
        prepTime: 25,
        difficulty: 'medium',
      },
      {
        id: 'm6',
        name: 'Snack Nocturno',
        time: '22:00',
        calories: 250,
        protein: 30,
        carbs: 10,
        fats: 12,
        foods: ['CaseÃ­na 1 scoop', 'Almendras 20g'],
        prepTime: 2,
        difficulty: 'easy',
      },
    ],
  },
  {
    id: '2',
    name: 'Plan Volumen 3500 kcal',
    goal: 'Muscle Gain',
    dailyCalories: 3500,
    meals: [
      {
        id: 'm1',
        name: 'Desayuno AnabÃ³lico',
        time: '07:00',
        calories: 850,
        protein: 50,
        carbs: 100,
        fats: 28,
        foods: [
          'Avena 120g',
          'Huevos enteros x4',
          'Pan integral 2 rebanadas',
          'PlÃ¡tano',
          'Mantequilla manÃ­ 20g',
        ],
        prepTime: 15,
        difficulty: 'easy',
      },
      {
        id: 'm2',
        name: 'Snack Mid-Morning',
        time: '10:30',
        calories: 550,
        protein: 35,
        carbs: 65,
        fats: 12,
        foods: ['Arroz blanco 150g', 'AtÃºn 120g', 'Aceite oliva 10ml'],
        prepTime: 10,
        difficulty: 'easy',
      },
      {
        id: 'm3',
        name: 'Almuerzo ConstrucciÃ³n',
        time: '13:00',
        calories: 950,
        protein: 60,
        carbs: 110,
        fats: 25,
        foods: [
          'Pasta integral 200g',
          'Pechuga pollo 200g',
          'Salsa tomate casera',
          'Parmesano 20g',
          'Verduras mix',
        ],
        prepTime: 35,
        difficulty: 'medium',
      },
      {
        id: 'm4',
        name: 'Pre-Workout Carga',
        time: '16:30',
        calories: 450,
        protein: 30,
        carbs: 60,
        fats: 8,
        foods: ['Batata 200g', 'Pavo 100g', 'Miel 15g'],
        prepTime: 20,
        difficulty: 'easy',
      },
      {
        id: 'm5',
        name: 'Post-Workout RecuperaciÃ³n',
        time: '19:00',
        calories: 550,
        protein: 45,
        carbs: 70,
        fats: 10,
        foods: ['ProteÃ­na whey 2 scoops', 'Avena 80g', 'PlÃ¡tano', 'Creatina 5g'],
        prepTime: 5,
        difficulty: 'easy',
      },
      {
        id: 'm6',
        name: 'Cena Alta ProteÃ­na',
        time: '21:30',
        calories: 700,
        protein: 55,
        carbs: 50,
        fats: 30,
        foods: [
          'Carne res 200g',
          'Arroz integral 100g',
          'Aguacate medio',
          'Ensalada verde',
        ],
        prepTime: 30,
        difficulty: 'medium',
      },
    ],
  },
];

export default function MealPlanning() {
  const [selectedPlan, setSelectedPlan] = useState(MEAL_PLANS[0]);
  const [completedMeals, setCompletedMeals] = useState<string[]>([]);

  const toggleMealComplete = (mealId: string) => {
    if (completedMeals.includes(mealId)) {
      setCompletedMeals(completedMeals.filter((id) => id !== mealId));
    } else {
      setCompletedMeals([...completedMeals, mealId]);
    }
  };

  const viewRecipe = (meal: Meal) => {
    Alert.alert(
      `ðŸ“– Receta: ${meal.name}`,
      `Ingredientes:\n${meal.foods.join('\n')}\n\nTiempo de preparaciÃ³n: ${meal.prepTime} min`,
      [{ text: 'Entendido' }]
    );
  };

  const changePlan = () => {
    Alert.alert(
      'Cambiar Plan',
      'Selecciona tu objetivo',
      [
        {
          text: 'DefiniciÃ³n',
          onPress: () => setSelectedPlan(MEAL_PLANS[0]),
        },
        {
          text: 'Volumen',
          onPress: () => setSelectedPlan(MEAL_PLANS[1]),
        },
        { text: 'Cancelar', style: 'cancel' },
      ]
    );
  };

  const generateGroceryList = () => {
    const allFoods = selectedPlan.meals.flatMap((meal) => meal.foods);
    Alert.alert(
      'ðŸ›’ Lista de Compras',
      allFoods.join('\n'),
      [
        { text: 'Copiar' },
        { text: 'Compartir' },
        { text: 'Cerrar' },
      ]
    );
  };

  const totalConsumed = selectedPlan.meals
    .filter((meal) => completedMeals.includes(meal.id))
    .reduce((sum, meal) => sum + meal.calories, 0);

  const proteinConsumed = selectedPlan.meals
    .filter((meal) => completedMeals.includes(meal.id))
    .reduce((sum, meal) => sum + meal.protein, 0);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'text-primary';
      case 'medium':
        return 'text-amber-400';
      case 'hard':
        return 'text-red-400';
      default:
        return 'text-zinc-400';
    }
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
            PlanificaciÃ³n de Comidas
          </Text>
          <TouchableOpacity onPress={changePlan}>
            <Ionicons name="swap-horizontal" size={24} color="#9D12DE" />
          </TouchableOpacity>
        </View>

        {/* Current Plan */}
        <View className="bg-zinc-900 rounded-xl p-4 border border-zinc-800 mb-4">
          <View className="flex-row items-center justify-between mb-3">
            <View className="flex-1">
              <Text className="text-white font-bold text-lg">{selectedPlan.name}</Text>
              <Text className="text-zinc-400 text-sm">{selectedPlan.goal}</Text>
            </View>
            <View className="items-end">
              <Text className="text-primary text-3xl font-bold">
                {selectedPlan.dailyCalories}
              </Text>
              <Text className="text-zinc-400 text-xs">kcal/dÃ­a</Text>
            </View>
          </View>

          <View className="pt-3 border-t border-zinc-800">
            <View className="flex-row items-center justify-between">
              <View>
                <Text className="text-zinc-400 text-xs mb-1">CONSUMIDO</Text>
                <Text className="text-white text-2xl font-bold">{totalConsumed}</Text>
              </View>
              <View>
                <Text className="text-zinc-400 text-xs mb-1">COMIDAS</Text>
                <Text className="text-white text-2xl font-bold">
                  {completedMeals.length}/{selectedPlan.meals.length}
                </Text>
              </View>
              <View className="items-end">
                <Text className="text-zinc-400 text-xs mb-1">PROTEÃNA</Text>
                <Text className="text-white text-2xl font-bold">{proteinConsumed}g</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View className="flex-row gap-2">
          <TouchableOpacity
            onPress={generateGroceryList}
            className="flex-1 bg-primary/10 rounded-lg p-3 border border-primary/30 flex-row items-center justify-center"
          >
            <Ionicons name="cart" size={18} color="#9D12DE" />
            <Text className="text-primary/80 font-bold ml-2 text-sm">Lista Compras</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-1 bg-primary/10 rounded-lg p-3 border border-primary/30 flex-row items-center justify-center">
            <Ionicons name="restaurant" size={18} color="#9D12DE" />
            <Text className="text-primary font-bold ml-2 text-sm">Meal Prep</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          {/* Meals */}
          {selectedPlan.meals.map((meal) => {
            const isCompleted = completedMeals.includes(meal.id);
            return (
              <View
                key={meal.id}
                className={`bg-zinc-900 rounded-xl p-4 mb-4 border ${
                  isCompleted ? 'border-primary/30' : 'border-zinc-800'
                }`}
              >
                {/* Meal Header */}
                <View className="flex-row items-start justify-between mb-3">
                  <View className="flex-1">
                    <View className="flex-row items-center mb-2">
                      <Ionicons name="time" size={16} color="#71717A" />
                      <Text className="text-zinc-400 text-sm ml-1">{meal.time}</Text>
                    </View>
                    <Text className="text-white font-bold text-xl mb-1">{meal.name}</Text>
                    <View className="flex-row items-center gap-2">
                      <View className="bg-zinc-800 rounded px-2 py-1">
                        <Text className={`text-xs font-bold ${getDifficultyColor(meal.difficulty)}`}>
                          {meal.difficulty === 'easy' ? 'FÃ¡cil' : meal.difficulty === 'medium' ? 'Media' : 'DifÃ­cil'}
                        </Text>
                      </View>
                      <View className="flex-row items-center">
                        <Ionicons name="timer" size={12} color="#71717A" />
                        <Text className="text-zinc-400 text-xs ml-1">{meal.prepTime} min</Text>
                      </View>
                    </View>
                  </View>
                  <TouchableOpacity
                    onPress={() => toggleMealComplete(meal.id)}
                    className={`w-12 h-12 rounded-full items-center justify-center ${
                      isCompleted ? 'bg-primary' : 'bg-zinc-800'
                    }`}
                  >
                    <Ionicons
                      name={isCompleted ? 'checkmark' : 'ellipse-outline'}
                      size={24}
                      color={isCompleted ? 'white' : '#71717A'}
                    />
                  </TouchableOpacity>
                </View>

                {/* Macros */}
                <View className="bg-zinc-800 rounded-lg p-3 mb-3">
                  <View className="flex-row items-center justify-between">
                    <View className="flex-1">
                      <Text className="text-zinc-400 text-xs mb-1">CALORÃAS</Text>
                      <Text className="text-white text-xl font-bold">{meal.calories}</Text>
                    </View>
                    <View className="flex-1">
                      <Text className="text-zinc-400 text-xs mb-1">PROTEÃNA</Text>
                      <Text className="text-red-400 text-xl font-bold">{meal.protein}g</Text>
                    </View>
                    <View className="flex-1">
                      <Text className="text-zinc-400 text-xs mb-1">CARBOS</Text>
                      <Text className="text-amber-400 text-xl font-bold">{meal.carbs}g</Text>
                    </View>
                    <View className="flex-1 items-end">
                      <Text className="text-zinc-400 text-xs mb-1">GRASAS</Text>
                      <Text className="text-primary/80 text-xl font-bold">{meal.fats}g</Text>
                    </View>
                  </View>
                </View>

                {/* Foods */}
                <View className="mb-3">
                  <Text className="text-zinc-400 text-xs mb-2">INGREDIENTES</Text>
                  {meal.foods.map((food, index) => (
                    <View key={index} className="flex-row items-center py-1">
                      <View className="w-1.5 h-1.5 rounded-full bg-primary mr-2" />
                      <Text className="text-zinc-300 text-sm">{food}</Text>
                    </View>
                  ))}
                </View>

                {/* Actions */}
                <TouchableOpacity
                  onPress={() => viewRecipe(meal)}
                  className="bg-primary/10 rounded-lg p-3 border border-primary/30"
                >
                  <Text className="text-primary/80 font-bold text-center">Ver Receta Completa</Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>

        {/* Info Card */}
        <View className="px-6 pb-6 pt-2">
          <View className="bg-primary/10 rounded-xl p-4 border border-primary/30">
            <View className="flex-row items-start">
              <Ionicons name="restaurant" size={20} color="#9D12DE" />
              <View className="flex-1 ml-3">
                <Text className="text-primary font-bold mb-2">Consistencia Nutricional</Text>
                <Text className="text-primary/80 text-sm">
                  Sigue el plan 6-7 dÃ­as a la semana. La nutriciÃ³n es 70% de tus resultados.
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}


