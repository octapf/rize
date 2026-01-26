import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="flex-1 items-center justify-center p-4">
        <Text className="font-barlow-bold text-3xl text-gray-900 mb-2">
          RIZE
        </Text>
        <Text className="font-inter-regular text-base text-gray-600 text-center">
          Bienvenido a tu app de calistenia
        </Text>
        <Text className="font-inter-regular text-sm text-gray-500 mt-4">
          🚧 En construcción...
        </Text>
      </View>
    </SafeAreaView>
  );
}
