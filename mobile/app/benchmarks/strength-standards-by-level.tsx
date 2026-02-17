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

export default function StrengthStandardsByLevel() {
  const [selectedGender, setSelectedGender] = useState('male');
  const [bodyweight, setBodyweight] = useState('');
  const [unit, setUnit] = useState('lbs');

  const standardsData = {
    male: {
      name: 'Men',
      icon: 'male',
      color: 'blue',
      levels: {
        untrained: {
          name: 'Untrained',
          description: 'No structured training, general fitness',
          color: 'zinc',
          squat: (bw: number) => bw * 0.5,
          bench: (bw: number) => bw * 0.35,
          deadlift: (bw: number) => bw * 0.65,
          total: (bw: number) => bw * 1.5,
          timeframe: 'Starting point',
        },
        novice: {
          name: 'Novice',
          description: 'Few months of consistent training',
          color: 'green',
          squat: (bw: number) => bw * 1.0,
          bench: (bw: number) => bw * 0.75,
          deadlift: (bw: number) => bw * 1.25,
          total: (bw: number) => bw * 3.0,
          timeframe: '2-6 months training',
        },
        intermediate: {
          name: 'Intermediate',
          description: 'Consistent training 1-2 years',
          color: 'blue',
          squat: (bw: number) => bw * 1.5,
          bench: (bw: number) => bw * 1.0,
          deadlift: (bw: number) => bw * 1.75,
          total: (bw: number) => bw * 4.25,
          timeframe: '1-2 years training',
        },
        advanced: {
          name: 'Advanced',
          description: 'Serious lifter, multiple years',
          color: 'purple',
          squat: (bw: number) => bw * 2.0,
          bench: (bw: number) => bw * 1.5,
          deadlift: (bw: number) => bw * 2.5,
          total: (bw: number) => bw * 6.0,
          timeframe: '3-5+ years training',
        },
        elite: {
          name: 'Elite',
          description: 'Top local/regional competitor',
          color: 'amber',
          squat: (bw: number) => bw * 2.5,
          bench: (bw: number) => bw * 2.0,
          deadlift: (bw: number) => bw * 3.0,
          total: (bw: number) => bw * 7.5,
          timeframe: '5-10+ years training',
        },
        world_class: {
          name: 'World Class',
          description: 'International/national level',
          color: 'red',
          squat: (bw: number) => bw * 3.0,
          bench: (bw: number) => bw * 2.5,
          deadlift: (bw: number) => bw * 3.5,
          total: (bw: number) => bw * 9.0,
          timeframe: '10+ years elite training',
        },
      },
      weight_classes: [
        { class: '123 lbs', typical_total: '900-1100' },
        { class: '132 lbs', typical_total: '1000-1200' },
        { class: '148 lbs', typical_total: '1100-1400' },
        { class: '165 lbs', typical_total: '1250-1550' },
        { class: '181 lbs', typical_total: '1400-1700' },
        { class: '198 lbs', typical_total: '1500-1850' },
        { class: '220 lbs', typical_total: '1650-2000' },
        { class: '242 lbs', typical_total: '1750-2100' },
        { class: '275 lbs', typical_total: '1850-2250' },
        { class: '308 lbs', typical_total: '1950-2400' },
        { class: 'SHW', typical_total: '2000-2600+' },
      ],
    },
    female: {
      name: 'Women',
      icon: 'female',
      color: 'pink',
      levels: {
        untrained: {
          name: 'Untrained',
          description: 'No structured training, general fitness',
          color: 'zinc',
          squat: (bw: number) => bw * 0.35,
          bench: (bw: number) => bw * 0.25,
          deadlift: (bw: number) => bw * 0.5,
          total: (bw: number) => bw * 1.1,
          timeframe: 'Starting point',
        },
        novice: {
          name: 'Novice',
          description: 'Few months of consistent training',
          color: 'green',
          squat: (bw: number) => bw * 0.75,
          bench: (bw: number) => bw * 0.45,
          deadlift: (bw: number) => bw * 1.0,
          total: (bw: number) => bw * 2.2,
          timeframe: '2-6 months training',
        },
        intermediate: {
          name: 'Intermediate',
          description: 'Consistent training 1-2 years',
          color: 'blue',
          squat: (bw: number) => bw * 1.25,
          bench: (bw: number) => bw * 0.75,
          deadlift: (bw: number) => bw * 1.5,
          total: (bw: number) => bw * 3.5,
          timeframe: '1-2 years training',
        },
        advanced: {
          name: 'Advanced',
          description: 'Serious lifter, multiple years',
          color: 'purple',
          squat: (bw: number) => bw * 1.75,
          bench: (bw: number) => bw * 1.0,
          deadlift: (bw: number) => bw * 2.0,
          total: (bw: number) => bw * 4.75,
          timeframe: '3-5+ years training',
        },
        elite: {
          name: 'Elite',
          description: 'Top local/regional competitor',
          color: 'amber',
          squat: (bw: number) => bw * 2.25,
          bench: (bw: number) => bw * 1.4,
          deadlift: (bw: number) => bw * 2.5,
          total: (bw: number) => bw * 6.15,
          timeframe: '5-10+ years training',
        },
        world_class: {
          name: 'World Class',
          description: 'International/national level',
          color: 'red',
          squat: (bw: number) => bw * 2.75,
          bench: (bw: number) => bw * 1.75,
          deadlift: (bw: number) => bw * 3.0,
          total: (bw: number) => bw * 7.5,
          timeframe: '10+ years elite training',
        },
      },
      weight_classes: [
        { class: '97 lbs', typical_total: '500-650' },
        { class: '105 lbs', typical_total: '550-700' },
        { class: '114 lbs', typical_total: '600-750' },
        { class: '123 lbs', typical_total: '650-850' },
        { class: '132 lbs', typical_total: '700-900' },
        { class: '148 lbs', typical_total: '800-1050' },
        { class: '165 lbs', typical_total: '900-1150' },
        { class: '181 lbs', typical_total: '950-1250' },
        { class: '198 lbs', typical_total: '1000-1350' },
        { class: 'SHW', typical_total: '1050-1500+' },
      ],
    },
  };

  const currentGender = standardsData[selectedGender as keyof typeof standardsData];
  const bw = parseFloat(bodyweight) || 0;
  const bwKg = unit === 'kg' ? bw : bw / 2.205;
  const bwLbs = unit === 'lbs' ? bw : bw * 2.205;

  const getColorClass = (color: string) => {
    const colors: { [key: string]: string } = {
      blue: 'bg-primary',
      pink: 'bg-pink-500',
      zinc: 'bg-zinc-500',
      green: 'bg-primary',
      purple: 'bg-purple-500',
      amber: 'bg-amber-500',
      red: 'bg-red-500',
    };
    return colors[color] || 'bg-zinc-500';
  };

  const formatWeight = (weight: number) => {
    if (unit === 'kg') {
      return `${Math.round(weight / 2.205)} kg`;
    }
    return `${Math.round(weight)} lbs`;
  };

  const wilksScore = {
    male: {
      a: -216.0475144,
      b: 16.2606339,
      c: -0.002388645,
      d: -0.00113732,
      e: 7.01863E-06,
      f: -1.291E-08,
    },
    female: {
      a: 594.31747775582,
      b: -27.23842536447,
      c: 0.82112226871,
      d: -0.00930733913,
      e: 4.731582E-05,
      f: -9.054E-08,
    },
  };

  const calculateWilks = (total: number, bodyweight: number, gender: 'male' | 'female') => {
    const coeff = wilksScore[gender];
    const bwKg = unit === 'kg' ? bodyweight : bodyweight / 2.205;
    const totalKg = unit === 'kg' ? total : total / 2.205;
    
    const denominator = coeff.a + 
                       coeff.b * bwKg + 
                       coeff.c * Math.pow(bwKg, 2) + 
                       coeff.d * Math.pow(bwKg, 3) + 
                       coeff.e * Math.pow(bwKg, 4) + 
                       coeff.f * Math.pow(bwKg, 5);
    
    return (500 / denominator) * totalKg;
  };

  return (
    <View className="flex-1 bg-zinc-950">
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1 ml-3">
            Strength Standards
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          <View className="bg-gradient-to-r from-primary to-[#7D0EBE] rounded-xl p-6 mb-6">
            <Text className="text-white text-2xl font-bold mb-2">Where Do You Stand?</Text>
            <Text className="text-white opacity-90">
              Performance benchmarks by experience level
            </Text>
          </View>

          <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
            <Text className="text-white font-bold text-lg mb-4">Your Stats</Text>
            
            <View className="flex-row gap-3 mb-4">
              <TouchableOpacity
                onPress={() => setSelectedGender('male')}
                className={`flex-1 ${
                  selectedGender === 'male' ? 'bg-primary' : 'bg-zinc-800'
                } rounded-xl p-4 border ${
                  selectedGender === 'male' ? 'border-blue-300' : 'border-zinc-700'
                }`}
              >
                <Ionicons name="male" size={24} color="white" />
                <Text className="text-white font-bold mt-2">Men</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setSelectedGender('female')}
                className={`flex-1 ${
                  selectedGender === 'female' ? 'bg-pink-500' : 'bg-zinc-800'
                } rounded-xl p-4 border ${
                  selectedGender === 'female' ? 'border-pink-300' : 'border-zinc-700'
                }`}
              >
                <Ionicons name="female" size={24} color="white" />
                <Text className="text-white font-bold mt-2">Women</Text>
              </TouchableOpacity>
            </View>

            <View className="mb-4">
              <Text className="text-zinc-400 mb-2">Bodyweight</Text>
              <View className="flex-row gap-3">
                <TextInput
                  value={bodyweight}
                  onChangeText={setBodyweight}
                  keyboardType="numeric"
                  placeholder="Enter bodyweight"
                  placeholderTextColor="#71717a"
                  className="flex-1 bg-zinc-800 rounded-xl px-4 py-3 text-white border border-zinc-700"
                />
                <TouchableOpacity
                  onPress={() => setUnit(unit === 'lbs' ? 'kg' : 'lbs')}
                  className="bg-primary rounded-xl px-6 py-3"
                >
                  <Text className="text-white font-bold">{unit}</Text>
                </TouchableOpacity>
              </View>
            </View>

            {bw > 0 && (
              <View className="bg-primary/10 rounded-xl p-4 border border-primary/30">
                <Text className="text-primary/80 text-sm">
                  {unit === 'lbs' ? `â‰ˆ ${bwKg.toFixed(1)} kg` : `â‰ˆ ${bwLbs.toFixed(1)} lbs`}
                </Text>
              </View>
            )}
          </View>

          {bw > 0 ? (
            <>
              <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
                <Text className="text-white font-bold text-xl mb-4">Standards by Level</Text>
                
                {Object.entries(currentGender.levels).map(([key, level]: [string, any]) => (
                  <View key={key} className="mb-6 last:mb-0">
                    <View className={`${getColorClass(level.color)} rounded-t-xl p-4`}>
                      <Text className="text-white font-bold text-lg">{level.name}</Text>
                      <Text className="text-white opacity-90 text-sm">{level.description}</Text>
                      <Text className="text-white opacity-75 text-xs mt-1">{level.timeframe}</Text>
                    </View>
                    
                    <View className="bg-zinc-800 rounded-b-xl p-4 border-x border-b border-zinc-700">
                      <View className="flex-row justify-between mb-2">
                        <Text className="text-zinc-400">Squat:</Text>
                        <Text className="text-white font-bold">
                          {formatWeight(level.squat(bwLbs))}
                        </Text>
                      </View>
                      <View className="flex-row justify-between mb-2">
                        <Text className="text-zinc-400">Bench:</Text>
                        <Text className="text-white font-bold">
                          {formatWeight(level.bench(bwLbs))}
                        </Text>
                      </View>
                      <View className="flex-row justify-between mb-2">
                        <Text className="text-zinc-400">Deadlift:</Text>
                        <Text className="text-white font-bold">
                          {formatWeight(level.deadlift(bwLbs))}
                        </Text>
                      </View>
                      <View className="h-px bg-zinc-700 my-2" />
                      <View className="flex-row justify-between">
                        <Text className="text-primary font-bold">Total:</Text>
                        <Text className="text-primary font-bold">
                          {formatWeight(level.total(bwLbs))}
                        </Text>
                      </View>
                      <Text className="text-zinc-500 text-xs mt-2">
                        Wilks: {calculateWilks(level.total(bwLbs), bw, selectedGender as 'male' | 'female').toFixed(1)}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>

              <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
                <Text className="text-white font-bold text-xl mb-4">Weight Class Totals</Text>
                <Text className="text-zinc-400 text-sm mb-4">
                  Typical competitive totals (Advanced-Elite range)
                </Text>
                
                {currentGender.weight_classes.map((wc: any, idx: number) => (
                  <View key={idx} className="flex-row justify-between items-center bg-zinc-800 rounded-xl px-4 py-3 mb-2 border border-zinc-700">
                    <Text className="text-white font-bold">{wc.class}</Text>
                    <Text className="text-primary font-mono">{wc.typical_total}</Text>
                  </View>
                ))}
              </View>
            </>
          ) : (
            <View className="bg-primary/10 rounded-xl p-6 border border-primary/30 mb-6">
              <Ionicons name="information-circle" size={32} color="#9D12DE" />
              <Text className="text-primary/80 font-bold text-lg mt-3 mb-2">
                Enter Your Bodyweight
              </Text>
              <Text className="text-primary/60 text-sm">
                Input your bodyweight above to see strength standards for your weight class
              </Text>
            </View>
          )}

          <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
            <Text className="text-amber-400 font-bold text-xl mb-4">Important Notes</Text>
            
            <View className="bg-amber-500/10 rounded-xl p-4 border border-amber-500/30 mb-3">
              <Text className="text-amber-400 font-bold mb-2">These Are Averages</Text>
              <Text className="text-amber-300 text-sm">
                Individuals vary widely. Leverages, training age, and genetics all matter. Use as rough guides, not absolutes.
              </Text>
            </View>

            <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-3">
              <Text className="text-primary/80 font-bold mb-2">Raw vs Equipped</Text>
              <Text className="text-primary/60 text-sm">
                These standards are for RAW lifting (belt, wrist wraps, sleeves). Equipped lifting has different standards.
              </Text>
            </View>

            <View className="bg-purple-500/10 rounded-xl p-4 border border-purple-500/30 mb-3">
              <Text className="text-purple-400 font-bold mb-2">Timeframes Vary</Text>
              <Text className="text-purple-300 text-sm">
                Some reach Advanced in 2 years, others take 5. Age, consistency, programming, and genetics all factor in.
              </Text>
            </View>

            <View className="bg-primary/10 rounded-xl p-4 border border-primary/30">
              <Text className="text-primary font-bold mb-2">Compare to Yourself</Text>
              <Text className="text-primary/80 text-sm">
                Most important comparison is YOU vs last year. Constant improvement matters more than hitting exact numbers.
              </Text>
            </View>
          </View>

          <View className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl p-5 border border-purple-500/30 mb-6">
            <Text className="text-purple-400 font-bold text-lg mb-3">Wilks Score Reference</Text>
            <Text className="text-purple-300 text-sm mb-2">• 250-300: Novice</Text>
            <Text className="text-purple-300 text-sm mb-2">• 300-350: Intermediate</Text>
            <Text className="text-purple-300 text-sm mb-2">• 350-400: Advanced</Text>
            <Text className="text-purple-300 text-sm mb-2">• 400-450: Competitive</Text>
            <Text className="text-purple-300 text-sm mb-2">• 450-500: Elite</Text>
            <Text className="text-purple-300 text-sm">• 500+: World Class</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}



