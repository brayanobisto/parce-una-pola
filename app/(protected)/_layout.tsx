import { Redirect, Stack } from "expo-router";

import { useUserStore } from "@/store";

export default function ProtectedLayout() {
  const user = useUserStore((state) => state.user);

  if (!user) {
    return <Redirect href="/sign-in" />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
