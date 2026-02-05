import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function CloudBackup() {
  const [autoBackup, setAutoBackup] = useState(true);
  const [backupFrequency, setBackupFrequency] = useState<'daily' | 'weekly' | 'manual'>('daily');

  const backupHistory = [
    { id: '1', date: 'Hoy 3:24 AM', size: '2.5 MB', status: 'success' },
    { id: '2', date: 'Ayer 3:24 AM', size: '2.4 MB', status: 'success' },
    { id: '3', date: 'Hace 2 dÃ­as', size: '2.3 MB', status: 'success' },
    { id: '4', date: 'Hace 3 dÃ­as', size: '2.3 MB', status: 'success' },
    { id: '5', date: 'Hace 4 dÃ­as', size: '2.2 MB', status: 'failed' },
  ];

  const restoreBackup = (backupId: string) => {
    Alert.alert(
      'Restaurar Backup?',
      'Esto sobrescribirÃ¡ todos tus datos actuales.',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Restaurar', style: 'destructive' }
      ]
    );
  };

  return (
    <View className="flex-1 bg-zinc-950">
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1 ml-3">
            Cloud Backup
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          <View className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl p-6 mb-6">
            <Text className="text-white text-2xl font-bold mb-2">iCloud Backup</Text>
            <Text className="text-white opacity-90 mb-4">
              Tus datos estÃ¡n seguros en la nube
            </Text>
            <View className="flex-row items-center">
              <Ionicons name="cloud-done" size={20} color="white" />
              <Text className="text-white ml-2">Ãšltimo backup: Hoy 3:24 AM</Text>
            </View>
          </View>

          <TouchableOpacity
            onPress={() => setAutoBackup(!autoBackup)}
            className="bg-zinc-900 rounded-xl p-4 flex-row items-center justify-between mb-4 border border-zinc-800"
          >
            <View className="flex-row items-center flex-1">
              <Ionicons name="sync-circle" size={24} color="#9D12DE" />
              <View className="ml-3 flex-1">
                <Text className="text-white font-bold">Auto Backup</Text>
                <Text className="text-zinc-400 text-sm">Respaldo automÃ¡tico diario</Text>
              </View>
            </View>
            <View className={`w-12 h-6 rounded-full ${autoBackup ? 'bg-primary' : 'bg-zinc-700'}`}>
              <View className={`w-5 h-5 bg-white rounded-full mt-0.5 ${autoBackup ? 'ml-6' : 'ml-1'}`} />
            </View>
          </TouchableOpacity>

          <Text className="text-white font-bold text-lg mb-4">Frecuencia</Text>
          <View className="flex-row gap-2 mb-6">
            {(['daily', 'weekly', 'manual'] as const).map((freq) => (
              <TouchableOpacity
                key={freq}
                onPress={() => setBackupFrequency(freq)}
                className={`flex-1 rounded-xl py-3 ${
                  backupFrequency === freq ? 'bg-primary' : 'bg-zinc-900 border border-zinc-800'
                }`}
              >
                <Text className={`text-center font-bold ${
                  backupFrequency === freq ? 'text-white' : 'text-zinc-400'
                }`}>
                  {freq === 'daily' ? 'Diario' : freq === 'weekly' ? 'Semanal' : 'Manual'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text className="text-white font-bold text-lg mb-4">Backup History</Text>

          {backupHistory.map((backup) => (
            <View key={backup.id} className="bg-zinc-900 rounded-xl p-4 mb-3 border border-zinc-800">
              <View className="flex-row items-center justify-between">
                <View className="flex-1">
                  <Text className="text-white font-bold">{backup.date}</Text>
                  <Text className="text-zinc-400 text-sm">{backup.size}</Text>
                </View>
                <View className="flex-row items-center gap-3">
                  <Ionicons
                    name={backup.status === 'success' ? 'checkmark-circle' : 'close-circle'}
                    size={24}
                    color={backup.status === 'success' ? '#9D12DE' : '#EF4444'}
                  />
                  {backup.status === 'success' && (
                    <TouchableOpacity onPress={() => restoreBackup(backup.id)}>
                      <Ionicons name="download" size={20} color="#9D12DE" />
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

