import React, { useState } from "react";
import { TextInput, View, Alert, Keyboard } from "react-native";
import { api } from "../../services/api";
import { COLORS } from "../../theme";
import { Button } from "../Button";
import { styles } from "./style";

export function SendMessageForm() {
  const [message, setMessage] = useState("");
  const [sendingMessage, setSendingMessage] = useState(false);

  async function handleMessageSubmit() {
    const messageFormatted = message.trim();

    if (messageFormatted.length > 0) {
      setSendingMessage(true);
      await api.post("/messages", { message: messageFormatted });

      setMessage("");
      Keyboard.dismiss();
      setSendingMessage(false);
      Alert.alert("Mensagem enviada com sucesso!");
    } else {
      Alert.alert("Escreva a mensagem para enviar.");
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        keyboardAppearance="dark"
        placeholder="Qual a sua expectativa para o evento?"
        placeholderTextColor={COLORS.GRAY_PRIMARY}
        style={styles.input}
        multiline
        onChangeText={setMessage}
        value={message}
        maxLength={140}
        editable={!sendingMessage}
      />
      <Button
        title="ENVIAR MENSAGEM"
        backgroundColor={COLORS.PINK}
        color={COLORS.WHITE}
        isLoading={sendingMessage}
        onPress={handleMessageSubmit}
      />
    </View>
  );
}
