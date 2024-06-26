import {useUser} from "../../contexts/UserProvider";
import {SiteContainer} from "../../Layout/Layout";

const UserDashBoard = () => {
  const {
    state: {user},
  } = useUser();
  return (
    <>
      <SiteContainer
        logo={{
          url: user?.profile?.avatar,
          isStatic: false,
        }}
        heading={user?.profile?.name}
        id='home'
      >
        <div>
          <p className='masthead-subheading mb-0'>{user?.email}</p>
          <p className='masthead-subheading mb-0'>{user?.profile?.phoneNumber}</p>
        </div>
      </SiteContainer>
    </>
  );
};

export default UserDashBoard;
