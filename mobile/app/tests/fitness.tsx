import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  TextInput,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface FitnessTest {
  id: string;
  name: string;
  category: 'strength' | 'endurance' | 'power' | 'flexibility';
  description: string;
  instructions: string[];
  equipment: string[];
  standards: {
    male: { excellent: string; good: string; average: string; poor: string };
    female: { excellent: string; good: string; average: string; poor: string };
  };
  icon: string;
  color: string;
}

const FITNESS_TESTS: FitnessTest[] = [
  {
    id: '1',
    name: 'Push-ups MÃ¡ximos',
    category: 'endurance',
    description: 'CuÃ¡ntos push-ups puedes hacer sin parar',
    instructions: [
      'PosiciÃ³n de plancha, manos alineadas con hombros',
      'Descender hasta pecho casi toca suelo',
      'Empujar hasta brazos extendidos',
      'Contar repeticiones hasta fallo tÃ©cnico',
      'Mantener core tenso todo el tiempo',
    ],
    equipment: ['Ninguno'],
    standards: {
      male: { excellent: '50+', good: '35-49', average: '20-34', poor: '<20' },
      female: { excellent: '35+', good: '20-34', average: '10-19', poor: '<10' },
    },
    icon: 'ðŸ’ª',
    color: 'emerald',
  },
  {
    id: '2',
    name: 'Pull-ups MÃ¡ximas',
    category: 'strength',
    description: 'Dominadas estrictas sin kipping',
    instructions: [
      'Colgarse de barra con agarre prono',
      'Pull completo hasta barbilla sobre barra',
      'Descender hasta brazos completamente extendidos',
      'Sin balanceo ni kipping',
      'Contar hasta fallo',
    ],
    equipment: ['Barra fija'],
    standards: {
      male: { excellent: '15+', good: '10-14', average: '5-9', poor: '<5' },
      female: { excellent: '8+', good: '4-7', average: '1-3', poor: '0' },
    },
    icon: 'ðŸ‹ï¸',
    color: 'blue',
  },
  {
    id: '3',
    name: 'Plank Hold MÃ¡ximo',
    category: 'endurance',
    description: 'Tiempo mÃ¡ximo en plancha frontal',
    instructions: [
      'PosiciÃ³n de plancha con antebrazos',
      'Cuerpo completamente recto (hombros-cadera-tobillos)',
      'Core activado, glÃºteos apretados',
      'Cronometrar hasta fallo de forma',
      'Si cadera cae mÃ¡s de 5cm = fin',
    ],
    equipment: ['CronÃ³metro'],
    standards: {
      male: { excellent: '3:00+', good: '2:00-2:59', average: '1:00-1:59', poor: '<1:00' },
      female: { excellent: '2:30+', good: '1:30-2:29', average: '0:45-1:29', poor: '<0:45' },
    },
    icon: 'â±ï¸',
    color: 'amber',
  },
  {
    id: '4',
    name: 'Cooper Test (12 min)',
    category: 'endurance',
    description: 'Distancia mÃ¡xima corriendo en 12 minutos',
    instructions: [
      'Calentar 10 minutos antes',
      'Correr/caminar mÃ¡xima distancia en 12 min',
      'Mantener pace sostenible',
      'Usar pista o GPS para medir distancia',
      'Anotar metros totales',
    ],
    equipment: ['CronÃ³metro', 'GPS/Pista'],
    standards: {
      male: { excellent: '2800m+', good: '2400-2799m', average: '2000-2399m', poor: '<2000m' },
      female: { excellent: '2500m+', good: '2100-2499m', average: '1800-2099m', poor: '<1800m' },
    },
    icon: 'ðŸƒ',
    color: 'red',
  },
  {
    id: '5',
    name: 'Vertical Jump',
    category: 'power',
    description: 'Salto vertical mÃ¡ximo',
    instructions: [
      'Marcar altura de pie con brazo extendido',
      'Saltar verticalmente con impulso de brazos',
      'Tocar punto mÃ¡s alto posible',
      'Medir diferencia entre marcas',
      'Mejor de 3 intentos',
    ],
    equipment: ['Pared marcada', 'Tiza'],
    standards: {
      male: { excellent: '60cm+', good: '50-59cm', average: '40-49cm', poor: '<40cm' },
      female: { excellent: '50cm+', good: '40-49cm', average: '30-39cm', poor: '<30cm' },
    },
    icon: 'â¬†ï¸',
    color: 'purple',
  },
  {
    id: '6',
    name: 'Sit and Reach',
    category: 'flexibility',
    description: 'Flexibilidad de isquiotibiales y espalda baja',
    instructions: [
      'Sentarse con piernas extendidas',
      'Pies contra caja/pared',
      'Alcanzar hacia adelante sin doblar rodillas',
      'Mantener 2 segundos en mÃ¡ximo alcance',
      'Medir distancia pasando dedos de pies',
    ],
    equipment: ['Caja de mediciÃ³n o regla'],
    standards: {
      male: { excellent: '+10cm', good: '0-9cm', average: '-10-(-1)cm', poor: '<-10cm' },
      female: { excellent: '+15cm', good: '+5-14cm', average: '-5-4cm', poor: '<-5cm' },
    },
    icon: 'ðŸ§˜',
    color: 'indigo',
  },
  {
    id: '7',
    name: 'Beep Test (Shuttle Run)',
    category: 'endurance',
    description: 'Test progresivo de resistencia cardiovascular',
    instructions: [
      'Correr 20m ida y vuelta',
      'Seguir ritmo de beeps (aumenta cada nivel)',
      'Llegar antes del siguiente beep',
      'Continuar hasta no poder mantener ritmo',
      'Anotar nivel + shuttle alcanzado',
    ],
    equipment: ['Audio beep test', 'Espacio 20m'],
    standards: {
      male: { excellent: 'Nivel 13+', good: 'Nivel 10-12', average: 'Nivel 7-9', poor: '<Nivel 7' },
      female: { excellent: 'Nivel 11+', good: 'Nivel 8-10', average: 'Nivel 5-7', poor: '<Nivel 5' },
    },
    icon: 'ðŸ”Š',
    color: 'cyan',
  },
  {
    id: '8',
    name: '1RM Squat / Bodyweight',
    category: 'strength',
    description: 'Sentadilla 1RM como ratio de peso corporal',
    instructions: [
      'Calentar progresivamente',
      'Encontrar 1RM de sentadilla',
      'Dividir 1RM entre peso corporal',
      'Profundidad al menos paralelo',
      'Con tÃ©cnica perfecta',
    ],
    equipment: ['Barra', 'Rack', 'Discos'],
    standards: {
      male: { excellent: '2.0x+', good: '1.5-1.9x', average: '1.0-1.4x', poor: '<1.0x' },
      female: { excellent: '1.5x+', good: '1.0-1.4x', average: '0.7-0.9x', poor: '<0.7x' },
    },
    icon: 'ðŸ‹ï¸',
    color: 'emerald',
  },
];

export default function FitnessTests() {
  const [tests] = useState(FITNESS_TESTS);
  const [filter, setFilter] = useState<'all' | 'strength' | 'endurance' | 'power' | 'flexibility'>('all');
  const [selectedTest, setSelectedTest] = useState<FitnessTest | null>(null);
  const [result, setResult] = useState('');
  const [gender, setGender] = useState<'male' | 'female'>('male');

  const categories = [
    { id: 'all', label: 'Todos', icon: 'apps' },
    { id: 'strength', label: 'Fuerza', icon: 'barbell' },
    { id: 'endurance', label: 'Resistencia', icon: 'fitness' },
    { id: 'power', label: 'Potencia', icon: 'flash' },
    { id: 'flexibility', label: 'Flexibilidad', icon: 'body' },
  ];

  const filteredTests = filter === 'all'
    ? tests
    : tests.filter((t) => t.category === filter);

  const startTest = (test: FitnessTest) => {
    setSelectedTest(test);
    setResult('');
  };

  const saveResult = () => {
    if (!result.trim()) {
      Alert.alert('Error', 'Ingresa tu resultado');
      return;
    }

    Alert.alert(
      'Resultado Guardado',
      `${selectedTest?.name}\nResultado: ${result}\n\nSe ha guardado en tu historial de tests.`,
      [
        { text: 'Ver Historial' },
        { text: 'Cerrar', onPress: () => { setSelectedTest(null); setResult(''); } },
      ]
    );
  };

  const getEvaluation = (test: FitnessTest, value: string) => {
    const standards = test.standards[gender];
    // This is simplified - in real app would parse and compare properly
    return 'good'; // Placeholder
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
            Tests de Fitness
          </Text>
          <TouchableOpacity>
            <Ionicons name="stats-chart" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Filters */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row gap-2">
            {categories.map((c) => (
              <TouchableOpacity
                key={c.id}
                onPress={() => setFilter(c.id as any)}
                className={`flex-row items-center px-4 py-2 rounded-lg ${
                  filter === c.id
                    ? 'bg-primary'
                    : 'bg-zinc-900 border border-zinc-800'
                }`}
              >
                <Ionicons
                  name={c.icon as any}
                  size={18}
                  color={filter === c.id ? 'white' : '#71717A'}
                />
                <Text
                  className={`ml-2 font-semibold text-sm ${
                    filter === c.id ? 'text-white' : 'text-zinc-400'
                  }`}
                >
                  {c.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          {!selectedTest ? (
            <>
              {/* Info Card */}
              <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-6">
                <View className="flex-row items-start">
                  <Ionicons name="information-circle" size={20} color="#9D12DE" />
                  <View className="flex-1 ml-3">
                    <Text className="text-primary/80 font-bold mb-2">
                      Mide Tu Progreso
                    </Text>
                    <Text className="text-primary/60 text-sm">
                      Realiza estos tests cada 4-8 semanas para trackear mejoras en fuerza, resistencia, potencia y flexibilidad.
                    </Text>
                  </View>
                </View>
              </View>

              {/* Tests List */}
              {filteredTests.map((test) => (
                <TouchableOpacity
                  key={test.id}
                  onPress={() => startTest(test)}
                  className="bg-zinc-900 rounded-xl p-4 mb-4 border border-zinc-800"
                  activeOpacity={0.7}
                >
                  <View className="flex-row items-start justify-between mb-3">
                    <View className="flex-row items-start flex-1">
                      <View className={`w-14 h-14 bg-${test.color}-500 rounded-xl items-center justify-center mr-3`}>
                        <Text className="text-3xl">{test.icon}</Text>
                      </View>
                      <View className="flex-1">
                        <Text className="text-white font-bold text-lg mb-1">
                          {test.name}
                        </Text>
                        <Text className="text-zinc-400 text-sm">{test.description}</Text>
                      </View>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color="#71717A" />
                  </View>

                  {/* Equipment */}
                  <View className="flex-row flex-wrap gap-2 mb-3">
                    {test.equipment.map((eq, index) => (
                      <View key={index} className="bg-zinc-800 rounded px-2 py-1">
                        <Text className="text-zinc-400 text-xs">{eq}</Text>
                      </View>
                    ))}
                  </View>

                  {/* Standards Preview */}
                  <View className="bg-zinc-800 rounded-lg p-2">
                    <Text className="text-zinc-400 text-xs mb-1">ESTÃNDARES (HOMBRE)</Text>
                    <View className="flex-row justify-between">
                      <View className="items-center">
                        <Text className="text-primary text-xs font-bold">Excelente</Text>
                        <Text className="text-white text-sm">{test.standards.male.excellent}</Text>
                      </View>
                      <View className="items-center">
                        <Text className="text-primary/80 text-xs font-bold">Bueno</Text>
                        <Text className="text-white text-sm">{test.standards.male.good}</Text>
                      </View>
                      <View className="items-center">
                        <Text className="text-amber-400 text-xs font-bold">Promedio</Text>
                        <Text className="text-white text-sm">{test.standards.male.average}</Text>
                      </View>
                      <View className="items-center">
                        <Text className="text-red-400 text-xs font-bold">Bajo</Text>
                        <Text className="text-white text-sm">{test.standards.male.poor}</Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </>
          ) : (
            <>
              {/* Test Detail View */}
              <View className="bg-zinc-900 rounded-xl p-6 mb-6 border border-zinc-800">
                <View className="flex-row items-center mb-4">
                  <View className={`w-16 h-16 bg-${selectedTest.color}-500 rounded-xl items-center justify-center mr-4`}>
                    <Text className="text-4xl">{selectedTest.icon}</Text>
                  </View>
                  <View className="flex-1">
                    <Text className="text-white font-bold text-xl mb-1">
                      {selectedTest.name}
                    </Text>
                    <Text className="text-zinc-400">{selectedTest.description}</Text>
                  </View>
                </View>

                {/* Gender Selection */}
                <View className="mb-4">
                  <Text className="text-zinc-400 text-sm mb-2">Sexo (para estÃ¡ndares)</Text>
                  <View className="flex-row gap-2">
                    <TouchableOpacity
                      onPress={() => setGender('male')}
                      className={`flex-1 rounded-lg p-3 ${
                        gender === 'male' ? 'bg-primary' : 'bg-zinc-800'
                      }`}
                    >
                      <Text className={`text-center font-bold ${
                        gender === 'male' ? 'text-white' : 'text-zinc-400'
                      }`}>
                        Hombre
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => setGender('female')}
                      className={`flex-1 rounded-lg p-3 ${
                        gender === 'female' ? 'bg-pink-500' : 'bg-zinc-800'
                      }`}
                    >
                      <Text className={`text-center font-bold ${
                        gender === 'female' ? 'text-white' : 'text-zinc-400'
                      }`}>
                        Mujer
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Instructions */}
                <View className="mb-4">
                  <Text className="text-white font-bold mb-3">Instrucciones</Text>
                  {selectedTest.instructions.map((instruction, index) => (
                    <View key={index} className="flex-row items-start mb-2">
                      <View className="w-6 h-6 bg-primary rounded-full items-center justify-center mr-2 mt-0.5">
                        <Text className="text-white text-xs font-bold">{index + 1}</Text>
                      </View>
                      <Text className="text-zinc-300 text-sm flex-1">{instruction}</Text>
                    </View>
                  ))}
                </View>

                {/* Standards Table */}
                <View className="mb-4">
                  <Text className="text-white font-bold mb-3">EstÃ¡ndares de EvaluaciÃ³n</Text>
                  <View className="bg-zinc-800 rounded-lg overflow-hidden">
                    {['excellent', 'good', 'average', 'poor'].map((level, index) => {
                      const colors = {
                        excellent: 'emerald',
                        good: 'blue',
                        average: 'amber',
                        poor: 'red',
                      };
                      const labels = {
                        excellent: 'Excelente',
                        good: 'Bueno',
                        average: 'Promedio',
                        poor: 'Bajo',
                      };
                      const color = colors[level as keyof typeof colors];
                      const label = labels[level as keyof typeof labels];
                      const value = selectedTest.standards[gender][level as keyof typeof selectedTest.standards.male];

                      return (
                        <View
                          key={level}
                          className={`flex-row items-center justify-between p-3 ${
                            index < 3 ? 'border-b border-zinc-700' : ''
                          }`}
                        >
                          <Text className={`text-${color}-400 font-bold`}>{label}</Text>
                          <Text className="text-white font-bold">{value}</Text>
                        </View>
                      );
                    })}
                  </View>
                </View>

                {/* Result Input */}
                <View className="mb-4">
                  <Text className="text-white font-bold mb-2">Tu Resultado</Text>
                  <TextInput
                    className="bg-zinc-800 rounded-xl px-4 py-4 text-white text-2xl font-bold text-center"
                    placeholder="Ingresa resultado..."
                    placeholderTextColor="#71717A"
                    value={result}
                    onChangeText={setResult}
                    keyboardType="default"
                  />
                </View>

                {/* Actions */}
                <View className="flex-row gap-2">
                  <TouchableOpacity
                    onPress={() => { setSelectedTest(null); setResult(''); }}
                    className="flex-1 bg-zinc-800 rounded-xl p-4 flex-row items-center justify-center"
                  >
                    <Ionicons name="arrow-back" size={20} color="white" />
                    <Text className="text-white font-bold ml-2">Volver</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={saveResult}
                    className="flex-1 bg-primary rounded-xl p-4 flex-row items-center justify-center"
                  >
                    <Ionicons name="checkmark-circle" size={20} color="white" />
                    <Text className="text-white font-bold ml-2">Guardar</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Tips */}
              <View className="bg-amber-500/10 rounded-xl p-4 border border-amber-500/30 mb-6">
                <View className="flex-row items-start">
                  <Ionicons name="bulb" size={20} color="#FFEA00" />
                  <View className="flex-1 ml-3">
                    <Text className="text-amber-400 font-bold mb-2">
                      Tips para Tests
                    </Text>
                    <Text className="text-amber-300 text-sm">
                      â€¢ Realiza siempre en las mismas condiciones{'\n'}
                      â€¢ Descansa bien el dÃ­a anterior{'\n'}
                      â€¢ Calienta adecuadamente{'\n'}
                      â€¢ Registra resultados para comparar
                    </Text>
                  </View>
                </View>
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

