import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { TouchableOpacity, Text } from "react-native";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { Tables } from "@/types/supabase";
import { useCartItems } from "@/hooks/useCartItems";

export const CartButton = () => {
  const router = useRouter();
  const cartItems = useCartItems();

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <TouchableOpacity className="p-4" onPress={() => router.push("/(protected)/(tabs)/cart")}>
      <FontAwesome name="shopping-cart" size={24} color="black" />
      {totalItems > 0 && <Text className="text-xs text-white bg-green-500 rounded-full px-2">{totalItems}</Text>}
    </TouchableOpacity>
  );
};
