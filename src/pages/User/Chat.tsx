import {ChatContainer, Sidebar} from "../../Components/Chat";

export const Chat = () => {
  return (
    <div className='h-100 px-4'>
      <div className='d-flex h-100 chatWrapper'>
        <Sidebar />
        <ChatContainer />
      </div>
    </div>
  );
};
