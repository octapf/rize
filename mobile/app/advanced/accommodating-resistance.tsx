import React, { useState } from 'react';
import { Text } from '@/components/ui/Text';
import { View, TouchableOpacity, ScrollView } from 'react-native';;
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function AccommodatingResistance() {
  const [selectedType, setSelectedType] = useState('bands');

  const resistanceData = {
    bands: {
      name: 'Band Training',
      icon: 'resize',
      color: 'blue',
      sections: [
        {
          title: 'What Are Bands?',
          content: [
            'Elastic resistance that increases through ROM',
            'Light at bottom, heavy at lockout',
            'Forces you to accelerate bar',
            'Teaches explosive strength',
            'Used by elite powerlifters worldwide',
          ],
        },
        {
          title: 'Band Types & Tension',
          items: [
            { band: 'Micro Mini (orange)', tension: '~5-15kg at stretch', use: 'Bench press, beginners' },
            { band: 'Mini (purple)', tension: '~10-25kg at stretch', use: 'Bench, lighter squats' },
            { band: 'Monster Mini (green)', tension: '~15-35kg at stretch', use: 'Most common squat band' },
            { band: 'Light (blue)', tension: '~20-40kg at stretch', use: 'Heavy squats, strong lifters' },
            { band: 'Average (red)', tension: '~30-60kg at stretch', use: 'Advanced, very strong' },
          ],
        },
        {
          title: 'Band Setup - Squat',
          steps: [
            { step: '1. Anchor bands to bottom of rack', detail: 'Loop through J-hooks or base' },
            { step: '2. Attach to barbell ends', detail: 'Loop over sleeves outside plates' },
            { step: '3. Measure tension at top', detail: 'Pull band to lockout height, measure pull' },
            { step: '4. Match tension both sides', detail: 'Equal pull left and right' },
            { step: '5. Adjust bar weight down', detail: 'Bar weight + band tension = total' },
          ],
          example: '100kg bar + 40kg band tension at top = 140kg lockout, 100kg bottom',
        },
        {
          title: 'Band Setup - Bench',
          steps: [
            { step: '1. Anchor to base of bench', detail: 'Loop under bench legs' },
            { step: '2. Or anchor to rack posts', detail: 'If bench is inside rack' },
            { step: '3. Attach to bar', detail: 'Outside collar position' },
            { step: '4. Measure at lockout', detail: 'Tension when arms extended' },
            { step: '5. Adjust bar weight', detail: 'Lighter bar, heavier lockout' },
          ],
          example: '60kg bar + 30kg band at lockout = 90kg top, 60kg chest',
        },
        {
          title: 'Band Setup - Deadlift',
          steps: [
            { step: '1. Anchor to platform', detail: 'Heavy dumbbells or rack base' },
            { step: '2. Loop through anchor', detail: 'Secure so won\'t move' },
            { step: '3. Attach to bar', detail: 'Both ends equal distance' },
            { step: '4. Measure pull at lockout', detail: 'Stand and measure tension' },
            { step: '5. Start lighter on bar', detail: 'Bands add significant load' },
          ],
          example: '120kg bar + 50kg band = 170kg lockout, 120kg floor',
        },
      ],
      protocols: [
        {
          method: 'Dynamic Effort (Westside style)',
          purpose: 'Explosive strength',
          setup: '50-60% bar weight + 20-25% band tension',
          execution: '8-12 sets x 2-3 reps, focus on speed',
          rest: '45-60 seconds between sets',
          notes: 'Move bar as fast as possible. Speed is the goal, not grinding.',
        },
        {
          method: 'Max Effort with Bands',
          purpose: 'Lockout strength',
          setup: '70% bar weight + 30% band tension',
          execution: 'Work up to heavy single or triple',
          rest: '3-5 minutes between sets',
          notes: 'Brutal lockout. Teaches you to fight through sticking point.',
        },
        {
          method: 'Accommodating Resistance Hypertrophy',
          purpose: 'Muscle building with variable load',
          setup: '60-70% bar weight + 15-20% band',
          execution: '4-5 sets x 6-8 reps',
          rest: '2-3 minutes',
          notes: 'Constant tension, no momentum. Great pump and growth stimulus.',
        },
      ],
    },
    chains: {
      name: 'Chain Training',
      icon: 'link',
      color: 'purple',
      sections: [
        {
          title: 'What Are Chains?',
          content: [
            'Metal chains that progressively load barbell',
            'Weight on bar increases as you lift',
            'Chain links pile on floor at bottom',
            'More chain on bar = more weight at top',
            'Linear resistance curve (unlike bands)',
          ],
        },
        {
          title: 'Chain Specifications',
          items: [
            { type: '5/8" chains', weight: '~10kg per pair', use: 'Bench press typically' },
            { type: '3/4" chains', weight: '~15kg per pair', use: 'Squats, deadlifts' },
            { type: '1" chains', weight: '~25kg per pair', use: 'Very strong lifters' },
            { type: 'Leader chains', weight: '~2-3kg short chain', use: 'Attach to bar, hold main chain' },
          ],
        },
        {
          title: 'Chain Setup - Squat',
          steps: [
            { step: '1. Use leader chains', detail: 'Short chain attached to barbell sleeve' },
            { step: '2. Hang main chains from leader', detail: 'Equal length both sides' },
            { step: '3. Adjust length', detail: 'At bottom: 1-2 links on bar. At top: all chain on bar' },
            { step: '4. Load bar lighter', detail: 'Chains add weight at lockout' },
            { step: '5. Walk out carefully', detail: 'Chains swing - control it' },
          ],
          example: '140kg bar + 30kg chains (at top) = 170kg lockout, 142kg bottom (leader weight)',
        },
        {
          title: 'Chain Setup - Bench',
          steps: [
            { step: '1. Drape chains over bar', detail: 'Equal amount each side' },
            { step: '2. Position outside collars', detail: 'Don\'t interfere with hands' },
            { step: '3. Adjust length', detail: 'Chest: minimal chain. Lockout: all chain on bar' },
            { step: '4. Secure if needed', detail: 'Some use clips to prevent sliding' },
            { step: '5. Liftoff smooth', detail: 'Chains can swing on handoff' },
          ],
          example: '100kg bar + 20kg chains = 120kg lockout, 102kg chest',
        },
        {
          title: 'Chain Setup - Deadlift',
          steps: [
            { step: '1. Attach to bar ends', detail: 'Leader chain or drape over' },
            { step: '2. Set length precisely', detail: 'Floor: some chain down. Lockout: all up' },
            { step: '3. Both sides equal', detail: 'Balance is critical' },
            { step: '4. Reduce bar weight', detail: 'Chains add significantly' },
            { step: '5. Control descent', detail: 'Chains swing on the way down' },
          ],
          example: '160kg bar + 40kg chains = 200kg lockout, 165kg floor',
        },
      ],
      protocols: [
        {
          method: 'Conjugate Method Chains',
          purpose: 'Max effort lockout work',
          setup: '65-75% bar + 15-25% chains',
          execution: 'Work to heavy single or triple',
          rest: '3-5 minutes',
          notes: 'Classic Westside method. Overload top ROM where you\'re strongest.',
        },
        {
          method: 'Speed Work with Chains',
          purpose: 'Explosive strength',
          setup: '50-60% bar + 10-15% chains',
          execution: '8-10 sets x 2-3 reps, fast',
          rest: '60 seconds',
          notes: 'Accelerate through entire ROM. Chains force constant acceleration.',
        },
        {
          method: 'Progressive Overload',
          purpose: 'Build strength through ROM',
          setup: '70% bar + 20% chains',
          execution: '5 sets x 5 reps',
          rest: '3 minutes',
          notes: 'Standard strength building. Chains make lockout heavier gradually.',
        },
      ],
    },
    comparison: {
      name: 'Bands vs Chains',
      icon: 'swap-horizontal',
      color: 'primary',
      comparison: [
        {
          aspect: 'Resistance Curve',
          bands: 'Exponential - tension increases dramatically',
          chains: 'Linear - weight increases proportionally',
          winner: 'Depends on goal',
        },
        {
          aspect: 'Cost',
          bands: '$30-80 for full set',
          chains: '$200-400 for proper chains',
          winner: 'Bands (much cheaper)',
        },
        {
          aspect: 'Portability',
          bands: 'Light, fits in gym bag',
          chains: '50-100kg of metal, heavy',
          winner: 'Bands (very portable)',
        },
        {
          aspect: 'Durability',
          bands: '1-3 years, can snap',
          chains: 'Lifetime, bulletproof',
          winner: 'Chains (buy once)',
        },
        {
          aspect: 'Setup Time',
          bands: '2-3 minutes, need anchor points',
          chains: '1-2 minutes, just drape on',
          winner: 'Chains (slightly faster)',
        },
        {
          aspect: 'Eccentric Load',
          bands: 'Assists eccentric (pulls you down)',
          chains: 'Same both ways',
          winner: 'Chains (no assistance)',
        },
        {
          aspect: 'Tension Feel',
          bands: 'Elastic, "springy"',
          chains: 'Dead weight, like barbell',
          winner: 'Preference varies',
        },
        {
          aspect: 'Versatility',
          bands: 'Also for stretching, activation',
          chains: 'Only for barbell loading',
          winner: 'Bands (multi-use)',
        },
      ],
      recommendations: [
        {
          scenario: 'Home gym, budget-conscious',
          choice: 'Bands',
          why: 'Cheaper, portable, versatile, effective',
        },
        {
          scenario: 'Commercial gym, serious powerlifter',
          choice: 'Chains',
          why: 'More specific to heavy barbell, durable, no assistance on eccentric',
        },
        {
          scenario: 'Equipped lifting',
          choice: 'Bands',
          why: 'Suits and wraps already add tension, bands train that feel',
        },
        {
          scenario: 'Raw lifting, lockout weak',
          choice: 'Either',
          why: 'Both overload lockout effectively',
        },
        {
          scenario: 'Speed/power development',
          choice: 'Bands',
          why: 'Force acceleration more dramatically',
        },
      ],
    },
    programming: {
      name: 'How to Program',
      icon: 'calendar',
      color: 'amber',
      cycles: [
        {
          phase: 'Introduction (Weeks 1-2)',
          goal: 'Learn the equipment',
          bands: 'Lightest bands, 50% bar + 10-15% band',
          chains: 'Light chains, 60% bar + 10% chain',
          volume: 'Moderate sets (5-6), low reps (2-3)',
          notes: 'Focus on feeling how resistance changes. Don\'t go heavy yet.',
        },
        {
          phase: 'Accumulation (Weeks 3-5)',
          goal: 'Build volume with accommodating resistance',
          bands: '60% bar + 20% band, 6-8 sets x 3-5 reps',
          chains: '65% bar + 15% chain, 5 sets x 5 reps',
          volume: 'Increase total volume',
          notes: 'This is the workhorse phase. Build strength in new loading pattern.',
        },
        {
          phase: 'Intensification (Weeks 6-8)',
          goal: 'Heavy work with bands/chains',
          bands: '70% bar + 25% band, work to heavy triple',
          chains: '70% bar + 20% chain, work to heavy single',
          volume: 'Reduce volume, increase intensity',
          notes: 'Peak your strength with accommodating resistance. Very tough phase.',
        },
        {
          phase: 'Deload (Week 9)',
          goal: 'Recover completely',
          bands: '50% bar + 10% band, 3 sets x 3 reps',
          chains: 'Remove chains, regular training at 60%',
          volume: 'Minimal',
          notes: 'Back off hard. Let the adaptation solidify.',
        },
        {
          phase: 'Transition (Week 10)',
          goal: 'Return to straight weight',
          bands: 'Remove bands entirely',
          chains: 'Remove chains entirely',
          volume: 'Test new maxes or return to normal programming',
          notes: 'Straight weight will feel lighter and faster. Retest maxes here.',
        },
      ],
      frequencies: [
        {
          experience: 'Beginner (< 1 year)',
          recommendation: 'Don\'t use yet',
          reason: 'Master basics first. These are advanced tools.',
        },
        {
          experience: 'Intermediate (1-3 years)',
          recommendation: '1x per week per lift',
          reason: 'One main lift with bands/chains, others straight weight.',
        },
        {
          experience: 'Advanced (3+ years)',
          recommendation: '2-3x per week total',
          reason: 'Multiple lifts can use accommodating resistance in Westside style.',
        },
      ],
      tips: [
        'Start lighter than you think - bands/chains feel heavier than they look',
        'Film your lifts - bar speed tells you if weight is appropriate',
        'Use for specific phases (6-10 weeks max) then return to straight weight',
        'Don\'t use year-round - novelty is part of the stimulus',
        'Combine with other variations (pauses, tempos) cautiously',
        'Deload afterwards - these methods are very fatiguing',
      ],
    },
  };

  const currentType = resistanceData[selectedType as keyof typeof resistanceData];

  const getColorClass = (color: string) => {
    const colors: { [key: string]: string } = {
      blue: 'bg-primary',
      purple: 'bg-purple-500',
      primary: 'bg-primary',
      amber: 'bg-amber-500',
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
            Accommodating Resistance
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          <View className="bg-gradient-to-r from-primary to-[#7D0EBE] rounded-xl p-6 mb-6">
            <Text className="text-white text-2xl font-bold mb-2">Bands & Chains</Text>
            <Text className="text-white opacity-90">
              Variable resistance for explosive strength
            </Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6">
            <View className="flex-row gap-3 px-1">
              {Object.entries(resistanceData).map(([key, type]) => (
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

          {(selectedType === 'bands' || selectedType === 'chains') && (
            <>
              {currentType.sections?.map((section, idx) => (
                <View key={idx} className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
                  <Text className="text-white text-xl font-bold mb-4">{section.title}</Text>
                  
                  {section.content && section.content.map((item, iIdx) => (
                    <Text key={iIdx} className="text-zinc-300 mb-2 last:mb-0">
                      • {item}
                    </Text>
                  ))}

                  {section.items && section.items.map((item, iIdx) => (
                    <View key={iIdx} className="bg-zinc-800 rounded-xl p-4 mb-3 last:mb-0">
                      <Text className="text-primary font-bold mb-1">{item.band || item.type}</Text>
                      <Text className="text-zinc-300 text-sm mb-1">{item.tension || item.weight}</Text>
                      <Text className="text-zinc-400 text-xs">{item.use}</Text>
                    </View>
                  ))}

                  {section.steps && (
                    <>
                      {section.steps.map((step, sIdx) => (
                        <View key={sIdx} className="bg-zinc-800 rounded-xl p-4 mb-2">
                          <Text className="text-primary/80 font-bold text-sm mb-1">{step.step}</Text>
                          <Text className="text-zinc-300 text-xs">{step.detail}</Text>
                        </View>
                      ))}
                      {section.example && (
                        <View className="bg-purple-500/10 rounded-xl p-3 border border-purple-500/30 mt-2">
                          <Text className="text-purple-400 font-bold text-sm mb-1">Example:</Text>
                          <Text className="text-purple-300 text-sm">{section.example}</Text>
                        </View>
                      )}
                    </>
                  )}
                </View>
              ))}

              {currentType.protocols && (
                <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
                  <Text className="text-white text-xl font-bold mb-4">Training Protocols</Text>
                  {currentType.protocols.map((protocol, idx) => (
                    <View key={idx} className="bg-zinc-800 rounded-xl p-4 mb-4 last:mb-0">
                      <Text className="text-primary font-bold mb-2">{protocol.method}</Text>
                      <Text className="text-zinc-300 text-sm mb-3">{protocol.purpose}</Text>
                      
                      <View className="mb-2">
                        <Text className="text-zinc-400 text-xs mb-1">Setup:</Text>
                        <Text className="text-white text-sm">{protocol.setup}</Text>
                      </View>
                      
                      <View className="mb-2">
                        <Text className="text-zinc-400 text-xs mb-1">Execution:</Text>
                        <Text className="text-white text-sm">{protocol.execution}</Text>
                      </View>
                      
                      <View className="mb-2">
                        <Text className="text-zinc-400 text-xs mb-1">Rest:</Text>
                        <Text className="text-white text-sm">{protocol.rest}</Text>
                      </View>
                      
                      <View className="bg-primary/10 rounded-xl p-2 border border-primary/30 mt-2">
                        <Text className="text-primary/60 text-xs">{protocol.notes}</Text>
                      </View>
                    </View>
                  ))}
                </View>
              )}
            </>
          )}

          {selectedType === 'comparison' && (
            <>
              <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
                <Text className="text-white text-xl font-bold mb-4">Bands vs Chains Comparison</Text>
                {currentType.comparison?.map((item, idx) => (
                  <View key={idx} className="bg-zinc-800 rounded-xl p-4 mb-3 last:mb-0">
                    <Text className="text-primary font-bold mb-3">{item.aspect}</Text>
                    <View className="mb-2">
                      <Text className="text-primary/80 text-sm font-bold">Bands:</Text>
                      <Text className="text-zinc-300 text-sm">{item.bands}</Text>
                    </View>
                    <View className="mb-2">
                      <Text className="text-purple-400 text-sm font-bold">Chains:</Text>
                      <Text className="text-zinc-300 text-sm">{item.chains}</Text>
                    </View>
                    <View className="bg-primary/10 rounded-xl p-2 border border-primary/30">
                      <Text className="text-primary text-xs font-bold">Winner: {item.winner}</Text>
                    </View>
                  </View>
                ))}
              </View>

              <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
                <Text className="text-white text-xl font-bold mb-4">Recommendations</Text>
                {currentType.recommendations?.map((rec, idx) => (
                  <View key={idx} className="bg-zinc-800 rounded-xl p-4 mb-3 last:mb-0">
                    <Text className="text-amber-400 font-bold mb-2">{rec.scenario}</Text>
                    <Text className="text-white text-sm mb-1">
                      <Text className="text-zinc-400">Choose:</Text> {rec.choice}
                    </Text>
                    <Text className="text-zinc-300 text-xs">{rec.why}</Text>
                  </View>
                ))}
              </View>
            </>
          )}

          {selectedType === 'programming' && (
            <>
              <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
                <Text className="text-white text-xl font-bold mb-4">9-Week Training Cycle</Text>
                {currentType.cycles?.map((cycle, idx) => (
                  <View key={idx} className="bg-zinc-800 rounded-xl p-4 mb-4 last:mb-0">
                    <View className="bg-amber-500 rounded-xl px-3 py-2 mb-3">
                      <Text className="text-white font-bold">{cycle.phase}</Text>
                    </View>
                    
                    <Text className="text-primary font-bold mb-2">{cycle.goal}</Text>
                    
                    <View className="mb-2">
                      <Text className="text-primary/80 text-sm">Bands: {cycle.bands}</Text>
                    </View>
                    <View className="mb-2">
                      <Text className="text-purple-400 text-sm">Chains: {cycle.chains}</Text>
                    </View>
                    <View className="mb-3">
                      <Text className="text-zinc-400 text-sm">Volume: {cycle.volume}</Text>
                    </View>
                    
                    <View className="bg-amber-500/10 rounded-xl p-3 border border-amber-500/30">
                      <Text className="text-amber-300 text-xs">{cycle.notes}</Text>
                    </View>
                  </View>
                ))}
              </View>

              <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
                <Text className="text-white text-xl font-bold mb-4">Frequency Guidelines</Text>
                {currentType.frequencies?.map((freq, idx) => (
                  <View key={idx} className="bg-zinc-800 rounded-xl p-4 mb-3 last:mb-0">
                    <Text className="text-primary font-bold mb-2">{freq.experience}</Text>
                    <Text className="text-white text-sm mb-1">
                      <Text className="text-zinc-400">Recommendation:</Text> {freq.recommendation}
                    </Text>
                    <Text className="text-zinc-300 text-xs">{freq.reason}</Text>
                  </View>
                ))}
              </View>

              <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-6">
                <Text className="text-primary/80 font-bold mb-3">Pro Tips:</Text>
                {currentType.tips?.map((tip, idx) => (
                  <Text key={idx} className="text-primary/60 text-sm mb-2 last:mb-0">
                    • {tip}
                  </Text>
                ))}
              </View>
            </>
          )}

          <View className="bg-gradient-to-r from-red-500/20 to-purple-500/20 rounded-xl p-4 border border-red-500/30 mb-6">
            <Text className="text-red-400 font-bold mb-2">Important Notes</Text>
            <Text className="text-red-300 text-sm mb-2">
              • Advanced technique - NOT for beginners
            </Text>
            <Text className="text-red-300 text-sm mb-2">
              • Use in cycles (6-10 weeks), then return to straight weight
            </Text>
            <Text className="text-red-300 text-sm mb-2">
              • Setup is critical - uneven tension = injury risk
            </Text>
            <Text className="text-red-300 text-sm">
              • Film your lifts to ensure bar speed is appropriate
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}


