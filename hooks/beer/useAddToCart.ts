import { useMutation } from "@tanstack/react-query";

import { addToCart } from "@/lib/supabase/services";
import { useUserStore } from "@/store";

export const useAddToCart = () => {
  const user = useUserStore((state) => state.user);

  return useMutation({
    mutationFn: ({ beerId, quantity }: { beerId: number; quantity: number }) => addToCart(beerId, user?.id!, quantity),
  });
};
