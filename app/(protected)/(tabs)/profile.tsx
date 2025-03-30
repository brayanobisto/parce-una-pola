import { useRouter } from "expo-router";

import { Button } from "@/components/ui/Button";
import { SafeAreaView } from "@/components/ui/SafeAreaView";
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
    <SafeAreaView className="p-4">
      <Button onPress={handleSignOut}>Salir</Button>
    </SafeAreaView>
  );
}
