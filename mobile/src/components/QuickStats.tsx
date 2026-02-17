import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Card } from '@/components/ui/Card';

interface Stat {
  label: string;
  value: string | number;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  gradient: [string, string];
  textColor?: string;
  route?: string;
}

interface QuickStatsProps {
  stats?: {
    workoutsThisWeek?: number;
    totalVolume?: number;
    currentStreak?: number;
    level?: number;
    xp?: number;
    recordsThisMonth?: number;
  };
  isLoading?: boolean;
}

export const QuickStats: React.FC<QuickStatsProps> = ({ stats, isLoading }) => {
  const quickStats: Stat[] = [
    {
      label: 'Esta Semana',
      value: stats?.workoutsThisWeek || 0,
      icon: 'barbell',
      color: '#9D12DE',
      gradient: ['#9D12DE', '#7B1FA2'],
      route: '/workouts/history',
    },
    {
      label: 'Racha Actual',
      value: `${stats?.currentStreak || 0} días`,
      icon: 'flame',
      color: '#FFEA00',
      gradient: ['#FFEA00', '#E6D300'],
      textColor: 'black',
    },
    {
      label: 'Volumen Total',
      value: `${(stats?.totalVolume || 0).toLocaleString()} kg`,
      icon: 'speedometer',
      color: '#9D12DE',
      gradient: ['#9D12DE', '#7B1FA2'],
    },
    {
      label: 'Nivel',
      value: stats?.level || 1,
      icon: 'trophy',
      color: '#FFEA00',
      gradient: ['#FFEA00', '#E6D300'],
      route: '/achievements',
    },
  ];

  if (isLoading) {
    return (
      <Card className="p-6 bg-[#333333] border-white/10">
        <View className="items-center justify-center py-8">
          <ActivityIndicator size="large" color="#9D12DE" />
        </View>
      </Card>
    );
  }

  return (
    <View className="gap-3">
      {/* Top Row - 2 Large Cards */}
      <View className="flex-row gap-3">
        {quickStats.slice(0, 2).map((stat, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => stat.route && router.push(stat.route)}
            className="flex-1"
            disabled={!stat.route}
          >
            <Card className="p-0 overflow-hidden h-28 border-white/10">
              <LinearGradient
                colors={stat.gradient}
                className="h-full p-4 justify-between"
              >
                <View className="flex-row items-center justify-between">
                  <View className={`p-2 rounded-lg ${stat.textColor === 'black' ? 'bg-black/10' : 'bg-white/20'}`}>
                    <Ionicons name={stat.icon} size={24} color={stat.textColor || 'white'} />
                  </View>
                  {stat.route && (
                    <Ionicons name="chevron-forward" size={20} color={stat.textColor ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.7)"} />
                  )}
                </View>
                <View>
                  <Text className={`text-2xl font-bold mb-1 ${stat.textColor === 'black' ? 'text-black' : 'text-white'}`}>
                    {stat.value}
                  </Text>
                  <Text className={`text-sm ${stat.textColor === 'black' ? 'text-black/70' : 'text-white/80'}`}>
                    {stat.label}
                  </Text>
                </View>
              </LinearGradient>
            </Card>
          </TouchableOpacity>
        ))}
      </View>

      {/* Bottom Row - 2 Large Cards */}
      <View className="flex-row gap-3">
        {quickStats.slice(2, 4).map((stat, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => stat.route && router.push(stat.route)}
            className="flex-1"
            disabled={!stat.route}
          >
            <Card className="p-0 overflow-hidden h-28 border-white/10">
              <LinearGradient
                colors={stat.gradient}
                className="h-full p-4 justify-between"
              >
                <View className="flex-row items-center justify-between">
                  <View className="bg-white/20 p-2 rounded-lg">
                    <Ionicons name={stat.icon} size={24} color="white" />
                  </View>
                  {stat.route && (
                    <Ionicons name="chevron-forward" size={20} color="rgba(255,255,255,0.7)" />
                  )}
                </View>
                <View>
                  <Text className="text-white text-2xl font-bold mb-1">
                    {stat.value}
                  </Text>
                  <Text className="text-white/80 text-sm">{stat.label}</Text>
                </View>
              </LinearGradient>
            </Card>
          </TouchableOpacity>
        ))}
      </View>

      {/* XP Progress Bar (if provided) */}
      {stats?.xp !== undefined && (
        <Card className="p-4 bg-[#333333] border-white/10">
          <View className="flex-row items-center justify-between mb-2">
            <Text className="text-gray-300 font-semibold">
              Progreso al siguiente nivel
            </Text>
            <Text className="text-gray-400 text-sm">
              {stats.xp % 100}/100 XP
            </Text>
          </View>
          <View className="h-3 bg-gray-700 rounded-full overflow-hidden">
            <View
              className="h-full bg-[#9D12DE] rounded-full"
              style={{ width: `${(stats.xp % 100)}%` }}
            />
          </View>
        </Card>
      )}

      {/* Records This Month (if provided) */}
      {stats?.recordsThisMonth !== undefined && stats.recordsThisMonth > 0 && (
        <Card className="p-4 bg-[#333333] border border-[#FFEA00]/30 shadow-sm shadow-[#FFEA00]/10">
          <View className="flex-row items-center gap-3">
            <View className="bg-[#FFEA00]/20 p-3 rounded-xl">
              <Ionicons name="trending-up" size={28} color="#FFEA00" />
            </View>
            <View className="flex-1">
              <Text className="text-lg font-bold text-white">
                {stats.recordsThisMonth} Records este mes
              </Text>
              <Text className="text-sm text-gray-400">
                ¡Sigue mejorando tus marcas!
              </Text>
            </View>
          </View>
        </Card>
      )}
    </View>
  );
};
