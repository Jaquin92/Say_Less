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
      .then(response => {


        this.setState({ allPosts: response.data })
        let newest = this.state.allPosts.sort((a, b) => {
          return b.id - a.id
        })
        this.setState({ allPosts: newest })

      }


      )
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
  sortPostsPop() {
    let popular = this.state.allPosts.sort((a, b) => {
      return b.rating - a.rating
    })
    this.setState({ allPosts: popular })
  }


  render() {
    let posts = this.state.allPosts.map((item, i) => {

      let path = <Link to={`/entry/${item.id}`} > {item.title.toUpperCase()}  </Link>
      let userName = <Link to={`/user/${item.userid}`}>{item.name}</Link>
      return <div className="thumbRow"  >



        <div className="inThumb" >
          <img className="postThumb" src={item.img} alt="" />


          <div className="secondInThumb" >
            <span className="categoryThumb" >{item.category}</span>
            <span className="nameThumb" >{userName}</span>
            <span className="titleThumb"  >{path}</span>
          </div>

        </div>

        <div className="thirdInThumb"  >
          <span> <Moment fromNow >{new Date(item.time).toLocaleString()}</Moment>
          </span>

          <span> Likes {item.rating}</span>  </div>

      </div>
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

export default Software;
