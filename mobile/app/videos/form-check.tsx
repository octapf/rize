import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  Dimensions,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Camera, CameraType } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';

const screenWidth = Dimensions.get('window').width;

export default function FormCheck() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [type, setType] = useState(CameraType.back);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [showGuides, setShowGuides] = useState(true);
  const cameraRef = useRef<Camera>(null);
  const recordingInterval = useRef<NodeJS.Timeout>();

  React.useEffect(() => {
    (async () => {
      const { status: cameraStatus } = await Camera.requestCameraPermissionsAsync();
      const { status: audioStatus } = await Camera.requestMicrophonePermissionsAsync();
      const { status: mediaStatus } = await MediaLibrary.requestPermissionsAsync();
      setHasPermission(
        cameraStatus === 'granted' &&
          audioStatus === 'granted' &&
          mediaStatus === 'granted'
      );
    })();
  }, []);

  const startRecording = async () => {
    if (cameraRef.current) {
      try {
        setIsRecording(true);
        setRecordingTime(0);

        recordingInterval.current = setInterval(() => {
          setRecordingTime((prev) => prev + 1);
        }, 1000);

        const video = await cameraRef.current.recordAsync({
          maxDuration: 60, // 60 seconds max
        });

        if (recordingInterval.current) {
          clearInterval(recordingInterval.current);
        }

        await MediaLibrary.createAssetAsync(video.uri);

        Alert.alert(
          'Â¡Video Guardado!',
          'Tu video de form check ha sido guardado en la galerÃ­a',
          [
            {
              text: 'Ver AnÃ¡lisis',
              onPress: () => router.push('/videos/analysis' as any),
            },
            { text: 'OK' },
          ]
        );
      } catch (error) {
        console.error('Error recording:', error);
        Alert.alert('Error', 'No se pudo grabar el video');
      } finally {
        setIsRecording(false);
        setRecordingTime(0);
      }
    }
  };

  const stopRecording = async () => {
    if (cameraRef.current && isRecording) {
      cameraRef.current.stopRecording();
      if (recordingInterval.current) {
        clearInterval(recordingInterval.current);
      }
      setIsRecording(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (hasPermission === null) {
    return (
      <View className="flex-1 bg-zinc-950 items-center justify-center">
        <Text className="text-white">Solicitando permisos...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View className="flex-1 bg-zinc-950 items-center justify-center px-6">
        <Ionicons name="camera-outline" size={64} color="#71717A" />
        <Text className="text-white text-xl font-bold mt-4 mb-2">
          Permisos Requeridos
        </Text>
        <Text className="text-zinc-400 text-center mb-6">
          Necesitamos acceso a tu cÃ¡mara, micrÃ³fono y galerÃ­a para grabar videos de form check
        </Text>
        <TouchableOpacity
          onPress={() => router.back()}
          className="bg-primary rounded-xl px-6 py-3"
        >
          <Text className="text-white font-bold">Volver</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-black">
      {/* Header */}
      <View className="pt-12 pb-4 px-6 absolute top-0 left-0 right-0 z-10">
        <View className="flex-row items-center justify-between">
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-10 h-10 bg-black/50 rounded-full items-center justify-center"
          >
            <Ionicons name="close" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setShowGuides(!showGuides)}
            className="w-10 h-10 bg-black/50 rounded-full items-center justify-center"
          >
            <Ionicons
              name={showGuides ? 'grid' : 'grid-outline'}
              size={24}
              color="white"
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Camera */}
      <Camera
        ref={cameraRef}
        style={{ flex: 1 }}
        type={type}
        ratio="16:9"
      >
        {/* Guide Overlay */}
        {showGuides && (
          <View className="flex-1 items-center justify-center">
            {/* Center Guidelines */}
            <View className="absolute left-0 right-0" style={{ top: '33%' }}>
              <View className="h-px bg-white/30" />
            </View>
            <View className="absolute left-0 right-0" style={{ top: '66%' }}>
              <View className="h-px bg-white/30" />
            </View>
            <View className="absolute top-0 bottom-0" style={{ left: '33%' }}>
              <View className="w-px bg-white/30" />
            </View>
            <View className="absolute top-0 bottom-0" style={{ left: '66%' }}>
              <View className="w-px bg-white/30" />
            </View>

            {/* Center Frame */}
            <View
              className="border-2 border-primary/50 rounded-2xl"
              style={{
                width: screenWidth * 0.7,
                height: screenWidth * 0.9,
              }}
            >
              <View className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-primary rounded-tl-2xl" />
              <View className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-primary rounded-tr-2xl" />
              <View className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-primary rounded-bl-2xl" />
              <View className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-primary rounded-br-2xl" />
            </View>

            {/* Instructions */}
            <View className="absolute top-20 left-0 right-0 items-center">
              <View className="bg-black/70 px-4 py-2 rounded-full">
                <Text className="text-white text-sm font-semibold">
                  ColÃ³cate en el centro del cuadro
                </Text>
              </View>
            </View>
          </View>
        )}

        {/* Recording Indicator */}
        {isRecording && (
          <View className="absolute top-20 left-0 right-0 items-center">
            <View className="bg-red-500 px-4 py-2 rounded-full flex-row items-center">
              <View className="w-3 h-3 bg-white rounded-full mr-2" />
              <Text className="text-white font-bold">
                REC {formatTime(recordingTime)}
              </Text>
            </View>
          </View>
        )}
      </Camera>

      {/* Bottom Controls */}
      <View className="absolute bottom-0 left-0 right-0 pb-10 px-6">
        <View className="flex-row items-center justify-between">
          {/* Flip Camera */}
          <TouchableOpacity
            onPress={() =>
              setType(
                type === CameraType.back ? CameraType.front : CameraType.back
              )
            }
            disabled={isRecording}
            className="w-14 h-14 bg-black/50 rounded-full items-center justify-center"
          >
            <Ionicons name="camera-reverse" size={28} color="white" />
          </TouchableOpacity>

          {/* Record Button */}
          <TouchableOpacity
            onPress={isRecording ? stopRecording : startRecording}
            className={`w-20 h-20 rounded-full items-center justify-center ${
              isRecording ? 'bg-red-500' : 'bg-white'
            }`}
          >
            {isRecording ? (
              <View className="w-8 h-8 bg-white rounded-sm" />
            ) : (
              <View className="w-16 h-16 bg-red-500 rounded-full" />
            )}
          </TouchableOpacity>

          {/* Gallery */}
          <TouchableOpacity
            onPress={() => router.push('/videos/my-recordings' as any)}
            disabled={isRecording}
            className="w-14 h-14 bg-black/50 rounded-full items-center justify-center"
          >
            <Ionicons name="images" size={28} color="white" />
          </TouchableOpacity>
        </View>

        {/* Tips */}
        <View className="mt-6 bg-black/70 rounded-xl p-4">
          <Text className="text-white font-bold mb-2">
            Consejos para un buen Form Check:
          </Text>
          <View className="flex-row items-start mb-1">
            <Ionicons name="checkmark-circle" size={16} color="#9D12DE" />
            <Text className="text-zinc-300 text-sm ml-2 flex-1">
              Graba desde un Ã¡ngulo lateral (90Â°)
            </Text>
          </View>
          <View className="flex-row items-start mb-1">
            <Ionicons name="checkmark-circle" size={16} color="#9D12DE" />
            <Text className="text-zinc-300 text-sm ml-2 flex-1">
              AsegÃºrate de que tu cuerpo completo estÃ© visible
            </Text>
          </View>
          <View className="flex-row items-start">
            <Ionicons name="checkmark-circle" size={16} color="#9D12DE" />
            <Text className="text-zinc-300 text-sm ml-2 flex-1">
              Usa buena iluminaciÃ³n
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

