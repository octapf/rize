import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function CuttingBulking() {
  const [selectedPhase, setSelectedPhase] = useState<string>('cutting');

  const phases = [
    { key: 'cutting', label: 'Cutting', icon: 'trending-down', color: 'red' },
    { key: 'bulking', label: 'Bulking', icon: 'trending-up', color: 'primary' },
    { key: 'maintain', label: 'Maintain', icon: 'pause', color: 'amber' },
  ];

  const phaseData = {
    cutting: {
      title: 'Cutting Phase',
      description: 'Fat loss while preserving muscle',
      duration: '8-16 weeks',
      calorieAdjustment: '-500 cal/day',
      macroSplit: 'High Protein (2.5g/kg), Moderate Carbs (2g/kg), Low Fat (0.7g/kg)',
      trainingVolume: 'Maintain or slightly reduce',
      cardio: '3-4x per week (LISS or HIIT)',
      refeedFrequency: '1x per week',
      dietBreak: 'Every 8-12 weeks (1-2 weeks at maintenance)',
      strategies: [
        {
          title: 'Aggressive Cut',
          deficit: '750 cal',
          duration: '6-8 weeks',
          fatLoss: '1kg/week',
          pros: 'Faster results',
          cons: 'More muscle loss risk',
        },
        {
          title: 'Moderate Cut',
          deficit: '500 cal',
          duration: '10-12 weeks',
          fatLoss: '0.5-0.75kg/week',
          pros: 'Balanced approach',
          cons: 'Slower than aggressive',
        },
        {
          title: 'Conservative Cut',
          deficit: '300 cal',
          duration: '12-16 weeks',
          fatLoss: '0.25-0.5kg/week',
          pros: 'Maximum muscle retention',
          cons: 'Very slow progress',
        },
      ],
    },
    bulking: {
      title: 'Bulking Phase',
      description: 'Muscle gain with minimal fat',
      duration: '12-24 weeks',
      calorieAdjustment: '+300-500 cal/day',
      macroSplit: 'High Protein (2g/kg), High Carbs (4-5g/kg), Moderate Fat (0.9g/kg)',
      trainingVolume: 'High volume progressive overload',
      cardio: '1-2x per week (heart health)',
      refeedFrequency: 'Not needed',
      dietBreak: 'Optional after 16 weeks',
      strategies: [
        {
          title: 'Lean Bulk',
          surplus: '300 cal',
          duration: '16-24 weeks',
          muscleGain: '0.25-0.5kg/week',
          pros: 'Minimal fat gain',
          cons: 'Slower muscle growth',
        },
        {
          title: 'Moderate Bulk',
          surplus: '500 cal',
          duration: '12-20 weeks',
          muscleGain: '0.5-1kg/week',
          pros: 'Good muscle growth',
          cons: 'Some fat gain',
        },
        {
          title: 'Aggressive Bulk',
          surplus: '750 cal',
          duration: '8-12 weeks',
          muscleGain: '1-1.5kg/week',
          pros: 'Maximum strength gains',
          cons: 'Significant fat gain',
        },
      ],
    },
    maintain: {
      title: 'Maintenance Phase',
      description: 'Sustain current physique',
      duration: '4-8 weeks',
      calorieAdjustment: 'Maintenance calories',
      macroSplit: 'Balanced (2g/kg protein, 3g/kg carbs, 0.8g/kg fat)',
      trainingVolume: 'Consistent maintenance',
      cardio: '2-3x per week',
      refeedFrequency: 'Not applicable',
      dietBreak: 'This IS the break',
      strategies: [
        {
          title: 'Active Maintenance',
          surplus: '0 cal',
          duration: '4-8 weeks',
          muscleGain: 'Minimal change',
          pros: 'Mental/physical recovery',
          cons: 'No active progress',
        },
      ],
    },
  };

  const currentPhase = phaseData[selectedPhase as keyof typeof phaseData];

  const weeklyProtocol = {
    cutting: [
      { day: 'Mon', calories: 1800, training: 'Upper Body', cardio: false },
      { day: 'Tue', calories: 1600, training: 'Rest/Cardio', cardio: true },
      { day: 'Wed', calories: 1800, training: 'Lower Body', cardio: false },
      { day: 'Thu', calories: 1600, training: 'Rest/Cardio', cardio: true },
      { day: 'Fri', calories: 1800, training: 'Push', cardio: false },
      { day: 'Sat', calories: 2200, training: 'Pull (Refeed)', cardio: false },
      { day: 'Sun', calories: 1600, training: 'Rest', cardio: false },
    ],
    bulking: [
      { day: 'Mon', calories: 2800, training: 'Chest/Triceps', cardio: false },
      { day: 'Tue', calories: 2800, training: 'Back/Biceps', cardio: false },
      { day: 'Wed', calories: 2600, training: 'Rest/Light Cardio', cardio: true },
      { day: 'Thu', calories: 2800, training: 'Legs', cardio: false },
      { day: 'Fri', calories: 2800, training: 'Shoulders/Arms', cardio: false },
      { day: 'Sat', calories: 2800, training: 'Upper Body', cardio: false },
      { day: 'Sun', calories: 2600, training: 'Rest', cardio: false },
    ],
    maintain: [
      { day: 'Mon', calories: 2400, training: 'Full Body', cardio: false },
      { day: 'Tue', calories: 2200, training: 'Cardio', cardio: true },
      { day: 'Wed', calories: 2400, training: 'Full Body', cardio: false },
      { day: 'Thu', calories: 2200, training: 'Rest', cardio: false },
      { day: 'Fri', calories: 2400, training: 'Full Body', cardio: false },
      { day: 'Sat', calories: 2200, training: 'Active Recovery', cardio: true },
      { day: 'Sun', calories: 2400, training: 'Rest', cardio: false },
    ],
  };

  const protocol = weeklyProtocol[selectedPhase as keyof typeof weeklyProtocol];
  const weeklyAverage = (protocol.reduce((sum, day) => sum + day.calories, 0) / 7).toFixed(0);

  return (
    <View className="flex-1 bg-zinc-950">
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1 ml-3">
            Cut/Bulk Cycles
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          <View className="bg-gradient-to-r from-red-500 to-primary rounded-xl p-6 mb-6">
            <Text className="text-white text-2xl font-bold mb-2">Cycling Strategy</Text>
            <Text className="text-white opacity-90 mb-4">
              Optimize muscle growth and fat loss
            </Text>
            <View className="flex-row items-center">
              <Ionicons name="swap-horizontal" size={20} color="white" />
              <Text className="text-white ml-2">Strategic phase planning</Text>
            </View>
          </View>

          <Text className="text-white font-bold text-lg mb-3">Select Phase</Text>
          <View className="flex-row gap-3 mb-6">
            {phases.map((phase) => (
              <TouchableOpacity
                key={phase.key}
                onPress={() => setSelectedPhase(phase.key)}
                className={`flex-1 ${
                  selectedPhase === phase.key ? `bg-${phase.color}-500` : 'bg-zinc-900'
                } rounded-xl p-4 border ${
                  selectedPhase === phase.key ? `border-${phase.color}-400` : 'border-zinc-800'
                }`}
              >
                <Ionicons
                  name={phase.icon as any}
                  size={28}
                  color={selectedPhase === phase.key ? 'white' : '#71717a'}
                />
                <Text
                  className={`${
                    selectedPhase === phase.key ? 'text-white' : 'text-zinc-400'
                  } font-bold mt-2`}
                >
                  {phase.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
            <Text className="text-white font-bold text-2xl mb-2">{currentPhase.title}</Text>
            <Text className="text-zinc-400 mb-4">{currentPhase.description}</Text>

            <View className="space-y-3">
              <View className="flex-row justify-between py-2 border-b border-zinc-800">
                <Text className="text-zinc-400">Duration</Text>
                <Text className="text-white font-bold">{currentPhase.duration}</Text>
              </View>
              <View className="flex-row justify-between py-2 border-b border-zinc-800">
                <Text className="text-zinc-400">Calories</Text>
                <Text className="text-white font-bold">{currentPhase.calorieAdjustment}</Text>
              </View>
              <View className="flex-row justify-between py-2 border-b border-zinc-800">
                <Text className="text-zinc-400">Training Volume</Text>
                <Text className="text-white font-bold">{currentPhase.trainingVolume}</Text>
              </View>
              <View className="flex-row justify-between py-2 border-b border-zinc-800">
                <Text className="text-zinc-400">Cardio</Text>
                <Text className="text-white font-bold">{currentPhase.cardio}</Text>
              </View>
            </View>
          </View>

          <Text className="text-white font-bold text-lg mb-4">Strategies</Text>

          {currentPhase.strategies.map((strategy, idx) => (
            <View key={idx} className="bg-zinc-900 rounded-xl p-4 mb-3 border border-zinc-800">
              <Text className="text-white font-bold text-lg mb-2">{strategy.title}</Text>
              <View className="bg-primary/10 rounded-lg p-3 mb-3 border border-primary/30">
                <View className="flex-row justify-between mb-2">
                  <Text className="text-primary/80">Calorie Adjustment</Text>
                  <Text className="text-white font-bold">{strategy.surplus || strategy.deficit}</Text>
                </View>
                <View className="flex-row justify-between mb-2">
                  <Text className="text-primary/80">Duration</Text>
                  <Text className="text-white font-bold">{strategy.duration}</Text>
                </View>
                <View className="flex-row justify-between">
                  <Text className="text-primary/80">Expected Rate</Text>
                  <Text className="text-white font-bold">{strategy.muscleGain || strategy.fatLoss}</Text>
                </View>
              </View>
              <View className="flex-row gap-2">
                <View className="flex-1 bg-primary/10 rounded-lg p-2 border border-primary/30">
                  <Text className="text-primary text-xs font-bold mb-1">PRO</Text>
                  <Text className="text-primary/80 text-xs">{strategy.pros}</Text>
                </View>
                <View className="flex-1 bg-red-500/10 rounded-lg p-2 border border-red-500/30">
                  <Text className="text-red-400 text-xs font-bold mb-1">CON</Text>
                  <Text className="text-red-300 text-xs">{strategy.cons}</Text>
                </View>
              </View>
            </View>
          ))}

          <Text className="text-white font-bold text-lg mb-4 mt-6">Weekly Protocol</Text>

          <View className="bg-zinc-900 rounded-xl p-5 mb-3 border border-zinc-800">
            <View className="flex-row justify-between mb-4">
              <Text className="text-zinc-400">Weekly Average</Text>
              <Text className="text-white font-bold text-xl">{weeklyAverage} cal/day</Text>
            </View>

            {protocol.map((day, idx) => (
              <View key={idx} className="bg-zinc-800 rounded-lg p-3 mb-2">
                <View className="flex-row justify-between items-center mb-1">
                  <Text className="text-white font-bold">{day.day}</Text>
                  <Text className="text-primary/80 font-bold">{day.calories} cal</Text>
                </View>
                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center">
                    <Ionicons name="barbell" size={16} color="#71717a" />
                    <Text className="text-zinc-400 text-sm ml-2">{day.training}</Text>
                  </View>
                  {day.cardio && (
                    <View className="bg-amber-500/20 rounded px-2 py-1">
                      <Text className="text-amber-400 text-xs font-bold">CARDIO</Text>
                    </View>
                  )}
                </View>
              </View>
            ))}
          </View>

          <View className="bg-purple-500/10 rounded-xl p-4 border border-purple-500/30 mb-6">
            <Text className="text-purple-400 font-bold mb-2">Cycling Tips</Text>
            <Text className="text-purple-300 text-sm">
              • Bulk when lean (12-15% BF men){'\n'}
              • Cut when necessary (18-20% BF men){'\n'}
              • Diet breaks prevent metabolic adaptation{'\n'}
              • Track weekly averages, not daily{'\n'}
              • Adjust based on 2-week trends{'\n'}
              • Patience: cycles take 3-6 months
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}


