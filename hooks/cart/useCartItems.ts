import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import { supabase } from "@/lib/supabase";
import { getCartItems } from "@/lib/supabase/services";

export const useCartItems = () => {
  const cartItemsQuery = useQuery({
    queryKey: ["cartItems"],
    queryFn: getCartItems,
  });

  useEffect(() => {
    const subscription = supabase
      .channel("cart_items")
      .on("postgres_changes", { event: "*", schema: "public", table: "cart_items" }, (payload) => {
        cartItemsQuery.refetch();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return cartItemsQuery;
};
