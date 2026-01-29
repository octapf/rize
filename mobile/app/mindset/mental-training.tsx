import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function MentalTraining() {
  const [selectedTechnique, setSelectedTechnique] = useState('visualization');

  const techniques = [
    {
      id: 'visualization',
      name: 'Visualization',
      icon: 'eye' as const,
      color: 'blue',
      description: 'Mental rehearsal of perfect performance',
      benefits: [
        'Activates same neural pathways as physical practice',
        'Improves technique and confidence',
        'Prepares mind for heavy attempts',
        'Reduces performance anxiety',
      ],
      protocol: {
        when: 'Before training or heavy lifts',
        duration: '5-10 minutes',
        frequency: 'Daily or pre-session',
        steps: [
          'Find quiet space, close eyes',
          'Deep breathing to relax (5 breaths)',
          'Visualize yourself approaching the bar/weight',
          'See perfect setup in vivid detail',
          'Feel the weight, tension in muscles',
          'Execute lift perfectly in your mind',
          'See and feel successful completion',
          'Repeat 3-5 times per lift',
        ],
      },
      tips: [
        'Use all senses (sight, sound, feel)',
        'See from first-person view',
        'Practice successful attempts only',
        'Make it as real as possible',
      ],
    },
    {
      id: 'selftalk',
      name: 'Positive Self-Talk',
      icon: 'chatbubble' as const,
      color: 'emerald',
      description: 'Internal dialogue management',
      benefits: [
        'Boosts confidence immediately',
        'Overrides negative thoughts',
        'Maintains focus under pressure',
        'Creates positive associations',
      ],
      protocol: {
        when: 'Throughout training and daily life',
        duration: 'Ongoing practice',
        frequency: 'Constant awareness',
        steps: [
          'Identify negative thoughts ("I can\'t", "too heavy")',
          'Interrupt pattern immediately',
          'Replace with empowering phrase',
          'Repeat affirmation confidently',
          'Attach to physical cue (deep breath, clap)',
          'Practice in low-stress situations first',
          'Apply during actual training',
        ],
      },
      tips: [
        'Use present tense ("I am strong")',
        'Make it believable, not fantasy',
        'Short, powerful phrases',
        'Say it out loud when possible',
      ],
      examples: [
        { negative: '"This is too heavy"', positive: '"I\'ve prepared for this"' },
        { negative: '"I might fail"', positive: '"I trust my strength"' },
        { negative: '"I\'m too tired"', positive: '"I have one more rep in me"' },
        { negative: '"Everyone\'s watching"', positive: '"I\'ve done this before"' },
      ],
    },
    {
      id: 'breathing',
      name: 'Breathing Techniques',
      icon: 'fitness' as const,
      color: 'purple',
      description: 'Control stress and arousal levels',
      benefits: [
        'Calms nerves before heavy lifts',
        'Activates parasympathetic system',
        'Improves focus and clarity',
        'Regulates heart rate',
      ],
      protocol: {
        when: 'Pre-lift, between sets, or when anxious',
        duration: '1-5 minutes',
        frequency: 'As needed',
        steps: [
          'Box Breathing: 4s in, 4s hold, 4s out, 4s hold',
          'Repeat 4-5 cycles',
          'Or: 4-7-8 breathing (in 4s, hold 7s, out 8s)',
          'Focus only on breath',
          'Feel tension release on exhale',
        ],
      },
      tips: [
        'Breathe through nose when possible',
        'Make exhale longer than inhale to relax',
        'Practice daily to master',
        'Use before anxious situations',
      ],
    },
    {
      id: 'routines',
      name: 'Pre-Performance Routines',
      icon: 'repeat' as const,
      color: 'amber',
      description: 'Consistent rituals before lifts',
      benefits: [
        'Creates mental trigger for focus',
        'Reduces decision fatigue',
        'Builds confidence through familiarity',
        'Anchors optimal state',
      ],
      protocol: {
        when: 'Before every heavy set',
        duration: '30-60 seconds',
        frequency: 'Every working set',
        steps: [
          'Approach bar the same way every time',
          'Chalk hands with specific pattern',
          'Take 2-3 deep breaths',
          'Visualize successful lift (3 seconds)',
          'Grip bar in exact same spots',
          'Set feet precisely',
          'One final breath and brace',
          'Initiate lift',
        ],
      },
      tips: [
        'Keep routine under 60 seconds',
        'Practice it every single rep',
        'Don\'t vary based on weight',
        'Make it personal and meaningful',
      ],
    },
    {
      id: 'arousal',
      name: 'Arousal Control',
      icon: 'pulse' as const,
      color: 'red',
      description: 'Optimize activation level',
      benefits: [
        'Prevent over/under arousal',
        'Match energy to task demands',
        'Sustain performance through session',
        'Avoid burnout or under-performance',
      ],
      protocol: {
        when: 'Throughout training session',
        duration: 'Ongoing adjustment',
        frequency: 'As needed per set',
        steps: [
          'Assess current state (1-10 scale)',
          'Identify optimal zone (usually 7-8 for heavy lifts)',
          'Too low? Use music, movement, self-talk',
          'Too high? Deep breathing, walk, calm music',
          'Re-assess after intervention',
          'Fine-tune continuously',
        ],
      },
      tips: [
        'Heavy compounds need higher arousal',
        'Isolation work needs lower arousal',
        'Know YOUR optimal zone',
        'Avoid staying at 10/10 entire workout',
      ],
    },
  ];

  const currentTechnique = techniques.find((t) => t.id === selectedTechnique)!;

  return (
    <View className="flex-1 bg-zinc-950">
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1 ml-3">
            Mental Training
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          <View className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl p-6 mb-6">
            <Text className="text-white text-2xl font-bold mb-2">Train Your Mind</Text>
            <Text className="text-white opacity-90">
              Mental skills for peak performance
            </Text>
          </View>

          <View className="mb-6">
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View className="flex-row gap-3">
                {techniques.map((tech) => (
                  <TouchableOpacity
                    key={tech.id}
                    onPress={() => setSelectedTechnique(tech.id)}
                    className={`${
                      selectedTechnique === tech.id
                        ? `bg-${tech.color}-500`
                        : 'bg-zinc-800'
                    } rounded-xl px-4 py-3 border ${
                      selectedTechnique === tech.id
                        ? `border-${tech.color}-400`
                        : 'border-zinc-700'
                    }`}
                  >
                    <View className="flex-row items-center">
                      <Ionicons name={tech.icon} size={20} color="white" />
                      <Text className="text-white font-bold ml-2">{tech.name}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>

          <View className={`bg-${currentTechnique.color}-500/10 rounded-xl p-5 mb-6 border border-${currentTechnique.color}-500/30`}>
            <View className="flex-row items-center mb-3">
              <Ionicons name={currentTechnique.icon} size={28} color={`#${currentTechnique.color === 'blue' ? '3b82f6' : currentTechnique.color === 'emerald' ? '10b981' : currentTechnique.color === 'purple' ? 'a855f7' : currentTechnique.color === 'amber' ? 'f59e0b' : 'ef4444'}`} />
              <Text className={`text-${currentTechnique.color}-400 font-bold text-2xl ml-3`}>
                {currentTechnique.name}
              </Text>
            </View>
            <Text className="text-zinc-300 text-lg">{currentTechnique.description}</Text>
          </View>

          <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
            <Text className="text-white font-bold text-lg mb-3">Benefits</Text>
            {currentTechnique.benefits.map((benefit, idx) => (
              <View key={idx} className="flex-row items-start mb-2 last:mb-0">
                <Ionicons name="checkmark-circle" size={18} color="#10b981" />
                <Text className="text-zinc-300 ml-2 flex-1">{benefit}</Text>
              </View>
            ))}
          </View>

          <View className={`bg-${currentTechnique.color}-500/10 rounded-xl p-5 mb-6 border border-${currentTechnique.color}-500/30`}>
            <Text className={`text-${currentTechnique.color}-400 font-bold text-lg mb-4`}>
              Protocol
            </Text>

            <View className="bg-zinc-900 rounded-xl p-4 mb-4">
              <View className="flex-row justify-between mb-2">
                <Text className="text-zinc-400">When:</Text>
                <Text className="text-white font-bold">{currentTechnique.protocol.when}</Text>
              </View>
              <View className="flex-row justify-between mb-2">
                <Text className="text-zinc-400">Duration:</Text>
                <Text className="text-white font-bold">{currentTechnique.protocol.duration}</Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-zinc-400">Frequency:</Text>
                <Text className="text-white font-bold">{currentTechnique.protocol.frequency}</Text>
              </View>
            </View>

            <Text className="text-white font-bold mb-3">Steps:</Text>
            {currentTechnique.protocol.steps.map((step, idx) => (
              <View key={idx} className="flex-row items-start mb-2">
                <View className={`w-6 h-6 rounded-full bg-${currentTechnique.color}-500/20 items-center justify-center mt-0.5 border border-${currentTechnique.color}-500/40`}>
                  <Text className={`text-${currentTechnique.color}-400 font-bold text-xs`}>
                    {idx + 1}
                  </Text>
                </View>
                <Text className="text-zinc-300 ml-2 flex-1">{step}</Text>
              </View>
            ))}
          </View>

          <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
            <Text className="text-white font-bold text-lg mb-3">Pro Tips</Text>
            {currentTechnique.tips.map((tip, idx) => (
              <View key={idx} className="flex-row items-start mb-2 last:mb-0">
                <Ionicons name="bulb" size={16} color="#f59e0b" />
                <Text className="text-zinc-300 ml-2 flex-1">{tip}</Text>
              </View>
            ))}
          </View>

          {'examples' in currentTechnique && (
            <View className="bg-emerald-500/10 rounded-xl p-5 mb-6 border border-emerald-500/30">
              <Text className="text-emerald-400 font-bold text-lg mb-3">Examples</Text>
              {currentTechnique.examples.map((ex, idx) => (
                <View key={idx} className="bg-zinc-900 rounded-xl p-3 mb-3 last:mb-0">
                  <View className="flex-row items-start mb-2">
                    <Ionicons name="close-circle" size={16} color="#ef4444" />
                    <Text className="text-red-400 ml-2 flex-1 line-through">{ex.negative}</Text>
                  </View>
                  <View className="flex-row items-start">
                    <Ionicons name="checkmark-circle" size={16} color="#10b981" />
                    <Text className="text-emerald-400 ml-2 flex-1 font-bold">{ex.positive}</Text>
                  </View>
                </View>
              ))}
            </View>
          )}

          <View className="bg-blue-500/10 rounded-xl p-4 border border-blue-500/30 mb-6">
            <Text className="text-blue-400 font-bold mb-2">The Mental Game</Text>
            <Text className="text-blue-300 text-sm">
              Elite lifters train their mind as hard as their body. Mental skills are SKILLS - they require practice, not just knowledge. Start with one technique and master it.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
