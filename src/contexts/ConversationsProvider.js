import React, {useContext, useState, useEffect, useCallback} from "react";
import {useSocket} from "./SocketProvider";
import PropTypes from "prop-types";

const ConversationsContext = React.createContext();

export function useConversations() {
  return useContext(ConversationsContext);
}

export function ConversationsProvider({children}) {
  const [contacts, setContacts] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [selectedConversationIndex, setSelectedConversationIndex] = useState("");
  const socket = useSocket();

  const addMessageToConversation = useCallback(
    (data) => {
      setConversations((prevConversations) => {
        const chat = prevConversations.find((prev) => prev._id === data._id);
        chat.messages = [...data.messages];
        return [...prevConversations];
      });
    },
    [setConversations],
  );

  useEffect(() => {
    if (socket == null) return;

    socket.on("receiveMessage", (res) => {
      addMessageToConversation(res);
    });

    socket.on("receiveContactList", (err, res) => {
      if (err) {
        alert(JSON.stringify(err));
      }
      setContacts(res);
    });

    socket.on("chatCreated", (res) => {
      if (res) {
        setContacts((prev) =>
          prev.filter((contact) => !res.members.findIndex((item) => item._id === contact._id)),
        );
        setConversations((prev) => [...prev, res]);
      }
    });

    socket.emit("call", "getContacts", {}, (err, res) => {
      if (err) {
        alert(JSON.stringify(err));
      }
      setContacts(res.users);
      setConversations(res.chats);
    });

    return () => socket.off("receiveMessage");
  }, [socket, addMessageToConversation]);

  function sendMessage(text) {
    socket.emit(
      "call",
      "sendMessage",
      {
        to: selectedConversationIndex,
        message: text,
      },
      (err, res) => {
        if (err) {
          alert(JSON.stringify(err));
        }
        addMessageToConversation(res);
      },
    );
  }

  function addToChat(_id) {
    socket.emit(
      "call",
      "createChat",
      {
        recipients: [_id],
      },
      (err, res) => {
        if (err) {
          alert(JSON.stringify(err));
        }
        setContacts((prev) =>
          prev.filter((contact) => res.members.findIndex((item) => item._id === contact._id)),
        );
        setConversations((prev) => [...prev, res]);
      },
    );
  }

  const value = {
    conversations,
    contacts,
    selectedConversation: conversations.find((con) => con._id === selectedConversationIndex),
    sendMessage,
    addToChat,
    selectedConversationIndex,
    setSelectedConversationIndex,
  };

  return <ConversationsContext.Provider value={value}>{children}</ConversationsContext.Provider>;
}

ConversationsProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
};
