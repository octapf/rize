import React, { useState } from 'react';
import { Text } from '@/components/ui/Text';
import { View, TouchableOpacity, ScrollView, TextInput } from 'react-native';;
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TrainingNotes() {
  const [selectedWorkout, setSelectedWorkout] = useState<string | null>(null);
  const [newNote, setNewNote] = useState('');

  const workouts = [
    {
      id: '1',
      date: '28 Ene 2026',
      name: 'Push Day',
      duration: '75 min',
      notes: [
        { text: 'Bench felt strong today, hit PR', time: '14:30', mood: 'great' },
        { text: 'Need to work on OHP form', time: '15:20', mood: 'neutral' },
      ],
    },
    {
      id: '2',
      date: '26 Ene 2026',
      name: 'Pull Day',
      duration: '80 min',
      notes: [
        { text: 'Deadlift grip failing, need straps', time: '10:15', mood: 'challenging' },
        { text: 'Back pump was insane', time: '11:10', mood: 'great' },
      ],
    },
    {
      id: '3',
      date: '24 Ene 2026',
      name: 'Leg Day',
      duration: '90 min',
      notes: [
        { text: 'Squat depth improving', time: '16:00', mood: 'great' },
        { text: 'Hamstrings super tight, need mobility work', time: '16:45', mood: 'challenging' },
      ],
    },
  ];

  const noteTemplates = [
    { icon: 'flame', text: 'Felt strong today', color: 'primary' },
    { icon: 'medical', text: 'Minor discomfort', color: 'amber' },
    { icon: 'happy', text: 'Great pump!', color: 'blue' },
    { icon: 'warning', text: 'Form needs work', color: 'red' },
    { icon: 'flash', text: 'New PR!', color: 'purple' },
  ];

  const getMoodIcon = (mood: string) => {
    switch (mood) {
      case 'great': return 'happy';
      case 'neutral': return 'remove-circle';
      case 'challenging': return 'warning';
      default: return 'ellipse';
    }
  };

  const getMoodColor = (mood: string) => {
    switch (mood) {
      case 'great': return 'primary';
      case 'neutral': return 'blue';
      case 'challenging': return 'amber';
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
            Training Notes
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          <View className="bg-gradient-to-r from-primary to-[#7D0EBE] rounded-xl p-6 mb-6">
            <Text className="text-white text-2xl font-bold mb-2">Workout Journal</Text>
            <Text className="text-white opacity-90 mb-4">
              Track thoughts and observations
            </Text>
            <View className="flex-row items-center">
              <Ionicons name="create" size={20} color="white" />
              <Text className="text-white ml-2">{workouts.reduce((sum, w) => sum + w.notes.length, 0)} notes total</Text>
            </View>
          </View>

          <View className="bg-zinc-900 rounded-xl p-4 mb-6 border border-zinc-800">
            <Text className="text-zinc-400 mb-3">Quick Add Note</Text>
            <TextInput
              placeholder="How did your workout feel?"
              placeholderTextColor="#71717a"
              value={newNote}
              onChangeText={setNewNote}
              multiline
              numberOfLines={3}
              className="text-white mb-3"
              style={{ minHeight: 60 }}
            />

            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-3">
              <View className="flex-row gap-2">
                {noteTemplates.map((template, idx) => (
                  <TouchableOpacity
                    key={idx}
                    onPress={() => setNewNote(template.text)}
                    className={`bg-${template.color}-500/20 rounded-lg px-3 py-2 flex-row items-center border border-${template.color}-500/30`}
                  >
                    <Ionicons name={template.icon as any} size={16} color={
                      template.color === 'primary' ? '#9D12DE' :
                      template.color === 'amber' ? '#FFEA00' :
                      template.color === 'blue' ? '#9D12DE' :
                      template.color === 'red' ? '#ef4444' : '#a855f7'
                    } />
                    <Text className={`text-${template.color}-400 ml-2 text-sm font-bold`}>
                      {template.text}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>

            <TouchableOpacity className="bg-primary rounded-xl py-3">
              <Text className="text-white font-bold text-center">Save Note</Text>
            </TouchableOpacity>
          </View>

          <Text className="text-white font-bold text-lg mb-4">Recent Workouts</Text>

          {workouts.map((workout) => (
            <View key={workout.id} className="bg-zinc-900 rounded-xl p-5 mb-4 border border-zinc-800">
              <View className="flex-row items-start justify-between mb-3">
                <View className="flex-1">
                  <Text className="text-white font-bold text-lg mb-1">{workout.name}</Text>
                  <View className="flex-row items-center">
                    <Ionicons name="calendar" size={14} color="#71717a" />
                    <Text className="text-zinc-400 ml-1 text-sm">{workout.date}</Text>
                    <Ionicons name="time" size={14} color="#71717a" className="ml-3" />
                    <Text className="text-zinc-400 ml-1 text-sm">{workout.duration}</Text>
                  </View>
                </View>
                <View className="bg-primary/20 rounded-full px-3 py-1">
                  <Text className="text-primary/80 text-xs font-bold">{workout.notes.length} notes</Text>
                </View>
              </View>

              {workout.notes.map((note, idx) => (
                <View
                  key={idx}
                  className={`bg-${getMoodColor(note.mood)}-500/10 rounded-xl p-4 mb-2 border border-${getMoodColor(note.mood)}-500/30`}
                >
                  <View className="flex-row items-start mb-2">
                    <Ionicons
                      name={getMoodIcon(note.mood) as any}
                      size={20}
                      color={
                        note.mood === 'great' ? '#9D12DE' :
                        note.mood === 'neutral' ? '#9D12DE' : '#FFEA00'
                      }
                    />
                    <Text className="text-white ml-3 flex-1">{note.text}</Text>
                  </View>
                  <Text className="text-zinc-500 text-xs ml-8">{note.time}</Text>
                </View>
              ))}

              <TouchableOpacity
                onPress={() => setSelectedWorkout(workout.id)}
                className="bg-zinc-800 rounded-lg py-2 mt-2 flex-row items-center justify-center"
              >
                <Ionicons name="add" size={18} color="#9D12DE" />
                <Text className="text-primary/80 font-bold ml-1">Add Note</Text>
              </TouchableOpacity>
            </View>
          ))}

          <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-6">
            <Text className="text-primary/80 font-bold mb-2">Journaling Benefits</Text>
            <Text className="text-primary/60 text-sm">
              • Track what works y what doesn't{'\n'}
              • Identify patterns en performance{'\n'}
              • Remember form cues{'\n'}
              • Monitor energy levels{'\n'}
              • Improve future workouts
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}


