import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function ExercisesTabScreen() {
  return (
    <ScrollView 
      className="flex-1 bg-gray-50"
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <LinearGradient colors={['#9D12DE', '#7C3AED']} className="px-6 pt-12 pb-8">
        <Text className="text-3xl font-bold text-white mb-2">Ejercicios</Text>
        <Text className="text-primary/50 text-base">
          Biblioteca completa de calistenia
        </Text>
      </LinearGradient>

      <View className="flex-1 items-center justify-center p-6">
        <View className="bg-primary/10 rounded-full p-8 mb-6">
          <Ionicons name="fitness" size={80} color="#9D12DE" />
        </View>
        
        <Text className="text-2xl font-bold text-gray-900 mb-3 text-center">
          40+ Ejercicios Disponibles
        </Text>
        
        <Text className="text-gray-600 text-center mb-8 px-4">
          Desde flexiones bÃ¡sicas hasta planche y front lever.
          Organizado por categorÃ­as y niveles de dificultad.
        </Text>

        <TouchableOpacity
          onPress={() => router.push('/exercises/library')}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={['#9D12DE', '#7C3AED']}
            className="px-8 py-4 rounded-2xl flex-row items-center gap-3"
            style={{ elevation: 3 }}
          >
            <Ionicons name="library" size={24} color="white" />
            <Text className="text-white font-bold text-lg">
              Ver Biblioteca
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

