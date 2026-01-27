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

interface FormAnalysis {
  id: string;
  exercise: string;
  date: string;
  overallScore: number;
  metrics: {
    name: string;
    score: number;
    feedback: string;
    status: 'excellent' | 'good' | 'needs-work' | 'poor';
  }[];
  videoUrl?: string;
  aiSuggestions: string[];
}

const FORM_ANALYSES: FormAnalysis[] = [
  {
    id: '1',
    exercise: 'Sentadilla',
    date: '2025-01-27',
    overallScore: 85,
    videoUrl: 'video-1.mp4',
    metrics: [
      {
        name: 'Profundidad',
        score: 90,
        feedback: 'Excelente profundidad, pasas paralelo consistentemente',
        status: 'excellent',
      },
      {
        name: 'Posición de Rodillas',
        score: 75,
        feedback: 'Rodillas se adelantan ligeramente. Intenta sentarte más atrás',
        status: 'good',
      },
      {
        name: 'Espalda Neutra',
        score: 95,
        feedback: 'Columna perfectamente neutra durante todo el movimiento',
        status: 'excellent',
      },
      {
        name: 'Velocidad Concéntrica',
        score: 80,
        feedback: 'Buena explosividad en la subida',
        status: 'good',
      },
      {
        name: 'Control Excéntrico',
        score: 85,
        feedback: 'Descenso controlado, podrías ser más lento para mayor TUT',
        status: 'good',
      },
    ],
    aiSuggestions: [
      'Enfócate en empujar con los talones para mantener rodillas atrás',
      'Mantén el pecho alto durante todo el movimiento',
      'Considera agregar trabajo de movilidad de tobillo',
    ],
  },
  {
    id: '2',
    exercise: 'Press de Banca',
    date: '2025-01-25',
    overallScore: 72,
    videoUrl: 'video-2.mp4',
    metrics: [
      {
        name: 'Trayectoria de Barra',
        score: 65,
        feedback: 'La barra no sigue línea recta, se va hacia la cabeza',
        status: 'needs-work',
      },
      {
        name: 'Retracción Escapular',
        score: 80,
        feedback: 'Buena retracción, mantén escápulas juntas',
        status: 'good',
      },
      {
        name: 'Arco Lumbar',
        score: 70,
        feedback: 'Arco presente pero podrías mejorarlo para más estabilidad',
        status: 'good',
      },
      {
        name: 'Punto de Contacto',
        score: 75,
        feedback: 'Tocas en pezones, ideal para fuerza',
        status: 'good',
      },
      {
        name: 'Leg Drive',
        score: 60,
        feedback: 'Piernas no están activas, pierdes estabilidad',
        status: 'needs-work',
      },
    ],
    aiSuggestions: [
      'Visualiza empujar la barra hacia atrás (hacia la cabeza) al subir',
      'Activa las piernas empujando el suelo durante el press',
      'Practica el setup con peso ligero antes del trabajo pesado',
    ],
  },
  {
    id: '3',
    exercise: 'Peso Muerto',
    date: '2025-01-20',
    overallScore: 92,
    videoUrl: 'video-3.mp4',
    metrics: [
      {
        name: 'Posición Inicial',
        score: 95,
        feedback: 'Setup perfecto: cadera alta, hombros sobre barra',
        status: 'excellent',
      },
      {
        name: 'Espalda Neutra',
        score: 90,
        feedback: 'Columna neutral durante todo el rango',
        status: 'excellent',
      },
      {
        name: 'Extensión de Cadera',
        score: 88,
        feedback: 'Excelente lockout con glúteos al final',
        status: 'excellent',
      },
      {
        name: 'Trayectoria de Barra',
        score: 95,
        feedback: 'Barra pegada al cuerpo en todo momento',
        status: 'excellent',
      },
      {
        name: 'Timing Hip Hinge',
        score: 92,
        feedback: 'Bisagra de cadera bien ejecutada',
        status: 'excellent',
      },
    ],
    aiSuggestions: [
      'Técnica ejemplar, mantén esta forma',
      'Podrías experimentar con stance ligeramente más ancho',
      'Considera deficit deadlifts para desarrollar más fuerza del suelo',
    ],
  },
];

export default function FormAnalysis() {
  const [selectedAnalysis, setSelectedAnalysis] = useState<string | null>(null);

  const getScoreColor = (score: number) => {
    if (score >= 90) return '#10B981';
    if (score >= 80) return '#3B82F6';
    if (score >= 70) return '#F59E0B';
    if (score >= 60) return '#F97316';
    return '#EF4444';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent':
        return '#10B981';
      case 'good':
        return '#3B82F6';
      case 'needs-work':
        return '#F59E0B';
      case 'poor':
        return '#EF4444';
      default:
        return '#71717A';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'excellent':
        return 'Excelente';
      case 'good':
        return 'Bueno';
      case 'needs-work':
        return 'Mejorar';
      case 'poor':
        return 'Pobre';
      default:
        return status;
    }
  };

  const uploadVideo = () => {
    Alert.alert(
      'Subir Video',
      'Selecciona un video de tu ejercicio para análisis de forma',
      [
        { text: 'Grabar Nuevo', onPress: () => Alert.alert('Grabando...', 'Función de cámara') },
        { text: 'Seleccionar de Galería', onPress: () => Alert.alert('Galería', 'Selector de video') },
        { text: 'Cancelar', style: 'cancel' },
      ]
    );
  };

  const viewVideoAnalysis = (analysis: FormAnalysis) => {
    setSelectedAnalysis(analysis.id);
    Alert.alert(
      `Análisis: ${analysis.exercise}`,
      `Score: ${analysis.overallScore}/100\n\nEste video muestra ${analysis.metrics.length} métricas analizadas por IA`,
      [
        { text: 'Ver Video' },
        { text: 'Compartir' },
        { text: 'Cerrar', onPress: () => setSelectedAnalysis(null) },
      ]
    );
  };

  const averageScore = Math.round(
    FORM_ANALYSES.reduce((sum, a) => sum + a.overallScore, 0) / FORM_ANALYSES.length
  );

  return (
    <View className="flex-1 bg-zinc-950">
      {/* Header */}
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1 ml-3">
            Análisis de Forma
          </Text>
          <TouchableOpacity onPress={uploadVideo}>
            <Ionicons name="videocam" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Score Summary */}
        <View className="bg-gradient-to-br from-emerald-500 to-blue-500 rounded-xl p-4 mb-4">
          <View className="flex-row items-center justify-between">
            <View className="flex-1">
              <Text className="text-white/80 text-sm mb-1">Score Promedio</Text>
              <Text className="text-white font-bold text-5xl mb-1">
                {averageScore}
              </Text>
              <Text className="text-white/80 text-sm">
                {FORM_ANALYSES.length} análisis completados
              </Text>
            </View>
            <View className="bg-white/20 rounded-full p-4">
              <Ionicons name="eye" size={32} color="white" />
            </View>
          </View>
        </View>

        <TouchableOpacity
          onPress={uploadVideo}
          className="bg-emerald-500 rounded-xl p-4 mb-4"
        >
          <View className="flex-row items-center justify-center">
            <Ionicons name="add-circle" size={20} color="white" />
            <Text className="text-white font-bold ml-2">
              Subir Nuevo Video para Análisis
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          <Text className="text-white font-bold text-lg mb-3">
            Análisis Recientes
          </Text>

          {FORM_ANALYSES.map((analysis) => (
            <TouchableOpacity
              key={analysis.id}
              onPress={() => viewVideoAnalysis(analysis)}
              className={`bg-zinc-900 rounded-xl p-4 mb-4 border-2 ${
                selectedAnalysis === analysis.id ? 'border-emerald-500' : 'border-zinc-800'
              }`}
            >
              {/* Header */}
              <View className="flex-row items-center justify-between mb-3">
                <View className="flex-1">
                  <Text className="text-white font-bold text-xl mb-1">
                    {analysis.exercise}
                  </Text>
                  <Text className="text-zinc-400 text-sm">
                    {new Date(analysis.date).toLocaleDateString('es-ES')}
                  </Text>
                </View>
                <View className="items-center">
                  <View
                    className="w-20 h-20 rounded-full items-center justify-center"
                    style={{ backgroundColor: getScoreColor(analysis.overallScore) + '20' }}
                  >
                    <Text
                      className="font-bold text-3xl"
                      style={{ color: getScoreColor(analysis.overallScore) }}
                    >
                      {analysis.overallScore}
                    </Text>
                  </View>
                  <Text className="text-zinc-400 text-xs mt-1">Score</Text>
                </View>
              </View>

              {/* Metrics */}
              <View className="bg-zinc-800 rounded-lg p-3 mb-3">
                <Text className="text-white font-bold text-sm mb-3">
                  Métricas Analizadas ({analysis.metrics.length})
                </Text>
                {analysis.metrics.map((metric, index) => (
                  <View
                    key={index}
                    className={`mb-3 ${
                      index < analysis.metrics.length - 1 ? 'border-b border-zinc-700 pb-3' : ''
                    }`}
                  >
                    <View className="flex-row items-center justify-between mb-2">
                      <Text className="text-white font-bold">{metric.name}</Text>
                      <View className="flex-row items-center">
                        <View
                          className="px-3 py-1 rounded-full"
                          style={{ backgroundColor: getStatusColor(metric.status) + '20' }}
                        >
                          <Text
                            className="text-xs font-bold"
                            style={{ color: getStatusColor(metric.status) }}
                          >
                            {getStatusLabel(metric.status)}
                          </Text>
                        </View>
                        <Text
                          className="ml-2 font-bold text-lg"
                          style={{ color: getScoreColor(metric.score) }}
                        >
                          {metric.score}
                        </Text>
                      </View>
                    </View>
                    <Text className="text-zinc-400 text-sm">{metric.feedback}</Text>
                    <View className="bg-zinc-700 h-1.5 rounded-full overflow-hidden mt-2">
                      <View
                        className="h-full rounded-full"
                        style={{
                          width: `${metric.score}%`,
                          backgroundColor: getScoreColor(metric.score),
                        }}
                      />
                    </View>
                  </View>
                ))}
              </View>

              {/* AI Suggestions */}
              <View className="bg-blue-500/10 rounded-lg p-3 border border-blue-500/30">
                <View className="flex-row items-center mb-2">
                  <Ionicons name="bulb" size={16} color="#3B82F6" />
                  <Text className="text-blue-400 font-bold text-sm ml-2">
                    Sugerencias IA
                  </Text>
                </View>
                {analysis.aiSuggestions.map((suggestion, index) => (
                  <View key={index} className="flex-row items-start mb-1">
                    <Text className="text-blue-400 mr-2">•</Text>
                    <Text className="text-blue-300 text-sm flex-1">{suggestion}</Text>
                  </View>
                ))}
              </View>

              {/* Actions */}
              <View className="flex-row gap-2 mt-3">
                <TouchableOpacity className="flex-1 bg-zinc-800 rounded-lg p-3">
                  <View className="flex-row items-center justify-center">
                    <Ionicons name="play-circle" size={18} color="white" />
                    <Text className="text-white font-bold ml-2 text-sm">Ver Video</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity className="flex-1 bg-zinc-800 rounded-lg p-3">
                  <View className="flex-row items-center justify-center">
                    <Ionicons name="share-social" size={18} color="white" />
                    <Text className="text-white font-bold ml-2 text-sm">Compartir</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Info Card */}
        <View className="px-6 pb-6 pt-4">
          <View className="bg-amber-500/10 rounded-xl p-4 border border-amber-500/30">
            <View className="flex-row items-start">
              <Ionicons name="information-circle" size={20} color="#F59E0B" />
              <View className="flex-1 ml-3">
                <Text className="text-amber-400 font-bold mb-2">
                  Cómo Grabar para Mejor Análisis
                </Text>
                <Text className="text-amber-300 text-sm mb-2">
                  • Graba desde el lateral para mejor visibilidad{'\n'}
                  • Asegúrate de que todo tu cuerpo esté en cuadro{'\n'}
                  • Usa buena iluminación{'\n'}
                  • Mantén la cámara estable{'\n'}
                  • Graba series completas (3-5 reps)
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
