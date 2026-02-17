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

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleResetPassword = async () => {
    if (!email.trim()) {
      Alert.alert('Error', 'Por favor ingresa tu email');
      return;
    }

    if (!email.includes('@')) {
      Alert.alert('Error', 'Email inválido');
      return;
    }

    setIsLoading(true);

    try {
      // Simular llamada API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setEmailSent(true);
    } catch (error: any) {
      Alert.alert('Error', 'No se pudo enviar el email');
    } finally {
      setIsLoading(false);
    }
  };

  if (emailSent) {
    return (
      <View className="flex-1 bg-gray-50">
        <LinearGradient
          colors={['#9D12DE', '#7C3AED']}
          className="flex-1 pt-16 px-6"
        >
          <TouchableOpacity
            onPress={() => router.back()}
            className="mb-12"
          >
            <Ionicons name="arrow-back" size={28} color="white" />
          </TouchableOpacity>

          <View className="flex-1 items-center justify-center">
            <View className="w-24 h-24 bg-white rounded-full items-center justify-center mb-6">
              <Ionicons name="mail" size={48} color="#9D12DE" />
            </View>

            <Text className="text-white text-3xl font-bold text-center mb-4">
              Email Enviado
            </Text>

            <Text className="text-primary/50 text-lg text-center mb-8 px-4">
              Hemos enviado instrucciones para restablecer tu contraseña a{'\n'}
              <Text className="font-bold">{email}</Text>
            </Text>

            <View className="bg-white/20 p-4 rounded-2xl mb-8">
              <Text className="text-white text-center">
                Revisa tu bandeja de entrada y spam.{'\n'}
                El link expira en 1 hora.
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => router.back()}
              className="bg-white py-4 px-8 rounded-xl"
            >
              <Text className="text-primary font-bold text-lg">
                Volver al Login
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleResetPassword}
              className="mt-6"
            >
              <Text className="text-white font-semibold">
                Reenviar Email
              </Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
    );
  }

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
          colors={['#FFEA00', '#D97706']}
          className="pt-16 pb-12 px-6"
        >
          <TouchableOpacity
            onPress={() => router.back()}
            className="mb-8"
          >
            <Ionicons name="arrow-back" size={28} color="white" />
          </TouchableOpacity>

          <View className="items-center">
            <View className="w-20 h-20 bg-white rounded-full items-center justify-center mb-4">
              <Ionicons name="lock-closed" size={40} color="#FFEA00" />
            </View>
            <Text className="text-white text-3xl font-bold text-center mb-2">
              ¿Olvidaste tu{'\n'}contraseña?
            </Text>
            <Text className="text-amber-100 text-base text-center">
              No te preocupes, te ayudaremos
            </Text>
          </View>
        </LinearGradient>

        <View className="flex-1 px-6 pt-8">
          {/* Info */}
          <View className="bg-primary/5 p-4 rounded-2xl mb-6 flex-row gap-3">
            <Ionicons name="information-circle" size={24} color="#9D12DE" />
            <Text className="text-text flex-1">
              Te enviaremos un enlace para restablecer tu contraseña a tu email
            </Text>
          </View>

          {/* Email Input */}
          <View className="mb-6">
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
                autoFocus
                className="flex-1 ml-3 text-gray-900 text-base"
              />
            </View>
          </View>

          {/* Reset Button */}
          <TouchableOpacity
            onPress={handleResetPassword}
            disabled={isLoading}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['#FFEA00', '#D97706']}
              className="py-4 rounded-xl items-center"
            >
              <Text className="text-white text-lg font-bold">
                {isLoading ? 'Enviando...' : 'Enviar Instrucciones'}
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Back to Login */}
          <View className="flex-row items-center justify-center mt-6">
            <Text className="text-gray-600">¿Recordaste tu contraseña? </Text>
            <TouchableOpacity onPress={() => router.back()}>
              <Text className="text-amber-600 font-bold">Inicia Sesión</Text>
            </TouchableOpacity>
          </View>

          {/* Help */}
          <View className="mt-12 p-6 bg-gray-100 rounded-2xl">
            <Text className="text-gray-900 font-bold text-center mb-2">
              ¿Necesitas ayuda?
            </Text>
            <Text className="text-gray-600 text-center text-sm mb-4">
              Si tienes problemas para acceder a tu cuenta, contáctanos
            </Text>
            <TouchableOpacity className="bg-gray-800 py-3 rounded-lg">
              <Text className="text-white font-semibold text-center">
                Contactar Soporte
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}


