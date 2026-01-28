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
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface Supplement {
  id: string;
  name: string;
  category: 'protein' | 'performance' | 'health' | 'recovery' | 'other';
  dosage: string;
  unit: string;
  timings: string[];
  notes?: string;
  effectiveness?: number; // 1-5 rating
  isActive: boolean;
}

interface SupplementLog {
  id: string;
  supplementId: string;
  date: Date;
  timing: string;
  taken: boolean;
}

const SUPPLEMENT_LIBRARY = [
  { name: 'Whey Protein', category: 'protein', defaultDosage: '30', unit: 'g', timings: ['Post-Workout', 'Desayuno'] },
  { name: 'Creatina Monohidrato', category: 'performance', defaultDosage: '5', unit: 'g', timings: ['Post-Workout', 'Cualquier Momento'] },
  { name: 'Cafeína', category: 'performance', defaultDosage: '200', unit: 'mg', timings: ['Pre-Workout', 'Mañana'] },
  { name: 'Beta-Alanina', category: 'performance', defaultDosage: '3', unit: 'g', timings: ['Pre-Workout'] },
  { name: 'BCAAs', category: 'recovery', defaultDosage: '10', unit: 'g', timings: ['Intra-Workout', 'Pre-Workout'] },
  { name: 'Omega-3 (EPA/DHA)', category: 'health', defaultDosage: '2', unit: 'g', timings: ['Con Comida'] },
  { name: 'Vitamina D3', category: 'health', defaultDosage: '4000', unit: 'IU', timings: ['Mañana', 'Con Comida'] },
  { name: 'Magnesio', category: 'recovery', defaultDosage: '400', unit: 'mg', timings: ['Noche', 'Antes de Dormir'] },
  { name: 'ZMA', category: 'recovery', defaultDosage: '1', unit: 'dosis', timings: ['Antes de Dormir'] },
  { name: 'Ashwagandha', category: 'recovery', defaultDosage: '600', unit: 'mg', timings: ['Noche', 'Mañana'] },
  { name: 'L-Citrulina', category: 'performance', defaultDosage: '6', unit: 'g', timings: ['Pre-Workout'] },
  { name: 'Glutamina', category: 'recovery', defaultDosage: '5', unit: 'g', timings: ['Post-Workout', 'Antes de Dormir'] },
];

const MOCK_STACK: Supplement[] = [
  {
    id: '1',
    name: 'Whey Protein',
    category: 'protein',
    dosage: '30',
    unit: 'g',
    timings: ['Post-Workout', 'Desayuno'],
    effectiveness: 5,
    isActive: true,
  },
  {
    id: '2',
    name: 'Creatina Monohidrato',
    category: 'performance',
    dosage: '5',
    unit: 'g',
    timings: ['Post-Workout'],
    notes: 'Fase de carga completa',
    effectiveness: 5,
    isActive: true,
  },
  {
    id: '3',
    name: 'Cafeína',
    category: 'performance',
    dosage: '200',
    unit: 'mg',
    timings: ['Pre-Workout'],
    effectiveness: 4,
    isActive: true,
  },
  {
    id: '4',
    name: 'Omega-3',
    category: 'health',
    dosage: '2',
    unit: 'g',
    timings: ['Con Comida'],
    effectiveness: 4,
    isActive: true,
  },
];

export default function SupplementTracker() {
  const [stack, setStack] = useState<Supplement[]>(MOCK_STACK);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { key: 'all', label: 'Todos', icon: 'apps', color: 'blue' },
    { key: 'protein', label: 'Proteína', icon: 'nutrition', color: 'emerald' },
    { key: 'performance', label: 'Performance', icon: 'flash', color: 'red' },
    { key: 'recovery', label: 'Recuperación', icon: 'bed', color: 'purple' },
    { key: 'health', label: 'Salud', icon: 'heart', color: 'pink' },
  ];

  const filteredStack = selectedCategory === 'all' 
    ? stack 
    : stack.filter(s => s.category === selectedCategory);

  const addSupplement = (supplement: typeof SUPPLEMENT_LIBRARY[0]) => {
    const newSupplement: Supplement = {
      id: String(Date.now()),
      name: supplement.name,
      category: supplement.category as any,
      dosage: supplement.defaultDosage,
      unit: supplement.unit,
      timings: supplement.timings,
      isActive: true,
    };
    
    setStack([...stack, newSupplement]);
    setShowAddForm(false);
    Alert.alert('Suplemento Agregado ✓', `${supplement.name} añadido a tu stack`);
  };

  const toggleActive = (id: string) => {
    setStack(stack.map(s => 
      s.id === id ? { ...s, isActive: !s.isActive } : s
    ));
  };

  const updateEffectiveness = (id: string, rating: number) => {
    setStack(stack.map(s => 
      s.id === id ? { ...s, effectiveness: rating } : s
    ));
    Alert.alert('Rating Guardado ✓', `Efectividad: ${rating}/5 ⭐`);
  };

  const removeSupplement = (id: string) => {
    Alert.alert(
      'Eliminar Suplemento',
      '¿Estás seguro?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => setStack(stack.filter(s => s.id !== id))
        }
      ]
    );
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'protein': return 'emerald';
      case 'performance': return 'red';
      case 'recovery': return 'purple';
      case 'health': return 'pink';
      default: return 'blue';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'protein': return 'nutrition';
      case 'performance': return 'flash';
      case 'recovery': return 'bed';
      case 'health': return 'heart';
      default: return 'medical';
    }
  };

  const totalSupplements = stack.filter(s => s.isActive).length;
  const avgEffectiveness = stack.filter(s => s.effectiveness).length > 0
    ? Math.round(stack.filter(s => s.effectiveness).reduce((sum, s) => sum + (s.effectiveness || 0), 0) / stack.filter(s => s.effectiveness).length * 10) / 10
    : 0;

  if (showAddForm) {
    return (
      <View className="flex-1 bg-zinc-950">
        <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
          <View className="flex-row items-center mb-4">
            <TouchableOpacity onPress={() => setShowAddForm(false)}>
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <Text className="text-white text-2xl font-bold flex-1 ml-3">
              Agregar Suplemento
            </Text>
          </View>
        </View>

        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          <View className="px-6 pt-6">
            <Text className="text-white font-bold text-lg mb-4">Biblioteca de Suplementos</Text>
            
            {SUPPLEMENT_LIBRARY.map((supp, idx) => {
              const color = getCategoryColor(supp.category);
              const icon = getCategoryIcon(supp.category);
              
              return (
                <TouchableOpacity
                  key={idx}
                  onPress={() => addSupplement(supp)}
                  className="bg-zinc-900 rounded-xl p-4 mb-3 border border-zinc-800"
                >
                  <View className="flex-row items-center mb-2">
                    <View className={`w-10 h-10 bg-${color}-500 rounded-xl items-center justify-center mr-3`}>
                      <Ionicons name={icon as any} size={20} color="white" />
                    </View>
                    <Text className="text-white font-bold flex-1">{supp.name}</Text>
                    <Ionicons name="add-circle" size={24} color="#10B981" />
                  </View>
                  
                  <View className="flex-row items-center gap-3 ml-13">
                    <Text className="text-zinc-400 text-sm">
                      {supp.defaultDosage} {supp.unit}
                    </Text>
                    <Text className="text-zinc-500 text-sm">•</Text>
                    <Text className="text-zinc-400 text-sm">
                      {supp.timings.join(', ')}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-zinc-950">
      {/* Header */}
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1 ml-3">
            Suplementos
          </Text>
          <TouchableOpacity onPress={() => setShowAddForm(true)}>
            <View className="bg-emerald-500 rounded-full p-2">
              <Ionicons name="add" size={24} color="white" />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          {/* Info */}
          <View className="bg-gradient-to-r from-emerald-500 to-green-500 rounded-xl p-6 mb-6">
            <Text className="text-white text-2xl font-bold mb-2">Tu Stack</Text>
            <Text className="text-white opacity-90 mb-4">
              Trackea tus suplementos y su efectividad
            </Text>
            <View className="flex-row items-center gap-4">
              <View className="flex-row items-center">
                <Ionicons name="medical" size={20} color="white" />
                <Text className="text-white ml-2">{totalSupplements} activos</Text>
              </View>
              {avgEffectiveness > 0 && (
                <View className="flex-row items-center">
                  <Ionicons name="star" size={20} color="white" />
                  <Text className="text-white ml-2">{avgEffectiveness}/5 avg</Text>
                </View>
              )}
            </View>
          </View>

          {/* Stats */}
          <View className="flex-row gap-3 mb-6">
            <View className="flex-1 bg-zinc-900 rounded-xl p-4 border border-zinc-800">
              <Text className="text-zinc-400 text-xs mb-1">Total Stack</Text>
              <Text className="text-white font-bold text-2xl">{totalSupplements}</Text>
            </View>
            <View className="flex-1 bg-zinc-900 rounded-xl p-4 border border-zinc-800">
              <Text className="text-zinc-400 text-xs mb-1">Efectividad</Text>
              <Text className="text-emerald-400 font-bold text-2xl">
                {avgEffectiveness > 0 ? `${avgEffectiveness}/5` : '-'}
              </Text>
            </View>
          </View>

          {/* Category Filter */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6">
            <View className="flex-row gap-2">
              {categories.map((cat) => (
                <TouchableOpacity
                  key={cat.key}
                  onPress={() => setSelectedCategory(cat.key)}
                  className={`rounded-xl px-4 py-2 flex-row items-center ${
                    selectedCategory === cat.key
                      ? `bg-${cat.color}-500`
                      : 'bg-zinc-900 border border-zinc-800'
                  }`}
                >
                  <Ionicons
                    name={cat.icon as any}
                    size={18}
                    color={selectedCategory === cat.key ? 'white' : '#71717A'}
                  />
                  <Text className={`ml-2 font-bold ${selectedCategory === cat.key ? 'text-white' : 'text-zinc-400'}`}>
                    {cat.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          {/* Supplements List */}
          {filteredStack.length === 0 ? (
            <View className="bg-zinc-900 rounded-xl p-8 border border-zinc-800 items-center">
              <Ionicons name="medical-outline" size={64} color="#52525B" />
              <Text className="text-zinc-400 text-center mt-4 mb-4">
                No hay suplementos en esta categoría
              </Text>
              <TouchableOpacity
                onPress={() => setShowAddForm(true)}
                className="bg-emerald-500 rounded-lg px-6 py-3"
              >
                <Text className="text-white font-bold">Agregar Suplemento</Text>
              </TouchableOpacity>
            </View>
          ) : (
            filteredStack.map((supplement) => {
              const color = getCategoryColor(supplement.category);
              const icon = getCategoryIcon(supplement.category);

              return (
                <View 
                  key={supplement.id} 
                  className={`rounded-xl p-5 mb-4 ${
                    supplement.isActive 
                      ? `bg-${color}-500/10 border border-${color}-500/30` 
                      : 'bg-zinc-900 border border-zinc-800 opacity-50'
                  }`}
                >
                  {/* Header */}
                  <View className="flex-row items-start justify-between mb-3">
                    <View className="flex-row items-start flex-1">
                      <View className={`w-12 h-12 bg-${color}-500 rounded-xl items-center justify-center mr-3`}>
                        <Ionicons name={icon as any} size={24} color="white" />
                      </View>
                      <View className="flex-1">
                        <Text className="text-white font-bold text-lg mb-1">{supplement.name}</Text>
                        <Text className="text-zinc-400 text-sm capitalize">{supplement.category}</Text>
                      </View>
                    </View>
                    <TouchableOpacity onPress={() => toggleActive(supplement.id)}>
                      <Ionicons 
                        name={supplement.isActive ? 'checkmark-circle' : 'ellipse-outline'} 
                        size={28} 
                        color={supplement.isActive ? '#10B981' : '#52525B'} 
                      />
                    </TouchableOpacity>
                  </View>

                  {/* Dosage & Timing */}
                  <View className="bg-zinc-800 rounded-lg p-3 mb-3">
                    <View className="flex-row items-center mb-2">
                      <Ionicons name="flask" size={16} color="#10B981" />
                      <Text className="text-emerald-400 font-bold ml-2">
                        {supplement.dosage} {supplement.unit}
                      </Text>
                    </View>
                    <View className="flex-row items-center flex-wrap gap-2">
                      {supplement.timings.map((timing, idx) => (
                        <View key={idx} className={`bg-${color}-500/20 rounded-full px-3 py-1`}>
                          <Text className={`text-${color}-400 text-xs font-bold`}>{timing}</Text>
                        </View>
                      ))}
                    </View>
                  </View>

                  {/* Notes */}
                  {supplement.notes && (
                    <View className="bg-zinc-800 rounded-lg p-3 mb-3">
                      <Text className="text-zinc-400 text-sm">{supplement.notes}</Text>
                    </View>
                  )}

                  {/* Effectiveness Rating */}
                  <View className="mb-3">
                    <Text className="text-zinc-400 text-xs mb-2">Efectividad</Text>
                    <View className="flex-row gap-2">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <TouchableOpacity
                          key={rating}
                          onPress={() => updateEffectiveness(supplement.id, rating)}
                          className={`flex-1 rounded-lg py-2 items-center ${
                            supplement.effectiveness && rating <= supplement.effectiveness
                              ? `bg-${color}-500`
                              : 'bg-zinc-800'
                          }`}
                        >
                          <Ionicons 
                            name="star" 
                            size={16} 
                            color={supplement.effectiveness && rating <= supplement.effectiveness ? 'white' : '#52525B'} 
                          />
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>

                  {/* Actions */}
                  <TouchableOpacity
                    onPress={() => removeSupplement(supplement.id)}
                    className="bg-zinc-800 rounded-lg py-2 flex-row items-center justify-center"
                  >
                    <Ionicons name="trash" size={16} color="#EF4444" />
                    <Text className="text-red-400 font-bold ml-2 text-sm">Eliminar</Text>
                  </TouchableOpacity>
                </View>
              );
            })
          )}

          {/* Tips */}
          <View className="bg-blue-500/10 rounded-xl p-4 border border-blue-500/30 mb-6 mt-2">
            <View className="flex-row items-start">
              <Ionicons name="bulb" size={20} color="#3B82F6" />
              <View className="flex-1 ml-3">
                <Text className="text-blue-400 font-bold mb-2">
                  Tips de Suplementación
                </Text>
                <Text className="text-blue-300 text-sm">
                  • Creatina: 5g diario, cualquier momento{'\n'}
                  • Cafeína: 3-6 mg/kg, 30-60 min pre-workout{'\n'}
                  • Omega-3: con comidas grasas para absorción{'\n'}
                  • Whey: 20-40g post-workout{'\n'}
                  • Vitamina D: mañana con grasas{'\n'}
                  • Magnesio/ZMA: noche para mejor sueño
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
