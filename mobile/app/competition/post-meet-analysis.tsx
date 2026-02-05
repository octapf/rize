import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function PostMeetAnalysis() {
  const [selectedSection, setSelectedSection] = useState('overview');

  const analysisData = {
    overview: {
      name: 'Overview',
      icon: 'analytics',
      color: 'blue',
      importance: {
        title: 'Why Analyze Your Meet?',
        reasons: [
          'Identify what went right (so you can repeat it)',
          'Identify what went wrong (so you can fix it)',
          'Set better goals for next training cycle',
          'Learn and improve as a competitor',
          'Track long-term progress',
        ],
      },
      when_to_analyze: {
        title: 'When to Do Analysis',
        immediately: 'Quick notes right after meet (emotions fresh)',
        day_after: 'Watch videos, detailed analysis',
        week_after: 'Plan next cycle based on findings',
      },
    },
    performance: {
      name: 'Performance Analysis',
      icon: 'stats-chart',
      color: 'emerald',
      results: {
        title: 'Analyzing Your Results',
        metrics: [
          {
            metric: 'Total',
            questions: [
              'Did you hit your goal total?',
              'How does it compare to last meet?',
              'How does it compare to training maxes?',
            ],
          },
          {
            metric: 'Individual Lifts',
            questions: [
              'Which lift was strongest relative to training?',
              'Which lift underperformed?',
              'Any unexpected misses?',
            ],
          },
          {
            metric: 'Attempts',
            questions: [
              'Did you go 9/9? 8/9? 7/9?',
              'Were attempts conservative or aggressive?',
              'Any bombs (3 misses on one lift)?',
            ],
          },
        ],
      },
      attempt_breakdown: {
        title: 'Attempt-by-Attempt Review',
        template: [
          {
            lift: 'Squat',
            attempt_1: {
              weight: 'Weight attempted',
              result: 'Made/missed',
              feel: 'How did it feel? (RPE)',
              technical: 'Technique notes',
            },
            attempt_2: {
              weight: 'Weight attempted',
              result: 'Made/missed',
              feel: 'How did it feel?',
              technical: 'Technique notes',
            },
            attempt_3: {
              weight: 'Weight attempted',
              result: 'Made/missed',
              feel: 'How did it feel?',
              technical: 'Technique notes',
            },
          },
        ],
        note: 'Repeat for bench and deadlift',
      },
      video_analysis: {
        title: 'Video Review',
        what_to_watch: [
          'Technique breakdown compared to training',
          'Bar speed on successful vs missed lifts',
          'Where lifts were missed (sticking points)',
          'Depth on squats (did you go deep enough?)',
          'Lockout quality',
          'Compare successful lifts to training footage',
        ],
      },
    },
    technical: {
      name: 'Technical Analysis',
      icon: 'construct',
      color: 'purple',
      by_lift: {
        title: 'Lift-by-Lift Technical Review',
        squat: {
          lift: 'Squat Analysis',
          questions: [
            'Did you hit depth on all attempts?',
            'Bar path consistent?',
            'Knees stable or caving?',
            'Upper back tight throughout?',
            'Any good morning pattern?',
            'Commands executed cleanly?',
          ],
        },
        bench: {
          lift: 'Bench Analysis',
          questions: [
            'Paused correctly on chest?',
            'Bar path over wrists/elbows?',
            'Butt stayed down?',
            'Leg drive effective?',
            'Lockout strong?',
            'Uneven pressing?',
          ],
        },
        deadlift: {
          lift: 'Deadlift Analysis',
          questions: [
            'Bar stayed close to body?',
            'Hips shoot up?',
            'Back position held?',
            'Lockout strong or soft?',
            'Hitching issues?',
            'Started with hips too low/high?',
          ],
        },
      },
      common_issues: {
        title: 'Common Meet Day Technical Issues',
        problems: [
          {
            issue: 'Depth Issues on Squat',
            cause: 'Nerves, different spotters calling depth, bar whip',
            fix: 'Practice with meet commands, film all training squats',
          },
          {
            issue: 'Missing Bench Commands',
            cause: 'Rushing, not waiting for "Press"',
            fix: 'Practice paused bench ALL prep, patience',
          },
          {
            issue: 'Hitching Deadlift',
            cause: 'Bar drifts away, weak lockout',
            fix: 'Lockout work, cue bar close to body',
          },
          {
            issue: 'Form Breakdown Under Pressure',
            cause: 'Nerves, attempting too much weight',
            fix: 'More conservative attempts, visualization practice',
          },
        ],
      },
    },
    preparation: {
      name: 'Prep Quality',
      icon: 'checkmark-circle',
      color: 'amber',
      training_cycle: {
        title: 'Evaluating Training Cycle',
        questions: [
          {
            q: 'Did training prepare you for meet weights?',
            good: 'Meet weights felt like expected RPE',
            bad: 'Meet weights heavier than expected',
          },
          {
            q: 'Was peak timing right?',
            good: 'Felt strong and fresh on meet day',
            bad: 'Peaked too early or still fatigued',
          },
          {
            q: 'Volume/intensity appropriate?',
            good: 'Recovered well throughout prep',
            bad: 'Ground down or undertrained',
          },
          {
            q: 'Weak points addressed?',
            good: 'Weak points improved',
            bad: 'Same weak points caused issues',
          },
        ],
      },
      logistics_review: {
        title: 'Logistics & Preparation',
        checklist: [
          {
            aspect: 'Weight Management',
            questions: [
              'Did weight cut go smoothly?',
              'Rehydration adequate?',
              'Weighed in at planned weight?',
            ],
          },
          {
            aspect: 'Warm-Up',
            questions: [
              'Warm-up timing right?',
              'Too many or too few warm-ups?',
              'Last warm-up close enough to opener?',
            ],
          },
          {
            aspect: 'Attempts',
            questions: [
              'Opener appropriate? (should be 100% make)',
              'Second attempt conservative or aggressive?',
              'Third attempt realistic?',
            ],
          },
          {
            aspect: 'Gear & Equipment',
            questions: [
              'All gear legal and comfortable?',
              'Any equipment issues?',
              'Forgot anything?',
            ],
          },
        ],
      },
      mental_review: {
        title: 'Mental Performance',
        evaluation: [
          'How did you handle nerves?',
          'Confidence level going into attempts',
          'Reaction to misses (if any)',
          'Focus between lifts',
          'Enjoyment of the experience',
        ],
      },
    },
    lessons: {
      name: 'Lessons Learned',
      icon: 'school',
      color: 'red',
      what_worked: {
        title: 'What Went Well',
        categories: [
          {
            category: 'Training',
            examples: [
              'Program periodization',
              'Volume/intensity balance',
              'Weak point work',
              'Peaking strategy',
            ],
          },
          {
            category: 'Meet Day',
            examples: [
              'Warm-up routine',
              'Attempt selection',
              'Mental preparation',
              'Handler support',
            ],
          },
          {
            category: 'Technique',
            examples: [
              'Specific cues that worked',
              'Equipment setup',
              'Execution under pressure',
            ],
          },
        ],
        action: 'KEEP doing these things - write them down!',
      },
      what_didnt: {
        title: 'What Didn\'t Go Well',
        approach: 'Categorize issues by controllable vs uncontrollable',
        controllable: {
          type: 'Things You Can Fix',
          examples: [
            'Technical errors â†’ work on technique',
            'Weak points â†’ specific accessory work',
            'Poor warm-up â†’ adjust routine',
            'Bad attempt selection â†’ be more conservative/aggressive',
            'Missed commands â†’ practice with commands',
          ],
          action: 'Address these in next training cycle',
        },
        uncontrollable: {
          type: 'Things You Can\'t Control',
          examples: [
            'Judging calls (questionable red lights)',
            'Equipment issues (broken bar, bad platform)',
            'Meet delays',
            'Other lifters/atmosphere',
          ],
          action: 'Let go and don\'t dwell on these',
        },
      },
      surprises: {
        title: 'Unexpected Outcomes',
        positive: [
          'Lift that was surprisingly strong',
          'Better total than expected',
          'Technique that clicked',
        ],
        negative: [
          'Lift that underperformed',
          'Unexpected miss',
          'Technical breakdown',
        ],
        analysis: 'Figure out WHY - leads to insights',
      },
    },
    goal_setting: {
      name: 'Future Planning',
      icon: 'flag',
      color: 'cyan',
      next_meet: {
        title: 'Planning Next Meet',
        timeline: {
          immediately: '1-2 weeks: Complete rest or active recovery',
          short_term: '4-8 weeks: Back to base building',
          medium_term: '8-12 weeks: Another meet if desired',
          long_term: '16-20 weeks: Major meet prep',
        },
      },
      goal_adjustment: {
        title: 'Adjusting Goals',
        if_met_goals: {
          result: 'Met or exceeded goals',
          action: [
            'Set new goals (be ambitious but realistic)',
            'Consider moving up weight class if close',
            'Think about bigger meets (regionals/nationals)',
          ],
        },
        if_fell_short: {
          result: 'Fell short of goals',
          action: [
            'Analyze why (training, peaking, meet day)',
            'Adjust next cycle to address weaknesses',
            'May need to give goal more time',
            'Consider if goal was realistic',
          ],
        },
      },
      training_adjustments: {
        title: 'Next Cycle Training Adjustments',
        weak_lift: {
          issue: 'One lift significantly behind',
          solution: 'Increase frequency/volume for that lift',
          example: 'Bench weak? Bench 3-4x per week next cycle',
        },
        weak_point: {
          issue: 'Specific sticking point',
          solution: 'Address with targeted variations',
          example: 'Squat lockout weak? Add chains, belt squats',
        },
        technical: {
          issue: 'Technical breakdown under load',
          solution: 'More submaximal perfect reps',
          example: 'More 70-80% sets with perfect form',
        },
        peaking: {
          issue: 'Peaked too early or too late',
          solution: 'Adjust peak timing by 1-2 weeks',
          example: 'Next prep: make week 3 the heavy week, not week 2',
        },
      },
    },
    template: {
      name: 'Analysis Template',
      icon: 'document-text',
      color: 'indigo',
      sections: {
        title: 'Post-Meet Analysis Template',
        basic_info: {
          section: '1. Basic Information',
          fields: [
            'Meet name and date',
            'Weight class',
            'Bodyweight at weigh-in',
            'Final total',
            'Placement',
            'Wilks score',
          ],
        },
        attempts: {
          section: '2. Attempt Results',
          template: 'For each lift: Weight, Made/Missed, RPE, Technical notes',
        },
        technical_review: {
          section: '3. Technical Review',
          areas: [
            'Video analysis notes',
            'What worked technically',
            'What broke down',
            'Comparison to training footage',
          ],
        },
        preparation: {
          section: '4. Preparation Quality',
          review: [
            'Training cycle evaluation',
            'Peak timing',
            'Warm-up effectiveness',
            'Attempt selection',
          ],
        },
        lessons: {
          section: '5. Lessons Learned',
          subcategories: [
            'What to keep doing',
            'What to change',
            'Surprising outcomes',
            'Specific action items',
          ],
        },
        next_steps: {
          section: '6. Next Steps',
          planning: [
            'Next meet date (if planned)',
            'Training adjustments needed',
            'New goals',
            'Equipment/gear needs',
          ],
        },
      },
      example: {
        title: 'Example Entry',
        sample: [
          '**Meet:** State Championship 2024',
          '**Total:** 1350 lbs (585/315/450)',
          '**Squat:** Went 2/3 - missed third at 600',
          '**Analysis:** Depth was issue on third. Need to practice sitting back more with max weights.',
          '**Next Cycle:** Add pause squats 2x per week, work on depth at 90%+',
        ],
      },
    },
  };

  const currentSection = analysisData[selectedSection as keyof typeof analysisData];

  const getColorClass = (color: string) => {
    const colors: { [key: string]: string } = {
      blue: 'bg-primary',
      emerald: 'bg-primary',
      purple: 'bg-purple-500',
      amber: 'bg-amber-500',
      red: 'bg-red-500',
      cyan: 'bg-cyan-500',
      indigo: 'bg-indigo-500',
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
            Post-Meet Analysis
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          <View className="bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl p-6 mb-6">
            <Text className="text-white text-2xl font-bold mb-2">Meet Review</Text>
            <Text className="text-white opacity-90">
              Systematic post-competition analysis framework
            </Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6">
            <View className="flex-row gap-3 px-1">
              {Object.entries(analysisData).map(([key, section]) => (
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
                  } min-w-[160px]`}
                >
                  <Ionicons 
                    name={section.icon as any} 
                    size={32} 
                    color={selectedSection === key ? 'white' : '#a1a1aa'} 
                  />
                  <Text className={`${selectedSection === key ? 'text-white' : 'text-zinc-400'} font-bold mt-2 text-sm`}>
                    {section.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          {/* Content placeholder */}
          <View className="bg-cyan-500/10 rounded-xl p-6 border border-cyan-500/30 mb-6">
            <Ionicons name={currentSection.icon as any} size={32} color="#06b6d4" />
            <Text className="text-cyan-400 font-bold text-lg mt-3 mb-2">
              {currentSection.name}
            </Text>
            <Text className="text-cyan-300 text-sm">
              Detailed content for {currentSection.name}...
            </Text>
          </View>

          <View className="bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-xl p-5 border border-primary/30 mb-6">
            <Text className="text-primary font-bold text-lg mb-3">Analysis Framework</Text>
            <Text className="text-primary/80 text-sm mb-2">
              ðŸ“Š Performance: Review attempts, totals, videos
            </Text>
            <Text className="text-primary/80 text-sm mb-2">
              ðŸ”§ Technical: What worked, what broke down
            </Text>
            <Text className="text-primary/80 text-sm mb-2">
              ✅ Preparation: Training cycle, peak timing, logistics
            </Text>
            <Text className="text-primary/80 text-sm mb-2">
              ðŸ“š Lessons: What to keep, what to change
            </Text>
            <Text className="text-primary/80 text-sm">
              🎯 Planning: Adjust goals and next training cycle
            </Text>
          </View>

          <View className="bg-amber-500/10 rounded-xl p-5 border border-amber-500/30 mb-6">
            <Text className="text-amber-400 font-bold text-lg mb-3">Key Questions</Text>
            <Text className="text-amber-300 text-sm mb-2">
              â“ Did you hit your goal total?
            </Text>
            <Text className="text-amber-300 text-sm mb-2">
              â“ Which lift was strongest/weakest relative to training?
            </Text>
            <Text className="text-amber-300 text-sm mb-2">
              â“ Were attempts too conservative or too aggressive?
            </Text>
            <Text className="text-amber-300 text-sm mb-2">
              â“ Any technical breakdowns that need fixing?
            </Text>
            <Text className="text-amber-300 text-sm">
              â“ What's the #1 thing to address in next training cycle?
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}


