import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function CommonMistakes() {
  const [selectedCategory, setSelectedCategory] = useState('technique');

  const categories = ['technique', 'programming', 'nutrition', 'recovery', 'mindset'];

  const mistakes = {
    technique: {
      name: 'Technique Mistakes',
      icon: 'close-circle' as const,
      color: 'red',
      errors: [
        {
          mistake: 'Ego Lifting (Too Much Weight)',
          why_bad: 'Sacrifices form, increases injury risk, limits muscle tension',
          signs: ['Excessive body English', 'Partial ROM', 'Loss of control', 'Can\'t complete reps cleanly'],
          fix: ['Drop weight 10-20%', 'Film your sets', 'Leave 2-3 reps in reserve', 'Ego has no place in training'],
          severity: 'High - Major injury risk',
        },
        {
          mistake: 'Partial Range of Motion',
          why_bad: 'Limits muscle development, creates imbalances, inflates ego',
          signs: ['Quarter squats', 'Half-rep bench', 'Partial curls', 'Not locking out overhead'],
          fix: ['Film yourself', 'Reduce weight significantly', 'Touch chest on bench, break parallel on squat', 'Full ROM = full gains'],
          severity: 'High - Wasted training time',
        },
        {
          mistake: 'Not Bracing Properly',
          why_bad: 'Weak core stability, spine injury risk, less force transfer',
          signs: ['Back rounding under load', 'Feeling unstable', 'Lower back pain', 'Butt wink in squat'],
          fix: ['Learn to brace: big breath, hold, push abs out', 'Practice with lighter weight', 'Belt can help remind you', 'Brace BEFORE every rep'],
          severity: 'Critical - Injury prevention',
        },
        {
          mistake: 'Rushing Through Reps',
          why_bad: 'Less time under tension, momentum instead of muscle, injury risk',
          signs: ['Bouncing weights', 'Explosive eccentrics', 'No pause at extremes', 'Using momentum'],
          fix: ['Control eccentric (2-3 seconds)', 'Brief pause at bottom', 'Explosive concentric is OK', 'Think "tension" not "speed"'],
          severity: 'Medium - Limits gains',
        },
        {
          mistake: 'Inconsistent Technique',
          why_bad: 'Can\'t track progress, trains different patterns, confusion',
          signs: ['Grip width varies', 'Stance changes randomly', 'Bar position inconsistent', 'Different ROM each set'],
          fix: ['Standardize your setup', 'Same grip, stance, bar position always', 'Film and compare to previous', 'Consistency enables progress tracking'],
          severity: 'Medium - Hinders progress tracking',
        },
      ],
    },
    programming: {
      name: 'Programming Mistakes',
      icon: 'calendar' as const,
      color: 'purple',
      errors: [
        {
          mistake: 'Too Much Volume Too Soon',
          why_bad: 'Overtraining, injury, burnout, poor recovery',
          signs: ['Always sore', 'Declining performance', 'Poor sleep', 'Irritability', 'Getting sick often'],
          fix: ['Start with minimum effective volume', 'Add 1-2 sets per week max', 'Deload every 4-6 weeks', 'More isn\'t always better'],
          severity: 'High - Leads to overtraining',
        },
        {
          mistake: 'Program Hopping',
          why_bad: 'No consistency, can\'t track what works, never master movements',
          signs: ['New program every month', 'Chasing latest trend', 'No progressive overload', 'Confused about what to do'],
          fix: ['Stick with program 12+ weeks minimum', 'Simple programs work if you commit', 'Focus on execution, not perfect program', 'Consistency > optimization'],
          severity: 'High - Wastes time',
        },
        {
          mistake: 'Neglecting Weak Points',
          why_bad: 'Imbalances, injury risk, limits main lift progress',
          signs: ['Only doing favorite exercises', 'Avoiding difficult movements', 'One muscle group lagging', 'Main lift stuck'],
          fix: ['Identify weak link (film yourself)', 'Add specific accessories', '2-3 exercises targeting weakness', 'Attack weaknesses in off-season'],
          severity: 'Medium - Limits long-term progress',
        },
        {
          mistake: 'No Deload Weeks',
          why_bad: 'Accumulated fatigue, no supercompensation, burnout',
          signs: ['Chronic fatigue', 'Lifts feeling heavy', 'Loss of motivation', 'Nagging injuries'],
          fix: ['Deload every 4-6 weeks', '50% volume OR 50% intensity', 'Take week completely off if needed', 'Deload is not weak, it\'s smart'],
          severity: 'High - Recovery essential',
        },
        {
          mistake: 'Ignoring Periodization',
          why_bad: 'No strategic progression, random training, plateaus',
          signs: ['Same sets/reps forever', 'No planned progression', 'Constant max effort', 'Perpetual plateau'],
          fix: ['Block 1: Volume/hypertrophy', 'Block 2: Intensity/strength', 'Block 3: Peaking (if competing)', 'Change variables systematically'],
          severity: 'Medium - Limits long-term gains',
        },
      ],
    },
    nutrition: {
      name: 'Nutrition Mistakes',
      icon: 'restaurant' as const,
      color: 'emerald',
      errors: [
        {
          mistake: 'Not Eating Enough (Trying to Gain Strength/Muscle)',
          why_bad: 'Can\'t build muscle in deficit, poor recovery, weak performance',
          signs: ['Strength stalling', 'Weight dropping', 'Always hungry', 'Poor recovery', 'Low energy'],
          fix: ['Eat in surplus (200-500 cal)', 'Protein 1.6-2.2g/kg minimum', 'Carbs around training', 'You must eat to grow'],
          severity: 'Critical - Can\'t gain without fuel',
        },
        {
          mistake: 'Too Little Protein',
          why_bad: 'Suboptimal muscle protein synthesis, poor recovery',
          signs: ['Muscle loss while cutting', 'Poor recovery', 'Strength loss', 'Always sore'],
          fix: ['2g protein per kg bodyweight minimum', '2.5-3g/kg when cutting', 'Spread across 4-5 meals', 'Protein is non-negotiable'],
          severity: 'High - Limits muscle growth',
        },
        {
          mistake: 'Extreme Calorie Swings',
          why_bad: 'Hormonal disruption, inconsistent performance, poor adherence',
          signs: ['Binging on weekends', 'Severe restriction weekdays', 'Energy crashes', 'Can\'t sustain'],
          fix: ['Moderate deficit/surplus', 'Consistency over perfection', '80/20 rule', 'Small changes compound'],
          severity: 'Medium - Sustainability issue',
        },
        {
          mistake: 'Neglecting Carbs (While Training Hard)',
          why_bad: 'Poor performance, low energy, suboptimal recovery',
          signs: ['Weak in gym', 'Can\'t complete workouts', 'Poor pumps', 'Irritable'],
          fix: ['Carbs fuel performance', '3-5g/kg for active lifters', 'Time around training', 'Fats can be lower if training hard'],
          severity: 'Medium - Performance impact',
        },
        {
          mistake: 'Not Tracking Anything',
          why_bad: 'Can\'t identify problems, guess work, no accountability',
          signs: ['No idea how much you eat', 'Inconsistent results', 'Blaming genetics', 'Confused about diet'],
          fix: ['Track for 1-2 weeks to learn', 'MyFitnessPal or similar', 'Weigh yourself daily (track trend)', 'Data removes confusion'],
          severity: 'Medium - Awareness essential',
        },
      ],
    },
    recovery: {
      name: 'Recovery Mistakes',
      icon: 'bed' as const,
      color: 'blue',
      errors: [
        {
          mistake: 'Insufficient Sleep',
          why_bad: 'Kills recovery, reduces strength, increases injury risk, hormonal disruption',
          signs: ['Chronic fatigue', 'Poor performance', 'Getting sick often', 'Irritability', 'No motivation'],
          fix: ['7-9 hours non-negotiable', 'Consistent sleep schedule', 'Dark room, cool temp', 'Sleep > everything else'],
          severity: 'Critical - Most important recovery factor',
        },
        {
          mistake: 'Training Through Pain',
          why_bad: 'Minor injury becomes major, compensations develop, forced time off',
          signs: ['Sharp pain during lifts', 'Pain that doesn\'t improve', 'Altering form to avoid pain', 'Numbing with ibuprofen'],
          fix: ['Pain is warning signal', 'Address early (rest, PT, doctor)', 'Work around injury intelligently', '2 weeks off beats 6 months forced'],
          severity: 'Critical - Injury prevention',
        },
        {
          mistake: 'High Life Stress + High Training Stress',
          why_bad: 'Total stress exceeds recovery capacity, burnout, overtraining',
          signs: ['Work deadline + heavy training', 'Poor sleep despite trying', 'Declining performance', 'Loss of motivation'],
          fix: ['Stress is cumulative', 'Reduce training volume if life stress high', 'Maintenance phase during stressful times', 'Come back when life calms'],
          severity: 'High - Total stress matters',
        },
        {
          mistake: 'Never Taking Time Off',
          why_bad: 'Mental burnout, accumulated fatigue, diminishing returns',
          signs: ['Years without break', 'Lost passion', 'Chronic niggles', 'Dreading gym'],
          fix: ['Take 1 week off every 12-16 weeks', 'Won\'t lose strength/muscle', 'Resets motivation', 'Active recovery is OK'],
          severity: 'Medium - Mental health important',
        },
        {
          mistake: 'Ignoring Mobility Work',
          why_bad: 'Compensations, injury risk, limited ROM, poor positions',
          signs: ['Can\'t squat deep', 'Shoulder pain on press', 'Tight constantly', 'Form breaking down'],
          fix: ['10 min daily mobility', 'Address specific limitations', 'Dynamic warm-up before training', 'Mobility enables better positions'],
          severity: 'Medium - Long-term health',
        },
      ],
    },
    mindset: {
      name: 'Mindset Mistakes',
      icon: 'sad' as const,
      color: 'amber',
      errors: [
        {
          mistake: 'All-or-Nothing Thinking',
          why_bad: 'Unsustainable, leads to quitting, perfection paralysis',
          signs: ['Perfect week or complete failure', 'Missed one session = ruined', 'Can\'t be flexible', 'Quit when imperfect'],
          fix: ['Progress, not perfection', 'Something beats nothing', 'Consistency over years matters', '80% effort sustained > 100% burnout'],
          severity: 'High - Sustainability killer',
        },
        {
          mistake: 'Comparing to Others',
          why_bad: 'Unrealistic expectations, demotivation, ignoring own progress',
          signs: ['Instagram envy', 'Feeling inadequate', 'Discouraged by others\' lifts', 'Ignoring your PRs'],
          fix: ['Compare to past self only', 'Everyone has different genetics/history', 'Their highlight reel vs your daily life', 'Focus on your journey'],
          severity: 'Medium - Mental health',
        },
        {
          mistake: 'Short-Term Focus',
          why_bad: 'Impatience, program hopping, unrealistic expectations',
          signs: ['Expecting results in weeks', 'Changing approach constantly', 'Frustrated with "slow" progress', 'Giving up early'],
          fix: ['Think in years, not weeks', 'Small consistent gains compound', 'Trust the process', 'Where will you be in 5 years?'],
          severity: 'High - Patience essential',
        },
        {
          mistake: 'Training for Social Media',
          why_bad: 'Ego lifting, poor programming, unsustainable practices',
          signs: ['Only maxing out for videos', 'Skipping important but "boring" work', 'Chasing viral exercises', 'Form suffering for camera'],
          fix: ['Train for you, not followers', 'Boring consistency wins', 'Fundamentals > flashy moves', 'Real progress > fake internet points'],
          severity: 'Medium - Priority confusion',
        },
        {
          mistake: 'Ignoring Mental Health',
          why_bad: 'Training suffers, life suffers, unsustainable',
          signs: ['Training despite depression/anxiety', 'Using gym to escape problems', 'Exercise addiction', 'Neglecting relationships'],
          fix: ['Mental health comes first', 'Therapy/professional help if needed', 'Training enhances life, doesn\'t replace it', 'Balance is key'],
          severity: 'Critical - Health over everything',
        },
      ],
    },
  };

  const currentCategory = mistakes[selectedCategory as keyof typeof mistakes];

  return (
    <View className="flex-1 bg-zinc-950">
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1 ml-3">
            Common Mistakes
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          <View className="bg-gradient-to-r from-red-500 to-orange-500 rounded-xl p-6 mb-6">
            <Text className="text-white text-2xl font-bold mb-2">Avoid These</Text>
            <Text className="text-white opacity-90">
              Learn from others' mistakes
            </Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6">
            <View className="flex-row gap-2">
              {categories.map((cat) => (
                <TouchableOpacity
                  key={cat}
                  onPress={() => setSelectedCategory(cat)}
                  className={`${
                    selectedCategory === cat ? 'bg-red-500' : 'bg-zinc-800'
                  } rounded-xl px-4 py-3 border ${
                    selectedCategory === cat ? 'border-red-400' : 'border-zinc-700'
                  }`}
                >
                  <Text className="text-white font-bold capitalize">
                    {cat}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          <View className={`bg-${currentCategory.color}-500/10 rounded-xl p-5 mb-6 border border-${currentCategory.color}-500/30`}>
            <View className="flex-row items-center">
              <Ionicons name={currentCategory.icon} size={28} color={`#${
                currentCategory.color === 'red' ? 'ef4444' :
                currentCategory.color === 'purple' ? 'a855f7' :
                currentCategory.color === 'emerald' ? '10b981' :
                currentCategory.color === 'blue' ? '3b82f6' :
                'f59e0b'
              }`} />
              <Text className={`text-${currentCategory.color}-400 font-bold text-xl ml-3`}>
                {currentCategory.name}
              </Text>
            </View>
          </View>

          {currentCategory.errors.map((error, idx) => (
            <View key={idx} className="bg-zinc-900 rounded-xl p-5 mb-4 border border-zinc-800">
              <View className="flex-row items-start mb-3">
                <Ionicons name="alert-circle" size={24} color="#ef4444" />
                <Text className="text-red-400 font-bold text-lg ml-2 flex-1">
                  {error.mistake}
                </Text>
              </View>

              <View className="bg-red-500/10 rounded-xl p-4 mb-3 border border-red-500/30">
                <Text className="text-red-400 font-bold text-sm mb-2">Why It's Bad</Text>
                <Text className="text-red-300">{error.why_bad}</Text>
              </View>

              <View className="mb-3">
                <Text className="text-amber-400 font-bold mb-2">Warning Signs</Text>
                {error.signs.map((sign, sidx) => (
                  <View key={sidx} className="flex-row items-start mb-1">
                    <Text className="text-amber-400 mr-2">⚠</Text>
                    <Text className="text-amber-300 text-sm flex-1">{sign}</Text>
                  </View>
                ))}
              </View>

              <View className="bg-emerald-500/10 rounded-xl p-4 mb-3 border border-emerald-500/30">
                <Text className="text-emerald-400 font-bold mb-2">How to Fix</Text>
                {error.fix.map((f, fidx) => (
                  <View key={fidx} className="flex-row items-start mb-1 last:mb-0">
                    <Text className="text-emerald-400 mr-2">✓</Text>
                    <Text className="text-emerald-300 text-sm flex-1">{f}</Text>
                  </View>
                ))}
              </View>

              <View className={`px-3 py-2 rounded-full self-start ${
                error.severity.includes('Critical') ? 'bg-red-500/20 border border-red-500/30' :
                error.severity.includes('High') ? 'bg-orange-500/20 border border-orange-500/30' :
                'bg-yellow-500/20 border border-yellow-500/30'
              }`}>
                <Text className={`text-xs font-bold ${
                  error.severity.includes('Critical') ? 'text-red-400' :
                  error.severity.includes('High') ? 'text-orange-400' :
                  'text-yellow-400'
                }`}>
                  {error.severity}
                </Text>
              </View>
            </View>
          ))}

          <View className="bg-blue-500/10 rounded-xl p-4 border border-blue-500/30 mb-6">
            <Text className="text-blue-400 font-bold mb-2">Remember</Text>
            <Text className="text-blue-300 text-sm">
              Everyone makes mistakes. The key is recognizing them early and correcting
              course. Study these common errors to save yourself months or years of
              wasted effort. Learn from others' pain points.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
