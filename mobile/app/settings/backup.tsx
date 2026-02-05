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
    categories: ['Entrenamientos', 'NutriciÃ³n', 'Progreso'],
    itemCount: 1247,
  },
  {
    id: '2',
    date: '2025-01-20 23:00',
    size: '3.8 MB',
    type: 'auto',
    categories: ['Entrenamientos', 'NutriciÃ³n', 'Progreso'],
    itemCount: 1189,
  },
  {
    id: '3',
    date: '2025-01-15 10:45',
    size: '4.5 MB',
    type: 'manual',
    categories: ['Entrenamientos', 'NutriciÃ³n', 'Progreso', 'Fotos'],
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
      'Â¿Deseas crear un backup manual de todos tus datos?',
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
                      'Â¡Backup Creado!',
                      'Tu backup se ha guardado correctamente y estÃ¡ disponible para restauraciÃ³n.'
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
      `Â¿Restaurar datos desde ${backup.date}?\n\nEsto sobrescribirÃ¡ tus datos actuales. Se recomienda crear un backup antes de continuar.`,
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
                      'Â¡RestauraciÃ³n Completa!',
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
      'Â¿EstÃ¡s seguro? Esta acciÃ³n no se puede deshacer.',
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
            Backup y RestauraciÃ³n
          </Text>
        </View>

        {/* Quick Stats */}
        <View className="flex-row gap-3">
          <View className="flex-1 bg-zinc-900 rounded-xl p-3 border border-zinc-800">
            <Text className="text-zinc-400 text-xs">Backups</Text>
            <Text className="text-primary text-2xl font-bold">
              {BACKUPS.length}
            </Text>
          </View>
          <View className="flex-1 bg-zinc-900 rounded-xl p-3 border border-zinc-800">
            <Text className="text-zinc-400 text-xs">Ãšltimo</Text>
            <Text className="text-white text-sm font-bold">Hoy 14:30</Text>
          </View>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Create Backup */}
        <View className="px-6 pt-6">
          <TouchableOpacity
            onPress={createBackup}
            className="bg-primary rounded-xl p-4 flex-row items-center justify-center"
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
            ConfiguraciÃ³n de Backup
          </Text>

          <View className="bg-zinc-900 rounded-xl p-4 border border-zinc-800 mb-3">
            <View className="flex-row items-center justify-between mb-4">
              <View className="flex-1">
                <Text className="text-white font-semibold">Backup AutomÃ¡tico</Text>
                <Text className="text-zinc-400 text-sm mt-0.5">
                  Crea backups automÃ¡ticamente
                </Text>
              </View>
              <Switch
                value={autoBackupEnabled}
                onValueChange={setAutoBackupEnabled}
                trackColor={{ false: '#3F3F46', true: '#9D12DE80' }}
                thumbColor={autoBackupEnabled ? '#9D12DE' : '#f4f3f4'}
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
                          ? 'bg-primary'
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
                          ? 'bg-primary'
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
                      trackColor={{ false: '#3F3F46', true: '#9D12DE80' }}
                      thumbColor={includePhotos ? '#9D12DE' : '#f4f3f4'}
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
                trackColor={{ false: '#3F3F46', true: '#9D12DE80' }}
                thumbColor={cloudBackupEnabled ? '#9D12DE' : '#f4f3f4'}
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
                      color={backup.type === 'auto' ? '#9D12DE' : '#9D12DE'}
                    />
                    <View
                      className={`ml-2 px-2 py-0.5 rounded ${
                        backup.type === 'auto'
                          ? 'bg-primary/20'
                          : 'bg-primary/20'
                      }`}
                    >
                      <Text
                        className={`text-xs font-bold ${
                          backup.type === 'auto' ? 'text-primary' : 'text-primary'
                        }`}
                      >
                        {backup.type === 'auto' ? 'AutomÃ¡tico' : 'Manual'}
                      </Text>
                    </View>
                  </View>
                  <Text className="text-white font-bold">{backup.date}</Text>
                  <View className="flex-row items-center mt-1">
                    <Text className="text-zinc-400 text-sm">{backup.size}</Text>
                    <Text className="text-zinc-600 mx-2">â€¢</Text>
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
                  className="flex-1 bg-primary rounded-lg p-3"
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
          <View className="bg-primary/10 rounded-xl p-4 border border-primary/30">
            <View className="flex-row items-start">
              <Ionicons name="information-circle" size={24} color="#9D12DE" />
              <View className="flex-1 ml-3">
                <Text className="text-primary/80 font-bold mb-2">
                  Sobre los Backups
                </Text>
                <Text className="text-primary/60 text-sm leading-5">
                  â€¢ Los backups se cifran con AES-256{'\n'}â€¢ Se almacenan de
                  forma segura en la nube{'\n'}â€¢ Puedes tener hasta 10 backups
                  guardados{'\n'}â€¢ Los backups antiguos se eliminan
                  automÃ¡ticamente
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

