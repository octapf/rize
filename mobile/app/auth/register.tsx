import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuthStore } from '@/stores/authStore';
import { useToast } from '@/contexts/ToastContext';

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const register = useAuthStore((state) => state.register);
  const toast = useToast();

  const validateForm = () => {
    if (!name.trim() || !email.trim() || !username.trim() || !password.trim() || !confirmPassword.trim()) {
      toast.error('Por favor completa todos los campos');
      return false;
    }

    if (!email.includes('@')) {
      toast.error('Email inválido');
      return false;
    }

    if (username.length < 3) {
      toast.error('El usuario debe tener al menos 3 caracteres');
      return false;
    }

    if (password.length < 8) {
      toast.error('La contraseña debe tener al menos 8 caracteres');
      return false;
    }

    if (password !== confirmPassword) {
      toast.error('Las contraseñas no coinciden');
      return false;
    }

    return true;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      await register({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        username: username.trim().toLowerCase(),
        password,
      });

      toast.success('¡Cuenta creada exitosamente!');
      // Entrar directo a la cuenta
      router.replace('/(tabs)');
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || 'No se pudo crear la cuenta';
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
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
          colors={['#8B5CF6', '#7C3AED']}
          className="pt-16 pb-8 px-6"
        >
          <TouchableOpacity
            onPress={() => router.back()}
            className="mb-6"
          >
            <Ionicons name="arrow-back" size={28} color="white" />
          </TouchableOpacity>

          <Text className="text-white text-3xl font-bold mb-2">
            Crea tu cuenta
          </Text>
          <Text className="text-purple-100 text-base">
            Comienza tu viaje fitness hoy
          </Text>
        </LinearGradient>

        <View className="flex-1 px-6 pt-8 pb-8">
          {/* Form */}
          <View className="gap-4 mb-6">
            {/* Name */}
            <View>
              <Text className="text-gray-700 font-semibold mb-2">Nombre completo</Text>
              <View className="flex-row items-center bg-white border-2 border-gray-200 rounded-xl px-4 py-3">
                <Ionicons name="person-outline" size={20} color="#6B7280" />
                <TextInput
                  value={name}
                  onChangeText={setName}
                  placeholder="Juan Pérez"
                  autoCapitalize="words"
                  className="flex-1 ml-3 text-gray-900 text-base"
                />
              </View>
            </View>

            {/* Username */}
            <View>
              <Text className="text-gray-700 font-semibold mb-2">Nombre de usuario</Text>
              <View className="flex-row items-center bg-white border-2 border-gray-200 rounded-xl px-4 py-3">
                <Ionicons name="at" size={20} color="#6B7280" />
                <TextInput
                  value={username}
                  onChangeText={(text) => setUsername(text.toLowerCase())}
                  placeholder="usuario123"
                  autoCapitalize="none"
                  className="flex-1 ml-3 text-gray-900 text-base"
                />
              </View>
              <Text className="text-gray-500 text-xs mt-1">
                Mínimo 3 caracteres, solo letras y números
              </Text>
            </View>

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
              <Text className="text-gray-500 text-xs mt-1">
                Mínimo 8 caracteres
              </Text>
            </View>

            {/* Confirm Password */}
            <View>
              <Text className="text-gray-700 font-semibold mb-2">Confirmar contraseña</Text>
              <View className="flex-row items-center bg-white border-2 border-gray-200 rounded-xl px-4 py-3">
                <Ionicons name="lock-closed-outline" size={20} color="#6B7280" />
                <TextInput
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  placeholder="••••••••"
                  secureTextEntry={!showConfirmPassword}
                  autoCapitalize="none"
                  className="flex-1 ml-3 text-gray-900 text-base"
                />
                <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                  <Ionicons
                    name={showConfirmPassword ? 'eye-off-outline' : 'eye-outline'}
                    size={20}
                    color="#6B7280"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Terms */}
          <View className="mb-6">
            <Text className="text-gray-600 text-sm text-center">
              Al registrarte aceptas nuestros{' '}
              <Text className="text-purple-600 font-semibold">Términos de Servicio</Text>
              {' '}y{' '}
              <Text className="text-purple-600 font-semibold">Política de Privacidad</Text>
            </Text>
          </View>

          {/* Register Button */}
          <TouchableOpacity
            onPress={handleRegister}
            disabled={isLoading}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['#8B5CF6', '#7C3AED']}
              className="py-4 rounded-xl items-center"
            >
              <Text className="text-white text-lg font-bold">
                {isLoading ? 'Creando cuenta...' : 'Crear Cuenta'}
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Login Link */}
          <View className="flex-row items-center justify-center mt-6">
            <Text className="text-gray-600">¿Ya tienes cuenta? </Text>
            <TouchableOpacity onPress={() => router.back()}>
              <Text className="text-purple-600 font-bold">Inicia Sesión</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
