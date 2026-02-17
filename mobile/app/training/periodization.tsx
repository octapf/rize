import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function PeriodizationTemplates() {
  const [selectedTemplate, setSelectedTemplate] = useState('linear');

  const templates = {
    linear: {
      name: 'Linear Periodization',
      icon: 'trending-up',
      color: 'blue',
      duration: '12-16 weeks',
      bestFor: 'Beginners, coming back from break',
      phases: [
        {
          name: 'Hypertrophy Phase',
          weeks: '1-4',
          intensity: '60-75% 1RM',
          volume: 'High (12-15 reps, 4-5 sets)',
          focus: 'Build muscle mass',
          notes: ['High volume work', 'Focus on form', 'Build work capacity', 'Eat in surplus'],
        },
        {
          name: 'Strength Phase',
          weeks: '5-8',
          intensity: '75-85% 1RM',
          volume: 'Moderate (6-10 reps, 4 sets)',
          focus: 'Build max strength',
          notes: ['Increase weight', 'Lower reps', 'Maintain form', 'Keep eating well'],
        },
        {
          name: 'Power Phase',
          weeks: '9-12',
          intensity: '85-95% 1RM',
          volume: 'Low (3-5 reps, 3-4 sets)',
          focus: 'Peak strength',
          notes: ['Heavy triples', 'Low volume', 'Full recovery', 'Test 1RM week 12'],
        },
        {
          name: 'Deload',
          weeks: '13',
          intensity: '50-60% 1RM',
          volume: 'Very low (5 reps, 2-3 sets)',
          focus: 'Recovery',
          notes: ['Active recovery', 'Technique work', 'Restore energy', 'Prepare next block'],
        },
      ],
      pros: ['Simple progression', 'Easy to follow', 'Proven results', 'Good for beginners'],
      cons: ['Can get boring', 'Long phases', 'Limited variation', 'May plateau'],
    },
    block: {
      name: 'Block Periodization',
      icon: 'cube',
      color: 'purple',
      duration: '9-12 weeks',
      bestFor: 'Intermediate/advanced lifters',
      phases: [
        {
          name: 'Accumulation Block',
          weeks: '1-4',
          intensity: '65-75% 1RM',
          volume: 'Very high (8-12 reps, 5+ sets)',
          focus: 'Volume accumulation',
          notes: ['Max volume', 'Build base', 'Technical proficiency', 'Expect fatigue'],
        },
        {
          name: 'Intensification Block',
          weeks: '5-7',
          intensity: '80-90% 1RM',
          volume: 'Moderate (3-6 reps, 4 sets)',
          focus: 'Heavy loading',
          notes: ['Cut volume', 'Increase intensity', 'Feel strength gains', 'Better recovery'],
        },
        {
          name: 'Realization Block',
          weeks: '8-9',
          intensity: '90-100% 1RM',
          volume: 'Low (1-3 reps, 2-3 sets)',
          focus: 'Competition prep',
          notes: ['Peak strength', 'Singles/doubles', 'Test maxes', 'Minimal fatigue'],
        },
        {
          name: 'Deload',
          weeks: '10',
          intensity: '50-60% 1RM',
          volume: 'Very low',
          focus: 'Recovery',
          notes: ['Active rest', 'Technique', 'Restore CNS', 'Start next block fresh'],
        },
      ],
      pros: ['Focused blocks', 'Clear progression', 'Handles fatigue well', 'Competition prep'],
      cons: ['Complex planning', 'Requires discipline', 'Can lose muscle in realization', 'Advanced'],
    },
    dup: {
      name: 'DUP (Daily Undulating)',
      icon: 'pulse',
      color: 'primary',
      duration: 'Ongoing',
      bestFor: 'Intermediates, variety seekers',
      phases: [
        {
          name: 'Day 1: Hypertrophy',
          weeks: 'Every week',
          intensity: '65-75% 1RM',
          volume: 'High (8-12 reps, 4-5 sets)',
          focus: 'Muscle building',
          notes: ['Volume day', 'Controlled tempo', 'Feel the pump', 'Good recovery needed'],
        },
        {
          name: 'Day 2: Strength',
          weeks: 'Every week',
          intensity: '80-87% 1RM',
          volume: 'Moderate (4-6 reps, 4 sets)',
          focus: 'Max strength',
          notes: ['Heavy work', 'Lower volume', 'Fast concentrics', 'Longer rest'],
        },
        {
          name: 'Day 3: Power',
          weeks: 'Every week',
          intensity: '75-85% 1RM',
          volume: 'Low (2-4 reps, 5 sets)',
          focus: 'Explosive power',
          notes: ['Speed work', 'Multiple sets', 'Max intent', 'Stop before grind'],
        },
        {
          name: 'Deload Week',
          weeks: 'Every 4-6 weeks',
          intensity: '50-60% 1RM',
          volume: 'Half normal',
          focus: 'Recovery',
          notes: ['Cut volume 50%', 'Same structure', 'Active recovery', 'One week only'],
        },
      ],
      pros: ['Varied stimulus', 'Never boring', 'Frequent practice', 'Good for all levels'],
      cons: ['Can be fatiguing', 'Needs recovery', 'Complex tracking', 'Easy to overtrain'],
    },
    conjugate: {
      name: 'Conjugate (Westside)',
      icon: 'barbell',
      color: 'red',
      duration: 'Ongoing (3-week waves)',
      bestFor: 'Advanced powerlifters',
      phases: [
        {
          name: 'Max Effort Lower',
          weeks: 'Every week',
          intensity: '90-100% 1RM',
          volume: 'Low (1-3 reps, work to max)',
          focus: 'Max strength',
          notes: ['Work to 1-3RM', 'Rotate variations', 'Box squat, deficit DL, etc', 'Then accessories'],
        },
        {
          name: 'Dynamic Effort Lower',
          weeks: 'Every week',
          intensity: '50-70% 1RM + bands',
          volume: 'High (2-3 reps, 8-12 sets)',
          focus: 'Speed strength',
          notes: ['Speed squats', '8-12 sets of 2', 'Bands/chains', 'Fast bar speed'],
        },
        {
          name: 'Max Effort Upper',
          weeks: 'Every week',
          intensity: '90-100% 1RM',
          volume: 'Low (1-3 reps)',
          focus: 'Max pressing',
          notes: ['Work to 1-3RM', 'Rotate: floor press, board press', 'Change every 1-3 weeks', 'Heavy accessories'],
        },
        {
          name: 'Dynamic Effort Upper',
          weeks: 'Every week',
          intensity: '50-70% 1RM + bands',
          volume: 'High (3 reps, 8-10 sets)',
          focus: 'Speed bench',
          notes: ['Speed bench', '8-10 sets of 3', 'Explosive', 'Assistance work'],
        },
      ],
      pros: ['Ultimate variety', 'Address weaknesses', 'Never adapt', 'Proven elite results'],
      cons: ['Very complex', 'Advanced only', 'Equipment needed', 'Easy to mess up'],
    },
  };

  const currentTemplate = templates[selectedTemplate as keyof typeof templates];

  const getColorClasses = (color: string) => {
    const colors: { [key: string]: { bg: string; border: string; text: string } } = {
      blue: { bg: 'bg-primary', border: 'border-primary', text: 'text-primary/80' },
      purple: { bg: 'bg-purple-500', border: 'border-purple-400', text: 'text-purple-400' },
      primary: { bg: 'bg-primary', border: 'border-primary', text: 'text-primary' },
      red: { bg: 'bg-red-500', border: 'border-red-400', text: 'text-red-400' },
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
            Periodization Templates
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          <View className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl p-6 mb-6">
            <Text className="text-white text-2xl font-bold mb-2">Program Structure</Text>
            <Text className="text-white opacity-90">
              Proven periodization models
            </Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6">
            <View className="flex-row gap-3 px-1">
              {Object.entries(templates).map(([key, template]) => (
                <TouchableOpacity
                  key={key}
                  onPress={() => setSelectedTemplate(key)}
                  className={`${
                    selectedTemplate === key 
                      ? getColorClasses(template.color).bg
                      : 'bg-zinc-900'
                  } rounded-xl p-4 border ${
                    selectedTemplate === key 
                      ? getColorClasses(template.color).border
                      : 'border-zinc-800'
                  } min-w-[200px]`}
                >
                  <Ionicons 
                    name={template.icon as any} 
                    size={32} 
                    color={selectedTemplate === key ? 'white' : '#a1a1aa'} 
                  />
                  <Text className={`${selectedTemplate === key ? 'text-white' : 'text-zinc-400'} font-bold mt-2`}>
                    {template.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
            <View className="flex-row items-center mb-4">
              <Ionicons name={currentTemplate.icon as any} size={32} color={getColorClasses(currentTemplate.color).text.replace('text-', '')} />
              <View className="ml-3 flex-1">
                <Text className="text-white text-xl font-bold">{currentTemplate.name}</Text>
                <Text className="text-zinc-400 text-sm">{currentTemplate.duration}</Text>
              </View>
            </View>

            <View className={`${getColorClasses(currentTemplate.color).bg}/10 rounded-xl p-4 border ${getColorClasses(currentTemplate.color).border}/30 mb-4`}>
              <Text className={`${getColorClasses(currentTemplate.color).text} font-bold mb-2`}>Best For</Text>
              <Text className="text-white">{currentTemplate.bestFor}</Text>
            </View>

            <Text className="text-white font-bold text-lg mb-3">Phases</Text>
            {currentTemplate.phases.map((phase, idx) => (
              <View key={idx} className="bg-zinc-800 rounded-xl p-4 mb-3 last:mb-0">
                <Text className="text-white font-bold text-lg mb-2">{phase.name}</Text>
                <View className="mb-3">
                  <View className="flex-row justify-between mb-1">
                    <Text className="text-zinc-400 text-sm">Weeks:</Text>
                    <Text className="text-white font-bold">{phase.weeks}</Text>
                  </View>
                  <View className="flex-row justify-between mb-1">
                    <Text className="text-zinc-400 text-sm">Intensity:</Text>
                    <Text className={`${getColorClasses(currentTemplate.color).text} font-bold`}>{phase.intensity}</Text>
                  </View>
                  <View className="flex-row justify-between mb-1">
                    <Text className="text-zinc-400 text-sm">Volume:</Text>
                    <Text className="text-white font-bold">{phase.volume}</Text>
                  </View>
                  <View className="flex-row justify-between">
                    <Text className="text-zinc-400 text-sm">Focus:</Text>
                    <Text className="text-primary font-bold">{phase.focus}</Text>
                  </View>
                </View>
                <View className="border-t border-zinc-700 pt-3">
                  {phase.notes.map((note, noteIdx) => (
                    <Text key={noteIdx} className="text-zinc-300 text-sm mb-1">
                      � {note}
                    </Text>
                  ))}
                </View>
              </View>
            ))}
          </View>

          <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
            <View className="flex-row items-center mb-4">
              <View className="bg-primary rounded-full p-2 mr-3">
                <Ionicons name="checkmark" size={20} color="white" />
              </View>
              <Text className="text-white font-bold text-lg">Pros</Text>
            </View>
            {currentTemplate.pros.map((pro, idx) => (
              <Text key={idx} className="text-primary text-sm mb-2 last:mb-0">
                ? {pro}
              </Text>
            ))}
          </View>

          <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
            <View className="flex-row items-center mb-4">
              <View className="bg-amber-500 rounded-full p-2 mr-3">
                <Ionicons name="warning" size={20} color="white" />
              </View>
              <Text className="text-white font-bold text-lg">Cons</Text>
            </View>
            {currentTemplate.cons.map((con, idx) => (
              <Text key={idx} className="text-amber-400 text-sm mb-2 last:mb-0">
                ⚠ {con}
              </Text>
            ))}
          </View>

          <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-6">
            <Text className="text-primary/80 font-bold mb-2">Implementation Tips</Text>
            <Text className="text-primary/60 text-sm mb-2">
              � Stick to one model for full cycle (don't program hop)
            </Text>
            <Text className="text-primary/60 text-sm mb-2">
              � Track all lifts to ensure progression
            </Text>
            <Text className="text-primary/60 text-sm mb-2">
              � Don't skip deloads (recovery is when you grow)
            </Text>
            <Text className="text-primary/60 text-sm">
              � Adjust based on recovery and life stress
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

