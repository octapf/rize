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

interface FormError {
  id: string;
  field: string;
  exercise: string;
  issue: string;
  timestamp: string;
  videoUrl?: string;
  reviewed: boolean;
}

interface Coach {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  clients: number;
  responseTime: string;
  avatar: string;
  price: number;
  available: boolean;
}

const FORM_ERRORS: FormError[] = [
  {
    id: '1',
    field: 'Sentadilla',
    exercise: 'Back Squat',
    issue: 'Rodillas hacia adentro',
    timestamp: '2025-01-20 18:45',
    videoUrl: 'video_1.mp4',
    reviewed: false,
  },
  {
    id: '2',
    field: 'Press Banca',
    exercise: 'Bench Press',
    issue: 'Codos muy abiertos',
    timestamp: '2025-01-18 19:30',
    videoUrl: 'video_2.mp4',
    reviewed: true,
  },
];

const COACHES: Coach[] = [
  {
    id: '1',
    name: 'Carlos Pérez',
    specialty: 'Powerlifting',
    rating: 4.9,
    clients: 234,
    responseTime: '< 2 horas',
    avatar: '💪',
    price: 29.99,
    available: true,
  },
  {
    id: '2',
    name: 'Ana Martínez',
    specialty: 'Hipertrofia',
    rating: 4.8,
    clients: 189,
    responseTime: '< 4 horas',
    avatar: '🏋️',
    price: 24.99,
    available: true,
  },
  {
    id: '3',
    name: 'Luis García',
    specialty: 'Calistenia',
    rating: 4.7,
    clients: 156,
    responseTime: '< 6 horas',
    avatar: '🤸',
    price: 19.99,
    available: false,
  },
];

export default function PersonalCoaching() {
  const [selectedTab, setSelectedTab] = useState<'form-check' | 'coaches' | 'sessions'>('form-check');
  const [message, setMessage] = useState('');

  const tabs = [
    { id: 'form-check' as const, label: 'Form Check', icon: 'videocam' },
    { id: 'coaches' as const, label: 'Coaches', icon: 'people' },
    { id: 'sessions' as const, label: 'Sesiones', icon: 'calendar' },
  ];

  const submitFormCheck = () => {
    Alert.alert(
      'Subir Video',
      'Selecciona el origen del video',
      [
        {
          text: 'Cámara',
          onPress: () => {
            Alert.alert('Grabando...', 'Función de cámara próximamente');
          },
        },
        {
          text: 'Galería',
          onPress: () => {
            Alert.alert('¡Video Subido!', 'Tu form check está en revisión. Recibirás feedback en 24-48 horas.');
          },
        },
        { text: 'Cancelar', style: 'cancel' },
      ]
    );
  };

  const viewFormCheckDetails = (error: FormError) => {
    Alert.alert(
      error.exercise,
      `Problema detectado: ${error.issue}\n\nFecha: ${error.timestamp}\n\nEstado: ${error.reviewed ? 'Revisado ✅' : 'Pendiente ⏳'}`,
      [
        { text: 'Ver Video', onPress: () => Alert.alert('Reproducir Video', error.videoUrl || 'No disponible') },
        { text: 'Cerrar' },
      ]
    );
  };

  const hireCoach = (coach: Coach) => {
    if (!coach.available) {
      Alert.alert('Coach No Disponible', `${coach.name} no está aceptando nuevos clientes en este momento.`);
      return;
    }

    Alert.alert(
      'Contratar Coach',
      `${coach.name}\n${coach.specialty}\n\nPrecio: $${coach.price}/mes\n\n¿Deseas continuar?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Contratar',
          onPress: () => {
            Alert.alert(
              '¡Contratado!',
              `${coach.name} te contactará en ${coach.responseTime}.\n\nRevisarás tu plan inicial juntos.`
            );
          },
        },
      ]
    );
  };

  const sendMessage = (coachId: string) => {
    if (message.trim() === '') {
      Alert.alert('Error', 'Escribe un mensaje');
      return;
    }

    Alert.alert('Mensaje Enviado', `Tu consulta fue enviada. Respuesta estimada: < 24 horas`);
    setMessage('');
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
            Coaching Personal
          </Text>
          <TouchableOpacity>
            <Ionicons name="chatbubbles-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Tabs */}
        <View className="flex-row gap-2">
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.id}
              onPress={() => setSelectedTab(tab.id)}
              className={`flex-1 flex-row items-center justify-center py-3 rounded-lg ${
                selectedTab === tab.id ? 'bg-emerald-500' : 'bg-zinc-900 border border-zinc-800'
              }`}
            >
              <Ionicons
                name={tab.icon as any}
                size={18}
                color={selectedTab === tab.id ? 'white' : '#71717A'}
              />
              <Text
                className={`ml-2 font-semibold text-sm ${
                  selectedTab === tab.id ? 'text-white' : 'text-zinc-400'
                }`}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Form Check Tab */}
        {selectedTab === 'form-check' && (
          <View className="px-6 pt-6">
            {/* Upload Button */}
            <TouchableOpacity
              onPress={submitFormCheck}
              className="bg-gradient-to-br from-emerald-500 to-blue-500 rounded-xl p-6 mb-6"
            >
              <View className="flex-row items-center justify-between">
                <View className="flex-1">
                  <Text className="text-white font-bold text-xl mb-2">
                    Subir Form Check
                  </Text>
                  <Text className="text-white/80 text-sm">
                    Recibe feedback profesional en 24-48 horas
                  </Text>
                </View>
                <View className="bg-white/20 rounded-full p-4">
                  <Ionicons name="cloud-upload" size={32} color="white" />
                </View>
              </View>
            </TouchableOpacity>

            {/* Pending Form Checks */}
            <Text className="text-white font-bold text-lg mb-3">
              Mis Form Checks ({FORM_ERRORS.length})
            </Text>

            {FORM_ERRORS.length === 0 ? (
              <View className="bg-zinc-900 rounded-xl p-8 border border-zinc-800 items-center">
                <Ionicons name="videocam-outline" size={48} color="#71717A" />
                <Text className="text-zinc-400 font-bold mt-4">
                  No has subido form checks
                </Text>
                <Text className="text-zinc-500 text-sm mt-2 text-center">
                  Sube un video para recibir feedback
                </Text>
              </View>
            ) : (
              FORM_ERRORS.map((error) => (
                <TouchableOpacity
                  key={error.id}
                  onPress={() => viewFormCheckDetails(error)}
                  className="bg-zinc-900 rounded-xl p-4 mb-3 border border-zinc-800"
                >
                  <View className="flex-row items-center justify-between mb-3">
                    <View className="flex-1">
                      <Text className="text-white font-bold text-lg">
                        {error.exercise}
                      </Text>
                      <Text className="text-zinc-400 text-sm mt-1">
                        {error.timestamp}
                      </Text>
                    </View>
                    <View
                      className={`px-3 py-1 rounded-full ${
                        error.reviewed ? 'bg-emerald-500/20' : 'bg-amber-500/20'
                      }`}
                    >
                      <Text
                        className={`text-xs font-bold ${
                          error.reviewed ? 'text-emerald-500' : 'text-amber-500'
                        }`}
                      >
                        {error.reviewed ? 'REVISADO' : 'PENDIENTE'}
                      </Text>
                    </View>
                  </View>

                  {error.reviewed && (
                    <View className="bg-red-500/10 rounded-lg p-3 mb-2">
                      <View className="flex-row items-start">
                        <Ionicons name="alert-circle" size={16} color="#EF4444" />
                        <View className="flex-1 ml-2">
                          <Text className="text-red-400 font-bold text-sm">
                            Problema Detectado
                          </Text>
                          <Text className="text-red-300 text-xs mt-1">
                            {error.issue}
                          </Text>
                        </View>
                      </View>
                    </View>
                  )}

                  <View className="flex-row items-center justify-between">
                    <View className="flex-row items-center">
                      <Ionicons name="videocam" size={16} color="#71717A" />
                      <Text className="text-zinc-400 text-sm ml-2">
                        {error.videoUrl || 'Sin video'}
                      </Text>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color="#71717A" />
                  </View>
                </TouchableOpacity>
              ))
            )}

            {/* Info */}
            <View className="bg-blue-500/10 rounded-xl p-4 border border-blue-500/30 mt-4">
              <View className="flex-row items-start">
                <Ionicons name="information-circle" size={20} color="#3B82F6" />
                <View className="flex-1 ml-3">
                  <Text className="text-blue-400 font-bold mb-2">
                    ¿Cómo funciona?
                  </Text>
                  <Text className="text-blue-300 text-sm mb-2">
                    1. Graba tu ejercicio desde un ángulo lateral
                  </Text>
                  <Text className="text-blue-300 text-sm mb-2">
                    2. Sube el video y describe tus dudas
                  </Text>
                  <Text className="text-blue-300 text-sm">
                    3. Un coach revisará tu técnica y te dará feedback detallado
                  </Text>
                </View>
              </View>
            </View>
          </View>
        )}

        {/* Coaches Tab */}
        {selectedTab === 'coaches' && (
          <View className="px-6 pt-6">
            <Text className="text-white font-bold text-lg mb-3">
              Coaches Disponibles
            </Text>

            {COACHES.map((coach) => (
              <View
                key={coach.id}
                className="bg-zinc-900 rounded-xl p-4 mb-4 border border-zinc-800"
              >
                <View className="flex-row items-start mb-3">
                  <View className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-full items-center justify-center">
                    <Text className="text-3xl">{coach.avatar}</Text>
                  </View>

                  <View className="flex-1 ml-3">
                    <View className="flex-row items-center justify-between">
                      <Text className="text-white font-bold text-lg">
                        {coach.name}
                      </Text>
                      <View
                        className={`px-2 py-1 rounded ${
                          coach.available ? 'bg-emerald-500/20' : 'bg-red-500/20'
                        }`}
                      >
                        <Text
                          className={`text-xs font-bold ${
                            coach.available ? 'text-emerald-500' : 'text-red-500'
                          }`}
                        >
                          {coach.available ? 'DISPONIBLE' : 'OCUPADO'}
                        </Text>
                      </View>
                    </View>
                    <Text className="text-emerald-500 font-semibold mt-1">
                      {coach.specialty}
                    </Text>
                  </View>
                </View>

                {/* Stats */}
                <View className="flex-row gap-2 mb-3">
                  <View className="flex-1 bg-zinc-800 rounded-lg p-2">
                    <View className="flex-row items-center">
                      <Ionicons name="star" size={14} color="#F59E0B" />
                      <Text className="text-white font-bold ml-1 text-sm">
                        {coach.rating}
                      </Text>
                    </View>
                  </View>
                  <View className="flex-1 bg-zinc-800 rounded-lg p-2">
                    <View className="flex-row items-center">
                      <Ionicons name="people" size={14} color="#71717A" />
                      <Text className="text-zinc-300 font-semibold ml-1 text-sm">
                        {coach.clients}
                      </Text>
                    </View>
                  </View>
                  <View className="flex-1 bg-zinc-800 rounded-lg p-2">
                    <View className="flex-row items-center">
                      <Ionicons name="time" size={14} color="#71717A" />
                      <Text className="text-zinc-300 font-semibold ml-1 text-sm">
                        {coach.responseTime}
                      </Text>
                    </View>
                  </View>
                </View>

                {/* Price & Actions */}
                <View className="flex-row items-center justify-between pt-3 border-t border-zinc-800">
                  <View>
                    <Text className="text-white font-bold text-2xl">
                      ${coach.price}
                    </Text>
                    <Text className="text-zinc-400 text-xs">por mes</Text>
                  </View>

                  <View className="flex-row gap-2">
                    <TouchableOpacity
                      onPress={() => Alert.alert('Chat', `Iniciar chat con ${coach.name}`)}
                      className="bg-zinc-800 rounded-lg p-3"
                    >
                      <Ionicons name="chatbubbles" size={20} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => hireCoach(coach)}
                      className={`rounded-lg px-6 py-3 ${
                        coach.available ? 'bg-emerald-500' : 'bg-zinc-700'
                      }`}
                      disabled={!coach.available}
                    >
                      <Text className="text-white font-semibold">
                        {coach.available ? 'Contratar' : 'No Disponible'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Sessions Tab */}
        {selectedTab === 'sessions' && (
          <View className="px-6 pt-6">
            <View className="bg-zinc-900 rounded-xl p-8 border border-zinc-800 items-center">
              <Ionicons name="calendar-outline" size={48} color="#71717A" />
              <Text className="text-zinc-400 font-bold mt-4">
                No tienes sesiones programadas
              </Text>
              <Text className="text-zinc-500 text-sm mt-2 text-center">
                Contrata un coach para agendar sesiones
              </Text>
              <TouchableOpacity
                onPress={() => setSelectedTab('coaches')}
                className="bg-emerald-500 rounded-lg px-6 py-3 mt-4"
              >
                <Text className="text-white font-semibold">Ver Coaches</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
