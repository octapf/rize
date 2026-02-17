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

export default function PRTracker() {
  const [selectedLift, setSelectedLift] = useState('squat');

  const lifts = ['squat', 'bench', 'deadlift', 'ohp'];

  // Mock PR data
  const [prs, setPRs] = useState({
    squat: [
      { date: '2024-01-15', weight: 140, reps: 1, notes: 'Competition PR!' },
      { date: '2023-12-01', weight: 135, reps: 1, notes: 'Clean depth' },
      { date: '2023-10-15', weight: 130, reps: 1, notes: 'First time 130kg' },
    ],
    bench: [
      { date: '2024-01-20', weight: 100, reps: 1, notes: 'Touch and go' },
      { date: '2023-11-10', weight: 97.5, reps: 1, notes: 'Paused' },
    ],
    deadlift: [
      { date: '2024-01-05', weight: 180, reps: 1, notes: 'Conventional, belt only' },
      { date: '2023-12-15', weight: 175, reps: 1, notes: 'Easy pull' },
    ],
    ohp: [
      { date: '2023-12-20', weight: 70, reps: 1, notes: 'Strict press' },
      { date: '2023-10-01', weight: 67.5, reps: 1, notes: 'No leg drive' },
    ],
  });

  const milestones = {
    squat: [
      { weight: 100, label: '100kg Club', achieved: true },
      { weight: 120, label: '1.5x BW', achieved: true },
      { weight: 140, label: 'Current PR', achieved: true },
      { weight: 160, label: '2x BW Goal', achieved: false },
      { weight: 180, label: 'Advanced', achieved: false },
    ],
    bench: [
      { weight: 60, label: 'BW Bench', achieved: true },
      { weight: 80, label: 'Intermediate', achieved: true },
      { weight: 100, label: 'Current PR', achieved: true },
      { weight: 120, label: '1.5x BW Goal', achieved: false },
      { weight: 140, label: 'Advanced', achieved: false },
    ],
    deadlift: [
      { weight: 140, label: '2x BW', achieved: true },
      { weight: 160, label: 'Intermediate', achieved: true },
      { weight: 180, label: 'Current PR', achieved: true },
      { weight: 200, label: '2.5x BW Goal', achieved: false },
      { weight: 220, label: 'Advanced', achieved: false },
    ],
    ohp: [
      { weight: 40, label: '0.5x BW', achieved: true },
      { weight: 60, label: 'Intermediate', achieved: true },
      { weight: 70, label: 'Current PR', achieved: true },
      { weight: 80, label: 'BW Press', achieved: false },
      { weight: 90, label: 'Advanced', achieved: false },
    ],
  };

  const currentPRs = prs[selectedLift as keyof typeof prs];
  const currentMilestones = milestones[selectedLift as keyof typeof milestones];
  const latestPR = currentPRs[0];

  const getProgress = (target: number) => {
    return Math.min(100, (latestPR.weight / target) * 100);
  };

  return (
    <View className="flex-1 bg-zinc-950">
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1 ml-3">
            PR Tracker
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          <View className="bg-gradient-to-r from-primary to-[#7D0EBE] rounded-xl p-6 mb-6">
            <Text className="text-white text-2xl font-bold mb-2">Personal Records</Text>
            <Text className="text-white opacity-90">
              Track your strength journey
            </Text>
          </View>

          <View className="mb-6">
            <View className="flex-row gap-2">
              {lifts.map((lift) => (
                <TouchableOpacity
                  key={lift}
                  onPress={() => setSelectedLift(lift)}
                  className={`flex-1 ${
                    selectedLift === lift ? 'bg-primary' : 'bg-zinc-800'
                  } rounded-xl px-3 py-3 border ${
                    selectedLift === lift ? 'border-primary' : 'border-zinc-700'
                  }`}
                >
                  <Text className="text-white font-bold text-center capitalize text-sm">
                    {lift === 'ohp' ? 'OHP' : lift}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View className="bg-primary/10 rounded-xl p-6 mb-6 border border-primary/30">
            <Text className="text-primary text-sm mb-2">Current PR</Text>
            <Text className="text-white text-6xl font-bold mb-1">
              {latestPR.weight}kg
            </Text>
            <Text className="text-zinc-300">{latestPR.date}</Text>
            {latestPR.notes && (
              <View className="bg-zinc-900 rounded-xl p-3 mt-3">
                <Text className="text-zinc-400 text-sm">{latestPR.notes}</Text>
              </View>
            )}
          </View>

          <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
            <Text className="text-white font-bold text-lg mb-4">PR History</Text>
            {currentPRs.map((pr, idx) => (
              <View key={idx} className="flex-row items-center justify-between bg-zinc-800 rounded-xl p-4 mb-2 last:mb-0">
                <View className="flex-1">
                  <Text className="text-white font-bold text-lg">
                    {pr.weight}kg × {pr.reps}
                  </Text>
                  <Text className="text-zinc-400 text-sm">{pr.date}</Text>
                </View>
                {idx === 0 && (
                  <View className="bg-primary/20 rounded-full px-3 py-1">
                    <Text className="text-primary font-bold text-xs">Latest</Text>
                  </View>
                )}
              </View>
            ))}
          </View>

          <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
            <Text className="text-white font-bold text-lg mb-4">Milestones</Text>
            {currentMilestones.map((milestone, idx) => (
              <View key={idx} className="mb-4 last:mb-0">
                <View className="flex-row justify-between items-center mb-2">
                  <View className="flex-row items-center">
                    <Ionicons
                      name={milestone.achieved ? 'checkmark-circle' : 'ellipse-outline'}
                      size={20}
                      color={milestone.achieved ? '#9D12DE' : '#71717a'}
                    />
                    <Text className={`font-bold ml-2 ${
                      milestone.achieved ? 'text-primary' : 'text-zinc-400'
                    }`}>
                      {milestone.label}
                    </Text>
                  </View>
                  <Text className={`font-bold ${
                    milestone.achieved ? 'text-white' : 'text-zinc-500'
                  }`}>
                    {milestone.weight}kg
                  </Text>
                </View>
                <View className="bg-zinc-800 rounded-full h-2 overflow-hidden">
                  <View
                    className={`h-full ${
                      milestone.achieved ? 'bg-primary' : 'bg-primary'
                    }`}
                    style={{ width: `${getProgress(milestone.weight)}%` }}
                  />
                </View>
                {!milestone.achieved && (
                  <Text className="text-zinc-500 text-xs mt-1">
                    {(milestone.weight - latestPR.weight).toFixed(1)}kg to go
                  </Text>
                )}
              </View>
            ))}
          </View>

          <TouchableOpacity className="bg-primary rounded-xl p-4 mb-6">
            <View className="flex-row items-center justify-center">
              <Ionicons name="add-circle" size={20} color="white" />
              <Text className="text-white font-bold ml-2">Log New PR</Text>
            </View>
          </TouchableOpacity>

          <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-6">
            <Text className="text-primary/80 font-bold mb-2">PR Tips</Text>
            <Text className="text-primary/60 text-sm mb-2">
              • Test PRs when fresh, not after volume work
            </Text>
            <Text className="text-primary/60 text-sm mb-2">
              • Film your lifts to verify form
            </Text>
            <Text className="text-primary/60 text-sm mb-2">
              • Rep PRs count too! 5RM progress = strength gains
            </Text>
            <Text className="text-primary/60 text-sm">
              • Don't test 1RM more than once per month
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

