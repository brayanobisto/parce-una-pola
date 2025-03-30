import type { SafeAreaViewProps } from "react-native-safe-area-context";
import { memo } from "react";
import { SafeAreaView as RN_SafeAreaView } from "react-native-safe-area-context";

import { cn } from "@/utils/cn";

export const SafeAreaView = memo((props: SafeAreaViewProps) => {
  const { children, className, ...restProps } = props;

  return (
    <RN_SafeAreaView className={cn("flex-1 bg-white", className)} {...restProps}>
      {children}
    </RN_SafeAreaView>
  );
});

SafeAreaView.displayName = "SafeAreaView";
