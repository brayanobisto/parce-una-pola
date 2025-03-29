import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useLocalSearchParams, useRouter } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";

interface Beer {
  id: number;
  name: string;
  brand: string;
  price: number;
  imageUrl: string;
  stock: number;
}
export default function Beer() {
  const [beer, setBeer] = useState<Beer>();
  const { id } = useLocalSearchParams();
  const router = useRouter();

  useEffect(() => {
    const fetchBeers = async () => {
      const { data, error } = await supabase.from("beers").select("*").eq("id", id).single();

      if (error) {
        console.error("Error fetching beers:", error);
      } else {
        setBeer(data as unknown as Beer);
      }
    };
    fetchBeers();
  }, []);

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
        <TouchableOpacity className="bg-green-500 rounded-xl py-4 mt-auto">
          <Text className="text-white text-center font-bold text-xl">Agregar al carrito</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
