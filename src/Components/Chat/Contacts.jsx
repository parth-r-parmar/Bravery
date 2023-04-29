import React from "react";
import {ListGroup} from "react-bootstrap";
import {useConversations} from "../../contexts/ConversationsProvider";

const Contacts = () => {
  const {contacts, addToChat} = useConversations();

  return (
    <ListGroup variant='flush'>
      {contacts.map((contact) => (
        <ListGroup.Item key={contact._id} action onClick={() => addToChat(contact._id)}>
          {contact.profile.name}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};
export default Contacts;
