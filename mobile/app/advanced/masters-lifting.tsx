import React, { useState } from 'react';
import { Text } from '@/components/ui/Text';
import { View, TouchableOpacity, ScrollView } from 'react-native';;
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function MastersLifting() {
  const [selectedAge, setSelectedAge] = useState('overview');

  const mastersData = {
    overview: {
      name: 'Overview',
      icon: 'trophy',
      color: 'blue',
      whatIs: {
        definition: 'Masters divisions in powerlifting start at age 40 and continue into 80s',
        divisions: [
          'M1: 40-49 years old',
          'M2: 50-59 years old',
          'M3: 60-69 years old',
          'M4: 70-79 years old',
          'M5: 80+ years old',
        ],
        reality: [
          'You compete against people your age',
          'Age-adjusted formulas account for decline',
          'Many lifters peak performance in 30s-40s',
          'Can compete and PR well into 60s+',
          'Fastest growing division in powerlifting',
        ],
      },
      benefits: [
        {
          benefit: 'Fair Competition',
          details: 'Compete against age peers, not 25-year-olds',
        },
        {
          benefit: 'World Records Achievable',
          details: 'Less competitive than open, records within reach',
        },
        {
          benefit: 'Respect and Community',
          details: 'Masters lifters highly respected in community',
        },
        {
          benefit: 'Health and Longevity',
          details: 'Strength training crucial for healthy aging',
        },
        {
          benefit: 'Experience Advantage',
          details: 'Decades of training wisdom compensates for age',
        },
      ],
      challenges: [
        'Recovery takes longer',
        'Injury risk increases',
        'Flexibility decreases',
        'Hormone changes affect strength',
        'More life responsibilities (work, family)',
        'Potential health conditions',
      ],
    },
    recovery: {
      name: 'Recovery Strategies',
      icon: 'bed',
      color: 'primary',
      whyDifferent: [
        'Protein synthesis slows with age',
        'Inflammation takes longer to resolve',
        'Sleep quality often decreases',
        'Hormone levels (testosterone, GH) decline',
        'Connective tissue elasticity reduces',
        'CNS recovery is slower',
      ],
      strategies: [
        {
          strategy: 'Prioritize Sleep Quality',
          importance: 'Critical',
          actions: [
            'Aim for 8+ hours (not 7)',
            'Keep room cool (65-68°F)',
            'Complete darkness',
            'Consistent sleep schedule',
            'Avoid alcohol (destroys sleep quality)',
            'Consider melatonin if sleep issues',
          ],
          why: 'Sleep is when you recover. Age makes it harder.',
        },
        {
          strategy: 'Increase Rest Days',
          importance: 'Critical',
          guidelines: [
            'At least 1 full rest day per week',
            'Consider 2 rest days if training hard',
            'Rest days are not "wasted" - they\'re recovery',
            'Active recovery okay (walking, light mobility)',
            'Don\'t feel guilty about rest',
          ],
          why: 'CNS and joints need more time to recover',
        },
        {
          strategy: 'Deload More Frequently',
          importance: 'High',
          protocol: [
            'Deload every 3-4 weeks (not 4-6)',
            'Cut volume 40-50% (not just 30%)',
            'Keep intensity moderate (70-80%)',
            'Full week, not half week',
            'Don\'t skip deloads',
          ],
          why: 'Fatigue accumulates faster with age',
        },
        {
          strategy: 'Extended Warm-ups',
          importance: 'High',
          protocol: [
            '20-30 minutes minimum (not 10-15)',
            'General cardio: 10 minutes',
            'Dynamic stretching: 5-10 minutes',
            'Specific warmup: 10-15 minutes',
            'More sets ramping to working weight',
            'Don\'t rush warm-up',
          ],
          why: 'Cold tissues tear more easily. Blood flow takes longer.',
        },
        {
          strategy: 'Recovery Modalities',
          importance: 'Medium-High',
          effective: [
            'Massage (monthly or bi-weekly)',
            'Sauna 2-3x per week',
            'Epsom salt baths',
            'Compression boots/sleeves',
            'Light stretching daily',
            'Yoga or mobility work 2x week',
          ],
          lessEffective: [
            'Ice baths (may slow recovery)',
            'Excessive stretching before lifting',
            'NSAIDs regularly (mask issues)',
          ],
        },
        {
          strategy: 'Nutrition for Recovery',
          importance: 'High',
          protein: [
            'Increase to 1-1.2g/lb bodyweight',
            'Distribute evenly: 30-40g per meal',
            'Pre-bed protein (casein)',
            'Post-workout within 2 hours',
          ],
          other: [
            'Omega-3s: 2-3g per day (joint health)',
            'Vitamin D: 2000-4000 IU if deficient',
            'Creatine: 5g daily (proven for masters)',
            'Hydration: even more critical',
            'Anti-inflammatory foods',
          ],
        },
      ],
    },
    programming: {
      name: 'Programming Adjustments',
      icon: 'clipboard',
      color: 'purple',
      principles: [
        {
          principle: 'Lower Volume, Maintain Intensity',
          explanation: 'You can still lift heavy, but can\'t do as much volume',
          application: [
            'Reduce sets per week by 20-40%',
            'Keep intensity (% of 1RM) similar',
            'Quality over quantity',
            'Example: 3x5 instead of 5x5',
            'Example: 2 accessories instead of 4',
          ],
          why: 'Volume drives fatigue. Intensity drives strength. Favor intensity.',
        },
        {
          principle: 'Reduce Training Frequency',
          explanation: 'Need more recovery time between sessions',
          recommendations: [
            '40s: Each lift 2-3x per week',
            '50s: Each lift 2x per week',
            '60s+: Each lift 1-2x per week',
            'Total training days: 3-4 per week',
            'Listen to YOUR body (individual variation)',
          ],
          structure: [
            'Full body 3x week',
            'Upper/lower split',
            'Push/pull/legs but spread over 6 days',
          ],
        },
        {
          principle: 'Moderate Rep Ranges',
          explanation: 'Balance between heavy singles and high reps',
          sweetSpot: [
            'Main work: 3-5 reps (not 1-2)',
            'Occasional heavy singles okay',
            'Avoid constant maxing out',
            'Accessories: 6-10 reps',
            'Some higher rep work (12-15) for joints',
          ],
          avoid: [
            'Max effort singles every week',
            'Always grinding reps',
            'Ego lifting',
          ],
        },
        {
          principle: 'Exercise Variation for Joint Health',
          explanation: 'Vary movements to reduce repetitive stress',
          strategies: [
            'Rotate bar types (straight, SSB, trap bar)',
            'Vary stances and grips',
            'Use tempo variations',
            'Include pauses',
            'Occasionally swap exercises',
          ],
          example: [
            'Week 1-4: Competition squat',
            'Week 5-8: SSB squat',
            'Week 9-12: Front squat',
            'Week 13-16: Back to comp squat',
          ],
        },
        {
          principle: 'Prioritize Accessories for Health',
          explanation: 'Accessories prevent injury and maintain function',
          essential: [
            'Core work (daily light work)',
            'Upper back volume (prevent kyphosis)',
            'Hip mobility work',
            'Rotator cuff exercises',
            'Hamstring and glute work',
            'Unilateral work (balance)',
          ],
          timeAllocation: '30-40% of session on accessories/prehab',
        },
      ],
      sampleWeek: {
        description: 'Sample week for 50+ masters lifter',
        schedule: [
          {
            day: 'Monday - Lower',
            workout: [
              'Squat: 3x3@80-85%',
              'Romanian Deadlift: 3x8',
              'Leg Press: 3x12',
              'Core: 3 sets various',
            ],
          },
          {
            day: 'Tuesday - Rest or Active Recovery',
            workout: ['Walking 30min', 'Mobility work', 'Light stretching'],
          },
          {
            day: 'Wednesday - Upper',
            workout: [
              'Bench Press: 3x4@80-85%',
              'Rows: 4x10',
              'Overhead Press: 3x8',
              'Face Pulls: 3x15',
            ],
          },
          {
            day: 'Thursday - Rest',
            workout: ['Complete rest', 'Optional light walk'],
          },
          {
            day: 'Friday - Lower',
            workout: [
              'Deadlift: 3x3@80-85%',
              'Front Squat or SSB: 3x6',
              'Hamstring Curls: 3x12',
              'Core: 3 sets',
            ],
          },
          {
            day: 'Saturday - Upper',
            workout: [
              'Overhead Press: 3x5',
              'Close Grip Bench: 3x8',
              'Pull-ups or Lat Pulldown: 3x8',
              'Rotator Cuff: 2x15',
            ],
          },
          {
            day: 'Sunday - Rest',
            workout: ['Complete rest', 'Meal prep', 'Recovery'],
          },
        ],
      },
    },
    health: {
      name: 'Health Considerations',
      icon: 'fitness',
      color: 'red',
      medical: [
        {
          consideration: 'Get Regular Check-ups',
          tests: [
            'Annual physical exam',
            'Blood pressure monitoring',
            'Cholesterol panel',
            'Blood sugar (diabetes screening)',
            'Hormone panel (testosterone, etc.)',
            'Bone density scan (especially women 50+)',
            'Prostate screening (men 50+)',
          ],
          why: 'Catch issues early. Optimize health for performance.',
        },
        {
          consideration: 'Work WITH Your Doctor',
          tips: [
            'Tell them you powerlift',
            'Educate them if they don\'t understand',
            'Find sports-medicine friendly doc',
            'Don\'t hide injuries or pain',
            'Ask about TRT if low-T (legal, medical)',
          ],
          reality: 'Some doctors don\'t understand strength training. Find one who does.',
        },
        {
          consideration: 'Manage Existing Conditions',
          common: [
            'High blood pressure: Monitor, medication if needed, cardio helps',
            'Arthritis: Keep moving, weight management, anti-inflammatories',
            'Diabetes: Lifting helps insulin sensitivity',
            'Previous injuries: Work around, strengthen surrounding areas',
          ],
          rule: 'Powerlifting can help most conditions. Adapt, don\'t quit.',
        },
      ],
      joints: [
        {
          joint: 'Knees',
          issues: ['Arthritis', 'Meniscus wear', 'Patellar tendonitis'],
          management: [
            'Knee sleeves for warmth and support',
            'Strengthen quads and hamstrings',
            'Avoid excessive depth if painful',
            'Consider box squats',
            'Glucosamine/chondroitin (mixed evidence)',
            'Keep moving - rest makes it worse',
          ],
        },
        {
          joint: 'Shoulders',
          issues: ['Rotator cuff issues', 'AC joint pain', 'Impingement'],
          management: [
            'Warm up shoulders thoroughly',
            'Rotator cuff exercises 2-3x week',
            'Vary bench grip width',
            'Floor press if painful',
            'Lots of rows (2:1 ratio to pressing)',
            'Consider physical therapy',
          ],
        },
        {
          joint: 'Lower Back',
          issues: ['Disc degeneration', 'Arthritis', 'Muscle strains'],
          management: [
            'Perfect bracing technique',
            'Core strength daily',
            'Hip mobility',
            'Consider belt for heavy sets',
            'Avoid flexion under load',
            'Deadlift variations (trap bar)',
          ],
        },
        {
          joint: 'Hips',
          issues: ['Arthritis', 'Labral tears', 'Impingement'],
          management: [
            'Hip mobility daily',
            'Vary squat stances',
            'Consider different bars (SSB)',
            'Strengthen glutes',
            'May need hip replacement eventually (can lift after)',
          ],
        },
      ],
      hormones: {
        testosterone: {
          naturalDecline: [
            'Drops ~1% per year after 30',
            'By 50, often 30-40% lower than peak',
            'Affects muscle mass, recovery, strength',
            'Also affects mood, energy, libido',
          ],
          options: [
            'Natural optimization: Sleep, diet, stress, exercise',
            'TRT (Testosterone Replacement Therapy) if medically indicated',
            'Work with endocrinologist',
            'TRT is legal with prescription',
            'Testing federation rules vary on TRT',
          ],
          testing: [
            'USAPL/IPF: No TRT allowed (drug-tested)',
            'USPA/RPS/many others: TRT allowed (untested divisions)',
            'Masters divisions often more lenient',
            'Therapeutic Use Exemptions (TUE) sometimes available',
          ],
        },
      },
    },
    mental: {
      name: 'Mental Approach',
      icon: 'happy',
      color: 'amber',
      perspectives: [
        {
          perspective: 'Redefine Success',
          shift: [
            'Success = staying healthy and lifting',
            'Success = PRs relative to last year',
            'Success = beating age-group peers',
            'Success = being stronger than non-lifters',
            'Success = inspiring others',
          ],
          notSuccess: [
            'Comparing to your 20s',
            'Comparing to open division lifters',
            'Chasing absolute strength regardless of health',
            'Beating yourself up for aging',
          ],
        },
        {
          perspective: 'Embrace Your Age',
          reality: [
            'You\'re not "old" - you\'re experienced',
            'Your wisdom is advantage',
            'You know your body better',
            'You\'ve seen what works long-term',
            'You can still be elite in masters',
          ],
          pride: [
            'Lifting at 50+ is badass',
            'You\'re healthier than 90% of peers',
            'You\'re role model for younger lifters',
            'Setting example for aging well',
          ],
        },
        {
          perspective: 'Play the Long Game',
          questions: [
            'Will this matter at 70?',
            'Can I still lift at 80?',
            'Is this worth injury risk?',
            'Am I enjoying the process?',
          ],
          answers: [
            'Health and consistency beat PRs',
            'Being able to train beats being broken',
            'Enjoy the journey',
            'Make it sustainable',
          ],
        },
      ],
      motivation: [
        {
          source: 'Role Models',
          examples: [
            'Powerlifters competing in 70s and 80s',
            'World record holders in masters divisions',
            'Local masters lifters at your gym',
            'YouTube: Older lifters crushing it',
          ],
          why: 'Proof that it\'s possible. Inspiration.',
        },
        {
          source: 'Community',
          benefits: [
            'Masters divisions are supportive',
            'Shared experience bonds',
            'Less ego, more encouragement',
            'Great friendships',
          ],
        },
        {
          source: 'Health Benefits',
          facts: [
            'Strength training prevents sarcopenia',
            'Maintains bone density',
            'Improves balance (prevents falls)',
            'Preserves independence',
            'Adds quality years to life',
          ],
        },
      ],
    },
  };

  const currentAge = mastersData[selectedAge as keyof typeof mastersData];

  const getColorClass = (color: string) => {
    const colors: { [key: string]: string } = {
      blue: 'bg-primary',
      primary: 'bg-primary',
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
            Masters Lifting (40+)
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          <View className="bg-gradient-to-r from-amber-500 to-blue-500 rounded-xl p-6 mb-6">
            <Text className="text-white text-2xl font-bold mb-2">Age Is Just a Number</Text>
            <Text className="text-white opacity-90">
              Strength training for lifters 40 and beyond
            </Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6">
            <View className="flex-row gap-3 px-1">
              {Object.entries(mastersData).map(([key, age]) => (
                <TouchableOpacity
                  key={key}
                  onPress={() => setSelectedAge(key)}
                  className={`${
                    selectedAge === key 
                      ? getColorClass(age.color)
                      : 'bg-zinc-900'
                  } rounded-xl p-4 border ${
                    selectedAge === key 
                      ? 'border-white/30'
                      : 'border-zinc-800'
                  } min-w-[180px]`}
                >
                  <Ionicons 
                    name={age.icon as any} 
                    size={32} 
                    color={selectedAge === key ? 'white' : '#a1a1aa'} 
                  />
                  <Text className={`${selectedAge === key ? 'text-white' : 'text-zinc-400'} font-bold mt-2`}>
                    {age.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          {selectedAge === 'overview' && (
            <View>
              <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
                <Text className="text-primary/80 text-xl font-bold mb-3">What Are Masters Divisions?</Text>
                <Text className="text-zinc-300 mb-4">{currentAge.whatIs?.definition}</Text>

                <Text className="text-white font-bold mb-2">Divisions:</Text>
                {currentAge.whatIs?.divisions.map((div: string, idx: number) => (
                  <Text key={idx} className="text-zinc-300 mb-1">• {div}</Text>
                ))}

                <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mt-4">
                  <Text className="text-primary/80 font-bold mb-2">Reality:</Text>
                  {currentAge.whatIs?.reality.map((item: string, idx: number) => (
                    <Text key={idx} className="text-primary/60 text-sm mb-1">• {item}</Text>
                  ))}
                </View>
              </View>

              <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
                <Text className="text-primary text-xl font-bold mb-4">Benefits</Text>
                {currentAge.benefits?.map((benefit: any, idx: number) => (
                  <View key={idx} className="mb-4 last:mb-0">
                    <Text className="text-white font-bold">{benefit.benefit}</Text>
                    <Text className="text-zinc-300 text-sm">{benefit.details}</Text>
                  </View>
                ))}
              </View>

              <View className="bg-red-500/10 rounded-xl p-5 border border-red-500/30 mb-6">
                <Text className="text-red-400 font-bold text-lg mb-3">Challenges</Text>
                {currentAge.challenges?.map((challenge: string, idx: number) => (
                  <Text key={idx} className="text-red-300 text-sm mb-1">• {challenge}</Text>
                ))}
              </View>
            </View>
          )}

          {selectedAge === 'recovery' && (
            <View>
              <View className="bg-primary/10 rounded-xl p-5 border border-primary/30 mb-6">
                <Text className="text-primary font-bold text-lg mb-3">Why Recovery Is Different</Text>
                {currentAge.whyDifferent?.map((reason: string, idx: number) => (
                  <Text key={idx} className="text-primary/80 text-sm mb-1">• {reason}</Text>
                ))}
              </View>

              {currentAge.strategies?.map((strategy: any, idx: number) => (
                <View key={idx} className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
                  <View className="flex-row items-center justify-between mb-3">
                    <Text className="text-primary text-xl font-bold flex-1">{strategy.strategy}</Text>
                    <View className="bg-red-500 rounded-full px-3 py-1">
                      <Text className="text-white text-xs font-bold">{strategy.importance}</Text>
                    </View>
                  </View>

                  <Text className="text-zinc-300 mb-4">{strategy.why}</Text>

                  {strategy.actions && (
                    <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-3">
                      <Text className="text-primary font-bold mb-2">Actions:</Text>
                      {strategy.actions.map((action: string, aIdx: number) => (
                        <Text key={aIdx} className="text-primary/80 text-sm mb-1">• {action}</Text>
                      ))}
                    </View>
                  )}

                  {strategy.guidelines && (
                    <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-3">
                      <Text className="text-primary/80 font-bold mb-2">Guidelines:</Text>
                      {strategy.guidelines.map((guide: string, gIdx: number) => (
                        <Text key={gIdx} className="text-primary/60 text-sm mb-1">• {guide}</Text>
                      ))}
                    </View>
                  )}

                  {strategy.protocol && (
                    <View className="bg-purple-500/10 rounded-xl p-4 border border-purple-500/30 mb-3">
                      <Text className="text-purple-400 font-bold mb-2">Protocol:</Text>
                      {strategy.protocol.map((item: string, pIdx: number) => (
                        <Text key={pIdx} className="text-purple-300 text-sm mb-1">• {item}</Text>
                      ))}
                    </View>
                  )}

                  {strategy.effective && (
                    <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-3">
                      <Text className="text-primary font-bold mb-2">? Effective:</Text>
                      {strategy.effective.map((item: string, eIdx: number) => (
                        <Text key={eIdx} className="text-primary/80 text-sm mb-1">• {item}</Text>
                      ))}
                    </View>
                  )}

                  {strategy.protein && (
                    <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-3">
                      <Text className="text-primary/80 font-bold mb-2">Protein:</Text>
                      {strategy.protein.map((item: string, prIdx: number) => (
                        <Text key={prIdx} className="text-primary/60 text-sm mb-1">• {item}</Text>
                      ))}
                    </View>
                  )}

                  {strategy.other && (
                    <View className="bg-purple-500/10 rounded-xl p-4 border border-purple-500/30">
                      <Text className="text-purple-400 font-bold mb-2">Other:</Text>
                      {strategy.other.map((item: string, oIdx: number) => (
                        <Text key={oIdx} className="text-purple-300 text-sm mb-1">• {item}</Text>
                      ))}
                    </View>
                  )}
                </View>
              ))}
            </View>
          )}

          {selectedAge === 'programming' && (
            <View>
              {currentAge.principles?.map((principle: any, idx: number) => (
                <View key={idx} className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
                  <Text className="text-purple-400 text-xl font-bold mb-2">{principle.principle}</Text>
                  <Text className="text-zinc-300 mb-4">{principle.explanation}</Text>

                  {principle.application && (
                    <View className="bg-purple-500/10 rounded-xl p-4 border border-purple-500/30 mb-3">
                      <Text className="text-purple-400 font-bold mb-2">Application:</Text>
                      {principle.application.map((item: string, aIdx: number) => (
                        <Text key={aIdx} className="text-purple-300 text-sm mb-1">• {item}</Text>
                      ))}
                    </View>
                  )}

                  {principle.recommendations && (
                    <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-3">
                      <Text className="text-primary/80 font-bold mb-2">Recommendations:</Text>
                      {principle.recommendations.map((item: string, rIdx: number) => (
                        <Text key={rIdx} className="text-primary/60 text-sm mb-1">• {item}</Text>
                      ))}
                    </View>
                  )}

                  {principle.sweetSpot && (
                    <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-3">
                      <Text className="text-primary font-bold mb-2">Sweet Spot:</Text>
                      {principle.sweetSpot.map((item: string, sIdx: number) => (
                        <Text key={sIdx} className="text-primary/80 text-sm mb-1">• {item}</Text>
                      ))}
                    </View>
                  )}

                  {principle.strategies && (
                    <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-3">
                      <Text className="text-primary/80 font-bold mb-2">Strategies:</Text>
                      {principle.strategies.map((item: string, stIdx: number) => (
                        <Text key={stIdx} className="text-primary/60 text-sm mb-1">• {item}</Text>
                      ))}
                    </View>
                  )}

                  {principle.essential && (
                    <View className="bg-red-500/10 rounded-xl p-4 border border-red-500/30">
                      <Text className="text-red-400 font-bold mb-2">Essential:</Text>
                      {principle.essential.map((item: string, eIdx: number) => (
                        <Text key={eIdx} className="text-red-300 text-sm mb-1">• {item}</Text>
                      ))}
                    </View>
                  )}

                  {principle.why && (
                    <Text className="text-primary/80 text-sm mt-3 italic">→ {principle.why}</Text>
                  )}
                </View>
              ))}

              <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
                <Text className="text-purple-400 text-xl font-bold mb-4">{currentAge.sampleWeek?.description}</Text>
                {currentAge.sampleWeek?.schedule.map((day: any, idx: number) => (
                  <View key={idx} className="bg-zinc-800 rounded-xl p-4 mb-3 last:mb-0">
                    <Text className="text-white font-bold mb-2">{day.day}</Text>
                    {day.workout.map((exercise: string, eIdx: number) => (
                      <Text key={eIdx} className="text-zinc-300 text-sm mb-1">• {exercise}</Text>
                    ))}
                  </View>
                ))}
              </View>
            </View>
          )}

          {selectedAge === 'health' && (
            <View>
              {currentAge.medical?.map((item: any, idx: number) => (
                <View key={idx} className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
                  <Text className="text-red-400 text-xl font-bold mb-4">{item.consideration}</Text>

                  {item.tests && (
                    <View className="bg-red-500/10 rounded-xl p-4 border border-red-500/30 mb-3">
                      <Text className="text-red-400 font-bold mb-2">Tests:</Text>
                      {item.tests.map((test: string, tIdx: number) => (
                        <Text key={tIdx} className="text-red-300 text-sm mb-1">• {test}</Text>
                      ))}
                    </View>
                  )}

                  {item.tips && item.tips.map((tip: string, tIdx: number) => (
                    <Text key={tIdx} className="text-zinc-300 text-sm mb-2">• {tip}</Text>
                  ))}

                  {item.why && (
                    <Text className="text-primary/80 text-sm mt-2 italic">→ {item.why}</Text>
                  )}

                  {item.reality && (
                    <Text className="text-amber-400 text-sm mt-2 italic">{item.reality}</Text>
                  )}
                </View>
              ))}

              <Text className="text-white text-xl font-bold mb-4">Joint Management</Text>
              {currentAge.joints?.map((joint: any, idx: number) => (
                <View key={idx} className="bg-zinc-900 rounded-xl p-5 mb-4 border border-zinc-800">
                  <Text className="text-amber-400 text-lg font-bold mb-3">{joint.joint}</Text>

                  <View className="bg-red-500/10 rounded-xl p-3 border border-red-500/30 mb-3">
                    <Text className="text-red-400 font-bold text-sm mb-1">Common Issues:</Text>
                    {joint.issues.map((issue: string, iIdx: number) => (
                      <Text key={iIdx} className="text-red-300 text-sm mb-1">• {issue}</Text>
                    ))}
                  </View>

                  <View className="bg-primary/10 rounded-xl p-3 border border-primary/30">
                    <Text className="text-primary font-bold text-sm mb-1">Management:</Text>
                    {joint.management.map((mgmt: string, mIdx: number) => (
                      <Text key={mIdx} className="text-primary/80 text-sm mb-1">? {mgmt}</Text>
                    ))}
                  </View>
                </View>
              ))}
            </View>
          )}

          {selectedAge === 'mental' && (
            <View>
              {currentAge.perspectives?.map((persp: any, idx: number) => (
                <View key={idx} className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
                  <Text className="text-amber-400 text-xl font-bold mb-4">{persp.perspective}</Text>

                  {persp.shift && (
                    <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-3">
                      <Text className="text-primary font-bold mb-2">? Success Is:</Text>
                      {persp.shift.map((item: string, sIdx: number) => (
                        <Text key={sIdx} className="text-primary/80 text-sm mb-1">• {item}</Text>
                      ))}
                    </View>
                  )}

                  {persp.notSuccess && (
                    <View className="bg-red-500/10 rounded-xl p-4 border border-red-500/30 mb-3">
                      <Text className="text-red-400 font-bold mb-2">? Success Is NOT:</Text>
                      {persp.notSuccess.map((item: string, nIdx: number) => (
                        <Text key={nIdx} className="text-red-300 text-sm mb-1">• {item}</Text>
                      ))}
                    </View>
                  )}

                  {persp.reality && (
                    <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-3">
                      <Text className="text-primary/80 font-bold mb-2">Reality:</Text>
                      {persp.reality.map((item: string, rIdx: number) => (
                        <Text key={rIdx} className="text-primary/60 text-sm mb-1">• {item}</Text>
                      ))}
                    </View>
                  )}

                  {persp.pride && (
                    <View className="bg-amber-500/10 rounded-xl p-4 border border-amber-500/30 mb-3">
                      <Text className="text-amber-400 font-bold mb-2">Take Pride:</Text>
                      {persp.pride.map((item: string, prIdx: number) => (
                        <Text key={prIdx} className="text-amber-300 text-sm mb-1">• {item}</Text>
                      ))}
                    </View>
                  )}

                  {persp.questions && (
                    <View className="bg-purple-500/10 rounded-xl p-4 border border-purple-500/30">
                      <Text className="text-purple-400 font-bold mb-2">Ask Yourself:</Text>
                      {persp.questions.map((q: string, qIdx: number) => (
                        <Text key={qIdx} className="text-purple-300 text-sm mb-1">• {q}</Text>
                      ))}
                    </View>
                  )}
                </View>
              ))}

              {currentAge.motivation?.map((source: any, idx: number) => (
                <View key={idx} className="bg-zinc-900 rounded-xl p-5 mb-4 border border-zinc-800">
                  <Text className="text-white font-bold mb-3">{source.source}</Text>
                  {source.examples && source.examples.map((ex: string, eIdx: number) => (
                    <Text key={eIdx} className="text-zinc-300 text-sm mb-1">• {ex}</Text>
                  ))}
                  {source.benefits && source.benefits.map((ben: string, bIdx: number) => (
                    <Text key={bIdx} className="text-zinc-300 text-sm mb-1">• {ben}</Text>
                  ))}
                  {source.facts && source.facts.map((fact: string, fIdx: number) => (
                    <Text key={fIdx} className="text-zinc-300 text-sm mb-1">• {fact}</Text>
                  ))}
                </View>
              ))}
            </View>
          )}

          <View className="bg-gradient-to-r from-amber-500/20 to-blue-500/20 rounded-xl p-5 border border-amber-500/30 mb-6">
            <Text className="text-amber-400 font-bold text-lg mb-3">You're Not Old, You're Elite</Text>
            <Text className="text-amber-300 text-sm mb-2">
              • Most people your age are declining - you're getting stronger
            </Text>
            <Text className="text-amber-300 text-sm mb-2">
              • Every rep is defying aging
            </Text>
            <Text className="text-amber-300 text-sm mb-2">
              • You can compete and win well into your 70s+
            </Text>
            <Text className="text-amber-300 text-sm">
              • Age is just which division you compete in
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}


