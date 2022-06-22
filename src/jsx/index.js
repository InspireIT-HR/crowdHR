/* eslint-disable no-unused-vars */
import React, { useContext } from "react";

/// React router dom
import {  Switch, Route } from "react-router-dom";

/// Css
import "./index.css";
import "./chart.css";
import "./step.css";

/// Layout
import Nav from "./layouts/nav";
import Footer from "./layouts/Footer";
import ScrollToTop from './pages/ScrollToTop';

/// Table
import FilteringTable from "./components/table/FilteringTable/FilteringTable";

/// Charts
import SparklineChart from "./components/charts/Sparkline";
import ChartJs from "./components/charts/Chartjs";
import Chartist from "./components/charts/chartist";
import RechartJs from "./components/charts/rechart";
import ApexChart from "./components/charts/apexcharts";

import Setting from "./layouts/Setting";
import { ThemeContext } from "../context/ThemeContext";

import { routes } from './routes';

const Markup = () => {
  const { menuToggle } = useContext(ThemeContext);
  
  let path = window.location.pathname;
  path = path.split("/");
  path = path[path.length - 1];

  let pagePath = path.split("-").includes("page");
  return (
    <>
      <div
        id={`${!pagePath ? "main-wrapper" : ""}`}
        className={`${!pagePath ? "show" : "mh100vh"}  ${
          menuToggle ? "menu-toggle" : ""
        }`}
      >
        {!pagePath && <Nav />}

        <div className={`${!pagePath ? "content-body" : ""}`}>
          <div
            className={`${!pagePath ? "container-fluid" : ""}`}
            style={{ minHeight: window.screen.height - 60 }}
          >
            <Switch>
              {routes.map((route) => (
                <Route
                  exact
                  key={route.title}
                  path={`/${route.url}`}
                  component={route.component}
                />
              ))}
              {routes.map((route) => {
                return route.children.map((child) => (
                  <Route
                    key={child.title}
                    path={`/${route.url}/${child.url}`}
                    component={child.component}
                  />
                ))
              })}
            </Switch>
          </div>
        </div>
        {!pagePath && <Footer />}
      </div>
      <Setting />
	  <ScrollToTop />
    </>
  );
};

export default Markup;
