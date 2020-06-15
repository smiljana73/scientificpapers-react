import React, { useState, ChangeEvent } from "react";
import "./User.css";
import Header from "../Header/Header";
import { useQuery, useMutation } from "@apollo/react-hooks";
import USER_INFO_QUERY from "../../services/queries/userInfo";
import { ReactComponent as UserIcon } from "../../assets/images/user.svg";
import UPDATE_USER_QUERY from "../../services/queries/updateUser";
import { store } from "react-notifications-component";

interface IUser {
  firstName: string;
  lastName: string;
}

interface IPassword {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const User: React.FC = () => {
  const [user, setUser] = useState<IUser>({ firstName: "", lastName: "" });
  const [password, setPassword] = useState<IPassword>({
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [updateUser] = useMutation(UPDATE_USER_QUERY, {
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

  const handleChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [event.target.getAttribute("name") as string]: event.target.value });
  };
  const handleChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword({ ...password, [event.target.getAttribute("name") as string]: event.target.value });
  };

  const updateName = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    updateUser({
      variables: { ...user },
      update(cache, { data: { updateUser } }) {
        setUser({ firstName: updateUser.firstName, lastName: updateUser.lastName });
        store.addNotification({
          message: "User successfully updated",
          type: "success",
          insert: "top",
          container: "top-right",
          dismiss: {
            duration: 5000
          }
        });
        cache.writeQuery({
          query: USER_INFO_QUERY,
          data: { getUser: updateUser }
        });
      }
    });
  };
  const updatePassword = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    updateUser({
      variables: { ...password },
      update() {
        setPassword({
          oldPassword: "",
          newPassword: "",
          confirmPassword: ""
        });
        store.addNotification({
          message: "Password successfully updated",
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

  const { loading, error, data } = useQuery(USER_INFO_QUERY, {
    onCompleted(data: any | {}) {
      setUser({
        firstName: data.getUser.firstName,
        lastName: data.getUser.lastName
      });
    }
  });

  return (
    <React.Fragment>
      <Header />
      <div className="container">
        <div className="container-content">
          <div className="container-left">
            <div className="content content-user">
              <div className="icon">
                <div className="icon-content">
                  <UserIcon />
                </div>
              </div>
            </div>
          </div>
          <div className="container-right container--user">
            <div className="content content-user">
              <div className="change">
                <div className="label label--main">Change user info</div>
                <div className="input-group">
                  <div className="label label--input">First Name:</div>
                  <input
                    type="text"
                    className="input"
                    name="firstName"
                    value={user.firstName}
                    onChange={event => handleChangeName(event)}
                  />
                </div>
                <div className="input-group">
                  <div className="label label--input">Last Name:</div>
                  <input
                    type="text"
                    className="input"
                    name="lastName"
                    value={user.lastName}
                    onChange={event => handleChangeName(event)}
                  />
                </div>
                <div className="submit">
                  <button className="submit-button" onClick={event => updateName(event)}>
                    Submit
                  </button>
                </div>
              </div>
              <div className="change">
                <div className="label label--main">Change password</div>
                <div className="input-group">
                  <div className="label label--input">Old password:</div>
                  <input
                    type="password"
                    className="input"
                    name="oldPassword"
                    value={password.oldPassword}
                    onChange={event => handleChangePassword(event)}
                  />
                </div>
                <div className="input-group">
                  <div className="label label--input">New password:</div>
                  <input
                    type="password"
                    className="input"
                    name="newPassword"
                    value={password.newPassword}
                    onChange={event => handleChangePassword(event)}
                  />
                </div>
                <div className="input-group">
                  <div className="label label--input">Confirm password:</div>
                  <input
                    type="password"
                    className="input"
                    name="confirmPassword"
                    value={password.confirmPassword}
                    onChange={event => handleChangePassword(event)}
                  />
                </div>
                <div className="submit">
                  <button className="submit-button" onClick={event => updatePassword(event)}>
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default User;
