import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Dimensions,
  TextInput,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuthStore } from '@/stores/authStore';

const { width } = Dimensions.get('window');

interface OnboardingStep {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  color1: string;
  color2: string;
  type: 'info' | 'input';
}

const steps: OnboardingStep[] = [
  {
    id: '1',
    title: '¡Bienvenido a RIZE!',
    subtitle: 'Tu compañero definitivo para alcanzar tus metas fitness',
    icon: 'fitness',
    color1: '#9D12DE',
    color2: '#7C3AED',
    type: 'info',
  },
  {
    id: '2',
    title: 'Configura tu perfil',
    subtitle: 'Cuéntanos un poco sobre ti para personalizar tu experiencia',
    icon: 'person',
    color1: '#8B5CF6',
    color2: '#7C3AED',
    type: 'input',
  },
  {
    id: '3',
    title: 'Define tus objetivos',
    subtitle: 'Establece metas claras y alcanzables',
    icon: 'trophy',
    color1: '#9D12DE',
    color2: '#7C3AED',
    type: 'input',
  },
  {
    id: '4',
    title: '¡Listo para comenzar!',
    subtitle: 'Empieza tu viaje fitness hoy mismo',
    icon: 'rocket',
    color1: '#FFEA00',
    color2: '#D97706',
    type: 'info',
  },
];

export default function OnboardingScreen() {
  const [currentStep, setCurrentStep] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const updateUser = useAuthStore((state) => state.updateUser);

  // Form data
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [targetWeight, setTargetWeight] = useState('');
  const [goal, setGoal] = useState<'lose' | 'gain' | 'maintain' | null>(null);

  const handleNext = () => {
    const step = steps[currentStep];

    if (step.type === 'input' && step.id === '2') {
      if (!age || !weight || !height) {
        Alert.alert('Error', 'Por favor completa todos los campos');
        return;
      }
    }

    if (step.type === 'input' && step.id === '3') {
      if (!targetWeight || !goal) {
        Alert.alert('Error', 'Por favor define tu objetivo');
        return;
      }
    }

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      flatListRef.current?.scrollToIndex({ index: currentStep + 1 });
    } else {
      handleFinish();
    }
  };

  const handleSkip = () => {
    setCurrentStep(steps.length - 1);
    flatListRef.current?.scrollToIndex({ index: steps.length - 1 });
  };

  const handleFinish = async () => {
    try {
      await updateUser({
        age: parseInt(age) || undefined,
        weight: parseFloat(weight) || undefined,
        height: parseFloat(height) || undefined,
        targetWeight: parseFloat(targetWeight) || undefined,
        goal: goal || undefined,
        onboardingCompleted: true,
      });

      router.replace('/(tabs)');
    } catch (error) {
      Alert.alert('Error', 'No se pudo completar la configuración');
    }
  };

  const renderStep = ({ item }: { item: OnboardingStep }) => {
    return (
      <View style={{ width }} className="px-6 pb-12">
        <LinearGradient
          colors={[item.color1, item.color2]}
          className="flex-1 rounded-3xl p-8 items-center justify-center"
        >
          <View className="w-32 h-32 bg-white rounded-full items-center justify-center mb-8">
            <Ionicons name={item.icon as any} size={64} color={item.color1} />
          </View>

          <Text className="text-white text-3xl font-bold text-center mb-4">
            {item.title}
          </Text>

          <Text className="text-white/90 text-lg text-center mb-8">
            {item.subtitle}
          </Text>

          {/* Step 2: Personal Info */}
          {item.id === '2' && (
            <View className="w-full gap-4">
              <View className="bg-white/20 rounded-xl px-4 py-3">
                <Text className="text-white/80 text-sm mb-1">Edad</Text>
                <TextInput
                  value={age}
                  onChangeText={setAge}
                  placeholder="25"
                  placeholderTextColor="#fff8"
                  keyboardType="number-pad"
                  className="text-white text-lg font-bold"
                />
              </View>

              <View className="flex-row gap-3">
                <View className="flex-1 bg-white/20 rounded-xl px-4 py-3">
                  <Text className="text-white/80 text-sm mb-1">Peso (kg)</Text>
                  <TextInput
                    value={weight}
                    onChangeText={setWeight}
                    placeholder="70"
                    placeholderTextColor="#fff8"
                    keyboardType="decimal-pad"
                    className="text-white text-lg font-bold"
                  />
                </View>

                <View className="flex-1 bg-white/20 rounded-xl px-4 py-3">
                  <Text className="text-white/80 text-sm mb-1">Altura (cm)</Text>
                  <TextInput
                    value={height}
                    onChangeText={setHeight}
                    placeholder="175"
                    placeholderTextColor="#fff8"
                    keyboardType="number-pad"
                    className="text-white text-lg font-bold"
                  />
                </View>
              </View>
            </View>
          )}

          {/* Step 3: Goals */}
          {item.id === '3' && (
            <View className="w-full gap-4">
              <View className="bg-white/20 rounded-xl px-4 py-3">
                <Text className="text-white/80 text-sm mb-1">Peso Objetivo (kg)</Text>
                <TextInput
                  value={targetWeight}
                  onChangeText={setTargetWeight}
                  placeholder="75"
                  placeholderTextColor="#fff8"
                  keyboardType="decimal-pad"
                  className="text-white text-lg font-bold"
                />
              </View>

              <Text className="text-white font-semibold">Tu objetivo es:</Text>
              <View className="gap-2">
                {[
                  { id: 'lose', label: 'Perder peso', icon: 'trending-down' },
                  { id: 'gain', label: 'Ganar músculo', icon: 'trending-up' },
                  { id: 'maintain', label: 'Mantener', icon: 'remove' },
                ].map((option) => (
                  <TouchableOpacity
                    key={option.id}
                    onPress={() => setGoal(option.id as any)}
                    className={`flex-row items-center gap-3 p-4 rounded-xl ${
                      goal === option.id ? 'bg-white' : 'bg-white/20'
                    }`}
                  >
                    <Ionicons
                      name={option.icon as any}
                      size={24}
                      color={goal === option.id ? item.color1 : 'white'}
                    />
                    <Text
                      className={`font-bold text-lg ${
                        goal === option.id ? 'text-gray-900' : 'text-white'
                      }`}
                    >
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}
        </LinearGradient>
      </View>
    );
  };

  return (
    <View className="flex-1 bg-gray-50 pt-12">
      {/* Progress Bar */}
      <View className="px-6 mb-4">
        <View className="flex-row gap-2">
          {steps.map((_, index) => (
            <View
              key={index}
              className={`flex-1 h-1 rounded-full ${
                index <= currentStep ? 'bg-primary' : 'bg-gray-300'
              }`}
            />
          ))}
        </View>
      </View>

      {/* Steps */}
      <FlatList
        ref={flatListRef}
        data={steps}
        renderItem={renderStep}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
      />

      {/* Actions */}
      <View className="px-6 pb-8 gap-3">
        <TouchableOpacity
          onPress={handleNext}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={[steps[currentStep].color1, steps[currentStep].color2]}
            className="py-4 rounded-xl items-center"
          >
            <Text className="text-white text-lg font-bold">
              {currentStep === steps.length - 1 ? '¡Comenzar!' : 'Continuar'}
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        {currentStep < steps.length - 1 && (
          <TouchableOpacity
            onPress={handleSkip}
            className="py-3 rounded-xl items-center"
          >
            <Text className="text-gray-600 font-semibold">
              Saltar
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

