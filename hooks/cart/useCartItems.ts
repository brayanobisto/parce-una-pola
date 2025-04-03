import { useQuery } from "@tanstack/react-query";

import { getCartItems } from "@/lib/supabase/services";

import { useUserCartItemsSuscription } from "./userCartItemsSuscription";

export const QUERY_KEY_CART_ITEMS = "cartItems";

export const useCartItems = (channel: string) => {
  const cartItemsQuery = useQuery({
    queryKey: [QUERY_KEY_CART_ITEMS],
    queryFn: getCartItems,
  });

  useUserCartItemsSuscription({
    channel,
    onChanges: cartItemsQuery.refetch,
  });

  return cartItemsQuery;
};
