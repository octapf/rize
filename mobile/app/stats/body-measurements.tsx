import React, { useState } from 'react';
import { Text } from '@/components/ui/Text';
import { View, TouchableOpacity, ScrollView, TextInput } from 'react-native';;
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface Measurement {
  id: string;
  bodyPart: string;
  value: number;
  unit: string;
  date: Date;
  icon: string;
  color: string;
}

interface MeasurementCategory {
  category: string;
  measurements: Measurement[];
}

const MEASUREMENT_DATA: MeasurementCategory[] = [
  {
    category: 'Peso y Composición',
    measurements: [
      {
        id: '1',
        bodyPart: 'Peso Corporal',
        value: 75.5,
        unit: 'kg',
        date: new Date('2024-01-20'),
        icon: 'barbell',
        color: '#9D12DE',
      },
      {
        id: '2',
        bodyPart: 'Grasa Corporal',
        value: 14.2,
        unit: '%',
        date: new Date('2024-01-20'),
        icon: 'analytics',
        color: '#FFEA00',
      },
      {
        id: '3',
        bodyPart: 'Masa Muscular',
        value: 64.8,
        unit: 'kg',
        date: new Date('2024-01-20'),
        icon: 'fitness',
        color: '#EF4444',
      },
    ],
  },
  {
    category: 'Tren Superior',
    measurements: [
      {
        id: '4',
        bodyPart: 'Pecho',
        value: 102,
        unit: 'cm',
        date: new Date('2024-01-20'),
        icon: 'body',
        color: '#9D12DE',
      },
      {
        id: '5',
        bodyPart: 'Bíceps (Derecho)',
        value: 38,
        unit: 'cm',
        date: new Date('2024-01-20'),
        icon: 'hand-right',
        color: '#8B5CF6',
      },
      {
        id: '6',
        bodyPart: 'Bíceps (Izquierdo)',
        value: 37.5,
        unit: 'cm',
        date: new Date('2024-01-20'),
        icon: 'hand-left',
        color: '#8B5CF6',
      },
      {
        id: '7',
        bodyPart: 'Hombros',
        value: 118,
        unit: 'cm',
        date: new Date('2024-01-20'),
        icon: 'person',
        color: '#EC4899',
      },
    ],
  },
  {
    category: 'Core',
    measurements: [
      {
        id: '8',
        bodyPart: 'Cintura',
        value: 82,
        unit: 'cm',
        date: new Date('2024-01-20'),
        icon: 'ellipse',
        color: '#FFEA00',
      },
      {
        id: '9',
        bodyPart: 'Abdomen',
        value: 88,
        unit: 'cm',
        date: new Date('2024-01-20'),
        icon: 'square',
        color: '#9D12DE',
      },
    ],
  },
  {
    category: 'Tren Inferior',
    measurements: [
      {
        id: '10',
        bodyPart: 'Caderas',
        value: 98,
        unit: 'cm',
        date: new Date('2024-01-20'),
        icon: 'layers',
        color: '#EF4444',
      },
      {
        id: '11',
        bodyPart: 'Muslo (Derecho)',
        value: 58,
        unit: 'cm',
        date: new Date('2024-01-20'),
        icon: 'arrow-down',
        color: '#9D12DE',
      },
      {
        id: '12',
        bodyPart: 'Muslo (Izquierdo)',
        value: 57.5,
        unit: 'cm',
        date: new Date('2024-01-20'),
        icon: 'arrow-down',
        color: '#9D12DE',
      },
      {
        id: '13',
        bodyPart: 'Pantorrilla (Derecha)',
        value: 38,
        unit: 'cm',
        date: new Date('2024-01-20'),
        icon: 'walk',
        color: '#8B5CF6',
      },
      {
        id: '14',
        bodyPart: 'Pantorrilla (Izquierda)',
        value: 37.8,
        unit: 'cm',
        date: new Date('2024-01-20'),
        icon: 'walk',
        color: '#8B5CF6',
      },
    ],
  },
];

export default function BodyMeasurements() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategory, setExpandedCategory] = useState<string | null>('Peso y Composición');

  const filteredData = MEASUREMENT_DATA.map((category) => ({
    ...category,
    measurements: category.measurements.filter(
      (m) =>
        m.bodyPart.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter((category) => category.measurements.length > 0);

  const toggleCategory = (category: string) => {
    setExpandedCategory(expandedCategory === category ? null : category);
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
            Medidas Corporales
          </Text>
          <TouchableOpacity>
            <Ionicons name="add-circle" size={28} color="#9D12DE" />
          </TouchableOpacity>
        </View>

        {/* Search */}
        <View className="bg-zinc-900 rounded-xl px-4 py-3 flex-row items-center border border-zinc-800">
          <Ionicons name="search" size={20} color="#71717A" />
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Buscar medidas..."
            placeholderTextColor="#52525B"
            className="flex-1 ml-2 text-white"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color="#71717A" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Stats Summary */}
      <View className="flex-row px-6 py-3 border-b border-zinc-800">
        <View className="flex-1 items-center">
          <Text className="text-white text-2xl font-bold">14</Text>
          <Text className="text-zinc-400 text-xs">Medidas</Text>
        </View>
        <View className="flex-1 items-center border-l border-zinc-800">
          <Text className="text-primary text-2xl font-bold">+2.5</Text>
          <Text className="text-zinc-400 text-xs">Cambio (%)</Text>
        </View>
        <View className="flex-1 items-center border-l border-zinc-800">
          <Text className="text-white text-2xl font-bold">20</Text>
          <Text className="text-zinc-400 text-xs">Enero</Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 py-4">
          {filteredData.map((category) => (
            <View key={category.category} className="mb-4">
              {/* Category Header */}
              <TouchableOpacity
                onPress={() => toggleCategory(category.category)}
                className="flex-row items-center justify-between mb-3"
              >
                <Text className="text-white font-bold text-lg">
                  {category.category}
                </Text>
                <View className="flex-row items-center">
                  <Text className="text-zinc-500 text-sm mr-2">
                    {category.measurements.length}
                  </Text>
                  <Ionicons
                    name={
                      expandedCategory === category.category
                        ? 'chevron-up'
                        : 'chevron-down'
                    }
                    size={20}
                    color="#71717A"
                  />
                </View>
              </TouchableOpacity>

              {/* Measurements */}
              {expandedCategory === category.category &&
                category.measurements.map((measurement) => (
                  <TouchableOpacity
                    key={measurement.id}
                    className="bg-zinc-900 rounded-xl p-4 mb-2 border border-zinc-800"
                  >
                    <View className="flex-row items-center justify-between mb-2">
                      <View className="flex-row items-center flex-1">
                        <View
                          className="w-10 h-10 rounded-full items-center justify-center mr-3"
                          style={{ backgroundColor: measurement.color + '20' }}
                        >
                          <Ionicons
                            name={measurement.icon as any}
                            size={20}
                            color={measurement.color}
                          />
                        </View>
                        <View className="flex-1">
                          <Text className="text-white font-bold">
                            {measurement.bodyPart}
                          </Text>
                          <Text className="text-zinc-500 text-xs">
                            {format(measurement.date, 'd MMM yyyy', { locale: es })}
                          </Text>
                        </View>
                      </View>

                      <View className="items-end">
                        <Text
                          className="text-2xl font-bold"
                          style={{ color: measurement.color }}
                        >
                          {measurement.value}
                        </Text>
                        <Text className="text-zinc-500 text-xs">
                          {measurement.unit}
                        </Text>
                      </View>
                    </View>

                    {/* Progress Indicator */}
                    <View className="mt-2 pt-2 border-t border-zinc-800 flex-row items-center justify-between">
                      <View className="flex-row items-center">
                        <Ionicons name="trending-up" size={14} color="#9D12DE" />
                        <Text className="text-primary text-xs ml-1 font-semibold">
                          +0.5{measurement.unit} esta semana
                        </Text>
                      </View>
                      <TouchableOpacity>
                        <Ionicons name="create-outline" size={18} color="#71717A" />
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>
                ))}
            </View>
          ))}

          {filteredData.length === 0 && (
            <View className="items-center justify-center py-20">
              <Ionicons name="body-outline" size={64} color="#52525B" />
              <Text className="text-zinc-500 text-lg mt-4">
                No se encontraron medidas
              </Text>
              <Text className="text-zinc-600 text-sm mt-2 text-center">
                Intenta buscar otro término
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Quick Add Button */}
      <View className="absolute bottom-6 right-6">
        <TouchableOpacity className="w-14 h-14 bg-primary rounded-full items-center justify-center shadow-lg">
          <Ionicons name="add" size={32} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

