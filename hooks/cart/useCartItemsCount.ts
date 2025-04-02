import { useMemo } from "react";

import { useCartItems } from "@/hooks/cart/useCartItems";

export const useCartItemsCount = () => {
  const cartItems = useCartItems();

  return useMemo(() => cartItems.reduce((acc, item) => acc + item.quantity, 0), [cartItems]);
};
