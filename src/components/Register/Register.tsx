import React, { useState, ChangeEvent } from "react";
import { ReactComponent as LogoIcon } from "../../assets/images/icons8-google-scholar.svg";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import REGISTER_QUERY from "../../services/queries/register";
import { store } from "react-notifications-component";
import { history } from "../App";

interface IUserRegister {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
}

const Register: React.FC = () => {
  const [user, setUser] = useState<IUserRegister>({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: ""
  });
  const [register] = useMutation(REGISTER_QUERY, {
    update(cache, { data: { login } }) {
      store.addNotification({
        message: "User successfully created",
        type: "success",
        insert: "top",
        container: "top-right",
        dismiss: {
          duration: 5000
        }
      });
      history.push("/login");
    },
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

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [event.target.getAttribute("name") as string]: event.target.value });
  };

  const handleRegister = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    register({ variables: { ...user } });
  };

  return (
    <React.Fragment>
      <div className="auth-container">
        <div className="auth-logo">
          <LogoIcon className="auth-icon" />
        </div>
        <div className="auth-title">Create an account</div>
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
              type="text"
              value={user.firstName}
              onChange={event => handleChange(event)}
              placeholder="First name"
              className="auth-input"
              name="firstName"
            />
            <input
              type="text"
              value={user.lastName}
              onChange={event => handleChange(event)}
              placeholder="Last name"
              className="auth-input"
              name="lastName"
            />
            <input
              type="password"
              value={user.password}
              onChange={event => handleChange(event)}
              placeholder="Password"
              className="auth-input"
              name="password"
            />
            <input
              type="password"
              value={user.confirmPassword}
              onChange={event => handleChange(event)}
              placeholder="Confirm password"
              className="auth-input"
              name="confirmPassword"
            />
            <button className="auth-button" onClick={event => handleRegister(event)}>
              Register
            </button>
            <div className="auth-nav">
              Back to&nbsp;
              <Link to="/login" className="auth-nav-link">
                login
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="auth-footer">
        <div className="auth-footer-box">
          <div className="auth-footer-left">Scientific Papers</div>
          <div className="auth-footer-right">Faculty of Technical Sciences</div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Register;
