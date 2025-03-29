import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useLocalSearchParams, useRouter } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tables } from "@/types/supabase";
import { useUserStore } from "@/store";
export default function Beer() {
  const [beer, setBeer] = useState<Tables<"beers">>();
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    const fetchBeer = async () => {
      const { data, error } = await supabase.from("beers").select("*").eq("id", Number(id)).single();

      if (error) {
        console.error("Error fetching beers:", error);
      } else {
        setBeer(data);
      }
    };
    fetchBeer();
  }, []);

  const handleAddToCart = async () => {
    const { data, error } = await supabase
      .from("cart_items")
      .upsert({ addedBy: user?.id, beerId: Number(id), quantity: 1 });

    if (error) {
      console.error("Error adding to cart:", error);
    } else {
      console.log("Beer added to cart:", data);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <TouchableOpacity className="p-4" onPress={() => router.back()}>
        <FontAwesome name="chevron-left" size={24} color="black" />
      </TouchableOpacity>
      <ScrollView>
        <Image source={{ uri: beer?.imageUrl }} className="aspect-square w-full mb-4" />

        <View className="p-4 flex-1">
          <Text className="text-2xl font-bold">{beer?.name}</Text>
          <Text className="text-gray-500 font-medium mb-4 text-sm">{beer?.brand}</Text>

          <View className="flex-row justify-between ">
            <View className="gap-2">
              <Text className="font-medium text-green-500">Cantidad</Text>
              <View className="flex-row items-center gap-2">
                <TouchableOpacity className="bg-transparent p-2 rounded-md border border-green-500">
                  <FontAwesome name="minus" size={14} color="black" />
                </TouchableOpacity>
                <Text className="font-medium mx-6 text-2xl">1</Text>
                <TouchableOpacity className="bg-transparent p-2 rounded-md border border-green-500">
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
        <TouchableOpacity className="bg-green-500 rounded-xl py-4 mt-auto" onPress={handleAddToCart}>
          <Text className="text-white text-center font-bold text-xl">Agregar al carrito</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
