import { FC, memo } from "react";
import { useRouter } from "expo-router";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Tables } from "@/lib/supabase/types";

export const CARD_HEIGHT = 140;

interface BeerCardProps {
  beer: Tables<"beers">;
}

export const BeerCard: FC<BeerCardProps> = memo(({ beer }) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      className={`flex-1 rounded-xl bg-white shadow-md shadow-black/60 overflow-hidden flex-row h-[${CARD_HEIGHT}px]`}
      onPress={() =>
        router.push({
          pathname: "/(protected)/beer/[id]",
          params: {
            id: beer.id,
          },
        })
      }
    >
      <Image source={{ uri: beer.imageUrl }} className="aspect-square" height={CARD_HEIGHT} width={CARD_HEIGHT} />
      <View className="flex-1 py-4 px-4 border-l border-gray-200">
        <Text className="text-xl font-bold flex-shrink" numberOfLines={2}>
          {beer.name}
        </Text>
        <Text className="text-gray-500">{beer.brand}</Text>
        <Text className="text-sm">{beer.stock} unidades disponibles</Text>

        <Text className="text-xl font-bold text-green-500">
          {Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", minimumFractionDigits: 0 }).format(
            Number(beer.price)
          )}
        </Text>
      </View>
    </TouchableOpacity>
  );
});

BeerCard.displayName = "BeerCard";
