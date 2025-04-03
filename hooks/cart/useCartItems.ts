import { useEffect, useState } from "react";

import type { Tables } from "@/lib/supabase/types";
import { supabase } from "@/lib/supabase";
import { getCartItems } from "@/lib/supabase/services";

export const useCartItems = () => {
  const [cartItems, setCartItems] = useState<Tables<"cart_items">[]>([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      const data = await getCartItems();

      setCartItems(data);
    };

    fetchCartItems();

    const subscription = supabase
      .channel("cart_items")
      .on("postgres_changes", { event: "*", schema: "public", table: "cart_items" }, (payload) => {
        setCartItems((prevCartItems) => {
          if (payload.eventType === "INSERT") {
            return [...prevCartItems, payload.new as Tables<"cart_items">];
          }

          if (payload.eventType === "UPDATE") {
            return prevCartItems.map((item) =>
              item.id === payload.new.id ? (payload.new as Tables<"cart_items">) : item,
            );
          }

          if (payload.eventType === "DELETE") {
            return prevCartItems.filter((item) => item.id !== (payload.old as Tables<"cart_items">).id);
          }

          return prevCartItems;
        });
      })
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  return cartItems;
};
