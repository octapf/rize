import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  TextInput,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface Gym {
  id: string;
  name: string;
  distance: number;
  rating: number;
  reviews: number;
  priceRange: '$' | '$$' | '$$$';
  hours: string;
  isOpen: boolean;
  equipment: string[];
  amenities: string[];
  address: string;
  phone: string;
  image: string;
}

const GYMS: Gym[] = [
  {
    id: '1',
    name: 'PowerHouse Gym',
    distance: 0.8,
    rating: 4.8,
    reviews: 342,
    priceRange: '$$',
    hours: '5:00 - 23:00',
    isOpen: true,
    equipment: ['Squat Racks', 'Bench Press', 'Cables', 'Dumbbells', 'Cardio', 'Kettlebells'],
    amenities: ['Vestuarios', 'Duchas', 'Wifi', 'Estacionamiento', 'Personal Training'],
    address: 'Av. Principal 123, Col. Centro',
    phone: '+52 55 1234 5678',
    image: '🏋️',
  },
  {
    id: '2',
    name: 'FitZone 24/7',
    distance: 1.2,
    rating: 4.6,
    reviews: 218,
    priceRange: '$$$',
    hours: 'Abierto 24 horas',
    isOpen: true,
    equipment: ['Squat Racks', 'Bench Press', 'Cables', 'Dumbbells', 'Cardio', 'Functional Area'],
    amenities: ['Vestuarios', 'Duchas', 'Sauna', 'Wifi', 'Clases grupales', 'Estacionamiento'],
    address: 'Blvd. Reforma 456, Piso 2',
    phone: '+52 55 8765 4321',
    image: '💪',
  },
  {
    id: '3',
    name: 'Iron Temple',
    distance: 2.1,
    rating: 4.9,
    reviews: 156,
    priceRange: '$$',
    hours: '6:00 - 22:00',
    isOpen: true,
    equipment: ['Squat Racks', 'Bench Press', 'Deadlift Platform', 'Dumbbells', 'Barbells', 'Specialty Bars'],
    amenities: ['Vestuarios', 'Taquillas', 'Wifi', 'Powerlifting focused'],
    address: 'Calle Guerrero 789',
    phone: '+52 55 2345 6789',
    image: '⚡',
  },
  {
    id: '4',
    name: 'CrossFit Box Central',
    distance: 1.5,
    rating: 4.7,
    reviews: 98,
    priceRange: '$$$',
    hours: '5:00 - 21:00',
    isOpen: true,
    equipment: ['Squat Racks', 'Bumper Plates', 'Kettlebells', 'Rowers', 'Boxes', 'Ropes'],
    amenities: ['Vestuarios', 'Duchas', 'Clases', 'Open Gym', 'Programming'],
    address: 'Zona Industrial 321',
    phone: '+52 55 3456 7890',
    image: '🔥',
  },
  {
    id: '5',
    name: 'Anytime Fitness',
    distance: 0.5,
    rating: 4.5,
    reviews: 412,
    priceRange: '$$',
    hours: 'Abierto 24 horas',
    isOpen: true,
    equipment: ['Squat Racks', 'Bench Press', 'Cables', 'Dumbbells', 'Cardio', 'Machines'],
    amenities: ['Vestuarios', 'Duchas', 'Wifi', 'Acceso global', 'App móvil'],
    address: 'Plaza Comercial Norte, Local 12',
    phone: '+52 55 4567 8901',
    image: '🌟',
  },
];

export default function GymFinder() {
  const [gyms] = useState(GYMS);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>([]);

  const equipmentOptions = [
    'Squat Racks',
    'Bench Press',
    'Cables',
    'Dumbbells',
    'Cardio',
    'Kettlebells',
    'Functional Area',
    'Deadlift Platform',
  ];

  const toggleEquipment = (equipment: string) => {
    setSelectedEquipment((prev) =>
      prev.includes(equipment)
        ? prev.filter((e) => e !== equipment)
        : [...prev, equipment]
    );
  };

  const filteredGyms = gyms.filter((gym) => {
    const matchesSearch =
      searchQuery === '' ||
      gym.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesEquipment =
      selectedEquipment.length === 0 ||
      selectedEquipment.every((eq) => gym.equipment.includes(eq));
    return matchesSearch && matchesEquipment;
  });

  const viewGymDetails = (gym: Gym) => {
    Alert.alert(
      gym.name,
      `${gym.address}\n\nTeléfono: ${gym.phone}\n\nHorario: ${gym.hours}\n\nEquipo: ${gym.equipment.join(', ')}\n\nAmenidades: ${gym.amenities.join(', ')}`,
      [
        { text: 'Cerrar' },
        { text: 'Llamar', onPress: () => Alert.alert('Llamando...') },
        { text: 'Direcciones', onPress: () => Alert.alert('Abriendo Maps...') },
      ]
    );
  };

  const saveGym = (gymId: string, gymName: string) => {
    Alert.alert('Guardado', `${gymName} añadido a favoritos`);
  };

  return (
    <View className="flex-1 bg-zinc-950">
      {/* Header */}
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1 ml-3">
            Buscar Gimnasios
          </Text>
          <TouchableOpacity onPress={() => setFilterOpen(!filterOpen)}>
            <Ionicons name="options" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View className="bg-zinc-900 rounded-xl px-4 py-3 flex-row items-center border border-zinc-800">
          <Ionicons name="search" size={20} color="#71717A" />
          <TextInput
            className="flex-1 ml-3 text-white"
            placeholder="Buscar gimnasios..."
            placeholderTextColor="#71717A"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery !== '' && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color="#71717A" />
            </TouchableOpacity>
          )}
        </View>

        {/* Equipment Filters */}
        {filterOpen && (
          <View className="mt-3 bg-zinc-900 rounded-xl p-4 border border-zinc-800">
            <Text className="text-white font-bold mb-3">Equipo Necesario</Text>
            <View className="flex-row flex-wrap gap-2">
              {equipmentOptions.map((equipment) => (
                <TouchableOpacity
                  key={equipment}
                  onPress={() => toggleEquipment(equipment)}
                  className={`px-3 py-2 rounded-lg ${
                    selectedEquipment.includes(equipment)
                      ? 'bg-emerald-500'
                      : 'bg-zinc-800'
                  }`}
                >
                  <Text
                    className={`text-sm ${
                      selectedEquipment.includes(equipment)
                        ? 'text-white font-bold'
                        : 'text-zinc-400'
                    }`}
                  >
                    {equipment}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            {selectedEquipment.length > 0 && (
              <TouchableOpacity
                onPress={() => setSelectedEquipment([])}
                className="mt-3 items-center"
              >
                <Text className="text-red-400 text-sm">Limpiar filtros</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          {/* Results Count */}
          <Text className="text-zinc-400 text-sm mb-4">
            {filteredGyms.length} gimnasio{filteredGyms.length !== 1 ? 's' : ''} encontrado{filteredGyms.length !== 1 ? 's' : ''}
          </Text>

          {/* Gyms List */}
          {filteredGyms.map((gym) => (
            <TouchableOpacity
              key={gym.id}
              onPress={() => viewGymDetails(gym)}
              activeOpacity={0.7}
              className="bg-zinc-900 rounded-xl p-4 mb-4 border border-zinc-800"
            >
              {/* Header */}
              <View className="flex-row items-start justify-between mb-3">
                <View className="flex-row items-start flex-1">
                  <View className="w-16 h-16 bg-emerald-500 rounded-xl items-center justify-center mr-3">
                    <Text className="text-4xl">{gym.image}</Text>
                  </View>
                  <View className="flex-1">
                    <Text className="text-white font-bold text-lg mb-1">{gym.name}</Text>
                    <View className="flex-row items-center mb-1">
                      <Ionicons name="location" size={12} color="#71717A" />
                      <Text className="text-zinc-400 text-xs ml-1">
                        {gym.distance} km · {gym.priceRange}
                      </Text>
                    </View>
                    <View className="flex-row items-center">
                      <Ionicons name="star" size={12} color="#F59E0B" />
                      <Text className="text-amber-400 text-xs ml-1 font-bold">
                        {gym.rating}
                      </Text>
                      <Text className="text-zinc-400 text-xs ml-1">
                        ({gym.reviews} reseñas)
                      </Text>
                    </View>
                  </View>
                </View>
                <TouchableOpacity onPress={() => saveGym(gym.id, gym.name)}>
                  <Ionicons name="heart-outline" size={24} color="#71717A" />
                </TouchableOpacity>
              </View>

              {/* Hours */}
              <View className="flex-row items-center mb-3">
                <View
                  className={`px-2 py-1 rounded-lg ${
                    gym.isOpen
                      ? 'bg-emerald-500/10 border border-emerald-500/30'
                      : 'bg-red-500/10 border border-red-500/30'
                  }`}
                >
                  <Text
                    className={`text-xs font-bold ${
                      gym.isOpen ? 'text-emerald-400' : 'text-red-400'
                    }`}
                  >
                    {gym.isOpen ? 'ABIERTO' : 'CERRADO'}
                  </Text>
                </View>
                <Ionicons name="time" size={14} color="#71717A" className="ml-2" />
                <Text className="text-zinc-400 text-sm ml-1">{gym.hours}</Text>
              </View>

              {/* Equipment */}
              <View className="mb-3">
                <Text className="text-zinc-400 text-xs mb-2">EQUIPO</Text>
                <View className="flex-row flex-wrap gap-1">
                  {gym.equipment.slice(0, 4).map((eq, index) => (
                    <View key={index} className="bg-zinc-800 rounded px-2 py-1">
                      <Text className="text-zinc-300 text-xs">{eq}</Text>
                    </View>
                  ))}
                  {gym.equipment.length > 4 && (
                    <View className="bg-blue-500/10 rounded px-2 py-1">
                      <Text className="text-blue-400 text-xs">
                        +{gym.equipment.length - 4} más
                      </Text>
                    </View>
                  )}
                </View>
              </View>

              {/* Amenities */}
              <View className="mb-3">
                <Text className="text-zinc-400 text-xs mb-2">AMENIDADES</Text>
                <View className="flex-row flex-wrap gap-1">
                  {gym.amenities.map((amenity, index) => (
                    <View key={index} className="flex-row items-center">
                      <Ionicons name="checkmark-circle" size={12} color="#10B981" />
                      <Text className="text-emerald-400 text-xs ml-1">{amenity}</Text>
                    </View>
                  ))}
                </View>
              </View>

              {/* Actions */}
              <View className="flex-row gap-2">
                <TouchableOpacity
                  onPress={() => Alert.alert('Direcciones', `Abriendo mapa a ${gym.name}`)}
                  className="flex-1 bg-blue-500 rounded-lg p-3 flex-row items-center justify-center"
                >
                  <Ionicons name="navigate" size={16} color="white" />
                  <Text className="text-white font-bold ml-2">Ir</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => Alert.alert('Llamar', gym.phone)}
                  className="flex-1 bg-emerald-500 rounded-lg p-3 flex-row items-center justify-center"
                >
                  <Ionicons name="call" size={16} color="white" />
                  <Text className="text-white font-bold ml-2">Llamar</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}

          {filteredGyms.length === 0 && (
            <View className="items-center py-12">
              <Ionicons name="search" size={48} color="#71717A" />
              <Text className="text-zinc-400 mt-4">No se encontraron gimnasios</Text>
              <Text className="text-zinc-500 text-sm">
                Intenta ajustar tus filtros
              </Text>
            </View>
          )}
        </View>

        {/* Bottom Tip */}
        <View className="px-6 pb-6 pt-2">
          <View className="bg-blue-500/10 rounded-xl p-4 border border-blue-500/30">
            <View className="flex-row items-start">
              <Ionicons name="information-circle" size={20} color="#3B82F6" />
              <View className="flex-1 ml-3">
                <Text className="text-blue-400 font-bold mb-2">
                  Encuentra tu Gym Ideal
                </Text>
                <Text className="text-blue-300 text-sm">
                  Elige basado en equipo disponible, cercanía y ambiente. Muchos ofrecen pases de prueba gratuitos.
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
