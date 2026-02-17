import React, { useState } from 'react';
import { Text } from '@/components/ui/Text';
import { View, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';;
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface HeartRateZone {
  zone: number;
  name: string;
  rangeMin: number;
  rangeMax: number;
  percentage: string;
  description: string;
  color: string;
  benefits: string[];
}

export default function CardioZoneCalculator() {
  const [age, setAge] = useState('25');
  const [restingHR, setRestingHR] = useState('60');
  const [method, setMethod] = useState<'simple' | 'karvonen'>('karvonen');
  const [zones, setZones] = useState<HeartRateZone[]>([]);

  const calculateZones = () => {
    const ageNum = parseInt(age);
    const restingNum = parseInt(restingHR);

    if (!ageNum || ageNum < 10 || ageNum > 100) {
      Alert.alert('Error', 'Ingresa una edad válida (10-100)');
      return;
    }

    if (method === 'karvonen' && (!restingNum || restingNum < 30 || restingNum > 100)) {
      Alert.alert('Error', 'Ingresa una FC en reposo válida (30-100)');
      return;
    }

    const maxHR = 220 - ageNum;
    let calculatedZones: HeartRateZone[] = [];

    if (method === 'simple') {
      // Simple percentage method
      calculatedZones = [
        {
          zone: 1,
          name: 'Recuperación',
          rangeMin: Math.round(maxHR * 0.50),
          rangeMax: Math.round(maxHR * 0.60),
          percentage: '50-60%',
          description: 'Recuperación activa, calentamiento',
          color: 'blue',
          benefits: ['Mejora recuperación', 'Quema grasas suave', 'Mejora circulación'],
        },
        {
          zone: 2,
          name: 'Aeróbico Ligero',
          rangeMin: Math.round(maxHR * 0.60),
          rangeMax: Math.round(maxHR * 0.70),
          percentage: '60-70%',
          description: 'Zona de quema de grasas, cardio base',
          color: 'primary',
          benefits: ['Quema grasa óptima', 'Mejora resistencia', 'Metabolismo aeróbico'],
        },
        {
          zone: 3,
          name: 'Aeróbico',
          rangeMin: Math.round(maxHR * 0.70),
          rangeMax: Math.round(maxHR * 0.80),
          percentage: '70-80%',
          description: 'Mejora cardiovascular, resistencia',
          color: 'amber',
          benefits: ['Mejora VO2max', 'Capacidad aeróbica', 'Resistencia muscular'],
        },
        {
          zone: 4,
          name: 'Umbral Anaeróbico',
          rangeMin: Math.round(maxHR * 0.80),
          rangeMax: Math.round(maxHR * 0.90),
          percentage: '80-90%',
          description: 'Alta intensidad, mejora rendimiento',
          color: 'orange',
          benefits: ['Aumenta umbral láctico', 'Mejora velocidad', 'Alta quema calórica'],
        },
        {
          zone: 5,
          name: 'Máximo Esfuerzo',
          rangeMin: Math.round(maxHR * 0.90),
          rangeMax: maxHR,
          percentage: '90-100%',
          description: 'Sprint, HIIT, máxima intensidad',
          color: 'red',
          benefits: ['Máxima potencia', 'VO2max pico', 'Solo intervalos cortos'],
        },
      ];
    } else {
      // Karvonen method (Heart Rate Reserve)
      const hrReserve = maxHR - restingNum;

      calculatedZones = [
        {
          zone: 1,
          name: 'Recuperación',
          rangeMin: Math.round((hrReserve * 0.50) + restingNum),
          rangeMax: Math.round((hrReserve * 0.60) + restingNum),
          percentage: '50-60% HRR',
          description: 'Recuperación activa, calentamiento',
          color: 'blue',
          benefits: ['Mejora recuperación', 'Quema grasas suave', 'Mejora circulación'],
        },
        {
          zone: 2,
          name: 'Aeróbico Ligero',
          rangeMin: Math.round((hrReserve * 0.60) + restingNum),
          rangeMax: Math.round((hrReserve * 0.70) + restingNum),
          percentage: '60-70% HRR',
          description: 'Zona de quema de grasas, cardio base',
          color: 'primary',
          benefits: ['Quema grasa óptima', 'Mejora resistencia', 'Metabolismo aeróbico'],
        },
        {
          zone: 3,
          name: 'Aeróbico',
          rangeMin: Math.round((hrReserve * 0.70) + restingNum),
          rangeMax: Math.round((hrReserve * 0.80) + restingNum),
          percentage: '70-80% HRR',
          description: 'Mejora cardiovascular, resistencia',
          color: 'amber',
          benefits: ['Mejora VO2max', 'Capacidad aeróbica', 'Resistencia muscular'],
        },
        {
          zone: 4,
          name: 'Umbral Anaeróbico',
          rangeMin: Math.round((hrReserve * 0.80) + restingNum),
          rangeMax: Math.round((hrReserve * 0.90) + restingNum),
          percentage: '80-90% HRR',
          description: 'Alta intensidad, mejora rendimiento',
          color: 'orange',
          benefits: ['Aumenta umbral láctico', 'Mejora velocidad', 'Alta quema calórica'],
        },
        {
          zone: 5,
          name: 'Máximo Esfuerzo',
          rangeMin: Math.round((hrReserve * 0.90) + restingNum),
          rangeMax: maxHR,
          percentage: '90-100% HRR',
          description: 'Sprint, HIIT, máxima intensidad',
          color: 'red',
          benefits: ['Máxima potencia', 'VO2max pico', 'Solo intervalos cortos'],
        },
      ];
    }

    setZones(calculatedZones);
  };

  const maxHR = parseInt(age) ? 220 - parseInt(age) : 195;

  return (
    <View className="flex-1 bg-zinc-950">
      {/* Header */}
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1 ml-3">
            Zonas de Cardio
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          {/* Info */}
          <View className="bg-gradient-to-r from-red-500 to-pink-500 rounded-xl p-6 mb-6">
            <Text className="text-white text-2xl font-bold mb-2">Heart Rate Zones</Text>
            <Text className="text-white opacity-90 mb-4">
              Optimiza tu cardio entrenando en la zona correcta
            </Text>
            <View className="flex-row items-center">
              <Ionicons name="heart" size={20} color="white" />
              <Text className="text-white ml-2">FC Máxima estimada: {maxHR} bpm</Text>
            </View>
          </View>

          {/* Method Selection */}
          <Text className="text-white font-bold text-lg mb-4">Método de Cálculo</Text>
          
          <TouchableOpacity
            onPress={() => setMethod('simple')}
            className={`rounded-xl p-4 mb-3 ${
              method === 'simple'
                ? 'bg-primary/10 border-2 border-primary/30'
                : 'bg-zinc-900 border border-zinc-800'
            }`}
          >
            <View className="flex-row items-center justify-between">
              <View className="flex-1">
                <Text className={`font-bold mb-1 ${method === 'simple' ? 'text-white' : 'text-zinc-400'}`}>
                  Método Simple
                </Text>
                <Text className="text-zinc-500 text-sm">% de FC máxima (220 - edad)</Text>
              </View>
              {method === 'simple' && <Ionicons name="checkmark-circle" size={24} color="#9D12DE" />}
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setMethod('karvonen')}
            className={`rounded-xl p-4 mb-6 ${
              method === 'karvonen'
                ? 'bg-purple-500/10 border-2 border-purple-500/30'
                : 'bg-zinc-900 border border-zinc-800'
            }`}
          >
            <View className="flex-row items-center justify-between">
              <View className="flex-1">
                <Text className={`font-bold mb-1 ${method === 'karvonen' ? 'text-white' : 'text-zinc-400'}`}>
                  Método Karvonen
                </Text>
                <Text className="text-zinc-500 text-sm">HRR (más preciso, requiere FC reposo)</Text>
              </View>
              {method === 'karvonen' && <Ionicons name="checkmark-circle" size={24} color="#A855F7" />}
            </View>
          </TouchableOpacity>

          {/* Input Fields */}
          <Text className="text-white font-bold text-lg mb-4">Tus Datos</Text>
          
          <View className="flex-row gap-3 mb-6">
            <View className="flex-1">
              <Text className="text-zinc-400 text-sm mb-2">Edad (años)</Text>
              <TextInput
                value={age}
                onChangeText={setAge}
                keyboardType="numeric"
                className="bg-zinc-900 rounded-xl p-4 text-white border border-zinc-800"
                placeholder="25"
                placeholderTextColor="#71717A"
              />
            </View>
            
            {method === 'karvonen' && (
              <View className="flex-1">
                <Text className="text-zinc-400 text-sm mb-2">FC Reposo (bpm)</Text>
                <TextInput
                  value={restingHR}
                  onChangeText={setRestingHR}
                  keyboardType="numeric"
                  className="bg-zinc-900 rounded-xl p-4 text-white border border-zinc-800"
                  placeholder="60"
                  placeholderTextColor="#71717A"
                />
              </View>
            )}
          </View>

          {method === 'karvonen' && (
            <View className="bg-purple-500/10 rounded-xl p-4 mb-6 border border-purple-500/30">
              <Text className="text-purple-400 text-sm">
                💡 Mide tu FC en reposo al despertar, antes de levantarte de la cama
              </Text>
            </View>
          )}

          {/* Calculate Button */}
          <TouchableOpacity
            onPress={calculateZones}
            className="bg-red-500 rounded-xl p-5 flex-row items-center justify-center mb-6"
          >
            <Ionicons name="calculator" size={24} color="white" />
            <Text className="text-white font-bold text-lg ml-2">Calcular Zonas</Text>
          </TouchableOpacity>

          {/* Zones Results */}
          {zones.length > 0 && (
            <>
              <Text className="text-white font-bold text-lg mb-4">Tus Zonas de Cardio</Text>
              
              {zones.map((zone) => (
                <View 
                  key={zone.zone}
                  className={`bg-${zone.color}-500/10 rounded-xl p-5 mb-4 border border-${zone.color}-500/30`}
                >
                  {/* Header */}
                  <View className="flex-row items-center justify-between mb-3">
                    <View className="flex-row items-center flex-1">
                      <View className={`w-12 h-12 bg-${zone.color}-500 rounded-xl items-center justify-center mr-3`}>
                        <Text className="text-white font-bold text-lg">{zone.zone}</Text>
                      </View>
                      <View className="flex-1">
                        <Text className="text-white font-bold text-lg">{zone.name}</Text>
                        <Text className={`text-${zone.color}-400 text-sm`}>{zone.percentage}</Text>
                      </View>
                    </View>
                    <View className={`bg-${zone.color}-500 rounded-full px-4 py-2`}>
                      <Text className="text-white font-bold text-xl">
                        {zone.rangeMin}-{zone.rangeMax}
                      </Text>
                    </View>
                  </View>

                  {/* Description */}
                  <Text className="text-zinc-400 text-sm mb-3">{zone.description}</Text>

                  {/* Benefits */}
                  <View className={`bg-${zone.color}-500/20 rounded-lg p-3`}>
                    <Text className={`text-${zone.color}-400 font-bold text-xs mb-2`}>Beneficios:</Text>
                    {zone.benefits.map((benefit, idx) => (
                      <Text key={idx} className={`text-${zone.color}-300 text-sm`}>
                        • {benefit}
                      </Text>
                    ))}
                  </View>
                </View>
              ))}

              {/* Training Recommendations */}
              <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
                <Text className="text-white font-bold text-lg mb-4">Recomendaciones de Entrenamiento</Text>
                
                <View className="mb-3">
                  <Text className="text-primary font-bold mb-1">Pérdida de Grasa:</Text>
                  <Text className="text-zinc-400 text-sm">Zona 2 (60-70%) • 45-60 min • 3-4x/semana</Text>
                </View>

                <View className="mb-3">
                  <Text className="text-primary/80 font-bold mb-1">Resistencia Cardiovascular:</Text>
                  <Text className="text-zinc-400 text-sm">Zona 3 (70-80%) • 30-45 min • 2-3x/semana</Text>
                </View>

                <View className="mb-3">
                  <Text className="text-amber-400 font-bold mb-1">Mejora Rendimiento:</Text>
                  <Text className="text-zinc-400 text-sm">Zona 4 (80-90%) • 20-30 min • 1-2x/semana</Text>
                </View>

                <View>
                  <Text className="text-red-400 font-bold mb-1">HIIT / Sprint:</Text>
                  <Text className="text-zinc-400 text-sm">Zona 5 (90-100%) • Intervalos 30s-2min • 1x/semana</Text>
                </View>
              </View>
            </>
          )}

          {/* Tips */}
          <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-6">
            <View className="flex-row items-start">
              <Ionicons name="information-circle" size={20} color="#9D12DE" />
              <View className="flex-1 ml-3">
                <Text className="text-primary/80 font-bold mb-2">Tips Importantes</Text>
                <Text className="text-primary/60 text-sm">
                  • Usa monitor de FC o smartwatch{'\n'}
                  • 80% del cardio en Zona 2 (base aeróbica){'\n'}
                  • Karvonen method = más preciso{'\n'}
                  • Zona 5 solo en intervalos cortos{'\n'}
                  • Calienta en Zona 1 antes de entrenar{'\n'}
                  • Re-calcula cada 6-12 meses
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

