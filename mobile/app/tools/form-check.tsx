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
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface FormCheckItem {
  exercise: string;
  category: 'position' | 'movement' | 'breathing' | 'tempo';
  description: string;
  isCorrect: boolean;
}

interface FormCheck {
  id: string;
  date: Date;
  exercise: string;
  muscleGroup: string;
  checklistItems: FormCheckItem[];
  overallScore: number;
  videoUrl?: string;
  coachNotes?: string;
  status: 'good' | 'needs-work' | 'poor';
}

const EXERCISE_CHECKLISTS: { [key: string]: FormCheckItem[] } = {
  'Press Banca': [
    { exercise: 'Press Banca', category: 'position', description: 'Pies plantados en el suelo', isCorrect: true },
    { exercise: 'Press Banca', category: 'position', description: 'Escápulas retraídas y deprimidas', isCorrect: true },
    { exercise: 'Press Banca', category: 'position', description: 'Arco lumbar natural (no excesivo)', isCorrect: true },
    { exercise: 'Press Banca', category: 'movement', description: 'Barra toca pecho en línea de pezones', isCorrect: true },
    { exercise: 'Press Banca', category: 'movement', description: 'Codos a 45° (no 90°)', isCorrect: true },
    { exercise: 'Press Banca', category: 'movement', description: 'Trayectoria vertical', isCorrect: true },
    { exercise: 'Press Banca', category: 'breathing', description: 'Inhalar en descenso, exhalar en push', isCorrect: true },
    { exercise: 'Press Banca', category: 'tempo', description: 'Descenso controlado (2-3s)', isCorrect: true },
    { exercise: 'Press Banca', category: 'tempo', description: 'Push explosivo sin rebote', isCorrect: true },
  ],
  'Sentadilla': [
    { exercise: 'Sentadilla', category: 'position', description: 'Pies ancho de hombros, dedos ligeramente afuera', isCorrect: true },
    { exercise: 'Sentadilla', category: 'position', description: 'Barra en traps (high bar) o deltoides posteriores (low bar)', isCorrect: true },
    { exercise: 'Sentadilla', category: 'position', description: 'Core activado y apretado', isCorrect: true },
    { exercise: 'Sentadilla', category: 'movement', description: 'Rodillas siguen línea de dedos (sin valgo)', isCorrect: true },
    { exercise: 'Sentadilla', category: 'movement', description: 'Profundidad: cadera bajo rodillas', isCorrect: true },
    { exercise: 'Sentadilla', category: 'movement', description: 'Peso en talones y medio pie', isCorrect: true },
    { exercise: 'Sentadilla', category: 'movement', description: 'Pecho arriba, espalda neutral', isCorrect: true },
    { exercise: 'Sentadilla', category: 'breathing', description: 'Respiración profunda pre-descenso, aguantar', isCorrect: true },
    { exercise: 'Sentadilla', category: 'tempo', description: 'Descenso controlado, romper caderas primero', isCorrect: true },
    { exercise: 'Sentadilla', category: 'tempo', description: 'Subir explosivo, caderas y hombros simultáneos', isCorrect: true },
  ],
  'Peso Muerto': [
    { exercise: 'Peso Muerto', category: 'position', description: 'Pies bajo barra, hip-width', isCorrect: true },
    { exercise: 'Peso Muerto', category: 'position', description: 'Agarre fuera de piernas, brazos verticales', isCorrect: true },
    { exercise: 'Peso Muerto', category: 'position', description: 'Espalda neutral (no redonda)', isCorrect: true },
    { exercise: 'Peso Muerto', category: 'position', description: 'Hombros ligeramente adelante de barra', isCorrect: true },
    { exercise: 'Peso Muerto', category: 'movement', description: 'Barra pegada a piernas todo el movimiento', isCorrect: true },
    { exercise: 'Peso Muerto', category: 'movement', description: 'Empujar suelo con piernas (no tirar con espalda)', isCorrect: true },
    { exercise: 'Peso Muerto', category: 'movement', description: 'Extensión simultánea cadera/rodillas', isCorrect: true },
    { exercise: 'Peso Muerto', category: 'movement', description: 'Lockout: glúteos apretados, sin hiperextensión lumbar', isCorrect: true },
    { exercise: 'Peso Muerto', category: 'breathing', description: 'Respiración profunda, core braced', isCorrect: true },
    { exercise: 'Peso Muerto', category: 'tempo', description: 'Pull explosivo pero controlado', isCorrect: true },
  ],
};

const MOCK_CHECKS: FormCheck[] = [
  {
    id: '1',
    date: new Date(2026, 0, 27),
    exercise: 'Press Banca',
    muscleGroup: 'Pecho',
    checklistItems: EXERCISE_CHECKLISTS['Press Banca'].map((item, idx) => ({
      ...item,
      isCorrect: idx < 7,
    })),
    overallScore: 78,
    coachNotes: 'Mejora tempo en descenso, muy rápido. Resto bien.',
    status: 'good',
  },
];

export default function FormCheck() {
  const [checks, setChecks] = useState<FormCheck[]>(MOCK_CHECKS);
  const [selectedExercise, setSelectedExercise] = useState<string | null>(null);
  const [currentChecklist, setCurrentChecklist] = useState<FormCheckItem[]>([]);
  const [coachNotes, setCoachNotes] = useState('');

  const exercises = Object.keys(EXERCISE_CHECKLISTS);

  const startFormCheck = (exercise: string) => {
    setSelectedExercise(exercise);
    setCurrentChecklist(EXERCISE_CHECKLISTS[exercise].map(item => ({ ...item })));
    setCoachNotes('');
  };

  const toggleCheckItem = (index: number) => {
    const newChecklist = [...currentChecklist];
    newChecklist[index].isCorrect = !newChecklist[index].isCorrect;
    setCurrentChecklist(newChecklist);
  };

  const calculateScore = () => {
    const correct = currentChecklist.filter(item => item.isCorrect).length;
    return Math.round((correct / currentChecklist.length) * 100);
  };

  const getStatus = (score: number): 'good' | 'needs-work' | 'poor' => {
    if (score >= 80) return 'good';
    if (score >= 60) return 'needs-work';
    return 'poor';
  };

  const saveFormCheck = () => {
    if (!selectedExercise) return;

    const score = calculateScore();
    const status = getStatus(score);

    const newCheck: FormCheck = {
      id: String(Date.now()),
      date: new Date(),
      exercise: selectedExercise,
      muscleGroup: selectedExercise.includes('Banca') || selectedExercise.includes('Press') ? 'Pecho/Hombros' : selectedExercise.includes('Sentadilla') ? 'Piernas' : 'Espalda',
      checklistItems: currentChecklist,
      overallScore: score,
      coachNotes: coachNotes || undefined,
      status,
    };

    setChecks([newCheck, ...checks]);
    
    const statusText = status === 'good' ? '✓ Buena Técnica' : status === 'needs-work' ? 'âš ï¸ Necesita Trabajo' : 'âŒ Técnica Pobre';
    Alert.alert(`Form Check: ${score}/100`, statusText);
    
    setSelectedExercise(null);
    setCurrentChecklist([]);
    setCoachNotes('');
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'position': return 'body';
      case 'movement': return 'fitness';
      case 'breathing': return 'wind';
      case 'tempo': return 'time';
      default: return 'checkmark-circle';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'position': return 'blue';
      case 'movement': return 'emerald';
      case 'breathing': return 'cyan';
      case 'tempo': return 'purple';
      default: return 'zinc';
    }
  };

  if (selectedExercise && currentChecklist.length > 0) {
    const currentScore = calculateScore();
    const currentStatus = getStatus(currentScore);

    return (
      <View className="flex-1 bg-zinc-950">
        {/* Header */}
        <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
          <View className="flex-row items-center mb-4">
            <TouchableOpacity onPress={() => {
              setSelectedExercise(null);
              setCurrentChecklist([]);
            }}>
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <Text className="text-white text-2xl font-bold flex-1 ml-3">
              {selectedExercise}
            </Text>
          </View>
        </View>

        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          <View className="px-6 pt-6">
            {/* Current Score */}
            <View className={`bg-gradient-to-r from-${currentStatus === 'good' ? 'emerald' : currentStatus === 'needs-work' ? 'amber' : 'red'}-500 to-blue-500 rounded-xl p-6 mb-6`}>
              <Text className="text-white opacity-90 text-sm mb-2">Score Actual</Text>
              <View className="flex-row items-center justify-between">
                <Text className="text-white text-5xl font-bold">{currentScore}</Text>
                <View className="items-end">
                  <Text className="text-white text-2xl opacity-90">/100</Text>
                  <Text className="text-white font-bold text-lg mt-1">
                    {currentStatus === 'good' ? '✓ Buena' : currentStatus === 'needs-work' ? 'âš ï¸ Mejorable' : 'âŒ Pobre'}
                  </Text>
                </View>
              </View>
            </View>

            {/* Checklist by Category */}
            {['position', 'movement', 'breathing', 'tempo'].map((category) => {
              const items = currentChecklist.filter(item => item.category === category);
              if (items.length === 0) return null;

              const categoryColor = getCategoryColor(category);
              const categoryIcon = getCategoryIcon(category);
              const correctCount = items.filter(item => item.isCorrect).length;

              return (
                <View key={category} className="mb-6">
                  <View className="flex-row items-center justify-between mb-3">
                    <View className="flex-row items-center">
                      <View className={`w-10 h-10 bg-${categoryColor}-500 rounded-xl items-center justify-center mr-3`}>
                        <Ionicons name={categoryIcon as any} size={20} color="white" />
                      </View>
                      <Text className="text-white font-bold text-lg capitalize">{category}</Text>
                    </View>
                    <Text className={`text-${categoryColor}-400 font-bold`}>
                      {correctCount}/{items.length}
                    </Text>
                  </View>

                  {items.map((item, idx) => {
                    const globalIndex = currentChecklist.findIndex(i => i === item);
                    return (
                      <TouchableOpacity
                        key={idx}
                        onPress={() => toggleCheckItem(globalIndex)}
                        className={`mb-2 rounded-xl p-4 flex-row items-center ${
                          item.isCorrect
                            ? `bg-${categoryColor}-500/10 border border-${categoryColor}-500/30`
                            : 'bg-zinc-900 border border-zinc-800'
                        }`}
                      >
                        <Ionicons
                          name={item.isCorrect ? 'checkmark-circle' : 'close-circle'}
                          size={24}
                          color={item.isCorrect ? '#9D12DE' : '#EF4444'}
                        />
                        <Text className={`flex-1 ml-3 ${item.isCorrect ? 'text-white' : 'text-zinc-400'}`}>
                          {item.description}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              );
            })}

            {/* Coach Notes */}
            <View className="bg-zinc-900 rounded-xl p-4 mb-6 border border-zinc-800">
              <Text className="text-white font-bold mb-3">Notas del Coach (Opcional)</Text>
              <TextInput
                value={coachNotes}
                onChangeText={setCoachNotes}
                placeholder="Ej: Mejorar profundidad, mantener pecho arriba..."
                placeholderTextColor="#71717A"
                multiline
                numberOfLines={4}
                className="bg-zinc-800 rounded-lg p-3 text-white"
              />
            </View>

            {/* Save Button */}
            <TouchableOpacity
              onPress={saveFormCheck}
              className={`bg-${currentStatus === 'good' ? 'emerald' : currentStatus === 'needs-work' ? 'amber' : 'red'}-500 rounded-xl p-5 flex-row items-center justify-center mb-6`}
            >
              <Ionicons name="save" size={24} color="white" />
              <Text className="text-white font-bold text-lg ml-2">Guardar Form Check</Text>
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
            Form Check
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          {/* Info */}
          <View className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl p-6 mb-6">
            <Text className="text-white text-2xl font-bold mb-2">Verifica Tu Técnica</Text>
            <Text className="text-white opacity-90 mb-4">
              Checklists detallados para ejercicios principales
            </Text>
            <View className="flex-row items-center">
              <Ionicons name="checkmark-circle" size={20} color="white" />
              <Text className="text-white ml-2">Previene lesiones y maximiza resultados</Text>
            </View>
          </View>

          {/* Select Exercise */}
          <Text className="text-white font-bold text-lg mb-4">Selecciona Ejercicio</Text>
          
          {exercises.map((exercise) => {
            const checklistLength = EXERCISE_CHECKLISTS[exercise].length;
            
            return (
              <TouchableOpacity
                key={exercise}
                onPress={() => startFormCheck(exercise)}
                className="bg-zinc-900 rounded-xl p-5 mb-3 border border-zinc-800"
              >
                <View className="flex-row items-center justify-between mb-2">
                  <Text className="text-white font-bold text-lg flex-1">{exercise}</Text>
                  <Ionicons name="chevron-forward" size={24} color="#71717A" />
                </View>
                <View className="flex-row items-center">
                  <Ionicons name="list" size={16} color="#9D12DE" />
                  <Text className="text-primary text-sm ml-2">
                    {checklistLength} puntos de verificación
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}

          {/* Recent Checks */}
          {checks.length > 0 && (
            <>
              <Text className="text-white font-bold text-lg mb-4 mt-6">Checks Recientes</Text>
              
              {checks.map((check) => (
                <View key={check.id} className="bg-zinc-900 rounded-xl p-5 mb-3 border border-zinc-800">
                  <View className="flex-row items-center justify-between mb-3">
                    <View className="flex-1">
                      <Text className="text-white font-bold text-lg">{check.exercise}</Text>
                      <Text className="text-zinc-400 text-sm">
                        {format(check.date, "d 'de' MMMM", { locale: es })}
                      </Text>
                    </View>
                    <View className={`rounded-full px-4 py-2 ${
                      check.status === 'good' ? 'bg-primary' :
                      check.status === 'needs-work' ? 'bg-amber-500' : 'bg-red-500'
                    }`}>
                      <Text className="text-white font-bold text-xl">{check.overallScore}</Text>
                    </View>
                  </View>

                  {check.coachNotes && (
                    <View className="bg-zinc-800 rounded-lg p-3 mb-3">
                      <Text className="text-zinc-400 text-sm">{check.coachNotes}</Text>
                    </View>
                  )}

                  <View className="flex-row gap-2">
                    {['position', 'movement', 'breathing', 'tempo'].map((category) => {
                      const items = check.checklistItems.filter(item => item.category === category);
                      const correct = items.filter(item => item.isCorrect).length;
                      const color = getCategoryColor(category);
                      
                      if (items.length === 0) return null;
                      
                      return (
                        <View key={category} className={`flex-1 bg-${color}-500/10 rounded-lg p-2 border border-${color}-500/30`}>
                          <Text className={`text-${color}-400 text-xs font-bold capitalize`}>
                            {category}
                          </Text>
                          <Text className={`text-${color}-400 font-bold`}>
                            {correct}/{items.length}
                          </Text>
                        </View>
                      );
                    })}
                  </View>
                </View>
              ))}
            </>
          )}

          {/* Tips */}
          <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-6 mt-4">
            <View className="flex-row items-start">
              <Ionicons name="bulb" size={20} color="#9D12DE" />
              <View className="flex-1 ml-3">
                <Text className="text-primary/80 font-bold mb-2">
                  Cómo Usar Form Check
                </Text>
                <Text className="text-primary/60 text-sm">
                  • Grábate haciendo el ejercicio{'\n'}
                  • Revisa video en cámara lenta{'\n'}
                  • Marca cada punto del checklist{'\n'}
                  • Enfócate en los âŒ para mejorar{'\n'}
                  • Re-evalúa cada 2-4 semanas{'\n'}
                  • 80%+ = técnica sólida
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

