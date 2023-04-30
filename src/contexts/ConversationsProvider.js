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
  const [notifications, setNotifications] = useState([]);
  const [selectedConversationId, setSelectedConversationId] = useState("");
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
    if (notifications.includes(selectedConversationId))
      setNotifications((prev) =>
        prev.filter((notification) => notification !== selectedConversationId),
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedConversationId]);

  useEffect(() => {
    if (socket == null) return;

    socket.on("receiveMessage", (res) => {
      if (res._id !== selectedConversationId) setNotifications((prev) => [...prev, res._id]);
      addMessageToConversation(res);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket, addMessageToConversation]);

  function sendMessage(text) {
    socket.emit(
      "call",
      "sendMessage",
      {
        to: selectedConversationId,
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
    selectedConversation: conversations.find((con) => con._id === selectedConversationId),
    sendMessage,
    addToChat,
    selectedConversationId,
    setSelectedConversationId,
    notifications,
  };

  return <ConversationsContext.Provider value={value}>{children}</ConversationsContext.Provider>;
}

ConversationsProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
};