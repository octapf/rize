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

interface WorkoutSession {
  id: string;
  name: string;
  type: 'push' | 'pull' | 'legs' | 'upper' | 'lower' | 'fullbody' | 'cardio' | 'other';
  date: Date;
  duration: number; // minutes
  exercises: {
    name: string;
    sets: number;
    reps: string;
    weight?: number;
    notes?: string;
  }[];
  totalVolume: number; // kg
  notes?: string;
  rating?: number; // 1-5
}

const WORKOUT_TYPES = [
  { id: 'all', label: 'Todos', icon: 'apps', color: 'zinc' },
  { id: 'push', label: 'Push', icon: 'arrow-up', color: 'blue' },
  { id: 'pull', label: 'Pull', icon: 'arrow-down', color: 'primary' },
  { id: 'legs', label: 'Piernas', icon: 'walk', color: 'red' },
  { id: 'upper', label: 'Superior', icon: 'body', color: 'purple' },
  { id: 'lower', label: 'Inferior', icon: 'fitness', color: 'amber' },
  { id: 'fullbody', label: 'Full Body', icon: 'barbell', color: 'cyan' },
];

const MOCK_SESSIONS: WorkoutSession[] = [
  {
    id: '1',
    name: 'Push Day A',
    type: 'push',
    date: new Date(2026, 0, 27),
    duration: 75,
    exercises: [
      { name: 'Press Banca', sets: 4, reps: '8,8,6,6', weight: 100, notes: 'Peso nuevo PR' },
      { name: 'Press Inclinado DB', sets: 3, reps: '10,10,8', weight: 35 },
      { name: 'Press Militar', sets: 4, reps: '8,8,8,6', weight: 60 },
      { name: 'Elevaciones Laterales', sets: 3, reps: '12,12,10', weight: 12 },
      { name: 'TrÌceps Polea', sets: 3, reps: '12,12,12', weight: 40 },
    ],
    totalVolume: 4280,
    rating: 5,
    notes: 'Excelente sesiÛn, nuevo PR en banca',
  },
  {
    id: '2',
    name: 'Pull Day A',
    type: 'pull',
    date: new Date(2026, 0, 25),
    duration: 70,
    exercises: [
      { name: 'Peso Muerto', sets: 3, reps: '5,5,5', weight: 140 },
      { name: 'Dominadas', sets: 4, reps: '10,8,8,6', weight: 0 },
      { name: 'Remo Barra', sets: 4, reps: '8,8,8,8', weight: 80 },
      { name: 'Face Pulls', sets: 3, reps: '15,15,15', weight: 25 },
      { name: 'Curl BÌceps', sets: 3, reps: '10,10,10', weight: 20 },
    ],
    totalVolume: 4230,
    rating: 4,
  },
  {
    id: '3',
    name: 'Leg Day A',
    type: 'legs',
    date: new Date(2026, 0, 23),
    duration: 80,
    exercises: [
      { name: 'Sentadilla', sets: 4, reps: '8,8,6,6', weight: 120 },
      { name: 'Prensa', sets: 3, reps: '12,10,10', weight: 200 },
      { name: 'Zancadas', sets: 3, reps: '10,10,10', weight: 25 },
      { name: 'Curl Femoral', sets: 3, reps: '12,12,10', weight: 50 },
      { name: 'Pantorrillas', sets: 4, reps: '15,15,15,12', weight: 80 },
    ],
    totalVolume: 6580,
    rating: 5,
    notes: 'Piernas destruidas, muy buen volumen',
  },
  {
    id: '4',
    name: 'Upper Body',
    type: 'upper',
    date: new Date(2026, 0, 21),
    duration: 65,
    exercises: [
      { name: 'Press Banca', sets: 3, reps: '10,10,8', weight: 90 },
      { name: 'Remo DB', sets: 3, reps: '12,10,10', weight: 40 },
      { name: 'Press Militar DB', sets: 3, reps: '10,10,8', weight: 25 },
      { name: 'Dominadas Neutras', sets: 3, reps: '8,8,6', weight: 0 },
    ],
    totalVolume: 2912,
    rating: 3,
    notes: 'SesiÛn ligera de recuperaciÛn',
  },
];

export default function WorkoutHistory() {
  const [sessions, setSessions] = useState(MOCK_SESSIONS);
  const [filter, setFilter] = useState<string>('all');
  const [expandedSession, setExpandedSession] = useState<string | null>(null);

  const filteredSessions = filter === 'all'
    ? sessions
    : sessions.filter((s) => s.type === filter);

  const getTypeInfo = (type: string) => {
    return WORKOUT_TYPES.find((t) => t.id === type) || WORKOUT_TYPES[0];
  };

  const deleteSession = (id: string) => {
    Alert.alert(
      'Eliminar SesiÛn',
      'øEst·s seguro?',
      [
        { text: 'Cancelar' },
        { text: 'Eliminar', style: 'destructive', onPress: () => setSessions(sessions.filter((s) => s.id !== id)) },
      ]
    );
  };

  const getWeeklyStats = () => {
    const lastWeek = sessions.filter((s) => {
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return s.date >= weekAgo;
    });

    return {
      sessions: lastWeek.length,
      totalDuration: lastWeek.reduce((sum, s) => sum + s.duration, 0),
      totalVolume: lastWeek.reduce((sum, s) => sum + s.totalVolume, 0),
      avgRating: lastWeek.length > 0
        ? lastWeek.reduce((sum, s) => sum + (s.rating || 0), 0) / lastWeek.length
        : 0,
    };
  };

  const stats = getWeeklyStats();

  return (
    <View className="flex-1 bg-zinc-950">
      {/* Header */}
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1 ml-3">
            Workout History
          </Text>
          <TouchableOpacity>
            <Ionicons name="stats-chart" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Type Filters */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row gap-2">
            {WORKOUT_TYPES.map((type) => (
              <TouchableOpacity
                key={type.id}
                onPress={() => setFilter(type.id)}
                className={`flex-row items-center px-4 py-2 rounded-lg ${
                  filter === type.id ? 'bg-primary' : 'bg-zinc-900 border border-zinc-800'
                }`}
              >
                <Ionicons
                  name={type.icon as any}
                  size={18}
                  color={filter === type.id ? 'white' : '#71717A'}
                />
                <Text className={`ml-2 font-semibold text-sm ${filter === type.id ? 'text-white' : 'text-zinc-400'}`}>
                  {type.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          {/* Weekly Stats */}
          <View className="bg-zinc-900 rounded-xl p-4 mb-6 border border-zinc-800">
            <Text className="text-white font-bold text-lg mb-3">Esta Semana</Text>
            <View className="flex-row flex-wrap gap-3">
              <View className="flex-1 min-w-[45%] bg-primary/10 rounded-lg p-3 border border-primary/30">
                <Text className="text-primary text-xs mb-1">Sesiones</Text>
                <Text className="text-white text-2xl font-bold">{stats.sessions}</Text>
              </View>
              <View className="flex-1 min-w-[45%] bg-primary/10 rounded-lg p-3 border border-primary/30">
                <Text className="text-primary/80 text-xs mb-1">Tiempo Total</Text>
                <Text className="text-white text-2xl font-bold">{stats.totalDuration} min</Text>
              </View>
              <View className="flex-1 min-w-[45%] bg-purple-500/10 rounded-lg p-3 border border-purple-500/30">
                <Text className="text-purple-400 text-xs mb-1">Volumen Total</Text>
                <Text className="text-white text-2xl font-bold">{stats.totalVolume.toLocaleString()} kg</Text>
              </View>
              <View className="flex-1 min-w-[45%] bg-amber-500/10 rounded-lg p-3 border border-amber-500/30">
                <Text className="text-amber-400 text-xs mb-1">Rating Promedio</Text>
                <Text className="text-white text-2xl font-bold">{stats.avgRating.toFixed(1)}/5</Text>
              </View>
            </View>
          </View>

          {/* Sessions List */}
          <Text className="text-white font-bold text-lg mb-4">Historial de Entrenamientos</Text>
          {filteredSessions.length === 0 ? (
            <View className="bg-zinc-900 rounded-xl p-8 items-center border border-zinc-800">
              <Text className="text-6xl mb-3">üèãÔ∏è</Text>
              <Text className="text-white font-bold text-lg mb-2">Sin Sesiones</Text>
              <Text className="text-zinc-400 text-center">
                Tus entrenamientos aparecer·n aquÌ
              </Text>
            </View>
          ) : (
            filteredSessions.sort((a, b) => b.date.getTime() - a.date.getTime()).map((session) => {
              const typeInfo = getTypeInfo(session.type);
              const isExpanded = expandedSession === session.id;

              return (
                <View key={session.id} className="bg-zinc-900 rounded-xl p-4 mb-4 border border-zinc-800">
                  {/* Header */}
                  <TouchableOpacity
                    onPress={() => setExpandedSession(isExpanded ? null : session.id)}
                    activeOpacity={0.7}
                  >
                    <View className="flex-row items-start justify-between mb-3">
                      <View className="flex-row items-start flex-1">
                        <View className={`w-12 h-12 bg-${typeInfo.color}-500 rounded-xl items-center justify-center mr-3`}>
                          <Ionicons name={typeInfo.icon as any} size={24} color="white" />
                        </View>
                        <View className="flex-1">
                          <Text className="text-white font-bold text-lg mb-1">
                            {session.name}
                          </Text>
                          <Text className="text-zinc-400 text-sm">
                            {format(session.date, "EEEE, d 'de' MMMM", { locale: es })}
                          </Text>
                        </View>
                      </View>
                      <View className="items-end">
                        <TouchableOpacity onPress={() => deleteSession(session.id)}>
                          <Ionicons name="trash" size={20} color="#EF4444" />
                        </TouchableOpacity>
                      </View>
                    </View>

                    {/* Quick Stats */}
                    <View className="flex-row flex-wrap gap-2 mb-3">
                      <View className="bg-zinc-800 rounded px-3 py-1">
                        <Text className="text-primary/80 text-xs font-bold">
                          ‚è±Ô∏è {session.duration} min
                        </Text>
                      </View>
                      <View className="bg-zinc-800 rounded px-3 py-1">
                        <Text className="text-purple-400 text-xs font-bold">
                          üí™ {session.totalVolume.toLocaleString()} kg
                        </Text>
                      </View>
                      <View className="bg-zinc-800 rounded px-3 py-1">
                        <Text className="text-primary text-xs font-bold">
                          üìù {session.exercises.length} ejercicios
                        </Text>
                      </View>
                      {session.rating && (
                        <View className="bg-zinc-800 rounded px-3 py-1">
                          <Text className="text-amber-400 text-xs font-bold">
                            {'‚≠ê'.repeat(session.rating)}
                          </Text>
                        </View>
                      )}
                    </View>
                  </TouchableOpacity>

                  {/* Expanded Details */}
                  {isExpanded && (
                    <View>
                      <View className="border-t border-zinc-800 pt-3 mb-3">
                        <Text className="text-white font-bold mb-2">Ejercicios</Text>
                        {session.exercises.map((ex, idx) => (
                          <View key={idx} className="bg-zinc-800 rounded-lg p-3 mb-2">
                            <View className="flex-row items-center justify-between mb-1">
                              <Text className="text-white font-bold flex-1">{ex.name}</Text>
                              {ex.weight && ex.weight > 0 && (
                                <Text className="text-primary font-bold ml-2">{ex.weight} kg</Text>
                              )}
                            </View>
                            <View className="flex-row items-center gap-2">
                              <Text className="text-zinc-400 text-sm">
                                {ex.sets} series ◊ {ex.reps} reps
                              </Text>
                            </View>
                            {ex.notes && (
                              <Text className="text-zinc-500 text-xs mt-1">{ex.notes}</Text>
                            )}
                          </View>
                        ))}
                      </View>

                      {/* Notes */}
                      {session.notes && (
                        <View className="bg-primary/10 rounded-lg p-3 border border-primary/30 mb-3">
                          <Text className="text-primary/80 font-bold mb-1">Notas</Text>
                          <Text className="text-primary/60 text-sm">{session.notes}</Text>
                        </View>
                      )}

                      {/* Actions */}
                      <View className="flex-row gap-2">
                        <TouchableOpacity
                          onPress={() => Alert.alert('Repetir', 'Plantilla copiada')}
                          className="flex-1 bg-primary rounded-lg p-3 flex-row items-center justify-center"
                        >
                          <Ionicons name="repeat" size={18} color="white" />
                          <Text className="text-white font-bold ml-2">Repetir Workout</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => Alert.alert('Compartir', 'Workout compartido')}
                          className="bg-zinc-800 rounded-lg p-3 items-center justify-center px-4"
                        >
                          <Ionicons name="share-social" size={18} color="white" />
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}
                </View>
              );
            })
          )}

          {/* Tips */}
          <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-6">
            <View className="flex-row items-start">
              <Ionicons name="bar-chart" size={20} color="#9D12DE" />
              <View className="flex-1 ml-3">
                <Text className="text-primary font-bold mb-2">
                  Tips de Progreso
                </Text>
                <Text className="text-primary/80 text-sm">
                  ï Revisa tu historial semanalmente{'\n'}
                  ï Busca progresiÛn en peso o reps{'\n'}
                  ï Nota ejercicios que te cuestan{'\n'}
                  ï Repite workouts que funcionan{'\n'}
                  ï Ajusta seg˙n tu recuperaciÛn
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}


