import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useLocalSearchParams } from "expo-router";

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

  console.log(id);
  console.log(beer);

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
      <ScrollView>
        <Image source={{ uri: beer?.imageUrl }} className="aspect-square w-full mb-4" />
        <View className="p-4">
          <Text className="text-2xl font-bold">{beer?.name}</Text>
          <Text className="text-gray-500">{beer?.brand}</Text>
          <Text className="text-green-500">{beer?.price}</Text>
          <Text className="text-gray-500">{beer?.stock}</Text>
          <TouchableOpacity className="bg-green-500 p-2 rounded-md">
            <Text className="text-white text-center">Agregar al carrito</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
