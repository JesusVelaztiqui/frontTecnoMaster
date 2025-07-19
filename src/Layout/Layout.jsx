import React from "react";
import Menu from "../Components/Menu";
import PropTypes from "prop-types";

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <div className="sidebar">
        <Menu />
      </div>
      <div className="contentWebPagnator">{children}</div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
