import type { Tables } from "@/lib/supabase/types";
import { supabase } from "@/lib/supabase";

export const getBeers = async (): Promise<Tables<"beers">[]> => {
  const { data, error } = await supabase.from("beers").select("*");

  if (error) {
    throw error;
  }

  return data;
};
