import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

type Exercise = 'squat' | 'bench' | 'deadlift' | 'ohp';

export default function CommonMistakes() {
  const [selectedExercise, setSelectedExercise] = useState<Exercise>('squat');

  const exercises = [
    { id: 'squat' as Exercise, name: 'Squat', icon: 'barbell' as const },
    { id: 'bench' as Exercise, name: 'Bench', icon: 'fitness' as const },
    { id: 'deadlift' as Exercise, name: 'Deadlift', icon: 'barbell' as const },
    { id: 'ohp' as Exercise, name: 'OHP', icon: 'arrow-up' as const },
  ];

  const mistakes = {
    squat: [
      {
        mistake: 'Knees Caving (Valgus)',
        why: 'Weak glutes, adductors overpowering, poor motor pattern',
        consequence: 'Knee injury, ACL stress, reduced power output',
        fix: [
          'Actively cue "knees out" every rep',
          'Strengthen glute medius (band work)',
          'Goblet squats with knees-out focus',
          'Reduce weight, perfect pattern',
        ],
        severity: 'critical',
        icon: 'warning' as const,
      },
      {
        mistake: 'Good Morning Squat',
        why: 'Weak quads, weak core, bar position too high/low',
        consequence: 'Lower back strain, inefficient lift, missed reps',
        fix: [
          'Cue "chest up" throughout',
          'Pause squats to build strength',
          'Front squats to strengthen quads',
          'Core strengthening work',
        ],
        severity: 'high',
        icon: 'alert' as const,
      },
      {
        mistake: 'Heels Lifting',
        why: 'Poor ankle mobility, weight too far forward, bad bar path',
        consequence: 'Unstable base, reduced strength, knee stress',
        fix: [
          'Ankle mobility drills daily',
          'Weightlifting shoes (elevated heel)',
          'Cue "drive through heels"',
          'Box squats for pattern',
        ],
        severity: 'high',
        icon: 'alert' as const,
      },
      {
        mistake: 'Buttwink',
        why: 'Hip mobility limit, hamstring tightness, going too deep',
        consequence: 'Lumbar flexion under load, disc stress',
        fix: [
          'Stop at YOUR depth limit',
          'Hip flexor and hamstring stretching',
          'Glute activation before squatting',
          'May need wider stance',
        ],
        severity: 'medium',
        icon: 'information-circle' as const,
      },
    ],
    bench: [
      {
        mistake: 'Flared Elbows (90Â°)',
        why: 'Trying to mimic bodybuilding fly, lack of education',
        consequence: 'Shoulder impingement, rotator cuff injury, less strength',
        fix: [
          'Tuck elbows to 45-75Â° angle',
          'Cue "bend the bar" inward',
          'Retract scapula hard',
          'Lower to nipple line, not neck',
        ],
        severity: 'critical',
        icon: 'warning' as const,
      },
      {
        mistake: 'Butt Off Bench',
        why: 'Excessive arch attempt, poor setup, weak core',
        consequence: 'DQ in powerlifting, unstable platform, lower back stress',
        fix: [
          'Arch upper back only',
          'Keep butt glued to bench',
          'Strong leg drive without lifting',
          'Practice setup consistently',
        ],
        severity: 'high',
        icon: 'alert' as const,
      },
      {
        mistake: 'No Leg Drive',
        why: 'Not taught, feet placement wrong, thinking "upper body only"',
        consequence: 'Missing 10-15% strength potential, unstable',
        fix: [
          'Feet flat on floor, under knees',
          'Push through floor entire rep',
          'Feel tension in quads',
          'Practice leg drive with light weight',
        ],
        severity: 'medium',
        icon: 'information-circle' as const,
      },
      {
        mistake: 'Bouncing Bar Off Chest',
        why: 'Trying to cheat past sticking point, ego',
        consequence: 'Rib/sternum injury, doesn\'t count in comp, no strength',
        fix: [
          'Pause 1 second on chest',
          'Light touch, maintain tension',
          'Reduce weight, build strength',
          'Spoto press accessory work',
        ],
        severity: 'high',
        icon: 'alert' as const,
      },
    ],
    deadlift: [
      {
        mistake: 'Rounded Lower Back',
        why: 'Weak core, poor bracing, hips too low/high',
        consequence: 'Disc herniation, severe injury risk, career-ending',
        fix: [
          'Learn to brace properly (valsalva)',
          'Deficit deadlifts with perfect form',
          'Core strengthening (planks, ab wheel)',
          'Film yourself, reduce weight',
        ],
        severity: 'critical',
        icon: 'warning' as const,
      },
      {
        mistake: 'Hips Shoot Up First',
        why: 'Weak quads, starting hips too low, poor cue',
        consequence: 'Turns into Romanian deadlift, back strain, inefficient',
        fix: [
          'Start hips slightly higher',
          'Think "push floor away"',
          'Strengthen quads (front squats)',
          'Pause deadlifts just off floor',
        ],
        severity: 'high',
        icon: 'alert' as const,
      },
      {
        mistake: 'Bar Drifts Away',
        why: 'Lats not engaged, setup wrong, pulling around knees',
        consequence: 'Longer ROM, weaker position, back strain',
        fix: [
          'Engage lats (bend bar around shins)',
          'Bar stays against legs entire lift',
          'Setup: bar over midfoot',
          'Pull slack out before lift',
        ],
        severity: 'high',
        icon: 'alert' as const,
      },
      {
        mistake: 'Hyperextending at Top',
        why: 'Trying to show lockout, weak glutes',
        consequence: 'Lumbar hyperextension, back pain, no benefit',
        fix: [
          'Just stand tall, neutral spine',
          'Squeeze glutes, don\'t lean back',
          'Hip thrusts to strengthen glutes',
          'Film lockout position',
        ],
        severity: 'medium',
        icon: 'information-circle' as const,
      },
    ],
    ohp: [
      {
        mistake: 'Excessive Lean Back',
        why: 'Weak core, trying to turn into incline, bar path wrong',
        consequence: 'Lower back injury, inefficient press, shoulder stress',
        fix: [
          'Brace core like a plank',
          'Squeeze glutes hard',
          'Press straight up, not forward',
          'Reduce weight, build strength',
        ],
        severity: 'critical',
        icon: 'warning' as const,
      },
      {
        mistake: 'Bar Too Far Forward',
        why: 'Not moving head back, afraid of hitting face',
        consequence: 'Weak position, shoulder strain, missed reps',
        fix: [
          'Slight head tilt back to clear',
          'Press straight vertical',
          'Push head through at top',
          'Practice bar path with PVC',
        ],
        severity: 'high',
        icon: 'alert' as const,
      },
      {
        mistake: 'Pressing From Chest',
        why: 'Confusion with bench, trying to add ROM',
        consequence: 'Weaker starting position, shoulder stress',
        fix: [
          'Bar starts on front delts',
          'Clean bar to proper position',
          'Press from the "shelf"',
          'Feel triceps on lats at bottom',
        ],
        severity: 'medium',
        icon: 'information-circle' as const,
      },
      {
        mistake: 'No Lockout/Shrug',
        why: 'Weak overhead position, tired, not taught',
        consequence: 'Incomplete rep, missing trap activation, weak top',
        fix: [
          'Full elbow extension',
          'Shrug shoulders at very top',
          'Pause 1 second at lockout',
          'Build overhead stability',
        ],
        severity: 'low',
        icon: 'information-circle' as const,
      },
    ],
  };

  const currentMistakes = mistakes[selectedExercise];

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
            Common Mistakes
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          <View className="bg-gradient-to-r from-red-500 to-orange-500 rounded-xl p-6 mb-6">
            <Text className="text-white text-2xl font-bold mb-2">Avoid These Errors</Text>
            <Text className="text-white opacity-90">
              Learn from others' mistakes
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
                      selectedExercise === ex.id ? 'bg-red-500' : 'bg-zinc-800'
                    } rounded-xl px-4 py-3 border ${
                      selectedExercise === ex.id ? 'border-red-400' : 'border-zinc-700'
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

          {currentMistakes.map((item, idx) => {
            const color = getSeverityColor(item.severity);
            return (
              <View
                key={idx}
                className={`bg-${color}-500/10 rounded-xl p-5 mb-6 border border-${color}-500/30`}
              >
                <View className="flex-row items-center justify-between mb-3">
                  <View className="flex-row items-center flex-1">
                    <Ionicons name={item.icon} size={28} color={`#${color === 'red' ? 'ef4444' : color === 'orange' ? 'f97316' : color === 'amber' ? 'f59e0b' : '3b82f6'}`} />
                    <Text className={`text-${color}-400 font-bold text-xl ml-2 flex-1`}>
                      {item.mistake}
                    </Text>
                  </View>
                  <View className={`bg-${color}-500/20 rounded-full px-3 py-1 border border-${color}-500/40`}>
                    <Text className={`text-${color}-400 text-xs font-bold uppercase`}>
                      {item.severity}
                    </Text>
                  </View>
                </View>

                <View className="bg-zinc-900 rounded-xl p-4 mb-3">
                  <Text className="text-zinc-400 text-sm font-bold mb-1">Why It Happens:</Text>
                  <Text className="text-white">{item.why}</Text>
                </View>

                <View className={`bg-${color}-500/20 rounded-xl p-4 mb-3 border border-${color}-500/40`}>
                  <Text className={`text-${color}-400 text-sm font-bold mb-1`}>Consequence:</Text>
                  <Text className={`text-${color}-300`}>{item.consequence}</Text>
                </View>

                <View className="bg-primary/10 rounded-xl p-4 border border-primary/30">
                  <Text className="text-primary font-bold mb-2">How to Fix:</Text>
                  {item.fix.map((fixItem, fixIdx) => (
                    <View key={fixIdx} className="flex-row items-start mb-1.5 last:mb-0">
                      <Ionicons name="checkmark-circle" size={16} color="#9D12DE" />
                      <Text className="text-primary/80 ml-2 flex-1 text-sm">{fixItem}</Text>
                    </View>
                  ))}
                </View>
              </View>
            );
          })}

          <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-6">
            <Text className="text-primary/80 font-bold mb-2">General Tips</Text>
            <Text className="text-primary/60 text-sm">
              â€¢ Film every heavy set{'\n'}
              â€¢ Get coaching/form checks{'\n'}
              â€¢ Ego check at the door{'\n'}
              â€¢ Master basics before advanced{'\n'}
              â€¢ Consistency builds patterns
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}


