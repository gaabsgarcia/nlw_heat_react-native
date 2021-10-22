import React from "react";
import avatarImg from "../../assets/avatar.png";
import { Image, Platform } from "react-native";
import { styles } from "./styles";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "../../theme";

//erro de typagem em execução web não carrega

const SIZES = {
  SMALL: {
    containerSize: 32,
    avatarSize: 28,
  },
  NORMAL: {
    containerSize: 48,
    avatarSize: 42,
  },
};

type Props = {
  imageUri: string | undefined;
  sizes?: "SMALL" | "NORMAL";
};

// if (Platform.OS === "web") {
//   //tentativa falha de tratamento, não soube resolver
// }

const AVATAR_DEFAULT = Image.resolveAssetSource(avatarImg).uri;

export function UserPhoto({ imageUri, sizes = "NORMAL" }: Props) {
  const { containerSize, avatarSize } = SIZES[sizes];

  return (
    <LinearGradient
      colors={[COLORS.PINK, COLORS.YELLOW]}
      style={[
        styles.container,
        {
          width: containerSize,
          height: containerSize,
          borderRadius: avatarSize / 2,
        },
      ]}
      start={{ x: 0, y: 0.8 }}
      end={{ x: 0.9, y: 1 }}
    >
      <Image
        source={{ uri: imageUri || AVATAR_DEFAULT }}
        style={[
          styles.avatar,
          {
            width: avatarSize,
            height: avatarSize,
            borderRadius: avatarSize / 2,
          },
        ]}
      />
    </LinearGradient>
  );
}
