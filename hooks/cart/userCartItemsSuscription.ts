import { useEffect } from "react";

import { supabase } from "@/lib/supabase";

interface UseUserCartItemsSuscriptionParams {
  channel: string;
  onChanges: () => void;
}

export const useUserCartItemsSuscription = ({ channel, onChanges }: UseUserCartItemsSuscriptionParams) => {
  useEffect(() => {
    const subscription = supabase
      .channel(channel)
      .on("postgres_changes", { event: "*", schema: "public", table: "cart_items" }, (payload) => {
        onChanges();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
};
