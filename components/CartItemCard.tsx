import { memo } from "react";
import { Image, Text, View } from "react-native";

import type { Tables } from "@/lib/supabase/types";
import { useRemoveCartItem } from "@/hooks/cart/useRemoveCartItem";
import { useUpdateCartItemQuantity } from "@/hooks/cart/useUpdateCartItemQuantity";
import { useUserStore } from "@/store";
import { formatCurrency } from "@/utils/currency";

import { QuantitySelector } from "./ui/QuantitySelector";

interface BeerCartItemCardProps {
  item: Tables<"cart_items_view">;
}

export const CART_ITEM_CARD_HEIGHT = 140;

export const CartItemCard = memo(({ item }: BeerCartItemCardProps) => {
  const user = useUserStore((state) => state.user);
  const {
    mutate: updateCartItemQuantity,
    isPending: isUpdatingCartItemQuantity,
    variables: updateCartItemQuantityVariables,
  } = useUpdateCartItemQuantity();
  const {
    mutate: removeCartItem,
    isPending: isRemovingCartItem,
    variables: removeCartItemVariables,
  } = useRemoveCartItem();

  return (
    <View className={`mb-4 flex-row flex-wrap rounded-xl bg-white shadow-sm h-[${CART_ITEM_CARD_HEIGHT}px] w-full`}>
      <Image
        source={{
          uri: item.beerImageUrl!,
        }}
        resizeMode="contain"
        className="aspect-square rounded-l-xl"
        height={CART_ITEM_CARD_HEIGHT}
        width={CART_ITEM_CARD_HEIGHT}
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
              isLoading={
                (isUpdatingCartItemQuantity && updateCartItemQuantityVariables?.cartItemId === item.cartItemId) ||
                (isRemovingCartItem && removeCartItemVariables?.cartItemId === item.cartItemId)
              }
              setQuantity={async (quantity) => {
                if (item.cartItemQuantity === 1 && quantity === 1) {
                  removeCartItem({ cartItemId: item.cartItemId! });
                } else {
                  updateCartItemQuantity({ cartItemId: item.cartItemId!, quantity });
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
  );
});

CartItemCard.displayName = "CartItemCard";
