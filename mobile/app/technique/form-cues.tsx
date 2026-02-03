import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

type Exercise = 'squat' | 'bench' | 'deadlift' | 'ohp' | 'pullup' | 'row';

export default function FormCues() {
  const [selectedExercise, setSelectedExercise] = useState<Exercise>('squat');

  const exercises = [
    { id: 'squat' as Exercise, name: 'Squat', icon: 'barbell' as const },
    { id: 'bench' as Exercise, name: 'Bench', icon: 'fitness' as const },
    { id: 'deadlift' as Exercise, name: 'Deadlift', icon: 'barbell' as const },
    { id: 'ohp' as Exercise, name: 'OHP', icon: 'arrow-up' as const },
    { id: 'pullup' as Exercise, name: 'Pull-up', icon: 'arrow-up' as const },
    { id: 'row' as Exercise, name: 'Row', icon: 'remove' as const },
  ];

  const formCues = {
    squat: {
      name: 'Barbell Back Squat',
      setup: [
        'Bar on upper traps (high bar) or rear delts (low bar)',
        'Hands as narrow as mobility allows',
        'Chest up, core braced',
        'Feet shoulder-width, toes slightly out',
      ],
      execution: [
        'Break at hips and knees simultaneously',
        'Knees track over toes',
        'Descend until hip crease below knee',
        'Drive through midfoot',
        'Keep chest up throughout',
        'Squeeze glutes at top',
      ],
      breathing: 'Big breath at top, brace, hold through rep, exhale at top',
      commonMistakes: [
        { mistake: 'Knees caving in', fix: 'Actively push knees out', severity: 'high' },
        { mistake: 'Heels lifting', fix: 'Weight on midfoot, better mobility', severity: 'high' },
        { mistake: 'Good morning squat', fix: 'Chest up, hips and chest rise together', severity: 'high' },
        { mistake: 'Shallow depth', fix: 'Hip crease below knee, work on mobility', severity: 'medium' },
        { mistake: 'Buttwink', fix: 'Stop at your depth limit, stretch', severity: 'medium' },
      ],
    },
    bench: {
      name: 'Barbell Bench Press',
      setup: [
        'Eyes under bar',
        'Feet flat on floor',
        'Arch your upper back',
        'Shoulder blades retracted and down',
        'Grip slightly wider than shoulders',
      ],
      execution: [
        'Unrack, lock out over chest',
        'Lower to nipple line or slightly below',
        'Elbows 45-75° from torso',
        'Touch chest lightly',
        'Press in slight arc back to start',
        'Maintain leg drive throughout',
      ],
      breathing: 'Breath at top, hold descent and press, exhale at lockout',
      commonMistakes: [
        { mistake: 'Flared elbows (90°)', fix: 'Tuck to 45-75°, saves shoulders', severity: 'high' },
        { mistake: 'Bouncing off chest', fix: 'Controlled touch, maintain tension', severity: 'medium' },
        { mistake: 'Butt off bench', fix: 'Keep butt down, arch upper back only', severity: 'high' },
        { mistake: 'No leg drive', fix: 'Push through floor, stable base', severity: 'medium' },
        { mistake: 'Bar drifts forward', fix: 'Press back toward face slightly', severity: 'medium' },
      ],
    },
    deadlift: {
      name: 'Conventional Deadlift',
      setup: [
        'Feet hip-width, under bar over midfoot',
        'Grip just outside legs',
        'Shins touch bar',
        'Hips higher than knees, lower than shoulders',
        'Neutral spine, chest up',
      ],
      execution: [
        'Pull slack out of bar',
        'Drive through floor with legs',
        'Bar stays against shins/thighs',
        'Hips and shoulders rise together',
        'Lock out hips and knees',
        'Control descent, same path',
      ],
      breathing: 'Big breath at bottom, brace, hold entire rep',
      commonMistakes: [
        { mistake: 'Rounded lower back', fix: 'Brace harder, reduce weight, strengthen core', severity: 'critical' },
        { mistake: 'Bar drifts away', fix: 'Lats engaged, bar against body', severity: 'high' },
        { mistake: 'Hips shoot up first', fix: 'Engage legs, think leg press', severity: 'high' },
        { mistake: 'Hyperextending at top', fix: 'Just stand tall, neutral spine', severity: 'medium' },
        { mistake: 'Looking up', fix: 'Neutral neck, look 6ft ahead', severity: 'medium' },
      ],
    },
    ohp: {
      name: 'Overhead Press',
      setup: [
        'Bar on front delts',
        'Grip slightly wider than shoulders',
        'Forearms vertical from front view',
        'Core braced, glutes tight',
        'Feet hip-width',
      ],
      execution: [
        'Press bar straight up',
        'Tilt head back slightly to clear',
        'Press through to lockout',
        'Shrug shoulders at top',
        'Return bar to front delts',
        'Stay tight throughout',
      ],
      breathing: 'Breath at bottom, hold press, exhale at top',
      commonMistakes: [
        { mistake: 'Leaning back excessively', fix: 'Brace core harder, squeeze glutes', severity: 'high' },
        { mistake: 'Bar too far forward', fix: 'Press straight up, get head through', severity: 'high' },
        { mistake: 'Elbows flared', fix: 'Forearms vertical, stack joints', severity: 'medium' },
        { mistake: 'Pressing from chest', fix: 'Bar starts on front delts', severity: 'medium' },
        { mistake: 'No lockout', fix: 'Full extension, shrug at top', severity: 'low' },
      ],
    },
    pullup: {
      name: 'Pull-up',
      setup: [
        'Hands slightly wider than shoulders',
        'Full hang with straight arms',
        'Engage lats before pulling',
        'Slight hollow body position',
      ],
      execution: [
        'Pull elbows down and back',
        'Lead with chest',
        'Chin over bar',
        'Control descent',
        'Full extension at bottom',
        'No swinging/kipping',
      ],
      breathing: 'Breath at bottom, hold pull, exhale at top',
      commonMistakes: [
        { mistake: 'Half reps', fix: 'Full extension, full range', severity: 'high' },
        { mistake: 'Pulling with arms only', fix: 'Think elbows down, engage lats', severity: 'high' },
        { mistake: 'Kipping/swinging', fix: 'Strict control, scale with bands if needed', severity: 'medium' },
        { mistake: 'Neck craning', fix: 'Look forward, not up', severity: 'medium' },
        { mistake: 'Shoulders shrugged', fix: 'Depress shoulders, pack lats', severity: 'medium' },
      ],
    },
    row: {
      name: 'Barbell Row',
      setup: [
        'Hip hinge to ~45° torso angle',
        'Grip shoulder-width or slightly wider',
        'Neutral spine, slight knee bend',
        'Bar hangs at arms length',
      ],
      execution: [
        'Pull bar to lower chest/upper abs',
        'Elbows stay close to body',
        'Squeeze shoulder blades together',
        'Control descent',
        'Maintain torso angle',
        'No momentum/body english',
      ],
      breathing: 'Breath and brace, hold row, exhale at bottom',
      commonMistakes: [
        { mistake: 'Rounded back', fix: 'Brace core, maintain neutral spine', severity: 'critical' },
        { mistake: 'Too much body movement', fix: 'Stable torso, row the weight', severity: 'high' },
        { mistake: 'Rowing to chest', fix: 'Pull to lower chest/upper abs', severity: 'medium' },
        { mistake: 'Elbows flared', fix: 'Elbows close, hit lats not rear delts', severity: 'medium' },
        { mistake: 'Not full ROM', fix: 'Full arm extension, full contraction', severity: 'medium' },
      ],
    },
  };

  const currentExercise = formCues[selectedExercise];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'red';
      case 'high': return 'orange';
      case 'medium': return 'amber';
      case 'low': return 'blue';
      default: return 'zinc';
    }
  };

  return (
    <View className="flex-1 bg-zinc-950">
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1 ml-3">
            Form Cues
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          <View className="bg-gradient-to-r from-blue-500 to-emerald-500 rounded-xl p-6 mb-6">
            <Text className="text-white text-2xl font-bold mb-2">Perfect Technique</Text>
            <Text className="text-white opacity-90">
              Master the fundamentals
            </Text>
          </View>

          <View className="mb-6">
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View className="flex-row gap-3">
                {exercises.map((ex) => (
                  <TouchableOpacity
                    key={ex.id}
                    onPress={() => setSelectedExercise(ex.id)}
                    className={`${
                      selectedExercise === ex.id ? 'bg-blue-500' : 'bg-zinc-800'
                    } rounded-xl px-4 py-3 border ${
                      selectedExercise === ex.id ? 'border-blue-400' : 'border-zinc-700'
                    }`}
                  >
                    <View className="flex-row items-center">
                      <Ionicons name={ex.icon} size={20} color="white" />
                      <Text className="text-white font-bold ml-2">{ex.name}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>

          <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
            <Text className="text-white font-bold text-2xl mb-2">{currentExercise.name}</Text>
          </View>

          <View className="bg-blue-500/10 rounded-xl p-5 mb-6 border border-blue-500/30">
            <View className="flex-row items-center mb-3">
              <Ionicons name="settings" size={24} color="#3b82f6" />
              <Text className="text-blue-400 font-bold text-lg ml-2">Setup</Text>
            </View>
            {currentExercise.setup.map((cue, idx) => (
              <View key={idx} className="flex-row items-start mb-2 last:mb-0">
                <View className="w-6 h-6 rounded-full bg-blue-500/20 items-center justify-center mt-0.5 border border-blue-500/40">
                  <Text className="text-blue-400 font-bold text-xs">{idx + 1}</Text>
                </View>
                <Text className="text-blue-300 ml-2 flex-1">{cue}</Text>
              </View>
            ))}
          </View>

          <View className="bg-emerald-500/10 rounded-xl p-5 mb-6 border border-emerald-500/30">
            <View className="flex-row items-center mb-3">
              <Ionicons name="play-circle" size={24} color="#10b981" />
              <Text className="text-emerald-400 font-bold text-lg ml-2">Execution</Text>
            </View>
            {currentExercise.execution.map((cue, idx) => (
              <View key={idx} className="flex-row items-start mb-2 last:mb-0">
                <View className="w-6 h-6 rounded-full bg-emerald-500/20 items-center justify-center mt-0.5 border border-emerald-500/40">
                  <Text className="text-emerald-400 font-bold text-xs">{idx + 1}</Text>
                </View>
                <Text className="text-emerald-300 ml-2 flex-1">{cue}</Text>
              </View>
            ))}
          </View>

          <View className="bg-purple-500/10 rounded-xl p-4 mb-6 border border-purple-500/30">
            <View className="flex-row items-center mb-2">
              <Ionicons name="fitness" size={20} color="#a855f7" />
              <Text className="text-purple-400 font-bold ml-2">Breathing Pattern</Text>
            </View>
            <Text className="text-purple-300">{currentExercise.breathing}</Text>
          </View>

          <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
            <View className="flex-row items-center mb-4">
              <Ionicons name="warning" size={24} color="#ef4444" />
              <Text className="text-white font-bold text-lg ml-2">Common Mistakes</Text>
            </View>
            {currentExercise.commonMistakes.map((item, idx) => {
              const color = getSeverityColor(item.severity);
              return (
                <View
                  key={idx}
                  className="bg-zinc-800 rounded-xl p-4 mb-3 last:mb-0 border border-zinc-700"
                >
                  <View className="flex-row items-start justify-between mb-2">
                    <Text className="text-white font-bold flex-1">{item.mistake}</Text>
                    <View className={`bg-${color}-500/20 rounded-full px-2 py-1 border border-${color}-500/40 ml-2`}>
                      <Text className={`text-${color}-400 text-xs font-bold capitalize`}>
                        {item.severity}
                      </Text>
                    </View>
                  </View>
                  <View className="flex-row items-start">
                    <Ionicons name="checkmark-circle" size={16} color="#10b981" />
                    <Text className="text-emerald-400 ml-2 flex-1 text-sm">{item.fix}</Text>
                  </View>
                </View>
              );
            })}
          </View>

          <View className="bg-amber-500/10 rounded-xl p-4 border border-amber-500/30 mb-6">
            <Text className="text-amber-400 font-bold mb-2">Pro Tips</Text>
            <Text className="text-amber-300 text-sm">
              • Film your sets from multiple angles{'\n'}
              • Master form before adding weight{'\n'}
              • Quality reps &gt; ego lifting{'\n'}
              • Hire a coach if struggling{'\n'}
              • Consistent cues build motor patterns
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
