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

interface PrivacySettings {
  profileVisibility: 'public' | 'friends' | 'private';
  showWorkouts: boolean;
  showProgress: boolean;
  showLocation: boolean;
  allowMessages: boolean;
  showOnLeaderboards: boolean;
}

interface NotificationSettings {
  workoutReminders: boolean;
  achievementAlerts: boolean;
  socialActivity: boolean;
  challengeUpdates: boolean;
  weeklyReports: boolean;
  motivationalQuotes: boolean;
}

interface AppSettings {
  darkMode: boolean;
  autoPlayVideos: boolean;
  metricSystem: 'metric' | 'imperial';
  language: 'es' | 'en' | 'pt';
  voiceGuidance: boolean;
  hapticFeedback: boolean;
}

export default function AppSettings() {
  const [privacy, setPrivacy] = useState<PrivacySettings>({
    profileVisibility: 'public',
    showWorkouts: true,
    showProgress: true,
    showLocation: false,
    allowMessages: true,
    showOnLeaderboards: true,
  });

  const [notifications, setNotifications] = useState<NotificationSettings>({
    workoutReminders: true,
    achievementAlerts: true,
    socialActivity: false,
    challengeUpdates: true,
    weeklyReports: true,
    motivationalQuotes: false,
  });

  const [app, setApp] = useState<AppSettings>({
    darkMode: true,
    autoPlayVideos: false,
    metricSystem: 'metric',
    language: 'es',
    voiceGuidance: true,
    hapticFeedback: true,
  });

  const [activeTab, setActiveTab] = useState<'general' | 'privacy' | 'notifications'>('general');

  const tabs = [
    { id: 'general', label: 'General', icon: 'settings' },
    { id: 'privacy', label: 'Privacidad', icon: 'lock-closed' },
    { id: 'notifications', label: 'Notificaciones', icon: 'notifications' },
  ];

  const changeProfileVisibility = () => {
    Alert.alert(
      'Visibilidad de Perfil',
      '¿Quién puede ver tu perfil?',
      [
        {
          text: 'Público',
          onPress: () => setPrivacy({ ...privacy, profileVisibility: 'public' }),
        },
        {
          text: 'Solo Amigos',
          onPress: () => setPrivacy({ ...privacy, profileVisibility: 'friends' }),
        },
        {
          text: 'Privado',
          onPress: () => setPrivacy({ ...privacy, profileVisibility: 'private' }),
        },
        { text: 'Cancelar', style: 'cancel' },
      ]
    );
  };

  const changeLanguage = () => {
    Alert.alert(
      'Idioma',
      'Selecciona tu idioma preferido',
      [
        { text: 'Español', onPress: () => setApp({ ...app, language: 'es' }) },
        { text: 'English', onPress: () => setApp({ ...app, language: 'en' }) },
        { text: 'Portugués', onPress: () => setApp({ ...app, language: 'pt' }) },
        { text: 'Cancelar', style: 'cancel' },
      ]
    );
  };

  const changeMetricSystem = () => {
    Alert.alert(
      'Sistema de Medidas',
      'Elige tu sistema preferido',
      [
        {
          text: 'Métrico (kg, cm)',
          onPress: () => setApp({ ...app, metricSystem: 'metric' }),
        },
        {
          text: 'Imperial (lb, in)',
          onPress: () => setApp({ ...app, metricSystem: 'imperial' }),
        },
        { text: 'Cancelar', style: 'cancel' },
      ]
    );
  };

  const exportData = () => {
    Alert.alert(
      'Exportar Datos',
      'Descarga todos tus datos de entrenamiento',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Exportar', onPress: () => Alert.alert('Exportando...', 'Se enviará a tu email') },
      ]
    );
  };

  const deleteAccount = () => {
    Alert.alert(
      '?? Eliminar Cuenta',
      'Esta acción es permanente. Todos tus datos serán eliminados.\n\n¿Estás seguro?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => Alert.alert('Cuenta eliminada', 'Lamentamos verte partir'),
        },
      ]
    );
  };

  const getVisibilityLabel = (visibility: string) => {
    switch (visibility) {
      case 'public':
        return 'Público';
      case 'friends':
        return 'Solo Amigos';
      case 'private':
        return 'Privado';
      default:
        return visibility;
    }
  };

  const getLanguageLabel = (lang: string) => {
    switch (lang) {
      case 'es':
        return 'Español';
      case 'en':
        return 'English';
      case 'pt':
        return 'Portugués';
      default:
        return lang;
    }
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
            Configuración
          </Text>
          <TouchableOpacity>
            <Ionicons name="help-circle-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Tabs */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row gap-2">
            {tabs.map((tab) => (
              <TouchableOpacity
                key={tab.id}
                onPress={() => setActiveTab(tab.id as any)}
                className={`flex-row items-center px-4 py-2 rounded-lg ${
                  activeTab === tab.id
                    ? 'bg-primary'
                    : 'bg-zinc-900 border border-zinc-800'
                }`}
              >
                <Ionicons
                  name={tab.icon as any}
                  size={18}
                  color={activeTab === tab.id ? 'white' : '#71717A'}
                />
                <Text
                  className={`ml-2 font-semibold text-sm ${
                    activeTab === tab.id ? 'text-white' : 'text-zinc-400'
                  }`}
                >
                  {tab.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* General Settings */}
        {activeTab === 'general' && (
          <View className="px-6 pt-6">
            <View className="bg-zinc-900 rounded-xl p-4 border border-zinc-800 mb-4">
              <TouchableOpacity
                onPress={changeLanguage}
                className="flex-row items-center justify-between mb-4 pb-4 border-b border-zinc-800"
              >
                <View className="flex-1">
                  <Text className="text-white font-bold mb-1">Idioma</Text>
                  <Text className="text-zinc-400 text-sm">
                    {getLanguageLabel(app.language)}
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#71717A" />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={changeMetricSystem}
                className="flex-row items-center justify-between mb-4 pb-4 border-b border-zinc-800"
              >
                <View className="flex-1">
                  <Text className="text-white font-bold mb-1">Sistema de Medidas</Text>
                  <Text className="text-zinc-400 text-sm">
                    {app.metricSystem === 'metric' ? 'Métrico (kg, cm)' : 'Imperial (lb, in)'}
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#71717A" />
              </TouchableOpacity>

              <View className="flex-row items-center justify-between mb-4 pb-4 border-b border-zinc-800">
                <View className="flex-1">
                  <Text className="text-white font-bold mb-1">Modo Oscuro</Text>
                  <Text className="text-zinc-400 text-sm">
                    Tema oscuro para la app
                  </Text>
                </View>
                <Switch
                  value={app.darkMode}
                  onValueChange={(value) => setApp({ ...app, darkMode: value })}
                  trackColor={{ false: '#3F3F46', true: '#9D12DE' }}
                  thumbColor={app.darkMode ? '#fff' : '#D4D4D8'}
                />
              </View>

              <View className="flex-row items-center justify-between mb-4 pb-4 border-b border-zinc-800">
                <View className="flex-1">
                  <Text className="text-white font-bold mb-1">Auto-Play Videos</Text>
                  <Text className="text-zinc-400 text-sm">
                    Reproduce videos automáticamente
                  </Text>
                </View>
                <Switch
                  value={app.autoPlayVideos}
                  onValueChange={(value) => setApp({ ...app, autoPlayVideos: value })}
                  trackColor={{ false: '#3F3F46', true: '#9D12DE' }}
                  thumbColor={app.autoPlayVideos ? '#fff' : '#D4D4D8'}
                />
              </View>

              <View className="flex-row items-center justify-between mb-4 pb-4 border-b border-zinc-800">
                <View className="flex-1">
                  <Text className="text-white font-bold mb-1">Guía de Voz</Text>
                  <Text className="text-zinc-400 text-sm">
                    Instrucciones por voz durante workouts
                  </Text>
                </View>
                <Switch
                  value={app.voiceGuidance}
                  onValueChange={(value) => setApp({ ...app, voiceGuidance: value })}
                  trackColor={{ false: '#3F3F46', true: '#9D12DE' }}
                  thumbColor={app.voiceGuidance ? '#fff' : '#D4D4D8'}
                />
              </View>

              <View className="flex-row items-center justify-between">
                <View className="flex-1">
                  <Text className="text-white font-bold mb-1">Vibración Háptica</Text>
                  <Text className="text-zinc-400 text-sm">
                    Feedback táctil en la app
                  </Text>
                </View>
                <Switch
                  value={app.hapticFeedback}
                  onValueChange={(value) => setApp({ ...app, hapticFeedback: value })}
                  trackColor={{ false: '#3F3F46', true: '#9D12DE' }}
                  thumbColor={app.hapticFeedback ? '#fff' : '#D4D4D8'}
                />
              </View>
            </View>
          </View>
        )}

        {/* Privacy Settings */}
        {activeTab === 'privacy' && (
          <View className="px-6 pt-6">
            <View className="bg-zinc-900 rounded-xl p-4 border border-zinc-800 mb-4">
              <TouchableOpacity
                onPress={changeProfileVisibility}
                className="flex-row items-center justify-between mb-4 pb-4 border-b border-zinc-800"
              >
                <View className="flex-1">
                  <Text className="text-white font-bold mb-1">Visibilidad de Perfil</Text>
                  <Text className="text-zinc-400 text-sm">
                    {getVisibilityLabel(privacy.profileVisibility)}
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#71717A" />
              </TouchableOpacity>

              <View className="flex-row items-center justify-between mb-4 pb-4 border-b border-zinc-800">
                <View className="flex-1">
                  <Text className="text-white font-bold mb-1">Mostrar Entrenamientos</Text>
                  <Text className="text-zinc-400 text-sm">
                    Comparte tus workouts con otros
                  </Text>
                </View>
                <Switch
                  value={privacy.showWorkouts}
                  onValueChange={(value) =>
                    setPrivacy({ ...privacy, showWorkouts: value })
                  }
                  trackColor={{ false: '#3F3F46', true: '#9D12DE' }}
                  thumbColor={privacy.showWorkouts ? '#fff' : '#D4D4D8'}
                />
              </View>

              <View className="flex-row items-center justify-between mb-4 pb-4 border-b border-zinc-800">
                <View className="flex-1">
                  <Text className="text-white font-bold mb-1">Mostrar Progreso</Text>
                  <Text className="text-zinc-400 text-sm">
                    Comparte tus métricas y logros
                  </Text>
                </View>
                <Switch
                  value={privacy.showProgress}
                  onValueChange={(value) =>
                    setPrivacy({ ...privacy, showProgress: value })
                  }
                  trackColor={{ false: '#3F3F46', true: '#9D12DE' }}
                  thumbColor={privacy.showProgress ? '#fff' : '#D4D4D8'}
                />
              </View>

              <View className="flex-row items-center justify-between mb-4 pb-4 border-b border-zinc-800">
                <View className="flex-1">
                  <Text className="text-white font-bold mb-1">Mostrar Ubicación</Text>
                  <Text className="text-zinc-400 text-sm">
                    Comparte tu ubicación de gym
                  </Text>
                </View>
                <Switch
                  value={privacy.showLocation}
                  onValueChange={(value) =>
                    setPrivacy({ ...privacy, showLocation: value })
                  }
                  trackColor={{ false: '#3F3F46', true: '#9D12DE' }}
                  thumbColor={privacy.showLocation ? '#fff' : '#D4D4D8'}
                />
              </View>

              <View className="flex-row items-center justify-between mb-4 pb-4 border-b border-zinc-800">
                <View className="flex-1">
                  <Text className="text-white font-bold mb-1">Permitir Mensajes</Text>
                  <Text className="text-zinc-400 text-sm">
                    Recibe mensajes de otros usuarios
                  </Text>
                </View>
                <Switch
                  value={privacy.allowMessages}
                  onValueChange={(value) =>
                    setPrivacy({ ...privacy, allowMessages: value })
                  }
                  trackColor={{ false: '#3F3F46', true: '#9D12DE' }}
                  thumbColor={privacy.allowMessages ? '#fff' : '#D4D4D8'}
                />
              </View>

              <View className="flex-row items-center justify-between">
                <View className="flex-1">
                  <Text className="text-white font-bold mb-1">Aparecer en Leaderboards</Text>
                  <Text className="text-zinc-400 text-sm">
                    Muestra tu ranking en desafíos
                  </Text>
                </View>
                <Switch
                  value={privacy.showOnLeaderboards}
                  onValueChange={(value) =>
                    setPrivacy({ ...privacy, showOnLeaderboards: value })
                  }
                  trackColor={{ false: '#3F3F46', true: '#9D12DE' }}
                  thumbColor={privacy.showOnLeaderboards ? '#fff' : '#D4D4D8'}
                />
              </View>
            </View>
          </View>
        )}

        {/* Notification Settings */}
        {activeTab === 'notifications' && (
          <View className="px-6 pt-6">
            <View className="bg-zinc-900 rounded-xl p-4 border border-zinc-800 mb-4">
              <View className="flex-row items-center justify-between mb-4 pb-4 border-b border-zinc-800">
                <View className="flex-1">
                  <Text className="text-white font-bold mb-1">Recordatorios de Workout</Text>
                  <Text className="text-zinc-400 text-sm">
                    Notificaciones para entrenar
                  </Text>
                </View>
                <Switch
                  value={notifications.workoutReminders}
                  onValueChange={(value) =>
                    setNotifications({ ...notifications, workoutReminders: value })
                  }
                  trackColor={{ false: '#3F3F46', true: '#9D12DE' }}
                  thumbColor={notifications.workoutReminders ? '#fff' : '#D4D4D8'}
                />
              </View>

              <View className="flex-row items-center justify-between mb-4 pb-4 border-b border-zinc-800">
                <View className="flex-1">
                  <Text className="text-white font-bold mb-1">Alertas de Logros</Text>
                  <Text className="text-zinc-400 text-sm">
                    Notificaciones de achievements
                  </Text>
                </View>
                <Switch
                  value={notifications.achievementAlerts}
                  onValueChange={(value) =>
                    setNotifications({ ...notifications, achievementAlerts: value })
                  }
                  trackColor={{ false: '#3F3F46', true: '#9D12DE' }}
                  thumbColor={notifications.achievementAlerts ? '#fff' : '#D4D4D8'}
                />
              </View>

              <View className="flex-row items-center justify-between mb-4 pb-4 border-b border-zinc-800">
                <View className="flex-1">
                  <Text className="text-white font-bold mb-1">Actividad Social</Text>
                  <Text className="text-zinc-400 text-sm">
                    Likes, comentarios, nuevos seguidores
                  </Text>
                </View>
                <Switch
                  value={notifications.socialActivity}
                  onValueChange={(value) =>
                    setNotifications({ ...notifications, socialActivity: value })
                  }
                  trackColor={{ false: '#3F3F46', true: '#9D12DE' }}
                  thumbColor={notifications.socialActivity ? '#fff' : '#D4D4D8'}
                />
              </View>

              <View className="flex-row items-center justify-between mb-4 pb-4 border-b border-zinc-800">
                <View className="flex-1">
                  <Text className="text-white font-bold mb-1">Actualizaciones de Desafíos</Text>
                  <Text className="text-zinc-400 text-sm">
                    Progreso en challenges activos
                  </Text>
                </View>
                <Switch
                  value={notifications.challengeUpdates}
                  onValueChange={(value) =>
                    setNotifications({ ...notifications, challengeUpdates: value })
                  }
                  trackColor={{ false: '#3F3F46', true: '#9D12DE' }}
                  thumbColor={notifications.challengeUpdates ? '#fff' : '#D4D4D8'}
                />
              </View>

              <View className="flex-row items-center justify-between mb-4 pb-4 border-b border-zinc-800">
                <View className="flex-1">
                  <Text className="text-white font-bold mb-1">Reportes Semanales</Text>
                  <Text className="text-zinc-400 text-sm">
                    Resumen de tu semana
                  </Text>
                </View>
                <Switch
                  value={notifications.weeklyReports}
                  onValueChange={(value) =>
                    setNotifications({ ...notifications, weeklyReports: value })
                  }
                  trackColor={{ false: '#3F3F46', true: '#9D12DE' }}
                  thumbColor={notifications.weeklyReports ? '#fff' : '#D4D4D8'}
                />
              </View>

              <View className="flex-row items-center justify-between">
                <View className="flex-1">
                  <Text className="text-white font-bold mb-1">Frases Motivacionales</Text>
                  <Text className="text-zinc-400 text-sm">
                    Inspiración diaria
                  </Text>
                </View>
                <Switch
                  value={notifications.motivationalQuotes}
                  onValueChange={(value) =>
                    setNotifications({ ...notifications, motivationalQuotes: value })
                  }
                  trackColor={{ false: '#3F3F46', true: '#9D12DE' }}
                  thumbColor={notifications.motivationalQuotes ? '#fff' : '#D4D4D8'}
                />
              </View>
            </View>
          </View>
        )}

        {/* Account Actions */}
        <View className="px-6 pb-6">
          <Text className="text-white font-bold text-lg mb-3">Cuenta</Text>
          
          <TouchableOpacity
            onPress={exportData}
            className="bg-zinc-900 rounded-xl p-4 border border-zinc-800 mb-3"
          >
            <View className="flex-row items-center">
              <Ionicons name="download" size={20} color="#9D12DE" />
              <Text className="text-white font-bold ml-3">Exportar Mis Datos</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity className="bg-zinc-900 rounded-xl p-4 border border-zinc-800 mb-3">
            <View className="flex-row items-center">
              <Ionicons name="help-circle" size={20} color="#9D12DE" />
              <Text className="text-white font-bold ml-3">Ayuda y Soporte</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity className="bg-zinc-900 rounded-xl p-4 border border-zinc-800 mb-3">
            <View className="flex-row items-center">
              <Ionicons name="document-text" size={20} color="#FFEA00" />
              <Text className="text-white font-bold ml-3">Términos y Privacidad</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={deleteAccount}
            className="bg-red-500/10 rounded-xl p-4 border border-red-500/30"
          >
            <View className="flex-row items-center">
              <Ionicons name="trash" size={20} color="#EF4444" />
              <Text className="text-red-500 font-bold ml-3">Eliminar Cuenta</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

