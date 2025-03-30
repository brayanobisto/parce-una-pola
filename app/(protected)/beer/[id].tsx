import { useCallback, useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import type { Tables } from "@/lib/supabase/types";
import { CartButton } from "@/components/CartButton";
import { Button } from "@/components/ui/Button";
import { supabase } from "@/lib/supabase";
import { useUserStore } from "@/store";

export default function Beer() {
  const [beer, setBeer] = useState<Tables<"beers">>();
  const [quantity, setQuantity] = useState(1);
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    const fetchBeer = async () => {
      const { data, error } = await supabase.from("beers").select("*").eq("id", Number(id)).single();

      if (!error) {
        setBeer(data);
      }
    };

    fetchBeer();
  }, []);

  const handleAddToCart = useCallback(async () => {
    const { data: cartItem } = await supabase
      .from("cart_items")
      .select("quantity")
      .eq("addedBy", user?.id!)
      .eq("beerId", Number(id))
      .single();

    const newQuantity = (cartItem?.quantity ?? 0) + quantity;

    if (cartItem) {
      const { data, error } = await supabase
        .from("cart_items")
        .update({ quantity: newQuantity })
        .eq("addedBy", user?.id!)
        .eq("beerId", Number(id));
    } else {
      const { data, error } = await supabase
        .from("cart_items")
        .insert({ addedBy: user?.id!, beerId: Number(id), quantity: newQuantity });
    }
  }, [user?.id, id, quantity]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row items-center justify-between">
        <TouchableOpacity className="p-4" onPress={() => router.back()}>
          <FontAwesome name="chevron-left" size={24} color="black" />
        </TouchableOpacity>
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
        <Button onPress={handleAddToCart}>Agregar al carrito</Button>
      </View>
    </SafeAreaView>
  );
}
