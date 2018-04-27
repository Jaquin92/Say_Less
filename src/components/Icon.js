import React, { Component } from "react";
import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";
import IconButton from "material-ui/IconButton";
import DropDownMenu from "material-ui/DropDownMenu";
import MoreVertIcon from "material-ui/svg-icons/navigation/more-vert";
import { signOut, getLikes, getUser, getPosts } from "../ducks/reducer";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

class Icon extends Component {
  constructor() {
    super()

    this.state = { open: false }
  }





  render() {
    return (
      <div>
        {this.props.loggedIn && (
          <div className="icon">
            <img className="iconPhoto" src={this.props.user.img} alt="" />
            <span className="iconName" >{this.props.user.name}</span>



            <IconMenu
              className="responseMenu"


              onBlur={() => this.setState({ open: false })}
              open={this.state.open}
              onClick={() => { this.setState({ open: true }) }}
              onItemClick={() => this.setState({ open: false })}
              iconButtonElement={
                <IconButton>
                  <MoreVertIcon />
                </IconButton>
              }

              anchorOrigin={{ horizontal: "left", vertical: "top" }}
              targetOrigin={{ horizontal: "left", vertical: "top" }}
            >




              <MenuItem > <Link to="/profile"> Profile </Link> </MenuItem>

              <MenuItem > <Link to="/">Home </Link> </MenuItem>
              <MenuItem > <Link to="/Software"> Software </Link> </MenuItem>
              <MenuItem > <Link to="/Hardware"> Hardware </Link> </MenuItem>
              <MenuItem > <Link to="/Crypto"> Crypto </Link> </MenuItem>
              <MenuItem > <Link to="/Climate"> Climate </Link> </MenuItem>

              <MenuItem> <Link to="/newPost">New Post </Link></MenuItem>
              <MenuItem onClick={() => {
                this.props.signOut();
                console.log(this.props.loggedIn);
              }}    > <Link to="/"> Sign out </Link> </MenuItem>







            </IconMenu>


            <IconMenu
              className="shortMenu"



              iconButtonElement={
                <IconButton>
                  <MoreVertIcon />
                </IconButton>
              }

              anchorOrigin={{ horizontal: "left", vertical: "top" }}
              targetOrigin={{ horizontal: "left", vertical: "top" }}
            >




              <MenuItem > <Link to="/profile"> Profile </Link> </MenuItem>


              <MenuItem onClick={() => {
                this.props.signOut();
                console.log(this.props.loggedIn);
              }}    > <Link to="/"> Sign out </Link> </MenuItem>



            </IconMenu>


          </div>
        )}

        {!this.props.loggedIn && (

          <div>
            <a href="http://localhost:3002/login">Login</a>

            <IconMenu

              className="logInResponseMenu"

              open={this.state.open}
              onBlur={() => this.setState({ open: false })}
              onClick={() => { this.setState({ open: true }) }}
              onItemClick={() => this.setState({ open: false })}
              iconButtonElement={
                <IconButton>
                  <MoreVertIcon />
                </IconButton>
              }

              anchorOrigin={{ horizontal: "left", vertical: "top" }}
              targetOrigin={{ horizontal: "left", vertical: "top" }}
            >


              <MenuItem > <Link to="/">Home </Link> </MenuItem>
              <MenuItem > <Link to="/Software"> Software </Link> </MenuItem>
              <MenuItem > <Link to="/Hardware"> Hardware </Link> </MenuItem>
              <MenuItem > <Link to="/Crypto"> Crypto </Link> </MenuItem>
              <MenuItem > <Link to="/Climate"> Climate </Link> </MenuItem>
            </IconMenu>
          </div>
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
