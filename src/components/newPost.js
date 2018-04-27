import React, { Component } from "react";
import { Link } from 'react-router-dom';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { newPosts, leavingNewPost } from "../ducks/reducer"
import axios from "axios";
import Editor from 'react-medium-editor';
require('medium-editor/dist/css/medium-editor.css');
require('medium-editor/dist/css/themes/default.css');

// ES module




class AddPost extends Component {
  constructor() {
    super();

    this.state = {
      post: "",
      category: "",
      title: "",
      open: false,
    };
    this.newPost = this.newPost.bind(this);
  }



  componentDidMount() {

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
  handleChanges = (text, medium) => {
    this.setState({ post: text });
  }



  newPost(str, cat, tit) {

    if (this.state.category === "") {
      alert("Please Select a Category")
      return
    }

    if (str === "") {
      alert("Please Write a post")
      return
    }

    if (tit === "") {
      alert("Please Enter a Title")
      return
    }
    let post = { post: str, category: cat, title: tit.toLowerCase() };

    axios
      .post("/api/post", post)
      .then(response => {

        this.props.history.push(`/entry/${response.data[0].id}`)

      })
      .catch(() => {
        console.log("error on newPost");
      });
    console.log(this.state);
  }

  handleChange = (event, index, category) => this.setState({ category });
  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={() => {
          this.newPost(
            this.state.post,
            this.state.category,
            this.state.title
          );
          this.handleClose();
        }}

      />,
    ];

    console.log(Editor)
    return (
      <div className="postContainer" >{this.props.loggedIn ?

        <div  >
          <h1>New Post</h1>
          <div>

            <SelectField
              floatingLabelText="Category"
              value={this.state.category}
              onChange={this.handleChange}
            >
              <MenuItem value={"Software"} primaryText="Software" />
              <MenuItem value={"Hardware"} primaryText="Hardware" />
              <MenuItem value={"Crypto"} primaryText="Crypto" />
              <MenuItem value={"Climate"} primaryText="Climate" />

            </SelectField>  </div>

          <TextField onChange={e => this.setState({ title: e.target.value })}
            hintText="Enter a Title..."
            floatingLabelText="Title"
            fullWidth={true}
            floatingLabelFixed={true}
          />

          <div className="newPostBody" >
            {/* <TextField
              onChange={e => this.setState({ post: e.target.value })}
              hintText="What's on your mind?"
              fullWidth={true}
              multiLine={true}
              rows={18}


            /> */}
            <Editor
              tag="pre"
              text={this.state.post}
              onChange={this.handleChanges}
              options={{ toolbar: { buttons: ['bold', 'italic', 'underline', 'anchor', 'h1', 'image', 'justifyLeft', 'justifyCenter', 'justifyRight'] } }}
            />
          </div>
          <div>
            <RaisedButton label="Submit Post" onClick={this.handleOpen} />
            <Dialog
              title="Are you sure?"
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
