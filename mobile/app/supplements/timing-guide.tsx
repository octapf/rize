import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function SupplementTiming() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { key: 'all', label: 'All' },
    { key: 'preworkout', label: 'Pre-Workout' },
    { key: 'intra', label: 'Intra-Workout' },
    { key: 'post', label: 'Post-Workout' },
    { key: 'daily', label: 'Daily' },
  ];

  const supplements = [
    {
      name: 'Caffeine',
      category: 'preworkout',
      timing: '30-45 min pre-workout',
      dose: '200-400mg',
      benefits: 'Energy, focus, performance',
      halfLife: '5-6 hours',
      notes: 'Avoid after 2pm for sleep',
      icon: 'flash',
      color: 'amber',
    },
    {
      name: 'Beta-Alanine',
      category: 'preworkout',
      timing: '30 min pre-workout',
      dose: '3-6g',
      benefits: 'Muscular endurance',
      halfLife: 'Daily saturation needed',
      notes: 'May cause tingling sensation',
      icon: 'fitness',
      color: 'blue',
    },
    {
      name: 'Citrulline Malate',
      category: 'preworkout',
      timing: '30-45 min pre-workout',
      dose: '6-8g',
      benefits: 'Pumps, blood flow',
      halfLife: 'Acute effect',
      notes: 'Empty stomach for best absorption',
      icon: 'water',
      color: 'primary',
    },
    {
      name: 'Creatine',
      category: 'daily',
      timing: 'Anytime (post-workout optimal)',
      dose: '5g',
      benefits: 'Strength, power, muscle',
      halfLife: 'Daily saturation',
      notes: 'Take with carbs for absorption',
      icon: 'barbell',
      color: 'purple',
    },
    {
      name: 'Whey Protein',
      category: 'post',
      timing: 'Within 2h post-workout',
      dose: '20-40g',
      benefits: 'Muscle protein synthesis',
      halfLife: 'Fast absorption ~1h',
      notes: 'Not critical to rush post-workout',
      icon: 'nutrition',
      color: 'blue',
    },
    {
      name: 'EAAs/BCAAs',
      category: 'intra',
      timing: 'During workout',
      dose: '10-15g EAAs or 5-10g BCAAs',
      benefits: 'Prevent muscle breakdown',
      halfLife: 'Acute during session',
      notes: 'Useful for fasted training',
      icon: 'water',
      color: 'primary',
    },
    {
      name: 'Carbs (Intra)',
      category: 'intra',
      timing: 'During workout (60+ min)',
      dose: '30-60g/hour',
      benefits: 'Sustained energy',
      halfLife: 'Immediate fuel',
      notes: 'For sessions > 60 minutes',
      icon: 'flame',
      color: 'amber',
    },
    {
      name: 'Vitamin D',
      category: 'daily',
      timing: 'Morning with fat',
      dose: '2000-4000 IU',
      benefits: 'Bone health, testosterone',
      halfLife: 'Daily maintenance',
      notes: 'Fat-soluble, take with meals',
      icon: 'sunny',
      color: 'amber',
    },
    {
      name: 'Omega-3 (Fish Oil)',
      category: 'daily',
      timing: 'With meals',
      dose: '2-3g EPA+DHA',
      benefits: 'Recovery, inflammation',
      halfLife: 'Daily accumulation',
      notes: 'Split dose 2x per day',
      icon: 'heart',
      color: 'red',
    },
    {
      name: 'Magnesium',
      category: 'daily',
      timing: 'Evening',
      dose: '200-400mg',
      benefits: 'Recovery, sleep',
      halfLife: 'Daily',
      notes: 'Helps with sleep quality',
      icon: 'moon',
      color: 'purple',
    },
  ];

  const filteredSupplements = selectedCategory === 'all'
    ? supplements
    : supplements.filter(s => s.category === selectedCategory);

  const dailySchedule = [
    {
      time: '6:00 AM - Morning',
      items: [
        { name: 'Vitamin D', dose: '4000 IU', note: 'With breakfast' },
        { name: 'Fish Oil', dose: '1.5g', note: 'With fats' },
      ],
    },
    {
      time: '9:00 AM - Pre-Workout',
      items: [
        { name: 'Caffeine', dose: '300mg', note: '45 min before' },
        { name: 'Beta-Alanine', dose: '5g', note: '30 min before' },
        { name: 'Citrulline', dose: '8g', note: '30 min before' },
      ],
    },
    {
      time: '10:00 AM - Workout',
      items: [
        { name: 'EAAs', dose: '10g', note: 'Sip during session' },
        { name: 'Carbs (if needed)', dose: '40g', note: 'For long sessions' },
      ],
    },
    {
      time: '11:30 AM - Post-Workout',
      items: [
        { name: 'Whey Protein', dose: '30g', note: 'With meal' },
        { name: 'Creatine', dose: '5g', note: 'With carbs' },
      ],
    },
    {
      time: '6:00 PM - Dinner',
      items: [
        { name: 'Fish Oil', dose: '1.5g', note: 'Second dose' },
      ],
    },
    {
      time: '10:00 PM - Before Bed',
      items: [
        { name: 'Magnesium', dose: '400mg', note: 'For sleep' },
      ],
    },
  ];

  return (
    <View className="flex-1 bg-zinc-950">
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1 ml-3">
            Supplement Timing
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          <View className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-6 mb-6">
            <Text className="text-white text-2xl font-bold mb-2">Optimal Timing</Text>
            <Text className="text-white opacity-90 mb-4">
              When to take your supplements
            </Text>
            <View className="flex-row items-center">
              <Ionicons name="time" size={20} color="white" />
              <Text className="text-white ml-2">Maximize effectiveness</Text>
            </View>
          </View>

          <Text className="text-white font-bold mb-3">Category</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6">
            <View className="flex-row gap-2">
              {categories.map((cat) => (
                <TouchableOpacity
                  key={cat.key}
                  onPress={() => setSelectedCategory(cat.key)}
                  className={`${
                    selectedCategory === cat.key ? 'bg-primary' : 'bg-zinc-900'
                  } rounded-xl px-4 py-3 border ${
                    selectedCategory === cat.key ? 'border-blue-400' : 'border-zinc-800'
                  }`}
                >
                  <Text
                    className={`${
                      selectedCategory === cat.key ? 'text-white' : 'text-zinc-400'
                    } font-bold`}
                  >
                    {cat.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          {filteredSupplements.map((supp, idx) => (
            <View key={idx} className={`bg-${supp.color}-500/10 rounded-xl p-4 mb-3 border border-${supp.color}-500/30`}>
              <View className="flex-row items-center mb-3">
                <Ionicons
                  name={supp.icon as any}
                  size={24}
                  color={
                    supp.color === 'amber' ? '#FFEA00' :
                    supp.color === 'blue' ? '#9D12DE' :
                    supp.color === 'primary' ? '#9D12DE' :
                    supp.color === 'purple' ? '#a855f7' : '#ef4444'
                  }
                />
                <Text className="text-white font-bold text-lg ml-3">{supp.name}</Text>
              </View>

              <View className="space-y-2">
                <View className="flex-row justify-between">
                  <Text className="text-zinc-400">Timing:</Text>
                  <Text className="text-white font-bold flex-1 text-right ml-2">{supp.timing}</Text>
                </View>
                <View className="flex-row justify-between">
                  <Text className="text-zinc-400">Dose:</Text>
                  <Text className="text-white font-bold">{supp.dose}</Text>
                </View>
                <View className="flex-row justify-between">
                  <Text className="text-zinc-400">Benefits:</Text>
                  <Text className="text-white font-bold flex-1 text-right ml-2">{supp.benefits}</Text>
                </View>
                <View className={`bg-${supp.color}-500/20 rounded-lg p-2 mt-2`}>
                  <Text className={`text-${supp.color}-300 text-sm`}>ðŸ’¡ {supp.notes}</Text>
                </View>
              </View>
            </View>
          ))}

          <Text className="text-white font-bold text-lg mb-4 mt-6">Daily Schedule Example</Text>

          {dailySchedule.map((schedule, idx) => (
            <View key={idx} className="bg-zinc-900 rounded-xl p-4 mb-3 border border-zinc-800">
              <View className="flex-row items-center mb-3">
                <Ionicons name="time" size={20} color="#9D12DE" />
                <Text className="text-primary/80 font-bold ml-2">{schedule.time}</Text>
              </View>

              {schedule.items.map((item, itemIdx) => (
                <View key={itemIdx} className="bg-zinc-800 rounded-lg p-3 mb-2">
                  <View className="flex-row justify-between items-center mb-1">
                    <Text className="text-white font-bold">{item.name}</Text>
                    <Text className="text-primary font-bold">{item.dose}</Text>
                  </View>
                  <Text className="text-zinc-400 text-sm">{item.note}</Text>
                </View>
              ))}
            </View>
          ))}

          <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-6">
            <Text className="text-primary/80 font-bold mb-2">Timing Tips</Text>
            <Text className="text-primary/60 text-sm">
              • Consistency &gt; perfect timing{'\n'}
              • Creatine = anytime (daily saturation){'\n'}
              • Caffeine = avoid late afternoon{'\n'}
              • Fat-soluble vitamins with meals{'\n'}
              • Pre-workout 30-45 min before{'\n'}
              • Post-workout window = 2-4 hours (not 30 min)
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

