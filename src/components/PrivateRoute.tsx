import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { auth } from "../services/auth";

const PrivateRoute: React.FC<RouteProps> = ({ component: Component, ...restProps }) => {
  if (!Component) return null;
  return (
    <Route
      {...restProps}
      render={restProps => (auth.isAuthenticated() ? <Component {...restProps} /> : <Redirect to="/login" />)}
    />
  );
};

export default PrivateRoute;
