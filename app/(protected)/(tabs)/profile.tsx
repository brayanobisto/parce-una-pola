import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "@/lib/supabase";
import { useRouter } from "expo-router";

export default function Profile() {
  const router = useRouter();

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error al cerrar sesión:", error);
    } else {
      router.replace("/");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <TouchableOpacity className="p-4" onPress={handleSignOut}>
        <Text>Salir</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
