import React, {useContext, useState} from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import {deleteUserData} from "../../util/util";
import PropTypes from "prop-types";
import {Button, Modal} from "react-bootstrap";
import {GlobalContext} from "../../contexts/userContext";

const Header = (props) => {
  const {routes} = props;
  const [showModal, setShowModal] = useState(false);
  const {
    state: {user},
  } = useContext(GlobalContext);

  const getUserData = () => {
    setShowModal(true);
    // getUserData here
  };
  const editProfile = () => {
    //EditProfile here
    setShowModal(false);
  };
  const logout = () => {
    deleteUserData();
    window.location.href = "/";
  };
  return (
    <>
      <Navbar
        bg='secondary'
        expand='lg'
        className='text-uppercase fixed-top shadow-lg'
        id='mainNav'
      >
        <Container>
          <Navbar.Brand href='/'>Bravery</Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' className='bg-primary text-white' />
          <Navbar.Collapse id='navbarResponsive'>
            <Nav className='ms-auto'>
              {routes
                ? routes.map((item) => (
                    <Nav.Link key={item.id} href={`${item.isInSamePage ? "#" : "/"}${item.route}`}>
                      {item.text}
                    </Nav.Link>
                  ))
                : ""}
              {props.isUser ? (
                <div className='dropdown'>
                  <span
                    role='button'
                    className='profile bg-light dropdown-toggle'
                    data-bs-toggle='dropdown'
                  >
                    <img src={user?.profile?.avatar} alt='avatar' />
                  </span>
                  <ul className='dropdown-menu'>
                    <li>
                      <span className='dropdown-item' role='button' onClick={getUserData}>
                        Edit Profile
                      </span>
                    </li>
                    <li>
                      <span className='dropdown-item' role='button' onClick={logout}>
                        Logout
                      </span>
                    </li>
                  </ul>
                </div>
              ) : (
                ""
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        backdrop='static'
        size='lg'
        fullscreen='sm-down'
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you&apos;re reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant='primary' onClick={editProfile}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

Header.defaultProps = {
  routes: [],
};

Header.propTypes = {
  routes: PropTypes.array,
  isUser: PropTypes.bool,
};

export default React.memo(Header);
