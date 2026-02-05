import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

type TimerMode = 'stopwatch' | 'countdown' | 'emom' | 'amrap' | 'tabata' | 'rest';

interface TimerPreset {
  id: string;
  name: string;
  mode: TimerMode;
  duration: number;
  rounds?: number;
  work?: number;
  rest?: number;
  icon: string;
  description: string;
}

const TIMER_PRESETS: TimerPreset[] = [
  {
    id: '1',
    name: 'Rest Timer (3 min)',
    mode: 'countdown',
    duration: 180,
    icon: 'â±ï¸',
    description: 'Descanso entre series',
  },
  {
    id: '2',
    name: 'EMOM 10 min',
    mode: 'emom',
    duration: 600,
    rounds: 10,
    icon: 'ðŸ””',
    description: 'Every Minute On the Minute',
  },
  {
    id: '3',
    name: 'AMRAP 12 min',
    mode: 'amrap',
    duration: 720,
    icon: 'â™¾ï¸',
    description: 'As Many Rounds As Possible',
  },
  {
    id: '4',
    name: 'Tabata (20/10)',
    mode: 'tabata',
    duration: 240,
    rounds: 8,
    work: 20,
    rest: 10,
    icon: '⚡',
    description: '8 rounds de 20s trabajo / 10s descanso',
  },
  {
    id: '5',
    name: 'HIIT (40/20)',
    mode: 'tabata',
    duration: 480,
    rounds: 8,
    work: 40,
    rest: 20,
    icon: 'ðŸ”¥',
    description: '8 rounds de 40s trabajo / 20s descanso',
  },
  {
    id: '6',
    name: 'Descanso Corto (90s)',
    mode: 'countdown',
    duration: 90,
    icon: 'â¸ï¸',
    description: 'Entre series accesorios',
  },
];

export default function WorkoutTimer() {
  const [selectedMode, setSelectedMode] = useState<TimerMode | null>(null);
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [targetTime, setTargetTime] = useState(0);
  const [currentRound, setCurrentRound] = useState(1);
  const [totalRounds, setTotalRounds] = useState(1);
  const [isWorkPhase, setIsWorkPhase] = useState(true);
  const [workDuration, setWorkDuration] = useState(20);
  const [restDuration, setRestDuration] = useState(10);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning && !isPaused) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => {
          const newTime = selectedMode === 'stopwatch' ? prevTime + 1 : prevTime - 1;

          // Handle countdown finish
          if (selectedMode === 'countdown' && newTime <= 0) {
            handleTimerFinish();
            return 0;
          }

          // Handle EMOM
          if (selectedMode === 'emom' && newTime % 60 === 0 && newTime > 0) {
            playBeep();
          }

          // Handle AMRAP finish
          if (selectedMode === 'amrap' && newTime <= 0) {
            handleTimerFinish();
            return 0;
          }

          // Handle Tabata/HIIT
          if ((selectedMode === 'tabata') && newTime <= 0) {
            handleIntervalTransition();
            return isWorkPhase ? restDuration : workDuration;
          }

          return newTime;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, isPaused, selectedMode, isWorkPhase, workDuration, restDuration]);

  const handleIntervalTransition = () => {
    if (isWorkPhase) {
      setIsWorkPhase(false);
    } else {
      setIsWorkPhase(true);
      if (currentRound >= totalRounds) {
        handleTimerFinish();
        return;
      }
      setCurrentRound((prev) => prev + 1);
    }
    playBeep();
  };

  const playBeep = () => {
    // In real app, play sound
    console.log('BEEP!');
  };

  const handleTimerFinish = () => {
    setIsRunning(false);
    setIsPaused(false);
    Alert.alert('Timer Completado! 🎉', 'Excelente trabajo!');
  };

  const startTimer = () => {
    setIsRunning(true);
    setIsPaused(false);
  };

  const pauseTimer = () => {
    setIsPaused(!isPaused);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setIsPaused(false);
    setCurrentRound(1);
    setIsWorkPhase(true);
    if (selectedMode === 'stopwatch') {
      setTime(0);
    } else {
      setTime(targetTime);
    }
  };

  const loadPreset = (preset: TimerPreset) => {
    setSelectedMode(preset.mode);
    setTargetTime(preset.duration);
    setTime(preset.mode === 'stopwatch' ? 0 : preset.duration);
    setTotalRounds(preset.rounds || 1);
    setCurrentRound(1);
    setIsWorkPhase(true);
    if (preset.work) setWorkDuration(preset.work);
    if (preset.rest) setRestDuration(preset.rest);
    setIsRunning(false);
    setIsPaused(false);
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(Math.abs(seconds) / 60);
    const secs = Math.abs(seconds) % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimerColor = (): string => {
    if (selectedMode === 'tabata') {
      return isWorkPhase ? 'emerald' : 'amber';
    }
    if (time <= 10 && selectedMode !== 'stopwatch') {
      return 'red';
    }
    return 'blue';
  };

  return (
    <View className="flex-1 bg-zinc-950">
      {/* Header */}
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1 ml-3">
            Workout Timer
          </Text>
          <TouchableOpacity onPress={() => setSelectedMode(null)}>
            <Ionicons name="refresh" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          {!selectedMode ? (
            <>
              {/* Info Card */}
              <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-6">
                <View className="flex-row items-start">
                  <Ionicons name="timer" size={20} color="#9D12DE" />
                  <View className="flex-1 ml-3">
                    <Text className="text-primary/80 font-bold mb-2">
                      Timer Versátil
                    </Text>
                    <Text className="text-primary/60 text-sm">
                      Cronómetro, cuenta regresiva, EMOM, AMRAP, Tabata y más para tus entrenamientos.
                    </Text>
                  </View>
                </View>
              </View>

              {/* Presets */}
              <Text className="text-white font-bold text-lg mb-4">Presets Rápidos</Text>
              {TIMER_PRESETS.map((preset) => (
                <TouchableOpacity
                  key={preset.id}
                  onPress={() => loadPreset(preset)}
                  className="bg-zinc-900 rounded-xl p-4 mb-4 border border-zinc-800"
                  activeOpacity={0.7}
                >
                  <View className="flex-row items-center justify-between">
                    <View className="flex-row items-center flex-1">
                      <View className="w-12 h-12 bg-primary rounded-xl items-center justify-center mr-3">
                        <Text className="text-2xl">{preset.icon}</Text>
                      </View>
                      <View className="flex-1">
                        <Text className="text-white font-bold text-lg mb-1">
                          {preset.name}
                        </Text>
                        <Text className="text-zinc-400 text-sm">{preset.description}</Text>
                      </View>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color="#71717A" />
                  </View>
                </TouchableOpacity>
              ))}

              {/* Manual Modes */}
              <Text className="text-white font-bold text-lg mb-4 mt-4">Modos Manuales</Text>
              <View className="flex-row gap-2 mb-6">
                <TouchableOpacity
                  onPress={() => { setSelectedMode('stopwatch'); setTime(0); }}
                  className="flex-1 bg-primary rounded-xl p-4 items-center"
                >
                  <Ionicons name="stopwatch" size={32} color="white" />
                  <Text className="text-white font-bold mt-2">Cronómetro</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => { setSelectedMode('countdown'); setTime(180); setTargetTime(180); }}
                  className="flex-1 bg-amber-500 rounded-xl p-4 items-center"
                >
                  <Ionicons name="hourglass" size={32} color="white" />
                  <Text className="text-white font-bold mt-2">Countdown</Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <>
              {/* Active Timer */}
              <View className="items-center mb-8">
                {/* Mode Badge */}
                <View className={`bg-${getTimerColor()}-500/10 rounded-lg px-4 py-2 border border-${getTimerColor()}-500/30 mb-4`}>
                  <Text className={`text-${getTimerColor()}-400 font-bold text-sm`}>
                    {selectedMode === 'stopwatch' && 'CRONÃ“METRO'}
                    {selectedMode === 'countdown' && 'CUENTA REGRESIVA'}
                    {selectedMode === 'emom' && 'EMOM'}
                    {selectedMode === 'amrap' && 'AMRAP'}
                    {selectedMode === 'tabata' && (isWorkPhase ? 'TRABAJO' : 'DESCANSO')}
                  </Text>
                </View>

                {/* Main Timer Display */}
                <View className={`w-72 h-72 bg-${getTimerColor()}-500 rounded-full items-center justify-center mb-6 shadow-2xl`}>
                  <Text className="text-white text-7xl font-bold">
                    {formatTime(time)}
                  </Text>
                  {(selectedMode === 'tabata') && (
                    <Text className="text-white text-xl mt-2">
                      Round {currentRound}/{totalRounds}
                    </Text>
                  )}
                </View>

                {/* Controls */}
                <View className="flex-row gap-4 mb-6">
                  {!isRunning ? (
                    <TouchableOpacity
                      onPress={startTimer}
                      className="bg-primary rounded-full w-20 h-20 items-center justify-center shadow-lg"
                    >
                      <Ionicons name="play" size={40} color="white" />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={pauseTimer}
                      className="bg-amber-500 rounded-full w-20 h-20 items-center justify-center shadow-lg"
                    >
                      <Ionicons name={isPaused ? 'play' : 'pause'} size={40} color="white" />
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity
                    onPress={resetTimer}
                    className="bg-red-500 rounded-full w-20 h-20 items-center justify-center shadow-lg"
                  >
                    <Ionicons name="refresh" size={40} color="white" />
                  </TouchableOpacity>
                </View>

                {/* Progress Bar for countdown modes */}
                {(selectedMode !== 'stopwatch' && targetTime > 0) && (
                  <View className="w-full bg-zinc-800 rounded-full h-3 overflow-hidden mb-6">
                    <View
                      className={`h-full bg-${getTimerColor()}-500 rounded-full`}
                      style={{
                        width: `${Math.max(0, Math.min(100, (time / targetTime) * 100))}%`,
                      }}
                    />
                  </View>
                )}
              </View>

              {/* Info Panel */}
              <View className="bg-zinc-900 rounded-xl p-6 border border-zinc-800 mb-6">
                {selectedMode === 'emom' && (
                  <>
                    <Text className="text-white font-bold text-lg mb-3">EMOM Info</Text>
                    <Text className="text-zinc-400 text-sm mb-2">
                      • Suena beep cada minuto{'\n'}
                      • Completa ejercicios y descansa lo que quede{'\n'}
                      • Total: {totalRounds} rondas
                    </Text>
                  </>
                )}
                {selectedMode === 'amrap' && (
                  <>
                    <Text className="text-white font-bold text-lg mb-3">AMRAP Info</Text>
                    <Text className="text-zinc-400 text-sm mb-2">
                      • Completa máximas rondas en tiempo{'\n'}
                      • Mantén técnica perfecta{'\n'}
                      • Anota rondas completadas al final
                    </Text>
                  </>
                )}
                {selectedMode === 'tabata' && (
                  <>
                    <Text className="text-white font-bold text-lg mb-3">Intervalo</Text>
                    <View className="flex-row justify-between">
                      <View className="items-center">
                        <Text className="text-primary font-bold">Trabajo</Text>
                        <Text className="text-white text-2xl font-bold">{workDuration}s</Text>
                      </View>
                      <View className="items-center">
                        <Text className="text-amber-400 font-bold">Descanso</Text>
                        <Text className="text-white text-2xl font-bold">{restDuration}s</Text>
                      </View>
                      <View className="items-center">
                        <Text className="text-primary/80 font-bold">Rondas</Text>
                        <Text className="text-white text-2xl font-bold">{currentRound}/{totalRounds}</Text>
                      </View>
                    </View>
                  </>
                )}
              </View>

              {/* Quick Actions */}
              <View className="flex-row gap-2 mb-6">
                <TouchableOpacity
                  onPress={() => setTime((prev) => prev + 30)}
                  className="flex-1 bg-zinc-900 rounded-xl p-4 items-center border border-zinc-800"
                  disabled={selectedMode === 'stopwatch' || isRunning}
                >
                  <Ionicons name="add-circle" size={24} color={selectedMode === 'stopwatch' || isRunning ? '#3f3f46' : 'white'} />
                  <Text className={selectedMode === 'stopwatch' || isRunning ? 'text-zinc-600 font-bold mt-1' : 'text-white font-bold mt-1'}>
                    +30s
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setTime((prev) => Math.max(0, prev - 30))}
                  className="flex-1 bg-zinc-900 rounded-xl p-4 items-center border border-zinc-800"
                  disabled={selectedMode === 'stopwatch' || isRunning}
                >
                  <Ionicons name="remove-circle" size={24} color={selectedMode === 'stopwatch' || isRunning ? '#3f3f46' : 'white'} />
                  <Text className={selectedMode === 'stopwatch' || isRunning ? 'text-zinc-600 font-bold mt-1' : 'text-white font-bold mt-1'}>
                    -30s
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

