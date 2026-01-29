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

export default function WorkoutJournaling() {
  const [selectedDate, setSelectedDate] = useState('28 Ene 2026');

  const entries = [
    {
      date: '28 Ene 2026',
      workout: 'Push Day',
      duration: '75 min',
      totalVolume: 12450,
      exercises: 6,
      rating: 5,
      energy: 'high',
      journal: 'Felt amazing today. Bench PR 120kg! Shoulders a bit tight but managed good OHP volume. Need to focus on tricep lockout.',
      highlights: ['Bench PR: 120kg', 'Great pump', 'No injuries'],
      improvements: ['OHP form', 'Tricep lockout'],
    },
    {
      date: '26 Ene 2026',
      workout: 'Pull Day',
      duration: '80 min',
      totalVolume: 15200,
      exercises: 7,
      rating: 4,
      energy: 'medium',
      journal: 'Solid session. Deadlift grip failing on last set - time for straps. Back pump was insane. Pull-ups improving week over week.',
      highlights: ['Deadlift 200kg x5', 'Pull-up volume +2 reps'],
      improvements: ['Grip strength', 'Bicep mind-muscle'],
    },
    {
      date: '24 Ene 2026',
      workout: 'Leg Day',
      duration: '90 min',
      totalVolume: 18900,
      exercises: 8,
      rating: 3,
      energy: 'low',
      journal: 'Tough day. Squat depth improving but felt heavy. Hamstrings super tight - did extra stretching. Might need a deload week soon.',
      highlights: ['Squat depth better', 'Extra mobility work'],
      improvements: ['Energy levels', 'Hamstring flexibility'],
    },
  ];

  const getRatingStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Ionicons
        key={i}
        name={i < rating ? 'star' : 'star-outline'}
        size={20}
        color={i < rating ? '#f59e0b' : '#71717a'}
      />
    ));
  };

  const getEnergyColor = (energy: string) => {
    switch (energy) {
      case 'high': return 'emerald';
      case 'medium': return 'amber';
      case 'low': return 'red';
      default: return 'zinc';
    }
  };

  const currentEntry = entries.find((e) => e.date === selectedDate) || entries[0];

  return (
    <View className="flex-1 bg-zinc-950">
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1 ml-3">
            Workout Journal
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          <View className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-6 mb-6">
            <Text className="text-white text-2xl font-bold mb-2">Training Journal</Text>
            <Text className="text-white opacity-90 mb-4">
              Complete workout reflections
            </Text>
            <View className="flex-row items-center">
              <Ionicons name="book" size={20} color="white" />
              <Text className="text-white ml-2">{entries.length} entries this week</Text>
            </View>
          </View>

          <Text className="text-white font-bold mb-3">Select Date</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6">
            <View className="flex-row gap-3">
              {entries.map((entry) => (
                <TouchableOpacity
                  key={entry.date}
                  onPress={() => setSelectedDate(entry.date)}
                  className={`${
                    selectedDate === entry.date ? 'bg-blue-500' : 'bg-zinc-900'
                  } rounded-xl px-6 py-3 border ${
                    selectedDate === entry.date ? 'border-blue-400' : 'border-zinc-800'
                  }`}
                >
                  <Text
                    className={`${
                      selectedDate === entry.date ? 'text-white' : 'text-zinc-400'
                    } font-bold mb-1`}
                  >
                    {entry.date}
                  </Text>
                  <Text
                    className={`${
                      selectedDate === entry.date ? 'text-blue-100' : 'text-zinc-500'
                    } text-xs`}
                  >
                    {entry.workout}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          <View className="bg-zinc-900 rounded-xl p-5 mb-4 border border-zinc-800">
            <View className="flex-row items-center justify-between mb-4">
              <View>
                <Text className="text-white font-bold text-xl mb-1">{currentEntry.workout}</Text>
                <Text className="text-zinc-400">{currentEntry.date}</Text>
              </View>
              <View className="flex-row">{getRatingStars(currentEntry.rating)}</View>
            </View>

            <View className="flex-row gap-3 mb-4">
              <View className="flex-1 bg-zinc-800 rounded-lg p-3">
                <Ionicons name="time" size={20} color="#3b82f6" />
                <Text className="text-white font-bold mt-1">{currentEntry.duration}</Text>
                <Text className="text-zinc-400 text-xs">Duration</Text>
              </View>
              <View className="flex-1 bg-zinc-800 rounded-lg p-3">
                <Ionicons name="barbell" size={20} color="#10b981" />
                <Text className="text-white font-bold mt-1">{currentEntry.totalVolume.toLocaleString()}kg</Text>
                <Text className="text-zinc-400 text-xs">Volume</Text>
              </View>
              <View className="flex-1 bg-zinc-800 rounded-lg p-3">
                <Ionicons name="fitness" size={20} color="#f59e0b" />
                <Text className="text-white font-bold mt-1">{currentEntry.exercises}</Text>
                <Text className="text-zinc-400 text-xs">Exercises</Text>
              </View>
            </View>

            <View className={`bg-${getEnergyColor(currentEntry.energy)}-500/10 rounded-lg p-3 mb-4 border border-${getEnergyColor(currentEntry.energy)}-500/30`}>
              <View className="flex-row items-center">
                <Ionicons name="flash" size={20} color={
                  currentEntry.energy === 'high' ? '#10b981' :
                  currentEntry.energy === 'medium' ? '#f59e0b' : '#ef4444'
                } />
                <Text className={`text-${getEnergyColor(currentEntry.energy)}-400 font-bold ml-2`}>
                  Energy: {currentEntry.energy.toUpperCase()}
                </Text>
              </View>
            </View>
          </View>

          <View className="bg-zinc-900 rounded-xl p-5 mb-4 border border-zinc-800">
            <Text className="text-white font-bold mb-3">Journal Entry</Text>
            <Text className="text-zinc-300 leading-6">{currentEntry.journal}</Text>
          </View>

          <View className="bg-emerald-500/10 rounded-xl p-5 mb-4 border border-emerald-500/30">
            <Text className="text-emerald-400 font-bold mb-3">Highlights</Text>
            {currentEntry.highlights.map((highlight, idx) => (
              <View key={idx} className="flex-row items-center mb-2">
                <Ionicons name="checkmark-circle" size={20} color="#10b981" />
                <Text className="text-emerald-300 ml-2">{highlight}</Text>
              </View>
            ))}
          </View>

          <View className="bg-amber-500/10 rounded-xl p-5 mb-6 border border-amber-500/30">
            <Text className="text-amber-400 font-bold mb-3">Areas to Improve</Text>
            {currentEntry.improvements.map((improvement, idx) => (
              <View key={idx} className="flex-row items-center mb-2">
                <Ionicons name="alert-circle" size={20} color="#f59e0b" />
                <Text className="text-amber-300 ml-2">{improvement}</Text>
              </View>
            ))}
          </View>

          <TouchableOpacity className="bg-blue-500 rounded-xl py-4 mb-6 flex-row items-center justify-center">
            <Ionicons name="create" size={24} color="white" />
            <Text className="text-white font-bold ml-2 text-lg">Edit Entry</Text>
          </TouchableOpacity>

          <View className="bg-blue-500/10 rounded-xl p-4 border border-blue-500/30 mb-6">
            <Text className="text-blue-400 font-bold mb-2">Journaling Tips</Text>
            <Text className="text-blue-300 text-sm">
              • Write immediately post-workout{'\n'}
              • Be honest sobre energy y effort{'\n'}
              • Note form cues que ayudaron{'\n'}
              • Track sleep/nutrition impact{'\n'}
              • Review monthly para patterns
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
