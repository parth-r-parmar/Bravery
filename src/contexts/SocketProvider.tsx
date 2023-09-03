import {FC, ReactNode, createContext, useContext, useEffect, useState} from "react";
import io from "socket.io-client";
import {useUser} from "./UserProvider";

const SocketContext = createContext<undefined>(undefined);

export function useSocket(): any {
  return useContext(SocketContext);
}

export const SocketProvider: FC<{children: ReactNode}> = ({children}) => {
  const {
    state: {
      user: {_id = ""},
    },
  } = useUser();
  const [socket, setSocket] = useState<any>();

  useEffect(() => {
    if (_id) {
      const newSocket = io(`${process.env.REACT_APP_API_URL}/socket`, {
        query: {_id},
      });
      setSocket(newSocket);
    }

    // return () => newSocket.close();
  }, [_id]);

  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};
