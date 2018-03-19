import React, { Component } from "react";
import { getUser, getPosts } from "../ducks/reducer";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom"
import { Card, CardHeader } from 'material-ui/Card';
import Moment from "react-moment";
import moment from "moment";
import "moment-timezone";
import axios from 'axios'

class Posts extends Component {
  constructor() {
    super()

    this.state = {
      posts: [],
      myPosts: [],
      likedPosts: []
    }
  }

  componentDidMount() {
    this.props.getPosts();
    this.props.getUser();



    axios.get(`/api/liked/${this.props.user.id}`).then(response => {
      this.setState({ likedPosts: response.data, myPosts: this.props.userPosts, posts: this.props.userPosts })




    })

  }

  // componentWillReceiveProps(nextProps) {
  //   if (this.props != nextProps) {
  //     this.setState({ posts: this.props.userPosts })
  //   }
  // }

  sortPostsNew() {
    let newest = this.state.posts.sort((a, b) => {
      return b.id - a.id
    })


    this.setState({ posts: newest })

  }

  sortPostsPop() {
    let popular = this.state.posts.sort((a, b) => {
      return b.rating - a.rating
    })
    this.setState({ posts: popular })
  }

  likedPosts() {
    this.setState({ posts: this.state.likedPosts })
  }

  myPosts() {
    this.setState({ posts: this.state.myPosts })
  }


  render() {


    let posts = this.state.posts.map((item, i) => {

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
    return <div >
      <div className="profileCard">
        <div className="nameImg" >
          {this.props.user.name}
          <img className="profilePic" src={this.props.user.img} alt="" />
        </div>

        <div className="likesPosts"  > <button onClick={() => this.myPosts()} >{this.state.myPosts.length}-Posts</button>
          <button onClick={() => this.likedPosts()} >{this.state.likedPosts.length}-Likes </button>
        </div>




      </div>

      <div className="postNav" >
        <span>Discussions</span>
        <div className="sort" >  <div className="sortButton" onClick={() => this.sortPostsNew()} >Latest</div>
          <div className="sortButton" onClick={() => this.sortPostsPop()}   >Popular</div> </div>

      </div>

      {posts}</div>



  }
}

const mapStateToProps = state => state;

export default withRouter(
  connect(mapStateToProps, { getUser, getPosts })(Posts)
);
