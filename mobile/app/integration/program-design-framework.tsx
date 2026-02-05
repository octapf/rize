import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function ProgramDesignFramework() {
  const [selectedPhase, setSelectedPhase] = useState('assessment');

  const designData = {
    assessment: {
      name: 'Assess Yourself',
      icon: 'analytics',
      color: 'blue',
      questions: {
        title: 'Answer These First',
        categories: [
          {
            category: 'Experience Level',
            questions: [
              'How long training consistently? (months/years)',
              'Current 1RMs or best recent lifts?',
              'Rate of progress last 6 months?',
              'Previous injuries or limitations?',
            ],
            why: 'Determines appropriate program complexity',
          },
          {
            category: 'Available Resources',
            questions: [
              'How many days per week can you train?',
              'How long per session? (1hr? 2hrs?)',
              'What equipment access? (full gym? home?)',
              'Training alone or with partners/coach?',
            ],
            why: 'Shapes realistic program structure',
          },
          {
            category: 'Goals & Timeline',
            questions: [
              'Specific goal? (compete? total? individual lift?)',
              'Timeline? (12 weeks? 6 months? offseason?)',
              'Priorities? (all lifts equal? focus one?)',
              'Other training? (sports? fitness goals?)',
            ],
            why: 'Determines program focus and periodization',
          },
          {
            category: 'Recovery Capacity',
            questions: [
              'Sleep quality and quantity typically?',
              'Stress level? (work, school, life)',
              'Nutrition consistent or variable?',
              'How do you recover from hard training?',
            ],
            why: 'Dictates appropriate volume and frequency',
          },
        ],
      },
      level_determination: {
        title: 'Choose Your Template',
        levels: [
          {
            level: 'Beginner (0-6 months)',
            program_type: 'Linear Progression',
            frequency: '3-4x per week, full body',
            volume: 'Moderate, focus on practice',
            intensity: 'Mostly 70-85%',
            example: 'Starting Strength, StrongLifts, GZCLP',
          },
          {
            level: 'Novice (6-18 months)',
            program_type: 'Weekly Progression / Light-Medium-Heavy',
            frequency: '3-5x per week, varied',
            volume: 'Moderate to high',
            intensity: '70-90%, some heavy singles',
            example: 'Texas Method, Madcow, 5/3/1 Beginner',
          },
          {
            level: 'Intermediate (1.5-3+ years)',
            program_type: 'Block Periodization / DUP',
            frequency: '3-5x per week, specific',
            volume: 'High during blocks, tapering',
            intensity: '65-95% depending on block',
            example: 'Calgary Barbell, TSA Intermediate, Juggernaut',
          },
          {
            level: 'Advanced (3+ years)',
            program_type: 'Customized Periodization',
            frequency: '4-6x per week, very specific',
            volume: 'Highly individualized',
            intensity: 'Strategic, wave loading, conjugate',
            example: 'Custom programs, Sheiko, Westside-Barbell',
          },
        ],
      },
    },
    structure: {
      name: 'Program Structure',
      icon: 'grid',
      color: 'emerald',
      weekly_split: {
        title: 'Weekly Training Split Options',
        splits: [
          {
            name: '3-Day Full Body',
            structure: 'Mon-Wed-Fri: All lifts each day',
            pros: ['High frequency', 'Good for beginners', 'Flexible schedule'],
            cons: ['Long sessions', 'Fatigue management crucial', 'Limited variation'],
            best_for: 'Beginners, busy schedules',
          },
          {
            name: '4-Day Upper/Lower',
            structure: 'Mon/Thu: Squat+accessories, Tue/Fri: Bench/Dead+accessories',
            pros: ['Balanced', 'Adequate recovery', 'Good volume distribution'],
            cons: ['Miss a day = missed lift', 'Can be long sessions'],
            best_for: 'Intermediate lifters',
          },
          {
            name: '4-Day DUP (Daily Undulating)',
            structure: 'Each day different intensity/volume for each lift',
            pros: ['High frequency', 'Variety', 'Multiple stimuli'],
            cons: ['Complex to program', 'Fatigue management tricky'],
            best_for: 'Intermediate/Advanced',
          },
          {
            name: '5-Day Split',
            structure: 'Mon: Squat, Tue: Bench, Wed: Dead, Thu: Squat, Fri: Bench',
            pros: ['High frequency', 'Focused sessions', 'Maximum specificity'],
            cons: ['Time commitment', 'Recovery demanding', 'Can be repetitive'],
            best_for: 'Advanced, meet prep',
          },
          {
            name: '6-Day PPL (Push/Pull/Legs)',
            structure: 'Mon/Thu: Legs, Tue/Fri: Push, Wed/Sat: Pull',
            pros: ['High volume possible', 'Bodybuilding crossover', 'Muscle focus'],
            cons: ['Less powerlifting specific', 'Very high time commitment'],
            best_for: 'Off-season, building muscle',
          },
        ],
      },
      session_design: {
        title: 'Individual Session Structure',
        template: [
          {
            phase: '1. Warm-Up (10-15 min)',
            content: [
              'General: 5 min cardio, break sweat',
              'Mobility: Hips, shoulders, ankles, t-spine',
              'Activation: Glutes, core, upper back',
              'Specific: Empty bar, ramp up to working weight',
            ],
          },
          {
            phase: '2. Main Lift (30-45 min)',
            content: [
              'Competition lift or close variation',
              'Highest intensity work of day',
              '3-8 working sets typically',
              'Adequate rest between sets (3-5 min heavy)',
            ],
          },
          {
            phase: '3. Secondary/Variation (15-20 min)',
            content: [
              'Variation of main lift or other competition lift',
              'Moderate intensity (70-85%)',
              '3-5 sets of 3-6 reps typically',
              'Address weak points or build volume',
            ],
          },
          {
            phase: '4. Accessories (15-30 min)',
            content: [
              '2-4 exercises',
              'Higher reps (6-15 typically)',
              'Target specific muscles or weak points',
              'Supersets okay to save time',
            ],
          },
          {
            phase: '5. Cool-Down (5-10 min)',
            content: [
              'Light cardio or walking',
              'Stretching tight areas',
              'Foam rolling if helpful',
              'Note session in training log',
            ],
          },
        ],
      },
    },
    principles: {
      name: 'Core Principles',
      icon: 'bulb',
      color: 'purple',
      fundamental_concepts: {
        title: 'Non-Negotiable Principles',
        principles: [
          {
            principle: 'Specificity',
            definition: 'Train what you want to improve',
            application: [
              'Want bigger squat? Must squat (not just leg press)',
              'Majority of work should be competition lifts or close variations',
              'As you advance, become MORE specific, not less',
            ],
            mistake: 'Doing too many random exercises, not enough main lifts',
          },
          {
            principle: 'Progressive Overload',
            definition: 'Gradually increase training stress over time',
            application: [
              'Add weight to bar when possible',
              'Add reps or sets if weight can\'t increase',
              'Track progress - if not progressing, adjust',
            ],
            mistake: 'Using same weights week after week',
          },
          {
            principle: 'Variation',
            definition: 'Change stimulus to continue adaptation',
            application: [
              'Rotate exercises every 4-12 weeks',
              'Vary rep ranges and intensities',
              'Different emphasis in different blocks',
            ],
            mistake: 'Never changing anything OR changing every week',
          },
          {
            principle: 'Recovery',
            definition: 'Growth happens during rest, not training',
            application: [
              'Deload every 4-6 weeks',
              'Easy days after hard days',
              'Sleep and nutrition are non-negotiable',
            ],
            mistake: 'Thinking more is always better',
          },
          {
            principle: 'Individualization',
            definition: 'What works for others might not work for you',
            application: [
              'Track YOUR response to training',
              'Adjust based on YOUR recovery',
              'Find YOUR optimal frequency/volume',
            ],
            mistake: 'Copying someone else\'s program exactly',
          },
        ],
      },
      volume_guide: {
        title: 'Setting Training Volume',
        recommendations: [
          {
            level: 'Beginner',
            squat: '9-15 sets per week',
            bench: '9-15 sets per week',
            deadlift: '6-12 sets per week',
            note: 'Lower end works great, focus on technique',
          },
          {
            level: 'Intermediate',
            squat: '12-20 sets per week',
            bench: '12-20 sets per week',
            deadlift: '8-15 sets per week',
            note: 'Find your MRV (Maximum Recoverable Volume)',
          },
          {
            level: 'Advanced',
            squat: '15-25 sets per week',
            bench: '15-25 sets per week',
            deadlift: '10-18 sets per week',
            note: 'Highly individual, may wave volume in blocks',
          },
        ],
        notes: [
          'These include main lift + close variations',
          'Deadlift lower because systemic fatigue',
          'Start lower end, add sets if progressing well',
          'Cut back if recovery suffering',
        ],
      },
    },
    periodization: {
      name: 'Periodization Models',
      icon: 'calendar',
      color: 'amber',
      models: [
        {
          name: 'Linear Periodization',
          structure: 'Start high volume/low intensity â†’ End low volume/high intensity',
          timeline: '8-16 weeks typical',
          pros: ['Simple', 'Predictable', 'Good for beginners', 'Clear progression'],
          cons: ['Lose adaptations from early phases', 'Boring', 'Not optimal for advanced'],
          example: [
            'Weeks 1-4: 5x8 @ 70%',
            'Weeks 5-8: 4x5 @ 80%',
            'Weeks 9-12: 3x3 @ 87%',
            'Weeks 13-14: 5x1 @ 90-95%',
            'Week 15: Taper',
            'Week 16: Competition/Test',
          ],
        },
        {
          name: 'Block Periodization',
          structure: 'Sequential blocks, each with specific focus',
          timeline: '9-16 weeks (3-4 week blocks)',
          pros: ['Focused development', 'Less interference', 'Prevents staleness'],
          cons: ['Lose some qualities between blocks', 'Requires planning', 'Not for beginners'],
          example: [
            'Block 1 (4 weeks): Hypertrophy - High volume, 60-75%',
            'Block 2 (3 weeks): Strength - Moderate volume, 80-88%',
            'Block 3 (2 weeks): Peaking - Low volume, 90-97%',
            'Week 10: Competition',
          ],
        },
        {
          name: 'Daily Undulating (DUP)',
          structure: 'Each session different intensity/volume',
          timeline: 'Ongoing, 4-8 week waves',
          pros: ['High frequency', 'Multiple stimuli', 'Prevents adaptation', 'Engaging'],
          cons: ['Complex', 'Fatigue management tricky', 'Not for beginners'],
          example: [
            'Monday: Squat 5x5 @ 80%, Bench 4x3 @ 85%, Dead 3x8 @ 70%',
            'Wednesday: Squat 3x3 @ 87%, Bench 5x8 @ 70%, Dead 5x3 @ 85%',
            'Friday: Squat 4x8 @ 70%, Bench 3x5 @ 82%, Dead 4x5 @ 78%',
          ],
        },
        {
          name: 'Conjugate (Westside-Barbell)',
          structure: 'Max Effort + Dynamic Effort days + accessories',
          timeline: 'Ongoing, rotate variations every 1-3 weeks',
          pros: ['Constant variation', 'Prevents overuse', 'Fun', 'Builds well-rounded strength'],
          cons: ['Complex', 'Requires experience', 'Less specific', 'Equipment intensive'],
          example: [
            'Max Effort Lower: Work up to max in variation (box squat, etc)',
            'Dynamic Effort Lower: Speed squats 8-12 sets x 2 reps @ 50-60%',
            'Max Effort Upper: Max in variation (floor press, etc)',
            'Dynamic Effort Upper: Speed bench 8-10 sets x 3 reps @ 50-60%',
          ],
        },
      ],
    },
    putting_together: {
      name: 'Building Your Program',
      icon: 'construct',
      color: 'red',
      step_by_step: {
        title: 'Program Design Process',
        steps: [
          {
            step: '1. Set Goal & Timeline',
            questions: ['When is your meet/deadline?', 'How many weeks to prepare?', 'What total/numbers are you aiming for?'],
            action: 'Write down specific, measurable goal with date',
          },
          {
            step: '2. Choose Periodization Model',
            questions: ['What\'s your experience level?', 'What worked before?', 'Meet prep or offseason?'],
            action: 'Select model from above based on level and timeline',
          },
          {
            step: '3. Determine Training Frequency',
            questions: ['How many days available?', 'How long per session?', 'Recovery capacity?'],
            action: 'Pick 3-6 days and specific split (full body, upper/lower, etc)',
          },
          {
            step: '4. Set Volume Ranges',
            questions: ['What volume have you handled before?', 'MRV known?', 'Starting conservative or aggressive?'],
            action: 'Use volume guide above, start conservative',
          },
          {
            step: '5. Select Exercises',
            questions: ['What are weak points?', 'What equipment available?', 'What variations useful?'],
            action: 'Main lifts + 2-3 variations + 3-5 accessories per day',
          },
          {
            step: '6. Program Progression',
            questions: ['How will intensity increase?', 'How will volume change?', 'When are deloads?'],
            action: 'Map out week-by-week or block-by-block progression',
          },
          {
            step: '7. Plan Deloads & Testing',
            questions: ['Deload every 4 weeks? 6 weeks?', 'When to test maxes?', 'How to taper for meet?'],
            action: 'Schedule recovery weeks and testing weeks',
          },
          {
            step: '8. Track & Adjust',
            questions: ['What to log?', 'How often to assess?', 'When to make changes?'],
            action: 'Create tracking system, plan monthly reviews',
          },
        ],
      },
      example_program: {
        title: 'Sample 12-Week Intermediate Program',
        overview: 'Block periodization, 4 days/week, meet prep',
        blocks: [
          {
            block: 'Weeks 1-4: Accumulation',
            goal: 'Build work capacity and muscle',
            squat: '4x6 @ 75% â†’ 5x6 @ 78% (progress weekly)',
            bench: '4x6 @ 75% â†’ 5x6 @ 78%',
            deadlift: '3x6 @ 72% â†’ 4x6 @ 75%',
            accessories: 'Leg press, Romanian DL, DB bench, rows (3x10-12)',
          },
          {
            block: 'Weeks 5-8: Intensification',
            goal: 'Convert to maximal strength',
            squat: '4x3 @ 83% â†’ 5x2 @ 88%',
            bench: '4x3 @ 83% â†’ 5x2 @ 88%',
            deadlift: '3x3 @ 80% â†’ 4x2 @ 85%',
            accessories: 'Reduce volume, keep key movements',
          },
          {
            block: 'Weeks 9-10: Realization',
            goal: 'Peak strength, reduce fatigue',
            squat: '3x1 @ 90-95% â†’ openers',
            bench: '3x1 @ 90-95% â†’ openers',
            deadlift: '2x1 @ 90-95% â†’ openers',
            accessories: 'Minimal, maintenance only',
          },
          {
            block: 'Week 11: Taper',
            goal: 'Maximize recovery, maintain sharpness',
            work: 'Light singles 80-85%, practice commands',
          },
          {
            block: 'Week 12: Competition',
            goal: 'Perform!',
            work: '9 attempts (3 per lift)',
          },
        ],
      },
    },
    troubleshooting: {
      name: 'Common Mistakes',
      icon: 'warning',
      color: 'cyan',
      mistakes: [
        {
          mistake: 'Too Much Volume Too Soon',
          signs: ['Constantly sore', 'Performance declining', 'Joints hurt', 'Sleep disrupted'],
          fix: 'Cut volume by 30%, build up gradually over 4-8 weeks',
        },
        {
          mistake: 'Not Enough Intensity',
          signs: ['Not tired', 'No PRs', 'Weights feel light', 'Bored'],
          fix: 'Add heavy singles, increase percentages, test maxes',
        },
        {
          mistake: 'Too Much Variety',
          signs: ['Never repeating exercises', 'Can\'t track progress', 'No adaptation'],
          fix: 'Stick with exercises 4-8 weeks minimum',
        },
        {
          mistake: 'No Progression Plan',
          signs: ['Using same weights', 'Random workouts', 'No clear goal'],
          fix: 'Write out progression for next 4-8 weeks',
        },
        {
          mistake: 'Ignoring Recovery',
          signs: ['Never deloading', 'Going hard every session', 'Injuries piling up'],
          fix: 'Schedule deload every 4-6 weeks, vary intensity',
        },
        {
          mistake: 'Copying Exactly',
          signs: ['Following program not suited to you', 'Not recovering', 'Not enjoying training'],
          fix: 'Adjust to YOUR needs, recovery, preferences',
        },
      ],
    },
  };

  const currentPhase = designData[selectedPhase as keyof typeof designData];

  const getColorClass = (color: string) => {
    const colors: { [key: string]: string } = {
      blue: 'bg-primary',
      emerald: 'bg-primary',
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
            Program Design Framework
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          <View className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-6 mb-6">
            <Text className="text-white text-2xl font-bold mb-2">Build Your Plan</Text>
            <Text className="text-white opacity-90">
              Complete framework for program design
            </Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6">
            <View className="flex-row gap-3 px-1">
              {Object.entries(designData).map(([key, phase]) => (
                <TouchableOpacity
                  key={key}
                  onPress={() => setSelectedPhase(key)}
                  className={`${
                    selectedPhase === key 
                      ? getColorClass(phase.color)
                      : 'bg-zinc-900'
                  } rounded-xl p-4 border ${
                    selectedPhase === key 
                      ? 'border-white/30'
                      : 'border-zinc-800'
                  } min-w-[190px]`}
                >
                  <Ionicons 
                    name={phase.icon as any} 
                    size={32} 
                    color={selectedPhase === key ? 'white' : '#a1a1aa'} 
                  />
                  <Text className={`${selectedPhase === key ? 'text-white' : 'text-zinc-400'} font-bold mt-2`}>
                    {phase.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          {/* Content rendering would continue here with similar patterns */}
          <View className="bg-primary/10 rounded-xl p-6 border border-primary/30 mb-6">
            <Ionicons name="information-circle" size={32} color="#9D12DE" />
            <Text className="text-primary/80 font-bold text-lg mt-3 mb-2">
              {currentPhase.name}
            </Text>
            <Text className="text-primary/60 text-sm">
              Detailed program design content for this phase...
            </Text>
          </View>

          <View className="bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-xl p-5 border border-primary/30 mb-6">
            <Text className="text-primary font-bold text-lg mb-3">Design Principles</Text>
            <Text className="text-primary/80 text-sm mb-2">
              â€¢ Specificity - train the competition lifts
            </Text>
            <Text className="text-primary/80 text-sm mb-2">
              â€¢ Progressive overload - add weight/reps/sets over time
            </Text>
            <Text className="text-primary/80 text-sm mb-2">
              â€¢ Variation - prevent adaptation and overuse
            </Text>
            <Text className="text-primary/80 text-sm">
              â€¢ Recovery - program deloads and manage fatigue
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}


