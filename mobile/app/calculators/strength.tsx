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

export default function StrengthCalculators() {
  const [weight, setWeight] = useState('100');
  const [reps, setReps] = useState('5');
  const [bodyweight, setBodyweight] = useState('80');

  const calculate1RM = (w: number, r: number) => {
    // Epley formula
    const epley = w * (1 + r / 30);
    // Brzycki formula
    const brzycki = w * (36 / (37 - r));
    // Wathan formula
    const wathan = (100 * w) / (48.8 + 53.8 * Math.exp(-0.075 * r));
    
    return {
      epley: Math.round(epley * 10) / 10,
      brzycki: Math.round(brzycki * 10) / 10,
      wathan: Math.round(wathan * 10) / 10,
      average: Math.round(((epley + brzycki + wathan) / 3) * 10) / 10,
    };
  };

  const oneRM = weight && reps ? calculate1RM(parseFloat(weight), parseFloat(reps)) : null;

  const getPercentages = (max: number) => {
    return [
      { percent: 50, weight: Math.round(max * 0.5 * 2) / 2, reps: '15-20', use: 'Warm-up' },
      { percent: 60, weight: Math.round(max * 0.6 * 2) / 2, reps: '12-15', use: 'Light work' },
      { percent: 70, weight: Math.round(max * 0.7 * 2) / 2, reps: '8-12', use: 'Hypertrophy' },
      { percent: 75, weight: Math.round(max * 0.75 * 2) / 2, reps: '6-10', use: 'Volume work' },
      { percent: 80, weight: Math.round(max * 0.8 * 2) / 2, reps: '5-8', use: 'Strength' },
      { percent: 85, weight: Math.round(max * 0.85 * 2) / 2, reps: '3-6', use: 'Heavy strength' },
      { percent: 90, weight: Math.round(max * 0.9 * 2) / 2, reps: '2-4', use: 'Peak/opener' },
      { percent: 95, weight: Math.round(max * 0.95 * 2) / 2, reps: '1-2', use: 'Heavy single' },
      { percent: 100, weight: Math.round(max * 2) / 2, reps: '1', use: '1RM' },
    ];
  };

  const getStrengthStandards = (bw: number, gender: 'male' | 'female' = 'male') => {
    // Simplified strength standards (kg) for male at given bodyweight
    const squat = {
      beginner: Math.round(bw * 0.75),
      novice: Math.round(bw * 1.0),
      intermediate: Math.round(bw * 1.5),
      advanced: Math.round(bw * 2.0),
      elite: Math.round(bw * 2.5),
    };
    const bench = {
      beginner: Math.round(bw * 0.5),
      novice: Math.round(bw * 0.75),
      intermediate: Math.round(bw * 1.0),
      advanced: Math.round(bw * 1.5),
      elite: Math.round(bw * 1.75),
    };
    const deadlift = {
      beginner: Math.round(bw * 1.0),
      novice: Math.round(bw * 1.25),
      intermediate: Math.round(bw * 1.75),
      advanced: Math.round(bw * 2.25),
      elite: Math.round(bw * 2.75),
    };

    return { squat, bench, deadlift };
  };

  const standards = bodyweight ? getStrengthStandards(parseFloat(bodyweight)) : null;

  const wilksCoefficient = (bw: number, total: number, gender: 'male' | 'female' = 'male') => {
    // Simplified Wilks formula (male)
    const a = -216.0475144;
    const b = 16.2606339;
    const c = -0.002388645;
    const d = -0.00113732;
    const e = 7.01863E-06;
    const f = -1.291E-08;
    
    const denom = a + b * bw + c * Math.pow(bw, 2) + d * Math.pow(bw, 3) + e * Math.pow(bw, 4) + f * Math.pow(bw, 5);
    const coefficient = 500 / denom;
    
    return Math.round(total * coefficient * 10) / 10;
  };

  return (
    <View className="flex-1 bg-zinc-950">
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1 ml-3">
            Strength Calculators
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          <View className="bg-gradient-to-r from-red-500 to-purple-500 rounded-xl p-6 mb-6">
            <Text className="text-white text-2xl font-bold mb-2">Calculate Strength</Text>
            <Text className="text-white opacity-90">
              1RM, percentages, and standards
            </Text>
          </View>

          <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
            <Text className="text-white font-bold text-lg mb-4">1RM Calculator</Text>
            
            <View className="mb-4">
              <Text className="text-zinc-400 mb-2">Weight Lifted (kg)</Text>
              <TextInput
                className="bg-zinc-800 text-white text-xl font-bold rounded-xl px-4 py-3 border border-zinc-700"
                keyboardType="numeric"
                value={weight}
                onChangeText={setWeight}
                placeholder="100"
                placeholderTextColor="#52525b"
              />
            </View>

            <View className="mb-4">
              <Text className="text-zinc-400 mb-2">Reps Completed</Text>
              <TextInput
                className="bg-zinc-800 text-white text-xl font-bold rounded-xl px-4 py-3 border border-zinc-700"
                keyboardType="numeric"
                value={reps}
                onChangeText={setReps}
                placeholder="5"
                placeholderTextColor="#52525b"
              />
            </View>

            {oneRM && (
              <View className="bg-red-500/10 rounded-xl p-4 border border-red-500/30">
                <Text className="text-red-400 font-bold mb-3 text-center">Estimated 1RM</Text>
                <View className="items-center mb-4">
                  <Text className="text-white text-4xl font-bold">{oneRM.average} kg</Text>
                  <Text className="text-zinc-400 text-sm mt-1">Average of 3 formulas</Text>
                </View>
                <View className="bg-zinc-900 rounded-xl p-3">
                  <View className="flex-row justify-between mb-1">
                    <Text className="text-zinc-400 text-sm">Epley:</Text>
                    <Text className="text-white font-bold">{oneRM.epley} kg</Text>
                  </View>
                  <View className="flex-row justify-between mb-1">
                    <Text className="text-zinc-400 text-sm">Brzycki:</Text>
                    <Text className="text-white font-bold">{oneRM.brzycki} kg</Text>
                  </View>
                  <View className="flex-row justify-between">
                    <Text className="text-zinc-400 text-sm">Wathan:</Text>
                    <Text className="text-white font-bold">{oneRM.wathan} kg</Text>
                  </View>
                </View>
              </View>
            )}
          </View>

          {oneRM && (
            <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
              <Text className="text-white font-bold text-lg mb-4">Training Percentages</Text>
              <Text className="text-zinc-400 text-sm mb-4">
                Based on {oneRM.average}kg 1RM
              </Text>
              {getPercentages(oneRM.average).map((p, idx) => (
                <View key={idx} className="bg-zinc-800 rounded-xl p-4 mb-2 last:mb-0">
                  <View className="flex-row justify-between items-center mb-2">
                    <Text className="text-purple-400 font-bold text-lg">{p.percent}%</Text>
                    <Text className="text-white text-2xl font-bold">{p.weight} kg</Text>
                  </View>
                  <View className="flex-row justify-between">
                    <Text className="text-zinc-400 text-sm">Reps: {p.reps}</Text>
                    <Text className="text-primary text-sm">{p.use}</Text>
                  </View>
                </View>
              ))}
            </View>
          )}

          <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
            <Text className="text-white font-bold text-lg mb-4">Strength Standards</Text>
            
            <View className="mb-4">
              <Text className="text-zinc-400 mb-2">Your Bodyweight (kg)</Text>
              <TextInput
                className="bg-zinc-800 text-white text-xl font-bold rounded-xl px-4 py-3 border border-zinc-700"
                keyboardType="numeric"
                value={bodyweight}
                onChangeText={setBodyweight}
                placeholder="80"
                placeholderTextColor="#52525b"
              />
            </View>

            {standards && (
              <View>
                <View className="mb-4">
                  <Text className="text-primary/80 font-bold mb-3">Squat Standards (kg)</Text>
                  <View className="bg-zinc-800 rounded-xl p-3">
                    {Object.entries(standards.squat).map(([level, weight]) => (
                      <View key={level} className="flex-row justify-between mb-2 last:mb-0">
                        <Text className="text-zinc-400 capitalize">{level}:</Text>
                        <Text className="text-white font-bold">{weight} kg</Text>
                      </View>
                    ))}
                  </View>
                </View>

                <View className="mb-4">
                  <Text className="text-red-400 font-bold mb-3">Bench Press Standards (kg)</Text>
                  <View className="bg-zinc-800 rounded-xl p-3">
                    {Object.entries(standards.bench).map(([level, weight]) => (
                      <View key={level} className="flex-row justify-between mb-2 last:mb-0">
                        <Text className="text-zinc-400 capitalize">{level}:</Text>
                        <Text className="text-white font-bold">{weight} kg</Text>
                      </View>
                    ))}
                  </View>
                </View>

                <View>
                  <Text className="text-purple-400 font-bold mb-3">Deadlift Standards (kg)</Text>
                  <View className="bg-zinc-800 rounded-xl p-3">
                    {Object.entries(standards.deadlift).map(([level, weight]) => (
                      <View key={level} className="flex-row justify-between mb-2 last:mb-0">
                        <Text className="text-zinc-400 capitalize">{level}:</Text>
                        <Text className="text-white font-bold">{weight} kg</Text>
                      </View>
                    ))}
                  </View>
                </View>
              </View>
            )}
          </View>

          <View className="bg-amber-500/10 rounded-xl p-4 border border-amber-500/30 mb-6">
            <Text className="text-amber-400 font-bold mb-2">Important Notes</Text>
            <Text className="text-amber-300 text-sm mb-2">
              • 1RM calculators are estimates, not exact measurements
            </Text>
            <Text className="text-amber-300 text-sm mb-2">
              • Most accurate for 3-8 rep range
            </Text>
            <Text className="text-amber-300 text-sm mb-2">
              • Standards vary by federation, gender, and age
            </Text>
            <Text className="text-amber-300 text-sm">
              • Use as general guidelines, not absolute truth
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

