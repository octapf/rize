import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function InjuryPrevention() {
  const [selectedArea, setSelectedArea] = useState<string>('shoulder');

  const areas = [
    { key: 'shoulder', label: 'Shoulder', icon: 'fitness', color: 'blue' },
    { key: 'lowerback', label: 'Lower Back', icon: 'body', color: 'emerald' },
    { key: 'knee', label: 'Knee', icon: 'walk', color: 'purple' },
    { key: 'elbow', label: 'Elbow', icon: 'barbell', color: 'amber' },
  ];

  const injuryGuides = {
    shoulder: {
      title: 'Shoulder Health',
      commonInjuries: [
        { name: 'Rotator Cuff Strain', frequency: 'Very Common', severity: 'Moderate' },
        { name: 'Impingement', frequency: 'Common', severity: 'Moderate' },
        { name: 'AC Joint Issues', frequency: 'Common', severity: 'Mild-Moderate' },
        { name: 'Labral Tears', frequency: 'Less Common', severity: 'Severe' },
      ],
      riskFactors: [
        'Overhead pressing without proper mobility',
        'Bench press with flared elbows',
        'Lack of rear delt/rotator cuff work',
        'Poor posture (forward shoulders)',
        'Training through pain',
      ],
      preventionExercises: [
        { name: 'Face Pulls', sets: '3-4', reps: '15-20', frequency: '3x/week', notes: 'External rotation at end' },
        { name: 'Band Pull-Aparts', sets: '3', reps: '20-25', frequency: 'Daily', notes: 'Various angles' },
        { name: 'External Rotations', sets: '3', reps: '12-15', frequency: '3x/week', notes: 'Light weight, control' },
        { name: 'YTWs', sets: '3', reps: '10 each', frequency: '2x/week', notes: 'Light dumbbells' },
        { name: 'Wall Slides', sets: '3', reps: '12', frequency: 'Daily', notes: 'Scapular control' },
      ],
      techniqueKeys: [
        'Keep elbows at 45° on bench press (not 90°)',
        'Full ROM but avoid end-range under load',
        'Warm up rotator cuff before upper sessions',
        'Balance push/pull ratio (2:3 or 1:2)',
        'Stop if sharp pain occurs',
      ],
      warningsSigns: [
        'Pain during or after pressing movements',
        'Clicking/popping with movement',
        'Pain reaching behind back',
        'Night pain disturbing sleep',
        'Weakness in overhead movements',
      ],
    },
    lowerback: {
      title: 'Lower Back Protection',
      commonInjuries: [
        { name: 'Muscle Strain', frequency: 'Very Common', severity: 'Mild-Moderate' },
        { name: 'Disc Bulge/Herniation', frequency: 'Common', severity: 'Severe' },
        { name: 'Facet Joint Pain', frequency: 'Common', severity: 'Moderate' },
        { name: 'Sacroiliac Joint Dysfunction', frequency: 'Less Common', severity: 'Moderate' },
      ],
      riskFactors: [
        'Rounded back during deadlifts/squats',
        'Ego lifting (too heavy too soon)',
        'Poor core stability',
        'Excessive spinal flexion under load',
        'Lack of hip mobility',
      ],
      preventionExercises: [
        { name: 'Dead Bugs', sets: '3', reps: '10 each side', frequency: '4x/week', notes: 'Anti-extension core' },
        { name: 'Bird Dogs', sets: '3', reps: '10 each side', frequency: '4x/week', notes: 'Slow and controlled' },
        { name: 'Planks', sets: '3', reps: '30-60s', frequency: '3x/week', notes: 'Neutral spine' },
        { name: 'Reverse Hyperextensions', sets: '3', reps: '15-20', frequency: '2x/week', notes: 'Posterior chain' },
        { name: 'Hip Flexor Stretches', sets: '2', reps: '60s each', frequency: 'Daily', notes: 'Improve hip extension' },
      ],
      techniqueKeys: [
        'Neutral spine on ALL exercises',
        'Brace core before every rep',
        'Hip hinge pattern (deadlifts)',
        'Never round back under load',
        'Start light, perfect form first',
      ],
      warningsSigns: [
        'Sharp pain during lifts',
        'Radiating pain down legs',
        'Numbness or tingling in legs',
        'Pain worse with sitting',
        'Morning stiffness lasting >30 min',
      ],
    },
    knee: {
      title: 'Knee Joint Care',
      commonInjuries: [
        { name: 'Patellar Tendonitis', frequency: 'Very Common', severity: 'Moderate' },
        { name: 'Meniscus Tears', frequency: 'Common', severity: 'Moderate-Severe' },
        { name: 'ACL/MCL Sprains', frequency: 'Less Common', severity: 'Severe' },
        { name: 'Patellofemoral Pain Syndrome', frequency: 'Common', severity: 'Mild-Moderate' },
      ],
      riskFactors: [
        'Knees caving in during squats',
        'Excessive forward knee travel',
        'Weak glutes and VMO',
        'Poor ankle mobility',
        'Rapid increases in training volume',
      ],
      preventionExercises: [
        { name: 'Terminal Knee Extensions', sets: '3', reps: '20', frequency: '4x/week', notes: 'VMO activation' },
        { name: 'Split Squats', sets: '3', reps: '10 each', frequency: '2x/week', notes: 'Controlled descent' },
        { name: 'Clamshells', sets: '3', reps: '20 each', frequency: '3x/week', notes: 'Glute med strength' },
        { name: 'Single Leg RDLs', sets: '3', reps: '10 each', frequency: '2x/week', notes: 'Balance & stability' },
        { name: 'Ankle Mobility Drills', sets: '2', reps: '15', frequency: 'Daily', notes: 'Wall ankle stretch' },
      ],
      techniqueKeys: [
        'Knees track over toes (same direction)',
        'Push knees out during squats',
        'Full depth only if mobile',
        'Strengthen VMO (inner quad)',
        'Control eccentric (down) phase',
      ],
      warningsSigns: [
        'Swelling after training',
        'Pain going up/down stairs',
        'Clicking with pain',
        'Knee giving way',
        'Pain behind kneecap',
      ],
    },
    elbow: {
      title: 'Elbow Health',
      commonInjuries: [
        { name: 'Tennis Elbow (Lateral)', frequency: 'Common', severity: 'Moderate' },
        { name: 'Golfers Elbow (Medial)', frequency: 'Common', severity: 'Moderate' },
        { name: 'Bicep Tendonitis', frequency: 'Less Common', severity: 'Mild-Moderate' },
        { name: 'Tricep Tendonitis', frequency: 'Less Common', severity: 'Mild-Moderate' },
      ],
      riskFactors: [
        'Overuse of curls/extensions',
        'Grip too tight on bars',
        'Flared elbows on pressing',
        'Lack of forearm training',
        'Sudden increases in arm volume',
      ],
      preventionExercises: [
        { name: 'Wrist Curls', sets: '3', reps: '15-20', frequency: '2x/week', notes: 'Flexors and extensors' },
        { name: 'Reverse Curls', sets: '3', reps: '12-15', frequency: '2x/week', notes: 'Forearm strength' },
        { name: 'Farmers Carries', sets: '3', reps: '40s', frequency: '2x/week', notes: 'Grip strength' },
        { name: 'Hammer Curls', sets: '3', reps: '12', frequency: '2x/week', notes: 'Brachialis/forearm' },
        { name: 'Tricep Stretches', sets: '2', reps: '30s', frequency: 'Daily', notes: 'Overhead stretch' },
      ],
      techniqueKeys: [
        'Vary grip width and types',
        'Don't lock out aggressively',
        'Control tempo on curls',
        'Elbow position matters',
        'Warm up wrists and forearms',
      ],
      warningsSigns: [
        'Pain on outside/inside of elbow',
        'Pain gripping objects',
        'Weakness in wrist extension',
        'Pain radiating to forearm',
        'Difficulty straightening arm',
      ],
    },
  };

  const currentGuide = injuryGuides[selectedArea as keyof typeof injuryGuides];

  return (
    <View className="flex-1 bg-zinc-950">
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1 ml-3">
            Injury Prevention
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          <View className="bg-gradient-to-r from-red-500 to-amber-500 rounded-xl p-6 mb-6">
            <Text className="text-white text-2xl font-bold mb-2">Stay Healthy</Text>
            <Text className="text-white opacity-90 mb-4">
              Prevention is better than cure
            </Text>
            <View className="flex-row items-center">
              <Ionicons name="shield-checkmark" size={20} color="white" />
              <Text className="text-white ml-2">Lift pain-free for years</Text>
            </View>
          </View>

          <Text className="text-white font-bold mb-3">Problem Area</Text>
          <View className="flex-row flex-wrap gap-3 mb-6">
            {areas.map((area) => (
              <TouchableOpacity
                key={area.key}
                onPress={() => setSelectedArea(area.key)}
                className={`flex-1 min-w-[45%] ${
                  selectedArea === area.key ? `bg-${area.color}-500` : 'bg-zinc-900'
                } rounded-xl p-4 border ${
                  selectedArea === area.key ? `border-${area.color}-400` : 'border-zinc-800'
                }`}
              >
                <Ionicons
                  name={area.icon as any}
                  size={28}
                  color={selectedArea === area.key ? 'white' : '#71717a'}
                />
                <Text
                  className={`${
                    selectedArea === area.key ? 'text-white' : 'text-zinc-400'
                  } font-bold mt-2`}
                >
                  {area.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text className="text-white font-bold text-2xl mb-4">{currentGuide.title}</Text>

          <View className="bg-red-500/10 rounded-xl p-4 mb-6 border border-red-500/30">
            <Text className="text-red-400 font-bold mb-3">Common Injuries</Text>
            {currentGuide.commonInjuries.map((injury, idx) => (
              <View key={idx} className="bg-zinc-900 rounded-lg p-3 mb-2">
                <Text className="text-white font-bold mb-1">{injury.name}</Text>
                <View className="flex-row justify-between">
                  <Text className="text-zinc-400 text-sm">Frequency: {injury.frequency}</Text>
                  <Text className="text-amber-400 text-sm">Severity: {injury.severity}</Text>
                </View>
              </View>
            ))}
          </View>

          <View className="bg-amber-500/10 rounded-xl p-4 mb-6 border border-amber-500/30">
            <Text className="text-amber-400 font-bold mb-3">Risk Factors</Text>
            {currentGuide.riskFactors.map((factor, idx) => (
              <Text key={idx} className="text-amber-300 text-sm mb-2">
                ⚠️ {factor}
              </Text>
            ))}
          </View>

          <View className="bg-emerald-500/10 rounded-xl p-4 mb-6 border border-emerald-500/30">
            <Text className="text-emerald-400 font-bold mb-3">Prevention Exercises</Text>
            {currentGuide.preventionExercises.map((ex, idx) => (
              <View key={idx} className="bg-zinc-900 rounded-lg p-3 mb-2">
                <View className="flex-row justify-between items-center mb-2">
                  <Text className="text-white font-bold flex-1">{ex.name}</Text>
                  <Text className="text-emerald-400 font-bold text-sm">
                    {ex.sets}x{ex.reps}
                  </Text>
                </View>
                <View className="flex-row justify-between">
                  <Text className="text-zinc-400 text-xs">{ex.frequency}</Text>
                  <Text className="text-zinc-400 text-xs">{ex.notes}</Text>
                </View>
              </View>
            ))}
          </View>

          <View className="bg-blue-500/10 rounded-xl p-4 mb-6 border border-blue-500/30">
            <Text className="text-blue-400 font-bold mb-3">Technique Keys</Text>
            {currentGuide.techniqueKeys.map((key, idx) => (
              <Text key={idx} className="text-blue-300 text-sm mb-2">
                ✓ {key}
              </Text>
            ))}
          </View>

          <View className="bg-red-500/10 rounded-xl p-4 mb-6 border border-red-500/30">
            <Text className="text-red-400 font-bold mb-3">⚠️ Warning Signs - See a Doctor</Text>
            {currentGuide.warningsSigns.map((sign, idx) => (
              <Text key={idx} className="text-red-300 text-sm mb-2">
                🚨 {sign}
              </Text>
            ))}
          </View>

          <View className="bg-purple-500/10 rounded-xl p-4 border border-purple-500/30 mb-6">
            <Text className="text-purple-400 font-bold mb-2">General Prevention Rules</Text>
            <Text className="text-purple-300 text-sm">
              • Progressive overload SLOWLY{'\n'}
              • Perfect form > heavy weight{'\n'}
              • Warm up properly (10-15 min){'\n'}
              • Balance muscle groups{'\n'}
              • Listen to your body{'\n'}
              • Deload every 6-8 weeks{'\n'}
              • Sleep 7-9 hours nightly{'\n'}
              • Pain ≠ gain (stop if sharp pain)
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
