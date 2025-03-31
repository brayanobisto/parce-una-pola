import { useState } from "react";
import { Text, View } from "react-native";
import { useRouter } from "expo-router";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { SafeAreaView } from "@/components/ui/SafeAreaView";
import { signInAnonymously } from "@/lib/supabase/auth";
import { useUserStore } from "@/store";

export default function Index() {
  const [fullNameForm, setFullNameForm] = useState({
    name: "",
    lastName: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const setUser = useUserStore((state) => state.setUser);

  const handleSignIn = async () => {
    const user = await signInAnonymously(`${fullNameForm.name} ${fullNameForm.lastName}`);

    setUser(user);
    router.replace("/(protected)/(tabs)");
  };

  return (
    <SafeAreaView className="p-4">
      <Text className="mb-2 text-center text-4xl font-bold">Bienvenido a {`\n`}Parce, una pola</Text>
      <Text className="mb-6 text-lg">Por favor, ingresa tus datos para continuar</Text>

      <View className="flex-row gap-2">
        <Input
          label="Nombre"
          value={fullNameForm.name}
          onChangeText={(text) => setFullNameForm({ ...fullNameForm, name: text })}
        />
        <Input
          label="Apellido"
          value={fullNameForm.lastName}
          onChangeText={(text) => setFullNameForm({ ...fullNameForm, lastName: text })}
        />
      </View>

      <Button onPress={handleSignIn} disabled={!fullNameForm.name || !fullNameForm.lastName || isLoading}>
        Continuar
      </Button>
    </SafeAreaView>
  );
}
