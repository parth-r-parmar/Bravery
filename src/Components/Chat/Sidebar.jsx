import React, {useState} from "react";
import {Tab, Nav} from "react-bootstrap";
import Conversations from "./Conversations";
import Contacts from "./Contacts";
import {useUser} from "../../contexts/UserProvider";

const CONVERSATIONS_KEY = "conversations";
const CONTACTS_KEY = "contacts";

const Sidebar = () => {
  const [activeKey, setActiveKey] = useState(CONVERSATIONS_KEY);
  const {
    state: {
      user: {
        profile: {name = ""},
      },
    },
  } = useUser();

  return (
    <div style={{width: "250px"}} className='d-flex flex-column border-end rounded'>
      <Tab.Container activeKey={activeKey} onSelect={setActiveKey}>
        <Nav variant='tabs' className='justify-content-center'>
          <Nav.Item className='flex-grow-1'>
            <Nav.Link eventKey={CONVERSATIONS_KEY}>Conversations</Nav.Link>
          </Nav.Item>
          <Nav.Item className='flex-grow-1'>
            <Nav.Link eventKey={CONTACTS_KEY}>Contacts</Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content className='overflow-auto flex-grow-1'>
          <Tab.Pane eventKey={CONVERSATIONS_KEY}>
            <Conversations />
          </Tab.Pane>
          <Tab.Pane eventKey={CONTACTS_KEY}>
            <Contacts />
          </Tab.Pane>
        </Tab.Content>
        <div className='p-2 border-top small'>
          <span className='text-muted'>{name}</span>
        </div>
      </Tab.Container>
    </div>
  );
};
export default Sidebar;
