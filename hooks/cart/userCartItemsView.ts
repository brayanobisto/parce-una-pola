import { useCallback, useEffect, useState } from "react";

import type { Tables } from "@/lib/supabase/types";
import { supabase } from "@/lib/supabase";

export const useCartItemsView = () => {
  const [cartItemsView, setCartItemsView] = useState<Tables<"cart_items_view">[]>([]);

  const fetchCartItemsView = useCallback(async () => {
    const { data, error } = await supabase
      .from("cart_items_view")
      .select("*")
      .order("cartItemCreatedAt", { ascending: true });

    if (!error) {
      setCartItemsView(data);
    }
  }, []);

  useEffect(() => {
    fetchCartItemsView();

    // Escuchar cambios en la tabla cart_items
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
