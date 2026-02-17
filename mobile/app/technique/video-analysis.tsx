import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function VideoAnalysis() {
  const [selectedLift, setSelectedLift] = useState('squat');

  const analysisGuides = {
    squat: {
      name: 'Squat Analysis',
      icon: 'fitness',
      color: 'blue',
      angles: [
        {
          angle: 'Side View (Most Important)',
          setup: '90� to lifter, camera at hip height',
          checkpoints: [
            { checkpoint: 'Bar path', good: 'Vertical line over mid-foot', bad: 'Bar drifts forward or back' },
            { checkpoint: 'Hip/chest rise', good: 'Both rise together', bad: 'Hips shoot up first (stripper squat)' },
            { checkpoint: 'Depth', good: 'Hip crease below top of knee', bad: 'High squat, parallel only' },
            { checkpoint: 'Torso angle', good: 'Consistent angle', bad: 'Excessive forward lean' },
            { checkpoint: 'Lower back', good: 'Neutral spine', bad: 'Butt wink, rounding' },
          ],
          notes: 'Best for overall technique assessment',
        },
        {
          angle: 'Front View',
          setup: 'Directly in front, camera at knee height',
          checkpoints: [
            { checkpoint: 'Knee tracking', good: 'Knees track over toes', bad: 'Knees cave inward (valgus)' },
            { checkpoint: 'Stance symmetry', good: 'Even weight distribution', bad: 'Shifted to one side' },
            { checkpoint: 'Bar level', good: 'Bar stays level', bad: 'One side higher (imbalance)' },
            { checkpoint: 'Foot position', good: 'Arches maintained', bad: 'Flat feet, collapsed arches' },
          ],
          notes: 'Critical for knee valgus detection',
        },
        {
          angle: 'Back View',
          setup: 'Behind lifter, camera at hip height',
          checkpoints: [
            { checkpoint: 'Bar position', good: 'Centered on back', bad: 'Tilted to one side' },
            { checkpoint: 'Hip drive', good: 'Symmetric hip extension', bad: 'One hip rises first' },
            { checkpoint: 'Torso rotation', good: 'No twisting', bad: 'Rotating through rep' },
          ],
          notes: 'Useful for asymmetry detection',
        },
      ],
    },
    bench: {
      name: 'Bench Analysis',
      icon: 'barbell',
      color: 'red',
      angles: [
        {
          angle: 'Side View',
          setup: '90� to lifter, camera at chest height',
          checkpoints: [
            { checkpoint: 'Bar path', good: 'J-curve (down to chest, up to shoulders)', bad: 'Straight vertical' },
            { checkpoint: 'Arch maintenance', good: 'Arch stays through rep', bad: 'Flat back, butt comes up' },
            { checkpoint: 'Elbow lockout', good: 'Full extension over shoulders', bad: 'Soft lockout, bar forward' },
            { checkpoint: 'Leg drive', good: 'Feet planted, pushing through rep', bad: 'Feet move, no drive' },
            { checkpoint: 'Touch point', good: 'Lower chest/sternum', bad: 'Upper chest or neck' },
          ],
          notes: 'Shows bar path and arch quality',
        },
        {
          angle: 'Head-On',
          setup: 'From spotter position, looking down',
          checkpoints: [
            { checkpoint: 'Bar level', good: 'Even descent and press', bad: 'One side higher' },
            { checkpoint: 'Grip symmetry', good: 'Hands equidistant from center', bad: 'Uneven grip' },
            { checkpoint: 'Shoulder position', good: 'Scapulae retracted evenly', bad: 'One shoulder forward' },
          ],
          notes: 'Checks symmetry',
        },
        {
          angle: 'Feet View',
          setup: 'From feet, camera at bench level',
          checkpoints: [
            { checkpoint: 'Elbow angle', good: '45-75� from body', bad: 'Flared 90�' },
            { checkpoint: 'Forearm angle', good: 'Vertical at bottom', bad: 'Angled inward or outward' },
            { checkpoint: 'Wrist position', good: 'Neutral, stacked', bad: 'Bent back excessively' },
          ],
          notes: 'Best for elbow angle assessment',
        },
      ],
    },
    deadlift: {
      name: 'Deadlift Analysis',
      icon: 'barbell-outline',
      color: 'purple',
      angles: [
        {
          angle: 'Side View (Essential)',
          setup: '90� to lifter, camera at hip height',
          checkpoints: [
            { checkpoint: 'Bar position', good: 'Starts over mid-foot, stays there', bad: 'Starts over toes, drifts forward' },
            { checkpoint: 'Back position', good: 'Neutral spine throughout', bad: 'Rounded upper or lower back' },
            { checkpoint: 'Hip height', good: 'Hips higher than knees', bad: 'Hips too low (squatting)' },
            { checkpoint: 'Shoulder position', good: 'Shoulders over or slightly in front of bar', bad: 'Shoulders behind bar' },
            { checkpoint: 'Hip rise', good: 'Hips and shoulders rise together', bad: 'Hips shoot up first' },
            { checkpoint: 'Lockout', good: 'Stand tall, shoulders back', bad: 'Hyperextension, leaning back' },
          ],
          notes: 'Most important angle for deadlift',
        },
        {
          angle: 'Front View',
          setup: 'Directly in front, camera at shin height',
          checkpoints: [
            { checkpoint: 'Bar to body', good: 'Bar drags up shins/thighs', bad: 'Gap between bar and body' },
            { checkpoint: 'Foot position', good: 'Weight mid-foot', bad: 'Rocking forward or back' },
            { checkpoint: 'Symmetry', good: 'Even pull both sides', bad: 'Bar tilts, hitching' },
          ],
          notes: 'Checks bar path and symmetry',
        },
      ],
    },
    ohp: {
      name: 'OHP Analysis',
      icon: 'arrow-up',
      color: 'primary',
      angles: [
        {
          angle: 'Side View',
          setup: '90� to lifter, camera at shoulder height',
          checkpoints: [
            { checkpoint: 'Bar path', good: 'Up and back, then vertical', bad: 'Pressing forward' },
            { checkpoint: 'Lower back', good: 'Neutral spine, no arch', bad: 'Hyperextension' },
            { checkpoint: 'Lockout position', good: 'Bar over mid-foot, head through', bad: 'Bar in front of head' },
            { checkpoint: 'Leg drive', good: 'None (strict press)', bad: 'Dipping with legs' },
          ],
          notes: 'Essential for bar path and back position',
        },
        {
          angle: 'Front View',
          setup: 'Directly in front, camera at chest height',
          checkpoints: [
            { checkpoint: 'Bar level', good: 'Even on both sides', bad: 'Tilted bar' },
            { checkpoint: 'Elbow position', good: 'Elbows track forward', bad: 'Elbows flare out' },
            { checkpoint: 'Symmetry', good: 'Even press both sides', bad: 'Favoring one side' },
          ],
          notes: 'Checks pressing symmetry',
        },
      ],
    },
  };

  const currentGuide = analysisGuides[selectedLift as keyof typeof analysisGuides];

  const getColorClass = (color: string) => {
    const colors: { [key: string]: string } = {
      blue: 'bg-primary',
      red: 'bg-red-500',
      purple: 'bg-purple-500',
      primary: 'bg-primary',
    };
    return colors[color];
  };

  const generalTips = [
    {
      tip: 'Camera Placement',
      details: 'Stable tripod or prop phone against wall. NO handheld',
      icon: 'camera',
    },
    {
      tip: 'Lighting',
      details: 'Good lighting so you can see details. Natural light best',
      icon: 'sunny',
    },
    {
      tip: 'Frame the Shot',
      details: 'Full body in frame for main lifts. Some space above/below',
      icon: 'scan',
    },
    {
      tip: 'Multiple Angles',
      details: 'Film from 2-3 angles per session. Side view priority',
      icon: 'videocam',
    },
    {
      tip: 'Every Session',
      details: 'Film at least one working set every training day',
      icon: 'calendar',
    },
    {
      tip: 'Slow Motion',
      details: 'Use slow-mo playback (not recording) to analyze details',
      icon: 'speedometer',
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
            Video Analysis Guide
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          <View className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl p-6 mb-6">
            <Text className="text-white text-2xl font-bold mb-2">Film Your Lifts</Text>
            <Text className="text-white opacity-90">
              See what you can't feel
            </Text>
          </View>

          <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
            <Text className="text-white font-bold text-lg mb-4">General Setup Tips</Text>
            {generalTips.map((item, idx) => (
              <View key={idx} className="bg-zinc-800 rounded-xl p-4 mb-3 last:mb-0">
                <View className="flex-row items-center mb-2">
                  <Ionicons name={item.icon as any} size={24} color="#9D12DE" />
                  <Text className="text-white font-bold ml-3">{item.tip}</Text>
                </View>
                <Text className="text-zinc-300 text-sm">{item.details}</Text>
              </View>
            ))}
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6">
            <View className="flex-row gap-3 px-1">
              {Object.entries(analysisGuides).map(([key, guide]) => (
                <TouchableOpacity
                  key={key}
                  onPress={() => setSelectedLift(key)}
                  className={`${
                    selectedLift === key 
                      ? getColorClass(guide.color)
                      : 'bg-zinc-900'
                  } rounded-xl p-4 border ${
                    selectedLift === key 
                      ? 'border-white/30'
                      : 'border-zinc-800'
                  } min-w-[160px]`}
                >
                  <Ionicons 
                    name={guide.icon as any} 
                    size={32} 
                    color={selectedLift === key ? 'white' : '#a1a1aa'} 
                  />
                  <Text className={`${selectedLift === key ? 'text-white' : 'text-zinc-400'} font-bold mt-2`}>
                    {guide.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
            <Text className="text-white text-2xl font-bold mb-6">{currentGuide.name}</Text>

            {currentGuide.angles.map((angle, angleIdx) => (
              <View key={angleIdx} className="mb-6 last:mb-0">
                <View className={`${getColorClass(currentGuide.color)} rounded-xl p-4 mb-4`}>
                  <Text className="text-white font-bold text-xl mb-2">{angle.angle}</Text>
                  <View className="flex-row items-center">
                    <Ionicons name="camera" size={16} color="white" />
                    <Text className="text-white text-sm ml-2">{angle.setup}</Text>
                  </View>
                </View>

                <Text className="text-white font-bold mb-3">What to Check:</Text>
                {angle.checkpoints.map((check, checkIdx) => (
                  <View key={checkIdx} className="bg-zinc-800 rounded-xl p-4 mb-3 last:mb-4">
                    <Text className="text-white font-bold mb-3">{check.checkpoint}</Text>
                    
                    <View className="bg-primary/10 rounded-xl p-3 border border-primary/30 mb-2">
                      <Text className="text-primary font-bold text-sm mb-1">? Good:</Text>
                      <Text className="text-primary/80 text-sm">{check.good}</Text>
                    </View>

                    <View className="bg-red-500/10 rounded-xl p-3 border border-red-500/30">
                      <Text className="text-red-400 font-bold text-sm mb-1">? Bad:</Text>
                      <Text className="text-red-300 text-sm">{check.bad}</Text>
                    </View>
                  </View>
                ))}

                <View className={`${getColorClass(currentGuide.color)}/10 rounded-xl p-3 border ${getColorClass(currentGuide.color)}/30`}>
                  <Text className={`text-${currentGuide.color}-400 text-sm italic`}>
                    💡 {angle.notes}
                  </Text>
                </View>
              </View>
            ))}
          </View>

          <View className="bg-amber-500/10 rounded-xl p-4 border border-amber-500/30 mb-6">
            <Text className="text-amber-400 font-bold mb-2">Analysis Workflow</Text>
            <Text className="text-amber-300 text-sm mb-2">
              1. Film your working sets (not warm-ups)
            </Text>
            <Text className="text-amber-300 text-sm mb-2">
              2. Review immediately after session while fresh
            </Text>
            <Text className="text-amber-300 text-sm mb-2">
              3. Focus on one fault per session, not all at once
            </Text>
            <Text className="text-amber-300 text-sm mb-2">
              4. Compare to previous videos to track progress
            </Text>
            <Text className="text-amber-300 text-sm">
              5. Post in form-check forums for feedback
            </Text>
          </View>

          <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-6">
            <Text className="text-primary/80 font-bold mb-2">Pro Tips</Text>
            <Text className="text-primary/60 text-sm mb-2">
              � What you feel ≠ what you see (video doesn't lie)
            </Text>
            <Text className="text-primary/60 text-sm mb-2">
              � Side view is most important for all lifts
            </Text>
            <Text className="text-primary/60 text-sm mb-2">
              � Film EVERY session - make it a habit
            </Text>
            <Text className="text-primary/60 text-sm mb-2">
              � Keep old videos to see long-term progress
            </Text>
            <Text className="text-primary/60 text-sm">
              � Consider posting for experienced feedback
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}


