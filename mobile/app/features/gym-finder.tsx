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

export default function GymFinder() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDistance, setFilterDistance] = useState<number>(10);
  const [filterEquipment, setFilterEquipment] = useState<string>('all');

  const equipmentFilters = [
    { key: 'all', label: 'All Gyms' },
    { key: 'powerlifting', label: 'Powerlifting' },
    { key: 'crossfit', label: 'CrossFit' },
    { key: 'bodybuilding', label: 'Bodybuilding' },
  ];

  const distances = [5, 10, 20, 50];

  const gyms = [
    {
      id: '1',
      name: 'Iron Paradise Gym',
      distance: 2.3,
      rating: 4.8,
      reviews: 342,
      equipment: ['Squat Racks', 'Deadlift Platform', 'Heavy Dumbbells'],
      price: 'â‚¬49/mes',
      hours: '24/7',
      type: 'powerlifting',
    },
    {
      id: '2',
      name: 'CrossFit Madrid',
      distance: 3.7,
      rating: 4.9,
      reviews: 187,
      equipment: ['Olympic Lifting', 'Rigs', 'Assault Bikes'],
      price: 'â‚¬89/mes',
      hours: '6:00 - 22:00',
      type: 'crossfit',
    },
    {
      id: '3',
      name: 'Muscle Factory',
      distance: 5.2,
      rating: 4.6,
      reviews: 521,
      equipment: ['Cable Machines', 'Free Weights', 'Cardio'],
      price: 'â‚¬39/mes',
      hours: '6:00 - 23:00',
      type: 'bodybuilding',
    },
    {
      id: '4',
      name: 'Hardcore Lifting',
      distance: 8.1,
      rating: 4.7,
      reviews: 234,
      equipment: ['Competition Equipment', 'Chains', 'Bands'],
      price: 'â‚¬59/mes',
      hours: '5:00 - 24:00',
      type: 'powerlifting',
    },
  ];

  const filteredGyms = gyms.filter((gym) => {
    const matchesSearch = gym.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDistance = gym.distance <= filterDistance;
    const matchesEquipment = filterEquipment === 'all' || gym.type === filterEquipment;
    return matchesSearch && matchesDistance && matchesEquipment;
  });

  const favoriteGym = (gymName: string) => {
    Alert.alert('Favorito', `${gymName} aÃ±adido a favoritos`);
  };

  const getDirections = (gymName: string) => {
    Alert.alert('NavegaciÃ³n', `Abriendo Maps para ${gymName}`);
  };

  return (
    <View className="flex-1 bg-zinc-950">
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1 ml-3">
            Gym Finder
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          <View className="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl p-6 mb-6">
            <Text className="text-white text-2xl font-bold mb-2">Find Your Gym</Text>
            <Text className="text-white opacity-90 mb-4">
              Discover gyms cerca de ti
            </Text>
            <View className="flex-row items-center">
              <Ionicons name="location" size={20} color="white" />
              <Text className="text-white ml-2">{filteredGyms.length} gyms encontrados</Text>
            </View>
          </View>

          <View className="bg-zinc-900 rounded-xl p-4 mb-6 border border-zinc-800">
            <View className="flex-row items-center">
              <Ionicons name="search" size={20} color="#71717a" />
              <TextInput
                placeholder="Buscar gym..."
                placeholderTextColor="#71717a"
                value={searchQuery}
                onChangeText={setSearchQuery}
                className="flex-1 text-white ml-3"
              />
            </View>
          </View>

          <Text className="text-white font-bold mb-3">Distance</Text>
          <View className="flex-row gap-2 mb-6">
            {distances.map((dist) => (
              <TouchableOpacity
                key={dist}
                onPress={() => setFilterDistance(dist)}
                className={`flex-1 ${
                  filterDistance === dist ? 'bg-primary' : 'bg-zinc-900'
                } rounded-xl py-3 border ${
                  filterDistance === dist ? 'border-blue-400' : 'border-zinc-800'
                }`}
              >
                <Text
                  className={`${
                    filterDistance === dist ? 'text-white' : 'text-zinc-400'
                  } font-bold text-center text-sm`}
                >
                  {dist}km
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text className="text-white font-bold mb-3">Equipment Type</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6">
            <View className="flex-row gap-3">
              {equipmentFilters.map((filter) => (
                <TouchableOpacity
                  key={filter.key}
                  onPress={() => setFilterEquipment(filter.key)}
                  className={`${
                    filterEquipment === filter.key ? 'bg-primary' : 'bg-zinc-900'
                  } rounded-xl px-6 py-3 border ${
                    filterEquipment === filter.key ? 'border-blue-400' : 'border-zinc-800'
                  }`}
                >
                  <Text
                    className={`${
                      filterEquipment === filter.key ? 'text-white' : 'text-zinc-400'
                    } font-bold`}
                  >
                    {filter.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          <Text className="text-white font-bold text-lg mb-4">Gyms Near You</Text>

          {filteredGyms.map((gym) => (
            <View key={gym.id} className="bg-zinc-900 rounded-xl p-5 mb-4 border border-zinc-800">
              <View className="flex-row items-start justify-between mb-3">
                <View className="flex-1">
                  <Text className="text-white font-bold text-lg mb-1">{gym.name}</Text>
                  <View className="flex-row items-center mb-2">
                    <Ionicons name="location" size={16} color="#9D12DE" />
                    <Text className="text-primary/80 ml-1 text-sm">{gym.distance} km away</Text>
                  </View>
                  <View className="flex-row items-center">
                    <Ionicons name="star" size={16} color="#FFEA00" />
                    <Text className="text-amber-400 ml-1 font-bold">{gym.rating}</Text>
                    <Text className="text-zinc-500 ml-1 text-sm">({gym.reviews} reviews)</Text>
                  </View>
                </View>
                <TouchableOpacity onPress={() => favoriteGym(gym.name)}>
                  <Ionicons name="heart-outline" size={24} color="#71717a" />
                </TouchableOpacity>
              </View>

              <View className="bg-zinc-800 rounded-lg p-3 mb-3">
                <Text className="text-zinc-400 text-sm mb-2">Equipment:</Text>
                <View className="flex-row flex-wrap gap-2">
                  {gym.equipment.map((eq, idx) => (
                    <View key={idx} className="bg-primary/20 rounded-lg px-3 py-1">
                      <Text className="text-primary/80 text-xs">{eq}</Text>
                    </View>
                  ))}
                </View>
              </View>

              <View className="flex-row items-center justify-between mb-3">
                <View className="flex-row items-center">
                  <Ionicons name="cash" size={16} color="#9D12DE" />
                  <Text className="text-primary ml-1 font-bold">{gym.price}</Text>
                </View>
                <View className="flex-row items-center">
                  <Ionicons name="time" size={16} color="#9D12DE" />
                  <Text className="text-primary/80 ml-1">{gym.hours}</Text>
                </View>
              </View>

              <View className="flex-row gap-2">
                <TouchableOpacity
                  onPress={() => getDirections(gym.name)}
                  className="flex-1 bg-primary rounded-xl py-3 flex-row items-center justify-center"
                >
                  <Ionicons name="navigate" size={18} color="white" />
                  <Text className="text-white font-bold ml-2">Directions</Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex-1 bg-primary rounded-xl py-3 flex-row items-center justify-center">
                  <Ionicons name="call" size={18} color="white" />
                  <Text className="text-white font-bold ml-2">Contact</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}

          <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-6">
            <Text className="text-primary/80 font-bold mb-2">Gym Selection Tips</Text>
            <Text className="text-primary/60 text-sm">
              â€¢ Visita antes de registrarte{'\n'}
              â€¢ Verifica equipamiento disponible{'\n'}
              â€¢ Pregunta por horarios de peak{'\n'}
              â€¢ Lee reviews de otros usuarios{'\n'}
              â€¢ Compara precios y contratos
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

