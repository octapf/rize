import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function DeloadWeek() {
  const benefits = [
    { icon: 'fitness', title: 'Recovery Muscular', desc: 'Permite reparaciÃ³n completa de fibras' },
    { icon: 'pulse', title: 'Sistema Nervioso', desc: 'Restaura funciÃ³n del SNC' },
    { icon: 'water', title: 'Articulaciones', desc: 'Reduce inflamaciÃ³n acumulada' },
    { icon: 'trending-up', title: 'SupercompensaciÃ³n', desc: 'Vuelves mÃ¡s fuerte despuÃ©s' },
  ];

  const deloadMethods = [
    {
      name: 'Volume Deload',
      description: 'Reduce sets/reps 40-50%',
      example: '3 sets â†’ 2 sets, mantÃ©n peso',
      color: 'blue',
    },
    {
      name: 'Intensity Deload',
      description: 'Reduce peso 40-50%',
      example: '100kg â†’ 60kg, mantÃ©n volumen',
      color: 'emerald',
    },
    {
      name: 'Active Recovery',
      description: 'Cambio de actividad',
      example: 'Yoga, nataciÃ³n, cardio ligero',
      color: 'purple',
    },
  ];

  const sampleWorkout = [
    { exercise: 'Squat', normal: '4x6 @ 100kg', deload: '2x8 @ 60kg' },
    { exercise: 'Bench', normal: '4x8 @ 80kg', deload: '2x10 @ 50kg' },
    { exercise: 'Deadlift', normal: '3x5 @ 140kg', deload: '2x6 @ 80kg' },
    { exercise: 'Pull-ups', normal: '4x8', deload: '2x10' },
  ];

  return (
    <View className="flex-1 bg-zinc-950">
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1 ml-3">
            Deload Week
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          <View className="bg-gradient-to-r from-emerald-500 to-green-500 rounded-xl p-6 mb-6">
            <Text className="text-white text-2xl font-bold mb-2">Semana de Recovery</Text>
            <Text className="text-white opacity-90 mb-4">
              Esencial cada 4-6 semanas de entrenamiento intenso
            </Text>
            <View className="flex-row items-center">
              <Ionicons name="leaf" size={20} color="white" />
              <Text className="text-white ml-2">PrÃ³ximo deload: En 2 semanas</Text>
            </View>
          </View>

          <Text className="text-white font-bold text-lg mb-4">Beneficios del Deload</Text>

          {benefits.map((benefit, idx) => (
            <View key={idx} className="bg-zinc-900 rounded-xl p-4 mb-3 flex-row items-start border border-zinc-800">
              <View className="w-12 h-12 bg-primary rounded-xl items-center justify-center mr-4">
                <Ionicons name={benefit.icon as any} size={24} color="white" />
              </View>
              <View className="flex-1">
                <Text className="text-white font-bold mb-1">{benefit.title}</Text>
                <Text className="text-zinc-400 text-sm">{benefit.desc}</Text>
              </View>
            </View>
          ))}

          <Text className="text-white font-bold text-lg mb-4 mt-6">MÃ©todos de Deload</Text>

          {deloadMethods.map((method) => (
            <View
              key={method.name}
              className={`bg-${method.color}-500/10 rounded-xl p-5 mb-4 border border-${method.color}-500/30`}
            >
              <Text className="text-white font-bold text-lg mb-2">{method.name}</Text>
              <Text className="text-zinc-400 mb-3">{method.description}</Text>
              <View className={`bg-${method.color}-500/20 rounded-lg p-3`}>
                <Text className={`text-${method.color}-400 text-sm`}>
                  Ejemplo: {method.example}
                </Text>
              </View>
            </View>
          ))}

          <Text className="text-white font-bold text-lg mb-4 mt-6">Sample Deload Workout</Text>

          <View className="bg-zinc-900 rounded-xl p-4 mb-6 border border-zinc-800">
            <View className="flex-row border-b border-zinc-800 pb-2 mb-2">
              <Text className="text-zinc-400 font-bold flex-1">Exercise</Text>
              <Text className="text-zinc-400 font-bold flex-1">Normal</Text>
              <Text className="text-primary font-bold flex-1">Deload</Text>
            </View>

            {sampleWorkout.map((item, idx) => (
              <View key={idx} className="flex-row py-2 border-b border-zinc-800">
                <Text className="text-white flex-1">{item.exercise}</Text>
                <Text className="text-zinc-400 flex-1 text-sm">{item.normal}</Text>
                <Text className="text-primary flex-1 text-sm font-bold">{item.deload}</Text>
              </View>
            ))}
          </View>

          <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-6">
            <Text className="text-primary/80 font-bold mb-2">CuÃ¡ndo Hacer Deload</Text>
            <Text className="text-primary/60 text-sm">
              â€¢ Cada 4-6 semanas de training intenso{'\n'}
              â€¢ Si performance cae 2 sesiones seguidas{'\n'}
              â€¢ Fatiga persistente o dolores articulares{'\n'}
              â€¢ Antes de competencia (tapering){'\n'}
              â€¢ No es pereza, es estrategia
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

