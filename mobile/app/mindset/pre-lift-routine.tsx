import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function PreLiftRoutine() {
  const [selectedLift, setSelectedLift] = useState('squat');

  const routineData = {
    squat: {
      name: 'Squat Routine',
      icon: 'fitness',
      color: 'blue',
      phases: [
        {
          phase: 'Approach (10-15 seconds)',
          actions: [
            { action: 'Walk to bar with purpose', mental: 'Confident stride, no hesitation' },
            { action: 'Stand behind bar, visualize', mental: 'See perfect rep in mind' },
            { action: 'Chalk hands if needed', mental: 'Ritual, gets you in state' },
            { action: 'Deep breath, commit', mental: '"This is mine, let\'s go"' },
          ],
          keys: ['Consistency', 'Confidence', 'Commitment'],
        },
        {
          phase: 'Setup (15-20 seconds)',
          actions: [
            { action: 'Step under bar', mental: 'Same position every time' },
            { action: 'Bar settles in groove on back', mental: 'Feel it lock in place' },
            { action: 'Hands grip, squeeze tight', mental: 'Engage upper back' },
            { action: 'Elbows drive under and back', mental: 'Create shelf for bar' },
            { action: 'Big breath, brace HARD', mental: '360° pressure in core' },
            { action: 'Stand with bar', mental: 'Bar should feel light' },
          ],
          keys: ['Tightness', 'Breathing', 'Upper back engaged'],
        },
        {
          phase: 'Walkout (5-10 seconds)',
          actions: [
            { action: 'Step 1: Right foot back', mental: 'Same foot every time' },
            { action: 'Step 2: Left foot back', mental: 'Match width' },
            { action: 'Step 3: Adjust right foot', mental: 'Final stance locked' },
            { action: 'Feet set, don\'t fidget', mental: 'Stance is locked, no adjusting' },
            { action: 'Weight balanced mid-foot', mental: 'Feel tripod: heel, big toe, pinky toe' },
          ],
          keys: ['Three steps max', 'Consistent foot position', 'No adjusting'],
        },
        {
          phase: 'Final Prep (3-5 seconds)',
          actions: [
            { action: 'Quick mental checklist', mental: '"Feet, breath, cue"' },
            { action: 'Re-brace if needed', mental: 'One more big breath and brace' },
            { action: 'Eyes fix on spot', mental: 'Focus point 6-10 feet ahead' },
            { action: 'Think primary cue only', mental: '"Spread floor" or whatever YOUR cue is' },
            { action: 'GO - no hesitation', mental: 'Committed, execute' },
          ],
          keys: ['One cue only', 'No overthinking', '100% commitment'],
        },
      ],
      timing: 'Total: 40-50 seconds from approach to descent',
      commonMistakes: [
        'Taking too long (overthinking kills confidence)',
        'Different routine every lift (no consistency)',
        'Adjusting feet 5+ times (indecision)',
        'Thinking about result not process',
        'Rushing the setup (missing tightness)',
      ],
    },
    bench: {
      name: 'Bench Routine',
      icon: 'barbell',
      color: 'red',
      phases: [
        {
          phase: 'Approach (5-10 seconds)',
          actions: [
            { action: 'Visualize perfect rep', mental: 'See J-curve bar path, smooth lockout' },
            { action: 'Lie down same way every time', mental: 'Head position, body alignment' },
            { action: 'Grip bar, measure hand position', mental: 'Check against rings, consistent grip' },
          ],
          keys: ['Consistency', 'Visualization', 'Grip measurement'],
        },
        {
          phase: 'Positioning (15-25 seconds)',
          actions: [
            { action: 'Slide up into arch', mental: 'Traps on bench, glutes back toward shoulders' },
            { action: 'Set feet flat, leg drive ready', mental: 'Heels down, push into floor' },
            { action: 'Scapulae retracted and DOWN', mental: 'Pinch shoulder blades, create shelf' },
            { action: 'Arch set, tight throughout', mental: 'Rigid bridge, no relaxing' },
            { action: 'Check: head, shoulders, butt on bench', mental: 'All three points of contact' },
          ],
          keys: ['Arch locked', 'Scapulae retracted', 'Leg drive ready'],
        },
        {
          phase: 'Handoff (5-10 seconds)',
          actions: [
            { action: 'Signal spotter ready', mental: 'Nod or verbal cue' },
            { action: 'Spotter lifts bar', mental: 'DON\'T pull it yourself' },
            { action: 'Bar settles over shoulders', mental: 'Straight arms, bar over shoulder joint' },
            { action: 'Re-grip if needed quickly', mental: 'Last chance to adjust hands' },
            { action: 'Big breath, brace', mental: 'Fill chest with air, entire body tight' },
          ],
          keys: ['Controlled handoff', 'Bar over shoulders', 'Full body tension'],
        },
        {
          phase: 'Ready Position (3-5 seconds)',
          actions: [
            { action: 'Hold lockout, gather tension', mental: 'Lats engaged, pulling bar apart' },
            { action: 'Final mental cue', mental: '"Pull to chest" or YOUR cue' },
            { action: 'Wait for start command (comp)', mental: 'Stillness, then GO' },
            { action: 'Or descend when ready (training)', mental: 'No hesitation, commit' },
          ],
          keys: ['Tension gathered', 'One cue', 'Committed descent'],
        },
      ],
      timing: 'Total: 30-50 seconds from lie down to descent',
      commonMistakes: [
        'Losing arch during handoff',
        'Not waiting for start command (competition)',
        'Relaxing shoulders at lockout',
        'Poor handoff from spotter',
        'Feet moving during lift',
      ],
    },
    deadlift: {
      name: 'Deadlift Routine',
      icon: 'barbell-outline',
      color: 'emerald',
      phases: [
        {
          phase: 'Approach (5-10 seconds)',
          actions: [
            { action: 'Walk to bar, stand over it', mental: 'Confidence, this is yours' },
            { action: 'Look at bar position', mental: 'Bar over mid-foot, check alignment' },
            { action: 'Visualize perfect pull', mental: 'See smooth lockout, easy lift' },
            { action: 'Decide: hook or conventional grip', mental: 'Committed to your choice' },
          ],
          keys: ['Bar position check', 'Mental prep', 'Grip decision'],
        },
        {
          phase: 'Foot Positioning (3-5 seconds)',
          actions: [
            { action: 'Step to bar', mental: 'Consistent stance every time' },
            { action: 'Bar over mid-foot', mental: 'When you look down, bar covers laces' },
            { action: 'Stance width set', mental: 'Hip width or slightly narrower' },
            { action: 'Toes angle consistent', mental: 'Usually straight or slight out' },
            { action: 'Weight balanced', mental: 'Feel entire foot, not rocking' },
          ],
          keys: ['Bar mid-foot', 'Consistent stance', 'Balanced weight'],
        },
        {
          phase: 'Grip and Brace (10-15 seconds)',
          actions: [
            { action: 'Hinge at hips, reach down', mental: 'Straight back, push hips back' },
            { action: 'Grip bar outside legs', mental: 'Arms straight, locked elbows' },
            { action: 'Pull slack out of bar', mental: 'Tension on bar before lift starts' },
            { action: 'Chest up, lats engaged', mental: '"Bend the bar" cue, protect back' },
            { action: 'BIG breath, brace HARD', mental: '360° core pressure, lock it in' },
          ],
          keys: ['Slack out', 'Lats tight', 'Braced fully'],
        },
        {
          phase: 'Final Tension (2-3 seconds)',
          actions: [
            { action: 'Hips drop slightly', mental: 'Shins to bar, NOT squat position' },
            { action: 'Shoulders over or slightly in front of bar', mental: 'Check shoulder position' },
            { action: 'Mental cue', mental: '"Push floor" or "Leg drive" - YOUR cue' },
            { action: 'PULL - no hesitation', mental: 'Explode up, committed' },
          ],
          keys: ['Shoulders positioned', 'One cue', 'Explosive intent'],
        },
      ],
      timing: 'Total: 20-35 seconds from approach to pull',
      commonMistakes: [
        'Bar too far forward (over toes not mid-foot)',
        'Yanking the bar (not pulling slack first)',
        'Hips too low (squatting the deadlift)',
        'Looking up (hyperextending neck)',
        'Not bracing before pull',
      ],
    },
    general: {
      name: 'General Principles',
      icon: 'checkmark-circle',
      color: 'purple',
      principles: [
        {
          principle: 'Consistency is King',
          explanation: 'Same routine EVERY TIME creates automatic execution',
          implementation: [
            'Write down your exact routine',
            'Practice it every warmup set',
            'Film yourself to verify consistency',
            'Don\'t change routine based on mood',
            'Routine should be 30-60 seconds max',
          ],
        },
        {
          principle: 'Process Over Outcome',
          explanation: 'Think about HOW to lift, not IF you can',
          implementation: [
            'Focus on one technical cue only',
            'Don\'t think "Can I make this?"',
            'Think "Spread floor, big breath, go"',
            'Trust your training',
            'Let the result happen',
          ],
        },
        {
          principle: 'Arousal Management',
          explanation: 'Get hyped, but stay in control',
          implementation: [
            'Music for arousal, then turn it down',
            'Get excited approaching bar, calm during setup',
            'Controlled aggression, not chaotic',
            'If shaking, you\'re too amped - breathe',
            'Find YOUR optimal arousal level',
          ],
        },
        {
          principle: 'Commitment Eliminates Doubt',
          explanation: 'Once you approach bar, 100% committed',
          implementation: [
            'No backing off once routine starts',
            'If you\'re not ready, don\'t start routine',
            'Once you start, see it through',
            'Hesitation = failed lift',
            'Trust your preparation',
          ],
        },
        {
          principle: 'Minimal Mental Load',
          explanation: 'One cue, not a checklist',
          implementation: [
            'Choose ONE primary cue per lift',
            'Trust that your setup handles the rest',
            'More cues = paralysis by analysis',
            'Practice makes cues automatic',
            'Simple is powerful',
          ],
        },
      ],
    },
  };

  const currentLift = routineData[selectedLift as keyof typeof routineData];

  const getColorClass = (color: string) => {
    const colors: { [key: string]: string } = {
      blue: 'bg-primary',
      red: 'bg-red-500',
      emerald: 'bg-primary',
      purple: 'bg-purple-500',
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
            Pre-Lift Routine
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          <View className="bg-gradient-to-r from-primary to-[#7D0EBE] rounded-xl p-6 mb-6">
            <Text className="text-white text-2xl font-bold mb-2">Perfect Your Routine</Text>
            <Text className="text-white opacity-90">
              Consistent pre-lift rituals for max performance
            </Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6">
            <View className="flex-row gap-3 px-1">
              {Object.entries(routineData).map(([key, lift]) => (
                <TouchableOpacity
                  key={key}
                  onPress={() => setSelectedLift(key)}
                  className={`${
                    selectedLift === key 
                      ? getColorClass(lift.color)
                      : 'bg-zinc-900'
                  } rounded-xl p-4 border ${
                    selectedLift === key 
                      ? 'border-white/30'
                      : 'border-zinc-800'
                  } min-w-[160px]`}
                >
                  <Ionicons 
                    name={lift.icon as any} 
                    size={32} 
                    color={selectedLift === key ? 'white' : '#a1a1aa'} 
                  />
                  <Text className={`${selectedLift === key ? 'text-white' : 'text-zinc-400'} font-bold mt-2`}>
                    {lift.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          {selectedLift !== 'general' && (
            <>
              {currentLift.phases?.map((phase, idx) => (
                <View key={idx} className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
                  <View className={`${getColorClass(currentLift.color)} rounded-xl px-4 py-3 mb-4`}>
                    <Text className="text-white font-bold text-lg">{phase.phase}</Text>
                  </View>

                  {phase.actions.map((action, aIdx) => (
                    <View key={aIdx} className="bg-zinc-800 rounded-xl p-4 mb-3 last:mb-4">
                      <Text className="text-white font-bold mb-1">{action.action}</Text>
                      <Text className="text-primary text-sm">{action.mental}</Text>
                    </View>
                  ))}

                  <View className="bg-primary/10 rounded-xl p-3 border border-primary/30">
                    <Text className="text-primary/80 font-bold text-sm mb-2">Key Points:</Text>
                    {phase.keys.map((key, kIdx) => (
                      <Text key={kIdx} className="text-primary/60 text-sm mb-1 last:mb-0">
                        ✓ {key}
                      </Text>
                    ))}
                  </View>
                </View>
              ))}

              {currentLift.timing && (
                <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-6">
                  <Text className="text-primary font-bold mb-1">Timing:</Text>
                  <Text className="text-primary/80 text-sm">{currentLift.timing}</Text>
                </View>
              )}

              {currentLift.commonMistakes && (
                <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
                  <Text className="text-red-400 text-xl font-bold mb-4">Common Mistakes to Avoid:</Text>
                  {currentLift.commonMistakes.map((mistake, idx) => (
                    <Text key={idx} className="text-zinc-300 mb-2 last:mb-0">
                      ✓ {mistake}
                    </Text>
                  ))}
                </View>
              )}
            </>
          )}

          {selectedLift === 'general' && (
            <>
              {currentLift.principles?.map((principle, idx) => (
                <View key={idx} className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
                  <Text className="text-purple-400 text-xl font-bold mb-3">{principle.principle}</Text>
                  <Text className="text-zinc-300 mb-4">{principle.explanation}</Text>

                  <Text className="text-white font-bold mb-3">Implementation:</Text>
                  {principle.implementation.map((item, iIdx) => (
                    <Text key={iIdx} className="text-zinc-300 text-sm mb-2 last:mb-0">
                      • {item}
                    </Text>
                  ))}
                </View>
              ))}
            </>
          )}

          <View className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-xl p-4 border border-amber-500/30 mb-6">
            <Text className="text-amber-400 font-bold mb-2">Building Your Routine</Text>
            <Text className="text-amber-300 text-sm mb-2">
              • Practice routine on EVERY warmup set
            </Text>
            <Text className="text-amber-300 text-sm mb-2">
              • Same routine training and competition
            </Text>
            <Text className="text-amber-300 text-sm mb-2">
              • 30-60 seconds total - not too long
            </Text>
            <Text className="text-amber-300 text-sm mb-2">
              • Consistency creates confidence
            </Text>
            <Text className="text-amber-300 text-sm">
              • Your routine is YOUR ritual - make it yours
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}


