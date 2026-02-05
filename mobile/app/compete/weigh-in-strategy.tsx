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

export default function WeighIn() {
  const [targetWeight, setTargetWeight] = useState('82.5');
  const [currentWeight, setCurrentWeight] = useState('84.2');
  const [daysOut, setDaysOut] = useState('7');

  const weightToLose = currentWeight && targetWeight 
    ? (parseFloat(currentWeight) - parseFloat(targetWeight)).toFixed(1) 
    : '0';

  const strategies = [
    {
      name: 'Water Cut (Advanced)',
      icon: 'water' as const,
      color: 'blue',
      timeline: '5-7 days',
      description: 'Manipulate water and sodium for rapid weight loss',
      steps: [
        {
          day: '7 days out',
          water: '10L+ (high)',
          sodium: 'High (5000-10000mg)',
          carbs: 'Normal',
          notes: 'Start overloading water and sodium to signal body to flush',
        },
        {
          day: '4 days out',
          water: '8L',
          sodium: 'Moderate (3000-5000mg)',
          carbs: 'Normal',
          notes: 'Maintain high water, start reducing sodium gradually',
        },
        {
          day: '2 days out',
          water: '4L',
          sodium: 'Low (1000-2000mg)',
          carbs: 'Low',
          notes: 'Cut water in half, keep sodium low, reduce carbs',
        },
        {
          day: '1 day out',
          water: '2L until noon, then sips',
          sodium: 'Very low (<500mg)',
          carbs: 'Very low',
          notes: 'Minimal water after noon, avoid sodium completely',
        },
        {
          day: 'Weigh-in day',
          water: 'Sips only until weigh-in',
          sodium: 'None',
          carbs: 'None',
          notes: 'Hot bath/sauna if needed, rehydrate immediately after',
        },
      ],
      risks: 'Dehydration, cramping, poor performance if not executed properly',
      maxLoss: '3-8kg depending on bodyweight',
    },
    {
      name: 'Slow Cut (Beginner)',
      icon: 'time' as const,
      color: 'emerald',
      timeline: '4-8 weeks',
      description: 'Gradual weight loss through diet',
      steps: [
        {
          day: 'Week 1-3',
          water: 'Normal (3-4L)',
          sodium: 'Normal',
          carbs: 'Deficit (300-500 cal)',
          notes: 'Small calorie deficit, maintain strength training',
        },
        {
          day: 'Week 4-6',
          water: 'Normal',
          sodium: 'Normal',
          carbs: 'Moderate deficit (500 cal)',
          notes: 'Continue deficit, monitor strength, refeed 1x/week',
        },
        {
          day: 'Week 7-8',
          water: 'Normal',
          sodium: 'Normal',
          carbs: 'Small deficit (200-300 cal)',
          notes: 'Reduce deficit, maintain strength, prepare for peak week',
        },
        {
          day: 'Final week',
          water: 'Normal until 2 days out, then reduce',
          sodium: 'Normal then low',
          carbs: 'Normal then low',
          notes: 'Minor water manipulation if needed (1-2kg)',
        },
      ],
      risks: 'Low risk, may not make weight class if far over',
      maxLoss: '4-8kg (0.5-1kg per week)',
    },
  ];

  const [selectedStrategy, setSelectedStrategy] = useState(strategies[1].name);

  const currentStrategy = strategies.find(s => s.name === selectedStrategy);

  const rehydrationProtocol = [
    'Immediately after weigh-in: 500ml water + electrolytes',
    '15-30 min: Simple carbs (gatorade, juice) + 500ml water',
    '30-60 min: Light meal (rice, banana, toast) + 500ml water',
    '1-2 hours: Full meal (protein + carbs + fat) + hydrate',
    'Continue sipping water every 15-30 min until fully hydrated',
    'Avoid chugging water (causes cramping)',
    'Target: regain 80-100% of weight lost by lifting time',
  ];

  return (
    <View className="flex-1 bg-zinc-950">
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1 ml-3">
            Weigh-In Strategy
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          <View className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl p-6 mb-6">
            <Text className="text-white text-2xl font-bold mb-2">Make Weight</Text>
            <Text className="text-white opacity-90">
              Strategic weigh-in preparation
            </Text>
          </View>

          <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
            <Text className="text-white font-bold text-lg mb-4">Weight Calculator</Text>
            
            <View className="mb-4">
              <Text className="text-zinc-400 mb-2">Target Weight Class (kg)</Text>
              <TextInput
                className="bg-zinc-800 text-white text-xl font-bold rounded-xl px-4 py-3 border border-zinc-700"
                keyboardType="numeric"
                value={targetWeight}
                onChangeText={setTargetWeight}
                placeholder="82.5"
                placeholderTextColor="#52525b"
              />
            </View>

            <View className="mb-4">
              <Text className="text-zinc-400 mb-2">Current Weight (kg)</Text>
              <TextInput
                className="bg-zinc-800 text-white text-xl font-bold rounded-xl px-4 py-3 border border-zinc-700"
                keyboardType="numeric"
                value={currentWeight}
                onChangeText={setCurrentWeight}
                placeholder="84.2"
                placeholderTextColor="#52525b"
              />
            </View>

            <View className="mb-4">
              <Text className="text-zinc-400 mb-2">Days Until Weigh-In</Text>
              <TextInput
                className="bg-zinc-800 text-white text-xl font-bold rounded-xl px-4 py-3 border border-zinc-700"
                keyboardType="numeric"
                value={daysOut}
                onChangeText={setDaysOut}
                placeholder="7"
                placeholderTextColor="#52525b"
              />
            </View>

            <View className="bg-primary/10 rounded-xl p-4 border border-primary/30">
              <View className="flex-row justify-between mb-2">
                <Text className="text-primary/80 font-bold">Weight to lose:</Text>
                <Text className="text-primary/80 text-2xl font-bold">{weightToLose}kg</Text>
              </View>
              <Text className="text-primary/60 text-sm">
                {parseFloat(weightToLose) <= 2 
                  ? 'âœ“ Easy - minimal manipulation needed' 
                  : parseFloat(weightToLose) <= 5 
                  ? 'âš  Moderate - water cut recommended' 
                  : 'âš  Difficult - consider slow cut or weight class up'}
              </Text>
            </View>
          </View>

          <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
            <Text className="text-white font-bold text-lg mb-3">Select Strategy</Text>
            <View className="flex-row gap-2">
              {strategies.map((strat) => (
                <TouchableOpacity
                  key={strat.name}
                  onPress={() => setSelectedStrategy(strat.name)}
                  className={`flex-1 ${
                    selectedStrategy === strat.name ? `bg-${strat.color}-500` : 'bg-zinc-800'
                  } rounded-xl px-3 py-3 border ${
                    selectedStrategy === strat.name ? `border-${strat.color}-400` : 'border-zinc-700'
                  }`}
                >
                  <Ionicons 
                    name={strat.icon} 
                    size={20} 
                    color={selectedStrategy === strat.name ? 'white' : '#a1a1aa'} 
                    style={{ alignSelf: 'center', marginBottom: 4 }}
                  />
                  <Text className="text-white font-bold text-center text-xs">
                    {strat.name.split(' ')[0]}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {currentStrategy && (
            <View className={`bg-${currentStrategy.color}-500/10 rounded-xl p-5 mb-6 border border-${currentStrategy.color}-500/30`}>
              <View className="flex-row items-center mb-3">
                <Ionicons name={currentStrategy.icon} size={24} color={`#${currentStrategy.color === 'blue' ? '3b82f6' : '10b981'}`} />
                <Text className={`text-${currentStrategy.color}-400 font-bold text-xl ml-2`}>
                  {currentStrategy.name}
                </Text>
              </View>
              <Text className="text-zinc-300 mb-3">{currentStrategy.description}</Text>
              
              <View className="bg-zinc-900 rounded-xl p-3 mb-3">
                <View className="flex-row justify-between">
                  <Text className="text-zinc-400">Timeline:</Text>
                  <Text className="text-white font-bold">{currentStrategy.timeline}</Text>
                </View>
                <View className="flex-row justify-between mt-2">
                  <Text className="text-zinc-400">Max loss:</Text>
                  <Text className="text-white font-bold">{currentStrategy.maxLoss}</Text>
                </View>
              </View>

              <View className="bg-red-500/10 rounded-xl p-3 mb-4 border border-red-500/30">
                <Text className="text-red-400 font-bold text-sm mb-1">Risks</Text>
                <Text className="text-red-300 text-sm">{currentStrategy.risks}</Text>
              </View>

              <Text className="text-white font-bold mb-3">Protocol</Text>
              {currentStrategy.steps.map((step, idx) => (
                <View key={idx} className="bg-zinc-900 rounded-xl p-4 mb-3">
                  <Text className={`text-${currentStrategy.color}-400 font-bold mb-2`}>{step.day}</Text>
                  <View className="mb-1">
                    <Text className="text-zinc-400 text-sm">Water: <Text className="text-white">{step.water}</Text></Text>
                  </View>
                  <View className="mb-1">
                    <Text className="text-zinc-400 text-sm">Sodium: <Text className="text-white">{step.sodium}</Text></Text>
                  </View>
                  <View className="mb-1">
                    <Text className="text-zinc-400 text-sm">Carbs: <Text className="text-white">{step.carbs}</Text></Text>
                  </View>
                  <Text className="text-zinc-300 text-sm mt-2 italic">{step.notes}</Text>
                </View>
              ))}
            </View>
          )}

          <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
            <Text className="text-white font-bold text-lg mb-3">Rehydration Protocol</Text>
            <Text className="text-zinc-400 mb-4">
              Critical: Start immediately after weigh-in to maximize recovery
            </Text>
            {rehydrationProtocol.map((step, idx) => (
              <View key={idx} className="flex-row items-start mb-3 last:mb-0">
                <View className="w-6 h-6 rounded-full bg-primary items-center justify-center mr-2 mt-0.5">
                  <Text className="text-white text-xs font-bold">{idx + 1}</Text>
                </View>
                <Text className="text-zinc-300 flex-1">{step}</Text>
              </View>
            ))}
          </View>

          <View className="bg-amber-500/10 rounded-xl p-4 border border-amber-500/30 mb-6">
            <Text className="text-amber-400 font-bold mb-2">Safety First</Text>
            <Text className="text-amber-300 text-sm mb-2">
              â€¢ Never attempt water cut without prior practice
            </Text>
            <Text className="text-amber-300 text-sm mb-2">
              â€¢ Monitor urine color (dark = too dehydrated)
            </Text>
            <Text className="text-amber-300 text-sm mb-2">
              â€¢ Stop if experiencing severe cramps/dizziness
            </Text>
            <Text className="text-amber-300 text-sm mb-2">
              â€¢ Consider moving up a weight class if &gt;5kg over
            </Text>
            <Text className="text-amber-300 text-sm">
              â€¢ Prioritize performance over making weight
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

