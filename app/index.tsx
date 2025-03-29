import { Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "@/lib/supabase";
import { useRouter } from "expo-router";
import { useState, useEffect } from "react";
import { ActivityIndicator } from "react-native";

export default function Index() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        router.replace("/(protected)/(tabs)");
      }

      setIsLoading(false);
    };
    fetchUser();
  }, []);

  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInAnonymously();

    if (!error) {
      router.replace("/(protected)/(tabs)");
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-white justify-center items-center">
        <ActivityIndicator className="text-green-500" size="large" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white justify-center items-center">
      <TouchableOpacity className="bg-blue-500 p-4 rounded-md" onPress={handleLogin}>
        <Text className="text-white text-center font-bold">Ingresar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
