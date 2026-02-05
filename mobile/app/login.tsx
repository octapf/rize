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
    onSuccess: async (data) => {
      await setAuth(data);
      router.replace('/(tabs)');
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Error al iniciar sesiÃ³n';
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
      setErrors({ password: 'ContraseÃ±a requerida' });
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
            <Text className="font-heading-bold text-5xl text-primary mb-2">RIZE</Text>
            <Text className="font-body text-base text-gray-600">
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
              label="ContraseÃ±a"
              placeholder="â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢"
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
              Iniciar SesiÃ³n
            </Button>

            <View className="flex-row items-center justify-center mt-6">
              <Text className="font-body text-sm text-gray-600">
                Â¿No tienes cuenta?{' '}
              </Text>
              <Link href="/register" asChild>
                <Text className="font-label-bold text-sm text-primary">
                  RegÃ­strate
                </Text>
              </Link>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

