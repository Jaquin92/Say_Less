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

  render() {
    let posts = this.props.userPosts.map((item, i) => {
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
    return <div >{posts}</div>



  }
}

const mapStateToProps = state => state;

export default withRouter(
  connect(mapStateToProps, { getUser, getPosts })(Posts)
);
