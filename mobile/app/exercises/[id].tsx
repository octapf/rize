import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Card } from '@/components/ui/Card';
import { LineChart } from 'react-native-chart-kit';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface ExerciseRecord {
  id: string;
  date: Date;
  weight: number;
  reps: number;
  volume: number;
  oneRM: number;
}

const mockExercise = {
  id: 'bench-press',
  name: 'Bench Press',
  description: 'Press de banca con barra. Ejercicio compuesto principal para pecho.',
  muscleGroup: 'Pecho',
  equipment: 'Barra',
  difficulty: 'Intermedio',
  instructions: [
    'Acuéstate en el banco con los pies firmes en el suelo',
    'Agarra la barra con un agarre ligeramente más ancho que los hombros',
    'Baja la barra de manera controlada hasta el pecho',
    'Empuja hacia arriba de manera explosiva hasta la posición inicial',
    'Mantén los omóplatos juntos durante todo el movimiento',
  ],
  tips: [
    'Mantén la espalda baja arqueada ligeramente',
    'No rebotes la barra en el pecho',
    'Controla la respiración: inhala al bajar, exhala al subir',
    'Usa un spotter para pesos máximos',
  ],
  personalRecord: {
    weight: 100,
    reps: 5,
    date: new Date(2026, 0, 20),
    oneRM: 112.5,
  },
  totalVolume: 45600,
  totalSets: 156,
  lastPerformed: new Date(2026, 0, 24),
};

const mockHistory: ExerciseRecord[] = [
  { id: '1', date: new Date(2026, 0, 24), weight: 90, reps: 6, volume: 540, oneRM: 107.1 },
  { id: '2', date: new Date(2026, 0, 22), weight: 95, reps: 5, volume: 475, oneRM: 106.9 },
  { id: '3', date: new Date(2026, 0, 20), weight: 100, reps: 5, volume: 500, oneRM: 112.5 },
  { id: '4', date: new Date(2026, 0, 18), weight: 85, reps: 8, volume: 680, oneRM: 105.9 },
  { id: '5', date: new Date(2026, 0, 16), weight: 90, reps: 6, volume: 540, oneRM: 107.1 },
];

export default function ExerciseDetailScreen() {
  const params = useLocalSearchParams();
  const exerciseId = params.id as string;

  const [activeTab, setActiveTab] = useState<'info' | 'progress' | 'history'>('info');

  const exercise = mockExercise;
  const history = mockHistory;

  const chartData = {
    labels: history.slice(0, 6).reverse().map(h => format(h.date, 'dd/MM')),
    datasets: [{
      data: history.slice(0, 6).reverse().map(h => h.oneRM)
    }]
  };

  const handleAddToWorkout = () => {
    Alert.alert('Añadido', `${exercise.name} añadido al entrenamiento actual`);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'principiante': return '#10B981';
      case 'intermedio': return '#F59E0B';
      case 'avanzado': return '#EF4444';
      default: return '#6B7280';
    }
  };

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <LinearGradient colors={['#10B981', '#059669']} className="px-6 pt-12 pb-6">
        <View className="flex-row items-center justify-between mb-4">
          <TouchableOpacity onPress={() => router.back()} className="p-2">
            <Ionicons name="arrow-back" size={28} color="white" />
          </TouchableOpacity>
          <TouchableOpacity className="p-2">
            <Ionicons name="bookmark-outline" size={28} color="white" />
          </TouchableOpacity>
        </View>

        <Text className="text-white text-3xl font-bold mb-2">{exercise.name}</Text>
        
        <View className="flex-row items-center gap-3 mb-4">
          <View
            className="px-3 py-1 rounded-full"
            style={{ backgroundColor: getDifficultyColor(exercise.difficulty) + '40' }}
          >
            <Text className="text-white font-semibold text-sm">
              {exercise.difficulty}
            </Text>
          </View>
          <View className="bg-white/20 px-3 py-1 rounded-full">
            <Text className="text-white font-semibold text-sm">
              {exercise.muscleGroup}
            </Text>
          </View>
          <View className="bg-white/20 px-3 py-1 rounded-full">
            <Text className="text-white font-semibold text-sm">
              {exercise.equipment}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={handleAddToWorkout}
          className="bg-white py-3 rounded-lg flex-row items-center justify-center gap-2"
        >
          <Ionicons name="add-circle" size={24} color="#10B981" />
          <Text className="text-emerald-600 font-bold text-base">
            Añadir a Entrenamiento
          </Text>
        </TouchableOpacity>
      </LinearGradient>

      {/* Tabs */}
      <View className="flex-row bg-white border-b border-gray-200 px-6">
        {(['info', 'progress', 'history'] as const).map(tab => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab)}
            className={`flex-1 py-3 ${activeTab === tab ? 'border-b-2 border-emerald-500' : ''}`}
          >
            <Text className={`text-center font-semibold capitalize ${activeTab === tab ? 'text-emerald-600' : 'text-gray-600'}`}>
              {tab === 'info' ? 'Info' : tab === 'progress' ? 'Progreso' : 'Historial'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView className="flex-1" contentContainerClassName="p-6">
        {activeTab === 'info' && (
          <>
            {/* Description */}
            <Card className="p-4 mb-4">
              <Text className="text-gray-900 font-bold text-lg mb-2">Descripción</Text>
              <Text className="text-gray-700">{exercise.description}</Text>
            </Card>

            {/* Instructions */}
            <Card className="p-4 mb-4">
              <Text className="text-gray-900 font-bold text-lg mb-3">Instrucciones</Text>
              <View className="gap-3">
                {exercise.instructions.map((instruction, i) => (
                  <View key={i} className="flex-row gap-3">
                    <View className="w-6 h-6 bg-emerald-500 rounded-full items-center justify-center">
                      <Text className="text-white font-bold text-xs">{i + 1}</Text>
                    </View>
                    <Text className="text-gray-700 flex-1">{instruction}</Text>
                  </View>
                ))}
              </View>
            </Card>

            {/* Tips */}
            <Card className="p-4 bg-blue-50 border-blue-200">
              <View className="flex-row items-center gap-2 mb-3">
                <Ionicons name="bulb" size={24} color="#3B82F6" />
                <Text className="text-blue-900 font-bold text-lg">Consejos</Text>
              </View>
              <View className="gap-2">
                {exercise.tips.map((tip, i) => (
                  <View key={i} className="flex-row gap-2">
                    <Text className="text-blue-700">•</Text>
                    <Text className="text-blue-700 flex-1">{tip}</Text>
                  </View>
                ))}
              </View>
            </Card>
          </>
        )}

        {activeTab === 'progress' && (
          <>
            {/* Personal Record */}
            <Card className="p-4 mb-4 bg-gradient-to-r from-purple-50 to-pink-50">
              <Text className="text-purple-900 font-bold text-lg mb-3">
                Récord Personal
              </Text>
              <View className="flex-row items-center justify-between">
                <View>
                  <Text className="text-gray-600 text-sm">Peso Máximo (1RM)</Text>
                  <Text className="text-purple-700 font-bold text-3xl">
                    {exercise.personalRecord.oneRM} kg
                  </Text>
                  <Text className="text-gray-500 text-xs mt-1">
                    {exercise.personalRecord.weight}kg × {exercise.personalRecord.reps} reps
                  </Text>
                  <Text className="text-gray-500 text-xs">
                    {format(exercise.personalRecord.date, "dd 'de' MMMM", { locale: es })}
                  </Text>
                </View>
                <Ionicons name="trophy" size={64} color="#A855F7" />
              </View>
            </Card>

            {/* Stats */}
            <View className="flex-row gap-3 mb-4">
              <Card className="flex-1 p-3">
                <Text className="text-gray-600 text-xs mb-1">Volumen Total</Text>
                <Text className="text-gray-900 font-bold text-xl">
                  {(exercise.totalVolume / 1000).toFixed(1)}k
                </Text>
              </Card>
              <Card className="flex-1 p-3">
                <Text className="text-gray-600 text-xs mb-1">Series Totales</Text>
                <Text className="text-gray-900 font-bold text-xl">
                  {exercise.totalSets}
                </Text>
              </Card>
            </View>

            {/* Chart */}
            <Card className="p-4 mb-4">
              <Text className="text-gray-900 font-bold text-lg mb-3">
                Progreso 1RM
              </Text>
              <LineChart
                data={chartData}
                width={320}
                height={200}
                chartConfig={{
                  backgroundColor: '#ffffff',
                  backgroundGradientFrom: '#ffffff',
                  backgroundGradientTo: '#ffffff',
                  decimalPlaces: 1,
                  color: (opacity = 1) => `rgba(16, 185, 129, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(107, 114, 128, ${opacity})`,
                }}
                bezier
                style={{ borderRadius: 16 }}
              />
            </Card>
          </>
        )}

        {activeTab === 'history' && (
          <Card className="p-4">
            <Text className="text-gray-900 font-bold text-lg mb-3">
              Historial de Entrenamientos
            </Text>
            <View className="gap-2">
              {history.map(record => (
                <View key={record.id} className="p-3 bg-gray-50 rounded-lg">
                  <View className="flex-row items-center justify-between mb-1">
                    <Text className="text-gray-900 font-semibold">
                      {record.weight}kg × {record.reps}
                    </Text>
                    <Text className="text-emerald-600 font-bold">
                      {record.oneRM.toFixed(1)} kg 1RM
                    </Text>
                  </View>
                  <View className="flex-row items-center justify-between">
                    <Text className="text-gray-500 text-sm">
                      {format(record.date, "dd 'de' MMMM", { locale: es })}
                    </Text>
                    <Text className="text-gray-600 text-sm">
                      Vol: {record.volume}kg
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </Card>
        )}
      </ScrollView>
    </View>
  );
}
