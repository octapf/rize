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

interface Food {
  id: string;
  name: string;
  brand?: string;
  serving: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  category: string;
  verified: boolean;
  barcode?: string;
}

interface MealEntry {
  id: string;
  food: Food;
  servings: number;
  meal: string;
  time: string;
}

const FOOD_DATABASE: Food[] = [
  {
    id: '1',
    name: 'Pechuga de pollo',
    serving: '100g',
    calories: 165,
    protein: 31,
    carbs: 0,
    fats: 3.6,
    category: 'ProteÃ­nas',
    verified: true,
  },
  {
    id: '2',
    name: 'Arroz blanco cocido',
    serving: '100g',
    calories: 130,
    protein: 2.7,
    carbs: 28,
    fats: 0.3,
    category: 'Carbohidratos',
    verified: true,
  },
  {
    id: '3',
    name: 'Aguacate',
    serving: '100g',
    calories: 160,
    protein: 2,
    carbs: 9,
    fats: 15,
    category: 'Grasas',
    verified: true,
  },
  {
    id: '4',
    name: 'PlÃ¡tano',
    serving: '1 mediano (118g)',
    calories: 105,
    protein: 1.3,
    carbs: 27,
    fats: 0.4,
    category: 'Frutas',
    verified: true,
  },
  {
    id: '5',
    name: 'Huevo entero',
    serving: '1 grande (50g)',
    calories: 72,
    protein: 6,
    carbs: 0.4,
    fats: 5,
    category: 'ProteÃ­nas',
    verified: true,
  },
  {
    id: '6',
    name: 'Avena',
    serving: '40g',
    calories: 148,
    protein: 5.3,
    carbs: 27,
    fats: 2.8,
    category: 'Carbohidratos',
    verified: true,
  },
  {
    id: '7',
    name: 'Leche entera',
    serving: '250ml',
    calories: 150,
    protein: 8,
    carbs: 12,
    fats: 8,
    category: 'LÃ¡cteos',
    verified: true,
  },
  {
    id: '8',
    name: 'Whey Protein',
    brand: 'ON Gold Standard',
    serving: '1 scoop (30g)',
    calories: 120,
    protein: 24,
    carbs: 3,
    fats: 1,
    category: 'Suplementos',
    verified: true,
    barcode: '748927022209',
  },
];

const RECENT_FOODS: Food[] = FOOD_DATABASE.slice(0, 4);

export default function CalorieCounter() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMeal, setSelectedMeal] = useState('Desayuno');
  const [todayEntries, setTodayEntries] = useState<MealEntry[]>([
    {
      id: '1',
      food: FOOD_DATABASE[4],
      servings: 2,
      meal: 'Desayuno',
      time: '08:30',
    },
    {
      id: '2',
      food: FOOD_DATABASE[5],
      servings: 1,
      meal: 'Desayuno',
      time: '08:30',
    },
  ]);

  const meals = ['Desayuno', 'Almuerzo', 'Cena', 'Snack'];

  const filteredFoods = FOOD_DATABASE.filter(
    (food) =>
      food.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (food.brand && food.brand.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const totalCalories = todayEntries.reduce(
    (sum, entry) => sum + entry.food.calories * entry.servings,
    0
  );
  const totalProtein = todayEntries.reduce(
    (sum, entry) => sum + entry.food.protein * entry.servings,
    0
  );
  const totalCarbs = todayEntries.reduce(
    (sum, entry) => sum + entry.food.carbs * entry.servings,
    0
  );
  const totalFats = todayEntries.reduce(
    (sum, entry) => sum + entry.food.fats * entry.servings,
    0
  );

  const calorieGoal = 2500;
  const proteinGoal = 180;
  const carbsGoal = 250;
  const fatsGoal = 70;

  const addFood = (food: Food) => {
    Alert.prompt(
      `Agregar ${food.name}`,
      `Â¿CuÃ¡ntas porciones de ${food.serving}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Agregar',
          onPress: (servings) => {
            const servingAmount = parseFloat(servings || '1');
            if (isNaN(servingAmount) || servingAmount <= 0) {
              Alert.alert('Error', 'Ingresa una cantidad vÃ¡lida');
              return;
            }

            const newEntry: MealEntry = {
              id: Date.now().toString(),
              food,
              servings: servingAmount,
              meal: selectedMeal,
              time: new Date().toLocaleTimeString('es-ES', {
                hour: '2-digit',
                minute: '2-digit',
              }),
            };

            setTodayEntries((prev) => [...prev, newEntry]);
            Alert.alert(
              'Â¡Agregado!',
              `${servingAmount} ${food.serving} de ${food.name} agregado a ${selectedMeal}`
            );
          },
        },
      ],
      'plain-text',
      '1'
    );
  };

  const scanBarcode = () => {
    Alert.alert(
      'Escanear CÃ³digo de Barras',
      'Abriendo cÃ¡mara...',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Simular Escaneo',
          onPress: () => {
            const wheyProtein = FOOD_DATABASE.find((f) => f.barcode);
            if (wheyProtein) {
              Alert.alert(
                'Producto Encontrado',
                `${wheyProtein.name}${
                  wheyProtein.brand ? ` - ${wheyProtein.brand}` : ''
                }`,
                [
                  { text: 'Cancelar', style: 'cancel' },
                  {
                    text: 'Agregar',
                    onPress: () => addFood(wheyProtein),
                  },
                ]
              );
            }
          },
        },
      ]
    );
  };

  const takePhoto = () => {
    Alert.alert(
      'Foto de Comida',
      'Toma una foto de tu comida para anÃ¡lisis con IA',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Abrir CÃ¡mara',
          onPress: () =>
            Alert.alert('IA Analyzing...', 'Detectando alimentos en la imagen...'),
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
            Contador de CalorÃ­as
          </Text>
          <TouchableOpacity onPress={() => router.push('/nutrition/meal-plan')}>
            <Ionicons name="calendar-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Daily Summary */}
        <View className="bg-zinc-900 rounded-xl p-4 border border-zinc-800">
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-zinc-400 text-sm">CalorÃ­as Hoy</Text>
            <Text className="text-zinc-400 text-sm">
              {totalCalories} / {calorieGoal}
            </Text>
          </View>

          {/* Progress Bar */}
          <View className="bg-zinc-800 h-3 rounded-full overflow-hidden mb-4">
            <View
              className="h-full bg-primary rounded-full"
              style={{ width: `${Math.min((totalCalories / calorieGoal) * 100, 100)}%` }}
            />
          </View>

          {/* Macros Grid */}
          <View className="flex-row gap-2">
            <View className="flex-1 bg-zinc-800 rounded-lg p-2">
              <Text className="text-primary/80 text-xs font-semibold">ProteÃ­na</Text>
              <Text className="text-white font-bold text-sm">
                {totalProtein.toFixed(0)}g
              </Text>
              <Text className="text-zinc-500 text-xs">/{proteinGoal}g</Text>
            </View>
            <View className="flex-1 bg-zinc-800 rounded-lg p-2">
              <Text className="text-amber-400 text-xs font-semibold">Carbos</Text>
              <Text className="text-white font-bold text-sm">
                {totalCarbs.toFixed(0)}g
              </Text>
              <Text className="text-zinc-500 text-xs">/{carbsGoal}g</Text>
            </View>
            <View className="flex-1 bg-zinc-800 rounded-lg p-2">
              <Text className="text-red-400 text-xs font-semibold">Grasas</Text>
              <Text className="text-white font-bold text-sm">
                {totalFats.toFixed(0)}g
              </Text>
              <Text className="text-zinc-500 text-xs">/{fatsGoal}g</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Meal Selector */}
      <View className="border-b border-zinc-800">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 12 }}
        >
          {meals.map((meal) => (
            <TouchableOpacity
              key={meal}
              onPress={() => setSelectedMeal(meal)}
              className={`mr-3 px-5 py-2 rounded-xl ${
                selectedMeal === meal ? 'bg-primary' : 'bg-zinc-900'
              }`}
            >
              <Text
                className={`font-semibold ${
                  selectedMeal === meal ? 'text-white' : 'text-zinc-400'
                }`}
              >
                {meal}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Quick Actions */}
      <View className="px-6 pt-4 pb-2">
        <View className="flex-row gap-3">
          <TouchableOpacity
            onPress={scanBarcode}
            className="flex-1 bg-zinc-900 rounded-xl p-4 flex-row items-center justify-center border border-zinc-800"
          >
            <Ionicons name="barcode-outline" size={20} color="#9D12DE" />
            <Text className="text-white font-semibold ml-2">Escanear</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={takePhoto}
            className="flex-1 bg-zinc-900 rounded-xl p-4 flex-row items-center justify-center border border-zinc-800"
          >
            <Ionicons name="camera-outline" size={20} color="#9D12DE" />
            <Text className="text-white font-semibold ml-2">Foto</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Search */}
      <View className="px-6 pt-2 pb-4">
        <View className="bg-zinc-900 rounded-xl border border-zinc-800 flex-row items-center px-4">
          <Ionicons name="search" size={20} color="#71717A" />
          <TextInput
            placeholder="Buscar alimentos..."
            placeholderTextColor="#71717A"
            value={searchQuery}
            onChangeText={setSearchQuery}
            className="flex-1 text-white py-3 px-3"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color="#71717A" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Recent/Search Results */}
        <View className="px-6">
          <Text className="text-white font-bold text-lg mb-3">
            {searchQuery ? 'Resultados' : 'Recientes'}
          </Text>

          {filteredFoods.map((food) => (
            <TouchableOpacity
              key={food.id}
              onPress={() => addFood(food)}
              className="bg-zinc-900 rounded-xl p-4 mb-3 border border-zinc-800"
            >
              <View className="flex-row items-start justify-between mb-2">
                <View className="flex-1">
                  <View className="flex-row items-center">
                    <Text className="text-white font-bold">{food.name}</Text>
                    {food.verified && (
                      <Ionicons
                        name="checkmark-circle"
                        size={16}
                        color="#9D12DE"
                        style={{ marginLeft: 6 }}
                      />
                    )}
                  </View>
                  {food.brand && (
                    <Text className="text-zinc-400 text-sm mt-0.5">{food.brand}</Text>
                  )}
                  <Text className="text-zinc-500 text-sm mt-1">{food.serving}</Text>
                </View>
                <View className="items-end">
                  <Text className="text-white font-bold text-lg">
                    {food.calories}
                  </Text>
                  <Text className="text-zinc-400 text-xs">kcal</Text>
                </View>
              </View>

              {/* Macros */}
              <View className="flex-row gap-3 pt-3 border-t border-zinc-800">
                <View className="flex-1">
                  <Text className="text-primary/80 text-xs">ProteÃ­na</Text>
                  <Text className="text-white text-sm font-semibold">
                    {food.protein}g
                  </Text>
                </View>
                <View className="flex-1">
                  <Text className="text-amber-400 text-xs">Carbos</Text>
                  <Text className="text-white text-sm font-semibold">
                    {food.carbs}g
                  </Text>
                </View>
                <View className="flex-1">
                  <Text className="text-red-400 text-xs">Grasas</Text>
                  <Text className="text-white text-sm font-semibold">
                    {food.fats}g
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Today's Entries */}
        {todayEntries.length > 0 && (
          <View className="px-6 mt-6 mb-6">
            <Text className="text-white font-bold text-lg mb-3">
              Agregado Hoy ({todayEntries.length})
            </Text>

            {todayEntries.map((entry) => (
              <View
                key={entry.id}
                className="bg-primary/10 rounded-xl p-4 mb-3 border border-primary/30"
              >
                <View className="flex-row items-start justify-between">
                  <View className="flex-1">
                    <View className="flex-row items-center mb-1">
                      <View className="bg-primary/20 px-2 py-0.5 rounded">
                        <Text className="text-primary text-xs font-bold">
                          {entry.meal}
                        </Text>
                      </View>
                      <Text className="text-zinc-400 text-xs ml-2">{entry.time}</Text>
                    </View>
                    <Text className="text-white font-bold">
                      {entry.food.name} x{entry.servings}
                    </Text>
                    <Text className="text-zinc-400 text-sm mt-0.5">
                      {entry.food.serving}
                    </Text>
                  </View>
                  <View className="items-end">
                    <Text className="text-primary font-bold text-lg">
                      {(entry.food.calories * entry.servings).toFixed(0)}
                    </Text>
                    <Text className="text-zinc-400 text-xs">kcal</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      {/* FAB - Add Custom Food */}
      <TouchableOpacity
        onPress={() =>
          Alert.alert(
            'Crear Alimento',
            'Funcionalidad para crear alimentos personalizados'
          )
        }
        className="absolute bottom-6 right-6 bg-primary w-14 h-14 rounded-full items-center justify-center shadow-lg"
      >
        <Ionicons name="add" size={28} color="white" />
      </TouchableOpacity>
    </View>
  );
}

