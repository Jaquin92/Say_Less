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

class Edit extends Component {
    constructor() {
        super();

        this.state = {
            post: "",
            category: "",
            title: "",
            open: false,
            delOpen: false,
            postToEdit: []
        };

    }

    componentDidMount() {

        this.props.newPosts()

        axios.get(`/entry/${this.props.match.params.id}`).then(response => {

            this.setState({ postToEdit: response.data[0], title: response.data[0].title, post: response.data[0].body })
            console.log(this.state.postToEdit.title)
        }
        ).catch(() => console.log("error getting previous post"))

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

    handleDelOpen = () => {
        this.setState({ delOpen: true });
    };

    handleDelClose = () => {
        this.setState({ delOpen: false });
    };



    editPost(id, str, tit) {
        let post = { id: id, post: str, title: tit };

        axios
            .put("/api/edit", post)
            .then(() => {

                this.props.history.push(`/entry/${this.state.postToEdit.id}`)

            })
            .catch(() => {
                console.log("error on newPost");
            });

    }

    deletePost() {
        axios.delete(`/api/delete/${this.props.match.params.id}`).then(() => {
            this.props.history.push("/profile")
            console.log("it worked")
        }).catch(err => console.log(err))
    }




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
                    this.editPost(
                        this.state.postToEdit.id,
                        this.state.post,
                        this.state.title
                    );
                    this.handleClose();
                }}

            />,
        ];
        const destroy = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.handleDelClose}
            />,
            <FlatButton
                label="Submit"
                primary={true}
                keyboardFocused={true}
                onClick={() => {
                    this.deletePost()
                    this.handleDelClose();
                }}

            />,
        ];

        return (
            <div className="postContainer" >{this.props.loggedIn && this.state.postToEdit.title ?

                <div  >
                    <h1>Edit Post</h1>

                    <TextField onChange={e => this.setState({ title: e.target.value })}
                        defaultValue={this.state.postToEdit.title}


                        hintText="Enter a Title..."
                        floatingLabelText="Title"
                        fullWidth={true}
                        floatingLabelFixed={true}
                    />

                    <div className="newPostBody" >
                        <TextField
                            onChange={e => this.setState({ post: e.target.value })}
                            defaultValue={this.state.postToEdit.body}
                            hintText="What's on your mind?"
                            fullWidth={true}
                            multiLine={true}
                            rows={18}


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




                        <RaisedButton label="Delete Post" onClick={this.handleDelOpen} />

                        <Dialog
                            title="Are you sure?"
                            actions={destroy}
                            modal={false}
                            open={this.state.delOpen}
                            onRequestClose={this.handleDelClose}
                        >
                            Are you sure you want to Delete this post?
        </Dialog>

                    </div>



                </div> : <p>You are not logged in</p>}
            </div>


        );
    }
}

const mapStateToProps = state => state;

export default withRouter(connect(mapStateToProps, { leavingNewPost, newPosts })(Edit));