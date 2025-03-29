// TODO: Add react query for caching beers
import { supabase } from "@/lib/supabase";
import { Tables } from "@/types/supabase";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, FlatList, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  const [beers, setBeers] = useState<Tables<"beers">[]>([]);

  useEffect(() => {
    const fetchBeers = async () => {
      const { data, error } = await supabase.from("beers").select();

      if (error) {
        console.error("Error fetching beers:", error);
      } else {
        setBeers(data);
      }
    };
    fetchBeers();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <FlatList
        data={beers}
        renderItem={({ item }) => (
          <Link href={`/beer/${item.id}`}>
            <View className="flex-1 rounded-xl bg-white shadow-md shadow-black/60 overflow-hidden flex-row flex-wrap">
              <Image source={{ uri: item.imageUrl }} className="aspect-square w-40 h-40" />
              <View className="flex-1 py-4 px-4 border-l border-gray-200">
                <Text className="text-xl font-bold flex-shrink" numberOfLines={2}>
                  {item.name}
                </Text>
                <Text className="text-gray-500">{item.brand}</Text>
                <Text className="text-sm">{item.stock} unidades disponibles</Text>

                <Text className="text-xl font-bold text-green-500">
                  {Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", minimumFractionDigits: 0 }).format(
                    Number(item.price)
                  )}
                </Text>
              </View>
            </View>
          </Link>
        )}
        contentContainerClassName="gap-4 p-4"
        getItemLayout={(data, index) => ({
          length: 140,
          offset: 140 * index,
          index,
        })}
      />
    </SafeAreaView>
  );
}
