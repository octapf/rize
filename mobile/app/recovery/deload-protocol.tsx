import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

type DeloadType = 'active' | 'passive' | 'strategic';

export default function DeloadProtocol() {
  const [selectedType, setSelectedType] = useState<DeloadType>('active');

  const deloadTypes = [
    {
      id: 'active' as DeloadType,
      name: 'Active Deload',
      description: 'Reduce volume and intensity',
      duration: '1 week',
      frequency: 'Every 4-6 weeks',
      color: 'blue',
      icon: 'fitness' as const,
      protocols: [
        { metric: 'Volume', reduction: '40-50%', example: '3 sets â†’ 2 sets' },
        { metric: 'Intensity', reduction: '30-40%', example: '100kg â†’ 60-70kg' },
        { metric: 'Frequency', reduction: '0%', example: 'Keep same days' },
        { metric: 'Exercises', reduction: '0%', example: 'Same movements' },
      ],
      benefits: [
        'Maintains movement patterns',
        'Active recovery',
        'Minimal detraining',
        'Psychological break',
        'Prepares for next block',
      ],
    },
    {
      id: 'passive' as DeloadType,
      name: 'Passive Deload',
      description: 'Complete rest from training',
      duration: '3-5 days',
      frequency: 'When extremely fatigued',
      color: 'purple',
      icon: 'bed' as const,
      protocols: [
        { metric: 'Volume', reduction: '100%', example: 'No training' },
        { metric: 'Intensity', reduction: '100%', example: 'Complete rest' },
        { metric: 'Activity', reduction: '80%+', example: 'Only walking' },
        { metric: 'Sleep', reduction: '-20%', example: 'Sleep more' },
      ],
      benefits: [
        'Full nervous system recovery',
        'Injury healing',
        'Mental reset',
        'Hormonal balance',
        'Energy restoration',
      ],
    },
    {
      id: 'strategic' as DeloadType,
      name: 'Strategic Deload',
      description: 'Targeted recovery areas',
      duration: '1 week',
      frequency: 'Every 3-4 weeks',
      color: 'emerald',
      icon: 'analytics' as const,
      protocols: [
        { metric: 'Heavy Compounds', reduction: '60%', example: 'Reduce squat/dead/bench' },
        { metric: 'Isolation Work', reduction: '20%', example: 'Maintain accessories' },
        { metric: 'Cardio', reduction: '0%', example: 'Keep conditioning' },
        { metric: 'Mobility', reduction: '-50%', example: 'Increase flexibility work' },
      ],
      benefits: [
        'Joint recovery',
        'CNS restoration',
        'Address weak points',
        'Technique refinement',
        'Balanced approach',
      ],
    },
  ];

  const currentType = deloadTypes.find((t) => t.id === selectedType)!;

  const signsNeedDeload = [
    { sign: 'Persistent fatigue', severity: 'high', icon: 'battery-dead' as const },
    { sign: 'Strength plateau/decline', severity: 'high', icon: 'trending-down' as const },
    { sign: 'Poor sleep quality', severity: 'medium', icon: 'moon' as const },
    { sign: 'Elevated resting HR', severity: 'medium', icon: 'heart' as const },
    { sign: 'Joint pain/aches', severity: 'high', icon: 'warning' as const },
    { sign: 'Mood changes/irritability', severity: 'medium', icon: 'sad' as const },
    { sign: 'Loss of motivation', severity: 'medium', icon: 'close-circle' as const },
    { sign: 'Technique breakdown', severity: 'high', icon: 'alert' as const },
  ];

  return (
    <View className="flex-1 bg-zinc-950">
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1 ml-3">
            Deload Protocol
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          <View className="bg-gradient-to-r from-primary to-[#7D0EBE] rounded-xl p-6 mb-6">
            <Text className="text-white text-2xl font-bold mb-2">Strategic Recovery</Text>
            <Text className="text-white opacity-90">
              Prevent overtraining, maximize gains
            </Text>
          </View>

          <View className="mb-6">
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View className="flex-row gap-3">
                {deloadTypes.map((type) => (
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

          <View className={`bg-${currentType.color}-500/10 rounded-xl p-5 mb-6 border border-${currentType.color}-500/30`}>
            <View className="flex-row items-center mb-3">
              <Ionicons name={currentType.icon} size={28} color={`#${currentType.color === 'blue' ? '3b82f6' : currentType.color === 'purple' ? 'a855f7' : '10b981'}`} />
              <Text className={`text-${currentType.color}-400 font-bold text-2xl ml-3`}>
                {currentType.name}
              </Text>
            </View>
            <Text className="text-zinc-300 text-lg mb-4">{currentType.description}</Text>

            <View className="flex-row gap-3 mb-4">
              <View className="flex-1 bg-zinc-900 rounded-xl p-3">
                <Text className="text-zinc-400 text-sm mb-1">Duration</Text>
                <Text className="text-white font-bold">{currentType.duration}</Text>
              </View>
              <View className="flex-1 bg-zinc-900 rounded-xl p-3">
                <Text className="text-zinc-400 text-sm mb-1">Frequency</Text>
                <Text className="text-white font-bold text-sm">{currentType.frequency}</Text>
              </View>
            </View>
          </View>

          <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
            <Text className="text-white font-bold text-lg mb-4">Protocol Details</Text>
            {currentType.protocols.map((protocol, idx) => (
              <View
                key={idx}
                className="bg-zinc-800 rounded-xl p-4 mb-3 last:mb-0 border border-zinc-700"
              >
                <View className="flex-row justify-between items-center mb-2">
                  <Text className="text-white font-bold">{protocol.metric}</Text>
                  <View className={`bg-${currentType.color}-500/20 rounded-full px-3 py-1 border border-${currentType.color}-500/40`}>
                    <Text className={`text-${currentType.color}-400 font-bold text-sm`}>
                      {protocol.reduction}
                    </Text>
                  </View>
                </View>
                <Text className="text-zinc-400 text-sm">{protocol.example}</Text>
              </View>
            ))}
          </View>

          <View className={`bg-${currentType.color}-500/10 rounded-xl p-4 mb-6 border border-${currentType.color}-500/30`}>
            <Text className={`text-${currentType.color}-400 font-bold mb-3`}>Key Benefits</Text>
            {currentType.benefits.map((benefit, idx) => (
              <View key={idx} className="flex-row items-center mb-2 last:mb-0">
                <Ionicons name="checkmark-circle" size={18} color={`#${currentType.color === 'blue' ? '3b82f6' : currentType.color === 'purple' ? 'a855f7' : '10b981'}`} />
                <Text className={`text-${currentType.color}-300 ml-2`}>{benefit}</Text>
              </View>
            ))}
          </View>

          <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
            <Text className="text-white font-bold text-lg mb-4">Signs You Need a Deload</Text>
            {signsNeedDeload.map((item, idx) => {
              const severityColor = item.severity === 'high' ? 'red' : 'amber';
              return (
                <View
                  key={idx}
                  className="flex-row items-center justify-between py-3 border-b border-zinc-800 last:border-0"
                >
                  <View className="flex-row items-center flex-1">
                    <Ionicons name={item.icon} size={20} color={`#${severityColor === 'red' ? 'ef4444' : 'f59e0b'}`} />
                    <Text className="text-white ml-3">{item.sign}</Text>
                  </View>
                  <View className={`bg-${severityColor}-500/20 rounded-full px-2 py-1 border border-${severityColor}-500/40`}>
                    <Text className={`text-${severityColor}-400 text-xs font-bold capitalize`}>
                      {item.severity}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>

          <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-6">
            <Text className="text-primary font-bold mb-2">Deload Tips</Text>
            <Text className="text-primary/80 text-sm">
              • Plan deloads proactively{'\n'}
              • Don't skip them{'\n'}
              • Use time for mobility{'\n'}
              • Focus on technique{'\n'}
              • Trust the process
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}


