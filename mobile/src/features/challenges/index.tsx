import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  FlatList,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { format, differenceInDays } from 'date-fns';
import { es } from 'date-fns/locale';

interface Challenge {
  id: string;
  name: string;
  description: string;
  type: 'volume' | 'streak' | 'skill' | 'time';
  goal: number;
  current: number;
  unit: string;
  startDate: Date;
  endDate: Date;
  participants: number;
  reward: {
    xp: number;
    badge?: string;
  };
  isJoined: boolean;
  category: 'active' | 'upcoming' | 'completed';
}

// Mock data
const CHALLENGES: Challenge[] = [
  {
    id: '1',
    name: '30 Días de Dominadas',
    description: 'Completa al menos 10 dominadas cada día durante 30 días consecutivos',
    type: 'streak',
    goal: 30,
    current: 12,
    unit: 'días',
    startDate: new Date(2025, 0, 1),
    endDate: new Date(2025, 0, 31),
    participants: 234,
    reward: { xp: 500, badge: 'Pull Master' },
    isJoined: true,
    category: 'active',
  },
  {
    id: '2',
    name: 'Volumen Total: 50 Toneladas',
    description: 'Alcanza 50,000 kg de volumen total en el mes',
    type: 'volume',
    goal: 50000,
    current: 28500,
    unit: 'kg',
    startDate: new Date(2025, 0, 1),
    endDate: new Date(2025, 0, 31),
    participants: 156,
    reward: { xp: 1000 },
    isJoined: true,
    category: 'active',
  },
  {
    id: '3',
    name: 'Primera Muscle-up',
    description: 'Desbloquea tu primer muscle-up limpio',
    type: 'skill',
    goal: 1,
    current: 0,
    unit: 'completo',
    startDate: new Date(2025, 0, 1),
    endDate: new Date(2025, 1, 28),
    participants: 89,
    reward: { xp: 750, badge: 'Muscle Up King' },
    isJoined: false,
    category: 'active',
  },
  {
    id: '4',
    name: 'Racha de Hierro',
    description: 'Entrena 5 días a la semana durante 4 semanas',
    type: 'streak',
    goal: 20,
    current: 8,
    unit: 'entrenamientos',
    startDate: new Date(2025, 0, 1),
    endDate: new Date(2025, 0, 28),
    participants: 412,
    reward: { xp: 600, badge: 'Iron Streak' },
    isJoined: true,
    category: 'active',
  },
  {
    id: '5',
    name: '100 Flexiones Challenge',
    description: 'Completa 100 flexiones en una sola sesión',
    type: 'skill',
    goal: 100,
    current: 0,
    unit: 'reps',
    startDate: new Date(2025, 1, 1),
    endDate: new Date(2025, 1, 28),
    participants: 523,
    reward: { xp: 400 },
    isJoined: false,
    category: 'upcoming',
  },
  {
    id: '6',
    name: 'Noviembre Sin Fallar',
    description: 'Entrena todos los días de noviembre sin excepción',
    type: 'streak',
    goal: 30,
    current: 30,
    unit: 'días',
    startDate: new Date(2024, 10, 1),
    endDate: new Date(2024, 10, 30),
    participants: 187,
    reward: { xp: 1500, badge: 'No Skip Legend' },
    isJoined: true,
    category: 'completed',
  },
];

export default function Challenges() {
  const [activeTab, setActiveTab] = useState<'active' | 'upcoming' | 'completed'>('active');
  const [challenges, setChallenges] = useState(CHALLENGES);

  const filteredChallenges = challenges.filter((c) => c.category === activeTab);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'volume':
        return 'barbell';
      case 'streak':
        return 'flame';
      case 'skill':
        return 'trophy';
      case 'time':
        return 'time';
      default:
        return 'flash';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'volume':
        return '#10B981';
      case 'streak':
        return '#EF4444';
      case 'skill':
        return '#F59E0B';
      case 'time':
        return '#3B82F6';
      default:
        return '#8B5CF6';
    }
  };

  const getProgressPercentage = (current: number, goal: number) => {
    return Math.min((current / goal) * 100, 100);
  };

  const getDaysRemaining = (endDate: Date) => {
    return Math.max(differenceInDays(endDate, new Date()), 0);
  };

  const joinChallenge = (challengeId: string) => {
    setChallenges((prev) =>
      prev.map((c) =>
        c.id === challengeId
          ? { ...c, isJoined: true, participants: c.participants + 1 }
          : c
      )
    );
    Alert.alert('¡Unido!', 'Te has unido al challenge. ¡Buena suerte!');
  };

  const leaveChallenge = (challengeId: string) => {
    Alert.alert(
      'Abandonar Challenge',
      '¿Estás seguro de que quieres abandonar este challenge?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Abandonar',
          style: 'destructive',
          onPress: () => {
            setChallenges((prev) =>
              prev.map((c) =>
                c.id === challengeId
                  ? { ...c, isJoined: false, participants: c.participants - 1 }
                  : c
              )
            );
          },
        },
      ]
    );
  };

  const renderChallenge = ({ item }: { item: Challenge }) => {
    const progress = getProgressPercentage(item.current, item.goal);
    const daysRemaining = getDaysRemaining(item.endDate);
    const typeColor = getTypeColor(item.type);

    return (
      <TouchableOpacity
        onPress={() => {
          // TODO: Navigate to challenge details
          Alert.alert(item.name, item.description);
        }}
        className="bg-zinc-900 rounded-xl p-4 mb-4 border border-zinc-800 active:opacity-70"
      >
        {/* Header */}
        <View className="flex-row items-start justify-between mb-3">
          <View className="flex-1">
            <View className="flex-row items-center mb-2">
              <View
                className="w-10 h-10 rounded-full items-center justify-center mr-3"
                style={{ backgroundColor: typeColor + '20' }}
              >
                <Ionicons name={getTypeIcon(item.type) as any} size={20} color={typeColor} />
              </View>
              <View className="flex-1">
                <Text className="text-white text-lg font-bold">{item.name}</Text>
                {item.reward.badge && (
                  <View className="flex-row items-center mt-1">
                    <Ionicons name="ribbon" size={14} color="#F59E0B" />
                    <Text className="text-amber-500 text-xs ml-1 font-semibold">
                      {item.reward.badge}
                    </Text>
                  </View>
                )}
              </View>
            </View>
            <Text className="text-zinc-400 text-sm">{item.description}</Text>
          </View>
        </View>

        {/* Progress */}
        {item.category !== 'upcoming' && (
          <View className="mb-3">
            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-zinc-300 text-sm font-semibold">
                Progreso
              </Text>
              <Text className="text-white text-sm font-bold">
                {item.current.toLocaleString()} / {item.goal.toLocaleString()} {item.unit}
              </Text>
            </View>
            <View className="bg-zinc-800 h-3 rounded-full overflow-hidden">
              <View
                className="h-full rounded-full"
                style={{
                  width: `${progress}%`,
                  backgroundColor: typeColor,
                }}
              />
            </View>
            <Text className="text-zinc-500 text-xs mt-1">
              {Math.round(progress)}% completado
            </Text>
          </View>
        )}

        {/* Meta Info */}
        <View className="flex-row items-center mb-3">
          <View className="flex-row items-center mr-4">
            <Ionicons name="people-outline" size={16} color="#71717A" />
            <Text className="text-zinc-500 text-xs ml-1">
              {item.participants.toLocaleString()} participantes
            </Text>
          </View>
          {daysRemaining > 0 && item.category !== 'completed' && (
            <View className="flex-row items-center mr-4">
              <Ionicons name="time-outline" size={16} color="#71717A" />
              <Text className="text-zinc-500 text-xs ml-1">
                {daysRemaining} días restantes
              </Text>
            </View>
          )}
          <View className="flex-row items-center">
            <Ionicons name="star-outline" size={16} color="#71717A" />
            <Text className="text-zinc-500 text-xs ml-1">
              +{item.reward.xp} XP
            </Text>
          </View>
        </View>

        {/* Action Button */}
        {item.category === 'completed' ? (
          <View className="bg-emerald-500/20 border border-emerald-500 py-3 rounded-lg items-center flex-row justify-center">
            <Ionicons name="checkmark-circle" size={20} color="#10B981" />
            <Text className="text-emerald-500 font-semibold ml-2">
              Completado
            </Text>
          </View>
        ) : item.category === 'upcoming' ? (
          item.isJoined ? (
            <View className="bg-blue-500/20 border border-blue-500 py-3 rounded-lg items-center">
              <Text className="text-blue-500 font-semibold">
                Unido - Comienza {format(item.startDate, 'd MMM', { locale: es })}
              </Text>
            </View>
          ) : (
            <TouchableOpacity
              onPress={() => joinChallenge(item.id)}
              className="bg-blue-500 py-3 rounded-lg items-center flex-row justify-center"
            >
              <Ionicons name="add-circle-outline" size={20} color="white" />
              <Text className="text-white font-semibold ml-2">
                Unirse al Challenge
              </Text>
            </TouchableOpacity>
          )
        ) : item.isJoined ? (
          <View className="flex-row gap-2">
            <TouchableOpacity
              className="flex-1 bg-emerald-500 py-3 rounded-lg items-center"
              onPress={() => Alert.alert('Ver Detalles', 'Ir a detalles del challenge')}
            >
              <Text className="text-white font-semibold">Ver Progreso</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => leaveChallenge(item.id)}
              className="bg-zinc-800 px-4 py-3 rounded-lg items-center justify-center"
            >
              <Ionicons name="exit-outline" size={20} color="#EF4444" />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            onPress={() => joinChallenge(item.id)}
            className="border-2 border-emerald-500 py-3 rounded-lg items-center flex-row justify-center"
          >
            <Ionicons name="add-circle-outline" size={20} color="#10B981" />
            <Text className="text-emerald-500 font-semibold ml-2">
              Unirse al Challenge
            </Text>
          </TouchableOpacity>
        )}

        {/* Joined Badge */}
        {item.isJoined && item.category !== 'completed' && (
          <View className="absolute top-4 right-4">
            <View className="bg-emerald-500 px-2 py-1 rounded-full">
              <Text className="text-white text-xs font-bold">UNIDO</Text>
            </View>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View className="flex-1 bg-zinc-950">
      {/* Header */}
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center mb-3">
          <TouchableOpacity onPress={() => router.back()} className="mr-3">
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1">Challenges</Text>
          <TouchableOpacity>
            <Ionicons name="information-circle-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View className="flex-row gap-3">
          <View className="flex-1 bg-zinc-900 rounded-xl p-3 border border-zinc-800">
            <Text className="text-zinc-400 text-xs">Activos</Text>
            <Text className="text-white text-2xl font-bold">
              {challenges.filter((c) => c.isJoined && c.category === 'active').length}
            </Text>
          </View>
          <View className="flex-1 bg-zinc-900 rounded-xl p-3 border border-zinc-800">
            <Text className="text-zinc-400 text-xs">Completados</Text>
            <Text className="text-white text-2xl font-bold">
              {challenges.filter((c) => c.category === 'completed').length}
            </Text>
          </View>
          <View className="flex-1 bg-zinc-900 rounded-xl p-3 border border-zinc-800">
            <Text className="text-zinc-400 text-xs">XP Ganado</Text>
            <Text className="text-white text-2xl font-bold">
              {challenges
                .filter((c) => c.category === 'completed')
                .reduce((sum, c) => sum + c.reward.xp, 0)}
            </Text>
          </View>
        </View>
      </View>

      {/* Tabs */}
      <View className="flex-row px-6 py-3 border-b border-zinc-800">
        <TouchableOpacity
          onPress={() => setActiveTab('active')}
          className={`flex-1 py-2 mr-1 rounded-lg ${
            activeTab === 'active' ? 'bg-emerald-500/20' : 'bg-zinc-900'
          }`}
        >
          <Text
            className={`text-center font-semibold text-sm ${
              activeTab === 'active' ? 'text-emerald-500' : 'text-zinc-400'
            }`}
          >
            Activos
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveTab('upcoming')}
          className={`flex-1 py-2 mx-1 rounded-lg ${
            activeTab === 'upcoming' ? 'bg-blue-500/20' : 'bg-zinc-900'
          }`}
        >
          <Text
            className={`text-center font-semibold text-sm ${
              activeTab === 'upcoming' ? 'text-blue-500' : 'text-zinc-400'
            }`}
          >
            Próximos
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveTab('completed')}
          className={`flex-1 py-2 ml-1 rounded-lg ${
            activeTab === 'completed' ? 'bg-zinc-700' : 'bg-zinc-900'
          }`}
        >
          <Text
            className={`text-center font-semibold text-sm ${
              activeTab === 'completed' ? 'text-white' : 'text-zinc-400'
            }`}
          >
            Completados
          </Text>
        </TouchableOpacity>
      </View>

      {/* Challenges List */}
      <FlatList
        data={filteredChallenges}
        renderItem={renderChallenge}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 24 }}
        ListEmptyComponent={
          <View className="items-center justify-center py-20">
            <Ionicons name="trophy-outline" size={64} color="#52525B" />
            <Text className="text-zinc-500 text-lg mt-4">
              {activeTab === 'active'
                ? 'No hay challenges activos'
                : activeTab === 'upcoming'
                ? 'No hay challenges próximos'
                : 'No has completado ningún challenge aún'}
            </Text>
            {activeTab === 'active' && (
              <TouchableOpacity
                onPress={() => setActiveTab('upcoming')}
                className="mt-4 bg-emerald-500 px-6 py-3 rounded-xl"
              >
                <Text className="text-white font-semibold">Ver Próximos Challenges</Text>
              </TouchableOpacity>
            )}
          </View>
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
