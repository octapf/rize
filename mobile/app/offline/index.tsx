import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface OfflineWorkout {
  id: string;
  name: string;
  timestamp: string;
  exercises: number;
  sets: number;
  synced: boolean;
}

interface SyncQueue {
  workouts: number;
  nutrition: number;
  measurements: number;
  photos: number;
}

const OFFLINE_DATA_KEY = '@rize_offline_data';
const SYNC_QUEUE_KEY = '@rize_sync_queue';

export default function OfflineMode() {
  const [isOnline, setIsOnline] = useState(true);
  const [offlineMode, setOfflineMode] = useState(false);
  const [autoSync, setAutoSync] = useState(true);
  const [offlineWorkouts, setOfflineWorkouts] = useState<OfflineWorkout[]>([
    {
      id: '1',
      name: 'Empuje - DÌa 1',
      timestamp: '2025-01-20 18:30',
      exercises: 6,
      sets: 24,
      synced: false,
    },
    {
      id: '2',
      name: 'TracciÛn - DÌa 2',
      timestamp: '2025-01-21 19:00',
      exercises: 5,
      sets: 20,
      synced: true,
    },
  ]);

  const [syncQueue, setSyncQueue] = useState<SyncQueue>({
    workouts: 1,
    nutrition: 3,
    measurements: 2,
    photos: 0,
  });

  const [storageUsed, setStorageUsed] = useState(24.5); // MB
  const storageLimit = 100; // MB

  useEffect(() => {
    loadOfflineData();
  }, []);

  const loadOfflineData = async () => {
    try {
      const data = await AsyncStorage.getItem(OFFLINE_DATA_KEY);
      const queue = await AsyncStorage.getItem(SYNC_QUEUE_KEY);
      
      if (data) {
        setOfflineWorkouts(JSON.parse(data));
      }
      
      if (queue) {
        setSyncQueue(JSON.parse(queue));
      }
    } catch (error) {
      console.error('Error loading offline data:', error);
    }
  };

  const saveOfflineData = async (workouts: OfflineWorkout[]) => {
    try {
      await AsyncStorage.setItem(OFFLINE_DATA_KEY, JSON.stringify(workouts));
    } catch (error) {
      console.error('Error saving offline data:', error);
    }
  };

  const toggleOfflineMode = () => {
    if (!offlineMode) {
      Alert.alert(
        'Activar Modo Offline',
        'Los datos se guardar·n localmente y se sincronizar·n cuando vuelvas a conectarte.',
        [
          { text: 'Cancelar', style: 'cancel' },
          {
            text: 'Activar',
            onPress: () => {
              setOfflineMode(true);
              Alert.alert('Modo Offline Activado', 'Puedes entrenar sin conexiÛn');
            },
          },
        ]
      );
    } else {
      setOfflineMode(false);
    }
  };

  const syncNow = async () => {
    Alert.alert(
      'Sincronizar Datos',
      `øDeseas sincronizar ${getTotalPendingItems()} elementos pendientes?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Sincronizar',
          onPress: async () => {
            // Simular sincronizaciÛn
            Alert.alert('Sincronizando...', 'Por favor espera', [
              { text: 'OK', onPress: () => {
                setTimeout(() => {
                  // Mark all as synced
                  const updated = offlineWorkouts.map(w => ({ ...w, synced: true }));
                  setOfflineWorkouts(updated);
                  saveOfflineData(updated);
                  setSyncQueue({ workouts: 0, nutrition: 0, measurements: 0, photos: 0 });
                  Alert.alert('°SincronizaciÛn Completa!', 'Todos los datos est·n actualizados');
                }, 2000);
              }},
            ]);
          },
        },
      ]
    );
  };

  const deleteOfflineData = () => {
    Alert.alert(
      'Eliminar Datos Offline',
      'øEst·s seguro? Esta acciÛn no se puede deshacer.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem(OFFLINE_DATA_KEY);
              await AsyncStorage.removeItem(SYNC_QUEUE_KEY);
              setOfflineWorkouts([]);
              setSyncQueue({ workouts: 0, nutrition: 0, measurements: 0, photos: 0 });
              Alert.alert('Datos Eliminados', 'Todos los datos offline han sido borrados');
            } catch (error) {
              Alert.alert('Error', 'No se pudieron eliminar los datos');
            }
          },
        },
      ]
    );
  };

  const getTotalPendingItems = () => {
    return syncQueue.workouts + syncQueue.nutrition + syncQueue.measurements + syncQueue.photos;
  };

  const viewWorkoutDetails = (workout: OfflineWorkout) => {
    Alert.alert(
      workout.name,
      `Ejercicios: ${workout.exercises}\nSeries: ${workout.sets}\nFecha: ${workout.timestamp}\n\nEstado: ${workout.synced ? 'Sincronizado ?' : 'Pendiente ‚è≥'}`,
      [{ text: 'OK' }]
    );
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
            Modo Offline
          </Text>
          <View className={`px-3 py-1 rounded-full ${isOnline ? 'bg-primary/20' : 'bg-red-500/20'}`}>
            <View className="flex-row items-center">
              <View className={`w-2 h-2 rounded-full mr-2 ${isOnline ? 'bg-primary' : 'bg-red-500'}`} />
              <Text className={`text-xs font-bold ${isOnline ? 'text-primary' : 'text-red-500'}`}>
                {isOnline ? 'ONLINE' : 'OFFLINE'}
              </Text>
            </View>
          </View>
        </View>

        {/* Storage Usage */}
        <View className="bg-zinc-900 rounded-xl p-4 border border-zinc-800">
          <View className="flex-row items-center justify-between mb-2">
            <Text className="text-zinc-400 text-sm">Almacenamiento Usado</Text>
            <Text className="text-white font-bold">
              {storageUsed.toFixed(1)} / {storageLimit} MB
            </Text>
          </View>
          <View className="bg-zinc-800 h-2 rounded-full overflow-hidden">
            <View
              className="h-full bg-primary rounded-full"
              style={{ width: `${(storageUsed / storageLimit) * 100}%` }}
            />
          </View>
          <Text className="text-zinc-500 text-xs mt-2">
            {(storageLimit - storageUsed).toFixed(1)} MB disponibles
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Offline Mode Toggle */}
        <View className="px-6 pt-6">
          <View className="bg-zinc-900 rounded-xl p-4 border border-zinc-800 mb-4">
            <View className="flex-row items-center justify-between mb-3">
              <View className="flex-1">
                <Text className="text-white font-bold text-lg">Modo Offline</Text>
                <Text className="text-zinc-400 text-sm mt-1">
                  Guarda datos localmente cuando no hay conexiÛn
                </Text>
              </View>
              <TouchableOpacity
                onPress={toggleOfflineMode}
                className={`w-14 h-8 rounded-full p-1 ${
                  offlineMode ? 'bg-primary' : 'bg-zinc-700'
                }`}
              >
                <View
                  className={`w-6 h-6 rounded-full bg-white ${
                    offlineMode ? 'ml-auto' : 'ml-0'
                  }`}
                />
              </TouchableOpacity>
            </View>

            {offlineMode && (
              <View className="bg-primary/10 rounded-lg p-3">
                <View className="flex-row items-start">
                  <Ionicons name="checkmark-circle" size={16} color="#9D12DE" />
                  <Text className="text-primary text-xs ml-2 flex-1">
                    Modo offline activado. Tus entrenamientos se guardar·n localmente y se sincronizar·n autom·ticamente.
                  </Text>
                </View>
              </View>
            )}
          </View>

          {/* Auto-Sync Settings */}
          <View className="bg-zinc-900 rounded-xl p-4 border border-zinc-800 mb-4">
            <View className="flex-row items-center justify-between">
              <View className="flex-1">
                <Text className="text-white font-bold">SincronizaciÛn Autom·tica</Text>
                <Text className="text-zinc-400 text-sm mt-1">
                  Sincronizar cuando haya conexiÛn WiFi
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => setAutoSync(!autoSync)}
                className={`w-14 h-8 rounded-full p-1 ${
                  autoSync ? 'bg-primary' : 'bg-zinc-700'
                }`}
              >
                <View
                  className={`w-6 h-6 rounded-full bg-white ${
                    autoSync ? 'ml-auto' : 'ml-0'
                  }`}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Sync Queue */}
          {getTotalPendingItems() > 0 && (
            <View className="bg-amber-500/10 rounded-xl p-4 border border-amber-500/30 mb-4">
              <View className="flex-row items-center justify-between mb-3">
                <View className="flex-1">
                  <Text className="text-amber-500 font-bold text-lg">
                    {getTotalPendingItems()} Elementos Pendientes
                  </Text>
                  <Text className="text-amber-300 text-sm mt-1">
                    Listos para sincronizar
                  </Text>
                </View>
                <View className="bg-amber-500/20 rounded-full p-3">
                  <Ionicons name="cloud-upload" size={24} color="#FFEA00" />
                </View>
              </View>

              <View className="space-y-2 mb-3">
                {syncQueue.workouts > 0 && (
                  <View className="flex-row items-center justify-between bg-zinc-900 rounded-lg p-2">
                    <View className="flex-row items-center">
                      <Ionicons name="barbell" size={16} color="#71717A" />
                      <Text className="text-zinc-300 text-sm ml-2">Entrenamientos</Text>
                    </View>
                    <Text className="text-amber-500 font-bold">{syncQueue.workouts}</Text>
                  </View>
                )}
                {syncQueue.nutrition > 0 && (
                  <View className="flex-row items-center justify-between bg-zinc-900 rounded-lg p-2">
                    <View className="flex-row items-center">
                      <Ionicons name="restaurant" size={16} color="#71717A" />
                      <Text className="text-zinc-300 text-sm ml-2">NutriciÛn</Text>
                    </View>
                    <Text className="text-amber-500 font-bold">{syncQueue.nutrition}</Text>
                  </View>
                )}
                {syncQueue.measurements > 0 && (
                  <View className="flex-row items-center justify-between bg-zinc-900 rounded-lg p-2">
                    <View className="flex-row items-center">
                      <Ionicons name="body" size={16} color="#71717A" />
                      <Text className="text-zinc-300 text-sm ml-2">Mediciones</Text>
                    </View>
                    <Text className="text-amber-500 font-bold">{syncQueue.measurements}</Text>
                  </View>
                )}
              </View>

              <TouchableOpacity
                onPress={syncNow}
                className="bg-amber-500 rounded-lg p-3"
              >
                <View className="flex-row items-center justify-center">
                  <Ionicons name="sync" size={20} color="white" />
                  <Text className="text-white font-bold ml-2">
                    Sincronizar Ahora
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          )}

          {/* Offline Workouts */}
          <Text className="text-white font-bold text-lg mb-3">
            Entrenamientos Offline ({offlineWorkouts.length})
          </Text>

          {offlineWorkouts.length === 0 ? (
            <View className="bg-zinc-900 rounded-xl p-8 border border-zinc-800 items-center mb-4">
              <Ionicons name="cloud-offline-outline" size={48} color="#71717A" />
              <Text className="text-zinc-400 font-bold mt-4">
                No hay entrenamientos offline
              </Text>
              <Text className="text-zinc-500 text-sm mt-2 text-center">
                Activa el modo offline para guardar datos sin conexiÛn
              </Text>
            </View>
          ) : (
            <View className="mb-4">
              {offlineWorkouts.map((workout) => (
                <TouchableOpacity
                  key={workout.id}
                  onPress={() => viewWorkoutDetails(workout)}
                  className="bg-zinc-900 rounded-xl p-4 mb-3 border border-zinc-800"
                >
                  <View className="flex-row items-center justify-between mb-2">
                    <View className="flex-1">
                      <Text className="text-white font-bold text-lg">
                        {workout.name}
                      </Text>
                      <Text className="text-zinc-400 text-sm mt-1">
                        {workout.timestamp}
                      </Text>
                    </View>
                    <View
                      className={`px-3 py-1 rounded-full ${
                        workout.synced ? 'bg-primary/20' : 'bg-amber-500/20'
                      }`}
                    >
                      <Text
                        className={`text-xs font-bold ${
                          workout.synced ? 'text-primary' : 'text-amber-500'
                        }`}
                      >
                        {workout.synced ? 'SINCRONIZADO' : 'PENDIENTE'}
                      </Text>
                    </View>
                  </View>

                  <View className="flex-row gap-3">
                    <View className="bg-zinc-800 rounded-lg px-3 py-2">
                      <Text className="text-zinc-400 text-xs">Ejercicios</Text>
                      <Text className="text-white font-bold">{workout.exercises}</Text>
                    </View>
                    <View className="bg-zinc-800 rounded-lg px-3 py-2">
                      <Text className="text-zinc-400 text-xs">Series</Text>
                      <Text className="text-white font-bold">{workout.sets}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Actions */}
          <View className="mb-6">
            <TouchableOpacity
              onPress={deleteOfflineData}
              className="bg-red-500/10 rounded-xl p-4 border border-red-500/30"
            >
              <View className="flex-row items-center justify-center">
                <Ionicons name="trash" size={20} color="#EF4444" />
                <Text className="text-red-500 font-bold ml-2">
                  Eliminar Datos Offline
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Info Card */}
          <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-6">
            <View className="flex-row items-start">
              <Ionicons name="information-circle" size={20} color="#9D12DE" />
              <View className="flex-1 ml-3">
                <Text className="text-primary/80 font-bold mb-2">
                  øCÛmo funciona el Modo Offline?
                </Text>
                <Text className="text-primary/60 text-sm mb-2">
                  ï Los datos se guardan localmente en tu dispositivo
                </Text>
                <Text className="text-primary/60 text-sm mb-2">
                  ï Se sincronizan autom·ticamente cuando hay conexiÛn
                </Text>
                <Text className="text-primary/60 text-sm mb-2">
                  ï Puedes entrenar sin internet
                </Text>
                <Text className="text-primary/60 text-sm">
                  ï Los datos est·n encriptados y seguros
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

