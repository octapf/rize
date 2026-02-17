import React, { useState } from 'react';
import { Text } from '@/components/ui/Text';
import { View, TouchableOpacity, ScrollView } from 'react-native';;
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function LifetimeProgression() {
  const [selectedDecade, setSelectedDecade] = useState('overview');

  const progressionData = {
    overview: {
      name: 'Overview',
      icon: 'map',
      color: 'blue',
      concept: {
        title: 'Lifetime Progression Roadmap',
        vision: 'Powerlifting as a 20-40+ year journey',
        phases: [
          'Years 1-3: Foundation & Rapid Progress',
          'Years 3-7: Intermediate Development',
          'Years 7-12: Advanced & Competitive',
          'Years 12+: Elite & Mastery',
          'Years 20+: Longevity & Adaptation',
        ],
      },
      realistic_expectations: {
        title: 'Realistic Timeline to Strength Levels',
        beginner: {
          level: 'Beginner (Untrained → Novice)',
          time: '0-6 months',
          progress: 'Rapid - PR every session possible',
        },
        intermediate: {
          level: 'Intermediate',
          time: '6 months - 2 years',
          progress: 'Fast - PR every month or two',
        },
        advanced: {
          level: 'Advanced',
          time: '2-5 years',
          progress: 'Moderate - PR every 3-6 months',
        },
        elite: {
          level: 'Elite',
          time: '5-10+ years',
          progress: 'Slow - PR 1-2x per year',
        },
      },
      key_principle: 'Each phase builds on previous - can\'t skip steps',
    },
    years_1_3: {
      name: 'Years 1-3: Foundation',
      icon: 'home',
      color: 'primary',
      characteristics: {
        title: 'What Defines This Phase',
        attributes: [
          'Newbie gains - rapid progress',
          'Learning technique',
          'Building work capacity',
          'Figuring out what works for you',
          'Lots of mistakes (that\'s okay!)',
        ],
      },
      strength_gains: {
        title: 'Expected Strength Gains',
        men: {
          year_1: 'Squat: 135 → 315, Bench: 95 → 225, Dead: 185 → 405',
          year_2: 'Squat: 315 → 405, Bench: 225 → 275, Dead: 405 → 495',
          year_3: 'Squat: 405 → 455, Bench: 275 → 315, Dead: 495 → 545',
          note: 'VERY rough estimates - huge individual variation',
        },
        women: {
          year_1: 'Squat: 95 → 185, Bench: 65 → 135, Dead: 135 → 245',
          year_2: 'Squat: 185 → 245, Bench: 135 → 165, Dead: 245 → 315',
          year_3: 'Squat: 245 → 275, Bench: 165 → 185, Dead: 315 → 365',
        },
      },
      training_approach: {
        title: 'Training Approach',
        frequency: '3-4 days per week',
        programming: 'Linear periodization, simple programs work great',
        volume: 'Moderate (12-18 sets per lift per week)',
        variations: 'Keep it simple - competition lifts + close variations',
        accessories: 'Basic stuff - rows, lunges, core',
      },
      mistakes_to_avoid: {
        title: 'Common Mistakes Years 1-3',
        errors: [
          {
            mistake: 'Program Hopping',
            why_bad: 'No time to see if program works',
            fix: 'Stick to program 12-16 weeks minimum',
          },
          {
            mistake: 'Chasing 1RMs',
            why_bad: 'Burnt out, no base built',
            fix: 'Test max 2-3x per year only',
          },
          {
            mistake: 'Ignoring Technique',
            why_bad: 'Builds bad habits, injury risk',
            fix: 'Film sets, focus on form',
          },
          {
            mistake: 'Too Much Accessory Work',
            why_bad: 'Wastes recovery on non-essentials',
            fix: 'Main lifts + 3-4 accessories max',
          },
        ],
      },
    },
    years_3_7: {
      name: 'Years 3-7: Intermediate',
      icon: 'trending-up',
      color: 'purple',
      characteristics: {
        title: 'Intermediate Phase Characteristics',
        attributes: [
          'Linear progression stops working',
          'Need real periodization',
          'Weak points become apparent',
          'Technique mostly solid',
          'Competing locally/regionally',
        ],
      },
      strength_gains: {
        title: 'Expected Gains (per year)',
        men: 'Squat: +30-60 lbs, Bench: +20-40 lbs, Dead: +30-60 lbs',
        women: 'Squat: +20-40 lbs, Bench: +10-25 lbs, Dead: +20-40 lbs',
        note: 'Slowing down significantly from year 1-3',
      },
      training_approach: {
        title: 'Training Evolution',
        frequency: '4-5 days per week',
        programming: 'Block periodization, DUP, or conjugate',
        volume: 'Higher (15-25 sets per lift per week)',
        variations: 'Add variations to address weak points',
        accessories: 'More targeted - fix specific issues',
        deloads: 'Every 3-4 weeks mandatory',
      },
      focus_areas: {
        title: 'Key Focus Areas',
        priorities: [
          {
            area: 'Weak Point Work',
            approach: 'Identify and systematically address',
            example: 'Lockout weak? Add board press, chains',
          },
          {
            area: 'Volume Progression',
            approach: 'Gradually increase sets over years',
            example: 'Year 3: 15 sets, Year 7: 22 sets',
          },
          {
            area: 'Recovery Optimization',
            approach: 'Sleep, nutrition, stress management',
            example: '8+ hours sleep, track food',
          },
          {
            area: 'Meet Preparation',
            approach: 'Learn how to peak properly',
            example: 'Compete 2-3x per year',
          },
        ],
      },
    },
    years_7_12: {
      name: 'Years 7-12: Advanced',
      icon: 'ribbon',
      color: 'amber',
      characteristics: {
        title: 'Advanced Lifter Traits',
        attributes: [
          'Closing in on genetic potential',
          'Competitive at state/national level',
          'Very refined technique',
          'Know your body extremely well',
          'Progress is SLOW',
        ],
      },
      strength_gains: {
        title: 'Expected Annual Gains',
        men: 'Squat: +15-30 lbs, Bench: +10-20 lbs, Dead: +15-30 lbs',
        women: 'Squat: +10-20 lbs, Bench: +5-15 lbs, Dead: +10-20 lbs',
        reality: 'Some years: no PR. That\'s normal.',
      },
      training_complexity: {
        title: 'Training Becomes Complex',
        specificity: 'Competition lifts 80-90% of volume',
        periodization: 'Long blocks (12-20 weeks)',
        recovery: 'Absolutely critical - can\'t cut corners',
        lifestyle: 'Must be dialed in (sleep, stress, nutrition)',
      },
      challenges: {
        title: 'Unique Challenges',
        issues: [
          {
            challenge: 'Motivation',
            why: 'Hard to stay motivated without frequent PRs',
            solution: 'Process goals, enjoy training',
          },
          {
            challenge: 'Injury Risk',
            why: 'Years of heavy training = wear and tear',
            solution: 'Prehab, deloads, listen to body',
          },
          {
            challenge: 'Plateaus',
            why: 'Near genetic limits',
            solution: 'Patience, small tweaks, coaching',
          },
          {
            challenge: 'Life Balance',
            why: '10-15 hrs/week training',
            solution: 'Supportive relationships, flexibility',
          },
        ],
      },
    },
    years_12_plus: {
      name: 'Years 12+: Elite & Mastery',
      icon: 'trophy',
      color: 'red',
      characteristics: {
        title: 'Elite/Master Lifter',
        attributes: [
          'At or near genetic potential',
          'Competitive nationally/internationally',
          'Training is a lifestyle',
          'May have coaching career too',
          'Wealth of experience',
        ],
      },
      strength_gains: {
        title: 'Progress Reality',
        gains: 'Total: +10-30 lbs per year (if lucky)',
        some_years: 'Zero PRs - maintaining is winning',
        focus: 'Refining technique, staying healthy',
      },
      training_wisdom: {
        title: 'Training at Elite Level',
        lessons: [
          'Boring is good - don\'t chase variety',
          'Recovery is training',
          'Injury prevention > everything',
          'Know when to push, when to back off',
          'Autoregulation is essential',
        ],
      },
      beyond_competition: {
        title: 'Beyond Competition',
        options: [
          {
            path: 'Coaching',
            description: 'Share knowledge with next generation',
          },
          {
            path: 'Longevity Lifting',
            description: 'Shift focus to health, staying strong',
          },
          {
            path: 'Masters Competition',
            description: 'Compete in age divisions',
          },
          {
            path: 'Hybrid Athlete',
            description: 'Add other training modalities',
          },
        ],
      },
    },
    years_20_plus: {
      name: 'Years 20+: Longevity',
      icon: 'heart',
      color: 'rose',
      philosophy: {
        title: 'Longevity Mindset',
        goal: 'Stay strong and healthy for life',
        shift: 'From "how much can I lift" to "how long can I keep lifting"',
      },
      training_adaptation: {
        title: 'Training Adaptations',
        changes: [
          {
            aspect: 'Volume',
            adjustment: 'May need to reduce slightly',
            why: 'Recovery capacity decreases with age',
          },
          {
            aspect: 'Intensity',
            adjustment: 'Can still lift heavy, but smarter',
            why: 'Joints need more care',
          },
          {
            aspect: 'Frequency',
            adjustment: 'May reduce to 3-4x per week',
            why: 'More recovery time needed',
          },
          {
            aspect: 'Exercise Selection',
            adjustment: 'More variations, less grinding',
            why: 'Joint health paramount',
          },
        ],
      },
      masters_competition: {
        title: 'Masters Powerlifting',
        divisions: 'Age groups: 40-44, 45-49, 50-54, etc.',
        records: 'World records in masters divisions are impressive!',
        approach: 'Compete against your age group',
      },
      health_focus: {
        title: 'Health-First Approach',
        priorities: [
          'Joint health (glucosamine, mobility work)',
          'Cardiovascular health (add light cardio)',
          'Balance and flexibility',
          'Mental health (lifting as stress relief)',
          'Social aspects (gym community)',
        ],
      },
      inspiration: {
        title: 'Inspiration',
        examples: [
          '60 year olds squatting 500+ lbs',
          '70 year olds competing and setting records',
          'People lifting into their 80s',
        ],
        message: 'Powerlifting can be a lifetime sport if you\'re smart',
      },
    },
    practical: {
      name: 'Practical Application',
      icon: 'construct',
      color: 'cyan',
      self_assessment: {
        title: 'Where Are You?',
        questions: [
          {
            q: 'How long training seriously?',
            guide: '<1 yr: Foundation, 1-3 yrs: Late foundation, 3-7 yrs: Intermediate, 7+ yrs: Advanced+',
          },
          {
            q: 'How often do you PR?',
            guide: 'Every session: Beginner, Monthly: Intermediate, 3-6 mo: Advanced, 1-2x yr: Elite',
          },
          {
            q: 'How\'s your technique?',
            guide: 'Learning: Foundation, Solid: Intermediate, Refined: Advanced, Automatic: Elite',
          },
        ],
      },
      planning_ahead: {
        title: 'Planning Your Lifting Career',
        year_1_3: {
          phase: 'Years 1-3',
          goals: 'Build base, learn technique, enjoy rapid progress',
          training: 'Simple programs, focus on compounds',
        },
        year_3_7: {
          phase: 'Years 3-7',
          goals: 'Address weak points, compete locally',
          training: 'Real periodization, higher volume',
        },
        year_7_12: {
          phase: 'Years 7-12',
          goals: 'Competitive at high level, near potential',
          training: 'Complex programming, lifestyle support',
        },
        year_12_plus: {
          phase: 'Years 12+',
          goals: 'Elite performance or transition to longevity',
          training: 'Mastery, injury prevention',
        },
      },
      milestone_guide: {
        title: 'Milestone Guide (Example: 220 lb man)',
        milestones: [
          {
            level: '1 Year',
            total: '900-1100 lbs',
            wilks: '280-330',
          },
          {
            level: '3 Years',
            total: '1200-1400 lbs',
            wilks: '350-400',
          },
          {
            level: '5 Years',
            total: '1400-1600 lbs',
            wilks: '400-450',
          },
          {
            level: '10 Years',
            total: '1600-1800 lbs',
            wilks: '450-500',
          },
        ],
        note: 'HUGE variation based on genetics, consistency, etc.',
      },
    },
  };

  const currentDecade = progressionData[selectedDecade as keyof typeof progressionData];

  const getColorClass = (color: string) => {
    const colors: { [key: string]: string } = {
      blue: 'bg-primary',
      primary: 'bg-primary',
      purple: 'bg-purple-500',
      amber: 'bg-amber-500',
      red: 'bg-red-500',
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
            Lifetime Progression Roadmap
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          <View className="bg-gradient-to-r from-primary to-[#7D0EBE] rounded-xl p-6 mb-6">
            <Text className="text-white text-2xl font-bold mb-2">Your Lifting Journey</Text>
            <Text className="text-white opacity-90">
              Decade-by-decade progression roadmap
            </Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6">
            <View className="flex-row gap-3 px-1">
              {Object.entries(progressionData).map(([key, decade]) => (
                <TouchableOpacity
                  key={key}
                  onPress={() => setSelectedDecade(key)}
                  className={`${
                    selectedDecade === key 
                      ? getColorClass(decade.color)
                      : 'bg-zinc-900'
                  } rounded-xl p-4 border ${
                    selectedDecade === key 
                      ? 'border-white/30'
                      : 'border-zinc-800'
                  } min-w-[160px]`}
                >
                  <Ionicons 
                    name={decade.icon as any} 
                    size={32} 
                    color={selectedDecade === key ? 'white' : '#a1a1aa'} 
                  />
                  <Text className={`${selectedDecade === key ? 'text-white' : 'text-zinc-400'} font-bold mt-2 text-sm`}>
                    {decade.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          {/* Content placeholder */}
          <View className="bg-purple-500/10 rounded-xl p-6 border border-purple-500/30 mb-6">
            <Ionicons name={currentDecade.icon as any} size={32} color="#a855f7" />
            <Text className="text-purple-400 font-bold text-lg mt-3 mb-2">
              {currentDecade.name}
            </Text>
            <Text className="text-purple-300 text-sm">
              Detailed content for {currentDecade.name}...
            </Text>
          </View>

          <View className="bg-gradient-to-r from-primary/20 to-cyan-500/20 rounded-xl p-5 border border-primary/30 mb-6">
            <Text className="text-primary font-bold text-lg mb-3">Progression Timeline</Text>
            <Text className="text-primary/80 text-sm mb-2">
              📅 Years 1-3: Foundation - rapid progress, learning
            </Text>
            <Text className="text-primary/80 text-sm mb-2">
              📅 Years 3-7: Intermediate - real programming, competition
            </Text>
            <Text className="text-primary/80 text-sm mb-2">
              📅 Years 7-12: Advanced - closing in on potential
            </Text>
            <Text className="text-primary/80 text-sm mb-2">
              📅 Years 12+: Elite - at/near genetic limits
            </Text>
            <Text className="text-primary/80 text-sm">
              📅 Years 20+: Longevity - smart training for life
            </Text>
          </View>

          <View className="bg-amber-500/10 rounded-xl p-5 border border-amber-500/30 mb-6">
            <Text className="text-amber-400 font-bold text-lg mb-3">Key Principle</Text>
            <Text className="text-amber-300 text-sm">
              💡 Each phase builds on the previous - you can't skip steps. A strong foundation in years 1-3 determines your ceiling years 10-20. Patience and consistency over decades beats intensity without longevity.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}



