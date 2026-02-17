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
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface WaterIntake {
  id: string;
  timestamp: Date;
  amount: number; // ml
}

interface DailyWaterLog {
  date: string; // YYYY-MM-DD
  target: number; // ml
  consumed: number; // ml
  intakes: WaterIntake[];
}

const QUICK_AMOUNTS = [250, 500, 750, 1000]; // ml

const getMockLog = (): DailyWaterLog => {
  const today = new Date().toISOString().split('T')[0];
  return {
    date: today,
    target: 3000,
    consumed: 1750,
    intakes: [
      { id: '1', timestamp: new Date(Date.now() - 3600000 * 5), amount: 500 },
      { id: '2', timestamp: new Date(Date.now() - 3600000 * 3), amount: 500 },
      { id: '3', timestamp: new Date(Date.now() - 3600000 * 2), amount: 250 },
      { id: '4', timestamp: new Date(Date.now() - 3600000 * 1), amount: 500 },
    ],
  };
};

export default function WaterTracker() {
  const [log, setLog] = useState<DailyWaterLog>(getMockLog());
  const [customAmount, setCustomAmount] = useState('');

  const addWater = (amount: number) => {
    const newIntake: WaterIntake = {
      id: Date.now().toString(),
      timestamp: new Date(),
      amount,
    };

    setLog({
      ...log,
      consumed: log.consumed + amount,
      intakes: [newIntake, ...log.intakes],
    });

    if (log.consumed + amount >= log.target) {
      Alert.alert('¡Meta Alcanzada! ðŸ’§', '¡Excelente hidratación hoy!');
    }
  };

  const addCustomAmount = () => {
    const amount = parseInt(customAmount);
    if (!amount || amount <= 0) {
      Alert.alert('Error', 'Ingresa una cantidad válida');
      return;
    }
    addWater(amount);
    setCustomAmount('');
  };

  const removeIntake = (id: string) => {
    const intake = log.intakes.find((i) => i.id === id);
    if (!intake) return;

    Alert.alert(
      'Eliminar',
      `¿Quitar ${intake.amount}ml?`,
      [
        { text: 'Cancelar' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => {
            setLog({
              ...log,
              consumed: log.consumed - intake.amount,
              intakes: log.intakes.filter((i) => i.id !== id),
            });
          },
        },
      ]
    );
  };

  const updateTarget = () => {
    Alert.prompt(
      'Meta Diaria',
      'Ingresa tu meta en ml',
      [
        { text: 'Cancelar' },
        {
          text: 'Guardar',
          onPress: (value) => {
            const target = parseInt(value || '3000');
            setLog({ ...log, target });
          },
        },
      ],
      'plain-text',
      log.target.toString()
    );
  };

  const getProgress = () => {
    return Math.min(100, (log.consumed / log.target) * 100);
  };

  const getGlasses = () => {
    return Math.floor(log.consumed / 250); // 1 glass = 250ml
  };

  const getRemaining = () => {
    return Math.max(0, log.target - log.consumed);
  };

  const progress = getProgress();

  return (
    <View className="flex-1 bg-zinc-950">
      {/* Header */}
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1 ml-3">
            Water Tracker
          </Text>
          <TouchableOpacity onPress={updateTarget}>
            <Ionicons name="settings" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          {/* Progress Circle */}
          <View className="items-center mb-8">
            <View className="relative w-64 h-64 items-center justify-center">
              {/* Background Circle */}
              <View className="absolute w-64 h-64 rounded-full bg-zinc-900 border-8 border-zinc-800" />
              
              {/* Progress Circle */}
              <View
                className="absolute w-64 h-64 rounded-full border-8 border-primary"
                style={{
                  borderColor: progress >= 100 ? '#9D12DE' : '#9D12DE',
                  opacity: 0.8,
                }}
              />

              {/* Center Content */}
              <View className="items-center">
                <Text className="text-6xl mb-2">ðŸ’§</Text>
                <Text className="text-white text-4xl font-bold mb-1">
                  {log.consumed}ml
                </Text>
                <Text className="text-zinc-400 text-lg">
                  de {log.target}ml
                </Text>
                <View className="bg-primary/10 rounded-lg px-4 py-2 mt-3 border border-primary/30">
                  <Text className="text-primary/80 font-bold text-xl">
                    {progress.toFixed(0)}%
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Stats */}
          <View className="flex-row gap-3 mb-6">
            <View className="flex-1 bg-primary/10 rounded-xl p-4 border border-primary/30">
              <Text className="text-primary/80 text-sm mb-1">Vasos (250ml)</Text>
              <Text className="text-white text-3xl font-bold">{getGlasses()}</Text>
            </View>
            <View className="flex-1 bg-primary/10 rounded-xl p-4 border border-primary/30">
              <Text className="text-primary text-sm mb-1">Restante</Text>
              <Text className="text-white text-3xl font-bold">{getRemaining()}ml</Text>
            </View>
          </View>

          {/* Quick Add Buttons */}
          <Text className="text-white font-bold text-lg mb-3">Añadir Rápido</Text>
          <View className="flex-row gap-2 mb-6">
            {QUICK_AMOUNTS.map((amount) => (
              <TouchableOpacity
                key={amount}
                onPress={() => addWater(amount)}
                className="flex-1 bg-primary rounded-xl p-4 items-center"
              >
                <Ionicons name="water" size={24} color="white" />
                <Text className="text-white font-bold mt-2">{amount}ml</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Custom Amount */}
          <View className="bg-zinc-900 rounded-xl p-4 mb-6 border border-zinc-800">
            <Text className="text-white font-bold mb-3">Cantidad Personalizada</Text>
            <View className="flex-row gap-2">
              <TextInput
                className="flex-1 bg-zinc-800 rounded-xl px-4 py-3 text-white text-lg font-bold"
                placeholder="Ej: 350ml"
                placeholderTextColor="#71717A"
                keyboardType="numeric"
                value={customAmount}
                onChangeText={setCustomAmount}
              />
              <TouchableOpacity
                onPress={addCustomAmount}
                className="bg-primary rounded-xl px-6 items-center justify-center"
              >
                <Ionicons name="add" size={24} color="white" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Today's Intakes */}
          <Text className="text-white font-bold text-lg mb-3">Registro de Hoy</Text>
          {log.intakes.length === 0 ? (
            <View className="bg-zinc-900 rounded-xl p-8 items-center border border-zinc-800 mb-6">
              <Text className="text-6xl mb-3">ðŸ’§</Text>
              <Text className="text-white font-bold text-lg mb-2">Sin Registro</Text>
              <Text className="text-zinc-400 text-center">
                Empieza a trackear tu hidratación
              </Text>
            </View>
          ) : (
            <View className="mb-6">
              {log.intakes.map((intake) => (
                <View key={intake.id} className="bg-zinc-900 rounded-xl p-4 mb-3 border border-zinc-800">
                  <View className="flex-row items-center justify-between">
                    <View className="flex-row items-center flex-1">
                      <View className="w-12 h-12 bg-primary rounded-full items-center justify-center mr-3">
                        <Ionicons name="water" size={24} color="white" />
                      </View>
                      <View className="flex-1">
                        <Text className="text-white font-bold text-lg">
                          {intake.amount}ml
                        </Text>
                        <Text className="text-zinc-400 text-sm">
                          {format(intake.timestamp, 'HH:mm', { locale: es })}
                        </Text>
                      </View>
                    </View>
                    <TouchableOpacity onPress={() => removeIntake(intake.id)}>
                      <Ionicons name="trash" size={20} color="#EF4444" />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          )}

          {/* Hydration Tips */}
          <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-6">
            <View className="flex-row items-start">
              <Ionicons name="information-circle" size={20} color="#9D12DE" />
              <View className="flex-1 ml-3">
                <Text className="text-primary/80 font-bold mb-2">
                  Tips de Hidratación
                </Text>
                <Text className="text-primary/60 text-sm">
                  • Meta general: 30-40ml por kg de peso{'\n'}
                  • Más agua en días de entrenamiento{'\n'}
                  • Bebe constantemente, no todo de golpe{'\n'}
                  • Agua antes/durante/después del workout{'\n'}
                  • Orina clara = buena hidratación
                </Text>
              </View>
            </View>
          </View>

          {/* Reminders */}
          <View className="bg-zinc-900 rounded-xl p-4 border border-zinc-800 mb-6">
            <View className="flex-row items-center justify-between">
              <View>
                <Text className="text-white font-bold text-lg mb-1">
                  Recordatorios
                </Text>
                <Text className="text-zinc-400 text-sm">
                  Notificaciones cada 2 horas
                </Text>
              </View>
              <TouchableOpacity className="bg-zinc-800 rounded-full w-12 h-12 items-center justify-center">
                <Ionicons name="notifications" size={24} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

