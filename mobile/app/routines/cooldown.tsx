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

interface CooldownRoutine {
  id: string;
  name: string;
  duration: number;
  focus: string;
  type: 'full-body' | 'upper' | 'lower' | 'active-recovery';
  stretches: {
    name: string;
    duration: string;
    target: string;
    instructions: string;
    tips: string;
  }[];
  benefits: string[];
  icon: string;
}

const COOLDOWN_ROUTINES: CooldownRoutine[] = [
  {
    id: '1',
    name: 'Cooldown Completo (15 min)',
    duration: 15,
    focus: 'Estiramientos de cuerpo completo',
    type: 'full-body',
    stretches: [
      {
        name: 'Child\'s Pose',
        duration: '2 min',
        target: 'Espalda baja, hombros, caderas',
        instructions: 'Rodillas al suelo, sentarse sobre talones, brazos extendidos adelante. Respirar profundo.',
        tips: 'Relaja completamente, deja caer cabeza',
      },
      {
        name: 'Cat-Cow Stretch',
        duration: '2 min',
        target: 'Columna vertebral, core',
        instructions: 'En cuatro patas, alternar entre arquear espalda (vaca) y redondear (gato). 10 repeticiones lentas.',
        tips: 'Sincroniza con respiraciÛn: inhala vaca, exhala gato',
      },
      {
        name: 'Pigeon Pose',
        duration: '2 min',
        target: 'Flexores cadera, gl˙teos',
        instructions: 'Pierna doblada adelante, otra extendida atr·s. Inclinarse hacia adelante. 1 min por lado.',
        tips: 'Si duele mucho, coloca almohada bajo cadera',
      },
      {
        name: 'Seated Hamstring Stretch',
        duration: '2 min',
        target: 'Isquiotibiales',
        instructions: 'Sentado, una pierna extendida, alcanzar dedos del pie. 1 min por lado.',
        tips: 'MantÈn espalda recta, no redondees',
      },
      {
        name: 'Quad Stretch',
        duration: '2 min',
        target: 'Cu·driceps',
        instructions: 'De pie, llevar talÛn a gl˙teo, mantener rodillas juntas. 1 min por lado.',
        tips: 'ApÛyate en pared si pierdes balance',
      },
      {
        name: 'Shoulder Stretch',
        duration: '2 min',
        target: 'Hombros, pecho',
        instructions: 'Brazo cruzado al pecho, presionar con otro brazo. 1 min por lado.',
        tips: 'MantÈn hombros relajados',
      },
      {
        name: 'Tricep Stretch',
        duration: '2 min',
        target: 'TrÌceps',
        instructions: 'Brazo sobre cabeza, codo doblado atr·s, presionar con otra mano. 1 min por lado.',
        tips: 'No arquees espalda baja',
      },
      {
        name: 'Lying Spinal Twist',
        duration: '1 min',
        target: 'Columna, oblicuos',
        instructions: 'Acostado boca arriba, rodilla cruzada al lado opuesto. 30 seg por lado.',
        tips: 'Hombros pegados al suelo',
      },
    ],
    benefits: ['Reduce dolor muscular', 'Mejora flexibilidad', 'Acelera recuperaciÛn', 'Calma sistema nervioso'],
    icon: '??‚Äç‚ôÇÔ∏è',
  },
  {
    id: '2',
    name: 'Cooldown Tren Superior',
    duration: 10,
    focus: 'Post-entrenamiento de empuje/tirÛn',
    type: 'upper',
    stretches: [
      {
        name: 'Doorway Pec Stretch',
        duration: '2 min',
        target: 'Pectorales',
        instructions: 'Brazo en marco de puerta, rotar cuerpo opuesto. Probar ·ngulos diferentes. 1 min por lado.',
        tips: 'VariaciÛn: alto/medio/bajo para diferentes fibras',
      },
      {
        name: 'Lat Stretch',
        duration: '2 min',
        target: 'Dorsales',
        instructions: 'Agarrar poste, inclinarse hacia atr·s manteniendo brazos rectos. 1 min por lado.',
        tips: 'Siente estiramiento en costado',
      },
      {
        name: 'Behind Back Shoulder Stretch',
        duration: '2 min',
        target: 'Hombros anteriores',
        instructions: 'Manos entrelazadas detr·s espalda baja, elevar brazos suavemente.',
        tips: 'Pecho hacia afuera, esc·pulas juntas',
      },
      {
        name: 'Overhead Tricep Stretch',
        duration: '1 min',
        target: 'TrÌceps',
        instructions: 'Codo doblado atr·s de cabeza, presionar con mano opuesta. 30 seg/lado.',
        tips: 'Core activado para proteger lumbar',
      },
      {
        name: 'Forearm Extensor Stretch',
        duration: '1 min',
        target: 'Antebrazos',
        instructions: 'Brazo extendido, palma hacia abajo, tirar dedos con otra mano. 30 seg/lado.',
        tips: 'Importante si entrenaste bÌceps/espalda',
      },
      {
        name: 'Neck Stretches',
        duration: '2 min',
        target: 'Trapecio, cuello',
        instructions: 'Inclinar cabeza a lado, presionar suavemente. Todas direcciones.',
        tips: 'Muy suave, nunca rotar r·pido',
      },
    ],
    benefits: ['Previene rigidez hombros', 'Reduce tensiÛn cuello', 'Mejora postura', 'Libera trapecio'],
    icon: 'üí™',
  },
  {
    id: '3',
    name: 'Cooldown Tren Inferior',
    duration: 12,
    focus: 'Post-entrenamiento de piernas',
    type: 'lower',
    stretches: [
      {
        name: 'Standing Quad Stretch',
        duration: '2 min',
        target: 'Cu·driceps',
        instructions: 'De pie, talÛn a gl˙teo, rodillas juntas. 1 min/lado.',
        tips: 'Squeeze gl˙teos para mayor estiramiento',
      },
      {
        name: 'Seated Hamstring Stretch',
        duration: '2 min',
        target: 'Isquiotibiales',
        instructions: 'Sentado con pierna extendida, alcanzar pie. Espalda recta. 1 min/lado.',
        tips: 'Si no llegas, usa toalla/banda',
      },
      {
        name: '90/90 Hip Stretch',
        duration: '3 min',
        target: 'Rotadores cadera',
        instructions: 'Sentado con piernas en 90∞, cambiar de lado. Inclinarse adelante. 1.5 min/lado.',
        tips: 'Estiramiento m·s importante para squatters',
      },
      {
        name: 'Pigeon Pose',
        duration: '2 min',
        target: 'Gl˙teos, flexores cadera',
        instructions: 'Rodilla doblada adelante, pierna atr·s extendida. 1 min/lado.',
        tips: 'Respira profundo, relaja en la incomodidad',
      },
      {
        name: 'Calf Stretch',
        duration: '2 min',
        target: 'Gemelos, sÛleo',
        instructions: 'Contra pared, pierna atr·s recta (gemelo), luego doblada (sÛleo). 30 seg ◊ 2/lado.',
        tips: 'TalÛn pegado al suelo siempre',
      },
      {
        name: 'Butterfly Stretch',
        duration: '1 min',
        target: 'Aductores',
        instructions: 'Sentado, plantas de pies juntas, presionar rodillas hacia abajo suavemente.',
        tips: 'Espalda recta, no redondees',
      },
    ],
    benefits: ['Previene DOMS intenso', 'Mantiene movilidad cadera', 'Reduce tensiÛn lumbar', 'Acelera recuperaciÛn'],
    icon: '??',
  },
  {
    id: '4',
    name: 'Active Recovery (10 min)',
    duration: 10,
    focus: 'Movimiento ligero + estiramientos',
    type: 'active-recovery',
    stretches: [
      {
        name: 'Light Walk',
        duration: '3 min',
        target: 'CirculaciÛn general',
        instructions: 'Caminar a paso muy ligero, brazos relajados.',
        tips: 'Bajar frecuencia cardÌaca gradualmente',
      },
      {
        name: 'Arm Circles',
        duration: '1 min',
        target: 'Hombros',
        instructions: 'CÌrculos grandes con brazos, 30 seg cada direcciÛn.',
        tips: 'Movimientos controlados y suaves',
      },
      {
        name: 'Leg Swings',
        duration: '2 min',
        target: 'Caderas',
        instructions: 'Balancear pierna adelante-atr·s y lateral. 30 seg ◊ 2/lado.',
        tips: 'MantÈn core tenso para estabilidad',
      },
      {
        name: 'World\'s Greatest Stretch',
        duration: '2 min',
        target: 'Todo el cuerpo',
        instructions: 'PosiciÛn de lunge, rotar hacia pierna adelantada, alcanzar cielo. 1 min/lado.',
        tips: 'Movimiento din·mico, no static hold',
      },
      {
        name: 'Deep Breathing',
        duration: '2 min',
        target: 'Sistema nervioso',
        instructions: 'Acostado o sentado, 4 seg inhala (nariz), 6 seg exhala (boca). 10 repeticiones.',
        tips: 'Activa parasimp·tico, acelera recuperaciÛn',
      },
    ],
    benefits: ['Reduce lactato', 'Mejora circulaciÛn', 'Previene mareos post-workout', 'Calma SNC'],
    icon: 'üö∂',
  },
  {
    id: '5',
    name: 'Foam Rolling (8 min)',
    duration: 8,
    focus: 'LiberaciÛn miofascial',
    type: 'active-recovery',
    stretches: [
      {
        name: 'IT Band Roll',
        duration: '2 min',
        target: 'Banda iliotibial',
        instructions: 'De lado sobre foam roller, rodar desde cadera a rodilla. 1 min/lado.',
        tips: 'Doloroso pero efectivo, pausa en puntos tensos',
      },
      {
        name: 'Quad Roll',
        duration: '2 min',
        target: 'Cu·driceps',
        instructions: 'Boca abajo, roller bajo muslos, rodar lentamente. 1 min/lado.',
        tips: 'Busca nudos, mantÈn 20-30 seg',
      },
      {
        name: 'Upper Back Roll',
        duration: '2 min',
        target: 'Dorsales, trapecios',
        instructions: 'Boca arriba, roller entre esc·pulas, brazos cruzados pecho.',
        tips: 'No rodar cuello ni lumbar directamente',
      },
      {
        name: 'Glute Roll',
        duration: '1 min',
        target: 'Gl˙teos',
        instructions: 'Sentado en roller, inclinar hacia lado, rodar gl˙teo. 30 seg/lado.',
        tips: 'Muy doloroso en TFL/piriforme',
      },
      {
        name: 'Calf Roll',
        duration: '1 min',
        target: 'Gemelos',
        instructions: 'Piernas sobre roller, elevar cadera, rodar. 30 seg/lado.',
        tips: 'Rotar pierna para cubrir toda ·rea',
      },
    ],
    benefits: ['Reduce adherencias fasciales', 'Mejora movilidad', 'Acelera recuperaciÛn', 'Reduce DOMS'],
    icon: '??',
  },
];

export default function CooldownRoutines() {
  const [routines] = useState(COOLDOWN_ROUTINES);
  const [filter, setFilter] = useState<'all' | 'full-body' | 'upper' | 'lower' | 'active-recovery'>('all');
  const [selectedRoutine, setSelectedRoutine] = useState<CooldownRoutine | null>(null);
  const [currentStretch, setCurrentStretch] = useState(0);

  const filters = [
    { id: 'all', label: 'Todas', icon: 'apps' },
    { id: 'full-body', label: 'Completo', icon: 'body' },
    { id: 'upper', label: 'Tren Superior', icon: 'hand-left' },
    { id: 'lower', label: 'Tren Inferior', icon: 'walk' },
    { id: 'active-recovery', label: 'Recovery', icon: 'refresh' },
  ];

  const filteredRoutines = filter === 'all'
    ? routines
    : routines.filter((r) => r.type === filter);

  const startRoutine = (routine: CooldownRoutine) => {
    setSelectedRoutine(routine);
    setCurrentStretch(0);
  };

  const nextStretch = () => {
    if (selectedRoutine && currentStretch < selectedRoutine.stretches.length - 1) {
      setCurrentStretch(currentStretch + 1);
    } else {
      Alert.alert(
        'Cooldown Completado! ??',
        'Excelente trabajo. Recuerda hidratarte y descansar bien.',
        [
          { text: 'Cerrar', onPress: () => { setSelectedRoutine(null); setCurrentStretch(0); } },
        ]
      );
    }
  };

  const previousStretch = () => {
    if (currentStretch > 0) {
      setCurrentStretch(currentStretch - 1);
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
            Cool Down
          </Text>
          <TouchableOpacity>
            <Ionicons name="timer" size={24} color="white" />
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
          {!selectedRoutine ? (
            <>
              {/* Info Card */}
              <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-6">
                <View className="flex-row items-start">
                  <Ionicons name="information-circle" size={20} color="#9D12DE" />
                  <View className="flex-1 ml-3">
                    <Text className="text-primary/80 font-bold mb-2">
                      Por QuÈ Cool Down Es Importante
                    </Text>
                    <Text className="text-primary/60 text-sm">
                      Reducir frecuencia cardÌaca gradualmente, eliminar lactato, prevenir DOMS y mejorar flexibilidad cuando m˙sculos est·n calientes.
                    </Text>
                  </View>
                </View>
              </View>

              {/* Routines List */}
              {filteredRoutines.map((routine) => (
                <TouchableOpacity
                  key={routine.id}
                  onPress={() => startRoutine(routine)}
                  className="bg-zinc-900 rounded-xl p-4 mb-4 border border-zinc-800"
                  activeOpacity={0.7}
                >
                  <View className="flex-row items-start justify-between mb-3">
                    <View className="flex-row items-start flex-1">
                      <View className="w-14 h-14 bg-primary rounded-xl items-center justify-center mr-3">
                        <Text className="text-3xl">{routine.icon}</Text>
                      </View>
                      <View className="flex-1">
                        <Text className="text-white font-bold text-lg mb-1">
                          {routine.name}
                        </Text>
                        <Text className="text-zinc-400 text-sm">{routine.focus}</Text>
                      </View>
                    </View>
                    <View className="bg-primary/10 rounded-lg px-3 py-1 border border-primary/30">
                      <Text className="text-primary/80 text-xs font-bold">{routine.duration} MIN</Text>
                    </View>
                  </View>

                  {/* Stretches Preview */}
                  <View className="mb-3">
                    <Text className="text-zinc-400 text-xs mb-2">ESTIRAMIENTOS ({routine.stretches.length})</Text>
                    {routine.stretches.slice(0, 3).map((stretch, index) => (
                      <View key={index} className="flex-row items-center mb-1">
                        <View className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
                        <Text className="text-zinc-300 text-sm flex-1">{stretch.name}</Text>
                        <Text className="text-zinc-500 text-xs">{stretch.duration}</Text>
                      </View>
                    ))}
                    {routine.stretches.length > 3 && (
                      <Text className="text-primary/80 text-sm ml-3.5">
                        +{routine.stretches.length - 3} m·s
                      </Text>
                    )}
                  </View>

                  {/* Benefits */}
                  <View className="flex-row flex-wrap gap-2">
                    {routine.benefits.slice(0, 2).map((benefit, index) => (
                      <View key={index} className="bg-primary/10 rounded px-2 py-1">
                        <Text className="text-primary/80 text-xs">{benefit}</Text>
                      </View>
                    ))}
                  </View>
                </TouchableOpacity>
              ))}
            </>
          ) : (
            <>
              {/* Progress Bar */}
              <View className="bg-zinc-900 rounded-xl p-4 mb-4 border border-zinc-800">
                <View className="flex-row items-center justify-between mb-2">
                  <Text className="text-zinc-400 text-sm">Progreso</Text>
                  <Text className="text-white font-bold">
                    {currentStretch + 1}/{selectedRoutine.stretches.length}
                  </Text>
                </View>
                <View className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                  <View
                    className="h-full bg-primary rounded-full"
                    style={{
                      width: `${((currentStretch + 1) / selectedRoutine.stretches.length) * 100}%`,
                    }}
                  />
                </View>
              </View>

              {/* Current Stretch */}
              <View className="bg-zinc-900 rounded-xl p-6 mb-6 border border-zinc-800">
                <View className="mb-4">
                  <View className="flex-row items-center justify-between mb-2">
                    <View className="bg-primary rounded-lg px-3 py-1">
                      <Text className="text-white font-bold text-sm">
                        {selectedRoutine.stretches[currentStretch].duration}
                      </Text>
                    </View>
                    <Text className="text-zinc-500 text-sm">
                      Estiramiento {currentStretch + 1}
                    </Text>
                  </View>
                  <Text className="text-white font-bold text-2xl mb-2">
                    {selectedRoutine.stretches[currentStretch].name}
                  </Text>
                  <Text className="text-primary/80 font-semibold">
                    {selectedRoutine.stretches[currentStretch].target}
                  </Text>
                </View>

                <View className="bg-zinc-800 rounded-lg p-4 mb-4">
                  <Text className="text-zinc-400 text-xs mb-2">INSTRUCCIONES</Text>
                  <Text className="text-white mb-3">
                    {selectedRoutine.stretches[currentStretch].instructions}
                  </Text>
                  <View className="bg-primary/10 rounded-lg p-3 border border-primary/30">
                    <View className="flex-row items-start">
                      <Ionicons name="bulb" size={16} color="#9D12DE" />
                      <Text className="text-primary/60 text-sm ml-2 flex-1">
                        {selectedRoutine.stretches[currentStretch].tips}
                      </Text>
                    </View>
                  </View>
                </View>

                {/* Navigation */}
                <View className="flex-row gap-2">
                  <TouchableOpacity
                    onPress={previousStretch}
                    disabled={currentStretch === 0}
                    className={`flex-1 rounded-xl p-4 flex-row items-center justify-center ${
                      currentStretch === 0 ? 'bg-zinc-800 opacity-50' : 'bg-zinc-800'
                    }`}
                  >
                    <Ionicons name="chevron-back" size={20} color="white" />
                    <Text className="text-white font-bold ml-2">Anterior</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={nextStretch}
                    className="flex-1 bg-primary rounded-xl p-4 flex-row items-center justify-center"
                  >
                    <Text className="text-white font-bold mr-2">
                      {currentStretch === selectedRoutine.stretches.length - 1 ? 'Finalizar' : 'Siguiente'}
                    </Text>
                    <Ionicons
                      name={currentStretch === selectedRoutine.stretches.length - 1 ? 'checkmark-circle' : 'chevron-forward'}
                      size={20}
                      color="white"
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {/* All Stretches Overview */}
              <View className="bg-zinc-900 rounded-xl p-4 mb-6 border border-zinc-800">
                <Text className="text-white font-bold mb-3">Resumen de Rutina</Text>
                {selectedRoutine.stretches.map((stretch, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => setCurrentStretch(index)}
                    className={`flex-row items-center p-3 rounded-lg mb-2 ${
                      index === currentStretch ? 'bg-primary' : index < currentStretch ? 'bg-primary/20' : 'bg-zinc-800'
                    }`}
                  >
                    <View className={`w-8 h-8 rounded-full items-center justify-center mr-3 ${
                      index === currentStretch ? 'bg-white' : index < currentStretch ? 'bg-primary' : 'bg-zinc-700'
                    }`}>
                      {index < currentStretch ? (
                        <Ionicons name="checkmark" size={18} color="white" />
                      ) : (
                        <Text className={`font-bold ${index === currentStretch ? 'text-primary' : 'text-zinc-400'}`}>
                          {index + 1}
                        </Text>
                      )}
                    </View>
                    <View className="flex-1">
                      <Text className={`font-semibold ${index === currentStretch ? 'text-white' : index < currentStretch ? 'text-primary' : 'text-zinc-400'}`}>
                        {stretch.name}
                      </Text>
                      <Text className={`text-xs ${index === currentStretch ? 'text-primary/40' : 'text-zinc-500'}`}>
                        {stretch.target}
                      </Text>
                    </View>
                    <Text className={`text-xs ${index === currentStretch ? 'text-white' : 'text-zinc-500'}`}>
                      {stretch.duration}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Exit Button */}
              <TouchableOpacity
                onPress={() => { setSelectedRoutine(null); setCurrentStretch(0); }}
                className="bg-zinc-900 rounded-xl p-4 flex-row items-center justify-center border border-zinc-800 mb-6"
              >
                <Ionicons name="close-circle" size={20} color="white" />
                <Text className="text-white font-bold ml-2">Salir de Rutina</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

