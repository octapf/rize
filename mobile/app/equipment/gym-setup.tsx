import React, { useState } from 'react';
import { Text } from '@/components/ui/Text';
import { View, TouchableOpacity, ScrollView } from 'react-native';;
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function GymSetup() {
  const [selectedArea, setSelectedArea] = useState('homegym');

  const setupData = {
    homegym: {
      name: 'Home Gym Essentials',
      icon: 'home',
      color: 'blue',
      budgets: [
        {
          level: 'Minimum Viable ($500-800)',
          priority: 'Critical',
          items: [
            { item: 'Power Rack', cost: '$250-400', why: 'Safety and versatility', specs: 'Adjustable safeties, pull-up bar' },
            { item: 'Olympic Barbell', cost: '$150-250', why: 'Foundation of strength', specs: '20kg/45lb, rated 700lb+' },
            { item: 'Weight Plates', cost: '$150-300', why: 'Progressive overload', specs: '2x45, 2x35, 2x25, 4x10, 4x5, 2x2.5lb' },
            { item: 'Bench', cost: '$100-150', why: 'Pressing movements', specs: 'Adjustable, rated 600lb+' },
          ],
          notes: 'Enough to run any powerlifting program. Buy used to save money.',
        },
        {
          level: 'Well-Equipped ($1500-2500)',
          priority: 'High',
          items: [
            { item: 'Quality Power Rack', cost: '$600-1000', why: 'Built to last', specs: 'Rogue, Rep, Titan brands' },
            { item: 'Premium Barbell', cost: '$300-400', why: 'Better knurling, spin', specs: 'Texas, Rogue, Eleiko' },
            { item: 'Full Plate Set', cost: '$400-600', why: 'Enough for years', specs: 'Full Olympic set to 500lb' },
            { item: 'Adjustable Bench', cost: '$200-300', why: 'Incline/decline work', specs: 'Rep, Rogue brand' },
            { item: 'Deadlift Platform', cost: '$150-250', why: 'Protect floor, noise', specs: '8x8ft, rubber + plywood' },
            { item: 'Accessories Pack', cost: '$150-300', why: 'Bands, chains, dip belt', specs: 'Varied training tools' },
          ],
          notes: 'Complete setup for serious training. Can compete from home gym.',
        },
        {
          level: 'Fully Loaded ($3000-5000+)',
          priority: 'Luxury',
          items: [
            { item: 'Commercial Rack', cost: '$1500-2500', why: 'Tank-like durability', specs: 'Rogue Monster, Sorinex' },
            { item: 'Multiple Barbells', cost: '$800-1200', why: 'Specialty bars', specs: 'Squat bar, deadlift bar, safety bar' },
            { item: 'Calibrated Plates', cost: '$800-1500', why: 'Competition accuracy', specs: 'Eleiko, Rogue calibrated' },
            { item: 'Competition Bench', cost: '$500-800', why: 'Meet specs', specs: 'IPF approved dimensions' },
            { item: '8x8 Platform + Mirrors', cost: '$400-600', why: 'Professional setup', specs: 'Custom built' },
            { item: 'Full Accessories', cost: '$500-1000', why: 'Chains, bands, sleds', specs: 'Complete training arsenal' },
          ],
          notes: 'Dream home gym. Commercial gym quality at home.',
        },
      ],
    },
    commercial: {
      name: 'Commercial Gym What to Look For',
      icon: 'business',
      color: 'purple',
      categories: [
        {
          category: 'Must-Haves',
          priority: 'Deal breakers',
          requirements: [
            { requirement: 'Power Racks (2+ available)', why: 'Not waiting 30min to squat', details: 'Minimum 2, ideally 4+ for busy gym' },
            { requirement: 'Olympic Barbells (4+)', why: 'Need bar when you need it', details: 'Standard 20kg/45lb bars, good knurling' },
            { requirement: 'Adequate Plates', why: 'Enough weight to progress', details: 'Multiple 45s, shouldn\'t run out' },
            { requirement: 'Flat Benches (3+)', why: 'Bench press is popular', details: 'Sturdy, not wobbly cheap ones' },
            { requirement: 'Chalk Allowed', why: 'Essential for heavy lifts', details: 'Or liquid chalk permitted' },
          ],
        },
        {
          category: 'Highly Desirable',
          priority: 'Makes training better',
          requirements: [
            { requirement: 'Deadlift Platform/Area', why: 'Proper DL setup', details: 'Rubber floor, room to pull' },
            { requirement: 'Bumper Plates', why: 'Can drop if needed', details: 'For Olympic lifts, failed lifts' },
            { requirement: 'Specialty Bars', why: 'Variation and progress', details: 'Safety squat bar, trap bar ideal' },
            { requirement: 'Lifting Atmosphere', why: 'Training environment matters', details: 'Lifters welcome, not "lunk alarm"' },
            { requirement: 'Consistent Hours', why: 'Train on your schedule', details: '5am-10pm+ or 24hr' },
          ],
        },
        {
          category: 'Nice to Have',
          priority: 'Bonus features',
          requirements: [
            { requirement: 'Calibrated Plates', why: 'Accurate loading', details: 'Know exactly what you\'re lifting' },
            { requirement: 'Competition Equipment', why: 'Meet practice', details: 'IPF spec bench, calibrated bar' },
            { requirement: 'Monolift/Combo Rack', why: 'Advanced training', details: 'For geared lifters mainly' },
            { requirement: 'Chains & Bands', why: 'Accommodating resistance', details: 'Advanced techniques' },
            { requirement: 'Video Recording OK', why: 'Form checks', details: 'Film your lifts legally' },
          ],
        },
        {
          category: 'Red Flags',
          priority: 'Avoid these gyms',
          requirements: [
            { requirement: 'Only Smith Machines', why: 'Not real squats/bench', details: 'Need free weight barbell' },
            { requirement: 'No Chalk Policy', why: 'Can\'t lift heavy safely', details: 'Essential for powerlifting' },
            { requirement: '"No Deadlifting" Rule', why: 'Can\'t train 1/3 of sport', details: 'Run away immediately' },
            { requirement: 'Lunk Alarm', why: 'Shames strength training', details: 'Planet Fitness-style gyms' },
            { requirement: 'Only Hex Plates', why: 'Terrible for deadlifts', details: 'Bar rolls, inconsistent height' },
          ],
        },
      ],
    },
    safety: {
      name: 'Safety Equipment',
      icon: 'shield-checkmark',
      color: 'primary',
      equipment: [
        {
          name: 'Power Rack Safeties',
          critical: true,
          setup: [
            { step: 'Set pins 2-3" below lockout', why: 'Catch failed lift without crushing you' },
            { step: 'Test height with empty bar', why: 'Confirm safe depth' },
            { step: 'Adjust per lift', why: 'Squat vs bench different heights' },
            { step: 'ALWAYS use safeties when alone', why: 'Life-saving if you fail' },
          ],
          tips: [
            'Pin safeties better than strap safeties (more stable)',
            'Should NEVER hit safeties on good rep',
            'Should ALWAYS catch failed rep safely',
            'Practice bailing once with light weight',
          ],
        },
        {
          name: 'Spotter Arms/Straps',
          critical: true,
          setup: [
            { step: 'Mount outside rack', why: 'Catch bar if you dump forward' },
            { step: 'Set just below bar path', why: 'Won\'t interfere with lift' },
            { step: 'Test with empty bar', why: 'Ensure they\'ll catch' },
            { step: 'Use for bench especially', why: 'Most dangerous solo lift' },
          ],
          tips: [
            'Spotter straps let bar roll to safety',
            'Arms provide hard stop',
            'Both work well, preference varies',
            'Don\'t skip these for bench',
          ],
        },
        {
          name: 'Collars',
          critical: false,
          setup: [
            { step: 'Use for bench press always', why: 'Uneven press = plate slide' },
            { step: 'Optional for squat/deadlift', why: 'Can dump plates if failing' },
            { step: 'Required in competition', why: 'Federation rules' },
            { step: 'Spring vs clamp collars', why: 'Clamp more secure' },
          ],
          tips: [
            'Bench: Always collar (can\'t bail)',
            'Squat: Optional (can tilt and dump)',
            'Deadlift: Usually no collar (easier bail)',
            'Competition: Must use collars',
          ],
        },
        {
          name: 'Mirrors',
          critical: false,
          setup: [
            { step: 'Front of rack for setup', why: 'Check bar position, stance' },
            { step: 'NOT during lift', why: 'Watch bar, not mirror' },
            { step: 'Film yourself instead', why: 'Better feedback than mirror' },
          ],
          tips: [
            'Useful for setup only',
            'Don\'t watch yourself during lift',
            'Can throw off balance',
            'Video > mirror for form',
          ],
        },
        {
          name: 'Proper Flooring',
          critical: true,
          setup: [
            { step: 'Rubber mats minimum', why: 'Absorb impact, protect floor' },
            { step: 'Platform for deadlifts', why: 'Noise reduction, bar protection' },
            { step: '3/4" horse stall mats ideal', why: 'Cheap and bomb-proof' },
            { step: 'Level surface', why: 'Safety and bar path' },
          ],
          tips: [
            'Tractor Supply horse mats = $50 each',
            'Build 8x8 platform: plywood + rubber',
            'Protects your floor and weights',
            'Reduces noise for neighbors',
          ],
        },
      ],
    },
    maintenance: {
      name: 'Equipment Care',
      icon: 'construct',
      color: 'amber',
      tasks: [
        {
          item: 'Barbell Maintenance',
          frequency: 'Monthly',
          tasks: [
            { task: 'Brush knurling', why: 'Remove chalk buildup', how: 'Stiff brush, scrub knurling' },
            { task: 'Oil sleeves', why: 'Maintain spin', how: '3-in-1 oil in sleeve gap' },
            { task: 'Wipe down shaft', why: 'Prevent rust', how: 'Dry cloth after use' },
            { task: 'Check collars', why: 'Ensure they lock', how: 'Replace if loose' },
          ],
          notes: 'Good bar lasts decades with care. Neglected bar rusts in months.',
        },
        {
          item: 'Rack Maintenance',
          frequency: 'Quarterly',
          tasks: [
            { task: 'Tighten all bolts', why: 'Prevent wobble', how: 'Wrench, check every bolt' },
            { task: 'Inspect welds', why: 'Safety critical', how: 'Look for cracks' },
            { task: 'Grease j-hooks', why: 'Smooth operation', how: 'Lithium grease on pins' },
            { task: 'Check safety catches', why: 'Life-saving equipment', how: 'Test under load' },
          ],
          notes: 'Rack failure = catastrophic. Inspect regularly.',
        },
        {
          item: 'Plate Care',
          frequency: 'As needed',
          tasks: [
            { task: 'Wipe down', why: 'Remove chalk, sweat', how: 'Damp cloth' },
            { task: 'Check for cracks', why: 'Safety', how: 'Visual inspection' },
            { task: 'Organize by weight', why: 'Efficiency', how: 'Plate tree or posts' },
            { task: 'Bumpers: check inserts', why: 'Prevent spinning', how: 'Tighten if loose' },
          ],
          notes: 'Plates last forever if not dropped on concrete.',
        },
        {
          item: 'Bench Maintenance',
          frequency: 'Monthly',
          tasks: [
            { task: 'Tighten adjustment pins', why: 'Prevent collapse', how: 'Check all adjustment points' },
            { task: 'Inspect padding', why: 'Comfort and safety', how: 'Replace if torn' },
            { task: 'Check stability', why: 'Critical for bench press', how: 'Should not wobble' },
            { task: 'Grease adjustment mechanisms', why: 'Smooth operation', how: 'Spray lubricant' },
          ],
          notes: 'Bench collapsing during press = disaster. Inspect before heavy sets.',
        },
        {
          item: 'Platform/Floor',
          frequency: 'Weekly',
          tasks: [
            { task: 'Sweep/vacuum', why: 'Remove chalk, dirt', how: 'After every session' },
            { task: 'Check for damage', why: 'Uneven floor = injury', how: 'Visual inspection' },
            { task: 'Secure mats', why: 'Prevent sliding', how: 'Tape or interlock' },
            { task: 'Deep clean monthly', why: 'Hygiene', how: 'Mop with mild cleaner' },
          ],
          notes: 'Clean gym = better training environment.',
        },
      ],
    },
  };

  const currentArea = setupData[selectedArea as keyof typeof setupData];

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
            Gym Setup Guide
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          <View className="bg-gradient-to-r from-primary to-[#7D0EBE] rounded-xl p-6 mb-6">
            <Text className="text-white text-2xl font-bold mb-2">Build Your Iron Temple</Text>
            <Text className="text-white opacity-90">
              Complete guide to gym equipment and setup
            </Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6">
            <View className="flex-row gap-3 px-1">
              {Object.entries(setupData).map(([key, area]) => (
                <TouchableOpacity
                  key={key}
                  onPress={() => setSelectedArea(key)}
                  className={`${
                    selectedArea === key 
                      ? getColorClass(area.color)
                      : 'bg-zinc-900'
                  } rounded-xl p-4 border ${
                    selectedArea === key 
                      ? 'border-white/30'
                      : 'border-zinc-800'
                  } min-w-[180px]`}
                >
                  <Ionicons 
                    name={area.icon as any} 
                    size={32} 
                    color={selectedArea === key ? 'white' : '#a1a1aa'} 
                  />
                  <Text className={`${selectedArea === key ? 'text-white' : 'text-zinc-400'} font-bold mt-2`}>
                    {area.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          {selectedArea === 'homegym' && currentArea.budgets && (
            currentArea.budgets.map((budget, idx) => (
              <View key={idx} className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
                <View className="bg-primary rounded-xl px-4 py-3 mb-4">
                  <Text className="text-white font-bold text-lg">{budget.level}</Text>
                  <Text className="text-white/80 text-sm">{budget.priority} Priority</Text>
                </View>

                {budget.items.map((item, iIdx) => (
                  <View key={iIdx} className="bg-zinc-800 rounded-xl p-4 mb-3 last:mb-4">
                    <View className="flex-row justify-between items-start mb-2">
                      <Text className="text-white font-bold flex-1">{item.item}</Text>
                      <Text className="text-primary font-bold">{item.cost}</Text>
                    </View>
                    <Text className="text-zinc-400 text-sm mb-2">{item.why}</Text>
                    <Text className="text-zinc-500 text-xs">{item.specs}</Text>
                  </View>
                ))}

                <View className="bg-primary/10 rounded-xl p-3 border border-primary/30">
                  <Text className="text-primary/80 font-bold text-sm mb-1">Notes:</Text>
                  <Text className="text-primary/60 text-sm">{budget.notes}</Text>
                </View>
              </View>
            ))
          )}

          {selectedArea === 'commercial' && currentArea.categories && (
            currentArea.categories.map((category, idx) => (
              <View key={idx} className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
                <View className="bg-purple-500 rounded-xl px-4 py-2 mb-4">
                  <Text className="text-white font-bold text-lg">{category.category}</Text>
                  <Text className="text-white/80 text-sm">{category.priority}</Text>
                </View>

                {category.requirements.map((req, rIdx) => (
                  <View key={rIdx} className="bg-zinc-800 rounded-xl p-4 mb-3 last:mb-0">
                    <Text className="text-white font-bold mb-2">{req.requirement}</Text>
                    <Text className="text-purple-400 text-sm mb-1">Why: {req.why}</Text>
                    <Text className="text-zinc-400 text-xs">{req.details}</Text>
                  </View>
                ))}
              </View>
            ))
          )}

          {selectedArea === 'safety' && currentArea.equipment && (
            currentArea.equipment.map((equip, idx) => (
              <View key={idx} className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
                <View className="flex-row items-center mb-4">
                  <View className={`${equip.critical ? 'bg-red-500' : 'bg-primary'} rounded-full w-12 h-12 items-center justify-center mr-3`}>
                    <Ionicons name="shield-checkmark" size={24} color="white" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-white text-xl font-bold">{equip.name}</Text>
                    <Text className={`${equip.critical ? 'text-red-400' : 'text-primary'} text-sm`}>
                      {equip.critical ? 'CRITICAL' : 'Optional'}
                    </Text>
                  </View>
                </View>

                <Text className="text-white font-bold mb-3">Setup:</Text>
                {equip.setup.map((step, sIdx) => (
                  <View key={sIdx} className="bg-zinc-800 rounded-xl p-4 mb-2">
                    <Text className="text-primary font-bold text-sm mb-1">{step.step}</Text>
                    <Text className="text-zinc-300 text-xs">{step.why}</Text>
                  </View>
                ))}

                <View className="bg-primary/10 rounded-xl p-3 border border-primary/30 mt-3">
                  <Text className="text-primary/80 font-bold text-sm mb-2">Tips:</Text>
                  {equip.tips.map((tip, tIdx) => (
                    <Text key={tIdx} className="text-primary/60 text-sm mb-1 last:mb-0">
                      • {tip}
                    </Text>
                  ))}
                </View>
              </View>
            ))
          )}

          {selectedArea === 'maintenance' && currentArea.tasks && (
            currentArea.tasks.map((task, idx) => (
              <View key={idx} className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
                <View className="bg-amber-500 rounded-xl px-4 py-2 mb-4">
                  <Text className="text-white font-bold text-lg">{task.item}</Text>
                  <Text className="text-white/80 text-sm">Every {task.frequency}</Text>
                </View>

                {task.tasks.map((t, tIdx) => (
                  <View key={tIdx} className="bg-zinc-800 rounded-xl p-4 mb-3">
                    <Text className="text-amber-400 font-bold mb-2">{t.task}</Text>
                    <Text className="text-zinc-300 text-sm mb-1">
                      <Text className="text-zinc-500">Why:</Text> {t.why}
                    </Text>
                    <Text className="text-zinc-300 text-sm">
                      <Text className="text-zinc-500">How:</Text> {t.how}
                    </Text>
                  </View>
                ))}

                <View className="bg-amber-500/10 rounded-xl p-3 border border-amber-500/30">
                  <Text className="text-amber-400 font-bold text-sm mb-1">Important:</Text>
                  <Text className="text-amber-300 text-sm">{task.notes}</Text>
                </View>
              </View>
            ))
          )}

          <View className="bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-xl p-4 border border-red-500/30 mb-6">
            <Text className="text-red-400 font-bold mb-2">Safety First</Text>
            <Text className="text-red-300 text-sm mb-2">
              • Never bench without safeties or spotter
            </Text>
            <Text className="text-red-300 text-sm mb-2">
              • Inspect equipment before every heavy session
            </Text>
            <Text className="text-red-300 text-sm mb-2">
              • Quality equipment = long-term investment
            </Text>
            <Text className="text-red-300 text-sm">
              • When in doubt, err on side of safety
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}


