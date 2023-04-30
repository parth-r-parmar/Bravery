import React from "react";
import {ListGroup} from "react-bootstrap";
import {useConversations} from "../../contexts/ConversationsProvider";

const Conversations = () => {
  const {conversations, selectedConversationId, setSelectedConversationId, notifications} =
    useConversations();

  return (
    <ListGroup variant='flush'>
      {conversations.length ? (
        conversations.map((conversation, index) => (
          <ListGroup.Item
            key={index}
            action
            onClick={() => setSelectedConversationId(conversation._id)}
            active={selectedConversationId === conversation._id}
          >
            {conversation?.members?.map((member) => member.profile.name).join(", ")}
            {notifications.includes(conversation._id) ? (
              <span>
                <i className='fa-solid fa-comment-dots ms-2 text-primary'></i>
              </span>
            ) : (
              ""
            )}
          </ListGroup.Item>
        ))
      ) : (
        <div className='text-muted text-center mt-4'>No conversations</div>
      )}
    </ListGroup>
  );
};
export default Conversations;
