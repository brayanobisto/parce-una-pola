import { useQuery } from "@tanstack/react-query";

import { getBeerById } from "@/lib/supabase/services";

export const useBeer = (id: string) => {
  return useQuery({
    queryKey: ["beers", id],
    queryFn: () => getBeerById(Number(id)),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
