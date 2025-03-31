import type { FC } from "react";
import { memo } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

interface QuantitySelectorProps {
  quantity: number;
  setQuantity: (quantity: number) => void;
}

export const QuantitySelector: FC<QuantitySelectorProps> = memo(({ quantity, setQuantity }) => (
  <View className="w-11 flex-row items-center">
    <TouchableOpacity
      className="rounded-md border border-green-500 bg-transparent p-2"
      onPress={() => setQuantity(Math.max(quantity - 1, 1))}
    >
      <FontAwesome name="minus" size={14} color="black" />
    </TouchableOpacity>
    <Text className="w-full text-center text-2xl font-medium">{quantity}</Text>
    <TouchableOpacity
      className="rounded-md border border-green-500 bg-transparent p-2"
      onPress={() => setQuantity(quantity + 1)}
    >
      <FontAwesome name="plus" size={14} color="black" />
    </TouchableOpacity>
  </View>
));

QuantitySelector.displayName = "QuantitySelector";
