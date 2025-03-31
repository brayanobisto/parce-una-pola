import type { FC } from "react";
import { useCallback } from "react";
import { TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

export const GoBackButton: FC = () => {
  const router = useRouter();

  const handleGoBack = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <TouchableOpacity className="p-4" onPress={handleGoBack}>
      <FontAwesome name="chevron-left" size={24} color="black" />
    </TouchableOpacity>
  );
};
