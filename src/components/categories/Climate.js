import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom"
import { Card, CardHeader } from 'material-ui/Card';
import Moment from 'react-moment';
// import Moment from "react-moment";
// import moment from "moment";
// import "moment-timezone";

class Climate extends Component {
  constructor() {
    super();
    this.state = {
      allPosts: []
    };
  }

  componentDidMount() {

    axios
      .get("/api/get/Climate")
      .then(response => {

        this.setState({ allPosts: response.data })
        let newest = this.state.allPosts.sort((a, b) => {
          return b.id - a.id
        })
        this.setState({ allPosts: newest })

      })
      .catch(() => {
        console.log("error on get, Home");
      });
  }

  sortPostsNew() {
    let newest = this.state.allPosts.sort((a, b) => {
      return b.id - a.id
    })

    this.setState({ allPosts: newest })
    console.log("hello")
  }

  sortPostsPop() {
    let popular = this.state.allPosts.sort((a, b) => {
      return b.rating - a.rating
    })
    this.setState({ allPosts: popular })
  }

  render() {



    let posts = this.state.allPosts.map((item, i) => {

      let path = <Link to={`/entry/${item.id}`} > {item.title}  </Link>
      let userName = <Link to={`/user/${item.userid}`}>{item.name}</Link>
      return <Card key={i} >
        <CardHeader
          title={userName}


          subtitle={path}

          avatar={item.img}
          actAsExpander={true}

        > <Moment fromNow >{new Date(item.time).toLocaleString()}</Moment> </CardHeader>

      </Card>
    })
    return <div className="postContainer"  >

      <div className="postNav" >
        <span>Discussions</span>
        <div className="sort" >  <div className="sortButton" onClick={() => this.sortPostsNew()} >Latest</div>
          <div className="sortButton" onClick={() => this.sortPostsPop()}   >Popular</div> </div>
      </div>
      <div>{posts}</div>



    </div>



  }

}

export default Climate;
