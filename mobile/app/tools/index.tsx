import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Card } from '@/components/ui/Card';

export default function ToolsScreen() {
  const tools = [
    {
      id: 'plate-calculator',
      name: 'Calculadora de Discos',
      description: 'Calcula qué discos usar para tu peso objetivo',
      icon: 'calculator',
      color: '#8B5CF6',
      route: '/tools/plate-calculator',
    },
    {
      id: 'one-rep-max',
      name: 'Calculadora 1RM',
      description: 'Estima tu máximo de una repetición',
      icon: 'trending-up',
      color: '#EF4444',
      route: '/tools/one-rep-max',
    },
    {
      id: 'body-fat',
      name: 'Calculadora de Grasa Corporal',
      description: 'Estima tu porcentaje de grasa corporal',
      icon: 'body',
      color: '#9D12DE',
      route: '/tools/body-fat',
    },
    {
      id: 'tdee',
      name: 'Calculadora TDEE',
      description: 'Calcula tus calorías diarias',
      icon: 'flame',
      color: '#FFEA00',
      route: '/tools/tdee',
    },
    {
      id: 'macros',
      name: 'Calculadora de Macros',
      description: 'Planifica tu distribución de macronutrientes',
      icon: 'nutrition',
      color: '#06B6D4',
      route: '/tools/macros',
    },
    {
      id: 'rest-timer',
      name: 'Temporizador de Descanso',
      description: 'Controla tus descansos entre series',
      icon: 'timer',
      color: '#EC4899',
      route: '/timer',
    },
  ];

  const handleToolPress = (route: string) => {
    if ([
      '/tools/plate-calculator',
      '/tools/one-rep-max',
      '/tools/tdee',
      '/tools/body-fat',
      '/tools/macros',
      '/tools/rest-timer'
    ].includes(route)) {
      router.push(route as any);
    } else {
      Alert.alert('Próximamente', 'Esta herramienta estará disponible pronto');
    }
  };

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <LinearGradient colors={['#8B5CF6', '#7C3AED']} className="px-6 pt-12 pb-6">
        <View className="flex-row items-center justify-between">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={28} color="white" />
          </TouchableOpacity>
          <Text className="text-2xl font-bold text-white">Herramientas</Text>
          <View style={{ width: 28 }} />
        </View>
        <Text className="text-purple-100 text-center mt-2">
          Calculadoras y utilidades para tu entrenamiento
        </Text>
      </LinearGradient>

      <ScrollView className="flex-1" contentContainerClassName="p-4">
        <View className="gap-3">
          {tools.map((tool) => (
            <TouchableOpacity
              key={tool.id}
              onPress={() => handleToolPress(tool.route)}
            >
              <Card className="p-4">
                <View className="flex-row items-center gap-4">
                  <View
                    className="w-14 h-14 rounded-2xl items-center justify-center"
                    style={{ backgroundColor: `${tool.color}20` }}
                  >
                    <Ionicons name={tool.icon as any} size={28} color={tool.color} />
                  </View>

                  <View className="flex-1">
                    <Text className="text-gray-900 font-bold text-lg">
                      {tool.name}
                    </Text>
                    <Text className="text-gray-600 text-sm mt-1">
                      {tool.description}
                    </Text>
                  </View>

                  <Ionicons name="chevron-forward" size={24} color="#9CA3AF" />
                </View>
              </Card>
            </TouchableOpacity>
          ))}
        </View>

        {/* Info Card */}
        <Card className="p-4 mt-4 bg-primary/5 border-primary/20">
          <View className="flex-row gap-3">
            <Ionicons name="information-circle" size={24} color="#9D12DE" />
            <View className="flex-1">
              <Text className="text-text font-semibold mb-1">
                Más herramientas próximamente
              </Text>
              <Text className="text-text/70 text-sm">
                Estamos trabajando en más calculadoras y utilidades para mejorar tu experiencia de entrenamiento.
              </Text>
            </View>
          </View>
        </Card>
      </ScrollView>
    </View>
  );
}

