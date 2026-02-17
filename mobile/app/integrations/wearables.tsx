import React, { useState } from 'react';
import { Text } from '@/components/ui/Text';
import { View, TouchableOpacity, ScrollView, TextInput, Alert, Dimensions } from 'react-native';;
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface WearableDevice {
  id: string;
  name: string;
  brand: 'apple' | 'garmin' | 'fitbit' | 'whoop' | 'polar';
  connected: boolean;
  battery?: number;
  lastSync?: string;
  features: string[];
}

interface SyncedMetric {
  id: string;
  name: string;
  value: string;
  icon: string;
  source: string;
  color: string;
}

const DEVICES: WearableDevice[] = [
  {
    id: '1',
    name: 'Apple Watch Series 9',
    brand: 'apple',
    connected: true,
    battery: 78,
    lastSync: 'Hace 5 minutos',
    features: ['Frecuencia Cardíaca', 'HRV', 'Calorías', 'Pasos', 'Sueño', 'Oxígeno'],
  },
  {
    id: '2',
    name: 'Garmin Fenix 7',
    brand: 'garmin',
    connected: false,
    features: ['GPS', 'VO2 Max', 'Estrés', 'Altitud', 'Pasos', 'Sueño'],
  },
  {
    id: '3',
    name: 'Fitbit Charge 6',
    brand: 'fitbit',
    connected: false,
    features: ['Pasos', 'Calorías', 'Sueño', 'Frecuencia Cardíaca', 'SPO2'],
  },
  {
    id: '4',
    name: 'WHOOP 4.0',
    brand: 'whoop',
    connected: false,
    features: ['Strain', 'Recuperación', 'Sueño', 'HRV', 'Frecuencia Cardíaca'],
  },
  {
    id: '5',
    name: 'Polar Vantage V3',
    brand: 'polar',
    connected: false,
    features: ['Running Power', 'Recuperación', 'VO2 Max', 'HRV', 'Sueño'],
  },
];

const SYNCED_METRICS: SyncedMetric[] = [
  {
    id: '1',
    name: 'Frecuencia Cardíaca',
    value: '68 bpm',
    icon: 'pulse',
    source: 'Apple Watch',
    color: '#EF4444',
  },
  {
    id: '2',
    name: 'Pasos Hoy',
    value: '8,452',
    icon: 'walk',
    source: 'Apple Watch',
    color: '#9D12DE',
  },
  {
    id: '3',
    name: 'Calorías Quemadas',
    value: '2,340 kcal',
    icon: 'flame',
    source: 'Apple Watch',
    color: '#FFEA00',
  },
  {
    id: '4',
    name: 'HRV Promedio',
    value: '65 ms',
    icon: 'stats-chart',
    source: 'Apple Watch',
    color: '#9D12DE',
  },
  {
    id: '5',
    name: 'Sueño Anoche',
    value: '7.5 h',
    icon: 'moon',
    source: 'Apple Watch',
    color: '#8B5CF6',
  },
  {
    id: '6',
    name: 'Oxígeno en Sangre',
    value: '98%',
    icon: 'water',
    source: 'Apple Watch',
    color: '#06B6D4',
  },
];

export default function WearableIntegrations() {
  const [syncInProgress, setSyncInProgress] = useState(false);

  const getBrandColor = (brand: string) => {
    switch (brand) {
      case 'apple':
        return '#000000';
      case 'garmin':
        return '#007CC3';
      case 'fitbit':
        return '#00B0B9';
      case 'whoop':
        return '#FF3366';
      case 'polar':
        return '#ED1C24';
      default:
        return '#71717A';
    }
  };

  const getBrandIcon = (brand: string) => {
    switch (brand) {
      case 'apple':
        return 'watch';
      case 'garmin':
      case 'fitbit':
      case 'whoop':
      case 'polar':
        return 'fitness';
      default:
        return 'watch-outline';
    }
  };

  const connectDevice = (device: WearableDevice) => {
    if (device.connected) {
      Alert.alert(
        'Desconectar Dispositivo',
        `¿Deseas desconectar ${device.name}?`,
        [
          { text: 'Cancelar', style: 'cancel' },
          {
            text: 'Desconectar',
            style: 'destructive',
            onPress: () => {
              Alert.alert('Desconectado', `${device.name} ha sido desconectado`);
            },
          },
        ]
      );
    } else {
      Alert.alert(
        'Conectar Dispositivo',
        `Conectando con ${device.name}...\n\nSerás redirigido a la aplicación oficial para autorizar el acceso.`,
        [
          { text: 'Cancelar', style: 'cancel' },
          {
            text: 'Continuar',
            onPress: () => {
              Alert.alert('¡Conectado!', `${device.name} está ahora sincronizado`);
            },
          },
        ]
      );
    }
  };

  const syncNow = () => {
    setSyncInProgress(true);
    setTimeout(() => {
      setSyncInProgress(false);
      Alert.alert('Sincronización Completa', 'Todos los datos estén actualizados');
    }, 2000);
  };

  const connectedDevice = DEVICES.find((d) => d.connected);

  return (
    <View className="flex-1 bg-zinc-950">
      {/* Header */}
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1 ml-3">
            Dispositivos Wearables
          </Text>
          {connectedDevice && (
            <TouchableOpacity
              onPress={syncNow}
              disabled={syncInProgress}
              className={syncInProgress ? 'opacity-50' : ''}
            >
              <Ionicons
                name={syncInProgress ? 'sync' : 'refresh'}
                size={24}
                color="#9D12DE"
              />
            </TouchableOpacity>
          )}
        </View>

        {connectedDevice && (
          <View className="bg-primary/10 rounded-xl p-4 border border-primary/30">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center flex-1">
                <View className="bg-primary/20 rounded-full p-2">
                  <Ionicons name="checkmark-circle" size={20} color="#9D12DE" />
                </View>
                <View className="ml-3 flex-1">
                  <Text className="text-primary font-bold">{connectedDevice.name}</Text>
                  <Text className="text-primary/80/70 text-sm">
                    {connectedDevice.lastSync}
                  </Text>
                </View>
              </View>
              {connectedDevice.battery && (
                <View className="flex-row items-center">
                  <Ionicons
                    name="battery-charging"
                    size={16}
                    color="#9D12DE"
                  />
                  <Text className="text-primary text-sm font-bold ml-1">
                    {connectedDevice.battery}%
                  </Text>
                </View>
              )}
            </View>
          </View>
        )}
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Synced Metrics */}
        {connectedDevice && (
          <View className="px-6 pt-6">
            <Text className="text-white font-bold text-lg mb-3">
              Datos Sincronizados
            </Text>

            <View className="flex-row flex-wrap gap-3 mb-6">
              {SYNCED_METRICS.map((metric) => (
                <View
                  key={metric.id}
                  className="bg-zinc-900 rounded-xl p-4 border border-zinc-800"
                  style={{ width: '47%' }}
                >
                  <View
                    className="w-10 h-10 rounded-full items-center justify-center mb-2"
                    style={{ backgroundColor: metric.color + '20' }}
                  >
                    <Ionicons name={metric.icon as any} size={20} color={metric.color} />
                  </View>
                  <Text className="text-zinc-400 text-xs mb-1">{metric.name}</Text>
                  <Text className="text-white font-bold text-xl mb-1">
                    {metric.value}
                  </Text>
                  <Text className="text-zinc-500 text-xs">{metric.source}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Available Devices */}
        <View className="px-6 pb-6">
          <Text className="text-white font-bold text-lg mb-3">
            Dispositivos Disponibles
          </Text>

          {DEVICES.map((device) => (
            <View
              key={device.id}
              className="bg-zinc-900 rounded-xl p-4 mb-3 border border-zinc-800"
            >
              <View className="flex-row items-start justify-between mb-3">
                <View className="flex-row items-center flex-1">
                  <View
                    className="w-12 h-12 rounded-full items-center justify-center"
                    style={{ backgroundColor: getBrandColor(device.brand) + '20' }}
                  >
                    <Ionicons
                      name={getBrandIcon(device.brand) as any}
                      size={24}
                      color={getBrandColor(device.brand)}
                    />
                  </View>
                  <View className="ml-3 flex-1">
                    <Text className="text-white font-bold mb-1">{device.name}</Text>
                    <Text className="text-zinc-400 text-xs capitalize">{device.brand}</Text>
                  </View>
                </View>
                {device.connected && (
                  <View className="bg-primary/20 px-3 py-1 rounded-full">
                    <Text className="text-primary text-xs font-bold">Conectado</Text>
                  </View>
                )}
              </View>

              {/* Features */}
              <View className="flex-row flex-wrap gap-2 mb-3">
                {device.features.map((feature, index) => (
                  <View
                    key={index}
                    className="bg-zinc-800 px-3 py-1 rounded-full"
                  >
                    <Text className="text-zinc-400 text-xs">{feature}</Text>
                  </View>
                ))}
              </View>

              {/* Action Button */}
              <TouchableOpacity
                onPress={() => connectDevice(device)}
                className={`${
                  device.connected ? 'bg-zinc-800 border border-zinc-700' : 'bg-primary'
                } rounded-lg p-3`}
              >
                <Text
                  className={`${
                    device.connected ? 'text-zinc-300' : 'text-white'
                  } font-bold text-center`}
                >
                  {device.connected ? 'Desconectar' : 'Conectar Dispositivo'}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Info Card */}
        <View className="px-6 pb-6">
          <View className="bg-primary/10 rounded-xl p-4 border border-primary/30">
            <View className="flex-row items-start">
              <Ionicons name="information-circle" size={20} color="#9D12DE" />
              <View className="flex-1 ml-3">
                <Text className="text-primary/80 font-bold mb-2">
                  Sincronización Automática
                </Text>
                <Text className="text-primary/60 text-sm">
                  Los datos se sincronizan automáticamente cada hora cuando el dispositivo está conectado. También puedes forzar una sincronización manual en cualquier momento.
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}


