import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function MeetDayMindset() {
  const [selectedPhase, setSelectedPhase] = useState('preparation');

  const mindsetData = {
    preparation: {
      name: 'Pre-Meet Preparation',
      icon: 'calendar',
      color: 'blue',
      weekBefore: [
        {
          aspect: 'Mental Rehearsal',
          techniques: [
            'Visualize every lift from warm-up to platform',
            'See yourself completing each attempt successfully',
            'Imagine hearing commands and following them',
            'Visualize celebrating PRs',
            'Practice mental cues for each lift',
          ],
          frequency: '5-10 minutes daily',
        },
        {
          aspect: 'Logistics Planning',
          checklist: [
            'Know exact meet location and schedule',
            'Plan arrival time (1-2 hours early)',
            'Pack gear bag (check and double-check)',
            'Attempt selection strategy prepared',
            'Handler/coach communication plan',
            'Backup plans for everything',
          ],
          why: 'Eliminate unknowns. Less to think about on meet day.',
        },
        {
          aspect: 'Routine Establishment',
          plan: [
            'Morning routine: same as training days',
            'Warm-up sequence written down',
            'Music playlist prepared',
            'Pre-lift rituals identified',
            'Between-attempt routine planned',
            'Nutrition and hydration schedule',
          ],
        },
      ],
      nightBefore: {
        dos: [
          'Lay out all gear and check',
          'Set multiple alarms',
          'Light stretching or yoga',
          'Watch motivational lifting videos',
          'Review attempt strategy with coach',
          'Go to bed early (7-9 hours)',
        ],
        donts: [
          'Don\'t stay up late worrying',
          'Don\'t drink alcohol',
          'Don\'t try new foods',
          'Don\'t watch meet fails',
          'Don\'t overthink',
          'Don\'t doom-scroll Instagram',
        ],
      },
    },
    warmup: {
      name: 'Warm-up & Arrival',
      icon: 'play',
      color: 'emerald',
      arrival: {
        timeline: '1.5-2 hours before session',
        priorities: [
          'Check in and get rack heights',
          'Find warm-up area',
          'Set up your space',
          'Bathroom break',
          'Light snack and hydrate',
          'Watch a few lifts to acclimate',
        ],
        atmosphere: [
          'It will be louder than you expect',
          'More chaotic than training',
          'Lots of people and energy',
          'This is normal - embrace it',
        ],
      },
      warmupRoom: {
        strategy: [
          'Start warming up when flight before yours starts',
          'Follow your written warm-up protocol',
          'Don\'t get rushed by others',
          'Stay in your bubble',
          'Trust your warm-up - don\'t add sets',
          'Hit opener weight once, feels easy',
        ],
        mentalApproach: [
          'Warm-up should feel easy',
          'Don\'t show off in warm-up room',
          'Save energy for platform',
          'Stay focused but relaxed',
          'Headphones help block distractions',
        ],
      },
      mistakes: [
        'Getting there too early (burnout)',
        'Arriving too late (rushed)',
        'Watching every lift (anxiety)',
        'Comparing to others warming up',
        'Overthinking',
        'Not eating/drinking',
      ],
    },
    platform: {
      name: 'On the Platform',
      icon: 'trophy',
      color: 'purple',
      approach: {
        title: 'Walking to Platform',
        mindset: [
          'This is YOUR moment',
          'You\'ve done this 1000 times in training',
          'One rep. That\'s it.',
          'Block out everything else',
          'Trust your body',
        ],
        technique: [
          'Take your time walking up',
          'Deep breath',
          'Find your spot on platform',
          'Set up deliberately, not rushed',
          'Don\'t rush because of clock',
        ],
      },
      liftExecution: {
        squat: [
          'Set hands, walk out, settle',
          'Big breath, brace HARD',
          'Wait for squat command (don\'t anticipate)',
          'One second pause in hole',
          'Stand up aggressively',
          'Wait for rack command, step forward, rack',
        ],
        bench: [
          'Settle into position, deep breath',
          'Get handoff (communicate clearly)',
          'Hold at lockout, wait for start command',
          'Control descent, pause on chest',
          'Don\'t wait too long, press when you feel it',
          'Lock out, wait for rack command',
        ],
        deadlift: [
          'Approach bar, set up perfectly',
          'Big breath, brace, GRIP tight',
          'Pull slack out of bar',
          'Rip it off floor',
          'Lock out completely (knees + hips)',
          'Wait for down command, control descent',
        ],
      },
      commands: {
        importance: 'CRITICAL - lifts are failed for missing commands',
        practice: [
          'Practice with commands in training',
          'Have someone call commands',
          'Don\'t anticipate - WAIT',
          'Listen for the actual word',
        ],
        timing: [
          'Squat: ~1 second at depth',
          'Bench: Pause until you feel chest compression',
          'Deadlift: Show full lockout, DON\'T drop',
        ],
      },
    },
    managing: {
      name: 'Managing Emotions',
      icon: 'heart',
      color: 'red',
      nerves: {
        reality: [
          'Everyone is nervous - even elite lifters',
          'Nerves = adrenaline = strength',
          'Nervousness means you care',
          'Use nerves, don\'t fight them',
        ],
        techniques: [
          'Box breathing: 4-4-4-4 (inhale-hold-exhale-hold)',
          'Progressive muscle relaxation',
          'Focus on process, not outcome',
          'Remind yourself: "I\'ve done heavier in training"',
          'Talk to teammates/friends',
        ],
      },
      confidence: {
        building: [
          'Remember your training',
          'You wouldn\'t be here if not ready',
          'Opener should feel like warm-up',
          'Trust the process that got you here',
          'Focus on YOUR meet, not others',
        ],
        affirmations: [
          '"I am prepared"',
          '"I am strong"',
          '"I trust my training"',
          '"This is fun"',
          '"I belong here"',
        ],
      },
      betweenAttempts: {
        timeline: '8-15 minutes between attempts typically',
        whatToDo: [
          'Stay warm (light movement)',
          'Hydrate and small snack',
          'Review next attempt with coach/handler',
          'Visualize successful lift',
          'DON\'T overthink last attempt',
          'Stay in your zone (headphones)',
        ],
        whatNot: [
          'Don\'t watch entire flight (sit out)',
          'Don\'t doubt yourself',
          'Don\'t change strategy dramatically',
          'Don\'t compare your lifts to others',
        ],
      },
    },
    strategy: {
      name: 'Attempt Strategy',
      icon: 'bar-chart',
      color: 'amber',
      philosophy: {
        goal: 'Nine for nine vs maximum total',
        approaches: [
          {
            conservative: '9-for-9 approach',
            description: 'Every attempt is a success, build confidence',
            bestFor: 'First meet, building experience, qualifying totals',
            structure: '1st: 85-90% (certain), 2nd: 92-95% (confident), 3rd: 97-100% (PR attempt)',
          },
          {
            conservative: 'Aggressive approach',
            description: 'Go for PRs, accept potential misses',
            bestFor: 'Experienced lifters, record attempts, peak performance',
            structure: '1st: 90-92% (solid), 2nd: 95-97% (stretch), 3rd: 100-102% (big PR)',
          },
          {
            conservative: 'Balanced approach',
            description: 'Mix of both based on lift',
            bestFor: 'Most lifters, most meets',
            structure: 'Conservative on weak lift, aggressive on strong lift',
          },
        ],
      },
      openers: {
        rule: 'Hit it for easy triple last week of training',
        guidelines: [
          'Should feel like RPE 7-8',
          'No doubt you can hit it',
          'Even on worst day, you\'d make it',
          'Typically 85-92% of max',
          'Strong lift = higher opener okay',
        ],
        mistakes: [
          'Opening too heavy (blown confidence)',
          'Opening too light (leaving pounds)',
          'Ego opening',
        ],
      },
      secondAttempts: {
        success: {
          title: 'If opener success',
          normal: '2.5-5kg jump for squat/dead, 2.5kg for bench',
          comfortable: '5-7.5kg if opener felt easy',
          tight: '2.5kg if opener was a grind',
        },
        miss: {
          title: 'If opener miss',
          decision: [
            'Analyze why: technical vs strength',
            'If technical: Same weight or -2.5kg',
            'If strength: -2.5-5kg',
            'Don\'t panic - everyone misses',
          ],
        },
      },
      thirdAttempts: {
        conservative: 'Secure total and placing',
        aggressive: 'Go for meet/gym PR',
        strategic: 'Based on placing and competition',
        considerations: [
          'What do you need for placing?',
          'What weight have you hit in training?',
          'How did second attempt feel?',
          'Is this your strong or weak lift?',
          'What are your goals today?',
        ],
      },
    },
    after: {
      name: 'Post-Meet Mindset',
      icon: 'checkmark-circle',
      color: 'cyan',
      immediately: {
        title: 'Right After Meet',
        dos: [
          'Celebrate your accomplishments',
          'Thank coach, handler, supporters',
          'Take photos and videos',
          'Eat real food',
          'Hydrate',
          'Light stretching',
        ],
        emotions: [
          'You might cry - that\'s okay',
          'Adrenaline crash is normal',
          'Mix of relief and exhaustion',
          'Let yourself feel everything',
        ],
      },
      reflection: {
        questions: [
          'What went well?',
          'What would I change?',
          'Did strategy work?',
          'How did I handle nerves?',
          'What did I learn?',
        ],
        timing: 'Wait 2-3 days before deep analysis',
        approach: 'Be honest but kind to yourself',
      },
      perspective: {
        success: {
          title: 'If Great Meet',
          celebrate: [
            'You earned this - celebrate!',
            'Share with community',
            'Use as motivation',
            'Remember this feeling',
          ],
          caution: [
            'Don\'t peak too often',
            'One meet doesn\'t define you',
            'Stay humble and hungry',
          ],
        },
        learning: {
          title: 'If Tough Meet',
          reality: [
            'Bad meets happen to everyone',
            'Every elite lifter has bombed out',
            'This is one meet of many',
            'You learned more from this than easy meet',
            'Failure makes you better',
          ],
          action: [
            'Identify specific improvements',
            'Adjust training accordingly',
            'Don\'t quit or panic',
            'Next meet will be better',
          ],
        },
      },
    },
  };

  const currentPhase = mindsetData[selectedPhase as keyof typeof mindsetData];

  const getColorClass = (color: string) => {
    const colors: { [key: string]: string } = {
      blue: 'bg-primary',
      emerald: 'bg-primary',
      purple: 'bg-purple-500',
      red: 'bg-red-500',
      amber: 'bg-amber-500',
      cyan: 'bg-cyan-500',
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
            Meet Day Mindset
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          <View className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl p-6 mb-6">
            <Text className="text-white text-2xl font-bold mb-2">Mental Game</Text>
            <Text className="text-white opacity-90">
              Mastering the psychological side of competition
            </Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6">
            <View className="flex-row gap-3 px-1">
              {Object.entries(mindsetData).map(([key, phase]) => (
                <TouchableOpacity
                  key={key}
                  onPress={() => setSelectedPhase(key)}
                  className={`${
                    selectedPhase === key 
                      ? getColorClass(phase.color)
                      : 'bg-zinc-900'
                  } rounded-xl p-4 border ${
                    selectedPhase === key 
                      ? 'border-white/30'
                      : 'border-zinc-800'
                  } min-w-[200px]`}
                >
                  <Ionicons 
                    name={phase.icon as any} 
                    size={32} 
                    color={selectedPhase === key ? 'white' : '#a1a1aa'} 
                  />
                  <Text className={`${selectedPhase === key ? 'text-white' : 'text-zinc-400'} font-bold mt-2`}>
                    {phase.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          {selectedPhase === 'preparation' && (
            <View>
              {currentPhase.weekBefore?.map((item: any, idx: number) => (
                <View key={idx} className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
                  <Text className="text-primary/80 text-xl font-bold mb-4">{item.aspect}</Text>
                  
                  {item.techniques && (
                    <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-3">
                      <Text className="text-primary/80 font-bold mb-2">Techniques:</Text>
                      {item.techniques.map((tech: string, tIdx: number) => (
                        <Text key={tIdx} className="text-primary/60 text-sm mb-1">â€¢ {tech}</Text>
                      ))}
                    </View>
                  )}

                  {item.checklist && item.checklist.map((check: string, cIdx: number) => (
                    <Text key={cIdx} className="text-zinc-300 mb-2">âœ“ {check}</Text>
                  ))}

                  {item.plan && item.plan.map((p: string, pIdx: number) => (
                    <Text key={pIdx} className="text-zinc-300 mb-2">â€¢ {p}</Text>
                  ))}

                  {item.frequency && (
                    <Text className="text-primary text-sm mt-2">â†’ {item.frequency}</Text>
                  )}

                  {item.why && (
                    <Text className="text-amber-400 text-sm mt-2 italic">{item.why}</Text>
                  )}
                </View>
              ))}

              <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
                <Text className="text-primary/80 text-xl font-bold mb-4">Night Before Meet</Text>
                
                <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-4">
                  <Text className="text-primary font-bold mb-2">âœ“ Do:</Text>
                  {currentPhase.nightBefore?.dos.map((item: string, idx: number) => (
                    <Text key={idx} className="text-primary/80 text-sm mb-1">â€¢ {item}</Text>
                  ))}
                </View>

                <View className="bg-red-500/10 rounded-xl p-4 border border-red-500/30">
                  <Text className="text-red-400 font-bold mb-2">âœ— Don't:</Text>
                  {currentPhase.nightBefore?.donts.map((item: string, idx: number) => (
                    <Text key={idx} className="text-red-300 text-sm mb-1">â€¢ {item}</Text>
                  ))}
                </View>
              </View>
            </View>
          )}

          {selectedPhase === 'warmup' && (
            <View>
              <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
                <Text className="text-primary text-xl font-bold mb-4">Arrival Protocol</Text>
                <View className="bg-primary/10 rounded-xl p-3 border border-primary/30 mb-4">
                  <Text className="text-primary/60 font-bold">Timeline: {currentPhase.arrival?.timeline}</Text>
                </View>

                <Text className="text-white font-bold mb-2">Priorities:</Text>
                {currentPhase.arrival?.priorities.map((priority: string, idx: number) => (
                  <Text key={idx} className="text-zinc-300 mb-2">â€¢ {priority}</Text>
                ))}

                <View className="bg-amber-500/10 rounded-xl p-4 border border-amber-500/30 mt-4">
                  <Text className="text-amber-400 font-bold mb-2">Expect:</Text>
                  {currentPhase.arrival?.atmosphere.map((item: string, idx: number) => (
                    <Text key={idx} className="text-amber-300 text-sm mb-1">â€¢ {item}</Text>
                  ))}
                </View>
              </View>

              <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
                <Text className="text-primary text-xl font-bold mb-4">Warm-up Room</Text>
                
                <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-4">
                  <Text className="text-primary font-bold mb-2">Strategy:</Text>
                  {currentPhase.warmupRoom?.strategy.map((item: string, idx: number) => (
                    <Text key={idx} className="text-primary/80 text-sm mb-1">â€¢ {item}</Text>
                  ))}
                </View>

                <View className="bg-purple-500/10 rounded-xl p-4 border border-purple-500/30">
                  <Text className="text-purple-400 font-bold mb-2">Mental Approach:</Text>
                  {currentPhase.warmupRoom?.mentalApproach.map((item: string, idx: number) => (
                    <Text key={idx} className="text-purple-300 text-sm mb-1">â€¢ {item}</Text>
                  ))}
                </View>
              </View>

              <View className="bg-red-500/10 rounded-xl p-5 border border-red-500/30 mb-6">
                <Text className="text-red-400 font-bold mb-3">Common Mistakes:</Text>
                {currentPhase.mistakes?.map((mistake: string, idx: number) => (
                  <Text key={idx} className="text-red-300 text-sm mb-1">âœ— {mistake}</Text>
                ))}
              </View>
            </View>
          )}

          {selectedPhase === 'platform' && (
            <View>
              <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
                <Text className="text-purple-400 text-xl font-bold mb-4">{currentPhase.approach?.title}</Text>
                
                <View className="bg-purple-500/10 rounded-xl p-4 border border-purple-500/30 mb-4">
                  <Text className="text-purple-400 font-bold mb-2">Mindset:</Text>
                  {currentPhase.approach?.mindset.map((item: string, idx: number) => (
                    <Text key={idx} className="text-purple-300 text-sm mb-1">â€¢ {item}</Text>
                  ))}
                </View>

                <View className="bg-primary/10 rounded-xl p-4 border border-primary/30">
                  <Text className="text-primary/80 font-bold mb-2">Technique:</Text>
                  {currentPhase.approach?.technique.map((item: string, idx: number) => (
                    <Text key={idx} className="text-primary/60 text-sm mb-1">â€¢ {item}</Text>
                  ))}
                </View>
              </View>

              {['squat', 'bench', 'deadlift'].map((lift) => (
                <View key={lift} className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
                  <Text className="text-white text-lg font-bold mb-4 capitalize">{lift} Execution</Text>
                  {currentPhase.liftExecution?.[lift as keyof typeof currentPhase.liftExecution].map((step: string, idx: number) => (
                    <View key={idx} className="flex-row items-start mb-2">
                      <View className="bg-purple-500 rounded-full w-6 h-6 items-center justify-center mr-3 mt-0.5">
                        <Text className="text-white text-xs font-bold">{idx + 1}</Text>
                      </View>
                      <Text className="text-zinc-300 flex-1">{step}</Text>
                    </View>
                  ))}
                </View>
              ))}

              <View className="bg-red-500/10 rounded-xl p-5 border border-red-500/30 mb-6">
                <Text className="text-red-400 font-bold text-lg mb-2">Commands - {currentPhase.commands?.importance}</Text>
                <Text className="text-red-300 text-sm mb-3">Practice:</Text>
                {currentPhase.commands?.practice.map((item: string, idx: number) => (
                  <Text key={idx} className="text-red-300 text-sm mb-1">â€¢ {item}</Text>
                ))}
              </View>
            </View>
          )}

          {selectedPhase === 'managing' && (
            <View>
              {Object.entries(currentPhase).filter(([key]) => !['name', 'icon', 'color'].includes(key)).map(([key, section]: [string, any]) => (
                <View key={key} className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
                  <Text className="text-red-400 text-xl font-bold mb-4 capitalize">{key}</Text>

                  {section.reality && (
                    <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-4">
                      <Text className="text-primary/80 font-bold mb-2">Reality:</Text>
                      {section.reality.map((item: string, idx: number) => (
                        <Text key={idx} className="text-primary/60 text-sm mb-1">â€¢ {item}</Text>
                      ))}
                    </View>
                  )}

                  {section.techniques && (
                    <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-4">
                      <Text className="text-primary font-bold mb-2">Techniques:</Text>
                      {section.techniques.map((item: string, idx: number) => (
                        <Text key={idx} className="text-primary/80 text-sm mb-1">â€¢ {item}</Text>
                      ))}
                    </View>
                  )}

                  {section.building && (
                    <View className="bg-purple-500/10 rounded-xl p-4 border border-purple-500/30 mb-4">
                      <Text className="text-purple-400 font-bold mb-2">Building Confidence:</Text>
                      {section.building.map((item: string, idx: number) => (
                        <Text key={idx} className="text-purple-300 text-sm mb-1">â€¢ {item}</Text>
                      ))}
                    </View>
                  )}

                  {section.affirmations && (
                    <View className="bg-amber-500/10 rounded-xl p-4 border border-amber-500/30 mb-4">
                      <Text className="text-amber-400 font-bold mb-2">Affirmations:</Text>
                      {section.affirmations.map((item: string, idx: number) => (
                        <Text key={idx} className="text-amber-300 text-sm mb-1 italic">"{item}"</Text>
                      ))}
                    </View>
                  )}

                  {section.whatToDo && (
                    <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-3">
                      <Text className="text-primary font-bold mb-2">What To Do:</Text>
                      {section.whatToDo.map((item: string, idx: number) => (
                        <Text key={idx} className="text-primary/80 text-sm mb-1">âœ“ {item}</Text>
                      ))}
                    </View>
                  )}

                  {section.whatNot && (
                    <View className="bg-red-500/10 rounded-xl p-4 border border-red-500/30">
                      <Text className="text-red-400 font-bold mb-2">What NOT To Do:</Text>
                      {section.whatNot.map((item: string, idx: number) => (
                        <Text key={idx} className="text-red-300 text-sm mb-1">âœ— {item}</Text>
                      ))}
                    </View>
                  )}

                  {section.timeline && (
                    <Text className="text-primary/80 text-sm mt-3">Timeline: {section.timeline}</Text>
                  )}
                </View>
              ))}
            </View>
          )}

          {selectedPhase === 'strategy' && (
            <View>
              <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
                <Text className="text-amber-400 text-xl font-bold mb-4">Philosophy: {currentPhase.philosophy?.goal}</Text>
                
                {currentPhase.philosophy?.approaches.map((approach: any, idx: number) => (
                  <View key={idx} className="bg-amber-500/10 rounded-xl p-4 border border-amber-500/30 mb-4 last:mb-0">
                    <Text className="text-amber-400 font-bold mb-1">{approach.conservative}</Text>
                    <Text className="text-amber-300 text-sm mb-2">{approach.description}</Text>
                    <Text className="text-primary/80 text-sm mb-1">Best for: {approach.bestFor || approach['best for']}</Text>
                    <Text className="text-primary text-sm">Structure: {approach.structure}</Text>
                  </View>
                ))}
              </View>

              {Object.entries(currentPhase).filter(([key]) => !['name', 'icon', 'color', 'philosophy'].includes(key)).map(([key, section]: [string, any]) => (
                <View key={key} className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
                  <Text className="text-white text-xl font-bold mb-4 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</Text>

                  {section.rule && (
                    <View className="bg-red-500/10 rounded-xl p-3 border border-red-500/30 mb-3">
                      <Text className="text-red-400 font-bold">Rule: {section.rule}</Text>
                    </View>
                  )}

                  {section.guidelines && section.guidelines.map((guide: string, idx: number) => (
                    <Text key={idx} className="text-zinc-300 mb-2">â€¢ {guide}</Text>
                  ))}

                  {section.mistakes && (
                    <View className="bg-red-500/10 rounded-xl p-4 border border-red-500/30 mt-3">
                      <Text className="text-red-400 font-bold mb-2">Mistakes:</Text>
                      {section.mistakes.map((mistake: string, mIdx: number) => (
                        <Text key={mIdx} className="text-red-300 text-sm mb-1">âœ— {mistake}</Text>
                      ))}
                    </View>
                  )}

                  {section.conservative && (
                    <View className="mb-3">
                      <Text className="text-primary/80 font-bold mb-1">Conservative: {section.conservative}</Text>
                      {section.aggressive && <Text className="text-amber-400 font-bold mb-1">Aggressive: {section.aggressive}</Text>}
                      {section.strategic && <Text className="text-purple-400 font-bold mb-3">Strategic: {section.strategic}</Text>}
                      {section.considerations && (
                        <View className="bg-zinc-800 rounded-xl p-3 mt-2">
                          <Text className="text-white font-bold mb-2 text-sm">Consider:</Text>
                          {section.considerations.map((item: string, cIdx: number) => (
                            <Text key={cIdx} className="text-zinc-300 text-sm mb-1">â€¢ {item}</Text>
                          ))}
                        </View>
                      )}
                    </View>
                  )}
                </View>
              ))}
            </View>
          )}

          {selectedPhase === 'after' && (
            <View>
              {Object.entries(currentPhase).filter(([key]) => !['name', 'icon', 'color'].includes(key)).map(([key, section]: [string, any]) => (
                <View key={key} className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
                  <Text className="text-cyan-400 text-xl font-bold mb-4">{section.title}</Text>

                  {section.dos && section.dos.map((item: string, idx: number) => (
                    <Text key={idx} className="text-zinc-300 mb-2">âœ“ {item}</Text>
                  ))}

                  {section.emotions && (
                    <View className="bg-cyan-500/10 rounded-xl p-4 border border-cyan-500/30 mt-3">
                      <Text className="text-cyan-400 font-bold mb-2">Emotions:</Text>
                      {section.emotions.map((item: string, eIdx: number) => (
                        <Text key={eIdx} className="text-cyan-300 text-sm mb-1">â€¢ {item}</Text>
                      ))}
                    </View>
                  )}

                  {section.questions && (
                    <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-3">
                      <Text className="text-primary/80 font-bold mb-2">Questions:</Text>
                      {section.questions.map((q: string, qIdx: number) => (
                        <Text key={qIdx} className="text-primary/60 text-sm mb-1">â€¢ {q}</Text>
                      ))}
                    </View>
                  )}

                  {section.success && (
                    <View className="mb-4">
                      <Text className="text-primary font-bold text-lg mb-2">{section.success.title}</Text>
                      <View className="bg-primary/10 rounded-xl p-3 border border-primary/30 mb-2">
                        {section.success.celebrate.map((item: string, cIdx: number) => (
                          <Text key={cIdx} className="text-primary/80 text-sm mb-1">âœ“ {item}</Text>
                        ))}
                      </View>
                      <View className="bg-amber-500/10 rounded-xl p-3 border border-amber-500/30">
                        <Text className="text-amber-400 font-bold text-sm mb-1">Caution:</Text>
                        {section.success.caution.map((item: string, cIdx: number) => (
                          <Text key={cIdx} className="text-amber-300 text-sm mb-1">â€¢ {item}</Text>
                        ))}
                      </View>
                    </View>
                  )}

                  {section.learning && (
                    <View>
                      <Text className="text-primary/80 font-bold text-lg mb-2">{section.learning.title}</Text>
                      <View className="bg-primary/10 rounded-xl p-3 border border-primary/30 mb-2">
                        <Text className="text-primary/80 font-bold text-sm mb-1">Reality:</Text>
                        {section.learning.reality.map((item: string, rIdx: number) => (
                          <Text key={rIdx} className="text-primary/60 text-sm mb-1">â€¢ {item}</Text>
                        ))}
                      </View>
                      <View className="bg-primary/10 rounded-xl p-3 border border-primary/30">
                        <Text className="text-primary font-bold text-sm mb-1">Action:</Text>
                        {section.learning.action.map((item: string, aIdx: number) => (
                          <Text key={aIdx} className="text-primary/80 text-sm mb-1">â€¢ {item}</Text>
                        ))}
                      </View>
                    </View>
                  )}
                </View>
              ))}
            </View>
          )}

          <View className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-xl p-5 border border-purple-500/30 mb-6">
            <Text className="text-purple-400 font-bold text-lg mb-3">Remember</Text>
            <Text className="text-purple-300 text-sm mb-2">
              â€¢ Your meet prep is mental as much as physical
            </Text>
            <Text className="text-purple-300 text-sm mb-2">
              â€¢ Nerves are normal - everyone has them
            </Text>
            <Text className="text-purple-300 text-sm mb-2">
              â€¢ Trust your training and preparation
            </Text>
            <Text className="text-purple-300 text-sm">
              â€¢ One meet doesn't define you - it's just one data point
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}


