import { Navigate } from "react-router-dom";
import { useUser } from "../contexts/UserProvider";
import { getUser } from "../interaction/apiIntegration";
import { isAuthenticated } from "../util/util";

interface ProtectedRouteProps {
  element: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = (props:any) => {
  const {
    state: {
      user: { email },
    },
    dispatch,
  } = useUser();
  const auth = isAuthenticated();

  if (auth) {
    if (!email) {
      getUser().then((res) => {
        dispatch({
          type: "SET_USER",
          payload: res.user,
        });
        return props.element;
      });
    } else return props.element;
  } else return <Navigate to="/auth/login" />;
};

export default ProtectedRoute;
