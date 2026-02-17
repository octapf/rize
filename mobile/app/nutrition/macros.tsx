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

interface MacroEntry {
  id: string;
  meal: string;
  food: string;
  portion: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  time: string;
}

interface DailyMacros {
  date: string;
  entries: MacroEntry[];
  totals: {
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
  };
  goals: {
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
  };
}

const TODAY_DATA: DailyMacros = {
  date: '2025-01-27',
  goals: {
    calories: 2800,
    protein: 200,
    carbs: 320,
    fats: 75,
  },
  totals: {
    calories: 2340,
    protein: 178,
    carbs: 265,
    fats: 62,
  },
  entries: [
    {
      id: '1',
      meal: 'Desayuno',
      food: 'Avena con ProteÌna',
      portion: '100g avena + 1 scoop whey',
      calories: 480,
      protein: 42,
      carbs: 68,
      fats: 8,
      time: '07:30',
    },
    {
      id: '2',
      meal: 'Desayuno',
      food: 'Huevos Revueltos',
      portion: '4 claras + 2 huevos',
      calories: 220,
      protein: 26,
      carbs: 2,
      fats: 12,
      time: '07:35',
    },
    {
      id: '3',
      meal: 'Snack Pre-Entreno',
      food: 'Pl·tano + Mantequilla ManÌ',
      portion: '1 pl·tano + 20g PB',
      calories: 240,
      protein: 6,
      carbs: 38,
      fats: 9,
      time: '11:00',
    },
    {
      id: '4',
      meal: 'Almuerzo',
      food: 'Pechuga de Pollo',
      portion: '250g',
      calories: 275,
      protein: 58,
      carbs: 0,
      fats: 3,
      time: '13:30',
    },
    {
      id: '5',
      meal: 'Almuerzo',
      food: 'Arroz Integral',
      portion: '200g cocido',
      calories: 250,
      protein: 6,
      carbs: 52,
      fats: 2,
      time: '13:30',
    },
    {
      id: '6',
      meal: 'Almuerzo',
      food: 'Vegetales Mixtos',
      portion: '150g',
      calories: 60,
      protein: 3,
      carbs: 12,
      fats: 0,
      time: '13:30',
    },
    {
      id: '7',
      meal: 'Snack Tarde',
      food: 'Batido ProteÌna',
      portion: '1 scoop + agua',
      calories: 120,
      protein: 25,
      carbs: 3,
      fats: 1,
      time: '16:00',
    },
    {
      id: '8',
      meal: 'Cena',
      food: 'SalmÛn a la Plancha',
      portion: '200g',
      calories: 410,
      protein: 46,
      carbs: 0,
      fats: 24,
      time: '19:30',
    },
    {
      id: '9',
      meal: 'Cena',
      food: 'Batata Asada',
      portion: '250g',
      calories: 215,
      protein: 4,
      carbs: 50,
      fats: 0,
      time: '19:30',
    },
    {
      id: '10',
      meal: 'Snack Nocturno',
      food: 'Yogurt Griego',
      portion: '200g',
      calories: 140,
      protein: 20,
      carbs: 8,
      fats: 4,
      time: '21:00',
    },
  ],
};

export default function MacroTracker() {
  const [activeTab, setActiveTab] = useState<'today' | 'week' | 'add'>('today');
  const [searchQuery, setSearchQuery] = useState('');

  const tabs = [
    { id: 'today', label: 'Hoy', icon: 'today' },
    { id: 'week', label: 'Semana', icon: 'calendar' },
    { id: 'add', label: 'Agregar', icon: 'add-circle' },
  ];

  const calculateProgress = (current: number, goal: number) => {
    return Math.min((current / goal) * 100, 100);
  };

  const getProgressColor = (current: number, goal: number) => {
    const percentage = (current / goal) * 100;
    if (percentage >= 90 && percentage <= 110) return '#9D12DE';
    if (percentage >= 80 && percentage < 90) return '#9D12DE';
    if (percentage < 80) return '#FFEA00';
    return '#EF4444';
  };

  const addFood = () => {
    Alert.alert(
      'Agregar Alimento',
      'Busca en nuestra base de datos o crea personalizado',
      [
        { text: 'Buscar Alimento' },
        { text: 'Escanear CÛdigo de Barras' },
        { text: 'Manual' },
        { text: 'Cancelar', style: 'cancel' },
      ]
    );
  };

  const editEntry = (entry: MacroEntry) => {
    Alert.alert(
      'Editar Entrada',
      `${entry.food} - ${entry.portion}`,
      [
        { text: 'Editar PorciÛn' },
        { text: 'Duplicar' },
        { text: 'Eliminar', style: 'destructive' },
        { text: 'Cancelar', style: 'cancel' },
      ]
    );
  };

  const mealGroups = TODAY_DATA.entries.reduce((groups, entry) => {
    const meal = entry.meal;
    if (!groups[meal]) groups[meal] = [];
    groups[meal].push(entry);
    return groups;
  }, {} as Record<string, MacroEntry[]>);

  const remainingCalories = TODAY_DATA.goals.calories - TODAY_DATA.totals.calories;
  const remainingProtein = TODAY_DATA.goals.protein - TODAY_DATA.totals.protein;

  return (
    <View className="flex-1 bg-zinc-950">
      {/* Header */}
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1 ml-3">
            Rastreador de Macros
          </Text>
          <TouchableOpacity>
            <Ionicons name="settings-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Quick Stats */}
        <View className="bg-gradient-to-br from-primary to-[#7D0EBE] rounded-xl p-4 mb-4">
          <View className="flex-row items-center justify-between mb-3">
            <View>
              <Text className="text-white/80 text-sm mb-1">CalorÌas Hoy</Text>
              <Text className="text-white font-bold text-4xl">
                {TODAY_DATA.totals.calories}
              </Text>
              <Text className="text-white/80 text-sm">
                de {TODAY_DATA.goals.calories} kcal
              </Text>
            </View>
            <View className="items-end">
              <View className="bg-white/20 rounded-full px-4 py-2">
                <Text className="text-white font-bold text-lg">
                  {remainingCalories > 0 ? `-${remainingCalories}` : '+' + Math.abs(remainingCalories)}
                </Text>
              </View>
              <Text className="text-white/80 text-xs mt-1">
                {remainingCalories > 0 ? 'Restantes' : 'Exceso'}
              </Text>
            </View>
          </View>
          <View className="bg-white/20 h-2 rounded-full overflow-hidden">
            <View
              className="h-full bg-white rounded-full"
              style={{ width: `${calculateProgress(TODAY_DATA.totals.calories, TODAY_DATA.goals.calories)}%` }}
            />
          </View>
        </View>

        {/* Macros Summary */}
        <View className="flex-row gap-2 mb-4">
          {/* Protein */}
          <View className="flex-1 bg-red-500/20 rounded-lg p-3 border border-red-500/30">
            <View className="flex-row items-center justify-between mb-2">
              <Text className="text-red-400 font-bold text-xs">PROTE√çNA</Text>
              <Ionicons name="flame" size={14} color="#EF4444" />
            </View>
            <Text className="text-white font-bold text-2xl mb-1">
              {TODAY_DATA.totals.protein}g
            </Text>
            <View className="bg-red-900/30 h-1.5 rounded-full overflow-hidden">
              <View
                className="h-full bg-red-500 rounded-full"
                style={{ width: `${calculateProgress(TODAY_DATA.totals.protein, TODAY_DATA.goals.protein)}%` }}
              />
            </View>
            <Text className="text-red-400 text-xs mt-1">
              {TODAY_DATA.goals.protein}g meta
            </Text>
          </View>

          {/* Carbs */}
          <View className="flex-1 bg-amber-500/20 rounded-lg p-3 border border-amber-500/30">
            <View className="flex-row items-center justify-between mb-2">
              <Text className="text-amber-400 font-bold text-xs">CARBOS</Text>
              <Ionicons name="nutrition" size={14} color="#FFEA00" />
            </View>
            <Text className="text-white font-bold text-2xl mb-1">
              {TODAY_DATA.totals.carbs}g
            </Text>
            <View className="bg-amber-900/30 h-1.5 rounded-full overflow-hidden">
              <View
                className="h-full bg-amber-500 rounded-full"
                style={{ width: `${calculateProgress(TODAY_DATA.totals.carbs, TODAY_DATA.goals.carbs)}%` }}
              />
            </View>
            <Text className="text-amber-400 text-xs mt-1">
              {TODAY_DATA.goals.carbs}g meta
            </Text>
          </View>

          {/* Fats */}
          <View className="flex-1 bg-primary/20 rounded-lg p-3 border border-primary/30">
            <View className="flex-row items-center justify-between mb-2">
              <Text className="text-primary/80 font-bold text-xs">GRASAS</Text>
              <Ionicons name="water" size={14} color="#9D12DE" />
            </View>
            <Text className="text-white font-bold text-2xl mb-1">
              {TODAY_DATA.totals.fats}g
            </Text>
            <View className="bg-blue-900/30 h-1.5 rounded-full overflow-hidden">
              <View
                className="h-full bg-primary rounded-full"
                style={{ width: `${calculateProgress(TODAY_DATA.totals.fats, TODAY_DATA.goals.fats)}%` }}
              />
            </View>
            <Text className="text-primary/80 text-xs mt-1">
              {TODAY_DATA.goals.fats}g meta
            </Text>
          </View>
        </View>

        {/* Tabs */}
        <View className="flex-row gap-2">
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.id}
              onPress={() => setActiveTab(tab.id as any)}
              className={`flex-1 flex-row items-center justify-center px-4 py-2 rounded-lg ${
                activeTab === tab.id
                  ? 'bg-primary'
                  : 'bg-zinc-900 border border-zinc-800'
              }`}
            >
              <Ionicons
                name={tab.icon as any}
                size={18}
                color={activeTab === tab.id ? 'white' : '#71717A'}
              />
              <Text
                className={`ml-2 font-semibold text-sm ${
                  activeTab === tab.id ? 'text-white' : 'text-zinc-400'
                }`}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {activeTab === 'today' && (
          <View className="px-6 pt-6">
            <View className="flex-row items-center justify-between mb-3">
              <Text className="text-white font-bold text-lg">
                Registro de Hoy
              </Text>
              <TouchableOpacity
                onPress={addFood}
                className="bg-primary rounded-lg px-4 py-2"
              >
                <View className="flex-row items-center">
                  <Ionicons name="add" size={18} color="white" />
                  <Text className="text-white font-bold ml-1 text-sm">Agregar</Text>
                </View>
              </TouchableOpacity>
            </View>

            {Object.entries(mealGroups).map(([meal, entries]) => {
              const mealTotals = entries.reduce(
                (acc, entry) => ({
                  calories: acc.calories + entry.calories,
                  protein: acc.protein + entry.protein,
                  carbs: acc.carbs + entry.carbs,
                  fats: acc.fats + entry.fats,
                }),
                { calories: 0, protein: 0, carbs: 0, fats: 0 }
              );

              return (
                <View key={meal} className="mb-6">
                  <View className="flex-row items-center justify-between mb-3">
                    <View>
                      <Text className="text-white font-bold text-lg">{meal}</Text>
                      <Text className="text-zinc-400 text-sm">
                        {mealTotals.calories} kcal ï {mealTotals.protein}P {mealTotals.carbs}C{' '}
                        {mealTotals.fats}F
                      </Text>
                    </View>
                    <Text className="text-zinc-500 text-sm">
                      {entries[0].time}
                    </Text>
                  </View>

                  {entries.map((entry) => (
                    <TouchableOpacity
                      key={entry.id}
                      onPress={() => editEntry(entry)}
                      className="bg-zinc-900 rounded-lg p-3 mb-2 border border-zinc-800"
                    >
                      <View className="flex-row items-center justify-between mb-2">
                        <View className="flex-1">
                          <Text className="text-white font-bold">{entry.food}</Text>
                          <Text className="text-zinc-400 text-sm">{entry.portion}</Text>
                        </View>
                        <Text className="text-white font-bold text-lg">
                          {entry.calories}
                        </Text>
                      </View>
                      <View className="flex-row gap-3">
                        <View className="bg-red-500/20 px-3 py-1 rounded-full">
                          <Text className="text-red-400 text-xs font-bold">
                            {entry.protein}g P
                          </Text>
                        </View>
                        <View className="bg-amber-500/20 px-3 py-1 rounded-full">
                          <Text className="text-amber-400 text-xs font-bold">
                            {entry.carbs}g C
                          </Text>
                        </View>
                        <View className="bg-primary/20 px-3 py-1 rounded-full">
                          <Text className="text-primary/80 text-xs font-bold">
                            {entry.fats}g F
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              );
            })}
          </View>
        )}

        {activeTab === 'add' && (
          <View className="px-6 pt-6">
            <View className="bg-zinc-900 rounded-xl px-4 py-3 mb-4 flex-row items-center border border-zinc-800">
              <Ionicons name="search" size={20} color="#71717A" />
              <TextInput
                placeholder="Buscar alimentos..."
                placeholderTextColor="#71717A"
                value={searchQuery}
                onChangeText={setSearchQuery}
                className="flex-1 ml-3 text-white"
              />
            </View>

            <TouchableOpacity
              onPress={addFood}
              className="bg-primary rounded-xl p-4 mb-3"
            >
              <View className="flex-row items-center justify-center">
                <Ionicons name="barcode" size={20} color="white" />
                <Text className="text-white font-bold ml-2">
                  Escanear CÛdigo de Barras
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity className="bg-zinc-900 rounded-xl p-4 border border-zinc-800">
              <View className="flex-row items-center justify-center">
                <Ionicons name="create" size={20} color="white" />
                <Text className="text-white font-bold ml-2">
                  Crear Alimento Personalizado
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        )}

        <View className="px-6 pb-6 pt-4">
          <View className="bg-primary/10 rounded-xl p-4 border border-primary/30">
            <View className="flex-row items-start">
              <Ionicons name="information-circle" size={20} color="#9D12DE" />
              <View className="flex-1 ml-3">
                <Text className="text-primary/80 font-bold mb-2">
                  Tracking Preciso
                </Text>
                <Text className="text-primary/60 text-sm">
                  Usa una balanza digital para pesar alimentos y obtener macros precisos. Mide alimentos crudos para mayor exactitud.
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}


