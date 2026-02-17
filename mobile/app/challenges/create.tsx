import React, { useState, useEffect } from 'react';
import { Text } from '@/components/ui/Text';
import { View, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';;
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useQuery } from '@tanstack/react-query';
import { socialApi } from '@/services/api/social.api';
import { useCreateChallenge } from '@/hooks/useChallenges';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import type { Challenge } from '@/services/api/challenges.api';

export default function CreateChallengeScreen() {
  const { preSelectedFriend } = useLocalSearchParams<{ preSelectedFriend?: string }>();
  const [selectedFriend, setSelectedFriend] = useState<string>(preSelectedFriend || '');
  const [selectedType, setSelectedType] = useState<Challenge['type']>('workout_count');
  const [targetValue, setTargetValue] = useState('');
  const [duration, setDuration] = useState('7');

  const { data: friendsData, isLoading: loadingFriends } = useQuery({
    queryKey: ['friends'],
    queryFn: () => socialApi.getFriends(),
  });

  const createChallenge = useCreateChallenge();

  // Set pre-selected friend if provided
  useEffect(() => {
    if (preSelectedFriend) {
      setSelectedFriend(preSelectedFriend);
    }
  }, [preSelectedFriend]);

  const challengeTypes = [
    {
      type: 'workout_count' as const,
      icon: 'barbell',
      label: 'Entrenamientos',
      description: 'Número de entrenamientos completados',
      unit: 'entrenamientos',
      color: '#9D12DE',
    },
    {
      type: 'volume' as const,
      icon: 'speedometer',
      label: 'Volumen Total',
      description: 'Peso total levantado (kg)',
      unit: 'kg',
      color: '#8b5cf6',
    },
  ];

  const durations = [
    { days: 3, label: '3 días' },
    { days: 7, label: '1 semana' },
    { days: 14, label: '2 semanas' },
    { days: 30, label: '1 mes' },
  ];

  const handleCreate = async () => {
    if (!selectedFriend) {
      Alert.alert('Error', 'Selecciona un amigo para retar');
      return;
    }

    if (!targetValue || parseInt(targetValue) <= 0) {
      Alert.alert('Error', 'Ingresa un objetivo válido');
      return;
    }

    try {
      await createChallenge.mutateAsync({
        challengedId: selectedFriend,
        type: selectedType,
        targetValue: parseInt(targetValue),
        duration: parseInt(duration),
      });

      Alert.alert('¡Reto Creado!', 'Se ha enviado el reto a tu amigo', [
        { text: 'OK', onPress: () => router.back() },
      ]);
    } catch (error: any) {
      Alert.alert('Error', error.response?.data?.error?.message || 'Error al crear el reto');
    }
  };

  const friends = friendsData?.data || [];
  const selectedTypeInfo = challengeTypes.find((t) => t.type === selectedType);

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <LinearGradient colors={['#EF4444', '#DC2626']} className="px-6 pt-12 pb-6">
        <View className="flex-row items-center justify-between">
          <TouchableOpacity onPress={() => router.back()} className="p-2">
            <Ionicons name="close" size={28} color="white" />
          </TouchableOpacity>
          <Text className="text-2xl font-bold text-white">Crear Reto</Text>
          <View className="w-10" />
        </View>
      </LinearGradient>

      <ScrollView className="flex-1" contentContainerClassName="p-6 gap-6">
        {/* Select Friend */}
        <View>
          <Text className="text-lg font-bold text-gray-900 mb-3">1. Selecciona un amigo</Text>
          {loadingFriends && (
            <Text className="text-gray-500 text-center py-4">Cargando amigos...</Text>
          )}
          {!loadingFriends && friends.length === 0 && (
            <Card className="p-4 bg-gray-50">
              <Text className="text-gray-600 text-center">
                No tienes amigos todavía. ¡Ve a la sección social para agregar!
              </Text>
            </Card>
          )}
          {friends.map((friend: any) => (
            <TouchableOpacity
              key={friend._id}
              onPress={() => setSelectedFriend(friend._id)}
            >
              <Card
                className={`p-4 mb-2 ${
                  selectedFriend === friend._id ? 'bg-red-50 border-2 border-red-500' : ''
                }`}
              >
                <View className="flex-row items-center gap-3">
                  <View className="w-12 h-12 bg-gray-200 rounded-full items-center justify-center">
                    <Text className="text-xl font-bold text-gray-600">
                      {friend.username.charAt(0).toUpperCase()}
                    </Text>
                  </View>
                  <View className="flex-1">
                    <Text className="text-base font-bold text-gray-900">{friend.name}</Text>
                    <Text className="text-sm text-gray-600">@{friend.username}</Text>
                  </View>
                  {selectedFriend === friend._id && (
                    <Ionicons name="checkmark-circle" size={24} color="#EF4444" />
                  )}
                </View>
              </Card>
            </TouchableOpacity>
          ))}
        </View>

        {/* Select Type */}
        <View>
          <Text className="text-lg font-bold text-gray-900 mb-3">2. Tipo de reto</Text>
          {challengeTypes.map((type) => (
            <TouchableOpacity
              key={type.type}
              onPress={() => setSelectedType(type.type)}
            >
              <Card
                className={`p-4 mb-2 ${
                  selectedType === type.type ? 'bg-red-50 border-2 border-red-500' : ''
                }`}
              >
                <View className="flex-row items-center gap-3">
                  <View
                    className="w-12 h-12 rounded-full items-center justify-center"
                    style={{ backgroundColor: `${type.color}20` }}
                  >
                    <Ionicons name={type.icon as any} size={24} color={type.color} />
                  </View>
                  <View className="flex-1">
                    <Text className="text-base font-bold text-gray-900">{type.label}</Text>
                    <Text className="text-sm text-gray-600">{type.description}</Text>
                  </View>
                  {selectedType === type.type && (
                    <Ionicons name="checkmark-circle" size={24} color="#EF4444" />
                  )}
                </View>
              </Card>
            </TouchableOpacity>
          ))}
        </View>

        {/* Target Value */}
        <View>
          <Text className="text-lg font-bold text-gray-900 mb-3">3. Objetivo</Text>
          <Card className="p-4">
            <View className="flex-row items-center gap-3">
              <View className="flex-1">
                <TextInput
                  value={targetValue}
                  onChangeText={setTargetValue}
                  placeholder="Ej: 10"
                  keyboardType="numeric"
                  className="text-2xl font-bold text-gray-900 py-2"
                />
              </View>
              <Text className="text-lg text-gray-600">{selectedTypeInfo?.unit}</Text>
            </View>
          </Card>
        </View>

        {/* Duration */}
        <View>
          <Text className="text-lg font-bold text-gray-900 mb-3">4. Duración</Text>
          <View className="flex-row gap-2">
            {durations.map((d) => (
              <TouchableOpacity
                key={d.days}
                onPress={() => setDuration(d.days.toString())}
                className="flex-1"
              >
                <Card
                  className={`p-3 items-center ${
                    duration === d.days.toString() ? 'bg-red-500' : ''
                  }`}
                >
                  <Text
                    className={`text-sm font-semibold ${
                      duration === d.days.toString() ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    {d.label}
                  </Text>
                </Card>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Summary */}
        {selectedFriend && targetValue && (
          <Card className="p-4 bg-red-50 border-red-200">
            <Text className="text-sm font-semibold text-red-900 mb-2">Resumen del Reto</Text>
            <Text className="text-sm text-red-700">
              Retarás a{' '}
              <Text className="font-bold">
                @{friends.find((f: any) => f._id === selectedFriend)?.username}
              </Text>{' '}
              a completar <Text className="font-bold">{targetValue} {selectedTypeInfo?.unit}</Text>{' '}
              en <Text className="font-bold">{duration} días</Text>
            </Text>
          </Card>
        )}

        {/* Create Button */}
        <Button
          variant="primary"
          onPress={handleCreate}
          disabled={!selectedFriend || !targetValue || createChallenge.isPending}
          className="mt-4"
        >
          {createChallenge.isPending ? 'Creando...' : 'Crear Reto'}
        </Button>
      </ScrollView>
    </View>
  );
}

