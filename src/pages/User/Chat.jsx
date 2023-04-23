import React from "react";
import {ChatContainer, Sidebar} from "../../Components/Chat";

export const Chat = () => {
  return (
    <div className='h-100 px-4'>
      <div
        className='d-flex h-100'
        style={{
          border: "0.2px solid rgb(26, 188, 156)",
          boxShadow: "0 1rem 3rem rgba(26, 188, 156, 0.175)",
          borderRadius: "8px",
        }}
      >
        <Sidebar />
        <ChatContainer />
      </div>
    </div>
  );
};
