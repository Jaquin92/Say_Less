import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { newPosts, leavingNewPost } from "../ducks/reducer"
import axios from "axios";

class AddPost extends Component {
  constructor() {
    super();

    this.state = {
      post: "",
      category: "",
      title: ""
    };
    this.newPost = this.newPost.bind(this);
  }

  componentDidMount() {
    console.log(this.props.onNewPost)
    this.props.newPosts()
  }
  componentWillUnmount() {
    this.props.leavingNewPost()
  }



  newPost(str, cat, tit) {
    let post = { post: str, category: cat, title: tit };

    axios
      .post("/api/post", post)
      .then(() => console.log("post successful"))
      .then(() => {
        console.log("error on newPost");
      });
    console.log(this.state);
  }
  render() {
    return (
      <div>{this.props.loggedIn ?

        <div>   <input
          onChange={e => this.setState({ title: e.target.value })}
          type="text"
          placeholder="title"
        />
          <input
            placeholder="body"
            onChange={e => this.setState({ post: e.target.value })}
            type="text"
          />

          <button
            onClick={() => {
              this.newPost(
                this.state.post,
                this.props.match.params.category,
                this.state.title
              );
            }}
          >
            Submit
        </button>
        </div> : <p>You are not logged in</p>}
      </div>


    );
  }
}

const mapStateToProps = state => state;

export default withRouter(connect(mapStateToProps, { leavingNewPost, newPosts })(AddPost));
