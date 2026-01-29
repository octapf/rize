import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function MeetDayChecklist() {
  const [checklistItems, setChecklistItems] = useState([
    { id: 1, task: 'Pack gym bag night before', category: 'Preparation', done: false },
    { id: 2, task: 'Singlet, belt, knee sleeves, wrist wraps', category: 'Gear', done: false },
    { id: 3, task: 'Snacks (bananas, rice cakes, gatorade)', category: 'Nutrition', done: false },
    { id: 4, task: 'Caffeine (pre-workout, coffee)', category: 'Nutrition', done: false },
    { id: 5, task: 'Chalk, baby powder, towel', category: 'Accessories', done: false },
    { id: 6, task: 'Headphones, hype music', category: 'Mental', done: false },
    { id: 7, task: 'Attempt selection card written out', category: 'Preparation', done: false },
    { id: 8, task: 'Coach/handler contact info', category: 'Preparation', done: false },
    { id: 9, task: 'Arrive 90+ min before weigh-in', category: 'Timeline', done: false },
    { id: 10, task: 'Weigh-in successfully', category: 'Timeline', done: false },
    { id: 11, task: 'Rehydrate + eat immediately after', category: 'Timeline', done: false },
    { id: 12, task: 'Dynamic warm-up 60 min before flight', category: 'Timeline', done: false },
    { id: 13, task: 'First lift warm-up 30 min before', category: 'Timeline', done: false },
    { id: 14, task: 'Submit opener 5 min before flight', category: 'Timeline', done: false },
  ]);

  const toggleItem = (id: number) => {
    setChecklistItems(items =>
      items.map(item =>
        item.id === id ? { ...item, done: !item.done } : item
      )
    );
  };

  const categories = ['Preparation', 'Gear', 'Nutrition', 'Accessories', 'Mental', 'Timeline'];

  const timeline = [
    {
      time: 'Night before',
      tasks: ['Pack all gear', 'Lay out clothes', 'Set multiple alarms', 'Get to bed early (8-9h sleep)'],
      icon: 'moon' as const,
    },
    {
      time: 'Morning of',
      tasks: ['Light breakfast 2-3h before weigh-in', 'Sip water', 'Arrive 90+ min early', 'Check in, get flight assignment'],
      icon: 'sunny' as const,
    },
    {
      time: 'Post weigh-in',
      tasks: ['Immediately: 500ml water + electrolytes', 'Next 30 min: simple carbs + 500ml water', '60 min: light meal (rice, banana)', 'Continue hydrating every 15-30 min'],
      icon: 'water' as const,
    },
    {
      time: '60 min before flight',
      tasks: ['Dynamic warm-up (10-15 min)', 'Light stretching', 'Mental visualization', 'Put on gear'],
      icon: 'fitness' as const,
    },
    {
      time: '30 min before flight',
      tasks: ['Start lift-specific warm-up', 'Bar → 50% → 70% → 85%', 'Opener weight once in warm-up room', 'Submit opener to platform'],
      icon: 'barbell' as const,
    },
    {
      time: 'Between attempts',
      tasks: ['Sip simple carbs (gatorade)', 'Stay warm (jacket on)', 'Light movement', 'Mentally prepare next attempt'],
      icon: 'time' as const,
    },
  ];

  const warmupRoom = [
    {
      lift: 'Squat',
      protocol: [
        'Bar x 10 reps',
        '60kg (50%) x 5',
        '100kg (70%) x 3',
        '120kg (85%) x 1',
        'Opener (90-92%) x 1 in rack',
        'Walk to platform',
      ],
    },
    {
      lift: 'Bench',
      protocol: [
        'Bar x 10 reps',
        '40kg (50%) x 5',
        '60kg (70%) x 3',
        '80kg (85%) x 1',
        'Opener (90%) x 1',
        'Walk to platform',
      ],
    },
    {
      lift: 'Deadlift',
      protocol: [
        'Bar x 5 reps',
        '100kg (50%) x 3',
        '140kg (70%) x 2',
        '160kg (85%) x 1',
        'Opener (90%) x 1 partial if needed',
        'Walk to platform',
      ],
    },
  ];

  const betweenLifts = {
    squat_to_bench: [
      'Time between: 30-60 min typically',
      'Rehydrate: 500ml water + electrolytes',
      'Light snack: banana, rice cake',
      'Change gear: remove knee sleeves, prep wrist wraps',
      'Light upper body warm-up',
      'Mental reset: bench is separate meet',
    ],
    bench_to_deadlift: [
      'Time between: 30-60 min',
      'Fuel: simple carbs (gummy bears, gatorade)',
      'Caffeine: if needed and not too late',
      'Remove bench gear',
      'Light posterior chain activation',
      'This is where you make or break the total',
    ],
  };

  const mentalPrep = [
    {
      strategy: 'Visualization',
      when: 'Night before + morning of',
      how: '5-10 min: see perfect lifts, feel the weight, hear the commands',
    },
    {
      strategy: 'Breathing',
      when: 'Warm-up room, before walking out',
      how: 'Box breathing: 4 in, 4 hold, 4 out, 4 hold x 5 rounds',
    },
    {
      strategy: 'Pre-lift routine',
      when: 'Every single attempt',
      how: 'Exact same ritual: approach, chalk, breathe, visualize, grip, lift',
    },
    {
      strategy: 'Self-talk',
      when: 'Throughout the day',
      how: 'Positive affirmations: "I\'ve prepared", "I\'m strong", "I trust my training"',
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
            Meet Day Checklist
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          <View className="bg-gradient-to-r from-red-500 to-orange-500 rounded-xl p-6 mb-6">
            <Text className="text-white text-2xl font-bold mb-2">Ready to Compete</Text>
            <Text className="text-white opacity-90">
              Everything you need for meet day
            </Text>
          </View>

          <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
            <Text className="text-white font-bold text-lg mb-4">Essential Checklist</Text>
            <Text className="text-zinc-400 text-sm mb-4">
              Completed: {checklistItems.filter(i => i.done).length}/{checklistItems.length}
            </Text>
            {categories.map((category) => {
              const items = checklistItems.filter(i => i.category === category);
              if (items.length === 0) return null;
              return (
                <View key={category} className="mb-4 last:mb-0">
                  <Text className="text-emerald-400 font-bold mb-2">{category}</Text>
                  {items.map((item) => (
                    <TouchableOpacity
                      key={item.id}
                      onPress={() => toggleItem(item.id)}
                      className={`flex-row items-center p-3 rounded-xl mb-2 ${
                        item.done ? 'bg-emerald-500/20 border border-emerald-500/30' : 'bg-zinc-800'
                      }`}
                    >
                      <Ionicons
                        name={item.done ? 'checkmark-circle' : 'ellipse-outline'}
                        size={24}
                        color={item.done ? '#10b981' : '#52525b'}
                      />
                      <Text className={`ml-3 flex-1 ${item.done ? 'text-emerald-300 line-through' : 'text-white'}`}>
                        {item.task}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              );
            })}
          </View>

          <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
            <Text className="text-white font-bold text-lg mb-4">Meet Day Timeline</Text>
            {timeline.map((segment, idx) => (
              <View key={idx} className="mb-4 last:mb-0">
                <View className="flex-row items-center mb-2">
                  <Ionicons name={segment.icon} size={24} color="#3b82f6" />
                  <Text className="text-blue-400 font-bold text-lg ml-2">{segment.time}</Text>
                </View>
                <View className="bg-zinc-800 rounded-xl p-3">
                  {segment.tasks.map((task, tidx) => (
                    <View key={tidx} className="flex-row items-start mb-1 last:mb-0">
                      <Text className="text-blue-400 mr-2">•</Text>
                      <Text className="text-zinc-300 text-sm flex-1">{task}</Text>
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </View>

          <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
            <Text className="text-white font-bold text-lg mb-4">Warm-Up Room Protocol</Text>
            {warmupRoom.map((lift, idx) => (
              <View key={idx} className="bg-red-500/10 rounded-xl p-4 mb-3 last:mb-0 border border-red-500/30">
                <Text className="text-red-400 font-bold mb-3">{lift.lift} Warm-Up</Text>
                {lift.protocol.map((step, sidx) => (
                  <View key={sidx} className="flex-row items-center mb-2 last:mb-0">
                    <View className="w-6 h-6 rounded-full bg-red-500 items-center justify-center mr-2">
                      <Text className="text-white text-xs font-bold">{sidx + 1}</Text>
                    </View>
                    <Text className="text-zinc-300">{step}</Text>
                  </View>
                ))}
              </View>
            ))}
            <View className="bg-amber-500/10 rounded-xl p-3 mt-3 border border-amber-500/30">
              <Text className="text-amber-400 text-sm">
                ⚠ Don't take opener in warm-up room for squat/deadlift - save CNS
              </Text>
            </View>
          </View>

          <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
            <Text className="text-white font-bold text-lg mb-4">Between Lifts</Text>
            
            <View className="mb-4">
              <Text className="text-purple-400 font-bold mb-2">Squat → Bench</Text>
              <View className="bg-zinc-800 rounded-xl p-3">
                {betweenLifts.squat_to_bench.map((item, idx) => (
                  <Text key={idx} className="text-zinc-300 text-sm mb-1 last:mb-0">
                    • {item}
                  </Text>
                ))}
              </View>
            </View>

            <View>
              <Text className="text-purple-400 font-bold mb-2">Bench → Deadlift</Text>
              <View className="bg-zinc-800 rounded-xl p-3">
                {betweenLifts.bench_to_deadlift.map((item, idx) => (
                  <Text key={idx} className="text-zinc-300 text-sm mb-1 last:mb-0">
                    • {item}
                  </Text>
                ))}
              </View>
            </View>
          </View>

          <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
            <Text className="text-white font-bold text-lg mb-4">Mental Preparation</Text>
            {mentalPrep.map((strat, idx) => (
              <View key={idx} className="bg-zinc-800 rounded-xl p-4 mb-3 last:mb-0">
                <Text className="text-emerald-400 font-bold mb-2">{strat.strategy}</Text>
                <Text className="text-zinc-400 text-sm mb-1">When: {strat.when}</Text>
                <Text className="text-zinc-300 text-sm">{strat.how}</Text>
              </View>
            ))}
          </View>

          <View className="bg-blue-500/10 rounded-xl p-4 border border-blue-500/30 mb-6">
            <Text className="text-blue-400 font-bold mb-2">Final Reminders</Text>
            <Text className="text-blue-300 text-sm mb-2">
              • Trust your openers - they should be easy
            </Text>
            <Text className="text-blue-300 text-sm mb-2">
              • Don't change attempts in warm-up room due to nerves
            </Text>
            <Text className="text-blue-300 text-sm mb-2">
              • Listen to commands carefully - no early starts
            </Text>
            <Text className="text-blue-300 text-sm mb-2">
              • Stay hydrated and fueled between flights
            </Text>
            <Text className="text-blue-300 text-sm">
              • Have fun - you've earned this moment
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
