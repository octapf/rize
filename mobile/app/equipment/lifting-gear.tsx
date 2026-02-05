import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function EquipmentGuide() {
  const [selectedType, setSelectedType] = useState('essential');

  const equipmentData = {
    essential: {
      name: 'Essential Equipment',
      icon: 'fitness',
      color: 'emerald',
      items: [
        {
          name: 'Lifting Belt',
          when: 'Sets above 80% 1RM',
          why: [
            'Increases intra-abdominal pressure',
            'Provides external cue for bracing',
            'Supports spine during heavy loads',
            'Can add 5-15% to max lifts',
            'Reduces injury risk when used properly',
          ],
          types: [
            { type: 'Powerlifting Belt', width: '4 inches (10cm) all around', best: 'Squat, deadlift max strength', thickness: '10-13mm leather' },
            { type: 'Tapered Belt', width: '4" back, 2-3" front', best: 'Olympic lifts, comfort', thickness: '6-10mm leather' },
            { type: 'Velcro Belt', width: 'Variable', best: 'Beginners, quick on/off', thickness: '4-6mm nylon' },
          ],
          sizing: 'Measure waist at belly button, add 2-3 inches',
          usage: [
            'Only for heavy sets (80%+ 1RM)',
            'Don\'t rely on it - still brace properly',
            'Wear tight but not restricting breathing',
            'Position 1-2" above hip bone',
            'Breathe and brace THEN tighten',
          ],
          recommended: 'Pioneer, Inzer, SBD - $80-150',
        },
        {
          name: 'Lifting Shoes',
          when: 'Squatting or Olympic lifting',
          why: [
            'Raised heel improves ankle mobility',
            'Solid base for force production',
            'Metatarsal strap locks foot down',
            'Non-compressible sole (vs running shoes)',
            'Can add depth to squat',
          ],
          types: [
            { type: 'Olympic Lifting Shoes', width: '0.75-1" heel', best: 'Squats, Oly lifts', thickness: 'Hard plastic/wood' },
            { type: 'Powerlifting Shoes', width: '0.5-0.75" heel', best: 'Squat-focused', thickness: 'Hard sole' },
            { type: 'Chuck Taylors/Flat', width: 'Zero drop', best: 'Deadlift, bench', thickness: 'Minimal cushion' },
          ],
          sizing: 'True to size, should feel snug',
          usage: [
            'Squat: Raised heel shoes',
            'Deadlift: Flat sole (Chucks, Vans, or socks)',
            'Bench: Flat sole for leg drive',
            'Never use running shoes (compressible)',
            'Lace tight - foot shouldn\'t move',
          ],
          recommended: 'Adipower, Romaleos, Do-Wins - $100-200',
        },
        {
          name: 'Wrist Wraps',
          when: 'Heavy pressing movements',
          why: [
            'Supports wrist joint under load',
            'Prevents hyperextension',
            'Adds confidence on heavy bench',
            'Reduces wrist pain',
            'Legal in most federations',
          ],
          types: [
            { type: 'Stiff Wraps', width: '24-36" long', best: 'Max bench press', thickness: 'Heavy canvas' },
            { type: 'Medium Wraps', width: '18-24" long', best: 'All-around pressing', thickness: 'Standard canvas' },
            { type: 'Flexible Wraps', width: '12-18" long', best: 'Comfort, light support', thickness: 'Elastic blend' },
          ],
          sizing: '18-24" for most people',
          usage: [
            'Bench press above 80% 1RM',
            'Overhead press if wrist pain',
            'Wrap snug, not cutting circulation',
            'Start wrap 1-2" below palm',
            'Don\'t rely on them - strengthen wrists too',
          ],
          recommended: 'Inzer, SBD, Rogue - $15-40',
        },
        {
          name: 'Knee Sleeves',
          when: 'Squatting or knee-dominant work',
          why: [
            'Keeps joints warm',
            'Provides proprioceptive feedback',
            'Minimal rebound (2-3%)',
            'Reduces knee pain for some',
            'Legal in raw powerlifting',
          ],
          types: [
            { type: '7mm Neoprene', width: 'Standard thickness', best: 'Training & competition', thickness: 'Max allowed raw' },
            { type: '5mm Neoprene', width: 'Lighter support', best: 'Warm weather, comfort', thickness: 'Less rebound' },
            { type: 'Compression Sleeve', width: 'Thin fabric', best: 'Just warmth', thickness: 'Minimal support' },
          ],
          sizing: 'Very tight - measure mid-patella',
          usage: [
            'Pull on before warming up (tight!)',
            'Should be difficult to get on',
            'Wear for all squat work',
            'Can wear for leg press, lunges',
            'Not a fix for bad technique',
          ],
          recommended: 'SBD, Rehband, STrong - $60-100',
        },
      ],
    },
    optional: {
      name: 'Optional Gear',
      icon: 'add-circle',
      color: 'blue',
      items: [
        {
          name: 'Lifting Straps',
          when: 'Heavy pulling when grip is limiting',
          why: [
            'Removes grip as limiting factor',
            'Allows higher training volume',
            'Lets you overload back/legs',
            'Reduces forearm fatigue',
            'Useful for high-rep deadlifts',
          ],
          types: [
            { type: 'Cotton Straps', width: '21-24" long', best: 'General training', thickness: 'Standard' },
            { type: 'Figure-8 Straps', width: 'Loop design', best: 'Max deadlift', thickness: 'Very secure' },
            { type: 'Lasso Straps', width: 'Quick release', best: 'Olympic lifts', thickness: 'Fast on/off' },
          ],
          usage: [
            'Use for back work (rows, pull-ups)',
            'Deadlift accessories (RDLs, high reps)',
            'NOT for competition deadlifts',
            'Still train grip separately',
            'Don\'t become dependent',
          ],
          recommended: 'IronMind, Versa Gripps - $15-30',
        },
        {
          name: 'Chalk',
          when: 'All heavy barbell work',
          why: [
            'Improves grip dramatically',
            'Absorbs sweat',
            'Prevents bar slipping',
            'Cheap and effective',
            'Used by all strength athletes',
          ],
          types: [
            { type: 'Block Chalk', width: 'Pure magnesium carbonate', best: 'Best grip, messy', thickness: 'Powder form' },
            { type: 'Liquid Chalk', width: 'Alcohol + chalk', best: 'No mess, gym-friendly', thickness: 'Dries on hands' },
            { type: 'Chalk Ball', width: 'Cloth bag with chalk', best: 'Less mess than block', thickness: 'Moderate grip' },
          ],
          usage: [
            'Apply before heavy sets',
            'Reapply between attempts',
            'Focus on calluses and thumb',
            'Don\'t over-apply (wastes chalk)',
            'Wipe down bar after',
          ],
          recommended: 'Any magnesium carbonate - $5-15',
        },
        {
          name: 'Resistance Bands',
          when: 'Warmups and accessories',
          why: [
            'Perfect for activation work',
            'Accommodating resistance training',
            'Mobility and stretching',
            'Portable and versatile',
            'Rehab and prehab',
          ],
          types: [
            { type: 'Mini Bands', width: 'Small loop', best: 'Glute activation', thickness: 'Light-heavy' },
            { type: 'Long Bands', width: '41" loop', best: 'Barbell work, stretching', thickness: 'Varied resistance' },
            { type: 'Therapy Bands', width: 'Flat, no loop', best: 'Rehab, rotator cuff', thickness: 'Light resistance' },
          ],
          usage: [
            'Glute activation before squats',
            'Band pull-aparts for shoulders',
            'Assisted pull-ups/dips',
            'Mobility work',
            'Speed work (bands + bar)',
          ],
          recommended: 'EliteFTS, Rogue - $20-50 set',
        },
        {
          name: 'Foam Roller',
          when: 'Recovery and warmup',
          why: [
            'Self-myofascial release',
            'Reduces muscle soreness',
            'Improves mobility',
            'Pre-workout activation',
            'Post-workout recovery',
          ],
          types: [
            { type: 'Smooth Roller', width: '36" x 6" diameter', best: 'General rolling', thickness: 'Medium density' },
            { type: 'Textured Roller', width: 'Ridges/knobs', best: 'Deep tissue', thickness: 'Firm density' },
            { type: 'Vibrating Roller', width: 'Electric motor', best: 'Enhanced recovery', thickness: 'Variable settings' },
          ],
          usage: [
            'Roll before lifting 5-10 min',
            'Hit tight areas (quads, IT band)',
            'Slow passes, pause on sore spots',
            'Don\'t roll joints or spine',
            'Supplement, not replace stretching',
          ],
          recommended: 'TriggerPoint, Hyperice - $25-100',
        },
      ],
    },
    advanced: {
      name: 'Advanced/Specialized',
      icon: 'trophy',
      color: 'purple',
      items: [
        {
          name: 'Knee Wraps',
          when: 'Equipped powerlifting only',
          why: [
            'Massive rebound out of hole',
            'Can add 50-100kg to squat',
            'Requires skill to use',
            'Legal only in wrapped divisions',
            'Very technique-dependent',
          ],
          types: [
            { type: 'Stiff Wraps', width: '2.5m', best: 'Max rebound', thickness: 'Competition' },
            { type: 'Medium Wraps', width: '2.5m', best: 'Moderate rebound', thickness: 'Training' },
          ],
          usage: [
            'Only for equipped/wrapped division',
            'Requires training to use properly',
            'Wrapped spiraling pattern',
            'Very tight (needs wrapper)',
            'Changes squat mechanics significantly',
          ],
          recommended: 'Inzer, Titan - $40-80',
        },
        {
          name: 'Squat Suit/Bench Shirt',
          when: 'Equipped powerlifting competition',
          why: [
            'Adds 50-150kg to lifts',
            'Different sport than raw',
            'Requires specialized coaching',
            'Legal only in equipped division',
            'Very steep learning curve',
          ],
          types: [
            { type: 'Single-ply', width: 'One layer fabric', best: 'Entry equipped', thickness: 'Moderate carryover' },
            { type: 'Multi-ply', width: 'Multiple layers', best: 'Max equipped', thickness: 'Extreme carryover' },
          ],
          usage: [
            'Requires coach experienced in gear',
            'Completely changes technique',
            'Months to learn groove',
            'Different federation rules',
            'Raw lifters usually avoid',
          ],
          recommended: 'Work with equipped coach',
        },
        {
          name: 'Deadlift Slippers',
          when: 'Maximal deadlift attempts',
          why: [
            'Thinnest possible sole',
            'Reduces ROM by 0.5-1"',
            'Legal in most federations',
            'Stable base',
            'Some prefer socks',
          ],
          usage: [
            'Competition deadlifts only',
            'Minimal cushion = less ROM',
            'Check federation rules',
            'Socks often equally effective',
            'Not for squatting',
          ],
          recommended: 'Deadlift slippers or socks - $20-40',
        },
      ],
    },
    avoid: {
      name: 'What to Avoid',
      icon: 'close-circle',
      color: 'red',
      items: [
        {
          name: 'Gloves',
          why: [
            'Makes bar thicker (harder to grip)',
            'Reduces tactile feedback',
            'Can cause blisters between fingers',
            'Seen as "beginner" move',
            'Use chalk instead',
          ],
          alternative: 'Chalk and build calluses',
        },
        {
          name: 'Smith Machine',
          why: [
            'Fixed bar path (unnatural)',
            'Doesn\'t train stabilizers',
            'Can cause injury (forced ROM)',
            'Not sport-specific',
            'Use free weights',
          ],
          alternative: 'Free barbell, safety bars if needed',
        },
        {
          name: 'Thick Bar Pads (Squat)',
          why: [
            'Bar sits unstable',
            'Rolls on your back',
            'Encourages bad bar position',
            'Makes bar higher (less depth)',
            'Learn proper position instead',
          ],
          alternative: 'Low bar position, build tolerance',
        },
        {
          name: 'Weight Lifting Gloves',
          why: [
            'Same issues as gloves',
            'Weakens grip over time',
            'Unnecessary for strength training',
            'Professionals don\'t use them',
          ],
          alternative: 'Bare hands + chalk',
        },
        {
          name: 'Running Shoes for Lifting',
          why: [
            'Compressible sole (unstable)',
            'Energy leak into cushion',
            'Reduces force production',
            'Can cause ankle roll',
            'Use flat/hard sole',
          ],
          alternative: 'Lifting shoes, Chuck Taylors, or barefoot',
        },
        {
          name: 'Excessive Equipment',
          why: [
            'Belt, wraps, sleeves for warmups',
            'Doesn\'t make you stronger',
            'Becomes psychological crutch',
            'Save for heavy sets only',
            'Build raw strength first',
          ],
          alternative: 'Reserve equipment for 80%+ loads',
        },
      ],
    },
  };

  const currentType = equipmentData[selectedType as keyof typeof equipmentData];

  const getColorClass = (color: string) => {
    const colors: { [key: string]: string } = {
      emerald: 'bg-primary',
      blue: 'bg-primary',
      purple: 'bg-purple-500',
      red: 'bg-red-500',
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
            Equipment Guide
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          <View className="bg-gradient-to-r from-primary to-[#7D0EBE] rounded-xl p-6 mb-6">
            <Text className="text-white text-2xl font-bold mb-2">Gear Up Smart</Text>
            <Text className="text-white opacity-90">
              Essential equipment guide for powerlifters
            </Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6">
            <View className="flex-row gap-3 px-1">
              {Object.entries(equipmentData).map(([key, type]) => (
                <TouchableOpacity
                  key={key}
                  onPress={() => setSelectedType(key)}
                  className={`${
                    selectedType === key 
                      ? getColorClass(type.color)
                      : 'bg-zinc-900'
                  } rounded-xl p-4 border ${
                    selectedType === key 
                      ? 'border-white/30'
                      : 'border-zinc-800'
                  } min-w-[180px]`}
                >
                  <Ionicons 
                    name={type.icon as any} 
                    size={32} 
                    color={selectedType === key ? 'white' : '#a1a1aa'} 
                  />
                  <Text className={`${selectedType === key ? 'text-white' : 'text-zinc-400'} font-bold mt-2`}>
                    {type.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          {selectedType !== 'avoid' && currentType.items && (
            currentType.items.map((item, idx) => (
              <View key={idx} className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
                <View className="flex-row items-center mb-4">
                  <View className={`${getColorClass(currentType.color)} rounded-full w-12 h-12 items-center justify-center mr-3`}>
                    <Ionicons name="checkmark" size={24} color="white" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-white text-xl font-bold">{item.name}</Text>
                    <Text className="text-zinc-400 text-sm">{item.when}</Text>
                  </View>
                </View>

                <View className="mb-4">
                  <Text className="text-white font-bold mb-2">Why use it:</Text>
                  {item.why.map((reason, rIdx) => (
                    <Text key={rIdx} className="text-zinc-300 text-sm mb-1">
                      • {reason}
                    </Text>
                  ))}
                </View>

                {item.types && (
                  <View className="mb-4">
                    <Text className="text-white font-bold mb-3">Types:</Text>
                    {item.types.map((type, tIdx) => (
                      <View key={tIdx} className="bg-zinc-800 rounded-xl p-4 mb-3 last:mb-0">
                        <Text className="text-primary font-bold mb-2">{type.type}</Text>
                        <Text className="text-zinc-300 text-sm mb-1">
                          <Text className="text-zinc-400">Width:</Text> {type.width}
                        </Text>
                        <Text className="text-zinc-300 text-sm mb-1">
                          <Text className="text-zinc-400">Best for:</Text> {type.best}
                        </Text>
                        <Text className="text-zinc-300 text-sm">
                          <Text className="text-zinc-400">Material:</Text> {type.thickness}
                        </Text>
                      </View>
                    ))}
                  </View>
                )}

                {item.sizing && (
                  <View className="bg-primary/10 rounded-xl p-3 border border-primary/30 mb-4">
                    <Text className="text-primary/80 font-bold text-sm mb-1">Sizing:</Text>
                    <Text className="text-primary/60 text-sm">{item.sizing}</Text>
                  </View>
                )}

                {item.usage && (
                  <View className="mb-4">
                    <Text className="text-white font-bold mb-2">How to use:</Text>
                    {item.usage.map((use, uIdx) => (
                      <Text key={uIdx} className="text-zinc-300 text-sm mb-1">
                        ✓ {use}
                      </Text>
                    ))}
                  </View>
                )}

                {item.recommended && (
                  <View className="bg-primary/10 rounded-xl p-3 border border-primary/30">
                    <Text className="text-primary font-bold text-sm mb-1">Recommended:</Text>
                    <Text className="text-primary/80 text-sm">{item.recommended}</Text>
                  </View>
                )}
              </View>
            ))
          )}

          {selectedType === 'avoid' && currentType.items && (
            currentType.items.map((item, idx) => (
              <View key={idx} className="bg-zinc-900 rounded-xl p-5 mb-6 border border-red-500/50">
                <View className="flex-row items-center mb-4">
                  <View className="bg-red-500 rounded-full w-12 h-12 items-center justify-center mr-3">
                    <Ionicons name="close" size={24} color="white" />
                  </View>
                  <Text className="text-white text-xl font-bold flex-1">{item.name}</Text>
                </View>

                <View className="mb-4">
                  <Text className="text-red-400 font-bold mb-2">Why avoid:</Text>
                  {item.why.map((reason, rIdx) => (
                    <Text key={rIdx} className="text-zinc-300 text-sm mb-1">
                      ✓ {reason}
                    </Text>
                  ))}
                </View>

                <View className="bg-primary/10 rounded-xl p-3 border border-primary/30">
                  <Text className="text-primary font-bold text-sm mb-1">Use instead:</Text>
                  <Text className="text-primary/80 text-sm">{item.alternative}</Text>
                </View>
              </View>
            ))
          )}

          <View className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-xl p-4 border border-amber-500/30 mb-6">
            <Text className="text-amber-400 font-bold mb-2">Equipment Philosophy</Text>
            <Text className="text-amber-300 text-sm mb-2">
              • Equipment should enhance training, not replace skill
            </Text>
            <Text className="text-amber-300 text-sm mb-2">
              • Start minimal - belt and shoes are enough
            </Text>
            <Text className="text-amber-300 text-sm mb-2">
              • Save equipment for heavy sets (80%+ 1RM)
            </Text>
            <Text className="text-amber-300 text-sm mb-2">
              • Build raw strength first before relying on gear
            </Text>
            <Text className="text-amber-300 text-sm">
              • Quality over quantity - buy once, cry once
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}



