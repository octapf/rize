import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function WeightClassManagement() {
  const [selectedSection, setSelectedSection] = useState('choosing');
  const [currentWeight, setCurrentWeight] = useState('');
  const [targetWeight, setTargetWeight] = useState('');

  const weightClassData = {
    choosing: {
      name: 'Choosing a Class',
      icon: 'scale',
      color: 'blue',
      classes: {
        men: [
          '59kg (130lb)',
          '66kg (145lb)',
          '74kg (163lb)',
          '83kg (183lb)',
          '93kg (205lb)',
          '105kg (231lb)',
          '120kg (265lb)',
          '120kg+ (265lb+)',
        ],
        women: [
          '47kg (104lb)',
          '52kg (115lb)',
          '57kg (126lb)',
          '63kg (139lb)',
          '69kg (152lb)',
          '76kg (168lb)',
          '84kg (185lb)',
          '84kg+ (185lb+)',
        ],
      },
      strategy: [
        {
          situation: 'Beginner (First Year)',
          recommendation: 'Don\'t cut weight',
          reasoning: [
            'Focus on getting stronger, not lighter',
            'Compete at walk-around weight',
            'Build muscle and strength foundation',
            'Cutting hampers progress as beginner',
            'Compete in whatever class you wake up at',
          ],
          exception: 'Only if you\'re already very close (within 2-3kg)',
        },
        {
          situation: 'Intermediate (1-3 Years)',
          recommendation: 'Stay in comfortable class or move up',
          reasoning: [
            'If cutting more than 5% bodyweight, move up',
            'If crushing weight class, consider moving up',
            'If struggling to make weight, definitely move up',
            'Small cuts (2-3%) okay if competitive',
          ],
          guideline: 'Walk around 3-5% above weight class limit',
        },
        {
          situation: 'Advanced/Competitive',
          recommendation: 'Strategic class selection',
          reasoning: [
            'Analyze strength in different weight classes',
            'Consider competition level in each class',
            'Dots/Wilks score matters more than total',
            'Where can you be most competitive?',
            'Small cut (5-7%) acceptable if strategic',
          ],
          tools: [
            'OpenPowerlifting.org to compare',
            'Dots/Wilks calculators',
            'Look at meet results in your area',
          ],
        },
      ],
      mistakes: [
        'Cutting too much weight too often',
        'Staying in class you\'ve outgrown',
        'Choosing class based on ego ("I want to be 83kg")',
        'Not considering body composition',
        'Ignoring performance for aesthetics',
      ],
    },
    making: {
      name: 'Making Weight',
      icon: 'water',
      color: 'emerald',
      timeline: {
        description: 'How to cut weight safely and effectively',
        phases: [
          {
            phase: '4-6 Weeks Out',
            goal: 'Gradual fat loss if needed',
            method: [
              'Small calorie deficit (300-500 cal)',
              'High protein (1g/lb)',
              'Maintain training intensity',
              'Lose 0.5-1% bodyweight per week',
              'Track weight daily (morning, after bathroom)',
            ],
            target: 'Get within 3-5% of weight class',
          },
          {
            phase: '2 Weeks Out',
            goal: 'Maintenance and prepare for water cut',
            method: [
              'Eat at maintenance calories',
              'Keep training normal',
              'Should be 2-3% above class now',
              'Start planning water/sodium manipulation',
              'Don\'t panic cut',
            ],
            target: 'Stable weight 2-3kg above limit',
          },
          {
            phase: '1 Week Out',
            goal: 'Water and sodium manipulation',
            method: [
              'Days 7-3: High water (1-2 gallons/day)',
              'Days 7-3: Normal-high sodium',
              'Day 2: Start reducing water',
              'Day 1: Minimal water',
              'Day 1: Very low sodium',
              'Can drop 3-5kg water weight',
            ],
            warning: 'Only do if experienced. Can backfire.',
          },
          {
            phase: 'Weigh-In Day',
            goal: 'Make weight safely',
            method: [
              '24h weigh-in: Use full day to cut if needed',
              '2h weigh-in: Should be close already',
              'Last resort: Sweat (sauna, hot bath)',
              'After weigh-in: Rehydrate immediately',
            ],
            emergency: [
              'Hot bath with epsom salt',
              'Sauna (careful, dangerous)',
              'Spit (minimal benefit)',
              'Light cardio in sweats',
            ],
          },
        ],
      },
      weighInTypes: {
        twentyFourHour: {
          name: '24-Hour Weigh-In',
          description: 'Weigh in day before, have 24h to recover',
          pros: [
            'Full day to rehydrate and refuel',
            'Can cut more weight safely',
            'Less impact on performance',
            'Time to digest food',
          ],
          cons: [
            'Longer meet weekend',
            'More planning needed',
            'Can overeat and feel bad',
          ],
          strategy: [
            'Can cut up to 5-7% bodyweight',
            'Start rehydrating immediately after',
            'Eat balanced meals, not junk',
            'Pedialyte or electrolyte drinks',
            'Light carbs night before, more morning of',
          ],
        },
        twoHour: {
          name: '2-Hour Weigh-In',
          description: 'Weigh in 2 hours before lifting',
          pros: [
            'Shorter meet day',
            'Less time to overthink',
            'Easier logistics',
          ],
          cons: [
            'Very little recovery time',
            'Harder to rehydrate fully',
            'Can\'t cut as much weight',
            'Risk feeling depleted',
          ],
          strategy: [
            'Cut 2-3% max',
            'Should wake up close to weight',
            'Sip water and electrolytes after',
            'Light easily digested carbs',
            'Don\'t gorge yourself',
          ],
        },
      },
    },
    rehydration: {
      name: 'Rehydration Protocol',
      icon: 'water-outline',
      color: 'cyan',
      immediate: {
        title: 'First Hour After Weigh-In',
        actions: [
          'Drink 500ml-1L electrolyte drink slowly',
          'Small easily digested snack (banana, rice cake)',
          'Don\'t chug water (stomach cramps)',
          'Sip consistently',
          'Pedialyte, Gatorade, coconut water',
        ],
      },
      hourTwo: {
        title: 'Hours 2-4',
        actions: [
          'Continue sipping fluids (2-3L total)',
          'Light meal: white rice, chicken, simple carbs',
          'Avoid heavy fats (slow digestion)',
          'Avoid dairy if sensitive',
          'Pretzels or salty snacks for sodium',
        ],
      },
      preMeet: {
        title: 'Night Before/Morning Of (24h weigh-in)',
        night: [
          'Balanced dinner: protein, carbs, veggies',
          'Don\'t overeat (you\'ll feel sluggish)',
          'Hydrate but don\'t overdo',
          'Light dessert okay',
          'Sleep well (7-9 hours)',
        ],
        morning: [
          'Familiar breakfast (don\'t experiment)',
          'Complex carbs: oatmeal, toast, etc.',
          'Moderate protein: eggs, yogurt',
          'Coffee if you normally drink it',
          'Stop eating 2-3h before lifting',
        ],
      },
      betweenAttempts: {
        title: 'During Meet',
        actions: [
          'Sip water consistently',
          'Gatorade or sports drink',
          'Simple carbs: gummy bears, rice cakes',
          'Small protein if hungry',
          'Don\'t overeat between attempts',
        ],
      },
    },
    bodyfat: {
      name: 'Body Composition',
      icon: 'analytics',
      color: 'purple',
      importance: [
        'More muscle at same bodyweight = stronger',
        'Lower bodyfat = easier weight cut',
        'More room for muscle growth',
        'Better weight distribution',
        'Health benefits',
      ],
      guidelines: {
        men: [
          {
            range: '12-15% bodyfat',
            description: 'Optimal for powerlifting',
            pros: 'Healthy, strong, easy to make weight',
            cons: 'None - sweet spot',
          },
          {
            range: '8-12% bodyfat',
            description: 'Very lean',
            pros: 'Very easy to make weight, very muscular look',
            cons: 'May hurt strength, recovery, hormones',
          },
          {
            range: '15-20% bodyfat',
            description: 'Healthy range',
            pros: 'Good strength, healthy',
            cons: 'May need small cut for weight class',
          },
          {
            range: '20%+ bodyfat',
            description: 'Higher bodyfat',
            pros: 'Eat more, potentially stronger',
            cons: 'Health risks, harder weight cuts, may need to move up class',
          },
        ],
        women: [
          {
            range: '18-22% bodyfat',
            description: 'Optimal for powerlifting',
            pros: 'Healthy hormones, strong, manageable weight',
            cons: 'None - ideal range',
          },
          {
            range: '15-18% bodyfat',
            description: 'Athletic lean',
            pros: 'Very muscular, easy weight management',
            cons: 'May affect hormones/period, recovery',
          },
          {
            range: '22-28% bodyfat',
            description: 'Healthy range',
            pros: 'Good strength, healthy',
            cons: 'May need to cut for lower classes',
          },
          {
            range: '28%+ bodyfat',
            description: 'Higher bodyfat',
            pros: 'Eat more freely',
            cons: 'Health concerns, difficult cuts, may need higher class',
          },
        ],
      },
      recomp: {
        title: 'Body Recomposition Strategy',
        when: 'When you want to build muscle while losing fat',
        approach: [
          'Small calorie deficit (200-300 cal)',
          'Very high protein (1-1.2g/lb)',
          'Maintain training intensity',
          'Patient timeline (months)',
          'Track with photos and measurements, not just scale',
        ],
        realistic: [
          'Beginners: Can recomp effectively',
          'Intermediate: Slower progress',
          'Advanced: Very difficult, pick bulk or cut',
        ],
      },
    },
    longTerm: {
      name: 'Long-Term Strategy',
      icon: 'trending-up',
      color: 'amber',
      philosophy: [
        'Don\'t stay in same class forever',
        'If crushing class, move up',
        'If barely making weight, move up',
        'Build muscle in off-season',
        'Strategic cuts only for important meets',
        'Health over ego',
      ],
      offseason: {
        title: 'Off-Season Weight Management',
        approach: [
          'Stay within 5-8% of competition weight',
          'Small surplus to build muscle (200-300 cal)',
          'Gain 0.5-1lb per month',
          'Don\'t dirty bulk (getting fat ≠ getting strong)',
          'Track and adjust',
        ],
        mistakes: [
          'Ballooning 20kg above weight class',
          'Cutting hard every single meet',
          'Yo-yo dieting',
          'Not eating enough to build muscle',
        ],
      },
      movingUp: {
        title: 'When to Move Up a Weight Class',
        signs: [
          'Consistently struggling to make weight',
          'Cutting 7%+ bodyweight regularly',
          'Performance suffering from cuts',
          'Body composition improved (more muscle)',
          'Dominating current class',
          'Next class has better competition for you',
        ],
        process: [
          'Gradually gain muscle in off-season',
          'Track strength gains',
          'Test new class at local meet',
          'Compare Dots/Wilks scores',
          'Commit to new class for full year',
        ],
        mentalBlock: [
          'It\'s okay to be heavier',
          'You\'re not "giving up"',
          'More muscle = more strength potential',
          'Judge by Dots/Wilks, not class',
        ],
      },
      examplePaths: [
        {
          scenario: 'Started 74kg, Now 85kg walk-around',
          options: [
            'Cut to 83kg (2kg = reasonable)',
            'Compete 93kg (walk-around, no cut)',
            'Gain to 93kg (more muscle, more potential)',
          ],
          bestChoice: 'Probably 93kg - cutting from 85 to 83 is small and affects performance',
        },
        {
          scenario: 'Woman 64kg walk-around, competing 63kg',
          options: [
            'Stay 63kg (1kg cut = easy)',
            'Gain muscle to 69kg over time',
          ],
          bestChoice: '63kg short-term, consider 69kg if strength stalls',
        },
      ],
    },
    myths: {
      name: 'Myths & Facts',
      icon: 'alert-circle',
      color: 'red',
      myths: [
        {
          myth: '"Lighter weight class = easier competition"',
          reality: 'Not always true. Depends on your area and federation. Check OpenPowerlifting.',
        },
        {
          myth: '"I should be as light as possible"',
          reality: 'More muscle = more strength potential. Find YOUR optimal weight.',
        },
        {
          myth: '"Cutting weight always helps total"',
          reality: 'Bad cuts hurt performance. Small strategic cuts okay, big cuts = weaker.',
        },
        {
          myth: '"I need to cut weight to be competitive"',
          reality: 'Only if actually competitive and strategic. Most don\'t need to cut.',
        },
        {
          myth: '"Water cutting is safe"',
          reality: 'Can be dangerous. Dehydration affects performance and health. Be careful.',
        },
        {
          myth: '"Heavier = automatically stronger"',
          reality: 'More FAT doesn\'t help. More MUSCLE does. Body comp matters.',
        },
        {
          myth: '"I can cut 10kg water weight"',
          reality: 'Maybe, but you\'ll perform like crap. 3-5kg max safely.',
        },
        {
          myth: '"Sauna suits are magic"',
          reality: 'Just dehydration. Temporary. Doesn\'t help performance.',
        },
      ],
    },
  };

  const currentSection = weightClassData[selectedSection as keyof typeof weightClassData];

  const getColorClass = (color: string) => {
    const colors: { [key: string]: string } = {
      blue: 'bg-blue-500',
      emerald: 'bg-emerald-500',
      cyan: 'bg-cyan-500',
      purple: 'bg-purple-500',
      amber: 'bg-amber-500',
      red: 'bg-red-500',
    };
    return colors[color];
  };

  const calculateCutPercentage = () => {
    const current = parseFloat(currentWeight);
    const target = parseFloat(targetWeight);
    if (current && target && current > target) {
      const diff = current - target;
      const percentage = ((diff / current) * 100).toFixed(1);
      return { diff: diff.toFixed(1), percentage };
    }
    return null;
  };

  const cutData = calculateCutPercentage();

  return (
    <View className="flex-1 bg-zinc-950">
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1 ml-3">
            Weight Class Management
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          <View className="bg-gradient-to-r from-blue-500 to-emerald-500 rounded-xl p-6 mb-6">
            <Text className="text-white text-2xl font-bold mb-2">Making Weight</Text>
            <Text className="text-white opacity-90">
              Strategic weight class selection and cutting
            </Text>
          </View>

          <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
            <Text className="text-white font-bold mb-3">Weight Cut Calculator</Text>
            <View className="mb-3">
              <Text className="text-zinc-400 text-sm mb-1">Current Weight (kg)</Text>
              <TextInput
                value={currentWeight}
                onChangeText={setCurrentWeight}
                keyboardType="numeric"
                placeholder="e.g., 85"
                placeholderTextColor="#52525b"
                className="bg-zinc-800 text-white rounded-lg px-4 py-3 border border-zinc-700"
              />
            </View>
            <View className="mb-3">
              <Text className="text-zinc-400 text-sm mb-1">Target Weight Class (kg)</Text>
              <TextInput
                value={targetWeight}
                onChangeText={setTargetWeight}
                keyboardType="numeric"
                placeholder="e.g., 83"
                placeholderTextColor="#52525b"
                className="bg-zinc-800 text-white rounded-lg px-4 py-3 border border-zinc-700"
              />
            </View>
            
            {cutData && (
              <View className="bg-blue-500/10 rounded-xl p-4 border border-blue-500/30">
                <Text className="text-blue-400 font-bold mb-2">Cut Analysis:</Text>
                <Text className="text-blue-300 text-sm mb-1">
                  Need to lose: {cutData.diff}kg
                </Text>
                <Text className="text-blue-300 text-sm mb-2">
                  Percentage: {cutData.percentage}% of bodyweight
                </Text>
                {parseFloat(cutData.percentage) <= 3 && (
                  <Text className="text-emerald-400 text-sm">✓ Easy cut - should be no problem</Text>
                )}
                {parseFloat(cutData.percentage) > 3 && parseFloat(cutData.percentage) <= 5 && (
                  <Text className="text-amber-400 text-sm">⚠ Moderate cut - doable with planning</Text>
                )}
                {parseFloat(cutData.percentage) > 5 && parseFloat(cutData.percentage) <= 7 && (
                  <Text className="text-red-400 text-sm">⚠ Hard cut - will impact performance</Text>
                )}
                {parseFloat(cutData.percentage) > 7 && (
                  <Text className="text-red-400 text-sm">✗ Too much - consider moving up a class</Text>
                )}
              </View>
            )}
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6">
            <View className="flex-row gap-3 px-1">
              {Object.entries(weightClassData).map(([key, section]) => (
                <TouchableOpacity
                  key={key}
                  onPress={() => setSelectedSection(key)}
                  className={`${
                    selectedSection === key 
                      ? getColorClass(section.color)
                      : 'bg-zinc-900'
                  } rounded-xl p-4 border ${
                    selectedSection === key 
                      ? 'border-white/30'
                      : 'border-zinc-800'
                  } min-w-[180px]`}
                >
                  <Ionicons 
                    name={section.icon as any} 
                    size={32} 
                    color={selectedSection === key ? 'white' : '#a1a1aa'} 
                  />
                  <Text className={`${selectedSection === key ? 'text-white' : 'text-zinc-400'} font-bold mt-2`}>
                    {section.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          {selectedSection === 'choosing' && (
            <View>
              <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
                <Text className="text-blue-400 text-xl font-bold mb-4">Weight Classes</Text>
                
                <Text className="text-white font-bold mb-2">Men:</Text>
                <View className="flex-row flex-wrap gap-2 mb-4">
                  {currentSection.classes?.men.map((wc: string, idx: number) => (
                    <View key={idx} className="bg-blue-500/20 rounded-lg px-3 py-2">
                      <Text className="text-blue-300 text-sm">{wc}</Text>
                    </View>
                  ))}
                </View>

                <Text className="text-white font-bold mb-2">Women:</Text>
                <View className="flex-row flex-wrap gap-2">
                  {currentSection.classes?.women.map((wc: string, idx: number) => (
                    <View key={idx} className="bg-purple-500/20 rounded-lg px-3 py-2">
                      <Text className="text-purple-300 text-sm">{wc}</Text>
                    </View>
                  ))}
                </View>
              </View>

              {currentSection.strategy?.map((strat: any, idx: number) => (
                <View key={idx} className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
                  <Text className="text-blue-400 text-lg font-bold mb-2">{strat.situation}</Text>
                  <View className="bg-emerald-500/10 rounded-xl p-3 border border-emerald-500/30 mb-3">
                    <Text className="text-emerald-400 font-bold">{strat.recommendation}</Text>
                  </View>

                  <Text className="text-white font-bold mb-2">Reasoning:</Text>
                  {strat.reasoning.map((reason: string, rIdx: number) => (
                    <Text key={rIdx} className="text-zinc-300 text-sm mb-1">• {reason}</Text>
                  ))}

                  {strat.guideline && (
                    <Text className="text-blue-400 text-sm mt-3 italic">→ {strat.guideline}</Text>
                  )}
                </View>
              ))}

              <View className="bg-red-500/10 rounded-xl p-5 border border-red-500/30 mb-6">
                <Text className="text-red-400 font-bold mb-3">Common Mistakes:</Text>
                {currentSection.mistakes?.map((mistake: string, idx: number) => (
                  <Text key={idx} className="text-red-300 text-sm mb-1">✗ {mistake}</Text>
                ))}
              </View>
            </View>
          )}

          {selectedSection === 'making' && (
            <View>
              {currentSection.timeline?.phases.map((phase: any, idx: number) => (
                <View key={idx} className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
                  <Text className="text-emerald-400 text-xl font-bold mb-2">{phase.phase}</Text>
                  <Text className="text-white font-bold mb-3">Goal: {phase.goal}</Text>

                  <View className="bg-emerald-500/10 rounded-xl p-4 border border-emerald-500/30 mb-3">
                    <Text className="text-emerald-400 font-bold mb-2">Method:</Text>
                    {phase.method.map((item: string, mIdx: number) => (
                      <Text key={mIdx} className="text-emerald-300 text-sm mb-1">• {item}</Text>
                    ))}
                  </View>

                  {phase.target && (
                    <Text className="text-blue-400 text-sm">Target: {phase.target}</Text>
                  )}

                  {phase.warning && (
                    <View className="bg-red-500/10 rounded-xl p-3 border border-red-500/30 mt-3">
                      <Text className="text-red-400 text-sm">⚠️ {phase.warning}</Text>
                    </View>
                  )}
                </View>
              ))}

              {Object.entries(currentSection.weighInTypes || {}).map(([key, type]: [string, any]) => (
                <View key={key} className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
                  <Text className="text-cyan-400 text-xl font-bold mb-2">{type.name}</Text>
                  <Text className="text-zinc-300 mb-4">{type.description}</Text>

                  <View className="bg-emerald-500/10 rounded-xl p-4 border border-emerald-500/30 mb-3">
                    <Text className="text-emerald-400 font-bold mb-2">Pros:</Text>
                    {type.pros.map((pro: string, pIdx: number) => (
                      <Text key={pIdx} className="text-emerald-300 text-sm mb-1">✓ {pro}</Text>
                    ))}
                  </View>

                  <View className="bg-red-500/10 rounded-xl p-4 border border-red-500/30 mb-3">
                    <Text className="text-red-400 font-bold mb-2">Cons:</Text>
                    {type.cons.map((con: string, cIdx: number) => (
                      <Text key={cIdx} className="text-red-300 text-sm mb-1">✗ {con}</Text>
                    ))}
                  </View>

                  <View className="bg-blue-500/10 rounded-xl p-4 border border-blue-500/30">
                    <Text className="text-blue-400 font-bold mb-2">Strategy:</Text>
                    {type.strategy.map((strat: string, sIdx: number) => (
                      <Text key={sIdx} className="text-blue-300 text-sm mb-1">• {strat}</Text>
                    ))}
                  </View>
                </View>
              ))}
            </View>
          )}

          {selectedSection === 'rehydration' && (
            <View>
              {Object.entries(currentSection).filter(([key]) => key !== 'name' && key !== 'icon' && key !== 'color').map(([key, section]: [string, any]) => (
                <View key={key} className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
                  <Text className="text-cyan-400 text-xl font-bold mb-4">{section.title}</Text>
                  
                  {section.actions && section.actions.map((action: string, idx: number) => (
                    <Text key={idx} className="text-zinc-300 mb-2">• {action}</Text>
                  ))}

                  {section.night && (
                    <View className="mb-4">
                      <Text className="text-white font-bold mb-2">Night Before:</Text>
                      {section.night.map((item: string, idx: number) => (
                        <Text key={idx} className="text-zinc-300 text-sm mb-1">• {item}</Text>
                      ))}
                    </View>
                  )}

                  {section.morning && (
                    <View>
                      <Text className="text-white font-bold mb-2">Morning Of:</Text>
                      {section.morning.map((item: string, idx: number) => (
                        <Text key={idx} className="text-zinc-300 text-sm mb-1">• {item}</Text>
                      ))}
                    </View>
                  )}
                </View>
              ))}
            </View>
          )}

          {selectedSection === 'bodyfat' && (
            <View>
              <View className="bg-purple-500/10 rounded-xl p-5 border border-purple-500/30 mb-6">
                <Text className="text-purple-400 font-bold text-lg mb-3">Why Body Comp Matters:</Text>
                {currentSection.importance?.map((reason: string, idx: number) => (
                  <Text key={idx} className="text-purple-300 text-sm mb-1">• {reason}</Text>
                ))}
              </View>

              <Text className="text-white text-xl font-bold mb-4">Men's Guidelines</Text>
              {currentSection.guidelines?.men.map((guide: any, idx: number) => (
                <View key={idx} className="bg-zinc-900 rounded-xl p-5 mb-4 border border-zinc-800">
                  <Text className="text-blue-400 font-bold mb-1">{guide.range}</Text>
                  <Text className="text-zinc-300 text-sm mb-3">{guide.description}</Text>
                  <View className="flex-row justify-between">
                    <Text className="text-emerald-400 text-sm flex-1 mr-2">✓ {guide.pros}</Text>
                    <Text className="text-red-400 text-sm flex-1">✗ {guide.cons}</Text>
                  </View>
                </View>
              ))}

              <Text className="text-white text-xl font-bold mb-4 mt-6">Women's Guidelines</Text>
              {currentSection.guidelines?.women.map((guide: any, idx: number) => (
                <View key={idx} className="bg-zinc-900 rounded-xl p-5 mb-4 border border-zinc-800">
                  <Text className="text-purple-400 font-bold mb-1">{guide.range}</Text>
                  <Text className="text-zinc-300 text-sm mb-3">{guide.description}</Text>
                  <View className="flex-row justify-between">
                    <Text className="text-emerald-400 text-sm flex-1 mr-2">✓ {guide.pros}</Text>
                    <Text className="text-red-400 text-sm flex-1">✗ {guide.cons}</Text>
                  </View>
                </View>
              ))}
            </View>
          )}

          {selectedSection === 'longTerm' && (
            <View>
              <View className="bg-amber-500/10 rounded-xl p-5 border border-amber-500/30 mb-6">
                <Text className="text-amber-400 font-bold text-lg mb-3">Philosophy:</Text>
                {currentSection.philosophy?.map((item: string, idx: number) => (
                  <Text key={idx} className="text-amber-300 text-sm mb-1">• {item}</Text>
                ))}
              </View>

              {Object.entries(currentSection).filter(([key]) => !['name', 'icon', 'color', 'philosophy', 'examplePaths'].includes(key)).map(([key, section]: [string, any]) => (
                <View key={key} className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
                  <Text className="text-amber-400 text-xl font-bold mb-4">{section.title}</Text>

                  {section.approach && section.approach.map((item: string, idx: number) => (
                    <Text key={idx} className="text-zinc-300 mb-2">• {item}</Text>
                  ))}

                  {section.signs && (
                    <View className="bg-emerald-500/10 rounded-xl p-4 border border-emerald-500/30 mb-3">
                      <Text className="text-emerald-400 font-bold mb-2">Signs:</Text>
                      {section.signs.map((sign: string, sIdx: number) => (
                        <Text key={sIdx} className="text-emerald-300 text-sm mb-1">• {sign}</Text>
                      ))}
                    </View>
                  )}

                  {section.mistakes && (
                    <View className="bg-red-500/10 rounded-xl p-4 border border-red-500/30">
                      <Text className="text-red-400 font-bold mb-2">Mistakes:</Text>
                      {section.mistakes.map((mistake: string, mIdx: number) => (
                        <Text key={mIdx} className="text-red-300 text-sm mb-1">✗ {mistake}</Text>
                      ))}
                    </View>
                  )}
                </View>
              ))}
            </View>
          )}

          {selectedSection === 'myths' && (
            <View>
              {currentSection.myths?.map((item: any, idx: number) => (
                <View key={idx} className="bg-zinc-900 rounded-xl p-5 mb-4 border border-zinc-800">
                  <View className="bg-red-500/10 rounded-xl p-3 border border-red-500/30 mb-3">
                    <Text className="text-red-400 font-bold">✗ Myth: {item.myth}</Text>
                  </View>
                  <View className="bg-emerald-500/10 rounded-xl p-3 border border-emerald-500/30">
                    <Text className="text-emerald-400 font-bold">✓ Reality: {item.reality}</Text>
                  </View>
                </View>
              ))}
            </View>
          )}

          <View className="bg-gradient-to-r from-blue-500/20 to-emerald-500/20 rounded-xl p-5 border border-blue-500/30 mb-6">
            <Text className="text-blue-400 font-bold text-lg mb-3">Remember</Text>
            <Text className="text-blue-300 text-sm mb-2">
              • Strength-to-weight ratio matters more than absolute weight
            </Text>
            <Text className="text-blue-300 text-sm mb-2">
              • Small strategic cuts okay, big cuts hurt performance
            </Text>
            <Text className="text-blue-300 text-sm mb-2">
              • Body composition &gt; scale weight
            </Text>
            <Text className="text-blue-300 text-sm">
              • When in doubt, move up and get stronger
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
