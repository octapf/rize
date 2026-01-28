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
  name: string;
  protein: number;
  carbs: number;
  fats: number;
  calories: number;
}

interface DayPlan {
  day: string;
  meals: {
    breakfast: Meal[];
    lunch: Meal[];
    dinner: Meal[];
    snacks: Meal[];
  };
}

const SAMPLE_MEALS: { [key: string]: Meal[] } = {
  breakfast: [
    { name: 'Avena con Proteína', protein: 30, carbs: 50, fats: 10, calories: 410 },
    { name: 'Huevos Revueltos + Tostadas', protein: 25, carbs: 35, fats: 15, calories: 365 },
    { name: 'Smoothie Proteico', protein: 35, carbs: 45, fats: 8, calories: 388 },
    { name: 'Pancakes de Proteína', protein: 28, carbs: 40, fats: 12, calories: 372 },
  ],
  lunch: [
    { name: 'Pollo + Arroz + Brócoli', protein: 45, carbs: 60, fats: 12, calories: 532 },
    { name: 'Salmón + Quinoa + Espárragos', protein: 40, carbs: 55, fats: 18, calories: 538 },
    { name: 'Carne + Papas + Ensalada', protein: 50, carbs: 65, fats: 15, calories: 590 },
    { name: 'Atún + Pasta + Verduras', protein: 42, carbs: 70, fats: 10, calories: 530 },
  ],
  dinner: [
    { name: 'Pechuga + Batata + Vegetales', protein: 40, carbs: 50, fats: 10, calories: 450 },
    { name: 'Pescado + Arroz Integral', protein: 38, carbs: 55, fats: 12, calories: 472 },
    { name: 'Carne Magra + Legumbres', protein: 45, carbs: 48, fats: 14, calories: 494 },
    { name: 'Pollo al Curry + Arroz', protein: 42, carbs: 52, fats: 16, calories: 512 },
  ],
  snacks: [
    { name: 'Proteína + Banana', protein: 25, carbs: 30, fats: 3, calories: 247 },
    { name: 'Yogurt Griego + Frutos Secos', protein: 20, carbs: 25, fats: 12, calories: 284 },
    { name: 'Batido Post-Workout', protein: 30, carbs: 40, fats: 5, calories: 315 },
    { name: 'Tortitas de Arroz + Mantequilla de Maní', protein: 15, carbs: 35, fats: 14, calories: 322 },
  ],
};

export default function MealPrep() {
  const [weekPlan, setWeekPlan] = useState<DayPlan[]>([]);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [shoppingList, setShoppingList] = useState<string[]>([]);
  const [showGenerator, setShowGenerator] = useState(true);

  const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

  const generateWeekPlan = () => {
    const plan: DayPlan[] = days.map((day) => ({
      day,
      meals: {
        breakfast: [SAMPLE_MEALS.breakfast[Math.floor(Math.random() * SAMPLE_MEALS.breakfast.length)]],
        lunch: [SAMPLE_MEALS.lunch[Math.floor(Math.random() * SAMPLE_MEALS.lunch.length)]],
        dinner: [SAMPLE_MEALS.dinner[Math.floor(Math.random() * SAMPLE_MEALS.dinner.length)]],
        snacks: [SAMPLE_MEALS.snacks[Math.floor(Math.random() * SAMPLE_MEALS.snacks.length)]],
      },
    }));

    setWeekPlan(plan);
    setShowGenerator(false);
    generateShoppingList(plan);
    Alert.alert('Plan Generado! 🍽️', 'Meal prep de 7 días creado');
  };

  const generateShoppingList = (plan: DayPlan[]) => {
    const ingredients = new Set<string>();
    
    // Ingredients simulation based on meals
    const commonIngredients = [
      '🍗 2kg Pechuga de Pollo',
      '🐟 1kg Salmón/Pescado',
      '🥩 1kg Carne Magra',
      '🥚 2 docenas Huevos',
      '🍚 2kg Arroz/Quinoa',
      '🥔 2kg Papas/Batata',
      '🥦 Brócoli, Espinacas, Ensaladas',
      '🍌 Frutas variadas',
      '🥜 Frutos secos y mantequillas',
      '🥛 Yogurt griego, Leche',
      '🍝 Pasta integral',
      '🫘 Legumbres (garbanzos, lentejas)',
      '🧈 Aceite de oliva',
      '🧂 Especias y condimentos',
    ];

    setShoppingList(commonIngredients);
  };

  const getDayTotals = (dayPlan: DayPlan) => {
    const allMeals = [
      ...dayPlan.meals.breakfast,
      ...dayPlan.meals.lunch,
      ...dayPlan.meals.dinner,
      ...dayPlan.meals.snacks,
    ];

    return allMeals.reduce(
      (acc, meal) => ({
        protein: acc.protein + meal.protein,
        carbs: acc.carbs + meal.carbs,
        fats: acc.fats + meal.fats,
        calories: acc.calories + meal.calories,
      }),
      { protein: 0, carbs: 0, fats: 0, calories: 0 }
    );
  };

  const getWeekAverages = () => {
    if (weekPlan.length === 0) return { protein: 0, carbs: 0, fats: 0, calories: 0 };

    const totals = weekPlan.reduce(
      (acc, day) => {
        const dayTotals = getDayTotals(day);
        return {
          protein: acc.protein + dayTotals.protein,
          carbs: acc.carbs + dayTotals.carbs,
          fats: acc.fats + dayTotals.fats,
          calories: acc.calories + dayTotals.calories,
        };
      },
      { protein: 0, carbs: 0, fats: 0, calories: 0 }
    );

    return {
      protein: Math.round(totals.protein / weekPlan.length),
      carbs: Math.round(totals.carbs / weekPlan.length),
      fats: Math.round(totals.fats / weekPlan.length),
      calories: Math.round(totals.calories / weekPlan.length),
    };
  };

  if (showGenerator) {
    return (
      <View className="flex-1 bg-zinc-950">
        {/* Header */}
        <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
          <View className="flex-row items-center mb-4">
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <Text className="text-white text-2xl font-bold flex-1 ml-3">
              Meal Prep Planner
            </Text>
          </View>
        </View>

        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          <View className="px-6 pt-6">
            {/* Hero */}
            <View className="bg-gradient-to-r from-emerald-500 to-blue-500 rounded-xl p-6 mb-6">
              <Text className="text-white text-3xl font-bold mb-2">Plan Semanal</Text>
              <Text className="text-white opacity-90 mb-4">
                Genera tu meal prep de 7 días con macros balanceados
              </Text>
              <View className="flex-row items-center">
                <Ionicons name="restaurant" size={20} color="white" />
                <Text className="text-white ml-2 font-bold">4 comidas/día × 7 días</Text>
              </View>
            </View>

            {/* Features */}
            <Text className="text-white font-bold text-lg mb-4">Incluye</Text>
            
            <View className="gap-3 mb-6">
              <View className="bg-zinc-900 rounded-xl p-4 border border-zinc-800 flex-row items-center">
                <View className="w-12 h-12 bg-emerald-500 rounded-xl items-center justify-center">
                  <Ionicons name="calendar" size={24} color="white" />
                </View>
                <View className="flex-1 ml-4">
                  <Text className="text-white font-bold text-lg">7 Días Completos</Text>
                  <Text className="text-zinc-400 text-sm">Desayuno, comida, cena y snacks</Text>
                </View>
              </View>

              <View className="bg-zinc-900 rounded-xl p-4 border border-zinc-800 flex-row items-center">
                <View className="w-12 h-12 bg-blue-500 rounded-xl items-center justify-center">
                  <Ionicons name="analytics" size={24} color="white" />
                </View>
                <View className="flex-1 ml-4">
                  <Text className="text-white font-bold text-lg">Macros Calculados</Text>
                  <Text className="text-zinc-400 text-sm">Proteína, carbos y grasas por comida</Text>
                </View>
              </View>

              <View className="bg-zinc-900 rounded-xl p-4 border border-zinc-800 flex-row items-center">
                <View className="w-12 h-12 bg-purple-500 rounded-xl items-center justify-center">
                  <Ionicons name="cart" size={24} color="white" />
                </View>
                <View className="flex-1 ml-4">
                  <Text className="text-white font-bold text-lg">Shopping List</Text>
                  <Text className="text-zinc-400 text-sm">Lista completa para la semana</Text>
                </View>
              </View>

              <View className="bg-zinc-900 rounded-xl p-4 border border-zinc-800 flex-row items-center">
                <View className="w-12 h-12 bg-amber-500 rounded-xl items-center justify-center">
                  <Ionicons name="time" size={24} color="white" />
                </View>
                <View className="flex-1 ml-4">
                  <Text className="text-white font-bold text-lg">Ahorra Tiempo</Text>
                  <Text className="text-zinc-400 text-sm">Cocina 1-2 veces, come toda la semana</Text>
                </View>
              </View>
            </View>

            {/* Generate Button */}
            <TouchableOpacity
              onPress={generateWeekPlan}
              className="bg-gradient-to-r from-emerald-500 to-blue-500 rounded-xl p-6 flex-row items-center justify-center mb-6"
            >
              <Ionicons name="flash" size={28} color="white" />
              <Text className="text-white font-bold text-xl ml-2">Generar Plan Semanal</Text>
            </TouchableOpacity>

            {/* Benefits */}
            <View className="bg-blue-500/10 rounded-xl p-4 border border-blue-500/30 mb-6">
              <View className="flex-row items-start">
                <Ionicons name="bulb" size={20} color="#3B82F6" />
                <View className="flex-1 ml-3">
                  <Text className="text-blue-400 font-bold mb-2">
                    Por Qué Meal Prep
                  </Text>
                  <Text className="text-blue-300 text-sm">
                    • Ahorra 5-10 horas por semana{'\n'}
                    • Control total de macros{'\n'}
                    • Evita decisiones impulsivas{'\n'}
                    • Más barato que comer fuera{'\n'}
                    • Consistencia = resultados{'\n'}
                    • Menos estrés diario
                  </Text>
                </View>
              </View>
            </View>

            {/* Tips */}
            <View className="bg-amber-500/10 rounded-xl p-4 border border-amber-500/30 mb-6">
              <View className="flex-row items-start">
                <Ionicons name="flame" size={20} color="#F59E0B" />
                <View className="flex-1 ml-3">
                  <Text className="text-amber-400 font-bold mb-2">
                    Tips de Meal Prep
                  </Text>
                  <Text className="text-amber-300 text-sm">
                    • Cocina domingo para lun-mie{'\n'}
                    • Cocina miércoles para jue-dom{'\n'}
                    • Usa contenedores de cristal{'\n'}
                    • Congela porciones extras{'\n'}
                    • Varía proteínas y carbos{'\n'}
                    • Verduras frescas > congeladas
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }

  const averages = getWeekAverages();

  return (
    <View className="flex-1 bg-zinc-950">
      {/* Header */}
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => setShowGenerator(true)}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1 ml-3">
            Plan Semanal
          </Text>
          <TouchableOpacity onPress={() => Alert.alert('Guardado', 'Plan guardado')}>
            <Ionicons name="bookmark" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          {/* Week Averages */}
          <View className="bg-gradient-to-r from-emerald-500 to-blue-500 rounded-xl p-5 mb-6">
            <Text className="text-white font-bold text-lg mb-4">Promedio Diario</Text>
            <View className="flex-row gap-2">
              <View className="flex-1 bg-white/20 rounded-lg p-3">
                <Text className="text-white opacity-90 text-xs mb-1">Calorías</Text>
                <Text className="text-white font-bold text-xl">{averages.calories}</Text>
              </View>
              <View className="flex-1 bg-white/20 rounded-lg p-3">
                <Text className="text-white opacity-90 text-xs mb-1">Proteína</Text>
                <Text className="text-white font-bold text-xl">{averages.protein}g</Text>
              </View>
              <View className="flex-1 bg-white/20 rounded-lg p-3">
                <Text className="text-white opacity-90 text-xs mb-1">Carbos</Text>
                <Text className="text-white font-bold text-xl">{averages.carbs}g</Text>
              </View>
              <View className="flex-1 bg-white/20 rounded-lg p-3">
                <Text className="text-white opacity-90 text-xs mb-1">Grasas</Text>
                <Text className="text-white font-bold text-xl">{averages.fats}g</Text>
              </View>
            </View>
          </View>

          {/* Days */}
          <Text className="text-white font-bold text-lg mb-4">Días de la Semana</Text>
          {weekPlan.map((dayPlan, index) => {
            const totals = getDayTotals(dayPlan);
            
            return (
              <View key={index} className="bg-zinc-900 rounded-xl p-4 mb-4 border border-zinc-800">
                <View className="flex-row items-center justify-between mb-3">
                  <Text className="text-white font-bold text-xl">{dayPlan.day}</Text>
                  <View className="bg-emerald-500/10 rounded-lg px-3 py-1 border border-emerald-500/30">
                    <Text className="text-emerald-400 font-bold text-xs">{totals.calories} kcal</Text>
                  </View>
                </View>

                {/* Meals */}
                <View className="gap-2">
                  {/* Breakfast */}
                  <View className="bg-zinc-800 rounded-lg p-3">
                    <View className="flex-row items-center mb-2">
                      <Ionicons name="sunny" size={16} color="#F59E0B" />
                      <Text className="text-amber-400 font-bold ml-2">Desayuno</Text>
                    </View>
                    {dayPlan.meals.breakfast.map((meal, idx) => (
                      <View key={idx}>
                        <Text className="text-white font-bold">{meal.name}</Text>
                        <Text className="text-zinc-400 text-xs">
                          P: {meal.protein}g | C: {meal.carbs}g | F: {meal.fats}g | {meal.calories} kcal
                        </Text>
                      </View>
                    ))}
                  </View>

                  {/* Lunch */}
                  <View className="bg-zinc-800 rounded-lg p-3">
                    <View className="flex-row items-center mb-2">
                      <Ionicons name="restaurant" size={16} color="#3B82F6" />
                      <Text className="text-blue-400 font-bold ml-2">Comida</Text>
                    </View>
                    {dayPlan.meals.lunch.map((meal, idx) => (
                      <View key={idx}>
                        <Text className="text-white font-bold">{meal.name}</Text>
                        <Text className="text-zinc-400 text-xs">
                          P: {meal.protein}g | C: {meal.carbs}g | F: {meal.fats}g | {meal.calories} kcal
                        </Text>
                      </View>
                    ))}
                  </View>

                  {/* Dinner */}
                  <View className="bg-zinc-800 rounded-lg p-3">
                    <View className="flex-row items-center mb-2">
                      <Ionicons name="moon" size={16} color="#A855F7" />
                      <Text className="text-purple-400 font-bold ml-2">Cena</Text>
                    </View>
                    {dayPlan.meals.dinner.map((meal, idx) => (
                      <View key={idx}>
                        <Text className="text-white font-bold">{meal.name}</Text>
                        <Text className="text-zinc-400 text-xs">
                          P: {meal.protein}g | C: {meal.carbs}g | F: {meal.fats}g | {meal.calories} kcal
                        </Text>
                      </View>
                    ))}
                  </View>

                  {/* Snacks */}
                  <View className="bg-zinc-800 rounded-lg p-3">
                    <View className="flex-row items-center mb-2">
                      <Ionicons name="nutrition" size={16} color="#10B981" />
                      <Text className="text-emerald-400 font-bold ml-2">Snacks</Text>
                    </View>
                    {dayPlan.meals.snacks.map((meal, idx) => (
                      <View key={idx}>
                        <Text className="text-white font-bold">{meal.name}</Text>
                        <Text className="text-zinc-400 text-xs">
                          P: {meal.protein}g | C: {meal.carbs}g | F: {meal.fats}g | {meal.calories} kcal
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>

                {/* Day Totals */}
                <View className="mt-3 bg-zinc-950 rounded-lg p-2">
                  <Text className="text-zinc-400 text-xs text-center">
                    Total: P {totals.protein}g | C {totals.carbs}g | F {totals.fats}g | {totals.calories} kcal
                  </Text>
                </View>
              </View>
            );
          })}

          {/* Shopping List */}
          <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
            <View className="flex-row items-center mb-4">
              <Ionicons name="cart" size={24} color="#A855F7" />
              <Text className="text-white font-bold text-xl ml-3">Shopping List</Text>
            </View>

            <View className="gap-2">
              {shoppingList.map((item, index) => (
                <View key={index} className="flex-row items-center bg-zinc-800 rounded-lg p-3">
                  <Ionicons name="checkbox" size={20} color="#10B981" />
                  <Text className="text-white ml-3">{item}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Actions */}
          <View className="flex-row gap-3 mb-6">
            <TouchableOpacity
              onPress={() => Alert.alert('Compartido', 'Plan compartido')}
              className="flex-1 bg-blue-500 rounded-xl p-4 flex-row items-center justify-center"
            >
              <Ionicons name="share" size={20} color="white" />
              <Text className="text-white font-bold ml-2">Compartir</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={generateWeekPlan}
              className="flex-1 bg-purple-500 rounded-xl p-4 flex-row items-center justify-center"
            >
              <Ionicons name="refresh" size={20} color="white" />
              <Text className="text-white font-bold ml-2">Regenerar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
