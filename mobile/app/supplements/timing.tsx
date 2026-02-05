import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function SupplementTiming() {
  const [selectedGoal, setSelectedGoal] = useState('muscle');

  const goals = ['muscle', 'strength', 'fat-loss', 'endurance'];

  const timingProtocols = {
    muscle: {
      name: 'Muscle Building Stack',
      icon: 'body' as const,
      color: 'purple',
      timeline: [
        {
          time: 'Upon Waking',
          supplements: [
            { name: 'Vitamin D3', dose: '2000-4000 IU', why: 'With breakfast (fat-soluble)' },
            { name: 'Omega-3', dose: '2-3g', why: 'With breakfast (fat-soluble)' },
          ],
        },
        {
          time: '30-60 Min Pre-Workout',
          supplements: [
            { name: 'Caffeine', dose: '200-400mg', why: 'Peak performance timing' },
            { name: 'Citrulline Malate', dose: '6-8g', why: 'Nitric oxide boost' },
            { name: 'Beta-Alanine', dose: '3-6g', why: 'Buffering (daily total)' },
          ],
        },
        {
          time: 'During Workout',
          supplements: [
            { name: 'EAAs/BCAAs (optional)', dose: '5-10g', why: 'If training fasted only' },
          ],
        },
        {
          time: 'Post-Workout (0-2h)',
          supplements: [
            { name: 'Protein Powder', dose: '20-40g', why: 'Muscle protein synthesis' },
            { name: 'Creatine', dose: '5g', why: 'Absorption slightly better post-workout' },
          ],
        },
        {
          time: 'Before Bed',
          supplements: [
            { name: 'Magnesium', dose: '200-400mg', why: 'Sleep quality, recovery' },
            { name: 'Zinc', dose: '15-30mg', why: 'Recovery, testosterone' },
            { name: 'Casein Protein (optional)', dose: '20-30g', why: 'Slow-release overnight' },
          ],
        },
      ],
      notes: 'Spread protein intake throughout day (every 3-4 hours). Timing is less important than hitting daily totals.',
    },
    strength: {
      name: 'Strength & Power Stack',
      icon: 'barbell' as const,
      color: 'red',
      timeline: [
        {
          time: 'Morning',
          supplements: [
            { name: 'Vitamin D3', dose: '2000-4000 IU', why: 'Testosterone support' },
            { name: 'Creatine', dose: '5g', why: 'Can take any time, morning works' },
          ],
        },
        {
          time: '45-60 Min Pre-Workout',
          supplements: [
            { name: 'Caffeine', dose: '3-6mg/kg', why: 'Strength and power boost' },
            { name: 'Beta-Alanine', dose: '3-6g', why: 'Work capacity in multiple rep sets' },
          ],
        },
        {
          time: 'Post-Workout',
          supplements: [
            { name: 'Protein', dose: '25-40g', why: 'Recovery' },
          ],
        },
        {
          time: 'Evening',
          supplements: [
            { name: 'Magnesium', dose: '300-400mg', why: 'Recovery, nervous system' },
            { name: 'Zinc', dose: '15-30mg', why: 'Testosterone, recovery' },
          ],
        },
      ],
      notes: 'Strength training relies more on neural adaptations. Creatine is the only supplement with strong evidence for strength gains.',
    },
    'fat-loss': {
      name: 'Fat Loss Stack',
      icon: 'flame' as const,
      color: 'amber',
      timeline: [
        {
          time: 'Morning (Fasted Cardio)',
          supplements: [
            { name: 'Caffeine', dose: '200-400mg', why: 'Fat oxidation, energy' },
            { name: 'EAAs', dose: '10g', why: 'Prevent muscle loss if fasted' },
          ],
        },
        {
          time: 'With First Meal',
          supplements: [
            { name: 'Vitamin D3', dose: '2000-4000 IU', why: 'Health support' },
            { name: 'Omega-3', dose: '2-3g', why: 'Anti-inflammatory' },
          ],
        },
        {
          time: 'Pre-Workout',
          supplements: [
            { name: 'Caffeine (if not used AM)', dose: '200-400mg', why: 'Energy in deficit' },
          ],
        },
        {
          time: 'Post-Workout',
          supplements: [
            { name: 'Protein', dose: '25-40g', why: 'Preserve muscle mass' },
            { name: 'Creatine', dose: '5g', why: 'Maintain strength in deficit' },
          ],
        },
        {
          time: 'Between Meals',
          supplements: [
            { name: 'Protein Powder', dose: '20-30g', why: 'Hit protein target, satiety' },
          ],
        },
      ],
      notes: 'Protein intake is CRITICAL in deficit (2.2-3g/kg). No fat-burner supplements work - focus on calorie deficit.',
    },
    endurance: {
      name: 'Endurance Stack',
      icon: 'bicycle' as const,
      color: 'blue',
      timeline: [
        {
          time: '2-3 Hours Before',
          supplements: [
            { name: 'Caffeine', dose: '3-6mg/kg', why: 'Endurance performance' },
            { name: 'Beta-Alanine', dose: '3-6g', why: 'Buffering lactate' },
          ],
        },
        {
          time: '30-60 Min Before',
          supplements: [
            { name: 'Citrulline Malate', dose: '6-8g', why: 'Blood flow, fatigue resistance' },
          ],
        },
        {
          time: 'During (>90 min effort)',
          supplements: [
            { name: 'Carbs', dose: '30-60g/hour', why: 'Fuel performance' },
            { name: 'Electrolytes', dose: 'Per sweat rate', why: 'Hydration' },
            { name: 'BCAAs (optional)', dose: '5-10g', why: 'Prevent central fatigue' },
          ],
        },
        {
          time: 'Post-Exercise',
          supplements: [
            { name: 'Protein + Carbs', dose: '20-40g + 40-80g', why: 'Recovery and glycogen' },
            { name: 'Creatine', dose: '5g', why: 'Recovery between sessions' },
          ],
        },
      ],
      notes: 'Carbs during exercise become critical >90 min. Sodium loss varies - salt tablets if heavy sweater.',
    },
  };

  const currentProtocol = timingProtocols[selectedGoal as keyof typeof timingProtocols];

  return (
    <View className="flex-1 bg-zinc-950">
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1 ml-3">
            Supplement Timing
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          <View className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl p-6 mb-6">
            <Text className="text-white text-2xl font-bold mb-2">Timing Matters</Text>
            <Text className="text-white opacity-90">
              Optimize supplement protocols
            </Text>
          </View>

          <View className="mb-6">
            <View className="flex-row flex-wrap gap-2">
              {goals.map((goal) => (
                <TouchableOpacity
                  key={goal}
                  onPress={() => setSelectedGoal(goal)}
                  className={`${
                    selectedGoal === goal ? 'bg-purple-500' : 'bg-zinc-800'
                  } rounded-xl px-4 py-2 border ${
                    selectedGoal === goal ? 'border-purple-400' : 'border-zinc-700'
                  }`}
                >
                  <Text className="text-white font-bold capitalize">{goal.replace('-', ' ')}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View className={`bg-${currentProtocol.color}-500/10 rounded-xl p-5 mb-6 border border-${currentProtocol.color}-500/30`}>
            <View className="flex-row items-center mb-2">
              <Ionicons name={currentProtocol.icon} size={28} color={`#${currentProtocol.color === 'purple' ? 'a855f7' : currentProtocol.color === 'red' ? 'ef4444' : currentProtocol.color === 'amber' ? 'f59e0b' : '3b82f6'}`} />
              <Text className={`text-${currentProtocol.color}-400 font-bold text-xl ml-3`}>
                {currentProtocol.name}
              </Text>
            </View>
          </View>

          {currentProtocol.timeline.map((slot, idx) => (
            <View key={idx} className="bg-zinc-900 rounded-xl p-5 mb-4 border border-zinc-800">
              <View className="flex-row items-center mb-3">
                <Ionicons name="time" size={20} color="#9D12DE" />
                <Text className="text-primary font-bold text-lg ml-2">
                  {slot.time}
                </Text>
              </View>

              {slot.supplements.map((supp, sidx) => (
                <View key={sidx} className={`bg-${currentProtocol.color}-500/10 rounded-xl p-3 mb-2 last:mb-0 border border-${currentProtocol.color}-500/30`}>
                  <View className="flex-row justify-between items-start mb-1">
                    <Text className="text-white font-bold flex-1">{supp.name}</Text>
                    <Text className={`text-${currentProtocol.color}-400 font-bold ml-2`}>
                      {supp.dose}
                    </Text>
                  </View>
                  <Text className="text-zinc-400 text-sm">{supp.why}</Text>
                </View>
              ))}
            </View>
          ))}

          <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-6">
            <Text className="text-primary/80 font-bold mb-2">Protocol Notes</Text>
            <Text className="text-primary/60 text-sm">{currentProtocol.notes}</Text>
          </View>

          <View className="bg-amber-500/10 rounded-xl p-4 border border-amber-500/30 mb-6">
            <Text className="text-amber-400 font-bold mb-2">Timing vs Totals</Text>
            <Text className="text-amber-300 text-sm mb-2">
              â€¢ Daily totals matter MORE than timing for most supplements
            </Text>
            <Text className="text-amber-300 text-sm mb-2">
              â€¢ Exceptions: Caffeine (pre-workout), Magnesium (before bed)
            </Text>
            <Text className="text-amber-300 text-sm">
              â€¢ Don't stress perfect timing - consistency with daily totals wins
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

