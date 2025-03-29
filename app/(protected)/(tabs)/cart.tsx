import { View, Text, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useRouter } from "expo-router";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { Tables } from "@/types/supabase";
export default function Cart() {
  const [cartItems, setCartItems] = useState<Tables<"cart_items">[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchCartItems = async () => {
      const { data, error } = await supabase.from("cart_items").select("*");

      if (error) console.error("Error fetching cart items:", error);
      else setCartItems(data);
    };

    fetchCartItems();

    // Escuchar cambios en la tabla cart_items
    const subscription = supabase
      .channel("cart_items")
      .on("postgres_changes", { event: "*", schema: "public", table: "cart_items" }, (payload) => {
        console.log("Cambio detectado:", payload);

        setCartItems((prevCartItems) => {
          if (payload.eventType === "INSERT") {
            return [...prevCartItems, payload.new as Tables<"cart_items">];
          }

          if (payload.eventType === "UPDATE") {
            return prevCartItems.map((item) =>
              item.id === payload.new.id ? (payload.new as Tables<"cart_items">) : item
            );
          }

          if (payload.eventType === "DELETE") {
            return prevCartItems.filter((item) => item.id !== payload.old.id);
          }

          return prevCartItems;
        });
      })
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white p-4">
      <TouchableOpacity onPress={() => router.back()}>
        <FontAwesome name="chevron-left" size={24} color="black" />
      </TouchableOpacity>
      <Text className="text-4xl font-medium my-4">Carrito</Text>
      <View className="flex-1 gap-4">
        <View className="rounded-xl bg-white shadow-md shadow-black/60 overflow-hidden flex-row flex-wrap">
          <Image
            source={{
              uri: "https://carulla.vtexassets.com/arquivos/ids/18475015/CERVEZA-LATA-DORADA-102127_a.jpg?v=638665918223470000",
            }}
            className="aspect-square w-36 h-36"
          />
          <View className="flex-1 py-4 px-4 border-l border-gray-200">
            <Text className="text-xl font-bold flex-shrink" numberOfLines={1}>
              Club Colombia Dorada 330ml lata
            </Text>
            <Text className="text-gray-500">Club Colombia</Text>
            <Text className="text-sm mb-2">200 unidades disponibles</Text>

            <View className="flex-row justify-between ">
              <View className="flex-row items-center gap-2">
                <TouchableOpacity className="bg-transparent p-2 rounded-md border border-green-500">
                  <FontAwesome name="minus" size={14} color="black" />
                </TouchableOpacity>
                <Text className="font-medium mx-6 text-2xl">1</Text>
                <TouchableOpacity className="bg-transparent p-2 rounded-md border border-green-500">
                  <FontAwesome name="plus" size={14} color="black" />
                </TouchableOpacity>
              </View>

              <Text className="font-medium text-2xl text-green-500">
                {Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", minimumFractionDigits: 0 }).format(
                  3900
                )}
              </Text>
            </View>
          </View>
        </View>

        <View className="rounded-xl bg-white shadow-md shadow-black/60 overflow-hidden flex-row flex-wrap">
          <Image
            source={{
              uri: "https://carulla.vtexassets.com/arquivos/ids/18475015/CERVEZA-LATA-DORADA-102127_a.jpg?v=638665918223470000",
            }}
            className="aspect-square w-36 h-36"
          />
          <View className="flex-1 py-4 px-4 border-l border-gray-200">
            <Text className="text-xl font-bold flex-shrink" numberOfLines={1}>
              Club Colombia Dorada 330ml lata
            </Text>
            <Text className="text-gray-500">Club Colombia</Text>
            <Text className="text-sm mb-2">200 unidades disponibles</Text>

            <View className="flex-row justify-between mb-1">
              <View className="flex-row items-center gap-2">
                <TouchableOpacity className="bg-transparent p-2 rounded-md border border-green-500">
                  <FontAwesome name="minus" size={14} color="black" />
                </TouchableOpacity>
                <Text className="font-medium mx-6 text-2xl">1</Text>
                <TouchableOpacity className="bg-transparent p-2 rounded-md border border-green-500">
                  <FontAwesome name="plus" size={14} color="black" />
                </TouchableOpacity>
              </View>

              <Text className="font-medium text-2xl text-green-500">
                {Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", minimumFractionDigits: 0 }).format(
                  3900
                )}
              </Text>
            </View>

            <Text className="text-xs text-gray-500">Agregado por Brayan Obispo</Text>
          </View>
        </View>
        <View className="rounded-xl bg-white shadow-md shadow-black/60 overflow-hidden flex-row flex-wrap">
          <Image
            source={{
              uri: "https://carulla.vtexassets.com/arquivos/ids/18475015/CERVEZA-LATA-DORADA-102127_a.jpg?v=638665918223470000",
            }}
            className="aspect-square w-36 h-36"
          />
          <View className="flex-1 py-4 px-4 border-l border-gray-200">
            <Text className="text-xl font-bold flex-shrink" numberOfLines={1}>
              Club Colombia Dorada 330ml lata
            </Text>
            <Text className="text-gray-500">Club Colombia</Text>
            <Text className="text-sm mb-2">200 unidades disponibles</Text>

            <View className="flex-row justify-between ">
              <View className="flex-row items-center gap-2">
                <TouchableOpacity className="bg-transparent p-2 rounded-md border border-green-500">
                  <FontAwesome name="minus" size={14} color="black" />
                </TouchableOpacity>
                <Text className="font-medium mx-6 text-2xl">1</Text>
                <TouchableOpacity className="bg-transparent p-2 rounded-md border border-green-500">
                  <FontAwesome name="plus" size={14} color="black" />
                </TouchableOpacity>
              </View>

              <Text className="font-medium text-2xl text-green-500">
                {Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", minimumFractionDigits: 0 }).format(
                  3900
                )}
              </Text>
            </View>
          </View>
        </View>
        <View className="rounded-xl bg-white shadow-md shadow-black/60 overflow-hidden flex-row flex-wrap">
          <Image
            source={{
              uri: "https://carulla.vtexassets.com/arquivos/ids/18475015/CERVEZA-LATA-DORADA-102127_a.jpg?v=638665918223470000",
            }}
            className="aspect-square w-36 h-36"
          />
          <View className="flex-1 py-4 px-4 border-l border-gray-200">
            <Text className="text-xl font-bold flex-shrink" numberOfLines={1}>
              Club Colombia Dorada 330ml lata
            </Text>
            <Text className="text-gray-500">Club Colombia</Text>
            <Text className="text-sm mb-2">200 unidades disponibles</Text>

            <View className="flex-row justify-between ">
              <View className="flex-row items-center gap-2">
                <TouchableOpacity className="bg-transparent p-2 rounded-md border border-green-500">
                  <FontAwesome name="minus" size={14} color="black" />
                </TouchableOpacity>
                <Text className="font-medium mx-6 text-2xl">1</Text>
                <TouchableOpacity className="bg-transparent p-2 rounded-md border border-green-500">
                  <FontAwesome name="plus" size={14} color="black" />
                </TouchableOpacity>
              </View>

              <Text className="font-medium text-2xl text-green-500">
                {Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", minimumFractionDigits: 0 }).format(
                  3900
                )}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
