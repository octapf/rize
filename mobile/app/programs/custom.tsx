import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface Program {
  id: string;
  name: string;
  type: 'fuerza' | 'hipertrofia' | 'resistencia' | 'powerlifting';
  duration: number; // weeks
  phases: Phase[];
  currentPhase: number;
  startDate: string;
  endDate: string;
}

interface Phase {
  id: string;
  name: string;
  weeks: number;
  focus: string;
  intensity: string;
  volume: string;
  exercises: number;
  description: string;
}

const SAMPLE_PROGRAM: Program = {
  id: '1',
  name: 'Programa de Fuerza 12 Semanas',
  type: 'fuerza',
  duration: 12,
  currentPhase: 2,
  startDate: '2025-01-01',
  endDate: '2025-03-24',
  phases: [
    {
      id: '1',
      name: 'Fase 1: Adaptación',
      weeks: 3,
      focus: 'Volumen alto, intensidad media',
      intensity: '65-75% 1RM',
      volume: '4-5 series x 8-12 reps',
      exercises: 6,
      description: 'Preparación muscular y técnica',
    },
    {
      id: '2',
      name: 'Fase 2: Hipertrofia',
      weeks: 4,
      focus: 'Volumen máximo',
      intensity: '70-80% 1RM',
      volume: '4-6 series x 6-10 reps',
      exercises: 7,
      description: 'Crecimiento muscular y capacidad de trabajo',
    },
    {
      id: '3',
      name: 'Fase 3: Fuerza',
      weeks: 3,
      focus: 'Intensidad alta, volumen medio',
      intensity: '80-90% 1RM',
      volume: '3-5 series x 3-6 reps',
      exercises: 5,
      description: 'Desarrollo de fuerza máxima',
    },
    {
      id: '4',
      name: 'Fase 4: Peaking',
      weeks: 2,
      focus: 'Intensidad máxima, volumen bajo',
      intensity: '90-95% 1RM',
      volume: '2-3 series x 1-3 reps',
      exercises: 4,
      description: 'Pico de rendimiento y test de máximos',
    },
  ],
};

const PROGRAM_TEMPLATES = [
  {
    id: '1',
    name: 'Fuerza 12 Semanas',
    type: 'fuerza',
    phases: 4,
    duration: 12,
    description: 'Programa periodizado para incrementar 1RM',
  },
  {
    id: '2',
    name: 'Hipertrofia 16 Semanas',
    type: 'hipertrofia',
    phases: 4,
    duration: 16,
    description: 'Máximo crecimiento muscular',
  },
  {
    id: '3',
    name: 'Powerlifting 20 Semanas',
    type: 'powerlifting',
    phases: 5,
    duration: 20,
    description: 'Preparación para competencia',
  },
  {
    id: '4',
    name: 'Resistencia 8 Semanas',
    type: 'resistencia',
    phases: 3,
    duration: 8,
    description: 'Mejora capacidad aeróbica y muscular',
  },
];

export default function CustomPrograms() {
  const [selectedTab, setSelectedTab] = useState<'active' | 'phases' | 'templates'>('active');

  const tabs = [
    { id: 'active' as const, label: 'Activo', icon: 'flash' },
    { id: 'phases' as const, label: 'Fases', icon: 'layers' },
    { id: 'templates' as const, label: 'Plantillas', icon: 'grid' },
  ];

  const getPhaseColor = (phaseIndex: number, currentPhase: number) => {
    if (phaseIndex + 1 < currentPhase) return '#9D12DE'; // completed
    if (phaseIndex + 1 === currentPhase) return '#9D12DE'; // active
    return '#71717A'; // upcoming
  };

  const getPhaseStatus = (phaseIndex: number, currentPhase: number) => {
    if (phaseIndex + 1 < currentPhase) return 'Completada';
    if (phaseIndex + 1 === currentPhase) return 'En Curso';
    return 'Próxima';
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'fuerza':
        return '#EF4444';
      case 'hipertrofia':
        return '#9D12DE';
      case 'powerlifting':
        return '#8B5CF6';
      case 'resistencia':
        return '#9D12DE';
      default:
        return '#71717A';
    }
  };

  const createProgram = (templateId: string) => {
    const template = PROGRAM_TEMPLATES.find((t) => t.id === templateId);
    if (!template) return;

    Alert.alert(
      'Crear Programa',
      `${template.name}\n\n${template.duration} semanas • ${template.phases} fases\n\n${template.description}`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Comenzar Ahora',
          onPress: () => {
            Alert.alert('¡Programa Creado!', 'Tu programa personalizado está listo');
          },
        },
      ]
    );
  };

  const weeksCompleted = SAMPLE_PROGRAM.phases
    .slice(0, SAMPLE_PROGRAM.currentPhase - 1)
    .reduce((sum, phase) => sum + phase.weeks, 0);
  
  const currentPhaseWeeks = SAMPLE_PROGRAM.phases[SAMPLE_PROGRAM.currentPhase - 1]?.weeks || 0;
  const currentWeekInPhase = 2; // Example
  
  const totalWeeksCompleted = weeksCompleted + currentWeekInPhase;
  const progressPercentage = Math.round((totalWeeksCompleted / SAMPLE_PROGRAM.duration) * 100);

  return (
    <View className="flex-1 bg-zinc-950">
      {/* Header */}
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1 ml-3">
            Programas Personalizados
          </Text>
          <TouchableOpacity>
            <Ionicons name="settings-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Program Progress */}
        <View className="bg-gradient-to-br from-primary to-[#7D0EBE] rounded-xl p-4 mb-4">
          <Text className="text-white/80 text-sm mb-2">{SAMPLE_PROGRAM.name}</Text>
          <View className="flex-row items-end justify-between mb-3">
            <View className="flex-1">
              <Text className="text-white font-bold text-3xl mb-1">
                Semana {totalWeeksCompleted}
              </Text>
              <Text className="text-white/80 text-sm">
                de {SAMPLE_PROGRAM.duration} semanas
              </Text>
            </View>
            <View className="bg-white/20 rounded-lg px-3 py-2">
              <Text className="text-white font-bold text-xl">
                {progressPercentage}%
              </Text>
            </View>
          </View>
          <View className="bg-white/20 h-2 rounded-full overflow-hidden">
            <View
              className="h-full bg-white rounded-full"
              style={{ width: `${progressPercentage}%` }}
            />
          </View>
        </View>

        {/* Tabs */}
        <View className="flex-row gap-2">
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.id}
              onPress={() => setSelectedTab(tab.id)}
              className={`flex-1 flex-row items-center justify-center py-3 rounded-lg ${
                selectedTab === tab.id ? 'bg-primary' : 'bg-zinc-900 border border-zinc-800'
              }`}
            >
              <Ionicons
                name={tab.icon as any}
                size={18}
                color={selectedTab === tab.id ? 'white' : '#71717A'}
              />
              <Text
                className={`ml-2 font-semibold text-sm ${
                  selectedTab === tab.id ? 'text-white' : 'text-zinc-400'
                }`}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Active Tab */}
        {selectedTab === 'active' && (
          <View className="px-6 pt-6">
            <Text className="text-white font-bold text-lg mb-3">
              Fase Actual
            </Text>

            {SAMPLE_PROGRAM.phases.map((phase, index) => {
              if (index + 1 !== SAMPLE_PROGRAM.currentPhase) return null;

              return (
                <View
                  key={phase.id}
                  className="bg-zinc-900 rounded-xl p-4 mb-4 border-2 border-primary"
                >
                  <View className="flex-row items-center justify-between mb-3">
                    <View className="flex-1">
                      <View className="flex-row items-center mb-2">
                        <View className="bg-primary/20 px-3 py-1 rounded-full">
                          <Text className="text-primary/80 text-xs font-bold">
                            FASE {index + 1} • EN CURSO
                          </Text>
                        </View>
                      </View>
                      <Text className="text-white font-bold text-xl mb-1">
                        {phase.name}
                      </Text>
                      <Text className="text-zinc-400 text-sm">
                        {phase.description}
                      </Text>
                    </View>
                  </View>

                  <View className="bg-zinc-800 rounded-lg p-3 mb-3">
                    <View className="flex-row items-center justify-between mb-2">
                      <Text className="text-zinc-400 text-sm">Duración</Text>
                      <Text className="text-white font-bold">{phase.weeks} semanas</Text>
                    </View>
                    <View className="flex-row items-center justify-between mb-2">
                      <Text className="text-zinc-400 text-sm">Intensidad</Text>
                      <Text className="text-primary font-bold">{phase.intensity}</Text>
                    </View>
                    <View className="flex-row items-center justify-between mb-2">
                      <Text className="text-zinc-400 text-sm">Volumen</Text>
                      <Text className="text-primary font-bold">{phase.volume}</Text>
                    </View>
                    <View className="flex-row items-center justify-between">
                      <Text className="text-zinc-400 text-sm">Ejercicios/Día</Text>
                      <Text className="text-amber-500 font-bold">{phase.exercises}</Text>
                    </View>
                  </View>

                  <View className="bg-primary/10 rounded-lg p-3 mb-3 border border-primary/30">
                    <Text className="text-primary/80 font-bold mb-1">Enfoque</Text>
                    <Text className="text-primary/60 text-sm">{phase.focus}</Text>
                  </View>

                  <View className="flex-row gap-2">
                    <TouchableOpacity className="flex-1 bg-primary rounded-lg p-3">
                      <Text className="text-white font-bold text-center">
                        Ver Entrenamientos
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="bg-zinc-800 rounded-lg p-3 px-4">
                      <Ionicons name="create-outline" size={20} color="white" />
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}

            {/* Progress Stats */}
            <Text className="text-white font-bold text-lg mb-3">
              Estadísticas del Programa
            </Text>

            <View className="flex-row gap-3 mb-4">
              <View className="flex-1 bg-zinc-900 rounded-xl p-4 border border-zinc-800">
                <Ionicons name="calendar" size={24} color="#9D12DE" />
                <Text className="text-zinc-400 text-xs mt-2">Días Entrenados</Text>
                <Text className="text-white font-bold text-2xl">32</Text>
              </View>
              <View className="flex-1 bg-zinc-900 rounded-xl p-4 border border-zinc-800">
                <Ionicons name="flame" size={24} color="#FFEA00" />
                <Text className="text-zinc-400 text-xs mt-2">Racha Actual</Text>
                <Text className="text-white font-bold text-2xl">8 días</Text>
              </View>
            </View>

            <View className="flex-row gap-3">
              <View className="flex-1 bg-zinc-900 rounded-xl p-4 border border-zinc-800">
                <Ionicons name="trending-up" size={24} color="#EF4444" />
                <Text className="text-zinc-400 text-xs mt-2">Sentadilla 1RM</Text>
                <Text className="text-white font-bold text-2xl">+12 kg</Text>
              </View>
              <View className="flex-1 bg-zinc-900 rounded-xl p-4 border border-zinc-800">
                <Ionicons name="barbell" size={24} color="#9D12DE" />
                <Text className="text-zinc-400 text-xs mt-2">Press Banca</Text>
                <Text className="text-white font-bold text-2xl">+8 kg</Text>
              </View>
            </View>
          </View>
        )}

        {/* Phases Tab */}
        {selectedTab === 'phases' && (
          <View className="px-6 pt-6">
            <Text className="text-white font-bold text-lg mb-3">
              Periodización ({SAMPLE_PROGRAM.phases.length} Fases)
            </Text>

            {SAMPLE_PROGRAM.phases.map((phase, index) => (
              <View
                key={phase.id}
                className={`bg-zinc-900 rounded-xl p-4 mb-3 border-2`}
                style={{
                  borderColor: getPhaseColor(index, SAMPLE_PROGRAM.currentPhase),
                }}
              >
                <View className="flex-row items-start justify-between mb-3">
                  <View className="flex-1">
                    <View
                      className="px-3 py-1 rounded-full self-start mb-2"
                      style={{
                        backgroundColor:
                          getPhaseColor(index, SAMPLE_PROGRAM.currentPhase) + '20',
                      }}
                    >
                      <Text
                        className="text-xs font-bold"
                        style={{
                          color: getPhaseColor(index, SAMPLE_PROGRAM.currentPhase),
                        }}
                      >
                        {getPhaseStatus(index, SAMPLE_PROGRAM.currentPhase)}
                      </Text>
                    </View>
                    <Text className="text-white font-bold text-lg mb-1">
                      {phase.name}
                    </Text>
                    <Text className="text-zinc-400 text-sm mb-2">
                      {phase.description}
                    </Text>
                  </View>
                  <View className="items-end">
                    <Text className="text-zinc-400 text-xs">Duración</Text>
                    <Text className="text-white font-bold text-xl">
                      {phase.weeks}w
                    </Text>
                  </View>
                </View>

                <View className="bg-zinc-800 rounded-lg p-3">
                  <View className="flex-row items-center justify-between mb-2">
                    <Text className="text-zinc-400 text-sm">Intensidad</Text>
                    <Text className="text-white font-semibold text-sm">
                      {phase.intensity}
                    </Text>
                  </View>
                  <View className="flex-row items-center justify-between">
                    <Text className="text-zinc-400 text-sm">Volumen</Text>
                    <Text className="text-white font-semibold text-sm">
                      {phase.volume}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Templates Tab */}
        {selectedTab === 'templates' && (
          <View className="px-6 pt-6">
            <Text className="text-white font-bold text-lg mb-3">
              Plantillas Disponibles ({PROGRAM_TEMPLATES.length})
            </Text>

            {PROGRAM_TEMPLATES.map((template) => (
              <View
                key={template.id}
                className="bg-zinc-900 rounded-xl p-4 mb-3 border border-zinc-800"
              >
                <View className="flex-row items-start justify-between mb-3">
                  <View className="flex-1">
                    <View
                      className="px-3 py-1 rounded-full self-start mb-2"
                      style={{ backgroundColor: getTypeColor(template.type) + '20' }}
                    >
                      <Text
                        className="text-xs font-bold capitalize"
                        style={{ color: getTypeColor(template.type) }}
                      >
                        {template.type}
                      </Text>
                    </View>
                    <Text className="text-white font-bold text-xl mb-1">
                      {template.name}
                    </Text>
                    <Text className="text-zinc-400 text-sm">
                      {template.description}
                    </Text>
                  </View>
                </View>

                <View className="flex-row gap-3 mb-3">
                  <View className="flex-1 bg-zinc-800 rounded-lg p-3">
                    <Text className="text-zinc-400 text-xs">Duración</Text>
                    <Text className="text-white font-bold text-lg">
                      {template.duration} sem
                    </Text>
                  </View>
                  <View className="flex-1 bg-zinc-800 rounded-lg p-3">
                    <Text className="text-zinc-400 text-xs">Fases</Text>
                    <Text className="text-white font-bold text-lg">
                      {template.phases}
                    </Text>
                  </View>
                </View>

                <TouchableOpacity
                  onPress={() => createProgram(template.id)}
                  className="bg-primary rounded-lg p-3"
                >
                  <Text className="text-white font-bold text-center">
                    Comenzar Programa
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        {/* Info Card */}
        <View className="px-6 pb-6 pt-4">
          <View className="bg-primary/10 rounded-xl p-4 border border-primary/30">
            <View className="flex-row items-start">
              <Ionicons name="information-circle" size={20} color="#9D12DE" />
              <View className="flex-1 ml-3">
                <Text className="text-primary/80 font-bold mb-2">
                  Periodización Inteligente
                </Text>
                <Text className="text-primary/60 text-sm">
                  Los programas periodizados alternan fases de volumen, intensidad y descanso para maximizar resultados y prevenir estancamiento.
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}


