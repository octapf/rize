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

interface Measurement {
  bodyPart: string;
  current: number;
  target: number;
  unit: string;
}

interface BodyTransformationGoal {
  id: string;
  name: string;
  startDate: Date;
  targetDate: Date;
  startWeight: number;
  targetWeight: number;
  currentWeight: number;
  measurements: Measurement[];
  photoCheckIns: number;
  weeklyCheckIns: number;
  status: 'active' | 'completed' | 'paused';
  notes?: string;
}

const MOCK_GOAL: BodyTransformationGoal = {
  id: '1',
  name: 'Bulk de Invierno 2026',
  startDate: new Date(2025, 11, 1),
  targetDate: new Date(2026, 2, 31),
  startWeight: 75,
  targetWeight: 82,
  currentWeight: 78.5,
  measurements: [
    { bodyPart: 'Brazos', current: 38, target: 42, unit: 'cm' },
    { bodyPart: 'Pecho', current: 102, target: 108, unit: 'cm' },
    { bodyPart: 'Piernas', current: 58, target: 62, unit: 'cm' },
    { bodyPart: 'Cintura', current: 82, target: 85, unit: 'cm' },
  ],
  photoCheckIns: 8,
  weeklyCheckIns: 12,
  status: 'active',
  notes: 'Objetivo: +0.5kg por semana, proteÃ­na 2g/kg',
};

export default function TransformationGoals() {
  const [goal, setGoal] = useState<BodyTransformationGoal>(MOCK_GOAL);
  const [showEditForm, setShowEditForm] = useState(false);

  const getDaysRemaining = () => {
    const now = new Date();
    const diff = goal.targetDate.getTime() - now.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const getWeeksElapsed = () => {
    const now = new Date();
    const diff = now.getTime() - goal.startDate.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24 * 7));
  };

  const getWeightProgress = () => {
    const total = goal.targetWeight - goal.startWeight;
    const current = goal.currentWeight - goal.startWeight;
    return Math.round((current / total) * 100);
  };

  const getWeightChange = () => {
    return (goal.currentWeight - goal.startWeight).toFixed(1);
  };

  const getWeeklyRate = () => {
    const weeks = getWeeksElapsed();
    if (weeks === 0) return '0.0';
    const change = goal.currentWeight - goal.startWeight;
    return (change / weeks).toFixed(2);
  };

  const updateCurrentWeight = () => {
    Alert.prompt(
      'Actualizar Peso',
      'Ingresa tu peso actual (kg)',
      [
        { text: 'Cancelar' },
        {
          text: 'Guardar',
          onPress: (value) => {
            const newWeight = parseFloat(value || '0');
            if (newWeight > 0) {
              setGoal({ ...goal, currentWeight: newWeight, weeklyCheckIns: goal.weeklyCheckIns + 1 });
              Alert.alert('Peso Actualizado! âš–ï¸', `Nuevo peso: ${newWeight}kg`);
            }
          },
        },
      ],
      'plain-text',
      goal.currentWeight.toString()
    );
  };

  const addPhotoCheckIn = () => {
    Alert.alert(
      'Foto de Progreso',
      'Funcionalidad de cÃ¡mara en desarrollo',
      [
        {
          text: 'OK',
          onPress: () => setGoal({ ...goal, photoCheckIns: goal.photoCheckIns + 1 }),
        },
      ]
    );
  };

  const updateMeasurement = (index: number) => {
    const measurement = goal.measurements[index];
    Alert.prompt(
      `Actualizar ${measurement.bodyPart}`,
      `Ingresa medida actual (${measurement.unit})`,
      [
        { text: 'Cancelar' },
        {
          text: 'Guardar',
          onPress: (value) => {
            const newValue = parseFloat(value || '0');
            if (newValue > 0) {
              const newMeasurements = [...goal.measurements];
              newMeasurements[index] = { ...measurement, current: newValue };
              setGoal({ ...goal, measurements: newMeasurements });
              Alert.alert('Medida Actualizada! ðŸ“');
            }
          },
        },
      ],
      'plain-text',
      measurement.current.toString()
    );
  };

  const getMeasurementProgress = (measurement: Measurement) => {
    const total = Math.abs(measurement.target - measurement.current);
    const start = measurement.current;
    return Math.round((Math.abs(measurement.current - start) / total) * 100);
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
            Transformation Goal
          </Text>
          <TouchableOpacity onPress={() => setShowEditForm(!showEditForm)}>
            <Ionicons name="settings" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          {/* Goal Header */}
          <View className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-6 mb-6">
            <Text className="text-white text-2xl font-bold mb-2">{goal.name}</Text>
            <View className="flex-row items-center mb-4">
              <Ionicons name="calendar" size={16} color="white" />
              <Text className="text-white opacity-90 ml-2">
                {goal.startDate.toLocaleDateString('es-ES', { month: 'short', day: 'numeric' })} -{' '}
                {goal.targetDate.toLocaleDateString('es-ES', { month: 'short', day: 'numeric', year: 'numeric' })}
              </Text>
            </View>
            <View className="bg-white/20 rounded-lg p-3">
              <Text className="text-white font-bold text-lg">
                {getDaysRemaining()} dÃ­as restantes
              </Text>
              <Text className="text-white opacity-90 text-sm">
                {getWeeksElapsed()} semanas transcurridas
              </Text>
            </View>
          </View>

          {/* Weight Progress */}
          <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
            <Text className="text-white font-bold text-lg mb-4">Progreso de Peso</Text>
            
            {/* Current vs Target */}
            <View className="flex-row justify-between mb-4">
              <View className="flex-1 bg-primary/10 rounded-lg p-4 mr-2 border border-primary/30">
                <Text className="text-primary/80 text-xs mb-1">Actual</Text>
                <Text className="text-white text-3xl font-bold">{goal.currentWeight}</Text>
                <Text className="text-primary/60 text-sm">kg</Text>
              </View>
              <View className="flex-1 bg-primary/10 rounded-lg p-4 ml-2 border border-primary/30">
                <Text className="text-primary text-xs mb-1">Objetivo</Text>
                <Text className="text-white text-3xl font-bold">{goal.targetWeight}</Text>
                <Text className="text-primary/80 text-sm">kg</Text>
              </View>
            </View>

            {/* Progress Bar */}
            <View className="mb-4">
              <View className="flex-row items-center justify-between mb-2">
                <Text className="text-zinc-400 text-sm">Progreso</Text>
                <Text className="text-white font-bold">{getWeightProgress()}%</Text>
              </View>
              <View className="h-3 bg-zinc-800 rounded-full overflow-hidden">
                <View 
                  className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full"
                  style={{ width: `${Math.min(getWeightProgress(), 100)}%` }}
                />
              </View>
            </View>

            {/* Stats */}
            <View className="flex-row gap-2 mb-4">
              <View className="flex-1 bg-zinc-800 rounded-lg p-3">
                <Text className="text-zinc-400 text-xs mb-1">Cambio Total</Text>
                <Text className="text-primary font-bold text-lg">+{getWeightChange()} kg</Text>
              </View>
              <View className="flex-1 bg-zinc-800 rounded-lg p-3">
                <Text className="text-zinc-400 text-xs mb-1">Ritmo Semanal</Text>
                <Text className="text-primary/80 font-bold text-lg">+{getWeeklyRate()} kg/sem</Text>
              </View>
              <View className="flex-1 bg-zinc-800 rounded-lg p-3">
                <Text className="text-zinc-400 text-xs mb-1">Restante</Text>
                <Text className="text-amber-400 font-bold text-lg">
                  {(goal.targetWeight - goal.currentWeight).toFixed(1)} kg
                </Text>
              </View>
            </View>

            {/* Update Button */}
            <TouchableOpacity
              onPress={updateCurrentWeight}
              className="bg-primary rounded-xl p-4 flex-row items-center justify-center"
            >
              <Ionicons name="add-circle" size={20} color="white" />
              <Text className="text-white font-bold ml-2">Actualizar Peso</Text>
            </TouchableOpacity>
          </View>

          {/* Measurements */}
          <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
            <Text className="text-white font-bold text-lg mb-4">Medidas Corporales</Text>
            
            {goal.measurements.map((measurement, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => updateMeasurement(index)}
                className="mb-4 last:mb-0"
              >
                <View className="flex-row items-center justify-between mb-2">
                  <Text className="text-white font-bold">{measurement.bodyPart}</Text>
                  <Text className="text-zinc-400 text-sm">
                    {measurement.current} â†’ {measurement.target} {measurement.unit}
                  </Text>
                </View>
                <View className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                  <View 
                    className="h-full bg-purple-500 rounded-full"
                    style={{ 
                      width: `${Math.min(
                        ((measurement.current - (measurement.current)) / (measurement.target - measurement.current)) * 100,
                        100
                      )}%` 
                    }}
                  />
                </View>
                <View className="flex-row justify-between mt-1">
                  <Text className="text-zinc-500 text-xs">
                    Faltan {(measurement.target - measurement.current).toFixed(1)} {measurement.unit}
                  </Text>
                  <Text className="text-purple-400 text-xs font-bold">
                    Tap para actualizar
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Photo Check-ins */}
          <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-white font-bold text-lg">Fotos de Progreso</Text>
              <View className="bg-pink-500/10 rounded-full px-3 py-1 border border-pink-500/30">
                <Text className="text-pink-400 font-bold">{goal.photoCheckIns} fotos</Text>
              </View>
            </View>
            
            <View className="bg-zinc-800 rounded-lg p-4 mb-4">
              <View className="flex-row items-center mb-2">
                <Ionicons name="camera" size={24} color="#EC4899" />
                <Text className="text-white font-bold ml-3">Toma fotos cada semana</Text>
              </View>
              <Text className="text-zinc-400 text-sm">
                Misma pose, misma luz, mismo Ã¡ngulo. Las fotos &gt; bÃ¡scula.
              </Text>
            </View>

            <TouchableOpacity
              onPress={addPhotoCheckIn}
              className="bg-pink-500 rounded-xl p-4 flex-row items-center justify-center"
            >
              <Ionicons name="camera" size={20} color="white" />
              <Text className="text-white font-bold ml-2">Agregar Foto de Progreso</Text>
            </TouchableOpacity>
          </View>

          {/* Weekly Check-ins */}
          <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
            <Text className="text-white font-bold text-lg mb-4">Check-ins Semanales</Text>
            
            <View className="flex-row gap-3 mb-4">
              <View className="flex-1 bg-primary/10 rounded-lg p-4 border border-primary/30">
                <Text className="text-primary text-xs mb-1">Total Check-ins</Text>
                <Text className="text-white text-3xl font-bold">{goal.weeklyCheckIns}</Text>
              </View>
              <View className="flex-1 bg-primary/10 rounded-lg p-4 border border-primary/30">
                <Text className="text-primary/80 text-xs mb-1">Consistencia</Text>
                <Text className="text-white text-3xl font-bold">
                  {Math.round((goal.weeklyCheckIns / getWeeksElapsed()) * 100)}%
                </Text>
              </View>
            </View>

            <View className="bg-zinc-800 rounded-lg p-4">
              <Text className="text-zinc-300 text-sm mb-2">
                âœ“ Mide peso y medidas corporales{'\n'}
                âœ“ Toma fotos de progreso{'\n'}
                âœ“ EvalÃºa energÃ­a y rendimiento{'\n'}
                âœ“ Ajusta plan segÃºn resultados
              </Text>
            </View>
          </View>

          {/* Notes */}
          {goal.notes && (
            <View className="bg-amber-500/10 rounded-xl p-4 border border-amber-500/30 mb-6">
              <View className="flex-row items-start">
                <Ionicons name="document-text" size={20} color="#FFEA00" />
                <View className="flex-1 ml-3">
                  <Text className="text-amber-400 font-bold mb-2">Notas del Plan</Text>
                  <Text className="text-amber-300 text-sm">{goal.notes}</Text>
                </View>
              </View>
            </View>
          )}

          {/* Tips */}
          <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-6">
            <View className="flex-row items-start">
              <Ionicons name="bulb" size={20} color="#9D12DE" />
              <View className="flex-1 ml-3">
                <Text className="text-primary/80 font-bold mb-2">
                  Tips de TransformaciÃ³n
                </Text>
                <Text className="text-primary/60 text-sm">
                  â€¢ SÃ© paciente, 12-16 semanas mÃ­nimo{'\n'}
                  â€¢ Fotos semanales son clave{'\n'}
                  â€¢ Ajusta cada 2-3 semanas segÃºn progreso{'\n'}
                  â€¢ Duerme 7-9h diarias{'\n'}
                  â€¢ ProteÃ­na alta (1.8-2.2g/kg){'\n'}
                  â€¢ ConfÃ­a en el proceso!
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}


