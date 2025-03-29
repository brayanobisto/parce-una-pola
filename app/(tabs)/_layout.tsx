import { Tabs } from "expo-router";
import colors from "tailwindcss/colors";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import tailwindConfig from "@/tailwind.config";
import resolveConfig from "tailwindcss/resolveConfig";

const fullConfig = resolveConfig(tailwindConfig);

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.green[500],
        tabBarInactiveTintColor: colors.gray[500],
        tabBarStyle: {
          backgroundColor: colors.white,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: "Inicio",
          tabBarIcon: ({ focused }) => (
            <FontAwesome name="home" size={24} color={focused ? colors.green[500] : colors.gray[500]} />
          ),
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          tabBarLabel: "Pedidos",
          tabBarIcon: ({ focused }) => (
            <FontAwesome name="file-text" size={24} color={focused ? colors.green[500] : colors.gray[500]} />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          tabBarLabel: "Carrito",

          tabBarIcon: ({ focused }) => (
            <FontAwesome name="shopping-cart" size={24} color={focused ? colors.green[500] : colors.gray[500]} />
          ),
        }}
      />
    </Tabs>
  );
}
