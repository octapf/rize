import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  Switch,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface Integration {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  isConnected: boolean;
  category: 'health' | 'wearable' | 'social' | 'productivity';
  features: string[];
}

const INTEGRATIONS: Integration[] = [
  {
    id: 'apple-health',
    name: 'Apple Health',
    description: 'Sincroniza entrenamientos, pasos, calorías y más',
    icon: 'heart',
    color: '#FF0000',
    isConnected: false,
    category: 'health',
    features: [
      'Sincronización automática de workouts',
      'Importar datos de actividad diaria',
      'Exportar métricas de salud',
      'Tracking de frecuencia cardíaca',
    ],
  },
  {
    id: 'google-fit',
    name: 'Google Fit',
    description: 'Conecta con el ecosistema Google Fit',
    icon: 'fitness',
    color: '#4285F4',
    isConnected: false,
    category: 'health',
    features: [
      'Sincronización bidireccional',
      'Datos de actividad en tiempo real',
      'Integración con Google Wear',
      'Historial de entrenamientos',
    ],
  },
  {
    id: 'strava',
    name: 'Strava',
    description: 'Comparte tus entrenamientos con la comunidad',
    icon: 'bicycle',
    color: '#FC4C02',
    isConnected: true,
    category: 'social',
    features: [
      'Publicar workouts automáticamente',
      'Importar actividades de running/cycling',
      'Competir en segmentos',
      'Conectar con amigos',
    ],
  },
  {
    id: 'myfitnesspal',
    name: 'MyFitnessPal',
    description: 'Sincroniza tu dieta y macros',
    icon: 'restaurant',
    color: '#0066CC',
    isConnected: false,
    category: 'health',
    features: [
      'Importar log de comidas',
      'Sincronizar calorías quemadas',
      'Tracking de macros automático',
      'Base de datos de alimentos',
    ],
  },
  {
    id: 'apple-watch',
    name: 'Apple Watch',
    description: 'Control desde tu muñeca',
    icon: 'watch',
    color: '#000000',
    isConnected: false,
    category: 'wearable',
    features: [
      'Ver workouts en tiempo real',
      'Métricas de frecuencia cardíaca',
      'Notificaciones de descanso',
      'Control de reproducción',
    ],
  },
  {
    id: 'fitbit',
    name: 'Fitbit',
    description: 'Integración completa con Fitbit',
    icon: 'footsteps',
    color: '#00B0B9',
    isConnected: false,
    category: 'wearable',
    features: [
      'Sincronizar pasos y actividad',
      'Datos de sueño',
      'Frecuencia cardíaca en reposo',
      'Calorías quemadas',
    ],
  },
  {
    id: 'spotify',
    name: 'Spotify',
    description: 'Música para tus entrenamientos',
    icon: 'musical-notes',
    color: '#1DB954',
    isConnected: true,
    category: 'productivity',
    features: [
      'Playlists de workout',
      'Control de reproducción',
      'Descubrir música motivacional',
      'Sincronizar con BPM',
    ],
  },
  {
    id: 'calendar',
    name: 'Google Calendar',
    description: 'Planifica tus entrenamientos',
    icon: 'calendar',
    color: '#4285F4',
    isConnected: false,
    category: 'productivity',
    features: [
      'Crear eventos de workout automáticamente',
      'Recordatorios personalizados',
      'Sincronizar con calendario personal',
      'Bloques de tiempo dedicados',
    ],
  },
];

export default function Integrations() {
  const [integrations, setIntegrations] = useState(INTEGRATIONS);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'Todas', icon: 'apps' },
    { id: 'health', label: 'Salud', icon: 'heart' },
    { id: 'wearable', label: 'Wearables', icon: 'watch' },
    { id: 'social', label: 'Social', icon: 'people' },
    { id: 'productivity', label: 'Productividad', icon: 'rocket' },
  ];

  const filteredIntegrations =
    selectedCategory === 'all'
      ? integrations
      : integrations.filter((i) => i.category === selectedCategory);

  const connectedCount = integrations.filter((i) => i.isConnected).length;

  const toggleIntegration = (integrationId: string) => {
    const integration = integrations.find((i) => i.id === integrationId);

    if (!integration) return;

    if (integration.isConnected) {
      Alert.alert(
        'Desconectar Integración',
        `¿Estás seguro de desconectar ${integration.name}?`,
        [
          { text: 'Cancelar', style: 'cancel' },
          {
            text: 'Desconectar',
            style: 'destructive',
            onPress: () => {
              setIntegrations((prev) =>
                prev.map((i) =>
                  i.id === integrationId ? { ...i, isConnected: false } : i
                )
              );
              Alert.alert('Desconectado', `${integration.name} ha sido desconectado`);
            },
          },
        ]
      );
    } else {
      Alert.alert(
        'Conectar Integración',
        `Rize necesita permisos para acceder a ${integration.name}`,
        [
          { text: 'Cancelar', style: 'cancel' },
          {
            text: 'Autorizar',
            onPress: () => {
              setIntegrations((prev) =>
                prev.map((i) =>
                  i.id === integrationId ? { ...i, isConnected: true } : i
                )
              );
              Alert.alert(
                '¡Conectado!',
                `${integration.name} se ha conectado correctamente`
              );
            },
          },
        ]
      );
    }
  };

  return (
    <View className="flex-1 bg-zinc-950">
      {/* Header */}
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center justify-between mb-3">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1 ml-3">
            Integraciones
          </Text>
          <TouchableOpacity>
            <Ionicons name="information-circle-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View className="flex-row gap-3">
          <View className="flex-1 bg-zinc-900 rounded-xl p-3 border border-zinc-800">
            <Text className="text-zinc-400 text-xs">Disponibles</Text>
            <Text className="text-white text-2xl font-bold">
              {integrations.length}
            </Text>
          </View>
          <View className="flex-1 bg-zinc-900 rounded-xl p-3 border border-zinc-800">
            <Text className="text-zinc-400 text-xs">Conectadas</Text>
            <Text className="text-primary text-2xl font-bold">
              {connectedCount}
            </Text>
          </View>
        </View>
      </View>

      {/* Category Filters */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="border-b border-zinc-800"
        contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 12 }}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            onPress={() => setSelectedCategory(category.id)}
            className={`mr-3 px-4 py-2 rounded-xl flex-row items-center ${
              selectedCategory === category.id
                ? 'bg-primary'
                : 'bg-zinc-900'
            }`}
          >
            <Ionicons
              name={category.icon as any}
              size={16}
              color={selectedCategory === category.id ? '#FFFFFF' : '#71717A'}
            />
            <Text
              className={`font-semibold ml-2 ${
                selectedCategory === category.id ? 'text-white' : 'text-zinc-400'
              }`}
            >
              {category.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Integrations List */}
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 py-4">
          {filteredIntegrations.map((integration) => (
            <View
              key={integration.id}
              className={`bg-zinc-900 rounded-xl p-4 mb-3 border ${
                integration.isConnected ? 'border-primary/50' : 'border-zinc-800'
              }`}
            >
              {/* Header */}
              <View className="flex-row items-start justify-between mb-3">
                <View className="flex-row items-center flex-1">
                  <View
                    className="w-12 h-12 rounded-xl items-center justify-center mr-3"
                    style={{ backgroundColor: integration.color + '20' }}
                  >
                    <Ionicons
                      name={integration.icon as any}
                      size={24}
                      color={integration.color}
                    />
                  </View>
                  <View className="flex-1">
                    <View className="flex-row items-center">
                      <Text className="text-white font-bold text-lg">
                        {integration.name}
                      </Text>
                      {integration.isConnected && (
                        <View className="ml-2 bg-primary/20 px-2 py-0.5 rounded">
                          <Text className="text-primary text-xs font-bold">
                            Conectado
                          </Text>
                        </View>
                      )}
                    </View>
                    <Text className="text-zinc-400 text-sm mt-1">
                      {integration.description}
                    </Text>
                  </View>
                </View>

                <Switch
                  value={integration.isConnected}
                  onValueChange={() => toggleIntegration(integration.id)}
                  trackColor={{ false: '#3F3F46', true: '#9D12DE80' }}
                  thumbColor={integration.isConnected ? '#9D12DE' : '#f4f3f4'}
                />
              </View>

              {/* Features */}
              {integration.isConnected && (
                <View className="pt-3 border-t border-zinc-800">
                  <Text className="text-zinc-400 text-xs mb-2 font-semibold">
                    Características:
                  </Text>
                  {integration.features.map((feature, index) => (
                    <View key={index} className="flex-row items-center mb-1">
                      <Ionicons name="checkmark-circle" size={14} color="#9D12DE" />
                      <Text className="text-zinc-300 text-sm ml-2 flex-1">
                        {feature}
                      </Text>
                    </View>
                  ))}
                </View>
              )}

              {/* Configure Button */}
              {integration.isConnected && (
                <TouchableOpacity className="mt-3 bg-zinc-800 rounded-lg p-3 flex-row items-center justify-center">
                  <Ionicons name="settings-outline" size={18} color="white" />
                  <Text className="text-white font-semibold ml-2">
                    Configurar
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Info Banner */}
      <View className="px-6 pb-6">
        <View className="bg-primary/10 rounded-xl p-4 border border-primary/30">
          <View className="flex-row items-start">
            <Ionicons name="information-circle" size={24} color="#9D12DE" />
            <View className="flex-1 ml-3">
              <Text className="text-primary/80 font-bold mb-1">
                Sincronización Segura
              </Text>
              <Text className="text-primary/60 text-sm leading-5">
                Todas las integraciones usan OAuth 2.0 y nunca almacenamos tus
                credenciales. Puedes revocar el acceso en cualquier momento.
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

