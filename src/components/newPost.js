import React, { Component } from "react";
import { Link } from 'react-router-dom';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
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
      title: "",
      open: false
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
  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };



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
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
      <Link to="/profile">  <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={() => {
          this.newPost(
            this.state.post,
            this.props.match.params.category,
            this.state.title
          );
          this.handleClose();
        }}

      /> </Link>,
    ];
    return (
      <div className="postContainer" >{this.props.loggedIn ?

        <div  >
          <h1>New {this.props.match.params.category} Post</h1>

          <TextField onChange={e => this.setState({ title: e.target.value })}
            hintText="Enter a Title..."
            floatingLabelText="Title"
            fullWidth={true}
            floatingLabelFixed={true}
          />

          <div className="newPostBody" >
            <TextField
              onChange={e => this.setState({ post: e.target.value })}
              hintText="What's on your mind?"
              fullWidth={true}
              multiLine={true}
              rows={18}


            />
          </div>
          <div>
            <RaisedButton label="Submit Post" onClick={this.handleOpen} />
            <Dialog
              title="Dialog With Actions"
              actions={actions}
              modal={false}
              open={this.state.open}
              onRequestClose={this.handleClose}
            >
              Are you sure you want to submit this post?
        </Dialog>
          </div>



        </div> : <p>You are not logged in</p>}
      </div>


    );
  }
}

const mapStateToProps = state => state;

export default withRouter(connect(mapStateToProps, { leavingNewPost, newPosts })(AddPost));
