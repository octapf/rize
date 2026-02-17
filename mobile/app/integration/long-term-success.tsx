import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function LongTermSuccess() {
  const [selectedPrinciple, setSelectedPrinciple] = useState('consistency');

  const successData = {
    consistency: {
      name: 'Consistency Over Perfection',
      icon: 'trending-up',
      color: 'blue',
      philosophy: {
        title: 'The 80% Rule',
        concept: 'Better to execute 80% perfect program 100% of time than 100% perfect program 60% of time',
        reality: [
          'Missing workouts kills progress',
          'Perfect program you can\'t stick to = useless',
          'Mediocre program done consistently > optimal program done sporadically',
        ],
      },
      building_habit: {
        title: 'Making Training Non-Negotiable',
        strategies: [
          {
            strategy: 'Schedule Like Appointments',
            action: 'Put training in calendar, treat like doctor appointment',
            why: 'If it\'s scheduled, it happens',
          },
          {
            strategy: 'Remove Decisions',
            action: 'Same days, same times every week',
            why: 'Willpower not required - it\'s just what you do',
          },
          {
            strategy: 'Start Stupidly Small',
            action: 'Commit to showing up, even if short session',
            why: 'Showing up is 90% of battle',
          },
          {
            strategy: 'Track Streaks',
            action: 'Count consecutive weeks of hitting all sessions',
            why: 'Gamification helps motivation',
          },
        ],
      },
      handling_disruptions: {
        title: 'When Life Happens',
        scenarios: [
          {
            situation: 'Missed One Session',
            response: 'Skip it, continue as planned next session',
            dont: 'Try to "make up" - leads to overtraining',
          },
          {
            situation: 'Sick for Week',
            response: 'Take full week off, return at 70-80% intensity',
            dont: 'Train through illness - delays recovery',
          },
          {
            situation: 'Vacation 1-2 Weeks',
            response: 'Enjoy break, maintain protein, resume at 80%',
            dont: 'Stress about it - breaks are healthy',
          },
          {
            situation: 'Major Life Event',
            response: 'Adjust program to 2-3 days maintenance',
            dont: 'Quit entirely - keep minimum viable',
          },
        ],
      },
    },
    sustainability: {
      name: 'Sustainable Training',
      icon: 'infinite',
      color: 'primary',
      decade_view: {
        title: 'Think in Decades, Not Days',
        mindset: [
          'You have 30+ years of training ahead',
          'Missing PRs for 6 months ≠ failure if you train 20 more years',
          'Injuries that sideline you = worse than slow progress',
          'Consistency over decades > heroic bursts',
        ],
      },
      avoiding_burnout: {
        title: 'Preventing Burnout',
        signs: [
          'Dreading training consistently',
          'Performance declining despite effort',
          'Lost enjoyment completely',
          'Chronic fatigue and irritability',
        ],
        solutions: [
          {
            solution: 'Take Planned Breaks',
            details: '1-2 weeks off every 12-16 weeks, guilt-free',
          },
          {
            solution: 'Vary Training Phases',
            details: 'Offseason fun training, meet prep serious training',
          },
          {
            solution: 'Have Other Hobbies',
            details: 'Life isn\'t just lifting - maintain balance',
          },
          {
            solution: 'Compete Sparingly',
            details: '1-3 meets per year, not every month',
          },
          {
            solution: 'Lower Intensity Phases',
            details: 'Not every block needs to be balls-out',
          },
        ],
      },
      injury_prevention: {
        title: 'Staying Healthy Long-Term',
        priorities: [
          {
            priority: 'Technique Over Numbers',
            principle: 'Perfect form prevents injuries',
            action: 'Film regularly, get coaching, don\'t ego lift',
          },
          {
            priority: 'Listen to Body',
            principle: 'Tweak ≠ train through it',
            action: 'Back off when something hurts, modify exercises',
          },
          {
            priority: 'Warm-Up Properly',
            principle: 'Cold tissues tear easier',
            action: '10-15 min every session, non-negotiable',
          },
          {
            priority: 'Manage Volume',
            principle: 'Too much volume = overuse injuries',
            action: 'Increase volume 10-20% max at a time',
          },
          {
            priority: 'Deload Regularly',
            principle: 'Fatigue accumulates',
            action: 'Every 4-6 weeks, reduce volume or intensity',
          },
          {
            priority: 'Prehab Work',
            principle: 'Ounce of prevention > pound of cure',
            action: 'Rotator cuff, hip stability, core daily',
          },
        ],
      },
    },
    progression: {
      name: 'Lifelong Progression',
      icon: 'analytics-outline',
      color: 'purple',
      phases: {
        title: 'Training Life Phases',
        stages: [
          {
            phase: 'Years 1-2: Rapid Growth',
            focus: 'Learn technique, build foundation',
            expectations: 'Huge PRs regularly, rapid progress',
            mistakes: 'Getting injured from too much too soon',
            wisdom: 'Build perfect technique now - it\'s harder later',
          },
          {
            phase: 'Years 3-5: Building Strength',
            focus: 'Consistent programming, address weak points',
            expectations: 'Steady progress, occasional plateaus',
            mistakes: 'Program hopping, impatience',
            wisdom: 'Trust the process, small progress adds up',
          },
          {
            phase: 'Years 5-10: Mastery',
            focus: 'Fine-tuning, competing, pushing limits',
            expectations: 'Slower progress, more specific training',
            mistakes: 'Overtraining, neglecting recovery',
            wisdom: 'Everything matters now - details make difference',
          },
          {
            phase: 'Years 10-20: Excellence',
            focus: 'Maintaining, occasional PRs, longevity',
            expectations: 'PRs rare but meaningful',
            mistakes: 'Trying to train like 20-year-old',
            wisdom: 'Work smarter, not harder. Consistency wins.',
          },
          {
            phase: 'Years 20+: Legacy',
            focus: 'Strength for life, helping others',
            expectations: 'Maintaining strength, staying healthy',
            mistakes: 'Quitting',
            wisdom: 'You\'re an inspiration - keep lifting',
          },
        ],
      },
      realistic_timeline: {
        title: 'Realistic Strength Milestones',
        note: 'These are rough averages - individuals vary wildly',
        men: [
          { milestone: '1000 lb total', timeframe: '6-18 months consistent training' },
          { milestone: '1200 lb total', timeframe: '1.5-3 years' },
          { milestone: '1400 lb total', timeframe: '3-5 years' },
          { milestone: '1600 lb total', timeframe: '5-8 years' },
          { milestone: '1800 lb total', timeframe: '8-12+ years (elite genetics/training)' },
        ],
        women: [
          { milestone: '600 lb total', timeframe: '6-18 months consistent training' },
          { milestone: '800 lb total', timeframe: '1.5-3 years' },
          { milestone: '1000 lb total', timeframe: '3-5 years' },
          { milestone: '1200 lb total', timeframe: '5-8 years' },
          { milestone: '1400 lb total', timeframe: '8-12+ years (elite genetics/training)' },
        ],
      },
    },
    learning: {
      name: 'Continuous Learning',
      icon: 'book',
      color: 'amber',
      education: {
        title: 'Never Stop Learning',
        sources: [
          {
            source: 'Get a Coach',
            value: 'Accelerates progress 10x',
            when: 'As soon as you can afford',
          },
          {
            source: 'Film Yourself',
            value: 'Free coaching, see truth',
            when: 'Every session for heavy sets',
          },
          {
            source: 'Read Books',
            value: 'Systematic knowledge',
            when: 'Offseason, build foundation',
          },
          {
            source: 'Watch Elite Lifters',
            value: 'See what\'s possible',
            when: 'Inspiration and technique ideas',
          },
          {
            source: 'Experiment',
            value: 'Find what works for YOU',
            when: 'Offseason, test variations',
          },
          {
            source: 'Train with Others',
            value: 'Learn through osmosis',
            when: 'Find a powerlifting gym',
          },
        ],
      },
      self_assessment: {
        title: 'Regular Self-Evaluation',
        questions: [
          'What worked this cycle? What didn\'t?',
          'Am I progressing or spinning wheels?',
          'Is my technique improving or degrading?',
          'Am I enjoying training or miserable?',
          'What would I change next cycle?',
          'Am I healthier or more broken down?',
        ],
        frequency: 'Every 8-12 weeks, after each training block',
      },
    },
    mindset: {
      name: 'Long-Term Mindset',
      icon: 'happy',
      color: 'red',
      truths: {
        title: 'Embracing These Truths',
        realities: [
          {
            truth: 'Progress Isn\'t Linear',
            acceptance: 'Plateaus, regressions, setbacks are NORMAL',
            response: 'Zoom out - trend over time matters',
          },
          {
            truth: 'Genetics Matter',
            acceptance: 'Some people progress faster, lift more',
            response: 'Compete with YOURSELF, not others',
          },
          {
            truth: 'There Are No Shortcuts',
            acceptance: 'Takes years to build real strength',
            response: 'Enjoy the journey, not just destination',
          },
          {
            truth: 'You Will Get Injured',
            acceptance: 'Minor tweaks, setbacks happen to everyone',
            response: 'Train smart, recover properly, adapt',
          },
          {
            truth: 'It Gets Harder',
            acceptance: 'As you advance, progress slows',
            response: 'PRs mean MORE when they\'re harder earned',
          },
        ],
      },
      enjoyment: {
        title: 'Actually Enjoying Training',
        keys: [
          'Train with people you like',
          'Allow yourself "fun" training phases',
          'Don\'t make every session a battle',
          'Take pride in small victories',
          'Remember why you started',
          'It\'s okay to not compete - lift for you',
        ],
      },
      purpose: {
        title: 'Your "Why"',
        finding_it: [
          'Why did you start lifting?',
          'What do you love about it?',
          'How does it improve your life?',
          'What would you lose if you quit?',
        ],
        common_reasons: [
          'Feeling strong and capable',
          'Having clear, measurable goals',
          'Community and camaraderie',
          'Confidence from achievement',
          'Physical health and longevity',
          'Mental discipline and toughness',
        ],
        advice: 'On hard days, remember your why',
      },
    },
    legacy: {
      name: 'Leaving a Legacy',
      icon: 'trophy',
      color: 'cyan',
      giving_back: {
        title: 'Help the Next Generation',
        ways: [
          'Spot people at the gym',
          'Give encouragement to beginners',
          'Share what you\'ve learned',
          'Coach or mentor when you can',
          'Support your local meets',
          'Be the lifter you wish you had as example',
        ],
      },
      longevity: {
        title: 'Strength for Life',
        vision: 'Still squatting in your 60s, 70s, 80s',
        approach: [
          'Train smart now to train long',
          'Injuries are career-enders if ignored',
          'Adapt training as you age',
          'Strength = quality of life when older',
          'You\'re building foundation for entire life',
        ],
      },
    },
  };

  const currentPrinciple = successData[selectedPrinciple as keyof typeof successData];

  const getColorClass = (color: string) => {
    const colors: { [key: string]: string } = {
      blue: 'bg-primary',
      primary: 'bg-primary',
      purple: 'bg-purple-500',
      amber: 'bg-amber-500',
      red: 'bg-red-500',
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
            Long-Term Success
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          <View className="bg-gradient-to-r from-primary to-primary/100 rounded-xl p-6 mb-6">
            <Text className="text-white text-2xl font-bold mb-2">Lifelong Strength</Text>
            <Text className="text-white opacity-90">
              Principles for sustainable powerlifting
            </Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6">
            <View className="flex-row gap-3 px-1">
              {Object.entries(successData).map(([key, principle]) => (
                <TouchableOpacity
                  key={key}
                  onPress={() => setSelectedPrinciple(key)}
                  className={`${
                    selectedPrinciple === key 
                      ? getColorClass(principle.color)
                      : 'bg-zinc-900'
                  } rounded-xl p-4 border ${
                    selectedPrinciple === key 
                      ? 'border-white/30'
                      : 'border-zinc-800'
                  } min-w-[200px]`}
                >
                  <Ionicons 
                    name={principle.icon as any} 
                    size={32} 
                    color={selectedPrinciple === key ? 'white' : '#a1a1aa'} 
                  />
                  <Text className={`${selectedPrinciple === key ? 'text-white' : 'text-zinc-400'} font-bold mt-2`}>
                    {principle.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          {/* Content rendering placeholder */}
          <View className="bg-primary/10 rounded-xl p-6 border border-primary/30 mb-6">
            <Ionicons name={currentPrinciple.icon as any} size={32} color="#9D12DE" />
            <Text className="text-primary/80 font-bold text-lg mt-3 mb-2">
              {currentPrinciple.name}
            </Text>
            <Text className="text-primary/60 text-sm">
              Detailed content for {currentPrinciple.name}...
            </Text>
          </View>

          <View className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl p-5 border border-purple-500/30 mb-6">
            <Text className="text-purple-400 font-bold text-lg mb-3">The Marathon, Not Sprint</Text>
            <Text className="text-purple-300 text-sm mb-2">
              � Think in decades - you have 30+ years of training ahead
            </Text>
            <Text className="text-purple-300 text-sm mb-2">
              � Consistency beats intensity over the long run
            </Text>
            <Text className="text-purple-300 text-sm mb-2">
              � Injuries that sideline you &gt; slow progress
            </Text>
            <Text className="text-purple-300 text-sm mb-2">
              � Enjoy the process - it's the only way to sustain it
            </Text>
            <Text className="text-purple-300 text-sm">
              � Your "why" will carry you through hard times
            </Text>
          </View>

          <View className="bg-primary/10 rounded-xl p-6 border border-primary/30 mb-6">
            <Ionicons name="checkmark-circle" size={32} color="#9D12DE" />
            <Text className="text-primary font-bold text-lg mt-3 mb-3">
              Keys to Longevity
            </Text>
            <Text className="text-primary/80 text-sm mb-2">
              ? Perfect technique prevents injuries
            </Text>
            <Text className="text-primary/80 text-sm mb-2">
              ? Regular deloads keep you fresh
            </Text>
            <Text className="text-primary/80 text-sm mb-2">
              ? Vary training to prevent burnout
            </Text>
            <Text className="text-primary/80 text-sm mb-2">
              ? Listen to your body always
            </Text>
            <Text className="text-primary/80 text-sm">
              ? Remember - you're building strength for LIFE
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}


