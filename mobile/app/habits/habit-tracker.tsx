import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

type Habit = {
  id: string;
  name: string;
  category: 'training' | 'nutrition' | 'recovery' | 'mindset';
  icon: any;
  frequency: string;
  streak: number;
  completed: boolean[];
};

export default function HabitTracker() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'training' | 'nutrition' | 'recovery' | 'mindset'>('all');

  const categories = [
    { id: 'all' as const, name: 'All', color: 'white' },
    { id: 'training' as const, name: 'Training', color: 'blue' },
    { id: 'nutrition' as const, name: 'Nutrition', color: 'emerald' },
    { id: 'recovery' as const, name: 'Recovery', color: 'purple' },
    { id: 'mindset' as const, name: 'Mindset', color: 'amber' },
  ];

  const habitTemplates = [
    {
      category: 'training',
      name: 'Complete Scheduled Workout',
      icon: 'barbell' as const,
      frequency: 'Daily',
      importance: 'Critical',
      tips: 'Follow your program, don\'t skip',
    },
    {
      category: 'training',
      name: 'Warm-up Properly',
      icon: 'fitness' as const,
      frequency: 'Every workout',
      importance: 'High',
      tips: '10-15 min dynamic warm-up',
    },
    {
      category: 'training',
      name: 'Track All Sets',
      icon: 'create' as const,
      frequency: 'Every workout',
      importance: 'High',
      tips: 'Log weight, reps, RPE immediately',
    },
    {
      category: 'training',
      name: 'Mobility Work',
      icon: 'body' as const,
      frequency: 'Daily',
      importance: 'Medium',
      tips: '15 min stretching or yoga',
    },
    {
      category: 'nutrition',
      name: 'Hit Protein Target',
      icon: 'nutrition' as const,
      frequency: 'Daily',
      importance: 'Critical',
      tips: '1.6-2.2g per kg bodyweight',
    },
    {
      category: 'nutrition',
      name: 'Track Calories',
      icon: 'calculator' as const,
      frequency: 'Daily',
      importance: 'High',
      tips: 'MyFitnessPal or similar',
    },
    {
      category: 'nutrition',
      name: 'Meal Prep',
      icon: 'restaurant' as const,
      frequency: 'Weekly',
      importance: 'High',
      tips: 'Sundays, prep 3-4 days worth',
    },
    {
      category: 'nutrition',
      name: 'Hydration (3L+)',
      icon: 'water' as const,
      frequency: 'Daily',
      importance: 'Medium',
      tips: 'Carry water bottle everywhere',
    },
    {
      category: 'recovery',
      name: '7+ Hours Sleep',
      icon: 'moon' as const,
      frequency: 'Daily',
      importance: 'Critical',
      tips: 'Same sleep/wake time daily',
    },
    {
      category: 'recovery',
      name: 'Take Rest Days',
      icon: 'bed' as const,
      frequency: 'Weekly',
      importance: 'High',
      tips: 'At least 1-2 full rest days',
    },
    {
      category: 'recovery',
      name: 'Active Recovery',
      icon: 'walk' as const,
      frequency: '2-3x per week',
      importance: 'Medium',
      tips: 'Walk, swim, easy bike',
    },
    {
      category: 'recovery',
      name: 'Scheduled Deloads',
      icon: 'calendar' as const,
      frequency: 'Every 4-6 weeks',
      importance: 'High',
      tips: 'Plan deloads proactively',
    },
    {
      category: 'mindset',
      name: 'Morning Routine',
      icon: 'sunny' as const,
      frequency: 'Daily',
      importance: 'Medium',
      tips: '15 min: meditation, journal, plan',
    },
    {
      category: 'mindset',
      name: 'Gratitude Practice',
      icon: 'heart' as const,
      frequency: 'Daily',
      importance: 'Medium',
      tips: 'Write 3 things you\'re grateful for',
    },
    {
      category: 'mindset',
      name: 'Review Weekly Progress',
      icon: 'analytics' as const,
      frequency: 'Weekly',
      importance: 'High',
      tips: 'Sunday: review last week, plan next',
    },
    {
      category: 'mindset',
      name: 'Limit Social Media',
      icon: 'phone-portrait' as const,
      frequency: 'Daily',
      importance: 'Medium',
      tips: 'Max 30 min per day',
    },
  ];

  const filteredHabits =
    selectedCategory === 'all'
      ? habitTemplates
      : habitTemplates.filter((h) => h.category === selectedCategory);

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case 'Critical': return 'red';
      case 'High': return 'amber';
      case 'Medium': return 'blue';
      default: return 'zinc';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'training': return 'blue';
      case 'nutrition': return 'emerald';
      case 'recovery': return 'purple';
      case 'mindset': return 'amber';
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
            Habit Tracker
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          <View className="bg-gradient-to-r from-emerald-500 to-blue-500 rounded-xl p-6 mb-6">
            <Text className="text-white text-2xl font-bold mb-2">Build Consistency</Text>
            <Text className="text-white opacity-90">
              Track daily habits that matter
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
                    <Text
                      className={`${
                        selectedCategory === cat.id && cat.color === 'white'
                          ? 'text-zinc-950'
                          : 'text-white'
                      } font-bold`}
                    >
                      {cat.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>

          <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
            <Text className="text-white font-bold text-lg mb-4">
              Essential Habits ({filteredHabits.length})
            </Text>

            {filteredHabits.map((habit, idx) => {
              const catColor = getCategoryColor(habit.category);
              const impColor = getImportanceColor(habit.importance);

              return (
                <View
                  key={idx}
                  className={`bg-${catColor}-500/10 rounded-xl p-4 mb-3 last:mb-0 border border-${catColor}-500/30`}
                >
                  <View className="flex-row items-start justify-between mb-2">
                    <View className="flex-row items-center flex-1">
                      <Ionicons
                        name={habit.icon}
                        size={24}
                        color={`#${catColor === 'blue' ? '3b82f6' : catColor === 'emerald' ? '10b981' : catColor === 'purple' ? 'a855f7' : 'f59e0b'}`}
                      />
                      <Text className={`text-${catColor}-400 font-bold text-lg ml-2 flex-1`}>
                        {habit.name}
                      </Text>
                    </View>
                    <View className={`bg-${impColor}-500/20 rounded-full px-2 py-1 border border-${impColor}-500/40 ml-2`}>
                      <Text className={`text-${impColor}-400 text-xs font-bold`}>
                        {habit.importance}
                      </Text>
                    </View>
                  </View>

                  <View className="flex-row justify-between items-center mb-2">
                    <View className="flex-row items-center">
                      <Ionicons name="time" size={14} color="#71717a" />
                      <Text className="text-zinc-400 text-sm ml-1">{habit.frequency}</Text>
                    </View>
                  </View>

                  <View className={`bg-${catColor}-500/20 rounded-lg p-2 border border-${catColor}-500/40`}>
                    <Text className={`text-${catColor}-300 text-sm`}>
                      💡 {habit.tips}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>

          <View className="bg-blue-500/10 rounded-xl p-4 border border-blue-500/30 mb-6">
            <Text className="text-blue-400 font-bold mb-2">Habit Stacking Strategy</Text>
            <Text className="text-blue-300 text-sm mb-3">
              Link new habits to existing ones:
            </Text>
            <View className="space-y-2">
              <View className="bg-zinc-900 rounded-lg p-2">
                <Text className="text-white text-sm">
                  After I <Text className="text-blue-400 font-bold">wake up</Text>, I will{' '}
                  <Text className="text-emerald-400 font-bold">drink 500ml water</Text>
                </Text>
              </View>
              <View className="bg-zinc-900 rounded-lg p-2">
                <Text className="text-white text-sm">
                  After I <Text className="text-blue-400 font-bold">finish workout</Text>, I will{' '}
                  <Text className="text-emerald-400 font-bold">log it immediately</Text>
                </Text>
              </View>
              <View className="bg-zinc-900 rounded-lg p-2">
                <Text className="text-white text-sm">
                  After I <Text className="text-blue-400 font-bold">brush teeth</Text>, I will{' '}
                  <Text className="text-emerald-400 font-bold">do 2 min stretching</Text>
                </Text>
              </View>
            </View>
          </View>

          <View className="bg-emerald-500/10 rounded-xl p-4 border border-emerald-500/30 mb-6">
            <Text className="text-emerald-400 font-bold mb-2">The 1% Rule</Text>
            <Text className="text-emerald-300 text-sm">
              Getting 1% better every day means you're 37x better after a year. Focus on consistency over intensity.
            </Text>
          </View>

          <View className="bg-amber-500/10 rounded-xl p-4 border border-amber-500/30 mb-6">
            <Text className="text-amber-400 font-bold mb-2">Tracking Tips</Text>
            <Text className="text-amber-300 text-sm">
              • Start with 2-3 habits max{'\n'}
              • Make it impossible to ignore{'\n'}
              • Never miss twice in a row{'\n'}
              • Track immediately (don't delay){'\n'}
              • Celebrate streaks{'\n'}
              • Be patient (takes 66 days average)
            </Text>
          </View>

          <View className="bg-purple-500/10 rounded-xl p-4 border border-purple-500/30 mb-6">
            <Text className="text-purple-400 font-bold mb-2">Habit Formation Science</Text>
            <Text className="text-purple-300 text-sm">
              <Text className="font-bold">Cue:</Text> Trigger for the habit{'\n'}
              <Text className="font-bold">Routine:</Text> The habit itself{'\n'}
              <Text className="font-bold">Reward:</Text> Benefit you get{'\n'}
              {'\n'}
              Make cues obvious, routines easy, and rewards satisfying.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
