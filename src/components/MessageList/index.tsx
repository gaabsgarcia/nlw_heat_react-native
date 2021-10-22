import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native";
import { styles } from "./style";
import { Message, MessageProps } from "../Message";
import { api } from "../../services/api";
import { MESSAGES_EXAMPLE } from "../../utils/messages";

import io from "socket.io-client";

const socket = io(String(api.defaults.baseURL));
let messagesQueue: MessageProps[] = MESSAGES_EXAMPLE;

socket.on("new_message", (newMessage) => {
  messagesQueue.push(newMessage);
});

export function MessageList() {
  const [currentMessages, setCurrentMessages] = useState<MessageProps[]>([]);

  useEffect(() => {
    async function fetchMessages() {
      const messagesResponse = await api.get<MessageProps[]>("/messages/last3");
      setCurrentMessages(messagesResponse.data);
    }
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (messagesQueue.length > 0) {
        setCurrentMessages((prevState) => [
          messagesQueue[0],
          prevState[0],
          prevState[1],
        ]);
        messagesQueue.shift();
      }
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="never"
    >
      {currentMessages.length
        ? currentMessages.map((currentMessage) => {
            <Message key={currentMessage.id} data={currentMessage} />;
          })
        : null}
    </ScrollView>
  );
}
