import React, { Fragment, useContext, useState } from "react";
/// React router dom
import { Link } from "react-router-dom";
import { ThemeContext } from "../../../context/ThemeContext";
import Logo from "../../../images/logo.png"
import iconLogo from "../../../images/iconLogo.png"

const NavHader = () => {
  const [toggle, setToggle] = useState(false);
  const { openMenuToggle } = useContext(
    ThemeContext
  );
  return (
    <div className="nav-header">
      <Link to="/dashboard" className="brand-logo">
        {!toggle ? (
			<Fragment>
        <img src={Logo}  alt="logo"/>
			</Fragment>
        ) : (
			<Fragment>
        <img src={iconLogo} width="50" alt="logo"/>
			</Fragment>
        )}
      </Link>

      <div
        className="nav-control"
        onClick={() => {
          setToggle(!toggle);
          openMenuToggle();
        }}
      >
        <div className={`hamburger ${toggle ? "is-active" : ""}`}>
          <span className="line"></span>
          <span className="line"></span>
          <span className="line"></span>
        </div>
      </div>
    </div>
  );
};

export default NavHader;
