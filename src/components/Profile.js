import React, { Component } from "react";
import { getLikes, getUser, getPosts } from "../ducks/reducer";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Posts from "./Posts";

class Profile extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.props.getPosts();
    this.props.getUser();
    this.props.getLikes();
  }

  render() {
    console.log(this.props.loggedIn);
    return (
      <div>
        {this.props.loggedIn ? (
          <div>
            <div>
              <img className="profilePic" src={this.props.user.img} alt="" />{" "}
              {this.props.user.name}{" "}
            </div>
            {this.props.userPosts.length}-Posts
            {this.props.userLikes.length}-Likes
            <Posts />
          </div>
        ) : (
          <p>You Are Not Logged In</p>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default withRouter(
  connect(mapStateToProps, { getUser, getPosts, getLikes })(Profile)
);
