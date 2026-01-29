import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Biomechanics() {
  const [selectedLift, setSelectedLift] = useState('squat');

  const lifts = ['squat', 'bench', 'deadlift', 'ohp'];

  const biomechanicsData = {
    squat: {
      name: 'Squat Biomechanics',
      icon: 'fitness' as const,
      color: 'blue',
      movement_pattern: 'Bilateral hip and knee extension',
      primary_movers: [
        { muscle: 'Quadriceps', role: 'Knee extension', contribution: '40%' },
        { muscle: 'Glutes', role: 'Hip extension', contribution: '30%' },
        { muscle: 'Hamstrings', role: 'Hip extension support', contribution: '15%' },
        { muscle: 'Adductors', role: 'Hip stability', contribution: '10%' },
        { muscle: 'Erector Spinae', role: 'Spinal stability', contribution: '5%' },
      ],
      phases: [
        {
          phase: 'Descent (Eccentric)',
          duration: '2-3 seconds',
          mechanics: [
            'Hip and knee flex simultaneously',
            'Maintain upright torso (high bar) or forward lean (low bar)',
            'Bar path: straight line over mid-foot',
            'Knees track over toes',
            'Weight on mid-foot to heel',
          ],
          common_errors: ['Knees cave inward (valgus)', 'Heels lift', 'Excessive forward lean', 'Losing tightness'],
        },
        {
          phase: 'Bottom Position',
          duration: '0.5-1 second',
          mechanics: [
            'Depth: hip crease below knee',
            'Maintain bracing',
            'Knees remain stable',
            'Chest up, eyes forward',
            'Prepare for reversal',
          ],
          common_errors: ['Relaxing at bottom', 'Butt wink (posterior pelvic tilt)', 'Knees collapse', 'Forward shift'],
        },
        {
          phase: 'Ascent (Concentric)',
          duration: '1-2 seconds',
          mechanics: [
            'Drive through mid-foot',
            'Hips and chest rise together',
            'Maintain knee position',
            'Exhale through sticking point',
            'Lockout hips and knees simultaneously',
          ],
          common_errors: ['Hips rise faster than chest', 'Knees shift forward', 'Losing bar path', 'Early exhale'],
        },
      ],
      leverage_factors: [
        {
          factor: 'Femur Length',
          impact: 'Longer femurs = more forward lean needed',
          adaptation: 'Low bar position, wider stance',
        },
        {
          factor: 'Torso Length',
          impact: 'Shorter torso = more upright possible',
          adaptation: 'High bar, narrow stance',
        },
        {
          factor: 'Ankle Mobility',
          impact: 'Limited mobility = heels lift or forward lean',
          adaptation: 'Heel wedge, mobility work, low bar',
        },
      ],
      sticking_points: [
        {
          point: 'Just above parallel',
          cause: 'Quadriceps weakness, shifting weight to toes',
          fix: 'Pause squats, leg extensions, cue "spread the floor"',
        },
        {
          point: 'Mid-range',
          cause: 'Hip drive weakness, glute weakness',
          fix: 'Box squats, hip thrusts, Romanian deadlifts',
        },
      ],
    },
    bench: {
      name: 'Bench Press Biomechanics',
      icon: 'barbell' as const,
      color: 'red',
      movement_pattern: 'Horizontal pressing with scapular retraction',
      primary_movers: [
        { muscle: 'Pectoralis Major', role: 'Horizontal adduction', contribution: '45%' },
        { muscle: 'Anterior Deltoid', role: 'Shoulder flexion', contribution: '25%' },
        { muscle: 'Triceps', role: 'Elbow extension', contribution: '25%' },
        { muscle: 'Lats', role: 'Stability and bar path', contribution: '5%' },
      ],
      phases: [
        {
          phase: 'Setup',
          duration: 'Before unrack',
          mechanics: [
            'Retract and depress scapulae',
            'Create arch in upper back',
            'Feet flat, drive into ground',
            'Grip width: forearms vertical at bottom',
            'Hands over elbows over shoulders',
          ],
          common_errors: ['Flat back on bench', 'Feet not planted', 'Grip too wide/narrow', 'Shoulders protracted'],
        },
        {
          phase: 'Descent (Eccentric)',
          duration: '2-3 seconds',
          mechanics: [
            'Pull bar to chest (don\'t just lower)',
            'Elbows 45-75° from torso',
            'Touch lower chest/sternum',
            'Maintain arch and leg drive',
            'Inhale and hold',
          ],
          common_errors: ['Bar drifts toward face', 'Elbows flare 90°', 'Bouncing', 'Losing tightness'],
        },
        {
          phase: 'Ascent (Concentric)',
          duration: '1-2 seconds',
          mechanics: [
            'Explode from chest',
            'Drive bar back toward rack (J-curve)',
            'Maintain scapular retraction',
            'Leg drive throughout',
            'Lock out over shoulders',
          ],
          common_errors: ['Straight bar path (should arc)', 'Losing leg drive', 'Butt comes up', 'Uneven lockout'],
        },
      ],
      leverage_factors: [
        {
          factor: 'Arm Length',
          impact: 'Longer arms = more ROM, harder lockout',
          adaptation: 'Wider grip, focus on tricep strength',
        },
        {
          factor: 'Chest Thickness',
          impact: 'Thicker chest = shorter ROM',
          adaptation: 'Natural advantage, maximize arch',
        },
        {
          factor: 'Shoulder Width',
          impact: 'Wider shoulders = more pec activation possible',
          adaptation: 'Wider grip = more pecs, narrow = more triceps',
        },
      ],
      sticking_points: [
        {
          point: '2-3 inches off chest',
          cause: 'Weak pecs, losing tightness',
          fix: 'Paused bench, spoto press, focus on staying tight',
        },
        {
          point: 'Mid-range to lockout',
          cause: 'Weak triceps',
          fix: 'Close-grip bench, board press, overhead tricep work',
        },
      ],
    },
    deadlift: {
      name: 'Deadlift Biomechanics',
      icon: 'barbell' as const,
      color: 'purple',
      movement_pattern: 'Hip hinge with spinal stability',
      primary_movers: [
        { muscle: 'Glutes', role: 'Hip extension', contribution: '35%' },
        { muscle: 'Hamstrings', role: 'Hip extension', contribution: '25%' },
        { muscle: 'Erector Spinae', role: 'Maintain spinal position', contribution: '20%' },
        { muscle: 'Quadriceps', role: 'Knee extension (off floor)', contribution: '10%' },
        { muscle: 'Lats', role: 'Keep bar close', contribution: '5%' },
        { muscle: 'Traps/Grip', role: 'Hold the bar', contribution: '5%' },
      ],
      phases: [
        {
          phase: 'Setup',
          duration: 'Before lift',
          mechanics: [
            'Feet hip width, under bar',
            'Bar over mid-foot',
            'Grip outside legs',
            'Shoulders over or slightly in front of bar',
            'Neutral spine, chest up',
            'Take slack out of bar',
          ],
          common_errors: ['Bar too far from shins', 'Hips too low (squat)', 'Rounded back', 'Not tight before pull'],
        },
        {
          phase: 'Floor to Knees',
          duration: '0.5-1 second',
          mechanics: [
            'Push floor away with legs',
            'Bar stays against shins',
            'Shoulders stay over bar',
            'Back angle constant',
            'Knees extend first',
          ],
          common_errors: ['Hips rise too fast', 'Bar drifts forward', 'Yanking/jerking', 'Losing neutral spine'],
        },
        {
          phase: 'Knees to Lockout',
          duration: '0.5-1 second',
          mechanics: [
            'Drive hips forward',
            'Chest up',
            'Bar travels up thighs',
            'Lock out hips and knees together',
            'Shoulders back, standing tall',
          ],
          common_errors: ['Hyperextending back', 'Bar drifts away', 'Hitching', 'Incomplete lockout'],
        },
      ],
      leverage_factors: [
        {
          factor: 'Torso/Leg Ratio',
          impact: 'Long torso + short legs = advantage',
          adaptation: 'Conventional likely best',
        },
        {
          factor: 'Arm Length',
          impact: 'Longer arms = less ROM, easier grip',
          adaptation: 'Natural advantage',
        },
        {
          factor: 'Hip Structure',
          impact: 'Wide hips = sumo advantage, narrow = conventional',
          adaptation: 'Test both styles',
        },
      ],
      sticking_points: [
        {
          point: 'Off the floor',
          cause: 'Weak quads, poor position',
          fix: 'Deficit deadlifts, pause just off floor, leg strength',
        },
        {
          point: 'Knee level',
          cause: 'Weak lockout, glute/hamstring weakness',
          fix: 'Rack pulls, Romanian deadlifts, hip thrusts',
        },
      ],
    },
    ohp: {
      name: 'Overhead Press Biomechanics',
      icon: 'body' as const,
      color: 'emerald',
      movement_pattern: 'Vertical pressing with full body tension',
      primary_movers: [
        { muscle: 'Anterior Deltoid', role: 'Shoulder flexion', contribution: '50%' },
        { muscle: 'Lateral Deltoid', role: 'Shoulder abduction', contribution: '20%' },
        { muscle: 'Triceps', role: 'Elbow extension', contribution: '20%' },
        { muscle: 'Upper Chest', role: 'Shoulder flexion assist', contribution: '5%' },
        { muscle: 'Core', role: 'Prevent hyperextension', contribution: '5%' },
      ],
      phases: [
        {
          phase: 'Setup',
          duration: 'Before press',
          mechanics: [
            'Grip just outside shoulders',
            'Bar rests on front delts',
            'Elbows slightly in front of bar',
            'Feet hip width',
            'Brace core hard',
            'Glutes tight',
          ],
          common_errors: ['Bar too high on chest', 'Elbows behind bar', 'Weak core', 'Feet too wide'],
        },
        {
          phase: 'Ascent (Concentric)',
          duration: '1-2 seconds',
          mechanics: [
            'Press bar up and slightly back',
            'Head moves back (bar doesn\'t go around)',
            'Lock elbows overhead',
            'Bar finishes over mid-foot',
            'Head returns through',
            'Shrug at top',
          ],
          common_errors: ['Pressing around head', 'Excessive layback', 'Incomplete lockout', 'Elbows not locked'],
        },
        {
          phase: 'Descent (Eccentric)',
          duration: '1-2 seconds',
          mechanics: [
            'Control bar down',
            'Head back again',
            'Bar returns to front delts',
            'Maintain tension',
            'Reset and repeat',
          ],
          common_errors: ['Dropping bar', 'Bouncing', 'Losing tightness', 'Bar path too far forward'],
        },
      ],
      leverage_factors: [
        {
          factor: 'Arm Length',
          impact: 'Longer arms = more ROM, weaker leverage',
          adaptation: 'Need stronger shoulders, more volume',
        },
        {
          factor: 'Shoulder Width',
          impact: 'Wider = better leverage',
          adaptation: 'Narrow shoulders need more work',
        },
        {
          factor: 'Thoracic Mobility',
          impact: 'Poor mobility = can\'t get bar overhead safely',
          adaptation: 'Mobility work essential',
        },
      ],
      sticking_points: [
        {
          point: 'Just above head',
          cause: 'Weak front delts, bar path too far forward',
          fix: 'Pin press, tempo press, focus on vertical path',
        },
        {
          point: 'Lockout',
          cause: 'Weak triceps or insufficient shoulder mobility',
          fix: 'Close-grip bench, overhead extensions, mobility work',
        },
      ],
    },
  };

  const currentLift = biomechanicsData[selectedLift as keyof typeof biomechanicsData];

  return (
    <View className="flex-1 bg-zinc-950">
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1 ml-3">
            Biomechanics
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          <View className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl p-6 mb-6">
            <Text className="text-white text-2xl font-bold mb-2">Movement Science</Text>
            <Text className="text-white opacity-90">
              Understand how lifts work
            </Text>
          </View>

          <View className="mb-6">
            <Text className="text-white font-bold mb-3">Select Lift</Text>
            <View className="flex-row gap-2">
              {lifts.map((lift) => (
                <TouchableOpacity
                  key={lift}
                  onPress={() => setSelectedLift(lift)}
                  className={`flex-1 ${
                    selectedLift === lift ? 'bg-blue-500' : 'bg-zinc-800'
                  } rounded-xl px-3 py-3 border ${
                    selectedLift === lift ? 'border-blue-400' : 'border-zinc-700'
                  }`}
                >
                  <Text className="text-white font-bold text-center uppercase text-xs">
                    {lift}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View className={`bg-${currentLift.color}-500/10 rounded-xl p-5 mb-6 border border-${currentLift.color}-500/30`}>
            <View className="flex-row items-center mb-3">
              <Ionicons name={currentLift.icon} size={28} color={`#${
                currentLift.color === 'blue' ? '3b82f6' :
                currentLift.color === 'red' ? 'ef4444' :
                currentLift.color === 'purple' ? 'a855f7' :
                '10b981'
              }`} />
              <Text className={`text-${currentLift.color}-400 font-bold text-xl ml-3`}>
                {currentLift.name}
              </Text>
            </View>
            <View className="bg-zinc-900 rounded-xl p-3">
              <Text className="text-zinc-400 text-sm">Movement Pattern</Text>
              <Text className="text-white font-bold">{currentLift.movement_pattern}</Text>
            </View>
          </View>

          <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
            <Text className="text-white font-bold text-lg mb-4">Primary Movers</Text>
            {currentLift.primary_movers.map((mover, idx) => (
              <View key={idx} className="bg-zinc-800 rounded-xl p-4 mb-3 last:mb-0">
                <View className="flex-row justify-between items-center mb-2">
                  <Text className="text-emerald-400 font-bold">{mover.muscle}</Text>
                  <Text className="text-emerald-400 font-bold">{mover.contribution}</Text>
                </View>
                <Text className="text-zinc-400 text-sm">{mover.role}</Text>
                <View className="mt-2 h-2 bg-zinc-700 rounded-full overflow-hidden">
                  <View 
                    className="h-full bg-emerald-500 rounded-full"
                    style={{ width: mover.contribution }}
                  />
                </View>
              </View>
            ))}
          </View>

          <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
            <Text className="text-white font-bold text-lg mb-4">Movement Phases</Text>
            {currentLift.phases.map((phase, idx) => (
              <View key={idx} className={`bg-${currentLift.color}-500/10 rounded-xl p-4 mb-4 last:mb-0 border border-${currentLift.color}-500/30`}>
                <View className="flex-row justify-between items-center mb-2">
                  <Text className={`text-${currentLift.color}-400 font-bold text-lg`}>
                    {phase.phase}
                  </Text>
                  <Text className="text-zinc-400 text-sm">{phase.duration}</Text>
                </View>

                <View className="bg-zinc-900 rounded-xl p-3 mb-2">
                  <Text className="text-white font-bold mb-2">Mechanics</Text>
                  {phase.mechanics.map((mech, midx) => (
                    <View key={midx} className="flex-row items-start mb-1 last:mb-0">
                      <Text className="text-emerald-400 mr-2">•</Text>
                      <Text className="text-zinc-300 text-sm flex-1">{mech}</Text>
                    </View>
                  ))}
                </View>

                <View className="bg-red-500/10 rounded-xl p-3 border border-red-500/30">
                  <Text className="text-red-400 font-bold text-sm mb-1">Common Errors</Text>
                  {phase.common_errors.map((error, eidx) => (
                    <Text key={eidx} className="text-red-300 text-sm mb-1 last:mb-0">
                      × {error}
                    </Text>
                  ))}
                </View>
              </View>
            ))}
          </View>

          <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
            <Text className="text-white font-bold text-lg mb-4">Leverage Factors</Text>
            {currentLift.leverage_factors.map((factor, idx) => (
              <View key={idx} className="bg-zinc-800 rounded-xl p-4 mb-3 last:mb-0">
                <Text className="text-blue-400 font-bold mb-2">{factor.factor}</Text>
                <Text className="text-zinc-300 text-sm mb-2">
                  Impact: {factor.impact}
                </Text>
                <Text className="text-emerald-400 text-sm">
                  ✓ Adaptation: {factor.adaptation}
                </Text>
              </View>
            ))}
          </View>

          <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
            <Text className="text-white font-bold text-lg mb-4">Common Sticking Points</Text>
            {currentLift.sticking_points.map((stick, idx) => (
              <View key={idx} className="bg-amber-500/10 rounded-xl p-4 mb-3 last:mb-0 border border-amber-500/30">
                <Text className="text-amber-400 font-bold mb-2">{stick.point}</Text>
                <Text className="text-zinc-300 text-sm mb-2">
                  Cause: {stick.cause}
                </Text>
                <Text className="text-emerald-400 text-sm">
                  Fix: {stick.fix}
                </Text>
              </View>
            ))}
          </View>

          <View className="bg-blue-500/10 rounded-xl p-4 border border-blue-500/30 mb-6">
            <Text className="text-blue-400 font-bold mb-2">Key Principles</Text>
            <Text className="text-blue-300 text-sm mb-2">
              • Biomechanics determine optimal technique for YOUR body
            </Text>
            <Text className="text-blue-300 text-sm mb-2">
              • Leverage differences explain why form varies between lifters
            </Text>
            <Text className="text-blue-300 text-sm mb-2">
              • Address weak points with specific accessories
            </Text>
            <Text className="text-blue-300 text-sm">
              • Film your lifts to identify mechanical inefficiencies
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
