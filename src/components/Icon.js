import React, { Component } from "react";
import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";
import IconButton from "material-ui/IconButton";
import MoreVertIcon from "material-ui/svg-icons/navigation/more-vert";
import { signOut, getLikes, getUser, getPosts } from "../ducks/reducer";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

class Icon extends Component {
  render() {
    return (
      <div>
        {this.props.loggedIn && (
          <div className="icon">
            <img className="iconPhoto" src={this.props.user.img} alt="" />
            {this.props.user.name}
            <IconMenu
              iconButtonElement={
                <IconButton>
                  <MoreVertIcon />
                </IconButton>
              }
              anchorOrigin={{ horizontal: "left", vertical: "top" }}
              targetOrigin={{ horizontal: "left", vertical: "top" }}
            >
              <Link to="/profile">
                {" "}
                <MenuItem primaryText="Profile" />{" "}
              </Link>
              <Link to="/">
                <MenuItem
                  onClick={() => {
                    this.props.signOut();
                    console.log(this.props.loggedIn);
                  }}
                  primaryText="Sign out"
                />
              </Link>
            </IconMenu>
          </div>
        )}

        {!this.props.loggedIn && (
          <a href="http://localhost:3002/login">Login</a>
        )}
      </div>
    );

    /* <div>{this.state.loggedIn && <div>{this.user.name}</div>}</div>; */
  }
}

const mapStateToProps = state => state;

export default withRouter(
  connect(mapStateToProps, { signOut, getUser, getPosts, getLikes })(Icon)
);
