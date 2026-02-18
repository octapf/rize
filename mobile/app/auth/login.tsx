import React, { useState } from 'react';
import { Text } from '@/components/ui/Text';
import { View, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Dimensions } from 'react-native';;
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '@/stores/authStore';
import { GlassCard } from '@/components/ui/GlassCard';
import { useToast } from '@/contexts/ToastContext';
import Animated, { FadeInDown, FadeInUp, withRepeat, withTiming, useSharedValue, useAnimatedStyle, Easing } from 'react-native-reanimated';
import { useEffect } from 'react';

const { width, height } = Dimensions.get('window');

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Background Animation Values
  const blob1Scale = useSharedValue(1);
  const blob2Scale = useSharedValue(1);

  useEffect(() => {
    blob1Scale.value = withRepeat(
      withTiming(1.2, { duration: 4000, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
    blob2Scale.value = withRepeat(
      withTiming(1.1, { duration: 5000, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
  }, []);

  const blob1Style = useAnimatedStyle(() => ({
    transform: [{ scale: blob1Scale.value }],
  }));

  const blob2Style = useAnimatedStyle(() => ({
    transform: [{ scale: blob2Scale.value }],
  }));

  const login = useAuthStore((state) => state.login);
  const toast = useToast();

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      toast.error('Por favor completa todos los campos');
      return;
    }

    if (!email.includes('@')) {
      toast.error('Email inválido');
      return;
    }

    setIsLoading(true);

    try {
      await login(email, password);
      toast.success('¡Bienvenido de nuevo!');
      router.replace('/(tabs)');
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || 'Credenciales inválidas';
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-background">
      {/* Background Gradients for Neon effect */}
      <View className="absolute top-0 left-0 right-0 h-full overflow-hidden">
         <Animated.View style={blob1Style} className="absolute -top-40 -left-20 w-96 h-96 bg-primary rounded-full opacity-20 blur-3xl" />
         <Animated.View style={blob2Style} className="absolute top-1/3 -right-20 w-80 h-80 bg-highlight rounded-full opacity-10 blur-3xl" />
         <Animated.View className="absolute -bottom-20 left-1/3 w-96 h-96 bg-primary rounded-full opacity-20 blur-3xl" />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1 justify-center"
      >
        <ScrollView
          contentContainerClassName="flex-grow justify-center items-center py-12 px-6 sm:px-8"
          keyboardShouldPersistTaps="handled"
        >
          <View className="w-full max-w-[450px] items-center">
            <Animated.View entering={FadeInDown.delay(200).duration(1000).springify()} className="w-full items-center mb-12">
              <View className="w-24 h-24 bg-glass-10 rounded-3xl items-center justify-center mb-6 border border-primary self-center shadow-[0_0_20px_rgba(157,18,222,0.6)]">
                <Ionicons name="fitness" size={48} color="#9D12DE" />
              </View>
              <Text className="text-text text-5xl font-heading tracking-wide mb-2 text-center">RIZE</Text>
              <Text className="text-primary text-sm font-label tracking-[0.2em] uppercase text-center">Eleva tu Potencial</Text>
            </Animated.View>

            <Animated.View entering={FadeInUp.delay(400).duration(1000).springify()} className="w-full">
            <GlassCard intensity={30} className="p-8 w-full gap-6">
              <View className="mb-2">
                <Text className="text-text text-2xl font-heading mb-2 text-center">Bienvenido</Text>
                <Text className="text-text/60 text-center font-body text-sm">Inicia sesión para continuar</Text>
              </View>

              <View className="gap-5">
                {/* Email */}
                <View className="gap-2">
                  <Text className="text-text font-label text-xs uppercase ml-1 opacity-80">Email</Text>
                  <View className="flex-row items-center bg-background/50 border border-white/10 rounded-2xl px-4 py-3.5 focus:border-highlight transition-colors">
                    <Ionicons name="mail-outline" size={20} color="#E3E3E3" style={{ opacity: 0.7 }} />
                    <TextInput
                      testID="login-email-input"
                      // @ts-expect-error data-testid for Cypress/RN Web
                      data-testid="login-email-input"
                      className="flex-1 ml-3 text-text font-body text-base"
                      placeholder="ejemplo@email.com"
                      placeholderTextColor="rgba(227, 227, 227, 0.4)"
                      value={email}
                      onChangeText={setEmail}
                      autoCapitalize="none"
                      keyboardType="email-address"
                    />
                  </View>
                </View>

                {/* Password */}
                <View className="gap-2">
                  <Text className="text-text font-label text-xs uppercase ml-1 opacity-80">Contraseña</Text>
                  <View className="flex-row items-center bg-background/50 border border-white/10 rounded-2xl px-4 py-3.5 focus:border-highlight transition-colors">
                    <Ionicons name="lock-closed-outline" size={20} color="#E3E3E3" style={{ opacity: 0.7 }} />
                    <TextInput
                      testID="login-password-input"
                      // @ts-expect-error data-testid for Cypress/RN Web
                      data-testid="login-password-input"
                      className="flex-1 ml-3 text-text font-body text-base"
                      placeholder="••••••••"
                      placeholderTextColor="rgba(227, 227, 227, 0.4)"
                      value={password}
                      onChangeText={setPassword}
                      secureTextEntry={!showPassword}
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                      <Ionicons
                        name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                        size={20}
                        color="#E3E3E3"
                        style={{ opacity: 0.7 }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                <TouchableOpacity 
                  testID="login-button"
                  // @ts-expect-error data-testid for Cypress/RN Web
                  data-testid="login-button"
                  className="bg-primary py-4 rounded-2xl items-center mt-4 shadow-[0_0_25px_rgba(157,18,222,0.5)] active:opacity-90 active:scale-[0.98] transition-transform"
                  onPress={handleLogin}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Text className="text-text font-body-semibold text-base">Cargando...</Text>
                  ) : (
                    <Text className="text-text font-heading text-base uppercase tracking-wider">Iniciar Sesión</Text>
                  )}
                </TouchableOpacity>
              </View>

              <View className="mt-4 flex-row justify-center items-center gap-4">
                  <View className="h-[1px] bg-white/10 flex-1" />
                  <Text className="text-text/40 font-label text-[10px] uppercase tracking-widest">O continúa con</Text>
                  <View className="h-[1px] bg-white/10 flex-1" />
              </View>

              <View className="flex-row gap-4">
                  <TouchableOpacity className="flex-1 bg-white/5 py-3.5 rounded-xl items-center border border-white/10 hover:bg-white/10 active:bg-white/10">
                      <Ionicons name="logo-google" size={22} color="#E3E3E3" />
                  </TouchableOpacity>
                  <TouchableOpacity className="flex-1 bg-white/5 py-3.5 rounded-xl items-center border border-white/10 hover:bg-white/10 active:bg-white/10">
                      <Ionicons name="logo-apple" size={22} color="#E3E3E3" />
                  </TouchableOpacity>
              </View>
            </GlassCard>
            </Animated.View>
            
            <View className="mt-10 flex-row justify-center items-center gap-2">
              <Text className="text-text/60 font-body text-sm">¿No tienes cuenta? </Text>
              <TouchableOpacity onPress={() => router.push('/auth/register')}>
                <Text className="text-highlight font-label-bold text-sm underline decoration-highlight/50 underline-offset-4">Regístrate</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
