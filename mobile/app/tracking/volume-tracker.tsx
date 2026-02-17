import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function VolumeTracker() {
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [selectedMuscle, setSelectedMuscle] = useState('all');

  const periods = ['week', 'month', 'mesocycle'];
  const muscles = ['all', 'chest', 'back', 'shoulders', 'legs', 'arms'];

  // Mock volume data
  const volumeData = {
    week: {
      chest: { sets: 14, change: +2 },
      back: { sets: 16, change: 0 },
      shoulders: { sets: 12, change: +1 },
      legs: { sets: 18, change: +3 },
      arms: { sets: 12, change: -1 },
    },
    month: {
      chest: { sets: 56, change: +8 },
      back: { sets: 64, change: +4 },
      shoulders: { sets: 48, change: +6 },
      legs: { sets: 72, change: +12 },
      arms: { sets: 48, change: +2 },
    },
  };

  const weeklyBreakdown = [
    { week: 'Week 1', volume: 60, intensity: 'Moderate' },
    { week: 'Week 2', volume: 68, intensity: 'Moderate-High' },
    { week: 'Week 3', volume: 75, intensity: 'High' },
    { week: 'Week 4 (Deload)', volume: 35, intensity: 'Low' },
  ];

  const volumeLandmarks = {
    chest: { min: 10, max: 20, optimal: '12-16' },
    back: { min: 12, max: 25, optimal: '15-20' },
    shoulders: { min: 10, max: 20, optimal: '12-16' },
    legs: { min: 12, max: 25, optimal: '15-20' },
    arms: { min: 8, max: 20, optimal: '10-15' },
  };

  const currentData = volumeData[selectedPeriod as keyof typeof volumeData];
  const totalSets = Object.values(currentData).reduce((sum, data) => sum + data.sets, 0);

  const getVolumeStatus = (sets: number, muscle: string) => {
    const landmarks = volumeLandmarks[muscle as keyof typeof volumeLandmarks];
    if (sets < landmarks.min) return { status: 'Low', color: 'amber' };
    if (sets > landmarks.max) return { status: 'Too High', color: 'red' };
    return { status: 'Optimal', color: 'primary' };
  };

  return (
    <View className="flex-1 bg-zinc-950">
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1 ml-3">
            Volume Tracker
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          <View className="bg-gradient-to-r from-primary to-[#7D0EBE] rounded-xl p-6 mb-6">
            <Text className="text-white text-2xl font-bold mb-2">Training Volume</Text>
            <Text className="text-white opacity-90">
              Monitor weekly set volume
            </Text>
          </View>

          <View className="mb-6">
            <View className="flex-row gap-2 mb-3">
              {periods.map((period) => (
                <TouchableOpacity
                  key={period}
                  onPress={() => setSelectedPeriod(period)}
                  className={`flex-1 ${
                    selectedPeriod === period ? 'bg-primary' : 'bg-zinc-800'
                  } rounded-xl px-3 py-2 border ${
                    selectedPeriod === period ? 'border-blue-400' : 'border-zinc-700'
                  }`}
                >
                  <Text className="text-white font-bold text-center capitalize text-sm">
                    {period}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View className="bg-primary/10 rounded-xl p-6 mb-6 border border-primary/30">
            <Text className="text-primary/80 text-sm mb-2">
              Total Sets This {selectedPeriod.charAt(0).toUpperCase() + selectedPeriod.slice(1)}
            </Text>
            <Text className="text-white text-6xl font-bold">{totalSets}</Text>
          </View>

          <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
            <Text className="text-white font-bold text-lg mb-4">
              Volume by Muscle Group
            </Text>
            {Object.entries(currentData).map(([muscle, data]) => {
              const status = getVolumeStatus(data.sets, muscle);
              return (
                <View key={muscle} className="mb-4 last:mb-0">
                  <View className="flex-row justify-between items-center mb-2">
                    <Text className="text-white font-bold capitalize">{muscle}</Text>
                    <View className="flex-row items-center">
                      <Text className={`text-${status.color}-400 font-bold mr-2`}>
                        {data.sets} sets
                      </Text>
                      {data.change !== 0 && (
                        <View className="flex-row items-center">
                          <Ionicons
                            name={data.change > 0 ? 'trending-up' : 'trending-down'}
                            size={16}
                            color={data.change > 0 ? '#9D12DE' : '#ef4444'}
                          />
                          <Text className={`text-xs ml-1 ${
                            data.change > 0 ? 'text-primary' : 'text-red-400'
                          }`}>
                            {Math.abs(data.change)}
                          </Text>
                        </View>
                      )}
                    </View>
                  </View>
                  <View className="bg-zinc-800 rounded-full h-2 overflow-hidden mb-1">
                    <View
                      className={`h-full bg-${status.color}-500`}
                      style={{ 
                        width: `${Math.min(100, (data.sets / volumeLandmarks[muscle as keyof typeof volumeLandmarks].max) * 100)}%` 
                      }}
                    />
                  </View>
                  <View className="flex-row justify-between items-center">
                    <Text className="text-zinc-500 text-xs">
                      Optimal: {volumeLandmarks[muscle as keyof typeof volumeLandmarks].optimal} sets
                    </Text>
                    <View className={`px-2 py-0.5 rounded-full bg-${status.color}-500/20`}>
                      <Text className={`text-${status.color}-400 text-xs font-bold`}>
                        {status.status}
                      </Text>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>

          {selectedPeriod === 'month' && (
            <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
              <Text className="text-white font-bold text-lg mb-4">Weekly Breakdown</Text>
              {weeklyBreakdown.map((week, idx) => (
                <View key={idx} className="flex-row justify-between items-center bg-zinc-800 rounded-xl p-3 mb-2 last:mb-0">
                  <View>
                    <Text className="text-white font-bold">{week.week}</Text>
                    <Text className="text-zinc-400 text-sm">{week.intensity}</Text>
                  </View>
                  <Text className="text-primary/80 font-bold text-xl">{week.volume}</Text>
                </View>
              ))}
            </View>
          )}

          <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
            <Text className="text-white font-bold text-lg mb-4">Volume Guidelines</Text>
            <View className="bg-primary/10 rounded-xl p-3 mb-2 border border-primary/30">
              <Text className="text-primary font-bold mb-1">Maintenance (MV)</Text>
              <Text className="text-zinc-300 text-sm">
                Minimum sets to maintain muscle: ~10 sets/week
              </Text>
            </View>
            <View className="bg-primary/10 rounded-xl p-3 mb-2 border border-primary/30">
              <Text className="text-primary/80 font-bold mb-1">Optimal (MEV-MAV)</Text>
              <Text className="text-zinc-300 text-sm">
                Growth zone: 12-20 sets/week per muscle
              </Text>
            </View>
            <View className="bg-red-500/10 rounded-xl p-3 border border-red-500/30">
              <Text className="text-red-400 font-bold mb-1">Maximum (MRV)</Text>
              <Text className="text-zinc-300 text-sm">
                Recovery limit: Varies, 20-25+ sets/week
              </Text>
            </View>
          </View>

          <View className="bg-amber-500/10 rounded-xl p-4 border border-amber-500/30 mb-6">
            <Text className="text-amber-400 font-bold mb-2">Volume Management</Text>
            <Text className="text-amber-300 text-sm mb-2">
              • Start at minimum effective volume (MEV)
            </Text>
            <Text className="text-amber-300 text-sm mb-2">
              • Add 1-2 sets per week when progress stalls
            </Text>
            <Text className="text-amber-300 text-sm mb-2">
              • Deload when approaching maximum recoverable volume (MRV)
            </Text>
            <Text className="text-amber-300 text-sm">
              • Track volume to avoid junk volume
            </Text>
          </View>

          <TouchableOpacity className="bg-primary rounded-xl p-4 mb-6">
            <View className="flex-row items-center justify-center">
              <Ionicons name="analytics" size={20} color="white" />
              <Text className="text-white font-bold ml-2">View Detailed Analytics</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

