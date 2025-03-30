import { View, Text, TouchableOpacity, Image, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useRouter } from "expo-router";
import { useCartItemsView } from "@/hooks/userCartItemsView";

export default function Cart() {
  const cartItems = useCartItemsView();
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white p-4">
      <TouchableOpacity onPress={() => router.back()}>
        <FontAwesome name="chevron-left" size={24} color="black" />
      </TouchableOpacity>
      <Text className="text-4xl font-medium my-4">Carrito</Text>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.cartItemId?.toString()!}
        renderItem={({ item }) => (
          <View className="rounded-xl bg-white shadow-md shadow-black/60 overflow-hidden flex-row flex-wrap">
            <Image
              source={{
                uri: item.beerImageUrl!,
              }}
              className="aspect-square w-36 h-36"
            />
            <View className="flex-1 py-4 px-4 border-l border-gray-200">
              <Text className="text-xl font-bold flex-shrink" numberOfLines={1}>
                {item.beerName}
              </Text>
              <Text className="text-gray-500">{item.beerBrand}</Text>
              <Text className="text-sm mb-2">
                {Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", minimumFractionDigits: 0 }).format(
                  item.beerPrice!
                )}
              </Text>

              <View className="flex-row justify-between mb-1">
                <View className="flex-row items-center gap-2">
                  <TouchableOpacity className="bg-transparent p-2 rounded-md border border-green-500">
                    <FontAwesome name="minus" size={14} color="black" />
                  </TouchableOpacity>
                  <Text className="font-medium mx-6 text-2xl">{item.cartItemQuantity}</Text>
                  <TouchableOpacity className="bg-transparent p-2 rounded-md border border-green-500">
                    <FontAwesome name="plus" size={14} color="black" />
                  </TouchableOpacity>
                </View>

                <Text className="font-medium text-2xl text-green-500">
                  {Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", minimumFractionDigits: 0 }).format(
                    item.beerPrice! * item.cartItemQuantity!
                  )}
                </Text>
              </View>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
