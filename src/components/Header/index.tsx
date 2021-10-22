import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./style";
import { UserPhoto } from "../UserPhoto";
import LogoSvg from "../../assets/logo.svg";
import { useAuth } from "../../hooks/auth";
//apos a inserção da libs a aplicação não executa mais, isso apos dar reload, exportar do figma novamente e tentar outras formas de importação
//existem outras adições para que o svg possa funcionar na aplicação
//neste projeto foi seguido npm e as orientações do instrutor

export function Header() {
  const { user, signOut } = useAuth();

  return (
    <View style={styles.container}>
      <LogoSvg />
      <View style={styles.logoutButton}>
        <TouchableOpacity onPress={signOut}>
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
        <UserPhoto imageUri={user?.avatar_url} />
      </View>
    </View>
  );
}
