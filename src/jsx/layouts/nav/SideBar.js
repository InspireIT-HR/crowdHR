/// Menu
import Metismenu from "metismenujs";
import React, { Component, useContext, useEffect, useState } from "react";
/// Scroll
import PerfectScrollbar from "react-perfect-scrollbar";
/// Link
import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { useScrollPosition } from "@n8tb1t/use-scroll-position";
import { ThemeContext } from "../../../context/ThemeContext";
import LogoutPage from "./Logout";
/// Image
import profile from "../../../images/profile/pic1.jpg";
import { useTranslation } from "react-i18next";

import { routes } from '../../../jsx/routes';
import { useSelector } from "react-redux";

class MM extends Component {
  componentDidMount() {
    this.$el = this.el;
    this.mm = new Metismenu(this.$el);
  }
  componentWillUnmount() {}
  render() {
    return (
      <div className="mm-wrapper">
        <ul className="metismenu" ref={(el) => (this.el = el)}>
          {this.props.children}
        </ul>
      </div>
    );
  }
}

const SideBar = () => {
  const isAuthenticated = useSelector(({ auth }) => auth.isAuthenticated);
  const user = useSelector(({ auth }) => auth.user);
  const permissions = useSelector(({ auth }) => auth.permissions);

  const {
    iconHover,
    sidebarposition,
    headerposition,
    sidebarLayout,
    language,
  } = useContext(ThemeContext);

  useEffect(() => {
    var btn = document.querySelector(".nav-control");
    var aaa = document.querySelector("#main-wrapper");

    function toggleFunc() {
      return aaa.classList.toggle("menu-toggle");
    }

    btn.addEventListener("click", toggleFunc);
    // console.log(language);
    //sidebar icon Heart blast
    var handleheartBlast = document.querySelector(".heart");
    function heartBlast() {
      return handleheartBlast.classList.toggle("heart-blast");
    }
    handleheartBlast.addEventListener("click", heartBlast);
  }, [language]);
  const { t } = useTranslation();

  //let scrollPosition = useScrollPosition();
  // For scroll

  const [hideOnScroll, setHideOnScroll] = useState(true);

  useScrollPosition(
    ({ prevPos, currPos }) => {
      const isShow = currPos.y > prevPos.y;
      if (isShow !== hideOnScroll) setHideOnScroll(isShow);
    },
    [hideOnScroll]
  );

  /// Path
  let path = window.location.pathname;
  path = path.split("/");
  path = path[path.length - 1];
  
  return (
    <div
      className={`dlabnav ${iconHover} ${
        sidebarposition.value === "fixed" &&
        sidebarLayout.value === "horizontal" &&
        headerposition.value === "static"
          ? hideOnScroll > 120
            ? "fixed"
            : ""
          : ""
      }`}
    >
      <PerfectScrollbar className="dlabnav-scroll">
        <Dropdown as="div" className=" header-profile2 dropdown">
          <Dropdown.Toggle
            variant=""
            as="a"
            className="nav-link i-false c-pointer"
            // href="#"
            role="button"
            data-toggle="dropdown"
          >
            <div className="header-info2 d-flex align-items-center">
              <img src={profile} width={20} alt="" />
              <div className="d-flex align-items-center sidebar-info">
                <div>
                  <span className="font-w400 d-block">
                    {isAuthenticated ? user.fullname : ''}
                  </span>
                  <small className="text-end font-w400">Superadmin</small>
                </div>
                <i className="fas fa-chevron-down"></i>
              </div>
            </div>
          </Dropdown.Toggle>

          <Dropdown.Menu
            align="right"
            className=" dropdown-menu dropdown-menu-end"
          >
            <Link to="/app-profile" className="dropdown-item ai-icon">
              <svg
                id="icon-user1"
                xmlns="http://www.w3.org/2000/svg"
                className="text-primary"
                width={18}
                height={18}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx={12} cy={7} r={4} />
              </svg>
              <span className="ms-2">Profile </span>
            </Link>
            <Link to="/email-inbox" className="dropdown-item ai-icon">
              <svg
                id="icon-inbox"
                xmlns="http://www.w3.org/2000/svg"
                className="text-success"
                width={18}
                height={18}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <span className="ms-2">Inbox </span>
            </Link>
            <LogoutPage />
          </Dropdown.Menu>
        </Dropdown>
        <MM className="metismenu" id="menu">
          {routes.map((route, i) => (route.permission === '' || permissions[route.permission]) && !route.hideSidebar && (
              <li key={i} className={path.startsWith(route.url) ? 'mm-active' : ''}>
                <Link className={route.children.length > 0 ? 'has-arrow ai-icon' : 'ai-icon'} to={`/${route.url}`}>
                  <i className={route.icon}></i>
                  <span className="nav-text">
                    {t(route.title)}
                  </span>
                </Link>
                {route.children.length > 0 && (
                  <ul>
                    {route.children.map((child, j) => (
                      <li key={`${i}-${j}`}>
                        <Link
                          className={child.url.endsWith(path) ? 'mm-active' : ''}
                          to={`/${route.url}/${child.url}`}
                        >
                          {t(child.title)}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            )
          )}
        </MM>
        <div className="copyright">
          <p>
            <strong>Jobick Job Admin</strong> © 2022 All Rights Reserved
          </p>
          <p className="fs-12">
            Made with <span className="heart"></span> by DexignLabs
          </p>
        </div>
      </PerfectScrollbar>
    </div>
  );
};

export default SideBar;
