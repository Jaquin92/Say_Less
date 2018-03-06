import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getUser } from "../ducks/reducer"
import Icon from "./Icon";

import { Link } from "react-router-dom";
class Header extends Component {
  constructor() {
    super()

  }

  componentDidMount() {
    this.props.getUser()
  }
  render() {
    return (
      <div className="Header">

        <div className="logoNav">
          <div className="headLogo" >
            <img className="logo" src={require("../images/logo.gif")} alt="" />
            <h1>SL</h1>

          </div>


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
        </div>
        <div className="iconHeader">
          <Icon />
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => state;

export default withRouter(connect(mapStateToProps, { getUser })(Header));
