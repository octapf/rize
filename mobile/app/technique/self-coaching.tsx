import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function SelfCoaching() {
  const [selectedCategory, setSelectedCategory] = useState('diagnosis');

  const coachingData = {
    diagnosis: {
      name: 'Problem Diagnosis',
      icon: 'search',
      color: 'blue',
      problems: [
        {
          problem: 'Missing Depth on Squat',
          diagnosis: [
            'Film from side - is hip crease below knee?',
            'Check ankle mobility (wall test)',
            'Check hip mobility (deep squat hold)',
            'Are you cutting depth intentionally (ego)?',
          ],
          solutions: [
            { solution: 'Ankle mobility work daily', priority: 'High' },
            { solution: 'Hip 90/90 stretches', priority: 'High' },
            { solution: 'Tempo squats (5s down) to build comfort', priority: 'Medium' },
            { solution: 'Box squats to target depth', priority: 'Medium' },
            { solution: 'Goblet squats for mobility', priority: 'Low' },
          ],
        },
        {
          problem: 'Knees Caving In (Valgus)',
          diagnosis: [
            'Film from front - knees track over toes?',
            'Weak glutes or poor activation?',
            'Stance too narrow?',
            'Trying to push knees too far out?',
          ],
          solutions: [
            { solution: 'Glute activation pre-workout (bridges, clamshells)', priority: 'Critical' },
            { solution: 'Widen stance slightly', priority: 'High' },
            { solution: 'Cue "spread the floor" not "knees out"', priority: 'High' },
            { solution: 'Band around knees during warm-up', priority: 'Medium' },
            { solution: 'Bulgarian split squats for glute strength', priority: 'Medium' },
          ],
        },
        {
          problem: 'Hips Shoot Up on Deadlift',
          diagnosis: [
            'Film from side - hips and shoulders rise together?',
            'Hips starting too low?',
            'Weak quads relative to posterior chain?',
            'Not pushing floor away with legs?',
          ],
          solutions: [
            { solution: 'Start with hips higher', priority: 'Critical' },
            { solution: 'Cue "push floor away" not "pull bar"', priority: 'Critical' },
            { solution: 'Deficit deadlifts for quad strength', priority: 'High' },
            { solution: 'Pause deadlifts at knee height', priority: 'Medium' },
            { solution: 'Front squats for quad development', priority: 'Low' },
          ],
        },
        {
          problem: 'Bar Drifts Forward on Bench',
          diagnosis: [
            'Film from side - bar path straight or J-curve?',
            'Losing lat tightness during descent?',
            'Pressing straight up instead of up and back?',
            'Touch point too high on chest?',
          ],
          solutions: [
            { solution: 'Cue "pull bar to chest" on descent', priority: 'Critical' },
            { solution: 'Touch point: lower chest/sternum', priority: 'Critical' },
            { solution: 'Press "up and back" toward shoulders', priority: 'High' },
            { solution: 'Lat pulldowns to strengthen pulling muscles', priority: 'Medium' },
            { solution: 'Paused bench to practice bar path', priority: 'Medium' },
          ],
        },
        {
          problem: 'Lower Back Rounding',
          diagnosis: [
            'Film from side - neutral spine or rounded?',
            'Not bracing properly?',
            'Weak erectors or core?',
            'Trying to squat too deep for your mobility?',
          ],
          solutions: [
            { solution: 'Learn proper bracing (360° pressure)', priority: 'Critical' },
            { solution: 'Reduce depth if mobility limited', priority: 'High' },
            { solution: 'Core work: planks, dead bugs, bird dogs', priority: 'High' },
            { solution: 'Back extensions for erector strength', priority: 'Medium' },
            { solution: 'Belt for heavy sets (reminder to brace)', priority: 'Low' },
          ],
        },
      ],
    },
    selfCorrection: {
      name: 'Self-Correction',
      icon: 'construct',
      color: 'emerald',
      techniques: [
        {
          technique: 'Cue Prioritization',
          description: 'Focus on one cue at a time',
          steps: [
            'Identify biggest fault from video',
            'Choose ONE cue to fix it',
            'Focus on that cue for 2-3 weeks',
            'Once automatic, move to next fault',
            'Don\'t try to fix everything at once',
          ],
          example: 'If knees cave: only cue is "spread the floor" for 3 weeks',
        },
        {
          technique: 'Tempo Training',
          description: 'Slow down to master technique',
          steps: [
            'Reduce weight by 20-30%',
            'Use 3-5 second eccentric (descent)',
            'Brief pause at bottom',
            'Explosive concentric (ascent)',
            'Perfect every single rep',
          ],
          example: '5s down squat at 60% 1RM - builds control and awareness',
        },
        {
          technique: 'Pause Variations',
          description: 'Expose weak positions',
          steps: [
            'Pause 2-3 seconds at sticking point',
            'No bouncing or momentum',
            'Maintain tension throughout',
            'Builds strength at weak position',
            'Improves positional awareness',
          ],
          example: 'Paused bench 2" off chest reveals loss of tightness',
        },
        {
          technique: 'External Feedback',
          description: 'Get objective assessment',
          steps: [
            'Post form check video online',
            'Ask experienced lifter at gym',
            'Hire coach for technique session',
            'Compare your video to elite lifters',
            'Listen to feedback with open mind',
          ],
          example: 'r/formcheck or r/powerlifting for free feedback',
        },
        {
          technique: 'Regression',
          description: 'Step back to move forward',
          steps: [
            'If technique breaks, reduce weight 10-20%',
            'Master the movement pattern',
            'Film and confirm technique is solid',
            'Gradually add weight back',
            'Ego has no place in lifting',
          ],
          example: 'Bench form breaks at 100kg? Drop to 80kg and rebuild',
        },
      ],
    },
    progress: {
      name: 'Tracking Progress',
      icon: 'trending-up',
      color: 'purple',
      metrics: [
        {
          metric: 'Video Library',
          description: 'Keep all your lift videos organized',
          howTo: [
            'Create folder for each lift',
            'Name files with: Date_Lift_Weight_Reps',
            'Example: "2026-01-15_Squat_140kg_5reps.mp4"',
            'Review monthly to see improvement',
            'Compare same weight over time',
          ],
          benefit: 'Objective proof of technique improvement',
        },
        {
          metric: 'Form Checklist',
          description: 'Rate your technique each session',
          howTo: [
            'Create checklist of 5-7 key cues per lift',
            'After filming, rate each cue 1-10',
            'Track scores over time',
            'Identify consistent weak points',
            'Celebrate improvements',
          ],
          benefit: 'Quantifies subjective "feel"',
        },
        {
          metric: 'Weight at Good Technique',
          description: 'Track max weight with perfect form',
          howTo: [
            'Log heaviest weight with no form breakdown',
            'This is your "true" max',
            'Compare to absolute max (any form)',
            'Goal: close the gap',
            'Technique max should approach absolute max',
          ],
          benefit: 'Encourages prioritizing form over ego',
        },
        {
          metric: 'Fault Frequency',
          description: 'How often faults occur',
          howTo: [
            'Count reps with specific fault (e.g., knees cave)',
            'Track: 3/5 reps, 1/5 reps, 0/5 reps',
            'Improvement = lower frequency',
            'Even at heavy weights',
            'Goal: zero faults at 80%+ 1RM',
          ],
          benefit: 'Tracks technique consistency',
        },
      ],
    },
  };

  const currentData = coachingData[selectedCategory as keyof typeof coachingData];

  const getColorClasses = (color: string) => {
    const colors: { [key: string]: { bg: string; border: string; text: string } } = {
      blue: { bg: 'bg-blue-500', border: 'border-blue-400', text: 'text-blue-400' },
      emerald: { bg: 'bg-emerald-500', border: 'border-emerald-400', text: 'text-emerald-400' },
      purple: { bg: 'bg-purple-500', border: 'border-purple-400', text: 'text-purple-400' },
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
            Self-Coaching Guide
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          <View className="bg-gradient-to-r from-emerald-500 to-blue-500 rounded-xl p-6 mb-6">
            <Text className="text-white text-2xl font-bold mb-2">Coach Yourself</Text>
            <Text className="text-white opacity-90">
              Identify and fix your own faults
            </Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6">
            <View className="flex-row gap-3 px-1">
              {Object.entries(coachingData).map(([key, data]) => (
                <TouchableOpacity
                  key={key}
                  onPress={() => setSelectedCategory(key)}
                  className={`${
                    selectedCategory === key 
                      ? getColorClasses(data.color).bg
                      : 'bg-zinc-900'
                  } rounded-xl p-4 border ${
                    selectedCategory === key 
                      ? getColorClasses(data.color).border
                      : 'border-zinc-800'
                  } min-w-[180px]`}
                >
                  <Ionicons 
                    name={data.icon as any} 
                    size={32} 
                    color={selectedCategory === key ? 'white' : '#a1a1aa'} 
                  />
                  <Text className={`${selectedCategory === key ? 'text-white' : 'text-zinc-400'} font-bold mt-2`}>
                    {data.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          {selectedCategory === 'diagnosis' && (
            <View>
              {coachingData.diagnosis.problems.map((item, idx) => (
                <View key={idx} className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
                  <Text className="text-red-400 text-xl font-bold mb-4">{item.problem}</Text>

                  <Text className="text-white font-bold mb-2">Diagnosis Questions:</Text>
                  {item.diagnosis.map((q, qIdx) => (
                    <Text key={qIdx} className="text-zinc-300 text-sm mb-2">
                      • {q}
                    </Text>
                  ))}

                  <Text className="text-emerald-400 font-bold mt-4 mb-3">Solutions:</Text>
                  {item.solutions.map((sol, sIdx) => (
                    <View key={sIdx} className="bg-zinc-800 rounded-xl p-3 mb-2 last:mb-0">
                      <View className="flex-row justify-between items-center">
                        <Text className="text-white flex-1">{sol.solution}</Text>
                        <View className={`${
                          sol.priority === 'Critical' ? 'bg-red-500' :
                          sol.priority === 'High' ? 'bg-orange-500' :
                          sol.priority === 'Medium' ? 'bg-amber-500' :
                          'bg-zinc-600'
                        } rounded-full px-3 py-1 ml-2`}>
                          <Text className="text-white text-xs font-bold">{sol.priority}</Text>
                        </View>
                      </View>
                    </View>
                  ))}
                </View>
              ))}
            </View>
          )}

          {selectedCategory === 'selfCorrection' && (
            <View>
              {coachingData.selfCorrection.techniques.map((tech, idx) => (
                <View key={idx} className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
                  <Text className="text-emerald-400 text-xl font-bold mb-2">{tech.technique}</Text>
                  <Text className="text-zinc-400 mb-4">{tech.description}</Text>

                  <Text className="text-white font-bold mb-3">Steps:</Text>
                  {tech.steps.map((step, sIdx) => (
                    <View key={sIdx} className="flex-row items-start mb-2">
                      <Text className="text-emerald-400 font-bold mr-2">{sIdx + 1}.</Text>
                      <Text className="text-white text-sm flex-1">{step}</Text>
                    </View>
                  ))}

                  <View className="bg-emerald-500/10 rounded-xl p-3 border border-emerald-500/30 mt-4">
                    <Text className="text-emerald-400 font-bold text-sm mb-1">Example:</Text>
                    <Text className="text-emerald-300 text-sm">{tech.example}</Text>
                  </View>
                </View>
              ))}
            </View>
          )}

          {selectedCategory === 'progress' && (
            <View>
              {coachingData.progress.metrics.map((metric, idx) => (
                <View key={idx} className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
                  <Text className="text-purple-400 text-xl font-bold mb-2">{metric.metric}</Text>
                  <Text className="text-zinc-400 mb-4">{metric.description}</Text>

                  <Text className="text-white font-bold mb-3">How to Track:</Text>
                  {metric.howTo.map((how, hIdx) => (
                    <Text key={hIdx} className="text-zinc-300 text-sm mb-2">
                      • {how}
                    </Text>
                  ))}

                  <View className="bg-purple-500/10 rounded-xl p-3 border border-purple-500/30 mt-4">
                    <Text className="text-purple-400 font-bold text-sm mb-1">Benefit:</Text>
                    <Text className="text-purple-300 text-sm">{metric.benefit}</Text>
                  </View>
                </View>
              ))}
            </View>
          )}

          <View className="bg-amber-500/10 rounded-xl p-4 border border-amber-500/30 mb-6">
            <Text className="text-amber-400 font-bold mb-2">Self-Coaching Mindset</Text>
            <Text className="text-amber-300 text-sm mb-2">
              • Be objective - video doesn't lie, feelings do
            </Text>
            <Text className="text-amber-300 text-sm mb-2">
              • Be patient - technique changes take weeks, not days
            </Text>
            <Text className="text-amber-300 text-sm mb-2">
              • Be humble - drop weight to fix form
            </Text>
            <Text className="text-amber-300 text-sm mb-2">
              • Be consistent - film every session
            </Text>
            <Text className="text-amber-300 text-sm">
              • Be smart - get external feedback when stuck
            </Text>
          </View>

          <View className="bg-blue-500/10 rounded-xl p-4 border border-blue-500/30 mb-6">
            <Text className="text-blue-400 font-bold mb-2">When to Get a Coach</Text>
            <Text className="text-blue-300 text-sm mb-2">
              • Consistently struggling with same fault
            </Text>
            <Text className="text-blue-300 text-sm mb-2">
              • Preparing for competition
            </Text>
            <Text className="text-blue-300 text-sm mb-2">
              • Plateau despite good self-coaching
            </Text>
            <Text className="text-blue-300 text-sm mb-2">
              • Want expert programming
            </Text>
            <Text className="text-blue-300 text-sm">
              • Worth the investment for serious lifters
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
