import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateCartItemQuantity } from "@/lib/supabase/services";

import { QUERY_KEY_CART_ITEMS } from "./useCartItems";
import { QUERY_KEY_CART_ITEMS_VIEW } from "./useCartItemsView";

export const useUpdateCartItemQuantity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ cartItemId, quantity }: { cartItemId: number; quantity: number }) =>
      updateCartItemQuantity(cartItemId, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_CART_ITEMS, QUERY_KEY_CART_ITEMS_VIEW] });
    },
  });
};
