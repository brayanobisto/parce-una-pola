import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import type { Tables } from "@/lib/supabase/types";
import { getCartItemsView } from "@/lib/supabase/services";

import { useUserCartItemsSuscription } from "./userCartItemsSuscription";

export const QUERY_KEY_CART_ITEMS_VIEW = "cartItemsView";

interface GroupedCartItemsByUserName {
  title: { userName: string };
  data: Tables<"cart_items_view">[];
  footer: { subtotal: number };
}

export const useCartItemsView = () => {
  const cartItemsViewQuery = useQuery({
    queryKey: [QUERY_KEY_CART_ITEMS_VIEW],
    queryFn: getCartItemsView,
  });

  useUserCartItemsSuscription({
    channel: "cart_items_view",
    onChanges: cartItemsViewQuery.refetch,
  });

  const { groupedCartItemsByUserName, total } = useMemo(() => {
    const groupedCartItemsByUserName =
      cartItemsViewQuery.data?.reduce((acc: GroupedCartItemsByUserName[], item) => {
        const userName = (item.userData as { name: string }).name;

        const existingUser = acc.find((user) => user.title.userName === userName);

        if (existingUser) {
          existingUser.data.push(item);
          existingUser.footer.subtotal += item.beerPrice! * item.cartItemQuantity!;
        } else {
          acc.push({
            title: { userName },
            data: [item],
            footer: {
              subtotal: item.beerPrice! * item.cartItemQuantity!,
            },
          });
        }

        return acc;
      }, [] as GroupedCartItemsByUserName[]) ?? [];

    const total = groupedCartItemsByUserName?.reduce((acc, item) => acc + item.footer.subtotal, 0) ?? 0;

    return { groupedCartItemsByUserName, total };
  }, [cartItemsViewQuery.data]);

  return { ...cartItemsViewQuery, groupedCartItemsByUserName, total };
};
