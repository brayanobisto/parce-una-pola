import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { useLocalSearchParams, useRouter } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tables } from "@/types/supabase";
import { useUserStore } from "@/store";
import { Button } from "@/components/Button";
import { CartButton } from "@/components/CartButton";

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
        <Image source={{ uri: beer?.imageUrl }} className="aspect-square w-full mb-4" />

        <View className="p-4 flex-1">
          <Text className="text-2xl font-bold">{beer?.name}</Text>
          <Text className="text-gray-500 font-medium mb-4 text-sm">{beer?.brand}</Text>

          <View className="flex-row justify-between ">
            <View className="gap-2">
              <Text className="font-medium text-green-500">Cantidad</Text>
              <View className="flex-row items-center gap-2">
                <TouchableOpacity
                  className="bg-transparent p-2 rounded-md border border-green-500"
                  onPress={() => setQuantity(Math.max(quantity - 1, 1))}
                >
                  <FontAwesome name="minus" size={14} color="black" />
                </TouchableOpacity>
                <Text className="font-medium mx-6 text-2xl">{quantity}</Text>
                <TouchableOpacity
                  className="bg-transparent p-2 rounded-md border border-green-500"
                  onPress={() => setQuantity(quantity + 1)}
                >
                  <FontAwesome name="plus" size={14} color="black" />
                </TouchableOpacity>
              </View>
            </View>
            <View className="gap-2 mb-4">
              <Text className="font-medium text-green-500">Precio</Text>
              <Text className="font-medium  text-2xl">
                {Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", minimumFractionDigits: 0 }).format(
                  beer?.price ?? 0
                )}
              </Text>
            </View>
          </View>

          <View>
            <Text className="font-medium text-lg">Descripción</Text>
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
