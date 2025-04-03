import { useMutation, useQueryClient } from "@tanstack/react-query";

import { addCartItem } from "@/lib/supabase/services";
import { useUserStore } from "@/store";

import { QUERY_KEY_CART_ITEMS } from "./useCartItems";
import { QUERY_KEY_CART_ITEMS_VIEW } from "./useCartItemsView";

export const useAddCartItem = () => {
  const user = useUserStore((state) => state.user);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ beerId, quantity }: { beerId: number; quantity: number }) =>
      addCartItem(beerId, user?.id!, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_CART_ITEMS, QUERY_KEY_CART_ITEMS_VIEW] });
    },
  });
};
