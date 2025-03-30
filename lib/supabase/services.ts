import { supabase } from "@/lib/supabase";
import { Tables } from "@/lib/supabase/types";

export const getBeers = async (): Promise<Tables<"beers">[]> => {
  const { data, error } = await supabase.from("beers").select("*");

  if (error) {
    throw error;
  }

  return data;
};
