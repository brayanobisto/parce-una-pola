import { FC } from "react";
import { TouchableOpacity, Text, TouchableOpacityProps } from "react-native";

interface ButtonProps extends TouchableOpacityProps {}

export const Button: FC<ButtonProps> = (props) => {
  const { children, ...rest } = props;

  return (
    <TouchableOpacity className="bg-green-500 rounded-xl py-4 mt-auto" {...props}>
      <Text className="text-white text-center font-bold text-xl">{children}</Text>
    </TouchableOpacity>
  );
};
