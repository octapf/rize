import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function PRDashboard() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { key: 'all', label: 'All PRs', color: 'blue' },
    { key: 'strength', label: 'Strength', color: 'red' },
    { key: 'volume', label: 'Volume', color: 'purple' },
    { key: 'cardio', label: 'Cardio', color: 'emerald' },
  ];

  const allPRs = [
    {
      exercise: 'Squat',
      weight: 180,
      unit: 'kg',
      date: '15 Dic 2024',
      category: 'strength',
      previous: 175,
      increase: '+5kg',
    },
    {
      exercise: 'Bench Press',
      weight: 120,
      unit: 'kg',
      date: '12 Dic 2024',
      category: 'strength',
      previous: 115,
      increase: '+5kg',
    },
    {
      exercise: 'Deadlift',
      weight: 210,
      unit: 'kg',
      date: '8 Dic 2024',
      category: 'strength',
      previous: 200,
      increase: '+10kg',
    },
    {
      exercise: 'Pull-ups',
      weight: 12,
      unit: 'reps',
      date: '5 Dic 2024',
      category: 'strength',
      previous: 10,
      increase: '+2 reps',
    },
    {
      exercise: 'Chest Volume',
      weight: 12500,
      unit: 'kg',
      date: '1 Dic 2024',
      category: 'volume',
      previous: 11200,
      increase: '+1300kg',
    },
    {
      exercise: '5K Run',
      weight: 22.5,
      unit: 'min',
      date: '28 Nov 2024',
      category: 'cardio',
      previous: 24.2,
      increase: '-1.7min',
    },
  ];

  const filteredPRs = selectedCategory === 'all'
    ? allPRs
    : allPRs.filter(pr => pr.category === selectedCategory);

  const stats = {
    totalPRs: allPRs.length,
    thisMonth: 4,
    thisYear: 32,
    streak: 6,
  };

  const milestones = [
    { name: '100kg Bench', achieved: true, date: '15 Ene 2024' },
    { name: '200kg Deadlift', achieved: true, date: '8 Dic 2024' },
    { name: '150kg Squat', achieved: true, date: '22 Oct 2024' },
    { name: '225kg Deadlift', achieved: false, date: 'Próximamente' },
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'strength': return 'barbell';
      case 'volume': return 'fitness';
      case 'cardio': return 'pulse';
      default: return 'trophy';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'strength': return 'red';
      case 'volume': return 'purple';
      case 'cardio': return 'emerald';
      default: return 'blue';
    }
  };

  return (
    <View className="flex-1 bg-zinc-950">
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1 ml-3">
            PR Dashboard
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          <View className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl p-6 mb-6">
            <Text className="text-white text-2xl font-bold mb-2">Personal Records</Text>
            <Text className="text-white opacity-90 mb-4">
              Track all your lifetime bests
            </Text>
            <View className="flex-row items-center">
              <Ionicons name="trophy" size={20} color="white" />
              <Text className="text-white ml-2">{stats.totalPRs} PRs establecidos</Text>
            </View>
          </View>

          <View className="flex-row gap-3 mb-6">
            <View className="flex-1 bg-zinc-900 rounded-xl p-4 border border-zinc-800">
              <Ionicons name="flame" size={24} color="#FFEA00" />
              <Text className="text-2xl font-bold text-white mt-2">{stats.thisMonth}</Text>
              <Text className="text-zinc-400 text-sm">This Month</Text>
            </View>
            <View className="flex-1 bg-zinc-900 rounded-xl p-4 border border-zinc-800">
              <Ionicons name="calendar" size={24} color="#9D12DE" />
              <Text className="text-2xl font-bold text-white mt-2">{stats.thisYear}</Text>
              <Text className="text-zinc-400 text-sm">This Year</Text>
            </View>
            <View className="flex-1 bg-zinc-900 rounded-xl p-4 border border-zinc-800">
              <Ionicons name="trending-up" size={24} color="#9D12DE" />
              <Text className="text-2xl font-bold text-white mt-2">{stats.streak}</Text>
              <Text className="text-zinc-400 text-sm">Week Streak</Text>
            </View>
          </View>

          <Text className="text-white font-bold text-lg mb-4">Categories</Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6">
            <View className="flex-row gap-3">
              {categories.map((cat) => (
                <TouchableOpacity
                  key={cat.key}
                  onPress={() => setSelectedCategory(cat.key)}
                  className={`${
                    selectedCategory === cat.key ? `bg-${cat.color}-500` : 'bg-zinc-900'
                  } rounded-xl px-6 py-3 border ${
                    selectedCategory === cat.key ? `border-${cat.color}-400` : 'border-zinc-800'
                  }`}
                >
                  <Text
                    className={`${
                      selectedCategory === cat.key ? 'text-white' : 'text-zinc-400'
                    } font-bold`}
                  >
                    {cat.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          <Text className="text-white font-bold text-lg mb-4">Recent PRs</Text>

          {filteredPRs.map((pr, idx) => (
            <View
              key={idx}
              className={`bg-${getCategoryColor(pr.category)}-500/10 rounded-xl p-5 mb-4 border border-${getCategoryColor(pr.category)}-500/30`}
            >
              <View className="flex-row items-start justify-between mb-3">
                <View className="flex-1">
                  <View className="flex-row items-center mb-2">
                    <Ionicons
                      name={getCategoryIcon(pr.category) as any}
                      size={20}
                      color={
                        pr.category === 'strength' ? '#ef4444' :
                        pr.category === 'volume' ? '#a855f7' : '#9D12DE'
                      }
                    />
                    <Text className="text-white font-bold text-lg ml-2">{pr.exercise}</Text>
                  </View>
                  <Text className="text-zinc-400 text-sm">{pr.date}</Text>
                </View>
                <View className={`bg-${getCategoryColor(pr.category)}-500 rounded-xl px-4 py-2`}>
                  <Text className="text-white font-bold text-lg">
                    {pr.weight} {pr.unit}
                  </Text>
                </View>
              </View>

              <View className="flex-row items-center justify-between pt-3 border-t border-zinc-800">
                <Text className="text-zinc-400 text-sm">
                  Previous: {pr.previous} {pr.unit}
                </Text>
                <View className="flex-row items-center">
                  <Ionicons name="trending-up" size={16} color="#9D12DE" />
                  <Text className="text-primary font-bold text-sm ml-1">{pr.increase}</Text>
                </View>
              </View>
            </View>
          ))}

          <Text className="text-white font-bold text-lg mb-4 mt-6">Milestones</Text>

          {milestones.map((milestone, idx) => (
            <View
              key={idx}
              className={`bg-zinc-900 rounded-xl p-4 mb-3 border ${
                milestone.achieved ? 'border-primary' : 'border-zinc-800'
              }`}
            >
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center flex-1">
                  <Ionicons
                    name={milestone.achieved ? 'checkmark-circle' : 'ellipse-outline'}
                    size={24}
                    color={milestone.achieved ? '#9D12DE' : '#71717a'}
                  />
                  <View className="ml-3 flex-1">
                    <Text className={`${milestone.achieved ? 'text-white' : 'text-zinc-400'} font-bold`}>
                      {milestone.name}
                    </Text>
                    <Text className="text-zinc-500 text-sm">{milestone.date}</Text>
                  </View>
                </View>
                {milestone.achieved && (
                  <View className="bg-primary rounded-full px-3 py-1">
                    <Text className="text-white text-xs font-bold">DONE</Text>
                  </View>
                )}
              </View>
            </View>
          ))}

          <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-6">
            <Text className="text-primary/80 font-bold mb-2">PR Tips</Text>
            <Text className="text-primary/60 text-sm">
              • Valida PRs con buena técnica{'\n'}
              • No intentes PR con fatiga acumulada{'\n'}
              • Calentamiento específico antes de PRs{'\n'}
              • Filma tus PRs para analizar técnica{'\n'}
              • Celebra cada logro!
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

