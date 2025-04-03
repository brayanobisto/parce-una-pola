import { Text, View } from "react-native";
import { Tabs } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import colors from "tailwindcss/colors";

import { useSignOut } from "@/hooks/auth/useSignOut";
import { useCartItemsCount } from "@/hooks/cart/useCartItemsCount";

export default function TabsLayout() {
  const cartItemsCount = useCartItemsCount("tabs_layout");
  const { mutate: signOut } = useSignOut();

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
          href: null,
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
            <View className="relative">
              <FontAwesome name="shopping-cart" size={27} color={focused ? colors.green[500] : colors.gray[500]} />
              {cartItemsCount > 0 && (
                <View className="absolute -right-3 -top-3 h-7 w-7 items-center justify-center rounded-full bg-green-500">
                  <Text className="text-xs font-medium text-white">{cartItemsCount}</Text>
                </View>
              )}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        listeners={{
          tabPress: async (e) => {
            e.preventDefault();
            await signOut();
          },
        }}
        options={{
          tabBarLabel: "Salir",
          tabBarIcon: ({ focused }) => (
            <FontAwesome name="sign-out" size={24} color={focused ? colors.green[500] : colors.gray[500]} />
          ),
        }}
      />
    </Tabs>
  );
}
