import React, { useState } from 'react';
import { Text } from '@/components/ui/Text';
import { View, TouchableOpacity, ScrollView, Alert, Image } from 'react-native';;
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface VirtualClass {
  id: string;
  title: string;
  instructor: string;
  type: 'hiit' | 'yoga' | 'spinning' | 'functional' | 'strength' | 'pilates';
  duration: number;
  difficulty: 'principiante' | 'intermedio' | 'avanzado';
  scheduledTime?: string;
  isLive: boolean;
  participants: number;
  maxParticipants?: number;
  thumbnail: string;
  equipment: string[];
  description: string;
}

const LIVE_CLASSES: VirtualClass[] = [
  {
    id: '1',
    title: 'HIIT Extremo Full Body',
    instructor: 'Carlos Martínez',
    type: 'hiit',
    duration: 45,
    difficulty: 'avanzado',
    scheduledTime: '18:00',
    isLive: true,
    participants: 127,
    maxParticipants: 200,
    thumbnail: 'https://via.placeholder.com/400x200/EF4444/FFFFFF?text=HIIT+EN+VIVO',
    equipment: ['Mancuernas', 'Colchoneta'],
    description: 'Entrenamiento intenso de intervalos para quemar grasa',
  },
  {
    id: '2',
    title: 'Yoga Flow Matutino',
    instructor: 'Ana Rodríguez',
    type: 'yoga',
    duration: 60,
    difficulty: 'intermedio',
    scheduledTime: '07:00',
    isLive: false,
    participants: 0,
    maxParticipants: 150,
    thumbnail: 'https://via.placeholder.com/400x200/9D12DE/FFFFFF?text=Yoga',
    equipment: ['Colchoneta', 'Bloque'],
    description: 'Secuencia de yoga para empezar el día con energía',
  },
];

const UPCOMING_CLASSES: VirtualClass[] = [
  {
    id: '3',
    title: 'Spinning de Alta Intensidad',
    instructor: 'Luis Gómez',
    type: 'spinning',
    duration: 50,
    difficulty: 'avanzado',
    scheduledTime: '19:30',
    isLive: false,
    participants: 0,
    maxParticipants: 100,
    thumbnail: 'https://via.placeholder.com/400x200/F59E0B/FFFFFF?text=Spinning',
    equipment: ['Bicicleta estática'],
    description: 'Clase de cycling con música motivadora',
  },
  {
    id: '4',
    title: 'Entrenamiento Funcional',
    instructor: 'María López',
    type: 'functional',
    duration: 40,
    difficulty: 'intermedio',
    scheduledTime: '20:15',
    isLive: false,
    participants: 0,
    maxParticipants: 150,
    thumbnail: 'https://via.placeholder.com/400x200/3B82F6/FFFFFF?text=Funcional',
    equipment: ['Kettlebell', 'TRX', 'Colchoneta'],
    description: 'Movimientos funcionales para mejorar tu día a día',
  },
  {
    id: '5',
    title: 'Fuerza con Pesas',
    instructor: 'Pedro Sánchez',
    type: 'strength',
    duration: 55,
    difficulty: 'avanzado',
    scheduledTime: '21:00',
    isLive: false,
    participants: 0,
    maxParticipants: 120,
    thumbnail: 'https://via.placeholder.com/400x200/8B5CF6/FFFFFF?text=Fuerza',
    equipment: ['Barra', 'Discos', 'Banco'],
    description: 'Construcción de fuerza y masa muscular',
  },
];

export default function GroupClasses() {
  const [selectedTab, setSelectedTab] = useState<'live' | 'upcoming' | 'ondemand'>('live');

  const tabs = [
    { id: 'live' as const, label: 'En Vivo', icon: 'radio' },
    { id: 'upcoming' as const, label: 'Próximas', icon: 'calendar' },
    { id: 'ondemand' as const, label: 'On Demand', icon: 'play-circle' },
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'hiit':
        return '#EF4444';
      case 'yoga':
        return '#9D12DE';
      case 'spinning':
        return '#FFEA00';
      case 'functional':
        return '#9D12DE';
      case 'strength':
        return '#8B5CF6';
      case 'pilates':
        return '#EC4899';
      default:
        return '#71717A';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'principiante':
        return '#9D12DE';
      case 'intermedio':
        return '#FFEA00';
      case 'avanzado':
        return '#EF4444';
      default:
        return '#71717A';
    }
  };

  const joinClass = (classItem: VirtualClass) => {
    if (classItem.isLive) {
      Alert.alert(
        'Unirse a Clase en Vivo',
        `${classItem.title}\n\nInstructor: ${classItem.instructor}\n${classItem.participants}/${classItem.maxParticipants} participantes\n\n¿Deseas unirte ahora?`,
        [
          { text: 'Cancelar', style: 'cancel' },
          {
            text: 'Unirse',
            onPress: () => {
              Alert.alert('¡Conectado!', 'Estás en la clase en vivo');
            },
          },
        ]
      );
    } else {
      Alert.alert(
        'Reservar Clase',
        `${classItem.title}\n\nHorario: ${classItem.scheduledTime}\n\n¿Deseas reservar tu lugar?`,
        [
          { text: 'Cancelar', style: 'cancel' },
          {
            text: 'Reservar',
            onPress: () => {
              Alert.alert('¡Reservado!', 'Recibirás un recordatorio antes de la clase');
            },
          },
        ]
      );
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
            Clases Virtuales
          </Text>
          <TouchableOpacity>
            <Ionicons name="notifications-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View className="bg-gradient-to-br from-primary to-[#7D0EBE] rounded-xl p-4 mb-4">
          <View className="flex-row items-center justify-between">
            <View className="flex-1">
              <Text className="text-white/80 text-sm mb-1">Clases Este Mes</Text>
              <Text className="text-white font-bold text-4xl mb-1">
                12
              </Text>
              <Text className="text-white/80 text-sm">
                +4 vs mes anterior
              </Text>
            </View>
            <View className="bg-white/20 rounded-full p-4">
              <Ionicons name="people" size={32} color="white" />
            </View>
          </View>
        </View>

        {/* Tabs */}
        <View className="flex-row gap-2">
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.id}
              onPress={() => setSelectedTab(tab.id)}
              className={`flex-1 flex-row items-center justify-center py-3 rounded-lg ${
                selectedTab === tab.id ? 'bg-primary' : 'bg-zinc-900 border border-zinc-800'
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
        {/* Live Tab */}
        {selectedTab === 'live' && (
          <View className="px-6 pt-6">
            <Text className="text-white font-bold text-lg mb-3">
              Clases en Vivo Ahora ({LIVE_CLASSES.filter((c) => c.isLive).length})
            </Text>

            {LIVE_CLASSES.map((classItem) => (
              <View
                key={classItem.id}
                className={`bg-zinc-900 rounded-xl overflow-hidden mb-4 ${
                  classItem.isLive ? 'border-2 border-red-500' : 'border border-zinc-800'
                }`}
              >
                <Image
                  source={{ uri: classItem.thumbnail }}
                  style={{ width: '100%', height: 140 }}
                  resizeMode="cover"
                />

                {classItem.isLive && (
                  <View className="absolute top-3 left-3 bg-red-500 px-3 py-1 rounded-full flex-row items-center">
                    <View className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse" />
                    <Text className="text-white text-xs font-bold">EN VIVO</Text>
                  </View>
                )}

                <View className="p-4">
                  <View className="flex-row items-start justify-between mb-3">
                    <View className="flex-1">
                      <View className="flex-row items-center mb-2">
                        <View
                          className="px-3 py-1 rounded-full"
                          style={{ backgroundColor: getTypeColor(classItem.type) + '20' }}
                        >
                          <Text
                            className="text-xs font-bold uppercase"
                            style={{ color: getTypeColor(classItem.type) }}
                          >
                            {classItem.type}
                          </Text>
                        </View>
                        <View
                          className="px-3 py-1 rounded-full ml-2"
                          style={{
                            backgroundColor: getDifficultyColor(classItem.difficulty) + '20',
                          }}
                        >
                          <Text
                            className="text-xs font-bold capitalize"
                            style={{ color: getDifficultyColor(classItem.difficulty) }}
                          >
                            {classItem.difficulty}
                          </Text>
                        </View>
                      </View>
                      <Text className="text-white font-bold text-xl mb-1">
                        {classItem.title}
                      </Text>
                      <Text className="text-zinc-400 text-sm mb-2">
                        {classItem.description}
                      </Text>
                    </View>
                  </View>

                  <View className="flex-row items-center gap-4 mb-3">
                    <View className="flex-row items-center">
                      <Ionicons name="person" size={16} color="#71717A" />
                      <Text className="text-zinc-400 text-sm ml-1">
                        {classItem.instructor}
                      </Text>
                    </View>
                    <View className="flex-row items-center">
                      <Ionicons name="time" size={16} color="#71717A" />
                      <Text className="text-zinc-400 text-sm ml-1">
                        {classItem.duration} min
                      </Text>
                    </View>
                    {classItem.isLive && (
                      <View className="flex-row items-center">
                        <Ionicons name="people" size={16} color="#9D12DE" />
                        <Text className="text-primary text-sm ml-1 font-bold">
                          {classItem.participants}
                        </Text>
                      </View>
                    )}
                  </View>

                  <View className="bg-zinc-800 rounded-lg p-3 mb-3">
                    <Text className="text-zinc-400 text-xs mb-2">Equipamiento</Text>
                    <View className="flex-row flex-wrap gap-2">
                      {classItem.equipment.map((item, index) => (
                        <View key={index} className="bg-zinc-700 px-3 py-1 rounded-full">
                          <Text className="text-zinc-300 text-xs">{item}</Text>
                        </View>
                      ))}
                    </View>
                  </View>

                  <TouchableOpacity
                    onPress={() => joinClass(classItem)}
                    className={`${
                      classItem.isLive ? 'bg-red-500' : 'bg-primary'
                    } rounded-lg p-3`}
                  >
                    <View className="flex-row items-center justify-center">
                      <Ionicons
                        name={classItem.isLive ? 'videocam' : 'calendar'}
                        size={18}
                        color="white"
                      />
                      <Text className="text-white font-bold ml-2">
                        {classItem.isLive ? 'Unirse Ahora' : 'Reservar Lugar'}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Upcoming Tab */}
        {selectedTab === 'upcoming' && (
          <View className="px-6 pt-6">
            <Text className="text-white font-bold text-lg mb-3">
              Próximas Clases Hoy ({UPCOMING_CLASSES.length})
            </Text>

            {UPCOMING_CLASSES.map((classItem) => (
              <View
                key={classItem.id}
                className="bg-zinc-900 rounded-xl p-4 mb-3 border border-zinc-800"
              >
                <View className="flex-row items-start justify-between mb-3">
                  <View className="flex-1">
                    <View className="flex-row items-center mb-2">
                      <View
                        className="w-12 h-12 rounded-lg items-center justify-center"
                        style={{ backgroundColor: getTypeColor(classItem.type) }}
                      >
                        <Ionicons name="fitness" size={24} color="white" />
                      </View>
                      <View className="ml-3 flex-1">
                        <Text className="text-white font-bold text-lg">
                          {classItem.title}
                        </Text>
                        <Text className="text-zinc-400 text-sm">
                          {classItem.instructor}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View className="items-end">
                    <Text className="text-primary font-bold text-2xl">
                      {classItem.scheduledTime}
                    </Text>
                    <Text className="text-zinc-400 text-xs">
                      {classItem.duration} min
                    </Text>
                  </View>
                </View>

                <View className="flex-row gap-2 mb-3">
                  <View
                    className="px-3 py-1 rounded-full"
                    style={{ backgroundColor: getTypeColor(classItem.type) + '20' }}
                  >
                    <Text
                      className="text-xs font-bold uppercase"
                      style={{ color: getTypeColor(classItem.type) }}
                    >
                      {classItem.type}
                    </Text>
                  </View>
                  <View
                    className="px-3 py-1 rounded-full"
                    style={{ backgroundColor: getDifficultyColor(classItem.difficulty) + '20' }}
                  >
                    <Text
                      className="text-xs font-bold capitalize"
                      style={{ color: getDifficultyColor(classItem.difficulty) }}
                    >
                      {classItem.difficulty}
                    </Text>
                  </View>
                  <View className="bg-zinc-800 px-3 py-1 rounded-full">
                    <Text className="text-zinc-400 text-xs">
                      {classItem.participants}/{classItem.maxParticipants} inscritos
                    </Text>
                  </View>
                </View>

                <TouchableOpacity
                  onPress={() => joinClass(classItem)}
                  className="bg-primary rounded-lg p-3"
                >
                  <Text className="text-white font-bold text-center">
                    Reservar Lugar
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        {/* On Demand Tab */}
        {selectedTab === 'ondemand' && (
          <View className="px-6 pt-6">
            <View className="bg-zinc-900 rounded-xl p-8 border border-zinc-800 items-center">
              <Ionicons name="play-circle-outline" size={64} color="#71717A" />
              <Text className="text-zinc-400 font-bold mt-4 text-center">
                Biblioteca On Demand
              </Text>
              <Text className="text-zinc-500 text-sm mt-2 text-center">
                Accede a más de 500 clases grabadas cuando quieras
              </Text>
              <TouchableOpacity className="bg-primary rounded-lg px-6 py-3 mt-4">
                <Text className="text-white font-bold">Explorar Biblioteca</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Info Card */}
        <View className="px-6 pb-6 pt-4">
          <View className="bg-primary/10 rounded-xl p-4 border border-primary/30">
            <View className="flex-row items-start">
              <Ionicons name="information-circle" size={20} color="#9D12DE" />
              <View className="flex-1 ml-3">
                <Text className="text-primary/80 font-bold mb-2">
                  Tips para Clases Virtuales
                </Text>
                <Text className="text-primary/60 text-sm mb-1">
                  • Prepara tu equipamiento antes de la clase
                </Text>
                <Text className="text-primary/60 text-sm mb-1">
                  • Busca un espacio con buena conexión
                </Text>
                <Text className="text-primary/60 text-sm">
                  • Llega 5 minutos antes para calentar
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}


