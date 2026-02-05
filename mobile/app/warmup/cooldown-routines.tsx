import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function CooldownRoutines() {
  const [selectedFocus, setSelectedFocus] = useState<string>('full');
  const [duration, setDuration] = useState<number>(10);

  const focuses = [
    { key: 'full', label: 'Full Body', icon: 'body', color: 'blue' },
    { key: 'upper', label: 'Upper Focus', icon: 'fitness', color: 'emerald' },
    { key: 'lower', label: 'Lower Focus', icon: 'walk', color: 'purple' },
  ];

  const durations = [5, 10, 15];

  const cooldownProtocols = {
    full: {
      activeRecovery: [
        { exercise: 'Light Walking', duration: '3 min', notes: 'Gradually slow pace, deep breathing' },
        { exercise: 'Arm Circles (slow)', duration: '30 sec each direction', notes: 'Gentle, controlled movement' },
      ],
      staticStretches: [
        { muscle: 'Chest', exercise: 'Doorway Pec Stretch', duration: '45 sec each side', notes: 'Elbow at 90Â°, lean forward' },
        { muscle: 'Lats', exercise: 'Lat Hang Stretch', duration: '30 sec', notes: 'Hang from bar, relax shoulders' },
        { muscle: 'Shoulders', exercise: 'Cross-body Shoulder Stretch', duration: '30 sec each', notes: 'Pull arm across chest' },
        { muscle: 'Triceps', exercise: 'Overhead Tricep Stretch', duration: '30 sec each', notes: 'Elbow behind head' },
        { muscle: 'Hip Flexors', exercise: 'Kneeling Hip Flexor Stretch', duration: '45 sec each', notes: 'Front knee at 90Â°, squeeze glute' },
        { muscle: 'Quads', exercise: 'Standing Quad Stretch', duration: '30 sec each', notes: 'Pull heel to glute, knee down' },
        { muscle: 'Hamstrings', exercise: 'Seated Hamstring Stretch', duration: '45 sec each', notes: 'Reach for toes, keep back straight' },
        { muscle: 'Glutes', exercise: 'Figure-4 Stretch', duration: '45 sec each', notes: 'Ankle on opposite knee, pull' },
        { muscle: 'Calves', exercise: 'Wall Calf Stretch', duration: '30 sec each', notes: 'Back leg straight, lean forward' },
      ],
      breathing: [
        { exercise: 'Box Breathing', duration: '2 min', notes: 'Inhale 4s, Hold 4s, Exhale 4s, Hold 4s' },
        { exercise: 'Belly Breathing', duration: '2 min', notes: 'Deep breaths into belly, slow exhale' },
      ],
      foamRolling: [
        { area: 'IT Band', duration: '60 sec each', notes: 'Roll from hip to knee, pause on tender spots' },
        { area: 'Quads', duration: '60 sec each', notes: 'Face down, roll thigh' },
        { area: 'Thoracic Spine', duration: '90 sec', notes: 'Upper back, arms crossed' },
        { area: 'Lats', duration: '45 sec each', notes: 'Side lying, arm overhead' },
      ],
    },
    upper: {
      activeRecovery: [
        { exercise: 'Light Walking', duration: '2 min', notes: 'Shake out arms gently' },
        { exercise: 'Arm Swings', duration: '1 min', notes: 'Light, pendulum-like' },
      ],
      staticStretches: [
        { muscle: 'Chest', exercise: 'Corner Pec Stretch', duration: '60 sec', notes: 'Both arms in doorframe, lean forward' },
        { muscle: 'Front Delts', exercise: 'Behind-back Clasp', duration: '45 sec', notes: 'Hands behind back, lift chest' },
        { muscle: 'Rear Delts', exercise: 'Cross-body Stretch', duration: '45 sec each', notes: 'Pull arm across, gentle pressure' },
        { muscle: 'Lats', exercise: 'Child Pose Reach', duration: '60 sec', notes: 'Knees wide, reach arms forward' },
        { muscle: 'Triceps', exercise: 'Overhead Tricep', duration: '45 sec each', notes: 'Deep stretch, other hand assists' },
        { muscle: 'Biceps', exercise: 'Wall Bicep Stretch', duration: '45 sec each', notes: 'Palm on wall, rotate body away' },
        { muscle: 'Forearms', exercise: 'Wrist Flexor Stretch', duration: '30 sec each', notes: 'Arm extended, pull fingers back' },
        { muscle: 'Neck', exercise: 'Neck Tilt Stretch', duration: '30 sec each', notes: 'Tilt head, gentle pull' },
        { muscle: 'Upper Traps', exercise: 'Trap Stretch', duration: '30 sec each', notes: 'Tilt head, opposite hand pulls' },
      ],
      breathing: [
        { exercise: 'Diaphragmatic Breathing', duration: '3 min', notes: 'Hand on belly, slow deep breaths' },
      ],
      foamRolling: [
        { area: 'Upper Back', duration: '90 sec', notes: 'Thoracic spine, arms crossed on chest' },
        { area: 'Lats', duration: '60 sec each', notes: 'Side position, arm overhead' },
        { area: 'Pecs', duration: '45 sec each', notes: 'Lacrosse ball on chest, lean into wall' },
        { area: 'Traps', duration: '45 sec each', notes: 'Ball between traps and wall' },
      ],
    },
    lower: {
      activeRecovery: [
        { exercise: 'Walking', duration: '4 min', notes: 'Very light, focus on breathing' },
        { exercise: 'Gentle Leg Swings', duration: '30 sec each', notes: 'Front/back, side to side' },
      ],
      staticStretches: [
        { muscle: 'Hip Flexors', exercise: 'Kneeling Lunge Stretch', duration: '60 sec each', notes: 'Back knee down, pelvis forward' },
        { muscle: 'Quads', exercise: 'Lying Quad Stretch', duration: '60 sec each', notes: 'Side lying, pull heel to glute' },
        { muscle: 'Hamstrings', exercise: 'Lying Hamstring Stretch', duration: '60 sec each', notes: 'Leg up, pull with band/towel' },
        { muscle: 'Glutes', exercise: 'Pigeon Pose', duration: '90 sec each', notes: 'Front shin parallel to mat if possible' },
        { muscle: 'Adductors', exercise: 'Butterfly Stretch', duration: '60 sec', notes: 'Feet together, press knees down' },
        { muscle: 'Calves', exercise: 'Downward Dog Calf Stretch', duration: '45 sec each', notes: 'Press heel down' },
        { muscle: 'Ankles', exercise: 'Ankle Circles', duration: '30 sec each', notes: 'Both directions' },
        { muscle: 'Lower Back', exercise: 'Childs Pose', duration: '90 sec', notes: 'Relax completely, deep breaths' },
        { muscle: 'Spine', exercise: 'Supine Spinal Twist', duration: '60 sec each', notes: 'Knees to side, shoulders flat' },
      ],
      breathing: [
        { exercise: '4-7-8 Breathing', duration: '3 min', notes: 'Inhale 4s, Hold 7s, Exhale 8s' },
      ],
      foamRolling: [
        { area: 'IT Band', duration: '90 sec each', notes: 'Side lying, hip to knee, slow passes' },
        { area: 'Quads', duration: '90 sec each', notes: 'Face down, pause tender spots 20s' },
        { area: 'Hamstrings', duration: '90 sec each', notes: 'Seated, roll glute to knee' },
        { area: 'Glutes', duration: '60 sec each', notes: 'Seated on roller, cross ankle over' },
        { area: 'Calves', duration: '60 sec each', notes: 'Seated, ankle to knee' },
        { area: 'Adductors', duration: '45 sec each', notes: 'Frog position, inner thigh' },
      ],
    },
  };

  const currentProtocol = cooldownProtocols[selectedFocus as keyof typeof cooldownProtocols];

  return (
    <View className="flex-1 bg-zinc-950">
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1 ml-3">
            Cool-down Routines
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          <View className="bg-gradient-to-r from-primary to-[#7D0EBE] rounded-xl p-6 mb-6">
            <Text className="text-white text-2xl font-bold mb-2">Recovery Routines</Text>
            <Text className="text-white opacity-90 mb-4">
              Proper cool-down for optimal recovery
            </Text>
            <View className="flex-row items-center">
              <Ionicons name="fitness" size={20} color="white" />
              <Text className="text-white ml-2">Reduce soreness, improve flexibility</Text>
            </View>
          </View>

          <Text className="text-white font-bold mb-3">Focus Area</Text>
          <View className="flex-row gap-3 mb-6">
            {focuses.map((focus) => (
              <TouchableOpacity
                key={focus.key}
                onPress={() => setSelectedFocus(focus.key)}
                className={`flex-1 ${
                  selectedFocus === focus.key ? `bg-${focus.color}-500` : 'bg-zinc-900'
                } rounded-xl p-4 border ${
                  selectedFocus === focus.key ? `border-${focus.color}-400` : 'border-zinc-800'
                }`}
              >
                <Ionicons
                  name={focus.icon as any}
                  size={28}
                  color={selectedFocus === focus.key ? 'white' : '#71717a'}
                />
                <Text
                  className={`${
                    selectedFocus === focus.key ? 'text-white' : 'text-zinc-400'
                  } font-bold mt-2`}
                >
                  {focus.label}
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

          <View className="bg-primary/10 rounded-xl p-4 mb-6 border border-primary/30">
            <View className="flex-row items-center mb-2">
              <Ionicons name="walk" size={20} color="#9D12DE" />
              <Text className="text-primary/80 font-bold ml-2">Phase 1: Active Recovery</Text>
            </View>
            <Text className="text-zinc-400 text-sm mb-3">Gradually lower heart rate</Text>
            
            {currentProtocol.activeRecovery.map((ex, idx) => (
              <View key={idx} className="bg-zinc-900 rounded-lg p-3 mb-2">
                <View className="flex-row justify-between items-center mb-1">
                  <Text className="text-white font-bold flex-1">{ex.exercise}</Text>
                  <Text className="text-primary/80 font-bold">{ex.duration}</Text>
                </View>
                <Text className="text-zinc-500 text-xs">{ex.notes}</Text>
              </View>
            ))}
          </View>

          <View className="bg-primary/10 rounded-xl p-4 mb-6 border border-primary/30">
            <View className="flex-row items-center mb-2">
              <Ionicons name="body" size={20} color="#9D12DE" />
              <Text className="text-primary font-bold ml-2">Phase 2: Static Stretching</Text>
            </View>
            <Text className="text-zinc-400 text-sm mb-3">Hold each stretch, don't bounce</Text>
            
            {currentProtocol.staticStretches.map((stretch, idx) => (
              <View key={idx} className="bg-zinc-900 rounded-lg p-3 mb-2">
                <View className="flex-row justify-between items-center mb-1">
                  <View className="flex-1">
                    <Text className="text-primary text-xs font-bold">{stretch.muscle}</Text>
                    <Text className="text-white font-bold">{stretch.exercise}</Text>
                  </View>
                  <Text className="text-primary font-bold text-sm">{stretch.duration}</Text>
                </View>
                <Text className="text-zinc-500 text-xs">{stretch.notes}</Text>
              </View>
            ))}
          </View>

          <View className="bg-purple-500/10 rounded-xl p-4 mb-6 border border-purple-500/30">
            <View className="flex-row items-center mb-2">
              <Ionicons name="cloud" size={20} color="#a855f7" />
              <Text className="text-purple-400 font-bold ml-2">Phase 3: Breathing & Relaxation</Text>
            </View>
            <Text className="text-zinc-400 text-sm mb-3">Activate parasympathetic nervous system</Text>
            
            {currentProtocol.breathing.map((breath, idx) => (
              <View key={idx} className="bg-zinc-900 rounded-lg p-3 mb-2">
                <View className="flex-row justify-between items-center mb-1">
                  <Text className="text-white font-bold flex-1">{breath.exercise}</Text>
                  <Text className="text-purple-400 font-bold">{breath.duration}</Text>
                </View>
                <Text className="text-zinc-500 text-xs">{breath.notes}</Text>
              </View>
            ))}
          </View>

          <View className="bg-amber-500/10 rounded-xl p-4 mb-6 border border-amber-500/30">
            <View className="flex-row items-center mb-2">
              <Ionicons name="fitness" size={20} color="#FFEA00" />
              <Text className="text-amber-400 font-bold ml-2">Optional: Foam Rolling</Text>
            </View>
            <Text className="text-zinc-400 text-sm mb-3">Myofascial release for recovery</Text>
            
            {currentProtocol.foamRolling.map((roll, idx) => (
              <View key={idx} className="bg-zinc-900 rounded-lg p-3 mb-2">
                <View className="flex-row justify-between items-center mb-1">
                  <Text className="text-white font-bold flex-1">{roll.area}</Text>
                  <Text className="text-amber-400 font-bold text-sm">{roll.duration}</Text>
                </View>
                <Text className="text-zinc-500 text-xs">{roll.notes}</Text>
              </View>
            ))}
          </View>

          <View className="bg-red-500/10 rounded-xl p-4 border border-red-500/30 mb-6">
            <Text className="text-red-400 font-bold mb-2">Cool-down Benefits</Text>
            <Text className="text-red-300 text-sm">
              â€¢ Reduces DOMS (muscle soreness){'\n'}
              â€¢ Improves flexibility over time{'\n'}
              â€¢ Prevents blood pooling{'\n'}
              â€¢ Aids in waste product removal{'\n'}
              â€¢ Signals body to start recovery{'\n'}
              â€¢ 10-15 min investment = faster recovery
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

