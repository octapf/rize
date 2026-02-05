import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function RecoveryTechniques() {
  const [selectedTechnique, setSelectedTechnique] = useState('sleep');

  const techniques = {
    sleep: {
      name: 'Sleep Optimization',
      icon: 'moon',
      color: 'purple',
      importance: 'Most important recovery tool',
      target: '7-9 hours per night',
      benefits: [
        'Muscle protein synthesis peaks during deep sleep',
        'Growth hormone release (primarily during sleep)',
        'CNS recovery and neural adaptation',
        'Testosterone production (60% during sleep)',
        'Cortisol regulation (stress hormone)',
      ],
      implementation: [
        {
          tip: 'Consistent Schedule',
          details: 'Same bedtime and wake time every day (even weekends)',
          priority: 'Critical',
        },
        {
          tip: 'Dark Room',
          details: 'Blackout curtains or eye mask. Complete darkness signals melatonin production',
          priority: 'High',
        },
        {
          tip: 'Cool Temperature',
          details: '15-19°C ideal for deep sleep. Body temp drops to sleep',
          priority: 'High',
        },
        {
          tip: 'No Screens 1h Before',
          details: 'Blue light suppresses melatonin. Use blue blockers if necessary',
          priority: 'High',
        },
        {
          tip: 'Caffeine Cutoff',
          details: 'No caffeine after 2pm. Half-life is 5-6 hours',
          priority: 'Medium',
        },
        {
          tip: 'Wind Down Routine',
          details: 'Read, stretch, meditate 30 min before bed',
          priority: 'Medium',
        },
        {
          tip: 'Limit Alcohol',
          details: 'Alcohol disrupts REM sleep and recovery',
          priority: 'Medium',
        },
      ],
      metrics: [
        { metric: '7-9 hours', impact: 'Optimal recovery' },
        { metric: '6 hours', impact: '15% reduction in testosterone' },
        { metric: '<5 hours', impact: 'Muscle loss, poor recovery, injury risk' },
      ],
    },
    nutrition: {
      name: 'Recovery Nutrition',
      icon: 'nutrition',
      color: 'emerald',
      importance: 'Fuel for adaptation',
      target: 'Sufficient protein and calories',
      benefits: [
        'Muscle protein synthesis (needs amino acids)',
        'Glycogen replenishment (needs carbs)',
        'Inflammation reduction (omega-3s)',
        'Micronutrients for recovery processes',
        'Energy for next session',
      ],
      implementation: [
        {
          tip: 'Protein Target',
          details: '2-2.5g/kg bodyweight daily. Higher when cutting',
          priority: 'Critical',
        },
        {
          tip: 'Post-Workout Meal',
          details: '30-50g protein + carbs within 2-3 hours (not critical timing)',
          priority: 'High',
        },
        {
          tip: 'Calorie Surplus (Gaining)',
          details: '+200-500 cal above maintenance for muscle growth',
          priority: 'High',
        },
        {
          tip: 'Carbs Around Training',
          details: '50-100g carbs pre-workout, 75-150g post-workout',
          priority: 'Medium',
        },
        {
          tip: 'Omega-3 Fatty Acids',
          details: '2-3g EPA/DHA daily. Reduces inflammation',
          priority: 'Medium',
        },
        {
          tip: 'Hydration',
          details: '3-4L water daily. More if sweating heavily',
          priority: 'High',
        },
        {
          tip: 'Micronutrients',
          details: 'Vitamin D (5000 IU), Magnesium (400mg), Zinc (30mg)',
          priority: 'Medium',
        },
      ],
      metrics: [
        { metric: '2.2g/kg protein', impact: 'Optimal muscle growth' },
        { metric: '1.6g/kg protein', impact: 'Minimum for gains' },
        { metric: '<1.2g/kg protein', impact: 'Suboptimal recovery' },
      ],
    },
    active: {
      name: 'Active Recovery',
      icon: 'walk',
      color: 'blue',
      importance: 'Movement promotes recovery',
      target: '20-30 min light activity on off days',
      benefits: [
        'Increases blood flow to muscles',
        'Removes metabolic waste products',
        'Reduces muscle soreness (DOMS)',
        'Maintains movement quality',
        'Psychological refresh',
      ],
      implementation: [
        {
          tip: 'Walking',
          details: '30-60 min easy walking. Most accessible',
          priority: 'High',
        },
        {
          tip: 'Light Cycling',
          details: '20-30 min easy pace. Good for leg recovery',
          priority: 'Medium',
        },
        {
          tip: 'Swimming',
          details: 'Low impact, full body. Great for joint health',
          priority: 'Medium',
        },
        {
          tip: 'Yoga/Stretching',
          details: '30 min gentle flow. Mobility + relaxation',
          priority: 'Medium',
        },
        {
          tip: 'Light Cardio',
          details: 'Zone 2 HR (conversational pace). 20-30 min',
          priority: 'Medium',
        },
        {
          tip: 'Foam Rolling',
          details: '10-15 min on sore areas. Not a magic bullet',
          priority: 'Low',
        },
      ],
      metrics: [
        { metric: '2-3x/week', impact: 'Optimal active recovery' },
        { metric: 'Every day', impact: 'May interfere with adaptation' },
        { metric: 'Never', impact: 'Missing recovery benefits' },
      ],
    },
    stress: {
      name: 'Stress Management',
      icon: 'heart',
      color: 'red',
      importance: 'Total stress affects recovery',
      target: 'Manage life + training stress',
      benefits: [
        'Lower cortisol (catabolic hormone)',
        'Better sleep quality',
        'Improved immune function',
        'Mental clarity and focus',
        'Sustainable training',
      ],
      implementation: [
        {
          tip: 'Training = Stress',
          details: 'Heavy training IS stress. High life stress = reduce training volume',
          priority: 'Critical',
        },
        {
          tip: 'Meditation',
          details: '10-20 min daily. Reduces cortisol significantly',
          priority: 'High',
        },
        {
          tip: 'Breathing Exercises',
          details: 'Box breathing: 4s in, 4s hold, 4s out, 4s hold. 5 min',
          priority: 'Medium',
        },
        {
          tip: 'Time in Nature',
          details: '20-30 min outside daily. Reduces stress hormones',
          priority: 'Medium',
        },
        {
          tip: 'Social Connection',
          details: 'Quality time with friends/family. Don\'t isolate',
          priority: 'Medium',
        },
        {
          tip: 'Hobbies Outside Gym',
          details: 'Life isn\'t just training. Have other interests',
          priority: 'Medium',
        },
        {
          tip: 'Therapy/Counseling',
          details: 'If stressed/anxious, get professional help',
          priority: 'High (if needed)',
        },
      ],
      metrics: [
        { metric: 'Low stress', impact: 'Train harder, recover better' },
        { metric: 'Moderate stress', impact: 'Maintain training, prioritize recovery' },
        { metric: 'High stress', impact: 'Reduce volume 30-50%, focus recovery' },
      ],
    },
    modalities: {
      name: 'Recovery Modalities',
      icon: 'water',
      color: 'amber',
      importance: 'Supplemental tools (not required)',
      target: 'Use as needed, not essential',
      benefits: [
        'May reduce perceived soreness',
        'Psychological benefit (feeling of recovery)',
        'Can enhance relaxation',
        'Some evidence for specific uses',
        'Mostly placebo, but placebo works',
      ],
      implementation: [
        {
          tip: 'Massage',
          details: 'Weekly or bi-weekly. Helps with muscle tension',
          priority: 'Low (nice to have)',
        },
        {
          tip: 'Sauna',
          details: '15-20 min 2-3x/week. Some cardiovascular benefits',
          priority: 'Low',
        },
        {
          tip: 'Cold Plunge',
          details: '2-5 min cold water. May blunt adaptation if done after training',
          priority: 'Low (careful timing)',
        },
        {
          tip: 'Compression Gear',
          details: 'Limited evidence. Mostly placebo',
          priority: 'Very low',
        },
        {
          tip: 'TENS/EMS',
          details: 'No evidence for recovery. Waste of money',
          priority: 'Skip it',
        },
        {
          tip: 'Foam Rolling',
          details: 'May reduce soreness perception. Won\'t fix problems',
          priority: 'Low',
        },
        {
          tip: 'Contrast Baths',
          details: 'Hot/cold alternating. Limited evidence',
          priority: 'Low',
        },
      ],
      metrics: [
        { metric: 'Sleep + nutrition', impact: '90% of recovery' },
        { metric: 'Stress management', impact: '5% of recovery' },
        { metric: 'Fancy modalities', impact: '5% of recovery (mostly placebo)' },
      ],
    },
  };

  const currentTechnique = techniques[selectedTechnique as keyof typeof techniques];

  const getColorClass = (color: string) => {
    const colors: { [key: string]: string } = {
      purple: 'bg-purple-500',
      emerald: 'bg-primary',
      blue: 'bg-primary',
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
            Recovery Techniques
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          <View className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl p-6 mb-6">
            <Text className="text-white text-2xl font-bold mb-2">Optimize Recovery</Text>
            <Text className="text-white opacity-90">
              Growth happens during rest
            </Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6">
            <View className="flex-row gap-3 px-1">
              {Object.entries(techniques).map(([key, technique]) => (
                <TouchableOpacity
                  key={key}
                  onPress={() => setSelectedTechnique(key)}
                  className={`${
                    selectedTechnique === key 
                      ? getColorClass(technique.color)
                      : 'bg-zinc-900'
                  } rounded-xl p-4 border ${
                    selectedTechnique === key 
                      ? 'border-white/30'
                      : 'border-zinc-800'
                  } min-w-[180px]`}
                >
                  <Ionicons 
                    name={technique.icon as any} 
                    size={32} 
                    color={selectedTechnique === key ? 'white' : '#a1a1aa'} 
                  />
                  <Text className={`${selectedTechnique === key ? 'text-white' : 'text-zinc-400'} font-bold mt-2`}>
                    {technique.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
            <Text className="text-white text-xl font-bold mb-4">{currentTechnique.name}</Text>

            <View className={`${getColorClass(currentTechnique.color)}/10 rounded-xl p-4 border ${getColorClass(currentTechnique.color)}/30 mb-4`}>
              <View className="mb-3">
                <Text className="text-zinc-400 text-sm mb-1">Importance:</Text>
                <Text className="text-white font-bold">{currentTechnique.importance}</Text>
              </View>
              <View>
                <Text className="text-zinc-400 text-sm mb-1">Target:</Text>
                <Text className={`text-${currentTechnique.color}-400 font-bold`}>{currentTechnique.target}</Text>
              </View>
            </View>

            <Text className="text-white font-bold mb-3">Benefits:</Text>
            <View className="bg-zinc-800 rounded-xl p-4 mb-4">
              {currentTechnique.benefits.map((benefit, idx) => (
                <Text key={idx} className="text-primary text-sm mb-2 last:mb-0">
                  ✓ {benefit}
                </Text>
              ))}
            </View>

            <Text className="text-white font-bold mb-3">Implementation:</Text>
            {currentTechnique.implementation.map((item, idx) => (
              <View key={idx} className="bg-zinc-800 rounded-xl p-4 mb-3 last:mb-4">
                <View className="flex-row items-center justify-between mb-2">
                  <Text className="text-white font-bold">{item.tip}</Text>
                  <View className={`${
                    item.priority === 'Critical' ? 'bg-red-500' :
                    item.priority.includes('High') ? 'bg-orange-500' :
                    'bg-zinc-600'
                  } rounded-full px-3 py-1`}>
                    <Text className="text-white text-xs font-bold">{item.priority}</Text>
                  </View>
                </View>
                <Text className="text-zinc-300 text-sm">{item.details}</Text>
              </View>
            ))}

            <Text className="text-white font-bold mb-3">Impact Metrics:</Text>
            {currentTechnique.metrics.map((metric, idx) => (
              <View key={idx} className="bg-zinc-800 rounded-xl p-3 mb-2 last:mb-0">
                <View className="flex-row justify-between items-center">
                  <Text className={`text-${currentTechnique.color}-400 font-bold`}>{metric.metric}</Text>
                  <Text className="text-zinc-300 text-sm">{metric.impact}</Text>
                </View>
              </View>
            ))}
          </View>

          <View className="bg-purple-500/10 rounded-xl p-4 border border-purple-500/30 mb-6">
            <Text className="text-purple-400 font-bold mb-2">Recovery Hierarchy</Text>
            <View className="space-y-2">
              <View className="flex-row items-center mb-2">
                <Text className="text-purple-400 font-bold mr-2">1.</Text>
                <Text className="text-white flex-1">Sleep (7-9h) - Non-negotiable</Text>
              </View>
              <View className="flex-row items-center mb-2">
                <Text className="text-purple-400 font-bold mr-2">2.</Text>
                <Text className="text-white flex-1">Nutrition (protein + calories)</Text>
              </View>
              <View className="flex-row items-center mb-2">
                <Text className="text-purple-400 font-bold mr-2">3.</Text>
                <Text className="text-white flex-1">Stress management</Text>
              </View>
              <View className="flex-row items-center mb-2">
                <Text className="text-purple-400 font-bold mr-2">4.</Text>
                <Text className="text-white flex-1">Active recovery</Text>
              </View>
              <View className="flex-row items-center">
                <Text className="text-purple-400 font-bold mr-2">5.</Text>
                <Text className="text-white flex-1">Other modalities (optional)</Text>
              </View>
            </View>
          </View>

          <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-6">
            <Text className="text-primary font-bold mb-2">Remember</Text>
            <Text className="text-primary/80 text-sm mb-2">
              • You don't grow in the gym, you grow during recovery
            </Text>
            <Text className="text-primary/80 text-sm mb-2">
              • More training â‰  more gains. Recovery is when adaptation happens
            </Text>
            <Text className="text-primary/80 text-sm mb-2">
              • Sleep and nutrition are 90% of recovery
            </Text>
            <Text className="text-primary/80 text-sm">
              • Fancy recovery tools are nice, but not necessary
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}


