import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { TouchableOpacity, Text, View } from "react-native";
import { useCartItems } from "@/hooks/useCartItems";
import { useMemo } from "react";

export const CartButton = () => {
  const router = useRouter();
  const cartItems = useCartItems();

  const totalItems = useMemo(() => cartItems.reduce((acc, item) => acc + item.quantity, 0), [cartItems]);

  return (
    <TouchableOpacity className="p-4 relative" onPress={() => router.push("/(protected)/(tabs)/cart")}>
      <FontAwesome name="shopping-cart" size={24} color="black" />
      {totalItems > 0 && (
        <View className="absolute right-1 top-0 bg-green-500 rounded-full h-7 w-7 items-center justify-center">
          <Text className="text-xs font-medium text-white">{totalItems}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};
