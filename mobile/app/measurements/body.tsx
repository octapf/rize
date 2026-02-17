import React, { useState } from 'react';
import { Text } from '@/components/ui/Text';
import { View, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';;
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface Measurement {
  id: string;
  bodyPart: string;
  value: number;
  date: string;
  unit: 'cm' | 'mm' | '%';
}

interface MeasurementHistory {
  bodyPart: string;
  icon: string;
  measurements: Measurement[];
  currentValue: number;
  change: number;
  unit: string;
}

const MEASUREMENT_HISTORY: MeasurementHistory[] = [
  {
    bodyPart: 'Pecho',
    icon: 'body',
    currentValue: 108,
    change: 3,
    unit: 'cm',
    measurements: [
      { id: '1', bodyPart: 'Pecho', value: 105, date: '2025-01-01', unit: 'cm' },
      { id: '2', bodyPart: 'Pecho', value: 106, date: '2025-01-08', unit: 'cm' },
      { id: '3', bodyPart: 'Pecho', value: 107, date: '2025-01-15', unit: 'cm' },
      { id: '4', bodyPart: 'Pecho', value: 108, date: '2025-01-27', unit: 'cm' },
    ],
  },
  {
    bodyPart: 'Cintura',
    icon: 'ellipse-outline',
    currentValue: 82,
    change: -2,
    unit: 'cm',
    measurements: [
      { id: '1', bodyPart: 'Cintura', value: 84, date: '2025-01-01', unit: 'cm' },
      { id: '2', bodyPart: 'Cintura', value: 83, date: '2025-01-15', unit: 'cm' },
      { id: '3', bodyPart: 'Cintura', value: 82, date: '2025-01-27', unit: 'cm' },
    ],
  },
  {
    bodyPart: 'Brazo Derecho',
    icon: 'bonfire',
    currentValue: 42,
    change: 1.5,
    unit: 'cm',
    measurements: [
      { id: '1', bodyPart: 'Brazo Derecho', value: 40.5, date: '2025-01-01', unit: 'cm' },
      { id: '2', bodyPart: 'Brazo Derecho', value: 41, date: '2025-01-08', unit: 'cm' },
      { id: '3', bodyPart: 'Brazo Derecho', value: 42, date: '2025-01-27', unit: 'cm' },
    ],
  },
  {
    bodyPart: 'Brazo Izquierdo',
    icon: 'bonfire',
    currentValue: 41.5,
    change: 1.5,
    unit: 'cm',
    measurements: [
      { id: '1', bodyPart: 'Brazo Izquierdo', value: 40, date: '2025-01-01', unit: 'cm' },
      { id: '2', bodyPart: 'Brazo Izquierdo', value: 41, date: '2025-01-08', unit: 'cm' },
      { id: '3', bodyPart: 'Brazo Izquierdo', value: 41.5, date: '2025-01-27', unit: 'cm' },
    ],
  },
  {
    bodyPart: 'Muslo Derecho',
    icon: 'fitness',
    currentValue: 62,
    change: 2,
    unit: 'cm',
    measurements: [
      { id: '1', bodyPart: 'Muslo Derecho', value: 60, date: '2025-01-01', unit: 'cm' },
      { id: '2', bodyPart: 'Muslo Derecho', value: 61, date: '2025-01-15', unit: 'cm' },
      { id: '3', bodyPart: 'Muslo Derecho', value: 62, date: '2025-01-27', unit: 'cm' },
    ],
  },
  {
    bodyPart: 'Muslo Izquierdo',
    icon: 'fitness',
    currentValue: 61.5,
    change: 2,
    unit: 'cm',
    measurements: [
      { id: '1', bodyPart: 'Muslo Izquierdo', value: 59.5, date: '2025-01-01', unit: 'cm' },
      { id: '2', bodyPart: 'Muslo Izquierdo', value: 60.5, date: '2025-01-15', unit: 'cm' },
      { id: '3', bodyPart: 'Muslo Izquierdo', value: 61.5, date: '2025-01-27', unit: 'cm' },
    ],
  },
  {
    bodyPart: 'Pantorrilla Derecha',
    icon: 'pulse',
    currentValue: 39,
    change: 0.5,
    unit: 'cm',
    measurements: [
      { id: '1', bodyPart: 'Pantorrilla Derecha', value: 38.5, date: '2025-01-01', unit: 'cm' },
      { id: '2', bodyPart: 'Pantorrilla Derecha', value: 39, date: '2025-01-27', unit: 'cm' },
    ],
  },
];

const CALIPER_SITES = [
  { id: '1', name: 'Tríceps', value: 12, unit: 'mm', icon: 'bonfire' },
  { id: '2', name: 'Subescapular', value: 18, unit: 'mm', icon: 'body' },
  { id: '3', name: 'Suprailiaco', value: 22, unit: 'mm', icon: 'analytics' },
  { id: '4', name: 'Abdominal', value: 24, unit: 'mm', icon: 'ellipse-outline' },
  { id: '5', name: 'Muslo', value: 16, unit: 'mm', icon: 'fitness' },
  { id: '6', name: 'Pecho', value: 14, unit: 'mm', icon: 'heart' },
  { id: '7', name: 'Axila', value: 15, unit: 'mm', icon: 'pulse' },
];

export default function BodyMeasurements() {
  const [activeTab, setActiveTab] = useState<'circumferences' | 'caliper' | 'history'>(
    'circumferences'
  );
  const [selectedBodyPart, setSelectedBodyPart] = useState<string | null>(null);

  const tabs = [
    { id: 'circumferences', label: 'Circunferencias', icon: 'ellipse' },
    { id: 'caliper', label: 'Pliegues', icon: 'analytics' },
    { id: 'history', label: 'Historial', icon: 'time' },
  ];

  const addMeasurement = (bodyPart: string) => {
    Alert.alert(
      'Nueva Medición',
      `Ingresa la medición para ${bodyPart}`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Guardar',
          onPress: () => {
            Alert.alert('Guardado', `Medición de ${bodyPart} registrada`);
          },
        },
      ]
    );
  };

  const calculateBodyFat = () => {
    const sum = CALIPER_SITES.reduce((acc, site) => acc + site.value, 0);
    const bodyFat = (sum * 0.29) + 3.5;
    return bodyFat.toFixed(1);
  };

  const viewHistory = (bodyPart: string) => {
    setSelectedBodyPart(bodyPart);
    setActiveTab('history');
  };

  const totalCircumference = MEASUREMENT_HISTORY.reduce(
    (sum, item) => sum + item.currentValue,
    0
  );

  return (
    <View className="flex-1 bg-zinc-950">
      {/* Header */}
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1 ml-3">
            Medidas Corporales
          </Text>
          <TouchableOpacity>
            <Ionicons name="add-circle-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Summary Card */}
        <View className="bg-gradient-to-br from-primary to-[#7D0EBE] rounded-xl p-4 mb-4">
          <View className="flex-row items-center justify-between">
            <View className="flex-1">
              <Text className="text-white/80 text-sm mb-1">Progreso Este Mes</Text>
              <Text className="text-white font-bold text-4xl mb-1">
                +3.2 cm
              </Text>
              <Text className="text-white/80 text-sm">
                Músculo ganado en áreas clave
              </Text>
            </View>
            <View className="bg-white/20 rounded-full p-4">
              <Ionicons name="trending-up" size={32} color="white" />
            </View>
          </View>
        </View>

        {/* Tabs */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row gap-2">
            {tabs.map((tab) => (
              <TouchableOpacity
                key={tab.id}
                onPress={() => setActiveTab(tab.id as any)}
                className={`flex-row items-center px-4 py-2 rounded-lg ${
                  activeTab === tab.id
                    ? 'bg-primary'
                    : 'bg-zinc-900 border border-zinc-800'
                }`}
              >
                <Ionicons
                  name={tab.icon as any}
                  size={18}
                  color={activeTab === tab.id ? 'white' : '#71717A'}
                />
                <Text
                  className={`ml-2 font-semibold text-sm ${
                    activeTab === tab.id ? 'text-white' : 'text-zinc-400'
                  }`}
                >
                  {tab.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Circumferences Tab */}
        {activeTab === 'circumferences' && (
          <View className="px-6 pt-6">
            <Text className="text-white font-bold text-lg mb-3">
              Circunferencias Actuales
            </Text>

            {MEASUREMENT_HISTORY.map((item) => (
              <TouchableOpacity
                key={item.bodyPart}
                onPress={() => viewHistory(item.bodyPart)}
                className="bg-zinc-900 rounded-xl p-4 mb-3 border border-zinc-800"
              >
                <View className="flex-row items-center justify-between mb-3">
                  <View className="flex-row items-center flex-1">
                    <View className="bg-primary/20 w-12 h-12 rounded-full items-center justify-center">
                      <Ionicons name={item.icon as any} size={24} color="#9D12DE" />
                    </View>
                    <View className="ml-3 flex-1">
                      <Text className="text-white font-bold text-base">
                        {item.bodyPart}
                      </Text>
                      <Text className="text-zinc-400 text-sm">
                        {item.measurements.length} mediciones
                      </Text>
                    </View>
                  </View>
                  <View className="items-end">
                    <Text className="text-white font-bold text-2xl">
                      {item.currentValue}
                    </Text>
                    <Text className="text-zinc-400 text-sm">{item.unit}</Text>
                  </View>
                </View>

                <View className="flex-row items-center justify-between">
                  <View
                    className={`flex-row items-center px-3 py-1 rounded-full ${
                      item.change > 0
                        ? 'bg-primary/20'
                        : item.change < 0
                        ? 'bg-red-500/20'
                        : 'bg-zinc-800'
                    }`}
                  >
                    <Ionicons
                      name={
                        item.change > 0
                          ? 'trending-up'
                          : item.change < 0
                          ? 'trending-down'
                          : 'remove'
                      }
                      size={14}
                      color={
                        item.change > 0
                          ? '#9D12DE'
                          : item.change < 0
                          ? '#EF4444'
                          : '#71717A'
                      }
                    />
                    <Text
                      className={`ml-1 text-sm font-bold ${
                        item.change > 0
                          ? 'text-primary'
                          : item.change < 0
                          ? 'text-red-500'
                          : 'text-zinc-400'
                      }`}
                    >
                      {item.change > 0 ? '+' : ''}
                      {item.change} {item.unit}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => addMeasurement(item.bodyPart)}
                    className="bg-primary rounded-lg px-3 py-1"
                  >
                    <Text className="text-white font-bold text-sm">Actualizar</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}

            {/* Total Summary */}
            <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-4">
              <View className="flex-row items-center justify-between">
                <View>
                  <Text className="text-primary/80 text-sm mb-1">
                    Circunferencia Total
                  </Text>
                  <Text className="text-primary/80 font-bold text-3xl">
                    {totalCircumference} cm
                  </Text>
                </View>
                <Ionicons name="stats-chart" size={32} color="#9D12DE" />
              </View>
            </View>
          </View>
        )}

        {/* Caliper Tab */}
        {activeTab === 'caliper' && (
          <View className="px-6 pt-6">
            <View className="bg-gradient-to-br from-amber-500 to-red-500 rounded-xl p-4 mb-4">
              <Text className="text-white/80 text-sm mb-1">% Grasa Corporal</Text>
              <Text className="text-white font-bold text-5xl mb-1">
                {calculateBodyFat()}%
              </Text>
              <Text className="text-white/80 text-sm">
                Calculado por suma de 7 pliegues
              </Text>
            </View>

            <Text className="text-white font-bold text-lg mb-3">
              Sitios de Medición (7 pliegues)
            </Text>

            {CALIPER_SITES.map((site) => (
              <View
                key={site.id}
                className="bg-zinc-900 rounded-xl p-4 mb-3 border border-zinc-800"
              >
                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center flex-1">
                    <View className="bg-amber-500/20 w-12 h-12 rounded-full items-center justify-center">
                      <Ionicons name={site.icon as any} size={24} color="#FFEA00" />
                    </View>
                    <Text className="text-white font-bold text-base ml-3">
                      {site.name}
                    </Text>
                  </View>
                  <View className="flex-row items-center">
                    <Text className="text-white font-bold text-2xl mr-1">
                      {site.value}
                    </Text>
                    <Text className="text-zinc-400 text-sm">{site.unit}</Text>
                  </View>
                </View>
              </View>
            ))}

            <TouchableOpacity className="bg-primary rounded-xl p-4 mb-4">
              <View className="flex-row items-center justify-center">
                <Ionicons name="add-circle" size={20} color="white" />
                <Text className="text-white font-bold ml-2">
                  Nueva Medición Completa
                </Text>
              </View>
            </TouchableOpacity>

            {/* Info Card */}
            <View className="bg-primary/10 rounded-xl p-4 border border-primary/30">
              <View className="flex-row items-start">
                <Ionicons name="information-circle" size={20} color="#9D12DE" />
                <View className="flex-1 ml-3">
                  <Text className="text-primary/80 font-bold mb-2">
                    Protocolo de 7 Pliegues
                  </Text>
                  <Text className="text-primary/60 text-sm">
                    Usa un calibrador de pliegues para medir en los 7 sitios indicados. Realiza 3 mediciones por sitio y usa el promedio.
                  </Text>
                </View>
              </View>
            </View>
          </View>
        )}

        {/* History Tab */}
        {activeTab === 'history' && (
          <View className="px-6 pt-6">
            <Text className="text-white font-bold text-lg mb-3">
              Historial de Mediciones
            </Text>

            {MEASUREMENT_HISTORY.map((item) => (
              <View key={item.bodyPart} className="mb-6">
                <View className="flex-row items-center justify-between mb-3">
                  <View className="flex-row items-center">
                    <Ionicons name={item.icon as any} size={20} color="#9D12DE" />
                    <Text className="text-white font-bold text-base ml-2">
                      {item.bodyPart}
                    </Text>
                  </View>
                  <View
                    className={`flex-row items-center px-3 py-1 rounded-full ${
                      item.change > 0
                        ? 'bg-primary/20'
                        : item.change < 0
                        ? 'bg-red-500/20'
                        : 'bg-zinc-800'
                    }`}
                  >
                    <Ionicons
                      name={item.change > 0 ? 'trending-up' : 'trending-down'}
                      size={14}
                      color={item.change > 0 ? '#9D12DE' : '#EF4444'}
                    />
                    <Text
                      className={`ml-1 text-sm font-bold ${
                        item.change > 0 ? 'text-primary' : 'text-red-500'
                      }`}
                    >
                      {item.change > 0 ? '+' : ''}
                      {item.change} {item.unit}
                    </Text>
                  </View>
                </View>

                {item.measurements.map((measurement, index) => (
                  <View
                    key={measurement.id}
                    className={`bg-zinc-900 rounded-lg p-3 mb-2 border border-zinc-800 ${
                      index === item.measurements.length - 1 ? 'border-primary' : ''
                    }`}
                  >
                    <View className="flex-row items-center justify-between">
                      <View>
                        <Text className="text-white font-bold text-lg">
                          {measurement.value} {measurement.unit}
                        </Text>
                        <Text className="text-zinc-400 text-sm">
                          {new Date(measurement.date).toLocaleDateString('es-ES')}
                        </Text>
                      </View>
                      {index === item.measurements.length - 1 && (
                        <View className="bg-primary/20 px-3 py-1 rounded-full">
                          <Text className="text-primary text-xs font-bold">
                            Actual
                          </Text>
                        </View>
                      )}
                    </View>
                  </View>
                ))}
              </View>
            ))}
          </View>
        )}

        <View className="px-6 pb-6 pt-2">
          <View className="bg-amber-500/10 rounded-xl p-4 border border-amber-500/30">
            <View className="flex-row items-start">
              <Ionicons name="analytics" size={20} color="#FFEA00" />
              <View className="flex-1 ml-3">
                <Text className="text-amber-400 font-bold mb-2">
                  Mide Siempre en las Mismas Condiciones
                </Text>
                <Text className="text-amber-300 text-sm">
                  Para resultados precisos, mide siempre a la misma hora del día, en ayunas, y después de ir al baño.
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}


