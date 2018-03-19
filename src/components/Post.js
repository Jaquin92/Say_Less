import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";

import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Toggle from 'material-ui/Toggle';
import Moment from 'react-moment';
import axios from 'axios';



class Post extends Component {
    constructor() {
        super()

        this.state = {
            expanded: false,
            commentInput: "",
            post: {},
            commentInput: "",
            comments: [],
            likes: [],
            liked: false,
            edit: false,
        }
    }

    componentDidMount() {

        axios.get(`/entry/${this.props.match.params.id}`).then(response => {
            this.setState({ post: response.data, rating: response.data[0].rating })






            if (this.props.user.id == this.state.post[0].authid) {

                this.setState({ edit: true })
            }
        }
        ).catch(() => console.log("error on axios Post component"))

        axios.get(`/comments/${this.props.match.params.id}`).then(response => {
            this.setState({ comments: response.data })
        }).catch(() => {
            console.log('couldnt get comments')
        })

        axios.get(`/api/postLikes/${this.props.match.params.id}`).then(results => {
            this.setState({ likes: results.data })
            let liked = this.state.likes.filter(item => {
                return item.authid === this.props.user.id
            })
            if (liked.length > 0) {
                this.setState({ liked: true })
            }
        }).catch("no likes")





    }

    handleExpandChange = (expanded) => {
        this.setState({ expanded: expanded });
    };

    handleToggle = (event, toggle) => {
        this.setState({ expanded: toggle });
    };

    handleExpand = () => {
        this.setState({ expanded: true });
    };

    handleReduce = () => {
        this.setState({ expanded: false });
    };

    addComment(str) {

        let body = {
            body: str,
            post: this.props.match.params.id
        }

        if (str === "") {
            alert("Please fill in field")
        }
        else {

            axios.post("/post/comment", body)
                .then(() => axios.get(`/comments/${this.props.match.params.id}`).then(response => {
                    this.setState({ comments: response.data })
                }).catch(() => {
                    console.log('couldnt get comments')
                })
                )
            this.setState({ commentInput: "" })
        }
    }

    changeRating() {


        let rate = {
            id: this.props.match.params.id,
            rate: this.state.likes.length
        }

        if (this.state.liked) {
            axios.put(`/api/like/${this.props.match.params.id}`, rate).then(() => {


                axios.get(`/api/postLikes/${this.props.match.params.id}`).then(results => {
                    this.setState({ likes: results.data, liked: false })
                }).catch(() => console.log("no likes"))


            }).catch(() => console.log("couldnt unlike"))
        } else {
            axios
                .put("/api/changeRating", rate)
                .then(result => {

                    axios.get(`/api/postLikes/${this.props.match.params.id}`).then(results => {
                        this.setState({ likes: results.data, liked: true })
                    }).catch("no likes")

                })
                .catch(() => console.log("no rate change"))
        }
    }





    render() {
        let like;
        if (this.state.liked) {
            like = <FlatButton style={{ color: "red" }} onClick={() => this.changeRating()} label="Unlike" />
        } else {
            like = <FlatButton onClick={() => this.changeRating()} label="Like" />
        }




        let comments = this.state.comments.map((item, i) => {

            return <CardHeader key={i}
                title={item.name}
                avatar={item.img}
                subtitle={item.body}
            >    </CardHeader>
        })





        let item = this.state.post[0]
        let link;
        if (this.state.post[0]) {
            link = <Link to={`/user/${this.state.post[0].userid}`}> {item.name}</Link>
        }






        return (


            <div className="postContainer" >
                {this.state.post[0] ? <Card  >
                    <CardHeader
                        title={link}
                        subtitle={<Moment fromNow >{new Date(item.time).toLocaleString()}</Moment>}

                        avatar={item.img}
                    >Likes: {this.state.likes.length} </CardHeader>
                    <CardTitle title={item.title.toUpperCase()} className="postTitle" />
                    <CardText className="postBody" >

                        <div>{item.body}</div>


                    </CardText>

                    <CardActions>
                        {this.props.loggedIn && <div>{like}

                            {this.state.edit && <Link to={`/edit/${this.props.match.params.id}`}  > <FlatButton label="Edit" />  </Link>}


                        </div>}


                    </CardActions>
                </Card> : <img src="https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif" alt="" className="loading" />}
                {this.props.loggedIn &&
                    <div><TextField
                        onChange={e => this.setState({ commentInput: e.target.value })}
                        hintText="Leave a comment..."

                        value={this.state.commentInput}
                        fullWidth={true}
                        multiLine={true}
                        rows={1}
                        rowsMax={8}
                    />

                        <RaisedButton onClick={() => this.addComment(this.state.commentInput)
                        } label="Comment" fullWidth={true} /></div>
                }
                <Card expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
                    <CardHeader
                        title="Comments"
                        actAsExpander={true}
                        showExpandableButton={true}
                    />

                    <CardText expandable={true}>
                        {comments}
                    </CardText>

                </Card>


            </div>)
    }
}

const mapStateToProps = state => state;

export default withRouter(
    connect(mapStateToProps)(Post)
);


