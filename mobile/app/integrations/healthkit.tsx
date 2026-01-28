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

export default function HealthKitSync() {
  const [syncEnabled, setSyncEnabled] = useState(true);
  const [autoSync, setAutoSync] = useState(true);

  const dataCategories = [
    { key: 'workouts', label: 'Workouts', enabled: true, icon: 'fitness', synced: 1247 },
    { key: 'heart', label: 'Heart Rate', enabled: true, icon: 'heart', synced: 84520 },
    { key: 'steps', label: 'Steps', enabled: true, icon: 'footsteps', synced: 365 },
    { key: 'sleep', label: 'Sleep', enabled: true, icon: 'moon', synced: 92 },
    { key: 'bodyMass', label: 'Body Mass', enabled: true, icon: 'scale', synced: 156 },
    { key: 'bodyFat', label: 'Body Fat %', enabled: false, icon: 'analytics', synced: 0 },
    { key: 'energy', label: 'Active Energy', enabled: true, icon: 'flame', synced: 365 },
    { key: 'hrv', label: 'HRV', enabled: true, icon: 'pulse', synced: 89 },
  ];

  const syncNow = () => {
    Alert.alert('Sincronizando...', 'Importando datos de HealthKit/Google Fit');
  };

  const exportToHealth = () => {
    Alert.alert(
      'Exportar a Health App',
      'Tus workouts se exportarán automáticamente a HealthKit.',
      [{ text: 'OK' }]
    );
  };

  return (
    <View className="flex-1 bg-zinc-950">
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1 ml-3">
            HealthKit Sync
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          <View className="bg-gradient-to-r from-red-500 to-pink-500 rounded-xl p-6 mb-6">
            <Text className="text-white text-2xl font-bold mb-2">Apple HealthKit</Text>
            <Text className="text-white opacity-90 mb-4">
              Sincroniza con la app Salud de iOS
            </Text>
            <View className="flex-row items-center">
              <Ionicons name="heart-circle" size={24} color="white" />
              <Text className="text-white ml-2">
                {dataCategories.filter(d => d.enabled).length} categorías activas
              </Text>
            </View>
          </View>

          <TouchableOpacity
            onPress={() => setSyncEnabled(!syncEnabled)}
            className="bg-zinc-900 rounded-xl p-4 flex-row items-center justify-between mb-4 border border-zinc-800"
          >
            <View className="flex-row items-center flex-1">
              <Ionicons name="sync" size={24} color="#3B82F6" />
              <View className="ml-3 flex-1">
                <Text className="text-white font-bold">Sincronización Activa</Text>
                <Text className="text-zinc-400 text-sm">Importar datos de HealthKit</Text>
              </View>
            </View>
            <View className={`w-12 h-6 rounded-full ${syncEnabled ? 'bg-blue-500' : 'bg-zinc-700'}`}>
              <View className={`w-5 h-5 bg-white rounded-full mt-0.5 ${syncEnabled ? 'ml-6' : 'ml-1'}`} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setAutoSync(!autoSync)}
            className="bg-zinc-900 rounded-xl p-4 flex-row items-center justify-between mb-6 border border-zinc-800"
          >
            <View className="flex-row items-center flex-1">
              <Ionicons name="cloud-upload" size={24} color="#10B981" />
              <View className="ml-3 flex-1">
                <Text className="text-white font-bold">Auto-Sync</Text>
                <Text className="text-zinc-400 text-sm">Exportar workouts automáticamente</Text>
              </View>
            </View>
            <View className={`w-12 h-6 rounded-full ${autoSync ? 'bg-emerald-500' : 'bg-zinc-700'}`}>
              <View className={`w-5 h-5 bg-white rounded-full mt-0.5 ${autoSync ? 'ml-6' : 'ml-1'}`} />
            </View>
          </TouchableOpacity>

          <Text className="text-white font-bold text-lg mb-4">Categorías de Datos</Text>

          {dataCategories.map((category) => (
            <View
              key={category.key}
              className="bg-zinc-900 rounded-xl p-4 mb-3 border border-zinc-800"
            >
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center flex-1">
                  <Ionicons name={category.icon as any} size={24} color={category.enabled ? '#3B82F6' : '#71717A'} />
                  <View className="ml-3 flex-1">
                    <Text className={`font-bold ${category.enabled ? 'text-white' : 'text-zinc-500'}`}>
                      {category.label}
                    </Text>
                    <Text className="text-zinc-400 text-sm">
                      {category.synced} registros sincronizados
                    </Text>
                  </View>
                </View>
                <Ionicons
                  name={category.enabled ? 'checkmark-circle' : 'close-circle'}
                  size={24}
                  color={category.enabled ? '#10B981' : '#71717A'}
                />
              </View>
            </View>
          ))}

          <View className="flex-row gap-3 mb-6 mt-4">
            <TouchableOpacity
              onPress={syncNow}
              className="flex-1 bg-blue-500 rounded-xl p-4 flex-row items-center justify-center"
            >
              <Ionicons name="cloud-download" size={20} color="white" />
              <Text className="text-white font-bold ml-2">Sync Now</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={exportToHealth}
              className="flex-1 bg-emerald-500 rounded-xl p-4 flex-row items-center justify-center"
            >
              <Ionicons name="cloud-upload" size={20} color="white" />
              <Text className="text-white font-bold ml-2">Export</Text>
            </TouchableOpacity>
          </View>

          <View className="bg-blue-500/10 rounded-xl p-4 border border-blue-500/30 mb-6">
            <View className="flex-row items-start">
              <Ionicons name="information-circle" size={20} color="#3B82F6" />
              <View className="flex-1 ml-3">
                <Text className="text-blue-400 font-bold mb-2">Sync Bidireccional</Text>
                <Text className="text-blue-300 text-sm">
                  • Importa datos de HealthKit automáticamente{'\n'}
                  • Exporta workouts a la app Salud{'\n'}
                  • Sincronización en tiempo real{'\n'}
                  • Datos encriptados end-to-end{'\n'}
                  • Compatible con todos los wearables de Apple
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
