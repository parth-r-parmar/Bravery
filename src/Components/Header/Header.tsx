import {FC, memo} from "react";
import {Link} from "react-router-dom";
import {deleteUserData} from "../../util/util";
import {useUser} from "../../contexts/UserProvider";

interface route {
  id: number;
  route: string;
  text: string;
  isInSamePage: boolean;
}

interface headerProps {
  routes: route[];
  isUser?: boolean;
}

const Header: FC<headerProps> = (props) => {
  const {routes} = props;
  // const [showModal, setShowModal] = useState(false);
  const {
    state: {user},
  } = useUser();

  // const getUserData = () => {
  //   setShowModal(true);
  //   // getUserData here
  // };
  const logout = () => {
    deleteUserData();
    window.location.href = "/";
  };
  return (
    <nav className='bg-white dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600'>
      <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'>
        <Link to='/' className='self-center text-2xl whitespace-nowrap dark:text-white'>
          Bravery
        </Link>
        <div className='flex'>
          <button
            data-collapse-toggle='navbar-sticky'
            type='button'
            className='inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
            aria-controls='navbar-sticky'
            aria-expanded='false'
          >
            <span className='sr-only'>Open main menu</span>
            <i className='fa-solid fa-bars fa-xl'></i>
          </button>

          {props.isUser ? (
            <div className='flex items-center md:order-2'>
              <button
                type='button'
                className='flex ms-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600'
                id='user-menu-button'
                aria-expanded='false'
                data-dropdown-toggle='user-dropdown'
                data-dropdown-placement='bottom'
              >
                <span className='sr-only'>Open user menu</span>
                <img src={user?.profile?.avatar} alt='avatar' className='w-8 h-8 rounded-full' />
              </button>
              {/* Dropdown menu */}
              <div
                className='z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600'
                id='user-dropdown'
              >
                <div className='px-4 py-3'>
                  <span className='block text-sm text-gray-900 dark:text-white'>Bonnie Green</span>
                  <span className='block text-sm  text-gray-500 truncate dark:text-gray-400'>
                    name@flowbite.com
                  </span>
                </div>
                <ul className='py-2' aria-labelledby='user-menu-button'>
                  <li>
                    <span
                      className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white'
                      // onClick={getUserData}
                    >
                      Edit Profile
                    </span>
                  </li>
                  <li>
                    <span
                      className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white'
                      onClick={logout}
                    >
                      Logout
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            ""
          )}

          <div
            className='items-center justify-between hidden w-full md:flex md:w-auto md:order-1'
            id='navbar-sticky'
          >
            <ul className='flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700'>
              {routes
                ? routes.map((item) => (
                    <li key={item.id}>
                      <Link to={`${item.isInSamePage ? "#" : "/"}${item.route}`}>{item.text}</Link>
                    </li>
                  ))
                : ""}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

Header.defaultProps = {
  routes: [],
};

export default memo(Header);
