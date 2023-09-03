import {useContext, useState, useEffect, useCallback, createContext, FC, ReactNode} from "react";
import {useSocket} from "./SocketProvider";

interface User {
  _id: string;
  registeredComplaints: any;
  profile: any;
  email: string | undefined;
  members?: any[];
}

const ConversationsContext = createContext<undefined>(undefined);

export function useConversations() {
  return useContext(ConversationsContext);
}

export const ConversationsProvider: FC<{children: ReactNode}> = ({children}) => {
  const [contacts, setContacts] = useState<Array<User>>([]);
  const [conversations, setConversations] = useState<Array<User>>([]);
  const [notifications, setNotifications] = useState<Array<string>>([]);
  const [selectedConversationId, setSelectedConversationId] = useState("");
  const socket = useSocket();

  const addMessageToConversation = useCallback(
    (data: any) => {
      setConversations((prevConversations) => {
        const chat: any = prevConversations.find((prev) => prev._id === data._id);
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
  }, [selectedConversationId]);

  useEffect(() => {
    if (socket == null) return;

    socket.on("receiveMessage", (res: any) => {
      if (res._id !== selectedConversationId) setNotifications((prev) => [...prev, res._id]);
      addMessageToConversation(res);
    });

    socket.on("chatCreated", (res: any) => {
      if (res) {
        setContacts((prev) =>
          prev.filter((contact) => !res.members.findIndex((item: any) => item._id === contact._id)),
        );
        setConversations((prev) => [...prev, res]);
      }
    });

    socket.emit("call", "getContacts", {}, (err: any, res: any) => {
      if (err) {
        alert(JSON.stringify(err));
      }
      setContacts(res.users);
      setConversations(res.chats);
    });

    return () => socket.off("receiveMessage");
  }, [socket, addMessageToConversation]);

  function sendMessage(text: string) {
    socket.emit(
      "call",
      "sendMessage",
      {
        to: selectedConversationId,
        message: text,
      },
      (err: any, res: any) => {
        if (err) {
          alert(JSON.stringify(err));
        }
        addMessageToConversation(res);
      },
    );
  }

  function addToChat(_id: string) {
    socket.emit(
      "call",
      "createChat",
      {
        recipients: [_id],
      },
      (err: any, res: any) => {
        if (err) {
          alert(JSON.stringify(err));
        }
        setContacts((prev) =>
          prev.filter((contact) => res.members.findIndex((item: any) => item._id === contact._id)),
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
  } as any;

  return <ConversationsContext.Provider value={value}>{children}</ConversationsContext.Provider>;
};
