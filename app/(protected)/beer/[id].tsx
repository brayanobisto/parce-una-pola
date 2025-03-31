import { useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";

import { CartCountButton } from "@/components/CartCountButton";
import { Button } from "@/components/ui/Button";
import { GoBackButton } from "@/components/ui/GoBackButton";
import { LoadingView } from "@/components/ui/LoadingView";
import { QuantitySelector } from "@/components/ui/QuantitySelector";
import { SafeAreaView } from "@/components/ui/SafeAreaView";
import { useAddToCart } from "@/hooks/beer/useAddToCart";
import { useBeer } from "@/hooks/beer/useBeer";

export default function Beer() {
  const [quantity, setQuantity] = useState(1);
  const { id } = useLocalSearchParams<{ id: string }>();

  const { data: beer, isPending: isBeerPending } = useBeer(id);
  const { mutate: addToCart, isPending: isAddingToCart } = useAddToCart();

  const handleAddToCart = () => {
    addToCart({ beerId: Number(id), quantity });
  };

  if (isBeerPending) return <LoadingView />;

  return (
    <SafeAreaView>
      <View className="flex-row items-center justify-between">
        <GoBackButton />
        <CartCountButton />
      </View>

      <ScrollView>
        <Image source={{ uri: beer?.imageUrl }} className="mb-4 aspect-square w-full" />

        <View className="flex-1 p-4">
          <Text className="text-2xl font-bold">{beer?.name}</Text>
          <Text className="text-sm font-medium text-gray-500">{beer?.brand}</Text>
          <Text className="mb-4 text-sm font-medium">{beer?.stock} unidades disponibles</Text>

          <View className="flex-row justify-between">
            <View className="gap-2">
              <Text className="font-medium text-green-500">Cantidad</Text>
              <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
            </View>
            <View className="mb-4 gap-2">
              <Text className="font-medium text-green-500">Precio</Text>
              <Text className="text-2xl font-medium">
                {Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", minimumFractionDigits: 0 }).format(
                  beer?.price ?? 0,
                )}
              </Text>
            </View>
          </View>

          <View>
            <Text className="text-lg font-medium">Descripción</Text>
            <Text className="text-gray-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam magni dolorem soluta, quas eos impedit,
              laudantium aperiam ipsa incidunt fugit asperiores iste perspiciatis repellat id harum modi quo alias aut.
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam magni dolorem soluta, quas eos impedit,
              laudantium aperiam ipsa incidunt fugit asperiores iste perspiciatis repellat id harum modi quo alias aut.
            </Text>
          </View>
        </View>
      </ScrollView>
      <View className="p-4">
        <Button onPress={handleAddToCart} isLoading={isAddingToCart}>
          Agregar al carrito
        </Button>
      </View>
    </SafeAreaView>
  );
}
