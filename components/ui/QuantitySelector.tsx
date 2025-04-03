import type { FC } from "react";
import { memo } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import { cn } from "@/utils/cn";

interface QuantitySelectorProps {
  quantity: number;
  setQuantity: (quantity: number) => Promise<void>;
  size?: "small" | "large";
  isLoading?: boolean;
}

export const QuantitySelector: FC<QuantitySelectorProps> = memo(
  ({ quantity, setQuantity, size = "large", isLoading = false }) => {
    const isLargeSize = size === "large";
    const iconSize = isLargeSize ? 14 : 10;

    return (
      <View
        className={cn("flex-row items-center", {
          "w-[120px]": isLargeSize,
          "w-[75px]": !isLargeSize,
        })}
      >
        <TouchableOpacity
          className="rounded-md border border-green-500 bg-transparent p-2"
          onPress={async () => await setQuantity(Math.max(quantity - 1, 1))}
          disabled={isLoading}
        >
          <FontAwesome name="minus" size={iconSize} color="black" />
        </TouchableOpacity>
        <Text
          className={cn("flex-1 text-center font-medium", {
            "text-2xl": isLargeSize,
            "text-base": !isLargeSize,
          })}
        >
          {isLoading ? <ActivityIndicator size="small" color="black" /> : quantity}
        </Text>
        <TouchableOpacity
          className="rounded-md border border-green-500 bg-transparent p-2"
          onPress={async () => await setQuantity(quantity + 1)}
          disabled={isLoading}
        >
          <FontAwesome name="plus" size={iconSize} color="black" />
        </TouchableOpacity>
      </View>
    );
  },
);

QuantitySelector.displayName = "QuantitySelector";
