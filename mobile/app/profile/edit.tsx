import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Card } from '@/components/ui/Card';

export default function EditProfileScreen() {
  const [name, setName] = useState('Usuario');
  const [username, setUsername] = useState('@usuario');
  const [bio, setBio] = useState('Fitness enthusiast 💪');
  const [email, setEmail] = useState('usuario@example.com');
  const [age, setAge] = useState('25');
  const [height, setHeight] = useState('175');
  const [targetWeight, setTargetWeight] = useState('75');

  const handleSave = () => {
    Alert.alert('¡Guardado!', 'Tu perfil ha sido actualizado');
    router.back();
  };

  const handleChangeAvatar = () => {
    Alert.alert('Cambiar Avatar', 'Función de galería en desarrollo');
  };

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <LinearGradient colors={['#9D12DE', '#7C3AED']} className="px-6 pt-12 pb-6">
        <View className="flex-row items-center justify-between mb-4">
          <TouchableOpacity onPress={() => router.back()} className="p-2">
            <Ionicons name="arrow-back" size={28} color="white" />
          </TouchableOpacity>
          <Text className="text-xl font-bold text-white">Editar Perfil</Text>
          <TouchableOpacity onPress={handleSave} className="p-2">
            <Text className="text-white font-bold text-base">Guardar</Text>
          </TouchableOpacity>
        </View>

        {/* Avatar */}
        <View className="items-center">
          <View className="relative">
            <View className="w-24 h-24 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full items-center justify-center">
              <Text className="text-white font-bold text-4xl">
                {name.charAt(0).toUpperCase()}
              </Text>
            </View>
            <TouchableOpacity
              onPress={handleChangeAvatar}
              className="absolute bottom-0 right-0 bg-white p-2 rounded-full"
              style={{ elevation: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84 }}
            >
              <Ionicons name="camera" size={20} color="#9D12DE" />
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>

      <ScrollView className="flex-1" contentContainerClassName="p-6">
        {/* Basic Info */}
        <Card className="p-4 mb-4">
          <Text className="text-gray-900 font-bold text-lg mb-4">
            Información Básica
          </Text>

          <View className="gap-4">
            <View>
              <Text className="text-gray-700 font-semibold mb-2">Nombre</Text>
              <TextInput
                value={name}
                onChangeText={setName}
                className="bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-gray-900"
                placeholder="Tu nombre"
              />
            </View>

            <View>
              <Text className="text-gray-700 font-semibold mb-2">Usuario</Text>
              <TextInput
                value={username}
                onChangeText={setUsername}
                className="bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-gray-900"
                placeholder="@usuario"
                autoCapitalize="none"
              />
            </View>

            <View>
              <Text className="text-gray-700 font-semibold mb-2">Bio</Text>
              <TextInput
                value={bio}
                onChangeText={setBio}
                className="bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-gray-900"
                placeholder="Cuéntanos sobre ti"
                multiline
                numberOfLines={3}
              />
            </View>

            <View>
              <Text className="text-gray-700 font-semibold mb-2">Email</Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                className="bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-gray-900"
                placeholder="tu@email.com"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>
        </Card>

        {/* Physical Stats */}
        <Card className="p-4 mb-4">
          <Text className="text-gray-900 font-bold text-lg mb-4">
            Estadísticas Físicas
          </Text>

          <View className="gap-4">
            <View>
              <Text className="text-gray-700 font-semibold mb-2">Edad</Text>
              <TextInput
                value={age}
                onChangeText={setAge}
                className="bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-gray-900"
                placeholder="25"
                keyboardType="number-pad"
              />
            </View>

            <View>
              <Text className="text-gray-700 font-semibold mb-2">Altura (cm)</Text>
              <TextInput
                value={height}
                onChangeText={setHeight}
                className="bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-gray-900"
                placeholder="175"
                keyboardType="number-pad"
              />
            </View>

            <View>
              <Text className="text-gray-700 font-semibold mb-2">Peso Objetivo (kg)</Text>
              <TextInput
                value={targetWeight}
                onChangeText={setTargetWeight}
                className="bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-gray-900"
                placeholder="75"
                keyboardType="decimal-pad"
              />
            </View>
          </View>
        </Card>

        {/* Privacy */}
        <Card className="p-4 mb-4">
          <Text className="text-gray-900 font-bold text-lg mb-4">
            Privacidad
          </Text>

          <View className="gap-3">
            <TouchableOpacity className="flex-row items-center justify-between p-3 bg-gray-50 rounded-lg">
              <Text className="text-gray-900 font-semibold">Perfil Público</Text>
              <Ionicons name="toggle" size={32} color="#9D12DE" />
            </TouchableOpacity>

            <TouchableOpacity className="flex-row items-center justify-between p-3 bg-gray-50 rounded-lg">
              <Text className="text-gray-900 font-semibold">Mostrar Estadísticas</Text>
              <Ionicons name="toggle" size={32} color="#9D12DE" />
            </TouchableOpacity>

            <TouchableOpacity className="flex-row items-center justify-between p-3 bg-gray-50 rounded-lg">
              <Text className="text-gray-900 font-semibold">Mostrar Entrenamientos</Text>
              <Ionicons name="toggle-outline" size={32} color="#D1D5DB" />
            </TouchableOpacity>
          </View>
        </Card>

        {/* Danger Zone */}
        <Card className="p-4 mb-4 bg-red-50 border-red-200">
          <Text className="text-red-900 font-bold text-lg mb-4">
            Zona Peligrosa
          </Text>

          <View className="gap-2">
            <TouchableOpacity className="bg-white border border-red-300 py-3 rounded-lg">
              <Text className="text-red-600 font-semibold text-center">
                Cambiar Contraseña
              </Text>
            </TouchableOpacity>

            <TouchableOpacity className="bg-red-600 py-3 rounded-lg">
              <Text className="text-white font-semibold text-center">
                Eliminar Cuenta
              </Text>
            </TouchableOpacity>
          </View>
        </Card>
      </ScrollView>
    </View>
  );
}

