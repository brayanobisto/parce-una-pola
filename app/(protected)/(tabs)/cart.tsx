import { useMemo } from "react";
import { FlatList, Image, ScrollView, Text, View } from "react-native";

import { GoBackButton } from "@/components/ui/GoBackButton";
import { QuantitySelector } from "@/components/ui/QuantitySelector";
import { SafeAreaView } from "@/components/ui/SafeAreaView";
import { useCartItemsView } from "@/hooks/cart/userCartItemsView";
import { formatCurrency } from "@/utils/currency";

export default function Cart() {
  const cartItems = useCartItemsView();

  const { groupedCartItemsByUserName } = useMemo(() => {
    const groupedCartItemsByUserName = cartItems.reduce(
      (acc: Record<string, { items: typeof cartItems; total: number }>, item) => {
        const user = (item.userData as { name: string }).name;

        if (!acc[user]) {
          acc[user] = { items: [], total: 0 };
        }

        acc[user].items.push(item);
        acc[user].total += item.beerPrice! * item.cartItemQuantity!;

        return acc;
      },
      {} as Record<string, { items: typeof cartItems; total: number }>,
    );

    return { groupedCartItemsByUserName };
  }, [cartItems]);

  return (
    <SafeAreaView>
      <GoBackButton />

      <ScrollView>
        {Object.entries(groupedCartItemsByUserName).map(([userName, items], index) => (
          <FlatList
            key={userName}
            ListHeaderComponent={() => <Text className="text-3xl font-bold">Cervezas de {userName}</Text>}
            scrollEnabled={false}
            data={items.items}
            keyExtractor={(item) => item.cartItemId?.toString()!}
            renderItem={({ item }) => (
              <View className="flex-row flex-wrap overflow-hidden rounded-xl bg-white shadow-md shadow-black/60">
                <Image
                  source={{
                    uri: item.beerImageUrl!,
                  }}
                  resizeMode="contain"
                  className="aspect-square h-36 w-36"
                />
                <View className="flex-1 border-l border-gray-200 p-4">
                  <Text className="flex-shrink text-xl font-bold" numberOfLines={1}>
                    {item.beerName}
                  </Text>
                  <Text className="text-gray-500">{item.beerBrand}</Text>
                  <Text className="mb-2 text-sm">{formatCurrency(item.beerPrice)}</Text>

                  <View className="mb-1 flex-row items-center justify-between gap-4">
                    <QuantitySelector quantity={item.cartItemQuantity!} setQuantity={() => {}} />

                    <Text className="text-2xl font-medium text-green-500">
                      {formatCurrency(item.beerPrice! * item.cartItemQuantity!)}
                    </Text>
                  </View>
                </View>
              </View>
            )}
            ListFooterComponent={() => (
              <View className="flex-row items-center justify-between px-4">
                <Text className="text-2xl font-medium">Subtotal</Text>
                <Text className="text-2xl font-medium">{formatCurrency(items.total)}</Text>
              </View>
            )}
            contentContainerClassName="gap-4 px-4 mb-6"
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
