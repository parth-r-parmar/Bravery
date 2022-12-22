import React, {useReducer} from "react";
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

export const GlobalProvider = ({children}) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  return <GlobalContext.Provider value={{state, dispatch}}>{children}</GlobalContext.Provider>;
};
GlobalProvider.defaultProps = {
  children: "",
};

GlobalProvider.propTypes = {
  children: PropTypes.element,
};
