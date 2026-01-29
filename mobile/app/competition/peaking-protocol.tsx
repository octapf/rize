import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function PeakingProtocol() {
  const [selectedWeek, setSelectedWeek] = useState('week4');

  const peakingData = {
    week4: {
      name: 'Week 4 (Deload)',
      timeOut: '4 weeks before meet',
      intensity: '60-70% 1RM',
      volume: '40% normal',
      focus: 'Recovery and adaptation',
      days: [
        {
          day: 'Day 1',
          type: 'Squat Focus',
          exercises: [
            { name: 'Squat', sets: '3x3', weight: '60% 1RM', rpe: '5-6', rest: '3min' },
            { name: 'Paused Squat', sets: '2x3', weight: '50% 1RM', rpe: '5', rest: '2min' },
            { name: 'Leg Press', sets: '2x8', weight: 'Light', rpe: '6', rest: '2min' },
          ],
          notes: 'Focus on crisp technique, should feel refreshing not tiring',
        },
        {
          day: 'Day 2',
          type: 'Bench Focus',
          exercises: [
            { name: 'Bench Press', sets: '3x3', weight: '60% 1RM', rpe: '5-6', rest: '3min' },
            { name: 'Close-Grip Bench', sets: '2x5', weight: '50% 1RM', rpe: '5', rest: '2min' },
            { name: 'DB Rows', sets: '3x8', weight: 'Light', rpe: '6', rest: '90s' },
          ],
          notes: 'Light and snappy, practice perfect bar path',
        },
        {
          day: 'Day 3',
          type: 'Deadlift Focus',
          exercises: [
            { name: 'Deadlift', sets: '3x2', weight: '60% 1RM', rpe: '5-6', rest: '3min' },
            { name: 'Romanian DL', sets: '2x5', weight: '50% 1RM', rpe: '5', rest: '2min' },
            { name: 'Ab Work', sets: '3x10', weight: 'Bodyweight', rpe: '5', rest: '60s' },
          ],
          notes: 'Easy pulls, no grinding, perfect setup every rep',
        },
      ],
      goals: [
        'Let fatigue dissipate completely',
        'Allow supercompensation to begin',
        'Maintain movement patterns',
        'Address any minor aches',
        'Mental break from heavy loading',
      ],
    },
    week3: {
      name: 'Week 3 (Opener Week)',
      timeOut: '3 weeks before meet',
      intensity: '80-90% 1RM',
      volume: '60% normal',
      focus: 'Test openers, practice commands',
      days: [
        {
          day: 'Day 1',
          type: 'Squat Opener',
          exercises: [
            { name: 'Squat Warmup', sets: 'Progressive', weight: 'Up to 70%', rpe: '4-5', rest: '2-3min' },
            { name: 'Squat - OPENER', sets: '1x1', weight: '85-90% (planned opener)', rpe: '7-8', rest: '5min' },
            { name: 'Squat Backoff', sets: '2x2', weight: '70% 1RM', rpe: '6', rest: '3min' },
            { name: 'Accessories', sets: 'Minimal', weight: 'Light', rpe: '5-6', rest: 'Short' },
          ],
          notes: 'Practice walkout, commands, depth. Opener should feel very confident.',
        },
        {
          day: 'Day 2',
          type: 'Bench Opener',
          exercises: [
            { name: 'Bench Warmup', sets: 'Progressive', weight: 'Up to 70%', rpe: '4-5', rest: '2-3min' },
            { name: 'Bench - OPENER', sets: '1x1', weight: '85-90% (planned opener)', rpe: '7-8', rest: '5min' },
            { name: 'Bench with Pause', sets: '2x2', weight: '70% 1RM', rpe: '6', rest: '3min' },
            { name: 'Accessories', sets: 'Minimal', weight: 'Light', rpe: '5-6', rest: 'Short' },
          ],
          notes: 'Practice commands, pause on chest, press timing. Smooth and fast.',
        },
        {
          day: 'Day 3',
          type: 'Deadlift Opener',
          exercises: [
            { name: 'Deadlift Warmup', sets: 'Progressive', weight: 'Up to 70%', rpe: '4-5', rest: '2-3min' },
            { name: 'Deadlift - OPENER', sets: '1x1', weight: '85-90% (planned opener)', rpe: '7-8', rest: '5min' },
            { name: 'Deadlift Backoff', sets: '2x1', weight: '70% 1RM', rpe: '6', rest: '3min' },
            { name: 'Accessories', sets: 'Minimal', weight: 'Light', rpe: '5-6', rest: 'Short' },
          ],
          notes: 'Practice setup, lockout position. Should fly up with good speed.',
        },
      ],
      goals: [
        'Confirm opener weights (should be 85-90% 1RM)',
        'Practice competition commands',
        'Build confidence with heavy but manageable weight',
        'Fine-tune technique under load',
        'Assess any technical issues',
      ],
    },
    week2: {
      name: 'Week 2 (Light Week)',
      timeOut: '2 weeks before meet',
      intensity: '50-60% 1RM',
      volume: '30% normal',
      focus: 'Active recovery, maintain feel',
      days: [
        {
          day: 'Day 1',
          type: 'Full Body Light',
          exercises: [
            { name: 'Squat', sets: '3x2', weight: '50% 1RM', rpe: '4', rest: '2min' },
            { name: 'Bench Press', sets: '3x2', weight: '50% 1RM', rpe: '4', rest: '2min' },
            { name: 'Deadlift', sets: '2x1', weight: '50% 1RM', rpe: '4', rest: '2min' },
            { name: 'Mobility Work', sets: '15-20min', weight: 'N/A', rpe: '3', rest: 'N/A' },
          ],
          notes: 'Extremely light. Just to maintain feel for the bar. No fatigue.',
        },
        {
          day: 'Day 2 (Optional)',
          type: 'Mobility & Technique',
          exercises: [
            { name: 'Empty Bar Squat', sets: '3x5', weight: 'Bar only', rpe: '2', rest: '1min' },
            { name: 'Empty Bar Bench', sets: '3x5', weight: 'Bar only', rpe: '2', rest: '1min' },
            { name: 'Light RDL', sets: '2x8', weight: '30-40kg', rpe: '3', rest: '1min' },
            { name: 'Stretching', sets: '20min', weight: 'N/A', rpe: '2', rest: 'N/A' },
          ],
          notes: 'Only if you feel the need. Can skip entirely. Movement and blood flow.',
        },
      ],
      goals: [
        'Maintain movement patterns without fatigue',
        'Allow peak strength to emerge',
        'Address mobility restrictions',
        'Mental preparation and visualization',
        'Prioritize sleep and nutrition',
      ],
    },
    week1: {
      name: 'Week 1 (Meet Week)',
      timeOut: 'Meet week',
      intensity: 'Minimal',
      volume: 'Minimal',
      focus: 'Stay sharp, don\'t fatigue',
      days: [
        {
          day: 'Monday (7 days out)',
          type: 'Light Movement',
          exercises: [
            { name: 'Squat', sets: '2x2', weight: '40% 1RM', rpe: '3', rest: '2min' },
            { name: 'Bench Press', sets: '2x2', weight: '40% 1RM', rpe: '3', rest: '2min' },
            { name: 'Mobility', sets: '15min', weight: 'N/A', rpe: '2', rest: 'N/A' },
          ],
          notes: 'Last time touching weight. Very light, just to maintain feel.',
        },
        {
          day: 'Tuesday-Wednesday (6-5 days)',
          type: 'Active Recovery',
          exercises: [
            { name: 'Walking', sets: '30min', weight: 'N/A', rpe: '3', rest: 'N/A' },
            { name: 'Stretching', sets: '20min', weight: 'N/A', rpe: '2', rest: 'N/A' },
            { name: 'Mobility Drills', sets: '15min', weight: 'N/A', rpe: '2', rest: 'N/A' },
          ],
          notes: 'No weights. Just movement and blood flow. Stay loose.',
        },
        {
          day: 'Thursday-Friday (4-3 days)',
          type: 'Rest & Prep',
          exercises: [
            { name: 'Light Walking', sets: '20min', weight: 'N/A', rpe: '2', rest: 'N/A' },
            { name: 'Gentle Stretching', sets: '15min', weight: 'N/A', rpe: '1', rest: 'N/A' },
          ],
          notes: 'Minimal activity. Pack gear. Visualize lifts. Sleep priority.',
        },
        {
          day: 'Saturday (2 days)',
          type: 'Complete Rest',
          exercises: [
            { name: 'Rest', sets: 'All day', weight: 'N/A', rpe: '0', rest: 'N/A' },
            { name: 'Visualization', sets: '10-15min', weight: 'N/A', rpe: '1', rest: 'N/A' },
          ],
          notes: 'Do nothing. Relax. Trust your training. Early bedtime.',
        },
        {
          day: 'Sunday (Meet Day)',
          type: 'COMPETITION',
          exercises: [
            { name: 'Light warmup', sets: 'As needed', weight: 'Progressive', rpe: 'Varied', rest: 'Timed' },
            { name: 'COMPETE', sets: '3 per lift', weight: 'MAX', rpe: '10', rest: 'Platform' },
          ],
          notes: 'Execute your plan. Trust your openers. Have fun!',
        },
      ],
      goals: [
        'Arrive fresh and recovered',
        'Maintain sharpness without fatigue',
        'Optimize sleep every night',
        'Make weight comfortably',
        'Mental preparation and confidence',
      ],
    },
  };

  const currentWeek = peakingData[selectedWeek as keyof typeof peakingData];

  const getIntensityColor = (intensity: string) => {
    if (intensity.includes('60-70') || intensity.includes('50-60')) return 'text-emerald-400';
    if (intensity.includes('80-90')) return 'text-amber-400';
    return 'text-blue-400';
  };

  return (
    <View className="flex-1 bg-zinc-950">
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1 ml-3">
            Peaking Protocol
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          <View className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-6 mb-6">
            <Text className="text-white text-2xl font-bold mb-2">Peak for Meet Day</Text>
            <Text className="text-white opacity-90">
              4-week protocol to maximize strength on competition day
            </Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6">
            <View className="flex-row gap-3 px-1">
              {Object.entries(peakingData).map(([key, week]) => (
                <TouchableOpacity
                  key={key}
                  onPress={() => setSelectedWeek(key)}
                  className={`${
                    selectedWeek === key 
                      ? 'bg-purple-500'
                      : 'bg-zinc-900'
                  } rounded-xl p-4 border ${
                    selectedWeek === key 
                      ? 'border-white/30'
                      : 'border-zinc-800'
                  } min-w-[160px]`}
                >
                  <Text className={`${selectedWeek === key ? 'text-white' : 'text-zinc-400'} font-bold text-lg mb-1`}>
                    {week.name.split(' ')[0]} {week.name.split(' ')[1]}
                  </Text>
                  <Text className={`${selectedWeek === key ? 'text-white/80' : 'text-zinc-500'} text-xs`}>
                    {week.timeOut}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
            <Text className="text-white text-xl font-bold mb-4">{currentWeek.name}</Text>
            
            <View className="flex-row gap-3 mb-4">
              <View className="flex-1 bg-zinc-800 rounded-xl p-3">
                <Text className="text-zinc-400 text-xs mb-1">Intensity</Text>
                <Text className={`${getIntensityColor(currentWeek.intensity)} font-bold`}>
                  {currentWeek.intensity}
                </Text>
              </View>
              <View className="flex-1 bg-zinc-800 rounded-xl p-3">
                <Text className="text-zinc-400 text-xs mb-1">Volume</Text>
                <Text className="text-purple-400 font-bold">{currentWeek.volume}</Text>
              </View>
            </View>

            <View className="bg-purple-500/10 rounded-xl p-3 border border-purple-500/30">
              <Text className="text-purple-400 font-bold text-sm mb-1">Focus:</Text>
              <Text className="text-purple-300">{currentWeek.focus}</Text>
            </View>
          </View>

          {currentWeek.days.map((day, idx) => (
            <View key={idx} className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
              <View className="flex-row items-center mb-4">
                <View className="bg-purple-500 rounded-full w-10 h-10 items-center justify-center mr-3">
                  <Text className="text-white font-bold">{idx + 1}</Text>
                </View>
                <View className="flex-1">
                  <Text className="text-white font-bold text-lg">{day.day}</Text>
                  <Text className="text-purple-400 text-sm">{day.type}</Text>
                </View>
              </View>

              {day.exercises.map((exercise, exIdx) => (
                <View key={exIdx} className="bg-zinc-800 rounded-xl p-4 mb-3 last:mb-4">
                  <Text className="text-white font-bold mb-2">{exercise.name}</Text>
                  <View className="flex-row flex-wrap gap-2">
                    <View className="bg-zinc-700 rounded-lg px-3 py-1">
                      <Text className="text-zinc-300 text-xs">{exercise.sets}</Text>
                    </View>
                    <View className="bg-zinc-700 rounded-lg px-3 py-1">
                      <Text className="text-zinc-300 text-xs">{exercise.weight}</Text>
                    </View>
                    <View className="bg-zinc-700 rounded-lg px-3 py-1">
                      <Text className="text-zinc-300 text-xs">RPE {exercise.rpe}</Text>
                    </View>
                    <View className="bg-zinc-700 rounded-lg px-3 py-1">
                      <Text className="text-zinc-300 text-xs">Rest: {exercise.rest}</Text>
                    </View>
                  </View>
                </View>
              ))}

              <View className="bg-blue-500/10 rounded-xl p-3 border border-blue-500/30">
                <Text className="text-blue-400 font-bold text-sm mb-1">Notes:</Text>
                <Text className="text-blue-300 text-sm">{day.notes}</Text>
              </View>
            </View>
          ))}

          <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
            <Text className="text-white font-bold text-lg mb-4">Week Goals:</Text>
            {currentWeek.goals.map((goal, idx) => (
              <Text key={idx} className="text-zinc-300 mb-2 last:mb-0">
                ✓ {goal}
              </Text>
            ))}
          </View>

          <View className="bg-gradient-to-r from-red-500/20 to-purple-500/20 rounded-xl p-4 border border-red-500/30 mb-6">
            <Text className="text-red-400 font-bold mb-2">Critical Peak Principles</Text>
            <Text className="text-red-300 text-sm mb-2">
              • Deload hard week 4 - let fatigue dissipate completely
            </Text>
            <Text className="text-red-300 text-sm mb-2">
              • Week 3 test openers - should feel confident and fast
            </Text>
            <Text className="text-red-300 text-sm mb-2">
              • Week 2 is LIGHT - resist urge to "do more"
            </Text>
            <Text className="text-red-300 text-sm mb-2">
              • Meet week do almost nothing - trust the process
            </Text>
            <Text className="text-red-300 text-sm">
              • Sleep 8+ hours every night - this is when strength peaks
            </Text>
          </View>

          <View className="bg-emerald-500/10 rounded-xl p-4 border border-emerald-500/30 mb-6">
            <Text className="text-emerald-400 font-bold mb-2">Supercompensation Science</Text>
            <Text className="text-emerald-300 text-sm mb-2">
              Training creates fatigue that masks your true strength. The peak removes fatigue so your adaptation can express itself.
            </Text>
            <Text className="text-emerald-300 text-sm mb-2">
              Week 4: Fatigue drops rapidly, fitness maintained
            </Text>
            <Text className="text-emerald-300 text-sm mb-2">
              Week 3: Fatigue mostly gone, test openers
            </Text>
            <Text className="text-emerald-300 text-sm mb-2">
              Week 2-1: Complete freshness, peak strength emerges
            </Text>
            <Text className="text-emerald-300 text-sm">
              Meet Day: Maximum expression of your training!
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
