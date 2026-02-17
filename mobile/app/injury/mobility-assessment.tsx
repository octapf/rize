import React, { useState } from 'react';
import { Text } from '@/components/ui/Text';
import { View, TouchableOpacity, ScrollView } from 'react-native';;
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function MobilityAssessment() {
  const [results, setResults] = useState<{ [key: string]: string }>({});

  const tests = [
    {
      category: 'Ankle',
      test: 'Knee-to-Wall Test',
      instruction: 'Toes 5 inches from wall, knee touches wall without heel lifting',
      pass: 'Knee touches wall',
      fail: 'Knee cannot reach wall OR heel lifts',
      improvement: [
        'Wall ankle mobilizations (2 min/day)',
        'Calf stretching (static 60s)',
        'Ankle circles (20 each direction)',
        'Elevated heel squats',
      ],
      importance: 'Critical for squat depth',
    },
    {
      category: 'Hip Flexor',
      test: 'Thomas Test',
      instruction: 'Lie on bench edge, pull one knee to chest, other leg hangs',
      pass: 'Thigh parallel or below, knee at 90°',
      fail: 'Thigh rises above parallel',
      improvement: [
        'Kneeling hip flexor stretch (60s)',
        'Couch stretch (60s each)',
        'Walking lunges with reach',
        'Glute bridges (activation)',
      ],
      importance: 'Affects squat/deadlift positioning',
    },
    {
      category: 'Hamstring',
      test: 'Straight Leg Raise',
      instruction: 'Lie down, raise one straight leg while other stays flat',
      pass: 'Leg reaches 70-80• from ground',
      fail: 'Leg reaches <70• OR opposite leg bends',
      improvement: [
        'Lying hamstring stretch (60s)',
        'Standing toe touch progression',
        'Active leg raises',
        'Eccentric Nordic curls',
      ],
      importance: 'Deadlift form and injury prevention',
    },
    {
      category: 'Shoulder',
      test: 'Apley Scratch Test',
      instruction: 'Reach behind neck down, and behind back up - fingers touch',
      pass: 'Fingers easily touch from both directions',
      fail: 'Fingers cannot touch from one/both directions',
      improvement: [
        'Doorway pec stretch (60s)',
        'Sleeper stretch (60s each)',
        'Wall slides (15 reps)',
        'Band dislocations (20 reps)',
      ],
      importance: 'Overhead press and bench press safety',
    },
    {
      category: 'Thoracic Spine',
      test: 'Seated Rotation Test',
      instruction: 'Sit with arms crossed, rotate torso both ways',
      pass: '45° rotation each side',
      fail: '<45° rotation OR pain',
      improvement: [
        'Thoracic extensions on foam roller',
        'Open book stretch (10 each)',
        'Quadruped rotations (15 each)',
        'Cat-cow stretch (20 reps)',
      ],
      importance: 'Overhead movements and posture',
    },
    {
      category: 'Hip Internal Rotation',
      test: '90/90 Position',
      instruction: 'Sit with both knees at 90°, one in front, one to side',
      pass: 'Both hips rest on ground comfortably',
      fail: 'Cannot achieve position OR knee lifts',
      improvement: [
        '90/90 stretch holds (90s)',
        'Pigeon pose (90s each)',
        'Fire hydrants (15 each)',
        'Hip CARs (10 each direction)',
      ],
      importance: 'Squat mechanics and hip health',
    },
    {
      category: 'Overhead',
      test: 'Overhead Squat Assessment',
      instruction: 'Arms overhead, squat down (bodyweight only)',
      pass: 'Arms stay vertical, chest up, full depth',
      fail: 'Arms fall forward OR cannot reach depth',
      improvement: [
        'Wall slides (20 reps)',
        'PVC overhead squats (practice)',
        'Lat stretches (60s)',
        'Shoulder dislocations (15 reps)',
      ],
      importance: 'Snatch/overhead press mobility',
    },
    {
      category: 'Squat',
      test: 'Deep Squat Hold',
      instruction: 'Bodyweight squat, bottom position hold 30s',
      pass: 'Heels down, chest up, no pain',
      fail: 'Heels lift OR falls backward OR pain',
      improvement: [
        'Goblet squat holds (60s)',
        'Ankle mobilizations',
        'Hip flexor stretches',
        'Squat to stand (10 reps)',
      ],
      importance: 'Foundation for all leg training',
    },
  ];

  const handleResult = (testName: string, result: 'pass' | 'fail') => {
    setResults({ ...results, [testName]: result });
  };

  const passCount = Object.values(results).filter((r) => r === 'pass').length;
  const totalTests = Object.keys(results).length;
  const score = totalTests > 0 ? Math.round((passCount / totalTests) * 100) : 0;

  const getScoreColor = () => {
    if (score >= 80) return 'primary';
    if (score >= 60) return 'blue';
    if (score >= 40) return 'amber';
    return 'red';
  };

  return (
    <View className="flex-1 bg-zinc-950">
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1 ml-3">
            Mobility Assessment
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          <View className="bg-gradient-to-r from-primary to-[#7D0EBE] rounded-xl p-6 mb-6">
            <Text className="text-white text-2xl font-bold mb-2">Test Your Mobility</Text>
            <Text className="text-white opacity-90 mb-4">
              Identify limitations before they cause injury
            </Text>
            <View className="flex-row items-center">
              <Ionicons name="body" size={20} color="white" />
              <Text className="text-white ml-2">8 essential movement tests</Text>
            </View>
          </View>

          {totalTests > 0 && (
            <View className={`bg-${getScoreColor()}-500/10 rounded-xl p-5 mb-6 border border-${getScoreColor()}-500`}>
              <Text className="text-zinc-400 text-sm mb-2">Your Mobility Score</Text>
              <Text className={`text-${getScoreColor()}-400 font-bold text-5xl mb-3`}>
                {score}%
              </Text>
              <Text className="text-white mb-2">
                {passCount}/{totalTests} tests passed
              </Text>
              <View className="bg-zinc-900 rounded-full h-3">
                <View
                  className={`bg-${getScoreColor()}-500 rounded-full h-3`}
                  style={{ width: `${score}%` }}
                />
              </View>
            </View>
          )}

          {tests.map((test, idx) => {
            const testResult = results[test.test];
            return (
              <View key={idx} className="bg-zinc-900 rounded-xl p-4 mb-4 border border-zinc-800">
                <View className="flex-row items-center justify-between mb-3">
                  <View className="flex-1">
                    <Text className="text-primary/80 text-xs font-bold">{test.category}</Text>
                    <Text className="text-white font-bold text-lg">{test.test}</Text>
                  </View>
                  {testResult && (
                    <Ionicons
                      name={testResult === 'pass' ? 'checkmark-circle' : 'close-circle'}
                      size={32}
                      color={testResult === 'pass' ? '#9D12DE' : '#ef4444'}
                    />
                  )}
                </View>

                <View className="bg-zinc-800 rounded-lg p-3 mb-3">
                  <Text className="text-zinc-400 text-xs font-bold mb-1">HOW TO TEST</Text>
                  <Text className="text-white text-sm">{test.instruction}</Text>
                </View>

                <View className="flex-row gap-2 mb-3">
                  <View className="flex-1 bg-primary/10 rounded-lg p-2 border border-primary/30">
                    <Text className="text-primary text-xs font-bold mb-1">? PASS</Text>
                    <Text className="text-primary/80 text-xs">{test.pass}</Text>
                  </View>
                  <View className="flex-1 bg-red-500/10 rounded-lg p-2 border border-red-500/30">
                    <Text className="text-red-400 text-xs font-bold mb-1">? FAIL</Text>
                    <Text className="text-red-300 text-xs">{test.fail}</Text>
                  </View>
                </View>

                <View className="flex-row gap-2 mb-3">
                  <TouchableOpacity
                    onPress={() => handleResult(test.test, 'pass')}
                    className={`flex-1 ${
                      testResult === 'pass' ? 'bg-primary' : 'bg-zinc-800'
                    } rounded-lg py-3 border ${
                      testResult === 'pass' ? 'border-primary' : 'border-zinc-700'
                    }`}
                  >
                    <Text
                      className={`${
                        testResult === 'pass' ? 'text-white' : 'text-zinc-400'
                      } font-bold text-center`}
                    >
                      I Passed
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleResult(test.test, 'fail')}
                    className={`flex-1 ${
                      testResult === 'fail' ? 'bg-red-500' : 'bg-zinc-800'
                    } rounded-lg py-3 border ${
                      testResult === 'fail' ? 'border-red-400' : 'border-zinc-700'
                    }`}
                  >
                    <Text
                      className={`${
                        testResult === 'fail' ? 'text-white' : 'text-zinc-400'
                      } font-bold text-center`}
                    >
                      I Failed
                    </Text>
                  </TouchableOpacity>
                </View>

                {testResult === 'fail' && (
                  <View className="bg-amber-500/10 rounded-lg p-3 border border-amber-500/30">
                    <Text className="text-amber-400 font-bold text-xs mb-2">
                      IMPROVEMENT PLAN
                    </Text>
                    {test.improvement.map((step, stepIdx) => (
                      <Text key={stepIdx} className="text-amber-300 text-sm mb-1">
                        • {step}
                      </Text>
                    ))}
                    <Text className="text-zinc-400 text-xs mt-2 italic">
                      Why: {test.importance}
                    </Text>
                  </View>
                )}
              </View>
            );
          })}

          <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-6">
            <Text className="text-primary/80 font-bold mb-2">Assessment Guidelines</Text>
            <Text className="text-primary/60 text-sm">
              • Test when fresh (not post-workout){'\n'}
              • No pain = stop immediately{'\n'}
              • Retest monthly to track progress{'\n'}
              • Work on failures 10 min/day{'\n'}
              • Mobility before strength{'\n'}
              • Be honest with yourself
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}



