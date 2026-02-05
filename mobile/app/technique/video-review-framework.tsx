import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function VideoReviewFramework() {
  const [selectedAspect, setSelectedAspect] = useState('setup');

  const reviewData = {
    setup: {
      name: 'Recording Setup',
      icon: 'videocam',
      color: 'blue',
      equipment: {
        title: 'What You Need',
        minimal: [
          'Smartphone camera (good enough for most)',
          'Something to prop phone (squat rack, friend)',
          'Good lighting (see the bar clearly)',
        ],
        better: [
          'Tripod or phone mount ($15-30)',
          'External light if gym is dark',
          'Multiple angles possible',
        ],
        best: [
          'Tablet for larger screen review',
          'Slow-motion capable camera',
          'Coach Analysis app',
        ],
      },
      angles: {
        squat: [
          {
            angle: 'Side view (90°)',
            importance: 'Critical',
            shows: 'Depth, bar path, back angle, knee travel',
            distance: '10-15 feet away, waist height',
          },
          {
            angle: 'Front view (45°)',
            importance: 'High',
            shows: 'Knee valgus/varus, walkout, stance symmetry',
            distance: '10 feet away, waist height',
          },
          {
            angle: 'Back view',
            importance: 'Medium',
            shows: 'Bar position, upper back tightness',
            distance: '10 feet away, shoulder height',
          },
        ],
        bench: [
          {
            angle: 'Side view (90°)',
            importance: 'Critical',
            shows: 'Bar path, arch, leg drive timing',
            distance: '8-10 feet away, bench height',
          },
          {
            angle: 'Feet view (from feet)',
            importance: 'High',
            shows: 'Leg drive, full setup, unrack path',
            distance: '6-8 feet from feet, bench height',
          },
          {
            angle: 'Head view (from above)',
            importance: 'Medium',
            shows: 'Bar path, forearm angle, shoulder position',
            distance: 'Overhead if possible',
          },
        ],
        deadlift: [
          {
            angle: 'Side view (90°)',
            importance: 'Critical',
            shows: 'Back angle, bar path, hip position, lockout',
            distance: '10-15 feet away, mid-thigh height',
          },
          {
            angle: 'Front view (45°)',
            importance: 'High',
            shows: 'Bar position over feet, symmetry, grip',
            distance: '10 feet away, knee height',
          },
        ],
      },
      tips: [
        'Film warm-ups AND work sets (fatigue reveals issues)',
        'Use slow motion (240fps if available)',
        'Keep phone steady - no hand-holding',
        'Full body in frame, not just torso',
        'Consistent camera position each session',
        'Film ALL sets if learning - patterns emerge',
      ],
    },
    analysis: {
      name: 'Analysis Process',
      icon: 'search',
      color: 'emerald',
      immediate: {
        title: 'Right After Set',
        steps: [
          'Quick watch at normal speed - did it feel how it looked?',
          'Note immediate red flags (obvious issues)',
          'Don\'t overthink - just quick check',
          'If something major, address before next set',
        ],
        questions: [
          'Did the bar move how I thought?',
          'Was depth good? (squat)',
          'Did I hit positions? (deadlift)',
          'Any obvious asymmetry?',
        ],
      },
      detailed: {
        title: 'Post-Session Deep Dive',
        process: [
          {
            step: '1. Watch Full Speed First',
            purpose: 'Get overall impression, how it felt vs looked',
            note: 'Don\'t analyze yet, just watch',
          },
          {
            step: '2. Slow Motion Analysis',
            purpose: 'Catch details you miss at full speed',
            focus: 'Key positions: setup, descent, bottom, ascent',
          },
          {
            step: '3. Pause at Critical Points',
            purpose: 'Study positions in detail',
            points: 'Setup, bottom, sticking point, lockout',
          },
          {
            step: '4. Compare Sets',
            purpose: 'See how technique changes under fatigue',
            compare: 'Set 1 vs Set 5 - what changed?',
          },
          {
            step: '5. Note Patterns',
            purpose: 'One bad rep = accident. Every rep = pattern.',
            track: 'Write down consistent issues',
          },
        ],
      },
      checklist: {
        title: 'Video Review Checklist',
        general: [
          'Bar path - vertical as possible',
          'Speed - consistent or slowing',
          'Symmetry - even on both sides',
          'Positions - hitting key points',
          'Timing - proper sequencing',
        ],
        compare: [
          'This week vs last week',
          'Heavy sets vs light sets',
          'Fresh vs fatigued',
          'Good lifts vs missed lifts',
        ],
      },
    },
    cues: {
      name: 'Finding Your Cues',
      icon: 'bulb',
      color: 'purple',
      process: {
        title: 'Discovering What Works',
        steps: [
          {
            step: 'Identify the Problem',
            method: 'Video shows what\'s wrong',
            example: 'Video shows hips shooting up in squat',
          },
          {
            step: 'Hypothesis',
            method: 'What might fix it?',
            example: 'Maybe "chest up" or "spread floor" will help',
          },
          {
            step: 'Test One Cue',
            method: 'Film with new cue',
            example: 'Next set: focus only on "chest up"',
          },
          {
            step: 'Review Result',
            method: 'Did it work? Video proof.',
            example: 'Compare before/after with cue',
          },
          {
            step: 'Keep or Discard',
            method: 'If works, keep. If not, try different cue.',
            example: 'Chest up didn\'t work? Try "drive back into bar"',
          },
        ],
      },
      examples: {
        squat: [
          {
            problem: 'Knees caving in',
            cues_to_try: [
              '"Spread the floor"',
              '"Knees out"',
              '"Screw feet into ground"',
            ],
            film: 'Front 45° angle to see knees',
          },
          {
            problem: 'Good morning squat',
            cues_to_try: [
              '"Chest up"',
              '"Drive back into bar"',
              '"Elbows under bar"',
            ],
            film: 'Side view to see hip/chest ratio',
          },
          {
            problem: 'Forward bar path',
            cues_to_try: [
              '"Sit back"',
              '"Push through heels"',
              '"Stay on midfoot"',
            ],
            film: 'Side view, watch bar relative to feet',
          },
        ],
        bench: [
          {
            problem: 'Bar drifting to belly',
            cues_to_try: [
              '"Touch higher on chest"',
              '"Drive bar back to rack"',
              '"Push up and back"',
            ],
            film: 'Side view, bar path',
          },
          {
            problem: 'No leg drive',
            cues_to_try: [
              '"Push floor away with legs"',
              '"Drive traps into bench"',
              '"Leg drive first, then press"',
            ],
            film: 'Side view, watch body movement',
          },
        ],
        deadlift: [
          {
            problem: 'Bar drifting forward',
            cues_to_try: [
              '"Pull bar into shins"',
              '"Lats tight, bar close"',
              '"Drag bar up body"',
            ],
            film: 'Side view, bar to shin distance',
          },
          {
            problem: 'Hips shooting up',
            cues_to_try: [
              '"Chest up first"',
              '"Push floor away"',
              '"Hips and chest rise together"',
            ],
            film: 'Side view, hip and shoulder angles',
          },
        ],
      },
      testing: {
        title: 'Systematic Cue Testing',
        protocol: [
          'Pick ONE issue to fix at a time',
          'Test one cue per session (or per week)',
          'Film before and after',
          'Give cue 3-4 sets to see if it helps',
          'If not working by set 4, probably not your cue',
          'Keep log of what works and doesn\'t',
        ],
      },
    },
    tracking: {
      name: 'Progress Tracking',
      icon: 'trending-up',
      color: 'amber',
      what_to_save: {
        title: 'What Videos to Keep',
        keep: [
          'PRs and big lifts (motivation)',
          'Before/after fixing technique issue',
          'Monthly form checks (same weight)',
          'Failed attempts (learn from)',
          'Meet lifts (all 9 attempts)',
        ],
        can_delete: [
          'Random warm-up sets',
          'Duplicate angles same session',
          'Blurry or bad camera position videos',
        ],
      },
      organization: {
        title: 'Organizing Videos',
        folders: [
          'By lift: Squat / Bench / Deadlift',
          'By date: 2025-01 / 2025-02 / etc',
          'Special: PRs / Meets / Form Issues',
        ],
        naming: [
          'Include date: 2025-01-15',
          'Include lift and weight: Squat-405',
          'Include reps: x3 or x1',
          'Example: 2025-01-15_Squat_405x3_side',
        ],
      },
      comparison: {
        title: 'Progress Comparison',
        monthly: [
          'Pick same weight (e.g., 80%)',
          'Film same angle',
          'Compare month to month',
          'Look for: smoother bar path, better positions, faster speed',
        ],
        pr_progression: [
          'Keep all PR attempts',
          'Watch how technique changes as weight increases',
          'See what breaks down first',
          'Identify weak point patterns',
        ],
      },
      journaling: {
        title: 'Video Journal',
        what_to_note: [
          'Date and session',
          'Weight and reps',
          'What you noticed in video',
          'Cues you used',
          'What worked / didn\'t work',
          'Plan for next session',
        ],
        example: [
          'Date: Jan 15, 2025',
          'Squat: 405x3',
          'Noticed: Slight knee cave on rep 3',
          'Cue used: "Spread floor"',
          'Result: Better but still there when fatigued',
          'Next: Try "knees out" cue, see if clearer',
        ],
      },
    },
    common_mistakes: {
      name: 'Analysis Mistakes',
      icon: 'warning',
      color: 'red',
      errors: [
        {
          mistake: 'Overanalyzing Every Rep',
          problem: 'Paralysis by analysis - can\'t train, only analyze',
          fix: [
            'Detailed review 1-2x per week max',
            'Quick checks during session okay',
            'Focus on patterns, not individual reps',
          ],
        },
        {
          mistake: 'Changing Too Much at Once',
          problem: 'Can\'t tell what actually helped',
          fix: [
            'Change ONE thing at a time',
            'Give changes 2-3 weeks to work',
            'Track what you change',
          ],
        },
        {
          mistake: 'Comparing to Elite Lifters',
          problem: 'Your leverages and style may be different',
          fix: [
            'Compare to YOUR previous videos',
            'Learn principles from elites, not exact copy',
            'Your technique should fit YOUR body',
          ],
        },
        {
          mistake: 'Only Filming Good Lifts',
          problem: 'Learn more from struggles',
          fix: [
            'Film failed attempts',
            'Film when fatigued',
            'Film bad days - what changed?',
          ],
        },
        {
          mistake: 'Ignoring Feel',
          problem: 'Video doesn\'t show everything (pain, effort, etc)',
          fix: [
            'Consider: how did it FEEL?',
            'Video + Feel = complete picture',
            'If looks good but feels terrible, investigate',
          ],
        },
        {
          mistake: 'Not Filming Regularly',
          problem: 'Can\'t track progress or catch developing issues',
          fix: [
            'Film at least 1x per week per lift',
            'More often when fixing technique',
            'Consistent filming = better data',
          ],
        },
      ],
    },
    tools: {
      name: 'Helpful Tools',
      icon: 'construct',
      color: 'cyan',
      apps: {
        title: 'Video Analysis Apps',
        free: [
          {
            name: 'Coach\'s Eye',
            features: [
              'Slow motion playback',
              'Drawing tools (lines, angles)',
              'Side-by-side comparison',
              'Voice-over notes',
            ],
            platforms: 'iOS, Android',
          },
          {
            name: 'Hudl Technique',
            features: [
              'Free for athletes',
              'Compare videos',
              'Slow motion',
              'Share with coach',
            ],
            platforms: 'iOS, Android',
          },
        ],
        paid: [
          {
            name: 'Dartfish',
            cost: '$$$',
            features: [
              'Professional analysis',
              'Advanced drawing tools',
              'Detailed metrics',
            ],
            worth_it: 'Only if serious competitor or coach',
          },
        ],
        simple: [
          'Built-in phone camera slow-mo (works fine)',
          'YouTube - upload unlisted for storage',
          'Google Drive / Dropbox - cloud storage',
        ],
      },
      techniques: {
        title: 'Analysis Techniques',
        methods: [
          {
            technique: 'Frame-by-Frame',
            how: 'Pause and advance frame by frame',
            when: 'Studying specific positions',
            tip: 'Most video apps support this',
          },
          {
            technique: 'Drawing Lines',
            how: 'Draw vertical line for bar path',
            when: 'Checking bar path verticality',
            tip: 'Coach\'s Eye makes this easy',
          },
          {
            technique: 'Side-by-Side',
            how: 'Compare two videos simultaneously',
            when: 'Before/after technique change',
            tip: 'Hudl Technique or Coach\'s Eye',
          },
          {
            technique: 'Loop Replay',
            how: 'Set video to repeat critical part',
            when: 'Studying specific phase (bottom, lockout)',
            tip: 'Most apps have this feature',
          },
        ],
      },
    },
  };

  const currentAspect = reviewData[selectedAspect as keyof typeof reviewData];

  const getColorClass = (color: string) => {
    const colors: { [key: string]: string } = {
      blue: 'bg-primary',
      emerald: 'bg-primary',
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
            Video Review Framework
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          <View className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl p-6 mb-6">
            <Text className="text-white text-2xl font-bold mb-2">Self-Analysis</Text>
            <Text className="text-white opacity-90">
              Master video review for continuous improvement
            </Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6">
            <View className="flex-row gap-3 px-1">
              {Object.entries(reviewData).map(([key, aspect]) => (
                <TouchableOpacity
                  key={key}
                  onPress={() => setSelectedAspect(key)}
                  className={`${
                    selectedAspect === key 
                      ? getColorClass(aspect.color)
                      : 'bg-zinc-900'
                  } rounded-xl p-4 border ${
                    selectedAspect === key 
                      ? 'border-white/30'
                      : 'border-zinc-800'
                  } min-w-[180px]`}
                >
                  <Ionicons 
                    name={aspect.icon as any} 
                    size={32} 
                    color={selectedAspect === key ? 'white' : '#a1a1aa'} 
                  />
                  <Text className={`${selectedAspect === key ? 'text-white' : 'text-zinc-400'} font-bold mt-2`}>
                    {aspect.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          {selectedAspect === 'setup' && (
            <View>
              <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
                <Text className="text-primary/80 text-xl font-bold mb-4">{currentAspect.equipment?.title}</Text>
                
                <View className="mb-4">
                  <Text className="text-primary font-bold mb-2">Minimal Setup:</Text>
                  {currentAspect.equipment?.minimal.map((item: string, idx: number) => (
                    <Text key={idx} className="text-primary/80 text-sm mb-1">✓ {item}</Text>
                  ))}
                </View>

                <View className="mb-4">
                  <Text className="text-primary/80 font-bold mb-2">Better Setup:</Text>
                  {currentAspect.equipment?.better.map((item: string, idx: number) => (
                    <Text key={idx} className="text-primary/60 text-sm mb-1">+ {item}</Text>
                  ))}
                </View>

                <View>
                  <Text className="text-purple-400 font-bold mb-2">Best Setup:</Text>
                  {currentAspect.equipment?.best.map((item: string, idx: number) => (
                    <Text key={idx} className="text-purple-300 text-sm mb-1">â­ {item}</Text>
                  ))}
                </View>
              </View>

              {Object.entries(currentAspect.angles || {}).map(([lift, angles]: [string, any]) => (
                <View key={lift} className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
                  <Text className="text-white text-xl font-bold mb-4 capitalize">{lift} Angles</Text>
                  {angles.map((angle: any, idx: number) => (
                    <View key={idx} className="bg-zinc-800 rounded-xl p-4 mb-3 last:mb-0">
                      <View className="flex-row items-center justify-between mb-2">
                        <Text className="text-white font-bold">{angle.angle}</Text>
                        <View className={`${
                          angle.importance === 'Critical' ? 'bg-red-500' :
                          angle.importance === 'High' ? 'bg-amber-500' : 'bg-primary'
                        } rounded-full px-3 py-1`}>
                          <Text className="text-white text-xs font-bold">{angle.importance}</Text>
                        </View>
                      </View>
                      <Text className="text-primary text-sm mb-1">Shows: {angle.shows}</Text>
                      <Text className="text-primary/80 text-sm">Setup: {angle.distance}</Text>
                    </View>
                  ))}
                </View>
              ))}

              <View className="bg-primary/10 rounded-xl p-5 border border-primary/30 mb-6">
                <Text className="text-primary/80 font-bold text-lg mb-3">Filming Tips:</Text>
                {currentAspect.tips?.map((tip: string, idx: number) => (
                  <Text key={idx} className="text-primary/60 text-sm mb-1">• {tip}</Text>
                ))}
              </View>
            </View>
          )}

          {selectedAspect === 'analysis' && (
            <View>
              <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
                <Text className="text-primary text-xl font-bold mb-4">{currentAspect.immediate?.title}</Text>
                
                <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-4">
                  <Text className="text-primary font-bold mb-2">Steps:</Text>
                  {currentAspect.immediate?.steps.map((step: string, idx: number) => (
                    <Text key={idx} className="text-primary/80 text-sm mb-1">{idx + 1}. {step}</Text>
                  ))}
                </View>

                <View className="bg-primary/10 rounded-xl p-4 border border-primary/30">
                  <Text className="text-primary/80 font-bold mb-2">Quick Questions:</Text>
                  {currentAspect.immediate?.questions.map((q: string, idx: number) => (
                    <Text key={idx} className="text-primary/60 text-sm mb-1">• {q}</Text>
                  ))}
                </View>
              </View>

              <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
                <Text className="text-purple-400 text-xl font-bold mb-4">{currentAspect.detailed?.title}</Text>
                {currentAspect.detailed?.process.map((item: any, idx: number) => (
                  <View key={idx} className="bg-purple-500/10 rounded-xl p-4 border border-purple-500/30 mb-3 last:mb-0">
                    <Text className="text-purple-400 font-bold mb-1">{item.step}</Text>
                    <Text className="text-purple-300 text-sm mb-1">Purpose: {item.purpose}</Text>
                    {item.note && <Text className="text-zinc-400 text-sm mb-1">Note: {item.note}</Text>}
                    {item.focus && <Text className="text-primary/80 text-sm mb-1">Focus: {item.focus}</Text>}
                    {item.points && <Text className="text-primary text-sm mb-1">Points: {item.points}</Text>}
                    {item.compare && <Text className="text-amber-400 text-sm mb-1">Compare: {item.compare}</Text>}
                    {item.track && <Text className="text-red-400 text-sm">Track: {item.track}</Text>}
                  </View>
                ))}
              </View>

              <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
                <Text className="text-amber-400 text-xl font-bold mb-4">{currentAspect.checklist?.title}</Text>
                
                <View className="mb-4">
                  <Text className="text-white font-bold mb-2">General:</Text>
                  {currentAspect.checklist?.general.map((item: string, idx: number) => (
                    <Text key={idx} className="text-zinc-300 text-sm mb-1">â–¡ {item}</Text>
                  ))}
                </View>

                <View>
                  <Text className="text-white font-bold mb-2">Comparisons:</Text>
                  {currentAspect.checklist?.compare.map((item: string, idx: number) => (
                    <Text key={idx} className="text-zinc-300 text-sm mb-1">â–¡ {item}</Text>
                  ))}
                </View>
              </View>
            </View>
          )}

          {selectedAspect === 'cues' && (
            <View>
              <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
                <Text className="text-purple-400 text-xl font-bold mb-4">{currentAspect.process?.title}</Text>
                {currentAspect.process?.steps.map((step: any, idx: number) => (
                  <View key={idx} className="bg-zinc-800 rounded-xl p-4 mb-3 last:mb-0">
                    <Text className="text-white font-bold mb-2">{step.step}</Text>
                    <Text className="text-primary/80 text-sm mb-1">Method: {step.method}</Text>
                    <Text className="text-primary text-sm">Example: {step.example}</Text>
                  </View>
                ))}
              </View>

              {Object.entries(currentAspect.examples || {}).map(([lift, problems]: [string, any]) => (
                <View key={lift} className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
                  <Text className="text-white text-xl font-bold mb-4 capitalize">{lift} Cue Examples</Text>
                  {problems.map((prob: any, idx: number) => (
                    <View key={idx} className="bg-purple-500/10 rounded-xl p-4 border border-purple-500/30 mb-4 last:mb-0">
                      <Text className="text-red-400 font-bold mb-2">Problem: {prob.problem}</Text>
                      <View className="mb-2">
                        <Text className="text-primary font-bold text-sm mb-1">Cues to Try:</Text>
                        {prob.cues_to_try.map((cue: string, cIdx: number) => (
                          <Text key={cIdx} className="text-primary/80 text-sm mb-1">• {cue}</Text>
                        ))}
                      </View>
                      <Text className="text-primary/80 text-sm">Film: {prob.film}</Text>
                    </View>
                  ))}
                </View>
              ))}

              <View className="bg-amber-500/10 rounded-xl p-5 border border-amber-500/30 mb-6">
                <Text className="text-amber-400 font-bold text-lg mb-3">{currentAspect.testing?.title}</Text>
                {currentAspect.testing?.protocol.map((item: string, idx: number) => (
                  <Text key={idx} className="text-amber-300 text-sm mb-1">• {item}</Text>
                ))}
              </View>
            </View>
          )}

          {selectedAspect === 'tracking' && (
            <View>
              {Object.entries(currentAspect).filter(([key]) => !['name', 'icon', 'color'].includes(key)).map(([key, section]: [string, any]) => (
                <View key={key} className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
                  <Text className="text-amber-400 text-xl font-bold mb-4">{section.title}</Text>

                  {section.keep && (
                    <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-3">
                      <Text className="text-primary font-bold mb-2">Keep:</Text>
                      {section.keep.map((item: string, idx: number) => (
                        <Text key={idx} className="text-primary/80 text-sm mb-1">✓ {item}</Text>
                      ))}
                    </View>
                  )}

                  {section.can_delete && (
                    <View className="bg-red-500/10 rounded-xl p-4 border border-red-500/30 mb-3">
                      <Text className="text-red-400 font-bold mb-2">Can Delete:</Text>
                      {section.can_delete.map((item: string, idx: number) => (
                        <Text key={idx} className="text-red-300 text-sm mb-1">• {item}</Text>
                      ))}
                    </View>
                  )}

                  {section.folders && (
                    <View className="mb-3">
                      <Text className="text-white font-bold mb-2">Folder Structure:</Text>
                      {section.folders.map((folder: string, idx: number) => (
                        <Text key={idx} className="text-zinc-300 text-sm mb-1">ðŸ“ {folder}</Text>
                      ))}
                    </View>
                  )}

                  {section.naming && (
                    <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-3">
                      <Text className="text-primary/80 font-bold mb-2">File Naming:</Text>
                      {section.naming.map((name: string, idx: number) => (
                        <Text key={idx} className="text-primary/60 text-sm mb-1">• {name}</Text>
                      ))}
                    </View>
                  )}

                  {section.monthly && section.monthly.map((item: string, idx: number) => (
                    <Text key={idx} className="text-zinc-300 text-sm mb-2">• {item}</Text>
                  ))}

                  {section.pr_progression && section.pr_progression.map((item: string, idx: number) => (
                    <Text key={idx} className="text-zinc-300 text-sm mb-2">• {item}</Text>
                  ))}

                  {section.what_to_note && (
                    <View className="bg-purple-500/10 rounded-xl p-4 border border-purple-500/30 mb-3">
                      <Text className="text-purple-400 font-bold mb-2">What to Note:</Text>
                      {section.what_to_note.map((note: string, idx: number) => (
                        <Text key={idx} className="text-purple-300 text-sm mb-1">• {note}</Text>
                      ))}
                    </View>
                  )}

                  {section.example && (
                    <View className="bg-zinc-800 rounded-xl p-4">
                      <Text className="text-primary font-bold mb-2">Example Entry:</Text>
                      {section.example.map((line: string, idx: number) => (
                        <Text key={idx} className="text-zinc-300 text-sm mb-1">{line}</Text>
                      ))}
                    </View>
                  )}
                </View>
              ))}
            </View>
          )}

          {selectedAspect === 'common_mistakes' && (
            <View>
              {currentAspect.errors?.map((error: any, idx: number) => (
                <View key={idx} className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
                  <Text className="text-red-400 text-xl font-bold mb-3">{error.mistake}</Text>
                  
                  <View className="bg-red-500/10 rounded-xl p-4 border border-red-500/30 mb-3">
                    <Text className="text-red-400 font-bold mb-1">Problem:</Text>
                    <Text className="text-red-300 text-sm">{error.problem}</Text>
                  </View>

                  <View className="bg-primary/10 rounded-xl p-4 border border-primary/30">
                    <Text className="text-primary font-bold mb-2">Fix:</Text>
                    {error.fix.map((solution: string, fIdx: number) => (
                      <Text key={fIdx} className="text-primary/80 text-sm mb-1">✓ {solution}</Text>
                    ))}
                  </View>
                </View>
              ))}
            </View>
          )}

          {selectedAspect === 'tools' && (
            <View>
              <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
                <Text className="text-cyan-400 text-xl font-bold mb-4">{currentAspect.apps?.title}</Text>
                
                <Text className="text-primary font-bold mb-3">Free Options:</Text>
                {currentAspect.apps?.free.map((app: any, idx: number) => (
                  <View key={idx} className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-3">
                    <Text className="text-primary font-bold mb-2">{app.name}</Text>
                    <Text className="text-primary/80 text-sm mb-2">Platforms: {app.platforms}</Text>
                    <Text className="text-zinc-400 text-sm mb-1">Features:</Text>
                    {app.features.map((feature: string, fIdx: number) => (
                      <Text key={fIdx} className="text-zinc-300 text-sm mb-1">• {feature}</Text>
                    ))}
                  </View>
                ))}

                <Text className="text-primary/80 font-bold mb-3 mt-4">Simple Solutions:</Text>
                {currentAspect.apps?.simple.map((solution: string, idx: number) => (
                  <Text key={idx} className="text-primary/60 text-sm mb-1">• {solution}</Text>
                ))}
              </View>

              <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
                <Text className="text-cyan-400 text-xl font-bold mb-4">{currentAspect.techniques?.title}</Text>
                {currentAspect.techniques?.methods.map((method: any, idx: number) => (
                  <View key={idx} className="bg-cyan-500/10 rounded-xl p-4 border border-cyan-500/30 mb-3 last:mb-0">
                    <Text className="text-cyan-400 font-bold mb-2">{method.technique}</Text>
                    <Text className="text-zinc-300 text-sm mb-1">How: {method.how}</Text>
                    <Text className="text-primary/80 text-sm mb-1">When: {method.when}</Text>
                    <Text className="text-primary text-sm">Tip: {method.tip}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          <View className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl p-5 border border-primary/30 mb-6">
            <Text className="text-primary/80 font-bold text-lg mb-3">Key Principles</Text>
            <Text className="text-primary/60 text-sm mb-2">
              • Film consistently - data beats guessing
            </Text>
            <Text className="text-primary/60 text-sm mb-2">
              • Compare to YOURSELF, not others
            </Text>
            <Text className="text-primary/60 text-sm mb-2">
              • One issue at a time - systematic improvement
            </Text>
            <Text className="text-primary/60 text-sm">
              • Video shows truth - feel can be deceiving
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}


