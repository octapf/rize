import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

type CardioType = 'running' | 'cycling' | 'swimming' | 'rowing';

export default function CardioProtocols() {
  const [selectedType, setSelectedType] = useState<CardioType>('running');

  const cardioTypes = [
    { id: 'running' as CardioType, name: 'Running', icon: 'walk' as const, color: 'blue' },
    { id: 'cycling' as CardioType, name: 'Cycling', icon: 'bicycle' as const, color: 'primary' },
    { id: 'swimming' as CardioType, name: 'Swimming', icon: 'water' as const, color: 'purple' },
    { id: 'rowing' as CardioType, name: 'Rowing', icon: 'boat' as const, color: 'amber' },
  ];

  const protocols = {
    running: [
      {
        name: 'Long Slow Distance (LSD)',
        goal: 'Build aerobic base',
        duration: '45-90 min',
        intensity: '60-70% max HR',
        frequency: '1-2x per week',
        notes: 'Conversational pace, zone 2',
        color: 'blue',
      },
      {
        name: 'Tempo Run',
        goal: 'Lactate threshold',
        duration: '20-40 min',
        intensity: '80-85% max HR',
        frequency: '1x per week',
        notes: 'Comfortably hard, zone 3-4',
        color: 'primary',
      },
      {
        name: 'Interval Training',
        goal: 'VO2 max improvement',
        duration: '4-8x 400-800m',
        intensity: '90-95% max HR',
        frequency: '1x per week',
        notes: 'Hard efforts, equal rest',
        color: 'red',
      },
      {
        name: 'Fartlek',
        goal: 'Speed endurance',
        duration: '30-45 min',
        intensity: 'Variable',
        frequency: '1x per week',
        notes: 'Play with pace changes',
        color: 'purple',
      },
    ],
    cycling: [
      {
        name: 'Endurance Ride',
        goal: 'Aerobic fitness',
        duration: '60-120 min',
        intensity: '65-75% FTP',
        frequency: '2-3x per week',
        notes: 'Steady pace, low gears',
        color: 'blue',
      },
      {
        name: 'Sweet Spot',
        goal: 'Power at threshold',
        duration: '2-3x 10-20 min',
        intensity: '88-94% FTP',
        frequency: '1-2x per week',
        notes: 'Productive discomfort',
        color: 'primary',
      },
      {
        name: 'VO2 Max Intervals',
        goal: 'Max aerobic power',
        duration: '5-8x 3-5 min',
        intensity: '106-120% FTP',
        frequency: '1x per week',
        notes: 'Very hard, equal rest',
        color: 'red',
      },
      {
        name: 'Recovery Spin',
        goal: 'Active recovery',
        duration: '30-60 min',
        intensity: '50-60% FTP',
        frequency: '1-2x per week',
        notes: 'Easy spin, flush legs',
        color: 'zinc',
      },
    ],
    swimming: [
      {
        name: 'Continuous Swim',
        goal: 'Endurance building',
        duration: '30-60 min',
        intensity: '70-80% effort',
        frequency: '2-3x per week',
        notes: 'Focus on technique',
        color: 'blue',
      },
      {
        name: 'Threshold Sets',
        goal: 'Lactate threshold',
        duration: '4-6x 200m',
        intensity: '85-90% effort',
        frequency: '1x per week',
        notes: '30-45s rest between',
        color: 'primary',
      },
      {
        name: 'Sprint Sets',
        goal: 'Speed development',
        duration: '8-12x 50m',
        intensity: '95-100% effort',
        frequency: '1x per week',
        notes: 'Full recovery between',
        color: 'red',
      },
      {
        name: 'Technique Drills',
        goal: 'Skill improvement',
        duration: '30-45 min',
        intensity: '60-70% effort',
        frequency: '1-2x per week',
        notes: 'Kick, pull, drills',
        color: 'purple',
      },
    ],
    rowing: [
      {
        name: 'Steady State',
        goal: 'Aerobic capacity',
        duration: '30-60 min',
        intensity: '60-70% max HR',
        frequency: '2-3x per week',
        notes: 'Rate 18-22 spm',
        color: 'blue',
      },
      {
        name: 'Threshold Pieces',
        goal: 'Lactate threshold',
        duration: '3-4x 2000m',
        intensity: '80-85% max HR',
        frequency: '1x per week',
        notes: 'Rate 24-28 spm',
        color: 'primary',
      },
      {
        name: 'Interval Training',
        goal: 'VO2 max',
        duration: '6-8x 500m',
        intensity: '90-95% max HR',
        frequency: '1x per week',
        notes: 'Rate 28-32 spm, 2min rest',
        color: 'red',
      },
      {
        name: 'Power Strokes',
        goal: 'Strength endurance',
        duration: '10-20x 10 strokes',
        intensity: 'Max effort',
        frequency: '1x per week',
        notes: 'Focus on power application',
        color: 'amber',
      },
    ],
  };

  const currentProtocols = protocols[selectedType];

  return (
    <View className="flex-1 bg-zinc-950">
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1 ml-3">
            Cardio Protocols
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          <View className="bg-gradient-to-r from-red-500 to-orange-500 rounded-xl p-6 mb-6">
            <Text className="text-white text-2xl font-bold mb-2">Cardio Training</Text>
            <Text className="text-white opacity-90">
              Structured conditioning protocols
            </Text>
          </View>

          <View className="mb-6">
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View className="flex-row gap-3">
                {cardioTypes.map((type) => (
                  <TouchableOpacity
                    key={type.id}
                    onPress={() => setSelectedType(type.id)}
                    className={`${
                      selectedType === type.id
                        ? `bg-${type.color}-500`
                        : 'bg-zinc-800'
                    } rounded-xl px-4 py-3 border ${
                      selectedType === type.id
                        ? `border-${type.color}-400`
                        : 'border-zinc-700'
                    }`}
                  >
                    <View className="flex-row items-center">
                      <Ionicons name={type.icon} size={20} color="white" />
                      <Text className="text-white font-bold ml-2">{type.name}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>

          {currentProtocols.map((protocol, idx) => (
            <View
              key={idx}
              className={`bg-${protocol.color}-500/10 rounded-xl p-5 mb-6 border border-${protocol.color}-500/30`}
            >
              <View className="flex-row items-center mb-3">
                <Ionicons name="fitness" size={24} color={`#${protocol.color === 'zinc' ? '71717a' : protocol.color === 'blue' ? '3b82f6' : protocol.color === 'primary' ? '9D12DE' : protocol.color === 'red' ? 'ef4444' : protocol.color === 'purple' ? 'a855f7' : 'f59e0b'}`} />
                <Text className={`text-${protocol.color}-400 font-bold text-xl ml-2`}>
                  {protocol.name}
                </Text>
              </View>

              <View className="space-y-3">
                <View className="flex-row justify-between">
                  <Text className="text-zinc-400">Goal:</Text>
                  <Text className="text-white font-bold">{protocol.goal}</Text>
                </View>
                <View className="flex-row justify-between">
                  <Text className="text-zinc-400">Duration:</Text>
                  <Text className="text-white font-bold">{protocol.duration}</Text>
                </View>
                <View className="flex-row justify-between">
                  <Text className="text-zinc-400">Intensity:</Text>
                  <Text className={`text-${protocol.color}-400 font-bold`}>{protocol.intensity}</Text>
                </View>
                <View className="flex-row justify-between">
                  <Text className="text-zinc-400">Frequency:</Text>
                  <Text className="text-white font-bold">{protocol.frequency}</Text>
                </View>
                <View className="pt-2 border-t border-zinc-700">
                  <Text className="text-zinc-300 text-sm italic">{protocol.notes}</Text>
                </View>
              </View>
            </View>
          ))}

          <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-6">
            <Text className="text-primary/80 font-bold mb-2">Weekly Structure</Text>
            <Text className="text-primary/60 text-sm">
              • Mix different intensities{'\n'}
              • 80/20 rule: 80% easy, 20% hard{'\n'}
              • Don't go hard every day{'\n'}
              • Recovery is essential{'\n'}
              • Progress gradually
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

