import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function CareerLongevity() {
  const [selectedTopic, setSelectedTopic] = useState('mindset');

  const longevityData = {
    mindset: {
      name: 'Long-Term Mindset',
      icon: 'infinite',
      color: 'blue',
      principles: [
        {
          principle: 'Think in Decades, Not Months',
          explanation: 'Powerlifting is a lifetime sport if you approach it right.',
          perspectives: [
            'You can compete into your 60s, 70s, 80s',
            'Progress compounds over years',
            'Short-term setbacks are irrelevant long-term',
            'What matters in 10 years, not 10 weeks',
            'Top lifters peak in 30s-40s, not 20s',
          ],
          action: [
            'Ask: "Will this matter in 5 years?"',
            'Don\'t rush progress',
            'Play the long game',
            'Sacrifice short-term for long-term health',
          ],
        },
        {
          principle: 'Health > Numbers',
          explanation: 'Being strong is worthless if you\'re injured or unhealthy.',
          tradeoffs: [
            'Skip risky lift to avoid injury',
            'Take extra rest day when needed',
            'Address pain before it becomes injury',
            'Maintain cardiovascular health',
            'Don\'t sacrifice sleep/relationships',
          ],
          reality: [
            'PRs are great but not worth chronic pain',
            'Can always get stronger later',
            'Can\'t train if you\'re broken',
            'Quality of life matters',
          ],
        },
        {
          principle: 'Adapt and Evolve',
          explanation: 'What works at 25 won\'t work at 45. Be willing to change.',
          changes: [
            'Recovery needs increase with age',
            'Volume tolerance may decrease',
            'Technique may need adjustment',
            'Exercise selection may change',
            'Training frequency may need modifying',
          ],
          acceptance: [
            'You\'re not "giving in" to age',
            'You\'re being smart and sustainable',
            'Adaptation is strength, not weakness',
            'Listen to your body',
          ],
        },
        {
          principle: 'Process Over Outcomes',
          explanation: 'Love the training itself, not just the PRs.',
          why: [
            'PRs are rare (especially as you advance)',
            'Training is daily/weekly',
            'If you hate training, you\'ll quit',
            'Enjoy the journey or it\'s miserable',
          ],
          how: [
            'Find training style you enjoy',
            'Appreciate good technique days',
            'Value consistency and showing up',
            'Celebrate small wins',
            'Find gym community you like',
          ],
        },
      ],
    },
    physical: {
      name: 'Physical Longevity',
      icon: 'fitness',
      color: 'emerald',
      strategies: [
        {
          strategy: 'Prioritize Recovery',
          importance: 'Critical',
          actions: [
            {
              action: 'Sleep 7-9 hours',
              why: 'Recovery happens during sleep',
              priority: 'Non-negotiable',
            },
            {
              action: 'Deload every 4-6 weeks',
              why: 'Prevents overtraining accumulation',
              priority: 'Essential',
            },
            {
              action: 'Take rest days',
              why: 'CNS and joints need break',
              priority: 'Essential',
            },
            {
              action: 'Active recovery (walks, mobility)',
              why: 'Promotes blood flow and healing',
              priority: 'Helpful',
            },
            {
              action: 'Massage, sauna, stretching',
              why: 'Aids tissue health',
              priority: 'Nice to have',
            },
          ],
          mistakes: [
            'Training through fatigue constantly',
            'Skipping deloads "because feeling good"',
            'Sleeping 5-6 hours regularly',
            'Never taking full rest days',
          ],
        },
        {
          strategy: 'Prevent Injuries',
          importance: 'Critical',
          prevention: [
            {
              area: 'Warm-up properly',
              how: [
                'General: 5-10min cardio/movement',
                'Specific: Ramp up to working weight',
                'Mobility: Address tight areas',
                'Activation: Prime key muscles',
              ],
              time: '15-20 minutes minimum',
            },
            {
              area: 'Address pain early',
              how: [
                'Tweak → rest/modify immediately',
                'Pain → see professional',
                'Don\'t train through pain',
                'Find pain-free variations',
              ],
              warning: 'Ignoring pain = injury',
            },
            {
              area: 'Maintain mobility',
              how: [
                'Daily light stretching',
                '2-3x/week focused mobility',
                'Squat/hip/shoulder work',
                'Foam rolling tight areas',
              ],
              why: 'Tight = compensation = injury',
            },
            {
              area: 'Balance training',
              how: [
                'Include unilateral work',
                'Train weaknesses',
                'Don\'t neglect back/core',
                'Prevent imbalances',
              ],
              why: 'Imbalances cause injury',
            },
          ],
        },
        {
          strategy: 'Manage Training Volume',
          importance: 'High',
          guidelines: [
            'More isn\'t always better',
            'Find minimum effective dose',
            'Quality > quantity',
            'Volume tolerance is individual',
            'Can decrease with age or stress',
          ],
          signsOvertrained: [
            'Chronic fatigue',
            'Sleep disruption',
            'Constant soreness',
            'Irritability',
            'Declining performance',
            'Frequent colds',
          ],
          solution: [
            'Cut volume 20-30%',
            'Take extra rest day',
            'Deload immediately',
            'Address life stress',
            'Improve sleep/nutrition',
          ],
        },
        {
          strategy: 'Cardiovascular Health',
          importance: 'Often neglected',
          why: [
            'Heart health = longevity',
            'Improves work capacity',
            'Better recovery between sets',
            'Reduces injury risk',
            'Quality of life',
          ],
          how: [
            'Low intensity cardio 2-3x/week',
            '20-30 minutes walking, cycling',
            'Doesn\'t interfere with lifting',
            'Keep heart rate low (zone 2)',
            'Can be on rest days',
          ],
          dont: [
            'HIIT all the time (too taxing)',
            'Long distance running (hard on joints)',
            'Skip cardio entirely',
          ],
        },
      ],
    },
    programming: {
      name: 'Programming Adjustments',
      icon: 'clipboard',
      color: 'purple',
      ageGroups: [
        {
          age: 'Teens (14-19)',
          considerations: [
            'Still growing - be careful with loads',
            'Technique mastery is priority',
            'Can handle high volume',
            'Recovery is fast',
            'Build habits and base',
          ],
          programming: [
            'Focus on technique, not maxes',
            'Higher rep ranges (5-8)',
            'Lots of variations',
            'Don\'t max out frequently',
            'Linear progression works well',
          ],
          avoid: [
            'Training to failure constantly',
            'Max effort every week',
            'Sacrificing technique for weight',
            'Competing too frequently',
          ],
        },
        {
          age: 'Twenties (20-29)',
          considerations: [
            'Peak physical resilience',
            'Can push hardest here',
            'Build strength foundation',
            'Compete frequently if desired',
            'Experiment and find what works',
          ],
          programming: [
            'Can handle high frequency (5-6 days)',
            'High volume effective',
            'Frequent intensity spikes okay',
            'Try different methods',
            'Build work capacity',
          ],
          caution: [
            'Still not invincible',
            'Injuries now follow you',
            'Don\'t ignore recovery',
            'Build good habits early',
          ],
        },
        {
          age: 'Thirties (30-39)',
          considerations: [
            'Often peak performance years',
            'Experience + still strong recovery',
            'May have more life stress',
            'Recovery slightly slower',
            'Can still PR significantly',
          ],
          programming: [
            'Moderate-high frequency (4-5 days)',
            'Be strategic with volume',
            'Deloads more important',
            'Focus on efficiency',
            'Master peaking',
          ],
          adjustments: [
            'May need extra warmup',
            'More conscious recovery',
            'Can\'t party and PR like 20s',
            'Sleep even more critical',
          ],
        },
        {
          age: 'Forties (40-49)',
          considerations: [
            'Recovery takes longer',
            'Injury risk increases',
            'Can still be very strong',
            'Masters divisions start',
            'Wisdom compensates for recovery',
          ],
          programming: [
            'Moderate frequency (3-4 days)',
            'Lower volume, maintain intensity',
            'Longer deloads (every 3-4 weeks)',
            'More accessory for health',
            'Variations to reduce joint stress',
          ],
          important: [
            'Warm-up thoroughly (20+ min)',
            'Address aches immediately',
            'Mobility daily',
            'Recovery modalities helpful',
            'Strategic exercise selection',
          ],
        },
        {
          age: 'Fifties+ (50+)',
          considerations: [
            'Competing against age peers',
            'Recovery is slow',
            'Injury prevention critical',
            'Can still get stronger',
            'Consistency is king',
          ],
          programming: [
            'Lower frequency (2-3 days/lift)',
            'Moderate-low volume',
            'Moderate-high intensity',
            'Focus on technique',
            'Conservative progression',
          ],
          keys: [
            'Listen to your body religiously',
            'Modify exercises as needed',
            'Recovery between sessions',
            'Don\'t compare to younger self',
            'Enjoy the process',
          ],
        },
      ],
    },
    injuries: {
      name: 'Injury Management',
      icon: 'medical',
      color: 'red',
      philosophy: {
        title: 'Injuries Are Opportunities',
        mindset: [
          'Injuries happen to everyone eventually',
          'How you handle them determines career',
          'Can come back stronger',
          'Learn and adapt',
          'Not the end, just a detour',
        ],
      },
      whenInjured: [
        {
          phase: 'Immediately After',
          actions: [
            'Stop aggravating movement immediately',
            'RICE: Rest, Ice, Compression, Elevation (first 48h)',
            'Don\'t panic or despair',
            'Assess severity honestly',
            'See professional if moderate-severe',
          ],
          dont: [
            'Train through it "to see"',
            'Ice after 48 hours (slows healing)',
            'Completely stop all training',
          ],
        },
        {
          phase: 'Recovery Phase (1-6 weeks)',
          actions: [
            'Work around injury (train what doesn\'t hurt)',
            'Find pain-free variations',
            'Maintain fitness in other areas',
            'Rehab exercises from professional',
            'Gradually reintroduce load',
          ],
          example: [
            'Knee injury → upper body focus',
            'Shoulder injury → lower body + rehab',
            'Back injury → light accessories, core',
          ],
        },
        {
          phase: 'Return to Training',
          actions: [
            'Start lighter than you think',
            'Rebuild volume before intensity',
            'Monitor for pain return',
            'Be patient with regression',
            'Expect 4-12 weeks to full strength',
          ],
          guidelines: [
            'Week 1-2: 40-50% normal volume',
            'Week 3-4: 60-70% normal volume',
            'Week 5-8: 80-90% normal volume',
            'Week 9+: Full training if pain-free',
          ],
        },
      ],
      prevention: [
        'Address small issues before they\'re big',
        'Don\'t ignore warning signs',
        'Modify before you\'re forced to stop',
        'Build resilience with accessories',
        'Warm-up religiously',
      ],
      commonInjuries: [
        {
          injury: 'Lower Back Strain',
          causes: ['Poor bracing', 'Rounding under load', 'Overextension'],
          prevention: ['Core work', 'Perfect bracing', 'Moderate ROM'],
          recovery: '2-6 weeks typically',
        },
        {
          injury: 'Pec Tear/Strain',
          causes: ['Excessive ROM', 'Flared elbows', 'Too heavy too soon'],
          prevention: ['Control descent', 'Proper elbow tuck', 'Warm-up'],
          recovery: 'Strain: 4-8 weeks, Tear: surgery + 6-12 months',
        },
        {
          injury: 'Knee Pain',
          causes: ['Valgus collapse', 'Poor tracking', 'Overuse'],
          prevention: ['Knee stability', 'Proper tracking', 'Volume management'],
          recovery: '2-8 weeks depending on severity',
        },
      ],
    },
    lifestyle: {
      name: 'Lifestyle Integration',
      icon: 'home',
      color: 'amber',
      balancing: [
        {
          aspect: 'Work-Training Balance',
          challenges: [
            'Job stress affects recovery',
            'Time constraints',
            'Energy depletion',
            'Irregular schedule',
          ],
          solutions: [
            'Train early before work',
            'Shorter efficient sessions',
            'Adjust volume to work stress',
            'Don\'t add training stress to life stress',
            'Be flexible with schedule',
          ],
        },
        {
          aspect: 'Family & Relationships',
          challenges: [
            'Time away from family',
            'Partner may not understand',
            'Kids\' schedules',
            'Social obligations',
          ],
          solutions: [
            'Involve family if possible',
            'Communicate importance',
            'Be efficient with gym time',
            'Home gym can help',
            'Compete strategically (not every weekend)',
            'Remember priorities',
          ],
        },
        {
          aspect: 'Social Life',
          challenges: [
            'Can\'t party and PR',
            'Friends who don\'t lift',
            'Alcohol impacts recovery',
            'Late nights hurt training',
          ],
          balance: [
            'Have social life, don\'t be hermit',
            'Choose quality social time',
            'Friends who respect goals',
            'Moderate alcohol or eliminate',
            'Sleep matters more than socializing',
          ],
        },
        {
          aspect: 'Financial',
          costs: [
            'Gym membership: $50-150/month',
            'Coaching: $100-300/month (optional)',
            'Equipment: $50-200/year',
            'Meets: $50-100/meet + travel',
            'Food: $100-300/month extra',
          ],
          saveStrategy: [
            'Home gym long-term saves money',
            'Buy used equipment',
            'Self-coach until intermediate',
            'Compete locally (less travel)',
            'Meal prep (cheaper than eating out)',
          ],
        },
      ],
      sustainability: [
        'Don\'t let lifting consume entire life',
        'Have other interests/hobbies',
        'Maintain friendships outside gym',
        'Career and family come first long-term',
        'Be person who lifts, not just lifter',
      ],
    },
  };

  const currentTopic = longevityData[selectedTopic as keyof typeof longevityData];

  const getColorClass = (color: string) => {
    const colors: { [key: string]: string } = {
      blue: 'bg-blue-500',
      emerald: 'bg-emerald-500',
      purple: 'bg-purple-500',
      red: 'bg-red-500',
      amber: 'bg-amber-500',
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
            Career Longevity
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          <View className="bg-gradient-to-r from-blue-500 to-emerald-500 rounded-xl p-6 mb-6">
            <Text className="text-white text-2xl font-bold mb-2">Lift for Life</Text>
            <Text className="text-white opacity-90">
              Training strategies for decades of strength
            </Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6">
            <View className="flex-row gap-3 px-1">
              {Object.entries(longevityData).map(([key, topic]) => (
                <TouchableOpacity
                  key={key}
                  onPress={() => setSelectedTopic(key)}
                  className={`${
                    selectedTopic === key 
                      ? getColorClass(topic.color)
                      : 'bg-zinc-900'
                  } rounded-xl p-4 border ${
                    selectedTopic === key 
                      ? 'border-white/30'
                      : 'border-zinc-800'
                  } min-w-[180px]`}
                >
                  <Ionicons 
                    name={topic.icon as any} 
                    size={32} 
                    color={selectedTopic === key ? 'white' : '#a1a1aa'} 
                  />
                  <Text className={`${selectedTopic === key ? 'text-white' : 'text-zinc-400'} font-bold mt-2`}>
                    {topic.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          {selectedTopic === 'mindset' && currentTopic.principles?.map((principle: any, idx: number) => (
            <View key={idx} className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
              <Text className="text-blue-400 text-xl font-bold mb-2">{principle.principle}</Text>
              <Text className="text-zinc-300 mb-4">{principle.explanation}</Text>

              {principle.perspectives && (
                <View className="bg-blue-500/10 rounded-xl p-4 border border-blue-500/30 mb-4">
                  <Text className="text-blue-400 font-bold mb-2">Perspectives:</Text>
                  {principle.perspectives.map((item: string, pIdx: number) => (
                    <Text key={pIdx} className="text-blue-300 text-sm mb-1">• {item}</Text>
                  ))}
                </View>
              )}

              {principle.tradeoffs && (
                <View className="bg-emerald-500/10 rounded-xl p-4 border border-emerald-500/30 mb-4">
                  <Text className="text-emerald-400 font-bold mb-2">Smart Trade-offs:</Text>
                  {principle.tradeoffs.map((item: string, tIdx: number) => (
                    <Text key={tIdx} className="text-emerald-300 text-sm mb-1">• {item}</Text>
                  ))}
                </View>
              )}

              {principle.changes && (
                <View className="bg-purple-500/10 rounded-xl p-4 border border-purple-500/30 mb-4">
                  <Text className="text-purple-400 font-bold mb-2">Changes Over Time:</Text>
                  {principle.changes.map((item: string, cIdx: number) => (
                    <Text key={cIdx} className="text-purple-300 text-sm mb-1">• {item}</Text>
                  ))}
                </View>
              )}

              {principle.why && (
                <View className="mb-4">
                  <Text className="text-white font-bold mb-2">Why:</Text>
                  {principle.why.map((item: string, wIdx: number) => (
                    <Text key={wIdx} className="text-zinc-300 text-sm mb-1">• {item}</Text>
                  ))}
                </View>
              )}

              {principle.how && (
                <View className="bg-blue-500/10 rounded-xl p-4 border border-blue-500/30">
                  <Text className="text-blue-400 font-bold mb-2">How:</Text>
                  {principle.how.map((item: string, hIdx: number) => (
                    <Text key={hIdx} className="text-blue-300 text-sm mb-1">• {item}</Text>
                  ))}
                </View>
              )}
            </View>
          ))}

          {selectedTopic === 'physical' && currentTopic.strategies?.map((strategy: any, idx: number) => (
            <View key={idx} className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
              <View className="flex-row items-center justify-between mb-4">
                <Text className="text-emerald-400 text-xl font-bold flex-1">{strategy.strategy}</Text>
                <View className="bg-red-500 rounded-full px-3 py-1">
                  <Text className="text-white text-xs font-bold">{strategy.importance}</Text>
                </View>
              </View>

              {strategy.actions && strategy.actions.map((action: any, aIdx: number) => (
                <View key={aIdx} className="bg-zinc-800 rounded-xl p-4 mb-3">
                  <Text className="text-white font-bold mb-1">{action.action}</Text>
                  <Text className="text-zinc-300 text-sm mb-1">{action.why}</Text>
                  <Text className="text-emerald-400 text-sm">Priority: {action.priority}</Text>
                </View>
              ))}

              {strategy.prevention && strategy.prevention.map((prevent: any, pIdx: number) => (
                <View key={pIdx} className="bg-zinc-800 rounded-xl p-4 mb-3">
                  <Text className="text-white font-bold mb-2">{prevent.area}</Text>
                  {prevent.how.map((item: string, hIdx: number) => (
                    <Text key={hIdx} className="text-zinc-300 text-sm mb-1">• {item}</Text>
                  ))}
                  {prevent.time && (
                    <Text className="text-emerald-400 text-sm mt-2">Time: {prevent.time}</Text>
                  )}
                  {prevent.warning && (
                    <Text className="text-red-400 text-sm mt-2">⚠️ {prevent.warning}</Text>
                  )}
                </View>
              ))}

              {strategy.why && (
                <View className="bg-emerald-500/10 rounded-xl p-4 border border-emerald-500/30 mb-3">
                  <Text className="text-emerald-400 font-bold mb-2">Why It Matters:</Text>
                  {strategy.why.map((item: string, wIdx: number) => (
                    <Text key={wIdx} className="text-emerald-300 text-sm mb-1">• {item}</Text>
                  ))}
                </View>
              )}

              {strategy.how && (
                <View className="bg-blue-500/10 rounded-xl p-4 border border-blue-500/30 mb-3">
                  <Text className="text-blue-400 font-bold mb-2">How:</Text>
                  {strategy.how.map((item: string, hIdx: number) => (
                    <Text key={hIdx} className="text-blue-300 text-sm mb-1">• {item}</Text>
                  ))}
                </View>
              )}
            </View>
          ))}

          {selectedTopic === 'programming' && currentTopic.ageGroups?.map((group: any, idx: number) => (
            <View key={idx} className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
              <Text className="text-purple-400 text-xl font-bold mb-4">{group.age}</Text>

              <View className="bg-purple-500/10 rounded-xl p-4 border border-purple-500/30 mb-4">
                <Text className="text-purple-400 font-bold mb-2">Considerations:</Text>
                {group.considerations.map((item: string, cIdx: number) => (
                  <Text key={cIdx} className="text-purple-300 text-sm mb-1">• {item}</Text>
                ))}
              </View>

              <View className="bg-emerald-500/10 rounded-xl p-4 border border-emerald-500/30 mb-4">
                <Text className="text-emerald-400 font-bold mb-2">Programming:</Text>
                {group.programming.map((item: string, pIdx: number) => (
                  <Text key={pIdx} className="text-emerald-300 text-sm mb-1">✓ {item}</Text>
                ))}
              </View>

              {group.avoid && (
                <View className="bg-red-500/10 rounded-xl p-4 border border-red-500/30">
                  <Text className="text-red-400 font-bold mb-2">Avoid:</Text>
                  {group.avoid.map((item: string, aIdx: number) => (
                    <Text key={aIdx} className="text-red-300 text-sm mb-1">✗ {item}</Text>
                  ))}
                </View>
              )}

              {group.adjustments && (
                <View className="bg-amber-500/10 rounded-xl p-4 border border-amber-500/30 mt-4">
                  <Text className="text-amber-400 font-bold mb-2">Adjustments:</Text>
                  {group.adjustments.map((item: string, adjIdx: number) => (
                    <Text key={adjIdx} className="text-amber-300 text-sm mb-1">• {item}</Text>
                  ))}
                </View>
              )}

              {group.important && (
                <View className="bg-blue-500/10 rounded-xl p-4 border border-blue-500/30 mt-4">
                  <Text className="text-blue-400 font-bold mb-2">Important:</Text>
                  {group.important.map((item: string, impIdx: number) => (
                    <Text key={impIdx} className="text-blue-300 text-sm mb-1">• {item}</Text>
                  ))}
                </View>
              )}

              {group.keys && (
                <View className="bg-emerald-500/10 rounded-xl p-4 border border-emerald-500/30 mt-4">
                  <Text className="text-emerald-400 font-bold mb-2">Keys to Success:</Text>
                  {group.keys.map((item: string, kIdx: number) => (
                    <Text key={kIdx} className="text-emerald-300 text-sm mb-1">• {item}</Text>
                  ))}
                </View>
              )}
            </View>
          ))}

          {selectedTopic === 'injuries' && (
            <View>
              <View className="bg-red-500/10 rounded-xl p-5 border border-red-500/30 mb-6">
                <Text className="text-red-400 text-xl font-bold mb-3">{currentTopic.philosophy?.title}</Text>
                {currentTopic.philosophy?.mindset.map((item: string, idx: number) => (
                  <Text key={idx} className="text-red-300 text-sm mb-1">• {item}</Text>
                ))}
              </View>

              {currentTopic.whenInjured?.map((phase: any, idx: number) => (
                <View key={idx} className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
                  <Text className="text-white text-lg font-bold mb-4">{phase.phase}</Text>

                  <View className="bg-emerald-500/10 rounded-xl p-4 border border-emerald-500/30 mb-3">
                    <Text className="text-emerald-400 font-bold mb-2">Actions:</Text>
                    {phase.actions.map((action: string, aIdx: number) => (
                      <Text key={aIdx} className="text-emerald-300 text-sm mb-1">• {action}</Text>
                    ))}
                  </View>

                  {phase.dont && (
                    <View className="bg-red-500/10 rounded-xl p-4 border border-red-500/30 mb-3">
                      <Text className="text-red-400 font-bold mb-2">DON'T:</Text>
                      {phase.dont.map((item: string, dIdx: number) => (
                        <Text key={dIdx} className="text-red-300 text-sm mb-1">✗ {item}</Text>
                      ))}
                    </View>
                  )}

                  {phase.guidelines && (
                    <View className="bg-blue-500/10 rounded-xl p-4 border border-blue-500/30">
                      <Text className="text-blue-400 font-bold mb-2">Guidelines:</Text>
                      {phase.guidelines.map((guide: string, gIdx: number) => (
                        <Text key={gIdx} className="text-blue-300 text-sm mb-1">• {guide}</Text>
                      ))}
                    </View>
                  )}
                </View>
              ))}
            </View>
          )}

          {selectedTopic === 'lifestyle' && currentTopic.balancing?.map((item: any, idx: number) => (
            <View key={idx} className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
              <Text className="text-amber-400 text-xl font-bold mb-4">{item.aspect}</Text>

              <View className="bg-red-500/10 rounded-xl p-4 border border-red-500/30 mb-4">
                <Text className="text-red-400 font-bold mb-2">Challenges:</Text>
                {item.challenges?.map((challenge: string, cIdx: number) => (
                  <Text key={cIdx} className="text-red-300 text-sm mb-1">• {challenge}</Text>
                ))}
              </View>

              {item.solutions && (
                <View className="bg-emerald-500/10 rounded-xl p-4 border border-emerald-500/30 mb-4">
                  <Text className="text-emerald-400 font-bold mb-2">Solutions:</Text>
                  {item.solutions.map((solution: string, sIdx: number) => (
                    <Text key={sIdx} className="text-emerald-300 text-sm mb-1">✓ {solution}</Text>
                  ))}
                </View>
              )}

              {item.balance && (
                <View className="bg-blue-500/10 rounded-xl p-4 border border-blue-500/30 mb-4">
                  <Text className="text-blue-400 font-bold mb-2">Balance:</Text>
                  {item.balance.map((bal: string, bIdx: number) => (
                    <Text key={bIdx} className="text-blue-300 text-sm mb-1">• {bal}</Text>
                  ))}
                </View>
              )}

              {item.costs && (
                <View className="bg-amber-500/10 rounded-xl p-4 border border-amber-500/30 mb-4">
                  <Text className="text-amber-400 font-bold mb-2">Typical Costs:</Text>
                  {item.costs.map((cost: string, costIdx: number) => (
                    <Text key={costIdx} className="text-amber-300 text-sm mb-1">• {cost}</Text>
                  ))}
                </View>
              )}

              {item.saveStrategy && (
                <View className="bg-emerald-500/10 rounded-xl p-4 border border-emerald-500/30">
                  <Text className="text-emerald-400 font-bold mb-2">Save Money:</Text>
                  {item.saveStrategy.map((save: string, saveIdx: number) => (
                    <Text key={saveIdx} className="text-emerald-300 text-sm mb-1">✓ {save}</Text>
                  ))}
                </View>
              )}
            </View>
          ))}

          <View className="bg-gradient-to-r from-blue-500/20 to-emerald-500/20 rounded-xl p-5 border border-blue-500/30 mb-6">
            <Text className="text-blue-400 font-bold text-lg mb-3">The Marathon, Not the Sprint</Text>
            <Text className="text-blue-300 text-sm mb-2">
              • Your 1RM today doesn't matter in 10 years
            </Text>
            <Text className="text-blue-300 text-sm mb-2">
              • Staying healthy and training consistently does
            </Text>
            <Text className="text-blue-300 text-sm mb-2">
              • Compound progress over decades is incredible
            </Text>
            <Text className="text-blue-300 text-sm">
              • Plan to lift for life, not just for PRs
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
