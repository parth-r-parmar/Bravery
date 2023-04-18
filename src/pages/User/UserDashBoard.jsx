import React from "react";
import {useContext} from "react";
import {GlobalContext} from "../../contexts/userContext";
import {SiteContainer} from "../../Layout/Layout";

const UserDashBoard = () => {
  const {
    state: {user},
  } = useContext(GlobalContext);
  return (
    <>
      <SiteContainer
        logo={{
          url: user?.profile?.avatar,
          isStatic: false,
        }}
        heading={user?.profile?.name}
      >
        <div>
          <p className='masthead-subheading font-weight-light mb-0'>{user?.email}</p>
          <p className='masthead-subheading font-weight-light mb-0'>{user?.profile?.phoneNumber}</p>
        </div>
      </SiteContainer>
    </>
  );
};

export default UserDashBoard;
