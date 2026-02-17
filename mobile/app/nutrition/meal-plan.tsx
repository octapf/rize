import React, { useState } from 'react';
import { Text } from '@/components/ui/Text';
import { View, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';;
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
}

interface DayPlan {
  day: string;
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFats: number;
  meals: Meal[];
}

const WEEKLY_PLAN: DayPlan[] = [
  {
    day: 'Lunes',
    totalCalories: 2800,
    totalProtein: 180,
    totalCarbs: 320,
    totalFats: 85,
    meals: [
      {
        id: '1',
        name: 'Desayuno',
        time: '08:00',
        calories: 650,
        protein: 40,
        carbs: 75,
        fats: 20,
        foods: ['Avena con proteína', 'Plátano', 'Almendras', 'Café'],
      },
      {
        id: '2',
        name: 'Almuerzo',
        time: '13:00',
        calories: 850,
        protein: 60,
        carbs: 95,
        fats: 25,
        foods: ['Pollo a la plancha (200g)', 'Arroz integral', 'Brócoli', 'Aguacate'],
      },
      {
        id: '3',
        name: 'Merienda',
        time: '17:00',
        calories: 400,
        protein: 30,
        carbs: 45,
        fats: 12,
        foods: ['Batido de proteína', 'Avena', 'Mantequilla de maní'],
      },
      {
        id: '4',
        name: 'Cena',
        time: '20:00',
        calories: 750,
        protein: 50,
        carbs: 80,
        fats: 22,
        foods: ['Salmón al horno (180g)', 'Batata', 'Espárragos', 'Aceite de oliva'],
      },
      {
        id: '5',
        name: 'Pre-Sueño',
        time: '23:00',
        calories: 150,
        protein: 0,
        carbs: 25,
        fats: 6,
        foods: ['Caseína', 'Nueces'],
      },
    ],
  },
];

export default function MealPlan() {
  const [selectedDay, setSelectedDay] = useState(0);
  const [showAddMeal, setShowAddMeal] = useState(false);

  const currentPlan = WEEKLY_PLAN[selectedDay];
  const days = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

  const getMacroPercentage = (macro: number, total: number) => {
    return ((macro / total) * 100).toFixed(0);
  };

  const addMeal = () => {
    Alert.alert(
      'Próximamente',
      'La funcionalidad de agregar comidas estará disponible pronto'
    );
    setShowAddMeal(false);
  };

  return (
    <View className="flex-1 bg-zinc-950">
      {/* Header */}
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center justify-between mb-3">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1 ml-3">
            Plan de Comidas
          </Text>
          <TouchableOpacity onPress={() => setShowAddMeal(true)}>
            <Ionicons name="add-circle" size={28} color="#9D12DE" />
          </TouchableOpacity>
        </View>

        {/* Day Selector */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mb-3"
        >
          {days.map((day, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setSelectedDay(index)}
              className={`mr-3 px-4 py-2 rounded-xl ${
                selectedDay === index
                  ? 'bg-primary'
                  : 'bg-zinc-900'
              }`}
            >
              <Text
                className={`font-bold ${
                  selectedDay === index ? 'text-white' : 'text-zinc-400'
                }`}
              >
                {day}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Daily Summary */}
      <View className="px-6 py-4 border-b border-zinc-800">
        <View className="bg-zinc-900 rounded-xl p-4 border border-zinc-800">
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-white font-bold text-lg">
              Total del Día
            </Text>
            <Text className="text-primary font-bold text-2xl">
              {currentPlan.totalCalories}
            </Text>
          </View>

          <View className="flex-row justify-between">
            <View className="flex-1 items-center">
              <Text className="text-zinc-400 text-xs mb-1">Proteína</Text>
              <Text className="text-red-500 text-xl font-bold">
                {currentPlan.totalProtein}g
              </Text>
              <Text className="text-zinc-500 text-xs">
                {getMacroPercentage(
                  currentPlan.totalProtein * 4,
                  currentPlan.totalCalories
                )}%
              </Text>
            </View>

            <View className="flex-1 items-center border-l border-zinc-800">
              <Text className="text-zinc-400 text-xs mb-1">Carbos</Text>
              <Text className="text-primary text-xl font-bold">
                {currentPlan.totalCarbs}g
              </Text>
              <Text className="text-zinc-500 text-xs">
                {getMacroPercentage(
                  currentPlan.totalCarbs * 4,
                  currentPlan.totalCalories
                )}%
              </Text>
            </View>

            <View className="flex-1 items-center border-l border-zinc-800">
              <Text className="text-zinc-400 text-xs mb-1">Grasas</Text>
              <Text className="text-amber-500 text-xl font-bold">
                {currentPlan.totalFats}g
              </Text>
              <Text className="text-zinc-500 text-xs">
                {getMacroPercentage(
                  currentPlan.totalFats * 9,
                  currentPlan.totalCalories
                )}%
              </Text>
            </View>
          </View>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Meals */}
        <View className="px-6 py-4">
          {currentPlan.meals.map((meal) => (
            <View
              key={meal.id}
              className="bg-zinc-900 rounded-xl p-4 mb-3 border border-zinc-800"
            >
              <View className="flex-row items-center justify-between mb-3">
                <View>
                  <Text className="text-white font-bold text-lg">
                    {meal.name}
                  </Text>
                  <View className="flex-row items-center mt-1">
                    <Ionicons name="time-outline" size={14} color="#71717A" />
                    <Text className="text-zinc-400 text-sm ml-1">
                      {meal.time}
                    </Text>
                  </View>
                </View>
                <View className="items-end">
                  <Text className="text-primary font-bold text-2xl">
                    {meal.calories}
                  </Text>
                  <Text className="text-zinc-500 text-xs">calorías</Text>
                </View>
              </View>

              {/* Macros */}
              <View className="flex-row gap-2 mb-3">
                <View className="flex-1 bg-red-500/10 rounded-lg p-2">
                  <Text className="text-red-500 text-xs">P</Text>
                  <Text className="text-white font-bold">{meal.protein}g</Text>
                </View>
                <View className="flex-1 bg-primary/10 rounded-lg p-2">
                  <Text className="text-primary text-xs">C</Text>
                  <Text className="text-white font-bold">{meal.carbs}g</Text>
                </View>
                <View className="flex-1 bg-amber-500/10 rounded-lg p-2">
                  <Text className="text-amber-500 text-xs">G</Text>
                  <Text className="text-white font-bold">{meal.fats}g</Text>
                </View>
              </View>

              {/* Foods */}
              <View className="pt-3 border-t border-zinc-800">
                <Text className="text-zinc-400 text-xs mb-2">Alimentos:</Text>
                {meal.foods.map((food, index) => (
                  <View
                    key={index}
                    className="flex-row items-center mb-1"
                  >
                    <View className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
                    <Text className="text-zinc-300 text-sm">{food}</Text>
                  </View>
                ))}
              </View>

              {/* Actions */}
              <View className="flex-row gap-2 mt-3">
                <TouchableOpacity className="flex-1 bg-zinc-800 rounded-lg p-2 flex-row items-center justify-center">
                  <Ionicons name="create-outline" size={16} color="white" />
                  <Text className="text-white text-sm font-semibold ml-1">
                    Editar
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex-1 bg-primary/20 rounded-lg p-2 flex-row items-center justify-center">
                  <Ionicons name="checkmark" size={16} color="#9D12DE" />
                  <Text className="text-primary text-sm font-semibold ml-1">
                    Registrar
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {/* Tips */}
        <View className="px-6 py-4">
          <View className="bg-primary/10 rounded-xl p-4 border border-primary/30">
            <View className="flex-row items-start">
              <Ionicons name="information-circle" size={24} color="#9D12DE" />
              <View className="flex-1 ml-3">
                <Text className="text-primary/80 font-bold mb-1">
                  Consejo del Día
                </Text>
                <Text className="text-primary/60 text-sm leading-5">
                  Distribuye tu proteína de manera uniforme durante el día para
                  maximizar la síntesis de proteína muscular (20-40g por comida).
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View className="h-24" />
      </ScrollView>

      {/* Quick Actions */}
      <View className="absolute bottom-6 right-6">
        <TouchableOpacity className="w-14 h-14 bg-primary rounded-full items-center justify-center shadow-lg">
          <Ionicons name="camera" size={28} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

