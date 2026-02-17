import React, { useState } from 'react';
import { Text } from '@/components/ui/Text';
import { View, TouchableOpacity, ScrollView } from 'react-native';;
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function GymEtiquette() {
  const [selectedCategory, setSelectedCategory] = useState('equipment');

  const etiquetteData = {
    equipment: {
      name: 'Equipment Sharing',
      icon: 'barbell',
      color: 'blue',
      rules: [
        {
          rule: 'Let People Work In',
          importance: 'Critical',
          explanation: 'If someone asks to share equipment during your rest, let them unless you have very good reason not to.',
          dos: [
            'Say "yes, sure" when asked',
            'Help them adjust rack height',
            'Communicate your sets left: "I have 2 more"',
            'Add/remove plates for them if needed',
            'Maintain same rest period rhythm',
          ],
          donts: [
            'Say no unless truly necessary',
            'Make them wait when you\'re resting 5min',
            'Get annoyed they asked',
            'Rush your sets because they\'re there',
            'Take longer rest to punish them',
          ],
          exceptions: [
            'Max attempt day (tell them "sorry, max attempt today")',
            'Very specific setup (monolift, specialty bar, chains, etc.)',
            'Supersetting this equipment with another',
            'Only 1-2 sets left (still offer: "just 1 left, all yours in 2min")',
          ],
        },
        {
          rule: 'Don\'t Hog Equipment',
          importance: 'Critical',
          explanation: 'Be aware of gym traffic. Don\'t monopolize equipment during busy hours.',
          dos: [
            'Use equipment efficiently',
            'Superset with nearby/unused equipment only',
            'Offer to let people work in',
            'Finish in reasonable time (30-45min max per station)',
            'Move to different equipment if gym is packed',
          ],
          donts: [
            'Claim 3 pieces of equipment at once',
            'Sit on bench scrolling phone 5min between sets',
            'Do 10 sets when people are waiting',
            'Reserve equipment with towel while doing cardio',
            'Circuit train during peak hours',
          ],
          solutions: [
            'Busy gym = work in with someone on same lift',
            'Busy gym = shorten rest periods slightly',
            'Busy gym = save accessories for later',
            'Busy gym = come earlier/later if possible',
          ],
        },
        {
          rule: 'Rerack Your Weights',
          importance: 'Critical',
          explanation: 'Always unload bar and put weights back. No exceptions.',
          dos: [
            'Remove ALL plates after EVERY exercise',
            'Put plates on correct pegs by weight',
            'Put dumbbells back on rack in order',
            'Return bars to proper place',
            'Leave equipment how you found it (or better)',
          ],
          donts: [
            'Leave plates on bar "for next person"',
            'Put 45s on 25lb peg',
            'Scatter dumbbells around floor',
            'Leave bars across squat rack',
            'Assume gym staff will do it',
          ],
          whyItMatters: [
            'Safety - someone could trip',
            'Courtesy - others need equipment',
            'Gym might ban you for repeated violations',
            'Makes you look like entitled jerk',
            'It\'s literally the minimum',
          ],
        },
        {
          rule: 'Ask Before Using',
          importance: 'High',
          explanation: 'If equipment looks in use, ask before taking.',
          dos: [
            'Ask: "Are you using this?"',
            'Wait for response before taking',
            'Look for nearby water bottle/towel/phone',
            'Check if someone is approaching',
            'Err on side of asking',
          ],
          donts: [
            'Grab plates off loaded bar',
            'Take bar that\'s set up',
            'Assume abandoned if person not visible',
            'Move someone\'s stuff without asking',
            'Take weights from someone\'s "home base"',
          ],
          ifAbandoned: [
            'Wait 5-10 minutes',
            'Ask gym staff if they know',
            'Ask people nearby',
            'Then okay to carefully move setup',
          ],
        },
        {
          rule: 'Use Equipment Properly',
          importance: 'High',
          explanation: 'Don\'t damage or misuse equipment.',
          dos: [
            'Use collars on bench press (safety)',
            'Deadlift in designated area if available',
            'Use chalk in moderation',
            'Control weights on descent',
            'Use appropriate equipment for exercise',
          ],
          donts: [
            'Drop weights from lockout (unless bumpers)',
            'Slam dumbbells after set',
            'Do Olympic lifts with iron plates',
            'Deadlift on nice flooring without mats',
            'Kip pull-ups on fixed bar (damages)',
            'Curl in squat rack (unless gym is empty)',
          ],
        },
      ],
    },
    space: {
      name: 'Space & Movement',
      icon: 'resize',
      color: 'primary',
      rules: [
        {
          rule: 'Don\'t Walk in Front of Lifts',
          importance: 'Critical',
          explanation: 'Never cross someone\'s line of sight mid-set. Extremely dangerous and disrespectful.',
          dos: [
            'Wait until set is complete',
            'Walk behind them instead',
            'Make eye contact, wait for nod if urgent',
            'Go far around (10+ feet)',
            'Be patient, wait 30 seconds',
          ],
          donts: [
            'Walk between lifter and mirror mid-set',
            'Cross their bar path during lift',
            'Wave/say hi during their set',
            'Squeeze between them and rack',
            'Think "I\'ll just be quick"',
          ],
          whyDangerous: [
            'Breaks concentration = missed lift',
            'Startle can cause injury',
            'Depth check needs unobstructed view',
            'Could cause them to bail unsafely',
            'Total breach of gym etiquette',
          ],
        },
        {
          rule: 'Respect Personal Space',
          importance: 'High',
          explanation: 'Give people room to lift safely.',
          dos: [
            'Stay 6-10 feet away from active lifter',
            'Set up your station with clearance',
            'Ask if you\'ll be in their way',
            'Move if you realize you\'re too close',
            'Be aware of walkout/setup needs',
          ],
          donts: [
            'Set up right next to someone squatting',
            'Stretch in their walkout path',
            'Stand in deadlift landing zone',
            'Crowd the platform',
            'Block access to their weights',
          ],
        },
        {
          rule: 'Keep Volume Down',
          importance: 'Medium',
          explanation: 'Noise is part of lifting, but be reasonable.',
          acceptable: [
            'Breathing hard/grunting on heavy sets',
            'Controlled bar contact on floor',
            'Verbal self-cues ("UP!")',
            'Music through headphones',
            'Celebrating PR with partner',
          ],
          excessive: [
            'Screaming every warm-up set',
            'Dropping dumbbells from standing',
            'Slamming plates intentionally',
            'Music through phone speaker',
            'Having loud conversations near lifters',
          ],
          guideline: [
            'Heavy set = noise is fine',
            'Light set = control yourself',
            'Busy gym = quieter',
            'Empty gym = more leeway',
            'Always control equipment',
          ],
        },
      ],
    },
    social: {
      name: 'Social Interactions',
      icon: 'chatbubbles',
      color: 'purple',
      rules: [
        {
          rule: 'Don\'t Interrupt Sets',
          importance: 'Critical',
          explanation: 'Never talk to someone mid-set or between reps.',
          dos: [
            'Wait until they fully rack weight',
            'Make eye contact, wait for acknowledgment',
            'Keep it brief during their workout',
            'Save long conversations for after',
            'Read body language for receptiveness',
          ],
          donts: [
            'Talk during their set',
            'Talk during their warmup approach',
            'Start conversation mid-amrap set',
            'Ask questions during their rest period',
            'Demand immediate attention',
          ],
          exceptions: [
            'Emergency (fire, injury)',
            'Their form is dangerous',
            'They\'re about to hurt themselves',
            'They asked you to coach them',
          ],
        },
        {
          rule: 'Don\'t Give Unsolicited Advice',
          importance: 'High',
          explanation: 'Unless someone is about to injure themselves, keep advice to yourself unless asked.',
          whenToSpeak: [
            'Imminent danger (knees caving badly, back rounding deadlift)',
            'They explicitly ask for feedback',
            'You\'re their coach/training partner',
            'Safety issue (no collars on bench)',
          ],
          whenToStayQuiet: [
            'Their form is "suboptimal" but safe',
            'You think you know better',
            'They\'re doing different style than you',
            'Minor technical detail',
            'They\'re clearly experienced',
          ],
          ifYouMustSay: [
            'Wait until after set',
            'Ask: "Mind if I mention something?"',
            'Be humble: "I noticed..." not "You\'re doing it wrong"',
            'Offer, don\'t insist',
            'Accept if they say no thanks',
          ],
        },
        {
          rule: 'Be Friendly But Focused',
          importance: 'Medium',
          explanation: 'Gym can be social, but people are there to train.',
          dos: [
            'Nod/fist-bump regulars you know',
            'Brief "how\'s it going" between sets',
            'Encourage someone grinding',
            'Congratulate PRs',
            'Save long talks for after workout',
          ],
          donts: [
            'Tell life story to captive audience',
            'Interrupt their whole workout to chat',
            'Get offended if they\'re short with you',
            'Expect gym to be social hour',
            'Follow them around talking',
          ],
        },
        {
          rule: 'Respect Headphones',
          importance: 'Medium',
          explanation: 'Headphones = do not disturb unless necessary.',
          dos: [
            'Wave to get attention first',
            'Point to headphones if they need to remove',
            'Keep it very brief',
            'Assume they want to focus',
            'Come back later if not urgent',
          ],
          donts: [
            'Start talking without getting attention',
            'Get mad they can\'t hear you',
            'Expect them to remove headphones to chat',
            'Take it personally',
          ],
        },
      ],
    },
    hygiene: {
      name: 'Hygiene & Cleanliness',
      icon: 'water',
      color: 'cyan',
      rules: [
        {
          rule: 'Use a Towel',
          importance: 'High',
          explanation: 'Wipe down equipment after use, bring towel to sit/lie on.',
          dos: [
            'Bring towel to every session',
            'Put towel on bench before lying',
            'Wipe bench/equipment after use',
            'Use gym wipes if available',
            'Extra wipe if you sweated heavily',
          ],
          donts: [
            'Leave sweat puddle on bench',
            'Lie directly on equipment',
            'Forget to wipe after heavy set',
            'Make someone else clean up your sweat',
            'Argue "I didn\'t sweat that much"',
          ],
        },
        {
          rule: 'Wear Appropriate Clothing',
          importance: 'High',
          explanation: 'Dress for hygiene and function.',
          appropriate: [
            'Athletic shorts/pants',
            'Moisture-wicking shirt',
            'Proper training shoes',
            'Clean clothes',
            'Covered enough (check gym rules)',
          ],
          inappropriate: [
            'Jeans or khakis',
            'Barefoot (unless deadlifting)',
            'Same gross shirt every day',
            'Exposed too much (distracting)',
            'Open-toed shoes (safety hazard)',
          ],
        },
        {
          rule: 'Control Your Hygiene',
          importance: 'High',
          explanation: 'Don\'t make others suffer your smell.',
          dos: [
            'Shower regularly',
            'Use deodorant',
            'Wear clean clothes',
            'Wash gym clothes after each use',
            'Be aware of strong cologne/perfume too',
          ],
          donts: [
            'Come reeking of BO',
            'Wear same clothes multiple days',
            'Drench in cologne (just as bad)',
            'Ignore your smell problem',
          ],
          ifSomeoneSmells: [
            'Don\'t say anything to them',
            'Move to different area if possible',
            'Tell gym staff if it\'s really bad',
            'Don\'t make faces or comments',
          ],
        },
      ],
    },
    phone: {
      name: 'Phone & Tech Use',
      icon: 'phone-portrait',
      color: 'amber',
      rules: [
        {
          rule: 'Track Workouts, Don\'t Scroll',
          importance: 'Medium',
          explanation: 'Phone for training log = fine. Phone for Instagram = rude.',
          acceptable: [
            'Logging sets between lifts',
            'Timing rest periods',
            'Filming form checks',
            'Playing music',
            'Quick text reply',
          ],
          excessive: [
            'Scrolling social media 5min between sets',
            'Taking selfies every set',
            'FaceTime call on gym floor',
            'Watching videos on equipment',
            'Playing mobile games',
          ],
          rule: [
            'Use phone for training = totally fine',
            'Use phone to waste time = hogging equipment',
            'If scrolling, stand away from equipment',
            'Busy gym = minimize phone time',
          ],
        },
        {
          rule: 'Be Careful When Filming',
          importance: 'High',
          explanation: 'Film your lifts, but don\'t film others.',
          dos: [
            'Angle camera on yourself only',
            'Film from close range',
            'Delete if others are visible',
            'Use tripod, not propped on equipment',
            'Be quick about setup',
          ],
          donts: [
            'Film wide angle with others in frame',
            'Post videos with others visible',
            'Film others without permission',
            'Leave camera running unattended',
            'Take forever setting up perfect angle',
          ],
          legal: [
            'Many people don\'t want to be filmed',
            'Posting others = potential privacy violation',
            'Be respectful of others\' image',
            'Gym might have specific filming policy',
          ],
        },
      ],
    },
  };

  const currentCategory = etiquetteData[selectedCategory as keyof typeof etiquetteData];

  const getColorClass = (color: string) => {
    const colors: { [key: string]: string } = {
      blue: 'bg-primary',
      primary: 'bg-primary',
      purple: 'bg-purple-500',
      cyan: 'bg-cyan-500',
      amber: 'bg-amber-500',
    };
    return colors[color];
  };

  const getImportanceColor = (importance: string) => {
    if (importance === 'Critical') return 'bg-red-500';
    if (importance === 'High') return 'bg-amber-500';
    return 'bg-primary';
  };

  return (
    <View className="flex-1 bg-zinc-950">
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1 ml-3">
            Gym Etiquette
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          <View className="bg-gradient-to-r from-primary to-[#7D0EBE] rounded-xl p-6 mb-6">
            <Text className="text-white text-2xl font-bold mb-2">Don't Be That Guy</Text>
            <Text className="text-white opacity-90">
              Gym etiquette rules everyone should follow
            </Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6">
            <View className="flex-row gap-3 px-1">
              {Object.entries(etiquetteData).map(([key, category]) => (
                <TouchableOpacity
                  key={key}
                  onPress={() => setSelectedCategory(key)}
                  className={`${
                    selectedCategory === key 
                      ? getColorClass(category.color)
                      : 'bg-zinc-900'
                  } rounded-xl p-4 border ${
                    selectedCategory === key 
                      ? 'border-white/30'
                      : 'border-zinc-800'
                  } min-w-[180px]`}
                >
                  <Ionicons 
                    name={category.icon as any} 
                    size={32} 
                    color={selectedCategory === key ? 'white' : '#a1a1aa'} 
                  />
                  <Text className={`${selectedCategory === key ? 'text-white' : 'text-zinc-400'} font-bold mt-2`}>
                    {category.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          {currentCategory.rules.map((rule, idx) => (
            <View key={idx} className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
              <View className="flex-row items-start justify-between mb-3">
                <Text className="text-white text-xl font-bold flex-1 mr-3">{rule.rule}</Text>
                <View className={`${getImportanceColor(rule.importance)} rounded-full px-3 py-1`}>
                  <Text className="text-white text-xs font-bold">{rule.importance}</Text>
                </View>
              </View>

              <Text className="text-zinc-300 mb-4">{rule.explanation}</Text>

              {rule.dos && (
                <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-3">
                  <Text className="text-primary font-bold mb-2">? DO:</Text>
                  {rule.dos.map((item, dIdx) => (
                    <Text key={dIdx} className="text-primary/80 text-sm mb-1 last:mb-0">
                      • {item}
                    </Text>
                  ))}
                </View>
              )}

              {rule.donts && (
                <View className="bg-red-500/10 rounded-xl p-4 border border-red-500/30 mb-3">
                  <Text className="text-red-400 font-bold mb-2">? DON'T:</Text>
                  {rule.donts.map((item, dIdx) => (
                    <Text key={dIdx} className="text-red-300 text-sm mb-1 last:mb-0">
                      • {item}
                    </Text>
                  ))}
                </View>
              )}

              {rule.exceptions && (
                <View className="bg-amber-500/10 rounded-xl p-4 border border-amber-500/30 mb-3">
                  <Text className="text-amber-400 font-bold mb-2">Exceptions:</Text>
                  {rule.exceptions.map((item, eIdx) => (
                    <Text key={eIdx} className="text-amber-300 text-sm mb-1 last:mb-0">
                      • {item}
                    </Text>
                  ))}
                </View>
              )}

              {rule.solutions && (
                <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-3">
                  <Text className="text-primary/80 font-bold mb-2">Solutions:</Text>
                  {rule.solutions.map((item, sIdx) => (
                    <Text key={sIdx} className="text-primary/60 text-sm mb-1 last:mb-0">
                      • {item}
                    </Text>
                  ))}
                </View>
              )}

              {rule.whyItMatters && (
                <View className="bg-purple-500/10 rounded-xl p-4 border border-purple-500/30 mb-3">
                  <Text className="text-purple-400 font-bold mb-2">Why It Matters:</Text>
                  {rule.whyItMatters.map((item, wIdx) => (
                    <Text key={wIdx} className="text-purple-300 text-sm mb-1 last:mb-0">
                      • {item}
                    </Text>
                  ))}
                </View>
              )}

              {rule.whyDangerous && (
                <View className="bg-red-500/10 rounded-xl p-4 border border-red-500/30 mb-3">
                  <Text className="text-red-400 font-bold mb-2">⚠️ Why It's Dangerous:</Text>
                  {rule.whyDangerous.map((item, wIdx) => (
                    <Text key={wIdx} className="text-red-300 text-sm mb-1 last:mb-0">
                      • {item}
                    </Text>
                  ))}
                </View>
              )}

              {rule.acceptable && (
                <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-3">
                  <Text className="text-primary font-bold mb-2">? Acceptable:</Text>
                  {rule.acceptable.map((item, aIdx) => (
                    <Text key={aIdx} className="text-primary/80 text-sm mb-1 last:mb-0">
                      • {item}
                    </Text>
                  ))}
                </View>
              )}

              {rule.excessive && (
                <View className="bg-red-500/10 rounded-xl p-4 border border-red-500/30 mb-3">
                  <Text className="text-red-400 font-bold mb-2">? Excessive:</Text>
                  {rule.excessive.map((item, eIdx) => (
                    <Text key={eIdx} className="text-red-300 text-sm mb-1 last:mb-0">
                      • {item}
                    </Text>
                  ))}
                </View>
              )}

              {rule.guideline && (
                <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-3">
                  <Text className="text-primary/80 font-bold mb-2">Guidelines:</Text>
                  {rule.guideline.map((item, gIdx) => (
                    <Text key={gIdx} className="text-primary/60 text-sm mb-1 last:mb-0">
                      • {item}
                    </Text>
                  ))}
                </View>
              )}

              {rule.whenToSpeak && (
                <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-3">
                  <Text className="text-primary font-bold mb-2">When to Speak Up:</Text>
                  {rule.whenToSpeak.map((item, wIdx) => (
                    <Text key={wIdx} className="text-primary/80 text-sm mb-1 last:mb-0">
                      • {item}
                    </Text>
                  ))}
                </View>
              )}

              {rule.whenToStayQuiet && (
                <View className="bg-red-500/10 rounded-xl p-4 border border-red-500/30 mb-3">
                  <Text className="text-red-400 font-bold mb-2">When to Stay Quiet:</Text>
                  {rule.whenToStayQuiet.map((item, wIdx) => (
                    <Text key={wIdx} className="text-red-300 text-sm mb-1 last:mb-0">
                      • {item}
                    </Text>
                  ))}
                </View>
              )}

              {rule.ifYouMustSay && (
                <View className="bg-amber-500/10 rounded-xl p-4 border border-amber-500/30 mb-3">
                  <Text className="text-amber-400 font-bold mb-2">If You Must Say Something:</Text>
                  {rule.ifYouMustSay.map((item, iIdx) => (
                    <Text key={iIdx} className="text-amber-300 text-sm mb-1 last:mb-0">
                      • {item}
                    </Text>
                  ))}
                </View>
              )}

              {rule.ifAbandoned && (
                <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-3">
                  <Text className="text-primary/80 font-bold mb-2">If Equipment Looks Abandoned:</Text>
                  {rule.ifAbandoned.map((item, iIdx) => (
                    <Text key={iIdx} className="text-primary/60 text-sm mb-1 last:mb-0">
                      • {item}
                    </Text>
                  ))}
                </View>
              )}

              {rule.appropriate && (
                <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-3">
                  <Text className="text-primary font-bold mb-2">? Appropriate:</Text>
                  {rule.appropriate.map((item, aIdx) => (
                    <Text key={aIdx} className="text-primary/80 text-sm mb-1 last:mb-0">
                      • {item}
                    </Text>
                  ))}
                </View>
              )}

              {rule.inappropriate && (
                <View className="bg-red-500/10 rounded-xl p-4 border border-red-500/30 mb-3">
                  <Text className="text-red-400 font-bold mb-2">? Inappropriate:</Text>
                  {rule.inappropriate.map((item, iIdx) => (
                    <Text key={iIdx} className="text-red-300 text-sm mb-1 last:mb-0">
                      • {item}
                    </Text>
                  ))}
                </View>
              )}

              {rule.rule && (
                <View className="bg-purple-500/10 rounded-xl p-4 border border-purple-500/30">
                  <Text className="text-purple-400 font-bold mb-2">Rule of Thumb:</Text>
                  {rule.rule.map((item, rIdx) => (
                    <Text key={rIdx} className="text-purple-300 text-sm mb-1 last:mb-0">
                      • {item}
                    </Text>
                  ))}
                </View>
              )}

              {rule.legal && (
                <View className="bg-amber-500/10 rounded-xl p-4 border border-amber-500/30">
                  <Text className="text-amber-400 font-bold mb-2">⚠️ Legal/Privacy:</Text>
                  {rule.legal.map((item, lIdx) => (
                    <Text key={lIdx} className="text-amber-300 text-sm mb-1 last:mb-0">
                      • {item}
                    </Text>
                  ))}
                </View>
              )}

              {rule.ifSomeone && selectedCategory === 'hygiene' && (
                <View className="bg-primary/10 rounded-xl p-4 border border-primary/30">
                  <Text className="text-primary/80 font-bold mb-2">If Someone Else Smells:</Text>
                  {rule.ifSomeoneSmells.map((item: string, iIdx: number) => (
                    <Text key={iIdx} className="text-primary/60 text-sm mb-1 last:mb-0">
                      • {item}
                    </Text>
                  ))}
                </View>
              )}
            </View>
          ))}

          <View className="bg-gradient-to-r from-primary/20 to-blue-500/20 rounded-xl p-5 border border-primary/30 mb-6">
            <Text className="text-primary font-bold text-lg mb-3">Golden Rule</Text>
            <Text className="text-primary/80 text-sm mb-2">
              Treat others' training with the same respect you want for yours.
            </Text>
            <Text className="text-primary/80 text-sm mb-2">
              If you wouldn't want someone doing it to you, don't do it to them.
            </Text>
            <Text className="text-primary/80 text-sm">
              When in doubt, be MORE considerate than necessary.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}


