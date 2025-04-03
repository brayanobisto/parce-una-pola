import { useEffect } from "react";

import { supabase } from "@/lib/supabase";

interface UseUserCartItemsSuscriptionParams {
  channel: string;
  callback: () => void;
}

export const useUserCartItemsSuscription = ({ channel, callback }: UseUserCartItemsSuscriptionParams) => {
  useEffect(() => {
    const subscription = supabase
      .channel(channel)
      .on("postgres_changes", { event: "*", schema: "public", table: "cart_items" }, (payload) => {
        callback();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
};
