import React, { Component } from "react";
import { getLikes, getUser, getPosts } from "../ducks/reducer";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Posts from "./Posts";

class Profile extends Component {
  componentDidMount() {
    this.props.getPosts();
    this.props.getUser();
    this.props.getLikes();
  }

  render() {
    return (
      <div className="postContainer">
        {this.props.loggedIn ? (
          <div>
            <div className="postRow">
              <div>
                <img className="profilePic" src={this.props.user.img} alt="" />{" "}
                {this.props.user.name}{" "}
              </div>
              {this.props.userPosts.length}-Posts
              {this.props.userLikes.length}-Likes
            </div>
            <Posts />
          </div>
        ) : (
            <p>You are not Logged in</p>
          )}
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default withRouter(
  connect(mapStateToProps, { getUser, getPosts, getLikes })(Profile)
);
