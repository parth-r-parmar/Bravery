import { ListGroup } from "react-bootstrap";
import { useConversations } from "../../contexts/ConversationsProvider";

const Contacts = () => {
  const { contacts, addToChat } = useConversations();

  return (
    <ListGroup variant="flush">
      {contacts.length ? (
        contacts.map((contact) => (
          <ListGroup.Item
            key={contact._id}
            action
            onClick={() => addToChat(contact._id)}
          >
            {contact.profile.name}
          </ListGroup.Item>
        ))
      ) : (
        <div className="text-muted text-center mt-4">No contacts available</div>
      )}
    </ListGroup>
  );
};
export default Contacts;
