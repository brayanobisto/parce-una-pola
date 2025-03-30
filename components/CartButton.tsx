import type { FC } from "react";
import { useMemo } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

import { useCartItems } from "@/hooks/useCartItems";

export const CartButton: FC = () => {
  const router = useRouter();
  const cartItems = useCartItems();

  const totalItems = useMemo(() => cartItems.reduce((acc, item) => acc + item.quantity, 0), [cartItems]);

  return (
    <TouchableOpacity className="relative p-4" onPress={() => router.push("/(protected)/(tabs)/cart")}>
      <FontAwesome name="shopping-cart" size={24} color="black" />
      {totalItems > 0 && (
        <View className="absolute right-1 top-0 h-7 w-7 items-center justify-center rounded-full bg-green-500">
          <Text className="text-xs font-medium text-white">{totalItems}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};
