import React from "react";
import {ListGroup} from "react-bootstrap";
import {useContacts} from "../../contexts/ContactsProvider";

const Contacts = () => {
  const {contacts, addToChat} = useContacts();

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
