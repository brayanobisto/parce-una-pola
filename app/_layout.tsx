import { Fragment } from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import "@/global.css";
import { ActivityIndicator } from "react-native";

export default function RootLayout() {
  return (
    <Fragment>
      <StatusBar style="inverted" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(protected)" />
      </Stack>
    </Fragment>
  );
}
