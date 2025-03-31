import { useCallback } from "react";
import { useRouter } from "expo-router";

import { Button } from "@/components/ui/Button";
import { SafeAreaView } from "@/components/ui/SafeAreaView";
import { signOut } from "@/lib/supabase/auth";
import { useUserStore } from "@/store";

export default function Profile() {
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);

  const handleSignOut = useCallback(async () => {
    await signOut();
    setUser(null);
    router.replace("/auth/sign-in");
  }, [router, setUser]);

  return (
    <SafeAreaView className="p-4">
      <Button onPress={handleSignOut}>Salir</Button>
    </SafeAreaView>
  );
}
