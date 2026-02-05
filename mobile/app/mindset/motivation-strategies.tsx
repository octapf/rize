import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function MotivationStrategies() {
  const [selectedStrategy, setSelectedStrategy] = useState('intrinsic');

  const strategies = [
    {
      id: 'intrinsic',
      name: 'Build Intrinsic Motivation',
      icon: 'heart' as const,
      color: 'red',
      description: 'Motivation from within, not external rewards',
      why: 'Intrinsic motivation is sustainable long-term, while external motivation fades',
      tactics: [
        {
          tactic: 'Connect to Identity',
          how: 'I am an athlete who trains, not someone trying to train',
          example: 'Change "I should go to gym" to "Training is what I do"',
        },
        {
          tactic: 'Focus on Process',
          how: 'Love the work itself, not just results',
          example: 'Enjoy the feeling of lifting, the focus, the challenge',
        },
        {
          tactic: 'Autonomy',
          how: 'Choose your own path within structure',
          example: 'Pick exercises you enjoy, customize your program',
        },
        {
          tactic: 'Mastery',
          how: 'Pursue continuous improvement',
          example: 'Track PRs, celebrate technique improvements',
        },
        {
          tactic: 'Purpose',
          how: 'Connect training to bigger why',
          example: 'Be strong for kids, longevity, confidence',
        },
      ],
    },
    {
      id: 'environmental',
      name: 'Design Your Environment',
      icon: 'home' as const,
      color: 'blue',
      description: 'Make good choices automatic',
      why: 'Willpower is limited. Environment design removes friction.',
      tactics: [
        {
          tactic: 'Gym Bag Ready',
          how: 'Pack gym bag night before, by the door',
          example: 'Wake up, grab bag, go. No decisions needed.',
        },
        {
          tactic: 'Visual Cues',
          how: 'Place reminders in visible spots',
          example: 'Gym shoes by bed, workout clothes on chair',
        },
        {
          tactic: 'Remove Obstacles',
          how: 'Eliminate friction between you and training',
          example: 'Home gym, gym near work, prep meals ahead',
        },
        {
          tactic: 'Social Environment',
          how: 'Surround yourself with active people',
          example: 'Join lifting community, training partners',
        },
        {
          tactic: 'Digital Environment',
          how: 'Curate feeds for inspiration',
          example: 'Follow athletes, unfollow demotivating content',
        },
      ],
    },
    {
      id: 'accountability',
      name: 'Create Accountability',
      icon: 'people' as const,
      color: 'emerald',
      description: 'External pressure to follow through',
      why: 'Humans perform better when answerable to others',
      tactics: [
        {
          tactic: 'Training Partner',
          how: 'Schedule workouts with someone',
          example: 'Meet friend at gym 6am Tuesdays/Thursdays',
        },
        {
          tactic: 'Public Commitment',
          how: 'Announce goals publicly',
          example: 'Post "Hitting 100kg bench by March" on social',
        },
        {
          tactic: 'Coach/Trainer',
          how: 'Pay someone to hold you accountable',
          example: 'Online coach who checks in weekly',
        },
        {
          tactic: 'Bet/Stakes',
          how: 'Put money or pride on the line',
          example: 'Bet friend $100 you won\'t miss a workout',
        },
        {
          tactic: 'Track Publicly',
          how: 'Share workout logs where others see',
          example: 'Post daily workout completion to group chat',
        },
      ],
    },
    {
      id: 'momentum',
      name: 'Build Momentum',
      icon: 'trending-up' as const,
      color: 'purple',
      description: 'Small wins compound into unstoppable force',
      why: 'Motivation often follows action, not the reverse',
      tactics: [
        {
          tactic: 'Start Stupidly Small',
          how: 'Make first step laughably easy',
          example: 'Just put on gym shoes. Usually leads to full workout.',
        },
        {
          tactic: '5-Minute Rule',
          how: 'Commit to just 5 minutes',
          example: 'Tell yourself "just warm-up". Rarely stop there.',
        },
        {
          tactic: 'Chain Wins',
          how: 'Stack successful days',
          example: 'Track streak, never break chain two days in row',
        },
        {
          tactic: 'Celebrate Immediately',
          how: 'Acknowledge every completion',
          example: 'Fist pump, check box, text yourself "done"',
        },
        {
          tactic: 'Visible Progress',
          how: 'Track in way you see daily',
          example: 'Calendar Xs, weight on whiteboard, app badges',
        },
      ],
    },
    {
      id: 'reframe',
      name: 'Reframe Resistance',
      icon: 'refresh' as const,
      color: 'amber',
      description: 'Change your relationship with difficulty',
      why: 'How you interpret challenge determines enjoyment',
      tactics: [
        {
          tactic: 'Hard = Growth',
          how: 'Reframe discomfort as progress signal',
          example: 'Muscle burn means I\'m getting stronger RIGHT NOW',
        },
        {
          tactic: 'Obstacle = Opportunity',
          how: 'See problems as chances to prove yourself',
          example: 'Busy day? Prove you can find 30 minutes anyway.',
        },
        {
          tactic: 'Stress = Excitement',
          how: 'Physiologically identical, choose interpretation',
          example: 'Nervous before PR? That\'s my body energizing me.',
        },
        {
          tactic: 'Failure = Data',
          how: 'Missed lift teaches what succeeding doesn\'t',
          example: 'Failed at 100kg? Now I know I can do 97.5kg.',
        },
        {
          tactic: 'Resistance = The Work',
          how: 'The point IS that it\'s hard',
          example: 'If it were easy, everyone would be strong.',
        },
      ],
    },
  ];

  const currentStrategy = strategies.find((s) => s.id === selectedStrategy)!;

  return (
    <View className="flex-1 bg-zinc-950">
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1 ml-3">
            Motivation Strategies
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          <View className="bg-gradient-to-r from-red-500 to-orange-500 rounded-xl p-6 mb-6">
            <Text className="text-white text-2xl font-bold mb-2">Stay Motivated</Text>
            <Text className="text-white opacity-90">
              Systems that keep you going
            </Text>
          </View>

          <View className="mb-6">
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View className="flex-row gap-3">
                {strategies.map((strat) => (
                  <TouchableOpacity
                    key={strat.id}
                    onPress={() => setSelectedStrategy(strat.id)}
                    className={`${
                      selectedStrategy === strat.id
                        ? `bg-${strat.color}-500`
                        : 'bg-zinc-800'
                    } rounded-xl px-4 py-3 border ${
                      selectedStrategy === strat.id
                        ? `border-${strat.color}-400`
                        : 'border-zinc-700'
                    }`}
                  >
                    <View className="flex-row items-center">
                      <Ionicons name={strat.icon} size={20} color="white" />
                      <Text className="text-white font-bold ml-2 text-sm">{strat.name}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>

          <View className={`bg-${currentStrategy.color}-500/10 rounded-xl p-5 mb-6 border border-${currentStrategy.color}-500/30`}>
            <View className="flex-row items-center mb-3">
              <Ionicons name={currentStrategy.icon} size={28} color={`#${currentStrategy.color === 'red' ? 'ef4444' : currentStrategy.color === 'blue' ? '3b82f6' : currentStrategy.color === 'emerald' ? '10b981' : currentStrategy.color === 'purple' ? 'a855f7' : 'f59e0b'}`} />
              <Text className={`text-${currentStrategy.color}-400 font-bold text-xl ml-3 flex-1`}>
                {currentStrategy.name}
              </Text>
            </View>
            <Text className="text-zinc-300 text-lg mb-3">{currentStrategy.description}</Text>
            <View className="bg-zinc-900 rounded-xl p-3">
              <Text className="text-zinc-400 text-sm mb-1">Why It Works:</Text>
              <Text className="text-white">{currentStrategy.why}</Text>
            </View>
          </View>

          <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
            <Text className="text-white font-bold text-lg mb-4">Tactical Implementation</Text>
            {currentStrategy.tactics.map((tactic, idx) => (
              <View
                key={idx}
                className={`bg-${currentStrategy.color}-500/10 rounded-xl p-4 mb-3 last:mb-0 border border-${currentStrategy.color}-500/30`}
              >
                <Text className={`text-${currentStrategy.color}-400 font-bold text-lg mb-2`}>
                  {tactic.tactic}
                </Text>
                <View className="mb-2">
                  <Text className="text-zinc-400 text-sm">How:</Text>
                  <Text className="text-white">{tactic.how}</Text>
                </View>
                <View className="bg-zinc-900 rounded-lg p-2">
                  <Text className="text-zinc-400 text-xs mb-1">Example:</Text>
                  <Text className="text-zinc-300 text-sm italic">{tactic.example}</Text>
                </View>
              </View>
            ))}
          </View>

          <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-6">
            <Text className="text-primary/80 font-bold mb-2">Motivation Truth</Text>
            <Text className="text-primary/60 text-sm">
              Motivation is unreliable. It comes and goes. Systems, habits, and environment design work when motivation doesn't. Build systems that work even on your worst days.
            </Text>
          </View>

          <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-6">
            <Text className="text-primary font-bold mb-2">Action Creates Motivation</Text>
            <Text className="text-primary/80 text-sm">
              Don't wait to feel motivated. Start the action, and motivation will follow. The hardest part is starting - once in motion, you'll keep going.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}


