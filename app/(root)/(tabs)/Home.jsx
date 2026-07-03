import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 items-center bg-white">
        <Text className="text-lg font-bold text-black">Home Screen</Text>
      </View>
    </SafeAreaView>
  );
}
