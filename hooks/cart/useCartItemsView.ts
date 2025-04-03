import { useQuery } from "@tanstack/react-query";

import { getCartItemsView } from "@/lib/supabase/services";

import { useUserCartItemsSuscription } from "./userCartItemsSuscription";

export const QUERY_KEY_CART_ITEMS_VIEW = "cartItemsView";

export const useCartItemsView = () => {
  const cartItemsViewQuery = useQuery({
    queryKey: ["cartItemsView"],
    queryFn: getCartItemsView,
  });

  useUserCartItemsSuscription({
    channel: "cart_items_view",
    callback: cartItemsViewQuery.refetch,
  });

  return cartItemsViewQuery;
};
