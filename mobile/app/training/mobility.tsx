import React, { useState } from 'react';
import { Text } from '@/components/ui/Text';
import { View, TouchableOpacity, ScrollView } from 'react-native';;
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function MobilityRoutines() {
  const [selectedArea, setSelectedArea] = useState('hips');

  const mobilityRoutines = {
    hips: {
      name: 'Hip Mobility',
      icon: 'body',
      color: 'blue',
      importance: 'Critical for squat and deadlift depth',
      frequency: 'Daily',
      duration: '10-15 minutes',
      exercises: [
        {
          name: '90/90 Hip Stretch',
          sets: '3',
          reps: '30-45s/side',
          focus: 'Hip internal/external rotation',
          instructions: [
            'Sit with front leg at 90°, back leg at 90°',
            'Keep chest tall, lean forward over front leg',
            'Feel stretch in front hip (external rotation)',
            'Switch sides, feel back hip (internal rotation)',
          ],
          notes: 'Best overall hip mobility drill',
        },
        {
          name: 'Cossack Squats',
          sets: '3',
          reps: '8-10/side',
          focus: 'Hip adductors, lateral mobility',
          instructions: [
            'Wide stance, shift weight to one leg',
            'Squat down on one side, other leg straight',
            'Keep heel down, toe up on straight leg',
            'Push back to center, repeat other side',
          ],
          notes: 'Great for squat width mobility',
        },
        {
          name: 'Frog Stretch',
          sets: '2',
          reps: '60-90s',
          focus: 'Hip internal rotation, adductors',
          instructions: [
            'On hands and knees, spread knees wide',
            'Keep shins parallel to each other',
            'Rock hips back toward heels',
            'Breathe and relax into stretch',
          ],
          notes: 'Intense - go slow',
        },
        {
          name: 'Hip Flexor Stretch',
          sets: '3',
          reps: '30-45s/side',
          focus: 'Hip flexors (often tight from sitting)',
          instructions: [
            'Half-kneeling position (lunge)',
            'Squeeze glute of back leg',
            'Push hips forward gently',
            'Can reach arm overhead for more stretch',
          ],
          notes: 'Essential for desk workers',
        },
        {
          name: 'Deep Squat Hold',
          sets: '3',
          reps: '45-60s',
          focus: 'Full squat mobility',
          instructions: [
            'Bodyweight squat, go as deep as possible',
            'Hold bottom position',
            'Push knees out with elbows',
            'Stay on heels, chest up',
          ],
          notes: 'The ultimate squat mobility',
        },
      ],
    },
    shoulders: {
      name: 'Shoulder Mobility',
      icon: 'fitness-outline',
      color: 'red',
      importance: 'Essential for pressing and overhead work',
      frequency: '4-5x per week',
      duration: '8-12 minutes',
      exercises: [
        {
          name: 'Shoulder Dislocations',
          sets: '3',
          reps: '10-15',
          focus: 'Shoulder flexibility, capsule mobility',
          instructions: [
            'Hold PVC pipe or band, wide grip',
            'Start at hips, lift overhead and behind',
            'Keep arms straight, wide arc',
            'Slowly narrow grip as flexibility improves',
          ],
          notes: 'Best overall shoulder mobility',
        },
        {
          name: 'Wall Slides',
          sets: '3',
          reps: '10-12',
          focus: 'Scapular upward rotation',
          instructions: [
            'Back against wall, arms at 90°',
            'Press lower back flat to wall',
            'Slide arms up wall, maintain contact',
            'Lower slowly with control',
          ],
          notes: 'Teaches proper overhead position',
        },
        {
          name: 'Lat Stretch',
          sets: '3',
          reps: '30-45s/side',
          focus: 'Lat flexibility (limits overhead mobility)',
          instructions: [
            'Hold door frame or post overhead',
            'Step forward, lean body away',
            'Feel stretch down side of torso',
            'Breathe into stretch',
          ],
          notes: 'Tight lats = limited overhead',
        },
        {
          name: 'Thoracic Extensions',
          sets: '3',
          reps: '10-15',
          focus: 'Upper back extension',
          instructions: [
            'Foam roller under upper back',
            'Hands behind head, extend back over roller',
            'Keep lower back neutral',
            'Move roller up/down for different segments',
          ],
          notes: 'Critical for overhead and bench',
        },
        {
          name: 'Band Pull-Aparts',
          sets: '3',
          reps: '15-20',
          focus: 'Posterior shoulder, scapular retraction',
          instructions: [
            'Hold band at shoulder width',
            'Pull apart to chest, squeeze shoulder blades',
            'Control back to start',
            'Keep shoulders down',
          ],
          notes: 'Activation + mobility',
        },
      ],
    },
    ankles: {
      name: 'Ankle Mobility',
      icon: 'walk',
      color: 'primary',
      importance: 'Key for squat depth and knee tracking',
      frequency: 'Daily',
      duration: '5-8 minutes',
      exercises: [
        {
          name: 'Wall Ankle Mobilization',
          sets: '3',
          reps: '10-12/leg',
          focus: 'Ankle dorsiflexion',
          instructions: [
            'Face wall, foot 4-6" away',
            'Drive knee forward toward wall',
            'Keep heel down, knee tracks over toe',
            'Move foot farther for more challenge',
          ],
          notes: 'Gold standard ankle mobility',
        },
        {
          name: 'Ankle Rocks',
          sets: '3',
          reps: '15-20/leg',
          focus: 'Dynamic dorsiflexion',
          instructions: [
            'Half-kneeling position',
            'Rock forward, driving knee over toes',
            'Keep heel down entire time',
            'Go slow and controlled',
          ],
          notes: 'Similar to wall drill, different angle',
        },
        {
          name: 'Calf Stretch (Straight)',
          sets: '3',
          reps: '30-45s/leg',
          focus: 'Gastrocnemius (upper calf)',
          instructions: [
            'Step back into lunge',
            'Keep back leg straight',
            'Push heel into ground',
            'Lean forward into stretch',
          ],
          notes: 'Targets gastroc specifically',
        },
        {
          name: 'Calf Stretch (Bent)',
          sets: '3',
          reps: '30-45s/leg',
          focus: 'Soleus (lower calf)',
          instructions: [
            'Same lunge position',
            'Bend back knee slightly',
            'Push heel down',
            'Feel stretch lower in calf',
          ],
          notes: 'Targets soleus (bent knee isolates)',
        },
        {
          name: 'Ankle Circles',
          sets: '2',
          reps: '15/direction/ankle',
          focus: 'General ankle mobility',
          instructions: [
            'Sit or stand, lift one foot',
            'Draw large circles with toes',
            'Both directions',
            'Control the movement',
          ],
          notes: 'Warm-up or cool-down',
        },
      ],
    },
    thoracic: {
      name: 'Thoracic Spine',
      icon: 'radio-button-on',
      color: 'purple',
      importance: 'Affects all lifts, especially overhead and squat',
      frequency: 'Daily',
      duration: '8-10 minutes',
      exercises: [
        {
          name: 'Quadruped Thoracic Rotation',
          sets: '3',
          reps: '10/side',
          focus: 'Thoracic rotation',
          instructions: [
            'On hands and knees',
            'Hand behind head',
            'Rotate elbow to sky, follow with eyes',
            'Keep hips stable',
          ],
          notes: 'Best thoracic rotation drill',
        },
        {
          name: 'Cat-Cow',
          sets: '3',
          reps: '12-15',
          focus: 'Thoracic flexion/extension',
          instructions: [
            'Hands and knees',
            'Cow: drop belly, lift chest and hips',
            'Cat: round spine, tuck chin and tailbone',
            'Move slowly with breath',
          ],
          notes: 'Spinal segmentation',
        },
        {
          name: 'Foam Roller Extensions',
          sets: '3',
          reps: '10-12',
          focus: 'Thoracic extension',
          instructions: [
            'Foam roller under mid-back',
            'Hands support head',
            'Extend back over roller',
            'Don\'t hyperextend lower back',
          ],
          notes: 'Reverses desk posture',
        },
        {
          name: 'Thread the Needle',
          sets: '3',
          reps: '8/side',
          focus: 'Thoracic rotation + stretch',
          instructions: [
            'Hands and knees',
            '"Thread" one arm under body',
            'Rotate and reach as far as possible',
            'Hold briefly, return to start',
          ],
          notes: 'Great rotation stretch',
        },
        {
          name: 'Wall Angels',
          sets: '3',
          reps: '10',
          focus: 'Scapular control + thoracic extension',
          instructions: [
            'Back to wall, arms at 90°',
            'Keep contact: head, upper back, lower back, arms',
            'Slide arms up and down',
            'Maintain all contact points',
          ],
          notes: 'Challenging - regress if needed',
        },
      ],
    },
  };

  const currentRoutine = mobilityRoutines[selectedArea as keyof typeof mobilityRoutines];

  const getColorClass = (color: string) => {
    const colors: { [key: string]: string } = {
      blue: 'bg-primary',
      red: 'bg-red-500',
      primary: 'bg-primary',
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
            Mobility Routines
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          <View className="bg-gradient-to-r from-primary to-[#7D0EBE] rounded-xl p-6 mb-6">
            <Text className="text-white text-2xl font-bold mb-2">Improve Mobility</Text>
            <Text className="text-white opacity-90">
              Better movement, better lifts
            </Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6">
            <View className="flex-row gap-3 px-1">
              {Object.entries(mobilityRoutines).map(([key, routine]) => (
                <TouchableOpacity
                  key={key}
                  onPress={() => setSelectedArea(key)}
                  className={`${
                    selectedArea === key 
                      ? getColorClass(routine.color)
                      : 'bg-zinc-900'
                  } rounded-xl p-4 border ${
                    selectedArea === key 
                      ? 'border-white/30'
                      : 'border-zinc-800'
                  } min-w-[160px]`}
                >
                  <Ionicons 
                    name={routine.icon as any} 
                    size={32} 
                    color={selectedArea === key ? 'white' : '#a1a1aa'} 
                  />
                  <Text className={`${selectedArea === key ? 'text-white' : 'text-zinc-400'} font-bold mt-2`}>
                    {routine.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
            <Text className="text-white text-xl font-bold mb-4">{currentRoutine.name}</Text>

            <View className={`${getColorClass(currentRoutine.color)}/10 rounded-xl p-4 border ${getColorClass(currentRoutine.color)}/30 mb-4`}>
              <View className="mb-3">
                <Text className="text-zinc-400 text-sm mb-1">Why Important:</Text>
                <Text className="text-white font-bold">{currentRoutine.importance}</Text>
              </View>
              <View className="flex-row justify-between">
                <View>
                  <Text className="text-zinc-400 text-sm">Frequency</Text>
                  <Text className="text-primary font-bold">{currentRoutine.frequency}</Text>
                </View>
                <View>
                  <Text className="text-zinc-400 text-sm">Duration</Text>
                  <Text className="text-primary/80 font-bold">{currentRoutine.duration}</Text>
                </View>
              </View>
            </View>

            {currentRoutine.exercises.map((exercise, idx) => (
              <View key={idx} className="bg-zinc-800 rounded-xl p-4 mb-4 last:mb-0">
                <View className="flex-row justify-between items-start mb-2">
                  <Text className="text-white font-bold text-lg flex-1">{exercise.name}</Text>
                  <Text className={`text-${currentRoutine.color}-400 font-bold ml-2`}>
                    {exercise.sets}×{exercise.reps}
                  </Text>
                </View>

                <View className="bg-zinc-900 rounded-xl p-3 mb-3">
                  <Text className="text-primary text-sm font-bold mb-1">Focus:</Text>
                  <Text className="text-white text-sm">{exercise.focus}</Text>
                </View>

                <Text className="text-zinc-400 text-sm font-bold mb-2">Instructions:</Text>
                {exercise.instructions.map((instruction, instIdx) => (
                  <View key={instIdx} className="flex-row items-start mb-1">
                    <Text className={`text-${currentRoutine.color}-400 mr-2`}>{instIdx + 1}.</Text>
                    <Text className="text-zinc-300 text-sm flex-1">{instruction}</Text>
                  </View>
                ))}

                <View className={`${getColorClass(currentRoutine.color)}/10 rounded-xl p-2 mt-3`}>
                  <Text className="text-amber-400 text-xs italic">💡 {exercise.notes}</Text>
                </View>
              </View>
            ))}
          </View>

          <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-6">
            <Text className="text-primary/80 font-bold mb-2">Mobility Tips</Text>
            <Text className="text-primary/60 text-sm mb-2">
              • Do mobility work when muscles are warm
            </Text>
            <Text className="text-primary/60 text-sm mb-2">
              • Consistency &gt; intensity (daily light work &gt; weekly hard work)
            </Text>
            <Text className="text-primary/60 text-sm mb-2">
              • Never force into pain (mild discomfort OK)
            </Text>
            <Text className="text-primary/60 text-sm mb-2">
              • Hold stretches 30-45s minimum for real change
            </Text>
            <Text className="text-primary/60 text-sm">
              • Focus on weak points (most people: hips, thoracic, ankles)
            </Text>
          </View>

          <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-6">
            <Text className="text-primary font-bold mb-2">When to Mobilize</Text>
            <Text className="text-primary/80 text-sm mb-2">
              • Morning: 5-10 min general mobility to wake up
            </Text>
            <Text className="text-primary/80 text-sm mb-2">
              • Pre-workout: Target areas for that session
            </Text>
            <Text className="text-primary/80 text-sm mb-2">
              • Post-workout: Static stretching when warm
            </Text>
            <Text className="text-primary/80 text-sm">
              • Evening: Relaxing stretching before bed
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}


