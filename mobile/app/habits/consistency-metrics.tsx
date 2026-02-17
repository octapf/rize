import React, { useState } from 'react';
import { Text } from '@/components/ui/Text';
import { View, TouchableOpacity, ScrollView } from 'react-native';;
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function ConsistencyMetrics() {
  const [selectedMetric, setSelectedMetric] = useState('adherence');

  const metrics = [
    {
      id: 'adherence',
      name: 'Training Adherence',
      icon: 'checkmark-circle' as const,
      color: 'blue',
      description: 'Percentage of planned workouts completed',
      calculation: '(Completed Workouts / Planned Workouts) • 100',
      targets: [
        { level: 'Excellent', range: '90-100%', impact: 'Maximum progress' },
        { level: 'Good', range: '80-89%', impact: 'Solid progress' },
        { level: 'Acceptable', range: '70-79%', impact: 'Some progress' },
        { level: 'Poor', range: '<70%', impact: 'Minimal progress' },
      ],
    },
    {
      id: 'streak',
      name: 'Current Streak',
      icon: 'flame' as const,
      color: 'red',
      description: 'Consecutive days/weeks of adherence',
      calculation: 'Days without missing a planned session',
      targets: [
        { level: '30 Days', range: '1 month', impact: 'Habit forming' },
        { level: '100 Days', range: '3+ months', impact: 'Habit established' },
        { level: '365 Days', range: '1 year', impact: 'Lifestyle change' },
        { level: '1000 Days', range: '3 years', impact: 'Elite consistency' },
      ],
    },
    {
      id: 'volume',
      name: 'Volume Consistency',
      icon: 'barbell' as const,
      color: 'primary',
      description: 'Week-to-week volume stability',
      calculation: 'Standard deviation of weekly volume',
      targets: [
        { level: 'Very Stable', range: '±5%', impact: 'Excellent programming' },
        { level: 'Stable', range: '±10%', impact: 'Good programming' },
        { level: 'Variable', range: '±20%', impact: 'Consider planning' },
        { level: 'Erratic', range: '>20%', impact: 'Needs structure' },
      ],
    },
    {
      id: 'nutrition',
      name: 'Nutrition Adherence',
      icon: 'nutrition' as const,
      color: 'purple',
      description: 'Hitting macro/calorie targets',
      calculation: '(Days within ±5% targets / Total Days) • 100',
      targets: [
        { level: 'Elite', range: '95-100%', impact: 'Max results' },
        { level: 'Excellent', range: '85-94%', impact: 'Great results' },
        { level: 'Good', range: '75-84%', impact: 'Good results' },
        { level: 'Needs Work', range: '<75%', impact: 'Holding back progress' },
      ],
    },
    {
      id: 'recovery',
      name: 'Recovery Consistency',
      icon: 'moon' as const,
      color: 'amber',
      description: '7+ hours sleep per night',
      calculation: '(Nights with 7+ hours / Total Nights) • 100',
      targets: [
        { level: 'Optimal', range: '90-100%', impact: 'Peak recovery' },
        { level: 'Good', range: '75-89%', impact: 'Adequate recovery' },
        { level: 'Suboptimal', range: '60-74%', impact: 'Impaired gains' },
        { level: 'Poor', range: '<60%', impact: 'Severely compromised' },
      ],
    },
  ];

  const currentMetric = metrics.find((m) => m.id === selectedMetric)!;

  const weeklyConsistency = {
    weeks: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    workouts: [4, 4, 3, 4],
    planned: [4, 4, 4, 4],
    adherence: [100, 100, 75, 100],
  };

  const overallStats = {
    totalWorkouts: 15,
    plannedWorkouts: 16,
    adherenceRate: 94,
    currentStreak: 12,
    longestStreak: 28,
    missedWorkouts: 1,
  };

  return (
    <View className="flex-1 bg-zinc-950">
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1 ml-3">
            Consistency Metrics
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          <View className="bg-gradient-to-r from-blue-500 to-primary rounded-xl p-6 mb-6">
            <Text className="text-white text-2xl font-bold mb-2">Track Consistency</Text>
            <Text className="text-white opacity-90">
              Consistency beats intensity
            </Text>
          </View>

          <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
            <Text className="text-white font-bold text-lg mb-4">Overall Stats (Last 30 Days)</Text>
            
            <View className="flex-row flex-wrap gap-3">
              <View className="flex-1 min-w-[45%] bg-primary/10 rounded-xl p-3 border border-primary/30">
                <Text className="text-primary/80 text-sm mb-1">Adherence Rate</Text>
                <Text className="text-white font-bold text-2xl">{overallStats.adherenceRate}%</Text>
              </View>
              <View className="flex-1 min-w-[45%] bg-primary/10 rounded-xl p-3 border border-primary/30">
                <Text className="text-primary text-sm mb-1">Current Streak</Text>
                <Text className="text-white font-bold text-2xl">{overallStats.currentStreak} days</Text>
              </View>
              <View className="flex-1 min-w-[45%] bg-purple-500/10 rounded-xl p-3 border border-purple-500/30">
                <Text className="text-purple-400 text-sm mb-1">Total Workouts</Text>
                <Text className="text-white font-bold text-2xl">{overallStats.totalWorkouts}</Text>
              </View>
              <View className="flex-1 min-w-[45%] bg-amber-500/10 rounded-xl p-3 border border-amber-500/30">
                <Text className="text-amber-400 text-sm mb-1">Longest Streak</Text>
                <Text className="text-white font-bold text-2xl">{overallStats.longestStreak} days</Text>
              </View>
            </View>
          </View>

          <View className="mb-6">
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View className="flex-row gap-3">
                {metrics.map((metric) => (
                  <TouchableOpacity
                    key={metric.id}
                    onPress={() => setSelectedMetric(metric.id)}
                    className={`${
                      selectedMetric === metric.id
                        ? `bg-${metric.color}-500`
                        : 'bg-zinc-800'
                    } rounded-xl px-4 py-3 border ${
                      selectedMetric === metric.id
                        ? `border-${metric.color}-400`
                        : 'border-zinc-700'
                    }`}
                  >
                    <View className="flex-row items-center">
                      <Ionicons name={metric.icon} size={20} color="white" />
                      <Text className="text-white font-bold ml-2 text-sm">{metric.name}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>

          <View className={`bg-${currentMetric.color}-500/10 rounded-xl p-5 mb-6 border border-${currentMetric.color}-500/30`}>
            <View className="flex-row items-center mb-3">
              <Ionicons name={currentMetric.icon} size={28} color={`#${currentMetric.color === 'blue' ? '3b82f6' : currentMetric.color === 'red' ? 'ef4444' : currentMetric.color === 'primary' ? '9D12DE' : currentMetric.color === 'purple' ? 'a855f7' : 'f59e0b'}`} />
              <Text className={`text-${currentMetric.color}-400 font-bold text-2xl ml-3`}>
                {currentMetric.name}
              </Text>
            </View>
            <Text className="text-zinc-300 mb-3">{currentMetric.description}</Text>
            <View className="bg-zinc-900 rounded-xl p-3">
              <Text className="text-zinc-400 text-sm mb-1">Calculation:</Text>
              <Text className="text-white font-mono text-sm">{currentMetric.calculation}</Text>
            </View>
          </View>

          <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
            <Text className="text-white font-bold text-lg mb-4">Performance Targets</Text>
            {currentMetric.targets.map((target, idx) => {
              const colors = ['primary', 'blue', 'amber', 'red'];
              const color = colors[idx];
              
              return (
                <View
                  key={idx}
                  className={`bg-${color}-500/10 rounded-xl p-4 mb-3 last:mb-0 border border-${color}-500/30`}
                >
                  <View className="flex-row justify-between items-center mb-2">
                    <Text className={`text-${color}-400 font-bold text-lg`}>
                      {target.level}
                    </Text>
                    <View className={`bg-${color}-500/20 rounded-full px-3 py-1 border border-${color}-500/40`}>
                      <Text className={`text-${color}-400 font-bold text-sm`}>
                        {target.range}
                      </Text>
                    </View>
                  </View>
                  <Text className="text-zinc-300 text-sm">{target.impact}</Text>
                </View>
              );
            })}
          </View>

          <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
            <Text className="text-white font-bold text-lg mb-4">Weekly Breakdown</Text>
            {weeklyConsistency.weeks.map((week, idx) => {
              const adherence = weeklyConsistency.adherence[idx];
              const color = adherence >= 90 ? 'primary' : adherence >= 75 ? 'blue' : 'amber';
              
              return (
                <View
                  key={idx}
                  className="bg-zinc-800 rounded-xl p-4 mb-3 last:mb-0 border border-zinc-700"
                >
                  <View className="flex-row justify-between items-center mb-2">
                    <Text className="text-white font-bold">{week}</Text>
                    <Text className={`text-${color}-400 font-bold text-lg`}>
                      {adherence}%
                    </Text>
                  </View>
                  <View className="flex-row items-center">
                    <Text className="text-zinc-400 text-sm">
                      {weeklyConsistency.workouts[idx]}/{weeklyConsistency.planned[idx]} workouts
                    </Text>
                  </View>
                  <View className="bg-zinc-900 rounded-full h-2 mt-2">
                    <View
                      className={`bg-${color}-500 rounded-full h-2`}
                      style={{ width: `${adherence}%` }}
                    />
                  </View>
                </View>
              );
            })}
          </View>

          <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-6">
            <Text className="text-primary/80 font-bold mb-2">Why Consistency Matters</Text>
            <Text className="text-primary/60 text-sm">
              • 80% adherence beats 100% intensity{'\n'}
              • Small daily actions compound{'\n'}
              • Builds unbreakable habits{'\n'}
              • Prevents boom-bust cycles{'\n'}
              • Long-term &gt; short-term heroics
            </Text>
          </View>

          <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-6">
            <Text className="text-primary font-bold mb-2">Improving Consistency</Text>
            <Text className="text-primary/80 text-sm">
              • Schedule workouts like meetings{'\n'}
              • Remove friction (prep gear night before){'\n'}
              • Never miss twice in a row{'\n'}
              • Track immediately{'\n'}
              • Accountability partner{'\n'}
              • Forgive missed days, refocus
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}


