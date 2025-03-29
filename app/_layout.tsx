import { Fragment, useEffect, useState } from "react";
import { router, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import "@/global.css";
import { ActivityIndicator } from "react-native";
import { supabase } from "@/lib/supabase";
import { useUserStore } from "@/store";

export default function RootLayout() {
  const isLoading = useUserStore((state) => state.isLoading);
  const setIsLoading = useUserStore((state) => state.setIsLoading);
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        router.replace("/(protected)/(tabs)");
      } else {
        router.replace("/");
      }

      setIsLoading(false);
    };
    fetchUser();
  }, []);

  return (
    <Fragment>
      <StatusBar style="inverted" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(protected)" />
      </Stack>
    </Fragment>
  );
}
