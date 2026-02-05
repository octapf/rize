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
import { useToast } from '@/contexts/ToastContext';

export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{
    email?: string;
    username?: string;
    password?: string;
  }>({});

  const setAuth = useAuthStore((state) => state.setAuth);
  const toast = useToast();

  const registerMutation = useMutation({
    mutationFn: authApi.register,
    onSuccess: async (data) => {
      await setAuth(data);
      toast.success('¡Cuenta creada exitosamente!');
      router.replace('/(tabs)');
    },
    onError: (error: any) => {
      const validationErrors = error.response?.data?.errors;
      if (validationErrors) {
        setErrors(validationErrors);
        toast.error('Por favor corrige los errores del formulario');
      } else {
        const message = error.response?.data?.message || 'Error al registrarse';
        toast.error(message);
        setErrors({ email: message });
      }
    },
  });

  const handleRegister = () => {
    setErrors({});

    // Basic validation
    const newErrors: typeof errors = {};

    if (!email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Email inválido';
    }

    if (!username.trim()) {
      newErrors.username = 'El usuario es requerido';
    } else if (username.length < 3) {
      newErrors.username = 'El usuario debe tener al menos 3 caracteres';
    }

    if (!password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (password.length < 8) {
      newErrors.password = 'La contraseña debe tener al menos 8 caracteres';    } else if (!/[A-Z]/.test(password)) {
      newErrors.password = 'La contraseña debe contener al menos una mayúscula';
    } else if (!/[a-z]/.test(password)) {
      newErrors.password = 'La contraseña debe contener al menos una minúscula';
    } else if (!/[0-9]/.test(password)) {
      newErrors.password = 'La contraseña debe contener al menos un número';    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      const firstError = Object.values(newErrors)[0];
      toast.error(firstError);
      return;
    }

    registerMutation.mutate({ email, username, password });
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
              Comienza tu viaje
            </Text>
          </View>

          {/* Form */}
          <View className="gap-4">
            <Input
              label="Email"
              placeholder="ejemplo@email.com"
              value={email}
              onChangeText={setEmail}
              error={errors.email}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              leftIcon={<Ionicons name="mail-outline" size={20} color="#6B7280" />}
            />

            <Input
              label="Usuario"
              placeholder="nombredeusuario"
              value={username}
              onChangeText={setUsername}
              error={errors.username}
              autoCapitalize="none"
              autoCorrect={false}
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
              helperText="Mínimo 8 caracteres, 1 mayúscula, 1 minúscula, 1 número"
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
              onPress={handleRegister}
              isLoading={registerMutation.isPending}
              className="mt-4"
            >
              Registrarse
            </Button>

            <View className="flex-row items-center justify-center mt-6">
              <Text className="font-body text-sm text-gray-600">
                ¿Ya tienes cuenta?{' '}
              </Text>
              <Link href="/login" asChild>
                <Text className="font-label-bold text-sm text-primary">
                  Inicia Sesión
                </Text>
              </Link>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

