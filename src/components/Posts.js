import React, { Component } from "react";
import { getUser, getPosts } from "../ducks/reducer";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Moment from "react-moment";
import moment from "moment";
import "moment-timezone";
import { Link } from "react-router-dom";

class Posts extends Component {
  componentDidMount() {}

  render() {
    console.log(this.props.loggedIn);
    let posts;
    if (this.props.loggedIn) {
      posts = this.props.userPosts.map((item, i) => {
        return (
          <div className="postRow" key={i}>
            <img className="postThumb" src={item.img} alt="" />
            <div className="postInfo">
              <span>{item.name}</span>
              <span>{item.title}</span>
              <span>{item.category}</span>
              <Moment fromNow>{moment(item.time).local()}</Moment>
            </div>
          </div>
        );
      });
    }
    return (
      <div className="postContainer">
        <span>{posts}</span>
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default withRouter(
  connect(mapStateToProps, { getUser, getPosts })(Posts)
);
