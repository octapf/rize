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

export default function VoiceCommands() {
  const [isListening, setIsListening] = useState(false);
  const [lastCommand, setLastCommand] = useState('');

  const commandCategories = [
    {
      category: 'Logging Workouts',
      commands: [
        { phrase: '"Log 3 sets of bench press"', action: 'Añade ejercicio al workout actual' },
        { phrase: '"100 kilos, 5 reps"', action: 'Registra peso y reps del set' },
        { phrase: '"Add rest timer 2 minutes"', action: 'Inicia rest timer' },
        { phrase: '"Finish workout"', action: 'Completa sesión actual' },
      ],
    },
    {
      category: 'Timer Control',
      commands: [
        { phrase: '"Start timer"', action: 'Inicia rest timer' },
        { phrase: '"Pause timer"', action: 'Pausa timer actual' },
        { phrase: '"Reset timer"', action: 'Resetea timer' },
        { phrase: '"Add 30 seconds"', action: 'Extiende timer' },
      ],
    },
    {
      category: 'Exercise Search',
      commands: [
        { phrase: '"Show me leg exercises"', action: 'Busca ejercicios de pierna' },
        { phrase: '"Alternatives to squat"', action: 'Muestra variaciones' },
        { phrase: '"How to do bench press"', action: 'Abre tutorial de ejercicio' },
      ],
    },
    {
      category: 'Stats & Progress',
      commands: [
        { phrase: '"What\'s my squat PR?"', action: 'Muestra personal record' },
        { phrase: '"Show this week\'s volume"', action: 'Estadísticas semanales' },
        { phrase: '"How many workouts this month?"', action: 'Resumen mensual' },
      ],
    },
  ];

  const siriShortcuts = [
    {
      name: 'Start Workout',
      phrase: 'Hey Siri, start my workout',
      icon: 'fitness',
      color: 'blue',
    },
    {
      name: 'Log Set',
      phrase: 'Hey Siri, log my set',
      icon: 'add-circle',
      color: 'primary',
    },
    {
      name: 'Check Progress',
      phrase: 'Hey Siri, check my progress',
      icon: 'trending-up',
      color: 'purple',
    },
    {
      name: 'Rest Timer',
      phrase: 'Hey Siri, start rest timer',
      icon: 'time',
      color: 'amber',
    },
  ];

  const startListening = () => {
    setIsListening(true);
    setTimeout(() => {
      setIsListening(false);
      setLastCommand('Log 3 sets of bench press');
      Alert.alert('Comando Detectado', 'Añadido: Bench Press 3 sets');
    }, 2000);
  };

  const setupShortcut = (name: string) => {
    Alert.alert('Siri Shortcut', `Configura "${name}" en iOS Shortcuts app`);
  };

  return (
    <View className="flex-1 bg-zinc-950">
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1 ml-3">
            Voice Commands
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          <View className="bg-gradient-to-r from-primary to-[#7D0EBE] rounded-xl p-6 mb-6">
            <Text className="text-white text-2xl font-bold mb-2">Voice Coach</Text>
            <Text className="text-white opacity-90 mb-4">
              Control hands-free durante tu workout
            </Text>
            <View className="flex-row items-center">
              <Ionicons name="mic" size={20} color="white" />
              <Text className="text-white ml-2">Voice control enabled</Text>
            </View>
          </View>

          <TouchableOpacity
            onPress={startListening}
            className={`${
              isListening ? 'bg-red-500' : 'bg-primary'
            } rounded-full w-32 h-32 self-center items-center justify-center mb-6 shadow-lg`}
            style={{
              shadowColor: isListening ? '#ef4444' : '#9D12DE',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.5,
              shadowRadius: 8,
            }}
          >
            <Ionicons name="mic" size={48} color="white" />
            <Text className="text-white font-bold mt-2">
              {isListening ? 'Listening...' : 'Tap to Speak'}
            </Text>
          </TouchableOpacity>

          {lastCommand && (
            <View className="bg-primary/10 rounded-xl p-4 mb-6 border border-primary/30">
              <Text className="text-primary font-bold mb-1">Last Command:</Text>
              <Text className="text-primary/80">"{lastCommand}"</Text>
            </View>
          )}

          <Text className="text-white font-bold text-lg mb-4">Available Commands</Text>

          {commandCategories.map((cat, catIdx) => (
            <View key={catIdx} className="mb-6">
              <Text className="text-zinc-400 font-bold mb-3">{cat.category}</Text>
              {cat.commands.map((cmd, cmdIdx) => (
                <View key={cmdIdx} className="bg-zinc-900 rounded-xl p-4 mb-3 border border-zinc-800">
                  <View className="flex-row items-start mb-2">
                    <Ionicons name="mic-outline" size={20} color="#9D12DE" />
                    <Text className="text-primary/80 font-bold ml-2 flex-1">{cmd.phrase}</Text>
                  </View>
                  <Text className="text-zinc-400 text-sm ml-7">{cmd.action}</Text>
                </View>
              ))}
            </View>
          ))}

          <Text className="text-white font-bold text-lg mb-4 mt-6">Siri Shortcuts</Text>

          {siriShortcuts.map((shortcut, idx) => (
            <TouchableOpacity
              key={idx}
              onPress={() => setupShortcut(shortcut.name)}
              className={`bg-${shortcut.color}-500/10 rounded-xl p-5 mb-4 border border-${shortcut.color}-500/30`}
            >
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center flex-1">
                  <View className={`w-12 h-12 bg-${shortcut.color}-500 rounded-xl items-center justify-center mr-4`}>
                    <Ionicons name={shortcut.icon as any} size={24} color="white" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-white font-bold mb-1">{shortcut.name}</Text>
                    <Text className="text-zinc-400 text-sm">"{shortcut.phrase}"</Text>
                  </View>
                </View>
                <Ionicons name="add-circle" size={24} color="#9D12DE" />
              </View>
            </TouchableOpacity>
          ))}

          <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-6">
            <Text className="text-primary/80 font-bold mb-2">Voice Control Tips</Text>
            <Text className="text-primary/60 text-sm">
              • Speak clearly cerca del micrófono{'\n'}
              • Ambiente silencioso = mejor recognition{'\n'}
              • Usa comandos exactos{'\n'}
              • Configura Siri Shortcuts para atajos{'\n'}
              • Perfect para workout sin manos libres
            </Text>
          </View>

          <View className="bg-amber-500/10 rounded-xl p-4 border border-amber-500/30 mb-6">
            <View className="flex-row items-start">
              <Ionicons name="information-circle" size={24} color="#FFEA00" />
              <View className="flex-1 ml-3">
                <Text className="text-amber-400 font-bold mb-1">iOS Integration</Text>
                <Text className="text-amber-300 text-sm">
                  Voice commands se integran con iOS Speech Recognition. Siri Shortcuts disponible en iOS Settings {'>'} Shortcuts.
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}



