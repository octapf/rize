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
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface ChecklistItem {
  id: string;
  category: 'warmup' | 'mobility' | 'equipment' | 'nutrition' | 'mindset';
  label: string;
  description: string;
  isCompleted: boolean;
  isRequired: boolean;
}

interface ChecklistSession {
  id: string;
  date: Date;
  completedItems: number;
  totalItems: number;
  completionRate: number;
  readinessScore: number;
  skipped: boolean;
}

const CHECKLIST_ITEMS: ChecklistItem[] = [
  // Warmup
  {
    id: '1',
    category: 'warmup',
    label: 'Cardio 5-10 min',
    description: 'Elevar temperatura corporal y frecuencia cardíaca',
    isCompleted: false,
    isRequired: true,
  },
  {
    id: '2',
    category: 'warmup',
    label: 'Calentamiento dinámico',
    description: 'Movimientos activos rango completo',
    isCompleted: false,
    isRequired: true,
  },
  {
    id: '3',
    category: 'warmup',
    label: 'Series de aproximación',
    description: 'Sets ligeros del ejercicio principal',
    isCompleted: false,
    isRequired: true,
  },
  // Mobility
  {
    id: '4',
    category: 'mobility',
    label: 'Movilidad articular',
    description: 'Círculos de hombros, caderas, tobillos',
    isCompleted: false,
    isRequired: true,
  },
  {
    id: '5',
    category: 'mobility',
    label: 'Activación glúteos',
    description: 'Clamshells, puentes, bandas',
    isCompleted: false,
    isRequired: false,
  },
  {
    id: '6',
    category: 'mobility',
    label: 'Activación core',
    description: 'Planchas, dead bugs, bird dogs',
    isCompleted: false,
    isRequired: false,
  },
  // Equipment
  {
    id: '7',
    category: 'equipment',
    label: 'Equipo verificado',
    description: 'Pesas, barra, bancos disponibles',
    isCompleted: false,
    isRequired: true,
  },
  {
    id: '8',
    category: 'equipment',
    label: 'Espacio despejado',
    description: 'Área de trabajo segura sin obstáculos',
    isCompleted: false,
    isRequired: true,
  },
  {
    id: '9',
    category: 'equipment',
    label: 'Accesorios listos',
    description: 'Cinturón, muñequeras, bandas si necesitas',
    isCompleted: false,
    isRequired: false,
  },
  // Nutrition
  {
    id: '10',
    category: 'nutrition',
    label: 'Hidratado',
    description: 'Al menos 500ml agua pre-workout',
    isCompleted: false,
    isRequired: true,
  },
  {
    id: '11',
    category: 'nutrition',
    label: 'Comida pre-workout',
    description: '1-2h antes: carbos + proteína moderada',
    isCompleted: false,
    isRequired: true,
  },
  {
    id: '12',
    category: 'nutrition',
    label: 'Cafeína (opcional)',
    description: '200-400mg 30-60 min antes si usas',
    isCompleted: false,
    isRequired: false,
  },
  // Mindset
  {
    id: '13',
    category: 'mindset',
    label: 'Objetivo claro',
    description: 'Sabes qué vas a entrenar y tus metas',
    isCompleted: false,
    isRequired: true,
  },
  {
    id: '14',
    category: 'mindset',
    label: 'Música/Focus',
    description: 'Playlist lista o ambiente adecuado',
    isCompleted: false,
    isRequired: false,
  },
  {
    id: '15',
    category: 'mindset',
    label: 'Estado mental',
    description: 'Concentrado y listo para trabajar',
    isCompleted: false,
    isRequired: true,
  },
];

const MOCK_SESSIONS: ChecklistSession[] = [
  {
    id: '1',
    date: new Date(2026, 0, 26),
    completedItems: 12,
    totalItems: 15,
    completionRate: 80,
    readinessScore: 85,
    skipped: false,
  },
  {
    id: '2',
    date: new Date(2026, 0, 24),
    completedItems: 15,
    totalItems: 15,
    completionRate: 100,
    readinessScore: 95,
    skipped: false,
  },
];

export default function PreWorkoutChecklist() {
  const [checklist, setChecklist] = useState<ChecklistItem[]>(CHECKLIST_ITEMS);
  const [sessions, setSessions] = useState<ChecklistSession[]>(MOCK_SESSIONS);
  const [showHistory, setShowHistory] = useState(false);

  const categories = [
    { key: 'warmup', label: 'Calentamiento', icon: 'flame', color: 'red' },
    { key: 'mobility', label: 'Movilidad', icon: 'body', color: 'blue' },
    { key: 'equipment', label: 'Equipo', icon: 'barbell', color: 'emerald' },
    { key: 'nutrition', label: 'Nutrición', icon: 'restaurant', color: 'amber' },
    { key: 'mindset', label: 'Mental', icon: 'bulb', color: 'purple' },
  ];

  const toggleItem = (id: string) => {
    setChecklist(checklist.map(item => 
      item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
    ));
  };

  const resetChecklist = () => {
    setChecklist(CHECKLIST_ITEMS.map(item => ({ ...item, isCompleted: false })));
  };

  const calculateReadinessScore = () => {
    const requiredItems = checklist.filter(item => item.isRequired);
    const completedRequired = requiredItems.filter(item => item.isCompleted).length;
    const requiredScore = (completedRequired / requiredItems.length) * 70;
    
    const optionalItems = checklist.filter(item => !item.isRequired);
    const completedOptional = optionalItems.filter(item => item.isCompleted).length;
    const optionalScore = (completedOptional / optionalItems.length) * 30;
    
    return Math.round(requiredScore + optionalScore);
  };

  const completeChecklist = () => {
    const completedCount = checklist.filter(item => item.isCompleted).length;
    const requiredCount = checklist.filter(item => item.isRequired).length;
    const completedRequired = checklist.filter(item => item.isRequired && item.isCompleted).length;
    
    if (completedRequired < requiredCount) {
      Alert.alert(
        '⚠️ Items Requeridos Pendientes',
        `Completa los ${requiredCount - completedRequired} items requeridos restantes para entrenar seguro.`,
        [
          { text: 'Seguir Completando', style: 'cancel' },
          {
            text: 'Continuar Igual',
            style: 'destructive',
            onPress: () => saveSession(true)
          }
        ]
      );
      return;
    }
    
    saveSession(false);
  };

  const saveSession = (hasWarnings: boolean) => {
    const completedCount = checklist.filter(item => item.isCompleted).length;
    const completionRate = Math.round((completedCount / checklist.length) * 100);
    const readinessScore = calculateReadinessScore();
    
    const newSession: ChecklistSession = {
      id: String(Date.now()),
      date: new Date(),
      completedItems: completedCount,
      totalItems: checklist.length,
      completionRate,
      readinessScore,
      skipped: hasWarnings,
    };
    
    setSessions([newSession, ...sessions]);
    
    const scoreEmoji = readinessScore >= 90 ? '🔥' : readinessScore >= 70 ? '💪' : '⚠️';
    
    Alert.alert(
      `${scoreEmoji} Readiness Score: ${readinessScore}/100`,
      `${completedCount}/${checklist.length} completados\n\n${
        readinessScore >= 90 ? '¡Perfecto! Listo para un gran workout' :
        readinessScore >= 70 ? 'Bien preparado. ¡A entrenar!' :
        'Considera completar más items para mejor resultado'
      }`,
      [
        { text: 'Entendido', onPress: () => resetChecklist() }
      ]
    );
  };

  const skipChecklist = () => {
    Alert.alert(
      'Saltar Checklist',
      '¿Seguro quieres saltarte el checklist pre-workout?\n\nNo recomendado: aumenta riesgo de lesión.',
      [
        { text: 'No, Completar', style: 'cancel' },
        {
          text: 'Sí, Saltar',
          style: 'destructive',
          onPress: () => {
            const newSession: ChecklistSession = {
              id: String(Date.now()),
              date: new Date(),
              completedItems: 0,
              totalItems: checklist.length,
              completionRate: 0,
              readinessScore: 30,
              skipped: true,
            };
            setSessions([newSession, ...sessions]);
            resetChecklist();
            Alert.alert('⚠️ Checklist Saltado', 'Calienta bien y ten cuidado');
          }
        }
      ]
    );
  };

  const completedCount = checklist.filter(item => item.isCompleted).length;
  const requiredCount = checklist.filter(item => item.isRequired).length;
  const completedRequired = checklist.filter(item => item.isRequired && item.isCompleted).length;
  const completionRate = Math.round((completedCount / checklist.length) * 100);
  const readinessScore = calculateReadinessScore();

  if (showHistory) {
    return (
      <View className="flex-1 bg-zinc-950">
        {/* Header */}
        <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
          <View className="flex-row items-center mb-4">
            <TouchableOpacity onPress={() => setShowHistory(false)}>
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <Text className="text-white text-2xl font-bold flex-1 ml-3">
              Historial
            </Text>
          </View>
        </View>

        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          <View className="px-6 pt-6">
            {sessions.length === 0 ? (
              <View className="bg-zinc-900 rounded-xl p-8 border border-zinc-800 items-center">
                <Ionicons name="time-outline" size={64} color="#52525B" />
                <Text className="text-zinc-400 text-center mt-4">
                  No hay sesiones registradas
                </Text>
              </View>
            ) : (
              sessions.map((session) => (
                <View key={session.id} className="bg-zinc-900 rounded-xl p-5 mb-4 border border-zinc-800">
                  <View className="flex-row items-center justify-between mb-3">
                    <Text className="text-white font-bold text-lg">
                      {format(session.date, "d 'de' MMMM, yyyy", { locale: es })}
                    </Text>
                    {session.skipped && (
                      <View className="bg-red-500/20 rounded-full px-3 py-1">
                        <Text className="text-red-400 text-xs font-bold">SALTADO</Text>
                      </View>
                    )}
                  </View>

                  <View className="flex-row gap-3 mb-3">
                    <View className="flex-1 bg-zinc-800 rounded-lg p-3">
                      <Text className="text-zinc-400 text-xs mb-1">Completados</Text>
                      <Text className="text-white font-bold text-xl">
                        {session.completedItems}/{session.totalItems}
                      </Text>
                    </View>
                    <View className="flex-1 bg-zinc-800 rounded-lg p-3">
                      <Text className="text-zinc-400 text-xs mb-1">Completion</Text>
                      <Text className="text-emerald-400 font-bold text-xl">
                        {session.completionRate}%
                      </Text>
                    </View>
                  </View>

                  <View className={`rounded-lg p-4 ${
                    session.readinessScore >= 90 ? 'bg-emerald-500/10 border border-emerald-500/30' :
                    session.readinessScore >= 70 ? 'bg-blue-500/10 border border-blue-500/30' :
                    'bg-amber-500/10 border border-amber-500/30'
                  }`}>
                    <Text className={`text-xs mb-1 ${
                      session.readinessScore >= 90 ? 'text-emerald-400' :
                      session.readinessScore >= 70 ? 'text-blue-400' :
                      'text-amber-400'
                    }`}>
                      Readiness Score
                    </Text>
                    <Text className={`font-bold text-3xl ${
                      session.readinessScore >= 90 ? 'text-emerald-400' :
                      session.readinessScore >= 70 ? 'text-blue-400' :
                      'text-amber-400'
                    }`}>
                      {session.readinessScore}/100
                    </Text>
                  </View>
                </View>
              ))
            )}
          </View>
        </ScrollView>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-zinc-950">
      {/* Header */}
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1 ml-3">
            Pre-Workout Checklist
          </Text>
          <TouchableOpacity onPress={() => setShowHistory(true)}>
            <Ionicons name="time" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          {/* Progress Card */}
          <View className={`bg-gradient-to-r ${
            readinessScore >= 90 ? 'from-emerald-500 to-green-500' :
            readinessScore >= 70 ? 'from-blue-500 to-cyan-500' :
            'from-amber-500 to-orange-500'
          } rounded-xl p-6 mb-6`}>
            <Text className="text-white opacity-90 text-sm mb-2">Readiness Score</Text>
            <View className="flex-row items-end justify-between mb-4">
              <Text className="text-white text-5xl font-bold">{readinessScore}</Text>
              <Text className="text-white text-2xl opacity-90 mb-2">/100</Text>
            </View>
            
            <View className="flex-row items-center justify-between mb-2">
              <Text className="text-white opacity-90 text-sm">Progreso</Text>
              <Text className="text-white font-bold">
                {completedCount}/{checklist.length} ({completionRate}%)
              </Text>
            </View>
            
            <View className="h-3 bg-white/20 rounded-full overflow-hidden mb-3">
              <View 
                className="h-full bg-white rounded-full"
                style={{ width: `${completionRate}%` }}
              />
            </View>

            {completedRequired < requiredCount && (
              <View className="bg-white/20 rounded-lg p-2 flex-row items-center">
                <Ionicons name="alert-circle" size={16} color="white" />
                <Text className="text-white text-xs ml-2 flex-1">
                  Faltan {requiredCount - completedRequired} items requeridos
                </Text>
              </View>
            )}
          </View>

          {/* Checklist by Category */}
          {categories.map((category) => {
            const items = checklist.filter(item => item.category === category.key);
            const completedItems = items.filter(item => item.isCompleted).length;

            return (
              <View key={category.key} className="mb-6">
                <View className="flex-row items-center justify-between mb-3">
                  <View className="flex-row items-center">
                    <View className={`w-10 h-10 bg-${category.color}-500 rounded-xl items-center justify-center mr-3`}>
                      <Ionicons name={category.icon as any} size={20} color="white" />
                    </View>
                    <Text className="text-white font-bold text-lg">{category.label}</Text>
                  </View>
                  <Text className={`text-${category.color}-400 font-bold`}>
                    {completedItems}/{items.length}
                  </Text>
                </View>

                {items.map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    onPress={() => toggleItem(item.id)}
                    className={`mb-3 rounded-xl p-4 ${
                      item.isCompleted
                        ? `bg-${category.color}-500/10 border border-${category.color}-500/30`
                        : 'bg-zinc-900 border border-zinc-800'
                    }`}
                  >
                    <View className="flex-row items-start">
                      <View className="mr-3 mt-0.5">
                        <Ionicons
                          name={item.isCompleted ? 'checkmark-circle' : 'ellipse-outline'}
                          size={24}
                          color={item.isCompleted ? '#10B981' : '#52525B'}
                        />
                      </View>
                      <View className="flex-1">
                        <View className="flex-row items-center gap-2 mb-1">
                          <Text className={`font-bold flex-1 ${item.isCompleted ? 'text-white' : 'text-zinc-400'}`}>
                            {item.label}
                          </Text>
                          {item.isRequired && !item.isCompleted && (
                            <View className="bg-red-500/20 rounded-full px-2 py-0.5">
                              <Text className="text-red-400 text-xs font-bold">REQUERIDO</Text>
                            </View>
                          )}
                        </View>
                        <Text className={`text-sm ${item.isCompleted ? 'text-zinc-300' : 'text-zinc-500'}`}>
                          {item.description}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            );
          })}

          {/* Action Buttons */}
          <View className="gap-3 mb-6">
            <TouchableOpacity
              onPress={completeChecklist}
              className={`rounded-xl p-5 flex-row items-center justify-center ${
                completedRequired === requiredCount
                  ? 'bg-emerald-500'
                  : 'bg-amber-500'
              }`}
            >
              <Ionicons name="checkmark-circle" size={24} color="white" />
              <Text className="text-white font-bold text-lg ml-2">
                {completedRequired === requiredCount ? 'Empezar Workout' : 'Continuar con Precaución'}
              </Text>
            </TouchableOpacity>

            <View className="flex-row gap-3">
              <TouchableOpacity
                onPress={resetChecklist}
                className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex-row items-center justify-center"
              >
                <Ionicons name="refresh" size={20} color="#71717A" />
                <Text className="text-zinc-400 font-bold ml-2">Reset</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={skipChecklist}
                className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex-row items-center justify-center"
              >
                <Ionicons name="close-circle" size={20} color="#EF4444" />
                <Text className="text-red-400 font-bold ml-2">Saltar</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Tips */}
          <View className="bg-blue-500/10 rounded-xl p-4 border border-blue-500/30 mb-6">
            <View className="flex-row items-start">
              <Ionicons name="information-circle" size={20} color="#3B82F6" />
              <View className="flex-1 ml-3">
                <Text className="text-blue-400 font-bold mb-2">
                  Por Qué Usar el Checklist
                </Text>
                <Text className="text-blue-300 text-sm">
                  • Reduce riesgo de lesión hasta 60%{'\n'}
                  • Mejora rendimiento 15-20%{'\n'}
                  • Crea rutina y consistencia{'\n'}
                  • Identifica gaps en preparación{'\n'}
                  • 90%+ readiness = workout óptimo
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
