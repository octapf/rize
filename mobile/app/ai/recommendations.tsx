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

interface WorkoutRecommendation {
  id: string;
  type: 'recovery' | 'deload' | 'intensity' | 'volume';
  title: string;
  description: string;
  reason: string;
  confidence: number;
  workout: {
    name: string;
    duration: number;
    exercises: number;
    difficulty: 'baja' | 'media' | 'alta';
  };
}

const RECOMMENDATIONS: WorkoutRecommendation[] = [
  {
    id: '1',
    type: 'recovery',
    title: 'Sesión de Recuperación Activa',
    description: 'Ejercicios de movilidad y trabajo ligero',
    reason: 'Tu fatiga muscular está alta (8/10). Necesitas recuperación.',
    confidence: 94,
    workout: {
      name: 'Movilidad y Estiramientos',
      duration: 30,
      exercises: 8,
      difficulty: 'baja',
    },
  },
  {
    id: '2',
    type: 'intensity',
    title: 'Entrenamiento de Fuerza',
    description: 'Enfoque en levantamientos pesados con bajo volumen',
    reason: 'Llevas 3 semanas sin trabajar máximos. Momento ideal.',
    confidence: 87,
    workout: {
      name: 'Fuerza 5x3',
      duration: 60,
      exercises: 5,
      difficulty: 'alta',
    },
  },
  {
    id: '3',
    type: 'volume',
    title: 'Alto Volumen - Hipertrofia',
    description: 'Múltiples series para maximizar crecimiento muscular',
    reason: 'Tu recuperación es óptima. Puedes tolerar más volumen.',
    confidence: 82,
    workout: {
      name: 'Hipertrofia Push 4x12',
      duration: 75,
      exercises: 7,
      difficulty: 'media',
    },
  },
];

export default function SmartRecommendations() {
  const [selectedRecommendation, setSelectedRecommendation] = useState<string | null>(null);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'recovery':
        return '#10B981';
      case 'deload':
        return '#F59E0B';
      case 'intensity':
        return '#EF4444';
      case 'volume':
        return '#3B82F6';
      default:
        return '#71717A';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'recovery':
        return 'RECUPERACIÓN';
      case 'deload':
        return 'DESCARGA';
      case 'intensity':
        return 'INTENSIDAD';
      case 'volume':
        return 'VOLUMEN';
      default:
        return 'OTRO';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'baja':
        return '#10B981';
      case 'media':
        return '#F59E0B';
      case 'alta':
        return '#EF4444';
      default:
        return '#71717A';
    }
  };

  const startWorkout = (recommendation: WorkoutRecommendation) => {
    Alert.alert(
      'Iniciar Entrenamiento',
      `${recommendation.workout.name}\n\nDuración: ${recommendation.workout.duration} min\nEjercicios: ${recommendation.workout.exercises}\n\n¿Comenzar ahora?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Iniciar',
          onPress: () => {
            Alert.alert('¡Entrenamiento Iniciado!', 'Ve a la pestaña de entrenamientos para continuar');
            router.push('/workouts/active');
          },
        },
      ]
    );
  };

  const customizeWorkout = (recommendation: WorkoutRecommendation) => {
    Alert.alert(
      'Personalizar',
      'Selecciona qué deseas modificar',
      [
        { text: 'Cambiar Ejercicios', onPress: () => Alert.alert('Ejercicios', 'Próximamente') },
        { text: 'Ajustar Volumen', onPress: () => Alert.alert('Volumen', 'Próximamente') },
        { text: 'Modificar Intensidad', onPress: () => Alert.alert('Intensidad', 'Próximamente') },
        { text: 'Cancelar', style: 'cancel' },
      ]
    );
  };

  const explainRecommendation = (recommendation: WorkoutRecommendation) => {
    Alert.alert(
      '¿Por qué esta recomendación?',
      `Basado en:\n\n• Nivel de fatiga actual\n• Historial de entrenamientos\n• Objetivos establecidos\n• Tiempo desde último entrenamiento similar\n• Métricas de recuperación\n\nConfianza: ${recommendation.confidence}%`,
      [{ text: 'Entendido' }]
    );
  };

  return (
    <View className="flex-1 bg-zinc-950">
      {/* Header */}
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1 ml-3">
            Recomendaciones IA
          </Text>
          <TouchableOpacity>
            <Ionicons name="settings-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* AI Status */}
        <View className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl p-4">
          <View className="flex-row items-center justify-between">
            <View className="flex-1">
              <View className="flex-row items-center mb-2">
                <View className="bg-white/20 rounded-full w-2 h-2 mr-2 animate-pulse" />
                <Text className="text-white font-bold">IA Analizando</Text>
              </View>
              <Text className="text-white/80 text-sm">
                Basado en tus últimos 30 entrenamientos
              </Text>
            </View>
            <View className="bg-white/20 rounded-full p-3">
              <Ionicons name="bulb" size={24} color="white" />
            </View>
          </View>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Today's Best Match */}
        <View className="px-6 pt-6">
          <View className="flex-row items-center mb-3">
            <Ionicons name="star" size={20} color="#F59E0B" />
            <Text className="text-white font-bold text-lg ml-2">
              Mejor Opción para Hoy
            </Text>
          </View>

          {RECOMMENDATIONS.length > 0 && (
            <View className="bg-zinc-900 rounded-xl border-2 border-emerald-500 p-4 mb-6">
              <View className="flex-row items-center justify-between mb-3">
                <View
                  className="px-3 py-1 rounded-full"
                  style={{ backgroundColor: getTypeColor(RECOMMENDATIONS[0].type) + '20' }}
                >
                  <Text
                    className="text-xs font-bold"
                    style={{ color: getTypeColor(RECOMMENDATIONS[0].type) }}
                  >
                    {getTypeLabel(RECOMMENDATIONS[0].type)}
                  </Text>
                </View>
                <View className="bg-emerald-500/20 px-3 py-1 rounded-full">
                  <Text className="text-emerald-500 font-bold text-sm">
                    {RECOMMENDATIONS[0].confidence}% confianza
                  </Text>
                </View>
              </View>

              <Text className="text-white font-bold text-xl mb-2">
                {RECOMMENDATIONS[0].title}
              </Text>
              <Text className="text-zinc-400 mb-3">
                {RECOMMENDATIONS[0].description}
              </Text>

              <View className="bg-blue-500/10 rounded-lg p-3 mb-3">
                <View className="flex-row items-start">
                  <Ionicons name="information-circle" size={16} color="#3B82F6" />
                  <Text className="text-blue-400 text-sm ml-2 flex-1">
                    {RECOMMENDATIONS[0].reason}
                  </Text>
                </View>
              </View>

              {/* Workout Details */}
              <View className="bg-zinc-800 rounded-lg p-3 mb-3">
                <Text className="text-white font-bold mb-2">
                  {RECOMMENDATIONS[0].workout.name}
                </Text>
                <View className="flex-row gap-2">
                  <View className="flex-1 bg-zinc-900 rounded p-2">
                    <Text className="text-zinc-400 text-xs">Duración</Text>
                    <Text className="text-white font-bold">
                      {RECOMMENDATIONS[0].workout.duration} min
                    </Text>
                  </View>
                  <View className="flex-1 bg-zinc-900 rounded p-2">
                    <Text className="text-zinc-400 text-xs">Ejercicios</Text>
                    <Text className="text-white font-bold">
                      {RECOMMENDATIONS[0].workout.exercises}
                    </Text>
                  </View>
                  <View className="flex-1 bg-zinc-900 rounded p-2">
                    <Text className="text-zinc-400 text-xs">Dificultad</Text>
                    <Text
                      className="font-bold capitalize"
                      style={{ color: getDifficultyColor(RECOMMENDATIONS[0].workout.difficulty) }}
                    >
                      {RECOMMENDATIONS[0].workout.difficulty}
                    </Text>
                  </View>
                </View>
              </View>

              {/* Actions */}
              <View className="flex-row gap-2">
                <TouchableOpacity
                  onPress={() => startWorkout(RECOMMENDATIONS[0])}
                  className="flex-1 bg-emerald-500 rounded-lg p-3"
                >
                  <Text className="text-white font-bold text-center">
                    Comenzar Ahora
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => customizeWorkout(RECOMMENDATIONS[0])}
                  className="bg-zinc-800 rounded-lg p-3"
                >
                  <Ionicons name="options" size={20} color="white" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => explainRecommendation(RECOMMENDATIONS[0])}
                  className="bg-zinc-800 rounded-lg p-3"
                >
                  <Ionicons name="help-circle-outline" size={20} color="white" />
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* Other Recommendations */}
          <Text className="text-white font-bold text-lg mb-3">
            Otras Opciones
          </Text>

          {RECOMMENDATIONS.slice(1).map((recommendation) => (
            <TouchableOpacity
              key={recommendation.id}
              onPress={() =>
                setSelectedRecommendation(
                  selectedRecommendation === recommendation.id ? null : recommendation.id
                )
              }
              className="bg-zinc-900 rounded-xl p-4 mb-3 border border-zinc-800"
            >
              <View className="flex-row items-center justify-between mb-2">
                <View
                  className="px-3 py-1 rounded-full"
                  style={{ backgroundColor: getTypeColor(recommendation.type) + '20' }}
                >
                  <Text
                    className="text-xs font-bold"
                    style={{ color: getTypeColor(recommendation.type) }}
                  >
                    {getTypeLabel(recommendation.type)}
                  </Text>
                </View>
                <Text className="text-zinc-400 text-sm">
                  {recommendation.confidence}% confianza
                </Text>
              </View>

              <Text className="text-white font-bold text-lg mb-2">
                {recommendation.title}
              </Text>
              <Text className="text-zinc-400 text-sm mb-2">
                {recommendation.description}
              </Text>

              {selectedRecommendation === recommendation.id && (
                <>
                  <View className="bg-zinc-800 rounded-lg p-3 mb-3">
                    <Text className="text-zinc-400 text-xs mb-2">Razón</Text>
                    <Text className="text-white text-sm">{recommendation.reason}</Text>
                  </View>

                  <View className="bg-zinc-800 rounded-lg p-3 mb-3">
                    <Text className="text-white font-bold mb-2">
                      {recommendation.workout.name}
                    </Text>
                    <View className="flex-row gap-2">
                      <View className="flex-1 bg-zinc-900 rounded p-2">
                        <Text className="text-zinc-400 text-xs">Duración</Text>
                        <Text className="text-white font-semibold text-sm">
                          {recommendation.workout.duration} min
                        </Text>
                      </View>
                      <View className="flex-1 bg-zinc-900 rounded p-2">
                        <Text className="text-zinc-400 text-xs">Ejercicios</Text>
                        <Text className="text-white font-semibold text-sm">
                          {recommendation.workout.exercises}
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View className="flex-row gap-2">
                    <TouchableOpacity
                      onPress={() => startWorkout(recommendation)}
                      className="flex-1 bg-emerald-500 rounded-lg p-3"
                    >
                      <Text className="text-white font-semibold text-center">Iniciar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => customizeWorkout(recommendation)}
                      className="flex-1 bg-zinc-800 rounded-lg p-3"
                    >
                      <Text className="text-white font-semibold text-center">
                        Personalizar
                      </Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Settings */}
        <View className="px-6 pb-6">
          <Text className="text-white font-bold text-lg mb-3">
            Preferencias de IA
          </Text>

          <TouchableOpacity className="bg-zinc-900 rounded-xl p-4 mb-3 border border-zinc-800">
            <View className="flex-row items-center justify-between">
              <View className="flex-1">
                <Text className="text-white font-semibold">Objetivos Prioritarios</Text>
                <Text className="text-zinc-400 text-sm mt-1">
                  Hipertrofia, Fuerza
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#71717A" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity className="bg-zinc-900 rounded-xl p-4 mb-3 border border-zinc-800">
            <View className="flex-row items-center justify-between">
              <View className="flex-1">
                <Text className="text-white font-semibold">Días Disponibles</Text>
                <Text className="text-zinc-400 text-sm mt-1">
                  Lun, Mié, Vie, Sáb
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#71717A" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity className="bg-zinc-900 rounded-xl p-4 border border-zinc-800">
            <View className="flex-row items-center justify-between">
              <View className="flex-1">
                <Text className="text-white font-semibold">Equipamiento</Text>
                <Text className="text-zinc-400 text-sm mt-1">
                  Gimnasio completo
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#71717A" />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
