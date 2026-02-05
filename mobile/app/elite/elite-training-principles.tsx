import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function EliteTrainingPrinciples() {
  const [selectedPrinciple, setSelectedPrinciple] = useState('overview');

  const eliteData = {
    overview: {
      name: 'Elite Overview',
      icon: 'trophy',
      color: 'amber',
      what_is_elite: {
        title: 'What is "Elite"?',
        definitions: [
          {
            metric: 'Wilks Score',
            elite: '450+ (men), 350+ (women)',
            context: 'Top 1-2% of all lifters',
          },
          {
            metric: 'Total',
            elite: '1500+ @ 220 (men), 1000+ @ 165 (women)',
            context: 'Rough guideline, weight class dependent',
          },
          {
            metric: 'Competition',
            elite: 'Competitive at nationals/worlds',
            context: 'Can medal at high-level meets',
          },
          {
            metric: 'Training Age',
            elite: 'Typically 5-10+ years serious training',
            context: 'Not achievable in 1-2 years',
          },
        ],
      },
      advanced_vs_elite: {
        title: 'Advanced vs Elite',
        advanced: [
          'Strong at regional/local level',
          '4-7 years training',
          'Near genetic potential in 1-2 lifts',
          'Good technique, consistent training',
          'Progress measured in months',
        ],
        elite: [
          'Competitive nationally/internationally',
          '7-15+ years training',
          'Near genetic potential in all 3 lifts',
          'Elite technique, lifestyle supports training',
          'Progress measured in 6-12+ month blocks',
        ],
      },
      reality: {
        title: 'The Reality of Elite Training',
        truths: [
          'Requires exceptional genetics AND years of work',
          'Progress is SLOW (PRs 1-2x per year)',
          'Training is often boring (same thing for months)',
          'Injury management becomes critical',
          'Lifestyle must support training (sleep, stress, nutrition)',
          'May need a coach - hard to self-program at this level',
        ],
      },
    },
    specificity: {
      name: 'Extreme Specificity',
      icon: 'target',
      color: 'blue',
      concept: {
        title: 'Specificity at Elite Level',
        principle: 'As you advance, training must become MORE specific',
        why: 'Less room for error - need to maximize adaptation to exact skill',
      },
      competition_lift_priority: {
        title: 'Competition Lifts First',
        approach: [
          {
            frequency: 'Squat: 2-3x per week',
            intensity: '70-90% most weeks',
            volume: '15-25 working sets per week',
            note: 'Main driver of squat strength',
          },
          {
            frequency: 'Bench: 2-4x per week',
            intensity: '70-90% most weeks',
            volume: '20-30 working sets per week',
            note: 'Bench responds well to frequency',
          },
          {
            frequency: 'Deadlift: 1-2x per week',
            intensity: '70-90%',
            volume: '10-15 working sets per week',
            note: 'Less volume due to fatigue',
          },
        ],
      },
      variation_hierarchy: {
        title: 'Exercise Selection Hierarchy',
        tier_1: {
          name: 'Tier 1: Competition Lifts',
          exercises: 'Back squat, Competition bench, Conventional/Sumo DL',
          frequency: '80-90% of main lift volume',
        },
        tier_2: {
          name: 'Tier 2: Close Variations',
          exercises: 'Pause squats, close grip bench, deficit DL, board press',
          frequency: '10-15% of volume',
        },
        tier_3: {
          name: 'Tier 3: Weak Point Work',
          exercises: 'Front squat, incline, RDL - ONLY if addressing specific weakness',
          frequency: '5-10% of volume',
        },
      },
      bar_path_obsession: {
        title: 'Bar Path & Technique Obsession',
        importance: 'At elite level, 1-2% efficiency = significant weight',
        methods: [
          'Film EVERY heavy set',
          'Analyze bar path (should be identical set to set)',
          'Cues refined to millimeters (not inches)',
          'Groove pattern with sub-maximal work constantly',
        ],
      },
    },
    periodization: {
      name: 'Advanced Periodization',
      icon: 'analytics',
      color: 'emerald',
      block_periodization: {
        title: 'Block Periodization for Elite',
        why: 'Can\'t improve everything at once - focus one quality per block',
        blocks: [
          {
            block: 'Accumulation (4-6 weeks)',
            goal: 'Build muscle, work capacity',
            volume: 'HIGH (near max recoverable)',
            intensity: 'MODERATE (70-80%)',
            reps: '5-10 reps per set',
            variations: 'More variation acceptable',
          },
          {
            block: 'Intensification (3-4 weeks)',
            goal: 'Convert size to strength',
            volume: 'MODERATE',
            intensity: 'HIGH (80-90%)',
            reps: '3-6 reps per set',
            variations: 'More specific, closer to comp lifts',
          },
          {
            block: 'Realization/Peaking (2-3 weeks)',
            goal: 'Express max strength',
            volume: 'LOW',
            intensity: 'VERY HIGH (85-95%+)',
            reps: '1-3 reps per set',
            variations: 'Competition lifts ONLY',
          },
        ],
      },
      conjugate: {
        title: 'Conjugate Method (Westside)',
        overview: 'Popularized by Louie Simmons, used by many elite raw lifters too',
        structure: [
          {
            day: 'Max Effort Lower',
            work: 'Work up to 1-3RM in squat/deadlift variation',
            variations: 'Rotate weekly (box squat, SSB, deficit DL, etc)',
            accessories: 'Posterior chain (glutes, hams)',
          },
          {
            day: 'Max Effort Upper',
            work: 'Work up to 1-3RM in bench variation',
            variations: 'Rotate weekly (close grip, floor press, boards)',
            accessories: 'Triceps, shoulders, upper back',
          },
          {
            day: 'Dynamic Effort Lower',
            work: '8-12 sets of 2 reps @ 50-60% + bands/chains',
            focus: 'SPEED - explosive reps',
            accessories: 'Squat/DL variations',
          },
          {
            day: 'Dynamic Effort Upper',
            work: '8-10 sets of 3 reps @ 50-60% + bands/chains',
            focus: 'SPEED - explosive bench',
            accessories: 'Triceps, shoulders, lats',
          },
        ],
        key_points: [
          'Rotate max effort exercises every 1-3 weeks',
          'Prevent accommodation/staleness',
          'High accessory volume',
          'Advanced method - not for beginners',
        ],
      },
      daily_undulating: {
        title: 'Daily Undulating Periodization (DUP)',
        concept: 'Vary intensity/volume each session',
        example: [
          {
            day: 'Monday - Squat Heavy',
            sets: '5x3 @ 85%',
            focus: 'Max strength',
          },
          {
            day: 'Wednesday - Squat Light',
            sets: '4x8 @ 70%',
            focus: 'Hypertrophy/technique',
          },
          {
            day: 'Friday - Squat Power',
            sets: '8x2 @ 75% (explosive)',
            focus: 'Speed/power',
          },
        ],
        benefits: [
          'Frequent exposure to lift',
          'Multiple stimuli per week',
          'Can recover because of undulation',
          'Good for bench (responds to frequency)',
        ],
      },
    },
    recovery_mastery: {
      name: 'Recovery Mastery',
      icon: 'medical',
      color: 'purple',
      sleep_non_negotiable: {
        title: 'Sleep is Non-Negotiable',
        target: '8-9 hours minimum for elite recovery',
        why: 'Training is SO close to max capacity, need maximum recovery',
        strategies: [
          'Same bedtime every night (even weekends)',
          'Dark, cool room',
          'No screens 1 hour before bed',
          'Consider naps if sleep debt',
        ],
      },
      nutrition_dialed: {
        title: 'Nutrition Must Be Dialed In',
        calories: {
          maintaining: 'Slight surplus (200-300 cal over maintenance)',
          cutting: 'Very slow cut (0.5-1 lb per week max)',
          bulking: 'Moderate surplus (300-500 cal)',
        },
        protein: '1g+ per lb bodyweight',
        timing: 'Meals around training (carbs pre/post)',
        supplements: 'Basics only (creatine, vitamin D, maybe caffeine)',
      },
      injury_prevention: {
        title: 'Injury Prevention is Critical',
        reality: 'One injury can derail 6-12 months of progress',
        strategies: [
          {
            strategy: 'Prehab',
            what: 'Rotator cuff work, core, hip mobility',
            frequency: '10-15 min every session',
          },
          {
            strategy: 'Deload Religiously',
            what: 'Every 3-4 weeks, non-negotiable',
            why: 'Can\'t grind for months straight at this level',
          },
          {
            strategy: 'Listen to Body',
            what: 'If elbow hurts, don\'t bench through it',
            why: 'Small injury becomes big injury fast',
          },
          {
            strategy: 'Soft Tissue Work',
            what: 'Massage, PT, chiro as needed',
            frequency: 'Monthly or more if nagging issues',
          },
        ],
      },
      fatigue_management: {
        title: 'Fatigue Management',
        monitoring: [
          'Track morning resting heart rate (elevated = fatigue)',
          'HRV if available (low = fatigue)',
          'Sleep quality and duration',
          'Subjective readiness (1-10 scale)',
        ],
        autoregulation: 'Use RPE/RIR to adjust daily - rigid percentages don\'t work',
      },
    },
    mental_game: {
      name: 'Mental Game',
      icon: 'headset',
      color: 'red',
      patience: {
        title: 'Extreme Patience Required',
        reality: 'PRs come 1-2x per year, not every cycle',
        mindset: [
          'Process > outcome',
          'Enjoy small improvements (bar speed, technique)',
          'Decades-long view (this is year 8 of 20)',
          'Compare to yourself, not others',
        ],
      },
      handling_plateaus: {
        title: 'Plateaus are Normal',
        expectation: 'May plateau for 6-12 months',
        what_to_do: [
          'Stay consistent (don\'t panic and change everything)',
          'Address weak points methodically',
          'Check lifestyle factors (sleep, stress, nutrition)',
          'Consider coaching if self-coached',
          'Accept that progress isn\'t linear',
        ],
      },
      pressure_management: {
        title: 'Managing Pressure',
        internal: 'Expectations from years of work',
        external: 'Sponsors, fans, social media',
        strategies: [
          'Define success beyond just numbers (enjoy process)',
          'Limit social media comparison',
          'Remember why you started',
          'Have life outside lifting',
        ],
      },
    },
    lifestyle: {
      name: 'Lifestyle Integration',
      icon: 'home',
      color: 'cyan',
      job_considerations: {
        title: 'Job & Career',
        ideal: 'Flexible hours, not physically demanding',
        reality: 'Most elites have regular jobs',
        considerations: [
          'Physical job = harder to recover',
          'High stress job = reduce training volume',
          'Travel = disrupts training/sleep/nutrition',
        ],
      },
      relationships: {
        title: 'Relationships & Family',
        time: 'Training 10-15 hours per week + meal prep + recovery',
        support: 'Need support from spouse/family',
        balance: 'Can\'t neglect relationships for lifting',
      },
      financial: {
        title: 'Financial Reality',
        income: 'Very few make living from powerlifting',
        costs: [
          'Gym membership/home gym',
          'Coaching ($100-500/month)',
          'Meets ($100-300 entry + travel)',
          'Equipment (belt, sleeves, shoes: $300-500)',
          'Food (high protein = expensive)',
          'Recovery (massage, PT: $100-200/month)',
        ],
        total: '$500-1500+ per month all-in',
      },
    },
    programming: {
      name: 'Elite Programming',
      icon: 'construct',
      color: 'indigo',
      sample_year: {
        title: '12-Month Elite Training Plan',
        macrocycle: [
          {
            months: 'Months 1-3: Accumulation',
            goal: 'Build muscle and work capacity',
            volume: 'High volume (near max)',
            intensity: '70-80%',
            variations: 'More variation acceptable',
          },
          {
            months: 'Months 4-6: Intensification',
            goal: 'Build max strength',
            volume: 'Moderate',
            intensity: '80-90%',
            variations: 'Close to competition lifts',
          },
          {
            months: 'Month 7: Competition Prep',
            goal: 'Peak for meet',
            volume: 'Decreasing',
            intensity: '85-95%+',
            variations: 'Competition lifts only',
          },
          {
            months: 'Month 8: Competition + Recovery',
            goal: 'Compete, then recover',
            volume: 'Meet week, then light 2 weeks',
            intensity: 'Max, then 50-60%',
          },
          {
            months: 'Months 9-11: Second Build',
            goal: 'Address weak points from meet',
            volume: 'Progressive overload',
            intensity: '75-85%',
          },
          {
            months: 'Month 12: Second Meet or Off-season',
            goal: 'Compete or deload and reset',
          },
        ],
      },
      sample_week: {
        title: 'Sample Elite Training Week (Intensification Block)',
        monday: {
          day: 'Monday - Squat Focus',
          main: 'Squat: 5x3 @ 85%',
          secondary: 'Pause Squat: 3x3 @ 75%',
          accessories: 'Leg Press 3x10, Hamstring curls 3x12, Core',
        },
        tuesday: {
          day: 'Tuesday - Bench Volume',
          main: 'Bench: 6x5 @ 75%',
          secondary: 'Close Grip: 4x6 @ 75%',
          accessories: 'DB Rows 4x10, Triceps 3x12, Rear delts 3x15',
        },
        wednesday: {
          day: 'Wednesday - OFF or Active Recovery',
        },
        thursday: {
          day: 'Thursday - Deadlift',
          main: 'Deadlift: 4x3 @ 85%',
          secondary: 'RDL: 3x6 @ 70%',
          accessories: 'Pull-ups 3x8, Back extensions 3x12',
        },
        friday: {
          day: 'Friday - Bench Intensity',
          main: 'Bench: 4x2 @ 90%',
          secondary: 'Board Press: 3x4 @ 85%',
          accessories: 'DB Incline 3x8, Face pulls 3x15, Abs',
        },
        saturday: {
          day: 'Saturday - Squat Volume',
          main: 'Front Squat: 4x6 @ 75%',
          secondary: 'Belt Squat: 3x10',
          accessories: 'Lunges 3x8/leg, Hip thrusts 3x12',
        },
      },
      coaching: {
        title: 'Should You Hire a Coach?',
        yes_if: [
          'Plateaued for 6+ months',
          'Competing nationally/internationally',
          'Struggle to self-program',
          'Need accountability',
          'Want outside eyes on technique',
        ],
        no_if: [
          'Can\'t afford it',
          'Enjoy programming yourself',
          'Still making consistent progress',
          'Beginner/intermediate (learn to self-coach first)',
        ],
        cost: '$100-500/month depending on coach',
      },
    },
  };

  const currentPrinciple = eliteData[selectedPrinciple as keyof typeof eliteData];

  const getColorClass = (color: string) => {
    const colors: { [key: string]: string } = {
      amber: 'bg-amber-500',
      blue: 'bg-primary',
      emerald: 'bg-primary',
      purple: 'bg-purple-500',
      red: 'bg-red-500',
      cyan: 'bg-cyan-500',
      indigo: 'bg-indigo-500',
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
            Elite Training Principles
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          <View className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl p-6 mb-6">
            <Text className="text-white text-2xl font-bold mb-2">Elite Level Training</Text>
            <Text className="text-white opacity-90">
              What separates advanced from elite lifters
            </Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6">
            <View className="flex-row gap-3 px-1">
              {Object.entries(eliteData).map(([key, principle]) => (
                <TouchableOpacity
                  key={key}
                  onPress={() => setSelectedPrinciple(key)}
                  className={`${
                    selectedPrinciple === key 
                      ? getColorClass(principle.color)
                      : 'bg-zinc-900'
                  } rounded-xl p-4 border ${
                    selectedPrinciple === key 
                      ? 'border-white/30'
                      : 'border-zinc-800'
                  } min-w-[160px]`}
                >
                  <Ionicons 
                    name={principle.icon as any} 
                    size={32} 
                    color={selectedPrinciple === key ? 'white' : '#a1a1aa'} 
                  />
                  <Text className={`${selectedPrinciple === key ? 'text-white' : 'text-zinc-400'} font-bold mt-2 text-sm`}>
                    {principle.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          {/* Content placeholder */}
          <View className="bg-amber-500/10 rounded-xl p-6 border border-amber-500/30 mb-6">
            <Ionicons name={currentPrinciple.icon as any} size={32} color="#FFEA00" />
            <Text className="text-amber-400 font-bold text-lg mt-3 mb-2">
              {currentPrinciple.name}
            </Text>
            <Text className="text-amber-300 text-sm">
              Detailed content for {currentPrinciple.name}...
            </Text>
          </View>

          <View className="bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-xl p-5 border border-red-500/30 mb-6">
            <Text className="text-red-400 font-bold text-lg mb-3">Elite Reality Check</Text>
            <Text className="text-red-300 text-sm mb-2">
              ⚡ Requires 7-15+ years of consistent training
            </Text>
            <Text className="text-red-300 text-sm mb-2">
              ⚡ PRs come 1-2x per YEAR, not every cycle
            </Text>
            <Text className="text-red-300 text-sm mb-2">
              ⚡ Lifestyle must fully support training
            </Text>
            <Text className="text-red-300 text-sm mb-2">
              ⚡ Recovery is as important as training
            </Text>
            <Text className="text-red-300 text-sm mb-2">
              ⚡ Injury management critical - one injury = 6-12 months lost
            </Text>
            <Text className="text-red-300 text-sm">
              ⚡ Process &gt; outcome - enjoy small improvements
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

