import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import { Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useQuery } from '@tanstack/react-query';
import { recordsApi, ExerciseRecords } from '@/services/api/records.api';
import { useEffect, useRef } from 'react';

const RECORD_TYPES = {
  weight: { label: 'Peso Máximo', icon: 'barbell', color: '#f59e0b', unit: 'kg' },
  reps: { label: 'Repeticiones', icon: 'repeat', color: '#3b82f6', unit: 'reps' },
  volume: { label: 'Volumen Total', icon: 'speedometer', color: '#8b5cf6', unit: 'kg' },
  duration: { label: 'Duración', icon: 'time', color: '#10b981', unit: 'sec' },
  distance: { label: 'Distancia', icon: 'navigate', color: '#ef4444', unit: 'km' },
};

export default function RecordsScreen() {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'recent'>('all');

  const { data: allRecordsData, isLoading } = useQuery({
    queryKey: ['records'],
    queryFn: () => recordsApi.getUserRecords(),
  });

  const { data: recentRecordsData } = useQuery({
    queryKey: ['records', 'recent'],
    queryFn: () => recordsApi.getRecentRecords(30),
  });

  const allRecords = allRecordsData?.data || [];
  const recentRecords = recentRecordsData?.data || [];

  const formatValue = (value: number, type: string, unit?: string) => {
    if (type === 'duration') {
      const mins = Math.floor(value / 60);
      const secs = Math.floor(value % 60);
      return `${mins}:${secs.toString().padStart(2, '0')} min`;
    }
    if (type === 'distance') {
      return `${value.toFixed(2)} ${unit || 'km'}`;
    }
    if (type === 'volume') {
      return `${value.toFixed(0)} ${unit || 'kg'}`;
    }
    return `${value} ${unit || ''}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Hoy';
    if (diffDays === 1) return 'Ayer';
    if (diffDays < 7) return `Hace ${diffDays} días`;
    if (diffDays < 30) return `Hace ${Math.floor(diffDays / 7)} semanas`;
    return date.toLocaleDateString('es-ES', { day: '2-digit', month: 'short' });
  };

  const RecordCard = ({ exerciseRecord }: { exerciseRecord: ExerciseRecords }) => {
    const scaleAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }).start();
    }, []);

    const exerciseName =
      exerciseRecord.exerciseId?.name?.es || exerciseRecord.exerciseId?.name || 'Ejercicio';

    const recordsArray = Object.values(exerciseRecord.records);

    return (
      <Animated.View
        style={[
          styles.recordCard,
          {
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <View style={styles.recordHeader}>
          <View style={{ flex: 1 }}>
            <Text style={styles.exerciseName}>{exerciseName}</Text>
            <Text style={styles.exerciseCategory}>
              {exerciseRecord.exerciseId?.category || ''}
            </Text>
          </View>
          <View style={styles.recordCountBadge}>
            <Text style={styles.recordCountText}>{recordsArray.length}</Text>
            <Ionicons name="trophy" size={16} color="#f59e0b" />
          </View>
        </View>

        <View style={styles.recordsGrid}>
          {recordsArray.map((record) => {
            const recordType = RECORD_TYPES[record.type as keyof typeof RECORD_TYPES];
            if (!recordType) return null;

            return (
              <View key={record.type} style={styles.recordItem}>
                <View
                  style={[styles.recordIcon, { backgroundColor: `${recordType.color}20` }]}
                >
                  <Ionicons name={recordType.icon as any} size={20} color={recordType.color} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.recordTypeLabel}>{recordType.label}</Text>
                  <Text style={styles.recordValue}>
                    {formatValue(record.value, record.type, record.unit)}
                  </Text>
                  <View style={styles.recordFooter}>
                    <Text style={styles.recordDate}>{formatDate(record.achievedAt)}</Text>
                    {record.improvement && record.improvement > 0 && (
                      <View style={styles.improvementBadge}>
                        <Ionicons name="trending-up" size={10} color="#10b981" />
                        <Text style={styles.improvementText}>
                          +{record.improvement.toFixed(1)}%
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      </Animated.View>
    );
  };

  const RecentRecordItem = ({ record }: { record: any }) => {
    const recordType = RECORD_TYPES[record.type as keyof typeof RECORD_TYPES];
    if (!recordType) return null;

    const exerciseName = record.exerciseId?.name?.es || record.exerciseId?.name || 'Ejercicio';

    return (
      <View style={styles.recentItem}>
        <LinearGradient
          colors={[`${recordType.color}40`, `${recordType.color}20`]}
          style={styles.recentItemGradient}
        >
          <View style={styles.recentItemHeader}>
            <View style={[styles.recordIcon, { backgroundColor: recordType.color }]}>
              <Ionicons name={recordType.icon as any} size={20} color="#fff" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.recentExerciseName}>{exerciseName}</Text>
              <Text style={styles.recentRecordType}>{recordType.label}</Text>
            </View>
            <View style={styles.recentValueContainer}>
              <Text style={styles.recentValue}>
                {formatValue(record.value, record.type, record.unit)}
              </Text>
              {record.improvement && record.improvement > 0 && (
                <View style={styles.improvementBadgeLarge}>
                  <Ionicons name="trending-up" size={14} color="#10b981" />
                  <Text style={styles.improvementTextLarge}>+{record.improvement.toFixed(1)}%</Text>
                </View>
              )}
            </View>
          </View>
          <Text style={styles.recentDate}>{formatDate(record.achievedAt)}</Text>
        </LinearGradient>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Records Personales',
          headerStyle: { backgroundColor: '#000' },
          headerTintColor: '#fff',
        }}
      />

      {/* Filter Tabs */}
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterTab, selectedFilter === 'all' && styles.filterTabActive]}
          onPress={() => setSelectedFilter('all')}
        >
          <Ionicons
            name="trophy"
            size={20}
            color={selectedFilter === 'all' ? '#fff' : '#666'}
          />
          <Text
            style={[styles.filterTabText, selectedFilter === 'all' && styles.filterTabTextActive]}
          >
            Todos
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.filterTab, selectedFilter === 'recent' && styles.filterTabActive]}
          onPress={() => setSelectedFilter('recent')}
        >
          <Ionicons
            name="flame"
            size={20}
            color={selectedFilter === 'recent' ? '#fff' : '#666'}
          />
          <Text
            style={[
              styles.filterTabText,
              selectedFilter === 'recent' && styles.filterTabTextActive,
            ]}
          >
            Recientes (30d)
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Stats Header */}
        <View style={styles.statsHeader}>
          <LinearGradient colors={['#f59e0b', '#d97706']} style={styles.statCard}>
            <Ionicons name="trophy" size={32} color="#fff" />
            <Text style={styles.statValue}>{allRecords.length}</Text>
            <Text style={styles.statLabel}>Ejercicios con Records</Text>
          </LinearGradient>

          <LinearGradient colors={['#10b981', '#059669']} style={styles.statCard}>
            <Ionicons name="flame" size={32} color="#fff" />
            <Text style={styles.statValue}>{recentRecords.length}</Text>
            <Text style={styles.statLabel}>Records (30d)</Text>
          </LinearGradient>
        </View>

        {/* Records List */}
        {selectedFilter === 'all' ? (
          <>
            {isLoading && (
              <View style={styles.centered}>
                <Text style={styles.loadingText}>Cargando records...</Text>
              </View>
            )}

            {!isLoading && allRecords.length === 0 && (
              <View style={styles.empty}>
                <Ionicons name="trophy-outline" size={64} color="#666" />
                <Text style={styles.emptyText}>Aún no tienes records personales</Text>
                <Text style={styles.emptySubtext}>
                  Completa entrenamientos para establecer tus primeros records
                </Text>
              </View>
            )}

            {allRecords.map((exerciseRecord) => (
              <RecordCard key={exerciseRecord.exerciseId._id} exerciseRecord={exerciseRecord} />
            ))}
          </>
        ) : (
          <>
            {recentRecords.length === 0 && (
              <View style={styles.empty}>
                <Ionicons name="flame-outline" size={64} color="#666" />
                <Text style={styles.emptyText}>No hay records en los últimos 30 días</Text>
                <Text style={styles.emptySubtext}>
                  ¡Entrena duro para batir tus marcas!
                </Text>
              </View>
            )}

            {recentRecords.map((record) => (
              <RecentRecordItem key={record._id} record={record} />
            ))}
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  filterContainer: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#1a1a1a',
  },
  filterTab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#1a1a1a',
  },
  filterTabActive: {
    backgroundColor: '#f59e0b',
  },
  filterTabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  filterTabTextActive: {
    color: '#fff',
  },
  content: {
    padding: 16,
  },
  statsHeader: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 32,
    fontWeight: '700',
    color: '#fff',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#fff',
    opacity: 0.9,
    marginTop: 4,
    textAlign: 'center',
  },
  recordCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  recordHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
  },
  exerciseCategory: {
    fontSize: 12,
    color: '#999',
    textTransform: 'uppercase',
  },
  recordCountBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#27272a',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  recordCountText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#f59e0b',
  },
  recordsGrid: {
    gap: 12,
  },
  recordItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  recordIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  recordTypeLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 2,
  },
  recordValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
  },
  recordFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  recordDate: {
    fontSize: 11,
    color: '#666',
  },
  improvementBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    backgroundColor: '#10b98120',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  improvementText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#10b981',
  },
  recentItem: {
    marginBottom: 12,
    borderRadius: 12,
    overflow: 'hidden',
  },
  recentItemGradient: {
    padding: 16,
  },
  recentItemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  recentExerciseName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 2,
  },
  recentRecordType: {
    fontSize: 12,
    color: '#d1d5db',
  },
  recentValueContainer: {
    alignItems: 'flex-end',
  },
  recentValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
  },
  improvementBadgeLarge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#10b98130',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  improvementTextLarge: {
    fontSize: 12,
    fontWeight: '600',
    color: '#10b981',
  },
  recentDate: {
    fontSize: 12,
    color: '#d1d5db',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
  },
  empty: {
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    marginTop: 16,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 14,
    color: '#555',
    marginTop: 8,
    textAlign: 'center',
  },
});
