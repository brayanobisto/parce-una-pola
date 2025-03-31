import type { FC } from "react";
import { ActivityIndicator } from "react-native";

import { SafeAreaView } from "./SafeAreaView";

export const LoadingView: FC = () => {
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-white">
      <ActivityIndicator size="large" className="text-green-500" />
    </SafeAreaView>
  );
};
