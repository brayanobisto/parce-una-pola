import { FC, memo, useRef, useCallback } from "react";
import { Text, View, TextInput, TextInputProps, Pressable } from "react-native";
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
    <Pressable className="bg-white rounded-md py-1 px-3 shadow-lg w-full flex-shrink" onPress={handlePress}>
      <Text className="text-xs font-semibold text-gray-500 uppercase">{label}</Text>
      <TextInput
        ref={inputRef}
        className="font-medium h-10 p-0 m-0 text-black"
        cursorColor={colors.green[500]}
        {...restProps}
      />
    </Pressable>
  );
});

Input.displayName = "Input";
