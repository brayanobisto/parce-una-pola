import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";

export const CartButton = () => {
  const router = useRouter();

  return (
    <TouchableOpacity className="p-4" onPress={() => router.push("/(protected)/(tabs)/cart")}>
      <FontAwesome name="shopping-cart" size={24} color="black" />
    </TouchableOpacity>
  );
};
