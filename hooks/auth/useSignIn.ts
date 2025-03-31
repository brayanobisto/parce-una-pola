import { useRouter } from "expo-router";
import { useMutation } from "@tanstack/react-query";

import { signInAnonymously } from "@/lib/supabase/auth";
import { useUserStore } from "@/store";

export const useSignIn = () => {
  const setUser = useUserStore((state) => state.setUser);
  const router = useRouter();

  return useMutation({
    mutationFn: async (fullName: string) => {
      return await signInAnonymously(fullName);
    },
    onSuccess: (user) => {
      setUser(user);
      router.replace("/(protected)/(tabs)");
    },
    onError: (error) => {
      console.error("Error signing in:", error);
    },
  });
};
