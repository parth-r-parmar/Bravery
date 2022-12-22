import React from "react";
import {useContext} from "react";
import Header from "../Components/Header/Header";
import SiteContainer from "../Components/Header/SiteContainer";
import {GlobalContext} from "../contexts/userContext";
import {userDashBoardRoutes} from "../NavRoutes/userDashBoardRoutes";

const UserDashBoard = () => {
  const {
    state: {user},
  } = useContext(GlobalContext);
  return (
    <>
      <Header routes={userDashBoardRoutes} isUser={true} />
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
