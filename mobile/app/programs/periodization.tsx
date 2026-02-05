import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function PeriodizationPlanner() {
  const [selectedPhase, setSelectedPhase] = useState<string>('hypertrophy');

  const phases = [
    { key: 'hypertrophy', label: 'Hypertrophy', weeks: 4, sets: '3-5', reps: '8-12', intensity: '65-75%', color: 'blue' },
    { key: 'strength', label: 'Strength', weeks: 4, sets: '4-6', reps: '3-6', intensity: '80-90%', color: 'red' },
    { key: 'power', label: 'Power', weeks: 3, sets: '3-5', reps: '1-5', intensity: '85-95%', color: 'purple' },
    { key: 'deload', label: 'Deload', weeks: 1, sets: '2-3', reps: '8-10', intensity: '50-60%', color: 'emerald' },
  ];

  const mesocycles = [
    { 
      id: '1',
      name: 'Mesocycle 1: Foundation',
      duration: '4 weeks',
      phases: ['hypertrophy'],
      focus: 'Volumen y tÃ©cnica',
      completed: true,
    },
    {
      id: '2',
      name: 'Mesocycle 2: Strength Building',
      duration: '4 weeks',
      phases: ['strength'],
      focus: 'Incremento de fuerza',
      completed: true,
    },
    {
      id: '3',
      name: 'Mesocycle 3: Peak',
      duration: '3 weeks',
      phases: ['power'],
      focus: 'Picos de fuerza',
      completed: false,
    },
    {
      id: '4',
      name: 'Deload Week',
      duration: '1 week',
      phases: ['deload'],
      focus: 'Recovery activo',
      completed: false,
    },
  ];

  return (
    <View className="flex-1 bg-zinc-950">
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1 ml-3">
            Periodization
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          <View className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl p-6 mb-6">
            <Text className="text-white text-2xl font-bold mb-2">PlanificaciÃ³n Avanzada</Text>
            <Text className="text-white opacity-90 mb-4">
              Programa tu entrenamiento por fases
            </Text>
            <View className="flex-row items-center">
              <Ionicons name="calendar" size={20} color="white" />
              <Text className="text-white ml-2">12 semanas programadas</Text>
            </View>
          </View>

          <Text className="text-white font-bold text-lg mb-4">Training Phases</Text>

          {phases.map((phase) => (
            <TouchableOpacity
              key={phase.key}
              onPress={() => setSelectedPhase(phase.key)}
              className={`bg-${phase.color}-500/10 rounded-xl p-5 mb-4 border border-${phase.color}-500/30`}
            >
              <View className="flex-row items-center mb-3">
                <View className={`w-12 h-12 bg-${phase.color}-500 rounded-xl items-center justify-center mr-4`}>
                  <Ionicons name="barbell" size={24} color="white" />
                </View>
                <View className="flex-1">
                  <Text className="text-white font-bold text-lg">{phase.label}</Text>
                  <Text className={`text-${phase.color}-400`}>{phase.weeks} semanas</Text>
                </View>
              </View>

              <View className="flex-row flex-wrap gap-2">
                <View className={`bg-${phase.color}-500/20 rounded-lg px-3 py-2`}>
                  <Text className={`text-${phase.color}-400 text-sm font-bold`}>
                    Sets: {phase.sets}
                  </Text>
                </View>
                <View className={`bg-${phase.color}-500/20 rounded-lg px-3 py-2`}>
                  <Text className={`text-${phase.color}-400 text-sm font-bold`}>
                    Reps: {phase.reps}
                  </Text>
                </View>
                <View className={`bg-${phase.color}-500/20 rounded-lg px-3 py-2`}>
                  <Text className={`text-${phase.color}-400 text-sm font-bold`}>
                    Intensity: {phase.intensity}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}

          <Text className="text-white font-bold text-lg mb-4 mt-6">Mesocycles</Text>

          {mesocycles.map((meso) => (
            <View
              key={meso.id}
              className={`bg-zinc-900 rounded-xl p-5 mb-4 border ${
                meso.completed ? 'border-primary' : 'border-zinc-800'
              }`}
            >
              <View className="flex-row items-start justify-between mb-3">
                <View className="flex-1">
                  <Text className="text-white font-bold text-lg mb-1">{meso.name}</Text>
                  <Text className="text-zinc-400 text-sm">{meso.duration}</Text>
                </View>
                {meso.completed && (
                  <View className="bg-primary rounded-full px-3 py-1">
                    <Text className="text-white text-xs font-bold">DONE</Text>
                  </View>
                )}
              </View>

              <View className="bg-zinc-800 rounded-lg p-3 mb-2">
                <Text className="text-zinc-400 text-sm mb-1">Focus:</Text>
                <Text className="text-white font-bold">{meso.focus}</Text>
              </View>

              {!meso.completed && (
                <TouchableOpacity className="bg-primary rounded-xl py-3 mt-2">
                  <Text className="text-white font-bold text-center">Start Mesocycle</Text>
                </TouchableOpacity>
              )}
            </View>
          ))}

          <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-6">
            <Text className="text-primary/80 font-bold mb-2">PeriodizaciÃ³n Explicada</Text>
            <Text className="text-primary/60 text-sm">
              â€¢ Previene estancamiento y overtraining{'\n'}
              â€¢ Mesociclos de 3-6 semanas{'\n'}
              â€¢ Deload cada 4-6 semanas{'\n'}
              â€¢ ProgresiÃ³n estructurada{'\n'}
              â€¢ Picos de rendimiento planificados
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

