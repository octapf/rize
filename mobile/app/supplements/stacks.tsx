import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  Switch,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface Supplement {
  id: string;
  name: string;
  category: string;
  dosage: string;
  timing: 'morning' | 'pre-workout' | 'intra-workout' | 'post-workout' | 'night' | 'with-meal';
  frequency: 'daily' | 'workout-days' | 'as-needed';
  benefits: string[];
  enabled: boolean;
  icon: string;
  color: string;
}

interface SupplementStack {
  id: string;
  name: string;
  goal: string;
  supplements: string[];
  totalCost: number;
  monthlyServing: number;
}

interface TimingSchedule {
  time: string;
  supplements: {
    name: string;
    dosage: string;
    icon: string;
    color: string;
  }[];
}

interface Interaction {
  supplement1: string;
  supplement2: string;
  type: 'positive' | 'negative' | 'neutral';
  description: string;
}

const SUPPLEMENTS: Supplement[] = [
  {
    id: '1',
    name: 'ProteÃ­na Whey',
    category: 'ProteÃ­na',
    dosage: '30g (1 scoop)',
    timing: 'post-workout',
    frequency: 'daily',
    benefits: ['RecuperaciÃ³n muscular', 'SÃ­ntesis proteica', 'Saciedad'],
    enabled: true,
    icon: 'ðŸ’ª',
    color: 'bg-primary',
  },
  {
    id: '2',
    name: 'Creatina Monohidrato',
    category: 'Performance',
    dosage: '5g',
    timing: 'post-workout',
    frequency: 'daily',
    benefits: ['Fuerza', 'Potencia', 'Masa muscular', 'RecuperaciÃ³n'],
    enabled: true,
    icon: 'âš¡',
    color: 'bg-amber-500',
  },
  {
    id: '3',
    name: 'CafeÃ­na',
    category: 'Estimulante',
    dosage: '200mg',
    timing: 'pre-workout',
    frequency: 'workout-days',
    benefits: ['EnergÃ­a', 'Focus', 'Rendimiento', 'TermogÃ©nesis'],
    enabled: true,
    icon: 'â˜•',
    color: 'bg-red-500',
  },
  {
    id: '4',
    name: 'Beta-Alanina',
    category: 'Performance',
    dosage: '3.2g',
    timing: 'pre-workout',
    frequency: 'workout-days',
    benefits: ['Resistencia muscular', 'Buffer de lactato', 'Volumen'],
    enabled: true,
    icon: 'ðŸ”¥',
    color: 'bg-orange-500',
  },
  {
    id: '5',
    name: 'Omega-3',
    category: 'Salud',
    dosage: '2g EPA+DHA',
    timing: 'with-meal',
    frequency: 'daily',
    benefits: ['Antiinflamatorio', 'Salud cardiovascular', 'Articulaciones'],
    enabled: true,
    icon: 'ðŸŸ',
    color: 'bg-cyan-500',
  },
  {
    id: '6',
    name: 'Vitamina D3',
    category: 'Salud',
    dosage: '4000 IU',
    timing: 'morning',
    frequency: 'daily',
    benefits: ['Huesos', 'Sistema inmune', 'Testosterona'],
    enabled: true,
    icon: 'â˜€ï¸',
    color: 'bg-yellow-500',
  },
  {
    id: '7',
    name: 'Magnesio',
    category: 'RecuperaciÃ³n',
    dosage: '400mg',
    timing: 'night',
    frequency: 'daily',
    benefits: ['SueÃ±o', 'RecuperaciÃ³n', 'RelajaciÃ³n muscular'],
    enabled: false,
    icon: 'ðŸŒ™',
    color: 'bg-indigo-500',
  },
  {
    id: '8',
    name: 'ZMA',
    category: 'RecuperaciÃ³n',
    dosage: '1 serving',
    timing: 'night',
    frequency: 'daily',
    benefits: ['Testosterona', 'SueÃ±o profundo', 'RecuperaciÃ³n'],
    enabled: false,
    icon: 'ðŸ’¤',
    color: 'bg-purple-500',
  },
];

const STACKS: SupplementStack[] = [
  {
    id: '1',
    name: 'Stack BÃ¡sico',
    goal: 'Fundamentos esenciales',
    supplements: ['ProteÃ­na Whey', 'Creatina Monohidrato', 'Omega-3', 'Vitamina D3'],
    totalCost: 85,
    monthlyServing: 30,
  },
  {
    id: '2',
    name: 'Stack Performance',
    goal: 'MÃ¡ximo rendimiento en gym',
    supplements: ['ProteÃ­na Whey', 'Creatina Monohidrato', 'CafeÃ­na', 'Beta-Alanina'],
    totalCost: 95,
    monthlyServing: 30,
  },
  {
    id: '3',
    name: 'Stack RecuperaciÃ³n',
    goal: 'Optimizar descanso y recuperaciÃ³n',
    supplements: ['ProteÃ­na Whey', 'Omega-3', 'Magnesio', 'ZMA'],
    totalCost: 90,
    monthlyServing: 30,
  },
];

const INTERACTIONS: Interaction[] = [
  {
    supplement1: 'Creatina Monohidrato',
    supplement2: 'CafeÃ­na',
    type: 'negative',
    description: 'La cafeÃ­na puede reducir la absorciÃ³n de creatina. Separar por 2-3 horas.',
  },
  {
    supplement1: 'ProteÃ­na Whey',
    supplement2: 'Creatina Monohidrato',
    type: 'positive',
    description: 'Sinergia positiva. La proteÃ­na ayuda a transportar creatina al mÃºsculo.',
  },
  {
    supplement1: 'Omega-3',
    supplement2: 'Vitamina D3',
    type: 'positive',
    description: 'Mejor absorciÃ³n cuando se toman juntos con comida grasa.',
  },
  {
    supplement1: 'Magnesio',
    supplement2: 'ZMA',
    type: 'neutral',
    description: 'ZMA ya contiene magnesio. Evitar duplicar dosificaciÃ³n.',
  },
];

export default function SupplementStacks() {
  const [supplements, setSupplements] = useState(SUPPLEMENTS);
  const [activeTab, setActiveTab] = useState<'schedule' | 'stacks' | 'interactions'>('schedule');

  const tabs = [
    { id: 'schedule', label: 'Horarios', icon: 'time' },
    { id: 'stacks', label: 'Stacks', icon: 'layers' },
    { id: 'interactions', label: 'Interacciones', icon: 'git-network' },
  ];

  const toggleSupplement = (id: string) => {
    setSupplements(
      supplements.map((supp) =>
        supp.id === id ? { ...supp, enabled: !supp.enabled } : supp
      )
    );
  };

  const getTimingSchedule = (): TimingSchedule[] => {
    const schedule: TimingSchedule[] = [
      { time: 'MaÃ±ana (06:00)', supplements: [] },
      { time: 'Pre-Entreno (17:30)', supplements: [] },
      { time: 'Post-Entreno (19:00)', supplements: [] },
      { time: 'Con Comida (13:00)', supplements: [] },
      { time: 'Noche (22:00)', supplements: [] },
    ];

    const enabledSupps = supplements.filter((s) => s.enabled);

    enabledSupps.forEach((supp) => {
      let timeSlot: TimingSchedule | undefined;
      
      switch (supp.timing) {
        case 'morning':
          timeSlot = schedule.find((s) => s.time.includes('MaÃ±ana'));
          break;
        case 'pre-workout':
          timeSlot = schedule.find((s) => s.time.includes('Pre-Entreno'));
          break;
        case 'post-workout':
          timeSlot = schedule.find((s) => s.time.includes('Post-Entreno'));
          break;
        case 'with-meal':
          timeSlot = schedule.find((s) => s.time.includes('Con Comida'));
          break;
        case 'night':
          timeSlot = schedule.find((s) => s.time.includes('Noche'));
          break;
      }

      if (timeSlot) {
        timeSlot.supplements.push({
          name: supp.name,
          dosage: supp.dosage,
          icon: supp.icon,
          color: supp.color,
        });
      }
    });

    return schedule.filter((s) => s.supplements.length > 0);
  };

  const getInteractionType = (type: string) => {
    switch (type) {
      case 'positive':
        return { icon: 'checkmark-circle', color: 'text-primary' };
      case 'negative':
        return { icon: 'warning', color: 'text-red-400' };
      default:
        return { icon: 'information-circle', color: 'text-primary/80' };
    }
  };

  const applyStack = (stack: SupplementStack) => {
    Alert.alert(
      `Aplicar ${stack.name}`,
      `Â¿Activar estos suplementos:\n${stack.supplements.join('\n')}`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Aplicar',
          onPress: () => {
            setSupplements(
              supplements.map((supp) => ({
                ...supp,
                enabled: stack.supplements.includes(supp.name),
              }))
            );
            Alert.alert('Stack Aplicado', `${stack.name} configurado`);
          },
        },
      ]
    );
  };

  return (
    <View className="flex-1 bg-zinc-950">
      {/* Header */}
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1 ml-3">
            SuplementaciÃ³n
          </Text>
          <TouchableOpacity>
            <Ionicons name="add-circle" size={28} color="#9D12DE" />
          </TouchableOpacity>
        </View>

        {/* Tabs */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row gap-2">
            {tabs.map((tab) => (
              <TouchableOpacity
                key={tab.id}
                onPress={() => setActiveTab(tab.id as any)}
                className={`flex-row items-center px-4 py-2 rounded-lg ${
                  activeTab === tab.id
                    ? 'bg-primary'
                    : 'bg-zinc-900 border border-zinc-800'
                }`}
              >
                <Ionicons
                  name={tab.icon as any}
                  size={18}
                  color={activeTab === tab.id ? 'white' : '#71717A'}
                />
                <Text
                  className={`ml-2 font-semibold text-sm ${
                    activeTab === tab.id ? 'text-white' : 'text-zinc-400'
                  }`}
                >
                  {tab.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Schedule Tab */}
        {activeTab === 'schedule' && (
          <View className="px-6 pt-6">
            {/* Summary Card */}
            <View className="bg-zinc-900 rounded-xl p-4 border border-zinc-800 mb-6">
              <Text className="text-zinc-400 text-sm mb-2">SUPLEMENTOS ACTIVOS</Text>
              <Text className="text-white text-4xl font-bold mb-3">
                {supplements.filter((s) => s.enabled).length}
              </Text>
              <View className="flex-row flex-wrap gap-2">
                {supplements
                  .filter((s) => s.enabled)
                  .map((supp) => (
                    <View
                      key={supp.id}
                      className="bg-zinc-800 rounded-lg px-3 py-1 flex-row items-center"
                    >
                      <Text className="text-lg mr-1">{supp.icon}</Text>
                      <Text className="text-white text-sm">{supp.name}</Text>
                    </View>
                  ))}
              </View>
            </View>

            {/* Daily Schedule */}
            {getTimingSchedule().map((timeSlot, index) => (
              <View
                key={index}
                className="bg-zinc-900 rounded-xl p-4 mb-4 border border-zinc-800"
              >
                <View className="flex-row items-center mb-3">
                  <Ionicons name="time" size={20} color="#9D12DE" />
                  <Text className="text-white font-bold text-lg ml-2">
                    {timeSlot.time}
                  </Text>
                </View>

                {timeSlot.supplements.map((supp, suppIndex) => (
                  <View
                    key={suppIndex}
                    className="bg-zinc-800 rounded-lg p-3 mb-2 last:mb-0"
                  >
                    <View className="flex-row items-center justify-between">
                      <View className="flex-row items-center flex-1">
                        <Text className="text-2xl mr-3">{supp.icon}</Text>
                        <View className="flex-1">
                          <Text className="text-white font-bold">{supp.name}</Text>
                          <Text className="text-zinc-400 text-sm">{supp.dosage}</Text>
                        </View>
                      </View>
                      <TouchableOpacity className="bg-primary/20 rounded-lg p-2">
                        <Ionicons name="checkmark" size={20} color="#9D12DE" />
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
              </View>
            ))}

            {/* All Supplements */}
            <Text className="text-white font-bold text-lg mb-3">
              Todos los Suplementos
            </Text>
            {supplements.map((supp) => (
              <View
                key={supp.id}
                className="bg-zinc-900 rounded-xl p-4 mb-3 border border-zinc-800"
              >
                <View className="flex-row items-start justify-between mb-3">
                  <View className="flex-row items-start flex-1">
                    <Text className="text-3xl mr-3">{supp.icon}</Text>
                    <View className="flex-1">
                      <Text className="text-white font-bold text-lg mb-1">
                        {supp.name}
                      </Text>
                      <Text className="text-zinc-400 text-sm mb-1">
                        {supp.category}
                      </Text>
                      <Text className="text-primary text-sm font-bold">
                        {supp.dosage}
                      </Text>
                    </View>
                  </View>
                  <Switch
                    value={supp.enabled}
                    onValueChange={() => toggleSupplement(supp.id)}
                    trackColor={{ false: '#3F3F46', true: '#9D12DE' }}
                    thumbColor={supp.enabled ? '#fff' : '#D4D4D8'}
                  />
                </View>

                <View className="flex-row flex-wrap gap-2 mb-3">
                  {supp.benefits.map((benefit, index) => (
                    <View key={index} className="bg-primary/10 rounded-lg px-2 py-1">
                      <Text className="text-primary text-xs">{benefit}</Text>
                    </View>
                  ))}
                </View>

                <View className="flex-row items-center gap-3">
                  <View className="flex-row items-center">
                    <Ionicons name="time" size={14} color="#71717A" />
                    <Text className="text-zinc-400 text-xs ml-1">
                      {supp.timing.replace('-', ' ')}
                    </Text>
                  </View>
                  <View className="flex-row items-center">
                    <Ionicons name="calendar" size={14} color="#71717A" />
                    <Text className="text-zinc-400 text-xs ml-1">
                      {supp.frequency.replace('-', ' ')}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Stacks Tab */}
        {activeTab === 'stacks' && (
          <View className="px-6 pt-6">
            {STACKS.map((stack) => (
              <View
                key={stack.id}
                className="bg-zinc-900 rounded-xl p-4 mb-4 border border-zinc-800"
              >
                <Text className="text-white font-bold text-xl mb-1">{stack.name}</Text>
                <Text className="text-zinc-400 text-sm mb-4">{stack.goal}</Text>

                <View className="mb-4">
                  <Text className="text-zinc-400 text-xs mb-2">INCLUYE</Text>
                  {stack.supplements.map((suppName, index) => {
                    const supp = supplements.find((s) => s.name === suppName);
                    return (
                      <View
                        key={index}
                        className="flex-row items-center py-2 border-b border-zinc-800 last:border-b-0"
                      >
                        <Text className="text-2xl mr-3">{supp?.icon}</Text>
                        <Text className="text-white flex-1">{suppName}</Text>
                        <Ionicons name="checkmark-circle" size={20} color="#9D12DE" />
                      </View>
                    );
                  })}
                </View>

                <View className="flex-row items-center justify-between mb-4">
                  <View>
                    <Text className="text-zinc-400 text-xs">COSTO MENSUAL</Text>
                    <Text className="text-white text-2xl font-bold">
                      ${stack.totalCost}
                    </Text>
                  </View>
                  <View className="items-end">
                    <Text className="text-zinc-400 text-xs">DURACIÃ“N</Text>
                    <Text className="text-white text-2xl font-bold">
                      {stack.monthlyServing} dÃ­as
                    </Text>
                  </View>
                </View>

                <TouchableOpacity
                  onPress={() => applyStack(stack)}
                  className="bg-primary rounded-lg p-3"
                >
                  <Text className="text-white font-bold text-center">
                    Aplicar Stack
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        {/* Interactions Tab */}
        {activeTab === 'interactions' && (
          <View className="px-6 pt-6">
            <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-6">
              <View className="flex-row items-start">
                <Ionicons name="information-circle" size={20} color="#9D12DE" />
                <View className="flex-1 ml-3">
                  <Text className="text-primary/80 font-bold mb-2">
                    Interacciones entre Suplementos
                  </Text>
                  <Text className="text-primary/60 text-sm">
                    Conoce cÃ³mo interactÃºan tus suplementos para optimizar resultados
                  </Text>
                </View>
              </View>
            </View>

            {INTERACTIONS.map((interaction, index) => {
              const interactionType = getInteractionType(interaction.type);
              return (
                <View
                  key={index}
                  className="bg-zinc-900 rounded-xl p-4 mb-4 border border-zinc-800"
                >
                  <View className="flex-row items-center mb-3">
                    <Ionicons
                      name={interactionType.icon as any}
                      size={24}
                      className={interactionType.color}
                    />
                    <Text
                      className={`ml-2 font-bold text-sm ${interactionType.color}`}
                    >
                      {interaction.type === 'positive'
                        ? 'SINERGIA POSITIVA'
                        : interaction.type === 'negative'
                        ? 'INTERFERENCIA'
                        : 'ATENCIÃ“N'}
                    </Text>
                  </View>

                  <View className="flex-row items-center mb-3">
                    <Text className="text-white font-bold">{interaction.supplement1}</Text>
                    <Ionicons name="arrow-forward" size={16} color="#71717A" className="mx-2" />
                    <Text className="text-white font-bold">{interaction.supplement2}</Text>
                  </View>

                  <Text className="text-zinc-300 text-sm">{interaction.description}</Text>
                </View>
              );
            })}
          </View>
        )}

        {/* Info Card */}
        <View className="px-6 pb-6 pt-2">
          <View className="bg-amber-500/10 rounded-xl p-4 border border-amber-500/30">
            <View className="flex-row items-start">
              <Ionicons name="warning" size={20} color="#FFEA00" />
              <View className="flex-1 ml-3">
                <Text className="text-amber-400 font-bold mb-2">
                  Consulta MÃ©dica
                </Text>
                <Text className="text-amber-300 text-sm">
                  Siempre consulta con un profesional antes de comenzar suplementaciÃ³n
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

