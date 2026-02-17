import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function StickingPointSolutions() {
  const [selectedLift, setSelectedLift] = useState('squat');

  const stickingData = {
    squat: {
      name: 'Squat',
      icon: 'barbell',
      color: 'blue',
      points: [
        {
          location: 'Bottom of Squat (Hole)',
          why_stuck: [
            'Weak quads - can\'t drive out',
            'Poor positioning in bottom',
            'Losing tension/tightness',
            'Hip mobility limiting depth position',
            'Not using stretch reflex properly',
          ],
          exercises: [
            {
              name: 'Pause Squats',
              description: '2-3 second pause in hole',
              sets_reps: '4-5 sets of 2-3 reps @ 70-80%',
              why: 'Eliminates bounce, builds strength at weakest point',
            },
            {
              name: 'Box Squats (Low Box)',
              description: 'Sit to box at/below parallel',
              sets_reps: '5-6 sets of 2-3 reps @ 60-75%',
              why: 'Full stop forces dead start strength',
            },
            {
              name: 'Anderson Squats',
              description: 'Start from pins in hole',
              sets_reps: '4-5 sets of 3-5 reps @ 60-70%',
              why: 'Pure concentric from weakest position',
            },
            {
              name: 'Front Squats',
              description: 'Olympic style, upright torso',
              sets_reps: '3-4 sets of 5-8 reps',
              why: 'Overloads quads, teaches good positioning',
            },
          ],
          technique_fixes: [
            'Film side view - are you diving forward?',
            'Cue "chest up" out of hole',
            'Big breath, maintain tightness through bottom',
            'Think "stand up" not "push hips through"',
          ],
        },
        {
          location: 'Midway (Hardest Part)',
          why_stuck: [
            'Overall strength limit',
            'Weak quads through mid-range',
            'Hips shooting up - back taking over',
            'Loss of back tightness',
          ],
          exercises: [
            {
              name: 'Pin Squats',
              description: 'Pins set at sticking point height',
              sets_reps: '4-5 sets of 3-5 reps @ 70-85%',
              why: 'Overloads exact weak point',
            },
            {
              name: 'Tempo Squats (Slow Up)',
              description: '3 second ascent',
              sets_reps: '3-4 sets of 3-5 reps @ 60-70%',
              why: 'Time under tension at weak point',
            },
            {
              name: 'Paused Squats (Mid-Point)',
              description: 'Pause halfway up',
              sets_reps: '4 sets of 2-3 reps @ 65-75%',
              why: 'Stops momentum, builds specific strength',
            },
            {
              name: 'Leg Press (Heavy)',
              description: 'Moderate range of motion',
              sets_reps: '3-4 sets of 8-12 reps',
              why: 'Overload quads without systemic fatigue',
            },
          ],
          technique_fixes: [
            'Check bar path - should be vertical',
            'Maintain back tightness throughout',
            'Don\'t let hips rise faster than chest',
            'Drive through whole foot, not just toes',
          ],
        },
        {
          location: 'Lockout (Top)',
          why_stuck: [
            'Weak glutes/hip extension',
            'Exhausted from previous ROM',
            'Losing tightness at top',
            'Poor lockout pattern',
          ],
          exercises: [
            {
              name: 'Romanian Deadlifts',
              description: 'Hip hinge emphasis',
              sets_reps: '3-4 sets of 6-10 reps',
              why: 'Builds glutes and lockout pattern',
            },
            {
              name: 'Hip Thrusts',
              description: 'Heavy barbell glute bridges',
              sets_reps: '3-4 sets of 8-15 reps',
              why: 'Directly strengthens hip extension',
            },
            {
              name: 'Squats to Pins (Top)',
              description: 'Pins just below lockout',
              sets_reps: '4-5 sets of 1-3 reps @ 90-105%',
              why: 'Overload lockout specifically',
            },
            {
              name: 'High Bar Squats',
              description: 'More upright, quad focus',
              sets_reps: '3-4 sets of 4-6 reps',
              why: 'Builds overall leg strength, cleaner lockout',
            },
          ],
          technique_fixes: [
            'Squeeze glutes hard at top',
            'Think "hips through" to finish',
            'Don\'t relax until completely locked',
            'Full breath before descent helps finish',
          ],
        },
      ],
    },
    bench: {
      name: 'Bench',
      icon: 'fitness',
      color: 'red',
      points: [
        {
          location: 'Off Chest',
          why_stuck: [
            'Weak pecs/front delts',
            'Poor touch position',
            'Not using leg drive early enough',
            'Losing upper back tightness on descent',
          ],
          exercises: [
            {
              name: 'Paused Bench',
              description: '1-3 second pause on chest',
              sets_reps: '4-6 sets of 2-4 reps @ 70-85%',
              why: 'Eliminates bounce, builds dead stop strength',
            },
            {
              name: 'Larsen Press',
              description: 'Feet up, no leg drive',
              sets_reps: '3-4 sets of 5-8 reps @ 60-75%',
              why: 'Isolates upper body, overloads chest',
            },
            {
              name: 'Floor Press',
              description: 'Lie on floor, shortened ROM',
              sets_reps: '4-5 sets of 3-6 reps @ 70-85%',
              why: 'Overload bottom position safely',
            },
            {
              name: 'Dumbbell Press (Flat)',
              description: 'Moderate weight, controlled',
              sets_reps: '3-4 sets of 8-12 reps',
              why: 'Greater stretch, chest isolation',
            },
          ],
          technique_fixes: [
            'Touch in consistent spot every rep',
            'Set leg drive BEFORE pressing',
            'Maintain scapular retraction through press',
            'Think "press bar through ceiling"',
          ],
        },
        {
          location: 'Midway (Triceps Range)',
          why_stuck: [
            'Weak triceps',
            'Loss of tightness mid-rep',
            'Bar path drifting wrong direction',
            'Not enough pressing volume',
          ],
          exercises: [
            {
              name: 'Board Press / Pin Press',
              description: 'Limited ROM, overload mid-range',
              sets_reps: '4-5 sets of 3-5 reps @ 80-95%',
              why: 'Overload exact weak point',
            },
            {
              name: 'Close Grip Bench',
              description: 'Hands shoulder width or slightly narrower',
              sets_reps: '4-5 sets of 4-8 reps @ 70-80%',
              why: 'Emphasizes triceps through full ROM',
            },
            {
              name: 'Dips (Weighted)',
              description: 'Chest slightly forward',
              sets_reps: '3-4 sets of 6-10 reps',
              why: 'Builds triceps and pressing strength',
            },
            {
              name: 'Overhead Press',
              description: 'Strict barbell or dumbbell',
              sets_reps: '3-4 sets of 5-8 reps',
              why: 'Builds pressing power and triceps',
            },
          ],
          technique_fixes: [
            'Maintain bar path - back toward face',
            'Don\'t lose leg drive partway through',
            'Keep elbows tucked (not flaring)',
            'Focus on pressing fast, not grinding',
          ],
        },
        {
          location: 'Lockout (Top 2-3 inches)',
          why_stuck: [
            'Weak triceps at lockout',
            'Losing shoulder position',
            'Fatigue from earlier ROM',
            'Poor lockout mechanics',
          ],
          exercises: [
            {
              name: 'Pin Press (High Pins)',
              description: 'Pins 2-3" from lockout',
              sets_reps: '4-5 sets of 3-5 reps @ 85-105%',
              why: 'Overload lockout specifically',
            },
            {
              name: 'Close Grip Pin Press',
              description: 'Narrow grip, high pins',
              sets_reps: '4 sets of 3-5 reps @ 75-90%',
              why: 'Maximum triceps overload at lockout',
            },
            {
              name: 'Tricep Extensions (Overhead)',
              description: 'DB or cable',
              sets_reps: '3-4 sets of 10-15 reps',
              why: 'Isolates triceps in stretched position',
            },
            {
              name: 'Bench with Bands',
              description: 'Accommodating resistance',
              sets_reps: '4-5 sets of 3-5 reps @ 60% + bands',
              why: 'Progressive resistance, hardest at lockout',
            },
          ],
          technique_fixes: [
            'Lock elbows completely, don\'t soft lock',
            'Squeeze triceps at top',
            'Maintain full body tension through lockout',
            'Practice lockouts with supra-maximal weight',
          ],
        },
      ],
    },
    deadlift: {
      name: 'Deadlift',
      icon: 'barbell-outline',
      color: 'primary',
      points: [
        {
          location: 'Off Floor',
          why_stuck: [
            'Weak quads/starting position',
            'Poor setup - hips too low or high',
            'Not creating tension before pull',
            'Weak lats - bar drifts forward',
          ],
          exercises: [
            {
              name: 'Deficit Deadlifts',
              description: 'Stand on 1-3" platform',
              sets_reps: '4-5 sets of 3-5 reps @ 65-80%',
              why: 'Increases ROM, overloads start position',
            },
            {
              name: 'Paused Deadlifts (1" off floor)',
              description: 'Pull 1" and hold 2 seconds',
              sets_reps: '4 sets of 2-4 reps @ 60-75%',
              why: 'Builds tension and strength at weak point',
            },
            {
              name: 'Front Squats',
              description: 'Olympic style',
              sets_reps: '3-4 sets of 5-8 reps',
              why: 'Builds quads for pulling off floor',
            },
            {
              name: 'Romanian Deadlifts from Deficit',
              description: 'Emphasize lat engagement',
              sets_reps: '3-4 sets of 6-8 reps',
              why: 'Teaches pulling bar close from start',
            },
          ],
          technique_fixes: [
            'Create tension BEFORE pull ("pull slack out")',
            'Lats tight - "bend bar around shins"',
            'Push floor away, don\'t yank bar',
            'Find optimal hip height - not too low',
          ],
        },
        {
          location: 'Just Below Knees',
          why_stuck: [
            'Weak position - hips too high now',
            'Bar drifted forward earlier',
            'Weak lower/mid back',
            'Losing lat tightness',
          ],
          exercises: [
            {
              name: 'Block Pulls (Below Knee)',
              description: 'Blocks 2-4" high',
              sets_reps: '4-5 sets of 3-5 reps @ 75-90%',
              why: 'Start from weak point',
            },
            {
              name: 'Paused Deadlifts (at Knee)',
              description: '2 second pause at knee height',
              sets_reps: '4 sets of 2-3 reps @ 65-80%',
              why: 'Build strength through sticking point',
            },
            {
              name: 'Snatch Grip Deadlifts',
              description: 'Wide grip, harder pull',
              sets_reps: '3-4 sets of 4-6 reps @ 60-70%',
              why: 'Overloads back and builds pulling power',
            },
            {
              name: 'Rows (Barbell, Chest Supported)',
              description: 'Heavy rowing variations',
              sets_reps: '4 sets of 6-10 reps',
              why: 'Strengthens back to maintain position',
            },
          ],
          technique_fixes: [
            'Keep bar close - scrape shins/thighs',
            'Don\'t let hips shoot up early',
            'Maintain back angle through pull',
            'Think "push floor, pull bar into body"',
          ],
        },
        {
          location: 'Lockout (Top)',
          why_stuck: [
            'Weak glutes/hip extension',
            'Exhausted from pull',
            'Leaning back too much (hitching)',
            'Weak upper back gives out',
          ],
          exercises: [
            {
              name: 'Rack/Block Pulls (High)',
              description: 'Just below knee or higher',
              sets_reps: '4-5 sets of 3-5 reps @ 85-110%',
              why: 'Overload lockout with supra-maximal',
            },
            {
              name: 'Hip Thrusts (Heavy)',
              description: 'Barbell glute bridges',
              sets_reps: '3-4 sets of 8-15 reps',
              why: 'Directly builds hip extension strength',
            },
            {
              name: 'Rack Pulls with Pause',
              description: 'Hold at lockout 3-5 seconds',
              sets_reps: '4 sets of 1-3 reps @ 90-105%',
              why: 'Builds lockout strength and endurance',
            },
            {
              name: 'Kettlebell Swings (Heavy)',
              description: 'Explosive hip extension',
              sets_reps: '3-4 sets of 15-20 reps',
              why: 'Builds explosive hip power',
            },
          ],
          technique_fixes: [
            'Squeeze glutes HARD at top',
            'Stand tall, don\'t lean back excessively',
            'Finish with hips, not lower back',
            'Practice lockout holds with heavy weight',
          ],
        },
        {
          location: 'Grip Giving Out',
          why_stuck: [
            'Weak forearms/grip',
            'Wrong grip type for your hands',
            'Bar slipping during pull',
            'Not using hook grip or straps when appropriate',
          ],
          exercises: [
            {
              name: 'Heavy Holds (Rack)',
              description: 'Hold supramaximal weight',
              sets_reps: '3-4 sets of 10-20 second holds @ 105-120%',
              why: 'Overloads grip specifically',
            },
            {
              name: 'Farmer Walks',
              description: 'Heavy dumbbells or farmers handles',
              sets_reps: '3-4 sets of 30-60 seconds',
              why: 'Functional grip strength',
            },
            {
              name: 'Deadlifts Double Overhand',
              description: 'No hook, no mixed, no straps',
              sets_reps: '3-4 sets of 5 reps @ 60-75%',
              why: 'Builds raw grip strength',
            },
            {
              name: 'Fat Gripz Holds/Rows',
              description: 'Thick bar adapter',
              sets_reps: '2-3 sets of high reps',
              why: 'Challenges grip differently',
            },
          ],
          technique_fixes: [
            'Learn hook grip if not using',
            'Chalk up properly',
            'Mixed grip: alternate which hand over',
            'Straps for volume work, compete grip for heavy',
          ],
        },
      ],
    },
  };

  const currentLift = stickingData[selectedLift as keyof typeof stickingData];

  const getColorClass = (color: string) => {
    const colors: { [key: string]: string } = {
      blue: 'bg-primary',
      red: 'bg-red-500',
      primary: 'bg-primary',
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
            Sticking Point Solutions
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          <View className="bg-gradient-to-r from-red-500 to-orange-500 rounded-xl p-6 mb-6">
            <Text className="text-white text-2xl font-bold mb-2">Fix Weak Points</Text>
            <Text className="text-white opacity-90">
              Targeted solutions for where you fail
            </Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6">
            <View className="flex-row gap-3 px-1">
              {Object.entries(stickingData).map(([key, lift]) => (
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

          {currentLift.points.map((point, idx) => (
            <View key={idx} className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
              <Text className="text-white text-xl font-bold mb-4">{point.location}</Text>

              <View className="bg-red-500/10 rounded-xl p-4 border border-red-500/30 mb-4">
                <Text className="text-red-400 font-bold mb-2">Why You're Stuck:</Text>
                {point.why_stuck.map((reason, rIdx) => (
                  <Text key={rIdx} className="text-red-300 text-sm mb-1">� {reason}</Text>
                ))}
              </View>

              <View className="mb-4">
                <Text className="text-primary font-bold text-lg mb-3">Exercises to Fix It:</Text>
                {point.exercises.map((ex, eIdx) => (
                  <View key={eIdx} className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-3 last:mb-0">
                    <Text className="text-primary font-bold mb-2">{ex.name}</Text>
                    <Text className="text-zinc-300 text-sm mb-2">{ex.description}</Text>
                    
                    <View className="flex-row items-center mb-2">
                      <Ionicons name="fitness" size={14} color="#9D12DE" />
                      <Text className="text-primary text-sm ml-2 font-bold">
                        {ex.sets_reps}
                      </Text>
                    </View>

                    <View className="bg-primary/10 rounded-xl p-3 border border-primary/30">
                      <Text className="text-primary/80 font-bold text-sm mb-1">Why it works:</Text>
                      <Text className="text-primary/60 text-sm">{ex.why}</Text>
                    </View>
                  </View>
                ))}
              </View>

              <View className="bg-purple-500/10 rounded-xl p-4 border border-purple-500/30">
                <Text className="text-purple-400 font-bold mb-2">Technique Fixes:</Text>
                {point.technique_fixes.map((fix, fIdx) => (
                  <Text key={fIdx} className="text-purple-300 text-sm mb-1">? {fix}</Text>
                ))}
              </View>
            </View>
          ))}

          <View className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-xl p-5 border border-amber-500/30 mb-6">
            <Text className="text-amber-400 font-bold text-lg mb-3">Programming Tips</Text>
            <Text className="text-amber-300 text-sm mb-2">
              � Pick 1-2 exercises for your specific weak point
            </Text>
            <Text className="text-amber-300 text-sm mb-2">
              � Do them 2x per week after main work
            </Text>
            <Text className="text-amber-300 text-sm mb-2">
              � Give it 4-6 weeks to work - be patient
            </Text>
            <Text className="text-amber-300 text-sm mb-2">
              � Film to confirm weak point is actually weak point
            </Text>
            <Text className="text-amber-300 text-sm">
              � Once fixed, maintain with lighter work
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

