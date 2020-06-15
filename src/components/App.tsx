import React, { useEffect } from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import Search from "./Search/Search";
import { ApolloProvider } from "@apollo/react-hooks";
import { apolloClient } from "../services/appoloClient";
import Login from "./Login/Login";
import PrivateRoute from "./PrivateRoute";
import { createBrowserHistory } from "history";
import User from "./User/User";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import Register from "./Register/Register";
import { auth } from "../services/auth";
import PublicRoute from "./PublicRoute";
import About from "./About/About";

export const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
      <ApolloProvider client={apolloClient}>
        <div className="App">
          <ReactNotification />
          <Switch>
            <Route
              exact
              path="/"
              render={() => {
                return auth.isAuthenticated ? <Redirect to="/search" /> : <Redirect to="/login" />;
              }}
            />
            <PrivateRoute path="/search" component={Search} />
            <PrivateRoute path="/about" component={About} />
            <PrivateRoute path="/user" component={User} />
            <PublicRoute path="/login" component={Login} />
            <PublicRoute path="/register" component={Register} />
          </Switch>
        </div>
      </ApolloProvider>
    </Router>
  );
}

export default App;
