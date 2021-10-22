import React from "react";
import { KeyboardAvoidingView, Platform, View } from "react-native";
import { styles } from "./style";
import { Header } from "../../components/Header";
import { MessageList } from "../../components/MessageList";
import { SignInBox } from "../../components/SignInBox";
import { SendMessageForm } from "../../components/SendMessageForm";
import { useAuth } from "../../hooks/auth";

export function Home() {
  const { user } = useAuth();

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      //corrigir ajute em ios
      <View style={styles.container}>
        <Header />
        <MessageList />
        {!user ? <SignInBox /> : <SendMessageForm />}
      </View>
    </KeyboardAvoidingView>
  );
}
