import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { Stack, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { exercisesApi, Exercise } from '@/services/api/exercises.api';

const getCategoryIcon = (category: string) => {
  const icons: Record<string, any> = {
    push: 'fitness',
    pull: 'barbell',
    legs: 'footsteps',
    core: 'body',
    skills: 'trophy',
    cardio: 'heart',
    flexibility: 'flower',
  };
  return icons[category] || 'dumbbell';
};

const getTypeLabel = (type: string, unit?: string) => {
  if (type === 'reps') return 'Repeticiones';
  if (type === 'time') return unit === 'minutes' ? 'Minutos' : 'Segundos';
  if (type === 'distance') {
    if (unit === 'kilometers') return 'Kilómetros';
    if (unit === 'miles') return 'Millas';
    return 'Metros';
  }
  return type;
};

export default function MyExercisesScreen() {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ['exercises', 'custom'],
    queryFn: () => exercisesApi.getUserCustomExercises(),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => exercisesApi.deleteCustomExercise(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['exercises'] });
      Alert.alert('Éxito', 'Ejercicio eliminado');
    },
    onError: (error: any) => {
      Alert.alert('Error', error.response?.data?.error?.message || 'Error al eliminar');
    },
  });

  const handleDelete = (exercise: Exercise) => {
    Alert.alert(
      'Eliminar Ejercicio',
      `¿Estás seguro de que quieres eliminar "${exercise.name.es}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => deleteMutation.mutate(exercise._id),
        },
      ]
    );
  };

  const renderExercise = ({ item }: { item: Exercise }) => (
    <View style={styles.exerciseCard}>
      <View style={styles.exerciseIcon}>
        <Ionicons name={getCategoryIcon(item.category)} size={24} color="#9D12DE" />
      </View>

      <View style={styles.exerciseInfo}>
        <Text style={styles.exerciseName}>{item.name.es}</Text>
        <Text style={styles.exerciseSubtitle}>{item.name.en}</Text>
        <View style={styles.exerciseMeta}>
          <Text style={styles.metaText}>
            {item.category.toUpperCase()} • Dificultad {item.difficulty}
          </Text>
          <Text style={styles.metaText}>• {getTypeLabel(item.type, item.unit)}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDelete(item)}
        disabled={deleteMutation.isPending}
      >
        <Ionicons name="trash-outline" size={20} color="#ef4444" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Mis Ejercicios',
          headerRight: () => (
            <TouchableOpacity onPress={() => router.push('/exercises/create')}>
              <Ionicons name="add" size={28} color="#9D12DE" />
            </TouchableOpacity>
          ),
        }}
      />

      {isLoading && (
        <View style={styles.centered}>
          <Text style={styles.loadingText}>Cargando...</Text>
        </View>
      )}

      {error && (
        <View style={styles.centered}>
          <Ionicons name="alert-circle-outline" size={48} color="#ef4444" />
          <Text style={styles.errorText}>Error al cargar ejercicios</Text>
        </View>
      )}

      {!isLoading && !error && data?.data.length === 0 && (
        <View style={styles.centered}>
          <Ionicons name="barbell-outline" size={64} color="#666" />
          <Text style={styles.emptyText}>No tienes ejercicios personalizados</Text>
          <TouchableOpacity
            style={styles.createButton}
            onPress={() => router.push('/exercises/create')}
          >
            <Text style={styles.createButtonText}>Crear Ejercicio</Text>
          </TouchableOpacity>
        </View>
      )}

      {!isLoading && !error && data && data.data.length > 0 && (
        <FlatList
          data={data.data}
          renderItem={renderExercise}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    color: '#666',
    fontSize: 16,
  },
  errorText: {
    color: '#ef4444',
    fontSize: 16,
    marginTop: 12,
  },
  emptyText: {
    color: '#666',
    fontSize: 16,
    marginTop: 12,
    marginBottom: 24,
  },
  createButton: {
    backgroundColor: '#9D12DE',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  createButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  list: {
    padding: 16,
  },
  exerciseCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  exerciseIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#9D12DE20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  exerciseSubtitle: {
    color: '#999',
    fontSize: 14,
    marginBottom: 6,
  },
  exerciseMeta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  metaText: {
    color: '#666',
    fontSize: 12,
    marginRight: 8,
  },
  deleteButton: {
    padding: 8,
  },
});

