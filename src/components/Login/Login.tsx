import React, { useState, ChangeEvent } from "react";
import { useMutation } from "@apollo/react-hooks";
import LOGIN_QUERY from "../../services/queries/login";
import { ReactComponent as LogoIcon } from "../../assets/images/icons8-google-scholar.svg";
import { Redirect, Route, useRouteMatch } from "react-router";
import { auth } from "../../services/auth";
import { Link } from "react-router-dom";
import FORGOT_PASSWORD_QUERY from "../../services/queries/forgotPasword";
import { store } from "react-notifications-component";

interface IUserLogin {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [login] = useMutation(LOGIN_QUERY, {
    update(cache, { data: { login } }) {
      auth.login(login);
      setRedirect(true);
    },
    onError() {
      store.addNotification({
        message: "Invalid email or password",
        type: "danger",
        insert: "top",
        container: "top-right",
        dismiss: {
          duration: 5000
        }
      });
    }
  });
  const [forgotPassword] = useMutation(FORGOT_PASSWORD_QUERY, {
    onError(error) {
      store.addNotification({
        message: error.message.replace("GraphQL error: ", ""),
        type: "danger",
        insert: "top",
        container: "top-right",
        dismiss: {
          duration: 5000
        }
      });
    }
  });
  const [user, setUser] = useState<IUserLogin>({ email: "", password: "" });
  const [redirect, setRedirect] = useState<boolean>(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState<string>("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [event.target.getAttribute("name") as string]: event.target.value });
  };
  const handleChangeForgotPassword = (event: ChangeEvent<HTMLInputElement>) => {
    setForgotPasswordEmail(event.target.value);
  };

  const handleLogin = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    login({ variables: { ...user } });
  };
  const handleForgotPassword = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    forgotPassword({
      variables: { email: forgotPasswordEmail },
      update(cache, { data: { forgotPassword } }) {
        store.addNotification({
          message: forgotPassword,
          type: "success",
          insert: "top",
          container: "top-right",
          dismiss: {
            duration: 5000
          }
        });
      }
    });
  };

  let match = useRouteMatch();

  return (
    <React.Fragment>
      {redirect ? (
        <Redirect to="/search" />
      ) : (
        <React.Fragment>
          <div className="auth-container">
            <div className="auth-logo">
              <LogoIcon className="auth-icon" />
            </div>
            <Route path={`${match.path}`} exact>
              <div className="auth-title">Sign in to Scientific papers</div>
              <div className="auth-box">
                <div className="auth-form">
                  <input
                    type="text"
                    value={user.email}
                    onChange={event => handleChange(event)}
                    placeholder="Email"
                    className="auth-input"
                    name="email"
                  />
                  <input
                    type="password"
                    value={user.password}
                    onChange={event => handleChange(event)}
                    placeholder="Password"
                    className="auth-input"
                    name="password"
                  />
                  <div className="auth-nav auth-nav--forgot">
                    <Link to={`${match.url}/forgotPassword`} className="auth-nav-link">
                      Forgot Password?
                    </Link>
                  </div>
                  <button className="auth-button" onClick={event => handleLogin(event)}>
                    Login
                  </button>
                  <div className="auth-nav">
                    Don't have an account?&nbsp;
                    <Link to="/register" className="auth-nav-link">
                      Sign up
                    </Link>
                  </div>
                </div>
              </div>
            </Route>
            <Route path={`${match.path}/forgotPassword`}>
              <div className="auth-title">Forgot password?</div>
              <div className="auth-box">
                <div className="auth-form">
                  <div className="auth-nav-label">Enter your email and we'll send you your new password</div>
                  <input
                    type="text"
                    value={forgotPasswordEmail}
                    onChange={event => handleChangeForgotPassword(event)}
                    placeholder="Email"
                    className="auth-input"
                    name="email"
                  />
                  <button className="auth-button" onClick={event => handleForgotPassword(event)}>
                    Send
                  </button>
                  <div className="auth-nav">
                    Back to&nbsp;
                    <Link to="/login" className="auth-nav-link">
                      login
                    </Link>
                  </div>
                </div>
              </div>
            </Route>
          </div>
          <div className="auth-footer">
            <div className="auth-footer-box">
              <div className="auth-footer-left">Scientific Papers</div>
              <div className="auth-footer-right">Faculty of Technical Sciences</div>
            </div>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Login;
