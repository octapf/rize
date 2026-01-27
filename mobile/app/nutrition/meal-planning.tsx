import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  Image,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface MealPlan {
  id: string;
  day: string;
  meals: Meal[];
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFats: number;
}

interface Meal {
  id: string;
  name: string;
  type: 'desayuno' | 'snack1' | 'almuerzo' | 'snack2' | 'cena' | 'post';
  time: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  foods: string[];
}

interface GroceryItem {
  id: string;
  name: string;
  category: 'proteinas' | 'carbohidratos' | 'vegetales' | 'frutas' | 'lacteos' | 'otros';
  quantity: string;
  checked: boolean;
}

const WEEK_DAYS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

const SAMPLE_PLAN: MealPlan = {
  id: '1',
  day: 'Lunes',
  totalCalories: 2450,
  totalProtein: 185,
  totalCarbs: 280,
  totalFats: 65,
  meals: [
    {
      id: '1',
      name: 'Desayuno Alto en Proteína',
      type: 'desayuno',
      time: '08:00',
      calories: 520,
      protein: 42,
      carbs: 55,
      fats: 12,
      foods: ['4 claras + 2 huevos', '80g avena', '1 plátano', 'Café'],
    },
    {
      id: '2',
      name: 'Snack Pre-Entrenamiento',
      type: 'snack1',
      time: '11:00',
      calories: 280,
      protein: 25,
      carbs: 35,
      fats: 3,
      foods: ['1 scoop whey', '1 manzana', '20g almendras'],
    },
    {
      id: '3',
      name: 'Almuerzo Post-Entrenamiento',
      type: 'almuerzo',
      time: '14:00',
      calories: 680,
      protein: 55,
      carbs: 75,
      fats: 18,
      foods: ['200g pechuga de pollo', '150g arroz integral', 'Ensalada verde', '1 cda aceite de oliva'],
    },
    {
      id: '4',
      name: 'Merienda',
      type: 'snack2',
      time: '17:00',
      calories: 320,
      protein: 28,
      carbs: 40,
      fats: 8,
      foods: ['Yogurt griego 200g', '30g granola', 'Frutas del bosque'],
    },
    {
      id: '5',
      name: 'Cena Ligera',
      type: 'cena',
      time: '20:00',
      calories: 480,
      protein: 48,
      carbs: 42,
      fats: 15,
      foods: ['180g salmón', '150g batata', 'Brócoli al vapor', 'Ensalada'],
    },
    {
      id: '6',
      name: 'Snack Nocturno',
      type: 'post',
      time: '22:00',
      calories: 170,
      protein: 25,
      carbs: 8,
      fats: 5,
      foods: ['30g caseína', '10 almendras'],
    },
  ],
};

const GROCERY_LIST: GroceryItem[] = [
  { id: '1', name: 'Pechuga de pollo', category: 'proteinas', quantity: '1.4 kg', checked: false },
  { id: '2', name: 'Salmón fresco', category: 'proteinas', quantity: '900g', checked: false },
  { id: '3', name: 'Huevos', category: 'proteinas', quantity: '2 docenas', checked: false },
  { id: '4', name: 'Whey protein', category: 'proteinas', quantity: '1 bote', checked: false },
  { id: '5', name: 'Arroz integral', category: 'carbohidratos', quantity: '1 kg', checked: false },
  { id: '6', name: 'Avena', category: 'carbohidratos', quantity: '500g', checked: false },
  { id: '7', name: 'Batata', category: 'carbohidratos', quantity: '1 kg', checked: false },
  { id: '8', name: 'Brócoli', category: 'vegetales', quantity: '500g', checked: false },
  { id: '9', name: 'Lechuga', category: 'vegetales', quantity: '2 unidades', checked: false },
  { id: '10', name: 'Plátanos', category: 'frutas', quantity: '7 unidades', checked: false },
  { id: '11', name: 'Manzanas', category: 'frutas', quantity: '7 unidades', checked: false },
  { id: '12', name: 'Yogurt griego', category: 'lacteos', quantity: '1.5 kg', checked: false },
  { id: '13', name: 'Almendras', category: 'otros', quantity: '200g', checked: false },
  { id: '14', name: 'Aceite de oliva', category: 'otros', quantity: '1 botella', checked: false },
];

export default function MealPlanning() {
  const [selectedDay, setSelectedDay] = useState('Lunes');
  const [selectedTab, setSelectedTab] = useState<'plan' | 'grocery'>('plan');
  const [groceryList, setGroceryList] = useState(GROCERY_LIST);

  const tabs = [
    { id: 'plan' as const, label: 'Plan Semanal', icon: 'calendar' },
    { id: 'grocery' as const, label: 'Lista de Compras', icon: 'cart' },
  ];

  const mealTypeColors = {
    desayuno: '#F59E0B',
    snack1: '#10B981',
    almuerzo: '#EF4444',
    snack2: '#10B981',
    cena: '#3B82F6',
    post: '#8B5CF6',
  };

  const categoryColors = {
    proteinas: '#EF4444',
    carbohidratos: '#F59E0B',
    vegetales: '#10B981',
    frutas: '#EC4899',
    lacteos: '#3B82F6',
    otros: '#71717A',
  };

  const toggleGroceryItem = (id: string) => {
    setGroceryList(groceryList.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  const copyToAllDays = () => {
    Alert.alert(
      'Copiar Plan',
      '¿Deseas copiar el plan de Lunes a todos los días de la semana?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Copiar',
          onPress: () => {
            Alert.alert('¡Copiado!', 'Plan aplicado a toda la semana');
          },
        },
      ]
    );
  };

  const generateGroceryList = () => {
    Alert.alert(
      '¡Lista Generada!',
      `${groceryList.length} productos agregados a tu lista de compras basados en tu plan semanal`
    );
  };

  const shareGroceryList = () => {
    const uncheckedItems = groceryList.filter((item) => !item.checked);
    Alert.alert(
      'Compartir Lista',
      `Compartir ${uncheckedItems.length} productos pendientes`,
      [
        { text: 'WhatsApp' },
        { text: 'Email' },
        { text: 'Copiar' },
        { text: 'Cancelar', style: 'cancel' },
      ]
    );
  };

  const checkedCount = groceryList.filter((item) => item.checked).length;
  const completionPercentage = Math.round((checkedCount / groceryList.length) * 100);

  return (
    <View className="flex-1 bg-zinc-950">
      {/* Header */}
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1 ml-3">
            Planificación de Comidas
          </Text>
          <TouchableOpacity>
            <Ionicons name="add-circle" size={24} color="#10B981" />
          </TouchableOpacity>
        </View>

        {/* Tabs */}
        <View className="flex-row gap-2">
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.id}
              onPress={() => setSelectedTab(tab.id)}
              className={`flex-1 flex-row items-center justify-center py-3 rounded-lg ${
                selectedTab === tab.id ? 'bg-emerald-500' : 'bg-zinc-900 border border-zinc-800'
              }`}
            >
              <Ionicons
                name={tab.icon as any}
                size={18}
                color={selectedTab === tab.id ? 'white' : '#71717A'}
              />
              <Text
                className={`ml-2 font-semibold text-sm ${
                  selectedTab === tab.id ? 'text-white' : 'text-zinc-400'
                }`}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Plan Tab */}
      {selectedTab === 'plan' && (
        <>
          {/* Day Selector */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="border-b border-zinc-800"
          >
            <View className="flex-row gap-2 px-6 py-3">
              {WEEK_DAYS.map((day) => (
                <TouchableOpacity
                  key={day}
                  onPress={() => setSelectedDay(day)}
                  className={`px-4 py-2 rounded-lg ${
                    selectedDay === day
                      ? 'bg-emerald-500'
                      : 'bg-zinc-900 border border-zinc-800'
                  }`}
                >
                  <Text
                    className={`font-semibold text-sm ${
                      selectedDay === day ? 'text-white' : 'text-zinc-400'
                    }`}
                  >
                    {day}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
            <View className="px-6 pt-6">
              {/* Daily Summary */}
              <View className="bg-gradient-to-br from-emerald-500 to-blue-500 rounded-xl p-4 mb-4">
                <Text className="text-white/80 text-sm mb-2">{selectedDay}</Text>
                <View className="flex-row items-end justify-between">
                  <View className="flex-1">
                    <Text className="text-white font-bold text-3xl mb-1">
                      {SAMPLE_PLAN.totalCalories}
                    </Text>
                    <Text className="text-white/80 text-sm">Calorías totales</Text>
                  </View>
                  <TouchableOpacity
                    onPress={copyToAllDays}
                    className="bg-white/20 rounded-lg px-3 py-2"
                  >
                    <View className="flex-row items-center">
                      <Ionicons name="copy" size={16} color="white" />
                      <Text className="text-white font-bold text-sm ml-1">
                        Copiar
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>

                <View className="flex-row gap-4 mt-4">
                  <View className="flex-1">
                    <Text className="text-white/60 text-xs">Proteína</Text>
                    <Text className="text-white font-bold text-lg">
                      {SAMPLE_PLAN.totalProtein}g
                    </Text>
                  </View>
                  <View className="flex-1">
                    <Text className="text-white/60 text-xs">Carbos</Text>
                    <Text className="text-white font-bold text-lg">
                      {SAMPLE_PLAN.totalCarbs}g
                    </Text>
                  </View>
                  <View className="flex-1">
                    <Text className="text-white/60 text-xs">Grasas</Text>
                    <Text className="text-white font-bold text-lg">
                      {SAMPLE_PLAN.totalFats}g
                    </Text>
                  </View>
                </View>
              </View>

              {/* Meals */}
              <Text className="text-white font-bold text-lg mb-3">
                Comidas del Día ({SAMPLE_PLAN.meals.length})
              </Text>

              {SAMPLE_PLAN.meals.map((meal) => (
                <View
                  key={meal.id}
                  className="bg-zinc-900 rounded-xl p-4 mb-3 border-l-4"
                  style={{ borderLeftColor: mealTypeColors[meal.type] }}
                >
                  <View className="flex-row items-start justify-between mb-3">
                    <View className="flex-1">
                      <View className="flex-row items-center mb-1">
                        <View
                          className="w-2 h-2 rounded-full mr-2"
                          style={{ backgroundColor: mealTypeColors[meal.type] }}
                        />
                        <Text className="text-zinc-400 text-xs">{meal.time}</Text>
                      </View>
                      <Text className="text-white font-bold text-lg mb-1">
                        {meal.name}
                      </Text>
                      <Text className="text-zinc-500 text-sm">{meal.calories} kcal</Text>
                    </View>
                    <TouchableOpacity>
                      <Ionicons name="create-outline" size={20} color="#71717A" />
                    </TouchableOpacity>
                  </View>

                  {/* Foods */}
                  <View className="bg-zinc-800 rounded-lg p-3 mb-3">
                    {meal.foods.map((food, index) => (
                      <Text key={index} className="text-zinc-300 text-sm mb-1">
                        • {food}
                      </Text>
                    ))}
                  </View>

                  {/* Macros */}
                  <View className="flex-row gap-3">
                    <View className="flex-1 bg-zinc-800 rounded-lg p-2">
                      <Text className="text-zinc-400 text-xs">Proteína</Text>
                      <Text className="text-red-500 font-bold">{meal.protein}g</Text>
                    </View>
                    <View className="flex-1 bg-zinc-800 rounded-lg p-2">
                      <Text className="text-zinc-400 text-xs">Carbos</Text>
                      <Text className="text-amber-500 font-bold">{meal.carbs}g</Text>
                    </View>
                    <View className="flex-1 bg-zinc-800 rounded-lg p-2">
                      <Text className="text-zinc-400 text-xs">Grasas</Text>
                      <Text className="text-blue-500 font-bold">{meal.fats}g</Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>
        </>
      )}

      {/* Grocery Tab */}
      {selectedTab === 'grocery' && (
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          <View className="px-6 pt-6">
            {/* Progress */}
            <View className="bg-zinc-900 rounded-xl p-4 mb-4 border border-zinc-800">
              <View className="flex-row items-center justify-between mb-3">
                <Text className="text-white font-bold">Progreso de Compras</Text>
                <Text className="text-emerald-500 font-bold">{completionPercentage}%</Text>
              </View>
              <View className="bg-zinc-800 h-2 rounded-full overflow-hidden">
                <View
                  className="h-full bg-emerald-500 rounded-full"
                  style={{ width: `${completionPercentage}%` }}
                />
              </View>
              <View className="flex-row items-center justify-between mt-2">
                <Text className="text-zinc-400 text-sm">
                  {checkedCount} de {groceryList.length} completados
                </Text>
                <TouchableOpacity onPress={shareGroceryList}>
                  <Ionicons name="share-outline" size={20} color="#10B981" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Generate Button */}
            <TouchableOpacity
              onPress={generateGroceryList}
              className="bg-emerald-500 rounded-lg p-4 mb-4"
            >
              <View className="flex-row items-center justify-center">
                <Ionicons name="sparkles" size={20} color="white" />
                <Text className="text-white font-bold ml-2">
                  Generar Lista desde Plan Semanal
                </Text>
              </View>
            </TouchableOpacity>

            {/* Grocery Items by Category */}
            {Object.keys(categoryColors).map((category) => {
              const items = groceryList.filter((item) => item.category === category);
              if (items.length === 0) return null;

              return (
                <View key={category} className="mb-4">
                  <Text className="text-white font-bold text-lg mb-2 capitalize">
                    {category}
                  </Text>
                  {items.map((item) => (
                    <TouchableOpacity
                      key={item.id}
                      onPress={() => toggleGroceryItem(item.id)}
                      className={`bg-zinc-900 rounded-xl p-4 mb-2 border ${
                        item.checked ? 'border-emerald-500' : 'border-zinc-800'
                      }`}
                    >
                      <View className="flex-row items-center justify-between">
                        <View className="flex-row items-center flex-1">
                          <View
                            className={`w-6 h-6 rounded-full border-2 items-center justify-center mr-3 ${
                              item.checked
                                ? 'bg-emerald-500 border-emerald-500'
                                : 'border-zinc-600'
                            }`}
                          >
                            {item.checked && (
                              <Ionicons name="checkmark" size={16} color="white" />
                            )}
                          </View>
                          <View className="flex-1">
                            <Text
                              className={`font-bold ${
                                item.checked ? 'text-zinc-500 line-through' : 'text-white'
                              }`}
                            >
                              {item.name}
                            </Text>
                            <Text className="text-zinc-400 text-sm">{item.quantity}</Text>
                          </View>
                        </View>
                        <View
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: categoryColors[item.category] }}
                        />
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              );
            })}
          </View>
        </ScrollView>
      )}
    </View>
  );
}
