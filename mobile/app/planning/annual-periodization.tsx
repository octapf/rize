import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function AnnualPeriodization() {
  const [selectedPhase, setSelectedPhase] = useState('overview');

  const periodizationData = {
    overview: {
      name: 'Overview',
      icon: 'calendar',
      color: 'blue',
      concept: {
        whatIs: 'Planning training over a full year (macrocycle) to optimize performance at specific times',
        why: [
          'Can\'t peak year-round (burnout/injury)',
          'Different qualities need different stimuli',
          'Strategic deloads prevent overtraining',
          'Allows multiple peaks per year',
          'Builds long-term progress',
        ],
        forWho: [
          'Intermediate+ lifters (1+ years)',
          'Competitive lifters planning meets',
          'Anyone training long-term',
          'NOT for complete beginners (LP still works)',
        ],
      },
      yearStructure: {
        description: 'Typical competitive year structure',
        phases: [
          {
            name: 'Off-Season (4-6 months)',
            focus: 'Build foundation, address weaknesses, gain muscle',
            intensity: 'Moderate (70-80% mostly)',
            volume: 'High',
            training: 'Variations, accessories, hypertrophy',
          },
          {
            name: 'Pre-Competition (2-3 months)',
            focus: 'Convert muscle to strength, specificity',
            intensity: 'High (80-90%)',
            volume: 'Moderate-high',
            training: 'More competition lifts, less variation',
          },
          {
            name: 'Competition Prep (4-6 weeks)',
            focus: 'Peak strength, perfect technique',
            intensity: 'Very high (85-95%)',
            volume: 'Low',
            training: 'Mostly comp lifts, minimal accessories',
          },
          {
            name: 'Taper (1-2 weeks)',
            focus: 'Recover and express max strength',
            intensity: 'Moderate-high (planned deload)',
            volume: 'Very low',
            training: 'Light openers, mobility, rest',
          },
          {
            name: 'Competition (1 day)',
            focus: 'Perform and PR',
            intensity: 'Maximum (90-102%)',
            volume: 'Minimal (9 attempts)',
            training: 'Game day execution',
          },
          {
            name: 'Post-Meet Recovery (1-2 weeks)',
            focus: 'Recover physically and mentally',
            intensity: 'Very light or off',
            volume: 'Minimal or none',
            training: 'Rest, fun lifting, other activities',
          },
        ],
      },
      howManyMeets: {
        beginner: {
          meets: '1-2 per year',
          reasoning: 'Focus on building base, meets are learning experience',
          structure: 'Long off-season → meet → long off-season → maybe 2nd meet',
        },
        intermediate: {
          meets: '2-3 per year',
          reasoning: 'Can handle multiple peaks, build competition experience',
          structure: 'Off-season → meet → short off-season → meet → long off-season',
        },
        advanced: {
          meets: '3-4 per year',
          reasoning: 'Strategic peaks, some meets for qualification/experience',
          structure: 'Can do "B meets" without full peak, save full peak for championships',
        },
      },
    },
    offseason: {
      name: 'Off-Season',
      icon: 'barbell',
      color: 'emerald',
      duration: '4-6 months (longest phase)',
      goals: [
        'Build muscle mass',
        'Increase work capacity',
        'Address weak points',
        'Practice technique',
        'Improve mobility/health',
        'Reduce injury risk',
      ],
      training: {
        intensity: '70-80% mostly',
        volume: 'High (20-30 sets per lift per week)',
        exerciseSelection: [
          'Competition lifts 1-2x per week',
          'Variations 2-3x per week (pause, tempo, deficit, etc.)',
          'Lots of accessories',
          'Can experiment with new movements',
        ],
        repRanges: [
          'Main work: 5-8 reps',
          'Accessories: 8-15 reps',
          'Some hypertrophy blocks',
        ],
        frequency: [
          'Each lift 2-4x per week',
          'Total 4-6 training days',
          'Can do higher frequency',
        ],
      },
      nutrition: {
        calories: 'Slight surplus (200-500 cal)',
        protein: '0.8-1g/lb bodyweight',
        goal: 'Slow muscle gain or recomp',
        weight: [
          'Gain 0.5-1lb/month if bulking',
          'Maintain if already at weight class',
          'Don\'t dirty bulk (getting fat slows you down)',
        ],
      },
      mentalApproach: [
        'This is where you BUILD',
        'Don\'t test maxes (waste energy)',
        'Embrace the boring work',
        'Trust the process',
        'Recovery is part of training',
        'Can be fun - try new things',
      ],
      mistakes: [
        'Going too heavy too often',
        'Skipping deloads',
        'Testing 1RMs every month',
        'Ignoring weak points',
        'Not eating enough',
        'Trying to "feel strong" every session',
      ],
    },
    precomp: {
      name: 'Pre-Competition',
      icon: 'trending-up',
      color: 'purple',
      duration: '2-3 months before meet',
      goals: [
        'Convert muscle to max strength',
        'Increase competition specificity',
        'Start handling heavier weights',
        'Refine technique',
        'Build confidence',
      ],
      training: {
        intensity: '80-90% range',
        volume: 'Moderate-high (reducing from off-season)',
        exerciseSelection: [
          'Competition lifts 2-3x per week',
          'Some variations still (1-2x)',
          'Reduce accessory exercises',
          'Drop "fluff" work',
        ],
        repRanges: [
          'Main work: 3-5 reps',
          'Some doubles and triples',
          'Occasional heavy singles (not maxes)',
          'Accessories: 6-10 reps',
        ],
        frequency: [
          'Each lift 2-3x per week',
          '4-5 training days typical',
        ],
      },
      nutrition: {
        calories: 'Maintenance to slight surplus',
        timing: 'Start weight cut if needed (slowly)',
        protein: 'Keep high (0.8-1g/lb)',
        recovery: 'Prioritize sleep and stress management',
      },
      progression: {
        description: 'How to build to meet',
        weeks: [
          {
            week: '8-12 weeks out',
            focus: 'Build work capacity with comp lifts',
            example: '3x5@80%, 4x4@82%',
          },
          {
            week: '6-8 weeks out',
            focus: 'Heavier sets, lower reps',
            example: '5x3@85%, 6x2@87%',
          },
          {
            week: '4-6 weeks out',
            focus: 'Heavy singles and doubles',
            example: '3x2@90%, 5x1@92%',
          },
          {
            week: '2-4 weeks out',
            focus: 'Transition to comp prep',
            example: 'Test openers, start reducing volume',
          },
        ],
      },
      mentalShift: [
        'Getting serious now',
        'Can feel fatigue building (normal)',
        'Trust you\'re getting stronger',
        'Don\'t panic if lifts feel heavy',
        'Stay patient with process',
      ],
    },
    compprep: {
      name: 'Competition Prep',
      icon: 'trophy',
      color: 'amber',
      duration: '4-6 weeks before meet',
      goals: [
        'Peak strength',
        'Perfect competition technique',
        'Practice commands',
        'Reduce fatigue',
        'Build confidence',
        'Finalize meet strategy',
      ],
      training: {
        intensity: '85-95% (heavy but controlled)',
        volume: 'Low (50-70% of off-season volume)',
        exerciseSelection: [
          'Competition lifts almost exclusively',
          'Minimal variations (maybe comp pauses)',
          'Only essential accessories',
          'Drop everything non-essential',
        ],
        repRanges: [
          'Mostly singles and doubles',
          'Some triples',
          'Heavy but not maxing out',
        ],
        frequency: [
          'Each lift 2x per week (some do 1x)',
          '3-4 training days',
          'More rest days',
        ],
      },
      weekByWeek: {
        description: 'Typical 6-week comp prep',
        weeks: [
          {
            week: '6 weeks out',
            volume: '100% (last high volume week)',
            intensity: '85-88%',
            focus: 'Build with doubles and triples',
          },
          {
            week: '5 weeks out',
            volume: '90%',
            intensity: '87-90%',
            focus: 'Heavy doubles, some singles',
          },
          {
            week: '4 weeks out',
            volume: '80%',
            intensity: '90-92%',
            focus: 'Heavy singles, practice commands',
          },
          {
            week: '3 weeks out',
            volume: '70%',
            intensity: '92-95%',
            focus: 'Test openers, heavy singles',
          },
          {
            week: '2 weeks out',
            volume: '40% (DELOAD)',
            intensity: '60-80%',
            focus: 'Back off, light movement',
          },
          {
            week: '1 week out (meet week)',
            volume: '20%',
            intensity: '70-85%',
            focus: 'Openers or light, then REST',
          },
        ],
      },
      nutrition: {
        weightClass: [
          'If cutting, finish 1-2 weeks before meet',
          'Last week: water/sodium manipulation if needed',
          'Don\'t crash diet during peak',
        ],
        fueling: [
          'Keep eating enough (maintenance)',
          'High carbs for energy',
          'Protein steady',
          'Hydration critical',
        ],
      },
      mental: [
        'Confidence from hitting heavy weights',
        'Don\'t test true max (injury risk)',
        'Trust your openers (should feel easy)',
        'Visualize meet day',
        'Prepare logistics (gear, weigh-in, etc.)',
      ],
    },
    postmeet: {
      name: 'Post-Meet Recovery',
      icon: 'bed',
      color: 'cyan',
      duration: '1-2 weeks',
      whyNecessary: [
        'Physical recovery from meet effort',
        'Mental break from intensity',
        'Prevent burnout',
        'Heal minor injuries',
        'Plan next phase',
      ],
      options: {
        option1: {
          name: 'Complete Rest',
          description: 'No training at all',
          pros: 'Maximum recovery',
          cons: 'Some lifters feel antsy',
          bestFor: 'If very fatigued or nursing injury',
        },
        option2: {
          name: 'Active Recovery',
          description: 'Light movement, different activities',
          examples: [
            'Walking, hiking',
            'Swimming',
            'Yoga, mobility',
            'Light bodyweight',
            'Other sports for fun',
          ],
          bestFor: 'Most people',
        },
        option3: {
          name: 'Fun Lifting',
          description: 'Lift but no structure, just enjoy',
          examples: [
            'Try new exercises',
            'No percentages or programming',
            'Different rep ranges',
            'Crossfit, strongman, Oly lifts',
            'Just feel it out',
          ],
          bestFor: 'If you love lifting',
        },
      },
      reflection: [
        'Review meet performance',
        'What went well?',
        'What to improve?',
        'Did prep work?',
        'Update maxes and plan next cycle',
      ],
      planning: [
        'Set goals for next meet or off-season',
        'Identify weak points to address',
        'Plan nutrition strategy',
        'Schedule next meet if competing',
        'Decide on program for next phase',
      ],
    },
    multipleMeets: {
      name: 'Multiple Meets Strategy',
      icon: 'calendar-outline',
      color: 'red',
      scenarios: [
        {
          scenario: '2 Meets Close Together (6-8 weeks)',
          strategy: 'Maintenance between',
          approach: [
            'Week 1-2 post first meet: Recovery',
            'Week 3-4: Moderate training (80-85%)',
            'Week 5-6: Light comp prep',
            'Week 7: Deload',
            'Week 8: Meet 2',
          ],
          note: 'Won\'t PR as much on 2nd meet, but good experience',
        },
        {
          scenario: '2 Meets Far Apart (4+ months)',
          strategy: 'Full cycle between',
          approach: [
            'Weeks 1-2: Recovery',
            'Weeks 3-12: Mini off-season',
            'Weeks 13-16: Comp prep',
            'Week 17: Taper',
            'Week 18: Meet 2',
          ],
          note: 'Can make significant progress between meets',
        },
        {
          scenario: '3-4 Meets Per Year',
          strategy: 'Prioritize meets',
          approach: [
            'Pick 1-2 "A meets" (full peak)',
            'Other meets are "B meets" (less peak)',
            'B meets: maintenance or slight taper',
            'Use B meets for practice/qualification',
            'Full off-season after last A meet',
          ],
          note: 'Can\'t peak for everything - strategic planning',
        },
      ],
      mistakes: [
        'Trying to peak for every meet',
        'Not enough recovery between',
        'No real off-season',
        'Burning out from constant peaking',
        'Competing too frequently (more than 4/year)',
      ],
    },
  };

  const currentPhase = periodizationData[selectedPhase as keyof typeof periodizationData];

  const getColorClass = (color: string) => {
    const colors: { [key: string]: string } = {
      blue: 'bg-blue-500',
      emerald: 'bg-emerald-500',
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
            Annual Periodization
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          <View className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl p-6 mb-6">
            <Text className="text-white text-2xl font-bold mb-2">The Yearly Plan</Text>
            <Text className="text-white opacity-90">
              Structure your training year for maximum progress
            </Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6">
            <View className="flex-row gap-3 px-1">
              {Object.entries(periodizationData).map(([key, phase]) => (
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
                  } min-w-[180px]`}
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

          {selectedPhase === 'overview' && (
            <View>
              <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
                <Text className="text-blue-400 text-xl font-bold mb-3">What Is Periodization?</Text>
                <Text className="text-zinc-300 mb-4">{currentPhase.concept?.whatIs}</Text>

                <Text className="text-white font-bold mb-2">Why Periodize?</Text>
                {currentPhase.concept?.why.map((reason: string, idx: number) => (
                  <Text key={idx} className="text-zinc-300 text-sm mb-1">• {reason}</Text>
                ))}
              </View>

              <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
                <Text className="text-blue-400 text-xl font-bold mb-4">Typical Year Structure</Text>
                {currentPhase.yearStructure?.phases.map((phase: any, idx: number) => (
                  <View key={idx} className="bg-zinc-800 rounded-xl p-4 mb-4 last:mb-0">
                    <Text className="text-white font-bold mb-2">{phase.name}</Text>
                    <Text className="text-zinc-300 text-sm mb-2">{phase.focus}</Text>
                    <View className="flex-row flex-wrap gap-2">
                      <View className="bg-blue-500/20 rounded-lg px-2 py-1">
                        <Text className="text-blue-300 text-xs">Intensity: {phase.intensity}</Text>
                      </View>
                      <View className="bg-purple-500/20 rounded-lg px-2 py-1">
                        <Text className="text-purple-300 text-xs">Volume: {phase.volume}</Text>
                      </View>
                    </View>
                  </View>
                ))}
              </View>

              <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
                <Text className="text-blue-400 text-xl font-bold mb-4">How Many Meets?</Text>
                {Object.entries(currentPhase.howManyMeets || {}).map(([level, data]: [string, any]) => (
                  <View key={level} className="mb-4 last:mb-0">
                    <Text className="text-white font-bold capitalize mb-1">{level}</Text>
                    <Text className="text-emerald-400 text-sm mb-1">{data.meets}</Text>
                    <Text className="text-zinc-300 text-sm mb-1">{data.reasoning}</Text>
                    <Text className="text-zinc-400 text-sm italic">{data.structure}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {(selectedPhase === 'offseason' || selectedPhase === 'precomp' || selectedPhase === 'compprep') && (
            <View>
              {currentPhase.duration && (
                <View className="bg-zinc-900 rounded-xl p-4 mb-6 border border-zinc-800">
                  <Text className="text-white font-bold">Duration: {currentPhase.duration}</Text>
                </View>
              )}

              {currentPhase.goals && (
                <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
                  <Text className="text-white text-lg font-bold mb-3">Goals</Text>
                  {currentPhase.goals.map((goal: string, idx: number) => (
                    <Text key={idx} className="text-zinc-300 mb-1">• {goal}</Text>
                  ))}
                </View>
              )}

              {currentPhase.training && (
                <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
                  <Text className="text-white text-lg font-bold mb-4">Training Parameters</Text>
                  
                  {Object.entries(currentPhase.training).map(([key, value]: [string, any]) => (
                    <View key={key} className="mb-3 last:mb-0">
                      <Text className="text-blue-400 font-bold capitalize mb-1">{key}:</Text>
                      {typeof value === 'string' ? (
                        <Text className="text-zinc-300 text-sm">{value}</Text>
                      ) : (
                        value.map((item: string, idx: number) => (
                          <Text key={idx} className="text-zinc-300 text-sm mb-1">• {item}</Text>
                        ))
                      )}
                    </View>
                  ))}
                </View>
              )}

              {currentPhase.weekByWeek && (
                <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
                  <Text className="text-amber-400 text-lg font-bold mb-3">{currentPhase.weekByWeek.description}</Text>
                  {currentPhase.weekByWeek.weeks.map((week: any, idx: number) => (
                    <View key={idx} className="bg-zinc-800 rounded-xl p-4 mb-3 last:mb-0">
                      <Text className="text-white font-bold mb-2">{week.week}</Text>
                      <Text className="text-zinc-300 text-sm mb-1">Volume: {week.volume}</Text>
                      <Text className="text-zinc-300 text-sm mb-1">Intensity: {week.intensity}</Text>
                      <Text className="text-blue-400 text-sm">{week.focus}</Text>
                    </View>
                  ))}
                </View>
              )}

              {currentPhase.nutrition && (
                <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
                  <Text className="text-white text-lg font-bold mb-3">Nutrition</Text>
                  {Object.entries(currentPhase.nutrition).map(([key, value]: [string, any]) => (
                    <View key={key} className="mb-2 last:mb-0">
                      <Text className="text-emerald-400 font-bold capitalize text-sm">{key}:</Text>
                      {typeof value === 'string' ? (
                        <Text className="text-zinc-300 text-sm">{value}</Text>
                      ) : (
                        value.map((item: string, idx: number) => (
                          <Text key={idx} className="text-zinc-300 text-sm mb-1">• {item}</Text>
                        ))
                      )}
                    </View>
                  ))}
                </View>
              )}

              {currentPhase.mentalApproach && (
                <View className="bg-purple-500/10 rounded-xl p-5 border border-purple-500/30 mb-6">
                  <Text className="text-purple-400 font-bold mb-3">Mental Approach</Text>
                  {currentPhase.mentalApproach.map((item: string, idx: number) => (
                    <Text key={idx} className="text-purple-300 text-sm mb-1">• {item}</Text>
                  ))}
                </View>
              )}

              {currentPhase.mistakes && (
                <View className="bg-red-500/10 rounded-xl p-5 border border-red-500/30 mb-6">
                  <Text className="text-red-400 font-bold mb-3">Common Mistakes</Text>
                  {currentPhase.mistakes.map((mistake: string, idx: number) => (
                    <Text key={idx} className="text-red-300 text-sm mb-1">✗ {mistake}</Text>
                  ))}
                </View>
              )}
            </View>
          )}

          {selectedPhase === 'postmeet' && (
            <View>
              <View className="bg-cyan-500/10 rounded-xl p-5 border border-cyan-500/30 mb-6">
                <Text className="text-cyan-400 font-bold text-lg mb-3">Why Recovery Matters</Text>
                {currentPhase.whyNecessary?.map((reason: string, idx: number) => (
                  <Text key={idx} className="text-cyan-300 text-sm mb-1">• {reason}</Text>
                ))}
              </View>

              {Object.entries(currentPhase.options || {}).map(([key, option]: [string, any]) => (
                <View key={key} className="bg-zinc-900 rounded-xl p-5 mb-4 border border-zinc-800">
                  <Text className="text-white font-bold mb-2">{option.name}</Text>
                  <Text className="text-zinc-300 text-sm mb-3">{option.description}</Text>
                  {option.examples && (
                    <View className="mb-3">
                      {option.examples.map((ex: string, idx: number) => (
                        <Text key={idx} className="text-zinc-400 text-sm mb-1">• {ex}</Text>
                      ))}
                    </View>
                  )}
                  <View className="flex-row justify-between">
                    {option.pros && <Text className="text-emerald-400 text-sm">✓ {option.pros}</Text>}
                    {option.cons && <Text className="text-red-400 text-sm">✗ {option.cons}</Text>}
                  </View>
                  <Text className="text-blue-400 text-sm mt-2">Best for: {option.bestFor}</Text>
                </View>
              ))}
            </View>
          )}

          {selectedPhase === 'multipleMeets' && (
            <View>
              {currentPhase.scenarios?.map((scenario: any, idx: number) => (
                <View key={idx} className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
                  <Text className="text-red-400 text-lg font-bold mb-2">{scenario.scenario}</Text>
                  <Text className="text-white font-bold mb-3">Strategy: {scenario.strategy}</Text>
                  
                  <View className="bg-zinc-800 rounded-xl p-4 mb-3">
                    {scenario.approach.map((step: string, sIdx: number) => (
                      <Text key={sIdx} className="text-zinc-300 text-sm mb-1 last:mb-0">• {step}</Text>
                    ))}
                  </View>

                  <View className="bg-blue-500/10 rounded-xl p-3 border border-blue-500/30">
                    <Text className="text-blue-300 text-sm">{scenario.note}</Text>
                  </View>
                </View>
              ))}

              <View className="bg-red-500/10 rounded-xl p-5 border border-red-500/30 mb-6">
                <Text className="text-red-400 font-bold mb-3">Mistakes to Avoid</Text>
                {currentPhase.mistakes?.map((mistake: string, idx: number) => (
                  <Text key={idx} className="text-red-300 text-sm mb-1">✗ {mistake}</Text>
                ))}
              </View>
            </View>
          )}

          <View className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl p-5 border border-blue-500/30 mb-6">
            <Text className="text-blue-400 font-bold text-lg mb-3">Remember</Text>
            <Text className="text-blue-300 text-sm mb-2">
              • Can't be strong and peaked year-round
            </Text>
            <Text className="text-blue-300 text-sm mb-2">
              • Off-season builds the foundation
            </Text>
            <Text className="text-blue-300 text-sm mb-2">
              • Peaking is temporary - enjoy it then recover
            </Text>
            <Text className="text-blue-300 text-sm">
              • Plan the year, execute the plan, adjust as needed
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
