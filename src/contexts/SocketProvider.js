import React, {useContext, useEffect, useState} from "react";
import io from "socket.io-client";
import {GlobalContext} from "./userContext";
import PropTypes from "prop-types";

const SocketContext = React.createContext();

export function useSocket() {
  return useContext(SocketContext);
}

export function SocketProvider({children}) {
  const {
    state: {
      user: {_id = ""},
    },
  } = useContext(GlobalContext);
  const [socket, setSocket] = useState();

  useEffect(() => {
    if (_id) {
      const newSocket = io("http://localhost:5000/socket", {query: {_id}});
      setSocket(newSocket);
    }

    // return () => newSocket.close();
  }, [_id]);

  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
}
SocketProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
};
