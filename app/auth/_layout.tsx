import { Redirect, Stack } from "expo-router";

import { useUserStore } from "@/store";

export default function AuthLayout() {
  const user = useUserStore((state) => state.user);

  if (user) {
    return <Redirect href="/(protected)/(tabs)" />;
  }
  return <Stack screenOptions={{ headerShown: false }} />;
}
