import { Fragment } from "react";
import { Stack, Redirect } from "expo-router";
import { ActivityIndicator, SafeAreaView } from "react-native";
import { useUserStore } from "@/store";

export default function ProtectedLayout() {
  const user = useUserStore((state) => state.user);

  console.log("user", user);

  if (!user) {
    return <Redirect href="/sign-in" />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
