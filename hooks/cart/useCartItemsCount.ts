import { useMemo } from "react";

import { useCartItems } from "@/hooks/cart/useCartItems";

export const useCartItemsCount = (channel: string) => {
  const cartItemsQuery = useCartItems(channel);

  return useMemo(() => cartItemsQuery.data?.reduce((acc, item) => acc + item.quantity, 0) ?? 0, [cartItemsQuery.data]);
};
