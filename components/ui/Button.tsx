import type { FC } from "react";
import type { TouchableOpacityProps } from "react-native";
import { memo } from "react";
import { ActivityIndicator, Text, TouchableOpacity } from "react-native";

import { cn } from "@/utils/cn";

interface ButtonProps extends TouchableOpacityProps {
  isLoading?: boolean;
}

export const Button: FC<ButtonProps> = memo((props) => {
  const { children, className, isLoading, disabled, ...restProps } = props;

  return (
    <TouchableOpacity
      className={cn("mt-auto flex-row items-center justify-center gap-2 rounded-xl bg-green-500 px-2 py-4", className, {
        "opacity-50": disabled || isLoading,
      })}
      disabled={disabled || isLoading}
      {...restProps}
    >
      <Text className="text-center text-xl font-bold text-white">{children}</Text>
      {isLoading && <ActivityIndicator size="small" color="white" />}
    </TouchableOpacity>
  );
});

Button.displayName = "Button";
