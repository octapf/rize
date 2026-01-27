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

interface Challenge {
  id: string;
  name: string;
  type: 'team' | 'individual' | 'community';
  goal: string;
  metric: 'workouts' | 'volume' | 'calories' | 'distance' | 'time';
  startDate: string;
  endDate: string;
  participants: number;
  prize?: string;
  status: 'active' | 'upcoming' | 'completed';
  myProgress: number;
  myRank: number;
  leaderboard: {
    rank: number;
    name: string;
    avatar: string;
    value: number;
    unit: string;
  }[];
}

const CHALLENGES: Challenge[] = [
  {
    id: '1',
    name: 'Enero Invencible',
    type: 'community',
    goal: 'Completa 20 entrenamientos en Enero',
    metric: 'workouts',
    startDate: '2025-01-01',
    endDate: '2025-01-31',
    participants: 1248,
    prize: 'Badge exclusivo + 500 XP',
    status: 'active',
    myProgress: 18,
    myRank: 142,
    leaderboard: [
      { rank: 1, name: 'Carlos F.', avatar: '🏆', value: 27, unit: 'workouts' },
      { rank: 2, name: 'Ana M.', avatar: '🥈', value: 26, unit: 'workouts' },
      { rank: 3, name: 'Pedro S.', avatar: '🥉', value: 25, unit: 'workouts' },
      { rank: 4, name: 'Laura G.', avatar: '💪', value: 24, unit: 'workouts' },
      { rank: 5, name: 'Miguel R.', avatar: '🔥', value: 23, unit: 'workouts' },
    ],
  },
  {
    id: '2',
    name: 'Team Iron Warriors',
    type: 'team',
    goal: 'Levanta 100,000 kg en equipo',
    metric: 'volume',
    startDate: '2025-01-15',
    endDate: '2025-02-15',
    participants: 8,
    prize: 'Equipo ganador: remera personalizada',
    status: 'active',
    myProgress: 12450,
    myRank: 2,
    leaderboard: [
      { rank: 1, name: 'Iron Warriors', avatar: '⚔️', value: 68420, unit: 'kg' },
      { rank: 2, name: 'Beast Mode', avatar: '🦁', value: 62180, unit: 'kg' },
      { rank: 3, name: 'Titans Gym', avatar: '⚡', value: 58930, unit: 'kg' },
      { rank: 4, name: 'Alpha Squad', avatar: '🐺', value: 54210, unit: 'kg' },
      { rank: 5, name: 'Phoenix Rise', avatar: '🔥', value: 51820, unit: 'kg' },
    ],
  },
  {
    id: '3',
    name: 'Maratón Virtual 42K',
    type: 'individual',
    goal: 'Corre/Camina 42km en 30 días',
    metric: 'distance',
    startDate: '2025-01-20',
    endDate: '2025-02-20',
    participants: 342,
    prize: 'Medalla digital + certificado',
    status: 'active',
    myProgress: 28.5,
    myRank: 87,
    leaderboard: [
      { rank: 1, name: 'Running Pro', avatar: '🏃', value: 42.0, unit: 'km' },
      { rank: 2, name: 'Marathon Girl', avatar: '👟', value: 41.2, unit: 'km' },
      { rank: 3, name: 'Speed Demon', avatar: '⚡', value: 39.8, unit: 'km' },
      { rank: 4, name: 'Endurance King', avatar: '👑', value: 38.5, unit: 'km' },
      { rank: 5, name: 'Trail Runner', avatar: '⛰️', value: 37.2, unit: 'km' },
    ],
  },
  {
    id: '4',
    name: 'Quema Extrema',
    type: 'community',
    goal: 'Quema 50,000 calorías colectivas',
    metric: 'calories',
    startDate: '2025-02-01',
    endDate: '2025-02-28',
    participants: 0,
    prize: 'Top 10: plan nutricional gratis',
    status: 'upcoming',
    myProgress: 0,
    myRank: 0,
    leaderboard: [],
  },
  {
    id: '5',
    name: 'Consistency Champion',
    type: 'individual',
    goal: 'Entrena 60 minutos diarios por 21 días',
    metric: 'time',
    startDate: '2025-01-05',
    endDate: '2025-01-26',
    participants: 89,
    prize: 'Badge platino + mes premium gratis',
    status: 'completed',
    myProgress: 21,
    myRank: 12,
    leaderboard: [
      { rank: 1, name: 'Consistent Joe', avatar: '💎', value: 21, unit: 'días' },
      { rank: 2, name: 'Daily Grind', avatar: '🔥', value: 21, unit: 'días' },
      { rank: 3, name: 'Never Skip', avatar: '💪', value: 21, unit: 'días' },
    ],
  },
];

export default function GroupChallenges() {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('active');
  const [selectedChallenge, setSelectedChallenge] = useState<string | null>(null);

  const types = [
    { id: 'all', label: 'Todos', icon: 'grid' },
    { id: 'team', label: 'Equipos', icon: 'people' },
    { id: 'individual', label: 'Individual', icon: 'person' },
    { id: 'community', label: 'Comunidad', icon: 'globe' },
  ];

  const statuses = [
    { id: 'active', label: 'Activos' },
    { id: 'upcoming', label: 'Próximos' },
    { id: 'completed', label: 'Completados' },
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'team':
        return '#3B82F6';
      case 'individual':
        return '#8B5CF6';
      case 'community':
        return '#10B981';
      default:
        return '#71717A';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return '#10B981';
      case 'upcoming':
        return '#F59E0B';
      case 'completed':
        return '#71717A';
      default:
        return '#71717A';
    }
  };

  const joinChallenge = (challenge: Challenge) => {
    if (challenge.status === 'upcoming') {
      Alert.alert(
        'Pre-registro',
        `${challenge.name}\n\nComienza: ${new Date(challenge.startDate).toLocaleDateString('es-ES')}\n\n¿Quieres registrarte?`,
        [
          { text: 'Cancelar', style: 'cancel' },
          { text: 'Registrarse', onPress: () => Alert.alert('¡Registrado!', 'Te notificaremos cuando comience') },
        ]
      );
    } else if (challenge.status === 'active') {
      Alert.alert(
        'Unirse al Desafío',
        `${challenge.name}\n\n${challenge.goal}\n\nParticipantes: ${challenge.participants}\n\n¿Listo para el desafío?`,
        [
          { text: 'Cancelar', style: 'cancel' },
          { text: 'Unirse', onPress: () => Alert.alert('¡Dentro!', 'Tu progreso se registrará automáticamente') },
        ]
      );
    }
  };

  const viewLeaderboard = (challenge: Challenge) => {
    setSelectedChallenge(challenge.id);
    Alert.alert(
      `🏆 ${challenge.name}`,
      `Tu posición: #${challenge.myRank}\nProgreso: ${challenge.myProgress}/${challenge.goal}\n\nVer tabla completa de posiciones`,
      [
        { text: 'Ver Todos' },
        { text: 'Compartir' },
        { text: 'Cerrar', onPress: () => setSelectedChallenge(null) },
      ]
    );
  };

  const filteredChallenges = CHALLENGES.filter((challenge) => {
    const matchesType = selectedType === 'all' || challenge.type === selectedType;
    const matchesStatus = challenge.status === selectedStatus;
    return matchesType && matchesStatus;
  });

  const activeChallenges = CHALLENGES.filter((c) => c.status === 'active').length;

  return (
    <View className="flex-1 bg-zinc-950">
      {/* Header */}
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1 ml-3">
            Desafíos de Grupo
          </Text>
          <TouchableOpacity>
            <Ionicons name="add-circle-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View className="bg-gradient-to-br from-emerald-500 to-blue-500 rounded-xl p-4 mb-4">
          <View className="flex-row items-center justify-between">
            <View className="flex-1">
              <Text className="text-white/80 text-sm mb-1">Desafíos Activos</Text>
              <Text className="text-white font-bold text-4xl mb-1">
                {activeChallenges}
              </Text>
              <Text className="text-white/80 text-sm">
                Participa y gana premios
              </Text>
            </View>
            <View className="bg-white/20 rounded-full p-4">
              <Ionicons name="trophy" size={32} color="white" />
            </View>
          </View>
        </View>

        {/* Type Filter */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-3">
          <View className="flex-row gap-2">
            {types.map((type) => (
              <TouchableOpacity
                key={type.id}
                onPress={() => setSelectedType(type.id)}
                className={`flex-row items-center px-4 py-2 rounded-lg ${
                  selectedType === type.id
                    ? 'bg-emerald-500'
                    : 'bg-zinc-900 border border-zinc-800'
                }`}
              >
                <Ionicons
                  name={type.icon as any}
                  size={18}
                  color={selectedType === type.id ? 'white' : '#71717A'}
                />
                <Text
                  className={`ml-2 font-semibold text-sm ${
                    selectedType === type.id ? 'text-white' : 'text-zinc-400'
                  }`}
                >
                  {type.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {/* Status Filter */}
        <View className="flex-row gap-2">
          {statuses.map((status) => (
            <TouchableOpacity
              key={status.id}
              onPress={() => setSelectedStatus(status.id)}
              className={`flex-1 px-4 py-2 rounded-lg ${
                selectedStatus === status.id
                  ? 'bg-emerald-500'
                  : 'bg-zinc-900 border border-zinc-800'
              }`}
            >
              <Text
                className={`font-semibold text-sm text-center ${
                  selectedStatus === status.id ? 'text-white' : 'text-zinc-400'
                }`}
              >
                {status.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          <Text className="text-white font-bold text-lg mb-3">
            {filteredChallenges.length} Desafíos
          </Text>

          {filteredChallenges.map((challenge) => (
            <View
              key={challenge.id}
              className={`bg-zinc-900 rounded-xl p-4 mb-4 border-2 ${
                selectedChallenge === challenge.id ? 'border-emerald-500' : 'border-zinc-800'
              }`}
            >
              {/* Header */}
              <View className="flex-row items-start justify-between mb-3">
                <View className="flex-1">
                  <View className="flex-row items-center mb-2">
                    <View
                      className="px-3 py-1 rounded-full"
                      style={{ backgroundColor: getTypeColor(challenge.type) + '20' }}
                    >
                      <Text
                        className="text-xs font-bold capitalize"
                        style={{ color: getTypeColor(challenge.type) }}
                      >
                        {challenge.type}
                      </Text>
                    </View>
                    <View
                      className="px-3 py-1 rounded-full ml-2"
                      style={{ backgroundColor: getStatusColor(challenge.status) + '20' }}
                    >
                      <Text
                        className="text-xs font-bold capitalize"
                        style={{ color: getStatusColor(challenge.status) }}
                      >
                        {challenge.status}
                      </Text>
                    </View>
                  </View>
                  <Text className="text-white font-bold text-xl mb-1">
                    {challenge.name}
                  </Text>
                  <Text className="text-zinc-400 text-sm mb-2">
                    {challenge.goal}
                  </Text>
                  <View className="flex-row items-center">
                    <Ionicons name="people" size={14} color="#71717A" />
                    <Text className="text-zinc-400 text-sm ml-1">
                      {challenge.participants} participantes
                    </Text>
                  </View>
                </View>
              </View>

              {/* Dates */}
              <View className="bg-zinc-800 rounded-lg p-3 mb-3">
                <View className="flex-row items-center justify-between">
                  <View>
                    <Text className="text-zinc-400 text-xs mb-1">Inicio</Text>
                    <Text className="text-white font-bold text-sm">
                      {new Date(challenge.startDate).toLocaleDateString('es-ES')}
                    </Text>
                  </View>
                  <Ionicons name="arrow-forward" size={16} color="#71717A" />
                  <View>
                    <Text className="text-zinc-400 text-xs mb-1">Fin</Text>
                    <Text className="text-white font-bold text-sm">
                      {new Date(challenge.endDate).toLocaleDateString('es-ES')}
                    </Text>
                  </View>
                </View>
              </View>

              {/* Progress (if active) */}
              {challenge.status === 'active' && challenge.myProgress > 0 && (
                <View className="bg-emerald-500/10 rounded-lg p-3 border border-emerald-500/30 mb-3">
                  <View className="flex-row items-center justify-between mb-2">
                    <Text className="text-emerald-400 font-bold">Tu Progreso</Text>
                    <Text className="text-emerald-400 font-bold">
                      #{challenge.myRank}
                    </Text>
                  </View>
                  <View className="flex-row items-center justify-between mb-2">
                    <Text className="text-emerald-300 text-sm">
                      {challenge.myProgress} {challenge.leaderboard[0]?.unit || ''}
                    </Text>
                    <Text className="text-emerald-400 font-bold text-lg">
                      {Math.round((challenge.myProgress / 20) * 100)}%
                    </Text>
                  </View>
                  <View className="bg-emerald-900/30 h-2 rounded-full overflow-hidden">
                    <View
                      className="h-full bg-emerald-500 rounded-full"
                      style={{ width: `${(challenge.myProgress / 20) * 100}%` }}
                    />
                  </View>
                </View>
              )}

              {/* Leaderboard Preview */}
              {challenge.leaderboard.length > 0 && (
                <View className="bg-zinc-800 rounded-lg p-3 mb-3">
                  <TouchableOpacity
                    onPress={() => viewLeaderboard(challenge)}
                    className="flex-row items-center justify-between mb-3"
                  >
                    <Text className="text-white font-bold text-sm">
                      🏆 Tabla de Posiciones
                    </Text>
                    <Ionicons name="chevron-forward" size={18} color="#71717A" />
                  </TouchableOpacity>
                  {challenge.leaderboard.slice(0, 3).map((entry) => (
                    <View
                      key={entry.rank}
                      className={`flex-row items-center justify-between py-2 ${
                        entry.rank < 3 ? 'border-b border-zinc-700' : ''
                      }`}
                    >
                      <View className="flex-row items-center flex-1">
                        <Text className="text-2xl mr-2">{entry.avatar}</Text>
                        <View className="flex-1">
                          <Text className="text-white font-bold">
                            #{entry.rank} {entry.name}
                          </Text>
                        </View>
                      </View>
                      <Text className="text-emerald-500 font-bold">
                        {entry.value} {entry.unit}
                      </Text>
                    </View>
                  ))}
                </View>
              )}

              {/* Prize */}
              {challenge.prize && (
                <View className="bg-amber-500/10 rounded-lg p-3 border border-amber-500/30 mb-3">
                  <View className="flex-row items-center">
                    <Ionicons name="gift" size={16} color="#F59E0B" />
                    <Text className="text-amber-400 font-bold text-sm ml-2">
                      Premio: {challenge.prize}
                    </Text>
                  </View>
                </View>
              )}

              {/* Action Button */}
              {challenge.status !== 'completed' && (
                <TouchableOpacity
                  onPress={() => joinChallenge(challenge)}
                  className={`${
                    challenge.myProgress > 0 ? 'bg-emerald-500' : 'bg-zinc-800'
                  } rounded-lg p-3`}
                >
                  <View className="flex-row items-center justify-center">
                    <Ionicons
                      name={challenge.myProgress > 0 ? 'checkmark-circle' : 'add-circle'}
                      size={18}
                      color="white"
                    />
                    <Text className="text-white font-bold ml-2">
                      {challenge.myProgress > 0
                        ? 'Ya Participando'
                        : challenge.status === 'upcoming'
                        ? 'Pre-registrarse'
                        : 'Unirse al Desafío'}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
            </View>
          ))}
        </View>

        {/* Info Card */}
        <View className="px-6 pb-6 pt-4">
          <View className="bg-blue-500/10 rounded-xl p-4 border border-blue-500/30">
            <View className="flex-row items-start">
              <Ionicons name="information-circle" size={20} color="#3B82F6" />
              <View className="flex-1 ml-3">
                <Text className="text-blue-400 font-bold mb-2">
                  Compite y Gana
                </Text>
                <Text className="text-blue-300 text-sm">
                  Únete a desafíos individuales o forma equipo. Gana badges, XP y premios exclusivos. ¡El progreso se sincroniza automáticamente!
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
