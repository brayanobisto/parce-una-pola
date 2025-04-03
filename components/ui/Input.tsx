import type { FC } from "react";
import type { TextInputProps } from "react-native";
import { memo, useCallback, useRef } from "react";
import { Pressable, Text, TextInput } from "react-native";
import colors from "tailwindcss/colors";

interface InputProps extends TextInputProps {
  label: string;
}

export const Input: FC<InputProps> = memo((props) => {
  const inputRef = useRef<TextInput>(null);
  const { label, ...restProps } = props;

  const handlePress = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <Pressable className="w-full flex-shrink rounded-md bg-white px-3 py-1 shadow-sm" onPress={handlePress}>
      <Text className="text-xs font-semibold uppercase text-gray-500">{label}</Text>
      <TextInput
        ref={inputRef}
        className="m-0 h-10 p-0 font-medium text-black"
        cursorColor={colors.green[500]}
        {...restProps}
      />
    </Pressable>
  );
});

Input.displayName = "Input";
