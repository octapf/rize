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

interface ExportFormat {
  id: string;
  name: string;
  description: string;
  icon: string;
  extension: string;
  size: string;
  popular: boolean;
}

interface DataCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  selected: boolean;
  itemCount: number;
}

const EXPORT_FORMATS: ExportFormat[] = [
  {
    id: 'json',
    name: 'JSON',
    description: 'Formato universal para desarrolladores',
    icon: 'code-slash',
    extension: '.json',
    size: '~2.5 MB',
    popular: true,
  },
  {
    id: 'csv',
    name: 'CSV',
    description: 'Compatible con Excel y Google Sheets',
    icon: 'grid',
    extension: '.csv',
    size: '~1.8 MB',
    popular: true,
  },
  {
    id: 'pdf',
    name: 'PDF',
    description: 'Reporte visual completo',
    icon: 'document-text',
    extension: '.pdf',
    size: '~5.2 MB',
    popular: false,
  },
  {
    id: 'fit',
    name: 'FIT',
    description: 'Formato Garmin/Strava',
    icon: 'analytics',
    extension: '.fit',
    size: '~800 KB',
    popular: false,
  },
];

const DATA_CATEGORIES: DataCategory[] = [
  {
    id: 'workouts',
    name: 'Entrenamientos',
    description: 'Historial completo de workouts',
    icon: 'barbell',
    selected: true,
    itemCount: 247,
  },
  {
    id: 'nutrition',
    name: 'NutriciÃ³n',
    description: 'Planes de comida y macros',
    icon: 'restaurant',
    selected: true,
    itemCount: 156,
  },
  {
    id: 'measurements',
    name: 'Mediciones',
    description: 'Peso, medidas corporales',
    icon: 'resize',
    selected: true,
    itemCount: 89,
  },
  {
    id: 'progress',
    name: 'Progreso',
    description: 'Fotos y registros visuales',
    icon: 'images',
    selected: false,
    itemCount: 34,
  },
  {
    id: 'stats',
    name: 'EstadÃ­sticas',
    description: 'PRs, rÃ©cords, logros',
    icon: 'trophy',
    selected: true,
    itemCount: 512,
  },
  {
    id: 'social',
    name: 'Social',
    description: 'Posts, comentarios, likes',
    icon: 'people',
    selected: false,
    itemCount: 128,
  },
];

export default function DataExport() {
  const [selectedFormat, setSelectedFormat] = useState('json');
  const [categories, setCategories] = useState(DATA_CATEGORIES);
  const [includeMedia, setIncludeMedia] = useState(true);
  const [compressData, setCompressData] = useState(true);

  const toggleCategory = (categoryId: string) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === categoryId ? { ...cat, selected: !cat.selected } : cat
      )
    );
  };

  const selectedCategories = categories.filter((c) => c.selected);
  const totalItems = selectedCategories.reduce((sum, cat) => sum + cat.itemCount, 0);

  const handleExport = () => {
    if (selectedCategories.length === 0) {
      Alert.alert('Error', 'Selecciona al menos una categorÃ­a para exportar');
      return;
    }

    const format = EXPORT_FORMATS.find((f) => f.id === selectedFormat);

    Alert.alert(
      'Exportando Datos',
      `Se exportarÃ¡n ${totalItems} elementos en formato ${format?.name}. Esto puede tardar unos minutos.`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Exportar',
          onPress: () => {
            // Simulate export process
            Alert.alert(
              'Â¡ExportaciÃ³n Exitosa!',
              `Tu archivo ${format?.extension} estÃ¡ listo. Se ha guardado en tu carpeta de Descargas.`,
              [
                {
                  text: 'Compartir',
                  onPress: () => Alert.alert('Compartir', 'FunciÃ³n de compartir'),
                },
                { text: 'OK' },
              ]
            );
          },
        },
      ]
    );
  };

  const handleImport = () => {
    Alert.alert(
      'Importar Datos',
      'Â¿QuÃ© tipo de archivo deseas importar?',
      [
        {
          text: 'JSON',
          onPress: () =>
            Alert.alert('Seleccionar archivo', 'Abriendo selector de archivos...'),
        },
        {
          text: 'CSV',
          onPress: () =>
            Alert.alert('Seleccionar archivo', 'Abriendo selector de archivos...'),
        },
        { text: 'Cancelar', style: 'cancel' },
      ]
    );
  };

  return (
    <View className="flex-1 bg-zinc-950">
      {/* Header */}
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center mb-3">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1 ml-3">
            Exportar e Importar
          </Text>
        </View>

        <Text className="text-zinc-400 text-sm leading-5">
          Exporta tus datos para crear backups o migrar a otras plataformas. TambiÃ©n
          puedes importar datos desde otras apps.
        </Text>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Quick Actions */}
        <View className="px-6 pt-6">
          <View className="flex-row gap-3 mb-6">
            <TouchableOpacity
              onPress={handleExport}
              className="flex-1 bg-primary rounded-xl p-4 flex-row items-center justify-center"
            >
              <Ionicons name="download" size={20} color="white" />
              <Text className="text-white font-bold ml-2">Exportar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleImport}
              className="flex-1 bg-zinc-900 rounded-xl p-4 flex-row items-center justify-center border border-zinc-800"
            >
              <Ionicons name="cloud-upload" size={20} color="white" />
              <Text className="text-white font-bold ml-2">Importar</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Export Format */}
        <View className="px-6 mb-6">
          <Text className="text-white font-bold text-lg mb-3">
            Formato de ExportaciÃ³n
          </Text>

          {EXPORT_FORMATS.map((format) => (
            <TouchableOpacity
              key={format.id}
              onPress={() => setSelectedFormat(format.id)}
              className={`bg-zinc-900 rounded-xl p-4 mb-3 flex-row items-center border ${
                selectedFormat === format.id
                  ? 'border-primary'
                  : 'border-zinc-800'
              }`}
            >
              <View
                className={`w-12 h-12 rounded-xl items-center justify-center ${
                  selectedFormat === format.id ? 'bg-primary/20' : 'bg-zinc-800'
                }`}
              >
                <Ionicons
                  name={format.icon as any}
                  size={24}
                  color={selectedFormat === format.id ? '#9D12DE' : '#A1A1AA'}
                />
              </View>

              <View className="flex-1 ml-3">
                <View className="flex-row items-center">
                  <Text className="text-white font-bold">{format.name}</Text>
                  {format.popular && (
                    <View className="ml-2 bg-amber-500/20 px-2 py-0.5 rounded">
                      <Text className="text-amber-500 text-xs font-bold">Popular</Text>
                    </View>
                  )}
                </View>
                <Text className="text-zinc-400 text-sm mt-0.5">
                  {format.description}
                </Text>
                <Text className="text-zinc-500 text-xs mt-1">
                  {format.extension} â€¢ {format.size}
                </Text>
              </View>

              {selectedFormat === format.id && (
                <Ionicons name="checkmark-circle" size={24} color="#9D12DE" />
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Data Categories */}
        <View className="px-6 mb-6">
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-white font-bold text-lg">
              CategorÃ­as de Datos
            </Text>
            <Text className="text-zinc-400 text-sm">
              {selectedCategories.length}/{categories.length} seleccionadas
            </Text>
          </View>

          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              onPress={() => toggleCategory(category.id)}
              className={`bg-zinc-900 rounded-xl p-4 mb-3 flex-row items-center border ${
                category.selected ? 'border-primary/50' : 'border-zinc-800'
              }`}
            >
              <View
                className={`w-10 h-10 rounded-lg items-center justify-center ${
                  category.selected ? 'bg-primary/20' : 'bg-zinc-800'
                }`}
              >
                <Ionicons
                  name={category.icon as any}
                  size={20}
                  color={category.selected ? '#9D12DE' : '#A1A1AA'}
                />
              </View>

              <View className="flex-1 ml-3">
                <Text className="text-white font-semibold">{category.name}</Text>
                <Text className="text-zinc-400 text-sm mt-0.5">
                  {category.description}
                </Text>
                <Text className="text-zinc-500 text-xs mt-1">
                  {category.itemCount.toLocaleString('es-ES')} elementos
                </Text>
              </View>

              <Switch
                value={category.selected}
                onValueChange={() => toggleCategory(category.id)}
                trackColor={{ false: '#3F3F46', true: '#9D12DE80' }}
                thumbColor={category.selected ? '#9D12DE' : '#f4f3f4'}
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* Export Options */}
        <View className="px-6 mb-6">
          <Text className="text-white font-bold text-lg mb-3">
            Opciones Adicionales
          </Text>

          <View className="bg-zinc-900 rounded-xl p-4 border border-zinc-800 mb-3">
            <View className="flex-row items-center justify-between">
              <View className="flex-1">
                <Text className="text-white font-semibold">Incluir Multimedia</Text>
                <Text className="text-zinc-400 text-sm mt-0.5">
                  Exportar fotos y videos ({includeMedia ? '+3.2 MB' : '0 MB'})
                </Text>
              </View>
              <Switch
                value={includeMedia}
                onValueChange={setIncludeMedia}
                trackColor={{ false: '#3F3F46', true: '#9D12DE80' }}
                thumbColor={includeMedia ? '#9D12DE' : '#f4f3f4'}
              />
            </View>
          </View>

          <View className="bg-zinc-900 rounded-xl p-4 border border-zinc-800">
            <View className="flex-row items-center justify-between">
              <View className="flex-1">
                <Text className="text-white font-semibold">Comprimir Datos</Text>
                <Text className="text-zinc-400 text-sm mt-0.5">
                  Reduce el tamaÃ±o del archivo ({compressData ? '-60%' : '0%'})
                </Text>
              </View>
              <Switch
                value={compressData}
                onValueChange={setCompressData}
                trackColor={{ false: '#3F3F46', true: '#9D12DE80' }}
                thumbColor={compressData ? '#9D12DE' : '#f4f3f4'}
              />
            </View>
          </View>
        </View>

        {/* Export Summary */}
        {selectedCategories.length > 0 && (
          <View className="px-6 mb-6">
            <View className="bg-primary/10 rounded-xl p-4 border border-primary/30">
              <View className="flex-row items-start">
                <Ionicons name="information-circle" size={24} color="#9D12DE" />
                <View className="flex-1 ml-3">
                  <Text className="text-primary/80 font-bold mb-2">
                    Resumen de ExportaciÃ³n
                  </Text>
                  <View className="space-y-1">
                    <Text className="text-primary/60 text-sm">
                      â€¢ {totalItems.toLocaleString('es-ES')} elementos totales
                    </Text>
                    <Text className="text-primary/60 text-sm">
                      â€¢ {selectedCategories.length} categorÃ­as seleccionadas
                    </Text>
                    <Text className="text-primary/60 text-sm">
                      â€¢ TamaÃ±o estimado:{' '}
                      {EXPORT_FORMATS.find((f) => f.id === selectedFormat)?.size}
                    </Text>
                    {includeMedia && (
                      <Text className="text-primary/60 text-sm">
                        â€¢ Incluye 34 fotos y videos
                      </Text>
                    )}
                  </View>
                </View>
              </View>
            </View>
          </View>
        )}

        {/* Scheduled Exports */}
        <View className="px-6 mb-6">
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-white font-bold text-lg">
              Exportaciones Programadas
            </Text>
            <TouchableOpacity>
              <Text className="text-primary font-semibold">+ Nueva</Text>
            </TouchableOpacity>
          </View>

          <View className="bg-zinc-900 rounded-xl p-4 border border-zinc-800">
            <View className="flex-row items-center">
              <Ionicons name="time" size={20} color="#9D12DE" />
              <View className="flex-1 ml-3">
                <Text className="text-white font-semibold">Backup Semanal</Text>
                <Text className="text-zinc-400 text-sm mt-0.5">
                  Cada domingo a las 23:00
                </Text>
              </View>
              <View className="bg-primary/20 px-2 py-1 rounded">
                <Text className="text-primary text-xs font-bold">Activo</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

