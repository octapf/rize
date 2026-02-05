import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  TextInput,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface InjuryRecord {
  id: string;
  bodyPart: string;
  type: 'pain' | 'injury' | 'discomfort';
  severity: 1 | 2 | 3 | 4 | 5;
  date: string;
  notes: string;
  status: 'active' | 'healing' | 'recovered';
  affectedExercises: string[];
}

interface MobilityScore {
  bodyPart: string;
  score: number;
  maxScore: number;
  tests: {
    name: string;
    result: string;
    passed: boolean;
  }[];
}

interface AsymmetryDetection {
  bodyPart: string;
  leftValue: number;
  rightValue: number;
  difference: number;
  differencePercent: number;
  severity: 'normal' | 'minor' | 'moderate' | 'severe';
}

const INJURY_RECORDS: InjuryRecord[] = [
  {
    id: '1',
    bodyPart: 'Hombro Derecho',
    type: 'pain',
    severity: 3,
    date: '2025-01-25T10:00:00',
    notes: 'Dolor al presionar por encima de la cabeza. Posible inflamaciÃ³n del manguito rotador.',
    status: 'active',
    affectedExercises: ['Press militar', 'Press banca inclinado', 'Dominadas'],
  },
  {
    id: '2',
    bodyPart: 'Rodilla Izquierda',
    type: 'discomfort',
    severity: 2,
    date: '2025-01-22T15:30:00',
    notes: 'Molestia leve durante sentadillas profundas. MejorÃ³ con stretching.',
    status: 'healing',
    affectedExercises: ['Sentadilla profunda', 'Pistol squats', 'Lunges'],
  },
  {
    id: '3',
    bodyPart: 'Espalda Baja',
    type: 'pain',
    severity: 4,
    date: '2025-01-15T08:00:00',
    notes: 'Dolor agudo despuÃ©s de peso muerto con mala tÃ©cnica. Reposo total 7 dÃ­as.',
    status: 'recovered',
    affectedExercises: ['Peso muerto', 'Sentadilla', 'Good mornings'],
  },
];

const MOBILITY_SCORES: MobilityScore[] = [
  {
    bodyPart: 'Hombros',
    score: 32,
    maxScore: 40,
    tests: [
      { name: 'RotaciÃ³n externa', result: '85Â°', passed: true },
      { name: 'RotaciÃ³n interna', result: '60Â°', passed: false },
      { name: 'FlexiÃ³n overhead', result: 'Completa', passed: true },
      { name: 'AbducciÃ³n horizontal', result: 'Limitada', passed: false },
    ],
  },
  {
    bodyPart: 'Caderas',
    score: 38,
    maxScore: 40,
    tests: [
      { name: 'FlexiÃ³n de cadera', result: '>90Â°', passed: true },
      { name: 'Sentadilla profunda', result: 'ATG', passed: true },
      { name: 'Split squat', result: 'Balanceado', passed: true },
      { name: 'RotaciÃ³n externa', result: 'Normal', passed: true },
    ],
  },
  {
    bodyPart: 'Tobillos',
    score: 28,
    maxScore: 40,
    tests: [
      { name: 'DorsiflexiÃ³n', result: '35Â°', passed: false },
      { name: 'Prueba rodilla-pared', result: '8cm', passed: false },
      { name: 'Equilibrio single-leg', result: '20 seg', passed: true },
      { name: 'PlantarflexiÃ³n', result: 'Normal', passed: true },
    ],
  },
];

const ASYMMETRIES: AsymmetryDetection[] = [
  {
    bodyPart: 'Fuerza en Press Banca',
    leftValue: 42,
    rightValue: 48,
    difference: 6,
    differencePercent: 12.5,
    severity: 'moderate',
  },
  {
    bodyPart: 'Circunferencia Brazo',
    leftValue: 41.5,
    rightValue: 42,
    difference: 0.5,
    differencePercent: 1.2,
    severity: 'normal',
  },
  {
    bodyPart: 'Sentadilla BÃºlgara',
    leftValue: 30,
    rightValue: 35,
    difference: 5,
    differencePercent: 14.3,
    severity: 'moderate',
  },
  {
    bodyPart: 'Flexibilidad Isquiotibiales',
    leftValue: 68,
    rightValue: 75,
    difference: 7,
    differencePercent: 9.3,
    severity: 'minor',
  },
];

export default function InjuryPrevention() {
  const [injuries, setInjuries] = useState(INJURY_RECORDS);
  const [activeTab, setActiveTab] = useState<'injuries' | 'mobility' | 'asymmetry'>('injuries');

  const tabs = [
    { id: 'injuries', label: 'Lesiones', icon: 'bandage' },
    { id: 'mobility', label: 'Movilidad', icon: 'body' },
    { id: 'asymmetry', label: 'AsimetrÃ­as', icon: 'git-compare' },
  ];

  const addInjury = () => {
    Alert.alert(
      'Registrar LesiÃ³n/Dolor',
      'Documenta cualquier molestia para seguimiento',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Registrar', onPress: () => Alert.alert('LesiÃ³n registrada') },
      ]
    );
  };

  const updateInjuryStatus = (id: string) => {
    Alert.alert(
      'Actualizar Estado',
      'Â¿CÃ³mo estÃ¡ evolucionando?',
      [
        {
          text: 'Activa',
          onPress: () =>
            setInjuries(
              injuries.map((injury) =>
                injury.id === id ? { ...injury, status: 'active' } : injury
              )
            ),
        },
        {
          text: 'Sanando',
          onPress: () =>
            setInjuries(
              injuries.map((injury) =>
                injury.id === id ? { ...injury, status: 'healing' } : injury
              )
            ),
        },
        {
          text: 'Recuperada',
          onPress: () =>
            setInjuries(
              injuries.map((injury) =>
                injury.id === id ? { ...injury, status: 'recovered' } : injury
              )
            ),
        },
        { text: 'Cancelar', style: 'cancel' },
      ]
    );
  };

  const getSeverityColor = (severity: number) => {
    if (severity <= 2) return 'text-primary';
    if (severity <= 3) return 'text-amber-400';
    return 'text-red-400';
  };

  const getSeverityLabel = (severity: number) => {
    if (severity <= 2) return 'Leve';
    if (severity <= 3) return 'Moderado';
    return 'Severo';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-red-500/10 border-red-500/30 text-red-400';
      case 'healing':
        return 'bg-amber-500/10 border-amber-500/30 text-amber-400';
      case 'recovered':
        return 'bg-primary/10 border-primary/30 text-primary';
      default:
        return 'bg-zinc-800 border-zinc-700 text-zinc-400';
    }
  };

  const getAsymmetrySeverityColor = (severity: string) => {
    switch (severity) {
      case 'normal':
        return 'text-primary';
      case 'minor':
        return 'text-primary/80';
      case 'moderate':
        return 'text-amber-400';
      case 'severe':
        return 'text-red-400';
      default:
        return 'text-zinc-400';
    }
  };

  const getAsymmetrySeverityLabel = (severity: string) => {
    switch (severity) {
      case 'normal':
        return 'Normal';
      case 'minor':
        return 'Menor';
      case 'moderate':
        return 'Moderada';
      case 'severe':
        return 'Severa';
      default:
        return severity;
    }
  };

  const formatDate = (date: string) => {
    const d = new Date(date);
    return d.toLocaleDateString('es-ES', { day: '2-digit', month: 'short' });
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
            PrevenciÃ³n de Lesiones
          </Text>
          <TouchableOpacity onPress={addInjury}>
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
        {/* Injuries Tab */}
        {activeTab === 'injuries' && (
          <View className="px-6 pt-6">
            {/* Summary Card */}
            <View className="bg-zinc-900 rounded-xl p-4 border border-zinc-800 mb-6">
              <View className="flex-row items-center justify-between mb-3">
                <View className="flex-1">
                  <Text className="text-zinc-400 text-xs mb-1">Activas</Text>
                  <Text className="text-white text-2xl font-bold">
                    {injuries.filter((i) => i.status === 'active').length}
                  </Text>
                </View>
                <View className="flex-1">
                  <Text className="text-zinc-400 text-xs mb-1">Sanando</Text>
                  <Text className="text-amber-400 text-2xl font-bold">
                    {injuries.filter((i) => i.status === 'healing').length}
                  </Text>
                </View>
                <View className="flex-1">
                  <Text className="text-zinc-400 text-xs mb-1">Recuperadas</Text>
                  <Text className="text-primary text-2xl font-bold">
                    {injuries.filter((i) => i.status === 'recovered').length}
                  </Text>
                </View>
              </View>
            </View>

            {/* Injury Records */}
            {injuries.map((injury) => (
              <View
                key={injury.id}
                className="bg-zinc-900 rounded-xl p-4 mb-4 border border-zinc-800"
              >
                {/* Header */}
                <View className="flex-row items-start justify-between mb-3">
                  <View className="flex-1">
                    <Text className="text-white font-bold text-lg mb-1">
                      {injury.bodyPart}
                    </Text>
                    <Text className="text-zinc-400 text-sm">{formatDate(injury.date)}</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => updateInjuryStatus(injury.id)}
                    className={`px-3 py-1 rounded-lg border ${getStatusColor(injury.status)}`}
                  >
                    <Text className={`text-xs font-bold ${getStatusColor(injury.status)}`}>
                      {injury.status === 'active'
                        ? 'ACTIVA'
                        : injury.status === 'healing'
                        ? 'SANANDO'
                        : 'RECUPERADA'}
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* Severity */}
                <View className="flex-row items-center mb-3">
                  <Text className="text-zinc-400 text-sm mr-2">Severidad:</Text>
                  <View className="flex-row">
                    {[1, 2, 3, 4, 5].map((level) => (
                      <View
                        key={level}
                        className={`w-6 h-2 rounded-full mr-1 ${
                          level <= injury.severity ? 'bg-red-500' : 'bg-zinc-700'
                        }`}
                      />
                    ))}
                  </View>
                  <Text className={`ml-2 font-bold ${getSeverityColor(injury.severity)}`}>
                    {getSeverityLabel(injury.severity)}
                  </Text>
                </View>

                {/* Notes */}
                <View className="bg-zinc-800 rounded-lg p-3 mb-3">
                  <Text className="text-zinc-300 text-sm">{injury.notes}</Text>
                </View>

                {/* Affected Exercises */}
                <View className="mb-3">
                  <Text className="text-zinc-400 text-xs mb-2">EJERCICIOS AFECTADOS</Text>
                  <View className="flex-row flex-wrap gap-2">
                    {injury.affectedExercises.map((exercise, index) => (
                      <View key={index} className="bg-red-500/10 rounded-lg px-3 py-1">
                        <Text className="text-red-400 text-xs">{exercise}</Text>
                      </View>
                    ))}
                  </View>
                </View>

                {/* Actions */}
                <View className="flex-row gap-2">
                  <TouchableOpacity className="flex-1 bg-primary/10 rounded-lg p-3 border border-primary/30">
                    <Text className="text-primary/80 text-sm font-bold text-center">
                      Ver Protocolo
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity className="flex-1 bg-primary/10 rounded-lg p-3 border border-primary/30">
                    <Text className="text-primary text-sm font-bold text-center">
                      Actualizar
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Mobility Tab */}
        {activeTab === 'mobility' && (
          <View className="px-6 pt-6">
            {/* Overall Score */}
            <View className="bg-zinc-900 rounded-xl p-4 border border-zinc-800 mb-6">
              <Text className="text-zinc-400 text-sm mb-2">PUNTAJE GENERAL</Text>
              <View className="flex-row items-end mb-2">
                <Text className="text-white text-4xl font-bold">
                  {Math.round(
                    (MOBILITY_SCORES.reduce((sum, s) => sum + s.score, 0) /
                      MOBILITY_SCORES.reduce((sum, s) => sum + s.maxScore, 0)) *
                      100
                  )}
                </Text>
                <Text className="text-zinc-400 text-xl ml-1 mb-1">/ 100</Text>
              </View>
              <View className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                <View
                  className="h-full bg-primary rounded-full"
                  style={{
                    width: `${
                      (MOBILITY_SCORES.reduce((sum, s) => sum + s.score, 0) /
                        MOBILITY_SCORES.reduce((sum, s) => sum + s.maxScore, 0)) *
                      100
                    }%`,
                  }}
                />
              </View>
            </View>

            {/* Mobility Scores */}
            {MOBILITY_SCORES.map((mobility, index) => (
              <View
                key={index}
                className="bg-zinc-900 rounded-xl p-4 mb-4 border border-zinc-800"
              >
                {/* Header */}
                <View className="flex-row items-center justify-between mb-4">
                  <View className="flex-1">
                    <Text className="text-white font-bold text-lg mb-1">
                      {mobility.bodyPart}
                    </Text>
                    <Text className="text-zinc-400 text-sm">
                      {mobility.score} / {mobility.maxScore} puntos
                    </Text>
                  </View>
                  <View className="items-center">
                    <Text className="text-primary text-3xl font-bold">
                      {Math.round((mobility.score / mobility.maxScore) * 100)}%
                    </Text>
                  </View>
                </View>

                {/* Progress Bar */}
                <View className="h-2 bg-zinc-800 rounded-full overflow-hidden mb-4">
                  <View
                    className="h-full bg-primary rounded-full"
                    style={{
                      width: `${(mobility.score / mobility.maxScore) * 100}%`,
                    }}
                  />
                </View>

                {/* Tests */}
                <View>
                  <Text className="text-zinc-400 text-xs mb-2">PRUEBAS</Text>
                  {mobility.tests.map((test, testIndex) => (
                    <View
                      key={testIndex}
                      className="flex-row items-center justify-between py-2 border-b border-zinc-800 last:border-b-0"
                    >
                      <View className="flex-1">
                        <Text className="text-white text-sm">{test.name}</Text>
                        <Text className="text-zinc-400 text-xs">{test.result}</Text>
                      </View>
                      <Ionicons
                        name={test.passed ? 'checkmark-circle' : 'close-circle'}
                        size={20}
                        color={test.passed ? '#9D12DE' : '#EF4444'}
                      />
                    </View>
                  ))}
                </View>

                {/* Action */}
                <TouchableOpacity className="bg-primary/10 rounded-lg p-3 border border-primary/30 mt-4">
                  <Text className="text-primary text-sm font-bold text-center">
                    Realizar EvaluaciÃ³n
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        {/* Asymmetry Tab */}
        {activeTab === 'asymmetry' && (
          <View className="px-6 pt-6">
            {/* Info Card */}
            <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-6">
              <View className="flex-row items-start">
                <Ionicons name="information-circle" size={20} color="#9D12DE" />
                <View className="flex-1 ml-3">
                  <Text className="text-primary/80 font-bold mb-2">
                    DetecciÃ³n de AsimetrÃ­as
                  </Text>
                  <Text className="text-primary/60 text-sm">
                    Las diferencias mayores al 10% pueden aumentar riesgo de lesiones.
                    Trabaja el lado dÃ©bil individualmente.
                  </Text>
                </View>
              </View>
            </View>

            {/* Asymmetries */}
            {ASYMMETRIES.map((asymmetry, index) => (
              <View
                key={index}
                className="bg-zinc-900 rounded-xl p-4 mb-4 border border-zinc-800"
              >
                {/* Header */}
                <View className="flex-row items-start justify-between mb-3">
                  <View className="flex-1">
                    <Text className="text-white font-bold text-lg mb-1">
                      {asymmetry.bodyPart}
                    </Text>
                    <Text
                      className={`text-sm font-bold ${getAsymmetrySeverityColor(
                        asymmetry.severity
                      )}`}
                    >
                      {getAsymmetrySeverityLabel(asymmetry.severity)} â€¢{' '}
                      {asymmetry.differencePercent.toFixed(1)}% diferencia
                    </Text>
                  </View>
                </View>

                {/* Comparison */}
                <View className="bg-zinc-800 rounded-lg p-3 mb-3">
                  <View className="flex-row items-center justify-between mb-2">
                    <View className="flex-1">
                      <Text className="text-zinc-400 text-xs mb-1">IZQUIERDO</Text>
                      <Text className="text-white text-2xl font-bold">
                        {asymmetry.leftValue}
                      </Text>
                    </View>
                    <Ionicons name="git-compare" size={24} color="#71717A" />
                    <View className="flex-1 items-end">
                      <Text className="text-zinc-400 text-xs mb-1">DERECHO</Text>
                      <Text className="text-white text-2xl font-bold">
                        {asymmetry.rightValue}
                      </Text>
                    </View>
                  </View>
                  <View className="pt-2 border-t border-zinc-700">
                    <Text className="text-zinc-400 text-xs text-center">
                      Diferencia: {asymmetry.difference} unidades
                    </Text>
                  </View>
                </View>

                {/* Visual Bar */}
                <View className="mb-4">
                  <View className="flex-row gap-2">
                    <View className="flex-1">
                      <View className="h-3 bg-zinc-800 rounded-full overflow-hidden">
                        <View
                          className="h-full bg-primary rounded-full"
                          style={{
                            width: `${
                              (asymmetry.leftValue /
                                Math.max(asymmetry.leftValue, asymmetry.rightValue)) *
                              100
                            }%`,
                          }}
                        />
                      </View>
                    </View>
                    <View className="flex-1">
                      <View className="h-3 bg-zinc-800 rounded-full overflow-hidden">
                        <View
                          className="h-full bg-primary rounded-full"
                          style={{
                            width: `${
                              (asymmetry.rightValue /
                                Math.max(asymmetry.leftValue, asymmetry.rightValue)) *
                              100
                            }%`,
                          }}
                        />
                      </View>
                    </View>
                  </View>
                </View>

                {/* Recommendation */}
                {asymmetry.severity !== 'normal' && (
                  <View className="bg-amber-500/10 rounded-lg p-3 border border-amber-500/30">
                    <View className="flex-row items-start">
                      <Ionicons name="warning" size={16} color="#FFEA00" />
                      <Text className="text-amber-300 text-sm ml-2 flex-1">
                        {asymmetry.leftValue < asymmetry.rightValue
                          ? 'Trabaja mÃ¡s el lado izquierdo con ejercicios unilaterales'
                          : 'Trabaja mÃ¡s el lado derecho con ejercicios unilaterales'}
                      </Text>
                    </View>
                  </View>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Bottom Tip */}
        <View className="px-6 pb-6 pt-2">
          <View className="bg-primary/10 rounded-xl p-4 border border-primary/30">
            <View className="flex-row items-start">
              <Ionicons name="fitness" size={20} color="#9D12DE" />
              <View className="flex-1 ml-3">
                <Text className="text-primary font-bold mb-2">
                  PrevenciÃ³n es Clave
                </Text>
                <Text className="text-primary/80 text-sm">
                  Movilidad + TÃ©cnica + ProgresiÃ³n Inteligente = Cero Lesiones
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}


