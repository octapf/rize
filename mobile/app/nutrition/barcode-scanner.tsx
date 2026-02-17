import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Camera, CameraType } from 'expo-camera';

const screenWidth = Dimensions.get('window').width;

interface ScannedProduct {
  barcode: string;
  name: string;
  brand: string;
  serving: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  verified: boolean;
}

// Mock barcode database
const BARCODE_DATABASE: { [key: string]: ScannedProduct } = {
  '748927022209': {
    barcode: '748927022209',
    name: 'Whey Protein Gold Standard',
    brand: 'Optimum Nutrition',
    serving: '1 scoop (30g)',
    calories: 120,
    protein: 24,
    carbs: 3,
    fats: 1,
    verified: true,
  },
  '123456789': {
    barcode: '123456789',
    name: 'Arroz Integral',
    brand: 'Marca Genérica',
    serving: '100g',
    calories: 111,
    protein: 2.6,
    carbs: 23,
    fats: 0.9,
    verified: true,
  },
  '987654321': {
    barcode: '987654321',
    name: 'Pechuga de Pollo',
    brand: 'San Fernando',
    serving: '100g',
    calories: 165,
    protein: 31,
    carbs: 0,
    fats: 3.6,
    verified: true,
  },
};

export default function BarcodeScanner() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const [flashEnabled, setFlashEnabled] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }: { type: string; data: string }) => {
    if (scanned) return;

    setScanned(true);

    // Simulate barcode lookup
    const product = BARCODE_DATABASE[data];

    if (product) {
      Alert.alert(
        '¡Producto Encontrado!',
        `${product.name} - ${product.brand}\n\n` +
          `Calorías: ${product.calories} kcal\n` +
          `Proteína: ${product.protein}g\n` +
          `Carbohidratos: ${product.carbs}g\n` +
          `Grasas: ${product.fats}g\n\n` +
          `Porción: ${product.serving}`,
        [
          {
            text: 'Escanear Otro',
            onPress: () => setScanned(false),
            style: 'cancel',
          },
          {
            text: 'Agregar',
            onPress: () => {
              Alert.alert(
                '¡Agregado!',
                `${product.name} agregado a tu registro`,
                [
                  {
                    text: 'OK',
                    onPress: () => router.back(),
                  },
                ]
              );
            },
          },
        ]
      );
    } else {
      Alert.alert(
        'Producto No Encontrado',
        `Código: ${data}\n\nEste producto no está en nuestra base de datos. ¿Deseas agregarlo manualmente?`,
        [
          {
            text: 'Escanear Otro',
            onPress: () => setScanned(false),
            style: 'cancel',
          },
          {
            text: 'Agregar Manual',
            onPress: () => {
              Alert.alert('Crear Producto', 'Redirigiendo a formulario...', [
                {
                  text: 'OK',
                  onPress: () => router.back(),
                },
              ]);
            },
          },
        ]
      );
    }
  };

  // Simulate barcode scan for testing
  const simulateScan = () => {
    handleBarCodeScanned({
      type: 'org.gs1.EAN-13',
      data: '748927022209',
    });
  };

  if (hasPermission === null) {
    return (
      <View className="flex-1 bg-zinc-950 items-center justify-center">
        <Text className="text-white">Solicitando permiso de cámara...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View className="flex-1 bg-zinc-950 items-center justify-center px-6">
        <Ionicons name="camera-off" size={64} color="#EF4444" />
        <Text className="text-white font-bold text-xl mt-4 text-center">
          Sin Acceso a Cámara
        </Text>
        <Text className="text-zinc-400 text-center mt-2 leading-6">
          Necesitamos acceso a tu cámara para escanear códigos de barras. Ve a
          Configuración para habilitar el permiso.
        </Text>
        <TouchableOpacity
          onPress={() => router.back()}
          className="bg-primary rounded-xl px-6 py-3 mt-6"
        >
          <Text className="text-white font-bold">Volver</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-zinc-950">
      {/* Camera View */}
      <Camera
        className="flex-1"
        type={CameraType.back}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        barCodeScannerSettings={{
          barCodeTypes: [
            'ean13',
            'ean8',
            'upc_a',
            'upc_e',
            'code39',
            'code128',
            'qr',
          ],
        }}
      >
        {/* Header Overlay */}
        <View className="pt-12 px-6">
          <View className="flex-row items-center justify-between">
            <TouchableOpacity
              onPress={() => router.back()}
              className="bg-black/70 rounded-full p-2"
            >
              <Ionicons name="close" size={24} color="white" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setFlashEnabled(!flashEnabled)}
              className="bg-black/70 rounded-full p-2"
            >
              <Ionicons
                name={flashEnabled ? 'flash' : 'flash-off'}
                size={24}
                color="white"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Scanning Frame */}
        <View className="flex-1 items-center justify-center">
          <View className="relative">
            {/* Scan Frame */}
            <View
              className="border-2 border-primary rounded-xl"
              style={{ width: screenWidth * 0.7, height: 200 }}
            >
              {/* Corner Markers */}
              <View className="absolute -top-1 -left-1 border-l-4 border-t-4 border-primary w-8 h-8 rounded-tl-xl" />
              <View className="absolute -top-1 -right-1 border-r-4 border-t-4 border-primary w-8 h-8 rounded-tr-xl" />
              <View className="absolute -bottom-1 -left-1 border-l-4 border-b-4 border-primary w-8 h-8 rounded-bl-xl" />
              <View className="absolute -bottom-1 -right-1 border-r-4 border-b-4 border-primary w-8 h-8 rounded-br-xl" />

              {/* Scanning Line Animation (would animate in real app) */}
              {!scanned && (
                <View className="absolute top-1/2 left-0 right-0 h-0.5 bg-primary opacity-70" />
              )}
            </View>

            {/* Instructions */}
            <View className="mt-6 bg-black/70 rounded-xl p-4">
              <Text className="text-white text-center font-semibold">
                {scanned
                  ? 'Código escaneado'
                  : 'Centra el código de barras en el recuadro'}
              </Text>
            </View>
          </View>
        </View>

        {/* Bottom Info */}
        <View className="pb-8 px-6">
          <View className="bg-black/70 rounded-xl p-4">
            <View className="flex-row items-start mb-3">
              <Ionicons name="information-circle" size={20} color="#9D12DE" />
              <View className="flex-1 ml-2">
                <Text className="text-white font-semibold mb-1">
                  Tips para escanear:
                </Text>
                <Text className="text-zinc-300 text-sm">
                  • Asegúrate de tener buena iluminación{'\n'}• Mantén el código a
                  15-30 cm de la cámara{'\n'}• El código debe estar plano y sin
                  reflejos
                </Text>
              </View>
            </View>

            {/* Manual Entry Button */}
            <TouchableOpacity
              onPress={() => {
                Alert.alert(
                  'Entrada Manual',
                  '¿No puedes escanear el código?',
                  [
                    {
                      text: 'Cancelar',
                      style: 'cancel',
                    },
                    {
                      text: 'Buscar Manualmente',
                      onPress: () => router.back(),
                    },
                  ]
                );
              }}
              className="bg-zinc-800 rounded-lg p-3 mt-2"
            >
              <Text className="text-white text-center font-semibold">
                Buscar Manualmente
              </Text>
            </TouchableOpacity>

            {/* Test Scan Button (for development) */}
            <TouchableOpacity
              onPress={simulateScan}
              className="bg-primary/20 rounded-lg p-2 mt-2"
            >
              <Text className="text-primary text-center text-sm font-semibold">
                Simular Escaneo (Demo)
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Camera>
    </View>
  );
}

