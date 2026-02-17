import React, { useState } from 'react';
import { Text } from '@/components/ui/Text';
import { View, TouchableOpacity, ScrollView, TextInput } from 'react-native';;
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function BodyComposition() {
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [method, setMethod] = useState('navy');
  const [units, setUnits] = useState<'metric' | 'imperial'>('metric');

  // Navy Method inputs
  const [neck, setNeck] = useState('');
  const [waist, setWaist] = useState('');
  const [hip, setHip] = useState('');
  const [height, setHeight] = useState('');

  // Results
  const [bodyFat, setBodyFat] = useState<number | null>(null);

  const methods = [
    {
      id: 'navy',
      name: 'Navy Method',
      icon: 'analytics' as const,
      accuracy: 'Good (±3.5%)',
      description: 'Uses circumference measurements',
      measurements: gender === 'male' 
        ? ['Height', 'Neck', 'Waist'] 
        : ['Height', 'Neck', 'Waist', 'Hip'],
    },
    {
      id: 'calipers',
      name: 'Caliper (3-Site)',
      icon: 'fitness' as const,
      accuracy: 'Very Good (±2-3%)',
      description: 'Skinfold measurements at 3 sites',
      measurements: gender === 'male'
        ? ['Chest', 'Abdomen', 'Thigh']
        : ['Tricep', 'Suprailiac', 'Thigh'],
    },
    {
      id: 'visual',
      name: 'Visual Estimate',
      icon: 'eye' as const,
      accuracy: 'Fair (±5%)',
      description: 'Compare to reference photos',
      measurements: ['Photo comparison'],
    },
  ];

  const calculateNavyMethod = () => {
    if (!height || !neck || !waist) return;
    if (gender === 'female' && !hip) return;

    const h = parseFloat(height);
    const n = parseFloat(neck);
    const w = parseFloat(waist);
    const hp = hip ? parseFloat(hip) : 0;

    let bf: number;
    if (gender === 'male') {
      bf = 86.010 * Math.log10(w - n) - 70.041 * Math.log10(h) + 36.76;
    } else {
      bf = 163.205 * Math.log10(w + hp - n) - 97.684 * Math.log10(h) - 78.387;
    }

    setBodyFat(Math.max(0, Math.min(50, bf)));
  };

  const getBodyFatCategory = (bf: number) => {
    if (gender === 'male') {
      if (bf < 6) return { category: 'Essential Fat', color: 'red', health: 'Unhealthy Low' };
      if (bf < 14) return { category: 'Athletes', color: 'blue', health: 'Excellent' };
      if (bf < 18) return { category: 'Fitness', color: 'primary', health: 'Good' };
      if (bf < 25) return { category: 'Average', color: 'amber', health: 'Fair' };
      return { category: 'Obese', color: 'red', health: 'High Risk' };
    } else {
      if (bf < 14) return { category: 'Essential Fat', color: 'red', health: 'Unhealthy Low' };
      if (bf < 21) return { category: 'Athletes', color: 'blue', health: 'Excellent' };
      if (bf < 25) return { category: 'Fitness', color: 'primary', health: 'Good' };
      if (bf < 32) return { category: 'Average', color: 'amber', health: 'Fair' };
      return { category: 'Obese', color: 'red', health: 'High Risk' };
    }
  };

  const getLeanMass = (totalWeight: number, bf: number) => {
    return totalWeight * (1 - bf / 100);
  };

  const getFatMass = (totalWeight: number, bf: number) => {
    return totalWeight * (bf / 100);
  };

  const bodyFatRanges = {
    male: [
      { range: '2-5%', category: 'Essential Fat', description: 'Minimum for survival', health: 'Dangerous' },
      { range: '6-13%', category: 'Athletes', description: 'Bodybuilders/fitness models', health: 'Excellent' },
      { range: '14-17%', category: 'Fitness', description: 'Visible abs, athletic', health: 'Very Good' },
      { range: '18-24%', category: 'Average', description: 'Some definition', health: 'Good' },
      { range: '25%+', category: 'Obese', description: 'Health risks increase', health: 'At Risk' },
    ],
    female: [
      { range: '10-13%', category: 'Essential Fat', description: 'Minimum for survival', health: 'Dangerous' },
      { range: '14-20%', category: 'Athletes', description: 'Bodybuilders/fitness models', health: 'Excellent' },
      { range: '21-24%', category: 'Fitness', description: 'Toned and fit', health: 'Very Good' },
      { range: '25-31%', category: 'Average', description: 'Typical healthy range', health: 'Good' },
      { range: '32%+', category: 'Obese', description: 'Health risks increase', health: 'At Risk' },
    ],
  };

  const currentMethod = methods.find((m) => m.id === method)!;
  const ranges = bodyFatRanges[gender];

  return (
    <View className="flex-1 bg-zinc-950">
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1 ml-3">
            Body Composition
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          <View className="bg-gradient-to-r from-primary to-[#7D0EBE] rounded-xl p-6 mb-6">
            <Text className="text-white text-2xl font-bold mb-2">BF% Calculator</Text>
            <Text className="text-white opacity-90">
              Multiple measurement methods
            </Text>
          </View>

          <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
            <Text className="text-white font-bold text-lg mb-3">Gender</Text>
            <View className="flex-row gap-3">
              <TouchableOpacity
                onPress={() => setGender('male')}
                className={`flex-1 ${
                  gender === 'male' ? 'bg-primary' : 'bg-zinc-800'
                } rounded-xl p-3 border ${
                  gender === 'male' ? 'border-blue-400' : 'border-zinc-700'
                }`}
              >
                <Text className="text-white font-bold text-center">Male</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setGender('female')}
                className={`flex-1 ${
                  gender === 'female' ? 'bg-purple-500' : 'bg-zinc-800'
                } rounded-xl p-3 border ${
                  gender === 'female' ? 'border-purple-400' : 'border-zinc-700'
                }`}
              >
                <Text className="text-white font-bold text-center">Female</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View className="mb-6">
            <Text className="text-white font-bold text-lg mb-3 px-1">Measurement Method</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View className="flex-row gap-3">
                {methods.map((m) => (
                  <TouchableOpacity
                    key={m.id}
                    onPress={() => setMethod(m.id)}
                    className={`${
                      method === m.id ? 'bg-primary' : 'bg-zinc-800'
                    } rounded-xl p-4 border ${
                      method === m.id ? 'border-blue-400' : 'border-zinc-700'
                    } w-64`}
                  >
                    <View className="flex-row items-center mb-2">
                      <Ionicons name={m.icon} size={20} color="white" />
                      <Text className="text-white font-bold ml-2">{m.name}</Text>
                    </View>
                    <Text className="text-zinc-300 text-sm mb-2">{m.description}</Text>
                    <Text className="text-zinc-400 text-xs">Accuracy: {m.accuracy}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>

          {method === 'navy' && (
            <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
              <Text className="text-white font-bold text-lg mb-4">Measurements ({units === 'metric' ? 'cm' : 'in'})</Text>
              
              <View className="mb-4">
                <Text className="text-zinc-400 mb-2">Height</Text>
                <TextInput
                  className="bg-zinc-800 text-white rounded-xl px-4 py-3 border border-zinc-700"
                  keyboardType="numeric"
                  value={height}
                  onChangeText={setHeight}
                  placeholder={units === 'metric' ? "175" : "69"}
                  placeholderTextColor="#52525b"
                />
              </View>

              <View className="mb-4">
                <Text className="text-zinc-400 mb-2">Neck</Text>
                <TextInput
                  className="bg-zinc-800 text-white rounded-xl px-4 py-3 border border-zinc-700"
                  keyboardType="numeric"
                  value={neck}
                  onChangeText={setNeck}
                  placeholder={units === 'metric' ? "38" : "15"}
                  placeholderTextColor="#52525b"
                />
              </View>

              <View className="mb-4">
                <Text className="text-zinc-400 mb-2">Waist (at navel)</Text>
                <TextInput
                  className="bg-zinc-800 text-white rounded-xl px-4 py-3 border border-zinc-700"
                  keyboardType="numeric"
                  value={waist}
                  onChangeText={setWaist}
                  placeholder={units === 'metric' ? "85" : "33"}
                  placeholderTextColor="#52525b"
                />
              </View>

              {gender === 'female' && (
                <View className="mb-4">
                  <Text className="text-zinc-400 mb-2">Hip (widest point)</Text>
                  <TextInput
                    className="bg-zinc-800 text-white rounded-xl px-4 py-3 border border-zinc-700"
                    keyboardType="numeric"
                    value={hip}
                    onChangeText={setHip}
                    placeholder={units === 'metric' ? "95" : "37"}
                    placeholderTextColor="#52525b"
                  />
                </View>
              )}

              <TouchableOpacity
                onPress={calculateNavyMethod}
                className="bg-primary rounded-xl p-4 mt-2"
              >
                <Text className="text-white font-bold text-center text-lg">Calculate</Text>
              </TouchableOpacity>
            </View>
          )}

          {bodyFat !== null && (
            <View className="bg-gradient-to-r from-primary to-[#7D0EBE] rounded-xl p-6 mb-6">
              <Text className="text-white opacity-90 mb-2">Your Body Fat %</Text>
              <Text className="text-white text-6xl font-bold mb-3">
                {bodyFat.toFixed(1)}%
              </Text>
              <View className="bg-white/20 rounded-xl p-3">
                <Text className="text-white font-bold">
                  {getBodyFatCategory(bodyFat).category}
                </Text>
                <Text className="text-white opacity-90">
                  {getBodyFatCategory(bodyFat).health}
                </Text>
              </View>
            </View>
          )}

          <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
            <Text className="text-white font-bold text-lg mb-4">Body Fat Ranges - {gender === 'male' ? 'Male' : 'Female'}</Text>
            {ranges.map((range, idx) => (
              <View key={idx} className="bg-zinc-800 rounded-xl p-4 mb-3 last:mb-0 border border-zinc-700">
                <View className="flex-row justify-between items-center mb-2">
                  <Text className="text-white font-bold text-lg">{range.range}</Text>
                  <View className={`px-3 py-1 rounded-full ${
                    range.health === 'Excellent' || range.health === 'Very Good' ? 'bg-primary/20' :
                    range.health === 'Good' ? 'bg-primary/20' :
                    range.health === 'At Risk' || range.health === 'Dangerous' ? 'bg-red-500/20' :
                    'bg-amber-500/20'
                  }`}>
                    <Text className={`text-xs font-bold ${
                      range.health === 'Excellent' || range.health === 'Very Good' ? 'text-primary' :
                      range.health === 'Good' ? 'text-primary/80' :
                      range.health === 'At Risk' || range.health === 'Dangerous' ? 'text-red-400' :
                      'text-amber-400'
                    }`}>
                      {range.health}
                    </Text>
                  </View>
                </View>
                <Text className="text-zinc-300 font-bold mb-1">{range.category}</Text>
                <Text className="text-zinc-400 text-sm">{range.description}</Text>
              </View>
            ))}
          </View>

          <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-6">
            <Text className="text-primary/80 font-bold mb-2">Measurement Tips</Text>
            <Text className="text-primary/60 text-sm mb-2">
              • Measure in the morning before eating
            </Text>
            <Text className="text-primary/60 text-sm mb-2">
              • Keep tape parallel to ground, snug but not tight
            </Text>
            <Text className="text-primary/60 text-sm mb-2">
              • Neck: measure below Adam's apple
            </Text>
            <Text className="text-primary/60 text-sm">
              • Waist: at navel, relaxed (don't suck in)
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}


