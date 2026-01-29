import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function HistoricalAnalysis() {
  const [selectedPeriod, setSelectedPeriod] = useState<string>('3months');
  const [selectedMetric, setSelectedMetric] = useState<string>('volume');

  const periods = [
    { key: '1month', label: '1 Month' },
    { key: '3months', label: '3 Months' },
    { key: '6months', label: '6 Months' },
    { key: '1year', label: '1 Year' },
  ];

  const metrics = [
    { key: 'volume', label: 'Total Volume', icon: 'barbell', color: 'blue' },
    { key: 'frequency', label: 'Frequency', icon: 'calendar', color: 'emerald' },
    { key: 'duration', label: 'Duration', icon: 'time', color: 'purple' },
    { key: 'intensity', label: 'Intensity', icon: 'flash', color: 'amber' },
  ];

  const monthlyData = [
    { month: 'Oct', volume: 145000, workouts: 16, avgDuration: 72, intensity: 78 },
    { month: 'Nov', volume: 158000, workouts: 18, avgDuration: 75, intensity: 82 },
    { month: 'Dec', volume: 172000, workouts: 20, avgDuration: 78, intensity: 85 },
    { month: 'Ene', volume: 189000, workouts: 22, avgDuration: 80, intensity: 88 },
  ];

  const insights = [
    {
      title: 'Volume Trending Up',
      desc: '+30% en 3 meses',
      icon: 'trending-up',
      color: 'emerald',
      type: 'positive',
    },
    {
      title: 'Consistent Frequency',
      desc: '5 workouts/week promedio',
      icon: 'checkmark-circle',
      color: 'blue',
      type: 'positive',
    },
    {
      title: 'Intensity Increase',
      desc: '+10% avg weight',
      icon: 'flash',
      color: 'amber',
      type: 'positive',
    },
    {
      title: 'No Deload Detected',
      desc: 'Consider recovery week',
      icon: 'alert-circle',
      color: 'red',
      type: 'warning',
    },
  ];

  const bestPerformers = [
    { exercise: 'Bench Press', improvement: '+20kg', percent: '+16.7%' },
    { exercise: 'Squat', improvement: '+35kg', percent: '+19.4%' },
    { exercise: 'Deadlift', improvement: '+40kg', percent: '+21.1%' },
  ];

  const getMetricValue = (month: typeof monthlyData[0], metric: string) => {
    switch (metric) {
      case 'volume': return month.volume;
      case 'frequency': return month.workouts;
      case 'duration': return month.avgDuration;
      case 'intensity': return month.intensity;
      default: return 0;
    }
  };

  const maxValue = Math.max(...monthlyData.map(m => getMetricValue(m, selectedMetric)));

  return (
    <View className="flex-1 bg-zinc-950">
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1 ml-3">
            Historical Analysis
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          <View className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-6 mb-6">
            <Text className="text-white text-2xl font-bold mb-2">Training History</Text>
            <Text className="text-white opacity-90 mb-4">
              Long-term progress analysis
            </Text>
            <View className="flex-row items-center">
              <Ionicons name="stats-chart" size={20} color="white" />
              <Text className="text-white ml-2">4 months tracked</Text>
            </View>
          </View>

          <Text className="text-white font-bold mb-3">Time Period</Text>
          <View className="flex-row gap-2 mb-6">
            {periods.map((period) => (
              <TouchableOpacity
                key={period.key}
                onPress={() => setSelectedPeriod(period.key)}
                className={`flex-1 ${
                  selectedPeriod === period.key ? 'bg-blue-500' : 'bg-zinc-900'
                } rounded-xl py-3 border ${
                  selectedPeriod === period.key ? 'border-blue-400' : 'border-zinc-800'
                }`}
              >
                <Text
                  className={`${
                    selectedPeriod === period.key ? 'text-white' : 'text-zinc-400'
                  } font-bold text-center text-sm`}
                >
                  {period.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text className="text-white font-bold mb-3">Metric</Text>
          <View className="flex-row flex-wrap gap-3 mb-6">
            {metrics.map((metric) => (
              <TouchableOpacity
                key={metric.key}
                onPress={() => setSelectedMetric(metric.key)}
                className={`flex-1 min-w-[45%] ${
                  selectedMetric === metric.key ? `bg-${metric.color}-500` : 'bg-zinc-900'
                } rounded-xl p-3 border ${
                  selectedMetric === metric.key ? `border-${metric.color}-400` : 'border-zinc-800'
                }`}
              >
                <Ionicons
                  name={metric.icon as any}
                  size={24}
                  color={selectedMetric === metric.key ? 'white' : '#71717a'}
                />
                <Text
                  className={`${
                    selectedMetric === metric.key ? 'text-white' : 'text-zinc-400'
                  } font-bold mt-2`}
                >
                  {metric.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
            <Text className="text-white font-bold text-lg mb-4">Trend Chart</Text>
            
            <View className="h-48">
              {monthlyData.map((month, idx) => {
                const value = getMetricValue(month, selectedMetric);
                const height = (value / maxValue) * 100;
                
                return (
                  <View key={idx} className="flex-1 flex-row items-end">
                    <View className="flex-1 items-center">
                      <View className="w-full px-1">
                        <View
                          className="bg-blue-500 rounded-t-lg"
                          style={{ height: `${height}%`, minHeight: 20 }}
                        >
                          <Text className="text-white text-xs font-bold text-center mt-1">
                            {selectedMetric === 'volume' ? `${(value / 1000).toFixed(0)}k` : value}
                          </Text>
                        </View>
                      </View>
                      <Text className="text-zinc-400 text-sm mt-2">{month.month}</Text>
                    </View>
                  </View>
                );
              })}
            </View>
          </View>

          <Text className="text-white font-bold text-lg mb-4">Key Insights</Text>

          {insights.map((insight, idx) => (
            <View
              key={idx}
              className={`bg-${insight.color}-500/10 rounded-xl p-4 mb-3 border border-${insight.color}-500/30`}
            >
              <View className="flex-row items-center">
                <Ionicons
                  name={insight.icon as any}
                  size={24}
                  color={
                    insight.color === 'emerald' ? '#10b981' :
                    insight.color === 'blue' ? '#3b82f6' :
                    insight.color === 'amber' ? '#f59e0b' : '#ef4444'
                  }
                />
                <View className="flex-1 ml-3">
                  <Text className="text-white font-bold">{insight.title}</Text>
                  <Text className={`text-${insight.color}-400 text-sm`}>{insight.desc}</Text>
                </View>
              </View>
            </View>
          ))}

          <Text className="text-white font-bold text-lg mb-4 mt-6">Top Performers</Text>

          {bestPerformers.map((performer, idx) => (
            <View key={idx} className="bg-zinc-900 rounded-xl p-4 mb-3 border border-zinc-800">
              <View className="flex-row items-center justify-between">
                <View className="flex-1">
                  <Text className="text-white font-bold">{performer.exercise}</Text>
                  <Text className="text-zinc-400 text-sm">Last 3 months</Text>
                </View>
                <View className="items-end">
                  <Text className="text-emerald-400 font-bold text-lg">{performer.improvement}</Text>
                  <Text className="text-emerald-500 text-sm">{performer.percent}</Text>
                </View>
              </View>
            </View>
          ))}

          <View className="bg-blue-500/10 rounded-xl p-4 border border-blue-500/30 mb-6">
            <Text className="text-blue-400 font-bold mb-2">Analysis Tips</Text>
            <Text className="text-blue-300 text-sm">
              • Look for upward trends{'\n'}
              • Plateaus = need change{'\n'}
              • Compare similar periods{'\n'}
              • Account for deloads{'\n'}
              • Monthly review recommended
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
