import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function CommonTechnicalFlaws() {
  const [selectedLift, setSelectedLift] = useState('squat');

  const flawData = {
    squat: {
      name: 'Squat Flaws',
      icon: 'barbell',
      color: 'blue',
      flaws: [
        {
          flaw: 'Knees Caving In (Valgus)',
          severity: 'High',
          why_bad: [
            'Major injury risk - ACL, meniscus, MCL',
            'Reduces force production',
            'Can cause DQ in competition',
          ],
          causes: [
            'Weak glute medius (hip abductors)',
            'Quad dominant, underactive glutes',
            'Poor motor pattern/not thinking about it',
            'Fatigue - appears on later reps',
            'Stance too wide for mobility',
          ],
          fixes: [
            {
              immediate: 'Cue "knees out" or "spread the floor"',
              short_term: [
                'Band around knees during warm-ups (resistance)',
                'Pause squats with focus on knee position',
                'Film every set - visual feedback',
              ],
              long_term: [
                'Glute medius work: banded walks, clams, single leg work',
                'Goblet squats with elbows pushing knees out',
                '2-3x per week accessory focus',
              ],
            },
          ],
          film_angle: 'Front view at 45° angle',
        },
        {
          flaw: 'Good Morning Squat (Hips Rise First)',
          severity: 'High',
          why_bad: [
            'Shifts load to lower back dangerously',
            'Reduces quad/glute usage',
            'Less weight you can handle',
            'Harder to hit depth',
          ],
          causes: [
            'Weak quads relative to posterior chain',
            'Poor core bracing',
            'Starting position - hips too low',
            'Bar position - too low causes forward lean',
            'Trying to use hips to "cheat" the weight',
          ],
          fixes: [
            {
              immediate: 'Cue "chest up" or "lead with chest"',
              short_term: [
                'Front squats - forces upright torso',
                'Tempo squats (3-0-3) - control the pattern',
                'Lower the weight - groove pattern correctly',
                'Film side view every set',
              ],
              long_term: [
                'Build quads: front squats, leg press, split squats',
                'Core work: planks, ab wheel, carries',
                'Fix bar position if too low',
                'Consider higher bar position if extreme',
              ],
            },
          ],
          film_angle: 'Side view, see hip and chest relationship',
        },
        {
          flaw: 'Forward Bar Path / Leaning Forward',
          severity: 'Medium',
          why_bad: [
            'Inefficient - extra distance to move bar',
            'Stresses lower back unnecessarily',
            'Harder to complete lift',
            'Balance issues',
          ],
          causes: [
            'Hips shooting back excessively',
            'Weak quads - can\'t control descent',
            'Poor ankle mobility',
            'Weight on toes not midfoot',
            'Bar too low on back',
          ],
          fixes: [
            {
              immediate: 'Cue "vertical bar path" or "sit down not back"',
              short_term: [
                'Box squats - teaches sitting down not back',
                'Goblet squats - counterbalance teaches pattern',
                'Elevated heels temporarily (plates or oly shoes)',
                'Film side view with vertical reference',
              ],
              long_term: [
                'Ankle mobility work daily',
                'Quad strengthening (see good morning fixes)',
                'Olympic lifting shoes if mobility limited',
                'High bar vs low bar assessment',
              ],
            },
          ],
          film_angle: 'Side view with vertical reference line',
        },
        {
          flaw: 'Not Hitting Depth',
          severity: 'Critical',
          why_bad: [
            'No lift in competition',
            'Not training full ROM',
            'Missing glute development',
            'Building bad habits',
          ],
          causes: [
            'Poor mobility (ankles, hips, t-spine)',
            'Fear of bottom position',
            'Too heavy - ego lifting',
            'Not aware (need to film)',
            'Stance width/toe angle wrong',
          ],
          fixes: [
            {
              immediate: 'Film every set - reality check',
              short_term: [
                'Drop weight 10-20% - hit depth every rep',
                'Pause squats at depth - build confidence',
                'Box squats slightly below parallel',
                'Slow tempo down (3 sec descent)',
              ],
              long_term: [
                'Daily mobility: hip flexor stretch, ankle work, hip 90/90s',
                'Goblet squats as warm-up',
                'Build strength at depth - pause work',
                'Experiment with stance (wider? narrower? toes more out?)',
              ],
            },
          ],
          film_angle: 'Side view at hip level',
        },
        {
          flaw: 'Losing Tightness in Hole',
          severity: 'High',
          why_bad: [
            'Injury risk - spine flexion',
            'Power leak - can\'t drive out of hole',
            'Inconsistent lifts',
          ],
          causes: [
            'Not bracing hard enough',
            'Mobility forces relaxation to hit depth',
            'Weak core can\'t maintain position',
            'Too fast descent - bouncing',
          ],
          fixes: [
            {
              immediate: 'Big breath, HOLD through entire rep',
              short_term: [
                'Pause squats - hold tension at bottom',
                'Tempo work - controlled descent',
                'Lighter weight - perfect reps',
                'Practice bracing with belt',
              ],
              long_term: [
                'Core strengthening: planks, dead bugs, carries',
                'Improve mobility so don\'t need to relax',
                'Build bottom position strength',
                'Practice breathing and bracing daily',
              ],
            },
          ],
          film_angle: 'Side view, watch back angle',
        },
      ],
    },
    bench: {
      name: 'Bench Flaws',
      icon: 'fitness',
      color: 'red',
      flaws: [
        {
          flaw: 'Bar Path Drifts to Belly / Flares Elbows',
          severity: 'High',
          why_bad: [
            'Shoulder injury risk - impingement',
            'Weaker pressing position',
            'Inefficient bar path',
            'Stresses shoulders not chest/triceps',
          ],
          causes: [
            'Flaring elbows too much (90°)',
            'Touching too low on chest',
            'Poor shoulder position - not retracted',
            'Trying to use chest too much',
            'No leg drive - upper body compensates',
          ],
          fixes: [
            {
              immediate: 'Cue "tuck elbows" - aim for 45-75° angle',
              short_term: [
                'Touch higher on chest (nipple line)',
                'Film every set - side view',
                'Practice bar path with lighter weight',
                'Floor press - teaches good elbow position',
              ],
              long_term: [
                'Build triceps: close grip, dips, overhead',
                'Shoulder health work: face pulls, band pull aparts',
                'Perfect setup - retracted scapula every rep',
                'Practice "lift the bar to the rack" path',
              ],
            },
          ],
          film_angle: 'Side view and from head (above)',
        },
        {
          flaw: 'Butt Comes Off Bench',
          severity: 'Critical',
          why_bad: [
            'Automatic DQ in competition',
            'Dangerous for lower back',
            'Inconsistent technique',
          ],
          causes: [
            'Excessive arch attempt',
            'No leg drive control',
            'Exploding up too violently',
            'Weak point - trying to cheat through',
          ],
          fixes: [
            {
              immediate: 'Reduce arch, focus on glutes on bench',
              short_term: [
                'Practice setup with lighter weight',
                'Pause reps - control movement',
                'Film every set',
                'Cue "squeeze glutes INTO bench"',
              ],
              long_term: [
                'Build arch gradually - not forced',
                'Learn proper leg drive (push not lift)',
                'Core work for stability',
                'Address weak points so don\'t need to cheat',
              ],
            },
          ],
          film_angle: 'Side view clearly showing bench contact',
        },
        {
          flaw: 'No Leg Drive',
          severity: 'Medium',
          why_bad: [
            'Missing 20-40 lbs potential',
            'Only using upper body',
            'Less stable',
            'Slower bar speed',
          ],
          causes: [
            'Never learned technique',
            'Feet positioned wrong',
            'Not thinking about it',
            'Weak upper back (can\'t transmit force)',
          ],
          fixes: [
            {
              immediate: 'Cue "push floor away with legs FIRST, then press"',
              short_term: [
                'Pause reps - practice: brace, leg drive, then press',
                'Experiment with foot position',
                'Larsen press (feet up) vs normal - feel difference',
                'Film side view - see body move from leg drive',
              ],
              long_term: [
                'Practice leg drive with light weight until automatic',
                'Upper back work: rows, pull-ups, face pulls',
                'Find optimal foot position for YOUR body',
                'Think: "push yourself into bench" with legs',
              ],
            },
          ],
          film_angle: 'Side view, watch body movement',
        },
        {
          flaw: 'Uneven Press / One Arm Faster',
          severity: 'Medium',
          why_bad: [
            'Can cause DQ if bar tilts',
            'Injury risk - uneven stress',
            'Leaving gains on table',
            'Imbalance gets worse over time',
          ],
          causes: [
            'Strength imbalance',
            'Grip width uneven',
            'Shoulder mobility difference',
            'Uneven setup - one shoulder not retracted',
            'Previous injury compensation',
          ],
          fixes: [
            {
              immediate: 'Check grip - measure from center knurl',
              short_term: [
                'Film from head/feet view - see bar tilt',
                'Dumbbell work - each arm independent',
                'Slow tempo - control both sides',
                'Address setup - both shoulders retracted equally',
              ],
              long_term: [
                'Unilateral work: 1-arm DB press, 1-arm push-ups',
                'Weak side gets extra volume',
                'Mobility work for tight side',
                'May need to correct technique completely',
              ],
            },
          ],
          film_angle: 'From feet or head, see bar level',
        },
        {
          flaw: 'Losing Shoulder Position (Scapula)',
          severity: 'High',
          why_bad: [
            'Shoulder injury risk',
            'Weaker position',
            'Inconsistent technique',
            'Can\'t use lats properly',
          ],
          causes: [
            'Not set up properly initially',
            'Too much weight - can\'t maintain',
            'Weak upper back',
            'Unracking incorrectly',
          ],
          fixes: [
            {
              immediate: 'Perfect setup EVERY rep - don\'t rush',
              short_term: [
                'Lighter weight until automatic',
                'Pin press - practice lockout position',
                'Get lift-off help for heavy sets',
                'Pause at chest - check position maintained',
              ],
              long_term: [
                'Rows, rows, rows - all variations',
                'Face pulls daily',
                'Scapular push-ups',
                'Practice setup with empty bar daily',
              ],
            },
          ],
          film_angle: 'Side view, watch shoulder blade position',
        },
      ],
    },
    deadlift: {
      name: 'Deadlift Flaws',
      icon: 'barbell-outline',
      color: 'emerald',
      flaws: [
        {
          flaw: 'Bar Drifts Away From Body',
          severity: 'Critical',
          why_bad: [
            'Massive efficiency loss',
            'Lower back injury risk',
            'Much heavier feeling',
            'Often causes missed lift',
          ],
          causes: [
            'Hips too low (trying to squat it)',
            'Not engaging lats',
            'Starting with bar too far from shins',
            'Pulling back instead of up',
            'Weak lats can\'t keep bar close',
          ],
          fixes: [
            {
              immediate: 'Cue "drag bar up shins/thighs" or "lats tight"',
              short_term: [
                'Deficit deadlifts - emphasizes start position',
                'Pause just off floor - check bar position',
                'Lighter weight - perfect bar path every rep',
                'Film side view EVERY set',
              ],
              long_term: [
                'Lat work: pull-ups, rows, straight arm pulldowns',
                'RDLs - teaches hinging and bar close',
                'Block pulls - practice lockout with bar close',
                'Cue: "bend the bar around shins"',
              ],
            },
          ],
          film_angle: 'Side view, see bar to body distance',
        },
        {
          flaw: 'Hips Shooting Up First',
          severity: 'High',
          why_bad: [
            'Turns into stiff-leg deadlift',
            'Lower back does all the work',
            'Inefficient',
            'Back injury risk',
          ],
          causes: [
            'Hips set too low to start',
            'Weak quads',
            'Trying to "squat" the deadlift',
            'Poor starting position',
          ],
          fixes: [
            {
              immediate: 'Cue "push floor away" or "leg press the floor"',
              short_term: [
                'Find optimal hip height (higher than you think)',
                'Pause deadlifts off blocks - practice start',
                'Film side view - watch hip and shoulder angles',
                'Slow tempo off floor - control the pull',
              ],
              long_term: [
                'Build quads: squats, front squats, leg press',
                'Practice setup - film and compare hip heights',
                'Accept your leverages - not everyone squats it',
                'Deficit deads if quads are weak off floor',
              ],
            },
          ],
          film_angle: 'Side view, compare shoulder and hip angles',
        },
        {
          flaw: 'Rounded Lower Back',
          severity: 'Critical',
          why_bad: [
            'MAJOR injury risk - disc herniation',
            'Weaker position',
            'Can cause DQ in some feds',
            'Compromises entire lift',
          ],
          causes: [
            'Weak spinal erectors',
            'Poor bracing',
            'Hips too low forcing flexion',
            'Mobility limitation',
            'Too much weight',
          ],
          fixes: [
            {
              immediate: 'Drop weight 20%+ - fix immediately',
              short_term: [
                'Perfect bracing - big breath, push out',
                'RDLs - practice neutral spine hinging',
                'Block pulls - reduce ROM until strong',
                'Film EVERY single rep until fixed',
              ],
              long_term: [
                'Back extensions, reverse hypers',
                'Good mornings (light) - learn neutral spine',
                'Core work: planks, dead bugs',
                'Hip mobility if that\'s limiting',
                'Consider sumo if mobility issue',
              ],
            },
          ],
          film_angle: 'Side view, clearly see spine position',
        },
        {
          flaw: 'Rounded Upper Back (Thoracic)',
          severity: 'Low-Medium',
          why_bad: [
            'Less efficient (debated)',
            'Bar farther from body',
            'Can progress to lower back rounding',
          ],
          note: 'Some rounding okay in max attempts - not same as lower back',
          causes: [
            'Weak upper back',
            'Intentional - some lifters use this',
            'Trying to get closer to bar',
            'Maximal attempts',
          ],
          fixes: [
            {
              immediate: 'Decide if it\'s problem (film and assess)',
              short_term: [
                'If want to fix: lighter weight, cue "chest up"',
                'Rows and pull-ups',
                'Snatch grip deadlifts - forces upper back work',
              ],
              long_term: [
                'Massive upper back volume: rows, pull-ups, shrugs',
                'Face pulls and rear delt work',
                'May be fine - many elite lifters have some rounding',
                'Just keep LOWER back neutral',
              ],
            },
          ],
          film_angle: 'Side view, distinguish upper vs lower back',
        },
        {
          flaw: 'Hitching / Ramping',
          severity: 'Critical',
          why_bad: [
            'Automatic DQ in competition',
            'Means you can\'t complete the lift properly',
            'Dangerous for back',
          ],
          causes: [
            'Weak lockout',
            'Bar too far from body mid-pull',
            'Trying weight you can\'t actually lift',
            'Poor leverages for conventional',
          ],
          fixes: [
            {
              immediate: 'Don\'t do it - develop bad habit',
              short_term: [
                'Drop weight to what you can lock out clean',
                'Block/rack pulls - build lockout strength',
                'Paused deadlifts at knee - practice smooth through',
                'Film every set - catch early',
              ],
              long_term: [
                'Lockout work: block pulls, reverse bands',
                'Glute and upper back strengthening',
                'Practice bar path - keep it close',
                'Consider sumo if consistent issue',
              ],
            },
          ],
          film_angle: 'Side view, see entire ascent clearly',
        },
        {
          flaw: 'Soft Lockout / Not Finishing',
          severity: 'Medium',
          why_bad: [
            'No light in competition',
            'Missing glute development',
            'Leaving weight on platform',
          ],
          causes: [
            'Weak glutes',
            'Don\'t know what full lockout feels like',
            'Fatigue',
            'Poor hip extension pattern',
          ],
          fixes: [
            {
              immediate: 'Cue "squeeze glutes" or "hips through"',
              short_term: [
                'Pauses at lockout - hold 2 seconds',
                'Film from side - see hip position',
                'Practice with lighter weight - exaggerate lockout',
                'Romanian deadlifts - teaches hip hinge',
              ],
              long_term: [
                'Glute work: hip thrusts, glute bridges, KB swings',
                'Lockout holds - heavy supramaximal',
                'Practice standing tall daily (posture)',
                'Block pulls with perfect lockout',
              ],
            },
          ],
          film_angle: 'Side view, see hip extension',
        },
      ],
    },
  };

  const currentLift = flawData[selectedLift as keyof typeof flawData];

  const getSeverityColor = (severity: string) => {
    if (severity.includes('Critical')) return 'bg-red-500';
    if (severity.includes('High')) return 'bg-orange-500';
    if (severity.includes('Medium')) return 'bg-amber-500';
    return 'bg-blue-500';
  };

  const getColorClass = (color: string) => {
    const colors: { [key: string]: string } = {
      blue: 'bg-blue-500',
      red: 'bg-red-500',
      emerald: 'bg-emerald-500',
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
            Common Technical Flaws
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          <View className="bg-gradient-to-r from-red-500 to-orange-500 rounded-xl p-6 mb-6">
            <Text className="text-white text-2xl font-bold mb-2">Identify & Fix</Text>
            <Text className="text-white opacity-90">
              Database of common errors and solutions
            </Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6">
            <View className="flex-row gap-3 px-1">
              {Object.entries(flawData).map(([key, lift]) => (
                <TouchableOpacity
                  key={key}
                  onPress={() => setSelectedLift(key)}
                  className={`${
                    selectedLift === key 
                      ? getColorClass(lift.color)
                      : 'bg-zinc-900'
                  } rounded-xl p-4 border ${
                    selectedLift === key 
                      ? 'border-white/30'
                      : 'border-zinc-800'
                  } min-w-[160px]`}
                >
                  <Ionicons 
                    name={lift.icon as any} 
                    size={32} 
                    color={selectedLift === key ? 'white' : '#a1a1aa'} 
                  />
                  <Text className={`${selectedLift === key ? 'text-white' : 'text-zinc-400'} font-bold mt-2`}>
                    {lift.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          {currentLift.flaws.map((flaw, idx) => (
            <View key={idx} className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
              <View className="flex-row items-start justify-between mb-4">
                <Text className="text-white text-xl font-bold flex-1">{flaw.flaw}</Text>
                <View className={`${getSeverityColor(flaw.severity)} rounded-full px-3 py-1 ml-2`}>
                  <Text className="text-white text-xs font-bold">{flaw.severity}</Text>
                </View>
              </View>

              <View className="bg-red-500/10 rounded-xl p-4 border border-red-500/30 mb-4">
                <Text className="text-red-400 font-bold mb-2">Why It's Bad:</Text>
                {flaw.why_bad.map((reason, rIdx) => (
                  <Text key={rIdx} className="text-red-300 text-sm mb-1">• {reason}</Text>
                ))}
              </View>

              <View className="bg-amber-500/10 rounded-xl p-4 border border-amber-500/30 mb-4">
                <Text className="text-amber-400 font-bold mb-2">Common Causes:</Text>
                {flaw.causes.map((cause, cIdx) => (
                  <Text key={cIdx} className="text-amber-300 text-sm mb-1">• {cause}</Text>
                ))}
              </View>

              {flaw.note && (
                <View className="bg-blue-500/10 rounded-xl p-4 border border-blue-500/30 mb-4">
                  <Text className="text-blue-400 font-bold mb-1">Note:</Text>
                  <Text className="text-blue-300 text-sm">{flaw.note}</Text>
                </View>
              )}

              <View className="bg-emerald-500/10 rounded-xl p-4 border border-emerald-500/30 mb-4">
                <Text className="text-emerald-400 font-bold text-lg mb-3">How to Fix:</Text>
                
                {flaw.fixes.map((fix, fIdx) => (
                  <View key={fIdx}>
                    <View className="mb-3">
                      <Text className="text-emerald-400 font-bold mb-2">Immediate (Today):</Text>
                      <Text className="text-emerald-300 text-sm">{fix.immediate}</Text>
                    </View>

                    <View className="mb-3">
                      <Text className="text-blue-400 font-bold mb-2">Short-term (This Week/Month):</Text>
                      {fix.short_term.map((action, aIdx) => (
                        <Text key={aIdx} className="text-blue-300 text-sm mb-1">• {action}</Text>
                      ))}
                    </View>

                    <View>
                      <Text className="text-purple-400 font-bold mb-2">Long-term (Build Foundation):</Text>
                      {fix.long_term.map((action, aIdx) => (
                        <Text key={aIdx} className="text-purple-300 text-sm mb-1">• {action}</Text>
                      ))}
                    </View>
                  </View>
                ))}
              </View>

              <View className="bg-cyan-500/10 rounded-xl p-3 border border-cyan-500/30">
                <View className="flex-row items-center">
                  <Ionicons name="videocam" size={16} color="#22d3ee" />
                  <Text className="text-cyan-400 font-bold ml-2">Film Angle:</Text>
                </View>
                <Text className="text-cyan-300 text-sm mt-1">{flaw.film_angle}</Text>
              </View>
            </View>
          ))}

          <View className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl p-5 border border-purple-500/30 mb-6">
            <Text className="text-purple-400 font-bold text-lg mb-3">General Principles</Text>
            <Text className="text-purple-300 text-sm mb-2">
              • Film yourself - you can't fix what you don't see
            </Text>
            <Text className="text-purple-300 text-sm mb-2">
              • Fix ONE issue at a time - don't overwhelm
            </Text>
            <Text className="text-purple-300 text-sm mb-2">
              • Drop weight if needed - ego < technique
            </Text>
            <Text className="text-purple-300 text-sm mb-2">
              • Address root cause, not just symptom
            </Text>
            <Text className="text-purple-300 text-sm">
              • Be patient - motor patterns take time to change
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
