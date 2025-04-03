import { useMemo } from "react";
import { Image, SectionList, Text, View } from "react-native";

import type { Tables } from "@/lib/supabase/types";
import { GoBackButton } from "@/components/ui/GoBackButton";
import { QuantitySelector } from "@/components/ui/QuantitySelector";
import { SafeAreaView } from "@/components/ui/SafeAreaView";
import { useCartItemsView } from "@/hooks/cart/userCartItemsView";
import { useUpdateCartItemQuantity } from "@/hooks/cart/useUpdateCartItemQuantity";
import { removeCartItem } from "@/lib/supabase/services";
import { useUserStore } from "@/store";
import { formatCurrency } from "@/utils/currency";

interface GroupedCartItemsByUserName {
  title: { userName: string };
  data: Tables<"cart_items_view">[];
  footer: { subtotal: number; total: number };
}

export default function Cart() {
  const cartItems = useCartItemsView();
  const user = useUserStore((state) => state.user);
  const { mutate: updateCartItemQuantity, isPending: isUpdatingCartItemQuantity } = useUpdateCartItemQuantity();
  const { groupedCartItemsByUserName, total } = useMemo(() => {
    const groupedCartItemsByUserName = cartItems.reduce((acc: GroupedCartItemsByUserName[], item) => {
      const userName = (item.userData as { name: string }).name;

      const existingUser = acc.find((user) => user.title.userName === userName);

      if (existingUser) {
        existingUser.data.push(item);
        existingUser.footer.subtotal += item.beerPrice! * item.cartItemQuantity!;
        existingUser.footer.total += item.beerPrice! * item.cartItemQuantity!;
      } else {
        acc.push({
          title: { userName },
          data: [item],
          footer: {
            subtotal: item.beerPrice! * item.cartItemQuantity!,
            total: item.beerPrice! * item.cartItemQuantity!,
          },
        });
      }

      return acc;
    }, [] as GroupedCartItemsByUserName[]);

    const total = groupedCartItemsByUserName.reduce((acc, item) => acc + item.footer.total, 0);

    return { groupedCartItemsByUserName, total };
  }, [cartItems]);

  return (
    <SafeAreaView>
      <GoBackButton />

      <SectionList
        sections={groupedCartItemsByUserName}
        keyExtractor={(item) => item.cartItemId?.toString()!}
        renderItem={({ item }) => (
          <View className="mb-4 flex-row flex-wrap rounded-xl bg-white shadow-sm">
            <Image
              source={{
                uri: item.beerImageUrl!,
              }}
              resizeMode="contain"
              className="aspect-square h-40 w-40 rounded-l-xl"
            />
            <View className="flex-1 border-l border-gray-200 p-4">
              <Text className="flex-shrink text-xl font-bold" numberOfLines={2}>
                {item.beerName}
              </Text>
              <Text className="text-gray-500">{item.beerBrand}</Text>
              <Text className="mb-2 text-sm">{formatCurrency(item.beerPrice)}</Text>

              <View className="mb-1 flex-row items-center justify-between gap-4">
                {user?.id! === item.cartItemAddedBy ? (
                  <QuantitySelector
                    quantity={item.cartItemQuantity!}
                    isLoading={isUpdatingCartItemQuantity}
                    setQuantity={async (quantity) => {
                      if (quantity === 1) {
                        await removeCartItem(item.cartItemId!);
                      } else {
                        await updateCartItemQuantity({ cartItemId: item.cartItemId!, quantity });
                      }
                    }}
                    size="small"
                  />
                ) : (
                  <Text className="w-[75px] text-center text-base">{item.cartItemQuantity}</Text>
                )}

                <Text className="text-2xl font-medium text-green-500">
                  {formatCurrency(item.beerPrice! * item.cartItemQuantity!)}
                </Text>
              </View>
            </View>
          </View>
        )}
        SectionSeparatorComponent={() => <View className="mb-4 h-[1px] bg-gray-200" />}
        renderSectionHeader={({ section: { title } }) => (
          <Text className="mb-2 text-3xl font-bold text-green-500">Cervezas de {title.userName}:</Text>
        )}
        renderSectionFooter={({ section: { footer } }) => (
          <View className="mb-6 flex-row items-center justify-between px-4">
            <Text className="text-2xl font-medium">Subtotal</Text>
            <Text className="text-2xl font-medium">{formatCurrency(footer.subtotal)}</Text>
          </View>
        )}
        className="p-4"
        ListFooterComponent={() =>
          total > 0 ? (
            <View className="mb-8 flex-row items-center justify-between border-t border-t-gray-300 p-4">
              <Text className="text-2xl font-medium">Total</Text>
              <Text className="text-2xl font-bold">{formatCurrency(total)}</Text>
            </View>
          ) : null
        }
        stickySectionHeadersEnabled={false}
        ListEmptyComponent={() => (
          <View className="flex-1 items-center justify-center">
            <Text className="text-2xl font-medium">No hay cervezas en el carrito</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
