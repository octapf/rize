import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function FatigueManagementAdvanced() {
  const [selectedAspect, setSelectedAspect] = useState('understanding');

  const fatigueData = {
    understanding: {
      name: 'Understanding Fatigue',
      icon: 'help-circle',
      color: 'blue',
      what_is: {
        title: 'What is Fatigue?',
        definition: 'Temporary decrease in performance capacity',
        types: [
          {
            type: 'Acute Fatigue',
            timing: 'Within a session or day',
            example: 'Set 1: easy, Set 5: hard - same weight',
            recovery: 'Minutes to hours',
          },
          {
            type: 'Short-term Fatigue',
            timing: 'Session to session',
            example: 'Monday great, Wednesday sluggish',
            recovery: 'Days',
          },
          {
            type: 'Accumulated Fatigue',
            timing: 'Week to week',
            example: 'Week 1 strong, Week 4 ground down',
            recovery: 'Weeks (deload)',
          },
          {
            type: 'Overtraining',
            timing: 'Months',
            example: 'Chronic underperformance, mood changes',
            recovery: 'Weeks to months',
          },
        ],
      },
      fatigue_vs_soreness: {
        title: 'Fatigue vs Soreness',
        fatigue: 'CNS/systemic - feel weak, unmotivated, performance down',
        soreness: 'Local muscle - DOMS, hurts to touch, still strong',
        key: 'Soreness ≠ fatigue. Can be sore but not fatigued (and vice versa)',
      },
      good_vs_bad: {
        title: 'Good Fatigue vs Bad Fatigue',
        good: [
          'Accumulates predictably through training block',
          'Deload recovers you',
          'Performance drops 5-10% max',
          'Still want to train',
        ],
        bad: [
          'Comes on suddenly or unpredictably',
          'Deload doesn\'t help much',
          'Performance crashes >15%',
          'Dread going to gym',
          'Sleep/mood impacted',
        ],
      },
    },
    signs: {
      name: 'Signs of Fatigue',
      icon: 'warning',
      color: 'amber',
      performance: {
        title: 'Performance Signs',
        indicators: [
          {
            sign: 'Weight Feels Heavy',
            detail: '80% feels like 90%, struggles with normal weights',
            severity: 'Moderate',
          },
          {
            sign: 'Bar Speed Slow',
            detail: 'All reps feel like RPE 9-10, even light weights grind',
            severity: 'High',
          },
          {
            sign: 'Missing Reps',
            detail: 'Failing sets you normally complete',
            severity: 'High',
          },
          {
            sign: 'Inconsistent Performance',
            detail: 'Good days rare, lots of variability',
            severity: 'Moderate',
          },
          {
            sign: 'Technique Breakdown',
            detail: 'Form deteriorates with normal weights',
            severity: 'High',
          },
        ],
      },
      physical: {
        title: 'Physical Signs',
        indicators: [
          {
            sign: 'Elevated Resting Heart Rate',
            detail: '+5-10 BPM above normal baseline',
            severity: 'High',
          },
          {
            sign: 'Poor Sleep',
            detail: 'Can\'t fall asleep or stay asleep despite tiredness',
            severity: 'High',
          },
          {
            sign: 'Persistent Soreness',
            detail: 'DOMS that won\'t go away, always sore',
            severity: 'Moderate',
          },
          {
            sign: 'Joint Aches',
            detail: 'Knees, elbows, shoulders hurt without specific injury',
            severity: 'Moderate-High',
          },
          {
            sign: 'Getting Sick',
            detail: 'Frequent colds, infections',
            severity: 'High',
          },
        ],
      },
      mental: {
        title: 'Mental/Emotional Signs',
        indicators: [
          {
            sign: 'Lack of Motivation',
            detail: 'Dread training, have to force yourself',
            severity: 'High',
          },
          {
            sign: 'Irritability',
            detail: 'Short temper, everything annoys you',
            severity: 'Moderate',
          },
          {
            sign: 'Depression/Anxiety',
            detail: 'Persistent low mood, worry',
            severity: 'High',
          },
          {
            sign: 'Loss of Appetite',
            detail: 'Don\'t feel like eating',
            severity: 'High',
          },
          {
            sign: 'Brain Fog',
            detail: 'Can\'t focus, memory issues',
            severity: 'Moderate-High',
          },
        ],
      },
      checklist: {
        title: 'Daily Fatigue Checklist',
        how: 'Rate 1-5 each morning (1=great, 5=terrible)',
        items: [
          'Sleep quality last night',
          'Energy level right now',
          'Muscle soreness',
          'Mood/motivation',
          'Appetite',
        ],
        scoring: 'Score >15? Consider light day or rest. Score >20? Definitely rest.',
      },
    },
    causes: {
      name: 'Causes of Fatigue',
      icon: 'alert-circle',
      color: 'red',
      training: {
        title: 'Training Causes',
        factors: [
          {
            cause: 'Too Much Volume',
            detail: 'More sets/reps than you can recover from',
            fix: 'Reduce volume 20-30%',
          },
          {
            cause: 'Too Much Intensity',
            detail: 'Too many heavy sets (RPE 9-10)',
            fix: 'More RPE 7-8 work, less RPE 9-10',
          },
          {
            cause: 'Not Enough Rest',
            detail: 'Training too frequently, no rest days',
            fix: 'Add rest day, reduce frequency',
          },
          {
            cause: 'No Deloads',
            detail: 'Pushing hard for 8+ weeks straight',
            fix: 'Implement deload every 3-5 weeks',
          },
          {
            cause: 'Too Much Accessory Work',
            detail: 'Main lifts + tons of accessories = too much',
            fix: 'Cut accessories 30-50%',
          },
        ],
      },
      lifestyle: {
        title: 'Lifestyle Causes',
        factors: [
          {
            cause: 'Poor Sleep',
            detail: '<7 hours, inconsistent schedule',
            fix: 'Prioritize 7-9 hours, same bedtime',
          },
          {
            cause: 'Inadequate Nutrition',
            detail: 'Not eating enough, low protein',
            fix: 'Eat at maintenance minimum, 0.8g+/lb protein',
          },
          {
            cause: 'High Life Stress',
            detail: 'Work, relationships, finances',
            fix: 'Reduce training volume 20-30% when stressed',
          },
          {
            cause: 'Alcohol',
            detail: 'Regular drinking impairs recovery',
            fix: 'Limit to 1-2x per week, moderate amounts',
          },
          {
            cause: 'Other Activities',
            detail: 'Sports, cardio, physical job on top of lifting',
            fix: 'Account for all activity, may need to reduce',
          },
        ],
      },
    },
    strategies: {
      name: 'Management Strategies',
      icon: 'shield',
      color: 'primary',
      deload: {
        title: 'Deload Strategies',
        when: 'Every 3-5 weeks, or when fatigue signs appear',
        methods: [
          {
            method: 'Reduced Volume',
            how: 'Cut sets by 50% (4 sets → 2 sets)',
            intensity: 'Keep intensity same',
            example: 'Squat: 2x5 @ 80% instead of 4x5 @ 80%',
          },
          {
            method: 'Reduced Intensity',
            how: 'Drop weight by 20%',
            volume: 'Keep sets/reps same',
            example: 'Squat: 4x5 @ 60% instead of 4x5 @ 80%',
          },
          {
            method: 'Reduced Frequency',
            how: 'Train 2x per week instead of 4x',
            intensity: 'Keep intensity/volume per session',
            example: 'Only Monday and Friday, skip Wed/Sat',
          },
          {
            method: 'Active Recovery',
            how: 'Only technique work, no heavy sets',
            intensity: '40-50% for movement practice',
            example: 'Light squats 3x5 @ bar weight',
          },
        ],
      },
      daily_adjustments: {
        title: 'Daily Adjustments',
        principle: 'Don\'t stick to plan if you feel terrible',
        strategies: [
          {
            situation: 'Feel 80% Good',
            adjustment: 'Reduce volume 20% (drop a set from each exercise)',
          },
          {
            situation: 'Feel 60% Good',
            adjustment: 'Reduce volume 40% AND drop intensity 10%',
          },
          {
            situation: 'Feel <50% Good',
            adjustment: 'Active recovery or rest day',
          },
        ],
      },
      lifestyle: {
        title: 'Lifestyle Optimization',
        priorities: [
          {
            priority: 'Sleep',
            target: '7-9 hours, consistent schedule',
            impact: 'Biggest recovery factor',
          },
          {
            priority: 'Nutrition',
            target: 'At least maintenance calories, high protein',
            impact: 'Can\'t recover in deficit',
          },
          {
            priority: 'Stress Management',
            target: 'Meditation, walks, hobbies',
            impact: 'All stress is stress - manage it',
          },
          {
            priority: 'Hydration',
            target: '0.5-1 oz per lb bodyweight',
            impact: 'Underrated recovery tool',
          },
        ],
      },
    },
    recovery: {
      name: 'Recovery Techniques',
      icon: 'heart',
      color: 'purple',
      evidence_based: {
        title: 'Evidence-Based Recovery',
        high_priority: [
          {
            method: 'Sleep',
            effectiveness: 'HIGHEST',
            how: '7-9 hours, same time each night',
            cost: 'Free',
          },
          {
            method: 'Nutrition',
            effectiveness: 'HIGHEST',
            how: 'Adequate calories and protein',
            cost: 'Cost of food',
          },
          {
            method: 'Deload Weeks',
            effectiveness: 'HIGH',
            how: 'Every 3-5 weeks, reduce volume/intensity',
            cost: 'Free',
          },
          {
            method: 'Rest Days',
            effectiveness: 'HIGH',
            how: '1-2 full rest days per week',
            cost: 'Free',
          },
        ],
        moderate_priority: [
          {
            method: 'Active Recovery',
            effectiveness: 'MODERATE',
            how: 'Light cardio, walking, mobility',
            cost: 'Free',
          },
          {
            method: 'Massage',
            effectiveness: 'MODERATE',
            how: 'Professional or foam rolling',
            cost: '$50-100/session',
          },
          {
            method: 'Sauna',
            effectiveness: 'MODERATE',
            how: '15-20 min post-workout',
            cost: 'Gym membership',
          },
        ],
      },
      questionable: {
        title: 'Questionable/Low Value Recovery',
        methods: [
          {
            method: 'Ice Baths',
            evidence: 'May impair adaptation',
            verdict: 'Skip unless acute injury',
          },
          {
            method: 'Compression Garments',
            evidence: 'Minimal benefit',
            verdict: 'Placebo mostly, expensive',
          },
          {
            method: 'Supplements (most)',
            evidence: 'Minimal compared to basics',
            verdict: 'Focus on sleep/food first',
          },
          {
            method: 'TENS units',
            evidence: 'Little evidence for recovery',
            verdict: 'Feels good but doesn\'t do much',
          },
        ],
      },
      practical_hierarchy: {
        title: 'Recovery Hierarchy (Priority Order)',
        levels: [
          '1. Sleep 7-9 hours (non-negotiable)',
          '2. Eat enough food with adequate protein',
          '3. Manage life stress where possible',
          '4. Program deloads every 3-5 weeks',
          '5. Take 1-2 rest days per week',
          '6. Light cardio/walking on off days',
          '7. Everything else (massage, sauna, etc) is bonus',
        ],
      },
    },
    overtraining: {
      name: 'Overtraining Syndrome',
      icon: 'skull',
      color: 'rose',
      definition: {
        title: 'What is Overtraining Syndrome?',
        description: 'Chronic state of underperformance lasting weeks to months',
        reality: 'Rare in powerlifters - most are just temporarily fatigued',
        difference: 'Overreaching (good) vs Overtraining (bad)',
      },
      signs: {
        title: 'True Overtraining Signs',
        symptoms: [
          'Sustained performance decrease (>3 weeks)',
          'Deload doesn\'t help',
          'Sleep disturbances persist',
          'Mood changes (depression, anxiety)',
          'Loss of appetite',
          'Elevated resting heart rate',
          'Frequent illness',
          'Loss of interest in training',
        ],
        note: 'If you have 5+ of these for 3+ weeks, might be overtrained',
      },
      recovery: {
        title: 'Recovering from Overtraining',
        reality: 'Takes much longer than deload',
        protocol: [
          'Week 1-2: Complete rest (maybe light walking)',
          'Week 3-4: Light technique work only (40-50%)',
          'Week 5-6: Gradual return to normal training',
          'Week 7+: Back to normal but monitor closely',
        ],
        prevention: 'Much easier to prevent than cure - deload regularly!',
      },
      vs_overreaching: {
        title: 'Overreaching vs Overtraining',
        overreaching: {
          definition: 'Short-term decrease in performance (days to 2 weeks)',
          recovery: 'Deload recovers you',
          result: 'Normal part of training - supercompensation',
        },
        overtraining: {
          definition: 'Long-term decrease (weeks to months)',
          recovery: 'Deload not enough - need extended rest',
          result: 'Injury/illness, serious issue',
        },
      },
    },
    practical: {
      name: 'Practical Application',
      icon: 'construct',
      color: 'cyan',
      monitoring: {
        title: 'How to Monitor Fatigue',
        daily: [
          'Morning: Check resting heart rate (5+ BPM = concern)',
          'Morning: Rate sleep quality, soreness, mood (1-5)',
          'Training: Note RPE for working sets',
          'Training: Note bar speed/technique',
        ],
        weekly: [
          'Total training volume (sets x reps)',
          'Average intensity (%1RM or RPE)',
          'Total time in gym',
          'Body weight trend',
        ],
      },
      action_plan: {
        title: 'Fatigue Management Action Plan',
        steps: [
          {
            step: '1. Establish Baseline',
            action: 'Track RHR, sleep, mood for 2 weeks when feeling good',
          },
          {
            step: '2. Daily Check-In',
            action: 'Morning: RHR + quick assessment (scale 1-5)',
          },
          {
            step: '3. Adjust Training',
            action: 'If score poor: reduce volume/intensity that day',
          },
          {
            step: '4. Scheduled Deloads',
            action: 'Every 3-5 weeks, plan deload week',
          },
          {
            step: '5. Emergency Deload',
            action: 'If 3+ bad days in a row: deload or rest',
          },
          {
            step: '6. Lifestyle',
            action: 'Protect sleep, manage stress, eat enough',
          },
        ],
      },
      sample_decision_tree: {
        title: 'Fatigue Decision Tree',
        tree: [
          {
            question: 'Morning RHR elevated?',
            yes: 'High fatigue - consider rest or light day',
            no: 'Continue to next question',
          },
          {
            question: 'Sleep quality poor (<3/5)?',
            yes: 'Moderate-high fatigue - reduce volume 30%',
            no: 'Continue to next question',
          },
          {
            question: 'Soreness high + mood poor?',
            yes: 'Moderate fatigue - reduce volume 20%',
            no: 'Train as planned, monitor closely',
          },
        ],
      },
    },
  };

  const currentAspect = fatigueData[selectedAspect as keyof typeof fatigueData];

  const getColorClass = (color: string) => {
    const colors: { [key: string]: string } = {
      blue: 'bg-primary',
      amber: 'bg-amber-500',
      red: 'bg-red-500',
      primary: 'bg-primary',
      purple: 'bg-purple-500',
      rose: 'bg-rose-500',
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
            Fatigue Management Advanced
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          <View className="bg-gradient-to-r from-rose-500 to-red-500 rounded-xl p-6 mb-6">
            <Text className="text-white text-2xl font-bold mb-2">Manage Fatigue</Text>
            <Text className="text-white opacity-90">
              Recognize, prevent, and recover from fatigue
            </Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6">
            <View className="flex-row gap-3 px-1">
              {Object.entries(fatigueData).map(([key, aspect]) => (
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
          <View className="bg-amber-500/10 rounded-xl p-6 border border-amber-500/30 mb-6">
            <Ionicons name={currentAspect.icon as any} size={32} color="#FFEA00" />
            <Text className="text-amber-400 font-bold text-lg mt-3 mb-2">
              {currentAspect.name}
            </Text>
            <Text className="text-amber-300 text-sm">
              Detailed content for {currentAspect.name}...
            </Text>
          </View>

          <View className="bg-gradient-to-r from-red-500/20 to-rose-500/20 rounded-xl p-5 border border-red-500/30 mb-6">
            <Text className="text-red-400 font-bold text-lg mb-3">Fatigue Red Flags</Text>
            <Text className="text-red-300 text-sm mb-2">
              ⚠️ Resting heart rate +5-10 BPM above normal
            </Text>
            <Text className="text-red-300 text-sm mb-2">
              ⚠️ Poor sleep despite being tired
            </Text>
            <Text className="text-red-300 text-sm mb-2">
              ⚠️ Dread going to gym (lost motivation)
            </Text>
            <Text className="text-red-300 text-sm mb-2">
              ⚠️ Performance down &gt;10% for multiple sessions
            </Text>
            <Text className="text-red-300 text-sm mb-2">
              ⚠️ Persistent soreness that won't go away
            </Text>
            <Text className="text-red-300 text-sm">
              → If 3+ present: Take rest day or deload week
            </Text>
          </View>

          <View className="bg-primary/10 rounded-xl p-5 border border-primary/30 mb-6">
            <Text className="text-primary font-bold text-lg mb-3">Recovery Priorities</Text>
            <Text className="text-primary/80 text-sm mb-2">
              1️⃣ Sleep 7-9 hours (most important)
            </Text>
            <Text className="text-primary/80 text-sm mb-2">
              2️⃣ Eat enough food + protein
            </Text>
            <Text className="text-primary/80 text-sm mb-2">
              3️⃣ Deload every 3-5 weeks
            </Text>
            <Text className="text-primary/80 text-sm mb-2">
              4️⃣ 1-2 rest days per week
            </Text>
            <Text className="text-primary/80 text-sm">
              5️⃣ Everything else is bonus (massage, sauna, etc.)
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}


