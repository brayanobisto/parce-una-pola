import type { FC } from "react";
import type { TouchableOpacityProps } from "react-native";
import { memo } from "react";
import { Text, TouchableOpacity } from "react-native";

import { cn } from "@/utils/cn";

export const Button: FC<TouchableOpacityProps> = memo((props) => {
  const { children, className, ...restProps } = props;

  return (
    <TouchableOpacity
      className={cn("mt-auto rounded-xl bg-green-500 py-4", className, {
        "opacity-50": restProps.disabled,
      })}
      {...restProps}
    >
      <Text className="text-center text-xl font-bold text-white">{children}</Text>
    </TouchableOpacity>
  );
});

Button.displayName = "Button";
