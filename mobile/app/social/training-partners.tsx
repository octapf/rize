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

interface TrainingPartner {
  id: string;
  name: string;
  avatar: string;
  location: string;
  distance: number;
  workoutStyle: string[];
  schedule: string[];
  experience: 'beginner' | 'intermediate' | 'advanced';
  goals: string[];
  mutualFriends?: number;
  isOnline: boolean;
  matchScore: number;
}

export default function TrainingPartners() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterExperience, setFilterExperience] = useState<string>('all');
  const [filterDistance, setFilterDistance] = useState<number>(10);
  const [showFilters, setShowFilters] = useState(false);

  // Mock training partners data
  const partners: TrainingPartner[] = [
    {
      id: '1',
      name: 'Carlos MÃ©ndez',
      avatar: 'ðŸ‹ï¸',
      location: 'Gym Total - Condesa',
      distance: 1.2,
      workoutStyle: ['Powerlifting', 'Strength'],
      schedule: ['Lunes AM', 'MiÃ©rcoles AM', 'Viernes AM'],
      experience: 'advanced',
      goals: ['Aumentar fuerza', 'Competir powerlifting'],
      mutualFriends: 8,
      isOnline: true,
      matchScore: 95,
    },
    {
      id: '2',
      name: 'Ana GarcÃ­a',
      avatar: 'ðŸ’ª',
      location: 'Smart Fit - Roma',
      distance: 2.5,
      workoutStyle: ['Bodybuilding', 'Hypertrophy'],
      schedule: ['Martes PM', 'Jueves PM', 'SÃ¡bado AM'],
      experience: 'intermediate',
      goals: ['Ganar masa muscular', 'DefiniciÃ³n'],
      mutualFriends: 12,
      isOnline: true,
      matchScore: 88,
    },
    {
      id: '3',
      name: 'Luis RodrÃ­guez',
      avatar: 'ðŸ”¥',
      location: 'CrossFit Box - Polanco',
      distance: 3.8,
      workoutStyle: ['CrossFit', 'HIIT'],
      schedule: ['Lunes PM', 'MiÃ©rcoles PM', 'Viernes PM'],
      experience: 'advanced',
      goals: ['Competir CrossFit', 'Mejorar resistencia'],
      mutualFriends: 5,
      isOnline: false,
      matchScore: 82,
    },
    {
      id: '4',
      name: 'MarÃ­a LÃ³pez',
      avatar: 'âš¡',
      location: 'Anytime Fitness - Del Valle',
      distance: 1.8,
      workoutStyle: ['Functional', 'Cardio'],
      schedule: ['Todos los dÃ­as AM'],
      experience: 'beginner',
      goals: ['Perder peso', 'Mejorar salud'],
      mutualFriends: 3,
      isOnline: true,
      matchScore: 76,
    },
    {
      id: '5',
      name: 'Pedro SÃ¡nchez',
      avatar: 'ðŸŽ¯',
      location: 'Sports World - Insurgentes',
      distance: 4.2,
      workoutStyle: ['Calisthenics', 'Mobility'],
      schedule: ['Martes AM', 'Jueves AM', 'Domingo AM'],
      experience: 'intermediate',
      goals: ['Dominar calistenia', 'Flexibilidad'],
      mutualFriends: 7,
      isOnline: false,
      matchScore: 71,
    },
  ];

  const filteredPartners = partners
    .filter(p => {
      if (filterExperience !== 'all' && p.experience !== filterExperience) return false;
      if (p.distance > filterDistance) return false;
      if (searchQuery && !p.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    })
    .sort((a, b) => b.matchScore - a.matchScore);

  const sendPartnerRequest = (partner: TrainingPartner) => {
    Alert.alert(
      'Solicitud Enviada! âœ…',
      `Enviaste solicitud a ${partner.name}\n\nPodrÃ¡n coordinarse cuando acepte tu solicitud.`,
      [{ text: 'OK' }]
    );
  };

  const getExperienceColor = (exp: string) => {
    switch (exp) {
      case 'beginner': return 'emerald';
      case 'intermediate': return 'amber';
      case 'advanced': return 'red';
      default: return 'zinc';
    }
  };

  const getMatchColor = (score: number) => {
    if (score >= 85) return 'emerald';
    if (score >= 70) return 'amber';
    return 'zinc';
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
            Training Partners
          </Text>
          <TouchableOpacity onPress={() => setShowFilters(!showFilters)}>
            <Ionicons name="options" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Search */}
        <View className="flex-row items-center bg-zinc-900 rounded-xl px-4 border border-zinc-800">
          <Ionicons name="search" size={20} color="#71717A" />
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Buscar por nombre..."
            placeholderTextColor="#71717A"
            className="flex-1 text-white py-3 ml-2"
          />
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          {/* Info Banner */}
          <View className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl p-6 mb-6">
            <Text className="text-white text-2xl font-bold mb-2">
              Encuentra Tu Partner Ideal
            </Text>
            <Text className="text-white opacity-90 mb-4">
              Entrena con alguien que comparte tus objetivos y horarios
            </Text>
            <View className="flex-row items-center">
              <Ionicons name="people" size={20} color="white" />
              <Text className="text-white ml-2">{filteredPartners.length} matches cercanos</Text>
            </View>
          </View>

          {/* Filters */}
          {showFilters && (
            <View className="bg-zinc-900 rounded-xl p-4 mb-6 border border-zinc-800">
              <Text className="text-white font-bold mb-3">Filtros</Text>

              {/* Experience Filter */}
              <Text className="text-zinc-400 text-sm mb-2">Nivel de Experiencia</Text>
              <View className="flex-row gap-2 mb-4">
                {['all', 'beginner', 'intermediate', 'advanced'].map((level) => (
                  <TouchableOpacity
                    key={level}
                    onPress={() => setFilterExperience(level)}
                    className={`px-4 py-2 rounded-lg ${
                      filterExperience === level
                        ? 'bg-primary'
                        : 'bg-zinc-800'
                    }`}
                  >
                    <Text className={`text-xs font-bold ${
                      filterExperience === level ? 'text-white' : 'text-zinc-400'
                    }`}>
                      {level === 'all' ? 'Todos' : level}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Distance Filter */}
              <Text className="text-zinc-400 text-sm mb-2">
                Distancia mÃ¡xima: {filterDistance} km
              </Text>
              <View className="flex-row items-center gap-2">
                {[5, 10, 20, 50].map((dist) => (
                  <TouchableOpacity
                    key={dist}
                    onPress={() => setFilterDistance(dist)}
                    className={`flex-1 py-2 rounded-lg ${
                      filterDistance === dist
                        ? 'bg-purple-500'
                        : 'bg-zinc-800'
                    }`}
                  >
                    <Text className={`text-center font-bold ${
                      filterDistance === dist ? 'text-white' : 'text-zinc-400'
                    }`}>
                      {dist}km
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {/* Partners List */}
          {filteredPartners.length === 0 ? (
            <View className="bg-zinc-900 rounded-xl p-8 items-center border border-zinc-800">
              <Ionicons name="people-outline" size={48} color="#71717A" />
              <Text className="text-white font-bold text-lg mt-4">
                Sin resultados
              </Text>
              <Text className="text-zinc-400 text-center mt-2">
                Ajusta los filtros para encontrar mÃ¡s partners
              </Text>
            </View>
          ) : (
            filteredPartners.map((partner) => (
              <View
                key={partner.id}
                className="bg-zinc-900 rounded-xl p-5 mb-4 border border-zinc-800"
              >
                {/* Header */}
                <View className="flex-row items-start mb-4">
                  <View className="w-16 h-16 bg-zinc-800 rounded-full items-center justify-center mr-4">
                    <Text className="text-3xl">{partner.avatar}</Text>
                    {partner.isOnline && (
                      <View className="absolute bottom-0 right-0 w-4 h-4 bg-primary rounded-full border-2 border-zinc-900" />
                    )}
                  </View>

                  <View className="flex-1">
                    <View className="flex-row items-center mb-1">
                      <Text className="text-white font-bold text-lg mr-2">
                        {partner.name}
                      </Text>
                      <View className={`bg-${getMatchColor(partner.matchScore)}-500 rounded-full px-2 py-1`}>
                        <Text className="text-white text-xs font-bold">
                          {partner.matchScore}% match
                        </Text>
                      </View>
                    </View>

                    <View className="flex-row items-center mb-1">
                      <Ionicons name="location" size={14} color="#71717A" />
                      <Text className="text-zinc-400 text-sm ml-1">
                        {partner.location} â€¢ {partner.distance}km
                      </Text>
                    </View>

                    {partner.mutualFriends && partner.mutualFriends > 0 && (
                      <View className="flex-row items-center">
                        <Ionicons name="people" size={14} color="#71717A" />
                        <Text className="text-zinc-400 text-sm ml-1">
                          {partner.mutualFriends} amigos en comÃºn
                        </Text>
                      </View>
                    )}
                  </View>
                </View>

                {/* Experience */}
                <View className="flex-row items-center mb-3">
                  <View className={`bg-${getExperienceColor(partner.experience)}-500 rounded-full px-3 py-1`}>
                    <Text className="text-white text-xs font-bold uppercase">
                      {partner.experience}
                    </Text>
                  </View>
                </View>

                {/* Workout Styles */}
                <View className="mb-3">
                  <Text className="text-zinc-400 text-xs mb-2">Estilo de Entrenamiento</Text>
                  <View className="flex-row flex-wrap gap-2">
                    {partner.workoutStyle.map((style, idx) => (
                      <View key={idx} className="bg-primary/20 rounded-lg px-3 py-1">
                        <Text className="text-primary/80 text-xs font-bold">{style}</Text>
                      </View>
                    ))}
                  </View>
                </View>

                {/* Schedule */}
                <View className="mb-3">
                  <Text className="text-zinc-400 text-xs mb-2">Horarios Disponibles</Text>
                  <View className="flex-row flex-wrap gap-2">
                    {partner.schedule.map((time, idx) => (
                      <View key={idx} className="bg-purple-500/20 rounded-lg px-3 py-1 flex-row items-center">
                        <Ionicons name="time" size={12} color="#A855F7" />
                        <Text className="text-purple-400 text-xs font-bold ml-1">{time}</Text>
                      </View>
                    ))}
                  </View>
                </View>

                {/* Goals */}
                <View className="mb-4">
                  <Text className="text-zinc-400 text-xs mb-2">Objetivos</Text>
                  <View className="flex-row flex-wrap gap-2">
                    {partner.goals.map((goal, idx) => (
                      <View key={idx} className="bg-amber-500/20 rounded-lg px-3 py-1 flex-row items-center">
                        <Ionicons name="flag" size={12} color="#FFEA00" />
                        <Text className="text-amber-400 text-xs font-bold ml-1">{goal}</Text>
                      </View>
                    ))}
                  </View>
                </View>

                {/* Actions */}
                <View className="flex-row gap-2">
                  <TouchableOpacity
                    onPress={() => sendPartnerRequest(partner)}
                    className="flex-1 bg-primary rounded-xl py-3 flex-row items-center justify-center"
                  >
                    <Ionicons name="add-circle" size={20} color="white" />
                    <Text className="text-white font-bold ml-2">Enviar Solicitud</Text>
                  </TouchableOpacity>

                  <TouchableOpacity className="bg-zinc-800 rounded-xl p-3">
                    <Ionicons name="chatbubble" size={20} color="white" />
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}

          {/* Tips */}
          <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-6">
            <View className="flex-row items-start">
              <Ionicons name="information-circle" size={20} color="#9D12DE" />
              <View className="flex-1 ml-3">
                <Text className="text-primary/80 font-bold mb-2">
                  Beneficios de Entrenar en Pareja
                </Text>
                <Text className="text-primary/60 text-sm">
                  â€¢ 95% mÃ¡s consistencia vs entrenar solo{'\n'}
                  â€¢ MotivaciÃ³n y accountability mutuo{'\n'}
                  â€¢ Ayuda tÃ©cnica en ejercicios{'\n'}
                  â€¢ Competencia sana mejora resultados{'\n'}
                  â€¢ Social y mÃ¡s divertido{'\n'}
                  â€¢ Seguridad en levantamientos pesados
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

