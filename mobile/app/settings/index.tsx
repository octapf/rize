import React, { useState } from 'react';
import { Text } from '@/components/ui/Text';
import { View, ScrollView, TouchableOpacity, Switch, Alert } from 'react-native';;
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

const SETTINGS_KEYS = {
  REST_TIMER_DEFAULT: '@settings_rest_timer_default',
  AUTO_START_REST_TIMER: '@settings_auto_start_rest_timer',
  NOTIFICATIONS_ENABLED: '@settings_notifications_enabled',
  NOTIFICATIONS_ACHIEVEMENTS: '@settings_notifications_achievements',
  NOTIFICATIONS_RECORDS: '@settings_notifications_records',
  NOTIFICATIONS_CHALLENGES: '@settings_notifications_challenges',
  NOTIFICATIONS_SOCIAL: '@settings_notifications_social',
  NOTIFICATIONS_REMINDERS: '@settings_notifications_reminders',
  SOUND_EFFECTS: '@settings_sound_effects',
  HAPTIC_FEEDBACK: '@settings_haptic_feedback',
};

export default function SettingsScreen() {
  const [restTimerDefault, setRestTimerDefault] = useState(90);
  const [autoStartRestTimer, setAutoStartRestTimer] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [notifAchievements, setNotifAchievements] = useState(true);
  const [notifRecords, setNotifRecords] = useState(true);
  const [notifChallenges, setNotifChallenges] = useState(true);
  const [notifSocial, setNotifSocial] = useState(true);
  const [notifReminders, setNotifReminders] = useState(true);
  const [soundEffects, setSoundEffects] = useState(true);
  const [hapticFeedback, setHapticFeedback] = useState(true);

  React.useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const settings = await AsyncStorage.multiGet(Object.values(SETTINGS_KEYS));
      settings.forEach(([key, value]) => {
        if (value === null) return;

        switch (key) {
          case SETTINGS_KEYS.REST_TIMER_DEFAULT:
            setRestTimerDefault(parseInt(value));
            break;
          case SETTINGS_KEYS.AUTO_START_REST_TIMER:
            setAutoStartRestTimer(value === 'true');
            break;
          case SETTINGS_KEYS.NOTIFICATIONS_ENABLED:
            setNotificationsEnabled(value === 'true');
            break;
          case SETTINGS_KEYS.NOTIFICATIONS_ACHIEVEMENTS:
            setNotifAchievements(value === 'true');
            break;
          case SETTINGS_KEYS.NOTIFICATIONS_RECORDS:
            setNotifRecords(value === 'true');
            break;
          case SETTINGS_KEYS.NOTIFICATIONS_CHALLENGES:
            setNotifChallenges(value === 'true');
            break;
          case SETTINGS_KEYS.NOTIFICATIONS_SOCIAL:
            setNotifSocial(value === 'true');
            break;
          case SETTINGS_KEYS.NOTIFICATIONS_REMINDERS:
            setNotifReminders(value === 'true');
            break;
          case SETTINGS_KEYS.SOUND_EFFECTS:
            setSoundEffects(value === 'true');
            break;
          case SETTINGS_KEYS.HAPTIC_FEEDBACK:
            setHapticFeedback(value === 'true');
            break;
        }
      });
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  const saveSetting = async (key: string, value: string) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.error('Error saving setting:', error);
    }
  };

  const handleRestTimerChange = (seconds: number) => {
    setRestTimerDefault(seconds);
    saveSetting(SETTINGS_KEYS.REST_TIMER_DEFAULT, seconds.toString());
  };

  const restTimerOptions = [
    { label: '30s', value: 30 },
    { label: '60s', value: 60 },
    { label: '90s', value: 90 },
    { label: '120s', value: 120 },
    { label: '180s', value: 180 },
  ];

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <LinearGradient colors={['#9D12DE', '#7C3AED']} className="px-6 pt-12 pb-6">
        <View className="flex-row items-center justify-between">
          <TouchableOpacity onPress={() => router.back()} className="p-2">
            <Ionicons name="arrow-back" size={28} color="white" />
          </TouchableOpacity>
          <Text className="text-2xl font-bold text-white">Configuración</Text>
          <View className="w-10" />
        </View>
      </LinearGradient>

      <ScrollView className="flex-1" contentContainerClassName="p-6 gap-6">
        {/* Workout Settings */}
        <View>
          <Text className="text-lg font-bold text-gray-900 mb-3">Entrenamiento</Text>

          <Card className="p-4">
            {/* Rest Timer Default */}
            <View className="mb-4">
              <Text className="text-sm font-semibold text-gray-900 mb-2">
                Tiempo de descanso por defecto
              </Text>
              <View className="flex-row gap-2">
                {restTimerOptions.map((option) => (
                  <TouchableOpacity
                    key={option.value}
                    onPress={() => handleRestTimerChange(option.value)}
                    className={`flex-1 py-2 rounded-lg border-2 ${
                      restTimerDefault === option.value
                        ? 'bg-primary/10 border-primary'
                        : 'bg-white border-gray-200'
                    }`}
                  >
                    <Text
                      className={`text-center font-semibold ${
                        restTimerDefault === option.value
                          ? 'text-primary'
                          : 'text-gray-600'
                      }`}
                    >
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Auto-start Rest Timer */}
            <View className="flex-row items-center justify-between py-3 border-t border-gray-200">
              <View className="flex-1">
                <Text className="text-gray-900 font-medium">
                  Iniciar timer automáticamente
                </Text>
                <Text className="text-gray-500 text-sm">
                  Al completar una serie
                </Text>
              </View>
              <Switch
                value={autoStartRestTimer}
                onValueChange={(value) => {
                  setAutoStartRestTimer(value);
                  saveSetting(SETTINGS_KEYS.AUTO_START_REST_TIMER, value.toString());
                }}
                trackColor={{ false: '#D1D5DB', true: '#86EFAC' }}
                thumbColor={autoStartRestTimer ? '#9D12DE' : '#F3F4F6'}
              />
            </View>
          </Card>
        </View>

        {/* Notifications */}
        <View>
          <Text className="text-lg font-bold text-gray-900 mb-3">Notificaciones</Text>

          <Card className="p-4">
            {/* Master Switch */}
            <View className="flex-row items-center justify-between pb-3 border-b border-gray-200">
              <View className="flex-1">
                <Text className="text-gray-900 font-bold">
                  Notificaciones
                </Text>
                <Text className="text-gray-500 text-sm">
                  Activar/desactivar todas
                </Text>
              </View>
              <Switch
                value={notificationsEnabled}
                onValueChange={(value) => {
                  setNotificationsEnabled(value);
                  saveSetting(SETTINGS_KEYS.NOTIFICATIONS_ENABLED, value.toString());
                }}
                trackColor={{ false: '#D1D5DB', true: '#86EFAC' }}
                thumbColor={notificationsEnabled ? '#9D12DE' : '#F3F4F6'}
              />
            </View>

            {/* Individual Notification Types */}
            {notificationsEnabled && (
              <>
                <View className="flex-row items-center justify-between py-3 border-b border-gray-200">
                  <View className="flex-1 flex-row items-center gap-3">
                    <Ionicons name="trophy" size={20} color="#FFEA00" />
                    <Text className="text-gray-900">Logros</Text>
                  </View>
                  <Switch
                    value={notifAchievements}
                    onValueChange={(value) => {
                      setNotifAchievements(value);
                      saveSetting(SETTINGS_KEYS.NOTIFICATIONS_ACHIEVEMENTS, value.toString());
                    }}
                    trackColor={{ false: '#D1D5DB', true: '#86EFAC' }}
                    thumbColor={notifAchievements ? '#9D12DE' : '#F3F4F6'}
                  />
                </View>

                <View className="flex-row items-center justify-between py-3 border-b border-gray-200">
                  <View className="flex-1 flex-row items-center gap-3">
                    <Ionicons name="trending-up" size={20} color="#9D12DE" />
                    <Text className="text-gray-900">Records personales</Text>
                  </View>
                  <Switch
                    value={notifRecords}
                    onValueChange={(value) => {
                      setNotifRecords(value);
                      saveSetting(SETTINGS_KEYS.NOTIFICATIONS_RECORDS, value.toString());
                    }}
                    trackColor={{ false: '#D1D5DB', true: '#86EFAC' }}
                    thumbColor={notifRecords ? '#9D12DE' : '#F3F4F6'}
                  />
                </View>

                <View className="flex-row items-center justify-between py-3 border-b border-gray-200">
                  <View className="flex-1 flex-row items-center gap-3">
                    <Ionicons name="flash" size={20} color="#EF4444" />
                    <Text className="text-gray-900">Retos</Text>
                  </View>
                  <Switch
                    value={notifChallenges}
                    onValueChange={(value) => {
                      setNotifChallenges(value);
                      saveSetting(SETTINGS_KEYS.NOTIFICATIONS_CHALLENGES, value.toString());
                    }}
                    trackColor={{ false: '#D1D5DB', true: '#86EFAC' }}
                    thumbColor={notifChallenges ? '#9D12DE' : '#F3F4F6'}
                  />
                </View>

                <View className="flex-row items-center justify-between py-3 border-b border-gray-200">
                  <View className="flex-1 flex-row items-center gap-3">
                    <Ionicons name="people" size={20} color="#9D12DE" />
                    <Text className="text-gray-900">Social</Text>
                  </View>
                  <Switch
                    value={notifSocial}
                    onValueChange={(value) => {
                      setNotifSocial(value);
                      saveSetting(SETTINGS_KEYS.NOTIFICATIONS_SOCIAL, value.toString());
                    }}
                    trackColor={{ false: '#D1D5DB', true: '#86EFAC' }}
                    thumbColor={notifSocial ? '#9D12DE' : '#F3F4F6'}
                  />
                </View>

                <View className="flex-row items-center justify-between py-3">
                  <View className="flex-1 flex-row items-center gap-3">
                    <Ionicons name="time" size={20} color="#8B5CF6" />
                    <Text className="text-gray-900">Recordatorios</Text>
                  </View>
                  <Switch
                    value={notifReminders}
                    onValueChange={(value) => {
                      setNotifReminders(value);
                      saveSetting(SETTINGS_KEYS.NOTIFICATIONS_REMINDERS, value.toString());
                    }}
                    trackColor={{ false: '#D1D5DB', true: '#86EFAC' }}
                    thumbColor={notifReminders ? '#9D12DE' : '#F3F4F6'}
                  />
                </View>
              </>
            )}
          </Card>
        </View>

        {/* App Experience */}
        <View>
          <Text className="text-lg font-bold text-gray-900 mb-3">Experiencia</Text>

          <Card className="p-4">
            <View className="flex-row items-center justify-between pb-3 border-b border-gray-200">
              <View className="flex-1">
                <Text className="text-gray-900 font-medium">Efectos de sonido</Text>
                <Text className="text-gray-500 text-sm">
                  Sonidos de completado y celebraciones
                </Text>
              </View>
              <Switch
                value={soundEffects}
                onValueChange={(value) => {
                  setSoundEffects(value);
                  saveSetting(SETTINGS_KEYS.SOUND_EFFECTS, value.toString());
                }}
                trackColor={{ false: '#D1D5DB', true: '#86EFAC' }}
                thumbColor={soundEffects ? '#9D12DE' : '#F3F4F6'}
              />
            </View>

            <View className="flex-row items-center justify-between pt-3">
              <View className="flex-1">
                <Text className="text-gray-900 font-medium">Feedback háptico</Text>
                <Text className="text-gray-500 text-sm">
                  Vibraciones al interactuar
                </Text>
              </View>
              <Switch
                value={hapticFeedback}
                onValueChange={(value) => {
                  setHapticFeedback(value);
                  saveSetting(SETTINGS_KEYS.HAPTIC_FEEDBACK, value.toString());
                }}
                trackColor={{ false: '#D1D5DB', true: '#86EFAC' }}
                thumbColor={hapticFeedback ? '#9D12DE' : '#F3F4F6'}
              />
            </View>
          </Card>
        </View>

        {/* Account */}
        <View>
          <Text className="text-lg font-bold text-gray-900 mb-3">Cuenta</Text>

          <Card className="p-4">
            <TouchableOpacity className="flex-row items-center justify-between py-3 border-b border-gray-200">
              <View className="flex-row items-center gap-3">
                <Ionicons name="lock-closed-outline" size={24} color="#6B7280" />
                <Text className="text-gray-900">Cambiar contraseña</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
            </TouchableOpacity>

            <TouchableOpacity className="flex-row items-center justify-between py-3 border-b border-gray-200">
              <View className="flex-row items-center gap-3">
                <Ionicons name="shield-outline" size={24} color="#6B7280" />
                <Text className="text-gray-900">Privacidad</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                Alert.alert(
                  'Eliminar cuenta',
                  '¿Estás seguro? Esta acción no se puede deshacer.',
                  [
                    { text: 'Cancelar', style: 'cancel' },
                    { text: 'Eliminar', style: 'destructive' },
                  ]
                );
              }}
              className="flex-row items-center justify-between py-3"
            >
              <View className="flex-row items-center gap-3">
                <Ionicons name="trash-outline" size={24} color="#EF4444" />
                <Text className="text-red-600">Eliminar cuenta</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
            </TouchableOpacity>
          </Card>
        </View>

        {/* About */}
        <View>
          <Text className="text-lg font-bold text-gray-900 mb-3">Información</Text>

          <Card className="p-4">
            <View className="flex-row items-center justify-between py-3 border-b border-gray-200">
              <Text className="text-gray-900">Versión</Text>
              <Text className="text-gray-600">1.0.0</Text>
            </View>

            <TouchableOpacity className="flex-row items-center justify-between py-3 border-b border-gray-200">
              <Text className="text-gray-900">Términos y condiciones</Text>
              <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
            </TouchableOpacity>

            <TouchableOpacity className="flex-row items-center justify-between py-3">
              <Text className="text-gray-900">Política de privacidad</Text>
              <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
            </TouchableOpacity>
          </Card>
        </View>
      </ScrollView>
    </View>
  );
}

