import { View, Text, FlatList, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const BEERS = Array.from({ length: 300 }, (_, i) => ({
  name: `Beer ${i + 1}`,
  imageUrl:
    "https://media.istockphoto.com/id/519728153/photo/mug-of-beer.jpg?s=612x612&w=0&k=20&c=DM6bXiXQ9edkP3tqjKiZG8ztbT0-ePgorYvgJnQLUWc=",
  brand: `Brand ${(i % 10) + 1}`, // Rotación entre 10 marcas
  price: Math.floor(Math.random() * (20 - 5) + 5), // Precio entre 5 y 20
  stock: Math.floor(Math.random() * 50) + 1, // Stock entre 1 y 50
}));

export default function Home() {
  return (
    <SafeAreaView className="flex-1">
      <FlatList
        data={BEERS}
        renderItem={({ item }) => (
          <View className="flex-1 rounded-xl bg-white shadow-md overflow-hidden">
            <Image source={{ uri: item.imageUrl }} className="w-full h-40" />
            <Text className="text-xl font-bold">{item.name}</Text>
            <Text className="text-gray-500">{item.brand}</Text>
            <Text className="text-lg font-bold">
              {Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", minimumFractionDigits: 0 }).format(
                Number(item.price)
              )}
            </Text>
          </View>
        )}
        keyExtractor={(item) => item.name}
        numColumns={2}
        contentContainerClassName="gap-4 p-4"
        columnWrapperClassName="gap-4"
      />
    </SafeAreaView>
  );
}
