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

export default function DataExportImport() {
  const [exporting, setExporting] = useState(false);

  const exportFormats = [
    { key: 'json', label: 'JSON', icon: 'document-text', size: '~2.5 MB', color: 'blue' },
    { key: 'csv', label: 'CSV', icon: 'grid', size: '~1.8 MB', color: 'primary' },
    { key: 'pdf', label: 'PDF Report', icon: 'document', size: '~5.2 MB', color: 'red' },
  ];

  const backupOptions = [
    { key: 'icloud', label: 'iCloud', icon: 'cloud', enabled: true, lastBackup: 'Hace 2h' },
    { key: 'google', label: 'Google Drive', icon: 'logo-google', enabled: false, lastBackup: null },
    { key: 'local', label: 'Local Device', icon: 'phone-portrait', enabled: true, lastBackup: 'Hoy' },
  ];

  const dataCategories = [
    { key: 'workouts', label: 'Workouts', count: 1247, selected: true },
    { key: 'exercises', label: 'Exercises', count: 8920, selected: true },
    { key: 'nutrition', label: 'Nutrition', count: 365, selected: true },
    { key: 'measurements', label: 'Measurements', count: 156, selected: true },
    { key: 'photos', label: 'Progress Photos', count: 89, selected: false },
    { key: 'goals', label: 'Goals', count: 24, selected: true },
  ];

  const exportData = (format: string) => {
    Alert.alert(
      'ðŸ“¥ Exporting Data',
      `Generando archivo ${format.toUpperCase()}...\n\nTiempo estimado: 30s`,
      [{ text: 'OK' }]
    );
  };

  const importData = () => {
    Alert.alert(
      'ðŸ“¤ Import Data',
      'Selecciona archivo JSON o CSV para importar',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Seleccionar Archivo' }
      ]
    );
  };

  const createBackup = () => {
    Alert.alert('Backup Creado ?', 'Todos tus datos han sido respaldados en iCloud');
  };

  return (
    <View className="flex-1 bg-zinc-950">
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1 ml-3">
            Data Management
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          <View className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl p-6 mb-6">
            <Text className="text-white text-2xl font-bold mb-2">Export & Backup</Text>
            <Text className="text-white opacity-90">
              Exporta, importa y respalda todos tus datos
            </Text>
          </View>

          <Text className="text-white font-bold text-lg mb-4">Export Formats</Text>

          {exportFormats.map((format) => (
            <TouchableOpacity
              key={format.key}
              onPress={() => exportData(format.key)}
              className={`bg-${format.color}-500/10 rounded-xl p-5 mb-3 border border-${format.color}-500/30`}
            >
              <View className="flex-row items-center">
                <View className={`w-14 h-14 bg-${format.color}-500 rounded-xl items-center justify-center mr-4`}>
                  <Ionicons name={format.icon as any} size={28} color="white" />
                </View>
                <View className="flex-1">
                  <Text className="text-white font-bold text-lg">{format.label}</Text>
                  <Text className={`text-${format.color}-400 text-sm`}>{format.size}</Text>
                </View>
                <Ionicons name="download" size={24} color={`#${format.color === 'blue' ? '3B82F6' : format.color === 'primary' ? '9D12DE' : 'EF4444'}`} />
              </View>
            </TouchableOpacity>
          ))}

          <Text className="text-white font-bold text-lg mb-4 mt-6">Data Categories</Text>

          {dataCategories.map((cat) => (
            <View key={cat.key} className="bg-zinc-900 rounded-xl p-4 mb-3 border border-zinc-800">
              <View className="flex-row items-center justify-between">
                <View className="flex-1">
                  <Text className="text-white font-bold">{cat.label}</Text>
                  <Text className="text-zinc-400 text-sm">{cat.count} registros</Text>
                </View>
                <Ionicons
                  name={cat.selected ? 'checkmark-circle' : 'ellipse-outline'}
                  size={24}
                  color={cat.selected ? '#9D12DE' : '#71717A'}
                />
              </View>
            </View>
          ))}

          <Text className="text-white font-bold text-lg mb-4 mt-6">Backup Options</Text>

          {backupOptions.map((option) => (
            <View key={option.key} className="bg-zinc-900 rounded-xl p-4 mb-3 border border-zinc-800">
              <View className="flex-row items-center">
                <Ionicons name={option.icon as any} size={24} color={option.enabled ? '#9D12DE' : '#71717A'} />
                <View className="ml-3 flex-1">
                  <Text className={`font-bold ${option.enabled ? 'text-white' : 'text-zinc-500'}`}>
                    {option.label}
                  </Text>
                  {option.lastBackup && (
                    <Text className="text-zinc-400 text-sm">Último backup: {option.lastBackup}</Text>
                  )}
                </View>
                <Ionicons
                  name={option.enabled ? 'checkmark-circle' : 'close-circle'}
                  size={24}
                  color={option.enabled ? '#9D12DE' : '#71717A'}
                />
              </View>
            </View>
          ))}

          <View className="flex-row gap-3 mb-6 mt-4">
            <TouchableOpacity
              onPress={importData}
              className="flex-1 bg-primary rounded-xl p-4 flex-row items-center justify-center"
            >
              <Ionicons name="cloud-upload" size={20} color="white" />
              <Text className="text-white font-bold ml-2">Import</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={createBackup}
              className="flex-1 bg-primary rounded-xl p-4 flex-row items-center justify-center"
            >
              <Ionicons name="shield-checkmark" size={20} color="white" />
              <Text className="text-white font-bold ml-2">Backup Now</Text>
            </TouchableOpacity>
          </View>

          <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-6">
            <View className="flex-row items-start">
              <Ionicons name="information-circle" size={20} color="#9D12DE" />
              <View className="flex-1 ml-3">
                <Text className="text-primary/80 font-bold mb-2">Data Security</Text>
                <Text className="text-primary/60 text-sm">
                  • Encriptación end-to-end{'\n'}
                  • Backups automáticos diarios{'\n'}
                  • Exporta antes de cambiar dispositivo{'\n'}
                  • Import preserva historial completo
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

