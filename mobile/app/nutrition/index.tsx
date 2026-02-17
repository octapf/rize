import React, { useState } from 'react';
import { Text } from '@/components/ui/Text';
import { View, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';;
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Card } from '@/components/ui/Card';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface NutritionLog {
  id: string;
  date: Date;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  water: number;
  notes?: string;
}

export default function NutritionScreen() {
  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState('');
  const [carbs, setCarbs] = useState('');
  const [fats, setFats] = useState('');
  const [water, setWater] = useState('2.5');
  const [notes, setNotes] = useState('');

  const [logs, setLogs] = useState<NutritionLog[]>([
    {
      id: '1',
      date: new Date(2026, 0, 24),
      calories: 2400,
      protein: 180,
      carbs: 250,
      fats: 70,
      water: 3.0,
    },
    {
      id: '2',
      date: new Date(2026, 0, 23),
      calories: 2200,
      protein: 170,
      carbs: 230,
      fats: 65,
      water: 2.5,
    },
  ]);

  const targets = {
    calories: 2500,
    protein: 180,
    carbs: 280,
    fats: 70,
    water: 3.0,
  };

  const todayLog = logs.find(
    l => format(l.date, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')
  );

  const handleAddLog = () => {
    const cal = parseFloat(calories);
    const prot = parseFloat(protein);
    const carb = parseFloat(carbs);
    const fat = parseFloat(fats);
    const wat = parseFloat(water);

    if (!cal || !prot || !carb || !fat || !wat) {
      Alert.alert('Error', 'Completa todos los campos');
      return;
    }

    const newLog: NutritionLog = {
      id: Date.now().toString(),
      date: new Date(),
      calories: cal,
      protein: prot,
      carbs: carb,
      fats: fat,
      water: wat,
      notes: notes.trim() || undefined,
    };

    setLogs([newLog, ...logs]);
    setCalories('');
    setProtein('');
    setCarbs('');
    setFats('');
    setWater('2.5');
    setNotes('');
    Alert.alert('¡Guardado!', 'Registro nutricional añadido');
  };

  const getProgressColor = (current: number, target: number) => {
    const percentage = (current / target) * 100;
    if (percentage < 80) return '#EF4444';
    if (percentage < 100) return '#FFEA00';
    return '#9D12DE';
  };

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <LinearGradient colors={['#9D12DE', '#7C3AED']} className="px-6 pt-12 pb-6">
        <View className="flex-row items-center justify-between mb-4">
          <TouchableOpacity onPress={() => router.back()} className="p-2">
            <Ionicons name="arrow-back" size={28} color="white" />
          </TouchableOpacity>
          <Text className="text-2xl font-bold text-white">Nutrición</Text>
          <View className="w-10" />
        </View>

        {/* Today's Progress */}
        {todayLog && (
          <Card className="p-4 bg-white/20 border-0">
            <Text className="text-white font-bold text-lg mb-3">Progreso de Hoy</Text>
            <View className="gap-2">
              {[
                { label: 'Calorías', value: todayLog.calories, target: targets.calories, unit: 'kcal' },
                { label: 'Proteína', value: todayLog.protein, target: targets.protein, unit: 'g' },
                { label: 'Carbos', value: todayLog.carbs, target: targets.carbs, unit: 'g' },
                { label: 'Grasas', value: todayLog.fats, target: targets.fats, unit: 'g' },
                { label: 'Agua', value: todayLog.water, target: targets.water, unit: 'L' },
              ].map((item, i) => {
                const percentage = (item.value / item.target) * 100;
                return (
                  <View key={i}>
                    <View className="flex-row items-center justify-between mb-1">
                      <Text className="text-white text-sm">{item.label}</Text>
                      <Text className="text-white text-sm font-bold">
                        {item.value} / {item.target} {item.unit}
                      </Text>
                    </View>
                    <View className="bg-white/20 h-2 rounded-full overflow-hidden">
                      <View
                        className="h-full rounded-full"
                        style={{
                          width: `${Math.min(percentage, 100)}%`,
                          backgroundColor: getProgressColor(item.value, item.target),
                        }}
                      />
                    </View>
                  </View>
                );
              })}
            </View>
          </Card>
        )}
      </LinearGradient>

      <ScrollView className="flex-1" contentContainerClassName="p-6">
        {/* Add Log */}
        <Card className="p-4 mb-4 bg-primary/10 border-primary/20">
          <Text className="text-primary font-bold text-lg mb-3">
            Registrar Hoy
          </Text>

          <View className="gap-3">
            <View className="flex-row gap-2">
              <View className="flex-1">
                <Text className="text-gray-700 font-semibold mb-2">Calorías</Text>
                <TextInput
                  value={calories}
                  onChangeText={setCalories}
                  placeholder="2500"
                  keyboardType="number-pad"
                  className="bg-white border border-gray-300 rounded-lg px-3 py-2"
                />
              </View>
              <View className="flex-1">
                <Text className="text-gray-700 font-semibold mb-2">Proteína (g)</Text>
                <TextInput
                  value={protein}
                  onChangeText={setProtein}
                  placeholder="180"
                  keyboardType="number-pad"
                  className="bg-white border border-gray-300 rounded-lg px-3 py-2"
                />
              </View>
            </View>

            <View className="flex-row gap-2">
              <View className="flex-1">
                <Text className="text-gray-700 font-semibold mb-2">Carbos (g)</Text>
                <TextInput
                  value={carbs}
                  onChangeText={setCarbs}
                  placeholder="280"
                  keyboardType="number-pad"
                  className="bg-white border border-gray-300 rounded-lg px-3 py-2"
                />
              </View>
              <View className="flex-1">
                <Text className="text-gray-700 font-semibold mb-2">Grasas (g)</Text>
                <TextInput
                  value={fats}
                  onChangeText={setFats}
                  placeholder="70"
                  keyboardType="number-pad"
                  className="bg-white border border-gray-300 rounded-lg px-3 py-2"
                />
              </View>
            </View>

            <View>
              <Text className="text-gray-700 font-semibold mb-2">Agua (L)</Text>
              <TextInput
                value={water}
                onChangeText={setWater}
                placeholder="3.0"
                keyboardType="decimal-pad"
                className="bg-white border border-gray-300 rounded-lg px-3 py-2"
              />
            </View>

            <View>
              <Text className="text-gray-700 font-semibold mb-2">Notas (Opcional)</Text>
              <TextInput
                value={notes}
                onChangeText={setNotes}
                placeholder="Ej: Día de recarga de carbos"
                multiline
                numberOfLines={2}
                className="bg-white border border-gray-300 rounded-lg px-3 py-2"
              />
            </View>

            <TouchableOpacity
              onPress={handleAddLog}
              className="bg-primary py-3 rounded-lg"
            >
              <Text className="text-white font-bold text-center">Guardar</Text>
            </TouchableOpacity>
          </View>
        </Card>

        {/* Quick Water Log */}
        <Card className="p-4 mb-4 bg-primary/5 border-primary/20">
          <View className="flex-row items-center justify-between mb-3">
            <View className="flex-row items-center gap-2">
              <Ionicons name="water" size={24} color="#9D12DE" />
              <Text className="text-text font-bold text-lg">Hidratación</Text>
            </View>
            <Text className="text-text/70 font-bold">
              {todayLog?.water || 0} / {targets.water} L
            </Text>
          </View>
          <View className="flex-row gap-2">
            <TouchableOpacity className="flex-1 bg-primary py-2 rounded-lg">
              <Text className="text-white font-semibold text-center">+ 250ml</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 bg-primary py-2 rounded-lg">
              <Text className="text-white font-semibold text-center">+ 500ml</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 bg-primary py-2 rounded-lg">
              <Text className="text-white font-semibold text-center">+ 1L</Text>
            </TouchableOpacity>
          </View>
        </Card>

        {/* History */}
        <Card className="p-4">
          <Text className="text-gray-900 font-bold text-lg mb-3">Historial</Text>
          {logs.length === 0 ? (
            <Text className="text-gray-600 text-center py-4">
              No hay registros
            </Text>
          ) : (
            <View className="gap-2">
              {logs.map(log => (
                <View key={log.id} className="p-3 bg-gray-50 rounded-lg">
                  <View className="flex-row items-center justify-between mb-2">
                    <Text className="text-gray-900 font-semibold">
                      {format(log.date, "dd 'de' MMMM", { locale: es })}
                    </Text>
                    <Text className="text-primary font-bold">
                      {log.calories} kcal
                    </Text>
                  </View>
                  <View className="flex-row items-center gap-3 flex-wrap">
                    <Text className="text-gray-600 text-xs">P: {log.protein}g</Text>
                    <Text className="text-gray-600 text-xs">C: {log.carbs}g</Text>
                    <Text className="text-gray-600 text-xs">G: {log.fats}g</Text>
                    <Text className="text-primary text-xs">💧 {log.water}L</Text>
                  </View>
                  {log.notes && (
                    <Text className="text-gray-500 text-xs mt-1">{log.notes}</Text>
                  )}
                </View>
              ))}
            </View>
          )}
        </Card>
      </ScrollView>
    </View>
  );
}



