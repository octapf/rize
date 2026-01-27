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

interface Competition {
  id: string;
  name: string;
  description: string;
  type: 'volume' | 'tonnage' | 'streak' | 'custom';
  startDate: string;
  endDate: string;
  participants: number;
  myRank: number;
  myScore: number;
  leaderScore: number;
  prize: string;
  status: 'active' | 'upcoming' | 'ended';
}

interface Participant {
  id: string;
  name: string;
  avatar: string;
  score: number;
  rank: number;
  trend: 'up' | 'down' | 'same';
}

const COMPETITIONS: Competition[] = [
  {
    id: '1',
    name: 'Desafío de Volumen Enero',
    description: 'Mayor número de series completadas',
    type: 'volume',
    startDate: '2025-01-01',
    endDate: '2025-01-31',
    participants: 247,
    myRank: 12,
    myScore: 312,
    leaderScore: 487,
    prize: '1 mes Premium gratis',
    status: 'active',
  },
  {
    id: '2',
    name: 'Tonelaje Total',
    description: 'Levanta el mayor peso total',
    type: 'tonnage',
    startDate: '2025-01-15',
    endDate: '2025-02-15',
    participants: 156,
    myRank: 8,
    myScore: 45230,
    leaderScore: 78450,
    prize: 'Badge exclusivo',
    status: 'active',
  },
  {
    id: '3',
    name: 'Racha de Fuego',
    description: 'La racha más larga sin fallar',
    type: 'streak',
    startDate: '2025-02-01',
    endDate: '2025-02-28',
    participants: 89,
    myRank: 0,
    myScore: 0,
    leaderScore: 0,
    prize: 'Trofeo digital',
    status: 'upcoming',
  },
];

const LEADERBOARD: Participant[] = [
  {
    id: '1',
    name: 'Carlos M.',
    avatar: '🔥',
    score: 487,
    rank: 1,
    trend: 'same',
  },
  {
    id: '2',
    name: 'Ana R.',
    avatar: '💪',
    score: 456,
    rank: 2,
    trend: 'up',
  },
  {
    id: '3',
    name: 'Luis P.',
    avatar: '⚡',
    score: 423,
    rank: 3,
    trend: 'down',
  },
  {
    id: '4',
    name: 'Tú',
    avatar: '👤',
    score: 312,
    rank: 12,
    trend: 'up',
  },
];

export default function Competitions() {
  const [selectedTab, setSelectedTab] = useState<'active' | 'upcoming' | 'past'>('active');

  const tabs = [
    { id: 'active' as const, label: 'Activas', count: 2 },
    { id: 'upcoming' as const, label: 'Próximas', count: 1 },
    { id: 'past' as const, label: 'Pasadas', count: 0 },
  ];

  const joinCompetition = (competitionId: string) => {
    Alert.alert(
      'Unirse a Competencia',
      '¿Deseas participar en esta competencia?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Unirse',
          onPress: () => {
            Alert.alert('¡Registrado!', 'Te has unido a la competencia. ¡Buena suerte!');
          },
        },
      ]
    );
  };

  const createCompetition = () => {
    Alert.alert(
      'Crear Competencia',
      'Selecciona el tipo de competencia',
      [
        {
          text: 'Volumen (series)',
          onPress: () => Alert.alert('Competencia creada', 'Invita a tus amigos'),
        },
        {
          text: 'Tonelaje (kg)',
          onPress: () => Alert.alert('Competencia creada', 'Invita a tus amigos'),
        },
        {
          text: 'Racha (días)',
          onPress: () => Alert.alert('Competencia creada', 'Invita a tus amigos'),
        },
        { text: 'Cancelar', style: 'cancel' },
      ]
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return '#10B981';
      case 'upcoming':
        return '#3B82F6';
      case 'ended':
        return '#71717A';
      default:
        return '#71717A';
    }
  };

  const getRankBadgeColor = (rank: number) => {
    if (rank === 1) return '#FFD700'; // Gold
    if (rank === 2) return '#C0C0C0'; // Silver
    if (rank === 3) return '#CD7F32'; // Bronze
    return '#71717A';
  };

  const filteredCompetitions = COMPETITIONS.filter((c) => c.status === selectedTab);

  return (
    <View className="flex-1 bg-zinc-950">
      {/* Header */}
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center justify-between mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1 ml-3">
            Competencias
          </Text>
          <TouchableOpacity onPress={createCompetition}>
            <Ionicons name="add-circle-outline" size={24} color="#10B981" />
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View className="flex-row gap-3">
          <View className="flex-1 bg-zinc-900 rounded-xl p-3 border border-zinc-800">
            <Text className="text-zinc-400 text-xs">Participando</Text>
            <Text className="text-emerald-500 text-2xl font-bold">2</Text>
          </View>
          <View className="flex-1 bg-zinc-900 rounded-xl p-3 border border-zinc-800">
            <Text className="text-zinc-400 text-xs">Mejor Posición</Text>
            <Text className="text-amber-500 text-2xl font-bold">#8</Text>
          </View>
          <View className="flex-1 bg-zinc-900 rounded-xl p-3 border border-zinc-800">
            <Text className="text-zinc-400 text-xs">Victorias</Text>
            <Text className="text-white text-2xl font-bold">0</Text>
          </View>
        </View>
      </View>

      {/* Tabs */}
      <View className="flex-row px-6 pt-4 border-b border-zinc-800">
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            onPress={() => setSelectedTab(tab.id)}
            className={`flex-1 pb-3 border-b-2 ${
              selectedTab === tab.id ? 'border-emerald-500' : 'border-transparent'
            }`}
          >
            <View className="flex-row items-center justify-center">
              <Text
                className={`font-semibold ${
                  selectedTab === tab.id ? 'text-emerald-500' : 'text-zinc-400'
                }`}
              >
                {tab.label}
              </Text>
              {tab.count > 0 && (
                <View
                  className={`ml-2 rounded-full px-2 py-0.5 ${
                    selectedTab === tab.id ? 'bg-emerald-500/20' : 'bg-zinc-800'
                  }`}
                >
                  <Text
                    className={`text-xs font-bold ${
                      selectedTab === tab.id ? 'text-emerald-500' : 'text-zinc-400'
                    }`}
                  >
                    {tab.count}
                  </Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Competitions List */}
        <View className="px-6 py-4">
          {filteredCompetitions.length === 0 ? (
            <View className="bg-zinc-900 rounded-xl p-8 border border-zinc-800 items-center">
              <Ionicons name="trophy-outline" size={48} color="#71717A" />
              <Text className="text-zinc-400 font-bold mt-4">
                No hay competencias {selectedTab === 'active' ? 'activas' : selectedTab === 'upcoming' ? 'próximas' : 'pasadas'}
              </Text>
              <TouchableOpacity
                onPress={createCompetition}
                className="bg-emerald-500 rounded-lg px-6 py-3 mt-4"
              >
                <Text className="text-white font-semibold">Crear Competencia</Text>
              </TouchableOpacity>
            </View>
          ) : (
            filteredCompetitions.map((competition) => (
              <View
                key={competition.id}
                className="bg-zinc-900 rounded-xl p-4 mb-4 border border-zinc-800"
              >
                {/* Header */}
                <View className="flex-row items-start justify-between mb-3">
                  <View className="flex-1">
                    <View className="flex-row items-center mb-2">
                      <View
                        className="px-2 py-1 rounded"
                        style={{
                          backgroundColor: getStatusColor(competition.status) + '20',
                        }}
                      >
                        <Text
                          className="text-xs font-bold"
                          style={{ color: getStatusColor(competition.status) }}
                        >
                          {competition.status === 'active'
                            ? 'EN CURSO'
                            : competition.status === 'upcoming'
                            ? 'PRÓXIMA'
                            : 'FINALIZADA'}
                        </Text>
                      </View>
                      <Text className="text-zinc-500 text-xs ml-2">
                        {competition.participants} participantes
                      </Text>
                    </View>
                    <Text className="text-white font-bold text-lg">
                      {competition.name}
                    </Text>
                    <Text className="text-zinc-400 text-sm mt-1">
                      {competition.description}
                    </Text>
                  </View>
                </View>

                {/* Dates */}
                <View className="flex-row items-center mb-3">
                  <Ionicons name="calendar-outline" size={14} color="#71717A" />
                  <Text className="text-zinc-500 text-xs ml-1">
                    {competition.startDate} - {competition.endDate}
                  </Text>
                </View>

                {/* My Position (if active) */}
                {competition.status === 'active' && competition.myRank > 0 && (
                  <>
                    <View className="bg-zinc-800 rounded-lg p-3 mb-3">
                      <View className="flex-row items-center justify-between mb-2">
                        <Text className="text-zinc-400 text-sm">Tu Posición</Text>
                        <View
                          className="px-3 py-1 rounded-full"
                          style={{
                            backgroundColor: getRankBadgeColor(competition.myRank) + '20',
                          }}
                        >
                          <Text
                            className="font-bold text-sm"
                            style={{ color: getRankBadgeColor(competition.myRank) }}
                          >
                            #{competition.myRank}
                          </Text>
                        </View>
                      </View>
                      <View className="flex-row items-center justify-between">
                        <Text className="text-white font-bold text-xl">
                          {competition.myScore.toLocaleString()}
                        </Text>
                        <Text className="text-zinc-500 text-sm">
                          Líder: {competition.leaderScore.toLocaleString()}
                        </Text>
                      </View>
                      <View className="bg-zinc-900 h-2 rounded-full overflow-hidden mt-2">
                        <View
                          className="h-full bg-emerald-500 rounded-full"
                          style={{
                            width: `${(competition.myScore / competition.leaderScore) * 100}%`,
                          }}
                        />
                      </View>
                    </View>

                    {/* Prize */}
                    <View className="bg-amber-500/10 rounded-lg p-3 mb-3">
                      <View className="flex-row items-center">
                        <Ionicons name="gift" size={20} color="#F59E0B" />
                        <View className="flex-1 ml-2">
                          <Text className="text-amber-500 font-semibold text-sm">
                            Premio
                          </Text>
                          <Text className="text-amber-300 text-xs mt-0.5">
                            {competition.prize}
                          </Text>
                        </View>
                      </View>
                    </View>

                    {/* Actions */}
                    <View className="flex-row gap-2">
                      <TouchableOpacity className="flex-1 bg-emerald-500 rounded-lg p-3">
                        <Text className="text-white text-center font-semibold">
                          Ver Clasificación
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity className="flex-1 bg-zinc-800 rounded-lg p-3">
                        <Text className="text-white text-center font-semibold">
                          Compartir
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </>
                )}

                {/* Join Button (if upcoming) */}
                {competition.status === 'upcoming' && (
                  <TouchableOpacity
                    onPress={() => joinCompetition(competition.id)}
                    className="bg-blue-500 rounded-lg p-3"
                  >
                    <Text className="text-white text-center font-semibold">
                      Unirse a Competencia
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            ))
          )}
        </View>

        {/* Leaderboard Preview (only for active) */}
        {selectedTab === 'active' && filteredCompetitions.length > 0 && (
          <View className="px-6 pb-6">
            <Text className="text-white font-bold text-lg mb-3">
              Top Competidores
            </Text>

            {LEADERBOARD.map((participant) => (
              <View
                key={participant.id}
                className={`rounded-xl p-4 mb-3 border ${
                  participant.name === 'Tú'
                    ? 'bg-emerald-500/10 border-emerald-500/30'
                    : 'bg-zinc-900 border-zinc-800'
                }`}
              >
                <View className="flex-row items-center">
                  <View
                    className="w-12 h-12 rounded-full items-center justify-center"
                    style={{
                      backgroundColor: getRankBadgeColor(participant.rank) + '20',
                    }}
                  >
                    <Text className="text-2xl">{participant.avatar}</Text>
                  </View>

                  <View className="flex-1 ml-3">
                    <View className="flex-row items-center">
                      <Text
                        className={`font-bold ${
                          participant.name === 'Tú' ? 'text-emerald-500' : 'text-white'
                        }`}
                      >
                        {participant.name}
                      </Text>
                      {participant.trend === 'up' && (
                        <Ionicons
                          name="trending-up"
                          size={14}
                          color="#10B981"
                          style={{ marginLeft: 6 }}
                        />
                      )}
                      {participant.trend === 'down' && (
                        <Ionicons
                          name="trending-down"
                          size={14}
                          color="#EF4444"
                          style={{ marginLeft: 6 }}
                        />
                      )}
                    </View>
                    <Text className="text-zinc-400 text-sm mt-0.5">
                      {participant.score.toLocaleString()} puntos
                    </Text>
                  </View>

                  <View
                    className="px-3 py-1 rounded-full"
                    style={{
                      backgroundColor: getRankBadgeColor(participant.rank) + '20',
                    }}
                  >
                    <Text
                      className="font-bold"
                      style={{ color: getRankBadgeColor(participant.rank) }}
                    >
                      #{participant.rank}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}
