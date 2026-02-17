import React, { useState } from 'react';
import { Text } from '@/components/ui/Text';
import { View, TouchableOpacity, ScrollView, TextInput } from 'react-native';;
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function AutoregulationSystems() {
  const [selectedSystem, setSelectedSystem] = useState('overview');
  const [rpeInput, setRpeInput] = useState('');
  const [velocityInput, setVelocityInput] = useState('');

  const autoregData = {
    overview: {
      name: 'Overview',
      icon: 'analytics',
      color: 'blue',
      what_is: {
        title: 'What is Autoregulation?',
        definition: 'Adjusting training based on daily readiness/performance',
        why: 'You\'re not the same every day - training should adapt',
        methods: ['RPE (Rate of Perceived Exertion)', 'RIR (Reps in Reserve)', 'VBT (Velocity-Based Training)', 'APRE (Autoregulatory Progressive Resistance)'],
      },
      benefits: [
        'Optimize training on good days',
        'Reduce injury risk on bad days',
        'Better long-term progress (sustainable)',
        'Learn your body and limits',
        'More flexible than rigid percentages',
      ],
      when_to_use: [
        'Intermediate+ lifter (1+ years)',
        'Variable stress/sleep/recovery',
        'Competing (peaking phase)',
        'Working around minor injuries',
        'Self-coached athletes',
      ],
    },
    rpe: {
      name: 'RPE Training',
      icon: 'speedometer',
      color: 'primary',
      scale: {
        title: 'RPE Scale (1-10)',
        ratings: [
          {
            rpe: '10',
            description: 'Max effort - nothing left',
            reps_left: '0 - couldn\'t do one more rep',
            feel: 'Absolutely gassed',
          },
          {
            rpe: '9.5',
            description: 'Could maybe grind one more',
            reps_left: '0.5 - not confident in another rep',
            feel: 'Very hard, near limit',
          },
          {
            rpe: '9',
            description: 'Could definitely do 1 more',
            reps_left: '1 rep left in tank',
            feel: 'Hard but controlled',
          },
          {
            rpe: '8.5',
            description: '1-2 more reps possible',
            reps_left: '1-2 reps left',
            feel: 'Challenging set',
          },
          {
            rpe: '8',
            description: 'Could do 2 more clean reps',
            reps_left: '2 reps left',
            feel: 'Solid working set',
          },
          {
            rpe: '7.5',
            description: '2-3 reps left',
            reps_left: '2-3 reps in reserve',
            feel: 'Moderate difficulty',
          },
          {
            rpe: '7',
            description: 'Could do 3 more reps',
            reps_left: '3 reps left',
            feel: 'Somewhat hard',
          },
          {
            rpe: '6-6.5',
            description: 'Light-moderate work',
            reps_left: '4+ reps left',
            feel: 'Warm-up/technique sets',
          },
        ],
      },
      how_to_use: {
        title: 'How to Use RPE',
        method: [
          'Decide target RPE for the day (e.g., "4 sets of 5 @ RPE 8")',
          'Work up to a weight that feels like RPE 8 for 5 reps',
          'Do your working sets at that weight',
          'If RPE rises (set 1 was RPE 8, set 3 is RPE 9), reduce weight',
          'If RPE stays low (all sets RPE 7), can increase weight',
        ],
      },
      sample_programs: {
        title: 'RPE Programming Examples',
        templates: [
          {
            name: 'RPE Progressive',
            week_1: '4x5 @ RPE 7',
            week_2: '4x5 @ RPE 7.5',
            week_3: '4x5 @ RPE 8',
            week_4: '4x5 @ RPE 8.5',
            note: 'Weight auto-adjusts to hit RPE',
          },
          {
            name: 'Top Set + Backoffs',
            main: '1x5 @ RPE 9 (top set)',
            backoffs: '3x5 @ -5% (should be RPE 7-8)',
            note: 'Find daily max, drop down',
          },
          {
            name: 'RPE Taper',
            sets: 'Set 1: RPE 8, Set 2: RPE 8.5, Set 3: RPE 9',
            weight: 'Same weight, RPE rises = fatigue',
            note: 'Monitoring fatigue accumulation',
          },
        ],
      },
      tips: {
        title: 'RPE Tips',
        advice: [
          'Takes 4-6 weeks to calibrate - be patient',
          'Film sets - check if RPE 8 looks like RPE 8',
          'Conservative at first - most underestimate difficulty',
          'Track weight AND RPE - see if weights improving at same RPE',
          'RPE 10 should be rare - save for testing',
        ],
      },
    },
    rir: {
      name: 'RIR (Reps in Reserve)',
      icon: 'battery-half',
      color: 'purple',
      scale: {
        title: 'RIR Scale',
        equivalence: 'RIR = 10 - RPE (basically same thing)',
        examples: [
          {
            rir: '0',
            rpe: 'RPE 10',
            meaning: 'Max effort, nothing left',
          },
          {
            rir: '1',
            rpe: 'RPE 9',
            meaning: '1 rep left in tank',
          },
          {
            rir: '2',
            rpe: 'RPE 8',
            meaning: '2 reps left',
          },
          {
            rir: '3',
            rpe: 'RPE 7',
            meaning: '3 reps left',
          },
          {
            rir: '4+',
            rpe: 'RPE 6 or less',
            meaning: 'Easy/warm-up work',
          },
        ],
      },
      why_use: {
        title: 'RIR vs RPE - What\'s the Difference?',
        differences: [
          'RIR: Count reps left ("2 more reps")',
          'RPE: Rate overall effort (1-10 scale)',
          'Same concept, different framing',
          'Some find RIR more intuitive',
          'Use whichever makes more sense to you',
        ],
      },
      programming: {
        title: 'RIR Programming',
        approach: 'Works exactly like RPE, just inverted',
        examples: [
          {
            template: 'Leave 2 in Reserve',
            notation: '4x6 @ 2 RIR',
            meaning: 'Sets of 6 where you could do 8 reps',
          },
          {
            template: 'Leave 1 in Reserve',
            notation: '3x5 @ 1 RIR',
            meaning: 'Sets of 5 where you could do 6',
          },
          {
            template: 'Max Effort',
            notation: '1x3 @ 0 RIR',
            meaning: 'Max set of 3, nothing left',
          },
        ],
      },
    },
    vbt: {
      name: 'Velocity-Based Training',
      icon: 'flash',
      color: 'amber',
      concept: {
        title: 'What is VBT?',
        definition: 'Using bar speed to determine load and effort',
        how: 'Measure bar velocity with device (GymAware, Tendo, Push Band)',
        principle: 'As you fatigue, bar speed slows down',
      },
      velocity_zones: {
        title: 'Velocity Zones',
        zones: [
          {
            zone: 'Absolute Strength',
            velocity: '< 0.5 m/s',
            intensity: '90-100% 1RM',
            reps: '1-3 reps',
            use: 'Max strength, peaking',
          },
          {
            zone: 'Accelerative Strength',
            velocity: '0.5-0.75 m/s',
            intensity: '80-90% 1RM',
            reps: '3-5 reps',
            use: 'Strength building',
          },
          {
            zone: 'Strength-Speed',
            velocity: '0.75-1.0 m/s',
            intensity: '70-80% 1RM',
            reps: '3-6 reps',
            use: 'Strength with speed emphasis',
          },
          {
            zone: 'Speed-Strength',
            velocity: '1.0-1.3 m/s',
            intensity: '50-70% 1RM',
            reps: '2-5 reps',
            use: 'Power development, speed work',
          },
        ],
      },
      how_to_use: {
        title: 'How to Use VBT',
        methods: [
          {
            method: 'Velocity Cutoff',
            how: 'Stop set when bar speed drops X%',
            example: '20% velocity loss = end set',
            why: 'Prevents junk volume when fatigued',
          },
          {
            method: 'Target Velocity',
            how: 'Work up to target velocity zone',
            example: 'Today: work up to 0.6 m/s for triples',
            why: 'Auto-adjusts load to daily readiness',
          },
          {
            method: 'Load-Velocity Profile',
            how: 'Build your personal % to velocity chart',
            example: 'Your 80% = 0.72 m/s for squat',
            why: 'Precise load selection',
          },
        ],
      },
      practical: {
        title: 'VBT in Practice',
        without_device: [
          'Can estimate with video (count frames)',
          'Or just track "fast" vs "slow" reps',
          'Basic version: stop when speed noticeably slows',
        ],
        with_device: [
          'Set velocity target (e.g., 0.7 m/s)',
          'Work up: add weight until you hit target velocity',
          'Working sets: maintain that velocity',
          'If velocity drops >20%, end set or reduce weight',
        ],
      },
      pros_cons: {
        title: 'VBT Pros & Cons',
        pros: [
          'Objective - not subjective like RPE',
          'Auto-regulates to daily readiness',
          'Great for speed/power work',
          'Prevents grinding junk reps',
        ],
        cons: [
          'Equipment cost ($200-800+)',
          'Setup time',
          'Lift-specific (squat velocity ≠ bench velocity)',
          'Learning curve to interpret data',
        ],
      },
    },
    apre: {
      name: 'APRE Protocol',
      icon: 'trending-up',
      color: 'red',
      concept: {
        title: 'APRE (Autoregulatory Progressive Resistance Exercise)',
        what: 'Structured autoregulation with set/rep adjustments',
        history: 'Developed for rehab, adapted for strength training',
      },
      apre_6_protocol: {
        title: 'APRE-6 (6 Rep Max Protocol)',
        sets: [
          {
            set: 'Set 1',
            load: '50% estimated 6RM',
            reps: '10 reps',
            purpose: 'Warm-up',
          },
          {
            set: 'Set 2',
            load: '75% estimated 6RM',
            reps: '6 reps',
            purpose: 'Warm-up',
          },
          {
            set: 'Set 3',
            load: '100% estimated 6RM',
            reps: 'Max reps (AMRAP)',
            purpose: 'Assessment set',
          },
          {
            set: 'Set 4',
            load: 'Adjusted based on Set 3',
            reps: 'Max reps',
            purpose: 'Working set',
          },
        ],
        adjustments: [
          {
            set_3_reps: '0-2 reps',
            set_4_adjustment: 'Decrease 5-10 lbs',
            next_session: 'Decrease 5-10 lbs',
          },
          {
            set_3_reps: '3-4 reps',
            set_4_adjustment: 'Decrease 0-5 lbs',
            next_session: 'Keep same weight',
          },
          {
            set_3_reps: '5-7 reps',
            set_4_adjustment: 'Keep same weight',
            next_session: 'Increase 5-10 lbs',
          },
          {
            set_3_reps: '8-12 reps',
            set_4_adjustment: 'Increase 5-10 lbs',
            next_session: 'Increase 5-15 lbs',
          },
          {
            set_3_reps: '13+ reps',
            set_4_adjustment: 'Increase 10-15 lbs',
            next_session: 'Increase 10-20 lbs',
          },
        ],
      },
      apre_3_protocol: {
        title: 'APRE-3 (3 Rep Max Protocol)',
        note: 'Same structure but based on 3RM instead of 6RM',
        when: 'For heavier/strength work',
      },
      benefits: {
        title: 'APRE Benefits',
        advantages: [
          'Structured but auto-regulated',
          'Built-in progression rules',
          'Good for intermediate lifters',
          'Works well for accessories',
        ],
      },
    },
    implementation: {
      name: 'Implementation Guide',
      icon: 'construct',
      color: 'cyan',
      beginner_path: {
        title: 'Start with RPE/RIR',
        why: 'Simplest to implement, no equipment',
        how: [
          'Weeks 1-4: Track RPE after sets (practice rating)',
          'Weeks 5-8: Program with RPE ranges (@RPE 7-8)',
          'Weeks 9-12: Hit specific RPE targets (@RPE 8)',
          'After 12 weeks: Should be calibrated',
        ],
      },
      intermediate_options: {
        title: 'Add More Systems',
        progression: [
          'Start: RPE/RIR (12+ weeks to calibrate)',
          'Then: Add APRE for accessories',
          'Advanced: Consider VBT if budget allows',
        ],
      },
      sample_week: {
        title: 'Sample Week with Autoregulation',
        monday: {
          day: 'Monday - Squat',
          main: 'Squat: Work up to 1x5 @ RPE 9 (top set)',
          backoffs: 'Then 3x5 @ -5-10% (RPE 7-8)',
          accessories: 'Leg Press: APRE-6 protocol',
        },
        wednesday: {
          day: 'Wednesday - Bench',
          main: 'Bench: 4x4 @ 2 RIR',
          secondary: 'Close Grip: 3x6 @ RPE 7',
          accessories: 'DB Rows: APRE-6',
        },
        friday: {
          day: 'Friday - Deadlift',
          main: 'Deadlift: Work up to heavy triple @ RPE 9',
          backoffs: '2x3 @ -10% (RPE 7)',
          accessories: 'RDL: 3x8 @ RPE 8',
        },
      },
      troubleshooting: {
        title: 'Common Autoregulation Issues',
        problems: [
          {
            issue: 'Every set is "RPE 8"',
            cause: 'Not calibrated yet, being too conservative',
            fix: 'Film sets, push harder some days, take 4-6 weeks',
          },
          {
            issue: 'Weights all over the place',
            cause: 'Poor sleep, stress, inconsistent rating',
            fix: 'That\'s kind of the point - but track trends over weeks',
          },
          {
            issue: 'Always RPE 10',
            cause: 'Going too hard, not leaving buffer',
            fix: 'Practice RPE 7-8 work, save RPE 10 for testing',
          },
          {
            issue: 'Not progressing',
            cause: 'Being too conservative, not pushing',
            fix: 'Ensure some sessions at RPE 8.5-9, challenge yourself',
          },
        ],
      },
    },
  };

  const currentSystem = autoregData[selectedSystem as keyof typeof autoregData];

  const getColorClass = (color: string) => {
    const colors: { [key: string]: string } = {
      blue: 'bg-primary',
      primary: 'bg-primary',
      purple: 'bg-purple-500',
      amber: 'bg-amber-500',
      red: 'bg-red-500',
      cyan: 'bg-cyan-500',
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
            Autoregulation Systems
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          <View className="bg-gradient-to-r from-primary to-cyan-500 rounded-xl p-6 mb-6">
            <Text className="text-white text-2xl font-bold mb-2">Autoregulation</Text>
            <Text className="text-white opacity-90">
              RPE, RIR, VBT, APRE & Daily Adaptation
            </Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6">
            <View className="flex-row gap-3 px-1">
              {Object.entries(autoregData).map(([key, system]) => (
                <TouchableOpacity
                  key={key}
                  onPress={() => setSelectedSystem(key)}
                  className={`${
                    selectedSystem === key 
                      ? getColorClass(system.color)
                      : 'bg-zinc-900'
                  } rounded-xl p-4 border ${
                    selectedSystem === key 
                      ? 'border-white/30'
                      : 'border-zinc-800'
                  } min-w-[160px]`}
                >
                  <Ionicons 
                    name={system.icon as any} 
                    size={32} 
                    color={selectedSystem === key ? 'white' : '#a1a1aa'} 
                  />
                  <Text className={`${selectedSystem === key ? 'text-white' : 'text-zinc-400'} font-bold mt-2 text-sm`}>
                    {system.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          {/* Interactive RPE Calculator */}
          {selectedSystem === 'rpe' && (
            <View className="bg-primary/10 rounded-xl p-5 border border-primary/30 mb-6">
              <Text className="text-primary font-bold text-lg mb-3">RPE Calculator</Text>
              <Text className="text-primary/80 text-sm mb-3">
                How many reps did you have left?
              </Text>
              <TextInput
                value={rpeInput}
                onChangeText={setRpeInput}
                placeholder="e.g., 2 reps"
                placeholderTextColor="#6b7280"
                keyboardType="numeric"
                className="bg-zinc-900 border border-primary/50 rounded-lg px-4 py-3 text-white mb-3"
              />
              {rpeInput && !isNaN(Number(rpeInput)) && (
                <View className="bg-primary/20 rounded-lg p-4">
                  <Text className="text-primary/80 font-bold">
                    RPE: {10 - Number(rpeInput)} (RIR: {rpeInput})
                  </Text>
                </View>
              )}
            </View>
          )}

          {/* Content placeholder */}
          <View className="bg-primary/10 rounded-xl p-6 border border-primary/30 mb-6">
            <Ionicons name={currentSystem.icon as any} size={32} color="#9D12DE" />
            <Text className="text-primary/80 font-bold text-lg mt-3 mb-2">
              {currentSystem.name}
            </Text>
            <Text className="text-primary/60 text-sm">
              Detailed content for {currentSystem.name}...
            </Text>
          </View>

          <View className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-xl p-5 border border-amber-500/30 mb-6">
            <Text className="text-amber-400 font-bold text-lg mb-3">Quick Reference</Text>
            <Text className="text-amber-300 text-sm mb-2">
              • RPE 10 = Max effort, nothing left
            </Text>
            <Text className="text-amber-300 text-sm mb-2">
              • RPE 9 = 1 rep left in tank
            </Text>
            <Text className="text-amber-300 text-sm mb-2">
              • RPE 8 = 2 reps left (most working sets)
            </Text>
            <Text className="text-amber-300 text-sm mb-2">
              • RIR = 10 minus RPE (same thing, different framing)
            </Text>
            <Text className="text-amber-300 text-sm mb-2">
              • VBT = Bar speed determines load
            </Text>
            <Text className="text-amber-300 text-sm">
              • Takes 4-6 weeks to calibrate RPE/RIR - be patient
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}


