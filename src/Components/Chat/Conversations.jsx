import React from "react";
import {ListGroup} from "react-bootstrap";
import {useConversations} from "../../contexts/ConversationsProvider";

const Conversations = () => {
  const {conversations, selectedConversationIndex, setSelectedConversationIndex} =
    useConversations();

  return (
    <ListGroup variant='flush'>
      {conversations.map((conversation, index) => (
        <ListGroup.Item
          key={index}
          action
          onClick={() => setSelectedConversationIndex(conversation._id)}
          active={selectedConversationIndex === conversation._id}
        >
          {conversation?.members?.map((member) => member.profile.name).join(", ")}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};
export default Conversations;
