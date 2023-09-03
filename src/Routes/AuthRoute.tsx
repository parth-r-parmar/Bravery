import {memo} from "react";
import {Navigate} from "react-router-dom";
import {isAuthenticated} from "../util/util";

interface AuthRouteProps {
  element: JSX.Element;
}

const AuthRoute = (props: AuthRouteProps) => {
  const auth = isAuthenticated();
  return auth ? <Navigate to='/user/dashboard' /> : props.element;
};
AuthRoute.defaultProps = {
  element: "",
};

export default memo(AuthRoute);
