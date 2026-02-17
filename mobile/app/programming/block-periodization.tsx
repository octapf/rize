import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function BlockPeriodization() {
  const [selectedBlock, setSelectedBlock] = useState('overview');

  const blockData = {
    overview: {
      name: 'Overview',
      icon: 'grid',
      color: 'blue',
      whatIs: {
        definition: 'Block periodization divides training into focused blocks with specific adaptations',
        creator: 'Vladimir Issurin (sports scientist)',
        principle: 'Sequential development - focus on 1-2 qualities at a time',
        contrast: 'Traditional: train everything at once. Block: focus then progress.',
      },
      structure: {
        title: 'Three Block System',
        blocks: [
          {
            name: 'Accumulation',
            duration: '3-4 weeks',
            focus: 'Build work capacity, muscle, technique',
            intensity: 'Low-Moderate (60-80%)',
            volume: 'Very High',
            goal: 'Accumulate training stress and adaptations',
          },
          {
            name: 'Intensification',
            duration: '2-3 weeks',
            focus: 'Convert muscle to max strength',
            intensity: 'High (80-92%)',
            volume: 'Moderate',
            goal: 'Realize accumulated adaptations as strength',
          },
          {
            name: 'Realization',
            duration: '1-2 weeks',
            focus: 'Peak strength, taper for meet',
            intensity: 'Very High (90-100%)',
            volume: 'Low',
            goal: 'Express maximum strength on platform',
          },
        ],
      },
      advantages: [
        'Clear focus each block - easier mentally',
        'Prevents staleness from same stimulus',
        'Builds different qualities systematically',
        'Good for intermediate-advanced lifters',
        'Works well for meet preparation',
        'Easier to program and track',
      ],
      disadvantages: [
        'Can lose qualities from previous blocks',
        'Requires discipline (stick to block focus)',
        'May not suit beginners (need general strength)',
        'Needs proper sequencing',
        'Fatigue management crucial',
      ],
    },
    accumulation: {
      name: 'Accumulation Block',
      icon: 'fitness',
      color: 'primary',
      purpose: {
        title: 'Build the Foundation',
        goals: [
          'Increase muscle mass (hypertrophy)',
          'Build work capacity',
          'Perfect technique with volume',
          'Address weak points',
          'Build resilience (tendons, ligaments)',
        ],
        metaphor: 'Building the pyramid base - wider and stronger',
      },
      parameters: {
        intensity: {
          range: '60-80% of 1RM',
          typical: '70-75% most work',
          reasoning: 'Heavy enough for strength, light enough for volume',
        },
        volume: {
          range: '20-30+ sets per lift per week',
          typical: '24-28 sets',
          reasoning: 'High volume drives hypertrophy and work capacity',
        },
        rep_ranges: {
          main: '5-8 reps (some 8-12)',
          accessories: '10-15 reps',
          why: 'Build muscle, not test strength',
        },
        frequency: {
          each_lift: '3-4x per week',
          total: '5-6 training days',
          reasoning: 'More frequency = more practice and volume',
        },
      },
      exercise_selection: {
        title: 'Variety is Key',
        competition: '40% - Still practice but not dominant',
        variations: '40% - Different bars, tempos, ranges',
        accessories: '20% - Build weak points and muscle',
        examples: {
          squat: [
            'Comp squat: 2x per week',
            'Paused squat: 1x per week',
            'SSB squat or front squat: 1x per week',
            'Leg press, lunges: 2x per week',
          ],
          bench: [
            'Comp bench: 2x per week',
            'Close grip: 1x per week',
            'Incline or feet-up: 1x per week',
            'Dumbbell work, flyes: 2x per week',
          ],
          deadlift: [
            'Comp deadlift: 1-2x per week',
            'Deficit or paused: 1x per week',
            'RDLs: 2x per week',
            'Rows, back work: 3x per week',
          ],
        },
      },
      sample_week: {
        description: 'Example 4-week accumulation block structure',
        week_1: {
          volume: '100% baseline',
          intensity: '70% average',
          notes: 'Ease in, establish groove',
        },
        week_2: {
          volume: '110% (add sets or reps)',
          intensity: '72-75%',
          notes: 'Increase load slightly',
        },
        week_3: {
          volume: '120% (peak volume)',
          intensity: '75-78%',
          notes: 'Highest volume and intensity of block',
        },
        week_4: {
          volume: '60-70% (deload)',
          intensity: '65-70%',
          notes: 'Recover and prepare for intensification',
        },
      },
      nutrition: {
        calories: 'Slight surplus (200-400)',
        protein: '0.8-1g per lb',
        goal: 'Build muscle while managing fatigue',
        note: 'This is growth phase - eat to support it',
      },
      mistakes: [
        'Going too heavy (defeats hypertrophy purpose)',
        'Skipping deload week 4',
        'Not enough exercise variety',
        'Ignoring accessories',
        'Cutting calories (anti-growth)',
        'Testing maxes (wrong block for that)',
      ],
    },
    intensification: {
      name: 'Intensification Block',
      icon: 'barbell',
      color: 'purple',
      purpose: {
        title: 'Convert Muscle to Strength',
        goals: [
          'Realize hypertrophy as max strength',
          'Neural adaptations to heavy loads',
          'Practice competition specificity',
          'Build confidence with heavy weights',
          'Taper volume, increase intensity',
        ],
        metaphor: 'Sharpening the blade - focus the gains',
      },
      parameters: {
        intensity: {
          range: '80-92% of 1RM',
          typical: '85-88% most work',
          reasoning: 'Heavy enough for strength, not max effort',
        },
        volume: {
          range: '12-18 sets per lift per week',
          typical: '14-16 sets (half of accumulation)',
          reasoning: 'Can\'t recover from high volume + high intensity',
        },
        rep_ranges: {
          main: '2-4 reps (mostly triples)',
          some: 'Heavy singles and doubles',
          accessories: '6-10 reps (reduced)',
        },
        frequency: {
          each_lift: '2-3x per week',
          total: '4-5 training days',
          reasoning: 'Need more recovery between heavy sessions',
        },
      },
      exercise_selection: {
        title: 'Specificity Increases',
        competition: '60% - More comp lift work',
        variations: '30% - Comp-specific variations',
        accessories: '10% - Only essential accessories',
        shift: 'Drop variety, increase specificity',
        examples: {
          squat: [
            'Comp squat: 3x per week',
            'Paused squat: 1x per week (comp-specific)',
            'Accessories: minimal, only weak points',
          ],
          bench: [
            'Comp bench: 3x per week',
            'Competition pause bench: 1x per week',
            'Close grip if tricep weak: 1x per week',
          ],
          deadlift: [
            'Comp deadlift: 2-3x per week',
            'Comp-specific variation: 1x per week',
            'Back work: moderate, maintenance',
          ],
        },
      },
      progression: {
        title: 'Week-by-Week Intensification',
        week_1: {
          intensity: '80-85%',
          volume: 'Moderate-high (16 sets)',
          focus: 'Adapt to heavier loads',
          example: '4x3@82%, 3x3@85%',
        },
        week_2: {
          intensity: '85-90%',
          volume: 'Moderate (14 sets)',
          focus: 'Build on week 1',
          example: '5x2@87%, 4x2@90%',
        },
        week_3: {
          intensity: '88-92%',
          volume: 'Low-moderate (12 sets)',
          focus: 'Peak of intensification',
          example: '6x1@90%, 3x2@88%',
        },
      },
      mental_shift: {
        title: 'Mental Approach Changes',
        from_accumulation: 'Volume grinding, bodybuilding feel',
        to_intensification: 'Heavy singles, powerlifting feel',
        mindset: [
          'Weights feel heavy - that\'s the point',
          'Focus on quality, not quantity',
          'Bar speed and technique critical',
          'More rest between sets (3-5min)',
          'Mental preparation for each set',
        ],
      },
      mistakes: [
        'Keeping accumulation volume (too much)',
        'Going to true max (save for realization)',
        'Too many variations (need specificity)',
        'Not enough rest between sets',
        'Poor technique under fatigue',
        'Skipping accessories completely',
      ],
    },
    realization: {
      name: 'Realization Block',
      icon: 'trophy',
      color: 'amber',
      purpose: {
        title: 'Peak and Perform',
        goals: [
          'Reduce fatigue, maintain strength',
          'Express max strength on meet day',
          'Perfect competition technique',
          'Build confidence with openers',
          'Taper to freshness',
        ],
        metaphor: 'The final polish - ready to shine',
      },
      parameters: {
        intensity: {
          range: '85-100% (but controlled)',
          typical: '90-95% most work',
          note: 'Heavy but strategic, not grinding',
        },
        volume: {
          range: '6-10 sets per lift per week',
          typical: '8 sets (massive reduction)',
          reasoning: 'Minimize fatigue, maintain strength',
        },
        rep_ranges: {
          main: 'Singles and doubles',
          note: 'Practice meet lifting',
        },
        frequency: {
          each_lift: '1-2x per week',
          total: '3-4 training days',
          reasoning: 'Max recovery between sessions',
        },
      },
      timeline: {
        description: 'Typical 2-week realization/taper',
        week_minus_2: {
          title: '2 Weeks Out',
          volume: '70% of intensification',
          intensity: '90-95%',
          focus: 'Heavy singles, test openers',
          example: [
            'Monday: Squat 3x1@92%, opener 1x1',
            'Wednesday: Bench 3x1@92%, opener 1x1',
            'Friday: Deadlift 2x1@92%, opener 1x1',
          ],
        },
        week_minus_1: {
          title: '1 Week Out (Deload)',
          volume: '40% of intensification',
          intensity: '70-85%',
          focus: 'Move weight, stay sharp, recover',
          example: [
            'Monday: Squat 3x3@75%',
            'Wednesday: Bench 3x3@75%',
            'Friday: Deadlift 2x2@80% or OFF',
            'Weekend: REST',
          ],
        },
        meet_week: {
          title: 'Meet Week',
          monday_tuesday: 'Light movement or OFF',
          wednesday_thursday: 'Openers or light singles (70-80%)',
          friday: 'Complete rest if meet Saturday',
          saturday: 'MEET DAY - perform',
        },
      },
      technique_focus: {
        title: 'Perfect Competition Execution',
        practice: [
          'Every rep with commands',
          'Competition pauses',
          'Full depth, lockouts',
          'Bar path optimization',
          'Mental cues and routine',
        ],
        film: 'Film everything, review constantly',
        goal: 'Automatic perfect execution under pressure',
      },
      mistakes: [
        'Training too hard week before meet',
        'Testing true maxes (injury risk)',
        'Trying new techniques',
        'Not practicing commands',
        'Overanalyzing and changing things',
        'Not trusting the taper',
      ],
    },
    variations: {
      name: 'Block Variations',
      icon: 'swap-horizontal',
      color: 'cyan',
      extended: {
        title: 'Extended Accumulation',
        when: 'Off-season, not competing soon',
        structure: [
          'Accumulation: 6-8 weeks',
          'Intensification: 3-4 weeks',
          'Optional short realization or deload',
          'Repeat cycle',
        ],
        benefit: 'More muscle building time',
        drawback: 'May lose some strength qualities',
      },
      double: {
        title: 'Double Intensification',
        when: 'Advanced lifters, longer cycle',
        structure: [
          'Accumulation: 4 weeks',
          'Intensification 1: 3 weeks',
          'Mini deload: 1 week',
          'Intensification 2: 2-3 weeks',
          'Realization: 2 weeks',
        ],
        benefit: 'Two strength peaks, more adaptation',
        drawback: 'Complex, hard to recover',
      },
      concurrent: {
        title: 'Modified Concurrent',
        when: 'During blocks, maintain other lifts',
        structure: [
          'Focus lift: Full block progression',
          'Other lifts: Maintenance volume',
          'Rotate focus each block',
        ],
        example: [
          'Accumulation: Focus squat, maintain bench/dead',
          'Intensification: Focus deadlift, maintain squat/bench',
        ],
        benefit: 'Don\'t lose lifts while focusing',
      },
      masters: {
        title: 'Masters Adaptation',
        when: '40+ lifters',
        changes: [
          'Longer blocks (more recovery)',
          'Lower volume in accumulation',
          'More deload weeks',
          'Less aggressive intensification',
          'Longer realization/taper',
        ],
        example: [
          'Accumulation: 5 weeks (with 2 deloads)',
          'Intensification: 3 weeks',
          'Realization: 3 weeks',
        ],
      },
    },
    implementation: {
      name: 'Implementing Blocks',
      icon: 'construct',
      color: 'red',
      first_time: {
        title: 'First Time Using Blocks',
        advice: [
          'Start with standard 3-block approach',
          'Don\'t get creative yet',
          'Track everything meticulously',
          'Note how you feel each block',
          'Evaluate after full cycle',
          'Adjust second cycle based on data',
        ],
        timeline: '10-12 weeks total first cycle',
      },
      programming: {
        title: 'Block-to-Block Programming',
        principles: [
          'Each block builds on previous',
          'Don\'t start over each block',
          'Use percentages of new training max',
          'Adjust based on block performance',
        ],
        example: [
          'Accumulation: Base on current estimated max',
          'Intensification: Increase training max 2-5%',
          'Realization: Attempt new PRs at meet',
          'Next cycle: Base on meet results',
        ],
      },
      tracking: {
        title: 'What to Track',
        metrics: [
          'Volume per week (sets x reps x weight)',
          'Average intensity (%)',
          'Fatigue levels (1-10 scale)',
          'Sleep quality',
          'Bodyweight',
          'Performance on key lifts',
          'How you feel',
        ],
        why: 'Data shows what works for YOU',
      },
      troubleshooting: {
        title: 'Common Issues',
        problems: [
          {
            issue: 'Too tired in intensification',
            cause: 'Accumulation volume too high',
            fix: 'Reduce accumulation sets 10-20%',
          },
          {
            issue: 'Not feeling strong in realization',
            cause: 'Taper too aggressive or not enough',
            fix: 'Adjust taper volume next cycle',
          },
          {
            issue: 'Losing strength between blocks',
            cause: 'Blocks too different, lost qualities',
            fix: 'Maintain some intensity in accumulation',
          },
          {
            issue: 'Injured during intensification',
            cause: 'Too much volume + intensity too fast',
            fix: 'Slower transition, better deload',
          },
        ],
      },
    },
  };

  const currentBlock = blockData[selectedBlock as keyof typeof blockData];

  const getColorClass = (color: string) => {
    const colors: { [key: string]: string } = {
      blue: 'bg-primary',
      primary: 'bg-primary',
      purple: 'bg-purple-500',
      amber: 'bg-amber-500',
      cyan: 'bg-cyan-500',
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
            Block Periodization
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          <View className="bg-gradient-to-r from-primary to-[#7D0EBE] rounded-xl p-6 mb-6">
            <Text className="text-white text-2xl font-bold mb-2">Sequential Training</Text>
            <Text className="text-white opacity-90">
              Focus one quality at a time for maximum gains
            </Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6">
            <View className="flex-row gap-3 px-1">
              {Object.entries(blockData).map(([key, block]) => (
                <TouchableOpacity
                  key={key}
                  onPress={() => setSelectedBlock(key)}
                  className={`${
                    selectedBlock === key 
                      ? getColorClass(block.color)
                      : 'bg-zinc-900'
                  } rounded-xl p-4 border ${
                    selectedBlock === key 
                      ? 'border-white/30'
                      : 'border-zinc-800'
                  } min-w-[180px]`}
                >
                  <Ionicons 
                    name={block.icon as any} 
                    size={32} 
                    color={selectedBlock === key ? 'white' : '#a1a1aa'} 
                  />
                  <Text className={`${selectedBlock === key ? 'text-white' : 'text-zinc-400'} font-bold mt-2`}>
                    {block.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          {selectedBlock === 'overview' && (
            <View>
              <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
                <Text className="text-primary/80 text-xl font-bold mb-3">What Is Block Periodization?</Text>
                <Text className="text-zinc-300 mb-2">{currentBlock.whatIs?.definition}</Text>
                <Text className="text-zinc-400 text-sm mb-1">Creator: {currentBlock.whatIs?.creator}</Text>
                <Text className="text-zinc-400 text-sm mb-3">Principle: {currentBlock.whatIs?.principle}</Text>
                <View className="bg-primary/10 rounded-xl p-3 border border-primary/30">
                  <Text className="text-primary/60 text-sm">{currentBlock.whatIs?.contrast}</Text>
                </View>
              </View>

              <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
                <Text className="text-purple-400 text-xl font-bold mb-4">{currentBlock.structure?.title}</Text>
                {currentBlock.structure?.blocks.map((block: any, idx: number) => (
                  <View key={idx} className="bg-zinc-800 rounded-xl p-4 mb-3 last:mb-0">
                    <Text className="text-white font-bold text-lg mb-2">{block.name}</Text>
                    <Text className="text-zinc-300 text-sm mb-1">Duration: {block.duration}</Text>
                    <Text className="text-primary text-sm mb-1">Focus: {block.focus}</Text>
                    <Text className="text-primary/80 text-sm mb-1">Intensity: {block.intensity}</Text>
                    <Text className="text-purple-400 text-sm mb-2">Volume: {block.volume}</Text>
                    <View className="bg-amber-500/10 rounded-xl p-2 border border-amber-500/30">
                      <Text className="text-amber-300 text-sm">Goal: {block.goal}</Text>
                    </View>
                  </View>
                ))}
              </View>

              <View className="bg-primary/10 rounded-xl p-5 border border-primary/30 mb-6">
                <Text className="text-primary font-bold text-lg mb-3">Advantages:</Text>
                {currentBlock.advantages?.map((adv: string, idx: number) => (
                  <Text key={idx} className="text-primary/80 text-sm mb-1">? {adv}</Text>
                ))}
              </View>

              <View className="bg-red-500/10 rounded-xl p-5 border border-red-500/30 mb-6">
                <Text className="text-red-400 font-bold text-lg mb-3">Disadvantages:</Text>
                {currentBlock.disadvantages?.map((dis: string, idx: number) => (
                  <Text key={idx} className="text-red-300 text-sm mb-1">? {dis}</Text>
                ))}
              </View>
            </View>
          )}

          {(selectedBlock === 'accumulation' || selectedBlock === 'intensification' || selectedBlock === 'realization') && (
            <View>
              <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
                <Text className="text-white text-xl font-bold mb-3">{currentBlock.purpose?.title}</Text>
                {currentBlock.purpose?.goals?.map((goal: string, idx: number) => (
                  <Text key={idx} className="text-zinc-300 mb-2">� {goal}</Text>
                ))}
                <View className="bg-primary/10 rounded-xl p-3 border border-primary/30 mt-3">
                  <Text className="text-primary/60 text-sm italic">{currentBlock.purpose?.metaphor}</Text>
                </View>
              </View>

              <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
                <Text className="text-purple-400 text-xl font-bold mb-4">Training Parameters</Text>
                
                {Object.entries(currentBlock.parameters || {}).map(([key, param]: [string, any]) => (
                  <View key={key} className="bg-zinc-800 rounded-xl p-4 mb-3 last:mb-0">
                    <Text className="text-white font-bold mb-2 capitalize">{key.replace('_', ' ')}</Text>
                    {typeof param === 'object' && Object.entries(param).map(([subKey, value]: [string, any]) => (
                      <Text key={subKey} className="text-zinc-300 text-sm mb-1">
                        {subKey.replace('_', ' ')}: {value}
                      </Text>
                    ))}
                  </View>
                ))}
              </View>

              {currentBlock.exercise_selection && (
                <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
                  <Text className="text-primary text-xl font-bold mb-4">{currentBlock.exercise_selection.title}</Text>
                  <View className="mb-4">
                    <Text className="text-primary/80 mb-1">Competition: {currentBlock.exercise_selection.competition}</Text>
                    <Text className="text-purple-400 mb-1">Variations: {currentBlock.exercise_selection.variations}</Text>
                    <Text className="text-amber-400 mb-3">Accessories: {currentBlock.exercise_selection.accessories}</Text>
                  </View>
                  
                  {currentBlock.exercise_selection.examples && Object.entries(currentBlock.exercise_selection.examples).map(([lift, exercises]: [string, any]) => (
                    <View key={lift} className="bg-zinc-800 rounded-xl p-4 mb-3 last:mb-0">
                      <Text className="text-white font-bold mb-2 capitalize">{lift}:</Text>
                      {exercises.map((ex: string, idx: number) => (
                        <Text key={idx} className="text-zinc-300 text-sm mb-1">� {ex}</Text>
                      ))}
                    </View>
                  ))}
                </View>
              )}

              {currentBlock.sample_week && (
                <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
                  <Text className="text-amber-400 text-xl font-bold mb-4">{currentBlock.sample_week.description}</Text>
                  {Object.entries(currentBlock.sample_week).filter(([key]) => key !== 'description').map(([week, data]: [string, any]) => (
                    <View key={week} className="bg-zinc-800 rounded-xl p-4 mb-3 last:mb-0">
                      <Text className="text-white font-bold mb-2">{week.replace('_', ' ').toUpperCase()}</Text>
                      {typeof data === 'object' && Object.entries(data).map(([key, value]: [string, any]) => (
                        <Text key={key} className="text-zinc-300 text-sm mb-1 capitalize">
                          {key}: {value}
                        </Text>
                      ))}
                    </View>
                  ))}
                </View>
              )}

              {currentBlock.progression && (
                <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
                  <Text className="text-purple-400 text-xl font-bold mb-4">{currentBlock.progression.title}</Text>
                  {Object.entries(currentBlock.progression).filter(([key]) => key !== 'title').map(([week, data]: [string, any]) => (
                    <View key={week} className="bg-purple-500/10 rounded-xl p-4 border border-purple-500/30 mb-3 last:mb-0">
                      <Text className="text-purple-400 font-bold mb-2">{week.replace('_', ' ').toUpperCase()}</Text>
                      {typeof data === 'object' && Object.entries(data).map(([key, value]: [string, any]) => (
                        <Text key={key} className="text-purple-300 text-sm mb-1">
                          {key}: {value}
                        </Text>
                      ))}
                    </View>
                  ))}
                </View>
              )}

              {currentBlock.timeline && (
                <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
                  <Text className="text-amber-400 text-xl font-bold mb-4">{currentBlock.timeline.description}</Text>
                  {Object.entries(currentBlock.timeline).filter(([key]) => key !== 'description').map(([week, data]: [string, any]) => (
                    <View key={week} className="bg-zinc-800 rounded-xl p-4 mb-3 last:mb-0">
                      <Text className="text-white font-bold mb-2">{data.title || week}</Text>
                      {typeof data === 'object' && Object.entries(data).filter(([k]) => k !== 'title').map(([key, value]: [string, any]) => (
                        <View key={key}>
                          {Array.isArray(value) ? (
                            <View className="mt-2">
                              <Text className="text-zinc-400 text-sm capitalize mb-1">{key}:</Text>
                              {value.map((item: string, idx: number) => (
                                <Text key={idx} className="text-zinc-300 text-sm mb-1">� {item}</Text>
                              ))}
                            </View>
                          ) : (
                            <Text className="text-zinc-300 text-sm mb-1 capitalize">{key}: {value}</Text>
                          )}
                        </View>
                      ))}
                    </View>
                  ))}
                </View>
              )}

              {currentBlock.mistakes && (
                <View className="bg-red-500/10 rounded-xl p-5 border border-red-500/30 mb-6">
                  <Text className="text-red-400 font-bold text-lg mb-3">Common Mistakes:</Text>
                  {currentBlock.mistakes.map((mistake: string, idx: number) => (
                    <Text key={idx} className="text-red-300 text-sm mb-1">? {mistake}</Text>
                  ))}
                </View>
              )}
            </View>
          )}

          {selectedBlock === 'variations' && (
            <View>
              {Object.entries(currentBlock).filter(([key]) => !['name', 'icon', 'color'].includes(key)).map(([key, variation]: [string, any]) => (
                <View key={key} className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
                  <Text className="text-cyan-400 text-xl font-bold mb-3">{variation.title}</Text>
                  <Text className="text-zinc-300 mb-4">When: {variation.when}</Text>

                  {variation.structure && (
                    <View className="bg-cyan-500/10 rounded-xl p-4 border border-cyan-500/30 mb-3">
                      <Text className="text-cyan-400 font-bold mb-2">Structure:</Text>
                      {variation.structure.map((item: string, idx: number) => (
                        <Text key={idx} className="text-cyan-300 text-sm mb-1">� {item}</Text>
                      ))}
                    </View>
                  )}

                  {variation.changes && (
                    <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-3">
                      <Text className="text-primary/80 font-bold mb-2">Changes:</Text>
                      {variation.changes.map((item: string, idx: number) => (
                        <Text key={idx} className="text-primary/60 text-sm mb-1">� {item}</Text>
                      ))}
                    </View>
                  )}

                  {variation.example && (
                    <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-3">
                      <Text className="text-primary font-bold mb-2">Example:</Text>
                      {Array.isArray(variation.example) ? (
                        variation.example.map((ex: string, idx: number) => (
                          <Text key={idx} className="text-primary/80 text-sm mb-1">� {ex}</Text>
                        ))
                      ) : (
                        <Text className="text-primary/80 text-sm">{variation.example}</Text>
                      )}
                    </View>
                  )}

                  <View className="flex-row justify-between">
                    <Text className="text-primary text-sm">? {variation.benefit}</Text>
                    {variation.drawback && <Text className="text-red-400 text-sm">? {variation.drawback}</Text>}
                  </View>
                </View>
              ))}
            </View>
          )}

          {selectedBlock === 'implementation' && (
            <View>
              {Object.entries(currentBlock).filter(([key]) => !['name', 'icon', 'color'].includes(key)).map(([key, section]: [string, any]) => (
                <View key={key} className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
                  <Text className="text-red-400 text-xl font-bold mb-4">{section.title}</Text>

                  {section.advice && section.advice.map((item: string, idx: number) => (
                    <Text key={idx} className="text-zinc-300 mb-2">� {item}</Text>
                  ))}

                  {section.principles && (
                    <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-3">
                      <Text className="text-primary/80 font-bold mb-2">Principles:</Text>
                      {section.principles.map((p: string, idx: number) => (
                        <Text key={idx} className="text-primary/60 text-sm mb-1">� {p}</Text>
                      ))}
                    </View>
                  )}

                  {section.metrics && (
                    <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-3">
                      <Text className="text-primary font-bold mb-2">Track:</Text>
                      {section.metrics.map((m: string, idx: number) => (
                        <Text key={idx} className="text-primary/80 text-sm mb-1">� {m}</Text>
                      ))}
                    </View>
                  )}

                  {section.problems && section.problems.map((problem: any, idx: number) => (
                    <View key={idx} className="bg-zinc-800 rounded-xl p-4 mb-3 last:mb-0">
                      <Text className="text-red-400 font-bold mb-1">Issue: {problem.issue}</Text>
                      <Text className="text-amber-400 text-sm mb-1">Cause: {problem.cause}</Text>
                      <Text className="text-primary text-sm">Fix: {problem.fix}</Text>
                    </View>
                  ))}

                  {section.timeline && (
                    <Text className="text-primary/80 text-sm mt-3">{section.timeline}</Text>
                  )}

                  {section.why && (
                    <Text className="text-amber-400 text-sm mt-3 italic">{section.why}</Text>
                  )}
                </View>
              ))}
            </View>
          )}

          <View className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl p-5 border border-primary/30 mb-6">
            <Text className="text-primary/80 font-bold text-lg mb-3">Key Takeaways</Text>
            <Text className="text-primary/60 text-sm mb-2">
              � Block periodization = focused sequential development
            </Text>
            <Text className="text-primary/60 text-sm mb-2">
              � Build → Realize → Peak = complete cycle
            </Text>
            <Text className="text-primary/60 text-sm mb-2">
              � Each block has specific purpose - respect it
            </Text>
            <Text className="text-primary/60 text-sm">
              � Track data and adjust for YOUR response
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}



