import React, { useState } from 'react';
import { Text } from '@/components/ui/Text';
import { View, ScrollView, TouchableOpacity, TextInput, Switch, Alert } from 'react-native';;
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Card } from '@/components/ui/Card';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SHORTCUTS_KEY = '@rize_shortcuts';

interface Shortcut {
  id: string;
  name: string;
  icon: string;
  action: string;
  enabled: boolean;
  color: string;
}

const defaultShortcuts: Shortcut[] = [
  {
    id: 'quick-workout',
    name: 'Workout Rápido',
    icon: 'flash',
    action: '/workouts/quick-start',
    enabled: true,
    color: '#9D12DE',
  },
  {
    id: 'last-workout',
    name: 'Repetir Último',
    icon: 'refresh',
    action: '/workouts/repeat-last',
    enabled: true,
    color: '#9D12DE',
  },
  {
    id: 'timer',
    name: 'Timer de Descanso',
    icon: 'timer',
    action: '/timer',
    enabled: true,
    color: '#FFEA00',
  },
  {
    id: 'log-weight',
    name: 'Registrar Peso',
    icon: 'scale',
    action: '/stats/log-weight',
    enabled: false,
    color: '#8B5CF6',
  },
  {
    id: 'progress',
    name: 'Mi Progreso',
    icon: 'analytics',
    action: '/progress',
    enabled: true,
    color: '#EC4899',
  },
  {
    id: 'challenges',
    name: 'Retos Activos',
    icon: 'trophy',
    action: '/challenges',
    enabled: false,
    color: '#EF4444',
  },
];

export default function ShortcutsScreen() {
  const [shortcuts, setShortcuts] = useState<Shortcut[]>(defaultShortcuts);

  React.useEffect(() => {
    loadShortcuts();
  }, []);

  const loadShortcuts = async () => {
    try {
      const saved = await AsyncStorage.getItem(SHORTCUTS_KEY);
      if (saved) {
        setShortcuts(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Error loading shortcuts:', error);
    }
  };

  const saveShortcuts = async (newShortcuts: Shortcut[]) => {
    try {
      await AsyncStorage.setItem(SHORTCUTS_KEY, JSON.stringify(newShortcuts));
      setShortcuts(newShortcuts);
    } catch (error) {
      console.error('Error saving shortcuts:', error);
      Alert.alert('Error', 'No se pudieron guardar los cambios');
    }
  };

  const toggleShortcut = (id: string) => {
    const updated = shortcuts.map(shortcut =>
      shortcut.id === id
        ? { ...shortcut, enabled: !shortcut.enabled }
        : shortcut
    );
    saveShortcuts(updated);
  };

  const moveShortcut = (fromIndex: number, toIndex: number) => {
    const updated = [...shortcuts];
    const [removed] = updated.splice(fromIndex, 1);
    updated.splice(toIndex, 0, removed);
    saveShortcuts(updated);
  };

  const resetToDefault = () => {
    Alert.alert(
      'Restablecer Atajos',
      '¿Estás seguro de que quieres restablecer los atajos a los valores predeterminados?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Restablecer',
          style: 'destructive',
          onPress: () => saveShortcuts(defaultShortcuts),
        },
      ]
    );
  };

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <LinearGradient colors={['#8B5CF6', '#7C3AED']} className="px-6 pt-12 pb-6">
        <View className="flex-row items-center justify-between mb-4">
          <TouchableOpacity onPress={() => router.back()} className="p-2">
            <Ionicons name="arrow-back" size={28} color="white" />
          </TouchableOpacity>
          <Text className="text-2xl font-bold text-white">Atajos Rápidos</Text>
          <TouchableOpacity onPress={resetToDefault} className="p-2">
            <Ionicons name="refresh" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <Text className="text-purple-100 text-center">
          Personaliza tus acciones rápidas
        </Text>
      </LinearGradient>

      <ScrollView className="flex-1" contentContainerClassName="p-6 gap-4">
        {/* Info Card */}
        <Card className="p-4 bg-primary/5 border-primary/20">
          <View className="flex-row items-start gap-3">
            <Ionicons name="information-circle" size={24} color="#9D12DE" />
            <Text className="flex-1 text-text/80 text-sm">
              Los atajos habilitados aparecerán en el widget de acceso rápido en la pantalla principal.
              Activa solo los que uses frecuentemente.
            </Text>
          </View>
        </Card>

        {/* Shortcuts List */}
        <View>
          <Text className="text-lg font-bold text-gray-900 mb-3">
            Atajos Disponibles
          </Text>

          <View className="gap-3">
            {shortcuts.map((shortcut, index) => (
              <Card key={shortcut.id} className="p-4">
                <View className="flex-row items-center gap-4">
                  <View
                    className="w-12 h-12 rounded-xl items-center justify-center"
                    style={{ backgroundColor: shortcut.color + '20' }}
                  >
                    <Ionicons
                      name={shortcut.icon as any}
                      size={24}
                      style={{ color: shortcut.color }}
                    />
                  </View>

                  <View className="flex-1">
                    <Text className="text-gray-900 font-bold">
                      {shortcut.name}
                    </Text>
                    <Text className="text-gray-600 text-sm">
                      {shortcut.action}
                    </Text>
                  </View>

                  <Switch
                    value={shortcut.enabled}
                    onValueChange={() => toggleShortcut(shortcut.id)}
                    trackColor={{ false: '#D1D5DB', true: shortcut.color + '40' }}
                    thumbColor={shortcut.enabled ? shortcut.color : '#F3F4F6'}
                  />
                </View>
              </Card>
            ))}
          </View>
        </View>

        {/* Active Shortcuts Preview */}
        <View>
          <Text className="text-lg font-bold text-gray-900 mb-3">
            Vista Previa del Widget
          </Text>

          <Card className="p-4">
            <Text className="text-gray-700 font-semibold mb-3">
              Acciones Rápidas
            </Text>

            {shortcuts.filter(s => s.enabled).length === 0 ? (
              <Text className="text-gray-400 text-center py-4">
                No hay atajos activos
              </Text>
            ) : (
              <View className="flex-row flex-wrap gap-2">
                {shortcuts
                  .filter(s => s.enabled)
                  .map(shortcut => (
                    <View
                      key={shortcut.id}
                      className="px-4 py-2 rounded-full flex-row items-center gap-2"
                      style={{ backgroundColor: shortcut.color + '20' }}
                    >
                      <Ionicons
                        name={shortcut.icon as any}
                        size={16}
                        style={{ color: shortcut.color }}
                      />
                      <Text
                        className="font-semibold text-sm"
                        style={{ color: shortcut.color }}
                      >
                        {shortcut.name}
                      </Text>
                    </View>
                  ))}
              </View>
            )}
          </Card>
        </View>

        {/* Stats */}
        <Card className="p-4">
          <View className="flex-row items-center justify-between">
            <Text className="text-gray-700">Atajos Activos</Text>
            <Text className="text-gray-900 font-bold text-lg">
              {shortcuts.filter(s => s.enabled).length} / {shortcuts.length}
            </Text>
          </View>
        </Card>
      </ScrollView>
    </View>
  );
}

