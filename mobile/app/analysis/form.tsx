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
        name: 'PosiciÃ³n de Rodillas',
        score: 75,
        feedback: 'Rodillas se adelantan ligeramente. Intenta sentarte mÃ¡s atrÃ¡s',
        status: 'good',
      },
      {
        name: 'Espalda Neutra',
        score: 95,
        feedback: 'Columna perfectamente neutra durante todo el movimiento',
        status: 'excellent',
      },
      {
        name: 'Velocidad ConcÃ©ntrica',
        score: 80,
        feedback: 'Buena explosividad en la subida',
        status: 'good',
      },
      {
        name: 'Control ExcÃ©ntrico',
        score: 85,
        feedback: 'Descenso controlado, podrÃ­as ser mÃ¡s lento para mayor TUT',
        status: 'good',
      },
    ],
    aiSuggestions: [
      'EnfÃ³cate en empujar con los talones para mantener rodillas atrÃ¡s',
      'MantÃ©n el pecho alto durante todo el movimiento',
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
        feedback: 'La barra no sigue lÃ­nea recta, se va hacia la cabeza',
        status: 'needs-work',
      },
      {
        name: 'RetracciÃ³n Escapular',
        score: 80,
        feedback: 'Buena retracciÃ³n, mantÃ©n escÃ¡pulas juntas',
        status: 'good',
      },
      {
        name: 'Arco Lumbar',
        score: 70,
        feedback: 'Arco presente pero podrÃ­as mejorarlo para mÃ¡s estabilidad',
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
        feedback: 'Piernas no estÃ¡n activas, pierdes estabilidad',
        status: 'needs-work',
      },
    ],
    aiSuggestions: [
      'Visualiza empujar la barra hacia atrÃ¡s (hacia la cabeza) al subir',
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
        name: 'PosiciÃ³n Inicial',
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
        name: 'ExtensiÃ³n de Cadera',
        score: 88,
        feedback: 'Excelente lockout con glÃºteos al final',
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
      'TÃ©cnica ejemplar, mantÃ©n esta forma',
      'PodrÃ­as experimentar con stance ligeramente mÃ¡s ancho',
      'Considera deficit deadlifts para desarrollar mÃ¡s fuerza del suelo',
    ],
  },
];

export default function FormAnalysis() {
  const [selectedAnalysis, setSelectedAnalysis] = useState<string | null>(null);

  const getScoreColor = (score: number) => {
    if (score >= 90) return '#9D12DE';
    if (score >= 80) return '#9D12DE';
    if (score >= 70) return '#FFEA00';
    if (score >= 60) return '#F97316';
    return '#EF4444';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent':
        return '#9D12DE';
      case 'good':
        return '#9D12DE';
      case 'needs-work':
        return '#FFEA00';
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
      'Selecciona un video de tu ejercicio para anÃ¡lisis de forma',
      [
        { text: 'Grabar Nuevo', onPress: () => Alert.alert('Grabando...', 'FunciÃ³n de cÃ¡mara') },
        { text: 'Seleccionar de GalerÃ­a', onPress: () => Alert.alert('GalerÃ­a', 'Selector de video') },
        { text: 'Cancelar', style: 'cancel' },
      ]
    );
  };

  const viewVideoAnalysis = (analysis: FormAnalysis) => {
    setSelectedAnalysis(analysis.id);
    Alert.alert(
      `AnÃ¡lisis: ${analysis.exercise}`,
      `Score: ${analysis.overallScore}/100\n\nEste video muestra ${analysis.metrics.length} mÃ©tricas analizadas por IA`,
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
            AnÃ¡lisis de Forma
          </Text>
          <TouchableOpacity onPress={uploadVideo}>
            <Ionicons name="videocam" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Score Summary */}
        <View className="bg-gradient-to-br from-primary to-[#7D0EBE] rounded-xl p-4 mb-4">
          <View className="flex-row items-center justify-between">
            <View className="flex-1">
              <Text className="text-white/80 text-sm mb-1">Score Promedio</Text>
              <Text className="text-white font-bold text-5xl mb-1">
                {averageScore}
              </Text>
              <Text className="text-white/80 text-sm">
                {FORM_ANALYSES.length} anÃ¡lisis completados
              </Text>
            </View>
            <View className="bg-white/20 rounded-full p-4">
              <Ionicons name="eye" size={32} color="white" />
            </View>
          </View>
        </View>

        <TouchableOpacity
          onPress={uploadVideo}
          className="bg-primary rounded-xl p-4 mb-4"
        >
          <View className="flex-row items-center justify-center">
            <Ionicons name="add-circle" size={20} color="white" />
            <Text className="text-white font-bold ml-2">
              Subir Nuevo Video para AnÃ¡lisis
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          <Text className="text-white font-bold text-lg mb-3">
            AnÃ¡lisis Recientes
          </Text>

          {FORM_ANALYSES.map((analysis) => (
            <TouchableOpacity
              key={analysis.id}
              onPress={() => viewVideoAnalysis(analysis)}
              className={`bg-zinc-900 rounded-xl p-4 mb-4 border-2 ${
                selectedAnalysis === analysis.id ? 'border-primary' : 'border-zinc-800'
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
                  MÃ©tricas Analizadas ({analysis.metrics.length})
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
              <View className="bg-primary/10 rounded-lg p-3 border border-primary/30">
                <View className="flex-row items-center mb-2">
                  <Ionicons name="bulb" size={16} color="#9D12DE" />
                  <Text className="text-primary/80 font-bold text-sm ml-2">
                    Sugerencias IA
                  </Text>
                </View>
                {analysis.aiSuggestions.map((suggestion, index) => (
                  <View key={index} className="flex-row items-start mb-1">
                    <Text className="text-primary/80 mr-2">â€¢</Text>
                    <Text className="text-primary/60 text-sm flex-1">{suggestion}</Text>
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
              <Ionicons name="information-circle" size={20} color="#FFEA00" />
              <View className="flex-1 ml-3">
                <Text className="text-amber-400 font-bold mb-2">
                  CÃ³mo Grabar para Mejor AnÃ¡lisis
                </Text>
                <Text className="text-amber-300 text-sm mb-2">
                  â€¢ Graba desde el lateral para mejor visibilidad{'\n'}
                  â€¢ AsegÃºrate de que todo tu cuerpo estÃ© en cuadro{'\n'}
                  â€¢ Usa buena iluminaciÃ³n{'\n'}
                  â€¢ MantÃ©n la cÃ¡mara estable{'\n'}
                  â€¢ Graba series completas (3-5 reps)
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}


