import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function ExerciseSubstitutions() {
  const [selectedCategory, setSelectedCategory] = useState('compound');

  const categories = ['compound', 'isolation', 'cardio', 'mobility'];

  const substitutions = {
    compound: [
      {
        original: 'Barbell Back Squat',
        icon: 'barbell' as const,
        reasons: ['Knee pain', 'No barbell', 'Mobility issues', 'Spine sensitivity'],
        alternatives: [
          { 
            name: 'Goblet Squat',
            why: 'Easier on knees, improves mobility',
            equipment: 'Dumbbell or kettlebell',
          },
          { 
            name: 'Front Squat',
            why: 'More upright position, less back stress',
            equipment: 'Barbell',
          },
          { 
            name: 'Bulgarian Split Squat',
            why: 'Unilateral, less loading on spine',
            equipment: 'Dumbbells',
          },
          { 
            name: 'Leg Press',
            why: 'Supported, easier to load safely',
            equipment: 'Machine',
          },
        ],
      },
      {
        original: 'Barbell Bench Press',
        icon: 'fitness' as const,
        reasons: ['Shoulder pain', 'No spotter', 'No barbell', 'Injury history'],
        alternatives: [
          { 
            name: 'Dumbbell Bench Press',
            why: 'More natural range, no spotter needed',
            equipment: 'Dumbbells',
          },
          { 
            name: 'Push-ups',
            why: 'Bodyweight, shoulder-friendly',
            equipment: 'None',
          },
          { 
            name: 'Machine Chest Press',
            why: 'Controlled path, very safe',
            equipment: 'Machine',
          },
          { 
            name: 'Landmine Press',
            why: 'Reduced shoulder stress, unique angle',
            equipment: 'Barbell + landmine',
          },
        ],
      },
      {
        original: 'Conventional Deadlift',
        icon: 'analytics' as const,
        reasons: ['Lower back pain', 'Poor mobility', 'Injury risk', 'Technique issues'],
        alternatives: [
          { 
            name: 'Trap Bar Deadlift',
            why: 'More upright, easier to learn',
            equipment: 'Trap bar',
          },
          { 
            name: 'Romanian Deadlift',
            why: 'Less technical, hamstring focus',
            equipment: 'Barbell or dumbbells',
          },
          { 
            name: 'Rack Pulls',
            why: 'Reduced range of motion',
            equipment: 'Barbell + rack',
          },
          { 
            name: 'Kettlebell Swings',
            why: 'Dynamic, posterior chain focus',
            equipment: 'Kettlebell',
          },
        ],
      },
      {
        original: 'Barbell Overhead Press',
        icon: 'arrow-up' as const,
        reasons: ['Shoulder impingement', 'Mobility limits', 'No barbell', 'Rotator cuff issues'],
        alternatives: [
          { 
            name: 'Dumbbell Shoulder Press',
            why: 'Natural movement path, independent arms',
            equipment: 'Dumbbells',
          },
          { 
            name: 'Landmine Press',
            why: 'Reduced shoulder stress, unique angle',
            equipment: 'Barbell + landmine',
          },
          { 
            name: 'Z-Press',
            why: 'Strict form, core engaged',
            equipment: 'Barbell or dumbbells',
          },
          { 
            name: 'Arnold Press',
            why: 'Full ROM, rotational component',
            equipment: 'Dumbbells',
          },
        ],
      },
    ],
    isolation: [
      {
        original: 'Barbell Curls',
        icon: 'body' as const,
        reasons: ['Wrist pain', 'Elbow issues', 'No barbell', 'Form breakdown'],
        alternatives: [
          { 
            name: 'Dumbbell Curls',
            why: 'Neutral or supinated grip options',
            equipment: 'Dumbbells',
          },
          { 
            name: 'Hammer Curls',
            why: 'Neutral grip, wrist-friendly',
            equipment: 'Dumbbells',
          },
          { 
            name: 'Cable Curls',
            why: 'Constant tension, adjustable angles',
            equipment: 'Cable machine',
          },
          { 
            name: 'Chin-ups',
            why: 'Compound, bodyweight',
            equipment: 'Pull-up bar',
          },
        ],
      },
      {
        original: 'Tricep Dips',
        icon: 'remove-circle' as const,
        reasons: ['Shoulder pain', 'Too difficult', 'No dip bars', 'Elbow issues'],
        alternatives: [
          { 
            name: 'Close-Grip Bench Press',
            why: 'Compound, easier to load progressively',
            equipment: 'Barbell',
          },
          { 
            name: 'Overhead Tricep Extension',
            why: 'Stretches long head, isolates triceps',
            equipment: 'Dumbbell or cable',
          },
          { 
            name: 'Tricep Pushdowns',
            why: 'Constant tension, safe',
            equipment: 'Cable machine',
          },
          { 
            name: 'Diamond Push-ups',
            why: 'Bodyweight, tricep emphasis',
            equipment: 'None',
          },
        ],
      },
    ],
    cardio: [
      {
        original: 'Running',
        icon: 'walk' as const,
        reasons: ['Knee pain', 'Shin splints', 'Weather', 'Injury recovery'],
        alternatives: [
          { 
            name: 'Cycling',
            why: 'Low impact, similar cardio benefit',
            equipment: 'Bike',
          },
          { 
            name: 'Rowing',
            why: 'Full body, low impact',
            equipment: 'Rowing machine',
          },
          { 
            name: 'Swimming',
            why: 'Zero impact, total body',
            equipment: 'Pool',
          },
          { 
            name: 'Elliptical',
            why: 'Low impact, running motion',
            equipment: 'Elliptical machine',
          },
        ],
      },
    ],
    mobility: [
      {
        original: 'Static Stretching',
        icon: 'expand' as const,
        reasons: ['Pre-workout', 'Too passive', 'Limited benefit', 'Time constraints'],
        alternatives: [
          { 
            name: 'Dynamic Stretching',
            why: 'Better for warm-up, activates muscles',
            equipment: 'None',
          },
          { 
            name: 'Foam Rolling',
            why: 'Myofascial release, blood flow',
            equipment: 'Foam roller',
          },
          { 
            name: 'Yoga Flow',
            why: 'Active flexibility, strength component',
            equipment: 'Mat',
          },
          { 
            name: 'Resistance Band Work',
            why: 'Active ROM, strengthens end ranges',
            equipment: 'Resistance bands',
          },
        ],
      },
    ],
  };

  const currentSubs = substitutions[selectedCategory as keyof typeof substitutions];

  return (
    <View className="flex-1 bg-zinc-950">
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1 ml-3">
            Exercise Substitutions
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          <View className="bg-gradient-to-r from-amber-500 to-red-500 rounded-xl p-6 mb-6">
            <Text className="text-white text-2xl font-bold mb-2">Find Alternatives</Text>
            <Text className="text-white opacity-90">
              Smart exercise substitutions
            </Text>
          </View>

          <View className="mb-6">
            <View className="flex-row flex-wrap gap-2">
              {categories.map((cat) => (
                <TouchableOpacity
                  key={cat}
                  onPress={() => setSelectedCategory(cat)}
                  className={`${
                    selectedCategory === cat ? 'bg-amber-500' : 'bg-zinc-800'
                  } rounded-xl px-4 py-2 border ${
                    selectedCategory === cat ? 'border-amber-400' : 'border-zinc-700'
                  }`}
                >
                  <Text className="text-white font-bold capitalize">{cat}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {currentSubs.map((sub, idx) => (
            <View key={idx} className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
              <View className="flex-row items-center mb-3">
                <Ionicons name={sub.icon} size={24} color="#FFEA00" />
                <Text className="text-white font-bold text-xl ml-2">{sub.original}</Text>
              </View>

              <View className="bg-zinc-800 rounded-xl p-3 mb-4">
                <Text className="text-zinc-400 text-sm mb-2">Common Reasons to Substitute:</Text>
                <View className="flex-row flex-wrap gap-2">
                  {sub.reasons.map((reason, ridx) => (
                    <View key={ridx} className="bg-red-500/20 rounded-lg px-2 py-1 border border-red-500/40">
                      <Text className="text-red-400 text-xs">{reason}</Text>
                    </View>
                  ))}
                </View>
              </View>

              <Text className="text-primary font-bold mb-3">Alternatives:</Text>
              {sub.alternatives.map((alt, aidx) => (
                <View key={aidx} className="bg-primary/10 rounded-xl p-4 mb-3 last:mb-0 border border-primary/30">
                  <Text className="text-white font-bold text-lg mb-1">{alt.name}</Text>
                  <Text className="text-zinc-300 text-sm mb-2">{alt.why}</Text>
                  <View className="flex-row items-center">
                    <Ionicons name="hardware-chip" size={14} color="#9D12DE" />
                    <Text className="text-primary text-xs ml-1">{alt.equipment}</Text>
                  </View>
                </View>
              ))}
            </View>
          ))}

          <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-6">
            <Text className="text-primary/80 font-bold mb-2">Substitution Principles</Text>
            <Text className="text-primary/60 text-sm mb-2">
              â€¢ Match movement pattern (horizontal push, vertical pull, etc.)
            </Text>
            <Text className="text-primary/60 text-sm mb-2">
              â€¢ Target same muscle groups
            </Text>
            <Text className="text-primary/60 text-sm mb-2">
              â€¢ Consider available equipment
            </Text>
            <Text className="text-primary/60 text-sm">
              â€¢ Respect pain signals - don't push through injury
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

