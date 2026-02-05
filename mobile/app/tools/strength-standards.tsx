import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface StrengthStandard {
  lift: string;
  icon: string;
  standards: {
    male: {
      beginner: number;
      novice: number;
      intermediate: number;
      advanced: number;
      elite: number;
    };
    female: {
      beginner: number;
      novice: number;
      intermediate: number;
      advanced: number;
      elite: number;
    };
  };
}

// Standards as multipliers of bodyweight
const STRENGTH_STANDARDS: StrengthStandard[] = [
  {
    lift: 'Sentadilla',
    icon: 'ðŸ‹ï¸',
    standards: {
      male: { beginner: 0.75, novice: 1.0, intermediate: 1.5, advanced: 2.0, elite: 2.5 },
      female: { beginner: 0.5, novice: 0.75, intermediate: 1.0, advanced: 1.5, elite: 1.75 },
    },
  },
  {
    lift: 'Press de Banca',
    icon: 'ðŸ’ª',
    standards: {
      male: { beginner: 0.5, novice: 0.75, intermediate: 1.0, advanced: 1.5, elite: 2.0 },
      female: { beginner: 0.3, novice: 0.5, intermediate: 0.75, advanced: 1.0, elite: 1.25 },
    },
  },
  {
    lift: 'Peso Muerto',
    icon: 'ðŸ‹ï¸â€â™‚ï¸',
    standards: {
      male: { beginner: 1.0, novice: 1.5, intermediate: 2.0, advanced: 2.5, elite: 3.0 },
      female: { beginner: 0.75, novice: 1.0, intermediate: 1.5, advanced: 2.0, elite: 2.5 },
    },
  },
  {
    lift: 'Press Militar',
    icon: 'ðŸ¦¾',
    standards: {
      male: { beginner: 0.35, novice: 0.5, intermediate: 0.75, advanced: 1.0, elite: 1.35 },
      female: { beginner: 0.2, novice: 0.35, intermediate: 0.5, advanced: 0.75, elite: 1.0 },
    },
  },
];

export default function StrengthStandards() {
  const [bodyweight, setBodyweight] = useState('75');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [lifts, setLifts] = useState<{ [key: string]: string }>({
    'Sentadilla': '',
    'Press de Banca': '',
    'Peso Muerto': '',
    'Press Militar': '',
  });

  const calculateLevel = (lift: string, weight: number): string => {
    const standard = STRENGTH_STANDARDS.find((s) => s.lift === lift);
    if (!standard || !bodyweight || weight === 0) return 'N/A';

    const bw = parseFloat(bodyweight);
    const ratio = weight / bw;
    const standards = standard.standards[gender];

    if (ratio >= standards.elite) return 'elite';
    if (ratio >= standards.advanced) return 'advanced';
    if (ratio >= standards.intermediate) return 'intermediate';
    if (ratio >= standards.novice) return 'novice';
    return 'beginner';
  };

  const getLevelColor = (level: string): string => {
    const colors: Record<string, string> = {
      beginner: 'red',
      novice: 'amber',
      intermediate: 'blue',
      advanced: 'emerald',
      elite: 'purple',
      'N/A': 'zinc',
    };
    return colors[level] || 'zinc';
  };

  const getLevelLabel = (level: string): string => {
    const labels: Record<string, string> = {
      beginner: 'Principiante',
      novice: 'Novato',
      intermediate: 'Intermedio',
      advanced: 'Avanzado',
      elite: 'Élite',
      'N/A': 'Sin Datos',
    };
    return labels[level] || 'N/A';
  };

  const updateLift = (lift: string, value: string) => {
    setLifts({ ...lifts, [lift]: value });
  };

  const getProgressToNext = (lift: string, weight: number): { next: string; needed: number } | null => {
    const standard = STRENGTH_STANDARDS.find((s) => s.lift === lift);
    if (!standard || !bodyweight || weight === 0) return null;

    const bw = parseFloat(bodyweight);
    const ratio = weight / bw;
    const standards = standard.standards[gender];

    const levels = [
      { name: 'novice', value: standards.novice },
      { name: 'intermediate', value: standards.intermediate },
      { name: 'advanced', value: standards.advanced },
      { name: 'elite', value: standards.elite },
    ];

    for (const level of levels) {
      if (ratio < level.value) {
        const needed = level.value * bw - weight;
        return { next: getLevelLabel(level.name), needed: Math.round(needed * 10) / 10 };
      }
    }

    return null;
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
            Strength Standards
          </Text>
          <TouchableOpacity>
            <Ionicons name="information-circle" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          {/* Info Card */}
          <View className="bg-purple-500/10 rounded-xl p-4 border border-purple-500/30 mb-6">
            <View className="flex-row items-start">
              <Ionicons name="trophy" size={20} color="#A855F7" />
              <View className="flex-1 ml-3">
                <Text className="text-purple-400 font-bold mb-2">
                  Compara Tu Fuerza
                </Text>
                <Text className="text-purple-300 text-sm">
                  Basado en estándares de powerlifting. Los valores son 1RM como ratio de peso corporal.
                </Text>
              </View>
            </View>
          </View>

          {/* Input Section */}
          <View className="bg-zinc-900 rounded-xl p-4 mb-6 border border-zinc-800">
            <Text className="text-white font-bold text-lg mb-4">Tus Datos</Text>

            {/* Gender Selection */}
            <View className="mb-4">
              <Text className="text-zinc-400 text-sm mb-2">Sexo</Text>
              <View className="flex-row gap-2">
                <TouchableOpacity
                  onPress={() => setGender('male')}
                  className={`flex-1 rounded-lg p-3 ${
                    gender === 'male' ? 'bg-primary' : 'bg-zinc-800'
                  }`}
                >
                  <Text className={`text-center font-bold ${
                    gender === 'male' ? 'text-white' : 'text-zinc-400'
                  }`}>
                    Hombre
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setGender('female')}
                  className={`flex-1 rounded-lg p-3 ${
                    gender === 'female' ? 'bg-pink-500' : 'bg-zinc-800'
                  }`}
                >
                  <Text className={`text-center font-bold ${
                    gender === 'female' ? 'text-white' : 'text-zinc-400'
                  }`}>
                    Mujer
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Bodyweight */}
            <View>
              <Text className="text-zinc-400 text-sm mb-2">Peso Corporal (kg)</Text>
              <TextInput
                className="bg-zinc-800 rounded-xl px-4 py-4 text-white text-lg font-bold"
                placeholder="75"
                placeholderTextColor="#71717A"
                value={bodyweight}
                onChangeText={setBodyweight}
                keyboardType="numeric"
              />
            </View>
          </View>

          {/* Lifts */}
          {STRENGTH_STANDARDS.map((standard) => {
            const liftWeight = parseFloat(lifts[standard.lift] || '0');
            const level = calculateLevel(standard.lift, liftWeight);
            const color = getLevelColor(level);
            const progress = getProgressToNext(standard.lift, liftWeight);

            return (
              <View key={standard.lift} className="bg-zinc-900 rounded-xl p-4 mb-4 border border-zinc-800">
                <View className="flex-row items-center mb-3">
                  <View className={`w-12 h-12 bg-${color}-500 rounded-xl items-center justify-center mr-3`}>
                    <Text className="text-2xl">{standard.icon}</Text>
                  </View>
                  <View className="flex-1">
                    <Text className="text-white font-bold text-lg">{standard.lift}</Text>
                    <View className={`bg-${color}-500/10 rounded px-2 py-1 self-start border border-${color}-500/30 mt-1`}>
                      <Text className={`text-${color}-400 text-xs font-bold`}>
                        {getLevelLabel(level)}
                      </Text>
                    </View>
                  </View>
                </View>

                {/* Input */}
                <View className="mb-3">
                  <Text className="text-zinc-400 text-sm mb-2">Tu 1RM (kg)</Text>
                  <TextInput
                    className="bg-zinc-800 rounded-xl px-4 py-3 text-white text-lg font-bold"
                    placeholder="0"
                    placeholderTextColor="#71717A"
                    value={lifts[standard.lift]}
                    onChangeText={(value) => updateLift(standard.lift, value)}
                    keyboardType="numeric"
                  />
                </View>

                {/* Ratio */}
                {bodyweight && liftWeight > 0 && (
                  <View className="bg-zinc-800 rounded-lg p-3 mb-3">
                    <View className="flex-row justify-between items-center">
                      <Text className="text-zinc-400 text-sm">Ratio</Text>
                      <Text className="text-white font-bold text-lg">
                        {(liftWeight / parseFloat(bodyweight)).toFixed(2)}x BW
                      </Text>
                    </View>
                  </View>
                )}

                {/* Progress to Next */}
                {progress && (
                  <View className="bg-primary/10 rounded-lg p-3 border border-primary/30">
                    <View className="flex-row items-center">
                      <Ionicons name="arrow-up" size={16} color="#9D12DE" />
                      <Text className="text-primary text-sm ml-2">
                        +{progress.needed}kg para {progress.next}
                      </Text>
                    </View>
                  </View>
                )}

                {/* Standards Table */}
                <View className="mt-4">
                  <Text className="text-zinc-400 text-xs mb-2">ESTÃNDARES (KG)</Text>
                  <View className="bg-zinc-800 rounded-lg overflow-hidden">
                    {['beginner', 'novice', 'intermediate', 'advanced', 'elite'].map((lvl, index) => {
                      const standardValue = standard.standards[gender][lvl as keyof typeof standard.standards.male];
                      const weightKg = bodyweight ? (parseFloat(bodyweight) * standardValue).toFixed(1) : '0';
                      const levelColor = getLevelColor(lvl);

                      return (
                        <View
                          key={lvl}
                          className={`flex-row items-center justify-between p-2 ${
                            index < 4 ? 'border-b border-zinc-700' : ''
                          } ${level === lvl ? 'bg-zinc-700' : ''}`}
                        >
                          <Text className={`text-${levelColor}-400 font-bold text-sm`}>
                            {getLevelLabel(lvl)}
                          </Text>
                          <View className="flex-row items-center">
                            <Text className="text-zinc-400 text-xs mr-2">{standardValue}x</Text>
                            <Text className="text-white font-bold">{weightKg} kg</Text>
                            {level === lvl && (
                              <Ionicons name="checkmark-circle" size={16} color="#9D12DE" className="ml-2" />
                            )}
                          </View>
                        </View>
                      );
                    })}
                  </View>
                </View>
              </View>
            );
          })}

          {/* Summary */}
          <View className="bg-zinc-900 rounded-xl p-6 mb-6 border border-zinc-800">
            <Text className="text-white font-bold text-lg mb-4">Resumen de Fuerza</Text>
            {STRENGTH_STANDARDS.map((standard) => {
              const liftWeight = parseFloat(lifts[standard.lift] || '0');
              const level = calculateLevel(standard.lift, liftWeight);
              const color = getLevelColor(level);

              return (
                <View key={standard.lift} className="flex-row items-center justify-between mb-3">
                  <View className="flex-row items-center flex-1">
                    <Text className="text-xl mr-2">{standard.icon}</Text>
                    <Text className="text-zinc-300">{standard.lift}</Text>
                  </View>
                  <View className={`bg-${color}-500/10 rounded-lg px-3 py-1 border border-${color}-500/30`}>
                    <Text className={`text-${color}-400 font-bold text-sm`}>
                      {getLevelLabel(level)}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>

          {/* Tips */}
          <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-6">
            <View className="flex-row items-start">
              <Ionicons name="information-circle" size={20} color="#9D12DE" />
              <View className="flex-1 ml-3">
                <Text className="text-primary/80 font-bold mb-2">
                  Notas Importantes
                </Text>
                <Text className="text-primary/60 text-sm">
                  • Estos son estándares generales{'\n'}
                  • Varían según edad y experiencia{'\n'}
                  • Peso corporal influye (más pesado = ratios más bajos típicamente){'\n'}
                  • Enfócate en progreso personal, no solo comparaciones
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

