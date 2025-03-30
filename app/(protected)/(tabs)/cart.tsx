// TODO: Fix styles on Android
// TODO: Refactor to improve performance
import { Fragment } from "react";
import { FlatList, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import { SafeAreaView } from "@/components/ui/SafeAreaView";
import { useCartItemsView } from "@/hooks/userCartItemsView";
import { useUserStore } from "@/store";

export default function Cart() {
  const user = useUserStore((state) => state.user);
  const cartItems = useCartItemsView();
  const router = useRouter();

  const groupedCartItemsByUser = cartItems.reduce((acc: Record<string, typeof cartItems>, item) => {
    const user = (item.userData as { name: string }).name;

    if (!acc[user]) {
      acc[user] = [];
    }

    acc[user].push(item);

    return acc;
  }, {});

  return (
    <SafeAreaView className="p-4">
      <TouchableOpacity onPress={() => router.back()}>
        <FontAwesome name="chevron-left" size={24} color="black" />
      </TouchableOpacity>
      <Text className="my-4 text-4xl font-medium">Carrito</Text>

      <ScrollView>
        {Object.entries(groupedCartItemsByUser).map(([userName, items]) => (
          <View key={userName}>
            <Text className="my-4 text-2xl font-medium">{userName}</Text>
            <FlatList
              scrollEnabled={false}
              data={items}
              keyExtractor={(item) => item.cartItemId?.toString()!}
              renderItem={({ item }) => (
                <View className="flex-row flex-wrap overflow-hidden rounded-xl bg-white shadow-md shadow-black/60">
                  <Image
                    source={{
                      uri: item.beerImageUrl!,
                    }}
                    className="aspect-square h-36 w-36"
                  />
                  <View className="flex-1 border-l border-gray-200 px-4 py-4">
                    <Text className="flex-shrink text-xl font-bold" numberOfLines={1}>
                      {item.beerName}
                    </Text>
                    <Text className="text-gray-500">{item.beerBrand}</Text>
                    <Text className="mb-2 text-sm">
                      {Intl.NumberFormat("es-CO", {
                        style: "currency",
                        currency: "COP",
                        minimumFractionDigits: 0,
                      }).format(item.beerPrice!)}
                    </Text>

                    <View className="mb-1 flex-row justify-between">
                      <View className="flex-row items-center gap-2">
                        {user?.id === item.cartItemAddedBy && (
                          <Fragment>
                            <TouchableOpacity className="rounded-md border border-green-500 bg-transparent p-2">
                              <FontAwesome name="minus" size={14} color="black" />
                            </TouchableOpacity>
                          </Fragment>
                        )}
                        <Text className="mx-6 text-2xl font-medium">{item.cartItemQuantity}</Text>
                        {user?.id === item.cartItemAddedBy && (
                          <TouchableOpacity className="rounded-md border border-green-500 bg-transparent p-2">
                            <FontAwesome name="plus" size={14} color="black" />
                          </TouchableOpacity>
                        )}
                      </View>

                      <Text className="text-2xl font-medium text-green-500">
                        {Intl.NumberFormat("es-CO", {
                          style: "currency",
                          currency: "COP",
                          minimumFractionDigits: 0,
                        }).format(item.beerPrice! * item.cartItemQuantity!)}
                      </Text>
                    </View>
                  </View>
                </View>
              )}
            />
          </View>
        ))}
      </ScrollView>
      {/* <FlatList
        ListHeaderComponent={() => <Text className="text-4xl font-medium my-4">Cervezas agregadas por:</Text>}
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
      /> */}
    </SafeAreaView>
  );
}
