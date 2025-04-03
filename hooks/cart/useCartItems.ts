import { useQuery } from "@tanstack/react-query";

import { getCartItems } from "@/lib/supabase/services";

import { useUserCartItemsSuscription } from "./userCartItemsSuscription";

export const useCartItems = () => {
  const cartItemsQuery = useQuery({
    queryKey: ["cartItems"],
    queryFn: getCartItems,
  });

  useUserCartItemsSuscription({
    channel: "cart_items",
    callback: cartItemsQuery.refetch,
  });

  return cartItemsQuery;
};
