import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface WorkoutTemplate {
  id: string;
  name: string;
  goal: 'fat-loss' | 'muscle-gain' | 'strength' | 'endurance' | 'athlete';
  duration: number;
  daysPerWeek: number;
  difficulty: 'principiante' | 'intermedio' | 'avanzado';
  description: string;
  features: string[];
  sampleWeek: {
    day: string;
    focus: string;
    duration: number;
  }[];
}

const TEMPLATES: WorkoutTemplate[] = [
  {
    id: '1',
    name: 'DefiniciÃ³n Extrema',
    goal: 'fat-loss',
    duration: 8,
    daysPerWeek: 6,
    difficulty: 'intermedio',
    description: 'Maximiza quema de grasa preservando mÃºsculo con combinaciÃ³n de HIIT y pesas',
    features: [
      '3 dÃ­as de pesas full body',
      '3 dÃ­as de HIIT (20-30 min)',
      'Supersets y tri-sets',
      'Cardio acelerador metabÃ³lico',
      'DÃ©ficit calÃ³rico 500 kcal',
    ],
    sampleWeek: [
      { day: 'Lunes', focus: 'Full Body A + 15 min HIIT', duration: 75 },
      { day: 'Martes', focus: 'HIIT Tabata', duration: 30 },
      { day: 'MiÃ©rcoles', focus: 'Full Body B + Cardio', duration: 75 },
      { day: 'Jueves', focus: 'HIIT Ciclismo', duration: 30 },
      { day: 'Viernes', focus: 'Full Body C + Finisher', duration: 75 },
      { day: 'SÃ¡bado', focus: 'LISS Cardio', duration: 45 },
      { day: 'Domingo', focus: 'Descanso / Caminata', duration: 0 },
    ],
  },
  {
    id: '2',
    name: 'Masa Muscular Acelerada',
    goal: 'muscle-gain',
    duration: 12,
    daysPerWeek: 5,
    difficulty: 'intermedio',
    description: 'Programa de hipertrofia enfocado en mÃ¡xima ganancia muscular',
    features: [
      'Push/Pull/Legs split 2x semana',
      'Rango 8-12 reps hipertrofia',
      '4-5 sets por ejercicio',
      'TUT (time under tension) optimizado',
      'SuperÃ¡vit 300-500 kcal',
    ],
    sampleWeek: [
      { day: 'Lunes', focus: 'Push (Pecho/Hombros/TrÃ­ceps)', duration: 90 },
      { day: 'Martes', focus: 'Pull (Espalda/BÃ­ceps)', duration: 85 },
      { day: 'MiÃ©rcoles', focus: 'Legs (Piernas completas)', duration: 95 },
      { day: 'Jueves', focus: 'Descanso', duration: 0 },
      { day: 'Viernes', focus: 'Push B', duration: 90 },
      { day: 'SÃ¡bado', focus: 'Pull B', duration: 85 },
      { day: 'Domingo', focus: 'Legs B / Descanso', duration: 0 },
    ],
  },
  {
    id: '3',
    name: 'Fuerza MÃ¡xima 5/3/1',
    goal: 'strength',
    duration: 16,
    daysPerWeek: 4,
    difficulty: 'avanzado',
    description: 'PeriodizaciÃ³n basada en el mÃ©todo Wendler 5/3/1 para fuerza',
    features: [
      'Enfoque en 4 grandes: Squat, Bench, Deadlift, OHP',
      'ProgresiÃ³n mensual automÃ¡tica',
      'Trabajo auxiliar especÃ­fico',
      'Deload cada 4 semanas',
      'PR testing cada ciclo',
    ],
    sampleWeek: [
      { day: 'Lunes', focus: 'Squat 5/3/1 + Auxiliares', duration: 75 },
      { day: 'Martes', focus: 'Bench Press 5/3/1 + Volumen', duration: 70 },
      { day: 'MiÃ©rcoles', focus: 'Descanso', duration: 0 },
      { day: 'Jueves', focus: 'Deadlift 5/3/1 + Accesorios', duration: 75 },
      { day: 'Viernes', focus: 'OHP 5/3/1 + Upper Back', duration: 70 },
      { day: 'SÃ¡bado', focus: 'Descanso / Cardio opcional', duration: 0 },
      { day: 'Domingo', focus: 'Descanso', duration: 0 },
    ],
  },
  {
    id: '4',
    name: 'Resistencia Total',
    goal: 'endurance',
    duration: 10,
    daysPerWeek: 6,
    difficulty: 'intermedio',
    description: 'Desarrolla resistencia cardiovascular y muscular',
    features: [
      'Circuit training alta intensidad',
      'Trabajo de capacidad aerÃ³bica',
      'CrossFit style WODs',
      'Running progresivo',
      'Bodyweight mastery',
    ],
    sampleWeek: [
      { day: 'Lunes', focus: 'Circuit Training Full Body', duration: 45 },
      { day: 'Martes', focus: 'Running Intervalos', duration: 40 },
      { day: 'MiÃ©rcoles', focus: 'WOD AMRAP', duration: 50 },
      { day: 'Jueves', focus: 'Tempo Run', duration: 35 },
      { day: 'Viernes', focus: 'Circuit Metcon', duration: 45 },
      { day: 'SÃ¡bado', focus: 'Long Run', duration: 60 },
      { day: 'Domingo', focus: 'Active Recovery', duration: 30 },
    ],
  },
  {
    id: '5',
    name: 'PreparaciÃ³n AtlÃ©tica',
    goal: 'athlete',
    duration: 12,
    daysPerWeek: 6,
    difficulty: 'avanzado',
    description: 'Entrenamiento funcional para atletas de alto rendimiento',
    features: [
      'Entrenamiento de velocidad y potencia',
      'PliomÃ©tricos y explosividad',
      'Agilidad y coordinaciÃ³n',
      'Fuerza funcional',
      'PeriodizaciÃ³n deportiva',
    ],
    sampleWeek: [
      { day: 'Lunes', focus: 'Fuerza MÃ¡xima Lower', duration: 75 },
      { day: 'Martes', focus: 'Velocidad + PliomÃ©tricos', duration: 60 },
      { day: 'MiÃ©rcoles', focus: 'Fuerza Upper + Core', duration: 70 },
      { day: 'Jueves', focus: 'Agilidad + Condicionamiento', duration: 55 },
      { day: 'Viernes', focus: 'Potencia Olympic Lifts', duration: 75 },
      { day: 'SÃ¡bado', focus: 'Metcon / Sport EspecÃ­fico', duration: 60 },
      { day: 'Domingo', focus: 'Movilidad + RegeneraciÃ³n', duration: 40 },
    ],
  },
];

export default function WorkoutTemplates() {
  const [selectedGoal, setSelectedGoal] = useState<string>('all');
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const goals = [
    { id: 'all', label: 'Todos', icon: 'grid' },
    { id: 'fat-loss', label: 'DefiniciÃ³n', icon: 'flame' },
    { id: 'muscle-gain', label: 'MÃºsculo', icon: 'barbell' },
    { id: 'strength', label: 'Fuerza', icon: 'trophy' },
    { id: 'endurance', label: 'Resistencia', icon: 'bicycle' },
    { id: 'athlete', label: 'AtlÃ©tico', icon: 'flash' },
  ];

  const getGoalColor = (goal: string) => {
    switch (goal) {
      case 'fat-loss':
        return '#EF4444';
      case 'muscle-gain':
        return '#9D12DE';
      case 'strength':
        return '#8B5CF6';
      case 'endurance':
        return '#9D12DE';
      case 'athlete':
        return '#FFEA00';
      default:
        return '#71717A';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'principiante':
        return '#9D12DE';
      case 'intermedio':
        return '#FFEA00';
      case 'avanzado':
        return '#EF4444';
      default:
        return '#71717A';
    }
  };

  const startTemplate = (template: WorkoutTemplate) => {
    setSelectedTemplate(template.id);
    Alert.alert(
      `Iniciar: ${template.name}`,
      `${template.duration} semanas â€¢ ${template.daysPerWeek} dÃ­as/semana\n\n${template.description}\n\nÂ¿Listo para comenzar?`,
      [
        { text: 'Cancelar', onPress: () => setSelectedTemplate(null), style: 'cancel' },
        {
          text: 'Ver Detalles',
          onPress: () => Alert.alert('Detalles', 'Vista detallada del programa'),
        },
        {
          text: 'Comenzar',
          onPress: () => Alert.alert('Â¡Iniciado!', 'Tu programa ha comenzado'),
        },
      ]
    );
  };

  const filteredTemplates = selectedGoal === 'all'
    ? TEMPLATES
    : TEMPLATES.filter((t) => t.goal === selectedGoal);

  return (
    <View className="flex-1 bg-zinc-950">
      {/* Header */}
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1 ml-3">
            Programas por Objetivo
          </Text>
          <TouchableOpacity>
            <Ionicons name="star-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Info Card */}
        <View className="bg-gradient-to-br from-primary to-[#7D0EBE] rounded-xl p-4 mb-4">
          <View className="flex-row items-center">
            <Ionicons name="trophy" size={32} color="white" />
            <View className="ml-3 flex-1">
              <Text className="text-white font-bold text-lg mb-1">
                {TEMPLATES.length} Programas Profesionales
              </Text>
              <Text className="text-white/80 text-sm">
                DiseÃ±ados por entrenadores certificados
              </Text>
            </View>
          </View>
        </View>

        {/* Goal Filter */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row gap-2">
            {goals.map((goal) => (
              <TouchableOpacity
                key={goal.id}
                onPress={() => setSelectedGoal(goal.id)}
                className={`flex-row items-center px-4 py-2 rounded-lg ${
                  selectedGoal === goal.id
                    ? 'bg-primary'
                    : 'bg-zinc-900 border border-zinc-800'
                }`}
              >
                <Ionicons
                  name={goal.icon as any}
                  size={18}
                  color={selectedGoal === goal.id ? 'white' : '#71717A'}
                />
                <Text
                  className={`ml-2 font-semibold text-sm ${
                    selectedGoal === goal.id ? 'text-white' : 'text-zinc-400'
                  }`}
                >
                  {goal.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          <Text className="text-white font-bold text-lg mb-3">
            {selectedGoal === 'all' ? 'Todos los Programas' : goals.find((g) => g.id === selectedGoal)?.label}
            {' '}({filteredTemplates.length})
          </Text>

          {filteredTemplates.map((template) => (
            <TouchableOpacity
              key={template.id}
              onPress={() => startTemplate(template)}
              className={`bg-zinc-900 rounded-xl p-4 mb-4 border-2 ${
                selectedTemplate === template.id ? 'border-primary' : 'border-zinc-800'
              }`}
            >
              {/* Header */}
              <View className="flex-row items-start justify-between mb-3">
                <View className="flex-1">
                  <Text className="text-white font-bold text-xl mb-1">
                    {template.name}
                  </Text>
                  <Text className="text-zinc-400 text-sm mb-3">
                    {template.description}
                  </Text>
                  <View className="flex-row gap-2">
                    <View
                      className="px-3 py-1 rounded-full"
                      style={{ backgroundColor: getGoalColor(template.goal) + '20' }}
                    >
                      <Text
                        className="text-xs font-bold capitalize"
                        style={{ color: getGoalColor(template.goal) }}
                      >
                        {template.goal.replace('-', ' ')}
                      </Text>
                    </View>
                    <View
                      className="px-3 py-1 rounded-full"
                      style={{ backgroundColor: getDifficultyColor(template.difficulty) + '20' }}
                    >
                      <Text
                        className="text-xs font-bold capitalize"
                        style={{ color: getDifficultyColor(template.difficulty) }}
                      >
                        {template.difficulty}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

              {/* Stats */}
              <View className="flex-row gap-2 mb-3">
                <View className="flex-1 bg-zinc-800 rounded-lg p-3">
                  <Text className="text-zinc-400 text-xs mb-1">DuraciÃ³n</Text>
                  <Text className="text-white font-bold text-lg">
                    {template.duration} sem
                  </Text>
                </View>
                <View className="flex-1 bg-zinc-800 rounded-lg p-3">
                  <Text className="text-zinc-400 text-xs mb-1">Frecuencia</Text>
                  <Text className="text-white font-bold text-lg">
                    {template.daysPerWeek}x/sem
                  </Text>
                </View>
                <View className="flex-1 bg-zinc-800 rounded-lg p-3">
                  <Text className="text-zinc-400 text-xs mb-1">Nivel</Text>
                  <Text className="text-white font-bold text-lg">
                    {template.difficulty.slice(0, 3).toUpperCase()}
                  </Text>
                </View>
              </View>

              {/* Features */}
              <View className="bg-zinc-800 rounded-lg p-3 mb-3">
                <Text className="text-white font-bold text-sm mb-2">
                  CaracterÃ­sticas
                </Text>
                {template.features.map((feature, index) => (
                  <View key={index} className="flex-row items-center mb-1">
                    <Ionicons name="checkmark-circle" size={14} color="#9D12DE" />
                    <Text className="text-zinc-300 text-sm ml-2">{feature}</Text>
                  </View>
                ))}
              </View>

              {/* Sample Week */}
              <View className="bg-primary/10 rounded-lg p-3 border border-primary/30 mb-3">
                <Text className="text-primary/80 font-bold text-sm mb-2">
                  Semana Ejemplo
                </Text>
                {template.sampleWeek.slice(0, 4).map((day, index) => (
                  <View
                    key={index}
                    className={`flex-row items-center justify-between py-1 ${
                      index < 3 ? 'border-b border-primary/20' : ''
                    }`}
                  >
                    <View className="flex-1">
                      <Text className="text-primary/60 text-sm font-bold">
                        {day.day}
                      </Text>
                      <Text className="text-primary/60/70 text-xs">{day.focus}</Text>
                    </View>
                    {day.duration > 0 && (
                      <Text className="text-primary/80 text-xs">
                        {day.duration} min
                      </Text>
                    )}
                  </View>
                ))}
                <Text className="text-primary/80 text-xs mt-2">
                  +{template.sampleWeek.length - 4} dÃ­as mÃ¡s...
                </Text>
              </View>

              {/* Action Button */}
              <TouchableOpacity
                onPress={() => startTemplate(template)}
                className={`${
                  selectedTemplate === template.id ? 'bg-primary' : 'bg-zinc-800'
                } rounded-lg p-3`}
              >
                <View className="flex-row items-center justify-center">
                  <Ionicons
                    name={selectedTemplate === template.id ? 'checkmark-circle' : 'play-circle'}
                    size={18}
                    color="white"
                  />
                  <Text className="text-white font-bold ml-2">
                    {selectedTemplate === template.id ? 'Seleccionado' : 'Comenzar Programa'}
                  </Text>
                </View>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>

        {/* Info */}
        <View className="px-6 pb-6 pt-4">
          <View className="bg-amber-500/10 rounded-xl p-4 border border-amber-500/30">
            <View className="flex-row items-start">
              <Ionicons name="information-circle" size={20} color="#FFEA00" />
              <View className="flex-1 ml-3">
                <Text className="text-amber-400 font-bold mb-2">
                  Elige SegÃºn Tu Objetivo
                </Text>
                <Text className="text-amber-300 text-sm">
                  Todos los programas incluyen progresiÃ³n automÃ¡tica, ajustes de intensidad y seguimiento de resultados.
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

