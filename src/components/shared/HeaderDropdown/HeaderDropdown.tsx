import React, { useState, useRef, useEffect } from "react";
import "./HeaderDropdown.css";
import { useQuery } from "@apollo/react-hooks";
import USER_INFO_QUERY from "../../../services/queries/userInfo";
import { ReactComponent as UserIcon } from "../../../assets/images/userRegular.svg";
import { auth } from "../../../services/auth";
import { apolloClient } from "../../../services/appoloClient";
import { history } from "../../App";
import { IoMdArrowDropdown } from "react-icons/io";

const HeaderDropdown: React.FC = () => {
  const [open, setOpen] = useState(false);
  const refDropdown = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleButtonClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault();
    setOpen(!open);
  };

  const handleLogout = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.preventDefault();
    auth.logout();
    apolloClient.clearStore();
    history.push("/login");
  };

  const userSettings = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.preventDefault();
    history.push("/user");
  };

  const handleClickOutside = (event: any) => {
    if (refDropdown.current && !refDropdown.current.contains(event.target)) {
      setOpen(false);
    }
  };

  const { loading, error, data } = useQuery(USER_INFO_QUERY);
  return (
    <div className="dropdown" ref={refDropdown}>
      <h2 className="dropdown-button">
        <a className="dropdown-link" onClick={event => handleButtonClick(event)}>
          <UserIcon className="dropdown-icon" />
          <div>
            <IoMdArrowDropdown className="dropdown-arrow" />
          </div>
        </a>
      </h2>
      {open && (
        <div className="dropdown-items">
          {!(loading || error) && (
            <div className="dropdown-username">
              {data.getUser.firstName}&nbsp;
              {data.getUser.lastName}
            </div>
          )}
          <div className="dropdown-list">
            <div className="dropdown-item" onClick={event => userSettings(event)}>
              <span>User settings</span>
            </div>
            <div className="dropdown-item dropdown-item--last" onClick={event => handleLogout(event)}>
              <span>Logout</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeaderDropdown;
