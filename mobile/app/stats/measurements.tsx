import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Card } from '@/components/ui/Card';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface Measurement {
  id: string;
  type: 'neck' | 'chest' | 'waist' | 'hips' | 'biceps' | 'thighs' | 'calves';
  value: number;
  date: Date;
  notes?: string;
}

interface ProgressPhoto {
  id: string;
  uri: string;
  date: Date;
  weight?: number;
  notes?: string;
  type: 'front' | 'back' | 'side';
}

const measurementTypes = [
  { id: 'neck', name: 'Cuello', icon: '??', unit: 'cm' },
  { id: 'chest', name: 'Pecho', icon: 'üí™', unit: 'cm' },
  { id: 'waist', name: 'Cintura', icon: 'üìè', unit: 'cm' },
  { id: 'hips', name: 'Caderas', icon: '??', unit: 'cm' },
  { id: 'biceps', name: 'BÌceps', icon: 'üí™', unit: 'cm' },
  { id: 'thighs', name: 'Muslos', icon: '??', unit: 'cm' },
  { id: 'calves', name: 'Pantorrillas', icon: '??', unit: 'cm' },
];

const mockMeasurements: Measurement[] = [
  { id: '1', type: 'chest', value: 105, date: new Date(2026, 0, 24) },
  { id: '2', type: 'waist', value: 85, date: new Date(2026, 0, 24) },
  { id: '3', type: 'biceps', value: 38, date: new Date(2026, 0, 24) },
];

export default function MeasurementsScreen() {
  const [activeTab, setActiveTab] = useState<'measurements' | 'photos'>('measurements');
  const [measurements, setMeasurements] = useState<Measurement[]>(mockMeasurements);
  const [photos, setPhotos] = useState<ProgressPhoto[]>([]);
  const [selectedType, setSelectedType] = useState<string>('chest');
  const [newValue, setNewValue] = useState('');
  const [newNotes, setNewNotes] = useState('');

  const handleAddMeasurement = () => {
    const value = parseFloat(newValue);
    if (!value || value <= 0 || value > 300) {
      Alert.alert('Error', 'Ingresa un valor v·lido');
      return;
    }

    const newMeasurement: Measurement = {
      id: Date.now().toString(),
      type: selectedType as any,
      value,
      date: new Date(),
      notes: newNotes.trim() || undefined,
    };

    setMeasurements([...measurements, newMeasurement]);
    setNewValue('');
    setNewNotes('');
    Alert.alert('°Guardado!', 'Medida registrada correctamente');
  };

  const handleAddPhoto = () => {
    Alert.alert('Agregar Foto', 'FunciÛn de c·mara en desarrollo');
  };

  const getCurrentMeasurements = () => {
    const latest: { [key: string]: Measurement } = {};
    measurements.forEach(m => {
      if (!latest[m.type] || m.date > latest[m.type].date) {
        latest[m.type] = m;
      }
    });
    return latest;
  };

  const currentMeasurements = getCurrentMeasurements();

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <LinearGradient colors={['#EC4899', '#DB2777']} className="px-6 pt-12 pb-6">
        <View className="flex-row items-center justify-between mb-4">
          <TouchableOpacity onPress={() => router.back()} className="p-2">
            <Ionicons name="arrow-back" size={28} color="white" />
          </TouchableOpacity>
          <Text className="text-2xl font-bold text-white">Medidas y Fotos</Text>
          <View className="w-10" />
        </View>

        {/* Tabs */}
        <View className="flex-row gap-2">
          {(['measurements', 'photos'] as const).map(tab => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              className={`flex-1 py-2 rounded-lg ${
                activeTab === tab ? 'bg-white' : 'bg-white/20'
              }`}
            >
              <Text
                className={`text-center font-bold ${
                  activeTab === tab ? 'text-pink-600' : 'text-white'
                }`}
              >
                {tab === 'measurements' ? 'Medidas' : 'Fotos de Progreso'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </LinearGradient>

      <ScrollView className="flex-1" contentContainerClassName="p-6">
        {activeTab === 'measurements' ? (
          <>
            {/* Add Measurement */}
            <Card className="p-4 mb-4 bg-pink-50 border-pink-200">
              <Text className="text-pink-900 font-bold text-lg mb-3">
                Registrar Medida
              </Text>

              {/* Type Selector */}
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                className="mb-3"
              >
                <View className="flex-row gap-2">
                  {measurementTypes.map(type => (
                    <TouchableOpacity
                      key={type.id}
                      onPress={() => setSelectedType(type.id)}
                      className={`px-4 py-2 rounded-lg flex-row items-center gap-2 ${
                        selectedType === type.id
                          ? 'bg-pink-500'
                          : 'bg-white border border-gray-300'
                      }`}
                    >
                      <Text className="text-base">{type.icon}</Text>
                      <Text
                        className={`font-semibold ${
                          selectedType === type.id ? 'text-white' : 'text-gray-700'
                        }`}
                      >
                        {type.name}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>

              <View className="gap-3">
                <View>
                  <Text className="text-gray-700 font-semibold mb-2">
                    Valor (cm)
                  </Text>
                  <TextInput
                    value={newValue}
                    onChangeText={setNewValue}
                    placeholder="Ej: 105"
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
                    placeholder="Ej: En ayunas, relajado"
                    multiline
                    numberOfLines={2}
                    className="bg-white border border-gray-300 rounded-lg px-4 py-3"
                  />
                </View>

                <TouchableOpacity
                  onPress={handleAddMeasurement}
                  className="bg-pink-600 py-3 rounded-lg"
                >
                  <Text className="text-white font-bold text-center">Guardar</Text>
                </TouchableOpacity>
              </View>
            </Card>

            {/* Current Measurements */}
            <Card className="p-4 mb-4">
              <Text className="text-gray-900 font-bold text-lg mb-3">
                Medidas Actuales
              </Text>
              <View className="gap-2">
                {measurementTypes.map(type => {
                  const measurement = currentMeasurements[type.id];
                  return (
                    <View
                      key={type.id}
                      className="flex-row items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <View className="flex-row items-center gap-2">
                        <Text className="text-2xl">{type.icon}</Text>
                        <Text className="text-gray-900 font-semibold">
                          {type.name}
                        </Text>
                      </View>
                      {measurement ? (
                        <Text className="text-pink-600 font-bold text-lg">
                          {measurement.value} {type.unit}
                        </Text>
                      ) : (
                        <Text className="text-gray-500 text-sm">No registrado</Text>
                      )}
                    </View>
                  );
                })}
              </View>
            </Card>

            {/* History */}
            <Card className="p-4">
              <Text className="text-gray-900 font-bold text-lg mb-3">
                Historial
              </Text>
              {measurements.length === 0 ? (
                <Text className="text-gray-600 text-center py-4">
                  No hay medidas registradas
                </Text>
              ) : (
                <View className="gap-2">
                  {[...measurements].reverse().map(m => {
                    const type = measurementTypes.find(t => t.id === m.type);
                    return (
                      <View
                        key={m.id}
                        className="p-3 bg-gray-50 rounded-lg flex-row items-center justify-between"
                      >
                        <View className="flex-1">
                          <View className="flex-row items-center gap-2 mb-1">
                            <Text className="text-base">{type?.icon}</Text>
                            <Text className="text-gray-900 font-semibold">
                              {type?.name}
                            </Text>
                          </View>
                          <Text className="text-gray-600 text-sm">
                            {format(m.date, "dd 'de' MMMM, yyyy", { locale: es })}
                          </Text>
                          {m.notes && (
                            <Text className="text-gray-500 text-xs mt-1">
                              {m.notes}
                            </Text>
                          )}
                        </View>
                        <Text className="text-pink-600 font-bold text-xl">
                          {m.value}
                        </Text>
                      </View>
                    );
                  })}
                </View>
              )}
            </Card>
          </>
        ) : (
          <>
            {/* Add Photo Button */}
            <TouchableOpacity
              onPress={handleAddPhoto}
              className="bg-pink-500 p-6 rounded-lg mb-4 flex-row items-center justify-center gap-2"
            >
              <Ionicons name="camera" size={28} color="white" />
              <Text className="text-white font-bold text-lg">Tomar Foto de Progreso</Text>
            </TouchableOpacity>

            {/* Photos Grid */}
            {photos.length === 0 ? (
              <Card className="p-8 items-center">
                <Ionicons name="images-outline" size={64} color="#D1D5DB" />
                <Text className="text-gray-900 text-xl font-bold mt-4 text-center">
                  No hay fotos de progreso
                </Text>
                <Text className="text-gray-600 text-center mt-2">
                  Captura tu transformaciÛn con fotos regulares
                </Text>
              </Card>
            ) : (
              <View className="flex-row flex-wrap gap-2">
                {photos.map(photo => (
                  <TouchableOpacity
                    key={photo.id}
                    className="w-[48%] aspect-square bg-gray-200 rounded-lg overflow-hidden"
                  >
                    <Image
                      source={{ uri: photo.uri }}
                      className="w-full h-full"
                      resizeMode="cover"
                    />
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {/* Tips */}
            <Card className="p-4 mt-4 bg-primary/5 border-primary/20">
              <View className="flex-row gap-3">
                <Ionicons name="bulb" size={24} color="#9D12DE" />
                <View className="flex-1">
                  <Text className="text-text font-semibold mb-1">
                    Consejos para fotos
                  </Text>
                  <Text className="text-text/70 text-sm">
                    ï Misma iluminaciÛn{'\n'}
                    ï Mismo ·ngulo y distancia{'\n'}
                    ï Misma hora del dÌa{'\n'}
                    ï Fotos semanales o mensuales
                  </Text>
                </View>
              </View>
            </Card>
          </>
        )}
      </ScrollView>
    </View>
  );
}

