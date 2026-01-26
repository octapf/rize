import { useState } from 'react';
import { View, Text, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, router } from 'expo-router';
import { useMutation } from '@tanstack/react-query';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { authApi } from '@/services/api/auth.api';
import { useAuthStore } from '@/stores/authStore';

export default function LoginScreen() {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ emailOrUsername?: string; password?: string }>({});

  const setAuth = useAuthStore((state) => state.setAuth);

  const loginMutation = useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      setAuth(data);
      router.replace('/(tabs)');
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Error al iniciar sesión';
      setErrors({ emailOrUsername: message });
    },
  });

  const handleLogin = () => {
    setErrors({});

    if (!emailOrUsername.trim()) {
      setErrors({ emailOrUsername: 'Email o usuario requerido' });
      return;
    }

    if (!password) {
      setErrors({ password: 'Contraseña requerida' });
      return;
    }

    loginMutation.mutate({ emailOrUsername, password });
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView className="flex-1" contentContainerClassName="p-6">
          {/* Logo/Brand */}
          <View className="items-center mb-12 mt-8">
            <Text className="font-barlow-bold text-5xl text-emerald-600 mb-2">RIZE</Text>
            <Text className="font-inter-regular text-base text-gray-600">
              Eleva tu entrenamiento
            </Text>
          </View>

          {/* Form */}
          <View className="gap-4">
            <Input
              label="Email o Usuario"
              placeholder="ejemplo@email.com"
              value={emailOrUsername}
              onChangeText={setEmailOrUsername}
              error={errors.emailOrUsername}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              leftIcon={<Ionicons name="person-outline" size={20} color="#6B7280" />}
            />

            <Input
              label="Contraseña"
              placeholder="••••••••"
              value={password}
              onChangeText={setPassword}
              error={errors.password}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              leftIcon={<Ionicons name="lock-closed-outline" size={20} color="#6B7280" />}
              rightIcon={
                <Ionicons
                  name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={20}
                  color="#6B7280"
                  onPress={() => setShowPassword(!showPassword)}
                />
              }
            />

            <Button
              variant="primary"
              size="lg"
              onPress={handleLogin}
              isLoading={loginMutation.isPending}
              className="mt-4"
            >
              Iniciar Sesión
            </Button>

            <View className="flex-row items-center justify-center mt-6">
              <Text className="font-inter-regular text-sm text-gray-600">
                ¿No tienes cuenta?{' '}
              </Text>
              <Link href="/register" asChild>
                <Text className="font-inter-semibold text-sm text-emerald-600">
                  Regístrate
                </Text>
              </Link>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
