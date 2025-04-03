import { useMutation, useQueryClient } from "@tanstack/react-query";

import { removeCartItem } from "@/lib/supabase/services";

export const useRemoveCartItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ cartItemId }: { cartItemId: number }) => removeCartItem(cartItemId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cartItems", "cartItemsView"] });
    },
  });
};
