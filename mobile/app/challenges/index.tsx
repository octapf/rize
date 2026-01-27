import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
  Modal,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { challengesApi, Challenge } from '@/services/api/challenges.api';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Animated, { FadeInDown } from 'react-native-reanimated';

const AnimatedCard = Animated.createAnimatedComponent(Card);

export default function ChallengesScreen() {
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState<Challenge['status'] | 'all'>('accepted');
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);

  const { data, isLoading, refetch, isRefetching } = useQuery({
    queryKey: ['challenges', filter],
    queryFn: () => challengesApi.getUserChallenges(filter === 'all' ? undefined : filter),
  });

  const acceptMutation = useMutation({
    mutationFn: challengesApi.acceptChallenge,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['challenges'] });
      setSelectedChallenge(null);
    },
  });

  const rejectMutation = useMutation({
    mutationFn: challengesApi.rejectChallenge,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['challenges'] });
      setSelectedChallenge(null);
    },
  });

  const updateProgressMutation = useMutation({
    mutationFn: challengesApi.updateChallengeProgress,
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: ['challenges'] });
      setSelectedChallenge(result.data);
    },
  });

  const getChallengeTypeInfo = (type: Challenge['type']) => {
    switch (type) {
      case 'workout_count':
        return { icon: 'barbell' as const, label: 'Entrenamientos', color: '#10b981' };
      case 'volume':
        return { icon: 'speedometer' as const, label: 'Volumen Total', color: '#8b5cf6' };
      case 'specific_exercise':
        return { icon: 'fitness' as const, label: 'Ejercicio', color: '#f59e0b' };
      case 'streak':
        return { icon: 'flame' as const, label: 'Racha', color: '#ef4444' };
    }
  };

  const getStatusInfo = (status: Challenge['status']) => {
    switch (status) {
      case 'pending':
        return { label: 'Pendiente', color: '#f59e0b', bg: '#fef3c7' };
      case 'accepted':
        return { label: 'En curso', color: '#10b981', bg: '#d1fae5' };
      case 'rejected':
        return { label: 'Rechazado', color: '#6b7280', bg: '#f3f4f6' };
      case 'completed':
        return { label: 'Completado', color: '#3b82f6', bg: '#dbeafe' };
      case 'expired':
        return { label: 'Expirado', color: '#ef4444', bg: '#fee2e2' };
    }
  };

  const formatValue = (challenge: Challenge) => {
    if (challenge.type === 'workout_count') {
      return `${challenge.targetValue} entrenamientos`;
    }
    if (challenge.type === 'volume' || challenge.type === 'specific_exercise') {
      return `${challenge.targetValue} kg`;
    }
    if (challenge.type === 'streak') {
      return `${challenge.targetValue} días`;
    }
    return challenge.targetValue.toString();
  };

  const formatProgress = (value: number, challenge: Challenge) => {
    if (challenge.type === 'workout_count') {
      return `${value} entrenamientos`;
    }
    if (challenge.type === 'volume' || challenge.type === 'specific_exercise') {
      return `${value.toFixed(0)} kg`;
    }
    if (challenge.type === 'streak') {
      return `${value} días`;
    }
    return value.toString();
  };

  const getDaysRemaining = (endDate: string) => {
    const now = new Date();
    const end = new Date(endDate);
    const diffMs = end.getTime() - now.getTime();
    const diffDays = Math.ceil(diffMs / 86400000);
    return diffDays;
  };

  const challenges = data?.data || [];

  const renderChallengeModal = () => {
    if (!selectedChallenge) return null;

    const typeInfo = getChallengeTypeInfo(selectedChallenge.type);
    const statusInfo = getStatusInfo(selectedChallenge.status);
    const isChallenger = selectedChallenge.challengerId._id === 'current-user-id'; // TODO: Get from auth
    const opponent = isChallenger ? selectedChallenge.challengedId : selectedChallenge.challengerId;
    const myProgress = isChallenger ? selectedChallenge.challengerProgress : selectedChallenge.challengedProgress;
    const opponentProgress = isChallenger ? selectedChallenge.challengedProgress : selectedChallenge.challengerProgress;

    const progressPercentage = (myProgress / selectedChallenge.targetValue) * 100;
    const opponentPercentage = (opponentProgress / selectedChallenge.targetValue) * 100;

    return (
      <Modal visible={true} animationType="slide" transparent>
        <View className="flex-1 bg-black/50 justify-end">
          <View className="bg-white rounded-t-3xl max-h-[85%]">
            {/* Header */}
            <View className="flex-row items-center justify-between p-6 border-b border-gray-200">
              <Text className="text-xl font-bold text-gray-900">Detalles del Reto</Text>
              <TouchableOpacity onPress={() => setSelectedChallenge(null)}>
                <Ionicons name="close" size={28} color="#6B7280" />
              </TouchableOpacity>
            </View>

            <ScrollView className="flex-1 p-6">
              {/* Type & Status */}
              <View className="flex-row items-center gap-3 mb-6">
                <View
                  className="w-14 h-14 rounded-full items-center justify-center"
                  style={{ backgroundColor: `${typeInfo.color}20` }}
                >
                  <Ionicons name={typeInfo.icon} size={28} color={typeInfo.color} />
                </View>
                <View className="flex-1">
                  <Text className="text-lg font-bold text-gray-900">{typeInfo.label}</Text>
                  <View
                    className="self-start px-3 py-1 rounded-full mt-1"
                    style={{ backgroundColor: statusInfo.bg }}
                  >
                    <Text className="text-xs font-semibold" style={{ color: statusInfo.color }}>
                      {statusInfo.label}
                    </Text>
                  </View>
                </View>
              </View>

              {/* Opponent */}
              <Card className="p-4 mb-4">
                <Text className="text-sm text-gray-600 mb-2">
                  {isChallenger ? 'Retaste a' : 'Retado por'}
                </Text>
                <View className="flex-row items-center gap-3">
                  <View className="w-12 h-12 bg-gray-200 rounded-full items-center justify-center">
                    <Text className="text-xl font-bold text-gray-600">
                      {opponent.username.charAt(0).toUpperCase()}
                    </Text>
                  </View>
                  <View>
                    <Text className="text-base font-bold text-gray-900">{opponent.name}</Text>
                    <Text className="text-sm text-gray-600">@{opponent.username}</Text>
                  </View>
                </View>
              </Card>

              {/* Target */}
              <Card className="p-4 mb-4">
                <Text className="text-sm text-gray-600 mb-1">Objetivo</Text>
                <Text className="text-2xl font-bold text-gray-900">{formatValue(selectedChallenge)}</Text>
                {selectedChallenge.exerciseId && (
                  <Text className="text-sm text-gray-600 mt-1">
                    {selectedChallenge.exerciseId.name.es}
                  </Text>
                )}
                <Text className="text-xs text-gray-500 mt-2">
                  Duración: {selectedChallenge.duration} días
                </Text>
              </Card>

              {/* Progress (only for accepted/completed) */}
              {(selectedChallenge.status === 'accepted' || selectedChallenge.status === 'completed') && (
                <>
                  {/* Time Remaining */}
                  {selectedChallenge.status === 'accepted' && selectedChallenge.endDate && (
                    <Card className="p-4 mb-4 bg-emerald-50 border-emerald-200">
                      <View className="flex-row items-center gap-2">
                        <Ionicons name="time-outline" size={20} color="#10B981" />
                        <Text className="text-sm font-semibold text-emerald-700">
                          {getDaysRemaining(selectedChallenge.endDate)} días restantes
                        </Text>
                      </View>
                    </Card>
                  )}

                  {/* My Progress */}
                  <View className="mb-4">
                    <View className="flex-row items-center justify-between mb-2">
                      <Text className="text-sm font-semibold text-gray-900">Tu progreso</Text>
                      <Text className="text-sm font-bold text-emerald-600">
                        {formatProgress(myProgress, selectedChallenge)}
                      </Text>
                    </View>
                    <View className="h-3 bg-gray-200 rounded-full overflow-hidden">
                      <View
                        className="h-full bg-emerald-500 rounded-full"
                        style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                      />
                    </View>
                    <Text className="text-xs text-gray-500 mt-1">
                      {progressPercentage.toFixed(0)}% completado
                    </Text>
                  </View>

                  {/* Opponent Progress */}
                  <View className="mb-6">
                    <View className="flex-row items-center justify-between mb-2">
                      <Text className="text-sm font-semibold text-gray-900">
                        Progreso de @{opponent.username}
                      </Text>
                      <Text className="text-sm font-bold text-blue-600">
                        {formatProgress(opponentProgress, selectedChallenge)}
                      </Text>
                    </View>
                    <View className="h-3 bg-gray-200 rounded-full overflow-hidden">
                      <View
                        className="h-full bg-blue-500 rounded-full"
                        style={{ width: `${Math.min(opponentPercentage, 100)}%` }}
                      />
                    </View>
                    <Text className="text-xs text-gray-500 mt-1">
                      {opponentPercentage.toFixed(0)}% completado
                    </Text>
                  </View>

                  {/* Winner */}
                  {selectedChallenge.status === 'completed' && selectedChallenge.winner && (
                    <Card className="p-4 mb-4 bg-amber-50 border-amber-200">
                      <View className="flex-row items-center gap-2">
                        <Ionicons name="trophy" size={24} color="#F59E0B" />
                        <Text className="text-sm font-semibold text-amber-700">
                          {selectedChallenge.winner === (isChallenger ? selectedChallenge.challengerId._id : selectedChallenge.challengedId._id)
                            ? '¡Ganaste!'
                            : `Ganó @${opponent.username}`}
                        </Text>
                      </View>
                    </Card>
                  )}
                </>
              )}

              {/* Actions */}
              {selectedChallenge.status === 'pending' && !isChallenger && (
                <View className="flex-row gap-3">
                  <Button
                    variant="outline"
                    onPress={() => rejectMutation.mutate(selectedChallenge._id)}
                    disabled={rejectMutation.isPending}
                    className="flex-1"
                  >
                    Rechazar
                  </Button>
                  <Button
                    variant="primary"
                    onPress={() => acceptMutation.mutate(selectedChallenge._id)}
                    disabled={acceptMutation.isPending}
                    className="flex-1"
                  >
                    Aceptar Reto
                  </Button>
                </View>
              )}

              {selectedChallenge.status === 'accepted' && (
                <Button
                  variant="secondary"
                  onPress={() => updateProgressMutation.mutate(selectedChallenge._id)}
                  disabled={updateProgressMutation.isPending}
                >
                  {updateProgressMutation.isPending ? 'Actualizando...' : 'Actualizar Progreso'}
                </Button>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <LinearGradient colors={['#EF4444', '#DC2626']} className="px-6 pt-12 pb-6">
        <View className="flex-row items-center justify-between mb-4">
          <TouchableOpacity onPress={() => router.back()} className="p-2">
            <Ionicons name="arrow-back" size={28} color="white" />
          </TouchableOpacity>
          <Text className="text-2xl font-bold text-white">Retos</Text>
          <TouchableOpacity
            onPress={() => router.push('/challenges/create' as any)}
            className="p-2"
          >
            <Ionicons name="add-circle-outline" size={28} color="white" />
          </TouchableOpacity>
        </View>

        <Text className="text-white/90 text-sm text-center">
          Compite con tus amigos y alcanza tus objetivos
        </Text>
      </LinearGradient>

      {/* Filter Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="bg-white border-b border-gray-200"
        contentContainerClassName="px-6 py-3 gap-2"
      >
        {['accepted', 'pending', 'completed', 'all'].map((status) => (
          <TouchableOpacity
            key={status}
            onPress={() => setFilter(status as any)}
            className={`px-4 py-2 rounded-full ${
              filter === status ? 'bg-red-500' : 'bg-gray-100'
            }`}
          >
            <Text
              className={`text-sm font-semibold ${
                filter === status ? 'text-white' : 'text-gray-600'
              }`}
            >
              {status === 'accepted' && 'En curso'}
              {status === 'pending' && 'Pendientes'}
              {status === 'completed' && 'Completados'}
              {status === 'all' && 'Todos'}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Challenges List */}
      <ScrollView
        className="flex-1"
        contentContainerClassName="p-6 gap-3"
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
        }
      >
        {isLoading && (
          <View className="items-center justify-center py-12">
            <ActivityIndicator size="large" color="#EF4444" />
          </View>
        )}

        {!isLoading && challenges.length === 0 && (
          <View className="items-center justify-center py-12">
            <Ionicons name="flash-off-outline" size={64} color="#D1D5DB" />
            <Text className="text-gray-500 text-lg mt-4">No tienes retos</Text>
            <Text className="text-gray-400 text-sm mt-2">
              ¡Crea uno y desafía a tus amigos!
            </Text>
          </View>
        )}

        {challenges.map((challenge, index) => {
          const typeInfo = getChallengeTypeInfo(challenge.type);
          const statusInfo = getStatusInfo(challenge.status);
          const isChallenger = challenge.challengerId._id === 'current-user-id'; // TODO: Get from auth
          const opponent = isChallenger ? challenge.challengedId : challenge.challengerId;

          return (
            <AnimatedCard
              key={challenge._id}
              entering={FadeInDown.delay(index * 50)}
              className="p-4"
            >
              <TouchableOpacity onPress={() => setSelectedChallenge(challenge)}>
                <View className="flex-row items-start gap-3">
                  {/* Icon */}
                  <View
                    className="w-12 h-12 rounded-full items-center justify-center"
                    style={{ backgroundColor: `${typeInfo.color}20` }}
                  >
                    <Ionicons name={typeInfo.icon} size={24} color={typeInfo.color} />
                  </View>

                  {/* Content */}
                  <View className="flex-1">
                    <View className="flex-row items-start justify-between mb-1">
                      <Text className="text-base font-bold text-gray-900 flex-1">
                        {typeInfo.label}
                      </Text>
                      <View
                        className="px-2 py-1 rounded-full"
                        style={{ backgroundColor: statusInfo.bg }}
                      >
                        <Text className="text-xs font-semibold" style={{ color: statusInfo.color }}>
                          {statusInfo.label}
                        </Text>
                      </View>
                    </View>

                    <Text className="text-sm text-gray-600 mb-2">
                      {isChallenger ? 'Retaste a' : 'Retado por'} @{opponent.username}
                    </Text>

                    <View className="flex-row items-center gap-2">
                      <Ionicons name="flag-outline" size={16} color="#6B7280" />
                      <Text className="text-sm text-gray-600">
                        Meta: {formatValue(challenge)}
                      </Text>
                    </View>

                    {challenge.status === 'accepted' && challenge.endDate && (
                      <View className="flex-row items-center gap-2 mt-1">
                        <Ionicons name="time-outline" size={16} color="#10B981" />
                        <Text className="text-sm text-emerald-600 font-semibold">
                          {getDaysRemaining(challenge.endDate)} días restantes
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            </AnimatedCard>
          );
        })}
      </ScrollView>

      {renderChallengeModal()}
    </View>
  );
}
