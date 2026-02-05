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

interface Supplement {
  id: string;
  name: string;
  brand: string;
  category: 'proteina' | 'pre-workout' | 'vitaminas' | 'creatina' | 'otros';
  dosage: string;
  timing: string;
  quantity: number;
  unit: string;
  daysRemaining: number;
  active: boolean;
  notes?: string;
}

const SUPPLEMENTS: Supplement[] = [
  {
    id: '1',
    name: 'Whey Protein',
    brand: 'Optimum Nutrition',
    category: 'proteina',
    dosage: '30g',
    timing: 'Post-workout',
    quantity: 15,
    unit: 'porciones',
    daysRemaining: 15,
    active: true,
  },
  {
    id: '2',
    name: 'Creatina Monohidrato',
    brand: 'MyProtein',
    category: 'creatina',
    dosage: '5g',
    timing: 'Diario (maÃ±ana)',
    quantity: 45,
    unit: 'porciones',
    daysRemaining: 45,
    active: true,
  },
  {
    id: '3',
    name: 'Pre-Workout',
    brand: 'C4',
    category: 'pre-workout',
    dosage: '1 scoop',
    timing: '30 min pre-workout',
    quantity: 8,
    unit: 'porciones',
    daysRemaining: 16,
    active: true,
    notes: 'Solo dÃ­as de pierna',
  },
  {
    id: '4',
    name: 'MultivitamÃ­nico',
    brand: 'Centrum',
    category: 'vitaminas',
    dosage: '1 tableta',
    timing: 'Con desayuno',
    quantity: 60,
    unit: 'tabletas',
    daysRemaining: 60,
    active: true,
  },
];

export default function SupplementTracker() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: 'Todos', icon: 'apps' },
    { id: 'proteina', label: 'ProteÃ­na', icon: 'fitness' },
    { id: 'pre-workout', label: 'Pre-Workout', icon: 'flash' },
    { id: 'vitaminas', label: 'Vitaminas', icon: 'medkit' },
    { id: 'creatina', label: 'Creatina', icon: 'water' },
    { id: 'otros', label: 'Otros', icon: 'ellipsis-horizontal' },
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'proteina':
        return '#9D12DE';
      case 'pre-workout':
        return '#EF4444';
      case 'vitaminas':
        return '#FFEA00';
      case 'creatina':
        return '#9D12DE';
      case 'otros':
        return '#71717A';
      default:
        return '#71717A';
    }
  };

  const addSupplement = () => {
    Alert.alert(
      'Agregar Suplemento',
      'Ingresa el nombre del suplemento',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Agregar',
          onPress: () => Alert.alert('Â¡Agregado!', 'Suplemento agregado exitosamente'),
        },
      ]
    );
  };

  const logSupplementIntake = (supplement: Supplement) => {
    Alert.alert(
      'Registrar Toma',
      `${supplement.name}\nDosis: ${supplement.dosage}`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Registrar',
          onPress: () => {
            Alert.alert('Â¡Registrado!', `${supplement.name} - ${supplement.dosage}`);
          },
        },
      ]
    );
  };

  const editSupplement = (supplement: Supplement) => {
    Alert.alert(
      supplement.name,
      'Selecciona una acciÃ³n',
      [
        {
          text: 'Actualizar Cantidad',
          onPress: () => Alert.prompt('Cantidad', 'Nueva cantidad:', [
            { text: 'Cancelar', style: 'cancel' },
            { text: 'Guardar', onPress: (value) => Alert.alert('Actualizado', `Nueva cantidad: ${value}`) },
          ]),
        },
        {
          text: 'Editar Horario',
          onPress: () => Alert.alert('Horario', 'FunciÃ³n prÃ³ximamente'),
        },
        {
          text: supplement.active ? 'Desactivar' : 'Activar',
          onPress: () => Alert.alert('Estado Actualizado', `${supplement.name} ${supplement.active ? 'desactivado' : 'activado'}`),
        },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => Alert.alert('Confirmar', 'Â¿Eliminar este suplemento?', [
            { text: 'Cancelar', style: 'cancel' },
            { text: 'Eliminar', style: 'destructive', onPress: () => Alert.alert('Eliminado', 'Suplemento eliminado') },
          ]),
        },
        { text: 'Cancelar', style: 'cancel' },
      ]
    );
  };

  const filteredSupplements = SUPPLEMENTS.filter((supp) => {
    const matchesCategory = selectedCategory === 'all' || supp.category === selectedCategory;
    const matchesSearch = searchQuery === '' || supp.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const activeSupplements = SUPPLEMENTS.filter((s) => s.active).length;
  const lowStock = SUPPLEMENTS.filter((s) => s.daysRemaining <= 10).length;

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
          <TouchableOpacity onPress={addSupplement}>
            <Ionicons name="add-circle" size={24} color="#9D12DE" />
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View className="flex-row gap-3 mb-4">
          <View className="flex-1 bg-zinc-900 rounded-xl p-3 border border-zinc-800">
            <Text className="text-zinc-400 text-xs">Activos</Text>
            <Text className="text-primary text-2xl font-bold">{activeSupplements}</Text>
          </View>
          <View className="flex-1 bg-zinc-900 rounded-xl p-3 border border-zinc-800">
            <Text className="text-zinc-400 text-xs">Stock Bajo</Text>
            <Text className="text-amber-500 text-2xl font-bold">{lowStock}</Text>
          </View>
          <View className="flex-1 bg-zinc-900 rounded-xl p-3 border border-zinc-800">
            <Text className="text-zinc-400 text-xs">Total</Text>
            <Text className="text-white text-2xl font-bold">{SUPPLEMENTS.length}</Text>
          </View>
        </View>

        {/* Search */}
        <View className="bg-zinc-900 rounded-lg p-3 flex-row items-center border border-zinc-800 mb-3">
          <Ionicons name="search" size={20} color="#71717A" />
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Buscar suplementos..."
            placeholderTextColor="#71717A"
            className="flex-1 ml-2 text-white"
          />
          {searchQuery !== '' && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color="#71717A" />
            </TouchableOpacity>
          )}
        </View>

        {/* Category Filter */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row gap-2">
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                onPress={() => setSelectedCategory(category.id)}
                className={`flex-row items-center px-4 py-2 rounded-lg ${
                  selectedCategory === category.id
                    ? 'bg-primary'
                    : 'bg-zinc-900 border border-zinc-800'
                }`}
              >
                <Ionicons
                  name={category.icon as any}
                  size={16}
                  color={selectedCategory === category.id ? 'white' : '#71717A'}
                />
                <Text
                  className={`ml-2 font-semibold text-sm ${
                    selectedCategory === category.id ? 'text-white' : 'text-zinc-400'
                  }`}
                >
                  {category.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-4">
          {/* Low Stock Alert */}
          {lowStock > 0 && (
            <View className="bg-amber-500/10 rounded-xl p-4 mb-4 border border-amber-500/30">
              <View className="flex-row items-start">
                <Ionicons name="warning" size={20} color="#FFEA00" />
                <View className="flex-1 ml-3">
                  <Text className="text-amber-500 font-bold mb-1">
                    Stock Bajo
                  </Text>
                  <Text className="text-amber-300 text-sm">
                    {lowStock} suplemento{lowStock > 1 ? 's' : ''} con menos de 10 dÃ­as restantes
                  </Text>
                </View>
              </View>
            </View>
          )}

          {/* Supplements List */}
          {filteredSupplements.length === 0 ? (
            <View className="bg-zinc-900 rounded-xl p-8 border border-zinc-800 items-center">
              <Ionicons name="flask-outline" size={48} color="#71717A" />
              <Text className="text-zinc-400 font-bold mt-4">
                No se encontraron suplementos
              </Text>
              <Text className="text-zinc-500 text-sm mt-2 text-center">
                Prueba con otros filtros
              </Text>
            </View>
          ) : (
            filteredSupplements.map((supplement) => (
              <TouchableOpacity
                key={supplement.id}
                onPress={() => editSupplement(supplement)}
                className={`bg-zinc-900 rounded-xl p-4 mb-3 border ${
                  supplement.daysRemaining <= 10 ? 'border-amber-500/30' : 'border-zinc-800'
                }`}
              >
                <View className="flex-row items-start justify-between mb-3">
                  <View className="flex-1">
                    <View className="flex-row items-center mb-2">
                      <View
                        className="w-10 h-10 rounded-full items-center justify-center"
                        style={{ backgroundColor: getCategoryColor(supplement.category) + '20' }}
                      >
                        <Ionicons
                          name="flask"
                          size={20}
                          color={getCategoryColor(supplement.category)}
                        />
                      </View>
                      <View className="ml-3 flex-1">
                        <Text className="text-white font-bold">{supplement.name}</Text>
                        <Text className="text-zinc-400 text-sm">{supplement.brand}</Text>
                      </View>
                    </View>
                  </View>
                  <View
                    className={`px-3 py-1 rounded-full ${
                      supplement.active ? 'bg-primary/20' : 'bg-zinc-800'
                    }`}
                  >
                    <Text
                      className={`text-xs font-bold ${
                        supplement.active ? 'text-primary' : 'text-zinc-500'
                      }`}
                    >
                      {supplement.active ? 'ACTIVO' : 'PAUSADO'}
                    </Text>
                  </View>
                </View>

                <View className="bg-zinc-800 rounded-lg p-3 mb-2">
                  <View className="flex-row items-center justify-between mb-2">
                    <View className="flex-1">
                      <Text className="text-zinc-400 text-xs">Dosis</Text>
                      <Text className="text-white font-semibold">{supplement.dosage}</Text>
                    </View>
                    <View className="flex-1">
                      <Text className="text-zinc-400 text-xs">Horario</Text>
                      <Text className="text-white font-semibold text-sm">{supplement.timing}</Text>
                    </View>
                  </View>
                </View>

                <View className="flex-row items-center justify-between mb-2">
                  <Text className="text-zinc-400 text-sm">Stock Restante</Text>
                  <Text className={`font-bold ${supplement.daysRemaining <= 10 ? 'text-amber-500' : 'text-white'}`}>
                    {supplement.quantity} {supplement.unit}
                  </Text>
                </View>

                <View className="bg-zinc-800 h-1.5 rounded-full overflow-hidden mb-2">
                  <View
                    className="h-full rounded-full"
                    style={{
                      width: `${Math.min((supplement.daysRemaining / 60) * 100, 100)}%`,
                      backgroundColor: supplement.daysRemaining <= 10 ? '#FFEA00' : '#9D12DE',
                    }}
                  />
                </View>

                <View className="flex-row items-center justify-between">
                  <Text className="text-zinc-500 text-xs">
                    ~{supplement.daysRemaining} dÃ­as restantes
                  </Text>
                  <TouchableOpacity
                    onPress={() => logSupplementIntake(supplement)}
                    className="bg-primary rounded-lg px-4 py-2"
                  >
                    <Text className="text-white font-semibold text-sm">Registrar Toma</Text>
                  </TouchableOpacity>
                </View>

                {supplement.notes && (
                  <View className="bg-primary/10 rounded-lg p-2 mt-2">
                    <Text className="text-primary/80 text-xs">ðŸ’¡ {supplement.notes}</Text>
                  </View>
                )}
              </TouchableOpacity>
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
}

