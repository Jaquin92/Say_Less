import React, { Component } from "react";
import axios from "axios";
import Moment from "react-moment";
import moment from "moment";
import "moment-timezone";
import { Link } from "react-router-dom";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      allPosts: []
    };
  }

  componentDidMount() {
    axios
      .get("/api/get")
      .then(response => this.setState({ allPosts: response.data }))
      .catch(() => {
        console.log("error on get, Home");
      });
  }

  render() {
    let posts = this.state.allPosts.map((item, i) => {
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
    return <div className="postContainer">{posts}</div>;
  }
}

export default Home;
