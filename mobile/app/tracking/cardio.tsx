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

interface CardioSession {
  id: string;
  type: 'running' | 'cycling' | 'swimming' | 'rowing' | 'elliptical' | 'walking' | 'other';
  date: Date;
  duration: number; // minutes
  distance?: number; // km
  calories: number;
  avgHeartRate?: number;
  maxHeartRate?: number;
  pace?: number; // min/km
  notes?: string;
}

const CARDIO_TYPES = [
  { id: 'running', label: 'Correr', icon: '🏃', color: 'red' },
  { id: 'cycling', label: 'Ciclismo', icon: '🚴', color: 'blue' },
  { id: 'swimming', label: 'Natación', icon: '🏊', color: 'cyan' },
  { id: 'rowing', label: 'Remo', icon: '🚣', color: 'emerald' },
  { id: 'elliptical', label: 'Elíptica', icon: '🎿', color: 'purple' },
  { id: 'walking', label: 'Caminar', icon: '🚶', color: 'amber' },
  { id: 'other', label: 'Otro', icon: '💪', color: 'zinc' },
];

const MOCK_SESSIONS: CardioSession[] = [
  {
    id: '1',
    type: 'running',
    date: new Date(2026, 0, 27),
    duration: 35,
    distance: 7.2,
    calories: 420,
    avgHeartRate: 155,
    maxHeartRate: 175,
    pace: 4.86,
    notes: 'Tempo run, felt strong',
  },
  {
    id: '2',
    type: 'cycling',
    date: new Date(2026, 0, 25),
    duration: 60,
    distance: 25,
    calories: 520,
    avgHeartRate: 140,
    maxHeartRate: 165,
    notes: 'Recovery ride',
  },
  {
    id: '3',
    type: 'swimming',
    date: new Date(2026, 0, 23),
    duration: 40,
    distance: 2.0,
    calories: 380,
    notes: 'Intervals 100m',
  },
  {
    id: '4',
    type: 'walking',
    date: new Date(2026, 0, 21),
    duration: 45,
    distance: 4.5,
    calories: 200,
    avgHeartRate: 110,
    notes: 'Active recovery',
  },
];

export default function CardioTracker() {
  const [sessions, setSessions] = useState(MOCK_SESSIONS);
  const [filter, setFilter] = useState<string>('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newSession, setNewSession] = useState({
    type: 'running',
    duration: '',
    distance: '',
    calories: '',
    avgHeartRate: '',
    notes: '',
  });

  const filteredSessions = filter === 'all'
    ? sessions
    : sessions.filter((s) => s.type === filter);

  const getTypeInfo = (type: string) => {
    return CARDIO_TYPES.find((t) => t.id === type) || CARDIO_TYPES[0];
  };

  const addSession = () => {
    if (!newSession.duration || !newSession.calories) {
      Alert.alert('Error', 'Ingresa al menos duración y calorías');
      return;
    }

    const session: CardioSession = {
      id: Date.now().toString(),
      type: newSession.type as any,
      date: new Date(),
      duration: parseInt(newSession.duration),
      distance: newSession.distance ? parseFloat(newSession.distance) : undefined,
      calories: parseInt(newSession.calories),
      avgHeartRate: newSession.avgHeartRate ? parseInt(newSession.avgHeartRate) : undefined,
      notes: newSession.notes,
    };

    setSessions([session, ...sessions]);
    setNewSession({ type: 'running', duration: '', distance: '', calories: '', avgHeartRate: '', notes: '' });
    setShowAddForm(false);
    Alert.alert('Sesión Guardada! 🎉', 'Cardio registrado correctamente');
  };

  const deleteSession = (id: string) => {
    Alert.alert(
      'Eliminar Sesión',
      '¿Estás seguro?',
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
      totalCalories: lastWeek.reduce((sum, s) => sum + s.calories, 0),
      totalDistance: lastWeek.reduce((sum, s) => sum + (s.distance || 0), 0),
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
            Cardio Tracker
          </Text>
          <TouchableOpacity onPress={() => setShowAddForm(!showAddForm)}>
            <Ionicons name={showAddForm ? 'close' : 'add-circle'} size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Type Filters */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row gap-2">
            <TouchableOpacity
              onPress={() => setFilter('all')}
              className={`flex-row items-center px-4 py-2 rounded-lg ${
                filter === 'all' ? 'bg-emerald-500' : 'bg-zinc-900 border border-zinc-800'
              }`}
            >
              <Ionicons name="apps" size={18} color={filter === 'all' ? 'white' : '#71717A'} />
              <Text className={`ml-2 font-semibold text-sm ${filter === 'all' ? 'text-white' : 'text-zinc-400'}`}>
                Todos
              </Text>
            </TouchableOpacity>
            {CARDIO_TYPES.map((type) => (
              <TouchableOpacity
                key={type.id}
                onPress={() => setFilter(type.id)}
                className={`px-4 py-2 rounded-lg ${
                  filter === type.id ? 'bg-emerald-500' : 'bg-zinc-900 border border-zinc-800'
                }`}
              >
                <Text className={`font-semibold text-sm ${filter === type.id ? 'text-white' : 'text-zinc-400'}`}>
                  {type.icon} {type.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          {showAddForm ? (
            <View className="bg-zinc-900 rounded-xl p-6 mb-6 border border-zinc-800">
              <Text className="text-white font-bold text-lg mb-4">Nueva Sesión de Cardio</Text>

              {/* Type Selection */}
              <View className="mb-4">
                <Text className="text-zinc-400 text-sm mb-2">Tipo</Text>
                <View className="flex-row flex-wrap gap-2">
                  {CARDIO_TYPES.map((type) => (
                    <TouchableOpacity
                      key={type.id}
                      onPress={() => setNewSession({ ...newSession, type: type.id })}
                      className={`px-3 py-2 rounded-lg ${
                        newSession.type === type.id ? 'bg-emerald-500' : 'bg-zinc-800'
                      }`}
                    >
                      <Text className={newSession.type === type.id ? 'text-white font-bold' : 'text-zinc-400'}>
                        {type.icon} {type.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Duration & Distance */}
              <View className="flex-row gap-4 mb-4">
                <View className="flex-1">
                  <Text className="text-zinc-400 text-sm mb-2">Duración (min)</Text>
                  <TextInput
                    className="bg-zinc-800 rounded-xl px-4 py-3 text-white text-lg font-bold"
                    placeholder="30"
                    placeholderTextColor="#71717A"
                    keyboardType="numeric"
                    value={newSession.duration}
                    onChangeText={(text) => setNewSession({ ...newSession, duration: text })}
                  />
                </View>
                <View className="flex-1">
                  <Text className="text-zinc-400 text-sm mb-2">Distancia (km)</Text>
                  <TextInput
                    className="bg-zinc-800 rounded-xl px-4 py-3 text-white text-lg font-bold"
                    placeholder="5.0"
                    placeholderTextColor="#71717A"
                    keyboardType="numeric"
                    value={newSession.distance}
                    onChangeText={(text) => setNewSession({ ...newSession, distance: text })}
                  />
                </View>
              </View>

              {/* Calories & HR */}
              <View className="flex-row gap-4 mb-4">
                <View className="flex-1">
                  <Text className="text-zinc-400 text-sm mb-2">Calorías</Text>
                  <TextInput
                    className="bg-zinc-800 rounded-xl px-4 py-3 text-white text-lg font-bold"
                    placeholder="300"
                    placeholderTextColor="#71717A"
                    keyboardType="numeric"
                    value={newSession.calories}
                    onChangeText={(text) => setNewSession({ ...newSession, calories: text })}
                  />
                </View>
                <View className="flex-1">
                  <Text className="text-zinc-400 text-sm mb-2">FC Promedio</Text>
                  <TextInput
                    className="bg-zinc-800 rounded-xl px-4 py-3 text-white text-lg font-bold"
                    placeholder="150"
                    placeholderTextColor="#71717A"
                    keyboardType="numeric"
                    value={newSession.avgHeartRate}
                    onChangeText={(text) => setNewSession({ ...newSession, avgHeartRate: text })}
                  />
                </View>
              </View>

              {/* Notes */}
              <View className="mb-4">
                <Text className="text-zinc-400 text-sm mb-2">Notas (opcional)</Text>
                <TextInput
                  className="bg-zinc-800 rounded-xl px-4 py-3 text-white"
                  placeholder="Cómo te sentiste, rutas, etc."
                  placeholderTextColor="#71717A"
                  multiline
                  numberOfLines={2}
                  value={newSession.notes}
                  onChangeText={(text) => setNewSession({ ...newSession, notes: text })}
                />
              </View>

              <TouchableOpacity
                onPress={addSession}
                className="bg-emerald-500 rounded-xl p-4 flex-row items-center justify-center"
              >
                <Ionicons name="checkmark-circle" size={20} color="white" />
                <Text className="text-white font-bold ml-2">Guardar Sesión</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              {/* Weekly Stats */}
              <View className="bg-zinc-900 rounded-xl p-4 mb-6 border border-zinc-800">
                <Text className="text-white font-bold text-lg mb-3">Esta Semana</Text>
                <View className="flex-row flex-wrap gap-3">
                  <View className="flex-1 min-w-[45%] bg-emerald-500/10 rounded-lg p-3 border border-emerald-500/30">
                    <Text className="text-emerald-400 text-xs mb-1">Sesiones</Text>
                    <Text className="text-white text-2xl font-bold">{stats.sessions}</Text>
                  </View>
                  <View className="flex-1 min-w-[45%] bg-blue-500/10 rounded-lg p-3 border border-blue-500/30">
                    <Text className="text-blue-400 text-xs mb-1">Tiempo Total</Text>
                    <Text className="text-white text-2xl font-bold">{stats.totalDuration} min</Text>
                  </View>
                  <View className="flex-1 min-w-[45%] bg-red-500/10 rounded-lg p-3 border border-red-500/30">
                    <Text className="text-red-400 text-xs mb-1">Calorías</Text>
                    <Text className="text-white text-2xl font-bold">{stats.totalCalories}</Text>
                  </View>
                  <View className="flex-1 min-w-[45%] bg-amber-500/10 rounded-lg p-3 border border-amber-500/30">
                    <Text className="text-amber-400 text-xs mb-1">Distancia</Text>
                    <Text className="text-white text-2xl font-bold">{stats.totalDistance.toFixed(1)} km</Text>
                  </View>
                </View>
              </View>

              {/* Sessions List */}
              <Text className="text-white font-bold text-lg mb-4">Historial</Text>
              {filteredSessions.length === 0 ? (
                <View className="bg-zinc-900 rounded-xl p-8 items-center border border-zinc-800">
                  <Text className="text-6xl mb-3">🏃</Text>
                  <Text className="text-white font-bold text-lg mb-2">Sin Sesiones</Text>
                  <Text className="text-zinc-400 text-center">
                    Añade tu primera sesión de cardio
                  </Text>
                </View>
              ) : (
                filteredSessions.sort((a, b) => b.date.getTime() - a.date.getTime()).map((session) => {
                  const typeInfo = getTypeInfo(session.type);
                  return (
                    <View key={session.id} className="bg-zinc-900 rounded-xl p-4 mb-4 border border-zinc-800">
                      <View className="flex-row items-start justify-between mb-3">
                        <View className="flex-row items-start flex-1">
                          <View className={`w-12 h-12 bg-${typeInfo.color}-500 rounded-xl items-center justify-center mr-3`}>
                            <Text className="text-2xl">{typeInfo.icon}</Text>
                          </View>
                          <View className="flex-1">
                            <Text className="text-white font-bold text-lg mb-1">
                              {typeInfo.label}
                            </Text>
                            <Text className="text-zinc-400 text-sm">
                              {format(session.date, "d 'de' MMMM, yyyy", { locale: es })}
                            </Text>
                          </View>
                        </View>
                        <TouchableOpacity onPress={() => deleteSession(session.id)}>
                          <Ionicons name="trash" size={20} color="#EF4444" />
                        </TouchableOpacity>
                      </View>

                      {/* Stats */}
                      <View className="flex-row flex-wrap gap-2 mb-3">
                        <View className="bg-zinc-800 rounded px-3 py-1">
                          <Text className="text-blue-400 text-xs font-bold">
                            ⏱️ {session.duration} min
                          </Text>
                        </View>
                        {session.distance && (
                          <View className="bg-zinc-800 rounded px-3 py-1">
                            <Text className="text-emerald-400 text-xs font-bold">
                              📍 {session.distance} km
                            </Text>
                          </View>
                        )}
                        <View className="bg-zinc-800 rounded px-3 py-1">
                          <Text className="text-red-400 text-xs font-bold">
                            🔥 {session.calories} kcal
                          </Text>
                        </View>
                        {session.avgHeartRate && (
                          <View className="bg-zinc-800 rounded px-3 py-1">
                            <Text className="text-red-400 text-xs font-bold">
                              ❤️ {session.avgHeartRate} bpm
                            </Text>
                          </View>
                        )}
                        {session.pace && (
                          <View className="bg-zinc-800 rounded px-3 py-1">
                            <Text className="text-amber-400 text-xs font-bold">
                              ⚡ {session.pace.toFixed(2)} min/km
                            </Text>
                          </View>
                        )}
                      </View>

                      {/* Notes */}
                      {session.notes && (
                        <View className="bg-zinc-800 rounded-lg p-3">
                          <Text className="text-zinc-300 text-sm">{session.notes}</Text>
                        </View>
                      )}
                    </View>
                  );
                })
              )}
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
