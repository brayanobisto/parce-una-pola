// TODO: Ask for user name
import { Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "@/lib/supabase";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();

  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInAnonymously();

    const { data: userData, error: userError } = await supabase.auth.updateUser({
      data: {
        email: "test@test.com",
      },
    });

    if (!error) {
      router.replace("/(protected)/(tabs)");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white justify-center items-center">
      <TouchableOpacity className="bg-blue-500 p-4 rounded-md" onPress={handleLogin}>
        <Text className="text-white text-center font-bold">Ingresar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
