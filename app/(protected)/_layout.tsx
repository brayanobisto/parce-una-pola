import { Fragment, useEffect, useState } from "react";
import { Stack, Redirect } from "expo-router";
import { supabase } from "@/lib/supabase";
import { useRouter } from "expo-router";
import { ActivityIndicator, SafeAreaView } from "react-native";
import { useUserStore } from "@/store";

export default function ProtectedLayout() {
  const isLoading = useUserStore((state) => state.isLoading);
  const user = useUserStore((state) => state.user);

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-white justify-center items-center">
        <ActivityIndicator className="text-green-500" size="large" />
      </SafeAreaView>
    );
  }

  if (!user) {
    return <Redirect href="/" />;
  }

  return (
    <Fragment>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="beer/[id]" />
      </Stack>
    </Fragment>
  );
}
