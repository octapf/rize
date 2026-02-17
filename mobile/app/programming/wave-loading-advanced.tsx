import React, { useState } from 'react';
import { Text } from '@/components/ui/Text';
import { View, TouchableOpacity, ScrollView } from 'react-native';;
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function WaveLoadingAdvanced() {
  const [selectedType, setSelectedType] = useState('basics');

  const waveData = {
    basics: {
      name: 'Wave Loading Basics',
      icon: 'pulse',
      color: 'blue',
      whatIs: {
        definition: 'Strategic manipulation of intensity across sets to maximize strength output',
        principle: 'Fatigue + potentiation = greater performance on subsequent waves',
        simple: 'Do heavy set, back off, then go heavier than you could without wave',
      },
      classic_wave: {
        title: 'Classic 3-2-1 Wave',
        structure: [
          'Set 1: 3 reps @ 85%',
          'Set 2: 2 reps @ 90%',
          'Set 3: 1 rep @ 95%',
          'REST 3-5 minutes',
          'Set 4: 3 reps @ 87.5% (2.5% heavier)',
          'Set 5: 2 reps @ 92.5%',
          'Set 6: 1 rep @ 97.5-100%',
        ],
        why: 'First wave primes nervous system, second wave you lift heavier',
        key: 'The "backoff" is actually setting up bigger lifts',
      },
      benefits: [
        'Lift heavier than straight sets',
        'More quality volume at high intensity',
        'Better neural activation',
        'Less monotonous than 5x5',
        'Builds strength AND technique under fatigue',
        'Good for peaking',
      ],
      when_to_use: [
        'Intermediate to advanced lifters',
        'Peaking phase (4-6 weeks out)',
        'When stuck on plateau',
        'To practice heavy singles without maxing',
        'Building confidence with heavy weight',
      ],
    },
    patterns: {
      name: 'Wave Patterns',
      icon: 'stats-chart',
      color: 'primary',
      ascending: {
        title: 'Ascending Waves (Classic)',
        pattern: 'Reps decrease, weight increases',
        examples: [
          {
            name: '3-2-1 Wave',
            sets: '85% x3, 90% x2, 95% x1',
            waves: '2-3 waves',
            benefit: 'Most common, build to heavy single',
          },
          {
            name: '5-3-1 Wave',
            sets: '80% x5, 85% x3, 90-92% x1',
            waves: '2 waves',
            benefit: 'More volume, good for strength-building phase',
          },
          {
            name: '4-3-2-1 Wave',
            sets: '80% x4, 85% x3, 90% x2, 95% x1',
            waves: '1-2 waves',
            benefit: 'Extended wave, lots of quality work',
          },
        ],
      },
      descending: {
        title: 'Descending Waves (Reverse)',
        pattern: 'Reps increase, weight decreases',
        examples: [
          {
            name: '1-2-3 Reverse Wave',
            sets: '95% x1, 90% x2, 85% x3',
            waves: '2-3 waves',
            benefit: 'Start heavy when fresh, accumulate volume fatigued',
          },
          {
            name: '1-3-5 Reverse',
            sets: '92% x1, 87% x3, 82% x5',
            waves: '2 waves',
            benefit: 'Heavy neural work then hypertrophy stimulus',
          },
        ],
        use_case: 'When you want heavy single first, or building fatigue resistance',
      },
      pyramid: {
        title: 'Pyramid Waves',
        pattern: 'Up then down (or down then up)',
        examples: [
          {
            name: '3-2-1-2-3 Pyramid',
            sets: '85% x3 → 90% x2 → 95% x1 → 90% x2 → 85% x3',
            benefit: 'Build up, peak, come back down with volume',
          },
          {
            name: '1-2-3-2-1 Reverse Pyramid',
            sets: '95% x1 → 90% x2 → 85% x3 → 90% x2 → 95% x1',
            benefit: 'Heavy bookends with volume middle',
          },
        ],
        use_case: 'High work capacity, advanced lifters',
      },
      cluster: {
        title: 'Cluster Waves',
        pattern: 'Multiple mini-sets within wave',
        examples: [
          {
            name: 'Cluster 3-2-1',
            sets: '(1+1+1)@87% → (1+1)@92% → 1@97%',
            rest: '15-30sec between cluster reps, 3min between sets',
            benefit: 'More total reps at high intensity',
          },
        ],
        use_case: 'Peak strength phase, handling heavy loads',
      },
    },
    advanced: {
      name: 'Advanced Applications',
      icon: 'rocket',
      color: 'purple',
      daily_max: {
        title: 'Daily Max Waves',
        concept: 'Wave up to max for that day (not true 1RM)',
        protocol: [
          'Wave 1: 3@80%, 2@85%, 1@90%',
          'Wave 2: 3@82%, 2@87%, 1@92%',
          'Wave 3: Work to heavy single (95-97%)',
          'Don\'t miss - stop at clean single',
        ],
        frequency: '1-2x per week per lift',
        benefit: 'Practice maximal lifting without testing true max',
        caution: 'Can be taxing - don\'t overuse',
      },
      contrast: {
        title: 'Contrast Waves',
        concept: 'Alternate between loading patterns',
        examples: [
          {
            name: 'Heavy/Speed Contrast',
            wave_1: 'Heavy: 3@85%, 2@90%, 1@95%',
            wave_2: 'Speed: 3x3@70% (explosive)',
            benefit: 'Train max strength and rate of force development',
          },
          {
            name: 'Equipped/Raw Contrast',
            wave_1: 'Raw: 3-2-1 wave',
            wave_2: 'With wraps/sleeves: 3-2-1 heavier',
            benefit: 'Overload with equipment, potentiate raw',
          },
        ],
      },
      variable: {
        title: 'Variable Wave Schemes',
        concept: 'Different rep schemes each wave',
        examples: [
          {
            name: 'Volume to Intensity Waves',
            wave_1: '5-3-1 @ 75-80-85%',
            wave_2: '3-2-1 @ 85-90-95%',
            wave_3: '2-1-1 @ 90-95-97%',
            benefit: 'Start with volume, end with intensity',
          },
          {
            name: 'Random Undulation',
            wave_1: '4-2-1',
            wave_2: '3-3-2',
            wave_3: '2-1-1',
            benefit: 'Unpredictable stimulus, avoid adaptation',
          },
        ],
      },
      extended: {
        title: 'Extended Wave Cycles',
        concept: 'Waves over multiple sessions, not just one',
        protocol: {
          week_1: 'Monday: Wave to 90%, Friday: Wave to 92%',
          week_2: 'Monday: Wave to 92%, Friday: Wave to 95%',
          week_3: 'Monday: Wave to 95%, Friday: Wave to 97%',
          week_4: 'Deload',
        },
        benefit: 'Progressive overload built into wave structure',
        use: 'Peaking block leading to meet',
      },
    },
    programming: {
      name: 'Programming Waves',
      icon: 'construct',
      color: 'amber',
      frequency: {
        title: 'How Often to Wave',
        guidelines: [
          {
            lift: 'Squat',
            frequency: '1-2x per week',
            note: 'Heavy on legs, don\'t overdo',
          },
          {
            lift: 'Bench',
            frequency: '2-3x per week',
            note: 'Can handle more frequency, lighter on CNS',
          },
          {
            lift: 'Deadlift',
            frequency: '1x per week',
            note: 'Very taxing, once per week enough',
          },
        ],
        rule: 'Don\'t wave every session - mix with volume work',
      },
      progression: {
        title: 'Progressive Overload with Waves',
        methods: [
          {
            method: 'Increase Top Single',
            week_1: 'Wave to 95%',
            week_2: 'Wave to 96%',
            week_3: 'Wave to 97%',
            week_4: 'Deload',
          },
          {
            method: 'Add Weight to Wave',
            week_1: '85-90-95%',
            week_2: '87-92-97%',
            week_3: '88-93-98%',
            week_4: 'Deload',
          },
          {
            method: 'Add Waves',
            week_1: '2 waves',
            week_2: '2 waves (slightly heavier)',
            week_3: '3 waves',
            week_4: 'Deload',
          },
        ],
      },
      sample_week: {
        title: 'Sample Week with Waves',
        monday: {
          lift: 'Squat',
          main: 'Wave loading: 2 waves of 3-2-1',
          accessory: 'Paused squat 3x5, leg work',
        },
        wednesday: {
          lift: 'Bench',
          main: 'Wave loading: 3 waves of 3-2-1',
          accessory: 'Close grip 4x6, upper back',
        },
        friday: {
          lift: 'Deadlift',
          main: 'Wave loading: 2 waves of 3-2-1',
          accessory: 'RDLs 3x8, back work',
        },
        notes: [
          'Wave only on main lift',
          'Accessories are straight sets',
          'Total waves: 7 per week (manageable)',
        ],
      },
      combining: {
        title: 'Combining with Other Methods',
        scenarios: [
          {
            combo: 'Waves + Volume Days',
            structure: 'Monday: Wave squat, Friday: Volume squat 5x5',
            benefit: 'Intensity + volume without overload',
          },
          {
            combo: 'Waves + Block Periodization',
            structure: 'Use waves in intensification block, not accumulation',
            benefit: 'Right tool at right time',
          },
          {
            combo: 'Waves + Conjugate',
            structure: 'Max effort day = waves, Dynamic day = speed',
            benefit: 'Varies from Westside but similar concept',
          },
        ],
      },
    },
    execution: {
      name: 'Execution Tips',
      icon: 'barbell',
      color: 'red',
      rest_periods: {
        title: 'Rest Between Sets',
        within_wave: [
          'Between 3-2-1 sets: 2-3 minutes',
          'Allow some recovery but keep potentiation',
          'Don\'t rush but don\'t go cold',
        ],
        between_waves: [
          'Between waves: 3-5 minutes',
          'Need more recovery for next wave',
          'Walk around, stay warm',
        ],
        rule: 'Quality > rushing. Take what you need.',
      },
      technique: {
        title: 'Technical Considerations',
        points: [
          'First rep of wave sets tone - make it perfect',
          'Don\'t grind every rep (RPE 8-9, not 10)',
          'Film your sets - technique matters more as fatigue builds',
          'If form breaks down, stop the wave',
          'Singles should be fast and clean',
        ],
        mindset: 'Waves are about quality heavy reps, not grinding',
      },
      percentages: {
        title: 'Calculating Percentages',
        based_on: 'Use training max (90-95% of true max)',
        why: 'Room to add weight across waves',
        example: [
          'True max: 500lb squat',
          'Training max: 475lb (95%)',
          'Wave percentages off 475lb',
          '85% = 405, 90% = 430, 95% = 450',
          'Second wave: might hit 460-465',
        ],
        adjustment: 'If percentages feel off, adjust training max',
      },
      auto_regulation: {
        title: 'Listening to Your Body',
        principles: [
          'Wave up to daily max, not predetermined number',
          'Some days hit 97%, some days 92%',
          'If first wave feels terrible, don\'t do second',
          'Can always add weight if feeling good',
          'Better to undershoot than grind and miss',
        ],
        RPE_guide: [
          'First wave: RPE 7-8 on top single',
          'Second wave: RPE 8-9 on top single',
          'Third wave (if any): RPE 9 max',
        ],
      },
    },
    troubleshooting: {
      name: 'Troubleshooting',
      icon: 'build',
      color: 'cyan',
      problems: [
        {
          issue: 'Second wave feels worse, not better',
          causes: [
            'Not enough rest between waves',
            'First wave too hard (too many reps to failure)',
            'Not warmed up enough before first wave',
          ],
          fixes: [
            'Rest 5 minutes between waves',
            'First wave should be RPE 7-8 max',
            'Better warm-up protocol',
          ],
        },
        {
          issue: 'Can\'t complete all planned waves',
          causes: [
            'Too many waves programmed',
            'Percentages too aggressive',
            'Not recovered from previous session',
          ],
          fixes: [
            'Start with 2 waves, add third only if feeling good',
            'Lower percentages 2-3%',
            'More recovery days or lower training frequency',
          ],
        },
        {
          issue: 'Form breaking down on waves',
          causes: [
            'Fatigue accumulating too fast',
            'Weights too heavy',
            'Weak points exposed under fatigue',
          ],
          fixes: [
            'Stop wave when form degrades',
            'Work on weak points separately',
            'Film and review - identify specific breakdown',
          ],
        },
        {
          issue: 'Not feeling potentiation effect',
          causes: [
            'First wave not heavy enough to potentiate',
            'Rest too long between waves (lost effect)',
            'Individual variation - some don\'t respond well',
          ],
          fixes: [
            'First wave needs to be 85%+ to create effect',
            'Reduce rest between waves to 3-4min',
            'Waves might not be for you - try other methods',
          ],
        },
      ],
    },
  };

  const currentType = waveData[selectedType as keyof typeof waveData];

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
            Wave Loading Advanced
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          <View className="bg-gradient-to-r from-primary to-[#7D0EBE] rounded-xl p-6 mb-6">
            <Text className="text-white text-2xl font-bold mb-2">Strategic Loading</Text>
            <Text className="text-white opacity-90">
              Master wave patterns for maximum strength
            </Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6">
            <View className="flex-row gap-3 px-1">
              {Object.entries(waveData).map(([key, type]) => (
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

          {selectedType === 'basics' && (
            <View>
              <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
                <Text className="text-primary/80 text-xl font-bold mb-3">What Is Wave Loading?</Text>
                <Text className="text-zinc-300 mb-2">{currentType.whatIs?.definition}</Text>
                <Text className="text-primary/80 text-sm mb-2">Principle: {currentType.whatIs?.principle}</Text>
                <View className="bg-primary/10 rounded-xl p-3 border border-primary/30">
                  <Text className="text-primary/60 text-sm">{currentType.whatIs?.simple}</Text>
                </View>
              </View>

              <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
                <Text className="text-primary text-xl font-bold mb-4">{currentType.classic_wave?.title}</Text>
                <View className="bg-zinc-800 rounded-xl p-4 mb-3">
                  {currentType.classic_wave?.structure.map((set: string, idx: number) => (
                    <Text key={idx} className="text-zinc-300 mb-1">{set}</Text>
                  ))}
                </View>
                <View className="bg-primary/10 rounded-xl p-3 border border-primary/30 mb-2">
                  <Text className="text-primary text-sm font-bold">Why: {currentType.classic_wave?.why}</Text>
                </View>
                <View className="bg-primary/10 rounded-xl p-3 border border-primary/30">
                  <Text className="text-primary/80 text-sm font-bold">Key: {currentType.classic_wave?.key}</Text>
                </View>
              </View>

              <View className="bg-primary/10 rounded-xl p-5 border border-primary/30 mb-6">
                <Text className="text-primary font-bold text-lg mb-3">Benefits:</Text>
                {currentType.benefits?.map((benefit: string, idx: number) => (
                  <Text key={idx} className="text-primary/80 text-sm mb-1">? {benefit}</Text>
                ))}
              </View>

              <View className="bg-primary/10 rounded-xl p-5 border border-primary/30 mb-6">
                <Text className="text-primary/80 font-bold text-lg mb-3">When to Use:</Text>
                {currentType.when_to_use?.map((when: string, idx: number) => (
                  <Text key={idx} className="text-primary/60 text-sm mb-1">• {when}</Text>
                ))}
              </View>
            </View>
          )}

          {selectedType === 'patterns' && (
            <View>
              {Object.entries(currentType).filter(([key]) => !['name', 'icon', 'color'].includes(key)).map(([key, pattern]: [string, any]) => (
                <View key={key} className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
                  <Text className="text-primary text-xl font-bold mb-2">{pattern.title}</Text>
                  <Text className="text-zinc-300 mb-4">{pattern.pattern}</Text>

                  {pattern.examples?.map((ex: any, idx: number) => (
                    <View key={idx} className="bg-zinc-800 rounded-xl p-4 mb-3 last:mb-0">
                      <Text className="text-white font-bold mb-2">{ex.name}</Text>
                      <Text className="text-primary/80 text-sm mb-1">Sets: {ex.sets}</Text>
                      {ex.waves && <Text className="text-purple-400 text-sm mb-1">Waves: {ex.waves}</Text>}
                      {ex.rest && <Text className="text-amber-400 text-sm mb-1">Rest: {ex.rest}</Text>}
                      <View className="bg-primary/10 rounded-xl p-2 border border-primary/30 mt-2">
                        <Text className="text-primary/80 text-sm">Benefit: {ex.benefit}</Text>
                      </View>
                    </View>
                  ))}

                  {pattern.use_case && (
                    <View className="bg-primary/10 rounded-xl p-3 border border-primary/30 mt-3">
                      <Text className="text-primary/80 text-sm">Use Case: {pattern.use_case}</Text>
                    </View>
                  )}
                </View>
              ))}
            </View>
          )}

          {selectedType === 'advanced' && (
            <View>
              {Object.entries(currentType).filter(([key]) => !['name', 'icon', 'color'].includes(key)).map(([key, advanced]: [string, any]) => (
                <View key={key} className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
                  <Text className="text-purple-400 text-xl font-bold mb-3">{advanced.title}</Text>
                  <Text className="text-zinc-300 mb-4">{advanced.concept}</Text>

                  {advanced.protocol && (
                    <View className="bg-purple-500/10 rounded-xl p-4 border border-purple-500/30 mb-3">
                      <Text className="text-purple-400 font-bold mb-2">Protocol:</Text>
                      {Array.isArray(advanced.protocol) ? (
                        advanced.protocol.map((item: string, idx: number) => (
                          <Text key={idx} className="text-purple-300 text-sm mb-1">• {item}</Text>
                        ))
                      ) : (
                        Object.entries(advanced.protocol).map(([week, detail]: [string, any]) => (
                          <Text key={week} className="text-purple-300 text-sm mb-1">{week}: {detail}</Text>
                        ))
                      )}
                    </View>
                  )}

                  {advanced.examples?.map((ex: any, idx: number) => (
                    <View key={idx} className="bg-zinc-800 rounded-xl p-4 mb-3 last:mb-0">
                      <Text className="text-white font-bold mb-2">{ex.name}</Text>
                      {Object.entries(ex).filter(([k]) => !['name', 'benefit'].includes(k)).map(([key, value]: [string, any]) => (
                        <Text key={key} className="text-zinc-300 text-sm mb-1">{key}: {value}</Text>
                      ))}
                      {ex.benefit && (
                        <View className="bg-primary/10 rounded-xl p-2 border border-primary/30 mt-2">
                          <Text className="text-primary/80 text-sm">{ex.benefit}</Text>
                        </View>
                      )}
                    </View>
                  ))}

                  {advanced.frequency && <Text className="text-primary/80 text-sm mb-1">Frequency: {advanced.frequency}</Text>}
                  {advanced.benefit && <Text className="text-primary text-sm mb-1">Benefit: {advanced.benefit}</Text>}
                  {advanced.caution && <Text className="text-red-400 text-sm mb-1">Caution: {advanced.caution}</Text>}
                  {advanced.use && <Text className="text-amber-400 text-sm">Use: {advanced.use}</Text>}
                </View>
              ))}
            </View>
          )}

          {selectedType === 'programming' && (
            <View>
              {Object.entries(currentType).filter(([key]) => !['name', 'icon', 'color'].includes(key)).map(([key, section]: [string, any]) => (
                <View key={key} className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
                  <Text className="text-amber-400 text-xl font-bold mb-4">{section.title}</Text>

                  {section.guidelines?.map((guide: any, idx: number) => (
                    <View key={idx} className="bg-zinc-800 rounded-xl p-3 mb-3 last:mb-0">
                      <Text className="text-white font-bold">{guide.lift}</Text>
                      <Text className="text-primary/80 text-sm">Frequency: {guide.frequency}</Text>
                      <Text className="text-zinc-400 text-sm">{guide.note}</Text>
                    </View>
                  ))}

                  {section.methods?.map((method: any, idx: number) => (
                    <View key={idx} className="bg-amber-500/10 rounded-xl p-4 border border-amber-500/30 mb-3 last:mb-0">
                      <Text className="text-amber-400 font-bold mb-2">{method.method}</Text>
                      {Object.entries(method).filter(([k]) => k !== 'method').map(([week, detail]: [string, any]) => (
                        <Text key={week} className="text-amber-300 text-sm mb-1">{week}: {detail}</Text>
                      ))}
                    </View>
                  ))}

                  {section.main && (
                    <View className="mb-3">
                      <Text className="text-white font-bold mb-1">{section.lift}</Text>
                      <Text className="text-primary/80 text-sm mb-1">Main: {section.main}</Text>
                      <Text className="text-zinc-400 text-sm">Accessory: {section.accessory}</Text>
                    </View>
                  )}

                  {section.notes && (
                    <View className="bg-primary/10 rounded-xl p-3 border border-primary/30 mt-3">
                      {section.notes.map((note: string, idx: number) => (
                        <Text key={idx} className="text-primary/60 text-sm mb-1">• {note}</Text>
                      ))}
                    </View>
                  )}

                  {section.scenarios?.map((scenario: any, idx: number) => (
                    <View key={idx} className="bg-zinc-800 rounded-xl p-4 mb-3 last:mb-0">
                      <Text className="text-white font-bold mb-1">{scenario.combo}</Text>
                      <Text className="text-zinc-300 text-sm mb-1">Structure: {scenario.structure}</Text>
                      <Text className="text-primary text-sm">Benefit: {scenario.benefit}</Text>
                    </View>
                  ))}

                  {section.rule && (
                    <Text className="text-red-400 text-sm mt-3 italic">{section.rule}</Text>
                  )}
                </View>
              ))}
            </View>
          )}

          {selectedType === 'execution' && (
            <View>
              {Object.entries(currentType).filter(([key]) => !['name', 'icon', 'color'].includes(key)).map(([key, exec]: [string, any]) => (
                <View key={key} className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
                  <Text className="text-red-400 text-xl font-bold mb-4">{exec.title}</Text>

                  {exec.within_wave && (
                    <View className="bg-red-500/10 rounded-xl p-4 border border-red-500/30 mb-3">
                      <Text className="text-red-400 font-bold mb-2">Within Wave:</Text>
                      {exec.within_wave.map((item: string, idx: number) => (
                        <Text key={idx} className="text-red-300 text-sm mb-1">• {item}</Text>
                      ))}
                    </View>
                  )}

                  {exec.between_waves && (
                    <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-3">
                      <Text className="text-primary/80 font-bold mb-2">Between Waves:</Text>
                      {exec.between_waves.map((item: string, idx: number) => (
                        <Text key={idx} className="text-primary/60 text-sm mb-1">• {item}</Text>
                      ))}
                    </View>
                  )}

                  {exec.points && exec.points.map((point: string, idx: number) => (
                    <Text key={idx} className="text-zinc-300 mb-2">• {point}</Text>
                  ))}

                  {exec.principles && exec.principles.map((principle: string, idx: number) => (
                    <Text key={idx} className="text-zinc-300 mb-2">• {principle}</Text>
                  ))}

                  {exec.example && (
                    <View className="bg-zinc-800 rounded-xl p-4 mt-3">
                      {exec.example.map((line: string, idx: number) => (
                        <Text key={idx} className="text-zinc-300 text-sm mb-1">{line}</Text>
                      ))}
                    </View>
                  )}

                  {exec.RPE_guide && (
                    <View className="bg-amber-500/10 rounded-xl p-4 border border-amber-500/30 mt-3">
                      <Text className="text-amber-400 font-bold mb-2">RPE Guide:</Text>
                      {exec.RPE_guide.map((guide: string, idx: number) => (
                        <Text key={idx} className="text-amber-300 text-sm mb-1">• {guide}</Text>
                      ))}
                    </View>
                  )}

                  {exec.rule && (
                    <Text className="text-primary/80 text-sm mt-3 font-bold">{exec.rule}</Text>
                  )}

                  {exec.mindset && (
                    <Text className="text-purple-400 text-sm mt-3 italic">{exec.mindset}</Text>
                  )}

                  {exec.based_on && <Text className="text-zinc-400 text-sm mb-1">Based on: {exec.based_on}</Text>}
                  {exec.why && <Text className="text-primary/80 text-sm mb-2">Why: {exec.why}</Text>}
                  {exec.adjustment && <Text className="text-amber-400 text-sm">{exec.adjustment}</Text>}
                </View>
              ))}
            </View>
          )}

          {selectedType === 'troubleshooting' && (
            <View>
              {currentType.problems?.map((problem: any, idx: number) => (
                <View key={idx} className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
                  <Text className="text-cyan-400 text-xl font-bold mb-4">{problem.issue}</Text>

                  <View className="bg-red-500/10 rounded-xl p-4 border border-red-500/30 mb-3">
                    <Text className="text-red-400 font-bold mb-2">Causes:</Text>
                    {problem.causes.map((cause: string, cIdx: number) => (
                      <Text key={cIdx} className="text-red-300 text-sm mb-1">• {cause}</Text>
                    ))}
                  </View>

                  <View className="bg-primary/10 rounded-xl p-4 border border-primary/30">
                    <Text className="text-primary font-bold mb-2">Fixes:</Text>
                    {problem.fixes.map((fix: string, fIdx: number) => (
                      <Text key={fIdx} className="text-primary/80 text-sm mb-1">? {fix}</Text>
                    ))}
                  </View>
                </View>
              ))}
            </View>
          )}

          <View className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl p-5 border border-primary/30 mb-6">
            <Text className="text-primary/80 font-bold text-lg mb-3">Remember</Text>
            <Text className="text-primary/60 text-sm mb-2">
              • Waves potentiate - second wave should feel easier
            </Text>
            <Text className="text-primary/60 text-sm mb-2">
              • Don't grind every rep - quality over struggle
            </Text>
            <Text className="text-primary/60 text-sm mb-2">
              • Rest adequately between waves (3-5min)
            </Text>
            <Text className="text-primary/60 text-sm">
              • Autoregulate - some days wave higher than others
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}



