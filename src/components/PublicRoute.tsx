import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { auth } from "../services/auth";

const PublicRoute: React.FC<RouteProps> = ({ component: Component, ...restProps }) => {
  if (!Component) return null;
  return (
    <Route
      {...restProps}
      render={props => (auth.isAuthenticated() ? <Redirect to="/search" /> : <Component {...props} />)}
    />
  );
};

export default PublicRoute;
