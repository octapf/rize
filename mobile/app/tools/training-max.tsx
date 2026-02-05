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

export default function TrainingMaxCalculator() {
  const [weight, setWeight] = useState('100');
  const [reps, setReps] = useState('5');
  const [selectedFormula, setSelectedFormula] = useState<'epley' | 'brzycki' | 'wendler'>('epley');

  const formulas = [
    { key: 'epley', label: 'Epley', desc: 'Most popular' },
    { key: 'brzycki', label: 'Brzycki', desc: 'Conservative' },
    { key: 'wendler', label: 'Wendler 5/3/1', desc: 'For programming' },
  ];

  const calculateOneRM = () => {
    const w = parseFloat(weight);
    const r = parseInt(reps);
    
    if (isNaN(w) || isNaN(r) || r < 1) return 0;
    if (r === 1) return w;

    switch (selectedFormula) {
      case 'epley':
        return w * (1 + r / 30);
      case 'brzycki':
        return w * (36 / (37 - r));
      case 'wendler':
        return w * 1.03 * r; // Simplified Wendler
      default:
        return w * (1 + r / 30);
    }
  };

  const oneRM = calculateOneRM();
  const trainingMax = oneRM * 0.9; // Wendler recommends 90% of 1RM

  const percentages = [
    { percent: 95, label: '95% (Heavy Singles)', color: 'red' },
    { percent: 90, label: '90% (Training Max)', color: 'orange' },
    { percent: 85, label: '85% (Heavy Sets)', color: 'amber' },
    { percent: 80, label: '80% (Strength Work)', color: 'emerald' },
    { percent: 75, label: '75% (Volume Work)', color: 'blue' },
    { percent: 70, label: '70% (Speed Work)', color: 'purple' },
    { percent: 65, label: '65% (Technique)', color: 'zinc' },
  ];

  const exercises = [
    { name: 'Squat', icon: 'fitness', color: 'blue' },
    { name: 'Bench', icon: 'barbell', color: 'red' },
    { name: 'Deadlift', icon: 'barbell', color: 'emerald' },
    { name: 'OHP', icon: 'fitness', color: 'amber' },
  ];

  return (
    <View className="flex-1 bg-zinc-950">
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1 ml-3">
            Training Max
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          <View className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl p-6 mb-6">
            <Text className="text-white text-2xl font-bold mb-2">1RM Calculator</Text>
            <Text className="text-white opacity-90 mb-4">
              Calculate your one-rep max
            </Text>
            <View className="flex-row items-center">
              <Ionicons name="calculator" size={20} color="white" />
              <Text className="text-white ml-2">Program your training</Text>
            </View>
          </View>

          <Text className="text-white font-bold mb-3">Formula</Text>
          <View className="flex-row gap-3 mb-6">
            {formulas.map((formula) => (
              <TouchableOpacity
                key={formula.key}
                onPress={() => setSelectedFormula(formula.key as any)}
                className={`flex-1 ${
                  selectedFormula === formula.key ? 'bg-primary' : 'bg-zinc-900'
                } rounded-xl p-3 border ${
                  selectedFormula === formula.key ? 'border-blue-400' : 'border-zinc-800'
                }`}
              >
                <Text
                  className={`${
                    selectedFormula === formula.key ? 'text-white' : 'text-zinc-400'
                  } font-bold text-center mb-1`}
                >
                  {formula.label}
                </Text>
                <Text
                  className={`${
                    selectedFormula === formula.key ? 'text-highlight' : 'text-zinc-500'
                  } text-xs text-center`}
                >
                  {formula.desc}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View className="flex-row gap-3 mb-6">
            <View className="flex-1 bg-zinc-900 rounded-xl p-4 border border-zinc-800">
              <Text className="text-zinc-400 mb-2">Weight</Text>
              <TextInput
                value={weight}
                onChangeText={setWeight}
                keyboardType="numeric"
                className="text-white text-3xl font-bold"
                placeholder="100"
                placeholderTextColor="#71717a"
              />
              <Text className="text-zinc-500">kg</Text>
            </View>

            <View className="flex-1 bg-zinc-900 rounded-xl p-4 border border-zinc-800">
              <Text className="text-zinc-400 mb-2">Reps</Text>
              <TextInput
                value={reps}
                onChangeText={setReps}
                keyboardType="numeric"
                className="text-white text-3xl font-bold"
                placeholder="5"
                placeholderTextColor="#71717a"
              />
              <Text className="text-zinc-500">reps</Text>
            </View>
          </View>

          <View className="bg-gradient-to-r from-red-500 to-orange-500 rounded-xl p-6 mb-4">
            <Text className="text-white text-center text-sm mb-2 opacity-80">Estimated 1RM</Text>
            <Text className="text-white text-center text-5xl font-bold mb-2">
              {oneRM.toFixed(1)}
            </Text>
            <Text className="text-white text-center text-xl opacity-90">kg</Text>
          </View>

          <View className="bg-primary/10 rounded-xl p-4 mb-6 border border-primary/30">
            <View className="flex-row items-center justify-between">
              <View>
                <Text className="text-primary/80 text-sm mb-1">Training Max (90%)</Text>
                <Text className="text-primary/60 text-xs">For Wendler 5/3/1</Text>
              </View>
              <Text className="text-primary/80 text-3xl font-bold">
                {trainingMax.toFixed(1)}kg
              </Text>
            </View>
          </View>

          <Text className="text-white font-bold text-lg mb-4">Training Percentages</Text>

          {percentages.map((item) => (
            <View
              key={item.percent}
              className={`bg-${item.color}-500/10 rounded-xl p-4 mb-3 border border-${item.color}-500/30`}
            >
              <View className="flex-row items-center justify-between mb-2">
                <Text className="text-white font-bold">{item.label}</Text>
                <Text className={`text-${item.color}-400 text-2xl font-bold`}>
                  {(oneRM * (item.percent / 100)).toFixed(1)}kg
                </Text>
              </View>
              <View className="bg-zinc-800 rounded-full h-2">
                <View
                  className={`h-2 rounded-full bg-${item.color}-500`}
                  style={{ width: `${item.percent}%` }}
                />
              </View>
            </View>
          ))}

          <Text className="text-white font-bold text-lg mb-4 mt-6">Main Lifts</Text>

          {exercises.map((exercise) => (
            <TouchableOpacity
              key={exercise.name}
              className={`bg-${exercise.color}-500/10 rounded-xl p-4 mb-3 border border-${exercise.color}-500/30 flex-row items-center justify-between`}
            >
              <View className="flex-row items-center">
                <View className={`w-12 h-12 bg-${exercise.color}-500 rounded-xl items-center justify-center mr-4`}>
                  <Ionicons name={exercise.icon as any} size={24} color="white" />
                </View>
                <Text className="text-white font-bold text-lg">{exercise.name}</Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color="#71717a" />
            </TouchableOpacity>
          ))}

          <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-6">
            <Text className="text-primary/80 font-bold mb-2">1RM Tips</Text>
            <Text className="text-primary/60 text-sm">
              • Best accuracy con 3-5 reps{'\n'}
              • No uses failure sets (deload primero){'\n'}
              • Test 1RM cada 8-12 semanas{'\n'}
              • Training Max = 90% de 1RM real{'\n'}
              • Recalcula con cada PR
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

