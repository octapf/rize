import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function PlateauBreaking() {
  const [selectedStrategy, setSelectedStrategy] = useState('identify');

  const plateauData = {
    identify: {
      name: 'Identify the Problem',
      icon: 'search',
      color: 'blue',
      real_vs_perceived: {
        title: 'Is It Really a Plateau?',
        real_plateau: [
          'No PR in 3+ months despite consistent training',
          'Multiple failed attempts at same weight',
          'Volume/frequency appropriate but no progress',
          'Everything else (sleep, nutrition, stress) under control',
        ],
        not_plateau: [
          'Bad week or two (normal fluctuation)',
          'Not training consistently',
          'Poor recovery (lack sleep, high stress)',
          'Undertrained (not enough volume/intensity)',
          'Recent deload or time off',
        ],
      },
      types: {
        title: 'Types of Plateaus',
        categories: [
          {
            type: 'Technical Plateau',
            signs: [
              'Form breaks down under heavy weight',
              'Can\'t hit positions consistently',
              'Miss lifts due to technique errors',
              'Video shows obvious flaws',
            ],
            solution: 'Fix technique first, strength will follow',
          },
          {
            type: 'Physical Plateau',
            signs: [
              'Technique is solid',
              'Just not strong enough',
              'Specific weak point limits you',
              'Form holds but weight doesn\'t move',
            ],
            solution: 'Address weak points, change training stimulus',
          },
          {
            type: 'Programming Plateau',
            signs: [
              'Same program for 6+ months',
              'Not progressing week to week',
              'Either too much or too little volume',
              'Bored/unmotivated by training',
            ],
            solution: 'Change program structure or approach',
          },
          {
            type: 'Recovery Plateau',
            signs: [
              'Constantly sore/fatigued',
              'Sleep quality poor',
              'Joints hurt',
              'Performance declining or stagnant',
            ],
            solution: 'Deload, improve recovery, reduce stress',
          },
          {
            type: 'Nutritional Plateau',
            signs: [
              'Losing weight unintentionally',
              'Not gaining needed muscle',
              'Low energy consistently',
              'Performance declining with weight loss',
            ],
            solution: 'Eat more, focus on protein and calories',
          },
        ],
      },
    },
    change_stimulus: {
      name: 'Change Training Stimulus',
      icon: 'refresh',
      color: 'primary',
      why_change: {
        title: 'Why Novel Stimulus Works',
        reasons: [
          'Body adapts to specific stress - becomes efficient',
          'Different stimulus = new adaptation required',
          'Breaks mental monotony',
          'Addresses weaknesses old program didn\'t hit',
          'Reduces overuse injuries from repetitive stress',
        ],
      },
      what_to_change: {
        title: 'Variables to Manipulate',
        variables: [
          {
            variable: 'Exercise Selection',
            examples: [
              'Squat: High bar → Low bar (or vice versa)',
              'Bench: Flat → Incline focus',
              'Deadlift: Conventional → Sumo (or vice versa)',
              'Add variations: Front squat, Close grip, Deficit pulls',
            ],
            when: 'Every 8-12 weeks or when stale',
          },
          {
            variable: 'Rep Ranges',
            examples: [
              'Been doing 3-5 reps? Try 6-10 reps',
              'Been doing 8-12 reps? Try 1-3 reps',
              'Wave loading: 5-3-1 within session',
              'Daily max: Singles @ RPE 8-9',
            ],
            when: 'Every 4-8 weeks',
          },
          {
            variable: 'Volume (Sets)',
            examples: [
              'Low volume (10-12 sets/week) → Moderate (16-18)',
              'High volume (20+ sets) → Lower volume',
              'Add or remove a training day',
              'More sets, lower intensity',
            ],
            when: 'When current volume not working for 4+ weeks',
          },
          {
            variable: 'Intensity (%)',
            examples: [
              'Heavy focus (85%+) → Moderate (70-80%)',
              'Moderate work → Heavy singles',
              'Add overload work (105-110% partials)',
              'Sub-maximal volume: Everything @70-75%',
            ],
            when: 'Every 6-12 weeks',
          },
          {
            variable: 'Frequency',
            examples: [
              '1x per week → 2x per week',
              '3x per week → 2x per week',
              'High frequency wave: 4-5x week for 3 weeks',
              'Low frequency: 1x per week high volume',
            ],
            when: 'When recovery allows or demands',
          },
          {
            variable: 'Tempo',
            examples: [
              'Normal speed → 3-0-3 tempo (slow)',
              'Controlled → Explosive (compensatory acceleration)',
              'Pauses: 2 second pause all reps',
              'Eccentric overload: 5 second descent',
            ],
            when: 'Technique plateau or staleness',
          },
        ],
      },
      program_overhauls: {
        title: 'Complete Program Changes',
        approaches: [
          {
            from: 'Linear Progression',
            to: 'Block Periodization',
            why: 'Need structure, simple LP exhausted',
          },
          {
            from: 'Bodybuilding Split',
            to: 'Full Body 3x Week',
            why: 'Need more frequency on competition lifts',
          },
          {
            from: 'High Volume',
            to: 'Conjugate/Max Effort',
            why: 'Need heavy work, max effort days',
          },
          {
            from: 'Powerlifting Only',
            to: 'Add Olympic Lifts',
            why: 'Need speed, power development',
          },
          {
            from: 'Same Program 1+ Year',
            to: 'Literally Anything Different',
            why: 'Staleness, need new stimulus',
          },
        ],
      },
    },
    deload: {
      name: 'Strategic Deloading',
      icon: 'pause',
      color: 'purple',
      when_to_deload: {
        title: 'Signs You Need a Deload',
        signs: [
          'Joints aching more than usual',
          'Motivation/energy consistently low',
          'Sleep quality declining',
          'Performance declining 2-3 weeks straight',
          'Planned deload week (every 4-6 weeks)',
          'Just competed or tested maxes',
        ],
      },
      deload_types: {
        title: 'Types of Deloads',
        types: [
          {
            type: 'Reduced Volume',
            method: 'Keep intensity, cut sets in half',
            example: 'Normally 5x5 @ 80% → 2x5 @ 80%',
            when: 'Feeling beat up but strength good',
          },
          {
            type: 'Reduced Intensity',
            method: 'Keep sets, reduce weight 30-40%',
            example: 'Normally 4x3 @ 85% → 4x3 @ 55%',
            when: 'Joints sore, need to move light',
          },
          {
            type: 'Reduced Frequency',
            method: 'Fewer training days',
            example: '4 days per week → 2 days per week',
            when: 'Systemically fatigued, need time off',
          },
          {
            type: 'Active Recovery',
            method: 'Light movement, no barbell',
            example: 'Bodyweight, swimming, walking',
            when: 'Very fatigued or post-competition',
          },
          {
            type: 'Complete Rest',
            method: 'No training at all',
            example: '5-7 days off completely',
            when: 'Injury, illness, extreme burnout',
          },
        ],
      },
      after_deload: {
        title: 'Coming Back From Deload',
        protocol: [
          'Don\'t go heavy immediately',
          'Week 1 back: 70-80% of normal volume/intensity',
          'Week 2: 85-95% of normal',
          'Week 3+: Full intensity',
          'Expect PRs in weeks 2-4 after deload',
        ],
      },
    },
    weak_points: {
      name: 'Address Weak Points',
      icon: 'construct',
      color: 'amber',
      finding_weakness: {
        title: 'How to Find Your Weak Point',
        methods: [
          'Film heavy attempts - where do you fail?',
          'Bottom? Midway? Lockout?',
          'Which muscle groups fatigue first?',
          'What accessories make you most sore?',
          'Ask experienced lifters to watch',
        ],
      },
      common_weaknesses: {
        title: 'Common Weak Points by Lift',
        lifts: [
          {
            lift: 'Squat',
            weaknesses: [
              {
                area: 'Quads',
                signs: ['Fail out of hole', 'Hips shoot up', 'Forward lean'],
                fixes: ['Front squats', 'Pause squats', 'Leg press', 'High bar'],
              },
              {
                area: 'Glutes',
                signs: ['Can\'t lockout', 'Weak hip drive'],
                fixes: ['Hip thrusts', 'RDLs', 'Good mornings', 'Wide stance'],
              },
              {
                area: 'Core',
                signs: ['Losing tightness', 'Folding forward'],
                fixes: ['Pause work', 'Front squats', 'Planks', 'Belt work'],
              },
            ],
          },
          {
            lift: 'Bench',
            weaknesses: [
              {
                area: 'Chest',
                signs: ['Fail off chest', 'Slow first half'],
                fixes: ['Paused bench', 'Dumbbell press', 'Flyes', 'Larsen'],
              },
              {
                area: 'Triceps',
                signs: ['Fail midway', 'Lockout problems'],
                fixes: ['Close grip', 'Board press', 'Dips', 'Extensions'],
              },
              {
                area: 'Shoulders',
                signs: ['Uneven press', 'Shoulder pain'],
                fixes: ['Overhead press', 'Face pulls', 'Rehab work'],
              },
            ],
          },
          {
            lift: 'Deadlift',
            weaknesses: [
              {
                area: 'Off Floor',
                signs: ['Bar won\'t break floor', 'Slow start'],
                fixes: ['Deficit deads', 'Pause off floor', 'Front squats'],
              },
              {
                area: 'Lockout',
                signs: ['Fail at knees or top', 'Can\'t finish'],
                fixes: ['Block pulls', 'Hip thrusts', 'RDLs'],
              },
              {
                area: 'Back/Lats',
                signs: ['Bar drifts forward', 'Rounding'],
                fixes: ['Rows', 'Pull-ups', 'Snatch grip deads'],
              },
            ],
          },
        ],
      },
      programming_weaknesses: {
        title: 'Programming Weak Point Work',
        approach: [
          'Pick 1-2 exercises for weak point',
          'Do them 2-3x per week',
          'After main lift or separate day',
          '3-4 sets of 6-12 reps typically',
          'Give it 6-8 weeks to work',
          'Retest and assess improvement',
        ],
      },
    },
    gain_weight: {
      name: 'Gain Bodyweight',
      icon: 'trending-up',
      color: 'red',
      reality: {
        title: 'The Weight Gain Reality',
        truths: [
          'More muscle = more strength potential',
          'Can\'t build muscle in calorie deficit',
          'Most plateaus at advanced level = need more size',
          'Heavier lifters in same height usually stronger',
          'But: Optimal bodyfat exists (not just eat everything)',
        ],
      },
      when_to_bulk: {
        title: 'When to Gain Weight',
        indicators: [
          'Stalled 6+ months at current weight',
          'Body fat under 12% (men) or 20% (women)',
          'Not competing soon (3+ months out)',
          'Weak point is "overall strength" not technique',
          'Committed to long-term strength gain',
        ],
      },
      how_to_bulk: {
        title: 'Smart Weight Gain',
        phases: [
          {
            phase: 'Calculate Needs',
            action: 'Maintenance calories + 300-500',
            note: 'Not +1000, that\'s too much fat',
          },
          {
            phase: 'Protein Priority',
            action: '0.8-1g per lb bodyweight minimum',
            note: 'This doesn\'t change even in surplus',
          },
          {
            phase: 'Slow Gain',
            action: '0.5-1 lb per week for men, 0.25-0.5 for women',
            note: 'Faster = more fat, slower = missed opportunity',
          },
          {
            phase: 'Monitor',
            action: 'Weekly weigh-ins, monthly photos',
            note: 'Adjust if gaining too fast or slow',
          },
          {
            phase: 'Training',
            action: 'Take advantage - progressive overload easier',
            note: 'PRs should come more readily',
          },
        ],
      },
      cut_off: {
        title: 'When to Stop Bulking',
        stop_when: [
          'Body fat 18%+ (men) or 28%+ (women)',
          'Feel sluggish/unhealthy',
          '3-4 months before competition',
          'Gained planned weight (e.g., 181 → 198 class)',
        ],
      },
    },
    mental: {
      name: 'Mental Approach',
      icon: 'fitness',
      color: 'cyan',
      mindset_shifts: {
        title: 'Productive Mindset Changes',
        shifts: [
          {
            from: 'Frustrated by plateau',
            to: 'Curious about solution',
            why: 'Frustration clouds judgment, curiosity finds answers',
          },
          {
            from: 'Impatient for results',
            to: 'Trust the process',
            why: 'Breakthroughs often come weeks after change',
          },
          {
            from: 'Chasing PRs every session',
            to: 'Building toward PRs',
            why: 'Every session doesn\'t need to be maximum',
          },
          {
            from: 'Stuck means failure',
            to: 'Plateau is information',
            why: 'Shows what to work on next',
          },
        ],
      },
      taking_break: {
        title: 'Strategic Breaks',
        when: [
          'Burned out mentally',
          'Lost all motivation',
          'Dreading training',
          'Injury needs healing',
        ],
        how_long: '1-2 weeks typical, up to month if needed',
        what_to_do: [
          'Complete rest or active recovery',
          'Do activities you enjoy',
          'Think about your goals and why you lift',
          'Come back when you WANT to train',
        ],
        return: 'Often come back stronger and more motivated',
      },
    },
  };

  const currentStrategy = plateauData[selectedStrategy as keyof typeof plateauData];

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
            Breaking Plateaus
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          <View className="bg-gradient-to-r from-amber-500 to-red-500 rounded-xl p-6 mb-6">
            <Text className="text-white text-2xl font-bold mb-2">Get Unstuck</Text>
            <Text className="text-white opacity-90">
              Strategies to overcome training plateaus
            </Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6">
            <View className="flex-row gap-3 px-1">
              {Object.entries(plateauData).map(([key, strategy]) => (
                <TouchableOpacity
                  key={key}
                  onPress={() => setSelectedStrategy(key)}
                  className={`${
                    selectedStrategy === key 
                      ? getColorClass(strategy.color)
                      : 'bg-zinc-900'
                  } rounded-xl p-4 border ${
                    selectedStrategy === key 
                      ? 'border-white/30'
                      : 'border-zinc-800'
                  } min-w-[200px]`}
                >
                  <Ionicons 
                    name={strategy.icon as any} 
                    size={32} 
                    color={selectedStrategy === key ? 'white' : '#a1a1aa'} 
                  />
                  <Text className={`${selectedStrategy === key ? 'text-white' : 'text-zinc-400'} font-bold mt-2`}>
                    {strategy.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          {selectedStrategy === 'identify' && (
            <View>
              <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
                <Text className="text-primary/80 text-xl font-bold mb-4">{currentStrategy.real_vs_perceived?.title}</Text>
                
                <View className="bg-red-500/10 rounded-xl p-4 border border-red-500/30 mb-4">
                  <Text className="text-red-400 font-bold mb-2">Real Plateau:</Text>
                  {currentStrategy.real_vs_perceived?.real_plateau.map((sign: string, idx: number) => (
                    <Text key={idx} className="text-red-300 text-sm mb-1">� {sign}</Text>
                  ))}
                </View>

                <View className="bg-primary/10 rounded-xl p-4 border border-primary/30">
                  <Text className="text-primary font-bold mb-2">Not Actually Plateau:</Text>
                  {currentStrategy.real_vs_perceived?.not_plateau.map((sign: string, idx: number) => (
                    <Text key={idx} className="text-primary/80 text-sm mb-1">� {sign}</Text>
                  ))}
                </View>
              </View>

              <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
                <Text className="text-purple-400 text-xl font-bold mb-4">{currentStrategy.types?.title}</Text>
                {currentStrategy.types?.categories.map((cat: any, idx: number) => (
                  <View key={idx} className="bg-purple-500/10 rounded-xl p-4 border border-purple-500/30 mb-4 last:mb-0">
                    <Text className="text-purple-400 font-bold text-lg mb-3">{cat.type}</Text>
                    
                    <Text className="text-zinc-400 font-bold text-sm mb-2">Signs:</Text>
                    {cat.signs.map((sign: string, sIdx: number) => (
                      <Text key={sIdx} className="text-zinc-300 text-sm mb-1">� {sign}</Text>
                    ))}

                    <View className="bg-primary/10 rounded-xl p-3 border border-primary/30 mt-3">
                      <Text className="text-primary font-bold text-sm mb-1">Solution:</Text>
                      <Text className="text-primary/80 text-sm">{cat.solution}</Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          )}

          {selectedStrategy !== 'identify' && (
            <View className="bg-primary/10 rounded-xl p-6 border border-primary/30 mb-6">
              <Text className="text-primary/80 font-bold text-lg mb-2">
                {currentStrategy.name}
              </Text>
              <Text className="text-primary/60 text-sm">
                Detailed content for this strategy available in full app...
              </Text>
            </View>
          )}

          <View className="bg-gradient-to-r from-primary/20 to-primary/100/20 rounded-xl p-5 border border-primary/30 mb-6">
            <Text className="text-primary font-bold text-lg mb-3">Key Principles</Text>
            <Text className="text-primary/80 text-sm mb-2">
              � Identify the root cause before changing everything
            </Text>
            <Text className="text-primary/80 text-sm mb-2">
              � Change ONE variable at a time when possible
            </Text>
            <Text className="text-primary/80 text-sm mb-2">
              � Give changes 4-6 weeks to work
            </Text>
            <Text className="text-primary/80 text-sm">
              � Sometimes you need to get weaker short-term to get stronger long-term
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}


