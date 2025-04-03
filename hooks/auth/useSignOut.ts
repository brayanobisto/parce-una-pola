import { useRouter } from "expo-router";
import { useMutation } from "@tanstack/react-query";

import { signOut } from "@/lib/supabase/auth";
import { deleteCartItemsByUserId } from "@/lib/supabase/services";
import { useUserStore } from "@/store";

export const useSignOut = () => {
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);
  const user = useUserStore((state) => state.user);

  return useMutation({
    mutationFn: async () => {
      await deleteCartItemsByUserId(user?.id!);
      await signOut();
    },
    onSuccess: () => {
      setUser(null);
      router.replace("/auth/sign-in");
    },
  });
};
