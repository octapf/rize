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

export default function FormAnalysis() {
  const [selectedExercise, setSelectedExercise] = useState<string>('squat');

  const exercises = [
    { key: 'squat', label: 'Squat', icon: 'fitness' },
    { key: 'bench', label: 'Bench Press', icon: 'barbell' },
    { key: 'deadlift', label: 'Deadlift', icon: 'barbell' },
    { key: 'ohp', label: 'Overhead Press', icon: 'fitness' },
  ];

  const formChecks = {
    squat: [
      { point: 'Depth', status: 'good', desc: 'Parallel or below' },
      { point: 'Knee Tracking', status: 'warning', desc: 'Slight valgus collapse' },
      { point: 'Bar Path', status: 'good', desc: 'Vertical line maintained' },
      { point: 'Back Angle', status: 'good', desc: 'Neutral spine' },
    ],
    bench: [
      { point: 'Bar Path', status: 'good', desc: 'Straight line to chest' },
      { point: 'Elbow Position', status: 'good', desc: '45-75Â° angle' },
      { point: 'Arch', status: 'warning', desc: 'Could be more pronounced' },
      { point: 'Leg Drive', status: 'critical', desc: 'Feet unstable' },
    ],
    deadlift: [
      { point: 'Setup Position', status: 'good', desc: 'Hips at correct height' },
      { point: 'Back Angle', status: 'good', desc: 'Neutral spine' },
      { point: 'Bar Path', status: 'warning', desc: 'Bar drifts slightly forward' },
      { point: 'Lockout', status: 'good', desc: 'Full hip extension' },
    ],
    ohp: [
      { point: 'Bar Path', status: 'good', desc: 'Straight overhead' },
      { point: 'Core Bracing', status: 'warning', desc: 'Some lower back extension' },
      { point: 'Head Position', status: 'good', desc: 'Through the window' },
      { point: 'Lockout', status: 'good', desc: 'Full elbow extension' },
    ],
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'emerald';
      case 'warning': return 'amber';
      case 'critical': return 'red';
      default: return 'zinc';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'good': return 'checkmark-circle';
      case 'warning': return 'alert-circle';
      case 'critical': return 'close-circle';
      default: return 'help-circle';
    }
  };

  const recordVideo = () => {
    Alert.alert('Record Video', 'Camera functionality would open here to record your set');
  };

  const analyzeForm = () => {
    Alert.alert('AI Analysis', 'Form analysis would process here using computer vision');
  };

  const currentChecks = formChecks[selectedExercise as keyof typeof formChecks];
  const score = Math.round((currentChecks.filter(c => c.status === 'good').length / currentChecks.length) * 100);

  return (
    <View className="flex-1 bg-zinc-950">
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1 ml-3">
            Form Analysis
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          <View className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl p-6 mb-6">
            <Text className="text-white text-2xl font-bold mb-2">AI Form Check</Text>
            <Text className="text-white opacity-90 mb-4">
              Mejora tu tÃ©cnica con anÃ¡lisis de video
            </Text>
            <View className="flex-row items-center">
              <Ionicons name="videocam" size={20} color="white" />
              <Text className="text-white ml-2">24 videos analizados</Text>
            </View>
          </View>

          <Text className="text-white font-bold text-lg mb-4">Select Exercise</Text>

          <View className="flex-row flex-wrap gap-3 mb-6">
            {exercises.map((ex) => (
              <TouchableOpacity
                key={ex.key}
                onPress={() => setSelectedExercise(ex.key)}
                className={`flex-1 min-w-[45%] ${
                  selectedExercise === ex.key ? 'bg-primary' : 'bg-zinc-900'
                } rounded-xl p-4 border ${
                  selectedExercise === ex.key ? 'border-blue-400' : 'border-zinc-800'
                }`}
              >
                <Ionicons
                  name={ex.icon as any}
                  size={24}
                  color={selectedExercise === ex.key ? 'white' : '#71717a'}
                />
                <Text
                  className={`${
                    selectedExercise === ex.key ? 'text-white' : 'text-zinc-400'
                  } font-bold mt-2`}
                >
                  {ex.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View className="bg-zinc-900 rounded-xl p-4 mb-6 border border-zinc-800">
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-white font-bold text-lg">Form Score</Text>
              <Text className={`text-3xl font-bold ${score >= 80 ? 'text-primary' : score >= 60 ? 'text-amber-400' : 'text-red-400'}`}>
                {score}%
              </Text>
            </View>

            <View className="bg-zinc-800 rounded-full h-3 mb-2">
              <View
                className={`h-3 rounded-full ${score >= 80 ? 'bg-primary' : score >= 60 ? 'bg-amber-500' : 'bg-red-500'}`}
                style={{ width: `${score}%` }}
              />
            </View>

            <Text className="text-zinc-400 text-sm">
              {score >= 80 ? 'Excelente tÃ©cnica!' : score >= 60 ? 'Mejorable' : 'Necesita correcciÃ³n'}
            </Text>
          </View>

          <Text className="text-white font-bold text-lg mb-4">Form Checks</Text>

          {currentChecks.map((check, idx) => (
            <View
              key={idx}
              className={`bg-${getStatusColor(check.status)}-500/10 rounded-xl p-4 mb-3 border border-${getStatusColor(check.status)}-500/30`}
            >
              <View className="flex-row items-center mb-2">
                <Ionicons
                  name={getStatusIcon(check.status) as any}
                  size={24}
                  color={
                    check.status === 'good' ? '#9D12DE' :
                    check.status === 'warning' ? '#FFEA00' : '#ef4444'
                  }
                />
                <Text className="text-white font-bold ml-3 flex-1">{check.point}</Text>
                <View className={`bg-${getStatusColor(check.status)}-500 rounded-full px-3 py-1`}>
                  <Text className="text-white text-xs font-bold uppercase">
                    {check.status}
                  </Text>
                </View>
              </View>
              <Text className="text-zinc-400 text-sm ml-9">{check.desc}</Text>
            </View>
          ))}

          <TouchableOpacity
            onPress={recordVideo}
            className="bg-red-500 rounded-xl py-4 mb-3 flex-row items-center justify-center"
          >
            <Ionicons name="videocam" size={24} color="white" />
            <Text className="text-white font-bold ml-2 text-lg">Record New Video</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={analyzeForm}
            className="bg-primary rounded-xl py-4 mb-6 flex-row items-center justify-center"
          >
            <Ionicons name="analytics" size={24} color="white" />
            <Text className="text-white font-bold ml-2 text-lg">Analyze Form</Text>
          </TouchableOpacity>

          <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-6">
            <Text className="text-primary/80 font-bold mb-2">Tips para Grabar</Text>
            <Text className="text-primary/60 text-sm">
              â€¢ Graba desde un Ã¡ngulo lateral{'\n'}
              â€¢ Asegura buena iluminaciÃ³n{'\n'}
              â€¢ Incluye setup completo{'\n'}
              â€¢ Filma al menos 3 reps{'\n'}
              â€¢ Usa trÃ­pode o apoyo estable
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

