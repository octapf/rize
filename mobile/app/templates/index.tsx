import React, { useState } from 'react';
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
import { templatesApi, WorkoutTemplate } from '@/services/api/templates.api';
import { LinearGradient } from 'expo-linear-gradient';
import { useToast } from '@/contexts/ToastContext';

const CATEGORIES = [
  { value: 'all', label: 'Todos', icon: 'apps' },
  { value: 'push', label: 'Push', icon: 'arrow-up' },
  { value: 'pull', label: 'Pull', icon: 'arrow-down' },
  { value: 'legs', label: 'Piernas', icon: 'walk' },
  { value: 'upper', label: 'Upper', icon: 'body' },
  { value: 'lower', label: 'Lower', icon: 'footsteps' },
  { value: 'full-body', label: 'Full Body', icon: 'fitness' },
];

export default function TemplatesScreen() {
  const queryClient = useQueryClient();
  const toast = useToast();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showPublic, setShowPublic] = useState(false);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['templates', selectedCategory, showPublic],
    queryFn: () =>
      showPublic
        ? templatesApi.getPublicTemplates({
            category: selectedCategory !== 'all' ? (selectedCategory as any) : undefined,
          })
        : templatesApi.getTemplates({
            category: selectedCategory !== 'all' ? (selectedCategory as any) : undefined,
          }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => templatesApi.deleteTemplate(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['templates'] });
      toast.success('Plantilla eliminada');
    },
    onError: () => {
      toast.error('Error al eliminar plantilla');
    },
  });

  const createWorkoutMutation = useMutation({
    mutationFn: (templateId: string) => templatesApi.createWorkoutFromTemplate(templateId),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['workouts'] });
      toast.success('Workout creado desde plantilla');
      router.push(`/workouts/${response.data._id}`);
    },
    onError: () => {
      toast.error('Error al crear workout');
    },
  });

  const handleDelete = (template: WorkoutTemplate) => {
    Alert.alert(
      'Eliminar Plantilla',
      `¿Estás seguro de que quieres eliminar "${template.name}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => deleteMutation.mutate(template._id),
        },
      ]
    );
  };

  const handleUseTemplate = (template: WorkoutTemplate) => {
    Alert.alert('Usar Plantilla', `¿Crear workout desde "${template.name}"?`, [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Crear',
        onPress: () => createWorkoutMutation.mutate(template._id),
      },
    ]);
  };

  const renderTemplate = ({ item }: { item: WorkoutTemplate }) => {
    const exerciseCount = item.exercises.length;
    const totalSets = item.exercises.reduce((sum, ex) => sum + ex.sets.length, 0);

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => handleUseTemplate(item)}
        activeOpacity={0.7}
      >
        <View style={styles.cardHeader}>
          <View style={{ flex: 1 }}>
            <Text style={styles.cardTitle}>{item.name}</Text>
            {item.description && (
              <Text style={styles.cardDescription} numberOfLines={2}>
                {item.description}
              </Text>
            )}
          </View>
          {!showPublic && (
            <TouchableOpacity
              onPress={() => handleDelete(item)}
              style={styles.deleteButton}
            >
              <Ionicons name="trash-outline" size={20} color="#ef4444" />
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.cardMeta}>
          <View style={styles.metaBadge}>
            <Ionicons name="barbell" size={14} color="#9D12DE" />
            <Text style={styles.metaText}>
              {exerciseCount} ejercicio{exerciseCount !== 1 ? 's' : ''}
            </Text>
          </View>
          <View style={styles.metaBadge}>
            <Ionicons name="list" size={14} color="#9D12DE" />
            <Text style={styles.metaText}>{totalSets} series</Text>
          </View>
          {item.usageCount > 0 && (
            <View style={styles.metaBadge}>
              <Ionicons name="repeat" size={14} color="#FFEA00" />
              <Text style={styles.metaText}>{item.usageCount} usos</Text>
            </View>
          )}
        </View>

        <TouchableOpacity style={styles.useButton}>
          <LinearGradient colors={['#9D12DE', '#7C3AED']} style={styles.useButtonGradient}>
            <Ionicons name="add-circle" size={18} color="#fff" />
            <Text style={styles.useButtonText}>Usar Plantilla</Text>
          </LinearGradient>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Plantillas',
          headerStyle: { backgroundColor: '#000' },
          headerTintColor: '#fff',
          headerRight: () => (
            <TouchableOpacity
              onPress={() => setShowPublic(!showPublic)}
              style={styles.toggleButton}
            >
              <Ionicons
                name={showPublic ? 'person' : 'globe'}
                size={24}
                color="#9D12DE"
              />
            </TouchableOpacity>
          ),
        }}
      />

      {/* Categories */}
      <View style={styles.categoriesContainer}>
        <FlatList
          horizontal
          data={CATEGORIES}
          keyExtractor={(item) => item.value}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesList}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.categoryChip,
                selectedCategory === item.value && styles.categoryChipActive,
              ]}
              onPress={() => setSelectedCategory(item.value)}
            >
              <Ionicons
                name={item.icon as any}
                size={16}
                color={selectedCategory === item.value ? '#fff' : '#666'}
              />
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === item.value && styles.categoryTextActive,
                ]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Templates List */}
      {isLoading && (
        <View style={styles.centered}>
          <Text style={styles.loadingText}>Cargando plantillas...</Text>
        </View>
      )}

      {!isLoading && data?.data.length === 0 && (
        <View style={styles.centered}>
          <Ionicons name="document-text-outline" size={64} color="#666" />
          <Text style={styles.emptyText}>
            {showPublic
              ? 'No hay plantillas públicas'
              : 'No tienes plantillas guardadas'}
          </Text>
          {!showPublic && (
            <Text style={styles.emptySubtext}>
              Guarda un workout como plantilla para reutilizarlo
            </Text>
          )}
        </View>
      )}

      {!isLoading && data && data.data.length > 0 && (
        <FlatList
          data={data.data}
          renderItem={renderTemplate}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.list}
          onRefresh={refetch}
          refreshing={isLoading}
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
  toggleButton: {
    padding: 8,
  },
  categoriesContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#1a1a1a',
  },
  categoriesList: {
    padding: 12,
    gap: 8,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#1a1a1a',
    borderWidth: 1,
    borderColor: '#333',
  },
  categoryChipActive: {
    backgroundColor: '#9D12DE',
    borderColor: '#9D12DE',
  },
  categoryText: {
    color: '#666',
    fontSize: 14,
    fontWeight: '500',
  },
  categoryTextActive: {
    color: '#fff',
  },
  list: {
    padding: 16,
  },
  card: {
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: '#999',
    lineHeight: 20,
  },
  deleteButton: {
    padding: 8,
    marginLeft: 8,
  },
  cardMeta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  metaBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: '#27272a',
  },
  metaText: {
    fontSize: 12,
    color: '#a1a1aa',
  },
  useButton: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  useButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 12,
  },
  useButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
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
  emptyText: {
    color: '#666',
    fontSize: 16,
    marginTop: 16,
    textAlign: 'center',
  },
  emptySubtext: {
    color: '#555',
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
  },
});

