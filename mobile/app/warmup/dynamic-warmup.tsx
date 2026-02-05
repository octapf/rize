import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function WarmupGenerator() {
  const [selectedWorkout, setSelectedWorkout] = useState<string>('upper');
  const [duration, setDuration] = useState<number>(10);

  const workoutTypes = [
    { key: 'upper', label: 'Upper Body', icon: 'fitness', color: 'blue' },
    { key: 'lower', label: 'Lower Body', icon: 'walk', color: 'emerald' },
    { key: 'push', label: 'Push Day', icon: 'arrow-up', color: 'purple' },
    { key: 'pull', label: 'Pull Day', icon: 'arrow-down', color: 'amber' },
  ];

  const durations = [5, 10, 15];

  const warmupProtocols = {
    upper: {
      generalWarmup: [
        { exercise: 'Jump Rope', duration: '2 min', sets: 1, notes: 'Light pace, get heart rate up' },
        { exercise: 'Arm Circles', duration: '30 sec each direction', sets: 1, notes: 'Forward then backward' },
        { exercise: 'Torso Twists', duration: '1 min', sets: 1, notes: 'Standing, arms out' },
      ],
      mobilityDrills: [
        { exercise: 'Shoulder Dislocations', reps: 10, sets: 2, notes: 'Use band or PVC pipe' },
        { exercise: 'Wall Slides', reps: 12, sets: 2, notes: 'Back against wall' },
        { exercise: 'Band Pull-Aparts', reps: 15, sets: 2, notes: 'Shoulder height, control' },
        { exercise: 'Scapular Push-ups', reps: 10, sets: 2, notes: 'Just scapula movement' },
      ],
      activation: [
        { exercise: 'Face Pulls (light)', reps: 15, sets: 2, notes: 'Focus on rear delts' },
        { exercise: 'External Rotations', reps: 12, sets: 2, notes: 'Each arm, light band' },
        { exercise: 'Push-up Plus', reps: 10, sets: 2, notes: 'Extra scapular protraction' },
      ],
      rampingSets: [
        { weight: 'Empty Bar', reps: 10, sets: 1, rest: '30s', notes: 'Focus on form' },
        { weight: '40%', reps: 8, sets: 1, rest: '45s', notes: 'Working weight %' },
        { weight: '60%', reps: 5, sets: 1, rest: '60s', notes: 'Increase speed' },
        { weight: '80%', reps: 2, sets: 1, rest: '90s', notes: 'Near working weight' },
      ],
    },
    lower: {
      generalWarmup: [
        { exercise: 'Light Jog or March', duration: '3 min', sets: 1, notes: 'Gradual increase pace' },
        { exercise: 'Leg Swings (Front/Back)', duration: '30 sec each leg', sets: 1, notes: 'Hold wall for balance' },
        { exercise: 'Leg Swings (Side to Side)', duration: '30 sec each leg', sets: 1, notes: 'Loosen hip adductors' },
      ],
      mobilityDrills: [
        { exercise: 'Hip Circles', reps: 10, sets: 2, notes: 'Each direction, each leg' },
        { exercise: 'Glute Bridges', reps: 15, sets: 2, notes: 'Squeeze at top, 2 sec hold' },
        { exercise: 'Cossack Squats', reps: 8, sets: 2, notes: 'Each side, bodyweight' },
        { exercise: 'Ankle Pumps', reps: 20, sets: 2, notes: 'Point and flex' },
        { exercise: 'Walking Lunges', reps: 10, sets: 2, notes: 'Each leg, controlled' },
      ],
      activation: [
        { exercise: 'Lateral Band Walks', reps: 15, sets: 2, notes: 'Each direction, band above knees' },
        { exercise: 'Single Leg Glute Bridge', reps: 10, sets: 2, notes: 'Each leg' },
        { exercise: 'Bodyweight Squats', reps: 15, sets: 2, notes: 'Full ROM, pause at bottom' },
      ],
      rampingSets: [
        { weight: 'Empty Bar', reps: 10, sets: 1, rest: '30s', notes: 'Perfect form' },
        { weight: '40%', reps: 8, sets: 1, rest: '45s', notes: 'Working weight %' },
        { weight: '60%', reps: 5, sets: 1, rest: '60s', notes: 'Feel the weight' },
        { weight: '80%', reps: 3, sets: 1, rest: '90s', notes: 'Almost there' },
      ],
    },
    push: {
      generalWarmup: [
        { exercise: 'Jumping Jacks', duration: '2 min', sets: 1, notes: 'Full range of motion' },
        { exercise: 'Arm Circles', duration: '1 min', sets: 1, notes: 'Both directions' },
        { exercise: 'Inchworms', reps: 8, sets: 1, notes: 'Walk hands out to plank' },
      ],
      mobilityDrills: [
        { exercise: 'Shoulder Pass-Throughs', reps: 10, sets: 2, notes: 'Band or stick' },
        { exercise: 'Thread the Needle', reps: 8, sets: 2, notes: 'Each side, thoracic rotation' },
        { exercise: 'Cat-Cow Stretch', reps: 10, sets: 2, notes: 'Spinal mobility' },
        { exercise: 'Wrist Circles', reps: 10, sets: 2, notes: 'Each direction' },
      ],
      activation: [
        { exercise: 'Band Pull-Aparts', reps: 20, sets: 2, notes: 'Rear delt activation' },
        { exercise: 'Incline Push-ups', reps: 12, sets: 2, notes: 'Bench or box' },
        { exercise: 'Overhead Press (empty bar)', reps: 10, sets: 2, notes: 'Strict form' },
      ],
      rampingSets: [
        { weight: 'Bar Only', reps: 12, sets: 1, rest: '30s', notes: 'Bench press pattern' },
        { weight: '50%', reps: 8, sets: 1, rest: '45s', notes: 'Feel the groove' },
        { weight: '70%', reps: 5, sets: 1, rest: '60s', notes: 'Controlled reps' },
        { weight: '85%', reps: 2, sets: 1, rest: '90s', notes: 'Ready for work sets' },
      ],
    },
    pull: {
      generalWarmup: [
        { exercise: 'Rowing Machine', duration: '3 min', sets: 1, notes: 'Easy pace' },
        { exercise: 'Arm Swings', duration: '1 min', sets: 1, notes: 'Across body and back' },
        { exercise: 'Band Lat Pull-downs', reps: 15, sets: 1, notes: 'Light resistance' },
      ],
      mobilityDrills: [
        { exercise: 'Hanging Scapular Shrugs', reps: 10, sets: 2, notes: 'Active hang, just scapula' },
        { exercise: 'Band Face Pulls', reps: 15, sets: 2, notes: 'External rotation focus' },
        { exercise: 'Dead Hangs', duration: '20 sec', sets: 2, notes: 'Decompress spine' },
        { exercise: 'YTW Raises', reps: 8, sets: 2, notes: 'Each position, light DBs' },
      ],
      activation: [
        { exercise: 'Inverted Rows', reps: 12, sets: 2, notes: 'Horizontal pull' },
        { exercise: 'Band Pull-Aparts', reps: 20, sets: 2, notes: 'Rear delt/mid traps' },
        { exercise: 'Lat Prayer Stretch', duration: '30 sec', sets: 2, notes: 'Active stretch' },
      ],
      rampingSets: [
        { weight: 'Light Band', reps: 10, sets: 1, rest: '30s', notes: 'Pull-up or row pattern' },
        { weight: '40%', reps: 8, sets: 1, rest: '45s', notes: 'Working weight %' },
        { weight: '60%', reps: 5, sets: 1, rest: '60s', notes: 'Engage lats fully' },
        { weight: '80%', reps: 2, sets: 1, rest: '90s', notes: 'Prime CNS' },
      ],
    },
  };

  const currentProtocol = warmupProtocols[selectedWorkout as keyof typeof warmupProtocols];

  return (
    <View className="flex-1 bg-zinc-950">
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1 ml-3">
            Warm-up Generator
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          <View className="bg-gradient-to-r from-amber-500 to-red-500 rounded-xl p-6 mb-6">
            <Text className="text-white text-2xl font-bold mb-2">Dynamic Warm-up</Text>
            <Text className="text-white opacity-90 mb-4">
              Prep your body for peak performance
            </Text>
            <View className="flex-row items-center">
              <Ionicons name="flame" size={20} color="white" />
              <Text className="text-white ml-2">Prevent injuries, lift better</Text>
            </View>
          </View>

          <Text className="text-white font-bold mb-3">Workout Type</Text>
          <View className="flex-row flex-wrap gap-3 mb-6">
            {workoutTypes.map((type) => (
              <TouchableOpacity
                key={type.key}
                onPress={() => setSelectedWorkout(type.key)}
                className={`flex-1 min-w-[45%] ${
                  selectedWorkout === type.key ? `bg-${type.color}-500` : 'bg-zinc-900'
                } rounded-xl p-4 border ${
                  selectedWorkout === type.key ? `border-${type.color}-400` : 'border-zinc-800'
                }`}
              >
                <Ionicons
                  name={type.icon as any}
                  size={28}
                  color={selectedWorkout === type.key ? 'white' : '#71717a'}
                />
                <Text
                  className={`${
                    selectedWorkout === type.key ? 'text-white' : 'text-zinc-400'
                  } font-bold mt-2`}
                >
                  {type.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text className="text-white font-bold mb-3">Duration</Text>
          <View className="flex-row gap-3 mb-6">
            {durations.map((dur) => (
              <TouchableOpacity
                key={dur}
                onPress={() => setDuration(dur)}
                className={`flex-1 ${
                  duration === dur ? 'bg-primary' : 'bg-zinc-900'
                } rounded-xl py-3 border ${
                  duration === dur ? 'border-primary' : 'border-zinc-800'
                }`}
              >
                <Text
                  className={`${
                    duration === dur ? 'text-white' : 'text-zinc-400'
                  } font-bold text-center`}
                >
                  {dur} min
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View className="bg-amber-500/10 rounded-xl p-4 mb-6 border border-amber-500/30">
            <View className="flex-row items-center mb-2">
              <Ionicons name="time" size={20} color="#FFEA00" />
              <Text className="text-amber-400 font-bold ml-2">Phase 1: General Warm-up (2-3 min)</Text>
            </View>
            <Text className="text-zinc-400 text-sm mb-3">Increase heart rate and body temperature</Text>
            
            {currentProtocol.generalWarmup.map((ex, idx) => (
              <View key={idx} className="bg-zinc-900 rounded-lg p-3 mb-2">
                <View className="flex-row justify-between items-center mb-1">
                  <Text className="text-white font-bold flex-1">{ex.exercise}</Text>
                  <Text className="text-amber-400 font-bold">{ex.duration || `${ex.reps} reps`}</Text>
                </View>
                <Text className="text-zinc-500 text-xs">{ex.notes}</Text>
              </View>
            ))}
          </View>

          <View className="bg-primary/10 rounded-xl p-4 mb-6 border border-primary/30">
            <View className="flex-row items-center mb-2">
              <Ionicons name="body" size={20} color="#9D12DE" />
              <Text className="text-primary/80 font-bold ml-2">Phase 2: Mobility Drills (3-5 min)</Text>
            </View>
            <Text className="text-zinc-400 text-sm mb-3">Joint-specific mobility work</Text>
            
            {currentProtocol.mobilityDrills.map((ex, idx) => (
              <View key={idx} className="bg-zinc-900 rounded-lg p-3 mb-2">
                <View className="flex-row justify-between items-center mb-1">
                  <Text className="text-white font-bold flex-1">{ex.exercise}</Text>
                  <Text className="text-primary/80 font-bold">
                    {ex.sets}x{ex.reps || ex.duration}
                  </Text>
                </View>
                <Text className="text-zinc-500 text-xs">{ex.notes}</Text>
              </View>
            ))}
          </View>

          <View className="bg-primary/10 rounded-xl p-4 mb-6 border border-primary/30">
            <View className="flex-row items-center mb-2">
              <Ionicons name="flash" size={20} color="#9D12DE" />
              <Text className="text-primary font-bold ml-2">Phase 3: Activation (2-3 min)</Text>
            </View>
            <Text className="text-zinc-400 text-sm mb-3">Wake up target muscles</Text>
            
            {currentProtocol.activation.map((ex, idx) => (
              <View key={idx} className="bg-zinc-900 rounded-lg p-3 mb-2">
                <View className="flex-row justify-between items-center mb-1">
                  <Text className="text-white font-bold flex-1">{ex.exercise}</Text>
                  <Text className="text-primary font-bold">
                    {ex.sets}x{ex.reps || ex.duration}
                  </Text>
                </View>
                <Text className="text-zinc-500 text-xs">{ex.notes}</Text>
              </View>
            ))}
          </View>

          <View className="bg-purple-500/10 rounded-xl p-4 mb-6 border border-purple-500/30">
            <View className="flex-row items-center mb-2">
              <Ionicons name="barbell" size={20} color="#a855f7" />
              <Text className="text-purple-400 font-bold ml-2">Phase 4: Ramping Sets (3-5 min)</Text>
            </View>
            <Text className="text-zinc-400 text-sm mb-3">Progressive load to working weight</Text>
            
            {currentProtocol.rampingSets.map((set, idx) => (
              <View key={idx} className="bg-zinc-900 rounded-lg p-3 mb-2">
                <View className="flex-row justify-between items-center mb-1">
                  <View className="flex-1">
                    <Text className="text-white font-bold">{set.weight}</Text>
                    <Text className="text-zinc-500 text-xs">{set.notes}</Text>
                  </View>
                  <View className="items-end">
                    <Text className="text-purple-400 font-bold">{set.reps} reps</Text>
                    <Text className="text-zinc-500 text-xs">Rest {set.rest}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>

          <View className="bg-red-500/10 rounded-xl p-4 border border-red-500/30 mb-6">
            <Text className="text-red-400 font-bold mb-2">Warm-up Rules</Text>
            <Text className="text-red-300 text-sm">
              • Never skip warm-up{'\n'}
              • 10-15 min minimum{'\n'}
              • Break a sweat before lifting{'\n'}
              • Focus on workout-specific movements{'\n'}
              • Ramping sets prime your nervous system{'\n'}
              • Warm up = better performance + injury prevention
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

