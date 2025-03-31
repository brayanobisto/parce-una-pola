import { useRouter } from "expo-router";
import { useMutation } from "@tanstack/react-query";

import { signOut } from "@/lib/supabase/auth";
import { useUserStore } from "@/store";

export const useSignOut = () => {
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);

  return useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      setUser(null);
      router.replace("/auth/sign-in");
    },
  });
};
