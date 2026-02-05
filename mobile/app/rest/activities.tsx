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

interface RestActivity {
  id: string;
  name: string;
  category: 'mobility' | 'cardio' | 'recovery' | 'mental';
  duration: number;
  intensity: 'low' | 'moderate';
  calories: number;
  benefits: string[];
  equipment: string[];
  instructions: string[];
  icon: string;
  color: string;
}

const REST_ACTIVITIES: RestActivity[] = [
  {
    id: '1',
    name: 'Yoga Flow Suave',
    category: 'mobility',
    duration: 30,
    intensity: 'low',
    calories: 120,
    benefits: ['Flexibilidad', 'Movilidad', 'Relajación', 'Postura'],
    equipment: ['Esterilla'],
    instructions: [
      'Calentamiento con respiración 5 min',
      'Saludo al sol 3 series lentas',
      'Posturas de apertura de cadera',
      'Estiramientos pasivos 10 min',
      'Savasana final 5 min',
    ],
    icon: '🧘',
    color: 'bg-purple-500',
  },
  {
    id: '2',
    name: 'Caminata Activa',
    category: 'cardio',
    duration: 45,
    intensity: 'moderate',
    calories: 200,
    benefits: ['Circulación', 'Recuperación activa', 'Vitamina D', 'Salud mental'],
    equipment: ['Ninguno'],
    instructions: [
      'Ritmo moderado 120-130 BPM',
      'Terreno plano o colinas suaves',
      'Mantén postura erguida',
      'Respiración nasal profunda',
      'Estiramiento final 5 min',
    ],
    icon: 'ðŸš¶',
    color: 'bg-primary',
  },
  {
    id: '3',
    name: 'Natación Suave',
    category: 'cardio',
    duration: 30,
    intensity: 'low',
    calories: 180,
    benefits: ['Recuperación articular', 'Cardio bajo impacto', 'Movilidad'],
    equipment: ['Piscina'],
    instructions: [
      'Calentamiento 5 min estilo libre lento',
      'Técnica de respiración bilateral',
      'Velocidad 60-70% del máximo',
      'Pausas cada 200m',
      'Enfriamiento 5 min',
    ],
    icon: 'ðŸŠ',
    color: 'bg-cyan-500',
  },
  {
    id: '4',
    name: 'Foam Rolling Completo',
    category: 'recovery',
    duration: 20,
    intensity: 'low',
    calories: 40,
    benefits: ['Liberación miofascial', 'Reduce tensión', 'Previene lesiones'],
    equipment: ['Foam roller', 'Lacrosse ball'],
    instructions: [
      'IT band 60 seg cada lado',
      'Glúteos con pelota 90 seg',
      'Espalda baja 120 seg',
      'Cuádriceps 60 seg cada lado',
      'Pantorrillas 45 seg cada lado',
    ],
    icon: '🎾',
    color: 'bg-amber-500',
  },
  {
    id: '5',
    name: 'Meditación Guiada',
    category: 'mental',
    duration: 15,
    intensity: 'low',
    calories: 20,
    benefits: ['Reduce estrés', 'Mejora sueño', 'Claridad mental', 'Recuperación neurológica'],
    equipment: ['Ninguno'],
    instructions: [
      'Posición cómoda sentado o acostado',
      'Respiración 4-7-8 durante 5 min',
      'Body scan de pies a cabeza',
      'Visualización positiva',
      'Gratitud y afirmaciones finales',
    ],
    icon: 'ðŸ§ ',
    color: 'bg-indigo-500',
  },
  {
    id: '6',
    name: 'Stretching Dinámico',
    category: 'mobility',
    duration: 25,
    intensity: 'low',
    calories: 80,
    benefits: ['ROM articular', 'Prevención lesiones', 'Movilidad funcional'],
    equipment: ['Banda elástica'],
    instructions: [
      'Círculos de brazos 20 reps',
      'Leg swings adelante-atrás 15/lado',
      'Hip circles 20 reps',
      'Cat-cow 15 reps',
      'World\'s greatest stretch 5/lado',
    ],
    icon: '🤸',
    color: 'bg-primary',
  },
  {
    id: '7',
    name: 'Ciclismo Suave',
    category: 'cardio',
    duration: 40,
    intensity: 'moderate',
    calories: 220,
    benefits: ['Recuperación piernas', 'Cardio bajo impacto', 'Circulación'],
    equipment: ['Bicicleta'],
    instructions: [
      'Resistencia baja RPM 60-80',
      'Frecuencia cardíaca Zona 2 (60-70% max)',
      'Terreno plano preferentemente',
      'Hidratación cada 15 min',
      'Estiramiento cuádriceps final',
    ],
    icon: 'ðŸš´',
    color: 'bg-primary',
  },
  {
    id: '8',
    name: 'Sauna + Contraste',
    category: 'recovery',
    duration: 30,
    intensity: 'low',
    calories: 100,
    benefits: ['Desintoxicación', 'Circulación', 'Reducción inflamación', 'HGH'],
    equipment: ['Sauna', 'Ducha fría'],
    instructions: [
      'Sauna 15 min (70-80°C)',
      'Ducha fría 2 min',
      'Repetir ciclo 2-3 veces',
      'Hidratación abundante',
      'Descanso final 10 min',
    ],
    icon: 'â™¨ï¸',
    color: 'bg-red-500',
  },
];

export default function RestDayActivities() {
  const [activities] = useState(REST_ACTIVITIES);
  const [filter, setFilter] = useState<'all' | 'mobility' | 'cardio' | 'recovery' | 'mental'>('all');

  const filters = [
    { id: 'all', label: 'Todas', icon: 'apps' },
    { id: 'mobility', label: 'Movilidad', icon: 'body' },
    { id: 'cardio', label: 'Cardio', icon: 'heart' },
    { id: 'recovery', label: 'Recuperación', icon: 'fitness' },
    { id: 'mental', label: 'Mental', icon: 'brain' },
  ];

  const filteredActivities = filter === 'all'
    ? activities
    : activities.filter((a) => a.category === filter);

  const startActivity = (activity: RestActivity) => {
    Alert.alert(
      `Iniciar: ${activity.name}`,
      `Duración: ${activity.duration} min\nQuemarás ~${activity.calories} kcal`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Comenzar',
          onPress: () => Alert.alert('Timer iniciado', `${activity.duration} minutos`),
        },
      ]
    );
  };

  const viewInstructions = (activity: RestActivity) => {
    Alert.alert(
      activity.name,
      activity.instructions.join('\n\n'),
      [{ text: 'Entendido' }]
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
            Actividades de Descanso
          </Text>
          <TouchableOpacity>
            <Ionicons name="calendar" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Filters */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row gap-2">
            {filters.map((f) => (
              <TouchableOpacity
                key={f.id}
                onPress={() => setFilter(f.id as any)}
                className={`flex-row items-center px-4 py-2 rounded-lg ${
                  filter === f.id
                    ? 'bg-primary'
                    : 'bg-zinc-900 border border-zinc-800'
                }`}
              >
                <Ionicons
                  name={f.icon as any}
                  size={18}
                  color={filter === f.id ? 'white' : '#71717A'}
                />
                <Text
                  className={`ml-2 font-semibold text-sm ${
                    filter === f.id ? 'text-white' : 'text-zinc-400'
                  }`}
                >
                  {f.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          {/* Info Card */}
          <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-6">
            <View className="flex-row items-start">
              <Ionicons name="information-circle" size={20} color="#9D12DE" />
              <View className="flex-1 ml-3">
                <Text className="text-primary/80 font-bold mb-2">
                  Recuperación Activa
                </Text>
                <Text className="text-primary/60 text-sm">
                  Los días de descanso NO son días inactivos. Movimiento suave acelera recuperación.
                </Text>
              </View>
            </View>
          </View>

          {/* Activities */}
          {filteredActivities.map((activity) => (
            <View
              key={activity.id}
              className="bg-zinc-900 rounded-xl p-4 mb-4 border border-zinc-800"
            >
              {/* Header */}
              <View className="flex-row items-start justify-between mb-3">
                <View className="flex-row items-start flex-1">
                  <View className={`w-14 h-14 ${activity.color} rounded-xl items-center justify-center mr-3`}>
                    <Text className="text-4xl">{activity.icon}</Text>
                  </View>
                  <View className="flex-1">
                    <Text className="text-white font-bold text-lg mb-1">
                      {activity.name}
                    </Text>
                    <Text className="text-zinc-400 text-sm capitalize">
                      {activity.category}
                    </Text>
                  </View>
                </View>
                <View className={`px-3 py-1 rounded-lg ${
                  activity.intensity === 'low'
                    ? 'bg-primary/10 border border-primary/30'
                    : 'bg-amber-500/10 border border-amber-500/30'
                }`}>
                  <Text className={`text-xs font-bold ${
                    activity.intensity === 'low' ? 'text-primary' : 'text-amber-400'
                  }`}>
                    {activity.intensity === 'low' ? 'BAJA' : 'MODERADA'}
                  </Text>
                </View>
              </View>

              {/* Stats */}
              <View className="flex-row gap-2 mb-3">
                <View className="flex-1 bg-zinc-800 rounded-lg p-2">
                  <View className="flex-row items-center mb-1">
                    <Ionicons name="time" size={14} color="#71717A" />
                    <Text className="text-zinc-400 text-xs ml-1">Duración</Text>
                  </View>
                  <Text className="text-white font-bold">{activity.duration} min</Text>
                </View>
                <View className="flex-1 bg-zinc-800 rounded-lg p-2">
                  <View className="flex-row items-center mb-1">
                    <Ionicons name="flame" size={14} color="#71717A" />
                    <Text className="text-zinc-400 text-xs ml-1">Calorías</Text>
                  </View>
                  <Text className="text-red-400 font-bold">{activity.calories}</Text>
                </View>
              </View>

              {/* Benefits */}
              <View className="mb-3">
                <Text className="text-zinc-400 text-xs mb-2">BENEFICIOS</Text>
                <View className="flex-row flex-wrap gap-2">
                  {activity.benefits.map((benefit, index) => (
                    <View key={index} className="bg-primary/10 rounded-lg px-2 py-1">
                      <Text className="text-primary text-xs">{benefit}</Text>
                    </View>
                  ))}
                </View>
              </View>

              {/* Equipment */}
              <View className="mb-3">
                <Text className="text-zinc-400 text-xs mb-2">EQUIPO NECESARIO</Text>
                <View className="flex-row flex-wrap gap-2">
                  {activity.equipment.map((item, index) => (
                    <View key={index} className="bg-zinc-800 rounded-lg px-2 py-1">
                      <Text className="text-zinc-400 text-xs">{item}</Text>
                    </View>
                  ))}
                </View>
              </View>

              {/* Instructions Preview */}
              <View className="bg-zinc-800 rounded-lg p-3 mb-3">
                <Text className="text-zinc-400 text-xs mb-2">GUÃA RÃPIDA</Text>
                {activity.instructions.slice(0, 3).map((instruction, index) => (
                  <View key={index} className="flex-row items-start mb-1 last:mb-0">
                    <Text className="text-primary mr-2">•</Text>
                    <Text className="text-zinc-300 text-sm flex-1">{instruction}</Text>
                  </View>
                ))}
                {activity.instructions.length > 3 && (
                  <TouchableOpacity
                    onPress={() => viewInstructions(activity)}
                    className="mt-2"
                  >
                    <Text className="text-primary/80 text-sm">
                      Ver {activity.instructions.length - 3} pasos más â†’
                    </Text>
                  </TouchableOpacity>
                )}
              </View>

              {/* Actions */}
              <View className="flex-row gap-2">
                <TouchableOpacity
                  onPress={() => startActivity(activity)}
                  className="flex-1 bg-primary rounded-lg p-3 flex-row items-center justify-center"
                >
                  <Ionicons name="play" size={18} color="white" />
                  <Text className="text-white font-bold ml-2">Comenzar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => viewInstructions(activity)}
                  className="flex-1 bg-primary/10 rounded-lg p-3 border border-primary/30 flex-row items-center justify-center"
                >
                  <Ionicons name="list" size={18} color="#9D12DE" />
                  <Text className="text-primary/80 font-bold ml-2">Detalles</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {/* Bottom Tip */}
        <View className="px-6 pb-6 pt-2">
          <View className="bg-primary/10 rounded-xl p-4 border border-primary/30">
            <View className="flex-row items-start">
              <Ionicons name="checkmark-circle" size={20} color="#9D12DE" />
              <View className="flex-1 ml-3">
                <Text className="text-primary font-bold mb-2">
                  Descanso Inteligente
                </Text>
                <Text className="text-primary/80 text-sm">
                  1-2 actividades de baja intensidad en días de descanso optimizan recuperación sin interferir con crecimiento muscular.
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}


