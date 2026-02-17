import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

type Milestone = {
  id: number;
  title: string;
  category: 'strength' | 'body' | 'performance' | 'habit';
  achieved: boolean;
  date?: string;
};

export default function ProgressMilestones() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'strength' | 'body' | 'performance' | 'habit'>('all');

  const categories = [
    { id: 'all' as const, name: 'All', icon: 'apps' as const, color: 'white' },
    { id: 'strength' as const, name: 'Strength', icon: 'barbell' as const, color: 'blue' },
    { id: 'body' as const, name: 'Body', icon: 'body' as const, color: 'primary' },
    { id: 'performance' as const, name: 'Performance', icon: 'flash' as const, color: 'purple' },
    { id: 'habit' as const, name: 'Habits', icon: 'checkmark-circle' as const, color: 'amber' },
  ];

  const milestoneTemplates = [
    {
      category: 'strength',
      title: 'First Bodyweight Bench Press',
      description: 'Bench press your own bodyweight for 1 rep',
      difficulty: 'Beginner',
      icon: 'fitness' as const,
    },
    {
      category: 'strength',
      title: '1.5x BW Squat',
      description: 'Squat 1.5 times your bodyweight',
      difficulty: 'Intermediate',
      icon: 'barbell' as const,
    },
    {
      category: 'strength',
      title: '2x BW Deadlift',
      description: 'Deadlift double your bodyweight',
      difficulty: 'Intermediate',
      icon: 'barbell' as const,
    },
    {
      category: 'strength',
      title: 'The 1000lb Club',
      description: 'Squat + Bench + Deadlift totals 1000lbs',
      difficulty: 'Intermediate',
      icon: 'trophy' as const,
    },
    {
      category: 'strength',
      title: 'The 1200lb Club',
      description: 'S+B+D totals 1200lbs',
      difficulty: 'Advanced',
      icon: 'trophy' as const,
    },
    {
      category: 'body',
      title: 'First Visible Abs',
      description: 'Reach body fat level where abs are visible',
      difficulty: 'Beginner',
      icon: 'body' as const,
    },
    {
      category: 'body',
      title: 'Lean 10% Body Fat',
      description: 'Achieve and maintain 10% BF (male) / 18% (female)',
      difficulty: 'Intermediate',
      icon: 'body' as const,
    },
    {
      category: 'body',
      title: '+5kg Lean Mass',
      description: 'Gain 5kg of muscle while staying under 15% BF',
      difficulty: 'Intermediate',
      icon: 'fitness' as const,
    },
    {
      category: 'body',
      title: 'Stage-Ready Condition',
      description: '6-8% BF (male) / 14-16% (female) with muscle',
      difficulty: 'Advanced',
      icon: 'body' as const,
    },
    {
      category: 'performance',
      title: 'First Pull-up',
      description: 'Complete 1 strict pull-up from dead hang',
      difficulty: 'Beginner',
      icon: 'arrow-up' as const,
    },
    {
      category: 'performance',
      title: '10 Consecutive Pull-ups',
      description: '10 strict pull-ups unbroken',
      difficulty: 'Intermediate',
      icon: 'arrow-up' as const,
    },
    {
      category: 'performance',
      title: '20 Consecutive Pull-ups',
      description: '20 strict pull-ups in one set',
      difficulty: 'Advanced',
      icon: 'arrow-up' as const,
    },
    {
      category: 'performance',
      title: '5K in Under 25min',
      description: 'Run 5 kilometers in under 25 minutes',
      difficulty: 'Beginner',
      icon: 'walk' as const,
    },
    {
      category: 'performance',
      title: '5K in Under 20min',
      description: 'Run 5K in under 20 minutes',
      difficulty: 'Advanced',
      icon: 'walk' as const,
    },
    {
      category: 'habit',
      title: '30 Day Training Streak',
      description: 'Train every scheduled day for 30 days',
      difficulty: 'Beginner',
      icon: 'checkmark-circle' as const,
    },
    {
      category: 'habit',
      title: '100 Day Training Streak',
      description: 'No missed workouts for 100 days',
      difficulty: 'Intermediate',
      icon: 'checkmark-circle' as const,
    },
    {
      category: 'habit',
      title: '1 Year Consistent',
      description: '52 weeks of consistent training (80%+ adherence)',
      difficulty: 'Advanced',
      icon: 'trophy' as const,
    },
    {
      category: 'habit',
      title: '30 Days Perfect Nutrition',
      description: 'Hit macros and calories 30 days straight',
      difficulty: 'Intermediate',
      icon: 'nutrition' as const,
    },
  ];

  const filteredMilestones =
    selectedCategory === 'all'
      ? milestoneTemplates
      : milestoneTemplates.filter((m) => m.category === selectedCategory);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'primary';
      case 'Intermediate': return 'blue';
      case 'Advanced': return 'purple';
      default: return 'zinc';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'strength': return 'blue';
      case 'body': return 'primary';
      case 'performance': return 'purple';
      case 'habit': return 'amber';
      default: return 'zinc';
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
            Progress Milestones
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          <View className="bg-gradient-to-r from-primary to-[#7D0EBE] rounded-xl p-6 mb-6">
            <Text className="text-white text-2xl font-bold mb-2">Track Your Wins</Text>
            <Text className="text-white opacity-90">
              Celebrate every achievement
            </Text>
          </View>

          <View className="mb-6">
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View className="flex-row gap-3">
                {categories.map((cat) => (
                  <TouchableOpacity
                    key={cat.id}
                    onPress={() => setSelectedCategory(cat.id)}
                    className={`${
                      selectedCategory === cat.id
                        ? cat.color === 'white'
                          ? 'bg-white'
                          : `bg-${cat.color}-500`
                        : 'bg-zinc-800'
                    } rounded-xl px-4 py-3 border ${
                      selectedCategory === cat.id
                        ? cat.color === 'white'
                          ? 'border-white'
                          : `border-${cat.color}-400`
                        : 'border-zinc-700'
                    }`}
                  >
                    <View className="flex-row items-center">
                      <Ionicons
                        name={cat.icon}
                        size={20}
                        color={selectedCategory === cat.id && cat.color === 'white' ? '#18181b' : 'white'}
                      />
                      <Text
                        className={`${
                          selectedCategory === cat.id && cat.color === 'white'
                            ? 'text-zinc-950'
                            : 'text-white'
                        } font-bold ml-2`}
                      >
                        {cat.name}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>

          <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
            <Text className="text-white font-bold text-lg mb-4">
              Milestone Library ({filteredMilestones.length})
            </Text>

            {filteredMilestones.map((milestone, idx) => {
              const catColor = getCategoryColor(milestone.category);
              const diffColor = getDifficultyColor(milestone.difficulty);
              
              return (
                <View
                  key={idx}
                  className={`bg-${catColor}-500/10 rounded-xl p-4 mb-3 last:mb-0 border border-${catColor}-500/30`}
                >
                  <View className="flex-row items-start justify-between mb-2">
                    <View className="flex-row items-center flex-1">
                      <Ionicons name={milestone.icon} size={24} color={`#${catColor === 'blue' ? '3b82f6' : catColor === 'primary' ? '9D12DE' : catColor === 'purple' ? 'a855f7' : 'f59e0b'}`} />
                      <Text className={`text-${catColor}-400 font-bold text-lg ml-2 flex-1`}>
                        {milestone.title}
                      </Text>
                    </View>
                    <View className={`bg-${diffColor}-500/20 rounded-full px-2 py-1 border border-${diffColor}-500/40 ml-2`}>
                      <Text className={`text-${diffColor}-400 text-xs font-bold`}>
                        {milestone.difficulty}
                      </Text>
                    </View>
                  </View>
                  <Text className="text-zinc-300 text-sm">{milestone.description}</Text>
                </View>
              );
            })}
          </View>

          <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-6">
            <Text className="text-primary font-bold mb-2">Milestone Benefits</Text>
            <Text className="text-primary/80 text-sm">
              ? Keeps motivation high{'\n'}
              ? Provides clear targets{'\n'}
              ? Celebrates progress{'\n'}
              ? Builds confidence{'\n'}
              ? Documents journey
            </Text>
          </View>

          <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-6">
            <Text className="text-primary/80 font-bold mb-2">How to Use Milestones</Text>
            <Text className="text-primary/60 text-sm">
              • Pick 1-3 milestones to chase{'\n'}
              • Break into smaller weekly goals{'\n'}
              • Track attempts and near-misses{'\n'}
              • Celebrate when you hit them{'\n'}
              • Share wins with community{'\n'}
              • Move to next challenge
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}



