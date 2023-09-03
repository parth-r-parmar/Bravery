import {useContext, useReducer, ReactNode, Dispatch, createContext, FC} from "react";

interface User {
  _id: string;
  registeredComplaints: any;
  profile: any;
  email: string | undefined;
}

interface State {
  user: User;
}

interface Action {
  type: string;
  payload: any;
}

interface ContextType {
  state: State;
  dispatch: Dispatch<Action>; // You should replace 'any' with your actual action types
}

let initialState: State = {
  user: {
    _id: "",
    registeredComplaints: {},
    profile: {},
    email: undefined,
  },
};

const userReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        user: action.payload,
      };
    default:
      return state;
  }
};

const GlobalContext = createContext<ContextType | undefined>(undefined);

export function useUser(): ContextType {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}

export const UserProvider: FC<{children: ReactNode}> = ({children}) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  return (
    <GlobalContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
UserProvider.defaultProps = {
  children: "",
};
