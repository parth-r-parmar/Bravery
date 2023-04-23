import React from "react";
import {ListGroup} from "react-bootstrap";
// import {useConversations} from "../contexts/ConversationsProvider";

const Conversations = () => {
  //   const {conversations, selectConversationIndex} = useConversations();
  const conversations = [
    {
      selected: false,
      recipients: [
        {
          name: "Parth",
        },
        {
          name: "Janak",
        },
      ],
    },
    {
      selected: true,
      recipients: [
        {
          name: "Yash",
        },
      ],
    },
    {
      selected: false,
      recipients: [
        {
          name: "Bhavya",
        },
        {
          name: "Parth",
        },
      ],
    },
  ];

  return (
    <ListGroup variant='flush'>
      {conversations.map((conversation, index) => (
        <ListGroup.Item
          key={index}
          action
          //   onClick={() => selectConversationIndex(index)}
          active={conversation.selected}
        >
          {conversation.recipients.map((r) => r.name).join(", ")}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};
export default Conversations;
