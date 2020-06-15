import React from "react";
import Header from "../Header/Header";
import "./About.css";
import { ReactComponent as LogoIcon } from "../../assets/images/icons8-google-scholar.svg";

const About: React.FC = () => {
  return (
    <React.Fragment>
      <Header />
      <div className="container">
        <div className="about">
          <div className="about-content">
            <div className="about-paragraph">
              This is an app for fast and efficent searching of scientific papers, ment for university use
              only. You can search through all kinds of papers written by students on an endless amount of
              topics.
            </div>
            <div className="about-paragraph">
              With a help of a filters such as year, mentor or scientific field, you can easily find the paper
              you are looking for with just a few clicks. This app provides all information about a paper:
              comission members, author, language, publisher, etc. Apart from this, you also get an access to
              a pdf file of a final version of a scientific paper, which you can download.
            </div>
            <div className="about-paragraph about-paragraph--last">
              We make sure we keep our content up to date so you can browse through new scientific papers as
              soon as they're finished.
            </div>
          </div>
          <LogoIcon className="about-logo" />
        </div>
      </div>
    </React.Fragment>
  );
};

export default About;
