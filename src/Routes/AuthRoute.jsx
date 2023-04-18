import React from "react";
import {Navigate} from "react-router-dom";
import {isAuthenticated} from "../util/util";
import PropTypes from "prop-types";

const AuthRoute = (props) => {
  const auth = isAuthenticated();
  return auth ? <Navigate to='/user/dashboard' /> : props.element;
};
AuthRoute.defaultProps = {
  element: "",
};

AuthRoute.propTypes = {
  element: PropTypes.element,
};

export default React.memo(AuthRoute);
