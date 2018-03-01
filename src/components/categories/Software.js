import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom"
import { Card, CardHeader } from 'material-ui/Card';
import Moment from "react-moment";
import moment from "moment";
import "moment-timezone";

class Software extends Component {
  constructor() {
    super();
    this.state = {
      allPosts: []
    };
  }

  componentDidMount() {
    axios
      .get("/api/get/Software")
      .then(response => this.setState({ allPosts: response.data }))
      .catch(() => {
        console.log("error on get, Home");
      });
  }

  render() {
    let posts = this.state.allPosts.map((item, i) => {
      let path = <Link to={`/entry/${item.id}`} > {item.title}  </Link>
      return <Card key={i} >
        <CardHeader
          title={item.name}


          subtitle={path}

          avatar={item.img}
          actAsExpander={true}

        />

      </Card>
    })
    return <div className="postContainer"  >{posts}</div>
  }
}

export default Software;
