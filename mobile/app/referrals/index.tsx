import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  Share,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface Referral {
  id: string;
  name: string;
  status: 'registered' | 'active' | 'premium';
  joinDate: string;
  reward: number;
}

const REFERRALS: Referral[] = [
  {
    id: '1',
    name: 'Carlos M.',
    status: 'premium',
    joinDate: '2025-01-15',
    reward: 5.00,
  },
  {
    id: '2',
    name: 'Ana R.',
    status: 'active',
    joinDate: '2025-01-20',
    reward: 2.50,
  },
  {
    id: '3',
    name: 'Luis P.',
    status: 'registered',
    joinDate: '2025-01-22',
    reward: 1.00,
  },
];

export default function ReferralSystem() {
  const [referralCode] = useState('RIZE-ALEX-2025');
  const [copiedCode, setCopiedCode] = useState(false);

  const totalReferrals = REFERRALS.length;
  const activeReferrals = REFERRALS.filter((r) => r.status !== 'registered').length;
  const totalEarned = REFERRALS.reduce((sum, r) => sum + r.reward, 0);
  const availableBalance = totalEarned;

  const copyReferralCode = () => {
    setCopiedCode(true);
    Alert.alert('¡Copiado!', 'Código copiado al portapapeles');
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const shareReferralCode = async () => {
    try {
      await Share.share({
        message: `¡Únete a RIZE conmigo! 🏋️\n\nUsa mi código: ${referralCode}\n\n✅ 1 mes Premium gratis\n✅ Planes personalizados con IA\n✅ Estadísticas avanzadas\n\nDescarga: https://rize.app/download`,
      });
    } catch (error) {
      Alert.alert('Error', 'No se pudo compartir el código');
    }
  };

  const withdrawBalance = () => {
    if (availableBalance < 10) {
      Alert.alert(
        'Saldo Insuficiente',
        'Necesitas al menos $10.00 para retirar',
        [{ text: 'OK' }]
      );
    } else {
      Alert.alert(
        'Retirar Saldo',
        `¿Deseas retirar $${availableBalance.toFixed(2)} a tu cuenta PayPal?`,
        [
          { text: 'Cancelar', style: 'cancel' },
          {
            text: 'Retirar',
            onPress: () =>
              Alert.alert(
                '¡Solicitud Enviada!',
                'Recibirás el pago en 2-3 días hábiles'
              ),
          },
        ]
      );
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'premium':
        return '#F59E0B';
      case 'active':
        return '#10B981';
      case 'registered':
        return '#3B82F6';
      default:
        return '#71717A';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'premium':
        return 'PREMIUM';
      case 'active':
        return 'ACTIVO';
      case 'registered':
        return 'REGISTRADO';
      default:
        return 'DESCONOCIDO';
    }
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
            Referidos
          </Text>
          <TouchableOpacity>
            <Ionicons name="help-circle-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Balance Card */}
        <View className="bg-gradient-to-br from-emerald-500 to-blue-500 rounded-xl p-6 mb-4">
          <View className="flex-row items-center justify-between mb-4">
            <View className="flex-1">
              <Text className="text-white/80 text-sm mb-1">Saldo Disponible</Text>
              <Text className="text-white font-bold text-4xl">
                ${availableBalance.toFixed(2)}
              </Text>
            </View>
            <View className="bg-white/20 rounded-full p-4">
              <Ionicons name="cash" size={32} color="white" />
            </View>
          </View>

          <View className="flex-row gap-2">
            <TouchableOpacity
              onPress={withdrawBalance}
              className="flex-1 bg-white rounded-lg p-3"
            >
              <Text className="text-emerald-500 font-bold text-center">Retirar</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 bg-white/20 rounded-lg p-3">
              <Text className="text-white font-bold text-center">Historial</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Stats */}
        <View className="flex-row gap-3">
          <View className="flex-1 bg-zinc-900 rounded-xl p-3 border border-zinc-800">
            <Text className="text-zinc-400 text-xs">Total Referidos</Text>
            <Text className="text-white text-2xl font-bold">{totalReferrals}</Text>
          </View>
          <View className="flex-1 bg-zinc-900 rounded-xl p-3 border border-zinc-800">
            <Text className="text-zinc-400 text-xs">Activos</Text>
            <Text className="text-emerald-500 text-2xl font-bold">
              {activeReferrals}
            </Text>
          </View>
          <View className="flex-1 bg-zinc-900 rounded-xl p-3 border border-zinc-800">
            <Text className="text-zinc-400 text-xs">Total Ganado</Text>
            <Text className="text-amber-500 text-2xl font-bold">
              ${totalEarned.toFixed(0)}
            </Text>
          </View>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Referral Code Section */}
        <View className="px-6 pt-6">
          <Text className="text-white font-bold text-lg mb-3">
            Tu Código de Referido
          </Text>

          <View className="bg-zinc-900 rounded-xl p-4 border border-zinc-800 mb-4">
            <View className="flex-row items-center justify-between mb-3">
              <View className="flex-1">
                <Text className="text-zinc-400 text-sm mb-1">Código Personal</Text>
                <Text className="text-white font-mono text-xl font-bold">
                  {referralCode}
                </Text>
              </View>
              <TouchableOpacity
                onPress={copyReferralCode}
                className={`rounded-lg p-3 ${
                  copiedCode ? 'bg-emerald-500' : 'bg-zinc-800'
                }`}
              >
                <Ionicons
                  name={copiedCode ? 'checkmark' : 'copy-outline'}
                  size={20}
                  color="white"
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={shareReferralCode}
              className="bg-emerald-500 rounded-lg p-3 flex-row items-center justify-center"
            >
              <Ionicons name="share-social" size={20} color="white" />
              <Text className="text-white font-bold ml-2">Compartir Código</Text>
            </TouchableOpacity>
          </View>

          {/* Rewards Info */}
          <View className="bg-zinc-900 rounded-xl p-4 border border-zinc-800 mb-6">
            <Text className="text-white font-bold mb-3">Recompensas</Text>

            <View className="mb-3">
              <View className="flex-row items-center justify-between mb-2">
                <View className="flex-row items-center flex-1">
                  <View className="bg-blue-500/20 rounded-lg p-2">
                    <Ionicons name="person-add" size={20} color="#3B82F6" />
                  </View>
                  <View className="ml-3 flex-1">
                    <Text className="text-white font-semibold">Registro</Text>
                    <Text className="text-zinc-400 text-xs">
                      Usuario crea cuenta
                    </Text>
                  </View>
                </View>
                <Text className="text-emerald-500 font-bold">$1.00</Text>
              </View>

              <View className="flex-row items-center justify-between mb-2">
                <View className="flex-row items-center flex-1">
                  <View className="bg-emerald-500/20 rounded-lg p-2">
                    <Ionicons name="checkmark-circle" size={20} color="#10B981" />
                  </View>
                  <View className="ml-3 flex-1">
                    <Text className="text-white font-semibold">Primer Entrenamiento</Text>
                    <Text className="text-zinc-400 text-xs">
                      Completa su primer workout
                    </Text>
                  </View>
                </View>
                <Text className="text-emerald-500 font-bold">$2.50</Text>
              </View>

              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center flex-1">
                  <View className="bg-amber-500/20 rounded-lg p-2">
                    <Ionicons name="star" size={20} color="#F59E0B" />
                  </View>
                  <View className="ml-3 flex-1">
                    <Text className="text-white font-semibold">Se hace Premium</Text>
                    <Text className="text-zinc-400 text-xs">
                      Suscripción mensual/anual
                    </Text>
                  </View>
                </View>
                <Text className="text-emerald-500 font-bold">$5.00</Text>
              </View>
            </View>

            <View className="bg-blue-500/10 rounded-lg p-3 mt-3">
              <View className="flex-row items-start">
                <Ionicons name="information-circle" size={16} color="#3B82F6" />
                <Text className="text-blue-400 text-xs ml-2 flex-1">
                  Mínimo de retiro: $10.00 • Pago vía PayPal en 2-3 días hábiles
                </Text>
              </View>
            </View>
          </View>

          {/* Referrals List */}
          <Text className="text-white font-bold text-lg mb-3">
            Mis Referidos ({REFERRALS.length})
          </Text>

          {REFERRALS.length === 0 ? (
            <View className="bg-zinc-900 rounded-xl p-8 border border-zinc-800 items-center mb-6">
              <Ionicons name="people-outline" size={48} color="#71717A" />
              <Text className="text-zinc-400 font-bold mt-4">
                Aún no tienes referidos
              </Text>
              <Text className="text-zinc-500 text-sm mt-2 text-center">
                Comparte tu código y empieza a ganar
              </Text>
            </View>
          ) : (
            <View className="mb-6">
              {REFERRALS.map((referral) => (
                <View
                  key={referral.id}
                  className="bg-zinc-900 rounded-xl p-4 mb-3 border border-zinc-800"
                >
                  <View className="flex-row items-center justify-between">
                    <View className="flex-1">
                      <View className="flex-row items-center mb-2">
                        <View
                          className="w-10 h-10 rounded-full items-center justify-center mr-3"
                          style={{
                            backgroundColor: getStatusColor(referral.status) + '20',
                          }}
                        >
                          <Text className="text-xl">
                            {referral.name.charAt(0)}
                          </Text>
                        </View>
                        <View className="flex-1">
                          <Text className="text-white font-bold">
                            {referral.name}
                          </Text>
                          <Text className="text-zinc-400 text-xs">
                            {referral.joinDate}
                          </Text>
                        </View>
                      </View>

                      <View className="flex-row items-center">
                        <View
                          className="px-2 py-1 rounded"
                          style={{
                            backgroundColor: getStatusColor(referral.status) + '20',
                          }}
                        >
                          <Text
                            className="text-xs font-bold"
                            style={{ color: getStatusColor(referral.status) }}
                          >
                            {getStatusLabel(referral.status)}
                          </Text>
                        </View>
                      </View>
                    </View>

                    <View className="items-end">
                      <Text className="text-emerald-500 font-bold text-xl">
                        +${referral.reward.toFixed(2)}
                      </Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Share CTA */}
        <View className="px-6 pb-6">
          <View className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl p-6">
            <View className="flex-row items-center justify-between mb-3">
              <View className="flex-1">
                <Text className="text-white font-bold text-xl mb-2">
                  Invita y Gana
                </Text>
                <Text className="text-white/80 text-sm">
                  Por cada amigo referido, ambos ganan recompensas
                </Text>
              </View>
              <Text className="text-4xl">🎁</Text>
            </View>
            <TouchableOpacity
              onPress={shareReferralCode}
              className="bg-white rounded-lg p-3"
            >
              <Text className="text-purple-500 font-bold text-center">
                Compartir Ahora
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Terms */}
        <View className="px-6 pb-6">
          <TouchableOpacity className="bg-zinc-900 rounded-xl p-4 border border-zinc-800">
            <View className="flex-row items-center justify-between">
              <Text className="text-zinc-400 text-sm">
                Términos y Condiciones
              </Text>
              <Ionicons name="chevron-forward" size={20} color="#71717A" />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
