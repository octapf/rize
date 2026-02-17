import React, { useState } from 'react';
import { Text } from '@/components/ui/Text';
import { View, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';;
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface Template {
  id: string;
  name: string;
  creator: string;
  rating: number;
  reviews: number;
  price: number;
  level: 'principiante' | 'intermedio' | 'avanzado';
  duration: string;
  category: string;
  workouts: number;
  image: string;
  isPremium: boolean;
  isOwned: boolean;
}

const TEMPLATES: Template[] = [
  {
    id: '1',
    name: 'Hipertrofia 5x5',
    creator: 'Carlos Entrenador',
    rating: 4.8,
    reviews: 234,
    price: 0,
    level: 'intermedio',
    duration: '12 semanas',
    category: 'Fuerza',
    workouts: 36,
    image: '💪',
    isPremium: false,
    isOwned: false,
  },
  {
    id: '2',
    name: 'Plan Definición Pro',
    creator: 'Ana Fitness',
    rating: 4.9,
    reviews: 567,
    price: 9.99,
    level: 'avanzado',
    duration: '8 semanas',
    category: 'Definición',
    workouts: 48,
    image: '🔥',
    isPremium: true,
    isOwned: true,
  },
  {
    id: '3',
    name: 'Rutina Full Body',
    creator: 'Luis Coach',
    rating: 4.7,
    reviews: 189,
    price: 0,
    level: 'principiante',
    duration: '6 semanas',
    category: 'General',
    workouts: 18,
    image: '🏋️',
    isPremium: false,
    isOwned: false,
  },
  {
    id: '4',
    name: 'Push/Pull/Legs Premium',
    creator: 'María PT',
    rating: 5.0,
    reviews: 432,
    price: 14.99,
    level: 'intermedio',
    duration: '10 semanas',
    category: 'Hipertrofia',
    workouts: 60,
    image: '?',
    isPremium: true,
    isOwned: false,
  },
  {
    id: '5',
    name: 'Powerlifting Base',
    creator: 'Pedro Strong',
    rating: 4.6,
    reviews: 145,
    price: 4.99,
    level: 'avanzado',
    duration: '16 semanas',
    category: 'Fuerza',
    workouts: 48,
    image: '🏆',
    isPremium: false,
    isOwned: false,
  },
];

export default function MarketplaceRoutines() {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [selectedLevel, setSelectedLevel] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['Todos', 'Fuerza', 'Hipertrofia', 'Definición', 'General'];
  const levels = ['Todos', 'principiante', 'intermedio', 'avanzado'];

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'principiante':
        return '#9D12DE';
      case 'intermedio':
        return '#FFEA00';
      case 'avanzado':
        return '#EF4444';
      default:
        return '#71717A';
    }
  };

  const purchaseTemplate = (template: Template) => {
    if (template.price === 0) {
      Alert.alert(
        'Rutina Gratis',
        '¿Deseas agregar esta rutina a tu biblioteca?',
        [
          { text: 'Cancelar', style: 'cancel' },
          {
            text: 'Agregar',
            onPress: () => Alert.alert('¡Agregado!', 'Rutina disponible en tu biblioteca'),
          },
        ]
      );
    } else {
      Alert.alert(
        'Comprar Rutina',
        `Precio: $${template.price.toFixed(2)}\n\n¿Confirmar compra?`,
        [
          { text: 'Cancelar', style: 'cancel' },
          {
            text: 'Comprar',
            onPress: () =>
              Alert.alert(
                '¡Compra Exitosa!',
                'La rutina está ahora en tu biblioteca'
              ),
          },
        ]
      );
    }
  };

  const shareTemplate = (template: Template) => {
    Alert.alert('Compartir', `Compartir "${template.name}" con amigos`);
  };

  const filteredTemplates = TEMPLATES.filter((template) => {
    const matchesCategory =
      selectedCategory === 'Todos' || template.category === selectedCategory;
    const matchesLevel =
      selectedLevel === 'Todos' || template.level === selectedLevel;
    const matchesSearch =
      searchQuery === '' ||
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.creator.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesLevel && matchesSearch;
  });

  return (
    <View className="flex-1 bg-zinc-950">
      {/* Header */}
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1 ml-3">
            Marketplace
          </Text>
          <TouchableOpacity>
            <Ionicons name="cart-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View className="bg-zinc-900 rounded-lg p-3 flex-row items-center border border-zinc-800">
          <Ionicons name="search" size={20} color="#71717A" />
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Buscar rutinas..."
            placeholderTextColor="#71717A"
            className="flex-1 ml-2 text-white"
          />
          {searchQuery !== '' && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color="#71717A" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Category Filter */}
        <View className="px-6 pt-4">
          <Text className="text-white font-bold mb-3">Categoría</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mb-4"
          >
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                onPress={() => setSelectedCategory(category)}
                className={`mr-2 px-4 py-2 rounded-lg ${
                  selectedCategory === category
                    ? 'bg-primary'
                    : 'bg-zinc-900 border border-zinc-800'
                }`}
              >
                <Text
                  className={`font-semibold ${
                    selectedCategory === category ? 'text-white' : 'text-zinc-400'
                  }`}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Level Filter */}
        <View className="px-6">
          <Text className="text-white font-bold mb-3">Nivel</Text>
          <View className="flex-row gap-2 mb-4">
            {levels.map((level) => (
              <TouchableOpacity
                key={level}
                onPress={() => setSelectedLevel(level)}
                className={`flex-1 px-3 py-2 rounded-lg ${
                  selectedLevel === level
                    ? 'bg-primary'
                    : 'bg-zinc-900 border border-zinc-800'
                }`}
              >
                <Text
                  className={`text-center font-semibold text-sm ${
                    selectedLevel === level ? 'text-white' : 'text-zinc-400'
                  }`}
                >
                  {level === 'Todos'
                    ? 'Todos'
                    : level.charAt(0).toUpperCase() + level.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Results Count */}
        <View className="px-6 mb-3">
          <Text className="text-zinc-400 text-sm">
            {filteredTemplates.length} rutinas encontradas
          </Text>
        </View>

        {/* Templates List */}
        <View className="px-6 pb-6">
          {filteredTemplates.length === 0 ? (
            <View className="bg-zinc-900 rounded-xl p-8 border border-zinc-800 items-center">
              <Ionicons name="fitness-outline" size={48} color="#71717A" />
              <Text className="text-zinc-400 font-bold mt-4 text-center">
                No se encontraron rutinas
              </Text>
              <Text className="text-zinc-500 text-sm mt-2 text-center">
                Prueba con otros filtros
              </Text>
            </View>
          ) : (
            filteredTemplates.map((template) => (
              <View
                key={template.id}
                className="bg-zinc-900 rounded-xl border border-zinc-800 mb-4 overflow-hidden"
              >
                {/* Image Header */}
                <View className="bg-gradient-to-br from-primary to-[#7D0EBE] p-6 items-center">
                  <Text className="text-6xl mb-2">{template.image}</Text>
                  {template.isPremium && (
                    <View className="bg-amber-500 rounded-full px-3 py-1">
                      <Text className="text-white text-xs font-bold">PREMIUM</Text>
                    </View>
                  )}
                </View>

                <View className="p-4">
                  {/* Title & Creator */}
                  <View className="mb-3">
                    <Text className="text-white font-bold text-lg">
                      {template.name}
                    </Text>
                    <Text className="text-zinc-400 text-sm mt-1">
                      Por {template.creator}
                    </Text>
                  </View>

                  {/* Rating */}
                  <View className="flex-row items-center mb-3">
                    <View className="flex-row items-center bg-zinc-800 rounded-lg px-2 py-1">
                      <Ionicons name="star" size={14} color="#FFEA00" />
                      <Text className="text-white font-semibold ml-1 text-sm">
                        {template.rating.toFixed(1)}
                      </Text>
                    </View>
                    <Text className="text-zinc-500 text-sm ml-2">
                      ({template.reviews} reseñas)
                    </Text>
                  </View>

                  {/* Stats */}
                  <View className="flex-row gap-2 mb-3">
                    <View
                      className="px-3 py-1 rounded-lg"
                      style={{
                        backgroundColor: getLevelColor(template.level) + '20',
                      }}
                    >
                      <Text
                        className="text-xs font-bold"
                        style={{ color: getLevelColor(template.level) }}
                      >
                        {template.level.toUpperCase()}
                      </Text>
                    </View>
                    <View className="bg-primary/20 px-3 py-1 rounded-lg">
                      <Text className="text-primary/80 text-xs font-bold">
                        {template.duration}
                      </Text>
                    </View>
                    <View className="bg-purple-500/20 px-3 py-1 rounded-lg">
                      <Text className="text-purple-400 text-xs font-bold">
                        {template.workouts} entrenamientos
                      </Text>
                    </View>
                  </View>

                  {/* Divider */}
                  <View className="h-px bg-zinc-800 my-3" />

                  {/* Price & Actions */}
                  <View className="flex-row items-center justify-between">
                    <View>
                      {template.isOwned ? (
                        <View className="bg-primary/20 px-3 py-2 rounded-lg">
                          <View className="flex-row items-center">
                            <Ionicons name="checkmark-circle" size={16} color="#9D12DE" />
                            <Text className="text-primary font-bold ml-1">
                              En tu biblioteca
                            </Text>
                          </View>
                        </View>
                      ) : (
                        <View>
                          {template.price === 0 ? (
                            <Text className="text-primary font-bold text-xl">
                              GRATIS
                            </Text>
                          ) : (
                            <View>
                              <Text className="text-white font-bold text-2xl">
                                ${template.price.toFixed(2)}
                              </Text>
                              <Text className="text-zinc-500 text-xs">Pago único</Text>
                            </View>
                          )}
                        </View>
                      )}
                    </View>

                    <View className="flex-row gap-2">
                      <TouchableOpacity
                        onPress={() => shareTemplate(template)}
                        className="bg-zinc-800 rounded-lg p-3"
                      >
                        <Ionicons name="share-outline" size={20} color="white" />
                      </TouchableOpacity>
                      {!template.isOwned && (
                        <TouchableOpacity
                          onPress={() => purchaseTemplate(template)}
                          className={`rounded-lg px-6 py-3 ${
                            template.price === 0 ? 'bg-primary' : 'bg-primary'
                          }`}
                        >
                          <Text className="text-white font-semibold">
                            {template.price === 0 ? 'Agregar' : 'Comprar'}
                          </Text>
                        </TouchableOpacity>
                      )}
                      {template.isOwned && (
                        <TouchableOpacity className="bg-primary rounded-lg px-6 py-3">
                          <Text className="text-white font-semibold">Ver Rutina</Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                </View>
              </View>
            ))
          )}
        </View>

        {/* Bottom CTA */}
        <View className="px-6 pb-6">
          <View className="bg-gradient-to-br from-primary to-[#7D0EBE] rounded-xl p-6">
            <View className="flex-row items-center justify-between mb-3">
              <View className="flex-1">
                <Text className="text-white font-bold text-xl mb-2">
                  ¿Eres entrenador?
                </Text>
                <Text className="text-white/80 text-sm">
                  Vende tus rutinas y monetiza tu conocimiento
                </Text>
              </View>
              <Text className="text-4xl">💰</Text>
            </View>
            <TouchableOpacity className="bg-white rounded-lg p-3">
              <Text className="text-primary font-bold text-center">
                Convertirme en Creador
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}


