import React, { useState } from 'react';
import { Text } from '@/components/ui/Text';
import { View, ScrollView, TouchableOpacity, StyleSheet, Alert, Modal, FlatList } from 'react-native';;
import { Stack, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { routinesApi, Routine, DaySchedule } from '@/services/api/routines.api';
import { templatesApi, WorkoutTemplate } from '@/services/api/templates.api';
import { useToast } from '@/contexts/ToastContext';

const DAYS = [
  { key: 'monday', label: 'Lun', fullName: 'Lunes', icon: 'today' },
  { key: 'tuesday', label: 'Mar', fullName: 'Martes', icon: 'today' },
  { key: 'wednesday', label: 'Mié', fullName: 'Miércoles', icon: 'today' },
  { key: 'thursday', label: 'Jue', fullName: 'Jueves', icon: 'today' },
  { key: 'friday', label: 'Vie', fullName: 'Viernes', icon: 'today' },
  { key: 'saturday', label: 'Sáb', fullName: 'Sábado', icon: 'today' },
  { key: 'sunday', label: 'Dom', fullName: 'Domingo', icon: 'today' },
];

export default function RoutinesScreen() {
  const queryClient = useQueryClient();
  const toast = useToast();
  const [showTemplateSelector, setShowTemplateSelector] = useState(false);
  const [selectedDay, setSelectedDay] = useState<keyof DaySchedule | null>(null);
  const [editingRoutine, setEditingRoutine] = useState<Routine | null>(null);

  const { data: activeRoutineData } = useQuery({
    queryKey: ['routines', 'active'],
    queryFn: () => routinesApi.getActiveRoutine(),
  });

  const { data: templatesData } = useQuery({
    queryKey: ['templates', 'for-routine'],
    queryFn: () => templatesApi.getTemplates({}),
  });

  const createRoutineMutation = useMutation({
    mutationFn: routinesApi.createRoutine,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['routines'] });
      toast.success('Rutina creada');
    },
  });

  const updateRoutineMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      routinesApi.updateRoutine(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['routines'] });
      toast.success('Rutina actualizada');
    },
  });

  const activeRoutine = activeRoutineData?.data;
  const templates = templatesData?.data || [];

  const handleDayPress = (day: keyof DaySchedule) => {
    if (!activeRoutine) {
      // Create new routine if none exists
      createRoutineMutation.mutate({
        name: 'Mi Rutina Semanal',
        schedule: {},
        isActive: true,
      });
      return;
    }

    setSelectedDay(day);
    setEditingRoutine(activeRoutine);
    setShowTemplateSelector(true);
  };

  const handleTemplateSelect = (template: WorkoutTemplate) => {
    if (!editingRoutine || !selectedDay) return;

    const updatedSchedule = {
      ...editingRoutine.schedule,
      [selectedDay]: template._id,
    };

    updateRoutineMutation.mutate({
      id: editingRoutine._id,
      data: { schedule: updatedSchedule },
    });

    setShowTemplateSelector(false);
    setSelectedDay(null);
  };

  const handleRemoveDay = (day: keyof DaySchedule) => {
    if (!activeRoutine) return;

    Alert.alert(
      'Eliminar entrenamiento',
      `¿Quitar el entrenamiento del ${DAYS.find((d) => d.key === day)?.fullName}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => {
            const updatedSchedule = { ...activeRoutine.schedule };
            delete updatedSchedule[day];

            updateRoutineMutation.mutate({
              id: activeRoutine._id,
              data: { schedule: updatedSchedule },
            });
          },
        },
      ]
    );
  };

  const getTodayKey = (): keyof DaySchedule => {
    const today = new Date().getDay();
    const dayMap = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    return dayMap[today] as keyof DaySchedule;
  };

  const todayKey = getTodayKey();

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Mi Rutina Semanal',
          headerStyle: { backgroundColor: '#000' },
          headerTintColor: '#fff',
        }}
      />

      <ScrollView contentContainerStyle={styles.content}>
        {/* Header Info */}
        {activeRoutine && (
          <View style={styles.headerCard}>
            <LinearGradient colors={['#9D12DE', '#7C3AED']} style={styles.headerGradient}>
              <View style={styles.headerContent}>
                <Ionicons name="calendar" size={32} color="#fff" />
                <View style={{ flex: 1, marginLeft: 16 }}>
                  <Text style={styles.headerTitle}>{activeRoutine.name}</Text>
                  {activeRoutine.description && (
                    <Text style={styles.headerDescription}>{activeRoutine.description}</Text>
                  )}
                </View>
                <View style={styles.activeBadge}>
                  <Text style={styles.activeBadgeText}>ACTIVA</Text>
                </View>
              </View>
            </LinearGradient>
          </View>
        )}

        {/* Weekly Calendar */}
        <View style={styles.calendarContainer}>
          <Text style={styles.sectionTitle}>Calendario Semanal</Text>

          {DAYS.map((day) => {
            const templateId = activeRoutine?.schedule[day.key as keyof DaySchedule];
            const template = templates.find((t) => t._id === templateId);
            const isToday = day.key === todayKey;

            return (
              <TouchableOpacity
                key={day.key}
                style={[styles.dayCard, isToday && styles.dayCardToday]}
                onPress={() => handleDayPress(day.key as keyof DaySchedule)}
              >
                <View style={styles.dayHeader}>
                  <View style={styles.dayLabelContainer}>
                    <Text style={[styles.dayLabel, isToday && styles.dayLabelToday]}>
                      {day.fullName}
                    </Text>
                    {isToday && (
                      <View style={styles.todayBadge}>
                        <Text style={styles.todayBadgeText}>HOY</Text>
                      </View>
                    )}
                  </View>

                  {template ? (
                    <TouchableOpacity
                      onPress={() => handleRemoveDay(day.key as keyof DaySchedule)}
                      style={styles.removeButton}
                    >
                      <Ionicons name="close-circle" size={24} color="#ef4444" />
                    </TouchableOpacity>
                  ) : (
                    <Ionicons name="add-circle-outline" size={24} color="#666" />
                  )}
                </View>

                {template ? (
                  <View style={styles.templateInfo}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.templateName}>{template.name}</Text>
                      <View style={styles.templateMeta}>
                        <Ionicons name="barbell" size={14} color="#9D12DE" />
                        <Text style={styles.templateMetaText}>
                          {template.exercises?.length || 0} ejercicios
                        </Text>
                      </View>
                    </View>
                    <LinearGradient
                      colors={['#9D12DE', '#7C3AED']}
                      style={styles.playButton}
                    >
                      <Ionicons name="play" size={16} color="#fff" />
                    </LinearGradient>
                  </View>
                ) : (
                  <View style={styles.emptyDay}>
                    <Text style={styles.emptyDayText}>Día de descanso</Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Create Routine Button */}
        {!activeRoutine && (
          <TouchableOpacity
            style={styles.createButton}
            onPress={() =>
              createRoutineMutation.mutate({
                name: 'Mi Rutina Semanal',
                schedule: {},
                isActive: true,
              })
            }
          >
            <LinearGradient colors={['#9D12DE', '#7C3AED']} style={styles.createButtonGradient}>
              <Ionicons name="add-circle" size={24} color="#fff" />
              <Text style={styles.createButtonText}>Crear Rutina Semanal</Text>
            </LinearGradient>
          </TouchableOpacity>
        )}
      </ScrollView>

      {/* Template Selector Modal */}
      <Modal
        visible={showTemplateSelector}
        transparent
        animationType="slide"
        onRequestClose={() => setShowTemplateSelector(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                Selecciona una plantilla para {selectedDay && DAYS.find((d) => d.key === selectedDay)?.fullName}
              </Text>
              <TouchableOpacity onPress={() => setShowTemplateSelector(false)}>
                <Ionicons name="close" size={28} color="#fff" />
              </TouchableOpacity>
            </View>

            <FlatList
              data={templates}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.templateItem}
                  onPress={() => handleTemplateSelect(item)}
                >
                  <View style={{ flex: 1 }}>
                    <Text style={styles.templateItemName}>{item.name}</Text>
                    <Text style={styles.templateItemMeta}>
                      {item.exercises?.length || 0} ejercicios • {item.category}
                    </Text>
                  </View>
                  <Ionicons name="checkmark-circle" size={24} color="#9D12DE" />
                </TouchableOpacity>
              )}
              ListEmptyComponent={
                <View style={styles.emptyTemplates}>
                  <Ionicons name="document-text-outline" size={48} color="#666" />
                  <Text style={styles.emptyTemplatesText}>
                    No tienes plantillas. Crea una primero.
                  </Text>
                  <TouchableOpacity
                    style={styles.goToTemplatesButton}
                    onPress={() => {
                      setShowTemplateSelector(false);
                      router.push('/templates');
                    }}
                  >
                    <Text style={styles.goToTemplatesButtonText}>Ir a Plantillas</Text>
                  </TouchableOpacity>
                </View>
              }
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  content: {
    padding: 16,
  },
  headerCard: {
    marginBottom: 24,
    borderRadius: 16,
    overflow: 'hidden',
  },
  headerGradient: {
    padding: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
  },
  headerDescription: {
    fontSize: 14,
    color: '#d1fae5',
  },
  activeBadge: {
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  activeBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#9D12DE',
  },
  calendarContainer: {
    gap: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 8,
  },
  dayCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: '#333',
  },
  dayCardToday: {
    borderColor: '#9D12DE',
    backgroundColor: '#0a2f1f',
  },
  dayHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  dayLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dayLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  dayLabelToday: {
    color: '#9D12DE',
  },
  todayBadge: {
    backgroundColor: '#9D12DE',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  todayBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#fff',
  },
  removeButton: {
    padding: 4,
  },
  templateInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  templateName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  templateMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  templateMetaText: {
    fontSize: 12,
    color: '#999',
  },
  playButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyDay: {
    paddingVertical: 8,
  },
  emptyDayText: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
  createButton: {
    marginTop: 24,
    borderRadius: 12,
    overflow: 'hidden',
  },
  createButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
  },
  createButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#1a1a1a',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '80%',
    paddingBottom: 40,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    flex: 1,
    marginRight: 16,
  },
  templateItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  templateItemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  templateItemMeta: {
    fontSize: 12,
    color: '#999',
  },
  emptyTemplates: {
    alignItems: 'center',
    padding: 40,
  },
  emptyTemplatesText: {
    fontSize: 14,
    color: '#666',
    marginTop: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  goToTemplatesButton: {
    backgroundColor: '#9D12DE',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  goToTemplatesButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
});

