import { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import { CartButton } from "@/components/CartButton";
import { Button } from "@/components/ui/Button";
import { GoBackButton } from "@/components/ui/GoBackButton";
import { LoadingView } from "@/components/ui/LoadingView";
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
        <CartButton />
      </View>
      <ScrollView>
        <Image source={{ uri: beer?.imageUrl }} className="mb-4 aspect-square w-full" />

        <View className="flex-1 p-4">
          <Text className="text-2xl font-bold">{beer?.name}</Text>
          <Text className="mb-4 text-sm font-medium text-gray-500">{beer?.brand}</Text>

          <View className="flex-row justify-between">
            <View className="gap-2">
              <Text className="font-medium text-green-500">Cantidad</Text>
              <View className="flex-row items-center gap-2">
                <TouchableOpacity
                  className="rounded-md border border-green-500 bg-transparent p-2"
                  onPress={() => setQuantity(Math.max(quantity - 1, 1))}
                >
                  <FontAwesome name="minus" size={14} color="black" />
                </TouchableOpacity>
                <Text className="mx-6 text-2xl font-medium">{quantity}</Text>
                <TouchableOpacity
                  className="rounded-md border border-green-500 bg-transparent p-2"
                  onPress={() => setQuantity(quantity + 1)}
                >
                  <FontAwesome name="plus" size={14} color="black" />
                </TouchableOpacity>
              </View>
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
