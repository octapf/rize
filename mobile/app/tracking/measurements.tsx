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

interface Measurement {
  bodyPart: string;
  current: number;
  previous: number;
  change: number;
  unit: string;
  icon: string;
  color: string;
}

interface MeasurementHistory {
  date: string;
  neck: number;
  shoulders: number;
  chest: number;
  waist: number;
  hips: number;
  bicepL: number;
  bicepR: number;
  forearmL: number;
  forearmR: number;
  thighL: number;
  thighR: number;
  calfL: number;
  calfR: number;
}

export default function BodyMeasurements() {
  const [measurements] = useState<Measurement[]>([
    { bodyPart: 'Cuello', current: 38.5, previous: 39.0, change: -0.5, unit: 'cm', icon: 'ðŸ‘”', color: 'blue' },
    { bodyPart: 'Hombros', current: 118, previous: 116, change: 2.0, unit: 'cm', icon: 'ðŸ’ª', color: 'emerald' },
    { bodyPart: 'Pecho', current: 104, previous: 102, change: 2.0, unit: 'cm', icon: '🫀', color: 'emerald' },
    { bodyPart: 'Cintura', current: 82, previous: 85, change: -3.0, unit: 'cm', icon: '⭕', color: 'emerald' },
    { bodyPart: 'Cadera', current: 98, previous: 99, change: -1.0, unit: 'cm', icon: 'ðŸ‘', color: 'emerald' },
    { bodyPart: 'Bícep Izq', current: 38.5, previous: 37.5, change: 1.0, unit: 'cm', icon: 'ðŸ’ª', color: 'blue' },
    { bodyPart: 'Bícep Der', current: 39.0, previous: 38.0, change: 1.0, unit: 'cm', icon: 'ðŸ’ª', color: 'blue' },
    { bodyPart: 'Antebrazo Izq', current: 29.5, previous: 29.0, change: 0.5, unit: 'cm', icon: '🤜', color: 'amber' },
    { bodyPart: 'Antebrazo Der', current: 30.0, previous: 29.5, change: 0.5, unit: 'cm', icon: '🤛', color: 'amber' },
    { bodyPart: 'Muslo Izq', current: 58, previous: 56, change: 2.0, unit: 'cm', icon: '🦵', color: 'emerald' },
    { bodyPart: 'Muslo Der', current: 58.5, previous: 56.5, change: 2.0, unit: 'cm', icon: '🦵', color: 'emerald' },
    { bodyPart: 'Gemelo Izq', current: 38, previous: 37, change: 1.0, unit: 'cm', icon: '🦿', color: 'blue' },
    { bodyPart: 'Gemelo Der', current: 38.5, previous: 37.5, change: 1.0, unit: 'cm', icon: '🦿', color: 'blue' },
  ]);

  const [history] = useState<MeasurementHistory[]>([
    {
      date: 'Hoy',
      neck: 38.5,
      shoulders: 118,
      chest: 104,
      waist: 82,
      hips: 98,
      bicepL: 38.5,
      bicepR: 39.0,
      forearmL: 29.5,
      forearmR: 30.0,
      thighL: 58,
      thighR: 58.5,
      calfL: 38,
      calfR: 38.5,
    },
    {
      date: 'Hace 2 semanas',
      neck: 39.0,
      shoulders: 116,
      chest: 102,
      waist: 85,
      hips: 99,
      bicepL: 37.5,
      bicepR: 38.0,
      forearmL: 29.0,
      forearmR: 29.5,
      thighL: 56,
      thighR: 56.5,
      calfL: 37,
      calfR: 37.5,
    },
  ]);

  const addMeasurement = () => {
    Alert.alert(
      'Nueva Medición',
      'Función para registrar todas las medidas corporales con fecha',
      [{ text: 'Entendido' }]
    );
  };

  const viewHistory = (bodyPart: string) => {
    Alert.alert(
      `Historial: ${bodyPart}`,
      'Gráfico de evolución en el tiempo',
      [{ text: 'Cerrar' }]
    );
  };

  const getTotalChange = () => {
    const totalGains = measurements
      .filter((m) => m.change > 0 && !m.bodyPart.includes('Cintura') && !m.bodyPart.includes('Cuello'))
      .reduce((sum, m) => sum + m.change, 0);
    const totalLosses = measurements
      .filter((m) => m.change < 0)
      .reduce((sum, m) => sum + Math.abs(m.change), 0);

    return { gains: totalGains, losses: totalLosses };
  };

  const getAsymmetry = () => {
    const bicepDiff = Math.abs(measurements.find(m => m.bodyPart === 'Bícep Izq')!.current - 
                                measurements.find(m => m.bodyPart === 'Bícep Der')!.current);
    const thighDiff = Math.abs(measurements.find(m => m.bodyPart === 'Muslo Izq')!.current - 
                               measurements.find(m => m.bodyPart === 'Muslo Der')!.current);
    const calfDiff = Math.abs(measurements.find(m => m.bodyPart === 'Gemelo Izq')!.current - 
                              measurements.find(m => m.bodyPart === 'Gemelo Der')!.current);

    return { bicep: bicepDiff, thigh: thighDiff, calf: calfDiff };
  };

  const totalChange = getTotalChange();
  const asymmetry = getAsymmetry();

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
            <Ionicons name="stats-chart" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          {/* Summary Cards */}
          <View className="flex-row gap-2 mb-6">
            <View className="flex-1 bg-primary/10 rounded-xl p-3 border border-primary/30">
              <Text className="text-primary text-xs mb-1">GANANCIA</Text>
              <Text className="text-primary font-bold text-xl">+{totalChange.gains.toFixed(1)} cm</Text>
              <Text className="text-primary/80 text-xs">Total músculo</Text>
            </View>
            <View className="flex-1 bg-primary/10 rounded-xl p-3 border border-primary/30">
              <Text className="text-primary/80 text-xs mb-1">PÉRDIDA</Text>
              <Text className="text-primary/80 font-bold text-xl">-{totalChange.losses.toFixed(1)} cm</Text>
              <Text className="text-primary/60 text-xs">Cintura/grasa</Text>
            </View>
          </View>

          {/* Asymmetry Alert */}
          {(asymmetry.bicep > 1 || asymmetry.thigh > 1 || asymmetry.calf > 1) && (
            <View className="bg-amber-500/10 rounded-xl p-4 mb-6 border border-amber-500/30">
              <View className="flex-row items-start">
                <Ionicons name="warning" size={20} color="#FFEA00" />
                <View className="flex-1 ml-3">
                  <Text className="text-amber-400 font-bold mb-2">
                    Asimetrías Detectadas
                  </Text>
                  <View className="space-y-1">
                    {asymmetry.bicep > 0.5 && (
                      <Text className="text-amber-300 text-sm">
                        • Bíceps: {asymmetry.bicep.toFixed(1)} cm diferencia
                      </Text>
                    )}
                    {asymmetry.thigh > 0.5 && (
                      <Text className="text-amber-300 text-sm">
                        • Muslos: {asymmetry.thigh.toFixed(1)} cm diferencia
                      </Text>
                    )}
                    {asymmetry.calf > 0.5 && (
                      <Text className="text-amber-300 text-sm">
                        • Gemelos: {asymmetry.calf.toFixed(1)} cm diferencia
                      </Text>
                    )}
                  </View>
                </View>
              </View>
            </View>
          )}

          {/* Measurements List */}
          <View className="mb-6">
            <Text className="text-white text-lg font-bold mb-3">Medidas Actuales</Text>
            {measurements.map((measurement, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => viewHistory(measurement.bodyPart)}
                className="bg-zinc-900 rounded-xl p-4 mb-3 border border-zinc-800"
                activeOpacity={0.7}
              >
                <View className="flex-row items-center justify-between mb-2">
                  <View className="flex-row items-center flex-1">
                    <Text className="text-3xl mr-3">{measurement.icon}</Text>
                    <View>
                      <Text className="text-white font-bold">{measurement.bodyPart}</Text>
                      <Text className="text-zinc-400 text-xs">
                        Anterior: {measurement.previous} {measurement.unit}
                      </Text>
                    </View>
                  </View>
                  <View className="items-end">
                    <Text className="text-white font-bold text-xl">
                      {measurement.current} {measurement.unit}
                    </Text>
                    <View className="flex-row items-center">
                      <Ionicons
                        name={measurement.change >= 0 ? 'trending-up' : 'trending-down'}
                        size={14}
                        color={measurement.change >= 0 ? '#9D12DE' : '#EF4444'}
                      />
                      <Text
                        className={`text-sm ml-1 ${
                          measurement.change >= 0 ? 'text-primary' : 'text-red-400'
                        }`}
                      >
                        {measurement.change >= 0 ? '+' : ''}{measurement.change} cm
                      </Text>
                    </View>
                  </View>
                </View>

                {/* Progress Bar */}
                <View className="bg-zinc-800 h-2 rounded-full overflow-hidden">
                  <View
                    className={`h-full ${
                      measurement.change >= 0 ? 'bg-primary' : 'bg-red-500'
                    }`}
                    style={{
                      width: `${Math.min(Math.abs((measurement.change / measurement.previous) * 100), 100)}%`,
                    }}
                  />
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Measurement Guide */}
          <View className="bg-zinc-900 rounded-xl p-6 mb-6 border border-zinc-800">
            <Text className="text-white text-lg font-bold mb-4">Guía de Medición</Text>
            
            <View className="space-y-3">
              <View>
                <Text className="text-primary font-bold mb-1">✓ Mismo horario</Text>
                <Text className="text-zinc-400 text-sm">
                  Mide siempre a la misma hora (ej: mañana en ayunas)
                </Text>
              </View>

              <View>
                <Text className="text-primary font-bold mb-1">✓ Cinta métrica flexible</Text>
                <Text className="text-zinc-400 text-sm">
                  Usa cinta de sastre, no muy apretada ni floja
                </Text>
              </View>

              <View>
                <Text className="text-primary font-bold mb-1">✓ Músculos relajados</Text>
                <Text className="text-zinc-400 text-sm">
                  No flexiones (excepto para medida de bíceps contraído)
                </Text>
              </View>

              <View>
                <Text className="text-primary font-bold mb-1">✓ Frecuencia</Text>
                <Text className="text-zinc-400 text-sm">
                  Mide cada 2-4 semanas para ver progreso real
                </Text>
              </View>
            </View>
          </View>

          {/* Info Card */}
          <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-6">
            <View className="flex-row items-start">
              <Ionicons name="information-circle" size={20} color="#9D12DE" />
              <View className="flex-1 ml-3">
                <Text className="text-primary/80 font-bold mb-2">
                  Medidas vs Peso
                </Text>
                <Text className="text-primary/60 text-sm">
                  Las medidas corporales son más precisas que la báscula. Puedes ganar músculo y perder grasa sin cambiar peso, pero las medidas lo reflejarán.
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Add Measurement Button */}
      <View className="px-6 pb-6 pt-4 border-t border-zinc-800">
        <TouchableOpacity
          onPress={addMeasurement}
          className="bg-primary rounded-xl p-4 flex-row items-center justify-center"
        >
          <Ionicons name="add-circle" size={20} color="white" />
          <Text className="text-white font-bold ml-2">Registrar Nueva Medición</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}


