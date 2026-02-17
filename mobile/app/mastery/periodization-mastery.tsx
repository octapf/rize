import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function PeriodizationMastery() {
  const [selectedModel, setSelectedModel] = useState('overview');

  const periodizationData = {
    overview: {
      name: 'Periodization Overview',
      icon: 'analytics',
      color: 'blue',
      definition: {
        title: 'What is Periodization?',
        simple: 'Organizing training into phases with different goals',
        why: 'Can\'t train maximally all the time - need planned variation',
      },
      key_concepts: {
        title: 'Key Concepts',
        terms: [
          {
            term: 'Microcycle',
            definition: 'Single training week',
          },
          {
            term: 'Mesocycle',
            definition: 'Block of 3-6 weeks with similar training',
          },
          {
            term: 'Macrocycle',
            definition: 'Entire training year or meet prep (12-16+ weeks)',
          },
          {
            term: 'Overload',
            definition: 'Applying stress beyond current capacity',
          },
          {
            term: 'Supercompensation',
            definition: 'Adaptation that occurs after recovery',
          },
        ],
      },
      principles: {
        title: 'Periodization Principles',
        rules: [
          'Specificity increases as competition approaches',
          'Volume decreases, intensity increases (generally)',
          'Plan recovery/deload weeks',
          'Different phases target different adaptations',
          'Can\'t peak year-round',
        ],
      },
    },
    linear: {
      name: 'Linear Periodization',
      icon: 'trending-up',
      color: 'primary',
      structure: {
        title: 'Linear Periodization Structure',
        concept: 'Progress from high volume/low intensity → low volume/high intensity',
        phases: [
          {
            phase: 'Hypertrophy (Weeks 1-4)',
            sets_reps: '4-5 sets of 8-12 reps',
            intensity: '60-75%',
            goal: 'Build muscle mass',
          },
          {
            phase: 'Strength (Weeks 5-8)',
            sets_reps: '4-5 sets of 4-6 reps',
            intensity: '75-85%',
            goal: 'Build strength',
          },
          {
            phase: 'Power/Peaking (Weeks 9-12)',
            sets_reps: '3-4 sets of 1-3 reps',
            intensity: '85-95%+',
            goal: 'Peak strength',
          },
        ],
      },
      pros_cons: {
        title: 'Linear Periodization Pros & Cons',
        pros: [
          'Simple to understand and implement',
          'Good for beginners',
          'Clear progression',
          'Works well when timeline is fixed (meet prep)',
        ],
        cons: [
          'Detrains qualities not being focused on',
          'Can lose muscle during peaking phase',
          'May not be optimal for advanced lifters',
          'Less flexible',
        ],
      },
      example: {
        title: 'Linear Periodization Example (Squat)',
        week_1_4: 'Squat: 4x10 @ 70%',
        week_5_8: 'Squat: 5x5 @ 80%',
        week_9_12: 'Squat: 4x3 @ 87%',
        note: 'Weights increase as reps decrease',
      },
    },
    block: {
      name: 'Block Periodization',
      icon: 'cube',
      color: 'purple',
      structure: {
        title: 'Block Periodization Model',
        concept: 'Sequential blocks focusing on one main quality',
        blocks: [
          {
            block: 'Accumulation (4-6 weeks)',
            goal: 'Build muscle, work capacity, technical proficiency',
            volume: 'HIGH (near maximum recoverable)',
            intensity: 'MODERATE (70-80%)',
            example: 'Squat 5x8 @ 75%, lots of variations',
          },
          {
            block: 'Intensification (3-4 weeks)',
            goal: 'Convert size to max strength',
            volume: 'MODERATE',
            intensity: 'HIGH (80-90%)',
            example: 'Squat 4x4 @ 85%, more specific',
          },
          {
            block: 'Realization/Peaking (2-3 weeks)',
            goal: 'Express maximum strength',
            volume: 'LOW',
            intensity: 'VERY HIGH (85-95%+)',
            example: 'Squat 3x2 @ 90%, competition lifts only',
          },
        ],
      },
      residual_effects: {
        title: 'Residual Training Effects',
        concept: 'Adaptations last different lengths of time',
        effects: [
          {
            quality: 'Muscle Mass',
            duration: '30+ days - lasts a long time',
            implication: 'Build it early, maintains through peak',
          },
          {
            quality: 'Max Strength',
            duration: '15-20 days',
            implication: 'Needs to be maintained closer to competition',
          },
          {
            quality: 'Power/Speed',
            duration: '5-10 days',
            implication: 'Train this closest to competition',
          },
        ],
      },
      pros_cons: {
        title: 'Block Periodization Pros & Cons',
        pros: [
          'Focuses on one quality at a time (less conflicting adaptations)',
          'Uses residual effects intelligently',
          'Good for intermediate to advanced',
          'Flexible - can adjust block lengths',
        ],
        cons: [
          'More complex to plan',
          'Requires understanding of residual effects',
          'May not work as well for beginners',
        ],
      },
    },
    dup: {
      name: 'Daily Undulating (DUP)',
      icon: 'swap-horizontal',
      color: 'amber',
      structure: {
        title: 'DUP Structure',
        concept: 'Vary intensity and volume each session',
        example: [
          {
            day: 'Monday - Squat Heavy',
            sets_reps: '5x3 @ 85%',
            goal: 'Max strength',
          },
          {
            day: 'Wednesday - Squat Volume',
            sets_reps: '4x8 @ 70%',
            goal: 'Hypertrophy',
          },
          {
            day: 'Friday - Squat Power',
            sets_reps: '8x2 @ 75% (explosive)',
            goal: 'Speed/power',
          },
        ],
      },
      variations: {
        title: 'DUP Variations',
        intensity_undulation: {
          type: 'Vary Intensity Only',
          example: 'Mon: 85%, Wed: 75%, Fri: 80%',
          sets_reps: 'Same sets/reps',
        },
        volume_undulation: {
          type: 'Vary Volume Only',
          example: 'Mon: 5x3, Wed: 3x8, Fri: 4x5',
          intensity: 'Same intensity',
        },
        both: {
          type: 'Vary Both',
          example: 'Different volume AND intensity each day',
          most_common: 'This is most common DUP approach',
        },
      },
      pros_cons: {
        title: 'DUP Pros & Cons',
        pros: [
          'Frequent exposure to all qualities',
          'Can train lifts 3-4x per week without overtraining',
          'Great for bench press',
          'Flexible - can adjust based on daily readiness',
          'Good for all experience levels',
        ],
        cons: [
          'Requires more planning',
          'Can be confusing for beginners',
          'Need to manage fatigue carefully',
        ],
      },
    },
    conjugate: {
      name: 'Conjugate Method',
      icon: 'rocket',
      color: 'red',
      structure: {
        title: 'Conjugate Method (Westside Barbell)',
        developed_by: 'Louie Simmons, popularized by equipped lifters',
        core_days: [
          {
            day: 'Max Effort Lower',
            goal: 'Work up to 1-3RM',
            variation: 'Rotate exercise weekly (box squat, SSB, deficit DL, etc)',
            accessories: 'Posterior chain work',
          },
          {
            day: 'Max Effort Upper',
            goal: 'Work up to 1-3RM',
            variation: 'Rotate exercise weekly (close grip, floor press, boards)',
            accessories: 'Triceps, shoulders, lats',
          },
          {
            day: 'Dynamic Effort Lower',
            goal: 'Speed work with bands/chains',
            structure: '8-12 sets of 2 reps @ 50-60%',
            accessories: 'Squat/deadlift variations',
          },
          {
            day: 'Dynamic Effort Upper',
            goal: 'Speed bench',
            structure: '8-10 sets of 3 reps @ 50-60% + bands',
            accessories: 'Triceps, shoulders, upper back',
          },
        ],
      },
      key_principles: {
        title: 'Conjugate Key Principles',
        rotation: {
          principle: 'Rotate Max Effort Exercises',
          frequency: 'Every 1-3 weeks',
          why: 'Prevents accommodation (getting used to same stimulus)',
        },
        accommodating_resistance: {
          principle: 'Use Bands and Chains',
          why: 'Teaches acceleration, varies resistance curve',
          application: 'Dynamic effort days mostly',
        },
        high_accessory_volume: {
          principle: 'Lots of Accessory Work',
          volume: '60-70% of total volume is accessories',
          why: 'Build weak points, muscle mass',
        },
      },
      pros_cons: {
        title: 'Conjugate Pros & Cons',
        pros: [
          'Constantly novel stimulus (prevents staleness)',
          'Addresses weak points through rotation',
          'High frequency without overtraining same movement',
          'Can train near-max effort weekly',
        ],
        cons: [
          'VERY complex - not for beginners',
          'Requires lots of equipment (boxes, boards, bands, chains)',
          'High skill requirement (rotating exercises)',
          'Originally designed for equipped lifting',
          'Very high volume/frequency - hard to recover from',
        ],
      },
    },
    comparison: {
      name: 'Model Comparison',
      icon: 'git-compare',
      color: 'cyan',
      table: {
        title: 'Periodization Models Compared',
        factors: [
          {
            factor: 'Complexity',
            linear: 'SIMPLE - easiest to understand',
            block: 'MODERATE - need to understand blocks',
            dup: 'MODERATE - track different sessions',
            conjugate: 'COMPLEX - many moving parts',
          },
          {
            factor: 'Best For',
            linear: 'Beginners, fixed meet date',
            block: 'Intermediate-Advanced',
            dup: 'All levels, especially bench',
            conjugate: 'Advanced-Elite with equipment',
          },
          {
            factor: 'Volume Distribution',
            linear: 'High to low over time',
            block: 'High, then moderate, then low',
            dup: 'Varied within week',
            conjugate: 'Consistently high',
          },
          {
            factor: 'Intensity Distribution',
            linear: 'Low to high over time',
            block: 'Moderate, then high, then very high',
            dup: 'All intensities each week',
            conjugate: 'Max effort weekly + speed work',
          },
          {
            factor: 'Exercise Variation',
            linear: 'Low - stick to same exercises',
            block: 'Moderate - changes between blocks',
            dup: 'Low-Moderate',
            conjugate: 'VERY HIGH - constant rotation',
          },
        ],
      },
      choosing: {
        title: 'How to Choose Periodization Model',
        decision_tree: [
          {
            question: 'Are you a beginner (<1 year)?',
            yes: 'Use LINEAR - keep it simple',
            no: 'Continue to next question',
          },
          {
            question: 'Do you have a fixed meet date?',
            yes: 'Use BLOCK or LINEAR - works well for peaking',
            no: 'Continue to next question',
          },
          {
            question: 'Want to train bench 3-4x per week?',
            yes: 'Use DUP - perfect for high frequency',
            no: 'Continue to next question',
          },
          {
            question: 'Advanced lifter with lots of equipment?',
            yes: 'Consider CONJUGATE',
            no: 'Use BLOCK or DUP',
          },
        ],
      },
    },
    advanced: {
      name: 'Advanced Concepts',
      icon: 'flame',
      color: 'indigo',
      wave_loading: {
        title: 'Wave Loading',
        concept: 'Mini-cycles within a session or week',
        within_session: {
          type: 'Intra-Session Waves',
          example: 'Wave 1: 80%, 85%, 90% → Wave 2: 82%, 87%, 92%',
          benefit: 'Post-activation potentiation',
        },
        across_weeks: {
          type: 'Weekly Waves',
          example: 'Week 1: 80%, Week 2: 85%, Week 3: 77%, Week 4: 87%',
          benefit: 'Planned overreaching and recovery',
        },
      },
      pendulum: {
        title: 'Pendulum Periodization',
        concept: 'Swing between volume and intensity phases',
        structure: 'Vol → Int → Vol → Int (shorter phases)',
        example: '2 weeks volume, 2 weeks intensity, repeat',
        benefit: 'Constant variation without long phases',
      },
      overreaching: {
        title: 'Planned Overreaching',
        concept: 'Intentionally train beyond recovery capacity briefly',
        method: '2-3 weeks very high volume/intensity',
        follow_with: 'Deload week',
        result: 'Supercompensation - rebound stronger',
        warning: 'Advanced technique - easy to overdo',
      },
      mixed_models: {
        title: 'Mixing Models',
        approach: 'Use different models for different lifts',
        example: [
          'Squat: Block periodization',
          'Bench: DUP (responds to high frequency)',
          'Deadlift: Linear (low frequency)',
        ],
        caution: 'Complex - only for advanced lifters',
      },
    },
    practical: {
      name: 'Practical Application',
      icon: 'construct',
      color: 'rose',
      beginner_path: {
        title: 'Beginner (Year 1)',
        model: 'LINEAR PERIODIZATION',
        structure: '12 weeks: Hypertrophy → Strength → Peak',
        example: 'Weeks 1-4: 4x10, Weeks 5-8: 5x5, Weeks 9-12: 5x3',
      },
      intermediate_path: {
        title: 'Intermediate (Years 2-3)',
        model: 'BLOCK or DUP',
        structure: 'Try both, see which works better for you',
        example: 'Run 12-week block, then 12-week DUP, compare',
      },
      advanced_path: {
        title: 'Advanced (Years 4+)',
        model: 'Any model, possibly mixed',
        structure: 'Based on your specific needs and responses',
        example: 'DUP for bench, Block for squat/deadlift',
      },
      tracking: {
        title: 'Tracking Your Periodization',
        what_to_track: [
          'Weekly volume (sets x reps x weight)',
          'Average intensity (%1RM)',
          'RPE/RIR for working sets',
          'Performance (PRs, e-1RMs)',
          'Recovery markers (sleep, soreness, readiness)',
        ],
        use: 'Compare cycles - what periodization worked best?',
      },
    },
  };

  const currentModel = periodizationData[selectedModel as keyof typeof periodizationData];

  const getColorClass = (color: string) => {
    const colors: { [key: string]: string } = {
      blue: 'bg-primary',
      primary: 'bg-primary',
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
            Periodization Mastery
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          <View className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl p-6 mb-6">
            <Text className="text-white text-2xl font-bold mb-2">Periodization</Text>
            <Text className="text-white opacity-90">
              Advanced periodization models & block manipulation
            </Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6">
            <View className="flex-row gap-3 px-1">
              {Object.entries(periodizationData).map(([key, model]) => (
                <TouchableOpacity
                  key={key}
                  onPress={() => setSelectedModel(key)}
                  className={`${
                    selectedModel === key 
                      ? getColorClass(model.color)
                      : 'bg-zinc-900'
                  } rounded-xl p-4 border ${
                    selectedModel === key 
                      ? 'border-white/30'
                      : 'border-zinc-800'
                  } min-w-[160px]`}
                >
                  <Ionicons 
                    name={model.icon as any} 
                    size={32} 
                    color={selectedModel === key ? 'white' : '#a1a1aa'} 
                  />
                  <Text className={`${selectedModel === key ? 'text-white' : 'text-zinc-400'} font-bold mt-2 text-sm`}>
                    {model.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          {/* Content placeholder */}
          <View className="bg-indigo-500/10 rounded-xl p-6 border border-indigo-500/30 mb-6">
            <Ionicons name={currentModel.icon as any} size={32} color="#6366f1" />
            <Text className="text-indigo-400 font-bold text-lg mt-3 mb-2">
              {currentModel.name}
            </Text>
            <Text className="text-indigo-300 text-sm">
              Detailed content for {currentModel.name}...
            </Text>
          </View>

          <View className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl p-5 border border-purple-500/30 mb-6">
            <Text className="text-purple-400 font-bold text-lg mb-3">Periodization Models</Text>
            <Text className="text-purple-300 text-sm mb-2">
              📈 Linear: High volume → Low volume, Low intensity → High intensity
            </Text>
            <Text className="text-purple-300 text-sm mb-2">
              ?? Block: Sequential blocks (Accumulation → Intensification → Realization)
            </Text>
            <Text className="text-purple-300 text-sm mb-2">
              🔄 DUP: Vary volume/intensity within week (Heavy/Volume/Power)
            </Text>
            <Text className="text-purple-300 text-sm">
              ?? Conjugate: Max Effort + Dynamic Effort, rotating variations
            </Text>
          </View>

          <View className="bg-cyan-500/10 rounded-xl p-5 border border-cyan-500/30 mb-6">
            <Text className="text-cyan-400 font-bold text-lg mb-3">Choosing a Model</Text>
            <Text className="text-cyan-300 text-sm mb-2">
              🔰 Beginner: Linear (simple, works great)
            </Text>
            <Text className="text-cyan-300 text-sm mb-2">
              📊 Intermediate: Block or DUP (try both!)
            </Text>
            <Text className="text-cyan-300 text-sm mb-2">
              🏆 Advanced: Any model, possibly mixed
            </Text>
            <Text className="text-cyan-300 text-sm">
              💪 Bench focus: DUP (high frequency)
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

