import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function PowerliftingGuide() {
  const [selectedSection, setSelectedSection] = useState('basics');

  const guideData = {
    basics: {
      name: 'Powerlifting Basics',
      icon: 'information-circle',
      color: 'blue',
      sections: [
        {
          title: 'What is Powerlifting?',
          content: [
            'Sport of absolute strength in three lifts',
            'Squat, bench press, deadlift (in that order)',
            'Three attempts per lift',
            'Heaviest successful attempt counts',
            'Total = squat + bench + deadlift',
            'Winner = highest total in weight class',
          ],
        },
        {
          title: 'Weight Classes',
          content: [
            'Men: 59kg, 66kg, 74kg, 83kg, 93kg, 105kg, 120kg, 120kg+',
            'Women: 47kg, 52kg, 57kg, 63kg, 69kg, 76kg, 84kg, 84kg+',
            'Weigh-in typically 2 hours before lifting',
            '24-hour weigh-in at some federations',
            'Compete in your natural weight class as beginner',
          ],
        },
        {
          title: 'Equipment Divisions',
          content: [
            'Raw: Knee sleeves, belt, wrist wraps only',
            'Raw with Wraps: Add knee wraps',
            'Equipped: Add supportive squat/bench suits',
            'Most beginners compete raw',
            'Equipped adds 50-150kg to lifts (advanced)',
          ],
        },
        {
          title: 'Federations',
          content: [
            'USAPL/IPF: Strictest rules, drug tested, Olympic-style',
            'USPA: More lenient depth, untested option',
            'RPS: More lenient, wide variety of divisions',
            '100% Raw: Minimal equipment, strict judging',
            'Choose based on what\'s available locally',
          ],
        },
      ],
    },
    rules: {
      name: 'Competition Rules',
      icon: 'document-text',
      color: 'red',
      lifts: [
        {
          lift: 'Squat',
          commands: [
            { command: 'Start', when: 'Bar loaded, lifter under bar', action: 'Lifter steps back, sets feet' },
            { command: 'Squat', when: 'Lifter motionless', action: 'Descend and squat' },
            { command: 'Rack', when: 'Standing fully upright', action: 'Walk forward, rack bar' },
          ],
          rules: [
            'Hip crease must pass below top of knee',
            'Must wait for "Squat" command before descending',
            'Must stand fully upright before "Rack" command',
            'Feet must stay flat (no rising on toes)',
            'No downward movement during ascent',
          ],
          redLights: [
            'Not deep enough (most common)',
            'Double bounce at bottom',
            'Moving before commands',
            'Stepping forward/backward during lift',
            'Uneven lockout',
          ],
        },
        {
          lift: 'Bench Press',
          commands: [
            { command: 'Start', when: 'Bar loaded, lifter set', action: 'Handoff from spotters' },
            { command: 'Press', when: 'Bar motionless on chest', action: 'Press bar up' },
            { command: 'Rack', when: 'Elbows locked out', action: 'Return to rack' },
          ],
          rules: [
            'Head, shoulders, butt on bench entire time',
            'Feet flat on floor entire time',
            'Bar must touch chest and pause',
            'Bar must be pressed evenly (no uneven extension)',
            'Must lock out elbows fully',
          ],
          redLights: [
            'Butt comes off bench',
            'Heaving or bouncing bar off chest',
            'Uneven lockout',
            'Downward movement during press',
            'Not waiting for commands',
          ],
        },
        {
          lift: 'Deadlift',
          commands: [
            { command: 'Down', when: 'Standing fully upright, shoulders back', action: 'Lower bar to platform' },
          ],
          rules: [
            'Bar must leave platform in one motion',
            'Stand fully upright at top',
            'Shoulders back at lockout',
            'Knees locked at top',
            'Must control descent (no dropping)',
          ],
          redLights: [
            'Hitching (supporting bar on thighs and sliding up)',
            'Ramping (bar hits knees going up)',
            'Not locked out (knees or hips soft)',
            'Dropping the bar',
            'Downward movement before lockout',
          ],
        },
      ],
    },
    preparation: {
      name: 'Meet Preparation',
      icon: 'calendar',
      color: 'purple',
      timeline: [
        {
          phase: '12-16 Weeks Out',
          focus: 'Build strength base',
          training: [
            'High volume, moderate intensity',
            'Build work capacity',
            'Address weak points',
            'Perfect technique',
            'No need to peak yet',
          ],
          nutrition: 'Slight surplus, focus on performance',
        },
        {
          phase: '8-10 Weeks Out',
          focus: 'Intensification',
          training: [
            'Reduce volume, increase intensity',
            'Heavier weights (80-90% 1RM)',
            'Start practicing attempts',
            'Maintain technique under load',
            'Reduce accessories',
          ],
          nutrition: 'Maintenance or slight surplus',
        },
        {
          phase: '4-6 Weeks Out',
          focus: 'Competition specificity',
          training: [
            'Heavy singles and doubles',
            'Practice commands and pauses',
            'Minimal volume',
            'Test openers (planned first attempts)',
            'Deload after testing',
          ],
          nutrition: 'Start considering weight class',
        },
        {
          phase: '2-3 Weeks Out',
          focus: 'Peak and recover',
          training: [
            'Deload week 2 weeks out',
            'Very light work 10 days out',
            'No training 4-7 days before meet',
            'Trust your training',
            'Practice set-up routines',
          ],
          nutrition: 'Make weight, optimize recovery',
        },
        {
          phase: 'Meet Week',
          focus: 'Execute',
          training: [
            'No heavy lifting',
            'Light movement/mobility only',
            'Visualize lifts',
            'Dial in warm-up protocol',
            'Pack gear, check equipment list',
          ],
          nutrition: 'Taper water if cutting, stay fueled',
        },
      ],
    },
    meetDay: {
      name: 'Meet Day Strategy',
      icon: 'trophy',
      color: 'amber',
      strategies: [
        {
          aspect: 'Attempt Selection',
          guidelines: [
            'Opener: 85-90% 1RM (should move fast)',
            'Second: 92-95% 1RM (PR or close)',
            'Third: 97-102% 1RM (shoot for moon)',
            'Conservative openers = successful meet',
            'Missing opener is meet disaster',
            'Can always go heavier on 2nd/3rd',
          ],
          example: '1RM: 200kg | Opener: 175kg | Second: 190kg | Third: 205kg',
        },
        {
          aspect: 'Warm-up Protocol',
          guidelines: [
            'Start general warm-up 45min before flight',
            'First warm-up lift when 5-7 lifters out',
            'Gradual progression to opener',
            'Last warm-up 80-85% opener weight',
            'Time last warm-up 2-3 lifters before you',
            'Stay warm between attempts (15-20 min)',
          ],
          example: 'Opener 140kg: 60kg x5, 80kg x3, 100kg x2, 120kg x1 â†’ platform',
        },
        {
          aspect: 'Between Attempts',
          guidelines: [
            'Stay warm, don\'t sit too long',
            'Light movement, stretching',
            'Hydrate and snack',
            'Mental visualization',
            'Don\'t watch other lifters bomb out',
            'Focus on your lift only',
          ],
          example: 'Walk around, bands, mobility, sip water, breathe',
        },
        {
          aspect: 'Mental Game',
          guidelines: [
            'Trust your training',
            'Don\'t let crowd/atmosphere psyche you out',
            'Execute your routine exactly as practice',
            'If you miss, analyze quickly then move on',
            'Stay positive regardless of results',
            'Enjoy the experience',
          ],
          example: 'Missed opener? Repeat weight with technical fix',
        },
      ],
    },
  };

  const currentSection = guideData[selectedSection as keyof typeof guideData];

  const getColorClass = (color: string) => {
    const colors: { [key: string]: string } = {
      blue: 'bg-primary',
      red: 'bg-red-500',
      purple: 'bg-purple-500',
      amber: 'bg-amber-500',
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
            Powerlifting Guide
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          <View className="bg-gradient-to-r from-red-500 to-purple-500 rounded-xl p-6 mb-6">
            <Text className="text-white text-2xl font-bold mb-2">Compete Strong</Text>
            <Text className="text-white opacity-90">
              Complete guide to powerlifting competition
            </Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6">
            <View className="flex-row gap-3 px-1">
              {Object.entries(guideData).map(([key, section]) => (
                <TouchableOpacity
                  key={key}
                  onPress={() => setSelectedSection(key)}
                  className={`${
                    selectedSection === key 
                      ? getColorClass(section.color)
                      : 'bg-zinc-900'
                  } rounded-xl p-4 border ${
                    selectedSection === key 
                      ? 'border-white/30'
                      : 'border-zinc-800'
                  } min-w-[180px]`}
                >
                  <Ionicons 
                    name={section.icon as any} 
                    size={32} 
                    color={selectedSection === key ? 'white' : '#a1a1aa'} 
                  />
                  <Text className={`${selectedSection === key ? 'text-white' : 'text-zinc-400'} font-bold mt-2`}>
                    {section.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          {selectedSection === 'basics' && (
            <View>
              {guideData.basics.sections.map((section, idx) => (
                <View key={idx} className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
                  <Text className="text-primary/80 text-xl font-bold mb-4">{section.title}</Text>
                  {section.content.map((item, itemIdx) => (
                    <Text key={itemIdx} className="text-zinc-300 text-sm mb-2 last:mb-0">
                      • {item}
                    </Text>
                  ))}
                </View>
              ))}
            </View>
          )}

          {selectedSection === 'rules' && (
            <View>
              {guideData.rules.lifts.map((liftData, idx) => (
                <View key={idx} className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
                  <Text className="text-red-400 text-2xl font-bold mb-4">{liftData.lift}</Text>

                  <Text className="text-white font-bold mb-3">Commands:</Text>
                  {liftData.commands.map((cmd, cmdIdx) => (
                    <View key={cmdIdx} className="bg-zinc-800 rounded-xl p-4 mb-3 last:mb-4">
                      <Text className="text-primary font-bold mb-1">"{cmd.command}"</Text>
                      <Text className="text-zinc-400 text-sm mb-1">When: {cmd.when}</Text>
                      <Text className="text-white text-sm">Action: {cmd.action}</Text>
                    </View>
                  ))}

                  <Text className="text-white font-bold mb-3">Rules:</Text>
                  {liftData.rules.map((rule, rIdx) => (
                    <Text key={rIdx} className="text-zinc-300 text-sm mb-2">
                      ✓ {rule}
                    </Text>
                  ))}

                  <Text className="text-red-400 font-bold mt-4 mb-3">Common Red Lights:</Text>
                  {liftData.redLights.map((red, redIdx) => (
                    <Text key={redIdx} className="text-red-300 text-sm mb-2">
                      ✓ {red}
                    </Text>
                  ))}
                </View>
              ))}
            </View>
          )}

          {selectedSection === 'preparation' && (
            <View>
              {guideData.preparation.timeline.map((phase, idx) => (
                <View key={idx} className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
                  <View className="bg-purple-500 rounded-xl px-4 py-2 mb-4">
                    <Text className="text-white font-bold text-lg">{phase.phase}</Text>
                  </View>

                  <View className="bg-zinc-800 rounded-xl p-4 mb-4">
                    <Text className="text-purple-400 font-bold mb-2">Focus:</Text>
                    <Text className="text-white">{phase.focus}</Text>
                  </View>

                  <Text className="text-white font-bold mb-3">Training:</Text>
                  {phase.training.map((item, tIdx) => (
                    <Text key={tIdx} className="text-zinc-300 text-sm mb-2">
                      • {item}
                    </Text>
                  ))}

                  <View className="bg-primary/10 rounded-xl p-3 border border-primary/30 mt-4">
                    <Text className="text-primary font-bold text-sm mb-1">Nutrition:</Text>
                    <Text className="text-primary/80 text-sm">{phase.nutrition}</Text>
                  </View>
                </View>
              ))}
            </View>
          )}

          {selectedSection === 'meetDay' && (
            <View>
              {guideData.meetDay.strategies.map((strategy, idx) => (
                <View key={idx} className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
                  <Text className="text-amber-400 text-xl font-bold mb-4">{strategy.aspect}</Text>

                  {strategy.guidelines.map((guideline, gIdx) => (
                    <Text key={gIdx} className="text-zinc-300 text-sm mb-2">
                      • {guideline}
                    </Text>
                  ))}

                  <View className="bg-amber-500/10 rounded-xl p-3 border border-amber-500/30 mt-4">
                    <Text className="text-amber-400 font-bold text-sm mb-1">Example:</Text>
                    <Text className="text-amber-300 text-sm">{strategy.example}</Text>
                  </View>
                </View>
              ))}
            </View>
          )}

          <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-6">
            <Text className="text-primary font-bold mb-2">First Meet Tips</Text>
            <Text className="text-primary/80 text-sm mb-2">
              • Go 9/9 (make all 9 attempts) - conservative openers
            </Text>
            <Text className="text-primary/80 text-sm mb-2">
              • Experience &gt; total on first meet
            </Text>
            <Text className="text-primary/80 text-sm mb-2">
              • Bring handler/coach if possible
            </Text>
            <Text className="text-primary/80 text-sm mb-2">
              • Practice commands in training
            </Text>
            <Text className="text-primary/80 text-sm">
              • Have fun - it's supposed to be enjoyable!
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}


