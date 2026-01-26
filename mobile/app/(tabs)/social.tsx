import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SocialScreen() {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="flex-1 items-center justify-center p-4">
        <Text className="font-barlow-bold text-2xl text-gray-900 mb-2">
          Social
        </Text>
        <Text className="font-inter-regular text-sm text-gray-500">
          🚧 Feed de entrenamientos próximamente...
        </Text>
      </View>
    </SafeAreaView>
  );
}
