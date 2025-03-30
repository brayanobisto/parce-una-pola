import { Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import { supabase } from "@/lib/supabase";
import { useUserStore } from "@/store";

export default function Profile() {
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (!error) {
      setUser(null);
      router.replace("/sign-in");
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
