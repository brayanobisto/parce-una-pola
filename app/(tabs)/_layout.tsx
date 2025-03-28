import { Tabs } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: "Inicio",
          tabBarIcon: ({ focused }) => <FontAwesome name="home" size={24} color="black" />,
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          tabBarLabel: "Pedidos",
          tabBarIcon: ({ focused }) => <FontAwesome name="file-text" size={24} color="black" />,
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          tabBarLabel: "Carrito",
          tabBarIcon: ({ focused }) => <FontAwesome name="shopping-cart" size={24} color="black" />,
        }}
      />
    </Tabs>
  );
}
