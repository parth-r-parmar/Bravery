import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import {useSocket} from "./SocketProvider";

const ContactsContext = React.createContext();

export function useContacts() {
  return useContext(ContactsContext);
}

export function ContactsProvider({children}) {
  const [contacts, setContacts] = useState([
    {
      _id: "6444f2d4b54fb92048c29eee",
      profile: {
        name: "Parth - Test",
      },
    },
  ]);

  const socket = useSocket();

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
        setContacts((prev) => prev.filter((c) => c._id !== _id));
        console.log(res);
      },
    );

    // addMessageToConversation({recipients, text, sender: _id});
  }

  return (
    <ContactsContext.Provider value={{contacts, setContacts, addToChat}}>
      {children}
    </ContactsContext.Provider>
  );
}
ContactsProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
};
