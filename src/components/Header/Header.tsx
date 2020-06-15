import React, { useState, ChangeEvent } from "react";
import "./Header.css";
import { ReactComponent as LogoIcon } from "../../assets/images/icons8-google-scholar.svg";
import { Link, useRouteMatch } from "react-router-dom";
import { history } from "../App";
import HeaderDropdown from "../shared/HeaderDropdown/HeaderDropdown";

const Header: React.FC = () => {
  const [scientificPaperNumber, setScientificPaperNumber] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setScientificPaperNumber(event.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13) {
      history.push(`/search/${e.currentTarget.value}`);
      setScientificPaperNumber("");
    }
  };

  return (
    <div className="header">
      <div className="header-content">
        <div className="header-logo">
          <div className="header-item">
            <LogoIcon className="header-logo-icon" />
            <h2>Scientific papers</h2>
          </div>
        </div>
        <div className="header-tabs">
          <div className="header-item--tabs">
            <h2 className="header-tab">
              <Link
                to="/search"
                className={useRouteMatch({ path: "/search" }) ? "header-link--selected" : "header-link"}
              >
                Search
              </Link>
            </h2>
            <h2 className="header-tab">
              <Link
                to="/about"
                className={useRouteMatch({ path: "/about" }) ? "header-link--selected" : "header-link"}
              >
                About
              </Link>
            </h2>
            <h2 className="header-tab">
              <input
                className="header-input"
                onKeyDown={event => handleKeyDown(event)}
                type="text"
                placeholder="Find by scientific paper number"
                value={scientificPaperNumber}
                onChange={event => handleChange(event)}
              />
            </h2>
          </div>
          <div className="header-item--right">
            <HeaderDropdown />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
