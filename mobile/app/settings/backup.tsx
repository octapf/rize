import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  Switch,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface BackupItem {
  id: string;
  date: string;
  size: string;
  type: 'auto' | 'manual';
  categories: string[];
  itemCount: number;
}

const BACKUPS: BackupItem[] = [
  {
    id: '1',
    date: '2025-01-27 14:30',
    size: '4.2 MB',
    type: 'auto',
    categories: ['Entrenamientos', 'Nutrición', 'Progreso'],
    itemCount: 1247,
  },
  {
    id: '2',
    date: '2025-01-20 23:00',
    size: '3.8 MB',
    type: 'auto',
    categories: ['Entrenamientos', 'Nutrición', 'Progreso'],
    itemCount: 1189,
  },
  {
    id: '3',
    date: '2025-01-15 10:45',
    size: '4.5 MB',
    type: 'manual',
    categories: ['Entrenamientos', 'Nutrición', 'Progreso', 'Fotos'],
    itemCount: 1156,
  },
];

export default function BackupRestore() {
  const [autoBackupEnabled, setAutoBackupEnabled] = useState(true);
  const [backupFrequency, setBackupFrequency] = useState<'daily' | 'weekly'>('weekly');
  const [includePhotos, setIncludePhotos] = useState(false);
  const [cloudBackupEnabled, setCloudBackupEnabled] = useState(true);

  const createBackup = () => {
    Alert.alert(
      'Crear Backup',
      '¿Deseas crear un backup manual de todos tus datos?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Crear Backup',
          onPress: () => {
            Alert.alert('Creando backup...', 'Esto puede tardar unos minutos', [
              {
                text: 'OK',
                onPress: () => {
                  setTimeout(() => {
                    Alert.alert(
                      '¡Backup Creado!',
                      'Tu backup se ha guardado correctamente y está disponible para restauración.'
                    );
                  }, 2000);
                },
              },
            ]);
          },
        },
      ]
    );
  };

  const restoreBackup = (backup: BackupItem) => {
    Alert.alert(
      'Restaurar Backup',
      `¿Restaurar datos desde ${backup.date}?\n\nEsto sobrescribirá tus datos actuales. Se recomienda crear un backup antes de continuar.`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Crear Backup Primero',
          onPress: createBackup,
        },
        {
          text: 'Restaurar',
          style: 'destructive',
          onPress: () => {
            Alert.alert('Restaurando...', 'Recuperando tus datos', [
              {
                text: 'OK',
                onPress: () => {
                  setTimeout(() => {
                    Alert.alert(
                      '¡Restauración Completa!',
                      'Tus datos han sido restaurados correctamente.'
                    );
                  }, 2500);
                },
              },
            ]);
          },
        },
      ]
    );
  };

  const deleteBackup = (backupId: string) => {
    Alert.alert(
      'Eliminar Backup',
      '¿Estás seguro? Esta acción no se puede deshacer.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => {
            Alert.alert('Backup eliminado');
          },
        },
      ]
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
            Backup y Restauración
          </Text>
        </View>

        {/* Quick Stats */}
        <View className="flex-row gap-3">
          <View className="flex-1 bg-zinc-900 rounded-xl p-3 border border-zinc-800">
            <Text className="text-zinc-400 text-xs">Backups</Text>
            <Text className="text-emerald-500 text-2xl font-bold">
              {BACKUPS.length}
            </Text>
          </View>
          <View className="flex-1 bg-zinc-900 rounded-xl p-3 border border-zinc-800">
            <Text className="text-zinc-400 text-xs">Último</Text>
            <Text className="text-white text-sm font-bold">Hoy 14:30</Text>
          </View>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Create Backup */}
        <View className="px-6 pt-6">
          <TouchableOpacity
            onPress={createBackup}
            className="bg-emerald-500 rounded-xl p-4 flex-row items-center justify-center"
          >
            <Ionicons name="cloud-upload" size={24} color="white" />
            <Text className="text-white font-bold text-lg ml-2">
              Crear Backup Ahora
            </Text>
          </TouchableOpacity>
        </View>

        {/* Auto Backup Settings */}
        <View className="px-6 pt-6">
          <Text className="text-white font-bold text-lg mb-3">
            Configuración de Backup
          </Text>

          <View className="bg-zinc-900 rounded-xl p-4 border border-zinc-800 mb-3">
            <View className="flex-row items-center justify-between mb-4">
              <View className="flex-1">
                <Text className="text-white font-semibold">Backup Automático</Text>
                <Text className="text-zinc-400 text-sm mt-0.5">
                  Crea backups automáticamente
                </Text>
              </View>
              <Switch
                value={autoBackupEnabled}
                onValueChange={setAutoBackupEnabled}
                trackColor={{ false: '#3F3F46', true: '#10B98180' }}
                thumbColor={autoBackupEnabled ? '#10B981' : '#f4f3f4'}
              />
            </View>

            {autoBackupEnabled && (
              <>
                <View className="border-t border-zinc-800 pt-4 mb-4">
                  <Text className="text-zinc-400 text-sm mb-3">Frecuencia</Text>
                  <View className="flex-row gap-3">
                    <TouchableOpacity
                      onPress={() => setBackupFrequency('daily')}
                      className={`flex-1 py-3 rounded-lg ${
                        backupFrequency === 'daily'
                          ? 'bg-emerald-500'
                          : 'bg-zinc-800'
                      }`}
                    >
                      <Text
                        className={`text-center font-semibold ${
                          backupFrequency === 'daily'
                            ? 'text-white'
                            : 'text-zinc-400'
                        }`}
                      >
                        Diario
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => setBackupFrequency('weekly')}
                      className={`flex-1 py-3 rounded-lg ${
                        backupFrequency === 'weekly'
                          ? 'bg-emerald-500'
                          : 'bg-zinc-800'
                      }`}
                    >
                      <Text
                        className={`text-center font-semibold ${
                          backupFrequency === 'weekly'
                            ? 'text-white'
                            : 'text-zinc-400'
                        }`}
                      >
                        Semanal
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <View className="border-t border-zinc-800 pt-4">
                  <View className="flex-row items-center justify-between">
                    <View className="flex-1">
                      <Text className="text-white font-semibold">
                        Incluir Fotos
                      </Text>
                      <Text className="text-zinc-400 text-sm mt-0.5">
                        +{includePhotos ? '3.2' : '0'} MB adicionales
                      </Text>
                    </View>
                    <Switch
                      value={includePhotos}
                      onValueChange={setIncludePhotos}
                      trackColor={{ false: '#3F3F46', true: '#10B98180' }}
                      thumbColor={includePhotos ? '#10B981' : '#f4f3f4'}
                    />
                  </View>
                </View>
              </>
            )}
          </View>

          <View className="bg-zinc-900 rounded-xl p-4 border border-zinc-800">
            <View className="flex-row items-center justify-between">
              <View className="flex-1">
                <Text className="text-white font-semibold">Backup en la Nube</Text>
                <Text className="text-zinc-400 text-sm mt-0.5">
                  Sincroniza con Google Drive / iCloud
                </Text>
              </View>
              <Switch
                value={cloudBackupEnabled}
                onValueChange={setCloudBackupEnabled}
                trackColor={{ false: '#3F3F46', true: '#10B98180' }}
                thumbColor={cloudBackupEnabled ? '#10B981' : '#f4f3f4'}
              />
            </View>
          </View>
        </View>

        {/* Backup History */}
        <View className="px-6 pt-6 pb-6">
          <Text className="text-white font-bold text-lg mb-3">
            Historial de Backups
          </Text>

          {BACKUPS.map((backup) => (
            <View
              key={backup.id}
              className="bg-zinc-900 rounded-xl p-4 mb-3 border border-zinc-800"
            >
              <View className="flex-row items-start justify-between mb-3">
                <View className="flex-1">
                  <View className="flex-row items-center mb-1">
                    <Ionicons
                      name={backup.type === 'auto' ? 'sync' : 'person'}
                      size={16}
                      color={backup.type === 'auto' ? '#3B82F6' : '#10B981'}
                    />
                    <View
                      className={`ml-2 px-2 py-0.5 rounded ${
                        backup.type === 'auto'
                          ? 'bg-blue-500/20'
                          : 'bg-emerald-500/20'
                      }`}
                    >
                      <Text
                        className={`text-xs font-bold ${
                          backup.type === 'auto' ? 'text-blue-500' : 'text-emerald-500'
                        }`}
                      >
                        {backup.type === 'auto' ? 'Automático' : 'Manual'}
                      </Text>
                    </View>
                  </View>
                  <Text className="text-white font-bold">{backup.date}</Text>
                  <View className="flex-row items-center mt-1">
                    <Text className="text-zinc-400 text-sm">{backup.size}</Text>
                    <Text className="text-zinc-600 mx-2">•</Text>
                    <Text className="text-zinc-400 text-sm">
                      {backup.itemCount.toLocaleString()} elementos
                    </Text>
                  </View>
                </View>
                <TouchableOpacity onPress={() => deleteBackup(backup.id)}>
                  <Ionicons name="trash-outline" size={20} color="#EF4444" />
                </TouchableOpacity>
              </View>

              {/* Categories */}
              <View className="flex-row flex-wrap gap-2 mb-3">
                {backup.categories.map((category, index) => (
                  <View key={index} className="bg-zinc-800 px-2 py-1 rounded">
                    <Text className="text-zinc-400 text-xs">{category}</Text>
                  </View>
                ))}
              </View>

              {/* Actions */}
              <View className="flex-row gap-2">
                <TouchableOpacity
                  onPress={() => restoreBackup(backup)}
                  className="flex-1 bg-emerald-500 rounded-lg p-3"
                >
                  <Text className="text-white text-center font-semibold">
                    Restaurar
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex-1 bg-zinc-800 rounded-lg p-3">
                  <Text className="text-white text-center font-semibold">
                    Descargar
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {/* Info Banner */}
        <View className="px-6 pb-6">
          <View className="bg-blue-500/10 rounded-xl p-4 border border-blue-500/30">
            <View className="flex-row items-start">
              <Ionicons name="information-circle" size={24} color="#3B82F6" />
              <View className="flex-1 ml-3">
                <Text className="text-blue-400 font-bold mb-2">
                  Sobre los Backups
                </Text>
                <Text className="text-blue-300 text-sm leading-5">
                  • Los backups se cifran con AES-256{'\n'}• Se almacenan de
                  forma segura en la nube{'\n'}• Puedes tener hasta 10 backups
                  guardados{'\n'}• Los backups antiguos se eliminan
                  automáticamente
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
