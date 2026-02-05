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

interface HydrationLog {
  time: string;
  amount: number;
}

interface DailyHydration {
  date: string;
  goal: number;
  consumed: number;
  logs: HydrationLog[];
}

const TODAY_HYDRATION: DailyHydration = {
  date: '2026-01-27',
  goal: 4000,
  consumed: 2750,
  logs: [
    { time: '07:30', amount: 500 },
    { time: '09:45', amount: 350 },
    { time: '11:20', amount: 400 },
    { time: '13:00', amount: 500 },
    { time: '15:30', amount: 300 },
    { time: '17:00', amount: 400 },
    { time: '18:45', amount: 300 },
  ],
};

const WEEKLY_AVERAGE = 3650;
const WEEKLY_GOAL = 4000;

const WEEK_DATA = [
  { day: 'Lun', consumed: 3800, goal: 4000 },
  { day: 'Mar', consumed: 4100, goal: 4000 },
  { day: 'Mié', consumed: 3500, goal: 4000 },
  { day: 'Jue', consumed: 3900, goal: 4000 },
  { day: 'Vie', consumed: 3400, goal: 4000 },
  { day: 'Sáb', consumed: 3650, goal: 4000 },
  { day: 'Dom', consumed: 3200, goal: 4000 },
];

const QUICK_ADD_AMOUNTS = [250, 350, 500, 750, 1000];

const HYDRATION_BENEFITS = [
  {
    icon: 'ðŸ’ª',
    title: 'Rendimiento Muscular',
    description: 'Mejora fuerza y resistencia hasta 20%',
  },
  {
    icon: 'ðŸ§ ',
    title: 'Función Cognitiva',
    description: 'Focus mental y toma de decisiones',
  },
  {
    icon: 'ðŸ”¥',
    title: 'Metabolismo',
    description: 'Acelera quema de grasa y recuperación',
  },
  {
    icon: 'ðŸ©º',
    title: 'Articulaciones',
    description: 'Lubricación y prevención de lesiones',
  },
];

export default function HydrationTracker() {
  const [hydration, setHydration] = useState(TODAY_HYDRATION);

  const addWater = (amount: number) => {
    const now = new Date();
    const time = `${now.getHours().toString().padStart(2, '0')}:${now
      .getMinutes()
      .toString()
      .padStart(2, '0')}`;

    setHydration({
      ...hydration,
      consumed: hydration.consumed + amount,
      logs: [...hydration.logs, { time, amount }],
    });

    if (hydration.consumed + amount >= hydration.goal) {
      Alert.alert(
        '🎉 ¡Meta Alcanzada!',
        `Has cumplido tu objetivo de ${hydration.goal}ml hoy`,
        [{ text: 'Awesome!' }]
      );
    }
  };

  const customAmount = () => {
    Alert.prompt(
      'Cantidad Personalizada',
      'Ingresa la cantidad en ml',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Agregar',
          onPress: (value) => {
            const amount = parseInt(value || '0', 10);
            if (amount > 0) addWater(amount);
          },
        },
      ],
      'plain-text',
      '',
      'numeric'
    );
  };

  const removeLastLog = () => {
    if (hydration.logs.length > 0) {
      const lastLog = hydration.logs[hydration.logs.length - 1];
      Alert.alert(
        'Eliminar Registro',
        `¿Quitar ${lastLog.amount}ml de las ${lastLog.time}?`,
        [
          { text: 'Cancelar', style: 'cancel' },
          {
            text: 'Eliminar',
            style: 'destructive',
            onPress: () => {
              setHydration({
                ...hydration,
                consumed: hydration.consumed - lastLog.amount,
                logs: hydration.logs.slice(0, -1),
              });
            },
          },
        ]
      );
    }
  };

  const progressPercent = Math.min((hydration.consumed / hydration.goal) * 100, 100);
  const remaining = Math.max(hydration.goal - hydration.consumed, 0);

  return (
    <View className="flex-1 bg-zinc-950">
      {/* Header */}
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1 ml-3">
            Hidratación
          </Text>
          <TouchableOpacity onPress={removeLastLog}>
            <Ionicons name="trash-outline" size={24} color="#EF4444" />
          </TouchableOpacity>
        </View>

        {/* Progress Circle */}
        <View className="items-center mb-6">
          <View className="relative w-48 h-48 items-center justify-center">
            <View className="absolute inset-0 rounded-full bg-zinc-800" />
            <View
              className="absolute inset-0 rounded-full border-8 border-primary"
              style={{
                transform: [{ rotate: `${(progressPercent / 100) * 360}deg` }],
              }}
            />
            <View className="items-center">
              <Text className="text-primary/80 text-6xl font-bold">
                {Math.round(progressPercent)}%
              </Text>
              <Text className="text-zinc-400 text-sm mt-2">
                {hydration.consumed}ml / {hydration.goal}ml
              </Text>
            </View>
          </View>

          {remaining > 0 && (
            <View className="bg-amber-500/10 rounded-xl px-4 py-2 mt-4 border border-amber-500/30">
              <Text className="text-amber-400 text-sm font-bold">
                🎯 Faltan {remaining}ml para tu meta
              </Text>
            </View>
          )}

          {remaining === 0 && (
            <View className="bg-primary/10 rounded-xl px-4 py-2 mt-4 border border-primary/30">
              <Text className="text-primary text-sm font-bold">
                ✅ ¡Meta del día completada!
              </Text>
            </View>
          )}
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Quick Add */}
        <View className="px-6 pt-6">
          <Text className="text-white font-bold text-lg mb-3">Agregar Rápido</Text>
          <View className="flex-row flex-wrap gap-2 mb-6">
            {QUICK_ADD_AMOUNTS.map((amount) => (
              <TouchableOpacity
                key={amount}
                onPress={() => addWater(amount)}
                className="flex-1 min-w-[30%] bg-primary rounded-xl p-4 items-center"
              >
                <Ionicons name="water" size={24} color="white" />
                <Text className="text-white font-bold text-lg mt-1">{amount}ml</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              onPress={customAmount}
              className="flex-1 min-w-[30%] bg-zinc-900 rounded-xl p-4 items-center border border-zinc-800"
            >
              <Ionicons name="add-circle-outline" size={24} color="#71717A" />
              <Text className="text-zinc-400 font-bold text-lg mt-1">Otro</Text>
            </TouchableOpacity>
          </View>

          {/* Today's Log */}
          <Text className="text-white font-bold text-lg mb-3">Hoy</Text>
          <View className="bg-zinc-900 rounded-xl p-4 border border-zinc-800 mb-6">
            {hydration.logs.length === 0 ? (
              <Text className="text-zinc-400 text-center py-4">
                No hay registros aún. ¡Empieza a beber agua!
              </Text>
            ) : (
              hydration.logs.map((log, index) => (
                <View
                  key={index}
                  className="flex-row items-center justify-between py-3 border-b border-zinc-800 last:border-b-0"
                >
                  <View className="flex-row items-center">
                    <Ionicons name="water" size={20} color="#9D12DE" />
                    <Text className="text-white ml-3">{log.time}</Text>
                  </View>
                  <Text className="text-primary/80 font-bold">{log.amount}ml</Text>
                </View>
              ))
            )}
          </View>

          {/* Weekly Chart */}
          <Text className="text-white font-bold text-lg mb-3">Esta Semana</Text>
          <View className="bg-zinc-900 rounded-xl p-4 border border-zinc-800 mb-6">
            <View className="flex-row items-center justify-between mb-4">
              <View>
                <Text className="text-zinc-400 text-xs mb-1">PROMEDIO</Text>
                <Text className="text-white text-2xl font-bold">{WEEKLY_AVERAGE}ml</Text>
              </View>
              <View className="items-end">
                <Text className="text-zinc-400 text-xs mb-1">META</Text>
                <Text className="text-white text-2xl font-bold">{WEEKLY_GOAL}ml</Text>
              </View>
            </View>

            <View className="flex-row items-end justify-between h-32">
              {WEEK_DATA.map((day, index) => {
                const heightPercent = (day.consumed / day.goal) * 100;
                return (
                  <View key={index} className="flex-1 items-center">
                    <View className="w-full h-full items-center justify-end px-1">
                      <View
                        className={`w-full rounded-t-lg ${
                          day.consumed >= day.goal ? 'bg-primary' : 'bg-primary'
                        }`}
                        style={{ height: `${heightPercent}%` }}
                      />
                    </View>
                    <Text className="text-zinc-400 text-xs mt-2">{day.day}</Text>
                  </View>
                );
              })}
            </View>
          </View>

          {/* Benefits */}
          <Text className="text-white font-bold text-lg mb-3">Beneficios</Text>
          {HYDRATION_BENEFITS.map((benefit, index) => (
            <View
              key={index}
              className="bg-zinc-900 rounded-xl p-4 mb-3 border border-zinc-800"
            >
              <View className="flex-row items-start">
                <Text className="text-4xl mr-3">{benefit.icon}</Text>
                <View className="flex-1">
                  <Text className="text-white font-bold text-base mb-1">
                    {benefit.title}
                  </Text>
                  <Text className="text-zinc-400 text-sm">{benefit.description}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Tip Card */}
        <View className="px-6 pb-6 pt-2">
          <View className="bg-primary/10 rounded-xl p-4 border border-primary/30">
            <View className="flex-row items-start">
              <Ionicons name="bulb" size={20} color="#9D12DE" />
              <View className="flex-1 ml-3">
                <Text className="text-primary/80 font-bold mb-2">
                  Fórmula Ã“ptima
                </Text>
                <Text className="text-primary/60 text-sm">
                  Meta diaria: 35ml x kg de peso corporal + 500ml extra por cada hora de
                  entrenamiento intenso.
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

