import React, { useState } from 'react';
import { Text } from '@/components/ui/Text';
import { View, TouchableOpacity, ScrollView, TextInput } from 'react-native';;
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function RecoveryBalance() {
  const [sleepHours, setSleepHours] = useState('7');
  const [stressLevel, setStressLevel] = useState<number>(5);
  const [workoutsThisWeek, setWorkoutsThisWeek] = useState('4');
  const [soreness, setSoreness] = useState<number>(3);

  const sleep = parseFloat(sleepHours) || 0;
  const workouts = parseInt(workoutsThisWeek) || 0;

  // Recovery Score Algorithm (0-100)
  const sleepScore = Math.min((sleep / 8) * 35, 35);
  const stressScore = ((10 - stressLevel) / 10) * 25;
  const volumeScore = workouts <= 5 ? 25 : Math.max(25 - (workouts - 5) * 3, 10);
  const sorenessScore = ((5 - soreness) / 5) * 15;

  const totalScore = Math.round(sleepScore + stressScore + volumeScore + sorenessScore);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'primary';
    if (score >= 60) return 'blue';
    if (score >= 40) return 'amber';
    return 'red';
  };

  const getReadinessLevel = (score: number) => {
    if (score >= 80) return { level: 'Excellent', action: 'Push hard today! Your body is ready.' };
    if (score >= 60) return { level: 'Good', action: 'Train normally. Listen to your body.' };
    if (score >= 40) return { level: 'Moderate', action: 'Consider reducing intensity or volume.' };
    return { level: 'Poor', action: 'Prioritize recovery. Light session or rest day.' };
  };

  const scoreColor = getScoreColor(totalScore);
  const readiness = getReadinessLevel(totalScore);

  const recoveryFactors = [
    {
      name: 'Sleep Quality',
      current: sleep,
      optimal: '7-9 hours',
      score: sleepScore,
      maxScore: 35,
      icon: 'moon',
      color: 'purple',
      tips: ['Consistent sleep schedule', 'Dark, cool room', 'No screens 1h before bed', 'Magnesium supplementation'],
    },
    {
      name: 'Stress Levels',
      current: `${stressLevel}/10`,
      optimal: '≤3/10',
      score: stressScore,
      maxScore: 25,
      icon: 'happy',
      color: 'blue',
      tips: ['Meditation 10 min/day', 'Breathing exercises', 'Time in nature', 'Reduce caffeine'],
    },
    {
      name: 'Training Volume',
      current: `${workouts} workouts`,
      optimal: '4-5/week',
      score: volumeScore,
      maxScore: 25,
      icon: 'barbell',
      color: 'primary',
      tips: ['Deload every 6-8 weeks', 'Avoid junk volume', 'Quality > quantity', 'Track working sets'],
    },
    {
      name: 'Muscle Soreness',
      current: `${soreness}/5`,
      optimal: '≤2/5',
      score: sorenessScore,
      maxScore: 15,
      icon: 'fitness',
      color: 'amber',
      tips: ['Active recovery walks', 'Foam rolling', 'Adequate protein', 'Proper warm-up'],
    },
  ];

  const recommendations = [
    {
      title: 'Immediate Actions',
      items:
        totalScore >= 80
          ? ['Go for PRs today', 'Add volume if recovering well', 'Maintain current routine']
          : totalScore >= 60
          ? ['Stick to planned workout', 'Monitor RPE closely', 'Extra warm-up today']
          : totalScore >= 40
          ? ['Reduce weight 10-15%', 'Cut 1-2 sets per exercise', 'Focus on form']
          : ['Active recovery only', 'Light cardio or walk', 'Early bedtime tonight'],
      color: scoreColor,
    },
    {
      title: 'This Week',
      items:
        totalScore >= 60
          ? ['Continue current split', 'Track recovery trends', 'Optimize sleep schedule']
          : ['Consider deload week', 'Reduce training days to 3-4', 'Address stress sources', 'Increase protein intake'],
      color: 'blue',
    },
    {
      title: 'Long-term Strategy',
      items: [
        'Aim for 7-9h sleep nightly',
        'Manage life stress proactively',
        'Periodize training (deloads)',
        'Track recovery metrics weekly',
        'Nutrition: 1.6-2.2g protein/kg',
        'Stay hydrated (3-4L water/day)',
      ],
      color: 'purple',
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
            Recovery Balance
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          <View className="bg-gradient-to-r from-primary to-[#7D0EBE] rounded-xl p-6 mb-6">
            <Text className="text-white text-2xl font-bold mb-2">Recovery Score</Text>
            <Text className="text-white opacity-90 mb-4">
              Assess your readiness to train
            </Text>
            <View className="flex-row items-center">
              <Ionicons name="analytics" size={20} color="white" />
              <Text className="text-white ml-2">Data-driven recovery tracking</Text>
            </View>
          </View>

          <View className={`bg-${scoreColor}-500/10 rounded-xl p-6 mb-6 border-2 border-${scoreColor}-500`}>
            <Text className="text-zinc-400 text-sm mb-2">Your Recovery Score</Text>
            <Text className={`text-${scoreColor}-400 font-bold text-6xl mb-3`}>{totalScore}</Text>
            <View className="bg-zinc-900 rounded-full h-3 mb-3">
              <View
                className={`bg-${scoreColor}-500 rounded-full h-3`}
                style={{ width: `${totalScore}%` }}
              />
            </View>
            <View className={`bg-${scoreColor}-500 rounded-lg p-3 mb-2`}>
              <Text className="text-white font-bold text-lg">{readiness.level}</Text>
            </View>
            <Text className="text-white text-sm">{readiness.action}</Text>
          </View>

          <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
            <Text className="text-white font-bold text-lg mb-4">Input Your Data</Text>

            <View className="mb-4">
              <Text className="text-zinc-400 mb-2">Sleep Last Night (hours)</Text>
              <TextInput
                className="bg-zinc-800 text-white rounded-xl px-4 py-3 border border-zinc-700"
                value={sleepHours}
                onChangeText={setSleepHours}
                keyboardType="numeric"
                placeholder="7"
                placeholderTextColor="#71717a"
              />
            </View>

            <View className="mb-4">
              <Text className="text-zinc-400 mb-2">Stress Level (1-10)</Text>
              <View className="flex-row gap-2">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((level) => (
                  <TouchableOpacity
                    key={level}
                    onPress={() => setStressLevel(level)}
                    className={`flex-1 ${
                      stressLevel === level ? 'bg-primary' : 'bg-zinc-800'
                    } rounded-lg py-2`}
                  >
                    <Text
                      className={`${
                        stressLevel === level ? 'text-white' : 'text-zinc-400'
                      } font-bold text-center text-sm`}
                    >
                      {level}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View className="mb-4">
              <Text className="text-zinc-400 mb-2">Workouts This Week</Text>
              <TextInput
                className="bg-zinc-800 text-white rounded-xl px-4 py-3 border border-zinc-700"
                value={workoutsThisWeek}
                onChangeText={setWorkoutsThisWeek}
                keyboardType="numeric"
                placeholder="4"
                placeholderTextColor="#71717a"
              />
            </View>

            <View className="mb-4">
              <Text className="text-zinc-400 mb-2">Muscle Soreness (1-5)</Text>
              <View className="flex-row gap-2">
                {[1, 2, 3, 4, 5].map((level) => (
                  <TouchableOpacity
                    key={level}
                    onPress={() => setSoreness(level)}
                    className={`flex-1 ${
                      soreness === level ? 'bg-amber-500' : 'bg-zinc-800'
                    } rounded-lg py-3`}
                  >
                    <Text
                      className={`${
                        soreness === level ? 'text-white' : 'text-zinc-400'
                      } font-bold text-center`}
                    >
                      {level}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>

          <Text className="text-white font-bold text-lg mb-4">Recovery Factor Breakdown</Text>

          {recoveryFactors.map((factor, idx) => {
            const percentage = (factor.score / factor.maxScore) * 100;
            return (
              <View key={idx} className={`bg-${factor.color}-500/10 rounded-xl p-4 mb-3 border border-${factor.color}-500/30`}>
                <View className="flex-row items-center justify-between mb-3">
                  <View className="flex-row items-center flex-1">
                    <Ionicons name={factor.icon as any} size={24} color={
                      factor.color === 'purple' ? '#a855f7' :
                      factor.color === 'blue' ? '#3B82F6' :
                      factor.color === 'primary' ? '#9D12DE' : '#FFEA00'
                    } />
                    <Text className="text-white font-bold ml-3">{factor.name}</Text>
                  </View>
                  <Text className={`text-${factor.color}-400 font-bold`}>
                    {Math.round(factor.score)}/{factor.maxScore}
                  </Text>
                </View>

                <View className="bg-zinc-900 rounded-full h-2 mb-3">
                  <View
                    className={`bg-${factor.color}-500 rounded-full h-2`}
                    style={{ width: `${percentage}%` }}
                  />
                </View>

                <View className="flex-row justify-between mb-2">
                  <Text className="text-zinc-400 text-sm">Current: {factor.current}</Text>
                  <Text className="text-zinc-400 text-sm">Optimal: {factor.optimal}</Text>
                </View>

                <Text className={`text-${factor.color}-400 font-bold text-xs mb-1`}>IMPROVEMENT TIPS</Text>
                {factor.tips.map((tip, tipIdx) => (
                  <Text key={tipIdx} className={`text-${factor.color}-300 text-xs mb-1`}>
                    • {tip}
                  </Text>
                ))}
              </View>
            );
          })}

          <Text className="text-white font-bold text-lg mb-4 mt-6">Recommendations</Text>

          {recommendations.map((rec, idx) => (
            <View key={idx} className={`bg-${rec.color}-500/10 rounded-xl p-4 mb-3 border border-${rec.color}-500/30`}>
              <Text className={`text-${rec.color}-400 font-bold mb-3`}>{rec.title}</Text>
              {rec.items.map((item, itemIdx) => (
                <Text key={itemIdx} className={`text-${rec.color}-300 text-sm mb-2`}>
                  ? {item}
                </Text>
              ))}
            </View>
          ))}

          <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-6">
            <Text className="text-primary/80 font-bold mb-2">Recovery Principles</Text>
            <Text className="text-primary/60 text-sm">
              • Recovery = when muscle grows{'\n'}
              • Sleep is #1 priority{'\n'}
              • Stress kills gains{'\n'}
              • Track trends, not single days{'\n'}
              • Auto-regulate training intensity{'\n'}
              • Deload every 6-8 weeks minimum
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}


