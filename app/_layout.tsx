import { Fragment, useEffect } from "react";
import { ActivityIndicator, SafeAreaView } from "react-native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { supabase } from "@/lib/supabase";
import { useUserStore } from "@/store";

import "@/global.css";

export default function RootLayout() {
  const isLoading = useUserStore((state) => state.isLoading);
  const setIsLoading = useUserStore((state) => state.setIsLoading);
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);
      setIsLoading(false);
    };
    fetchUser();
  }, [setIsLoading, setUser]);

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator className="text-green-500" size="large" />
      </SafeAreaView>
    );
  }

  return (
    <Fragment>
      <StatusBar style="inverted" />
      <Stack screenOptions={{ headerShown: false }} />
    </Fragment>
  );
}
