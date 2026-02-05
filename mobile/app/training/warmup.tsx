import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function WarmupProtocols() {
  const [selectedLift, setSelectedLift] = useState('squat');

  const warmupProtocols = {
    squat: {
      name: 'Squat Warm-up',
      icon: 'fitness',
      color: 'blue',
      workingWeight: '140kg',
      phases: [
        {
          phase: 'General Warm-up',
          duration: '5-7 min',
          exercises: [
            { name: 'Light cardio', sets: '1', reps: '5 min', notes: 'Bike, row, or walk - raise heart rate' },
            { name: 'Jumping jacks', sets: '2', reps: '20', notes: 'Full body activation' },
            { name: 'Leg swings', sets: '2', reps: '10/leg', notes: 'Front-back and side-side' },
          ],
        },
        {
          phase: 'Mobility',
          duration: '5 min',
          exercises: [
            { name: 'Hip 90/90 stretch', sets: '2', reps: '30s/side', notes: 'Open hips' },
            { name: 'Deep squat hold', sets: '2', reps: '30s', notes: 'Bottom position' },
            { name: 'Ankle mobilization', sets: '2', reps: '10/leg', notes: 'Wall ankle dorsiflexion' },
            { name: 'Spiderman stretch', sets: '1', reps: '5/side', notes: 'Hip flexor and rotation' },
          ],
        },
        {
          phase: 'Activation',
          duration: '3-5 min',
          exercises: [
            { name: 'Glute bridges', sets: '2', reps: '15', notes: 'Squeeze glutes hard' },
            { name: 'Goblet squats', sets: '2', reps: '10', notes: 'Light KB, focus depth' },
            { name: 'Monster walks', sets: '2', reps: '10/direction', notes: 'Band around knees' },
          ],
        },
        {
          phase: 'Specific Warm-up',
          duration: '5-7 min',
          exercises: [
            { name: 'Empty bar', sets: '1', reps: '10', notes: '20kg - groove pattern' },
            { name: '40% 1RM', sets: '1', reps: '8', notes: '56kg - controlled reps' },
            { name: '50% 1RM', sets: '1', reps: '6', notes: '70kg - feel the weight' },
            { name: '60% 1RM', sets: '1', reps: '5', notes: '84kg - normal speed' },
            { name: '70% 1RM', sets: '1', reps: '3', notes: '98kg - getting heavy' },
            { name: '80% 1RM', sets: '1', reps: '2', notes: '112kg - near working weight' },
            { name: '90% 1RM', sets: '1', reps: '1', notes: '126kg - optional, feel it' },
          ],
        },
      ],
      totalTime: '18-24 minutes',
      notes: [
        'Longer warm-up for heavy squat days',
        'More mobility if tight',
        'Reduce volume if already fatigued',
        'Don\'t rush - this prevents injury',
      ],
    },
    bench: {
      name: 'Bench Press Warm-up',
      icon: 'barbell',
      color: 'red',
      workingWeight: '100kg',
      phases: [
        {
          phase: 'General Warm-up',
          duration: '3-5 min',
          exercises: [
            { name: 'Arm circles', sets: '2', reps: '15/direction', notes: 'Forward and backward' },
            { name: 'Band pull-aparts', sets: '3', reps: '20', notes: 'Activate upper back' },
            { name: 'Scapular push-ups', sets: '2', reps: '10', notes: 'Scapular control' },
          ],
        },
        {
          phase: 'Mobility',
          duration: '3-5 min',
          exercises: [
            { name: 'Thoracic extensions', sets: '2', reps: '10', notes: 'Foam roller or bench' },
            { name: 'Shoulder dislocations', sets: '2', reps: '10', notes: 'PVC or band' },
            { name: 'Lat stretch', sets: '1', reps: '30s/side', notes: 'Doorway or bar' },
          ],
        },
        {
          phase: 'Activation',
          duration: '2-3 min',
          exercises: [
            { name: 'Face pulls', sets: '2', reps: '15', notes: 'Light weight, rear delts' },
            { name: 'Band pushdowns', sets: '2', reps: '15', notes: 'Tricep activation' },
            { name: 'Push-ups', sets: '1', reps: '10', notes: 'Bodyweight, controlled' },
          ],
        },
        {
          phase: 'Specific Warm-up',
          duration: '5-7 min',
          exercises: [
            { name: 'Empty bar', sets: '1', reps: '12', notes: '20kg - groove pattern' },
            { name: '40% 1RM', sets: '1', reps: '8', notes: '40kg - touch chest' },
            { name: '50% 1RM', sets: '1', reps: '6', notes: '50kg - normal tempo' },
            { name: '60% 1RM', sets: '1', reps: '5', notes: '60kg - faster concentric' },
            { name: '70% 1RM', sets: '1', reps: '3', notes: '70kg - feels easy' },
            { name: '80% 1RM', sets: '1', reps: '2', notes: '80kg - near working' },
            { name: '90% 1RM', sets: '1', reps: '1', notes: '90kg - if needed' },
          ],
        },
      ],
      totalTime: '13-20 minutes',
      notes: [
        'Extra shoulder mobility if tight',
        'More upper back work for shoulder health',
        'Pause reps in warm-up for technique',
        'Don\'t fatigue triceps too much',
      ],
    },
    deadlift: {
      name: 'Deadlift Warm-up',
      icon: 'barbell-outline',
      color: 'purple',
      workingWeight: '180kg',
      phases: [
        {
          phase: 'General Warm-up',
          duration: '5 min',
          exercises: [
            { name: 'Light cardio', sets: '1', reps: '5 min', notes: 'Bike or row' },
            { name: 'Cat-cow', sets: '2', reps: '10', notes: 'Spinal mobility' },
            { name: 'Leg swings', sets: '2', reps: '10/leg', notes: 'Dynamic stretch' },
          ],
        },
        {
          phase: 'Mobility',
          duration: '5 min',
          exercises: [
            { name: 'Hip hinge practice', sets: '2', reps: '10', notes: 'PVC on back' },
            { name: 'Hamstring sweeps', sets: '2', reps: '10/leg', notes: 'Active flexibility' },
            { name: 'Thoracic rotation', sets: '2', reps: '8/side', notes: 'Quadruped position' },
          ],
        },
        {
          phase: 'Activation',
          duration: '3 min',
          exercises: [
            { name: 'Glute bridges', sets: '2', reps: '15', notes: 'Wake up glutes' },
            { name: 'Bird dogs', sets: '2', reps: '8/side', notes: 'Core stability' },
            { name: 'Dead bugs', sets: '2', reps: '10', notes: 'Brace practice' },
          ],
        },
        {
          phase: 'Specific Warm-up',
          duration: '5-7 min',
          exercises: [
            { name: '60kg', sets: '1', reps: '8', notes: 'Light, focus setup' },
            { name: '40% 1RM', sets: '1', reps: '6', notes: '72kg - feel position' },
            { name: '50% 1RM', sets: '1', reps: '5', notes: '90kg - normal speed' },
            { name: '60% 1RM', sets: '1', reps: '4', notes: '108kg - faster pull' },
            { name: '70% 1RM', sets: '1', reps: '3', notes: '126kg - getting heavy' },
            { name: '80% 1RM', sets: '1', reps: '2', notes: '144kg - chalk up' },
            { name: '90% 1RM', sets: '1', reps: '1', notes: '162kg - near max' },
          ],
        },
      ],
      totalTime: '18-20 minutes',
      notes: [
        'Don\'t skip hip hinge practice',
        'Focus on bracing before each rep',
        'Chalk only for heavy sets',
        'Belt optional until 80%+',
      ],
    },
    ohp: {
      name: 'OHP Warm-up',
      icon: 'arrow-up',
      color: 'emerald',
      workingWeight: '70kg',
      phases: [
        {
          phase: 'General Warm-up',
          duration: '3 min',
          exercises: [
            { name: 'Arm circles', sets: '2', reps: '15/direction', notes: 'Large circles' },
            { name: 'Band pull-aparts', sets: '2', reps: '20', notes: 'Rear delt focus' },
          ],
        },
        {
          phase: 'Mobility',
          duration: '5 min',
          exercises: [
            { name: 'Thoracic extensions', sets: '2', reps: '10', notes: 'Overhead mobility critical' },
            { name: 'Lat stretch', sets: '2', reps: '30s/side', notes: 'Door frame or bar' },
            { name: 'Shoulder pass-throughs', sets: '2', reps: '10', notes: 'PVC or band' },
            { name: 'Wall slides', sets: '2', reps: '10', notes: 'Keep lower back flat' },
          ],
        },
        {
          phase: 'Activation',
          duration: '2 min',
          exercises: [
            { name: 'Face pulls', sets: '2', reps: '15', notes: 'Light band' },
            { name: 'Overhead holds', sets: '2', reps: '20s', notes: 'Empty bar or PVC' },
          ],
        },
        {
          phase: 'Specific Warm-up',
          duration: '5 min',
          exercises: [
            { name: 'Empty bar', sets: '1', reps: '10', notes: '20kg - full lockout' },
            { name: '40% 1RM', sets: '1', reps: '8', notes: '28kg - strict form' },
            { name: '50% 1RM', sets: '1', reps: '6', notes: '35kg - normal tempo' },
            { name: '60% 1RM', sets: '1', reps: '5', notes: '42kg - feel it' },
            { name: '70% 1RM', sets: '1', reps: '3', notes: '49kg - close to working' },
            { name: '80% 1RM', sets: '1', reps: '2', notes: '56kg - near working weight' },
          ],
        },
      ],
      totalTime: '15 minutes',
      notes: [
        'Extra thoracic work essential',
        'No leg drive in warm-up (strict)',
        'Full lockout every rep',
        'Shorter rest between warm-up sets',
      ],
    },
  };

  const currentProtocol = warmupProtocols[selectedLift as keyof typeof warmupProtocols];

  const getColorClass = (color: string) => {
    const colors: { [key: string]: string } = {
      blue: 'bg-primary',
      red: 'bg-red-500',
      purple: 'bg-purple-500',
      emerald: 'bg-primary',
    };
    return colors[color];
  };

  return (
    <View className="flex-1 bg-zinc-950">
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1 ml-3">
            Warm-up Protocols
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          <View className="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl p-6 mb-6">
            <Text className="text-white text-2xl font-bold mb-2">Proper Warm-ups</Text>
            <Text className="text-white opacity-90">
              Prevent injury, maximize performance
            </Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6">
            <View className="flex-row gap-3 px-1">
              {Object.entries(warmupProtocols).map(([key, protocol]) => (
                <TouchableOpacity
                  key={key}
                  onPress={() => setSelectedLift(key)}
                  className={`${
                    selectedLift === key 
                      ? getColorClass(protocol.color)
                      : 'bg-zinc-900'
                  } rounded-xl p-4 border ${
                    selectedLift === key 
                      ? 'border-white/30'
                      : 'border-zinc-800'
                  } min-w-[160px]`}
                >
                  <Ionicons 
                    name={protocol.icon as any} 
                    size={32} 
                    color={selectedLift === key ? 'white' : '#a1a1aa'} 
                  />
                  <Text className={`${selectedLift === key ? 'text-white' : 'text-zinc-400'} font-bold mt-2`}>
                    {protocol.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-white text-xl font-bold">{currentProtocol.name}</Text>
              <Text className="text-zinc-400">
                <Ionicons name="time" size={16} color="#a1a1aa" /> {currentProtocol.totalTime}
              </Text>
            </View>

            <View className={`${getColorClass(currentProtocol.color)}/10 rounded-xl p-4 border ${getColorClass(currentProtocol.color)}/30 mb-4`}>
              <Text className="text-zinc-400 text-sm mb-1">Working Weight Example:</Text>
              <Text className="text-white text-2xl font-bold">{currentProtocol.workingWeight}</Text>
            </View>

            {currentProtocol.phases.map((phase, idx) => (
              <View key={idx} className="mb-5 last:mb-0">
                <View className="flex-row items-center justify-between mb-3">
                  <Text className="text-white font-bold text-lg">{idx + 1}. {phase.phase}</Text>
                  <Text className="text-primary text-sm font-bold">{phase.duration}</Text>
                </View>

                {phase.exercises.map((exercise, exIdx) => (
                  <View key={exIdx} className="bg-zinc-800 rounded-xl p-4 mb-2 last:mb-0">
                    <View className="flex-row justify-between items-start mb-2">
                      <Text className="text-white font-bold flex-1">{exercise.name}</Text>
                      <Text className={`text-${currentProtocol.color}-400 font-bold ml-2`}>
                        {exercise.sets}Ã—{exercise.reps}
                      </Text>
                    </View>
                    <Text className="text-zinc-400 text-sm italic">{exercise.notes}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>

          <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
            <Text className="text-white font-bold text-lg mb-3">Important Notes</Text>
            {currentProtocol.notes.map((note, idx) => (
              <View key={idx} className="flex-row items-start mb-2 last:mb-0">
                <Text className={`text-${currentProtocol.color}-400 mr-2`}>â€¢</Text>
                <Text className="text-zinc-300 text-sm flex-1">{note}</Text>
              </View>
            ))}
          </View>

          <View className="bg-amber-500/10 rounded-xl p-4 border border-amber-500/30 mb-6">
            <Text className="text-amber-400 font-bold mb-2">General Principles</Text>
            <Text className="text-amber-300 text-sm mb-2">
              â€¢ Never jump straight to working sets
            </Text>
            <Text className="text-amber-300 text-sm mb-2">
              â€¢ Increase weight gradually (jumps get smaller as weight increases)
            </Text>
            <Text className="text-amber-300 text-sm mb-2">
              â€¢ Don't fatigue yourself in warm-up (stop well before failure)
            </Text>
            <Text className="text-amber-300 text-sm mb-2">
              â€¢ More warm-up for older lifters or injury-prone
            </Text>
            <Text className="text-amber-300 text-sm">
              â€¢ Adjust based on how you feel (stiff = more mobility)
            </Text>
          </View>

          <View className="bg-red-500/10 rounded-xl p-4 border border-red-500/30 mb-6">
            <Text className="text-red-400 font-bold mb-2">Don't Skip Warm-ups!</Text>
            <Text className="text-red-300 text-sm mb-2">
              Proper warm-up reduces injury risk by 50%+
            </Text>
            <Text className="text-red-300 text-sm mb-2">
              You'll lift MORE weight with better warm-up
            </Text>
            <Text className="text-red-300 text-sm">
              15-20 min now vs weeks of injury recovery
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

