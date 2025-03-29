// TODO: Ask for user name
import { Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "@/lib/supabase";
import { Redirect, useRouter } from "expo-router";
import { useUserStore } from "@/store";

export default function Index() {
  const setUser = useUserStore((state) => state.setUser);
  const user = useUserStore((state) => state.user);
  const router = useRouter();

  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInAnonymously();

    const { data: userData, error: userError } = await supabase.auth.updateUser({
      data: {
        email: "test@test.com",
      },
    });

    if (!error) {
      setUser(userData.user);
      router.replace("/(protected)/(tabs)");
    }
  };

  if (user) {
    return <Redirect href="/(protected)/(tabs)" />;
  }

  return (
    <SafeAreaView className="flex-1 bg-white justify-center items-center">
      <TouchableOpacity className="bg-blue-500 p-4 rounded-md" onPress={handleLogin}>
        <Text className="text-white text-center font-bold">Ingresar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
