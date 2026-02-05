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

interface Injury {
  id: string;
  name: string;
  bodyPart: string;
  severity: 'low' | 'medium' | 'high';
  status: 'active' | 'recovering' | 'healed';
  startDate: string;
  painLevel: number;
  notes: string;
  restrictions: string[];
}

interface RecoveryProtocol {
  id: string;
  name: string;
  description: string;
  duration: string;
  steps: string[];
  icon: string;
}

const INJURIES: Injury[] = [
  {
    id: '1',
    name: 'Dolor de hombro derecho',
    bodyPart: 'Hombro',
    severity: 'medium',
    status: 'recovering',
    startDate: '2024-01-15',
    painLevel: 4,
    notes: 'Dolor al hacer press overhead. Probablemente tendinitis del manguito rotador.',
    restrictions: ['Press militar', 'Elevaciones laterales pesadas', 'Handstand push-ups'],
  },
  {
    id: '2',
    name: 'Molestia en rodilla izquierda',
    bodyPart: 'Rodilla',
    severity: 'low',
    status: 'active',
    startDate: '2024-01-25',
    painLevel: 2,
    notes: 'Ligero dolor después de sentadillas profundas',
    restrictions: ['Pistol squats', 'Sentadillas ATG'],
  },
];

const RECOVERY_PROTOCOLS: RecoveryProtocol[] = [
  {
    id: '1',
    name: 'Protocolo para Tendinitis de Hombro',
    description: 'Recuperación conservadora para lesiones del manguito rotador',
    duration: '4-6 semanas',
    icon: 'medical',
    steps: [
      'Semana 1-2: Reposo relativo, hielo 3x/día, antiinflamatorios',
      'Semana 3-4: Ejercicios de movilidad sin peso',
      'Semana 5-6: Progresión gradual con bandas elásticas',
      'Semana 7+: Reintroducción de ejercicios con peso ligero',
    ],
  },
  {
    id: '2',
    name: 'Protocolo RICE para Articulaciones',
    description: 'Rest, Ice, Compression, Elevation',
    duration: '3-7 días',
    icon: 'snow',
    steps: [
      'Reposo: Evitar actividades que causen dolor',
      'Hielo: Aplicar 15-20 min cada 2-3 horas',
      'Compresión: Venda elástica moderada',
      'Elevación: Mantener por encima del nivel del corazón',
    ],
  },
  {
    id: '3',
    name: 'Fortalecimiento Preventivo',
    description: 'Ejercicios para prevenir lesiones recurrentes',
    duration: 'Continuo',
    icon: 'shield-checkmark',
    steps: [
      'Rotaciones externas con banda: 3x15',
      'Face pulls: 3x20',
      'Ejercicios de estabilidad escapular',
      'Movilidad articular diaria',
    ],
  },
];

const BODY_PARTS = [
  'Hombro',
  'Codo',
  'Muñeca',
  'Espalda Baja',
  'Rodilla',
  'Tobillo',
  'Cuello',
  'Otro',
];

export default function InjuryRecovery() {
  const [injuries, setInjuries] = useState(INJURIES);
  const [selectedTab, setSelectedTab] = useState<'active' | 'protocols' | 'prevention'>('active');

  const tabs = [
    { id: 'active' as const, label: 'Lesiones', icon: 'bandage' },
    { id: 'protocols' as const, label: 'Protocolos', icon: 'fitness' },
    { id: 'prevention' as const, label: 'Prevención', icon: 'shield' },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low':
        return '#9D12DE';
      case 'medium':
        return '#FFEA00';
      case 'high':
        return '#EF4444';
      default:
        return '#71717A';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active':
        return 'Activa';
      case 'recovering':
        return 'Recuperando';
      case 'healed':
        return 'Sanada';
      default:
        return status;
    }
  };

  const addInjury = () => {
    Alert.alert(
      'Nueva Lesión',
      '¿Qué parte del cuerpo te duele?',
      BODY_PARTS.map((part) => ({
        text: part,
        onPress: () => {
          Alert.prompt(
            'Describe la lesión',
            `¿Qué tipo de dolor sientes en ${part}?`,
            [
              { text: 'Cancelar', style: 'cancel' },
              {
                text: 'Crear',
                onPress: (description) => {
                  const newInjury: Injury = {
                    id: Date.now().toString(),
                    name: description || `Dolor en ${part}`,
                    bodyPart: part,
                    severity: 'medium',
                    status: 'active',
                    startDate: new Date().toISOString().split('T')[0],
                    painLevel: 5,
                    notes: '',
                    restrictions: [],
                  };
                  setInjuries((prev) => [...prev, newInjury]);
                  Alert.alert('Lesión registrada', 'Recuerda consultar a un profesional');
                },
              },
            ]
          );
        },
      })).concat([{ text: 'Cancelar', style: 'cancel' }])
    );
  };

  const updatePainLevel = (injuryId: string, newLevel: number) => {
    setInjuries((prev) =>
      prev.map((inj) =>
        inj.id === injuryId ? { ...inj, painLevel: newLevel } : inj
      )
    );
  };

  const markAsHealed = (injuryId: string) => {
    Alert.alert(
      'Marcar como Sanada',
      '¿Esta lesión está completamente recuperada?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Sí, está sanada',
          onPress: () => {
            setInjuries((prev) =>
              prev.map((inj) =>
                inj.id === injuryId ? { ...inj, status: 'healed' } : inj
              )
            );
            Alert.alert('¡Genial!', 'Lesión marcada como sanada');
          },
        },
      ]
    );
  };

  const activeInjuries = injuries.filter((i) => i.status !== 'healed');
  const healedInjuries = injuries.filter((i) => i.status === 'healed');

  return (
    <View className="flex-1 bg-zinc-950">
      {/* Header */}
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center justify-between mb-3">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1 ml-3">
            Lesiones y Recuperación
          </Text>
          <TouchableOpacity onPress={addInjury}>
            <Ionicons name="add-circle-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View className="flex-row gap-3">
          <View className="flex-1 bg-zinc-900 rounded-xl p-3 border border-zinc-800">
            <Text className="text-zinc-400 text-xs">Activas</Text>
            <Text className="text-red-500 text-2xl font-bold">
              {activeInjuries.length}
            </Text>
          </View>
          <View className="flex-1 bg-zinc-900 rounded-xl p-3 border border-zinc-800">
            <Text className="text-zinc-400 text-xs">Sanadas</Text>
            <Text className="text-primary text-2xl font-bold">
              {healedInjuries.length}
            </Text>
          </View>
        </View>
      </View>

      {/* Tabs */}
      <View className="flex-row px-6 pt-4 border-b border-zinc-800">
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            onPress={() => setSelectedTab(tab.id)}
            className={`flex-1 pb-3 border-b-2 ${
              selectedTab === tab.id ? 'border-primary' : 'border-transparent'
            }`}
          >
            <View className="flex-row items-center justify-center">
              <Ionicons
                name={tab.icon as any}
                size={18}
                color={selectedTab === tab.id ? '#9D12DE' : '#71717A'}
              />
              <Text
                className={`ml-2 font-semibold ${
                  selectedTab === tab.id ? 'text-primary' : 'text-zinc-400'
                }`}
              >
                {tab.label}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Active Injuries Tab */}
        {selectedTab === 'active' && (
          <View className="px-6 py-4">
            {activeInjuries.length === 0 ? (
              <View className="bg-primary/10 rounded-xl p-6 border border-primary/30">
                <Ionicons
                  name="shield-checkmark"
                  size={48}
                  color="#9D12DE"
                  style={{ alignSelf: 'center', marginBottom: 12 }}
                />
                <Text className="text-primary font-bold text-center text-lg">
                  ¡Sin lesiones activas!
                </Text>
                <Text className="text-primary/80 text-center mt-2">
                  Sigue entrenando de forma inteligente para mantenerte libre de
                  lesiones
                </Text>
              </View>
            ) : (
              activeInjuries.map((injury) => (
                <View
                  key={injury.id}
                  className="bg-zinc-900 rounded-xl p-4 mb-3 border border-zinc-800"
                >
                  <View className="flex-row items-start justify-between mb-3">
                    <View className="flex-1">
                      <View className="flex-row items-center mb-2">
                        <View
                          className="px-2 py-1 rounded"
                          style={{ backgroundColor: getSeverityColor(injury.severity) + '20' }}
                        >
                          <Text
                            className="text-xs font-bold"
                            style={{ color: getSeverityColor(injury.severity) }}
                          >
                            {injury.bodyPart}
                          </Text>
                        </View>
                        <View className="ml-2 px-2 py-1 rounded bg-zinc-800">
                          <Text className="text-zinc-400 text-xs font-bold">
                            {getStatusLabel(injury.status)}
                          </Text>
                        </View>
                      </View>
                      <Text className="text-white font-bold text-lg">
                        {injury.name}
                      </Text>
                      <Text className="text-zinc-400 text-sm mt-1">
                        Desde {injury.startDate}
                      </Text>
                    </View>
                  </View>

                  {/* Pain Level */}
                  <View className="mb-3">
                    <View className="flex-row items-center justify-between mb-2">
                      <Text className="text-zinc-400 text-sm">Nivel de Dolor</Text>
                      <Text
                        className="font-bold"
                        style={{
                          color:
                            injury.painLevel <= 3
                              ? '#9D12DE'
                              : injury.painLevel <= 6
                              ? '#FFEA00'
                              : '#EF4444',
                        }}
                      >
                        {injury.painLevel}/10
                      </Text>
                    </View>
                    <View className="flex-row gap-1">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((level) => (
                        <TouchableOpacity
                          key={level}
                          onPress={() => updatePainLevel(injury.id, level)}
                          className={`flex-1 h-2 rounded-full ${
                            level <= injury.painLevel
                              ? injury.painLevel <= 3
                                ? 'bg-primary'
                                : injury.painLevel <= 6
                                ? 'bg-amber-500'
                                : 'bg-red-500'
                              : 'bg-zinc-800'
                          }`}
                        />
                      ))}
                    </View>
                  </View>

                  {/* Notes */}
                  {injury.notes && (
                    <View className="bg-zinc-800 rounded-lg p-3 mb-3">
                      <Text className="text-zinc-300 text-sm">{injury.notes}</Text>
                    </View>
                  )}

                  {/* Restrictions */}
                  {injury.restrictions.length > 0 && (
                    <View className="mb-3">
                      <Text className="text-zinc-400 text-xs font-semibold mb-2">
                        Ejercicios restringidos:
                      </Text>
                      {injury.restrictions.map((restriction, index) => (
                        <View key={index} className="flex-row items-center mb-1">
                          <Ionicons name="close-circle" size={14} color="#EF4444" />
                          <Text className="text-zinc-300 text-sm ml-2">
                            {restriction}
                          </Text>
                        </View>
                      ))}
                    </View>
                  )}

                  {/* Actions */}
                  <View className="flex-row gap-2">
                    <TouchableOpacity
                      onPress={() => markAsHealed(injury.id)}
                      className="flex-1 bg-primary/20 rounded-lg p-2"
                    >
                      <Text className="text-primary text-center text-sm font-semibold">
                        Marcar Sanada
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="flex-1 bg-zinc-800 rounded-lg p-2">
                      <Text className="text-white text-center text-sm font-semibold">
                        Ver Protocolo
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            )}

            {/* Healed Injuries */}
            {healedInjuries.length > 0 && (
              <View className="mt-6">
                <Text className="text-white font-bold text-lg mb-3">
                  Historial (Sanadas)
                </Text>
                {healedInjuries.map((injury) => (
                  <View
                    key={injury.id}
                    className="bg-zinc-900/50 rounded-xl p-4 mb-3 border border-zinc-800"
                  >
                    <View className="flex-row items-center">
                      <Ionicons name="checkmark-circle" size={24} color="#9D12DE" />
                      <View className="flex-1 ml-3">
                        <Text className="text-zinc-400 font-bold">{injury.name}</Text>
                        <Text className="text-zinc-500 text-sm mt-0.5">
                          {injury.bodyPart} • {injury.startDate}
                        </Text>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            )}
          </View>
        )}

        {/* Recovery Protocols Tab */}
        {selectedTab === 'protocols' && (
          <View className="px-6 py-4">
            <Text className="text-white font-bold text-lg mb-3">
              Protocolos de Recuperación
            </Text>

            {RECOVERY_PROTOCOLS.map((protocol) => (
              <View
                key={protocol.id}
                className="bg-zinc-900 rounded-xl p-4 mb-3 border border-zinc-800"
              >
                <View className="flex-row items-center mb-3">
                  <View className="bg-primary/20 w-12 h-12 rounded-xl items-center justify-center">
                    <Ionicons name={protocol.icon as any} size={24} color="#9D12DE" />
                  </View>
                  <View className="flex-1 ml-3">
                    <Text className="text-white font-bold">{protocol.name}</Text>
                    <Text className="text-zinc-400 text-sm mt-0.5">
                      {protocol.duration}
                    </Text>
                  </View>
                </View>

                <Text className="text-zinc-300 text-sm mb-3">
                  {protocol.description}
                </Text>

                <View className="bg-zinc-800 rounded-lg p-3">
                  {protocol.steps.map((step, index) => (
                    <View key={index} className="flex-row items-start mb-2 last:mb-0">
                      <Text className="text-primary/80 font-bold mr-2">
                        {index + 1}.
                      </Text>
                      <Text className="text-zinc-300 text-sm flex-1">{step}</Text>
                    </View>
                  ))}
                </View>

                <TouchableOpacity className="bg-primary rounded-lg p-3 mt-3">
                  <Text className="text-white text-center font-semibold">
                    Iniciar Protocolo
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        {/* Prevention Tab */}
        {selectedTab === 'prevention' && (
          <View className="px-6 py-4 pb-6">
            <Text className="text-white font-bold text-lg mb-3">
              Prevención de Lesiones
            </Text>

            <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-3">
              <View className="flex-row items-start">
                <Ionicons name="shield-checkmark" size={24} color="#9D12DE" />
                <View className="flex-1 ml-3">
                  <Text className="text-primary font-bold mb-2">
                    Calentamiento Adecuado
                  </Text>
                  <Text className="text-primary/80 text-sm leading-5">
                    • 5-10 min de movilidad articular{'\n'}• Activación muscular
                    específica{'\n'}• Series de calentamiento progresivas
                  </Text>
                </View>
              </View>
            </View>

            <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-3">
              <View className="flex-row items-start">
                <Ionicons name="fitness" size={24} color="#9D12DE" />
                <View className="flex-1 ml-3">
                  <Text className="text-primary font-bold mb-2">
                    Progresión Gradual
                  </Text>
                  <Text className="text-primary/60 text-sm leading-5">
                    • No aumentar volumen más de 10% semanal{'\n'}• Respetar días de
                    descanso{'\n'}• Escuchar las señales del cuerpo
                  </Text>
                </View>
              </View>
            </View>

            <View className="bg-amber-500/10 rounded-xl p-4 border border-amber-500/30 mb-3">
              <View className="flex-row items-start">
                <Ionicons name="accessibility" size={24} color="#FFEA00" />
                <View className="flex-1 ml-3">
                  <Text className="text-amber-500 font-bold mb-2">
                    Trabajo de Movilidad
                  </Text>
                  <Text className="text-amber-300 text-sm leading-5">
                    • Estiramientos dinámicos pre-workout{'\n'}• Estiramientos
                    estáticos post-workout{'\n'}• Trabajo de fascia y liberación
                    miofascial
                  </Text>
                </View>
              </View>
            </View>

            <View className="bg-purple-500/10 rounded-xl p-4 border border-purple-500/30">
              <View className="flex-row items-start">
                <Ionicons name="trending-up" size={24} color="#8B5CF6" />
                <View className="flex-1 ml-3">
                  <Text className="text-purple-500 font-bold mb-2">
                    Fortalecimiento Preventivo
                  </Text>
                  <Text className="text-purple-300 text-sm leading-5">
                    • Trabajo de estabilizadores{'\n'}• Ejercicios unilaterales{'\n'}•
                    Fortalecimiento de puntos débiles
                  </Text>
                </View>
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}


