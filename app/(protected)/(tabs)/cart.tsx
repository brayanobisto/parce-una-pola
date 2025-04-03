import { useCallback, useMemo } from "react";
import { SectionList, Text, View } from "react-native";

import type { Tables } from "@/lib/supabase/types";
import { CartItemCard } from "@/components/CartItemCard";
import { GoBackButton } from "@/components/ui/GoBackButton";
import { LoadingView } from "@/components/ui/LoadingView";
import { SafeAreaView } from "@/components/ui/SafeAreaView";
import { useCartItemsView } from "@/hooks/cart/useCartItemsView";
import { formatCurrency } from "@/utils/currency";

interface GroupedCartItemsByUserName {
  title: { userName: string };
  data: Tables<"cart_items_view">[];
  footer: { subtotal: number };
}

export default function Cart() {
  const { data: cartItemsView, isPending: isCartItemsViewPending } = useCartItemsView();

  const { groupedCartItemsByUserName, total } = useMemo(() => {
    const groupedCartItemsByUserName =
      cartItemsView?.reduce((acc: GroupedCartItemsByUserName[], item) => {
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
  }, [cartItemsView]);

  const keyExtractor = useCallback((item: Tables<"cart_items_view">) => item.cartItemId?.toString()!, []);

  const renderItem = useCallback(({ item }: { item: Tables<"cart_items_view"> }) => {
    return <CartItemCard item={item} />;
  }, []);

  const renderSectionHeader = useCallback(({ section: { title } }: { section: { title: { userName: string } } }) => {
    return <Text className="mb-2 text-3xl font-bold text-green-500">Cervezas de {title.userName}:</Text>;
  }, []);

  const renderSectionFooter = useCallback(({ section: { footer } }: { section: { footer: { subtotal: number } } }) => {
    return (
      <View className="mb-6 flex-row items-center justify-between px-4">
        <Text className="text-2xl font-medium">Subtotal</Text>
        <Text className="text-2xl font-medium">{formatCurrency(footer.subtotal)}</Text>
      </View>
    );
  }, []);

  const SectionSeparator = useCallback(() => {
    return <View className="mb-4 h-[1px] bg-gray-200" />;
  }, []);

  const ListFooterComponent = useCallback(() => {
    return total > 0 ? (
      <View className="mb-8 flex-row items-center justify-between border-t border-t-gray-300 p-4">
        <Text className="text-2xl font-medium">Total</Text>
        <Text className="text-2xl font-bold">{formatCurrency(total)}</Text>
      </View>
    ) : null;
  }, [total]);

  const ListEmptyComponent = useCallback(() => {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-2xl font-medium">No hay cervezas en el carrito</Text>
      </View>
    );
  }, []);

  return (
    <SafeAreaView>
      <GoBackButton />
      {isCartItemsViewPending ? (
        <LoadingView />
      ) : (
        <SectionList
          sections={groupedCartItemsByUserName}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          SectionSeparatorComponent={SectionSeparator}
          renderSectionHeader={renderSectionHeader}
          renderSectionFooter={renderSectionFooter}
          className="p-4"
          ListFooterComponent={ListFooterComponent}
          stickySectionHeadersEnabled={false}
          ListEmptyComponent={ListEmptyComponent}
        />
      )}
    </SafeAreaView>
  );
}
