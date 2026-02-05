import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function CompetitionPrep() {
  const [selectedComp, setSelectedComp] = useState('powerlifting');

  const competitions = ['powerlifting', 'bodybuilding', 'crossfit'];

  const prepGuides = {
    powerlifting: {
      name: 'Powerlifting Meet Prep',
      icon: 'barbell' as const,
      color: 'red',
      timeline: '12-16 weeks',
      phases: [
        {
          phase: 'Base Phase (Weeks 1-6)',
          focus: 'Volume accumulation',
          training: [
            'High volume (15-20 sets per lift)',
            'Moderate intensity (70-80% 1RM)',
            'Rep ranges 5-8',
            'Focus on technique perfection',
            'Include variations (pause squats, tempo bench, deficit deads)',
          ],
          example: 'Squat: 5x5 @ 75%, Bench: 4x6 @ 72%, Deadlift: 4x5 @ 78%',
        },
        {
          phase: 'Intensification (Weeks 7-10)',
          focus: 'Build strength',
          training: [
            'Reduce volume (10-15 sets)',
            'Increase intensity (80-90% 1RM)',
            'Rep ranges 2-5',
            'Competition lift variants only',
            'Focus on bar speed',
          ],
          example: 'Squat: 5x3 @ 85%, Bench: 6x2 @ 87%, Deadlift: 4x3 @ 88%',
        },
        {
          phase: 'Peaking (Weeks 11-14)',
          focus: 'Peak strength',
          training: [
            'Low volume (6-10 sets)',
            'Very high intensity (90-97% 1RM)',
            'Singles and doubles',
            'Competition lifts ONLY',
            'Dial in openers',
          ],
          example: 'Squat: 5x1 @ 92.5%, Bench: 6x1 @ 95%, Deadlift: 3x1 @ 95%',
        },
        {
          phase: 'Taper (Week 15)',
          focus: 'Recovery and CNS freshness',
          training: [
            'Minimal volume (3-5 sets total)',
            'Light-moderate intensity (60-75%)',
            'Practice openers only',
            'Focus on sleep and stress reduction',
          ],
          example: 'Monday: Squat opener, Wed: Bench opener, Fri: Light technique',
        },
      ],
      meetDay: [
        'Arrive 90+ min early for weigh-in',
        'Dynamic warm-up 60 min before lifting',
        'First lift warm-up: 30 min before flight',
        'Conservative opener (90-92.5% 1RM)',
        'Second attempt: PR or 2.5-5kg jump',
        'Third attempt: New PR if feeling good',
        'Fuel between lifts (simple carbs, caffeine)',
      ],
    },
    bodybuilding: {
      name: 'Bodybuilding Show Prep',
      icon: 'body' as const,
      color: 'purple',
      timeline: '12-20 weeks',
      phases: [
        {
          phase: 'Early Prep (Weeks 1-8)',
          focus: 'Fat loss while preserving muscle',
          training: [
            'Maintain training volume (don\'t cut too much)',
            'Hypertrophy rep ranges (8-15)',
            'Intensity maintained (progressive overload)',
            'Add cardio gradually (2-4 sessions)',
          ],
          nutrition: 'Moderate deficit (300-500 cal), high protein (2.2-3g/kg)',
        },
        {
          phase: 'Mid Prep (Weeks 9-14)',
          focus: 'Accelerate fat loss',
          training: [
            'Maintain intensity, may reduce volume slightly',
            'Same exercises (don\'t change what works)',
            'Increase cardio (4-6 sessions)',
            'Monitor recovery carefully',
          ],
          nutrition: 'Larger deficit (500-700 cal), very high protein (2.5-3g/kg)',
        },
        {
          phase: 'Final Weeks (Weeks 15-20)',
          focus: 'Peak conditioning',
          training: [
            'Reduce volume if needed for recovery',
            'Maintain muscle stimulus',
            'High cardio (6-7 sessions)',
            'Practice posing daily',
          ],
          nutrition: 'Max deficit (700-1000 cal), extreme protein (3g/kg)',
        },
        {
          phase: 'Peak Week',
          focus: 'Water manipulation, carb load',
          training: [
            'Deload training (light pump work)',
            'Cut cardio significantly',
            'Posing practice only',
          ],
          nutrition: 'Water/sodium manipulation, carb depletion then load',
        },
      ],
      showDay: [
        'Wake up early, light carbs',
        'Backstage pump (light weights, high reps)',
        'Sip carbs throughout day',
        'Stay warm and pumped',
        'Practice poses between prejudging',
        'Enjoy the moment - you earned it',
      ],
    },
    crossfit: {
      name: 'CrossFit Competition Prep',
      icon: 'fitness' as const,
      color: 'blue',
      timeline: '8-12 weeks',
      phases: [
        {
          phase: 'Base Conditioning (Weeks 1-4)',
          focus: 'Build aerobic base and strength',
          training: [
            'High volume conditioning',
            'Strength work 3-4x per week',
            'Work on weaknesses',
            'Gymnastics skill work',
            'Olympic lift technique',
          ],
          example: 'AM: Strength, PM: Conditioning + skill',
        },
        {
          phase: 'Sport-Specific (Weeks 5-8)',
          focus: 'Competition-style workouts',
          training: [
            'Practice comp-length WODs',
            'Time-priority workouts',
            'Couplets and triplets',
            'Heavy single-modality work',
            'Pacing strategy practice',
          ],
          example: 'Simulate comp day: 3 WODs with rest between',
        },
        {
          phase: 'Peaking (Weeks 9-11)',
          focus: 'High intensity, reduced volume',
          training: [
            'Short, intense metcons',
            'Heavy singles on lifts',
            'Speed and power work',
            'Rest more between sessions',
          ],
          example: '1RM testing, fast metcons under 10min',
        },
        {
          phase: 'Taper (Week 12)',
          focus: 'Recovery',
          training: [
            'Light skill work',
            'Short metcons at moderate intensity',
            'Mobility and recovery',
            'Mental preparation',
          ],
          example: '2-3 short sessions, focus on freshness',
        },
      ],
      compDay: [
        'Dynamic warm-up 45 min before event',
        'Review workout strategy',
        'Fuel with simple carbs + protein',
        'Stay warm between events',
        'Hydrate consistently',
        'Execute your plan, adapt as needed',
      ],
    },
  };

  const currentPrep = prepGuides[selectedComp as keyof typeof prepGuides];

  return (
    <View className="flex-1 bg-zinc-950">
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1 ml-3">
            Competition Prep
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          <View className="bg-gradient-to-r from-red-500 to-purple-500 rounded-xl p-6 mb-6">
            <Text className="text-white text-2xl font-bold mb-2">Compete</Text>
            <Text className="text-white opacity-90">
              Prepare for competition day
            </Text>
          </View>

          <View className="mb-6">
            <View className="flex-row gap-2">
              {competitions.map((comp) => (
                <TouchableOpacity
                  key={comp}
                  onPress={() => setSelectedComp(comp)}
                  className={`flex-1 ${
                    selectedComp === comp ? 'bg-red-500' : 'bg-zinc-800'
                  } rounded-xl px-3 py-3 border ${
                    selectedComp === comp ? 'border-red-400' : 'border-zinc-700'
                  }`}
                >
                  <Text className="text-white font-bold text-center capitalize text-sm">
                    {comp}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View className={`bg-${currentPrep.color}-500/10 rounded-xl p-5 mb-6 border border-${currentPrep.color}-500/30`}>
            <View className="flex-row items-center mb-3">
              <Ionicons name={currentPrep.icon} size={28} color={`#${currentPrep.color === 'red' ? 'ef4444' : currentPrep.color === 'purple' ? 'a855f7' : '3b82f6'}`} />
              <Text className={`text-${currentPrep.color}-400 font-bold text-xl ml-3`}>
                {currentPrep.name}
              </Text>
            </View>
            <View className="bg-zinc-900 rounded-xl p-3">
              <Text className="text-zinc-400 text-sm">Prep Duration</Text>
              <Text className="text-white font-bold">{currentPrep.timeline}</Text>
            </View>
          </View>

          <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
            <Text className="text-white font-bold text-lg mb-4">Training Phases</Text>
            {currentPrep.phases.map((phase, idx) => (
              <View key={idx} className={`bg-${currentPrep.color}-500/10 rounded-xl p-4 mb-4 last:mb-0 border border-${currentPrep.color}-500/30`}>
                <View className="flex-row items-center mb-2">
                  <View className={`w-8 h-8 rounded-full bg-${currentPrep.color}-500 items-center justify-center`}>
                    <Text className="text-white font-bold">{idx + 1}</Text>
                  </View>
                  <View className="ml-3 flex-1">
                    <Text className={`text-${currentPrep.color}-400 font-bold text-lg`}>
                      {phase.phase}
                    </Text>
                    <Text className="text-zinc-400 text-sm">Focus: {phase.focus}</Text>
                  </View>
                </View>

                <View className="bg-zinc-900 rounded-xl p-3 mt-2">
                  <Text className="text-white font-bold mb-2">Training</Text>
                  {phase.training.map((item, tidx) => (
                    <View key={tidx} className="flex-row items-start mb-1 last:mb-0">
                      <Text className={`text-${currentPrep.color}-400 mr-2`}>â€¢</Text>
                      <Text className="text-zinc-300 text-sm flex-1">{item}</Text>
                    </View>
                  ))}
                </View>

                {'nutrition' in phase && (
                  <View className="bg-primary/10 rounded-xl p-3 mt-2 border border-primary/30">
                    <Text className="text-primary font-bold text-sm mb-1">Nutrition</Text>
                    <Text className="text-primary/80 text-sm">{phase.nutrition}</Text>
                  </View>
                )}

                {'example' in phase && (
                  <View className="bg-primary/10 rounded-xl p-3 mt-2 border border-primary/30">
                    <Text className="text-primary/80 text-sm">{phase.example}</Text>
                  </View>
                )}
              </View>
            ))}
          </View>

          <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
            <Text className="text-white font-bold text-lg mb-3">
              {selectedComp === 'powerlifting' ? 'Meet Day' : selectedComp === 'bodybuilding' ? 'Show Day' : 'Competition Day'} Checklist
            </Text>
            {(selectedComp === 'powerlifting' ? currentPrep.meetDay : selectedComp === 'bodybuilding' ? currentPrep.showDay : currentPrep.compDay).map((item, idx) => (
              <View key={idx} className="flex-row items-start mb-2 last:mb-0">
                <Ionicons name="checkmark-circle" size={18} color="#9D12DE" />
                <Text className="text-zinc-300 ml-2 flex-1">{item}</Text>
              </View>
            ))}
          </View>

          <View className="bg-amber-500/10 rounded-xl p-4 border border-amber-500/30 mb-6">
            <Text className="text-amber-400 font-bold mb-2">General Prep Tips</Text>
            <Text className="text-amber-300 text-sm mb-2">
              â€¢ Practice competition conditions in training
            </Text>
            <Text className="text-amber-300 text-sm mb-2">
              â€¢ Don't try anything new in final 2 weeks
            </Text>
            <Text className="text-amber-300 text-sm mb-2">
              â€¢ Taper is crucial - trust the process
            </Text>
            <Text className="text-amber-300 text-sm mb-2">
              â€¢ Sleep and stress management = performance
            </Text>
            <Text className="text-amber-300 text-sm">
              â€¢ Compete for experience first, results second
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}


