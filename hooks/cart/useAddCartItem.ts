import { useMutation } from "@tanstack/react-query";

import { addCartItem } from "@/lib/supabase/services";
import { useUserStore } from "@/store";

export const useAddCartItem = () => {
  const user = useUserStore((state) => state.user);

  return useMutation({
    mutationFn: ({ beerId, quantity }: { beerId: number; quantity: number }) =>
      addCartItem(beerId, user?.id!, quantity),
  });
};
