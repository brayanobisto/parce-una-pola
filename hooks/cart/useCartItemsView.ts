import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import { supabase } from "@/lib/supabase";
import { getCartItemsView } from "@/lib/supabase/services";

export const useCartItemsView = () => {
  const cartItemsViewQuery = useQuery({
    queryKey: ["cartItemsView"],
    queryFn: getCartItemsView,
  });

  useEffect(() => {
    const subscription = supabase
      .channel("cart_items_view")
      .on("postgres_changes", { event: "*", schema: "public", table: "cart_items" }, (payload) => {
        cartItemsViewQuery.refetch();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return cartItemsViewQuery;
};
