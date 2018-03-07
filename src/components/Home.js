import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom"
import { Card, CardHeader } from 'material-ui/Card';
import Moment from "react-moment";
import moment from "moment";
import "moment-timezone";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      allPosts: [],
      news: []
    };
  }

  componentDidMount() {

    axios.get("/api/news").then(response => {

      this.setState({ news: response.data })
      console.log(response.data)

    }).catch(() => console.log("no news"))

    axios
      .get("/api/get")
      .then(response => this.setState({ allPosts: response.data }))
      .catch(() => {
        console.log("error on get, Home");
      });
  }

  sortPostsNew() {
    let newest = this.state.allPosts.sort((a, b) => {
      return b.id - a.id
    })
    this.setState({ allPosts: newest })

  }

  render() {
    let posts = this.state.allPosts.map((item, i) => {
      let userName = <Link to={`/user/${item.userid}`}>{item.name}</Link>
      let path = <Link to={`/entry/${item.id}`} > {item.title}  </Link>
      return <Card key={i} >
        <CardHeader
          title={userName}


          subtitle={path}

          avatar={item.img}
          actAsExpander={true}

        />

      </Card>
    })
    return <div className="postContainer"  >

      <div className="postNav" >
        <span>Discussions</span>
        <div className="sort" >  <div className="sortButton" onClick={() => this.sortPostsNew()} >Latest</div>
          <div className="sortButton"   >Popular</div> </div>
      </div>
      <div>{posts}</div>



    </div>
  }
}

export default Home;
