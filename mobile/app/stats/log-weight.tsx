import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Card } from '@/components/ui/Card';
import { LineChart } from 'react-native-chart-kit';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface WeightEntry {
  id: string;
  weight: number;
  date: Date;
  notes?: string;
}

const mockEntries: WeightEntry[] = [
  { id: '1', weight: 82.5, date: new Date(2026, 0, 1) },
  { id: '2', weight: 81.8, date: new Date(2026, 0, 5) },
  { id: '3', weight: 81.2, date: new Date(2026, 0, 10) },
  { id: '4', weight: 80.5, date: new Date(2026, 0, 15) },
  { id: '5', weight: 79.8, date: new Date(2026, 0, 20) },
  { id: '6', weight: 78.0, date: new Date(2026, 0, 24) },
];

export default function BodyWeightScreen() {
  const [entries, setEntries] = useState<WeightEntry[]>(mockEntries);
  const [newWeight, setNewWeight] = useState('');
  const [newNotes, setNewNotes] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const currentWeight = entries.length > 0 ? entries[entries.length - 1].weight : 0;
  const startWeight = entries.length > 0 ? entries[0].weight : 0;
  const totalChange = currentWeight - startWeight;
  const avgWeight = entries.reduce((sum, e) => sum + e.weight, 0) / entries.length;

  const handleAddEntry = () => {
    const weight = parseFloat(newWeight);
    
    if (!weight || weight <= 0 || weight > 300) {
      Alert.alert('Error', 'Por favor ingresa un peso válido');
      return;
    }

    const newEntry: WeightEntry = {
      id: Date.now().toString(),
      weight,
      date: new Date(),
      notes: newNotes.trim() || undefined,
    };

    setEntries([...entries, newEntry]);
    setNewWeight('');
    setNewNotes('');
    setShowAddModal(false);
    Alert.alert('¡Guardado!', 'Peso registrado correctamente');
  };

  const handleDeleteEntry = (id: string) => {
    Alert.alert(
      'Eliminar Registro',
      '¿Seguro que quieres eliminar este registro?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => setEntries(entries.filter(e => e.id !== id)),
        },
      ]
    );
  };

  // Prepare chart data
  const last30Entries = entries.slice(-30);
  const chartData = {
    labels: last30Entries.map((_, i) =>
      i % 5 === 0 ? format(last30Entries[i].date, 'dd/MM') : ''
    ),
    datasets: [
      {
        data: last30Entries.map(e => e.weight),
        color: (opacity = 1) => `rgba(139, 92, 246, ${opacity})`,
        strokeWidth: 3,
      },
    ],
  };

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <LinearGradient colors={['#8B5CF6', '#7C3AED']} className="px-6 pt-12 pb-6">
        <View className="flex-row items-center justify-between mb-4">
          <TouchableOpacity onPress={() => router.back()} className="p-2">
            <Ionicons name="arrow-back" size={28} color="white" />
          </TouchableOpacity>
          <Text className="text-2xl font-bold text-white">Peso Corporal</Text>
          <TouchableOpacity
            onPress={() => setShowAddModal(!showAddModal)}
            className="bg-white/20 p-2 rounded-full"
          >
            <Ionicons name="add" size={28} color="white" />
          </TouchableOpacity>
        </View>

        {/* Current Stats */}
        <View className="flex-row gap-3">
          <Card className="flex-1 p-3 bg-white/20 border-0">
            <Text className="text-white/80 text-xs mb-1">Actual</Text>
            <Text className="text-white text-2xl font-bold">
              {currentWeight.toFixed(1)}
            </Text>
            <Text className="text-white/80 text-xs">kg</Text>
          </Card>
          <Card className="flex-1 p-3 bg-white/20 border-0">
            <Text className="text-white/80 text-xs mb-1">Cambio</Text>
            <Text
              className={`text-2xl font-bold ${
                totalChange < 0 ? 'text-emerald-300' : 'text-red-300'
              }`}
            >
              {totalChange > 0 ? '+' : ''}
              {totalChange.toFixed(1)}
            </Text>
            <Text className="text-white/80 text-xs">kg</Text>
          </Card>
          <Card className="flex-1 p-3 bg-white/20 border-0">
            <Text className="text-white/80 text-xs mb-1">Promedio</Text>
            <Text className="text-white text-2xl font-bold">
              {avgWeight.toFixed(1)}
            </Text>
            <Text className="text-white/80 text-xs">kg</Text>
          </Card>
        </View>
      </LinearGradient>

      <ScrollView className="flex-1" contentContainerClassName="p-6 gap-6">
        {/* Add Weight Form */}
        {showAddModal && (
          <Card className="p-4 bg-purple-50 border-purple-200">
            <Text className="text-purple-900 font-bold text-lg mb-4">
              Registrar Peso
            </Text>

            <View className="gap-3">
              <View>
                <Text className="text-gray-700 font-semibold mb-2">
                  Peso (kg)
                </Text>
                <TextInput
                  value={newWeight}
                  onChangeText={setNewWeight}
                  placeholder="Ej: 75.5"
                  keyboardType="decimal-pad"
                  className="bg-white border border-gray-300 rounded-lg px-4 py-3 text-lg font-semibold"
                />
              </View>

              <View>
                <Text className="text-gray-700 font-semibold mb-2">
                  Notas (Opcional)
                </Text>
                <TextInput
                  value={newNotes}
                  onChangeText={setNewNotes}
                  placeholder="Ej: Después del desayuno"
                  multiline
                  numberOfLines={2}
                  className="bg-white border border-gray-300 rounded-lg px-4 py-3"
                />
              </View>

              <View className="flex-row gap-2">
                <TouchableOpacity
                  onPress={handleAddEntry}
                  className="flex-1 bg-purple-600 py-3 rounded-lg"
                >
                  <Text className="text-white font-bold text-center">
                    Guardar
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setShowAddModal(false);
                    setNewWeight('');
                    setNewNotes('');
                  }}
                  className="flex-1 bg-gray-200 py-3 rounded-lg"
                >
                  <Text className="text-gray-700 font-bold text-center">
                    Cancelar
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Card>
        )}

        {/* Progress Chart */}
        {entries.length > 0 && (
          <Card className="p-4">
            <Text className="text-gray-900 font-bold text-lg mb-3">
              Evolución del Peso
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <LineChart
                data={chartData}
                width={Math.max(350, last30Entries.length * 20)}
                height={220}
                chartConfig={{
                  backgroundColor: '#ffffff',
                  backgroundGradientFrom: '#ffffff',
                  backgroundGradientTo: '#ffffff',
                  decimalPlaces: 1,
                  color: (opacity = 1) => `rgba(139, 92, 246, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(107, 114, 128, ${opacity})`,
                  style: {
                    borderRadius: 16,
                  },
                  propsForDots: {
                    r: '4',
                    strokeWidth: '2',
                    stroke: '#8B5CF6',
                  },
                }}
                bezier
                style={{
                  marginVertical: 8,
                  borderRadius: 16,
                }}
              />
            </ScrollView>

            <Text className="text-gray-600 text-xs text-center mt-2">
              Últimas {last30Entries.length} mediciones
            </Text>
          </Card>
        )}

        {/* Goal */}
        <Card className="p-4 bg-blue-50 border-blue-200">
          <View className="flex-row items-center gap-3">
            <View className="bg-blue-500 w-12 h-12 rounded-xl items-center justify-center">
              <Ionicons name="flag" size={24} color="white" />
            </View>
            <View className="flex-1">
              <Text className="text-blue-900 font-bold text-lg">
                Objetivo: 75 kg
              </Text>
              <Text className="text-blue-700 text-sm">
                Faltan {(currentWeight - 75).toFixed(1)} kg
              </Text>
            </View>
            <TouchableOpacity className="bg-blue-500 px-4 py-2 rounded-lg">
              <Text className="text-white font-semibold">Editar</Text>
            </TouchableOpacity>
          </View>
        </Card>

        {/* History */}
        <Card className="p-4">
          <Text className="text-gray-900 font-bold text-lg mb-3">
            Historial
          </Text>

          {entries.length === 0 ? (
            <View className="py-8 items-center">
              <Ionicons name="scale-outline" size={64} color="#D1D5DB" />
              <Text className="text-gray-600 mt-4 text-center">
                No hay registros de peso
              </Text>
            </View>
          ) : (
            <View className="gap-2">
              {[...entries].reverse().map(entry => (
                <View
                  key={entry.id}
                  className="flex-row items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <View className="flex-1">
                    <Text className="text-gray-900 font-bold text-lg">
                      {entry.weight.toFixed(1)} kg
                    </Text>
                    <Text className="text-gray-600 text-sm">
                      {format(entry.date, "dd 'de' MMMM, yyyy", { locale: es })}
                    </Text>
                    {entry.notes && (
                      <Text className="text-gray-500 text-xs mt-1">
                        {entry.notes}
                      </Text>
                    )}
                  </View>
                  <TouchableOpacity
                    onPress={() => handleDeleteEntry(entry.id)}
                    className="p-2"
                  >
                    <Ionicons name="trash-outline" size={20} color="#EF4444" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
        </Card>

        {/* Tips */}
        <Card className="p-4 bg-amber-50 border-amber-200">
          <View className="flex-row gap-3">
            <Ionicons name="bulb" size={24} color="#F59E0B" />
            <View className="flex-1">
              <Text className="text-amber-900 font-semibold mb-1">
                Consejos
              </Text>
              <Text className="text-amber-700 text-sm">
                • Pésate a la misma hora cada día{'\n'}
                • Preferiblemente en ayunas{'\n'}
                • Sé consistente con la ropa
              </Text>
            </View>
          </View>
        </Card>
      </ScrollView>
    </View>
  );
}
