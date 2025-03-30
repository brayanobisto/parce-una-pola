import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "@/lib/supabase";
import { Redirect, useRouter } from "expo-router";
import { useUserStore } from "@/store";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";

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
    <SafeAreaView className="flex-1 bg-white p-4">
      <Text className="text-4xl text-center font-bold mb-2">Bienvenido a {`\n`}Parce, una pola</Text>
      <Text className="mb-4 text-lg">Por favor, ingresa tus datos para continuar</Text>

      <View className="flex-row gap-2">
        <Input label="Nombre" />
        <Input label="Apellido" />
      </View>

      <Button onPress={handleLogin}>Continuar</Button>
    </SafeAreaView>
  );
}
