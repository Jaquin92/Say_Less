import React, { Component } from "react";
import { getUser, getPosts } from "../ducks/reducer";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom"
import { Card, CardHeader } from 'material-ui/Card';
import Moment from "react-moment";
import moment from "moment";
import "moment-timezone";

class Posts extends Component {
  constructor() {
    super()

    this.state = {
      posts: []
    }
  }

  componentDidMount() {
    this.setState({ posts: this.props.userPosts })
  }

  componentWillReceiveProps(nextProps) {
    if (this.props != nextProps) {
      this.setState({ posts: this.props.userPosts })
    }
  }

  sortPostsNew() {
    let newest = this.state.posts.sort((a, b) => {
      return b.id - a.id
    })

    console.log(newest)
    this.setState({ posts: newest })

  }


  render() {
    console.log(this.state)

    let posts = this.state.posts.map((item, i) => {
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
    return <div >


      <div className="postNav" >
        <span>Discussions</span>
        <div>  <span onClick={() => this.sortPostsNew()} >Latest</span>/
<span   >Popular</span> </div>

      </div>

      {posts}</div>



  }
}

const mapStateToProps = state => state;

export default withRouter(
  connect(mapStateToProps, { getUser, getPosts })(Posts)
);
