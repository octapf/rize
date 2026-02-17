import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function MeetPreparationChecklist() {
  const [selectedPhase, setSelectedPhase] = useState('overview');
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({});

  const prepData = {
    overview: {
      name: 'Overview',
      icon: 'calendar',
      color: 'blue',
      timeline: {
        title: 'Meet Preparation Timeline',
        phases: [
          '12-16 weeks out: Base building/hypertrophy',
          '8-12 weeks out: Strength building',
          '4-8 weeks out: Intensification',
          '1-4 weeks out: Peaking',
          'Meet week: Taper and execute',
        ],
      },
      key_principles: {
        title: 'Meet Prep Principles',
        rules: [
          'Specificity increases as meet approaches',
          'Volume decreases, intensity increases',
          'Practice meet day routine',
          'Peak at the right time (not too early)',
          'Nothing new on meet day',
        ],
      },
    },
    twelve_weeks_out: {
      name: '12+ Weeks Out',
      icon: 'barbell',
      color: 'primary',
      focus: {
        title: 'Training Focus',
        goals: [
          'Build muscle and work capacity',
          'Address weak points',
          'Higher volume, moderate intensity',
          'More exercise variation acceptable',
        ],
      },
      programming: {
        title: 'Programming Guidelines',
        volume: 'HIGH - near maximum recoverable volume',
        intensity: '70-80% most sets',
        reps: '5-10 reps per set',
        variations: 'Can use variations to address weak points',
        example: 'Squat: 5x8 @ 75%, Pause Squat: 3x6 @ 70%',
      },
      checklist: {
        title: '12 Week Out Checklist',
        items: [
          'Meet selected and registered',
          'Training plan for 12 weeks written out',
          'Weak points identified from last meet/cycle',
          'Equipment check (belt, sleeves, shoes in good shape)',
          'Coach hired if using one',
        ],
      },
    },
    eight_weeks_out: {
      name: '8 Weeks Out',
      icon: 'fitness',
      color: 'purple',
      focus: {
        title: 'Training Focus',
        goals: [
          'Build max strength',
          'Increase specificity',
          'Moderate-high volume',
          'Intensity ramping up',
        ],
      },
      programming: {
        title: 'Programming Guidelines',
        volume: 'MODERATE-HIGH - starting to reduce',
        intensity: '75-85% most sets',
        reps: '3-6 reps per set',
        variations: 'Moving closer to competition lifts',
        example: 'Squat: 4x5 @ 80%, Comp Bench: 5x3 @ 82%',
      },
      openers: {
        title: 'Start Thinking About Openers',
        guideline: 'Opener should be weight you can hit for easy triple',
        timing: 'Don\'t pick yet, but start ballpark estimate',
      },
      checklist: {
        title: '8 Week Out Checklist',
        items: [
          'Training on track (hitting prescribed weights)',
          'No injuries or nagging issues',
          'Sleep and nutrition dialed in',
          'Travel plans if meet is out of town',
          'Gear check - everything fits properly',
        ],
      },
    },
    four_weeks_out: {
      name: '4 Weeks Out',
      icon: 'rocket',
      color: 'amber',
      focus: {
        title: 'Peaking Phase Focus',
        goals: [
          'Peak strength',
          'Competition lift specificity',
          'Reduce volume, maintain/increase intensity',
          'Practice meet day lifts',
        ],
      },
      programming: {
        title: 'Programming Guidelines',
        volume: 'MODERATE - reducing each week',
        intensity: '85-93% most sets',
        reps: '1-3 reps per set',
        variations: 'COMPETITION LIFTS ONLY (or very close)',
        example: 'Squat: 3x2 @ 90%, Bench: 4x2 @ 88%',
      },
      attempt_selection: {
        title: 'Attempt Selection Process',
        week_4: {
          week: '4 weeks out',
          goal: 'Hit solid heavy doubles/triples',
          use: 'Gauge where strength is at',
        },
        week_3: {
          week: '3 weeks out',
          goal: 'Hit openers in training',
          use: 'Confirm opener weight',
        },
        week_2: {
          week: '2 weeks out',
          goal: 'Light work, taper begins',
          use: 'Recovery phase',
        },
        week_1: {
          week: 'Meet week',
          goal: 'Minimal training, rest',
          use: 'Peak for meet day',
        },
      },
      checklist: {
        title: '4 Week Out Checklist',
        items: [
          'Openers decided (90-95% of projected max)',
          'Second attempts planned (meet PR or close)',
          'Third attempts (PR attempt)',
          'Weigh-in strategy (24hr vs 2hr)',
          'Singlet and gear ready',
          'Handler confirmed (if not self-handling)',
          'Day-of nutrition and hydration plan',
        ],
      },
    },
    one_week_out: {
      name: 'Meet Week',
      icon: 'trophy',
      color: 'red',
      focus: {
        title: 'Meet Week Focus',
        goals: [
          'Rest and recover',
          'Mental preparation',
          'Logistics finalized',
          'Minimal training',
        ],
      },
      training: {
        title: 'Training (if any)',
        monday: 'Light openers (50-60% for 2-3 reps) - move the bar',
        tuesday_thursday: 'OFF or very light technique work',
        friday_saturday: 'OFF - rest completely',
        note: 'Some lifters do nothing meet week - that\'s fine too',
      },
      weight_management: {
        title: 'Weight Management',
        two_hour: {
          type: '2-Hour Weigh-In',
          approach: 'Weigh in at meet weight or slightly under',
          cut: 'Only 2-3 lbs water cut if needed',
          recovery: 'Limited time to rehydrate',
        },
        twenty_four_hour: {
          type: '24-Hour Weigh-In',
          approach: 'Can cut 5-10 lbs if experienced',
          recovery: 'Full day to rehydrate and refuel',
          warning: 'Don\'t cut if first meet',
        },
      },
      checklist: {
        title: 'Meet Week Checklist',
        items: [
          'Attempts finalized and written down',
          'Meet schedule reviewed (flight time)',
          'Gear packed (singlet, belt, sleeves, shoes, socks, underwear)',
          'Snacks and drinks for meet day',
          'Ammonia (if using)',
          'Warm-up plan written out',
          'Handler briefed on attempts and needs',
          'Travel arrangements confirmed',
          'Accommodations if overnight',
          'Music playlist ready',
        ],
      },
    },
    meet_day: {
      name: 'Meet Day',
      icon: 'barbell-outline',
      color: 'rose',
      timeline: {
        title: 'Meet Day Timeline',
        morning: {
          time: '2-3 hours before weigh-in',
          tasks: [
            'Light breakfast (if 24hr weigh-in)',
            'Bathroom',
            'Light movement/stretching',
          ],
        },
        weigh_in: {
          time: 'Weigh-in window',
          tasks: [
            'Weigh in',
            'Rack heights measured',
            'Flight confirmed',
          ],
        },
        post_weigh_in: {
          time: 'After weigh-in',
          tasks: [
            'Rehydrate (24hr: aggressively, 2hr: moderately)',
            'Eat planned meal',
            'Relax, music, walk around venue',
          ],
        },
        warm_up: {
          time: '45-60 min before first lift',
          tasks: [
            'General warm-up (bike, walk, dynamic stretching)',
            'Specific warm-up (work up to opener weight)',
            'Last warm-up 5-10 min before attempt',
          ],
        },
      },
      warm_up_protocol: {
        title: 'Sample Warm-Up (Squat opener 400 lbs)',
        sets: [
          'Bar x 10 (just moving)',
          '135 x 5',
          '225 x 3',
          '275 x 2',
          '315 x 1',
          '365 x 1 (last warm-up)',
          'Wait in bullpen',
          '400 x 1 (OPENER on platform)',
        ],
        timing: 'Last warm-up 5-8 minutes before attempt',
      },
      attempt_strategy: {
        title: 'Attempt Selection Strategy',
        opener: {
          attempt: 'Opener (First Attempt)',
          goal: '100% success rate - get on board',
          weight: '90-95% of gym max',
          mindset: 'Should feel like RPE 7-8, easy',
        },
        second: {
          attempt: 'Second Attempt',
          goal: 'Meet PR or close',
          weight: '+5-15 lbs from opener',
          mindset: 'Challenging but confident',
        },
        third: {
          attempt: 'Third Attempt',
          goal: 'PR attempt',
          weight: 'Based on how second felt',
          mindset: 'Go for it - nothing to lose',
        },
      },
      between_lifts: {
        title: 'Between Squat/Bench/Deadlift',
        rest: '30-60 minutes typically',
        tasks: [
          'Eat snack (banana, protein bar)',
          'Hydrate',
          'Light movement (walk around)',
          'Music/relaxation',
          'Don\'t sit too long',
        ],
      },
    },
    logistics: {
      name: 'Logistics & Gear',
      icon: 'briefcase',
      color: 'cyan',
      required_gear: {
        title: 'Required Competition Gear',
        items: [
          {
            item: 'Singlet',
            rules: 'Federation approved, covers torso',
            note: 'Usually red or black',
          },
          {
            item: 'T-Shirt',
            rules: 'Plain, crew neck, covers shoulders',
            note: 'No logos/writing usually',
          },
          {
            item: 'Underwear/Briefs',
            rules: 'Must wear, typically brief style',
          },
          {
            item: 'Socks',
            rules: 'Knee-high for deadlift',
            note: 'Can be any color usually',
          },
          {
            item: 'Shoes',
            rules: 'Enclosed toe, flat sole for most feds',
            note: 'Heeled squat shoes usually allowed',
          },
        ],
      },
      optional_gear: {
        title: 'Optional Equipment',
        items: [
          {
            item: 'Belt',
            rules: 'Max 10cm (4") wide, specific thickness',
            benefit: 'Bracing support',
          },
          {
            item: 'Wrist Wraps',
            rules: 'Max 1m length usually',
            benefit: 'Wrist support on bench/squat',
          },
          {
            item: 'Knee Sleeves',
            rules: 'Max 30cm length, 7mm thick',
            benefit: 'Warmth and support',
          },
        ],
        note: 'Check your federation rules - vary by org',
      },
      bag_checklist: {
        title: 'Meet Day Bag',
        essentials: [
          'Singlet + backup',
          'T-shirt + backup',
          'Underwear + backup',
          'Socks (knee high) + backup',
          'Shoes',
          'Belt',
          'Wrist wraps',
          'Knee sleeves',
          'Ammonia (if using)',
          'Baby powder (for deadlift)',
          'Snacks (bananas, bars, etc)',
          'Water bottle',
          'Headphones/music',
          'Towel',
          'Change of clothes for after',
        ],
      },
      federation_specific: {
        title: 'Federation-Specific Rules',
        note: 'Rules vary - check YOUR federation',
        common_federations: [
          {
            fed: 'USAPL (IPF)',
            rules: 'Very strict on gear, drug tested',
          },
          {
            fed: 'USPA',
            rules: 'Multiple divisions (tested/untested), more lenient gear',
          },
          {
            fed: 'RPS',
            rules: 'Allows more supportive gear',
          },
        ],
        action: 'Read rule book 2-3 weeks before meet!',
      },
    },
    mental: {
      name: 'Mental Preparation',
      icon: 'headset',
      color: 'indigo',
      visualization: {
        title: 'Visualization Practice',
        when: 'Weeks 4-1, daily 5-10 minutes',
        how: [
          'Close eyes, visualize entire meet day',
          'See yourself hitting openers easily',
          'See yourself grinding through heavy attempts',
          'Feel the bar in your hands',
          'Hear the commands ("Squat", "Press", "Down")',
          'Visualize success on all 9 attempts',
        ],
      },
      handling_nerves: {
        title: 'Managing Meet Day Nerves',
        reality: 'Everyone is nervous - that\'s normal',
        strategies: [
          {
            strategy: 'Breathing',
            technique: 'Box breathing: 4 in, 4 hold, 4 out, 4 hold',
            when: 'Anytime feeling anxious',
          },
          {
            strategy: 'Routine',
            technique: 'Stick to same warm-up, music, cues',
            when: 'All meet day',
          },
          {
            strategy: 'Positive Self-Talk',
            technique: '"I\'m prepared", "I\'ve hit this weight before"',
            when: 'Before attempts',
          },
          {
            strategy: 'Focus on Process',
            technique: 'Think technique cues, not outcome',
            when: 'During attempts',
          },
        ],
      },
      dealing_with_misses: {
        title: 'Dealing with Missed Lifts',
        reality: 'You WILL miss lifts eventually',
        response: [
          'Reset quickly - you have 2 more attempts',
          'Analyze what went wrong (technical vs weight)',
          'Adjust next attempt if needed',
          'Don\'t let one miss ruin whole meet',
          'Bombing out happens - learn and move on',
        ],
      },
    },
  };

  const currentPhase = prepData[selectedPhase as keyof typeof prepData];

  const getColorClass = (color: string) => {
    const colors: { [key: string]: string } = {
      blue: 'bg-primary',
      primary: 'bg-primary',
      purple: 'bg-purple-500',
      amber: 'bg-amber-500',
      red: 'bg-red-500',
      rose: 'bg-rose-500',
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
            Meet Preparation Checklist
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          <View className="bg-gradient-to-r from-red-500 to-rose-500 rounded-xl p-6 mb-6">
            <Text className="text-white text-2xl font-bold mb-2">Meet Prep</Text>
            <Text className="text-white opacity-90">
              12-week preparation timeline & checklist
            </Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6">
            <View className="flex-row gap-3 px-1">
              {Object.entries(prepData).map(([key, phase]) => (
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
                  } min-w-[160px]`}
                >
                  <Ionicons 
                    name={phase.icon as any} 
                    size={32} 
                    color={selectedPhase === key ? 'white' : '#a1a1aa'} 
                  />
                  <Text className={`${selectedPhase === key ? 'text-white' : 'text-zinc-400'} font-bold mt-2 text-sm`}>
                    {phase.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          {/* Content placeholder */}
          <View className="bg-red-500/10 rounded-xl p-6 border border-red-500/30 mb-6">
            <Ionicons name={currentPhase.icon as any} size={32} color="#ef4444" />
            <Text className="text-red-400 font-bold text-lg mt-3 mb-2">
              {currentPhase.name}
            </Text>
            <Text className="text-red-300 text-sm">
              Detailed content for {currentPhase.name}...
            </Text>
          </View>

          <View className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-xl p-5 border border-amber-500/30 mb-6">
            <Text className="text-amber-400 font-bold text-lg mb-3">Golden Rules</Text>
            <Text className="text-amber-300 text-sm mb-2">
              ?? Opener = 90-95% of max (should feel like RPE 7-8)
            </Text>
            <Text className="text-amber-300 text-sm mb-2">
              ?? Nothing new on meet day (gear, warm-up, food)
            </Text>
            <Text className="text-amber-300 text-sm mb-2">
              ?? Specificity increases as meet approaches
            </Text>
            <Text className="text-amber-300 text-sm mb-2">
              ?? Read your federation rule book 2-3 weeks out
            </Text>
            <Text className="text-amber-300 text-sm">
              ?? Have fun - this is why you train!
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

