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

interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: string;
  rest: number;
  notes?: string;
}

interface SupersetGroup {
  id: string;
  type: 'superset' | 'dropset' | 'pyramid';
  exercises: Exercise[];
}

const SAMPLE_EXERCISES: Exercise[] = [
  { id: '1', name: 'Press Banca', sets: 3, reps: '8-12', rest: 90 },
  { id: '2', name: 'Aperturas con Mancuernas', sets: 3, reps: '12-15', rest: 60 },
  { id: '3', name: 'Press Inclinado', sets: 3, reps: '10-12', rest: 90 },
  { id: '4', name: 'Fondos', sets: 3, reps: '10-15', rest: 60 },
];

export default function WorkoutBuilder() {
  const [workoutName, setWorkoutName] = useState('Entrenamiento de Pecho');
  const [selectedTechnique, setSelectedTechnique] = useState<'normal' | 'superset' | 'dropset' | 'pyramid'>('normal');
  const [exercises, setExercises] = useState<Exercise[]>(SAMPLE_EXERCISES);
  const [supersetGroups, setSupersetGroups] = useState<SupersetGroup[]>([]);

  const techniques = [
    { id: 'normal' as const, label: 'Normal', icon: 'barbell-outline' },
    { id: 'superset' as const, label: 'Superseries', icon: 'flash' },
    { id: 'dropset' as const, label: 'Dropsets', icon: 'trending-down' },
    { id: 'pyramid' as const, label: 'Pirámides', icon: 'triangle-outline' },
  ];

  const createSuperset = () => {
    if (exercises.length < 2) {
      Alert.alert('Error', 'Necesitas al menos 2 ejercicios para crear una superserie');
      return;
    }

    Alert.alert(
      'Crear Superserie',
      'Selecciona 2-3 ejercicios para agrupar',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Crear',
          onPress: () => {
            const newSuperset: SupersetGroup = {
              id: Date.now().toString(),
              type: 'superset',
              exercises: [exercises[0], exercises[1]],
            };
            setSupersetGroups([...supersetGroups, newSuperset]);
            Alert.alert('¡Creado!', 'Superserie agregada al entrenamiento');
          },
        },
      ]
    );
  };

  const createDropset = () => {
    Alert.alert(
      'Crear Dropset',
      'Selecciona un ejercicio y define las reducciones de peso',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Crear',
          onPress: () => {
            const dropsetExercise: Exercise = {
              ...exercises[0],
              id: Date.now().toString(),
              sets: 1,
              reps: '12 ? 8 ? 5',
              notes: 'Reducir 20% peso en cada serie',
            };
            const newDropset: SupersetGroup = {
              id: Date.now().toString(),
              type: 'dropset',
              exercises: [dropsetExercise],
            };
            setSupersetGroups([...supersetGroups, newDropset]);
            Alert.alert('¡Creado!', 'Dropset agregado al entrenamiento');
          },
        },
      ]
    );
  };

  const createPyramid = () => {
    Alert.alert(
      'Crear Pirámide',
      'Selecciona un ejercicio para aplicar pirámide de reps/peso',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Ascendente',
          onPress: () => {
            const pyramidExercise: Exercise = {
              ...exercises[0],
              id: Date.now().toString(),
              sets: 5,
              reps: '15 ? 12 ? 10 ? 8 ? 6',
              notes: 'Aumentar peso cada serie',
            };
            const newPyramid: SupersetGroup = {
              id: Date.now().toString(),
              type: 'pyramid',
              exercises: [pyramidExercise],
            };
            setSupersetGroups([...supersetGroups, newPyramid]);
            Alert.alert('¡Creado!', 'Pirámide ascendente agregada');
          },
        },
        {
          text: 'Descendente',
          onPress: () => {
            const pyramidExercise: Exercise = {
              ...exercises[0],
              id: Date.now().toString(),
              sets: 5,
              reps: '6 ? 8 ? 10 ? 12 ? 15',
              notes: 'Reducir peso cada serie',
            };
            const newPyramid: SupersetGroup = {
              id: Date.now().toString(),
              type: 'pyramid',
              exercises: [pyramidExercise],
            };
            setSupersetGroups([...supersetGroups, newPyramid]);
            Alert.alert('¡Creado!', 'Pirámide descendente agregada');
          },
        },
      ]
    );
  };

  const addExercise = () => {
    Alert.prompt(
      'Nuevo Ejercicio',
      'Nombre del ejercicio',
      (text) => {
        if (text) {
          const newExercise: Exercise = {
            id: Date.now().toString(),
            name: text,
            sets: 3,
            reps: '8-12',
            rest: 60,
          };
          setExercises([...exercises, newExercise]);
        }
      }
    );
  };

  const saveWorkout = () => {
    const totalExercises = exercises.length + supersetGroups.reduce((sum, g) => sum + g.exercises.length, 0);
    Alert.alert(
      '¡Entrenamiento Guardado!',
      `${workoutName}\n\n${totalExercises} ejercicios\n${supersetGroups.length} técnicas avanzadas`,
      [
        { text: 'Ver Entrenamientos', onPress: () => router.back() },
        { text: 'Crear Otro' },
      ]
    );
  };

  const getTechniqueColor = (type: string) => {
    switch (type) {
      case 'superset':
        return '#FFEA00';
      case 'dropset':
        return '#EF4444';
      case 'pyramid':
        return '#8B5CF6';
      default:
        return '#9D12DE';
    }
  };

  const getTechniqueIcon = (type: string) => {
    switch (type) {
      case 'superset':
        return 'flash';
      case 'dropset':
        return 'trending-down';
      case 'pyramid':
        return 'triangle';
      default:
        return 'barbell';
    }
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
            Constructor Avanzado
          </Text>
          <TouchableOpacity onPress={saveWorkout}>
            <Ionicons name="checkmark-circle" size={28} color="#9D12DE" />
          </TouchableOpacity>
        </View>

        {/* Workout Name */}
        <TextInput
          value={workoutName}
          onChangeText={setWorkoutName}
          placeholder="Nombre del entrenamiento"
          placeholderTextColor="#71717A"
          className="bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-white font-bold text-lg mb-4"
        />

        {/* Technique Selector */}
        <Text className="text-white font-bold mb-2">Técnicas Avanzadas</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row gap-2">
            {techniques.map((tech) => (
              <TouchableOpacity
                key={tech.id}
                onPress={() => setSelectedTechnique(tech.id)}
                className={`flex-row items-center px-4 py-2 rounded-lg ${
                  selectedTechnique === tech.id
                    ? 'bg-primary'
                    : 'bg-zinc-900 border border-zinc-800'
                }`}
              >
                <Ionicons
                  name={tech.icon as any}
                  size={18}
                  color={selectedTechnique === tech.id ? 'white' : '#71717A'}
                />
                <Text
                  className={`ml-2 font-semibold text-sm ${
                    selectedTechnique === tech.id ? 'text-white' : 'text-zinc-400'
                  }`}
                >
                  {tech.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          {/* Quick Actions */}
          {selectedTechnique !== 'normal' && (
            <View className="bg-zinc-900 rounded-xl p-4 mb-4 border border-zinc-800">
              <Text className="text-white font-bold mb-3">Crear Técnica</Text>
              <View className="flex-row gap-2">
                {selectedTechnique === 'superset' && (
                  <TouchableOpacity
                    onPress={createSuperset}
                    className="flex-1 bg-amber-500 rounded-lg p-3"
                  >
                    <View className="flex-row items-center justify-center">
                      <Ionicons name="flash" size={18} color="white" />
                      <Text className="text-white font-bold ml-2">Superserie</Text>
                    </View>
                  </TouchableOpacity>
                )}
                {selectedTechnique === 'dropset' && (
                  <TouchableOpacity
                    onPress={createDropset}
                    className="flex-1 bg-red-500 rounded-lg p-3"
                  >
                    <View className="flex-row items-center justify-center">
                      <Ionicons name="trending-down" size={18} color="white" />
                      <Text className="text-white font-bold ml-2">Dropset</Text>
                    </View>
                  </TouchableOpacity>
                )}
                {selectedTechnique === 'pyramid' && (
                  <TouchableOpacity
                    onPress={createPyramid}
                    className="flex-1 bg-purple-500 rounded-lg p-3"
                  >
                    <View className="flex-row items-center justify-center">
                      <Ionicons name="triangle" size={18} color="white" />
                      <Text className="text-white font-bold ml-2">Pirámide</Text>
                    </View>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          )}

          {/* Advanced Technique Groups */}
          {supersetGroups.length > 0 && (
            <>
              <Text className="text-white font-bold text-lg mb-3">
                Técnicas Aplicadas
              </Text>
              {supersetGroups.map((group) => (
                <View
                  key={group.id}
                  className="bg-zinc-900 rounded-xl p-4 mb-3 border-2"
                  style={{ borderColor: getTechniqueColor(group.type) }}
                >
                  <View className="flex-row items-center justify-between mb-3">
                    <View className="flex-row items-center">
                      <View
                        className="w-8 h-8 rounded-full items-center justify-center"
                        style={{ backgroundColor: getTechniqueColor(group.type) + '20' }}
                      >
                        <Ionicons
                          name={getTechniqueIcon(group.type) as any}
                          size={16}
                          color={getTechniqueColor(group.type)}
                        />
                      </View>
                      <Text className="text-white font-bold ml-2 capitalize">
                        {group.type}
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => {
                        setSupersetGroups(supersetGroups.filter((g) => g.id !== group.id));
                      }}
                    >
                      <Ionicons name="trash-outline" size={20} color="#EF4444" />
                    </TouchableOpacity>
                  </View>

                  {group.exercises.map((exercise, index) => (
                    <View
                      key={exercise.id}
                      className={`${index > 0 ? 'mt-2 pt-2 border-t border-zinc-800' : ''}`}
                    >
                      <Text className="text-white font-bold mb-1">{exercise.name}</Text>
                      <View className="flex-row items-center gap-4">
                        <Text className="text-zinc-400 text-sm">
                          {exercise.sets} series
                        </Text>
                        <Text className="text-zinc-400 text-sm">
                          {exercise.reps} reps
                        </Text>
                        <Text className="text-zinc-400 text-sm">
                          {exercise.rest}s descanso
                        </Text>
                      </View>
                      {exercise.notes && (
                        <Text className="text-amber-500 text-xs mt-1">{exercise.notes}</Text>
                      )}
                    </View>
                  ))}
                </View>
              ))}
            </>
          )}

          {/* Regular Exercises */}
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-white font-bold text-lg">Ejercicios</Text>
            <TouchableOpacity onPress={addExercise}>
              <Ionicons name="add-circle" size={24} color="#9D12DE" />
            </TouchableOpacity>
          </View>

          {exercises.map((exercise) => (
            <View
              key={exercise.id}
              className="bg-zinc-900 rounded-xl p-4 mb-3 border border-zinc-800"
            >
              <View className="flex-row items-center justify-between mb-2">
                <Text className="text-white font-bold flex-1">{exercise.name}</Text>
                <TouchableOpacity
                  onPress={() => {
                    setExercises(exercises.filter((e) => e.id !== exercise.id));
                  }}
                >
                  <Ionicons name="close-circle" size={20} color="#71717A" />
                </TouchableOpacity>
              </View>

              <View className="flex-row items-center gap-4">
                <View className="bg-zinc-800 px-3 py-1 rounded-lg">
                  <Text className="text-zinc-400 text-xs">Series</Text>
                  <Text className="text-white font-bold">{exercise.sets}</Text>
                </View>
                <View className="bg-zinc-800 px-3 py-1 rounded-lg">
                  <Text className="text-zinc-400 text-xs">Reps</Text>
                  <Text className="text-white font-bold">{exercise.reps}</Text>
                </View>
                <View className="bg-zinc-800 px-3 py-1 rounded-lg">
                  <Text className="text-zinc-400 text-xs">Descanso</Text>
                  <Text className="text-white font-bold">{exercise.rest}s</Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Info Cards */}
        <View className="px-6 pb-6">
          <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-3">
            <View className="flex-row items-start">
              <Ionicons name="information-circle" size={20} color="#9D12DE" />
              <View className="flex-1 ml-3">
                <Text className="text-primary/80 font-bold mb-2">
                  Técnicas Avanzadas
                </Text>
                <Text className="text-primary/60 text-sm mb-1">
                  • Superseries: 2-3 ejercicios sin descanso
                </Text>
                <Text className="text-primary/60 text-sm mb-1">
                  • Dropsets: Reducir peso progresivamente
                </Text>
                <Text className="text-primary/60 text-sm">
                  • Pirámides: Variar reps/peso por serie
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

