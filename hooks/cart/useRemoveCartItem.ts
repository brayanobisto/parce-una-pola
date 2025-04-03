import { useMutation, useQueryClient } from "@tanstack/react-query";

import { removeCartItem } from "@/lib/supabase/services";

import { QUERY_KEY_CART_ITEMS } from "./useCartItems";
import { QUERY_KEY_CART_ITEMS_VIEW } from "./useCartItemsView";

export const useRemoveCartItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ cartItemId }: { cartItemId: number }) => removeCartItem(cartItemId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_CART_ITEMS, QUERY_KEY_CART_ITEMS_VIEW] });
    },
  });
};
