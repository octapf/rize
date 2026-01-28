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

interface DeloadWeek {
  id: string;
  weekNumber: number;
  startDate: Date;
  type: 'volume' | 'intensity' | 'full';
  status: 'upcoming' | 'active' | 'completed';
  notes?: string;
}

const DELOAD_TYPES = [
  {
    value: 'volume',
    label: 'Reducción de Volumen',
    description: 'Reduce series/reps en 40-50%',
    icon: 'remove-circle',
    color: 'blue',
    recommendations: [
      'Mantén la intensidad (peso)',
      'Reduce series a 2 por ejercicio',
      'Reduce reps en 30-40%',
      'Mantén ejercicios principales',
    ],
  },
  {
    value: 'intensity',
    label: 'Reducción de Intensidad',
    description: 'Reduce peso en 40-50%',
    icon: 'fitness',
    color: 'emerald',
    recommendations: [
      'Mantén el volumen (series/reps)',
      'Reduce peso al 50-60% 1RM',
      'Enfócate en técnica perfecta',
      'Tempo controlado',
    ],
  },
  {
    value: 'full',
    label: 'Deload Completo',
    description: 'Reduce volumen E intensidad',
    icon: 'bed',
    color: 'purple',
    recommendations: [
      'Reduce peso 40-50%',
      'Reduce series 40-50%',
      'Considera solo 3 días',
      'Movilidad y recuperación activa',
    ],
  },
];

const MOCK_DELOADS: DeloadWeek[] = [
  {
    id: '1',
    weekNumber: 12,
    startDate: new Date(2026, 1, 9),
    type: 'volume',
    status: 'upcoming',
    notes: 'Después de 3 semanas intensas de volumen',
  },
  {
    id: '2',
    weekNumber: 8,
    startDate: new Date(2026, 0, 13),
    type: 'full',
    status: 'completed',
    notes: 'Post competición',
  },
  {
    id: '3',
    weekNumber: 4,
    startDate: new Date(2025, 11, 16),
    type: 'intensity',
    status: 'completed',
  },
];

export default function DeloadPlanner() {
  const [deloads, setDeloads] = useState(MOCK_DELOADS);
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const scheduleDeload = (type: string) => {
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);

    const newDeload: DeloadWeek = {
      id: Date.now().toString(),
      weekNumber: deloads.length + 1,
      startDate: nextWeek,
      type: type as any,
      status: 'upcoming',
    };

    setDeloads([newDeload, ...deloads]);
    setSelectedType(null);
    Alert.alert('Deload Programado! 📅', 'Semana de deload añadida al calendario');
  };

  const deleteDeload = (id: string) => {
    Alert.alert(
      'Eliminar Deload',
      '¿Estás seguro?',
      [
        { text: 'Cancelar' },
        { text: 'Eliminar', style: 'destructive', onPress: () => setDeloads(deloads.filter((d) => d.id !== id)) },
      ]
    );
  };

  const markCompleted = (id: string) => {
    setDeloads(deloads.map((d) => (d.id === id ? { ...d, status: 'completed' as const } : d)));
    Alert.alert('Completado! ✅', 'Deload marcado como completado');
  };

  const getTypeInfo = (type: string) => {
    return DELOAD_TYPES.find((t) => t.value === type) || DELOAD_TYPES[0];
  };

  const getDaysUntil = (date: Date): number => {
    const now = new Date();
    const diff = date.getTime() - now.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const nextDeload = deloads.find((d) => d.status === 'upcoming');

  return (
    <View className="flex-1 bg-zinc-950">
      {/* Header */}
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1 ml-3">
            Deload Planner
          </Text>
          <TouchableOpacity onPress={() => setSelectedType(selectedType ? null : 'volume')}>
            <Ionicons name={selectedType ? 'close' : 'add-circle'} size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          {/* Add Deload Form */}
          {selectedType !== null && (
            <View className="bg-zinc-900 rounded-xl p-6 mb-6 border border-zinc-800">
              <Text className="text-white font-bold text-lg mb-4">Programar Deload</Text>
              
              <Text className="text-zinc-400 text-sm mb-3">Selecciona tipo de deload:</Text>
              {DELOAD_TYPES.map((type) => (
                <TouchableOpacity
                  key={type.value}
                  onPress={() => scheduleDeload(type.value)}
                  className={`mb-3 rounded-lg p-4 bg-${type.color}-500/10 border border-${type.color}-500/30`}
                >
                  <View className="flex-row items-center mb-2">
                    <Ionicons name={type.icon as any} size={24} color={`#${type.color === 'blue' ? '3B82F6' : type.color === 'emerald' ? '10B981' : 'A855F7'}`} />
                    <Text className={`text-${type.color}-400 font-bold text-lg ml-3`}>
                      {type.label}
                    </Text>
                  </View>
                  <Text className="text-zinc-300 text-sm mb-2">{type.description}</Text>
                  <View className="bg-zinc-800 rounded-lg p-2">
                    {type.recommendations.map((rec, idx) => (
                      <Text key={idx} className="text-zinc-400 text-xs">
                        • {rec}
                      </Text>
                    ))}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Next Deload */}
          {nextDeload && (
            <View className="bg-gradient-to-r from-emerald-500 to-blue-500 rounded-xl p-6 mb-6">
              <View className="flex-row items-center mb-3">
                <Ionicons name="calendar" size={24} color="white" />
                <Text className="text-white font-bold text-lg ml-2">Próximo Deload</Text>
              </View>
              <Text className="text-white text-3xl font-bold mb-2">
                {getDaysUntil(nextDeload.startDate)} días
              </Text>
              <Text className="text-white opacity-90 text-sm mb-3">
                Semana {nextDeload.weekNumber} • {getTypeInfo(nextDeload.type).label}
              </Text>
              <TouchableOpacity
                onPress={() => markCompleted(nextDeload.id)}
                className="bg-white/20 rounded-lg p-3"
              >
                <Text className="text-white font-bold text-center">Marcar como Completado</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Why Deload */}
          <View className="bg-zinc-900 rounded-xl p-4 mb-6 border border-zinc-800">
            <Text className="text-white font-bold text-lg mb-3">¿Por Qué Deload?</Text>
            <View className="space-y-3">
              <View className="flex-row items-start">
                <View className="w-8 h-8 bg-emerald-500/10 rounded-full items-center justify-center mr-3 mt-0.5">
                  <Ionicons name="fitness" size={16} color="#10B981" />
                </View>
                <View className="flex-1">
                  <Text className="text-white font-bold mb-1">Recuperación Completa</Text>
                  <Text className="text-zinc-400 text-sm">
                    Permite que sistema nervioso central y articulaciones se recuperen
                  </Text>
                </View>
              </View>

              <View className="flex-row items-start">
                <View className="w-8 h-8 bg-blue-500/10 rounded-full items-center justify-center mr-3 mt-0.5">
                  <Ionicons name="trending-up" size={16} color="#3B82F6" />
                </View>
                <View className="flex-1">
                  <Text className="text-white font-bold mb-1">Supera Plateau</Text>
                  <Text className="text-zinc-400 text-sm">
                    El descanso programado ayuda a romper estancamientos
                  </Text>
                </View>
              </View>

              <View className="flex-row items-start">
                <View className="w-8 h-8 bg-purple-500/10 rounded-full items-center justify-center mr-3 mt-0.5">
                  <Ionicons name="shield-checkmark" size={16} color="#A855F7" />
                </View>
                <View className="flex-1">
                  <Text className="text-white font-bold mb-1">Previene Lesiones</Text>
                  <Text className="text-zinc-400 text-sm">
                    Reduce riesgo de overtraining y lesiones por sobreuso
                  </Text>
                </View>
              </View>

              <View className="flex-row items-start">
                <View className="w-8 h-8 bg-amber-500/10 rounded-full items-center justify-center mr-3 mt-0.5">
                  <Ionicons name="happy" size={16} color="#F59E0B" />
                </View>
                <View className="flex-1">
                  <Text className="text-white font-bold mb-1">Salud Mental</Text>
                  <Text className="text-zinc-400 text-sm">
                    Break psicológico para volver con más motivación
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Deload History */}
          <Text className="text-white font-bold text-lg mb-4">Historial</Text>
          {deloads.length === 0 ? (
            <View className="bg-zinc-900 rounded-xl p-8 items-center border border-zinc-800 mb-6">
              <Text className="text-6xl mb-3">📅</Text>
              <Text className="text-white font-bold text-lg mb-2">Sin Deloads Programados</Text>
              <Text className="text-zinc-400 text-center">
                Programa semanas de deload cada 4-6 semanas
              </Text>
            </View>
          ) : (
            deloads
              .sort((a, b) => b.startDate.getTime() - a.startDate.getTime())
              .map((deload) => {
                const typeInfo = getTypeInfo(deload.type);
                const daysUntil = getDaysUntil(deload.startDate);

                return (
                  <View key={deload.id} className="bg-zinc-900 rounded-xl p-4 mb-3 border border-zinc-800">
                    <View className="flex-row items-start justify-between mb-3">
                      <View className="flex-row items-start flex-1">
                        <View className={`w-12 h-12 bg-${typeInfo.color}-500 rounded-xl items-center justify-center mr-3`}>
                          <Ionicons name={typeInfo.icon as any} size={24} color="white" />
                        </View>
                        <View className="flex-1">
                          <Text className="text-white font-bold text-lg mb-1">
                            Semana {deload.weekNumber}
                          </Text>
                          <Text className="text-zinc-400 text-sm mb-2">
                            {typeInfo.label}
                          </Text>
                          <View className={`bg-${deload.status === 'completed' ? 'emerald' : deload.status === 'active' ? 'blue' : 'amber'}-500/10 rounded px-2 py-1 border border-${deload.status === 'completed' ? 'emerald' : deload.status === 'active' ? 'blue' : 'amber'}-500/30 self-start`}>
                            <Text className={`text-${deload.status === 'completed' ? 'emerald' : deload.status === 'active' ? 'blue' : 'amber'}-400 text-xs font-bold`}>
                              {deload.status === 'completed' ? '✓ Completado' : deload.status === 'active' ? '🔥 Activo' : `${daysUntil} días`}
                            </Text>
                          </View>
                        </View>
                      </View>
                      {deload.status !== 'completed' && (
                        <TouchableOpacity onPress={() => deleteDeload(deload.id)}>
                          <Ionicons name="trash" size={20} color="#EF4444" />
                        </TouchableOpacity>
                      )}
                    </View>

                    {deload.notes && (
                      <View className="bg-zinc-800 rounded-lg p-3 mb-3">
                        <Text className="text-zinc-300 text-sm">{deload.notes}</Text>
                      </View>
                    )}

                    {deload.status === 'upcoming' && (
                      <TouchableOpacity
                        onPress={() => markCompleted(deload.id)}
                        className="bg-emerald-500 rounded-lg p-3"
                      >
                        <Text className="text-white font-bold text-center">Marcar Completado</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                );
              })
          )}

          {/* Tips */}
          <View className="bg-blue-500/10 rounded-xl p-4 border border-blue-500/30 mb-6">
            <View className="flex-row items-start">
              <Ionicons name="bulb" size={20} color="#3B82F6" />
              <View className="flex-1 ml-3">
                <Text className="text-blue-400 font-bold mb-2">
                  Cuándo Hacer Deload
                </Text>
                <Text className="text-blue-300 text-sm">
                  • Cada 4-6 semanas de entrenamiento intenso{'\n'}
                  • Si sientes fatiga acumulada{'\n'}
                  • Dolor articular persistente{'\n'}
                  • Pérdida de motivación{'\n'}
                  • Estancamiento en progreso{'\n'}
                  • Post-competición o meet
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
