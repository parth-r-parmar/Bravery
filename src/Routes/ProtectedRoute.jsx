import React from "react";
import {useContext} from "react";
import {Navigate} from "react-router-dom";
import {GlobalContext} from "../contexts/userContext";
import {getUser} from "../interaction/apiIntegration";
import {isAuthenticated} from "../util/util";
import PropTypes from "prop-types";

const ProtectedRoute = (props) => {
  const {
    state: {
      user: {email},
    },
    dispatch,
  } = useContext(GlobalContext);
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
  } else return <Navigate to='/auth/login' />;
};

ProtectedRoute.defaultProps = {
  element: "",
};
ProtectedRoute.propTypes = {
  element: PropTypes.element,
};

export default React.memo(ProtectedRoute);
