import { Fragment, useEffect } from "react";
import { router, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, SafeAreaView } from "react-native";
import { supabase } from "@/lib/supabase";
import { useUserStore } from "@/store";

import "@/global.css";

export default function RootLayout() {
  const isLoading = useUserStore((state) => state.isLoading);
  const setIsLoading = useUserStore((state) => state.setIsLoading);
  const setUser = useUserStore((state) => state.setUser);

  const store = useUserStore((state) => state);

  console.log("store", store);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);
      setIsLoading(false);

      if (user) {
        router.replace("/(protected)/(tabs)");
      } else {
        router.replace("/");
      }
    };
    fetchUser();
  }, []);

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-white justify-center items-center">
        <ActivityIndicator className="text-green-500" size="large" />
      </SafeAreaView>
    );
  }

  return (
    <Fragment>
      <StatusBar style="inverted" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(protected)" />
      </Stack>
    </Fragment>
  );
}
