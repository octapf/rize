import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function ProgrammingIntegration() {
  const [selectedAspect, setSelectedAspect] = useState('overview');

  const integrationData = {
    overview: {
      name: 'Overview',
      icon: 'layers',
      color: 'blue',
      concept: {
        title: 'Complete Programming Integration',
        definition: 'Bringing all training principles together into coherent system',
        components: [
          'Exercise selection',
          'Volume programming',
          'Intensity progression',
          'Periodization model',
          'Recovery management',
          'Individual customization',
        ],
      },
      levels: {
        title: 'Integration by Experience Level',
        beginner: {
          level: 'Beginner (0-1 year)',
          complexity: 'SIMPLE - keep it minimal',
          focus: 'Learn lifts, build base, add weight regularly',
        },
        intermediate: {
          level: 'Intermediate (1-3 years)',
          complexity: 'MODERATE - add structure',
          focus: 'Real periodization, weak points, volume progression',
        },
        advanced: {
          level: 'Advanced (3-7 years)',
          complexity: 'COMPLEX - all systems integrated',
          focus: 'Precise programming, lifestyle integration, fine-tuning',
        },
        elite: {
          level: 'Elite (7+ years)',
          complexity: 'MASTERY - intuitive integration',
          focus: 'Peak performance, longevity, sustainability',
        },
      },
    },
    exercise_selection: {
      name: 'Exercise Selection',
      icon: 'barbell',
      color: 'emerald',
      hierarchy: {
        title: 'Exercise Hierarchy for Powerlifting',
        tier_1: {
          name: 'Tier 1: Competition Lifts',
          exercises: ['Back Squat', 'Bench Press', 'Deadlift (Conv or Sumo)'],
          volume: '70-80% of total volume',
          priority: 'HIGHEST - must progress these',
        },
        tier_2: {
          name: 'Tier 2: Close Variations',
          exercises: [
            'Pause Squat',
            'Competition Grip Bench',
            'Close Grip Bench',
            'Deficit Deadlift',
            'Pause Deadlift',
          ],
          volume: '15-20% of volume',
          purpose: 'Address weak points, build specific strength',
        },
        tier_3: {
          name: 'Tier 3: Assistance Exercises',
          exercises: [
            'Front Squat',
            'RDL',
            'Rows',
            'Leg Press',
            'Good Mornings',
            'Lunges',
          ],
          volume: '10-15% of volume',
          purpose: 'Build muscle, address imbalances',
        },
      },
      selection_process: {
        title: 'How to Select Exercises',
        steps: [
          {
            step: '1. Identify Weak Points',
            method: 'Where do you miss lifts? Video analysis.',
            example: 'Miss deadlifts off floor → deficit deadlifts',
          },
          {
            step: '2. Choose Specific Variations',
            method: 'Pick variations that target that weakness',
            example: 'Lockout weak on bench → board press, close grip',
          },
          {
            step: '3. Limit Total Exercises',
            method: '3-5 exercises per session MAX',
            why: 'Quality > quantity, recovery matters',
          },
          {
            step: '4. Stick With It',
            method: 'Keep exercise for 6-12 weeks minimum',
            why: 'Need time to see if it\'s working',
          },
        ],
      },
    },
    volume: {
      name: 'Volume Programming',
      icon: 'stats-chart',
      color: 'purple',
      guidelines: {
        title: 'Volume Guidelines by Lift',
        squat: {
          lift: 'Squat',
          beginner: '10-15 sets per week',
          intermediate: '15-20 sets per week',
          advanced: '18-25 sets per week',
          note: 'Includes comp squat + variations',
        },
        bench: {
          lift: 'Bench Press',
          beginner: '12-18 sets per week',
          intermediate: '18-25 sets per week',
          advanced: '25-35 sets per week',
          note: 'Responds well to high frequency/volume',
        },
        deadlift: {
          lift: 'Deadlift',
          beginner: '8-12 sets per week',
          intermediate: '10-15 sets per week',
          advanced: '12-18 sets per week',
          note: 'Lower volume due to high fatigue',
        },
      },
      progression: {
        title: 'Volume Progression Over Time',
        approach: 'Gradually increase over months/years',
        example: [
          {
            phase: 'Year 1',
            squat: '12 sets/week',
            bench: '15 sets/week',
            deadlift: '10 sets/week',
          },
          {
            phase: 'Year 3',
            squat: '18 sets/week',
            bench: '22 sets/week',
            deadlift: '14 sets/week',
          },
          {
            phase: 'Year 5+',
            squat: '22 sets/week',
            bench: '30 sets/week',
            deadlift: '16 sets/week',
          },
        ],
      },
      distribution: {
        title: 'Distributing Volume Across Week',
        principles: [
          'Spread volume across 2-4 sessions per lift',
          'High frequency (3-4x/week) better for bench',
          'Moderate frequency (2-3x/week) good for squat',
          'Lower frequency (1-2x/week) often sufficient for deadlift',
        ],
      },
    },
    intensity: {
      name: 'Intensity Management',
      icon: 'flame',
      color: 'amber',
      zones: {
        title: 'Intensity Zones',
        light: {
          zone: 'Light (50-70%)',
          purpose: 'Technique, speed work, recovery',
          reps: '5-10 reps',
          frequency: '20-30% of volume',
        },
        moderate: {
          zone: 'Moderate (70-85%)',
          purpose: 'Hypertrophy, strength endurance',
          reps: '3-6 reps',
          frequency: '50-60% of volume',
        },
        heavy: {
          zone: 'Heavy (85-95%)',
          purpose: 'Max strength',
          reps: '1-3 reps',
          frequency: '15-25% of volume',
        },
        max: {
          zone: 'Max (95%+)',
          purpose: 'Testing, peaking',
          reps: '1 rep',
          frequency: '2-4x per year (testing days)',
        },
      },
      progression_models: {
        title: 'Intensity Progression Models',
        linear: {
          model: 'Linear Progression',
          how: 'Add weight every session/week',
          best_for: 'Beginners',
          example: 'Squat: 225x5 → 230x5 → 235x5',
        },
        wave: {
          model: 'Wave Loading',
          how: 'Cycle intensity within week',
          best_for: 'Intermediate',
          example: 'Wave 1: 80%, 85%, 90% → Wave 2: 82%, 87%, 92%',
        },
        block: {
          model: 'Block Periodization',
          how: 'Blocks of different intensities',
          best_for: 'Advanced',
          example: '4 weeks @ 75%, 3 weeks @ 85%, 2 weeks @ 90%',
        },
      },
    },
    periodization: {
      name: 'Periodization Models',
      icon: 'calendar-outline',
      color: 'red',
      models: {
        title: 'Main Periodization Models',
        linear: {
          name: 'Linear Periodization',
          structure: 'Progress from high volume/low intensity → low volume/high intensity',
          timeline: '12-16 weeks',
          best_for: 'Beginners to intermediate',
          example: 'Weeks 1-4: 4x8 @ 70% → Weeks 9-12: 3x3 @ 85%',
        },
        block: {
          name: 'Block Periodization',
          structure: 'Distinct blocks focusing on one quality',
          blocks: 'Accumulation (volume) → Intensification (strength) → Realization (peak)',
          best_for: 'Intermediate to advanced',
          timeline: '4-6 weeks per block',
        },
        dup: {
          name: 'Daily Undulating (DUP)',
          structure: 'Vary intensity/volume each session',
          example: 'Mon: Heavy (3x3 @ 85%), Wed: Light (4x8 @ 70%), Fri: Power (8x2 @ 75%)',
          best_for: 'All levels, especially bench',
        },
        conjugate: {
          name: 'Conjugate Method',
          structure: 'Max effort + Dynamic effort days, rotating variations',
          example: 'ME: 1RM on variation, DE: Speed work with bands/chains',
          best_for: 'Advanced to elite',
        },
      },
      choosing: {
        title: 'How to Choose Periodization Model',
        factors: [
          {
            factor: 'Experience',
            guidance: 'Beginner: Linear, Intermediate: Block/DUP, Advanced: Any',
          },
          {
            factor: 'Goals',
            guidance: 'Meet prep: Block, General strength: DUP/Linear',
          },
          {
            factor: 'Schedule',
            guidance: 'Fixed meet date: Block, Flexible: DUP',
          },
          {
            factor: 'Weak Points',
            guidance: 'Many weak points: Conjugate, Few: Block',
          },
        ],
      },
    },
    recovery: {
      name: 'Recovery Integration',
      icon: 'fitness',
      color: 'cyan',
      deload_strategy: {
        title: 'Strategic Deloading',
        frequency: 'Every 3-5 weeks depending on intensity',
        methods: [
          {
            method: 'Reduced Volume',
            how: 'Cut sets in half',
            example: '4x5 @ 80% → 2x5 @ 80%',
            when: 'Most common approach',
          },
          {
            method: 'Reduced Intensity',
            how: 'Drop weight 20%',
            example: '4x5 @ 80% → 4x5 @ 60%',
            when: 'If joints need break',
          },
          {
            method: 'Reduced Frequency',
            how: 'Train 2x week instead of 4x',
            example: 'Only Monday and Thursday',
            when: 'Life stress high',
          },
        ],
      },
      autoregulation: {
        title: 'Autoregulation Methods',
        rpe: {
          method: 'RPE (Rate of Perceived Exertion)',
          use: 'Adjust daily based on readiness',
          example: '4x5 @ RPE 8 - weight adjusts to hit RPE',
        },
        rir: {
          method: 'RIR (Reps in Reserve)',
          use: 'Same as RPE, different framing',
          example: '3x5 @ 2 RIR (could do 2 more reps)',
        },
        vbt: {
          method: 'Velocity-Based Training',
          use: 'Use bar speed to determine load',
          example: 'Work up to 0.7 m/s for triples',
        },
      },
      lifestyle: {
        title: 'Lifestyle Factors',
        priorities: [
          '1. Sleep: 7-9 hours minimum',
          '2. Nutrition: At maintenance or surplus, high protein',
          '3. Stress: Manage where possible, reduce training if high',
          '4. Hydration: 0.5-1 oz per lb bodyweight',
          '5. Movement: Light activity on off days',
        ],
      },
    },
    customization: {
      name: 'Individual Customization',
      icon: 'person',
      color: 'indigo',
      factors: {
        title: 'Factors Requiring Customization',
        personal: [
          {
            factor: 'Recovery Capacity',
            high: 'Young, good sleep, low stress → can handle more volume',
            low: 'Older, poor sleep, high stress → need lower volume',
          },
          {
            factor: 'Training Age',
            novice: 'Recover fast, need less volume',
            advanced: 'Need more volume to progress',
          },
          {
            factor: 'Leverages',
            short_arms: 'Bench responds well, deadlift harder',
            long_arms: 'Deadlift responds well, bench harder',
          },
          {
            factor: 'Weak Points',
            specific: 'Program needs to address YOUR weak points',
          },
        ],
      },
      adjustments: {
        title: 'Making Program Adjustments',
        when: [
          'Consistently exceeding prescribed RPE → reduce volume/intensity',
          'Never hitting prescribed RPE → increase load or reduce volume',
          'Not recovering between sessions → add rest day or deload',
          'Progress stalled 6+ weeks → change stimulus',
        ],
      },
    },
    example: {
      name: 'Complete Program Example',
      icon: 'document-text',
      color: 'rose',
      program: {
        title: '12-Week Complete Program (Intermediate Block Periodization)',
        block_1: {
          name: 'Weeks 1-4: Accumulation',
          goal: 'Build muscle and work capacity',
          monday: {
            day: 'Monday - Squat',
            main: 'Squat: 5x5 @ 75%',
            secondary: 'Pause Squat: 3x5 @ 70%',
            accessories: 'Leg Press: 3x12, Leg Curl: 3x12, Core',
          },
          tuesday: {
            day: 'Tuesday - Bench Volume',
            main: 'Bench: 5x6 @ 72%',
            secondary: 'Close Grip: 4x8 @ 65%',
            accessories: 'DB Row: 4x10, Triceps: 3x12, Delts: 3x15',
          },
          thursday: {
            day: 'Thursday - Deadlift',
            main: 'Deadlift: 4x5 @ 75%',
            secondary: 'RDL: 3x8 @ 65%',
            accessories: 'Pull-ups: 3x8, Back ext: 3x12',
          },
          friday: {
            day: 'Friday - Bench Intensity',
            main: 'Bench: 4x4 @ 80%',
            secondary: 'Incline DB: 3x10',
            accessories: 'Face Pulls: 3x15, Abs: 3x15',
          },
          saturday: {
            day: 'Saturday - Squat Volume',
            main: 'Front Squat: 4x8 @ 70%',
            accessories: 'Lunges: 3x8/leg, Abs',
          },
        },
        block_2: {
          name: 'Weeks 5-8: Intensification',
          adjustments: [
            'Squat: 4x4 @ 82%',
            'Bench: 5x4 @ 80%',
            'Deadlift: 4x3 @ 82%',
            'Reduce accessories 30%',
          ],
        },
        block_3: {
          name: 'Weeks 9-11: Peaking',
          adjustments: [
            'Squat: 3x2 @ 88%',
            'Bench: 4x2 @ 87%',
            'Deadlift: 3x2 @ 88%',
            'Drop variations, comp lifts only',
          ],
        },
        week_12: {
          name: 'Week 12: Deload/Test',
          option_1: 'Deload: 50% volume',
          option_2: 'Test maxes: Work up to new 1RMs',
        },
      },
    },
  };

  const currentAspect = integrationData[selectedAspect as keyof typeof integrationData];

  const getColorClass = (color: string) => {
    const colors: { [key: string]: string } = {
      blue: 'bg-blue-500',
      emerald: 'bg-emerald-500',
      purple: 'bg-purple-500',
      amber: 'bg-amber-500',
      red: 'bg-red-500',
      cyan: 'bg-cyan-500',
      indigo: 'bg-indigo-500',
      rose: 'bg-rose-500',
    };
    return colors[color];
  };

  return (
    <View className="flex-1 bg-zinc-950">
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1 ml-3">
            Programming Integration
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          <View className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl p-6 mb-6">
            <Text className="text-white text-2xl font-bold mb-2">Complete Integration</Text>
            <Text className="text-white opacity-90">
              Bringing all programming principles together
            </Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6">
            <View className="flex-row gap-3 px-1">
              {Object.entries(integrationData).map(([key, aspect]) => (
                <TouchableOpacity
                  key={key}
                  onPress={() => setSelectedAspect(key)}
                  className={`${
                    selectedAspect === key 
                      ? getColorClass(aspect.color)
                      : 'bg-zinc-900'
                  } rounded-xl p-4 border ${
                    selectedAspect === key 
                      ? 'border-white/30'
                      : 'border-zinc-800'
                  } min-w-[180px]`}
                >
                  <Ionicons 
                    name={aspect.icon as any} 
                    size={32} 
                    color={selectedAspect === key ? 'white' : '#a1a1aa'} 
                  />
                  <Text className={`${selectedAspect === key ? 'text-white' : 'text-zinc-400'} font-bold mt-2 text-sm`}>
                    {aspect.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          {/* Content placeholder */}
          <View className="bg-purple-500/10 rounded-xl p-6 border border-purple-500/30 mb-6">
            <Ionicons name={currentAspect.icon as any} size={32} color="#a855f7" />
            <Text className="text-purple-400 font-bold text-lg mt-3 mb-2">
              {currentAspect.name}
            </Text>
            <Text className="text-purple-300 text-sm">
              Detailed content for {currentAspect.name}...
            </Text>
          </View>

          <View className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-xl p-5 border border-amber-500/30 mb-6">
            <Text className="text-amber-400 font-bold text-lg mb-3">Integration Principles</Text>
            <Text className="text-amber-300 text-sm mb-2">
              🎯 Exercise Selection: Tier 1 (comp lifts) → Tier 2 (variations) → Tier 3 (assistance)
            </Text>
            <Text className="text-amber-300 text-sm mb-2">
              🎯 Volume: Progress gradually over months/years
            </Text>
            <Text className="text-amber-300 text-sm mb-2">
              🎯 Intensity: 50-60% moderate, 20-30% heavy, 10-20% light
            </Text>
            <Text className="text-amber-300 text-sm mb-2">
              🎯 Periodization: Choose model based on experience and goals
            </Text>
            <Text className="text-amber-300 text-sm mb-2">
              🎯 Recovery: Deload every 3-5 weeks, use autoregulation
            </Text>
            <Text className="text-amber-300 text-sm">
              🎯 Customization: Adjust to YOUR recovery, weak points, leverages
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
