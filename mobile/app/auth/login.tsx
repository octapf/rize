import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuthStore } from '@/stores/authStore';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const login = useAuthStore((state) => state.login);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    if (!email.includes('@')) {
      Alert.alert('Error', 'Email inválido');
      return;
    }

    setIsLoading(true);

    try {
      // Simular llamada API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      await login(email, password);
      router.replace('/(tabs)');
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Credenciales inválidas');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    Alert.alert('Google Login', 'Función en desarrollo');
  };

  const handleAppleLogin = () => {
    Alert.alert('Apple Login', 'Función en desarrollo');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-gray-50"
    >
      <ScrollView
        contentContainerClassName="flex-grow"
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <LinearGradient
          colors={['#3B82F6', '#2563EB']}
          className="pt-16 pb-12 px-6 rounded-b-3xl"
        >
          <View className="items-center">
            <View className="w-24 h-24 bg-white rounded-3xl items-center justify-center mb-4 shadow-lg">
              <Ionicons name="fitness" size={48} color="#3B82F6" />
            </View>
            <Text className="text-white text-4xl font-bold mb-2">RIZE</Text>
            <Text className="text-blue-100 text-lg">Eleva tu entrenamiento</Text>
          </View>
        </LinearGradient>

        <View className="flex-1 px-6 pt-8">
          {/* Title */}
          <View className="mb-8">
            <Text className="text-gray-900 text-3xl font-bold mb-2">
              Bienvenido
            </Text>
            <Text className="text-gray-600 text-base">
              Inicia sesión para continuar
            </Text>
          </View>

          {/* Form */}
          <View className="gap-4 mb-6">
            {/* Email */}
            <View>
              <Text className="text-gray-700 font-semibold mb-2">Email</Text>
              <View className="flex-row items-center bg-white border-2 border-gray-200 rounded-xl px-4 py-3">
                <Ionicons name="mail-outline" size={20} color="#6B7280" />
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder="tu@email.com"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                  className="flex-1 ml-3 text-gray-900 text-base"
                />
              </View>
            </View>

            {/* Password */}
            <View>
              <Text className="text-gray-700 font-semibold mb-2">Contraseña</Text>
              <View className="flex-row items-center bg-white border-2 border-gray-200 rounded-xl px-4 py-3">
                <Ionicons name="lock-closed-outline" size={20} color="#6B7280" />
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  placeholder="••••••••"
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  className="flex-1 ml-3 text-gray-900 text-base"
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Ionicons
                    name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                    size={20}
                    color="#6B7280"
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Forgot Password */}
            <TouchableOpacity
              onPress={() => router.push('/auth/forgot-password')}
              className="self-end"
            >
              <Text className="text-blue-600 font-semibold">
                ¿Olvidaste tu contraseña?
              </Text>
            </TouchableOpacity>
          </View>

          {/* Login Button */}
          <TouchableOpacity
            onPress={handleLogin}
            disabled={isLoading}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['#3B82F6', '#2563EB']}
              className="py-4 rounded-xl items-center"
            >
              <Text className="text-white text-lg font-bold">
                {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Divider */}
          <View className="flex-row items-center my-6">
            <View className="flex-1 h-px bg-gray-300" />
            <Text className="text-gray-500 px-4">O continúa con</Text>
            <View className="flex-1 h-px bg-gray-300" />
          </View>

          {/* Social Login */}
          <View className="gap-3 mb-8">
            <TouchableOpacity
              onPress={handleGoogleLogin}
              className="flex-row items-center justify-center bg-white border-2 border-gray-200 py-3 rounded-xl"
            >
              <Ionicons name="logo-google" size={24} color="#DB4437" />
              <Text className="text-gray-900 font-semibold ml-3">
                Continuar con Google
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleAppleLogin}
              className="flex-row items-center justify-center bg-black py-3 rounded-xl"
            >
              <Ionicons name="logo-apple" size={24} color="white" />
              <Text className="text-white font-semibold ml-3">
                Continuar con Apple
              </Text>
            </TouchableOpacity>
          </View>

          {/* Register Link */}
          <View className="flex-row items-center justify-center mb-8">
            <Text className="text-gray-600">¿No tienes cuenta? </Text>
            <TouchableOpacity onPress={() => router.push('/auth/register')}>
              <Text className="text-blue-600 font-bold">Regístrate</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
