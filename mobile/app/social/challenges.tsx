import React, { useState } from 'react';
import { Text } from '@/components/ui/Text';
import { View, TouchableOpacity, ScrollView, Alert } from 'react-native';;
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface Challenge {
  id: string;
  name: string;
  type: 'distance' | 'reps' | 'weight' | 'time';
  creator: string;
  participants: string[];
  startDate: string;
  endDate: string;
  myProgress: number;
  leaderProgress: number;
  myRank: number;
  status: 'active' | 'pending' | 'completed';
  prize?: string;
}

const CHALLENGES: Challenge[] = [
  {
    id: '1',
    name: 'Desafío Push-ups 1000',
    type: 'reps',
    creator: 'Carlos M.',
    participants: ['Tú', 'Carlos M.', 'Ana R.', 'Luis P.'],
    startDate: '2025-01-15',
    endDate: '2025-01-31',
    myProgress: 687,
    leaderProgress: 892,
    myRank: 2,
    status: 'active',
  },
  {
    id: '2',
    name: 'Racha Semanal',
    type: 'time',
    creator: 'Tú',
    participants: ['Tú', 'Ana R.', 'Pedro S.'],
    startDate: '2025-01-20',
    endDate: '2025-01-27',
    myProgress: 5,
    leaderProgress: 5,
    myRank: 1,
    status: 'active',
    prize: 'Badge Exclusivo',
  },
  {
    id: '3',
    name: 'Máximo en Sentadilla',
    type: 'weight',
    creator: 'Luis P.',
    participants: ['Luis P.', 'María G.', 'Jorge T.'],
    startDate: '2025-02-01',
    endDate: '2025-02-28',
    myProgress: 0,
    leaderProgress: 0,
    myRank: 0,
    status: 'pending',
  },
];

export default function SocialChallenges() {
  const [selectedTab, setSelectedTab] = useState<'active' | 'friends' | 'public'>('active');

  const tabs = [
    { id: 'active' as const, label: 'Mis Desafíos', count: 2 },
    { id: 'friends' as const, label: 'Amigos', count: 3 },
    { id: 'public' as const, label: 'Públicos', count: 12 },
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'distance':
        return 'walk';
      case 'reps':
        return 'fitness';
      case 'weight':
        return 'barbell';
      case 'time':
        return 'time';
      default:
        return 'trophy';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'distance':
        return '#9D12DE';
      case 'reps':
        return '#9D12DE';
      case 'weight':
        return '#EF4444';
      case 'time':
        return '#FFEA00';
      default:
        return '#71717A';
    }
  };

  const createChallenge = () => {
    Alert.alert(
      'Crear Desafío',
      'Selecciona el tipo',
      [
        { text: 'Repeticiones', onPress: () => setupChallenge('reps') },
        { text: 'Peso Máximo', onPress: () => setupChallenge('weight') },
        { text: 'Distancia', onPress: () => setupChallenge('distance') },
        { text: 'Tiempo/Racha', onPress: () => setupChallenge('time') },
        { text: 'Cancelar', style: 'cancel' },
      ]
    );
  };

  const setupChallenge = (type: string) => {
    Alert.alert(
      'Configurar Desafío',
      'Próximamente podrás personalizar:\n\n• Duración\n• Meta\n• Participantes\n• Premio',
      [{ text: 'OK' }]
    );
  };

  const joinChallenge = (challenge: Challenge) => {
    Alert.alert(
      'Unirse a Desafío',
      `${challenge.name}\n\nCreado por: ${challenge.creator}\nParticipantes: ${challenge.participants.length}\n\n¿Deseas unirte?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Unirse',
          onPress: () => {
            Alert.alert('¡Unido!', 'Comienza a competir con tus amigos');
          },
        },
      ]
    );
  };

  const viewLeaderboard = (challenge: Challenge) => {
    const leaderboardText = challenge.participants
      .map((p, i) => `${i + 1}. ${p}`)
      .join('\n');

    Alert.alert('Clasificación', leaderboardText, [{ text: 'OK' }]);
  };

  const logProgress = (challenge: Challenge) => {
    Alert.prompt(
      'Registrar Progreso',
      `${challenge.name}\n\nIngresa tu progreso:`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Guardar',
          onPress: (value) => {
            if (value) {
              Alert.alert('¡Progreso Guardado!', `+${value} agregado`);
            }
          },
        },
      ],
      'plain-text'
    );
  };

  const filteredChallenges = CHALLENGES.filter((c) => {
    if (selectedTab === 'active') return c.status === 'active';
    if (selectedTab === 'friends') return true;
    if (selectedTab === 'public') return true;
    return true;
  });

  return (
    <View className="flex-1 bg-zinc-950">
      {/* Header */}
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center justify-between mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1 ml-3">
            Desafíos Sociales
          </Text>
          <TouchableOpacity onPress={createChallenge}>
            <Ionicons name="add-circle" size={24} color="#9D12DE" />
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View className="flex-row gap-3 mb-4">
          <View className="flex-1 bg-zinc-900 rounded-xl p-3 border border-zinc-800">
            <Text className="text-zinc-400 text-xs">Activos</Text>
            <Text className="text-primary text-2xl font-bold">2</Text>
          </View>
          <View className="flex-1 bg-zinc-900 rounded-xl p-3 border border-zinc-800">
            <Text className="text-zinc-400 text-xs">Victorias</Text>
            <Text className="text-amber-500 text-2xl font-bold">7</Text>
          </View>
          <View className="flex-1 bg-zinc-900 rounded-xl p-3 border border-zinc-800">
            <Text className="text-zinc-400 text-xs">Win Rate</Text>
            <Text className="text-white text-2xl font-bold">64%</Text>
          </View>
        </View>

        {/* Tabs */}
        <View className="flex-row gap-2">
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.id}
              onPress={() => setSelectedTab(tab.id)}
              className={`flex-1 py-3 rounded-lg ${
                selectedTab === tab.id ? 'bg-primary' : 'bg-zinc-900 border border-zinc-800'
              }`}
            >
              <View className="flex-row items-center justify-center">
                <Text
                  className={`font-semibold text-sm ${
                    selectedTab === tab.id ? 'text-white' : 'text-zinc-400'
                  }`}
                >
                  {tab.label}
                </Text>
                {tab.count > 0 && (
                  <View
                    className={`ml-2 rounded-full px-2 py-0.5 ${
                      selectedTab === tab.id ? 'bg-white/20' : 'bg-zinc-800'
                    }`}
                  >
                    <Text
                      className={`text-xs font-bold ${
                        selectedTab === tab.id ? 'text-white' : 'text-zinc-400'
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
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          {filteredChallenges.length === 0 ? (
            <View className="bg-zinc-900 rounded-xl p-8 border border-zinc-800 items-center">
              <Ionicons name="trophy-outline" size={48} color="#71717A" />
              <Text className="text-zinc-400 font-bold mt-4">
                No hay desafíos
              </Text>
              <Text className="text-zinc-500 text-sm mt-2 text-center">
                Crea o únete a un desafío
              </Text>
              <TouchableOpacity
                onPress={createChallenge}
                className="bg-primary rounded-lg px-6 py-3 mt-4"
              >
                <Text className="text-white font-semibold">Crear Desafío</Text>
              </TouchableOpacity>
            </View>
          ) : (
            filteredChallenges.map((challenge) => (
              <View
                key={challenge.id}
                className="bg-zinc-900 rounded-xl p-4 mb-4 border border-zinc-800"
              >
                {/* Header */}
                <View className="flex-row items-start justify-between mb-3">
                  <View className="flex-1">
                    <View className="flex-row items-center mb-2">
                      <View
                        className="w-10 h-10 rounded-full items-center justify-center"
                        style={{ backgroundColor: getTypeColor(challenge.type) + '20' }}
                      >
                        <Ionicons
                          name={getTypeIcon(challenge.type) as any}
                          size={20}
                          color={getTypeColor(challenge.type)}
                        />
                      </View>
                      <View className="ml-3 flex-1">
                        <Text className="text-white font-bold text-lg">
                          {challenge.name}
                        </Text>
                        <Text className="text-zinc-400 text-sm">
                          Por {challenge.creator}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View
                    className={`px-3 py-1 rounded-full ${
                      challenge.status === 'active'
                        ? 'bg-primary/20'
                        : challenge.status === 'pending'
                        ? 'bg-primary/20'
                        : 'bg-zinc-800'
                    }`}
                  >
                    <Text
                      className={`text-xs font-bold ${
                        challenge.status === 'active'
                          ? 'text-primary'
                          : challenge.status === 'pending'
                          ? 'text-primary'
                          : 'text-zinc-400'
                      }`}
                    >
                      {challenge.status === 'active'
                        ? 'ACTIVO'
                        : challenge.status === 'pending'
                        ? 'PRÓXIMO'
                        : 'FINALIZADO'}
                    </Text>
                  </View>
                </View>

                {/* Dates */}
                <View className="flex-row items-center mb-3">
                  <Ionicons name="calendar-outline" size={14} color="#71717A" />
                  <Text className="text-zinc-500 text-xs ml-1">
                    {challenge.startDate} - {challenge.endDate}
                  </Text>
                </View>

                {/* Progress (if active) */}
                {challenge.status === 'active' && (
                  <>
                    <View className="bg-zinc-800 rounded-lg p-3 mb-3">
                      <View className="flex-row items-center justify-between mb-2">
                        <Text className="text-zinc-400 text-sm">Tu Progreso</Text>
                        <View className="flex-row items-center">
                          <Text className="text-white font-bold text-xl mr-2">
                            {challenge.myProgress}
                          </Text>
                          <Text className="text-zinc-500 text-sm">
                            / {challenge.leaderProgress}
                          </Text>
                        </View>
                      </View>
                      <View className="bg-zinc-900 h-2 rounded-full overflow-hidden">
                        <View
                          className="h-full bg-primary rounded-full"
                          style={{
                            width: `${Math.min(
                              (challenge.myProgress / challenge.leaderProgress) * 100,
                              100
                            )}%`,
                          }}
                        />
                      </View>
                      <View className="flex-row items-center justify-between mt-2">
                        <Text className="text-zinc-500 text-xs">
                          Posición #{challenge.myRank}
                        </Text>
                        <Text className="text-primary text-xs font-bold">
                          {challenge.leaderProgress - challenge.myProgress} para líder
                        </Text>
                      </View>
                    </View>

                    {challenge.prize && (
                      <View className="bg-amber-500/10 rounded-lg p-3 mb-3">
                        <View className="flex-row items-center">
                          <Ionicons name="gift" size={16} color="#FFEA00" />
                          <Text className="text-amber-500 font-semibold text-sm ml-2">
                            Premio: {challenge.prize}
                          </Text>
                        </View>
                      </View>
                    )}
                  </>
                )}

                {/* Participants */}
                <View className="mb-3">
                  <Text className="text-zinc-400 text-xs mb-2">
                    Participantes ({challenge.participants.length})
                  </Text>
                  <View className="flex-row flex-wrap gap-2">
                    {challenge.participants.slice(0, 4).map((participant, index) => (
                      <View
                        key={index}
                        className="bg-zinc-800 rounded-full px-3 py-1"
                      >
                        <Text className="text-zinc-300 text-xs">{participant}</Text>
                      </View>
                    ))}
                    {challenge.participants.length > 4 && (
                      <View className="bg-zinc-800 rounded-full px-3 py-1">
                        <Text className="text-zinc-300 text-xs">
                          +{challenge.participants.length - 4}
                        </Text>
                      </View>
                    )}
                  </View>
                </View>

                {/* Actions */}
                <View className="flex-row gap-2">
                  {challenge.status === 'active' && (
                    <>
                      <TouchableOpacity
                        onPress={() => logProgress(challenge)}
                        className="flex-1 bg-primary rounded-lg p-3"
                      >
                        <Text className="text-white font-semibold text-center">
                          Registrar
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => viewLeaderboard(challenge)}
                        className="flex-1 bg-zinc-800 rounded-lg p-3"
                      >
                        <Text className="text-white font-semibold text-center">
                          Ver Tabla
                        </Text>
                      </TouchableOpacity>
                    </>
                  )}
                  {challenge.status === 'pending' && (
                    <TouchableOpacity
                      onPress={() => joinChallenge(challenge)}
                      className="flex-1 bg-primary rounded-lg p-3"
                    >
                      <Text className="text-white font-semibold text-center">
                        Unirse
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
}

