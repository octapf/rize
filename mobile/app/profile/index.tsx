import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
  Alert,
  Modal,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

interface UserStats {
  workouts: number;
  volume: number;
  streak: number;
  friends: number;
  achievements: number;
  level: number;
  xp: number;
  nextLevelXP: number;
}

interface RecentActivity {
  id: string;
  type: 'workout' | 'achievement' | 'friend' | 'pr';
  title: string;
  subtitle: string;
  timestamp: Date;
  icon: string;
  color: string;
}

export default function UserProfile() {
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [name, setName] = useState('Carlos Rodriguez');
  const [username, setUsername] = useState('@carlosfit');
  const [bio, setBio] = useState('Atleta de calistenia 💪 | Nivel 15 | Amante del fitness');
  const [avatarUri, setAvatarUri] = useState<string | null>(null);

  // Mock data
  const stats: UserStats = {
    workouts: 142,
    volume: 45600,
    streak: 12,
    friends: 89,
    achievements: 18,
    level: 15,
    xp: 8420,
    nextLevelXP: 10000,
  };

  const recentActivities: RecentActivity[] = [
    {
      id: '1',
      type: 'workout',
      title: 'Pull Day Completado',
      subtitle: '12 ejercicios • 65 min',
      timestamp: new Date(2025, 0, 27, 10, 30),
      icon: 'fitness',
      color: '#10B981',
    },
    {
      id: '2',
      type: 'achievement',
      title: 'Muscle Up King Desbloqueado',
      subtitle: '+750 XP',
      timestamp: new Date(2025, 0, 26, 18, 15),
      icon: 'trophy',
      color: '#F59E0B',
    },
    {
      id: '3',
      type: 'pr',
      title: 'Nuevo PR: Dominadas',
      subtitle: '15 reps',
      timestamp: new Date(2025, 0, 25, 9, 45),
      icon: 'trending-up',
      color: '#EF4444',
    },
    {
      id: '4',
      type: 'friend',
      title: 'Nueva amistad con María López',
      subtitle: 'Ahora son amigos',
      timestamp: new Date(2025, 0, 24, 14, 20),
      icon: 'people',
      color: '#3B82F6',
    },
  ];

  const topAchievements = [
    { id: '1', name: 'Racha de 30 Días', icon: 'flame', color: '#EF4444' },
    { id: '2', name: 'Muscle Up King', icon: 'trophy', color: '#F59E0B' },
    { id: '3', name: '100 Toneladas', icon: 'barbell', color: '#10B981' },
  ];

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setAvatarUri(result.assets[0].uri);
    }
  };

  const saveProfile = () => {
    // TODO: API call to update profile
    setEditModalVisible(false);
    Alert.alert('Éxito', 'Perfil actualizado correctamente');
  };

  const levelProgress = (stats.xp / stats.nextLevelXP) * 100;

  return (
    <View className="flex-1 bg-zinc-950">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header with gradient background */}
        <View className="bg-gradient-to-b from-emerald-600 to-emerald-700 pt-12 pb-6 px-6">
          <View className="flex-row items-center justify-between mb-4">
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setEditModalVisible(true)}>
              <Ionicons name="create-outline" size={24} color="white" />
            </TouchableOpacity>
          </View>

          {/* Avatar */}
          <View className="items-center mb-4">
            <View className="relative">
              {avatarUri ? (
                <Image source={{ uri: avatarUri }} className="w-24 h-24 rounded-full" />
              ) : (
                <View className="w-24 h-24 rounded-full bg-emerald-800 items-center justify-center">
                  <Text className="text-white text-3xl font-bold">
                    {name.charAt(0)}
                  </Text>
                </View>
              )}
              <View className="absolute -bottom-2 -right-2 bg-amber-500 rounded-full w-10 h-10 items-center justify-center border-4 border-emerald-600">
                <Text className="text-white font-bold text-sm">{stats.level}</Text>
              </View>
            </View>
            <Text className="text-white text-2xl font-bold mt-3">{name}</Text>
            <Text className="text-emerald-200 text-base">{username}</Text>
            <Text className="text-emerald-100 text-sm text-center mt-2 max-w-xs">
              {bio}
            </Text>
          </View>

          {/* Level Progress */}
          <View className="mt-4">
            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-emerald-100 text-sm font-semibold">
                Nivel {stats.level}
              </Text>
              <Text className="text-emerald-100 text-sm">
                {stats.xp.toLocaleString()} / {stats.nextLevelXP.toLocaleString()} XP
              </Text>
            </View>
            <View className="bg-emerald-800 h-3 rounded-full overflow-hidden">
              <View
                className="bg-amber-500 h-full rounded-full"
                style={{ width: `${levelProgress}%` }}
              />
            </View>
          </View>
        </View>

        {/* Stats Cards */}
        <View className="px-6 -mt-6">
          <View className="bg-zinc-900 rounded-xl p-4 border border-zinc-800">
            <View className="flex-row flex-wrap">
              <View className="w-1/3 items-center py-3 border-r border-zinc-800">
                <Ionicons name="fitness-outline" size={24} color="#10B981" />
                <Text className="text-white text-xl font-bold mt-1">
                  {stats.workouts}
                </Text>
                <Text className="text-zinc-400 text-xs">Workouts</Text>
              </View>
              <View className="w-1/3 items-center py-3 border-r border-zinc-800">
                <Ionicons name="barbell-outline" size={24} color="#10B981" />
                <Text className="text-white text-xl font-bold mt-1">
                  {(stats.volume / 1000).toFixed(1)}T
                </Text>
                <Text className="text-zinc-400 text-xs">Volumen</Text>
              </View>
              <View className="w-1/3 items-center py-3">
                <Ionicons name="flame-outline" size={24} color="#EF4444" />
                <Text className="text-white text-xl font-bold mt-1">
                  {stats.streak}
                </Text>
                <Text className="text-zinc-400 text-xs">Racha</Text>
              </View>
              <View className="w-1/3 items-center py-3 border-r border-t border-zinc-800">
                <Ionicons name="people-outline" size={24} color="#3B82F6" />
                <Text className="text-white text-xl font-bold mt-1">
                  {stats.friends}
                </Text>
                <Text className="text-zinc-400 text-xs">Amigos</Text>
              </View>
              <View className="w-1/3 items-center py-3 border-r border-t border-zinc-800">
                <Ionicons name="trophy-outline" size={24} color="#F59E0B" />
                <Text className="text-white text-xl font-bold mt-1">
                  {stats.achievements}
                </Text>
                <Text className="text-zinc-400 text-xs">Logros</Text>
              </View>
              <View className="w-1/3 items-center py-3 border-t border-zinc-800">
                <Ionicons name="star-outline" size={24} color="#F59E0B" />
                <Text className="text-white text-xl font-bold mt-1">
                  {stats.xp.toLocaleString()}
                </Text>
                <Text className="text-zinc-400 text-xs">XP Total</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Top Achievements */}
        <View className="px-6 mt-6">
          <Text className="text-white text-lg font-bold mb-3">Logros Destacados</Text>
          <View className="flex-row gap-3">
            {topAchievements.map((achievement) => (
              <View
                key={achievement.id}
                className="flex-1 bg-zinc-900 rounded-xl p-4 border border-zinc-800 items-center"
              >
                <View
                  className="w-12 h-12 rounded-full items-center justify-center mb-2"
                  style={{ backgroundColor: achievement.color + '20' }}
                >
                  <Ionicons
                    name={achievement.icon as any}
                    size={24}
                    color={achievement.color}
                  />
                </View>
                <Text className="text-white text-xs font-semibold text-center">
                  {achievement.name}
                </Text>
              </View>
            ))}
          </View>
          <TouchableOpacity
            onPress={() => router.push('/achievements')}
            className="mt-3 py-3 border-2 border-emerald-500 rounded-xl items-center"
          >
            <Text className="text-emerald-500 font-semibold">
              Ver Todos los Logros ({stats.achievements})
            </Text>
          </TouchableOpacity>
        </View>

        {/* Recent Activity */}
        <View className="px-6 mt-6 pb-6">
          <Text className="text-white text-lg font-bold mb-3">Actividad Reciente</Text>
          <View className="space-y-3">
            {recentActivities.map((activity) => (
              <View
                key={activity.id}
                className="bg-zinc-900 rounded-xl p-4 border border-zinc-800 flex-row items-center"
              >
                <View
                  className="w-10 h-10 rounded-full items-center justify-center mr-3"
                  style={{ backgroundColor: activity.color + '20' }}
                >
                  <Ionicons name={activity.icon as any} size={20} color={activity.color} />
                </View>
                <View className="flex-1">
                  <Text className="text-white font-semibold">{activity.title}</Text>
                  <Text className="text-zinc-400 text-sm">{activity.subtitle}</Text>
                </View>
                <Text className="text-zinc-500 text-xs">
                  {activity.timestamp.toLocaleDateString('es-ES', {
                    day: 'numeric',
                    month: 'short',
                  })}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Edit Profile Modal */}
      <Modal
        visible={isEditModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setEditModalVisible(false)}
      >
        <View className="flex-1 bg-black/50 justify-end">
          <View className="bg-zinc-900 rounded-t-3xl p-6 max-h-[80%]">
            <View className="flex-row items-center justify-between mb-6">
              <Text className="text-white text-xl font-bold">Editar Perfil</Text>
              <TouchableOpacity onPress={() => setEditModalVisible(false)}>
                <Ionicons name="close" size={28} color="white" />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              {/* Avatar */}
              <View className="items-center mb-6">
                <TouchableOpacity onPress={pickImage}>
                  {avatarUri ? (
                    <Image source={{ uri: avatarUri }} className="w-24 h-24 rounded-full" />
                  ) : (
                    <View className="w-24 h-24 rounded-full bg-zinc-800 items-center justify-center">
                      <Text className="text-white text-3xl font-bold">
                        {name.charAt(0)}
                      </Text>
                    </View>
                  )}
                  <View className="absolute -bottom-2 -right-2 bg-emerald-500 rounded-full w-8 h-8 items-center justify-center">
                    <Ionicons name="camera" size={16} color="white" />
                  </View>
                </TouchableOpacity>
                <Text className="text-zinc-400 text-sm mt-2">Toca para cambiar foto</Text>
              </View>

              {/* Name */}
              <View className="mb-4">
                <Text className="text-zinc-400 text-sm mb-2">Nombre</Text>
                <TextInput
                  value={name}
                  onChangeText={setName}
                  placeholder="Tu nombre"
                  placeholderTextColor="#52525B"
                  className="bg-zinc-800 text-white px-4 py-3 rounded-xl border border-zinc-700"
                />
              </View>

              {/* Username */}
              <View className="mb-4">
                <Text className="text-zinc-400 text-sm mb-2">Usuario</Text>
                <TextInput
                  value={username}
                  onChangeText={setUsername}
                  placeholder="@usuario"
                  placeholderTextColor="#52525B"
                  className="bg-zinc-800 text-white px-4 py-3 rounded-xl border border-zinc-700"
                />
              </View>

              {/* Bio */}
              <View className="mb-6">
                <Text className="text-zinc-400 text-sm mb-2">Biografía</Text>
                <TextInput
                  value={bio}
                  onChangeText={setBio}
                  placeholder="Cuéntanos sobre ti..."
                  placeholderTextColor="#52525B"
                  multiline
                  numberOfLines={3}
                  maxLength={150}
                  className="bg-zinc-800 text-white px-4 py-3 rounded-xl border border-zinc-700"
                  style={{ textAlignVertical: 'top' }}
                />
                <Text className="text-zinc-600 text-xs mt-1">
                  {bio.length}/150 caracteres
                </Text>
              </View>

              {/* Save Button */}
              <TouchableOpacity
                onPress={saveProfile}
                className="bg-emerald-500 py-4 rounded-xl items-center"
              >
                <Text className="text-white font-bold text-lg">Guardar Cambios</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}
