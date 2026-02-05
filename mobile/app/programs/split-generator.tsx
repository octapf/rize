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

interface WorkoutDay {
  day: string;
  focus: string;
  exercises: string[];
  volume: string;
  duration: string;
}

interface TrainingSplit {
  name: string;
  description: string;
  daysPerWeek: number;
  level: string;
  goal: string;
  schedule: WorkoutDay[];
  restDays: string;
  notes: string[];
}

const SPLIT_TEMPLATES: { [key: string]: TrainingSplit } = {
  ppl: {
    name: 'Push/Pull/Legs',
    description: 'Split clásico enfocando push, pull y piernas en días separados',
    daysPerWeek: 6,
    level: 'Intermedio-Avanzado',
    goal: 'Hipertrofia',
    schedule: [
      {
        day: 'Día 1',
        focus: 'Push (Pecho, Hombros, Tríceps)',
        exercises: ['Press Banca 4×8', 'Press Inclinado 3×10', 'Press Militar 4×8', 'Elevaciones Laterales 3×12', 'Fondos 3×10', 'Extensiones 3×12'],
        volume: 'Alto',
        duration: '75-90 min',
      },
      {
        day: 'Día 2',
        focus: 'Pull (Espalda, Bíceps)',
        exercises: ['Dominadas 4×8', 'Remo con Barra 4×8', 'Peso Muerto 3×6', 'Remo Mancuernas 3×10', 'Curl con Barra 3×10', 'Curl Martillo 3×12'],
        volume: 'Alto',
        duration: '75-90 min',
      },
      {
        day: 'Día 3',
        focus: 'Legs (Piernas)',
        exercises: ['Sentadilla 4×8', 'Prensa 3×10', 'Peso Muerto Rumano 3×10', 'Curl Femoral 3×12', 'Extensiones 3×12', 'Gemelos 4×15'],
        volume: 'Muy Alto',
        duration: '80-95 min',
      },
      {
        day: 'Día 4',
        focus: 'Push (Énfasis Hombros)',
        exercises: ['Press Militar 4×8', 'Press Inclinado 4×10', 'Aperturas 3×12', 'Face Pulls 3×15', 'Press Francés 3×10', 'Fondos 3×12'],
        volume: 'Alto',
        duration: '70-85 min',
      },
      {
        day: 'Día 5',
        focus: 'Pull (Énfasis Dorsal)',
        exercises: ['Peso Muerto 4×6', 'Dominadas 4×10', 'Remo T-Bar 4×10', 'Pulldowns 3×12', 'Curl Inclinado 3×10', 'Curl Concentrado 3×12'],
        volume: 'Alto',
        duration: '75-90 min',
      },
      {
        day: 'Día 6',
        focus: 'Legs (Énfasis Cuádriceps)',
        exercises: ['Sentadilla Frontal 4×8', 'Zancadas 3×10', 'Extensiones 4×12', 'Curl Femoral 3×12', 'Hip Thrusts 3×12', 'Gemelos 4×15'],
        volume: 'Alto',
        duration: '75-90 min',
      },
    ],
    restDays: '1 día (típicamente Domingo)',
    notes: [
      'Ideal para volumen alto y frecuencia 2x por grupo muscular',
      'Requiere buena recuperación (sueño, nutrición)',
      'Puede hacerse 3 días/semana para principiantes (1 ciclo)',
      'Descansa mínimo 1 día entre mismo patrón de movimiento',
    ],
  },
  ul: {
    name: 'Upper/Lower',
    description: 'Divide entrenamientos en tren superior e inferior',
    daysPerWeek: 4,
    level: 'Principiante-Intermedio',
    goal: 'Fuerza e Hipertrofia',
    schedule: [
      {
        day: 'Día 1',
        focus: 'Upper (Fuerza)',
        exercises: ['Press Banca 5×5', 'Remo con Barra 5×5', 'Press Militar 4×6', 'Dominadas 3×8', 'Curl con Barra 3×10', 'Extensiones 3×10'],
        volume: 'Moderado-Alto',
        duration: '65-80 min',
      },
      {
        day: 'Día 2',
        focus: 'Lower (Fuerza)',
        exercises: ['Sentadilla 5×5', 'Peso Muerto Rumano 4×6', 'Prensa 3×8', 'Curl Femoral 3×10', 'Gemelos 4×12', 'Plancha 3×45s'],
        volume: 'Moderado-Alto',
        duration: '70-85 min',
      },
      {
        day: 'Día 3',
        focus: 'Upper (Hipertrofia)',
        exercises: ['Press Inclinado 4×10', 'Remo Mancuernas 4×10', 'Aperturas 3×12', 'Pulldowns 3×12', 'Face Pulls 3×15', 'Curl Martillo 3×12'],
        volume: 'Alto',
        duration: '65-80 min',
      },
      {
        day: 'Día 4',
        focus: 'Lower (Hipertrofia)',
        exercises: ['Sentadilla Frontal 4×10', 'Peso Muerto 4×8', 'Zancadas 3×12', 'Extensiones 3×15', 'Hip Thrusts 3×12', 'Gemelos 4×15'],
        volume: 'Alto',
        duration: '70-85 min',
      },
    ],
    restDays: '3 días distribuidos (ej: Lun-Mar-Jue-Vie)',
    notes: [
      'Excelente balance frecuencia/volumen/recuperación',
      'Combina rangos de fuerza (5×5) e hipertrofia (4×10)',
      '2x frecuencia por grupo muscular por semana',
      'Muy sostenible largo plazo',
    ],
  },
  bro: {
    name: 'Bro Split (5 días)',
    description: 'Un grupo muscular por día con alto volumen',
    daysPerWeek: 5,
    level: 'Intermedio-Avanzado',
    goal: 'Hipertrofia',
    schedule: [
      {
        day: 'Lunes',
        focus: 'Pecho',
        exercises: ['Press Banca 4×8-10', 'Press Inclinado 4×10', 'Press Declinado 3×10', 'Aperturas 3×12', 'Pullover 3×12', 'Flexiones 3×MAX'],
        volume: 'Muy Alto',
        duration: '75-90 min',
      },
      {
        day: 'Martes',
        focus: 'Espalda',
        exercises: ['Peso Muerto 4×6', 'Dominadas 4×8-10', 'Remo con Barra 4×10', 'Remo T-Bar 3×10', 'Pulldowns 3×12', 'Remo Mancuerna 3×12'],
        volume: 'Muy Alto',
        duration: '80-95 min',
      },
      {
        day: 'Miércoles',
        focus: 'Hombros',
        exercises: ['Press Militar 4×8', 'Press Mancuernas 4×10', 'Elevaciones Laterales 4×12', 'Elevaciones Frontales 3×12', 'Face Pulls 3×15', 'Encogimientos 3×15'],
        volume: 'Alto',
        duration: '70-85 min',
      },
      {
        day: 'Jueves',
        focus: 'Piernas',
        exercises: ['Sentadilla 5×8', 'Prensa 4×10', 'Peso Muerto Rumano 4×10', 'Extensiones 4×12', 'Curl Femoral 4×12', 'Gemelos 5×15'],
        volume: 'Muy Alto',
        duration: '85-100 min',
      },
      {
        day: 'Viernes',
        focus: 'Brazos',
        exercises: ['Curl con Barra 4×10', 'Press Francés 4×10', 'Curl Martillo 3×12', 'Fondos 3×12', 'Curl Concentrado 3×12', 'Extensiones 3×15'],
        volume: 'Alto',
        duration: '60-75 min',
      },
    ],
    restDays: '2 días (Sábado-Domingo o distribuidos)',
    notes: [
      'Máximo volumen por grupo muscular por sesión',
      'Frecuencia 1x por semana - requiere intensidad máxima',
      'Popular pero menos óptimo que PPL o UL para naturales',
      'Permite máximo enfoque mental en cada grupo',
    ],
  },
  fullbody: {
    name: 'Full Body (3 días)',
    description: 'Entrena todo el cuerpo cada sesión',
    daysPerWeek: 3,
    level: 'Principiante',
    goal: 'Fuerza Base',
    schedule: [
      {
        day: 'Día A',
        focus: 'Cuerpo Completo (Push Emphasis)',
        exercises: ['Sentadilla 5×5', 'Press Banca 5×5', 'Remo con Barra 3×8', 'Press Militar 3×8', 'Curl con Barra 2×10', 'Plancha 3×45s'],
        volume: 'Moderado',
        duration: '60-75 min',
      },
      {
        day: 'Día B',
        focus: 'Cuerpo Completo (Pull Emphasis)',
        exercises: ['Peso Muerto 5×5', 'Dominadas 4×6', 'Press Inclinado 4×8', 'Remo Mancuernas 3×10', 'Face Pulls 3×12', 'Extensiones 2×10'],
        volume: 'Moderado',
        duration: '60-75 min',
      },
      {
        day: 'Día C',
        focus: 'Cuerpo Completo (Legs Emphasis)',
        exercises: ['Sentadilla Frontal 4×8', 'Press Banca 4×8', 'Peso Muerto Rumano 3×10', 'Pulldowns 3×10', 'Zancadas 3×10', 'Gemelos 3×15'],
        volume: 'Moderado',
        duration: '60-75 min',
      },
    ],
    restDays: '4 días (ej: Lun-Mie-Vie o Mar-Jue-Sab)',
    notes: [
      'Ideal para principiantes - aprende movimientos básicos',
      'Alta frecuencia (3x por semana) - progreso rápido',
      'Menos tiempo total en gimnasio por semana',
      'Enfócate en técnica y progresión lineal',
    ],
  },
};

export default function SplitGenerator() {
  const [selectedDays, setSelectedDays] = useState<number | null>(null);
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [generatedSplit, setGeneratedSplit] = useState<TrainingSplit | null>(null);

  const daysOptions = [3, 4, 5, 6];
  const goalOptions = ['Fuerza', 'Hipertrofia', 'Mixto'];
  const levelOptions = ['Principiante', 'Intermedio', 'Avanzado'];

  const generateSplit = () => {
    if (!selectedDays || !selectedGoal || !selectedLevel) {
      Alert.alert('Error', 'Selecciona días, objetivo y nivel');
      return;
    }

    // Logic to select split
    let split: TrainingSplit;

    if (selectedDays === 3) {
      split = SPLIT_TEMPLATES.fullbody;
    } else if (selectedDays === 4) {
      split = SPLIT_TEMPLATES.ul;
    } else if (selectedDays === 5 && selectedGoal === 'Hipertrofia') {
      split = SPLIT_TEMPLATES.bro;
    } else {
      split = SPLIT_TEMPLATES.ppl;
    }

    setGeneratedSplit(split);
  };

  const reset = () => {
    setSelectedDays(null);
    setSelectedGoal(null);
    setSelectedLevel(null);
    setGeneratedSplit(null);
  };

  const saveSplit = () => {
    Alert.alert('Split Guardado! ðŸ’ª', 'Agregado a Mis Programas');
  };

  if (generatedSplit) {
    return (
      <View className="flex-1 bg-zinc-950">
        {/* Header */}
        <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
          <View className="flex-row items-center mb-4">
            <TouchableOpacity onPress={reset}>
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <Text className="text-white text-2xl font-bold flex-1 ml-3">
              {generatedSplit.name}
            </Text>
            <TouchableOpacity onPress={saveSplit}>
              <Ionicons name="bookmark" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          <View className="px-6 pt-6">
            {/* Header Info */}
            <View className="bg-gradient-to-r from-primary to-[#7D0EBE] rounded-xl p-6 mb-6">
              <Text className="text-white text-2xl font-bold mb-2">{generatedSplit.name}</Text>
              <Text className="text-white opacity-90 mb-4">{generatedSplit.description}</Text>
              <View className="flex-row gap-2 flex-wrap">
                <View className="bg-white/20 rounded-full px-3 py-1">
                  <Text className="text-white font-bold text-xs">{generatedSplit.daysPerWeek} días/semana</Text>
                </View>
                <View className="bg-white/20 rounded-full px-3 py-1">
                  <Text className="text-white font-bold text-xs">{generatedSplit.level}</Text>
                </View>
                <View className="bg-white/20 rounded-full px-3 py-1">
                  <Text className="text-white font-bold text-xs">{generatedSplit.goal}</Text>
                </View>
              </View>
            </View>

            {/* Schedule */}
            <Text className="text-white font-bold text-lg mb-4">Programa Semanal</Text>
            {generatedSplit.schedule.map((workout, index) => (
              <View key={index} className="bg-zinc-900 rounded-xl p-5 mb-4 border border-zinc-800">
                <View className="flex-row items-center justify-between mb-3">
                  <View className="flex-1">
                    <Text className="text-primary font-bold text-sm mb-1">{workout.day}</Text>
                    <Text className="text-white font-bold text-lg">{workout.focus}</Text>
                  </View>
                  <View className="bg-primary/10 rounded-lg px-3 py-1 border border-primary/30">
                    <Text className="text-primary font-bold text-xs">{workout.duration}</Text>
                  </View>
                </View>

                <View className="bg-zinc-800 rounded-lg p-3 mb-3">
                  {workout.exercises.map((exercise, idx) => (
                    <View key={idx} className="flex-row items-start mb-1 last:mb-0">
                      <Ionicons name="checkmark-circle" size={16} color="#9D12DE" />
                      <Text className="text-zinc-300 text-sm ml-2 flex-1">{exercise}</Text>
                    </View>
                  ))}
                </View>

                <View className="flex-row items-center">
                  <Ionicons name="fitness" size={16} color="#6B7280" />
                  <Text className="text-zinc-400 text-xs ml-2">Volumen: {workout.volume}</Text>
                </View>
              </View>
            ))}

            {/* Rest Days */}
            <View className="bg-amber-500/10 rounded-xl p-4 border border-amber-500/30 mb-6">
              <View className="flex-row items-start">
                <Ionicons name="moon" size={20} color="#FFEA00" />
                <View className="flex-1 ml-3">
                  <Text className="text-amber-400 font-bold mb-2">Días de Descanso</Text>
                  <Text className="text-amber-300 text-sm">{generatedSplit.restDays}</Text>
                </View>
              </View>
            </View>

            {/* Notes */}
            <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-6">
              <View className="flex-row items-start">
                <Ionicons name="information-circle" size={20} color="#9D12DE" />
                <View className="flex-1 ml-3">
                  <Text className="text-primary/80 font-bold mb-2">Notas Importantes</Text>
                  {generatedSplit.notes.map((note, index) => (
                    <Text key={index} className="text-primary/60 text-sm mb-1">
                      • {note}
                    </Text>
                  ))}
                </View>
              </View>
            </View>

            {/* Actions */}
            <TouchableOpacity
              onPress={saveSplit}
              className="bg-primary rounded-xl p-5 flex-row items-center justify-center mb-4"
            >
              <Ionicons name="save" size={24} color="white" />
              <Text className="text-white font-bold text-lg ml-2">Guardar Split</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={reset}
              className="bg-zinc-900 rounded-xl p-4 flex-row items-center justify-center mb-6 border border-zinc-800"
            >
              <Ionicons name="refresh" size={20} color="white" />
              <Text className="text-white font-bold ml-2">Crear Nuevo Split</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-zinc-950">
      {/* Header */}
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1 ml-3">
            Split Generator
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          {/* Days Selection */}
          <View className="mb-6">
            <Text className="text-white font-bold text-lg mb-3">¿Cuántos días puedes entrenar?</Text>
            <View className="flex-row gap-3">
              {daysOptions.map((days) => (
                <TouchableOpacity
                  key={days}
                  onPress={() => setSelectedDays(days)}
                  className={`flex-1 rounded-xl p-4 ${
                    selectedDays === days
                      ? 'bg-primary'
                      : 'bg-zinc-900 border border-zinc-800'
                  }`}
                >
                  <Text className={`text-center font-bold text-2xl ${selectedDays === days ? 'text-white' : 'text-zinc-400'}`}>
                    {days}
                  </Text>
                  <Text className={`text-center text-xs ${selectedDays === days ? 'text-white' : 'text-zinc-500'}`}>
                    días
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Goal Selection */}
          <View className="mb-6">
            <Text className="text-white font-bold text-lg mb-3">¿Cuál es tu objetivo?</Text>
            <View className="gap-3">
              {goalOptions.map((goal) => (
                <TouchableOpacity
                  key={goal}
                  onPress={() => setSelectedGoal(goal)}
                  className={`rounded-xl p-4 ${
                    selectedGoal === goal
                      ? 'bg-primary'
                      : 'bg-zinc-900 border border-zinc-800'
                  }`}
                >
                  <View className="flex-row items-center">
                    <Ionicons
                      name={
                        goal === 'Fuerza'
                          ? 'barbell'
                          : goal === 'Hipertrofia'
                          ? 'fitness'
                          : 'git-merge'
                      }
                      size={24}
                      color={selectedGoal === goal ? 'white' : '#71717A'}
                    />
                    <Text className={`font-bold text-lg ml-3 ${selectedGoal === goal ? 'text-white' : 'text-zinc-400'}`}>
                      {goal}
                    </Text>
                  </View>
                  <Text className={`text-sm mt-2 ${selectedGoal === goal ? 'text-white opacity-90' : 'text-zinc-500'}`}>
                    {goal === 'Fuerza' && 'Enfoque en progresión de peso'}
                    {goal === 'Hipertrofia' && 'Máximo crecimiento muscular'}
                    {goal === 'Mixto' && 'Balance fuerza e hipertrofia'}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Level Selection */}
          <View className="mb-6">
            <Text className="text-white font-bold text-lg mb-3">¿Cuál es tu nivel?</Text>
            <View className="gap-3">
              {levelOptions.map((level) => (
                <TouchableOpacity
                  key={level}
                  onPress={() => setSelectedLevel(level)}
                  className={`rounded-xl p-4 ${
                    selectedLevel === level
                      ? 'bg-purple-500'
                      : 'bg-zinc-900 border border-zinc-800'
                  }`}
                >
                  <View className="flex-row items-center">
                    <Ionicons
                      name={
                        level === 'Principiante'
                          ? 'play-circle'
                          : level === 'Intermedio'
                          ? 'trending-up'
                          : 'trophy'
                      }
                      size={24}
                      color={selectedLevel === level ? 'white' : '#71717A'}
                    />
                    <Text className={`font-bold text-lg ml-3 ${selectedLevel === level ? 'text-white' : 'text-zinc-400'}`}>
                      {level}
                    </Text>
                  </View>
                  <Text className={`text-sm mt-2 ${selectedLevel === level ? 'text-white opacity-90' : 'text-zinc-500'}`}>
                    {level === 'Principiante' && '< 1 año entrenando consistente'}
                    {level === 'Intermedio' && '1-3 años de experiencia'}
                    {level === 'Avanzado' && '3+ años entrenando'}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Generate Button */}
          <TouchableOpacity
            onPress={generateSplit}
            disabled={!selectedDays || !selectedGoal || !selectedLevel}
            className={`rounded-xl p-5 flex-row items-center justify-center mb-6 ${
              selectedDays && selectedGoal && selectedLevel
                ? 'bg-gradient-to-r from-primary to-[#7D0EBE]'
                : 'bg-zinc-800'
            }`}
          >
            <Ionicons
              name="flash"
              size={24}
              color={selectedDays && selectedGoal && selectedLevel ? 'white' : '#52525B'}
            />
            <Text
              className={`font-bold text-lg ml-2 ${
                selectedDays && selectedGoal && selectedLevel ? 'text-white' : 'text-zinc-500'
              }`}
            >
              Generar Mi Split
            </Text>
          </TouchableOpacity>

          {/* Info */}
          <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-6">
            <View className="flex-row items-start">
              <Ionicons name="information-circle" size={20} color="#9D12DE" />
              <View className="flex-1 ml-3">
                <Text className="text-primary/80 font-bold mb-2">
                  ¿Qué Split es Mejor?
                </Text>
                <Text className="text-primary/60 text-sm">
                  <Text className="font-bold">3 días:</Text> Full Body - ideal principiantes{'\n'}
                  <Text className="font-bold">4 días:</Text> Upper/Lower - balance perfecto{'\n'}
                  <Text className="font-bold">5 días:</Text> Bro Split - volumen alto por músculo{'\n'}
                  <Text className="font-bold">6 días:</Text> PPL - frecuencia 2x óptima{'\n\n'}
                  No hay "mejor" split - depende de tu tiempo, recuperación y preferencias!
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}


