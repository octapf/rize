import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Switch,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface Reminder {
  id: string;
  name: string;
  type: 'workout' | 'rest' | 'meal' | 'water' | 'supplement' | 'sleep';
  days: string[];
  time: string;
  enabled: boolean;
  message: string;
  icon: string;
  frequency: 'daily' | 'weekly' | 'custom';
}

const REMINDERS: Reminder[] = [
  {
    id: '1',
    name: 'Entrenamiento Matutino',
    type: 'workout',
    days: ['Lunes', 'MiÃ©rcoles', 'Viernes'],
    time: '06:00',
    enabled: true,
    message: 'Â¡Hora de entrenar! Tu rutina Push te espera ðŸ’ª',
    icon: 'fitness',
    frequency: 'weekly',
  },
  {
    id: '2',
    name: 'Entrenamiento Vespertino',
    type: 'workout',
    days: ['Martes', 'Jueves', 'SÃ¡bado'],
    time: '18:00',
    enabled: true,
    message: 'Entrenamiento de la tarde programado',
    icon: 'barbell',
    frequency: 'weekly',
  },
  {
    id: '3',
    name: 'DÃ­a de Descanso',
    type: 'rest',
    days: ['Domingo'],
    time: '09:00',
    enabled: true,
    message: 'Hoy es dÃ­a de recuperaciÃ³n activa. Movilidad o caminata ligera ðŸ§˜',
    icon: 'bed',
    frequency: 'weekly',
  },
  {
    id: '4',
    name: 'Preparar Comidas',
    type: 'meal',
    days: ['Domingo'],
    time: '10:00',
    enabled: true,
    message: 'Â¡Meal prep! Prepara tus comidas para la semana ðŸ¥—',
    icon: 'restaurant',
    frequency: 'weekly',
  },
  {
    id: '5',
    name: 'HidrataciÃ³n',
    type: 'water',
    days: ['Lunes', 'Martes', 'MiÃ©rcoles', 'Jueves', 'Viernes', 'SÃ¡bado', 'Domingo'],
    time: '10:00',
    enabled: false,
    message: 'ðŸ’§ Bebe agua - Meta diaria: 3L',
    icon: 'water',
    frequency: 'daily',
  },
  {
    id: '6',
    name: 'Suplementos Pre-Entreno',
    type: 'supplement',
    days: ['Lunes', 'Martes', 'MiÃ©rcoles', 'Jueves', 'Viernes', 'SÃ¡bado'],
    time: '17:30',
    enabled: true,
    message: 'Toma tu pre-workout 30 min antes de entrenar',
    icon: 'flask',
    frequency: 'custom',
  },
  {
    id: '7',
    name: 'Rutina de SueÃ±o',
    type: 'sleep',
    days: ['Lunes', 'Martes', 'MiÃ©rcoles', 'Jueves', 'Viernes', 'SÃ¡bado', 'Domingo'],
    time: '22:00',
    enabled: true,
    message: 'ðŸ˜´ Hora de dormir para 8h de sueÃ±o de calidad',
    icon: 'moon',
    frequency: 'daily',
  },
];

export default function WorkoutReminders() {
  const [reminders, setReminders] = useState(REMINDERS);
  const [selectedType, setSelectedType] = useState<string>('all');

  const types = [
    { id: 'all', label: 'Todos', icon: 'grid' },
    { id: 'workout', label: 'Entrenamientos', icon: 'fitness' },
    { id: 'rest', label: 'Descanso', icon: 'bed' },
    { id: 'meal', label: 'Comidas', icon: 'restaurant' },
    { id: 'water', label: 'Agua', icon: 'water' },
    { id: 'supplement', label: 'Suplementos', icon: 'flask' },
    { id: 'sleep', label: 'SueÃ±o', icon: 'moon' },
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'workout':
        return '#EF4444';
      case 'rest':
        return '#9D12DE';
      case 'meal':
        return '#FFEA00';
      case 'water':
        return '#9D12DE';
      case 'supplement':
        return '#8B5CF6';
      case 'sleep':
        return '#6366F1';
      default:
        return '#71717A';
    }
  };

  const toggleReminder = (id: string) => {
    setReminders(
      reminders.map((reminder) =>
        reminder.id === id ? { ...reminder, enabled: !reminder.enabled } : reminder
      )
    );
  };

  const editReminder = (reminder: Reminder) => {
    Alert.alert(
      'Editar Recordatorio',
      reminder.name,
      [
        { text: 'Cambiar Hora' },
        { text: 'Cambiar DÃ­as' },
        { text: 'Cambiar Mensaje' },
        { text: 'Eliminar', style: 'destructive' },
        { text: 'Cancelar', style: 'cancel' },
      ]
    );
  };

  const addReminder = () => {
    Alert.alert(
      'Nuevo Recordatorio',
      'Selecciona el tipo de recordatorio',
      [
        { text: 'Entrenamiento', onPress: () => Alert.alert('Agregar', 'Entrenamiento') },
        { text: 'Descanso', onPress: () => Alert.alert('Agregar', 'Descanso') },
        { text: 'Comida', onPress: () => Alert.alert('Agregar', 'Comida') },
        { text: 'Otro', onPress: () => Alert.alert('Agregar', 'Personalizado') },
        { text: 'Cancelar', style: 'cancel' },
      ]
    );
  };

  const filteredReminders = selectedType === 'all'
    ? reminders
    : reminders.filter((r) => r.type === selectedType);

  const enabledCount = reminders.filter((r) => r.enabled).length;
  const nextReminder = reminders
    .filter((r) => r.enabled)
    .sort((a, b) => a.time.localeCompare(b.time))[0];

  return (
    <View className="flex-1 bg-zinc-950">
      {/* Header */}
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1 ml-3">
            Recordatorios
          </Text>
          <TouchableOpacity onPress={addReminder}>
            <Ionicons name="add-circle-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Stats Card */}
        <View className="bg-gradient-to-br from-primary to-[#7D0EBE] rounded-xl p-4 mb-4">
          <View className="flex-row items-center justify-between mb-3">
            <View className="flex-1">
              <Text className="text-white/80 text-sm mb-1">Recordatorios Activos</Text>
              <Text className="text-white font-bold text-4xl mb-1">
                {enabledCount}
              </Text>
              <Text className="text-white/80 text-sm">
                De {reminders.length} totales
              </Text>
            </View>
            <View className="bg-white/20 rounded-full p-4">
              <Ionicons name="notifications" size={32} color="white" />
            </View>
          </View>
          {nextReminder && (
            <View className="bg-white/20 rounded-lg p-3">
              <View className="flex-row items-center">
                <Ionicons name="time" size={16} color="white" />
                <Text className="text-white text-sm ml-2">
                  PrÃ³ximo: {nextReminder.name} a las {nextReminder.time}
                </Text>
              </View>
            </View>
          )}
        </View>

        {/* Type Filter */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row gap-2">
            {types.map((type) => (
              <TouchableOpacity
                key={type.id}
                onPress={() => setSelectedType(type.id)}
                className={`flex-row items-center px-4 py-2 rounded-lg ${
                  selectedType === type.id
                    ? 'bg-primary'
                    : 'bg-zinc-900 border border-zinc-800'
                }`}
              >
                <Ionicons
                  name={type.icon as any}
                  size={18}
                  color={selectedType === type.id ? 'white' : '#71717A'}
                />
                <Text
                  className={`ml-2 font-semibold text-sm ${
                    selectedType === type.id ? 'text-white' : 'text-zinc-400'
                  }`}
                >
                  {type.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          <Text className="text-white font-bold text-lg mb-3">
            {selectedType === 'all' ? 'Todos los Recordatorios' : types.find((t) => t.id === selectedType)?.label}
            {' '}({filteredReminders.length})
          </Text>

          {filteredReminders.map((reminder) => (
            <TouchableOpacity
              key={reminder.id}
              onPress={() => editReminder(reminder)}
              className={`bg-zinc-900 rounded-xl p-4 mb-3 border-2 ${
                reminder.enabled ? 'border-primary' : 'border-zinc-800'
              }`}
            >
              <View className="flex-row items-start justify-between mb-3">
                <View className="flex-row items-center flex-1">
                  <View
                    className="w-12 h-12 rounded-full items-center justify-center"
                    style={{ backgroundColor: getTypeColor(reminder.type) + '20' }}
                  >
                    <Ionicons
                      name={reminder.icon as any}
                      size={24}
                      color={getTypeColor(reminder.type)}
                    />
                  </View>
                  <View className="ml-3 flex-1">
                    <Text className="text-white font-bold text-base mb-1">
                      {reminder.name}
                    </Text>
                    <Text className="text-zinc-400 text-sm">{reminder.message}</Text>
                  </View>
                </View>
                <Switch
                  value={reminder.enabled}
                  onValueChange={() => toggleReminder(reminder.id)}
                  trackColor={{ false: '#3F3F46', true: '#9D12DE' }}
                  thumbColor={reminder.enabled ? '#fff' : '#D4D4D8'}
                />
              </View>

              {/* Time and Days */}
              <View className="bg-zinc-800 rounded-lg p-3 mb-3">
                <View className="flex-row items-center justify-between mb-2">
                  <View className="flex-row items-center">
                    <Ionicons name="time" size={16} color="#71717A" />
                    <Text className="text-zinc-300 font-bold ml-2 text-lg">
                      {reminder.time}
                    </Text>
                  </View>
                  <View
                    className="px-3 py-1 rounded-full"
                    style={{ backgroundColor: getTypeColor(reminder.type) + '20' }}
                  >
                    <Text
                      className="text-xs font-bold capitalize"
                      style={{ color: getTypeColor(reminder.type) }}
                    >
                      {reminder.frequency}
                    </Text>
                  </View>
                </View>
                <View className="flex-row flex-wrap gap-2">
                  {reminder.days.map((day, index) => (
                    <View key={index} className="bg-zinc-700 px-2 py-1 rounded">
                      <Text className="text-zinc-300 text-xs">{day.slice(0, 3)}</Text>
                    </View>
                  ))}
                </View>
              </View>

              {/* Actions */}
              <View className="flex-row gap-2">
                <TouchableOpacity className="flex-1 bg-zinc-800 rounded-lg p-2">
                  <View className="flex-row items-center justify-center">
                    <Ionicons name="create" size={16} color="white" />
                    <Text className="text-white font-bold ml-2 text-sm">Editar</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity className="flex-1 bg-zinc-800 rounded-lg p-2">
                  <View className="flex-row items-center justify-center">
                    <Ionicons name="copy" size={16} color="white" />
                    <Text className="text-white font-bold ml-2 text-sm">Duplicar</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Smart Suggestions */}
        <View className="px-6 pb-6 pt-4">
          <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-4">
            <View className="flex-row items-start">
              <Ionicons name="bulb" size={20} color="#9D12DE" />
              <View className="flex-1 ml-3">
                <Text className="text-primary/80 font-bold mb-2">
                  Sugerencias Inteligentes
                </Text>
                <Text className="text-primary/60 text-sm mb-2">
                  â€¢ Recordatorio de agua cada 2 horas durante el dÃ­a{'\n'}
                  â€¢ Reminder de stretching en dÃ­as de descanso{'\n'}
                  â€¢ NotificaciÃ³n de meal prep los domingos
                </Text>
                <TouchableOpacity className="bg-primary rounded-lg p-2 mt-2">
                  <Text className="text-white font-bold text-center text-sm">
                    Activar Sugerencias
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View className="bg-amber-500/10 rounded-xl p-4 border border-amber-500/30">
            <View className="flex-row items-start">
              <Ionicons name="information-circle" size={20} color="#FFEA00" />
              <View className="flex-1 ml-3">
                <Text className="text-amber-400 font-bold mb-2">
                  Consistencia es Clave
                </Text>
                <Text className="text-amber-300 text-sm">
                  Los recordatorios te ayudan a construir hÃ¡bitos. MantÃ©n las notificaciones activadas para mejores resultados.
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

