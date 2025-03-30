import { Tabs } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import colors from "tailwindcss/colors";

export default function TabsLayout() {
  return (
    <Tabs
      backBehavior="history"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.green[500],
        tabBarInactiveTintColor: colors.gray[500],
        tabBarItemStyle: {
          flexDirection: "row",
          alignItems: "center",
        },
        tabBarStyle: {
          backgroundColor: colors.white,
          height: 75,
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          borderTopWidth: 0,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: "Inicio",
          tabBarIcon: ({ focused }) => (
            <FontAwesome name="home" size={27} color={focused ? colors.green[500] : colors.gray[500]} />
          ),
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          tabBarLabel: "Pedidos",
          tabBarIcon: ({ focused }) => (
            <FontAwesome name="file-text" size={27} color={focused ? colors.green[500] : colors.gray[500]} />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          tabBarLabel: "Carrito",

          tabBarIcon: ({ focused }) => (
            <FontAwesome name="shopping-cart" size={27} color={focused ? colors.green[500] : colors.gray[500]} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: "Perfil",

          tabBarIcon: ({ focused }) => (
            <FontAwesome name="user" size={27} color={focused ? colors.green[500] : colors.gray[500]} />
          ),
        }}
      />
    </Tabs>
  );
}
