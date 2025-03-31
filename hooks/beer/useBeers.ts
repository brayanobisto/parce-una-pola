import { useQuery } from "@tanstack/react-query";

import { getBeers } from "@/lib/supabase/services";

export const useBeers = () => {
  return useQuery({
    queryKey: ["beers"],
    queryFn: () => getBeers(),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
