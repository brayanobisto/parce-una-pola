import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateCartItemQuantity } from "@/lib/supabase/services";

export const useUpdateCartItemQuantity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ cartItemId, quantity }: { cartItemId: number; quantity: number }) =>
      updateCartItemQuantity(cartItemId, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cartItemsView"] });
    },
  });
};
