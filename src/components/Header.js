import React, { Component } from "react";
import Icon from "./Icon";

import { Link } from "react-router-dom";
class Header extends Component {
  render() {
    return (
      <div className="Header">
        <div>
          <img className="logo" src={require("../images/logo.gif")} alt="" />
        </div>
        <h1>SL</h1>

        <div className="nav">
          <Link to="/">
            <span>Home</span>
          </Link>
          <Link to="/Software">
            <span>Software</span>
          </Link>
          <Link to="/Hardware">
            <span>Hardware</span>
          </Link>
          <Link to="/Crypto">
            <span>Crypto</span>
          </Link>
          <Link to="/Climate">
            <span>Climate</span>
          </Link>
        </div>
        <div className="iconHeader">
          <Icon />
        </div>
      </div>
    );
  }
}
export default Header;
