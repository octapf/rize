import React, { useState } from 'react';
import { Text } from '@/components/ui/Text';
import { View, TouchableOpacity, ScrollView } from 'react-native';;
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function DealingWithFailure() {
  const [selectedSection, setSelectedSection] = useState('types');

  const failureData = {
    types: {
      name: 'Types of Failure',
      icon: 'close-circle',
      color: 'red',
      categories: [
        {
          type: 'Missed Lift',
          scenarios: [
            'Failed attempt at meet',
            'Missed PR attempt in training',
            'Technical breakdown under load',
            'Red lights on platform',
          ],
          normalcy: 'EXTREMELY NORMAL - everyone misses lifts',
        },
        {
          type: 'Bombed Out',
          definition: 'Failed all 3 attempts on a lift = disqualified',
          reality: [
            'Happens to every competitive lifter eventually',
            'Even world champions have bombed',
            'Usually opener selection or technical issue',
            'Devastating but not career-ending',
          ],
        },
        {
          type: 'Underperformance',
          scenarios: [
            'Hit attempts but totals way below training',
            'Went 9/9 but all easy weights',
            'Bodyweight went wrong direction',
            'Peaked at wrong time',
          ],
          feeling: 'Often worse than bomb-out because "what if"',
        },
        {
          type: 'Injury Setback',
          scenarios: [
            'Got injured and had to withdraw',
            'Reinjured old problem',
            'Can\'t do main lifts anymore',
            'Surgery needed',
          ],
          difficulty: 'Hardest type - requires long-term adaptation',
        },
      ],
    },
    immediate: {
      name: 'Immediate Response',
      icon: 'time',
      color: 'amber',
      rightAfter: {
        title: 'First Hour After Failure',
        emotions: [
          'Anger - at yourself, the sport, everything',
          'Embarrassment - everyone saw',
          'Disappointment - let yourself/others down',
          'Confusion - what went wrong?',
          'Sadness - months of work for this',
        ],
        allow: [
          'Feel everything - don\'t suppress',
          'Cry if you need to',
          'Be frustrated',
          'Vent to coach/friend',
          'Take space if needed',
        ],
        avoid: [
          'Making rash decisions ("I quit")',
          'Lashing out at others',
          'Self-harm or dangerous behavior',
          'Posting emotional rants online',
          'Analyzing immediately (too emotional)',
        ],
      },
      firstDay: {
        title: 'Rest of the Day',
        dos: [
          'Get away from gym environment',
          'Talk to supportive people',
          'Do something you enjoy (distraction okay)',
          'Eat comfort food (within reason)',
          'Light activity if helps (walk)',
          'Journal if that helps you process',
        ],
        donts: [
          'Watch videos of the failure repeatedly',
          'Read comments/criticism',
          'Make training decisions',
          'Start "fixing" things',
          'Isolate completely',
          'Turn to unhealthy coping (alcohol, etc)',
        ],
      },
    },
    processing: {
      name: 'Processing & Analysis',
      icon: 'analytics',
      color: 'blue',
      timeline: {
        description: 'Give yourself time before deep dive',
        immediate: 'Day 0-2: Feel emotions, rest, distract',
        early: 'Day 3-5: Light analysis, identify obvious issues',
        deep: 'Week 2+: Thorough analysis with coach, plan changes',
        moving: 'Week 3-4+: Implement changes, look forward',
      },
      analysis: {
        title: 'What to Analyze',
        questions: [
          {
            question: 'What specifically went wrong?',
            examples: [
              'Technical breakdown (which cue failed?)',
              'Mental game (nerves, focus)',
              'Strategy (opener too heavy)',
              'Physical (injury, fatigue)',
              'External (judging, equipment)',
            ],
          },
          {
            question: 'Was it predictable?',
            indicators: [
              'Did training show signs?',
              'Were there red flags ignored?',
              'Was prep optimal?',
              'Did you feel ready?',
            ],
          },
          {
            question: 'What was in my control?',
            controllable: [
              'Technique practice',
              'Attempt selection',
              'Mental preparation',
              'Physical preparation',
              'Recovery and nutrition',
            ],
            uncontrollable: [
              'Judging decisions (sometimes)',
              'Bad day (everyone has them)',
              'Unexpected issues',
              'Other competitors',
            ],
          },
        ],
        process: [
          'Write it all down objectively',
          'Review videos without emotion',
          'Discuss with coach (not blame)',
          'Identify 2-3 key takeaways max',
          'Create specific action plan',
        ],
      },
      perspectives: [
        {
          perspective: 'Growth Mindset',
          statements: [
            '"This is data, not destiny"',
            '"Every champion has failed"',
            '"I learned more from this than a perfect meet"',
            '"This reveals what to work on"',
            '"Temporary setback, not permanent state"',
          ],
        },
        {
          perspective: 'Realistic Expectations',
          truths: [
            'Not every training cycle leads to PRs',
            'Peaking is hard - timing is tricky',
            'Outside factors matter (stress, sleep, life)',
            'Strength isn\'t linear - plateaus happen',
            'Competition is different than training',
          ],
        },
      ],
    },
    learning: {
      name: 'Learning & Adapting',
      icon: 'school',
      color: 'primary',
      commonLessons: [
        {
          lesson: 'Opener Selection',
          problem: 'Opened too heavy, missed, threw off whole meet',
          solution: [
            'Opener should be weight you can triple',
            'Hit it last week of training',
            'When in doubt, go lighter',
            'Confidence > ego',
          ],
          prevention: 'Conservative openers, always',
        },
        {
          lesson: 'Mental Preparation',
          problem: 'Nerves destroyed performance',
          solution: [
            'Practice visualization more',
            'Simulate meet environment in training',
            'Breathing exercises',
            'Pre-meet routine and rituals',
            'More meet experience helps',
          ],
          prevention: 'Compete more often, practice mental skills',
        },
        {
          lesson: 'Technical Breakdown',
          problem: 'Form fell apart under pressure/fatigue',
          solution: [
            'More submaximal technique work',
            'Film more training lifts',
            'Specific weak point training',
            'Practice commands and pauses',
          ],
          prevention: 'Technique work even in off-season',
        },
        {
          lesson: 'Overreaching',
          problem: 'Went into meet beat up, over-trained',
          solution: [
            'Better deload protocol',
            'More recovery time',
            'Reduce volume last 2 weeks more',
            'Listen to body signals',
          ],
          prevention: 'Proper taper, trust deloads',
        },
        {
          lesson: 'Weight Cut Issues',
          problem: 'Cut too much, performed weak',
          solution: [
            'Move up weight class',
            'Smaller cut if must cut',
            'Better timeline for cut',
            '24h weigh-in if available',
          ],
          prevention: 'Compete at comfortable bodyweight',
        },
      ],
      implementation: {
        title: 'How to Apply Lessons',
        steps: [
          'Identify 1-3 specific changes needed',
          'Create concrete action plan',
          'Implement gradually (don\'t overhaul everything)',
          'Track if changes are working',
          'Give changes time (months, not weeks)',
          'Test at next meet',
        ],
        mistakes: [
          'Changing everything at once',
          'Not giving changes time to work',
          'Switching programs constantly',
          'Ignoring root cause',
          'Not tracking what you change',
        ],
      },
    },
    rebuilding: {
      name: 'Rebuilding Confidence',
      icon: 'trending-up',
      color: 'purple',
      mental: {
        title: 'Mental Recovery',
        strategies: [
          {
            strategy: 'Reframe the Narrative',
            from: '"I\'m a failure / I can\'t do this"',
            to: '"I had a setback / I\'m learning and improving"',
            practice: 'Catch negative self-talk, consciously reframe',
          },
          {
            strategy: 'Find Evidence of Capability',
            actions: [
              'Review past PRs and successes',
              'Look at training logs showing progress',
              'Remember compliments from coaches',
              'Acknowledge effort and consistency',
            ],
          },
          {
            strategy: 'Compassionate Self-Talk',
            examples: [
              '"I trained hard and did my best"',
              '"Everyone fails sometimes"',
              '"My worth isn\'t determined by one meet"',
              '"I\'m still strong and capable"',
            ],
          },
        ],
      },
      physical: {
        title: 'Physical Confidence Building',
        approach: [
          {
            phase: 'Week 1-2: Low Intensity',
            focus: 'Just move, feel strong',
            training: [
              'Lighter weights (60-70%)',
              'Higher reps, perfect form',
              'Enjoy the movement',
              'No testing, no maxes',
            ],
          },
          {
            phase: 'Week 3-4: Build Back Up',
            focus: 'Gradual progression',
            training: [
              'Increase to 75-80%',
              'Moderate reps (5-8)',
              'Start feeling weight again',
              'Small PRs okay (rep PRs)',
            ],
          },
          {
            phase: 'Week 5+: Normal Training',
            focus: 'Back to regular program',
            training: [
              'Follow program as written',
              'Trust the process',
              'Focus on consistency',
              'Build toward next goal',
            ],
          },
        ],
      },
      milestones: {
        title: 'Rebuilding Milestones',
        small: [
          'First training session back (showed up)',
          'Hit previous "failed" weight in training',
          'Completed full training week',
          'PR any lift (even variant)',
        ],
        medium: [
          'Consistent for a month',
          'Compete again (regardless of result)',
          'Hit old maxes in training',
          'Feel genuinely excited to train',
        ],
        large: [
          'Exceed pre-failure numbers',
          'Successful meet (whatever that means to you)',
          'Help others through their failures',
          'Truly put it behind you',
        ],
      },
    },
    perspective: {
      name: 'Long-Term Perspective',
      icon: 'telescope',
      color: 'cyan',
      reality: {
        title: 'The Reality of Strength Sports',
        truths: [
          'Every elite lifter has failed spectacularly',
          'Failure is not exception, it\'s part of the process',
          'Your worst meet makes you better for next one',
          'Nobody remembers your failures as much as you do',
          'Consistency over years matters more than one meet',
        ],
        examples: [
          {
            lifter: 'World Champions',
            failures: 'Have bombed out, missed world records, had terrible meets',
            result: 'Came back stronger, learned, dominated later',
          },
          {
            lifter: 'Your Heroes',
            failures: 'Have all experienced what you\'re experiencing',
            result: 'They kept going - that\'s what made them heroes',
          },
        ],
      },
      timeframe: {
        title: 'Zoom Out',
        perspectives: [
          {
            view: '1 Week Later',
            feeling: 'Still stings, but less intense',
            focus: 'Starting to see lessons',
          },
          {
            view: '1 Month Later',
            feeling: 'Back to normal training',
            focus: 'Implementing changes',
          },
          {
            view: '6 Months Later',
            feeling: 'Barely remember specifics',
            focus: 'Stronger because of lessons learned',
          },
          {
            view: '1 Year Later',
            feeling: 'Grateful for the experience',
            focus: 'It made you better',
          },
        ],
      },
      questions: {
        title: 'Questions for Perspective',
        ask: [
          'Will this matter in 5 years?',
          'Did I do my best with what I knew then?',
          'What would I tell a friend in this situation?',
          'Am I better than when I started this sport?',
          'Do I still love lifting?',
        ],
      },
    },
    deciding: {
      name: 'Moving Forward',
      icon: 'arrow-forward',
      color: 'primary',
      options: [
        {
          option: 'Compete Again',
          when: 'Failure was specific issue you can fix',
          approach: [
            'Address root cause',
            'Give yourself adequate prep time',
            'Maybe try different meet (local vs nationals)',
            'Use as redemption motivation',
          ],
          mindset: 'Get back on the horse',
        },
        {
          option: 'Take Break from Competing',
          when: 'Burned out, need perspective, life circumstances',
          approach: [
            'Still train, but no meet pressure',
            'Focus on enjoying lifting',
            'Work on weak points without timeline',
            'Compete when you WANT to, not feel you HAVE to',
          ],
          mindset: 'Compete for right reasons, not proving point',
        },
        {
          option: 'Change Approach',
          when: 'Current style/program not working',
          approach: [
            'Try different programming',
            'New coach or training environment',
            'Different weight class',
            'Different federation or meet style',
          ],
          mindset: 'Adapt and evolve',
        },
        {
          option: 'Shift Focus',
          when: 'Maybe powerlifting isn\'t your main thing',
          approach: [
            'Try strongman, Olympic lifting, general strength',
            'Make it hobby not obsession',
            'Focus on health and longevity',
            'Lift for joy, not validation',
          ],
          mindset: 'It\'s okay if priorities change',
        },
      ],
      decision: {
        title: 'How to Decide',
        questions: [
          'Do I still enjoy training?',
          'Is this failure making me hate the sport?',
          'What are my actual goals?',
          'Am I doing this for me or others?',
          'What would make me excited again?',
        ],
        rule: 'You don\'t have to decide immediately. Give it time.',
      },
    },
  };

  const currentSection = failureData[selectedSection as keyof typeof failureData];

  const getColorClass = (color: string) => {
    const colors: { [key: string]: string } = {
      red: 'bg-red-500',
      amber: 'bg-amber-500',
      blue: 'bg-primary',
      primary: 'bg-primary',
      purple: 'bg-purple-500',
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
            Dealing with Failure
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          <View className="bg-gradient-to-r from-red-500 to-primary rounded-xl p-6 mb-6">
            <Text className="text-white text-2xl font-bold mb-2">Bounce Back Stronger</Text>
            <Text className="text-white opacity-90">
              Turning setbacks into comebacks
            </Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6">
            <View className="flex-row gap-3 px-1">
              {Object.entries(failureData).map(([key, section]) => (
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

          {selectedSection === 'types' && (
            <View>
              {currentSection.categories?.map((category: any, idx: number) => (
                <View key={idx} className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
                  <Text className="text-red-400 text-xl font-bold mb-3">{category.type}</Text>
                  
                  {category.definition && (
                    <Text className="text-zinc-300 mb-3">{category.definition}</Text>
                  )}

                  {category.scenarios && (
                    <View className="bg-red-500/10 rounded-xl p-4 border border-red-500/30 mb-3">
                      <Text className="text-red-400 font-bold mb-2">Scenarios:</Text>
                      {category.scenarios.map((scenario: string, sIdx: number) => (
                        <Text key={sIdx} className="text-red-300 text-sm mb-1">• {scenario}</Text>
                      ))}
                    </View>
                  )}

                  {category.reality && (
                    <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-3">
                      <Text className="text-primary/80 font-bold mb-2">Reality:</Text>
                      {category.reality.map((item: string, rIdx: number) => (
                        <Text key={rIdx} className="text-primary/60 text-sm mb-1">• {item}</Text>
                      ))}
                    </View>
                  )}

                  {category.normalcy && (
                    <View className="bg-primary/10 rounded-xl p-3 border border-primary/30">
                      <Text className="text-primary text-sm font-bold">{category.normalcy}</Text>
                    </View>
                  )}

                  {category.feeling && (
                    <Text className="text-amber-400 text-sm italic">{category.feeling}</Text>
                  )}

                  {category.difficulty && (
                    <Text className="text-red-400 text-sm italic">{category.difficulty}</Text>
                  )}
                </View>
              ))}
            </View>
          )}

          {selectedSection === 'immediate' && (
            <View>
              {Object.entries(currentSection).filter(([key]) => !['name', 'icon', 'color'].includes(key)).map(([key, section]: [string, any]) => (
                <View key={key} className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
                  <Text className="text-amber-400 text-xl font-bold mb-4">{section.title}</Text>

                  {section.emotions && (
                    <View className="bg-amber-500/10 rounded-xl p-4 border border-amber-500/30 mb-4">
                      <Text className="text-amber-400 font-bold mb-2">Normal Emotions:</Text>
                      {section.emotions.map((emotion: string, eIdx: number) => (
                        <Text key={eIdx} className="text-amber-300 text-sm mb-1">• {emotion}</Text>
                      ))}
                    </View>
                  )}

                  {section.allow && (
                    <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-4">
                      <Text className="text-primary font-bold mb-2">? Allow Yourself To:</Text>
                      {section.allow.map((item: string, aIdx: number) => (
                        <Text key={aIdx} className="text-primary/80 text-sm mb-1">• {item}</Text>
                      ))}
                    </View>
                  )}

                  {section.avoid && (
                    <View className="bg-red-500/10 rounded-xl p-4 border border-red-500/30 mb-4">
                      <Text className="text-red-400 font-bold mb-2">? Avoid:</Text>
                      {section.avoid.map((item: string, avIdx: number) => (
                        <Text key={avIdx} className="text-red-300 text-sm mb-1">• {item}</Text>
                      ))}
                    </View>
                  )}

                  {section.dos && (
                    <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-4">
                      <Text className="text-primary/80 font-bold mb-2">Do:</Text>
                      {section.dos.map((item: string, dIdx: number) => (
                        <Text key={dIdx} className="text-primary/60 text-sm mb-1">? {item}</Text>
                      ))}
                    </View>
                  )}

                  {section.donts && (
                    <View className="bg-red-500/10 rounded-xl p-4 border border-red-500/30">
                      <Text className="text-red-400 font-bold mb-2">Don't:</Text>
                      {section.donts.map((item: string, dnIdx: number) => (
                        <Text key={dnIdx} className="text-red-300 text-sm mb-1">? {item}</Text>
                      ))}
                    </View>
                  )}
                </View>
              ))}
            </View>
          )}

          {selectedSection === 'processing' && (
            <View>
              <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
                <Text className="text-primary/80 text-xl font-bold mb-4">{currentSection.timeline?.description}</Text>
                {Object.entries(currentSection.timeline || {}).filter(([key]) => key !== 'description').map(([key, value]: [string, any]) => (
                  <View key={key} className="bg-primary/10 rounded-xl p-3 border border-primary/30 mb-2 last:mb-0">
                    <Text className="text-primary/80 font-bold text-sm capitalize">{key}:</Text>
                    <Text className="text-primary/60 text-sm">{value}</Text>
                  </View>
                ))}
              </View>

              <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
                <Text className="text-primary/80 text-xl font-bold mb-4">{currentSection.analysis?.title}</Text>
                
                {currentSection.analysis?.questions.map((q: any, idx: number) => (
                  <View key={idx} className="bg-zinc-800 rounded-xl p-4 mb-4 last:mb-0">
                    <Text className="text-white font-bold mb-3">{q.question}</Text>
                    
                    {q.examples && q.examples.map((ex: string, eIdx: number) => (
                      <Text key={eIdx} className="text-zinc-300 text-sm mb-1">• {ex}</Text>
                    ))}

                    {q.indicators && q.indicators.map((ind: string, iIdx: number) => (
                      <Text key={iIdx} className="text-zinc-300 text-sm mb-1">• {ind}</Text>
                    ))}

                    {q.controllable && (
                      <View className="mt-2">
                        <Text className="text-primary font-bold text-sm mb-1">? Controllable:</Text>
                        {q.controllable.map((item: string, cIdx: number) => (
                          <Text key={cIdx} className="text-primary/80 text-sm mb-1">• {item}</Text>
                        ))}
                      </View>
                    )}

                    {q.uncontrollable && (
                      <View className="mt-2">
                        <Text className="text-red-400 font-bold text-sm mb-1">? Uncontrollable:</Text>
                        {q.uncontrollable.map((item: string, uIdx: number) => (
                          <Text key={uIdx} className="text-red-300 text-sm mb-1">• {item}</Text>
                        ))}
                      </View>
                    )}
                  </View>
                ))}

                <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mt-4">
                  <Text className="text-primary/80 font-bold mb-2">Analysis Process:</Text>
                  {currentSection.analysis?.process.map((step: string, pIdx: number) => (
                    <Text key={pIdx} className="text-primary/60 text-sm mb-1">• {step}</Text>
                  ))}
                </View>
              </View>

              {currentSection.perspectives?.map((persp: any, idx: number) => (
                <View key={idx} className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
                  <Text className="text-primary text-lg font-bold mb-3">{persp.perspective}</Text>
                  {persp.statements && persp.statements.map((stmt: string, sIdx: number) => (
                    <Text key={sIdx} className="text-primary/80 text-sm mb-2 italic">• {stmt}</Text>
                  ))}
                  {persp.truths && persp.truths.map((truth: string, tIdx: number) => (
                    <Text key={tIdx} className="text-zinc-300 text-sm mb-2">• {truth}</Text>
                  ))}
                </View>
              ))}
            </View>
          )}

          {selectedSection === 'learning' && (
            <View>
              {currentSection.commonLessons?.map((lesson: any, idx: number) => (
                <View key={idx} className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
                  <Text className="text-primary text-xl font-bold mb-3">{lesson.lesson}</Text>
                  
                  <View className="bg-red-500/10 rounded-xl p-3 border border-red-500/30 mb-3">
                    <Text className="text-red-400 font-bold text-sm mb-1">Problem:</Text>
                    <Text className="text-red-300 text-sm">{lesson.problem}</Text>
                  </View>

                  <View className="bg-primary/10 rounded-xl p-3 border border-primary/30 mb-3">
                    <Text className="text-primary font-bold text-sm mb-2">Solution:</Text>
                    {lesson.solution.map((sol: string, sIdx: number) => (
                      <Text key={sIdx} className="text-primary/80 text-sm mb-1">• {sol}</Text>
                    ))}
                  </View>

                  <View className="bg-primary/10 rounded-xl p-3 border border-primary/30">
                    <Text className="text-primary/80 font-bold text-sm">Prevention: {lesson.prevention}</Text>
                  </View>
                </View>
              ))}

              <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
                <Text className="text-primary text-xl font-bold mb-4">{currentSection.implementation?.title}</Text>
                
                <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-4">
                  <Text className="text-primary font-bold mb-2">Steps:</Text>
                  {currentSection.implementation?.steps.map((step: string, sIdx: number) => (
                    <Text key={sIdx} className="text-primary/80 text-sm mb-1">{sIdx + 1}. {step}</Text>
                  ))}
                </View>

                <View className="bg-red-500/10 rounded-xl p-4 border border-red-500/30">
                  <Text className="text-red-400 font-bold mb-2">Mistakes to Avoid:</Text>
                  {currentSection.implementation?.mistakes.map((mistake: string, mIdx: number) => (
                    <Text key={mIdx} className="text-red-300 text-sm mb-1">? {mistake}</Text>
                  ))}
                </View>
              </View>
            </View>
          )}

          {selectedSection === 'rebuilding' && (
            <View>
              {Object.entries(currentSection).filter(([key]) => !['name', 'icon', 'color'].includes(key)).map(([key, section]: [string, any]) => (
                <View key={key} className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
                  <Text className="text-purple-400 text-xl font-bold mb-4">{section.title}</Text>

                  {section.strategies && section.strategies.map((strat: any, sIdx: number) => (
                    <View key={sIdx} className="bg-purple-500/10 rounded-xl p-4 border border-purple-500/30 mb-4 last:mb-0">
                      <Text className="text-purple-400 font-bold mb-2">{strat.strategy}</Text>
                      {strat.from && (
                        <View className="mb-2">
                          <Text className="text-red-400 text-sm">From: {strat.from}</Text>
                          <Text className="text-primary text-sm">To: {strat.to}</Text>
                        </View>
                      )}
                      {strat.practice && <Text className="text-purple-300 text-sm mb-2">{strat.practice}</Text>}
                      {strat.actions && strat.actions.map((action: string, aIdx: number) => (
                        <Text key={aIdx} className="text-purple-300 text-sm mb-1">• {action}</Text>
                      ))}
                      {strat.examples && strat.examples.map((ex: string, eIdx: number) => (
                        <Text key={eIdx} className="text-purple-300 text-sm mb-1 italic">"{ex}"</Text>
                      ))}
                    </View>
                  ))}

                  {section.approach && section.approach.map((phase: any, pIdx: number) => (
                    <View key={pIdx} className="bg-zinc-800 rounded-xl p-4 mb-3 last:mb-0">
                      <Text className="text-white font-bold mb-2">{phase.phase}</Text>
                      <Text className="text-primary/80 text-sm mb-2">Focus: {phase.focus}</Text>
                      <View className="bg-purple-500/10 rounded-xl p-3 border border-purple-500/30">
                        <Text className="text-purple-400 font-bold text-sm mb-1">Training:</Text>
                        {phase.training.map((item: string, tIdx: number) => (
                          <Text key={tIdx} className="text-purple-300 text-sm mb-1">• {item}</Text>
                        ))}
                      </View>
                    </View>
                  ))}

                  {section.small && (
                    <View className="mt-3">
                      <Text className="text-primary font-bold mb-2">Small Wins:</Text>
                      {section.small.map((item: string, idx: number) => (
                        <Text key={idx} className="text-primary/80 text-sm mb-1">? {item}</Text>
                      ))}
                    </View>
                  )}

                  {section.medium && (
                    <View className="mt-3">
                      <Text className="text-primary/80 font-bold mb-2">Medium Milestones:</Text>
                      {section.medium.map((item: string, idx: number) => (
                        <Text key={idx} className="text-primary/60 text-sm mb-1">? {item}</Text>
                      ))}
                    </View>
                  )}

                  {section.large && (
                    <View className="mt-3">
                      <Text className="text-purple-400 font-bold mb-2">Major Achievements:</Text>
                      {section.large.map((item: string, idx: number) => (
                        <Text key={idx} className="text-purple-300 text-sm mb-1">? {item}</Text>
                      ))}
                    </View>
                  )}
                </View>
              ))}
            </View>
          )}

          {selectedSection === 'perspective' && (
            <View>
              {Object.entries(currentSection).filter(([key]) => !['name', 'icon', 'color'].includes(key)).map(([key, section]: [string, any]) => (
                <View key={key} className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
                  <Text className="text-cyan-400 text-xl font-bold mb-4">{section.title}</Text>

                  {section.truths && section.truths.map((truth: string, idx: number) => (
                    <Text key={idx} className="text-cyan-300 mb-2">• {truth}</Text>
                  ))}

                  {section.examples && section.examples.map((ex: any, eIdx: number) => (
                    <View key={eIdx} className="bg-cyan-500/10 rounded-xl p-4 border border-cyan-500/30 mb-3 last:mb-0">
                      <Text className="text-cyan-400 font-bold mb-1">{ex.lifter}</Text>
                      <Text className="text-cyan-300 text-sm mb-1">Failures: {ex.failures}</Text>
                      <Text className="text-primary text-sm">Result: {ex.result}</Text>
                    </View>
                  ))}

                  {section.perspectives && section.perspectives.map((persp: any, pIdx: number) => (
                    <View key={pIdx} className="bg-zinc-800 rounded-xl p-4 mb-3 last:mb-0">
                      <Text className="text-white font-bold mb-2">{persp.view}</Text>
                      <Text className="text-amber-400 text-sm mb-1">Feeling: {persp.feeling}</Text>
                      <Text className="text-primary/80 text-sm">Focus: {persp.focus}</Text>
                    </View>
                  ))}

                  {section.ask && (
                    <View className="bg-cyan-500/10 rounded-xl p-4 border border-cyan-500/30">
                      <Text className="text-cyan-400 font-bold mb-2">Ask Yourself:</Text>
                      {section.ask.map((q: string, qIdx: number) => (
                        <Text key={qIdx} className="text-cyan-300 text-sm mb-1">• {q}</Text>
                      ))}
                    </View>
                  )}
                </View>
              ))}
            </View>
          )}

          {selectedSection === 'deciding' && (
            <View>
              {currentSection.options?.map((option: any, idx: number) => (
                <View key={idx} className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
                  <Text className="text-primary text-xl font-bold mb-2">{option.option}</Text>
                  <Text className="text-zinc-300 mb-4">When: {option.when}</Text>

                  <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-3">
                    <Text className="text-primary font-bold mb-2">Approach:</Text>
                    {option.approach.map((item: string, aIdx: number) => (
                      <Text key={aIdx} className="text-primary/80 text-sm mb-1">• {item}</Text>
                    ))}
                  </View>

                  <View className="bg-primary/10 rounded-xl p-3 border border-primary/30">
                    <Text className="text-primary/80 font-bold text-sm">Mindset: {option.mindset}</Text>
                  </View>
                </View>
              ))}

              <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
                <Text className="text-amber-400 text-xl font-bold mb-4">{currentSection.decision?.title}</Text>
                {currentSection.decision?.questions.map((q: string, idx: number) => (
                  <Text key={idx} className="text-amber-300 mb-2">• {q}</Text>
                ))}
                <View className="bg-amber-500/10 rounded-xl p-3 border border-amber-500/30 mt-3">
                  <Text className="text-amber-400 font-bold text-sm">{currentSection.decision?.rule}</Text>
                </View>
              </View>
            </View>
          )}

          <View className="bg-gradient-to-r from-red-500/20 to-primary/20 rounded-xl p-5 border border-red-500/30 mb-6">
            <Text className="text-red-400 font-bold text-lg mb-3">Remember</Text>
            <Text className="text-red-300 text-sm mb-2">
              • Failure is not permanent - it's a moment, not an identity
            </Text>
            <Text className="text-red-300 text-sm mb-2">
              • Every champion has failed - it's what they did after that matters
            </Text>
            <Text className="text-red-300 text-sm mb-2">
              • You are stronger for experiencing this
            </Text>
            <Text className="text-red-300 text-sm">
              • The comeback is always better than the setback
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}


