import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import { Stack, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { exercisesApi, CreateExerciseInput } from '@/services/api/exercises.api';

const CATEGORIES = [
  { value: 'push', label: 'Push' },
  { value: 'pull', label: 'Pull' },
  { value: 'legs', label: 'Piernas' },
  { value: 'core', label: 'Core' },
  { value: 'skills', label: 'Skills' },
  { value: 'cardio', label: 'Cardio' },
  { value: 'flexibility', label: 'Flexibilidad' },
] as const;

const TYPES = [
  { value: 'reps', label: 'Repeticiones' },
  { value: 'time', label: 'Tiempo' },
  { value: 'distance', label: 'Distancia' },
] as const;

const TIME_UNITS = [
  { value: 'seconds', label: 'Segundos' },
  { value: 'minutes', label: 'Minutos' },
] as const;

const DISTANCE_UNITS = [
  { value: 'meters', label: 'Metros' },
  { value: 'kilometers', label: 'KilÃ³metros' },
  { value: 'miles', label: 'Millas' },
] as const;

export default function CreateExerciseScreen() {
  const queryClient = useQueryClient();
  
  const [nameES, setNameES] = useState('');
  const [nameEN, setNameEN] = useState('');
  const [category, setCategory] = useState<CreateExerciseInput['category']>('push');
  const [difficulty, setDifficulty] = useState('5');
  const [type, setType] = useState<CreateExerciseInput['type']>('reps');
  const [unit, setUnit] = useState<CreateExerciseInput['unit']>();
  const [descriptionES, setDescriptionES] = useState('');
  const [descriptionEN, setDescriptionEN] = useState('');

  const createMutation = useMutation({
    mutationFn: (data: CreateExerciseInput) => exercisesApi.createCustomExercise(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['exercises'] });
      Alert.alert('Ã‰xito', 'Ejercicio creado correctamente');
      router.back();
    },
    onError: (error: any) => {
      Alert.alert('Error', error.response?.data?.error?.message || 'Error al crear ejercicio');
    },
  });

  const handleSubmit = () => {
    if (!nameES.trim() || !nameEN.trim()) {
      Alert.alert('Error', 'El nombre en espaÃ±ol e inglÃ©s son obligatorios');
      return;
    }

    const difficultyNum = parseFloat(difficulty);
    if (isNaN(difficultyNum) || difficultyNum < 0.5 || difficultyNum > 10) {
      Alert.alert('Error', 'La dificultad debe estar entre 0.5 y 10');
      return;
    }

    if ((type === 'time' || type === 'distance') && !unit) {
      Alert.alert('Error', 'Debes seleccionar una unidad para este tipo de ejercicio');
      return;
    }

    const data: CreateExerciseInput = {
      name: { es: nameES.trim(), en: nameEN.trim() },
      category,
      difficulty: difficultyNum,
      type,
      unit,
      ...(descriptionES.trim() || descriptionEN.trim()
        ? {
            description: {
              es: descriptionES.trim() || nameES.trim(),
              en: descriptionEN.trim() || nameEN.trim(),
            },
          }
        : {}),
    };

    createMutation.mutate(data);
  };

  const getUnitsForType = () => {
    if (type === 'time') return TIME_UNITS;
    if (type === 'distance') return DISTANCE_UNITS;
    return [];
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Crear Ejercicio',
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="close" size={24} color="#fff" />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={handleSubmit} disabled={createMutation.isPending}>
              <Text style={styles.saveButton}>
                {createMutation.isPending ? 'Guardando...' : 'Guardar'}
              </Text>
            </TouchableOpacity>
          ),
        }}
      />

      <ScrollView style={styles.scrollView}>
        <View style={styles.section}>
          <Text style={styles.label}>Nombre (EspaÃ±ol) *</Text>
          <TextInput
            style={styles.input}
            value={nameES}
            onChangeText={setNameES}
            placeholder="Ej: Flexiones"
            placeholderTextColor="#666"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Nombre (InglÃ©s) *</Text>
          <TextInput
            style={styles.input}
            value={nameEN}
            onChangeText={setNameEN}
            placeholder="Ex: Push-ups"
            placeholderTextColor="#666"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>CategorÃ­a *</Text>
          <View style={styles.chipsContainer}>
            {CATEGORIES.map((cat) => (
              <TouchableOpacity
                key={cat.value}
                style={[styles.chip, category === cat.value && styles.chipSelected]}
                onPress={() => setCategory(cat.value)}
              >
                <Text
                  style={[styles.chipText, category === cat.value && styles.chipTextSelected]}
                >
                  {cat.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Tipo *</Text>
          <View style={styles.chipsContainer}>
            {TYPES.map((t) => (
              <TouchableOpacity
                key={t.value}
                style={[styles.chip, type === t.value && styles.chipSelected]}
                onPress={() => {
                  setType(t.value);
                  setUnit(undefined);
                }}
              >
                <Text style={[styles.chipText, type === t.value && styles.chipTextSelected]}>
                  {t.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {(type === 'time' || type === 'distance') && (
          <View style={styles.section}>
            <Text style={styles.label}>Unidad *</Text>
            <View style={styles.chipsContainer}>
              {getUnitsForType().map((u) => (
                <TouchableOpacity
                  key={u.value}
                  style={[styles.chip, unit === u.value && styles.chipSelected]}
                  onPress={() => setUnit(u.value as any)}
                >
                  <Text style={[styles.chipText, unit === u.value && styles.chipTextSelected]}>
                    {u.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.label}>Dificultad (0.5 - 10) *</Text>
          <TextInput
            style={styles.input}
            value={difficulty}
            onChangeText={setDifficulty}
            keyboardType="decimal-pad"
            placeholder="5.0"
            placeholderTextColor="#666"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>DescripciÃ³n (EspaÃ±ol)</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={descriptionES}
            onChangeText={setDescriptionES}
            placeholder="DescripciÃ³n opcional del ejercicio"
            placeholderTextColor="#666"
            multiline
            numberOfLines={3}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>DescripciÃ³n (InglÃ©s)</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={descriptionEN}
            onChangeText={setDescriptionEN}
            placeholder="Optional exercise description"
            placeholderTextColor="#666"
            multiline
            numberOfLines={3}
          />
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  scrollView: {
    flex: 1,
  },
  saveButton: {
    color: '#9D12DE',
    fontSize: 16,
    fontWeight: '600',
  },
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1a1a1a',
  },
  label: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#1a1a1a',
    color: '#fff',
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    backgroundColor: '#1a1a1a',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#333',
  },
  chipSelected: {
    backgroundColor: '#9D12DE',
    borderColor: '#9D12DE',
  },
  chipText: {
    color: '#999',
    fontSize: 14,
    fontWeight: '500',
  },
  chipTextSelected: {
    color: '#fff',
  },
});

