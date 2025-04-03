import { useCallback, useEffect, useState } from "react";

import type { Tables } from "@/lib/supabase/types";
import { supabase } from "@/lib/supabase";
import { getCartItemsView } from "@/lib/supabase/services";

export const useCartItemsView = () => {
  const [cartItemsView, setCartItemsView] = useState<Tables<"cart_items_view">[]>([]);

  const fetchCartItemsView = useCallback(async () => {
    const data = await getCartItemsView();

    setCartItemsView(data);
  }, []);

  useEffect(() => {
    fetchCartItemsView();

    const subscription = supabase
      .channel("cart_items")
      .on("postgres_changes", { event: "*", schema: "public", table: "cart_items" }, (payload) => {
        fetchCartItemsView();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [fetchCartItemsView]);

  return cartItemsView;
};
