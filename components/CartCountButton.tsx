import type { FC } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

import { useCartItemsCount } from "@/hooks/cart/useCartItemsCount";

export const CartCountButton: FC = () => {
  const router = useRouter();
  const totalItems = useCartItemsCount();

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
