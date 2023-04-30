import React, {useContext, useReducer} from "react";
import PropTypes from "prop-types";

let initialState = {
  user: {
    registeredComplaints: {},
    profile: {},
    email: undefined,
  },
};

const userReducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        user: action.payload,
      };
    default:
      return state;
  }
};

export const GlobalContext = React.createContext(initialState);

export function useUser() {
  return useContext(GlobalContext);
}

export const UserProvider = ({children}) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  return <GlobalContext.Provider value={{state, dispatch}}>{children}</GlobalContext.Provider>;
};
UserProvider.defaultProps = {
  children: "",
};

UserProvider.propTypes = {
  children: PropTypes.element,
};
