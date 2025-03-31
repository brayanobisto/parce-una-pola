import { useQuery } from "@tanstack/react-query";

import { getBeers } from "@/lib/supabase/services";

export const useBeers = () => {
  return useQuery({
    queryFn: () => getBeers(),
    queryKey: ["beers"],
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
