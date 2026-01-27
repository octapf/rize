import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Camera, CameraType } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';

interface DetectedFood {
  name: string;
  confidence: number;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  serving: string;
}

interface NutritionLabel {
  servingSize: string;
  servingsPerContainer: number;
  calories: number;
  totalFat: number;
  saturatedFat: number;
  transFat: number;
  cholesterol: number;
  sodium: number;
  totalCarbs: number;
  fiber: number;
  sugars: number;
  protein: number;
}

export default function FoodPhotoAnalyzer() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [detectedFoods, setDetectedFoods] = useState<DetectedFood[]>([]);
  const [analysisMode, setAnalysisMode] = useState<'food' | 'label'>('food');
  const cameraRef = React.useRef<Camera>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setCapturedImage(photo.uri);
      analyzeImage(photo.uri);
    }
  };

  const pickImageFromGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setCapturedImage(result.assets[0].uri);
      analyzeImage(result.assets[0].uri);
    }
  };

  const analyzeImage = (imageUri: string) => {
    setIsAnalyzing(true);

    // Simulate AI analysis (2-3 seconds)
    setTimeout(() => {
      if (analysisMode === 'food') {
        // Mock food detection
        const mockDetections: DetectedFood[] = [
          {
            name: 'Pechuga de Pollo a la Plancha',
            confidence: 0.94,
            calories: 165,
            protein: 31,
            carbs: 0,
            fats: 3.6,
            serving: '150g estimado',
          },
          {
            name: 'Arroz Blanco',
            confidence: 0.89,
            calories: 195,
            protein: 4,
            carbs: 42,
            fats: 0.4,
            serving: '150g estimado',
          },
          {
            name: 'Brócoli al Vapor',
            confidence: 0.92,
            calories: 35,
            protein: 2.8,
            carbs: 7,
            fats: 0.4,
            serving: '100g estimado',
          },
        ];

        setDetectedFoods(mockDetections);
        setIsAnalyzing(false);

        Alert.alert(
          'Análisis Completo',
          `Se detectaron ${mockDetections.length} alimentos en la imagen con alta confianza.`
        );
      } else {
        // Mock nutrition label OCR
        setIsAnalyzing(false);
        Alert.alert(
          'Etiqueta Detectada',
          'Información nutricional extraída correctamente',
          [
            {
              text: 'Ver Detalles',
              onPress: () => {
                // Would show detailed nutrition label
              },
            },
            { text: 'OK' },
          ]
        );
      }
    }, 2500);
  };

  const addAllFoods = () => {
    const totalCalories = detectedFoods.reduce((sum, food) => sum + food.calories, 0);
    const totalProtein = detectedFoods.reduce((sum, food) => sum + food.protein, 0);

    Alert.alert(
      'Agregar Comida',
      `Se agregarán ${detectedFoods.length} alimentos:\n\n` +
        `Total: ${totalCalories} kcal\n` +
        `Proteína: ${totalProtein.toFixed(1)}g`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Agregar Todo',
          onPress: () => {
            Alert.alert('¡Agregado!', 'Comida registrada en tu diario', [
              {
                text: 'OK',
                onPress: () => router.back(),
              },
            ]);
          },
        },
      ]
    );
  };

  const retakePhoto = () => {
    setCapturedImage(null);
    setDetectedFoods([]);
    setIsAnalyzing(false);
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
          Necesitamos acceso a tu cámara para analizar fotos de comida.
        </Text>
        <TouchableOpacity
          onPress={() => router.back()}
          className="bg-emerald-500 rounded-xl px-6 py-3 mt-6"
        >
          <Text className="text-white font-bold">Volver</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Show analysis results
  if (capturedImage) {
    return (
      <View className="flex-1 bg-zinc-950">
        {/* Header */}
        <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
          <View className="flex-row items-center justify-between">
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="close" size={24} color="white" />
            </TouchableOpacity>
            <Text className="text-white text-xl font-bold flex-1 ml-3">
              Análisis de Foto
            </Text>
            <TouchableOpacity onPress={retakePhoto}>
              <Ionicons name="camera-reverse" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView className="flex-1">
          {/* Image Preview */}
          <View className="px-6 pt-4">
            <Image
              source={{ uri: capturedImage }}
              className="w-full h-64 rounded-xl"
              resizeMode="cover"
            />
          </View>

          {/* Analysis Status */}
          {isAnalyzing ? (
            <View className="px-6 pt-6">
              <View className="bg-blue-500/10 rounded-xl p-6 border border-blue-500/30">
                <ActivityIndicator size="large" color="#3B82F6" />
                <Text className="text-blue-400 text-center font-bold mt-4">
                  Analizando con IA...
                </Text>
                <Text className="text-blue-300 text-center text-sm mt-2">
                  Detectando alimentos y calculando información nutricional
                </Text>
              </View>
            </View>
          ) : detectedFoods.length > 0 ? (
            <>
              {/* Detection Summary */}
              <View className="px-6 pt-6">
                <View className="bg-emerald-500/10 rounded-xl p-4 border border-emerald-500/30">
                  <View className="flex-row items-center">
                    <Ionicons name="checkmark-circle" size={24} color="#10B981" />
                    <View className="flex-1 ml-3">
                      <Text className="text-emerald-500 font-bold">
                        {detectedFoods.length} alimentos detectados
                      </Text>
                      <Text className="text-emerald-300 text-sm mt-0.5">
                        Total:{' '}
                        {detectedFoods.reduce((sum, f) => sum + f.calories, 0)} kcal
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={addAllFoods}
                      className="bg-emerald-500 rounded-lg px-4 py-2"
                    >
                      <Text className="text-white font-semibold">Agregar</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              {/* Detected Foods */}
              <View className="px-6 pt-6 pb-6">
                <Text className="text-white font-bold text-lg mb-3">
                  Alimentos Detectados
                </Text>

                {detectedFoods.map((food, index) => (
                  <View
                    key={index}
                    className="bg-zinc-900 rounded-xl p-4 mb-3 border border-zinc-800"
                  >
                    <View className="flex-row items-start justify-between mb-3">
                      <View className="flex-1">
                        <Text className="text-white font-bold">{food.name}</Text>
                        <View className="flex-row items-center mt-1">
                          <View className="bg-emerald-500/20 px-2 py-0.5 rounded">
                            <Text className="text-emerald-500 text-xs font-bold">
                              {(food.confidence * 100).toFixed(0)}% confianza
                            </Text>
                          </View>
                          <Text className="text-zinc-400 text-xs ml-2">
                            {food.serving}
                          </Text>
                        </View>
                      </View>
                      <View className="items-end">
                        <Text className="text-white font-bold text-lg">
                          {food.calories}
                        </Text>
                        <Text className="text-zinc-400 text-xs">kcal</Text>
                      </View>
                    </View>

                    {/* Macros */}
                    <View className="flex-row gap-3 pt-3 border-t border-zinc-800">
                      <View className="flex-1">
                        <Text className="text-blue-400 text-xs">Proteína</Text>
                        <Text className="text-white text-sm font-semibold">
                          {food.protein}g
                        </Text>
                      </View>
                      <View className="flex-1">
                        <Text className="text-amber-400 text-xs">Carbos</Text>
                        <Text className="text-white text-sm font-semibold">
                          {food.carbs}g
                        </Text>
                      </View>
                      <View className="flex-1">
                        <Text className="text-red-400 text-xs">Grasas</Text>
                        <Text className="text-white text-sm font-semibold">
                          {food.fats}g
                        </Text>
                      </View>
                    </View>

                    {/* Edit Button */}
                    <TouchableOpacity className="bg-zinc-800 rounded-lg p-2 mt-3">
                      <Text className="text-white text-center text-sm font-semibold">
                        Ajustar Porción
                      </Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </>
          ) : null}
        </ScrollView>
      </View>
    );
  }

  // Camera view
  return (
    <View className="flex-1 bg-zinc-950">
      <Camera ref={cameraRef} className="flex-1" type={CameraType.back}>
        {/* Header */}
        <View className="pt-12 px-6">
          <View className="flex-row items-center justify-between">
            <TouchableOpacity
              onPress={() => router.back()}
              className="bg-black/70 rounded-full p-2"
            >
              <Ionicons name="close" size={24} color="white" />
            </TouchableOpacity>

            <View className="bg-black/70 rounded-full flex-row">
              <TouchableOpacity
                onPress={() => setAnalysisMode('food')}
                className={`px-4 py-2 rounded-full ${
                  analysisMode === 'food' ? 'bg-emerald-500' : ''
                }`}
              >
                <Text
                  className={`font-semibold ${
                    analysisMode === 'food' ? 'text-white' : 'text-zinc-400'
                  }`}
                >
                  Comida
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setAnalysisMode('label')}
                className={`px-4 py-2 rounded-full ${
                  analysisMode === 'label' ? 'bg-emerald-500' : ''
                }`}
              >
                <Text
                  className={`font-semibold ${
                    analysisMode === 'label' ? 'text-white' : 'text-zinc-400'
                  }`}
                >
                  Etiqueta
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={pickImageFromGallery}
              className="bg-black/70 rounded-full p-2"
            >
              <Ionicons name="images" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Center Instructions */}
        <View className="flex-1 items-center justify-center">
          <View className="bg-black/70 rounded-xl p-4 mx-6">
            <Text className="text-white text-center font-semibold">
              {analysisMode === 'food'
                ? 'Apunta a tu plato de comida'
                : 'Enfoca la etiqueta nutricional'}
            </Text>
          </View>
        </View>

        {/* Bottom Controls */}
        <View className="pb-10 items-center">
          <TouchableOpacity
            onPress={takePicture}
            className="bg-white w-20 h-20 rounded-full items-center justify-center border-4 border-emerald-500"
          >
            <View className="bg-emerald-500 w-16 h-16 rounded-full" />
          </TouchableOpacity>

          <View className="bg-black/70 rounded-xl p-4 mt-4 mx-6">
            <Text className="text-zinc-300 text-sm text-center leading-5">
              {analysisMode === 'food'
                ? '📸 La IA detectará los alimentos y estimará las calorías'
                : '🏷️ Extrae automáticamente la información nutricional'}
            </Text>
          </View>
        </View>
      </Camera>
    </View>
  );
}
