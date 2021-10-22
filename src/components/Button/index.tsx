import React from "react";
import {
  ColorValue,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  ActivityIndicator,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { styles } from "./styles";

type Props = TouchableOpacityProps & {
  title: string;
  color: ColorValue;
  backgroundColor: ColorValue;
  icon?: React.ComponentProps<typeof AntDesign>["name"];
  isLoading?: boolean;
};

export function Button({
  title,
  color,
  backgroundColor,
  icon,
  isLoading = false,
  ...rest
}: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      disabled={isLoading}
      {...rest}
      style={[styles.button, { backgroundColor }]}
    >
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <>
          <AntDesign name={icon} size={24} style={styles.icon} />
          <Text style={[styles.title, { color }]}></Text>
        </>
      )}
    </TouchableOpacity>
  );
}
