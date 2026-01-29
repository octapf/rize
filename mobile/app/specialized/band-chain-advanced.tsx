import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function BandChainAdvanced() {
  const [selectedType, setSelectedType] = useState('basics');

  const accomData = {
    basics: {
      name: 'Basics',
      icon: 'information-circle',
      color: 'blue',
      concept: {
        title: 'What is Accommodating Resistance?',
        definition: 'Resistance that changes throughout the range of motion',
        types: [
          {
            type: 'Bands',
            how: 'Elastic - more resistance as you stretch them',
            effect: 'Easier at bottom, hardest at lockout',
          },
          {
            type: 'Chains',
            how: 'Weight lifts off ground as you ascend',
            effect: 'Lighter at bottom, heavier at lockout',
          },
        ],
        why_use: [
          'Matches strength curve (you\'re stronger at lockout)',
          'Overloads lockout without overloading bottom',
          'Teaches speed and acceleration',
          'Prevents deceleration at top',
          'Novel stimulus when plateaued',
        ],
      },
      when_to_use: {
        title: 'When to Add Bands/Chains',
        good_timing: [
          'Intermediate/Advanced lifter (1-2+ years)',
          'Lockout is weak point',
          'Need speed development',
          'Plateau from regular training',
          'Have access to bands/chains (duh)',
        ],
        bad_timing: [
          'Beginner (0-12 months) - learn basics first',
          'Bottom position weak - needs opposite work',
          'Technique still inconsistent',
          'Don\'t have proper equipment',
        ],
      },
    },
    bands: {
      name: 'Band Training',
      icon: 'resize',
      color: 'emerald',
      band_types: {
        title: 'Band Selection',
        options: [
          {
            size: 'Mini Bands (0.5" width)',
            tension: '10-30 lbs at top',
            use: 'Bench press, speed work',
          },
          {
            size: 'Light Bands (1" width)',
            tension: '30-60 lbs at top',
            use: 'Bench, squat - moderate resistance',
          },
          {
            size: 'Average Bands (1.75" width)',
            tension: '60-100 lbs at top',
            use: 'Squat, deadlift - good all-around',
          },
          {
            size: 'Strong Bands (2.5" width)',
            tension: '100-150 lbs at top',
            use: 'Heavy squats, advanced lifters',
          },
          {
            size: 'Monster Bands (3"+ width)',
            tension: '150-200+ lbs at top',
            use: 'Elite lifters, max accommodating resistance',
          },
        ],
        note: 'Tension varies by stretch - these are typical at lockout',
      },
      setup: {
        title: 'How to Set Up Bands',
        squat: [
          'Loop bands over bar outside sleeves',
          'Anchor to bottom of rack or heavy dumbbells',
          'Bands should be taut at bottom of squat',
          'Measure tension: Weigh bar at top and bottom',
        ],
        bench: [
          'Loop bands over bar near plates',
          'Anchor under bench legs or to rack',
          'Taut at chest, significantly tighter at lockout',
          'Keep bands clear of face/body',
        ],
        deadlift: [
          'Loop bands over bar near plates',
          'Stand on bands or anchor to platform/heavy DBs',
          'Slight tension at floor, max at lockout',
          'Make sure symmetric - equal both sides',
        ],
      },
      programming: {
        title: 'Programming Band Work',
        approaches: [
          {
            method: 'Straight Weight + Bands',
            example: '365 lbs + mini bands (≈40 lbs at top) = 405 lbs at lockout',
            sets_reps: '3-5 sets of 1-3 reps',
            intensity: '60-75% straight weight + bands',
            when: 'Building lockout strength',
          },
          {
            method: 'Speed Work',
            example: '225 lbs + light bands for explosive reps',
            sets_reps: '8-10 sets of 2-3 reps',
            intensity: '50-60% + bands, focus on SPEED',
            when: 'Dynamic effort days (Westside-style)',
          },
          {
            method: 'Wave Loading with Bands',
            example: 'Wave 1: 315+bands, 335+bands, 365+bands',
            sets_reps: '2-3 waves, singles or doubles',
            intensity: '70-85% + bands',
            when: 'Peaking phase, teaching acceleration',
          },
        ],
      },
      benefits: {
        title: 'Benefits of Band Training',
        advantages: [
          'Accommodates strength curve - hardest where you\'re strongest',
          'Teaches acceleration - can\'t slow down at top',
          'Lockout overload without overloading bottom',
          'Eccentric overload - bands pull you down faster',
          'Deloads bottom position - good if sore joints',
        ],
      },
      cautions: {
        title: 'Band Training Cautions',
        warnings: [
          'Very fatiguing - start conservative',
          'Eccentric overload = more soreness initially',
          'Easy to overestimate intensity (it\'s hard!)',
          'Don\'t do with bad technique - amplifies errors',
          'Not for every session - use sparingly (1-2x/week)',
        ],
      },
    },
    chains: {
      name: 'Chain Training',
      icon: 'link',
      color: 'purple',
      chain_types: {
        title: 'Chain Selection',
        options: [
          {
            type: '5/8" chains',
            weight: '20-25 lbs per pair',
            use: 'Bench press, lighter work',
          },
          {
            type: '3/4" chains',
            weight: '30-35 lbs per pair',
            use: 'Bench, light squats',
          },
          {
            type: '5/8" + loading chain',
            weight: '40-60 lbs total per side',
            use: 'Squat, deadlift - most common',
          },
          {
            type: 'Double chains (5/8" x2)',
            weight: '80-120 lbs total',
            use: 'Heavy squat/deadlift, advanced',
          },
        ],
        note: 'Use loading chains to hang main chains - allows more weight',
      },
      setup: {
        title: 'Chain Setup',
        method: [
          'Hang loading chain over bar (5 lbs)',
          'Attach main chain to loading chain with clip',
          'At bottom: Most of chain should be on ground',
          'At top: Most/all of chain should be off ground',
          'Symmetric setup crucial - equal both sides',
        ],
        tips: [
          'Mark bar so chains are same distance from center',
          'Use same link on both sides for symmetry',
          'Test by lifting - should feel balanced',
          'Start conservative - chains are harder than they look',
        ],
      },
      programming: {
        title: 'Programming Chains',
        approaches: [
          {
            method: 'Heavy Chains',
            example: '405 lbs + 60 lbs chains = 465 at top',
            sets_reps: '3-5 sets of 1-3 reps',
            intensity: '70-80% bar weight + chains',
            when: 'Building max strength, lockout focus',
          },
          {
            method: 'Volume with Chains',
            example: '315 lbs + 40 lbs chains for sets of 3-5',
            sets_reps: '4-6 sets of 3-5 reps',
            intensity: '65-75% bar weight + chains',
            when: 'Accumulation phase, muscle building',
          },
          {
            method: 'Dynamic Effort',
            example: '225 lbs + chains, explosive reps',
            sets_reps: '8-10 sets of 2-3 reps',
            intensity: '50-60% + chains, rest 45-60 seconds',
            when: 'Speed development',
          },
        ],
      },
      vs_bands: {
        title: 'Chains vs Bands',
        comparison: [
          {
            aspect: 'Resistance Curve',
            chains: 'Linear increase (predictable)',
            bands: 'Exponential increase (accelerating)',
          },
          {
            aspect: 'Eccentric Load',
            chains: 'Same as concentric',
            bands: 'Greater than concentric (pull down)',
          },
          {
            aspect: 'Setup',
            chains: 'More complex, need loading chains',
            bands: 'Simpler, just anchor and loop',
          },
          {
            aspect: 'Feel',
            chains: 'Smooth, predictable',
            bands: 'Unstable, pulls you down',
          },
          {
            aspect: 'Cost',
            chains: 'Expensive ($200-400 setup)',
            bands: 'Cheap ($50-150 set)',
          },
        ],
      },
    },
    advanced: {
      name: 'Advanced Applications',
      icon: 'rocket',
      color: 'amber',
      combinations: {
        title: 'Combining Bands + Chains',
        why: 'Maximum accommodating resistance, different feel',
        setup: 'Chains + bands together on same bar',
        example: '315 lbs bar + 40 lbs chains + light bands',
        result: 'Extremely hard at lockout, very challenging',
        programming: '2-4 sets of 1-3 reps, 1x per week max',
        caution: 'Very advanced - only for experienced lifters',
      },
      reverse_band: {
        title: 'Reverse Band Training',
        concept: 'Bands ASSIST at bottom, release at top',
        setup: 'Bands looped over top of rack, under bar',
        effect: 'Overload bottom position, assistance reduces as you rise',
        uses: [
          'Bottom position squat development',
          'Bench press bottom strength',
          'Teaching groove with supra-maximal weight',
          'Building confidence with heavy loads',
        ],
        programming: '3-5 sets of 1-3 reps @ 90-110% max',
        example: '500 lb squat + reverse bands = 550 lbs at bottom, 500 at top',
      },
      lightened_method: {
        title: 'Lightened Method (Reverse Band)',
        purpose: 'Handle supra-maximal weight in full ROM',
        benefits: [
          'Neurological adaptation to heavy weight',
          'Confidence building',
          'Overcoming fear of heavy loads',
          'Practicing groove with more weight',
        ],
        example_squat: 'Squat 110% 1RM with bands providing 15-20% assistance',
        example_bench: 'Bench 105% 1RM with mini bands assisting 10-15 lbs',
        frequency: 'Every 2-3 weeks, not every session',
      },
      contrast_training: {
        title: 'Contrast Training',
        concept: 'Alternate heavy with light, bands with straight weight',
        protocols: [
          {
            name: 'Post-Activation Potentiation',
            method: 'Heavy bands → Rest 4-5 min → Straight weight speed work',
            example: '1x3 @ 70% + strong bands → 3x3 @ 60% explosive',
            why: 'Heavy work potentiates nervous system',
          },
          {
            name: 'Wave Contrast',
            method: 'Wave 1 with bands, Wave 2 straight weight',
            example: 'Wave 1: 3-2-1 with bands → Wave 2: 3-2-1 straight weight heavier',
            why: 'Bands feel fast, makes straight weight feel lighter',
          },
          {
            name: 'Daily Undulating',
            method: 'Different days: Bands/Chains/Straight',
            example: 'Mon: Bands, Wed: Chains, Fri: Straight weight',
            why: 'Multiple stimuli, prevents adaptation',
          },
        ],
      },
    },
    practical: {
      name: 'Practical Implementation',
      icon: 'construct',
      color: 'red',
      beginner_program: {
        title: 'First Time Using Accommodating Resistance',
        week_1_4: {
          phase: 'Weeks 1-4: Introduction',
          approach: 'Add bands/chains to ONE lift',
          example: 'Bench: 1x per week with light bands after main work',
          volume: '3 sets of 3 reps @ 60% + light bands',
          note: 'Get used to feel, learn setup',
        },
        week_5_8: {
          phase: 'Weeks 5-8: Expansion',
          approach: 'Add to second lift if going well',
          example: 'Squat: 1x per week with chains',
          volume: '4 sets of 2 reps @ 65% + chains',
          note: 'Still conservative, focus on technique',
        },
        week_9_12: {
          phase: 'Weeks 9-12: Integration',
          approach: 'Regular rotation in program',
          example: '1 lift per week gets bands/chains',
          volume: 'Progress to 5 sets, up to 75% + resistance',
          note: 'Now a regular tool, not experiment',
        },
      },
      sample_week: {
        title: 'Sample Training Week with Accommodating Resistance',
        schedule: [
          {
            day: 'Monday - Squat Focus',
            main: 'Squat: 5x2 @ 70% + average chains',
            secondary: 'Front Squat: 3x5 @ 70%',
            accessories: 'Leg press, Hamstring curls, Core',
          },
          {
            day: 'Tuesday - Bench Focus',
            main: 'Bench: Straight weight 4x5 @ 75%',
            secondary: 'Close Grip: 3x6 @ 70%',
            accessories: 'DB rows, Tricep work, Delts',
          },
          {
            day: 'Thursday - Deadlift',
            main: 'Deadlift: 4x3 @ 75% straight weight',
            secondary: 'RDLs: 3x8 @ 65%',
            accessories: 'Back work, Core',
          },
          {
            day: 'Friday - Speed Bench',
            main: 'Bench: 8x3 @ 55% + mini bands (SPEED)',
            secondary: 'Incline DB Press: 3x8',
            accessories: 'Face pulls, Triceps, Rear delts',
          },
        ],
        note: 'Only 2 sessions with accommodating resistance - not every day',
      },
      troubleshooting: {
        title: 'Common Problems & Solutions',
        issues: [
          {
            problem: 'Bands Feel Too Easy',
            causes: ['Bands too light', 'Not stretched enough', 'Percentages too low'],
            fix: 'Use heavier bands OR increase bar weight',
          },
          {
            problem: 'Bands Feel Impossibly Hard',
            causes: ['Bands too heavy', 'Bar weight too high', 'Not ready for them'],
            fix: 'Drop to lighter bands OR reduce bar weight 10-15%',
          },
          {
            problem: 'Uneven/Unstable Feel',
            causes: ['Bands uneven', 'Poor setup', 'Weak stabilizers'],
            fix: 'Check setup symmetry, use lighter bands initially',
          },
          {
            problem: 'Extreme Soreness',
            causes: ['Eccentric overload from bands', 'Too much volume'],
            fix: 'Reduce volume by 30%, bands cause more soreness',
          },
          {
            problem: 'Not Seeing Carryover',
            causes: ['Wrong weak point (bottom not lockout)', 'Not enough time', 'Poor technique'],
            fix: 'Give it 6-8 weeks, reassess weak point',
          },
        ],
      },
    },
  };

  const currentType = accomData[selectedType as keyof typeof accomData];

  const getColorClass = (color: string) => {
    const colors: { [key: string]: string } = {
      blue: 'bg-blue-500',
      emerald: 'bg-emerald-500',
      purple: 'bg-purple-500',
      amber: 'bg-amber-500',
      red: 'bg-red-500',
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
            Bands & Chains Advanced
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          <View className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-6 mb-6">
            <Text className="text-white text-2xl font-bold mb-2">Accommodating Resistance</Text>
            <Text className="text-white opacity-90">
              Advanced band and chain protocols
            </Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6">
            <View className="flex-row gap-3 px-1">
              {Object.entries(accomData).map(([key, type]) => (
                <TouchableOpacity
                  key={key}
                  onPress={() => setSelectedType(key)}
                  className={`${
                    selectedType === key 
                      ? getColorClass(type.color)
                      : 'bg-zinc-900'
                  } rounded-xl p-4 border ${
                    selectedType === key 
                      ? 'border-white/30'
                      : 'border-zinc-800'
                  } min-w-[180px]`}
                >
                  <Ionicons 
                    name={type.icon as any} 
                    size={32} 
                    color={selectedType === key ? 'white' : '#a1a1aa'} 
                  />
                  <Text className={`${selectedType === key ? 'text-white' : 'text-zinc-400'} font-bold mt-2`}>
                    {type.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          {/* Content placeholder */}
          <View className="bg-blue-500/10 rounded-xl p-6 border border-blue-500/30 mb-6">
            <Ionicons name={currentType.icon as any} size={32} color="#3b82f6" />
            <Text className="text-blue-400 font-bold text-lg mt-3 mb-2">
              {currentType.name}
            </Text>
            <Text className="text-blue-300 text-sm">
              Detailed content for {currentType.name}...
            </Text>
          </View>

          <View className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-xl p-5 border border-amber-500/30 mb-6">
            <Text className="text-amber-400 font-bold text-lg mb-3">Key Points</Text>
            <Text className="text-amber-300 text-sm mb-2">
              • Accommodating resistance = variable resistance through ROM
            </Text>
            <Text className="text-amber-300 text-sm mb-2">
              • Bands: Exponential, eccentric overload, unstable
            </Text>
            <Text className="text-amber-300 text-sm mb-2">
              • Chains: Linear, predictable, smooth feel
            </Text>
            <Text className="text-amber-300 text-sm mb-2">
              • Use for lockout strength and speed development
            </Text>
            <Text className="text-amber-300 text-sm">
              • Start conservative - more fatiguing than straight weight
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
