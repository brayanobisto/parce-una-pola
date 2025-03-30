import { FC, memo } from "react";
import { TouchableOpacity, Text, TouchableOpacityProps } from "react-native";
import { cn } from "@/utils/cn";

interface ButtonProps extends TouchableOpacityProps {}

export const Button: FC<ButtonProps> = memo((props) => {
  const { children, className, ...restProps } = props;

  return (
    <TouchableOpacity className={cn("bg-green-500 rounded-xl py-4 mt-auto", className)} {...restProps}>
      <Text className="text-white text-center font-bold text-xl">{children}</Text>
    </TouchableOpacity>
  );
});

Button.displayName = "Button";
