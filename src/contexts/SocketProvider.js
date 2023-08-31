import React, { useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { useUser } from "./UserProvider";
import PropTypes from "prop-types";

const SocketContext = React.createContext();

export function useSocket() {
  return useContext(SocketContext);
}

export function SocketProvider({ children }) {
  const {
    state: {
      user: { _id = "" },
    },
  } = useUser();
  const [socket, setSocket] = useState();

  useEffect(() => {
    if (_id) {
      const newSocket = io(`${process.env.REACT_APP_API_URL}/socket`, {
        query: { _id },
      });
      setSocket(newSocket);
    }

    // return () => newSocket.close();
  }, [_id]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}
SocketProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
};
