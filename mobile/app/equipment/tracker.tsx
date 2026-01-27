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

interface Equipment {
  id: string;
  name: string;
  category: 'barras' | 'discos' | 'mancuernas' | 'maquinas' | 'accesorios';
  quantity: number;
  weight?: number;
  inUse: boolean;
  lastUsed?: string;
}

const EQUIPMENT: Equipment[] = [
  { id: '1', name: 'Barra Olímpica', category: 'barras', quantity: 3, weight: 20, inUse: false, lastUsed: '2025-01-20' },
  { id: '2', name: 'Discos 20kg', category: 'discos', quantity: 8, weight: 20, inUse: true },
  { id: '3', name: 'Discos 10kg', category: 'discos', quantity: 8, weight: 10, inUse: false },
  { id: '4', name: 'Discos 5kg', category: 'discos', quantity: 8, weight: 5, inUse: false },
  { id: '5', name: 'Mancuernas 20kg (par)', category: 'mancuernas', quantity: 1, weight: 20, inUse: false, lastUsed: '2025-01-19' },
  { id: '6', name: 'Mancuernas 15kg (par)', category: 'mancuernas', quantity: 1, weight: 15, inUse: true },
  { id: '7', name: 'Rack de Sentadilla', category: 'maquinas', quantity: 1, inUse: false },
  { id: '8', name: 'Banco Plano', category: 'maquinas', quantity: 2, inUse: true },
  { id: '9', name: 'Bandas Elásticas', category: 'accesorios', quantity: 5, inUse: false },
  { id: '10', name: 'Cinturón Lumbar', category: 'accesorios', quantity: 1, inUse: false, lastUsed: '2025-01-21' },
];

export default function EquipmentTracker() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: 'Todo', icon: 'apps' },
    { id: 'barras', label: 'Barras', icon: 'remove' },
    { id: 'discos', label: 'Discos', icon: 'disc' },
    { id: 'mancuernas', label: 'Mancuernas', icon: 'fitness' },
    { id: 'maquinas', label: 'Máquinas', icon: 'hardware-chip' },
    { id: 'accesorios', label: 'Accesorios', icon: 'extension-puzzle' },
  ];

  const addEquipment = () => {
    Alert.alert(
      'Agregar Equipamiento',
      'Ingresa el nombre del equipo',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Agregar',
          onPress: () => Alert.alert('¡Agregado!', 'Equipamiento agregado exitosamente'),
        },
      ]
    );
  };

  const editEquipment = (equipment: Equipment) => {
    Alert.alert(
      equipment.name,
      'Selecciona una acción',
      [
        {
          text: 'Editar Cantidad',
          onPress: () => Alert.prompt('Cantidad', 'Nueva cantidad:', [
            { text: 'Cancelar', style: 'cancel' },
            { text: 'Guardar', onPress: (value) => Alert.alert('Actualizado', `Nueva cantidad: ${value}`) },
          ]),
        },
        {
          text: equipment.inUse ? 'Marcar Disponible' : 'Marcar en Uso',
          onPress: () => Alert.alert('Estado Actualizado', `${equipment.name} ahora está ${equipment.inUse ? 'disponible' : 'en uso'}`),
        },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => Alert.alert('Confirmar', '¿Eliminar este equipo?', [
            { text: 'Cancelar', style: 'cancel' },
            { text: 'Eliminar', style: 'destructive', onPress: () => Alert.alert('Eliminado', 'Equipo eliminado') },
          ]),
        },
        { text: 'Cancelar', style: 'cancel' },
      ]
    );
  };

  const filteredEquipment = EQUIPMENT.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = searchQuery === '' || item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryIcon = (category: string) => {
    const cat = categories.find((c) => c.id === category);
    return cat?.icon || 'help';
  };

  const totalItems = EQUIPMENT.length;
  const inUseItems = EQUIPMENT.filter((e) => e.inUse).length;
  const availableItems = totalItems - inUseItems;

  return (
    <View className="flex-1 bg-zinc-950">
      {/* Header */}
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1 ml-3">
            Inventario
          </Text>
          <TouchableOpacity onPress={addEquipment}>
            <Ionicons name="add-circle" size={24} color="#10B981" />
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View className="flex-row gap-3 mb-4">
          <View className="flex-1 bg-zinc-900 rounded-xl p-3 border border-zinc-800">
            <Text className="text-zinc-400 text-xs">Total</Text>
            <Text className="text-white text-2xl font-bold">{totalItems}</Text>
          </View>
          <View className="flex-1 bg-zinc-900 rounded-xl p-3 border border-zinc-800">
            <Text className="text-zinc-400 text-xs">En Uso</Text>
            <Text className="text-amber-500 text-2xl font-bold">{inUseItems}</Text>
          </View>
          <View className="flex-1 bg-zinc-900 rounded-xl p-3 border border-zinc-800">
            <Text className="text-zinc-400 text-xs">Disponible</Text>
            <Text className="text-emerald-500 text-2xl font-bold">{availableItems}</Text>
          </View>
        </View>

        {/* Search */}
        <View className="bg-zinc-900 rounded-lg p-3 flex-row items-center border border-zinc-800 mb-3">
          <Ionicons name="search" size={20} color="#71717A" />
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Buscar equipamiento..."
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
                    ? 'bg-emerald-500'
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
          {filteredEquipment.length === 0 ? (
            <View className="bg-zinc-900 rounded-xl p-8 border border-zinc-800 items-center">
              <Ionicons name="cube-outline" size={48} color="#71717A" />
              <Text className="text-zinc-400 font-bold mt-4">
                No se encontró equipamiento
              </Text>
              <Text className="text-zinc-500 text-sm mt-2 text-center">
                Prueba con otros filtros
              </Text>
            </View>
          ) : (
            filteredEquipment.map((item) => (
              <TouchableOpacity
                key={item.id}
                onPress={() => editEquipment(item)}
                className={`bg-zinc-900 rounded-xl p-4 mb-3 border ${
                  item.inUse ? 'border-amber-500/30' : 'border-zinc-800'
                }`}
              >
                <View className="flex-row items-center justify-between mb-2">
                  <View className="flex-1">
                    <View className="flex-row items-center mb-2">
                      <View className={`w-10 h-10 rounded-full items-center justify-center ${
                        item.inUse ? 'bg-amber-500/20' : 'bg-emerald-500/20'
                      }`}>
                        <Ionicons
                          name={getCategoryIcon(item.category) as any}
                          size={20}
                          color={item.inUse ? '#F59E0B' : '#10B981'}
                        />
                      </View>
                      <View className="ml-3 flex-1">
                        <Text className="text-white font-bold">{item.name}</Text>
                        <Text className="text-zinc-400 text-sm capitalize">
                          {item.category}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View
                    className={`px-3 py-1 rounded-full ${
                      item.inUse ? 'bg-amber-500/20' : 'bg-emerald-500/20'
                    }`}
                  >
                    <Text
                      className={`text-xs font-bold ${
                        item.inUse ? 'text-amber-500' : 'text-emerald-500'
                      }`}
                    >
                      {item.inUse ? 'EN USO' : 'DISPONIBLE'}
                    </Text>
                  </View>
                </View>

                <View className="flex-row gap-2">
                  <View className="flex-1 bg-zinc-800 rounded-lg p-2">
                    <Text className="text-zinc-400 text-xs">Cantidad</Text>
                    <Text className="text-white font-bold">{item.quantity}</Text>
                  </View>
                  {item.weight && (
                    <View className="flex-1 bg-zinc-800 rounded-lg p-2">
                      <Text className="text-zinc-400 text-xs">Peso</Text>
                      <Text className="text-white font-bold">{item.weight} kg</Text>
                    </View>
                  )}
                  {item.lastUsed && (
                    <View className="flex-1 bg-zinc-800 rounded-lg p-2">
                      <Text className="text-zinc-400 text-xs">Último Uso</Text>
                      <Text className="text-white font-semibold text-sm">{item.lastUsed}</Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            ))
          )}
        </View>

        {/* Maintenance Reminder */}
        <View className="px-6 pb-6 pt-4">
          <View className="bg-blue-500/10 rounded-xl p-4 border border-blue-500/30">
            <View className="flex-row items-start">
              <Ionicons name="construct" size={20} color="#3B82F6" />
              <View className="flex-1 ml-3">
                <Text className="text-blue-400 font-bold mb-2">
                  Recordatorio de Mantenimiento
                </Text>
                <Text className="text-blue-300 text-sm mb-2">
                  • Limpia y lubrica barras cada 3 meses
                </Text>
                <Text className="text-blue-300 text-sm mb-2">
                  • Revisa discos y mancuernas mensualmente
                </Text>
                <Text className="text-blue-300 text-sm">
                  • Inspecciona máquinas y racks semanalmente
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
