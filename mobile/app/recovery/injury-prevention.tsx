import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function InjuryPrevention() {
  const [selectedCategory, setSelectedCategory] = useState('common');

  const injuryData = {
    common: {
      name: 'Common Injuries',
      icon: 'alert-circle',
      color: 'red',
      injuries: [
        {
          injury: 'Lower Back Strain',
          commonIn: 'Deadlift, squat',
          causes: ['Poor bracing', 'Excessive rounding', 'Too much volume', 'Weak core'],
          prevention: [
            'Learn to brace properly (big breath, push abs out)',
            'Maintain neutral spine throughout lift',
            'Strengthen core with planks, dead bugs',
            'Don\'t ego lift - use proper weights',
            'Belt for heavy sets (80%+ 1RM)',
          ],
          signs: ['Sharp pain during lift', 'Stiffness next day', 'Pain with bending/twisting', 'Muscle spasms'],
          action: 'Stop immediately. Ice 48h, then heat. See doctor if severe or lasting >1 week.',
        },
        {
          injury: 'Shoulder Impingement',
          commonIn: 'Bench press, overhead press',
          causes: ['Poor shoulder position', 'Lack of mobility', 'Weak rotator cuff', 'Too much pressing'],
          prevention: [
            'Retract scapulae on bench (shoulder blades back/down)',
            'Don\'t flare elbows 90Â° on bench (45-75Â° angle)',
            'Do face pulls and band pull-aparts (3x/week)',
            'Balance push/pull ratio (1:1 or more pulling)',
            'Improve thoracic mobility',
          ],
          signs: ['Pain on overhead movement', 'Clicking/popping', 'Pain at night', 'Weakness overhead'],
          action: 'Reduce pressing volume 50%. Focus on mobility and rear delt work. Physical therapy if no improvement.',
        },
        {
          injury: 'Patellar Tendonitis',
          commonIn: 'Squat, lunge',
          causes: ['Excessive volume', 'Knees caving in', 'Poor ankle mobility', 'Quad dominance'],
          prevention: [
            'Control descent tempo (2-3s eccentric)',
            'Keep knees tracking over toes',
            'Strengthen glutes and hamstrings',
            'Improve ankle mobility',
            'Don\'t bounce out of bottom',
          ],
          signs: ['Pain below kneecap', 'Worse after training', 'Stiffness after sitting', 'Pain with stairs'],
          action: 'Reduce knee extension exercises. Isometric holds. Eccentric training. Rehab before returning to heavy.',
        },
        {
          injury: 'Tennis Elbow (Lateral Epicondylitis)',
          commonIn: 'Bench press, rows',
          causes: ['Too much grip work', 'Poor bar position', 'Overtraining arms', 'Weak forearms'],
          prevention: [
            'Don\'t death grip the bar',
            'Proper bar position on bench (aligned with forearms)',
            'Build forearm strength gradually',
            'Limit direct arm volume',
            'Use straps for heavy pulls if needed',
          ],
          signs: ['Pain outside elbow', 'Weak grip', 'Pain with twisting motions', 'Radiating pain'],
          action: 'Rest from aggravating exercises. Reverse wrist curls. Massage/stretch forearms. Gradual return.',
        },
        {
          injury: 'Hip Flexor Strain',
          commonIn: 'Squat, deadlift',
          causes: ['Tight hip flexors', 'Excessive sitting', 'Poor hip mobility', 'Overstriding'],
          prevention: [
            'Daily hip flexor stretching',
            'Glute activation before squats',
            'Improve hip extension mobility',
            'Strengthen glutes to balance hip',
            'Don\'t hyperextend at lockout',
          ],
          signs: ['Pain in front of hip', 'Sharp pain with lifting knee', 'Clicking/snapping', 'Limited ROM'],
          action: 'Stop aggravating movements. Stretch and mobilize. Strengthen glutes. Gradual return with lighter weight.',
        },
      ],
    },
    prevention: {
      name: 'Prevention Strategies',
      icon: 'shield-checkmark',
      color: 'emerald',
      strategies: [
        {
          strategy: 'Progressive Overload',
          importance: 'Critical',
          description: 'Increase weight/volume gradually',
          guidelines: [
            'Add 2.5-5kg per week for upper body',
            'Add 5-10kg per week for lower body',
            'Or add 1-2 reps per session at same weight',
            'Don\'t jump 20kg because you "feel good"',
            'Consistency beats intensity spikes',
          ],
          frequency: 'Every session',
        },
        {
          strategy: 'Proper Warm-up',
          importance: 'Critical',
          description: 'Never skip warm-up sets',
          guidelines: [
            'General warm-up: 5-10 min cardio + mobility',
            'Specific warm-up: Empty bar â†’ 40% â†’ 50% â†’ 60% â†’ 70% â†’ 80%',
            'More warm-up for older lifters (30+)',
            'Extra mobility if feeling tight',
            'Don\'t fatigue yourself in warm-up',
          ],
          frequency: 'Every training session',
        },
        {
          strategy: 'Mobility Work',
          importance: 'High',
          description: 'Maintain full range of motion',
          guidelines: [
            'Daily hip mobility (90/90, cossacks, deep squat)',
            'Daily thoracic mobility (rotations, extensions)',
            'Ankle mobility before squats',
            'Shoulder mobility before pressing',
            '10-15 min per day minimum',
          ],
          frequency: 'Daily',
        },
        {
          strategy: 'Balanced Programming',
          importance: 'High',
          description: 'Balance push/pull and muscle groups',
          guidelines: [
            'Equal push/pull volume (or favor pulling)',
            'Don\'t neglect posterior chain',
            'Include unilateral work for imbalances',
            'Vary rep ranges (strength + hypertrophy)',
            'Don\'t specialize too early',
          ],
          frequency: 'Program design',
        },
        {
          strategy: 'Deload Weeks',
          importance: 'Critical',
          description: 'Planned recovery periods',
          guidelines: [
            'Every 4-6 weeks take deload',
            'Reduce volume by 50% OR intensity by 20-30%',
            'Maintain frequency (still train 3-5x/week)',
            'One week only - not longer',
            'Expect to feel stronger after',
          ],
          frequency: 'Every 4-6 weeks',
        },
        {
          strategy: 'Listen to Your Body',
          importance: 'Critical',
          description: 'Recognize warning signs',
          guidelines: [
            'Sharp pain = stop immediately',
            'Chronic soreness = reduce volume',
            'Poor sleep = reduce intensity',
            'Elevated resting HR = deload',
            'Mental burnout = active recovery week',
          ],
          frequency: 'Daily monitoring',
        },
        {
          strategy: 'Technical Proficiency',
          importance: 'Critical',
          description: 'Perfect form prevents injury',
          guidelines: [
            'Film your lifts regularly',
            'Get coaching if possible',
            'Master technique before adding weight',
            'Leave ego at the door',
            'Form breaks down? End set.',
          ],
          frequency: 'Every lift',
        },
        {
          strategy: 'Recovery Optimization',
          importance: 'High',
          description: 'Recovery is when you grow',
          guidelines: [
            'Sleep 7-9 hours per night',
            'Protein 2-2.5g/kg bodyweight',
            'Manage life stress',
            'Stay hydrated',
            'Active recovery on off days',
          ],
          frequency: 'Daily',
        },
      ],
    },
    warning: {
      name: 'Warning Signs',
      icon: 'warning',
      color: 'amber',
      signs: [
        {
          sign: 'Sharp Pain',
          severity: 'STOP IMMEDIATELY',
          description: 'Acute, stabbing pain during lift',
          action: [
            'Stop the exercise immediately',
            'Don\'t try to "work through it"',
            'Ice for first 48 hours',
            'See doctor if pain persists >3 days',
            'Don\'t return until pain-free',
          ],
          examples: ['Sudden back pain on deadlift', 'Sharp shoulder pain on bench', 'Knee pop during squat'],
        },
        {
          sign: 'Chronic Soreness',
          severity: 'REDUCE VOLUME',
          description: 'Muscles always sore, never recovering',
          action: [
            'Take 1 week deload (50% volume)',
            'Improve sleep and nutrition',
            'Reduce training frequency',
            'More recovery days between sessions',
            'Consider overtraining',
          ],
          examples: ['Always sore despite rest days', 'Soreness lasting 4+ days', 'Can\'t recover session to session'],
        },
        {
          sign: 'Performance Decline',
          severity: 'DELOAD NEEDED',
          description: 'Weights getting heavier, strength decreasing',
          action: [
            'Immediate deload week',
            'Check sleep quality',
            'Review nutrition (eating enough?)',
            'Assess life stress',
            'Return with fresh programming',
          ],
          examples: ['Missing reps you used to hit', 'Weights feel heavier than before', '3 weeks of no progress'],
        },
        {
          sign: 'Joint Pain',
          severity: 'MODIFY TRAINING',
          description: 'Aching in joints, not muscles',
          action: [
            'Reduce intensity by 20%',
            'Extra mobility and warm-up',
            'Check technique on video',
            'Consider joint-friendly variations',
            'Physical therapy if persistent',
          ],
          examples: ['Elbow aching after pressing', 'Knee pain during squats', 'Shoulder clicking with movement'],
        },
        {
          sign: 'Sleep Issues',
          severity: 'REDUCE INTENSITY',
          description: 'Can\'t fall asleep, poor quality sleep',
          action: [
            'Reduce training intensity',
            'Move intense sessions earlier in day',
            'Check for overtraining',
            'Manage stress better',
            'Consider active recovery week',
          ],
          examples: ['Wired at night after training', 'Waking up frequently', 'Not feeling rested'],
        },
        {
          sign: 'Loss of Motivation',
          severity: 'MENTAL BREAK NEEDED',
          description: 'Dreading workouts, no enjoyment',
          action: [
            'Take 3-5 days completely off',
            'Try different activities (sports, hiking)',
            'Change up programming',
            'Remember why you started',
            'Consider coaching or training partner',
          ],
          examples: ['Don\'t want to go to gym', 'Training feels like chore', 'No excitement for PRs'],
        },
      ],
    },
  };

  const currentData = injuryData[selectedCategory as keyof typeof injuryData];

  const getColorClasses = (color: string) => {
    const colors: { [key: string]: { bg: string; border: string; text: string } } = {
      red: { bg: 'bg-red-500', border: 'border-red-400', text: 'text-red-400' },
      emerald: { bg: 'bg-primary', border: 'border-primary', text: 'text-primary' },
      amber: { bg: 'bg-amber-500', border: 'border-amber-400', text: 'text-amber-400' },
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
            Injury Prevention
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          <View className="bg-gradient-to-r from-red-500 to-orange-500 rounded-xl p-6 mb-6">
            <Text className="text-white text-2xl font-bold mb-2">Stay Healthy</Text>
            <Text className="text-white opacity-90">
              Prevention is better than cure
            </Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6">
            <View className="flex-row gap-3 px-1">
              {Object.entries(injuryData).map(([key, data]) => (
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

          {selectedCategory === 'common' && (
            <View>
              {injuryData.common.injuries.map((item, idx) => (
                <View key={idx} className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
                  <Text className="text-red-400 text-xl font-bold mb-2">{item.injury}</Text>
                  <View className="bg-zinc-800 rounded-xl p-3 mb-4">
                    <Text className="text-zinc-400 text-sm mb-1">Common in:</Text>
                    <Text className="text-white font-bold">{item.commonIn}</Text>
                  </View>

                  <Text className="text-white font-bold mb-2">Causes:</Text>
                  {item.causes.map((cause, cIdx) => (
                    <Text key={cIdx} className="text-zinc-300 text-sm mb-1">
                      â€¢ {cause}
                    </Text>
                  ))}

                  <Text className="text-primary font-bold mt-4 mb-2">Prevention:</Text>
                  {item.prevention.map((prev, pIdx) => (
                    <Text key={pIdx} className="text-primary/80 text-sm mb-1">
                      âœ“ {prev}
                    </Text>
                  ))}

                  <Text className="text-amber-400 font-bold mt-4 mb-2">Warning Signs:</Text>
                  {item.signs.map((sign, sIdx) => (
                    <Text key={sIdx} className="text-amber-300 text-sm mb-1">
                      âš  {sign}
                    </Text>
                  ))}

                  <View className="bg-red-500/10 rounded-xl p-3 border border-red-500/30 mt-4">
                    <Text className="text-red-400 font-bold text-sm mb-1">If injured:</Text>
                    <Text className="text-red-300 text-sm">{item.action}</Text>
                  </View>
                </View>
              ))}
            </View>
          )}

          {selectedCategory === 'prevention' && (
            <View>
              {injuryData.prevention.strategies.map((strategy, idx) => (
                <View key={idx} className="bg-zinc-900 rounded-xl p-5 mb-4 border border-zinc-800">
                  <View className="flex-row items-center justify-between mb-3">
                    <Text className="text-white text-lg font-bold flex-1">{strategy.strategy}</Text>
                    <View className={`${
                      strategy.importance === 'Critical' ? 'bg-red-500' : 'bg-amber-500'
                    } rounded-full px-3 py-1`}>
                      <Text className="text-white text-xs font-bold">{strategy.importance}</Text>
                    </View>
                  </View>

                  <Text className="text-primary font-bold mb-3">{strategy.description}</Text>

                  <View className="bg-zinc-800 rounded-xl p-3 mb-3">
                    {strategy.guidelines.map((guideline, gIdx) => (
                      <Text key={gIdx} className="text-white text-sm mb-2 last:mb-0">
                        â€¢ {guideline}
                      </Text>
                    ))}
                  </View>

                  <View className="flex-row items-center">
                    <Ionicons name="time" size={16} color="#9D12DE" />
                    <Text className="text-primary text-sm ml-2 font-bold">{strategy.frequency}</Text>
                  </View>
                </View>
              ))}
            </View>
          )}

          {selectedCategory === 'warning' && (
            <View>
              {injuryData.warning.signs.map((item, idx) => (
                <View key={idx} className="bg-zinc-900 rounded-xl p-5 mb-4 border border-zinc-800">
                  <View className="flex-row items-start justify-between mb-3">
                    <Text className="text-white text-xl font-bold flex-1">{item.sign}</Text>
                    <View className="bg-red-500 rounded-full px-3 py-1">
                      <Text className="text-white text-xs font-bold">{item.severity}</Text>
                    </View>
                  </View>

                  <Text className="text-zinc-400 mb-4">{item.description}</Text>

                  <Text className="text-amber-400 font-bold mb-2">What to do:</Text>
                  <View className="bg-zinc-800 rounded-xl p-3 mb-3">
                    {item.action.map((act, aIdx) => (
                      <Text key={aIdx} className="text-white text-sm mb-2 last:mb-0">
                        {aIdx + 1}. {act}
                      </Text>
                    ))}
                  </View>

                  <Text className="text-zinc-400 text-sm mb-2">Examples:</Text>
                  {item.examples.map((example, eIdx) => (
                    <Text key={eIdx} className="text-zinc-300 text-sm mb-1">
                      â€¢ {example}
                    </Text>
                  ))}
                </View>
              ))}
            </View>
          )}

          <View className="bg-red-500/10 rounded-xl p-4 border border-red-500/30 mb-6">
            <Text className="text-red-400 font-bold mb-2">Golden Rule</Text>
            <Text className="text-red-300 text-sm mb-2">
              Pain is not weakness leaving the body - it's your body warning you
            </Text>
            <Text className="text-red-300 text-sm mb-2">
              Pushing through pain = weeks/months of forced rest
            </Text>
            <Text className="text-red-300 text-sm">
              Listen to your body, train smarter, lift for decades
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}


