import React, { useState } from 'react';
import { Text } from '@/components/ui/Text';
import { View, TouchableOpacity, ScrollView } from 'react-native';;
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function SpecialtyBars() {
  const [selectedBar, setSelectedBar] = useState('overview');

  const barData = {
    overview: {
      name: 'Overview',
      icon: 'list',
      color: 'blue',
      why_use: {
        title: 'Why Use Specialty Bars?',
        reasons: [
          'Address weak points in lifts',
          'Work around injuries or limitations',
          'Add training variety',
          'Develop different strength qualities',
          'Prepare for equipped lifting',
          'Build muscle from different angles',
        ],
      },
      when_to_use: {
        title: 'When to Incorporate',
        good_timing: [
          'Intermediate+ lifter (1+ years)',
          'Have identified weak points',
          'Working around injury',
          'In accumulation/hypertrophy block',
          'Need variety from plateau',
        ],
        bad_timing: [
          'Complete beginner (learn straight bar first)',
          'Close to meet (specificity matters)',
          'Don\'t have access to bars',
          'Technique still inconsistent with regular bar',
        ],
      },
      general_principles: [
        'Not a replacement for competition lifts (usually)',
        'Best as secondary/accessory work',
        'Allow 2-3 sessions to adapt to new bar',
        'Don\'t max out first time - groove pattern first',
        'Different bars = different leverages = different weights',
      ],
    },
    ssb: {
      name: 'Safety Squat Bar (SSB)',
      icon: 'shield-checkmark',
      color: 'primary',
      description: {
        what: 'Cambered bar with padding and handles in front',
        weight: 'Typically 60-70 lbs (vs 45 lbs regular bar)',
        feel: 'Bar sits lower, pulls you forward more',
      },
      benefits: {
        title: 'Benefits of SSB',
        advantages: [
          {
            benefit: 'Shoulder Friendly',
            why: 'Hands on handles, not behind back - great for shoulder issues',
          },
          {
            benefit: 'Quad Emphasis',
            why: 'Forward weight distribution = more upright = more quads',
          },
          {
            benefit: 'Upper Back Work',
            why: 'Have to fight bar trying to fold you - builds thoracic strength',
          },
          {
            benefit: 'Core Strength',
            why: 'Instability requires more core bracing',
          },
          {
            benefit: 'Good Morning Correction',
            why: 'Can\'t good morning squat - bar will fold you',
          },
        ],
      },
      uses: {
        title: 'How to Use SSB',
        applications: [
          {
            use: 'Main Squat Variation',
            when: 'Shoulder injury prevents back squat',
            programming: '4-6 sets of 4-6 reps @ 70-80%',
            note: 'Expect 10-20% less than back squat initially',
          },
          {
            use: 'Secondary Squat',
            when: 'After competition squat',
            programming: '3-4 sets of 6-8 reps @ 65-75%',
            note: 'Hypertrophy focus, quad building',
          },
          {
            use: 'Good Mornings',
            when: 'Hamstring/posterior chain work',
            programming: '3 sets of 8-10 reps @ 40-50% back squat',
            note: 'SSB good mornings are brutal - start light',
          },
        ],
      },
      tips: {
        title: 'SSB Tips',
        advice: [
          'Expect to be more upright than regular squat',
          'Weight will feel heavier - that\'s normal',
          'First few sessions: just learn the groove',
          'Don\'t chase PRs on SSB - it\'s a tool not a test',
          'Great on high volume days - less shoulder stress',
        ],
      },
    },
    trap_bar: {
      name: 'Trap Bar / Hex Bar',
      icon: 'hexagon',
      color: 'purple',
      description: {
        what: 'Hexagonal bar you stand inside',
        weight: 'Usually 45-65 lbs',
        handles: 'Most have high handles (easier) and low handles (harder)',
      },
      benefits: {
        title: 'Benefits of Trap Bar',
        advantages: [
          {
            benefit: 'Natural Position',
            why: 'Hands at sides = more natural, less technical than conventional DL',
          },
          {
            benefit: 'Lower Back Friendly',
            why: 'More upright torso = less shear on spine',
          },
          {
            benefit: 'Quad Involvement',
            why: 'More like squat-deadlift hybrid, hits quads more',
          },
          {
            benefit: 'Easier to Load Heavy',
            why: 'Better leverages = can typically lift more than conventional',
          },
          {
            benefit: 'Great for Athletes',
            why: 'Mimics jumping mechanics, good for power development',
          },
        ],
      },
      uses: {
        title: 'Trap Bar Applications',
        applications: [
          {
            use: 'Deadlift Substitute',
            when: 'Back injury or technique issues',
            programming: '4-5 sets of 3-5 reps @ 75-85%',
            note: 'Can often lift 10-20% more than conventional DL',
          },
          {
            use: 'Volume Work',
            when: 'After heavy conventional deadlifts',
            programming: '3-4 sets of 6-10 reps @ 60-70%',
            note: 'Less fatiguing, good for hypertrophy',
          },
          {
            use: 'Jumps / Explosive',
            when: 'Power development',
            programming: '5-8 sets of 3-5 jumps @ 30-40% conventional DL max',
            note: 'Land softly, focus on speed',
          },
        ],
      },
      high_vs_low: {
        title: 'High Handles vs Low Handles',
        comparison: [
          {
            aspect: 'ROM',
            high: 'Shorter - easier, less bend',
            low: 'Longer - harder, more like straight bar',
          },
          {
            aspect: 'Weight',
            high: 'Can lift 10-15% more',
            low: 'Similar to conventional deadlift',
          },
          {
            aspect: 'Use',
            high: 'Heavy loads, injury work',
            low: 'More like competition deadlift',
          },
        ],
      },
      cautions: {
        title: 'Trap Bar Cautions',
        warnings: [
          'NOT the same as conventional deadlift - different pattern',
          'Easy to turn into squat - keep hips higher',
          'Don\'t count trap bar PR as deadlift PR (not same lift)',
          'Watch for rounding still - being "easier" doesn\'t mean sloppy',
        ],
      },
    },
    cambered_bar: {
      name: 'Cambered Bar',
      icon: 'shuffle',
      color: 'amber',
      description: {
        what: 'Bar with significant arch/curve in it',
        weight: 'Usually 45-55 lbs',
        types: 'Squat cambered bar (arch down) or bench camber (arch up)',
      },
      squat_camber: {
        title: 'Cambered Squat Bar',
        description: 'Bar curves down 12-18 inches below shoulders',
        benefits: [
          'Greater ROM - bar lower = deeper squat',
          'Increased stability demands',
          'Eccentric overload - bar swings/oscillates',
          'Builds bottom position strength',
          'Unique stimulus',
        ],
        uses: [
          {
            use: 'Bottom Position Strength',
            programming: '3-4 sets of 2-5 reps @ 60-70%',
            note: 'Expect 20-30% less weight - ROM is much longer',
          },
          {
            use: 'Controlled Eccentric',
            programming: '4 sets of 3 reps, 5 second descent',
            note: 'Bar wants to oscillate - fight to control it',
          },
        ],
        tips: [
          'VERY challenging - start light (like 50% of back squat)',
          'Bar will swing - that\'s the point, but control it',
          'Spotters essential - different feel',
          'Not for beginners - advanced only',
        ],
      },
      bench_camber: {
        title: 'Cambered Bench Bar',
        description: 'Bar curves up, hands start higher than chest',
        benefits: [
          'Longer ROM - can go deeper than chest',
          'Pec stretch at bottom',
          'Builds bottom position strength',
          'Teaches control - bar is unstable',
          'Good for muscle building',
        ],
        uses: [
          {
            use: 'Hypertrophy Work',
            programming: '3-4 sets of 6-10 reps @ 60-70%',
            note: 'Focus on stretch and control, not weight',
          },
          {
            use: 'Bottom Position',
            programming: '4 sets of 3-5 reps with pause',
            note: 'Pausing at deepest point builds strength',
          },
        ],
        cautions: [
          'Easy to go too deep - be careful',
          'Shoulder mobility required',
          'Not for everyone - some shoulders don\'t like it',
          'Expect 15-25% less than regular bench',
        ],
      },
    },
    football_bar: {
      name: 'Football Bar / Swiss Bar',
      icon: 'american-football',
      color: 'red',
      description: {
        what: 'Multi-grip bar with parallel handles',
        weight: 'Typically 35-45 lbs',
        grips: 'Usually 3-4 different width neutral grip options',
      },
      benefits: {
        title: 'Football Bar Benefits',
        advantages: [
          {
            benefit: 'Shoulder Friendly',
            why: 'Neutral grip = less shoulder internal rotation stress',
          },
          {
            benefit: 'Tricep Emphasis',
            why: 'Narrow neutral grip hits triceps hard',
          },
          {
            benefit: 'Elbow Friendly',
            why: 'Natural hand position = less elbow strain',
          },
          {
            benefit: 'Versatile',
            why: 'Multiple grip widths = different emphases',
          },
        ],
      },
      uses: {
        title: 'Football Bar Uses',
        applications: [
          {
            use: 'Bench Press Substitute',
            when: 'Shoulder pain with regular bench',
            programming: '4-5 sets of 4-6 reps',
            grips: 'Wide grips = more chest, narrow = more triceps',
          },
          {
            use: 'Overhead Press',
            when: 'Shoulder mobility limitations',
            programming: '3-4 sets of 6-8 reps',
            note: 'Neutral grip often more comfortable than straight bar',
          },
          {
            use: 'Floor Press',
            when: 'Lockout work, joint-friendly pressing',
            programming: '4 sets of 3-5 reps @ 75-85%',
            note: 'Hits triceps hard, easy on shoulders',
          },
        ],
      },
      grip_selection: {
        title: 'Which Grip to Use',
        guidelines: [
          {
            grip: 'Wide Handles (outside)',
            emphasis: 'More chest, less triceps',
            use: 'Similar to wide grip bench',
          },
          {
            grip: 'Medium Handles',
            emphasis: 'Balanced chest and triceps',
            use: 'Most common, good all-around',
          },
          {
            grip: 'Narrow Handles (inside)',
            emphasis: 'Tricep dominant',
            use: 'Like close-grip bench',
          },
        ],
      },
    },
    programming: {
      name: 'Programming Guide',
      icon: 'calendar',
      color: 'cyan',
      integration: {
        title: 'How to Program Specialty Bars',
        approaches: [
          {
            method: 'Rotating Main Lift',
            structure: 'Week 1-3: Regular bar → Week 4-6: Specialty bar',
            example: 'SSB for 3 weeks, back to comp squat for 3 weeks',
            when: 'Off-season, working weak points',
          },
          {
            method: 'Secondary Movement',
            structure: 'Main lift: Competition bar → Second lift: Specialty bar',
            example: 'Back squat 5x3, then SSB 3x8',
            when: 'Most common approach, close to meet',
          },
          {
            method: 'Dedicated Day',
            structure: 'Heavy day competition bar, volume day specialty bar',
            example: 'Monday: Back squat heavy, Thursday: SSB volume',
            when: 'High frequency training',
          },
        ],
      },
      sample_program: {
        title: '12-Week Specialty Bar Integration',
        weeks_1_4: {
          phase: 'Weeks 1-4: Introduction',
          monday: 'Squat: 4x5 @ 75% → SSB: 3x8 @ 65%',
          wednesday: 'Bench: 4x6 @ 75% → Football bar: 3x8',
          friday: 'Deadlift: 4x4 @ 80% → Trap bar: 3x6 @ 70%',
        },
        weeks_5_8: {
          phase: 'Weeks 5-8: Main Specialty Work',
          monday: 'SSB: 5x5 @ 75% (MAIN LIFT)',
          wednesday: 'Football bar: 5x5 @ 80%',
          friday: 'Trap bar: 4x5 @ 80%',
        },
        weeks_9_12: {
          phase: 'Weeks 9-12: Back to Competition',
          monday: 'Squat: 4x3 @ 85% (building to meet)',
          wednesday: 'Bench: 4x3 @ 85%',
          friday: 'Deadlift: 3x3 @ 87%',
          note: 'Drop specialty bars, focus on specificity',
        },
      },
      guidelines: {
        title: 'General Guidelines',
        rules: [
          'Don\'t use all specialty bars at once - pick 1-2',
          'Expect weights to be different - that\'s OK',
          'Allow 2-3 weeks to adapt to new bar',
          'Drop specialty bars 6-8 weeks before meet',
          'Use for volume work more than max effort',
          'Track separately - SSB PR ≠ back squat PR',
        ],
      },
    },
  };

  const currentBar = barData[selectedBar as keyof typeof barData];

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
            Specialty Bar Applications
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          <View className="bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl p-6 mb-6">
            <Text className="text-white text-2xl font-bold mb-2">Specialty Bars</Text>
            <Text className="text-white opacity-90">
              SSB, Trap Bar, Cambered, Football Bar & More
            </Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6">
            <View className="flex-row gap-3 px-1">
              {Object.entries(barData).map(([key, bar]) => (
                <TouchableOpacity
                  key={key}
                  onPress={() => setSelectedBar(key)}
                  className={`${
                    selectedBar === key 
                      ? getColorClass(bar.color)
                      : 'bg-zinc-900'
                  } rounded-xl p-4 border ${
                    selectedBar === key 
                      ? 'border-white/30'
                      : 'border-zinc-800'
                  } min-w-[160px]`}
                >
                  <Ionicons 
                    name={bar.icon as any} 
                    size={32} 
                    color={selectedBar === key ? 'white' : '#a1a1aa'} 
                  />
                  <Text className={`${selectedBar === key ? 'text-white' : 'text-zinc-400'} font-bold mt-2`}>
                    {bar.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          {/* Content placeholder */}
          <View className="bg-primary/10 rounded-xl p-6 border border-primary/30 mb-6">
            <Ionicons name={currentBar.icon as any} size={32} color="#9D12DE" />
            <Text className="text-primary font-bold text-lg mt-3 mb-2">
              {currentBar.name}
            </Text>
            <Text className="text-primary/80 text-sm">
              Detailed content for {currentBar.name}...
            </Text>
          </View>

          <View className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl p-5 border border-primary/30 mb-6">
            <Text className="text-primary/80 font-bold text-lg mb-3">Key Principles</Text>
            <Text className="text-primary/60 text-sm mb-2">
              • Specialty bars are tools, not replacements (usually)
            </Text>
            <Text className="text-primary/60 text-sm mb-2">
              • Best for secondary work or addressing weak points
            </Text>
            <Text className="text-primary/60 text-sm mb-2">
              • SSB: Shoulder-friendly, quad emphasis
            </Text>
            <Text className="text-primary/60 text-sm mb-2">
              • Trap Bar: Back-friendly deadlift variation
            </Text>
            <Text className="text-primary/60 text-sm mb-2">
              • Football Bar: Neutral grip pressing for joint health
            </Text>
            <Text className="text-primary/60 text-sm">
              • Drop specialty bars 6-8 weeks before competition
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}


