import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function PostCompRecovery() {
  const [daysPost, setDaysPost] = useState('1');

  const recoveryProtocol = {
    immediate: {
      title: 'Immediately After (Same Day)',
      icon: 'time' as const,
      color: 'red',
      steps: [
        {
          category: 'Celebrate',
          actions: ['Enjoy the moment', 'Photos with team/friends', 'Process the experience', 'Be proud regardless of outcome'],
          icon: 'trophy' as const,
        },
        {
          category: 'Refuel',
          actions: ['Full meal within 1-2h', 'Protein + carbs + fats', 'Continue hydrating', 'Don\'t restrict - you earned it'],
          icon: 'restaurant' as const,
        },
        {
          category: 'Active Recovery',
          actions: ['Light walking', 'Gentle stretching', 'Foam rolling if not too sore', 'Hot bath/shower'],
          icon: 'walk' as const,
        },
      ],
    },
    days_1_3: {
      title: 'Days 1-3 Post-Meet',
      icon: 'calendar' as const,
      color: 'orange',
      training: 'Complete rest or very light movement only',
      steps: [
        {
          category: 'Rest & Recovery',
          actions: ['Sleep 8-10 hours', 'Nap if tired', 'Passive recovery', 'Let soreness settle'],
          icon: 'bed' as const,
        },
        {
          category: 'Nutrition',
          actions: ['Return to normal calories', 'Focus on whole foods', 'High protein for recovery', 'Stay hydrated'],
          icon: 'nutrition' as const,
        },
        {
          category: 'Mental Debrief',
          actions: ['Review meet videos', 'Note what went well', 'Note improvements needed', 'Avoid dwelling on mistakes'],
          icon: 'analytics' as const,
        },
        {
          category: 'Light Activity',
          actions: ['Walking', 'Swimming', 'Bike riding', 'Yoga/stretching'],
          icon: 'bicycle' as const,
        },
      ],
    },
    week_1: {
      title: 'Week 1 Post-Meet',
      icon: 'fitness' as const,
      color: 'amber',
      training: 'Light movement, bodyweight, or machines only',
      steps: [
        {
          category: 'Return to Training',
          actions: ['Bodyweight exercises', 'Machines (low weight, high reps)', 'Focus on movement quality', 'No heavy loading yet'],
          icon: 'barbell' as const,
        },
        {
          category: 'Volume',
          actions: ['Very low (30-40% normal)', '2-3 sessions max', '10-15 reps per set', 'Never to failure'],
          icon: 'trending-down' as const,
        },
        {
          category: 'Continue Recovery',
          actions: ['Massage', 'Foam rolling', 'Stretching', 'Extra sleep if possible'],
          icon: 'heart' as const,
        },
      ],
    },
    week_2: {
      title: 'Week 2 Post-Meet',
      icon: 'trending-up' as const,
      color: 'yellow',
      training: 'Light barbell work, find your groove',
      steps: [
        {
          category: 'Training',
          actions: ['Start barbell movements', 'Light weights (50-60%)', '3-4 sessions', 'Focus: technique and feel'],
          icon: 'barbell' as const,
        },
        {
          category: 'Volume',
          actions: ['Low (50-60% normal)', '8-12 reps', '3-4 sets per exercise', 'Stop well before failure'],
          icon: 'analytics' as const,
        },
        {
          category: 'Weaknesses',
          actions: ['Address weak points from meet', 'Extra accessory work', 'Mobility drills', 'Technique refinement'],
          icon: 'construct' as const,
        },
      ],
    },
    week_3_4: {
      title: 'Weeks 3-4 Post-Meet',
      icon: 'rocket' as const,
      color: 'emerald',
      training: 'Build back up, start new training cycle',
      steps: [
        {
          category: 'Training',
          actions: ['Return to normal training', 'Start new program/cycle', 'Moderate weights (60-75%)', '4-5 sessions per week'],
          icon: 'fitness' as const,
        },
        {
          category: 'Volume',
          actions: ['Moderate (70-80% normal)', 'Progressive overload', 'Build from base phase', 'Focus on hypertrophy'],
          icon: 'trending-up' as const,
        },
        {
          category: 'Set New Goals',
          actions: ['Next meet date?', 'New PRs to chase', 'Weaknesses to address', 'Long-term training plan'],
          icon: 'flag' as const,
        },
      ],
    },
  };

  const mentalRecovery = [
    {
      aspect: 'Process the Meet',
      tips: [
        'Watch videos objectively',
        'Celebrate successes (even small ones)',
        'Learn from misses without dwelling',
        'Remember: one meet doesn\'t define you',
      ],
      icon: 'videocam' as const,
    },
    {
      aspect: 'Post-Meet Blues',
      tips: [
        'Normal to feel "lost" after big goal',
        'Take 1-2 weeks without pressure',
        'Reflect on the journey, not just outcome',
        'Set new exciting goals',
      ],
      icon: 'sad' as const,
    },
    {
      aspect: 'Set Next Goals',
      tips: [
        'When to compete next? (12-16 weeks ideal)',
        'What PRs to target?',
        'Technical improvements needed?',
        'New training phase focus?',
      ],
      icon: 'trophy' as const,
    },
  ];

  const commonMistakes = [
    {
      mistake: 'Jumping back to heavy training too soon',
      consequence: 'Burnout, injury risk, poor performance',
      fix: 'Take full 2 weeks easy before pushing',
    },
    {
      mistake: 'Not eating enough post-meet',
      consequence: 'Poor recovery, loss of muscle',
      fix: 'Return to maintenance calories immediately',
    },
    {
      mistake: 'Dwelling on missed lifts',
      consequence: 'Negative mindset, loss of confidence',
      fix: 'Learn from it, then move forward',
    },
    {
      mistake: 'No deload/rest period',
      consequence: 'CNS fatigue, accumulated stress',
      fix: 'Respect recovery - you just peaked',
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
            Post-Competition Recovery
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          <View className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl p-6 mb-6">
            <Text className="text-white text-2xl font-bold mb-2">Recover Right</Text>
            <Text className="text-white opacity-90">
              Post-meet recovery protocol
            </Text>
          </View>

          <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
            <Text className="text-white font-bold text-lg mb-3">Recovery Timeline</Text>
            <Text className="text-zinc-400 mb-4">
              Your body just performed maximally. Respect the recovery process.
            </Text>

            {Object.entries(recoveryProtocol).map(([key, phase]) => {
              const phaseData = phase as {
                title: string;
                icon: any;
                color: string;
                training?: string;
                steps: Array<{
                  category: string;
                  actions: string[];
                  icon: any;
                }>;
              };
              
              return (
                <View key={key} className={`bg-${phaseData.color}-500/10 rounded-xl p-4 mb-4 last:mb-0 border border-${phaseData.color}-500/30`}>
                  <View className="flex-row items-center mb-3">
                    <Ionicons name={phaseData.icon} size={24} color={`#${
                      phaseData.color === 'red' ? 'ef4444' :
                      phaseData.color === 'orange' ? 'f97316' :
                      phaseData.color === 'amber' ? 'f59e0b' :
                      phaseData.color === 'yellow' ? 'eab308' :
                      '10b981'
                    }`} />
                    <Text className={`text-${phaseData.color}-400 font-bold text-lg ml-2 flex-1`}>
                      {phaseData.title}
                    </Text>
                  </View>

                  {phaseData.training && (
                    <View className="bg-zinc-900 rounded-xl p-3 mb-3">
                      <Text className="text-zinc-400 text-sm">Training Status</Text>
                      <Text className="text-white font-bold">{phaseData.training}</Text>
                    </View>
                  )}

                  {phaseData.steps.map((step, idx) => (
                    <View key={idx} className="bg-zinc-900 rounded-xl p-3 mb-2 last:mb-0">
                      <View className="flex-row items-center mb-2">
                        <Ionicons name={step.icon} size={18} color="#10b981" />
                        <Text className="text-emerald-400 font-bold ml-2">{step.category}</Text>
                      </View>
                      {step.actions.map((action, aidx) => (
                        <View key={aidx} className="flex-row items-start mb-1 last:mb-0">
                          <Text className="text-zinc-500 mr-2">•</Text>
                          <Text className="text-zinc-300 text-sm flex-1">{action}</Text>
                        </View>
                      ))}
                    </View>
                  ))}
                </View>
              );
            })}
          </View>

          <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
            <Text className="text-white font-bold text-lg mb-4">Mental Recovery</Text>
            {mentalRecovery.map((aspect, idx) => (
              <View key={idx} className="bg-purple-500/10 rounded-xl p-4 mb-3 last:mb-0 border border-purple-500/30">
                <View className="flex-row items-center mb-2">
                  <Ionicons name={aspect.icon} size={20} color="#a855f7" />
                  <Text className="text-purple-400 font-bold ml-2">{aspect.aspect}</Text>
                </View>
                {aspect.tips.map((tip, tidx) => (
                  <View key={tidx} className="flex-row items-start mb-1 last:mb-0">
                    <Text className="text-purple-400 mr-2">•</Text>
                    <Text className="text-purple-200 text-sm flex-1">{tip}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>

          <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
            <Text className="text-white font-bold text-lg mb-4">Common Mistakes</Text>
            {commonMistakes.map((item, idx) => (
              <View key={idx} className="bg-zinc-800 rounded-xl p-4 mb-3 last:mb-0">
                <View className="flex-row items-start mb-2">
                  <Ionicons name="close-circle" size={20} color="#ef4444" />
                  <Text className="text-red-400 font-bold ml-2 flex-1">{item.mistake}</Text>
                </View>
                <Text className="text-zinc-400 text-sm mb-2">
                  Consequence: {item.consequence}
                </Text>
                <View className="flex-row items-start">
                  <Ionicons name="checkmark-circle" size={16} color="#10b981" />
                  <Text className="text-emerald-400 text-sm ml-2 flex-1">
                    Fix: {item.fix}
                  </Text>
                </View>
              </View>
            ))}
          </View>

          <View className="bg-blue-500/10 rounded-xl p-4 border border-blue-500/30 mb-6">
            <Text className="text-blue-400 font-bold mb-2">Recovery Checklist</Text>
            <Text className="text-blue-300 text-sm mb-2">
              ✓ Immediate celebration and refuel
            </Text>
            <Text className="text-blue-300 text-sm mb-2">
              ✓ 3 days complete rest
            </Text>
            <Text className="text-blue-300 text-sm mb-2">
              ✓ Week 1: Light movement only
            </Text>
            <Text className="text-blue-300 text-sm mb-2">
              ✓ Week 2: Gradual return to barbell
            </Text>
            <Text className="text-blue-300 text-sm mb-2">
              ✓ Weeks 3-4: Build into new cycle
            </Text>
            <Text className="text-blue-300 text-sm">
              ✓ Set new goals and move forward
            </Text>
          </View>

          <View className="bg-emerald-500/10 rounded-xl p-4 border border-emerald-500/30 mb-6">
            <Text className="text-emerald-400 font-bold mb-2">Remember</Text>
            <Text className="text-emerald-300 text-sm">
              Recovery is not wasted time - it's when you grow. The meet demanded everything
              from your body and mind. Honor that by recovering properly. Your next PR cycle
              starts with proper rest.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
