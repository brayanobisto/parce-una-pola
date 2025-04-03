import { useState } from "react";
import { Text, View } from "react-native";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { SafeAreaView } from "@/components/ui/SafeAreaView";
import { useSignIn } from "@/hooks/auth/useSignIn";

export default function Index() {
  const [fullNameForm, setFullNameForm] = useState({
    name: "",
    lastName: "",
  });
  const { mutate: signIn, isPending: isSigningIn } = useSignIn();

  const handleSignIn = () => {
    signIn(`${fullNameForm.name.trim()} ${fullNameForm.lastName.trim()}`);
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

      <Button onPress={handleSignIn} disabled={!fullNameForm.name || !fullNameForm.lastName} isLoading={isSigningIn}>
        Continuar
      </Button>
    </SafeAreaView>
  );
}
