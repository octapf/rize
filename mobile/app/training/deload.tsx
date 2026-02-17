import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function DeloadProtocols() {
  const [selectedProtocol, setSelectedProtocol] = useState('volume');

  const protocols = {
    volume: {
      name: 'Volume Deload',
      icon: 'remove-circle',
      color: 'blue',
      method: 'Reduce volume by 50%',
      description: 'Cut sets in half, keep intensity',
      example: {
        normal: 'Squat: 4x5 @ 85% 1RM',
        deload: 'Squat: 2x5 @ 85% 1RM',
      },
      duration: '1 week',
      bestFor: 'Most lifters, general fatigue',
      implementation: [
        'Keep same exercises and weights',
        'Cut sets by 50% (4 sets → 2 sets)',
        'Keep reps the same',
        'Maintain frequency (still train 3-5x/week)',
        'Focus on technique and speed',
      ],
      notes: [
        'Maintains neural adaptations',
        'Reduces mechanical stress',
        'Quick recovery',
        'Easy to implement',
      ],
      whenToUse: 'Every 4-6 weeks, or when feeling run down',
    },
    intensity: {
      name: 'Intensity Deload',
      icon: 'barbell-outline',
      color: 'primary',
      method: 'Reduce intensity by 20-30%',
      description: 'Lighter weights, same volume',
      example: {
        normal: 'Bench: 4x5 @ 85% 1RM (100kg)',
        deload: 'Bench: 4x5 @ 60% 1RM (70kg)',
      },
      duration: '1 week',
      bestFor: 'Joint issues, CNS fatigue',
      implementation: [
        'Drop weight to 60-70% 1RM',
        'Keep same sets and reps',
        'Same exercises',
        'Maintain frequency',
        'Control tempo, perfect form',
      ],
      notes: [
        'Reduces joint stress',
        'Maintains movement patterns',
        'Good for CNS recovery',
        'Can feel "too easy"',
      ],
      whenToUse: 'Joint pain, nervous system fatigue, competition prep',
    },
    mixed: {
      name: 'Mixed Deload',
      icon: 'options',
      color: 'purple',
      method: 'Reduce both volume and intensity',
      description: 'Lighter weights AND fewer sets',
      example: {
        normal: 'Deadlift: 5x3 @ 90% 1RM',
        deload: 'Deadlift: 2x3 @ 70% 1RM',
      },
      duration: '1 week',
      bestFor: 'Severe fatigue, coming back from injury',
      implementation: [
        'Cut sets by 50%',
        'Drop weight to 60-70% 1RM',
        'Keep reps the same',
        'Same frequency',
        'Focus on recovery',
      ],
      notes: [
        'Maximum recovery',
        'Lowest stress',
        'Maintains patterns',
        'Risk of detraining if too long',
      ],
      whenToUse: 'Accumulated fatigue, injury recovery, high life stress',
    },
    active: {
      name: 'Active Recovery',
      icon: 'walk',
      color: 'amber',
      method: 'Switch to light activities',
      description: 'No heavy lifting, movement only',
      example: {
        normal: 'Full powerlifting session',
        deload: 'Mobility, stretching, light cardio',
      },
      duration: '3-7 days',
      bestFor: 'Injury prevention, mental break',
      implementation: [
        'No barbell work this week',
        'Light bodyweight exercises',
        'Mobility and stretching',
        'Low-intensity cardio',
        'Focus on weak points',
      ],
      notes: [
        'Complete neural recovery',
        'Addresses mobility',
        'Mental break',
        'Can lose some strength',
      ],
      whenToUse: 'Mental burnout, injury risk, every 12-16 weeks',
    },
  };

  const currentProtocol = protocols[selectedProtocol as keyof typeof protocols];

  const getColorClasses = (color: string) => {
    const colors: { [key: string]: { bg: string; border: string; text: string } } = {
      blue: { bg: 'bg-primary', border: 'border-primary', text: 'text-primary/80' },
      primary: { bg: 'bg-primary', border: 'border-primary', text: 'text-primary' },
      purple: { bg: 'bg-purple-500', border: 'border-purple-400', text: 'text-purple-400' },
      amber: { bg: 'bg-amber-500', border: 'border-amber-400', text: 'text-amber-400' },
    };
    return colors[color];
  };

  const fatigueIndicators = [
    { indicator: 'Chronic soreness', severity: 'High', action: 'Deload immediately' },
    { indicator: 'Decreased performance', severity: 'High', action: 'Mixed deload' },
    { indicator: 'Poor sleep', severity: 'Medium', action: 'Volume deload' },
    { indicator: 'Loss of motivation', severity: 'Medium', action: 'Active recovery' },
    { indicator: 'Joint aches', severity: 'High', action: 'Intensity deload' },
    { indicator: 'Elevated resting HR', severity: 'High', action: 'Mixed deload' },
    { indicator: 'Irritability', severity: 'Medium', action: 'Active recovery' },
    { indicator: 'Missing reps', severity: 'High', action: 'Deload immediately' },
  ];

  const deloadSchedule = [
    {
      program: 'Beginner (Linear)',
      frequency: 'Every 6-8 weeks',
      type: 'Volume deload',
      note: 'Beginners recover faster',
    },
    {
      program: 'Intermediate',
      frequency: 'Every 4-6 weeks',
      type: 'Volume or mixed',
      note: 'Standard frequency',
    },
    {
      program: 'Advanced',
      frequency: 'Every 3-4 weeks',
      type: 'Mixed deload',
      note: 'More fatigue accumulation',
    },
    {
      program: 'High volume (DUP)',
      frequency: 'Every 4 weeks',
      type: 'Volume deload',
      note: 'Frequent stimulus = frequent deload',
    },
  ];

  return (
    <View className="flex-1 bg-zinc-950">
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1 ml-3">
            Deload Protocols
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          <View className="bg-gradient-to-r from-primary to-[#7D0EBE] rounded-xl p-6 mb-6">
            <Text className="text-white text-2xl font-bold mb-2">Strategic Recovery</Text>
            <Text className="text-white opacity-90">
              Planned deloads for long-term gains
            </Text>
          </View>

          <View className="bg-amber-500/10 rounded-xl p-4 border border-amber-500/30 mb-6">
            <Text className="text-amber-400 font-bold mb-2">Why Deload?</Text>
            <Text className="text-amber-300 text-sm mb-2">
              � Training creates fatigue faster than you recover
            </Text>
            <Text className="text-amber-300 text-sm mb-2">
              � Accumulated fatigue masks strength gains
            </Text>
            <Text className="text-amber-300 text-sm mb-2">
              � Deloads allow supercompensation (rebound)
            </Text>
            <Text className="text-amber-300 text-sm">
              � You don't lose gains in one week
            </Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6">
            <View className="flex-row gap-3 px-1">
              {Object.entries(protocols).map(([key, protocol]) => (
                <TouchableOpacity
                  key={key}
                  onPress={() => setSelectedProtocol(key)}
                  className={`${
                    selectedProtocol === key 
                      ? getColorClasses(protocol.color).bg
                      : 'bg-zinc-900'
                  } rounded-xl p-4 border ${
                    selectedProtocol === key 
                      ? getColorClasses(protocol.color).border
                      : 'border-zinc-800'
                  } min-w-[180px]`}
                >
                  <Ionicons 
                    name={protocol.icon as any} 
                    size={32} 
                    color={selectedProtocol === key ? 'white' : '#a1a1aa'} 
                  />
                  <Text className={`${selectedProtocol === key ? 'text-white' : 'text-zinc-400'} font-bold mt-2`}>
                    {protocol.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
            <View className="flex-row items-center mb-4">
              <Ionicons name={currentProtocol.icon as any} size={32} color={getColorClasses(currentProtocol.color).text.replace('text-', '')} />
              <View className="ml-3 flex-1">
                <Text className="text-white text-xl font-bold">{currentProtocol.name}</Text>
                <Text className="text-zinc-400 text-sm">{currentProtocol.method}</Text>
              </View>
            </View>

            <View className={`${getColorClasses(currentProtocol.color).bg}/10 rounded-xl p-4 border ${getColorClasses(currentProtocol.color).border}/30 mb-4`}>
              <Text className="text-white font-bold mb-2">{currentProtocol.description}</Text>
              <View className="mt-3">
                <Text className="text-zinc-400 text-sm mb-1">Duration: <Text className="text-white font-bold">{currentProtocol.duration}</Text></Text>
                <Text className="text-zinc-400 text-sm">Best for: <Text className="text-primary font-bold">{currentProtocol.bestFor}</Text></Text>
              </View>
            </View>

            <View className="bg-zinc-800 rounded-xl p-4 mb-4">
              <Text className="text-white font-bold mb-3">Example</Text>
              <View className="mb-3">
                <Text className="text-zinc-400 text-sm mb-1">Normal Week:</Text>
                <Text className="text-white font-bold">{currentProtocol.example.normal}</Text>
              </View>
              <View className="border-t border-zinc-700 pt-3">
                <Text className="text-zinc-400 text-sm mb-1">Deload Week:</Text>
                <Text className={`${getColorClasses(currentProtocol.color).text} font-bold`}>{currentProtocol.example.deload}</Text>
              </View>
            </View>

            <Text className="text-white font-bold mb-3">Implementation</Text>
            {currentProtocol.implementation.map((step, idx) => (
              <View key={idx} className="bg-zinc-800 rounded-xl p-3 mb-2 last:mb-4">
                <Text className="text-white">
                  <Text className={`${getColorClasses(currentProtocol.color).text} font-bold`}>{idx + 1}.</Text> {step}
                </Text>
              </View>
            ))}

            <Text className="text-white font-bold mb-3">Key Points</Text>
            {currentProtocol.notes.map((note, idx) => (
              <Text key={idx} className="text-zinc-300 text-sm mb-2 last:mb-4">
                � {note}
              </Text>
            ))}

            <View className={`${getColorClasses(currentProtocol.color).bg}/10 rounded-xl p-3 border ${getColorClasses(currentProtocol.color).border}/30`}>
              <Text className={`${getColorClasses(currentProtocol.color).text} font-bold text-sm mb-1`}>When to Use</Text>
              <Text className="text-white text-sm">{currentProtocol.whenToUse}</Text>
            </View>
          </View>

          <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
            <Text className="text-white font-bold text-lg mb-4">Fatigue Indicators</Text>
            <Text className="text-zinc-400 text-sm mb-4">Signs you need to deload</Text>
            {fatigueIndicators.map((item, idx) => (
              <View key={idx} className="bg-zinc-800 rounded-xl p-3 mb-2 last:mb-0">
                <View className="flex-row justify-between items-center mb-1">
                  <Text className="text-white font-bold">{item.indicator}</Text>
                  <View className={`${
                    item.severity === 'High' ? 'bg-red-500' : 'bg-amber-500'
                  } rounded-full px-3 py-1`}>
                    <Text className="text-white text-xs font-bold">{item.severity}</Text>
                  </View>
                </View>
                <Text className="text-primary text-sm">→ {item.action}</Text>
              </View>
            ))}
          </View>

          <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
            <Text className="text-white font-bold text-lg mb-4">Deload Schedule</Text>
            {deloadSchedule.map((schedule, idx) => (
              <View key={idx} className="bg-zinc-800 rounded-xl p-4 mb-2 last:mb-0">
                <Text className="text-white font-bold mb-2">{schedule.program}</Text>
                <View className="flex-row justify-between mb-1">
                  <Text className="text-zinc-400 text-sm">Frequency:</Text>
                  <Text className="text-primary/80 font-bold">{schedule.frequency}</Text>
                </View>
                <View className="flex-row justify-between mb-2">
                  <Text className="text-zinc-400 text-sm">Type:</Text>
                  <Text className="text-purple-400 font-bold">{schedule.type}</Text>
                </View>
                <Text className="text-zinc-400 text-xs italic">{schedule.note}</Text>
              </View>
            ))}
          </View>

          <View className="bg-red-500/10 rounded-xl p-4 border border-red-500/30 mb-6">
            <Text className="text-red-400 font-bold mb-2">Common Mistakes</Text>
            <Text className="text-red-300 text-sm mb-2">
              ? Training hard during deload ("don't want to lose gains")
            </Text>
            <Text className="text-red-300 text-sm mb-2">
              ? Deloading for 2+ weeks (too long)
            </Text>
            <Text className="text-red-300 text-sm mb-2">
              ? Skipping deloads entirely (accumulated fatigue)
            </Text>
            <Text className="text-red-300 text-sm">
              ? Deloading too frequently (undermines progress)
            </Text>
          </View>

          <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-6">
            <Text className="text-primary font-bold mb-2">Pro Tips</Text>
            <Text className="text-primary/80 text-sm mb-2">
              ? Plan deloads in advance (every 4-6 weeks)
            </Text>
            <Text className="text-primary/80 text-sm mb-2">
              ? Use deload week to work on technique
            </Text>
            <Text className="text-primary/80 text-sm mb-2">
              ? Expect to feel stronger after deload
            </Text>
            <Text className="text-primary/80 text-sm">
              ? Deload is not rest - you still train
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}


